# Setting up your own PDS Storybook

This guide explains how to use the `@pure-ds/storybook` package to create a customized Storybook instance for your project, leveraging the Pure Design System.

## Prerequisites

*   Node.js (v18 or later recommended)
*   An existing project where you want to add Storybook, or a new empty project.

## Installation

1.  Install the PDS Storybook package:

    ```bash
    npm install @pure-ds/storybook @pure-ds/core --save-dev
    ```

2.  Add a script to your `package.json` to run Storybook:

    ```json
    "scripts": {
      "storybook": "pds-storybook dev",
      "build-storybook": "pds-storybook build"
    }
    ```

## Configuration

Create a `pds.config.js` file in the root of your project. This file allows you to configure the PDS environment, including the `autoDefine` behavior for loading your own components.

```javascript
// pds.config.js
export const config = {
  mode: "live", // or "staging", "production"
  autoDefine: {
    // Map custom tag prefixes to your component URLs
    mapper: (tag) => {
      if (tag.startsWith("my-component-")) {
        // Example: Load components from a local assets folder
        return new URL(`/assets/js/components/${tag}.js`, window.location.origin).href;
      }
      return undefined; // Let PDS handle standard components
    },
    // Pre-load specific components if needed
    predefine: ["pds-icon", "my-component-card"]
  }
};
```

## Adding Stories

You can add your own stories in a `stories` directory or alongside your source code. The PDS Storybook is configured to automatically find stories matching these patterns:

*   `stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`
*   `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
*   `public/**/*.stories.@(js|jsx|mjs|ts|tsx)`

Example story (`stories/MyComponent.stories.js`):

```javascript
import { html } from 'lit';

export default {
  title: 'My Project/My Component',
  component: 'my-component-card',
};

export const Default = {
  render: () => html`<my-component-card title="Hello World"></my-component-card>`,
};
```

## Serving Assets

If your components rely on static assets (CSS, images, JS modules), ensure they are available in a `public` folder in your project root. The PDS Storybook will automatically serve the contents of your `public` folder at the root URL.

For example, if you have `public/assets/js/components/my-component-card.js`, the mapper in `pds.config.js` can point to `/assets/js/components/my-component-card.js`.

### Importing Modules from Your Public Folder

Your story files can use absolute path imports that reference ESM bundles in your `public` folder. PDS Storybook includes a Vite plugin that loads these files as virtual modules, bypassing Vite's restriction on importing from `public/`:

```javascript
// This works - loads your actual public/assets/js/lit.js bundle
import { html } from '/assets/js/lit.js';

// Any other ESM module in your public folder works too
import { MyUtil } from '/assets/js/utils.js';

export default {
  title: 'My Project/Hello World',
  component: 'my-hello-world',
};

export const Default = {
  render: () => html`<my-hello-world></my-hello-world>`,
};
```

This allows you to write stories that use the exact same import paths as your app components. Any `.js` or `.mjs` file in your `public` folder can be imported using its absolute path.

## Running Storybook

Start the development server:

```bash
npm run storybook
```

This will launch Storybook, showing both the built-in PDS stories (Foundations, Components, etc.) and your custom stories.
