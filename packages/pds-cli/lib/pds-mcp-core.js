import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '../../..');

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function normalize(value) {
  return String(value || '').toLowerCase();
}

function decodeDataTextUrl(url) {
  if (typeof url !== 'string' || !url.startsWith('data:text/plain,')) return null;
  try {
    return decodeURIComponent(url.replace('data:text/plain,', ''));
  } catch {
    return null;
  }
}

function normalizePath(p) {
  return p.split(path.sep).join('/');
}

function resolveSsoTRoot(projectRoot = process.cwd()) {
  const candidates = [
    PACKAGE_ROOT,
    path.join(projectRoot, 'node_modules', '@pure-ds', 'core'),
    projectRoot,
  ];

  for (const candidate of candidates) {
    const hasCustomElements = existsSync(path.join(candidate, 'custom-elements.json'));
    const hasCssData = existsSync(path.join(candidate, 'public', 'assets', 'pds', 'pds.css-data.json'));
    const hasCore = existsSync(path.join(candidate, 'src', 'js', 'pds-core'));
    if (hasCustomElements && hasCssData && hasCore) {
      return candidate;
    }
  }

  return PACKAGE_ROOT;
}

function getSelectorClasses(selector) {
  const classes = [];
  const regex = /\.([a-zA-Z][\w-]*)/g;
  let match = regex.exec(selector);
  while (match) {
    classes.push(match[1]);
    match = regex.exec(selector);
  }
  return classes;
}

function buildSuggestions(items, term, limit = 5) {
  const needle = normalize(term);
  if (!needle) return [];
  const starts = [];
  const contains = [];
  for (const item of items) {
    const n = normalize(item);
    if (n.startsWith(needle)) starts.push(item);
    else if (n.includes(needle)) contains.push(item);
  }
  return [...new Set([...starts, ...contains])].slice(0, limit);
}

function includesAny(text, terms = []) {
  return terms.some((term) => text.includes(term));
}

// ─── Topic-specific guidance note builders ───────────────────────────────────

function buildFormWidgetGuidanceNotes(q) {
  const notes = [];

  if (includesAny(q, ['omnibox', 'ui:widget', 'widget', 'renderer', 'definerenderer', 'uischema', 'ui schema'])) {
    notes.push({
      title: 'Use widget keys, not custom element tag names',
      guidance:
        'In pds-form uiSchema, use the built-in widget key "omnibox", not the HTML tag name "pds-omnibox". The tag name is the rendered element; the widget key is the renderer lookup key.\n' +
        'Built-in widget keys: "omnibox", "upload", "richtext", "input-iso-interval", "input-range", "password", "textarea", "date".',
      evidence: [
        { source: 'public/assets/pds/components/pds-form.js', detail: 'Built-in renderer is registered under defineRenderer("omnibox", ...).' },
        { source: 'pds-form-docs.md', detail: 'Available PDS component widgets list.' },
      ],
    });

    notes.push({
      title: 'Pass omnibox settings via ui:options.settings',
      guidance:
        'When using the built-in omnibox renderer, put the PdsOmniboxSettings object under uiSchema[path]["ui:options"].settings.\n' +
        'The renderer reads ui?.["ui:options"]?.settings and assigns it to .settings on <pds-omnibox>.\n\n' +
        'Example:\n' +
        'const omniboxSettings = { categories: { Countries: { trigger: ({ search }) => search.length >= 2, getItems: async ({ search }) => [...] } } };\n' +
        'const uiSchema = { "/country": { "ui:widget": "omnibox", "ui:options": { icon: "globe", settings: omniboxSettings } } };',
      evidence: [
        { source: 'public/assets/pds/components/pds-form.js', detail: 'Renderer extracts settings from ui?.["ui:options"]?.settings.' },
        { source: 'pds-form-docs.md', detail: 'Omnibox examples place settings inside ui:options.settings.' },
      ],
    });
  }

  if (includesAny(q, ['definerenderer', 'renderer', 'custom widget', 'custom renderer', 'omnibox'])) {
    notes.push({
      title: 'Prefer built-in renderers before defineRenderer()',
      guidance:
        'Do not reach for form.defineRenderer() when pds-form already provides the widget.\n' +
        'Use defineRenderer() only for truly custom widgets or intentionally different aliases.',
      evidence: [
        { source: 'public/assets/pds/components/pds-form.js', detail: 'pds-form registers built-in renderers for omnibox, upload, richtext, input-range, and others.' },
        { source: 'pds-form-docs.md', detail: 'defineRenderer() is documented as the custom-widget extension point, not the first choice for built-in widgets.' },
      ],
    });
  }

  if (includesAny(q, ['settings', 'uischema', 'ui schema', 'omnibox'])) {
    notes.push({
      title: 'Declare settings objects before uiSchema uses them',
      guidance:
        'If a const uiSchema references a settings object, declare that settings object first.\n' +
        'Referencing a later const produces a runtime Temporal Dead Zone (TDZ) error.\n\n' +
        '✅ const mySettings = { ... };\n' +
        '   const uiSchema = { "/field": { "ui:options": { settings: mySettings } } };\n\n' +
        '❌ const uiSchema = { "/field": { "ui:options": { settings: mySettings } } }; // TDZ error!\n' +
        '   const mySettings = { ... };',
      evidence: [{ source: 'pds-form-docs.md', detail: 'Examples define settings objects before uiSchema blocks that reference them.' }],
    });
  }

  if (includesAny(q, ['daterange', 'iso-interval', 'input-iso-interval', 'travel date', 'date range'])) {
    notes.push({
      title: 'Use the built-in ISO interval date-range path',
      guidance:
        'For a pds-daterange-backed field in pds-form, prefer format: "iso-interval" or the built-in widget key "input-iso-interval".\n\n' +
        'Schema: { type: "string", format: "iso-interval" }\n' +
        'Or uiSchema: { "/dates": { "ui:widget": "input-iso-interval" } }',
      evidence: [{ source: 'pds-form-docs.md', detail: 'format: "iso-interval" and widget key "input-iso-interval" for pds-daterange rendering.' }],
    });
  }

  return notes;
}

