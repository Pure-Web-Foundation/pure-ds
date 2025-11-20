# pds-jsonform Documentation

A powerful, extensible JSON Schema form generator for the Pure Design System (PDS). Automatically generates accessible, styled forms from JSON Schema with extensive customization through UI schemas and options.

## Table of Contents

- [Quick Start](#quick-start)
  - [Using with Lit](#using-with-lit)
  - [Using without Lit (Vanilla JavaScript)](#using-without-lit-vanilla-javascript)
- [JSON Schema Basics](#json-schema-basics)
  - [Supported Types](#supported-types)
  - [Validation Keywords](#validation-keywords)
  - [Nested Objects and Arrays](#nested-objects-and-arrays)
- [Component Properties](#component-properties)
- [UI Schema Reference](#ui-schema-reference)
  - [Widget Selection](#widget-selection)
  - [Layout Options](#layout-options)
  - [Field Customization](#field-customization)
  - [Advanced Features](#advanced-features)
- [Options System](#options-system)
  - [Default Options](#default-options)
  - [Preset Integration](#preset-integration)
  - [Path-Specific Options](#path-specific-options)
- [PDS Components Integration](#pds-components-integration)
  - [File Upload](#file-upload)
  - [Rich Text Editor](#rich-text-editor)
  - [Icon-Enhanced Inputs](#icon-enhanced-inputs)
- [Layouts and Grouping](#layouts-and-grouping)
  - [Flex Layout](#flex-layout)
  - [Grid Layout](#grid-layout)
  - [Accordion](#accordion)
  - [Tabs](#tabs)
  - [Cards and Surfaces](#cards-and-surfaces)
- [Dialog Forms](#dialog-forms)
- [Custom Renderers](#custom-renderers)
- [Event Hooks](#event-hooks)
- [Advanced Examples](#advanced-examples)

---

## Quick Start

### Using with Lit

```javascript
import { html, render } from 'lit';
import '/assets/pds/components/pds-jsonform.js';

const schema = {
  type: "object",
  title: "User Profile",
  required: ["email", "name"],
  properties: {
    name: {
      type: "string",
      title: "Full Name",
      minLength: 2
    },
    email: {
      type: "string",
      format: "email",
      title: "Email Address"
    },
    age: {
      type: "integer",
      minimum: 18,
      maximum: 120
    },
    newsletter: {
      type: "boolean",
      title: "Subscribe to newsletter",
      default: false
    }
  }
};

const template = html`
  <pds-jsonform
    .jsonSchema=${schema}
    @pw:submit=${(e) => {
      console.log('Form submitted:', e.detail);
      if (e.detail.valid) {
        console.log('Data:', e.detail.json);
      }
    }}
  ></pds-jsonform>
`;

render(template, document.getElementById('app'));
```

### Using without Lit (Vanilla JavaScript)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/assets/pds/styles/pds.css">
</head>
<body>
  <div id="form-container"></div>
  
  <script type="module">
    import '/assets/pds/components/pds-jsonform.js';
    
    const schema = {
      type: "object",
      title: "Contact Form",
      properties: {
        name: { type: "string", title: "Name" },
        email: { type: "string", format: "email" },
        message: { type: "string", title: "Message" }
      }
    };
    
    const form = document.createElement('pds-jsonform');
    form.jsonSchema = schema;
    
    form.addEventListener('pw:submit', (e) => {
      if (e.detail.valid) {
        console.log('Submitted data:', e.detail.json);
      }
    });
    
    document.getElementById('form-container').appendChild(form);
  </script>
</body>
</html>
```

---

## JSON Schema Basics

`pds-jsonform` uses [JSON Schema](https://json-schema.org/) to define form structure and validation.

### Supported Types

```javascript
{
  type: "string",    // Text input, textarea, select, etc.
  type: "number",    // Numeric input or range slider
  type: "integer",   // Integer-only input
  type: "boolean",   // Checkbox or toggle switch
  type: "object",    // Nested fieldset, accordion, tabs, or dialog
  type: "array"      // Repeatable fields with add/remove
}
```

### Validation Keywords

#### String Validation

```javascript
{
  type: "string",
  title: "Full Name",         // Field label
  description: "Help text",   // Field description/help
  examples: ["John Doe"],     // Placeholder text (first example used)
  minLength: 3,              // Minimum characters
  maxLength: 100,            // Maximum characters
  pattern: "^[A-Z].*",       // Regex pattern
  format: "email",           // email, url, date, time, color, etc.
  enum: ["small", "medium", "large"]  // Fixed choices
}
```

#### Number Validation

```javascript
{
  type: "number",
  minimum: 0,             // Minimum value
  maximum: 100,           // Maximum value
  multipleOf: 5           // Must be multiple of this
}
```

#### Required Fields

```javascript
{
  type: "object",
  required: ["email", "name"],  // Array of required property names
  properties: {
    email: { type: "string" },
    name: { type: "string" }
  }
}
```

### Nested Objects and Arrays

```javascript
{
  type: "object",
  properties: {
    // Nested object
    address: {
      type: "object",
      title: "Address",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        zip: { type: "string" }
      }
    },
    
    // Array of strings
    tags: {
      type: "array",
      title: "Tags",
      items: { type: "string" }
    },
    
    // Array of objects
    contacts: {
      type: "array",
      title: "Contacts",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          phone: { type: "string" }
        }
      }
    }
  }
}
```

---

## Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `jsonSchema` | Object | `undefined` | JSON Schema definition for the form |
| `uiSchema` | Object | `undefined` | UI customization schema |
| `options` | Object | `undefined` | Form behavior options |
| `values` | Object | `undefined` | Initial/current form values |
| `action` | String | `undefined` | Form action URL |
| `method` | String | `"post"` | Form method: `"get"`, `"post"`, or `"dialog"` |
| `disabled` | Boolean | `false` | Disable entire form |
| `hideActions` | Boolean | `false` | Hide default action buttons |
| `submitLabel` | String | `"Submit"` | Label for submit button |
| `resetLabel` | String | `"Reset"` | Label for reset button |
| `hideReset` | Boolean | `false` | Hide reset button |
| `hideSubmit` | Boolean | `false` | Hide submit button |

### Public Methods

```javascript
const form = document.querySelector('pds-jsonform');

// Define custom widget renderer
form.defineRenderer('my-widget', ({ id, value, set }) => {
  return html`<custom-input .value=${value} @change=${e => set(e.detail)}></custom-input>`;
});

// Set custom validator
form.useValidator(async (data, schema) => {
  // Return { valid: boolean, errors: [] }
  return { valid: true, errors: [] };
});

// Get form values as flat JSON Pointers
const flatValues = form.getValuesFlat();
// Returns: { "/name": "John", "/email": "john@example.com" }

// Serialize form
const { json, formData } = form.serialize();

// Programmatically submit
await form.submit();
```

---

## UI Schema Reference

The UI Schema allows you to customize widgets, layouts, and behavior per field using JSON Pointer paths.

### Widget Selection

Override the automatically selected widget:

```javascript
const uiSchema = {
  "/description": {
    "ui:widget": "textarea"      // Use textarea instead of text input
  },
  "/rating": {
    "ui:widget": "range"         // Use range slider for numbers
  },
  "/active": {
    "ui:widget": "toggle"        // Use toggle switch instead of checkbox
  },
  "/category": {
    "ui:widget": "radio"         // Use radio buttons instead of select
  }
};
```

#### Available Widgets

- **Text**: `input-text`, `textarea`, `input-password`, `input-email`, `input-url`
- **Date/Time**: `input-date`, `input-time`, `input-datetime`
- **Numbers**: `input-number`, `input-range`
- **Color**: `input-color`
- **Boolean**: `checkbox`, `toggle`
- **Choice**: `select`, `radio`, `checkbox-group`
- **PDS Components**: `upload`, `richtext`
- **Special**: `const` (read-only)

### Layout Options

Control how fieldsets are rendered:

```javascript
const uiSchema = {
  "/": {
    "ui:order": ["name", "email", "phone"]  // Control field order
  },
  
  "/address": {
    "ui:layout": "grid",                    // Use grid layout
    "ui:layoutOptions": {
      columns: 2,                           // 2-column grid
      gap: "lg"                             // Large gap between items
    }
  },
  
  "/settings": {
    "ui:layout": "flex",                    // Use flexbox
    "ui:layoutOptions": {
      wrap: true,                           // Allow wrapping
      gap: "md",                            // Medium gap
      direction: "row"                      // "row" or "column"
    }
  },
  
  "/advanced": {
    "ui:layout": "accordion",               // Render as accordion
    "ui:layoutOptions": {
      openFirst: true                       // First item open by default
    }
  },
  
  "/sections": {
    "ui:layout": "tabs"                     // Render as tabbed interface (uses pds-tabstrip)
  },
  
  "/profile": {
    "ui:surface": "card"                    // Wrap in card surface
  },
  
  "/wizard": {
    "ui:dialog": true,                      // Collect in dialog instead of inline
    "ui:dialogOptions": {
      buttonLabel: "Configure...",          // Button label
      dialogTitle: "Configuration",         // Dialog title
      icon: "gear"                          // Optional icon for button
    }
  }
};
```

### Field Customization

```javascript
const uiSchema = {
  "/name": {
    "ui:help": "Enter your full legal name",  // Help text (overrides description)
    "ui:placeholder": "John Doe",              // Placeholder (overrides examples)
    "ui:icon": "user",                         // Add icon (requires pds-icon)
    "ui:iconPosition": "start"                 // "start" or "end"
  },
  
  "/email": {
    "ui:icon": "envelope",
    "ui:autocomplete": "email"
  },
  
  "/city": {
    "ui:datalist": ["New York", "Los Angeles", "Chicago"]  // Autocomplete options
  },
  
  "/bio": {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 6                                   // Textarea rows
    }
  },
  
  "/volume": {
    "ui:widget": "input-range",                // Range slider
    "ui:options": {
      min: 0,
      max: 100
    }
  },
  
  "/country": {
    "ui:dropdown": true                        // Enhanced dropdown menu
  },
  
  "/password": {
    "ui:widget": "password",                   // Password input
    "ui:autocomplete": "new-password"          // Password autocomplete hint
  }
};
```

### Advanced Features

#### Conditional Fields (oneOf/anyOf)

```javascript
const schema = {
  type: "object",
  properties: {
    paymentMethod: {
      oneOf: [
        {
          title: "Credit Card",
          type: "object",
          properties: {
            cardNumber: { type: "string" },
            expiry: { type: "string" }
          }
        },
        {
          title: "PayPal",
          type: "object",
          properties: {
            email: { type: "string", format: "email" }
          }
        }
      ]
    }
  }
};
```

#### File Upload (pds-upload)

```javascript
const schema = {
  type: "object",
  properties: {
    avatar: {
      type: "string",
      title: "Profile Picture",
      description: "Upload your profile photo (JPG, PNG)",
      contentMediaType: "image/*",      // MIME type constraint
      contentEncoding: "base64"         // Encoding format
    }
  }
};

const uiSchema = {
  "/avatar": {
    "ui:options": {
      accept: "image/jpeg,image/png",  // File type filter
      maxSize: 5242880,                // 5MB in bytes
      multiple: false,                 // Single file
      label: "Choose photo"            // Upload button label
    }
  }
};
```

#### Rich Text Editor (pds-richtext)

```javascript
const schema = {
  type: "object",
  properties: {
    content: {
      type: "string",
      title: "Article Content",
      examples: ["Write your article..."]
    }
  }
};

const uiSchema = {
  "/content": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "standard",             // "minimal", "standard", or "full"
      submitOnEnter: false,
      spellcheck: true
    }
  }
};
```

---

## Options System

The options system provides global and per-path control over form behavior.

### Default Options

```javascript
{
  widgets: {
    booleans: "toggle",      // 'toggle' | 'checkbox'
    numbers: "input",        // 'input' | 'range'
    selects: "standard"      // 'standard' | 'dropdown'
  },
  layouts: {
    fieldsets: "default",    // 'default' | 'flex' | 'grid' | 'accordion' | 'tabs' | 'card'
    arrays: "default"        // 'default' | 'compact'
  },
  enhancements: {
    icons: true,             // Enable icon-enhanced inputs
    datalists: true,         // Enable datalist autocomplete
    rangeOutput: true        // Use .range-output for ranges
  },
  validation: {
    showErrors: true,        // Show validation errors inline
    validateOnChange: false  // Validate on every change vs on submit
  }
}
```

### Preset Integration

Options merge in this order: **Default Options** → **Preset Options** → **Instance Options**

```javascript
// In PDS config (affects all forms)
window.PDS.config = {
  form: {
    options: {
      widgets: {
        booleans: "checkbox"  // Override default to use checkboxes
      }
    }
  }
};

// Per-instance override
const myOptions = {
  widgets: {
    numbers: "range"          // All numbers become range sliders
  },
  enhancements: {
    rangeOutput: true         // Show value inline
  }
};

html`<pds-jsonform .jsonSchema=${schema} .options=${myOptions}></pds-jsonform>`;
```

### Path-Specific Options

You can specify options for specific paths (like uiSchema):

```javascript
const options = {
  // Global options
  widgets: {
    booleans: "toggle"
  },
  
  // Path-specific options
  "/address": {
    layout: "grid",
    columns: 2
  },
  "/settings/advanced": {
    layout: "accordion"
  }
};
```

---

## PDS Components Integration

### File Upload (pds-upload)

```javascript
const schema = {
  type: "object",
  properties: {
    profilePicture: {
      type: "string",
      title: "Profile Picture",
      description: "Upload your profile photo (JPG, PNG)",
      contentMediaType: "image/*",
      contentEncoding: "base64"
    },
    documents: {
      type: "string",
      title: "Documents",
      description: "Upload multiple files",
      contentMediaType: "application/pdf,image/*",
      contentEncoding: "base64"
    }
  }
};

const uiSchema = {
  "/profilePicture": {
    "ui:options": {
      accept: "image/jpeg,image/png",
      maxSize: 5242880,           // 5MB
      label: "Choose photo"
    }
  },
  "/documents": {
    "ui:options": {
      accept: "application/pdf,image/*",
      multiple: true,
      maxSize: 10485760,          // 10MB per file
      label: "Choose files"
    }
  }
};
```

The `pds-upload` component provides:
- Drag & drop support
- File type validation (via `accept` and `contentMediaType`)
- Size validation (via `maxSize`)
- Image previews
- Multiple file selection
- Base64 encoding for form submission

### Rich Text Editor (pds-richtext)

```javascript
const schema = {
  type: "object",
  properties: {
    bio: {
      type: "string",
      title: "Biography",
      description: "Tell us about yourself",
      examples: ["Write your biography..."]
    },
    coverLetter: {
      type: "string",
      title: "Cover Letter",
      examples: ["Write your cover letter..."]
    }
  }
};

const uiSchema = {
  "/bio": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "minimal"          // "minimal", "standard", "full"
    }
  },
  "/coverLetter": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "standard"
    }
  }
};
```

The `pds-richtext` component features:
- Slack-style contenteditable
- Markdown cleaning
- Configurable toolbar (minimal/standard/full)
- Paste as plain text
- Form integration with proper value binding

### Icon-Enhanced Inputs

Add icons to any input field:

```javascript
const uiSchema = {
  "/username": {
    "ui:icon": "user",
    "ui:iconPosition": "start"    // "start" (default) or "end"
  },
  "/search": {
    "ui:icon": "magnifying-glass",
    "ui:iconPosition": "end"
  },
  "/email": {
    "ui:icon": "envelope"
  }
};
```

Renders as:
```html
<div class="input-icon">
  <pds-icon icon="user"></pds-icon>
  <input type="text" />
</div>
```

---

## Layouts and Grouping

### Flex Layout

```javascript
const schema = {
  type: "object",
  properties: {
    contactInfo: {
      type: "object",
      title: "Contact Information",
      properties: {
        firstName: { type: "string", title: "First Name" },
        lastName: { type: "string", title: "Last Name" },
        email: { type: "string", format: "email" },
        phone: { type: "string", title: "Phone" }
      }
    }
  }
};

const uiSchema = {
  "/contactInfo": {
    "ui:layout": "flex",
    "ui:layoutOptions": {
      gap: "md",              // xs, sm, md, lg, xl
      wrap: true,             // Allow wrapping
      direction: "row"        // "row" (default) or "column"
    }
  }
};
```

### Grid Layout

```javascript
const schema = {
  type: "object",
  properties: {
    productInfo: {
      type: "object",
      title: "Product Information",
      properties: {
        name: { type: "string", title: "Product Name" },
        sku: { type: "string", title: "SKU" },
        price: { type: "number", title: "Price" },
        quantity: { type: "integer", title: "Quantity" },
        category: { type: "string", title: "Category" },
        brand: { type: "string", title: "Brand" }
      }
    }
  }
};

const uiSchema = {
  "/productInfo": {
    "ui:layout": "grid",
    "ui:layoutOptions": {
      columns: 3,             // Fixed columns: 1, 2, 3, 4, 6
      gap: "md"               // xs, sm, md, lg, xl
    }
  },
  
  // Responsive auto-sizing grid
  "/anotherSection": {
    "ui:layout": "grid",
    "ui:layoutOptions": {
      columns: "auto",        // Responsive auto-fit
      autoSize: "md",         // sm, md, lg, xl (min column width)
      gap: "md"
    }
  }
};
```

### Accordion

Collapsible sections with semantic `<details>` elements:

```javascript
const schema = {
  type: "object",
  properties: {
    name: { type: "string", title: "Full Name" },
    email: { type: "string", format: "email" },
    settings: {
      type: "object",
      title: "Settings",
      properties: {
        displaySettings: {
          type: "object",
          title: "Display Settings",
          properties: {
            theme: { type: "string", enum: ["Light", "Dark", "Auto"] },
            fontSize: { type: "number", title: "Font Size", minimum: 12, maximum: 24 }
          }
        },
        notificationSettings: {
          type: "object",
          title: "Notification Settings",
          properties: {
            email: { type: "boolean", title: "Email Notifications" },
            push: { type: "boolean", title: "Push Notifications" }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "/settings": {
    "ui:layout": "accordion"    // Nested objects become accordion sections
  }
};
```

### Tabs (pds-tabstrip)

Multi-page interface using `<pds-tabstrip>`:

```javascript
const schema = {
  type: "object",
  properties: {
    userSettings: {
      type: "object",
      title: "User Settings",
      properties: {
        account: {
          type: "object",
          title: "Account",
          properties: {
            username: { type: "string", title: "Username" },
            email: { type: "string", format: "email" }
          }
        },
        profile: {
          type: "object",
          title: "Profile",
          properties: {
            displayName: { type: "string", title: "Display Name" },
            bio: { type: "string", title: "Bio" }
          }
        },
        privacy: {
          type: "object",
          title: "Privacy",
          properties: {
            publicProfile: { type: "boolean", title: "Public Profile" },
            showEmail: { type: "boolean", title: "Show Email" }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "/userSettings": {
    "ui:layout": "tabs"         // Each nested object becomes a tab
  }
};
```

### Cards and Surfaces

Wrap fieldsets in styled containers using PDS surface tokens:

```javascript
const schema = {
  type: "object",
  properties: {
    cardGroups: {
      type: "object",
      title: "Products",
      properties: {
        product1: {
          type: "object",
          title: "Premium Membership",
          properties: {
            name: { type: "string", title: "Product Name" },
            price: { type: "number", title: "Price" }
          }
        },
        product2: {
          type: "object",
          title: "Enterprise Solution",
          properties: {
            name: { type: "string", title: "Product Name" },
            seats: { type: "integer", title: "Seats" }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "/cardGroups": {
    "ui:layout": "grid",
    "ui:layoutOptions": {
      columns: "auto",
      autoSize: "md",
      gap: "md"
    }
  },
  "/cardGroups/product1": {
    "ui:surface": "surface-sunken"    // Surface token from PDS
  },
  "/cardGroups/product2": {
    "ui:surface": "surface-inverse"   // Other options: "card", "elevated"
  }
};
```

---

## Dialog Forms

Collect complex nested data in a modal dialog:

```javascript
const schema = {
  type: "object",
  properties: {
    shippingAddress: {
      type: "object",
      title: "Shipping Address",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        zip: { type: "string" }
      }
    }
  }
};

const uiSchema = {
  "/shippingAddress": {
    "ui:dialog": true,
    "ui:dialogButton": "Edit Shipping Address",
    "ui:dialogSize": "lg",              // sm, lg, xl, full
    "ui:submitLabel": "Save Address",
    "ui:cancelLabel": "Cancel"
  }
};
```

This renders an "Edit Shipping Address" button. Clicking it opens a dialog with the nested form. Values are stored in a hidden input and synced when the dialog is submitted.

**Events:**
- `pw:dialog-open` - Fired when dialog opens
- `pw:dialog-submit` - Fired when dialog form is submitted

---

## Custom Renderers

Define custom widgets for complete control:

```javascript
const form = document.querySelector('pds-jsonform');

form.defineRenderer('color-picker', ({ id, value, set, ui }) => {
  return html`
    <div class="color-picker">
      <input type="color" .value=${value} @input=${e => set(e.target.value)} />
      <input type="text" .value=${value} @input=${e => set(e.target.value)} />
    </div>
  `;
});

// Use in uiSchema
const uiSchema = {
  "/themeColor": {
    "ui:widget": "color-picker"
  }
};
```

**Renderer Parameters:**

```typescript
{
  id: string,           // Unique field ID
  path: string,         // JSON Pointer path
  label: string,        // Field label
  value: any,           // Current value
  required: boolean,    // Is field required
  ui: object,           // UI schema for this field
  schema: object,       // JSON Schema for this field
  get: (path?) => any,  // Get value at path
  set: (val, path?) => void,  // Set value at path
  attrs: object,        // Native HTML attributes (min, max, pattern, etc.)
  host: SchemaForm      // Form component instance
}
```

---

## Event Hooks

`pds-jsonform` emits events throughout the form lifecycle:

### Compilation Events

```javascript
form.addEventListener('pw:schema-resolve', (e) => {
  // Modify schema before compilation
  e.detail.schema.properties.newField = { type: "string" };
  e.preventDefault();  // Use modified schema
});

form.addEventListener('pw:compile-node', (e) => {
  // Override node compilation
  if (e.detail.path === '/special') {
    e.detail.node = { kind: 'custom', ... };
    e.preventDefault();
  }
});

form.addEventListener('pw:choose-widget', (e) => {
  // Override widget selection
  if (e.detail.schema.format === 'phone') {
    e.detail.widget = 'phone-input';
    e.preventDefault();
  }
});
```

### Render Events

```javascript
form.addEventListener('pw:before-render-field', (e) => {
  // Override field rendering completely
  if (e.detail.path === '/customField') {
    e.detail.render = () => html`<custom-field></custom-field>`;
    e.preventDefault();
  }
});

form.addEventListener('pw:render-field', (e) => {
  // Modify rendered field (read-only, non-cancelable)
  console.log('Field rendered:', e.detail.path);
});

form.addEventListener('pw:after-render-field', (e) => {
  // Post-render hook (after DOM update)
  const field = document.querySelector(`[data-path="${e.detail.path}"]`);
  // Add custom behavior
});
```

### Value Events

```javascript
form.addEventListener('pw:value-change', (e) => {
  console.log('Value changed:', e.detail.name, e.detail.value);
  console.log('Valid:', e.detail.validity.valid);
});

form.addEventListener('pw:array-add', (e) => {
  console.log('Array item added at:', e.detail.path);
});

form.addEventListener('pw:array-remove', (e) => {
  console.log('Array item removed:', e.detail.path, e.detail.index);
});

form.addEventListener('pw:array-reorder', (e) => {
  console.log('Array reordered:', e.detail.from, e.detail.to);
});
```

### Submit Events

```javascript
form.addEventListener('pw:serialize', (e) => {
  // Modify serialization
  e.detail.json.timestamp = Date.now();
  e.preventDefault();  // Use modified data
});

form.addEventListener('pw:submit', (e) => {
  console.log('Form submitted:', e.detail);
  if (e.detail.valid) {
    console.log('JSON:', e.detail.json);
    console.log('FormData:', e.detail.formData);
  } else {
    console.log('Validation issues:', e.detail.issues);
  }
});
```

### Dialog Events

```javascript
form.addEventListener('pw:dialog-open', (e) => {
  console.log('Dialog opened for:', e.detail.path);
});

form.addEventListener('pw:dialog-submit', (e) => {
  console.log('Dialog submitted:', e.detail.path, e.detail.value);
});
```

---

## Advanced Examples

### Complete Registration Form

```javascript
const schema = {
  type: "object",
  title: "User Registration",
  required: ["email", "password", "terms"],
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email Address"
    },
    password: {
      type: "string",
      format: "password",
      title: "Password",
      minLength: 8
    },
    profile: {
      type: "object",
      title: "Profile Information",
      properties: {
        firstName: { type: "string", title: "First Name" },
        lastName: { type: "string", title: "Last Name" },
        avatar: { type: "string", format: "upload", title: "Avatar" },
        bio: { type: "string", title: "Bio" }
      }
    },
    preferences: {
      type: "object",
      title: "Preferences",
      properties: {
        theme: {
          type: "string",
          enum: ["light", "dark", "auto"],
          default: "auto"
        },
        notifications: {
          type: "boolean",
          title: "Enable notifications",
          default: true
        },
        newsletter: {
          type: "boolean",
          title: "Subscribe to newsletter",
          default: false
        }
      }
    },
    terms: {
      type: "boolean",
      title: "I agree to the Terms of Service",
      const: true
    }
  }
};

const uiSchema = {
  "/email": {
    "ui:icon": "envelope",
    "ui:autocomplete": "email"
  },
  "/password": {
    "ui:icon": "lock",
    "ui:autocomplete": "new-password"
  },
  "/profile": {
    "ui:layout": "grid",
    "ui:columns": 2,
    "ui:surface": "card"
  },
  "/profile/avatar": {
    "ui:accept": "image/*",
    "ui:maxSize": 2000000
  },
  "/profile/bio": {
    "ui:widget": "textarea",
    "ui:rows": 4
  },
  "/preferences": {
    "ui:accordion": true
  },
  "/preferences/theme": {
    "ui:widget": "radio"
  }
};

const options = {
  widgets: {
    booleans: "toggle"
  }
};

html`
  <pds-jsonform
    .jsonSchema=${schema}
    .uiSchema=${uiSchema}
    .options=${options}
    submit-label="Create Account"
    @pw:submit=${handleSubmit}
  ></pds-jsonform>
`;
```

### Multi-Step Wizard with Tabs

```javascript
const schema = {
  type: "object",
  title: "Project Setup Wizard",
  properties: {
    wizard: {
      type: "object",
      title: "Setup",
      properties: {
        step1: {
          type: "object",
          title: "Basic Info",
          required: ["projectName"],
          properties: {
            projectName: { type: "string", title: "Project Name" },
            description: { type: "string", title: "Description" }
          }
        },
        step2: {
          type: "object",
          title: "Configuration",
          properties: {
            framework: {
              type: "string",
              enum: ["React", "Vue", "Angular"],
              title: "Framework"
            },
            features: {
              type: "array",
              title: "Features",
              items: {
                type: "string",
                enum: ["TypeScript", "Testing", "CI/CD"]
              }
            }
          }
        },
        step3: {
          type: "object",
          title: "Review",
          properties: {
            confirm: {
              type: "boolean",
              title: "Create project with these settings"
            }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "/wizard": {
    "ui:tabs": true
  },
  "/wizard/step2/features": {
    "ui:widget": "checkbox-group"
  }
};
```

### Dynamic Form with Conditional Fields

```javascript
const schema = {
  type: "object",
  properties: {
    accountType: {
      oneOf: [
        {
          title: "Personal",
          type: "object",
          properties: {
            name: { type: "string", title: "Full Name" },
            birthdate: { type: "string", format: "date" }
          }
        },
        {
          title: "Business",
          type: "object",
          properties: {
            companyName: { type: "string", title: "Company Name" },
            taxId: { type: "string", title: "Tax ID" },
            employees: { type: "integer", title: "Number of Employees" }
          }
        }
      ]
    }
  }
};
```

### Form with Custom Validation

```javascript
const form = document.querySelector('pds-jsonform');

form.useValidator(async (data, schema) => {
  const errors = [];
  
  // Custom validation logic
  if (data.password && data.password.length < 8) {
    errors.push({
      path: '/password',
      message: 'Password must be at least 8 characters'
    });
  }
  
  if (data.email && !data.email.includes('@')) {
    errors.push({
      path: '/email',
      message: 'Invalid email format'
    });
  }
  
  // Async validation (e.g., check username availability)
  if (data.username) {
    const available = await checkUsernameAvailability(data.username);
    if (!available) {
      errors.push({
        path: '/username',
        message: 'Username already taken'
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
});
```

---

## Tips and Best Practices

1. **Use JSON Pointer paths** - All uiSchema and path-specific options use JSON Pointer format (`"/property/nested"`)

2. **Leverage defaults** - Set sensible defaults in schema using the `default` keyword

3. **Progressive enhancement** - Forms work without JavaScript, enhanced when available

4. **Accessibility first** - All generated forms include proper ARIA attributes and semantic HTML

5. **Light DOM** - The component uses light DOM, so all PDS styles apply automatically

6. **Event-driven** - Use events for validation, transformation, and side effects

7. **Custom renderers** - For complete control, define custom renderers for specific widget types

8. **Options hierarchy** - Remember: Default → Preset → Instance → uiSchema (most specific wins)

9. **Path-based customization** - Use path-specific options for complex forms with varying needs

10. **Test with real schemas** - Validate your schemas at [jsonschemavalidator.net](https://www.jsonschemavalidator.net/)

---

## Browser Support

- Modern browsers with ES6+ support
- Custom Elements v1
- Shadow DOM v1 (for PDS components)
- Lit library required

## License

Part of the Pure Design System (PDS)

---

For more examples and live demos, see the [PDS Storybook](../../packages/pds-storybook).
