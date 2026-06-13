import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import mascot from "./assets/mascot.png";
import Landing from "./Landing.jsx";
import { openPaymentWidget } from "./lib/cloudpayments.js";
import { LEGAL } from "./legal.js";

const SUPABASE_URL = "https://lcvszvxbszszqikboxeq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE";

// Токен текущей сессии (после входа). Пока null — используется anon-ключ.
let ACCESS_TOKEN = null;
// Профиль вошедшего пользователя (объект user из Supabase Auth).
let CURRENT_USER = null;
// Тариф пользователя из таблицы public.profiles (server-authoritative, не из
// user_metadata — его пользователь правит сам). { tariff, pro_until } | null.
let CURRENT_PROFILE = null;
const userName = () => CURRENT_USER?.user_metadata?.name || null;
// Владелец проекта: только ему доступен режим редактора (запись в БД
// дополнительно закрыта RLS-политиками — см. plans/security_rls_lockdown.sql).
const ADMIN_EMAIL = "simonakhatipova@gmail.com";
const isAdmin = () => CURRENT_USER?.email === ADMIN_EMAIL;

// Лимиты бесплатного тарифа (как на лендинге).
const FREE_LIMITS = { search: 7, analysis: 3, compare: 2 };
const PRO_LIMITS = { compare: 5 };
// pro = админ-владелец, либо активная подписка в profiles.
const isPro = () => isAdmin() ||
  (CURRENT_PROFILE?.tariff === "pro" &&
    (!CURRENT_PROFILE.pro_until || new Date(CURRENT_PROFILE.pro_until) > new Date()));
const compareLimit = () => (isPro() ? PRO_LIMITS.compare : FREE_LIMITS.compare);

function authHeaders() {
  return {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${ACCESS_TOKEN || SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };
}

async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, { headers: authHeaders(), ...options });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

// Постраничная выгрузка всех строк: PostgREST по умолчанию режет ответ серверным
// лимитом (max-rows) даже при limit=N в URL. Тянем кусками через заголовок Range.
// ВАЖНО: сервер может вернуть МЕНЬШЕ строк, чем запрошено в куске (например, из-за
// max-rows меньше chunk или ограничения размера ответа при встроенных join).
// Поэтому сдвигаемся на число фактически полученных строк, а не на chunk, и
// останавливаемся только когда получили пустую страницу или дошли до total из
// заголовка Content-Range. Иначе выгрузка обрывалась раньше времени (≈4950).
async function sbFetchAll(path, chunk = 1000) {
  const all = [];
  let from = 0;
  let total = Infinity;
  for (let guard = 0; guard < 100000; guard++) {
    const to = from + chunk - 1;
    const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
      headers: { ...authHeaders(), "Range-Unit": "items", "Range": `${from}-${to}`, "Prefer": "count=exact" },
    });
    if (!res.ok) throw new Error(await res.text());
    // Content-Range: items 0-999/5023  → берём общее число строк
    const cr = res.headers.get("content-range") || res.headers.get("Content-Range");
    if (cr) {
      const m = cr.match(/\/(\d+|\*)\s*$/);
      if (m && m[1] !== "*") total = Number(m[1]);
    }
    const text = await res.text();
    const part = text ? JSON.parse(text) : [];
    all.push(...part);
    if (part.length === 0) break;          // больше нечего тянуть
    from += part.length;                   // сдвиг на фактически полученное
    if (from >= total) break;              // выбрали всё по счётчику
  }
  return all;
}

// Загрузка ОСТАЛЬНЫХ строк начиная со смещения `from` (для фоновой догрузки
// после того, как первая страница уже показана пользователю).
async function sbFetchFrom(path, from, chunk = 1000) {
  const all = [];
  let total = Infinity;
  for (let guard = 0; guard < 100000; guard++) {
    const to = from + chunk - 1;
    const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
      headers: { ...authHeaders(), "Range-Unit": "items", "Range": `${from}-${to}`, "Prefer": "count=exact" },
    });
    if (!res.ok) throw new Error(await res.text());
    const cr = res.headers.get("content-range") || res.headers.get("Content-Range");
    if (cr) { const m = cr.match(/\/(\d+|\*)\s*$/); if (m && m[1] !== "*") total = Number(m[1]); }
    const text = await res.text();
    const part = text ? JSON.parse(text) : [];
    all.push(...part);
    if (part.length === 0) break;
    from += part.length;
    if (from >= total) break;
  }
  return all;
}

// Первая страница (быстрый показ). Возвращает { rows, total }.
async function sbFetchFirstPage(path, pageSize = 200) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: { ...authHeaders(), "Range-Unit": "items", "Range": `0-${pageSize - 1}`, "Prefer": "count=exact" },
  });
  if (!res.ok) throw new Error(await res.text());
  const cr = res.headers.get("content-range") || res.headers.get("Content-Range");
  let total = Infinity;
  if (cr) { const m = cr.match(/\/(\d+|\*)\s*$/); if (m && m[1] !== "*") total = Number(m[1]); }
  const text = await res.text();
  const rows = text ? JSON.parse(text) : [];
  return { rows, total };
}

// Вход по email + паролю через Supabase Auth
async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || data?.msg || "Ошибка входа");
  ACCESS_TOKEN = data.access_token;
  CURRENT_USER = data.user || null;
  try { localStorage.setItem("sb_token", data.access_token); } catch {}
  return data;
}

function signOut() {
  ACCESS_TOKEN = null;
  CURRENT_USER = null;
  CURRENT_PROFILE = null;
  try { localStorage.removeItem("sb_token"); } catch {}
}

// Письмо со ссылкой для сброса пароля (Supabase recover)
async function sendRecovery(email) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error_description || data?.msg || "Не удалось отправить письмо");
  }
}

// Регистрация через одноразовый код на почту (Supabase email-OTP).
// ВАЖНО: шаблон письма «Magic Link» в Supabase Dashboard должен содержать {{ .Token }},
// иначе пользователю придёт ссылка без 6-значного кода.
async function sendOtp(email) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, create_user: true })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error_description || data?.msg || "Не удалось отправить код");
  }
}

async function verifyOtp(email, token) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "email", email, token })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || data?.msg || "Неверный код");
  ACCESS_TOKEN = data.access_token;
  CURRENT_USER = data.user || null;
  try { localStorage.setItem("sb_token", data.access_token); } catch { /* localStorage недоступен */ }
  return data;
}

// Проверка сохранённого токена при загрузке
async function restoreSession() {
  let token = null;
  try { token = localStorage.getItem("sb_token"); } catch {}
  if (!token) return false;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) { signOut(); return false; }
  try { CURRENT_USER = await res.json(); } catch { CURRENT_USER = null; }
  ACCESS_TOKEN = token;
  return true;
}

// Сохранить профиль (user_metadata): имя, телефон, факты согласий с датой —
// вызывается после подтверждения кода
async function updateUserProfile(data) {
  await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });
  CURRENT_USER = CURRENT_USER
    ? { ...CURRENT_USER, user_metadata: { ...CURRENT_USER.user_metadata, ...data } }
    : { user_metadata: { ...data } };
}

// Тариф из public.profiles. Безопасно деградирует (нет строки/таблицы → free),
// чтобы приложение работало даже до применения схемы freemium.
async function loadProfile() {
  if (!CURRENT_USER?.id) { CURRENT_PROFILE = null; return null; }
  try {
    const rows = await sbFetch(`/profiles?id=eq.${CURRENT_USER.id}&select=tariff,pro_until`);
    CURRENT_PROFILE = rows[0] || { tariff: "free", pro_until: null };
  } catch { CURRENT_PROFILE = { tariff: "free", pro_until: null }; }
  return CURRENT_PROFILE;
}

// Счётчики использования за последние 7 дней: { search, analysis }.
async function loadUsage() {
  if (!CURRENT_USER?.id) return { search: 0, analysis: 0 };
  const since = new Date(Date.now() - 7 * 864e5).toISOString();
  try {
    const rows = await sbFetch(
      `/usage_events?user_id=eq.${CURRENT_USER.id}&created_at=gte.${since}&select=kind`);
    return {
      search: rows.filter(r => r.kind === "search").length,
      analysis: rows.filter(r => r.kind === "analysis").length,
    };
  } catch { return { search: 0, analysis: 0 }; }
}

// Залогировать использование (fire-and-forget). Pro и владелец не логируются.
async function logUsage(kind) {
  if (!CURRENT_USER?.id || isPro()) return;
  try {
    await sbFetch(`/usage_events`, {
      method: "POST",
      body: JSON.stringify({ user_id: CURRENT_USER.id, kind }),
    });
  } catch { /* лимиты мягкие — сбой логирования не критичен */ }
}


// ===== Хелперы и движок похожести (из v6) =====

const GROUP_COLORS = {
  "ПАВ": "#3f7fb0", "Масла": "#b07d2e", "Витамины": "#3f8f5a", "Отдушки": "#b04f82",
  "Кислоты": "#8a63b8", "Структурообразователи": "#6b6e5a", "Растворители": "#4a8a9a",
  "Технические": "#6b6e5a", "Эмоленты": "#b07d2e", "Кондиционеры": "#3f7fb0",
  "Протеины": "#3f8f5a", "Увлажнители": "#4a8a9a", "unknown": "#8b8f86",
};
const groupColor = (g) => GROUP_COLORS[g] || "#6b6e5a";

// ─── ЦВЕТА ФУНКЦИЙ (цветное стекло на тегах) ──────────────────────────────────
// Каждая функция — свой оттенок. "full" = насыщенный, "some" = бледный.
const FN_META = {
  moisture:   { label: "Увлажнение",      some: "Немного увлажняет",  hue: "#2f8fa6" }, // бирюза
  nutrition:  { label: "Питание",         some: "Немного питает",     hue: "#c0892f" }, // янтарь
  repair:     { label: "Восстановление",  some: "Немного восстановит", hue: "#3f9a63" }, // зелёный
  protection: { label: "Защита",          some: "Немного защищает",   hue: "#4f78c4" }, // синий
};

// Какие характеристики показывать для конкретного product_type.
// Возвращает массив "стеклянных тегов": { text, hue, strong }
function productAttributes(p) {
  const t = (p.product_type || "").toLowerCase();
  const tags = [];

  // Маски и кондиционеры — функции с градацией силы + кудри
  if (t.includes("маск") || t.includes("кондиционер")) {
    ["moisture", "nutrition", "repair", "protection"].forEach((k) => {
      const v = p["attr_" + k];
      if (v === "full" || v === true) tags.push({ text: FN_META[k].label, hue: FN_META[k].hue, strong: true });
      else if (v === "some") tags.push({ text: FN_META[k].some, hue: FN_META[k].hue, strong: false });
    });
    if (p.attr_curls === true) tags.push({ text: "Подходит кудряшкам", hue: "#9a5fb0", strong: true });
    return tags;
  }

  // Шампуни — тип очищения + тип кожи головы
  if (t.includes("шампунь")) {
    if (p.analytical_type) tags.push({ text: p.analytical_type, hue: "#2f8fa6", strong: true });
    if (p.skin_type) tags.push({ text: p.skin_type, hue: "#6b8f5a", strong: false });
    return tags;
  }

  // Кремы / сыворотки / SPF / тонеры и пр. — плёнка + хим. UVA-фильтр
  if (p.attr_film === true) tags.push({ text: "Плёнкообразователь", hue: "#7d8a6b", strong: false });
  if (p.attr_uva_chem === true) tags.push({ text: "Химический UVA-фильтр", hue: "#4f78c4", strong: true });
  return tags;
}

// ─── ОПИСАНИЯ ГРУПП/ПОДГРУПП (демо; в бою — из таблицы subgroups) ─────────────
// ключ: "group" | "group::subgroup" | "group::subgroup::subgroup2"
const SUBGROUP_DESC = {
  "ПАВ": "Поверхностно-активные вещества это основа очищения. Связывают жир и грязь, смываются водой. Чем агрессивнее ПАВ, тем сильнее очищение, но выше риск пересушивания.",
  "ПАВ::Анионные ПАВ": "Самые высокоочищающие, имеют отрицательный заряд, оказывают самое агрессивное действие, могут раздражать.",
  "ПАВ::Анионные ПАВ · Жёсткие": "Лучше всего подходят жирному типу кожи головы. Дают обильную пену и глубокое очищение.",
  "ПАВ::Амфотерные ПАВ": "Свойства зависят от pH: при pH от 4 до 6 смягчают другие, более жёсткие ПАВ; при pH выше 7 усиливают их агрессию. Часто идут как со-ПАВ.",
  "ПАВ::Неионные ПАВ · Мягкие": "Низкое пенообразование. Снижают агрессию других ПАВ, подходят чувствительной и сухой коже.",
  "Окклюзивы::Силиконы": "Химические соединения кислорода и кремния. Дают блеск, гладкость кутикулы и защиту, без лечебного эффекта.",
  "Структурообразователи::Силиконы": "Создают плёнку на поверхности волоса: гладкость, блеск, защита от влаги и тепла.",
  "Увлажнители": "Гумектанты отвечают за непосредственное увлажнение. В хорошем увлажняющем средстве их должно быть несколько в верхней части состава.",
  "Увлажнители::Гумектанты": "Притягивают и удерживают влагу в волосе. Глицерин это самый распространённый представитель.",
  "Протеины": "Гидролизованные белки временно заполняют повреждения кутикулы, возвращают плотность и упругость повреждённым волосам.",
  "Масла": "Питают, смягчают, придают блеск. Растительные масла различаются по проникновению и жирнокислотному составу.",
  "Отдушки": "Ароматизаторы. Некоторые компоненты отдушек являются признанными ЕС аллергенами, и маркируются отдельно.",
  "Растворители": "Основа средства, чаще всего вода. Растворяют остальные компоненты.",
  "Технические": "Регуляторы вязкости, pH, UV-фильтры и прочие функциональные добавки.",
  "Кондиционеры": "Катионные компоненты с положительным зарядом, сглаживают кутикулу, снимают статику, облегчают расчёсывание.",
  "Витамины": "Активные добавки-антиоксиданты. Влияют на состояние волоса при достаточной концентрации.",
};
// карта описаний приходит из Supabase (subgroups); демо служит фолбэком
const descFor = (map, group, subgroup, subgroup2) => {
  const m = map || {};
  return m[`${group}::${subgroup}::${subgroup2}`] || m[`${group}::${subgroup}`] || m[group]
    || SUBGROUP_DESC[`${group}::${subgroup}::${subgroup2}`]
    || SUBGROUP_DESC[`${group}::${subgroup}`]
    || SUBGROUP_DESC[group]
    || null;
};

// ─── FUZZY-ПОИСК: опечатки в запросе не должны прятать результат ─────────────
// Расстояние Левенштейна с отсечкой: как только минимум в строке DP превышает
// max — дальше можно не считать.
function levDist(a, b, max) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// Есть ли в тексте слово, похожее на запрос (включая совпадение по началу слова).
// Допуск растёт с длиной запроса: 4–5 букв — 1 опечатка, 6–8 — 2, дальше — 3.
function fuzzyIncludes(text, q) {
  if (!text) return false;
  const max = q.length <= 5 ? 1 : q.length <= 8 ? 2 : 3;
  for (const w of String(text).toLowerCase().split(/[^a-zа-яё0-9]+/)) {
    if (!w || w.length + max < q.length) continue; // слово заметно короче запроса — мимо
    if (levDist(w.slice(0, q.length + max), q, max) <= max) return true;
  }
  return false;
}

// ─── ДВИЖОК ПОХОЖЕСТИ ПО СОСТАВУ ─────────────────────────────────────────────
// Сравниваем только АКТИВНУЮ часть состава: ингредиенты до первой отдушки (~>1%).
// После первой отдушки концентрации <1% — менее значимы для функционального сходства.
const normInci = (s) => (s || "").toLowerCase().replace(/[^a-zа-я0-9 ]/gi, "").trim();

// Взять только активную часть (до первой отдушки включительно, или весь список если отдушек нет)
function activeIngredients(list) {
  const fragIdx = list.findIndex(x => (x.group || "").toLowerCase().includes("отдушк"));
  return fragIdx > 0 ? list.slice(0, fragIdx) : list;
}

// вес ингредиента по позиции: топ-5 важнее хвоста
const posWeight = (pos) => {
  if (!pos) return 0.4;
  if (pos <= 3) return 1;
  if (pos <= 6) return 0.75;
  if (pos <= 10) return 0.5;
  return 0.3;
};

function compositionSimilarity(listA, listB) {
  // работаем только с активной частью обоих составов
  const actA = activeIngredients(listA);
  const actB = activeIngredients(listB);
  if (!actA.length || !actB.length) return { score: 0, sharedNames: [] };

  const mapB = new Map(actB.map(x => [normInci(x.inci), x]));
  let shared = 0, weightSum = 0;
  const sharedNames = [];
  for (const a of actA) {
    const w = posWeight(a.position);
    weightSum += w;
    if (mapB.has(normInci(a.inci))) { shared += w; sharedNames.push(a.inci); }
  }
  // симметричный счёт: берём среднее между "сколько A нашлось в B" и "сколько B нашлось в A"
  const mapA = new Map(actA.map(x => [normInci(x.inci), x]));
  let sharedRev = 0, weightSumRev = 0;
  for (const b of actB) {
    const w = posWeight(b.position);
    weightSumRev += w;
    if (mapA.has(normInci(b.inci))) sharedRev += w;
  }
  const scoreA = weightSum ? shared / weightSum : 0;
  const scoreB = weightSumRev ? sharedRev / weightSumRev : 0;
  const ingScore = (scoreA + scoreB) / 2;

  // совпадение по группам (только активной части)
  const gA = new Set(actA.map(x => x.group).filter(Boolean));
  const gB = new Set(actB.map(x => x.group).filter(Boolean));
  const inter = [...gA].filter(g => gB.has(g)).length;
  const uni = new Set([...gA, ...gB]).size;
  const grpScore = uni ? inter / uni : 0;

  // гибрид: 70% ингредиенты, 30% группы
  const score = Math.round((ingScore * 0.70 + grpScore * 0.30) * 100);
  return { score, sharedNames };
}

// привести продукт из БД к списку для движка
const toCompList = (p) => p.ingredients.map(r => ({ inci: r.ing.inci_name, group: r.ing.group, position: r.position }));

// эвристика автоопределения типа средства по составу (для подсказки пользователю)
const TYPE_RULES = [
  { type: "Шампунь", test: (gs, names) => gs.has("ПАВ") && names.some(n => /sulfate|sulfo|glucoside|betaine|sarcosinate/i.test(n)) },
  { type: "Кондиционер", test: (gs, names) => names.some(n => /behentrimonium|cetrimonium|distearoylethyl|quaternium/i.test(n)) || (gs.has("Эмоленты") && names.some(n => /cetearyl alcohol/i.test(n))) },
  { type: "Маска", test: (gs) => gs.has("Протеины") && (gs.has("Масла") || gs.has("Эмоленты")) },
  { type: "SPF", test: (gs, names) => names.some(n => /titanium dioxide|zinc oxide|octocrylene|avobenzone|homosalate|ethylhexyl methoxycinnamate|tinosorb|uvinul/i.test(n)) },
  { type: "Крем", test: (gs, names) => names.some(n => /dimethicone|ceramide|petrolatum/i.test(n)) && gs.has("Увлажнители") },
  { type: "Масло", test: (gs, names) => names.length <= 6 && gs.has("Масла") && !gs.has("ПАВ") && !names.some(n => /aqua|water/i.test(n)) },
  { type: "Сыворотка", test: (gs) => (gs.has("Витамины") || gs.has("Кислоты")) && !gs.has("ПАВ") },
];
function detectType(list) {
  const gs = new Set(list.map(x => x.group).filter(Boolean));
  const names = list.map(x => x.inci);
  for (const r of TYPE_RULES) { if (r.test(gs, names)) return r.type; }
  return null;
}
// найти похожие в БД. Строго исключаем sourceProduct по id.
function findSimilar(targetList, sourceProduct, allProducts, { sameType = true, order = "match" } = {}) {
  const sourceId = sourceProduct?.id;
  const list = allProducts
    .filter(p => p.id !== sourceId)                            // исключаем само средство
    .filter(p => !sameType || !sourceProduct || p.product_type === sourceProduct.product_type)
    .map(p => ({ product: p, ...compositionSimilarity(targetList, toCompList(p)) }))
    .filter(x => x.score >= 20);
  if (order === "price") {
    list.sort((a, b) => (a.product.price_rub || 0) - (b.product.price_rub || 0) || b.score - a.score);
  } else {
    list.sort((a, b) => b.score - a.score || (a.product.price_rub || 0) - (b.product.price_rub || 0));
  }
  return list;
}

