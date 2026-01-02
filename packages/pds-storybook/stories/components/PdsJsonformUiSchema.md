# pds-jsonform uiSchema Reference

The **uiSchema** is the configuration object that controls how `pds-jsonform` renders and behaves. While JSON Schema defines *what* data to collect, uiSchema defines *how* to collect it.

## Path Notation

uiSchema uses **JSON Pointer paths** (or dot notation) to target specific fields:

```javascript
const uiSchema = {
  // JSON Pointer format (with leading slash)
  "/fieldName": { ... },
  "/nested/field": { ... },
  
  // Dot notation (without leading slash) - also supported
  "fieldName": { ... },
  "nested.field": { ... }
};
```

---

## Widget Selection (`ui:widget`)

Override the automatically selected widget for a field.

| Widget | Input Type | Description |
|--------|------------|-------------|
| `input-text` | `string` | Standard text input (default for strings) |
| `textarea` | `string` | Multi-line text area |
| `password` | `string` | Password input with masked characters |
| `input-email` | `string` | Email input with browser validation |
| `input-url` | `string` | URL input with browser validation |
| `input-tel` | `string` | Telephone input |
| `input-date` | `string` | Date picker |
| `input-time` | `string` | Time picker |
| `input-datetime` | `string` | Date and time picker |
| `input-number` | `number`/`integer` | Numeric input (default for numbers) |
| `input-range` | `number`/`integer` | Range slider |
| `input-color` | `string` | Color picker |
| `checkbox` | `boolean` | Standard checkbox |
| `toggle` | `boolean` | Toggle switch (modern on/off) |
| `select` | `string` (enum) | Dropdown select (default for enums) |
| `radio` | `string` (enum) | Radio button group |
| `checkbox-group` | `array` | Multi-select checkboxes |
| `upload` | `string` | File upload (pds-upload) |
| `richtext` | `string` | Rich text editor (pds-richtext) |
| `const` | any | Read-only display |

### Example

```javascript
const uiSchema = {
  "/description": { "ui:widget": "textarea" },
  "/rating": { "ui:widget": "input-range" },
  "/active": { "ui:widget": "toggle" },
  "/category": { "ui:widget": "radio" },
  "/bio": { "ui:widget": "richtext" },
  "/avatar": { "ui:widget": "upload" }
};
```

---

## Widget Options (`ui:options`)

Pass configuration to specific widgets.

### Textarea Options

```javascript
{
  "ui:widget": "textarea",
  "ui:options": {
    "rows": 6,        // Number of visible rows
    "cols": 50,       // Number of visible columns
    "resize": "both"  // "none", "vertical", "horizontal", "both"
  }
}
```

### Range Slider Options

```javascript
{
  "ui:widget": "input-range",
  "ui:options": {
    "min": 0,         // Minimum value
    "max": 100,       // Maximum value
    "step": 5         // Step increment
  }
}
```

### File Upload Options (pds-upload)

```javascript
{
  "ui:widget": "upload",
  "ui:options": {
    "accept": "image/jpeg,image/png",  // Accepted MIME types
    "maxSize": 5242880,                // Max file size in bytes (5MB)
    "multiple": false,                 // Allow multiple files
    "label": "Choose photo"            // Upload button label
  }
}
```

### Rich Text Options (pds-richtext)

```javascript
{
  "ui:widget": "richtext",
  "ui:options": {
    "toolbar": "standard",    // "minimal", "standard", "full"
    "spellcheck": true,       // Enable spellcheck
    "submitOnEnter": false,   // Submit form on Enter
    "format": "html"          // "html" or "markdown" output
  }
}
```

---

## Layout Options (`ui:layout`)

Control how nested objects/fieldsets are rendered.

| Layout | Description | Use Case |
|--------|-------------|----------|
| `default` | Standard vertical fieldset | Simple forms |
| `flex` | Flexbox container | Inline fields, wrapping |
| `grid` | CSS Grid layout | Multi-column forms |
| `accordion` | Collapsible `<details>` sections | Settings, long forms |
| `tabs` | Tabbed interface (pds-tabstrip) | Multi-page forms |

### Flex Layout

```javascript
{
  "ui:layout": "flex",
  "ui:layoutOptions": {
    "direction": "row",     // "row" or "column"
    "wrap": true,           // Allow wrapping
    "gap": "md"             // "xs", "sm", "md", "lg", "xl"
  }
}
```

### Grid Layout

