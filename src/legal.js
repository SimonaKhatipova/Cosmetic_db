// Юридические документы и реквизиты.
// Требования юриста (см. plans/2026-06-12-правовое-оформление.md):
// оферта и политика — в верхнем меню и подвале; чекбоксы согласий — пустые,
// отдельные; оферта и ПД обязательны, рассылка — нет.
// Документы размещены на самом сайте (public/legal/*.html), без привязки к Яндекс.Диску.
// BASE_URL = "/" в dev и "/Cosmetic_db/" в проде — ссылки работают в обоих случаях.
const DOCS = import.meta.env.BASE_URL + "legal/";
export const LEGAL = {
  offer:      DOCS + "oferta.html",          // оферта
  policy:     DOCS + "politika.html",         // политика обработки ПД
  pdConsent:  DOCS + "soglasie-pd.html",      // согласие на обработку ПД
  adsConsent: DOCS + "soglasie-reklama.html", // согласие на рекламную рассылку
  ownerName: "Хатипова Симона Ирековна",
  ownerInn:  "590775176329",
  ownerEmail: "info.simona@vk.com",
};
