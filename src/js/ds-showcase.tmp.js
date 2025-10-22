import { LitElement, html } from "./lit";

class DsShowcase extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`<div class="showcase-placeholder">Design system showcase (minimal)</div>`;
  }
}

customElements.define("ds-showcase", DsShowcase);

export { DsShowcase };
