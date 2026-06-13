-- ═══════════════════════════════════════════════════════════════════════════
-- БЛОКИРОВКА RLS ПЕРЕД ПЕРЕДАЧЕЙ ПРОДУКТА СТОРОННИМ ПОЛЬЗОВАТЕЛЯМ (12.06.2026)
--
-- Было: политики "owner all <table>" USING(true) — любой ЗАРЕГИСТРИРОВАННЫЙ
-- пользователь мог менять и удалять всё (а регистрация теперь самообслуживание).
--
-- Станет: чтение каталога — все вошедшие; запись — только владелец
-- (uid e2a23384-758a-4096-a456-24ed24f31eaf = simonakhatipova@gmail.com).
--
-- Скрипт идемпотентный. Запускать целиком в Supabase Dashboard → SQL Editor.
-- ВАЖНО: когда появится freemium-механика «пользователь добавляет 3 средства
-- в неделю», для products/product_ingredients понадобится отдельная
-- INSERT-политика с лимитами — это осознанно НЕ здесь.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── products ──
DROP POLICY IF EXISTS "owner all products" ON public.products;
DROP POLICY IF EXISTS "read products" ON public.products;
DROP POLICY IF EXISTS "admin write products" ON public.products;
CREATE POLICY "read products" ON public.products
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write products" ON public.products
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── ingredients ──
DROP POLICY IF EXISTS "owner all ingredients" ON public.ingredients;
DROP POLICY IF EXISTS "read ingredients" ON public.ingredients;
DROP POLICY IF EXISTS "admin write ingredients" ON public.ingredients;
CREATE POLICY "read ingredients" ON public.ingredients
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write ingredients" ON public.ingredients
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── product_ingredients ──
DROP POLICY IF EXISTS "owner all product_ingredients" ON public.product_ingredients;
DROP POLICY IF EXISTS "read product_ingredients" ON public.product_ingredients;
DROP POLICY IF EXISTS "admin write product_ingredients" ON public.product_ingredients;
CREATE POLICY "read product_ingredients" ON public.product_ingredients
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write product_ingredients" ON public.product_ingredients
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── ingredient_groups ──
DROP POLICY IF EXISTS "owner all ingredient_groups" ON public.ingredient_groups;
DROP POLICY IF EXISTS "read ingredient_groups" ON public.ingredient_groups;
DROP POLICY IF EXISTS "admin write ingredient_groups" ON public.ingredient_groups;
CREATE POLICY "read ingredient_groups" ON public.ingredient_groups
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write ingredient_groups" ON public.ingredient_groups
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── oils_meta ──
DROP POLICY IF EXISTS "owner all oils_meta" ON public.oils_meta;
DROP POLICY IF EXISTS "read oils_meta" ON public.oils_meta;
DROP POLICY IF EXISTS "admin write oils_meta" ON public.oils_meta;
CREATE POLICY "read oils_meta" ON public.oils_meta
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write oils_meta" ON public.oils_meta
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── patented_formulas ──
DROP POLICY IF EXISTS "owner all patented_formulas" ON public.patented_formulas;
DROP POLICY IF EXISTS "read patented_formulas" ON public.patented_formulas;
DROP POLICY IF EXISTS "admin write patented_formulas" ON public.patented_formulas;
CREATE POLICY "read patented_formulas" ON public.patented_formulas
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write patented_formulas" ON public.patented_formulas
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── formula_ingredients ──
DROP POLICY IF EXISTS "owner all formula_ingredients" ON public.formula_ingredients;
DROP POLICY IF EXISTS "read formula_ingredients" ON public.formula_ingredients;
DROP POLICY IF EXISTS "admin write formula_ingredients" ON public.formula_ingredients;
CREATE POLICY "read formula_ingredients" ON public.formula_ingredients
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write formula_ingredients" ON public.formula_ingredients
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── subgroups ──
DROP POLICY IF EXISTS "owner all subgroups" ON public.subgroups;
DROP POLICY IF EXISTS "read subgroups" ON public.subgroups;
DROP POLICY IF EXISTS "admin write subgroups" ON public.subgroups;
CREATE POLICY "read subgroups" ON public.subgroups
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write subgroups" ON public.subgroups
  FOR ALL TO authenticated
  USING (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── служебная definer-функция не должна вызываться с клиента ──
-- ВАЖНО: EXECUTE по умолчанию выдан роли PUBLIC, поэтому отзыв только у
-- anon/authenticated не помогает (они наследуют право от PUBLIC). Отзываем у PUBLIC.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- ── views: уважать права читателя, а не создателя (SECURITY INVOKER) ──
ALTER VIEW public.v_ingredient_groups_with_desc SET (security_invoker = on);
ALTER VIEW public.v_product_composition SET (security_invoker = on);
ALTER VIEW public.v_ingredients_full SET (security_invoker = on);
ALTER VIEW public.v_product_formulas SET (security_invoker = on);
ALTER VIEW public.v_formula_coverage SET (security_invoker = on);

COMMIT;

-- Проверка после запуска (ожидаемо: по 2 политики на таблицу — read + admin write):
-- SELECT tablename, policyname, cmd, roles::text FROM pg_policies
-- WHERE schemaname='public' ORDER BY tablename, policyname;
