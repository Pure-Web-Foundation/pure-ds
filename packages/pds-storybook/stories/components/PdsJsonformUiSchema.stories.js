import { html } from 'lit';
import { renderMarkdown } from '../utils/markdown.js';
import { toastFormData } from '../utils/toast-utils.js';
import uiSchemaRefMd from './PdsJsonformUiSchema.md?raw';

export default {
  title: 'Components/Pds Jsonform/uiSchema Reference',
  tags: ['autodocs', 'reference', 'docs', 'uischema', 'jsonform'],
  parameters: {
    docs: {
      description: {
        component: `Complete reference for all **uiSchema** configuration options in \`pds-jsonform\`.

The uiSchema controls *how* fields are rendered while JSON Schema defines *what* data to collect.`
      }
    },
    pds: {
      tags: ['reference', 'docs', 'uischema', 'jsonform', 'configuration']
    }
  }
};

// ============================================================================
// Documentation Story - Full Reference
// ============================================================================

export const Docs = {
  name: 'Documentation',
  parameters: {
    docs: {
      description: {
        story: 'Complete uiSchema reference documentation with all available configuration options, widgets, layouts, and examples.'
      }
    }
  },
  render: () => {
    const container = document.createElement('article');
    container.className = 'container surface-base';
    container.innerHTML = '<p class="text-muted">Loading documentation...</p>';
    
    renderMarkdown(uiSchemaRefMd).then(htmlContent => {
      container.innerHTML = htmlContent;
    });
    
    return container;
  }
};

// ============================================================================
// Interactive Examples
// ============================================================================

// ============================================================================
// Widget Selection Examples
// ============================================================================

