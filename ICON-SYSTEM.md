# Icon System

> ⚠️ Alpha status (pre‑1.0)
>
> Pure Design System (pure‑ds) is in active alpha and under rapid development.
>
> - APIs, exports, file paths, and CLI behavior may change between 0.x releases.
> - Breaking changes can ship without deprecation; not recommended for production yet.
> - If you experiment in real projects, pin a specific version (e.g. "pure-ds": "~0.1.0").
> - Feedback welcome → [Issues](https://github.com/mvneerven/pure-ds/issues) • [Discussions](https://github.com/mvneerven/pure-ds/discussions).
> - Breaking changes will be noted in the [CHANGELOG](./CHANGELOG.md).

PDS ships a simple, sprite‑based icon solution and a lightweight `<pds-icon>` web component. This page explains how it works today and how to rebuild the sprite if you customize your set.

## Files

- `public/assets/pds/icons/icons.svg` — SVG sprite sheet consumed at runtime
- `public/auto-define/pds-icon.js` — auto‑defined component that renders icons from the sprite
- `packages/pds-cli/bin/pds-build-icons.js` — CLI tool to (re)generate the sprite
- Demo: `public/_test/icons-demo.html`

## Rebuild the sprite

Regenerate the sprite after changing your icon selection or sources:

```bash
npm run build-icons
```

By default, the sprite is written to `public/assets/pds/icons/icons.svg`.

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
<pds-icon icon="list" label="Open menu"></pds-icon>
```

The component points to the sprite at `/assets/pds/icons/icons.svg` by default.

## Notes

- The component includes a minimal set of inline fallbacks for a few critical icons so UIs remain usable if the sprite fails to load.
- Colors inherit from text color via `currentColor` unless overridden.
- If you need different sprite placement or a CDN path, you can fork the component or serve a redirect at `/assets/img/pds-icons.svg`.

## External Icon Fallback (On-Demand Loading)

For icons not included in the sprite sheet, `<pds-icon>` can automatically fetch individual SVG files on demand. This provides the best of both worlds:

- **Core icons**: Bundled in the cached sprite sheet for optimal performance
- **'Exotic' icons**: Fetched individually on first use, then cached in memory

### Configuration

Configure the external icons path in `pds.config.js`:

```javascript
export const config = {
  mode: "live",
  design: {
    icons: {
      externalPath: "/assets/img/icons/", // Path for on-demand external SVG icons
    }
  }
};
```

### Usage

Simply use any icon name - if it's not in the sprite, the component will attempt to fetch it:

```html
<!-- Sprite icon (instant) -->
<pds-icon icon="house"></pds-icon>

<!-- External icon (fetched from /assets/img/icons/my-custom-icon.svg) -->
<pds-icon icon="my-custom-icon"></pds-icon>
```

### How It Works

1. When an icon is requested, the component first checks the sprite sheet
2. If not found, it checks the in-memory external icon cache
3. If not cached, it fetches from `{externalPath}/{icon-name}.svg`
4. Once fetched, the icon is cached and all instances using that icon re-render
5. If the fetch fails, the fallback "missing" icon is shown

### External Icon Requirements

External SVG files should:
- Be standalone SVG files (not symbols)
- Have a `viewBox` attribute (defaults to `0 0 24 24` if missing)
- Use `currentColor` for fills/strokes if you want color inheritance

Example external icon structure:
```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="..."/>
</svg>
```
