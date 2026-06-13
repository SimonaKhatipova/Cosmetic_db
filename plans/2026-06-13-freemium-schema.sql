-- ═══════════════════════════════════════════════════════════════════════════
-- FREEMIUM: профиль с тарифом + учёт использования для недельных лимитов (13.06.2026)
--
-- Тариф НЕ в user_metadata (его правит сам пользователь) — отдельная таблица
-- profiles с RLS: читать своё можно, менять тариф обычному юзеру нельзя
-- (UPDATE делает только service_role из платёжного вебхука или владелец вручную).
--
-- Скрипт идемпотентный. Запускать целиком в Supabase Dashboard → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── профили: тариф пользователя ──
CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tariff     text NOT NULL DEFAULT 'free' CHECK (tariff IN ('free','pro')),
  pro_until  timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read own profile" ON public.profiles;
CREATE POLICY "read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
-- INSERT/UPDATE/DELETE для роли authenticated НЕ создаём: тариф меняет только
-- service_role (платёжный вебхук) либо владелец из SQL Editor. Это намеренно.

-- ── авто-создание профиля при регистрации ──
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── профили для уже существующих пользователей ──
INSERT INTO public.profiles (id) SELECT id FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ── учёт использования для недельных лимитов ──
CREATE TABLE IF NOT EXISTS public.usage_events (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind       text NOT NULL CHECK (kind IN ('search','analysis')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS usage_events_user_kind_time
  ON public.usage_events (user_id, kind, created_at DESC);
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own usage select" ON public.usage_events;
CREATE POLICY "own usage select" ON public.usage_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "own usage insert" ON public.usage_events;
CREATE POLICY "own usage insert" ON public.usage_events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

COMMIT;

-- Владельца сразу делаем pro (необязательно):
-- UPDATE public.profiles SET tariff='pro' WHERE id='e2a23384-758a-4096-a456-24ed24f31eaf';

-- Проверка:
-- SELECT id, tariff, pro_until FROM public.profiles;
-- SELECT tablename, policyname, cmd FROM pg_policies
--   WHERE tablename IN ('profiles','usage_events') ORDER BY tablename, policyname;
