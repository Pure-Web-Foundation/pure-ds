# Pure Design System (PDS)

[![CI](https://github.com/mvneerven/pure-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/mvneerven/pure-ds/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#license-and-support)

A browser‑native, JavaScript‑config‑first design system that generates complete, production‑ready CSS from a minimal configuration. PDS ships both as a live generator you can run in your app and as a static export you can host anywhere.

- Zero framework lock‑in: works with plain HTML, Web Components, Lit, React, Vue, etc.
- First‑class Web Platform: EventTarget‑based runtime, Constructable Stylesheets, Shadow DOM adoption helpers.
- Live or Static: generate CSS at runtime in "live" mode, or export bundled styles/components for "static" mode.
- Batteries included: Auto‑Define lazy component registration, presets, default accessibility checks, a configurator, and a docs viewer.


## Why PDS

- Single source of truth: one config drives tokens, layered CSS, and optional components.
- Ergonomic developer experience: one unified `PDS.start({ ... })`, predictable events, strong typings.
- Progressive enhancement: semantic HTML first, opt‑in to enhancements/components where helpful.
- Portability: publish static exports and host on any server/CDN.


## Key concepts

- Unified runtime: A singleton `PDS` that acts as both your API surface and the event bus (extends EventTarget).
- Two modes, single entry point:
  - live mode: generate CSS from config in the browser; auto‑define web components when they appear.
  - static mode: adopt prebuilt constructable stylesheets and auto‑define components from your hosted bundle.
- Layered CSS architecture: `tokens`, `primitives`, `components`, `utilities`, `styles`.
- Auto‑Define: lazy register `<pds-*>` elements on demand; plug in your own components too.
- Theming: built‑in theme attribute management and programmatic switching, with system preference support.


## Install

```bash
npm install @pure-ds/core
```

Most apps also sync web assets (components, icons, etc.) to your public folder during install via an included script. If needed, run it manually:

```bash
node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
```


## Lit without hardcoding paths

PDS recommends importing Lit from a virtual specifier so consumers can choose how to resolve it:

```js
import { html, css, LitElement } from '#pds/lit';
```

- In the browser (no bundler), map `#pds/lit` to a shim shipped with this repo:

```html
<script type="importmap">
{
  "imports": { "#pds/lit": "/assets/js/lit.js" }
}
</script>
```

- In bundlers, alias `#pds/lit` to the real `lit` package.


## Quick start (live mode)

```js
import { PDS } from '@pure-ds/core';

await PDS.start({
  mode: 'live',
  preset: 'default',
  design: {
    colors: { primary: '#007acc' }
  },
  autoDefine: {
    baseURL: '/auto-define/',
    predefine: ['pds-icon'],
    // mapper: (tag) => `${tag}.js`, // customize if your files differ
  },
  applyGlobalStyles: true,
  manageTheme: true,
  themeStorageKey: 'pure-ds-theme',
  preloadStyles: false,
  criticalLayers: ['tokens','primitives']
});

// Use components directly — AutoDefiner will lazy‑load the module when a tag appears
// <pds-icon name="star"></pds-icon>
```


## Quick start (static mode)

1) Generate static assets into your web root (defaults to `pds/` unless configured):

```bash
npm run pds:static
```

This produces:

- `pds/assets/img/pds-icons.svg`
- `pds/auto-define/*.js` (web components)
- `pds/css/pds-*.css` and `pds/css/pds-*.css.js` (constructable styles)
- docs copied alongside when enabled (README.md, GETTING-STARTED.md, …)

2) Initialize:

```js
import { PDS } from '@pure-ds/core';

await PDS.start({
  mode: 'static',
  preset: 'default',
  staticPaths: {
    tokens: '/pds/css/pds-tokens.css.js',
    primitives: '/pds/css/pds-primitives.css.js',
    components: '/pds/css/pds-components.css.js',
    utilities: '/pds/css/pds-utilities.css.js',
    styles: '/pds/css/pds-styles.css.js'
  },
  autoDefine: { baseURL: '/pds/auto-define/' },
  applyGlobalStyles: true,
  manageTheme: true
});
```

Optional: change the base folder name in your project’s `pds-config.js`:

