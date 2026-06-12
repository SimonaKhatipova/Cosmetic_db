-- ============================================================
-- 009_alias_backfill.sql — слияние опечаточных дублей и массовая
-- привязка unmatched-строк по алиасам. 2026-06-12.
-- Запускать ПОСЛЕ 008. Идемпотентен.
-- Ожидаемый эффект: ~650 из 1403 unmatched-строк получат ingredient_id.
-- ============================================================

BEGIN;

-- ============================================================
-- БЛОК 1. Исправление ошибки: у «BHA» (2221) стоит алиас «BHT».
-- BHA и BHT — разные вещества. Убираем неверный алиас,
-- добавляем правильные синонимы BHA.
-- ============================================================

UPDATE ingredients
SET aliases = 'Butylhydroxyanisole|Butylated Hydroxyanisole|Butylated Hydroxyanisole (BHA)'
WHERE id = 2221 AND inci_name = 'BHA';

-- Дубли BHA без продуктов → слить в 2221
DELETE FROM ingredient_groups WHERE ingredient_id IN (1020, 3654);
DELETE FROM ingredients WHERE id IN (1020, 3654);

-- ============================================================
-- БЛОК 2. Дубль BHT: Butylhydroxytoluol (919) → Butylhydroxytoluene (1018)
-- После этого алиас «BHT» станет однозначным → 31 строка закроется в блоке 5.
-- ============================================================

UPDATE product_ingredients SET ingredient_id = 1018 WHERE ingredient_id = 919;
DELETE FROM ingredient_groups WHERE ingredient_id = 919;
DELETE FROM ingredients WHERE id = 919;

-- ============================================================
-- БЛОК 3. Прочие опечаточные пары-дубли
-- ============================================================

-- Bacuchiol (915, опечатка) → Bakuchiol (5092)
UPDATE product_ingredients SET ingredient_id = 5092 WHERE ingredient_id = 915;
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Bacuchiol'
WHERE id = 5092 AND aliases NOT LIKE '%Bacuchiol%';
DELETE FROM ingredient_groups WHERE ingredient_id = 915;
DELETE FROM ingredients WHERE id = 915;

-- Buthylene Glycol (946, опечатка) → Butylene Glycol (383)
UPDATE product_ingredients SET ingredient_id = 383 WHERE ingredient_id = 946;
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Buthylene Glycol'
WHERE id = 383 AND aliases NOT LIKE '%Buthylene%';
DELETE FROM ingredient_groups WHERE ingredient_id = 946;
DELETE FROM ingredients WHERE id = 946;

-- B-Carotene (2228) → Beta Carotene (1025); алиас b-Carotene у 1025 уже есть
UPDATE product_ingredients SET ingredient_id = 1025 WHERE ingredient_id = 2228;
DELETE FROM ingredient_groups WHERE ingredient_id = 2228;
DELETE FROM ingredients WHERE id = 2228;

-- Aloe Barbadenis Extract (2577, опечатка) → Aloe Barbadensis Extract (1589)
UPDATE product_ingredients SET ingredient_id = 1589 WHERE ingredient_id = 2577;
DELETE FROM ingredient_groups WHERE ingredient_id = 2577;
DELETE FROM ingredients WHERE id = 2577;

-- Arnica Montana Axtract (943, опечатка) → Arnica Montana Flower Extract (1126)
UPDATE product_ingredients SET ingredient_id = 1126 WHERE ingredient_id = 943;
DELETE FROM ingredient_groups WHERE ingredient_id = 943;
DELETE FROM ingredients WHERE id = 943;

-- ============================================================
-- БЛОК 4. Backfill: точное совпадение inci_name без учёта регистра
-- (только когда кандидат ровно один)
-- ============================================================

WITH name_map AS (
  SELECT lower(inci_name) AS lname, MIN(id) AS ingredient_id
  FROM ingredients
  GROUP BY lower(inci_name)
  HAVING COUNT(*) = 1
)
UPDATE product_ingredients pi
SET ingredient_id = nm.ingredient_id,
    match_source = 'case_backfill'
FROM name_map nm
WHERE pi.ingredient_id IS NULL
  AND nm.lname = lower(trim(pi.raw_inci_name));

-- ============================================================
-- БЛОК 5. Backfill: совпадение по алиасу
-- (только однозначные алиасы — указывающие ровно на 1 ингредиент)
-- ============================================================

WITH alias_map AS (
  SELECT lower(trim(a)) AS alias, MIN(i.id) AS ingredient_id
  FROM ingredients i, unnest(string_to_array(i.aliases, '|')) AS a
  WHERE i.aliases IS NOT NULL AND trim(a) <> ''
  GROUP BY lower(trim(a))
  HAVING COUNT(DISTINCT i.id) = 1
)
UPDATE product_ingredients pi
SET ingredient_id = am.ingredient_id,
    match_source = 'alias_backfill'
FROM alias_map am
WHERE pi.ingredient_id IS NULL
  AND am.alias = lower(trim(pi.raw_inci_name));

COMMIT;

-- ============================================================
-- ПРОВЕРКА после запуска
-- ============================================================
-- Сколько осталось непривязанных (ожидаем ~700-750 вместо 1403):
-- SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id IS NULL;
--
-- Что закрылось бэкфиллом:
-- SELECT match_source, COUNT(*) FROM product_ingredients
-- WHERE match_source IN ('case_backfill', 'alias_backfill')
-- GROUP BY match_source;
--
-- Топ оставшихся непривязанных:
-- SELECT raw_inci_name, COUNT(*) FROM product_ingredients
-- WHERE ingredient_id IS NULL
-- GROUP BY raw_inci_name ORDER BY COUNT(*) DESC LIMIT 30;
