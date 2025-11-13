# Border Gradient Utilities

WHOOP-style card outlines with gradient borders and glow effects for the Pure Design System.

## Overview

These utilities provide reusable classes for creating cards and containers with gradient borders and optional glow effects, inspired by modern app designs like WHOOP. All utilities use PDS design tokens and automatically adapt to theme changes.

## Features

✅ **Standard bordered cards** - Simple card outlines with rounded corners  
✅ **Gradient borders** - Premium-style gradient borders using double-background technique  
✅ **Color variants** - Primary, accent, and secondary color combinations  
✅ **Border strength** - Soft (1px), medium (2px), and strong (3px) variants  
✅ **Glow effects** - Subtle box-shadow glows in various intensities  
✅ **Semantic glows** - Success, warning, danger, and other state-based glows  
✅ **Composable** - Mix and match gradient and glow utilities  

## Usage

### Basic Card Border

```html
<div class="u-border-card">
  <h3>Card Title</h3>
  <p>Standard bordered card with rounded corners</p>
</div>
```

### Gradient Borders

```html
<!-- Default gradient (primary to accent) -->
<div class="u-border-gradient">
  <h3>Premium Card</h3>
  <p>Gradient border effect</p>
</div>

<!-- Primary color gradient -->
<div class="u-border-gradient-primary">
  <h3>Primary Card</h3>
</div>

<!-- Accent color gradient -->
<div class="u-border-gradient-accent">
  <h3>Accent Card</h3>
</div>

<!-- Secondary color gradient -->
<div class="u-border-gradient-secondary">
  <h3>Secondary Card</h3>
</div>
```

### Border Strength Variants

```html
<!-- Soft 1px border -->
<div class="u-border-gradient-soft">
  <h3>Subtle Gradient</h3>
</div>

<!-- Medium 2px border -->
<div class="u-border-gradient-medium">
  <h3>Medium Gradient</h3>
</div>

<!-- Strong 3px border -->
<div class="u-border-gradient-strong">
  <h3>Bold Gradient</h3>
</div>
```

### Glow Effects

```html
<!-- Small glow (6px) -->
<div class="u-border-card u-border-glow-sm">
  <h3>Subtle Glow</h3>
</div>

<!-- Default glow (12px) -->
<div class="u-border-card u-border-glow">
  <h3>Standard Glow</h3>
</div>

<!-- Large glow (20px) -->
<div class="u-border-card u-border-glow-lg">
  <h3>Strong Glow</h3>
</div>
```

### Combined Effects

```html
<!-- Gradient + glow in one class -->
<div class="u-border-gradient-glow">
  <h3>Featured Card</h3>
  <p>Premium gradient with glow effect</p>
</div>

<!-- Mix gradient and glow utilities -->
<div class="u-border-gradient-primary u-border-glow-primary">
  <h3>Custom Combination</h3>
  <p>Primary gradient with primary glow</p>
</div>
```

### Semantic Glow Variants

```html
<div class="u-border-card u-border-glow-success">Success state</div>
<div class="u-border-card u-border-glow-warning">Warning state</div>
<div class="u-border-card u-border-glow-danger">Danger state</div>
<div class="u-border-card u-border-glow-primary">Primary focus</div>
<div class="u-border-card u-border-glow-accent">Accent highlight</div>
```

## Available Classes

### Card Borders

| Class | Description |
|-------|-------------|
| `.u-border-card` | Standard bordered card with rounded corners |

### Gradient Borders

| Class | Description |
|-------|-------------|
| `.u-border-gradient` | Default gradient (primary → accent) |
| `.u-border-gradient-primary` | Primary color gradient (light → dark) |
| `.u-border-gradient-accent` | Accent color gradient (light → dark) |
| `.u-border-gradient-secondary` | Secondary color gradient (light → dark) |

### Border Strength