```javascript
{
  "ui:layout": "grid",
  "ui:layoutOptions": {
    "columns": 3,           // Fixed columns: 1, 2, 3, 4, 6
    "gap": "md"             // Gap between items
  }
}

// Auto-sizing grid
{
  "ui:layout": "grid",
  "ui:layoutOptions": {
    "columns": "auto",      // Responsive auto-fit
    "autoSize": "md",       // Min column width: "sm", "md", "lg", "xl"
    "gap": "md"
  }
}
```

### Accordion Layout

```javascript
{
  "ui:layout": "accordion",
  "ui:layoutOptions": {
    "openFirst": true       // First section open by default
  }
}
```

### Tabs Layout

```javascript
{
  "ui:layout": "tabs"
  // Each nested object property becomes a tab
}
```

---

## Field Customization

### Labels and Help Text

```javascript
{
  "ui:title": "Custom Label",      // Override schema title
  "ui:help": "Help text below",    // Help/description text
  "ui:placeholder": "Type here..." // Placeholder text (overrides examples)
}
```

### Icons (`ui:icon`)

Add icons to input fields (uses pds-icon):

```javascript
{
  "ui:icon": "user",              // Icon name from sprite
  "ui:iconPosition": "start"      // "start" (default) or "end"
}
```

**Common icons:** `user`, `envelope`, `lock`, `globe`, `phone`, `map-pin`, `calendar`, `search`, `gear`, `folder`, `file`, `check`, `x`

### Autocomplete Hints

```javascript
{
  "ui:autocomplete": "email"      // Browser autocomplete hint
}
```

**Values:** `off`, `on`, `name`, `email`, `username`, `new-password`, `current-password`, `tel`, `address-line1`, `country`, `postal-code`, etc.

### Datalist Autocomplete (`ui:datalist`)

Native browser autocomplete suggestions:

```javascript
{
  "ui:datalist": [
    "United States",
    "United Kingdom", 
    "Canada",
    "Australia"
  ]
}
```

### Enhanced Dropdown (`ui:dropdown`)

Use PDS dropdown enhancement for select fields:

```javascript
{
  "ui:dropdown": true
}
```

### CSS Classes (`ui:class`)

Add custom CSS classes:

```javascript
{
  "ui:class": "buttons"     // e.g., radio buttons as button group
}
```

---

## Surface Wrapping (`ui:surface`)

Wrap fieldsets in styled containers using PDS surface tokens:

```javascript
{
  "ui:surface": "card"            // Card surface
}
```

| Surface | Description |
|---------|-------------|
| `card` | Card with border and shadow |
| `elevated` | Elevated surface with stronger shadow |
| `surface-sunken` | Sunken/recessed surface |
| `surface-inverse` | Inverted color scheme |
| `surface-subtle` | Subtle background difference |

---

## Dialog Forms (`ui:dialog`)

Collect nested object data in a modal dialog:

```javascript
{
  "ui:dialog": true,
  "ui:dialogOptions": {
    "buttonLabel": "Edit Details",    // Button text
    "dialogTitle": "Edit Information", // Dialog title
    "icon": "edit"                    // Button icon (optional)
  }
}
```

### How Dialog Forms Work

1. Renders a button instead of inline fieldset
2. Clicking opens a modal dialog with the nested fields
3. Dialog submission updates a hidden input in the main form
4. All nested data is preserved and submitted with the form

### Nested Field Customization in Dialogs

You can customize fields inside dialog forms:

```javascript
{
  "/teamLead": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      "buttonLabel": "Edit Team Lead",
      "dialogTitle": "Team Lead Information"
    },
    // Nested field customization
    "name": { "ui:icon": "user" },
    "email": { "ui:icon": "envelope" }
  }
}
```

---

## Field Order (`ui:order`)

Control the rendering order of fields:

```javascript
{
  "/": {
    "ui:order": ["name", "email", "phone", "address"]
  }
}
```

Fields not in the order array are rendered after ordered fields.

---

## Conditional/Hidden Fields

### Read-only Display (`ui:widget: const`)

```javascript
{
  "ui:widget": "const"    // Display value as read-only
}
```

### Disabled Fields

```javascript
{
  "ui:disabled": true     // Disable the field
}
```

### Hidden Fields

```javascript
{
  "ui:hidden": true       // Hide from rendering but include in data
}
```

---

## Array Fields

### Array Layout

