import { html } from "lit";
import { toastFormData } from "../utils/toast-utils.js";

const styles = html`
  <style>
    /* Story-specific styles for form group demos */
    .card:has(fieldset) {
      max-width: 28rem;
    }
  </style>
`;
export default {
  title: 'Primitives/HTML Form Groups',
  tags: ["grouping"],
  parameters: {
    pds: {
      tags: ["forms", "radio", "checkbox", "grouping"],
    },
    docs: {
      description: {
        component: `Accessible radio groups and checkbox groups with proper ARIA attributes and semantic HTML.

## Unified Styling

Radio groups (\`role="radiogroup"\`) and checkbox groups (\`role="group"\`) share the same consolidated styling rules:

### Default Style
Both display with visible native controls in a vertical column layout:
- Column layout with reduced spacing (\`gap: var(--spacing-2)\`)
- Visible native radio buttons or checkboxes with primary accent color
- Clean hover states that highlight text
- Proper focus outlines for accessibility
- Users can override layout with standard flex utilities

### Button Style
Add the \`.buttons\` class to either type for outlined button-style controls:
- Horizontal flex wrap layout
- Outlined style with transparent background
- Selected state: subtle primary tint (8%) with thicker border (2px)
- Compact/dense sizing (75% of regular button height)
- Never looks like filled primary buttons - always outlined
- Works identically for both radio and checkbox groups`,
      },
    },
  },
};

export const RadioGroupDefault = () => html`
  ${styles}
  <div class="card stack-md">
    <header>
      <h3>Radio Group - Default Style</h3>
      <small class="text-muted"
        >Default radio group with visible radio buttons, vertical layout</small
      >
    </header>
    <fieldset role="radiogroup">
      <legend>Select your plan</legend>
      <label>
        <input type="radio" name="plan-default" value="free" checked />
        <span>Free - $0/month</span>
      </label>
      <label>
        <input type="radio" name="plan-default" value="pro" />
        <span>Pro - $29/month</span>
      </label>
      <label>
        <input type="radio" name="plan-default" value="enterprise" />
        <span>Enterprise - $99/month</span>
      </label>
    </fieldset>
  </div>
`;

RadioGroupDefault.storyName = "Radio Group - Default";

export const RadioGroupButtons = () => html`
  ${styles}
  <div class="card stack-md">
    <header>
      <h3>Radio Group - Button Style</h3>
      <small class="text-muted"
        >Add <code>class="buttons"</code> for outlined button-style radio
        controls</small
      >
    </header>
    <fieldset role="radiogroup" class="buttons">
      <legend>Select your plan</legend>
      <label>
        <input type="radio" name="plan-buttons" value="free" checked />
        <span>Free</span>
      </label>
      <label>
        <input type="radio" name="plan-buttons" value="pro" />
        <span>Pro</span>
      </label>
      <label>
        <input type="radio" name="plan-buttons" value="enterprise" />
        <span>Enterprise</span>
      </label>
    </fieldset>
  </div>
`;

RadioGroupButtons.storyName = "Radio Group - Buttons";

export const CheckboxGroupDefault = () => html`
${styles}
  <div class="card stack-md">
    <header>
      <h3>Checkbox Group - Default Style</h3>
      <small class="text-muted"
        >Default checkbox group with visible checkboxes, vertical layout</small
      >
    </header>
    <fieldset role="group">
      <legend>Select features</legend>
      <label>
        <input type="checkbox" name="features-default" value="api" checked />
        <span>API Access</span>
      </label>
      <label>
        <input
          type="checkbox"
          name="features-default"
          value="analytics"
          checked
        />
        <span>Advanced Analytics</span>
      </label>
      <label>
        <input type="checkbox" name="features-default" value="support" />
        <span>Priority Support</span>
      </label>
      <label>
        <input type="checkbox" name="features-default" value="sso" />
        <span>Single Sign-On</span>
      </label>
    </fieldset>
  </div>
`;

CheckboxGroupDefault.storyName = "Checkbox Group - Default";

export const CheckboxGroupButtons = () => html`
${styles}
  <div class="card stack-md">
    <header>
      <h3>Checkbox Group - Button Style</h3>
      <small class="text-muted"
        >Add <code>class="buttons"</code> for outlined button-style
        checkboxes</small
      >
    </header>
    <fieldset role="group" class="buttons">
      <legend>Select features</legend>
      <label>
        <input type="checkbox" name="features-buttons" value="api" checked />
        <span>API Access</span>
      </label>
      <label>
        <input
          type="checkbox"
          name="features-buttons"
          value="analytics"
          checked
        />
        <span>Analytics</span>
      </label>
      <label>
        <input type="checkbox" name="features-buttons" value="support" />
        <span>Support</span>
      </label>
      <label>
        <input type="checkbox" name="features-buttons" value="sso" />
        <span>SSO</span>
      </label>
    </fieldset>
  </div>
`;

