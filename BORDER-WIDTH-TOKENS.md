# Border Width Tokens - Implementation Summary

## Overview

Border width tokens have been added to the Pure Design System's token generation system. These tokens provide consistent border widths across all components and utilities.

## Implementation Details

### Token Generation

Border width tokens are generated in `pds-generator.js` using the `#generateBorderWidthTokens()` method, which creates CSS custom properties based on the `BorderWidths` enum values defined in `pds-enums.js`.

### Available Tokens

| Token | Value | Description |
|-------|-------|-------------|
| `--border-width-hairline` | 0.5px | Ultra-thin borders |
| `--border-width-thin` | 1px | Thin borders (default for most elements) |
| `--border-width-medium` | 2px | Medium borders (used in gradient utilities) |
| `--border-width-thick` | 3px | Thick borders for emphasis |

### Configuration

Border widths can be configured in `pds.config.js` under the `shape` section:

```javascript
{
  shape: {
    borderWidth: "medium", // or "hairline", "thin", "thick", or a numeric value
    // ... other shape config
  }
}
```

### Usage in CSS

```css
/* Direct usage */
.my-element {
  border: var(--border-width-thin) solid var(--color-border);
}

/* Used in border gradient utilities */
.border-gradient {
  border: var(--border-width-medium) solid transparent;
}
```

### Integration with Existing Code

The border width tokens are now used in:

1. **Border Gradient Utilities** - All `.border-gradient-*` classes use `--border-width-medium`
2. **Token System** - Generated as part of the tokens layer alongside radius, spacing, and other design tokens
3. **Design System Enums** - Based on `enums.BorderWidths` in `pds-enums.js`

## Files Modified

1. **`src/js/pds-core/pds-generator.js`**
   - Added `#generateBorderWidthTokens()` method
   - Added `#generateBorderWidthVariables()` method
   - Integrated borderWidths into `#generateTokens()` return object
   - Added borderWidths to `#generateTokensLayer()` CSS generation

2. **Generated Files**
   - `public/assets/pds/styles/pds-tokens.css` - Contains the CSS custom properties
   - `public/assets/pds/styles/pds-utilities.css` - Uses the tokens in gradient utilities

## Enum Definition

From `src/js/pds-core/pds-enums.js`:

```javascript
BorderWidths: {
  hairline: 0.5,
  thin: 1,
  medium: 2,
  thick: 3,
}
```

## Benefits

✅ **Consistency** - All border widths use the same scale across the design system  
✅ **Maintainability** - Change border widths globally by updating tokens  
✅ **Theme Compatibility** - Border widths adapt to configuration  
✅ **Type Safety** - Enum-based values prevent invalid widths  
✅ **Token-First** - Follows PDS architecture principles  

## Previous Gap

Before this implementation, border widths were:
- Hardcoded in various components (e.g., `border: 1px solid`)
- Not available as design tokens
- Inconsistent across the codebase
- Referenced in config but not generated as CSS variables

Now, border widths are properly tokenized and available throughout the system.

## Design System Tokens Comparison

| Token Category | Status | Example |
|---------------|--------|---------|
| Colors | ✅ Implemented | `--color-primary-500` |
| Spacing | ✅ Implemented | `--spacing-4` |
| Radius | ✅ Implemented | `--radius-lg` |
| **Border Widths** | ✅ **Now Implemented** | `--border-width-medium` |
| Typography | ✅ Implemented | `--font-size-lg` |
| Shadows | ✅ Implemented | `--shadow-lg` |
| Transitions | ✅ Implemented | `--transition-fast` |
| Z-Index | ✅ Implemented | `--z-modal` |
| Icons | ✅ Implemented | `--icon-size-lg` |

## Related

- See `BORDER-GRADIENT-UTILITIES.md` for documentation on gradient border utilities
- See `src/js/pds-core/pds-enums.js` for all enum definitions
- See `src/js/pds-core/pds-generator.js` for complete token generation code
