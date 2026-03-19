import React from 'react';
import { Title, Subtitle, Description, Stories } from '@storybook/blocks';
import pdsTypeSource from '@pds-src/js/pds.d.ts?raw';
import { getCurrentTheme, preloadShiki, renderCodeBlock } from '../utils/shiki.js';
import {
  PDS_CONFIG_RELATIONS,
  PDS_DESIGN_CONFIG_SPEC
} from '@pds-src/js/pds-core/pds-config.js';

preloadShiki();

const DOC_STYLE_ID = 'pds-runtime-object-docs-styles';
const DOC_STYLE_CONTENT = `
  .pds-object-docs-wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pds-object-docs-section {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pds-object-docs-section h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .pds-object-docs-section p {
    margin: 0;
    line-height: 1.5;
  }

  .pds-object-docs-muted {
    color: #666;
    font-size: 14px;
  }

  .pds-object-docs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .pds-object-docs-table th,
  .pds-object-docs-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
    vertical-align: top;
  }

  .pds-object-docs-table th {
    background: #f5f5f5;
    font-weight: 600;
    white-space: nowrap;
  }

  .pds-object-docs-table td:first-child {
    font-family: var(--pds-shiki-font-family, 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
    white-space: nowrap;
  }

  .pds-object-docs-code {
    margin: 0;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
    overflow: auto;
    font-size: var(--pds-shiki-font-size, 13.6px);
    line-height: var(--pds-shiki-line-height, 24px);
  }

  .pds-object-docs-code code {
    font-family: var(--pds-shiki-font-family, 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
  }

  .pds-object-docs-details {
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    background: #fcfcfc;
  }

  .pds-object-docs-details > summary {
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    padding: 10px 12px;
    border-bottom: 1px solid transparent;
  }

  .pds-object-docs-details[open] > summary {
    border-bottom-color: #e6e6e6;
  }

  .pds-object-docs-details > summary::-webkit-details-marker {
    display: none;
  }

  .pds-object-docs-details-body {
    padding: 12px;
  }
`;

function ensureDocStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(DOC_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = DOC_STYLE_ID;
  style.textContent = DOC_STYLE_CONTENT;
  document.head.append(style);
}

if (typeof document !== 'undefined') {
  ensureDocStyles();
}

const escapeHTML = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const toLines = (source) => String(source || '').split(/\r?\n/);

function extractBlockByMarker(source, marker, endMatcher) {
  const lines = toLines(source);
  const startIndex = lines.findIndex((line) => line.includes(marker));
  if (startIndex < 0) return null;

  const output = [];
  for (let i = startIndex; i < lines.length; i += 1) {
    output.push(lines[i]);
    if (endMatcher(lines[i], i, lines)) {
      break;
    }
  }

  return output.join('\n').trim();
}

function extractInterfaceBlock(source, interfaceName) {
  const lines = toLines(source);
  const startIndex = lines.findIndex((line) => line.includes(interfaceName));
  if (startIndex < 0) return null;

  let braceBalance = 0;
  let sawOpeningBrace = false;
  const output = [];

  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i];
    output.push(line);

    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;

    if (opens > 0) {
      sawOpeningBrace = true;
    }

    braceBalance += opens;
    braceBalance -= closes;

    if (sawOpeningBrace && braceBalance <= 0 && i > startIndex) {
      break;
    }
  }

  return output.join('\n').trim();
}

const startSignature =
  extractBlockByMarker(
    pdsTypeSource,
    'static start(config?: {',
    (line) => line.includes('}): Promise<PDS>;')
  ) ||
  `static start(config?: PDSInitConfig): Promise<PDS>;`;

const toastSignature =
  extractBlockByMarker(
    pdsTypeSource,
    'static toast: {',
    (line) => /^\s*};\s*$/.test(line)
  ) ||
  `static toast(message: string, options?: ToastOptions): Promise<string>;`;

const askSignature =
  extractBlockByMarker(
    pdsTypeSource,
    'static ask(message:',
    (line) => /Promise<any>;\s*$/.test(line)
  ) ||
  `static ask(message: AskMessage, options?: AskOptions): Promise<any>;`;

const initTypeAlias =
  extractBlockByMarker(
    pdsTypeSource,
    'export type PDSInitConfig =',
    (line) => /;\s*$/.test(line)
  ) ||
  `export type PDSInitConfig = import('./pds-core/pds-config.js').PDSInitConfig;`;

const eventMapSignature =
  extractInterfaceBlock(pdsTypeSource, 'export interface PDSEventMap') ||
  `export interface PDSEventMap { 'pds:ready': CustomEvent<any>; }`;

