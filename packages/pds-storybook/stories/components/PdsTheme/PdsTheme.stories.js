import { html } from 'lit';
import { createComponentDocsPage } from '../../reference/reference-docs.js';

const componentDescription = `The \`<pds-theme>\` component lets users switch between **system**, **light**, and **dark** modes.
It updates \`PDS.theme\`, stays in sync with programmatic changes, and emits \`pds:theme:changed\` so bootstrap code can react (for example, to show a toast).

---

## Quick Reference

Listen for global theme updates with \`PDS.addEventListener('pds:theme:changed', handler)\` when other UI needs to respond.
`;

const docsParameters = {
  description: {
    component: componentDescription
  },
  page: createComponentDocsPage('pds-theme')
};

const renderThemeToggle = () => html`
  <label>
    <span data-label>Theme</span>
    <pds-theme></pds-theme>
  </label>
`;

export default {
  title: 'Components/Pds Theme',
  tags: ['autodocs', 'theme', 'appearance', 'pds-theme', 'switcher'],
  parameters: {
    pds: {
      tags: ['theme', 'appearance', 'toggle', 'pds-theme']
    },
    docs: docsParameters
  },
  argTypes: {}
};

export const Playground = {
  name: 'Interactive Playground',
  parameters: {
    docs: {
      description: {
        story: 'Wrap the component in a label with a `data-label` span to provide the field label.'
      }
    }
  },
  render: () => html`
    <div class="stack-md">
      <p class="text-muted">The toggle updates <code>PDS.theme</code> so the rest of your UI stays in sync.</p>
      ${renderThemeToggle()}
    </div>
  `
};


