import { LitElement, html } from "./lit.js";

export class DsShowcase extends LitElement {
  static properties = {
    config: { type: Object },
    designer: { type: Object },
  };

  constructor() {
    super();
    this.config = null;
    this.designer = null;
  }

  // Disable shadow DOM to use global styles
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    // Listen for design updates from ds-designer
    document.addEventListener("design-updated", (e) => {
      this.config = e.detail.config;
      this.designer = e.detail.designer;
    });

    // Listen for field changes to scroll to relevant section
    document.addEventListener("design-field-changed", (e) => {
      setTimeout(() => {
        this.scrollToRelevantSection(e.detail.field);
      }, 1000);
    });
  }

  scrollToRelevantSection(fieldPath) {
    console.log("🎯 Scrolling to section for field:", fieldPath);

    // Remove leading slash if present (pds-jsonform sends "/behavior.transitionSpeed")
    const normalizedPath = fieldPath.startsWith("/")
      ? fieldPath.slice(1)
      : fieldPath;
    console.log("  Normalized path:", normalizedPath);

    // Map field paths to section IDs
    const sectionMap = {
      // Colors
      "colors/primary": "color-system",
      "colors/secondary": "color-system",
      "colors/accent": "color-system",
      "colors/background": "color-system",
      "colors/success": "color-system",
      "colors/warning": "color-system",
      "colors/danger": "color-system",
      "colors/info": "color-system",

      // Typography
      "typography/": "typography",

      // Spacing
      "spatialRhythm/": "spacing",

      // Shadows & Layers
      "layers/": "surfaces-shadows",

      // Shape (radius, borders)
      "shape/": "buttons",

      // Behavior (transitions - goes to interactive states where transition demo lives)
      "behavior/transitionSpeed": "interactive-states",
      "behavior/": "interactive-states",

      // Components
      "components/forms": "forms",
      "components/alerts": "alerts",
      "components/badges": "badges",
      "components/tables": "tables",
      "components/toasts": "toasts",
      "components/modals": "modals",
      "components/tabStrip": "tabs",

      // Icons
      "icons/": "icons",
    };

    // Find matching section
    let sectionId = null;
    for (const [pattern, id] of Object.entries(sectionMap)) {
      if (normalizedPath.startsWith(pattern)) {
        sectionId = id;
        console.log(`  ✓ Matched pattern "${pattern}" → section "${id}"`);
        break;
      }
    }

    if (sectionId) {
      // Find the section element
      const section = this.querySelector(`[data-section="${sectionId}"]`);
      console.log(
        `  Searching for section: [data-section="${sectionId}"]`,
        section ? "✓ Found" : "✗ Not found"
      );

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });

        // Add a brief highlight effect
        section.style.transition = "background-color 0.3s ease";
        section.style.backgroundColor = "var(--color-primary-50)";
        setTimeout(() => {
          section.style.backgroundColor = "";
        }, 1500);

        console.log("  ✓ Scrolled and highlighted section");
      } else {
        console.warn(
          `  ✗ Section [data-section="${sectionId}"] not found in DOM`
        );
      }
    } else {
      console.warn(`  ✗ No section mapping found for field: ${fieldPath}`);
    }
  }

  renderDisabledSection(title, message) {
    return html`
      <section class="showcase-section disabled">
        <h2>${title}</h2>
        <p class="disabled-message">${message}</p>
      </section>
    `;
  }

  render() {
    const components = this.config?.components || {};

    return html`
      <div class="showcase-container">
        <!-- Hero Section -->
        <section class="showcase-hero">
          <h1>Pure Design System</h1>
          <p>Why build a design system if you can generate it?</p>
          <div class="btn-group">
            <button class="btn-primary btn-lg">
              <svg-icon icon="download"></svg-icon>
              Get Started
            </button>
            <button class="btn-secondary btn-lg" @click=${this.readDocs}
              <svg-icon icon="book-open"></svg-icon>
              View Docs
            </button>
          </div>
        </section>

        <!-- Colors Section -->
        <section class="showcase-section" data-section="color-system">
          <h2>
            <svg-icon icon="palette" size="lg" class="icon-primary"></svg-icon>
            Color System
          </h2>

          <div class="color-grid">
            ${this.renderColorCard("Primary", "primary")}
            ${this.renderColorCard("Secondary", "secondary")}
            ${this.renderColorCard("Accent", "accent")}
            ${this.renderColorCard("Success", "success")}
            ${this.renderColorCard("Warning", "warning")}
            ${this.renderColorCard("Danger", "danger")}
            ${this.renderColorCard("Info", "info")}
          </div>

          <h3>Semantic Color Usage</h3>
          <div class="semantic-usage">
            <div class="semantic-message success">
              <svg-icon
                icon="check-circle"
                class="icon-success"
                size="lg"
              ></svg-icon>
              <div>
                <strong>Success</strong>
                <p>Operations completed successfully</p>
              </div>
            </div>

            <div class="semantic-message warning">
              <svg-icon
                icon="warning"
                class="icon-warning"
                size="lg"
              ></svg-icon>
              <div>
                <strong>Warning</strong>
                <p>Please review carefully</p>
              </div>
            </div>

            <div class="semantic-message danger">
              <svg-icon
                icon="x-circle"
                class="icon-danger"
                size="lg"
              ></svg-icon>
              <div>
                <strong>Danger</strong>
                <p>Critical error occurred</p>
              </div>
            </div>

            <div class="semantic-message info">
              <svg-icon icon="info" class="icon-info" size="lg"></svg-icon>
              <div>
                <strong>Info</strong>
                <p>Helpful information</p>
              </div>
            </div>
          </div>

          <h3>Gray Scale (from Secondary)</h3>
          <div class="gray-scale-grid">
            ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map(
              (shade) => html`
                <div class="gray-scale-item">
                  <div
                    class="gray-scale-swatch"
                    style="background-color: var(--color-gray-${shade});"
                    title="gray-${shade}"
                  ></div>
                  <div class="gray-scale-label">${shade}</div>
                </div>
              `
            )}
          </div>
        </section>

        <!-- Derived Color Scales Section -->
        <section class="showcase-section alt-bg">
          <h2>
            <svg-icon icon="sun" size="lg" class="icon-warning"></svg-icon>
            Derived Color Scales
          </h2>
          <p>
            Complete 9-step color scales (50-800) automatically generated from
            your base colors. Each scale maintains proper contrast and color
            relationships.
          </p>

          <h3>Primary Color Scale</h3>
          ${this.renderColorScale("primary")}

          <h3>Secondary (Neutral) Scale</h3>
          ${this.renderColorScale("secondary")}

          <h3>Accent Color Scale</h3>
          ${this.renderColorScale("accent")}

          <h3>Semantic Color Scales (Auto-Derived)</h3>
          <p class="interactive-demo">
            These colors are automatically derived from your primary color with
            intelligent hue shifting for semantic meaning.
          </p>

          ${this.renderColorScale("success")}
          ${this.renderColorScale("warning")} ${this.renderColorScale("danger")}
          ${this.renderColorScale("info")}
        </section>

        <!-- Typography Section -->
        <section class="showcase-section alt-bg" data-section="typography">
          <h2>
            <svg-icon icon="text-aa" size="lg" class="icon-primary"></svg-icon>
            Typography
          </h2>

          <div class="demo-grid cols-1">
            <h1>Heading 1 - The quick brown fox</h1>
            <h2>Heading 2 - The quick brown fox</h2>
            <h3>Heading 3 - The quick brown fox</h3>
            <h4>Heading 4 - The quick brown fox</h4>
            <h5>Heading 5 - The quick brown fox</h5>
            <h6>Heading 6 - The quick brown fox</h6>
            <p>
              Regular paragraph text with <a href="#">a link</a> and
              <code>inline code</code>.
            </p>
          </div>
        </section>

        <!-- Buttons Section -->
        <section class="showcase-section" data-section="buttons">
          <h2>
            <svg-icon
              icon="cursor-click"
              size="lg"
              class="icon-primary"
            ></svg-icon>
            Buttons
          </h2>

          <div class="flex-wrap">
            <button class="btn-primary">Primary</button>
            <button class="btn-secondary">Secondary</button>
            <button class="btn-outline">Outline</button>
            <button class="btn-primary" disabled>Disabled</button>
          </div>

          <h3>Sizes</h3>
          <div class="flex-wrap">
            <button class="btn-primary btn-sm">Small</button>
            <button class="btn-primary">Default</button>
            <button class="btn-primary btn-lg">Large</button>
          </div>

          <h3>Icon Buttons</h3>
          <div class="flex-wrap gap-sm">
            <button class="icon-only btn-primary">
              <svg-icon icon="gear" label="Settings"></svg-icon>
            </button>
            <button class="icon-only btn-secondary">
              <svg-icon icon="bell" label="Notifications"></svg-icon>
            </button>
            <button class="icon-only btn-outline">
              <svg-icon icon="heart" label="Favorite"></svg-icon>
            </button>
            <button class="btn-primary">
              <svg-icon icon="download"></svg-icon>
              <span>Download</span>
            </button>
          </div>
        </section>

        <!-- Forms Section -->
        ${
          components.forms
            ? html`
                <section class="showcase-section alt-bg" data-section="forms">
                  <h2>
                    <svg-icon
                      icon="note-pencil"
                      size="lg"
                      class="icon-primary"
                    ></svg-icon>
                    Form Controls
                  </h2>

                  <form
                    class="form-demo"
                    onsubmit="event.preventDefault(); console.log('Form submitted (prevented)'); return false;"
                  >
                    <fieldset>
                      <legend>Personal Information</legend>

                      <label>
                        <span>Full Name</span>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </label>

                      <label>
                        <span>Email</span>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </label>

                      <label>
                        <span>Phone</span>
                        <input type="tel" placeholder="+1 (555) 000-0000" />
                      </label>

                      <label>
                        <span>Date of Birth</span>
                        <input type="date" />
                      </label>

                      <label>
                        <span>Time</span>
                        <input type="time" />
                      </label>

                      <label>
                        <span>Password</span>
                        <input type="password" placeholder="Enter password" />
                      </label>

                      <label>
                        <span>Country</span>
                        <select>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Other</option>
                        </select>
                      </label>

                      <label>
                        <span>Number</span>
                        <input type="number" min="0" max="100" value="50" />
                      </label>

                      <label>
                        <span>Range</span>
                        <input type="range" min="0" max="100" value="50" />
                      </label>

                      <label>
                        <span>Color</span>
                        <input type="color" value="#2d9dc9" />
                      </label>

                      <label>
                        <span>Search</span>
                        <input type="search" placeholder="Search..." />
                      </label>

                      <label>
                        <span>URL</span>
                        <input type="url" placeholder="https://example.com" />
                      </label>

                      <label>
                        <span>File Upload</span>
                        <pds-upload name="file"></pds-upload>
                      </label>

                      <label>
                        <span>Message</span>
                        <textarea
                          rows="4"
                          placeholder="Your message here..."
                        ></textarea>
                      </label>
                    </fieldset>

                    <fieldset>
                      <legend>Preferences</legend>

                      <label data-toggle>
                        <input type="checkbox" checked />
                        Subscribe to newsletter
                      </label>

                      <label data-toggle>
                        <input type="checkbox" />
                        Receive marketing emails
                      </label>
                    </fieldset>

                    <fieldset>
                      <legend>Toggle Switches (Progressive Enhancement)</legend>

                      <label data-toggle>
                        <input type="checkbox" checked />
                        Enable notifications
                      </label>

                      <label data-toggle>
                        <input type="checkbox" />
                        Dark mode
                      </label>

                      <label data-toggle>
                        <input type="checkbox" checked />
                        Auto-save
                      </label>
                    </fieldset>

                    <div class="form-demo-actions">
                      <button type="submit" class="btn-primary">
                        Submit Form
                      </button>
                      <button type="reset" class="btn-secondary">Reset</button>
                      <button type="button" class="btn-outline">Cancel</button>
                    </div>
                  </form>
                </section>
              `
            : this.renderDisabledSection(
                "Form Controls",
                "Form styles are disabled. Enable in the designer panel."
              )
        }

        <!-- Alerts Section -->
        ${
          components.alerts
            ? html`
                <section class="showcase-section" data-section="alerts">
                  <h2>
                    <svg-icon
                      icon="bell-ringing"
                      size="lg"
                      class="icon-primary"
                    ></svg-icon>
                    Alerts & Feedback
                  </h2>

                  <div class="demo-grid cols-1">
                    <div class="alert alert-success">
                      <div class="alert-icon">
                        <svg-icon
                          icon="check-circle"
                          class="icon-success"
                          size="lg"
                        ></svg-icon>
                      </div>
                      <div>
                        <div class="alert-title">Success!</div>
                        <p>Your operation completed successfully.</p>
                      </div>
                    </div>

                    <div class="alert alert-info">
                      <div class="alert-icon">
                        <svg-icon
                          icon="info"
                          class="icon-info"
                          size="lg"
                        ></svg-icon>
                      </div>
                      <div>
                        <div class="alert-title">Information</div>
                        <p>This is an informational message.</p>
                      </div>
                    </div>

                    <div class="alert alert-warning">
                      <div class="alert-icon">
                        <svg-icon
                          icon="warning"
                          class="icon-warning"
                          size="lg"
                        ></svg-icon>
                      </div>
                      <div>
                        <div class="alert-title">Warning</div>
                        <p>Please review this warning.</p>
                      </div>
                    </div>

                    <div class="alert alert-danger">
                      <div class="alert-icon">
                        <svg-icon
                          icon="x-circle"
                          class="icon-danger"
                          size="lg"
                        ></svg-icon>
                      </div>
                      <div>
                        <div class="alert-title">Error</div>
                        <p>An error occurred.</p>
                      </div>
                    </div>
                  </div>
                </section>
              `
            : this.renderDisabledSection(
                "Alerts & Feedback",
                "Alert styles are disabled. Enable in the designer panel."
              )
        }

        <!-- Badges Section -->
        ${
          components.badges
            ? html`
                <section class="showcase-section alt-bg">
                  <h2>
                    <svg-icon
                      icon="tag"
                      size="lg"
                      class="icon-primary"
                    ></svg-icon>
                    Badges & Pills
                  </h2>

                  <h3>Default Badges</h3>
                  <div class="badge-grid">
                    <span class="badge">Default</span>
                    <span class="badge badge-primary">Primary</span>
                    <span class="badge badge-secondary">Secondary</span>
                    <span class="badge badge-success">Success</span>
                    <span class="badge badge-warning">Warning</span>
                    <span class="badge badge-danger">Danger</span>
                    <span class="badge badge-info">Info</span>
                  </div>

                  <h3>Outlined Badges</h3>
                  <div class="badge-grid">
                    <span class="badge badge-outline badge-primary"
                      >Primary</span
                    >
                    <span class="badge badge-outline badge-secondary"
                      >Secondary</span
                    >
                    <span class="badge badge-outline badge-success"
                      >Success</span
                    >
                    <span class="badge badge-outline badge-info">Info</span>
                    <span class="badge badge-outline badge-warning"
                      >Warning</span
                    >
                    <span class="badge badge-outline badge-danger">Danger</span>
                  </div>

                  <h3>Badge Sizes</h3>
                  <div class="size-demo">
                    <span class="badge badge-primary badge-sm">Small</span>
                    <span class="badge badge-primary">Default</span>
                    <span class="badge badge-primary badge-lg">Large</span>
                  </div>

                  <h3>Pills</h3>
                  <div class="badge-grid">
                    <span class="pill badge-primary">React</span>
                    <span class="pill badge-secondary">Vue</span>
                    <span class="pill badge-success">Node.js</span>
                    <span class="pill badge-info">TypeScript</span>
                    <span class="pill badge-warning">JavaScript</span>
                    <span class="pill badge-danger">Critical</span>
                  </div>
                </section>
              `
            : this.renderDisabledSection(
                "Badges & Pills",
                "Badge styles are disabled. Enable in the designer panel."
              )
        }

        <!-- Media Elements Section -->
        <section class="showcase-section">
          <h2>
            <svg-icon icon="image" size="lg" class="icon-primary"></svg-icon>
            Media Elements
          </h2>

          <h3>Responsive Images</h3>
          <div class="media-grid">
            <figure class="media-figure">
              <img
                class="media-image"
                src="https://picsum.photos/800/600?random=1"
                alt="Random landscape"
              />
              <figcaption class="media-caption">
                <strong>Figure 1:</strong> A beautiful landscape demonstrating
                image handling in the design system.
              </figcaption>
            </figure>

            <figure class="media-figure">
              <img
                class="media-image"
                src="https://picsum.photos/800/600?random=2"
                alt="Random architecture"
              />
              <figcaption class="media-caption">
                <strong>Figure 2:</strong> Architectural photography showcasing
                the responsive image behavior.
              </figcaption>
            </figure>
          </div>

          <h3>Image Gallery</h3>
          <div class="gallery-grid">
            <img
              class="gallery-image"
              src="https://picsum.photos/400/400?random=3"
              alt="Gallery image 1"
            />
            <img
              class="gallery-image"
              src="https://picsum.photos/400/400?random=4"
              alt="Gallery image 2"
            />
            <img
              class="gallery-image"
              src="https://picsum.photos/400/400?random=5"
              alt="Gallery image 3"
            />
            <img
              class="gallery-image"
              src="https://picsum.photos/400/400?random=6"
              alt="Gallery image 4"
            />
          </div>

          <h3>Video Element</h3>
          <figure class="video-container">
            <video
              class="video-element"
              controls
              poster="https://picsum.photos/1200/675?random=7"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <figcaption class="media-caption">
              <strong>Video Demo:</strong> Big Buck Bunny sample video
              demonstrating video element styling.
            </figcaption>
          </figure>
        </section>

        <!-- Enhanced Components Section -->
        <section class="showcase-section alt-bg">
          <h2>
            <svg-icon
              icon="brackets-curly"
              size="lg"
              class="icon-primary"
            ></svg-icon>
            Enhanced Components
          </h2>

          <h3>Dropdown Menu (Progressive Enhancement)</h3>
          <p class="dropdown-demo">
            Click the button to toggle the dropdown menu:
          </p>
          <nav data-dropdown>
            <button class="btn-primary">
              <svg-icon icon="list"></svg-icon>
              Click for Menu
            </button>
            <menu class="dropdown-menu">
              <ul>
                <li>
                  <a href="#">
                    <svg-icon icon="user" size="sm"></svg-icon>
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg-icon icon="gear" size="sm"></svg-icon>
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" class="danger">
                    <svg-icon icon="x" size="sm"></svg-icon>
                    Logout
                  </a>
                </li>
              </ul>
            </menu>
          </nav>
        </section>

        <!-- Icons Section -->
        <section class="showcase-section" data-section="icons">
          <h2>
            <svg-icon icon="star" size="lg" class="icon-accent"></svg-icon>
            Icon System
          </h2>

          <h3>Sizes</h3>
          <div class="icon-sizes">
            <svg-icon icon="heart" size="xs"></svg-icon>
            <svg-icon icon="heart" size="sm"></svg-icon>
            <svg-icon icon="heart" size="md"></svg-icon>
            <svg-icon icon="heart" size="lg"></svg-icon>
            <svg-icon icon="heart" size="xl"></svg-icon>
            <svg-icon icon="heart" size="2xl"></svg-icon>
          </div>

          <h3>Semantic Colors</h3>
          <div class="icon-colors">
            <svg-icon
              icon="check-circle"
              class="icon-primary"
              size="lg"
            ></svg-icon>
            <svg-icon
              icon="check-circle"
              class="icon-secondary"
              size="lg"
            ></svg-icon>
            <svg-icon
              icon="check-circle"
              class="icon-accent"
              size="lg"
            ></svg-icon>
            <svg-icon
              icon="check-circle"
              class="icon-success"
              size="lg"
            ></svg-icon>
            <svg-icon icon="warning" class="icon-warning" size="lg"></svg-icon>
            <svg-icon icon="x-circle" class="icon-danger" size="lg"></svg-icon>
            <svg-icon icon="info" class="icon-info" size="lg"></svg-icon>
          </div>

          <h3>Icon with Text</h3>
          <div class="icon-text-demo">
            <div class="icon-text">
              <svg-icon icon="envelope"></svg-icon>
              <span>Email</span>
            </div>
            <div class="icon-text">
              <svg-icon icon="phone"></svg-icon>
              <span>Phone</span>
            </div>
            <div class="icon-text">
              <svg-icon icon="user"></svg-icon>
              <span>Profile</span>
            </div>
            <div class="icon-text">
              <svg-icon icon="calendar"></svg-icon>
              <span>Schedule</span>
            </div>
          </div>

          <h3>Inputs with Icons</h3>
          <div class="input-icon-demo">
            <div class="input-icon">
              <svg-icon icon="magnifying-glass"></svg-icon>
              <input type="search" placeholder="Search..." />
            </div>
            <div class="input-icon input-icon-end">
              <input type="text" placeholder="Username" />
              <svg-icon icon="user"></svg-icon>
            </div>
          </div>

          <h3>Common Icons</h3>
          <div class="icon-grid">
            <div class="icon-grid-item">
              <svg-icon icon="house" size="lg"></svg-icon>
              <span class="icon-grid-label">house</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="gear" size="lg"></svg-icon>
              <span class="icon-grid-label">gear</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="bell" size="lg"></svg-icon>
              <span class="icon-grid-label">bell</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="heart" size="lg"></svg-icon>
              <span class="icon-grid-label">heart</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="star" size="lg"></svg-icon>
              <span class="icon-grid-label">star</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="trash" size="lg"></svg-icon>
              <span class="icon-grid-label">trash</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="pencil" size="lg"></svg-icon>
              <span class="icon-grid-label">pencil</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="check" size="lg"></svg-icon>
              <span class="icon-grid-label">check</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="x" size="lg"></svg-icon>
              <span class="icon-grid-label">x</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="plus" size="lg"></svg-icon>
              <span class="icon-grid-label">plus</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="minus" size="lg"></svg-icon>
              <span class="icon-grid-label">minus</span>
            </div>
            <div class="icon-grid-item">
              <svg-icon icon="download" size="lg"></svg-icon>
              <span class="icon-grid-label">download</span>
            </div>
          </div>
        </section>

        <!-- Layout & Cards Section -->
        <section class="showcase-section alt-bg">
          <h2>
            <svg-icon icon="desktop" size="lg" class="icon-primary"></svg-icon>
            Layout & Cards
          </h2>

          <div class="demo-grid cols-1">
            <div class="card-elevated">
              <h3>Elevated Surface</h3>
              <p>This surface has a subtle shadow and elevated background.</p>
            </div>

            <div class="demo-grid cols-3">
              <div class="card-basic">
                <h4>Card 1</h4>
                <p>Cards provide a clean container for content.</p>
              </div>
              <div class="card-basic">
                <h4>Card 2</h4>
                <p>They have consistent spacing and shadows.</p>
              </div>
              <div class="card-basic">
                <h4>Card 3</h4>
                <p>And they respond beautifully to hover states.</p>
              </div>
            </div>
          </div>


          <h3>Accordion Component</h3>
          <section class="accordion" aria-label="FAQ">
            <details>
              <summary id="q1">How billing works</summary>
              <div role="region" aria-labelledby="q1">
                <p>We charge monthly on the 1st…</p>
              </div>
            </details>

            <details>
              <summary id="q2">Refund policy</summary>
              <div role="region" aria-labelledby="q2">
                <p>You can request a refund within 14 days…</p>
              </div>
            </details>

            <details>
              <summary id="q3">Invoices</summary>
              <div role="region" aria-labelledby="q3">
                <p>Download invoices from Settings → Billing…</p>
              </div>
            </details>
          </section>


        </section>

        <!-- Tables Section -->
        ${
          components.tables
            ? html`
                <section class="showcase-section">
                  <h2>
                    <svg-icon
                      icon="list"
                      size="lg"
                      class="icon-primary"
                    ></svg-icon>
                    Tables
                  </h2>

                  <h3>Default Table</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alice Johnson</td>
                        <td>Senior Developer</td>
                        <td>Engineering</td>
                        <td><span class="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>Bob Smith</td>
                        <td>Product Manager</td>
                        <td>Product</td>
                        <td><span class="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>Carol Williams</td>
                        <td>UX Designer</td>
                        <td>Design</td>
                        <td><span class="badge badge-warning">Away</span></td>
                      </tr>
                      <tr>
                        <td>David Brown</td>
                        <td>DevOps Engineer</td>
                        <td>Engineering</td>
                        <td><span class="badge badge-danger">Offline</span></td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>Striped Table</h3>
                  <table class="table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Laptop Pro</td>
                        <td>$1,299</td>
                        <td>45</td>
                        <td>Electronics</td>
                      </tr>
                      <tr>
                        <td>Wireless Mouse</td>
                        <td>$29</td>
                        <td>128</td>
                        <td>Accessories</td>
                      </tr>
                      <tr>
                        <td>USB-C Hub</td>
                        <td>$59</td>
                        <td>76</td>
                        <td>Accessories</td>
                      </tr>
                      <tr>
                        <td>Monitor 27"</td>
                        <td>$449</td>
                        <td>23</td>
                        <td>Electronics</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>Bordered Compact Table</h3>
                  <table class="table-bordered table-compact">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#101</td>
                        <td>Fix navigation bug</td>
                        <td><span class="badge badge-danger">High</span></td>
                        <td>Oct 15, 2025</td>
                      </tr>
                      <tr>
                        <td>#102</td>
                        <td>Update documentation</td>
                        <td><span class="badge badge-warning">Medium</span></td>
                        <td>Oct 18, 2025</td>
                      </tr>
                      <tr>
                        <td>#103</td>
                        <td>Refactor CSS</td>
                        <td><span class="badge badge-info">Low</span></td>
                        <td>Oct 25, 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              `
            : this.renderDisabledSection(
                "Tables",
                "Table styles are disabled. Enable in the designer panel."
              )
        }

        <!-- Form Groups Section -->
        <section class="showcase-section alt-bg">
          <h2>
            <svg-icon
              icon="list-bullets"
              size="lg"
              class="icon-primary"
            ></svg-icon>
            Form Groups
          </h2>

          <div class="demo-grid cols-2">
            <div class="form-group">
              <h3>Radio Buttons</h3>
              <fieldset role="radiogroup">
                <legend>Select your plan</legend>
                <label>
                  <input type="radio" name="plan" value="free" checked />
                  <span>Free - $0/month</span>
                </label>
                <label>
                  <input type="radio" name="plan" value="pro" />
                  <span>Pro - $29/month</span>
                </label>
                <label>
                  <input type="radio" name="plan" value="enterprise" />
                  <span>Enterprise - $99/month</span>
                </label>
              </fieldset>
            </div>

            <div class="form-group">
              <h3>Checkboxes</h3>
              <fieldset role="group">
                <legend>Select features</legend>
                <label>
                  <input type="checkbox" name="features" value="api" checked />
                  <span>API Access</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="features"
                    value="analytics"
                    checked
                  />
                  <span>Advanced Analytics</span>
                </label>
                <label>
                  <input type="checkbox" name="features" value="support" />
                  <span>Priority Support</span>
                </label>
                <label>
                  <input type="checkbox" name="features" value="sso" />
                  <span>Single Sign-On</span>
                </label>
              </fieldset>
            </div>
          </div>
        </section>

        <!-- Surfaces Section -->
        <section class="showcase-section">
          <h2>
            <svg-icon icon="palette" size="lg" class="icon-primary"></svg-icon>
            Surface Variants & Elevation
          </h2>

          <h3>Surface Types</h3>
          <div class="surface-demo-grid">
            <div class="surface-base">
              <strong class="surface-title">Base Surface</strong>
              <p class="surface-description">Default background color</p>
            </div>
            <div class="surface-subtle">
              <strong class="surface-title">Subtle Surface</strong>
              <p class="surface-description">Slightly different tone</p>
            </div>
            <div class="surface-elevated">
              <strong class="surface-title">Elevated Surface</strong>
              <p class="surface-description">Raised with shadow</p>
            </div>
            <div class="surface-overlay">
              <strong class="surface-title">Overlay Surface</strong>
              <p class="surface-description">Modal/dropdown backgrounds</p>
            </div>
          </div>

          <h3>Shadow Elevation</h3>
          <div class="shadow-demo-grid">
            <div class="shadow-demo-item shadow-sm">
              <strong>Small</strong>
              <p>--shadow-sm</p>
            </div>
            <div class="shadow-demo-item shadow-md">
              <strong>Medium</strong>
              <p>--shadow-md</p>
            </div>
            <div class="shadow-demo-item shadow-lg">
              <strong>Large</strong>
              <p>--shadow-lg</p>
            </div>
          </div>
        </section>

        <!-- Interactive States Section -->
        <section
          class="showcase-section alt-bg"
          data-section="interactive-states"
        >
          <h2>
            <svg-icon
              icon="cursor-click"
              size="lg"
              class="icon-primary"
            ></svg-icon>
            Interactive States
          </h2>

          <h3>Focus States</h3>
          <p class="interactive-demo">
            Press Tab to navigate and see focus rings on interactive elements:
          </p>
          <div class="flex-wrap">
            <button class="btn-primary">Button 1</button>
            <button class="btn-secondary">Button 2</button>
            <input type="text" placeholder="Focus me" />
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <a href="#">Link</a>
          </div>

          <h3>Transition Speeds</h3>
          <p class="interactive-demo">
            Current setting:
            <strong
              >${this.config?.behavior?.transitionSpeed || "normal"}</strong
            >
            <br />
            Click the button to see the transition in action:
          </p>

          <div class="transition-speed-demo">
            <button class="btn-primary" @click="${this.triggerTransitionDemo}">
              <svg-icon icon="play" size="sm"></svg-icon>
              Animate Transition
            </button>

            <div class="transition-demo-stage">
              <div class="transition-demo-ball" id="transition-ball">
                <svg-icon icon="cursor-click" size="lg"></svg-icon>
              </div>
            </div>
          </div>

          <p class="interactive-demo" style="margin-top: var(--spacing-4);">
            Change the <em>Transition Speed</em> setting in the designer panel
            to see how it affects the animation.
          </p>
        </section>

        <!-- Toast Notifications Section -->
        ${
          components.toasts
            ? html`
                <section class="showcase-section">
                  <h2>
                    <svg-icon
                      icon="bell-ringing"
                      size="lg"
                      class="icon-primary"
                    ></svg-icon>
                    Toast Notifications
                  </h2>

                  <p class="toast-demo-description">
                    Toast notifications appear in the top-right corner and
                    auto-dismiss after a few seconds. Click the buttons below to
                    see them in action:
                  </p>

                  <div class="demo-grid cols-2">
                    <button
                      class="btn-primary"
                      @click="${this.showSuccessToast}"
                    >
                      <svg-icon icon="check-circle" size="sm"></svg-icon>
                      Success Toast
                    </button>
                    <button
                      class="btn-secondary"
                      @click="${this.showInfoToast}"
                    >
                      <svg-icon icon="info" size="sm"></svg-icon>
                      Info Toast
                    </button>
                    <button
                      class="btn-warning"
                      @click="${this.showWarningToast}"
                    >
                      <svg-icon icon="warning" size="sm"></svg-icon>
                      Warning Toast
                    </button>
                    <button class="btn-danger" @click="${this.showErrorToast}">
                      <svg-icon icon="x-circle" size="sm"></svg-icon>
                      Error Toast
                    </button>
                    <button class="btn-outline" @click="${this.showLongToast}">
                      <svg-icon icon="clock" size="sm"></svg-icon>
                      Long Message
                    </button>
                    <button
                      class="btn-outline"
                      @click="${this.showPersistentToast}"
                    >
                      <svg-icon icon="bell" size="sm"></svg-icon>
                      Persistent Toast
                    </button>
                  </div>
                </section>
              `
            : this.renderDisabledSection(
                "Toast Notifications",
                "Toast notifications are disabled. Enable in the designer panel."
              )
        }


            


        ${
          this.config?.components?.tabStrip
            ? html`
                <!-- Tab Strip Section -->
                <section class="showcase-section alt-bg" data-section="tabs">
                  <h2>
                    <svg-icon icon="tabs"></svg-icon>
                    Tab Strip
                  </h2>
                  <p>
                    Accessible tab navigation with hash-based routing and
                    keyboard support.
                  </p>

                  <div style="margin-top: var(--spacing-6);">
                    <pds-tabstrip label="Example Tabs">
                      <tab-panel id="overview" label="Overview">
                        <h3>Overview</h3>
                        <p>
                          This is the overview tab. Tab strips provide organized
                          navigation between related content.
                        </p>
                      </tab-panel>

                      <tab-panel id="features" label="Features">
                        <h3>Features</h3>
                        <p>
                          Tab strips are built with modern web components and
                          include:
                        </p>
                        <ul>
                          <li>
                            <strong>Deep linking:</strong> Each tab has a unique
                            URL hash
                          </li>
                          <li>
                            <strong>Progressive enhancement:</strong> Works
                            without JavaScript
                          </li>
                          <li>
                            <strong>Responsive:</strong> Adapts to mobile and
                            desktop
                          </li>
                          <li>
                            <strong>Customizable:</strong> Style with CSS
                            variables
                          </li>
                        </ul>
                      </tab-panel>

                      <tab-panel id="usage" label="Usage">
                        <h3>Usage</h3>
                        <p>Simple markup example:</p>
                        <pre><code>&lt;pds-tabstrip label="My Tabs"&gt;
  &lt;tab-panel id="tab1" label="First Tab"&gt;
    Content for first tab
  &lt;/tab-panel&gt;
  &lt;tab-panel id="tab2" label="Second Tab"&gt;
    Content for second tab
  &lt;/tab-panel&gt;
&lt;/pds-tabstrip&gt;</code></pre>
                      </tab-panel>

                      <tab-panel id="accessibility" label="Accessibility">
                        <h3>Accessibility</h3>
                        <p>Built with accessibility in mind:</p>
                        <ul>
                          <li><code>aria-label</code> on navigation</li>
                          <li><code>aria-current</code> on active tab</li>
                          <li>
                            <code>aria-controls</code> linking tabs to panels
                          </li>
                          <li><code>role="region"</code> on tab panels</li>
                          <li>Keyboard navigation with arrow keys</li>
                          <li>Focus management</li>
                        </ul>
                      </tab-panel>
                    </pds-tabstrip>
                  </div>
                </section>
              `
            : ""
        }
        ${
          components.drawer
            ? html`
                <!-- Drawer Section -->
                <section class="showcase-section">
                  <h2>Drawer Example</h2>
                  <button @click=${this.openDrawer}>Open Drawer</button>
                  <pds-drawer position="bottom" id="exampleDrawer">
                    <div class="surface-overlay" slot="drawer-header">
                      <h3>Example Drawer</h3>
                    </div>
                    <div class="surface-overlay" slot="drawer-content">
                      Drawer content goes here.
                    </div>
                  </pds-drawer>
                </section>
              `
            : ""
        }
      </div>
    `;
  }

  readDocs(e) {
    document
      .querySelector("pure-app")
      .toast(
        "Documentation will soon be available.",
        { type: "info", persistent: true }
      );
  }

  openDrawer() {
    const drawer = this.querySelector("#exampleDrawer");
    if (drawer) {
      drawer.open = !drawer.open;
    }
  }

  // Toast handler methods
  showSuccessToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast("Your changes have been saved successfully!", {
        type: "success",
      });
    }
  }

  showInfoToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast("This is an informational message with helpful context.", {
        type: "info",
      });
    }
  }

  showWarningToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast("Warning: This action cannot be undone!", { type: "warning" });
    }
  }

  showErrorToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast("Error: Something went wrong. Please try again.", {
        type: "error",
      });
    }
  }

  showLongToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast(
        "This is a longer toast notification message that demonstrates how the duration is automatically calculated based on the message length. The toast will stay visible longer to give you enough time to read the entire message.",
        { type: "info" }
      );
    }
  }

  showPersistentToast() {
    const app = document.querySelector("pure-app");
    if (app?.toast) {
      app.toast(
        "This is a persistent toast that won't auto-dismiss. Click the × to close it.",
        {
          type: "info",
          persistent: true,
        }
      );
    }
  }

  triggerTransitionDemo() {
    const ball = this.querySelector("#transition-ball");
    if (!ball) return;

    // Remove the animated class to reset
    ball.classList.remove("animated");

    // Force a reflow to restart the animation
    void ball.offsetWidth;

    // Add the animated class to trigger the transition
    ball.classList.add("animated");

    // Reset after animation completes (using slow transition as max)
    setTimeout(() => {
      ball.classList.remove("animated");
    }, 1000);
  }

  renderColorCard(name, color) {
    return html`
      <div class="color-card">
        <div
          class="color-card-header"
          style="background-color: var(--color-${color}-600);"
        >
          ${name}
        </div>
        <div class="color-card-body">
          <div class="color-scale-grid">
            ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map(
              (shade) => html`
                <div
                  class="color-scale-swatch"
                  style="background-color: var(--color-${color}-${shade});"
                  title="${color}-${shade}"
                ></div>
              `
            )}
          </div>
          <p class="color-card-footer">9-step scale from 50 to 800</p>
        </div>
      </div>
    `;
  }

  renderColorScale(colorName) {
    return html`
      <div class="color-scale-container">
        <div class="color-scale-row">
          <div class="color-scale-label">${colorName}</div>
          <div class="color-scale-swatches">
            ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map((shade) => {
              const textColor =
                shade >= 400 ? "white" : `var(--color-${colorName}-900)`;
              return html`
                <div
                  class="color-scale-swatch-interactive"
                  style="
                    background: var(--color-${colorName}-${shade});
                    color: ${textColor};
                  "
                  @mouseover="${(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.zIndex = "10";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}"
                  @mouseout="${(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.zIndex = "1";
                    e.currentTarget.style.boxShadow = "none";
                  }}"
                  title="${colorName}-${shade}"
                >
                  ${shade}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("ds-showcase", DsShowcase);
