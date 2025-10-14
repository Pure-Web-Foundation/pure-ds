/**
 * AutoForm - A design system configuration form using categorized structure
 * 
 * Creates an accordion-based form for the new categorized design config:
 * - Colors (primary, secondary, accent, background)
 * - Typography (fonts, sizes, weights)  
 * - Spatial Rhythm (spacing, padding, layout)
 * - Shape (borders, radius)
 * - Behavior (animations, transitions)
 * - Layout (breakpoints, grid, density)
 */
export class AutoForm extends HTMLElement {
  constructor() {
    super();
    this.values = {};
    this.categories = this.getFormCategories();
  }

  static get observedAttributes() {
    return ['config', 'title'];
  }

  get config() {
    return this._config;
  }

  set config(value) {
    this._config = value;
    this.extractValuesFromConfig();
    this.render();
  }

  get title() {
    return this.getAttribute('title') || 'Design System Configuration';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'config') {
        this.config = JSON.parse(newValue || '{}');
      } else {
        this.render();
      }
    }
  }

  getFormCategories() {
    return [
      {
        id: 'colors',
        title: '🎨 Colors',
        description: 'Base color palette that generates all design tokens',
        expanded: true,
        fields: {
          basic: [
            { key: 'primary', type: 'color', label: 'Primary Color', description: 'Main brand color used for buttons, links, and accents' },
            { key: 'secondary', type: 'color', label: 'Secondary Color', description: 'Supporting color for secondary elements' },
            { key: 'accent', type: 'color', label: 'Accent Color', description: 'Accent color for highlights and calls-to-action' },
            { key: 'background', type: 'color', label: 'Background Color', description: 'Base background color for light mode' }
          ],
          advanced: [
            { key: 'success', type: 'color', label: 'Success Color', description: 'Success state color (auto-generated if null)', optional: true },
            { key: 'warning', type: 'color', label: 'Warning Color', description: 'Warning state color (uses accent if null)', optional: true },
            { key: 'danger', type: 'color', label: 'Danger Color', description: 'Error state color (auto-generated if null)', optional: true },
            { key: 'info', type: 'color', label: 'Info Color', description: 'Information state color (uses primary if null)', optional: true }
          ]
        }
      },
      {
        id: 'typography', 
        title: '📝 Typography',
        description: 'Font families, sizes, weights, and spacing',
        fields: {
          basic: [
            { key: 'fontFamilySans', type: 'text', label: 'Font Family', description: 'Main font family for the design system' },
            { key: 'baseFontSize', type: 'range', label: 'Base Font Size', description: 'Base font size in pixels', min: 12, max: 24, step: 1 }
          ],
          advanced: [
            { key: 'fontFamilyMono', type: 'text', label: 'Monospace Font', description: 'Font family for code blocks' },
            { key: 'fontScale', type: 'range', label: 'Font Scale Ratio', description: 'Multiplier for generating font size scale', min: 1.1, max: 1.5, step: 0.1 }
          ]
        }
      },
      {
        id: 'spatialRhythm',
        title: '📏 Spacing',
        description: 'Spacing, padding, and layout rhythms',
        fields: {
          basic: [
            { key: 'baseUnit', type: 'range', label: 'Base Unit', description: 'Base spacing unit in pixels - all spacing derives from this', min: 8, max: 32, step: 2 },
            { key: 'containerMaxWidth', type: 'range', label: 'Container Max Width', description: 'Maximum width for containers in pixels', min: 800, max: 1600, step: 50 }
          ],
          advanced: [
            { key: 'scaleRatio', type: 'range', label: 'Scale Ratio', description: 'Ratio for generating spacing scale', min: 1.1, max: 2.0, step: 0.05 },
            { key: 'inputPadding', type: 'range', label: 'Input Padding', description: 'Multiplier for input padding', min: 0.5, max: 2.0, step: 0.1 },
            { key: 'buttonPadding', type: 'range', label: 'Button Padding', description: 'Multiplier for button padding', min: 0.5, max: 2.0, step: 0.1 }
          ]
        }
      },
      {
        id: 'shape',
        title: '🔷 Shape',
        description: 'Border radius and border widths',
        fields: {
          basic: [
            { key: 'radiusSize', type: 'select', label: 'Border Radius', description: 'Overall border radius style',
              options: [
                { value: 'none', label: 'None (0px)' },
                { value: 'small', label: 'Small (4px)' },
                { value: 'medium', label: 'Medium (8px)' },
                { value: 'large', label: 'Large (16px)' }
              ]
            },
            { key: 'borderWidth', type: 'select', label: 'Border Width', description: 'Default border thickness',
              options: [
                { value: 'hairline', label: 'Hairline (0.5px)' },
                { value: 'thin', label: 'Thin (1px)' },
                { value: 'medium', label: 'Medium (2px)' },
                { value: 'thick', label: 'Thick (3px)' }
              ]
            }
          ],
          advanced: [
            { key: 'customRadius', type: 'range', label: 'Custom Radius', description: 'Custom border radius in pixels (overrides radius size)', min: 0, max: 32, step: 1, optional: true }
          ]
        }
      },
      {
        id: 'behavior',
        title: '⚡ Behavior', 
        description: 'Animations, transitions, and interactions',
        fields: {
          basic: [
            { key: 'transitionSpeed', type: 'select', label: 'Animation Speed', description: 'Overall animation and transition speed',
              options: [
                { value: 'fast', label: 'Fast (150ms)' },
                { value: 'normal', label: 'Normal (250ms)' },
                { value: 'slow', label: 'Slow (350ms)' }
              ]
            }
          ],
          advanced: [
            { key: 'animationEasing', type: 'select', label: 'Easing Function', description: 'Animation easing curve',
              options: [
                { value: 'linear', label: 'Linear' },
                { value: 'ease', label: 'Ease' },
                { value: 'ease-in', label: 'Ease In' },
                { value: 'ease-out', label: 'Ease Out' },
                { value: 'ease-in-out', label: 'Ease In Out' }
              ]
            },
            { key: 'focusRingWidth', type: 'range', label: 'Focus Ring Width', description: 'Width of focus rings in pixels', min: 1, max: 8, step: 1 }
          ]
        }
      },
      {
        id: 'layout',
        title: '📱 Layout',
        description: 'Responsive breakpoints and component sizing',
        fields: {
          basic: [
            { key: 'breakpointTablet', type: 'range', label: 'Tablet Breakpoint', description: 'Tablet breakpoint in pixels', min: 600, max: 900, step: 10 },
            { key: 'breakpointDesktop', type: 'range', label: 'Desktop Breakpoint', description: 'Desktop breakpoint in pixels', min: 900, max: 1200, step: 10 }
          ],
          advanced: [
            { key: 'breakpointMobile', type: 'range', label: 'Mobile Breakpoint', description: 'Mobile breakpoint in pixels', min: 480, max: 720, step: 10 },
            { key: 'breakpointWide', type: 'range', label: 'Wide Breakpoint', description: 'Wide screen breakpoint in pixels', min: 1200, max: 1600, step: 10 },
            { key: 'buttonMinHeight', type: 'range', label: 'Button Min Height', description: 'Minimum touch target height', min: 32, max: 60, step: 2 }
          ]
        }
      }
    ];
  }

  extractValuesFromConfig() {
    if (!this._config || !this._config.design) return;
    
    this.values = {};
    
    Object.entries(this._config.design).forEach(([categoryKey, categoryValues]) => {
      if (typeof categoryValues === 'object' && categoryValues !== null) {
        Object.entries(categoryValues).forEach(([key, value]) => {
          this.values[`${categoryKey}.${key}`] = value;
        });
      }
    });
  }

  getValue(categoryId, fieldKey) {
    const fullKey = `${categoryId}.${fieldKey}`;
    return this.values[fullKey];
  }

  setValue(categoryId, fieldKey, value) {
    const fullKey = `${categoryId}.${fieldKey}`;
    this.values[fullKey] = value;
    this.dispatchChangeEvent();
  }

  dispatchChangeEvent() {
    const config = { design: {} };
    
    Object.entries(this.values).forEach(([fullKey, value]) => {
      const [categoryId, fieldKey] = fullKey.split('.');
      if (!config.design[categoryId]) {
        config.design[categoryId] = {};
      }
      config.design[categoryId][fieldKey] = value === '' ? null : value;
    });

    this.dispatchEvent(new CustomEvent('configChange', {
      detail: config,
      bubbles: true
    }));
  }

  renderField(categoryId, field) {
    const value = this.getValue(categoryId, field.key);
    const label = document.createElement('label');
    
    const labelSpan = document.createElement('span');
    labelSpan.setAttribute('data-label', '');
    labelSpan.textContent = field.label;
    label.appendChild(labelSpan);

    let input;
    switch (field.type) {
      case 'color':
        input = document.createElement('input');
        input.type = 'color';
        input.name = field.key;
        input.value = value || '#000000';
        input.addEventListener('input', (e) => {
          this.setValue(categoryId, field.key, e.target.value);
        });
        label.appendChild(input);
        break;

      case 'range':
        const rangeContainer = document.createElement('div');
        rangeContainer.className = 'range-container';
        
        input = document.createElement('input');
        input.type = 'range';
        input.name = field.key;
        input.min = field.min;
        input.max = field.max;
        input.step = field.step || 1;
        input.value = value || field.min || 0;
        input.addEventListener('input', (e) => {
          this.setValue(categoryId, field.key, parseFloat(e.target.value));
          rangeValue.textContent = e.target.value;
        });
        
        const rangeValue = document.createElement('span');
        rangeValue.className = 'range-value';
        rangeValue.textContent = input.value;
        
        rangeContainer.appendChild(input);
        rangeContainer.appendChild(rangeValue);
        label.appendChild(rangeContainer);
        break;

      case 'select':
        input = document.createElement('select');
        input.name = field.key;
        
        if (field.options) {
          field.options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            optionEl.selected = value === option.value;
            input.appendChild(optionEl);
          });
        }
        
        input.addEventListener('change', (e) => {
          this.setValue(categoryId, field.key, e.target.value);
        });
        label.appendChild(input);
        break;

      case 'checkbox':
        label.className = 'checkbox-container';
        input = document.createElement('input');
        input.type = 'checkbox';
        input.name = field.key;
        input.checked = value || false;
        input.addEventListener('change', (e) => {
          this.setValue(categoryId, field.key, e.target.checked);
        });
        label.appendChild(input);
        break;

      default:
        input = document.createElement('input');
        input.type = field.type || 'text';
        input.name = field.key;
        input.value = value || '';
        input.addEventListener('input', (e) => {
          this.setValue(categoryId, field.key, e.target.value);
        });
        label.appendChild(input);
        break;
    }

    if (field.description) {
      const description = document.createElement('div');
      description.className = 'field-description';
      description.textContent = field.description;
      label.appendChild(description);
    }

    return label;
  }

  render() {
    this.innerHTML = '';
    
    const form = document.createElement('form');
    form.className = 'design-config-form';
    
    // Only show title if not inside a dialog (dialog will show it via ui-widget label)
    const isInDialog = this.closest('dialog') !== null;
    if (!isInDialog) {
      const title = document.createElement('h2');
      title.textContent = this.title;
      form.appendChild(title);
    }
    
    const accordion = document.createElement('div');
    accordion.className = 'config-accordion';
    
    this.categories.forEach(category => {
      const details = document.createElement('details');
      details.className = 'config-category';
      if (category.expanded) {
        details.open = true;
      }
      
      const summary = document.createElement('summary');
      summary.className = 'category-header';
      summary.innerHTML = `
        <span class="category-title">${category.title}</span>
        <span class="category-description">${category.description}</span>
      `;
      details.appendChild(summary);
      
      const content = document.createElement('div');
      content.className = 'category-content';
      
      if (category.fields.basic && category.fields.basic.length > 0) {
        const basicSection = document.createElement('fieldset');
        basicSection.className = 'basic-fields';
        
        const basicLegend = document.createElement('legend');
        basicLegend.textContent = 'Essential Settings';
        basicSection.appendChild(basicLegend);
        
        const basicFields = document.createElement('div');
        basicFields.className = 'fields';
        
        category.fields.basic.forEach(field => {
          const fieldElement = this.renderField(category.id, field);
          basicFields.appendChild(fieldElement);
        });
        
        basicSection.appendChild(basicFields);
        content.appendChild(basicSection);
      }
      
      if (category.fields.advanced && category.fields.advanced.length > 0) {
        const advancedDetails = document.createElement('details');
        advancedDetails.className = 'advanced-fields';
        
        const advancedSummary = document.createElement('summary');
        advancedSummary.textContent = 'Advanced Settings';
        advancedDetails.appendChild(advancedSummary);
        
        const advancedFields = document.createElement('div');
        advancedFields.className = 'fields';
        
        category.fields.advanced.forEach(field => {
          const fieldElement = this.renderField(category.id, field);
          advancedFields.appendChild(fieldElement);
        });
        
        advancedDetails.appendChild(advancedFields);
        content.appendChild(advancedDetails);
      }
      
      details.appendChild(content);
      accordion.appendChild(details);
    });
    
    form.appendChild(accordion);
    
    const actions = document.createElement('div');
    actions.className = 'actions';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
    });
    
    const applyBtn = document.createElement('button');
    applyBtn.type = 'submit';
    applyBtn.className = 'btn-primary';
    applyBtn.textContent = 'Apply Configuration';
    
    actions.appendChild(cancelBtn);
    actions.appendChild(applyBtn);
    form.appendChild(actions);
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('submit', { 
        detail: this.getConfig(),
        bubbles: true 
      }));
    });
    
    this.appendChild(form);
  }

  getConfig() {
    const config = { design: {} };
    
    Object.entries(this.values).forEach(([fullKey, value]) => {
      const [categoryId, fieldKey] = fullKey.split('.');
      if (!config.design[categoryId]) {
        config.design[categoryId] = {};
      }
      config.design[categoryId][fieldKey] = value === '' ? null : value;
    });

    return config;
  }
}

customElements.define('auto-form', AutoForm);