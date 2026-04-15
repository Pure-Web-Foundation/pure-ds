/**
 * PDS Enhancer Metadata (live mode only)
 *
 * This file contains description and demoHtml for runtime inspection tools.
 * It is intentionally kept separate from pds-enhancers.js to keep the
 * production pds.js bundle lean.
 */

export const defaultPDSEnhancerMetadata = [
  {
    selector: ".accordion",
    description:
      "Ensures only one <details> element can be open at a time within the accordion.",
    demoHtml: /*html*/`
      <div class="accordion">
        <details>
          <summary>Section 1</summary>
          <p>Content for section 1</p>
        </details>
        <details>
          <summary>Section 2</summary>
          <p>Content for section 2</p>
        </details>
        <details>
          <summary>Section 3</summary>
          <p>Content for section 3</p>
        </details>
      </div>
    `.trim(),
  },
  {
    selector: "nav[data-dropdown]",
    description:
      "Enhances a nav element with data-dropdown to toggle its last child as a dropdown panel (menu, card, form, etc.). Add data-dropdown-close to any clickable descendant that should close the menu on selection.",
    attributes: [
      {
        name: "split-button",
        description:
          "Class that creates a split-button layout by mirroring the default menu item into a primary action button. Uses the first <li> by default, or <li data-default> when present.",
        appliesTo: "nav[data-dropdown]",
      },
      {
        name: "data-dropdown-close",
        description:
          "When clicked (or when a descendant is clicked), closes the currently open dropdown popover.",
        appliesTo: "Any clickable element inside nav[data-dropdown] menu/panel content",
      },
    ],
    demoHtml: /*html*/`
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu>
          <li><a href="#open">Open</a></li>
          <li><a href="#settings" data-dropdown-close>Open settings and close</a></li>
        </menu>
      </nav>
    `.trim(),
  },
  {
    selector: "label[data-toggle]",
    description: "Creates a toggle switch element from a checkbox.",
    demoHtml: /*html*/`
      <label data-toggle>
        <input type="checkbox">
        <span data-label>Enable notifications</span>
      </label>
    `.trim(),
  },
  {
    selector: "label[data-color]",
    description:
      "Wraps color inputs with a styled control shell and synced hex output while keeping the native picker.",
    demoHtml: /*html*/`
      <label data-color>
        <span>Brand color</span>
        <input type="color" value="#7c3aed">
      </label>
    `.trim(),
  },
  {
    selector: 'input[autocomplete="one-time-code"]',
    description:
      "Enhances a single text input into a segmented one-time-code / OTP field with numeric sanitizing, full-code paste support, and optional auto-submit when the expected length is reached.",
    attributes: [
      {
        name: "data-otp-length",
        description:
          "Expected code length. Defaults to the input maxlength, or 6 when neither is provided.",
        appliesTo: 'input[autocomplete="one-time-code"]',
      },
      {
        name: 'data-otp-autosubmit="false"',
        description:
          "Opt out of automatically submitting the parent form when the code is complete.",
        appliesTo: 'input[autocomplete="one-time-code"]',
      },
      {
        name: "data-otp-submit-selector",
        description:
          "Optional selector for the preferred submit button passed to form.requestSubmit().",
        appliesTo: 'input[autocomplete="one-time-code"]',
      },
    ],
    demoHtml: /*html*/`
      <form action="#verify" method="post">
        <label>
          <span data-label>Email address</span>
          <input type="email" autocomplete="email" value="marc@example.com">
        </label>
        <label>
          <span data-label>Verification code</span>
          <input
            autocomplete="one-time-code"
            inputmode="numeric"
            maxlength="6"
            data-otp-length="6"
            aria-describedby="otp-help"
          >
        </label>
        <small id="otp-help" class="field-description">
          We sent a 6-digit code to marc@example.com. You can paste the full code.
        </small>
        <nav class="form-actions">
          <button type="submit" class="btn-primary">Verify</button>
        </nav>
      </form>
    `.trim(),
  },
  {
    selector: 'input[type="range"]',
    description: "Enhances range inputs with an attached <output>.",
    demoHtml: /*html*/`
      <label class="range-output">
        <span data-label>Volume</span>
        <input type="range" min="0" max="100" value="40">
      </label>
    `.trim(),
  },
  {
    selector: "form[data-required]",
    description:
      "Enhances required form fields using an asterisk in the label.",
    demoHtml: /*html*/`
      <form data-required action="#" method="post">
      <label>
        <span>Field Label</span>
        <input type="text" required>
      </label>
        <nav class="form-actions">
          <button type="submit" class="btn-primary">Submit</button>
        </nav>
      </form>
    `.trim(),
  },
  {
    selector: "fieldset[role=group][data-open]",
    description:
      "Enhances a checkbox/radio group to be open (have a way to add and remove items).",
    demoHtml: /*html*/`
      <fieldset role="group" data-open>
        <label>
          <span data-label>Test</span>
          <input value="lala" name="test1" type="radio" />
        </label>
      </fieldset>
    `.trim(),
  },
  {
    selector: "[data-clip]",
    description:
      "Enables click/keyboard toggling for line-clamped content blocks.",
    demoHtml: /*html*/`
      <div data-clip="2" data-clip-more="more...">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
      </div>
    `.trim(),
  },
  {
    selector: "button, a[class*='btn-']",
    description:
      "Automatically manages spinner icon for buttons with .btn-working class",
    demoHtml: /*html*/`
      <button class="btn-primary btn-working">
        <span>Saving</span>
      </button>
    `.trim(),
  },
];
