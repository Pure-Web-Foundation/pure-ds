import { html, lazyProps } from "#pds/lit";
import { PDS } from "#pds";
import { countriesApiSettings } from "./omnibox-countries-api-settings.js";

const docsParameters = {
  description: {
    component: "Omnibox search input with PDS styling and form association",
  },
};

const settingsReferenceHtml = `
  <h2 id="settings-reference">Settings Reference</h2>
  <p>
    <code>pds-omnibox</code> relies on a <code>settings</code> object to configure
    autocomplete categories, item rendering, and behaviors.
  </p>
  <h3 id="settings-structure">Settings Structure</h3>
  <pre><code class="language-js">const settings = {
  hideCategory: false,
  iconHandler: (item) =&gt; item.icon
    ? '&lt;pds-icon icon=&quot;${"${item.icon}"}&quot; size=&quot;sm&quot;&gt;&lt;/pds-icon&gt;'
    : null,
  categories: {
    Suggestions: {
      useIconForInput: true,
      sortIndex: 1,
      trigger: (options) =&gt; true,
      getItems: async (options) =&gt; [
        { id: "home", text: "Home", icon: "house" }
      ],
      action: (item) =&gt; console.log(item)
    }
  }
};
</code></pre>
  <h3 id="settings-options">Settings Options</h3>
  <ul>
    <li><code>hideCategory</code>: Hides the category label column in results.</li>
    <li><code>iconHandler</code>: Returns HTML for a custom icon or image per item.</li>
    <li><code>categories</code>: Map of category names to configuration objects.</li>
  </ul>
  <h3 id="category-options">Category Options</h3>
  <ul>
    <li><code>useIconForInput</code>: When true, uses the first result icon in the input.</li>
    <li><code>sortIndex</code>: Determines category order (higher shows first).</li>
    <li><code>trigger(options)</code>: Returns true when this category should run.</li>
    <li><code>getItems(options)</code>: Returns result items for the category.</li>
    <li><code>action(item)</code>: Called when a result is selected.</li>
  </ul>
  <h3 id="item-shape">Result Item Shape</h3>
  <pre><code class="language-js">{
  id: "unique-id",
  text: "Display label",
  description: "Optional subtext",
  icon: "pds-icon-name",
  image: "https://...",
  element: HTMLElement // optional custom element
}
</code></pre>
`;

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-omnibox", {
        additionalContent: settingsReferenceHtml,
      });
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
  PDS.toast(`Selected: ${options.text}`, {
    type: "information",
  });
});

const inFormSettings = buildSettings();

const toastSettingsSource = `const settings = {
  categories: {
    Suggestions: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").toLowerCase();
        const items = { home: "Home", account: "Account", settings: "Settings" };
        const iconFor = (key, label) => {
          const value = \`${"${key}"} ${"${label}"}\`.toLowerCase();
          if (value.includes("home") || value.includes("house")) return "house";
          if (value.includes("account") || value.includes("profile") || value.includes("user")) return "user";
          if (value.includes("settings") || value.includes("preferences") || value.includes("config")) return "gear";
          if (value.includes("search") || value.includes("find")) return "magnifying-glass";
          return "magnifying-glass";
        };

        return Object.entries(items)
          .filter(([key, label]) => \`${"${key}"} ${"${label}"}\`.toLowerCase().includes(q))
          .map(([key, label]) => ({
            text: label,
            id: key,
            icon: iconFor(key, label),
          }));
      },
      action: (options) => {
        PDS.toast(\`Selected: ${"${options.text}"}\`, { type: "information" });
      },
    },
  },
};

<pds-omnibox name="search" placeholder="Search..." ${"${lazyProps({ settings })}"}></pds-omnibox>`;

const inFormSettingsSource = `const settings = {
  categories: {
    Suggestions: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").toLowerCase();
        const items = { home: "Home", account: "Account", settings: "Settings" };
        return Object.entries(items)
          .filter(([key, label]) => \`${"${key}"} ${"${label}"}\`.toLowerCase().includes(q))
          .map(([key, label]) => ({ text: label, id: key }));
      },
    },
  },
};

<form>
  <pds-omnibox name="search" required ${"${lazyProps({ settings })}"}></pds-omnibox>
  <button class="btn-primary" type="submit">Submit</button>
</form>`;

