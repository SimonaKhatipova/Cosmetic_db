-- ============================================================
-- 011_dedupe_final.sql — 2026-06-12 (v2: без $$-функций,
-- SQL-редактор Supabase их не переваривает)
-- Добивка после 010:
-- 1) Слияние дефисных/бездефисных двойников (включая созданных в 010)
-- 2) Слияние тёзок и семей дублей (Oenothera, Jojoba, Zea Mays...)
-- 3) Остатки с концентрацией в имени: merge → canonical или rename
-- 4) Создание 4 реально отсутствующих растительных экстрактов
-- 5) Финальный backfill с улучшенным ключом:
--    кириллические двойники, подчёркивания, слэши, числа с пробелом
-- ============================================================

BEGIN;

-- ============================================================
-- БЛОК 1-2. Слияние дублей: (dup_id → canon_id)
-- ============================================================

CREATE TEMP TABLE merge_pairs (dup_id int8, canon_id int8) ON COMMIT DROP;
INSERT INTO merge_pairs VALUES
  -- бездефисные двойники → созданные в 010 (с группами и INCI-именами)
  (2020, 5093),  -- Coco Caprylate/Caprate → Coco-Caprylate/Caprate
  (4000, 5102),  -- Meadowfoam Delta Lactone → Meadowfoam Delta-Lactone
  (4028, 5097),  -- Peg 45M → PEG-45M
  (4597, 5095),  -- Polyacrylate 13 → Polyacrylate-13
  (4452, 5096),  -- Polyether 1 → Polyether-1
  (4779, 5104),  -- O Cymen 5 Ol → Isopropyl Methylphenol
  -- тёзки и опечатки
  (1566, 2498),  -- Decolorized Aloe Barbadensis Leaf Juice (дубль)
  (2252, 184),   -- Melaleuca Alternifolia (Tea Tree) Extract (дубль)
  (1742, 184),   -- MELALEUCA ALTERNIFOLIA EXTRACT
  (1750, 79),    -- Melaleuca Alternifolia Leaf Extract → (tea Tree) Leaf Extract
  (2411, 1944),  -- Superoxide Dismutase (дубль)
  (1835, 154),   -- VITIS VINIFERA FRUIT EXTRACT → Vitis Vinifera Fruit Extract
  (2885, 428),   -- Cera Alba → Beeswax (синонимы INCI)
  -- семья Oenothera (одно масло — примула вечерняя)
  (2710, 2690), (4687, 2690), (2657, 2690), (1159, 2690),
  -- семья Jojoba Seed Oil
  (3927, 1156), (2654, 1156),
  -- семья Zea Mays Starch
  (3175, 791), (3180, 791),
  -- Polysilicon 15 → Polysilicone-15
  (4428, 3245);

UPDATE product_ingredients pi
SET ingredient_id = mp.canon_id
FROM merge_pairs mp
WHERE pi.ingredient_id = mp.dup_id;

UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || agg.merged
FROM (
  SELECT mp.canon_id,
         string_agg(d.inci_name || COALESCE('|' || d.aliases, ''), '|') AS merged
  FROM merge_pairs mp
  JOIN ingredients d ON d.id = mp.dup_id
  GROUP BY mp.canon_id
) agg
WHERE i.id = agg.canon_id;

DELETE FROM ingredient_groups WHERE ingredient_id IN (SELECT dup_id FROM merge_pairs);
DELETE FROM ingredients       WHERE id            IN (SELECT dup_id FROM merge_pairs);

-- Точечные правки имён и алиасов
UPDATE ingredients
SET inci_name = 'Vitis Vinifera (Grape) Fruit Extract',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Vitis Vinifera (crape) Fruit Extract'
WHERE id = 154 AND inci_name <> 'Vitis Vinifera (Grape) Fruit Extract';

