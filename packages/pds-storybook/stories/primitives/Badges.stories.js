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
      <div class="card">
        <header>
          <h3>Default Badges</h3>
          <small class="text-muted">Baseline badge styles for lightweight labels and status markers.</small>
        </header>
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
      <div class="card">
        <header>
          <h3>Outlined Badges</h3>
          <small class="text-muted">Use <code>.badge-outline</code> for subtle, low-emphasis badge treatments.</small>
        </header>
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
      <div class="card">
        <header>
          <h3>Badge Sizes</h3>
          <small class="text-muted">Scale badges with <code>.badge-sm</code> and <code>.badge-lg</code> for density and emphasis.</small>
        </header>
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
      <div class="card">
        <header>
          <h3>Pills</h3>
          <small class="text-muted">Rounded pill variants for tags, categories, and topic labels.</small>
        </header>
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
      <div class="card gap-lg">
        <header>
          <h3>All Variations</h3>
          <small class="text-muted">Side-by-side comparison of badge styles, sizes, and pill variants.</small>
        </header>
        <section class="stack-md">
          <h4>Default Badges</h4>
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
          <h4>Outlined Badges</h4>
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
          <h4>Badge Sizes</h4>
          <div class="flex gap-md flex-wrap items-center">
            <span class="badge badge-primary badge-sm">Small</span>
            <span class="badge badge-primary">Default</span>
            <span class="badge badge-primary badge-lg">Large</span>
          </div>
        </section>

        <section class="stack-md">
          <h4>Pills</h4>
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
