# Getting Started with Pure Design System (PDS)

Pure Design System (PDS) is a browser‑native design system for building consistent, accessible UIs. This guide shows the modern setup using the unified API and the virtual Lit import.

## Install

Install the core package into your app:

```bash
npm install @pure-ds/core
```

Most projects will also sync the web assets (components, icons) into your web root during install via the included postinstall script. If needed, you can run it manually:

```bash
node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
```

## Lit without hardcoding paths

PDS components and any of your own web components should import Lit from a virtual specifier so consumers can choose how to resolve it:

```js
import { html, css, LitElement } from '#pds/lit';
```

- In the browser (no bundler), add an import map to map `#pds/lit` to a file your server hosts (this repo ships `/assets/js/lit.js`):

```html
<script type="importmap">
{
  "imports": {
    "#pds/lit": "/assets/js/lit.js"
  }
}
</script>
```

- In bundlers, alias `#pds/lit` to the real `lit` package:
  - Vite
    ```js
    // vite.config.ts
    export default {
      resolve: { alias: { '#pds/lit': 'lit' } }
    }
    ```
  - Webpack
    ```js
    // webpack.config.js
    module.exports = {
      resolve: { alias: { '#pds/lit': 'lit' } }
    }
    ```
  - Rollup
    ```js
    // rollup.config.mjs
    import alias from '@rollup/plugin-alias';
    export default {
      plugins: [alias({ entries: [{ find: '#pds/lit', replacement: 'lit' }] })]
    }
    ```

## Quick start (live mode)

Initialize PDS at app startup. The unified config shape keeps design and runtime concerns separate:

```js
import { PDS } from '@pure-ds/core';

await PDS.start({
  mode: 'live',
  // Pick a preset and optionally override pieces
  preset: 'default',
  design: {
    colors: { primary: '#007acc' }
  },

  // AutoDefine controls how components are discovered/lazy‑loaded
  autoDefine: {
    baseURL: '/auto-define/',        // where your <pds-*> web components live
    predefine: ['pds-icon'],         // optional: eagerly register some tags
    // mapper: (tag) => `${tag}.js`, // optional: customize file mapping
  },

  // Runtime flags
  applyGlobalStyles: true,           // adopt global styles into document
  manageTheme: true,                 // keep html[data-theme] in sync
  themeStorageKey: 'pure-ds-theme',
  preloadStyles: false,              // set true to inline critical CSS very early
  criticalLayers: ['tokens','primitives']
});
```

Use components directly in HTML—AutoDefiner will lazy‑load the module when a tag appears:

```html
<pds-icon name="star"></pds-icon>
<pds-drawer title="Settings"></pds-drawer>
```

## Static mode (build once, serve anywhere)

If you don’t need runtime generation, point PDS at prebuilt constructable stylesheets and the auto‑define components you host.

1) Generate assets into your web root (defaults to `pds/` unless configured)

```bash
npm run pds:static
```

This typically creates:

- `pds/assets/img/pds-icons.svg`
- `pds/auto-define/*.js` (web components)
- `pds/css/pds-*.css` and `pds/css/pds-*.css.js` (constructable styles)
- docs copied alongside (README.md, GETTING-STARTED.md, …) when enabled

2) Initialize in static mode with the same unified shape:

```js
import { PDS } from '@pure-ds/core';

await PDS.start({
  mode: 'static',
  preset: 'default',

  // Where to fetch prebuilt constructable stylesheets from
  staticPaths: {
    tokens: '/pds/css/pds-tokens.css.js',
    primitives: '/pds/css/pds-primitives.css.js',
    components: '/pds/css/pds-components.css.js',
    utilities: '/pds/css/pds-utilities.css.js',
    styles: '/pds/css/pds-styles.css.js'
  },

  // Components base directory
  autoDefine: { baseURL: '/pds/auto-define/' },

  // Optional flags (same as live)
  applyGlobalStyles: true,
  manageTheme: true,
  themeStorageKey: 'pure-ds-theme'
});
```

### Configure base folder

Set a custom base folder name for static assets/docs in your project’s `pds-config.js`:

```js
export default {
  // ... your design config ...
  staticBase: 'design-system' // default is 'pds'
}
```

The static exporter will generate `/<webroot>/design-system` and copy docs there.

### Viewing docs in the configurator

The configurator can render Markdown docs; it looks under the static base (default `/pds`). You can request a file:

