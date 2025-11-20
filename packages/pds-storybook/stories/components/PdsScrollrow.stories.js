import { html } from 'lit';

export default {
  title: 'Components/Pds Scrollrow',
  parameters: {
    docs: {
      description: {
        component: 'Horizontal scrolling container with navigation buttons'
      }
    }
  }
};

export const Default = () => html`
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <article class="card" style="min-width: 300px;">
        <h4>Card ${i + 1}</h4>
        <p>This is card content that scrolls horizontally.</p>
        <button class="btn-primary">Action</button>
      </article>
    `)}
  </pds-scrollrow>
`;

export const WithImages = () => html`
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <img 
        src="https://picsum.photos/300/200?random=${i}" 
        alt="Gallery image ${i + 1}"
        style="min-width: 300px; height: 200px; object-fit: cover; border-radius: var(--radius-md);">
    `)}
  </pds-scrollrow>
`;

export const ProductGallery = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Featured Products</h3>
    <pds-scrollrow snap="start">
      ${Array.from({ length: 8 }, (_, i) => html`
        <article class="card" style="min-width: 280px;">
          <img 
            src="https://picsum.photos/280/200?random=${100 + i}" 
            alt="Product ${i + 1}"
            style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--spacing-3);">
          <h4>Product ${i + 1}</h4>
          <p style="opacity: 0.8; font-size: 0.9rem;">Premium quality product with amazing features.</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-3);">
            <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">$${(i + 1) * 10 + 29}</span>
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
  <div style="padding: var(--spacing-4);">
    <h3>Team Members</h3>
    <pds-scrollrow>
      ${Array.from({ length: 12 }, (_, i) => html`
        <article class="card surface-elevated" style="min-width: 200px; text-align: center;">
          <img 
            src="https://i.pravatar.cc/150?img=${i + 1}" 
            alt="Team member ${i + 1}"
            style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto var(--spacing-3);">
          <h4 style="margin-bottom: var(--spacing-1);">Team Member ${i + 1}</h4>
          <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: var(--spacing-3);">Role Title</p>
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
