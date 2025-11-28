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
        
    <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
      <div style="background: var(--color-primary-100); padding: var(--spacing-1);">Spacing 1</div>
      <div style="background: var(--color-primary-200); padding: var(--spacing-2);">Spacing 2</div>
      <div style="background: var(--color-primary-300); padding: var(--spacing-3);">Spacing 3</div>
      <div style="background: var(--color-primary-400); padding: var(--spacing-4);">Spacing 4</div>
      <div style="background: var(--color-primary-500); padding: var(--spacing-5); color: white;">Spacing 5</div>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
