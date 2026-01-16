# Lit Component Requirements - Implementation Summary

## Issue
When consuming apps use `<pds-form>` or other Lit-dependent components, they fail silently with a generic error message if the `#pds/lit` import map is not configured.

## Components Requiring Lit
- `<pds-form>` - JSON Schema forms

This component imports from `#pds/lit` which is a virtual module specifier that must be resolved via:
1. Import maps (for browsers without bundlers)
2. Build tool aliases (for Vite, Webpack, etc.)

## Changes Made

### 1. Improved Error Detection (src/js/pds.js)
Enhanced the `onError` handler in auto-define configuration to:
- Detect when a Lit-dependent component fails to load
- Check if the error is related to missing `#pds/lit`
- Show a helpful error message with exact fix instructions

**Before:**
```
⚠️ PDS component <pds-form> not found. Assets may not be installed.
```

**After (when #pds/lit is missing):**
```
❌ PDS component <pds-form> requires Lit but #pds/lit is not in import map.
Add this to your HTML <head>:
<script type="importmap">
  { "imports": { "#pds/lit": "./path/to/lit.js" } }
</script>
See: https://github.com/pure-ds/core#lit-components
```

### 2. Enhanced Documentation (readme.md)
Added a dedicated troubleshooting section "Lit Components Not Working" that includes:
- Symptoms to identify the issue
- List of components requiring Lit
- Solution for browsers (import map)
- Solution for bundlers (aliases)
- Important note about waiting for component definition before accessing APIs

### 3. Updated Copilot Instructions (.github/copilot-instructions.md)
Added comprehensive guidance for AI code generation:
- New section "⚡ Lit Components & Import Maps" with:
  - Which components require Lit
  - Import map requirement
  - Correct patterns using `await customElements.whenDefined()`
  - Anti-patterns to avoid
- Updated "Critical Anti-Patterns" section
- Added checklist items (#9 and #10) for lazy component handling and import map inclusion

## Usage Examples

### Browser (No Bundler)
```html
<!DOCTYPE html>
<html>
<head>
  <script type="importmap">
  {
    "imports": {
      "#pds/lit": "/assets/js/lit.js"
    }
  }
  </script>
</head>
<body>
  <pds-form></pds-form>
  
  <script type="module">
    import { PDS } from './assets/js/pds.js';
    await PDS.start();
    
    // ✅ Wait for component to be defined
    await customElements.whenDefined('pds-form');
    const form = document.querySelector('pds-form');
    form.getFormData(); // Now safe to use
  </script>
</body>
</html>
```

### Vite
```javascript
// vite.config.js
export default {
  resolve: {
    alias: { '#pds/lit': 'lit' }
  }
};
```

### Webpack
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: { '#pds/lit': 'lit' }
  }
};
```

## Testing
Created `test-lit-detection.html` to verify the improved error messages when import map is missing.

## Benefits
1. **Better DX**: Clear, actionable error messages instead of cryptic module resolution errors
2. **Faster debugging**: Developers immediately know what's wrong and how to fix it
3. **Safer code generation**: AI assistants now know to include import maps and use proper async patterns
4. **Comprehensive docs**: Both human and AI references updated

## Future Considerations
- Could add a runtime check that proactively tests for `#pds/lit` availability
- Could provide a helper utility: `PDS.checkLitSupport()` that returns diagnostic info
- Consider bundling Lit directly to avoid this requirement (trade-off: larger bundle size)
