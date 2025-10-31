# Pure Design System

A JavaScript-config-first design system that generates complete, production-ready CSS from minimal configuration. Generate a world-class design system with just 5 base variables.

## Philosophy

**Browser = Framework** • Pure web standards • No build dependencies • Progressive enhancement

---

## Table of Contents

- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Configuration](#configuration)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spatial Rhythm](#spatial-rhythm)
  - [Shape & Borders](#shape--borders)
  - [Layers & Shadows](#layers--shadows)
  - [Behavior & Motion](#behavior--motion)
  - [Layout](#layout)
  - [Icons](#icons)
  - [Accessibility](#accessibility)
- [Web Components](#web-components)
  - [PureApp](#pure-app)
  - [SvgIcon](#pds-icon)
  - [AppToaster](#pds-toaster)
  - [TabStrip](#tabstrip)
- [Features](#features)
- [API Reference](#api-reference)
- [Examples](#examples)

### Using Lit in PDS (#pds/lit)

PDS web components import Lit from a virtual specifier `#pds/lit` so you can choose where Lit comes from without changing component code.

- Browser (no bundler): add an import map that points `#pds/lit` to your Lit ESM bundle. The default demos map it to the local aggregate at `/assets/js/lit.js`.

```html
<script type="importmap">
  {
    "imports": {
      "#pds/lit": "/assets/js/lit.js"
    }
  }
}</script>
```

- Bundlers (Vite/Webpack/Rollup): alias `#pds/lit` to the real `lit` package to enable dedupe and tree-shaking.

Vite
```js
// vite.config.js
export default {
  resolve: { alias: { "#pds/lit": "lit" } }
}
```

Webpack
```js
// webpack.config.js
module.exports = {
  resolve: { alias: { "#pds/lit": require.resolve("lit") } }
}
```

Rollup
```js
// rollup.config.js
import alias from '@rollup/plugin-alias';
export default { plugins: [alias({ entries: [{ find: '#pds/lit', replacement: 'lit' }] })] };
```

---

## Quick Start

```javascript
import { Generator } from './src/js/auto-designer.js';

const designer = new Generator({
  colors: {
    primary: '#2563eb',     // Your brand color
    accent: '#f59e0b',      // Accent highlights
  },
  spatialRhythm: {
    baseUnit: 16,           // Base spacing (px)
  },
  shape: {
    radiusSize: 'medium',   // Border roundness
  }
});
```

# Pure Design System (PDS)

Generate a complete, production‑ready design system from a tiny JS config. No framework lock‑in. Native ESM. Progressive enhancement.

• Browser = Framework • Import Maps • Constructable Stylesheets • Lazy‑loaded Web Components


## Contents

- Context
- Getting started
- Simple config, live and static modes
- Structure (best‑practices semantic CSS)
- Included lazy‑loaded Web Components & progressive enhancements
- Extensibility
- Contributing


## Context

### Pure Web Manifesto

- Use the browser as your framework: native ESM, import maps, Web Components, and CSS custom properties.
- Ship less JS by default. Keep everything progressively enhanced and cacheable.
- Prefer composition and small, explicit modules over opaque toolchains.

### Storybook and local component development

Storybook is fantastic for rich documentation, but it often drags in heavy bundling, multiple preview layers, and environment drift between “storybook” and “app.” PDS favors a lighter loop for development and testing:

- Native ESM demo pages under `public/_test/*` (zero bundler).
- A small internal configurator for live tweaking of tokens and scales.
- Optional storybook integration (separate CLI) when you really need it—without coupling core runtime to Storybook’s stack.

### Accelerating PWA app development

- Start with tokens and utilities you can theme at runtime or compile statically.
- Lazy‑load components on demand; they enhance semantic HTML rather than replace it.
- Keep a single source of truth for color, type, spacing, and layers—usable in Shadow DOM and Light DOM alike.


## Getting started

Prerequisites: Node 18+ recommended.

Local dev (watch and open demo pages):

1) Install dependencies
   - npm install
2) Build in watch mode
   - npm run dev
3) Open any demo page (no server required) e.g. `public/index.html` or `public/_test/forms.html` in your browser. For live reload, use your editor’s live server.

Production build:

- npm run build

Optional local config server (interactive designer):

- npm run config-server

Static asset bundle (drop‑in CSS/JS for any project):

- npm run pds:static
  - Ships CSS and auto‑define component modules you can serve from any origin. See “Structure” and “Web Components” sections below for what to include.


## Simple config, live and static modes

PDS can run “live” (generate CSS at runtime) or be exported to static CSS/JS.

### Live mode (runtime generation)

Use the `Generator` to produce CSS layers and apply them to the document or into Shadow DOM. This is ideal for configurators, themes, and apps that need runtime theming.

```js
import { PDS } from '/assets/js/pds.js';

const designer = new PDS.Generator({
  colors: { primary: '#2563eb', accent: '#f59e0b' },
  spatialRhythm: { baseUnit: 16 },
  shape: { radiusSize: 'medium' }
});

await PDS.Generator.applyStyles(designer); // injects layered CSS into the page
```

To adopt styles in a Web Component’s Shadow DOM:

```js
// inside component after this.shadowRoot is available
await PDS.adoptLayers(this.shadowRoot, ['tokens', 'utilities', 'components', 'styles']);
```

### Static mode (prebuilt CSS/JS)

Use `npm run pds:static` to produce a ready‑to‑serve bundle. Then include CSS layers directly as `<link>` tags (see “Structure”), and load auto‑define modules for components you need.

Static mode is great for server‑rendered sites, CMSs, and minimal JS PWAs.


## Structure (best‑practices semantic CSS)

PDS outputs layered CSS you can opt into incrementally. In `public/exports/`:

- pds-tokens.css — Design tokens (colors, typography scale, spacing, z‑layers)
- pds-utilities.css — Utility classes (layout, spacing, text, surfaces)
- pds-components.css — Base component styles
- pds-styles.css — Optional higher‑level opinions and examples

Recommended include order (Light DOM):

```html
<link rel="stylesheet" href="/exports/pds-tokens.css">
<link rel="stylesheet" href="/exports/pds-utilities.css">
<link rel="stylesheet" href="/exports/pds-components.css">
<link rel="stylesheet" href="/exports/pds-styles.css">
```

Tokens and utilities are designed to be semantic and composable. Favor meaningful surfaces and roles over brittle one‑off overrides.


## Included lazy‑loaded Web Components & progressive enhancements

PDS ships optional Web Components you can lazy‑load via native ESM. They are designed to progressively enhance semantic HTML—your content remains usable before the component loads.

Auto‑define modules live under `public/auto-define/` (and mirrored under `public/pds/auto-define/` for static bundles). Example components:

- pds-drawer — Responsive drawer (bottom/top/left/right), drag‑to‑dismiss
- pds-jsonform — JSON‑Schema driven form generator (Light DOM)
- pds-splitpanel — Resizable split panel layout
- pds-tabstrip — Accessible tabstrip
- pds-toaster — App‑level toast notifications
- pds-upload — Basic upload surface
- pds-icon — SVG icon element

Usage (no bundler):

```html
<!-- Map virtual Lit import once for all components -->
<script type="importmap">
  { "imports": { "#pds/lit": "/assets/js/lit.js" } }
  </script>

<!-- Load only the components you need -->
<script type="module" src="/pds/auto-define/pds-drawer.js"></script>
<script type="module" src="/pds/auto-define/pds-jsonform.js"></script>
```

Inside components and dynamic scripts, import Lit from the virtual specifier (consumers can resolve it to their preferred source):

```js
import { html, css, LitElement } from '#pds/lit';
```

Bundled apps should alias `#pds/lit` → `lit` to dedupe and tree‑shake.

Bundler alias quick refs:

- Vite
  ```js
  // vite.config.js
  export default { resolve: { alias: { '#pds/lit': 'lit' } } }
  ```
- Webpack
  ```js
  // webpack.config.js
  module.exports = { resolve: { alias: { '#pds/lit': require.resolve('lit') } } };
  ```
- Rollup
  ```js
  // rollup.config.js
  import alias from '@rollup/plugin-alias';
  export default { plugins: [alias({ entries: [{ find: '#pds/lit', replacement: 'lit' }] })] };
  ```


## Extensibility

- Write your own components with Lit, importing from `#pds/lit` so consumers can decide where Lit is sourced (import map or bundler alias).
- Adopt PDS layers into Shadow DOM via `PDS.adoptLayers(sr)` or use `PDS.createStylesheet(css)` for local tweaks.
- Extend tokens: add custom CSS variables that build on top of generated scales.
- Author utilities and component styles that respect surfaces, states, and motion tokens for consistency.
- Progressive enhancement first: ship semantic HTML, enhance behavior when JS is available.


## Contributing

We welcome issues and PRs. A few notes to keep contributions smooth:

- Tooling
  - npm run dev — esbuild watch for JS bundles
  - npm run build — production build
  - npm run config-server — local configurator server (live tweaking)
  - npm run update-styles — regenerate styles from the current config
  - npm run pds:static — build a static bundle (CSS + auto‑define modules)
  - npm run sync-assets — helper to sync built assets (used by CLI)

- Code style
  - Native ESM across the repo
  - Prefer small, focused modules
  - No framework coupling in core; keep Storybook and other integrations optional

- Testing and demos
  - Add or update a page under `public/_test/` that showcases your change
  - Keep components progressively enhancing semantic HTML

- Docs
  - Keep README concise and actionable
  - Include before/after screenshots or GIFs for UI changes when possible

Thanks for helping make PDS a fast, practical, and truly “pure web” design system.
    content: ['image', 'file', 'file-text', 'folder', 'link', 'paperclip', 
              'play', 'pause', 'microphone', 'speaker-high'],
    status: ['info', 'warning', 'check-circle', 'x-circle', 'question', 
             'exclamation', 'shield-check', 'clock', 'spinner'],
    time: ['calendar', 'clock', 'timer', 'hourglass'],
    commerce: ['shopping-cart', 'credit-card', 'currency-dollar', 'tag', 'gift', 'package'],
    formatting: ['text-align-left', 'text-align-center', 'text-align-right', 
                 'text-b', 'text-italic', 'text-underline', 'list-bullets', 'list-numbers'],
    system: ['cloud', 'desktop', 'device-mobile', 'wifi', 'bluetooth', 
             'sun', 'moon', 'cpu', 'hard-drive', 'globe'],
  },
  
  spritePath: 'public/assets/img/icons.svg',
}
```

#### Build Process

**Generate icon sprite:**
```bash
npm run build-icons
```

This script:
1. Reads configuration from `auto-designer.config.js`
2. Downloads icons from Phosphor Icons CDN (v2.1.1)
3. Converts SVGs to optimized `<symbol>` elements
4. Generates sprite sheet at `public/assets/img/icons.svg`
5. Reports build statistics

#### Basic Usage

```html
<!-- Simple icon -->
<pds-icon icon="house"></pds-icon>

<!-- With size -->
<pds-icon icon="gear" size="lg"></pds-icon>
<pds-icon icon="heart" size="32"></pds-icon>

<!-- With color -->
<pds-icon icon="star" color="gold"></pds-icon>
<pds-icon icon="check" class="icon-success"></pds-icon>

<!-- With accessibility label -->
<pds-icon icon="menu" label="Open navigation menu"></pds-icon>
```

#### Size Variants

Use named sizes or pixel values:

```html
<pds-icon icon="home" size="xs"></pds-icon>  <!-- 16px -->
<pds-icon icon="home" size="sm"></pds-icon>  <!-- 20px -->
<pds-icon icon="home" size="md"></pds-icon>  <!-- 24px (default) -->
<pds-icon icon="home" size="lg"></pds-icon>  <!-- 32px -->
<pds-icon icon="home" size="xl"></pds-icon>  <!-- 48px -->
<pds-icon icon="home" size="2xl"></pds-icon> <!-- 64px -->
<pds-icon icon="home" size="40"></pds-icon>  <!-- Custom 40px -->
```

Or use utility classes:

```html
<pds-icon icon="gear" class="icon-xs"></pds-icon>
<pds-icon icon="gear" class="icon-sm"></pds-icon>
<pds-icon icon="gear" class="icon-lg"></pds-icon>
```

#### Color Utilities

Icons inherit `currentColor` by default:

```html
<!-- Inherits text color -->
<div style="color: blue;">
  <pds-icon icon="heart"></pds-icon>
</div>

<!-- Semantic colors -->
<pds-icon icon="check-circle" class="icon-success"></pds-icon>
<pds-icon icon="info" class="icon-primary"></pds-icon>
<pds-icon icon="warning" class="icon-warning"></pds-icon>
<pds-icon icon="x-circle" class="icon-danger"></pds-icon>

<!-- Custom color -->
<pds-icon icon="star" color="#fbbf24"></pds-icon>
```

#### Icon + Text Patterns

```html
<!-- Icon before text -->
<button class="icon-text">
  <pds-icon icon="plus"></pds-icon>
  <span>Add Item</span>
</button>

<!-- Icon after text -->
<button class="icon-text-end">
  <span>Next</span>
  <pds-icon icon="arrow-right"></pds-icon>
</button>

<!-- Icon-only button -->
<button class="icon-only">
  <pds-icon icon="x" label="Close"></pds-icon>
</button>
```

#### Icons in Inputs

```html
<!-- Icon at start -->
<div class="input-icon">
  <pds-icon icon="magnifying-glass"></pds-icon>
  <input type="search" placeholder="Search...">
</div>

<!-- Icon at end -->
<div class="input-icon-end">
  <input type="email" placeholder="Email">
  <pds-icon icon="envelope"></pds-icon>
</div>
```

#### Generated CSS Tokens

Generator generates these CSS variables:

```css
/* Icon configuration */
--icon-set: phosphor;
--icon-weight: regular;
--icon-size: 24px;
--icon-sprite-path: /assets/img/icons.svg;

/* Size scale */
--icon-size-xs: 16px;
--icon-size-sm: 20px;
--icon-size-md: 24px;
--icon-size-lg: 32px;
--icon-size-xl: 48px;
--icon-size-2xl: 64px;
```

#### Why Phosphor Icons?

- **9,072+ icons** - Most comprehensive modern icon set
- **6 weights** - thin, light, regular, bold, fill, duotone
- **Consistent design** - Professional, Airbnb-quality aesthetic
- **Active development** - Regular updates, maintained in 2025
- **MIT licensed** - Free for commercial use
- **Perfect for modern apps** - Clean, minimal, versatile

#### Features

✅ **Smart fallbacks** - Critical icons embedded in component  
✅ **Flexible sizing** - Named sizes or pixel values  
✅ **Color inheritance** - Uses `currentColor` by default  
✅ **Accessibility** - Optional labels, proper ARIA attributes  
✅ **Performance** - Single sprite sheet, minimal footprint  
✅ **Type safety** - Works seamlessly with TypeScript  
✅ **Framework agnostic** - Pure web components

#### Adding More Icons

1. Add icon names to `auto-designer.config.js`:
```javascript
icons: {
  include: {
    navigation: [..., 'compass', 'map-pin'],
    // Add to existing categories or create new ones
  }
}
```

2. Rebuild sprite:
```bash
npm run build-icons
```

3. Use immediately:
```html
<pds-icon icon="compass"></pds-icon>
```

#### Demo

View comprehensive examples at `/public/icons-demo.html` including:
- All 87 icons organized by category
- Size and color variants
- Icon + text combinations
- Icon buttons and inputs
- Live code examples

### Accessibility

WCAG compliance and motion preferences:

```javascript
a11y: {
  minTouchTarget: 44,           // Minimum tap size (iOS/Android standard)
  prefersReducedMotion: true,   // Respect user preferences
  focusStyle: 'ring',           // ring, outline, border, glow
}
```

---

## Web Components

### SvgIcon

Display icons from sprite sheet with automatic fallbacks:

```html
<pds-icon icon="house"></pds-icon>
<pds-icon icon="gear" size="32"></pds-icon>
<pds-icon icon="heart" size="lg" color="red"></pds-icon>
<pds-icon icon="menu" label="Open menu"></pds-icon>
```

**Attributes:**
- `icon`: Icon name (from sprite)
- `size`: Number (px) or named size (xs, sm, md, lg, xl, 2xl)
- `color`: CSS color value (default: currentColor)
- `label`: Aria label for accessibility

**Features:**
- Loads from SVG sprite sheet
- Inline fallbacks for critical icons
- Respects CSS color
- Flex-friendly sizing
- Accessibility support

**Utility classes:**
```html
<div class="icon-text">
  <pds-icon icon="envelope"></pds-icon>
  <span>Email</span>
</div>

<button class="icon-only">
  <pds-icon icon="gear"></pds-icon>
</button>

<div class="input-icon">
  <pds-icon icon="magnifying-glass"></pds-icon>
  <input type="search" placeholder="Search...">
</div>
```

### AppToaster

Toast notification system (auto-injected by PureApp):

**Features:**
- **Smart duration**: Calculates reading time (~200 WPM)
- **Type-specific styling**: Information, success, warning, error
- **Progress indicators**: Visual countdown
- **Mobile responsive**: Adaptive positioning
- **Accessibility**: ARIA labels, keyboard navigation
- **Auto-cleanup**: Memory management

**Direct usage (if not using PureApp):**
```javascript
import './src/js/pds-toaster.js';

const toaster = document.querySelector('pds-toaster');
toaster.toast('Message', 'success', 3000);
```

### TabStrip

Accessible tab navigation with hash-based routing and keyboard support:

```html
<pds-tabstrip label="Product Details">
  <pds-tabpanel id="overview" label="Overview">
    <h2>Product Overview</h2>
    <p>Main product information...</p>
  </pds-tabpanel>
  
  <pds-tabpanel id="specs" label="Specifications">
    <h2>Technical Specs</h2>
    <ul>
      <li>Processor: Intel i7</li>
      <li>RAM: 16GB</li>
    </ul>
  </pds-tabpanel>
  
  <pds-tabpanel id="reviews" label="Reviews">
    <h2>Customer Reviews</h2>
    <p>See what customers are saying...</p>
  </pds-tabpanel>
</pds-tabstrip>
```

**Features:**
- **Hash-based routing**: Each tab has shareable URL (`#overview`, `#specs`)
- **Keyboard navigation**: Arrow keys move between tabs
- **Accessible**: Full ARIA support (aria-current, aria-controls, role)
- **Progressive enhancement**: Works without JavaScript
- **Light DOM**: Natural CSS and page anchor behavior
- **Auto-management**: Generates IDs if missing

**Variants:**

```html
<!-- Default: Underline style -->
<pds-tabstrip>...</pds-tabstrip>

<!-- Pill style tabs -->
<pds-tabstrip class="tabs-pills">...</pds-tabstrip>

<!-- Boxed style tabs -->
<pds-tabstrip class="tabs-boxed">...</pds-tabstrip>

<!-- Vertical tabs -->
<pds-tabstrip class="tabs-vertical">...</pds-tabstrip>
```

**API:**

```javascript
const tabStrip = document.querySelector('pds-tabstrip');

// Programmatically select tab
window.location.hash = '#specs';

// Listen for tab changes
addEventListener('hashchange', () => {
  console.log('Tab changed to:', location.hash);
});
```

**Styling:**
- Uses design system tokens (`--color-*`, `--spacing-*`, `--font-*`)
- Animated tab indicator with smooth transitions
- Hover states with subtle backgrounds
- Focus-visible outline for keyboard navigation
- Mobile responsive with horizontal scrolling
- Vertical tabs collapse to horizontal on mobile

**Accessibility:**
- `aria-label` on navigation for screen readers
- `aria-current="page"` on active tab
- `aria-controls` linking tabs to panels
- `role="region"` on tab panels
- Keyboard navigation (Arrow keys, Enter, Space)
- Focus management and proper tab order

**Configuration:**

Enable/disable in your config:
```javascript
components: {
  tabStrip: true  // Default: true
}
```

---

## Features

### 🎨 Complete Color System

- **9-step scales** (50-900) for all brand colors
- **Semantic colors** auto-derived with proper contrast
- **Gray scale** from neutral color
- **Surface levels** for nested components
- **Border colors** with multiple opacities
- **Text colors** with hierarchy (primary, secondary, muted)

### 🌓 Smart Dark Mode

```css
@media (prefers-color-scheme: dark) {
  /* Automatically generated dark mode variants */
  --color-surface-base: hsl(...);
  --color-text-primary: hsl(...);
  /* Images auto-dim */
  img { opacity: 0.8; }
}
```

Manual override:
```javascript
colors: {
  darkMode: {
    background: '#1a1a1a',  // Custom dark background
    secondary: '#8b9199',   // Override specific colors
  }
}
```

### 📱 PWA-Ready

- **Mobile-first** responsive design
- **Touch targets** meet iOS/Android standards (44px minimum)
- **Semantic HTML** for better SEO and accessibility
- **Progressive enhancement** works without JavaScript

### ♿ Accessibility First

- **WCAG AAA** contrast ratios
- **Reduced motion** support (`prefers-reduced-motion`)
- **Focus indicators** keyboard navigation
- **ARIA labels** on all interactive elements
- **Screen reader** friendly markup

### 📐 Mathematical Spacing

All spacing uses consistent scale:
```css
gap: var(--spacing-4);
padding: var(--spacing-6);
margin: var(--spacing-8);
```

### 🎯 Form Perfection

Complete form control styling with:
- All input types
- Interactive states (hover, focus, disabled, invalid)
- Custom checkboxes/radios
- Select dropdowns
- Textareas with auto-resize
- Field validation states

### 🎭 Surface Nesting

Automatic contrast adjustment for layered UI:
```css
.surface-base     /* Level 0 - base background */
.surface-raised   /* Level 1 - cards, panels */
.surface-overlay  /* Level 2 - dropdowns, modals */
```

### 📊 Component Library

Optional components (enable/disable in config):
- **Tables** with sorting indicators
- **Alerts** with semantic colors
- **Badges** with variants
- **Modals** with backdrop blur
- **Toasts** with smart timing
- **Buttons** with states

---

## API Reference

### Generator Class

```javascript
import { Generator } from './src/js/auto-designer.js';

const designer = new Generator(config);
```

**Methods:**

```javascript
// Inject styles into document
designer.injectStyles();

// Get generated CSS as string
const css = designer.css;

// Access generated tokens
const tokens = designer.tokens;
console.log(tokens.colors.primary);

// Re-configure (regenerates CSS)
designer.configure(newConfig);
```

**Enums:**

```javascript
enums.RadiusSizes     // none, small, medium, large, full
enums.BorderWidths    // hairline, thin, medium, thick
enums.FontWeights     // light, normal, medium, semibold, bold
enums.LineHeights     // tight, normal, relaxed
enums.ShadowDepths    // none, light, medium, deep, extreme
enums.TransitionSpeeds // fast, normal, slow
enums.AnimationEasings // linear, ease, ease-in, ease-out, ...
```


// Dialogs
```js
await PDS.ask(message, options);
```

**Ask Options:**

```js
{
  title: 'Dialog Title',
  content: '<p>Additional HTML</p>',
  useForm: false,  
  buttons: {
    ok: { name: 'OK', default: true },
    cancel: { name: 'Cancel', cancel: true },
    custom: { name: 'Custom Action' }
  }
}
```

### AutoForm Component

```javascript
const form = document.querySelector('auto-form');

// Get generated form element
const formElement = form.form;

// Get form data
const data = Object.fromEntries(new FormData(formElement));

// Validation
if (formElement.checkValidity()) {
  // Form is valid
}
```

### SvgIcon Component

```javascript
const icon = document.querySelector('pds-icon');

// Attributes
icon.setAttribute('icon', 'house');
icon.setAttribute('size', '32');
icon.setAttribute('color', '#ff0000');
icon.setAttribute('label', 'Home');

// CSS Custom Properties
icon.style.setProperty('--icon-size', '48px');
```

---

## Examples

### Complete Configuration

See `auto-designer.config.js` for full example with all options.

### Basic Page Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure App</title>
</head>
<body>
  <div class="container">
    <h1>Welcome</h1>
    <button onclick="this.closest('pure-app').success('Hello!')">
      <pds-icon icon="heart"></pds-icon>
      Click Me
    </button>
  </div>
</body>
</html>
```

### Icon Usage

```html
<!-- Basic icon -->
<pds-icon icon="house"></pds-icon>

<!-- Sized icon -->
<pds-icon icon="gear" size="lg"></pds-icon>

<!-- Colored icon -->
<pds-icon icon="heart" color="red"></pds-icon>

<!-- Icon with text -->
<div class="icon-text">
  <pds-icon icon="envelope"></pds-icon>
  <span>Email</span>
</div>

<!-- Icon button -->
<button class="icon-only">
  <pds-icon icon="x" label="Close"></pds-icon>
</button>

<!-- Input with icon -->
<div class="input-icon">
  <pds-icon icon="magnifying-glass"></pds-icon>
  <input type="search" placeholder="Search...">
</div>
```

---

## Demos

- **`index.html`** - AutoForm and dialog system demonstrations
- **`public/demo.html`** - Complete design system showcase with live controls
- **`public/pds-jsonform-actions-demo.html`** - Advanced form examples

---

## Architecture

### Pure Web Standards

- **No framework dependencies** - Vanilla JavaScript + Web Components
- **ESM modules** - Native JavaScript modules
- **CSS Custom Properties** - Runtime design updates
- **Semantic HTML** - Accessible, SEO-friendly markup
- **Progressive enhancement** - Works without JS, enhanced with it

### Component Architecture

- **Web Components** using standard Custom Elements API
- **Lit** for advanced reactive components
- **Shadow DOM** isolation where appropriate
- **Auto-registration** components self-register
- **Modular imports** use only what you need

### Design Token System

1. **Configuration** → Generator config object
2. **Token Generation** → Semantic design tokens
3. **CSS Variables** → Runtime-modifiable properties
4. **Component Styles** → Tokens applied to components

```
Config → Tokens → CSS Variables → Components
```

---

## Build & Development

### Build Icon Sprite

```bash
node scripts/build-icons.mjs
```

Downloads icons from CDN and generates optimized SVG sprite.

### Export Config to JSON

```bash
node scripts/export-config-json.mjs
```

### Verify Configurations

```bash
node scripts/verify-configs.mjs
```

### Dev Server

```bash
npm run dev
```

Runs esbuild in watch mode with live reload.

---

## Browser Support

- **Modern browsers** with ES2020+ support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- No IE11 support

---

## Qogni Dev Onboarding

### Core Topics

- [Pure Web Manifesto](https://pureweb.dev/manifesto)
- **Semantic HTML** - Meaningful, accessible markup
- **Pure CSS** - Custom properties, no preprocessors
- [Baseline Web Standards](https://web.dev/baseline)
- **ESM/ECMAScript** - Native JavaScript modules
- **Web Components** - Custom elements, Shadow DOM
- **Vanilla JS** - Browser as framework
- **Lit** - Lightweight reactive components
- **ESBuild** - Fast bundling
- **PWA** - Progressive web apps

### Philosophy

> **"The browser is the framework"**

Use web standards first. Add abstractions only when they provide clear value. Prefer composition over inheritance. Keep it simple, keep it fast, keep it accessible.

---

## License

MIT

---

## Contributing

Contributions welcome! Please ensure:
- Code follows Pure Web principles
- No framework dependencies
- Accessibility tested
- Works without JavaScript (progressive enhancement)
- Documentation updated

---

**Made with ❤️ for the open web**


