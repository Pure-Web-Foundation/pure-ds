# Icon System

PDS ships a simple, sprite‑based icon solution and a lightweight `<pds-icon>` web component. This page explains how it works today and how to rebuild the sprite if you customize your set.

## Files

- `public/assets/img/pds-icons.svg` — SVG sprite sheet consumed at runtime
- `public/auto-define/pds-icon.js` — auto‑defined component that renders icons from the sprite
- `scripts/build-icons.mjs` — script to (re)generate the sprite
- Demo: `public/_test/icons-demo.html`

## Rebuild the sprite

Regenerate the sprite after changing your icon selection or sources:

```bash
npm run build-icons
```

By default, the sprite is written to `public/assets/img/pds-icons.svg`.

## Usage

The `<pds-icon>` element is lazily registered by the Auto‑Define system when it appears in the DOM (base URL configurable via `PDS.start({ autoDefine: { baseURL } })`). You can also import it directly if you prefer.

Attributes supported by the component:

- `icon` — required symbol id (e.g., `house`, `gear`)
- `size` — number in px (e.g., `32`) or named size: `xs | sm | md | lg | xl | 2xl` (default `24`)
- `color` — any CSS color, defaults to `currentColor`
- `label` — accessible name. When present, the icon is exposed as `role="img"`; otherwise it’s `aria-hidden`.

Examples:

```html
<pds-icon icon="house"></pds-icon>
<pds-icon icon="gear" size="lg"></pds-icon>
<pds-icon icon="heart" size="32"></pds-icon>
<pds-icon icon="menu" label="Open menu"></pds-icon>
```

The component points to the sprite at `/assets/img/pds-icons.svg` by default.

## Notes

- The component includes a minimal set of inline fallbacks for a few critical icons so UIs remain usable if the sprite fails to load.
- Colors inherit from text color via `currentColor` unless overridden.
- If you need different sprite placement or a CDN path, you can fork the component or serve a redirect at `/assets/img/pds-icons.svg`.
