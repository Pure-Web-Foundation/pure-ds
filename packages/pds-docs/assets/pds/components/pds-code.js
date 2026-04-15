const SHIKI_CDN_URL = 'https://esm.sh/shiki@1.0.0';

const SHIKI_LANGS = ['html', 'css', 'javascript', 'typescript', 'json', 'bash', 'shell'];
const SHIKI_THEMES = ['github-dark', 'github-light'];

let shikiModulePromise = null;
let highlighterPromise = null;

const escapeHtml = (text) => {
  if (text == null) return '';
  const value = typeof text === 'string' ? text : String(text);
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const resolveTheme = (preferredTheme) => {
  if (preferredTheme === 'github-dark' || preferredTheme === 'github-light') {
    return preferredTheme;
  }

  const docTheme = document.documentElement.getAttribute('data-theme')
    || document.body?.getAttribute('data-theme');

  if (docTheme === 'dark') return 'github-dark';
  if (docTheme === 'light') return 'github-light';

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? 'github-dark' : 'github-light';
};

const resolveLang = (lang) => {
  const next = String(lang || 'html').trim().toLowerCase();
  if (next === 'js') return 'javascript';
  if (next === 'ts') return 'typescript';
  if (next === 'sh') return 'shell';
  return next;
};

async function loadShikiModule() {
  if (shikiModulePromise) return shikiModulePromise;

  shikiModulePromise = (async () => {
    try {
      return await import('#shiki');
    } catch {
      return import(SHIKI_CDN_URL);
    }
  })();

  return shikiModulePromise;
}

async function loadHighlighter() {
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = (async () => {
    try {
      const shiki = await loadShikiModule();
      if (typeof shiki?.getHighlighter !== 'function') return null;
      return shiki.getHighlighter({ themes: SHIKI_THEMES, langs: SHIKI_LANGS });
    } catch {
      return null;
    }
  })();

  return highlighterPromise;
}

export class PDSCode extends HTMLElement {
  static get observedAttributes() {
    return ['code', 'lang', 'theme'];
  }

  constructor() {
    super();
    this._code = null;
    this._capturedInitialText = false;
    this._renderToken = 0;
    this._textObserver = null;
  }

  connectedCallback() {
    this.captureInitialText();
    this.startTextObserver();
    this.render();

    queueMicrotask(() => {
      if (!this.isConnected || this.hasAttribute('code')) return;
      if (this.ensureCodeFromContent()) {
        this.render();
      }
    });
  }

  disconnectedCallback() {
    this.stopTextObserver();
  }

  attributeChangedCallback() {
    this.render();
  }

  set code(value) {
    this._code = value == null ? '' : String(value);
    this.render();
  }

  get code() {
    if (this._code != null) return this._code;
    if (this.hasAttribute('code')) return this.getAttribute('code') || '';
    return '';
  }

  setCode(value, { lang, theme } = {}) {
    this.code = value;
    if (lang) this.setAttribute('lang', lang);
    if (theme) this.setAttribute('theme', theme);
  }

  captureInitialText() {
    if (this._capturedInitialText || this._code != null || this.hasAttribute('code')) {
      return;
    }

    this._code = this.textContent || '';
    this._capturedInitialText = true;
  }

  ensureCodeFromContent() {
    if (this.hasAttribute('code')) return false;
    if (this._code && this._code.trim()) return false;

    const text = this.textContent || '';
    if (!text.trim()) return false;

    this._code = text;
    this._capturedInitialText = true;
    return true;
  }

  startTextObserver() {
    if (this._textObserver || this.hasAttribute('code')) return;

    this._textObserver = new MutationObserver(() => {
      if (!this.isConnected || this.hasAttribute('code')) return;
      if (this.ensureCodeFromContent()) {
        this.render();
      }
    });

    this._textObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  stopTextObserver() {
    if (!this._textObserver) return;
    this._textObserver.disconnect();
    this._textObserver = null;
  }

  async render() {
    const renderToken = ++this._renderToken;
    if (this.ensureCodeFromContent()) {
      this.stopTextObserver();
    }

    const sourceCode = this.code;
    const lang = resolveLang(this.getAttribute('lang') || 'html');
    const theme = resolveTheme(this.getAttribute('theme'));

    if (!sourceCode) {
      return;
    }

    const highlighter = await loadHighlighter();

    if (renderToken !== this._renderToken) {
      return;
    }

    if (highlighter) {
      try {
        this.innerHTML = highlighter.codeToHtml(sourceCode, { lang, theme });
        return;
      } catch {
        // Fall through to escaped pre/code fallback
      }
    }

    this.innerHTML = `<pre><code>${escapeHtml(sourceCode)}</code></pre>`;
  }
}

if (!customElements.get('pds-code')) {
  customElements.define('pds-code', PDSCode);
}
