
-- Переносим из staging в product_ingredients с FK-маппингом
INSERT INTO product_ingredients (product_id, ingredient_id, position, raw_inci_name)
SELECT
  p.id,
  i.id,
  s.position,
  s.raw_inci_name
FROM _staging_pi s
JOIN products p ON p.product_id = s.product_id_text
LEFT JOIN ingredients i ON i.ingredient_id = s.ingredient_id_text
ON CONFLICT DO NOTHING;

-- Считаем результаты
SELECT
  (SELECT COUNT(*) FROM products)            AS products_loaded,
  (SELECT COUNT(*) FROM product_ingredients) AS pi_loaded,
  (SELECT COUNT(*) FROM ingredients WHERE ingredient_id IS NOT NULL) AS ing_matched;

-- Удаляем staging
DROP TABLE IF EXISTS _staging_pi;

-- Уникальный индекс на product_id
ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_product_id_key;
ALTER TABLE products
  ADD CONSTRAINT products_product_id_key UNIQUE (product_id);
