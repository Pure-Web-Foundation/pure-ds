import "./pds-config-form.js";
import "./pds-demo.js";

customElements.define(
  "pds-configurator",
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = this.render();

    }

    render() {
      return /* html */ `
        <pds-splitpanel class="app-layout" layout="horizontal" default-split="300px">
          <pds-config-form slot="left" show-inspector show-preset-selector show-theme-selector></pds-config-form>
          <pds-demo slot="right"></pds-demo>
        </pds-splitpanel>
    `;
    }
  }
);
