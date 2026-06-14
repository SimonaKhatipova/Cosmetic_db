import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LEGAL } from "./legal.js";

/* ── Дизайн-токены (те же что в App.jsx) ── */
const C = {
  bg:       "#eef2ef",
  glass:    "rgba(255,253,250,0.72)",
  glassBd:  "rgba(255,255,255,0.72)",
  ink:      "#16241d",
  inkSoft:  "#3f534a",
  inkFaint: "#74897f",
  accent:   "#0f6b4d",
  accentD:  "#0a4a35",
  accentS:  "#2a9b73",
  accentBg: "rgba(15,107,77,0.08)",
  line:     "rgba(60,110,88,0.15)",
  shadow:   "0 8px 32px rgba(15,75,55,0.14)",
  shadowSm: "0 2px 14px rgba(15,75,55,0.09)",
  rose:     "#c17b8a",
  font:     "'Manrope', sans-serif",
  serif:    "'Playfair Display', serif",
};

const labelStyle = {
  fontSize: 11, fontWeight: 700, color: C.inkFaint,
  letterSpacing: ".12em", textTransform: "uppercase",
  display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
};

/* Название сервиса в тексте — фирменный шрифт и цвет, как в шапке */
function Brand() {
  return (
    <span style={{
      fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700,
      color: C.accent, letterSpacing: "-0.02em", whiteSpace: "nowrap",
    }}>Beauty Helper</span>
  );
}

function SectionLabel({ children, color }) {
  return (
    <div style={{ ...labelStyle, color: color || C.inkFaint }}>
      <span style={{ display: "block", width: 20, height: 1.5, background: color || C.inkFaint, opacity: .5 }}/>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   BIKINI BOTTOM FLOWERS — реальные PNG с alpha
════════════════════════════════════════ */
// Цветы вырезаны из спрайта по пиксельным маскам (без постороннего объекта):
// flower-pink.png и flower-blue.png. Меньше штук, крупнее, часть — гигантские
// и заблюренные; при наведении курсора медленно уплывают от него, как на воде.
const FLOWER_IMGS = {
  pink: `${import.meta.env.BASE_URL}flowers/flower-pink.png`,
  blue: `${import.meta.env.BASE_URL}flowers/flower-blue.png`,
};
const BG_FLOWERS = [
  { img: "pink", hue:   0, size: 740, left: "-13%", top: "-9%", opacity: 0.15, rot:  12, blur: 0 },  // гигантский розовый
  { img: "blue", hue:   0, size: 430, left: "81%",  top:  "3%", opacity: 0.14, rot: -18, blur: 0 },  // голубой
  { img: "pink", hue: 255, size: 300, left: "57%",  top: "36%", opacity: 0.12, rot:  30, blur: 5 },  // фиолетовый, размыт
  { img: "blue", hue: 140, size: 860, left: "60%",  top: "56%", opacity: 0.11, rot:  -8, blur: 9 },  // гигантский зелёный, размыт
  { img: "pink", hue:  45, size: 350, left: "5%",   top: "54%", opacity: 0.12, rot: -16, blur: 0 },  // янтарный
  { img: "blue", hue: 235, size: 250, left: "30%",  top: "82%", opacity: 0.10, rot:  24, blur: 7 },  // сиреневый, размыт
];

function FlowersBg() {
  const refs = useRef([]);

  useEffect(() => {
    let raf;
    const cur = BG_FLOWERS.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));
    const onMove = (e) => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (r.left + r.width / 2) - e.clientX;
        const dy = (r.top + r.height / 2) - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - dist / 520); // ближе курсор — сильнее «волна»
        cur[i].tx = (dx / dist) * influence * 64;
        cur[i].ty = (dy / dist) * influence * 64;
      });
    };
    const tick = () => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const c = cur[i];
        c.x += (c.tx - c.x) * 0.018; // очень медленно, как по воде
        c.y += (c.ty - c.y) * 0.018;
        el.style.transform = `translate(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px) rotate(${BG_FLOWERS[i].rot}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* размытые фиолетовые акценты — глубина и настроение */}
      <div style={{ position: "absolute", left: "-8%", top: "22%", width: 620, height: 620, borderRadius: "50%", background: "rgba(155,125,180,0.16)", filter: "blur(100px)" }} />
      <div style={{ position: "absolute", left: "68%", top: "-8%", width: 460, height: 460, borderRadius: "50%", background: "rgba(155,125,180,0.12)", filter: "blur(95px)" }} />
      <div style={{ position: "absolute", left: "38%", top: "66%", width: 520, height: 520, borderRadius: "50%", background: "rgba(139,99,184,0.10)", filter: "blur(110px)" }} />
      {BG_FLOWERS.map(({ img, hue, size, left, top, opacity, rot, blur }, i) => (
        <div key={i} ref={el => { refs.current[i] = el; }} style={{
          position: "absolute", left, top,
          width: size, height: size, opacity,
          transform: `rotate(${rot}deg)`,
          willChange: "transform",
        }}>
          <img
            src={FLOWER_IMGS[img]}
            width={size} height={size}
            alt=""
            style={{
              display: "block", width: "100%", height: "100%", objectFit: "contain",
              filter: `${hue ? `hue-rotate(${hue}deg) saturate(1.2)` : "saturate(1.08)"}${blur ? ` blur(${blur}px)` : ""}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   NAVBAR — лаконичное стеклянное меню (только Beauty Helper)
