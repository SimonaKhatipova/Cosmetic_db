// robokassa-pay — инициация платежа/подписки.
// Вызывается фронтендом с JWT пользователя. Создаёт строку в payments (pending),
// подписывает параметры Паролем №1 и возвращает URL оплаты Робокассы (с Recurring=true).
// verify_jwt: true — без валидного токена вызвать нельзя.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "node:crypto";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON         = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE      = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOGIN        = Deno.env.get("ROBOKASSA_LOGIN")!;
const PASS1        = Deno.env.get("ROBOKASSA_PASS1")!;
const AMOUNT       = Deno.env.get("ROBOKASSA_AMOUNT") ?? "3490.00";
const ALGO         = (Deno.env.get("ROBOKASSA_HASH") ?? "md5").toLowerCase();
const IS_TEST      = Deno.env.get("ROBOKASSA_TEST") === "1";
const DESCRIPTION  = "Beauty Helper — подписка PRO, 1 месяц";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const sign = (payload: string) => createHash(ALGO).update(payload, "utf8").digest("hex");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (obj: unknown, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const authClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: uErr } = await authClient.auth.getUser();
    if (uErr || !user) return json({ error: "unauthorized" }, 401);

    let body: { email?: string } = {};
    try { body = await req.json(); } catch { /* пустое тело допустимо */ }
    const email = (body.email || user.email || "").toString();

    const admin = createClient(SUPABASE_URL, SERVICE);
    const { data: pay, error: pErr } = await admin
      .from("payments")
      .insert({ user_id: user.id, email, amount: AMOUNT, status: "pending", is_init: true, provider: "robokassa" })
      .select("id")
      .single();
    if (pErr || !pay) return json({ error: "payment_create_failed", detail: pErr?.message }, 500);

    const invId = pay.id;
    const signature = sign(`${LOGIN}:${AMOUNT}:${invId}:${PASS1}`);
    const params = new URLSearchParams({
      MerchantLogin: LOGIN,
      OutSum: AMOUNT,
      InvId: String(invId),
      Description: DESCRIPTION,
      SignatureValue: signature,
      Recurring: "true",
      Culture: "ru",
      Encoding: "utf-8",
    });
    if (email) params.set("Email", email);
    if (IS_TEST) params.set("IsTest", "1");

    return json({ url: `https://auth.robokassa.ru/Merchant/Index.aspx?${params.toString()}`, invoiceId: invId });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
