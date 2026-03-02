import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'Form-associated star rating control with keyboard, pointer, and half-step support.'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-rating');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-rating', error);
    });
}

export default {
  title: 'Components/pds-rating',
  tags: ['autodocs', 'rating', 'stars', 'form', 'input'],
  parameters: {
    pds: {
      tags: ['rating', 'stars', 'form', 'input', 'pds-rating']
    },
    docs: docsParameters
  },
  argTypes: {
    max: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Maximum rating / star count'
    },
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Current rating value'
    },
    name: {
      control: 'text',
      description: 'Form field name'
    },
    color: {
      control: 'text',
      description: 'Active star color (CSS color value)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interaction and submission value'
    },
    required: {
      control: 'boolean',
      description: 'Require a value in form validation'
    },
    readonly: {
      control: 'boolean',
      description: 'Read-only but still visible value'
    }
  }
};

const baseTemplate = (args) => html`
  <pds-rating
    max="${args.max}"
    value="${args.value}"
    name="${args.name}"
    color="${args.color || ''}"
    ?disabled="${args.disabled}"
    ?required="${args.required}"
    ?readonly="${args.readonly}">
  </pds-rating>
`;

export const Default = {
  name: 'Interactive Playground',
  render: baseTemplate,
  args: {
    max: 5,
    value: 3.5,
    name: 'rating',
    color: '',
    disabled: false,
    required: false,
    readonly: false
  }
};

export const States = {
  render: () => html`
    <div class="stack-md">
      <label class="stack-2xs">
        <span>Default (editable)</span>
        <pds-rating max="5" value="4" name="default-rating"></pds-rating>
      </label>
      <label class="stack-2xs">
        <span>Accent color variant</span>
        <pds-rating max="5" value="3.5" color="var(--color-accent-500)" name="color-rating"></pds-rating>
      </label>
      <label class="stack-2xs">
        <span>Read-only</span>
        <pds-rating max="5" value="2.5" readonly name="readonly-rating"></pds-rating>
      </label>
      <label class="stack-2xs">
        <span>Disabled</span>
        <pds-rating max="5" value="3" disabled name="disabled-rating"></pds-rating>
      </label>
    </div>
  `
};

export const InForm = {
  render: () => html`
    <form id="rating-story-form" class="stack-sm" @submit="${(event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const output = form.querySelector('[data-output]');
      output.textContent = `Submitted rating: ${String(data.get('experience') ?? '(none)')}`;
    }}">
      <label class="stack-2xs">
        <span>How was your experience?</span>
        <pds-rating max="5" value="4.5" required name="experience"></pds-rating>
      </label>
      <button type="submit" class="btn-primary">Submit</button>
      <p class="text-muted" data-output>Submitted rating: (none)</p>
    </form>
  `
};
