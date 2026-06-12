-- ============================================================
-- 012_final_polish.sql — 2026-06-12
-- Финальная полировка после 011 (193 unmatched → ожидаем < 100):
-- 1) Явные слияния: близнецы PEG-7/Polyglyceryl-4/Polysilicone,
--    Helianthus, Hedera, 8 остатков с концентрацией
-- 2) Generic-слияние оставшихся коллизий простого ключа
-- 3) Прямые привязки одиночных опечаток + алиасы
-- 4) Создание 5 отсутствующих ингредиентов
-- 5) Финальный backfill: ключ v3 — добавлено удаление невидимых
--    Unicode-символов (U+2060 и пр.) и всего не-ASCII
-- ============================================================

BEGIN;

-- ============================================================
-- БЛОК 1. Явные слияния (dup_id → canon_id)
-- ============================================================

CREATE TEMP TABLE merge_pairs (dup_id int8, canon_id int8) ON COMMIT DROP;
INSERT INTO merge_pairs VALUES
  -- близнецы созданных в 010
  (4143, 5099),  -- Peg 7 Propylheptyl Ether → PEG-7 Propylheptyl Ether
  (4692, 5100),  -- Polyglyceryl 4 Isostearate → Polyglyceryl-4 Isostearate
  (4184, 5098),  -- Polysilicone 13 → Polysilicone-13
  -- тёзки после скобочной нормализации
  (2313, 272),   -- Helianthus Annuus Seed Extract → (sunflower) Seed Extract
  (1710, 227),   -- HEDERA HELIX LEAF/STEM EXTRACT → Hedera Helix (ivy) Leaf/Stem
  -- остатки с концентрацией в имени → чистые canonical
  (4928, 1113),  -- Centella Asiatica Extract(4315Ppm)
  (5012, 68),    -- Citrus Limon (Lemon) Fruit Extract (560000 Ppm)
  (4703, 2154),  -- Niacinamide (4%)
  (1013, 2154),  -- Niacinamide 10.0%
  (5005, 2154),  -- Niacinamide(15%)
  (4533, 559),   -- Rosa Damascena Flower Water (3 Ppb)
  (4967, 2199),  -- Tocopherol (2Ppm)
  (4849, 2199);  -- Tocopherol (31Ppm)

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

-- ============================================================
-- БЛОК 2. Generic-слияние оставшихся коллизий простого ключа
-- (регистр/дефисы/подчёркивания/пробелы; canonical = больше
-- продуктов, при равенстве меньший id)
-- ============================================================

CREATE TEMP TABLE key_merge ON COMMIT DROP AS
WITH keys AS (
  SELECT i.id,
    regexp_replace(trim(replace(replace(replace(lower(i.inci_name), '_',' '), '-',' '), '*',' ')), '\s+', ' ', 'g') AS key,
    (SELECT COUNT(*) FROM product_ingredients pi WHERE pi.ingredient_id = i.id) AS products
  FROM ingredients i
),
ranked AS (
  SELECT id, key, products,
    ROW_NUMBER() OVER (PARTITION BY key ORDER BY products DESC, id ASC) AS rn,
    FIRST_VALUE(id) OVER (PARTITION BY key ORDER BY products DESC, id ASC) AS canon_id
  FROM keys
  WHERE key IN (SELECT key FROM keys GROUP BY key HAVING COUNT(*) > 1)
)
SELECT r.id AS dup_id, r.canon_id, i.inci_name AS dup_name
FROM ranked r
JOIN ingredients i ON i.id = r.id
WHERE r.rn > 1;

UPDATE product_ingredients pi
SET ingredient_id = km.canon_id
FROM key_merge km
WHERE pi.ingredient_id = km.dup_id;

UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || agg.names
FROM (SELECT canon_id, string_agg(DISTINCT dup_name, '|') AS names
      FROM key_merge GROUP BY canon_id) agg
WHERE i.id = agg.canon_id;

DELETE FROM ingredient_groups WHERE ingredient_id IN (SELECT dup_id FROM key_merge);
DELETE FROM ingredients       WHERE id            IN (SELECT dup_id FROM key_merge);

-- ============================================================
-- БЛОК 3. Прямые привязки одиночных опечаток + алиасы canonical
-- ============================================================

CREATE TEMP TABLE typo_map (raw text, canon_id int8) ON COMMIT DROP;
INSERT INTO typo_map VALUES
  ('Diisostearylmalate', 2611),                          -- Diisostearyl malate
  ('Stear Trimonium Chloride', 45),                      -- Steartrimonium Chloride
  ('Oligopeptide1', 3363),                               -- Oligopeptide-1
  ('Vito''s Vinifera (grape) Seed Extract', 106),        -- Vitis Vinifera (grape) Seed Extract
  ('Olea Europaea (Olive) Oit', 1458),                   -- Olea Europaea (Olive) Oil
  ('Clyceryl Stearate', 593),                            -- Glyceryl Stearate
  ('Ethyl Ascorbyl Ether', 2188),                        -- 3-O-Ethyl Ascorbic Acid (синоним)
  ('Sodium Polyacryloyl Dimethyl Taurate', 3122),        -- Sodium Polyacryloyldimethyl Taurate
  ('экстрак семян Brassica Juncea (горчицы)', 4051);     -- Brassica Juncea Seed Extract

