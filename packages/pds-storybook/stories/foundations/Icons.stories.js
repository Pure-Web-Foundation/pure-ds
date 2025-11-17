import { html } from 'lit';

export default {
  title: 'PDS/Foundations/Icons',
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
    // Color overrides would need proper designer reconfiguration
    
    return html`
      <div class="story-container" style="padding: 2rem;">
        
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <pds-icon icon="heart" size="lg"></pds-icon>
      <pds-icon icon="star" size="lg"></pds-icon>
      <pds-icon icon="user" size="lg"></pds-icon>
      <pds-icon icon="bell" size="lg"></pds-icon>
      <pds-icon icon="search" size="lg"></pds-icon>
      <pds-icon icon="menu" size="lg"></pds-icon>
      <pds-icon icon="x" size="lg"></pds-icon>
      <pds-icon icon="check" size="lg"></pds-icon>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