// ===== Стили (v6) =====

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ФОН СТРАНИЦЫ — спокойный прохладный шалфейно-нефритовый, менее насыщенный,
       чтобы не спорить с тёплым стеклом карточек */
    --bg-1: #eef2ef;
    --bg-2: #e6ede8;
    --bg-3: #dbe6df;

    /* СТЕКЛО — едва тёплое, кремово-нефритовое: убирает диссонанс при открытии карточки */
    --glass: rgba(255,253,250,0.62);
    --glass-strong: rgba(255,253,249,0.82);
    --glass-warm: rgba(240,247,250,0.8);    /* прохладная подложка модалки/панелей */
    --glass-border: rgba(255,255,255,0.72);
    --glass-hairline: rgba(120,140,128,0.18);

    --ink: #16241d;
    --ink-soft: #3f534a;
    --ink-faint: #74897f;
    --accent: #0f6b4d;
    --accent-deep: #0a4a35;
    --accent-soft: #2a9b73;
    --line: rgba(60,110,88,0.15);
    --shadow: 0 8px 32px rgba(15,75,55,0.14);
    --shadow-sm: 0 2px 14px rgba(15,75,55,0.09);
    --shadow-warm: 0 18px 50px rgba(30,70,90,0.13);
    --warm: rgba(236,244,248,0.7);   /* прохладная мягкая заливка (бывш. бежевая) */
    --rose: #c17b8a;
    --warn: #c98a3a;
    --danger: #c0584f;

    /* алиасы старой палитры: инлайн-стили admin-модалок ссылаются на них,
       при переходе на v6 переменные пропали — маппим на новые токены */
    --sage: var(--accent);
    --dust: var(--ink-faint);
    --sand: rgba(60,110,88,0.25);
    --gold: var(--accent);
    --brown: var(--ink-soft);
    --deep: var(--ink);
    --cream: #f6f9f7;
  }

  body { font-family: 'Manrope', sans-serif; color: var(--ink); }

  .app {
    min-height: 100vh; position: relative; overflow-x: hidden;
    background:
      radial-gradient(1100px 560px at 8% -12%, #e7eee9 0%, transparent 55%),
      radial-gradient(900px 480px at 102% -4%, #e0e9e3 0%, transparent 52%),
      linear-gradient(165deg, #eef2ef 0%, #dfe8e1 60%, #d6e1da 100%);
    background-attachment: fixed;
  }

  /* ── Фон: крупные цветы + размытые фиолетовые пятна ── */
  .flowers-backdrop {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .bg-blob { position: absolute; border-radius: 50%; filter: blur(90px); }
  .bg-blob-1 { width: 540px; height: 540px; left: -10%; top: 32%; background: rgba(155,125,180,0.16); }
  .bg-blob-2 { width: 460px; height: 460px; left: 72%; top: -12%; background: rgba(155,125,180,0.12); }
  /* чтобы контент был поверх фона */
  .topbar, .tabs-bar, .main { position: relative; z-index: 2; }

  /* ── ШАПКА: движущийся градиент-«шёлк», поверх светлая стеклянная вуаль для читаемости ── */
  .topbar {
    position: sticky; top: 0; z-index: 100;
    padding: 0 clamp(1rem, 4vw, 2.4rem);
    height: 56px; display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.4);
    box-shadow: 0 4px 20px rgba(80,60,110,0.10);
    overflow: hidden;
    isolation: isolate;
  }
  /* слой 1 — переливающийся градиент (сирень/голубой/розовый + наш глубокий изумруд, усилен) */
  .topbar-aurora {
    position: absolute; inset: -40% -10%; z-index: -2;
    background:
      radial-gradient(46% 120% at 16% 32%, #b98fd6 0%, transparent 56%),
      radial-gradient(42% 130% at 42% 70%, #6fa8d8 0%, transparent 52%),
      radial-gradient(48% 120% at 60% 35%, #0f6b4d 0%, transparent 56%),
      radial-gradient(44% 120% at 80% 68%, #2ea579 0%, transparent 54%),
      radial-gradient(40% 120% at 95% 40%, #0a4a35 0%, transparent 50%),
      radial-gradient(38% 110% at 30% 92%, #1d8f66 0%, transparent 50%),
      linear-gradient(110deg, #a78fd6, #2ea579 45%, #0f6b4d 65%, #7fb0d8 85%, #d68fbf);
    background-size: 230% 230%;
    filter: saturate(128%);
    animation: aurora 18s ease-in-out infinite;
  }
  @keyframes aurora {
    0%   { background-position: 0% 50%, 100% 0%, 50% 100%, 0% 0%, 0% 50%; }
    50%  { background-position: 100% 50%, 0% 100%, 80% 0%, 100% 100%, 100% 50%; }
    100% { background-position: 0% 50%, 100% 0%, 50% 100%, 0% 0%, 0% 50%; }
  }
  /* слой 2 — светлая стеклянная вуаль: гасит яркость, заголовки остаются читаемы */
  .topbar-veil {
    position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.5));
    backdrop-filter: blur(14px) saturate(115%); -webkit-backdrop-filter: blur(14px) saturate(115%);
  }
  @media (prefers-reduced-motion: reduce) { .topbar-aurora { animation: none; } }
  .brand, .topbar-actions { position: relative; z-index: 1; }
  .topbar-actions { margin-left: auto; }
  .topbar-user {
    font-size: 13px; font-weight: 600; color: var(--ink-soft);
    margin-right: 4px; white-space: nowrap;
  }

  .brand { display: flex; align-items: center; gap: 11px; }
  .brand-mark {
    width: 38px; height: 42px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;
    filter: drop-shadow(0 4px 9px rgba(10,74,53,0.28));
    perspective: 220px;
  }
  /* колба вращается влево в 3D (по оси Y) */
  .flask-body { transform-box: fill-box; transform-origin: 50% 50%; transform-style: preserve-3d; animation: flask3d 8s linear infinite; }
  @keyframes flask3d {
    0%   { transform: rotateY(0deg); }
    100% { transform: rotateY(-360deg); }
  }
  /* объёмная боковая тень: пульсирует в такт повороту, создаёт ощущение цилиндра */
  .flask-shade { mix-blend-mode: multiply; animation: shade 9s linear infinite; transform-box: fill-box; }
  @keyframes shade {
    0%   { opacity: .15; transform: translateX(2px); }
    25%  { opacity: .42; transform: translateX(4px); }
    50%  { opacity: .15; transform: translateX(-2px); }
    75%  { opacity: .42; transform: translateX(-4px); }
    100% { opacity: .15; transform: translateX(2px); }
  }
  /* падающие в колбу ингредиенты — постоянно */
  .flask-drop { opacity: 0; animation: drop 1.8s ease-in infinite; }
  .flask-drop.d2 { animation-delay: .6s; }
  .flask-drop.d3 { animation-delay: 1.2s; }
  @keyframes drop {
    0% { opacity: 0; transform: translateY(-16px) scale(.8); }
    22% { opacity: 1; }
    52% { opacity: 1; transform: translateY(8px) scale(1); }
    66%, 100% { opacity: 0; transform: translateY(12px) scale(.4); }
  }
  /* пузырьки кипения — постоянно */
  .flask-bub { opacity: 0; transform-box: fill-box; animation: fizz 1.4s ease-out infinite; }
  .flask-bub.b2 { animation-delay: .35s; }
  .flask-bub.b3 { animation-delay: .7s; }
  .flask-bub.b4 { animation-delay: 1.05s; }
  @keyframes fizz {
    0% { opacity: 0; transform: translateY(2px) scale(.5); }
    30% { opacity: .9; }
    100% { opacity: 0; transform: translateY(-13px) scale(1.1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .flask-body, .flask-shade, .flask-drop, .flask-bub { animation: none; }
    .flask-drop { opacity: 0; }
  }
  .brand-text { display: flex; flex-direction: column; line-height: 1.2; align-items: flex-start; }
  .brand-text b { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 20px; color: #1a1530; letter-spacing: -0.025em; }
  .brand-text span { font-size: 9.5px; color: #5a4d72; text-transform: uppercase; letter-spacing: .13em; font-weight: 700; }
  .topbar-actions { display: flex; gap: 8px; align-items: center; }
  .topbar .btn-glass { background: rgba(255,255,255,0.55); color: #3a3252; border: 1px solid rgba(255,255,255,0.6); }
  .topbar .btn-glass:hover { background: rgba(255,255,255,0.8); color: #1a1530; }
  .topbar .btn-primary { background: var(--accent-deep); color: #fff; }

  .btn {
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 13px;
    border: none; cursor: pointer; border-radius: 12px; padding: 10px 18px;
    transition: transform .12s, box-shadow .2s, background .2s;
  }
  .btn:active { transform: scale(.97); }
  .btn-primary { background: var(--accent-deep); color: white; box-shadow: 0 4px 14px rgba(10,74,53,0.3); }
  .btn-primary:hover { background: #073828; }
  .btn-glass {
    background: var(--glass); color: var(--ink-soft);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  }
  .btn-glass:hover { background: var(--glass-strong); color: var(--ink); }
  .btn-sm { padding: 7px 14px; font-size: 12px; border-radius: 10px; }
  .btn-danger { background: rgba(193,123,138,0.12); color: var(--rose); }
  .btn-danger:hover { background: rgba(193,123,138,0.2); }

  .tabs-bar { background: rgba(255,255,255,0.4); border-bottom: 1px solid var(--glass-border); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .tabs { display: flex; gap: 4px; padding: 0 clamp(1rem,4vw,2.5rem); max-width: 1180px; margin: 0 auto; }
  .tab {
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 14px;
    padding: 16px 20px; border: none; cursor: pointer;
    background: transparent; color: var(--ink-faint); transition: all .2s;
    border-bottom: 2.5px solid transparent; margin-bottom: -1px;
  }
  .tab:hover { color: var(--ink-soft); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:focus { outline: none; }
  .tab:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 55%, transparent); outline-offset: 2px; border-radius: 6px; }

  .main { max-width: 1180px; margin: 0 auto; padding: clamp(1rem,3vw,2rem) clamp(1rem,4vw,2.5rem) 4rem; }

  .toolbar { display: flex; gap: 12px; align-items: center; margin-bottom: 22px; flex-wrap: wrap; }
  .search {
    flex: 1; min-width: 220px;
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border-radius: 14px; padding: 12px 18px; font-size: 14px; font-family: inherit; color: var(--ink);
    outline: none; transition: border-color .2s, background .2s;
  }
  .search:focus { border-color: var(--accent); background: var(--glass-strong); }
  .search::placeholder { color: var(--ink-faint); }
  .filter-toggle { display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; padding: 12px 18px; font-size: 14px; border-radius: 14px; }

  .filter-panel {
    display: flex; flex-wrap: wrap; gap: 14px 18px; align-items: flex-end;
    background: var(--glass-warm); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 16px; padding: 16px 18px; margin-bottom: 16px;
    box-shadow: var(--shadow-sm);
    animation: filterIn .22s ease;
    position: relative; z-index: 60;
  }
  @keyframes filterIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  .filter-field { display: flex; flex-direction: column; gap: 6px; min-width: 168px; flex: 1; }
  .filter-field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; }
  .filter-field select {
    appearance: none; -webkit-appearance: none;
    background: rgba(255,255,255,0.62) url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%230a4a35' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 14px center;
    border: 1px solid var(--glass-border); border-radius: 11px;
    padding: 10px 32px 10px 13px; font-size: 13.5px; font-family: inherit; color: var(--ink);
    cursor: pointer; outline: none; transition: border-color .2s, background-color .2s;
  }
  .filter-field select:focus { border-color: var(--accent); }

  /* Иерархический фильтр вида средства */
  .hier-type { position: relative; z-index: 70; }
  .hier-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.62); border: 1px solid var(--glass-border); border-radius: 11px;
    padding: 10px 13px; font-size: 13.5px; font-family: inherit; color: var(--ink);
    cursor: pointer; outline: none; transition: border-color .2s;
  }
  .hier-trigger:hover, .hier-trigger:focus { border-color: var(--accent); }
  .hier-caret { color: var(--accent-deep); font-size: 11px; }
  .hier-menu {
    position: absolute; top: calc(100% + 5px); left: 0; right: 0; z-index: 999;
    background: rgba(255,255,255,0.98); border: 1px solid var(--glass-border); border-radius: 13px;
    box-shadow: 0 18px 48px rgba(20,50,40,0.22); padding: 6px; min-width: 240px;
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  }
  .hier-root, .hier-group-head, .hier-item {
    padding: 9px 12px; border-radius: 9px; font-size: 13.5px; color: var(--ink); cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; transition: background .12s;
  }
  .hier-root:hover, .hier-group:hover > .hier-group-head, .hier-item:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .hier-root.active, .hier-item.active { background: color-mix(in srgb, var(--accent) 22%, transparent); font-weight: 600; }
  .hier-group { position: relative; }
  .hier-group-head { font-weight: 600; color: var(--ink-soft); }
  .hier-group-name { display: inline-flex; align-items: center; gap: 9px; }
  .hier-ic { display: inline-flex; color: var(--accent-deep); opacity: 0.85; }
  .hier-arrow { color: var(--accent-deep); font-size: 15px; line-height: 1; }
  .hier-sub {
    margin: 2px 0 4px 8px; padding-left: 6px;
    border-left: 2px solid color-mix(in srgb, var(--accent) 30%, transparent);
    max-height: 340px; overflow-y: auto;
  }
  .hier-sub .hier-item { font-size: 13px; padding: 7px 10px; }
  .hier-sub-head {
    padding: 8px 10px 4px; margin-top: 2px; border-radius: 8px; cursor: pointer;
    font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: var(--ink-faint); transition: background .12s, color .12s;
  }
  .hier-sub-head:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent-deep); }
  .hier-sub-head.active { color: var(--accent); background: color-mix(in srgb, var(--accent) 18%, transparent); }
  .filter-reset {
    background: none; border: none; cursor: pointer; color: var(--rose);
    font-family: inherit; font-size: 13px; font-weight: 600; padding: 10px 4px; white-space: nowrap;
  }
  .filter-reset:hover { text-decoration: underline; }
  .filter-checks { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; padding-bottom: 2px; }
  .filter-check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; font-weight: 600; color: var(--ink-soft); user-select: none; }
  .filter-check input { appearance: none; -webkit-appearance: none; width: 18px; height: 18px; border-radius: 6px; border: 1.5px solid color-mix(in srgb, var(--accent) 40%, transparent); background: rgba(255,255,255,0.6); cursor: pointer; position: relative; transition: background .15s, border-color .15s; flex-shrink: 0; }
  .filter-check input:checked { background: var(--accent); border-color: var(--accent); }
  .filter-check input:checked::after { content: ""; position: absolute; left: 5px; top: 1.5px; width: 5px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  .filter-check:hover { color: var(--ink); }
  .field-hint { font-size: 9px; font-weight: 600; color: var(--accent-soft); text-transform: none; letter-spacing: 0; opacity: 0.8; }
  .filter-check.soon { opacity: 0.6; }
  .soon-tag { font-style: normal; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--warn); background: rgba(201,138,58,0.14); border-radius: 5px; padding: 1px 5px; margin-left: 6px; vertical-align: 1px; }

  /* ── Раскладка страницы средств: на десктопе фильтры слева ── */
  .products-layout { display: grid; grid-template-columns: 248px minmax(0, 1fr); gap: 28px; align-items: start; }
  .products-main { min-width: 0; }
  .filter-sidebar {
    position: sticky; top: 16px;
    background: var(--glass-warm); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 18px; padding: 14px 14px 18px; box-shadow: var(--shadow-sm);
    max-height: calc(100vh - 32px); overflow-y: auto;
  }
  .filter-sidebar-head {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    font-size: 11px; text-transform: uppercase; letter-spacing: .08em; font-weight: 800;
    color: var(--ink-soft); padding: 2px 4px 11px; margin-bottom: 6px;
    border-bottom: 1px solid var(--glass-border);
  }
  .filter-sidebar-head .filter-reset { padding: 0; font-size: 11px; }
  .filter-sidebar-body { display: flex; flex-direction: column; gap: 16px; }
  .filter-sidebar-body .filter-field { min-width: 0; }
  .filter-sidebar-body .filter-checks { flex-direction: column; align-items: flex-start; gap: 11px; }

  /* Развёрнутое дерево вида средства (сайдбар) */
  .hier-tree { display: flex; flex-direction: column; gap: 1px; margin-top: 4px; }
  .hier-tree-root, .hier-tree-item, .hier-tree-sub-head { cursor: pointer; border-radius: 8px; transition: background .12s, color .12s; }
  .hier-tree-root { padding: 7px 10px; font-size: 13px; font-weight: 600; color: var(--ink); }
  .hier-tree-root:hover, .hier-tree-item:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); }
  .hier-tree-root.active, .hier-tree-item.active { background: color-mix(in srgb, var(--accent) 22%, transparent); color: var(--accent-deep); font-weight: 600; }
  .hier-tree-group { margin-top: 6px; }
  .hier-tree-group-head { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: var(--ink-soft); padding: 6px 6px 4px; }
  .hier-tree-sub { margin: 1px 0 2px 7px; padding-left: 7px; border-left: 2px solid color-mix(in srgb, var(--accent) 24%, transparent); }
  .hier-tree-sub-head { padding: 6px 8px 3px; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-faint); }
  .hier-tree-sub-head:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent-deep); }
  .hier-tree-sub-head.active { color: var(--accent); background: color-mix(in srgb, var(--accent) 16%, transparent); }
  .hier-tree-item { padding: 6px 9px; font-size: 13px; color: var(--ink); }

  /* Десктоп: кнопка «Фильтры» и мобильная панель скрыты — фильтры в сайдбаре */
  @media (min-width: 861px) {
    .filter-toggle { display: none; }
    .products-main .filter-panel { display: none; }
  }
  /* Мобайл/планшет: сайдбар скрыт, фильтры — дропдауном по кнопке */
  @media (max-width: 860px) {
    .products-layout { display: block; }
    .filter-sidebar { display: none; }
  }

  /* ── Freemium: кнопка профиля в шапке, личный кабинет, paywall ── */
  .profile-btn { display: inline-flex; align-items: center; gap: 7px; padding-left: 7px; }
  .profile-ava {
    width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
    background: var(--accent); color: #fff; font-size: 11px; font-weight: 800;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .tariff-pill {
    font-size: 9px; font-weight: 800; letter-spacing: .06em; padding: 2px 6px; border-radius: 100px;
    background: rgba(255,255,255,0.16); color: #eef4f1; border: 1px solid rgba(255,255,255,0.28);
  }
  .tariff-pill.pro { background: linear-gradient(120deg,#caa24a,#e7c878); color: #3a2c08; border: none; }

  .lk-overlay { display: flex; align-items: flex-start; justify-content: center; padding: clamp(1rem, 5vh, 3.5rem) 16px 40px; }
  .lk-card {
    position: relative; width: min(440px, 92vw); max-height: 90vh; overflow-y: auto;
    background: var(--glass-strong); border: 1px solid var(--glass-border);
    backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%);
    border-radius: 24px; padding: 26px 24px; box-shadow: 0 30px 80px rgba(15,50,40,0.28);
  }
  .lk-close {
    position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border-radius: 50%;
    border: none; background: rgba(0,0,0,0.05); color: var(--ink-soft); font-size: 14px; cursor: pointer;
  }
  .lk-close:hover { background: rgba(0,0,0,0.1); }
  .lk-head { display: flex; align-items: center; gap: 13px; margin-bottom: 20px; }
  .lk-ava {
    width: 50px; height: 50px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent-deep)); color: #fff;
    font-size: 21px; font-weight: 800; display: flex; align-items: center; justify-content: center;
  }
  .lk-name { font-family: 'Familjen Grotesk', sans-serif; font-size: 19px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; }
  .lk-email { font-size: 12.5px; color: var(--ink-faint); }
  .lk-tariff {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    background: color-mix(in srgb, var(--accent) 8%, transparent);
    border: 1px solid var(--glass-border); border-radius: 16px; padding: 14px 16px; margin-bottom: 18px;
  }
  .lk-tariff.pro { background: linear-gradient(120deg, rgba(202,162,74,0.14), rgba(231,200,120,0.1)); border-color: rgba(202,162,74,0.4); }
  .lk-tariff-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--ink-faint); }
  .lk-tariff-val { font-size: 16px; font-weight: 700; color: var(--ink); }
  .lk-tariff-until { font-size: 11.5px; color: var(--accent-deep); margin-top: 2px; }
  .lk-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; font-weight: 800; color: var(--ink-faint); margin-bottom: 10px; }
  .lk-meters { margin-bottom: 18px; }
  .lk-meter { margin-bottom: 12px; }
  .lk-meter-top { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink-soft); margin-bottom: 5px; }
  .lk-meter-top .over { color: var(--rose); font-weight: 700; }
  .lk-meter-bar { height: 7px; border-radius: 100px; background: rgba(0,0,0,0.07); overflow: hidden; }
  .lk-meter-fill { height: 100%; border-radius: 100px; transition: width .3s ease; }
  .lk-hint { font-size: 11.5px; color: var(--ink-faint); margin-top: 4px; line-height: 1.5; }
  .lk-info { border-top: 1px solid var(--glass-border); padding-top: 16px; margin-bottom: 16px; }
  .lk-row { display: flex; justify-content: space-between; font-size: 13.5px; padding: 5px 0; color: var(--ink-soft); }
  .lk-row b { color: var(--ink); font-weight: 600; }
  .lk-docs { display: flex; gap: 16px; margin-bottom: 14px; }
  .lk-docs a { font-size: 12.5px; color: var(--ink-faint); text-decoration: none; }
  .lk-docs a:hover { color: var(--accent); text-decoration: underline; }
  .lk-logout {
    width: 100%; padding: 11px; border-radius: 12px; cursor: pointer;
    background: none; border: 1px solid var(--glass-border); color: var(--rose);
    font-family: inherit; font-size: 13.5px; font-weight: 600;
  }
  .lk-logout:hover { background: rgba(192,82,74,0.08); }

  .paywall-card {
    width: min(400px, 92vw); text-align: center;
    background: var(--glass-strong); border: 1px solid var(--glass-border);
    backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%);
    border-radius: 24px; padding: 28px 26px; box-shadow: 0 30px 80px rgba(15,50,40,0.28);
  }
  .paywall-emoji { font-size: 40px; margin-bottom: 8px; }
  .paywall-title { font-family: 'Familjen Grotesk', sans-serif; font-size: 21px; font-weight: 700; color: var(--ink); margin: 0 0 8px; letter-spacing: -0.02em; }
  .paywall-body { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin: 0 0 18px; }
  .paywall-list { list-style: none; padding: 0; margin: 0 0 22px; text-align: left; display: flex; flex-direction: column; gap: 9px; }
  .paywall-list li { font-size: 13.5px; color: var(--ink-soft); padding-left: 26px; position: relative; }
  .paywall-list li::before { content: "✓"; position: absolute; left: 4px; color: var(--accent); font-weight: 800; }
  .paywall-card .btn-primary { width: 100%; }
  .paywall-later { background: none; border: none; cursor: pointer; color: var(--ink-faint); font-family: inherit; font-size: 13px; margin-top: 10px; padding: 6px; }
  .paywall-later:hover { color: var(--ink-soft); text-decoration: underline; }

  .filter-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .chip {
    font-size: 12px; font-weight: 600; color: var(--accent-deep);
    background: color-mix(in srgb, var(--accent) 12%, rgba(255,255,255,0.5));
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
    border-radius: 9px; padding: 5px 11px; cursor: pointer; transition: background .15s;
  }
  .chip:hover { background: color-mix(in srgb, var(--accent) 20%, rgba(255,255,255,0.5)); }

  .empty-state { text-align: center; padding: 60px 20px; color: var(--ink-faint); }
  .empty-state .empty-ic { font-size: 40px; opacity: 0.4; display: block; margin-bottom: 12px; }
  .empty-state p { font-size: 15px; margin-bottom: 16px; }

  .section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; text-align: left; }
  .section-title { text-align: left; }
  .ing-head-right { display: flex; align-items: center; gap: 14px; }
  .ing-sort { max-width: 220px; }
  .section-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: clamp(20px, 3vw, 26px); letter-spacing: -0.02em; }
  .count { font-size: 13px; color: var(--ink-faint); font-weight: 500; }

  /* ── Витрина: вертикальные карточки-банки ── */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; position: relative; z-index: 1; }
  .card {
    background: linear-gradient(160deg, rgba(225,238,252,0.55), rgba(208,226,244,0.42));
    border: 1px solid rgba(170,208,238,0.38);
    backdrop-filter: blur(18px) saturate(120%); -webkit-backdrop-filter: blur(18px) saturate(120%);
    border-radius: 20px; overflow: hidden; cursor: pointer;
    box-shadow: 0 2px 12px rgba(30,80,140,0.07); transition: transform .18s, box-shadow .25s;
    display: flex; flex-direction: column;
  }
  .card:hover { transform: scale(1.033); box-shadow: 0 8px 28px rgba(30,80,140,0.13); }
  .card-media {
    aspect-ratio: 3 / 4;  /* вертикально-ориентированная банка/флакон */
    background: linear-gradient(150deg, rgba(235,245,255,0.65), rgba(210,228,245,0.45));
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .card-media img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
  .card-media .ph { font-size: 30px; color: var(--ink-faint); opacity: .5; }
  .card-type {
    position: absolute; top: 10px; left: 10px;
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em;
    background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);
    color: var(--ink-soft); padding: 4px 9px; border-radius: 8px;
  }
  .card-body { padding: 14px 15px 16px; display: flex; flex-direction: column; flex: 1; }
  .card-name {
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 14px; line-height: 1.3;
    letter-spacing: -0.01em; margin-bottom: 6px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    min-height: calc(3 * 1.3em);  /* фиксируем высоту под 3 строки — бренд всегда на одном уровне */
  }
  .card-brand { font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
  .card-fns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  /* цветное стекло — цвет задаётся инлайн через --fn (hue функции) */
  .fn-glass {
    font-size: 11px; font-weight: 600; padding: 5px 10px; border-radius: 9px;
    color: var(--fn); white-space: nowrap;
    background: color-mix(in srgb, var(--fn) 14%, rgba(255,255,255,0.5));
    border: 1px solid color-mix(in srgb, var(--fn) 32%, transparent);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.5);
  }
  /* бледный вариант для "немного ..." */
  .fn-glass.soft {
    background: color-mix(in srgb, var(--fn) 7%, rgba(255,255,255,0.42));
    border-color: color-mix(in srgb, var(--fn) 18%, transparent);
    color: color-mix(in srgb, var(--fn) 70%, var(--ink-soft));
    font-weight: 600;
  }

  /* ── Блок заметок (notes) в модалке ── */
  .notes-block {
    margin-top: 12px; padding: 12px 14px;
    background: linear-gradient(135deg, rgba(230,244,255,0.6), rgba(218,238,252,0.5));
    border: 1px solid rgba(100,170,230,0.28); border-radius: 14px;
  }
  .notes-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
    border-radius: 20px; padding: 3px 10px; margin-bottom: 7px;
  }
  .badge-gold { background: rgba(255,215,0,0.22); color: #8a6a00; border: 1px solid rgba(255,200,0,0.35); }
  .badge-star { background: rgba(100,160,240,0.18); color: #1a5a9a; border: 1px solid rgba(100,160,240,0.3); }
  .notes-text { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }
  /* компактная авто-сводка вместо крупного блока наград */
  .summary-block {
    margin-top: 12px; padding: 11px 14px;
    background: linear-gradient(135deg, rgba(225,242,235,0.55), rgba(214,236,228,0.45));
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); border-radius: 13px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .summary-block .notes-badge { margin-bottom: 0; align-self: flex-start; }
  .summary-text { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }

  /* ── Модалка карточки продукта ── */
  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(40,55,75,0.35); backdrop-filter: blur(4px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: clamp(1rem, 4vh, 3rem) 1rem; overflow-y: auto;
  }
  .modal {
    width: 100%; max-width: 880px; margin: auto;
    background: linear-gradient(160deg, rgba(240,248,255,0.82), rgba(228,241,237,0.78));
    border: 1px solid rgba(180,215,240,0.55);
    backdrop-filter: blur(34px) saturate(150%); -webkit-backdrop-filter: blur(34px) saturate(150%);
    border-radius: 24px; box-shadow: 0 18px 50px rgba(30,80,140,0.13);
    overflow: hidden;
  }
  .modal-head { display: grid; grid-template-columns: 280px 1fr; gap: 0; }
  @media (max-width: 640px) { .modal-head { grid-template-columns: 1fr; } }
  .modal-media {
    aspect-ratio: 3 / 4;
    background: linear-gradient(150deg, rgba(230,243,255,0.75), rgba(205,228,248,0.55));
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .modal-media img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
  .modal-media .ph { font-size: 44px; color: var(--ink-faint); opacity: .5; }
  .modal-info { padding: 22px 24px; position: relative; }
  .modal-close {
    position: absolute; top: 14px; right: 14px; width: 32px; height: 32px;
    border-radius: 50%; border: none; cursor: pointer; font-size: 15px;
    background: rgba(255,255,255,0.6); color: var(--ink-soft);
    display: flex; align-items: center; justify-content: center;
  }
  .modal-close:hover { background: white; }
  .modal-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 21px; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 6px; padding-right: 36px; }
  .modal-brand { font-size: 12px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .07em; font-weight: 600; }
  .modal-desc { font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; margin-top: 12px; }
  .meta-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line); }
  .meta-item { display: flex; flex-direction: column; gap: 3px; }
  .meta-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; }
  .meta-value { font-size: 13.5px; color: var(--ink); font-weight: 600; }
  .meta-link { cursor: pointer; border-bottom: 1px dashed var(--ink-faint); transition: color .15s, border-color .15s; }
  .meta-link:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .fn-clickable { cursor: pointer; transition: transform .12s, box-shadow .15s; }
  .fn-clickable:hover { transform: translateY(-1px); box-shadow: 0 3px 10px rgba(15,75,55,0.14); }
  .safety-link { cursor: pointer; transition: background .15s; }
  .safety-link:hover { background: rgba(255,255,255,0.72); }
  .safety-arrow { margin-left: auto; color: var(--ink-faint); font-size: 16px; align-self: center; }
  .fn-block { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
  .fn-block-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; display: block; margin-bottom: 9px; }
  .fn-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .fn-glass-lg {
    font-size: 13px; font-weight: 600; padding: 8px 14px; border-radius: 12px;
    color: var(--fn); display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Familjen Grotesk', sans-serif;
    background: color-mix(in srgb, var(--fn) 15%, rgba(255,255,255,0.55));
    border: 1px solid color-mix(in srgb, var(--fn) 34%, transparent);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.55), 0 2px 8px color-mix(in srgb, var(--fn) 14%, transparent);
  }
  .fn-glass-lg.soft {
    background: color-mix(in srgb, var(--fn) 8%, rgba(255,255,255,0.45));
    border-color: color-mix(in srgb, var(--fn) 20%, transparent);
    color: color-mix(in srgb, var(--fn) 72%, var(--ink-soft));
  }
  .fn-glass-lg .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--fn); flex-shrink: 0; }
  .fn-glass-lg.soft .dot { opacity: 0.5; }
  .compo-divider { display: flex; align-items: center; gap: 10px; margin: 10px 2px; }
  .compo-divider .ln { flex: 1; height: 1px; background: var(--line); }
  .compo-divider .lbl { font-size: 11px; font-weight: 600; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; }
  .ing.minor { opacity: 0.62; }
  .chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
  .chip { font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 20px; background: rgba(255,255,255,0.55); border: 1px solid var(--glass-border); color: var(--ink-soft); }
  .chip-attr { background: rgba(123,168,127,0.14); color: #5a8560; border-color: rgba(123,168,127,0.3); }
  .photo-btn { margin-top: 14px; }

  .safety { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); }
  .safety-ring { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; color: white; }
  .safety-txt b { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 14px; display: block; }
  .safety-txt span { font-size: 12px; color: var(--ink-soft); }

  .compo { padding: 0 24px 24px; }
  .compo-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-soft); margin: 8px 0 12px; }
  .compo-head span { color: var(--ink-faint); font-weight: 500; text-transform: none; letter-spacing: 0; }
  .ing-list { display: flex; flex-direction: column; max-height: 440px; overflow-y: auto; }
  .ing-list::-webkit-scrollbar { width: 6px; }
  .ing-list::-webkit-scrollbar-thumb { background: rgba(60,110,88,0.3); border-radius: 3px; }
  .ing-grid { display: grid; grid-template-columns: 26px minmax(150px,1.2fr) minmax(120px,150px) 1.1fr; gap: 0; align-items: stretch; }
  .ing-colhead {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--accent-deep);
    padding: 10px 14px 9px; position: sticky; top: 0; z-index: 2;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 13%, rgba(238,244,240,0.95)), color-mix(in srgb, var(--accent) 9%, rgba(236,243,239,0.92)));
    border-bottom: 1.5px solid color-mix(in srgb, var(--accent) 28%, transparent);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  }
  .ing-colhead:first-child { border-top-left-radius: 12px; }
  .ing-colhead:last-child { border-top-right-radius: 12px; }
  .ing-colhead + .ing-colhead { border-left: 1px solid color-mix(in srgb, var(--accent) 14%, transparent); }
  .ing-cell { padding: 13px 14px; border-bottom: 1px solid var(--line); text-align: left; }
  .ing-grid:hover .ing-cell-hover { background: rgba(255,255,255,0.45); }
  .ing-cell-sep { border-left: 1px solid var(--line); }
  .ing-pos { font-size: 12px; color: var(--ink-faint); font-weight: 600; }
  .ing-inci { font-weight: 600; font-size: 14.5px; color: var(--ink); display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .ing-ru { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; text-align: left; }
  .ing-sub { font-size: 12.5px; color: var(--ink-soft); line-height: 1.45; }
  .ing-sub .lbl { color: var(--ink-faint); display: block; font-size: 11px; margin-bottom: 1px; }
  .ing-desc { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }
  .ing-oil { font-size: 11.5px; color: #a06f2a; margin-top: 4px; }
  .badge-eu { font-size: 10px; font-weight: 700; color: var(--rose); background: rgba(193,123,138,0.13); border-radius: 6px; padding: 2px 7px; letter-spacing: .02em; cursor: help; }
  .badge-na { font-size: 10px; color: var(--ink-faint); font-style: italic; }
  .g-tag {
    font-size: 12px; font-weight: 600; padding: 5px 11px; border-radius: 9px;
    line-height: 1.25; cursor: pointer; transition: transform .12s, box-shadow .15s; display: inline-block;
    max-width: 100%; overflow-wrap: anywhere; word-break: break-word; white-space: normal;
  }
  .g-tag:hover { transform: translateY(-1px); box-shadow: 0 3px 10px rgba(15,75,55,0.16); }
  .sub-link { cursor: pointer; border-bottom: 1px dashed var(--ink-faint); transition: color .15s; }
  .sub-link:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .minor .ing-cell { opacity: 0.6; }

  /* ── Справочник: таблица ── */
  .table-wrap {
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-radius: 18px; overflow: hidden;
  }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th {
    text-align: left; font-family: 'Manrope', sans-serif; font-weight: 700;
    font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint);
    padding: 14px 18px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.3);
    vertical-align: middle;
  }
  td { text-align: left; padding: 13px 18px; border-bottom: 1px solid var(--line); font-size: 13.5px; vertical-align: top; }
  td:not(:last-child) { border-right: 1px solid var(--line); }
  th:not(:last-child) { border-right: 1px solid var(--line); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.4); }
  .td-inci { font-weight: 600; color: var(--ink); }
  .inci-link { cursor: pointer; border-bottom: 1px solid transparent; transition: color .15s, border-color .15s; }
  .inci-link:hover { color: var(--accent); border-bottom-color: var(--accent); }

  /* ── ДЕТАЛЬНАЯ КАРТОЧКА (ингредиент / группа) ── */
  .dm-modal { max-width: 680px; position: relative; }
  .dm-body { padding: 30px 32px 32px; max-height: 82vh; overflow-y: auto; }
  .dm-body::-webkit-scrollbar { width: 6px; }
  .dm-body::-webkit-scrollbar-thumb { background: rgba(60,110,88,0.3); border-radius: 3px; }
  .dm-head { margin-bottom: 16px; padding-right: 30px; }
  .dm-kind { font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; color: var(--ink-faint); font-weight: 700; }
  .dm-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 24px; line-height: 1.15; letter-spacing: -0.02em; margin-top: 4px; color: var(--ink); }
  .dm-sub { font-size: 14px; color: var(--ink-soft); margin-top: 3px; }
  .dm-allergen { display: inline-block; margin-top: 8px; font-size: 11px; font-weight: 700; color: var(--rose); background: rgba(193,123,138,0.13); border-radius: 7px; padding: 3px 10px; }
  .dm-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin-bottom: 8px; }
  .dm-muted { color: var(--ink-faint); font-style: italic; }
  .dm-section { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
  .dm-label { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; margin-bottom: 12px; }
  .dm-grouprow { margin-bottom: 14px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .dm-arrow { color: var(--ink-faint); font-size: 13px; }
  .dm-subtag { font-size: 13px; font-weight: 600; color: var(--accent-deep); cursor: pointer; border-bottom: 1px dashed var(--ink-faint); }
  .dm-subtag:hover { border-bottom-color: var(--accent); }
  .dm-groupdesc { flex-basis: 100%; font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin-top: 4px; padding-left: 2px; }
  .dm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .dm-ingchip { font-size: 12.5px; font-weight: 600; color: var(--ink-soft); background: rgba(255,255,255,0.55); border: 1px solid var(--glass-border); border-radius: 9px; padding: 6px 11px; cursor: pointer; transition: background .15s, color .15s; }
  .dm-ingchip:hover { background: var(--glass-strong); color: var(--accent-deep); }
  .dm-prodlist { display: flex; flex-direction: column; gap: 8px; }
  .dm-prodcard { display: flex; flex-direction: row; align-items: center; gap: 12px; text-align: left; cursor: pointer; width: 100%;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); border-radius: 12px; padding: 9px 12px; font-family: inherit;
    transition: background .15s, transform .12s; }
  .dm-prodcard:hover { background: var(--glass-strong); transform: translateX(2px); }
  .dm-prodmeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .pt-img { object-fit: cover; border-radius: 9px; flex-shrink: 0; background: rgba(255,255,255,0.5); }
  .pt-ph { flex-shrink: 0; border-radius: 9px; background: color-mix(in srgb, var(--tint) 8%, rgba(255,255,255,0.55)); border: 1px solid color-mix(in srgb, var(--tint) 18%, transparent); display: flex; align-items: center; justify-content: center; padding: 3px; }

  /* ── Блок похожих по составу (в модалке средства) ── */
  .similar-block { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
  .similar-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
  .similar-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 15px; color: var(--ink); }
  .similar-hint { font-size: 11px; color: var(--ink-faint); }
  .similar-list { display: flex; flex-direction: column; gap: 8px; }
  .similar-card { display: flex; align-items: center; gap: 14px; width: 100%; text-align: left; cursor: pointer; font-family: inherit;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); border-radius: 14px; padding: 12px 14px;
    transition: background .15s, transform .12s; }
  .similar-card:hover { background: var(--glass-strong); transform: translateX(2px); }
  .similar-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
  .similar-name { font-size: 14px; font-weight: 600; color: var(--ink); line-height: 1.25; }
  .similar-right { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0; }
  .similar-match { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--m); }
  .similar-matchlbl { font-size: 9.5px; text-transform: uppercase; letter-spacing: .05em; color: var(--ink-faint); font-weight: 600; }
  .similar-cheaper { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: var(--accent); background: rgba(15,107,77,0.12); border-radius: 6px; padding: 2px 7px; }

  /* ── Плиточные мини-карточки средств (похожие / встречается в) ── */
  /* размер колонок подстраивается, но не уже минимума — изображение остаётся читаемым */
  .pcards { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); }
  .pcards.few { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .pcard {
    position: relative; isolation: isolate; overflow: hidden;
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 16px; cursor: pointer; text-align: left; font-family: inherit; padding: 0;
    box-shadow: var(--shadow-sm); transition: transform .18s, box-shadow .25s;
    display: flex; flex-direction: column;
  }
  .pcard:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  /* шёлковый блик — диагональный световой проход поверх карточки при наведении */
  .pcard::after {
    content: ""; position: absolute; inset: 0; z-index: 3; pointer-events: none; border-radius: inherit;
    background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 47%, rgba(255,255,255,0.18) 53%, transparent 70%);
    background-size: 280% 280%; background-position: 130% 0; opacity: 0;
    transition: opacity .25s;
  }
  .pcard:hover::after { opacity: 1; animation: silk 1.1s ease forwards; }
  @keyframes silk { 0% { background-position: 130% 0; } 100% { background-position: -60% 0; } }
  .pcard-media {
    aspect-ratio: 3 / 4; position: relative;
    background: linear-gradient(150deg, rgba(225,238,252,0.55), rgba(208,226,244,0.42));
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .pcard-media img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
  .pcard-media .ph { font-size: 26px; color: var(--ink-faint); opacity: .5; }
  .pcard-type {
    position: absolute; top: 7px; left: 7px; z-index: 2;
    font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em;
    background: rgba(255,255,255,0.72); backdrop-filter: blur(6px);
    color: var(--ink-soft); padding: 3px 7px; border-radius: 7px;
  }
  .pcard-match {
    position: absolute; top: 7px; right: 7px; z-index: 2;
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 12px; color: #fff;
    background: var(--m); border-radius: 8px; padding: 3px 7px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .pcard-body { padding: 9px 10px 11px; }
  .pcard-name { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 12.5px; line-height: 1.28; letter-spacing: -0.01em; color: var(--ink);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pcard-brand { font-size: 9.5px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .05em; font-weight: 600; margin-top: 4px; }

  /* ── Вкладка «Сравнение составов» ── */
  .sim-intro { font-size: 14px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 20px; max-width: 760px; }
  .sim-tab .sim-intro { max-width: 680px; margin-left: auto; margin-right: auto; text-align: center; }
  .cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  @media (max-width: 720px) { .cmp-grid { grid-template-columns: 1fr; } }
  .cmp-side { display: flex; flex-direction: column; gap: 8px;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 16px; padding: 16px 18px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .cmp-side-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 15px; color: var(--ink); margin-bottom: 4px; }
  .cmp-mode { display: flex; gap: 6px; margin-bottom: 6px; }
  .cmp-mode-btn { flex: 1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; padding: 8px 10px; border-radius: 10px;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .cmp-mode-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
  .cmp-sort { display: flex; gap: 6px; }
  .cmp-sort-btn { flex: 1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; padding: 9px 10px; border-radius: 10px;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .cmp-sort-btn.active { background: var(--accent-deep); color: white; border-color: var(--accent-deep); }
  .sim-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; }
  .sim-textarea, .sim-select {
    width: 100%; font-family: inherit; font-size: 13.5px; color: var(--ink);
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 11px 13px; outline: none;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: border-color .2s;
  }
  .sim-textarea { resize: vertical; line-height: 1.5; min-height: 88px; }
  .sim-textarea:focus, .sim-select:focus { border-color: var(--accent); }
  .sim-or { align-self: center; font-size: 12px; font-weight: 700; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .08em; }
  .sim-or-sm { font-size: 10.5px; margin: 2px 0; }
  .sim-single { max-width: 680px; margin: 0 auto 8px; display: flex; flex-direction: column; gap: 10px;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 18px;
    padding: 22px 24px; box-shadow: var(--shadow-sm);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); }
  .sim-manual { margin-top: 6px; }
  .sim-manual > summary { cursor: pointer; font-size: 12.5px; color: var(--accent-deep); font-weight: 600; padding: 4px 0; list-style: none; user-select: none; }
  .sim-manual > summary::-webkit-details-marker { display: none; }
  .sim-manual > summary::before { content: "＋ "; }
  .sim-manual[open] > summary::before { content: "－ "; }
  .sim-manual > * { margin-top: 8px; }
  .sim-select-sm { width: auto; min-width: 150px; font-size: 12.5px; padding: 7px 11px; }
  .results-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 4px 0 14px; }
  .results-controls { display: flex; gap: 8px; flex-wrap: wrap; }
  .cmp-picked-card { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 14px;
    background: var(--glass); border: 1px solid var(--glass-border); position: relative; }
  .cmp-picked-clickable { cursor: pointer; transition: transform .12s, box-shadow .2s; }
  .cmp-picked-clickable:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); }
  .cmp-picked-card .pt-img, .cmp-picked-card .pt-ph { width: 48px !important; height: 56px !important; flex: 0 0 48px; border-radius: 10px; }
  .cmp-picked-meta { min-width: 0; flex: 1; }
  .cmp-picked-name { font-size: 14px; font-weight: 650; color: var(--ink); line-height: 1.3; }
  .cmp-picked-brand { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
  .cmp-picked-type { font-size: 11px; color: var(--ink-faint); margin-top: 3px; }
  .cmp-picked-x { position: absolute; top: 6px; right: 8px; border: none; background: transparent; cursor: pointer;
    font-size: 20px; line-height: 1; color: var(--ink-faint); padding: 2px 6px; border-radius: 8px; }
  .cmp-picked-x:hover { color: var(--ink); background: var(--glass-border); }
  .cmp-actions { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .cmp-hint { font-size: 12.5px; color: var(--ink-faint); }
  .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
  .sim-result-card { display: flex; align-items: center; gap: 13px; cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 12px 14px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); transition: transform .12s, box-shadow .2s; }
  .sim-result-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .sim-result-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
  .sim-shared { font-size: 11px; color: var(--ink-faint); margin-top: 3px; line-height: 1.4; }
  /* прямое сравнение двух составов */
  .cmp-pair { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px; padding: 22px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .cmp-pair-score { display: flex; flex-direction: column; align-items: center; gap: 2px; margin-bottom: 22px; }
  .cmp-pair-num { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 44px; color: var(--m); line-height: 1; }
  .cmp-pair-lbl { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; }
  .cmp-pair-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 640px) { .cmp-pair-cols { grid-template-columns: 1fr; } }
  .cmp-pair-col { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
  .cmp-tag { font-size: 12px; font-weight: 600; color: var(--ink-soft); background: rgba(255,255,255,0.55);
    border: 1px solid var(--glass-border); border-radius: 8px; padding: 4px 9px; }
  .cmp-tag.shared { color: var(--accent-deep); background: rgba(15,107,77,0.1); border-color: color-mix(in srgb, var(--accent) 24%, transparent); }
  .dm-prodtype { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); font-weight: 700; }
  .dm-prodname { font-size: 14px; font-weight: 600; color: var(--ink); }
  .dm-prodbrand { font-size: 12px; color: var(--ink-faint); }
  .cell-input {
    width: 100%; font-family: inherit; font-size: 13px; color: var(--ink);
    background: white; border: 1px solid var(--accent); border-radius: 8px; padding: 6px 10px; outline: none;
  }
  .cell-edit-hint { cursor: pointer; border-bottom: 1px dashed transparent; }
  tr:hover .cell-edit-hint { border-bottom-color: var(--ink-faint); }

  .pager { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; flex-wrap: wrap; gap: 12px; }
  .pager-controls { display: flex; align-items: center; gap: 6px; }
  .pg-btn {
    min-width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--glass-border);
    background: var(--glass); color: var(--ink-soft); font-weight: 600; font-size: 13px; cursor: pointer;
    backdrop-filter: blur(8px);
  }
  .pg-btn:hover:not(:disabled) { background: var(--glass-strong); color: var(--ink); }
  .pg-btn:disabled { opacity: .4; cursor: default; }
  .pg-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
  .pg-size { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-soft); }
  .pg-size select {
    font-family: inherit; font-size: 13px; color: var(--ink); cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 10px; padding: 7px 10px; outline: none;
  }
  .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
  .pill {
    font-size: 12.5px; font-weight: 600; padding: 8px 15px; border-radius: 11px; cursor: pointer;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft);
    transition: background .16s, color .16s, border-color .16s, box-shadow .16s; letter-spacing: -0.01em;
  }
  .pill:hover { background: color-mix(in srgb, var(--accent) 12%, rgba(255,255,255,0.6)); border-color: color-mix(in srgb, var(--accent) 30%, transparent); color: var(--accent-deep); }
  .pill.active {
    background: var(--accent-deep); color: #fff; border-color: var(--accent-deep);
    box-shadow: 0 3px 12px color-mix(in srgb, var(--accent-deep) 35%, transparent);
  }
  .pill-sub { font-size: 12px; padding: 6px 13px; border-radius: 9px; }
  .pill-sub.active { background: color-mix(in srgb, var(--accent-deep) 82%, transparent); }

  .admin-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-soft); font-weight: 600; cursor: pointer; user-select: none; }
  .switch { width: 38px; height: 22px; border-radius: 11px; background: rgba(120,135,155,0.3); position: relative; transition: background .2s; flex-shrink: 0; }
  .switch.on { background: var(--accent); }
  .switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform .2s; }
  .switch.on::after { transform: translateX(16px); }

  /* ── Кнопки сравнения в карточке ингредиента ── */
  .dm-cmp-actions { display: flex; gap: 9px; flex-wrap: wrap; margin: 4px 0 4px; }
  .btn.is-added { color: var(--accent-deep); border-color: color-mix(in srgb, var(--accent) 32%, transparent); }

  /* ── Поиск средства автокомплитом (вкладка сравнения) ── */
  .ac-wrap { position: relative; }
  .ac-input {
    width: 100%; font-family: inherit; font-size: 13.5px; color: var(--ink);
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 11px 13px; outline: none;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: border-color .2s;
  }
  .ac-input:focus { border-color: var(--accent); }
  .ac-drop {
    position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 30; max-height: 280px; overflow-y: auto;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 14px;
    backdrop-filter: blur(20px) saturate(150%); -webkit-backdrop-filter: blur(20px) saturate(150%);
    box-shadow: var(--shadow); padding: 6px;
  }
  .ac-opt { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; cursor: pointer; font-family: inherit;
    background: transparent; border: none; border-radius: 10px; padding: 8px 9px; transition: background .12s; }
  .ac-opt:hover { background: var(--glass-strong); }
  .ac-opt-meta { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .ac-opt-name { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.2; }
  .ac-opt-brand { font-size: 11px; color: var(--ink-faint); }
  .ac-empty { padding: 10px; font-size: 13px; color: var(--ink-faint); }
  /* выбранное средство — чип */
  .ac-chosen { display: flex; align-items: center; gap: 11px;
    background: var(--glass); border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--glass-border)); border-radius: 12px; padding: 9px 11px; }
  .ac-chosen-meta { display: flex; flex-direction: column; gap: 1px; min-width: 0; flex: 1; }
  .ac-clear { flex-shrink: 0; cursor: pointer; border: none; background: rgba(255,255,255,0.6); color: var(--ink-soft);
    width: 26px; height: 26px; border-radius: 50%; font-size: 13px; }
  .ac-clear:hover { color: var(--ink); }

  /* ── Компактные поля ввода состава ── */
  .sim-textarea.compact { min-height: 56px; rows: 2; }
  .ana-controls { display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap; margin-bottom: 8px; }
  .ana-controls .filter-field { min-width: 180px; }

  /* автоопределение типа */
  .type-detect { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; font-size: 12.5px; color: var(--ink-soft); }
  .type-detect b { color: var(--accent-deep); font-weight: 700; }
  .type-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .type-pill { font-size: 11.5px; font-weight: 600; padding: 4px 11px; border-radius: 16px; cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .type-pill.active { background: var(--accent); color: white; border-color: var(--accent); }

  /* ── Центральная кнопка «Сравнить/Найти» ── */
  .cmp-cta { display: flex; flex-direction: column; align-items: center; gap: 8px; margin: 22px 0; }
  .btn-cta { padding: 13px 54px; font-size: 15px; border-radius: 14px; font-weight: 700; }

  /* ── Свёрнутая строка ввода после запуска ── */
  .input-collapsed {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 14px; padding: 10px 14px; margin-bottom: 20px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .ic-summary { font-size: 13px; color: var(--ink-soft); flex: 1; min-width: 0; }
  .ic-summary b { color: var(--ink); font-weight: 600; }
  .ic-edit { margin-left: auto; }

  /* ── Карта функций результата сравнения (что будет делать средство) ── */
  .fn-result { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px; padding: 22px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); margin-bottom: 16px; }
  .fn-result-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 16px; color: var(--ink); margin-bottom: 4px; }
  .fn-result-sub { font-size: 12.5px; color: var(--ink-faint); margin-bottom: 16px; }
  .fn-result-list { display: flex; flex-wrap: wrap; gap: 9px; }
  .cmp-tech { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); font-size: 12.5px; color: var(--ink-faint); }
  .cmp-tech b { color: var(--ink-soft); font-weight: 600; }

  /* Кнопка добавления в сравнение (в карточке средства) */
  .cmp-add-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .cmp-add-row .is-added { color: var(--accent-deep); border-color: color-mix(in srgb, var(--accent-deep) 40%, transparent); }
  .cmp-add-note { margin-top: 8px; font-size: 12.5px; color: #c0584f; font-weight: 600; }

  /* Матрица сравнения (до 5 средств) */
  .cmp-empty { text-align: center; padding: 40px 16px; }
  .cmp-matrix-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 4px; }
  .cmp-matrix { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 520px; table-layout: fixed; }
  .cmp-matrix th, .cmp-matrix td { vertical-align: top; padding: 12px 12px; border-bottom: 1px solid var(--line); }
  .cmp-corner { width: 150px; background: transparent; border-bottom: none; }
  .cmp-col-head { position: relative; text-align: center; background: var(--glass-warm); border-bottom: 2px solid var(--line); border-top-left-radius: 12px; border-top-right-radius: 12px; }
  .cmp-col-x { position: absolute; top: 6px; right: 6px; width: 22px; height: 22px; border-radius: 50%; border: none; background: rgba(0,0,0,0.06); color: var(--ink-soft); cursor: pointer; font-size: 15px; line-height: 1; z-index: 2; }
  .cmp-col-x:hover { background: #c0584f; color: #fff; }
  .cmp-col-card { cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .cmp-col-name { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.25; }
  .cmp-col-brand { font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .05em; }
  .cmp-row-label { width: 150px; font-size: 12.5px; font-weight: 700; color: var(--ink-soft); background: color-mix(in srgb, var(--accent-deep) 4%, transparent); display: flex; flex-direction: column; gap: 2px; }
  .cmp-row-sub { font-size: 10.5px; font-weight: 500; color: var(--ink-faint); text-transform: none; letter-spacing: 0; }
  .cmp-cell { font-size: 13px; color: var(--ink); }
  .cmp-fn-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .cmp-safety { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
  .cmp-safety-ring { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 13px; }
  .cmp-safety-lbl { font-size: 12px; font-weight: 600; }
  .cmp-sim-pct { font-weight: 700; font-size: 15px; color: var(--m); }
  .cmp-base-pill { font-size: 11px; font-weight: 600; color: var(--accent-deep); background: color-mix(in srgb, var(--accent-deep) 10%, transparent); padding: 3px 9px; border-radius: 999px; }
  .cmp-note-text { font-size: 12.5px; color: var(--ink-soft); line-height: 1.45; white-space: pre-wrap; }

  /* ─── ЗАГРУЗОЧНЫЙ МАСКОТ (встроенный, на вкладках) ──────────────────────── */
  .loading-inline {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 60px 20px;
  }
  .loading-fullscreen {
    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: linear-gradient(168deg, #eef5f3, #e6f1ee 55%, #e0eeea);
  }
  .loading-mascot {
    position: relative; width: 180px;
    filter: drop-shadow(0 10px 18px rgba(40,30,70,0.2));
    animation: mascotBob 2.4s ease-in-out infinite;
  }
  @keyframes mascotBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }
  .loading-mascot img { width: 100%; display: block; }
  .loading-dots { display: flex; gap: 8px; margin-top: 20px; }
  .loading-dots span {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--accent); opacity: 0.4;
    animation: dotPulse 1.2s ease-in-out infinite;
  }
  .loading-dots span:nth-child(2) { animation-delay: .2s; }
  .loading-dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.15); }
  }

  /* ─── ЭКРАН ВХОДА v3 ───────────────────────────────────────────────── */
  .login3-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem;
    background:
      radial-gradient(120% 75% at 50% -8%, #e2f0ec 0%, rgba(226,240,236,0) 55%),
      radial-gradient(110% 80% at 88% 112%, #d8ece7 0%, rgba(216,236,231,0) 50%),
      linear-gradient(168deg, #eef5f3, #e6f1ee 55%, #e0eeea);
  }
  .login3-stage { position: relative; width: 100%; max-width: 340px; }

  /* персонаж за карточкой — выглядывает сверху, увеличен */
  .me-figure {
    position: relative; width: 300px; margin: 0 auto -120px; z-index: 1;
    filter: drop-shadow(0 16px 26px rgba(40,30,70,0.3));
    pointer-events: none;
  }
  .me-figure img { width: 100%; display: block; user-select: none; }
  .me-eye {
    position: absolute; width: 34px; height: 34px; margin: -17px 0 0 -17px;
    display: flex; align-items: center; justify-content: center;
  }
  .me-patch {
    position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(circle at 50% 45%, #4a1f72 0%, #4a1f72 42%, rgba(74,31,114,0.55) 64%, rgba(74,31,114,0) 100%);
  }
  .me-pupil {
    position: relative; z-index: 2; width: 16px; height: 16px; border-radius: 50%;
    background: radial-gradient(circle at 38% 30%, #4a4458 0%, #0c0810 72%);
    box-shadow: 1px -1px 0 0.5px rgba(255,255,255,0.78);
    transition: transform .1s ease-out;
  }
  .me-closed { position: relative; z-index: 2; width: 30px; height: 17px; overflow: visible; }
  .me-closed path { fill: none; stroke: #2a1240; stroke-width: 2.6; stroke-linecap: round; }

  /* карточка — компактная, холодное стекло, зелёный кант по периметру */
  .login3-card {
    position: relative; z-index: 2; text-align: center;
    padding: 74px 26px 26px;
    background: linear-gradient(160deg, rgba(245,251,250,0.7), rgba(228,241,237,0.62));
    border: 1.5px solid color-mix(in srgb, var(--accent) 40%, transparent);
    border-radius: 22px;
    box-shadow:
      0 24px 56px -26px rgba(20,60,48,0.38),
      0 1px 0 rgba(255,255,255,0.6) inset;
    backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%);
  }
  .login3-title {
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 30px;
    letter-spacing: -0.025em; color: var(--ink); margin: 0 0 4px; line-height: 1.05;
  }
  .login3-title span { color: var(--accent); }
  .login3-sub { font-size: 13px; color: var(--ink-soft); margin: 0 0 1.4rem; }

  .login3-field { margin-bottom: 13px; text-align: left; }
  .login3-label {
    font-size: 10.5px; font-weight: 700; color: var(--ink-faint);
    text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; display: block;
  }
  .login3-input {
    width: 100%; box-sizing: border-box; font-family: inherit; font-size: 15px; padding: 11px 14px;
    border-radius: 12px; color: var(--ink); background: rgba(255,255,255,0.66);
    border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--glass-border));
    outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .login3-input::placeholder { color: var(--ink-faint); }
  .login3-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(15,107,77,0.12); background: rgba(255,255,255,0.88); }

  /* кнопка с медленной непрерывной волной шёлка */
  .login3-btn {
    position: relative; overflow: hidden; isolation: isolate;
    width: 100%; margin-top: 8px; font-family: inherit; font-size: 15px; font-weight: 600;
    padding: 13px; border-radius: 12px; border: none; cursor: pointer; color: #fff;
    background: linear-gradient(135deg, var(--accent-deep), #073828);
    box-shadow: 0 9px 22px -8px rgba(10,74,53,0.55); transition: transform .15s, box-shadow .25s;
  }
  .login3-btn span { position: relative; z-index: 2; }
  /* волна: широкий мягкий световой гребень, медленно и непрерывно идущий слева направо */
  .login3-btn::before {
    content: ""; position: absolute; inset: -50% -10%; z-index: 1; pointer-events: none;
    background: linear-gradient(105deg,
      transparent 38%,
      rgba(255,255,255,0.10) 46%,
      rgba(255,255,255,0.30) 50%,
      rgba(255,255,255,0.10) 54%,
      transparent 62%);
    background-size: 250% 100%; background-repeat: no-repeat;
    transform: translateX(0);
    animation: silkWave 4.5s linear infinite;
    opacity: .9;
  }
  @keyframes silkWave {
    0%   { background-position: 150% 0; }
    100% { background-position: -150% 0; }
  }
  .login3-btn:hover { transform: translateY(-1px); box-shadow: 0 13px 28px -8px rgba(10,74,53,0.65); }
  .login3-btn:hover::before { animation-duration: 2.6s; }
  .login3-btn:disabled { opacity: .65; cursor: default; transform: none; }

  .login3-error {
    background: rgba(192,82,74,0.1); color: #a8463d; border: 1px solid rgba(192,82,74,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 12.5px; margin-bottom: 12px; text-align: center;
  }
  .login3-info {
    background: rgba(42,155,115,0.1); color: var(--accent-deep); border: 1px solid rgba(42,155,115,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 12.5px; margin-bottom: 12px; text-align: center;
  }

  /* ── Admin-модалки и формы: стили потерялись при переходе на UI v6, восстановлены ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(20,40,32,0.45); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: clamp(1rem, 4vh, 3rem) 1rem; overflow-y: auto;
  }
  .modal-overlay .modal {
    position: relative; max-width: 560px; margin: auto; padding: 26px 26px 22px;
    background: linear-gradient(160deg, rgba(247,252,251,0.96), rgba(233,243,239,0.94));
    border: 1px solid rgba(15,107,77,0.2); border-radius: 22px;
    backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%);
    box-shadow: 0 24px 56px -20px rgba(10,74,53,0.4);
    overflow: visible;
  }
  .form-group { margin-bottom: 1.1rem; }
  .form-label {
    display: block; margin-bottom: 6px;
    font-size: 11px; font-weight: 700; color: var(--ink-faint);
    text-transform: uppercase; letter-spacing: .07em;
  }
  .form-input {
    width: 100%; padding: 10px 14px; box-sizing: border-box;
    border: 1.5px solid var(--line); border-radius: 10px;
    font-size: 14px; font-family: 'Manrope', sans-serif; color: var(--ink);
    background: rgba(255,255,255,0.8); outline: none; transition: border-color .2s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-textarea { min-height: 80px; resize: vertical; }
  .error-msg {
    background: rgba(192,82,74,0.1); color: #a8463d; border: 1px solid rgba(192,82,74,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 13px; margin-bottom: 12px;
  }
  .btn-ghost { background: rgba(255,255,255,0.55); border: 1px solid var(--line); color: var(--ink-soft); }
  .btn-ghost:hover { background: rgba(255,255,255,0.85); }
  .ing-add-row { display: flex; gap: 8px; align-items: center; padding: 2px 0; }
  .ing-remove {
    background: none; border: none; cursor: pointer;
    color: var(--ink-faint); font-size: 17px; padding: 0 4px;
  }
  .ing-remove:hover { color: var(--danger); }

  /* ── ссылки под формой входа/регистрации ── */
  .login3-links {
    margin-top: 14px; display: flex; flex-direction: column; gap: 7px;
    font-size: 13px; color: var(--ink-faint); text-align: center;
  }
  .login3-link {
    background: none; border: none; cursor: pointer; padding: 0;
    font-size: 13px; font-weight: 700; color: var(--accent);
  }
  .login3-link:hover { text-decoration: underline; }
  .login3-link-muted { font-weight: 600; color: var(--ink-faint); }

  /* ── регистрация: прогресс и списки возможностей ── */
  .reg-progress { display: flex; gap: 4px; margin-bottom: 18px; }
  .reg-progress-seg {
    flex: 1; height: 3px; border-radius: 2px; background: rgba(60,110,88,0.15);
    transition: background .3s;
  }
  .reg-progress-seg.on { background: var(--accent); }
  .reg-perks {
    background: rgba(15,107,77,0.06); border: 1px solid rgba(15,107,77,0.14);
    border-radius: 12px; padding: 12px 14px; margin-bottom: 14px; text-align: left;
  }
  .reg-perks-head {
    font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 8px;
  }
  .reg-perks-pro { background: rgba(255,255,255,0.4); border-color: rgba(60,110,88,0.14); }
  .reg-perks-pro .reg-perks-head { color: var(--ink-faint); }
  .reg-perk {
    display: flex; align-items: center; gap: 9px;
    font-size: 13px; color: var(--ink-soft); margin-bottom: 6px;
  }
  .reg-perk:last-child { margin-bottom: 0; }
  .reg-perk-locked { color: var(--ink-faint); opacity: .75; }
  .reg-perk-dot { width: 5px; height: 5px; border-radius: 2px; background: var(--accent); flex-shrink: 0; }
  .reg-perk-check {
    width: 16px; height: 16px; border-radius: 5px; background: var(--accent); color: #fff;
    font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .reg-perk-lock {
    width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid rgba(60,110,88,0.25);
    font-size: 9px; color: var(--ink-faint); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .reg-code-input { font-size: 22px; letter-spacing: .35em; text-align: center; font-weight: 700; }
  /* регистрация поверх лендинга: фон лендинга блюрится, своя заливка экрана убирается */
  .reg-overlay {
    position: fixed; inset: 0; z-index: 400; overflow-y: auto;
    background: rgba(238,242,239,0.55);
    backdrop-filter: blur(16px) saturate(120%); -webkit-backdrop-filter: blur(16px) saturate(120%);
  }
  .reg-overlay .login3-wrap { background: none; min-height: 100vh; }
  .reg-btn-outline {
    width: 100%; margin-top: 9px; padding: 12px; border-radius: 12px; cursor: pointer;
    background: transparent; color: var(--accent); border: 1.5px solid var(--accent);
    font-weight: 600; font-size: 14px;
  }
  .reg-btn-outline:hover { background: rgba(15,107,77,0.06); }

  /* ── модал покупки и тост ── */
  .purchase-head {
    background: linear-gradient(135deg, rgba(10,74,53,0.92), rgba(15,107,77,0.95));
    border-radius: 16px; padding: 20px 22px; margin-bottom: 18px;
  }
  .purchase-head-label {
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.55);
    letter-spacing: .1em; text-transform: uppercase; margin-bottom: 7px;
  }
  .purchase-head-price {
    font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #fff;
  }
  .purchase-head-price span { font-size: 15px; font-weight: 500; opacity: .6; }
  .purchase-note { margin-top: 11px; text-align: center; font-size: 12px; color: var(--ink-faint); }
  .purchase-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    z-index: 600; background: #0a4a35; color: #fff; font-weight: 600; font-size: 14px;
    padding: 14px 28px; border-radius: 14px; box-shadow: 0 8px 28px rgba(10,74,53,0.4);
    white-space: nowrap;
  }

  /* ── юридические согласия (регистрация, оплата) ── */
  .reg-consents { display: flex; flex-direction: column; gap: 9px; margin-bottom: 14px; text-align: left; }
  .reg-consent {
    display: flex; align-items: flex-start; gap: 9px; cursor: pointer;
    font-size: 12px; color: var(--ink-soft); line-height: 1.5; user-select: none;
  }
  .reg-consent input {
    appearance: none; -webkit-appearance: none; flex-shrink: 0; margin-top: 1px;
    width: 17px; height: 17px; border-radius: 5px; cursor: pointer; position: relative;
    border: 1.5px solid color-mix(in srgb, var(--accent) 45%, transparent);
    background: rgba(255,255,255,0.7); transition: background .15s, border-color .15s;
  }
  .reg-consent input:checked { background: var(--accent); border-color: var(--accent); }
  .reg-consent input:checked::after {
    content: ""; position: absolute; left: 4.5px; top: 1px; width: 4.5px; height: 8.5px;
    border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg);
  }
  .reg-consent-link { color: var(--accent); font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }

  /* ── плашка cookie ── */
  .cookie-bar {
    position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
    z-index: 700; width: min(720px, calc(100vw - 28px));
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 14px 18px; border-radius: 16px;
    background: rgba(247,252,251,0.94); border: 1px solid rgba(15,107,77,0.22);
    backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%);
    box-shadow: 0 16px 44px -14px rgba(10,74,53,0.4);
  }
  .cookie-text { flex: 1 1 320px; font-size: 12px; color: var(--ink-soft); line-height: 1.55; }
  .cookie-agree { white-space: nowrap; font-weight: 600; }
  .cookie-bar .btn:disabled { opacity: .55; cursor: default; }

`;


// ===== Адаптеры + App (боевая логика, форма данных v6) =====

// ── АДАПТЕРЫ: боевая форма Supabase → форма, которую ждут компоненты v6 ──────
const FACE_TYPES = ["крем", "сыворотк", "spf", "тонер", "эмульс", "умыван"];
const isFaceType = (t) => FACE_TYPES.some(x => (t || "").toLowerCase().includes(x));
const priceTierOf = (rub) => rub == null ? null : rub < 700 ? "бюджетно" : rub < 1500 ? "средняя" : "высокая";

// строка состава из Supabase → { id, position, ing:{...} }
function adaptRow(row) {
  const ing = row.ingredients || null;
  const gs = ing?.ingredient_groups || [];
  const primary = gs.find(g => g.is_primary) || gs[0] || {};
  const oilArr = ing?.oils_meta;
  const oilRaw = Array.isArray(oilArr) ? oilArr[0] : oilArr;
  return {
    id: row.id,
    position: row.position,
    matched: !!ing,
    ing: {
      inci_name: ing?.inci_name || row.raw_inci_name || "",
      ru_name: ing?.ru_name || null,
      description: ing?.description || null,
      is_eu_allergen: !!ing?.is_eu_allergen,
      group: primary.group || null,
      subgroup: primary.subgroup || null,
      subgroup2: primary.subgroup2 || null,
      oil: oilRaw ? { comedogenicity: oilRaw.comedogenicity, penetration: oilRaw.penetration, fatty_acids: oilRaw.fatty_acids } : null,
    },
  };
}
// продукт + вычисляемые поля price_tier / is_face (в БД их нет)
function adaptProduct(p, rows) {
  return {
    ...p,
    price_tier: priceTierOf(p.price_rub),
    is_face: isFaceType(p.product_type),
    ingredients: rows ? rows.map(adaptRow) : [],
  };
}

const COMPO_SELECT =
  "*,ingredients(id,inci_name,ru_name,description,is_eu_allergen," +
  "ingredient_groups(group,subgroup,subgroup2,is_primary)," +
  "oils_meta(penetration,fatty_acids,comedogenicity))";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  // флоу до входа: лендинг → вход / регистрация; покупка — модалкой поверх
  const [authScreen, setAuthScreen] = useState("landing"); // landing | login | register
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchaseToast, setPurchaseToast] = useState(false);
  const purchaseDone = () => {
    setShowPurchase(false); setPurchaseToast(true);
    setTimeout(() => setPurchaseToast(false), 3000);
  };
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);       // адаптированные (без составов)
  const [ingredients, setIngredients] = useState([]); // справочник (form v6)
  const [subgroupDesc, setSubgroupDesc] = useState({});// карта описаний групп
  const [compoCache, setCompoCache] = useState({});    // { productId: [adaptRow,...] }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);      // выбранный продукт (с составом)
  const [detail, setDetail] = useState(null);          // карточка ингредиента/группы
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  // type — человекочитаемый лейбл выбора; typeSel — { label, sheet, types[] } или null
  const [filters, setFilters] = useState({ type: "", typeSel: null, fn: "", scalp: "", wash: "", price: "", flags: {} });
  const [prodSort, setProdSort] = useState("recommend");   // recommend | date | price | name | type | brand
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [removeBgKey, setRemoveBgKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  // freemium: тариф, использование за неделю, экран кабинета, paywall (причина|null)
  const [profile, setProfile] = useState(null);
  const [usage, setUsage] = useState({ search: 0, analysis: 0 });
  const [showProfile, setShowProfile] = useState(false);
  const [paywall, setPaywall] = useState(null);
  // локальный инкремент + лог; gate: бесплатнику сверх лимита — false и paywall
  const bumpUsage = (kind) => { logUsage(kind); setUsage(u => ({ ...u, [kind]: (u[kind] || 0) + 1 })); };
  const overLimit = (kind) => !isPro() && (usage[kind] || 0) >= FREE_LIMITS[kind];
  // Роли: «Редактор» (правка данных) и «Пользователь» (только просмотр).
  // По умолчанию — просмотр. Переключатель в шапке включает режим редактора.
  const [editorMode, setEditorMode] = useState(false);
  // корзина сравнения: до 2 (free) / 5 (pro), лимит из compareLimit(). Храним продукты целиком.
  const [compareItems, setCompareItems] = useState([]);
  const [compareMsg, setCompareMsg] = useState("");
  const addProductToCompare = (product) => {
    setCompareItems(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      const lim = compareLimit();
      if (prev.length >= lim) {
        // бесплатно сравнение до 2 — дальше paywall; pro до 5
        if (!isPro()) setPaywall("compare");
        else setCompareMsg("Добавлено максимальное количество средств для сравнения");
        return prev;
      }
      setCompareMsg("");
      loadCompositionOnly && loadCompositionOnly(product).catch(() => {});
      return [...prev, product];
    });
  };
  const removeFromCompare = (id) => setCompareItems(prev => prev.filter(p => p.id !== id));
  const clearCompare = () => { setCompareItems([]); setCompareMsg(""); };
  const goCompare = () => { setDetail(null); setSelected(null); setTab("compare"); };

  useEffect(() => { restoreSession().then(ok => { setAuthed(ok); setAuthChecked(true); }); }, []);
  // после входа: cookie-согласие в профиль, тариф и счётчики использования
  useEffect(() => {
    if (!authed) return;
    syncCookieConsent();
    loadProfile().then(p => setProfile(p));
    loadUsage().then(setUsage);
  }, [authed]);

  // Учёт поиска: одна «единица» за устоявшийся уникальный запрос (с дебаунсом),
  // не за каждый символ. Бесплатнику сверх недельного лимита — paywall.
  const lastSearchRef = useRef("");
  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!authed || q.length < 2 || q === lastSearchRef.current) return;
    const t = setTimeout(() => {
      if (overLimit("search")) { setPaywall("search"); setSearch(""); return; }
      lastSearchRef.current = q;
      bumpUsage("search");
    }, 700);
    return () => clearTimeout(t);
  }, [search, authed]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = useCallback(async () => {
    setLoading(true); setError("");
    const PAGE = 200;
    const path = "/products?select=*,notes&order=name.asc";
    try {
      // 1) первая страница — показываем сразу
      const { rows, total } = await sbFetchFirstPage(path, PAGE);
      setProducts(rows.map(p => adaptProduct(p, null)));
      setLoading(false);
      // 2) остальное — фоном, дополняем список
      if (total > rows.length) {
        sbFetchFrom(path, rows.length).then(rest => {
          if (rest.length) setProducts(prev => [...prev, ...rest.map(p => adaptProduct(p, null))]);
        }).catch(() => {});
      }
    } catch (e) { setError("Ошибка загрузки средств: " + e.message); setLoading(false); }
  }, []);

  const adaptIngredient = (i) => {
    const gs = i.ingredient_groups || [];
    const primary = gs.find(g => g.is_primary) || gs[0] || null;
    return {
      id: i.id, inci_name: i.inci_name, ru_name: i.ru_name, aliases: i.aliases,
      description: i.description, is_eu_allergen: !!i.is_eu_allergen,
      group: primary?.group || null, subgroup: primary?.subgroup || null,
      subgroup2: primary?.subgroup2 || null, allGroups: gs,
    };
  };

  const loadIngredients = useCallback(async () => {
    setLoading(true); setError("");
    const PAGE = 300;
    const path = "/ingredients?select=id,inci_name,ru_name,aliases,description,is_eu_allergen," +
      "ingredient_groups(group,subgroup,subgroup2,is_primary)&order=inci_name.asc";
    try {
      const { rows, total } = await sbFetchFirstPage(path, PAGE);
      setIngredients(rows.map(adaptIngredient));
      setLoading(false);
      if (total > rows.length) {
        sbFetchFrom(path, rows.length).then(rest => {
          if (rest.length) setIngredients(prev => [...prev, ...rest.map(adaptIngredient)]);
        }).catch(() => {});
      }
    } catch (e) { setError("Ошибка загрузки ингредиентов: " + e.message); setLoading(false); }
  }, []);

  // сохранение правок ингредиента (режим редактора): пишем в БД и обновляем список
  const saveIngredientField = useCallback(async (id, patch) => {
    await sbFetch(`/ingredients?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(patch) });
    setIngredients(list => list.map(i => i.id === id ? { ...i, ...patch } : i));
  }, []);

  // описания групп — один раз
  const loadSubgroups = useCallback(async () => {
    try {
      const data = await sbFetch("/subgroups?select=group,subgroup,subgroup2,description");
      const map = {};
      for (const s of data) {
        if (s.group && s.subgroup && s.subgroup2) map[`${s.group}::${s.subgroup}::${s.subgroup2}`] = s.description;
        if (s.group && s.subgroup) map[`${s.group}::${s.subgroup}`] = s.description;
        if (s.group && !s.subgroup) map[s.group] = s.description;
      }
      setSubgroupDesc(map);
    } catch { /* описания необязательны */ }
  }, []);

  useEffect(() => {
    if (!authed) return;
    if (tab === "products") loadProducts();
    // справочник нужен не только вкладке «Ингредиенты»: INCI-матчер при
    // добавлении продукта работает с любой вкладки — без него состав
    // сохранится непривязанным (ingredient_id = null)
    if (tab === "ingredients" || ingredients.length === 0) loadIngredients();
    if (Object.keys(subgroupDesc).length === 0) loadSubgroups();
  }, [tab, authed]);

  const compoAllLoaded = useRef(false);


  // открыть средство → догрузить состав (с кэшем)
  // ВАЖНО: в compoCache лежат УЖЕ адаптированные строки (adaptRow).
  // Поэтому при попадании в кэш повторно adaptRow вызывать нельзя — иначе состав «обнуляется».
  const openProduct = async (product) => {
    if (compoCache[product.id]) {
      setSelected({
        ...product,
        price_tier: priceTierOf(product.price_rub),
        is_face: isFaceType(product.product_type),
        ingredients: compoCache[product.id],
      });
      return;
    }
    try {
      const rows = await sbFetch(
        `/product_ingredients?product_id=eq.${product.id}&select=${encodeURIComponent(COMPO_SELECT)}&order=position.asc`
      );
      const adapted = rows.map(adaptRow);
      setCompoCache(c => ({ ...c, [product.id]: adapted }));
      setSelected({ ...product, price_tier: priceTierOf(product.price_rub), is_face: isFaceType(product.product_type), ingredients: adapted });
    } catch { setSelected({ ...product, ingredients: [] }); }
  };

  // Догрузить состав одного средства В КЭШ, не открывая карточку.
  // Используется на вкладке «Сравнение»: выбор из базы не должен принудительно
  // открывать полноэкранную карточку (её открывает только клик по средству).
  const loadCompositionOnly = useCallback(async (product) => {
    if (!product || compoCache[product.id]) return;
    try {
      const rows = await sbFetch(
        `/product_ingredients?product_id=eq.${product.id}&select=${encodeURIComponent(COMPO_SELECT)}&order=position.asc`
      );
      setCompoCache(c => ({ ...c, [product.id]: rows.map(adaptRow) }));
    } catch { /* состав необязателен */ }
  }, [compoCache]);

  // загрузить составы всех (для поиска аналогов) — батчами, с кэшем
  const loadAllCompositions = useCallback(async (onProgress) => {
    const ids = products.map(p => p.id);
    const missing = ids.filter(id => !compoCache[id]);
    const CHUNK = 40;
    const acc = {};
    for (let k = 0; k < missing.length; k += CHUNK) {
      const part = missing.slice(k, k + CHUNK);
      const rows = await sbFetch(
        `/product_ingredients?product_id=in.(${part.join(",")})&select=product_id,${encodeURIComponent(COMPO_SELECT)}&order=position.asc`
      );
      for (const r of rows) (acc[r.product_id] = acc[r.product_id] || []).push(adaptRow(r));
      onProgress && onProgress(Math.min(k + CHUNK, missing.length), missing.length);
    }
    setCompoCache(c => ({ ...c, ...acc }));
    // вернуть полный набор продуктов с составами.
    // В кэше и в acc лежат УЖЕ адаптированные строки — повторно adaptRow не вызываем.
    return products.map(p => ({
      ...p,
      price_tier: priceTierOf(p.price_rub),
      is_face: isFaceType(p.product_type),
      ingredients: compoCache[p.id] || acc[p.id] || [],
    }));
  }, [products, compoCache]);

  // Один раз после загрузки средств тянем составы всех средств в фоне.
  // Без этого «Похожие по составу» видели бы только средства, открытые в текущей
  // сессии, а фильтры по составу (например «Без аллергенов») работали бы по
  // неполному набору. Грузим целиком, чтобы фильтры выбирали из всей базы.
  useEffect(() => {
    if (!authed || compoAllLoaded.current) return;
    if (!products.length) return;
    compoAllLoaded.current = true;
    loadAllCompositions().catch(() => { compoAllLoaded.current = false; });
  }, [authed, products, loadAllCompositions]);

  // ── Фильтры витрины (как в V6, на боевых данных) ──────────────────────────
  // нормализация типа кожи головы из skin_type БД → простые категории
  const scalpKind = (p) => {
    const s = (p.skin_type || "").toLowerCase();
    const out = [];
    if (s.includes("жирн")) out.push("жирный");
    if (s.includes("норм")) out.push("нормальный");
    if (s.includes("сух")) out.push("сухой");
    return out;
  };
  const SCALP_INFO = { "жирный": "жирнится за 1–2 дня", "нормальный": "жирнится за 2–4 дня", "сухой": "жирнится за 5–7 дней" };
  const FN_KEYS = { moisture: "Увлажнение", nutrition: "Питание", repair: "Восстановление", protection: "Защита" };

  // флаги-метки: live работают на данных; soon — задел, не отсеивают
  const FLAGS = [
    { id: "noAllergen", label: "Без аллергенов", status: "live", test: (p) => compoCache[p.id] ? !compoCache[p.id].some(r => r.ing.is_eu_allergen) : true },
    { id: "curls",      label: "Подходит кудряшкам", status: "live", test: (p) => p.attr_curls === true },
    { id: "sensitive",  label: "Чувствительная кожа", status: "live", test: (p) => p.attr_sensitive === true || (p.skin_type || "").toLowerCase().includes("чувств") },
    { id: "dandruff",   label: "Против перхоти", status: "soon", test: () => true },
    { id: "blonde",     label: "Для блонда", status: "soon", test: () => true },
    { id: "hairloss",   label: "При выпадении", status: "soon", test: () => true },
  ];

  const opt = useMemo(() => {
    const types = [...new Set(products.map(p => p.product_type).filter(Boolean))].sort();
    const washes = [...new Set(products.filter(p => (p.product_type || "").toLowerCase().includes("шампунь")).map(p => p.analytical_type).filter(Boolean))].sort();
    const prices = ["бюджетно", "средняя", "высокая"].filter(t => products.some(p => p.price_tier === t));
    return { types, washes, prices };
  }, [products]);

  const typeL = (filters.type || "").toLowerCase();
  const isShampooCtx = typeL.includes("шампунь");
  const isMaskCtx = !!typeL.match(/маск|кондиционер/);
  // Доп. фильтры показываем ТОЛЬКО если выбран соответствующий тип
  const showFnFilter = isMaskCtx;                  // функции — только маска/кондиционер
  const showScalp = isShampooCtx;                   // тип кожи головы — только шампунь
  const showWash = isShampooCtx;                    // промывающая способность — только шампунь
  const visibleFlags = FLAGS.filter(f => {
    if (f.id === "curls") return isMaskCtx || isShampooCtx;
    return true; // базовые флаги (без аллергенов, чувств. кожа) — всегда
  });

  const filteredProducts = (() => {
    const q = search.toLowerCase().trim();
    const passesFilters = (p) => {
      if (filters.typeSel) {
        const { sheet, types } = filters.typeSel;
        if (sheet && p.source_sheet !== sheet) return false;
        if (!types.includes(p.product_type)) return false;
      }
      if (filters.price && p.price_tier !== filters.price) return false;
      if (filters.wash && p.analytical_type !== filters.wash) return false;
      if (filters.scalp && !scalpKind(p).includes(filters.scalp)) return false;
      if (filters.fn) { const v = p["attr_" + filters.fn]; if (v !== "full" && v !== "some" && v !== true) return false; }
      for (const f of FLAGS) { if (filters.flags[f.id] && f.status === "live" && !f.test(p)) return false; }
      return true;
    };
    let list = products.filter(p =>
      (!q || p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q)) && passesFilters(p));
    // точных совпадений нет — ищем ближайшие (опечатки в запросе)
    if (!list.length && q.length >= 4)
      list = products.filter(p => (fuzzyIncludes(p.name, q) || fuzzyIncludes(p.brand, q)) && passesFilters(p));
    const byName = (a, b) => (a.name || "").localeCompare(b.name || "", "ru");
    const isRecommended = (p) => {
      const n = (p.notes || "").toLowerCase();
      return n.includes("рекомендов") || n.includes("супер состав");
    };
    const isSafe = (p) => {
      const cached = compoCache[p.id];
      if (!cached) return false;
      return !cached.some(r => r.ing.is_eu_allergen || r.ing.is_avoid);
    };
    const sorted = [...list];
    if (prodSort === "recommend") {
      sorted.sort((a, b) => {
        const ra = isRecommended(a) ? 0 : isSafe(a) ? 1 : 2;
        const rb = isRecommended(b) ? 0 : isSafe(b) ? 1 : 2;
        if (ra !== rb) return ra - rb;
        return byName(a, b);
      });
    } else if (prodSort === "price") sorted.sort((a, b) => (a.price_rub ?? Infinity) - (b.price_rub ?? Infinity) || byName(a, b));
    else if (prodSort === "name") sorted.sort(byName);
    else if (prodSort === "type") sorted.sort((a, b) => (a.product_type || "я").localeCompare(b.product_type || "я", "ru") || byName(a, b));
    else if (prodSort === "brand") sorted.sort((a, b) => (a.brand || "я").localeCompare(b.brand || "я", "ru") || byName(a, b));
    else sorted.sort((a, b) => { // date: новые сверху
      const da = a.created_at ? Date.parse(a.created_at) : 0;
      const db = b.created_at ? Date.parse(b.created_at) : 0;
      return db - da || b.id - a.id;
    });
    return sorted;
  })();

  const activeCount = [filters.type, filters.fn, filters.price, filters.scalp, filters.wash].filter(Boolean).length
    + Object.values(filters.flags).filter(Boolean).length;
  const resetFilters = () => setFilters({ type: "", typeSel: null, fn: "", scalp: "", wash: "", price: "", flags: {} });
  const toggleFlag = (id) => setFilters(f => ({ ...f, flags: { ...f.flags, [id]: !f.flags[id] } }));
  // sel: null/"" — сброс; { label, sheet, types } — один тип или целая подгруппа
  const setType = (sel) => setFilters(f => {
    const next = sel && sel.types?.length ? sel : null;
    const l = (next?.label || "").toLowerCase();
    const sh = l.includes("шампунь"), mk = !!l.match(/маск|кондиционер/);
    return {
      ...f, type: next?.label || "", typeSel: next,
      fn: (!next || mk) ? f.fn : "", scalp: (!next || sh) ? f.scalp : "", wash: (!next || sh) ? f.wash : ""
    };
  });

  const productTypes = opt.types;

  // Контролы фильтров (кроме вида средства) — общие для мобильной панели и десктопного сайдбара
  const filterControls = (
    <>
      {showFnFilter && (
        <div className="filter-field">
          <label>Функция</label>
          <select value={filters.fn} onChange={e => setFilters(f => ({ ...f, fn: e.target.value }))}>
            <option value="">Любая</option>
            {Object.entries(FN_KEYS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </div>
      )}
      {showScalp && (
        <div className="filter-field">
          <label>Тип кожи головы</label>
          <select value={filters.scalp} onChange={e => setFilters(f => ({ ...f, scalp: e.target.value }))}>
            <option value="">Любой</option>
            {Object.entries(SCALP_INFO).map(([k, info]) => (
              <option key={k} value={k} style={{ textTransform: "capitalize" }}>{k} · {info}</option>
            ))}
          </select>
        </div>
      )}
      {showWash && opt.washes.length > 0 && (
        <div className="filter-field">
          <label>Промывающая способность <span className="field-hint">для продвинутых</span></label>
          <select value={filters.wash} onChange={e => setFilters(f => ({ ...f, wash: e.target.value }))}>
            <option value="">Любая</option>
            {opt.washes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
      <div className="filter-field">
        <label>Ценовая категория</label>
        <select value={filters.price} onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}>
          <option value="">Любая</option>
          <option value="бюджетно">Бюджетно</option>
          <option value="средняя">Средняя</option>
          <option value="высокая">Высокая</option>
        </select>
      </div>
      <div className="filter-checks">
        {visibleFlags.map(f => (
          <label key={f.id} className={`filter-check ${f.status === "soon" ? "soon" : ""}`} title={f.status === "soon" ? "В плане реализации" : ""}>
            <input type="checkbox" checked={!!filters.flags[f.id]} onChange={() => toggleFlag(f.id)} />
            <span>{f.label}{f.status === "soon" && <em className="soon-tag">скоро</em>}</span>
          </label>
        ))}
      </div>
    </>
  );

  if (!authChecked) return (<><style>{styles}</style><div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(168deg,#eef5f3,#e0eeea)" }}><div className="loading-dots"><span /><span /><span /></div></div></>);
  if (!authed) return (
    <>
      <style>{styles}</style>
      {/* вход и регистрация — оверлеями поверх заблюренного лендинга: лендинг
          остаётся в дереве, и после закрытия пользователь возвращается к тому
          же месту страницы, где остановился */}
      <Landing
        onLogin={() => setAuthScreen("login")}
        onRegister={() => setAuthScreen("register")}
        onPurchase={() => setShowPurchase(true)}
      />
      {authScreen === "login" && (
        <div className="reg-overlay" onClick={e => { if (e.target === e.currentTarget) setAuthScreen("landing"); }}>
          <LoginScreen onSuccess={() => setAuthed(true)}
            onShowRegister={() => setAuthScreen("register")}
            onBack={() => setAuthScreen("landing")} />
        </div>
      )}
      {authScreen === "register" && (
        <div className="reg-overlay" onClick={e => { if (e.target === e.currentTarget) setAuthScreen("landing"); }}>
          <RegisterScreen onSuccess={() => setAuthed(true)}
            onShowLogin={() => setAuthScreen("login")}
            onBack={() => setAuthScreen("landing")}
            onPurchase={() => { setAuthed(true); setShowPurchase(true); }} />
        </div>
      )}
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} onSuccess={purchaseDone} />}
      {purchaseToast && <div className="purchase-toast">Подписка оформлена</div>}
      <CookieConsent />
    </>
  );

  return (
    <>
      <style>{styles}</style>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} onSuccess={purchaseDone} />}
      {purchaseToast && <div className="purchase-toast">Подписка оформлена</div>}
      {showProfile && (
        <ProfileScreen profile={profile} usage={usage} pro={isPro()}
          onClose={() => setShowProfile(false)}
          onSubscribe={() => { setShowProfile(false); setShowPurchase(true); }}
          onLogout={() => { signOut(); setAuthed(false); setShowProfile(false); setAuthScreen("landing"); setShowPurchase(false); }} />
      )}
      {paywall && (
        <Paywall reason={paywall}
          onClose={() => setPaywall(null)}
          onSubscribe={() => { setPaywall(null); setShowPurchase(true); }} />
      )}
      <CookieConsent />
      <div className="app">
        <PetalsBackground />
        <div className="topbar">
          <div className="topbar-aurora" aria-hidden="true" />
          <div className="topbar-veil" aria-hidden="true" />
          <div className="brand">
            <div className="brand-mark">
              <svg width="40" height="44" viewBox="0 0 40 44" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="flask-glass" x1="0" y1="0" x2="1" y2="0.3">
                    <stop offset="0" stopColor="#1d8f66" />
                    <stop offset="0.35" stopColor="#0f6b4d" />
                    <stop offset="0.65" stopColor="#0a5a40" />
                    <stop offset="1" stopColor="#063a2a" />
                  </linearGradient>
                  <radialGradient id="flask-sheen" cx="0.32" cy="0.28" r="0.8">
                    <stop offset="0" stopColor="#7fe3bb" stopOpacity="0.9" />
                    <stop offset="0.4" stopColor="#2ea579" stopOpacity="0.15" />
                    <stop offset="1" stopColor="#063a2a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="flask-liquid" x1="0" y1="0" x2="0.2" y2="1">
                    <stop offset="0" stopColor="#74e0b4" />
                    <stop offset="1" stopColor="#1d9e72" />
                  </linearGradient>
                  <clipPath id="flask-clip">
                    <path d="M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z" />
                  </clipPath>
                </defs>
                <g className="flask-drop"><rect x="18.2" y="0" width="3.6" height="3.6" rx="1" fill="#f0a98f" /></g>
                <g className="flask-drop d2"><circle cx="20" cy="0" r="2" fill="#b98fd6" /></g>
                <g className="flask-drop d3"><rect x="18.5" y="0" width="3" height="3" rx="1.5" fill="#6fa8d8" /></g>
                <g className="flask-body">
                  <path d="M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z"
                        fill="url(#flask-glass)" stroke="#052e20" strokeWidth="1" strokeLinejoin="round" />
                  <g clipPath="url(#flask-clip)">
                    {/* жидкость по форме нижней части колбы */}
                    <path d="M7 33 Q5 37 4 40 a7 7 0 0 0 6 7 h20 a7 7 0 0 0 6 -7 Q35 37 33 33 Z"
                          fill="url(#flask-liquid)" opacity="0.95" />
                    {/* поверхность жидкости — слегка волнистая */}
                    <path d="M7 33 Q13 30 20 33 Q27 36 33 33" stroke="#8fe9c4" strokeWidth="1.5" fill="none" opacity="0.8" />
                    {/* пузырьки — больше и оживлённее */}
                    <circle className="flask-bub"    cx="13" cy="41" r="1.6" fill="rgba(255,255,255,0.88)" />
                    <circle className="flask-bub b2" cx="21" cy="43" r="1.1" fill="rgba(255,255,255,0.78)" />
                    <circle className="flask-bub b3" cx="17" cy="42" r="1.4" fill="rgba(255,255,255,0.82)" />
                    <circle className="flask-bub b4" cx="26" cy="44" r="0.9" fill="rgba(255,255,255,0.72)" />
                    <circle className="flask-bub"    cx="19" cy="45" r="1.2" fill="rgba(255,255,255,0.75)" style={{ animationDelay: "0.9s" }} />
                    <circle className="flask-bub b2" cx="24" cy="40" r="0.8" fill="rgba(255,255,255,0.65)" style={{ animationDelay: "1.4s" }} />
                  </g>
                  <path d="M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z" fill="url(#flask-sheen)" />
                  <g clipPath="url(#flask-clip)">
                    <rect className="flask-shade" x="26" y="2" width="14" height="48" fill="#042319" />
                  </g>
                  <path d="M17.5 8 v8 l-4.5 8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                  <line x1="12.5" y1="5" x2="27.5" y2="5" stroke="#052e20" strokeWidth="2.6" strokeLinecap="round" />
                  <line x1="13" y1="4.3" x2="27" y2="4.3" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <div className="brand-text"><strong>beauty helper</strong><span>косметическая база · анализ составов</span></div>
          </div>
          <div className="topbar-actions">
            {userName() && <span className="topbar-user">Привет, {userName()}</span>}
            {isAdmin() && (
              <button className={`btn btn-sm ${editorMode ? "btn-primary" : "btn-glass"}`} onClick={() => setEditorMode(m => !m)}>
                {editorMode ? "✓ Режим редактора" : "Режим редактора"}
              </button>
            )}
            {isAdmin() && editorMode && tab === "products" && <button className="btn btn-primary btn-sm" onClick={() => setShowAddProduct(true)}>+ Средство</button>}
            {isAdmin() && editorMode && tab === "ingredients" && <button className="btn btn-primary btn-sm" onClick={() => setShowAddIngredient(true)}>+ Ингредиент</button>}
            {isAdmin() && <button className="btn btn-glass btn-sm" onClick={() => setShowSettings(s => !s)} title="Настройки">⚙</button>}
            <button className="btn btn-glass btn-sm profile-btn" onClick={() => setShowProfile(true)} title="Личный кабинет">
              <span className="profile-ava">{(userName()?.[0] || "Я").toUpperCase()}</span>
              <span className={`tariff-pill ${isPro() ? "pro" : ""}`}>{isPro() ? "PRO" : "FREE"}</span>
            </button>
            <button className="btn btn-glass btn-sm" onClick={() => { signOut(); setAuthed(false); setAuthScreen("landing"); setShowPurchase(false); }}>Выйти</button>
          </div>
        </div>

        {showSettings && (
          <div style={{ background: "rgba(20,40,32,0.9)", padding: "12px 2rem", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#cbd8cf", flexShrink: 0 }}>API-ключ remove.bg:</span>
            <input type="password" value={removeBgKey} onChange={e => setRemoveBgKey(e.target.value)}
              placeholder="Вставьте ключ — он нигде не сохраняется"
              style={{ flex: 1, minWidth: 260, padding: "7px 12px", borderRadius: 8, border: "1px solid #3a5a4a", background: "#0f231a", color: "#eef2ef", fontSize: 13, fontFamily: "monospace", outline: "none" }} />
            {removeBgKey && <span style={{ fontSize: 12, color: "#7fcaa0" }}>✓ Ключ введён</span>}
          </div>
        )}

        <div className="tabs-bar">
          <div className="tabs">
            <button className={`tab ${tab === "products" ? "active" : ""}`} onClick={() => { setTab("products"); setSearch(""); }}>Средства</button>
            <button className={`tab ${tab === "ingredients" ? "active" : ""}`} onClick={() => { setTab("ingredients"); setSearch(""); }}>Ингредиенты</button>
            <button className={`tab ${tab === "similar" ? "active" : ""}`} onClick={() => { setTab("similar"); setSearch(""); }}>Аналоги</button>
            <button className={`tab ${tab === "compare" ? "active" : ""}`} onClick={() => { setTab("compare"); setSearch(""); }}>Сравнение</button>
          </div>
        </div>

        <div className="main">
          {error && <div className="error-msg">{error}</div>}

          {tab === "products" && (
            <div className="products-layout">
              {/* Десктоп: фильтры слева развёрнутым списком (как в каталогах) */}
              <aside className="filter-sidebar">
                <div className="filter-sidebar-head">
                  <span>Фильтры{activeCount ? ` · ${activeCount}` : ""}</span>
                  {activeCount > 0 && <button className="filter-reset" onClick={resetFilters}>Сбросить</button>}
                </div>
                <div className="filter-sidebar-body">
                  <div className="filter-field">
                    <label>Вид средства</label>
                    <HierTypeExpanded sel={filters.typeSel} onChange={setType} types={opt.types} />
                  </div>
                  {filterControls}
                </div>
              </aside>

              <div className="products-main">
                <div className="toolbar">
                  <input className="search" placeholder="Поиск по названию или бренду…" value={search} onChange={e => setSearch(e.target.value)} />
                  {/* Мобайл: фильтры дропдауном по кнопке (на десктопе кнопка скрыта) */}
                  <button className={`btn btn-sm ${activeCount ? "btn-primary" : "btn-glass"} filter-toggle`} onClick={() => setFiltersOpen(o => !o)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 6, verticalAlign: "-2px" }}>
                      <path d="M1 2h12M3 7h8M5 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Фильтры{activeCount ? ` · ${activeCount}` : ""}
                  </button>
                </div>

                {filtersOpen && (
                  <div className="filter-panel">
                    <div className="filter-field">
                      <label>Вид средства</label>
                      <HierType value={filters.type} sel={filters.typeSel} onChange={setType} types={opt.types} />
                    </div>
                    {filterControls}
                    {activeCount > 0 && <button className="filter-reset" onClick={resetFilters}>Сбросить</button>}
                  </div>
                )}

                {activeCount > 0 && (
                  <div className="filter-chips">
                    {filters.type && <span className="chip" onClick={() => setType(null)}>{filters.type} ✕</span>}
                    {filters.fn && <span className="chip" onClick={() => setFilters(f => ({ ...f, fn: "" }))}>{FN_KEYS[filters.fn]} ✕</span>}
                    {filters.scalp && <span className="chip" onClick={() => setFilters(f => ({ ...f, scalp: "" }))} style={{ textTransform: "capitalize" }}>Кожа: {filters.scalp} ✕</span>}
                    {filters.wash && <span className="chip" onClick={() => setFilters(f => ({ ...f, wash: "" }))}>{filters.wash} ✕</span>}
                    {filters.price && <span className="chip" onClick={() => setFilters(f => ({ ...f, price: "" }))} style={{ textTransform: "capitalize" }}>{filters.price} ✕</span>}
                    {FLAGS.filter(f => filters.flags[f.id]).map(f => (
                      <span key={f.id} className="chip" onClick={() => toggleFlag(f.id)}>{f.label} ✕</span>
                    ))}
                  </div>
                )}

                <div className="section-head">
                  <div className="section-title">Косметические средства</div>
                  <div className="ing-head-right">
                    <select className="sim-select ing-sort" value={prodSort} onChange={e => setProdSort(e.target.value)}>
                      <option value="recommend">Рекомендации</option>
                      <option value="date">По дате добавления</option>
                      <option value="price">По цене</option>
                      <option value="name">По названию</option>
                      <option value="type">По группам</option>
                      <option value="brand">По бренду</option>
                    </select>
                    <div className="count">{filteredProducts.length} позиций</div>
                  </div>
                </div>
                {loading ? <LoadingMascot />
                  : filteredProducts.length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-ic">◇</span>
                      <p>{search || activeCount ? "Ничего не найдено по выбранным фильтрам" : "Средства ещё не добавлены"}</p>
                      {activeCount > 0 && <button className="btn btn-glass btn-sm" onClick={resetFilters}>Сбросить фильтры</button>}
                    </div>
                  ) : (
                    <div className="grid">
                      {filteredProducts.map(p => (
                        <div key={p.id} className="card" onClick={() => openProduct(p)}>
                          <div className="card-media">
                            {p.product_type && <span className="card-type">{p.product_type}</span>}
                            {p.image_url
                              ? <img src={p.image_url} alt={p.brand || ""} />
                              : <div className="pt-ph" style={{ width: "70%", height: "82%", "--tint": typeTint(p.product_type) }} aria-hidden="true">
                                  <svg viewBox="0 0 40 48" width="100%" height="100%">
                                    <rect x="13" y="2" width="14" height="6" rx="2" fill="var(--tint)" opacity="0.85" />
                                    <rect x="8" y="8" width="24" height="38" rx="7" fill="var(--tint)" opacity="0.16" stroke="var(--tint)" strokeOpacity="0.35" strokeWidth="1" />
                                    <text x="20" y="32" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontWeight="600" fontSize="16" fill="var(--tint)">{brandInitial(p)}</text>
                                  </svg>
                                </div>
                            }
                          </div>
                          <div className="card-body">
                            {p.name && <div className="card-name">{p.name}</div>}
                            {p.brand && <div className="card-brand">{p.brand}</div>}
                            <div className="card-fns">
                              {productAttributes(p).map((a, i) => (
                                <span key={i} className={`fn-glass ${a.strong ? "" : "soft"}`} style={{ "--fn": a.hue }}>{a.text}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}

          {tab === "ingredients" && (
            <IngredientsTab data={ingredients} loading={loading} onOpenDetail={setDetail}
              editorMode={editorMode} onSaveIngredient={saveIngredientField} />
          )}
          {tab === "similar" && (
            <AnalogTab allProducts={products} allIngredients={ingredients}
              loadAllCompositions={loadAllCompositions} onOpenProduct={openProduct} />
          )}
          {tab === "compare" && (
            <CompareTab allProducts={products} allIngredients={ingredients}
              loadComposition={loadCompositionOnly} compoCache={compoCache}
              items={compareItems} onRemove={removeFromCompare} onClear={clearCompare}
              onOpenProduct={openProduct} />
          )}
        </div>

        {selected && (
          <ProductModal product={selected} subgroupDesc={subgroupDesc}
            removeBgKey={removeBgKey} editorMode={editorMode}
            onClose={() => setSelected(null)}
            onOpenDetail={setDetail}
            onOpenProduct={openProduct}
            allProducts={products} compoCache={compoCache}
            loadAllCompositions={loadAllCompositions}
            inCompare={compareItems.some(p => p.id === selected.id)}
            compareCount={compareItems.length} compareMax={compareLimit()}
            onAddToCompare={() => addProductToCompare(selected)}
            onGoCompare={goCompare}
            onImageSaved={async (id, url) => {
              await sbFetch(`/products?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ image_url: url }) });
              setSelected(p => p ? { ...p, image_url: url } : p);
              setProducts(ps => ps.map(p => p.id === id ? { ...p, image_url: url } : p));
            }}
            onDelete={async () => {
              await sbFetch(`/products?id=eq.${selected.id}`, { method: "DELETE" });
              setSelected(null); loadProducts();
            }}
          />
        )}
        {detail && (
          <DetailModal detail={detail} subgroupDesc={subgroupDesc}
            allProducts={products} allIngredients={ingredients} compoCache={compoCache}
            onNavigate={setDetail}
            onOpenProduct={(p) => { setDetail(null); openProduct(p); }}
            onClose={() => setDetail(null)} />
        )}
        {showAddProduct && (
          <AddProductModal ingredients={ingredients} removeBgKey={removeBgKey}
            onClose={() => setShowAddProduct(false)}
            onSaved={() => { setShowAddProduct(false); loadProducts(); }} />
        )}
        {showAddIngredient && (
          <AddIngredientModal onClose={() => setShowAddIngredient(false)}
            onSaved={() => { setShowAddIngredient(false); loadIngredients(); }} />
        )}
      </div>
    </>
  );
}


// ===== Презентационные компоненты (v6) =====

const TYPE_TINT = {
  "Шампунь": "#2f8fa6", "Кондиционер": "#3f7fb0", "Маска": "#3f9a63",
  "Крем": "#c0892f", "Сыворотка": "#9a5fb0", "SPF": "#4f78c4",
  "Масло": "#b07d2e", "Спрей": "#4a8a9a", "Тонер": "#6b8f5a",
};
const typeTint = (t) => TYPE_TINT[t] || "#6b8f7e";
const brandInitial = (p) => ((p.brand || p.name || "?").trim()[0] || "?").toUpperCase();

function ProductThumb({ product, size = 56 }) {
  const tint = typeTint(product.product_type);
  if (product.image_url) {
    return <img className="pt-img" src={product.image_url} alt={product.name} style={{ width: size, height: size * 1.18 }} />;
  }
  // плейсхолдер-флакон: цвет по виду средства + инициал бренда
  return (
    <div className="pt-ph" style={{ width: size, height: size * 1.18, "--tint": tint }} aria-hidden="true">
      <svg viewBox="0 0 40 48" width="100%" height="100%">
        <rect x="13" y="2" width="14" height="6" rx="2" fill="var(--tint)" opacity="0.85" />
        <rect x="8" y="8" width="24" height="38" rx="7" fill="var(--tint)" opacity="0.16" stroke="var(--tint)" strokeOpacity="0.35" strokeWidth="1" />
        <text x="20" y="32" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontWeight="600" fontSize="16" fill="var(--tint)">{brandInitial(product)}</text>
      </svg>
    </div>
  );
}

// ─── ИЕРАРХИЧЕСКИЙ ФИЛЬТР ВИДА СРЕДСТВА (раскрытие при наведении) ─────────────
// минималистичные иконки одного стиля (line icons, 18×18, stroke currentColor)
const HIER_ICONS = {
  "Уход за волосами": <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 4c0 6 1 10 2 16M12 3c0 7 0 11-1 17M19 4c0 6-1 10-2 16" /></svg>,
  "Уход за кожей": <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" /></svg>,
  "Прочее": <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>,
};
// Иерархия «Группа → Подгруппа → Тип» (источник: product_type_tree.csv, 12.06.2026).
// Тёзки между группами («Крем», «Пилинг», «Спрей», «Лосьон», «Маска») различаются
// листом выгрузки source_sheet — он хранится у каждого продукта.
const SHEET_HAIR = "Анализ для волос", SHEET_SKIN = "Анализ косметики";
const PRODUCT_TYPE_TREE = [
  { group: "Уход за волосами", sheet: SHEET_HAIR, subs: [
    { label: "Очищение", types: ["Шампунь", "Хелатный шампунь", "Шампунь глубокой очистки"] },
    { label: "Пилинг и эксфолиация", types: ["Пилинг"] },
    { label: "Кондиционирование и маски", types: ["Маска / Кондиционер"] },
    { label: "Несмываемый уход", types: ["Спрей", "Крем", "Масло", "Лосьон"] },
    { label: "Укладка", types: ["Гель для укладки", "Пенка для укладки", "Текстурайзер"] },
  ]},
  { group: "Уход за кожей", sheet: SHEET_SKIN, subs: [
    { label: "Очищение", types: ["Пенка", "Очищающее средство", "Мицеллярная вода", "Салфетки"] },
    { label: "Тонизирование", types: ["Тонер", "Тоник", "Мист"] },
    { label: "Эксфолиация", types: ["Пудра", "Пилинг", "Скраб", "Сыворотка-пилинг"] },
    { label: "Сыворотки и концентраты", types: ["Сыворотка", "Эссенция", "Флюид", "Ампула"] },
    { label: "Увлажнение и питание", types: ["Крем", "Гель", "Бальзам", "Лосьон", "Крем-гель", "Эмульсия", "Молочко", "Спрей"] },
    { label: "Маски", types: ["Маска"] },
    { label: "Локальный уход", types: ["Стик", "Точечное средство"] },
    { label: "Солнцезащита", types: ["Солнцезащитное средство"] },
    { label: "Декоративная косметика", types: ["База под макияж", "Консилер", "Тональная основа", "Палетка теней"] },
  ]},
];
const TYPE_TREE_KNOWN = new Set(PRODUCT_TYPE_TREE.flatMap(g => g.subs.flatMap(s => s.types)));

// onChange получает null (сброс) или { label, sheet, types: [...] } —
// один тип или целую подгруппу.
function HierType({ value, sel, onChange, types = [] }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // типы из БД, которых ещё нет в дереве — показываем в «Прочее», чтобы не потерять
  const rest = types.filter(t => !TYPE_TREE_KNOWN.has(t));

  const pick = (v) => { onChange(v); setOpen(false); setHovered(null); };
  const isActive = (label, sheet) => !!sel && sel.label === label && (sel.sheet || null) === (sheet || null);

  return (
    <div className="hier-type" ref={wrapRef}>
      <button type="button" className="hier-trigger" onClick={() => setOpen(o => !o)}>
        <span>{value || "Все виды"}</span>
        <span className="hier-caret">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="hier-menu">
          <div className={`hier-root ${!value ? "active" : ""}`} onClick={() => pick(null)}>Все виды</div>
          {PRODUCT_TYPE_TREE.map(g => {
            // показываем только то, что реально есть в данных
            const subs = g.subs
              .map(s => ({ ...s, types: s.types.filter(t => types.includes(t)) }))
              .filter(s => s.types.length);
            if (!subs.length) return null;
            return (
              <div key={g.group} className="hier-group"
                onMouseEnter={() => setHovered(g.group)} onMouseLeave={() => setHovered(null)}>
                <div className="hier-group-head">
                  <span className="hier-group-name">
                    <span className="hier-ic">{HIER_ICONS[g.group]}</span>
                    {g.group}
                  </span>
                  <span className="hier-arrow">›</span>
                </div>
                {hovered === g.group && (
                  <div className="hier-sub">
                    {subs.map(s => (
                      <div key={s.label}>
                        <div className={`hier-sub-head ${isActive(s.label, g.sheet) ? "active" : ""}`}
                          title="Выбрать всю подгруппу"
                          onClick={() => pick({ label: s.label, sheet: g.sheet, types: s.types })}>
                          {s.label}
                        </div>
                        {s.types.map(t => (
                          <div key={t} className={`hier-item ${isActive(t, g.sheet) ? "active" : ""}`}
                            onClick={() => pick({ label: t, sheet: g.sheet, types: [t] })}>{t}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {rest.length > 0 && (
            <div className="hier-group"
              onMouseEnter={() => setHovered("Прочее")} onMouseLeave={() => setHovered(null)}>
              <div className="hier-group-head">
                <span className="hier-group-name">
                  <span className="hier-ic">{HIER_ICONS["Прочее"]}</span>
                  Прочее
                </span>
                <span className="hier-arrow">›</span>
              </div>
              {hovered === "Прочее" && (
                <div className="hier-sub">
                  {rest.map(t => (
                    <div key={t} className={`hier-item ${isActive(t, null) ? "active" : ""}`}
                      onClick={() => pick({ label: t, sheet: null, types: [t] })}>{t}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Развёрнутый список фильтра по виду средства — для десктопного сайдбара.
// Вся иерархия раскрыта сразу, применение по клику без кнопки «Применить».
function HierTypeExpanded({ sel, onChange, types = [] }) {
  const rest = types.filter(t => !TYPE_TREE_KNOWN.has(t));
  const isActive = (label, sheet) => !!sel && sel.label === label && (sel.sheet || null) === (sheet || null);
  const groups = PRODUCT_TYPE_TREE
    .map(g => ({ ...g, subs: g.subs.map(s => ({ ...s, types: s.types.filter(t => types.includes(t)) })).filter(s => s.types.length) }))
    .filter(g => g.subs.length);
  return (
    <nav className="hier-tree">
      <div className={`hier-tree-root ${!sel ? "active" : ""}`} onClick={() => onChange(null)}>Все виды</div>
      {groups.map(g => (
        <div key={g.group} className="hier-tree-group">
          <div className="hier-tree-group-head">
            <span className="hier-ic">{HIER_ICONS[g.group]}</span>{g.group}
          </div>
          {g.subs.map(s => (
            <div key={s.label} className="hier-tree-sub">
              <div className={`hier-tree-sub-head ${isActive(s.label, g.sheet) ? "active" : ""}`}
                title="Выбрать всю подгруппу"
                onClick={() => onChange({ label: s.label, sheet: g.sheet, types: s.types })}>{s.label}</div>
              {s.types.map(t => (
                <div key={t} className={`hier-tree-item ${isActive(t, g.sheet) ? "active" : ""}`}
                  onClick={() => onChange({ label: t, sheet: g.sheet, types: [t] })}>{t}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
      {rest.length > 0 && (
        <div className="hier-tree-group">
          <div className="hier-tree-group-head"><span className="hier-ic">{HIER_ICONS["Прочее"]}</span>Прочее</div>
          {rest.map(t => (
            <div key={t} className={`hier-tree-item ${isActive(t, null) ? "active" : ""}`}
              onClick={() => onChange({ label: t, sheet: null, types: [t] })}>{t}</div>
          ))}
        </div>
      )}
    </nav>
  );
}

// плиточная мини-карточка средства: вертикальное превью + название (как на витрине, но компактнее)
function ProductMiniCard({ product, score, onClick }) {
  const matchColor = score >= 70 ? "#1f7a5c" : score >= 45 ? "#c98a3a" : "#8b8f86";
  return (
    <button className="pcard" onClick={onClick}>
      <div className="pcard-media">
        {product.product_type && <span className="pcard-type">{product.product_type}</span>}
        {typeof score === "number" && <span className="pcard-match" style={{ "--m": matchColor }}>{score}%</span>}
        {product.image_url ? <img src={product.image_url} alt={product.name} /> : (
          <div className="pt-ph" style={{ width: "70%", height: "82%", "--tint": typeTint(product.product_type) }} aria-hidden="true">
            <svg viewBox="0 0 40 48" width="100%" height="100%">
              <rect x="13" y="2" width="14" height="6" rx="2" fill="var(--tint)" opacity="0.85" />
              <rect x="8" y="8" width="24" height="38" rx="7" fill="var(--tint)" opacity="0.16" stroke="var(--tint)" strokeOpacity="0.35" strokeWidth="1" />
              <text x="20" y="32" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontWeight="600" fontSize="16" fill="var(--tint)">{brandInitial(product)}</text>
            </svg>
          </div>
        )}
      </div>
      <div className="pcard-body">
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-brand">{product.brand}</div>
      </div>
    </button>
  );
}

// ─── КАРТОЧКА ИНГРЕДИЕНТА / ГРУППЫ / ПОДГРУППЫ ───────────────────────────────
// detail формы:
//   { kind:'ingredient', inci, ru, description, is_eu_allergen, groups:[{group,subgroup,subgroup2}] }
//   { kind:'group', group, subgroup?, subgroup2? }
function DetailModal({ detail, onNavigate, onOpenProduct, onClose, onAddToCompare, onGoCompare, subgroupDesc, allProducts = [], allIngredients = [], compoCache = {} }) {
  const [addedToCompare, setAddedToCompare] = useState(false);
  useEffect(() => { setAddedToCompare(false); }, [detail.kind, detail.inci, detail.group, detail.subgroup]);

  // продукты с загруженным составом (только по ним можно искать вхождение ингредиента/группы)
  const loadedProducts = allProducts
    .filter(p => compoCache[p.id])
    .map(p => ({ ...p, ingredients: compoCache[p.id] }));
  const compoKnown = loadedProducts.length;

  const productsWithIngredient = (inci) =>
    loadedProducts.filter(p => p.ingredients.some(r => normInci(r.ing.inci_name) === normInci(inci)));
  const productsWithGroup = (group, subgroup) =>
    loadedProducts.filter(p => p.ingredients.some(r => r.ing.group === group && (!subgroup || r.ing.subgroup === subgroup)));
  const ingredientsInGroup = (group, subgroup) =>
    allIngredients.filter(i => i.group === group && (!subgroup || i.subgroup === subgroup));

  const openIngredient = (inci) => {
    const found = allIngredients.find(i => normInci(i.inci_name) === normInci(inci))
      || loadedProducts.flatMap(p => p.ingredients).map(r => r.ing).find(g => normInci(g.inci_name) === normInci(inci));
    if (!found) return;
    onNavigate({
      kind: "ingredient", inci: found.inci_name, ru: found.ru_name,
      description: found.description, is_eu_allergen: found.is_eu_allergen,
      groups: found.allGroups && found.allGroups.length
        ? found.allGroups.map(g => ({ group: g.group, subgroup: g.subgroup, subgroup2: g.subgroup2 }))
        : [{ group: found.group, subgroup: found.subgroup, subgroup2: found.subgroup2 }],
    });
  };
  const openGroup = (group, subgroup) => onNavigate({ kind: "group", group, subgroup });

  let body;
  if (detail.kind === "ingredient") {
    const prods = productsWithIngredient(detail.inci);
    body = (
      <>
        <div className="dm-head">
          <span className="dm-kind">Ингредиент</span>
          <h2 className="dm-title">{detail.inci}</h2>
          {detail.ru && <div className="dm-sub">{detail.ru}</div>}
          {detail.is_eu_allergen && <span className="dm-allergen">Аллерген ЕС</span>}
        </div>
        {detail.description && <p className="dm-desc">{detail.description}</p>}
        {!detail.description && <p className="dm-desc dm-muted">Описание пока готовится.</p>}

        {(onAddToCompare || onGoCompare) && (
          <div className="dm-cmp-actions">
            {onAddToCompare && (
              <button className={`btn btn-glass btn-sm ${addedToCompare ? "is-added" : ""}`}
                onClick={() => { onAddToCompare(detail.inci); setAddedToCompare(true); }} disabled={addedToCompare}>
                {addedToCompare ? "✓ В сравнении" : "＋ Добавить в сравнение"}
              </button>
            )}
            {onGoCompare && <button className="btn btn-primary btn-sm" onClick={onGoCompare}>Перейти к сравнению →</button>}
          </div>
        )}

        <div className="dm-section">
          <span className="dm-label">Группы и подгруппы</span>
          {detail.groups.map((g, i) => (
            <div key={i} className="dm-grouprow">
              <span className="g-tag" style={{ background: groupColor(g.group) + "1f", color: groupColor(g.group) }}
                    onClick={() => openGroup(g.group)}>{g.group}</span>
              {g.subgroup && <span className="dm-arrow">→</span>}
              {g.subgroup && <span className="dm-subtag" onClick={() => openGroup(g.group, g.subgroup)}>{g.subgroup}</span>}
              {g.subgroup2 && <><span className="dm-arrow">→</span><span className="dm-subtag">{g.subgroup2}</span></>}
              {descFor(subgroupDesc, g.group, g.subgroup, g.subgroup2) && <p className="dm-groupdesc">{descFor(subgroupDesc, g.group, g.subgroup, g.subgroup2)}</p>}
            </div>
          ))}
        </div>

        <div className="dm-section">
          <span className="dm-label">Встречается в средствах{compoKnown ? ` (${prods.length})` : ""}</span>
          {compoKnown === 0
            ? <p className="dm-muted">Чтобы увидеть, в каких средствах встречается компонент, откройте вкладку «Поиск аналогов» — составы подгрузятся, и список появится здесь.</p>
            : prods.length === 0
              ? <p className="dm-muted">Среди загруженных составов средств с этим компонентом нет.</p>
              : (
                <div className={`pcards ${prods.length <= 3 ? "few" : ""}`}>
                  {prods.map(p => <ProductMiniCard key={p.id} product={p} onClick={() => onOpenProduct(p)} />)}
                </div>
              )}
        </div>
      </>
    );
  } else if (detail.kind === "group") {
    // группа / подгруппа
    const desc = descFor(subgroupDesc, detail.group, detail.subgroup);
    const ings = ingredientsInGroup(detail.group, detail.subgroup);
    const prods = productsWithGroup(detail.group, detail.subgroup);
    body = (
      <>
        <div className="dm-head">
          <span className="dm-kind">{detail.subgroup ? "Подгруппа" : "Группа"}</span>
          <h2 className="dm-title" style={{ color: groupColor(detail.group) }}>{detail.subgroup || detail.group}</h2>
          {detail.subgroup && <div className="dm-sub" onClick={() => openGroup(detail.group)} style={{ cursor: "pointer" }}>в группе «{detail.group}»</div>}
        </div>
        {desc ? <p className="dm-desc">{desc}</p> : <p className="dm-desc dm-muted">Описание этой группы пока готовится.</p>}

        {ings.length > 0 && (
          <div className="dm-section">
            <span className="dm-label">Компоненты этой группы ({ings.length})</span>
            <div className="dm-chips">
              {ings.map(i => (
                <span key={i.id} className="dm-ingchip" onClick={() => openIngredient(i.inci_name)}>
                  {i.inci_name}{i.ru_name ? ` · ${i.ru_name}` : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="dm-section">
          <span className="dm-label">Средства с этой группой{compoKnown ? ` (${prods.length})` : ""}</span>
          {compoKnown === 0
            ? <p className="dm-muted">Откройте вкладку «Поиск аналогов», чтобы подгрузить составы — тогда здесь появятся средства с этой группой.</p>
            : prods.length === 0
              ? <p className="dm-muted">Среди загруженных составов средств с этой группой нет.</p>
              : (
                <div className={`pcards ${prods.length <= 3 ? "few" : ""}`}>
                  {prods.map(p => <ProductMiniCard key={p.id} product={p} onClick={() => onOpenProduct(p)} />)}
                </div>
              )}
        </div>
      </>
    );
  } else if (detail.kind === "info") {
    // страничка-описание категории (тип кожи головы, вид шампуня, безопасность и т.п.)
    body = (
      <>
        <div className="dm-head">
          <span className="dm-kind">{detail.category}</span>
          <h2 className="dm-title">{detail.title}</h2>
          {detail.subtitle && <div className="dm-sub">{detail.subtitle}</div>}
        </div>
        {detail.description
          ? <p className="dm-desc">{detail.description}</p>
          : <p className="dm-desc dm-muted">Подробное описание этой категории готовится. Здесь появится отдельная страница с разбором: что это значит, кому подходит и как выбирать.</p>}
      </>
    );
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal dm-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="dm-body">{body}</div>
      </div>
    </div>
  );
}

// краткая авто-сводка о средстве на основе состава: ключевые функции + флаги безопасности
function compositionSummary(product) {
  const rows = product.ingredients || [];
  if (!rows.length) return null;
  const list = rows.map(r => ({ inci: r.ing.inci_name, group: r.ing.group, position: r.position }));
  const fns = functionsFromList(list).map(f => f.text);
  const allergens = rows.filter(r => r.ing.is_eu_allergen).length;
  const total = rows.length;
  // активная часть до первой отдушки
  const fragIdx = list.findIndex(x => (x.group || "").toLowerCase().includes("отдушк"));
  const activeCount = fragIdx > 0 ? fragIdx : total;

  const parts = [];
  if (fns.length) {
    const f = fns.slice(0, 3).map(s => s.toLowerCase());
    parts.push(`Работает на ${f.join(", ")}`);
  }
  parts.push(`${total} ингредиент${total % 10 === 1 && total % 100 !== 11 ? "" : total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20) ? "а" : "ов"}, из них ~${activeCount} в активной части`);
  parts.push(allergens === 0 ? "аллергенов EU не обнаружено" : `${allergens} потенциальн${allergens === 1 ? "ый аллерген" : "ых аллергена(ов)"} EU`);
  return { text: parts.join(" · "), fns, allergens };
}

function ProductModal({ product, onClose, onOpenDetail, onOpenProduct, subgroupDesc, allProducts = [], compoCache = {}, loadAllCompositions, onImageSaved, onDelete, removeBgKey, editorMode = false, inCompare = false, compareCount = 0, compareMax = 5, onAddToCompare, onGoCompare }) {
  const [editingImage, setEditingImage] = useState(false);
  // подстраховка: если фоновая загрузка составов ещё не прошла, дотягиваем здесь,
  // чтобы «Похожие по составу» считались по всей базе, а не только по открытым.
  useEffect(() => { loadAllCompositions && loadAllCompositions().catch(() => {}); }, []);
  const goIngredient = (ing) => onOpenDetail({
    kind: "ingredient", inci: ing.inci_name, ru: ing.ru_name,
    description: ing.description, is_eu_allergen: ing.is_eu_allergen,
    groups: [{ group: ing.group, subgroup: ing.subgroup, subgroup2: ing.subgroup2 }],
  });
  const goGroup = (g) => onOpenDetail({ kind: "group", group: g });
  const goSubgroup = (g, s) => onOpenDetail({ kind: "group", group: g, subgroup: s });
  const goInfo = (category, title, subtitle) => onOpenDetail({ kind: "info", category, title, subtitle });
  const goAttrInfo = (p, tag) => {
    const t = (p.product_type || "").toLowerCase();
    if (t.includes("шампунь")) {
      if (tag.text === p.analytical_type) return goInfo("Промывающая способность", tag.text, "Что означает этот тип очищения и кому он подходит");
      if (tag.text === p.skin_type) return goInfo("Тип кожи головы", tag.text, "Особенности этого типа кожи головы и подбор ухода");
    }
    return goInfo("Характеристика средства", tag.text);
  };

  const attrTags = productAttributes(product);
  const attrLabel = (product.product_type || "").toLowerCase().includes("шампунь") ? "Очищение и тип кожи головы"
    : (product.product_type || "").toLowerCase().match(/маск|кондиционер/) ? "Действие"
    : "Характеристики";

  const allergens = product.ingredients.filter(r => r.ing.is_eu_allergen).length;
  const score = Math.max(40, 100 - allergens * 18);
  const safety = score >= 85
    ? { label: "Высокая безопасность", note: "аллергенов не обнаружено", color: "#1f7a5c" }
    : score >= 65
    ? { label: "Средняя безопасность", note: `${allergens} аллерген(ов) в составе`, color: "#c98a3a" }
    : { label: "Пониженная безопасность", note: `${allergens} аллерген(ов) в составе`, color: "#c0584f" };
  const matched = product.ingredients.filter(r => r.matched).length;

  // похожие по составу — из всех загруженных в кэш (строго кроме текущего)
  const similar = useMemo(() => {
    const sourceList = toCompList(product);
    if (!sourceList.length) return [];
    const candidates = allProducts
      .filter(p => p.id !== product.id && compoCache[p.id])
      .map(p => ({ ...p, ingredients: compoCache[p.id] }));
    if (!candidates.length) return [];
    return findSimilar(sourceList, product, candidates, { sameType: true }).slice(0, 4);
  }, [product.id, allProducts, compoCache]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-media">
            {product.image_url
              ? <img src={product.image_url} alt={product.name} />
              : <div className="pt-ph" style={{ width: "58%", height: "72%", "--tint": typeTint(product.product_type) }} aria-hidden="true">
                  <svg viewBox="0 0 40 48" width="100%" height="100%">
                    <rect x="13" y="2" width="14" height="6" rx="2" fill="var(--tint)" opacity="0.85" />
                    <rect x="8" y="8" width="24" height="38" rx="7" fill="var(--tint)" opacity="0.16" stroke="var(--tint)" strokeOpacity="0.35" strokeWidth="1" />
                    <text x="20" y="32" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontWeight="600" fontSize="16" fill="var(--tint)">{brandInitial(product)}</text>
                  </svg>
                </div>
            }
          </div>
          <div className="modal-info">
            <button className="modal-close" onClick={onClose}>✕</button>
            <div className="modal-title">{product.name}</div>
            <div className="modal-brand">{product.brand}</div>
            <div className="meta-row">
              {product.product_type && <div className="meta-item"><span className="meta-label">Категория</span><span className="meta-value meta-link" onClick={() => goInfo("Вид средства", product.product_type, "Что это за категория средств и как её выбирать")}>{product.product_type}</span></div>}
              {product.price_tier && <div className="meta-item"><span className="meta-label">Цена</span><span className="meta-value" style={{ textTransform: "capitalize" }}>{product.price_tier}</span></div>}
              {product.is_face && <div className="meta-item"><span className="meta-label">Зона</span><span className="meta-value">Для лица</span></div>}
            </div>
            {attrTags.length > 0 && (
              <div className="fn-block">
                <span className="fn-block-label">{attrLabel}</span>
                <div className="fn-list">
                  {attrTags.map((a, i) => (
                    <span key={i} className={`fn-glass-lg ${a.strong ? "" : "soft"} fn-clickable`} style={{ "--fn": a.hue }} onClick={() => goAttrInfo(product, a)}>
                      <span className="dot" />{a.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="safety safety-link" onClick={() => goInfo("Степень безопасности", safety.label, "Как мы считаем степень безопасности и что влияет на оценку")}>
              <div className="safety-ring" style={{ background: safety.color }}>{score}</div>
              <div className="safety-txt">
                <b style={{ color: safety.color }}>{safety.label}</b>
                <span>{safety.note}</span>
              </div>
              <span className="safety-arrow">→</span>
            </div>
            {(() => {
              const summary = compositionSummary(product);
              const n = (product.notes || "").toLowerCase();
              const badge =
                n.includes("супер состав") ? { icon: "🏆", label: "Супер состав", cls: "badge-gold" }
                : (n.includes("рекомендовано") || n.includes("рекомендован")) ? { icon: "⭐", label: "Рекомендовано", cls: "badge-star" }
                : null;
              if (!summary && !badge) return null;
              return (
                <div className="summary-block">
                  {badge && <span className={`notes-badge ${badge.cls}`}>{badge.icon} {badge.label}</span>}
                  {summary && <p className="summary-text">{summary.text}</p>}
                </div>
              );
            })()}
            <div className="cmp-add-row">
              <button className={`btn btn-sm ${inCompare ? "btn-glass is-added" : "btn-glass"}`}
                onClick={onAddToCompare} disabled={inCompare || compareCount >= compareMax}>
                {inCompare ? "✓ В сравнении" : "＋ Добавить в сравнение"}
              </button>
              {compareCount > 0 && (
                <button className="btn btn-primary btn-sm" onClick={onGoCompare}>
                  Перейти к сравнению ({compareCount})
                </button>
              )}
            </div>
            {!inCompare && compareCount >= compareMax && (
              <div className="cmp-add-note">Добавлено максимальное количество средств для сравнения</div>
            )}
            {editorMode && (!editingImage ? (
              <button className="btn btn-glass btn-sm photo-btn" onClick={() => setEditingImage(true)}>
                {product.image_url ? "Заменить фото" : "＋ Добавить фото"}
              </button>
            ) : (
              <div style={{ marginTop: 10, padding: 12, border: "1px solid var(--glass-border)", borderRadius: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>Изображение</span>
                  <button className="btn btn-glass btn-sm" onClick={() => setEditingImage(false)}>Отмена</button>
                </div>
                <ImagePicker removeBgKey={removeBgKey} onDone={async (url) => {
                  if (url && onImageSaved) { await onImageSaved(product.id, url); setEditingImage(false); }
                }} />
              </div>
            ))}
          </div>
        </div>

        <div className="compo">
          <div className="compo-head">Состав, {product.ingredients.length} ингредиентов <span>· распознано {matched}</span></div>
          <div className="ing-list">
            <div className="ing-grid">
              <div className="ing-colhead" />
              <div className="ing-colhead">Ингредиент</div>
              <div className="ing-colhead">Группа</div>
              <div className="ing-colhead">Подгруппа · описание</div>
            </div>
            {(() => {
              const fragranceIdx = product.ingredients.findIndex(r => r.ing.group === "Отдушки");
              const hasBoundary = fragranceIdx > -1 && !product.is_face;
              return product.ingredients.map((row, i) => {
                const ing = row.ing;
                const minor = hasBoundary && i > fragranceIdx;
                const showDivider = hasBoundary && i === fragranceIdx + 1;
                return (
                  <div key={row.id}>
                    {showDivider && (
                      <div className="compo-divider">
                        <span className="ln" /><span className="lbl">ниже ~1% · менее значимо</span><span className="ln" />
                      </div>
                    )}
                    <div className={`ing-grid ${minor ? "minor" : ""}`}>
                      <div className="ing-cell ing-pos">{row.position || i + 1}</div>
                      <div className="ing-cell ing-cell-hover">
                        <div className="ing-inci">
                          <span className="sub-link" onClick={() => goIngredient(ing)}>{ing.inci_name}</span>
                          {ing.is_eu_allergen && <span className="badge-eu" title="Аллерген EU-26. Список со всеми описаниями – на этапе подключения к базе">Аллерген</span>}
                        </div>
                        {ing.ru_name && <div className="ing-ru">{ing.ru_name}</div>}
                      </div>
                      <div className="ing-cell ing-cell-sep">
                        {ing.group
                          ? <span className="g-tag" style={{ background: groupColor(ing.group) + "1f", color: groupColor(ing.group) }} onClick={() => goGroup(ing.group)}>{ing.group}</span>
                          : <span style={{ color: "var(--ink-faint)" }}>–</span>}
                      </div>
                      <div className="ing-cell ing-cell-sep">
                        {ing.subgroup && <div className="ing-sub"><span className="lbl">Подгруппа</span><span className="sub-link" onClick={() => goSubgroup(ing.group, ing.subgroup)}>{ing.subgroup}</span></div>}
                        {(ing.description || descFor(subgroupDesc, ing.group, ing.subgroup, ing.subgroup2)) && <div className="ing-desc" style={{ marginTop: ing.subgroup ? 5 : 0 }}>{ing.description || descFor(subgroupDesc, ing.group, ing.subgroup, ing.subgroup2)}</div>}
                        {ing.oil && <div className="ing-oil">Комедогенность {ing.oil.comedogenicity} · проникновение {ing.oil.penetration}</div>}
                        {!ing.subgroup && !ing.description && !ing.oil && !descFor(subgroupDesc, ing.group, ing.subgroup, ing.subgroup2) && <span style={{ color: "var(--ink-faint)", fontSize: 12 }}>–</span>}
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
          {similar.length > 0 ? (
            <div className="similar-block">
              <div className="similar-head">
                <span className="similar-title">Похожие по составу</span>
                <span className="similar-hint">того же вида · по сходству состава</span>
              </div>
              <div className={`pcards ${similar.length <= 3 ? "few" : ""}`}>
                {similar.map(({ product: sp, score }) => (
                  <ProductMiniCard key={sp.id} product={sp} score={score} onClick={() => onOpenProduct && onOpenProduct(sp)} />
                ))}
              </div>
            </div>
          ) : (
            <div className="similar-block">
              <div className="similar-head"><span className="similar-title">Похожие по составу</span></div>
              <p className="dm-muted" style={{ marginTop: 8 }}>Аналоги пока не найдены. Чтобы сравнить состав вручную, откройте вкладку «Аналоги».</p>
            </div>
          )}
          {editorMode && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button className="btn btn-danger btn-sm" onClick={onDelete}>Удалить средство</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Автокомплит выбора средства из базы (вместо списка из 880) ──────────────
function ProductPicker({ value, onPick, onClear, products = [], placeholder = "Начните вводить название или бренд…" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter(p =>
      (p.name || "").toLowerCase().includes(s) || (p.brand || "").toLowerCase().includes(s)
    ).slice(0, 8);
  }, [q, products]);

  if (value) {
    return (
      <div className="ac-chosen">
        <ProductThumb product={value} size={38} />
        <span className="ac-chosen-meta">
          <span className="ac-opt-name">{value.name}</span>
          <span className="ac-opt-brand">{value.brand}</span>
        </span>
        <button className="ac-clear" onClick={onClear} title="Очистить">✕</button>
      </div>
    );
  }
  return (
    <div className="ac-wrap">
      <input className="ac-input" value={q} placeholder={placeholder}
        onChange={e => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)} />
      {open && q.trim() && (
        <div className="ac-drop">
          {matches.length === 0
            ? <div className="ac-empty">Ничего не найдено</div>
            : matches.map(p => (
              <button key={p.id} className="ac-opt" onMouseDown={() => { onPick(p); setQ(""); setOpen(false); }}>
                <ProductThumb product={p} size={34} />
                <span className="ac-opt-meta">
                  <span className="ac-opt-name">{p.name}</span>
                  <span className="ac-opt-brand">{p.brand}{p.product_type ? ` · ${p.product_type}` : ""}</span>
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

// разбор вставленного состава в список { inci, group, position }
function buildParser(ingredients = []) {
  const guessGroup = (inci) => {
    const f = ingredients.find(x => normInci(x.inci_name) === normInci(inci));
    return f ? f.group : null;
  };
  return (text) => text.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean)
    .map((inci, i) => ({ inci, group: guessGroup(inci), position: i + 1 }));
}

// какие функции (увлажнение/питание/...) даёт состав — по группам ингредиентов
const GROUP_TO_FN = [
  { group: "Увлажнители", text: "Увлажнение", hue: "#3f7fb0" },
  { group: "Масла", text: "Питание", hue: "#b07d2e" },
  { group: "Эмоленты", text: "Смягчение", hue: "#c0892f" },
  { group: "Протеины", text: "Восстановление", hue: "#9a5fb0" },
  { group: "Кондиционеры", text: "Гладкость", hue: "#3f9a63" },
  { group: "Структурообразователи", text: "Плёнка / защита", hue: "#4f78c4" },
];
function functionsFromList(list) {
  const gs = new Set(list.map(x => x.group).filter(Boolean));
  return GROUP_TO_FN.filter(f => gs.has(f.group));
}

// ─── ВКЛАДКА «ПОИСК АНАЛОГОВ» — отдаём список совпадений по всей базе ─────────
function AnalogTab({ onOpenProduct, allProducts = [], allIngredients = [], loadAllCompositions }) {
  const parse = useMemo(() => buildParser(allIngredients), [allIngredients]);
  const [raw, setRaw] = useState("");
  const [picked, setPicked] = useState(null);
  const [manualType, setManualType] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null); // {done,total}
  const [fullProducts, setFullProducts] = useState([]); // продукты с составами

  const types = [...new Set(allProducts.map(p => p.product_type).filter(Boolean))].sort();
  // если выбрали средство из базы — берём его состав из fullProducts (после загрузки)
  const pickedFull = picked ? (fullProducts.find(p => p.id === picked.id) || picked) : null;
  const sourceList = pickedFull && pickedFull.ingredients ? toCompList(pickedFull) : parse(raw);
  const ready = (picked || raw.trim().length > 0);

  const autoType = picked ? picked.product_type : detectType(sourceList);
  const effectiveType = manualType || autoType || "";

  const results = useMemo(() => {
    if (!searched || !fullProducts.length) return [];
    let r = findSimilar(sourceList, pickedFull, fullProducts, { sameType: false, order: sortBy });
    const t = typeFilter || effectiveType;
    if (t) r = r.filter(x => x.product.product_type === t);
    return r.slice(0, 24);
  }, [searched, fullProducts, raw, picked, sortBy, typeFilter, effectiveType]);

  const run = async () => {
    setBusy(true); setProgress({ done: 0, total: allProducts.length });
    try {
      const full = await loadAllCompositions((done, total) => setProgress({ done, total: total || allProducts.length }));
      setFullProducts(full);
      setSearched(true);
    } finally { setBusy(false); setProgress(null); }
  };
  const reset = () => { setRaw(""); setPicked(null); setManualType(""); setTypeFilter(""); setSearched(false); };
  const editAgain = () => setSearched(false);
  const summaryText = picked ? `${picked.name} · ${picked.brand}` : `состав из ${sourceList.length} компонентов`;

  return (
    <div className="sim-tab">
      <div className="section-head">
        <div className="section-title">Аналоги</div>
      </div>

      {!searched && (
        <>
          <p className="sim-intro">Выберите средство из базы или вставьте его состав. Мы подберём похожие средства и отсортируем их по совпадению состава или по цене.</p>

          <div className="sim-single">
            <label className="sim-label">Выберите средство в базе</label>
            <ProductPicker value={picked} products={allProducts} onPick={(p) => { setPicked(p); setRaw(""); setManualType(""); }} onClear={() => setPicked(null)} />

            <details className="sim-manual" open={!picked && raw.length > 0}>
              <summary>Нет в базе? Ввести состав вручную</summary>
              <textarea className="sim-textarea compact" placeholder="Вода, лаурет-сульфат натрия, кокамидопропилбетаин, глицерин, отдушка…"
                value={raw} onChange={e => { setRaw(e.target.value); setPicked(null); setManualType(""); }} />
              {ready && !picked && sourceList.length > 0 && (
                <div className="type-detect">
                  {autoType
                    ? <span>Похоже на: <b>{autoType}</b>. Можно уточнить:</span>
                    : <span>Вид не определился. Выберите вручную:</span>}
                  <div className="type-pills">
                    {types.map(t => (
                      <span key={t} className={`type-pill ${(manualType || autoType) === t ? "active" : ""}`}
                        onClick={() => setManualType(t)}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </details>
          </div>

          <div className="cmp-cta">
            <button className="btn btn-primary btn-cta" onClick={run} disabled={!ready || busy}>
              {busy ? `Загрузка составов… ${progress ? Math.round(100 * progress.done / Math.max(1, progress.total)) : 0}%` : "Найти аналоги"}
            </button>
            {!ready && <span className="cmp-hint">Сначала выберите средство или вставьте состав</span>}
            {busy && <span className="cmp-hint">Первый поиск грузит составы всех средств, дальше будет мгновенно</span>}
          </div>
        </>
      )}

      {searched && (
        <>
          <div className="input-collapsed">
            <span className="ic-summary">Аналоги для: <b>{summaryText}</b></span>
            <button className="btn btn-glass btn-sm ic-edit" onClick={editAgain}>Изменить</button>
            <button className="filter-reset" onClick={reset}>Сбросить</button>
          </div>

          {/* компактный фильтр и сортировка — рядом с результатами */}
          <div className="results-bar">
            <div className="count">Найдено: {results.length}</div>
            <div className="results-controls">
              <select className="sim-select sim-select-sm" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">{effectiveType ? `Вид: как у исходного (${effectiveType})` : "Вид: любой"}</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select className="sim-select sim-select-sm" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="match">Сначала по совпадению</option>
                <option value="price">Сначала дешевле</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="empty-state"><span className="empty-ic">◇</span><p>Похожих средств не нашлось. Попробуйте другой вид средства или уберите фильтр вида.</p></div>
          ) : (
            <div className="pcards">
              {results.map(({ product: sp, score }) => (
                <ProductMiniCard key={sp.id} product={sp} score={score} onClick={() => onOpenProduct(sp)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── ВКЛАДКА «СРАВНЕНИЕ СОСТАВОВ» — прямое сравнение двух конкретных средств ──
function CompareTab({ onOpenProduct, items = [], onRemove, onClear, allProducts = [], allIngredients = [], loadComposition, compoCache = {} }) {
  // дотягиваем составы выбранных средств, если их ещё нет в кэше
  useEffect(() => {
    items.forEach(p => { if (!compoCache[p.id]) loadComposition && loadComposition(p).catch(() => {}); });
  }, [items, compoCache]);

  // безопасность по той же формуле, что и в карточке средства
  const safetyOf = (p) => {
    const rows = compoCache[p.id];
    if (!rows) return null;
    const allergens = rows.filter(r => r.ing && r.ing.is_eu_allergen).length;
    const score = Math.max(40, 100 - allergens * 18);
    const label = score >= 85 ? "Высокая" : score >= 65 ? "Средняя" : "Пониженная";
    const color = score >= 85 ? "#1f7a5c" : score >= 65 ? "#c98a3a" : "#c0584f";
    return { score, label, color, allergens };
  };

  // состав средства как список для движка похожести
  const listOf = (p) => compoCache[p.id]
    ? compoCache[p.id].map(r => ({ inci: r.ing.inci_name, group: r.ing.group, position: r.position }))
    : [];

  // совпадение состава каждого средства с ПЕРВЫМ в списке (базой сравнения)
  const baseList = items.length ? listOf(items[0]) : [];
  const simToBase = (p, idx) => {
    if (idx === 0) return null;
    const l = listOf(p);
    if (!l.length || !baseList.length) return null;
    return compositionSimilarity(baseList, l).score;
  };

  if (!items.length) {
    return (
      <div className="sim-tab">
        <div className="section-head"><div className="section-title">Сравнение</div></div>
        <div className="cmp-empty">
          <p className="sim-intro" style={{ marginBottom: 14 }}>Здесь можно сравнить до 5 средств между собой: функции, состав, безопасность, стоимость и заметки.</p>
          <p className="dm-muted">Откройте карточку любого средства и нажмите «Добавить в сравнение».</p>
        </div>
      </div>
    );
  }

  const rowLabel = { width: 140 };

  return (
    <div className="sim-tab">
      <div className="section-head">
        <div className="section-title">Сравнение · {items.length} из 5</div>
        <button className="filter-reset" onClick={onClear}>Очистить всё</button>
      </div>

      <div className="cmp-matrix-wrap">
        <table className="cmp-matrix">
          <thead>
            <tr>
              <th className="cmp-corner" />
              {items.map((p) => (
                <th key={p.id} className="cmp-col-head">
                  <button className="cmp-col-x" title="Убрать" onClick={() => onRemove(p.id)}>×</button>
                  <div className="cmp-col-card" onClick={() => onOpenProduct && onOpenProduct(p)} title="Открыть карточку">
                    <ProductThumb product={p} size={64} />
                    <div className="cmp-col-name">{p.name}</div>
                    {p.brand && <div className="cmp-col-brand">{p.brand}</div>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cmp-row-label">Вид средства</td>
              {items.map(p => <td key={p.id} className="cmp-cell">{p.product_type || "—"}</td>)}
            </tr>
            <tr>
              <td className="cmp-row-label">Функции</td>
              {items.map(p => {
                const tags = productAttributes(p);
                return (
                  <td key={p.id} className="cmp-cell">
                    {tags.length ? (
                      <div className="cmp-fn-list">
                        {tags.map((a, i) => (
                          <span key={i} className={`fn-glass ${a.strong ? "" : "soft"}`} style={{ "--fn": a.hue }}>{a.text}</span>
                        ))}
                      </div>
                    ) : <span className="dm-muted">базовый состав</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="cmp-row-label">Безопасность</td>
              {items.map(p => {
                const s = safetyOf(p);
                return (
                  <td key={p.id} className="cmp-cell">
                    {s ? (
                      <div className="cmp-safety">
                        <span className="cmp-safety-ring" style={{ background: s.color }}>{s.score}</span>
                        <span className="cmp-safety-lbl" style={{ color: s.color }}>{s.label}</span>
                      </div>
                    ) : <span className="dm-muted">загрузка…</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="cmp-row-label">Стоимость</td>
              {items.map(p => (
                <td key={p.id} className="cmp-cell" style={{ textTransform: "capitalize" }}>{p.price_tier || "—"}</td>
              ))}
            </tr>
            <tr>
              <td className="cmp-row-label">Совпадение состава<span className="cmp-row-sub">с первым средством</span></td>
              {items.map((p, idx) => {
                const sim = simToBase(p, idx);
                return (
                  <td key={p.id} className="cmp-cell">
                    {idx === 0 ? <span className="cmp-base-pill">база сравнения</span>
                      : sim == null ? <span className="dm-muted">загрузка…</span>
                      : <span className="cmp-sim-pct" style={{ "--m": sim >= 70 ? "#1f7a5c" : sim >= 45 ? "#c98a3a" : "#8b8f86" }}>{sim}%</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="cmp-row-label">Состав<span className="cmp-row-sub">кол-во ингредиентов</span></td>
              {items.map(p => {
                const n = compoCache[p.id] ? compoCache[p.id].length : null;
                return <td key={p.id} className="cmp-cell">{n == null ? <span className="dm-muted">загрузка…</span> : n}</td>;
              })}
            </tr>
            <tr>
              <td className="cmp-row-label">Заметка</td>
              {items.map(p => (
                <td key={p.id} className="cmp-cell">
                  {p.notes && String(p.notes).trim() ? <span className="cmp-note-text">{String(p.notes).trim()}</span> : <span className="dm-muted">нет</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="cmp-tech" style={{ marginTop: 14 }}>Совпадение по составу — <b>технический показатель</b> относительно первого (базового) средства в списке. Чтобы подобрать замену по всей базе, откройте вкладку «Аналоги».</p>
    </div>
  );
}



// ─── Сортировка: активные/лучшие группы — первыми, затем остальные ───────────
// Приоритет активных групп (по файлу приоритета). Конкретный список «лучших»
// отдельных ингредиентов вставляется в ACTIVE_INCI, когда будет предоставлен.
const ACTIVE_GROUP_ORDER = [
  "Витамины", "Антиоксиданты", "Кислоты", "Протеины", "Пептиды",
  "Активы", "Увлажнители", "Масла", "Липиды",
];
const ACTIVE_INCI = new Set([
  // СЮДА: список лучших/активных ингредиентов (INCI в нижнем регистре), когда будет предоставлен.
  // напр.: "niacinamide", "retinol", "ascorbic acid", "panthenol"
]);
const activeRank = (i) => {
  const inci = (i.inci_name || "").toLowerCase();
  if (ACTIVE_INCI.has(inci)) return -1;                 // явно отмеченные — в самом верху
  const gi = ACTIVE_GROUP_ORDER.indexOf(i.group);
  return gi === -1 ? ACTIVE_GROUP_ORDER.length : gi;     // активные группы по порядку, затем прочие
};
// эвристика «запись с ошибкой»: нет группы / unknown / подозрительные символы
const SUSPECT_CHARS = /[^\p{L}\p{N}\s\-+/().,'%·:&]/u;
const isProblem = (i) =>
  !i.group || /unknown|неразобран|\?\?\?/i.test(i.group || "") ||
  SUSPECT_CHARS.test(i.inci_name || "") || !(i.inci_name || "").trim();

function IngredientsTab({ data = [], loading, onOpenDetail, editorMode = false, onSaveIngredient }) {
  const openCard = (i) => onOpenDetail({
    kind: "ingredient", inci: i.inci_name, ru: i.ru_name,
    description: i.description, is_eu_allergen: i.is_eu_allergen,
    groups: i.allGroups && i.allGroups.length
      ? i.allGroups.map(g => ({ group: g.group, subgroup: g.subgroup, subgroup2: g.subgroup2 }))
      : [{ group: i.group, subgroup: i.subgroup, subgroup2: i.subgroup2 }],
  });
  const openGroup = (group, subgroup) => onOpenDetail({ kind: "group", group, subgroup });

  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [filterSub, setFilterSub] = useState("");
  const [sortBy, setSortBy] = useState("active");   // active | alpha | alpha-desc | group
  const [onlyProblems, setOnlyProblems] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);     // { id, field }
  const [savingId, setSavingId] = useState(null);

  // дерево категорий: Группа → её подгруппы
  const tree = useMemo(() => {
    const m = new Map();
    for (const i of data) {
      if (!i.group) continue;
      if (!m.has(i.group)) m.set(i.group, new Set());
      if (i.subgroup) m.get(i.group).add(i.subgroup);
    }
    return [...m.entries()].map(([g, subs]) => ({ group: g, subs: [...subs].sort() }))
      .sort((a, b) => a.group.localeCompare(b.group, "ru"));
  }, [data]);

  const problemCount = useMemo(() => data.filter(isProblem).length, [data]);

  // если строка нашлась только по алиасу — вернуть этот алиас, чтобы показать его в результатах
  const aliasHitFor = (i) => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    if ((i.inci_name || "").toLowerCase().includes(q) || (i.ru_name || "").toLowerCase().includes(q)) return null;
    return (i.aliases || "").split("|").map(a => a.trim()).find(a => a.toLowerCase().includes(q)) || null;
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const otherOk = (i) => {
      if (filterGroup && i.group !== filterGroup) return false;
      if (filterSub && i.subgroup !== filterSub) return false;
      if (onlyProblems && !isProblem(i)) return false;
      return true;
    };
    let rows = data.filter(i => {
      const ms = !q || (i.inci_name || "").toLowerCase().includes(q) || (i.ru_name || "").toLowerCase().includes(q)
        || (i.aliases || "").toLowerCase().includes(q);
      return ms && otherOk(i);
    });
    // точных совпадений нет — ищем ближайшие (опечатки в запросе)
    if (!rows.length && q.length >= 4)
      rows = data.filter(i =>
        (fuzzyIncludes(i.inci_name, q) || fuzzyIncludes(i.ru_name, q) || fuzzyIncludes(i.aliases, q)) && otherOk(i));
    const byName = (a, b) => (a.inci_name || "").localeCompare(b.inci_name || "", "ru");
    if (sortBy === "alpha") rows = [...rows].sort(byName);
    else if (sortBy === "alpha-desc") rows = [...rows].sort((a, b) => byName(b, a));
    else if (sortBy === "group") rows = [...rows].sort((a, b) => (a.group || "я").localeCompare(b.group || "я", "ru") || byName(a, b));
    else rows = [...rows].sort((a, b) => {
      // «Лучшие»: интересные/активные с заполненным описанием — выше
      const hasDesc = (x) => x.description && String(x.description).trim().length > 0 ? 0 : 1;
      return hasDesc(a) - hasDesc(b) || activeRank(a) - activeRank(b) || byName(a, b);
    });
    return rows;
  }, [data, search, filterGroup, filterSub, onlyProblems, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const pageNums = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - safePage) <= 1) pageNums.push(p);
    else if (pageNums[pageNums.length - 1] !== "…") pageNums.push("…");
  }

  // правка прямо в таблице (только редактор) — сохраняется в БД
  const startEdit = (id, field) => { if (editorMode) setEditing({ id, field }); };
  const commit = async (id, field, value) => {
    setEditing(null);
    if (!onSaveIngredient) return;
    setSavingId(id);
    try { await onSaveIngredient(id, { [field]: value }); }
    finally { setSavingId(null); }
  };

  const Pager = () => (
    <div className="pager">
      <div className="pg-size">
        Показывать
        <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
        на странице · всего {filtered.length}
      </div>
      <div className="pager-controls">
        <button className="pg-btn" disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>‹</button>
        {pageNums.map((p, idx) => p === "…"
          ? <span key={"e" + idx} style={{ color: "var(--ink-faint)", padding: "0 4px" }}>…</span>
          : <button key={p} className={`pg-btn ${p === safePage ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
        )}
        <button className="pg-btn" disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>›</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="toolbar">
        <input className="search" placeholder="Поиск по названию или составляющей…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        {editorMode && (
          <label className="filter-check" style={{ whiteSpace: "nowrap" }} title="Записи без группы, с неразобранной категорией или некорректными символами">
            <input type="checkbox" checked={onlyProblems} onChange={() => { setOnlyProblems(v => !v); setPage(1); }} />
            <span>С ошибками{problemCount ? ` · ${problemCount}` : ""}</span>
          </label>
        )}
      </div>

      {/* дерево категорий: Группа → Подгруппа */}
      <div className="filter-pills">
        <span className={`pill ${!filterGroup ? "active" : ""}`} onClick={() => { setFilterGroup(""); setFilterSub(""); setPage(1); }}>Все группы</span>
        {tree.map(t => <span key={t.group} className={`pill ${filterGroup === t.group ? "active" : ""}`} onClick={() => { setFilterGroup(t.group); setFilterSub(""); setPage(1); }}>{t.group}</span>)}
      </div>
      {filterGroup && tree.find(t => t.group === filterGroup && t.subs.length > 0) && (
        <div className="filter-pills" style={{ marginTop: -6, paddingLeft: 14 }}>
          <span style={{ color: "var(--ink-faint)", fontSize: 12, alignSelf: "center", marginRight: 4 }}>↳ подгруппы:</span>
          <span className={`pill pill-sub ${!filterSub ? "active" : ""}`} onClick={() => { setFilterSub(""); setPage(1); }}>Все</span>
          {tree.find(t => t.group === filterGroup).subs.map(s =>
            <span key={s} className={`pill pill-sub ${filterSub === s ? "active" : ""}`} onClick={() => { setFilterSub(s); setPage(1); }}>{s}</span>)}
        </div>
      )}

      <div className="section-head">
        <div className="section-title">Ингредиенты</div>
        <div className="ing-head-right">
          <select className="sim-select ing-sort" value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
            <option value="active">Лучшие</option>
            <option value="alpha">По названию (А–Я)</option>
            <option value="alpha-desc">По названию (Я–А)</option>
            <option value="group">По группам</option>
          </select>
          <div className="count">{filtered.length} записей{editorMode && " · редактирование включено"}</div>
        </div>
      </div>

      {loading ? <LoadingMascot /> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: "24%" }}>Название</th>
                <th style={{ width: "20%" }}>Русское название</th>
                <th style={{ width: "16%" }}>Группа</th>
                <th style={{ width: "16%" }}>Подгруппа</th>
                <th style={{ width: "24%" }}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(i => (
                <tr key={i.id} className={savingId === i.id ? "row-saving" : ""}>
                  <td className="td-inci">
                    <span className="inci-link" onClick={() => openCard(i)}>{i.inci_name}</span>
                    {i.is_eu_allergen && <span className="badge-eu" style={{ marginLeft: 7 }} title="Аллерген из списка EU-26">Аллерген</span>}
                    {aliasHitFor(i) && (
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}
                        title="Совпадение по альтернативному написанию этого ингредиента">
                        найдено по алиасу: <span style={{ color: "var(--ink-soft)" }}>{aliasHitFor(i)}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {editorMode && editing?.id === i.id && editing?.field === "ru_name" ? (
                      <input className="cell-input" autoFocus defaultValue={i.ru_name || ""}
                        onBlur={e => commit(i.id, "ru_name", e.target.value)}
                        onKeyDown={e => e.key === "Enter" && commit(i.id, "ru_name", e.target.value)} />
                    ) : (
                      <span className={editorMode ? "cell-edit-hint" : ""} onClick={() => startEdit(i.id, "ru_name")}
                        style={{ color: i.ru_name ? "var(--ink-soft)" : "var(--ink-faint)" }}>
                        {i.ru_name || "–"}
                      </span>
                    )}
                  </td>
                  <td>
                    {i.group
                      ? <span className={`g-tag ${editorMode ? "cell-edit-hint" : ""}`} style={{ display: "inline-block", background: groupColor(i.group) + "1f", color: groupColor(i.group), cursor: "pointer" }} onClick={() => openGroup(i.group)}>{i.group}</span>
                      : <span style={{ color: "var(--ink-faint)" }}>–</span>}
                  </td>
                  <td style={{ color: "var(--ink-soft)", fontSize: 13 }}>
                    {i.subgroup
                      ? <span className="inci-link" onClick={() => openGroup(i.group, i.subgroup)}>{i.subgroup}</span>
                      : "–"}
                  </td>
                  <td style={{ color: "var(--ink-soft)", fontSize: 13, lineHeight: 1.5 }}>
                    {editorMode && editing?.id === i.id && editing?.field === "description" ? (
                      <input className="cell-input" autoFocus defaultValue={i.description || ""}
                        onBlur={e => commit(i.id, "description", e.target.value)}
                        onKeyDown={e => e.key === "Enter" && commit(i.id, "description", e.target.value)} />
                    ) : (
                      <span className={editorMode ? "cell-edit-hint" : ""} onClick={() => startEdit(i.id, "description")}>
                        {i.description || "–"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pager />
    </>
  );
}


// ===== Боевые admin-модалки, ImagePicker, LoginScreen =====

function parseInciList(raw) {
  let s = raw.replace(/[;\n\r]+/g, ", ");
  s = s.replace(/,[ \t]+/g, ", ");
  return s.split(", ").map(t => t.trim()).filter(Boolean);
}

// ── INCI-матчер v2: нормализация + алиасы ────────────────────────────────────
// Формулы 1-в-1 повторяют SQL-чистку данных v4 (plans/migration_v4/011, 013) —
// ключ, посчитанный здесь, обязан совпадать с ключом, по которому сливались дубли.
const HOMOGLYPHS_CYR = "авекмнорстух", HOMOGLYPHS_LAT = "abekmhopctyx";
const fixHomoglyphs = (s) => s.replace(/[авекмнорстух]/g, c => HOMOGLYPHS_LAT[HOMOGLYPHS_CYR.indexOf(c)]);

// строгий ключ: гомоглифы → "_-*"→пробел → скобки → хвост-концентрация → слэши/пробелы
function inciKey(s) {
  return fixHomoglyphs((s || "").toLowerCase())
    .replace(/[_\-*]/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\s*\d+([.,\s]\d+)*\s*(ppm|ppb|%|iu\/?g?)\s*$/i, "")
    .replace(/\s*\/\s*/g, "/")
    .trim()
    .replace(/\s+/g, " ");
}

// агрессивный ключ (OCR-разрывы): только [a-z0-9/], матчить при length>=4 и единственном кандидате
function inciKeyAggressive(s) {
  return fixHomoglyphs((s || "").toLowerCase())
    .replace(/[_\-*]/g, "")
    .replace(/[^ -~]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9/]/g, "");
}

// индекс справочника: ключ → ингредиент (inci_name + каждый алиас через "|")
function buildInciIndex(ingredients) {
  const strict = new Map();
  const aggressive = new Map(); // null = коллизия ключа, матчить нельзя
  for (const ing of ingredients) {
    const names = [ing.inci_name, ...(ing.aliases ? ing.aliases.split("|") : [])];
    for (const n of names) {
      const k = inciKey(n);
      if (k && !strict.has(k)) strict.set(k, ing);
      const ak = inciKeyAggressive(n);
      if (ak.length >= 4) {
        const cur = aggressive.get(ak);
        if (cur === undefined) aggressive.set(ak, ing);
        else if (cur && cur.id !== ing.id) aggressive.set(ak, null);
      }
    }
  }
  return { strict, aggressive };
}

// exact → строгий ключ → агрессивный ключ; raw_inci_name сохраняется как есть (концентрации значимы)
function matchInci(raw, index) {
  const k = inciKey(raw);
  const hit = k ? index.strict.get(k) : null;
  if (hit) {
    const exact = hit.inci_name?.toLowerCase() === (raw || "").trim().toLowerCase();
    return { ing: hit, source: exact ? "exact" : "norm" };
  }
  const ak = inciKeyAggressive(raw);
  if (ak.length >= 4) {
    const a = index.aggressive.get(ak);
    if (a) return { ing: a, source: "ocr" };
  }
  return null;
}

const SIZE = 1200;

// Шаг: загрузить в Supabase Storage
async function uploadToStorage(blob) {
  const filename = `product_${Date.now()}.webp`;
  let resp;
  try {
    resp = await fetch(
      `${SUPABASE_URL}/storage/v1/object/product-images/${filename}`,
      {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${ACCESS_TOKEN || SUPABASE_KEY}`,
          "Content-Type": "image/webp",
          "x-upsert": "true"
        },
        body: blob
      }
    );
  } catch (e) {
    throw new Error(`[Storage] Сетевая ошибка при загрузке в Supabase: ${e.message}`);
  }
  if (!resp.ok) {
    let detail = "";
    try { const j = await resp.json(); detail = j?.error || j?.message || JSON.stringify(j); } catch { detail = await resp.text().catch(() => resp.statusText); }
    if (resp.status === 400) throw new Error(`[Storage 400] Неверный запрос. Проверьте название bucket "product-images". Детали: ${detail}`);
    if (resp.status === 401 || resp.status === 403) throw new Error(`[Storage ${resp.status}] Нет прав записи в bucket. Проверьте что bucket "product-images" публичный. Детали: ${detail}`);
    if (resp.status === 404) throw new Error(`[Storage 404] Bucket "product-images" не найден — создайте его в Supabase → Storage.`);
    throw new Error(`[Storage ${resp.status}] ${detail}`);
  }
  return {
    url: `${SUPABASE_URL}/storage/v1/object/public/product-images/${filename}`,
    kb: Math.round(blob.size / 1024)
  };
}

// Шаг: масштабировать до SIZE×SIZE → WebP blob
async function resizeToWebP(blob) {
  let img;
  try {
    img = await createImageBitmap(blob);
  } catch (e) {
    throw new Error(`[Resize] Не удалось декодировать изображение: ${e.message}. Попробуйте другой файл или формат.`);
  }
  const canvas = document.createElement("canvas");
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const scale = Math.min(SIZE / img.width, SIZE / img.height);
  const w = img.width * scale, h = img.height * scale;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  return new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error("[Resize] canvas.toBlob вернул null — браузер не поддерживает WebP?")), "image/webp", 0.88));
}

// Шаг: remove.bg API
async function removeBgApi(blob, apiKey) {
  const form = new FormData();
  form.append("image_file", blob);
  form.append("size", "auto");
  let resp;
  try {
    resp = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: form
    });
  } catch (e) {
    throw new Error(`[remove.bg] Сетевая ошибка: ${e.message}. Проверьте интернет-соединение.`);
  }
  if (!resp.ok) {
    let detail = "";
    try { const j = await resp.json(); detail = j?.errors?.[0]?.title || JSON.stringify(j); } catch { detail = resp.statusText; }
    if (resp.status === 402) throw new Error(`[remove.bg 402] Лимит бесплатных запросов исчерпан. Переключитесь на режим "Без удаления".`);
    if (resp.status === 403) throw new Error(`[remove.bg 403] Неверный API-ключ. Проверьте ключ в настройках ⚙.`);
    throw new Error(`[remove.bg ${resp.status}] ${detail}`);
  }
  return resp.blob();
}

// Шаг: нарисовать blob на 1200×1200 → WebP
async function blobToSizedWebP(blob) {
  let img;
  try { img = await createImageBitmap(blob); }
  catch (e) { throw new Error(`[BlobToWebP] Не удалось прочитать результат remove.bg: ${e.message}`); }
  const canvas = document.createElement("canvas");
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const scale = Math.min(SIZE / img.width, SIZE / img.height);
  const w = img.width * scale, h = img.height * scale;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  return new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error("[BlobToWebP] canvas.toBlob вернул null")), "image/webp", 0.88));
}

// Шаг: загрузить по URL через прокси
async function fetchImageBlob(url) {
  // Проверяем что URL валидный
  try { new URL(url); } catch { throw new Error("[URL] Некорректный URL. Убедитесь что ссылка начинается с https://"); }
  const proxy = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  let resp;
  try {
    resp = await fetch(proxy);
  } catch (e) {
    throw new Error(`[URL] Не удалось подключиться через прокси: ${e.message}. Попробуйте загрузить файлом с компьютера.`);
  }
  if (!resp.ok) {
    if (resp.status === 403) throw new Error(`[URL 403] Сайт запрещает скачивание картинок. Загрузите файлом с компьютера.`);
    if (resp.status === 404) throw new Error(`[URL 404] Изображение не найдено по этому URL.`);
    throw new Error(`[URL ${resp.status}] Ошибка загрузки. Попробуйте загрузить файлом.`);
  }
  const blob = await resp.blob().catch(e => { throw new Error(`[URL] Не удалось прочитать ответ: ${e.message}`); });
  if (!blob.type.startsWith("image/")) throw new Error(`[URL] Ответ не является изображением (тип: ${blob.type}). Попробуйте другую ссылку.`);
  return blob;
}

// ─── ImagePicker ───────────────────────────────────────────────────────────
function ImagePicker({ onDone, removeBgKey }) {
  const [mode, setMode] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [bgMode, setBgMode] = useState("removebg");
  const [status, setStatus] = useState("idle");
  const [steps, setSteps] = useState([]); // лог шагов
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(null);
  const [kb, setKb] = useState(null);
  const fileRef = useRef();

  const log = (msg, state = "active") => setSteps(s => {
    const next = s.map(x => x.state === "active" ? { ...x, state: "done" } : x);
    return [...next, { msg, state }];
  });

  const reset = () => {
    setStatus("idle"); setSteps([]); setErrorMsg(""); setPreview(null); setKb(null);
    setImageUrl("");
    if (fileRef.current) fileRef.current.value = "";
    onDone(null);
  };

  const process = async (getBlob) => {
    setStatus("loading"); setSteps([]); setErrorMsg(""); setPreview(null);
    try {
      log("Загружаю изображение...");
      const srcBlob = await getBlob();
      log(`Изображение получено (${Math.round(srcBlob.size/1024)} КБ, тип: ${srcBlob.type})`);

      let finalWebP;
      if (bgMode === "removebg") {
        if (!removeBgKey?.trim()) throw new Error("[Настройки] Не введён API-ключ remove.bg. Нажмите ⚙ в правом верхнем углу.");
        log("Масштабирую для отправки в remove.bg...");
        const resized = await resizeToWebP(srcBlob);
        log(`Масштабировано (${Math.round(resized.size/1024)} КБ). Отправляю в remove.bg...`);
        const noBgBlob = await removeBgApi(resized, removeBgKey.trim());
        log(`Фон удалён (${Math.round(noBgBlob.size/1024)} КБ). Финальная обработка...`);
        finalWebP = await blobToSizedWebP(noBgBlob);
      } else {
        log("Масштабирую до 1200×1200 WebP...");
        finalWebP = await resizeToWebP(srcBlob);
      }
      log(`Изображение готово (${Math.round(finalWebP.size/1024)} КБ). Загружаю в Storage...`);
      const { url, kb: size } = await uploadToStorage(finalWebP);
      log(`Сохранено в Supabase Storage ✓`, "done");
      setPreview(url); setKb(size); setStatus("done");
      onDone(url);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e.message);
      setSteps(s => s.map((x, i) => i === s.length - 1 ? { ...x, state: "error" } : x));
      onDone(null);
    }
  };

  return (
    <div>
      {/* Переключатели */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", border: "1.5px solid var(--sand)", borderRadius: 8, overflow: "hidden" }}>
          {["url", "file"].map(m => (
            <button key={m} onClick={() => { setMode(m); reset(); }} style={{
              padding: "7px 16px", fontSize: 12, fontWeight: 500,
              background: mode === m ? "var(--deep)" : "white",
              color: mode === m ? "var(--cream)" : "var(--brown)",
              border: "none", cursor: "pointer", fontFamily: "inherit"
            }}>{m === "url" ? "По ссылке" : "С компьютера"}</button>
          ))}
        </div>
        <div style={{ display: "flex", border: "1.5px solid var(--sand)", borderRadius: 8, overflow: "hidden", marginLeft: "auto" }}>
          <button onClick={() => setBgMode("removebg")} style={{
            padding: "7px 12px", fontSize: 11, fontWeight: 500,
            background: bgMode === "removebg" ? "#1D9E75" : "white",
            color: bgMode === "removebg" ? "white" : "var(--brown)",
            border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>remove.bg</button>
          <button onClick={() => setBgMode("nobg")} style={{
            padding: "7px 12px", fontSize: 11, fontWeight: 500,
            background: bgMode === "nobg" ? "var(--brown)" : "white",
            color: bgMode === "nobg" ? "white" : "var(--brown)",
            border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>Без удаления</button>
        </div>
      </div>

      {bgMode === "removebg" && !removeBgKey?.trim() && (
        <div style={{ fontSize: 12, color: "var(--rose)", background: "#fdf0ee", padding: "8px 12px", borderRadius: 8, marginBottom: 10 }}>
          ⚠ Введите API-ключ remove.bg — нажмите ⚙ вверху
        </div>
      )}

      {/* Источник */}
      {status !== "done" && (
        mode === "url" ? (
          <div style={{ display: "flex", gap: 8 }}>
            <input className="form-input" style={{ flex: 1 }} value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://..."
              disabled={status === "loading"}
              onKeyDown={e => e.key === "Enter" && imageUrl.trim() && process(() => fetchImageBlob(imageUrl.trim()))}
            />
            <button className="btn btn-ghost" style={{ flexShrink: 0 }}
              onClick={() => process(() => fetchImageBlob(imageUrl.trim()))}
              disabled={!imageUrl.trim() || status === "loading"}
            >{status === "loading" ? "..." : "Обработать"}</button>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()} style={{
            border: "2px dashed var(--sand)", borderRadius: 10, padding: "18px",
            textAlign: "center", cursor: status === "loading" ? "default" : "pointer", background: "var(--warm)"
          }}
            onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.borderColor = "var(--gold)"; }}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--sand)"}
          >
            <div style={{ fontSize: 22, marginBottom: 5 }}>📁</div>
            <div style={{ fontSize: 13, color: "var(--brown)", fontWeight: 500 }}>
              {status === "loading" ? "Обработка..." : "Нажмите чтобы выбрать файл"}
            </div>
            <div style={{ fontSize: 11, color: "var(--dust)", marginTop: 3 }}>JPG, PNG, WebP</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) process(() => Promise.resolve(f)); }} />
          </div>
        )
      )}

      {/* Лог шагов */}
      {steps.length > 0 && (
        <div style={{ marginTop: 10, background: "var(--warm)", borderRadius: 10, padding: "10px 14px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ fontSize: 12, padding: "3px 0", color: s.state === "error" ? "var(--rose)" : s.state === "done" ? "var(--sage)" : "var(--brown)", display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0 }}>{s.state === "done" ? "✓" : s.state === "error" ? "✕" : "⏳"}</span>
              <span>{s.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Ошибка */}
      {status === "error" && errorMsg && (
        <div style={{ marginTop: 8 }}>
          <div style={{ background: "#fdf0ee", border: "1px solid #e0b0aa", color: "var(--rose)", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 8 }}>
            {errorMsg}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost btn-sm" onClick={reset}>Попробовать снова</button>
            {bgMode === "removebg" && <button className="btn btn-ghost btn-sm" onClick={() => { setBgMode("nobg"); reset(); }}>Попробовать без удаления фона</button>}
            {mode === "url" && <button className="btn btn-ghost btn-sm" onClick={() => { setMode("file"); reset(); }}>Загрузить файлом</button>}
          </div>
        </div>
      )}

      {/* Готово */}
      {status === "done" && preview && (
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "var(--warm)", borderRadius: 10 }}>
          <div style={{ width: 80, height: 80, borderRadius: 8, flexShrink: 0, overflow: "hidden", background: "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 10px 10px" }}>
            <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--sage)" }}>{bgMode === "removebg" ? "✓ Фон удалён" : "✓ Сохранено"}</div>
            <div style={{ fontSize: 11, color: "var(--dust)", marginTop: 3 }}>1200×1200 WebP · {kb} КБ</div>
          </div>
          <button onClick={reset} style={{ background: "none", border: "none", fontSize: 18, color: "var(--dust)", cursor: "pointer", padding: "0 4px" }}>×</button>
        </div>
      )}
    </div>
  );
}

function AddProductModal({ ingredients, onClose, onSaved, removeBgKey }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inciIndex = useMemo(() => buildInciIndex(ingredients), [ingredients]);
  const handlePaste = (val) => { setRawText(val); setParsed(val.trim() ? parseInciList(val) : []); };
  const removeIngredient = (idx) => setParsed(p => p.filter((_, i) => i !== idx));
  const updateIngredient = (idx, val) => setParsed(p => p.map((x, i) => i === idx ? val : x));
  const insertAfter = (idx) => setParsed(p => { const n = [...p]; n.splice(idx + 1, 0, ""); return n; });

  const save = async () => {
    if (!name.trim()) { setError("Введите название средства"); return; }
    setSaving(true); setError("");
    try {
      const [product] = await sbFetch("/products", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), brand: brand.trim() || null, image_url: finalImageUrl || null })
      });
      const inciRows = parsed.filter(r => r.trim());
      if (inciRows.length > 0) {
        const links = inciRows.map((inciName, i) => {
          const m = matchInci(inciName, inciIndex);
          return {
            product_id: product.id, ingredient_id: m?.ing.id || null, position: i + 1,
            raw_inci_name: inciName.trim(), match_source: m?.source || null
          };
        });
        await sbFetch("/product_ingredients", { method: "POST", body: JSON.stringify(links) });
      }
      onSaved();
    } catch (e) {
      setError("Ошибка сохранения: " + e.message);
    } finally { setSaving(false); }
  };

  const realCount = parsed.filter(s => s.trim()).length;
  const matchedCount = useMemo(
    () => parsed.filter(s => s.trim() && matchInci(s, inciIndex)).length,
    [parsed, inciIndex]
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Новое средство</div>
        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label className="form-label">Название *</label>
          <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Например: Пенка Madagascar Centella" />
        </div>
        <div className="form-group">
          <label className="form-label">Бренд</label>
          <input className="form-input" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Например: SKIN1004" />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Изображение</span>
            <span style={{ fontWeight: 400, color: "var(--dust)", textTransform: "none", letterSpacing: 0, fontSize: 11 }}>необязательно — можно добавить позже</span>
          </label>
          <ImagePicker onDone={url => setFinalImageUrl(url)} removeBgKey={removeBgKey} />
        </div>

        <div className="form-group">
          <label className="form-label">Состав (вставьте одним текстом)</label>
          <textarea className="form-input form-textarea" style={{ minHeight: 90, fontFamily: "monospace", fontSize: 12 }}
            value={rawText} onChange={e => handlePaste(e.target.value)}
            placeholder="Centella Asiatica Extract (30%), Glycerin, 1,2-Hexanediol, Aqua..." />
          {realCount > 0 && (
            <div style={{ fontSize: 12, color: "var(--sage)", marginTop: 5 }}>
              ✓ Распознано {realCount} ингредиентов · в справочнике найдено {matchedCount}
              {matchedCount < realCount && <span style={{ color: "var(--dust)" }}> · ненайденные сохранятся текстом</span>}
            </div>
          )}
        </div>

        {parsed.length > 0 && (
          <div className="form-group">
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Список ингредиентов</span>
              <span style={{ fontWeight: 400, color: "var(--dust)", textTransform: "none", letterSpacing: 0, fontSize: 11 }}>+ между строками — вставить новую</span>
            </label>
            <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid var(--sand)", borderRadius: 8, padding: "4px 8px" }}>
              {parsed.map((ing, idx) => {
                const m = ing.trim() ? matchInci(ing, inciIndex) : null;
                return (
                <div key={idx}>
                  <div className="ing-add-row">
                    <span style={{ fontSize: 11, color: "var(--dust)", width: 22, textAlign: "right", flexShrink: 0 }}>{idx + 1}</span>
                    <input className="form-input" style={{ flex: 1, padding: "6px 10px", fontSize: 13, borderColor: ing.trim() ? "" : "var(--rose)" }}
                      value={ing} onChange={e => updateIngredient(idx, e.target.value)} placeholder="Название компонента" />
                    <span title={m ? `Найден в справочнике: ${m.ing.inci_name}${m.ing.ru_name ? ` · ${m.ing.ru_name}` : ""}` : ing.trim() ? "Не найден в справочнике — сохранится текстом" : ""}
                      style={{ width: 16, textAlign: "center", flexShrink: 0, fontSize: 12, cursor: "default", color: m ? "var(--sage)" : "var(--dust)" }}>
                      {m ? "✓" : ing.trim() ? "?" : ""}
                    </span>
                    <button className="ing-remove" onClick={() => removeIngredient(idx)}>×</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "1px 0 1px 28px" }}>
                    <button onClick={() => insertAfter(idx)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--dust)", padding: "0 4px", display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ fontSize: 14 }}>+</span><span>вставить</span>
                    </button>
                    <div style={{ flex: 1, height: "0.5px", background: "var(--warm)" }} />
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="btn btn-ghost" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save} disabled={saving || !name.trim()}>
            {saving ? "Сохранение..." : `Сохранить${realCount > 0 ? ` (${realCount} ингр.)` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddIngredientModal({ onClose, onSaved }) {
  const [inci, setInci] = useState("");
  const [ru, setRu] = useState("");
  const [grp, setGrp] = useState("");
  const [subgroup, setSubgroup] = useState("");
  const [desc, setDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!inci.trim()) { setError("Введите название"); return; }
    setSaving(true);
    setError("");
    try {
      const [created] = await sbFetch("/ingredients", {
        method: "POST",
        body: JSON.stringify({
          inci_name: inci.trim(),
          ru_name: ru.trim() || null,
          description: desc.trim() || null
        })
      });
      if (grp.trim() && created?.id) {
        await sbFetch("/ingredient_groups", {
          method: "POST",
          body: JSON.stringify({
            ingredient_id: created.id,
            group: grp.trim(),
            subgroup: subgroup.trim() || null,
            is_primary: true
          })
        });
      }
      onSaved();
    } catch (e) {
      setError("Ошибка: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Новый ингредиент</div>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label className="form-label">Название *</label>
          <input className="form-input" value={inci} onChange={e => setInci(e.target.value)} placeholder="Например: Aqua" />
        </div>
        <div className="form-group">
          <label className="form-label">Русское название</label>
          <input className="form-input" value={ru} onChange={e => setRu(e.target.value)} placeholder="Например: Вода" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Группа</label>
            <input className="form-input" value={grp} onChange={e => setGrp(e.target.value)} placeholder="Например: Растворители" />
          </div>
          <div className="form-group">
            <label className="form-label">Подгруппа</label>
            <input className="form-input" value={subgroup} onChange={e => setSubgroup(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Описание</label>
          <textarea className="form-input form-textarea" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Краткое описание компонента..." />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="btn btn-ghost" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Сохранение..." : "Сохранить"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── ФОН: КРУПНЫЕ PNG-ЦВЕТЫ + РАЗМЫТЫЕ ФИОЛЕТОВЫЕ АКЦЕНТЫ ───────────────────
// Те же цветы из Bikini Bottom, что на лендинге (вырезаны из спрайта по
// пиксельным маскам), но реже и прозрачнее — контент приложения плотный.
const APP_FLOWER_IMGS = {
  pink: import.meta.env.BASE_URL + "flowers/flower-pink.png",
  blue: import.meta.env.BASE_URL + "flowers/flower-blue.png",
};
const APP_FLOWERS = [
  { img: "pink", hue:   0, size: 560, left: "-11%", top: "-8%", opacity: 0.08, rot:  14, blur: 0 }, // крупный розовый
  { img: "blue", hue: 260, size: 380, left: "86%",  top:  "5%", opacity: 0.07, rot: -22, blur: 0 }, // фиолетовый
  { img: "blue", hue: 140, size: 640, left: "76%",  top: "58%", opacity: 0.06, rot: -10, blur: 8 }, // огромный зелёный, размыт
  { img: "pink", hue:  45, size: 300, left: "-5%",  top: "62%", opacity: 0.06, rot:  28, blur: 5 }, // янтарный, размыт
];
function PetalsBackground() {
  return (
    <div className="flowers-backdrop" aria-hidden="true">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      {APP_FLOWERS.map(({ img, hue, size, left, top, opacity, rot, blur }, i) => (
        <img key={i} src={APP_FLOWER_IMGS[img]} alt="" width={size} height={size}
          style={{
            position: "absolute", left, top, width: size, height: size, opacity,
            objectFit: "contain",
            transform: `rotate(${rot}deg)`,
            filter: `${hue ? `hue-rotate(${hue}deg) saturate(1.15)` : "saturate(1.05)"}${blur ? ` blur(${blur}px)` : ""}`,
          }} />
      ))}
    </div>
  );
}

// ─── ЗАГРУЗОЧНЫЙ ЭКРАН С МАСКОТОМ ────────────────────────────────────────────
function LoadingMascot() {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const faceRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = faceRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      setPupil({ x: clamp((e.clientX - cx) / (window.innerWidth / 2)),
                 y: clamp((e.clientY - cy) / (window.innerHeight / 2)) });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const EYE = { lx: 43.5, ly: 47.5, rx: 58.8, ry: 46.6 };
  const TRAVEL = 4;
  const tx = pupil.x * TRAVEL, ty = pupil.y * TRAVEL;
  const Eye = ({ leftPct, topPct }) => (
    <span className="me-eye" style={{ left: `${leftPct}%`, top: `${topPct}%` }}>
      <span className="me-patch" />
      <span className="me-pupil" style={{ transform: `translate(${tx}px, ${ty}px)` }} />
    </span>
  );

  return (
    <div className="loading-inline">
      <div className="loading-mascot" ref={faceRef}>
        <img src={mascot} alt="" draggable="false" />
        <Eye leftPct={EYE.lx} topPct={EYE.ly} />
        <Eye leftPct={EYE.rx} topPct={EYE.ry} />
      </div>
      <div className="loading-dots">
        <span /><span /><span />
      </div>
    </div>
  );
}

// ─── ЭКРАН ВХОДА — чистый, аккуратный; вход как в рабочем оригинале ───────────
// Менеджер паролей: НЕ оборачиваем в <form>/action и без задержек — поля с
// autoComplete + submit по onClick/Enter (ровно так автозаполнение работало).
// Маскот с глазами, следящими за курсором (общий для входа и регистрации).
// shut — закрыть глаза (например, при вводе пароля).
function MascotFigure({ shut = false }) {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const faceRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = faceRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      setPupil({ x: clamp((e.clientX - cx) / (window.innerWidth / 2)),
                 y: clamp((e.clientY - cy) / (window.innerHeight / 2)) });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // координаты глаз на персонаже (доли, выверены по картинке маскота 1024×1024)
  const EYE = { lx: 43.5, ly: 47.5, rx: 58.8, ry: 46.6 };
  const TRAVEL = 4;
  const tx = pupil.x * TRAVEL, ty = pupil.y * TRAVEL;
  const eye = (leftPct, topPct) => (
    <span className="me-eye" style={{ left: `${leftPct}%`, top: `${topPct}%` }}>
      <span className="me-patch" />
      {shut ? (
        <svg viewBox="0 0 28 16" className="me-closed"><path d="M4 6 Q14 15 24 6" /></svg>
      ) : (
        <span className="me-pupil" style={{ transform: `translate(${tx}px, ${ty}px)` }} />
      )}
    </span>
  );

  return (
    <div className="me-figure" ref={faceRef}>
      <img src={mascot} alt="" draggable="false" />
      {eye(EYE.lx, EYE.ly)}
      {eye(EYE.rx, EYE.ry)}
    </div>
  );
}

function LoginScreen({ onSuccess, onShowRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [shut, setShut] = useState(false);

  const forgotPassword = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Введите почту, и мы отправим ссылку для сброса пароля"); return;
    }
    setBusy(true); setError(""); setInfo("");
    try { await sendRecovery(email.trim()); setInfo("Отправили письмо со ссылкой для сброса пароля"); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  // понятные сообщения вместо технических ответов Supabase
  const humanError = (msg) => {
    const m = (msg || "").toLowerCase();
    if (m.includes("invalid login") || m.includes("invalid") || m.includes("credentials"))
      return "Неверная почта или пароль";
    if (m.includes("email not confirmed") || m.includes("not confirmed"))
      return "Почта не подтверждена. Проверьте письмо со ссылкой";
    if (m.includes("rate") || m.includes("too many") || m.includes("limit"))
      return "Слишком много попыток. Попробуйте чуть позже";
    if (m.includes("network") || m.includes("failed to fetch") || m.includes("fetch"))
      return "Нет соединения. Проверьте интернет";
    if (m.includes("user not found"))
      return "Неверная почта или пароль";
    return msg || "Не удалось войти. Попробуйте ещё раз";
  };

  const validate = () => {
    if (!email.trim()) return "Введите почту";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Проверьте формат почты";
    if (!password) return "Введите пароль";
    return null;
  };

  const submit = async () => {
    const v = validate();
    if (v) { setError(v); return; }
    setBusy(true); setError("");
    try {
      await signIn(email.trim(), password);
      onSuccess();
    } catch (e) {
      setError(humanError(e.message));
    } finally { setBusy(false); }
  };

  const onEnter = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div className="login3-wrap">
      <div className="login3-stage">
        <MascotFigure shut={shut} />

        <div className="login3-card">
          <h1 className="login3-title">beauty <span>helper</span></h1>
          <p className="login3-sub">Войдите, чтобы продолжить</p>

          {error && <div className="login3-error">{error}</div>}
          {info && <div className="login3-info">{info}</div>}

          <div className="login3-field">
            <label className="login3-label" htmlFor="login-email">Почта</label>
            <input id="login-email" className="login3-input" type="email" value={email}
              autoComplete="username" name="username" placeholder="you@example.com"
              onChange={e => { setEmail(e.target.value); if (error) setError(""); }}
              onKeyDown={onEnter} autoFocus />
          </div>
          <div className="login3-field">
            <label className="login3-label" htmlFor="login-password">Пароль</label>
            <input id="login-password" className="login3-input" type="password" value={password}
              autoComplete="current-password" name="password" placeholder="••••••••"
              onChange={e => { setPassword(e.target.value); if (error) setError(""); }}
              onKeyDown={onEnter}
              onFocus={() => setShut(true)} onBlur={() => setShut(false)} />
          </div>
          <button className="login3-btn" onClick={submit} disabled={busy}>
            <span>{busy ? "Заходим…" : "Войти"}</span>
          </button>

          <div className="login3-links">
            <button className="login3-link login3-link-muted" onClick={forgotPassword} disabled={busy}>Забыли пароль?</button>
            {onShowRegister && (
              <div>Нет аккаунта? <button className="login3-link" onClick={onShowRegister}>Зарегистрироваться</button></div>
            )}
            {onBack && (
              <button className="login3-link login3-link-muted" onClick={onBack}>← На главную</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Регистрация: 3 шага (email → код из письма → онбординг), реальный Supabase email-OTP.
// Стиль — боевой login3 (как LoginScreen), функции перенесены из дизайн-прототипа DesignPreview.
function RegisterScreen({ onSuccess, onShowLogin, onBack, onPurchase }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  // согласия: оферта и обработка ПД обязательны, рассылка — по желанию
  const [agreeOffer, setAgreeOffer] = useState(false);
  const [agreePd, setAgreePd] = useState(false);
  const [agreeAds, setAgreeAds] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const humanError = (msg) => {
    const m = (msg || "").toLowerCase();
    if (m.includes("rate") || m.includes("too many") || m.includes("limit") || m.includes("seconds"))
      return "Слишком много попыток. Попробуйте чуть позже";
    if (m.includes("invalid") || m.includes("expired") || m.includes("token"))
      return "Код не подошёл. Проверьте цифры или запросите новый";
    if (m.includes("network") || m.includes("fetch"))
      return "Нет соединения. Проверьте интернет";
    return msg || "Что-то пошло не так. Попробуйте ещё раз";
  };

  const sendCode = async () => {
    if (!name.trim()) { setError("Введите имя"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Проверьте формат почты"); return; }
    if (!agreeOffer) { setError("Для регистрации нужно согласие с условиями Оферты"); return; }
    if (!agreePd) { setError("Для регистрации нужно согласие на обработку персональных данных"); return; }
    setBusy(true); setError("");
    try { await sendOtp(email.trim()); setStep(2); }
    catch (e) { setError(humanError(e.message)); }
    finally { setBusy(false); }
  };

  const verify = async () => {
    if (code.length < 6) { setError("Введите 6 цифр из письма"); return; }
    setBusy(true); setError("");
    try {
      await verifyOtp(email.trim(), code);
      await updateUserProfile({
        name: name.trim(), phone: phone.trim() || null,
        consent_offer: true, consent_pd: true, consent_ads: agreeAds,
        consent_ts: new Date().toISOString(),
      }).catch(() => {});
      setStep(3);
    }
    catch (e) { setError(humanError(e.message)); }
    finally { setBusy(false); }
  };

  const consentLink = (href, text) => (
    <a className="reg-consent-link" href={href} target="_blank" rel="noopener noreferrer">{text}</a>
  );

  const progress = (
    <div className="reg-progress">
      {[1, 2, 3].map(s => <div key={s} className={`reg-progress-seg ${s <= step ? "on" : ""}`} />)}
    </div>
  );

  return (
    <div className="login3-wrap">
      <div className="login3-stage">
        <MascotFigure />

        <div className="login3-card">
          {progress}

          {step === 1 && (
            <>
              <h1 className="login3-title">Создать аккаунт</h1>
              <p className="login3-sub">Бесплатно. Без привязки карты.</p>
              <div className="reg-perks">
                {["7 поисков по базе средств в неделю", "3 анализа своих средств в неделю", "Краткий тест на тип кожи и волос"].map(t => (
                  <div key={t} className="reg-perk"><span className="reg-perk-dot" />{t}</div>
                ))}
              </div>
              {error && <div className="login3-error">{error}</div>}
              <div className="login3-field">
                <label className="login3-label" htmlFor="reg-name">Имя</label>
                <input id="reg-name" className="login3-input" type="text" value={name}
                  autoComplete="given-name" placeholder="Как к вам обращаться?" autoFocus
                  onChange={e => { setName(e.target.value); if (error) setError(""); }}
                  onKeyDown={e => e.key === "Enter" && sendCode()} />
              </div>
              <div className="login3-field">
                <label className="login3-label" htmlFor="reg-email">Почта</label>
                <input id="reg-email" className="login3-input" type="email" value={email}
                  autoComplete="email" placeholder="you@example.com"
                  onChange={e => { setEmail(e.target.value); if (error) setError(""); }}
                  onKeyDown={e => e.key === "Enter" && sendCode()} />
              </div>
              <div className="login3-field">
                <label className="login3-label" htmlFor="reg-phone">Контактный телефон</label>
                <input id="reg-phone" className="login3-input" type="tel" value={phone}
                  autoComplete="tel" placeholder="+7 ___ ___-__-__"
                  onChange={e => { setPhone(e.target.value); if (error) setError(""); }}
                  onKeyDown={e => e.key === "Enter" && sendCode()} />
              </div>

              {/* юр. требование: чекбоксы пустые, отдельные, до кнопки действия */}
              <div className="reg-consents">
                <label className="reg-consent">
                  <input type="checkbox" checked={agreeOffer} onChange={e => { setAgreeOffer(e.target.checked); if (error) setError(""); }} />
                  <span>Согласен с условиями {consentLink(LEGAL.offer, "Оферты")}</span>
                </label>
                <label className="reg-consent">
                  <input type="checkbox" checked={agreePd} onChange={e => { setAgreePd(e.target.checked); if (error) setError(""); }} />
                  <span>Даю {consentLink(LEGAL.pdConsent, "согласие")} на обработку моих персональных данных в соответствии с {consentLink(LEGAL.policy, "Политикой")}</span>
                </label>
                <label className="reg-consent">
                  <input type="checkbox" checked={agreeAds} onChange={e => setAgreeAds(e.target.checked)} />
                  <span>Даю {consentLink(LEGAL.adsConsent, "согласие")} на получение специальных предложений и полезной информации</span>
                </label>
              </div>

              <button className="login3-btn" onClick={sendCode} disabled={busy}>
                <span>{busy ? "Отправляем код…" : "Получить код подтверждения"}</span>
              </button>
              <div className="login3-links">
                <div>Уже есть аккаунт? <button className="login3-link" onClick={onShowLogin}>Войти</button></div>
                {onBack && <button className="login3-link login3-link-muted" onClick={onBack}>← На главную</button>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="login3-title">Проверьте почту</h1>
              <p className="login3-sub">Мы отправили 6-значный код на<br /><b>{email}</b></p>
              {error && <div className="login3-error">{error}</div>}
              <div className="login3-field">
                <label className="login3-label" htmlFor="reg-code">Код из письма</label>
                <input id="reg-code" className="login3-input reg-code-input" type="text" inputMode="numeric"
                  value={code} placeholder="123456" autoFocus
                  onChange={e => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); if (error) setError(""); }}
                  onKeyDown={e => e.key === "Enter" && verify()} />
              </div>
              <button className="login3-btn" onClick={verify} disabled={busy}>
                <span>{busy ? "Проверяем код…" : "Подтвердить"}</span>
              </button>
              <div className="login3-links">
                <div>Не получили письмо? <button className="login3-link" onClick={() => { setStep(1); setCode(""); setError(""); }}>Отправить повторно</button></div>
                <button className="login3-link login3-link-muted" onClick={() => setStep(1)}>← Назад</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="login3-title">{name.trim() ? `${name.trim()}, добро пожаловать!` : "Добро пожаловать!"}</h1>
              <p className="login3-sub">Аккаунт создан. Вам доступно:</p>
              <div className="reg-perks reg-perks-free">
                <div className="reg-perks-head">Доступно сейчас</div>
                {["7 поисков по базе средств в неделю", "3 анализа своих средств в неделю",
                  "Краткий тест на тип кожи и волос", "Справочник 20 000+ ингредиентов", "Сравнение до 2 средств"].map(t => (
                  <div key={t} className="reg-perk"><span className="reg-perk-check">✓</span>{t}</div>
                ))}
              </div>
              <div className="reg-perks reg-perks-pro">
                <div className="reg-perks-head">С подпиской (3 490 ₽/мес)</div>
                {["Безлимитные поиски и анализы составов", "Полный тест + подбор средств под Вас",
                  "Индивидуальные схемы ухода: волосы и лицо", "Дневник прогресса и анализ совместимости"].map(t => (
                  <div key={t} className="reg-perk reg-perk-locked"><span className="reg-perk-lock">⊘</span>{t}</div>
                ))}
              </div>
              <button className="login3-btn" onClick={onSuccess}>
                <span>Начать пользоваться</span>
              </button>
              <button className="reg-btn-outline" onClick={onPurchase}>Оформить подписку</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Плашка согласия на cookie — показывается при первом заходе, до согласия.
// Дата согласия хранится в localStorage устройства; после входа дублируется
// в профиль пользователя (user_metadata) — см. syncCookieConsent.
function CookieConsent() {
  const [shown, setShown] = useState(() => {
    try { return !localStorage.getItem("bh_cookie_consent"); } catch { return true; }
  });
  if (!shown) return null;

  const accept = () => {
    const ts = new Date().toISOString();
    try { localStorage.setItem("bh_cookie_consent", ts); } catch { /* приватный режим */ }
    // залогиненному — сразу в профиль
    if (ACCESS_TOKEN) updateUserProfile({ consent_cookie: ts }).catch(() => {});
    setShown(false);
  };

  return (
    <div className="cookie-bar">
      <div className="cookie-text">
        Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего сайта
        и анализировать сетевой трафик. Продолжая использовать данный сайт, вы{" "}
        <a className="reg-consent-link" href={LEGAL.pdConsent} target="_blank" rel="noopener noreferrer">соглашаетесь</a>{" "}
        на обработку своих персональных данных в соответствии с{" "}
        <a className="reg-consent-link" href={LEGAL.policy} target="_blank" rel="noopener noreferrer">Политикой</a>.
      </div>
      <button className="btn btn-primary btn-sm" onClick={accept}>Принять</button>
    </div>
  );
}

// После входа переносим cookie-согласие с устройства в профиль пользователя,
// чтобы факт согласия был привязан к аккаунту, а не только к браузеру.
function syncCookieConsent() {
  try {
    const ts = localStorage.getItem("bh_cookie_consent");
    if (ts && ACCESS_TOKEN && !CURRENT_USER?.user_metadata?.consent_cookie)
      updateUserProfile({ consent_cookie: ts }).catch(() => {});
  } catch { /* localStorage недоступен */ }
}

// ── Freemium: индикатор использования, paywall и личный кабинет ──
function LkMeter({ label, used, limit }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const over = used >= limit;
  return (
    <div className="lk-meter">
      <div className="lk-meter-top"><span>{label}</span><span className={over ? "over" : ""}>{used} / {limit}</span></div>
      <div className="lk-meter-bar"><div className="lk-meter-fill" style={{ width: `${pct}%`, background: over ? "var(--rose)" : "var(--accent)" }} /></div>
    </div>
  );
}

const PAYWALL_COPY = {
  search:   { title: "Поиск на эту неделю исчерпан", body: `На бесплатном тарифе ${FREE_LIMITS.search} поисков в неделю. С подпиской поиск без ограничений.` },
  analysis: { title: "Анализ средств на эту неделю исчерпан", body: `На бесплатном тарифе ${FREE_LIMITS.analysis} анализа своих средств в неделю. С подпиской ограничений нет.` },
  compare:  { title: "Сравнение до 2 средств", body: "На бесплатном тарифе можно сравнивать 2 средства. С подпиской доступно до 5 и подбор аналогов." },
};

function Paywall({ reason, onClose, onSubscribe }) {
  const c = PAYWALL_COPY[reason] || PAYWALL_COPY.search;
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="paywall-card">
        <div className="paywall-emoji" aria-hidden="true">🦋</div>
        <h3 className="paywall-title">{c.title}</h3>
        <p className="paywall-body">{c.body}</p>
        <ul className="paywall-list">
          <li>Безлимитный поиск и анализ составов</li>
          <li>Полный тест и персональная схема ухода</li>
          <li>Совместимость активов и дневник прогресса</li>
          <li>Сравнение до 5 средств и подбор аналогов</li>
        </ul>
        <button className="btn btn-primary" onClick={onSubscribe}>Оформить подписку</button>
        <button className="paywall-later" onClick={onClose}>Позже</button>
      </div>
    </div>
  );
}

// Личный кабинет: тариф, использование за неделю, данные аккаунта, выход.
function ProfileScreen({ profile, usage, pro, onClose, onSubscribe, onLogout }) {
  const meta = CURRENT_USER?.user_metadata || {};
  const name = meta.name || "";
  const email = CURRENT_USER?.email || "";
  const phone = meta.phone || "";
  const proUntil = profile?.pro_until ? new Date(profile.pro_until).toLocaleDateString("ru-RU") : null;
  return (
    <div className="reg-overlay lk-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lk-card">
        <button className="lk-close" onClick={onClose} aria-label="Закрыть">✕</button>
        <div className="lk-head">
          <div className="lk-ava">{(name[0] || "Я").toUpperCase()}</div>
          <div>
            <div className="lk-name">{name || "Личный кабинет"}</div>
            {email && <div className="lk-email">{email}</div>}
          </div>
        </div>

        <div className={`lk-tariff ${pro ? "pro" : ""}`}>
          <div>
            <div className="lk-tariff-label">Тариф</div>
            <div className="lk-tariff-val">{pro ? "Подписка PRO" : "Бесплатный"}</div>
            {pro && proUntil && <div className="lk-tariff-until">активна до {proUntil}</div>}
          </div>
          {!pro && <button className="btn btn-primary btn-sm" onClick={onSubscribe}>Оформить подписку</button>}
        </div>

        {!pro && (
          <div className="lk-meters">
            <div className="lk-section-label">Использование на этой неделе</div>
            <LkMeter label="Поиск по базе" used={usage.search} limit={FREE_LIMITS.search} />
            <LkMeter label="Анализ своих средств" used={usage.analysis} limit={FREE_LIMITS.analysis} />
            <div className="lk-hint">Лимиты обновляются раз в неделю. С подпиской ограничений нет.</div>
          </div>
        )}

        {(name || email || phone) && (
          <div className="lk-info">
            <div className="lk-section-label">Данные аккаунта</div>
            {name && <div className="lk-row"><span>Имя</span><b>{name}</b></div>}
            {email && <div className="lk-row"><span>Почта</span><b>{email}</b></div>}
            {phone && <div className="lk-row"><span>Телефон</span><b>{phone}</b></div>}
          </div>
        )}

        <div className="lk-docs">
          <a href={LEGAL.offer} target="_blank" rel="noopener noreferrer">Оферта</a>
          <a href={LEGAL.policy} target="_blank" rel="noopener noreferrer">Политика</a>
        </div>
        <button className="lk-logout" onClick={onLogout}>Выйти из аккаунта</button>
      </div>
    </div>
  );
}

// Модал покупки подписки (CloudPayments) — стиль боевых модалок.
// Юр. требование: согласие с Офертой и на обработку ПД — отдельными пустыми
// чекбоксами ДО кнопки «Оплатить», без них оплата невозможна.
function PurchaseModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [agreeOffer, setAgreeOffer] = useState(false);
  const [agreePd, setAgreePd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pay = () => {
    if (!agreeOffer) { setError("Для оплаты нужно согласие с условиями Оферты"); return; }
    if (!agreePd) { setError("Для оплаты нужно согласие на обработку персональных данных"); return; }
    setBusy(true); setError("");
    openPaymentWidget({
      email,
      invoiceId: `bh-${Date.now()}`,
      onSuccess: () => { setBusy(false); onSuccess(); },
      onFail: (reason) => {
        setBusy(false);
        if (reason === "no_public_id") setError("CloudPayments не настроен: добавьте VITE_CLOUDPAYMENTS_PUBLIC_ID в .env");
        else if (reason === "script_not_loaded") setError("Не загрузился виджет оплаты. Обновите страницу");
        else if (reason && reason !== "User has cancelled") setError("Ошибка оплаты. Попробуйте ещё раз");
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="purchase-head">
          <div className="purchase-head-label">Подписка Beauty Helper</div>
          <div className="purchase-head-price">3 490 ₽ <span>/ мес</span></div>
        </div>
        <div className="form-group">
          <label className="form-label">Включено</label>
          {["Персональная схема ухода для лица", "Персональная схема ухода для волос",
            "Анализ совместимости средств", "Неограниченные анализы состава", "Сравнение до 5 средств"].map(t => (
            <div key={t} className="reg-perk"><span className="reg-perk-dot" />{t}</div>
          ))}
        </div>
        <div className="form-group">
          <label className="form-label">Email для чека</label>
          <input className="form-input" type="email" value={email} placeholder="you@example.com"
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="reg-consents" style={{ marginBottom: 12 }}>
          <label className="reg-consent">
            <input type="checkbox" checked={agreeOffer} onChange={e => { setAgreeOffer(e.target.checked); if (error) setError(""); }} />
            <span>Согласен с условиями <a className="reg-consent-link" href={LEGAL.offer} target="_blank" rel="noopener noreferrer">Оферты</a></span>
          </label>
          <label className="reg-consent">
            <input type="checkbox" checked={agreePd} onChange={e => { setAgreePd(e.target.checked); if (error) setError(""); }} />
            <span>Даю <a className="reg-consent-link" href={LEGAL.pdConsent} target="_blank" rel="noopener noreferrer">согласие</a> на обработку моих персональных данных в соответствии с <a className="reg-consent-link" href={LEGAL.policy} target="_blank" rel="noopener noreferrer">Политикой</a></span>
          </label>
        </div>

        {error && <div className="error-msg">{error}</div>}
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={pay} disabled={busy}>
          {busy ? "Открываем оплату…" : "Оплатить 3 490 ₽"}
        </button>
        <div className="purchase-note">Оплата через CloudPayments · Отмена в любой момент</div>
      </div>
    </div>
  );
}

