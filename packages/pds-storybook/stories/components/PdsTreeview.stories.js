import { html, lazyProps } from "#pds/lit";
import { PDS } from "#pds";

const docsParameters = {
  description: {
    component:
      "Accessible treeview with nested structure rendering, keyboard navigation, and optional form-associated selection.",
  },
};

const settingsReferenceHtml = /*html*/`
  <h2 id="settings-reference">Settings Reference</h2>
  <p>
    <code>pds-treeview</code> accepts an <code>options</code> object, aligned with
    <code>pds-omnibox</code> style configuration and async loading.
  </p>
  <h3 id="settings-structure">Options Structure</h3>
  <pre><code class="language-js">const options = {
  source: [
    {
      id: "docs",
      text: "Docs",
      icon: "book-open",
      children: [
        { id: "intro", text: "Introduction", value: "/docs/intro", link: "/docs/intro" }
      ]
    }
  ],
  // Optional API fetch options when source is a URL
  fetch: { headers: { Accept: "application/json" } },
  // Optional post-processing
  transform: (data, ctx) =&gt; data,
  // Optional initial expanded node ids
  defaultExpanded: ["docs"],
  // Optional async source getter (omnibox-like)
  getItems: async (ctx) =&gt; [...],
  // Optional async child loader invoked when a node expands
  getChildren: async ({ node, nodeId, host, options }) =&gt; [...],
  // Optional callback when user selects a node
  onSelect: (node, host) =&gt; console.log(node)
};
</code></pre>
  <h3 id="source-options">Source Options</h3>
  <ul>
    <li><code>Array/Object</code>: Use local JS or JSON structure directly.</li>
    <li><code>Function</code>: Return data sync/async for dynamic trees.</li>
    <li><code>String URL</code>: Fetch JSON from API or static endpoint.</li>
    <li><code>{ url, fetch, mapResponse }</code>: Advanced URL source config.</li>
  </ul>
  <h3 id="node-shape">Node Shape</h3>
  <pre><code class="language-js">{
  id: "unique-id",
  value: "submitted-value", // optional, defaults to id
  text: "Display label",
  icon: "folder", // optional
  image: "https://...", // optional
  link: "/path", // optional
  children: [] // optional
}
</code></pre>
  <h3 id="icon-compat">Icon Compatibility</h3>
  <p>
    Story icons should use names included in the default preset icon include list.
    If an icon is missing, pull it from the Phosphor CDN and run
    <code>pds:build-icons</code> to include it in the sprite.
  </p>
`;

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-treeview", {
        additionalContent: settingsReferenceHtml,
      });
    })
    .catch((error) => {
      console.warn("storybook: docs page failed to load for pds-treeview", error);
    });
}

const localTreeData = [
  {
    id: "getting-started",
    text: "Getting Started",
    icon: "house",
    children: [
      { id: "installation", text: "Installation", value: "installation", icon: "download" },
      { id: "quickstart", text: "Quickstart", value: "quickstart", icon: "rocket" },
    ],
  },
  {
    id: "components",
    text: "Components",
    icon: "squares-four",
    children: [
      {
        id: "forms",
        text: "Forms",
        icon: "file-text",
        children: [
          {
            id: "pds-form",
            text: "pds-form",
            value: "pds-form",
            link: "#/docs/components-pds-form",
            icon: "note-pencil",
          },
          {
            id: "pds-omnibox",
            text: "pds-omnibox",
            value: "pds-omnibox",
            link: "#/docs/components-pds-omnibox",
            icon: "magnifying-glass",
          },
          {
            id: "pds-treeview",
            text: "pds-treeview",
            value: "pds-treeview",
            link: "#/docs/components-pds-treeview",
            icon: "folder-simple",
          },
        ],
      },
      {
        id: "navigation",
        text: "Navigation",
        icon: "map-pin",
        children: [
          { id: "pds-tabstrip", text: "pds-tabstrip", value: "pds-tabstrip", icon: "tabs" },
          { id: "pds-drawer", text: "pds-drawer", value: "pds-drawer", icon: "sidebar" },
        ],
      },
    ],
  },
  {
    id: "team",
    text: "Team",
    icon: "users",
    children: [
      {
        id: "design",
        text: "Design",
        image: "https://i.pravatar.cc/24?img=12",
        value: "team-design",
      },
      {
        id: "engineering",
        text: "Engineering",
        image: "https://i.pravatar.cc/24?img=32",
        value: "team-engineering",
      },
    ],
  },
];

const stripLinksFromNodes = (nodes = []) =>
  nodes.map((node) => {
    const { link, href, children, ...rest } = node || {};
    return {
      ...rest,
      children: Array.isArray(children) ? stripLinksFromNodes(children) : [],
    };
  });

const formTreeData = stripLinksFromNodes(localTreeData);