CheckboxGroupButtons.storyName = "Checkbox Group - Buttons";

export const StyleComparison = () => html`

${styles}
  <div class="card stack-md">
    <header>
      <h3>Side-by-Side Comparison</h3>
      <small class="text-muted"
        >Compare default vs button styles for both radio and checkbox
        groups</small
      >
    </header>
    <div class="grid grid-cols-2 gap-lg">
      <div class="stack-md">
        <h4>Default Style</h4>

        <fieldset role="radiogroup">
          <legend>Billing Cycle</legend>
          <label>
            <input
              type="radio"
              name="billing-default"
              value="monthly"
              checked
            />
            <span>Monthly</span>
          </label>
          <label>
            <input type="radio" name="billing-default" value="annual" />
            <span>Annual (Save 20%)</span>
          </label>
        </fieldset>

        <fieldset role="group">
          <legend>Add-ons</legend>
          <label>
            <input type="checkbox" name="addons-default" value="backup" />
            <span>Daily Backups (+$5/mo)</span>
          </label>
          <label>
            <input type="checkbox" name="addons-default" value="cdn" />
            <span>Global CDN (+$10/mo)</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="addons-default"
              value="monitoring"
              checked
            />
            <span>24/7 Monitoring (+$15/mo)</span>
          </label>
        </fieldset>
      </div>

      <div class="stack-md">
        <h4>Button Style</h4>

        <fieldset role="radiogroup" class="buttons">
          <legend>Billing Cycle</legend>
          <label>
            <input
              type="radio"
              name="billing-buttons"
              value="monthly"
              checked
            />
            <span>Monthly</span>
          </label>
          <label>
            <input type="radio" name="billing-buttons" value="annual" />
            <span>Annual</span>
          </label>
        </fieldset>

        <fieldset role="group" class="buttons">
          <legend>Add-ons</legend>
          <label>
            <input type="checkbox" name="addons-buttons" value="backup" />
            <span>Backups</span>
          </label>
          <label>
            <input type="checkbox" name="addons-buttons" value="cdn" />
            <span>CDN</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="addons-buttons"
              value="monitoring"
              checked
            />
            <span>Monitoring</span>
          </label>
        </fieldset>
      </div>
    </div>
  </div>
`;

StyleComparison.storyName = "Style Comparison";

export const ToggleSwitches = () => html`
${styles}
  <div class="card stack-md gap-lg">
    <header>
      <h3>Toggle Switches</h3>
      <small class="text-muted"
        >Uses <code>data-toggle</code> attribute for enhanced toggle switch
        styling</small
      >
    </header>

    <section class="card">
      <fieldset role="group">
        <legend>Preferences</legend>

        <label data-toggle>
          <input type="checkbox" name="prefs" value="notifications" checked />
          <span>Enable notifications</span>
        </label>

        <label data-toggle>
          <input type="checkbox" name="prefs" value="dark" />
          <span>Dark mode</span>
        </label>
      </fieldset>
    </section>

    <section class="card">
      <fieldset class="card" role="group">
        <legend>Left-aligned knob</legend>
        <label data-toggle>
          <input type="checkbox" name="prefs" value="autosave" checked />
          <span>Auto-save</span>
        </label>

        <label data-toggle>
          <input type="checkbox" name="prefs" value="tooltips" />
          <span>Show tooltips</span>
        </label>
      </fieldset>
    </section>
  </div>
`;

ToggleSwitches.storyName = "Toggle Switches";

