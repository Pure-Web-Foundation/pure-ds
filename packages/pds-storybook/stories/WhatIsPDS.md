![Pure Design System logo](/assets/img/logo.png) 

# With Great Standards Comes Great Power

PDS is a **configuration-first, standards-only design system generator**.

Not a framework. Not a utility library. Not tied to any toolchain.

The browser is the framework. Semantic HTML is the component model. **Web Standards are enough.**

---

## The PDS Philosophy

PDS generates CSS from your config. But *how* that CSS is meant to be used is what sets PDS apart.

### 1. Semantic Classes First

PDS generates **high-level, meaningful primitives**:

```html
<article class="card">
  <h3>Title</h3>
  <p>Content that speaks for itself.</p>
</article>

<button class="btn-primary">Save Changes</button>

<div class="alert alert-success">Operation completed.</div>
```

These aren't "components" you import—they're **CSS classes that style semantic HTML**.
Write the HTML you'd write anyway. PDS makes it look right.

### 2. Layout Utilities—Sparingly

PDS provides a **small set of layout utilities** for composition:

```html
<div class="flex gap-md items-center">
  <pds-icon icon="user"></pds-icon>
  <span>Profile</span>
</div>

<main class="container">
  <section class="stack-lg">
    <!-- Natural document flow with consistent spacing -->
  </section>
</main>
```

That's it. No `.text-blue-500`, no `.p-4`, no `.rounded-lg`.
**Spacing, colors, radii are tokens—not classes.**

### 3. Inline Styles? Only for Tokens

The **only** recommended use of `style=""` in PDS is setting CSS custom properties:

```html
<!-- ✓ Setting a token override -->
<section style="--surface-bg: var(--color-primary-50);">
  <p>This section has a tinted background.</p>
</section>

<!-- ✗ NEVER do this -->
<div style="display: flex; gap: 16px; padding: 20px;">
```

If you're writing `style="color: red"` or `style="margin: 1rem"`, you're doing it wrong.
PDS gives you tokens. Use them.

---

## What PDS Generates

You write a small JavaScript config:

```js
export const config = {
  design: {
    colors: { primary: "#0891b2", secondary: "#7c3aed" },
    typography: { baseFontSize: 16, scale: 1.2 },
    spacing: { base: 4, ratio: 1.5 },
    radius: 6
  }
};
```

PDS produces:

| Layer | What You Get |
|-------|--------------|
| **Tokens** | `--color-primary-500`, `--spacing-4`, `--radius-md` |
| **Primitives** | `.card`, `.btn-primary`, `.badge`, `.alert` |
| **Layout** | `.flex`, `.grid`, `.stack-md`, `.gap-lg`, `.container` |
| **Utilities** | `.text-muted`, `.surface-elevated`, `.border-subtle` |

All as CSS Custom Properties. Zero specificity (`:where()` selectors).
**Your CSS always wins.**

---

## The Three Layers

Everything in PDS is optional. Use what you need.

### Layer 1: Styles

Deterministic CSS from your config. Use PDS purely as a token/CSS generator.

- Color scales (50–900)
- Typography scale
- Spacing system
- Surface semantics
- All in global CSS *and* `PDS.compiled.tokens` for JS

### Layer 2: Enhancements

Selector-based progressive enhancement. Semantic HTML gets superpowers:

- `<input required>` → automatic asterisk + help text
- `<label data-toggle>` → becomes a switch
- `<nav data-dropdown>` → dropdown behavior
- `<dialog>` → better focus management

No framework. No build step. Just HTML that works better.

### Layer 3: Components

Lazy-loaded Web Components for complex UI:

- `<pds-icon>` — SVG sprites
- `<pds-drawer>` — slide-out panels
- `<pds-tabstrip>` — accessible tabs
- `<pds-jsonform>` — forms from JSON Schema

Auto-defined when used. Styled by your tokens. Zero dependencies.

---

## Why This Matters

| The Old Way | The PDS Way |
|-------------|-------------|
| `class="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md"` | `class="card"` |
| `style="color: #007acc; font-weight: 600;"` | Uses `--color-primary-500` token |
| Import a Button component | `<button class="btn-primary">` |
| 47 utility classes per element | Semantic class + maybe a layout utility |
| Learn a framework's abstraction | Learn HTML. That's it. |

**The result:**

- Readable HTML that describes content, not presentation
- CSS you can inspect and understand
- Sites that work without JavaScript
- Code that lasts decades, not dev cycles

---

## Who PDS is For

You'll love PDS if you:

- Believe the web platform is underrated
- Want your HTML to be readable 10 years from now
- Are tired of framework churn and breaking changes
- Care about accessibility, performance, and sustainability
- Build MPAs, PWAs, dashboards, static sites—anything HTML-based

---

> *PDS follows the [Pure Web Manifesto](https://pureweb.dev/manifesto): sustainable architecture for long-lived applications, built entirely on the Web Platform.*
