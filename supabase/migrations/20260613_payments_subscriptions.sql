-- Робокасса: платежи и рекуррентные подписки.
-- Записи в эти таблицы делает ТОЛЬКО бэкенд (service_role в Edge Functions).
-- Пользователь через анонимный ключ может лишь читать свои строки (RLS),
-- выдать себе pro он не может — как и в profiles, нет политик на запись.

-- ── Платежи: одна строка = одна попытка списания. payments.id = Robokassa InvId.
create table if not exists public.payments (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  email       text,
  amount      numeric(10,2) not null,
  status      text not null default 'pending' check (status in ('pending','success','fail')),
  is_init     boolean not null default false,   -- true = первый платёж, заводящий подписку
  provider    text not null default 'robokassa',
  raw         jsonb,                             -- сырой колбэк/ответ Робокассы
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists payments_user_idx   on public.payments(user_id);
create index if not exists payments_status_idx  on public.payments(status);

-- ── Подписки: одна активная подписка на пользователя.
-- first_invoice_id — «шаблон» рекуррента (PreviousInvoiceID для повторных списаний).
create table if not exists public.subscriptions (
  id                bigint generated always as identity primary key,
  user_id           uuid not null references auth.users(id) on delete cascade,
  email             text,
  status            text not null default 'active' check (status in ('active','past_due','cancelled')),
  amount            numeric(10,2) not null,
  first_invoice_id  bigint not null,
  last_invoice_id   bigint,
  pro_until         timestamptz,
  next_charge_at    timestamptz,
  recurring         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique(user_id)
);
create index if not exists subscriptions_due_idx
  on public.subscriptions(next_charge_at)
  where status = 'active' and recurring = true;

-- ── RLS: только чтение своих строк. Записи — нет (значит, только service_role).
alter table public.payments      enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "read own payments" on public.payments;
create policy "read own payments" on public.payments
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "read own subscription" on public.subscriptions;
create policy "read own subscription" on public.subscriptions
  for select to authenticated using (auth.uid() = user_id);

-- Привилегии: читать своим, всё остальное — только service_role (обходит RLS).
grant select on public.payments      to authenticated;
grant select on public.subscriptions to authenticated;
