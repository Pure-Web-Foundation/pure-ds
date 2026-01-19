# Getting Started with Pure Design System

From zero to hero with PDS.

## 1. Installation (or not)

### Option A: NPM Package (Recommended)

```bash
npm install @pure-ds/core
```

**What happens during install:**

PDS automatically sets up your project:
- ✅ Creates `pds.config.js` with commented examples (if it doesn't exist)
- ✅ Builds static assets to your web root (components, icons, styles)
- ✅ Copies AI/Copilot instructions to `.github/copilot-instructions.md`
- ✅ Adds helper scripts to your `package.json` (`pds:build`, `pds:build-icons`)

The generated `pds.config.js` includes:

```javascript
// pds.config.js (auto-generated)
export const config = {
  mode: "live",
  preset: "default",

  // Uncomment and customize as needed:
  // design: { colors: { primary: '#007acc' } },
  // enhancers: [ /* custom enhancements */ ],
  // autoDefine: { predefine: ['pds-icon'] }
}
```

Then initialize in your app:

```javascript
import { PDS } from '@pure-ds/core';
import { config } from "./pds.config.js"; // project root

await PDS.start(config); // That's it! Start writing semantic HTML.
```

**Manual config generation:**

```bash
# Create or regenerate config with examples
npx pds-init-config

# Force overwrite existing config
npx pds-init-config --force
```

### Option B: CDN (Zero Install)

Perfect for quick prototypes and learning:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My PDS App</title>
  <script type="module" defer>
    import { PDS } from "https://unpkg.com/pure-ds@latest/public/assets/js/pds.js";

    await PDS.start({
      mode: "live",
      preset: "social-feed" 
    });
  </script>
</head>
<body class="container">
  [...]
</body>
</html>
```

> See the [**PDS CodePen Collection**](https://codepen.io/collection/rBjkOy)
> These live examples let you see PDS in action and fork them for your own experiments.

---

### Power Through Composition

PDS gives you high-level primitives that compose naturally. No atomic utility classes to memorize—just semantic HTML with meaningful class names:

```html
<!-- A complete card with surface treatment -->
<article class="card surface-elevated">
  <header>
    <h3>Welcome to PDS</h3>
    <p class="text-muted">The browser is the framework</p>
  </header>
  <p>Write semantic HTML, get beautiful results.</p>
  <footer class="flex gap-sm justify-end">
    <button class="btn-secondary">Learn More</button>
    <button class="btn-primary">Get Started</button>
  </footer>
</article>
```

**What's happening here:**
- `article.card` → semantic card primitive with proper spacing and borders
- `.surface-elevated` → contextual surface with shadow and background
- `header` with `h3` + `.text-muted` → automatic title/subtitle hierarchy
- `footer.flex.gap-sm.justify-end` → action area with button alignment

Each class represents a **design decision**, not a CSS property. That's the PDS difference.

---

## 2. Understanding pds.config.js

The heart of PDS is a simple JavaScript configuration file:

```javascript
// pds.config.js
export const config = {
  // Runtime mode: 'live' generates CSS at runtime, 'static' uses pre-built files
  mode: "live",
  
  // Start with a preset (optional)
  preset: "default", // ocean-breeze, midnight-steel, sunset-vibes...
  
  // Design tokens - override any preset values
  design: {
    colors: {
      primary: '#007acc',
      secondary: '#5c2d91'
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.25,
      fontFamilyHeadings: 'Inter, sans-serif',
      fontFamilyBody: 'Inter, sans-serif'
    },
    spatialRhythm: {
      baseUnit: 8,
      scaleRatio: 1.5
    }
  },

  // Web Component auto-loading
  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  // Custom progressive enhancements (optional)
  enhancers: [
    {
      selector: '[data-tooltip]',
      description: 'Adds tooltip on hover',
      run: (element) => { /* enhancement logic */ }
    }
  ],

  // Logging callback (optional)
  log(level, message, ...data) {
    console[level](message, ...data);
  }
};
```

### Available Presets

```javascript
Object.keys(PDS.presets);
// ['default', 'ocean-breeze', 'midnight-steel', 'sunset-vibes',
//  'forest-calm', 'lavender-dream', 'coral-energy', 'arctic-frost',
//  'golden-hour', 'neon-city', 'travel-market', 'mobility-app']
```

### Live vs Static Mode

| Feature | Live Mode | Static Mode |
|---------|-----------|-------------|
| CSS Generation | Runtime (in browser) | Build time |
| Config changes | Instant preview | Requires rebuild |
| Best for | Development, configurators | Production |
| `PDS.compiled` | Full access | Not available |

---

## 3. Running a Local Storybook

Want to explore all PDS features interactively? Set up the reference Storybook:

### Install the Storybook Package

```bash
npm install @pure-ds/storybook
```

### Integration into Your Project

```bash
# Run integration from your project root
npx pds-storybook

# Start your Storybook
npm run storybook
```

**What happens:**
- ✅ Validates your environment
- ✅ Exports PDS assets to `public/assets/pds/`
- ✅ Copies stories to `.storybook/pds-stories/`
- ✅ Patches `.storybook/preview.js` to initialize PDS

### Storybook Features

Once running, you'll find:

- **🎨 Configurator** - Click the circle icon in the toolbar to open a live configuration panel
- **🔍 Quick Search** - Query tokens and components with natural language
- **📚 Stories** organized by design system standards:
  - **Foundations** - Colors, typography, spacing, icons
  - **Primitives** - Buttons, forms, cards, badges, alerts
  - **Components** - Web Components (`<pds-*>`)
  - **Patterns** - Layout utilities, border effects
  - **Enhancements** - Progressive HTML enhancements

---

## 4. Using PDS (Pure Web Manifesto in Practice)

### Semantic HTML First

Just write HTML. PDS makes it look right:

```html
<!-- Card with semantic markup -->
<article class="card">
  <header>
    <h3>Card Title</h3>
  </header>
  <p>Content that speaks for itself.</p>
  <footer>
    <button class="btn-primary">Action</button>
  </footer>
</article>

<!-- Buttons - no component imports needed -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-outline">Outline</button>

<!-- Alerts with semantic meaning -->
<div class="alert alert-success">Operation completed!</div>
<div class="alert alert-warning">Please review before continuing.</div>
```

### Layout Utilities (Sparingly)

PDS provides a small set of layout utilities for composition:

```html
<!-- Flex layout -->
<div class="flex gap-md items-center">
  <pds-icon icon="user"></pds-icon>
  <span>Profile</span>
</div>

<!-- Stack layout (vertical) -->
<section class="stack-lg">
  <h2>Section Title</h2>
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</section>

<!-- Grid -->
<div class="grid grid-cols-3 gap-md">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

### Using CSS Tokens

All design values are CSS custom properties:

```css
/* In your CSS */
.my-component {
  background: var(--surface-bg);
  color: var(--surface-text);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.highlight {
  color: var(--color-primary-600);
  border-color: var(--color-primary-300);
}
```

### Using Web Components

PDS components auto-load when used:

```html
<!-- Icons from sprite -->
<pds-icon icon="heart"></pds-icon>
<pds-icon icon="star" size="lg"></pds-icon>

<!-- Drawer panel -->
<pds-drawer id="menu" position="left">
  <h2 slot="header">Menu</h2>
  <nav>...</nav>
</pds-drawer>
<button onclick="document.getElementById('menu').open()">Open Menu</button>

<!-- Tabs -->
<pds-tabstrip>
  <button slot="tab">Overview</button>
  <div slot="panel">Overview content</div>
  <button slot="tab">Details</button>
  <div slot="panel">Details content</div>
</pds-tabstrip>

<!-- Toast notifications -->
<pds-toaster id="toaster"></pds-toaster>
<script>
  PDS.toast("Saved successfully!", { type: "success" });
</script>
```

---

## 5. Progressive Enhancements

Enhancements add behavior to semantic HTML without requiring JavaScript frameworks.

### Built-in Enhancements

**Dropdown menus** – `<nav data-dropdown>`
```html
<nav data-dropdown>
  <button>Menu</button>
  <menu>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </menu>
</nav>
```

**Toggle switches** – `<label data-toggle>`
```html
<label data-toggle>
  <span data-label>Enable notifications</span>
  <input type="checkbox">
</label>
```

**Required field indicators** – automatic on `[required]`
```html
<label>
  <span>Email</span>
  <input type="email" required>
</label>
<!-- Asterisk added automatically! -->
```

**Range sliders** – enhanced `<input type="range">`
```html
<label class="range-output">
  <span>Volume</span>
  <input type="range" min="0" max="100" value="50">
</label>
<!-- Value display added automatically! -->
```

### Creating Custom Enhancers

Add your own enhancements in `pds.config.js`:

```javascript
export const config = {
  enhancers: [
    {
      selector: '[data-copy]',
      description: 'Copy text to clipboard on click',
      run: (element) => {
        element.addEventListener('click', () => {
          navigator.clipboard.writeText(element.dataset.copy);
          PDS.toast('Copied!', { type: 'success' });
        });
      }
    },
    {
      selector: '[data-animate-in]',
      description: 'Animate elements as they enter viewport',
      run: (element) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              element.classList.add('animated');
              observer.unobserve(element);
            }
          });
        });
        observer.observe(element);
      }
    }
  ]
};
```

### Testing Enhancements

1. Add your enhancer to `pds.config.js`
2. Restart PDS (or call `PDS.start()` again)
3. Add matching HTML to your page
4. Check the browser console for PDS logs
5. Verify the enhancement runs on matching elements

---

## 6. Auto-Defining Your Own Web Components

The `autoDefine` system can load your custom components alongside PDS components.

### Configure Custom Mappings

```javascript
export const config = {
  autoDefine: {
    // Eagerly load these at startup
    predefine: ['pds-icon', 'my-header'],
    
    // Map custom tags to files
    mapper: (tag) => {
      // Your custom components
      if (tag.startsWith('my-')) {
        return `/components/${tag}.js`;
      }
      // Return nothing to use PDS default mapping for pds-* tags
    }
  }
};
```

### Create Your Component

```javascript
// /components/my-header.js
import { html, css, LitElement } from '#pds/lit';

class MyHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    // Adopt PDS styles into Shadow DOM
    await PDS.adoptPrimitives(this.shadowRoot);
  }

  render() {
    return html`
      <header class="surface-elevated">
        <nav class="flex gap-md items-center">
          <slot name="logo"></slot>
          <slot></slot>
        </nav>
      </header>
    `;
  }
}

customElements.define('my-header', MyHeader);
```

### Use in HTML

```html
<my-header>
  <img slot="logo" src="logo.svg" alt="Logo">
  <a href="/">Home</a>
  <a href="/about">About</a>
</my-header>
```

The component auto-loads when the tag is encountered in the DOM!

---

## 7. Working with PDS in the Console

PDS exposes a rich API for debugging and exploration in DevTools.

### Open DevTools and Try:

```javascript
// Check PDS is loaded
PDS

// View current configuration
PDS.currentConfig

// Access compiled tokens (live mode)
PDS.compiled.tokens.colors.primary
PDS.compiled.tokens.spacing

// List available presets
Object.keys(PDS.presets)

// Get a specific preset config
PDS.presets['ocean-breeze']

// Query the design system with natural language
await PDS.query("button hover color")
await PDS.query("what spacing values are available?")
await PDS.query("how do I create a card?")

// Theme management
PDS.theme           // Get current theme
PDS.theme = 'dark'  // Set theme
PDS.theme = 'system' // Follow OS preference

// Show a toast notification
PDS.toast("Hello from the console!", { type: "info" });

// Show a dialog
await PDS.ask("Are you sure?", { type: "confirm" });

// Validate design accessibility
import { validateDesign } from '/assets/js/pds-core/pds-generator.js';

validateDesign({
  colors: { primary: '#007acc', background: '#ffffff' }
}, { minContrast: 4.5 });

// List all enhancers
PDS.defaultEnhancers

// Access design system metadata
PDS.ontology.primitives
PDS.ontology.layout
```

### Listening to Events

```javascript
// System ready
PDS.addEventListener('pds:ready', (e) => console.log('Ready!', e.detail));

// Theme changed
PDS.addEventListener('pds:theme:changed', (e) => console.log('Theme:', e.detail.theme));

// Design updated (from configurator)
PDS.addEventListener('pds:design:updated', (e) => console.log('Config:', e.detail.config));
```

---

## 8. Resources

### Official Links

- 🏠 [**GitHub Repository**](https://github.com/mvneerven/pure-ds)
- 📦 [**NPM: @pure-ds/core**](https://www.npmjs.com/package/@pure-ds/core)
- 📖 [**Pure Web Manifesto**](https://pureweb.dev/manifesto)
- 🎮 [**CodePen Collection**](https://codepen.io/collection/rBjkOy)

### Documentation

- Browse the **Foundations** section to understand tokens
- Check **Primitives** for available CSS classes
- Explore **Components** for Web Component APIs
- Review **Enhancements** for progressive upgrade patterns

### Quick Reference

| Task | Solution |
|------|----------|
| Show a dialog | `await PDS.ask("Message", { type: "confirm" })` |
| Toast notification | `PDS.toast("Message", { type: "success" })` |
| Change theme | `PDS.theme = 'dark'` |
| Query tokens | `await PDS.query("primary color")` |
| Adopt styles in Shadow DOM | `await PDS.adoptPrimitives(shadowRoot)` |

### Getting Help

- Use the **Quick Search** (🔍 icon in toolbar) to ask natural language questions
- Open the **Configurator** (⚙️ icon) to experiment with design values
- Check browser DevTools console for PDS logging
- Explore `PDS.compiled` in live mode for full introspection

---

**Happy building with PDS!** Remember: The browser is the framework. Write semantic HTML, let PDS handle the rest.
