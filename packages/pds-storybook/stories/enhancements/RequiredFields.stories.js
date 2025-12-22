import { html } from 'lit';

const requiredFieldsStoryStyles = html`
  <style>
    .required-form {
      max-width: 400px;
      display: grid;
      gap: var(--spacing-3);
    }

    .required-form--wide {
      max-width: 500px;
    }

    .required-fieldset {
      display: grid;
      gap: var(--spacing-3);
    }

    .required-fieldset--spaced {
      margin-top: var(--spacing-4);
    }

    .required-actions {
      margin-top: var(--spacing-4);
    }

    .required-help-text {
      color: var(--surface-text-secondary);
      display: block;
      margin-top: 0.25rem;
    }

    .required-field--spaced {
      margin-top: var(--spacing-3);
    }

    .required-form__button {
      justify-self: start;
    }
  </style>
`;

export default {
  title: 'Enhancements/Required Fields',
  tags: ['required', 'validation', 'form', 'input', 'asterisk'],
  parameters: {
    pds: {
      tags: ['required', 'validation', 'form', 'input', 'asterisk', 'forms', 'interaction', 'enhancement']
    },
    docs: {
      description: {
        component: 'Automatic asterisk indicators for required form fields'
      }
    }
  }
};

export const BasicRequired = () => html`
  ${requiredFieldsStoryStyles}
  <form data-required
    class="required-form"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span>Full Name</span>
      <input type="text" required placeholder="John Doe">
    </label>
    <label>
      <span>Email</span>
      <div class="input-icon">
        <pds-icon icon="envelope"></pds-icon>
        <input type="email" required placeholder="john@example.com">
      </div>
    </label>
    <label>
      <span>Phone (optional)</span>
      <div class="input-icon">
        <pds-icon icon="phone"></pds-icon>
        <input type="tel" placeholder="+1 (555) 123-4567">
      </div>
    </label>
    <button type="submit" class="btn-primary required-form__button">Submit</button>
  </form>
`;

export const MixedRequired = () => html`
  ${requiredFieldsStoryStyles}
  <form data-required
    class="required-form required-form--wide"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <fieldset class="required-fieldset">
      <legend>Account Information</legend>
      <label>
        <span>Username</span>
        <div class="input-icon">
          <pds-icon icon="user"></pds-icon>
          <input type="text" required placeholder="username">
        </div>
      </label>
      <label>
        <span>Password</span>
        <div class="input-icon">
          <pds-icon icon="lock"></pds-icon>
          <input type="password" required placeholder="••••••••">
        </div>
      </label>
      <label>
        <span>Confirm Password</span>
        <div class="input-icon">
          <pds-icon icon="lock"></pds-icon>
          <input type="password" required placeholder="••••••••">
        </div>
      </label>
    </fieldset>

    <fieldset class="required-fieldset required-fieldset--spaced">
      <legend>Optional Details</legend>
      <label>
        <span>Company</span>
        <input type="text" placeholder="Acme Corp">
      </label>
      <label>
        <span>Website</span>
        <div class="input-icon">
          <pds-icon icon="globe"></pds-icon>
          <input type="url" placeholder="https://example.com">
        </div>
      </label>
    </fieldset>

    <div class="required-actions">
      <button type="submit" class="btn-primary required-form__button">Create Account</button>
    </div>
  </form>
`;
