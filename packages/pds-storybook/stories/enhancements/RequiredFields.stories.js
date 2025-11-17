import { html } from 'lit';

export default {
  title: 'Enhancements/Required Fields',
  parameters: {
    docs: {
      description: {
        component: 'Automatic asterisk indicators for required form fields'
      }
    }
  }
};

export const BasicRequired = () => html`
  <form style="max-width: 400px;">
    <label>
      <span>Full Name</span>
      <input type="text" required placeholder="John Doe">
    </label>
    <label>
      <span>Email</span>
      <input type="email" required placeholder="john@example.com">
    </label>
    <label>
      <span>Phone (optional)</span>
      <input type="tel" placeholder="+1 (555) 123-4567">
    </label>
    <button type="submit" class="btn-primary">Submit</button>
  </form>
`;

export const MixedRequired = () => html`
  <form style="max-width: 500px;">
    <fieldset>
      <legend>Account Information</legend>
      <label>
        <span>Username</span>
        <input type="text" required placeholder="username">
      </label>
      <label>
        <span>Password</span>
        <input type="password" required placeholder="••••••••">
      </label>
      <label>
        <span>Confirm Password</span>
        <input type="password" required placeholder="••••••••">
      </label>
    </fieldset>
    
    <fieldset style="margin-top: var(--spacing-4);">
      <legend>Optional Details</legend>
      <label>
        <span>Company</span>
        <input type="text" placeholder="Acme Corp">
      </label>
      <label>
        <span>Website</span>
        <input type="url" placeholder="https://example.com">
      </label>
    </fieldset>
    
    <div style="margin-top: var(--spacing-4);">
      <button type="submit" class="btn-primary">Create Account</button>
    </div>
  </form>
`;

export const InlineHelp = () => html`
  <form style="max-width: 500px;">
    <label>
      <span>Email Address</span>
      <input type="email" required placeholder="you@example.com">
      <small style="color: var(--surface-text-secondary); display: block; margin-top: 0.25rem;">
        We'll never share your email with anyone else.
      </small>
    </label>
    <label style="margin-top: var(--spacing-3);">
      <span>Password</span>
      <input type="password" required placeholder="••••••••">
      <small style="color: var(--surface-text-secondary); display: block; margin-top: 0.25rem;">
        Must be at least 8 characters long.
      </small>
    </label>
    <label style="margin-top: var(--spacing-3);">
      <span>Newsletter Frequency</span>
      <select>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Never</option>
      </select>
      <small style="color: var(--surface-text-secondary); display: block; margin-top: 0.25rem;">
        Optional - choose how often you want updates.
      </small>
    </label>
    <button type="submit" class="btn-primary" style="margin-top: var(--spacing-4);">Sign Up</button>
  </form>
`;
