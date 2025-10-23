import "./ds-designer";
import "./ds-showcase";

customElements.define(
  "ds-app",
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = this.render();

      // Load showcase.css AFTER design tokens are available
      // This ensures all CSS custom properties referenced in showcase.css exist
      const showcaseLink = document.createElement("link");
      showcaseLink.rel = "stylesheet";
      showcaseLink.href = "/assets/css/showcase.css";
      document.head.appendChild(showcaseLink);
    }

    render() {
      return /* html */ `
        <pds-splitpanel class="app-layout" layout="horizontal" default-split="300px">
          <ds-designer slot="left"></ds-designer>
          <ds-showcase slot="right"></ds-showcase>
        </pds-splitpanel>
    `;
    }
  }
);
