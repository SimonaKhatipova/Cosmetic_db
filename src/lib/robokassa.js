/**
 * Робокасса — инициация оплаты подписки.
 *
 * Никаких секретов на фронтенде нет: вызываем Edge Function `robokassa-pay`
 * (она подписывает платёж Паролем №1 на сервере) и редиректим пользователя
 * на страницу оплаты Робокассы. После оплаты Робокасса вернёт пользователя
 * на Success/Fail URL (настраиваются в кабинете), а сервер подтвердит платёж
 * через Result URL → функцию `robokassa-result`.
 */

const SUPABASE_URL = "https://lcvszvxbszszqikboxeq.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE";

/**
 * Создаёт платёж и перенаправляет на оплату Робокассы.
 * @param {object} opts
 * @param {string}   opts.accessToken — JWT вошедшего пользователя (обязательно)
 * @param {string}   [opts.email]     — email для чека
 * @param {function} [opts.onError]   — колбэк ошибки (string)
 */
export async function startSubscription({ accessToken, email = "", onError } = {}) {
  if (!accessToken) { onError?.("not_authenticated"); return; }
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/robokassa-pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON,
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      onError?.(res.status === 404 ? "function_not_deployed" : (txt || "pay_init_failed"));
      return;
    }
    const data = await res.json();
    if (!data?.url) { onError?.("no_url"); return; }
    window.location.href = data.url; // уходим на оплату Робокассы
  } catch (e) {
    onError?.(String(e?.message || e));
  }
}
