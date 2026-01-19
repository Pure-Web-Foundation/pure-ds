# IntelliSense & IDE Support

Pure Design System provides comprehensive IntelliSense support for both HTML and CSS, making development faster and reducing errors. This guide covers setup for VS Code, WebStorm, and other editors.

## 🎯 What You Get

### HTML IntelliSense
- ✅ Web component autocomplete (`<pds-drawer>`, `<pds-icon>`, etc.)
- ✅ Attribute suggestions with descriptions
- ✅ Enum value autocomplete (e.g., `position="left|right|top|bottom"`)
- ✅ Property and method documentation on hover
- ✅ Icon name autocomplete (all available icons)

### CSS IntelliSense  
- ✅ CSS custom property autocomplete (`--color-primary-500`, `--spacing-4`)
- ✅ Token documentation and value previews
- ✅ Utility class suggestions (`.flex`, `.gap-4`, `.border-gradient`)
- ✅ Primitive class suggestions (`.card`, `.badge`, `.surface`)
- ✅ Data attribute enhancements (`data-dropdown`, `data-toggle`)

## 📦 Generation

IntelliSense data is automatically generated when you build PDS assets:

```bash
# Generate all IntelliSense data (recommended)
npm run pds:dx

# Or as part of full build
npm run pds:build

# Or generate individually
npm run pds:manifest    # HTML IntelliSense only
npm run pds:css-data    # CSS IntelliSense only
```

### Generated Files

After running generation, you'll have:

```
public/assets/pds/
├── custom-elements.json       # Standard Custom Elements Manifest
├── vscode-custom-data.json    # VS Code HTML custom data
├── pds.css-data.json          # VS Code CSS custom data
└── pds-css-complete.json      # Standard CSS data (all editors)

# Root reference files for easy setup
pds.html-data.json              # Points to vscode-custom-data.json
pds.css-data.json               # Points to pds.css-data.json
```

## ⚙️ VS Code Setup

### Recommended: Workspace Settings

Create or update `.vscode/settings.json` in your project:

```json
{
  "html.customData": [
    "node_modules/pure-ds/public/assets/pds/vscode-custom-data.json"
  ],
  "css.customData": [
    "node_modules/pure-ds/public/assets/pds/pds.css-data.json"
  ]
}
```

**Alternative** (if PDS is in your repo):
```json
{
  "html.customData": ["./pds.html-data.json"],
  "css.customData": ["./pds.css-data.json"]
}
```

### Reload VS Code

After adding settings:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Developer: Reload Window"
3. Press Enter

## 🔧 WebStorm / IntelliJ IDEA Setup

WebStorm automatically recognizes `custom-elements.json` in your `node_modules/pure-ds/` directory for HTML IntelliSense.

### For CSS IntelliSense

Add the CSS data file to your project settings:

1. Go to **Settings** → **Languages & Frameworks** → **Style Sheets** → **CSS**
2. Under **Custom Data**, add:
   ```
   node_modules/pure-ds/public/assets/pds/pds-css-complete.json
   ```

## 🌐 Other Editors

### Sublime Text

