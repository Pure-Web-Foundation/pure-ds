import { useEffect } from '@storybook/preview-api';
import { addons } from '@storybook/preview-api';
import { EVENTS } from './constants.js';
import { render as litRender } from 'lit';

/**
 * Format HTML string with proper indentation
 */
function formatHTML(html) {
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
function extractHTML(element) {
  if (!element) return '';
  
  const clone = element.cloneNode(true);
  
  // Clean up Storybook-specific attributes
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
async function litToHTML(templateResult) {
  if (!templateResult || !templateResult._$litType$) {
    return '';
  }
  
  const temp = document.createElement('div');
  litRender(templateResult, temp);
  
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return formatHTML(temp.innerHTML);
}

/**
 * Global decorator that extracts and sends HTML to the panel
 */
export const withHTMLExtractor = (storyFn, context) => {
  const story = storyFn();
  const channel = addons.getChannel();
  
  // Extract and send HTML after render
  setTimeout(async () => {
    let html = '';
    
    // Try to get HTML from the story container
    const container = document.querySelector('#storybook-root');
    if (container) {
      if (story && story._$litType$) {
        html = await litToHTML(story);
      } else {
        html = formatHTML(extractHTML(container));
      }
      
      if (html) {
        channel.emit(EVENTS.UPDATE_HTML, html);
      }
    }
  }, 100);
  
  return story;
};
