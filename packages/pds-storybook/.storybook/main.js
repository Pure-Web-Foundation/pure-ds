/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    './addons/pds-configurator/register.js',
    './addons/html-preview/register.js',
    './addons/description/register.js'
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
