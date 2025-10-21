import { LitElement, html, css } from "/assets/js/lit.js";
import { pdsRegistry } from "/assets/js/app.js";

// Get PDS stylesheets
const primitives = await pdsRegistry.getStylesheet("primitives");
const components = await pdsRegistry.getStylesheet("components");

customElements.define(
  "ui-widget",
  class extends LitElement {

    static styles = [
      primitives,
      components,
      css`
        :host([data-dialog]) h3 {
          background-color: var(--color-primary-100);
          border-bottom: 1px solid var(--color-primary-400);
        }

        .widget {
          display: block;
          position: relative;
          overflow: var(--ui-widget-overflow, hidden);
          overflow-y: var(--ui-widget-overflow, auto);
          margin-bottom: var(--spacing-4);
          --widget-padding-default: var(--spacing-3) var(--spacing-4) var(--spacing-3);
        }

        h3 {
          display: block;
          padding: var(--widget-header-padding, var(--widget-padding-default));
          margin: 0;
          border: 2px solid var(--color-border, var(--color-widget-border, white));
          border-bottom: none;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          background-color: var(--label-color, var(--color-surface-subtle));
          color: var(--label-text-color, var(--color-text-primary));
          font-size: var(--font-size-base);
          --icon-fill-color: var(--color-primary-200);
          --icon-size: 17px;
          line-height: 1.1;
        }

        .label {
          display: block;
        }

        .sublabel {
          display: block;
          font-size: var(--font-size-sm);
          opacity: 0.7;
        }

        .widget-body {
          min-height: var(--min-widget-height, 120px);
          min-width: 250px;
          padding: var(--widget-body-padding, var(--widget-padding-default));
          border: 2px solid var(--color-border, var(--color-widget-border, white));
          border-top: none;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          background: var(--widget-body-background, var(--color-surface-base));
        }

        .widget-body.__video {
          background-color: rgba(0, 0, 0, 0.8);
        }

        :host([body-class="video"]) {
          position: relative;
          --label-color: transparent;
        }

        :host([body-class="video"]) h3 {
          position: absolute;
          width: 99%;
          width: -webkit-fill-available;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          border: 0;
          color: white;
          font-weight: var(--font-fontWeight-light, 200);
        }

        :host([body-class="video"]) video {
          margin-bottom: 0;
        }

        :host([body-class="video"]) .widget-body {
          border-radius: var(--radius-lg);
          border: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }

        :host([body-class="video"]) .widget {
          margin-bottom: 0;
        }

        .widget.no-padding .widget-body {
          padding: 0;
        }

        .widget.no-padding .widget-body::slotted(*) {
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .widget.no-margin {
          margin: 0;
        }

        .widget.no-margin::slotted(*) {
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        ::slotted(ui-widget) {
          --label-color: white;
          --min-widget-height: 0;
          --widget-padding: var(--spacing-2) 0;
        }
      `
    ];

    static get properties() {
      return {
        label: { type: String, attribute: true },
        noPadding: { type: Boolean, attribute: "no-padding" },
        noMargin: { type: Boolean, attribute: "no-margin" },
        sublabel: { type: String, attribute: true },
        bodyClass: { type: String, attribute: "body-class" },
      };
    }

    render() {
      return html`
        <div class="widget ${this.noPadding ? "no-padding" : ""} ${this.noMargin ? "no-margin" : ""}">
          <h3>
            <span class="label">${this.label}</span>
            <span class="sublabel">${this.sublabel}</span>
          </h3>
          <div class="widget-body ${this.bodyClass ?? ""}">
            <slot></slot>
          </div>
        </div>
      `;
    }
  }
);
