# pds-form Documentation

A powerful, extensible JSON Schema form generator for the Pure Design System (PDS). Automatically generates accessible, styled forms from JSON Schema with extensive customization through UI schemas and options.

## Overview

`pds-form` transforms JSON Schema definitions into fully-styled, validated forms with zero boilerplate. It leverages JSON Schema for validation and structure, while providing extensive UI customization through UI schemas.

### Key Features

- 🎯 **Zero Boilerplate** - Define form structure once in JSON Schema
- ✅ **Built-in Validation** - Automatic validation based on schema (required, min/max, patterns, formats)
- 🔄 **Two-Way Data Binding** - Reactive form state management
- 🎨 **PDS Styled** - Uses all PDS design tokens automatically
- 📱 **Responsive Layouts** - Flex, Grid, Accordion, Tabs out of the box
- 🔧 **Extensible** - Custom widgets, validators, and renderers
- 🌐 **Nested Objects** - Support for complex nested data structures
- 🎭 **Dialog Forms** - Edit complex nested objects in modal dialogs
- 📝 **Rich Components** - File upload (pds-upload), Rich text (pds-richtext)
- 🎚️ **Range Sliders** - With live value output display
- 🔘 **Toggle Switches** - Modern toggle UI for boolean fields
- 🔍 **Datalist Autocomplete** - Native browser autocomplete for text inputs
- 🎨 **Icon-Enhanced Inputs** - Add icons to inputs for better UX
- 🃏 **Surface Wrapping** - Wrap sections in cards, elevated surfaces, etc.
- ♿ **Accessible** - Proper ARIA attributes and semantic HTML

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
- [Conditional Logic (Interactions)](#conditional-logic-interactions)
  - [Show/Hide Fields](#showhide-fields-uivisiblewhen)
  - [Disable Fields](#disable-fields-uidisabledwhen)
  - [Conditional Required](#conditional-required-uirequiredwhen)
  - [Calculated Values](#calculated-values-uicalculate)
  - [Condition Operators](#condition-operators)
- [Custom Content Injection](#custom-content-injection)
  - [Content Before/After Fields](#content-beforeafter-fields-uibefore-uiafter)
  - [Slot References](#slot-references)
  - [Custom Field Rendering](#custom-field-rendering-uirender)
  - [Custom Field Wrapper](#custom-field-wrapper-uiwrapper)
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
import '/assets/pds/components/pds-form.js';

const schema = {
  type: "object",
  title: "User Profile",
  required: ["email", "name"],
  properties: {
    name: {
      type: "string",
      title: "Full Name",
      minLength: 2,
      examples: ["John Doe"]
    },
    email: {
      type: "string",
      format: "email",
      title: "Email Address",
      examples: ["john.doe@example.com"]
    },
    age: {
      type: "integer",
      minimum: 18,
      maximum: 120,
      examples: [25]
    },
    newsletter: {
      type: "boolean",
      title: "Subscribe to newsletter",
      default: false
    }
  }
};

const template = html`
  <pds-form
    .jsonSchema=${schema}
    @pw:submit=${(e) => {
      console.log('Form submitted:', e.detail);
      if (e.detail.valid) {
        console.log('Data:', e.detail.json);
      }
    }}
  ></pds-form>
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
    import '/assets/pds/components/pds-form.js';
    
    const schema = {
      type: "object",
      title: "Contact Form",
      properties: {
        name: { 
          type: "string", 
          title: "Name",
          examples: ["Your name"]
        },
        email: { 
          type: "string", 
          format: "email",
          examples: ["you@example.com"]
        },
        message: { 
          type: "string", 
          title: "Message",
          examples: ["Your message here..."]
        }
      }
    };
    
    const form = document.createElement('pds-form');
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

`pds-form` uses [JSON Schema](https://json-schema.org/) to define form structure and validation.

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
  enum: ["small", "medium", "large"]  // Fixed choices (simple values)
}
```

#### Selection Fields with Custom Labels

For selection fields where you want different display labels than the stored values, use `oneOf` or `anyOf` with `const` and `title`:

```javascript
{
  type: "string",
  title: "Language",
  oneOf: [
    { const: "en", title: "English" },
    { const: "es", title: "Spanish" },
    { const: "fr", title: "French" },
    { const: "de", title: "German" }
  ]
}
```

This generates a select/radio field that displays "English" but stores "en" when selected. Works with:
- Select dropdowns (>5 options)
- Radio buttons (≤5 options)  
- Checkbox groups (when used with array type)

You can also use `anyOf` instead of `oneOf` - both work identically for this purpose:

```javascript
{
  type: "string",
  title: "Priority",
  anyOf: [
    { const: "p1", title: "🔴 Critical" },
    { const: "p2", title: "🟠 High" },
    { const: "p3", title: "🟡 Medium" },
    { const: "p4", title: "🟢 Low" }
  ]
}
```

For checkbox groups (multi-select), use with array type:

```javascript
{
  type: "array",
  title: "Interests",
  items: {
    type: "string",
    oneOf: [
      { const: "dev", title: "Development" },
      { const: "design", title: "Design" },
      { const: "pm", title: "Project Management" }
    ]
  },
  uniqueItems: true
}
```

#### Number Validation

```javascript
{
  type: "number",
  title: "Age",
  examples: [25],         // Placeholder value (first example used)
  minimum: 0,             // Minimum value
  maximum: 100,           // Maximum value
  multipleOf: 5,          // Must be multiple of this
  default: 18             // Default/initial value
}
```

#### Required Fields

```javascript
{
  type: "object",
  required: ["email", "name"],  // Array of required property names
  properties: {
    email: { 
      type: "string",
      examples: ["user@example.com"]  // Used as placeholder
    },
    name: { 
      type: "string",
      examples: ["John Doe"]
    }
  }
}
```

#### Using Examples for Placeholders

The `examples` array (from JSON Schema) is used to populate placeholders automatically:

```javascript
{
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Username",
      examples: ["john_doe123"]    // First example becomes placeholder
    },
    email: {
      type: "string",
      format: "email",
      examples: ["john@example.com", "jane@example.com"]  // Only first is used
    },
    age: {
      type: "number",
      examples: [25]               // Works for numbers too
    }
  }
}
```

You can override placeholders in uiSchema:

```javascript
const uiSchema = {
  "/username": {
    "ui:placeholder": "Choose a unique username"  // Overrides examples
  }
};
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
const form = document.querySelector('pds-form');

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

- **Text**: `input-text`, `textarea`, `password`, `input-email`, `input-url`
- **Date/Time**: `input-date`, `input-time`, `input-datetime`
- **Numbers**: `input-number`, `input-range`
- **Color**: `input-color`
- **Boolean**: `checkbox`, `toggle`
- **Choice**: `select`, `radio`, `checkbox-group`
- **PDS Components**: `upload`, `richtext`
- **Special**: `const` (read-only)

#### Widget Options

Many widgets accept additional configuration via `ui:options`:

```javascript
const uiSchema = {
  "/bio": {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 6,                      // Textarea rows
      cols: 50                      // Textarea columns
    }
  },
  "/volume": {
    "ui:widget": "input-range",
    "ui:options": {
      min: 0,
      max: 100,
      step: 5
    }
  },
  "/avatar": {
    "ui:widget": "upload",
    "ui:options": {
      accept: "image/*",
      maxSize: 5242880,            // 5MB
      multiple: false,
      label: "Choose photo"
    }
  },
  "/description": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "standard",         // "minimal", "standard", "full"
      spellcheck: true
    }
  }
};
```

### Layout Options

Control how fieldsets are rendered:

#### Root-Level Layout

Apply layout to the **entire form** without modifying JSON Schema. Place `ui:layout` and `ui:layoutOptions` at the root level of your uiSchema:

```javascript
// Apply 2-column grid to entire form
const uiSchema = {
  "ui:layout": "grid",
  "ui:layoutOptions": {
    columns: 2,
    gap: "md"
  }
};
```

You can combine root-level layout with field-specific options:

```javascript
const uiSchema = {
  // Root form layout
  "ui:layout": "grid",
  "ui:layoutOptions": {
    columns: 2,
    gap: "md"
  },
  // Field-specific options
  "/email": {
    "ui:icon": "envelope",
    "ui:help": "We will never share your email"
  },
  "/bio": {
    "ui:widget": "textarea",
    "ui:class": "grid-col-span-2"           // Span full width
  }
};
```

#### Path-Based Layout

Target specific nested objects with layout options:

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
      spellcheck: true,
      format: "html"
    }
  }
};
```

> ℹ️ The rich text widget prefers a `#showdown` import map binding. Add something like `"#showdown": "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.mjs"` in an import map to avoid loading from the fallback CDN.

To have the submitted value stay as Markdown, set `format` to `"markdown"`:
```json
{
  "ui:widget": "richtext",
  "ui:options": {
    "format": "markdown"
  }
}
```

---

## Conditional Logic (Interactions)

`pds-form` supports XForms-inspired declarative interactions for showing/hiding fields, enabling/disabling inputs, conditional requirements, and computed values—all defined in the uiSchema.

### Show/Hide Fields (`ui:visibleWhen`)

Conditionally show a field based on other field values:

```javascript
const uiSchema = {
  // Show "Other" text field only when category is "other"
  "/otherCategory": {
    "ui:visibleWhen": { "/category": "other" }
  },
  
  // Show shipping address only when "different address" is checked
  "/shippingAddress": {
    "ui:visibleWhen": { "/useDifferentAddress": true }
  }
};
```

### Disable Fields (`ui:disabledWhen`)

Conditionally disable a field:

```javascript
const uiSchema = {
  // Disable email field when "use phone instead" is checked
  "/email": {
    "ui:disabledWhen": { "/usePhoneInstead": true }
  },
  
  // Disable submit fields until terms accepted
  "/promoCode": {
    "ui:disabledWhen": { "/termsAccepted": { "$ne": true } }
  }
};
```

### Conditional Required (`ui:requiredWhen`)

Make a field required based on conditions:

```javascript
const uiSchema = {
  // Require company name when account type is "business"
  "/companyName": {
    "ui:requiredWhen": { "/accountType": "business" }
  },
  
  // Require phone when email is empty
  "/phone": {
    "ui:requiredWhen": { "/email": { "$eq": "" } }
  }
};
```

### Calculated Values (`ui:calculate`)

Compute field values from other fields. Calculated fields are **read-only by default**.

```javascript
const uiSchema = {
  // Full name from first + last
  "/fullName": {
    "ui:calculate": { "$concat": ["/firstName", " ", "/lastName"] }
  },
  
  // Total price = quantity × unit price
  "/totalPrice": {
    "ui:calculate": { "$multiply": ["/quantity", "/unitPrice"] }
  },
  
  // Allow user to override calculated value
  "/estimatedDelivery": {
    "ui:calculate": { "$concat": ["/city", " - 3-5 days"] },
    "ui:calculateOverride": true
  }
};
```

### Condition Operators

#### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| (none) | Equals (shorthand) | `{ "/field": "value" }` |
| `$eq` | Equals | `{ "/field": { "$eq": "value" } }` |
| `$ne` | Not equals | `{ "/field": { "$ne": "value" } }` |
| `$gt` | Greater than | `{ "/age": { "$gt": 18 } }` |
| `$gte` | Greater than or equal | `{ "/age": { "$gte": 18 } }` |
| `$lt` | Less than | `{ "/quantity": { "$lt": 100 } }` |
| `$lte` | Less than or equal | `{ "/quantity": { "$lte": 100 } }` |
| `$in` | Value in array | `{ "/status": { "$in": ["active", "pending"] } }` |
| `$nin` | Value not in array | `{ "/role": { "$nin": ["guest", "banned"] } }` |
| `$exists` | Field has value | `{ "/optionalField": { "$exists": true } }` |
| `$regex` | Regex match | `{ "/email": { "$regex": "@company\\.com$" } }` |

#### Logical Operators

Combine conditions with `$and`, `$or`, `$not`:

```javascript
const uiSchema = {
  // Show only for premium users in US
  "/premiumFeature": {
    "ui:visibleWhen": {
      "$and": [
        { "/isPremium": true },
        { "/country": "US" }
      ]
    }
  },
  
  // Show for either admin or moderator
  "/modTools": {
    "ui:visibleWhen": {
      "$or": [
        { "/role": "admin" },
        { "/role": "moderator" }
      ]
    }
  },
  
  // Hide for guests
  "/dashboard": {
    "ui:visibleWhen": {
      "$not": { "/role": "guest" }
    }
  }
};
```

### Calculation Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `$concat` | Join strings | `{ "$concat": ["/first", " ", "/last"] }` |
| `$sum` | Add numbers | `{ "$sum": ["/a", "/b", "/c"] }` |
| `$subtract` | Subtract | `{ "$subtract": ["/total", "/discount"] }` |
| `$multiply` | Multiply | `{ "$multiply": ["/qty", "/price"] }` |
| `$divide` | Divide | `{ "$divide": ["/total", "/count"] }` |
| `$if` | Conditional | `{ "$if": { "cond": {...}, "then": expr, "else": expr } }` |
| `$coalesce` | First non-empty | `{ "$coalesce": ["/nickname", "/firstName"] }` |

#### Conditional Calculations

```javascript
const uiSchema = {
  // Apply discount based on member status
  "/finalPrice": {
    "ui:calculate": {
      "$if": {
        "cond": { "/isMember": true },
        "then": { "$multiply": ["/subtotal", 0.9] },
        "else": "/subtotal"
      }
    }
  }
};
```

### Complete Example

```javascript
const schema = {
  type: "object",
  properties: {
    orderType: { 
      type: "string", 
      enum: ["standard", "express", "pickup"],
      title: "Order Type"
    },
    quantity: { type: "integer", minimum: 1, title: "Quantity" },
    unitPrice: { type: "number", title: "Unit Price" },
    subtotal: { type: "number", title: "Subtotal" },
    shippingCost: { type: "number", title: "Shipping" },
    total: { type: "number", title: "Total" },
    shippingAddress: {
      type: "object",
      title: "Shipping Address",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        zip: { type: "string" }
      }
    }
  }
};

const uiSchema = {
  // Calculate subtotal
  "/subtotal": {
    "ui:calculate": { "$multiply": ["/quantity", "/unitPrice"] }
  },
  
  // Shipping cost depends on order type
  "/shippingCost": {
    "ui:calculate": {
      "$if": {
        "cond": { "/orderType": "express" },
        "then": 25,
        "else": {
          "$if": {
            "cond": { "/orderType": "pickup" },
            "then": 0,
            "else": 10
          }
        }
      }
    }
  },
  
  // Calculate total
  "/total": {
    "ui:calculate": { "$sum": ["/subtotal", "/shippingCost"] }
  },
  
  // Hide shipping address for pickup orders
  "/shippingAddress": {
    "ui:visibleWhen": { "/orderType": { "$ne": "pickup" } }
  },
  
  // Require address fields when visible
  "/shippingAddress/street": {
    "ui:requiredWhen": { "/orderType": { "$ne": "pickup" } }
  },
  "/shippingAddress/city": {
    "ui:requiredWhen": { "/orderType": { "$ne": "pickup" } }
  },
  "/shippingAddress/zip": {
    "ui:requiredWhen": { "/orderType": { "$ne": "pickup" } }
  }
};
```

---

## Custom Content Injection

Inject custom HTML content before/after fields, create fully custom field renderers, or customize how fields are wrapped—all through uiSchema.

### Content Before/After Fields (`ui:before`, `ui:after`)

Add custom content around any field or fieldset:

```javascript
const uiSchema = {
  // Add a header section before the username field
  "/username": {
    "ui:before": (field) => html`
      <div class="alert alert-info">
        <strong>Account Details</strong>
        <p>Choose a unique username.</p>
      </div>
    `
  },
  
  // Show validation feedback after email
  "/email": {
    "ui:after": (field) => {
      if (!field.value) return nothing;
      const isValid = field.value.includes('@');
      return html`<div class="text-sm text-${isValid ? 'success' : 'danger'}">
        ${isValid ? '✓ Valid email' : '✗ Invalid email'}
      </div>`;
    }
  },
  
  // Use a slot reference for HTML defined in markup
  "/interests": {
    "ui:before": "slot:interests-header"
  }
};
```

#### Value Types

| Type | Description | Example |
|------|-------------|---------|
| Function | Called with field context | `(field) => html\`...\`` |
| Slot reference | Renders slotted element | `"slot:myHeader"` |

#### Field Context

Functions receive a `field` object with the full render context:

```javascript
{
  id,      // Unique DOM ID
  path,    // JSON Pointer path (e.g., "/address/city")
  label,   // Display label
  value,   // Current field value
  schema,  // JSON Schema for this field
  ui,      // UI schema for this path
  attrs,   // Native constraint attributes
  get,     // Get value at path: field.get("/otherField")
  set,     // Set value: field.set(newValue)
  host     // Reference to pds-form element
}
```

### Slot References

Define content in HTML and reference it in uiSchema:

```html
<pds-form .jsonSchema=${schema} .uiSchema=${uiSchema}>
  <div slot="welcome-header" class="alert alert-success">
    <strong>Welcome!</strong> Fill out the form below.
  </div>
  
  <p slot="terms-footer" class="text-sm text-muted">
    By submitting, you agree to our <a href="#">Terms</a>.
  </p>
</pds-form>
```

```javascript
const uiSchema = {
  "/firstName": { "ui:before": "slot:welcome-header" },
  "/acceptTerms": { "ui:after": "slot:terms-footer" }
};
```

### Custom Field Rendering (`ui:render`)

Completely replace a field's rendering with a custom template:

```javascript
const uiSchema = {
  // Custom star rating widget
  "/rating": {
    "ui:render": (field) => {
      const stars = [1, 2, 3, 4, 5];
      return html`
        <fieldset data-path=${field.path}>
          <legend>${field.label}</legend>
          <div class="flex gap-xs">
            ${stars.map(star => html`
              <button 
                type="button"
                class="btn btn-sm ${star <= field.value ? 'btn-warning' : 'btn-outline'}"
                @click=${() => field.set(star)}
              >★</button>
            `)}
          </div>
          <input type="hidden" name=${field.path} .value=${String(field.value || '')} />
        </fieldset>
      `;
    }
  },
  
  // Custom toggle card
  "/subscribe": {
    "ui:render": (field) => html`
      <div 
        class="card p-md cursor-pointer"
        @click=${() => field.set(!field.value)}
        role="checkbox"
        aria-checked=${!!field.value}
      >
        <pds-icon icon=${field.value ? 'check-circle' : 'circle'}></pds-icon>
        <span>${field.label}</span>
      </div>
    `
  }
};
```

`ui:render` receives the same context as `defineRenderer()` but is defined inline in the uiSchema.

### Custom Field Wrapper (`ui:wrapper`)

Customize how a field is wrapped (replaces the default `<label>` structure):

```javascript
const uiSchema = {
  // Colored border accent
  "/email": {
    "ui:wrapper": (field) => html`
      <div style="border-left: 3px solid var(--color-primary-500); padding-left: var(--spacing-sm);">
        <label for=${field.id}>
          <span data-label>${field.label}</span>
          ${field.control}
          ${field.help}
        </label>
      </div>
    `
  },
  
  // Card wrapper
  "/message": {
    "ui:widget": "textarea",
    "ui:wrapper": (field) => html`
      <div class="card surface p-md">
        <label for=${field.id}>
          <span class="font-semibold">${field.label}</span>
          ${field.control}
          ${field.help}
        </label>
      </div>
    `
  }
};
```

#### Wrapper Context

The wrapper function receives a `field` object with:

| Property | Description |
|----------|-------------|
| `control` | The rendered input/widget template |
| `label` | The label text (string) |
| `help` | The rendered help text, or `nothing` |
| `id` | DOM ID for the field |
| ...context | All other render context properties |

### Combining Features

All custom content features can be combined:

```javascript
const uiSchema = {
  "/rating": {
    // Custom renderer with before/after content
    "ui:render": (field) => html`...`,
    "ui:before": (field) => html`<p class="text-muted">Rate your experience:</p>`,
    "ui:after": (field) => field.value >= 4 
      ? html`<p class="text-success">Thanks for the great rating!</p>` 
      : nothing
  },
  
  "/email": {
    // Custom wrapper with after content
    "ui:wrapper": (field) => html`
      <div style="border-left: 3px solid var(--color-info-500); padding-left: var(--spacing-sm);">
        <label for=${field.id}><span>${field.label}</span>${field.control}</label>
      </div>
    `,
    "ui:after": (field) => field.value && !field.value.includes('@')
      ? html`<div class="text-danger">Invalid email</div>`
      : nothing
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
    booleans: "toggle",      // 'toggle' | 'toggle-with-icons' | 'checkbox' - default widget for boolean fields
    numbers: "input",        // 'input' | 'range' - default widget for number fields
    selects: "standard"      // 'standard' | 'dropdown' - default widget for enum fields
  },
  layouts: {
    fieldsets: "default",    // Default layout for nested objects
    arrays: "default"        // Default layout for array fields
  },
  enhancements: {
    icons: true,             // Enable icon-enhanced inputs (requires pds-icon)
    datalists: true,         // Enable datalist autocomplete
    rangeOutput: true        // Add live value display for range sliders
  },
  validation: {
    showErrors: true,        // Show validation errors inline
    validateOnChange: false  // Validate on every change vs on submit only
  }
}
```

**Enhancement Details:**

- **rangeOutput**: When enabled, range sliders display their current value inline using the `.range-output` pattern from PDS
- **icons**: Automatically adds icons to inputs when `ui:icon` is specified in uiSchema
- **datalists**: Enables browser-native autocomplete when `ui:datalist` is specified

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

html`<pds-form .jsonSchema=${schema} .options=${myOptions}></pds-form>`;
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

**JSON Schema Properties for File Upload:**
- `contentMediaType`: MIME type constraint (e.g., `"image/*"`, `"application/pdf"`)
- `contentEncoding`: Encoding format (typically `"base64"`)
- `type`: Must be `"string"` (files are encoded as base64 strings)

**UI Schema Options:**
- `accept`: File type filter for file picker dialog
- `maxSize`: Maximum file size in bytes
- `multiple`: Allow multiple file selection
- `label`: Custom button label

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
      toolbar: "minimal",          // "minimal", "standard", "full"
      format: "html"
    }
  },
  "/coverLetter": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "standard",
      format: "markdown"
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
- Supports HTML or Markdown submission depending on `format`

### Icon-Enhanced Inputs

Add icons to any input field for better visual clarity:

```javascript
const schema = {
  type: "object",
  properties: {
    username: { type: "string", title: "Username" },
    email: { type: "string", format: "email", title: "Email" },
    password: { type: "string", title: "Password" },
    website: { type: "string", format: "uri", title: "Website" },
    phone: { type: "string", title: "Phone" },
    location: { type: "string", title: "Location" }
  }
};

const uiSchema = {
  "/username": {
    "ui:icon": "user",
    "ui:iconPosition": "start"    // "start" (default) or "end"
  },
  "/email": {
    "ui:icon": "envelope",
    "ui:iconPosition": "start"
  },
  "/password": {
    "ui:icon": "lock",
    "ui:iconPosition": "start",
    "ui:widget": "password"
  },
  "/website": {
    "ui:icon": "globe",
    "ui:iconPosition": "start"
  },
  "/phone": {
    "ui:icon": "phone",
    "ui:iconPosition": "start"
  },
  "/location": {
    "ui:icon": "map-pin",
    "ui:iconPosition": "start"
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

**Available for:** All text-based inputs including email, url, password, search, tel, etc.

### Toggle Switches vs Checkboxes

Configure boolean field rendering globally or per-field:

```javascript
const schema = {
  type: "object",
  properties: {
    toggles: {
      type: "object",
      title: "Preferences",
      properties: {
        emailNotifications: {
          type: "boolean",
          title: "Email Notifications",
          description: "Receive notifications via email"
        },
        pushNotifications: {
          type: "boolean",
          title: "Push Notifications"
        },
        darkMode: {
          type: "boolean",
          title: "Dark Mode"
        }
      }
    }
  }
};

// Option 1: Global setting for all booleans
const options = {
  widgets: {
    booleans: "toggle"    // 'toggle' (plain) | 'toggle-with-icons' (with checkmark/cross icons) | 'checkbox'
  }
};

// Option 2: Per-field override in uiSchema
const uiSchema = {
  "/emailNotifications": {
    "ui:widget": "toggle"
  }
};
```

### Range Sliders with Live Output

Enable live value display for range inputs:

```javascript
const schema = {
  type: "object",
  properties: {
    volume: {
      type: "number",
      title: "Volume",
      minimum: 0,
      maximum: 100,
      default: 50
    },
    brightness: {
      type: "number",
      title: "Brightness",
      minimum: 0,
      maximum: 100,
      default: 75
    }
  }
};

const uiSchema = {
  "/volume": { "ui:widget": "input-range" },
  "/brightness": { "ui:widget": "input-range" }
};

const options = {
  enhancements: {
    rangeOutput: true    // Add live value display next to slider
  }
};
```

### Datalist Autocomplete

Provide autocomplete suggestions for text inputs:

```javascript
const schema = {
  type: "object",
  properties: {
    country: { type: "string", title: "Country" },
    city: { type: "string", title: "City" },
    skillset: { type: "string", title: "Primary Skill" }
  }
};

const uiSchema = {
  "/country": {
    "ui:datalist": [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France"
    ]
  },
  "/city": {
    "ui:datalist": ["New York", "London", "Tokyo", "Paris", "Berlin"]
  },
  "/skillset": {
    "ui:datalist": ["JavaScript", "Python", "Java", "C++", "Go", "Rust"]
  }
};
```

**Features:**
- Browser-native `<datalist>` element
- Type to filter suggestions
- Still allows free-form input
- No JavaScript required for basic functionality

---

## Layouts and Grouping

Layouts can be applied at two levels:
1. **Root-level**: Apply to the entire form (no nested objects required)
2. **Path-based**: Apply to specific nested objects

### Root-Level Layout (Entire Form)

Apply layout to all top-level fields without modifying your JSON Schema:

```javascript
const schema = {
  type: "object",
  title: "Contact Form",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    email: { type: "string", format: "email", title: "Email" },
    phone: { type: "string", title: "Phone" }
  }
};

// Root-level ui:layout applies to entire form
const uiSchema = {
  "ui:layout": "grid",
  "ui:layoutOptions": {
    columns: 2,
    gap: "md"
  }
};
```

Combine with field-specific options:

```javascript
const uiSchema = {
  // Root form layout
  "ui:layout": "grid",
  "ui:layoutOptions": { columns: 2, gap: "md" },
  
  // Field-specific customization
  "/email": { "ui:icon": "envelope" },
  "/bio": { 
    "ui:widget": "textarea",
    "ui:class": "grid-col-span-2"    // Full-width field
  }
};
```

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

Collect complex nested data in a modal dialog. This is perfect for editing complex nested objects without cluttering the main form.

```javascript
const schema = {
  type: "object",
  properties: {
    projectName: { type: "string", title: "Project Name" },
    teamLead: {
      type: "object",
      title: "Team Lead",
      properties: {
        name: { type: "string", title: "Full Name" },
        email: { type: "string", format: "email", title: "Email" },
        phone: { type: "string", title: "Phone" },
        department: { type: "string", title: "Department" }
      }
    },
    budget: {
      type: "object",
      title: "Budget Details",
      properties: {
        amount: { type: "number", title: "Budget Amount" },
        currency: { type: "string", title: "Currency", enum: ["USD", "EUR", "GBP"] },
        fiscalYear: { type: "string", title: "Fiscal Year" }
      }
    }
  }
};

const uiSchema = {
  "/projectName": {
    "ui:icon": "folder",
    "ui:iconPosition": "start"
  },
  "/teamLead": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      buttonLabel: "Edit Team Lead",      // Button label
      dialogTitle: "Team Lead Information", // Dialog title
      icon: "user-gear"                   // Optional button icon
    },
    // Style fields within the dialog
    name: { "ui:icon": "user", "ui:iconPosition": "start" },
    email: { "ui:icon": "envelope", "ui:iconPosition": "start" }
  },
  "/budget": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      buttonLabel: "Edit Budget",
      dialogTitle: "Budget Details",
      icon: "currency-dollar"
    }
  }
};

// With initial values - state is preserved across dialog edits
const initialValues = {
  projectName: "Digital Transformation",
  teamLead: {
    name: "Sarah Johnson",
    email: "sarah@company.com"
  },
  budget: {
    amount: 250000,
    currency: "USD"
  }
};
```

**How it works:**
1. Renders an "Edit..." button in place of the nested fieldset
2. Clicking opens a dialog with the nested form fields
3. Values are stored in a hidden input using FormData
4. State is transferred via FormData when using `PDS.ask()` with `useForm: true`
5. Dialog submission updates the main form's hidden input
6. Main form submission includes all nested data

**Events:**
- `pw:dialog-open` - Fired when dialog opens
- `pw:dialog-submit` - Fired when dialog form is submitted with the saved values

---

## Custom Renderers

Define custom widgets for complete control:

```javascript
const form = document.querySelector('pds-form');

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

`pds-form` emits events throughout the form lifecycle:

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
  <pds-form
    .jsonSchema=${schema}
    .uiSchema=${uiSchema}
    .options=${options}
    submit-label="Create Account"
    @pw:submit=${handleSubmit}
  ></pds-form>
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
const form = document.querySelector('pds-form');

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

### All Features Combined

A comprehensive example showcasing multiple features:

```javascript
const schema = {
  type: "object",
  properties: {
    userProfile: {
      type: "object",
      title: "User Profile",
      properties: {
        personalInfo: {
          type: "object",
          title: "Personal Information",
          properties: {
            firstName: { 
              type: "string", 
              title: "First Name", 
              examples: ["John"] 
            },
            lastName: { 
              type: "string", 
              title: "Last Name", 
              examples: ["Doe"] 
            },
            email: { 
              type: "string", 
              format: "email", 
              title: "Email", 
              examples: ["john.doe@example.com"] 
            },
            phone: { 
              type: "string", 
              title: "Phone", 
              examples: ["+1 (555) 123-4567"] 
            }
          },
          required: ["firstName", "lastName", "email"]
        },
        settings: {
          type: "object",
          title: "Settings",
          properties: {
            accountSettings: {
              type: "object",
              title: "Account Settings",
              properties: {
                notifications: { 
                  type: "boolean", 
                  title: "Email Notifications" 
                },
                newsletter: { 
                  type: "boolean", 
                  title: "Newsletter Subscription" 
                }
              }
            },
            preferences: {
              type: "object",
              title: "Preferences",
              properties: {
                theme: { 
                  type: "string", 
                  title: "Theme", 
                  enum: ["Light", "Dark", "Auto"] 
                },
                fontSize: { 
                  type: "number", 
                  title: "Font Size", 
                  minimum: 12, 
                  maximum: 20, 
                  default: 14 
                },
                lineHeight: { 
                  type: "number", 
                  title: "Line Height", 
                  minimum: 1.0, 
                  maximum: 2.0, 
                  default: 1.5 
                }
              }
            }
          }
        }
      }
    },
    profile: {
      type: "object",
      title: "Profile",
      properties: {
        avatar: { 
          type: "string", 
          title: "Profile Picture",
          contentMediaType: "image/*",
          contentEncoding: "base64"
        },
        bio: { 
          type: "string", 
          title: "Biography", 
          examples: ["Tell us about yourself..."] 
        },
        website: { 
          type: "string", 
          format: "uri", 
          title: "Website", 
          examples: ["https://yourwebsite.com"] 
        }
      }
    }
  }
};

const uiSchema = {
  "/userProfile": {
    "ui:layout": "accordion",
    "ui:layoutOptions": { openFirst: true },
    "ui:surface": "elevated"
  },
  "/userProfile/personalInfo": {
    "ui:layout": "grid",
    "ui:layoutOptions": { columns: 2, gap: "md" },
    "ui:surface": "sunken"
  },
  "/userProfile/personalInfo/email": { 
    "ui:icon": "envelope", 
    "ui:iconPosition": "start" 
  },
  "/userProfile/personalInfo/phone": { 
    "ui:icon": "phone", 
    "ui:iconPosition": "start" 
  },
  "/userProfile/settings/accountSettings": {
    "ui:surface": "sunken"
  },
  "/userProfile/settings/preferences": {
    "ui:surface": "sunken"
  },
  "/userProfile/settings/preferences/theme": { 
    "ui:class": "buttons"  // Radio buttons styled as button group
  },
  "/userProfile/settings/preferences/fontSize": { 
    "ui:widget": "input-range" 
  },
  "/userProfile/settings/preferences/lineHeight": { 
    "ui:widget": "input-range" 
  },
  "/profile": {
    "ui:dialog": true,
    "ui:dialogOptions": {
      buttonLabel: "Edit Profile",
      dialogTitle: "Your Profile Information",
      icon: "user-circle"
    }
  },
  "/profile/avatar": {
    "ui:options": {
      accept: "image/*",
      maxSize: 5242880,
      label: "Upload Avatar"
    }
  },
  "/profile/bio": {
    "ui:widget": "richtext",
    "ui:options": {
      toolbar: "standard"
    }
  },
  "/profile/website": { 
    "ui:icon": "globe", 
    "ui:iconPosition": "start" 
  }
};

const options = {
  widgets: {
    booleans: "toggle"      // Use toggles for all boolean fields
  },
  enhancements: {
    rangeOutput: true       // Show live values for range sliders
  }
};

html`
  <pds-form 
    .jsonSchema=${schema}
    .uiSchema=${uiSchema}
    .options=${options}
    @pw:value-change=${(e) => console.log('Changed:', e.detail)}
    @pw:submit=${(e) => console.log('Submitted:', e.detail)}
  ></pds-form>
`;
```

**This example demonstrates:**
- ✅ Accordion layout for top-level sections
- ✅ Grid layout for personal info (2 columns)
- ✅ Icon-enhanced inputs (email, phone, website)
- ✅ Toggle switches for boolean preferences
- ✅ Range sliders with live output display
- ✅ Dialog form for profile editing
- ✅ File upload with pds-upload
- ✅ Rich text editor with pds-richtext
- ✅ Surface wrapping (elevated, sunken)
- ✅ Radio buttons styled as button group
- ✅ Required field validation
- ✅ Format validation (email, uri)

---

## Tips and Best Practices

1. **Use JSON Pointer paths** - All uiSchema and path-specific options use JSON Pointer format (`"/property/nested"`)

2. **Leverage defaults and examples** - Set sensible defaults using the `default` keyword, and provide placeholder text using `examples` array (first example is used as placeholder)

3. **Progressive enhancement** - Forms work without JavaScript, enhanced when available

4. **Accessibility first** - All generated forms include proper ARIA attributes and semantic HTML

5. **Light DOM** - The component uses light DOM, so all PDS styles apply automatically

6. **Event-driven** - Use events for validation, transformation, and side effects

7. **Custom renderers** - For complete control, define custom renderers for specific widget types

8. **Options hierarchy** - Remember: Default → Preset → Instance → uiSchema (most specific wins)

9. **Path-based customization** - Use path-specific options for complex forms with varying needs

10. **Test with real schemas** - Validate your schemas at [jsonschemavalidator.net](https://www.jsonschemavalidator.net/)

11. **Use layoutOptions object** - Always use `ui:layoutOptions` object for layout configuration instead of flat properties

12. **Dialog forms for complex nesting** - Use `ui:dialog` with `ui:dialogOptions` for editing complex nested objects to keep the main form clean

13. **Icons for clarity** - Add icons to inputs using `ui:icon` and `ui:iconPosition` for better visual hierarchy

14. **Toggle vs checkbox** - Use toggles for on/off settings, checkboxes for multi-select or consent

15. **Surface wrapping** - Use `ui:surface` to visually group related fields with PDS surface tokens

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
