import { html } from 'lit';

export default {
  title: 'Primitives/Form Groups',
  parameters: {
    docs: {
      description: {
        component: 'Accessible radio groups and checkbox groups with proper ARIA attributes and semantic HTML.'
      }
    }
  }
};

export const RadioGroup = () => html`
  <div style="padding: var(--spacing-4);">
    <fieldset role="radiogroup">
      <legend>Select your plan</legend>
      <label>
        <input type="radio" name="plan" value="free" checked />
        <span>Free - $0/month</span>
      </label>
      <label>
        <input type="radio" name="plan" value="pro" />
        <span>Pro - $29/month</span>
      </label>
      <label>
        <input type="radio" name="plan" value="enterprise" />
        <span>Enterprise - $99/month</span>
      </label>
    </fieldset>
  </div>
`;

RadioGroup.storyName = 'Radio Group';

export const CheckboxGroup = () => html`
  <div style="padding: var(--spacing-4);">
    <fieldset role="group">
      <legend>Select features</legend>
      <label>
        <input type="checkbox" name="features" value="api" checked />
        <span>API Access</span>
      </label>
      <label>
        <input type="checkbox" name="features" value="analytics" checked />
        <span>Advanced Analytics</span>
      </label>
      <label>
        <input type="checkbox" name="features" value="support" />
        <span>Priority Support</span>
      </label>
      <label>
        <input type="checkbox" name="features" value="sso" />
        <span>Single Sign-On</span>
      </label>
    </fieldset>
  </div>
`;

CheckboxGroup.storyName = 'Checkbox Group';

export const ToggleSwitches = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Toggle Switches (Progressive Enhancement)</h3>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      Uses <code>data-toggle</code> attribute for enhanced styling
    </p>
    
    <fieldset>
      <legend>Preferences</legend>

      <label data-toggle>
        <input type="checkbox" checked />
        <span>Enable notifications</span>
      </label>

      <label data-toggle>
        <input type="checkbox" />
        <span>Dark mode</span>
      </label>

      <label data-toggle>
        <input type="checkbox" checked />
        <span>Auto-save</span>
      </label>
      
      <label data-toggle>
        <input type="checkbox" />
        <span>Show tooltips</span>
      </label>
    </fieldset>
  </div>
`;

ToggleSwitches.storyName = 'Toggle Switches';

export const MixedFormGroups = () => html`
  <div style="padding: var(--spacing-4);">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-6);">
      <div>
        <fieldset role="radiogroup">
          <legend>Billing Cycle</legend>
          <label>
            <input type="radio" name="billing" value="monthly" checked />
            <span>Monthly</span>
          </label>
          <label>
            <input type="radio" name="billing" value="annual" />
            <span>Annual (Save 20%)</span>
          </label>
        </fieldset>
      </div>

      <div>
        <fieldset role="group">
          <legend>Add-ons</legend>
          <label>
            <input type="checkbox" name="addons" value="backup" />
            <span>Daily Backups (+$5/mo)</span>
          </label>
          <label>
            <input type="checkbox" name="addons" value="cdn" />
            <span>Global CDN (+$10/mo)</span>
          </label>
          <label>
            <input type="checkbox" name="addons" value="monitoring" checked />
            <span>24/7 Monitoring (+$15/mo)</span>
          </label>
        </fieldset>
      </div>
    </div>
  </div>
`;

MixedFormGroups.storyName = 'Mixed Form Groups';

export const AccessibleFormGroups = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Accessibility Features</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Form groups include proper ARIA attributes, semantic HTML, and keyboard navigation support.
    </p>
    
    <div class="card" style="padding: var(--spacing-6); max-width: 600px;">
      <form onsubmit="event.preventDefault(); alert('Form submitted!');">
        <fieldset role="radiogroup" aria-describedby="notification-help">
          <legend>Notification Preferences</legend>
          <p id="notification-help" style="font-size: 0.9rem; opacity: 0.8; margin-bottom: var(--spacing-3);">
            Choose how you'd like to receive notifications
          </p>
          <label>
            <input type="radio" name="notification" value="email" checked />
            <span>Email only</span>
          </label>
          <label>
            <input type="radio" name="notification" value="sms" />
            <span>SMS only</span>
          </label>
          <label>
            <input type="radio" name="notification" value="both" />
            <span>Both email and SMS</span>
          </label>
          <label>
            <input type="radio" name="notification" value="none" />
            <span>No notifications</span>
          </label>
        </fieldset>

        <fieldset role="group" style="margin-top: var(--spacing-6);" aria-describedby="topics-help">
          <legend>Topics to Follow</legend>
          <p id="topics-help" style="font-size: 0.9rem; opacity: 0.8; margin-bottom: var(--spacing-3);">
            Select all topics you're interested in
          </p>
          <label data-toggle>
            <input type="checkbox" name="topics" value="product" checked />
            <span>Product Updates</span>
          </label>
          <label data-toggle>
            <input type="checkbox" name="topics" value="security" checked />
            <span>Security Alerts</span>
          </label>
          <label data-toggle>
            <input type="checkbox" name="topics" value="marketing" />
            <span>Marketing & Promotions</span>
          </label>
        </fieldset>

        <div style="margin-top: var(--spacing-6);">
          <button type="submit" class="btn-primary">Save Preferences</button>
          <button type="reset" class="btn-secondary" style="margin-left: var(--spacing-2);">Reset</button>
        </div>
      </form>
    </div>
  </div>
`;

AccessibleFormGroups.storyName = 'Accessible Form Groups';
