import { html } from "lit";

const docsParameters = {
  description: {
    component: "Accessible tab interface with keyboard navigation",
  },
};

if (typeof window !== 'undefined') {
  const { createComponentDocsPage } = await import('../reference/reference-docs.js');
  docsParameters.page = createComponentDocsPage('pds-tabstrip');
}

const tabstripStoryStyles = html`
  <style>
    .tabstrip-panel {
      padding: var(--spacing-4);
      display: grid;
      gap: var(--spacing-4);
    }

    .tabstrip-panel__description {
      margin-bottom: var(--spacing-4);
      opacity: 0.9;
      max-width: 60ch;
    }

    .tabstrip-metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-6);
    }

    .tabstrip-metric-card {
      display: grid;
      gap: var(--spacing-2);
    }

    .tabstrip-metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      margin: var(--spacing-2) 0;
    }

    .tabstrip-metric-value--primary {
      color: var(--color-primary);
    }

    .tabstrip-metric-value--secondary {
      color: var(--color-secondary);
    }

    .tabstrip-metric-value--accent {
      color: var(--color-accent);
    }

    .tabstrip-metric-delta {
      font-size: 0.85rem;
      opacity: 0.7;
      margin: 0;
    }

    .tabstrip-activity-card {
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .tabstrip-activity-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
    }

    .tabstrip-activity-icon {
      color: var(--color-primary);
    }

    .tabstrip-activity-content {
      flex: 1;
    }

    .tabstrip-activity-meta {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .tabstrip-activity-time {
      font-size: 0.75rem;
      opacity: 0.6;
      white-space: nowrap;
    }

    .tabstrip-analytics-card {
      margin-bottom: var(--spacing-4);
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-traffic-list {
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-traffic-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-1);
      align-items: center;
    }

    .tabstrip-traffic-bar-track {
      height: 8px;
      background: var(--surface-elevated);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .tabstrip-traffic-bar-fill {
      height: 100%;
      border-radius: inherit;
    }

    .tabstrip-traffic-bar-fill--45 {
      width: 45%;
    }

    .tabstrip-traffic-bar-fill--32 {
      width: 32%;
    }

    .tabstrip-traffic-bar-fill--23 {
      width: 23%;
    }

    .tabstrip-traffic-bar-fill--primary {
      background: var(--color-primary);
    }

    .tabstrip-traffic-bar-fill--secondary {
      background: var(--color-secondary);
    }

    .tabstrip-traffic-bar-fill--accent {
      background: var(--color-accent);
    }

    .tabstrip-features-card {
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-features-list {
      margin: 0;
      padding-left: var(--spacing-4);
      display: grid;
      gap: var(--spacing-2);
    }

    .tabstrip-settings-card,
    .tabstrip-notifications-card {
      margin-bottom: var(--spacing-4);
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-settings-fields {
      display: grid;
      gap: var(--spacing-3);
    }

    .tabstrip-form-label {
      display: grid;
      gap: var(--spacing-1);
    }

    .tabstrip-field-heading {
      font-weight: 600;
    }

    .tabstrip-input,
    .tabstrip-select {
      width: 100%;
      padding: var(--spacing-2);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font: inherit;
      background: var(--color-surface);
    }

    .tabstrip-notification-group {
      display: grid;
      gap: var(--spacing-2);
    }

    .tabstrip-checkbox {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .tabstrip-actions {
      display: flex;
      gap: var(--spacing-2);
      flex-wrap: wrap;
    }
  </style>
`;