const localJsonData = {
  id: "root",
  text: "Local JSON",
  icon: "database",
  children: [
    {
      id: "design-tokens",
      text: "Design Tokens",
      icon: "palette",
      children: [
        { id: "colors", text: "Colors", value: "tokens-colors", icon: "palette" },
        { id: "spacing", text: "Spacing", value: "tokens-spacing", icon: "brackets-curly" },
      ],
    },
    {
      id: "primitives",
      text: "Primitives",
      icon: "cube",
      children: [
        { id: "card", text: "Card", value: "primitive-card", icon: "file-text" },
        { id: "badge", text: "Badge", value: "primitive-badge", icon: "check-circle" },
      ],
    },
  ],
};

const apiLikeData = [
  {
    id: "api-root",
    text: "API Data",
    icon: "cloud",
    children: [
      {
        id: "endpoints",
        text: "Endpoints",
        icon: "globe",
        children: [
          { id: "users", text: "GET /users", value: "endpoint-users", icon: "users" },
          { id: "themes", text: "GET /themes", value: "endpoint-themes", icon: "palette" },
          { id: "presets", text: "GET /presets", value: "endpoint-presets", icon: "gear" },
        ],
      },
    ],
  },
];

const encodedApiData = encodeURIComponent(JSON.stringify(apiLikeData));
const apiDataUrl = `data:application/json,${encodedApiData}`;

const localOptions = {
  source: localTreeData,
  defaultExpanded: ["getting-started", "components", "forms"],
  onSelect: (node) => {
    if (window?.PDS?.toast) {
      PDS.toast(`Selected: ${node.text}`, { type: "information" });
    }
  },
};

const localOptionsSource = `const options = {
  source: [
    {
      id: "getting-started",
      text: "Getting Started",
      icon: "house",
      children: [
        { id: "installation", text: "Installation", value: "installation" },
        { id: "quickstart", text: "Quickstart", value: "quickstart" },
      ],
    },
  ],
  defaultExpanded: ["getting-started"],
  onSelect: (node) => PDS.toast(\`Selected: ${"${node.text}"}\`, { type: "information" }),
};

<pds-treeview name="topic" ${"${lazyProps({ options })}"}></pds-treeview>`;

const localJsonOptions = {
  source: localJsonData,
  defaultExpanded: ["root", "design-tokens"],
};

const localJsonOptionsSource = `const localJson = {
  id: "root",
  text: "Local JSON",
  icon: "database",
  children: [
    { id: "design-tokens", text: "Design Tokens", children: [{ id: "colors", text: "Colors" }] },
  ],
};

const options = {
  source: localJson,
  defaultExpanded: ["root", "design-tokens"],
};

<pds-treeview ${"${lazyProps({ options })}"}></pds-treeview>`;

const asyncOptions = {
  getItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return apiLikeData;
  },
  defaultExpanded: ["api-root", "endpoints"],
};

const asyncOptionsSource = `const options = {
  getItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return [{ id: "api-root", text: "API Data", children: [...] }];
  },
  defaultExpanded: ["api-root", "endpoints"],
};

<pds-treeview ${"${lazyProps({ options })}"}></pds-treeview>`;

const urlOptions = {
  source: {
    url: apiDataUrl,
  },
  defaultExpanded: ["api-root", "endpoints"],
};

const urlOptionsSource = `const options = {
  source: {
    url: "data:application/json,[...]",
  },
  defaultExpanded: ["api-root", "endpoints"],
};

<pds-treeview ${"${lazyProps({ options })}"}></pds-treeview>`;

const lazyRootData = [
  {
    id: "docs",
    text: "Docs",
    icon: "book-open",
    hasChildren: true,
    children: [
      {
        id: "guides",
        text: "Guides",
        icon: "notebook",
        hasChildren: true,
      },
      {
        id: "components",
        text: "Components",
        icon: "squares-four",
        hasChildren: true,
      },
    ],
  },
  {
    id: "api",
    text: "API",
    icon: "cloud",
    hasChildren: true,
    children: [
      {
        id: "rest",
        text: "REST",
        icon: "globe",
        hasChildren: true,
      },
      {
        id: "webhooks",
        text: "Webhooks",
        icon: "bell",
        hasChildren: true,
      },
    ],
  },
];

const lazyChildrenByNodeId = {
  guides: [
    { id: "installation", text: "Installation", icon: "download", value: "guide-installation" },
    { id: "quickstart", text: "Quickstart", icon: "rocket", value: "guide-quickstart" },
    { id: "theming", text: "Theming", icon: "palette", value: "guide-theming" },
  ],
  components: [
    { id: "pds-form", text: "pds-form", icon: "note-pencil", value: "component-form" },
    { id: "pds-treeview", text: "pds-treeview", icon: "folder-simple", value: "component-treeview" },
    { id: "pds-omnibox", text: "pds-omnibox", icon: "magnifying-glass", value: "component-omnibox" },
  ],
  rest: [
    { id: "users", text: "GET /users", icon: "users", value: "api-users" },
    { id: "themes", text: "GET /themes", icon: "palette", value: "api-themes" },
    { id: "tokens", text: "GET /tokens", icon: "brackets-curly", value: "api-tokens" },
  ],
  webhooks: [
    { id: "build-complete", text: "build.complete", icon: "check-circle", value: "webhook-build-complete" },
    { id: "deploy-failed", text: "deploy.failed", icon: "warning-circle", value: "webhook-deploy-failed" },
  ],
};

