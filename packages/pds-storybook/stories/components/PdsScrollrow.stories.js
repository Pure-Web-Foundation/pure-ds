import { html } from "#pds/lit";

const docsParameters = {
  description: {
    component: "Horizontal scrolling container with navigation buttons",
  },
};

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-scrollrow");
    })
    .catch((error) => {
      console.warn(
        "storybook: docs page failed to load for pds-scrollrow",
        error
      );
    });
}

// Demo-specific styles for scrollrow cards (min-width required for scroll behavior)
const scrollrowStoryStyles = html`
  <style>
    .story-scrollrow-card {
      min-width: 18.75rem;
    }
    .story-scrollrow-card--sm {
      min-width: 12.5rem;
    }
    .story-scrollrow-image {
      min-width: 18.75rem;
      height: 12.5rem;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
    .story-scrollrow-avatar {
      width: 100px;
      height: 100px;
      border-radius: var(--radius-full);
      margin: 0 auto;
    }
    .story-product-gallery {
      article.card {
        min-width: 250px;
        display: flex;
        flex-direction: column;
      }
      .story-product-content {
        flex: 1;
      }
      .story-product-footer {
        margin-top: auto;
        padding-top: var(--spacing-3);
      }
    }
    .story-product-image {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
    .story-product-price {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-600);
    }
  </style>
`;

export default {
  title: "Components/pds-scrollrow",
  tags: [
    "autodocs",
    "scrollrow",
    "scroll",
    "carousel",
    "horizontal",
    "overflow",
  ],
  parameters: {
    pds: {
      tags: [
        "scrollrow",
        "scroll",
        "carousel",
        "horizontal",
        "overflow",
        "pds-scrollrow",
        "layout",
      ],
    },
    docs: docsParameters,
  },
};

export const Default = () => html`
  ${scrollrowStoryStyles}
  <pds-scrollrow>
    ${Array.from(
      { length: 10 },
      (_, i) => html`
        <article class="card story-scrollrow-card">
          <h4>Card ${i + 1}</h4>
          <p>This is card content that scrolls horizontally.</p>
          <button class="btn-primary">Action</button>
        </article>
      `
    )}
  </pds-scrollrow>
`;

export const WithImages = () => html`
  ${scrollrowStoryStyles}
  <pds-scrollrow>
    ${Array.from(
      { length: 10 },
      (_, i) => html`
        <img
          src="https://picsum.photos/300/200?random=${i}"
          alt="Gallery image ${i + 1}"
          class="story-scrollrow-image"
        />
      `
    )}
  </pds-scrollrow>
`;

export const ProductGallery = () => html`
  ${scrollrowStoryStyles}
  <div class="stack-md">
    <h3>Featured Products</h3>
    <pds-scrollrow snap="start" class="story-product-gallery">
      ${Array.from(
        { length: 8 },
        (_, i) => html`
          <article class="card">
            <img
              src="https://picsum.photos/280/200?random=${100 + i}"
              alt="Product ${i + 1}"
              class="story-product-image"
            />
            <div class="story-product-content">
              <h4>Product ${i + 1}</h4>
              <small class="text-muted"
                >Premium quality product with amazing features.</small
              >
            </div>
            <div class="story-product-footer flex justify-between items-center">
              <span class="story-product-price">$${(i + 1) * 10 + 29}</span>
              <button class="btn-primary btn-sm">
                <pds-icon icon="shopping-cart" size="sm"></pds-icon>
                Add
              </button>
            </div>
          </article>
        `
      )}
    </pds-scrollrow>
  </div>
`;

ProductGallery.storyName = "Product Gallery";

export const UserProfiles = () => html`
  ${scrollrowStoryStyles}
  <div class="stack-md">
    <h3>Team Members</h3>
    <pds-scrollrow>
      ${Array.from(
        { length: 12 },
        (_, i) => html`
          <article
            class="card surface-elevated story-scrollrow-card--sm stack-sm text-center"
          >
            <img
              src="https://i.pravatar.cc/150?img=${i + 1}"
              alt="Team member ${i + 1}"
              class="story-scrollrow-avatar"
            />
            <h4>Team Member ${i + 1}</h4>
            <p><small class="text-muted">Role Title</small></p>
            <button class="btn-outline btn-sm">
              <pds-icon icon="chat-circle" size="sm"></pds-icon>
              Message
            </button>
          </article>
        `
      )}
    </pds-scrollrow>
  </div>
`;

UserProfiles.storyName = "User Profiles";

export const CustomStyledButtons = () => html`
  ${scrollrowStoryStyles}
  <style>
    .story-scrollrow-custom-buttons::part(prev),
    .story-scrollrow-custom-buttons::part(next) {
      background: rgba(var(--color-primary-rgb), 0.15);
      border: 2px solid var(--color-primary);
      color: var(--color-primary);
      border-radius: var(--radius-full);
      backdrop-filter: blur(4px);
    }
    .story-scrollrow-custom-buttons::part(prev):hover,
    .story-scrollrow-custom-buttons::part(next):hover {
      background: rgba(var(--color-primary-rgb), 0.3);
    }
  </style>
  <div class="stack-md">
    <h3>Outlined Semitransparent Buttons</h3>
    <pds-scrollrow class="story-scrollrow-custom-buttons">
      ${Array.from(
        { length: 10 },
        (_, i) => html`
          <article class="card story-scrollrow-card">
            <h4>Card ${i + 1}</h4>
            <p>
              Custom styled navigation buttons with outline and transparency.
            </p>
            <button class="btn-primary">Action</button>
          </article>
        `
      )}
    </pds-scrollrow>
  </div>
`;

CustomStyledButtons.storyName = "Custom Styled Buttons";

export const ExternalButtons = () => html`
  ${scrollrowStoryStyles}
  <style>
    .story-scrollrow-external::part(prev),
    .story-scrollrow-external::part(next) {
      display: none;
    }
    .story-external-nav-btn {
      background: rgba(var(--color-surface-rgb), 0.8);
      border: 2px solid var(--color-border);
      color: var(--color-text);
      width: 3rem;
      height: 3rem;
      border-radius: var(--radius-full);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .story-external-nav-btn:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-on-primary);
    }
  </style>
  <div class="stack-sm">
    <h3>External Navigation Buttons</h3>
    <pds-scrollrow class="story-scrollrow-external">
      ${Array.from(
        { length: 10 },
        (_, i) => html`
          <article class="card story-scrollrow-card">
            <h4>Card ${i + 1}</h4>
            <p>Navigation buttons are below the scroll area.</p>
            <button class="btn-secondary">Details</button>
          </article>
        `
      )}
    </pds-scrollrow>
    <div class="flex justify-center gap-md">
      <button
        class="story-external-nav-btn"
        part="prev"
        onclick="this.closest('.stack-sm').querySelector('pds-scrollrow').doPage({currentTarget: this})"
      >
        <pds-icon icon="caret-left"></pds-icon>
      </button>
      <button
        class="story-external-nav-btn"
        part="next"
        onclick="this.closest('.stack-sm').querySelector('pds-scrollrow').doPage({currentTarget: this})"
      >
        <pds-icon icon="caret-right"></pds-icon>
      </button>
    </div>
  </div>
`;

ExternalButtons.storyName = "External Buttons";