```js
export default { staticBase: 'design-system' } // default is 'pds'
```


## Unified event bus

`PDS` is an EventTarget you can subscribe to for all runtime signals. Listen on `PDS` instead of `window`/`document`.

Core events and their `detail` payloads:

- pds:ready — fired when PDS has initialized
  - detail: { mode: 'live' | 'static', generator?, config, theme, autoDefiner? }
- pds:error — initialization or runtime errors surfaced by PDS
  - detail: { error }
- pds:theme:changed — theme resolved or changed
  - detail: { theme, requested?, source: 'system' | 'programmatic' }
- pds:design:updated — configurator emits when a new design config is applied
  - detail: { config, designer? }
- pds:design:field:changed — configurator field changed
  - detail: { field, config }
- pds:inspector:mode:changed — configurator code inspector toggled
  - detail: { active: boolean }
- pds:inspector:deactivate — request to turn off inspector (e.g., from showcase)
  - detail: {}
- pds:docs:view — request the configurator to render a docs file
  - detail: { file: string }

Example:

```js
PDS.addEventListener('pds:ready', (e) => {
  console.log('PDS ready in', e.detail.mode, 'theme:', e.detail.theme);
});

PDS.dispatchEvent(new CustomEvent('pds:docs:view', {
  detail: { file: 'GETTING-STARTED.md' }
}));
```

TypeScript consumers get strong typings via `PDSEventMap` in `src/js/pds.d.ts`.


## CSS layer architecture

PDS outputs CSS in layers to keep styles modular and predictable:

- tokens: variables for colors, spacing, typography, shadows, etc.
- primitives: base elements and primitives (buttons, surfaces, badges, alerts, …)
- components: richer UI (drawers, tabstrip, upload, …)
- utilities: small, composable utility classes
- styles: combined bundle for quick adoption

Adopt them in Shadow DOM:

```js
// For components that just need primitives
await PDS.adoptPrimitives(this.shadowRoot);

// Or adopt multiple layers
await PDS.adoptLayers(this.shadowRoot, ['primitives','components']);
```

See LAYER-ARCHITECTURE.md for details.


## Auto‑Define and Enhancers

Auto‑Define observes the DOM and automatically registers Web Components as their tags appear. It also applies lightweight progressive enhancements, which you can extend/override.

```js
await PDS.start({
  autoDefine: {
    baseURL: '/auto-define/',
    predefine: ['pds-icon','pds-drawer'],
    mapper: (tag) => tag === 'pds-tabpanel' ? 'pds-tabstrip.js' : `${tag}.js`,
    // Optional flags:
    // scanExisting: true, observeShadows: true, patchAttachShadow: true, debounceMs: 16
  },
  enhancers: [
    { selector: 'nav[data-dropdown]', run: (el) => {/* … */} },
  ]
});
```


## Theming and critical CSS

Automatically manage the theme attribute (`html[data-theme]`) and persist the preference. PDS supports `light`, `dark`, and `system`.

```jsF
await PDS.start({ mode: 'live', manageTheme: true, themeStorageKey: 'pure-ds-theme' });
await PDS.setTheme('dark');             // or 'light' | 'system'
```

Prevent flashes by preloading minimal CSS very early:

```js
PDS.preloadCritical({ colors: { primary: '#007acc' } }, {
  theme: 'system',
  layers: ['tokens']
});
```

PDS dispatches `pds:theme:changed` both for programmatic changes and system preference changes when `manageTheme` is enabled.


## Presets, validation, and ontology

- Presets: choose a named preset and override it with your own `design` partials.
- Validation: basic accessibility checks ensure common text and primary actions meet AA contrast.

```js
const result = PDS.validateDesign({ /* your design */ }, { minContrast: 4.5 });
if (!result.ok) console.table(result.issues);
```

- Ontology: metadata about primitives/components and helpers like `findComponentForElement(el)` to power inspector‑like tooling.


## API reference (essentials)

- PDS.start(config)
  - Unified entry point. Starts in live or static mode.
  - config: `{ mode?: 'live'|'static' = 'live', preset?, design?, autoDefine?, applyGlobalStyles?, manageTheme?, themeStorageKey?, preloadStyles?, criticalLayers?, staticPaths?, enhancers? }`
  - returns: `Promise<{ generator?, config, theme, autoDefiner? }>`

