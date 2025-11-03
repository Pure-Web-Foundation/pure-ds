import "./pds-config-form";
import "./pds-demo";

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
          <pds-config-form slot="left"></pds-config-form>
          <pds-demo slot="right"></pds-demo>
        </pds-splitpanel>
    `;
    }
  }
);
