import { html } from 'lit';
import { enhancementHeader } from './_enhancement-header.js';

export default {
  title: 'Enhancements/Required Fields',
  tags: ['required', 'validation', 'form', 'input', 'asterisk'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['required', 'validation', 'form', 'input', 'asterisk', 'forms', 'interaction', 'enhancement']
    }
  }
};

export const BasicRequired = () => html`
  ${enhancementHeader('required')}
  <form data-required class="card max-w-sm"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span data-label>Full Name</span>
      <input type="text" required placeholder="John Doe">
    </label>
    <label>
      <span data-label>Email</span>
      <div class="input-icon">
        <pds-icon icon="envelope"></pds-icon>
        <input type="email" required placeholder="john@example.com">
      </div>
    </label>
    <label>
      <span data-label>Phone (optional)</span>
      <div class="input-icon">
        <pds-icon icon="phone"></pds-icon>
        <input type="tel" placeholder="+1 (555) 123-4567">
      </div>
    </label>
    <button type="submit" class="btn-primary">Submit</button>
  </form>
`;

export const MixedRequired = () => html`
  ${enhancementHeader('required')}
  <form data-required class="card max-w-md"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <fieldset>
      <legend>Account Information</legend>
      <label>
        <span data-label>Username</span>
        <div class="input-icon">
          <pds-icon icon="user"></pds-icon>
          <input type="text" required placeholder="username">
        </div>
      </label>
      <label>
        <span data-label>Password</span>
        <div class="input-icon">
          <pds-icon icon="lock"></pds-icon>
          <input type="password" required placeholder="••••••••">
        </div>
      </label>
      <label>
        <span data-label>Confirm Password</span>
        <div class="input-icon">
          <pds-icon icon="lock"></pds-icon>
          <input type="password" required placeholder="••••••••">
        </div>
      </label>
    </fieldset>

    <fieldset>
      <legend>Optional Details</legend>
      <label>
        <span data-label>Company</span>
        <input type="text" placeholder="Acme Corp">
      </label>
      <label>
        <span data-label>Website</span>
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