UPDATE ingredients
SET inci_name = 'PEG-8/SMDI Copolymer',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Peg_8/Smdi Copolymer'
WHERE id = 3169 AND inci_name = 'Peg_8/Smdi Copolymer';

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Bees Wax'
WHERE id = 428 AND aliases NOT LIKE '%Bees Wax%';

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Polyacrilate Crosspolymer-6'
WHERE id = 3132 AND (aliases IS NULL OR aliases NOT LIKE '%Polyacrilate%');

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Phytosteryl/Behenyl/Octyldodecyl Lauroyl Glutamate'
WHERE id = 692 AND (aliases IS NULL OR aliases NOT LIKE '%Octyldodecyl Lauroyl%');

-- ============================================================
-- БЛОК 3. Остатки с концентрацией в имени
-- ============================================================

-- 3.1 Продуктовые названия, попавшие в ингредиенты (0 продуктов) — удалить
DELETE FROM ingredient_groups WHERE ingredient_id IN (4933, 5039, 5037);
DELETE FROM ingredients WHERE id IN (4933, 5039, 5037)
  AND NOT EXISTS (SELECT 1 FROM product_ingredients WHERE ingredient_id = ingredients.id);

-- 3.2 Merge v2: нормализованный ключ ингредиента-с-концентрацией совпадает
--     с именем или алиасом чистого ингредиента (однозначно)
CREATE TEMP TABLE ing_keys1 ON COMMIT DROP AS
SELECT id, has_conc, key FROM (
  SELECT id,
    inci_name ~* '\d+\s*([.,\s]\d+)*\s*(ppm|ppb|%|iu)' AS has_conc,
    regexp_replace(trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(replace(replace(
              translate(lower(inci_name),
                'авекмнорстухАВЕКМНОРСТУХ',
                'abekmhopctyxabekmhopctyx'),
            '_', ' '), '-', ' '), '*', ' '),
          '\([^)]*\)', ' ', 'g'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
      '\s*/\s*', '/', 'g')
    ), '\s+', ' ', 'g') AS key
  FROM ingredients
  UNION ALL
  SELECT i.id,
    i.inci_name ~* '\d+\s*([.,\s]\d+)*\s*(ppm|ppb|%|iu)',
    regexp_replace(trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(replace(replace(
              translate(lower(a),
                'авекмнорстухАВЕКМНОРСТУХ',
                'abekmhopctyxabekmhopctyx'),
            '_', ' '), '-', ' '), '*', ' '),
          '\([^)]*\)', ' ', 'g'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
      '\s*/\s*', '/', 'g')
    ), '\s+', ' ', 'g')
  FROM ingredients i, unnest(string_to_array(i.aliases, '|')) a
  WHERE i.aliases IS NOT NULL
) t WHERE key <> '';

CREATE TEMP TABLE conc_merge2 ON COMMIT DROP AS
WITH clean_dict AS (
  SELECT key, MIN(id) AS canon_id
  FROM ing_keys1
  WHERE NOT has_conc
  GROUP BY key
  HAVING COUNT(DISTINCT id) = 1
)
SELECT DISTINCT k.id AS dup_id, c.canon_id, i.inci_name AS dup_name
FROM ing_keys1 k
JOIN ingredients i ON i.id = k.id
JOIN clean_dict c ON c.key = k.key
WHERE k.has_conc AND k.id <> c.canon_id;

UPDATE product_ingredients pi
SET ingredient_id = cm.canon_id
FROM conc_merge2 cm
WHERE pi.ingredient_id = cm.dup_id;

UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || agg.names
FROM (SELECT canon_id, string_agg(DISTINCT dup_name, '|') AS names
      FROM conc_merge2 GROUP BY canon_id) agg
WHERE i.id = agg.canon_id;

DELETE FROM ingredient_groups WHERE ingredient_id IN (SELECT dup_id FROM conc_merge2);
DELETE FROM ingredients       WHERE id            IN (SELECT dup_id FROM conc_merge2);

-- 3.3 Rename: у кого чистого аналога нет — концентрация уходит из имени в алиас
UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || i.inci_name,
    inci_name = trim(regexp_replace(regexp_replace(i.inci_name,
      '\s*\(\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*\)\s*', ' ', 'gi'),
      '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'))
