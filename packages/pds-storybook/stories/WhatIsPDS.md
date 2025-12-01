![Pure Design System logo](/assets/img/logo.png) 

## A standards-native design system built entirely on the Web Platform

PDS is not a framework, not a CSS library, and not tied to Storybook.\
It is a **config-first, architecture-first, standards-only design system generator**.

You write a small JavaScript config.
PDS turns it into:

- Deterministic global CSS
- AdoptedStyleSheets (for Web Components)
- A full token model available as JS (`pds.compiled`)

Apart from the layered token/styles generation, PDS offers:

- Optional progressive enhancements for semantic HTML
- Optional lazy-loaded Web Components
- A custom-elements.json manifest for IDE IntelliSense

This Storybook instance showcases the full power of PDS: layers, tokens, enhancements, and components.

# Why PDS exists

Modern frontend is dominated by frameworks, utility libraries, and toolchains that *replace* the Web Platform rather than *use* it.

PDS takes the opposite path:
- The browser is the framework.
- Semantic HTML is the component model.
- Web Standards are enough.

PDS follows the [Pure Web Manifesto](https://pureweb.dev/manifesto) and provides sustainable architecture for long-lived apps without lock-in, complexity, or hidden magic.

# The PDS Architecture

PDS is built on **three fully optional layers**, each powered by your config:

## 1. Styles — deterministic global CSS

Generated from a single JavaScript config:

```
export default {
  colors: { primary: "#0891b2" },
  typography: { baseFontSize: 16, scale: 1.2 },
  radius: 6,
  spacing: { base: 4, ratio: 1.5 }
};

```

PDS produces:

- Color scales (50–900)
- Semantic palettes (success, warning, info)
- Typographic modular scale
- Spacing system
- Layout tokens
- All exported as **CSS Custom Properties**
- Zero specificity by design (`:where()` selectors)
- Mirrors the same values in JS (`pds.compiled.tokens`)

Use **only this layer** if you want PDS as a token + CSS generator.

## 2. Progressive Enhancements — semantic HTML made powerful

Optional selector-based enhancements that:

- Run in both Light DOM and open Shadow DOM
- Require no framework or build step
- Upgrade semantic HTML automatically
- Improve accessibility and defaults with zero JS integration work

Examples:

- Required fields automatically show markers and help text
- Checkboxes can become toggles with one attribute
- `<dialog>` elements get better focus management
- Form elements gain consistent, theme-based styling

Think **HTML → UX upgrades**, powered by your config.

## 3. Components — auto-defined, lazy-loaded Web Components

A growing set of PDS components:

- Auto-defined when imported
- Lazy-loaded via dynamic ESM imports
- Styled by your tokens
- Zero dependencies
- Always optional: use none, some, or all

Examples:

- `<pds-dialog>`
- `<pds-button>`
- `<pds-card>`
- `<pds-form>` and JSON Schema–driven config editors
- `<pds-autocomplete>`

PDS automatically generates a `custom-elements.json` (and editor-specific metadata) so editors like VSCode give full **IntelliSense**, autocomplete, and type info.

# Why PDS is different

### ✓ 100% Web Standards — no dependencies

### ✓ Extremely layered — everything optional

Use only tokens.\
Or only CSS.\
Or CSS + enhancements.\
Or the full component set.\
Nothing forces itself into your project.

### ✓ Opinionated, but never restrictive

Clean defaults that stay out of your way.\
Everything overrideable.\
No generated specificity wars.

### ✓ No magic, no opacity

All generated CSS is readable, inspectable, and deterministic.\
No toolchain tricks.\
No runtime class generation.

### ✓ Config → Tokens → CSS → JS (single source of truth)

Breakpoints, spacing, color ramps all available in:

- Global CSS
- Shadow DOM CSS
- JavaScript (`pds.compiled`)

Your entire codebase stays in sync.

# How Storybook fits in

Storybook is **not part of PDS**.

It is simply the **showcase and documentation environment** for exploring PDS:

- It runs PDS in **live config mode**
- Every story is affected instantly by config changes
- You can toggle:
  - Themes
  - Layers
  - Enhancements
  - Components
- It demonstrates how PDS behaves in real applications
- It helps teams maintain visual consistency across projects

Think of Storybook as **“the PDS showroom,”** not the engine.

# What you can explore in this Storybook

### Foundations

The generated tokens — colors, spacing, typography, radii, elevation, surfaces.

### Utilities

Minimal, generated utility classes based entirely on tokens.

### Enhancements

Selector-driven UX improvements on semantic HTML.

### Components

Lazy-loaded Web Components styled by your config.

### Patterns

Common UI constructions built from the three PDS layers.

### Configurator

Open the toolbar → 🎨 icon to adjust the live configuration.

# Who PDS is for

- Teams who want a design system without a framework commitment
- Developers tired of Tailwind’s utility sprawl or React’s re-render economics
- Web Components users who want full token theming
- Apps that need long-term sustainability and simplicity
- PWAs, MPAs, SPAs, static sites, enterprise dashboards — anything HTML-based

# In short

> **PDS is the first design system that is 100% standards-native,\
> extremely layered, dependency-free, and completely transparent.\
> Storybook here simply demonstrates what PDS makes possible.**
