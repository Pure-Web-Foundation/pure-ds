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

// Minimal styles for demo-specific visuals only
const cardsStoryStyles = html`
  <style>
    /* Demo-specific gradient backgrounds */
    .story-cards-gradient-one {
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
    }
    .story-cards-gradient-two {
      background: linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500));
    }
    .story-cards-gradient-three {
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
    }
    /* Demo placeholder dimensions */
    .story-cards-placeholder {
      height: 100px;
      border-radius: var(--radius-sm);
    }
    .story-cards-avatar-placeholder {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-full);
    }
    .story-cards-media-placeholder {
      flex-shrink: 0;
      width: 7.5rem;
      height: 7.5rem;
      border-radius: var(--radius-md);
    }
    /* Stats card */
    .story-stat-number {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
    }
    .story-stat-primary {
      color: var(--color-primary-600);
    }
    .story-stat-secondary {
      color: var(--color-secondary-600);
    }
  </style>
`;

export const BasicCards = () => html`
  <div class="card stack-md">
    <h3>Basic Cards</h3>
    <div class="grid grid-auto-md gap-md">
      <article class="card card-basic stack-md">
        <h3>Default Card</h3>
        <p>Card content goes here. This is a basic card primitive with automatic theming.</p>
        <button>Action</button>
      </article>
      
      <article class="card stack-md">
        <h3>With Icon</h3>
        <div class="flex gap-sm justify-start">
          <pds-icon icon="star" size="lg" class="icon-primary"></pds-icon>
          <div>Cards can contain icons, buttons, forms, and any other content.</div>
        </div>
        <button class="btn-outline">Learn More</button>
      </article>

      <article class="card card-interactive stack-md">
        <h3>Interactive Card</h3>
        <p>With multiple actions and rich content.</p>
        <div class="flex gap-sm">
          <button class="btn-sm">
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
  <div class="card stack-md">
    <h3>Surface Variants</h3>
    <p class="text-muted">
      Different surface levels create visual hierarchy
    </p>
    
    <div class="grid grid-auto-md gap-md">
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
  <div class="card stack-md">
    <h3>Nested Cards</h3>
    <p class="text-muted">Surface variants enable natural nesting without visual confusion</p>
    
    <article class="card max-w-md stack-md">
      <h3>Parent Card (Default Surface)</h3>
      <p>This is the outer container using the default card surface.</p>

      <article class="card surface-elevated stack-md">
        <h4>Nested Card (Elevated)</h4>
        <p>This card is nested inside the parent and uses the elevated surface for clear visual separation.</p>
        
        <article class="card surface-overlay stack-md">
          <h5>Deeply Nested (Overlay)</h5>
          <small>Even deeper nesting maintains readability with the overlay surface.</small>
        </article>
      </article>

      <button>Parent Action</button>
    </article>
  </div>
`;

NestedCards.storyName = 'Nested Cards';

export const CardLayouts = () => html`
  ${cardsStoryStyles}
  <div class="card stack-md gap-lg">
    <section class="stack-md">
      <h3>Horizontal Card</h3>
      <article class="card flex gap-md max-w-md">
        <div class="flex items-center justify-center surface-subtle cards-media-placeholder">
          <pds-icon icon="image" size="xl" class="text-muted"></pds-icon>
        </div>
        <div class="grow stack-md">
          <h4>Horizontal Layout</h4>
          <p>Cards work great with flexbox for horizontal layouts.</p>
          <button class="btn-outline btn-sm">View Details</button>
        </div>
      </article>
    </section>

    <section class="stack-md">
      <h3>Card Grid</h3>
      <div class="grid grid-auto-sm gap-sm">
        <article class="card stack-md">
          <div class="story-cards-gradient-one cards-placeholder"></div>
          <h4>Card 1</h4>
          <small>Grid layout with cards.</small>
        </article>
        <article class="card stack-md">
          <div class="story-cards-gradient-two cards-placeholder"></div>
          <h4>Card 2</h4>
          <small>Responsive and flexible.</small>
        </article>
        <article class="card stack-md">
          <div class="story-cards-gradient-three cards-placeholder"></div>
          <h4>Card 3</h4>
          <small>Auto-fits to space.</small>
        </article>
      </div>
    </section>
  </div>
`;

CardLayouts.storyName = 'Card Layouts';

export const ComplexCards = () => html`
  ${cardsStoryStyles}
  <div class="card stack-md">
    <h3>Complex Card Examples</h3>
    <div class="grid grid-auto-md gap-md">
      
      <article class="card stack-md">
        <div class="flex items-center gap-sm">
          <div class="flex items-center justify-center surface-subtle cards-avatar-placeholder">
            <pds-icon icon="user"></pds-icon>
          </div>
          <div class="grow">
            <h4>User Profile</h4>
            <small class="text-muted">@username</small>
          </div>
        </div>
        <p>Profile description goes here with some interesting details about the user.</p>
        <div class="flex gap-sm">
          <button class="btn-sm">Follow</button>
          <button class="btn-outline btn-sm">Message</button>
        </div>
      </article>

      <article class="card surface-elevated stack-md">
        <div class="flex justify-between items-start">
          <h4>Premium Feature</h4>
          <span class="badge badge-primary">PRO</span>
        </div>
        <p>This elevated card highlights a premium feature with a badge and special styling.</p>
        <ul>
          <li>Feature benefit one</li>
          <li>Feature benefit two</li>
          <li>Feature benefit three</li>
        </ul>
        <button>
          <pds-icon icon="star"></pds-icon>
          Upgrade Now
        </button>
      </article>

      <article class="card stack-md">
        <h4>Stats Card</h4>
        <div class="grid grid-cols-2 gap-md">
          <div>
            <div class="story-stat-number story-stat-primary">1.2K</div>
            <small class="text-muted">Followers</small>
          </div>
          <div>
            <div class="story-stat-number story-stat-secondary">847</div>
            <small class="text-muted">Following</small>
          </div>
        </div>
        <button class="btn-outline btn-sm">View All</button>
      </article>

    </div>
  </div>
`;

ComplexCards.storyName = 'Complex Cards';

export const CardVariantsReference = () => html`
  <div class="card stack-md">
    <h2>Card Classes Reference</h2>
  
    <table class="table-bordered">
      <thead>
        <tr>
          <th>Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.card</code></td>
          <td>Base card with padding and border-radius</td>
        </tr>
      <tr>
        <td><code>.card-basic</code> / <code>.card-outlined</code></td>
        <td>Card with border, no elevation</td>
      </tr>
      <tr>
        <td><code>.card-elevated</code></td>
        <td>Card with shadow and elevated background</td>
      </tr>
      <tr>
        <td><code>.card-interactive</code></td>
        <td>Card with hover lift and shadow transition</td>
      </tr>
    </tbody>
  </table>
  
    <div class="stack-md">
      <h3>Combine with Surface Utilities</h3>
      <p>Cards work with any surface utility:</p>
      <ul>
        <li><code>.card.surface-elevated</code> – elevated background with card styling</li>
        <li><code>.card.surface-overlay</code> – overlay-level card</li>
        <li><code>.card.surface-subtle</code> – subtle background card</li>
      </ul>
    </div>
  </div>
`;

CardVariantsReference.storyName = 'Reference';