function buildFormSubmitGuidanceNotes(q) {
  if (!includesAny(q, ['submit', 'pw:submit', 'btn-working', 'onsubmit', 'async', 'handler', 'working'])) return [];

  return [
    {
      title: 'pds-form: listen to pw:submit (NOT native submit); use btn-working during async',
      guidance:
        'The native "submit" event does NOT fire on pds-form. Always listen to "pw:submit".\n' +
        'e.detail contains: { json, formData, valid, issues }.\n' +
        'Add "btn-working" class to the submit button during async operations — PDS shows a spinner automatically.\n\n' +
        'Complete pattern:\n' +
        'form.addEventListener(\'pw:submit\', async (e) => {\n' +
        '  const submitBtn = form.querySelector(\'button[type="submit"]\');\n' +
        '  submitBtn?.classList.add(\'btn-working\');\n' +
        '  try {\n' +
        '    // Simulate or real API call:\n' +
        '    await new Promise(resolve => setTimeout(resolve, 2000));\n' +
        '    console.log(\'Submitted:\', e.detail.json);\n' +
        '    await PDS.toast(\'Saved!\', { type: \'success\' });\n' +
        '    form.reset();\n' +
        '  } catch (err) {\n' +
        '    await PDS.toast(\'Error: \' + err.message, { type: \'error\' });\n' +
        '  } finally {\n' +
        '    submitBtn?.classList.remove(\'btn-working\');\n' +
        '  }\n' +
        '});',
      evidence: [
        { source: 'pds-form-docs.md', detail: 'pw:submit event documentation and btn-working pattern.' },
        { source: 'custom-elements.json', detail: 'pds-form events list.' },
      ],
    },
  ];
}

function buildFormIconGuidanceNotes(q) {
  if (!includesAny(q, ['icon', 'ui:icon', 'placeholder', 'examples', 'schema property', 'text input', 'email input'])) return [];

  return [
    {
      title: 'ui:icon is ONLY valid on text-like inputs; use schema examples for placeholders',
      guidance:
        'ui:icon (icon-input rendering) is valid ONLY for: text, email, url, tel, search, password.\n' +
        'NEVER add ui:icon to: date-range, range sliders, textarea, select, checkbox/radio groups, omnibox, or upload.\n\n' +
        '✅ Correct:\n' +
        '  "/email": { "ui:icon": "envelope", "ui:autocomplete": "email" }\n' +
        '  "/name":  { "ui:icon": "user" }\n' +
        '  "/phone": { "ui:icon": "phone" }\n\n' +
        '❌ Wrong:\n' +
        '  "/notes": { "ui:widget": "textarea", "ui:icon": "message" }      // textarea — NO\n' +
        '  "/dates": { "ui:widget": "date-range", "ui:icon": "calendar" }   // date-range — NO\n' +
        '  "/budget": { "ui:widget": "input-range", "ui:icon": "coins" }    // range — NO\n\n' +
        'Placeholders: add an "examples" array to schema properties; the first value becomes the placeholder.\n' +
        '  name: { type: "string", examples: ["John Doe"] }\n' +
        '  email: { type: "string", format: "email", examples: ["user@example.com"] }',
      evidence: [{ source: 'pds-form-docs.md', detail: 'ui:icon scope rules and schema examples for placeholders.' }],
    },
  ];
}

function buildFormConditionalFieldGuidanceNotes(q) {
  if (!includesAny(q, ['other', 'conditional', 'visiblewhen', 'requiredwhen', '"other"', 'please specify'])) return [];

  return [
    {
      title: 'Auto-generate conditional "Other" text field with ui:visibleWhen + ui:requiredWhen',
      guidance:
        'When a schema has an "other" enum option, always add a companion conditional text field.\n\n' +
        'Schema:\n' +
        '  reason: {\n' +
        '    type: "string",\n' +
        '    oneOf: [\n' +
        '      { const: "search", title: "Search Engine" },\n' +
        '      { const: "other", title: "Other... (please specify)" }\n' +
        '    ]\n' +
        '  },\n' +
        '  otherReason: { type: "string", examples: ["Tell us more..."] }\n\n' +
        'uiSchema:\n' +
        '  "/otherReason": {\n' +
        '    "ui:visibleWhen": { "/reason": "other" },\n' +
        '    "ui:requiredWhen": { "/reason": "other" }\n' +
        '  }',
      evidence: [{ source: 'pds-form-docs.md', detail: 'ui:visibleWhen and ui:requiredWhen documentation.' }],
    },
  ];
}

function buildFormGuidanceNotes(question) {
  const q = normalize(question);
  const isFormQuestion = includesAny(q, [
    'pds-form', 'uischema', 'ui schema', 'ui:widget', 'widget', 'renderer', 'definerenderer',
    'omnibox', 'daterange', 'iso-interval', 'input-iso-interval', 'form', 'pw:submit',
    'btn-working', 'jsonschema', 'json schema',
  ]);
  if (!isFormQuestion) return [];

  return [
    ...buildFormWidgetGuidanceNotes(q),
    ...buildFormSubmitGuidanceNotes(q),
    ...buildFormIconGuidanceNotes(q),
    ...buildFormConditionalFieldGuidanceNotes(q),
  ];
}

