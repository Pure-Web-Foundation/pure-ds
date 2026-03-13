/**
 * Shared Shiki syntax highlighter for PDS Storybook stories
 * Provides consistent code highlighting across all stories
 * 
 * This file is located within the stories folder so it remains available
 * when stories are copied or cached to other locations.
 */

let shikiInstance = null;
let shikiLoading = false;
let shikiLoadPromise = null;

export const SHIKI_CODE_THEME = Object.freeze({
  fontFamily: "'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: '13.6px',
  lineHeight: '24px',
  tabSize: '2',
});

const SHIKI_STYLE_ID = 'pds-storybook-shiki-shared-styles';

const SHIKI_SHARED_STYLE = `
  :root {
    --pds-shiki-font-family: ${SHIKI_CODE_THEME.fontFamily};
    --pds-shiki-font-size: ${SHIKI_CODE_THEME.fontSize};
    --pds-shiki-line-height: ${SHIKI_CODE_THEME.lineHeight};
    --pds-shiki-tab-size: ${SHIKI_CODE_THEME.tabSize};
  }

  .shiki,
  .shiki code,
  .pds-shiki-fallback,
  .pds-shiki-fallback code,
  pds-code pre,
  pds-code code,
  .docblock-source pre,
  .docblock-source code,
  .sbdocs pre,
  .sbdocs code,
  .html-source-content pre,
  .html-source-content code {
    font-family: var(--pds-shiki-font-family) !important;
    font-size: var(--pds-shiki-font-size) !important;
    line-height: var(--pds-shiki-line-height) !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
    font-variant-ligatures: none;
    tab-size: var(--pds-shiki-tab-size);
  }

  .shiki,
  .pds-shiki-fallback {
    margin: 0;
    overflow-x: auto;
  }
`;

const LANGUAGE_ALIASES = Object.freeze({
  js: 'javascript',
  ts: 'typescript',
  sh: 'shell',
});

export function ensureSharedShikiStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SHIKI_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = SHIKI_STYLE_ID;
  style.textContent = SHIKI_SHARED_STYLE;
  document.head.append(style);
}

function normalizeLang(lang = 'html') {
  const nextLang = String(lang || 'html').trim().toLowerCase();
  return LANGUAGE_ALIASES[nextLang] || nextLang;
}

function normalizeTheme(theme = 'github-dark') {
  if (theme === 'github-dark' || theme === 'github-light') {
    return theme;
  }
  return getCurrentTheme();
}

function decorateShikiMarkup(markup = '', theme = 'github-dark') {
  if (typeof markup !== 'string' || !markup.trim()) {
    return markup;
  }

  return markup.replace(
    /<pre class="([^"]*\bshiki\b[^"]*)"([^>]*)>/,
    `<pre class="$1 pds-shiki-block" data-pds-shiki="true" data-theme="${theme}"$2>`
  );
}

/**
 * Load and initialize Shiki highlighter
 * @returns {Promise<import('shiki').Highlighter|null>}
 */
export async function loadShiki() {
  if (typeof window === 'undefined') {
    return null;
  }

  ensureSharedShikiStyles();

  if (shikiInstance) return shikiInstance;
  
  if (shikiLoading) {
    return shikiLoadPromise;
  }

  shikiLoading = true;
  shikiLoadPromise = (async () => {
    try {
      let shiki;
      try {
        shiki = await import('#shiki');
      } catch {
        shiki = await import(/* @vite-ignore */ 'https://esm.sh/shiki@1.0.0');
      }
      shikiInstance = await shiki.getHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['html', 'css', 'javascript', 'typescript', 'json', 'bash', 'shell']
      });
      return shikiInstance;
    } catch (error) {
      console.error('Failed to load Shiki:', error);
      return null;
    } finally {
      shikiLoading = false;
    }
  })();

  return shikiLoadPromise;
}

/**
 * Highlight code with Shiki
 * @param {string} code - The code to highlight
 * @param {string} lang - The language (html, css, js, json, etc.)
 * @param {string} theme - The theme to use (github-dark or github-light)
 * @returns {Promise<string>} - Highlighted HTML
 */
export async function highlight(code, lang = 'html', theme = 'github-dark') {
  ensureSharedShikiStyles();

  const highlighter = await loadShiki();
  const resolvedTheme = normalizeTheme(theme);
  const resolvedLang = normalizeLang(lang);
  
  if (!highlighter) {
    return `<pre class="pds-shiki-fallback"><code>${escapeHtml(code)}</code></pre>`;
  }

  try {
    const markup = highlighter.codeToHtml(code, {
      lang: resolvedLang,
      theme: resolvedTheme
    });
    return decorateShikiMarkup(markup, resolvedTheme);
  } catch (error) {
    console.error('Shiki highlighting failed:', error);
    return `<pre class="pds-shiki-fallback"><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Get the current theme based on document/storybook theme
 * @returns {string}
 */
export function getCurrentTheme() {
  if (typeof document === 'undefined') return 'github-dark';

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                 document.body?.classList.contains('dark') ||
                 window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return isDark ? 'github-dark' : 'github-light';
}

/**
 * Escape HTML special characters
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
  if (text == null) return '';
  if (typeof text !== 'string') text = String(text);
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Pre-load Shiki in the background for faster first highlight
 */
export function preloadShiki() {
  ensureSharedShikiStyles();
  loadShiki();
}

/**
 * Render code into a target using the pds-code custom element.
 * Falls back to escaped <pre><code> output if element registration fails.
 * @param {Element|null} target
 * @param {string} code
 * @param {string} lang
 * @param {string} [theme]
 * @returns {Promise<Element|null>}
 */
export async function renderCodeBlock(target, code, lang = 'html', theme = getCurrentTheme()) {
  ensureSharedShikiStyles();

  if (!target) return null;

  let codeEl;
  if (target.matches?.('pds-code')) {
    codeEl = target;
  } else {
    codeEl = document.createElement('pds-code');
    target.replaceChildren(codeEl);
  }

  codeEl.setAttribute('lang', normalizeLang(lang));
  if (theme) codeEl.setAttribute('theme', normalizeTheme(theme));

  try {
    codeEl.code = code;
  } catch {
    codeEl.innerHTML = `<pre class="pds-shiki-fallback"><code>${escapeHtml(code)}</code></pre>`;
  }

  return codeEl;
}