const countriesApiSettingsSource = `const settings = {
  hideCategory: true,
  itemGrid: "0 1fr 0",
  iconHandler: () => '',
  categories: {
    Featured: {
      sortIndex: 2,
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").trim().toLowerCase();
        const shortlist = [
          { id: "NL", text: "Netherlands" },
          { id: "US", text: "United States" },
        ];
        return q
          ? shortlist.filter((item) => item.text.toLowerCase().includes(q))
          : shortlist;
      },
      useIconForInput: false,
    },
    Countries: {
      sortIndex: 1,
      trigger: (options) => (options.search || "").trim().length >= 2,
      getItems: async (options) => {
        const q = (options.search || "").trim().toLowerCase();
        if (!q) return [];
        const countries = await loadCountries();
        return countries
          .filter((item) => item.text.toLowerCase().includes(q))
          .slice(0, 30);
      },
      useIconForInput: false,
    },
  },
};

<form data-countries-api>
  <pds-omnibox
    name="country"
    required
    placeholder="Type at least 2 letters to fetch countries..."
    ${"${lazyProps({ settings })}"}
  ></pds-omnibox>
  <button class="btn-primary" type="submit">Submit</button>
</form>`;

const combinedSettingsSource = `const settings = {
  hideCategory: false,
  iconHandler: (item) =>
    item.image
      ? \`<img src=\"${"${item.image}"}\" alt=\"\" loading=\"lazy\" />\`
      : item.icon
        ? \`<pds-icon icon=\"${"${item.icon}"}\" size=\"sm\"></pds-icon>\`
        : null,
  categories: {
    Featured: {
      useIconForInput: true,
      sortIndex: 5,
      trigger: (options) => (options.search || "").length === 0,
      getItems: async () => {
        const element = document.createElement("div");
        element.className = "ac-itm cat-Featured";
        element.innerHTML = \`
          <pds-icon icon=\"sparkle\" size=\"sm\"></pds-icon>
          <span class=\"text\"><strong>Featured:</strong> Try the new theme switcher</span>
          <span class=\"category\">Featured</span>
        \`;
        return [{ id: "featured-theme", text: "Featured: Theme switcher", element }];
      },
      action: (options) => {
        PDS.toast(\`Featured: ${"${options.text}"}\`, { type: "information" });
      },
    },
    Actions: {
      sortIndex: 4,
      trigger: (options) => (options.search || "").length === 0,
      getItems: async () => [
        { id: "new-post", text: "Create post", icon: "plus", description: "Quick action" },
        { id: "new-event", text: "Create event", icon: "calendar", description: "Quick action" },
        { id: "new-message", text: "Send message", icon: "envelope", description: "Quick action" },
      ],
      action: (options) => PDS.toast(\`Action: ${"${options.text}"}\`, { type: "information" }),
    },
    Search: {
      sortIndex: 3,
      trigger: (options) => (options.search || "").length > 1,
      getItems: async (options) => [
        { id: "posts", text: \`Search posts for \"%search%\"\`, scope: "Posts", icon: "note-pencil" },
        { id: "people", text: \`Search people for \"%search%\"\`, scope: "People", icon: "user" },
        { id: "docs", text: \`Search docs for \"%search%\"\`, scope: "Docs", icon: "book-open" },
      ].map((item) => ({ ...item, description: \`in ${"${item.scope}"}\` })),
      action: (options) => PDS.toast(\`Searching ${"${options.description}"}\`, { type: "information" }),
    },
    People: {
      sortIndex: 2,
      trigger: (options) => (options.search || "").startsWith("@"),
      getItems: async (options) => {
        const q = (options.search || "").replace(/^@/, "").toLowerCase();
        const people = [
          { id: "alex", text: "Alex Johnson", role: "Design", image: "https://i.pravatar.cc/24?img=12" },
          { id: "sam", text: "Sam Lee", role: "Engineering", image: "https://i.pravatar.cc/24?img=32" },
          { id: "taylor", text: "Taylor Morgan", role: "Product", image: "https://i.pravatar.cc/24?img=48" },
        ];
        return people
          .filter((p) => p.text.toLowerCase().includes(q))
          .map((p) => ({ id: p.id, text: p.text, description: p.role, image: p.image }));
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
          .map((tag) => ({ id: tag, text: \`#${"${tag}"}\`, description: "Tag", icon: "tag" }));
      },
    },
  },
};

<pds-omnibox name="omnibox" placeholder="Try @alex, #design, or type 2+ chars..." ${"${lazyProps({ settings })}"}></pds-omnibox>`;

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
      useIconForInput: "list",
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
        PDS.toast(`Featured: ${options.text}`, {
          type: "information",
        });
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
        PDS.toast(`Action: ${options.text}`, {
          type: "information",
        });
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
        PDS.toast(`Searching ${options.description}`, {
          type: "information",
        });
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

