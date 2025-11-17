import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-upload',
  parameters: {
    docs: {
      description: {
        component: 'File upload with preview and validation'
      }
    }
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (MIME or extensions)'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection'
    },
    maxSize: {
      control: 'number',
      description: 'Max file size in bytes'
    }
  }
};

export const Default = {
  render: (args) => html`
    <pds-upload 
      accept="${args.accept}"
      ?multiple="${args.multiple}"
      max-size="${args.maxSize}"
      @files-changed="${(e) => console.log('Files:', e.detail)}">
    </pds-upload>
  `,
  args: {
    accept: 'image/*',
    multiple: true,
    maxSize: 5000000
  }
};

export const SingleFile = () => html`
  <pds-upload accept="application/pdf" max-size="10000000"></pds-upload>
`;

export const WithPreview = () => html`
  <pds-upload accept="image/*" multiple max-files="5"></pds-upload>
`;