const lazyNodeFetchOptions = {
  source: lazyRootData,
  defaultExpanded: ["docs", "api"],
  getChildren: async ({ nodeId }) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return lazyChildrenByNodeId[nodeId] || [];
  },
};

const lazyNodeFetchOptionsSource = `const options = {
  // Initial fetch returns only 2 levels (root + immediate children)
  source: [
    {
      id: "docs",
      text: "Docs",
      hasChildren: true,
      children: [
        { id: "guides", text: "Guides", hasChildren: true },
        { id: "components", text: "Components", hasChildren: true },
      ],
    },
  ],
  defaultExpanded: ["docs"],
  // Expanding a node fetches that node's direct children on demand
  getChildren: async ({ nodeId }) => {
    const response = await fetch(\`/api/tree?parent=${"${encodeURIComponent(nodeId)}"}\`);
    return response.ok ? response.json() : [];
  },
};

<pds-treeview ${"${lazyProps({ options })}"}></pds-treeview>`;

const inFormOptionsSource = `const options = {
  source: [/* same tree nodes without link fields */],
  defaultExpanded: ["getting-started", "components", "forms"],
};

<form>
  <pds-treeview name="selectedNode" required ${"${lazyProps({ options })}"}></pds-treeview>
  <button class="btn-primary" type="submit">Submit</button>
</form>`;

const displayOnlyOptionsSource = `const options = {
  source: [/* tree nodes */],
};

<pds-treeview display-only expanded-all ${"${lazyProps({ options })}"}></pds-treeview>`;

const bindTreeviewForm = (selector) => {
  setTimeout(() => {
    if (typeof document === "undefined") return;
    document.querySelectorAll(selector).forEach((form) => {
      if (!(form instanceof HTMLFormElement)) return;
      if (form.dataset.bound === "true") return;
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const value = data.get("selectedNode") || "";
        if (window?.PDS?.toast) {
          await PDS.toast(`Form value: ${value}`, { type: "success" });
        }
      });
      form.dataset.bound = "true";
    });
  }, 0);
};

export default {
  title: "Components/Pds Treeview",
  tags: ["autodocs", "treeview", "tree", "navigation", "forms", "pds-treeview"],
  parameters: {
    pds: {
      tags: ["treeview", "tree", "navigation", "forms", "pds-treeview"],
    },
    docs: docsParameters,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables tree interaction",
    },
    required: {
      control: "boolean",
      description: "Requires node selection when used as form field",
    },
    displayOnly: {
      control: "boolean",
      description: "Browse-only mode without selection/form value",
    },
  },
};

export const Default = {
  render: (args) => html`
    <pds-treeview
      name="topic"
      ${lazyProps({ options: localOptions })}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?display-only=${args.displayOnly}
      data-options-source=${localOptionsSource}
    ></pds-treeview>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: localOptionsSource,
      },
    },
  },
  args: {
    disabled: false,
    required: false,
    displayOnly: false,
  },
};

export const LocalJson = {
  render: () => html`
    <pds-treeview
      name="section"
      ${lazyProps({ options: localJsonOptions })}
      data-options-source=${localJsonOptionsSource}
    ></pds-treeview>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: localJsonOptionsSource,
      },
    },
  },
};

export const AsyncSource = {
  render: () => html`
    <pds-treeview
      name="apiNode"
      ${lazyProps({ options: asyncOptions })}
      data-options-source=${asyncOptionsSource}
    ></pds-treeview>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: asyncOptionsSource,
      },
    },
  },
};

export const UrlSource = {
  render: () => html`
    <pds-treeview
      name="urlNode"
      ${lazyProps({ options: urlOptions })}
      data-options-source=${urlOptionsSource}
    ></pds-treeview>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: urlOptionsSource,
      },
    },
  },
};

export const LazyNodeFetch = {
  render: () => html`
    <pds-treeview
      name="lazyNode"
      ${lazyProps({ options: lazyNodeFetchOptions })}
      data-options-source=${lazyNodeFetchOptionsSource}
    ></pds-treeview>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: lazyNodeFetchOptionsSource,
      },
    },
  },
};

export const InForm = {
  render: () => {
    bindTreeviewForm(".treeview-form");
    const formOptions = {
      ...localOptions,
      source: formTreeData,
    };

    return html`
      <form class="treeview-form stack-md" @submit=${(event) => event.preventDefault()}>
        <pds-treeview
          name="selectedNode"
          required
          ${lazyProps({ options: formOptions })}
          data-options-source=${inFormOptionsSource}
        ></pds-treeview>

        <div class="flex gap-sm">
          <button class="btn-primary" type="submit">Submit</button>
          <button class="btn-outline" type="reset">Reset</button>
        </div>
      </form>
    `;
  },
};

export const DisplayOnly = {
  render: () => html`
    <pds-treeview
      display-only
      expanded-all
      ${lazyProps({ options: { source: localTreeData } })}
      data-options-source=${displayOnlyOptionsSource}
    ></pds-treeview>
  `,
};