- PDS.setTheme(theme, options?)
  - Change theme programmatically; `theme`: `'light'|'dark'|'system'`.

- PDS.preloadCritical(config, options?)
  - Inject minimal CSS synchronously to prevent flash.

- PDS.validateDesign(config, options?)
  - Validate a design for basic accessibility/contrast issues.

- PDS.adoptLayers(shadowRoot, layers?, additionalSheets?)
  - Adopt one or more constructable stylesheets into Shadow DOM.

- PDS.adoptPrimitives(shadowRoot, additionalSheets?)
  - Convenience to adopt just primitives.

- PDS.createStylesheet(css)
  - Return a constructable CSSStyleSheet from a string.

- PDS.registry
  - Runtime registry with `setDesigner()`, `setStaticMode()`, `getStylesheet(layer)`, `getBlobURL(layer)`, and flags `mode`, `isLive`, `hasDesigner`.

- PDS.presets / PDS.ontology / PDS.enums / PDS.ask
  - Useful runtime helpers and metadata.

Types live in `src/js/pds.d.ts` and are exported for consumers.


## Framework integration

- Vite
  - Alias `#pds/lit` to `lit`, then `await PDS.start({ mode:'live', preset:'default' })` in your app entry.
- Next.js
  - Call `PDS.start` in a `useEffect` in your root layout.
- Vanilla HTML
  - Use an import map for `#pds/lit` and import `/assets/js/pds.js` directly.

See GETTING-STARTED.md for copy‑pasteable snippets.


## Configurator and docs viewer

The configurator emits unified events (pds:design:updated, pds:design:field:changed, pds:inspector:mode:changed, pds:inspector:deactivate). It can also display Markdown docs on request:

```js
PDS.dispatchEvent(new CustomEvent('pds:docs:view', { detail: { file: 'GETTING-STARTED.md' } }));
// Optionally set a custom base
window.PDS_DOCS_BASE = '/design-system';
```


## Static export and CLI

Package scripts:

- pds:static — export static assets (CSS constructable modules, components, icons, docs)
- sync-assets — copy shipped assets into your web root (also run by postinstall)
- build-icons — regenerate icon sprite (internal script)

```bash
npm run pds:static
npm run sync-assets
```


## Troubleshooting

- Components not loading
  1) Ensure your components directory exists (default `/auto-define/` or `/pds/auto-define/` in static mode).
  2) If using import maps, confirm the `#pds/lit` mapping points at a valid file (e.g., `/assets/js/lit.js`).
  3) Manually sync assets if needed:

     ```bash
     node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
     ```

- Flash of unstyled content
  - Call `PDS.preloadCritical()` as early as possible and/or enable `preloadStyles` with `criticalLayers` in `PDS.start()`.

- Theme doesn’t change
  - If `manageTheme` is off, you are responsible for updating `html[data-theme]` or call `PDS.setTheme()`.


## Migration notes

- Unified start API
  - Use `PDS.start({ mode: 'live'|'static', ... })` instead of `PDS.live()` / `PDS.static()`.
- Unified event bus
  - Old names like `pds-live-ready`, `pds-static-ready`, `pds-theme-changed`, and local configurator events (`design-*`, `inspector-*`, `pds-view-docs`) are now:
    - pds:ready, pds:error, pds:theme:changed, pds:design:updated, pds:design:field:changed, pds:inspector:mode:changed, pds:inspector:deactivate, pds:docs:view
  - Listen/emit on `PDS` rather than `window` or `document`.

Backwards compatibility shims are intentionally not included.


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

See also:

- GETTING-STARTED.md — in‑depth setup and examples
- ICON-SYSTEM.md — icon tokens and sprite usage
- LAYER-ARCHITECTURE.md — layer ordering and adoption patterns
- LAYOUT-UTILITIES-PLAN.md — utilities strategy and plan


## License and support

- License: ISC
- Issues: https://github.com/mvneerven/pure-ds/issues
- Discussions: https://github.com/mvneerven/pure-ds/discussions

Made with ❤️ for the open web.


---

**Made with ❤️ for the open web**


