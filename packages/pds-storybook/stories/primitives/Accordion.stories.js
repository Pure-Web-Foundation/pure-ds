import { html } from 'lit';

export default {
  title: 'Primitives/Accordion',
  parameters: {
    docs: {
      description: {
        component: 'Accessible accordion using native HTML details/summary elements with proper ARIA attributes and progressive enhancement.'
      }
    }
  }
};

export const BasicAccordion = () => html`
  <div style="padding: var(--spacing-4); max-width: 700px;">
    <section class="accordion" aria-label="FAQ">
      <details>
        <summary id="q1">How does billing work?</summary>
        <div role="region" aria-labelledby="q1">
          <p>We charge monthly on the 1st of each month. You can cancel anytime before your next billing date.</p>
        </div>
      </details>

      <details>
        <summary id="q2">What is your refund policy?</summary>
        <div role="region" aria-labelledby="q2">
          <p>You can request a refund within 14 days of purchase. We'll process it within 5-7 business days.</p>
        </div>
      </details>

      <details>
        <summary id="q3">How do I download invoices?</summary>
        <div role="region" aria-labelledby="q3">
          <p>Download invoices from Settings → Billing → Invoice History. You can export them as PDF.</p>
        </div>
      </details>
    </section>
  </div>
`;

BasicAccordion.storyName = 'Basic Accordion';

export const AccordionWithRichContent = () => html`
  <div style="padding: var(--spacing-4); max-width: 800px;">
    <h2>Feature Documentation</h2>
    <section class="accordion" aria-label="Features">
      <details open>
        <summary id="feature1">Getting Started</summary>
        <div class="card" role="region" aria-labelledby="feature1">
          <h4>Welcome to Pure Design System</h4>
          <p>Pure DS is a generative design system that creates complete design tokens from just a few base colors.</p>
          <ul>
            <li>Generate 9-step color scales automatically</li>
            <li>Smart surface system with auto-contrast</li>
            <li>Responsive grid utilities</li>
            <li>Mesh gradient backgrounds</li>
          </ul>
          <button class="btn-primary btn-sm" style="margin-top: var(--spacing-2);">
            <pds-icon icon="download" size="sm"></pds-icon>
            Download
          </button>
        </div>
      </details>

      <details>
        <summary id="feature2">Color System</summary>
        <div role="region" aria-labelledby="feature2">
          <p>The color system automatically generates semantic colors and full scales from your base palette.</p>
          <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-3);">
            <span class="badge badge-primary">Primary</span>
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-danger">Danger</span>
          </div>
          <p style="margin-top: var(--spacing-3);">
            Each color includes a 9-step scale from 50 (lightest) to 800 (darkest).
          </p>
        </div>
      </details>

      <details>
        <summary id="feature3">Smart Surfaces</summary>
        <div role="region" aria-labelledby="feature3">
          <h4>Automatic Contrast Management</h4>
          <p>Surfaces automatically adjust text, icons, and shadow colors to maintain WCAG AA contrast ratios.</p>
          <div class="grid grid-cols-2 gap-sm" style="margin-top: var(--spacing-3);">
            <div class="surface-elevated" style="padding: var(--spacing-4); border-radius: var(--radius-md); text-align: center;">
              <pds-icon icon="sun" size="lg"></pds-icon>
              <p style="margin-top: var(--spacing-2);">Elevated Surface</p>
            </div>
            <div class="surface-overlay" style="padding: var(--spacing-4); border-radius: var(--radius-md); text-align: center;">
              <pds-icon icon="moon" size="lg"></pds-icon>
              <p style="margin-top: var(--spacing-2);">Overlay Surface</p>
            </div>
          </div>
        </div>
      </details>

      <details>
        <summary id="feature4">Grid System</summary>
        <div role="region" aria-labelledby="feature4">
          <p>Modern CSS Grid-based layout system with fixed and auto-fit responsive options.</p>
          <pre style="background: var(--color-surface-subtle); padding: var(--spacing-3); border-radius: var(--radius-sm); margin-top: var(--spacing-3); overflow-x: auto;"><code>/* Fixed columns */
.grid-cols-3 { ... }

/* Auto-fit responsive */
.grid-auto-sm { ... }
.grid-auto-md { ... }</code></pre>
        </div>
      </details>
    </section>
  </div>
`;

AccordionWithRichContent.storyName = 'Accordion with Rich Content';

