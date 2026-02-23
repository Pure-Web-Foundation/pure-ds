import { html } from "#pds/lit";
import { enhancementHeader } from './_enhancement-header.js';

// Story-specific styles for dropdown demos
const dropdownStoryStyles = html`
  <style>
    .story-dropdown-container {
      height: 260px;
    }
    .story-glass-demo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: var(--spacing-8);
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    .story-glass-demo-travel {
      background-image: url('https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80');
    }
    .story-corner-nav {
      position: fixed;
      z-index: var(--z-dropdown, 1050);
    }
    .story-corner-nav.top-left {
      top: 10px;
      left: 10px;
    }
    .story-corner-nav.top-right {
      top: 10px;
      right: 10px;
    }
    .story-corner-nav.bottom-left {
      bottom: 10px;
      left: 10px;
    }
    .story-corner-nav.bottom-right {
      bottom: 10px;
      right: 10px;
    }
  </style>
`;

export default {
  title: "Enhancements/Dropdowns",
  tags: ['dropdown', 'menu', 'navigation', 'popover', 'forms', 'interaction'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['dropdown', 'menu', 'navigation', 'popover', 'overlay', 'forms', 'interaction', 'data-dropdown']
    }
  },
};

export const BasicDropdown = () => html`
  ${enhancementHeader('dropdown')}
  <nav data-dropdown>
    <button class="btn-primary">Open Menu</button>
    <menu>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </menu>
  </nav>
`;

export const RightAligned = () => html`
  ${enhancementHeader('dropdown', {
    selector: '.align-right',
    description: ' Adds `.align-right` to align the dropdown menu to the right edge of the trigger button.'
  })}
  <div class="text-right">
    <nav data-dropdown class="align-right">
      <button class="btn-secondary">User Menu</button>
      <menu>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><hr /></li>
        <li><a href="#logout">Logout</a></li>
      </menu>
    </nav>
  </div>
`;

export const WithIcons = () => html`
  ${enhancementHeader('dropdown')}
  <nav data-dropdown>
    <button class="btn-outline">
      <pds-icon icon="list" size="sm"></pds-icon>
      Actions
    </button>
    <menu>
      <li>
        <a href="#edit">
          <pds-icon icon="pencil" size="sm"></pds-icon>
          Edit
        </a>
      </li>
      <li>
        <a href="#copy">
          <pds-icon icon="copy" size="sm"></pds-icon>
          Copy
        </a>
      </li>
      <li>
        <a href="#delete">
          <pds-icon icon="trash" size="sm"></pds-icon>
          Delete
        </a>
      </li>
    </menu>
  </nav>
`;

export const WithSemanticSeparator = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Uses a semantic separator (`<li><hr /></li>`) to split normal actions from destructive actions.'
  })}
  <nav data-dropdown>
    <button class="btn-outline">
      <pds-icon icon="list" size="sm"></pds-icon>
      Actions
    </button>
    <menu>
      <li>
        <a href="#toggle-edit">
          <pds-icon icon="pencil" size="sm"></pds-icon>
          Toggle live editing
        </a>
      </li>
      <li>
        <a href="#open-settings">
          <pds-icon icon="gear" size="sm"></pds-icon>
          Open Design Settings
        </a>
      </li>
      <li><hr /></li>
      <li>
        <a href="#reset-config" class="text-danger">
          <pds-icon icon="arrow-counter-clockwise" size="sm"></pds-icon>
          Reset Config
        </a>
      </li>
    </menu>
  </nav>
`;

export const DropUp = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown', {
    selector: '[data-mode="up"]',
    description: ' Adds `data-mode="up"` to make the dropdown menu open upwards instead of downwards.'
  })}
  <div class="flex justify-center items-end card story-dropdown-container">
    <nav data-dropdown data-mode="up">
      <button class="btn-primary">Resources</button>
      <menu>
        <li><a href="#guides">Guides</a></li>
        <li><a href="#checklists">Checklists</a></li>
        <li><a href="#support">Support</a></li>
      </menu>
    </nav>
  </div>
`;

export const BackgroundImageLiquidGlass = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown')}
  <section class="story-glass-demo story-glass-demo-travel">
    <div class="stack-md gap-md text-center max-w-sm">
      
      <nav data-dropdown data-mode="down">
        <button class="btn-primary">Featured Cities</button>
        <menu class="liquid-glass">
          <li><a href="#barcelona">Barcelona</a></li>
          <li><a href="#kyoto">Kyoto</a></li>
          <li><a href="#cape-town">Cape Town</a></li>
          <li><a href="#reykjavik">Reykjavik</a></li>
        </menu>
      </nav>
    </div>
  </section>
`;

export const CardPanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Use any last-child element as the dropdown panel (card, section, form, etc.).'
  })}
  <nav data-dropdown>
    <button class="btn-secondary">Project Actions</button>
    <section class="card surface-overlay stack-sm">
      <header class="stack-xs">
        <strong>Release checklist</strong>
        <small class="text-muted">Keep the essentials visible.</small>
      </header>
      <div class="flex gap-sm">
        <button class="btn-primary btn-sm">Ship now</button>
        <button class="btn-outline btn-sm">Schedule</button>
      </div>
      <hr data-label="Optional" />
      <footer class="flex gap-sm">
        <a href="#" class="badge">View notes</a>
        <a href="#" class="badge">Duplicate</a>
      </footer>
    </section>
  </nav>
`;

export const FormPanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Dropdowns can host richer content like forms and toggles.'
  })}
  <nav data-dropdown>
    <button class="btn-outline">Notification Settings</button>
    <div class="card surface-overlay grid grid-auto gap-sm">
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Email alerts</span>
      </label>
      <label data-toggle>
        <input type="checkbox" />
        <span data-label>Slack updates</span>
      </label>
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Weekly summary</span>
      </label>
      <div class="flex gap-sm">
        <button class="btn-primary btn-sm">Save</button>
        <button class="btn-secondary btn-sm">Reset</button>
      </div>
    </div>
  </nav>
`;

export const ProfilePanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Panels can be semantic HTML containers while keeping menu styles for real menus.'
  })}
  <nav data-dropdown>
    <button class="btn-primary">Account</button>
    <article class="card surface-overlay stack-sm">
      <div class="flex gap-sm items-center">
        <pds-icon icon="user" size="lg"></pds-icon>
        <div class="stack-xs">
          <strong>Alex Morgan</strong>
          <small class="text-muted">alex@pure.dev</small>
        </div>
      </div>
      <div class="stack-xs">
        <a class="btn btn-outline btn-sm" href="#profile">View profile</a>
        <a class="btn btn-secondary btn-sm" href="#billing">Billing</a>
      </div>
    </article>
  </nav>
`;

export const AutoPositionCorners = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown', {
    description: 'Four corner triggers use automatic positioning (`data-mode="auto"`) so each menu opens in the only available direction and alignment.'
  })}
  <nav data-dropdown data-mode="auto" class="story-corner-nav top-left">
    <button class="btn-primary icon-only" aria-label="Top Left menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav top-right">
    <button class="btn-primary icon-only" aria-label="Top Right menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav bottom-left">
    <button class="btn-primary icon-only" aria-label="Bottom Left menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav bottom-right">
    <button class="btn-primary icon-only" aria-label="Bottom Right menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>
`;
