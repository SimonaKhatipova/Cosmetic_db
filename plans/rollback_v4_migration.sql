-- ============================================================
-- ОТКАТ миграции v4 (полный возврат к состоянию до 2026-06-11)
-- Выполнять ТОЛЬКО если нужно отменить всё.
-- Бэкап-таблицы: products_bak_v4, product_ingredients_bak_v4
-- ============================================================

-- Шаг 1: Удаляем новые данные
TRUNCATE product_skin_types CASCADE;
TRUNCATE product_ingredients CASCADE;
TRUNCATE products CASCADE;

-- Шаг 2: Убираем новые колонки из products
ALTER TABLE products
  DROP COLUMN IF EXISTS product_id,
  DROP COLUMN IF EXISTS name_display,
  DROP COLUMN IF EXISTS product_type_path,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS skin_type_primary,
  DROP COLUMN IF EXISTS skin_type_alternative,
  DROP COLUMN IF EXISTS price_category,
  DROP COLUMN IF EXISTS brand_id,
  DROP COLUMN IF EXISTS flag_complex,
  DROP COLUMN IF EXISTS flag_super_formula,
  DROP COLUMN IF EXISTS validation_flag,
  DROP COLUMN IF EXISTS ingredient_count;

-- Шаг 3: Возвращаем attr_* обратно в text
ALTER TABLE products
  ALTER COLUMN attr_moisture     TYPE text USING COALESCE(attr_moisture::text,     ''),
  ALTER COLUMN attr_nutrition    TYPE text USING COALESCE(attr_nutrition::text,    ''),
  ALTER COLUMN attr_repair       TYPE text USING COALESCE(attr_repair::text,       ''),
  ALTER COLUMN attr_protection   TYPE text USING COALESCE(attr_protection::text,   ''),
  ALTER COLUMN attr_curls        TYPE text USING COALESCE(attr_curls::text,        ''),
  ALTER COLUMN attr_film         TYPE text USING COALESCE(attr_film::text,         ''),
  ALTER COLUMN attr_uva_chem     TYPE text USING COALESCE(attr_uva_chem::text,     ''),
  ALTER COLUMN attr_uvb_chem     TYPE text USING COALESCE(attr_uvb_chem::text,     ''),
  ALTER COLUMN attr_spf_physical TYPE text USING COALESCE(attr_spf_physical::text, '');

-- Шаг 4: Убираем новые колонки из ingredients
ALTER TABLE ingredients
  DROP COLUMN IF EXISTS ingredient_id,
  DROP COLUMN IF EXISTS canonical_name;

-- Шаг 5: Удаляем новые таблицы
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS ingredients_dictionary CASCADE;
DROP TABLE IF EXISTS _staging_pi;

-- Шаг 6: Восстанавливаем products из бэкапа
INSERT INTO products (
  id, name, brand, image_url, product_type, analytical_type, skin_type,
  price_rub, is_selected, source_sheet, source_row,
  attr_moisture, attr_nutrition, attr_repair, attr_protection,
  attr_curls, attr_film, attr_uva_chem, attr_uvb_chem, attr_spf_physical,
  created_at, notes, is_top, application_area
)
OVERRIDING SYSTEM VALUE
SELECT
  id, name, brand, image_url, product_type, analytical_type, skin_type,
  price_rub, is_selected, source_sheet, source_row,
  attr_moisture, attr_nutrition, attr_repair, attr_protection,
  attr_curls, attr_film, attr_uva_chem, attr_uvb_chem, attr_spf_physical,
  created_at, notes, is_top, application_area
FROM products_bak_v4;

-- Шаг 7: Восстанавливаем product_ingredients из бэкапа
INSERT INTO product_ingredients (
  id, product_id, ingredient_id, position, raw_inci_name,
  legacy_functions_text, bg_color_hex, font_color_hex, warn_flag,
  source_sheet, match_source
)
OVERRIDING SYSTEM VALUE
SELECT
  id, product_id, ingredient_id, position, raw_inci_name,
  legacy_functions_text, bg_color_hex, font_color_hex, warn_flag,
  source_sheet, match_source
FROM product_ingredients_bak_v4;

-- Шаг 8: Удаляем бэкап-таблицы (только когда убедились, что всё ок)
-- DROP TABLE products_bak_v4;
-- DROP TABLE product_ingredients_bak_v4;

SELECT
  (SELECT COUNT(*) FROM products)            AS products_restored,
  (SELECT COUNT(*) FROM product_ingredients) AS pi_restored;
