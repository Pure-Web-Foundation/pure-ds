import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-jsonform',
  parameters: {
    docs: {
      description: {
        component: 'Dynamic form generation from JSON Schema with validation'
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
