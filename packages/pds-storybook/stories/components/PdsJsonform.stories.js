import { html } from 'lit';
import { createComponentDocsPage } from '../reference/reference-docs.js';
import showdown from 'showdown';

const markdownConverter = new showdown.Converter({ tables: true });

const uiSchemaReferenceMarkdown = `
# uiSchema Reference

Complete reference for all **uiSchema** configuration options in \`pds-jsonform\`.

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
`;

const docsParameters = {
  description: {
    component: `**⭐ Recommended for modern applications** - Automatically generate complete forms from JSON Schema definitions.

### Key Features
- 🎯 **Zero boilerplate** - Define form structure in JSON, get a working form with validation
- ✅ **Built-in validation** - Automatic validation based on schema rules (required, min/max, patterns, etc.)
- 🔄 **Data binding** - Two-way data binding with form state management
- 🎨 **PDS styled** - Uses all PDS design tokens automatically
- 📱 **Responsive** - Mobile-friendly layouts out of the box
- 🧩 **Conditional logic** - Show/hide fields based on other field values
- 🌐 **Nested objects** - Support for complex nested data structures
- 🔧 **Extensible** - Custom field types and validators

### Why JSON Schema Forms?
Instead of manually writing HTML for every form field, validation rule, and error message, you define your data schema once and get:
- Form UI generation
- Client-side validation
- Server-side validation (same schema)
- API documentation
- Type definitions
- Database schemas

See the examples below to get started, or check the [primitive forms](/story/primitives-forms--default) for manual form building.
`
  },
  page: createComponentDocsPage('pds-jsonform', { 
    hideStories: true,
    additionalContent: markdownConverter.makeHtml(uiSchemaReferenceMarkdown)
  }),
  toc: true
};

export default {
  title: 'Components/Pds Jsonform',
  tags: ['autodocs', 'form', 'forms', 'jsonform', 'json-schema', 'validation', 'input'],
  parameters: {
    pds: {
      tags: ['form', 'forms', 'jsonform', 'json-schema', 'validation', 'input', 'pds-jsonform', 'interaction']
    },
    docs: docsParameters
  }
};

const simpleSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      examples: ['John Doe']
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address',
      examples: ['john.doe@example.com']
    },
    age: {
      type: 'number',
      title: 'Age',
      minimum: 18,
      examples: [25]
    },
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to newsletter'
    }
  },
  required: ['name', 'email']
};

const complexSchema = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: { type: 'string', title: 'First Name', examples: ['John'] },
        lastName: { type: 'string', title: 'Last Name', examples: ['Doe'] },
        dateOfBirth: { type: 'string', format: 'date', title: 'Date of Birth' }
      }
    },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: { type: 'string', title: 'Street', examples: ['123 Main Street'] },
        city: { type: 'string', title: 'City', examples: ['New York'] },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['USA', 'UK', 'Canada', 'Australia']
        }
      }
    },
    preferences: {
      type: 'array',
      title: 'Interests',
      items: {
        type: 'string',
        enum: ['Technology', 'Sports', 'Music', 'Travel', 'Reading']
      }
    }
  }
};

