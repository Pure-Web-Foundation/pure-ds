/**
 * HTML Preview and Copy Utility for Storybook
 * Provides HTML source viewing and copy functionality for all stories
 * Uses Shiki for syntax highlighting
 */

import { render as litRender } from 'lit';
import { highlight, getCurrentTheme, escapeHtml, preloadShiki } from './shiki.js';

// Pre-load Shiki in the background
preloadShiki();

/**
 * Format HTML string with proper indentation
 */
export function formatHTML(html) {
  if (!html) return '';
  
  let formatted = '';
  let indent = 0;
  const tab = '  ';
  
  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);
  
  tokens.forEach((token) => {
    if (token.startsWith('</')) {
      // Closing tag
      indent = Math.max(0, indent - 1);
      formatted += '\n' + tab.repeat(indent) + token;
    } else if (token.startsWith('<')) {
      // Opening tag
      const isSelfClosing = token.endsWith('/>') || token.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/);
      formatted += '\n' + tab.repeat(indent) + token;
      if (!isSelfClosing) {
        indent++;
      }
    } else if (token.trim()) {
      // Text content
      formatted += token.trim();
    }
  });
  
  return formatted.trim();
}

/**
 * Extract HTML from a rendered story
 */
export function extractHTML(element) {
  if (!element) return '';
  
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true);
  
  // Clean up any Storybook-specific attributes or classes
  const cleanElement = (el) => {
    if (el.removeAttribute) {
      el.removeAttribute('data-story-id');
      el.removeAttribute('data-view-mode');
    }
    if (el.children) {
      Array.from(el.children).forEach(cleanElement);
    }
  };
  
  cleanElement(clone);
  return clone.innerHTML || '';
}

/**
 * Transform Lit template result to HTML string
 */
export async function litToHTML(templateResult) {
  if (!templateResult || !templateResult._$litType$) {
    return '';
  }
  
  const temp = document.createElement('div');
  litRender(templateResult, temp);
  
  // Wait for any custom elements to upgrade
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return formatHTML(temp.innerHTML);
}

/**
 * Global decorator that provides HTML source code display
 */
export const withHTMLSource = (storyFn, context) => {
  const story = storyFn();
  
  // For docs mode, Storybook will automatically show source
  // We just need to ensure the parameters are set
  if (context.viewMode === 'docs') {
    return story;
  }
  
  // For canvas/story mode, we'll add a source viewer below the story
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; width: 100%; height: 100%;';
  
  // Story container
  const storyContainer = document.createElement('div');
  storyContainer.id = 'story-preview';
  storyContainer.style.cssText = 'flex: 1; overflow: auto;';
  
  // Source panel with copy button
  const sourceSection = document.createElement('div');
  sourceSection.className = 'html-source-section';
  sourceSection.innerHTML = `
    <details class="html-source-details surface-subtle">
      <summary class="html-source-summary surface-elevated">
        <span class="html-source-title">
          <span class="html-source-icon">📝</span>
          <span>View HTML Source</span>
        </span>
        <button id="copy-source-btn" class="btn-outline">
          📋 Copy HTML
        </button>
      </summary>
      <div class="html-source-content">
        <pre class="html-source-pre"><code class="html-source-code"></code></pre>
      </div>
    </details>
  `;
  
  container.appendChild(storyContainer);
  container.appendChild(sourceSection);
  
  // Render the story
  setTimeout(async () => {
    if (story && story._$litType$) {
      litRender(story, storyContainer);
    } else if (story instanceof HTMLElement) {
      storyContainer.appendChild(story);
    } else if (typeof story === 'string') {
      storyContainer.innerHTML = story;
    }
    
    // Extract and display HTML
    setTimeout(async () => {
      let html = '';
      
      if (story && story._$litType$) {
        html = await litToHTML(story);
      } else {
        html = formatHTML(extractHTML(storyContainer));
      }
      
      const codeEl = sourceSection.querySelector('.html-source-code');
      const preEl = sourceSection.querySelector('.html-source-pre');
      if (preEl && html) {
        // Use Shiki for syntax highlighting
        const theme = getCurrentTheme();
        const highlighted = await highlight(html, 'html', theme);
        
        // Shiki returns complete <pre><code>...</code></pre>, replace the whole pre element
        preEl.outerHTML = highlighted;
      }
      
      // Setup copy button
      const copyBtn = sourceSection.querySelector('#copy-source-btn');
      if (copyBtn && html) {
        copyBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          try {
            await navigator.clipboard.writeText(html);
            const originalClass = copyBtn.className;
            copyBtn.textContent = '✅ Copied!';
            copyBtn.className = 'btn-primary';
            
            setTimeout(() => {
              copyBtn.textContent = '📋 Copy HTML';
              copyBtn.className = originalClass;
            }, 2000);
          } catch (err) {
            console.error('Copy failed:', err);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '❌ Failed';
            setTimeout(() => {
              copyBtn.textContent = originalText;
            }, 2000);
          }
        });
      }
    }, 100);
  }, 0);
  
  return container;
};
