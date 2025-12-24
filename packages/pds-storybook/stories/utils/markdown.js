/**
 * Markdown renderer with Shiki syntax highlighting
 * Converts markdown to HTML with properly highlighted code blocks
 */

import Showdown from 'showdown';
import { loadShiki, highlight, getCurrentTheme, escapeHtml, preloadShiki } from '../../.storybook/shiki.js';

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
  let html = baseConverter.makeHtml(markdown);
  
  // Find all code blocks and highlight them with Shiki
  const codeBlockRegex = /<pre><code class="([^"]*)">([\s\S]*?)<\/code><\/pre>/g;
  const codeBlocksToHighlight = [];
  let match;
  
  while ((match = codeBlockRegex.exec(html)) !== null) {
    const langClass = match[1]; // e.g., "html language-html" or "js language-js"
    const code = match[2];
    const lang = langClass.split(/\s+/).find(c => c.startsWith('language-'))?.replace('language-', '') || 
                 langClass.split(/\s+/)[0] || 
                 'text';
    
    codeBlocksToHighlight.push({
      original: match[0],
      code: decodeHtmlEntities(code),
      lang
    });
  }
  
  // Also handle plain code blocks without language class
  const plainCodeBlockRegex = /<pre><code>([\s\S]*?)<\/code><\/pre>/g;
  while ((match = plainCodeBlockRegex.exec(html)) !== null) {
    const code = match[1];
    codeBlocksToHighlight.push({
      original: match[0],
      code: decodeHtmlEntities(code),
      lang: 'text'
    });
  }
  
  // Highlight all code blocks
  const theme = getCurrentTheme();
  for (const block of codeBlocksToHighlight) {
    const highlighted = await highlight(block.code, block.lang, theme);
    html = html.replace(block.original, highlighted);
  }
  
  return html;
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
