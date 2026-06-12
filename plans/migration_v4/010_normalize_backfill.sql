-- ============================================================
-- 010_normalize_backfill.sql — 2026-06-12
-- 1) Явные правки (Bifida, Apple Cell Culture, Ethylhexyl Glycerin)
-- 2) Generic-слияние ингредиентов с концентрацией в имени → чистый canonical
--    (raw_inci_name в составах НЕ трогаем — концентрация значима,
--     меняется только ingredient_id)
-- 3) Создание реально отсутствующих ингредиентов (is_verified = false)
-- 4) Нормализационный backfill: регистр + дефисы + скобки + концентрации
-- 5) Синхронизация справочника subgroups
-- Запускать ПОСЛЕ 009. Ожидаемый эффект: ~500 из 758 unmatched закроются.
-- ============================================================

BEGIN;

-- ============================================================
-- БЛОК 1. Явные правки
-- ============================================================

-- 1.1 Bifida Ferment Filirate (1006) — опечатка в имени canonical
UPDATE ingredients
SET inci_name = 'Bifida Ferment Filtrate',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Bifida Ferment Filirate'
WHERE id = 1006 AND inci_name = 'Bifida Ferment Filirate';

-- 1.2 Bifida Fermenf Lysate (3597, опечатка) и Bifida Fermentation Lysate (3531)
--     → Bifida Ferment Lysate (3616)
UPDATE product_ingredients SET ingredient_id = 3616 WHERE ingredient_id IN (3597, 3531);
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Bifida Fermenf Lysate|Bifida Fermentation Lysate'
WHERE id = 3616 AND (aliases IS NULL OR aliases NOT LIKE '%Fermenf%');
DELETE FROM ingredient_groups WHERE ingredient_id IN (3597, 3531);
DELETE FROM ingredients WHERE id IN (3597, 3531);

-- 1.3 Apple Cell Culture Extract (4822): убрать концентрацию из имени canonical
UPDATE ingredients
SET inci_name = 'Apple Cell Culture Extract',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Apple Cell Culture Extract (0 001 Ppm)'
WHERE id = 4822 AND inci_name = 'Apple Cell Culture Extract (0 001 Ppm)';

-- 1.4 «Ethylhexyl Glycerin» (раздельно) → алиас к Ethylhexylglycerin (2428)
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Ethylhexyl Glycerin|Ethylhexyl Glycerine'
WHERE id = 2428 AND (aliases IS NULL OR aliases NOT LIKE '%Ethylhexyl Glycerin%');

-- Дубль Ethylhexyl Glycerine (4466) → слить в 2428
UPDATE product_ingredients SET ingredient_id = 2428 WHERE ingredient_id = 4466;
DELETE FROM ingredient_groups WHERE ingredient_id = 4466;
DELETE FROM ingredients WHERE id = 4466;

-- ============================================================
-- БЛОК 2. Generic-слияние: ингредиенты с концентрацией в имени
-- (ppm/ppb/%/IU) сливаются с чистым canonical, если после
-- нормализации имена совпадают однозначно.
-- ============================================================

CREATE TEMP TABLE conc_merge ON COMMIT DROP AS
WITH norm AS (
  SELECT id, inci_name,
    inci_name ~* '\d+\s*([.,]\d+)?\s*(ppm|ppb|%|iu)' AS has_conc,
    regexp_replace(trim(regexp_replace(replace(replace(lower(
      regexp_replace(inci_name, '\([^)]*\)', ' ', 'g')
    ), '-', ' '), '*', ' '),
      '\s*\d+([\.,]\d+)?\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')),
    '\s+', ' ', 'g') AS key
  FROM ingredients
),
clean AS (
  SELECT key, MIN(id) AS canon_id
  FROM norm WHERE NOT has_conc AND key <> ''
  GROUP BY key
  HAVING COUNT(DISTINCT id) = 1
)
SELECT n.id AS dup_id, c.canon_id, n.inci_name AS dup_name
FROM norm n
JOIN clean c ON c.key = n.key
WHERE n.has_conc AND n.id <> c.canon_id;

-- Перепривязать составы (raw_inci_name с концентрацией сохраняется!)
UPDATE product_ingredients pi
SET ingredient_id = cm.canon_id
FROM conc_merge cm
WHERE pi.ingredient_id = cm.dup_id;

-- Имена дублей → в алиасы canonical
UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || agg.names
FROM (
  SELECT canon_id, string_agg(dup_name, '|') AS names
  FROM conc_merge GROUP BY canon_id
) agg
WHERE i.id = agg.canon_id;

-- Удалить дубли
DELETE FROM ingredient_groups WHERE ingredient_id IN (SELECT dup_id FROM conc_merge);
DELETE FROM ingredients       WHERE id            IN (SELECT dup_id FROM conc_merge);

-- ============================================================
-- БЛОК 3. Реально отсутствующие ингредиенты из топа unmatched.
-- is_verified = false — проверить группы глазами после запуска.
-- ============================================================

