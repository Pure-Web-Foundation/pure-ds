/**
 * AutoDesigner Visual Editor
 * Interactive configuration editor for the AutoDesigner system
 */

import { AutoDesigner } from './auto-designer.js';

export class AutoDesignerEditor {
  constructor(config, options = {}) {
    this.config = { ...config };
    this.options = {
      container: options.container || document.body,
      onChange: options.onChange || null,
      autoUpdate: options.autoUpdate !== false,
      showPreview: options.showPreview !== false,
      ...options
    };
    
    this.designer = null;
    this.previewContainer = null;
    this.init();
  }
  
  init() {
    // Create designer instance
    this.designer = new AutoDesigner(this.config);
    
    // Create editor UI
    this.render();
    
    // Apply initial styles to preview
    if (this.options.showPreview) {
      this.updatePreview();
    }
  }
  
  render() {
    const container = typeof this.options.container === 'string'
      ? document.querySelector(this.options.container)
      : this.options.container;
    
    if (!container) {
      throw new Error('Editor container not found');
    }
    
    container.innerHTML = `
      <div class="auto-designer-editor">
        <div class="editor-header">
          <h1>🎨 AutoDesigner Configuration Editor</h1>
          <div class="editor-actions">
            <button id="ad-save-file" class="btn btn-primary" title="Save to auto-designer.config.js (requires config server)">💾 Save to File</button>
            <button id="ad-export-json" class="btn btn-secondary">Export JSON</button>
            <button id="ad-export-css" class="btn btn-secondary">Export CSS</button>
            <button id="ad-apply" class="btn btn-secondary">Apply Styles</button>
          </div>
        </div>
        
        <div class="editor-layout">
          <div class="editor-sidebar">
            ${this.renderColorControls()}
            ${this.renderTypographyControls()}
            ${this.renderSpacingControls()}
            ${this.renderShapeControls()}
            ${this.renderLayoutControls()}
            ${this.renderComponentControls()}
          </div>
          
          ${this.options.showPreview ? `
            <div class="editor-preview">
              <div class="preview-header">
                <h2>Live Preview</h2>
                <div class="preview-tabs">
                  <button class="preview-tab active" data-tab="elements">Elements</button>
                  <button class="preview-tab" data-tab="components">Components</button>
                  <button class="preview-tab" data-tab="css">CSS Output</button>
                </div>
              </div>
              <div class="preview-content" id="ad-preview">
                ${this.renderPreviewContent()}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // Attach event listeners
    this.attachEventListeners(container);
  }
  
  renderColorControls() {
    return `
      <div class="control-section">
        <h3>🎨 Colors</h3>
        <div class="control-group">
          <label for="ad-color-primary">Primary Color</label>
          <input type="color" id="ad-color-primary" 
                 value="${this.config.colors?.primary || '#2d9dc9'}"
                 data-config="colors.primary">
        </div>
        <div class="control-group">
          <label for="ad-color-secondary">Secondary Color</label>
          <input type="color" id="ad-color-secondary" 
                 value="${this.config.colors?.secondary || '#a99b95'}"
                 data-config="colors.secondary">
        </div>
        <div class="control-group">
          <label for="ad-color-accent">Accent Color</label>
          <input type="color" id="ad-color-accent" 
                 value="${this.config.colors?.accent || '#e54271'}"
                 data-config="colors.accent">
        </div>
        <div class="control-group">
          <label for="ad-color-background">Background Color</label>
          <input type="color" id="ad-color-background" 
                 value="${this.config.colors?.background || '#e7e6de'}"
                 data-config="colors.background">
        </div>
      </div>
    `;
  }
  
  renderTypographyControls() {
    return `
      <div class="control-section">
        <h3>📝 Typography</h3>
        <div class="control-group">
          <label for="ad-font-size">Base Font Size (px)</label>
          <input type="number" id="ad-font-size" 
                 value="${this.config.typography?.baseFontSize || 16}"
                 min="12" max="24" step="1"
                 data-config="typography.baseFontSize">
        </div>
        <div class="control-group">
          <label for="ad-line-height">Line Height</label>
          <select id="ad-line-height" data-config="typography.lineHeightNormal">
            <option value="tight" ${this.config.typography?.lineHeightNormal === 'tight' ? 'selected' : ''}>Tight</option>
            <option value="normal" ${this.config.typography?.lineHeightNormal === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="relaxed" ${this.config.typography?.lineHeightNormal === 'relaxed' ? 'selected' : ''}>Relaxed</option>
          </select>
        </div>
      </div>
    `;
  }
  
