import { html } from 'lit';

const dropdownStoryStyles = html`
  <style>
    .dropdown-story-align-right {
      text-align: right;
    }
  </style>
`;

export default {
  title: 'Enhancements/Dropdowns',
  tags: ['forms', 'interaction'],
  parameters: {
    pds: {
      tags: ['forms', 'interaction']
    },
    docs: {
      description: {
        component: 'Progressive enhancement for dropdown menus using data-dropdown attribute'
      }
    }
  }
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
        <li><hr></li>
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
