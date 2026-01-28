import { html } from "lit";

const docsParameters = {
  description: {
    component: "Omnibox search input with PDS styling and form association",
  },
};

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-omnibox");
    })
    .catch((error) => {
      console.warn(
        "storybook: docs page failed to load for pds-omnibox",
        error,
      );
    });
}

const buildSettings = (action) => ({
  categories: {
    Suggestions: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").toLowerCase();
        const items = {
          home: "Home",
          account: "Account",
          settings: "Settings",
        };
        const iconFor = (key, label) => {
          const value = `${key} ${label}`.toLowerCase();
          if (value.includes("home") || value.includes("house")) return "house";
          if (
            value.includes("account") ||
            value.includes("profile") ||
            value.includes("user")
          )
            return "user";
          if (
            value.includes("settings") ||
            value.includes("preferences") ||
            value.includes("config")
          )
            return "gear";
          if (value.includes("search") || value.includes("find"))
            return "magnifying-glass";
          return "magnifying-glass";
        };

        return Object.entries(items)
          .filter(([key, label]) => {
            const text = `${key} ${label}`.toLowerCase();
            return text.includes(q);
          })
          .map(([key, label]) => ({
            text: label,
            id: key,
            icon: iconFor(key, label),
          }));
      },
      action,
    },
  },
});

const toastSettings = buildSettings((options) => {
  if (window?.PDS?.toast) {
    window.PDS.toast(`Selected: ${options.text}`, {
      type: "information",
    });
  }
});

const inFormSettings = buildSettings((options) => {
  const active = document.activeElement;
  let input = null;
  if (active && active.tagName === "INPUT") {
    input = active;
  }
  if (!input) {
    input = document
      .querySelector("pds-omnibox")
      ?.shadowRoot?.querySelector("input");
  }
  if (input) {
    input.value = options.text || "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
});

const combinedSettings = {
  hideCategory: false,
  iconHandler: (item) =>
    item.image
      ? `<img src="${item.image}" alt="" loading="lazy" />`
      : item.icon
        ? `<pds-icon icon="${item.icon}" size="sm"></pds-icon>`
        : null,
  categories: {
    Featured: {
      sortIndex: 5,
      trigger: (options) => (options.search || "").length === 0,
      getItems: async () => {
        const element = document.createElement("div");
        element.className = "ac-itm cat-Featured";
        element.innerHTML = `
          <pds-icon icon="sparkle" size="sm"></pds-icon>
          <span class="text"><strong>Featured:</strong> Try the new theme switcher</span>
          <span class="category">Featured</span>
        `;
        return [
          {
            id: "featured-theme",
            text: "Featured: Theme switcher",
            element,
          },
        ];
      },
      action: (options) => {
        if (window?.PDS?.toast) {
          window.PDS.toast(`Featured: ${options.text}`, {
            type: "information",
          });
        }
      },
    },
    Actions: {
      sortIndex: 4,
      trigger: (options) => (options.search || "").length === 0,
      getItems: async () => [
        {
          id: "new-post",
          text: "Create post",
          icon: "plus",
          description: "Quick action",
        },
        {
          id: "new-event",
          text: "Create event",
          icon: "calendar",
          description: "Quick action",
        },
        {
          id: "new-message",
          text: "Send message",
          icon: "envelope",
          description: "Quick action",
        },
      ],
      action: (options) => {
        if (window?.PDS?.toast) {
          window.PDS.toast(`Action: ${options.text}`, {
            type: "information",
          });
        }
      },
    },
    Search: {
      sortIndex: 3,
      trigger: (options) => (options.search || "").length > 1,
      getItems: async (options) => {
        const q = options.search || "";
        return [
          {
            id: "posts",
            text: `Search posts for "%search%"`,
            scope: "Posts",
            icon: "note-pencil",
          },
          {
            id: "people",
            text: `Search people for "%search%"`,
            scope: "People",
            icon: "user",
          },
          {
            id: "docs",
            text: `Search docs for "%search%"`,
            scope: "Docs",
            icon: "book-open",
          },
        ].map((item) => ({ ...item, description: `in ${item.scope}` }));
      },
      action: (options) => {
        if (window?.PDS?.toast) {
          window.PDS.toast(`Searching ${options.description}`, {
            type: "information",
          });
        }
      },
    },
    People: {
      sortIndex: 2,
      trigger: (options) => (options.search || "").startsWith("@"),
      getItems: async (options) => {
        const q = (options.search || "").replace(/^@/, "").toLowerCase();
        const people = [
          {
            id: "alex",
            text: "Alex Johnson",
            role: "Design",
            image: "https://i.pravatar.cc/24?img=12",
          },
          {
            id: "sam",
            text: "Sam Lee",
            role: "Engineering",
            image: "https://i.pravatar.cc/24?img=32",
          },
          {
            id: "taylor",
            text: "Taylor Morgan",
            role: "Product",
            image: "https://i.pravatar.cc/24?img=48",
          },
        ];
        return people
          .filter((p) => p.text.toLowerCase().includes(q))
          .map((p) => ({
            id: p.id,
            text: p.text,
            description: p.role,
            image: p.image,
          }));
      },
    },
    Tags: {
      sortIndex: 1,
      trigger: (options) => (options.search || "").startsWith("#"),
      getItems: async (options) => {
        const q = (options.search || "").replace(/^#/, "").toLowerCase();
        const tags = ["design", "release", "help", "pds", "accessibility"];
        return tags
          .filter((tag) => tag.includes(q))
          .map((tag) => ({
            id: tag,
            text: `#${tag}`,
            description: "Tag",
            icon: "tag",
          }));
      },
    },
  },
};

export default {
  title: "Components/Pds Omnibox",
  tags: ["autodocs", "autocomplete", "search", "input", "forms", "pds-omnibox"],
  parameters: {
    pds: {
      tags: ["autocomplete", "search", "input", "forms", "pds-omnibox"],
    },
    docs: docsParameters,
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    required: {
      control: "boolean",
      description: "Marks the input as required",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
  },
};

export const Default = {
  render: (args) => html`
    <pds-omnibox
      name="search"
      .settings=${toastSettings}
      placeholder=${args.placeholder}
      ?required=${args.required}
      ?disabled=${args.disabled}
    ></pds-omnibox>
  `,
  args: {
    placeholder: "Search...",
    required: false,
    disabled: false,
  },
};

export const InForm = () => html`
  <form class="stack-md" @submit=${(e) => e.preventDefault()}>
    <pds-omnibox name="search" required .settings=${inFormSettings}></pds-omnibox>
    <button class="btn-primary" type="submit">Submit</button>
  </form>
`;

export const CombinedCategories = () => html`
  <pds-omnibox
    name="omnibox"
    placeholder="Try @alex, #design, or type 2+ chars..."
    .settings=${combinedSettings}
  ></pds-omnibox>
`;