export const NestedAccordion = () => html`
  <div style="padding: var(--spacing-4); max-width: 700px;">
    <h2>Nested Accordion Example</h2>
    <section class="accordion" aria-label="Product Categories">
      <details>
        <summary id="cat1">Electronics</summary>
        <div role="region" aria-labelledby="cat1">
          <p>Browse our electronics collection:</p>
          
          <section class="accordion" aria-label="Electronics Subcategories" style="margin-top: var(--spacing-3);">
            <details>
              <summary id="cat1-1">Computers</summary>
              <div role="region" aria-labelledby="cat1-1">
                <ul>
                  <li>Laptops</li>
                  <li>Desktops</li>
                  <li>Tablets</li>
                </ul>
              </div>
            </details>
            
            <details>
              <summary id="cat1-2">Phones</summary>
              <div role="region" aria-labelledby="cat1-2">
                <ul>
                  <li>Smartphones</li>
                  <li>Feature Phones</li>
                  <li>Accessories</li>
                </ul>
              </div>
            </details>
          </section>
        </div>
      </details>

      <details>
        <summary id="cat2">Clothing</summary>
        <div role="region" aria-labelledby="cat2">
          <p>Shop our clothing lines:</p>
          
          <section class="accordion" aria-label="Clothing Subcategories" style="margin-top: var(--spacing-3);">
            <details>
              <summary id="cat2-1">Men's</summary>
              <div role="region" aria-labelledby="cat2-1">
                <ul>
                  <li>Shirts</li>
                  <li>Pants</li>
                  <li>Shoes</li>
                </ul>
              </div>
            </details>
            
            <details>
              <summary id="cat2-2">Women's</summary>
              <div role="region" aria-labelledby="cat2-2">
                <ul>
                  <li>Dresses</li>
                  <li>Tops</li>
                  <li>Accessories</li>
                </ul>
              </div>
            </details>
          </section>
        </div>
      </details>

      <details>
        <summary id="cat3">Home & Garden</summary>
        <div role="region" aria-labelledby="cat3">
          <p>Everything for your home:</p>
          <ul>
            <li>Furniture</li>
            <li>Decor</li>
            <li>Kitchen</li>
            <li>Garden Tools</li>
          </ul>
        </div>
      </details>
    </section>
  </div>
`;

NestedAccordion.storyName = 'Nested Accordion';

export const SingleExpandAccordion = () => html`
  <div style="padding: var(--spacing-4); max-width: 700px;">
    <h2>Settings</h2>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      <em>Note: This example shows standard behavior. For single-expand (only one open at a time), add JavaScript.</em>
    </p>
    
    <section class="accordion" aria-label="Settings">
      <details>
        <summary id="set1">
          <pds-icon icon="user" size="sm"></pds-icon>
          <span>Profile Settings</span>
        </summary>
        <div class="card" role="region" aria-labelledby="set1">
          <form method="post" action="#">
            <label>
              <span>Display Name</span>
              <input type="text" value="John Doe" />
            </label>
            <label style="margin-top: var(--spacing-3);">
              <span>Email</span>
              <input type="email" value="john@example.com" />
            </label>
            <button type="submit" class="btn-primary btn-sm" style="margin-top: var(--spacing-3);">
              Save Changes
            </button>
          </form>
        </div>
      </details>

      <details>
        <summary id="set2">
          <pds-icon icon="bell" size="sm"></pds-icon>
          <span>Notifications</span>
        </summary>
        <div role="region" aria-labelledby="set2">
          <label data-toggle>
            <input type="checkbox" checked />
            <span>Email notifications</span>
          </label>
          <label data-toggle>
            <input type="checkbox" checked />
            <span>Push notifications</span>
          </label>
          <label data-toggle>
            <input type="checkbox" />
            <span>SMS notifications</span>
          </label>
        </div>
      </details>

      <details>
        <summary id="set3">
          <pds-icon icon="lock" size="sm"></pds-icon>
          <span>Privacy & Security</span>
        </summary>
        <div role="region" aria-labelledby="set3">
          <p>Manage your privacy and security settings.</p>
          <label data-toggle style="margin-top: var(--spacing-3);">
            <input type="checkbox" checked />
            <span>Two-factor authentication</span>
          </label>
          <label data-toggle>
            <input type="checkbox" />
            <span>Login alerts</span>
          </label>
          <button class="btn-secondary btn-sm" style="margin-top: var(--spacing-3);">
            Change Password
          </button>
        </div>
      </details>

      <details>
        <summary id="set4">
          <pds-icon icon="palette" size="sm"></pds-icon>
          <span>Appearance</span>
        </summary>
        <div role="region" aria-labelledby="set4">
          <fieldset role="radiogroup">
            <legend>Theme</legend>
            <label>
              <input type="radio" name="theme" value="light" />
              <span>Light</span>
            </label>
            <label>
              <input type="radio" name="theme" value="dark" checked />
              <span>Dark</span>
            </label>
            <label>
              <input type="radio" name="theme" value="auto" />
              <span>Auto</span>
            </label>
          </fieldset>
        </div>
      </details>
    </section>
  </div>
`;

SingleExpandAccordion.storyName = 'Settings Accordion';
