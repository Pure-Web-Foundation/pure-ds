import { html } from "lit";

const dropdownStoryStyles = html`
  <style>
    .dropdown-story-align-right {
      text-align: right;
    }

    .dropdown-story-dropup {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: 260px;
      padding: var(--spacing-6);
      border-radius: var(--radius-lg);
    }
  </style>
`;

const dropdownGlassDemoStyles = html`
  <style>
    .dropdown-story-glass-demo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: var(--spacing-8);
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-image: var(--dropdown-demo-image);
      background-size: cover;
      background-position: center;
      color: inherit;
    }

    .dropdown-story-glass-demo::before {
      content: "";
      position: absolute;
      inset: 0;
      /* background: linear-gradient(
        rgba(12, 18, 28, 0.72),
        rgba(12, 18, 28, 0.32)
      ); */
    }

    .dropdown-story-glass-content {
      position: relative;
      display: grid;
      gap: var(--spacing-4);
      text-align: center;
      max-width: 360px;
    }

    .dropdown-story-glass-content h3 {
      margin: 0;
      font-weight: var(--font-weight-semibold);
      letter-spacing: 0.04em;
    }

    .dropdown-story-glass-content p {
      margin: 0;
      
    }

    .dropdown-story-glass-content menu {
      margin: 0;
      padding: var(--spacing-3);
    }
  </style>
`;

export default {
  title: "Enhancements/Dropdowns",
  tags: ["forms", "interaction"],
  parameters: {
    pds: {
      tags: ["forms", "interaction"],
    },
    docs: {
      description: {
        component:
          "Progressive enhancement for dropdown menus using data-dropdown attribute",
      },
    },
  },
};

export const BasicDropdown = () => html`
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
  ${dropdownStoryStyles}
  <div class="dropdown-story-align-right">
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
  ${dropdownStoryStyles}
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
  <div class="dropdown-story-dropup">
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
  ${dropdownStoryStyles} ${dropdownGlassDemoStyles}
  <section
    class="dropdown-story-glass-demo"
    style="--dropdown-demo-image: url('https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80');"
  >
    <div class="dropdown-story-glass-content">
      <div class="card liquid-glass">
        <h3>Plan Your Escape</h3>
        <p>
          Frosted dropdown blends with the hero photo while keeping content
          readable.
        </p>
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
