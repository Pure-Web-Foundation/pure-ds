const SHIKI_CDN_URL = 'https://esm.sh/shiki@1.0.0';

let shikiModulePromise = null;

async function loadShikiModule() {
  if (shikiModulePromise) return shikiModulePromise;

  shikiModulePromise = import(SHIKI_CDN_URL).catch((error) => {
    shikiModulePromise = null;
    throw error;
  });

  return shikiModulePromise;
}

export async function getHighlighter(options) {
  const shiki = await loadShikiModule();
  return shiki.getHighlighter(options);
}

export async function codeToHtml(code, options) {
  const shiki = await loadShikiModule();
  if (typeof shiki.codeToHtml === 'function') {
    return shiki.codeToHtml(code, options);
  }

  const highlighter = await shiki.getHighlighter({
    themes: [options?.theme || 'github-dark'],
    langs: [options?.lang || 'html']
  });
  return highlighter.codeToHtml(code, options);
}
