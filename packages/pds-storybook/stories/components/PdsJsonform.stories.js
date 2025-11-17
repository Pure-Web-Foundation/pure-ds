import { html } from 'lit';

export default {
  title: 'Components/Pds Jsonform',
  parameters: {
    docs: {
      description: {
        component: `**⭐ Recommended for modern applications** - Automatically generate complete forms from JSON Schema definitions.

### Key Features
- 🎯 **Zero boilerplate** - Define form structure in JSON, get a working form with validation
- ✅ **Built-in validation** - Automatic validation based on schema rules (required, min/max, patterns, etc.)
- 🔄 **Data binding** - Two-way data binding with form state management
- 🎨 **PDS styled** - Uses all PDS design tokens automatically
- 📱 **Responsive** - Mobile-friendly layouts out of the box
- 🧩 **Conditional logic** - Show/hide fields based on other field values
- 🌐 **Nested objects** - Support for complex nested data structures
- 🔧 **Extensible** - Custom field types and validators

### Why JSON Schema Forms?
Instead of manually writing HTML for every form field, validation rule, and error message, you define your data schema once and get:
- Form UI generation
- Client-side validation
- Server-side validation (same schema)
- API documentation
- Type definitions
- Database schemas

See the examples below to get started, or check the [primitive forms](/story/primitives-forms--default) for manual form building.`
      }
    }
  }
};

const simpleSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name'
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address'
    },
    age: {
      type: 'number',
      title: 'Age',
      minimum: 18
    },
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to newsletter'
    }
  },
  required: ['name', 'email']
};

const complexSchema = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: { type: 'string', title: 'First Name' },
        lastName: { type: 'string', title: 'Last Name' },
        dateOfBirth: { type: 'string', format: 'date', title: 'Date of Birth' }
      }
    },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: { type: 'string', title: 'Street' },
        city: { type: 'string', title: 'City' },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['USA', 'UK', 'Canada', 'Australia']
        }
      }
    },
    preferences: {
      type: 'array',
      title: 'Interests',
      items: {
        type: 'string',
        enum: ['Technology', 'Sports', 'Music', 'Travel', 'Reading']
      }
    }
  }
};

export const SimpleForm = () => {
  setTimeout(() => {
    const form = document.querySelector('#simple-jsonform');
    if (form) {
      form.jsonSchema = simpleSchema;
      form.addEventListener('pw:submit', (e) => {
        console.log('✅ Form submitted:', e.detail);
      });
    }
  }, 0);
  
  return html`
    <pds-jsonform id="simple-jsonform"></pds-jsonform>
  `;
};

export const ComplexForm = () => {
  setTimeout(() => {
    const form = document.querySelector('#complex-jsonform');
    if (form) {
      form.jsonSchema = complexSchema;
      form.addEventListener('pw:submit', (e) => {
        console.log('✅ Form submitted:', e.detail);
      });
    }
  }, 0);
  
  return html`
    <pds-jsonform id="complex-jsonform"></pds-jsonform>
  `;
};

export const WithInitialData = () => {
  setTimeout(() => {
    const form = document.querySelector('#initial-data-jsonform');
    if (form) {
      form.jsonSchema = simpleSchema;
      form.values = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        newsletter: true
      };
      form.addEventListener('pw:value-change', (e) => {
        console.log('🔄 Value changed:', e.detail);
      });
      form.addEventListener('pw:submit', (e) => {
        console.log('✅ Form submitted:', e.detail);
      });
    }
  }, 0);
  
  return html`
    <pds-jsonform id="initial-data-jsonform"></pds-jsonform>
  `;
};
