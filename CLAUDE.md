# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite HMR)
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # ESLint
npm run deploy     # build + push dist/ to gh-pages branch
```

There is no test suite.

## Architecture

Single-page React 19 app with no routing. The entire UI lives in **`src/App.jsx`** — one large file containing:
- All CSS injected as a template literal (`styles`) via `<style>` in JSX
- `sbFetch()` — thin wrapper around the Supabase REST API
- `App` — root component managing tab state (Products / INCI Reference)
- `ProductModal` — read-only product detail with ordered ingredient list
- `AddProductModal` — create product with INCI paste-and-parse flow
- `AddIngredientModal` — create ingredient entry
- `ImagePicker` — image upload component (URL or file → resize → optional remove.bg → Supabase Storage)

`cosmetics-app.jsx` in the repo root is a legacy standalone single-file version; the active code is `src/App.jsx`.

## Backend: Supabase

The Supabase project URL and anon key are hardcoded in `src/App.jsx`. The database has three tables:

| Table | Key columns |
|---|---|
| `products` | id, name, brand, image_url, created_at |
| `ingredients` | id, inci_name, ru_name, grp, subgroup, description, source_sheet |
| `product_ingredients` | id, product_id, ingredient_id, position, raw_inci_name |

`product_ingredients` is the many-to-many join with an ordered `position` column. When adding a product, each parsed INCI name is fuzzy-matched against the `ingredients` table; unmatched entries are saved with `ingredient_id = null` and their raw text in `raw_inci_name`.

Images are stored in a Supabase Storage bucket named `product-images` (must be public). All images are resized to 1200×1200 WebP via the Canvas API before upload. The optional remove.bg integration strips backgrounds before upload; the API key is entered at runtime via the ⚙ settings panel and never persisted.

## Deployment

The app is deployed to GitHub Pages at `https://simonakhatipova.github.io/Cosmetic_db/`. The Vite `base` is set to `/Cosmetic_db/` in `vite.config.js`. `npm run deploy` builds and pushes `dist/` to the `gh-pages` branch.

## Design system

All colors are CSS custom properties defined in `:root` inside the `styles` string in `App.jsx`: `--cream`, `--warm`, `--sand`, `--dust`, `--brown`, `--deep`, `--ink`, `--rose`, `--sage`, `--gold`. Fonts are Playfair Display (headings) and DM Sans (body), loaded from Google Fonts.