const runtimeSurfaceRows = [
  {
    member: 'PDS.start(config)',
    type: 'method',
    description: 'Primary entry point. Starts live/static mode and captures normalized current config.'
  },
  {
    member: 'PDS.ask(message, options)',
    type: 'method',
    description: 'Promise-based dialog helper for confirmations, prompts, and form flows.'
  },
  {
    member: 'PDS.toast(message, options)',
    type: 'method',
    description: 'Notification helper that ensures a toaster host exists before showing toasts.'
  },
  {
    member: 'PDS.parse(html | template)',
    type: 'method',
    description: 'Parses HTML strings or tagged templates into DOM nodes with support for Lit-like .prop, @event, ?boolean, and attr bindings.'
  },
  {
    member: 'PDS.adoptLayers(root, layers, sheets)',
    type: 'method',
    description: 'Adopts selected shared PDS layers plus optional local constructable stylesheets.'
  },
  {
    member: 'PDS.createStylesheet(css)',
    type: 'method',
    description: 'Creates constructable stylesheets for Shadow DOM composition patterns.'
  },
  {
    member: 'PDS.currentConfig',
    type: 'property',
    description: 'Readonly startup configuration after initialization.'
  },
  {
    member: 'PDS.compiled',
    type: 'property',
    description: 'Readonly compiled/merged runtime snapshot used by current session.'
  },
  {
    member: 'PDS.enums',
    type: 'property',
    description: 'Typed enum map consumed by config tools and runtime helpers.'
  },
  {
    member: 'PDS.defaultEnhancers',
    type: 'property',
    description: 'Default selector-based enhancement list used as a baseline in startup config.'
  }
];

const startOptionRows = [
  {
    option: 'mode',
    type: `'live' | 'static'`,
    notes: 'Runtime execution mode (default resolves to live).'
  },
  {
    option: 'preset',
    type: 'string',
    notes: 'Preset id to bootstrap generated design tokens and styles.'
  },
  {
    option: 'design',
    type: 'PDSDesignConfig',
    notes: 'Partial/complete design overrides merged with selected preset.'
  },
  {
    option: 'enhancers',
    type: 'PDSEnhancer[] | Record<string, PDSEnhancer>',
    notes: 'Override/extend runtime selector enhancers.'
  },
  {
    option: 'autoDefine',
    type: 'PDSAutoDefineConfig',
    notes: 'AutoDefiner behavior for lazy custom-element registration.'
  },
  {
    option: 'applyGlobalStyles',
    type: 'boolean',
    notes: 'Applies generated style layers to the global document when true.'
  },
  {
    option: 'manageTheme',
    type: 'boolean',
    notes: 'Enables theme preference management + persisted updates.'
  },
  {
    option: 'themeStorageKey',
    type: 'string',
    notes: 'Custom localStorage key for theme persistence.'
  },
  {
    option: 'preloadStyles',
    type: 'boolean',
    notes: 'Preloads style layers (primarily useful in live mode).' 
  },
  {
    option: 'criticalLayers',
    type: 'string[]',
    notes: 'Subset of layers to load early for first-paint optimization.'
  },
  {
    option: 'managerURL',
    type: 'string',
    notes: 'Override URL for live manager runtime module.'
  },
  {
    option: 'localization',
    type: 'PDSLocalizationConfig',
    notes: 'Localization provider/messages integration used by i18n helpers.'
  },
  {
    option: 'staticPaths',
    type: 'Record<string, string>',
    notes: 'Static mode layer path overrides.'
  }
];

function summarizeSpec(spec = {}) {
  if (!spec || typeof spec !== 'object') return 'any';

  if (Array.isArray(spec.oneOf) && spec.oneOf.length) {
    return spec.oneOf
      .map((entry) => (entry && Object.prototype.hasOwnProperty.call(entry, 'const') ? JSON.stringify(entry.const) : 'any'))
      .join(' | ');
  }

  if (spec.type === 'array') {
    const itemType = spec.items?.type || 'any';
    return `${itemType}[]`;
  }

  if (spec.type === 'object') {
    return 'object';
  }

  return spec.type || 'any';
}

const designPropertyRows = Object.entries(PDS_DESIGN_CONFIG_SPEC?.properties || {})
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, spec]) => ({
    path: `design.${path}`,
    type: summarizeSpec(spec),
    notes: spec?.description || ''
  }));

function summarizeRelation(relation = {}) {
  if (!relation || typeof relation !== 'object') return '-';

  const segments = [];
  if (Array.isArray(relation.tokens) && relation.tokens.length) {
    segments.push(`tokens: ${relation.tokens.join(', ')}`);
  }
  if (Array.isArray(relation.theme) && relation.theme.length) {
    segments.push(`theme: ${relation.theme.join(', ')}`);
  }
  if (Array.isArray(relation.rules) && relation.rules.length) {
    segments.push(`rules: ${relation.rules.join(', ')}`);
  }

  return segments.length ? segments.join(' | ') : '-';
}

const configRelationRows = Object.entries(PDS_CONFIG_RELATIONS || {})
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, relation]) => ({
    path,
    impacts: summarizeRelation(relation)
  }));

