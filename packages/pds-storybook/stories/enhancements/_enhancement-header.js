import { html } from 'lit';
import { enhancerMetadata } from '@pds-src/js/pds-core/pds-enhancer-metadata.js';

// Build a lookup map from the enhancerMetadata array
const enhancementMap = {
  accordion: enhancerMetadata.find(e => e.selector === '.accordion'),
  dropdown: enhancerMetadata.find(e => e.selector === 'nav[data-dropdown]'),
  toggle: enhancerMetadata.find(e => e.selector === 'label[data-toggle]'),
  range: enhancerMetadata.find(e => e.selector === 'input[type="range"]'),
  required: enhancerMetadata.find(e => e.selector === 'form[data-required]'),
  openGroup: enhancerMetadata.find(e => e.selector === 'fieldset[role=group][data-open]'),
  buttonWorking: enhancerMetadata.find(e => e.selector === "button, a[class*='btn-']")
};

/**
 * Renders a consistent header for enhancement stories
 * @param {keyof enhancementMap} key - The enhancement key
 * @returns {import('lit').TemplateResult}
 */
export const enhancementHeader = (key, extraInfo = {}) => {
  const info = enhancementMap[key];
  if (!info) return html``;
  
  const selector = info.selector + (extraInfo.selector || '');

  return html`
    <header>
      <h2>${selector}</h2>
      <p class="text-muted">${info.description} ${extraInfo.description || ''}</p>
    </header>
  `;
};

/**
 * Default parameters for enhancement stories to show code panel
 */
export const enhancementParameters = {
  options: {
    // Auto-select the "Code" panel when viewing enhancement stories
    selectedPanel: 'html-preview/panel'
  },
  previewTabs: {
    'storybook/docs/panel': { hidden: true },
    canvas: { hidden: false }
  },
  viewMode: 'story'
};
