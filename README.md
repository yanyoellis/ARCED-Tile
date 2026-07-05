# ARCED Tile Installation Landing Page

Premium, responsive one-page React website for ARCED Construction Group LTD.

The project now includes:

- Main tile installation landing page (`/`)
- Interactive project cost calculator (`/calculator`)
- Privacy Policy (`/privacy-policy`)
- Terms of Use (`/terms-of-use`)

## Run locally

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Before launch

- Connect `handleSubmit` in `src/App.jsx` to the chosen email service or CRM endpoint.
- Replace sample testimonial copy with approved customer reviews when available.

## Image assets

The site uses the supplied ARCED logo with its background removed and four purpose-made architectural images. They were created with the built-in image generation/editing workflow using these concise production prompts:

- Preserve the supplied ARCED logo exactly; replace only its white background with a removable flat chroma key, then output a transparent PNG.
- Premium Winnipeg bathroom with completed warm ivory large-format porcelain shower tile, soft daylight and restrained brass details.
- Refined residential kitchen with handmade-look warm white ceramic backsplash tile and walnut cabinetry.
- Contemporary commercial reception with matte charcoal large-format floor tile, warm oak and a restrained burgundy accent.
- Straight-on side-by-side before/after of the same shower, from dated beige tile to a waterproofed large-format porcelain finish.
