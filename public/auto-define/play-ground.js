import { LitElement, html } from "/assets/js/lit.js";

customElements.define(
  "play-ground",
  class extends LitElement {
    createRenderRoot() {
      return this; // Disable shadow DOM
    }

    render() {
      return html`
        <div class="app-layout">
          <button @click=${this.openDrawer}>Open Drawer</button>

          <drawer-panel position="bottom" id="exampleDrawer">
            <div class="surface-overlay" slot="drawer-header">
              <h3>Example Drawer</h3>
            </div>
            <div class="surface-overlay" slot="drawer-content">
              Drawer content goes here.
            </div>
          </drawer-panel>

          <tab-strip label="Example tabs">
            <tab-panel id="intro" label="Intro">
              <p>
                This is the <strong>intro</strong> tab content. It is visible by
                default.
              </p>
            </tab-panel>

            <tab-panel id="features" label="Features">
              <ul>
                <li>✅ Animated underline indicator</li>
                <li>✅ URL sync without scroll jumps</li>
                <li>✅ Keyboard navigation with arrow keys</li>
              </ul>
            </tab-panel>

            <tab-panel id="about" label="About">
              <p>
                The tabstrip is a pure web component built with Lit — no
                frameworks, just standards.
              </p>
            </tab-panel>
          </tab-strip>
        </div>
      `;
    }

    openDrawer() {
      const drawer = this.querySelector("#exampleDrawer");
      if (drawer) {
        drawer.open = !drawer.open;
      }
    }
  }
);