| Class | Description |
|-------|-------------|
| `.u-border-gradient-soft` | 1px gradient border |
| `.u-border-gradient-medium` | 2px gradient border |
| `.u-border-gradient-strong` | 3px gradient border |

### Glow Effects

| Class | Description |
|-------|-------------|
| `.u-border-glow` | Default glow (12px) |
| `.u-border-glow-sm` | Small glow (6px) |
| `.u-border-glow-lg` | Large glow (20px) |
| `.u-border-gradient-glow` | Combined gradient + glow |

### Semantic Glows

| Class | Description |
|-------|-------------|
| `.u-border-glow-primary` | Primary color glow |
| `.u-border-glow-accent` | Accent color glow |
| `.u-border-glow-success` | Success color glow |
| `.u-border-glow-warning` | Warning color glow |
| `.u-border-glow-danger` | Danger color glow |

## Technical Details

### How Gradient Borders Work

The gradient border effect uses a double-background technique:

```css
.u-border-gradient {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(135deg, var(--color-primary-400), var(--color-accent-400)) border-box;
}
```

This creates:
- An inner background that fills the content area (padding-box)
- An outer gradient that shows through the transparent border (border-box)

### Design Tokens Used

All utilities leverage PDS design tokens for consistent theming:

- **Radius**: `var(--radius-large)` for rounded corners
- **Border width**: `var(--border-width-medium)` for standard borders
- **Spacing**: `var(--spacing-4)` for internal padding
- **Colors**: `var(--color-primary-*)`, `var(--color-accent-*)`, etc.
- **Surface**: `var(--color-surface-base)` for background

### Theme Compatibility

These utilities automatically adapt to:
- ✅ Light/dark mode themes
- ✅ Custom color scales
- ✅ Global border radius changes
- ✅ Spacing system modifications

## Demo

View the live demo at `/border-gradient-demo.html` to see all utilities in action.

## Best Practices

1. **Use `.u-border-card` for standard cards** - Simple and performant
2. **Use gradient borders for premium/featured content** - Draws attention
3. **Combine gradients with glows sparingly** - Can be visually overwhelming
4. **Match glow colors to gradient colors** - For cohesive design
5. **Consider accessibility** - Ensure sufficient color contrast for content

## Examples

### Featured Product Card

```html
<div class="u-border-gradient-glow">
  <h3>Premium Product</h3>
  <p class="price">$99.99</p>
  <button>Add to Cart</button>
</div>
```

### Status Card with Semantic Glow

```html
<div class="u-border-card u-border-glow-success">
  <h3>✓ Success</h3>
  <p>Your changes have been saved</p>
</div>
```

### Promotional Banner

```html
<div class="u-border-gradient-strong u-border-glow-lg">
  <h2>Limited Time Offer!</h2>
  <p>50% off all products</p>
  <button>Shop Now</button>
</div>
```

## Integration with PDS

These utilities are part of the PDS utilities layer and are:

- ✅ Generated by the PDS Generator
- ✅ Included in `pds-utilities.css`
- ✅ Registered in the PDS ontology
- ✅ Available via constructable stylesheets
- ✅ Exported in static builds

## Browser Support

Gradient borders work in all modern browsers. The technique uses:
- `linear-gradient()` - Widely supported
- `padding-box` / `border-box` - Standard CSS
- `box-shadow` - Universal support

No fallbacks needed for legacy browsers.

## Extending

To add custom gradient combinations, extend the generator in `pds-generator.js`:

```javascript
#generateBorderGradientUtilities() {
  // Add custom variants here
  return /*css*/`
    .u-border-gradient-custom {
      border: 2px solid transparent;
      background:
        linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
        linear-gradient(135deg, var(--color-custom-1), var(--color-custom-2)) border-box;
    }
  `;
}
```

## Related Utilities

- `.liquid-glass` - Frosted glass effect (opt-in via config)
- `.surface-*` - Surface layer utilities
- `.card` - Primitive card component
- `.surface-overlay` - Modal overlay surfaces