════════════════════════════════════════ */
function Navbar({ onLogin, onRegister, onPricing }) {
  const goHome = () => { window.location.hash = ""; window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <nav className="lp-nav">
      <div className="lp-brand" onClick={goHome}>Beauty Helper</div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="lp-nav-btn lp-pricing-link" onClick={onPricing}>Тарифы</button>
        <button className="lp-nav-btn lp-login" onClick={onLogin}>Войти</button>
        <button className="lp-nav-btn lp-try" onClick={onRegister}>Попробовать</button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════
   ДАННЫЕ КАТАЛОГА С ИНИЦИАЛАМИ
════════════════════════════════════════ */
const CATALOG_A = [
  { name: "CeraVe Cleanser",      type: "Очищение",      bg: "#edf4f0", init: "CV" },
  { name: "The Ordinary Niac.",   type: "Сыворотка",     bg: "#f0edf4", init: "TO" },
  { name: "La Roche-Posay SPF",   type: "Защита",        bg: "#edf0f4", init: "LR" },
  { name: "Bioderma Sensibio",    type: "Мицеллярная",   bg: "#f4edf0", init: "BD" },
  { name: "Kiehl's Ultra Facial", type: "Увлажнение",    bg: "#edf4ed", init: "KH" },
  { name: "Paula's Choice BHA",   type: "Кислоты",       bg: "#f4f0ed", init: "PC" },
  { name: "Drunk Elephant C-F",   type: "Антиоксид.",    bg: "#ededf4", init: "DE" },
];
const CATALOG_B = [
  { name: "Olaplex No.3",         type: "Восстановление",bg: "#edf4f4", init: "OL" },
  { name: "Davines NOUNOU",       type: "Шампунь",       bg: "#f4eded", init: "DV" },
  { name: "Redken All Soft",      type: "Маска",         bg: "#eef4ed", init: "RK" },
  { name: "Moroccanoil",          type: "Масло",         bg: "#f4f4ed", init: "MO" },
  { name: "Wella Fusion 9+",      type: "Протеин",       bg: "#ededf4", init: "WL" },
  { name: "Kerastase Elixir",     type: "Масло",         bg: "#f4edf4", init: "KS" },
  { name: "L'Oreal Absolut",      type: "Маска",         bg: "#edf4ee", init: "LO" },
];

/* ── Карточка каталога с флаконом ── */
function MiniCard({ name, type, bg, init }) {
  return (
    <div style={{
      flexShrink: 0, width: 148, borderRadius: 12,
      background: bg, border: "1px solid rgba(255,255,255,0.88)",
      padding: "9px 12px 10px",
      boxShadow: "0 2px 8px rgba(15,75,55,0.07)",
    }}>
      <div style={{ fontSize: 8.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 7 }}>
        {type}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        {/* Флакон средства */}
        <div style={{ position: "relative", width: 34, height: 50, flexShrink: 0 }}>
          {/* Крышка */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 16, height: 10, borderRadius: "4px 4px 2px 2px",
            background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.06)",
          }}/>
          {/* Горлышко */}
          <div style={{
            position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)",
            width: 12, height: 5,
            background: "rgba(255,255,255,0.82)", border: "1px solid rgba(0,0,0,0.05)",
            borderBottom: "none",
          }}/>
          {/* Тело */}
          <div style={{
            position: "absolute", top: 13, left: 0, right: 0, bottom: 0,
            borderRadius: "7px 7px 10px 10px",
            background: "rgba(255,255,255,0.82)", border: "1px solid rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: "rgba(0,0,0,0.25)", letterSpacing: ".02em" }}>{init}</span>
          </div>
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 600, color: C.ink, lineHeight: 1.25 }}>{name}</div>
      </div>
    </div>
  );
}

/* ── Шаги ухода (Утро/Вечер) ── */
function CareSteps({ label, steps, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, width: 40, flexShrink: 0, letterSpacing: ".04em" }}>
        {label}
      </div>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{
            fontSize: 10.5, color: C.inkSoft, fontWeight: 500,
            background: "rgba(255,255,255,0.72)", border: `1px solid ${C.line}`,
            padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap",
          }}>{s}</div>
          {i < steps.length - 1 && (
            <div style={{ fontSize: 9, color: C.inkFaint, flexShrink: 0 }}>→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Шкала восстановления волос: зелёные сегменты-батарейка ──
   Заполняются слева направо, неделя за неделей (10 сегментов = 10 недель).
   Метафора: уход постепенно преображает волосы. ── */
const RECOVERY_STEPS = [
  { seg: 1,  text: "1-я неделя: заметно меньше ломкости" },
  { seg: 3,  text: "3-я неделя: волосы мягче на ощупь" },
  { seg: 5,  text: "5-я неделя: меньше жирности у корней" },
  { seg: 7,  text: "7-я неделя: объём и лёгкость" },
  { seg: 9,  text: "9-я неделя: желаемый результат близко" },
  { seg: 10, text: "10-я неделя: цель достигнута!" },
];

function HairRecoveryBar() {
  const TOTAL = 10;
  const [filled, setFilled] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setFilled(f => (f >= TOTAL ? 0 : f + 1));
    }, 1000); // 10 сегментов × 1 сек = 10 сек цикл
    return () => clearInterval(t);
  }, []);

  const msg = [...RECOVERY_STEPS].reverse().find(s => filled >= s.seg)?.text ?? "Начинаем программу ухода...";

  return (
    <div style={{
      background: C.glass, border: `1px solid ${C.glassBd}`,
      borderRadius: 14, padding: "13px 17px",
      backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase" }}>
          Восстановление волос
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: filled >= TOTAL ? C.accentS : C.inkSoft }}>
          {filled * 10}%
        </span>
      </div>
      {/* Сегменты-батарейка: заполняются слева направо, неделя за неделей */}
      <div style={{ display: "flex", gap: 3.5, marginBottom: 9 }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 9, borderRadius: 2.5,
            background: i < filled
              ? `linear-gradient(90deg, ${C.accentS}, ${C.accent})`
              : "rgba(42,155,115,0.11)",
            transition: "background 0.35s ease",
            boxShadow: i < filled ? "0 1px 4px rgba(15,107,77,0.18)" : "none",
          }}/>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: C.inkSoft, fontStyle: "italic" }}>{msg}</div>
    </div>
  );
}