const tabstripMetrics = [
  {
    title: "Total Sales",
    value: "$127.5K",
    delta: "↑ 23% from last month",
    valueClass: "tabstrip-metric-value--primary",
  },
  {
    title: "Active Users",
    value: "8,432",
    delta: "↑ 12% from last month",
    valueClass: "tabstrip-metric-value--secondary",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    delta: "↑ 0.5% from last month",
    valueClass: "tabstrip-metric-value--accent",
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
    fillClass: "tabstrip-traffic-bar-fill--45 tabstrip-traffic-bar-fill--primary",
  },
  {
    label: "Search Engines",
    value: "32%",
    fillClass: "tabstrip-traffic-bar-fill--32 tabstrip-traffic-bar-fill--secondary",
  },
  {
    label: "Social Media",
    value: "23%",
    fillClass: "tabstrip-traffic-bar-fill--23 tabstrip-traffic-bar-fill--accent",
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
  tags: ['autodocs', 'grouping'],
  parameters: {
    pds: {
      tags: ["navigation", "grouping", "layout"],
    },
    docs: docsParameters,
  },
};

export const Default = () => html`
  ${tabstripStoryStyles}
  <pds-tabstrip label="Product Dashboard">
    <pds-tabpanel id="overview" label="Overview">
      <div class="tabstrip-panel">
        <div>
          <h3>Product Overview</h3>
          <p class="tabstrip-panel__description">
            Complete analytics and insights for your product performance.
          </p>
        </div>

        <div class="tabstrip-metrics-grid">
          ${tabstripMetrics.map(
            (metric) => html`
              <article class="card surface-elevated tabstrip-metric-card">
                <h4>${metric.title}</h4>
                <div class="tabstrip-metric-value ${metric.valueClass}">
                  ${metric.value}
                </div>
                <p class="tabstrip-metric-delta">${metric.delta}</p>
              </article>
            `
          )}
        </div>

        <article class="card tabstrip-activity-card">
          <h4>Recent Activity</h4>
          <div class="tabstrip-activity-list">
            ${tabstripActivityItems.map(
              (activity) => html`
                <div class="tabstrip-activity-item">
                  <pds-icon class="tabstrip-activity-icon" icon="activity"></pds-icon>
                  <div class="tabstrip-activity-content">
                    <strong>New sale recorded</strong>
                    <div class="tabstrip-activity-meta">
                      Order #${activity.orderId} - ${activity.amount}
                    </div>
                  </div>
                  <span class="tabstrip-activity-time">${activity.time}</span>
                </div>
              `
            )}
          </div>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="details" label="Analytics">
      <div class="tabstrip-panel">
        <div>
          <h3>Detailed Analytics</h3>
          <p class="tabstrip-panel__description">
            Deep dive into your product metrics and user behavior.
          </p>
        </div>

        <article class="card tabstrip-analytics-card">
          <h4>Traffic Sources</h4>
          <div class="tabstrip-traffic-list">
            ${tabstripTrafficSources.map(
              (source) => html`
                <div>
                  <div class="tabstrip-traffic-row">
                    <span>${source.label}</span>
                    <strong>${source.value}</strong>
                  </div>
                  <div class="tabstrip-traffic-bar-track">
                    <div class="tabstrip-traffic-bar-fill ${source.fillClass}"></div>
                  </div>
                </div>
              `
            )}
          </div>
        </article>

        <article class="card surface-elevated tabstrip-features-card">
          <h4>Top Features</h4>
          <ul class="tabstrip-features-list">
            ${tabstripFeatures.map((feature) => html`<li>${feature}</li>`)}
          </ul>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="settings" label="Settings">
      <div class="tabstrip-panel">
        <div>
          <h3>Product Settings</h3>
          <p class="tabstrip-panel__description">
            Configure your product preferences and options.
          </p>
        </div>

        <article class="card tabstrip-settings-card">
          <h4>General Settings</h4>
          <div class="tabstrip-settings-fields">
            <label class="tabstrip-form-label">
              <span class="tabstrip-field-heading">Product Name</span>
              <input
                class="tabstrip-input"
                type="text"
                value="My Awesome Product"
                placeholder="Enter product name"
              />
            </label>

            <label class="tabstrip-form-label">
              <span class="tabstrip-field-heading">Product Category</span>
              <select class="tabstrip-select">
                ${tabstripCategories.map(
                  (category) => html`<option>${category}</option>`
                )}
              </select>
            </label>
          </div>
        </article>

        <article class="card surface-elevated tabstrip-notifications-card">
          <h4>Notifications</h4>
          <fieldset class="tabstrip-notification-group" role="radiogroup">
            ${tabstripNotificationOptions.map(
              (option) => html`
                <label class="tabstrip-checkbox">
                  <input type="checkbox" ?checked=${option.checked} />
                  <span>${option.label}</span>
                </label>
              `
            )}
          </fieldset>
        </article>

        <div class="tabstrip-actions">
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
