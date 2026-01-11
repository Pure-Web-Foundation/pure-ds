import { html } from "lit";
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
      <div class="card liquid-glass stack-md">
        <h3>Plan Your Escape</h3>
        <p>Frosted dropdown blends with the hero photo while keeping content readable.</p>
      </div>
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
