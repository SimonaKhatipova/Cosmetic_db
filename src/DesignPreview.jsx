/**
 * DESIGN PREVIEW — полный навигационный флоу
 * Ветка: design/home-tab
 * App.jsx НЕ затронут.
 *
 * Запуск: npm run design  →  http://localhost:5174/preview.html
 * Экраны: landing → (login overlay / register modal / purchase modal) → app
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Landing from "./Landing.jsx";
import { openPaymentWidget } from "./lib/cloudpayments.js";

/* ── Дизайн-токены ── */
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
  warn:     "#c98a3a",
  font:     "'Manrope', sans-serif",
  serif:    "'Playfair Display', serif",
};

/* ════════════════════════════════════════
   МОДАЛЬНЫЙ BACKDROP
════════════════════════════════════════ */
function ModalBackdrop({ onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1.5rem",
          background: "rgba(10,24,18,0.48)",
          backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════
   МОДАЛ ВХОДА
════════════════════════════════════════ */
function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1000);
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: "100%", maxWidth: 360,
          background: "linear-gradient(160deg, rgba(245,251,250,0.76), rgba(228,241,237,0.68))",
          border: "1.5px solid rgba(15,107,77,0.28)",
          borderRadius: 22, padding: "36px 28px 28px",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          boxShadow: "0 24px 56px -20px rgba(10,74,53,0.4), 0 1px 0 rgba(255,255,255,0.6) inset",
        }}
      >
        <h2 style={{
          fontFamily: C.serif, fontSize: 26, fontWeight: 700,
          color: C.ink, marginBottom: 4, letterSpacing: "-0.02em", textAlign: "center",
        }}>
          Добро пожаловать
        </h2>
        <p style={{ fontSize: 13, color: C.inkSoft, textAlign: "center", marginBottom: 24 }}>
          Войдите в свой аккаунт
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 10.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%", fontFamily: C.font, fontSize: 15, color: C.ink,
                padding: "11px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.66)",
                border: `1px solid rgba(15,107,77,0.18)`,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 10.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
              Пароль
            </label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%", fontFamily: C.font, fontSize: 15, color: C.ink,
                padding: "11px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.66)",
                border: `1px solid rgba(15,107,77,0.18)`,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: 4, fontFamily: C.font, fontWeight: 600, fontSize: 15,
            padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
            color: "#fff", background: `linear-gradient(135deg, ${C.accentD}, #073828)`,
            boxShadow: "0 9px 22px -8px rgba(10,74,53,0.55)",
            transition: "opacity .15s",
            opacity: loading ? 0.65 : 1,
            position: "relative", overflow: "hidden",
          }}>
            <span style={{ position: "relative", zIndex: 2 }}>
              {loading ? "Входим..." : "Войти"}
            </span>
            <div style={{
              position: "absolute", inset: "-50% -10%", zIndex: 1,
              background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.10) 54%, transparent 62%)",
              backgroundSize: "250% 100%",
              animation: "silkWave 4.5s linear infinite",
            }}/>
          </button>
        </form>

        <div style={{ marginTop: 18, textAlign: "center", fontSize: 13, color: C.inkFaint }}>
          Нет аккаунта?{" "}
          <button onClick={onClose} style={{
            fontFamily: C.font, fontWeight: 700, color: C.accent,
            background: "none", border: "none", cursor: "pointer", fontSize: 13,
          }}>
            Зарегистрироваться
          </button>
        </div>

        <style>{`
          @keyframes silkWave {
            0%   { background-position: 150% 0; }
            100% { background-position: -150% 0; }
          }
        `}</style>
      </motion.div>
    </ModalBackdrop>
  );
}

