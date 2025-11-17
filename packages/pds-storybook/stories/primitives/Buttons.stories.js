import { html } from 'lit';

export default {
  title: 'PDS/Primitives/Buttons',
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
        
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
      <button class="btn-ghost">Ghost</button>
      <button class="btn-primary" disabled>Disabled</button>
    </div>
    <br/>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary">Medium</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
