import { html } from 'lit';

export default {
  title: 'Primitives/Badges & Pills',
  tags: ['badge', 'pill', 'tag', 'chip', 'status', 'label', 'indicator'],
  parameters: {
    pds: {
      tags: ['badge', 'pill', 'tag', 'chip', 'status', 'label', 'indicator', 'inline']
    },
    docs: {
      description: {
        component: 'Badges and pills for labels, tags, status indicators, and categorization'
      }
    }
  },
  argTypes: {
  preset: {
    control: 'select',
    options: ['default', 'ocean-breeze', 'midnight-steel', 'sunset-vibes', 'forest-calm', 'lavender-dream'],
    description: 'Choose a design preset'
  },
  primaryColor: {
    control: 'color',
    description: 'Override primary color'
  },
  secondaryColor: {
    control: 'color',
    description: 'Override secondary color'
  }
  }
};

export const DefaultBadges = {
  render: (args) => {
    return html`
      <div class="card stack-md">
        <h3>Default Badges</h3>
        <div class="flex gap-md flex-wrap items-center">
          <span class="badge">Default</span>
          <span class="badge badge-primary">Primary</span>
          <span class="badge badge-secondary">Secondary</span>
          <span class="badge badge-success">Success</span>
          <span class="badge badge-warning">Warning</span>
          <span class="badge badge-danger">Danger</span>
          <span class="badge badge-info">Info</span>
        </div>
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};

export const OutlinedBadges = {
  render: (args) => {
    return html`
      <div class="card stack-md">
        <h3>Outlined Badges</h3>
        <div class="flex gap-md flex-wrap items-center">
          <span class="badge badge-outline badge-primary">Primary</span>
          <span class="badge badge-outline badge-secondary">Secondary</span>
          <span class="badge badge-outline badge-success">Success</span>
          <span class="badge badge-outline badge-info">Info</span>
          <span class="badge badge-outline badge-warning">Warning</span>
          <span class="badge badge-outline badge-danger">Danger</span>
        </div>
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};

export const BadgeSizes = {
  render: (args) => {
    return html`
      <div class="card stack-md">
        <h3>Badge Sizes</h3>
        <div class="flex gap-md flex-wrap items-center">
          <span class="badge badge-primary badge-sm">Small</span>
          <span class="badge badge-primary">Default</span>
          <span class="badge badge-primary badge-lg">Large</span>
        </div>
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};

export const Pills = {
  render: (args) => {
    return html`
      <div class="card stack-md">
        <h3>Pills</h3>
        <div class="flex gap-md flex-wrap items-center">
          <span class="pill badge-primary">React</span>
          <span class="pill badge-secondary">Vue</span>
          <span class="pill badge-success">Node.js</span>
          <span class="pill badge-info">TypeScript</span>
          <span class="pill badge-warning">JavaScript</span>
          <span class="pill badge-danger">Critical</span>
        </div>
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};

export const AllVariations = {
  render: (args) => {
    return html`
      <div class="card stack-md gap-lg">
        <section class="stack-md">
          <h3>Default Badges</h3>
          <div class="flex gap-md flex-wrap items-center">
            <span class="badge">Default</span>
            <span class="badge badge-primary">Primary</span>
            <span class="badge badge-secondary">Secondary</span>
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-danger">Danger</span>
            <span class="badge badge-info">Info</span>
          </div>
        </section>

        <section class="stack-md">
          <h3>Outlined Badges</h3>
          <div class="flex gap-md flex-wrap items-center">
            <span class="badge badge-outline badge-primary">Primary</span>
            <span class="badge badge-outline badge-secondary">Secondary</span>
            <span class="badge badge-outline badge-success">Success</span>
            <span class="badge badge-outline badge-info">Info</span>
            <span class="badge badge-outline badge-warning">Warning</span>
            <span class="badge badge-outline badge-danger">Danger</span>
          </div>
        </section>

        <section class="stack-md">
          <h3>Badge Sizes</h3>
          <div class="flex gap-md flex-wrap items-center">
            <span class="badge badge-primary badge-sm">Small</span>
            <span class="badge badge-primary">Default</span>
            <span class="badge badge-primary badge-lg">Large</span>
          </div>
        </section>

        <section class="stack-md">
          <h3>Pills</h3>
          <div class="flex gap-md flex-wrap items-center">
            <span class="pill badge-primary">React</span>
            <span class="pill badge-secondary">Vue</span>
            <span class="pill badge-success">Node.js</span>
            <span class="pill badge-info">TypeScript</span>
            <span class="pill badge-warning">JavaScript</span>
            <span class="pill badge-danger">Critical</span>
          </div>
        </section>
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