/* ════════════════════════════════════════
   МОДАЛ РЕГИСТРАЦИИ — мульти-шаговый
   Шаг 1: email
   Шаг 2: код подтверждения
   Шаг 3: онбординг (бесплатный тариф)
════════════════════════════════════════ */
function RegisterModal({ onClose, onSuccess, onSwitchLogin, onPurchase }) {
  const [step, setStep]     = useState(1);
  const [email, setEmail]   = useState("");
  const [code, setCode]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const inputStyle = {
    width: "100%", fontFamily: C.font, fontSize: 15, color: C.ink,
    padding: "11px 14px", borderRadius: 12,
    background: "rgba(255,255,255,0.66)",
    border: `1px solid rgba(15,107,77,0.18)`,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle = {
    fontSize: 10.5, fontWeight: 700, color: C.inkFaint,
    letterSpacing: ".07em", textTransform: "uppercase",
    display: "block", marginBottom: 5,
  };
  const btnPrimary = (disabled) => ({
    width: "100%", fontFamily: C.font, fontWeight: 700, fontSize: 15,
    padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
    color: "#fff", background: `linear-gradient(135deg, ${C.accentD}, #073828)`,
    boxShadow: "0 9px 22px -8px rgba(10,74,53,0.55)",
    opacity: disabled ? 0.65 : 1,
    position: "relative", overflow: "hidden",
  });

  const handleSendCode = (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || !email.includes(".")) {
      setError("Введите корректный email адрес"); return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1100);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");
    if (code.length < 4) { setError("Введите код из письма"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 900);
  };

  const wrapStyle = {
    width: "100%", maxWidth: 400,
    background: "linear-gradient(160deg, rgba(245,251,250,0.76), rgba(228,241,237,0.68))",
    border: "1.5px solid rgba(15,107,77,0.28)",
    borderRadius: 22, padding: "34px 28px 28px",
    backdropFilter: "blur(24px) saturate(150%)",
    WebkitBackdropFilter: "blur(24px) saturate(150%)",
    boxShadow: "0 24px 56px -20px rgba(10,74,53,0.4), 0 1px 0 rgba(255,255,255,0.6) inset",
  };

  /* ── Шаг 1: Email ── */
  if (step === 1) return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        key="step1"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={wrapStyle}
      >
        {/* Прогресс */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? C.accentS : "rgba(60,110,88,0.15)",
              transition: "background .3s",
            }}/>
          ))}
        </div>

        <h2 style={{ fontFamily: C.serif, fontSize: 26, fontWeight: 700, color: C.ink, marginBottom: 4, letterSpacing: "-0.02em", textAlign: "center" }}>
          Создать аккаунт
        </h2>
        <p style={{ fontSize: 13, color: C.inkSoft, textAlign: "center", marginBottom: 20 }}>
          Бесплатно. Без привязки карты.
        </p>

        <div style={{
          background: C.accentBg, border: `1px solid rgba(15,107,77,0.14)`,
          borderRadius: 12, padding: "12px 16px", marginBottom: 22,
          display: "flex", flexDirection: "column", gap: 7,
        }}>
          {["3 анализа состава", "Тест на тип кожи и волос", "Каталог и поиск средств"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.inkSoft }}>
              <div style={{ width: 5, height: 5, borderRadius: 1.5, background: C.accentS, flexShrink: 0 }}/>
              {item}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendCode} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" autoFocus style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ fontSize: 12.5, color: "#a8463d", background: "rgba(192,82,74,0.09)", border: "1px solid rgba(192,82,74,0.22)", borderRadius: 9, padding: "8px 12px" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={btnPrimary(loading)}>
            <span style={{ position: "relative", zIndex: 2 }}>
              {loading ? "Отправляем код..." : "Получить код подтверждения"}
            </span>
            <div style={{
              position: "absolute", inset: "-50% -10%", zIndex: 1,
              background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.10) 54%, transparent 62%)",
              animation: "silkWave 4.5s linear infinite",
            }}/>
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: C.inkFaint }}>
          Уже есть аккаунт?{" "}
          <button onClick={onSwitchLogin || onClose} style={{ fontFamily: C.font, fontWeight: 700, color: C.accent, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
            Войти
          </button>
        </div>
      </motion.div>
    </ModalBackdrop>
  );

  /* ── Шаг 2: Код подтверждения ── */
  if (step === 2) return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        key="step2"
        initial={{ opacity: 0, x: 30, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={wrapStyle}
      >
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? C.accentS : "rgba(60,110,88,0.15)",
            }}/>
          ))}
        </div>

        <button onClick={() => setStep(1)} style={{
          fontFamily: C.font, fontSize: 12, color: C.inkFaint,
          background: "none", border: "none", cursor: "pointer",
          marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 5,
        }}>
          ← Назад
        </button>

        <h2 style={{ fontFamily: C.serif, fontSize: 24, fontWeight: 700, color: C.ink, marginBottom: 8, letterSpacing: "-0.02em", textAlign: "center" }}>
          Проверьте почту
        </h2>
        <p style={{ fontSize: 13, color: C.inkSoft, textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>
          Мы отправили 6-значный код на<br />
          <span style={{ fontWeight: 700, color: C.ink }}>{email}</span>
        </p>

        <form onSubmit={handleVerifyCode} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Код из письма</label>
            <input
              type="text" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456" autoFocus
              style={{
                ...inputStyle,
                fontSize: 22, letterSpacing: ".35em", textAlign: "center",
                fontWeight: 700,
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: 12.5, color: "#a8463d", background: "rgba(192,82,74,0.09)", border: "1px solid rgba(192,82,74,0.22)", borderRadius: 9, padding: "8px 12px" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={btnPrimary(loading)}>
            <span style={{ position: "relative", zIndex: 2 }}>
              {loading ? "Проверяем код..." : "Подтвердить"}
            </span>
            <div style={{
              position: "absolute", inset: "-50% -10%", zIndex: 1,
              background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.10) 54%, transparent 62%)",
              animation: "silkWave 4.5s linear infinite",
            }}/>
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12.5, color: C.inkFaint }}>
          Не получили письмо?{" "}
          <button
            onClick={() => { setStep(1); setCode(""); setError(""); }}
            style={{ fontFamily: C.font, fontWeight: 700, color: C.accent, background: "none", border: "none", cursor: "pointer", fontSize: 12.5 }}
          >
            Отправить повторно
          </button>
        </div>
      </motion.div>
    </ModalBackdrop>
  );

  /* ── Шаг 3: Онбординг (бесплатный тариф) ── */
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        key="step3"
        initial={{ opacity: 0, x: 30, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{ ...wrapStyle, maxWidth: 440 }}
      >
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: C.accentS }}/>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, margin: "0 auto 14px",
            background: `linear-gradient(135deg, ${C.accentD}, ${C.accentS})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Familjen Grotesk', sans-serif",
            fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em",
          }}>BH</div>
          <h2 style={{ fontFamily: C.serif, fontSize: 24, fontWeight: 700, color: C.ink, marginBottom: 4, letterSpacing: "-0.02em" }}>
            Добро пожаловать!
          </h2>
          <p style={{ fontSize: 13, color: C.inkSoft }}>Аккаунт создан. Вам доступно:</p>
        </div>

        {/* Доступно бесплатно */}
        <div style={{
          background: C.accentBg, border: `1px solid rgba(15,107,77,0.14)`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 12,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.accentS, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
            Доступно сейчас
          </div>
          {[
            "Каталог средств и поиск по базе",
            "Справочник 20 000+ ингредиентов",
            "3 анализа состава (INCI-разбор)",
            "Тест на тип кожи и волос",
            "Сравнение до 2 средств",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.inkSoft, marginBottom: 7 }}>
              <div style={{ width: 16, height: 16, borderRadius: 5, background: C.accentS, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: "#fff", fontWeight: 800 }}>✓</span>
              </div>
              {item}
            </div>
          ))}
        </div>

        {/* Доступно с подпиской */}
        <div style={{
          background: "rgba(255,255,255,0.44)", border: `1px solid ${C.line}`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
            С подпиской (3 490 ₽/мес)
          </div>
          {[
            "Индивидуальная схема ухода для волос",
            "Индивидуальная схема ухода для лица",
            "Анализ совместимости средств",
            "Неограниченные анализы состава",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.inkFaint, marginBottom: 7, opacity: 0.7 }}>
              <div style={{ width: 16, height: 16, borderRadius: 5, border: `1.5px solid rgba(60,110,88,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: C.inkFaint }}>⊘</span>
              </div>
              {item}
            </div>
          ))}
        </div>

        {/* Кнопки */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <button onClick={onSuccess} style={btnPrimary(false)}>
            <span style={{ position: "relative", zIndex: 2 }}>Начать пользоваться</span>
            <div style={{
              position: "absolute", inset: "-50% -10%", zIndex: 1,
              background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.10) 54%, transparent 62%)",
              animation: "silkWave 4.5s linear infinite",
            }}/>
          </button>
          <button onClick={() => { onSuccess(); onPurchase && onPurchase(); }} style={{
            width: "100%", fontFamily: C.font, fontWeight: 600, fontSize: 14,
            padding: "12px", borderRadius: 12, cursor: "pointer",
            background: "transparent", color: C.accent,
            border: `1.5px solid ${C.accent}`,
          }}>
            Оформить подписку
          </button>
        </div>
      </motion.div>
    </ModalBackdrop>
  );
}

