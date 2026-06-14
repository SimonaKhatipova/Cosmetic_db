// robokassa-result — серверный колбэк Робокассы (Result URL).
// Проверяет подпись Паролем №2, помечает платёж успешным, выдаёт pro и продлевает подписку.
// verify_jwt: false — это webhook от Робокассы, без JWT. Защита — проверка подписи.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "node:crypto";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE      = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PASS2        = Deno.env.get("ROBOKASSA_PASS2")!;
const ALGO         = (Deno.env.get("ROBOKASSA_HASH") ?? "md5").toLowerCase();

const sign = (payload: string) => createHash(ALGO).update(payload, "utf8").digest("hex").toLowerCase();

Deno.serve(async (req) => {
  // Робокасса шлёт Result URL POST-ом (form-urlencoded); поддержим и GET на всякий случай.
  let params: URLSearchParams;
  if (req.method === "POST") {
    const ct = req.headers.get("content-type") || "";
    params = ct.includes("application/x-www-form-urlencoded")
      ? new URLSearchParams(await req.text())
      : new URL(req.url).searchParams;
  } else {
    params = new URL(req.url).searchParams;
  }

  const outSum = params.get("OutSum") ?? "";
  const invId  = params.get("InvId") ?? "";
  const sigRecv = (params.get("SignatureValue") ?? "").toLowerCase();
  if (!invId || !outSum || !sigRecv) return new Response("bad request", { status: 400 });

  if (sign(`${outSum}:${invId}:${PASS2}`) !== sigRecv) return new Response("bad sign", { status: 400 });

  const admin = createClient(SUPABASE_URL, SERVICE);
  const id = Number(invId);

  const { data: pay } = await admin.from("payments").select("*").eq("id", id).single();
  if (!pay) return new Response("unknown invoice", { status: 404 });
  if (pay.status === "success") return new Response(`OK${invId}`); // идемпотентность

  await admin.from("payments")
    .update({ status: "success", raw: Object.fromEntries(params), updated_at: new Date().toISOString() })
    .eq("id", id);

  // pro_until = max(сейчас, текущий pro_until) + 1 месяц
  const { data: prof } = await admin.from("profiles").select("pro_until").eq("id", pay.user_id).single();
  const now = new Date();
  const base = prof?.pro_until && new Date(prof.pro_until) > now ? new Date(prof.pro_until) : now;
  const proUntil = new Date(base); proUntil.setMonth(proUntil.getMonth() + 1);
  const nextCharge = new Date(proUntil); nextCharge.setDate(nextCharge.getDate() - 1); // списываем за день до конца

  await admin.from("profiles")
    .update({ tariff: "pro", pro_until: proUntil.toISOString() })
    .eq("id", pay.user_id);

  const subPatch: Record<string, unknown> = {
    user_id: pay.user_id, email: pay.email, status: "active", amount: pay.amount,
    last_invoice_id: id, pro_until: proUntil.toISOString(), next_charge_at: nextCharge.toISOString(),
    recurring: true, updated_at: new Date().toISOString(),
  };
  if (pay.is_init) subPatch.first_invoice_id = id; // шаблон рекуррента ставим только при первом платеже
  await admin.from("subscriptions").upsert(subPatch, { onConflict: "user_id" });

  return new Response(`OK${invId}`);
});
