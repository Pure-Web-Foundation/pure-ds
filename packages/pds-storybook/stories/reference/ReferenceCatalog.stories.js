import { html } from 'lit';
import referenceData from '../../dist/pds-reference.json';
import './reference-catalog.js';

export default {
  title: 'Reference/Developer Catalog',
  tags: ['reference', 'docs', 'internal'],
  parameters: {
    layout: 'fullscreen',
    pds: {
      tags: ['reference', 'catalog', 'developer']
    },
    docs: {
      description: {
        component: `Auto-generated reference that merges:
- <code>custom-elements.json</code> manifest data
- <code>src/js/pds-core/pds-ontology.js</code>
- Storybook metadata (pds tags + docs)

Run <code>npm run build-reference</code> to refresh the JSON pipeline before launching Storybook.`
      }
    }
  }
};

export const Catalog = {
  render: () => html`<pds-reference-catalog .data=${referenceData}></pds-reference-catalog>`
};