/* ════════════════════════════════════════
   МОДАЛ ПОКУПКИ (CloudPayments)
════════════════════════════════════════ */
function PurchaseModal({ onClose, onSuccess }) {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const handlePay = () => {
    setLoading(true);
    setError("");
    openPaymentWidget({
      email,
      invoiceId: `bh-${Date.now()}`,
      onSuccess: (opts) => {
        setLoading(false);
        onSuccess(opts);
      },
      onFail: (reason) => {
        setLoading(false);
        if (reason === "no_public_id") {
          setError("CloudPayments не настроен: добавьте VITE_CLOUDPAYMENTS_PUBLIC_ID в .env");
        } else if (reason && reason !== "User has cancelled") {
          setError("Ошибка оплаты. Попробуйте ещё раз.");
        }
      },
    });
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: "100%", maxWidth: 400,
          background: "linear-gradient(160deg, rgba(245,251,250,0.76), rgba(228,241,237,0.68))",
          border: "1.5px solid rgba(15,107,77,0.28)",
          borderRadius: 22, padding: "32px 28px 28px",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          boxShadow: "0 24px 56px -20px rgba(10,74,53,0.4), 0 1px 0 rgba(255,255,255,0.6) inset",
        }}
      >
        {/* Шапка */}
        <div style={{
          background: `linear-gradient(135deg, rgba(10,74,53,0.9), rgba(15,107,77,0.95))`,
          borderRadius: 16, padding: "22px 24px", marginBottom: 20,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30, width: 120, height: 120,
            borderRadius: "50%", background: "rgba(42,155,115,0.25)", filter: "blur(30px)",
          }}/>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
              Подписка Beauty Helper
            </div>
            <div style={{ fontFamily: C.serif, fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              3 490 ₽ <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.6 }}>/ мес</span>
            </div>
          </div>
        </div>

        {/* Что включено */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
            Включено
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              "Персональная схема ухода для лица",
              "Персональная схема ухода для волос",
              "Анализ совместимости средств",
              "Неограниченные анализы состава",
              "Сравнение до 5 средств",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: C.inkSoft }}>
                <div style={{ width: 5, height: 5, borderRadius: 1.5, background: C.accentS, flexShrink: 0 }}/>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 10.5, fontWeight: 700, color: C.inkFaint, letterSpacing: ".07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
            Email для чека
          </label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%", fontFamily: C.font, fontSize: 14, color: C.ink,
              padding: "10px 14px", borderRadius: 11,
              background: "rgba(255,255,255,0.66)",
              border: `1px solid rgba(15,107,77,0.18)`,
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Ошибка */}
        {error && (
          <div style={{
            background: "rgba(192,82,74,0.1)", color: "#a8463d",
            border: "1px solid rgba(192,82,74,0.28)",
            borderRadius: 10, padding: "9px 12px", fontSize: 12.5,
            marginBottom: 12, textAlign: "center",
          }}>{error}</div>
        )}

        {/* Кнопка оплаты через CloudPayments */}
        <button onClick={handlePay} disabled={loading} style={{
          width: "100%", fontFamily: C.font, fontWeight: 700, fontSize: 15,
          padding: "14px", borderRadius: 13, border: "none", cursor: "pointer",
          color: "#fff", background: `linear-gradient(135deg, ${C.accentD}, #073828)`,
          boxShadow: "0 9px 22px -8px rgba(10,74,53,0.55)",
          opacity: loading ? 0.65 : 1,
          position: "relative", overflow: "hidden",
        }}>
          <span style={{ position: "relative", zIndex: 2 }}>
            {loading ? "Открываем оплату..." : "Оплатить 3 490 ₽"}
          </span>
          <div style={{
            position: "absolute", inset: "-50% -10%", zIndex: 1,
            background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.10) 54%, transparent 62%)",
            backgroundSize: "250% 100%",
            animation: "silkWave 4.5s linear infinite",
          }}/>
        </button>

        <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, color: C.inkFaint }}>
          Оплата через CloudPayments · Отмена в любой момент
        </div>
      </motion.div>
    </ModalBackdrop>
  );
}

