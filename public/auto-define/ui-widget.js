import { LitElement, html, css } from "/assets/js/lit.js";

customElements.define(
  "ui-widget",
  class extends LitElement {
    static get styles() {
      return [
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
            margin-bottom: 1rem;
            --widget-padding-default: 0.8rem 1.3rem 0.7rem;
          }

          h3 {
            display: block;
            padding: var(--widget-header-padding, var(--widget-padding-default));
            margin: 0;
            border: 2px solid var(--color-widget-border, white);
            border-bottom: none;
            border-radius: 1rem 1rem 0 0;
            background-color: var(--label-color, #eae6e6);
            color: var(--label-text-color, black);
            font-size: 1rem;
            --icon-fill-color: var(--color-primary-200);
            --icon-size: 17px;
            line-height: 1.1rem;
          }

          .label {
            display: block;
          }

          .sublabel {
            display: block;
            font-size: small;
            opacity: 0.7;
          }

          .widget-body {
            min-height: var(--min-widget-height, 120px);
            min-width: 250px;
            padding: var(--widget-body-padding, var(--widget-padding-default));
            border: 2px solid var(--color-widget-border, white);
            border-top: none;
            border-radius: 0 0 1rem 1rem;
            background: var(--widget-body-background, var(--color-panel));

            &.__video {
              background-color: rgba(0, 0, 0, 0.8);
            }
          }

          :host([body-class="video"]) {
            position: relative;
            --label-color: transparent;

            h3 {
              position: absolute;
              width: 99%;
              width: -webkit-fill-available;
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 1rem 1rem 0 0;
              border: 0;
              color: white;
              font-weight: 200;
            }
            video {
              margin-bottom: 0;
            }

            .widget-body {
              border-radius: 1rem;
              border: 0;
              background-color: rgba(0, 0, 0, 0.5);
            }
            .widget {
              margin-bottom: 0;
            }
          }

          .widget.no-padding .widget-body {
            padding: 0;

            &::slotted {
              border-radius: 0 0 1rem 1rem;
            }
          }

          .widget.no-margin {
            margin: 0;

            &::slotted {
              border-radius: 0 0 1rem 1rem;
            }
          }

          ::slotted(ui-widget) {
            --label-color: white;
            --min-widget-height: 0;
            --widget-padding: 0.4rem 0;
          }
        `,
      ];
    }

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
