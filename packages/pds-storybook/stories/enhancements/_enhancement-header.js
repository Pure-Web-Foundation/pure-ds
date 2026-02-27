import { html } from 'lit';
import { defaultPDSEnhancerMetadata } from '@pds-src/js/pds-core/pds-enhancers-meta.js';

// Build a lookup map from the defaultPDSEnhancerMetadata array
const enhancementMap = {
  accordion: defaultPDSEnhancerMetadata.find(e => e.selector === '.accordion'),
  dropdown: defaultPDSEnhancerMetadata.find(e => e.selector === 'nav[data-dropdown]'),
  toggle: defaultPDSEnhancerMetadata.find(e => e.selector === 'label[data-toggle]'),
  colorInput: defaultPDSEnhancerMetadata.find(e => e.selector === 'label[data-color]'),
  range: defaultPDSEnhancerMetadata.find(e => e.selector === 'input[type="range"]'),
  required: defaultPDSEnhancerMetadata.find(e => e.selector === 'form[data-required]'),
  openGroup: defaultPDSEnhancerMetadata.find(e => e.selector === 'fieldset[role=group][data-open]'),
  clip: defaultPDSEnhancerMetadata.find(e => e.selector === '[data-clip]'),
  buttonWorking: defaultPDSEnhancerMetadata.find(e => e.selector === "button, a[class*='btn-']")
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
      <small class="text-muted">${info.description} ${extraInfo.description || ''}</small>
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