UPDATE product_ingredients pi
SET ingredient_id = tm.canon_id
FROM typo_map tm
WHERE pi.ingredient_id IS NULL
  AND pi.raw_inci_name = tm.raw;

-- те же варианты — в алиасы, чтобы будущий импорт их находил
UPDATE ingredients i
SET aliases = COALESCE(NULLIF(i.aliases, '') || '|', '') || agg.raws
FROM (SELECT canon_id, string_agg(raw, '|') AS raws FROM typo_map GROUP BY canon_id) agg
WHERE i.id = agg.canon_id
  AND (i.aliases IS NULL OR position(agg.raws in i.aliases) = 0);

-- Мусорная строка парсинга — удалить
DELETE FROM product_ingredients
WHERE ingredient_id IS NULL
  AND trim(raw_inci_name) = 'и еще половина состава.';

-- ============================================================
-- БЛОК 4. Реально отсутствующие ингредиенты (проверить группы!)
-- ============================================================

WITH new_ing(inci_name, ru_name, grp, sub) AS (VALUES
  ('Morus Alba Root Extract', 'Экстракт корня шелковицы белой', 'Антиоксиданты', 'Растительные экстракты'),
  ('Menthyl Polylactate', 'Ментил полилактат (охлаждающий)', 'Активные компоненты', 'Охлаждающие'),
  ('Acetylated Glycol Stearate', 'Ацетилированный гликоль стеарат', 'Эмоленты', 'Эфиры жирных кислот'),
  ('Solidago Virgaurea (Goldenrod) Extract', 'Экстракт золотарника', 'Антиоксиданты', 'Растительные экстракты'),
  ('Ethylene/Propylene/Styrene Copolymer', 'Этилен/пропилен/стирол сополимер', 'Структурообразователи', 'Загустители, гелеобразователи')
),
ins AS (
  INSERT INTO ingredients (inci_name, ru_name, is_verified)
  SELECT n.inci_name, n.ru_name, false
  FROM new_ing n
  WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE lower(i.inci_name) = lower(n.inci_name))
  RETURNING id, inci_name
)
INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, is_primary)
SELECT ins.id, n.grp, n.sub, true
FROM ins JOIN new_ing n ON n.inci_name = ins.inci_name;

-- ============================================================
-- БЛОК 5. Финальный backfill — ключ v3:
-- транслит кириллических двойников → затем ВСЁ не-ASCII в пробел
-- (убивает U+2060, zero-width, длинные тире и пр.)
-- ============================================================

CREATE TEMP TABLE norm_dict3 ON COMMIT DROP AS
SELECT key, MIN(id) AS ingredient_id FROM (
  SELECT id,
    regexp_replace(trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(
              replace(replace(replace(
                translate(lower(inci_name),
                  'авекмнорстухАВЕКМНОРСТУХ',
                  'abekmhopctyxabekmhopctyx'),
              '_', ' '), '-', ' '), '*', ' '),
            '[^ -~]', ' ', 'g'),
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
            regexp_replace(
              replace(replace(replace(
                translate(lower(a),
                  'авекмнорстухАВЕКМНОРСТУХ',
                  'abekmhopctyxabekmhopctyx'),
              '_', ' '), '-', ' '), '*', ' '),
            '[^ -~]', ' ', 'g'),
          '\([^)]*\)', ' ', 'g'),
        '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
      '\s*/\s*', '/', 'g')
    ), '\s+', ' ', 'g')
  FROM ingredients i, unnest(string_to_array(i.aliases, '|')) a
  WHERE i.aliases IS NOT NULL
) t WHERE key <> ''
GROUP BY key
HAVING COUNT(DISTINCT id) = 1;

CREATE TEMP TABLE pi_keys3 ON COMMIT DROP AS
SELECT pi.id AS pi_id,
  regexp_replace(trim(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(replace(replace(
              translate(lower(pi.raw_inci_name),
                'авекмнорстухАВЕКМНОРСТУХ',
                'abekmhopctyxabekmhopctyx'),
            '_', ' '), '-', ' '), '*', ' '),
          '[^ -~]', ' ', 'g'),
        '\([^)]*\)', ' ', 'g'),
      '\s*\d+([\.,\s]\d+)*\s*(ppm|ppb|%|iu/?g?)\s*$', '', 'i'),
    '\s*/\s*', '/', 'g')
  ), '\s+', ' ', 'g') AS key
FROM product_ingredients pi
WHERE pi.ingredient_id IS NULL;

UPDATE product_ingredients pi
SET ingredient_id = d.ingredient_id,
    match_source = 'norm_backfill'
FROM pi_keys3 pk
JOIN norm_dict3 d ON d.key = pk.key
WHERE pi.id = pk.pi_id;

COMMIT;

-- ============================================================
-- ПРОВЕРКИ
-- ============================================================
-- SELECT COUNT(*) FROM product_ingredients WHERE ingredient_id IS NULL;
-- SELECT COUNT(*) FROM ingredients WHERE inci_name ~* '\d+\s*([.,\s]\d+)*\s*(ppm|ppb|%|iu)';
-- SELECT raw_inci_name, COUNT(*) FROM product_ingredients
-- WHERE ingredient_id IS NULL
-- GROUP BY raw_inci_name ORDER BY COUNT(*) DESC LIMIT 40;
