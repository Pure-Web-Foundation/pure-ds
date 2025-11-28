import { html } from 'lit';

export default {
  title: 'Primitives/Buttons',
  tags: ['buttons', 'interaction'],
  parameters: {
    pds: {
      tags: ['buttons', 'interaction']
    },
    docs: {
      description: {
        component: 'Button primitives with variants, sizes, and icon support. All buttons automatically adapt to your theme with proper focus states and accessibility.'
      }
    }
  }
};

export const ButtonVariants = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Button Variants</h3>
    <div class="flex gap-sm flex-wrap">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
      <button class="btn-primary" disabled>Disabled</button>
    </div>
  </div>
`;

ButtonVariants.storyName = 'Button Variants';

export const ButtonSizes = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Button Sizes</h3>
    <div class="flex gap-sm flex-wrap items-center">
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary">Default</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>
  </div>
`;

ButtonSizes.storyName = 'Button Sizes';

export const IconButtons = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Buttons with Icons</h3>
    <div class="flex gap-sm flex-wrap">
      <button class="btn-primary">
        <pds-icon icon="download"></pds-icon>
        <span>Download</span>
      </button>
      <button class="btn-secondary">
        <pds-icon icon="gear"></pds-icon>
        <span>Settings</span>
      </button>
      <button class="btn-outline">
        <pds-icon icon="bell"></pds-icon>
        <span>Notifications</span>
      </button>
      <button class="btn-primary">
        <pds-icon icon="heart"></pds-icon>
        <span>Favorite</span>
      </button>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Icon on Right</h3>
    <div class="flex gap-sm flex-wrap">
      <button class="btn-primary">
        <span>Next</span>
        <pds-icon icon="arrow-right"></pds-icon>
      </button>
      <button class="btn-secondary">
        <span>Previous</span>
        <pds-icon icon="arrow-left"></pds-icon>
      </button>
    </div>
  </div>
`;

IconButtons.storyName = 'Buttons with Icons';

export const IconOnlyButtons = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Icon-Only Buttons</h3>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      Use <code>.icon-only</code> class for square icon buttons
    </p>
    
    <div class="flex gap-sm flex-wrap">
      <button class="icon-only btn-primary">
        <pds-icon icon="gear" label="Settings"></pds-icon>
      </button>
      <button class="icon-only btn-secondary">
        <pds-icon icon="bell" label="Notifications"></pds-icon>
      </button>
      <button class="icon-only btn-outline">
        <pds-icon icon="heart" label="Favorite"></pds-icon>
      </button>
      <button class="icon-only btn-primary">
        <pds-icon icon="trash" label="Delete"></pds-icon>
      </button>
      <button class="icon-only btn-secondary">
        <pds-icon icon="pencil" label="Edit"></pds-icon>
      </button>
      <button class="icon-only btn-outline">
        <pds-icon icon="copy" label="Copy"></pds-icon>
      </button>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Icon-Only Sizes</h3>
    <div class="flex gap-sm flex-wrap items-center">
      <button class="icon-only btn-primary btn-sm">
        <pds-icon icon="plus" size="sm" label="Add"></pds-icon>
      </button>
      <button class="icon-only btn-primary">
        <pds-icon icon="plus" label="Add"></pds-icon>
      </button>
      <button class="icon-only btn-primary btn-lg">
        <pds-icon icon="plus" size="lg" label="Add"></pds-icon>
      </button>
    </div>
  </div>
`;

IconOnlyButtons.storyName = 'Icon-Only Buttons';

export const ButtonGroups = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Button Groups</h3>
    <div class="btn-group">
      <button class="btn-primary">
        <pds-icon icon="download"></pds-icon>
        Get Started
      </button>
      <button class="btn-secondary">
        <pds-icon icon="book-open"></pds-icon>
        View Docs
      </button>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Icon-Only Group</h3>
    <div class="btn-group">
      <button class="icon-only btn-outline">
        <pds-icon icon="text-align-left" label="Align left"></pds-icon>
      </button>
      <button class="icon-only btn-outline">
        <pds-icon icon="text-align-center" label="Align center"></pds-icon>
      </button>
      <button class="icon-only btn-outline">
        <pds-icon icon="text-align-right" label="Align right"></pds-icon>
      </button>
    </div>
  </div>
`;

ButtonGroups.storyName = 'Button Groups';

export const AllSizesCombinations = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Small Buttons</h3>
    <div class="flex gap-sm flex-wrap" style="margin-bottom: var(--spacing-4);">
      <button class="btn-primary btn-sm">Primary</button>
      <button class="btn-secondary btn-sm">Secondary</button>
      <button class="btn-outline btn-sm">Outline</button>
      <button class="btn-primary btn-sm">
        <pds-icon icon="heart" size="sm"></pds-icon>
        With Icon
      </button>
      <button class="icon-only btn-primary btn-sm">
        <pds-icon icon="gear" size="sm" label="Settings"></pds-icon>
      </button>
    </div>

    <h3>Default Buttons</h3>
    <div class="flex gap-sm flex-wrap" style="margin-bottom: var(--spacing-4);">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
      <button class="btn-primary">
        <pds-icon icon="heart"></pds-icon>
        With Icon
      </button>
      <button class="icon-only btn-primary">
        <pds-icon icon="gear" label="Settings"></pds-icon>
      </button>
    </div>

    <h3>Large Buttons</h3>
    <div class="flex gap-sm flex-wrap">
      <button class="btn-primary btn-lg">Primary</button>
      <button class="btn-secondary btn-lg">Secondary</button>
      <button class="btn-outline btn-lg">Outline</button>
      <button class="btn-primary btn-lg">
        <pds-icon icon="heart" size="lg"></pds-icon>
        With Icon
      </button>
      <button class="icon-only btn-primary btn-lg">
        <pds-icon icon="gear" size="lg" label="Settings"></pds-icon>
      </button>
    </div>
  </div>
`;

AllSizesCombinations.storyName = 'All Sizes & Combinations';
