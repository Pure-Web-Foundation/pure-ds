import { html } from 'lit';

export default {
  title: 'Foundations/Colors',
  parameters: {
    pds: {
      tags: ['colors']
    },
    docs: {
      description: {
        component: 'Design tokens - colors, typography, spacing, icons'
      }
    }
  },
  argTypes: {
  preset: {
    control: 'select',
    options: ['default', 'ocean-breeze', 'midnight-steel', 'sunset-vibes', 'forest-calm', 'lavender-dream'],
    description: 'Choose a design preset'
  },
  primaryColor: {
    control: 'color',
    description: 'Override primary color'
  },
  secondaryColor: {
    control: 'color',
    description: 'Override secondary color'
  }
  }
};

const colorNames = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'danger',
  'info'
];

const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800];

const colorScaleStoryStyles = html`
  <style>
    .color-scale-story-container {
      padding: var(--spacing-8);
    }
    .color-scale-container {
      margin-bottom: var(--spacing-8);
    }
    .color-scale-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }
    .color-scale-label {
      width: 7.5rem;
      font-weight: 600;
    }
    .color-scale-swatches {
      display: flex;
      flex: 1;
    }
    .color-scale-swatch {
      flex: 1;
      min-height: 3.75rem;
      padding: var(--spacing-4);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
    .color-scale-swatch--hover {
      transform: translateY(-0.25rem);
      z-index: 10;
      box-shadow: var(--shadow-md);
    }
    ${colorNames
      .map((color) =>
        colorShades
          .map((shade) => {
            const textColor =
              shade >= 400
                ? 'var(--surface-inverse-text, #ffffff)'
                : `var(--color-${color}-900)`;
            return `
              .color-scale-swatch[data-color="${color}"][data-shade="${shade}"] {
                background: var(--color-${color}-${shade});
                color: ${textColor};
              }
            `;
          })
          .join('\n')
      )
      .join('\n')}
  </style>
`;

const handleSwatchHoverEnter = (event) => {
  event.currentTarget.classList.add('color-scale-swatch--hover');
};

const handleSwatchHoverLeave = (event) => {
  event.currentTarget.classList.remove('color-scale-swatch--hover');
};

const renderColorScale = (colorName) => html`
  <div class="color-scale-container">
    <div class="color-scale-row">
      <div class="color-scale-label">${colorName}</div>
      <div class="color-scale-swatches">
        ${colorShades.map(
          (shade) => html`
            <div
              class="color-scale-swatch"
              data-color=${colorName}
              data-shade=${shade}
              @mouseover=${handleSwatchHoverEnter}
              @mouseout=${handleSwatchHoverLeave}
              title="${colorName}-${shade}"
            >
              ${shade}
            </div>
          `
        )}
      </div>
    </div>
  </div>
`;

export const Default = {
  render: (args) => {
    return html`
      ${colorScaleStoryStyles}
      <div class="story-container color-scale-story-container">
        <h2>Color Scales</h2>
        ${renderColorScale('primary')}
        ${renderColorScale('secondary')}
        ${renderColorScale('accent')}
        ${renderColorScale('success')}
        ${renderColorScale('warning')}
        ${renderColorScale('danger')}
        ${renderColorScale('info')}
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