/* ════════════════════════════════════════
   APP — ШАПКА (аналог App.jsx)
════════════════════════════════════════ */
function AppTopbar({ onLogout }) {
  const [tab, setTab] = useState("home");
  return (
    <>
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        height: 56, display: "flex", alignItems: "center",
        padding: "0 clamp(1rem,4vw,2.4rem)", gap: 14,
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 4px 20px rgba(80,60,110,0.10)",
        overflow: "hidden",
        background: `
          radial-gradient(46% 120% at 16% 32%, #b98fd6 0%, transparent 56%),
          radial-gradient(42% 130% at 42% 70%, #6fa8d8 0%, transparent 52%),
          radial-gradient(48% 120% at 60% 35%, #0f6b4d 0%, transparent 56%),
          radial-gradient(44% 120% at 80% 68%, #2ea579 0%, transparent 54%),
          linear-gradient(110deg, #a78fd6, #2ea579 45%, #0f6b4d 65%, #7fb0d8 85%, #d68fbf)
        `,
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.5))" }}/>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 11 }}>
          <div>
            <div style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1530", letterSpacing: "-0.025em" }}>
              Beauty Helper
            </div>
            <div style={{ fontSize: 9, color: "#5a4d72", textTransform: "uppercase", letterSpacing: ".13em", fontWeight: 700 }}>
              by Simona
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}/>
        <button onClick={onLogout} style={{
          position: "relative", fontFamily: C.font, fontWeight: 600, fontSize: 13,
          padding: "8px 16px", borderRadius: 10, border: `1px solid rgba(15,107,77,0.3)`,
          cursor: "pointer", background: "rgba(255,255,255,0.5)", color: C.inkSoft,
        }}>
          Выйти
        </button>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.4)",
        borderBottom: `1px solid ${C.glassBd}`,
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        position: "sticky", top: 56, zIndex: 99,
      }}>
        <div style={{
          display: "flex", gap: 4,
          padding: "0 clamp(1rem,4vw,2.5rem)",
          maxWidth: 1180, margin: "0 auto",
        }}>
          {[
            ["home",        "Главная"],
            ["products",    "Средства"],
            ["ingredients", "Ингредиенты"],
            ["compare",     "Сравнение"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              fontFamily: C.font, fontWeight: 600, fontSize: 14,
              padding: "16px 20px", border: "none", cursor: "pointer",
              background: "transparent",
              color: tab === id ? C.accent : C.inkFaint,
              borderBottom: `2px solid ${tab === id ? C.accent : "transparent"}`,
              transition: "all .2s",
            }}>{label}</button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Заглушка вкладки приложения ── */
function AppPlaceholder() {
  return (
    <div style={{
      maxWidth: 1180, margin: "0 auto",
      padding: "60px clamp(1rem,4vw,2.5rem) 80px",
      fontFamily: C.font,
    }}>
      <div style={{
        background: C.glass, border: `1px solid ${C.glassBd}`,
        borderRadius: 20, padding: "48px 40px",
        backdropFilter: "blur(12px)", boxShadow: C.shadowSm,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: C.serif, fontSize: 28, fontWeight: 600,
          color: C.ink, marginBottom: 12, letterSpacing: "-0.02em",
        }}>
          Вы вошли в аккаунт
        </div>
        <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.65, maxWidth: 480, margin: "0 auto 28px" }}>
          Это превью рабочего приложения. Полный функционал — в основном билде{" "}
          <code style={{ fontSize: 12, background: C.accentBg, padding: "2px 6px", borderRadius: 5 }}>npm run dev</code>.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {["Средства", "Ингредиенты", "Сравнение", "Аналоги"].map(label => (
            <div key={label} style={{
              padding: "8px 18px", borderRadius: 10,
              background: C.accentBg, border: `1px solid rgba(15,107,77,0.18)`,
              fontSize: 13, fontWeight: 600, color: C.accent,
            }}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT — управление экранами
════════════════════════════════════════ */
export default function DesignPreview() {
  // screen: 'landing' | 'app'
  const [screen, setScreen] = useState("landing");
  // modal:  null | 'login' | 'register' | 'purchase' | 'success'
  const [modal, setModal]   = useState(null);

  const handleLogin    = () => { setScreen("app"); setModal("login"); };
  const handleRegister = () => setModal("register");
  const handlePurchase = () => setModal("purchase");
  const closeModal     = () => setModal(null);

  const handleLoginSuccess = () => { setScreen("app"); setModal(null); };
  const handleRegSuccess   = () => { setScreen("app"); setModal(null); };
  const handleBuySuccess   = () => { setScreen("app"); setModal("success"); setTimeout(() => setModal(null), 2000); };
  const handleLogout       = () => { setScreen("landing"); setModal(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&display=swap');
        :root { color-scheme: light; }
        html, body { background: #eef2ef; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: 'Manrope', sans-serif; }
        input  { font-family: 'Manrope', sans-serif; }
        ::placeholder { color: #74897f; }
        @keyframes silkWave {
          0%   { background-position: 150% 0; }
          100% { background-position: -150% 0; }
        }
      `}</style>

      {/* ── Экраны ── */}
      {/* При наличии модала — мгновенный переход (без анимации), чтобы за логином был виден фон приложения */}
      {screen === "landing" && !modal ? (
        <motion.div key="landing"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Landing
            onLogin={handleLogin}
            onRegister={handleRegister}
            onPurchase={handlePurchase}
          />
        </motion.div>
      ) : (
        <div
          style={{
            minHeight: "100vh", fontFamily: C.font,
            colorScheme: "light",
            background: `
              radial-gradient(1100px 560px at 8% -12%, #e7eee9 0%, transparent 55%),
              radial-gradient(900px 480px at 102% -4%, #e0e9e3 0%, transparent 52%),
              linear-gradient(165deg, #eef2ef 0%, #dfe8e1 60%, #d6e1da 100%)
            `,
            backgroundAttachment: "fixed",
          }}
        >
          <AppTopbar onLogout={handleLogout} />
          <AppPlaceholder />
        </div>
      )}

      {/* ── Модалы (поверх любого экрана) ── */}
      {modal === "login"    && <LoginModal    onClose={closeModal} onSuccess={handleLoginSuccess} />}
      {modal === "register" && <RegisterModal onClose={closeModal} onSuccess={handleRegSuccess} />}
      {modal === "purchase" && <PurchaseModal onClose={closeModal} onSuccess={handleBuySuccess} />}

      {/* Тост успеха покупки */}
      <AnimatePresence>
        {modal === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            style={{
              position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
              zIndex: 600, background: C.accentD, color: "#fff",
              fontFamily: C.font, fontWeight: 600, fontSize: 14,
              padding: "14px 28px", borderRadius: 14,
              boxShadow: "0 8px 28px rgba(10,74,53,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Подписка оформлена
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
