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

This generates **500+ CSS variables** and comprehensive styles for:
- ✅ Complete color system with semantic scales
- ✅ Typography with responsive sizes
- ✅ Spacing and layout utilities
- ✅ Form controls with all interactive states
- ✅ Components (buttons, alerts, badges, modals)
- ✅ Dark mode support
- ✅ Accessibility features
- ✅ Icon system integration

---

## Core Concepts

### 🎨 Generator

The heart of the system. Transforms minimal configuration into a complete design language:

```javascript
const designer = new Generator(config);
designer.injectStyles(); // Injects into document
const css = designer.css; // Or get as string
```

### 📐 Mathematical Scales

Everything derives from base values using mathematical ratios:
- **Colors**: 9-step scale (50-900) generated from single color
- **Spacing**: Exponential scale from `baseUnit` × `scaleRatio`
- **Typography**: Modular scale for font sizes
- **Semantic tokens**: Meaningful names mapped to scales

### 🌓 Smart Dark Mode

Automatic color inversion with intelligent adjustments:
- Image dimming for dark backgrounds
- Preserves color relationships
- Maintains WCAG contrast ratios
- Optional manual overrides

---

## Configuration

### Colors

Generate complete color palettes from base colors:

```javascript
colors: {
  // Core brand colors (required)
  primary: '#2563eb',      // Primary brand color
  secondary: '#64748b',    // Secondary/neutral color
  accent: '#f59e0b',       // Accent/highlight color
  background: '#ffffff',   // Base background
  
  // Semantic colors (auto-generated if omitted)
  success: null,           // Auto: green variant of primary
  warning: null,           // Auto: uses accent
  danger: null,            // Auto: red variant of primary
  info: null,              // Auto: uses primary
  
  // Dark mode (auto-generated if omitted)
  darkMode: {
    background: '#1a1a1a', // Dark background
    secondary: '#8b9199',  // Override specific colors
    // Other colors auto-adjust from light mode
  },
  
  // Advanced
  gradientStops: 3,        // Gradient color steps
  elevationOpacity: 0.05,  // Shadow overlay opacity
}
```

**Generated tokens:**
```css
--color-primary-50 through --color-primary-900
--color-secondary-50 through --color-secondary-900
--color-success-600, --color-danger-600, etc.
--color-text-primary, --color-text-secondary, --color-text-muted
--color-surface-base, --color-surface-elevated, --color-surface-overlay
--color-border, --color-border-subtle, --color-focus
```

### Typography

Complete type system with modular scale:

```javascript
typography: {
  // Font stacks
  fontFamilySans: 'system-ui, -apple-system, sans-serif',
  fontFamilyMono: 'ui-monospace, Consolas, monospace',
  
  // Base size (default: 16px)
  baseFontSize: 16,
  
  // Font weights (enum or number)
  fontWeightLight: 'light',      // or 300
  fontWeightNormal: 'normal',    // or 400
  fontWeightMedium: 'medium',    // or 500
  fontWeightSemibold: 'semibold',// or 600
  fontWeightBold: 'bold',        // or 700
  
  // Line heights (enum or number)
  lineHeightTight: 'tight',      // or 1.25
  lineHeightNormal: 'normal',    // or 1.5
  lineHeightRelaxed: 'relaxed',  // or 1.75
  
  // Letter spacing
  letterSpacingTight: -0.025,
  letterSpacingNormal: 0,
  letterSpacingWide: 0.025,
}
```

**Generated tokens:**
```css
--font-family-sans, --font-family-mono
--font-size-xs through --font-size-4xl
--font-weight-light through --font-weight-bold
--font-lineHeight-tight, --font-lineHeight-normal, --font-lineHeight-relaxed
```

### Spatial Rhythm

Mathematical spacing system:

```javascript
spatialRhythm: {
  baseUnit: 16,            // All spacing derives from this
  scaleRatio: 1.25,        // Growth ratio (1.25 = major third)
  maxSpacingSteps: 32,     // Maximum spacing value
  
  // Container
  containerMaxWidth: 1200,
  containerPadding: 1.0,   // Multiplier of baseUnit
  
  // Component spacing
  inputPadding: 0.75,
  buttonPadding: 1.0,
  sectionSpacing: 2.0,
}
```

