import { LitElement, html } from "/assets/js/lit.js";

const schema = {
  "$id": "https://example.com/comprehensive-test",
  "type": "object",
  "title": "Comprehensive Form Test - All Renderers",
  "required": ["textSection", "numberSection"],
  "properties": {
    // TEXT INPUTS
    "textSection": {
      "type": "object",
      "title": "Text Inputs",
      "required": ["name", "email"],
      "properties": {
        "name": {
          "type": "string",
          "title": "Full Name (input-text)",
          "minLength": 2,
          "maxLength": 50,
          "default": "John Doe"
        },
        "bio": {
          "type": "string",
          "title": "Biography (textarea)",
          "maxLength": 500,
          "default": "A passionate developer"
        },
        "website": {
          "type": "string",
          "title": "Website (input-url)",
          "format": "url",
          "default": "https://example.com"
        },
        "email": {
          "type": "string",
          "title": "Email Address (input-email)",
          "format": "email",
          "default": "john@example.com"
        }
      }
    },

    // NUMBER INPUTS
    "numberSection": {
      "type": "object",
      "title": "Number Inputs",
      "properties": {
        "age": {
          "type": "integer",
          "title": "Age (input-number integer)",
          "minimum": 0,
          "maximum": 120,
          "default": 30
        },
        "price": {
          "type": "number",
          "title": "Price (input-number float)",
          "minimum": 0,
          "multipleOf": 0.01,
          "default": 99.99
        },
        "rating": {
          "type": "number",
          "title": "Rating (input-number with step)",
          "minimum": 1,
          "maximum": 5,
          "multipleOf": 0.5,
          "default": 4.5
        }
      }
    },

    // DATE/TIME INPUTS
    "dateSection": {
      "type": "object",
      "title": "Date & Time Inputs",
      "properties": {
        "birthDate": {
          "type": "string",
          "title": "Birth Date (input-date)",
          "format": "date",
          "default": "1994-01-15"
        },
        "appointmentTime": {
          "type": "string",
          "title": "Appointment Time (input-time)",
          "format": "time",
          "default": "14:30"
        },
        "eventDateTime": {
          "type": "string",
          "title": "Event Date & Time (input-datetime)",
          "format": "date-time",
          "default": "2025-12-01T18:00"
        }
      }
    },

    // BOOLEAN
    "booleanSection": {
      "type": "object",
      "title": "Boolean Inputs",
      "properties": {
        "newsletter": {
          "type": "boolean",
          "title": "Subscribe to Newsletter (checkbox)",
          "default": true
        },
        "terms": {
          "type": "boolean",
          "title": "Accept Terms & Conditions (checkbox)",
          "default": false
        }
      }
    },

    // ENUM - RADIO (small enum ≤ 5)
    "radioSection": {
      "type": "object",
      "title": "Radio Groups (enum ≤ 5 options)",
      "properties": {
        "size": {
          "type": "string",
          "title": "T-Shirt Size (radio)",
          "enum": ["XS", "S", "M", "L", "XL"],
          "default": "M"
        },
        "priority": {
          "type": "string",
          "title": "Priority Level (radio)",
          "enum": ["Low", "Medium", "High"],
          "default": "Medium"
        }
      }
    },

    // ENUM - SELECT (large enum > 5)
    "selectSection": {
      "type": "object",
      "title": "Select Dropdowns (enum > 5 options)",
      "properties": {
        "country": {
          "type": "string",
          "title": "Country (select)",
          "enum": ["USA", "Canada", "Mexico", "UK", "France", "Germany", "Spain", "Italy", "Japan", "Australia"],
          "default": "USA"
        },
        "color": {
          "type": "string",
          "title": "Favorite Color (select)",
          "enum": ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Pink", "Black", "White"],
          "default": "Blue"
        }
      }
    },

    // CHECKBOX GROUP (array with enum)
    "checkboxSection": {
      "type": "object",
      "title": "Checkbox Groups (multi-select)",
      "properties": {
        "interests": {
          "type": "array",
          "title": "Interests (checkbox-group)",
          "items": {
            "type": "string",
            "enum": ["Sports", "Music", "Art", "Technology", "Travel", "Food"]
          },
          "default": ["Technology", "Travel"]
        },
        "skills": {
          "type": "array",
          "title": "Skills (checkbox-group)",
          "items": {
            "type": "string",
            "enum": ["JavaScript", "Python", "Java", "C++", "Go", "Rust"]
          },
          "default": ["JavaScript", "Python"]
        }
      }
    },

    // CONST (read-only value)
    "constSection": {
      "type": "object",
      "title": "Const Values (read-only)",
      "properties": {
        "version": {
          "type": "string",
          "title": "API Version (const)",
          "const": "v2.1.0"
        },
        "region": {
          "type": "string",
          "title": "Server Region (const)",
          "const": "US-EAST-1"
        }
      }
    },

    // ARRAYS (dynamic list)
    "arraySection": {
      "type": "object",
      "title": "Arrays (add/remove)",
      "properties": {
        "tags": {
          "type": "array",
          "title": "Tags (array of strings)",
          "items": {
            "type": "string",
            "title": "Tag",
            "minLength": 1,
            "maxLength": 20
          },
          "default": ["important", "urgent"]
        },
        "phoneNumbers": {
          "type": "array",
          "title": "Phone Numbers (array of objects)",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "title": "Type",
                "enum": ["Home", "Work", "Mobile"]
              },
              "number": {
                "type": "string",
                "title": "Number",
                "pattern": "^[0-9-()+ ]+$",
                "minLength": 1,
                "maxLength": 20
              }
            }
          },
          "default": [
            { "type": "Mobile", "number": "555-1234" },
            { "type": "Work", "number": "555-5678" }
          ]
        }
      }
    },

    // NESTED FIELDSET
    "addressSection": {
      "type": "object",
      "title": "Address (nested fieldset)",
      "properties": {
        "street": {
          "type": "string",
          "title": "Street Address",          
          "default": "123 Main St"
        },
        "city": {
          "type": "string",
          "title": "City",
          "default": "Springfield",
          "minLength": 2,
          "maxLength": 50,
        },
        "state": {
          "type": "string",
          "title": "State",
          "default": "IL",
          "minLength": 2,
          "maxLength": 50,
        },
        "zipCode": {
          "type": "string",
          "title": "Zip Code",
          "pattern": "^[0-9]{5}(-[0-9]{4})?$",
          "default": "62701",
          "minLength": 2,
          "maxLength": 10
        }
      }
    },

    // ONEOF (choice between schemas)
    "notifyPreference": {
      "title": "Notification Preference",
      "oneOf": [
        {
          "const": "email",
          "title": "Email Only"
        },
        {
          "const": "sms",
          "title": "SMS Only"
        },
        {
          "const": "both",
          "title": "Both Email & SMS"
        }
      ],
      "default": "email"
    }
  }
}

