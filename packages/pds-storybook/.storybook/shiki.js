/**
 * Shared Shiki syntax highlighter for PDS Storybook
 * Provides consistent code highlighting across all stories and previews
 */

let shikiInstance = null;
let shikiLoading = false;
let shikiLoadPromise = null;

/**
 * Load and initialize Shiki highlighter
 * @returns {Promise<import('shiki').Highlighter|null>}
 */
export async function loadShiki() {
  if (shikiInstance) return shikiInstance;
  
  if (shikiLoading) {
    return shikiLoadPromise;
  }

  shikiLoading = true;
  shikiLoadPromise = (async () => {
    try {
      const shiki = await import('https://esm.sh/shiki@1.0.0');
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
  const highlighter = await loadShiki();
  
  if (!highlighter) {
    return escapeHtml(code);
  }

  try {
    // Map common aliases
    const langMap = {
      'js': 'javascript',
      'ts': 'typescript',
      'sh': 'shell'
    };
    const resolvedLang = langMap[lang] || lang;

    const html = highlighter.codeToHtml(code, {
      lang: resolvedLang,
      theme
    });
    return html;
  } catch (error) {
    console.error('Shiki highlighting failed:', error);
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Get the current theme based on document/storybook theme
 * @returns {string}
 */
export function getCurrentTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                 document.body.classList.contains('dark') ||
                 window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'github-dark' : 'github-light';
}

/**
 * Escape HTML special characters
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
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
  loadShiki();
}
