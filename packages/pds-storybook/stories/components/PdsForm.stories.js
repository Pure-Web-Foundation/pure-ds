import { html, nothing } from "lit";
import { createComponentDocsPage } from "../reference/reference-docs.js";
import showdown from "showdown";

const markdownConverter = new showdown.Converter({ 
  tables: true,
  ghCompatibleHeaderId: true,
  customizedHeaderId: true
});

const optionsReferenceMarkdown = `
# Options Reference {#options-reference}

Complete reference for the **options** property of \`pds-form\`.

The \`options\` object controls default widget types, layouts, and form behavior globally.

---

## Usage

Pass an options object to the \`<pds-form>\` component via the \`.options\` property:

\`\`\`javascript
const options = {
  widgets: {
    booleans: "toggle-with-icons",  // 'toggle' | 'toggle-with-icons' | 'checkbox'
    numbers: "input",                // 'input' | 'range'
    selects: "standard",             // 'standard' | 'dropdown'
  },
  layouts: {
    fieldsets: "default",            // 'default' | 'flex' | 'grid' | 'accordion' | 'tabs'
    arrays: "default",               // 'default' | 'compact'
  },
  enhancements: {
    icons: true,                     // Enable icon-enhanced inputs
    datalists: true,                 // Enable datalist autocomplete
    rangeOutput: true,               // Show live value for range sliders
  },
  validation: {
    showErrors: true,                // Show validation errors inline
    validateOnChange: false,         // Validate on every change vs on submit
  },
};
\`\`\`

\`\`\`html
<pds-form
  .jsonSchema=\${schema}
  .uiSchema=\${uiSchema}
  .options=\${options}
></pds-form>
\`\`\`

---

## widgets

Control the default widget type for different field types.

### widgets.booleans

**Type:** \`"toggle" | "toggle-with-icons" | "checkbox"\`  
**Default:** \`"toggle"\`

Default widget for boolean fields.

| Value | Description |
|-------|-------------|
| \`"checkbox"\` | Standard HTML checkbox |
| \`"toggle"\` | Toggle switch (cleaner, more modern) |
| \`"toggle-with-icons"\` | Toggle switch with checkmark (?) when on and cross (?) when off |

**Example:**
\`\`\`javascript
options: {
  widgets: {
    booleans: "toggle-with-icons"  // All boolean fields use toggle switches with icons
  }
}
\`\`\`

### widgets.numbers

**Type:** \`"input" | "range"\`  
**Default:** \`"input"\`

Default widget for number and integer fields.

| Value | Description |
|-------|-------------|
| \`"input"\` | Standard number input with spinner controls |
| \`"range"\` | Range slider (horizontal slider) |

### widgets.selects

**Type:** \`"standard" | "dropdown"\`  
**Default:** \`"standard"\`

Default widget for enum fields (fields with predefined values).

| Value | Description |
|-------|-------------|
| \`"standard"\` | Native HTML \`<select>\` element |
| \`"dropdown"\` | Enhanced dropdown menu with better styling |

---

## layouts

Control default layout behavior for nested structures.

### layouts.fieldsets

**Type:** \`"default" | "flex" | "grid" | "accordion" | "tabs"\`  
**Default:** \`"default"\`

Default layout for object properties (fieldsets).

| Value | Description |
|-------|-------------|
| \`"default"\` | Vertical stack of fields |
| \`"flex"\` | Flexbox row layout |
| \`"grid"\` | CSS Grid layout |
| \`"accordion"\` | Collapsible \`<details>\` sections |
| \`"tabs"\` | Tabbed interface using \`<pds-tabstrip>\` |

### layouts.arrays

**Type:** \`"default" | "compact"\`  
**Default:** \`"default"\`

Layout style for array items.

| Value | Description |
|-------|-------------|
| \`"default"\` | Full layout with add/remove buttons |
| \`"compact"\` | Condensed layout for simpler arrays |

---

## enhancements

Enable or disable progressive enhancement features.

### enhancements.icons

**Type:** \`boolean\`  
**Default:** \`true\`

Enable icon-enhanced inputs via \`ui:icon\` in uiSchema.

When \`true\`, fields can display icons using:
\`\`\`javascript
uiSchema: {
  '/email': { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' }
}
\`\`\`

### enhancements.datalists

**Type:** \`boolean\`  
**Default:** \`true\`

Enable autocomplete suggestions via \`ui:datalist\` in uiSchema.

When \`true\`, fields can show autocomplete dropdown using:
\`\`\`javascript
uiSchema: {
  '/country': { 'ui:datalist': ['USA', 'UK', 'Canada', 'Australia'] }
}
\`\`\`

### enhancements.rangeOutput

**Type:** \`boolean\`  
**Default:** \`true\`

Show live value display for range slider inputs.

When \`true\`, range sliders display their current value next to the slider.

---

## validation

Control validation behavior and error display.

### validation.showErrors

**Type:** \`boolean\`  
**Default:** \`true\`

Display validation error messages inline below fields.

When \`false\`, validation still occurs but error messages are not displayed in the UI.

### validation.validateOnChange

**Type:** \`boolean\`  
**Default:** \`false\`

Validate fields as the user types (on every change event).

| Value | Behavior |
|-------|----------|
| \`false\` | Validate only on form submit (better UX for most cases) |
| \`true\` | Validate on every keystroke (immediate feedback) |

---
`;

const uiSchemaReferenceMarkdown = `
# uiSchema Reference {#uischema-reference}

Complete reference for all **uiSchema** configuration options in \`pds-form\`.

The uiSchema controls *how* fields are rendered while JSON Schema defines *what* data to collect.

---

## Path Syntax

Use **slash notation** (JSON Pointer) to target fields:

| Target | Path |
|--------|------|
| Root form | \`"/"\` or root-level \`ui:*\` keys |
| Top-level field | \`"/fieldName"\` or \`"fieldName"\` |
| Nested field | \`"/parent/child"\` or \`"parent/child"\` |

---

## Root-Level Layout

Apply layout to the **entire form** without modifying your JSON Schema:

\`\`\`javascript
const uiSchema = {
  'ui:layout': 'grid',
  'ui:layoutOptions': {
    columns: 2,
    gap: 'md'
  }
};
\`\`\`

You can combine root-level layout with field-specific options:

\`\`\`javascript
const uiSchema = {
  // Root form layout
  'ui:layout': 'grid',
  'ui:layoutOptions': { columns: 2, gap: 'md' },
  
  // Field-specific options
  '/email': { 'ui:icon': 'envelope' },
  '/bio': { 'ui:widget': 'textarea' }
};
\`\`\`

---

## Widget Selection

### \`ui:widget\`

Override the automatically selected widget for a field.

| Widget | Use For | Notes |
|--------|---------|-------|
| \`input-text\` | String | Default for strings |
| \`textarea\` | String | Multi-line text |
| \`password\` | String | Masked input |
| \`input-email\` | String | Email with validation |
| \`input-url\` | String | URL with validation |
| \`input-number\` | Number | Default for numbers |
| \`input-range\` | Number | Slider control |
| \`input-date\` | String | Date picker |
| \`input-time\` | String | Time picker |
| \`input-datetime\` | String | Date + time picker |
| \`input-color\` | String | Color picker |
| \`checkbox\` | Boolean | Default for booleans |
| \`toggle\` | Boolean | Toggle switch |
| \`select\` | String (enum) | Default for enums |
| \`radio\` | String (enum) | Radio button group |
| \`checkbox-group\` | Array (enum items) | Multi-select checkboxes |
| \`upload\` | String | File upload (pds-upload) |
| \`richtext\` | String | Rich text editor (pds-richtext) |
| \`const\` | Any | Read-only display |

---

## Widget Options

### \`ui:options\`

Widget-specific configuration object.

#### Textarea Options
| Option | Type | Description |
|--------|------|-------------|
| \`rows\` | number | Number of visible rows |
| \`cols\` | number | Number of visible columns |

#### Range Slider Options
| Option | Type | Description |
|--------|------|-------------|
| \`min\` | number | Minimum value |
| \`max\` | number | Maximum value |
| \`step\` | number | Step increment |

#### Upload Options (pds-upload)
| Option | Type | Description |
|--------|------|-------------|
| \`accept\` | string | MIME types (e.g., \`"image/*"\`) |
| \`maxSize\` | number | Max file size in bytes |
| \`multiple\` | boolean | Allow multiple files |
| \`label\` | string | Upload button label |

#### Rich Text Options (pds-richtext)
| Option | Type | Description |
|--------|------|-------------|
| \`toolbar\` | string | \`"minimal"\`, \`"standard"\`, \`"full"\` |
| \`spellcheck\` | boolean | Enable spellcheck |
| \`format\` | string | \`"html"\` or \`"markdown"\` for output |
| \`submitOnEnter\` | boolean | Submit form on Enter |

---

## Layout Options

### \`ui:layout\`

Control how nested object fields are arranged.

| Value | Description |
|-------|-------------|
| \`default\` | Standard vertical fieldset |
| \`flex\` | Flexbox row layout |
| \`grid\` | CSS Grid layout |
| \`accordion\` | Collapsible \`<details>\` sections |
| \`tabs\` | Tabbed interface (pds-tabstrip) |

### \`ui:layoutOptions\`

Layout-specific configuration.

#### Flex Layout Options
| Option | Type | Description |
|--------|------|-------------|
| \`wrap\` | boolean | Allow wrapping |
| \`gap\` | string | Gap size: \`"sm"\`, \`"md"\`, \`"lg"\` |
| \`direction\` | string | \`"row"\` or \`"column"\` |

#### Grid Layout Options
| Option | Type | Description |
|--------|------|-------------|
| \`columns\` | number | Number of columns |
| \`gap\` | string | Gap size: \`"sm"\`, \`"md"\`, \`"lg"\` |

#### Accordion Layout Options
| Option | Type | Description |
|--------|------|-------------|
| \`openFirst\` | boolean | First section open by default |

---

## Field Customization

### Display Options

| Option | Type | Description |
|--------|------|-------------|
| \`ui:help\` | string | Help text below field (overrides \`description\`) |
| \`ui:placeholder\` | string | Placeholder text (overrides \`examples\`) |
| \`ui:class\` | string | Additional CSS classes |
| \`ui:order\` | string[] | Field order within object |

### State Options

| Option | Type | Description |
|--------|------|-------------|
| \`ui:hidden\` | boolean | Hide field from UI (still in data) |
| \`ui:readonly\` | boolean | Make field read-only |
| \`ui:disabled\` | boolean | Disable field |

---

## Icon Enhancement

### \`ui:icon\`

Add an icon to the input field. Requires \`pds-icon\` component.

| Option | Type | Description |
|--------|------|-------------|
| \`ui:icon\` | string | Icon name from sprite |
| \`ui:iconPosition\` | string | \`"start"\` or \`"end"\` |

---

## Surface Wrapping

### \`ui:surface\`

Wrap a fieldset in a styled container.

| Value | Description |
|-------|-------------|
| \`card\` | Card surface |
| \`elevated\` | Elevated surface with shadow |
| \`sunken\` | Sunken/inset surface |

---

## Dialog Forms

### \`ui:dialog\`

Collect nested object data in a modal dialog instead of inline.

| Option | Type | Description |
|--------|------|-------------|
| \`ui:dialog\` | boolean | Enable dialog mode |

### \`ui:dialogOptions\`

| Option | Type | Description |
|--------|------|-------------|
| \`buttonLabel\` | string | Trigger button label |
| \`dialogTitle\` | string | Dialog title |
| \`icon\` | string | Icon for trigger button |

---

## Autocomplete

### \`ui:datalist\`

Provide autocomplete suggestions using native \`<datalist>\`.

| Option | Type | Description |
|--------|------|-------------|
| \`ui:datalist\` | string[] | Array of suggestion values |

### \`ui:autocomplete\`

HTML autocomplete attribute hint.

| Option | Type | Description |
|--------|------|-------------|
| \`ui:autocomplete\` | string | e.g., \`"email"\`, \`"new-password"\`, \`"tel"\` |

---

## Enhanced Select

### \`ui:dropdown\`

Use enhanced dropdown menu instead of native select.

| Option | Type | Description |
|--------|------|-------------|
| \`ui:dropdown\` | boolean | Enable enhanced dropdown |

---

## Conditional Logic (Interactions)

Declarative XForms-inspired conditions for dynamic form behavior.

### Visibility

| Option | Type | Description |
|--------|------|-------------|
| \`ui:visibleWhen\` | object | Show field when condition is true |
| \`ui:hidden\` | boolean | Always hide field |

### State

| Option | Type | Description |
|--------|------|-------------|
| \`ui:disabledWhen\` | object | Disable field when condition is true |
| \`ui:requiredWhen\` | object | Require field when condition is true |

### Calculated Values

| Option | Type | Description |
|--------|------|-------------|
| \`ui:calculate\` | object | Compute value from expression |
| \`ui:calculateOverride\` | boolean | Allow user to edit calculated value |

### Condition Operators

**Comparison**: \`$eq\`, \`$ne\`, \`$gt\`, \`$gte\`, \`$lt\`, \`$lte\`, \`$in\`, \`$nin\`, \`$exists\`, \`$regex\`

**Logical**: \`$and\`, \`$or\`, \`$not\`

**Calculation**: \`$concat\`, \`$sum\`, \`$subtract\`, \`$multiply\`, \`$divide\`, \`$if\`, \`$coalesce\`

### Examples

\`\`\`javascript
// Show field conditionally
"/otherReason": {
  "ui:visibleWhen": { "/reason": "other" }
}

// Disable based on condition
"/email": {
  "ui:disabledWhen": { "/usePhone": true }
}

// Conditional requirement
"/companyName": {
  "ui:requiredWhen": { "/accountType": "business" }
}

// Calculated value
"/fullName": {
  "ui:calculate": { "$concat": ["/firstName", " ", "/lastName"] }
}

// Complex condition
"/premiumFeature": {
  "ui:visibleWhen": {
    "$and": [
      { "/isPremium": true },
      { "/country": { "$in": ["US", "CA", "UK"] } }
    ]
  }
}
\`\`\`

---

## Custom Content Injection

Inject custom HTML content before/after fields, create fully custom renderers, or customize field wrappers.

### Content Injection

| Option | Type | Description |
|--------|------|-------------|
| \`ui:before\` | function \| string | Content rendered before the field |
| \`ui:after\` | function \| string | Content rendered after the field |

**Value Types:**
- **Function**: \`(field) => html\`...\`\` - receives render context
- **Slot reference**: \`"slot:mySlot"\` - renders slotted element by name

### Custom Rendering

| Option | Type | Description |
|--------|------|-------------|
| \`ui:render\` | function | Complete custom field renderer |
| \`ui:wrapper\` | function | Custom wrapper around the control |

### Render Context (\`field\` object)

| Property | Description |
|----------|-------------|
| \`id\` | Unique DOM ID for the field |
| \`path\` | JSON Pointer path (e.g., \`/address/city\`) |
| \`label\` | Display label |
| \`value\` | Current field value |
| \`schema\` | JSON Schema for this field |
| \`ui\` | UI schema for this path |
| \`attrs\` | Native constraint attributes |
| \`get\` | Get value at path: \`get("/otherField")\` |
| \`set\` | Set value: \`set(newValue)\` |
| \`host\` | Reference to pds-form element |
| \`control\` | (wrapper only) Rendered control template |
| \`help\` | (wrapper only) Rendered help text |

### Examples

\`\`\`javascript
// Add content before/after fields
"/username": {
  "ui:before": (field) => html\`<div class="alert">Section header</div>\`,
  "ui:after": (field) => field.value?.length < 3 
    ? html\`<small class="text-danger">Too short</small>\`
    : nothing
}

// Custom star rating widget
"/rating": {
  "ui:render": (field) => html\`
    <fieldset>
      <legend>\${field.label}</legend>
      <div class="flex gap-xs">
        \${[1,2,3,4,5].map(n => html\`
          <button type="button" @click=\${() => field.set(n)}>
            \${n <= field.value ? '?' : '?'}
          </button>
        \`)}
      </div>
    </fieldset>
  \`
}

// Custom wrapper with colored border
"/email": {
  "ui:wrapper": (field) => html\`
    <div style="border-left: 5px solid var(--color-primary-500); padding-left: var(--spacing-sm);">
      <label for=\${field.id}>
        <span data-label>\${field.label}</span>
        \${field.control}
      </label>
    </div>
  \`
}

// Use slotted content
"/terms": {
  "ui:before": "slot:terms-notice"
}
\`\`\`
`;

