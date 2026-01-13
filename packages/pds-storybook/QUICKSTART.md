# PDS Storybook - Quick Start Guide

## For PDS Developers

### Running the Standalone Storybook

```bash
# From repository root
cd packages/pds-storybook

# Install dependencies (first time only)
npm install

# Start Storybook dev server
npm run storybook
```

Opens at **http://localhost:6006**

### Using the Configurator

1. Click the **circle icon** (⚙️) in the Storybook toolbar
2. A drawer opens at the bottom with the full PDS configurator
3. Change colors, typography, spacing, presets
4. Watch all stories update in real-time!

### Using Quick Search

1. Click the **search icon** (🔍) in the toolbar
2. Type natural language queries:
   - "what is the focus border color?"
   - "button hover states"
   - "primary color scale"
3. Results appear instantly

### Generating Stories

```bash
# From packages/pds-storybook
npm run generate-stories
```

This reads:
- `../../src/js/pds-core/pds-ontology.js`
- `../../src/js/pds-configurator/pds-demo.js`

And outputs story files to `stories/`.

### Building for Production

```bash
npm run build-storybook
```

Outputs to `storybook-static/` - ready to deploy.

---

## For Consumer Projects

### Integrating PDS into Your Storybook

**Requirements:**
- Vite-based project
- `@storybook/web-components-vite` framework
- `@pure-ds/core` installed

**Steps:**

```bash
# 1. Install CLI
npm install --save-dev @pure-ds/storybook

# 2. Run integration (from your project root)
npx pds-storybook

# 3. Start your Storybook
npm run storybook
```

**What Happens:**
- ✅ Validates your environment
- ✅ Exports PDS assets to `public/assets/pds/`
- ✅ Copies stories to `.storybook/pds-stories/`
- ✅ Patches `.storybook/preview.js` to initialize PDS

### Updating Integration

When PDS or your config changes:

```bash
npx pds-storybook --update
```

This is **reentrant** - it only updates changed files.

### Custom Configuration

Create `pds.config.js` in your project root:

```javascript
export const config = {
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

Then run `pds-storybook` to export with your config.

---

## Story Structure

### Foundations (Design Tokens)
- **Colors** - Scales, semantics, themes
- **Typography** - Fonts, sizes, weights
- **Spacing** - Rhythm, progression
- **Icons** - Sprite system

### Primitives (Basic UI)
- **Buttons** - Variants, sizes, states
- **Forms** - Inputs, selects, validation
- **Cards** - Containers, layouts
- **Badges** - Pills, status indicators
- **Alerts** - Notifications, messages

### Components (Web Components)
- `pds-icon` - SVG icons
- `pds-drawer` - Slide-out panels
- `pds-tabstrip` - Tab interface
- `pds-upload` - File upload
- `pds-toaster` - Toast notifications
- `pds-richtext` - Rich text editor (use `#showdown` import map, optional `format="markdown"`)
- `pds-form` - JSON Schema forms
- `pds-splitpanel` - Resizable panes
- `pds-scrollrow` - Horizontal scroll

### Patterns (Layouts & Utilities)
- **Layout** - Grid, flex, containers
- **Utilities** - Spacing, borders, effects
- **BorderEffects** - Gradients, glows

### Enhancements (Progressive)
- **Dropdowns** - `data-dropdown` menus
- **Toggles** - `data-toggle` switches
- **RangeSliders** - Enhanced inputs
- **RequiredFields** - Auto-asterisks

---

## Customizing Stories

### Adding a New Story

Create `stories/your-group/YourStory.stories.js`:

```javascript
import { html } from 'lit';

export default {
  title: 'PDS/Your Group/Your Story',
  parameters: {
    docs: {
      description: {
        component: 'Your description here'
      }
    }
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'ocean-breeze', 'midnight-steel']
    }
  }
};

export const Default = {
  render: (args) => html`
    <div>
      <h2>Your Component</h2>
      <p>Content here...</p>
    </div>
  `,
  args: {
    preset: 'default'
  }
};
```

### Modifying the Generator

Edit `scripts/generate-stories.js`:

```javascript
// Add new group
const STORY_GROUPS = {
  // ... existing groups
  yourGroup: {
    title: 'Your Group',
    description: 'Your description',
    stories: ['Story1', 'Story2']
  }
};

// Add generator function
function generateYourGroupStories() {
  // Generate story files
}
```

---

## Troubleshooting

### Storybook Won't Start

```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall
npm install

# Try again
npm run storybook
```

### Stories Not Appearing

1. Check `.storybook/main.js` stories glob pattern
2. Verify story files have `.stories.js` extension
3. Check console for errors
4. Regenerate: `npm run generate-stories`

### PDS Not Initializing

Check browser console for errors. Common issues:
- Import map for `#pds/lit` not configured
- Assets not in `public/assets/pds/`
- Preview.js not loading PDS

### CLI Fails to Detect Environment

Ensure your `.storybook/main.js` has:

```javascript
export default {
  framework: {
    name: '@storybook/web-components-vite'
  }
};
```

### Assets Not Loading

Check `main.js` includes:

```javascript
export default {
  staticDirs: ['../public/assets']
};
```

---

## Development Tips

### Hot Reload
Stories auto-reload when you save changes.

### Preview Isolation
Each story runs in isolation - no state leaks.

### Browser DevTools
Use React DevTools for addon debugging (manager).
Use regular DevTools for story debugging (preview).

### Event Bus
Listen to PDS events in stories:

```javascript
export const WithEvents = () => {
  import('../../../src/js/pds.js').then(({ PDS }) => {
    PDS.addEventListener('pds:design:updated', (e) => {
      console.log('Design changed:', e.detail);
    });
  });
  
  return html`<div>Content</div>`;
};
```

---

## Resources

- **PDS Docs**: https://puredesignsystem.z6.web.core.windows.net/
- **Storybook Docs**: https://storybook.js.org/docs/web-components/get-started
- **GitHub**: https://github.com/mvneerven/pure-ds
- **NPM**: https://www.npmjs.com/package/@pure-ds/core

---

## Support

- **Issues**: https://github.com/mvneerven/pure-ds/issues
- **Discussions**: https://github.com/mvneerven/pure-ds/discussions

---

**Happy Story Building! 🎨📚**
