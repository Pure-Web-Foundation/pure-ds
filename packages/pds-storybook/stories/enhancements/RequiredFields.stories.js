import { html } from 'lit';

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
  <form data-required class="card max-w-sm"
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
    <button type="submit" class="btn-primary">Submit</button>
  </form>
`;

export const MixedRequired = () => html`
  <form data-required class="card max-w-md"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <fieldset>
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

    <fieldset>
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

    <nav class="flex gap-sm">
      <button type="submit" class="btn-primary">Create Account</button>
    </nav>
  </form>
`;
