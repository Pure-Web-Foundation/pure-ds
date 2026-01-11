import { html } from "lit";

const docsParameters = {
  description: {
    component: "Accessible tab interface with keyboard navigation",
  },
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-tabstrip');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-tabstrip', error);
    });
}

// Minimal story-specific styles - only for demo-specific visuals not covered by PDS
const tabstripStoryStyles = html`
  <style>
    /* Progress bar visualization - demo-specific */
    .story-tabstrip-bar-track {
      height: 8px;
      background: var(--surface-elevated);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .story-tabstrip-bar-fill {
      height: 100%;
      border-radius: inherit;
    }
    /* Large stat values - demo-specific typography */
    .story-tabstrip-stat-value {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
    }
  </style>
`;

const tabstripMetrics = [
  {
    title: "Total Sales",
    value: "$127.5K",
    delta: "↑ 23% from last month",
    colorClass: "text-primary",
  },
  {
    title: "Active Users",
    value: "8,432",
    delta: "↑ 12% from last month",
    colorClass: "text-secondary",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    delta: "↑ 0.5% from last month",
    colorClass: "text-accent",
  },
];

const tabstripActivityItems = Array.from({ length: 4 }, (_, index) => ({
  orderId: 1000 + index,
  amount: `$${(index + 1) * 150}`,
  time: `${index + 1}h ago`,
}));

const tabstripTrafficSources = [
  {
    label: "Direct",
    value: "45%",
    width: "45%",
    colorVar: "var(--color-primary)",
  },
  {
    label: "Search Engines",
    value: "32%",
    width: "32%",
    colorVar: "var(--color-secondary)",
  },
  {
    label: "Social Media",
    value: "23%",
    width: "23%",
    colorVar: "var(--color-accent)",
  },
];

const tabstripFeatures = [
  "Deep linking with URL hashes for bookmarkable tabs",
  "Keyboard navigation (Arrow keys, Home, End)",
  "Accessible ARIA attributes for screen readers",
  "Automatic focus management",
  "Responsive design that adapts to mobile",
];

const tabstripNotificationOptions = [
  { label: "Email notifications for new orders", checked: true },
  { label: "Weekly performance reports", checked: true },
  { label: "Marketing updates", checked: false },
];

const tabstripCategories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
];

export default {
  title: "Components/Pds Tabstrip",
  tags: ['autodocs', 'tab', 'tabs', 'tabstrip', 'navigation', 'panels', 'grouping'],
  parameters: {
    pds: {
      tags: ['tab', 'tabs', 'tabstrip', 'navigation', 'panels', 'grouping', 'layout', 'pds-tabstrip']
    },
    docs: docsParameters,
  },
};

export const Default = () => html`
  ${tabstripStoryStyles}
  <pds-tabstrip label="Product Dashboard">
    <pds-tabpanel id="overview" label="Overview">
      <div class="stack-md">
        <div>
          <h3>Product Overview</h3>
          <p class="text-muted max-w-lg">
            Complete analytics and insights for your product performance.
          </p>
        </div>

        <div class="grid grid-auto-sm gap-md">
          ${tabstripMetrics.map(
            (metric) => html`
              <article class="card surface-elevated stack-sm">
                <h4>${metric.title}</h4>
                <div class="tabstrip-stat-value ${metric.colorClass}">
                  ${metric.value}
                </div>
                <p class="text-muted">${metric.delta}</p>
              </article>
            `
          )}
        </div>

        <article class="card stack-sm">
          <h4>Recent Activity</h4>
          <div class="stack-sm">
            ${tabstripActivityItems.map(
              (activity) => html`
                <div class="flex items-center gap-md">
                  <pds-icon class="text-primary" icon="activity"></pds-icon>
                  <div class="grow">
                    <strong>New sale recorded</strong>
                    <div class="text-muted">
                      Order #${activity.orderId} - ${activity.amount}
                    </div>
                  </div>
                  <span class="text-muted">${activity.time}</span>
                </div>
              `
            )}
          </div>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="details" label="Analytics">
      <div class="stack-md">
        <div>
          <h3>Detailed Analytics</h3>
          <p class="text-muted max-w-lg">
            Deep dive into your product metrics and user behavior.
          </p>
        </div>

        <article class="card stack-sm">
          <h4>Traffic Sources</h4>
          <div class="stack-sm">
            ${tabstripTrafficSources.map(
              (source) => html`
                <div>
                  <div class="flex justify-between items-center">
                    <span>${source.label}</span>
                    <strong>${source.value}</strong>
                  </div>
                  <div class="story-tabstrip-bar-track">
                    <div class="story-tabstrip-bar-fill" style="width: ${source.width}; background: ${source.colorVar}"></div>
                  </div>
                </div>
              `
            )}
          </div>
        </article>

        <article class="card surface-elevated stack-sm">
          <h4>Top Features</h4>
          <ul class="stack-sm">
            ${tabstripFeatures.map((feature) => html`<li>${feature}</li>`)}
          </ul>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="settings" label="Settings">
      <div class="stack-md">
        <div>
          <h3>Product Settings</h3>
          <p class="text-muted max-w-lg">
            Configure your product preferences and options.
          </p>
        </div>

        <article class="card stack-sm">
          <h4>General Settings</h4>
          <div class="stack-sm">
            <label>
              <span data-label>Product Name</span>
              <input
                type="text"
                value="My Awesome Product"
                placeholder="Enter product name"
              />
            </label>

            <label>
              <span data-label>Product Category</span>
              <select>
                ${tabstripCategories.map(
                  (category) => html`<option>${category}</option>`
                )}
              </select>
            </label>
          </div>
        </article>

        <article class="card surface-elevated stack-sm">
          <h4>Notifications</h4>
          <fieldset role="group" class="stack-sm">
            ${tabstripNotificationOptions.map(
              (option) => html`
                <label class="flex items-center gap-sm">
                  <input type="checkbox" ?checked=${option.checked} />
                  <span>${option.label}</span>
                </label>
              `
            )}
          </fieldset>
        </article>

        <div class="flex gap-sm flex-wrap">
          <button class="btn-primary">
            <pds-icon icon="check"></pds-icon>
            Save Settings
          </button>
          <button class="btn-outline">Cancel</button>
        </div>
      </div>
    </pds-tabpanel>
  </pds-tabstrip>
`;
