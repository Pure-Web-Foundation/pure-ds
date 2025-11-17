import { html } from 'lit';

export default {
  title: 'Primitives/Forms',
  parameters: {
    docs: {
      description: {
        component: `Standard HTML form controls styled by PDS. 

**💡 For modern apps, consider using [pds-jsonform](/story/components-pds-jsonform--simple-form)** - a powerful web component that automatically generates forms from JSON Schema with built-in validation, conditional logic, and data binding.

These primitive form controls provide the foundation for manual form building when you need full control over the markup.`
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
        
    <form style="max-width: 400px;">
      <label>
        <span>Text Input</span>
        <input type="text" placeholder="Enter text...">
      </label>
      <label>
        <span>Email</span>
        <input type="email" required placeholder="email@example.com">
      </label>
      <label>
        <span>Select</span>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </label>
      <label>
        <span>Textarea</span>
        <textarea rows="4" placeholder="Enter longer text..."></textarea>
      </label>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
  
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