export const CustomLayout = () => html`
${styles}
  <div class="card stack-md">
    <h3>Custom Layout with Flex Utilities</h3>
    <div class="callout callout-info">
      Override default column layout using standard CSS flex properties
    </div>

    <fieldset role="radiogroup" class="flex-row flex-wrap gap-sm">
      <legend>Horizontal Radio Group (flex-direction: row)</legend>
      <label>
        <input type="radio" name="horizontal-radio" value="1" checked />
        <span>Option 1</span>
      </label>
      <label>
        <input type="radio" name="horizontal-radio" value="2" />
        <span>Option 2</span>
      </label>
      <label>
        <input type="radio" name="horizontal-radio" value="3" />
        <span>Option 3</span>
      </label>
    </fieldset>

    <fieldset role="group" class="flex-row flex-wrap gap-sm">
      <legend>Horizontal Checkbox Group (flex-direction: row)</legend>
      <label>
        <input type="checkbox" name="horizontal-check" value="1" checked />
        <span>Feature 1</span>
      </label>
      <label>
        <input type="checkbox" name="horizontal-check" value="2" />
        <span>Feature 2</span>
      </label>
      <label>
        <input type="checkbox" name="horizontal-check" value="3" checked />
        <span>Feature 3</span>
      </label>
    </fieldset>
  </div>
`;

CustomLayout.storyName = "Custom Layout";

export const ButtonStyleVariants = () => html`
${styles}
  <div class="card stack-md">
    <header>
      <h3>Button Style Variants</h3>
      <small class="text-muted"
        >Examples of button-style groups in different contexts</small
      >
    </header>
    <div class="stack-md gap-lg max-w-lg">
      <fieldset role="radiogroup" class="buttons">
        <legend>Subscription Tier</legend>
        <label>
          <input type="radio" name="tier" value="starter" checked />
          <span>Starter</span>
        </label>
        <label>
          <input type="radio" name="tier" value="professional" />
          <span>Professional</span>
        </label>
        <label>
          <input type="radio" name="tier" value="business" />
          <span>Business</span>
        </label>
        <label>
          <input type="radio" name="tier" value="enterprise" />
          <span>Enterprise</span>
        </label>
      </fieldset>

      <fieldset role="group" class="buttons">
        <legend>Available Integrations</legend>
        <label>
          <input type="checkbox" name="integrations" value="slack" checked />
          <span>Slack</span>
        </label>
        <label>
          <input type="checkbox" name="integrations" value="github" checked />
          <span>GitHub</span>
        </label>
        <label>
          <input type="checkbox" name="integrations" value="jira" />
          <span>Jira</span>
        </label>
        <label>
          <input type="checkbox" name="integrations" value="salesforce" />
          <span>Salesforce</span>
        </label>
        <label>
          <input type="checkbox" name="integrations" value="zapier" />
          <span>Zapier</span>
        </label>
      </fieldset>

      <fieldset role="radiogroup" class="buttons">
        <legend>Payment Method</legend>
        <label>
          <input type="radio" name="payment" value="card" checked />
          <span>💳 Credit Card</span>
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" />
          <span>PayPal</span>
        </label>
        <label>
          <input type="radio" name="payment" value="crypto" />
          <span>₿ Crypto</span>
        </label>
      </fieldset>
    </div>
  </div>
`;

ButtonStyleVariants.storyName = "Button Style Variants";

export const AccessibleFormGroups = {
  render: () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    };

    return html`
      <div class="card stack-md">
        <header>
          <h2>Accessibility Features</h2>
          <small class="text-muted"
            >Form groups include proper ARIA attributes, semantic HTML, and
            keyboard navigation support.</small
          >
        </header>
        <div class="card max-w-md">
          <form class="stack-md gap-lg" @submit=${handleSubmit}>
            <fieldset
              role="radiogroup"
              class="buttons"
              aria-describedby="notification-help"
            >
              <legend>Notification Preferences</legend>

              <p>Choose how you'd like to receive notifications</p>

              <fieldset role="group" class="flex flex-row">
                <label>
                  <input
                    type="radio"
                    name="notification"
                    value="email"
                    checked
                  />
                  <span>Email only</span>
                </label>
                <label>
                  <input type="radio" name="notification" value="sms" />
                  <span>SMS only</span>
                </label>
                <label>
                  <input type="radio" name="notification" value="both" />
                  <span>Both</span>
                </label>
                <label>
                  <input type="radio" name="notification" value="none" />
                  <span>None</span>
                </label>
              </fieldset>
            </fieldset>

            <fieldset role="group" aria-describedby="topics-help">
              <legend>Topics to Follow</legend>
              <small id="topics-help" class="text-muted"
                >Select all topics you're interested in</small
              >
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

            <nav class="flex gap-sm">
              <button type="submit" class="btn-primary">
                Save Preferences
              </button>
              <button type="reset" class="btn-secondary">Reset</button>
            </nav>
          </form>
        </div>
      </div>
    `;
  },
};

AccessibleFormGroups.storyName = "Accessible Form Groups";

