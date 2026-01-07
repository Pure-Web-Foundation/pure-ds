import { html } from 'lit';
import { enhancementHeader } from './_enhancement-header.js';

export default {
  title: 'Enhancements/Open Groups',
  tags: ['fieldset', 'radio', 'checkbox', 'dynamic', 'custom-option'],
  parameters: {
    pds: {
      tags: ['fieldset', 'radio', 'checkbox', 'dynamic', 'custom-option', 'data-open', 'forms', 'interaction', 'enhancement']
    }
  }
};

export const RadioGroupOpen = () => html`
  ${enhancementHeader('openGroup')}
  <section class="card stack-md max-w-md">
    <header>
      <h3>Select Your Preferences</h3>
      <small class="text-muted">Choose from existing options or add your own</small>
    </header>
    <fieldset role="group" data-open>
      <legend>Favorite Programming Language</legend>
      <label>
        <span data-label>JavaScript</span>
        <input value="javascript" name="language" type="radio">
      </label>
      <label>
        <span data-label>Python</span>
        <input value="python" name="language" type="radio">
      </label>
      <label>
        <span data-label>TypeScript</span>
        <input value="typescript" name="language" type="radio">
      </label>
    </fieldset>
  </section>
`;

export const CheckboxGroupOpen = () => html`
  ${enhancementHeader('openGroup')}
  <section class="card stack-md max-w-md">
    <header>
      <h3>Select Features</h3>
      <small class="text-muted">Select multiple features and add custom ones</small>
    </header>
    <fieldset role="group" data-open>
      <legend>Desired Features</legend>
      <label>
        <span data-label>Dark Mode</span>
        <input value="dark-mode" name="features" type="checkbox">
      </label>
      <label>
        <span data-label>Notifications</span>
        <input value="notifications" name="features" type="checkbox">
      </label>
      <label>
        <span data-label>Analytics</span>
        <input value="analytics" name="features" type="checkbox">
      </label>
    </fieldset>
  </section>
`;

export const InForm = () => html`
  ${enhancementHeader('openGroup')}
  <form
    class="card stack-md max-w-md"
    @submit="${(event) => {
      event.preventDefault();
      window.toastFormData(new FormData(event.target));
    }}"
  >
    <h3>Survey Form</h3>

    <fieldset role="group" data-open>
      <legend>How did you hear about us?</legend>
      <label>
        <span data-label>Social Media</span>
        <input value="social" name="source" type="radio">
      </label>
      <label>
        <span data-label>Search Engine</span>
        <input value="search" name="source" type="radio">
      </label>
      <label>
        <span data-label>Friend</span>
        <input value="friend" name="source" type="radio">
      </label>
    </fieldset>

    <fieldset role="group" data-open>
      <legend>Interests (select all that apply)</legend>
      <label>
        <span data-label>Web Development</span>
        <input value="webdev" name="interests" type="checkbox">
      </label>
      <label>
        <span data-label>Design</span>
        <input value="design" name="interests" type="checkbox">
      </label>
      <label>
        <span data-label>Marketing</span>
        <input value="marketing" name="interests" type="checkbox">
      </label>
    </fieldset>

    <div class="flex gap-sm">
      <button type="submit" class="btn-primary">Submit Survey</button>
    </div>
  </form>
`;

export const PrefilledValues = () => html`
  ${enhancementHeader('openGroup')}
  <section class="card stack-md max-w-md">
    
    <header>
      <h3>Tag Editor</h3>
      <small class="text-muted">Select existing tags or create new ones by typing and pressing Enter</small>
    </header>

    <fieldset role="group" data-open>
      <legend>Article Tags</legend>
      <label>
        <span data-label>JavaScript</span>
        <input value="javascript" name="tags" type="checkbox" checked>
      </label>
      <label>
        <span data-label>Tutorial</span>
        <input value="tutorial" name="tags" type="checkbox" checked>
      </label>
      <label>
        <span data-label>Beginner</span>
        <input value="beginner" name="tags" type="checkbox">
      </label>
      <label>
        <span data-label>Advanced</span>
        <input value="advanced" name="tags" type="checkbox">
      </label>
    </fieldset>
  </section>
`;

export const InCard = () => html`
  ${enhancementHeader('openGroup')}
  <article class="card stack-md max-w-md">
    <header>
      <h3>Customize Your Experience</h3>
      <small class="text-muted">Choose your preferences and add custom options as needed</small>
    </header>

    <fieldset role="group" data-open>
      <legend>Notification Channels</legend>
      <label>
        <span data-label>Email</span>
        <input value="email" name="channels" type="checkbox" checked>
      </label>
      <label>
        <span data-label>SMS</span>
        <input value="sms" name="channels" type="checkbox">
      </label>
      <label>
        <span data-label>Push</span>
        <input value="push" name="channels" type="checkbox" checked>
      </label>
    </fieldset>

    <button class="btn-primary">Save Preferences</button>
  </article>
`;
