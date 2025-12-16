# PDS Storybook

**Pure Design System** Storybook showcase with live configuration capabilities.

This is the reference Storybook implementation demonstrating all features of the Pure Design System, including:

- 🎨 **Live Configuration** - Real-time design system updates via embedded configurator
- 🔍 **Smart Search** - Natural language queries for tokens and components
- 📚 **Comprehensive Stories** - All tokens, primitives, components, patterns, and enhancements
- 🎯 **Best Practices** - Organized by design system standards

## Features

### Live Configurator

Click the **PDS Configurator** button in the Storybook toolbar to open a configuration panel (via `pds-drawer[position=bottom]`) that includes:

- Full `pds-config-form` with simple/advanced modes
- Real-time preset switching
- Color, typography, spacing customization
- Export configuration as JSON
- Instant application to all visible stories

### Quick Search / Omnibox

Click the search icon in the toolbar to query the design system using natural language:

- "what is the focus border color on inputs?"
- "button hover states"
- "how to create a card layout?"

Powered by the PDS query system from `pds-query.js`.

### Story Organization

Stories are organized following design system best practices:

#### Foundations
Design tokens and core elements:
- **Colors** - Scales (50-900), semantics, themes
- **Typography** - Font families, sizes, weights, modular scale
- **Spacing** - Spatial rhythm, progression
- **Icons** - Icon system with sprite

#### Primitives
Basic UI building blocks:
- **Buttons** - Variants, sizes, states, icon buttons
- **Forms** - Inputs, selects, textareas, validation
- **Cards** - Surface containers
- **Badges** - Pills and badges
- **Alerts** - Notification styles

#### Components
Web Components (`<pds-*>`):
- `pds-icon` - SVG sprite icons
- `pds-drawer` - Slide-out panels
- `pds-tabstrip` - Accessible tabs
- `pds-upload` - File upload with preview
- `pds-toaster` - Toast notifications
- `pds-richtext` - Rich text editor (prefers `#showdown` import map; set `format="markdown"` to submit Markdown)
- `pds-jsonform` - JSON Schema forms
- `pds-splitpanel` - Resizable panes
- `pds-scrollrow` - Horizontal scroll

#### Patterns
Layout patterns and utilities:
- **Layout** - Grid, flex, containers
- **Utilities** - Spacing, borders, effects
- **Border Effects** - Gradients, glows

#### Enhancements
Progressive enhancements for semantic HTML:
- **Dropdowns** - `<nav data-dropdown>`
- **Toggles** - `<label data-toggle>`
- **Range Sliders** - Enhanced `<input type="range">`
- **Required Fields** - Auto-asterisks

## Development

### Install Dependencies

```bash
npm install
```

### Generate Stories

Auto-generate stories from PDS ontology and demo component:

```bash
npm run generate-stories
```

This reads:
- `src/js/pds-core/pds-ontology.js` - Component metadata
- `src/js/pds-configurator/pds-demo.js` - Demo HTML sections

And outputs to `stories/` organized by groups.

### Run Storybook

```bash
npm run storybook
```

Opens at http://localhost:6006

### Build Storybook

```bash
npm run build-storybook
```

Outputs to `storybook-static/`

### Development Mode (Generate + Run)

```bash
npm run storybook:dev
```

Generates stories then starts Storybook.

## Architecture

### Live Mode

This Storybook runs PDS in **live mode**:

```javascript
// .storybook/preview.js
await PDS.start({
  mode: 'live',
  preset: 'default',
  autoDefine: {
    baseURL: '/assets/pds/components/',
    predefine: ['pds-icon', 'pds-drawer']
  }
});
```

**Benefits:**
- Styles generated at runtime
- Instant design updates
- Full access to `PDS.compiled` object model
- Automatic font loading

> ⚠️ **Important: Programmatic Component Access**
>
> Components loaded via `autoDefine` (except those in `predefine`) are registered asynchronously. When accessing component methods programmatically in stories or utilities:
>
> ```javascript
> // Always wait for the component to be defined
> await customElements.whenDefined('pds-toaster');
> const toaster = document.querySelector('pds-toaster');
> toaster.toast('Message');
> ```
>
> Components in the `predefine` array (`pds-icon`, `pds-drawer`) are available immediately after `PDS.start()` completes.

### Configurator Addon

Custom Storybook addon at `.storybook/addons/pds-configurator/`:

**Manager Side** (`Tool.js`):
- Toolbar button to open configurator
- Search/omnibox for queries
- Event bus communication

**Preview Side** (`preview.js`):
- Creates `<pds-drawer>` with `<pds-config-form>`
- Listens to `pds:design:updated` events
- Calls `PDS.applyDesign()` and forces remount

### Story Generator

`scripts/generate-stories.js` automatically creates stories by:

1. Parsing `pds-ontology.js` for component metadata
2. Extracting HTML from `pds-demo.js` sections
3. Generating CSF3 stories with controls
4. Organizing by groups (foundations/primitives/components/patterns/enhancements)

**Customization:**
Edit the generator to add new story groups or customize templates.

## Story Controls

Each story includes argTypes for interactive customization:

```javascript
argTypes: {
  preset: {
    control: 'select',
    options: ['default', 'ocean-breeze', 'midnight-steel', ...]
  },
  primaryColor: {
    control: 'color'
  },
  secondaryColor: {
    control: 'color'
  }
}
```

Controls trigger `PDS.applyDesign()` to update the live configuration.

## Integration with Consumer Projects

See `packages/pds-storybook-cli` for CLI tool to integrate PDS into existing Storybook instances.

## Configuration

Modify `.storybook/preview.js` to change:

- Initial preset
- Auto-loaded components
- Theme management
- Global styles application

## Files

```
packages/pds-storybook/
├── .storybook/
│   ├── main.js                      # Storybook configuration
│   ├── preview.js                   # PDS initialization
│   └── addons/
│       └── pds-configurator/        # Custom addon
│           ├── register.js          # Manager registration
│           ├── Tool.js              # Toolbar UI
│           ├── preview.js           # Preview logic
│           └── constants.js         # Event constants
├── scripts/
│   └── generate-stories.js          # Story generator
├── stories/
│   ├── GettingStarted.mdx           # Welcome page
│   ├── foundations/                 # Token stories
│   ├── primitives/                  # Primitive stories
│   ├── components/                  # Component stories
│   ├── patterns/                    # Pattern stories
│   └── enhancements/                # Enhancement stories
└── package.json
```

## Contributing

Stories are auto-generated but can be manually edited. After editing:

1. Test changes: `npm run storybook`
2. Regenerate if needed: `npm run generate-stories`
3. Commit both generator and generated files

## Publishing

This package is private and not published to npm. It serves as:

1. Reference implementation
2. Development environment
3. Story template source for CLI

The CLI (`@pure-ds/storybook`) copies stories from here to consumer projects.

## License

ISC
