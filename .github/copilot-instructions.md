# PDS (Pure Design System) - Copilot Instructions

> **CRITICAL**: This workspace uses **Pure Design System (PDS)**. All code generation MUST follow PDS and vanilla Web Platform patterns. Never use 3rd party framework patterns, non-PDS utility classes, inline styles, or hardcoded CSS values.

## Philosophy

PDS follows the [Pure Web Manifesto](https://pureweb.dev/manifesto): "The browser is the framework."

1. **Standards-first**: Web Platform APIs only (no framework dependencies)
2. **Configuration-driven**: `pds.config.js` generates everything
3. **Progressive Enhancement**: Semantic HTML first, enhance where needed
4. **Components as Last Resort**: Web Components only when native HTML cannot achieve it

### The Three Layers

**Layer 1 — Styles**: From minimal config, PDS generates complete CSS: tokens, scales, semantics, surfaces, states. Zero specificity via `:where()`.

**Layer 2 — Enhancements**: Behavior added to semantic HTML via selector-based upgrades (`data-dropdown`, `data-toggle`, etc.).

**Layer 3 — Web Components**: `<pds-tabstrip>`, `<pds-drawer>`, etc. only when native HTML has no equivalent.

---

## 🔍 Single Sources of Truth (ALWAYS CONSULT THESE FIRST)

**Before generating code, read the relevant SSoT file to get accurate class names, tokens, and APIs.**

| Need | SSoT File | What It Contains |
|------|-----------|------------------|
| **CSS Tokens** | `public/assets/pds/pds.css-data.json` | All `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*` |
| **Web Components** | `custom-elements.json` | Complete component APIs, attributes, methods, events, slots |
| **HTML Tags** | `public/assets/pds/vscode-custom-data.json` | Component HTML structure, attribute values |
| **Primitives & Utilities** | `src/js/pds-core/pds-ontology.js` | `.card`, `.badge`, `.btn-*`, `.flex`, `.gap-*`, `.surface-*` |
| **Enhancements** | `src/js/pds-core/pds-enhancer-metadata.js` | Selectors + `demoHtml` examples for each enhancement |
| **Generator Logic** | `src/js/pds-core/pds-generator.js` | How CSS is generated, token naming conventions |
| **Config** | `pds.config.js` | What's enabled in this workspace |

**For consuming projects** using `@pure-ds/core`, files are in `node_modules/@pure-ds/core/`:
- `custom-elements.json`
- `public/assets/pds/pds.css-data.json`
- `public/assets/pds/vscode-custom-data.json`
- `src/js/pds-core/pds-ontology.js`

---

## 🚫 Critical Anti-Patterns (NEVER DO THIS)

```html
<!-- ❌ NEVER: Inline styles -->
<div style="display: flex; gap: 16px; padding: 20px;">

<!-- ❌ NEVER: Hardcoded colors -->
<button style="background: #007acc; color: white;">

<!-- ❌ NEVER: Non-semantic HTML -->
<div class="button" onclick="handleClick()">Click me</div>

<!-- ❌ NEVER: Custom CSS when primitives exist -->
<style>.my-card { border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }</style>
```

```javascript
// ❌ NEVER: Browser dialogs - Use PDS.ask() and PDS.toast()
alert("message");   // → PDS.toast("message", { type: "info" })
confirm("sure?");   // → await PDS.ask("sure?", { type: "confirm" })
prompt("name?");    // → await PDS.ask("name?", { type: "prompt" })

// ❌ NEVER: Manual dropdown/modal/tab implementations
// → Use <nav data-dropdown>, PDS.ask(), <pds-tabstrip>

// ❌ NEVER: Access lazy-loaded component APIs before they're defined
const form = document.querySelector('pds-form');
form.getFormData(); // May fail - component not loaded yet
```

---

## ⚡ Lit Components & Import Maps

**Components that require Lit:** `pds-form`

This component uses `import { ... } from "#pds/lit"` and **requires** an import map:

```html
<!-- REQUIRED in HTML <head> for Lit components -->
<script type="importmap">
{
  "imports": {
    "#pds/lit": "/assets/js/lit.js"
  }
}
</script>
```

**When generating code with lazy-loaded components, ALWAYS wait for definition:**

```javascript
// ✅ CORRECT: Wait for component to load
await customElements.whenDefined('pds-form');
const form = document.querySelector('pds-form');
form.getFormData(); // Safe

// ✅ CORRECT: Alternative pattern
const FormClass = await customElements.get('pds-form');
if (FormClass) {
  const form = document.createElement('pds-form');
  // ...
}

// ❌ WRONG: Direct access without waiting
const form = document.querySelector('pds-form');
form.getFormData(); // May throw error
```

---

## ✅ Quick Reference Patterns

```html
<!-- Buttons: semantic HTML + PDS classes (see pds-ontology.js → primitives) -->
<button class="btn-primary">Save</button>
<button class="btn-secondary">Cancel</button>
<button class="btn-outline">Details</button>
<button class="btn-primary icon-only" aria-label="Settings">
  <pds-icon icon="gear"></pds-icon>
</button>

<!-- Layout: utility classes (see pds-ontology.js → layoutPatterns, utilities) -->
<div class="flex gap-md items-center">
<div class="grid grid-cols-3 gap-lg">
<div class="stack-md">

<!-- Cards & Surfaces: primitives -->
<article class="card surface-elevated">
  <header class="flex justify-between items-center">
    <h3>Title</h3>
  </header>
  <p class="text-muted">Content</p>
</article>

<!-- Icons: web component (see custom-elements.json) -->
<pds-icon icon="heart" size="sm"></pds-icon>
<pds-icon icon="check" size="lg" color="var(--color-success-500)"></pds-icon>

<!-- Enhancements: data attributes (see pds-enhancer-metadata.js) -->
<nav data-dropdown>
  <button>Menu</button>
  <menu><li><a href="#">Item</a></li></menu>
</nav>

<label data-toggle>
  <input type="checkbox">
  <span data-label>Enable feature</span>
</label>

<form data-required>
  <label><span>Email</span><input type="email" required></label>
</form>

<!-- Tabs: web component -->
<pds-tabstrip>
  <button slot="tab">Tab 1</button>
  <div slot="panel">Content 1</div>
  <button slot="tab">Tab 2</button>
  <div slot="panel">Content 2</div>
</pds-tabstrip>
```

```javascript
// Dialogs & Toasts: PDS API
const confirmed = await PDS.ask("Delete this item?", { 
  type: "confirm",
  buttons: { ok: { name: "Delete", variant: "danger" } }
});

PDS.toast("Saved successfully!", { type: "success" });

// Theme management
PDS.theme = 'dark';  // 'light' | 'dark' | 'system'

// Query the design system
const results = await PDS.query("border gradient classes");
```

---

## How to Look Things Up

| Question | Action |
|----------|--------|
| "What CSS tokens exist?" | Read `pds.css-data.json` |
| "What components are available?" | Read `custom-elements.json` |
| "What utility classes exist?" | Read `pds-ontology.js` → `layoutPatterns`, `utilities` |
| "What primitives exist?" | Read `pds-ontology.js` → `primitives` |
| "How do I enhance HTML?" | Read `pds-enhancer-metadata.js` → `demoHtml` |
| "How are tokens named?" | Read `pds-generator.js` or `pds.css-data.json` |

---

## Summary Checklist

Before generating code:

1. ✅ **Consult SSoT files** — Don't guess class names or token names
2. ✅ **No inline styles** — Use CSS tokens via custom properties
3. ✅ **No hardcoded values** — Colors, spacing, radii all have tokens
4. ✅ **No alert/confirm/prompt** — Use `PDS.ask()` and `PDS.toast()`
5. ✅ **Use semantic HTML** — `<button>`, `<nav>`, `<article>`, `<label>`, `<details>`
6. ✅ **Apply enhancements via data-* attributes** — See `pds-enhancer-metadata.js`
7. ✅ **Components as last resort** — Only when native HTML can't achieve it
8. ✅ **Prefer primitives** — `.card`, `.badge`, `.alert` over custom components
9. ✅ **Wait for lazy components** — Use `await customElements.whenDefined()` before accessing APIs
10. ✅ **Include import map** — When using `pds-form` or `pds-drawer`, ensure `#pds/lit` is mapped