```js
document.dispatchEvent(new CustomEvent('pds-view-docs', { detail: { file: 'GETTING-STARTED.md' } }));
// Optionally override the docs base
window.PDS_DOCS_BASE = '/design-system';
```

## Advanced configuration

### Theme management

```js
await PDS.start({ mode: 'live',
  preset: 'default',
  design: { colors: { primary: '#007acc' } },
  manageTheme: true,
  themeStorageKey: 'my-theme'
});

// Change theme later
await PDS.setTheme('dark'); // 'light' | 'dark' | 'system'
```

### Preventing flash (critical CSS)

```js
await PDS.start({ mode: 'live',
  preset: 'default',
  design: { colors: { primary: '#007acc' } },
  preloadStyles: true,
  criticalLayers: ['tokens','primitives']
});
```

### Auto‑Define tuning

```js
await PDS.start({ mode: 'live',
  preset: 'default',
  autoDefine: {
    baseURL: '/components/',
    predefine: ['my-app'],
    mapper: (tag) => tag === 'my-special-component' ? 'special/component.js' : `${tag}.js`,
    // You can also override observer flags here if needed:
    // scanExisting: true, observeShadows: true, patchAttachShadow: true, debounceMs: 16
  }
});
```

## Project structure (typical)

```
your-project/
├─ public/
│  ├─ auto-define/          # PDS components (hosted for the browser)
│  ├─ assets/
│  │  ├─ js/lit.js          # Lit shim for import maps
│  │  └─ img/pds-icons.svg  # PDS icons
│  └─ index.html
├─ src/
│  └─ main.js               # Your PDS initialization
└─ package.json
```

## Framework integration tips

### Next.js (app router)

```js
// app/layout.js
import { useEffect } from 'react';
import { PDS } from '@pure-ds/core';

export default function RootLayout({ children }) {
  useEffect(() => {
    PDS.start({ mode: 'live', preset: 'default' });
  }, []);
  return children;
}
```

### Vite

```js
// src/main.js
import { PDS } from '@pure-ds/core';
await PDS.start({ mode: 'live', preset: 'default' });
```

Add the alias in `vite.config.*` as shown above so `#pds/lit` resolves to `lit` in dev/build.

### Vanilla HTML

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Map the virtual Lit specifier for the browser -->
    <script type="importmap">
    { "imports": { "#pds/lit": "/assets/js/lit.js" } }
    </script>
    <script type="module">
  import { PDS } from '/assets/js/pds.js';
  await PDS.start({ mode: 'live', preset: 'default' });
    </script>
  </head>
  <body>
    <pds-icon name="star"></pds-icon>
  </body>
</html>
```

## Troubleshooting

### Components not loading

1) Ensure your components directory exists (default `/auto-define/` or `/pds/auto-define/` in static mode).

2) If you rely on import maps, confirm the `#pds/lit` mapping points at a valid file (network tab should show `/assets/js/lit.js`).

3) Manually sync assets if needed:

```bash
node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
```

### Dev linking (@pure-ds/core)

When using `npm link` for local development, re‑run the postinstall/sync script whenever component files change.

## API reference (essentials)

### PDS.start(config)

Unified entry point. Starts PDS in live or static mode.

- config: `{ mode?: 'live' | 'static' = 'live', preset?, design?, autoDefine?, applyGlobalStyles?, manageTheme?, themeStorageKey?, preloadStyles?, criticalLayers?, staticPaths? }`
- returns: `Promise<{ generator?, config, theme, autoDefiner }>` — `generator` is present in live mode

<!-- Note: PDS.live() and PDS.static() have been consolidated into PDS.start(). -->

### PDS.setTheme(theme, options)

Change theme programmatically; `theme` is `'light' | 'dark' | 'system'`.

### PDS.preloadCritical(config, options)

Low‑level helper to inject minimal CSS synchronously to prevent flash.

### PDS.validateDesign(config, options)

Validate a design config for basic accessibility contrast checks.

## Migration notes (from older API)

- Migration from older API: Use `PDS.start({ mode: 'live' | 'static', ... })` instead of `PDS.live()` / `PDS.static()` and move AutoDefine options under `autoDefine: { baseURL, predefine, mapper }`.

## Support

- 📖 Full docs live in this repo’s `/docs`
- 🐛 Issues: https://github.com/mvneerven/pure-ds/issues
- 💬 Discussions: https://github.com/mvneerven/pure-ds/discussions