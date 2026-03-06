# PDS (Pure Design System) - AI Generation Instructions

> **CRITICAL**: This workspace uses **Pure Design System (PDS)**. All code generation MUST follow PDS and vanilla Web Platform patterns. Never use 3rd party framework patterns, non-PDS utility classes, inline styles, or hardcoded CSS values.

> **CRITICAL — Unless we are in the pure-ds (@pure-ds/core origin) project itself, `/pds/` PATHS ARE READ-ONLY (PACKAGE-LIKE)**: Treat any file path containing `/pds/` as immutable runtime/package output (including `public/pds/**`, `public/assets/pds/**`, and `node_modules/@pure-ds/core/public/**`). Never patch these files directly. If behavior must change, edit source/config (`src/js/pds-core/**`, `pds.config.js`, component source), then rebuild.

> **Note: in the pure-ds (@pure-ds/core origin) project itself**, pds-* web components ARE not compiled from source. The pds-* components in pds/components/ ARE their own source code!

## Philosophy

PDS follows the [Pure Web Manifesto](https://pureweb.dev/manifesto): "The browser is the framework."

1. **Standards-first**: Web Platform APIs only (no framework dependencies)
2. **Configuration-driven**: `pds.config.js` generates everything
3. **Progressive Enhancement**: Semantic HTML first, enhance where needed
4. **Components as Last Resort**: Web Components only when native HTML cannot achieve it

> Note: all (lazy loaded) PDS web components are rolled out to consuming projects in their [public root]/assets/pds/components/ folder, and are never provided as source that needs to be bundled. The web component scripts are copied there at npm install time (postinstall), and are ready to be used because the PDS AutoDefiner will define them when added to the DOM.

### The Four Layers

**Layer 1 — Styles**: From minimal config, PDS generates complete CSS: tokens, scales, semantics, surfaces, states. Zero specificity via `:where()`.

**Layer 2 — Enhancements**: Behavior added to semantic HTML via selector-based upgrades (`data-dropdown`, `data-toggle`, etc.).

**Layer 3 — Web Components**: `<pds-tabstrip>`, `<pds-drawer>`, etc. only when native HTML has no equivalent.

**Layer 4: LLM Support**: Install `@pure-ds/core` and get instant PDS AI Coding Instrucions at your fingertips (GitHub Copilot & Cursor support built in)

---

## 🔍 Single Sources of Truth (ALWAYS CONSULT THESE FIRST)

**Before generating code, read the relevant SSoT file to get accurate class names, tokens, and APIs.**

| Need | SSoT File | What It Contains |
|------|-----------|------------------|
| **CSS Tokens** | `public/assets/pds/pds.css-data.json` | All `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*` |
| **Web Components** | `custom-elements.json` | Complete component APIs, attributes, methods, events, slots |
| **HTML Tags** | `public/assets/pds/vscode-custom-data.json` | Component HTML structure, attribute values |
| **Primitives & Utilities** | `src/js/pds-core/pds-ontology.js` | `.card`, `.badge`, `.btn-*`, `.flex`, `.gap-*`, `.surface-*` |
| **Enhancements** | `src/js/pds-core/pds-enhancers.js` | Enhancement metadata (`defaultPDSEnhancerMetadata`) + runtime (`defaultPDSEnhancers`) |
| **Generator Logic** | `src/js/pds-core/pds-generator.js` | How CSS is generated, token naming conventions |
| **Config (Runtime)** | `pds.config.js` | What's enabled in this workspace |
| **Config (SSoT)** | `src/js/pds-core/pds-config.js` | JSDoc types + validation spec + `PDS_CONFIG_RELATIONS` for deterministic token mapping |

**For consuming projects** using `@pure-ds/core`, files are in `node_modules/@pure-ds/core/`:
- `custom-elements.json`
- `public/assets/pds/pds.css-data.json`
- `public/assets/pds/vscode-custom-data.json`
- `src/js/pds-core/pds-ontology.js`

**Path resolution helper:** When looking up SSoT files:
1. First check if `node_modules/@pure-ds/core/` exists (consuming project)
2. Otherwise use workspace root paths (pure-ds development)
3. Prefer reading actual files over guessing - the data is authoritative

## 🔌 MCP Lookup Protocol (Optional)

Use MCP as an optimization, not a prerequisite. For fast, simple lookups, read local SSoT files directly first.

### When MCP is already connected

1. **Tokens** → call `get_tokens`
2. **Primitives / utilities / selectors** → call `find_utility_class`
3. **Natural-language DS search** → call `query_design_system`
4. **Web component API** → call `get_component_api`
5. **Enhancer metadata + demoHtml** → call `get_enhancer_metadata`
6. **Design config deterministic mapping** → call `get_config_relations`
7. **Final snippet sanity check** → call `validate_pds_snippet`

### Non-negotiable rules

- Do not invent class names, tokens, attributes, events, or selectors.
- For form generation, `ui:icon` / icon-input rendering is allowed only on regular text-like inputs (`text`, `email`, `url`, `tel`, `search`, `password`). Do **not** apply icon-input rendering to date/date-range, range, select, checkbox/radio groups, textarea, or omnibox widgets.
- If a value is not found in MCP results, state it is unavailable and suggest nearest matches.
- Prefer MCP results over memory when MCP is already available.
- If MCP is unavailable, slow to start, or errors, continue immediately with direct SSoT file reads using the paths above.
- Never block or fail an answer solely because MCP is unavailable.
- If neither MCP nor file reads are available, provide only conservative guidance and clearly mark uncertainty.

## 🎯 Intent Scoping (Avoid Wrong Surface Area)

Always match the implementation target to the user request before touching code.

- If the request is generic layout/styling (e.g., "grid", "mobile one column", spacing, alignment), solve it with primitives/utilities/config first (`.grid`, `.grid-cols-*`, responsive utilities, `pds-ontology.js`, `pds.config.js`).
- Do **not** inspect or modify specialized components (e.g., `pds-form`) unless the user explicitly asks for that component or the failing code is clearly inside that component.
- Start from the smallest relevant layer: **Layer 1 (styles/utilities)** → **Layer 2 (enhancers)** → **Layer 3 (web components)** only if needed.
- For consuming projects, prefer usage-level fixes in app markup/classes before proposing framework/core changes.

---

## 📋 pds-form Best Practices

**When generating pds-form code, ALWAYS follow these patterns:**

### 1. Event Handling - Use `pw:submit`, NOT `submit`

```javascript
// ✅ CORRECT: Listen to pw:submit custom event
form.addEventListener('pw:submit', async (e) => {
  const { json, formData, valid, issues } = e.detail;
  if (valid) {
    // Handle submission with json or formData
  }
});

// ❌ WRONG: Native submit event
form.addEventListener('submit', (e) => { /* Won't work */ });
```

### 2. Submit Button Progress - Add `btn-working` automatically

**When user requests a form with async submission, ALWAYS:**
- Add `btn-working` class to submit button during processing
- Remove it when done (PDS automatically shows spinner icon)
- Use a realistic 2-3 second delay for demos

```javascript
// ✅ CORRECT: Auto-add progress state
form.addEventListener('pw:submit', async (e) => {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.classList.add('btn-working');
  
  try {
    await simulateSubmit(e.detail.json); // 2-3 second promise
    await PDS.toast('Submitted successfully!', { type: 'success' });
  } finally {
    submitBtn?.classList.remove('btn-working');
  }
});

async function simulateSubmit(data) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Submitted:', data);
}
```

### 3. Adding `data-required` to pds-form generated form: simply add the attribute to the pds-form tag

```html
<pds-form data-required id="myForm" hide-actions></pds-form>
```

### 4. Placeholders - ALWAYS include examples

**Placeholders improve UX significantly. Try to add 'examples' array to schema properties:**

**Rule: When generating a form, infer appropriate placeholders based on field name/type if not specified.**

### 5. Smart Icons - Infer from field semantics

**When generating forms, automatically add appropriate icons based on field names and semantics for regular text-like inputs only.**

**Scope rule (critical):** `ui:icon` / icon-input rendering is valid only for text-like inputs (`text`, `email`, `url`, `tel`, `search`, `password`).

**Never apply `ui:icon` to:** date/date-range, range sliders, textarea, select, checkbox/radio groups, tag pickers, or omnibox widgets.

**Sources of truth for available icons:**
- Check `pds.config.js` for project-specific icon configuration
- Consult icon sprite at `public/assets/img/icons/pds-icons.svg` for available icons
- See `public/assets/pds/vscode-custom-data.json` for icon attribute values

**Use semantic reasoning to match field names to appropriate icons:**

```javascript
// ✅ CORRECT: Infer icons based on field semantics
const uiSchema = {
  "/email": { 'ui:icon': 'envelope', 'ui:autocomplete': 'email' },
  "/phone": { 'ui:icon': 'phone', 'ui:autocomplete': 'tel' },
  "/name": { 'ui:icon': 'user', 'ui:autocomplete': 'name' },
  "/password": { 'ui:icon': 'lock', 'ui:widget': 'password' },
  "/website": { 'ui:icon': 'link' },
  "/address": { 'ui:icon': 'map-pin' }
};

// ❌ WRONG: Non-text widgets should not use ui:icon/icon-input rendering
const invalidUiSchema = {
  "/travelDates": { 'ui:widget': 'date-range', 'ui:icon': 'calendar' },
  "/budget": { 'ui:widget': 'input-range', 'ui:icon': 'coins' },
  "/notes": { 'ui:widget': 'textarea', 'ui:icon': 'message' }
};
```

**Rule: When generating forms, analyze field names/types and select semantically appropriate icons from the available icon set, but only for text-like inputs.**

### 6. Submit Handler Pattern - ALWAYS provide working async handler

**When generating a pds-form, ALWAYS include a complete, iteration-ready submit handler with:**
- `pw:submit` event (NOT native submit)
- `btn-working` class for loading state
- `PDS.toast()` for user feedback
- Error handling
- Realistic async simulation

```javascript
// ✅ CORRECT: Complete submit handler pattern
form.addEventListener('pw:submit', async (e) => {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.classList.add('btn-working');
  
  try {
    // Simulate async operation (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log the data for debugging
    console.log('Submitted data:', e.detail.json);
    
    // Show success toast
    await PDS.toast('Form submitted successfully!', { type: 'success' });
    
    // Optionally reset form
    form.reset();
  } catch (error) {
    // Show error toast
    await PDS.toast('Submission failed: ' + error.message, { type: 'error' });
  } finally {
    // Always remove loading state
    submitBtn?.classList.remove('btn-working');
  }
});

// ❌ WRONG: Native submit event
form.addEventListener('submit', (e) => { /* Won't work */ });

// ❌ WRONG: No loading state
form.addEventListener('pw:submit', async (e) => {
  await fetch('/api'); // No visual feedback!
});

// ❌ WRONG: Browser dialogs
form.addEventListener('pw:submit', async (e) => {
  alert('Submitted!'); // Use PDS.toast() instead
});
```

**PDS.toast() is available from the imported `PDS` runtime:**

```javascript
import { PDS } from '#pds';
```

```javascript
// All toast types
await PDS.toast('Success message', { type: 'success' });
await PDS.toast('Error occurred', { type: 'error' });
await PDS.toast('Warning message', { type: 'warning' });
await PDS.toast('Info message', { type: 'information' });

// Custom duration (auto-calculated by default based on message length)
await PDS.toast('Quick message', { type: 'info', duration: 3000 });

// Persistent (requires manual close)
await PDS.toast('Important notice', { type: 'warning', persistent: true });
```

### 7. Conditional "Other" Fields - Auto-generate ui:visibleWhen

**When a schema has an "Other" enum option, ALWAYS auto-generate a conditional text field:**

```javascript
const schema = {
  type: "object",
  properties: {
    reason: {
      type: "string",
      title: "How did you hear about us?",
      oneOf: [
        { const: "search", title: "Search Engine" },
        { const: "social", title: "Social Media" },
        { const: "friend", title: "Friend Referral" },
        { const: "other", title: "Other... (please specify)" },  // ← "Other" option
      ],
    },
    otherReason: {  // ← Conditional field for "Other"
      type: "string",
      title: "Please specify",
      examples: ["Tell us more..."],
    },
  },
};

const uiSchema = {
  // ✅ ALWAYS add these when "other" enum exists
  "/otherReason": {
    "ui:visibleWhen": { "/reason": "other" },
    "ui:requiredWhen": { "/reason": "other" },
  },
};
```

### 8. Complete Working Example

```javascript
// Schema with examples for placeholders
const contactSchema = {
  type: "object",
  required: ["name", "email", "message"],
  properties: {
    name: {
      type: "string",
      title: "Name",
      minLength: 2,
      examples: ["John Doe"]
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
      examples: ["user@example.com"]
    },
    message: {
      type: "string",
      title: "Message",
      minLength: 10,
      examples: ["Your message here..."]
    }
  }
};

// UI schema with smart icons
const uiSchema = {
  "/name": { 'ui:icon': 'user' },
  "/email": { 'ui:icon': 'envelope', 'ui:autocomplete': 'email' },
  "/message": { 
    'ui:widget': 'textarea',
    'ui:rows': 4
  }
};

// Setup with pw:submit and btn-working
const form = document.getElementById('contactForm');
form.jsonSchema = contactSchema;
form.uiSchema = uiSchema;

form.addEventListener('pw:submit', async (e) => {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.classList.add('btn-working');
  
  try {
    // Simulate 2s async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Submitted:', e.detail.json);
    await PDS.toast('Message sent!', { type: 'success' });
    form.reset();
  } catch (error) {
    await PDS.toast('Failed to send', { type: 'error' });
  } finally {
    submitBtn?.classList.remove('btn-working');
  }
});
```

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
alert("message");   // → await PDS.toast("message", { type: "info" })
confirm("sure?");   // → await PDS.ask("sure?", { type: "confirm" })
prompt("name?");    // → await PDS.ask("name?", { type: "prompt" })

// ❌ NEVER: Manual dropdown/modal/tab implementations
// → Use <nav data-dropdown>, PDS.ask(), <pds-tabstrip>

// ❌ NEVER: Access lazy-loaded component APIs before they're defined
const form = document.querySelector('pds-form');
form.getFormData(); // May fail - component not loaded yet

// ❌ NEVER: Use native 'submit' event with pds-form
form.addEventListener('submit', (e) => { }); // → Use 'pw:submit'

// ❌ NEVER: Forget btn-working class for async operations
button.onclick = async () => {
  await fetch('/api'); // No loading indicator!
};
// → Add button.classList.add('btn-working') before, remove after

// ❌ NEVER: Hardcode placeholders instead of using schema examples
const schema = { 
  properties: { 
    email: { type: "string" } // Missing examples!
  }
};
// → Add examples: ["user@example.com"]
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
    "#pds": "/assets/pds/core.js",
    "#pds/lit": "/assets/pds/external/lit.js"
  }
}
</script>
```

**Note:** `#pds/lit` is a convenience bundle that re-exports Lit and adds `lazyProps`. Localization helpers (`msg()`, `str`, `setLocale()`, `loadLocale()`) come from `#pds`, not `#pds/lit`.