const docsParameters = {
  description: {
    component: `**✨ Recommended for modern applications** - Automatically generate complete forms from [JSON Schema](https://json-schema.org/) definitions.

### Key Features
- 📝 **Zero boilerplate** - Define form structure in JSON, get a working form with validation
- ✓ **Built-in validation** - Automatic validation based on schema rules (required, min/max, patterns, etc.)
- 🔄 **Data binding** - Two-way data binding with form state management
- 🎨 **PDS styled** - Uses all PDS design tokens automatically
- 📱 **Responsive** - Mobile-friendly layouts out of the box
- 🔀 **Conditional logic** - Show/hide/disable fields, computed values
- 🗂️ **Nested objects** - Support for complex nested data structures
- 🔧 **Extensible** - Custom field types and validators

### Why Generate Forms from JSON Schema?
Instead of manually writing HTML for every form field, validation rule, and error message, you define your data schema once and get:
- Form UI generation
- Client-side validation
- Server-side validation (same schema)
- API documentation
- Type definitions
- Database schemas

See the examples below to get started, or check the [primitive forms](/story/primitives-form-elements--default) for manual form building.
`,
  },
  page: createComponentDocsPage("pds-form", {
    hideStories: true,
    additionalContent: 
      markdownConverter.makeHtml(optionsReferenceMarkdown) +
      markdownConverter.makeHtml(uiSchemaReferenceMarkdown),
  }),
  toc: true,
};

export default {
  title: "Components/pds-form",
  tags: ["autodocs", "forms", "json-schema", "validation", "input"],
  parameters: {
    pds: {
      tags: [
        "forms",
        "json-schema",
        "validation",
        "input",
        "pds-form",
        "interaction",
      ],
    },
    docs: docsParameters,
  },
};

const simpleSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Full Name",
      examples: ["John Doe"],
    },
    email: {
      type: "string",
      format: "email",
      title: "Email Address",
      examples: ["john.doe@example.com"],
    },
    dateOfBirth: {
      type: "string",
      format: "date",
      title: "Date of Birth",
      examples: ["1990-01-15"],
    },
    newsletter: {
      type: "boolean",
      title: "Subscribe to newsletter",
      default: false,
    },
  },
  required: ["name", "email"],
};

// UI Schema with icons for better UX
const simpleUiSchema = {
  "/name": {
    "ui:icon": "user",
    "ui:iconPosition": "start",
  },
  "/email": {
    "ui:icon": "envelope",
    "ui:iconPosition": "start",
  },
  "/dateOfBirth": {
    "ui:icon": "calendar",
    "ui:iconPosition": "start",
  },
};

const complexSchema = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      title: "Personal Information",
      properties: {
        firstName: { type: "string", title: "First Name", examples: ["John"] },
        lastName: { type: "string", title: "Last Name", examples: ["Doe"] },
        dateOfBirth: { type: "string", format: "date", title: "Date of Birth" },
      },
    },
    address: {
      type: "object",
      title: "Address",
      properties: {
        street: {
          type: "string",
          title: "Street",
          examples: ["123 Main Street"],
        },
        city: { type: "string", title: "City", examples: ["New York"] },
        country: {
          type: "string",
          title: "Country",
          enum: ["USA", "UK", "Canada", "Australia"],
        },
      },
    },
    preferences: {
      type: "array",
      title: "Interests",
      items: {
        type: "string",
        examples: ["Technology", "Sports", "Music", "Travel", "Reading"],
      },
      default: ["Technology", "Sports", "Music", "Travel", "Reading"],
      uniqueItems: true,
    },
  },
};

export const SimpleForm = {
  render: () => {
    const handleSubmit = async (e) => {
      // Add btn-working class to show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn?.classList.add('btn-working');
      
      try {
        // Simulate async submission (2 second delay)
        await new Promise(resolve => setTimeout(resolve, 2000));
        await toastFormData(e.detail);
      } finally {
        submitBtn?.classList.remove('btn-working');
      }
    };

    return html`
      <pds-form
        data-required
        .jsonSchema=${simpleSchema}
        .uiSchema=${simpleUiSchema}
        @pw:submit=${handleSubmit}
      ></pds-form>
    `;
  },
};

const complexUiSchema = {
  "/personalInfo/firstName": {
    "ui:icon": "user",
    "ui:iconPosition": "start",
  },
  "/personalInfo/lastName": {
    "ui:icon": "user",
    "ui:iconPosition": "start",
  },
  "/personalInfo/dateOfBirth": {
    "ui:icon": "calendar",
    "ui:iconPosition": "start",
  },
  "/address/street": {
    "ui:icon": "map-pin",
    "ui:iconPosition": "start",
  },
  "/address/city": {
    "ui:icon": "building",
    "ui:iconPosition": "start",
  },
  "address/country": {
    "ui:class": "buttons"
  },
  preferences: {
    "ui:class": "buttons"
  }
}

export const ComplexForm = {
  render: () => {
    const handleSubmit = async (e) => {
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn?.classList.add('btn-working');
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await toastFormData(e.detail);
      } finally {
        submitBtn?.classList.remove('btn-working');
      }
    };

    return html`
      <pds-form
        .jsonSchema=${complexSchema}
        .uiSchema=${complexUiSchema}
        @pw:submit=${handleSubmit}
      ></pds-form>
    `;
  },
};

const options = {
      widgets: {
        booleans: "toggle-with-icons", // Use toggle switches instead of checkboxes
      },
    };

export const WithInitialData = {
  render: () => {
    const initialValues = {
      name: "Jane Doe",
      email: "jane@example.com",
      dateOfBirth: "1998-06-15",
      newsletter: true,
    };

    const handleSubmit = async (e) => {
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn?.classList.add('btn-working');
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await toastFormData(e.detail);
      } finally {
        submitBtn?.classList.remove('btn-working');
      }
    };

    return html`
      <pds-form
        .jsonSchema=${simpleSchema}
        .uiSchema=${simpleUiSchema}
        .values=${initialValues}
        .options=${options}
        @pw:value-change=${(e) => console.log("?? Value changed:", e.detail)}
        @pw:submit=${handleSubmit}
      ></pds-form>
    `;
  },
};