function buildLocalizationGuidanceNotes(question) {
  const q = normalize(question);
  const isLocalization = includesAny(q, [
    'locali', 'i18n', 'msg(', ' msg ', 'setlocale', 'loadlocale', 'locale',
    'translat', 'language island', 'getlocalizationstate', 'createjsonlocalization',
  ]);
  if (!isLocalization) return [];

  return [
    {
      title: 'Import localization helpers from #pds — NOT from #pds/lit',
      guidance:
        'msg(), str, setLocale(), loadLocale(), getLocalizationState() are all exported from "#pds".\n' +
        '#pds/lit only re-exports Lit and lazyProps — do NOT use it for localization.\n\n' +
        'Configure in pds.config.js:\n' +
        '  import { PDS } from "@pure-ds/core";\n' +
        '  const localization = PDS.createJSONLocalization({\n' +
        '    locale: "en",\n' +
        '    locales: ["en", "nl"],\n' +
        '    aliases: { en: ["en", "en-US"], nl: ["nl", "nl-NL"] },\n' +
        '    basePath: "/assets/locales",\n' +
        '  });\n' +
        '  export const config = { mode: "live", preset: "default", localization };\n\n' +
        'Locale file format (e.g. public/assets/locales/nl-NL.json):\n' +
        '  { "Hello {0}": { "content": "Hallo {0}" } }\n\n' +
        'Use in modules:\n' +
        '  import { PDS, msg } from "#pds";\n' +
        '  document.body.innerHTML = msg("Hello world");\n\n' +
        'See LOCALIZATION.md for the full guide.',
      evidence: [
        { source: 'LOCALIZATION.md', detail: 'Full localization setup and usage guide.' },
        { source: 'src/js/pds-core/pds-config.js', detail: 'PDS.createJSONLocalization config shape.' },
      ],
    },
    {
      title: 'Localization is DOM-contextual via lang attributes — language islands supported',
      guidance:
        'msg() resolves translation using the nearest ancestor lang attribute on the DOM.\n' +
        'localization.locale is the fallback locale, NOT a forced global language.\n\n' +
        'Language island example:\n' +
        '  document.documentElement.lang = "en";\n' +
        '  document.body.innerHTML = `\n' +
        '    <p>${msg("Hello")}</p>            <!-- English -->\n' +
        '    <div lang="nl">\n' +
        '      <p>${msg("Hello")}</p>          <!-- Dutch -->\n' +
        '    </div>\n' +
        '  `;',
      evidence: [{ source: 'LOCALIZATION.md', detail: 'Contextual translation by DOM lang scope.' }],
    },
  ];
}

function buildDomBuildingGuidanceNotes(question) {
  const q = normalize(question);
  const isDomBuilding = includesAny(q, [
    'parse(', 'pds.parse', 'html(', 'pds.html', 'html`', 'parse`',
    'tagged template', 'event binding', '@click', '.prop=', '?disabled',
    'create element', 'appendchild', 'documentfragment', 'dom build',
    'dom element', 'event handler', ' parse ', 'html function', 'parse function',
  ]);
  if (!isDomBuilding) return [];

  return [
    {
      title: 'parse() → NodeList | html() → DocumentFragment; bindings require tagged template syntax',
      guidance:
        'parse() returns a NodeList (legacy-compatible).\n' +
        'html() returns a DocumentFragment for direct appendChild().\n\n' +
        'CRITICAL: Event handlers and property bindings REQUIRE tagged template syntax (backticks without parens).\n' +
        'Regular string mode (with parens) does NOT support bindings — functions get stringified.\n\n' +
        '── String mode (no bindings): ──\n' +
        "  const btn = parse('<button class=\"btn-primary\">Save</button>')[0];\n" +
        '  document.body.appendChild(btn);\n\n' +
        '── Tagged template (with bindings): ──\n' +
        '  const handler = () => console.log("clicked");\n' +
        '  const btn = parse`\n' +
        '    <button\n' +
        '      class=${"btn-primary"}\n' +
        '      ?disabled=${false}\n' +
        '      @click=${handler}\n' +
        '    >Click</button>\n' +
        '  `[0];\n\n' +
        '── html() tagged template: ──\n' +
        '  document.body.appendChild(html`\n' +
        '    <div @click=${handler}>Content</div>\n' +
        '  `);\n\n' +
        'Binding prefixes:\n' +
        '  @event=${fn}       — addEventListener\n' +
        '  .prop=${val}       — DOM property assignment\n' +
        '  ?boolean=${bool}   — boolean attribute toggle\n' +
        '  attr=${val}        — regular attribute (set/remove)',
      evidence: [{ source: 'src/js/pds.js', detail: 'parse() and html() exports with tagged template engine.' }],
    },
  ];
}