const selectedItemSettingsSource = `const renderSelectionPreview = (options = {}) => {
  const selectedItem = options.selectedItem;
  const toLargeAvatar = (src, size = 384) => {
    if (!src) return "";
    return src.replace(/\/\d+(\?img=\d+)/, "/" + size + "$1");
  };
  const selectedImage =
    selectedItem?.querySelector("img")?.getAttribute("src") || options.image || "";
  const selectedTitle = options.text || options.id || "Selected item";
  const selectedCaption = options.description
    ? selectedTitle + " - " + options.description
    : selectedTitle;

  const root = selectedItem?.getRootNode?.();
  const host = root?.host || null;
  const demo = host?.closest?.("[data-selected-item-demo]") ||
    document.querySelector("[data-selected-item-demo]");
  const preview = demo?.querySelector("[data-selected-preview]");
  const previewImage = demo?.querySelector("[data-selected-preview-image]");
  const previewCaption = demo?.querySelector("[data-selected-preview-caption]");

  if (preview && previewImage && previewCaption) {
    const previewSrc = toLargeAvatar(selectedImage, 384) || selectedImage;
    if (previewSrc) {
      previewImage.setAttribute("src", previewSrc);
    }
    previewImage.setAttribute("alt", selectedCaption);
    previewCaption.textContent = selectedCaption;
    preview.hidden = false;
  }
};

const settings = {
  hideCategory: true,
  itemGrid: "45px 1fr",
  iconHandler: (item) =>
    item.image
      ? \`<img src="${"${item.image}"}" alt="" loading="lazy" />\`
      : null,
  categories: {
    People: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").toLowerCase();
        const items = [
          { id: "alex", text: "Alex Johnson", description: "Design", image: "https://i.pravatar.cc/96?img=12" },
          { id: "sam", text: "Sam Lee", description: "Engineering", image: "https://i.pravatar.cc/96?img=32" },
          { id: "taylor", text: "Taylor Morgan", description: "Product", image: "https://i.pravatar.cc/96?img=64" },
        ];
        return items.filter((item) => {
          const haystack = \`${"${item.id}"} ${"${item.text}"} ${"${item.description}"}\`.toLowerCase();
          return haystack.includes(q);
        }).map((item) => ({
          ...item,
          action: renderSelectionPreview,
        }));
      },
      action: renderSelectionPreview,
    },
  },
};

<section class="stack-sm" data-selected-item-demo>
  <pds-omnibox
    name="search"
    placeholder="Type alex, sam, or taylor"
    ${"${lazyProps({ settings })}"}
    data-settings-source=${"${selectedItemSettingsSource}"}
  ></pds-omnibox>
  <figure class="card stack-xs" hidden data-selected-preview>
    <img src="" alt="" width="320" height="320" loading="lazy" data-selected-preview-image />
    <figcaption class="text-muted" data-selected-preview-caption></figcaption>
  </figure>
</section>`;

export default {
  title: "Components/pds-omnibox",
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
      ${lazyProps({ settings: toastSettings })}
      data-settings-source=${toastSettingsSource}
      placeholder=${args.placeholder}
      ?required=${args.required}
      ?disabled=${args.disabled}
    ></pds-omnibox>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: toastSettingsSource,
      },
    },
  },
  args: {
    placeholder: "Search...",
    required: false,
    disabled: false,
  },
};

export const InForm = {
  render: () => html`
    <form class="stack-md" @submit=${(e) => e.preventDefault()}>
      <pds-omnibox
        name="search"
        required
        ${lazyProps({ settings: inFormSettings })}
        data-settings-source=${inFormSettingsSource}
      ></pds-omnibox>
      <button class="btn-primary" type="submit">Submit</button>
    </form>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: inFormSettingsSource,
      },
    },
  },
};

export const CountriesApi = {
  name: "Countries API",
  render: () => html`
    <form
      data-countries-api
      class="stack-md"
      @submit=${(e) => e.preventDefault()}
    >
      <pds-omnibox
        name="country"
        required
        placeholder="Type at least 2 letters to fetch countries..."
        ${lazyProps({ settings: countriesApiSettings })}
        data-settings-source=${countriesApiSettingsSource}
      ></pds-omnibox>
      <button class="btn-primary" type="submit">Submit</button>
    </form>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: countriesApiSettingsSource,
      },
    },
  },
};

