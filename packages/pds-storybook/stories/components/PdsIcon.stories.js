import { html } from 'lit';
import { storyLinkHandler } from '../utils/navigation.js';
import { createComponentDocsPage } from '../reference/reference-docs.js';

const componentDescription = `The \`<pds-icon>\` web component renders SVG icons from a sprite sheet with automatic fallbacks.

👉 See **[Foundations / Icons / Overview](?path=/story/foundations-icons--overview)** for complete documentation.

---

## Quick Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| \`icon\` | string | \`"missing"\` | Icon name from sprite |
| \`size\` | string | \`"md"\` | Size: \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`2xl\` |
| \`color\` | string | \`currentColor\` | Icon color (CSS value or token) |
| \`label\` | string | — | Accessible label (adds \`role="img"\`) |
| \`rotate\` | number | \`0\` | Rotation in degrees |
| \`sprite\` | string | — | Override sprite sheet path |
| \`no-sprite\` | boolean | \`false\` | Force fallback rendering |

---

## Basic Usage

\`\`\`html
<pds-icon icon="heart"></pds-icon>
<pds-icon icon="star" size="lg" color="gold"></pds-icon>
<pds-icon icon="check" color="var(--color-success-500)"></pds-icon>
\`\`\`
`;

const docsParameters = {
  description: {
    component: componentDescription
  },
  page: createComponentDocsPage('pds-icon')
};

export default {
  title: 'Components/Pds Icon',
  tags: ['autodocs', 'icon', 'icons', 'svg', 'sprite', 'phosphor', 'graphic', 'symbol'],
  parameters: {
    pds: {
      tags: ['icon', 'icons', 'svg', 'sprite', 'phosphor', 'graphic', 'symbol', 'pds-icon']
    },
    docs: docsParameters
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from sprite'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Named size'
    },
    color: {
      control: 'color',
      description: 'Icon color'
    },
    label: {
      control: 'text',
      description: 'Accessible label'
    },
    rotate: {
      control: 'number',
      description: 'Rotation angle in degrees'
    }
  }
};

export const Default = {
  name: 'Interactive Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to explore icon attributes.'
      }
    }
  },
  render: (args) => html`
    <div class="stack-lg">
      <a href="/?path=/story/foundations-icons--overview" @click=${storyLinkHandler('foundations-icons--overview')} class="card card-interactive">
        <h3 class="flex items-center gap-sm">
          <pds-icon icon="book-open" size="md"></pds-icon>
          PDS Icon System
        </h3>
        <p class="text-muted">Complete icon system documentation: available icons, sizes, colors, configuration, and more.</p>
      </a>
      
      <pds-icon 
        icon="${args.icon}" 
        size="${args.size}"
        color="${args.color}"
        label="${args.label || ''}"
        rotate="${args.rotate || 0}">
      </pds-icon>
    </div>
  `,
  args: {
    icon: 'heart',
    size: 'lg',
    color: 'currentColor',
    label: '',
    rotate: 0
  }
};
