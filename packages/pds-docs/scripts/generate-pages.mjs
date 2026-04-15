#!/usr/bin/env node
/**
 * Generates Starlight .mdx pages from docs-data/*.json.
 * Run after build-docs-data.mjs.
 *
 * Generates:
 *   src/content/docs/components/<tagName>.mdx
 *   src/content/docs/tokens/<group>.mdx
 *   src/content/docs/primitives/<id>.mdx
 *   src/content/docs/enhancements/<slug>.mdx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(DOCS_ROOT, 'docs-data');
const CONTENT_DIR = path.join(DOCS_ROOT, 'src', 'content', 'docs');

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function escapeYaml(str) {
  return String(str || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

function escapeTableCell(str) {
  return String(str || '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/`/g, "'");
}

// ─── MDX string escaping ──────────────────────────────────────────────────────

function escapeMdxString(str) {
  return String(str || '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// ─── Component pages ──────────────────────────────────────────────────────────

// ─── Shared live-block builder ────────────────────────────────────────────────
// Uses whenDefined so the setter fires after the custom element upgrades.
function makeLiveBlock(demoHtml, height = '160px', { css = '', js = '' } = {}) {
  const pgPayload = Buffer.from(encodeURIComponent(JSON.stringify({ html: demoHtml, css, js }))).toString('base64');
  const fallbackSetters = [
    `r.html=${JSON.stringify(demoHtml)}`,
    css ? `r.css=${JSON.stringify(css)}` : '',
    js  ? `r.js=${JSON.stringify(js)}`   : '',
  ].filter(Boolean).join(';');
  const setContentPayload = JSON.stringify({
    html: demoHtml,
    ...(css ? { css } : {}),
    ...(js ? { js } : {}),
  });
  const applyContent = `if(typeof r.setContent==='function'){r.setContent(${setContentPayload},{reload:${js ? 'true' : 'false'}});}else{${fallbackSetters}}`;
  return `<div class="pds-live-embed">
<script src="/assets/pds/components/pds-render.js" type="module"><\/script>
<pds-render theme="light" preset="default" height="${height}" padding="1rem" style="border:1px solid #e2e8f0;border-radius:6px;display:block;overflow:hidden"></pds-render>
<script>(function(){var r=document.currentScript.previousElementSibling;if(!r)return;customElements.whenDefined('pds-render').then(function(){${applyContent}});})()<\/script>
<p style="margin:.4rem 0 0;font-size:.75rem"><a href="/playground/?code=${pgPayload}" target="_blank">⚡ Open in Playground</a></p>
</div>

`;
}

// Map of tagName → demo. Value is either a string (html only) or {html, css?, js?}.
const COMPONENT_DEMOS = {
  'pds-icon': `<pds-icon icon="star" size="lg"></pds-icon>
<pds-icon icon="heart" size="lg" style="color:var(--color-danger)"></pds-icon>
<pds-icon icon="check-circle" size="lg" style="color:var(--color-success)"></pds-icon>`,
  'pds-drawer': `<button class="btn-primary" onclick="document.querySelector('pds-drawer').open=true">Open drawer</button>
<pds-drawer><p style="padding:1rem">Drawer content here.</p></pds-drawer>`,
  'pds-toaster': `<pds-toaster></pds-toaster>
<button class="btn-primary" onclick="PDS.toast('Hello from PDS!',{type:'success'})">Show toast</button>`,
  'pds-rating': `<pds-rating value="3" max="5"></pds-rating>`,
  'pds-tags': `<pds-tags value='["Design","System","PDS"]'></pds-tags>`,
  'pds-theme': `<pds-theme></pds-theme>`,
  'pds-fab': `<pds-fab icon="plus" label="Create"></pds-fab>`,
  'pds-scrollrow': `<pds-scrollrow>
  <button class="btn-secondary">Tab 1</button>
  <button class="btn-secondary">Tab 2</button>
  <button class="btn-secondary">Tab 3</button>
  <button class="btn-secondary">Tab 4</button>
</pds-scrollrow>`,
  'pds-treeview': {
    html: `<pds-treeview display-only expanded-all></pds-treeview>`,
    js: `await import(window.__pdsBase + 'components/pds-treeview.js');
document.querySelector('pds-treeview').settings = {
  source: [
    { id:'1', text:'Documents', value:'docs', hasChildren:true, children:[
      { id:'1-1', text:'Report.pdf', value:'report', hasChildren:false, children:[] },
      { id:'1-2', text:'Notes.txt', value:'notes', hasChildren:false, children:[] }
    ]},
    { id:'2', text:'Images', value:'images', hasChildren:true, children:[
      { id:'2-1', text:'photo.jpg', value:'photo', hasChildren:false, children:[] }
    ]},
    { id:'3', text:'config.json', value:'config', hasChildren:false, children:[] }
  ]
};`,
  },
};

function generateComponentPage(component) {
  const { tagName, description, attributes, events, cssParts, slots, hasShadowDom } = component;

  const attrRows = (attributes || []).filter(a => a.name).map(
    (a) => `| \`${escapeTableCell(a.name)}\` | \`${escapeTableCell(a.type || 'string')}\` | ${escapeTableCell(a.description)} |`
  ).join('\n');

  const eventRows = (events || []).filter(e => e.name).map(
    (e) => `| \`${escapeTableCell(e.name)}\` | ${escapeTableCell(e.description)} |`
  ).join('\n');

  const slotRows = (slots || []).map(
    (s) => `| \`${escapeTableCell(s.name || '(default)')}\` | ${escapeTableCell(s.description)} |`
  ).join('\n');

  const cssPartRows = (cssParts || []).filter(p => p.name).map(
    (p) => `| \`::part(${escapeTableCell(p.name)})\` | ${escapeTableCell(p.description)} |`
  ).join('\n');

  const raw = COMPONENT_DEMOS[tagName] || `<${tagName}></${tagName}>`;
  const demoHtml = typeof raw === 'object' ? raw.html : raw;
  const demoOpts = typeof raw === 'object' ? { css: raw.css || '', js: raw.js || '' } : {};
  const liveBlock = makeLiveBlock(demoHtml, '160px', demoOpts);

  // Wrap description in a code block if it contains JSX-unsafe characters
  const safeDescription = description
    ? description.replace(/[<>{}]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;' }[c]))
    : '';

  return `---
title: "${escapeYaml(tagName)}"
description: "${escapeYaml(description.split('\n')[0])}"
---

${liveBlock}${safeDescription ? safeDescription + '\n\n' : ''}${hasShadowDom ? `> **Shadow DOM component** — When building a custom element that wraps or extends this component, call \`PDS.adoptLayers(this)\` in the constructor. Never inject \`<style>\` blocks into shadow DOM.

` : ''}## Usage

\`\`\`html
${demoHtml}
\`\`\`

${attrRows ? `## Attributes

| Name | Type | Description |
|------|------|-------------|
${attrRows}
` : ''}${eventRows ? `## Events

| Name | Description |
|------|-------------|
${eventRows}
` : ''}${slotRows ? `## Slots

| Name | Description |
|------|-------------|
${slotRows}
` : ''}${cssPartRows ? `## CSS Parts

| Part | Description |
|------|-------------|
${cssPartRows}
` : ''}`;
}

// ─── Token pages ──────────────────────────────────────────────────────────────

function generateTokenPage(group, tokens) {
  const rows = tokens.map(
    (t) => `| \`${escapeTableCell(t.name)}\` | ${t.value ? `\`${escapeTableCell(t.value)}\`` : ''} | ${escapeTableCell(t.description)} |`
  ).join('\n');

  return `---
title: "${escapeYaml(group)} tokens"
description: "PDS CSS custom property tokens for ${group}."
---

## All \`--${group}-*\` tokens

| Token | Default value | Description |
|-------|---------------|-------------|
${rows}
`;
}

// ─── Primitive pages ──────────────────────────────────────────────────────────

const PRIMITIVE_DEMOS = {
  'badge': `<div class="flex gap-sm flex-wrap">
  <span class="badge">Default</span>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-success">Success</span>
  <span class="badge badge-warning">Warning</span>
  <span class="badge badge-danger">Danger</span>
  <span class="badge badge-outline">Outline</span>
  <span class="pill">Pill</span>
  <span class="tag">Tag</span>
</div>`,
  'card': `<div class="flex gap-md flex-wrap">
  <div class="card" style="min-width:160px">
    <h4>Basic card</h4>
    <p class="text-sm text-muted">Default card with padding.</p>
  </div>
  <div class="card card-elevated" style="min-width:160px">
    <h4>Elevated</h4>
    <p class="text-sm text-muted">Raised shadow level.</p>
  </div>
  <div class="card card-outlined" style="min-width:160px">
    <h4>Outlined</h4>
    <p class="text-sm text-muted">Border only, no shadow.</p>
  </div>
</div>`,
  'surface': `<div class="flex gap-sm flex-wrap">
  <div class="surface-base" style="padding:1rem;border-radius:6px;min-width:100px;text-align:center">base</div>
  <div class="surface-subtle" style="padding:1rem;border-radius:6px;min-width:100px;text-align:center">subtle</div>
  <div class="surface-elevated" style="padding:1rem;border-radius:6px;min-width:100px;text-align:center">elevated</div>
  <div class="surface-sunken" style="padding:1rem;border-radius:6px;min-width:100px;text-align:center">sunken</div>
  <div class="surface-overlay" style="padding:1rem;border-radius:6px;min-width:100px;text-align:center">overlay</div>
</div>`,
  'callout': `<div class="callout">
  <strong>Note</strong> — This is a default callout.
</div>
<div class="callout callout-success" style="margin-top:.5rem">
  <strong>Success</strong> — Operation completed.
</div>
<div class="callout callout-warning" style="margin-top:.5rem">
  <strong>Warning</strong> — Check your settings.
</div>
<div class="callout callout-danger" style="margin-top:.5rem">
  <strong>Error</strong> — Something went wrong.
</div>`,
  'empty-state': `<div class="empty-state">
  <p class="empty-state-title">No results found</p>
  <p class="empty-state-description">Try adjusting your search filters.</p>
  <button class="btn-primary">Clear filters</button>
</div>`,
  'dialog': `<button class="btn-primary" onclick="document.getElementById('demo-dialog').showModal()">Open dialog</button>
<dialog id="demo-dialog" style="border-radius:8px;padding:1.5rem;min-width:280px">
  <h3>Dialog title</h3>
  <p class="text-muted">Dialog body content goes here.</p>
  <nav class="form-actions" style="margin-top:1rem">
    <button class="btn-secondary" onclick="document.getElementById('demo-dialog').close()">Cancel</button>
    <button class="btn-primary" onclick="document.getElementById('demo-dialog').close()">Confirm</button>
  </nav>
</dialog>`,
  'divider': `<p>Above the divider</p>
<hr>
<p>Between sections</p>
<hr data-content="or">
<p>Below the labelled divider</p>`,
  'table': `<table>
  <thead>
    <tr><th>Name</th><th>Role</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>Designer</td><td><span class="badge badge-success">Active</span></td></tr>
    <tr><td>Bob</td><td>Engineer</td><td><span class="badge badge-success">Active</span></td></tr>
    <tr><td>Carol</td><td>PM</td><td><span class="badge badge-warning">Away</span></td></tr>
  </tbody>
</table>`,
  'button': `<div class="flex gap-sm flex-wrap">
  <button class="btn-primary">Primary</button>
  <button class="btn-secondary">Secondary</button>
  <button class="btn-danger">Danger</button>
  <button class="btn-ghost">Ghost</button>
  <button class="btn-primary btn-sm">Small</button>
  <button class="btn-primary btn-lg">Large</button>
  <button class="btn-primary" disabled>Disabled</button>
</div>`,
  'fieldset': `<form>
  <fieldset>
    <legend>Choose an option</legend>
    <label><input type="radio" name="demo" value="a"> Option A</label>
    <label><input type="radio" name="demo" value="b"> Option B</label>
    <label><input type="checkbox"> Enable feature</label>
  </fieldset>
</form>`,
  'label-field': `<form style="display:flex;flex-direction:column;gap:.75rem;max-width:320px">
  <label>
    <span>Full name</span>
    <input type="text" placeholder="Jane Smith">
  </label>
  <label>
    <span>Email</span>
    <input type="email" placeholder="jane@example.com">
  </label>
  <label>
    <span>Message</span>
    <textarea rows="3" placeholder="Type here…"></textarea>
  </label>
</form>`,
  'accordion': `<div class="accordion">
  <details open>
    <summary>What is PDS?</summary>
    <p>Pure Design System — a standards-first, configuration-driven design system.</p>
  </details>
  <details>
    <summary>How do I install it?</summary>
    <p>Run <code>npm install @pure-ds/core</code> and follow the setup guide.</p>
  </details>
  <details>
    <summary>Is it accessible?</summary>
    <p>Yes — all primitives and components follow WCAG 2.1 AA guidelines.</p>
  </details>
</div>`,
  'icon': `<div class="flex gap-md" style="align-items:center;font-size:1.5rem">
  <span class="icon">★</span>
  <span class="icon">♥</span>
  <span class="icon">✓</span>
  <span class="icon-sm">➤</span>
  <span class="icon-lg">⚡</span>
</div>`,
  'figure': `<figure>
  <div style="background:var(--color-surface-subtle);height:120px;display:flex;align-items:center;justify-content:center;border-radius:6px;color:var(--color-text-secondary)">Image placeholder</div>
  <figcaption>A descriptive caption below the figure.</figcaption>
</figure>`,
  'gallery': `<div class="gallery">
  <div style="background:var(--color-surface-subtle);height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center">1</div>
  <div style="background:var(--color-surface-subtle);height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center">2</div>
  <div style="background:var(--color-surface-subtle);height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center">3</div>
  <div style="background:var(--color-surface-subtle);height:80px;border-radius:6px;display:flex;align-items:center;justify-content:center">4</div>
</div>`,
  'form': `<form style="max-width:320px;display:flex;flex-direction:column;gap:.75rem" data-required>
  <label>
    <span>Name</span>
    <input type="text" required placeholder="Your name">
  </label>
  <label>
    <span>Email</span>
    <input type="email" required placeholder="you@example.com">
  </label>
  <nav class="form-actions">
    <button type="submit" class="btn-primary">Submit</button>
    <button type="reset" class="btn-ghost">Reset</button>
  </nav>
</form>`,
  'navigation': `<nav>
  <a href="#" class="active">Home</a>
  <a href="#">Components</a>
  <a href="#">Tokens</a>
  <a href="#">Guides</a>
</nav>`,
};

function generatePrimitivePage(primitive) {
  const { id, name, description, selectors, category } = primitive;
  const selectorList = (selectors || []).map((s) => `- \`${s}\``).join('\n');
  const demoHtml = PRIMITIVE_DEMOS[id];
  const liveBlock = demoHtml ? makeLiveBlock(demoHtml, '180px') : '';

  return `---
title: "${escapeYaml(name)}"
description: "${escapeYaml(description)}"
---

${liveBlock}${description ? description + '\n\n' : ''}## Selectors

${selectorList || '_No selectors defined._'}

## Category

\`${category || 'primitive'}\`
`;
}

// ─── Enhancement pages (.mdx — include live examples) ─────────────────────────

// Interactive overrides for enhancements whose metadata demoHtml shows a static end-state.
// Key = selector string from enhancements.json.
const ENHANCEMENT_DEMOS = {
  "button, a[class*='btn-']": {
    html: `<div class="flex gap-sm">
  <button class="btn-primary" id="demo-btn">
    <span>Save changes</span>
  </button>
  <button class="btn-secondary" onclick="document.getElementById('demo-btn').classList.remove('btn-working')">Reset</button>
</div>`,
    js: `document.getElementById('demo-btn').addEventListener('click', function() {
  this.classList.add('btn-working');
});`,
  },
};

function generateEnhancementPage(enhancer) {
  const { selector, description, demoHtml, attributes } = enhancer;
  const attrRows = (attributes || []).map(
    (a) => `| \`${escapeTableCell(typeof a === 'string' ? a : a.name)}\` | ${typeof a === 'object' ? escapeTableCell(a.description) : ''} |`
  ).join('\n');

  const override = ENHANCEMENT_DEMOS[selector];
  const liveHtml = override ? override.html : demoHtml;
  const liveOpts = override ? { js: override.js || '' } : {};
  const liveBlock = liveHtml ? makeLiveBlock(liveHtml, '120px', liveOpts) : '';

  return `---
title: "${escapeYaml(selector)}"
description: "${escapeYaml(description)}"
---

${liveBlock}${description ? description + '\n' : ''}

## Selector

\`${selector}\`

${demoHtml ? `## Source

\`\`\`html
${demoHtml}
\`\`\`
` : ''}${attrRows ? `## Attributes

| Name | Description |
|------|-------------|
${attrRows}
` : ''}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📄 Generating Starlight pages from docs-data...');

  // Components
  const components = loadJson('components.json');
  const compDir = path.join(CONTENT_DIR, 'components');
  ensureDir(compDir);
  for (const component of components) {
    const filePath = path.join(compDir, `${component.tagName}.md`);
    fs.writeFileSync(filePath, generateComponentPage(component));
  }
  console.log(`  ✅ ${components.length} component pages → src/content/docs/components/`);

  // Tokens
  const tokens = loadJson('tokens.json');
  const tokenDir = path.join(CONTENT_DIR, 'tokens');
  ensureDir(tokenDir);
  for (const [group, groupTokens] of Object.entries(tokens)) {
    const filePath = path.join(tokenDir, `${slugify(group)}.md`);
    fs.writeFileSync(filePath, generateTokenPage(group, groupTokens));
  }
  console.log(`  ✅ ${Object.keys(tokens).length} token pages → src/content/docs/tokens/`);

  // Primitives
  const primitives = loadJson('primitives.json');
  const primDir = path.join(CONTENT_DIR, 'primitives');
  ensureDir(primDir);
  for (const primitive of primitives) {
    const slug = slugify(primitive.id || primitive.name);
    const filePath = path.join(primDir, `${slug}.md`);
    fs.writeFileSync(filePath, generatePrimitivePage(primitive));
  }
  console.log(`  ✅ ${primitives.length} primitive pages → src/content/docs/primitives/`);

  // Enhancements
  const enhancements = loadJson('enhancements.json');
  const enhDir = path.join(CONTENT_DIR, 'enhancements');
  ensureDir(enhDir);
  for (const enhancer of enhancements) {
    const slug = slugify(enhancer.selector);
    const filePath = path.join(enhDir, `${slug}.md`);
    fs.writeFileSync(filePath, generateEnhancementPage(enhancer));
  }
  console.log(`  ✅ ${enhancements.length} enhancement pages → src/content/docs/enhancements/`);

  console.log('📄 Page generation complete.');
}

main().catch((err) => {
  console.error('❌ generate-pages failed:', err.message);
  process.exit(1);
});
