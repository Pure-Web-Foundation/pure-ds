import { html } from "lit";

export default {
  title: "Enhancements/Open Groups",
  parameters: {
    docs: {
      description: {
        component:
          "Dynamic checkbox/radio groups that allow users to add custom options at runtime using the data-open attribute",
      },
    },
  },
};

export const RadioGroupOpen = () => html`
  <div style="max-width: 600px;">
    <h3>Select Your Preferences</h3>
    <p
      style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);"
    >
      Choose from existing options or add your own
    </p>
    <fieldset role="group" data-open>
      <legend>Favorite Programming Language</legend>
      <label>
        <span data-label>JavaScript</span>
        <input value="javascript" name="language" type="radio" />
      </label>
      <label>
        <span data-label>Python</span>
        <input value="python" name="language" type="radio" />
      </label>
      <label>
        <span data-label>TypeScript</span>
        <input value="typescript" name="language" type="radio" />
      </label>
    </fieldset>
  </div>
`;

export const CheckboxGroupOpen = () => html`
  <div style="max-width: 600px;">
    <h3>Select Features</h3>
    <p
      style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);"
    >
      Select multiple features and add custom ones
    </p>
    <fieldset role="group" data-open>
      <legend>Desired Features</legend>
      <label>
        <span data-label>Dark Mode</span>
        <input value="dark-mode" name="features" type="checkbox" />
      </label>
      <label>
        <span data-label>Notifications</span>
        <input value="notifications" name="features" type="checkbox" />
      </label>
      <label>
        <span data-label>Analytics</span>
        <input value="analytics" name="features" type="checkbox" />
      </label>
    </fieldset>
  </div>
`;

export const InForm = () => html`
  <form
    style="max-width: 600px;"
    onsubmit="event.preventDefault(); window.toastFormData(new FormData(event.target));"
  >
    <h3>Survey Form</h3>

    <fieldset role="group" data-open style="margin-bottom: var(--spacing-4);">
      <legend>How did you hear about us?</legend>
      <label>
        <span data-label>Social Media</span>
        <input value="social" name="source" type="radio" />
      </label>
      <label>
        <span data-label>Search Engine</span>
        <input value="search" name="source" type="radio" />
      </label>
      <label>
        <span data-label>Friend</span>
        <input value="friend" name="source" type="radio" />
      </label>
    </fieldset>

    <fieldset role="group" data-open style="margin-bottom: var(--spacing-4);">
      <legend>Interests (select all that apply)</legend>
      <label>
        <span data-label>Web Development</span>
        <input value="webdev" name="interests" type="checkbox" />
      </label>
      <label>
        <span data-label>Design</span>
        <input value="design" name="interests" type="checkbox" />
      </label>
      <label>
        <span data-label>Marketing</span>
        <input value="marketing" name="interests" type="checkbox" />
      </label>
    </fieldset>

    <div class="form-actions">
      <button type="submit" class="btn-primary">Submit Survey</button>
    </div>
  </form>
`;

export const PrefilledValues = () => html`
  <div style="max-width: 600px;">
    <h3>Tag Editor</h3>
    <p
      style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);"
    >
      Select existing tags or create new ones by typing and pressing Enter
    </p>
    <fieldset role="group" data-open data-name="tags">
      <legend>Article Tags</legend>
      <label>
        <span data-label>JavaScript</span>
        <input value="javascript" name="tags" type="checkbox" checked />
      </label>
      <label>
        <span data-label>Tutorial</span>
        <input value="tutorial" name="tags" type="checkbox" checked />
      </label>
      <label>
        <span data-label>Beginner</span>
        <input value="beginner" name="tags" type="checkbox" />
      </label>
      <label>
        <span data-label>Advanced</span>
        <input value="advanced" name="tags" type="checkbox" />
      </label>
    </fieldset>
  </div>
`;

export const InCard = () => html`
  <article class="card" style="max-width: 600px;">
    <h3>Customize Your Experience</h3>
    <p
      style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);"
    >
      Choose your preferences and add custom options as needed
    </p>

    <fieldset role="group" data-open>
      <legend>Notification Channels</legend>
      <label>
        <span data-label>Email</span>
        <input value="email" name="channels" type="checkbox" checked />
      </label>
      <label>
        <span data-label>SMS</span>
        <input value="sms" name="channels" type="checkbox" />
      </label>
      <label>
        <span data-label>Push</span>
        <input value="push" name="channels" type="checkbox" checked />
      </label>
    </fieldset>

    <div style="margin-top: var(--spacing-4);">
      <button class="btn-primary">Save Preferences</button>
    </div>
  </article>
`;
