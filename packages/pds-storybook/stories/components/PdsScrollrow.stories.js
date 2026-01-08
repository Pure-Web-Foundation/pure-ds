import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'Horizontal scrolling container with navigation buttons'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-scrollrow');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-scrollrow', error);
    });
}

// Demo-specific styles for scrollrow cards (min-width required for scroll behavior)
const scrollrowStoryStyles = html`
  <style>
    .scrollrow-card { min-width: 18.75rem; }
    .scrollrow-card--sm { min-width: 12.5rem; }
    .scrollrow-card--product { min-width: 17.5rem; }
    .scrollrow-image { 
      min-width: 18.75rem; 
      height: 12.5rem; 
      object-fit: cover; 
      border-radius: var(--radius-md); 
    }
    .scrollrow-avatar {
      width: 100px;
      height: 100px;
      border-radius: var(--radius-full);
      margin: 0 auto;
    }
    .scrollrow-product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
    .scrollrow-price {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
  </style>
`;

export default {
  title: 'Components/Pds Scrollrow',
  tags: ['autodocs', 'scrollrow', 'scroll', 'carousel', 'horizontal', 'overflow'],
  parameters: {
    pds: {
      tags: ['scrollrow', 'scroll', 'carousel', 'horizontal', 'overflow', 'pds-scrollrow', 'layout']
    },
    docs: docsParameters
  }
};

export const Default = () => html`
  ${scrollrowStoryStyles}
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <article class="card scrollrow-card stack-sm">
        <h4>Card ${i + 1}</h4>
        <p>This is card content that scrolls horizontally.</p>
        <button class="btn-primary">Action</button>
      </article>
    `)}
  </pds-scrollrow>
`;

export const WithImages = () => html`
  ${scrollrowStoryStyles}
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <img 
        src="https://picsum.photos/300/200?random=${i}" 
        alt="Gallery image ${i + 1}"
        class="scrollrow-image">
    `)}
  </pds-scrollrow>
`;

export const ProductGallery = () => html`
  ${scrollrowStoryStyles}
  <div class="stack-md">
    <h3>Featured Products</h3>
    <pds-scrollrow snap="start">
      ${Array.from({ length: 8 }, (_, i) => html`
        <article class="card scrollrow-card--product stack-sm">
          <img 
            src="https://picsum.photos/280/200?random=${100 + i}" 
            alt="Product ${i + 1}"
            class="scrollrow-product-image">
          <h4>Product ${i + 1}</h4>
          <small class="text-muted">Premium quality product with amazing features.</small>
          <div class="flex justify-between items-center">
            <span class="scrollrow-price">$${(i + 1) * 10 + 29}</span>
            <button class="btn-primary btn-sm">
              <pds-icon icon="shopping-cart" size="sm"></pds-icon>
              Add
            </button>
          </div>
        </article>
      `)}
    </pds-scrollrow>
  </div>
`;

ProductGallery.storyName = 'Product Gallery';

export const UserProfiles = () => html`
  ${scrollrowStoryStyles}
  <div class="stack-md">
    <h3>Team Members</h3>
    <pds-scrollrow>
      ${Array.from({ length: 12 }, (_, i) => html`
        <article class="card surface-elevated scrollrow-card--sm stack-sm text-center">
          <img 
            src="https://i.pravatar.cc/150?img=${i + 1}" 
            alt="Team member ${i + 1}"
            class="scrollrow-avatar">
          <h4>Team Member ${i + 1}</h4>
          <p><small class="text-muted">Role Title</small></p>
          <button class="btn-outline btn-sm">
            <pds-icon icon="chat-circle" size="sm"></pds-icon>
            Message
          </button>
        </article>
      `)}
    </pds-scrollrow>
  </div>
`;

UserProfiles.storyName = 'User Profiles';
