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
  
  const cleaned = formatted.trim();
  return cleaned.replace(/\s([\w:-]+)=""/g, ' $1');
}

/**
 * Extract HTML from a rendered story
 */
function extractHTML(element) {
  if (!element) return '';
  
  const clone = element.cloneNode(true);
  
  // Clean up Storybook-specific attributes
  const runtimeDataAttrs = new Set([
    'data-original-icon',
    'data-icon',
    'data-uid',
    'data-rendered',
    'data-runtime',
    'data-pds-runtime'
  ]);

  const cleanElement = (el) => {
    if (el.removeAttribute) {
      el.removeAttribute('data-story-id');
      el.removeAttribute('data-view-mode');
      runtimeDataAttrs.forEach((attr) => el.removeAttribute(attr));
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
 * Generate realistic source code for pds-form elements
 */
function generatePdsFormMarkup(formElement) {
  const attrs = [];
  
  // Check for properties
  if (formElement.jsonSchema) {
    attrs.push('.jsonSchema=${schema}');
  }
  if (formElement.uiSchema) {
    attrs.push('.uiSchema=${uiSchema}');
  }
  if (formElement.values) {
    attrs.push('.values=${values}');
  }
  if (formElement.options && Object.keys(formElement.options).length > 0) {
    attrs.push('.options=${options}');
  }
  
  // Check for common event listeners by looking at the element's event listeners
  // Since we can't easily detect event listeners, we'll check common patterns
  const hasSubmitHandler = formElement.getAttribute('data-has-submit') !== null || true; // Assume submit handler
  if (hasSubmitHandler) {
    attrs.push('@pw:submit=${(e) => handleSubmit(e.detail)}');
  }
  
  // Check for boolean attributes
  if (formElement.hasAttribute('data-required')) {
    attrs.push('data-required');
  }
  if (formElement.hasAttribute('hide-actions')) {
    attrs.push('hide-actions');
  }
  
  const formattedAttrs = attrs.length > 0 
    ? '\n  ' + attrs.join('\n  ') + '\n'
    : '';
  
  // Check for slotted content
  const slots = formElement.querySelectorAll('[slot]');
  let slotContent = '';
  if (slots.length > 0) {
    slotContent = '\n  ' + Array.from(slots).map(slot => {
      return `<div slot="${slot.getAttribute('slot')}">\n    <!-- slotted content -->\n  </div>`;
    }).join('\n  ') + '\n';
  }
  
  return `<pds-form${formattedAttrs}>${slotContent}</pds-form>`;
}

/**
 * Generate realistic source code for pds-omnibox elements
 */
function generatePdsOmniboxMarkup(omniboxElement) {
  const attrs = [];

  const stringAttrs = ['name', 'placeholder', 'value', 'autocomplete'];
  stringAttrs.forEach((attr) => {
    const value = omniboxElement.getAttribute(attr);
    if (value !== null && value !== undefined && value !== '') {
      attrs.push(`${attr}="${value}"`);
    }
  });

  if (omniboxElement.hasAttribute('required')) {
    attrs.push('required');
  }

  if (omniboxElement.hasAttribute('disabled')) {
    attrs.push('disabled');
  }

  if (omniboxElement.settings) {
    attrs.push('.settings=${settings}');
  }

  const formattedAttrs = attrs.length > 0
    ? '\n  ' + attrs.join('\n  ') + '\n'
    : '';

  return `<pds-omnibox${formattedAttrs}></pds-omnibox>`;
}

/**
 * Generate realistic source code for pds-treeview elements
 */
function generatePdsTreeviewMarkup(treeviewElement) {
  const attrs = [];

  const stringAttrs = ['name', 'value', 'src'];
  stringAttrs.forEach((attr) => {
    const value = treeviewElement.getAttribute(attr);
    if (value !== null && value !== undefined && value !== '') {
      attrs.push(`${attr}="${value}"`);
    }
  });

  const booleanAttrs = ['required', 'disabled', 'display-only', 'expanded-all'];
  booleanAttrs.forEach((attr) => {
    if (treeviewElement.hasAttribute(attr)) {
      attrs.push(attr);
    }
  });

  if (treeviewElement.options || treeviewElement.settings) {
    attrs.push('.options=${options}');
  }

  const formattedAttrs = attrs.length > 0
    ? '\n  ' + attrs.join('\n  ') + '\n'
    : '';

  return `<pds-treeview${formattedAttrs}></pds-treeview>`;
}

/**
 * Generate realistic source code for pds-fab elements
 */
function generatePdsFabMarkup(fabElement) {
  const attrs = [];

  const stringAttrs = ['id', 'radius', 'spread', 'start-angle'];
  stringAttrs.forEach((attr) => {
    const value = fabElement.getAttribute(attr);
    if (value !== null && value !== undefined && value !== '') {
      attrs.push(`${attr}="${value}"`);
    }
  });

  if (Array.isArray(fabElement.satellites) && fabElement.satellites.length > 0) {
    const satellitesSource =
      fabElement.getAttribute?.('data-satellites-source') ||
      fabElement.dataset?.satellitesSource ||
      null;
    attrs.push(satellitesSource || '.satellites=${satellites}');
  }

  const formattedAttrs = attrs.length > 0
    ? '\n  ' + attrs.join('\n  ') + '\n'
    : '';

  const icon = fabElement.querySelector?.('pds-icon');
  const iconMarkup = icon?.outerHTML || '<pds-icon icon="plus" size="lg"></pds-icon>';
  const normalizedIcon = iconMarkup.replace(/\s([\w:-]+)=""/g, ' $1');

  return `<pds-fab${formattedAttrs}>\n  ${normalizedIcon}\n</pds-fab>`;
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
      // Check if this story has pds-form, pds-omnibox, pds-treeview, or pds-fab elements
      const pdsFormElements = Array.from(container.querySelectorAll('pds-form'));
      const pdsOmniboxElements = Array.from(container.querySelectorAll('pds-omnibox'));
      const pdsTreeviewElements = Array.from(container.querySelectorAll('pds-treeview'));
      const pdsFabElements = Array.from(container.querySelectorAll('pds-fab'));
      const hasSpecialElements =
        pdsFormElements.length > 0 ||
        pdsOmniboxElements.length > 0 ||
        pdsTreeviewElements.length > 0 ||
        pdsFabElements.length > 0;

      if (hasSpecialElements) {
        // Generate realistic markup for PDS component stories
        const alerts = Array.from(container.querySelectorAll('.callout'));
        let markup = '';

        // Include any alert/info boxes before the form
        if (alerts.length > 0) {
          alerts.forEach(alert => {
            markup += `<div class="callout ${alert.className.split(' ').filter(c => c !== 'callout').join(' ')}">\n`;
            markup += `  ${alert.innerHTML.replace(/\n\s+/g, '\n  ')}\n`;
            markup += `</div>\n\n`;
          });
        }

        // Add pds-form markup
        pdsFormElements.forEach(form => {
          markup += generatePdsFormMarkup(form);
        });

        // Add pds-omnibox markup
        pdsOmniboxElements.forEach(omnibox => {
          markup += generatePdsOmniboxMarkup(omnibox);
        });

        // Add pds-treeview markup
        pdsTreeviewElements.forEach(treeview => {
          markup += generatePdsTreeviewMarkup(treeview);
        });

        // Add pds-fab markup
        pdsFabElements.forEach(fab => {
          markup += generatePdsFabMarkup(fab);
        });

        html = markup;
      } else {
        // No pds-form elements, use standard extraction
        if (story && story._$litType$) {
          html = await litToHTML(story);
        } else {
          html = formatHTML(extractHTML(container));
        }
      }

      const forms = pdsFormElements
        .map((form, index) => {
          const label =
            form.getAttribute?.('id') ||
            form.getAttribute?.('name') ||
            (pdsFormElements.length > 1 ? `Form ${index + 1}` : 'Form');

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

      const omniboxes = pdsOmniboxElements
        .map((omnibox, index) => {
          const label =
            omnibox.getAttribute?.('id') ||
            omnibox.getAttribute?.('name') ||
            (pdsOmniboxElements.length > 1 ? `Omnibox ${index + 1}` : 'Omnibox');

          const settingsSource =
            omnibox.getAttribute?.('data-settings-source') ||
            omnibox.dataset?.settingsSource ||
            null;

          const settings = settingsSource || serializeForDisplay(omnibox.settings);

          return {
            id: index,
            label,
            settings
          };
        })
        .filter((entry) => entry.settings);

      const treeviews = pdsTreeviewElements
        .map((treeview, index) => {
          const label =
            treeview.getAttribute?.('id') ||
            treeview.getAttribute?.('name') ||
            (pdsTreeviewElements.length > 1 ? `Treeview ${index + 1}` : 'Treeview');

          const optionsSource =
            treeview.getAttribute?.('data-options-source') ||
            treeview.dataset?.optionsSource ||
            null;

          const options =
            optionsSource ||
            serializeForDisplay(treeview.options || treeview.settings) ||
            'const options = {};';

          return {
            id: index,
            label,
            options
          };
        });

      const fabs = pdsFabElements
        .map((fab, index) => {
          const label =
            fab.getAttribute?.('id') ||
            (pdsFabElements.length > 1 ? `Fab ${index + 1}` : 'Fab');

          const satellitesSource =
            fab.getAttribute?.('data-satellites-source') ||
            fab.dataset?.satellitesSource ||
            null;

          const satellites = satellitesSource || serializeForDisplay(fab.satellites);

          return {
            id: index,
            label,
            satellites
          };
        })
        .filter((entry) => entry.satellites);

      channel.emit(EVENTS.UPDATE_HTML, {
        markup: html || '',
        forms,
        omniboxes,
        treeviews,
        fabs
      });
    }
  };
  
  // Extract and send HTML after render (multiple times to catch async renders)
  setTimeout(extractAndSendHTML, 50);
  setTimeout(extractAndSendHTML, 150);
  setTimeout(extractAndSendHTML, 300);
  
  return story;
};
