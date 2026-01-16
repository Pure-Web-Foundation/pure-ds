# PDS Copilot Instructions Update

## Summary

Updated PDS LLM instructions based on feedback from real-world usage. The improvements make AI assistants generate better PDS code with less prompting required.

## Key Improvements

### 1. **pds-form Best Practices Section** (New)

Added comprehensive guidance for generating `pds-form` code with 6 key patterns:

#### Pattern 1: Event Handling
- ✅ **Always use `pw:submit` event** (not native `submit`)
- Provides `{ json, formData, valid, issues }` in event detail

#### Pattern 2: Submit Button Progress
- ✅ **Auto-add `btn-working` class** during async operations
- Shows spinner icon automatically via PDS enhancement
- Remove class when operation completes

#### Pattern 3: Progressive Enhancement
- ✅ **Wrap in `form[data-required]`** to trigger asterisk enhancement
- Shows required field indicators automatically

#### Pattern 4: JSON Schema Placeholders
- ✅ **Use `examples` array** for placeholder text
- First example in array becomes the input placeholder
- Works for all field types (string, number, etc.)

#### Pattern 5: Smart Icon Inference
- ✅ **Auto-infer icons** based on field names
- Provided mapping of common fields to icons:
  - `email` → `envelope`
  - `phone` → `phone`
  - `name` → `user`
  - `password` → `lock`
  - `message` → `message`
  - And 10+ more common mappings

#### Pattern 6: Complete Working Example
- Full contact form example showing all patterns in action
- 2-second simulated async submission
- Toast notifications for success/error
- Form reset after successful submit

### 2. **Anti-Patterns Expanded**

Added pds-form-specific anti-patterns:

```javascript
// ❌ NEVER: Use native 'submit' event with pds-form
form.addEventListener('submit', (e) => { }); // → Use 'pw:submit'

// ❌ NEVER: Forget btn-working class for async operations
button.onclick = async () => {
  await fetch('/api'); // No loading indicator!
};

// ❌ NEVER: Hardcode placeholders instead of using schema examples
const schema = { 
  properties: { 
    email: { type: "string" } // Missing examples!
  }
};
```

### 3. **SSoT Path Resolution**

Improved file path guidance for consuming projects:

```markdown
**Path resolution helper:** When looking up SSoT files:
1. First check if `node_modules/@pure-ds/core/` exists (consuming project)
2. Otherwise use workspace root paths (pure-ds development)
3. Prefer reading actual files over guessing - the data is authoritative
```

This helps AI assistants find the right files whether working in:
- The `pure-ds` project itself
- A consuming project using `@pure-ds/core` from npm

### 4. **Additional Resources Section**

Added explicit pointers to comprehensive documentation:

- `pds-form-docs.md` - Complete API reference (2576 lines)
- `PdsForm.stories.js` - Real-world examples
- `custom-elements.json` - Component API metadata

### 5. **Updated Summary Checklist**

Expanded from 10 to 15 items with 5 pds-form-specific checks:

11. ✅ **Use `pw:submit` event** — NOT native `submit` event
12. ✅ **Add `btn-working` class** — For async submit operations
13. ✅ **Use `examples` in JSON schema** — First example becomes placeholder
14. ✅ **Add smart icons** — Infer based on field names
15. ✅ **Wrap in `form[data-required]`** — For asterisk enhancement

## Files Updated

1. [`.github/copilot-instructions.md`](.github/copilot-instructions.md) - Main instructions (GitHub Copilot)
2. [`.cursorrules`](.cursorrules) - Same content for Cursor AI

Both files now contain identical guidance to ensure consistency across AI tools.

## Impact

These improvements address the user's concerns:

✅ **Less prompting required** - AI now knows to add `btn-working`, `data-required`, placeholders, and icons automatically

✅ **Correct event usage** - Will use `pw:submit` instead of `submit`

✅ **Better defaults** - Smart icon inference, proper async handling, progressive enhancement

✅ **SSoT awareness** - Better file path resolution for both pure-ds and consuming projects

✅ **Complete examples** - Full working patterns instead of fragments

## Before vs After

### Before (What User Had to Specify):
```
Build me a contact form with:
- placeholders
- input icons  
- progress indicators
- validations
- required legends
- async submit handling
```

### After (What AI Now Adds Automatically):
```
Build me a contact form
```

AI will automatically include:
- `pw:submit` event listener
- `btn-working` class toggle during async operations
- `examples` in JSON schema for placeholders
- Smart icon inference (email→envelope, etc.)
- `form[data-required]` wrapper
- 2-second simulated async submission
- Toast notification for success
- Form reset after submit

## Related Documentation

- [pds-form-docs.md](pds-form-docs.md) - Complete pds-form API reference
- [custom-elements.json](custom-elements.json) - Component metadata
- [src/js/pds-core/pds-enhancer-metadata.js](src/js/pds-core/pds-enhancer-metadata.js) - Enhancement patterns including `btn-working` and `data-required`
