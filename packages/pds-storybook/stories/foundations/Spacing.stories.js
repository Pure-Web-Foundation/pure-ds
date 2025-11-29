import { html } from 'lit';

export default {
  title: 'Foundations/Spacing',
  tags: ['spacing', 'tokens'],
  parameters: {
    pds: {
      tags: ['spacing', 'tokens']
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

export const Default = {
  render: (args) => {
    // Preset changes are handled by toolbar in preview.js
    
    return html`
      <div class="story-container" style="padding: 2rem;">
        
    <div class="flex flex-col gap-sm">
      <div class="card surface" style="padding: var(--spacing-1);">Padding: --spacing-1</div>
      <div class="card" style="padding: var(--spacing-2);">Padding: --spacing-2</div>
      <div class="card" style="padding: var(--spacing-3);">Padding: --spacing-3</div>
      <div class="card" style="padding: var(--spacing-4);">Padding: --spacing-4</div>
      <div class="card" style="padding: var(--spacing-5);">Padding: --spacing-5</div>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
