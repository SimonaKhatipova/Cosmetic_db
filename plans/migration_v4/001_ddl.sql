
-- Шаг 1: очищаем зависимые таблицы
TRUNCATE TABLE product_skin_types CASCADE;
TRUNCATE TABLE product_ingredients CASCADE;
TRUNCATE TABLE products CASCADE;

-- Шаг 2: новые справочные таблицы
CREATE TABLE IF NOT EXISTS brands (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand_id   text   UNIQUE NOT NULL,
  brand_name text   NOT NULL,
  country    text,
  website    text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingredients_dictionary (
  id               bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingredient_id    text   UNIQUE NOT NULL,
  canonical_name   text   NOT NULL,
  aliases          text,
  product_count    integer DEFAULT 0,
  occurrence_count integer DEFAULT 0,
  created_at       timestamptz DEFAULT now()
);

-- Шаг 3: новые колонки в products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS product_id          text,
  ADD COLUMN IF NOT EXISTS name_display        text,
  ADD COLUMN IF NOT EXISTS product_type_path   text,
  ADD COLUMN IF NOT EXISTS description         text,
  ADD COLUMN IF NOT EXISTS skin_type_primary   text,
  ADD COLUMN IF NOT EXISTS skin_type_alternative text,
  ADD COLUMN IF NOT EXISTS price_category      text,
  ADD COLUMN IF NOT EXISTS brand_id            text,
  ADD COLUMN IF NOT EXISTS flag_complex        boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS flag_super_formula  boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS validation_flag     text,
  ADD COLUMN IF NOT EXISTS ingredient_count    integer DEFAULT 0;

-- Меняем тип attr_* с text на int2 (таблица пуста после TRUNCATE)
ALTER TABLE products
  ALTER COLUMN attr_moisture     TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_nutrition    TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_repair       TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_protection   TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_curls        TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_film         TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_uva_chem     TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_uvb_chem     TYPE int2 USING NULL::int2,
  ALTER COLUMN attr_spf_physical TYPE int2 USING NULL::int2;

-- Шаг 4: ingredient_id в таблице ingredients
ALTER TABLE ingredients
  ADD COLUMN IF NOT EXISTS ingredient_id  text UNIQUE,
  ADD COLUMN IF NOT EXISTS canonical_name text;

-- Шаг 5: staging-таблица для product_ingredients
DROP TABLE IF EXISTS _staging_pi;
CREATE TABLE _staging_pi (
  product_id_text    text,
  ingredient_id_text text,
  position           integer,
  raw_inci_name      text
);
