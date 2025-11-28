import { html } from 'lit';

export default {
  title: 'Primitives/Cards',
  tags: ['cards', 'layout', 'spacing', 'surface'],
  parameters: {
    pds: {
      tags: ['cards', 'layout', 'spacing', 'surface']
    },
    docs: {
      description: {
        component: 'Versatile content containers with multiple surface variants. Cards automatically adapt to your theme and support nesting for complex layouts.'
      }
    }
  }
};

export const BasicCards = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Basic Cards</h3>
    <div class="grid gap-md" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <article class="card">
        <h3>Default Card</h3>
        <p>Card content goes here. This is a basic card primitive with automatic theming.</p>
        <button class="btn-primary">Action</button>
      </article>
      
      <article class="card">
        <h3>With Icon</h3>
        <div class="flex items-start gap-sm">
          <pds-icon icon="star" size="lg" class="icon-primary"></pds-icon>
          <div>
            <p>Cards can contain icons, buttons, forms, and any other content.</p>
          </div>
        </div>
        <button class="btn-outline">Learn More</button>
      </article>

      <article class="card">
        <h3>Interactive Card</h3>
        <p>With multiple actions and rich content.</p>
        <div class="flex gap-sm" style="margin-top: var(--spacing-3);">
          <button class="btn-primary btn-sm">
            <pds-icon icon="heart" size="sm"></pds-icon>
            Like
          </button>
          <button class="btn-secondary btn-sm">
            <pds-icon icon="share" size="sm"></pds-icon>
            Share
          </button>
          <button class="icon-only btn-outline btn-sm">
            <pds-icon icon="bookmark" size="sm" label="Bookmark"></pds-icon>
          </button>
        </div>
      </article>
    </div>
  </div>
`;

BasicCards.storyName = 'Basic Cards';

export const SurfaceVariants = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Surface Variants</h3>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      Different surface levels create visual hierarchy
    </p>
    
    <div class="grid gap-md" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
      <article class="card">
        <h4>Default Surface</h4>
        <p>Standard card surface level. Use for most content containers.</p>
        <code>.card</code>
      </article>

      <article class="card surface-elevated">
        <h4>Elevated Surface</h4>
        <p>Appears raised above the default surface. Great for important content or hover states.</p>
        <code>.surface-elevated</code>
      </article>

      <article class="card surface-overlay">
        <h4>Overlay Surface</h4>
        <p>Highest surface level. Perfect for modal dialogs and floating panels.</p>
        <code>.surface-overlay</code>
      </article>
    </div>
  </div>
`;

SurfaceVariants.storyName = 'Surface Variants';

export const NestedCards = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Nested Cards</h3>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      Surface variants enable natural nesting without visual confusion
    </p>
    
    <article class="card" style="max-width: 600px;">
      <h3>Parent Card (Default Surface)</h3>
      <p>This is the outer container using the default card surface.</p>

      <div style="margin-top: var(--spacing-4);">
        <article class="card surface-elevated">
          <h4>Nested Card (Elevated)</h4>
          <p>This card is nested inside the parent and uses the elevated surface for clear visual separation.</p>
          
          <div style="margin-top: var(--spacing-3);">
            <article class="card surface-overlay">
              <h5>Deeply Nested (Overlay)</h5>
              <p style="font-size: 0.9rem;">Even deeper nesting maintains readability with the overlay surface.</p>
            </article>
          </div>
        </article>
      </div>

      <button class="btn-primary" style="margin-top: var(--spacing-4);">Parent Action</button>
    </article>
  </div>
`;

NestedCards.storyName = 'Nested Cards';

export const CardLayouts = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Horizontal Card</h3>
    <article class="card flex gap-md" style="max-width: 600px; margin-bottom: var(--spacing-6);">
      <div style="flex-shrink: 0; width: 120px; height: 120px; background: var(--color-primary); border-radius: var(--radius-md);" class="flex items-center justify-center">
        <pds-icon icon="image" size="xl" style="color: white; opacity: 0.6;"></pds-icon>
      </div>
      <div style="flex: 1;">
        <h4>Horizontal Layout</h4>
        <p>Cards work great with flexbox for horizontal layouts.</p>
        <button class="btn-outline btn-sm">View Details</button>
      </div>
    </article>

    <h3>Card Grid</h3>
    <div class="grid gap-sm" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      <article class="card">
        <div style="height: 100px; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-3);"></div>
        <h4>Card 1</h4>
        <p style="font-size: 0.9rem;">Grid layout with cards.</p>
      </article>
      <article class="card">
        <div style="height: 100px; background: linear-gradient(135deg, var(--color-secondary), var(--color-primary)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-3);"></div>
        <h4>Card 2</h4>
        <p style="font-size: 0.9rem;">Responsive and flexible.</p>
      </article>
      <article class="card">
        <div style="height: 100px; background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-3);"></div>
        <h4>Card 3</h4>
        <p style="font-size: 0.9rem;">Auto-fits to space.</p>
      </article>
    </div>
  </div>
`;

CardLayouts.storyName = 'Card Layouts';

export const ComplexCards = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Complex Card Examples</h3>
    <div class="grid gap-md" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
      
      <article class="card">
        <div class="flex items-center gap-sm" style="margin-bottom: var(--spacing-4);">
          <div class="flex items-center justify-center" style="width: 48px; height: 48px; background: var(--color-primary); border-radius: 50%;">
            <pds-icon icon="user" style="color: white;"></pds-icon>
          </div>
          <div>
            <h4 style="margin: 0;">User Profile</h4>
            <p style="margin: 0; font-size: 0.85rem; opacity: 0.7;">@username</p>
          </div>
        </div>
        <p>Profile description goes here with some interesting details about the user.</p>
        <div class="flex gap-sm" style="margin-top: var(--spacing-4);">
          <button class="btn-primary btn-sm">Follow</button>
          <button class="btn-outline btn-sm">Message</button>
        </div>
      </article>

      <article class="card surface-elevated">
        <div class="flex justify-between items-start" style="margin-bottom: var(--spacing-3);">
          <h4>Premium Feature</h4>
          <span style="padding: var(--spacing-1) var(--spacing-2); background: var(--color-primary); color: white; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;">PRO</span>
        </div>
        <p>This elevated card highlights a premium feature with a badge and special styling.</p>
        <ul style="margin: var(--spacing-3) 0;">
          <li>Feature benefit one</li>
          <li>Feature benefit two</li>
          <li>Feature benefit three</li>
        </ul>
        <button class="btn-primary">
          <pds-icon icon="star"></pds-icon>
          Upgrade Now
        </button>
      </article>

      <article class="card">
        <h4>Stats Card</h4>
        <div class="grid grid-cols-2 gap-md" style="margin: var(--spacing-4) 0;">
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary);">1.2K</div>
            <div style="font-size: 0.85rem; opacity: 0.7;">Followers</div>
          </div>
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--color-secondary);">847</div>
            <div style="font-size: 0.85rem; opacity: 0.7;">Following</div>
          </div>
        </div>
        <button class="btn-outline btn-sm">View All</button>
      </article>

    </div>
  </div>
`;

ComplexCards.storyName = 'Complex Cards';
