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

export const SimpleForm = () => html`
  <pds-jsonform 
    schema='${JSON.stringify(simpleSchema)}'
    @submit="${(e) => console.log('Form data:', e.detail)}">
  </pds-jsonform>
`;

export const ComplexForm = () => html`
  <pds-jsonform 
    schema='${JSON.stringify(complexSchema)}'
    @submit="${(e) => console.log('Form data:', e.detail)}">
  </pds-jsonform>
`;

export const WithInitialData = () => html`
  <pds-jsonform 
    schema='${JSON.stringify(simpleSchema)}'
    value='{"name":"John Doe","email":"john@example.com","age":25,"newsletter":true}'
    @change="${(e) => console.log('Changed:', e.detail)}">
  </pds-jsonform>
`;
