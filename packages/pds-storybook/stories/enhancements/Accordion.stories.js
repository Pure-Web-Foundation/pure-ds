import { html } from 'lit';
import { enhancementHeader } from './_enhancement-header.js';

export default {
  title: 'Enhancements/Accordion',
  tags: ['grouping', 'enhancement', 'accordion'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['grouping', 'navigation', 'enhancement', 'accordion']
    }
  }
};

export const BasicAccordion = () => html`
  ${enhancementHeader('accordion')}
  <div class="card max-w-lg">
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
  ${enhancementHeader('accordion')}
  <div class="card stack-md max-w-xl">
    <h2>Feature Documentation</h2>
    <section class="accordion" aria-label="Features">
      <details open>
        <summary id="feature1">Getting Started</summary>
        <div class="card stack-md" role="region" aria-labelledby="feature1">
          <h4>Welcome to Pure Design System</h4>
          <p>Pure Design System is a generative design system that creates complete design tokens from just a few base colors.</p>
          <ul>
            <li>Generate 9-step color scales automatically</li>
            <li>Smart surface system with auto-contrast</li>
            <li>Responsive grid utilities</li>
            <li>Mesh gradient backgrounds</li>
          </ul>
          <button class="btn-primary btn-sm">
            <pds-icon icon="download" size="sm"></pds-icon>
            Download
          </button>
        </div>
      </details>

      <details>
        <summary id="feature2">Color System</summary>
        <div class="stack-md" role="region" aria-labelledby="feature2">
          <p>The color system automatically generates semantic colors and full scales from your base palette.</p>
          <div class="flex gap-xs flex-wrap">
            <span class="badge badge-primary">Primary</span>
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-danger">Danger</span>
          </div>
          <p>Each color includes a 9-step scale from 50 (lightest) to 800 (darkest).</p>
        </div>
      </details>

      <details>
        <summary id="feature3">Smart Surfaces</summary>
        <div class="stack-md" role="region" aria-labelledby="feature3">
          <h4>Automatic Contrast Management</h4>
          <p>Surfaces automatically adjust text, icons, and shadow colors to maintain WCAG AA contrast ratios.</p>
          <div class="grid grid-cols-2 gap-sm">
            <div class="surface-elevated card text-center stack-md">
              <pds-icon icon="sun" size="lg"></pds-icon>
              <small>Elevated Surface</small>
            </div>
            <div class="surface-overlay card text-center stack-md">
              <pds-icon icon="moon" size="lg"></pds-icon>
              <small>Overlay Surface</small>
            </div>
          </div>
        </div>
      </details>

      <details>
        <summary id="feature4">Grid System</summary>
        <div class="stack-md" role="region" aria-labelledby="feature4">
          <p>Modern CSS Grid-based layout system with fixed and auto-fit responsive options.</p>
          <pre><code>/* Fixed columns */
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
  ${enhancementHeader('accordion')}
  <div class="card stack-md max-w-lg">
    <h2>Nested Accordion Example</h2>
    <section class="accordion" aria-label="Product Categories">
      <details>
        <summary id="cat1">Electronics</summary>
        <div class="stack-md" role="region" aria-labelledby="cat1">
          <p>Browse our electronics collection:</p>
          
          <section class="accordion" aria-label="Electronics Subcategories">
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
        <div class="stack-md" role="region" aria-labelledby="cat2">
          <p>Shop our clothing lines:</p>
          
          <section class="accordion" aria-label="Clothing Subcategories">
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
  ${enhancementHeader('accordion')}
  <div class="card stack-md max-w-lg">
    <header>
      <h2>Settings</h2>
      <small class="text-muted">
        <em>Note: This example shows standard behavior. For single-expand (only one open at a time), add JavaScript.</em>
      </small>
    </header>
    
    <section class="accordion" aria-label="Settings">
      <details>
        <summary id="set1">
          <pds-icon icon="user" size="sm"></pds-icon>
          <span>Profile Settings</span>
        </summary>
        <div class="card stack-md" role="region" aria-labelledby="set1">
          <form method="post" action="#">
            <label>
              <span>Display Name</span>
              <input type="text" value="John Doe" placeholder="Enter your display name" />
            </label>
            <label>
              <span>Email</span>
              <div class="input-icon">
                <pds-icon icon="envelope"></pds-icon>
                <input type="email" value="john@example.com" placeholder="your.email@example.com" />
              </div>
            </label>
            <button type="submit" class="btn-primary btn-sm">
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
        <div class="stack-md" role="region" aria-labelledby="set2">
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
        <div class="stack-md" role="region" aria-labelledby="set3">
          <p>Manage your privacy and security settings.</p>
          <label data-toggle>
            <input type="checkbox" checked />
            <span>Two-factor authentication</span>
          </label>
          <label data-toggle>
            <input type="checkbox" />
            <span>Login alerts</span>
          </label>
          <button class="btn-secondary btn-sm">
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
