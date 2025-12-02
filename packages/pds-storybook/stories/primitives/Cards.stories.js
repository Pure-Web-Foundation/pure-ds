import { html } from 'lit';

export default {
  title: 'Primitives/Cards',
  tags: ['cards', 'layout', 'spacing', 'surface', 'colors'],
  parameters: {
    pds: {
      tags: ['cards', 'layout', 'spacing', 'surface', 'colors']
    },
    docs: {
      description: {
        component: 'Versatile content containers with multiple surface variants. Cards automatically adapt to your theme and support nesting for complex layouts.'
      }
    }
  }
};

const cardsStoryStyles = html`
  <style>
    .cards-story-section {
      padding: var(--spacing-4);
    }
    .cards-basic-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .cards-surface-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .cards-helper {
      margin-bottom: var(--spacing-4);
      opacity: 0.8;
    }
    .cards-inline-actions {
      margin-top: var(--spacing-3);
    }
    .cards-nested-shell {
      max-width: 37.5rem;
    }
    .cards-nested-spacing {
      margin-top: var(--spacing-4);
    }
    .cards-nested-deep {
      margin-top: var(--spacing-3);
    }
    .cards-parent-action {
      margin-top: var(--spacing-4);
    }
    .cards-horizontal-card {
      max-width: 37.5rem;
      margin-bottom: var(--spacing-6);
    }
    .cards-horizontal-media {
      flex-shrink: 0;
      width: 7.5rem;
      height: 7.5rem;
      background: var(--color-primary);
      border-radius: var(--radius-md);
    }
    .cards-horizontal-icon {
      color: white;
      opacity: 0.6;
    }
    .cards-horizontal-body {
      flex: 1;
    }
    .cards-grid-visuals {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    .cards-visual-block {
      height: 100px;
      border-radius: var(--radius-sm);
      margin-bottom: var(--spacing-3);
    }
    .cards-gradient-one {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    }
    .cards-gradient-two {
      background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    }
    .cards-gradient-three {
      background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    }
    .cards-small-copy {
      font-size: 0.9rem;
    }
    .cards-complex-grid {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    .cards-profile-header {
      margin-bottom: var(--spacing-4);
    }
    .cards-profile-avatar {
      width: 48px;
      height: 48px;
      background: var(--color-primary);
      border-radius: 50%;
    }
    .cards-profile-avatar pds-icon {
      color: white;
    }
    .cards-profile-title {
      margin: 0;
    }
    .cards-profile-meta {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.7;
    }
    .cards-profile-actions {
      margin-top: var(--spacing-4);
    }
    .cards-premium-header {
      margin-bottom: var(--spacing-3);
    }
    .cards-pro-badge {
      padding: var(--spacing-1) var(--spacing-2);
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
    }
    .cards-premium-list {
      margin: var(--spacing-3) 0;
    }
    .cards-stats-grid {
      margin: var(--spacing-4) 0;
    }
    .cards-stat-value {
      font-size: 2rem;
      font-weight: 700;
    }
    .cards-stat-value.primary {
      color: var(--color-primary);
    }
    .cards-stat-value.secondary {
      color: var(--color-secondary);
    }
    .cards-stat-label {
      font-size: 0.85rem;
      opacity: 0.7;
    }
  </style>
`;

