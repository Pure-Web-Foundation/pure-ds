# PDS — AI Agent Routing Protocol

> **CRITICAL**: This workspace uses **Pure Design System (PDS)**. All code MUST follow PDS and vanilla Web Platform patterns.

> **READ-ONLY PATHS**: `public/pds/**`, `public/assets/pds/**`, `node_modules/@pure-ds/core/public/**` are package output — never edit. To change behavior, edit `src/js/pds-core/**` or `pds.config.js`, then rebuild.

---

## MANDATORY: Query MCP before writing any PDS code

**Step 1 — Find the right element:**
```
get_best_match({ intent: "describe what you need" })
```
Returns ranked matches: web component > data-* enhancer > CSS primitive. Start here every time.

**Step 2 — Get details for what was matched:**

| Matched type | Next MCP call |
|---|---|
| `pds-*` web component | `get_component_api({ tagName: "pds-..." })` |
| `data-*` enhancer | `get_enhancer_metadata({ selector: "..." })` |
| CSS primitive / utility | `find_utility_class({ query: "..." })` |
| CSS token needed | `get_tokens({ contains: "..." })` |
| Form, localization, toast, treeview, DOM building | `query_design_system("your question")` |
| Config / token naming rules | `get_config_relations({ contains: "..." })` |

**Step 3 — Validate output:**
```
validate_pds_snippet({ html: "...generated html..." })
```
Fix all `antiPatterns` and `unknown` items before returning code.

**If MCP is unavailable**: fall back to reading SSoT files directly. Never block on MCP.

---

## Layer Priority (enforce this order)

```
semantic HTML → Layer 1: CSS tokens + primitives (.card, .btn-*, .flex)
             → Layer 2: data-* enhancements (data-dropdown, data-toggle)
             → Layer 3: pds-* Web Components (only when lower layers can't)
```

Never skip layers. Never use a web component when a CSS class or enhancer suffices.

---

## Anti-Patterns — Zero Tolerance

- `style="..."` → use `var(--token)` from `get_tokens`
- Hardcoded colors/spacing → tokens: `--color-*`, `--spacing-*`, `--radius-*`
- `alert()` / `confirm()` / `prompt()` → `PDS.ask()` / `PDS.toast()`
- `<style>` in shadow DOM → `PDS.adoptLayers(this)` in constructor
- Native `submit` on pds-form → listen to `pw:submit`
- `<div class="button">` → `<button class="btn-primary">`
- Accessing lazy component before definition → `await customElements.whenDefined('tag-name')`
- `ui:icon` on non-text inputs (date-range, textarea, select, omnibox) → omit it
- Localization from `#pds/lit` → import `msg`, `setLocale` from `#pds`

---

## Summary Checklist

1. `get_best_match` called to find the right layer/element?
2. Details fetched via the appropriate tool?
3. No inline styles — tokens only?
4. No browser dialogs — `PDS.ask()` / `PDS.toast()`?
5. Semantic HTML used (`<button>`, `<nav>`, `<article>`, `<label>`)?
6. `PDS.adoptLayers(this)` in any custom shadow DOM?
7. Lazy components awaited with `customElements.whenDefined()`?
8. `validate_pds_snippet` run and all issues resolved?
