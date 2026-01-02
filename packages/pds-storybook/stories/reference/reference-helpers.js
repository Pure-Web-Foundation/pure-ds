import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import showdown from 'showdown';
import { highlight as shikiHighlight, escapeHtml as shikiEscapeHtml } from '../utils/shiki.js';

// Lazy-loaded storybook dependencies to avoid build-time import issues
let storybookAddons = null;
let storybookSelectStory = null;

async function getStorybookChannel() {
  if (storybookAddons === null) {
    try {
      const [{ addons }, { SELECT_STORY }] = await Promise.all([
        import('@storybook/preview-api'),
        import('@storybook/core-events')
      ]);
      storybookAddons = addons;
      storybookSelectStory = SELECT_STORY;
    } catch {
      storybookAddons = false;
      storybookSelectStory = null;
    }
  }
  return { addons: storybookAddons, SELECT_STORY: storybookSelectStory };
}

const REF_HELPER_STYLE_ID = 'pds-reference-helper-styles';
const REF_HELPER_STYLE_CONTENT = `
  .pds-reference-docs-pre {
    margin: 0;
    padding: var(--spacing-3);
  }
  /* Shiki code blocks */
  .pds-reference-docs-pre .shiki {
    background: transparent !important;
    margin: 0;
    padding: 0;
  }
`;

function ensureReferenceHelperStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(REF_HELPER_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = REF_HELPER_STYLE_ID;
  style.textContent = REF_HELPER_STYLE_CONTENT;
  document.head.append(style);
}

if (typeof document !== 'undefined') {
  ensureReferenceHelperStyles();
}

const markdown = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  ghCodeBlocks: true,
  simpleLineBreaks: true
});

export function renderMarkdown(text) {
  if (!text) return nothing;
  if (typeof text !== 'string') text = String(text);
  const htmlOutput = markdown.makeHtml(text);
  if (!htmlOutput || typeof htmlOutput !== 'string') return nothing;
  return unsafeHTML(htmlOutput);
}

export function renderCode(value) {
  if (!value) return html`<span class="text-muted">&#8212;</span>`;
  return html`<code>${value}</code>`;
}

export function renderDefault(value) {
  if (value === undefined || value === null || value === '') {
    return html`<span class="text-muted">&#8212;</span>`;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    const unwrapped = trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;
    return html`<code>${unwrapped}</code>`;
  }
  return html`<code>${String(value)}</code>`;
}

export function formatTimestamp(timestamp) {
  if (!timestamp) return '\u2014';
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (err) {
    return timestamp;
  }
}

const VOID_HTML_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const getStorySlug = (storyId) => {
  if (typeof storyId !== 'string') return undefined;
  const [slug] = storyId.split('--');
  return slug;
};

export async function navigateToStory(storyId, viewMode = 'story') {
  if (!storyId || typeof window === 'undefined') return false;

  let navigated = false;

  try {
    const { addons, SELECT_STORY } = await getStorybookChannel();
    if (addons && SELECT_STORY) {
      const channel = addons?.getChannel?.();
      if (channel?.emit) {
        channel.emit(SELECT_STORY, { storyId, viewMode });
        navigated = true;
      }
    }
  } catch (err) {
    console.warn('PDS reference docs: channel navigation failed', err);
  }

  try {
    window.parent?.postMessage(
      {
        source: 'pds-reference-docs',
        type: 'pds-related:navigate',
        storyId,
        viewMode
      },
      '*'
    );
  } catch (err) {
    console.warn('PDS reference docs: postMessage navigation failed', err);
  }

  if (navigated) return true;

  const slug = getStorySlug(storyId);
  const targetSearch = viewMode === 'docs' && slug
    ? `?path=/docs/${slug}--docs`
    : `?path=/story/${storyId}`;

  try {
    if (window.parent && window.parent !== window) {
      window.parent.location.search = targetSearch;
    } else {
      window.location.search = targetSearch;
    }
    return true;
  } catch (err) {
    console.warn('PDS reference docs: fallback navigation failed', err);
  }

  return false;
}

export function formatDemoHtml(html) {
  if (typeof html !== 'string') return '';
  const tokens = html.trim().split(/(<[^>]+>)/g).filter(Boolean);
  if (!tokens.length) return '';

  const indentUnit = '  ';
  let indent = 0;
  let formatted = '';

  for (const token of tokens) {
    const isTag = token.startsWith('<');
    if (!isTag) {
      const text = token.replace(/\s+/g, ' ').trim();
      if (text) {
        formatted += `${indentUnit.repeat(indent)}${text}\n`;
      }
      continue;
    }

    const isClosing = /^<\//.test(token);
    const tagNameMatch = token.match(/^<\/?\s*([a-zA-Z0-9-]+)/);
    const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
    const isVoid = VOID_HTML_ELEMENTS.has(tagName) || /\/\s*>$/.test(token);

    if (isClosing) {
      indent = Math.max(0, indent - 1);
    }

    formatted += `${indentUnit.repeat(indent)}${token.trim()}\n`;

    if (!isClosing && !isVoid) {
      indent += 1;
    }
  }

  return formatted.trimEnd();
}

export function escapeCodeFragment(text) {
  return shikiEscapeHtml(text);
}

/**
 * Highlight demo HTML using Shiki (async)
 * @param {string} html - Raw HTML string to highlight
 * @returns {Promise<string>} - Highlighted HTML
 */
export async function highlightDemoHtml(html) {
  if (!html) return '';
  return shikiHighlight(html, 'html', 'github-dark');
}

/**
 * Synchronous fallback for highlighting (escaped only, no colors)
 * Use highlightDemoHtml for proper Shiki highlighting
 * @param {string} code - Raw HTML string
 * @returns {string} - Escaped HTML in a pre/code block
 */
export function highlightDemoHtmlSync(code) {
  if (!code) return '';
  return `<pre><code>${shikiEscapeHtml(code)}</code></pre>`;
}

export function renderChipList(values = []) {
  if (!values.length) return nothing;
  return html`
    <div class="flex flex-wrap gap-xs">
      ${values.map((value) => html`<span class="badge">${value}</span>`)}
    </div>
  `;
}

export function formatTableValue(value) {
  if (value === undefined || value === null || value === '') {
    return html`<span class="text-muted">&#8212;</span>`;
  }

  if (Array.isArray(value)) {
    if (!value.length) return html`<span class="text-muted">&#8212;</span>`;
    return renderChipList(value.map((entry) => (typeof entry === 'object' ? JSON.stringify(entry) : entry)));
  }

  if (typeof value === 'object') {
    return html`
      <pre class="surface-subtle radius-lg text-sm overflow-auto pds-reference-docs-pre">
${JSON.stringify(value, null, 2)}
      </pre>
    `;
  }

  const text = String(value);
  if (/[<>&]/.test(text)) {
    // Only use unsafeHTML for strings that actually need HTML rendering
    return html`<span>${text}</span>`;
  }
  return html`${text}`;
}

export function renderTable(items = [], columns = []) {
  if (!items.length) return nothing;
  return html`
    <table class="table-bordered table-compact">
      <thead>
        <tr>
          ${columns.map((col) => html`<th scope="col">${col.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => html`
          <tr>
            ${columns.map((col) => html`<td>${col.render ? col.render(item[col.key], item) : formatTableValue(col.format ? col.format(item[col.key], item) : item[col.key])}</td>`)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
}
