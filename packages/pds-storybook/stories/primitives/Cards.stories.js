import { html } from 'lit';

export default {
  title: 'PDS/Primitives/Cards',
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
        
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
      <article class="card">
        <h3>Card Title</h3>
        <p>Card content goes here. This is a basic card primitive.</p>
        <button class="btn-primary">Action</button>
      </article>
      <article class="card">
        <h3>Another Card</h3>
        <p>Cards are versatile containers for content.</p>
        <button class="btn-outline">Learn More</button>
      </article>
    </div>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