function renderTable(rows, columns) {
  const head = columns
    .map((column) => `<th>${escapeHTML(column.label)}</th>`)
    .join('');

  const body = rows
    .map((row) => {
      const cells = columns
        .map((column) => `<td>${escapeHTML(row[column.key] ?? '')}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  return `
    <table class="pds-object-docs-table">
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

const pdsObjectDocsHtml = `
  <section class="pds-object-docs-section">
    <h3>PDS Runtime API</h3>
    <p class="pds-object-docs-muted">
      This page documents the shared <code>PDS</code> runtime object using source-of-truth typings from
      <code>src/js/pds.d.ts</code> and deterministic config mappings from <code>src/js/pds-core/pds-config.js</code>.
    </p>
    ${renderTable(runtimeSurfaceRows, [
      { key: 'member', label: 'Member' },
      { key: 'type', label: 'Kind' },
      { key: 'description', label: 'Description' }
    ])}
  </section>

  <section class="pds-object-docs-section">
    <h3>PDS.start() Config Surface</h3>
    <p class="pds-object-docs-muted">
      Runtime init options accepted by <code>PDS.start()</code> (live/static startup entry point).
    </p>
    ${renderTable(startOptionRows, [
      { key: 'option', label: 'Option' },
      { key: 'type', label: 'Type' },
      { key: 'notes', label: 'Notes' }
    ])}
  </section>

  <section class="pds-object-docs-section">
    <h3>Design Config Structure</h3>
    <p class="pds-object-docs-muted">
      Top-level shape under <code>config.design</code> from <code>PDS_DESIGN_CONFIG_SPEC</code>.
    </p>
    ${renderTable(designPropertyRows, [
      { key: 'path', label: 'Path' },
      { key: 'type', label: 'Type' },
      { key: 'notes', label: 'Notes' }
    ])}
  </section>

  <section class="pds-object-docs-section">
    <h3>Config Relations</h3>
    <p class="pds-object-docs-muted">
      Deterministic mapping from design config paths to generated token/theme/rule outputs.
    </p>
    ${renderTable(configRelationRows, [
      { key: 'path', label: 'Design Path' },
      { key: 'impacts', label: 'Generated Impacts' }
    ])}
  </section>

  <section class="pds-object-docs-section">
    <h3>Typed Signatures (Extracted)</h3>

    <details class="pds-object-docs-details" open>
      <summary><code>PDS.start()</code> signature</summary>
      <div class="pds-object-docs-details-body">
        <div class="pds-object-docs-code" data-shiki-lang="typescript">${escapeHTML(startSignature)}</div>
      </div>
    </details>

    <details class="pds-object-docs-details">
      <summary><code>PDS.ask()</code> signature</summary>
      <div class="pds-object-docs-details-body">
        <div class="pds-object-docs-code" data-shiki-lang="typescript">${escapeHTML(askSignature)}</div>
      </div>
    </details>

    <details class="pds-object-docs-details">
      <summary><code>PDS.toast()</code> signature</summary>
      <div class="pds-object-docs-details-body">
        <div class="pds-object-docs-code" data-shiki-lang="typescript">${escapeHTML(toastSignature)}</div>
      </div>
    </details>

    <details class="pds-object-docs-details">
      <summary><code>PDSInitConfig</code> type alias</summary>
      <div class="pds-object-docs-details-body">
        <div class="pds-object-docs-code" data-shiki-lang="typescript">${escapeHTML(initTypeAlias)}</div>
      </div>
    </details>

    <details class="pds-object-docs-details">
      <summary><code>PDSEventMap</code> events</summary>
      <div class="pds-object-docs-details-body">
        <div class="pds-object-docs-code" data-shiki-lang="typescript">${escapeHTML(eventMapSignature)}</div>
      </div>
    </details>
  </section>
`;

const SHIKI_BLOCK_SELECTOR = '.pds-object-docs-code[data-shiki-lang]';

async function applyShikiHighlights(root) {
  if (!root) return;

  const blocks = Array.from(root.querySelectorAll(SHIKI_BLOCK_SELECTOR));
  if (!blocks.length) return;

  const theme = getCurrentTheme();

  for (const block of blocks) {
    const source = block.dataset.shikiSource || (block.textContent || '').trim();
    if (!source) continue;

    block.dataset.shikiSource = source;
    const lang = block.dataset.shikiLang || 'typescript';
    await renderCodeBlock(block, source, lang, theme);
  }
}

export function createPDSObjectDocsPage(options = {}) {
  const { hideStories = false } = options;

  return function PDSObjectDocsPage() {
    ensureDocStyles();

    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
      let disposed = false;

      const run = async () => {
        if (disposed) return;
        await applyShikiHighlights(wrapperRef.current);
      };

      void run();

      if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') {
        return () => {
          disposed = true;
        };
      }

      const observer = new MutationObserver(() => {
        void run();
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });

      if (document.body) {
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class']
        });
      }

      return () => {
        disposed = true;
        observer.disconnect();
      };
    }, []);

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Title, null),
      React.createElement(Subtitle, null),
      React.createElement(Description, null),
      React.createElement('div', {
        ref: wrapperRef,
        className: 'pds-object-docs-wrapper',
        dangerouslySetInnerHTML: { __html: pdsObjectDocsHtml }
      }),
      hideStories ? null : React.createElement(Stories, { includePrimary: false })
    );
  };
}