  renderSpacingControls() {
    return `
      <div class="control-section">
        <h3>📏 Spacing</h3>
        <div class="control-group">
          <label for="ad-base-unit">Base Unit (px)</label>
          <input type="number" id="ad-base-unit" 
                 value="${this.config.spatialRhythm?.baseUnit || 16}"
                 min="4" max="32" step="4"
                 data-config="spatialRhythm.baseUnit">
        </div>
        <div class="control-group">
          <label for="ad-scale-ratio">Scale Ratio</label>
          <input type="number" id="ad-scale-ratio" 
                 value="${this.config.spatialRhythm?.scaleRatio || 1.25}"
                 min="1.1" max="2" step="0.05"
                 data-config="spatialRhythm.scaleRatio">
        </div>
      </div>
    `;
  }
  
  renderShapeControls() {
    return `
      <div class="control-section">
        <h3>🔷 Shape</h3>
        <div class="control-group">
          <label for="ad-radius">Border Radius</label>
          <select id="ad-radius" data-config="shape.radiusSize">
            <option value="none" ${this.config.shape?.radiusSize === 'none' ? 'selected' : ''}>None</option>
            <option value="small" ${this.config.shape?.radiusSize === 'small' ? 'selected' : ''}>Small</option>
            <option value="medium" ${this.config.shape?.radiusSize === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="large" ${this.config.shape?.radiusSize === 'large' ? 'selected' : ''}>Large</option>
            <option value="full" ${this.config.shape?.radiusSize === 'full' ? 'selected' : ''}>Full</option>
          </select>
        </div>
        <div class="control-group">
          <label for="ad-border-width">Border Width</label>
          <select id="ad-border-width" data-config="shape.borderWidth">
            <option value="hairline" ${this.config.shape?.borderWidth === 'hairline' ? 'selected' : ''}>Hairline</option>
            <option value="thin" ${this.config.shape?.borderWidth === 'thin' ? 'selected' : ''}>Thin</option>
            <option value="medium" ${this.config.shape?.borderWidth === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="thick" ${this.config.shape?.borderWidth === 'thick' ? 'selected' : ''}>Thick</option>
          </select>
        </div>
      </div>
    `;
  }
  
  renderLayoutControls() {
    return `
      <div class="control-section">
        <h3>📐 Layout</h3>
        <div class="control-group">
          <label for="ad-grid-columns">Grid Columns</label>
          <input type="number" id="ad-grid-columns" 
                 value="${this.config.layout?.gridColumns || 12}"
                 min="4" max="24" step="1"
                 data-config="layout.gridColumns">
        </div>
        <div class="control-group">
          <label for="ad-breakpoint-sm">Mobile Breakpoint (px)</label>
          <input type="number" id="ad-breakpoint-sm" 
                 value="${this.config.layout?.breakpoints?.sm || 640}"
                 min="320" max="1024" step="16"
                 data-config="layout.breakpoints.sm">
        </div>
        <div class="control-group">
          <label for="ad-breakpoint-md">Tablet Breakpoint (px)</label>
          <input type="number" id="ad-breakpoint-md" 
                 value="${this.config.layout?.breakpoints?.md || 768}"
                 min="640" max="1280" step="16"
                 data-config="layout.breakpoints.md">
        </div>
      </div>
    `;
  }
  
  renderComponentControls() {
    return `
      <div class="control-section">
        <h3>🧩 Components</h3>
        <div class="control-group">
          <label>
            <input type="checkbox" id="ad-comp-tables" 
                   ${this.config.components?.tables !== false ? 'checked' : ''}
                   data-config="components.tables">
            Tables
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" id="ad-comp-alerts" 
                   ${this.config.components?.alerts !== false ? 'checked' : ''}
                   data-config="components.alerts">
            Alerts
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" id="ad-comp-badges" 
                   ${this.config.components?.badges !== false ? 'checked' : ''}
                   data-config="components.badges">
            Badges
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" id="ad-comp-modals" 
                   ${this.config.components?.modals !== false ? 'checked' : ''}
                   data-config="components.modals">
            Modals
          </label>
        </div>
      </div>
    `;
  }
  
  renderPreviewContent() {
    return `
      <div class="preview-elements">
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <p>This is a paragraph with <a href="#">a link</a> and <strong>bold text</strong>.</p>
        
        <div class="preview-buttons">
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn btn-outline">Outline Button</button>
        </div>
        
        <div class="preview-form">
          <input type="text" placeholder="Text input">
          <select><option>Select option</option></select>
          <textarea placeholder="Textarea"></textarea>
        </div>
        
        <div class="alert alert-info">
          This is an info alert message.
        </div>
        
        <span class="badge badge-primary">Badge</span>
      </div>
    `;
  }
  
