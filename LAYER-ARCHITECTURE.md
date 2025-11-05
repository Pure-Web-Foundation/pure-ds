# PDS CSS Layer Architecture

This document explains how PDS structures CSS into predictable layers and how to consume them in both light and shadow DOM with the current, unified API.

## Layers

PDS outputs CSS in ordered cascade layers so you can adopt only what you need and keep specificity under control:

1) tokens — CSS custom properties (colors, spacing, typography, motion)
2) primitives — baseline styles for native elements (buttons, inputs, forms, etc.)
3) components — richer building blocks (alerts, badges, drawers, tabstrip, …)
4) utilities — small, composable helpers

For convenience, a combined bundle “styles” is also produced.

## Live vs Static

- Live mode: PDS generates CSS at runtime and exposes constructable stylesheets per layer.
- Static mode: PDS loads prebuilt constructable stylesheet modules and adopts them on demand.

Choose the mode once when you start PDS and keep the same API everywhere.

```js
import { PDS } from '@pure-ds/core';

// Live
await PDS.start({ mode: 'live', preset: 'default' });

// Static
await PDS.start({
   mode: 'static',
   preset: 'default',
   staticPaths: {
      tokens: '/pds/css/pds-tokens.css.js',
      primitives: '/pds/css/pds-primitives.css.js',
      components: '/pds/css/pds-components.css.js',
      utilities: '/pds/css/pds-utilities.css.js',
      styles: '/pds/css/pds-styles.css.js'
   }
});
```

## Adoption patterns

Adopt into Shadow DOM using helpers provided by PDS:

```js
// Adopt only primitives for maximum reusability
await PDS.adoptPrimitives(this.shadowRoot);

// Adopt multiple layers when needed
await PDS.adoptLayers(this.shadowRoot, ['primitives','components']);

// Create an extra stylesheet and include it alongside the layers
const mySheet = PDS.createStylesheet(`@layer components{ :host{ display:block } }`);
await PDS.adoptLayers(this.shadowRoot, ['primitives'], [mySheet]);
```

To apply a global baseline to the document (light DOM), enable `applyGlobalStyles` when starting PDS.

```js
await PDS.start({ mode:'live', preset:'default', applyGlobalStyles:true });
```

## Static exports

Run the exporter to generate files suitable for hosting (filenames shown by default):

- pds-tokens.css / pds-tokens.css.js
- pds-primitives.css / pds-primitives.css.js
- pds-components.css / pds-components.css.js
- pds-utilities.css / pds-utilities.css.js
- pds-styles.css / pds-styles.css.js

You can then reference the constructable modules via `staticPaths` (as above) or include the plain CSS in `<link>` tags for light DOM.

## Registry helpers

Advanced users can access the runtime registry:

- `PDS.registry.getStylesheet(layer)` → CSSStyleSheet
- `PDS.registry.getBlobURL(layer)` → string URL to a Blob (live mode)
- flags: `PDS.registry.mode`, `isLive`, `hasDesigner`

These are useful for custom adoption strategies or diagnostics, but most apps should prefer the `PDS.adopt*` helpers.

## Notes

- The old APIs (`PDS.live()`, `PDS.static()`, legacy event names) have been consolidated. Use `PDS.start()` and the new event names listed in the README.
- Backwards‑compatibility shims are not included by default.