export const WithTogglesSwitches = {
  name: "Toggles & Switches",
  render: () => {
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
              description: "Receive notifications via email",
            },
            pushNotifications: {
              type: "boolean",
              title: "Push Notifications",
              description: "Receive push notifications on your device",
            },
            darkMode: {
              type: "boolean",
              title: "Dark Mode",
              description: "Enable dark theme",
            },
            autoSave: {
              type: "boolean",
              title: "Auto-save",
              description: "Automatically save changes",
            },
          },
        },
      },
    };

    const uiSchema = {
      toggles: {
        "ui:layout": "flex",
        "ui:layoutOptions": {
          direction: "column",
          gap: "md",
        },
      },
    };

    const options = {
      widgets: {
        booleans: "toggle-with-icons", // Use toggle switches instead of checkboxes
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithRangeSliders = {
  name: "Range Sliders with Output",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        volume: {
          type: "number",
          title: "Volume",
          minimum: 0,
          maximum: 100,
          default: 50,
        },
        brightness: {
          type: "number",
          title: "Brightness",
          minimum: 0,
          maximum: 100,
          default: 75,
        },
        fontSize: {
          type: "number",
          title: "Font Size",
          minimum: 10,
          maximum: 24,
          default: 16,
        },
        quality: {
          type: "integer",
          title: "Quality",
          minimum: 1,
          maximum: 10,
          default: 7,
        },
      },
    };

    const uiSchema = {
      volume: { "ui:widget": "input-range" },
      brightness: { "ui:widget": "input-range" },
      fontSize: { "ui:widget": "input-range" },
      quality: { "ui:widget": "input-range" },
    };

    const options = {
      enhancements: {
        rangeOutput: true, // Add live value display
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:value-change=${(e) => console.log("??? Value changed:", e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithIcons = {
  name: "Icon-Enhanced Inputs",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          title: "Username",
          examples: ["Enter your username"],
        },
        email: {
          type: "string",
          format: "email",
          title: "Email",
          examples: ["your.email@example.com"],
        },
        password: {
          type: "string",
          title: "Password",
          examples: ["��������"],
        },
        website: {
          type: "string",
          format: "uri",
          title: "Website",
          examples: ["https://yourwebsite.com"],
        },
        phone: {
          type: "string",
          title: "Phone",
          examples: ["+1 (555) 123-4567"],
        },
        location: {
          type: "string",
          title: "Location",
          examples: ["City, Country"],
        },
      },
      required: ["username", "email", "password"],
    };

    const uiSchema = {
      username: {
        "ui:icon": "user",
        "ui:iconPosition": "start",
      },
      email: {
        "ui:icon": "envelope",
        "ui:iconPosition": "start",
      },
      password: {
        "ui:icon": "lock",
        "ui:iconPosition": "start",
        "ui:widget": "password",
      },
      website: {
        "ui:icon": "globe",
        "ui:iconPosition": "start",
      },
      phone: {
        "ui:icon": "phone",
        "ui:iconPosition": "start",
      },
      location: {
        "ui:icon": "map-pin",
        "ui:iconPosition": "start",
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithPdsUpload = {
  name: "File Upload (pds-upload)",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        profilePicture: {
          type: "string",
          title: "Profile Picture",
          description: "Upload your profile photo (JPG, PNG)",
          contentMediaType: "image/*",
          contentEncoding: "base64",
        },
        resume: {
          type: "string",
          title: "Resume",
          description: "Upload your resume (PDF)",
          contentMediaType: "application/pdf",
          contentEncoding: "base64",
        },
        portfolio: {
          type: "string",
          title: "Portfolio Files",
          description: "Upload multiple portfolio items",
          contentMediaType: "image/*,application/pdf",
          contentEncoding: "base64",
        },
      },
    };

    const uiSchema = {
      profilePicture: {
        "ui:options": {
          accept: "image/jpeg,image/png",
          maxSize: 5242880, // 5MB
          label: "Choose photo",
        },
      },
      resume: {
        "ui:options": {
          accept: "application/pdf",
          maxSize: 10485760, // 10MB
          label: "Choose PDF",
        },
      },
      portfolio: {
        "ui:options": {
          multiple: true,
          accept: "image/*,application/pdf",
          label: "Choose files",
        },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithPdsRichtext = {
  name: "Rich Text Editor (pds-richtext)",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        bio: {
          type: "string",
          title: "Biography",
          description: "Tell us about yourself",
          examples: ["Write your biography..."],
        },
        coverLetter: {
          type: "string",
          title: "Cover Letter",
          description: "Write your cover letter",
          examples: ["Write your cover letter..."],
        },
        jobDescription: {
          type: "string",
          title: "Job Description",
          examples: ["Describe the position..."],
        },
      },
    };

    const uiSchema = {
      bio: {
        "ui:widget": "richtext",
        "ui:options": {
          toolbar: "minimal",
        },
      },
      coverLetter: {
        "ui:widget": "richtext",
        "ui:options": {
          toolbar: "standard",
        },
      },
      jobDescription: {
        "ui:widget": "richtext",
        "ui:options": {
          toolbar: "full",
        },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithFlexLayout = {
  name: "Flex Layout",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        contactInfo: {
          type: "object",
          title: "Contact Information",
          properties: {
            firstName: {
              type: "string",
              title: "First Name",
              examples: ["Jane"],
            },
            lastName: {
              type: "string",
              title: "Last Name",
              examples: ["Smith"],
            },
            email: {
              type: "string",
              format: "email",
              title: "Email",
              examples: ["jane.smith@example.com"],
            },
            phone: {
              type: "string",
              title: "Phone",
              examples: ["+1 (555) 987-6543"],
            },
          },
        },
      },
    };

    const uiSchema = {
      contactInfo: {
        "ui:layout": "flex",
        "ui:layoutOptions": {
          gap: "md",
          wrap: true,
          direction: "row",
        },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithGridLayout = {
  name: "Grid Layout",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        productInfo: {
          type: "object",
          title: "Product Information",
          properties: {
            name: {
              type: "string",
              title: "Product Name",
              examples: ["Wireless Headphones"],
            },
            sku: { type: "string", title: "SKU", examples: ["WH-1000XM4"] },
            price: { type: "number", title: "Price", examples: [299.99] },
            quantity: { type: "integer", title: "Quantity", examples: [50] },
            category: {
              type: "string",
              title: "Category",
              enum: [
                "Electronics",
                "Clothing",
                "Books",
                "Home",
                "Sports",
                "Garden",
              ],
            },
            brand: { type: "string", title: "Brand", examples: ["Sony"] },
            weight: { type: "number", title: "Weight (kg)", examples: [0.25] },
            dimensions: {
              type: "string",
              title: "Dimensions",
              examples: ["20 x 18 x 8 cm"],
            },
          },
        },
      },
    };

    const uiSchema = {
      productInfo: {
        "ui:layout": "grid",
        "ui:layoutOptions": {
          columns: 3,
          gap: "md",
        },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithGridLayoutAuto = {
  name: "Grid Layout - Auto",
  parameters: {
    docs: {
      description: {
        story: `Auto-fit grid layout that automatically adjusts the number of columns based on available space and minimum column width.

This is the **PDS way** to create responsive grids without media queries. Use \`columns: "auto"\` with \`autoSize\` to specify the minimum column width.

## Usage Example

\`\`\`html
<pds-form
  .jsonSchema=\${schema}
  .uiSchema=\${uiSchema}
  .options=\${options}
  @pw:submit=\${(e) => toastFormData(e.detail)}
></pds-form>

<script type="module">
import { html } from 'lit';

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
        // ... more fields
      }
    }
  }
};

const uiSchema = {
  productInfo: {
    "ui:layout": "grid",
    "ui:layoutOptions": {
      columns: "auto",   // Auto-fit columns
      autoSize: "md",    // Min width ~200px (grid-auto-md)
      gap: "md"
    }
  }
};

const options = {
  widgets: { booleans: "toggle-with-icons" }
};
</script>
\`\`\`

### Available sizes:
- \`"sm"\` ? ~150px minimum width
- \`"md"\` ? ~200px minimum width
- \`"lg"\` ? ~250px minimum width
- \`"xl"\` ? ~300px minimum width

The grid automatically creates as many columns as will fit, wrapping to new rows when needed. **No JavaScript required!**`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      properties: {
        productInfo: {
          type: "object",
          title: "Product Information",
          properties: {
            name: {
              type: "string",
              title: "Product Name",
              examples: ["Wireless Headphones"],
            },
            sku: { type: "string", title: "SKU", examples: ["WH-1000XM4"] },
            price: { type: "number", title: "Price", examples: [299.99] },
            quantity: { type: "integer", title: "Quantity", examples: [50] },
            category: {
              type: "string",
              title: "Category",
              enum: [
                "Electronics",
                "Clothing",
                "Books",
                "Home",
                "Sports",
                "Garden",
              ],
            },
            brand: { type: "string", title: "Brand", examples: ["Sony"] },
            weight: { type: "number", title: "Weight (kg)", examples: [0.25] },
            dimensions: {
              type: "string",
              title: "Dimensions",
              examples: ["20 x 18 x 8 cm"],
            },
            inStock: {
              type: "boolean",
              title: "In Stock",
              default: true,
            },
            featured: {
              type: "boolean",
              title: "Featured Product",
              default: false,
            },
          },
        },
      },
    };

    const uiSchema = {
      productInfo: {
        "ui:layout": "grid",
        "ui:layoutOptions": {
          columns: "auto",   // Auto-fit columns
          autoSize: "md",    // Min column width (grid-auto-md)
          gap: "md"
        },
      },
    };

    const options = {
      widgets: { booleans: "toggle-with-icons" },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>?? Try resizing your browser window!</strong></p>
        <p>The grid automatically adjusts the number of columns based on available space. Fields maintain a minimum width of ~200px and wrap to new rows as needed.</p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithAccordionLayout = {
  name: "Accordion Layout",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Full Name",
          examples: ["Alex Rodriguez"],
        },
        email: {
          type: "string",
          format: "email",
          title: "Email",
          examples: ["alex.rodriguez@example.com"],
        },
        settings: {
          type: "object",
          title: "Settings",
          properties: {
            displaySettings: {
              type: "object",
              title: "Display Settings",
              properties: {
                theme: {
                  type: "string",
                  title: "Theme",
                  enum: ["Light", "Dark", "Auto"],
                  default: "Auto",
                },
                fontSize: {
                  type: "number",
                  title: "Font Size (px)",
                  minimum: 12,
                  maximum: 24,
                  default: 16,
                },
                density: {
                  type: "string",
                  title: "Density",
                  enum: ["Compact", "Comfortable", "Spacious"],
                  default: "Comfortable",
                },
                animations: {
                  type: "boolean",
                  title: "Enable Animations",
                  default: true,
                },
              },
            },
            notificationSettings: {
              type: "object",
              title: "Notification Settings",
              properties: {
                email: {
                  type: "boolean",
                  title: "Email Notifications",
                  default: true,
                },
                push: {
                  type: "boolean",
                  title: "Push Notifications",
                  default: false,
                },
                sms: {
                  type: "boolean",
                  title: "SMS Notifications",
                  default: false,
                },
                frequency: {
                  type: "string",
                  title: "Frequency",
                  enum: ["Real-time", "Daily", "Weekly"],
                  default: "Daily",
                },
              },
            },
            privacySettings: {
              type: "object",
              title: "Privacy Settings",
              properties: {
                profileVisibility: {
                  type: "string",
                  title: "Profile Visibility",
                  enum: ["Public", "Friends", "Private"],
                  default: "Friends",
                },
                showEmail: {
                  type: "boolean",
                  title: "Show Email",
                  default: false,
                },
                showActivity: {
                  type: "boolean",
                  title: "Show Activity",
                  default: true,
                },
                allowMessages: {
                  type: "boolean",
                  title: "Allow Messages",
                  default: true,
                },
              },
            },
          },
        },
      },
      required: ["name", "email"],
    };

    const uiSchema = {
      settings: { "ui:layout": "accordion" },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithTabsLayout = {
  name: "Tabs Layout (pds-tabstrip)",
  render: () => {
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
                username: {
                  type: "string",
                  title: "Username",
                  examples: ["coolguy123"],
                },
                email: {
                  type: "string",
                  format: "email",
                  title: "Email",
                  examples: ["user@example.com"],
                },
                password: {
                  type: "string",
                  title: "New Password",
                  examples: ["��������"],
                },
              },
            },
            profile: {
              type: "object",
              title: "Profile",
              properties: {
                displayName: {
                  type: "string",
                  title: "Display Name",
                  examples: ["Cool Guy"],
                },
                bio: {
                  type: "string",
                  title: "Bio",
                  examples: ["Tell us about yourself..."],
                },
                location: {
                  type: "string",
                  title: "Location",
                  examples: ["San Francisco, CA"],
                },
                website: {
                  type: "string",
                  format: "uri",
                  title: "Website",
                  examples: ["https://mywebsite.com"],
                },
              },
            },
            privacy: {
              type: "object",
              title: "Privacy",
              properties: {
                publicProfile: { type: "boolean", title: "Public Profile" },
                showEmail: { type: "boolean", title: "Show Email" },
                allowMessages: { type: "boolean", title: "Allow Messages" },
                searchable: { type: "boolean", title: "Searchable" },
              },
            },
          },
        },
      },
    };

    const uiSchema = {
      userSettings: { "ui:layout": "tabs" },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithSurfaces = {
  name: "Surface Wrapping (Cards)",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        cardGroups: {
          type: "object",
          title: "Product Catalog",
          properties: {
            product1: {
              type: "object",
              title: "Premium Membership",
              properties: {
                name: {
                  type: "string",
                  title: "Product Name",
                  default: "Premium Plan",
                  examples: ["Premium Plan"],
                },
                price: {
                  type: "number",
                  title: "Price (USD)",
                  default: 29.99,
                  minimum: 0,
                  examples: [29.99],
                },
                billing: {
                  type: "string",
                  title: "Billing Cycle",
                  enum: ["Monthly", "Quarterly", "Yearly"],
                  default: "Monthly",
                },
                autoRenew: {
                  type: "boolean",
                  title: "Auto-Renew",
                  default: true,
                },
              },
            },
            product2: {
              type: "object",
              title: "Enterprise Solution",
              properties: {
                name: {
                  type: "string",
                  title: "Product Name",
                  default: "Enterprise",
                  examples: ["Enterprise"],
                },
                seats: {
                  type: "integer",
                  title: "Number of Seats",
                  default: 10,
                  minimum: 1,
                  examples: [10],
                },
                support: {
                  type: "string",
                  title: "Support Level",
                  enum: ["Standard", "Priority", "24/7"],
                  default: "Priority",
                },
                sla: { type: "boolean", title: "SLA Agreement", default: true },
              },
            },
            product3: {
              type: "object",
              title: "Developer Tools",
              properties: {
                name: {
                  type: "string",
                  title: "Product Name",
                  default: "Dev Tools Pro",
                  examples: ["Dev Tools Pro"],
                },
                apiCalls: {
                  type: "integer",
                  title: "API Calls/Month",
                  default: 100000,
                  minimum: 1000,
                  examples: [100000],
                },
                environments: {
                  type: "integer",
                  title: "Environments",
                  default: 3,
                  minimum: 1,
                  maximum: 10,
                  examples: [3],
                },
                monitoring: {
                  type: "boolean",
                  title: "Performance Monitoring",
                  default: true,
                },
              },
            },
            product4: {
              type: "object",
              title: "Storage Package",
              properties: {
                name: {
                  type: "string",
                  title: "Product Name",
                  default: "Cloud Storage+",
                  examples: ["Cloud Storage+"],
                },
                storage: {
                  type: "number",
                  title: "Storage (TB)",
                  default: 5,
                  minimum: 1,
                  maximum: 100,
                  examples: [5],
                },
                bandwidth: {
                  type: "number",
                  title: "Bandwidth (TB)",
                  default: 10,
                  minimum: 1,
                  examples: [10],
                },
                backup: {
                  type: "boolean",
                  title: "Automated Backup",
                  default: true,
                },
              },
            },
          },
        },
      },
    };

    const uiSchema = {
      cardGroups: {
        "ui:layout": "grid",
        "ui:layoutOptions": {
          columns: "auto",
          autoSize: "md",
          gap: "md",
        },
      },
      "cardGroups/product1": {
        "ui:surface": "surface-sunken",
      },
      "cardGroups/product2": {
        "ui:surface": "surface-inverse",
      },
      "cardGroups/product3": {
        "ui:surface": "card",
      },
      "cardGroups/product4": {
        "ui:surface": "elevated",
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithDialogForms = {
  name: "Dialog-Based Nested Forms",
  parameters: {
    docs: {
      description: {
        story:
          'Dialog-based forms use `ui:dialog` to edit nested objects in modal dialogs. State is transferred via FormData when using `PDS.ask()` with `useForm: true`. Click "Edit" buttons to modify nested data, then submit the main form to see all changes preserved.',
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      properties: {
        projectName: {
          type: "string",
          title: "Project Name",
          examples: ["Digital Transformation Initiative"],
        },
        teamLead: {
          type: "object",
          title: "Team Lead",
          properties: {
            name: {
              type: "string",
              title: "Full Name",
              examples: ["Sarah Johnson"],
            },
            email: {
              type: "string",
              format: "email",
              title: "Email Address",
              examples: ["sarah.johnson@company.com"],
            },
            phone: {
              type: "string",
              title: "Phone Number",
              examples: ["+1-555-0123"],
            },
            department: {
              type: "string",
              title: "Department",
              examples: ["Engineering"],
            },
            location: {
              type: "string",
              title: "Office Location",
              examples: ["New York Office"],
            },
          },
        },
        budget: {
          type: "object",
          title: "Budget Details",
          properties: {
            amount: {
              type: "number",
              title: "Budget Amount",
              examples: [250000],
            },
            currency: {
              type: "string",
              title: "Currency",
              enum: ["USD", "EUR", "GBP", "JPY", "AUD"],
            },
            fiscalYear: {
              type: "string",
              title: "Fiscal Year",
              examples: ["2025"],
            },
            department: {
              type: "string",
              title: "Cost Center",
              examples: ["IT-001"],
            },
            approved: { type: "boolean", title: "Budget Approved" },
          },
        },
        timeline: {
          type: "object",
          title: "Project Timeline",
          properties: {
            startDate: { type: "string", format: "date", title: "Start Date" },
            endDate: { type: "string", format: "date", title: "End Date" },
            milestones: {
              type: "integer",
              title: "Number of Milestones",
              minimum: 1,
              maximum: 20,
              examples: [8],
            },
            status: {
              type: "string",
              title: "Status",
              enum: ["Planning", "In Progress", "On Hold", "Completed"],
              default: "Planning",
            },
          },
        },
      },
    };

    // Initial values to test state persistence
    const initialValues = {
      projectName: "Digital Transformation Initiative",
      teamLead: {
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        phone: "+1-555-0123",
        department: "Engineering",
        location: "New York Office",
      },
      budget: {
        amount: 250000,
        currency: "USD",
        fiscalYear: "2025",
        department: "IT-001",
        approved: true,
      },
      timeline: {
        startDate: "2025-01-15",
        endDate: "2025-12-31",
        milestones: 8,
        status: "In Progress",
      },
    };

    const uiSchema = {
      projectName: {
        "ui:icon": "folder",
        "ui:iconPosition": "start",
      },
      teamLead: {
        "ui:dialog": true,
        "ui:dialogOptions": {
          buttonLabel: "Edit Team Lead",
          dialogTitle: "Team Lead Information",
          icon: "user-gear",
        },
        name: { "ui:icon": "user", "ui:iconPosition": "start" },
        email: { "ui:icon": "envelope", "ui:iconPosition": "start" },
        phone: { "ui:icon": "phone", "ui:iconPosition": "start" },
        department: { "ui:icon": "building", "ui:iconPosition": "start" },
        location: { "ui:icon": "map-pin", "ui:iconPosition": "start" },
      },
      budget: {
        "ui:dialog": true,
        "ui:dialogOptions": {
          buttonLabel: "Edit Budget",
          dialogTitle: "Budget Details",
          icon: "currency-dollar",
        },
        amount: { "ui:icon": "dollar-sign", "ui:iconPosition": "start" },
        currency: { "ui:icon": "coins", "ui:iconPosition": "start" },
        fiscalYear: { "ui:icon": "calendar", "ui:iconPosition": "start" },
        department: { "ui:icon": "building", "ui:iconPosition": "start" },
      },
      // Flat path for dialog inner form - currency field inside budget dialog
      "/currency": { "ui:widget": "select" },
      // Flat path for dialog inner form - status field inside timeline dialog
      "/status": { "ui:class": "buttons" },
      // Flat path for dialog inner form - email field inside teamLead dialog
      "/email": { "ui:icon": "at", "ui:iconPosition": "start" },
      // Flat path for dialog inner form - phone field inside teamLead dialog
      "/phone": { "ui:icon": "phone", "ui:iconPosition": "start" },
      timeline: {
        "ui:dialog": true,
        "ui:dialogOptions": {
          buttonLabel: "Edit Timeline",
          dialogTitle: "Project Timeline",
          icon: "calendar",
        },
        startDate: { "ui:icon": "calendar-check", "ui:iconPosition": "start" },
        endDate: { "ui:icon": "calendar-xmark", "ui:iconPosition": "start" },
        milestones: { "ui:icon": "flag", "ui:iconPosition": "start" },
        status: { "ui:icon": "list-check", "ui:iconPosition": "start" },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:submit=${(e) => toastFormData(e.detail)}
        @pw:dialog-submit=${(e) => console.log("?? Dialog saved:", e.detail)}
      ></pds-form>
    `;
  },
};

export const WithRadioGroupOpen = {
  name: "Radio Group Open (Single Selection)",
  parameters: {
    docs: {
      description: {
        story: `When an array has \`maxItems: 1\`, it renders as a Radio Group Open, allowing single selection with the ability to add custom options.
        
This is perfect for scenarios where users can choose one option from predefined choices or add their own custom value. The \`data-open\` enhancement automatically provides an input field to add new options dynamically.

### Key Features:
- **Single selection** - Only one option can be selected at a time (radio buttons)
- **Add custom options** - Users can type new options in the input field
- **Remove options** - Click the ✕ button to remove options
- **Pre-populated** - Start with default options from the schema

This pattern is ideal for fields like "Priority", "Status", "Category", or any single-choice field where users might need custom values.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      properties: {
        priority: {
          type: "array",
          title: "Project Priority",
          description: "Select one priority level or add your own",
          items: {
            type: "string",
            examples: ["High", "Medium", "Low"],
          },
          default: ["High", "Medium", "Low"],
          uniqueItems: true,
          maxItems: 1,
        },
        status: {
          type: "array",
          title: "Current Status",
          description: "Choose the current project status",
          items: {
            type: "string",
            examples: ["Planning", "In Progress", "Review", "Completed"],
          },
          default: ["Planning", "In Progress", "Review", "Completed"],
          uniqueItems: true,
          maxItems: 1,
        },
        department: {
          type: "array",
          title: "Department",
          description: "Select your department",
          items: {
            type: "string",
            examples: ["Engineering", "Design", "Marketing", "Sales"],
          },
          default: ["Engineering", "Design", "Marketing", "Sales"],
          uniqueItems: true,
          maxItems: 1,
        },
      },
      required: ["priority", "status"],
    };

    const initialValues = {
      priority: ["High", "Medium", "Low"],
      status: ["Planning", "In Progress", "Review", "Completed"],
      department: ["Engineering", "Design", "Marketing", "Sales"],
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .values=${initialValues}
        @pw:value-change=${(e) => console.log("?? Value changed:", e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithDatalistAutocomplete = {
  name: "Datalist Autocomplete",
  render: () => {
    const schema = {
      type: "object",
      properties: {
        country: {
          type: "string",
          title: "Country",
          examples: ["United States"],
        },
        city: {
          type: "string",
          title: "City",
          examples: ["New York"],
        },
        skillset: {
          type: "string",
          title: "Primary Skill",
          examples: ["JavaScript"],
        },
        company: {
          type: "string",
          title: "Company",
          examples: ["Microsoft"],
        },
      },
    };

    const uiSchema = {
      country: {
        "ui:datalist": [
          "United States",
          "United Kingdom",
          "Canada",
          "Australia",
          "Germany",
          "France",
          "Spain",
          "Italy",
          "Japan",
          "China",
          "India",
          "Brazil",
        ],
      },
      city: {
        "ui:datalist": [
          "New York",
          "London",
          "Tokyo",
          "Paris",
          "Berlin",
          "Sydney",
          "Toronto",
          "Amsterdam",
          "Singapore",
          "Dubai",
        ],
      },
      skillset: {
        "ui:datalist": [
          "JavaScript",
          "Python",
          "Java",
          "C++",
          "Go",
          "Rust",
          "TypeScript",
          "Ruby",
          "PHP",
          "Swift",
          "Kotlin",
        ],
      },
      company: {
        "ui:datalist": [
          "Microsoft",
          "Google",
          "Apple",
          "Amazon",
          "Meta",
          "Tesla",
          "Netflix",
          "Adobe",
          "Salesforce",
          "Oracle",
        ],
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const WithArrayFields = {
  name: "Dynamic Arrays (Add/Remove)",
  parameters: {
    docs: {
      description: {
        story: `Arrays in JSON Schema forms allow users to dynamically add and remove items. This is perfect for managing lists like team members, tasks, or any collection that can grow or shrink.

### Features:
- **Add items** - Click "Add" button to create new entries
- **Remove items** - Delete individual items with the "Remove" button
- **Reorder items** - Use up/down arrows to change order
- **Nested objects** - Each array item can contain complex nested data
- **Initial values** - Pre-populate with default items
- **Radio Group Open** - Arrays with \`maxItems: 1\` render as radio buttons for single selection`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      properties: {
        projectName: {
          type: "string",
          title: "Project Name",
          examples: ["Website Redesign Project"],
        },
        priority: {
          type: "array",
          title: "Project Priority",
          items: {
            type: "string",
            examples: ["High", "Medium", "Low"],
          },
          default: ["High", "Medium", "Low"],
          uniqueItems: true,
          maxItems: 1,
        },
        tags: {
          type: "array",
          title: "Project Tags",
          items: {
            type: "string",
          },
          default: ["web", "design", "frontend"],
        },
        teamMembers: {
          type: "array",
          title: "Team Members",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                title: "Full Name",
                examples: ["Alice Johnson"],
              },
              role: {
                type: "string",
                title: "Role",
                enum: [
                  "Developer",
                  "Designer",
                  "Project Manager",
                  "QA Engineer",
                  "DevOps",
                ],
                default: "Developer",
              },
              email: {
                type: "string",
                format: "email",
                title: "Email",
                examples: ["alice.johnson@company.com"],
              },
              hours: {
                type: "number",
                title: "Hours/Week",
                minimum: 1,
                maximum: 40,
                default: 40,
              },
            },
            required: ["name", "role", "email"],
          },
          minItems: 1,
        },
        milestones: {
          type: "array",
          title: "Project Milestones",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                title: "Milestone Title",
                examples: ["MVP Launch"],
              },
              dueDate: {
                type: "string",
                format: "date",
                title: "Due Date",
              },
              completed: {
                type: "boolean",
                title: "Completed",
                default: false,
              },
            },
            required: ["title", "dueDate"],
          },
        },
      },
      required: ["projectName", "teamMembers"],
    };

    // Initial values to demonstrate pre-populated arrays
    const initialValues = {
      projectName: "Website Redesign Project",
      priority: ["High", "Medium", "Low"],
      teamMembers: [
        {
          name: "Alice Johnson",
          role: "Project Manager",
          email: "alice.johnson@company.com",
          hours: 40,
        },
        {
          name: "Bob Smith",
          role: "Developer",
          email: "bob.smith@company.com",
          hours: 35,
        },
      ],
      milestones: [
        {
          title: "Design Phase Complete",
          dueDate: "2025-02-01",
          completed: true,
        },
        {
          title: "MVP Launch",
          dueDate: "2025-04-15",
          completed: false,
        },
      ],
      tags: ["web", "design", "frontend", "responsive"],
    };

    const uiSchema = {
      teamMembers: {
        "ui:layout": "default",
        role: {
          "ui:widget": "select",
        },
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:array-add=${(e) => console.log("? Item added to:", e.detail.path)}
        @pw:array-remove=${(e) =>
          console.log(
            "? Item removed from:",
            e.detail.path,
            "at index:",
            e.detail.index
          )}
        @pw:array-reorder=${(e) =>
          console.log(
            "?? Item moved from",
            e.detail.from,
            "to",
            e.detail.to,
            "in:",
            e.detail.path
          )}
        @pw:value-change=${(e) => console.log("?? Value changed:", e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ComprehensiveExample = {
  name: "All Features Combined",
  render: () => {
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
                  examples: ["John"],
                },
                lastName: {
                  type: "string",
                  title: "Last Name",
                  examples: ["Doe"],
                },
                email: {
                  type: "string",
                  format: "email",
                  title: "Email",
                  examples: ["john.doe@example.com"],
                },
                phone: {
                  type: "string",
                  title: "Phone",
                  examples: ["+1 (555) 123-4567"],
                },
                dateOfBirth: {
                  type: "string",
                  format: "date",
                  title: "Date of Birth",
                },
              },
              required: ["firstName", "lastName", "email"],
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
                      title: "Email Notifications",
                    },
                    newsletter: {
                      type: "boolean",
                      title: "Newsletter Subscription",
                    },
                    twoFactor: {
                      type: "boolean",
                      title: "Two-Factor Authentication",
                    },
                  },
                },
                preferences: {
                  type: "object",
                  title: "Preferences",
                  properties: {
                    theme: {
                      type: "string",
                      title: "Theme",
                      enum: ["Light", "Dark", "Auto"],
                    },
                    language: {
                      type: "string",
                      title: "Language",
                      enum: [
                        "English",
                        "Spanish",
                        "French",
                        "German",
                        "Chinese",
                        "Japanese",
                      ],
                    },
                    fontSize: {
                      type: "number",
                      title: "Font Size",
                      minimum: 12,
                      maximum: 20,
                      default: 14,
                    },
                    lineHeight: {
                      type: "number",
                      title: "Line Height",
                      minimum: 1.0,
                      maximum: 2.0,
                      default: 1.5,
                    },
                  },
                },
              },
            },
          },
        },
        profile: {
          type: "object",
          title: "Profile",
          properties: {
            avatar: {
              type: "string",
              title: "Profile Picture",
              contentMediaType: "image/*",
              contentEncoding: "base64",
            },
            bio: {
              type: "string",
              title: "Biography",
              examples: ["Tell us about yourself..."],
            },
            website: {
              type: "string",
              format: "uri",
              title: "Website",
              examples: ["https://yourwebsite.com"],
            },
          },
        },
      },
    };

    const uiSchema = {
      userProfile: {
        "ui:layout": "accordion",
        "ui:layoutOptions": { openFirst: true },
        "ui:surface": "elevated",
        personalInfo: {
          "ui:layout": "grid",
          "ui:layoutOptions": { columns: 2, gap: "md" },
          "ui:surface": "sunken",
          email: { "ui:icon": "envelope", "ui:iconPosition": "start" },
          phone: { "ui:icon": "phone", "ui:iconPosition": "start" },
        },
        settings: {
          accountSettings: {
            "ui:surface": "sunken",
          },
          preferences: {
            "ui:surface": "sunken",
            theme: { "ui:class": "buttons" },
            fontSize: { "ui:widget": "input-range" },
            lineHeight: { "ui:widget": "input-range" },
          },
        },
      },
      profile: {
        "ui:dialog": true,
        "ui:dialogOptions": {
          buttonLabel: "Edit Profile",
          dialogTitle: "Your Profile Information",
        },
        avatar: {
          "ui:options": {
            accept: "image/*",
            maxSize: 5242880,
            label: "Upload Avatar",
          },
        },
        bio: {
          "ui:widget": "richtext",
          "ui:options": {
            toolbar: "standard",
          },
        },
        website: { "ui:icon": "globe", "ui:iconPosition": "start" },
      },
    };

    const options = {
      widgets: {
        booleans: "toggle-with-icons",
      },
      enhancements: {
        rangeOutput: true,
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:value-change=${(e) => console.log("?? Changed:", e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const CustomFormActions = {
  name: "Custom Form Actions",
  parameters: {
    docs: {
      description: {
        story: `Demonstrates using \`hide-actions\` to provide custom form submission buttons and handling.
        
When \`hide-actions\` is set, the default Submit and Reset buttons are hidden, allowing you to create custom action buttons in the \`actions\` slot. You can then handle form submission programmatically using the form's \`submit()\` method or by manually triggering the form element.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          title: "Username",
          minLength: 3,
          examples: ["johndoe"],
        },
        email: {
          type: "string",
          format: "email",
          title: "Email",
          examples: ["john@example.com"],
        },
        password: {
          type: "string",
          format: "password",
          title: "Password",
          minLength: 8,
        },
        terms: {
          type: "boolean",
          title: "I agree to the terms and conditions",
        },
      },
      required: ["username", "email", "password", "terms"],
    };

    const handleSaveDraft = (e) => {
      const form = e.target.closest("pds-form");
      const data = form.serialize();
      console.log("?? Saving draft:", data.json);
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        hide-actions
        @pw:value-change=${(e) => console.log("?? Field changed:", e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      >
        <div slot="actions" class="flex gap-sm items-center">
          <button type="submit" class="btn btn-primary">
            <pds-icon icon="check"></pds-icon>
            Create Account
          </button>
          <button type="button" class="btn" @click=${handleSaveDraft}>
            <pds-icon icon="file"></pds-icon>
            Save Draft
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-outline grow text-right"
            @click=${() => console.log("Registration cancelled")}
          >
            Cancel
          </button>
        </div>
      </pds-form>
    `;
  },
};

// =============================================================================
// Root-Level Layout Stories
// =============================================================================

export const RootGridLayout = {
  name: "Root-Level Grid Layout",
  parameters: {
    docs: {
      description: {
        story: `Apply a grid layout to the entire form using root-level \`ui:layout\` and \`ui:layoutOptions\`.
        
This allows you to control the form layout **without modifying your JSON Schema** � keeping data structure separate from presentation.

\`\`\`javascript
const uiSchema = {
  'ui:layout': 'grid',
  'ui:layoutOptions': {
    columns: 2,
    gap: 'md'
  }
};
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Contact Form",
      properties: {
        firstName: { type: "string", title: "First Name", examples: ["John"] },
        lastName: { type: "string", title: "Last Name", examples: ["Doe"] },
        email: {
          type: "string",
          format: "email",
          title: "Email",
          examples: ["john.doe@example.com"],
        },
        phone: {
          type: "string",
          title: "Phone",
          examples: ["+1 (555) 123-4567"],
        },
        company: { type: "string", title: "Company", examples: ["Acme Inc."] },
        role: { type: "string", title: "Role", examples: ["Developer"] },
      },
      required: ["firstName", "lastName", "email"],
    };

    const uiSchema = {
      "ui:layout": "grid",
      "ui:layoutOptions": {
        columns: 2,
        gap: "md",
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const RootFlexLayout = {
  name: "Root-Level Flex Layout",
  parameters: {
    docs: {
      description: {
        story: `Apply a flex layout to the entire form using root-level \`ui:layout\` and \`ui:layoutOptions\`.
        
\`\`\`javascript
const uiSchema = {
  'ui:layout': 'flex',
  'ui:layoutOptions': {
    gap: 'lg',
    wrap: true
  }
};
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Quick Settings",
      properties: {
        theme: {
          type: "string",
          enum: ["light", "dark", "system"],
          title: "Theme",
          default: "system",
        },
        notifications: {
          type: "boolean",
          title: "Notifications",
          default: true,
        },
        language: {
          type: "string",
          enum: ["en", "es", "fr", "de"],
          title: "Language",
          default: "en",
        },
      },
    };

    const uiSchema = {
      "ui:layout": "flex",
      "ui:layoutOptions": {
        gap: "lg",
        wrap: true,
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const RootLayoutWithFieldOptions = {
  name: "Root Layout + Field Options",
  parameters: {
    docs: {
      description: {
        story: `Combine root-level layout with field-specific UI options.
        
Root-level \`ui:*\` properties control the overall form layout, while path-keyed entries (like \`'/email'\`) customize individual fields.

\`\`\`javascript
const uiSchema = {
  // Root form layout
  'ui:layout': 'grid',
  'ui:layoutOptions': { columns: 2, gap: 'md' },
  
  // Field-specific options
  '/email': { 'ui:icon': 'envelope' },
  '/bio': { 'ui:widget': 'textarea', 'ui:options': { rows: 4 } }
};
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "User Profile",
      properties: {
        username: {
          type: "string",
          title: "Username",
          minLength: 3,
          examples: ["johndoe"],
        },
        email: {
          type: "string",
          format: "email",
          title: "Email",
          examples: ["john@example.com"],
        },
        bio: {
          type: "string",
          title: "Bio",
          maxLength: 500,
          examples: ["Tell us about yourself..."],
        },
        website: {
          type: "string",
          format: "uri",
          title: "Website",
          examples: ["https://yoursite.com"],
        },
      },
      required: ["username", "email"],
    };

    const uiSchema = {
      // Root form layout
      "ui:layout": "grid",
      "ui:layoutOptions": {
        columns: 2,
        gap: "md",
      },
      // Field-specific options
      "/username": {
        "ui:icon": "user",
      },
      "/email": {
        "ui:icon": "envelope",
        "ui:help": "We will never share your email",
      },
      "/bio": {
        "ui:widget": "textarea",
        "ui:options": { rows: 4 },
        "ui:class": "grid-col-span-2",
      },
      "/website": {
        "ui:icon": "globe",
        "ui:class": "grid-col-span-2",
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const RootThreeColumnGrid = {
  name: "Root 3-Column Grid",
  parameters: {
    docs: {
      description: {
        story: `A more complex form using a 3-column root grid layout with various field types.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Product Registration",
      properties: {
        productName: {
          type: "string",
          title: "Product Name",
          examples: ["Widget Pro"],
        },
        serialNumber: {
          type: "string",
          title: "Serial Number",
          examples: ["SN-12345"],
        },
        purchaseDate: {
          type: "string",
          format: "date",
          title: "Purchase Date",
        },
        retailer: { type: "string", title: "Retailer", examples: ["Amazon"] },
        price: {
          type: "number",
          title: "Price",
          minimum: 0,
          examples: [99.99],
        },
        currency: {
          type: "string",
          enum: ["USD", "EUR", "GBP"],
          title: "Currency",
          default: "USD",
        },
        condition: {
          type: "string",
          enum: ["new", "refurbished", "used"],
          title: "Condition",
          default: "new",
        },
        extendedWarranty: { type: "boolean", title: "Extended Warranty" },
        newsletter: { type: "boolean", title: "Subscribe to Newsletter" },
      },
      required: ["productName", "serialNumber", "purchaseDate"],
    };

    const uiSchema = {
      "ui:layout": "grid",
      "ui:layoutOptions": {
        columns: 3,
        gap: "md",
      },
    };

    const options = {
      widgets: { booleans: "toggle-with-icons" },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const EnumWithOneOfAnyOf = {
  name: "Selection Fields with Custom Labels (oneOf/anyOf)",
  parameters: {
    docs: {
      description: {
        story: `Use \`oneOf\` or \`anyOf\` with \`const\` and \`title\` to provide human-friendly display labels for enum values.

This is useful when you want to store technical values (like language codes or IDs) while showing user-friendly labels.

\`\`\`javascript
const schema = {
  properties: {
    language: {
      type: 'string',
      title: 'Language',
      oneOf: [                            // Use oneOf or anyOf
        { const: 'en', title: 'English' },
        { const: 'es', title: 'Spanish' },
        { const: 'fr', title: 'French' },
        { const: 'de', title: 'German' },
        { const: 'zh', title: 'Chinese' },
        { const: 'ja', title: 'Japanese' }
      ]
    }
  }
};
\`\`\`

Both \`oneOf\` and \`anyOf\` work identically for this purpose. Each option should have \`const\` (the value stored) and \`title\` (the label displayed). Works with select dropdowns, radio buttons, and checkbox groups.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Preferences",
      properties: {
        language: {
          type: "string",
          title: "Language",
          oneOf: [
            { const: "en", title: "English" },
            { const: "es", title: "Spanish" },
            { const: "fr", title: "French" },
            { const: "de", title: "German" },
            { const: "zh", title: "Chinese" },
            { const: "ja", title: "Japanese" },
          ],
          default: "en",
        },
        country: {
          type: "string",
          title: "Country",
          anyOf: [
            { const: "US", title: "United States" },
            { const: "GB", title: "United Kingdom" },
            { const: "CA", title: "Canada" },
            { const: "AU", title: "Australia" },
            { const: "DE", title: "Germany" },
            { const: "FR", title: "France" },
          ],
        },
        priority: {
          type: "string",
          title: "Priority Level",
          oneOf: [
            { const: "p1", title: "?? Critical" },
            { const: "p2", title: "?? High" },
            { const: "p3", title: "?? Medium" },
            { const: "p4", title: "?? Low" },
          ],
          default: "p3",
        },
        interests: {
          type: "array",
          title: "Interests (checkbox group)",
          items: {
            type: "string",
            oneOf: [
              { const: "dev", title: "Development" },
              { const: "design", title: "Design" },
              { const: "pm", title: "Project Management" },
              { const: "qa", title: "Quality Assurance" },
              { const: "devops", title: "DevOps" },
            ],
          },
          uniqueItems: true,
        },
      },
    };

    const uiSchema = {
      "/priority": { "ui:widget": "radio" },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalShowHide = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:visibleWhen\` to show/hide fields based on other field values.

In this example, selecting "Other" from the dropdown reveals a text field to specify details.

\`\`\`javascript
const uiSchema = {
  '/otherReason': {
    'ui:visibleWhen': { '/reason': 'other' },
    'ui:requiredWhen': { '/reason': 'other' }
  }
};
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Feedback Form",
      properties: {
        reason: {
          type: "string",
          title: "How did you hear about us?",
          oneOf: [
            { const: "search", title: "Search Engine" },
            { const: "social", title: "Social Media" },
            { const: "friend", title: "Friend Referral" },
            { const: "other", title: "Other... (please specify)" },
          ],
        },
        otherReason: {
          type: "string",
          title: "Please specify",
          examples: ["Tell us more..."],
        },
      },
    };

    const uiSchema = {
      "/otherReason": {
        "ui:visibleWhen": { "/reason": "other" },
        "ui:requiredWhen": { "/reason": "other" },
      },
    };

    return html`
      <pds-form
        data-required
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const OneOfWithPresetValues = {
  parameters: {
    docs: {
      description: {
        story: `Demonstrates that \`oneOf\` and \`anyOf\` select fields correctly display preset values.

This story showcases the fix for a bug where select dropdowns wouldn't show the selected value when using \`.values\` to preset form data.

### Example Schema:
\`\`\`javascript
{
  organizationType: {
    oneOf: [
      { const: "ngo", title: "Non-Governmental Organization" },
      { const: "charity", title: "Charitable Organization" },
      { const: "company", title: "Commercial Company" }
    ]
  }
}
\`\`\`

### Preset Values:
\`\`\`javascript
<pds-form 
  .values=$\{{ organizationType: "charity", category: "health" }}
  ...
>
\`\`\`

The dropdowns should correctly show "Charitable Organization" and "Health & Medical" as selected.`,
      },
      source: {
        code: `<pds-form
  data-required
  .jsonSchema=\${schema}
  .uiSchema=\${uiSchema}
  .values=\${initialValues}
  @pw:submit=\${(e) => toastFormData(e.detail)}
></pds-form>`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Organization Registration",
      properties: {
        organizationName: {
          type: "string",
          title: "Organization Name",
          examples: ["Red Cross International"],
        },
        organizationType: {
          type: "string",
          title: "Organization Type",
          oneOf: [
            { const: "ngo", title: "Non-Governmental Organization" },
            { const: "charity", title: "Charitable Organization" },
            { const: "company", title: "Commercial Company" },
            { const: "government", title: "Government Agency" },
            { const: "educational", title: "Educational Institution" },
          ],
        },
        category: {
          type: "string",
          title: "Primary Category",
          anyOf: [
            { const: "health", title: "Health & Medical" },
            { const: "education", title: "Education & Research" },
            { const: "environment", title: "Environment & Conservation" },
            { const: "social", title: "Social Services" },
            { const: "arts", title: "Arts & Culture" },
            { const: "technology", title: "Technology & Innovation" },
          ],
        },
        registrationNumber: {
          type: "string",
          title: "Registration Number",
          examples: ["123-456-789"],
        },
        country: {
          type: "string",
          title: "Country",
          enum: ["NL", "BE", "DE", "FR", "GB"],
        },
      },
      required: ["organizationName", "organizationType", "category"],
    };

    const uiSchema = {
      "ui:layout": "grid",
      "ui:layoutOptions": {
        columns: "auto",   // Auto-fit columns
        autoSize: "md",    // Min column width (grid-auto-md)
        gap: "md"
      }
    };

    // Preset values that should be correctly selected in the dropdowns
    const initialValues = {
      organizationName: "Global Health Foundation",
      organizationType: "charity",
      category: "health",
      registrationNumber: "974983702",
      country: "NL",
    };

    return html`
      <div class="alert alert-info">
        <p>
          <strong>? This form has preset values:</strong> The dropdowns should
          correctly show "Charitable Organization", "Health & Medical", and
          "NL" as selected.
        </p>
        <p>
          Try changing the values and submitting to see how oneOf/anyOf/enum
          work together.
        </p>
      </div>
      <pds-form
        data-required
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalRequired = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:requiredWhen\` to make fields conditionally required.

In this example, toggling "Prefer phone contact" makes the phone field required and disables the email field.

\`\`\`javascript
const uiSchema = {
  '/email': {
    'ui:disabledWhen': { '/preferPhone': true }
  },
  '/phone': {
    'ui:requiredWhen': { '/preferPhone': true }
  }
};
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Contact Preferences",
      properties: {
        preferPhone: {
          type: "boolean",
          title: "I prefer to be contacted by phone",
          default: false,
        },
        email: {
          type: "string",
          format: "email",
          title: "Email Address",
          examples: ["you@example.com"],
        },
        phone: {
          type: "string",
          title: "Phone Number",
          examples: ["555-123-4567"],
        },
      },
      required: ["email"],
    };

    const uiSchema = {
      "/email": {
        "ui:disabledWhen": { "/preferPhone": true },
        "ui:icon": "envelope",
      },
      "/phone": {
        "ui:requiredWhen": { "/preferPhone": true },
        "ui:icon": "phone",
      },
    };

    return html`
      <pds-form
        data-required
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalComplex = {
  parameters: {
    docs: {
      description: {
        story: `A comprehensive example combining multiple conditional features with accordion layout to reduce visual complexity.

### Features demonstrated:
- **Accordion Sections**: Related fields grouped into collapsible sections
- **Show/Hide**: Business account section appears only for business accounts; shipping address hidden for pickup
- **Conditional Required**: Company name required for business; phone required when preferred
- **Disable**: Email disabled when phone is preferred
- **Calculations**: Full name, subtotal, shipping cost, and total are all computed automatically

The accordion layout prevents awkward field jumping between columns and makes the form easier to navigate.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Order Form",
      properties: {
        accountType: {
          type: "object",
          title: "Account Type",
          properties: {
            type: {
              type: "string",
              title: "Select Account Type",
              oneOf: [
                { const: "personal", title: "Personal" },
                { const: "business", title: "Business" },
              ],
              default: "personal",
            },
            companyName: {
              type: "string",
              title: "Company Name",
              examples: ["Acme Inc."],
            },
          },
        },
        contactPreferences: {
          type: "object",
          title: "Contact Information",
          properties: {
            preferPhone: {
              type: "boolean",
              title: "I prefer to be contacted by phone",
              default: false,
            },
            email: {
              type: "string",
              format: "email",
              title: "Email",
              examples: ["you@example.com"],
            },
            phone: {
              type: "string",
              title: "Phone",
              examples: ["555-123-4567"],
            },
          },
        },
        customerDetails: {
          type: "object",
          title: "Customer Details",
          properties: {
            firstName: {
              type: "string",
              title: "First Name",
              examples: ["John"],
            },
            lastName: {
              type: "string",
              title: "Last Name",
              examples: ["Doe"],
            },
            fullName: {
              type: "string",
              title: "Full Name (calculated)",
            },
          },
        },
        deliveryOptions: {
          type: "object",
          title: "Delivery & Shipping",
          properties: {
            deliveryType: {
              type: "string",
              title: "Delivery Type",
              oneOf: [
                { const: "standard", title: "Standard (5-7 days)" },
                { const: "express", title: "Express (1-2 days)" },
                { const: "pickup", title: "Pickup" },
              ],
              default: "standard",
            },
            shippingAddress: {
              type: "object",
              title: "Shipping Address",
              properties: {
                street: {
                  type: "string",
                  title: "Street",
                  examples: ["123 Main St"],
                },
                city: { type: "string", title: "City", examples: ["New York"] },
                zip: { type: "string", title: "ZIP Code", examples: ["10001"] },
              },
            },
          },
        },
        orderCalculations: {
          type: "object",
          title: "Order Summary",
          properties: {
            quantity: {
              type: "integer",
              title: "Quantity",
              minimum: 1,
              default: 1,
            },
            unitPrice: {
              type: "number",
              title: "Unit Price",
              default: 29.99,
            },
            subtotal: {
              type: "number",
              title: "Subtotal",
            },
            shippingCost: {
              type: "number",
              title: "Shipping Cost",
            },
            total: {
              type: "number",
              title: "Total",
            },
          },
        },
      },
      required: ["contactPreferences", "customerDetails", "deliveryOptions"],
    };

    const uiSchema = {
      "ui:layout": "accordion",
      "ui:layoutOptions": { openFirst: true },

      "/accountType": {
        "ui:layout": "stack",
        "companyName": {
          "ui:visibleWhen": { "/accountType/type": "business" },
          "ui:requiredWhen": { "/accountType/type": "business" },
        },
      },
      "/contactPreferences": {
        "ui:layout": "stack",
        "email": {
          "ui:disabledWhen": { "/contactPreferences/preferPhone": true },
          "ui:icon": "envelope",
        },
        "phone": {
          "ui:requiredWhen": { "/contactPreferences/preferPhone": true },
          "ui:icon": "phone",
        },
      },
      "/customerDetails": {
        "ui:layout": "flex",
        "ui:layoutOptions": { gap: "md", wrap: true },
        "firstName": {},
        "lastName": {},
        "fullName": {
          "ui:calculate": { $concat: ["/customerDetails/firstName", " ", "/customerDetails/lastName"] },
        },
      },
      "/deliveryOptions": {
        "ui:layout": "stack",
        "shippingAddress": {
          "ui:visibleWhen": { "/deliveryOptions/deliveryType": { $ne: "pickup" } },
          "ui:layout": "flex",
          "ui:layoutOptions": { gap: "sm", wrap: true },
        },
      },
      "/orderCalculations": {
        "ui:layout": "stack",
        "subtotal": {
          "ui:calculate": { $multiply: ["/orderCalculations/quantity", "/orderCalculations/unitPrice"] },
        },
        "shippingCost": {
          "ui:calculate": {
            $if: {
              cond: { "/deliveryOptions/deliveryType": "express" },
              then: 25,
              else: {
                $if: {
                  cond: { "/deliveryOptions/deliveryType": "pickup" },
                  then: 0,
                  else: 10,
                },
              },
            },
          },
        },
        "total": {
          "ui:calculate": { $sum: ["/orderCalculations/subtotal", "/orderCalculations/shippingCost"] },
        },
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Try these interactions:</strong></p>
        <ul>
          <li>
            Open <strong>Account Type</strong>, change to "Business" ? Company Name field appears and becomes required
          </li>
          <li>
            Open <strong>Contact Information</strong>, toggle <strong>"Prefer phone contact"</strong> ? Email is disabled, Phone becomes required
          </li>
          <li>
            Open <strong>Customer Details</strong>, type in <strong>First/Last Name</strong> ? Full Name is calculated automatically
          </li>
          <li>
            Open <strong>Delivery & Shipping</strong>, select <strong>"Pickup"</strong> ? Shipping Address section is hidden
          </li>
          <li>
            Open <strong>Order Summary</strong>, change <strong>Quantity</strong> or <strong>Delivery Type</strong> ? Costs update automatically
          </li>
        </ul>
      </div>
      <pds-form
        data-required
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => {
          console.log('? Form Data Structure:', e.detail);
          toastFormData(e.detail);
        }}
      ></pds-form>
    `;
  },
};

export const CalculatedValues = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:calculate\` to compute values from other fields. Calculated fields are **read-only by default**.

### Available Operators
- \`$concat\`: Join strings ? \`{ "$concat": ["/first", " ", "/last"] }\`
- \`$sum\`: Add numbers ? \`{ "$sum": ["/a", "/b", "/c"] }\`
- \`$subtract\`: Subtract ? \`{ "$subtract": ["/total", "/discount"] }\`
- \`$multiply\`: Multiply ? \`{ "$multiply": ["/qty", "/price"] }\`
- \`$divide\`: Divide ? \`{ "$divide": ["/total", "/count"] }\`
- \`$coalesce\`: First non-empty ? \`{ "$coalesce": ["/nickname", "/firstName"] }\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Invoice Calculator",
      properties: {
        firstName: { type: "string", title: "First Name", examples: ["John"] },
        lastName: { type: "string", title: "Last Name", examples: ["Doe"] },
        nickname: {
          type: "string",
          title: "Nickname (optional)",
          examples: ["Johnny"],
        },
        displayName: {
          type: "string",
          title: "Display Name (nickname or first name)",
        },
        fullName: { type: "string", title: "Full Name" },
        quantity: {
          type: "integer",
          title: "Quantity",
          minimum: 1,
          default: 2,
        },
        unitPrice: { type: "number", title: "Unit Price ($)", default: 49.99 },
        subtotal: { type: "number", title: "Subtotal" },
        taxRate: { type: "number", title: "Tax Rate (%)", default: 8.5 },
        taxAmount: { type: "number", title: "Tax Amount" },
        discount: { type: "number", title: "Discount ($)", default: 10 },
        total: { type: "number", title: "Grand Total" },
      },
    };

    const uiSchema = {
      "ui:layout": "grid",
      "ui:layoutOptions": { columns: 2, gap: "md" },

      // String concatenation
      "/fullName": {
        "ui:calculate": { $concat: ["/firstName", " ", "/lastName"] },
      },

      // Coalesce: use nickname if provided, otherwise first name
      "/displayName": {
        "ui:calculate": { $coalesce: ["/nickname", "/firstName"] },
      },

      // Multiply: quantity � price
      "/subtotal": {
        "ui:calculate": { $multiply: ["/quantity", "/unitPrice"] },
      },

      // Divide + multiply for tax: (subtotal � taxRate) / 100
      "/taxAmount": {
        "ui:calculate": {
          $divide: [{ $multiply: ["/subtotal", "/taxRate"] }, 100],
        },
      },

      // Sum and subtract: subtotal + tax - discount
      "/total": {
        "ui:calculate": {
          $subtract: [{ $sum: ["/subtotal", "/taxAmount"] }, "/discount"],
        },
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>All calculated fields update automatically:</strong></p>
        <ul>
          <li>
            <strong>Full Name</strong> = First + Last (using
            <code>$concat</code>)
          </li>
          <li>
            <strong>Display Name</strong> = Nickname if set, otherwise First
            Name (using <code>$coalesce</code>)
          </li>
          <li>
            <strong>Subtotal</strong> = Quantity � Unit Price (using
            <code>$multiply</code>)
          </li>
          <li>
            <strong>Tax Amount</strong> = Subtotal � Tax Rate � 100 (using
            <code>$divide</code>)
          </li>
          <li>
            <strong>Grand Total</strong> = Subtotal + Tax - Discount (using
            <code>$sum</code> and <code>$subtract</code>)
          </li>
        </ul>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const CalculateWithOverride = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:calculateOverride: true\` to allow users to edit calculated values.

The field starts with a computed value but the user can modify it. This is useful for:
- Suggested values that can be customized
- Default calculations that may need manual adjustment
- "Smart defaults" that users can override

\`\`\`javascript
'/suggestedPrice': {
  'ui:calculate': { '$multiply': ['/baseCost', 1.25] },
  'ui:calculateOverride': true  // User can edit
}
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Product Pricing",
      properties: {
        productName: {
          type: "string",
          title: "Product Name",
          examples: ["Widget Pro"],
        },
        baseCost: { type: "number", title: "Base Cost ($)", default: 100 },
        suggestedPrice: { type: "number", title: "Suggested Price (editable)" },
        finalPrice: { type: "number", title: "Final Price (read-only)" },
        profit: { type: "number", title: "Profit Margin" },
      },
    };

    const uiSchema = {
      // Suggested price: calculated but editable
      "/suggestedPrice": {
        "ui:calculate": { $multiply: ["/baseCost", 1.5] },
        "ui:calculateOverride": true,
        "ui:help": "?? Calculated as 1.5� base cost, but you can adjust it",
      },

      // Final price: read-only calculation
      "/finalPrice": {
        "ui:calculate": {
          $coalesce: ["/suggestedPrice", { $multiply: ["/baseCost", 1.5] }],
        },
        "ui:help": "?? Read-only: uses your suggested price",
      },

      // Profit: final - base
      "/profit": {
        "ui:calculate": { $subtract: ["/finalPrice", "/baseCost"] },
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Compare editable vs read-only calculations:</strong></p>
        <ul>
          <li>
            <strong>Suggested Price</strong> starts at 1.5� base cost but
            <em>you can edit it</em>
          </li>
          <li>
            <strong>Final Price</strong> is read-only and reflects your
            suggested price
          </li>
          <li>
            <strong>Profit Margin</strong> updates based on final price - base
            cost
          </li>
        </ul>
        <p>
          Try changing the base cost, then manually adjusting the suggested
          price!
        </p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalWithIf = {
  parameters: {
    docs: {
      description: {
        story: `Use \`$if\` for conditional calculations based on other field values.

\`\`\`javascript
'/shippingCost': {
  'ui:calculate': {
    '$if': {
      'cond': { '/membership': 'premium' },
      'then': 0,
      'else': 9.99
    }
  }
}
\`\`\`

You can nest \`$if\` expressions for multiple conditions.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Membership Pricing",
      properties: {
        membership: {
          type: "string",
          title: "Membership Level",
          oneOf: [
            { const: "basic", title: "Basic" },
            { const: "standard", title: "Standard" },
            { const: "premium", title: "Premium" },
          ],
          default: "basic",
        },
        orderAmount: { type: "number", title: "Order Amount ($)", default: 75 },
        discountPercent: { type: "number", title: "Discount (%)" },
        discountAmount: { type: "number", title: "Discount Amount ($)" },
        shippingCost: { type: "number", title: "Shipping Cost ($)" },
        finalTotal: { type: "number", title: "Final Total ($)" },
      },
    };

    const uiSchema = {
      // Discount percent based on membership: basic=0%, standard=10%, premium=20%
      "/discountPercent": {
        "ui:calculate": {
          $if: {
            cond: { "/membership": "premium" },
            then: 20,
            else: {
              $if: {
                cond: { "/membership": "standard" },
                then: 10,
                else: 0,
              },
            },
          },
        },
      },

      // Discount amount
      "/discountAmount": {
        "ui:calculate": {
          $divide: [{ $multiply: ["/orderAmount", "/discountPercent"] }, 100],
        },
      },

      // Shipping: free for premium, $5.99 for standard, $9.99 for basic
      "/shippingCost": {
        "ui:calculate": {
          $if: {
            cond: { "/membership": "premium" },
            then: 0,
            else: {
              $if: {
                cond: { "/membership": "standard" },
                then: 5.99,
                else: 9.99,
              },
            },
          },
        },
      },

      // Final total
      "/finalTotal": {
        "ui:calculate": {
          $sum: [
            { $subtract: ["/orderAmount", "/discountAmount"] },
            "/shippingCost",
          ],
        },
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Pricing varies by membership level:</strong></p>
        <table style="width: 100%; text-align: left;">
          <thead>
            <tr>
              <th>Level</th>
              <th>Discount</th>
              <th>Shipping</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic</td>
              <td>0%</td>
              <td>$9.99</td>
            </tr>
            <tr>
              <td>Standard</td>
              <td>10%</td>
              <td>$5.99</td>
            </tr>
            <tr>
              <td>Premium</td>
              <td>20%</td>
              <td>FREE</td>
            </tr>
          </tbody>
        </table>
        <p>
          Change the <strong>Membership Level</strong> to see all values update!
        </p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalWithRegex = {
  parameters: {
    docs: {
      description: {
        story: `Use \`$regex\` to match patterns in field values.

\`\`\`javascript
'/warning': {
  'ui:visibleWhen': { 
    '/email': { '$regex': '@(gmail|yahoo|hotmail)\\\\.com$' }
  }
}
\`\`\`

This is useful for:
- Validating formats (emails, phone numbers, URLs)
- Showing warnings for specific patterns
- Enabling features based on input format`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Email Verification",
      properties: {
        email: {
          type: "string",
          format: "email",
          title: "Email Address",
          examples: ["you@company.com"],
        },
        personalEmailWarning: {
          type: "string",
          title: "Personal Email Notice",
          default:
            "?? Personal email detected. Consider using a work email for business accounts.",
        },
        workEmailConfirmation: {
          type: "string",
          title: "Work Email Confirmed",
          default:
            "? Work email detected. You qualify for enterprise features.",
        },
        websiteUrl: {
          type: "string",
          title: "Website URL",
          examples: ["https://example.com"],
        },
        secureUrlBadge: {
          type: "string",
          title: "Security Status",
          default: "?? Secure connection (HTTPS)",
        },
        insecureUrlWarning: {
          type: "string",
          title: "Security Warning",
          default: "?? Insecure connection. Consider using HTTPS.",
        },
      },
    };

    const uiSchema = {
      // Show warning for personal email providers
      "/personalEmailWarning": {
        "ui:visibleWhen": {
          "/email": {
            $regex: "@(gmail|yahoo|hotmail|outlook|aol)\\.(com|net|org)$",
          },
        },
        "ui:widget": "const",
      },

      // Show confirmation for non-personal emails (work domains)
      "/workEmailConfirmation": {
        "ui:visibleWhen": {
          $and: [
            { "/email": { $regex: "@.+\\..+$" } }, // Has @ and domain
            {
              "/email": {
                $regex: "^(?!.*@(gmail|yahoo|hotmail|outlook|aol)\\.)",
              },
            }, // NOT personal
          ],
        },
        "ui:widget": "const",
      },

      // Show secure badge for HTTPS URLs
      "/secureUrlBadge": {
        "ui:visibleWhen": { "/websiteUrl": { $regex: "^https://" } },
        "ui:widget": "const",
      },

      // Show warning for HTTP URLs
      "/insecureUrlWarning": {
        "ui:visibleWhen": { "/websiteUrl": { $regex: "^http://[^s]" } },
        "ui:widget": "const",
      },
    };

    return html`
      <div class="alert alert-info">
        <p>
          <strong>Pattern matching with <code>$regex</code>:</strong>
        </p>
        <ul>
          <li>
            Type a <strong>personal email</strong> (gmail, yahoo, etc.) ?
            Warning appears
          </li>
          <li>
            Type a <strong>work email</strong> (company.com) ? Confirmation
            appears
          </li>
          <li>Enter an <strong>https://</strong> URL ? Secure badge shown</li>
          <li>
            Enter an <strong>http://</strong> URL ? Insecure warning shown
          </li>
        </ul>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalWithLogicalOperators = {
  parameters: {
    docs: {
      description: {
        story: `Combine conditions with \`$and\`, \`$or\`, and \`$not\` for complex logic.

\`\`\`javascript
// AND: All conditions must be true
'ui:visibleWhen': {
  '$and': [
    { '/age': { '$gte': 18 } },
    { '/country': 'US' }
  ]
}

// OR: Any condition can be true
'ui:visibleWhen': {
  '$or': [
    { '/role': 'admin' },
    { '/role': 'moderator' }
  ]
}

// NOT: Invert a condition
'ui:visibleWhen': {
  '$not': { '/status': 'banned' }
}
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Feature Access Control",
      properties: {
        userRole: {
          type: "string",
          title: "User Role",
          oneOf: [
            { const: "guest", title: "Guest" },
            { const: "member", title: "Member" },
            { const: "moderator", title: "Moderator" },
            { const: "admin", title: "Admin" },
          ],
          default: "guest",
        },
        accountStatus: {
          type: "string",
          title: "Account Status",
          oneOf: [
            { const: "pending", title: "Pending Verification" },
            { const: "active", title: "Active" },
            { const: "suspended", title: "Suspended" },
          ],
          default: "active",
        },
        premiumMember: {
          type: "boolean",
          title: "Premium Membership",
          default: false,
        },
        age: {
          type: "integer",
          title: "Age",
          minimum: 13,
          default: 25,
        },
        // Feature flags (shown/hidden based on conditions)
        basicFeatures: {
          type: "string",
          title: "Basic Features",
          default: "? You have access to basic features",
        },
        premiumFeatures: {
          type: "string",
          title: "Premium Features",
          default: "? Premium features unlocked!",
        },
        moderatorTools: {
          type: "string",
          title: "Moderator Tools",
          default: "??? Moderator tools available",
        },
        adminPanel: {
          type: "string",
          title: "Admin Panel",
          default: "?? Full admin access granted",
        },
        ageRestrictedContent: {
          type: "string",
          title: "Age-Restricted Content",
          default: "?? Adult content unlocked",
        },
        suspendedNotice: {
          type: "string",
          title: "Account Suspended",
          default: "?? Your account is suspended. Contact support.",
        },
      },
    };

    const uiSchema = {
      "ui:layout": "grid",
      "ui:layoutOptions": { columns: 2, gap: "md" },

      // Basic features: available to active non-guest users
      // $and + $not combined
      "/basicFeatures": {
        "ui:visibleWhen": {
          $and: [
            { $not: { "/userRole": "guest" } },
            { "/accountStatus": "active" },
          ],
        },
        "ui:widget": "const",
      },

      // Premium features: premium member OR admin (admins get everything)
      // $or operator
      "/premiumFeatures": {
        "ui:visibleWhen": {
          $and: [
            { "/accountStatus": "active" },
            {
              $or: [{ "/premiumMember": true }, { "/userRole": "admin" }],
            },
          ],
        },
        "ui:widget": "const",
      },

      // Moderator tools: moderator OR admin
      "/moderatorTools": {
        "ui:visibleWhen": {
          $and: [
            { "/accountStatus": "active" },
            {
              $or: [{ "/userRole": "moderator" }, { "/userRole": "admin" }],
            },
          ],
        },
        "ui:widget": "const",
      },

      // Admin panel: admin only
      "/adminPanel": {
        "ui:visibleWhen": {
          $and: [{ "/userRole": "admin" }, { "/accountStatus": "active" }],
        },
        "ui:widget": "const",
      },

      // Age-restricted: 18+ and active
      "/ageRestrictedContent": {
        "ui:visibleWhen": {
          $and: [
            { "/age": { $gte: 18 } },
            { "/accountStatus": "active" },
            { $not: { "/userRole": "guest" } },
          ],
        },
        "ui:widget": "const",
      },

      // Suspended notice: shown when suspended
      "/suspendedNotice": {
        "ui:visibleWhen": { "/accountStatus": "suspended" },
        "ui:widget": "const",
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Combine conditions with logical operators:</strong></p>
        <ul>
          <li><strong>$and</strong>: All conditions must be true</li>
          <li><strong>$or</strong>: Any condition can be true</li>
          <li><strong>$not</strong>: Inverts a condition</li>
        </ul>
        <p>
          Try different combinations of Role, Status, Premium, and Age to see
          which features appear!
        </p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalWithComparison = {
  parameters: {
    docs: {
      description: {
        story: `Use comparison operators for numeric and value-based conditions.

| Operator | Description | Example |
|----------|-------------|---------|
| \`$eq\` | Equals | \`{ "/status": { "$eq": "active" } }\` |
| \`$ne\` | Not equals | \`{ "/role": { "$ne": "guest" } }\` |
| \`$gt\` | Greater than | \`{ "/age": { "$gt": 18 } }\` |
| \`$gte\` | Greater or equal | \`{ "/score": { "$gte": 80 } }\` |
| \`$lt\` | Less than | \`{ "/qty": { "$lt": 10 } }\` |
| \`$lte\` | Less or equal | \`{ "/price": { "$lte": 100 } }\` |
| \`$in\` | In array | \`{ "/tier": { "$in": ["gold", "platinum"] } }\` |
| \`$nin\` | Not in array | \`{ "/country": { "$nin": ["XX", "YY"] } }\` |
| \`$exists\` | Has value | \`{ "/email": { "$exists": true } }\` |`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Order Validation",
      properties: {
        quantity: {
          type: "integer",
          title: "Quantity",
          minimum: 1,
          default: 5,
        },
        lowStockWarning: {
          type: "string",
          title: "Low Stock",
          default: "?? Low quantity - ships within 24h",
        },
        bulkOrderNotice: {
          type: "string",
          title: "Bulk Order",
          default: "?? Bulk order! Contact sales for discount.",
        },
        outOfStockError: {
          type: "string",
          title: "Out of Stock",
          default: "? Quantity too high - only 100 in stock",
        },

        country: {
          type: "string",
          title: "Shipping Country",
          oneOf: [
            { const: "US", title: "United States" },
            { const: "CA", title: "Canada" },
            { const: "UK", title: "United Kingdom" },
            { const: "DE", title: "Germany" },
            { const: "FR", title: "France" },
            { const: "AU", title: "Australia" },
            { const: "JP", title: "Japan" },
            { const: "OTHER", title: "Other" },
          ],
          default: "US",
        },
        domesticShipping: {
          type: "string",
          title: "Domestic Shipping",
          default: "?? Free domestic shipping (US/CA)",
        },
        euShipping: {
          type: "string",
          title: "EU Shipping",
          default: "???? EU shipping available - 5-7 days",
        },
        internationalShipping: {
          type: "string",
          title: "International",
          default: "?? International shipping - 10-14 days",
        },
        restrictedCountry: {
          type: "string",
          title: "Restricted",
          default: "?? Sorry, we cannot ship to this location",
        },

        couponCode: {
          type: "string",
          title: "Coupon Code (optional)",
          examples: ["SAVE20"],
        },
        couponApplied: {
          type: "string",
          title: "Coupon Status",
          default: "??? Coupon code detected! Will be validated at checkout.",
        },
      },
    };

    const uiSchema = {
      // $lt: Low quantity warning (1-3)
      "/lowStockWarning": {
        "ui:visibleWhen": { "/quantity": { $lte: 3 } },
        "ui:widget": "const",
      },

      // $gte: Bulk order notice (50+)
      "/bulkOrderNotice": {
        "ui:visibleWhen": { "/quantity": { $gte: 50 } },
        "ui:widget": "const",
      },

      // $gt: Out of stock (>100)
      "/outOfStockError": {
        "ui:visibleWhen": { "/quantity": { $gt: 100 } },
        "ui:widget": "const",
      },

      // $in: Domestic shipping (US, CA)
      "/domesticShipping": {
        "ui:visibleWhen": { "/country": { $in: ["US", "CA"] } },
        "ui:widget": "const",
      },

      // $in: EU shipping
      "/euShipping": {
        "ui:visibleWhen": { "/country": { $in: ["UK", "DE", "FR"] } },
        "ui:widget": "const",
      },

      // $in: International (AU, JP)
      "/internationalShipping": {
        "ui:visibleWhen": { "/country": { $in: ["AU", "JP"] } },
        "ui:widget": "const",
      },

      // $eq: Restricted country
      "/restrictedCountry": {
        "ui:visibleWhen": { "/country": { $eq: "OTHER" } },
        "ui:widget": "const",
      },

      // $exists: Coupon code entered
      "/couponApplied": {
        "ui:visibleWhen": { "/couponCode": { $exists: true } },
        "ui:widget": "const",
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Comparison operators in action:</strong></p>
        <ul>
          <li>
            Set <strong>Quantity</strong> to 1-3 ? Low stock warning
            (<code>$lte</code>)
          </li>
          <li>
            Set <strong>Quantity</strong> to 50+ ? Bulk order notice
            (<code>$gte</code>)
          </li>
          <li>
            Set <strong>Quantity</strong> over 100 ? Out of stock error
            (<code>$gt</code>)
          </li>
          <li>
            Select <strong>Country</strong> ? Different shipping messages
            (<code>$in</code>)
          </li>
          <li>
            Enter a <strong>Coupon Code</strong> ? Confirmation appears
            (<code>$exists</code>)
          </li>
        </ul>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const ConditionalDisabledFields = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:disabledWhen\` to disable fields based on conditions.

Disabled fields remain visible but cannot be edited. Use this for:
- Mutually exclusive options
- Fields that become irrelevant based on other choices
- Read-only states based on form context

\`\`\`javascript
'/billingAddress': {
  'ui:disabledWhen': { '/sameAsShipping': true }
}
\`\`\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Checkout Form",
      properties: {
        shippingAddress: {
          type: "string",
          title: "Shipping Address",
          examples: ["123 Main St, City, ST 12345"],
        },
        sameAsShipping: {
          type: "boolean",
          title: "Billing address same as shipping",
          default: true,
        },
        billingAddress: {
          type: "string",
          title: "Billing Address",
          examples: ["456 Oak Ave, Town, ST 67890"],
        },

        paymentMethod: {
          type: "string",
          title: "Payment Method",
          oneOf: [
            { const: "credit", title: "Credit Card" },
            { const: "debit", title: "Debit Card" },
            { const: "paypal", title: "PayPal" },
            { const: "crypto", title: "Cryptocurrency" },
          ],
          default: "credit",
        },
        cardNumber: {
          type: "string",
          title: "Card Number",
          examples: ["4111 1111 1111 1111"],
        },
        cardExpiry: {
          type: "string",
          title: "Expiry (MM/YY)",
          examples: ["12/25"],
        },
        cardCvv: { type: "string", title: "CVV", examples: ["123"] },
        paypalEmail: {
          type: "string",
          format: "email",
          title: "PayPal Email",
          examples: ["you@paypal.com"],
        },
        cryptoWallet: {
          type: "string",
          title: "Wallet Address",
          examples: ["0x1234..."],
        },

        orderLocked: {
          type: "boolean",
          title: "?? Lock order (prevent changes)",
          default: false,
        },
        notes: {
          type: "string",
          title: "Order Notes",
          examples: ["Special instructions..."],
        },
      },
    };

    const uiSchema = {
      // Billing address disabled when "same as shipping" is checked
      "/billingAddress": {
        "ui:disabledWhen": { "/sameAsShipping": true },
        "ui:help": 'Uncheck "same as shipping" to edit',
      },

      // Card fields disabled when not using card payment
      "/cardNumber": {
        "ui:disabledWhen": { "/paymentMethod": { $nin: ["credit", "debit"] } },
      },
      "/cardExpiry": {
        "ui:disabledWhen": { "/paymentMethod": { $nin: ["credit", "debit"] } },
      },
      "/cardCvv": {
        "ui:disabledWhen": { "/paymentMethod": { $nin: ["credit", "debit"] } },
      },

      // PayPal email disabled when not using PayPal
      "/paypalEmail": {
        "ui:disabledWhen": { "/paymentMethod": { $ne: "paypal" } },
      },

      // Crypto wallet disabled when not using crypto
      "/cryptoWallet": {
        "ui:disabledWhen": { "/paymentMethod": { $ne: "crypto" } },
      },

      // Notes disabled when order is locked
      "/notes": {
        "ui:disabledWhen": { "/orderLocked": true },
        "ui:widget": "textarea",
        "ui:help": "Lock order to prevent changes",
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Fields become disabled based on conditions:</strong></p>
        <ul>
          <li>
            Check <strong>"Same as shipping"</strong> ? Billing address disabled
          </li>
          <li>
            Change <strong>Payment Method</strong> ? Only relevant fields stay
            enabled
          </li>
          <li>Check <strong>"Lock order"</strong> ? Notes field disabled</li>
        </ul>
        <p>Disabled fields show their value but prevent editing.</p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

// ============================================
// Custom Content Injection Stories
// ============================================

export const CustomContentBeforeAfter = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:before\` and \`ui:after\` to inject custom content around fields or fieldsets.

### Value Types
- **Function**: \`(field) => html\\\`...\\\`\` - full access to render context
- **Slot reference**: \`"slot:mySlot"\` - renders a slotted element by name

### Field Context
The function receives a \`field\` object with: \`{ path, schema, value, label, id, get, set, attrs, host }\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "User Registration",
      properties: {
        username: { type: "string", title: "Username", minLength: 3 },
        email: { type: "string", title: "Email", format: "email" },
        password: { type: "string", title: "Password", minLength: 8 },
        confirmPassword: { type: "string", title: "Confirm Password" },
        acceptTerms: { type: "boolean", title: "I accept the terms" },
      },
    };

    const uiSchema = {
      // Add a header before the username field
      "/username": {
        "ui:before": (field) => html`
          <div class="alert alert-info">
            <span class="alert-icon">
              <pds-icon icon="info" size="md"> </pds-icon>
            </span>
            <div>
              <h4 class="alert-title">Account Info</h4>
              <p>Choose a unique username and secure password.</p>
            </div>
          </div>
        `,
      },

      // Add validation hint after email
      "/email": {
        "ui:after": (field) =>
          field.value && !field.value.includes("@")
            ? html`<div class="text-sm text-danger">
                Please enter a valid email address
              </div>`
            : nothing,
      },

      // Add password strength indicator after password
      "/password": {
        "ui:widget": "password",
        "ui:after": (field) => {
          if (!field.value) return nothing;
          const strength =
            field.value.length < 8
              ? "Weak"
              : field.value.length < 12
              ? "Medium"
              : "Strong";
          const color =
            strength === "Weak"
              ? "danger"
              : strength === "Medium"
              ? "warning"
              : "success";
          return html`<div class="text-sm text-${color}">
            Password strength: ${strength}
          </div>`;
        },
      },

      // Add legal notice before terms checkbox
      "/acceptTerms": {
        "ui:before": (field) => html`
          <hr style="margin: var(--spacing-md) 0;" />
          <p class="text-sm text-muted">
            By registering, you agree to our
            <a href="#terms">Terms of Service</a> and
            <a href="#privacy">Privacy Policy</a>.
          </p>
        `,
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const CustomContentRender = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:render\` to completely replace a field's rendering with your own template.

The render function receives a \`field\` object with: \`{ id, path, label, value, schema, ui, attrs, get, set, host }\`

This is like using \`defineRenderer()\` but inline in the uiSchema.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Product Review",
      properties: {
        productName: {
          type: "string",
          title: "Product",
          default: "Wireless Headphones",
        },
        rating: {
          type: "integer",
          title: "Rating",
          minimum: 1,
          maximum: 5,
          default: 4,
        },
        review: { type: "string", title: "Review" },
        recommend: { type: "boolean", title: "Would recommend", default: true },
      },
    };

    const uiSchema = {
      // Custom star rating widget
      "/rating": {
        "ui:render": (field) => {
          const stars = [1, 2, 3, 4, 5];
          return html`
            <fieldset data-path=${field.path}>
              <legend>${field.label}</legend>
              <div
                class="flex gap-xs"
                role="radiogroup"
                aria-label="${field.label}"
              >
                ${stars.map(
                  (star) => html`
                    <button
                      type="button"
                      class="btn btn-sm ${star <= (field.value || 0)
                        ? "btn-primary"
                        : "btn-outline"}"
                      @click=${() => field.set(star)}
                      aria-label="${star} star${star > 1 ? "s" : ""}"
                      aria-pressed=${star <= (field.value || 0)}
                    >
                      ?
                    </button>
                  `
                )}
              </div>
              <input
                type="hidden"
                name=${field.path}
                .value=${String(field.value || "")}
              />
            </fieldset>
          `;
        },
      },

      // Custom toggle card for recommendation
      "/recommend": {
        "ui:render": (field) => html`
          <div
            class="card surface-elevated p-md cursor-pointer flex items-center gap-md"
            @click=${() => field.set(!field.value)}
            role="checkbox"
            aria-checked=${!!field.value}
            tabindex="0"
            @keydown=${(e) =>
              e.key === " " && (e.preventDefault(), field.set(!field.value))}
          >
            <span
              style="cursor: pointer; font-size: 3rem; color: var(--color-${field.value
                ? "success"
                : "neutral"}-500)"
              >${field.value ? "????" : "????"}</span
            >
            <div>
              <strong>${field.label}</strong>
              <p class="text-sm text-muted">
                ${field.value
                  ? "Yes, I would recommend this!"
                  : "No, I would not recommend this"}
              </p>
            </div>
            <input
              type="hidden"
              name=${field.path}
              .value=${String(!!field.value)}
            />
          </div>
        `,
      },

      "/review": {
        "ui:widget": "textarea",
        "ui:help": "Share your experience with this product",
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Custom rendered fields:</strong></p>
        <ul>
          <li><strong>Rating</strong> uses a custom star button widget</li>
          <li><strong>Would recommend</strong> uses a custom toggle card</li>
        </ul>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const CustomContentWrapper = {
  parameters: {
    docs: {
      description: {
        story: `Use \`ui:wrapper\` to customize how a field is wrapped (replacing the default \`<label>\` structure).

A common use case is adding a **live character counter** to textarea fields.

The wrapper function receives a \`field\` object with: \`{ control, label, help, id, value, schema, ...context }\``,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Author Profile",
      properties: {
        name: { type: "string", title: "Display Name", maxLength: 50 },
        bio: { type: "string", title: "Bio", maxLength: 280 },
        about: { type: "string", title: "About Me", maxLength: 1000 },
      },
    };

    // Wrapper with live character counter
    const charCountWrapper = (field) => {
      const maxLength = field.schema.maxLength;
      const currentLength = (field.value || "").length;
      const remaining = maxLength - currentLength;
      const isWarning = remaining <= 20 && remaining > 0;
      const isOver = remaining <= 0;

      return html`
        <label for=${field.id}>
          <div class="flex justify-between items-center">
            <span data-label>${field.label}</span>
            <span
              class="text-sm"
              style="color: var(${isOver
                ? "--color-danger-600"
                : isWarning
                ? "--color-warning-600"
                : "--color-text-muted"})"
            >
              ${currentLength}/${maxLength}
            </span>
          </div>
          ${field.control} ${field.help}
        </label>
      `;
    };

    const uiSchema = {
      "/name": { "ui:wrapper": charCountWrapper },
      "/bio": {
        "ui:widget": "textarea",
        "ui:wrapper": charCountWrapper,
        "ui:help": "A short bio for your profile card",
      },
      "/about": {
        "ui:widget": "textarea",
        "ui:wrapper": charCountWrapper,
        "ui:help": "Tell readers more about yourself",
      },
    };

    return html`
      <div class="alert alert-info">
        <p><strong>Live character counter wrapper:</strong></p>
        <ul>
          <li>
            Counter shows <strong class="text-muted">gray</strong> normally
          </li>
          <li>
            Turns <strong class="text-warning">yellow</strong> when =20
            characters remain
          </li>
          <li>
            Turns <strong class="text-danger">red</strong> when over the limit
          </li>
        </ul>
        <p>Try typing in any field to see the counter update!</p>
      </div>
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-form>
    `;
  },
};

export const CustomContentSlots = {
  parameters: {
    docs: {
      description: {
        story: `Use slot references (\`"slot:name"\`) in \`ui:before\` or \`ui:after\` to inject pre-defined HTML content.

This is useful when you want to define content in the HTML rather than in JavaScript.`,
      },
    },
  },
  render: () => {
    const schema = {
      type: "object",
      title: "Newsletter Signup",
      properties: {
        email: { type: "string", title: "Email", format: "email" },
        frequency: {
          type: "string",
          title: "Email Frequency",
          enum: ["daily", "weekly", "monthly"],
          enumNames: ["Daily digest", "Weekly roundup", "Monthly newsletter"],
          default: "weekly",
        },
        interests: { type: "string", title: "Interests" },
      },
    };

    const uiSchema = {
      "/email": {
        "ui:before": "slot:email-header",
      },
      "/interests": {
        "ui:after": "slot:interests-footer",
      },
    };

    return html`
      <pds-form
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      >
        <!-- Slotted content referenced by ui:before/ui:after -->
        <div
          slot="email-header"
          class="alert alert-success"
          style="margin-bottom: var(--spacing-sm);"
        >
          <strong>Join 50,000+ subscribers!</strong>
        </div>

        <p
          slot="interests-footer"
          class="text-sm text-muted"
          style="margin-top: var(--spacing-sm);"
        >
          We'll personalize your newsletter based on your interests.
          <a href="#privacy">Learn more about how we use your data</a>.
        </p>
      </pds-form>
    `;
  },
};
