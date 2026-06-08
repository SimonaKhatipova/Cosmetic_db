/**
 * CloudPayments widget helper
 *
 * Требует наличия скрипта в index.html / preview.html:
 *   <script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"></script>
 *
 * Public ID берётся из .env:
 *   VITE_CLOUDPAYMENTS_PUBLIC_ID=pk_xxxxxxxxx
 *
 * Secret Key — ТОЛЬКО на бэкенде, никогда не добавлять в .env фронтенда.
 */

const AMOUNT = 3490;
const DESCRIPTION = "Beauty Helper — подписка на 1 месяц";

/**
 * Открывает виджет CloudPayments.
 * @param {object} opts
 * @param {string} [opts.email]      — email покупателя (accountId)
 * @param {string} [opts.invoiceId]  — ваш внутренний ID заказа
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFail]
 */
export function openPaymentWidget({ email = "", invoiceId = "", onSuccess, onFail } = {}) {
  const publicId = import.meta.env.VITE_CLOUDPAYMENTS_PUBLIC_ID;

  if (!publicId) {
    console.warn(
      "[CloudPayments] VITE_CLOUDPAYMENTS_PUBLIC_ID не задан в .env\n" +
      "Добавьте строку: VITE_CLOUDPAYMENTS_PUBLIC_ID=pk_test_xxxx"
    );
    onFail?.("no_public_id");
    return;
  }

  if (typeof window.cp === "undefined") {
    console.error("[CloudPayments] Скрипт виджета не загружен. Проверьте index.html.");
    onFail?.("script_not_loaded");
    return;
  }

  const widget = new window.cp.CloudPayments();

  widget.pay(
    "charge",
    {
      publicId,
      description: DESCRIPTION,
      amount:      AMOUNT,
      currency:    "RUB",
      accountId:   email     || undefined,
      invoiceId:   invoiceId || undefined,
      skin:        "mini",
    },
    {
      onSuccess: (options) => onSuccess?.(options),
      onFail:    (reason, options) => onFail?.(reason, options),
      onComplete: (result) => {
        // result.success — булево, вызывается всегда
      },
    }
  );
}