function buildToastDialogGuidanceNotes(question) {
  const q = normalize(question);
  const isInteraction = includesAny(q, [
    'toast', 'dialog', 'pds.ask', 'pds.toast', 'confirm(', 'alert(', 'prompt(',
    'modal', 'notification', '.ask(', 'beforeclose', 'toaster',
  ]);
  if (!isInteraction) return [];

  return [
    {
      title: 'Use PDS.ask() and PDS.toast() — NEVER browser dialogs',
      guidance:
        'alert()  → await PDS.toast("message", { type: "info" })\n' +
        'confirm() → await PDS.ask("message", { type: "confirm" })\n' +
        'prompt()  → await PDS.ask("message", { type: "prompt" })\n\n' +
        'PDS.toast(message, options) — non-blocking async notification:\n' +
        '  await PDS.toast("Saved!", { type: "success" });\n' +
        '  await PDS.toast("Error occurred", { type: "error" });\n' +
        '  await PDS.toast("Warning", { type: "warning", persistent: true });\n' +
        '  await PDS.toast("Info", { type: "information", duration: 3000 });\n\n' +
        'PDS.ask(message, options) — async modal dialog:\n' +
        '  // Confirm:\n' +
        '  const confirmed = await PDS.ask("Delete this item?", {\n' +
        '    type: "confirm",\n' +
        '    buttons: { ok: { name: "Delete", variant: "danger" } }\n' +
        '  });\n\n' +
        '  // Custom with beforeClose guard:\n' +
        '  await PDS.ask("Publish?", {\n' +
        '    title: "Final approval",\n' +
        '    buttons: { ok: { name: "Publish", primary: true }, cancel: { name: "Cancel", cancel: true } },\n' +
        '    beforeClose: async ({ actionKind }) => {\n' +
        '      if (actionKind !== "ok") return true;\n' +
        '      const ok = await checkCanPublish();\n' +
        '      return { allow: ok };\n' +
        '    }\n' +
        '  });\n\n' +
        'Import PDS: import { PDS } from "#pds";',
      evidence: [
        { source: 'src/js/common/toast.js', detail: 'PDS.toast() implementation.' },
        { source: 'custom-elements.json', detail: 'pds-toaster component API.' },
      ],
    },
  ];
}

function buildTreeviewGuidanceNotes(question) {
  const q = normalize(question);
  const isTreeview = includesAny(q, [
    'treeview', 'pds-treeview', 'tree view', 'lazy node', 'haschildren',
    'getchildren', 'node-load', 'expandable node', 'tree node',
  ]);
  if (!isTreeview) return [];

  return [
    {
      title: 'pds-treeview: options.source + options.getChildren for lazy loading',
      guidance:
        'Set tree.options with source (initial payload) and getChildren for deferred fetch.\n' +
        'Mark expandable nodes with hasChildren: true; children need not be pre-loaded.\n' +
        'getChildren fires once per node on first expand.\n\n' +
        'Example:\n' +
        '  const tree = document.getElementById("myTree");\n' +
        '  tree.options = {\n' +
        '    source: [\n' +
        '      {\n' +
        '        id: "docs",\n' +
        '        text: "Documentation",\n' +
        '        hasChildren: true,\n' +
        '        children: [\n' +
        '          { id: "guides", text: "Guides", hasChildren: true },\n' +
        '          { id: "api",    text: "API",    hasChildren: true }\n' +
        '        ]\n' +
        '      }\n' +
        '    ],\n' +
        '    getChildren: async ({ nodeId }) => {\n' +
        '      const res = await fetch(`/api/tree?parent=${encodeURIComponent(nodeId)}`);\n' +
        '      return res.ok ? res.json() : [];\n' +
        '    }\n' +
        '  };\n\n' +
        'Events for telemetry/retries: "node-load", "node-load-error".\n' +
        'Prefer shallow initial payloads (root + 1-2 levels); fetch deeper on expand.',
      evidence: [{ source: 'custom-elements.json', detail: 'pds-treeview options API and events.' }],
    },
  ];
}

function buildLitImportMapGuidanceNotes(question) {
  const q = normalize(question);
  const isLit = includesAny(q, [
    'import map', 'importmap', '#pds/lit', 'pds-form', 'lazyprops', 'lazy-props',
    'whendefined', 'lit component', 'lit element',
  ]);
  if (!isLit) return [];

  return [
    {
      title: 'Lit-based components (pds-form) require an import map and customElements.whenDefined()',
      guidance:
        'pds-form uses Lit. Add this import map in the HTML <head> BEFORE any module scripts:\n\n' +
        '  <script type="importmap">\n' +
        '  {\n' +
        '    "imports": {\n' +
        '      "#pds": "/assets/pds/core.js",\n' +
        '      "#pds/lit": "/assets/pds/external/lit.js"\n' +
        '    }\n' +
        '  }\n' +
        '  </script>\n\n' +
        'Always await definition before setting properties:\n' +
        '  await customElements.whenDefined("pds-form");\n' +
        '  const form = document.querySelector("pds-form");\n' +
        '  form.jsonSchema = schema; // safe\n\n' +
        'lazyProps directive (from #pds/lit) for Lit templates:\n' +
        '  import { lazyProps } from "#pds/lit";\n' +
        '  html`<pds-fab ${lazyProps({ satellites })}></pds-fab>`\n\n' +
        'Localization helpers (msg, setLocale, etc.) come from "#pds", NOT "#pds/lit".',
      evidence: [
        { source: 'LIT-REQUIREMENTS.md', detail: 'Lit requirements and import map setup.' },
        { source: 'custom-elements.json', detail: 'pds-form component API.' },
      ],
    },
  ];
}

function buildEmptyStateGuidanceNotes(question) {
  const q = normalize(question);
  if (!includesAny(q, ['empty state', 'empty-state', 'no results', 'onboarding', 'zero state', 'no data'])) return [];

  return [
    {
      title: 'Use .empty-state primitive for empty/onboarding states',
      guidance:
        'The .empty-state primitive structures an empty or onboarding UI.\n' +
        'Pattern: heading + supporting text + icon + primary/secondary actions.\n\n' +
        'Example:\n' +
        '  <div class="empty-state">\n' +
        '    <pds-icon icon="inbox" size="xl"></pds-icon>\n' +
        '    <h3>No items yet</h3>\n' +
        '    <p class="text-muted">Get started by creating your first item.</p>\n' +
        '    <button class="btn-primary">Create item</button>\n' +
        '  </div>',
      evidence: [{ source: 'src/js/pds-core/pds-ontology.js', detail: '.empty-state primitive definition.' }],
    },
  ];
}

