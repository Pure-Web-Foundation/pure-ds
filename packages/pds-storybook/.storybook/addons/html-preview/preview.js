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
 * Strip Lit template comments from rendered HTML
 * Removes markers like <!--?lit$641514976$-->, <!---->, etc.
 */
function stripLitComments(html) {
  if (!html) return '';
  
  // Remove Lit binding markers: <!--?lit$...$-->
  html = html.replace(/<!--\?lit\$[^$]+\$-->/g, '');
  
  // Remove empty Lit comments: <!---->
  html = html.replace(/<!---->/g, '');
  
  // Remove Lit template marker comments: <!--lit-part...-->
  html = html.replace(/<!--lit-part[^>]*-->/g, '');
  html = html.replace(/<!--\/lit-part-->/g, '');
  
  // Clean up any resulting multiple whitespace/newlines
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return html;
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
  
  // Strip Lit comments before formatting
  const cleanedHTML = stripLitComments(temp.innerHTML);
  
  return formatHTML(cleanedHTML);
}

function serializeForDisplay(value) {
  if (value === undefined) return '';
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'symbol') return value.toString();

  const seen = new WeakSet();

  const replacer = (key, currentValue) => {
    if (typeof currentValue === 'function') {
      return `[Function${currentValue.name ? `: ${currentValue.name}` : ''}]`;
    }
    if (typeof currentValue === 'bigint') {
      return currentValue.toString();
    }
    if (typeof currentValue === 'symbol') {
      return currentValue.toString();
    }
    if (currentValue instanceof Map) {
      return Object.fromEntries(currentValue);
    }
    if (currentValue instanceof Set) {
      return Array.from(currentValue);
    }
    if (currentValue instanceof Date) {
      return currentValue.toISOString();
    }
    if (typeof currentValue === 'object' && currentValue !== null) {
      if (seen.has(currentValue)) {
        return '[Circular]';
      }
      seen.add(currentValue);
    }
    return currentValue;
  };

  try {
    if (value === null) {
      return 'null';
    }
    return JSON.stringify(value, replacer, 2);
  } catch (error) {
    return `/* Unable to serialize value: ${error.message} */`;
  }
}

/**
 * Global decorator that extracts and sends HTML to the panel
 */
export const withHTMLExtractor = (storyFn, context) => {
  const story = storyFn();
  const channel = addons.getChannel();
  
  // Function to extract and send HTML
  const extractAndSendHTML = async () => {
    let html = '';
    
    // Try to get HTML from the story container
    const container = document.querySelector('#storybook-root');
    if (container) {
      if (story && story._$litType$) {
        html = await litToHTML(story);
      } else {
        html = formatHTML(extractHTML(container));
      }

      const forms = Array.from(container.querySelectorAll('pds-form'))
        .map((form, index) => {
          const label =
            form.getAttribute?.('id') ||
            form.getAttribute?.('name') ||
            (Array.from(container.querySelectorAll('pds-form')).length > 1 ? `Form ${index + 1}` : 'Form');

          const jsonSchema = serializeForDisplay(form.jsonSchema);
          const uiSchema = serializeForDisplay(form.uiSchema);
          const options = serializeForDisplay(form.options);

          return {
            id: index,
            label,
            jsonSchema,
            uiSchema,
            options
          };
        })
        .filter((entry) => entry.jsonSchema || entry.uiSchema || entry.options);

      channel.emit(EVENTS.UPDATE_HTML, {
        markup: html || '',
        forms
      });
    }
  };
  
  // Extract and send HTML after render (multiple times to catch async renders)
  setTimeout(extractAndSendHTML, 50);
  setTimeout(extractAndSendHTML, 150);
  setTimeout(extractAndSendHTML, 300);
  
  return story;
};
