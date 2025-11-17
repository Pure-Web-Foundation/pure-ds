import { html } from 'lit';

export default {
  title: 'Foundations/Colors',
  parameters: {
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

export const Default = {
  render: (args) => {
    // Preset changes are handled by toolbar in preview.js
    
    // Helper to render a color scale (from pds-demo.js)
    const renderColorScale = (colorName) => html`
      <div class="color-scale-container">
        <div class="color-scale-row">
          <div class="color-scale-label">${colorName}</div>
          <div class="color-scale-swatches">
            ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map((shade) => {
              const textColor = shade >= 400 ? 'white' : `var(--color-${colorName}-900)`;
              return html`
                <div
                  class="color-scale-swatch-interactive"
                  style="
                    background: var(--color-${colorName}-${shade});
                    color: ${textColor};
                    padding: 1rem;
                    text-align: center;
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                  "
                  @mouseover="${(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.zIndex = '10';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}"
                  @mouseout="${(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.zIndex = '1';
                    e.currentTarget.style.boxShadow = 'none';
                  }}"
                  title="${colorName}-${shade}"
                >
                  ${shade}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
    
    return html`
      <div class="story-container" style="padding: 2rem;">
        <style>
          .color-scale-container { margin-bottom: 2rem; }
          .color-scale-row { display: flex; align-items: center; gap: 1rem; }
          .color-scale-label { width: 120px; font-weight: 600; }
          .color-scale-swatches { display: flex; flex: 1; gap: 0; }
          .color-scale-swatch-interactive { flex: 1; min-height: 60px; }
        </style>
        
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
