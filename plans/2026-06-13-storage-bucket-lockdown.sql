-- ═══════════════════════════════════════════════════════════════════════════
-- ЗАЩИТА БАКЕТА product-images (13.06.2026)
--
-- Было: SELECT для всех (листинг всех файлов) — дублирующая пара политик;
--       INSERT для роли public (АНОНИМНАЯ загрузка чего угодно!) и для любого
--       вошедшего; UPDATE для любого вошедшего.
-- Станет: показ картинок — по public-URL без политики (бакет публичный);
--         запись/перезапись — только владелец (uid Симоны). Листинг закрыт.
--
-- Картинки в каталоге продолжат отображаться: <img src> использует
-- /storage/v1/object/public/product-images/... — он не требует SELECT-политики.
-- Скрипт идемпотентный. Запускать в Supabase Dashboard → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── чтение: убираем широкий листинг (public-URL работает и без него) ──
DROP POLICY IF EXISTS "Allow read for all" ON storage.objects;
DROP POLICY IF EXISTS "public read product images" ON storage.objects;

-- ── загрузка: убираем анонимную и «любой вошедший», оставляем только владельца ──
DROP POLICY IF EXISTS "Allow upload for all" ON storage.objects;
DROP POLICY IF EXISTS "owner write product images" ON storage.objects;
CREATE POLICY "owner write product images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images'
    AND auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

-- ── перезапись существующих файлов — тоже только владелец ──
DROP POLICY IF EXISTS "owner update product images" ON storage.objects;
CREATE POLICY "owner update product images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images'
    AND auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid)
  WITH CHECK (bucket_id = 'product-images'
    AND auth.uid() = 'e2a23384-758a-4096-a456-24ed24f31eaf'::uuid);

COMMIT;

-- Проверка (ожидаемо: по одной INSERT и UPDATE только для владельца, SELECT нет):
-- SELECT policyname, cmd, roles::text FROM pg_policies
--   WHERE schemaname='storage' AND tablename='objects'
--   AND (qual::text LIKE '%product-images%' OR with_check::text LIKE '%product-images%');