  attachEventListeners(container) {
    // Color/input changes
    container.querySelectorAll('input[data-config], select[data-config]').forEach(input => {
      input.addEventListener('change', (e) => this.handleConfigChange(e));
      if (input.type !== 'checkbox') {
        input.addEventListener('input', (e) => {
          if (this.options.autoUpdate) {
            this.handleConfigChange(e);
          }
        });
      }
    });
    
    // Action buttons
    const saveFileBtn = container.querySelector('#ad-save-file');
    if (saveFileBtn) {
      saveFileBtn.addEventListener('click', () => this.saveToFile());
    }
    
    const exportJsonBtn = container.querySelector('#ad-export-json');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => this.exportJSON());
    }
    
    const exportCssBtn = container.querySelector('#ad-export-css');
    if (exportCssBtn) {
      exportCssBtn.addEventListener('click', () => this.exportCSS());
    }
    
    const applyBtn = container.querySelector('#ad-apply');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => this.applyStyles());
    }
    
    // Preview tabs
    container.querySelectorAll('.preview-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.switchPreviewTab(e.target.dataset.tab));
    });
  }
  
  handleConfigChange(event) {
    const input = event.target;
    const configPath = input.dataset.config;
    const value = input.type === 'checkbox' ? input.checked : 
                  input.type === 'number' ? parseFloat(input.value) : 
                  input.value;
    
    // Update config object
    this.setNestedValue(this.config, configPath, value);
    
    // Regenerate designer
    this.designer.updateDesign(this.config);
    
    // Update preview
    if (this.options.autoUpdate && this.options.showPreview) {
      this.updatePreview();
    }
    
    // Call onChange callback
    if (this.options.onChange) {
      this.options.onChange(this.config, this.designer);
    }
  }
  
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }
  
  updatePreview() {
    AutoDesigner.applyStyles(this.designer.css, 'auto-designer-preview-styles');
  }
  
  applyStyles() {
    AutoDesigner.applyStyles(this.designer.css);
    console.log('✓ Styles applied to document');
  }
  
  async saveToFile() {
    const API_URL = 'http://localhost:3001/api/config';
    const btn = document.querySelector('#ad-save-file');
    const originalText = btn.textContent;
    
    try {
      btn.textContent = '⏳ Saving...';
      btn.disabled = true;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.config)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        btn.textContent = '✅ Saved!';
        btn.classList.add('btn-success');
        console.log('✅ Config saved:', result.file);
        
        // Show success message
        this.showNotification('Config saved successfully! Run `npm run update-styles` to regenerate CSS.', 'success');
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('btn-success');
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('❌ Error saving config:', error);
      btn.textContent = '❌ Error';
      btn.classList.add('btn-danger');
      
      // Show error message with instructions
      this.showNotification(
        `Could not save to file. Make sure the config server is running:\n\n` +
        `Terminal: node scripts/config-server.mjs\n\n` +
        `Error: ${error.message}`,
        'error'
      );
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('btn-danger');
      }, 3000);
    }
  }
  
  showNotification(message, type = 'info') {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
      animation: slideIn 0.3s ease;
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, type === 'error' ? 8000 : 4000);
  }
  
  exportJSON() {
    const json = JSON.stringify(this.config, null, 2);
    this.downloadFile('auto-designer.config.json', json, 'application/json');
  }
  
  exportCSS() {
    const css = this.designer.exportCSS();
    this.downloadFile('auto-designer.css', css, 'text/css');
  }
  
  downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  switchPreviewTab(tab) {
    const previewContent = document.querySelector('#ad-preview');
    const tabs = document.querySelectorAll('.preview-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    switch(tab) {
      case 'elements':
        previewContent.innerHTML = this.renderPreviewContent();
        break;
      case 'components':
        previewContent.innerHTML = this.renderComponentsPreview();
        break;
      case 'css':
        previewContent.innerHTML = `<pre><code>${this.escapeHtml(this.designer.exportCSS())}</code></pre>`;
        break;
    }
  }
  
  renderComponentsPreview() {
    return `
      <div class="preview-components">
        <h3>Table</h3>
        <table class="table table-striped">
          <thead><tr><th>Header 1</th><th>Header 2</th></tr></thead>
          <tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody>
        </table>
        
        <h3>Alerts</h3>
        <div class="alert alert-success">Success alert</div>
        <div class="alert alert-warning">Warning alert</div>
        <div class="alert alert-danger">Danger alert</div>
        
        <h3>Badges</h3>
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-danger">Danger</span>
      </div>
    `;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  getConfig() {
    return this.config;
  }
  
  getDesigner() {
    return this.designer;
  }
}
