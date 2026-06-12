-- ============================================================
-- 008_data_cleanup.sql — чистка данных по итогам аудита 2026-06-12
-- Запускать целиком в Supabase Dashboard → SQL Editor.
-- Все блоки идемпотентны: повторный запуск ничего не сломает.
-- ============================================================

BEGIN;

-- ============================================================
-- БЛОК 1. Группы для новых canonical Retinol (5091) и Bakuchiol (5092)
-- В справочнике subgroups уже есть точные категории.
-- ============================================================

INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, subgroup2, is_primary)
SELECT i.id, 'Витамины', 'Жирорастворимые формы', 'Витамин A (Ретиноиды)', true
FROM ingredients i
WHERE i.inci_name = 'Retinol'
  AND NOT EXISTS (SELECT 1 FROM ingredient_groups ig WHERE ig.ingredient_id = i.id);

INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, subgroup2, is_primary)
SELECT i.id, 'Витамины', 'Жирорастворимые формы', 'Бакучиол', true
FROM ingredients i
WHERE i.inci_name = 'Bakuchiol'
  AND NOT EXISTS (SELECT 1 FROM ingredient_groups ig WHERE ig.ingredient_id = i.id);

-- ============================================================
-- БЛОК 2. ppm-дубли остальных ретиноидов → canonical
-- Canonical: Retinal=53, Retinyl Retinoate=2208,
--            Hydroxypinacolone Retinoate=2205, Retinyl Palmitate=3695
-- ============================================================

-- 2.1 Перепривязать продукты
UPDATE product_ingredients SET ingredient_id = 53
WHERE ingredient_id IN (4756, 4768, 4848, 4985);          -- Retinal (50 Ppb / 0 1% / 100 Ppm / The Ordinary...)

UPDATE product_ingredients SET ingredient_id = 2208
WHERE ingredient_id = 4757;                                -- Retinyl Retinoate (30 Ppb)

UPDATE product_ingredients SET ingredient_id = 2205
WHERE ingredient_id IN (4758, 4770, 4983, 4993);           -- Hydroxypinacolone Retinoate (+ опечатка Hydroxyinapcinolone)

UPDATE product_ingredients SET ingredient_id = 3695
WHERE ingredient_id IN (4749, 4754);                       -- Retinyl Palmitate (2 36% / 10000 Iu/G)

-- 2.2 Алиасы на canonical
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Retinal (50 Ppb)|Retinal (0 1%)|Retinal (100 Ppm)'
WHERE id = 53 AND (aliases IS NULL OR aliases NOT LIKE '%Retinal (50 Ppb)%');

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Retinyl Retinoate (30 Ppb)'
WHERE id = 2208 AND (aliases IS NULL OR aliases NOT LIKE '%Retinyl Retinoate (30 Ppb)%');

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Hydroxypinacolone Retinoate (10 Ppb)|Hydroxypinacolone Retinoate (1000 Ppm)|Hydroxypinacolone Retinoate (0 7%)|Hydroxyinapcinolone Retinoate'
WHERE id = 2205 AND (aliases IS NULL OR aliases NOT LIKE '%Hydroxyinapcinolone%');

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '')
    || 'Retinyl Palmitate(2 36%)|Retinyl Palmitate (10000 Iu/G)'
WHERE id = 3695 AND (aliases IS NULL OR aliases NOT LIKE '%Retinyl Palmitate(2 36%%');

-- 2.3 Удалить ppm-дубли (группы, потом сами записи)
DELETE FROM ingredient_groups
WHERE ingredient_id IN (4749, 4754, 4756, 4757, 4758, 4768, 4770, 4848, 4983, 4985, 4993);

DELETE FROM ingredients
WHERE id IN (4749, 4754, 4756, 4757, 4758, 4768, 4770, 4848, 4983, 4985, 4993);

-- ============================================================
-- БЛОК 3. Retinyl Palmitate (3695): неверная группа «Консерванты»
-- Все остальные ретиноиды — в «Витамины / Жирорастворимые формы /
-- Витамин A (Ретиноиды)». Меняем primary-группу, secondary убираем.
-- ============================================================

UPDATE ingredient_groups
SET "group" = 'Витамины',
    subgroup = 'Жирорастворимые формы',
    subgroup2 = 'Витамин A (Ретиноиды)'
WHERE ingredient_id = 3695 AND is_primary = true;

DELETE FROM ingredient_groups
WHERE ingredient_id = 3695 AND is_primary = false;

-- ============================================================
-- БЛОК 4. Alcohol Denat. (5057, 36 продуктов) — дубль id 353 «Alcohol denat»
-- ============================================================

UPDATE product_ingredients SET ingredient_id = 353 WHERE ingredient_id = 5057;

UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Alcohol Denat.'
WHERE id = 353 AND (aliases IS NULL OR aliases NOT LIKE '%Alcohol Denat.%');

DELETE FROM ingredient_groups WHERE ingredient_id = 5057;
DELETE FROM ingredients WHERE id = 5057;

