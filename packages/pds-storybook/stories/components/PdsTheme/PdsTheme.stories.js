import { html } from 'lit';
import { createComponentDocsPage } from '../../reference/reference-docs.js';

const componentDescription = `The \`<pds-theme>\` component lets users switch between **system**, **light**, and **dark** modes.
It updates \`PDS.theme\`, stays in sync with programmatic changes, and emits \`pds:theme:changed\` so bootstrap code can react (for example, to show a toast).

---

## Quick Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| \`label\` | string | \`"Theme"\` | Custom legend + aria-label |

Listen for global theme updates with \`PDS.addEventListener('pds:theme:changed', handler)\` when other UI needs to respond.
`;

const docsParameters = {
  description: {
    component: componentDescription
  },
  page: createComponentDocsPage('pds-theme')
};

const renderThemeToggle = (args) => html`
  <pds-theme
    label=${args.label || ''}
  ></pds-theme>
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
  argTypes: {
    label: {
      control: 'text',
      description: 'Legend + aria-label text'
    }
  }
};

export const Playground = {
  name: 'Interactive Playground',
  args: {
    label: 'Theme'
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to adjust the component label.'
      }
    }
  },
  render: (args) => html`
    <div class="stack-md">
      <p class="text-muted">The toggle updates <code>PDS.theme</code> so the rest of your UI stays in sync.</p>
      ${renderThemeToggle(args)}
    </div>
  `
};


