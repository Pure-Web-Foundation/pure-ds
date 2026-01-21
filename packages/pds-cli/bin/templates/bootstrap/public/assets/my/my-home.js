/**
 * @file my-home.js
 * @description A simple home component for the app.
 */
customElements.define(
  "my-home",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
        <article class="hero">
          <h1>Welcome to your new App</h1>
          <div>
            <p>
              This <code>&lt;my-home&gt;</code> Web Component is lazy-loaded and styled with Pure Design System.
            </p>
            <p>
              You can start building your app by editing the files in <code>public/assets/my/</code> and <code>src/js/</code>.
            </p>
          </div>
          <nav>
            <a target="_blank" href="https://github.com/Pure-Web-Foundation/pure-ds/blob/main/getting-started.md" class="btn btn-primary btn-lg">
              <pds-icon icon="rocket"></pds-icon> Get Started
            </a>
            <a target="_blank" href="https://puredesignsystem.z6.web.core.windows.net/storybook/" class="btn btn-secondary btn-lg">
              <pds-icon icon="book-open"></pds-icon> Storybook
            </a>
          </nav>
        </article>
      `;
    }
  },
);