Install the [LSP](https://packagecontrol.io/packages/LSP) package and configure custom data paths.

### Vim/Neovim

Use [coc-css](https://github.com/neoclide/coc-css) or [coc-html](https://github.com/neoclide/coc-html) with custom data configuration.

### Emacs

Configure [lsp-mode](https://emacs-lsp.github.io/lsp-mode/) with CSS and HTML language servers.

## 📝 Usage Examples

### HTML IntelliSense in Action

Type `<pds-` and see all available components:

```html
<!-- Autocomplete suggests: pds-drawer, pds-icon, pds-upload, etc. -->
<pds-drawer 
  position="right"    <!-- Autocomplete: bottom|top|left|right -->
  open                <!-- Boolean attributes suggested -->
  max-height="80vh">
  
  <!-- Slots are documented -->
  <div slot="drawer-header">Settings</div>
  <div slot="drawer-content">Content</div>
</pds-drawer>

<!-- Icon autocomplete suggests all available icons -->
<pds-icon icon="star"></pds-icon>
<pds-icon icon="bell-ringing"></pds-icon>
```

### CSS IntelliSense in Action

#### CSS Custom Properties

**✅ Works in .css files:**
```css
.my-component {
  /* Type var(-- and see all tokens with autocomplete */
  background: var(--color-primary-500);
  color: var(--color-gray-50);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  
  /* Hover over any token to see its value */
  transition: var(--transition-normal);
}
```

**✅ Works in `<style>` tags:**
```html
<style>
  .custom {
    color: var(--color-primary-500);
    padding: var(--spacing-4);
  }
</style>
```

**❌ Does NOT work in inline `style` attributes** (VS Code limitation):
```html
<!-- No IntelliSense here - use <style> tag or utility classes instead -->
<div style="color: var(--)"></div>
```

#### Utility Classes

```html
<!-- Class autocomplete in HTML -->
<div class="flex gap-4 items-center">
  <div class="card surface-elevated">
    <!-- Primitives and utilities autocomplete -->
  </div>
</div>

<button class="border-gradient-primary">
  Fancy Button
</button>
```

#### Data Attributes

Progressive enhancement attributes with example code:

```html
<!-- Type data-dr to see data-dropdown suggestion with example -->
<nav data-dropdown>
  <button>Menu</button>
  <menu>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </menu>
</nav>

<!-- Type data-to to see data-toggle suggestion with example -->
<label data-toggle>
  <span data-label>Enable notifications</span>
  <input type="checkbox">
</label>
```

**IntelliSense shows:**
- Attribute name (`data-dropdown`, `data-toggle`)
- Description of what it does
- Complete example markup from the enhancer's `demoHtml`

## 🎨 What's Included

### CSS Custom Properties (150+ tokens)

- **Colors**: `--color-{name}-{50-900}` (primary, secondary, accent, gray, etc.)
- **Spacing**: `--spacing-{xs|sm|md|lg|xl|2xl|...}`
- **Typography**: `--font-family-{heading|body|mono}`, `--font-size-*`, `--font-weight-*`
- **Borders**: `--radius-{sm|md|lg|xl|full}`, `--border-width-{thin|medium|thick}`
- **Shadows**: `--shadow-{sm|md|lg|xl|2xl}`
- **Transitions**: `--transition-{fast|normal|slow}`
- **Layout**: `--breakpoint-{sm|md|lg|xl}`, `--z-{dropdown|modal|tooltip|...}`
- **Surfaces**: `--surface-bg`, `--surface-text`, `--surface-border`, etc.

### CSS Classes (50+ utilities)

**Primitives**:
- `.badge`, `.card`, `.surface`, `.alert`, `.dialog`, `.table`, `.button`

**Layout**:
- `.flex`, `.grid`, `.grid-cols-{1-6}`, `.grid-auto-{sm|md|lg|xl}`, `.container`

**Utilities**:
- `.gap-{0-12}`, `.items-{start|end|center|baseline|stretch}`
- `.justify-{start|end|center|between|around|evenly}`
- `.border-gradient`, `.border-gradient-{primary|accent|secondary}`
- `.border-glow`, `.border-glow-{sm|lg}`, `.border-glow-{color}`

### Data Attributes (5+ enhancements)

- `data-dropdown` - Auto-enhance navigation with dropdowns
- `data-toggle` - Transform checkboxes into toggle switches
- `data-tabs` - Tab interface enhancement
- `data-modal` - Modal dialog behavior
- `data-tooltip` - Tooltip enhancement

## 🔍 Troubleshooting

### CSS IntelliSense Not Working in Inline Styles

**This is expected!** VS Code's CSS custom data **only works in:**
- ✅ `.css` files
- ✅ `<style>` tags in HTML
- ❌ **NOT** in inline `style` attributes

**Workarounds:**
```html
<!-- ❌ Won't work -->
<div style="padding: var(--)"></div>

<!-- ✅ Use <style> tag -->
<style>
  .my-padding { padding: var(--spacing-4); }
</style>
<div class="my-padding"></div>

<!-- ✅ Or use utility classes -->
<div class="gap-4 flex"></div>
```

### IntelliSense Not Working in CSS Files

1. **Verify files exist**:
   ```bash
   ls -la node_modules/pure-ds/public/assets/pds/
   # Should show: vscode-custom-data.json, pds.css-data.json
   ```

2. **Check settings path**: Ensure paths in `.vscode/settings.json` are correct

3. **Reload VS Code**: Always reload after changing settings (Ctrl+Shift+P → "Developer: Reload Window")

4. **Test in a CSS file**: Create a `.css` file and type `var(--` to see if autocomplete appears

5. **Clear cache**: Try deleting `.vscode/` folder and recreating settings

### Partial Autocomplete

If you only see some suggestions:
- HTML works but CSS doesn't → Check `css.customData` setting and reload
- CSS works but HTML doesn't → Check `html.customData` setting and reload
- CSS works in files but not inline → This is normal (VS Code limitation)

### Consuming Project Setup

If PDS is installed as a dependency:

```json
{
  "html.customData": [
    "node_modules/pure-ds/public/assets/pds/vscode-custom-data.json"
  ],
  "css.customData": [
    "node_modules/pure-ds/public/assets/pds/pds.css-data.json"
  ]
}
```

If you've copied PDS assets to your project:

```json
{
  "html.customData": [
    "public/assets/pds/vscode-custom-data.json"
  ],
  "css.customData": [
    "public/assets/pds/pds.css-data.json"
  ]
}
```

## 📚 Standards Compliance

PDS IntelliSense follows these standards:

- **Custom Elements Manifest**: [Web Component Standard](https://github.com/webcomponents/custom-elements-manifest)
- **VS Code Custom Data**: [VS Code HTML/CSS Data Format](https://github.com/microsoft/vscode-custom-data)
- **Cross-editor compatibility**: Standard JSON formats work with LSP-compliant editors

## 🚀 Advanced Usage

### TypeScript Support

PDS also provides TypeScript definitions for full type safety:

```typescript
import { PDS } from 'pure-ds';

// TypeScript knows all methods and properties
const pds = new PDS({ 
  preset: 'default',
  design: {
    colors: {
      primary: '#007acc'
    }
  }
});

// Fully typed
pds.compiled.tokens.colors.primary[500];
```

### Custom Data Generation

To generate custom data with your own configuration:

```bash
# Generate with custom target directory
npm run pds:dx public/my-assets
```

## 💡 Tips

1. **Type less**: Let IntelliSense do the work - type `--col` and pick from suggestions
2. **Explore tokens**: Hover over variables to see actual values
3. **Discover utilities**: Type `.` in class attribute to browse all available classes
4. **Icon discovery**: Use `icon="` and browse all icon names with descriptions
5. **Learn by browsing**: IntelliSense descriptions teach you the design system

## 🤝 Contributing

Found missing autocomplete entries? The data is generated from:
- `src/js/pds-core/pds-ontology.js` - Class definitions and enhancements
- `src/js/pds-core/pds-generator.js` - Token generation
- Component JSDoc comments - HTML element documentation

Submit PRs to improve coverage!

---

**Next Steps**:
- [Getting Started](./readme.md#getting-started)
- [Configuration Guide](./readme.md#configuration)
- [Component Documentation](./packages/pds-storybook/README.md)