export const WidgetSelection = {
  name: 'ui:widget Examples',
  parameters: {
    docs: {
      description: {
        story: `Demonstrates **\`ui:widget\`** to override the default widget for each field type.
        
Available widgets:
- **Text:** \`input-text\`, \`textarea\`, \`password\`, \`input-email\`, \`input-url\`
- **Numbers:** \`input-number\`, \`input-range\`
- **Boolean:** \`checkbox\`, \`toggle\`
- **Choice:** \`select\`, \`radio\`, \`checkbox-group\`
- **Rich:** \`upload\`, \`richtext\`
- **Date/Time:** \`input-date\`, \`input-time\`, \`input-datetime\`
- **Other:** \`input-color\`, \`const\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        textDefault: { type: 'string', title: 'Default Text Input', examples: ['Standard input'] },
        textArea: { type: 'string', title: 'Textarea Widget', examples: ['Multi-line content...'] },
        password: { type: 'string', title: 'Password Widget', examples: ['••••••••'] },
        numberDefault: { type: 'number', title: 'Default Number', examples: [42] },
        numberRange: { type: 'number', title: 'Range Slider', minimum: 0, maximum: 100, default: 50 },
        boolCheckbox: { type: 'boolean', title: 'Checkbox (default)' },
        boolToggle: { type: 'boolean', title: 'Toggle Switch' },
        selectDefault: { type: 'string', title: 'Select (default)', enum: ['Option A', 'Option B', 'Option C'] },
        selectRadio: { type: 'string', title: 'Radio Buttons', enum: ['Small', 'Medium', 'Large'] },
        colorPicker: { type: 'string', title: 'Color Picker', default: '#3b82f6' },
        datePicker: { type: 'string', title: 'Date Picker' }
      }
    };

    const uiSchema = {
      textArea: { 'ui:widget': 'textarea', 'ui:options': { rows: 3 } },
      password: { 'ui:widget': 'password' },
      numberRange: { 'ui:widget': 'input-range' },
      boolToggle: { 'ui:widget': 'toggle' },
      selectRadio: { 'ui:widget': 'radio' },
      colorPicker: { 'ui:widget': 'input-color' },
      datePicker: { 'ui:widget': 'input-date' }
    };

    const options = { enhancements: { rangeOutput: true } };

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

// ============================================================================
// Widget Options Examples
// ============================================================================

export const WidgetOptions = {
  name: 'ui:options Examples',
  parameters: {
    docs: {
      description: {
        story: `Demonstrates **\`ui:options\`** for passing widget-specific configuration.

Each widget type has its own options:
- **textarea:** \`rows\`, \`cols\`, \`resize\`
- **input-range:** \`min\`, \`max\`, \`step\`
- **upload:** \`accept\`, \`maxSize\`, \`multiple\`, \`label\`
- **richtext:** \`toolbar\`, \`spellcheck\`, \`format\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        description: { type: 'string', title: 'Description (6 rows)', examples: ['Enter a detailed description...'] },
        volume: { type: 'number', title: 'Volume (0-100, step 10)', minimum: 0, maximum: 100, default: 50 },
        quality: { type: 'integer', title: 'Quality (1-5, step 1)', minimum: 1, maximum: 5, default: 3 },
        avatar: {
          type: 'string',
          title: 'Avatar (images only, 2MB max)',
          contentMediaType: 'image/*',
          contentEncoding: 'base64'
        }
      }
    };

    const uiSchema = {
      description: {
        'ui:widget': 'textarea',
        'ui:options': { rows: 6, resize: 'vertical' }
      },
      volume: {
        'ui:widget': 'input-range',
        'ui:options': { min: 0, max: 100, step: 10 }
      },
      quality: {
        'ui:widget': 'input-range',
        'ui:options': { min: 1, max: 5, step: 1 }
      },
      avatar: {
        'ui:options': {
          accept: 'image/jpeg,image/png,image/webp',
          maxSize: 2097152,
          label: 'Choose Avatar Image'
        }
      }
    };

    const options = { enhancements: { rangeOutput: true } };

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

// ============================================================================
// Layout Examples
// ============================================================================

export const LayoutFlex = {
  name: 'ui:layout - Flex',
  parameters: {
    docs: {
      description: {
        story: `**Flex layout** arranges fields in a row with wrapping.

\`\`\`javascript
{
  "ui:layout": "flex",
  "ui:layoutOptions": {
    "direction": "row",  // "row" or "column"
    "wrap": true,
    "gap": "md"          // "xs", "sm", "md", "lg", "xl"
  }
}
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        contactInfo: {
          type: 'object',
          title: 'Contact Information (Flex Layout)',
          properties: {
            firstName: { type: 'string', title: 'First Name', examples: ['Jane'] },
            lastName: { type: 'string', title: 'Last Name', examples: ['Doe'] },
            email: { type: 'string', format: 'email', title: 'Email', examples: ['jane@example.com'] },
            phone: { type: 'string', title: 'Phone', examples: ['+1 555-0123'] }
          }
        }
      }
    };

    const uiSchema = {
      contactInfo: {
        'ui:layout': 'flex',
        'ui:layoutOptions': { direction: 'row', wrap: true, gap: 'md' }
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

export const LayoutGrid = {
  name: 'ui:layout - Grid',
  parameters: {
    docs: {
      description: {
        story: `**Grid layout** creates multi-column forms.

\`\`\`javascript
// Fixed columns
{
  "ui:layout": "grid",
  "ui:layoutOptions": { "columns": 3, "gap": "md" }
}

// Auto-sizing columns
{
  "ui:layout": "grid",
  "ui:layoutOptions": { "columns": "auto", "autoSize": "md", "gap": "md" }
}
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        productInfo: {
          type: 'object',
          title: 'Product Information (3-Column Grid)',
          properties: {
            name: { type: 'string', title: 'Product Name', examples: ['Widget Pro'] },
            sku: { type: 'string', title: 'SKU', examples: ['WGT-001'] },
            price: { type: 'number', title: 'Price', examples: [99.99] },
            quantity: { type: 'integer', title: 'Quantity', examples: [100] },
            category: { type: 'string', title: 'Category', enum: ['Electronics', 'Home', 'Office'] },
            brand: { type: 'string', title: 'Brand', examples: ['Acme Corp'] }
          }
        }
      }
    };

    const uiSchema = {
      productInfo: {
        'ui:layout': 'grid',
        'ui:layoutOptions': { columns: 3, gap: 'md' }
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

export const LayoutAccordion = {
  name: 'ui:layout - Accordion',
  parameters: {
    docs: {
      description: {
        story: `**Accordion layout** creates collapsible sections using native \`<details>\` elements.

\`\`\`javascript
{
  "ui:layout": "accordion",
  "ui:layoutOptions": { "openFirst": true }
}
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        settings: {
          type: 'object',
          title: 'Application Settings',
          properties: {
            display: {
              type: 'object',
              title: 'Display Settings',
              properties: {
                theme: { type: 'string', title: 'Theme', enum: ['Light', 'Dark', 'Auto'], default: 'Auto' },
                fontSize: { type: 'number', title: 'Font Size', minimum: 12, maximum: 24, default: 16 }
              }
            },
            notifications: {
              type: 'object',
              title: 'Notification Settings',
              properties: {
                email: { type: 'boolean', title: 'Email Notifications', default: true },
                push: { type: 'boolean', title: 'Push Notifications', default: false }
              }
            },
            privacy: {
              type: 'object',
              title: 'Privacy Settings',
              properties: {
                publicProfile: { type: 'boolean', title: 'Public Profile', default: false },
                analytics: { type: 'boolean', title: 'Allow Analytics', default: true }
              }
            }
          }
        }
      }
    };

    const uiSchema = {
      settings: {
        'ui:layout': 'accordion',
        'ui:layoutOptions': { openFirst: true }
      }
    };

    const options = { widgets: { booleans: 'toggle' } };

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

export const LayoutTabs = {
  name: 'ui:layout - Tabs',
  parameters: {
    docs: {
      description: {
        story: `**Tabs layout** creates a tabbed interface using \`pds-tabstrip\`.

Each nested object property becomes a separate tab.

\`\`\`javascript
{
  "ui:layout": "tabs"
}
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        wizard: {
          type: 'object',
          title: 'Multi-Step Form',
          properties: {
            basicInfo: {
              type: 'object',
              title: 'Basic Info',
              properties: {
                name: { type: 'string', title: 'Full Name', examples: ['John Smith'] },
                email: { type: 'string', format: 'email', title: 'Email', examples: ['john@example.com'] }
              }
            },
            preferences: {
              type: 'object',
              title: 'Preferences',
              properties: {
                newsletter: { type: 'boolean', title: 'Subscribe to Newsletter' },
                theme: { type: 'string', title: 'Preferred Theme', enum: ['Light', 'Dark'] }
              }
            },
            confirm: {
              type: 'object',
              title: 'Confirm',
              properties: {
                terms: { type: 'boolean', title: 'I agree to Terms of Service' }
              }
            }
          }
        }
      }
    };

    const uiSchema = {
      wizard: { 'ui:layout': 'tabs' }
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

// ============================================================================
// Icon Examples
// ============================================================================

export const IconEnhancement = {
  name: 'ui:icon Examples',
  parameters: {
    docs: {
      description: {
        story: `Add icons to input fields using **\`ui:icon\`** and **\`ui:iconPosition\`**.

\`\`\`javascript
{
  "ui:icon": "user",           // Icon name from sprite
  "ui:iconPosition": "start"   // "start" (default) or "end"
}
\`\`\`

Common icons: \`user\`, \`envelope\`, \`lock\`, \`globe\`, \`phone\`, \`map-pin\`, \`calendar\`, \`search\`, \`gear\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        username: { type: 'string', title: 'Username', examples: ['johndoe'] },
        email: { type: 'string', format: 'email', title: 'Email', examples: ['john@example.com'] },
        password: { type: 'string', title: 'Password', examples: ['••••••••'] },
        website: { type: 'string', format: 'uri', title: 'Website', examples: ['https://example.com'] },
        phone: { type: 'string', title: 'Phone', examples: ['+1 555-0123'] },
        location: { type: 'string', title: 'Location', examples: ['New York, NY'] },
        search: { type: 'string', title: 'Search (icon at end)', examples: ['Search...'] }
      }
    };

    const uiSchema = {
      username: { 'ui:icon': 'user', 'ui:iconPosition': 'start' },
      email: { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' },
      password: { 'ui:icon': 'lock', 'ui:iconPosition': 'start', 'ui:widget': 'password' },
      website: { 'ui:icon': 'globe', 'ui:iconPosition': 'start' },
      phone: { 'ui:icon': 'phone', 'ui:iconPosition': 'start' },
      location: { 'ui:icon': 'map-pin', 'ui:iconPosition': 'start' },
      search: { 'ui:icon': 'search', 'ui:iconPosition': 'end' }
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

// ============================================================================
// Surface Wrapping Examples
// ============================================================================

export const SurfaceWrapping = {
  name: 'ui:surface Examples',
  parameters: {
    docs: {
      description: {
        story: `Wrap fieldsets in styled containers using **\`ui:surface\`** with PDS surface tokens.

\`\`\`javascript
{
  "ui:surface": "card"           // Card with border/shadow
  "ui:surface": "elevated"       // Elevated surface
  "ui:surface": "surface-sunken" // Recessed surface
  "ui:surface": "surface-inverse"// Inverted colors
}
\`\`\``
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        products: {
          type: 'object',
          title: 'Surface Examples',
          properties: {
            cardSurface: {
              type: 'object',
              title: 'Card Surface',
              properties: {
                name: { type: 'string', title: 'Name', examples: ['Card Item'] },
                value: { type: 'number', title: 'Value', examples: [100] }
              }
            },
            elevatedSurface: {
              type: 'object',
              title: 'Elevated Surface',
              properties: {
                name: { type: 'string', title: 'Name', examples: ['Elevated Item'] },
                value: { type: 'number', title: 'Value', examples: [200] }
              }
            },
            sunkenSurface: {
              type: 'object',
              title: 'Sunken Surface',
              properties: {
                name: { type: 'string', title: 'Name', examples: ['Sunken Item'] },
                value: { type: 'number', title: 'Value', examples: [300] }
              }
            }
          }
        }
      }
    };

    const uiSchema = {
      products: {
        'ui:layout': 'grid',
        'ui:layoutOptions': { columns: 3, gap: 'md' }
      },
      'products/cardSurface': { 'ui:surface': 'card' },
      'products/elevatedSurface': { 'ui:surface': 'elevated' },
      'products/sunkenSurface': { 'ui:surface': 'surface-sunken' }
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

// ============================================================================
// Dialog Forms Examples
// ============================================================================

export const DialogForms = {
  name: 'ui:dialog Examples',
  parameters: {
    docs: {
      description: {
        story: `Use **\`ui:dialog\`** to collect nested object data in a modal dialog.

\`\`\`javascript
{
  "ui:dialog": true,
  "ui:dialogOptions": {
    "buttonLabel": "Edit Details",    // Button text
    "dialogTitle": "Edit Information", // Dialog title
    "icon": "edit"                    // Optional button icon
  }
}
\`\`\`

Click the "Edit" buttons below to see dialog forms in action.`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        projectName: { type: 'string', title: 'Project Name', examples: ['My Project'] },
        teamLead: {
          type: 'object',
          title: 'Team Lead',
          properties: {
            name: { type: 'string', title: 'Full Name', examples: ['Alice Johnson'] },
            email: { type: 'string', format: 'email', title: 'Email', examples: ['alice@company.com'] },
            department: { type: 'string', title: 'Department', examples: ['Engineering'] }
          }
        },
        budget: {
          type: 'object',
          title: 'Budget',
          properties: {
            amount: { type: 'number', title: 'Amount', examples: [50000] },
            currency: { type: 'string', title: 'Currency', enum: ['USD', 'EUR', 'GBP'] },
            approved: { type: 'boolean', title: 'Approved' }
          }
        }
      }
    };

    const initialValues = {
      projectName: 'Website Redesign',
      teamLead: { name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering' },
      budget: { amount: 50000, currency: 'USD', approved: true }
    };

    const uiSchema = {
      projectName: { 'ui:icon': 'folder', 'ui:iconPosition': 'start' },
      teamLead: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Team Lead',
          dialogTitle: 'Team Lead Information',
          icon: 'user-gear'
        },
        name: { 'ui:icon': 'user', 'ui:iconPosition': 'start' },
        email: { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' }
      },
      budget: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Budget',
          dialogTitle: 'Budget Details',
          icon: 'currency-dollar'
        }
      }
    };

    return html`
      <pds-jsonform
        .jsonSchema=${schema}
        .uiSchema=${uiSchema}
        .values=${initialValues}
        @pw:submit=${(e) => toastFormData(e.detail)}
        @pw:dialog-submit=${(e) => console.log('Dialog saved:', e.detail)}
      ></pds-jsonform>
    `;
  }
};

// ============================================================================
// Datalist Autocomplete Examples
// ============================================================================

export const DatalistAutocomplete = {
  name: 'ui:datalist Examples',
  parameters: {
    docs: {
      description: {
        story: `Use **\`ui:datalist\`** for native browser autocomplete suggestions.

\`\`\`javascript
{
  "ui:datalist": ["Option 1", "Option 2", "Option 3"]
}
\`\`\`

Type in the fields below to see autocomplete suggestions.`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        country: { type: 'string', title: 'Country', examples: ['Start typing...'] },
        language: { type: 'string', title: 'Programming Language', examples: ['Start typing...'] },
        framework: { type: 'string', title: 'Framework', examples: ['Start typing...'] }
      }
    };

    const uiSchema = {
      country: {
        'ui:datalist': ['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Japan', 'Australia']
      },
      language: {
        'ui:datalist': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'Ruby']
      },
      framework: {
        'ui:datalist': ['React', 'Vue', 'Angular', 'Svelte', 'Lit', 'Solid', 'Next.js', 'Nuxt']
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

// ============================================================================
// Complete Example
// ============================================================================

export const CompleteExample = {
  name: 'Complete uiSchema Example',
  parameters: {
    docs: {
      description: {
        story: `A comprehensive example combining multiple uiSchema features:

- **Layouts:** Grid, Accordion, Flex
- **Widgets:** Toggle, Range, Richtext
- **Icons:** Input icons
- **Surfaces:** Card wrapping
- **Dialogs:** Nested dialog forms
- **Options:** Global widget defaults`
      }
    }
  },
  render: () => {
    const schema = {
      type: 'object',
      properties: {
        basicInfo: {
          type: 'object',
          title: 'Basic Information',
          properties: {
            firstName: { type: 'string', title: 'First Name', examples: ['John'] },
            lastName: { type: 'string', title: 'Last Name', examples: ['Doe'] },
            email: { type: 'string', format: 'email', title: 'Email', examples: ['john@example.com'] },
            phone: { type: 'string', title: 'Phone', examples: ['+1 555-0123'] }
          },
          required: ['firstName', 'lastName', 'email']
        },
        preferences: {
          type: 'object',
          title: 'Preferences',
          properties: {
            notifications: { type: 'boolean', title: 'Email Notifications', default: true },
            newsletter: { type: 'boolean', title: 'Newsletter', default: false },
            theme: { type: 'string', title: 'Theme', enum: ['Light', 'Dark', 'Auto'], default: 'Auto' },
            fontSize: { type: 'number', title: 'Font Size', minimum: 12, maximum: 24, default: 16 }
          }
        },
        profile: {
          type: 'object',
          title: 'Extended Profile',
          properties: {
            bio: { type: 'string', title: 'Biography', examples: ['Tell us about yourself...'] },
            website: { type: 'string', format: 'uri', title: 'Website', examples: ['https://example.com'] },
            avatar: { type: 'string', title: 'Avatar', contentMediaType: 'image/*', contentEncoding: 'base64' }
          }
        }
      }
    };

    const uiSchema = {
      basicInfo: {
        'ui:layout': 'grid',
        'ui:layoutOptions': { columns: 2, gap: 'md' },
        'ui:surface': 'card',
        email: { 'ui:icon': 'envelope', 'ui:iconPosition': 'start' },
        phone: { 'ui:icon': 'phone', 'ui:iconPosition': 'start' }
      },
      preferences: {
        'ui:surface': 'card',
        theme: { 'ui:widget': 'radio', 'ui:class': 'buttons' },
        fontSize: { 'ui:widget': 'input-range' }
      },
      profile: {
        'ui:dialog': true,
        'ui:dialogOptions': {
          buttonLabel: 'Edit Profile',
          dialogTitle: 'Extended Profile',
          icon: 'user-circle'
        },
        bio: { 'ui:widget': 'richtext', 'ui:options': { toolbar: 'standard' } },
        website: { 'ui:icon': 'globe', 'ui:iconPosition': 'start' },
        avatar: { 'ui:options': { accept: 'image/*', maxSize: 5242880, label: 'Upload Avatar' } }
      }
    };

    const options = {
      widgets: { booleans: 'toggle' },
      enhancements: { rangeOutput: true }
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
