import { html, lazyProps } from "#pds/lit";

const languageOptions = [
  { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
  { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
  { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
  { id: "ar", text: "Arabisch", description: "SA · Arabic", category: "Languages" },
  { id: "bs", text: "Bosnisch", description: "BA · Bosnia and Herzegovina", category: "Languages" },
  { id: "bg", text: "Bulgaars", description: "BG · Bulgaria", category: "Languages" },
  { id: "fr", text: "Frans", description: "FR · France", category: "Languages" },
  { id: "de", text: "Duits", description: "DE · Germany", category: "Languages" },
  { id: "es", text: "Spaans", description: "ES · Spain", category: "Languages" },
  { id: "en", text: "Engels", description: "US · United Kingdom", category: "Languages" },
];

const groupedOptions = [
  { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
  { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
  { id: "react", text: "React", description: "Frontend", category: "Skills" },
  { id: "wc", text: "Web Components", description: "Frontend", category: "Skills" },
  { id: "figma", text: "Figma", description: "Design tooling", category: "Tools" },
  { id: "storybook", text: "Storybook", description: "Component docs", category: "Tools" },
];

const createSettingsFromItems = (items) => {
  const byCategory = items.reduce((map, item) => {
    const key = item.category || "Options";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
    return map;
  }, new Map());

  const categories = {};
  for (const [categoryName, entries] of byCategory.entries()) {
    categories[categoryName] = {
      trigger: () => true,
      getItems: async (options) => {
        const query = (options?.search || "").trim().toLowerCase();
        return entries.filter((item) => {
          if (!query) return true;
          return (
            item.text.toLowerCase().includes(query)
            || item.id.toLowerCase().includes(query)
            || (item.description || "").toLowerCase().includes(query)
          );
        });
      },
    };
  }

  return {
    hideCategory: false,
    categories,
  };
};

const languageSettings = createSettingsFromItems(languageOptions);
const groupedSettings = createSettingsFromItems(groupedOptions);

const sourceCode = `<pds-tags
  name="languages"
  placeholder="Zoek taal..."
  value="et,bd,nl"
  ${"${lazyProps({ settings: languageSettings })}"}
></pds-tags>`;

const defaultDocs = {
  description: {
    component: "Compound multi-select built with pds-omnibox. Select/unselect values from suggestions and manage them as tags.",
  },
};

export default {
  title: "Components/pds-tags",
  tags: ["autodocs", "forms", "autocomplete", "multiselect", "pds-tags"],
  parameters: {
    docs: defaultDocs,
  },
  argTypes: {
    name: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

const Template = ({ name, placeholder, value, required, disabled }) => html`
  <div class="stack-md">
    <pds-tags
      name=${name}
      placeholder=${placeholder}
      value=${value}
      ?required=${required}
      ?disabled=${disabled}
      ${lazyProps({ settings: languageSettings })}
    ></pds-tags>
  </div>
`;

const FormTemplate = ({ required }) => {
  setTimeout(() => {
    const form = document.querySelector("#tags-form");
    const output = document.querySelector("#tags-output");
    if (!form || !output || form.dataset.bound === "true") return;

    form.dataset.bound = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        output.textContent = "Form invalid";
        return;
      }
      const data = new FormData(form);
      const languages = data.getAll("languages");
      output.textContent = JSON.stringify({ languages }, null, 2);
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        output.textContent = "{}";
      }, 0);
    });
  }, 0);

  return html`
    <section class="card stack-md">
      <h4>Form Integration</h4>
      <form id="tags-form" class="stack-md">
        <pds-tags
          name="languages"
          placeholder="Select one or more languages..."
          ?required=${required}
          ${lazyProps({ settings: languageSettings })}
        ></pds-tags>
        <div class="flex gap-sm">
          <button class="btn-primary" type="submit">Submit</button>
          <button class="btn-secondary" type="reset">Reset</button>
        </div>
      </form>
      <pre id="tags-output" class="card surface-subtle">{}</pre>
    </section>
  `;
};

export const Default = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "et,bd,nl",
    required: false,
    disabled: false,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        code: sourceCode,
      },
    },
  },
};

export const Empty = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "",
    required: false,
    disabled: false,
  },
  render: Template,
};

export const Required = {
  args: {
    name: "languages",
    placeholder: "Select at least one language...",
    value: "",
    required: true,
    disabled: false,
  },
  render: Template,
};

export const Disabled = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "et,nl",
    required: false,
    disabled: true,
  },
  render: Template,
};

export const GroupedOptions = {
  args: {
    name: "selections",
    placeholder: "Search languages, skills, or tools...",
    value: "nl,wc,figma",
    required: false,
    disabled: false,
  },
  render: ({ name, placeholder, value, required, disabled }) => html`
    <div class="stack-md">
      <pds-tags
        name=${name}
        placeholder=${placeholder}
        value=${value}
        ?required=${required}
        ?disabled=${disabled}
        ${lazyProps({ settings: groupedSettings })}
      ></pds-tags>
    </div>
  `,
};

export const FormSubmission = {
  args: {
    required: true,
  },
  render: FormTemplate,
};
