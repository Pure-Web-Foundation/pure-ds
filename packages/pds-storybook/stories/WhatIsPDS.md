![Pure Design System logo](/assets/img/pds-logo.svg) 

With PDS, we deliver on the promise [Pure Web Foundation](//pureweb.dev) has made with the [Pure Web Manifesto](//pureweb.dev/manifesto)

# The Philosophy

We embrace HTML and CSS as an extremely powerful—purely declarative—combination that can achieve far more than most developers realize.

**For over a decade, the frontend world has been led to believe that frameworks and heavy bundling were necessary to build anything meaningful. Meanwhile, evidence keeps mounting: the modern web platform has caught up to such a degree that today's most popular stacks are solving a problem that no longer exists.**

The advantages of going native compound at every level. Browsers are highly optimized runtimes—HTML streams instantly while CSS applies in parallel, whereas large JavaScript bundles block content. Native elements bring accessibility for free: keyboard navigation, screen reader support, and focus management refined over decades. Search engines understand semantic markup perfectly, with no hydration delays hiding your content.

Semantic HTML works with any backend, any toolchain, any future technology—the universal interface that outlasts every abstraction built on top of it.

Less JavaScript means sustainability: less CPU, less battery drain, less carbon.

HTML from 2005 still renders perfectly today. Framework code from 2023? We already call it legacy—tech debt incurred simply because of the framework's volatile nature.

Going native means MDN is your documentation. And when you instruct an LLM to write standards-compliant markup and code, it draws on vast resources to help you achieve anything with ease.

> **Using AI with PDS**: When you install `@pure-ds/core`, LLM instructions are automatically copied to your project (`.github/copilot-instructions.md` for GitHub Copilot, `.cursorrules` for Cursor). These teach your AI assistant to use PDS patterns correctly—referencing the actual source files (`custom-elements.json`, `pds.css-data.json`, `pds-ontology.js`) instead of guessing. To manually install or update: `npx pds-setup-copilot`

# The Three Optional Layers of the Pure Design System

Whatever you're building, you can pick and choose what you need.


## Layer 1 — The Ground: Deterministic Design Language

The first layer is quiet. Almost invisible.

You define a handful of values: a primary color, a base font size, a spacing unit, a radius preference. Or even simpler: to get started, just select one of the **presets** avaliable. Nothing more. From that minimal intent, PDS *deterministically* generates a complete, production-ready design language: tokens, scales, semantics, surfaces, states.

At runtime, CSS is injected via Adopted StyleSheets (both in the main document and in your Web Components' Shadow DOMs).

You can stop here and already have something most teams never achieve: **A coherent, mathematically sound, tokenized design system that works across documents, shadow DOMs, and apps.** 

*If you want, you can generate only the style tokens (CSS variables) at design time, deploy them as a CSS include in your project, and never use any PDS runtime functionality.*

## Layer 2 — The Pulse: Progressive Enhancement

PDS can add simple **behavior** to semantic HTML structures in the form of Progressive Enhancements. These enhancers are automatically triggered by CSS selector ¹. For instance, if you use `class="accordion"` on a `section` or other HTML element, you make a group of `<details>` elements into an [accordion](https://storybook.pure-ds.com/?path=/story/primitives-accordion--basic-accordion) without the need to resort to a component.


¹ PDS comes with a lightweight DOM observer that is smart enough to monitor the DOM (including Shadow DOMs) and activate enhancers when they're needed.

## Layer 3 — The Instruments: Web Components

The third layer provides lazy-loaded ² **Web Components** that fully leverage the PDS design system.

² The DOM observer mentioned above is also used to detect any Web Component that matches patterns declared in the `pds.config.js`. By default, `pds-*` is used. Any web component that matches is defined automatically when first rendered, which means you can build apps with numerous Web Components that are *not bundled*, and their behavior is only attached when they are first rendered 🤯.

*Think about what this means for your app development, if you don't ever need to think about bundle splitting anymore when your app grows.* 

### The Principle: Components as Last Resort

This is where PDS diverges fundamentally from mainstream frameworks. In React, Vue, or Angular, *everything* is a component. A button is a component. A link is a component. A div with some styling is a component.

**PDS inverts this.** Web Components are only introduced when:

1. **Native HTML has no equivalent** — There's no `<tabs>`, `<combobox>`, or `<color-picker>` in the spec
2. **Progressive Enhancement cannot achieve it** — The behavior requires encapsulated state or complex internal DOM
3. **The complexity justifies the cost** — Every component adds JavaScript, API surface, and maintenance burden

### What This Means in Practice

| Need | ❌ Framework Approach | ✅ PDS Approach |
|------|----------------------|-----------------|
| Button | `<Button variant="primary">` | `<button class="btn-primary|btn-secondary|btn-outline|...">` |
| Card layout | `<Card><CardHeader>...` | `<article class="card"><header>...` |
| Dropdown menu | `<Dropdown items={...}>` | `<nav data-dropdown><button>...</button><menu>...` (enhanced) |
| Tabs interface | `<Tabs>` component | `<pds-tabstrip>` ✓ (justified) |
| Rich text editor | `<RichTextEditor>` | `<pds-richtext>` ✓ (justified) |


### Why This Matters

**Fewer components means:**
- Less JavaScript to ship, parse, and execute
- Fewer APIs to learn and maintain
- More HTML that works without JavaScript
- Better accessibility by default (native elements are already accessible)
- Easier debugging (View Source shows real elements)

**When we do use components, they:**
- Inherit all design tokens automatically (via Adopted StyleSheets)
- Follow the same patterns as enhanced HTML
- Extend native elements where possible (`<button is="pds-button">`)
- Provide progressive enhancement, not replacement

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
| **Primitives** | `.card`, `.btn-primary`, `.badge`, `.callout` |
| **Layout** | `.flex`, `.grid`, `.stack-md`, `.gap-lg`, `.container` |
| **Utilities** | `.text-muted`, `.surface-elevated`, `.border-subtle` |

> Where PDS styles affect default HTML structures, CSS `:where()` is used. This ensures **ZERO** specificity, so **your CSS always wins**.


## Who PDS is For

You'll love PDS if you:

- Believe the web platform is underrated
- Want your HTML to be readable 10 years from now
- Are tired of framework churn and breaking changes
- Care about accessibility, performance, and sustainability
- Build MPAs, PWAs, dashboards, static sites—anything HTML-based

---

> *PDS follows the [Pure Web Manifesto](https://pureweb.dev/manifesto): sustainable architecture for long-lived applications, built entirely on the Web Platform.*
