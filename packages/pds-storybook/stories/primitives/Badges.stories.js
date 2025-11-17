import { html } from 'lit';

export default {
  title: 'PDS/Primitives/Badges',
  parameters: {
    docs: {
      description: {
        component: 'Basic UI elements - buttons, forms, cards, badges'
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
        
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <span class="badge">Default</span>
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-danger">Danger</span>
      <span class="pill">Pill</span>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
