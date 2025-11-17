/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    './addons/pds-configurator/register.js'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  staticDirs: [
    { from: '../../../public/assets/pds', to: '/pds' },
    { from: '../../../public/assets', to: '/assets' }
  ],
  viteFinal: async (config) => {
    // Ensure Lit import alias is resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      '#pds/lit': 'lit'
    };
    return config;
  }
};

export default config;
