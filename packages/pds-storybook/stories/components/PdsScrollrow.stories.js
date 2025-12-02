import { html } from 'lit';

export default {
  title: 'Components/Pds Scrollrow',
  parameters: {
    pds: {
      tags: ['layout' ]
    },
    docs: {
      description: {
        component: 'Horizontal scrolling container with navigation buttons'
      }
    }
  }
};

export const Default = () => html`
  <style>
    .scrollrow-default-card {
      min-width: 18.75rem;
    }
  </style>
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <article class="card scrollrow-default-card">
        <h4>Card ${i + 1}</h4>
        <p>This is card content that scrolls horizontally.</p>
        <button class="btn-primary">Action</button>
      </article>
    `)}
  </pds-scrollrow>
`;

export const WithImages = () => html`
  <style>
    .scrollrow-image-card {
      min-width: 18.75rem;
      height: 12.5rem;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
  </style>
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <img 
        src="https://picsum.photos/300/200?random=${i}" 
        alt="Gallery image ${i + 1}"
        class="scrollrow-image-card">
    `)}
  </pds-scrollrow>
`;

export const ProductGallery = () => html`
<style>
  .scrollrow-product-wrap {
    padding: var(--spacing-4);
  }
  .scrollrow-product-card {
    min-width: 17.5rem;
  }
  .product-price {
    font-size: 1.5rem; font-weight: 700; color: var(--color-primary);
  }
  .product-image {
    width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--spacing-3);
  }

</style>
  <div class="scrollrow-product-wrap">
    <h3>Featured Products</h3>
    <pds-scrollrow snap="start">
      ${Array.from({ length: 8 }, (_, i) => html`
        <article class="card scrollrow-product-card">
          <img 
            src="https://picsum.photos/280/200?random=${100 + i}" 
            alt="Product ${i + 1}"
            class="product-image">
          <h4>Product ${i + 1}</h4>
          <small class="text-muted">Premium quality product with amazing features.</small>
          <div class="flex justify-between align-center" >
            <span class="product-price">$${(i + 1) * 10 + 29}</span>
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
  <style>
    .avatar-lg {
      width: 100px; height: 100px; border-radius: var(--radius-full); margin: 0 auto var(--spacing-3);
    }
    .scrollrow-profile-card {
      min-width: 12.5rem;
      text-align: center;
    }
  </style>
  <div>
    <h3>Team Members</h3>
    <pds-scrollrow>
      ${Array.from({ length: 12 }, (_, i) => html`
        <article class="card surface-elevated scrollrow-profile-card">
          <img 
            src="https://i.pravatar.cc/150?img=${i + 1}" 
            alt="Team member ${i + 1}"
            class="avatar-lg"
            >
          <h4 class="">Team Member ${i + 1}</h4>
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