customElements.define(
  "test-form",
  class extends LitElement {

    createRenderRoot() {
      return this; // Render template in light DOM
    }

    connectedCallback() {
      super.connectedCallback();
      // Listen for form changes
      this.addEventListener('pw:value-change', (e) => {
        const output = this.querySelector('#form-output');
        if (output) {
          const form = this.querySelector('pds-jsonform');
          output.textContent = JSON.stringify(form?.values || {}, null, 2);
        }
      });

      // Listen for form submission
      this.addEventListener('pw:submit', (e) => {
        console.log('Form submitted:', e.detail);
        console.log('Valid:', e.detail.valid);
        console.log('Values:', e.detail.json);
        alert(`Form submitted!\nValid: ${e.detail.valid}\nCheck console for full details.`);
      });
    }

    render(){
      return html`
      <section class="card">
        <h2>Comprehensive Schema Form Test</h2>
        <p>This form tests all default renderers in SchemaForm</p>
        
        <pds-jsonform .jsonSchema=${schema} submit-label="Submit Form"></pds-jsonform>

        <div style="margin-top: var(--spacing-6); padding: var(--spacing-4); background: var(--color-surface-elevated); border-radius: var(--radius-md);">
          <strong>Current Values:</strong>
          <pre id="form-output" style="font-family: var(--font-fontFamily-mono); font-size: var(--font-size-sm); margin-top: var(--spacing-2); overflow-x: auto;">{}</pre>
        </div>
      </section>
      
      `;
    }
  })