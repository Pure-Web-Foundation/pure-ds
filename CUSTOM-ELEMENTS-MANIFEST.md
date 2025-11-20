# Custom Elements Manifest

Pure Design System automatically generates a comprehensive Custom Elements Manifest (`custom-elements.json`) for all PDS web components.

## What is a Custom Elements Manifest?

The Custom Elements Manifest is a standardized JSON file that describes all web components in the system, including:

- **Properties & Attributes**: All public properties with their types, descriptions, and default values
- **Methods**: Public methods with parameters, return types, and descriptions
- **Events**: Custom events fired by components
- **Slots**: Named and unnamed slots for content projection
- **CSS Custom Properties**: Themeable CSS variables
- **CSS Parts**: Shadow DOM parts that can be styled externally

## Benefits

### IDE Integration
- **IntelliSense/Autocomplete**: Get property and method suggestions in VS Code, WebStorm, and other IDEs
- **Type Checking**: Validate attributes and properties in HTML and JSX
- **Documentation on Hover**: View component documentation inline while coding

### Documentation Generation
- Automatically generate API documentation from the manifest
- Keep documentation in sync with code
- Integrate with tools like Storybook, Docusaurus, or custom doc sites

### Framework Integration
- Better support for React, Vue, Angular, and other frameworks
- Improved type definitions for TypeScript projects
- Enhanced component wrapping and integration

## Generation

The manifest is automatically generated during `pds:export`:

```bash
npm run pds:export
```

This will:
1. Analyze all components in `public/assets/pds/components/`
2. Extract JSDoc comments and type information
3. Generate `custom-elements.json` in the export directory
4. Include the manifest in the published package

You can also generate the manifest independently:

```bash
npm run pds:manifest
```

## Configuration

The manifest generator is configured via `custom-elements-manifest.config.js`:

```javascript
export default {
  globs: ['public/assets/pds/components/pds-*.js'],
  exclude: [],
  outdir: '.',
  litelement: true,
};
```

## Component Documentation

Components are documented using JSDoc comments:

```javascript
/**
 * @element pds-drawer
 * @fires toggle - Fired when the drawer opens or closes
 * 
 * @slot drawer-header - Header content for the drawer
 * @slot drawer-content - Main content of the drawer
 * 
 * @cssprop --drawer-duration - Animation duration
 * @cssprop --drawer-max-height - Maximum height
 * 
 * @csspart backdrop - The backdrop overlay
 * @csspart panel - The drawer panel
 */
export class DrawerPanel extends HTMLElement {
  /**
   * Controls whether the drawer is open or closed
   * @type {boolean}
   * @attr open
   */
  get open() {
    return this._open;
  }
  
  /**
   * Opens the drawer
   * @method openDrawer
   * @public
   */
  openDrawer() {
    this.open = true;
  }
}
```

## Usage in IDEs

### VS Code

Install the [Custom Elements Manifest extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) for enhanced HTML/JSX autocomplete and validation.

### WebStorm/IntelliJ

WebStorm automatically recognizes `custom-elements.json` and provides IntelliSense for web components.

## Manifest Location

After running `pds:export`, the manifest is located at:

```
<target-dir>/custom-elements.json
```

Default location:
```
public/assets/pds/custom-elements.json
```

The manifest is also included in the published npm package at the root level.

## Example Manifest Entry

```json
{
  "kind": "class",
  "name": "DrawerPanel",
  "tagName": "pds-drawer",
  "description": "A slide-out drawer panel component",
  "members": [
    {
      "kind": "field",
      "name": "open",
      "type": { "text": "boolean" },
      "description": "Controls whether the drawer is open or closed",
      "attribute": "open"
    },
    {
      "kind": "method",
      "name": "openDrawer",
      "description": "Opens the drawer",
      "privacy": "public"
    }
  ],
  "events": [
    {
      "name": "toggle",
      "description": "Fired when the drawer opens or closes"
    }
  ],
  "slots": [
    {
      "name": "drawer-header",
      "description": "Header content for the drawer"
    }
  ]
}
```

## Further Reading

- [Custom Elements Manifest Specification](https://github.com/webcomponents/custom-elements-manifest)
- [Custom Elements Manifest Analyzer](https://github.com/open-wc/custom-elements-manifest)
- [JSDoc Tags Reference](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/#supported-jsdoc)