export const CombinedCategories = {
  render: () => html`
    <pds-omnibox
      name="omnibox"
      placeholder="Try @alex, #design, or type 2+ chars..."
      ${lazyProps({ settings: combinedSettings })}
      data-settings-source=${combinedSettingsSource}
    ></pds-omnibox>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: combinedSettingsSource,
      },
    },
  },
};

export const SelectedItemActionHook = {
  name: "Action receives selectedItem",
  render: () => {
    const sectionId = `selected-item-demo-${Math.random().toString(36).slice(2, 10)}`;
    const renderSelectionPreview = (options = {}) => {
      const selectedItem = options.selectedItem;
      const toLargeAvatar = (src, size = 384) => {
        if (!src) return "";
        return src.replace(/\/\d+(\?img=\d+)/, `/${size}$1`);
      };
      const selectedImage =
        selectedItem?.querySelector("img")?.getAttribute("src") ||
        options.image ||
        "";
      const selectedTitle = options.text || options.id || "Selected item";
      const selectedCaption = options.description
        ? `${selectedTitle} - ${options.description}`
        : selectedTitle;

      const root = selectedItem?.getRootNode?.();
      const host = root?.host || null;
      const sectionEl =
        host?.closest?.("[data-selected-item-demo]") ||
        document.getElementById(sectionId);
      const previewEl = sectionEl?.querySelector("[data-selected-preview]");
      const previewImageEl = sectionEl?.querySelector(
        "[data-selected-preview-image]",
      );
      const previewCaptionEl = sectionEl?.querySelector(
        "[data-selected-preview-caption]",
      );

      if (previewEl && previewImageEl && previewCaptionEl) {
        const previewSrc = toLargeAvatar(selectedImage, 384) || selectedImage;
        if (previewSrc) {
          previewImageEl.setAttribute("src", previewSrc);
        }
        previewImageEl.setAttribute("alt", selectedCaption);
        previewCaptionEl.textContent = selectedCaption;
        previewEl.hidden = false;
      }

      PDS.toast(`Selected: ${selectedTitle}`, {
        type: "information",
      });
    };

    const settings = {
      hideCategory: true,
      itemGrid: "45px 1fr",
      iconHandler: (item) =>
        item.image
          ? `<img src="${item.image}" alt="" loading="lazy" />`
          : null,
      categories: {
        People: {
          trigger: () => true,
          getItems: async (options) => {
            const q = (options.search || "").toLowerCase();
            const items = [
              {
                id: "alex",
                text: "Alex Johnson",
                description: "Design",
                image: "https://i.pravatar.cc/96?img=12",
              },
              {
                id: "sam",
                text: "Sam Lee",
                description: "Engineering",
                image: "https://i.pravatar.cc/96?img=32",
              },
              {
                id: "taylor",
                text: "Taylor Morgan",
                description: "Product",
                image: "https://i.pravatar.cc/96?img=64",
              },
            ];

            return items.filter((item) => {
              const haystack = `${item.id} ${item.text} ${item.description}`.toLowerCase();
              return haystack.includes(q);
            }).map((item) => ({
              ...item,
              action: renderSelectionPreview,
            }));
          },
          action: renderSelectionPreview,
        },
      },
    };

    return html`
      <section class="stack-sm" id=${sectionId} data-selected-item-demo>
        <p class="text-muted">
          Suggestions use image thumbnails. Select one and this story reads the
          image from <code>options.selectedItem</code> to render a larger preview.
        </p>
        <pds-omnibox
          name="selected-item-demo"
          placeholder="Type alex, sam, or taylor"
          ${lazyProps({ settings })}
          data-settings-source=${selectedItemSettingsSource}
        ></pds-omnibox>
        <figure class="card stack-xs" hidden data-selected-preview>
          <img
            src=""
            alt=""
            width="320"
            height="320"
            loading="lazy"
            data-selected-preview-image
          />
          <figcaption class="text-muted" data-selected-preview-caption>
            No result selected yet.
          </figcaption>
        </figure>
      </section>
    `;
  },
  parameters: {
    docs: {
      source: {
        type: "code",
        code: selectedItemSettingsSource,
      },
    },
  },
};
