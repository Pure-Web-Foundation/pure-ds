![Pure Design System logo](/assets/img/logo.png) 

Imagine you’re standing at the edge of a new project. The browser is empty, but full of potential. You don’t start by choosing a framework. You start by deciding *how deep you want to go*.

# The **Three Layers of the Pure Design System**

They are not steps you *must* take.

They are **layers you may choose**, each one building on the guarantees of the one below it.

## Layer 1 — The Ground: Deterministic Design Language

The first layer is quiet. Almost invisible.

You define a handful of values: a primary color, a base font size, a spacing unit, a radius preference. Or even simpler: to get started, just select one of the **presets** avaliable. Nothing more. From that minimal intent, PDS *deterministically* generates a complete, production-ready design language: tokens, scales, semantics, surfaces, states.

At runtime, CSS is injected via Adopted StyleSheets (both in the main document and in Shadow documents).

This layer answers a fundamental question:

> *“What does my product look like — everywhere, consistently, and forever?”*

At this level:

- HTML stays HTML
- CSS stays CSS
- Your design language becomes portable, inspectable, and future-proof

You can stop here and already have something most teams never achieve:

**a coherent, mathematically sound, tokenized design system that works across documents, shadow DOMs, and apps.** readme

## Layer 2 — The Pulse: Progressive Enhancement

The second layer introduces *motion* — but carefully.

Here, PDS adds **behavior**, not structure. Enhancements that respect the browser, accessibility, and user preferences. Focus handling, transitions, dialogs, toasts, form logic. All optional. All progressive.

> *“How do we add behavior without coupling ourselves to a framework?”*

At this level:

- HTML remains the source of truth
- CSS still defines appearance
- JavaScript enhances intent, does not replace it

## Layer 3 — The Instruments: Web Components

Web Components are only used for complex controls.

The third layer provides **Web Components**, built on the previous two layers. They are thin, composable instruments: not replacements for native elements, but amplifiers of them.

They assume the design tokens already exist.
They assume the behaviors are already defined.
They do not reinvent HTML — they cooperate with it.

This layer is for teams who say:

> *“Now that the foundation is solid, let’s move faster — without regret.”*

At this level:

- Components are optional, lazy, and standards-based
- Shadow DOM uses the same global design language
- Your system scales across apps, brands, and time

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
