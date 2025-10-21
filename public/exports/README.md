# Pure Design System - Exported Files

Generated on: 2025-10-21T08:33:43.710Z

## Files

### CSS Files (for static import)
- `pds-tokens.css` - Design tokens (CSS custom properties)
- `pds-primitives.css` - Native element baseline styles
- `pds-components.css` - Component styles
- `pds-utilities.css` - Utility classes
- `pds-styles.css` - Complete design system (all layers)

### CSS Modules (for web components)
- `pds-tokens.css.js` - Constructable stylesheet for tokens
- `pds-primitives.css.js` - Constructable stylesheet for primitives
- `pds-components.css.js` - Constructable stylesheet for components
- `pds-utilities.css.js` - Constructable stylesheet for utilities
- `pds-styles.css.js` - Complete design system as constructable stylesheet

## Usage

### For global styles
```html
<link rel="stylesheet" href="pds-styles.css">
```

### For web components (Shadow DOM)
```javascript
import { primitives } from './pds-primitives.css.js';

class MyComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    
    const componentStyles = new CSSStyleSheet();
    componentStyles.replaceSync(`/* your styles */`);
    
    this.shadowRoot.adoptedStyleSheets = [primitives, componentStyles];
  }
}
```

### Layer Architecture

The design system uses CSS Cascade Layers for predictable specificity:

```css
@layer tokens, primitives, components, utilities;
```

- **tokens**: Design tokens (CSS custom properties only)
- **primitives**: Native element baseline styles (button, input, etc.)
- **components**: Component styles (alerts, badges, etc.)
- **utilities**: Utility classes (lowest priority)

## Best Practices

1. **Import primitives in web components** to ensure consistent native element styling
2. **Use tokens** for all design values (colors, spacing, etc.)
3. **Layer your styles** to maintain the cascade hierarchy
4. **Adopt stylesheets** instead of inline styles for better performance

For more information, see the [Pure Design System documentation](https://github.com/mvneerven/pure-ds).