**Generated scale:**
```css
--spacing-0: 0
--spacing-1: 4px     /* baseUnit × 0.25 */
--spacing-2: 8px     /* baseUnit × 0.5 */
--spacing-3: 12px    /* baseUnit × 0.75 */
--spacing-4: 16px    /* baseUnit × 1 */
--spacing-5: 20px    /* baseUnit × 1.25 */
--spacing-6: 24px    /* baseUnit × 1.5 */
/* ... continues to 32 */
```

### Shape & Borders

Control roundness and borders:

```javascript
shape: {
  // Corner radius (enum or custom)
  radiusSize: 'medium',    // none, small, medium, large, full
  customRadius: null,      // Or specify px value: 8
  
  // Border width (enum)
  borderWidth: 'thin',     // hairline, thin, medium, thick
}
```

**Enum values:**
```javascript
RadiusSizes: {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
  full: 9999,
}

BorderWidths: {
  hairline: 0.5,
  thin: 1,
  medium: 2,
  thick: 3,
}
```

### Layers & Shadows

Depth and z-index hierarchy:

```javascript
layers: {
  // Shadow depth
  shadowDepth: 'medium',   // none, light, medium, deep, extreme
  
  // Blur levels (px)
  blurLight: 4,
  blurMedium: 8,
  blurHeavy: 16,
  
  // Z-index scale
  zIndexBase: 0,
  zIndexDropdown: 1000,
  zIndexSticky: 1020,
  zIndexFixed: 1030,
  zIndexModal: 1040,
  zIndexPopover: 1050,
  zIndexTooltip: 1060,
  zIndexNotification: 1070,
}
```

### Behavior & Motion

Transitions and animations:

```javascript
behavior: {
  // Transition speed (enum or custom ms)
  transitionSpeed: 'normal',  // fast (150ms), normal (250ms), slow (350ms)
  customTransitionSpeed: null,
  
  // Easing function
  animationEasing: 'ease-out',  // linear, ease, ease-in, ease-out, ease-in-out, bounce
  customEasing: null,            // Or cubic-bezier(...)
  
  // Focus ring
  focusRingWidth: 3,
  focusRingOpacity: 0.3,
  
  // Hover effects
  hoverOpacity: 0.8,
}
```

### Layout

Grid system and breakpoints:

```javascript
layout: {
  // Grid
  gridColumns: 12,
  gridGutter: 1.0,         // Multiplier of baseUnit
  
  // Responsive breakpoints (px)
  breakpoints: {
    sm: 640,   // Mobile
    md: 768,   // Tablet
    lg: 1024,  // Desktop
    xl: 1280,  // Wide
  },
  
  // Density variants
  densityCompact: 0.8,
  densityNormal: 1.0,
  densityComfortable: 1.2,
  
  // Touch targets
  buttonMinHeight: 44,     // iOS/Android standard
  inputMinHeight: 40,
}
```

### Icons

**Professional icon system with Phosphor Icons** - 9,072+ icons, 6 weights, world-class design.

#### Configuration

```javascript
icons: {
  set: 'phosphor',         // phosphor, lucide, heroicons, tabler, custom
  weight: 'regular',       // For Phosphor: thin, light, regular, bold, fill, duotone
  defaultSize: 24,
  
  // Size scale
  sizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64,
  },
  
  // Icons organized by category (87 icons included)
  include: {
    navigation: ['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'caret-left', 
                 'caret-right', 'caret-up', 'caret-down', 'house', 'magnifying-glass',
                 'list', 'dots-three-vertical', 'dots-three', 'x', 'check', 'gear'],
    actions: ['plus', 'minus', 'check', 'x', 'trash', 'pencil', 'copy', 'download',
              'upload', 'share', 'heart', 'star', 'bookmark', 'eye', 'eye-slash', 'lock'],
    communication: ['envelope', 'bell', 'chat-circle', 'phone', 'video-camera', 
                    'user', 'users', 'at'],
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


