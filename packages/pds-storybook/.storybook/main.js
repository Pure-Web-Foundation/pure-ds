/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    './addons/pds-configurator/register.js',
    './addons/html-preview/register.js',
    './addons/description/register.js'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  staticDirs: [
    { from: '../../../public/assets/pds', to: 'pds' },
    { from: '../../../public/assets', to: 'assets' }
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  viteFinal: async (config) => {
    // Ensure Lit import alias is resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      '#pds/lit': 'lit'
    };
    
    // Set base path for production builds
    if (config.mode === 'production') {
      config.base = '/storybook/';
    }
    
    return config;
  }
};

export default config;
