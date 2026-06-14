# Оплата подписки через Робокассу (рекуррент)

Дата: 2026-06-13
Статус: код готов и задеплоен; ждёт секреты + настройку кабинета Робокассы + cron.

## Цель

Платная подписка PRO (3 490 ₽/мес) с **автосписанием** через Робокассу.
Тариф выдаёт ТОЛЬКО сервер (Edge Function с service_role) после проверки подписи —
пользователь не может выдать себе `pro` через анонимный ключ (на `profiles`/`payments`/
`subscriptions` нет RLS-политик на запись).

## Архитектура

```
Фронт (PurchaseModal)
  └─> POST /functions/v1/robokassa-pay  (JWT юзера)
        создаёт payments(pending, is_init=true), подписывает Паролем№1
        └─> возвращает URL → редирект на оплату Робокассы (Recurring=true)
Робокасса
  ├─ браузер: Success/Fail URL → сайт ?payment=success → опрос профиля
  └─ сервер:  Result URL → /functions/v1/robokassa-result (без JWT)
        проверяет подпись Паролем№2 → payments=success →
        profiles.tariff=pro, pro_until=+1мес → subscriptions(active, next_charge_at=−1день)
Cron (раз в сутки)
  └─> /functions/v1/robokassa-recurring-charge (x-cron-secret)
        для подписок с истёкшим next_charge_at → Robokassa Recurring API
        (PreviousInvoiceID = first_invoice_id) → подтверждение снова через Result URL
```

## Фазы

- [x] **Фаза 1. Схема БД.** Таблицы `payments`, `subscriptions` + RLS (только чтение своих строк).
      Миграция: `supabase/migrations/20260613_payments_subscriptions.sql` (применена).
- [x] **Фаза 2. Edge Functions.** `robokassa-pay` (verify_jwt), `robokassa-result` (webhook),
      `robokassa-recurring-charge` (cron). Задеплоены, ACTIVE.
- [x] **Фаза 3. Фронтенд.** `src/lib/robokassa.js`, переключение `PurchaseModal` на Робокассу,
      обработка возврата `?payment=success`. CloudPayments удалён (lib, скрипты в html).
- [ ] **Фаза 4. Секреты Supabase.** Задать в Dashboard → Project Settings → Edge Functions → Secrets
      (или `supabase secrets set`):
      - `ROBOKASSA_LOGIN` — идентификатор магазина
      - `ROBOKASSA_PASS1` — Пароль №1
      - `ROBOKASSA_PASS2` — Пароль №2
      - `ROBOKASSA_HASH` — `md5` (по умолчанию у Робокассы) либо `sha256` — **должно совпадать с кабинетом**
      - `ROBOKASSA_AMOUNT` — `3490.00` (опц., это значение по умолчанию)
      - `ROBOKASSA_TEST` — `1` на время тестов, потом убрать/`0`
      - `CRON_SECRET` — произвольная строка для защиты cron-функции
- [ ] **Фаза 5. Кабинет Робокассы** (Технические настройки):
      - Result URL: `https://lcvszvxbszszqikboxeq.supabase.co/functions/v1/robokassa-result`, метод **POST**
      - Success URL: `https://<домен>/?payment=success` (метод GET)
      - Fail URL: `https://<домен>/?payment=fail` (метод GET)
      - Алгоритм подписи = как в `ROBOKASSA_HASH`
      - Включить рекуррентные платежи (подписки)
- [ ] **Фаза 6. Cron** (раз в сутки дергать recurring-charge). Через pg_cron + pg_net:
      ```sql
      create extension if not exists pg_cron;
      create extension if not exists pg_net;
      select cron.schedule('robokassa-recurring-daily', '0 3 * * *', $$
        select net.http_post(
          url := 'https://lcvszvxbszszqikboxeq.supabase.co/functions/v1/robokassa-recurring-charge',
          headers := jsonb_build_object('Content-Type','application/json','x-cron-secret','<CRON_SECRET>'),
          body := '{}'::jsonb
        );
      $$);
      ```
- [ ] **Фаза 7. Фискализация (54-ФЗ).** Включить чеки в кабинете Робокассы (для самозанятого —
      через «Мой налог»/интеграцию). Если чек формируется на стороне магазина параметром `Receipt`,
      его надо добавить в подпись `robokassa-pay` — сейчас не реализовано (Receipt в подпись не входит).
- [ ] **Фаза 8. Тест.** `ROBOKASSA_TEST=1`, тестовая карта → проверить: payments=success,
      profiles.tariff=pro, появилась строка subscriptions, возврат на ?payment=success показывает PRO.

## Файлы

- `supabase/migrations/20260613_payments_subscriptions.sql`
- `supabase/functions/robokassa-pay/index.ts`
- `supabase/functions/robokassa-result/index.ts`
- `supabase/functions/robokassa-recurring-charge/index.ts`
- `src/lib/robokassa.js`
- `src/App.jsx` (импорт, PurchaseModal, эффект возврата с оплаты)

## Итог

Реализовано: схема БД, три функции, фронтенд — задеплоено. Не хватает только данных,
которые знает владелец (секреты Робокассы, домен для Success/Fail) и включения cron/фискализации.
После Фаз 4–8 подписка с автосписанием заработает полностью.

## Заметки на будущее

- Отмена подписки пользователем: добавить кнопку в ЛК → ставит `subscriptions.recurring=false`
  (или `status='cancelled'`). Доступ остаётся до `pro_until`.
- Email-уведомления (через Resend): «оплата прошла», «скоро спишем», «списание не удалось».
- `payments.id` = Robokassa InvId (bigint). Уникальность гарантирована.
