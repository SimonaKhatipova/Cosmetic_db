-- ============================================================
-- 013_ocr_spaces.sql — 2026-06-12 (финальный авто-проход)
-- Закрывает OCR-разрывы посреди слов («MA GNESIUM», «Polygl yceryl»,
-- «Benzylalcohol») удалением ВСЕХ небуквенно-цифровых символов из ключа.
-- Безопасность: ключ должен быть длиной >= 4, кандидат ровно один.
-- Проверено dry-run: 49 совпадений, все корректны.
-- Остаток (~83) — настоящий мусор парсинга («чеснока», «краситель
-- оранжевый», обрывки), привязке не подлежит, чистится только вручную.
-- ============================================================

BEGIN;

-- Словарь: агрессивный ключ = только [a-z0-9/], транслит кириллицы,
-- не-ASCII и скобки вырезаны, концентрация уже отсутствует у canonical
CREATE TEMP TABLE dict_v4 ON COMMIT DROP AS
SELECT key, MIN(id) AS ingredient_id FROM (
  SELECT id, regexp_replace(
    regexp_replace(regexp_replace(
      replace(replace(replace(
        translate(lower(inci_name),'авекмнорстухАВЕКМНОРСТУХ','abekmhopctyxabekmhopctyx'),
      '_',''),'-',''),'*',''),
    '[^ -~]','','g'), '\([^)]*\)','','g'),
  '[^a-z0-9/]','','g') AS key
  FROM ingredients
  UNION ALL
  SELECT i.id, regexp_replace(
    regexp_replace(regexp_replace(
      replace(replace(replace(
        translate(lower(a),'авекмнорстухАВЕКМНОРСТУХ','abekmhopctyxabekmhopctyx'),
      '_',''),'-',''),'*',''),
    '[^ -~]','','g'), '\([^)]*\)','','g'),
  '[^a-z0-9/]','','g')
  FROM ingredients i, unnest(string_to_array(i.aliases,'|')) a
  WHERE i.aliases IS NOT NULL
) t WHERE length(key) >= 4
GROUP BY key
HAVING COUNT(DISTINCT id) = 1;

CREATE TEMP TABLE pi_keys_v4 ON COMMIT DROP AS
SELECT pi.id AS pi_id, regexp_replace(
  regexp_replace(regexp_replace(
    replace(replace(replace(
      translate(lower(pi.raw_inci_name),'авекмнорстухАВЕКМНОРСТУХ','abekmhopctyxabekmhopctyx'),
    '_',''),'-',''),'*',''),
  '[^ -~]','','g'), '\([^)]*\)','','g'),
'[^a-z0-9/]','','g') AS key
FROM product_ingredients pi
WHERE pi.ingredient_id IS NULL;

UPDATE product_ingredients pi
SET ingredient_id = d.ingredient_id,
    match_source = 'ocr_backfill'
FROM pi_keys_v4 pk
JOIN dict_v4 d ON d.key = pk.key
WHERE pi.id = pk.pi_id
  AND length(pk.key) >= 4;

COMMIT;

-- ============================================================
-- ПРОВЕРКИ
-- ============================================================
-- SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id IS NULL;  -- ожидаем ~83
-- SELECT match_source, COUNT(*) FROM product_ingredients
-- WHERE match_source IS NOT NULL GROUP BY match_source ORDER BY 2 DESC;
