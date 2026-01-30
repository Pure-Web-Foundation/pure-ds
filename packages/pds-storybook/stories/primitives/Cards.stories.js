import { html } from "#pds/lit";

export default {
  title: "Primitives/Cards",
  tags: ["cards", "layout", "spacing", "surface", "colors"],
  parameters: {
    pds: {
      tags: ["cards", "layout", "spacing", "surface", "colors"],
    },
    docs: {
      description: {
        component:
          "Versatile content containers with multiple surface variants. Cards automatically adapt to your theme and support nesting for complex layouts.",
      },
    },
  },
};

// Minimal styles for demo-specific visuals only
const cardsStoryStyles = html`
  <style>
    .story-nomargin {
      margin: 0
    }

    .story-bullets {
      list-style: none;
      margin: 0;
      padding-inline-start: 0;
    }

    :where(.story-bullets > li) {
      margin-block: var(--spacing-1);
      padding-inline-start: var(--spacing-5);
      position: relative;
    }

    :where(.story-bullets > li)::before {
      content: "◆";
      position: absolute;
      inset-inline-start: 0;
      color: var(--color-primary-500);
      font-size: var(--font-size-md);
      
      
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
  <div class="stack-md">
    <h3>Basic Cards</h3>
    <div class="grid grid-auto-md gap-md">
      <article class="card card-basic stack-md">
        <header>
          <h3>Default Card</h3>
        </header>
        <p>
          Card content goes here. This is a basic card primitive with automatic
          theming.
        </p>
        <button>Action</button>
      </article>

      <article class="card surface-overlay">
        <header>
          <h3>With Icon</h3>
          <small>Test</small>
        </header>

        <div class="flex gap-md justify-start items-center">
          <pds-icon icon="star" size="lg" class="icon-primary"></pds-icon>

          <p>This card has a header and footer for better structure.</p>
        </div>
        <footer>
          <button class="btn-outline">Learn More</button>
        </footer>
      </article>

      <article class="card card-interactive stack-md">
        <header>
          <h3>Interactive Card</h3>
          <small>With multiple actions and rich content.</small>
        </header>
        <p>
          This card uses the <code>.card-interactive</code> class to add hover
          effects and indicate interactivity.
        </p>
        <footer>
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
        </footer>
      </article>
    </div>
  </div>
`;

BasicCards.storyName = "Basic Cards";

export const SurfaceVariants = () => html`
  <div class="stack-md">
    <h3>Surface Variants</h3>
    <p class="text-muted">Different surface levels create visual hierarchy</p>

    <div class="grid grid-auto-md gap-md">
      <article class="card">
        <h4>Default Surface</h4>
        <p>Standard card surface level. Use for most content containers.</p>
        <code>.card</code>
      </article>

      <article class="card surface-elevated">
        <h4>Elevated Surface</h4>
        <p>
          Appears raised above the default surface. Great for important content
          or hover states.
        </p>
        <code>.surface-elevated</code>
      </article>

      <article class="card surface-overlay">
        <h4>Overlay Surface</h4>
        <p>
          Highest surface level. Perfect for modal dialogs and floating panels.
        </p>
        <code>.surface-overlay</code>
      </article>
    </div>
  </div>
`;

SurfaceVariants.storyName = "Surface Variants";

export const NestedCards = () => html`
  <div class="stack-md">
    <h3>Nested Cards</h3>
    <p class="text-muted">
      Surface variants enable natural nesting without visual confusion
    </p>

    <article class="card max-w-md stack-md">
      <h3>Parent Card (Default Surface)</h3>
      <p>This is the outer container using the default card surface.</p>

      <article class="card surface-elevated stack-md">
        <h4>Nested Card (Elevated)</h4>
        <p>
          This card is nested inside the parent and uses the elevated surface
          for clear visual separation.
        </p>

        <article class="card surface-overlay stack-md">
          <h5>Deeply Nested (Overlay)</h5>
          <small
            >Even deeper nesting maintains readability with the overlay
            surface.</small
          >
        </article>
      </article>

      <button>Parent Action</button>
    </article>
  </div>
`;

NestedCards.storyName = "Nested Cards";

export const ComplexCards = () => html`
  ${cardsStoryStyles}
  <div class="stack-md">
    <h3>Complex Card Examples</h3>
    <div class="grid grid-auto-md gap-md ">
      <article class="card">
        <header class="flex items-center gap-sm">
          <pds-icon icon="user" size="xl"></pds-icon>

          <div class="flex flex-col">
            <h4 class="story-nomargin">User Profile</h4>
            <small>@username</small>
          </div>
        </header>
        <p>
          Profile description goes here with some interesting details about the
          user.
        </p>
        <footer>
          <button class="btn-primary btn-sm">Follow</button>
          <button class="btn-outline btn-sm">Message</button>
        </footer>
      </article>

      <article class="card border-gradient border-glow">
        <header>
          <h4 class="flex justify-between">
            Premium Feature <span class="badge badge-outline badge-info">PRO</span>
          </h4>
        </header>
        <div>
          <p>
            This elevated card highlights a premium feature with a badge and
            special styling.
          </p>
          <ul class="story-bullets">
            <li>Feature benefit one</li>
            <li>Feature benefit two</li>
            <li>Feature benefit three</li>
          </ul>
        </div>
        
        <footer>
          <button class="btn-outline">
            <pds-icon icon="star"></pds-icon>
            Upgrade Now
          </button>
        </footer>
        
      </article>

      <article class="card">
        <header>
          <h4>Stats Card</h4>
          <small>View how you perform</small>
        </header>
        <div class="flex items-center justify-center">
          <div class="grid grid-cols-2 gap-lg">
            <div>
              <div class="story-stat-number story-stat-primary">1.2K</div>
              <small class="text-muted">Followers</small>
            </div>
            <div>
              <div class="story-stat-number story-stat-secondary">847</div>
              <small class="text-muted">Following</small>
            </div>
          </div>
        </div>
        <footer>
          <button class="btn-outline btn-sm">View All</button>
        </footer>
      </article>
    </div>
  </div>
`;

ComplexCards.storyName = "Complex Cards";

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
        <li>
          <code>.card.surface-elevated</code> – elevated background with card
          styling
        </li>
        <li><code>.card.surface-overlay</code> – overlay-level card</li>
        <li><code>.card.surface-subtle</code> – subtle background card</li>
      </ul>
    </div>
  </div>
`;

CardVariantsReference.storyName = "Reference";
