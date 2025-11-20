import { html } from 'lit';

export default {
  title: 'Components/Pds Jsonform',
  parameters: {
    docs: {
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

See the examples below to get started, or check the [primitive forms](/story/primitives-forms--default) for manual form building.`
      }
    }
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
      <pds-jsonform 
        .jsonSchema=${simpleSchema}
        @pw:submit=${(e) => console.log('✅ Form submitted:', e.detail)}
      ></pds-jsonform>
    `;
  }
};

export const ComplexForm = {
  render: () => {
    return html`
      <pds-jsonform 
        .jsonSchema=${complexSchema}
        @pw:submit=${(e) => console.log('✅ Form submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Form submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
        @pw:dialog-submit=${(e) => console.log('📝 Dialog saved:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
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
        @pw:submit=${(e) => console.log('✅ Submitted:', e.detail)}
      ></pds-jsonform>
    `;
  }
};
