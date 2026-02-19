import { html } from "#pds/lit";
import { enhancementHeader } from "./_enhancement-header.js";

export default {
  title: "Enhancements/Color Input",
  tags: ["color", "input", "form", "enhancement"],
  parameters: {
    options: {
      selectedPanel: "html-preview/panel",
    },
    pds: {
      tags: ["color", "input", "label[data-color]", "enhancement"],
    },
  },
};

export const Basic = () => html`
  ${enhancementHeader("colorInput")}
  <section class="card stack-md max-w-sm">
    <label data-color>
      <span>Brand color</span>
      <input type="color" name="brandColor" value="#7c3aed" />
    </label>
  </section>
`;

export const MultipleSemanticColors = () => html`
  ${enhancementHeader("colorInput")}
  <form
    class="card stack-md max-w-md"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label data-color>
      <span>Primary</span>
      <input type="color" name="primary" value="#0e7490" />
    </label>
    <label data-color>
      <span>Accent</span>
      <input type="color" name="accent" value="#e54271" />
    </label>
    <label data-color>
      <span>Success (derived default)</span>
      <input type="color" name="success" value="#16a34a" />
    </label>
    <button class="btn-primary" type="submit">Apply Colors</button>
  </form>
`;

export const WithinPdsForm = () => html`
  ${enhancementHeader("colorInput")}
  <section class="card stack-md max-w-md">
    <small class="text-muted">
      Color widgets in pds-form are enhanced by default using <code>label[data-color]</code>.
    </small>
    <pds-form
      data-required
      hide-actions
      .jsonSchema=${{
        type: "object",
        properties: {
          colors: {
            type: "object",
            title: "Theme Colors",
            properties: {
              primary: {
                type: "string",
                format: "color",
                title: "Primary",
                examples: ["#0e7490"],
              },
              warning: {
                type: "string",
                format: "color",
                title: "Warning",
                examples: ["#b38600"],
              },
            },
          },
        },
      }}
      .values=${{
        colors: {
          primary: "#0e7490",
          warning: "#b38600",
        },
      }}
    ></pds-form>
  </section>
`;