WITH new_ing(inci_name, ru_name, grp, sub, sub2) AS (VALUES
  ('Coco-Caprylate/Caprate', 'Коко-каприлат/капрат', 'Эмоленты', 'Синтетические масла', 'Лёгкие'),
  ('Ethylhexyl Stearate', 'Этилгексил стеарат', 'Эмоленты', 'Эфиры жирных кислот', NULL),
  ('Polyacrylate-13', 'Полиакрилат-13', 'Структурообразователи', 'Загустители, гелеобразователи', NULL),
  ('Polyether-1', 'Полиэфир-1', 'Структурообразователи', 'Загустители, гелеобразователи', NULL),
  ('PEG-45M', 'ПЭГ-45M', 'Структурообразователи', 'Загустители, гелеобразователи', NULL),
  ('Polysilicone-13', 'Полисиликон-13', 'Окклюзивы', 'Силиконы', NULL),
  ('PEG-7 Propylheptyl Ether', 'ПЭГ-7 пропилгептил эфир', 'ПАВ', 'Неионогенные', NULL),
  ('Polyglyceryl-4 Isostearate', 'Полиглицерил-4 изостеарат', 'Структурообразователи', 'Обратная эмульсия', 'Эмульгатор'),
  ('Polyglyceryl-4 Diisostearate/Polyhydroxystearate/Sebacate', 'Полиглицерил-4 комплексный эмульгатор', 'Структурообразователи', 'Обратная эмульсия', 'Эмульгатор'),
  ('Meadowfoam Delta-Lactone', 'Дельта-лактон пенника лугового', 'Прочее', NULL, NULL),
  ('Ibuprofen Piconol', 'Ибупрофен пиконол (противовоспалительный, Япония)', 'Активные компоненты', 'Успокаивающие', NULL),
  ('Isopropyl Methylphenol', 'Изопропилметилфенол (IPMP, антибактериальный)', 'Консерванты', 'Синтетические', NULL)
),
ins AS (
  INSERT INTO ingredients (inci_name, ru_name, is_verified)
  SELECT n.inci_name, n.ru_name, false
  FROM new_ing n
  WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE lower(i.inci_name) = lower(n.inci_name))
  RETURNING id, inci_name
)
INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, subgroup2, is_primary)
SELECT ins.id, n.grp, n.sub, n.sub2, true
FROM ins JOIN new_ing n ON n.inci_name = ins.inci_name;

-- Алиас IPMP
UPDATE ingredients
SET aliases = 'IPMP|O-Cymen-5-Ol|Isopropyl methylphenol (IPMP)'
WHERE inci_name = 'Isopropyl Methylphenol' AND aliases IS NULL;

-- ============================================================
-- БЛОК 4. Нормализационный backfill составов.
-- Ключ: lower + без дефисов + без звёздочек + без скобочных вставок
-- + без хвоста-концентрации + схлопнутые пробелы.
-- Привязка только при однозначном кандидате.
-- ============================================================

CREATE TEMP TABLE norm_dict ON COMMIT DROP AS
WITH norm AS (
  SELECT id,
    regexp_replace(trim(regexp_replace(replace(replace(lower(
      regexp_replace(inci_name, '\([^)]*\)', ' ', 'g')
    ), '-', ' '), '*', ' '),
      '\s*\d+([\.,]\d+)?\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')),
    '\s+', ' ', 'g') AS key
  FROM ingredients
  UNION ALL
  SELECT i.id,
    regexp_replace(trim(regexp_replace(replace(replace(lower(
      regexp_replace(a, '\([^)]*\)', ' ', 'g')
    ), '-', ' '), '*', ' '),
      '\s*\d+([\.,]\d+)?\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')),
    '\s+', ' ', 'g')
  FROM ingredients i, unnest(string_to_array(i.aliases, '|')) a
  WHERE i.aliases IS NOT NULL
)
SELECT key, MIN(id) AS ingredient_id
FROM norm WHERE key <> ''
GROUP BY key
HAVING COUNT(DISTINCT id) = 1;

UPDATE product_ingredients pi
SET ingredient_id = d.ingredient_id,
    match_source = 'norm_backfill'
FROM norm_dict d
WHERE pi.ingredient_id IS NULL
  AND d.key = regexp_replace(trim(regexp_replace(replace(replace(lower(
        regexp_replace(pi.raw_inci_name, '\([^)]*\)', ' ', 'g')
      ), '-', ' '), '*', ' '),
        '\s*\d+([\.,]\d+)?\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')),
      '\s+', ' ', 'g');

-- ============================================================
-- БЛОК 5. Справочник subgroups: добавить 87 фактических комбинаций
-- из ingredient_groups, которых в нём нет (description заполнить позже)
-- ============================================================

INSERT INTO subgroups ("group", subgroup, subgroup2)
SELECT DISTINCT ig."group", ig.subgroup, ig.subgroup2
FROM ingredient_groups ig
WHERE NOT EXISTS (
  SELECT 1 FROM subgroups s
  WHERE s."group" = ig."group"
    AND s.subgroup IS NOT DISTINCT FROM ig.subgroup
    AND s.subgroup2 IS NOT DISTINCT FROM ig.subgroup2
);

COMMIT;

-- ============================================================
-- ПРОВЕРКИ после запуска
-- ============================================================
-- Осталось непривязанных (ожидаем ~250):
-- SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id IS NULL;
--
-- Сколько ингредиентов с концентрацией слито (смотрим лог временной таблицы нельзя,
-- но можно проверить, что таких имён не осталось):
-- SELECT COUNT(*) FROM ingredients WHERE inci_name ~* '\d+\s*([.,]\d+)?\s*(ppm|ppb|%|iu)';
--
-- Топ оставшихся:
-- SELECT raw_inci_name, COUNT(*) FROM product_ingredients
-- WHERE ingredient_id IS NULL
-- GROUP BY raw_inci_name ORDER BY COUNT(*) DESC LIMIT 30;