function buildAllGuidanceNotes(question) {
  return [
    ...buildFormGuidanceNotes(question),
    ...buildLocalizationGuidanceNotes(question),
    ...buildDomBuildingGuidanceNotes(question),
    ...buildToastDialogGuidanceNotes(question),
    ...buildTreeviewGuidanceNotes(question),
    ...buildLitImportMapGuidanceNotes(question),
    ...buildEmptyStateGuidanceNotes(question),
  ];
}

function getToolSchema() {
  return [
    {
      name: 'get_tokens',
      description: 'Search PDS CSS custom property tokens from pds.css-data.json.',
      inputSchema: {
        type: 'object',
        properties: {
          contains: { type: 'string', description: 'Substring to search in token name/description.' },
          prefix: { type: 'string', description: 'Token prefix filter, e.g. --color-, --spacing-.' },
          limit: { type: 'number', minimum: 1, maximum: 200, default: 40 },
          includeValues: { type: 'boolean', default: true },
        },
      },
    },
    {
      name: 'find_utility_class',
      description: 'Find PDS selectors/classes from ontology primitives/layout/utilities metadata.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Class or concept, e.g. gap, surface, btn, flex.' },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 30 },
          section: {
            type: 'string',
            enum: ['primitives', 'components', 'layoutPatterns', 'all'],
            default: 'all',
          },
        },
      },
    },
    {
      name: 'query_design_system',
      description: 'Run natural-language PDS design system search against SSoT-backed data. Form truth: ui:icon/icon-input rendering is only for regular text-like inputs (text/email/url/tel/search/password), not date/range/textarea/select/choice widgets. For pds-form guidance, prefer built-in widget keys such as "omnibox" over tag names such as "pds-omnibox", and pass omnibox settings through ui:options.settings.',
      inputSchema: {
        type: 'object',
        required: ['question'],
        properties: {
          question: { type: 'string', description: 'Natural language question, e.g. "focus border color on inputs".' },
        },
      },
    },
    {
      name: 'get_component_api',
      description: 'Lookup PDS custom element API from custom-elements.json.',
      inputSchema: {
        type: 'object',
        properties: {
          tagName: { type: 'string', description: 'Custom element tag, e.g. pds-form.' },
          contains: { type: 'string', description: 'Search by tag/member/attribute/event text.' },
          limit: { type: 'number', minimum: 1, maximum: 50, default: 10 },
        },
      },
    },
    {
      name: 'get_enhancer_metadata',
      description: 'Read enhancer selector descriptions and demoHtml from pds-enhancers-meta.js.',
      inputSchema: {
        type: 'object',
        properties: {
          selector: { type: 'string', description: 'Exact or partial enhancer selector.' },
          contains: { type: 'string', description: 'Search text in selector/description/demoHtml.' },
          includeDemoHtml: { type: 'boolean', default: true },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 20 },
        },
      },
    },
    {
      name: 'get_config_relations',
      description: 'Read PDS_CONFIG_RELATIONS from pds-config.js for deterministic token mapping and form-UI constraints (including ui:icon/icon-input scope for text-like inputs only).',
      inputSchema: {
        type: 'object',
        properties: {
          pathPrefix: { type: 'string', description: 'Config path prefix, e.g. colors, layout.' },
          contains: { type: 'string', description: 'Search inside relation payload JSON.' },
          limit: { type: 'number', minimum: 1, maximum: 200, default: 60 },
        },
      },
    },
    {
      name: 'validate_pds_snippet',
      description: 'Validate HTML snippet for unknown classes, tokens, and pds-* tags against SSoT. Also flags anti-patterns: inline style attributes, <style> injection, and browser dialog calls.',
      inputSchema: {
        type: 'object',
        required: ['html'],
        properties: {
          html: { type: 'string', description: 'HTML snippet to validate.' },
        },
      },
    },
    {
      name: 'get_best_match',
      description: 'Given a UI intent (e.g. "dropdown nav menu", "spinner button", "accordion"), returns ranked PDS matches across all layers: web components (pds-*) > data-* enhancers > CSS primitives/utilities. Use this FIRST when deciding which PDS element to use.',
      inputSchema: {
        type: 'object',
        required: ['intent'],
        properties: {
          intent: { type: 'string', description: 'UI intent or concept, e.g. "dropdown menu in a nav", "collapsible sections", "loading spinner on a button".' },
          limit: { type: 'number', minimum: 1, maximum: 20, default: 8 },
        },
      },
    },
  ];
}

