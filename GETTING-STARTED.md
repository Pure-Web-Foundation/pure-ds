# Getting Started with Pure Design System (PDS)

Pure Design System (PDS) is a comprehensive design system that enables rapid development of consistent, accessible user interfaces. This guide will help you get started with PDS in your project.

## Installation

### Published Package (Recommended)
```bash
npm install @pure-ds/core
```

The package will automatically copy PDS components to your project's web root during installation.

### Development (npm link)
For development or when using unreleased versions:

```bash
# In the PDS project directory
npm link

# In your project directory
npm link @pure-ds/core

# Manually sync assets
node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
```

## Basic Usage

### 1. Initialize PDS

Create or update your main JavaScript file:

```js
import { PDS } from '@pure-ds/core';

// Initialize PDS with your design configuration
const { autoDefiner, config } = await PDS.live({
  colors: {
    primary: '#007acc',
    secondary: '#6c757d'
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif'
  }
});

// You can use the returned values if needed
console.log('PDS config applied:', config);
// autoDefiner is available for advanced usage, but not required for normal use
```

### 2. Use PDS Components

PDS components are automatically available in your HTML without imports:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My App with PDS</title>
</head>
<body>
  <!-- PDS components work automatically -->
  <pds-icon name="star"></pds-icon>
  <pds-drawer title="Settings">
    <p>Drawer content here</p>
  </pds-drawer>
  
  <!-- Your custom components also work -->
  <my-app></my-app>
  
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 3. Available Components

PDS provides these components out of the box:

- **`<pds-icon>`** - Scalable vector icons
- **`<pds-drawer>`** - Slide-out panels and navigation
- **`<pds-jsonform>`** - Dynamic forms from JSON schema
- **`<pds-splitpanel>`** - Resizable split layouts
- **`<pds-tabstrip>`** - Tabbed interfaces
- **`<pds-toaster>`** - Toast notifications
- **`<pds-upload>`** - File upload with drag & drop

## Static mode (build once, serve anywhere)

If you don’t need live regeneration at runtime, you can generate a static bundle of PDS assets and initialize with `PDS.static()`.

1) Generate assets into your app’s web root

```bash
npm run pds:static
```

This will:
- Detect your web root (public/, static/, dist/, etc.)
- Create a base folder (default `pds/`, override with `staticBase` in `pds-config.js`) with:
  - `assets/img/pds-icons.svg`
  - `auto-define/*.js` (web components)
  - `css/pds-*.css` and `css/pds-*.css.js`
  - All PDS `*.md` docs (e.g., `README.md`, `GETTING-STARTED.md`, etc.) copied into the same base

Optionally create a `pds-config.js` in your project root to control icons, tokens, etc. If omitted, the internal default preset is used.

2) Initialize PDS in static mode

```js
import { PDS } from '@pure-ds/core';

await PDS.static({ /* your config if needed */ }, {
  // Point to the generated constructable stylesheets
  staticPaths: {
    tokens: '/pds/css/pds-tokens.css.js',
    primitives: '/pds/css/pds-primitives.css.js',
    components: '/pds/css/pds-components.css.js',
    utilities: '/pds/css/pds-utilities.css.js',
    styles: '/pds/css/pds-styles.css.js'
  },
  // Components auto-load from here
  autoDefineBaseURL: '/pds/auto-define/'
});
### Configure base folder

Set a custom base folder name for static assets and docs in your project’s `pds-config.js`:

```js
export default {
  // ... your design config ...
  staticBase: 'design-system' // default is 'pds'
}
```

The static exporter will generate `/<webroot>/design-system` instead, and copy all `*.md` there.

### Viewing docs in the configurator

The configurator can render Markdown using Showdown. It will try to load docs from the static base (default `/pds`).
You can programmatically trigger a docs view:

```js
// Show GETTING-STARTED.md
document.dispatchEvent(new CustomEvent('pds-view-docs', { detail: { file: 'GETTING-STARTED.md' } }));

// Or override the base folder globally (optional)
window.PDS_DOCS_BASE = '/design-system';
```
```

Then update your app to use `PDS.static()` instead of `PDS.live()`.

## Advanced Configuration

### Theme Management