export const SimpleForm = {
  render: () => {
    return html`
      <pds-jsonform data-required
        .jsonSchema=${simpleSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const ComplexForm = {
  render: () => {
    return html`
      <pds-jsonform 
        .jsonSchema=${complexSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithInitialData = {
  render: () => {
    const initialValues = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      newsletter: true
    };
    
    return html`
      <pds-jsonform 
        .jsonSchema=${simpleSchema}
        .values=${initialValues}
        @pw:value-change=${(e) => console.log('🔄 Value changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithTogglesSwitches = {
  name: 'Toggles & Switches',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        toggles: {
          type: 'object',
          title: 'Preferences',
          properties: {
            emailNotifications: {
              type: 'boolean',
              title: 'Email Notifications',
              description: 'Receive notifications via email'
            },
            pushNotifications: {
              type: 'boolean',
              title: 'Push Notifications',
              description: 'Receive push notifications on your device'
            },
            darkMode: {
              type: 'boolean',
              title: 'Dark Mode',
              description: 'Enable dark theme'
            },
            autoSave: {
              type: 'boolean',
              title: 'Auto-save',
              description: 'Automatically save changes'
            }
          }
        }
      }
    };

    const uiSchema = {
      toggles: {
        'ui:layout': 'flex',
        'ui:layoutOptions': {
          direction: 'column',
          gap: 'md'
        }
      }
    };

    const options = {
      widgets: {
        booleans: 'toggle' // Use toggle switches instead of checkboxes
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithRangeSliders = {
  name: 'Range Sliders with Output',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        volume: {
          type: 'number',
          title: 'Volume',
          minimum: 0,
          maximum: 100,
          default: 50
        },
        brightness: {
          type: 'number',
          title: 'Brightness',
          minimum: 0,
          maximum: 100,
          default: 75
        },
        fontSize: {
          type: 'number',
          title: 'Font Size',
          minimum: 10,
          maximum: 24,
          default: 16
        },
        quality: {
          type: 'integer',
          title: 'Quality',
          minimum: 1,
          maximum: 10,
          default: 7
        }
      }
    };

    const uiSchema = {
      volume: { 'ui:widget': 'input-range' },
      brightness: { 'ui:widget': 'input-range' },
      fontSize: { 'ui:widget': 'input-range' },
      quality: { 'ui:widget': 'input-range' }
    };

    const options = {
      enhancements: {
        rangeOutput: true // Add live value display
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:value-change=${(e) => console.log('🎚️ Value changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithIcons = {
  name: 'Icon-Enhanced Inputs',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'Username',
          examples: ['Enter your username']
        },
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
          examples: ['your.email@example.com']
        },
        password: {
          type: 'string',
          title: 'Password',
          examples: ['••••••••']
        },
        website: {
          type: 'string',
          format: 'uri',
          title: 'Website',
          examples: ['https://yourwebsite.com']
        },
        phone: {
          type: 'string',
          title: 'Phone',
          examples: ['+1 (555) 123-4567']
        },
        location: {
          type: 'string',
          title: 'Location',
          examples: ['City, Country']
        }
      },
      required: ['username', 'email', 'password']
    };

    const uiSchema = {
      username: {
        'ui:icon': 'user',
        'ui:iconPosition': 'start'
      },
      email: {
        'ui:icon': 'envelope',
        'ui:iconPosition': 'start'
      },
      password: {
        'ui:icon': 'lock',
        'ui:iconPosition': 'start',
        'ui:widget': 'password'
      },
      website: {
        'ui:icon': 'globe',
        'ui:iconPosition': 'start'
      },
      phone: {
        'ui:icon': 'phone',
        'ui:iconPosition': 'start'
      },
      location: {
        'ui:icon': 'map-pin',
        'ui:iconPosition': 'start'
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithPdsUpload = {
  name: 'File Upload (pds-upload)',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        profilePicture: {
          type: 'string',
          title: 'Profile Picture',
          description: 'Upload your profile photo (JPG, PNG)',
          contentMediaType: 'image/*',
          contentEncoding: 'base64'
        },
        resume: {
          type: 'string',
          title: 'Resume',
          description: 'Upload your resume (PDF)',
          contentMediaType: 'application/pdf',
          contentEncoding: 'base64'
        },
        portfolio: {
          type: 'string',
          title: 'Portfolio Files',
          description: 'Upload multiple portfolio items',
          contentMediaType: 'image/*,application/pdf',
          contentEncoding: 'base64'
        }
      }
    };

    const uiSchema = {
      profilePicture: {
        'ui:options': {
          accept: 'image/jpeg,image/png',
          maxSize: 5242880, // 5MB
          label: 'Choose photo'
        }
      },
      resume: {
        'ui:options': {
          accept: 'application/pdf',
          maxSize: 10485760, // 10MB
          label: 'Choose PDF'
        }
      },
      portfolio: {
        'ui:options': {
          multiple: true,
          accept: 'image/*,application/pdf',
          label: 'Choose files'
        }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithPdsRichtext = {
  name: 'Rich Text Editor (pds-richtext)',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        bio: {
          type: 'string',
          title: 'Biography',
          description: 'Tell us about yourself',
          examples: ['Write your biography...']
        },
        coverLetter: {
          type: 'string',
          title: 'Cover Letter',
          description: 'Write your cover letter',
          examples: ['Write your cover letter...']
        },
        jobDescription: {
          type: 'string',
          title: 'Job Description',
          examples: ['Describe the position...']
        }
      }
    };

    const uiSchema = {
      bio: {
        'ui:widget': 'richtext',
        'ui:options': {
          toolbar: 'minimal'
        }
      },
      coverLetter: {
        'ui:widget': 'richtext',
        'ui:options': {
          toolbar: 'standard'
        }
      },
      jobDescription: {
        'ui:widget': 'richtext',
        'ui:options': {
          toolbar: 'full'
        }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithFlexLayout = {
  name: 'Flex Layout',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        contactInfo: {
          type: 'object',
          title: 'Contact Information',
          properties: {
            firstName: { type: 'string', title: 'First Name', examples: ['Jane'] },
            lastName: { type: 'string', title: 'Last Name', examples: ['Smith'] },
            email: { type: 'string', format: 'email', title: 'Email', examples: ['jane.smith@example.com'] },
            phone: { type: 'string', title: 'Phone', examples: ['+1 (555) 987-6543'] }
          }
        }
      }
    };

    const uiSchema = {
      contactInfo: {
        'ui:layout': 'flex',
        'ui:layoutOptions': {
          gap: 'md',
          wrap: true,
          direction: 'row'
        }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithGridLayout = {
  name: 'Grid Layout',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        productInfo: {
          type: 'object',
          title: 'Product Information',
          properties: {
            name: { type: 'string', title: 'Product Name', examples: ['Wireless Headphones'] },
            sku: { type: 'string', title: 'SKU', examples: ['WH-1000XM4'] },
            price: { type: 'number', title: 'Price', examples: [299.99] },
            quantity: { type: 'integer', title: 'Quantity', examples: [50] },
            category: { type: 'string', title: 'Category', enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Garden'] },
            brand: { type: 'string', title: 'Brand', examples: ['Sony'] },
            weight: { type: 'number', title: 'Weight (kg)', examples: [0.25] },
            dimensions: { type: 'string', title: 'Dimensions', examples: ['20 x 18 x 8 cm'] }
          }
        }
      }
    };

    const uiSchema = {
      productInfo: {
        'ui:layout': 'grid',
        'ui:layoutOptions': {
          columns: 3,
          gap: 'md'
        }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithAccordionLayout = {
  name: 'Accordion Layout',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Full Name',
          examples: ['Alex Rodriguez']
        },
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
          examples: ['alex.rodriguez@example.com']
        },
        settings: {
          type: 'object',
          title: 'Settings',
          properties: {
            displaySettings: {
              type: 'object',
              title: 'Display Settings',
              properties: {
                theme: { type: 'string', title: 'Theme', enum: ['Light', 'Dark', 'Auto'], default: 'Auto' },
                fontSize: { type: 'number', title: 'Font Size (px)', minimum: 12, maximum: 24, default: 16 },
                density: { type: 'string', title: 'Density', enum: ['Compact', 'Comfortable', 'Spacious'], default: 'Comfortable' },
                animations: { type: 'boolean', title: 'Enable Animations', default: true }
              }
            },
            notificationSettings: {
              type: 'object',
              title: 'Notification Settings',
              properties: {
                email: { type: 'boolean', title: 'Email Notifications', default: true },
                push: { type: 'boolean', title: 'Push Notifications', default: false },
                sms: { type: 'boolean', title: 'SMS Notifications', default: false },
                frequency: { type: 'string', title: 'Frequency', enum: ['Real-time', 'Daily', 'Weekly'], default: 'Daily' }
              }
            },
            privacySettings: {
              type: 'object',
              title: 'Privacy Settings',
              properties: {
                profileVisibility: { type: 'string', title: 'Profile Visibility', enum: ['Public', 'Friends', 'Private'], default: 'Friends' },
                showEmail: { type: 'boolean', title: 'Show Email', default: false },
                showActivity: { type: 'boolean', title: 'Show Activity', default: true },
                allowMessages: { type: 'boolean', title: 'Allow Messages', default: true }
              }
            }
          }
        }
      },
      required: ['name', 'email']
    };

    const uiSchema = {
      settings: { 'ui:layout': 'accordion' }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithTabsLayout = {
  name: 'Tabs Layout (pds-tabstrip)',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        userSettings: {
          type: 'object',
          title: 'User Settings',
          properties: {
            account: {
              type: 'object',
              title: 'Account',
              properties: {
                username: { type: 'string', title: 'Username', examples: ['coolguy123'] },
                email: { type: 'string', format: 'email', title: 'Email', examples: ['user@example.com'] },
                password: { type: 'string', title: 'New Password', examples: ['••••••••'] }
              }
            },
            profile: {
              type: 'object',
              title: 'Profile',
              properties: {
                displayName: { type: 'string', title: 'Display Name', examples: ['Cool Guy'] },
                bio: { type: 'string', title: 'Bio', examples: ['Tell us about yourself...'] },
                location: { type: 'string', title: 'Location', examples: ['San Francisco, CA'] },
                website: { type: 'string', format: 'uri', title: 'Website', examples: ['https://mywebsite.com'] }
              }
            },
            privacy: {
              type: 'object',
              title: 'Privacy',
              properties: {
                publicProfile: { type: 'boolean', title: 'Public Profile' },
                showEmail: { type: 'boolean', title: 'Show Email' },
                allowMessages: { type: 'boolean', title: 'Allow Messages' },
                searchable: { type: 'boolean', title: 'Searchable' }
              }
            }
          }
        }
      }
    };

    const uiSchema = {
      userSettings: { 'ui:layout': 'tabs' }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithSurfaces = {
  name: 'Surface Wrapping (Cards)',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        cardGroups: {
          type: 'object',
          title: 'Product Catalog',
          properties: {
            product1: {
              type: 'object',
              title: 'Premium Membership',
              properties: {
                name: { type: 'string', title: 'Product Name', default: 'Premium Plan', examples: ['Premium Plan'] },
                price: { type: 'number', title: 'Price (USD)', default: 29.99, minimum: 0, examples: [29.99] },
                billing: { type: 'string', title: 'Billing Cycle', enum: ['Monthly', 'Quarterly', 'Yearly'], default: 'Monthly' },
                autoRenew: { type: 'boolean', title: 'Auto-Renew', default: true }
              }
            },
            product2: {
              type: 'object',
              title: 'Enterprise Solution',
              properties: {
                name: { type: 'string', title: 'Product Name', default: 'Enterprise', examples: ['Enterprise'] },
                seats: { type: 'integer', title: 'Number of Seats', default: 10, minimum: 1, examples: [10] },
                support: { type: 'string', title: 'Support Level', enum: ['Standard', 'Priority', '24/7'], default: 'Priority' },
                sla: { type: 'boolean', title: 'SLA Agreement', default: true }
              }
            },
            product3: {
              type: 'object',
              title: 'Developer Tools',
              properties: {
                name: { type: 'string', title: 'Product Name', default: 'Dev Tools Pro', examples: ['Dev Tools Pro'] },
                apiCalls: { type: 'integer', title: 'API Calls/Month', default: 100000, minimum: 1000, examples: [100000] },
                environments: { type: 'integer', title: 'Environments', default: 3, minimum: 1, maximum: 10, examples: [3] },
                monitoring: { type: 'boolean', title: 'Performance Monitoring', default: true }
              }
            },
            product4: {
              type: 'object',
              title: 'Storage Package',
              properties: {
                name: { type: 'string', title: 'Product Name', default: 'Cloud Storage+', examples: ['Cloud Storage+'] },
                storage: { type: 'number', title: 'Storage (TB)', default: 5, minimum: 1, maximum: 100, examples: [5] },
                bandwidth: { type: 'number', title: 'Bandwidth (TB)', default: 10, minimum: 1, examples: [10] },
                backup: { type: 'boolean', title: 'Automated Backup', default: true }
              }
            }
          }
        }
      }
    };

    const uiSchema = {
      cardGroups: {
        'ui:layout': 'grid',
        'ui:layoutOptions': {
          columns: 'auto',
          autoSize: 'md',
          gap: 'md'
        }
      },
      'cardGroups/product1': {
        'ui:surface': 'surface-sunken'
      },
      'cardGroups/product2': {
        'ui:surface': 'surface-inverse'
      },
      'cardGroups/product3': {
        'ui:surface': 'card'
      },
      'cardGroups/product4': {
        'ui:surface': 'elevated'
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithDialogForms = {
  name: 'Dialog-Based Nested Forms',
  parameters: {
    docs: {
      description: {
        story: 'Dialog-based forms use `ui:dialog` to edit nested objects in modal dialogs. State is transferred via FormData when using `PDS.ask()` with `useForm: true`. Click "Edit" buttons to modify nested data, then submit the main form to see all changes preserved.'
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          title: 'Project Name',
          examples: ['Digital Transformation Initiative']
        },
        teamLead: {
          type: 'object',
          title: 'Team Lead',
          properties: {
            name: { type: 'string', title: 'Full Name', examples: ['Sarah Johnson'] },
            email: { type: 'string', format: 'email', title: 'Email Address', examples: ['sarah.johnson@company.com'] },
            phone: { type: 'string', title: 'Phone Number', examples: ['+1-555-0123'] },
            department: { type: 'string', title: 'Department', examples: ['Engineering'] },
            location: { type: 'string', title: 'Office Location', examples: ['New York Office'] }
          }
        },
        budget: {
          type: 'object',
          title: 'Budget Details',
          properties: {
            amount: { type: 'number', title: 'Budget Amount', examples: [250000] },
            currency: { type: 'string', title: 'Currency', enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD'] },
            fiscalYear: { type: 'string', title: 'Fiscal Year', examples: ['2025'] },
            department: { type: 'string', title: 'Cost Center', examples: ['IT-001'] },
            approved: { type: 'boolean', title: 'Budget Approved' }
          }
        },
        timeline: {
          type: 'object',
          title: 'Project Timeline',
          properties: {
            startDate: { type: 'string', format: 'date', title: 'Start Date' },
            endDate: { type: 'string', format: 'date', title: 'End Date' },
            milestones: { type: 'integer', title: 'Number of Milestones', minimum: 1, maximum: 20, examples: [8] },
            status: { type: 'string', title: 'Status', enum: ['Planning', 'In Progress', 'On Hold', 'Completed'], default: 'Planning' }
          }
        }
      }
    };
    
    // Initial values to test state persistence
    const initialValues = {
      projectName: 'Digital Transformation Initiative',
      teamLead: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1-555-0123',
        department: 'Engineering',
        location: 'New York Office'
      },
      budget: {
        amount: 250000,
        currency: 'USD',
        fiscalYear: '2025',
        department: 'IT-001',
        approved: true
      },
      timeline: {
        startDate: '2025-01-15',
        endDate: '2025-12-31',
        milestones: 8,
        status: 'In Progress'
      }
    };

    const uiSchema = {
      projectName: {
        'ui:icon': 'folder',
        'ui:iconPosition': 'start'
      },
      teamLead: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Team Lead',
          dialogTitle: 'Team Lead Information',
          icon: 'user-gear'
        },
        name: { 'ui:icon': 'user', 'ui:iconPosition': 'start' },
        email: { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' },
        phone: { 'ui:icon': 'phone', 'ui:iconPosition': 'start' },
        department: { 'ui:icon': 'building', 'ui:iconPosition': 'start' },
        location: { 'ui:icon': 'map-pin', 'ui:iconPosition': 'start' }
      },
      budget: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Budget',
          dialogTitle: 'Budget Details',
          icon: 'currency-dollar'
        },
        amount: { 'ui:icon': 'dollar-sign', 'ui:iconPosition': 'start' },
        currency: { 'ui:icon': 'coins', 'ui:iconPosition': 'start' },
        fiscalYear: { 'ui:icon': 'calendar', 'ui:iconPosition': 'start' },
        department: { 'ui:icon': 'building', 'ui:iconPosition': 'start' }
      },
      timeline: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Timeline',
          dialogTitle: 'Project Timeline',
          icon: 'calendar'
        },
        startDate: { 'ui:icon': 'calendar-check', 'ui:iconPosition': 'start' },
        endDate: { 'ui:icon': 'calendar-xmark', 'ui:iconPosition': 'start' },
        milestones: { 'ui:icon': 'flag', 'ui:iconPosition': 'start' },
        status: { 'ui:icon': 'list-check', 'ui:iconPosition': 'start' }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:submit=${(e) => toastFormData(e.detail)}
        @pw:dialog-submit=${(e) => console.log('📝 Dialog saved:', e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithRadioGroupOpen = {
  name: 'Radio Group Open (Single Selection)',
  parameters: {
    docs: {
      description: {
        story: `When an array has \`maxItems: 1\`, it renders as a Radio Group Open, allowing single selection with the ability to add custom options.
        
This is perfect for scenarios where users can choose one option from predefined choices or add their own custom value. The \`data-open\` enhancement automatically provides an input field to add new options dynamically.

### Key Features:
- **Single selection** - Only one option can be selected at a time (radio buttons)
- **Add custom options** - Users can type new options in the input field
- **Remove options** - Click the × button to remove options
- **Pre-populated** - Start with default options from the schema

This pattern is ideal for fields like "Priority", "Status", "Category", or any single-choice field where users might need custom values.`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        priority: {
          type: 'array',
          title: 'Project Priority',
          description: 'Select one priority level or add your own',
          items: {
            type: 'string',
            examples: ['High', 'Medium', 'Low']
          },
          default: ['High', 'Medium', 'Low'],
          uniqueItems: true,
          maxItems: 1
        },
        status: {
          type: 'array',
          title: 'Current Status',
          description: 'Choose the current project status',
          items: {
            type: 'string',
            examples: ['Planning', 'In Progress', 'Review', 'Completed']
          },
          default: ['Planning', 'In Progress', 'Review', 'Completed'],
          uniqueItems: true,
          maxItems: 1
        },
        department: {
          type: 'array',
          title: 'Department',
          description: 'Select your department',
          items: {
            type: 'string',
            examples: ['Engineering', 'Design', 'Marketing', 'Sales']
          },
          default: ['Engineering', 'Design', 'Marketing', 'Sales'],
          uniqueItems: true,
          maxItems: 1
        }
      },
      required: ['priority', 'status']
    };

    const initialValues = {
      priority: ['High', 'Medium', 'Low'],
      status: ['Planning', 'In Progress', 'Review', 'Completed'],
      department: ['Engineering', 'Design', 'Marketing', 'Sales']
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .values=${initialValues}
        @pw:value-change=${(e) => console.log('🔄 Value changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithDatalistAutocomplete = {
  name: 'Datalist Autocomplete',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        country: {
          type: 'string',
          title: 'Country',
          examples: ['United States']
        },
        city: {
          type: 'string',
          title: 'City',
          examples: ['New York']
        },
        skillset: {
          type: 'string',
          title: 'Primary Skill',
          examples: ['JavaScript']
        },
        company: {
          type: 'string',
          title: 'Company',
          examples: ['Microsoft']
        }
      }
    };

    const uiSchema = {
      country: {
        'ui:datalist': ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'China', 'India', 'Brazil']
      },
      city: {
        'ui:datalist': ['New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Amsterdam', 'Singapore', 'Dubai']
      },
      skillset: {
        'ui:datalist': ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'Ruby', 'PHP', 'Swift', 'Kotlin']
      },
      company: {
        'ui:datalist': ['Microsoft', 'Google', 'Apple', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Adobe', 'Salesforce', 'Oracle']
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const WithArrayFields = {
  name: 'Dynamic Arrays (Add/Remove)',
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
- **Radio Group Open** - Arrays with \`maxItems: 1\` render as radio buttons for single selection`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          title: 'Project Name',
          examples: ['Website Redesign Project']
        },
        priority: {
          type: 'array',
          title: 'Project Priority',
          items: {
            type: 'string',
            examples: ['High', 'Medium', 'Low']
          },
          default: ['High', 'Medium', 'Low'],
          uniqueItems: true,
          maxItems: 1
        },
        tags: {
          type: 'array',
          title: 'Project Tags',
          items: {
            type: 'string'
          },
          default: ['web', 'design', 'frontend']
        },
        teamMembers: {
          type: 'array',
          title: 'Team Members',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: 'Full Name',
                examples: ['Alice Johnson']
              },
              role: {
                type: 'string',
                title: 'Role',
                enum: ['Developer', 'Designer', 'Project Manager', 'QA Engineer', 'DevOps'],
                default: 'Developer'
              },
              email: {
                type: 'string',
                format: 'email',
                title: 'Email',
                examples: ['alice.johnson@company.com']
              },
              hours: {
                type: 'number',
                title: 'Hours/Week',
                minimum: 1,
                maximum: 40,
                default: 40
              }
            },
            required: ['name', 'role', 'email']
          },
          minItems: 1
        },
        milestones: {
          type: 'array',
          title: 'Project Milestones',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                title: 'Milestone Title',
                examples: ['MVP Launch']
              },
              dueDate: {
                type: 'string',
                format: 'date',
                title: 'Due Date'
              },
              completed: {
                type: 'boolean',
                title: 'Completed',
                default: false
              }
            },
            required: ['title', 'dueDate']
          }
        }
        
      },
      required: ['projectName', 'teamMembers']
    };

    // Initial values to demonstrate pre-populated arrays
    const initialValues = {
      projectName: 'Website Redesign Project',
      priority: ['High', 'Medium', 'Low'],
      teamMembers: [
        {
          name: 'Alice Johnson',
          role: 'Project Manager',
          email: 'alice.johnson@company.com',
          hours: 40
        },
        {
          name: 'Bob Smith',
          role: 'Developer',
          email: 'bob.smith@company.com',
          hours: 35
        }
      ],
      milestones: [
        {
          title: 'Design Phase Complete',
          dueDate: '2025-02-01',
          completed: true
        },
        {
          title: 'MVP Launch',
          dueDate: '2025-04-15',
          completed: false
        }
      ],
      tags: ['web', 'design', 'frontend', 'responsive']
    };

    const uiSchema = {
      teamMembers: {
        'ui:layout': 'default',
        role: {
          'ui:widget': 'select'
        }
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:array-add=${(e) => console.log('➕ Item added to:', e.detail.path)}
        @pw:array-remove=${(e) => console.log('➖ Item removed from:', e.detail.path, 'at index:', e.detail.index)}
        @pw:array-reorder=${(e) => console.log('🔄 Item moved from', e.detail.from, 'to', e.detail.to, 'in:', e.detail.path)}
        @pw:value-change=${(e) => console.log('🔄 Value changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const ComprehensiveExample = {
  name: 'All Features Combined',
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        userProfile: {
          type: 'object',
          title: 'User Profile',
          properties: {
            personalInfo: {
              type: 'object',
              title: 'Personal Information',
              properties: {
                firstName: { type: 'string', title: 'First Name', examples: ['John'] },
                lastName: { type: 'string', title: 'Last Name', examples: ['Doe'] },
                email: { type: 'string', format: 'email', title: 'Email', examples: ['john.doe@example.com'] },
                phone: { type: 'string', title: 'Phone', examples: ['+1 (555) 123-4567'] },
                dateOfBirth: { type: 'string', format: 'date', title: 'Date of Birth' }
              },
              required: ['firstName', 'lastName', 'email']
            },
            settings: {
              type: 'object',
              title: 'Settings',
              properties: {
                accountSettings: {
                  type: 'object',
                  title: 'Account Settings',
                  properties: {
                    notifications: { type: 'boolean', title: 'Email Notifications' },
                    newsletter: { type: 'boolean', title: 'Newsletter Subscription' },
                    twoFactor: { type: 'boolean', title: 'Two-Factor Authentication' }
                  }
                },
                preferences: {
                  type: 'object',
                  title: 'Preferences',
                  properties: {
                    theme: { type: 'string', title: 'Theme', enum: ['Light', 'Dark', 'Auto'] },
                    language: { type: 'string', title: 'Language', enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'] },
                    fontSize: { type: 'number', title: 'Font Size', minimum: 12, maximum: 20, default: 14 },
                    lineHeight: { type: 'number', title: 'Line Height', minimum: 1.0, maximum: 2.0, default: 1.5 }
                  }
                }
              }
            }
          }
        },
        profile: {
          type: 'object',
          title: 'Profile',
          properties: {
            avatar: { 
              type: 'string', 
              title: 'Profile Picture',
              contentMediaType: 'image/*',
              contentEncoding: 'base64'
            },
            bio: { type: 'string', title: 'Biography', examples: ['Tell us about yourself...'] },
            website: { type: 'string', format: 'uri', title: 'Website', examples: ['https://yourwebsite.com'] }
          }
        }
      }
    };

    const uiSchema = {
      userProfile: {
        'ui:layout': 'accordion',
        'ui:layoutOptions': { openFirst: true },
        'ui:surface': 'elevated',
        personalInfo: {
          'ui:layout': 'grid',
          'ui:layoutOptions': { columns: 2, gap: 'md' },
          'ui:surface': 'sunken',
          email: { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' },
          phone: { 'ui:icon': 'phone', 'ui:iconPosition': 'start' }
        },
        settings: {
          accountSettings: {
            'ui:surface': 'sunken'
          },
          preferences: {
            'ui:surface': 'sunken',
            theme: { 'ui:class': 'buttons' },
            fontSize: { 'ui:widget': 'input-range' },
            lineHeight: { 'ui:widget': 'input-range' }
          }
        }
      },
      profile: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Profile',
          dialogTitle: 'Your Profile Information'
        },
        avatar: {
          'ui:options': {
            accept: 'image/*',
            maxSize: 5242880,
            label: 'Upload Avatar'
          }
        },
        bio: {
          'ui:widget': 'richtext',
          'ui:options': {
            toolbar: 'standard'
          }
        },
        website: { 'ui:icon': 'globe', 'ui:iconPosition': 'start' }
      }
    };

    const options = {
      widgets: {
        booleans: 'toggle'
      },
      enhancements: {
        rangeOutput: true
      }
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:value-change=${(e) => console.log('🔄 Changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const CustomFormActions = {
  name: 'Custom Form Actions',
  parameters: {
    docs: {
      description: {
        story: `Demonstrates using \`hide-actions\` to provide custom form submission buttons and handling.
        
When \`hide-actions\` is set, the default Submit and Reset buttons are hidden, allowing you to create custom action buttons in the \`actions\` slot. You can then handle form submission programmatically using the form's \`submit()\` method or by manually triggering the form element.`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'Username',
          minLength: 3,
          examples: ['johndoe']
        },
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
          examples: ['john@example.com']
        },
        password: {
          type: 'string',
          format: 'password',
          title: 'Password',
          minLength: 8
        },
        terms: {
          type: 'boolean',
          title: 'I agree to the terms and conditions'
        }
      },
      required: ['username', 'email', 'password', 'terms']
    };

    const handleSaveDraft = (e) => {
      const form = e.target.closest('pds-jsonform');
      const data = form.serialize();
      console.log('💾 Saving draft:', data.json);
    };

    return html`
      <pds-jsonform 
        .jsonSchema=${schema}
        hide-actions
        @pw:value-change=${(e) => console.log('🔄 Field changed:', e.detail)}
        @pw:submit=${(e) => toastFormData(e.detail)}
      >
        <div slot="actions" class="flex gap-sm items-center">
          <button 
            type="submit" 
            class="btn btn-primary"
          >
            <pds-icon icon="check"></pds-icon>
            Create Account
          </button>
          <button 
            type="button" 
            class="btn"
            @click=${handleSaveDraft}
          >
            <pds-icon icon="file"></pds-icon>
            Save Draft
          </button>
          <button 
            type="button" 
            class="btn btn-secondary btn-outline grow text-right"
            @click=${() => console.log('Registration cancelled')}
          >
            Cancel
          </button>
        </div>
      </pds-jsonform>
    `;
  }
};

// =============================================================================
// Root-Level Layout Stories
// =============================================================================

export const RootGridLayout = {
  name: 'Root-Level Grid Layout',
  parameters: {
    docs: {
      description: {
        story: `Apply a grid layout to the entire form using root-level \`ui:layout\` and \`ui:layoutOptions\`.
        
This allows you to control the form layout **without modifying your JSON Schema** — keeping data structure separate from presentation.

\`\`\`javascript
const uiSchema = {
  'ui:layout': 'grid',
  'ui:layoutOptions': {
    columns: 2,
    gap: 'md'
  }
};
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      title: 'Contact Form',
      properties: {
        firstName: { type: 'string', title: 'First Name', examples: ['John'] },
        lastName: { type: 'string', title: 'Last Name', examples: ['Doe'] },
        email: { type: 'string', format: 'email', title: 'Email', examples: ['john.doe@example.com'] },
        phone: { type: 'string', title: 'Phone', examples: ['+1 (555) 123-4567'] },
        company: { type: 'string', title: 'Company', examples: ['Acme Inc.'] },
        role: { type: 'string', title: 'Role', examples: ['Developer'] }
      },
      required: ['firstName', 'lastName', 'email']
    };

    const uiSchema = {
      'ui:layout': 'grid',
      'ui:layoutOptions': {
        columns: 2,
        gap: 'md'
      }
    };

    return html`
      <pds-jsonform
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const RootFlexLayout = {
  name: 'Root-Level Flex Layout',
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
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      title: 'Quick Settings',
      properties: {
        theme: { 
          type: 'string', 
          enum: ['light', 'dark', 'system'], 
          title: 'Theme',
          default: 'system'
        },
        notifications: { 
          type: 'boolean', 
          title: 'Notifications',
          default: true
        },
        language: { 
          type: 'string', 
          enum: ['en', 'es', 'fr', 'de'], 
          title: 'Language',
          default: 'en'
        }
      }
    };

    const uiSchema = {
      'ui:layout': 'flex',
      'ui:layoutOptions': {
        gap: 'lg',
        wrap: true
      }
    };

    return html`
      <pds-jsonform
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const RootLayoutWithFieldOptions = {
  name: 'Root Layout + Field Options',
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
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      title: 'User Profile',
      properties: {
        username: { type: 'string', title: 'Username', minLength: 3, examples: ['johndoe'] },
        email: { type: 'string', format: 'email', title: 'Email', examples: ['john@example.com'] },
        bio: { type: 'string', title: 'Bio', maxLength: 500, examples: ['Tell us about yourself...'] },
        website: { type: 'string', format: 'uri', title: 'Website', examples: ['https://yoursite.com'] }
      },
      required: ['username', 'email']
    };

    const uiSchema = {
      // Root form layout
      'ui:layout': 'grid',
      'ui:layoutOptions': {
        columns: 2,
        gap: 'md'
      },
      // Field-specific options
      '/username': {
        'ui:icon': 'user'
      },
      '/email': {
        'ui:icon': 'envelope',
        'ui:help': 'We will never share your email'
      },
      '/bio': {
        'ui:widget': 'textarea',
        'ui:options': { rows: 4 },
        'ui:class': 'grid-col-span-2'
      },
      '/website': {
        'ui:icon': 'globe',
        'ui:class': 'grid-col-span-2'
      }
    };

    return html`
      <pds-jsonform
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const RootThreeColumnGrid = {
  name: 'Root 3-Column Grid',
  parameters: {
    docs: {
      description: {
        story: `A more complex form using a 3-column root grid layout with various field types.`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      title: 'Product Registration',
      properties: {
        productName: { type: 'string', title: 'Product Name', examples: ['Widget Pro'] },
        serialNumber: { type: 'string', title: 'Serial Number', examples: ['SN-12345'] },
        purchaseDate: { type: 'string', format: 'date', title: 'Purchase Date' },
        retailer: { type: 'string', title: 'Retailer', examples: ['Amazon'] },
        price: { type: 'number', title: 'Price', minimum: 0, examples: [99.99] },
        currency: { type: 'string', enum: ['USD', 'EUR', 'GBP'], title: 'Currency', default: 'USD' },
        condition: { type: 'string', enum: ['new', 'refurbished', 'used'], title: 'Condition', default: 'new' },
        extendedWarranty: { type: 'boolean', title: 'Extended Warranty' },
        newsletter: { type: 'boolean', title: 'Subscribe to Newsletter' }
      },
      required: ['productName', 'serialNumber', 'purchaseDate']
    };

    const uiSchema = {
      'ui:layout': 'grid',
      'ui:layoutOptions': {
        columns: 3,
        gap: 'md'
      }
    };

    const options = {
      widgets: { booleans: 'toggle' }
    };

    return html`
      <pds-jsonform
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .options=${options}
        @pw:submit=${(e) => toastFormData(e.detail)}
      ></pds-jsonform>
    `;
  }
};