async function loadJson(filePath) {
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function importModule(filePath) {
  return import(pathToFileURL(filePath).href);
}

export function createPdsMcpContext({ projectRoot = process.cwd() } = {}) {
  const ssoTRoot = resolveSsoTRoot(projectRoot);
  return {
    projectRoot,
    ssoTRoot,
    files: {
      cssData: path.join(ssoTRoot, 'public', 'assets', 'pds', 'pds.css-data.json'),
      customElements: path.join(ssoTRoot, 'custom-elements.json'),
      ontology: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-ontology.js'),
      queryEngine: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-query.js'),
      enhancersMeta: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-enhancers-meta.js'),
      config: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-config.js'),
    },
    cache: new Map(),
  };
}

async function getCssData(ctx) {
  if (!ctx.cache.has('cssData')) {
    ctx.cache.set('cssData', await loadJson(ctx.files.cssData));
  }
  return ctx.cache.get('cssData');
}

async function getCustomElements(ctx) {
  if (!ctx.cache.has('customElements')) {
    ctx.cache.set('customElements', await loadJson(ctx.files.customElements));
  }
  return ctx.cache.get('customElements');
}

async function getOntology(ctx) {
  if (!ctx.cache.has('ontology')) {
    const mod = await importModule(ctx.files.ontology);
    ctx.cache.set('ontology', mod.ontology || {});
  }
  return ctx.cache.get('ontology');
}

async function getEnhancerMeta(ctx) {
  if (!ctx.cache.has('enhancersMeta')) {
    const mod = await importModule(ctx.files.enhancersMeta);
    ctx.cache.set('enhancersMeta', mod.defaultPDSEnhancerMetadata || []);
  }
  return ctx.cache.get('enhancersMeta');
}

async function getConfigRelations(ctx) {
  if (!ctx.cache.has('configRelations')) {
    const mod = await importModule(ctx.files.config);
    ctx.cache.set('configRelations', mod.PDS_CONFIG_RELATIONS || {});
  }
  return ctx.cache.get('configRelations');
}

async function getQueryEngineClass(ctx) {
  if (!ctx.cache.has('queryEngineClass')) {
    const mod = await importModule(ctx.files.queryEngine);
    const queryEngineClass = mod?.PDSQuery || mod?.default || null;
    ctx.cache.set('queryEngineClass', queryEngineClass);
  }
  return ctx.cache.get('queryEngineClass');
}

function getPropertyValue(property) {
  return decodeDataTextUrl(property?.references?.find((r) => r.name === 'Value')?.url);
}

function buildCompiledFromCssData(cssData) {
  const compiled = {
    tokens: {
      colors: {},
      spacing: {},
      typography: {},
    },
  };

  for (const property of cssData.properties || []) {
    const name = String(property?.name || '');
    const value = getPropertyValue(property);
    if (!name) continue;

    if (name.startsWith('--color-')) {
      compiled.tokens.colors[name] = value;
    }

    if (name.startsWith('--spacing-')) {
      const key = name.replace('--spacing-', '').trim();
      if (key) compiled.tokens.spacing[key] = value || '';
    }

    if (name.startsWith('--font-')) {
      compiled.tokens.typography[name] = value;
    }
  }

  return compiled;
}

function shapeComponentDeclaration(declaration) {
  const pick = (items = [], mapper) => items.map(mapper).slice(0, 80);
  return {
    tagName: declaration.tagName,
    className: declaration.name,
    description: declaration.description || '',
    attributes: pick(declaration.attributes, (a) => ({
      name: a.name,
      type: a?.type?.text || null,
      description: a.description || '',
    })),
    events: pick(declaration.events, (e) => ({
      name: e.name,
      type: e?.type?.text || null,
      description: e.description || '',
    })),
    cssParts: pick(declaration.cssParts, (p) => ({ name: p.name, description: p.description || '' })),
    cssProperties: pick(declaration.cssProperties, (p) => ({ name: p.name, description: p.description || '' })),
    members: pick(declaration.members, (m) => ({
      name: m.name,
      kind: m.kind,
      type: m?.type?.text || null,
      description: m.description || '',
    })),
    slots: pick(declaration.slots, (s) => ({ name: s.name || '', description: s.description || '' })),
  };
}

async function handleGetTokens(ctx, args = {}) {
  const { contains = '', prefix = '', includeValues = true } = args;
  const limit = Math.min(Math.max(Number(args.limit || 40), 1), 200);
  const cssData = await getCssData(ctx);
  const needle = normalize(contains);
  const prefixNeedle = normalize(prefix);

  const matches = (cssData.properties || [])
    .filter((property) => {
      const name = normalize(property.name);
      const description = normalize(property.description);
      const prefixOk = !prefixNeedle || name.startsWith(prefixNeedle);
      const containsOk = !needle || name.includes(needle) || description.includes(needle);
      return prefixOk && containsOk;
    })
    .slice(0, limit)
    .map((property) => {
      const value = includeValues ? getPropertyValue(property) : null;
      return {
        name: property.name,
        description: property.description || '',
        syntax: property.syntax || '',
        value,
      };
    });

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.cssData)),
    totalMatches: matches.length,
    tokens: matches,
  };
}

async function handleFindUtilityClass(ctx, args = {}) {
  const { query = '', section = 'all' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 30), 1), 100);
  const ontology = await getOntology(ctx);
  const needle = normalize(query);

  const buckets = [];
  if (section === 'all' || section === 'primitives') buckets.push(...(ontology.primitives || []));
  if (section === 'all' || section === 'components') buckets.push(...(ontology.components || []));
  if (section === 'all' || section === 'layoutPatterns') buckets.push(...(ontology.layoutPatterns || []));

  const matches = [];
  const classSet = new Set();

  for (const item of buckets) {
    const selectors = item.selectors || [];
    for (const selector of selectors) {
      const selectorText = String(selector);
      const matchTarget = `${item.name || ''} ${item.description || ''} ${selectorText}`.toLowerCase();
      if (needle && !matchTarget.includes(needle)) continue;
      matches.push({
        selector: selectorText,
        name: item.name || '',
        description: item.description || '',
        category: item.category || '',
        id: item.id || '',
      });

      const classes = getSelectorClasses(selectorText);
      for (const className of classes) classSet.add(className);
    }
  }

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.ontology)),
    totalMatches: matches.length,
    matches: matches.slice(0, limit),
    extractedClassesSample: [...classSet].slice(0, 80),
  };
}

