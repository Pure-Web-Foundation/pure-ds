# ⚠️ CSS IntelliSense - Important Information

## Where CSS IntelliSense Works

✅ **CSS Files (.css)**
```css
/* Full autocomplete available */
.my-class {
  color: var(--color-primary-500);  /* ← Type var(-- to see all tokens */
  padding: var(--spacing-4);
}
```

✅ **HTML `<style>` Tags**
```html
<style>
  .custom {
    /* Full autocomplete available */
    background: var(--color-primary-500);
  }
</style>
```

## Where It Does NOT Work

❌ **Inline `style` Attributes** 
```html
<!-- NO IntelliSense here - This is a VS Code limitation -->
<div style="padding: var(--)"></div>
```

This is not a PDS bug - it's a VS Code limitation. The `css.customData` setting only applies to CSS files and `<style>` tags, not inline style attributes.

## Workarounds

### 1. Use `<style>` Tags
```html
<style>
  .my-padding {
    padding: var(--spacing-4);  /* Full IntelliSense works here */
  }
</style>
<div class="my-padding"></div>
```

### 2. Use Utility Classes
PDS provides comprehensive utility classes:
```html
<div class="flex gap-4 items-center">
  <div class="card surface-elevated">
    Content
  </div>
</div>
```

### 3. Use External CSS File
```css
/* styles.css - Full IntelliSense */
.hero {
  background: var(--color-primary-500);
  padding: var(--spacing-8);
}
```

```html
<div class="hero">Content</div>
```

## Verify It's Working

1. **Create a test CSS file** (like `test.css`)
2. **Type**: `color: var(--`
3. **You should see**: All 165 CSS custom properties with descriptions
4. **Hover over a token**: See the actual color/value

If this doesn't work:
1. Check `.vscode/settings.json` has `css.customData` configured
2. Reload VS Code (Ctrl+Shift+P → "Developer: Reload Window")
3. Make sure `pds.css-data.json` exists in `public/assets/pds/`

## For Class Autocomplete

Class autocomplete in HTML `class` attributes also has limitations in VS Code's HTML extension. For best class discovery:

1. **Use Storybook** - Browse all available classes and components
2. **Check documentation** - See [CSS-INTELLISENSE-QUICK-REF.md](./CSS-INTELLISENSE-QUICK-REF.md)
3. **Use TypeScript** - Better autocomplete in JS/TS files

## Summary

| Location | CSS Tokens | Utility Classes | Works? |
|----------|-----------|----------------|---------|
| `.css` files | ✅ Yes | N/A | ✅ Full Support |
| `<style>` tags | ✅ Yes | N/A | ✅ Full Support |
| `style=""` attribute | ❌ No | N/A | ❌ VS Code Limitation |
| `class=""` attribute | N/A | ⚠️ Limited | ⚠️ VS Code Limitation |

**Bottom line**: Use CSS files or `<style>` tags for the best IntelliSense experience with PDS tokens!
