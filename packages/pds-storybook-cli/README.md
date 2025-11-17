# PDS Storybook CLI

Command-line tool to integrate Pure Design System into existing **Vite + Web Components** Storybook instances.

## Features

- 🔍 **Environment Detection** - Validates Vite + `@storybook/web-components` setup
- 📦 **Asset Export** - Runs `pds:export` to generate static CSS and components
- 📚 **Story Templates** - Copies comprehensive PDS story library
- ⚙️ **Auto-Configuration** - Patches Storybook to initialize PDS in static mode
- 🔄 **Reentrant** - `--update` flag for incremental updates

## Installation

```bash
npm install --save-dev @pure-ds/storybook-cli pure-ds
```

Or use directly with `npx`:

```bash
npx @pure-ds/storybook-cli
```

## Usage

### Initial Integration

From your Storybook project root:

```bash
pds-storybook
```

This will:
1. Detect your Vite + Web Components Storybook environment
2. Export static PDS assets to `public/assets/pds/`
3. Copy story templates to `.storybook/pds-stories/`
4. Patch `.storybook/preview.js` to initialize PDS

### Update Integration

To update to the latest PDS stories and assets:

```bash
pds-storybook --update
```

Reentrant mode only updates changed files and regenerates assets based on your current `pds.config.js`.

## Requirements

Your project must have:

- ✅ `.storybook/` directory with `main.js` or `main.ts`
- ✅ `@storybook/web-components-vite` framework configured
- ✅ `vite.config.js` or `vite.config.ts`
- ✅ `pure-ds` installed

Optional:
- `pds.config.js` - Custom PDS configuration (uses default if not present)

## What Gets Created

```
your-project/
├── .storybook/
│   ├── main.js (unchanged)
│   ├── preview.js (patched with PDS.start())
│   └── pds-stories/
│       ├── foundations/
│       │   ├── Colors.stories.js
│       │   ├── Typography.stories.js
│       │   ├── Spacing.stories.js
│       │   └── Icons.stories.js
│       ├── primitives/
│       │   ├── Buttons.stories.js
│       │   ├── Forms.stories.js
│       │   ├── Cards.stories.js
│       │   └── Badges.stories.js
│       └── components/
│           ├── PdsIcon.stories.js
│           ├── PdsDrawer.stories.js
│           └── ...
└── public/
    └── assets/
        └── pds/
            ├── styles/
            │   ├── pds-tokens.css.js
            │   ├── pds-primitives.css.js
            │   └── ...
            ├── components/
            │   ├── pds-icon.js
            │   ├── pds-drawer.js
            │   └── ...
            └── icons/
                └── pds-icons.svg
```

## Configuration

### Custom PDS Configuration

Create `pds.config.js` in your project root:

```javascript
export const config = {
  mode: "static",
  preset: "ocean-breeze",
  design: {
    colors: { 
      primary: '#007acc',
      secondary: '#5c2d91'
    }
  },
  static: {
    root: "public/assets/pds/"
  }
};
```

### Storybook Configuration

The CLI patches `.storybook/preview.js` to add:

```javascript
import { PDS } from 'pure-ds';

const withPDS = (story, context) => {
  if (!pdsInitialized) {
    PDS.start({
      mode: 'static',
      staticPaths: {
        tokens: '/assets/pds/styles/pds-tokens.css.js',
        primitives: '/assets/pds/styles/pds-primitives.css.js',
        // ...
      },
      autoDefine: {
        baseURL: '/assets/pds/components/',
        predefine: ['pds-icon', 'pds-drawer']
      },
      applyGlobalStyles: true
    });
    pdsInitialized = true;
  }
  return story();
};

export default {
  decorators: [withPDS],
  // ...
};
```

## Story Organization

Stories follow design system best practices:

### Foundations
Design tokens and foundational elements:
- Colors (scales, semantics, themes)
- Typography (scales, families, weights)
- Spacing (progression, rhythm)
- Icons (sprite system)

### Primitives
Basic UI building blocks:
- Buttons (variants, sizes, states)
- Forms (inputs, selects, validation)
- Cards (layouts, compositions)
- Badges (styles, colors)
- Alerts (types, states)

### Components
Rich web components:
- `<pds-icon>` - SVG icons
- `<pds-drawer>` - Slide-out panels
- `<pds-tabstrip>` - Tab interface
- `<pds-upload>` - File upload
- `<pds-toaster>` - Notifications
- And more...

### Patterns
Layout patterns and utilities:
- Grid layouts
- Flex utilities
- Border effects
- Spacing utilities

### Enhancements
Progressive enhancements:
- Dropdown menus (`data-dropdown`)
- Toggle switches (`data-toggle`)
- Range sliders
- Required field indicators

## Troubleshooting

### "Not a Web Components Storybook instance"

This CLI only supports `@storybook/web-components-vite` projects. Check your `.storybook/main.js`:

```javascript
export default {
  framework: {
    name: '@storybook/web-components-vite'
  }
};
```

### "pure-ds not found in node_modules"

Install Pure Design System first:

```bash
npm install pure-ds
```

### "No pds.config.js found"

The CLI will use default PDS configuration. To customize, create `pds.config.js`:

```bash
echo "export const config = { preset: 'default' };" > pds.config.js
```

### Assets Not Loading

Ensure your Storybook `main.js` includes static directories:

```javascript
export default {
  staticDirs: ['../public/assets'],
  // ...
};
```

## Development

```bash
# Test the CLI locally
npm run test

# Link for local development
npm link
pds-storybook --help
```

## License

ISC