async function handleQueryDesignSystem(ctx, args = {}) {
  const question = String(args.question || '').trim();
  if (!question) {
    throw new Error('The "question" argument is required.');
  }

  const [PDSQuery, ontology, cssData] = await Promise.all([
    getQueryEngineClass(ctx),
    getOntology(ctx),
    getCssData(ctx),
  ]);

  if (!PDSQuery) {
    throw new Error('Unable to load PDS query engine.');
  }

  const pseudoPds = {
    ontology,
    compiled: buildCompiledFromCssData(cssData),
  };

  const engine = new PDSQuery(pseudoPds);
  const results = await engine.search(question);
  const guidanceNotes = buildAllGuidanceNotes(question);

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: {
      ontology: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.ontology)),
      cssData: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.cssData)),
      queryEngine: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.queryEngine)),
    },
    question,
    totalMatches: results.length,
    guidanceNotes,
    results,
  };
}

async function handleGetComponentApi(ctx, args = {}) {
  const { tagName = '', contains = '' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 10), 1), 50);
  const customElements = await getCustomElements(ctx);
  const tagNeedle = normalize(tagName);
  const textNeedle = normalize(contains);

  const declarations = [];
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (!declaration.customElement || !declaration.tagName) continue;
      const shaped = shapeComponentDeclaration(declaration);
      const hay = normalize(JSON.stringify(shaped));
      const tagOk = !tagNeedle || normalize(shaped.tagName) === tagNeedle || normalize(shaped.tagName).includes(tagNeedle);
      const textOk = !textNeedle || hay.includes(textNeedle);
      if (tagOk && textOk) declarations.push(shaped);
    }
  }

  const components = declarations.slice(0, limit).map((comp) => {
    // Components with CSS parts use shadow DOM — surface the adoptLayers requirement
    const hasShadowDom = comp.cssParts && comp.cssParts.length > 0;
    return {
      ...comp,
      ...(hasShadowDom
        ? {
            shadowDomNote:
              'This component uses a shadow DOM. When extending or wrapping it in a custom element, call PDS.adoptLayers(this) in the constructor to inherit all PDS adopted stylesheets. NEVER inject <style> blocks into shadow DOM.',
          }
        : {}),
    };
  });

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.customElements)),
    totalMatches: declarations.length,
    components,
  };
}

async function handleGetEnhancerMetadata(ctx, args = {}) {
  const { selector = '', contains = '', includeDemoHtml = true } = args;
  const limit = Math.min(Math.max(Number(args.limit || 20), 1), 100);
  const list = await getEnhancerMeta(ctx);
  const selectorNeedle = normalize(selector);
  const textNeedle = normalize(contains);

  const matches = list
    .filter((item) => {
      const sel = normalize(item.selector);
      const hay = normalize(`${item.selector} ${item.description || ''} ${item.demoHtml || ''}`);
      const selectorOk = !selectorNeedle || sel.includes(selectorNeedle);
      const textOk = !textNeedle || hay.includes(textNeedle);
      return selectorOk && textOk;
    })
    .slice(0, limit)
    .map((item) => ({
      selector: item.selector,
      description: item.description || '',
      attributes: Array.isArray(item.attributes) ? item.attributes : undefined,
      demoHtml: includeDemoHtml ? item.demoHtml || '' : undefined,
    }));

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.enhancersMeta)),
    totalMatches: matches.length,
    enhancers: matches,
  };
}

async function handleGetConfigRelations(ctx, args = {}) {
  const { pathPrefix = '', contains = '' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 60), 1), 200);
  const relations = await getConfigRelations(ctx);
  const pathNeedle = normalize(pathPrefix);
  const textNeedle = normalize(contains);

  const entries = Object.entries(relations)
    .filter(([relationPath, payload]) => {
      const pathOk = !pathNeedle || normalize(relationPath).startsWith(pathNeedle);
      const textOk = !textNeedle || normalize(JSON.stringify(payload)).includes(textNeedle);
      return pathOk && textOk;
    })
    .slice(0, limit)
    .map(([relationPath, payload]) => ({ path: relationPath, relations: payload }));

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.config)),
    totalMatches: entries.length,
    relations: entries,
  };
}

