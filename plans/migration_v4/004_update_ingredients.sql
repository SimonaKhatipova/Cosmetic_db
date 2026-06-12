## Table `oils_meta`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary |
| `ingredient_id` | `int8` |  Unique |
| `penetration` | `text` |  Nullable |
| `fatty_acids` | `text` |  Nullable |
| `comedogenicity` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `subgroups`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary |
| `group` | `text` |  |
| `subgroup` | `text` |  Nullable |
| `subgroup2` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `name_hint` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `ingredients_backup_pre_v3`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` |  Nullable |
| `inci_name` | `text` |  Nullable |
| `ru_name` | `text` |  Nullable |
| `group` | `text` |  Nullable |
| `subgroup` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `subgroup2` | `text` |  Nullable |
| `aliases` | `text` |  Nullable |
| `is_verified` | `bool` |  Nullable |
| `is_eu_allergen` | `bool` |  Nullable |

## Table `ingredients`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `inci_name` | `text` |  Unique |
| `ru_name` | `text` |  Nullable |
| `aliases` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `is_verified` | `bool` |  Nullable |
| `is_eu_allergen` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `is_avoid` | `bool` |  Nullable |
| `is_good` | `bool` |  Nullable |
| `ingredient_id` | `text` |  Nullable Unique |
| `canonical_name` | `text` |  Nullable |

## Table `ingredient_groups`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `ingredient_id` | `int8` |  |
| `group` | `text` |  |
| `subgroup` | `text` |  Nullable |
| `subgroup2` | `text` |  Nullable |
| `is_primary` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `products`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `name` | `text` |  |
| `brand` | `text` |  Nullable |
| `image_url` | `text` |  Nullable |
| `product_type` | `text` |  Nullable |
| `analytical_type` | `text` |  Nullable |
| `skin_type` | `text` |  Nullable |
| `price_rub` | `int4` |  Nullable |
| `is_selected` | `bool` |  Nullable |
| `source_sheet` | `text` |  Nullable |
| `source_row` | `int4` |  Nullable |
| `attr_moisture` | `int2` |  Nullable |
| `attr_nutrition` | `int2` |  Nullable |
| `attr_repair` | `int2` |  Nullable |
| `attr_protection` | `int2` |  Nullable |
| `attr_curls` | `int2` |  Nullable |
| `attr_film` | `int2` |  Nullable |
| `attr_uva_chem` | `int2` |  Nullable |
| `attr_uvb_chem` | `int2` |  Nullable |
| `attr_spf_physical` | `int2` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `notes` | `text` |  Nullable |
| `is_top` | `bool` |  Nullable |
| `application_area` | `text` |  Nullable |
| `product_id` | `text` |  Nullable Unique |
| `name_display` | `text` |  Nullable |
| `product_type_path` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `skin_type_primary` | `text` |  Nullable |
| `skin_type_alternative` | `text` |  Nullable |
| `price_category` | `text` |  Nullable |
| `brand_id` | `text` |  Nullable |
| `flag_complex` | `bool` |  Nullable |
| `flag_super_formula` | `bool` |  Nullable |
| `validation_flag` | `text` |  Nullable |
| `ingredient_count` | `int4` |  Nullable |

## Table `product_ingredients`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `product_id` | `int8` |  |
| `ingredient_id` | `int8` |  Nullable |
| `position` | `int4` |  Nullable |
| `raw_inci_name` | `text` |  Nullable |
| `legacy_functions_text` | `text` |  Nullable |
| `bg_color_hex` | `text` |  Nullable |
| `font_color_hex` | `text` |  Nullable |
| `warn_flag` | `bool` |  Nullable |
| `source_sheet` | `text` |  Nullable |
| `match_source` | `text` |  Nullable |

## Table `patented_formulas`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `name` | `text` |  Unique |
| `brand_holder` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `is_uncertain` | `bool` |  Nullable |

## Table `formula_ingredients`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `formula_id` | `int8` |  |
| `ingredient_id` | `int8` |  |
| `is_optional` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `skin_types`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `code` | `text` |  Unique |
| `name_ru` | `text` |  |
| `description` | `text` |  Nullable |
| `signs` | `text` |  Nullable |
| `sensations` | `text` |  Nullable |
| `care_hint` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `area` | `text` |  Nullable |

## Table `hair_types`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `type_number` | `int4` |  |
| `type_name` | `text` |  |
| `subtype` | `text` |  |
| `subtype_name` | `text` |  Nullable |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `hair_conditions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `code` | `text` |  Unique |
| `name_ru` | `text` |  |
| `signs` | `text` |  Nullable |
| `how_to_identify` | `text` |  Nullable |
| `care_focus` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `product_types_ref`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `code` | `text` |  Unique |
| `name_ru` | `text` |  |
| `category` | `text` |  Nullable |
| `main_function` | `text` |  Nullable |
| `key_components` | `text` |  Nullable |
| `application_notes` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `mask_types_ref`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `code` | `text` |  Unique |
| `name_ru` | `text` |  |
| `function` | `text` |  Nullable |
| `key_components` | `text` |  Nullable |
| `suitable_for` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `curly_method_ingredients`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `rule` | `text` |  |
| `group` | `text` |  |
| `examples` | `text` |  Nullable |
| `reason` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `product_skin_types`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `product_id` | `int8` |  |
| `skin_type_id` | `int8` |  |
| `created_at` | `timestamptz` |  Nullable |

## Table `brands`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `brand_id` | `text` |  Unique |
| `brand_name` | `text` |  |
| `country` | `text` |  Nullable |
| `website` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `ingredients_dictionary`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `ingredient_id` | `text` |  Unique |
| `canonical_name` | `text` |  |
| `aliases` | `text` |  Nullable |
| `product_count` | `int4` |  Nullable |
| `occurrence_count` | `int4` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