```js
// Initialize with system theme detection
await PDS.live({
  colors: { primary: '#007acc' }
}, {
  manageTheme: true,           // Auto-manage data-theme attribute
  themeStorageKey: 'my-theme'  // localStorage key
});

// Programmatically change theme
await PDS.setTheme('dark');    // 'light', 'dark', or 'system'
```

### Flash Prevention

Prevent flash of unstyled content by preloading critical styles:

```js
await PDS.live({
  colors: { primary: '#007acc' }
}, {
  preloadStyles: true,
  criticalLayers: ['tokens', 'primitives']
});
```

### Auto-Define Configuration

Customize component loading behavior:

```js
await PDS.live({
  colors: { primary: '#007acc' }
}, {
  autoDefineBaseURL: '/components/',  // Custom component directory
  autoDefinePreload: ['my-app'],      // Pre-load specific components
  autoDefineMapper: (tag) => {        // Custom file mapping
    if (tag === 'my-special-component') {
      return 'special/component.js';
    }
    return `${tag}.js`;
  }
});
```

## Project Structure

After installation, your project should have this structure:

```
your-project/
├── public/
│   ├── auto-define/          # PDS components (auto-copied)
│   │   ├── pds-icon.js
│   │   ├── pds-drawer.js
│   │   └── ...
│   ├── assets/
│   │   └── img/
│   │       └── pds-icons.svg # PDS icons (auto-copied)
│   └── index.html
├── src/
│   └── main.js               # Your PDS initialization
└── package.json
```

## Framework Integration

### Next.js

```js
// pages/_app.js or app/layout.js
import { PDS } from '@pure-ds/core';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    PDS.live({
      colors: { primary: '#007acc' }
    });
  }, []);

  return <Component {...pageProps} />;
}
```

### Vite

```js
// src/main.js
import { PDS } from '@pure-ds/co1re';

// Initialize PDS
await PDS.live({
  colors: { primary: '#007acc' }
});

// Your app code
import './App.js';
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { PDS } from '@pure-ds/core';
    
    // Initialize immediately
    await PDS.live({
      colors: { primary: '#007acc' }
    });
  </script>
</head>
<body>
  <pds-icon name="star"></pds-icon>
</body>
</html>
```

## Troubleshooting

### Components Not Loading

If PDS components aren't working:

1. **Check assets were copied**: Look for `public/auto-define/` directory
2. **Manual asset sync**: Run the postinstall script manually:
   ```bash
   node node_modules/@pure-ds/core/packages/pds-cli/bin/postinstall.js
   ```
3. **Check console**: Look for AutoDefiner messages and errors

### Development Workflow

When using `npm link` for development:

1. Link the package: `npm link @pure-ds/core`
2. Sync assets manually when needed (components updated, etc.)
3. Restart your dev server if components don't update

### Asset Conflicts

If you've modified PDS components and they're overwritten:

1. Use the sync script with `--force` to overwrite
2. Or rename your customized components to avoid conflicts
3. Check `.pds-install.json` for tracking information

## API Reference

### PDS.live(config, options)

Main initialization function.

**Parameters:**
- `config` (object) - Design system configuration
- `options` (object) - Runtime options

**Returns:** Promise resolving to `{ generator, config, theme, autoDefiner }`

### PDS.setTheme(theme, options)

Change theme programmatically.

**Parameters:**
- `theme` (string) - 'light', 'dark', or 'system'
- `options` (object) - Theme options

**Returns:** Promise resolving to resolved theme name

### PDS.preloadCritical(config, options)

Preload minimal CSS to prevent flash.

**Parameters:**
- `config` (object) - Minimal design configuration
- `options` (object) - Preload options

### PDS.validateDesign(config, options)

Validate design configuration for accessibility.

**Parameters:**
- `config` (object) - Design configuration to validate
- `options` (object) - Validation options

**Returns:** `{ ok: boolean, issues: Array }`

## Next Steps

- Explore the [Component Documentation](./components.md)
- Learn about [Design Tokens](./tokens.md)
- See [Advanced Patterns](./patterns.md)
- Check out [Examples](./examples/)

## Support

- 📖 [Full Documentation](./docs/)
- 🐛 [Report Issues](https://github.com/mvneerven/pure-ds/issues)
- 💬 [Discussions](https://github.com/mvneerven/pure-ds/discussions)