WHERE i.inci_name ~* '\d+\s*([.,\s]\d+)*\s*(ppm|ppb|%|iu)'
  AND trim(regexp_replace(regexp_replace(i.inci_name,
      '\s*\(\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*\)\s*', ' ', 'gi'),
      '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')) <> ''
  AND NOT EXISTS (
    SELECT 1 FROM ingredients x
    WHERE x.id <> i.id
      AND lower(x.inci_name) = lower(trim(regexp_replace(regexp_replace(i.inci_name,
        '\s*\(\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*\)\s*', ' ', 'gi'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i')))
  );

-- ============================================================
-- БЛОК 4. Реально отсутствующие ингредиенты (проверить группы!)
-- ============================================================

WITH new_ing(inci_name, ru_name) AS (VALUES
  ('Aesculus Hippocastanum Fruit Extract', 'Экстракт плодов конского каштана'),
  ('Chrysanthellum Indicum Extract', 'Экстракт хризантеллума индийского'),
  ('Paullinia Cupana Fruit Extract', 'Экстракт плодов гуараны'),
  ('Taraxacum Officinale Root Extract', 'Экстракт корня одуванчика')
),
ins AS (
  INSERT INTO ingredients (inci_name, ru_name, is_verified)
  SELECT n.inci_name, n.ru_name, false
  FROM new_ing n
  WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE lower(i.inci_name) = lower(n.inci_name))
  RETURNING id
)
INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, is_primary)
SELECT id, 'Антиоксиданты', 'Растительные экстракты', true FROM ins;

-- ============================================================
-- БЛОК 5. Финальный backfill с улучшенным ключом
-- (словарь строится заново — после слияний и переименований)
-- ============================================================

CREATE TEMP TABLE norm_dict2 ON COMMIT DROP AS
SELECT key, MIN(id) AS ingredient_id FROM (
  SELECT id,
    regexp_replace(trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(replace(replace(
              translate(lower(inci_name),
                'авекмнорстухАВЕКМНОРСТУХ',
                'abekmhopctyxabekmhopctyx'),
            '_', ' '), '-', ' '), '*', ' '),
          '\([^)]*\)', ' ', 'g'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
      '\s*/\s*', '/', 'g')
    ), '\s+', ' ', 'g') AS key
  FROM ingredients
  UNION ALL
  SELECT i.id,
    regexp_replace(trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(replace(replace(
              translate(lower(a),
                'авекмнорстухАВЕКМНОРСТУХ',
                'abekmhopctyxabekmhopctyx'),
            '_', ' '), '-', ' '), '*', ' '),
          '\([^)]*\)', ' ', 'g'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
      '\s*/\s*', '/', 'g')
    ), '\s+', ' ', 'g')
  FROM ingredients i, unnest(string_to_array(i.aliases, '|')) a
  WHERE i.aliases IS NOT NULL
) t WHERE key <> ''
GROUP BY key
HAVING COUNT(DISTINCT id) = 1;

CREATE TEMP TABLE pi_keys ON COMMIT DROP AS
SELECT pi.id AS pi_id,
  regexp_replace(trim(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          replace(replace(replace(
            translate(lower(pi.raw_inci_name),
              'авекмнорстухАВЕКМНОРСТУХ',
              'abekmhopctyxabekmhopctyx'),
          '_', ' '), '-', ' '), '*', ' '),
        '\([^)]*\)', ' ', 'g'),
      '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
    '\s*/\s*', '/', 'g')
  ), '\s+', ' ', 'g') AS key
FROM product_ingredients pi
WHERE pi.ingredient_id IS NULL;

UPDATE product_ingredients pi
SET ingredient_id = d.ingredient_id,
    match_source = 'norm_backfill'
FROM pi_keys pk
JOIN norm_dict2 d ON d.key = pk.key
WHERE pi.id = pk.pi_id;

COMMIT;

-- ============================================================
-- ПРОВЕРКИ
-- ============================================================
-- SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id IS NULL;
-- SELECT COUNT(*) FROM ingredients WHERE inci_name ~* '\d+\s*([.,\s]\d+)*\s*(ppm|ppb|%|iu)';
-- SELECT raw_inci_name, COUNT(*) FROM product_ingredients
-- WHERE ingredient_id IS NULL
-- GROUP BY raw_inci_name ORDER BY COUNT(*) DESC LIMIT 30;
