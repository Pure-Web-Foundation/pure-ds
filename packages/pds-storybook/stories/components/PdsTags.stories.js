import { html, lazyProps } from "#pds/lit";

const languageItems = [
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

const groupedItems = [
  { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
  { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
  { id: "react", text: "React", description: "Frontend", category: "Skills" },
  { id: "wc", text: "Web Components", description: "Frontend", category: "Skills" },
  { id: "figma", text: "Figma", description: "Design tooling", category: "Tools" },
  { id: "storybook", text: "Storybook", description: "Component docs", category: "Tools" },
];

const createOmniboxOptionsFromItems = (items) => {
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
      getItems: async ({ search = "" } = {}) => {
        const query = String(search).trim().toLowerCase();
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

  return { categories };
};

const languageOptions = createOmniboxOptionsFromItems(languageItems);
const groupedOptions = createOmniboxOptionsFromItems(groupedItems);

const languageOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
          { id: "fr", text: "Frans", description: "FR · France", category: "Languages" },
          { id: "de", text: "Duits", description: "DE · Germany", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<pds-tags
  name="languages"
  placeholder="Zoek taal..."
  value="et,bd,nl"
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const groupedOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
    Skills: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "react", text: "React", description: "Frontend", category: "Skills" },
          { id: "wc", text: "Web Components", description: "Frontend", category: "Skills" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
    Tools: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "figma", text: "Figma", description: "Design tooling", category: "Tools" },
          { id: "storybook", text: "Storybook", description: "Component docs", category: "Tools" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<pds-tags
  name="selections"
  placeholder="Search languages, skills, or tools..."
  value="nl,wc,figma"
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const formOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<form class="stack-md">
  <pds-tags
    name="languages"
    required
    placeholder="Select one or more languages..."
    ${"${lazyProps({ options })}"}
  ></pds-tags>

  <button class="btn-primary" type="submit">Submit</button>
</form>`;

const tvMazeOptions = {
  categories: {
    "TV Shows": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = String(search).trim();
        const fallbackQuery = "star";
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query || fallbackQuery)}`;

        try {
          const response = await fetch(url);
          if (!response.ok) return [];

          const payload = await response.json();
          if (!Array.isArray(payload)) return [];

          return payload
            .map((entry) => entry?.show)
            .filter(Boolean)
            .slice(0, 20)
            .map((show) => {
              const year = show.premiered ? String(show.premiered).slice(0, 4) : "";
              const genres = Array.isArray(show.genres)
                ? show.genres.slice(0, 2).join(", ")
                : "";
              const channel = show.network?.name || show.webChannel?.name || "";
              const description = [year, genres, channel].filter(Boolean).join(" · ");

              return {
                id: String(show.id),
                text: show.name || `Show ${show.id}`,
                description,
                category: "TV Shows",
              };
            });
        } catch {
          return [];
        }
      },
    },
  },
};

const tvMazeOptionsSource = `const options = {
  categories: {
    "TV Shows": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim();
        const fallbackQuery = "star";
        const url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query || fallbackQuery);

        const response = await fetch(url);
        if (!response.ok) return [];

        const payload = await response.json();
        if (!Array.isArray(payload)) return [];

        return payload
          .map((entry) => entry?.show)
          .filter(Boolean)
          .slice(0, 20)
          .map((show) => ({
            id: String(show.id),
            text: show.name,
            description: [
              show.premiered?.slice(0, 4),
              Array.isArray(show.genres) ? show.genres.slice(0, 2).join(", ") : "",
              show.network?.name || show.webChannel?.name || "",
            ].filter(Boolean).join(" · "),
            category: "TV Shows",
          }));
      },
    },
  },
};

<pds-tags
  name="favoriteShows"
  placeholder="Search TV shows (e.g. office, star trek, dark)..."
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const docsParameters = {
  description: {
    component: "Compound multi-select built with pds-omnibox. Select/unselect values from suggestions and manage them as tags.",
  },
};

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-tags");
    })
    .catch((error) => {
      console.warn(
        "storybook: docs page failed to load for pds-tags",
        error,
      );
    });
}

export default {
  title: "Components/pds-tags",
  tags: ["autodocs", "forms", "autocomplete", "multiselect", "pds-tags"],
  parameters: {
    pds: {
      tags: ["forms", "autocomplete", "multiselect", "pds-tags"],
    },
    docs: docsParameters,
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
      data-options-source=${languageOptionsSource}
      ${lazyProps({ options: languageOptions })}
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
          data-options-source=${languageOptionsSource}
          ${lazyProps({ options: languageOptions })}
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
        type: "code",
        code: languageOptionsSource,
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
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
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
        data-options-source=${groupedOptionsSource}
        ${lazyProps({ options: groupedOptions })}
      ></pds-tags>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: groupedOptionsSource,
      },
    },
  },
};

export const FormSubmission = {
  args: {
    required: true,
  },
  render: FormTemplate,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: formOptionsSource,
      },
    },
  },
};

export const PublicApiTvShows = {
  args: {
    name: "favoriteShows",
    placeholder: "Search TV shows (e.g. office, star trek, dark)...",
    value: "",
    required: false,
    disabled: false,
  },
  render: ({ name, placeholder, value, required, disabled }) => html`
    <div class="stack-md">
      <p class="text-muted">Results are fetched live from the public TVMaze API (no API key required).</p>
      <pds-tags
        name=${name}
        placeholder=${placeholder}
        value=${value}
        ?required=${required}
        ?disabled=${disabled}
        data-options-source=${tvMazeOptionsSource}
        ${lazyProps({ options: tvMazeOptions })}
      ></pds-tags>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: tvMazeOptionsSource,
      },
    },
  },
};
