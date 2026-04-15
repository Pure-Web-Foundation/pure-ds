/**
 * PDS Playground — Monaco editor + pds-render integration
 * Loaded as a classic (non-module) script from public/assets/ so that
 * Monaco's AMD require() global (from loader.js) is available here.
 * Data is passed in from Astro via <script type="application/json" id="pg-data">.
 */

// ─── Bootstrap: read Astro server data ───────────────────────────────────────
const { STARTER_HTML, STARTER_CSS, STARTER_JS, PRESETS } =
  JSON.parse(document.getElementById('pg-data').textContent);

// ─── State ────────────────────────────────────────────────────────────────────
const code = {
  html: sessionStorage.getItem('pg-html') ?? STARTER_HTML,
  css:  sessionStorage.getItem('pg-css')  ?? STARTER_CSS,
  js:   sessionStorage.getItem('pg-js')   ?? STARTER_JS,
};
let activeTab = 'html';
let theme = 'light';
let preset = 'default';
let monacoReady = false;
let editors = {};   // { html, css, js } → Monaco IEditor instances
let debounceTimer;

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const renderer    = document.getElementById('pg-render');
const presetSel   = document.getElementById('pg-preset');
const themeBtn    = document.getElementById('pg-theme-btn');
const resetBtn    = document.getElementById('pg-reset');
const copyBtn     = document.getElementById('pg-copy');
const shareBtn    = document.getElementById('pg-share');
const msgEl       = document.getElementById('pg-msg');
const charsEl     = document.getElementById('pg-chars');
const tabIndEl    = document.getElementById('pg-tab-indicator');
const presetBadge = document.getElementById('pg-preset-badge');
const tabs        = document.querySelectorAll('.pg-tab');

// ─── Message helpers ──────────────────────────────────────────────────────────
function setMsg(text, type = 'ok') {
  msgEl.textContent = text;
  msgEl.className = type === 'ok' ? '' : type;
}

function updateChars() {
  charsEl.textContent = `${editors[activeTab]?.getValue()?.length ?? 0} chars`;
}

// ─── Tab switching ────────────────────────────────────────────────────────────
function switchTab(lang) {
  activeTab = lang;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.lang === lang));
  tabIndEl.textContent = lang.toUpperCase();
  if (monacoReady) {
    Object.entries(editors).forEach(([l, ed]) => {
      ed.getDomNode().parentElement.style.display = l === lang ? 'block' : 'none';
    });
    editors[lang]?.focus();
    updateChars();
  }
}

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.lang)));

// ─── Load from shared URL (before Monaco, so editors get correct initial values)
const urlCode = new URLSearchParams(location.search).get('code');
if (urlCode) {
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(urlCode)));
    if (parsed.html) code.html = parsed.html;
    if (parsed.css)  code.css  = parsed.css;
    if (parsed.js)   code.js   = parsed.js;
  } catch {}
}

// ─── Monaco setup ─────────────────────────────────────────────────────────────
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' } });

require(['vs/editor/editor.main'], () => {
  monacoReady = true;
  const container = document.getElementById('pg-monaco');

  const commonOptions = {
    theme: 'vs-dark',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "'Cascadia Code', 'Fira Code', Consolas, monospace",
    fontLigatures: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    automaticLayout: true,
    padding: { top: 12 },
    scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
    bracketPairColorization: { enabled: true },
    renderLineHighlight: 'gutter',
  };

  function makeEditorDiv(lang, value) {
    const div = document.createElement('div');
    div.style.cssText = `width:100%;height:100%;display:${lang === 'html' ? 'block' : 'none'};`;
    container.appendChild(div);
    const ed = monaco.editor.create(div, {
      ...commonOptions,
      value,
      language: lang === 'js' ? 'javascript' : lang,
    });
    ed.onDidChangeModelContent(() => {
      code[lang] = ed.getValue();
      sessionStorage.setItem(`pg-${lang}`, code[lang]);
      updateChars();
      scheduleUpdate(lang);
    });
    return ed;
  }

  editors.html = makeEditorDiv('html', code.html);
  editors.css  = makeEditorDiv('css',  code.css);
  editors.js   = makeEditorDiv('js',   code.js);

  editors.html.focus();
  updateChars();
  // pds-render.js is type="module" (deferred). whenDefined resolves after
  // connectedCallback runs (element already in DOM), so _ready=true and the
  // setters trigger _buildSrcdoc() with actual content.
  customElements.whenDefined('pds-render').then(() => applyToRenderer());
});

// ─── Renderer communication ───────────────────────────────────────────────────
function applyToRenderer(changedLang = null) {
  if (!renderer) return;
  if (changedLang === 'html') {
    renderer.html = code.html;
  } else if (changedLang === 'css') {
    renderer.css = code.css;
  } else {
    // JS change or full apply - batch through the public API and reload once.
    renderer.setContent({
      html: code.html,
      css: code.css,
      js: code.js,
    }, { reload: true });
  }
}

function scheduleUpdate(lang) {
  clearTimeout(debounceTimer);
  setMsg('Updating…', 'warn');
  debounceTimer = setTimeout(() => {
    applyToRenderer(lang);
    setMsg('Updated ✓');
  }, lang === 'js' ? 600 : 250);
}

// ─── Controls ────────────────────────────────────────────────────────────────
renderer.addEventListener('pds-render-ready', () => setMsg('Ready'));
renderer.addEventListener('pds-render-error', e => setMsg('Error: ' + e.detail.error, 'err'));

themeBtn.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  renderer.setAttribute('theme', theme);
  monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
});

presetSel.addEventListener('change', () => {
  preset = presetSel.value;
  presetBadge.textContent = preset;
  renderer.setAttribute('preset', preset);
  setMsg(`Preset: ${preset}`);
});

resetBtn.addEventListener('click', () => {
  if (!confirm('Reset all tabs to starter code?')) return;
  code.html = STARTER_HTML;
  code.css  = STARTER_CSS;
  code.js   = STARTER_JS;
  ['html', 'css', 'js'].forEach(l => {
    sessionStorage.removeItem(`pg-${l}`);
    editors[l]?.setValue(code[l]);
  });
  applyToRenderer();
  setMsg('Reset to starter');
});

copyBtn.addEventListener('click', async () => {
  const val = editors[activeTab]?.getValue() ?? code[activeTab];
  await navigator.clipboard.writeText(val);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
});

shareBtn.addEventListener('click', async () => {
  const payload = { html: code.html, css: code.css, js: code.js };
  const compressed = btoa(encodeURIComponent(JSON.stringify(payload)));
  const url = `${location.origin}/playground/?code=${compressed}`;
  await navigator.clipboard.writeText(url);
  shareBtn.textContent = 'Link copied!';
  setTimeout(() => { shareBtn.textContent = 'Share'; }, 2000);
});
