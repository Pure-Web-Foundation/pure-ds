import { html } from 'lit';

export default {
  title: 'Components/Pds Icon',
  parameters: {
    docs: {
      description: {
        component: 'SVG sprite icons with fallbacks'
      }
    }
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from sprite'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Named size'
    },
    color: {
      control: 'color',
      description: 'Icon color'
    }
  }
};

export const Default = {
  render: (args) => html`
    <pds-icon 
      icon="${args.icon}" 
      size="${args.size}"
      color="${args.color}">
    </pds-icon>
  `,
  args: {
    icon: 'heart',
    size: 'lg',
    color: 'currentColor'
  }
};

export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <pds-icon icon="star" size="xs"></pds-icon>
    <pds-icon icon="star" size="sm"></pds-icon>
    <pds-icon icon="star" size="md"></pds-icon>
    <pds-icon icon="star" size="lg"></pds-icon>
    <pds-icon icon="star" size="xl"></pds-icon>
    <pds-icon icon="star" size="2xl"></pds-icon>
  </div>
`;

export const ColoredIcons = () => html`
  <div style="display: flex; gap: 1rem;">
    <pds-icon icon="heart" size="lg" color="red"></pds-icon>
    <pds-icon icon="star" size="lg" color="gold"></pds-icon>
    <pds-icon icon="check" size="lg" color="green"></pds-icon>
    <pds-icon icon="x" size="lg" color="var(--color-danger-500)"></pds-icon>
  </div>
`;