async function handleValidateSnippet(ctx, args = {}) {
  const html = String(args.html || '');
  if (!html.trim()) {
    throw new Error('The "html" argument is required.');
  }

  const [ontology, cssData, customElements] = await Promise.all([
    getOntology(ctx),
    getCssData(ctx),
    getCustomElements(ctx),
  ]);

  const knownTokens = new Set((cssData.properties || []).map((p) => p.name));
  const knownComponents = new Set();
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (declaration.customElement && declaration.tagName) knownComponents.add(declaration.tagName);
    }
  }

  const knownClasses = new Set();
  for (const group of [ontology.primitives || [], ontology.layoutPatterns || [], ontology.components || []]) {
    for (const item of group) {
      for (const selector of item.selectors || []) {
        for (const className of getSelectorClasses(String(selector))) knownClasses.add(className);
      }
    }
  }

  const usedClasses = new Set();
  const classRegex = /class\s*=\s*['\"]([^'\"]+)['\"]/g;
  let classMatch = classRegex.exec(html);
  while (classMatch) {
    for (const className of classMatch[1].split(/\s+/).filter(Boolean)) {
      usedClasses.add(className.trim());
    }
    classMatch = classRegex.exec(html);
  }

  const usedTokens = new Set(html.match(/--[a-zA-Z0-9-]+/g) || []);

  const componentRegex = /<\s*(pds-[a-z0-9-]+)/gi;
  const usedComponents = new Set();
  let componentMatch = componentRegex.exec(html);
  while (componentMatch) {
    usedComponents.add(componentMatch[1].toLowerCase());
    componentMatch = componentRegex.exec(html);
  }

  const unknownClasses = [...usedClasses].filter((className) => !knownClasses.has(className));
  const unknownTokens = [...usedTokens].filter((token) => !knownTokens.has(token));
  const unknownComponents = [...usedComponents].filter((tag) => !knownComponents.has(tag));

  // Anti-pattern detection
  const antiPatterns = [];

  // Inline style attributes
  if (/\bstyle\s*=\s*["'][^"']+["']/.test(html)) {
    antiPatterns.push({
      rule: 'no-inline-styles',
      message: 'Inline style attributes detected. Use CSS custom property tokens (var(--token-name)) instead.',
      fix: 'Replace style="..." with CSS custom properties. Use get_tokens to find the right token.',
    });
  }

  // <style> tag injection (especially dangerous in shadow DOM)
  if (/<style[\s>]/i.test(html)) {
    antiPatterns.push({
      rule: 'no-style-injection',
      message: '<style> tag detected. In PDS web components, always use PDS.adoptLayers(this) in the constructor — never inject <style> blocks.',
      fix: 'Remove <style> and call PDS.adoptLayers(this) in the shadow root constructor.',
    });
  }

  // Browser dialog calls
  if (/\b(alert|confirm|prompt)\s*\(/.test(html)) {
    antiPatterns.push({
      rule: 'no-browser-dialogs',
      message: 'Browser dialog (alert/confirm/prompt) detected.',
      fix: 'Use PDS.toast() for notifications and PDS.ask() for confirmations/prompts.',
    });
  }

  const hasAntiPatterns = antiPatterns.length > 0;
  const valid = unknownClasses.length === 0 && unknownTokens.length === 0 && unknownComponents.length === 0 && !hasAntiPatterns;

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    valid,
    antiPatterns,
    unknown: {
      classes: unknownClasses.map((className) => ({
        name: className,
        suggestions: buildSuggestions([...knownClasses], className),
      })),
      tokens: unknownTokens.map((token) => ({
        name: token,
        suggestions: buildSuggestions([...knownTokens], token),
      })),
      components: unknownComponents.map((tag) => ({
        name: tag,
        suggestions: buildSuggestions([...knownComponents], tag),
      })),
    },
  };
}

async function handleGetBestMatch(ctx, args = {}) {
  const intent = String(args.intent || '').trim();
  if (!intent) throw new Error('The "intent" argument is required.');
  const limit = Math.min(Math.max(Number(args.limit || 8), 1), 20);
  const needle = normalize(intent);

  const [ontology, enhancerMeta, customElements] = await Promise.all([
    getOntology(ctx),
    getEnhancerMeta(ctx),
    getCustomElements(ctx),
  ]);

  const results = [];

  // Layer 3: web components
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (!declaration.customElement || !declaration.tagName) continue;
      const hay = normalize(`${declaration.tagName} ${declaration.description || ''}`);
      if (!hay.includes(needle)) continue;
      results.push({
        layer: 3,
        type: 'web-component',
        selector: declaration.tagName,
        description: declaration.description || '',
        usage: `<${declaration.tagName}></${declaration.tagName}>`,
        note: 'Use get_component_api for full API details.',
      });
    }
  }

  // Layer 2: data-* enhancers
  for (const item of enhancerMeta) {
    const hay = normalize(`${item.selector} ${item.description || ''}`);
    if (!hay.includes(needle)) continue;
    results.push({
      layer: 2,
      type: 'enhancer',
      selector: item.selector,
      description: item.description || '',
      usage: item.demoHtml || item.selector,
      note: 'Use get_enhancer_metadata for full details and demo HTML.',
    });
  }

  // Layer 1: primitives and layout patterns
  const ontologyGroups = [
    ...(ontology.primitives || []),
    ...(ontology.layoutPatterns || []),
    ...(ontology.components || []),
  ];
  for (const item of ontologyGroups) {
    const hay = normalize(`${item.name || ''} ${item.description || ''} ${(item.selectors || []).join(' ')}`);
    if (!hay.includes(needle)) continue;
    const firstSelector = (item.selectors || [])[0] || '';
    const firstClass = getSelectorClasses(firstSelector)[0] || firstSelector;
    results.push({
      layer: 1,
      type: item.category || 'primitive',
      selector: firstSelector,
      description: item.description || '',
      usage: firstClass ? `<element class="${firstClass}">...</element>` : firstSelector,
      note: 'Use find_utility_class for all selectors in this group.',
    });
  }

  // Sort layer desc, deduplicate by selector
  const seen = new Set();
  const ranked = results
    .sort((a, b) => b.layer - a.layer)
    .filter((item) => {
      if (!item.selector || seen.has(item.selector)) return false;
      seen.add(item.selector);
      return true;
    })
    .slice(0, limit);

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    intent,
    layerGuide: 'Prefer the LOWEST sufficient layer: Layer 1 (CSS primitive/utility) > Layer 2 (data-* enhancer) > Layer 3 (pds-* web component). Only escalate when the lower layer cannot satisfy the requirement.',
    totalMatches: ranked.length,
    matches: ranked,
  };
}

const TOOL_HANDLERS = {
  get_tokens: handleGetTokens,
  find_utility_class: handleFindUtilityClass,
  query_design_system: handleQueryDesignSystem,
  get_component_api: handleGetComponentApi,
  get_enhancer_metadata: handleGetEnhancerMetadata,
  get_config_relations: handleGetConfigRelations,
  validate_pds_snippet: handleValidateSnippet,
  get_best_match: handleGetBestMatch,
};

export function getPdsMcpTools() {
  return getToolSchema();
}

export async function runPdsMcpTool(ctx, name, args = {}) {
  const handler = TOOL_HANDLERS[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return handler(ctx, isObject(args) ? args : {});
}