export const BasicCards = () => html`
  ${cardsStoryStyles}
  <div class="cards-story-section">
    <h3>Basic Cards</h3>
    <div class="grid gap-md cards-basic-grid">
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
        <div class="flex gap-sm cards-inline-actions">
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
  ${cardsStoryStyles}
  <div class="cards-story-section">
    <h3>Surface Variants</h3>
    <p class="cards-helper">
      Different surface levels create visual hierarchy
    </p>
    
    <div class="grid gap-md cards-surface-grid">
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
  ${cardsStoryStyles}
  <div class="cards-story-section">
    <h3>Nested Cards</h3>
    <p class="cards-helper">
      Surface variants enable natural nesting without visual confusion
    </p>
    
    <article class="card cards-nested-shell">
      <h3>Parent Card (Default Surface)</h3>
      <p>This is the outer container using the default card surface.</p>

      <div class="cards-nested-spacing">
        <article class="card surface-elevated">
          <h4>Nested Card (Elevated)</h4>
          <p>This card is nested inside the parent and uses the elevated surface for clear visual separation.</p>
          
          <div class="cards-nested-deep">
            <article class="card surface-overlay">
              <h5>Deeply Nested (Overlay)</h5>
              <p class="cards-small-copy">Even deeper nesting maintains readability with the overlay surface.</p>
            </article>
          </div>
        </article>
      </div>

      <button class="btn-primary cards-parent-action">Parent Action</button>
    </article>
  </div>
`;

NestedCards.storyName = 'Nested Cards';

export const CardLayouts = () => html`
  ${cardsStoryStyles}
  <div class="cards-story-section">
    <h3>Horizontal Card</h3>
    <article class="card flex gap-md cards-horizontal-card">
      <div class="flex items-center justify-center cards-horizontal-media">
        <pds-icon icon="image" size="xl" class="cards-horizontal-icon"></pds-icon>
      </div>
      <div class="cards-horizontal-body">
        <h4>Horizontal Layout</h4>
        <p>Cards work great with flexbox for horizontal layouts.</p>
        <button class="btn-outline btn-sm">View Details</button>
      </div>
    </article>

    <h3>Card Grid</h3>
    <div class="grid gap-sm cards-grid-visuals">
      <article class="card">
        <div class="cards-visual-block cards-gradient-one"></div>
        <h4>Card 1</h4>
        <p class="cards-small-copy">Grid layout with cards.</p>
      </article>
      <article class="card">
        <div class="cards-visual-block cards-gradient-two"></div>
        <h4>Card 2</h4>
        <p class="cards-small-copy">Responsive and flexible.</p>
      </article>
      <article class="card">
        <div class="cards-visual-block cards-gradient-three"></div>
        <h4>Card 3</h4>
        <p class="cards-small-copy">Auto-fits to space.</p>
      </article>
    </div>
  </div>
`;

CardLayouts.storyName = 'Card Layouts';

export const ComplexCards = () => html`
  ${cardsStoryStyles}
  <div class="cards-story-section">
    <h3>Complex Card Examples</h3>
    <div class="grid gap-md cards-complex-grid">
      
      <article class="card">
        <div class="flex items-center gap-sm cards-profile-header">
          <div class="flex items-center justify-center cards-profile-avatar">
            <pds-icon icon="user"></pds-icon>
          </div>
          <div>
            <h4 class="cards-profile-title">User Profile</h4>
            <p class="cards-profile-meta">@username</p>
          </div>
        </div>
        <p>Profile description goes here with some interesting details about the user.</p>
        <div class="flex gap-sm cards-profile-actions">
          <button class="btn-primary btn-sm">Follow</button>
          <button class="btn-outline btn-sm">Message</button>
        </div>
      </article>

      <article class="card surface-elevated">
        <div class="flex justify-between items-start cards-premium-header">
          <h4>Premium Feature</h4>
          <span class="cards-pro-badge">PRO</span>
        </div>
        <p>This elevated card highlights a premium feature with a badge and special styling.</p>
        <ul class="cards-premium-list">
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
        <div class="grid grid-cols-2 gap-md cards-stats-grid">
          <div>
            <div class="cards-stat-value primary">1.2K</div>
            <div class="cards-stat-label">Followers</div>
          </div>
          <div>
            <div class="cards-stat-value secondary">847</div>
            <div class="cards-stat-label">Following</div>
          </div>
        </div>
        <button class="btn-outline btn-sm">View All</button>
      </article>

    </div>
  </div>
`;

ComplexCards.storyName = 'Complex Cards';
