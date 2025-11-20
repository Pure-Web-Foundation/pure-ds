import { html } from "lit";

export default {
  title: "Components/Pds Tabstrip",
  parameters: {
    docs: {
      description: {
        component: "Accessible tab interface with keyboard navigation",
      },
    },
  },
};

export const Default = () => html`
  <pds-tabstrip label="Product Dashboard">
    <pds-tabpanel id="overview" label="Overview">
      <div style="padding: var(--spacing-4);">
        <h3>Product Overview</h3>
        <p style="margin-bottom: var(--spacing-4); opacity: 0.9;">
          Complete analytics and insights for your product performance.
        </p>

        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4); margin-bottom: var(--spacing-6);"
        >
          <article class="card surface-elevated">
            <h4>Total Sales</h4>
            <div
              style="font-size: 2.5rem; font-weight: 700; color: var(--color-primary); margin: var(--spacing-2) 0;"
            >
              $127.5K
            </div>
            <p style="font-size: 0.85rem; opacity: 0.7; margin: 0;">
              ↑ 23% from last month
            </p>
          </article>

          <article class="card surface-elevated">
            <h4>Active Users</h4>
            <div
              style="font-size: 2.5rem; font-weight: 700; color: var(--color-secondary); margin: var(--spacing-2) 0;"
            >
              8,432
            </div>
            <p style="font-size: 0.85rem; opacity: 0.7; margin: 0;">
              ↑ 12% from last month
            </p>
          </article>

          <article class="card surface-elevated">
            <h4>Conversion Rate</h4>
            <div
              style="font-size: 2.5rem; font-weight: 700; color: var(--color-accent); margin: var(--spacing-2) 0;"
            >
              3.8%
            </div>
            <p style="font-size: 0.85rem; opacity: 0.7; margin: 0;">
              ↑ 0.5% from last month
            </p>
          </article>
        </div>

        <article class="card">
          <h4>Recent Activity</h4>
          <div
            style="margin-top: var(--spacing-3); display: flex; flex-direction: column; gap: var(--spacing-2);"
          >
            ${Array.from(
              { length: 4 },
              (_, i) => html`
                <div
                  style="display: flex; align-items: center; gap: var(--spacing-3); padding: var(--spacing-2); border-radius: var(--radius-sm);"
                >
                  <pds-icon
                    icon="activity"
                    style="color: var(--color-primary);"
                  ></pds-icon>
                  <div style="flex: 1;">
                    <strong>New sale recorded</strong>
                    <div style="font-size: 0.85rem; opacity: 0.7;">
                      Order #${1000 + i} - $${(i + 1) * 150}
                    </div>
                  </div>
                  <span style="font-size: 0.75rem; opacity: 0.6;"
                    >${i + 1}h ago</span
                  >
                </div>
              `
            )}
          </div>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="details" label="Analytics">
      <div style="padding: var(--spacing-4);">
        <h3>Detailed Analytics</h3>
        <p style="margin-bottom: var(--spacing-4); opacity: 0.9;">
          Deep dive into your product metrics and user behavior.
        </p>

        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>Traffic Sources</h4>
          <div
            style="margin-top: var(--spacing-3); display: flex; flex-direction: column; gap: var(--spacing-3);"
          >
            <div>
              <div
                style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-1);"
              >
                <span>Direct</span>
                <strong>45%</strong>
              </div>
              <div
                style="height: 8px; background: var(--surface-elevated); border-radius: var(--radius-full); overflow: hidden;"
              >
                <div
                  style="height: 100%; width: 45%; background: var(--color-primary);"
                ></div>
              </div>
            </div>
            <div>
              <div
                style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-1);"
              >
                <span>Search Engines</span>
                <strong>32%</strong>
              </div>
              <div
                style="height: 8px; background: var(--surface-elevated); border-radius: var(--radius-full); overflow: hidden;"
              >
                <div
                  style="height: 100%; width: 32%; background: var(--color-secondary);"
                ></div>
              </div>
            </div>
            <div>
              <div
                style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-1);"
              >
                <span>Social Media</span>
                <strong>23%</strong>
              </div>
              <div
                style="height: 8px; background: var(--surface-elevated); border-radius: var(--radius-full); overflow: hidden;"
              >
                <div
                  style="height: 100%; width: 23%; background: var(--color-accent);"
                ></div>
              </div>
            </div>
          </div>
        </article>

        <article class="card surface-elevated">
          <h4>Top Features</h4>
          <ul style="margin-top: var(--spacing-3);">
            <li>Deep linking with URL hashes for bookmarkable tabs</li>
            <li>Keyboard navigation (Arrow keys, Home, End)</li>
            <li>Accessible ARIA attributes for screen readers</li>
            <li>Automatic focus management</li>
            <li>Responsive design that adapts to mobile</li>
          </ul>
        </article>
      </div>
    </pds-tabpanel>

    <pds-tabpanel id="settings" label="Settings">
      <div style="padding: var(--spacing-4);">
        <h3>Product Settings</h3>
        <p style="margin-bottom: var(--spacing-4); opacity: 0.9;">
          Configure your product preferences and options.
        </p>

        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>General Settings</h4>
          <div
            style="margin-top: var(--spacing-3); display: flex; flex-direction: column; gap: var(--spacing-3);"
          >
            <label style="display: block;">
              <strong style="display: block; margin-bottom: var(--spacing-1);"
                >Product Name</strong
              >
              <input
                type="text"
                value="My Awesome Product"
                placeholder="Enter product name"
                style="width: 100%; padding: var(--spacing-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm);"
              />
            </label>

            <label style="display: block;">
              <strong style="display: block; margin-bottom: var(--spacing-1);"
                >Product Category</strong
              >
              <select>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
                <option>Sports</option>
              </select>
            </label>
          </div>
        </article>

        <article
          class="card surface-elevated"
          style="margin-bottom: var(--spacing-4);"
        >
          <h4>Notifications</h4>
          <fieldset role="radiogroup">
            <label>
              <input type="checkbox" checked />
              <span>Email notifications for new orders</span>
            </label>
            <label>
              <input type="checkbox" checked />
              <span>Weekly performance reports</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Marketing updates</span>
            </label>
          </fieldset>
        </article>

        <div style="display: flex; gap: var(--spacing-2);">
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