-- ============================================================
-- БЛОК 5. Hydrolyzed Wheat/Oat Proteins — дубли canonical 979/981
-- (алиасы «...Proteins» у canonical уже прописаны)
-- ============================================================

UPDATE product_ingredients SET ingredient_id = 979 WHERE ingredient_id = 5064;  -- Wheat
UPDATE product_ingredients SET ingredient_id = 981 WHERE ingredient_id = 5066;  -- Oat

DELETE FROM ingredient_groups WHERE ingredient_id IN (5064, 5066);
DELETE FROM ingredients WHERE id IN (5064, 5066);

-- ============================================================
-- БЛОК 6. Новые ингредиенты без группы — задать группы
-- ============================================================

-- Coco-Glucoside (5069, 52 продукта): нормализуем имя + группа ПАВ/Неионогенные
UPDATE ingredients
SET inci_name = 'Coco-Glucoside',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'COCO-GLUCOSIDE'
WHERE id = 5069 AND inci_name = 'COCO-GLUCOSIDE';

INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, is_primary)
SELECT 5069, 'ПАВ', 'Неионогенные', true
WHERE NOT EXISTS (SELECT 1 FROM ingredient_groups WHERE ingredient_id = 5069);

-- Sodium Coco-Sulfate (5082, 20 продуктов): жёсткий анионный сульфат
INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, subgroup2, is_primary)
SELECT 5082, 'ПАВ', 'Анионные ПАВ', 'Жесткие', true
WHERE NOT EXISTS (SELECT 1 FROM ingredient_groups WHERE ingredient_id = 5082);

-- Hydrolyzed Rye Proteins (5065, 3 продукта): нормализуем имя + группа
UPDATE ingredients
SET inci_name = 'Hydrolyzed Rye Protein',
    aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Hydrolyzed Rye Proteins'
WHERE id = 5065 AND inci_name = 'Hydrolyzed Rye Proteins';

INSERT INTO ingredient_groups (ingredient_id, "group", subgroup, is_primary)
SELECT 5065, 'Протеины', 'Гидролизованные протеины', true
WHERE NOT EXISTS (SELECT 1 FROM ingredient_groups WHERE ingredient_id = 5065);

-- ============================================================
-- БЛОК 7. Мелкий мусор среди новых записей (0 продуктов)
-- ============================================================

-- «Pantheno» — обрезанный Panthenol (canonical 2157)
UPDATE ingredients
SET aliases = COALESCE(NULLIF(aliases, '') || '|', '') || 'Pantheno'
WHERE id = 2157 AND aliases NOT LIKE '%|Pantheno%';
DELETE FROM ingredients WHERE id = 5085 AND inci_name = 'Pantheno';

-- Дубли Parfum (алиасы у 1776 уже есть) и обрывок «Chloride»
DELETE FROM ingredients WHERE id IN (5080, 5084, 5087)
  AND NOT EXISTS (SELECT 1 FROM product_ingredients WHERE ingredient_id = ingredients.id);

-- ppm-обрывки «800 Ppm)» / «400Ppm)» (если ещё не удалены)
DELETE FROM ingredient_groups WHERE ingredient_id IN (4580, 4589);
DELETE FROM ingredients WHERE id IN (4580, 4589);

-- Мусорные строки составов: обрывки парсинга
DELETE FROM product_ingredients
WHERE ingredient_id IS NULL
  AND raw_inci_name IN ('pp', 'SS', 'BI', 'BG', 'п', '400ppm)', '800 ppm)');

-- OCR-артефакты с «_» в начале имени
UPDATE ingredients SET inci_name = 'Quinoa Extract'
WHERE id = 2053 AND inci_name = '_quinoa Extract';
UPDATE ingredients SET inci_name = 'Octyldodecyl Lauroyl Glutamate'
WHERE id = 4182 AND inci_name = '_Octyldodecyl Lauroyl Glutamate';

-- ============================================================
-- БЛОК 8. Дубли продуктов (5 пар, все импортированы 2026-06-12)
-- Оставляем копию с бОльшим числом ингредиентов (или меньший id
-- при равенстве). Удаляем: 1118, 1564, 1536, 1416, 1715.
-- ============================================================

DELETE FROM product_skin_types  WHERE product_id IN (1118, 1564, 1536, 1416, 1715);
DELETE FROM product_ingredients WHERE product_id IN (1118, 1564, 1536, 1416, 1715);
DELETE FROM products            WHERE id         IN (1118, 1564, 1536, 1416, 1715);

COMMIT;

-- ============================================================
-- ПРОВЕРКА после запуска (должно быть: 0 строк ppm-дублей,
-- у Retinol/Bakuchiol по 1 группе, дублей продуктов нет)
-- ============================================================
-- SELECT i.inci_name, ig."group", ig.subgroup, ig.subgroup2
-- FROM ingredients i JOIN ingredient_groups ig ON ig.ingredient_id = i.id
-- WHERE i.inci_name IN ('Retinol', 'Bakuchiol', 'Retinyl Palmitate', 'Coco-Glucoside');
--
-- SELECT name, brand, COUNT(*) FROM products
-- GROUP BY name, brand HAVING COUNT(*) > 1;