**When generating code with lazy-loaded components, ALWAYS wait for definition:**

```javascript
// ✅ CORRECT: Wait for component to load
await customElements.whenDefined('pds-form');
const form = document.querySelector('pds-form');
form.getFormData(); // Safe

// In a Lit context, use the lazyProps directive (included in #pds/lit bundle)
<pds-fab
  id="fab-three"
  ${lazyProps({ satellites })}
>
  <pds-icon icon="plus" size="lg" data-original-icon="plus"></pds-icon>
</pds-fab>

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

<!-- Enhancements: data attributes (see pds-enhancers.js → defaultPDSEnhancerMetadata) -->
<nav data-dropdown>
  <button>Menu</button>
  <menu><li><a href="#">Item</a></li></menu>
</nav>

<label data-toggle>
  <input type="checkbox">
  <span data-label>Enable feature</span>
</label>

<!-- Treeview: lazy node loading -->
<pds-treeview id="docsTree"></pds-treeview>

<script type="module">
  const tree = document.getElementById('docsTree');
  tree.options = {
    // Initial payload can be shallow (e.g., 2 levels)
    source: [
      {
        id: 'docs',
        text: 'Docs',
        hasChildren: true,
        children: [
          { id: 'guides', text: 'Guides', hasChildren: true },
          { id: 'components', text: 'Components', hasChildren: true }
        ]
      }
    ],
    // Fetch children only when a node is expanded
    getChildren: async ({ nodeId }) => {
      const res = await fetch(`/api/tree?parent=${encodeURIComponent(nodeId)}`);
      return res.ok ? res.json() : [];
    }
  };
</script>

**Treeview lazy-loading rules:**
- Mark expandable nodes with `hasChildren: true` when children are not yet included in the initial `source`.
- Provide `options.getChildren({ node, nodeId, host, options, settings })` for node-level fetch on first expand.
- Prefer shallow initial payloads (root + immediate children), then fetch deeper levels as users expand.
- Use `node-load` and `node-load-error` events for telemetry, loading UX, and retries.

<form data-required>
  <label><span>Email</span><input type="email" required></label>
</form>

<!-- Tabs: web component -->
<pds-tabstrip>
  <pds-tabpanel label="Tab 1">
    <p>Content for Tab 1</p>
  </pds-tabpanel>
  <pds-tabpanel label="Tab 2">
    <p>Content for Tab 2</p>
  </pds-tabpanel>
</pds-tabstrip>

<!-- Details: wrap post-summary content in a padded primitive -->
<details>
  <summary>Section title</summary>
  <div class="card">
    <p>Use a padded container after summary to avoid edge-to-edge content.</p>
  </div>
</details>
```

