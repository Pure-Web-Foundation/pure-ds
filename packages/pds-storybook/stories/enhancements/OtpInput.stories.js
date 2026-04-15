import { html } from '#pds/lit';
import { enhancementHeader } from './_enhancement-header.js';

const oneTimeCodeAutocomplete = /** @type {any} */ ('one-time-code');

export default {
  title: 'Enhancements/input[autocomplete="one-time-code"]',
  tags: ['otp', 'one-time-code', 'input', 'forms', 'accessibility', 'enhancement'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['otp', 'one-time-code', 'input', 'forms', 'accessibility', 'enhancement']
    }
  }
};

export const Basic = () => html`
  ${enhancementHeader('otp')}
  <section class="card stack-md max-w-sm">
    <label>
      <span data-label>Email address</span>
      <input type="email" name="email" autocomplete="email" value="marc@example.com">
    </label>
    <label>
      <span data-label>Verification code</span>
      <input
        name="otp"
        autocomplete=${oneTimeCodeAutocomplete}
        inputmode="numeric"
        maxlength="6"
        data-otp-length="6"
        aria-describedby="otp-help-basic"
      >
    </label>
    <small id="otp-help-basic" class="field-description">
      We sent a 6-digit code to <strong>marc@example.com</strong>.
    </small>
  </section>
`;

export const PasteAndAutoSubmit = () => html`
  ${enhancementHeader('otp')}
  <form
    class="card stack-md max-w-sm"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span data-label>Email address</span>
      <input type="email" name="email" autocomplete="email" value="marc@example.com">
    </label>
    <label>
      <span data-label>Verification code</span>
      <input
        name="otp"
        autocomplete=${oneTimeCodeAutocomplete}
        inputmode="numeric"
        maxlength="6"
        data-otp-length="6"
        aria-describedby="otp-help-autosubmit"
      >
    </label>
    <small id="otp-help-autosubmit" class="field-description">
      Paste <code>123456</code> or type all 6 digits to verify the sign-in for <strong>marc@example.com</strong>.
    </small>
    <nav class="form-actions">
      <button type="submit" class="btn-primary">Verify</button>
    </nav>
  </form>
`;

PasteAndAutoSubmit.storyName = 'Paste 6 chars + auto-submit';

export const AlphanumericMode = () => html`
  ${enhancementHeader('otp', {
    description: ' Use <code>data-otp-format="alphanumeric"</code> when the code is not digits-only.'
  })}
  <form
    class="card stack-md max-w-sm"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span data-label>Email address</span>
      <input type="email" name="email" autocomplete="email" value="security@example.com">
    </label>
    <label>
      <span data-label>Recovery code</span>
      <input
        name="recoveryCode"
        autocomplete=${oneTimeCodeAutocomplete}
        maxlength="8"
        data-otp-length="8"
        data-otp-format="alphanumeric"
        data-otp-autosubmit="false"
        aria-describedby="otp-help-alphanumeric"
      >
    </label>
    <small id="otp-help-alphanumeric" class="field-description">
      Accepts letters and digits, keeps the segmented visual style, and leaves submit manual for the recovery flow.
    </small>
    <nav class="form-actions">
      <button type="submit" class="btn-secondary">Validate</button>
    </nav>
  </form>
`;

AlphanumericMode.storyName = 'Alphanumeric code';
