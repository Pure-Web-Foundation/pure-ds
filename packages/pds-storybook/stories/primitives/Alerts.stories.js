import { html } from 'lit';

export default {
  title: 'Primitives/Alerts',
  parameters: {
    pds: {
      tags: ['colors']
    },
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
        
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="alert alert-info">This is an info alert.</div>
      <div class="alert alert-success">This is a success alert.</div>
      <div class="alert alert-warning">This is a warning alert.</div>
      <div class="alert alert-danger">This is a danger alert.</div>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