/* ── Мини-предпросмотр сравнения ── */
function ComparisonMini() {
  const products = [
    { init: "RB", bg: "#edf4f0" },
    { init: "AE", bg: "#f0edf4" },
    { init: "HH", bg: "#edf0f4" },
    { init: "IS", bg: "#f4edf0" },
  ];
  const rows = [
    { label: "Безопасн.", values: ["100", "100", "100", "100"], accent: true },
    { label: "Ингред.",   values: ["46",  "32",  "26",  "30"]  },
    { label: "Совпад.",   values: ["база","37%", "5%",  "36%"] },
  ];

  return (
    <div style={{
      background: C.glass, border: `1px solid ${C.glassBd}`,
      borderRadius: 16, padding: "13px 15px",
      backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
    }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
        Сравнение средств
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 9 }}>
        {products.map(({ init, bg }) => (
          <div key={init} style={{
            flex: 1, height: 32, borderRadius: 9, background: bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700, color: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.85)",
          }}>{init}</div>
        ))}
      </div>
      {rows.map(({ label, values, accent }) => (
        <div key={label} style={{
          display: "flex", alignItems: "center", paddingBottom: 5, marginBottom: 5,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <div style={{ width: 56, fontSize: 9.5, color: C.inkFaint, flexShrink: 0 }}>{label}</div>
          {values.map((v, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              fontSize: 10, fontWeight: 700,
              color: accent ? C.accentS : (v === "база" ? C.inkFaint : C.inkSoft),
            }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Шкала безопасности + Супер состав ── */
function SafetyBadge() {
  return (
    <div style={{
      background: C.glass, border: `1px solid ${C.glassBd}`,
      borderRadius: 16, padding: "13px 15px",
      backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
    }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
        Состав
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", background: C.accentS,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: "#fff" }}>100</span>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accentS, marginBottom: 2 }}>Высокая</div>
          <div style={{ fontSize: 10, color: C.inkFaint }}>безопасность</div>
        </div>
      </div>
      {/* значимые для пользователя флаги состава */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {[
          { text: "Супер состав",            bg: "rgba(42,155,115,0.10)", bd: "rgba(42,155,115,0.22)", color: C.accent,   dot: C.accentS },
          { text: "Рекомендовано",           bg: "rgba(42,155,115,0.05)", bd: "rgba(42,155,115,0.20)", color: C.accent,   dot: C.accentS },
          { text: "Потенциальный аллерген",  bg: "rgba(201,138,58,0.10)", bd: "rgba(201,138,58,0.30)", color: "#9a6a24",  dot: "#c98a3a" },
        ].map(({ text, bg, bd, color, dot }) => (
          <div key={text} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: bg, border: `1px solid ${bd}`,
            borderRadius: 8, padding: "4px 9px",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: 1.5, background: dot }}/>
            <span style={{ fontSize: 9.5, fontWeight: 700, color, letterSpacing: ".03em" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
function Hero({ onRegister, onScrollPricing }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "flex-start",
      padding: "clamp(88px, 15vw, 112px) clamp(1.5rem, 6vw, 4rem) clamp(48px, 8vw, 80px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* фоновые градиентные пятна */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(860px 520px at 85% 15%, rgba(42,155,115,0.09) 0%, transparent 60%),
          radial-gradient(640px 400px at 5% 85%,  rgba(15,107,77,0.06) 0%, transparent 60%)
        `,
      }}/>

      <div className="lp-hero-grid" style={{
        maxWidth: 1440, margin: "0 auto", width: "100%",
        display: "grid", gridTemplateColumns: "1fr minmax(400px, 560px)",
        gap: "clamp(40px, 5vw, 80px)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Левая колонка ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          style={{ paddingTop: 12 }}
        >
          <div style={{ ...labelStyle, color: C.accentS }}>
            <span style={{ display: "block", width: 24, height: 1.5, background: C.accentS }}/>
            Инструмент для осознанного ухода
          </div>

          <h1 style={{
            fontFamily: C.serif,
            fontSize: "clamp(3rem, 6.2vw, 6.6rem)",
            fontWeight: 700, fontStyle: "italic",
            color: C.ink, lineHeight: 1.05,
            letterSpacing: "-0.022em", marginBottom: 30,
          }}>
            Почему ваша<br />косметика<br />не работает?
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.1vw, 24px)", color: C.inkSoft,
            lineHeight: 1.68, maxWidth: 620, marginBottom: 44,
          }}>
            Подходит ли Вам Ваш шампунь? Как пользоваться этой дорогущей маской,
            чтобы результат был виден? Сочетаются ли активы в любимых средствах?
            Давайте разбираться вместе с <Brand />.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
            <button onClick={onRegister} style={{
              fontFamily: C.font, fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 19px)",
              padding: "18px 38px", borderRadius: 14, border: "none", cursor: "pointer",
              background: C.accentD, color: "#fff",
              boxShadow: "0 6px 24px rgba(10,74,53,0.32)",
              letterSpacing: "-0.01em",
            }}>
              Попробовать бесплатно
            </button>
            <button onClick={onScrollPricing} style={{
              fontFamily: C.font, fontWeight: 600, fontSize: "clamp(16px, 1.5vw, 19px)",
              padding: "18px 36px", borderRadius: 14, cursor: "pointer",
              background: C.glass, color: C.inkSoft,
              border: `1px solid ${C.glassBd}`,
              backdropFilter: "blur(10px)",
            }}>
              Оплатить подписку
            </button>
          </div>

          {/* Статистика — цифры читаются хорошо */}
          <div className="lp-stats" style={{
            display: "flex", gap: 0, flexWrap: "wrap",
            paddingTop: 30, borderTop: `1px solid ${C.line}`,
          }}>
            {[
              { value: "20 000+", label: "ингредиентов в базе" },
              { value: "1 200+",  label: "средств в каталоге" },
              { value: "20+",     label: "типов средств" },
              { value: "100%",    label: "составов на русском" },
            ].map(({ value, label }, i, arr) => (
              <div key={label} className="lp-stat" style={{
                paddingRight: 28, marginRight: 28,
                borderRight: i < arr.length - 1 ? `1px solid ${C.line}` : "none",
              }}>
                <div style={{
                  fontSize: "clamp(24px, 2.4vw, 34px)", fontWeight: 800, color: C.accent,
                  letterSpacing: "-0.03em",
                }}>{value}</div>
                <div style={{ fontSize: 12.5, color: C.inkFaint, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Правая колонка ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {/* 1. Анимированный каталог */}
          <div style={{
            borderRadius: 18, overflow: "hidden",
            border: `1px solid ${C.glassBd}`,
            background: C.glass,
            backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            boxShadow: C.shadowSm,
          }}>
            <div style={{
              padding: "10px 16px", display: "flex", alignItems: "center", gap: 7,
              borderBottom: `1px solid ${C.line}`,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: 2, background: C.accentS,
                animation: "cpulse 1.6s ease-in-out infinite",
              }}/>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase" }}>
                Подбор средств
              </span>
              <span style={{ fontSize: 10, color: C.accentS, fontWeight: 600 }}>· идёт анализ</span>
            </div>
            <div style={{ overflow: "hidden", padding: "9px 0 5px" }}>
              <div style={{
                display: "flex", gap: 7, paddingLeft: 12,
                animation: "scrollLeft 20s linear infinite", width: "max-content",
              }}>
                {[...CATALOG_A, ...CATALOG_A].map((item, i) => <MiniCard key={i} {...item} />)}
              </div>
            </div>
            <div style={{ overflow: "hidden", padding: "0 0 9px" }}>
              <div style={{
                display: "flex", gap: 7, paddingLeft: 12,
                animation: "scrollRight 24s linear infinite", width: "max-content",
              }}>
                {[...CATALOG_B, ...CATALOG_B].map((item, i) => <MiniCard key={i} {...item} />)}
              </div>
            </div>
          </div>

          {/* 2. Уход для волос - ПРИОРИТЕТ */}
          <div style={{
            background: C.glass, border: `1px solid ${C.glassBd}`,
            borderRadius: 18, padding: "16px 18px",
            backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            boxShadow: C.shadow,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase" }}>
                Индивидуальный уход для волос
              </div>
              <div style={{
                fontSize: 9, fontWeight: 800, letterSpacing: ".05em",
                background: C.accentD, color: "#fff",
                padding: "2px 8px", borderRadius: 100,
              }}>ПОДПИСКА</div>
            </div>

            {/* Профиль пользователя */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 11px", borderRadius: 9, marginBottom: 14,
              background: "rgba(42,155,115,0.07)", border: `1px solid rgba(42,155,115,0.14)`,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accentS, flexShrink: 0 }}/>
              <span style={{ fontSize: 10.5, color: C.inkSoft }}>
                Тонкие волосы · склонность к жирности у корней
              </span>
            </div>

            {/* Шаги ухода */}
            {[
              { n: 1, step: "Глубокое очищение", product: "Раз в неделю, по Вашим индивидуальным показаниям" },
              { n: 2, step: "Очищение",          product: "Шампунь, подобранный под Ваш тип кожи головы" },
              { n: 3, step: "Уход",              product: "Смываемые средства: красота волос и восстановление повреждений" },
              { n: 4, step: "Защита",            product: "Несмываемый финиш для защиты от окружающей среды" },
            ].map(({ n, step, product }, i, arr) => (
              <div key={n} style={{
                display: "flex", alignItems: "flex-start", gap: 11,
                paddingBottom: i < arr.length - 1 ? 11 : 0,
                marginBottom: i < arr.length - 1 ? 11 : 0,
                borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                  background: C.accentBg, border: `1px solid rgba(15,107,77,0.14)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: C.accent,
                }}>{n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.ink, marginBottom: 1 }}>{step}</div>
                  <div style={{ fontSize: 10.5, color: C.inkSoft }}>{product}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Шкала безопасности + Сравнение рядом */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 10 }}>
            <SafetyBadge />
            <ComparisonMini />
          </div>

          {/* 4. Уход для лица */}
          <div style={{
            background: C.glass, border: `1px solid ${C.glassBd}`,
            borderRadius: 16, padding: "14px 16px",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            boxShadow: C.shadowSm,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase" }}>
                Схема ухода для лица
              </div>
              <div style={{
                fontSize: 9, fontWeight: 800, letterSpacing: ".05em",
                background: C.accentD, color: "#fff",
                padding: "2px 8px", borderRadius: 100,
              }}>ПОДПИСКА</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <CareSteps label="Утро"  steps={["Очищение", "Активы", "Увлажнение и барьер", "Защита от солнца"]} color={C.accentS} />
              <CareSteps label="Вечер" steps={["Демакияж", "Очищение", "Активы", "Увлажнение и барьер"]} color="#9b7db4" />
            </div>
          </div>

          {/* 5. Шкала восстановления волос: метаморфоз гусенички */}
          <HairRecoveryBar />
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   ПРОБЛЕМЫ
════════════════════════════════════════ */
function Problems() {
  const pains = [
    {
      n: "01",
      title: "Купили средство, результата нет",
      desc: <>Баночки выбираются по чужим советам и красивой упаковке. Кожа и волосы остаются прежними. <Brand /> подбирает уход под Ваш тип и Вашу задачу, чтобы каждая покупка приближала к цели.</>,
    },
    {
      n: "02",
      title: "Состав читается как шифр",
      desc: <>Aqua, Phenoxyethanol, Niacinamide. Сложно понять, где польза и где лишний раздражитель. Мы переводим каждый ингредиент на простой русский: что он делает, кому подходит, на что обратить внимание.</>,
    },
    {
      n: "03",
      title: "Советы из интернета Вам не подходят",
      desc: <>То, что помогло блогеру, Вам может навредить: другая кожа, другие задачи, несочетаемые активы. <Brand /> опирается на Ваш профиль и Ваши средства и собирает уход лично под Вас.</>,
    },
  ];

  return (
    <section style={{
      padding: "clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)",
      background: "rgba(255,255,255,0.28)",
      borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Знакомо?</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          fontWeight: 600, color: C.ink, marginBottom: 14, letterSpacing: "-0.02em",
        }}>
          Три причины, почему уход не работает
        </h2>
        <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.65, marginBottom: 48, maxWidth: 640 }}>
          Чаще всего выбор косметики идёт вслепую. Вот что обычно мешает увидеть
          результат и как с этим помогает <Brand />.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {pains.map(({ n, title, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: C.glass, border: `1px solid ${C.glassBd}`,
                borderRadius: 20, padding: "28px",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                boxShadow: C.shadowSm,
              }}
            >
              <div style={{
                fontFamily: C.serif, fontSize: 52, fontWeight: 700,
                color: C.accent, opacity: 0.14, lineHeight: 1, marginBottom: 14,
                letterSpacing: "-0.02em",
              }}>{n}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 10, letterSpacing: "-0.015em" }}>
                {title}
              </div>
              <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.68, margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   РЕШЕНИЕ
════════════════════════════════════════ */
function Solution() {
  const features = [
    { label: "20 000+ ингредиентов",         detail: "с расшифровкой на русском" },
    { label: "Тест на тип кожи и волос",      detail: "персонализированный старт" },
    { label: "Индивидуальная схема ухода",    detail: "что покупать и в какой последовательности" },
    { label: "Анализ совместимости",          detail: "ингредиентов в Ваших средствах" },
  ];

  const wash  = ["Пилинг кожи головы", "Шампунь под Ваш тип кожи головы", "Комплексная маска", "Поверхностный кондиционер"];
  const treat = ["Термозащита под Вашу рутину укладки", "Масло как финишный продукт"];

  return (
    <section style={{ padding: "clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(40px, 7vw, 88px)", alignItems: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <SectionLabel>Наше решение</SectionLabel>
          <h2 style={{
            fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 600, fontStyle: "italic", color: C.ink,
            marginBottom: 20, letterSpacing: "-0.022em", lineHeight: 1.14,
          }}>
            Ваш личный<br />эксперт по косметике
          </h2>
          <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.72, marginBottom: 32 }}>
            Расшифруйте любой состав, узнайте о совместимости ингредиентов
            и получите готовую схему ухода лично для Вас.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {features.map(({ label, detail }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 18px", borderRadius: 12,
                background: C.glass, border: `1px solid ${C.glassBd}`,
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, flexShrink: 0, background: C.accent }}/>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{label}</span>
                  <span style={{ fontSize: 13, color: C.inkFaint, marginLeft: 8 }}>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}
        >
          <div style={{
            background: C.glass, border: `1px solid ${C.glassBd}`,
            borderRadius: 20, padding: "28px",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            boxShadow: C.shadow,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.inkFaint, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 22 }}>
              Ваша схема ухода для волос
            </div>

            {[
              { label: "Мытьё и уход", items: wash },
              { label: "Укладка и защита", items: treat },
            ].map(({ label, items }, gi) => (
              <div key={label} style={{ marginBottom: gi === 0 ? 22 : 0 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: C.accentS,
                  letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10,
                }}>{label}</div>
                {items.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "9px 0",
                    borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                      background: C.accentBg, border: `1px solid ${C.line}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: C.accent,
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: C.inkSoft }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* отдельная рутина для кудрявых */}
            <div style={{
              marginTop: 18, padding: "12px 14px", borderRadius: 12,
              background: "rgba(155,125,180,0.09)", border: "1px solid rgba(155,125,180,0.24)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7b5da0", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>
                + Рутина для кудряшек
              </div>
              <div style={{ fontSize: 12.5, color: C.inkSoft, lineHeight: 1.55 }}>
                Отдельная программа, которая раскрывает потенциал натуральной
                красоты Ваших кудрявых волос.
              </div>
            </div>

            <div style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.line}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 12, color: C.inkFaint }}>Подобрано под Ваш тип волос</span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: C.accent,
                background: C.accentBg, padding: "3px 10px", borderRadius: 100,
                border: `1px solid rgba(15,107,77,0.18)`,
              }}>Подписка</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   КАК ЭТО РАБОТАЕТ
════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Расскажите о себе",
      desc: "Полный профессиональный тест: тип кожи и волос, их состояние, привычки, цели и беспокойства. Чем точнее профиль, тем точнее подбор средств под Ваши индивидуальные особенности.",
    },
    {
      n: "2",
      title: "Проанализируйте свой арсенал",
      desc: "Проверьте всё, что уже стоит на Вашей полке: уход для волос, для лица и даже декоративную косметику. Узнаете, что действительно работает на Вас, а что стоит заменить.",
    },
    {
      n: "3",
      title: "Идите к цели по схеме",
      desc: "Получите индивидуальную схему ухода, ведите дневник прогресса и двигайтесь к своим бьюти-целям вместе с нами: чувствовать себя счастливой, красивой, здоровой и уверенной.",
    },
  ];

  return (
    <section style={{
      padding: "clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)",
      background: "rgba(255,255,255,0.22)",
      borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Как это работает</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          fontWeight: 600, color: C.ink, marginBottom: 60, letterSpacing: "-0.02em",
        }}>
          Три шага до результата
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, position: "relative" }}>
          <div style={{
            position: "absolute", top: 44, left: "17%", right: "17%", height: 1,
            background: `linear-gradient(90deg, transparent, ${C.line} 15%, ${C.line} 85%, transparent)`,
            zIndex: 0,
          }}/>

          {steps.map(({ n, title, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.14 }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <div style={{
                width: 88, height: 88, borderRadius: 22, marginBottom: 24,
                background: C.glass, border: `1px solid ${C.glassBd}`,
                backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: C.serif, fontSize: 34, fontWeight: 700,
                  color: C.accent, letterSpacing: "-0.02em",
                }}>{n}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 10, letterSpacing: "-0.015em" }}>
                {title}
              </div>
              <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.68, margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   ОТЗЫВЫ
════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    {
      text: "Годами казалось, что уход просто «не работает». Оказалось, средства спорили друг с другом. Со схемой появился результат, который видно в зеркале.",
      name: "Полина С.",
      detail: "Уход не давал результата",
    },
    {
      text: "После осветления волосы были как солома. Подобрали восстановление по составам, и через два месяца они снова мягкие и блестят.",
      name: "Катя В.",
      detail: "Окрашенные волосы",
    },
    {
      text: "Перепробовала кучу «аптечных» шампуней от перхоти. Здесь объяснили, какие компоненты мне нужны, и проблема ушла, больше не возвращается.",
      name: "Мария Т.",
      detail: "Перхоть и чувствительная кожа головы",
    },
    {
      text: "Длина наконец выглядит здоровой: волосы не пушатся и не электризуются. А я всего лишь убрала из рутины то, что мне не подходило.",
      name: "Алина Р.",
      detail: "Пушистость и электризация",
    },
    {
      text: "Раньше покупала банки хаотично, по рекламе. Теперь у меня ясные этапы ухода и список того, что докупать. Трачу меньше, а эффект лучше.",
      name: "Дарья К.",
      detail: "Хаотичный уход и лишние траты",
    },
    {
      text: "Тест на тип кожи расставил всё по местам: крем больше не жирнит, активы не конфликтуют. Кожа спокойная впервые за долгое время.",
      name: "Софья Л.",
      detail: "Комбинированная кожа, 28 лет",
    },
  ];

  return (
    <section style={{ padding: "clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Отзывы</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          fontWeight: 600, color: C.ink, marginBottom: 48, letterSpacing: "-0.02em",
        }}>
          Что говорят пользователи
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {reviews.map(({ text, name, detail }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: C.glass, border: `1px solid ${C.glassBd}`,
                borderRadius: 20, padding: "28px",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                boxShadow: C.shadowSm,
              }}
            >
              <div style={{
                fontFamily: C.serif, fontSize: 72, fontWeight: 700,
                color: C.accent, opacity: 0.18, lineHeight: 0.8, marginBottom: 18,
                userSelect: "none",
              }}>"</div>
              <p style={{
                fontSize: 14, color: C.inkSoft, lineHeight: 1.72,
                marginBottom: 24, fontStyle: "italic",
              }}>
                {text}
              </p>
              <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{name}</div>
                <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 3 }}>{detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   ТАРИФЫ
════════════════════════════════════════ */
function PricingSection({ onRegister, onPurchase }) {
  const freeFeatures = [
    "7 поисков по базе средств в неделю",
    "3 анализа своих средств в неделю (которых нет в базе)",
    "Краткий тест на тип кожи и волос",
    "Справочник 20 000+ ингредиентов",
    "Сравнение до 2 средств",
  ];
  const proFeatures = [
    "Безлимитные поиски и анализы составов",
    "Полный профессиональный тест + подбор средств под Вас",
    "Индивидуальные схемы ухода: волосы и лицо",
    "Анализ совместимости Ваших средств",
    "Дневник прогресса и движение к целям вместе с нами",
    "Сравнение до 5 средств и подбор аналогов",
    "Отдельная рутина для кудрявых волос",
  ];

  return (
    <section style={{
      padding: "clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)",
      background: "rgba(255,255,255,0.22)",
      borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
    }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionLabel>Тарифы</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          fontWeight: 600, color: C.ink, marginBottom: 10, letterSpacing: "-0.02em",
        }}>
          Начните бесплатно
        </h2>
        <p style={{ fontSize: 16, color: C.inkSoft, marginBottom: 44, lineHeight: 1.6 }}>
          Базовые функции бесплатны и доступны навсегда. Подписка добавляет полный
          тест, индивидуальные схемы ухода, безлимитные анализы и сопровождение к цели.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Бесплатный */}
          <div style={{
            background: C.glass, border: `1px solid ${C.glassBd}`,
            borderRadius: 22, padding: "32px",
            backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>
              Бесплатно
            </div>
            <div style={{ fontFamily: C.serif, fontSize: 42, fontWeight: 700, color: C.ink, marginBottom: 4, letterSpacing: "-0.02em" }}>
              0 ₽
            </div>
            <div style={{ fontSize: 13, color: C.inkFaint, marginBottom: 28 }}>навсегда</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {freeFeatures.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.inkSoft }}>
                  <div style={{ width: 5, height: 5, borderRadius: 1.5, background: C.accentS, flexShrink: 0 }}/>
                  {item}
                </div>
              ))}
            </div>

            <button onClick={onRegister} style={{
              width: "100%", fontFamily: C.font, fontWeight: 700, fontSize: 14,
              padding: "13px", borderRadius: 13, cursor: "pointer",
              background: "transparent", color: C.accent,
              border: `1.5px solid ${C.accent}`,
            }}>
              Начать бесплатно
            </button>
          </div>

          {/* Подписка */}
          <div style={{
            background: `linear-gradient(145deg, rgba(10,74,53,0.92), rgba(15,107,77,0.97))`,
            borderRadius: 22, padding: "32px",
            boxShadow: "0 16px 48px rgba(10,74,53,0.3)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -50, right: -50,
              width: 200, height: 200, borderRadius: "50%",
              background: "rgba(42,155,115,0.22)", filter: "blur(44px)",
              pointerEvents: "none",
            }}/>

            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  Подписка
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: ".06em",
                  background: "rgba(255,255,255,0.18)", color: "#fff",
                  padding: "2px 9px", borderRadius: 100,
                }}>ПОПУЛЯРНОЕ</div>
              </div>
              <div style={{ fontFamily: C.serif, fontSize: 42, fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: "-0.02em" }}>
                3 490 ₽
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>в месяц</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {proFeatures.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                    <div style={{ width: 5, height: 5, borderRadius: 1.5, background: "rgba(255,255,255,0.55)", flexShrink: 0 }}/>
                    {item}
                  </div>
                ))}
              </div>

              <button onClick={onPurchase} style={{
                width: "100%", fontFamily: C.font, fontWeight: 700, fontSize: 14,
                padding: "13px", borderRadius: 13, border: "none", cursor: "pointer",
                background: "#fff", color: C.accentD,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}>
                Оформить подписку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CTA
════════════════════════════════════════ */
function CTASection({ onRegister }) {
  const [email, setEmail] = useState("");

  return (
    <section style={{ padding: "clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Начните сейчас</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 600, fontStyle: "italic", color: C.ink,
          marginBottom: 16, letterSpacing: "-0.022em", lineHeight: 1.18,
        }}>
          Разберитесь в уходе<br />раз и навсегда
        </h2>
        <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.7, marginBottom: 36 }}>
          Создайте аккаунт и получите бесплатный доступ: поиск по базе средств,
          анализы своих средств и тест на тип кожи и волос.
        </p>

        <div style={{
          display: "flex", gap: 8,
          background: C.glass, border: `1px solid ${C.glassBd}`,
          borderRadius: 16, padding: 6,
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          boxShadow: C.shadow,
        }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Ваш email"
            style={{
              flex: 1, fontFamily: C.font, fontSize: 14, color: C.ink,
              border: "none", background: "transparent", outline: "none",
              padding: "10px 14px",
            }}
          />
          <button onClick={onRegister} style={{
            fontFamily: C.font, fontWeight: 700, fontSize: 14,
            padding: "10px 22px", borderRadius: 11, border: "none", cursor: "pointer",
            background: C.accentD, color: "#fff",
            boxShadow: "0 4px 14px rgba(10,74,53,0.28)",
            whiteSpace: "nowrap",
          }}>
            Попробовать бесплатно
          </button>
        </div>
        <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 14 }}>
          Без привязки карты. Отмена в любой момент.
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
function Footer({ onLogin, onPricing }) {
  const docLink = { fontSize: 12, color: C.inkFaint, textDecoration: "underline", textUnderlineOffset: 2 };
  const navLink = { fontSize: 13, color: C.inkSoft, cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: C.font };
  const head = { fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: C.inkFaint, marginBottom: 12 };
  return (
    <footer style={{
      padding: "44px clamp(1.5rem, 6vw, 4rem) 30px",
      borderTop: `1px solid ${C.line}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", flexWrap: "wrap", gap: 32,
      }}>
        <div style={{ maxWidth: 240 }}>
          <div style={{
            fontFamily: "'Familjen Grotesk', sans-serif",
            fontWeight: 700, fontSize: 17, color: C.ink, letterSpacing: "-0.028em",
            marginBottom: 6,
          }}>
            Beauty Helper
          </div>
          <div style={{ fontSize: 12.5, color: C.inkFaint, lineHeight: 1.6 }}>Помогаем разобраться в составах и собрать уход, который работает.</div>
          <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 8 }}>by Simona · 2026</div>
        </div>

        {/* навигация */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={head}>Разделы</div>
          <button onClick={onPricing} style={navLink}>Тарифы</button>
          <button onClick={onLogin} style={navLink}>Войти</button>
        </div>

        {/* юридические документы */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={head}>Документы</div>
          <a href={LEGAL.offer} target="_blank" rel="noopener noreferrer" style={docLink}>Оферта</a>
          <a href={LEGAL.policy} target="_blank" rel="noopener noreferrer" style={docLink}>Политика обработки ПД</a>
          <a href={LEGAL.pdConsent} target="_blank" rel="noopener noreferrer" style={docLink}>Согласие на обработку ПД</a>
          <a href={LEGAL.adsConsent} target="_blank" rel="noopener noreferrer" style={docLink}>Согласие на рассылку</a>
        </div>

        {/* реквизиты */}
        <div style={{ fontSize: 12, color: C.inkFaint, lineHeight: 1.8 }}>
          <div style={head}>Реквизиты</div>
          <div>{LEGAL.ownerName}</div>
          <div>ИНН {LEGAL.ownerInn}</div>
          <a href={`mailto:${LEGAL.ownerEmail}`} style={{ color: C.inkFaint }}>{LEGAL.ownerEmail}</a>
          <div style={{ marginTop: 12 }}>
            <button onClick={onLogin} style={{
              fontFamily: C.font, fontWeight: 700, fontSize: 13,
              padding: "8px 18px", borderRadius: 9, cursor: "pointer",
              background: C.accentBg, color: C.accent, border: `1.5px solid ${C.accent}`,
            }}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   ЭКСПОРТ
════════════════════════════════════════ */
export default function Landing({ onLogin, onRegister, onPurchase }) {
  const pricingRef = useRef(null);
  const scrollToPricing = () => pricingRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{
      minHeight: "100vh", fontFamily: C.font,
      colorScheme: "light",
      background: `
        radial-gradient(1100px 560px at 8%   -12%, #e7eee9 0%, transparent 55%),
        radial-gradient(900px  480px at 102%  -4%, #e0e9e3 0%, transparent 52%),
        linear-gradient(165deg, #eef2ef 0%, #dfe8e1 60%, #d6e1da 100%)
      `,
      backgroundAttachment: "fixed",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        /* фон-цветы декоративны; гасим горизонтальный скролл на мобайле */
        html, body { overflow-x: hidden; max-width: 100%; }
        button { font-family: 'Manrope', sans-serif; }
        input  { font-family: 'Manrope', sans-serif; }
        ::placeholder { color: #74897f; }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes cpulse {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50%       { opacity: 1;    transform: scale(1.2);  }
        }
        /* ── Лаконичное стеклянное меню ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 60px; display: flex; align-items: center;
          padding: 0 clamp(1rem, 5vw, 4rem);
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(22px) saturate(160%); -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 4px 24px rgba(15,75,55,0.06);
        }
        .lp-brand {
          font-family: 'Familjen Grotesk', sans-serif; font-weight: 700;
          font-size: clamp(17px, 2.2vw, 20px); color: ${C.ink};
          letter-spacing: -0.028em; cursor: pointer;
        }
        .lp-nav-btn { font-family: ${C.font}; font-weight: 700; font-size: 14px; border-radius: 10px; cursor: pointer; white-space: nowrap; border: none; }
        .lp-pricing-link { padding: 9px 14px; background: transparent; color: ${C.inkSoft}; }
        .lp-pricing-link:hover { color: ${C.accent}; }
        .lp-login { padding: 9px 18px; background: ${C.accentBg}; color: ${C.accent}; border: 1.5px solid ${C.accent}; }
        .lp-try { padding: 9px 18px; background: ${C.accentD}; color: #fff; box-shadow: 0 4px 14px rgba(10,74,53,0.28); }
        @media (max-width: 600px) {
          .lp-nav { height: 56px; }
          .lp-pricing-link { display: none; }
          .lp-nav-btn { font-size: 13px; }
          .lp-login, .lp-try { padding: 8px 14px; }
        }
        @media (max-width: 360px) {
          .lp-login, .lp-try { padding: 7px 11px; font-size: 12.5px; }
        }
        /* Hero: две колонки на десктопе, стопка на мобайле (иначе горизонтальный скролл) */
        @media (max-width: 860px) {
          .lp-hero-grid { grid-template-columns: 1fr !important; }
          .lp-hero-grid > * { min-width: 0; }
        }
        /* Метрики: 4 в ряд на десктопе, 2×2 на мобайле */
        @media (max-width: 520px) {
          .lp-stats { gap: 20px 0 !important; }
          .lp-stat { flex: 0 0 50% !important; padding-right: 0 !important; margin-right: 0 !important; border-right: none !important; }
        }
      `}</style>

      <FlowersBg />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar onLogin={onLogin} onRegister={onRegister} onPricing={scrollToPricing} />
        <Hero onRegister={onRegister} onScrollPricing={scrollToPricing} />
        <Problems />
        <Solution />
        <HowItWorks />
        <Testimonials />
        <div ref={pricingRef}>
          <PricingSection onRegister={onRegister} onPurchase={onPurchase} />
        </div>
        <CTASection onRegister={onRegister} />
        <Footer onLogin={onLogin} onPricing={scrollToPricing} />
      </div>
    </div>
  );
}
