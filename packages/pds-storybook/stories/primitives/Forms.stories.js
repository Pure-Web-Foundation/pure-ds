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
      <div class="card">
        
    <form style="max-width: 400px;">
      <label>
        <span>Text Input</span>
        <input type="text" placeholder="Enter text...">
      </label>
      <label>
        <span>Email</span>
        <div class="input-icon">
          <pds-icon icon="envelope"></pds-icon>
          <input type="email" required placeholder="email@example.com">
        </div>
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

export const InputsWithIcons = {
  render: (args) => {
    return html`
      <div class="card">
        <h3>Inputs with Icons</h3>
        <p>Enhance inputs with icons for better UX. Icons can be positioned at the start or end of the input.</p>
        
        <div class="flex flex-col gap-lg" style="max-width: 400px;">
          <label>
            <span>Search (Icon Start)</span>
            <div class="input-icon">
              <pds-icon icon="magnifying-glass"></pds-icon>
              <input type="search" placeholder="Search..." />
            </div>
          </label>
          
          <label>
            <span>Username (Icon End)</span>
            <div class="input-icon input-icon-end">
              <input type="text" placeholder="Username" />
              <pds-icon icon="user"></pds-icon>
            </div>
          </label>
        </div>
      </div>
    `;
  },
  args: {
    preset: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Input fields can be enhanced with icons to provide visual context. Use the `input-icon` class wrapper and position icons at the start (default) or end (`input-icon-end`) of the input.'
      }
    }
  }
};