### Empty State Pattern

- Use the `.empty-state` primitive for empty or onboarding states.
- Structure: heading + supporting text, an icon, then primary/secondary actions.
- Keep actions as buttons or links with PDS button classes, and include a meaningful icon when available.

```javascript
// Dialogs & Toasts: PDS API
const confirmed = await PDS.ask("Delete this item?", { 
  type: "confirm",
  buttons: { ok: { name: "Delete", variant: "danger" } }
});

const result = await PDS.ask("Publish this change?", {
  title: "Final approval",
  buttons: {
    ok: { name: "Publish", primary: true },
    cancel: { name: "Cancel", cancel: true }
  },
  beforeClose: async ({ actionKind }) => {
    if (actionKind !== "ok") return true;
    const response = await fetch("/api/publish/can-close", { method: "POST" });
    if (!response.ok) return { allow: false };
    const payload = await response.json();
    return { allow: payload?.ok === true };
  }
});

await PDS.toast("Saved successfully!", { type: "success" });

// Theme management
PDS.theme = 'dark';  // 'light' | 'dark' | 'system'

// Query the design system via MCP tool: query_design_system
```

---

## 📚 Additional Resources

**For comprehensive pds-form documentation:**
- Read [pds-form-docs.md](https://github.com/Pure-Web-Foundation/pure-ds/blob/main/pds-form-docs.md) for complete API reference
- See [packages/pds-storybook/stories/components/PdsForm.stories.js](https://github.com/Pure-Web-Foundation/pure-ds/blob/main/packages/pds-storybook/stories/components/PdsForm.stories.js) for real examples
- Check [custom-elements.json](https://github.com/Pure-Web-Foundation/pure-ds/blob/main/custom-elements.json) for component API details

**For toast notifications:**
- Use `PDS.toast()` method (see [src/js/common/toast.js](https://github.com/Pure-Web-Foundation/pure-ds/blob/main/src/js/common/toast.js) for implementation)
- Automatically ensures pds-toaster exists and is loaded before displaying
- See pds-toaster component API in [custom-elements.json](https://github.com/Pure-Web-Foundation/pure-ds/blob/main/custom-elements.json)

---

## How to Look Things Up

| Question | Action |
|----------|--------|
| "What CSS tokens exist?" | Read `pds.css-data.json` |
| "What components are available?" | Read `custom-elements.json` |
| "What utility classes exist?" | Read `pds-ontology.js` → `layoutPatterns`, `utilities` |
| "What primitives exist?" | Read `pds-ontology.js` → `primitives` |
| "How do I enhance HTML?" | Read `pds-enhancers.js` → `defaultPDSEnhancerMetadata` → `demoHtml` |
| "How are tokens named?" | Read `pds-generator.js` or `pds.css-data.json` |

---

## Summary Checklist

Before generating code:

1. ✅ **Consult SSoT files** — Don't guess class names or token names
2. ✅ **No inline styles** — Use CSS tokens via custom properties
3. ✅ **No hardcoded values** — Colors, spacing, radii all have tokens
4. ✅ **No alert/confirm/prompt** — Use `PDS.ask()` and `PDS.toast()`
5. ✅ **Use semantic HTML** — `<button>`, `<nav>`, `<article>`, `<label>`, `<details>`
6. ✅ **Apply enhancements via data-* attributes** — See `pds-enhancers.js` → `defaultPDSEnhancerMetadata`
7. ✅ **Components as last resort** — Only when native HTML can't achieve it
8. ✅ **Prefer primitives** — `.card`, `.badge`, `.callout` over custom components
9. ✅ **Wait for lazy components** — Use `await customElements.whenDefined()` before accessing APIs
10. ✅ **Include import map** — When using Lit-dependent components (such as `pds-form`), ensure `#pds/lit` is mapped

**For pds-form specifically:**

11. ✅ **Use `pw:submit` event** — NOT native `submit` event
12. ✅ **Add `btn-working` class** — For async submit operations, add during processing
13. ✅ **Use `examples` in JSON schema** — First example becomes placeholder
14. ✅ **Add smart icons only to text-like inputs** — Use `ui:icon` only for text/email/url/tel/search/password fields
15. ✅ **Wrap in `form[data-required]`** — For asterisk enhancement on required fields
16. ✅ **Pad details content** — After `<summary>`, wrap content in a padded container (usually `.card`)