```javascript
{
  "/tags": {
    "ui:layout": "default"    // Standard add/remove interface
  }
}
```

### Radio Group Open (Single Selection)

When array has `maxItems: 1` in schema, renders as radio buttons:

```javascript
// Schema
{
  "priority": {
    "type": "array",
    "items": { "type": "string" },
    "maxItems": 1,
    "uniqueItems": true,
    "default": ["High", "Medium", "Low"]
  }
}
```

---

## Complete uiSchema Keys Reference

| Key | Type | Description |
|-----|------|-------------|
| `ui:widget` | `string` | Widget type override |
| `ui:options` | `object` | Widget-specific options |
| `ui:layout` | `string` | Layout type for fieldsets |
| `ui:layoutOptions` | `object` | Layout configuration |
| `ui:surface` | `string` | Surface wrapper class |
| `ui:title` | `string` | Custom label text |
| `ui:help` | `string` | Help/description text |
| `ui:placeholder` | `string` | Input placeholder |
| `ui:icon` | `string` | Icon name |
| `ui:iconPosition` | `string` | Icon position: "start" or "end" |
| `ui:autocomplete` | `string` | Browser autocomplete hint |
| `ui:datalist` | `array` | Autocomplete suggestions |
| `ui:dropdown` | `boolean` | Use enhanced dropdown |
| `ui:class` | `string` | Additional CSS classes |
| `ui:dialog` | `boolean` | Render in modal dialog |
| `ui:dialogOptions` | `object` | Dialog configuration |
| `ui:order` | `array` | Field rendering order |
| `ui:disabled` | `boolean` | Disable field |
| `ui:hidden` | `boolean` | Hide field |

---

## Options Object Reference

Global form options that can be set via the `options` property:

```javascript
const options = {
  widgets: {
    booleans: "toggle",      // "toggle" or "checkbox"
    numbers: "input",        // "input" or "range"
    selects: "standard"      // "standard" or "dropdown"
  },
  layouts: {
    fieldsets: "default",    // Default nested object layout
    arrays: "default"        // Default array layout
  },
  enhancements: {
    icons: true,             // Enable icon-enhanced inputs
    datalists: true,         // Enable datalist autocomplete
    rangeOutput: true        // Show live value for range sliders
  },
  validation: {
    showErrors: true,        // Show inline validation errors
    validateOnChange: false  // Validate on change vs. submit
  }
};
```

---

## Path-Specific Options

Apply options to specific paths:

```javascript
const options = {
  // Global
  widgets: { booleans: "toggle" },
  
  // Path-specific
  "/address": {
    layout: "grid",
    columns: 2
  }
};
```

---

## Examples by Use Case

### Login Form

```javascript
const uiSchema = {
  "/email": {
    "ui:icon": "envelope",
    "ui:autocomplete": "email"
  },
  "/password": {
    "ui:widget": "password",
    "ui:icon": "lock",
    "ui:autocomplete": "current-password"
  },
  "/rememberMe": {
    "ui:widget": "toggle"
  }
};
```

### Settings Form with Accordion

```javascript
const uiSchema = {
  "/settings": {
    "ui:layout": "accordion",
    "ui:layoutOptions": { "openFirst": true }
  },
  "/settings/display/theme": {
    "ui:widget": "radio",
    "ui:class": "buttons"
  },
  "/settings/display/fontSize": {
    "ui:widget": "input-range"
  }
};
```

### Multi-Column Registration

```javascript
const uiSchema = {
  "/personalInfo": {
    "ui:layout": "grid",
    "ui:layoutOptions": { "columns": 2, "gap": "md" },
    "ui:surface": "card"
  },
  "/bio": {
    "ui:widget": "richtext",
    "ui:options": { "toolbar": "standard" }
  },
  "/avatar": {
    "ui:options": {
      "accept": "image/*",
      "maxSize": 5242880
    }
  }
};
```

### Wizard with Tabs

```javascript
const uiSchema = {
  "/wizard": {
    "ui:layout": "tabs"
  }
};
```

### Complex Nested with Dialogs

```javascript
const uiSchema = {
  "/projectName": { "ui:icon": "folder" },
  "/teamLead": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      "buttonLabel": "Edit Team Lead",
      "dialogTitle": "Team Lead Information",
      "icon": "user-gear"
    }
  },
  "/budget": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      "buttonLabel": "Edit Budget",
      "dialogTitle": "Budget Details",
      "icon": "currency-dollar"
    }
  }
};
```
