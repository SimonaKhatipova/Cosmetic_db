-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.formula_ingredients (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  formula_id bigint NOT NULL,
  ingredient_id bigint NOT NULL,
  is_optional boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT formula_ingredients_pkey PRIMARY KEY (id),
  CONSTRAINT formula_ingredients_formula_id_fkey FOREIGN KEY (formula_id) REFERENCES public.patented_formulas(id),
  CONSTRAINT formula_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id)
);
CREATE TABLE public.ingredient_groups (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  ingredient_id bigint NOT NULL,
  group text NOT NULL,
  subgroup text,
  subgroup2 text,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ingredient_groups_pkey PRIMARY KEY (id),
  CONSTRAINT ingredient_groups_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id)
);
CREATE TABLE public.ingredients (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  inci_name text NOT NULL UNIQUE,
  ru_name text,
  aliases text,
  description text,
  is_verified boolean DEFAULT false,
  is_eu_allergen boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ingredients_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ingredients_backup_pre_v3 (
  id bigint,
  inci_name text,
  ru_name text,
  group text,
  subgroup text,
  description text,
  created_at timestamp with time zone,
  subgroup2 text,
  aliases text,
  is_verified boolean,
  is_eu_allergen boolean
);
CREATE TABLE public.oils_meta (
  id bigint NOT NULL DEFAULT nextval('oils_meta_id_seq'::regclass),
  ingredient_id bigint NOT NULL UNIQUE,
  penetration text,
  fatty_acids text,
  comedogenicity text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT oils_meta_pkey PRIMARY KEY (id),
  CONSTRAINT oils_meta_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id)
);
CREATE TABLE public.patented_formulas (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  brand_holder text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  is_uncertain boolean DEFAULT false,
  CONSTRAINT patented_formulas_pkey PRIMARY KEY (id)
);
CREATE TABLE public.product_ingredients (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id bigint NOT NULL,
  ingredient_id bigint,
  position integer,
  raw_inci_name text,
  legacy_functions_text text,
  bg_color_hex text,
  font_color_hex text,
  warn_flag boolean DEFAULT false,
  source_sheet text,
  match_source text,
  CONSTRAINT product_ingredients_pkey PRIMARY KEY (id),
  CONSTRAINT product_ingredients_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id)
);
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  brand text,
  image_url text,
  product_type text,
  analytical_type text,
  skin_type text,
  price_rub integer,
  is_selected boolean DEFAULT false,
  source_sheet text,
  source_row integer,
  attr_moisture text,
  attr_nutrition text,
  attr_repair text,
  attr_protection text,
  attr_curls text,
  attr_film text,
  attr_uva_chem text,
  attr_uvb_chem text,
  attr_spf_physical text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
CREATE TABLE public.subgroups (
  id bigint NOT NULL DEFAULT nextval('subgroups_id_seq'::regclass),
  group text NOT NULL,
  subgroup text,
  subgroup2 text,
  description text,
  name_hint text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subgroups_pkey PRIMARY KEY (id)
);
