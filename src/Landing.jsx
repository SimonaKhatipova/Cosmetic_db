import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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
function FlowersBg() {
  // hue — CSS hue-rotate в градусах; 0 = исходный розовый
  const flowers = [
    { hue:   0, size: 460, left: "-8%",  top:  "1%",  opacity: 0.12, rot:  18 }, // розовый
    { hue: 260, size: 340, left: "78%",  top:  "0%",  opacity: 0.11, rot: -22 }, // фиолетовый
    { hue: 195, size: 540, left: "63%",  top: "27%",  opacity: 0.09, rot:  35 }, // синий
    { hue: 125, size: 270, left:  "4%",  top: "37%",  opacity: 0.11, rot: -12 }, // зелёный
    { hue: 175, size: 420, left: "82%",  top: "61%",  opacity: 0.10, rot:  28 }, // бирюзовый
    { hue:  55, size: 310, left: "30%",  top: "73%",  opacity: 0.09, rot:  -8 }, // жёлтый
    { hue: 330, size: 230, left: "49%",  top:  "9%",  opacity: 0.10, rot:  44 }, // алый
    { hue: 235, size: 190, left: "17%",  top: "84%",  opacity: 0.09, rot: -30 }, // синe-сиреневый
    { hue: 145, size: 380, left: "-4%",  top: "61%",  opacity: 0.08, rot:  10 }, // сочный зелёный
    { hue:  15, size: 160, left: "60%",  top: "55%",  opacity: 0.09, rot: -18 }, // оранжевый
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {flowers.map(({ hue, size, left, top, opacity, rot }, i) => (
        <div key={i} style={{
          position: "absolute", left, top,
          width: size, height: size,
          opacity,
          transform: `rotate(${rot}deg)`,
        }}>
          <img
            src="/flowers/flower.png"
            width={size} height={size}
            alt=""
            style={{
              display: "block", width: "100%", height: "100%",
              filter: hue !== 0 ? `hue-rotate(${hue}deg) saturate(1.2)` : "saturate(1.1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function Navbar({ onLogin, onRegister, onScrollPricing }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, display: "flex", alignItems: "center",
      padding: "0 clamp(1.5rem, 6vw, 4rem)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      background: "rgba(238,242,239,0.90)",
      borderBottom: "1px solid rgba(255,255,255,0.45)",
      boxShadow: "0 2px 16px rgba(15,75,55,0.06)",
    }}>
      <div style={{
        fontFamily: "'Familjen Grotesk', sans-serif",
        fontWeight: 700, fontSize: 19, color: C.ink, letterSpacing: "-0.028em",
      }}>
        Beauty Helper
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={onScrollPricing} style={{
          fontFamily: C.font, fontWeight: 600, fontSize: 14,
          padding: "9px 16px", borderRadius: 10, border: "none", cursor: "pointer",
          background: "transparent", color: C.inkSoft,
        }}>
          Тарифы
        </button>
        <button onClick={onLogin} style={{
          fontFamily: C.font, fontWeight: 600, fontSize: 14,
          padding: "9px 18px", borderRadius: 10, cursor: "pointer",
          background: "transparent", color: C.inkSoft,
          border: `1px solid ${C.line}`,
        }}>
          Войти
        </button>
        <button onClick={onRegister} style={{
          fontFamily: C.font, fontWeight: 700, fontSize: 14,
          padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer",
          background: C.accentD, color: "#fff",
          boxShadow: "0 4px 14px rgba(10,74,53,0.28)",
        }}>
          Попробовать бесплатно
        </button>
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
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
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

/* ── Шкала восстановления волос (батарейка) ── */
const RECOVERY_STEPS = [
  { seg: 1, text: "1-я неделя: заметно меньше ломкости" },
  { seg: 3, text: "3-я неделя: волосы мягче на ощупь" },
  { seg: 5, text: "5-я неделя: меньше жирности у корней" },
  { seg: 7, text: "7-я неделя: объём и лёгкость" },
  { seg: 9, text: "9-я неделя: желаемый результат близко" },
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
      {/* Сегменты-батарейка */}
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
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: "rgba(42,155,115,0.10)", border: `1px solid rgba(42,155,115,0.22)`,
        borderRadius: 8, padding: "5px 10px",
      }}>
        <div style={{ width: 5, height: 5, borderRadius: 1.5, background: C.accentS }}/>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: ".04em" }}>Супер состав</span>
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
      padding: "112px clamp(1.5rem, 6vw, 4rem) 80px",
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

      <div style={{
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
            fontSize: "clamp(2.6rem, 5.2vw, 4rem)",
            fontWeight: 700, fontStyle: "italic",
            color: C.ink, lineHeight: 1.08,
            letterSpacing: "-0.022em", marginBottom: 24,
          }}>
            Почему ваша<br />косметика<br />не работает?
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.8vw, 17px)", color: C.inkSoft,
            lineHeight: 1.72, maxWidth: 500, marginBottom: 36,
          }}>
            В большинстве случаев дело в составе. Beauty Helper объясняет
            что там написано и помогает выбрать то, что подходит именно Вам.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
            <button onClick={onRegister} style={{
              fontFamily: C.font, fontWeight: 700, fontSize: 15,
              padding: "14px 30px", borderRadius: 13, border: "none", cursor: "pointer",
              background: C.accentD, color: "#fff",
              boxShadow: "0 6px 24px rgba(10,74,53,0.32)",
              letterSpacing: "-0.01em",
            }}>
              Попробовать бесплатно
            </button>
            <button onClick={onScrollPricing} style={{
              fontFamily: C.font, fontWeight: 600, fontSize: 15,
              padding: "14px 28px", borderRadius: 13, cursor: "pointer",
              background: C.glass, color: C.inkSoft,
              border: `1px solid ${C.glassBd}`,
              backdropFilter: "blur(10px)",
            }}>
              Оплатить подписку
            </button>
          </div>

          {/* Статистика */}
          <div style={{
            display: "flex", gap: 0, flexWrap: "wrap",
            paddingTop: 28, borderTop: `1px solid ${C.line}`,
          }}>
            {[
              { value: "20 000+", label: "ингредиентов в базе" },
              { value: "1 200+",  label: "средств в каталоге" },
              { value: "97%",     label: "положительных отзывов" },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                paddingRight: 32, marginRight: 32,
                borderRight: i < 2 ? `1px solid ${C.line}` : "none",
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: C.accent,
                  letterSpacing: "-0.03em",
                }}>{value}</div>
                <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>{label}</div>
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
              { n: 1, step: "Очищение",        product: "Шампунь б/с для жирной кожи головы" },
              { n: 2, step: "Питание",          product: "Протеиновая маска, 1 раз в неделю" },
              { n: 3, step: "Восстановление",   product: "Несмываемая сыворотка на концы" },
              { n: 4, step: "Финишный уход",    product: "Лёгкое масло для защиты концов" },
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
              <CareSteps label="Утро"  steps={["Очищение", "Тонер", "SPF"]}              color={C.accentS} />
              <CareSteps label="Вечер" steps={["Мицеллярная", "Ретинол", "Крем"]}       color="#9b7db4" />
            </div>
          </div>

          {/* 5. Шкала восстановления волос */}
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
      title: "Купили, а не подошло",
      desc: "Вы тратите деньги на средство, которое советуют все. Оно не работает. Берёте следующее. Цикл повторяется: деньги уходят, разочарование накапливается.",
    },
    {
      n: "02",
      title: "Состав - закрытая книга",
      desc: "Phenoxyethanol, Caprylic Triglyceride, Niacinamide... Что безопасно, что вредно, с чем несовместимо. Ни одно приложение не объясняло это понятным языком.",
    },
    {
      n: "03",
      title: "Советы работают не для Вас",
      desc: "Блогеры и парикмахеры дают общие рекомендации. Но у Вас свой тип кожи и свои реакции. То, что помогло другим, для Вас может оказаться бесполезным или вредным.",
    },
  ];

  return (
    <section style={{
      padding: "80px clamp(1.5rem, 6vw, 4rem)",
      background: "rgba(255,255,255,0.28)",
      borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Знакомо?</SectionLabel>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          fontWeight: 600, color: C.ink, marginBottom: 48, letterSpacing: "-0.02em",
        }}>
          Почему так происходит
        </h2>

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

  const wash  = ["Шампунь б/с для кожи головы", "Питательный кондиционер", "Прохладное ополаскивание"];
  const treat = ["Протеиновая маска 1x в неделю", "Несмываемая сыворотка на концы", "Масло для защиты от тепла"];

  return (
    <section style={{ padding: "96px clamp(1.5rem, 6vw, 4rem)" }}>
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
              { label: "Мытьё", items: wash },
              { label: "Уход",  items: treat },
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

            <div style={{
              marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.line}`,
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
      desc: "Пройдите короткий тест: тип кожи, тип волос, задачи и беспокойства. Займёт 2 минуты.",
    },
    {
      n: "2",
      title: "Расшифруйте состав",
      desc: "Вставьте INCI-список с упаковки или найдите средство в каталоге. Получите разбор каждого ингредиента на русском.",
    },
    {
      n: "3",
      title: "Получите готовую схему",
      desc: "Beauty Helper составит индивидуальный уход: что покупать, в какой последовательности и почему это работает для Вас.",
    },
  ];

  return (
    <section style={{
      padding: "80px clamp(1.5rem, 6vw, 4rem)",
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
      text: "Наконец понял, почему шампуни сушили кожу головы. Нашёл альтернативы без сульфатов - за месяц разница заметна.",
      name: "Алексей М.",
      detail: "Повреждённые волосы после окрашивания",
    },
    {
      text: "Долго не мог подобрать крем: всё или жирнило, или сушило. После теста на тип кожи нашёл нужное за один вечер.",
      name: "Катя В.",
      detail: "Комбинированная кожа, 28 лет",
    },
    {
      text: "Не понимала что покупать при выпадении. Схема ухода показала чего не хватало. Стало заметно лучше за 6 недель.",
      name: "Мария Т.",
      detail: "Активное выпадение волос",
    },
  ];

  return (
    <section style={{ padding: "96px clamp(1.5rem, 6vw, 4rem)" }}>
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
    "Каталог продуктов и поиск",
    "Справочник ингредиентов",
    "3 анализа состава",
    "Тест на тип кожи и волос",
    "Сравнение до 2 средств",
  ];
  const proFeatures = [
    "Всё из бесплатного",
    "Индивидуальная схема ухода для волос",
    "Индивидуальная схема ухода для лица",
    "Анализ совместимости средств",
    "Неограниченные анализы состава",
    "Сравнение до 5 средств",
    "Подбор аналогов",
  ];

  return (
    <section style={{
      padding: "80px clamp(1.5rem, 6vw, 4rem)",
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
          Базовые функции доступны без оплаты. Индивидуальная схема ухода и анализ совместимости доступны в подписке.
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
    <section style={{ padding: "96px clamp(1.5rem, 6vw, 4rem)" }}>
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
          Создайте аккаунт и получите бесплатный доступ к каталогу,
          3 анализа состава и тест на тип кожи и волос.
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
function Footer({ onLogin }) {
  return (
    <footer style={{
      padding: "28px clamp(1.5rem, 6vw, 4rem)",
      borderTop: `1px solid ${C.line}`,
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{
        fontFamily: "'Familjen Grotesk', sans-serif",
        fontWeight: 700, fontSize: 17, color: C.ink, letterSpacing: "-0.028em",
      }}>
        Beauty Helper
      </div>
      <div style={{ fontSize: 12, color: C.inkFaint }}>by Simona · 2026</div>
      <button onClick={onLogin} style={{
        fontFamily: C.font, fontWeight: 600, fontSize: 13,
        padding: "7px 16px", borderRadius: 9, cursor: "pointer",
        background: "transparent", color: C.inkFaint,
        border: `1px solid ${C.line}`,
      }}>
        Войти
      </button>
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
      `}</style>

      <FlowersBg />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar onLogin={onLogin} onRegister={onRegister} onScrollPricing={scrollToPricing} />
        <Hero onRegister={onRegister} onScrollPricing={scrollToPricing} />
        <Problems />
        <Solution />
        <HowItWorks />
        <Testimonials />
        <div ref={pricingRef}>
          <PricingSection onRegister={onRegister} onPurchase={onPurchase} />
        </div>
        <CTASection onRegister={onRegister} />
        <Footer onLogin={onLogin} />
      </div>
    </div>
  );
}
