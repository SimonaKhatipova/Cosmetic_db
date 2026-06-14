// robokassa-recurring-charge — повторные списания по подпискам (запускается по расписанию, cron).
// Для каждой подписки, у которой подошёл срок, инициирует списание через Robokassa Recurring API.
// Подтверждение (выдача pro) приходит отдельно в robokassa-result.
// verify_jwt: false — вызывается из pg_cron; защита — секрет в заголовке x-cron-secret.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "node:crypto";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE      = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOGIN        = Deno.env.get("ROBOKASSA_LOGIN")!;
const PASS1        = Deno.env.get("ROBOKASSA_PASS1")!;
const AMOUNT       = Deno.env.get("ROBOKASSA_AMOUNT") ?? "3490.00";
const ALGO         = (Deno.env.get("ROBOKASSA_HASH") ?? "md5").toLowerCase();
const CRON_SECRET  = Deno.env.get("CRON_SECRET") ?? "";
const DESCRIPTION  = "Beauty Helper — продление подписки PRO";

const sign = (payload: string) => createHash(ALGO).update(payload, "utf8").digest("hex");

Deno.serve(async (req) => {
  if (CRON_SECRET && req.headers.get("x-cron-secret") !== CRON_SECRET)
    return new Response("forbidden", { status: 403 });

  const admin = createClient(SUPABASE_URL, SERVICE);
  const nowIso = new Date().toISOString();

  const { data: subs } = await admin.from("subscriptions")
    .select("*")
    .eq("status", "active").eq("recurring", true)
    .lte("next_charge_at", nowIso);

  const results: unknown[] = [];
  for (const sub of subs ?? []) {
    const { data: pay } = await admin.from("payments")
      .insert({ user_id: sub.user_id, email: sub.email, amount: AMOUNT, status: "pending", is_init: false, provider: "robokassa" })
      .select("id").single();
    if (!pay) { results.push({ sub: sub.id, error: "payment_create_failed" }); continue; }

    const invId = pay.id;
    const form = new URLSearchParams({
      MerchantLogin: LOGIN,
      InvoiceID: String(invId),
      PreviousInvoiceID: String(sub.first_invoice_id),
      Description: DESCRIPTION,
      OutSum: AMOUNT,
      SignatureValue: sign(`${LOGIN}:${AMOUNT}:${invId}:${PASS1}`),
    });

    const resp = await fetch("https://auth.robokassa.ru/Merchant/Recurring", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const text = (await resp.text()).trim();

    if (text.startsWith("OK")) {
      // ждём подтверждения через robokassa-result; временно сдвигаем срок, чтобы не списать повторно
      const hold = new Date(); hold.setDate(hold.getDate() + 1);
      await admin.from("subscriptions").update({ next_charge_at: hold.toISOString(), updated_at: nowIso }).eq("id", sub.id);
      results.push({ sub: sub.id, invId, status: "charge_requested" });
    } else {
      await admin.from("payments").update({ status: "fail", raw: { response: text }, updated_at: nowIso }).eq("id", invId);
      await admin.from("subscriptions").update({ status: "past_due", updated_at: nowIso }).eq("id", sub.id);
      results.push({ sub: sub.id, invId, status: "failed", response: text });
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    headers: { "Content-Type": "application/json" },
  });
});
