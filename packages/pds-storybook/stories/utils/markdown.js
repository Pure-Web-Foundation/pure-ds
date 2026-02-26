/**
 * Markdown renderer with Shiki syntax highlighting
 * Converts markdown to HTML with properly highlighted code blocks
 */

import Showdown from 'showdown';
import { loadShiki, highlight, getCurrentTheme, escapeHtml, preloadShiki } from './shiki.js';

// Pre-load Shiki in background
preloadShiki();

// Create base Showdown converter
const baseConverter = new Showdown.Converter({
  tables: true,
  strikethrough: true,
  tasklists: true,
  ghCodeBlocks: true,
  simplifiedAutoLink: true,
  emoji: true
});

/**
 * Convert markdown to HTML with Shiki-highlighted code blocks
 * @param {string} markdown - The markdown content
 * @returns {Promise<string>} - HTML with highlighted code
 */
export async function renderMarkdown(markdown) {
  // First pass: convert markdown to HTML
  const html = baseConverter.makeHtml(markdown);
  const container = document.createElement('div');
  container.innerHTML = html;

  const codeNodes = Array.from(container.querySelectorAll('pre > code'));
  const theme = getCurrentTheme();

  for (const codeNode of codeNodes) {
    const preNode = codeNode.parentElement;
    if (!preNode) continue;

    const classNames = Array.from(codeNode.classList || []);
    const languageClass = classNames.find((cls) => cls.startsWith('language-'));
    const fallbackClass = classNames[0];
    const lang = (languageClass ? languageClass.replace('language-', '') : fallbackClass) || 'text';
    const code = decodeHtmlEntities(codeNode.innerHTML || '');
    const highlighted = await highlight(code, lang, theme);

    preNode.outerHTML = highlighted;
  }

  return container.innerHTML;
}

/**
 * Decode HTML entities in code blocks
 */
function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Synchronous markdown conversion (without Shiki highlighting)
 * Use this when you don't need syntax highlighting or can't use async
 */
export function renderMarkdownSync(markdown) {
  return baseConverter.makeHtml(markdown);
}
