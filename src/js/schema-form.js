import { LitElement, html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * <schema-form>
 * Light DOM, JSON-Schema–aware form generator.
 * - Renderers return ONLY controls; wrapper (label/fieldset) is centralized.
 * - ES2022 #privates throughout.
 * - No shadow CSS; style externally.
 * 
 * Form Actions:
 * By default, the form includes Submit and Reset buttons inside the <form> element.
 * 
 * Usage options:
 * 1. Default buttons:
 *    <schema-form .jsonSchema=${schema}></schema-form>
 * 
 * 2. Customize labels:
 *    <schema-form .jsonSchema=${schema} submit-label="Save" reset-label="Clear"></schema-form>
 * 
 * 3. Hide reset button:
 *    <schema-form .jsonSchema=${schema} hide-reset></schema-form>
 * 
 * 4. Add extra buttons (slot):
 *    <schema-form .jsonSchema=${schema}>
 *      <button type="button" slot="actions" @click=${...}>Cancel</button>
 *    </schema-form>
 * 
 * 5. Completely custom actions (hides default buttons):
 *    <schema-form .jsonSchema=${schema} hide-actions>
 *      <div slot="actions" style="display: flex; gap: 1rem;">
 *        <button type="submit" class="btn btn-primary">Custom Submit</button>
 *        <button type="button" class="btn">Custom Action</button>
 *      </div>
 *    </schema-form>
 */
export class SchemaForm extends LitElement {
  static properties = {
    jsonSchema: { type: Object, attribute: 'json-schema' },
    uiSchema:   { type: Object, attribute: 'ui-schema'   },
    values:     { type: Object },
    action:     { type: String },
    method:     { type: String }, // 'get' | 'post' | 'dialog'
    disabled:   { type: Boolean, reflect: true },
    hideActions: { type: Boolean, attribute: 'hide-actions' },
    submitLabel: { type: String, attribute: 'submit-label' },
    resetLabel:  { type: String, attribute: 'reset-label' },
    hideReset:   { type: Boolean, attribute: 'hide-reset' },
  };

  // Light DOM so page CSS can style generated markup
  createRenderRoot() { return this; }

  // ===== Private state =====
  #renderers = new Map();
  #validator = null;
  #compiled = null;
  #data = {};
  #idBase = `sf-${Math.random().toString(36).slice(2)}`;

  constructor() {
    super();
    this.jsonSchema = undefined;
    this.uiSchema = undefined;
    this.values = undefined;
    this.method = 'post';
    this.hideActions = false;
    this.submitLabel = 'Submit';
    this.resetLabel = 'Reset';
    this.hideReset = false;
    this.#installDefaultRenderers();
  }

  // ===== Public API =====
  defineRenderer(widgetKey, fn) { this.#renderers.set(widgetKey, fn); }
  useValidator(fn) { this.#validator = fn; }
  set values(v) { this.#data = { ...(this.#data || {}), ...(v || {}) }; this.requestUpdate(); }
  get values() { return this.#data; }

  serialize() {
    const form = this.renderRoot?.querySelector('form');
    const fd = form ? new FormData(form) : new FormData();
    return { json: structuredClone(this.#data), formData: fd };
  }

  async submit() { return this.#onSubmit(new Event('submit', { cancelable: true })); }

  // ===== Lit lifecycle =====
  willUpdate(changed) {
    if (changed.has('jsonSchema')) this.#compile();
    if (changed.has('uiSchema')) this.requestUpdate();
  }

  // ===== Schema compilation =====
  #compile() {
    const root = this.jsonSchema;
    if (!root || typeof root !== 'object') { this.#compiled = null; return; }
    const resolved = this.#emitCancelable('pw:schema-resolve', { schema: root })?.schema || root;
    const node = this.#compileNode(resolved, '');
    this.#compiled = node;
    this.#applyDefaults(resolved, this.#data, '');
  }

  #compileNode(schema, path) {
    const title = schema.title ?? this.#titleFromPath(path);
    const ui = this.#uiFor(path);
    const custom = this.#emitCancelable('pw:compile-node', { path, schema, ui });
    if (custom?.node) return custom.node;

    if (schema.oneOf || schema.anyOf) {
      const choices = (schema.oneOf || schema.anyOf).map((s, i) => ({
        kind: 'choice-option',
        index: i,
        schema: s,
        title: s.title ?? `Option ${i+1}`
      }));
      return { kind: 'choice', path, title, schema, options: choices };
    }

    switch (schema.type) {
      case 'object': {
        const order = this.#propertyOrder(schema, ui);
        const children = order.map((key) => {
          const childPath = path + '/' + this.#escapeJsonPointer(key);
          return this.#compileNode(schema.properties[key], childPath);
        });
        return { kind: 'fieldset', path, title, schema, children };
      }
      case 'array': {
        const itemSchema = Array.isArray(schema.items) ? { type: 'object', properties: {} } : (schema.items || {});
        
        // Special case: array with enum items → checkbox-group
        if (itemSchema.enum && Array.isArray(itemSchema.enum)) {
          return { kind: 'field', path, title, schema, ui, widgetKey: 'checkbox-group' };
        }
        
        // Standard array with add/remove
        const itemNode = this.#compileNode(itemSchema, path + '/*');
        return { kind: 'array', path, title, schema, item: itemNode };
      }
      default: {
        const widgetKey = this.#decideWidget(schema, ui, path);
        return { kind: 'field', path, title, schema, ui, widgetKey };
      }
    }
  }

  #propertyOrder(schema, ui) {
    const props = schema.properties ? Object.keys(schema.properties) : [];
    const specified = ui?.['ui:order'] || this.uiSchema?.['ui:order'];
    if (!specified) return props;
    const byPtr = new Map(props.map(k => [ '/' + this.#escapeJsonPointer(k), k ]));
    const ordered = [];
    for (const p of specified) {
      const key = p.startsWith('/') ? byPtr.get(p) : p;
      if (key && props.includes(key)) ordered.push(key);
    }
    for (const k of props) if (!ordered.includes(k)) ordered.push(k);
    return ordered;
  }

  #decideWidget(schema, ui, path) {
    const picked = this.#emitCancelable('pw:choose-widget', { path, schema, ui, widget: null });
    if (picked?.widget) return picked.widget;
    if (schema.enum) return (schema.enum.length <= 5) ? 'radio' : 'select';
    if (schema.const !== undefined) return 'const';
    if (schema.type === 'string') {
      switch (schema.format) {
        case 'email': return 'input-email';
        case 'uri':
        case 'url': return 'input-url';
        case 'date': return 'input-date';
        case 'time': return 'input-time';
        case 'datetime-local': return 'input-datetime';
        case 'color': return 'input-color';
        case 'date-time': return 'input-datetime';
        default:
          if ((schema.maxLength ?? Infinity) > 160 || ui?.['ui:widget'] === 'textarea') return 'textarea';
          return 'input-text';
      }
    }
    if (schema.type === 'number' || schema.type === 'integer') return 'input-number';
    if (schema.type === 'boolean') return 'checkbox';
    return 'input-text';
  }

  #applyDefaults(schema, target, path) {
    if (schema.default !== undefined && this.#getByPath(target, path) === undefined) {
      this.#setByPath(target, path, structuredClone(schema.default));
    }
    if (schema.type === 'object' && schema.properties) {
      for (const [k, s] of Object.entries(schema.properties)) {
        this.#applyDefaults(s, target, path + '/' + this.#escapeJsonPointer(k));
      }
    }
    if (schema.type === 'array' && schema.items && Array.isArray(schema.default)) {
      this.#setByPath(target, path, structuredClone(schema.default));
    }
  }

  // ===== Rendering =====
  render() {
    
    const tree = this.#compiled;
    if (!tree) return html`<div class="schema-form-error" style="color: red; padding: 1rem; border: 1px solid red; background: #fee;">
      <p>Failed to generate form schema.</p>
      <pre>${JSON.stringify(this.#data, null, 2)}</pre>
    </div>`;
    const m = (this.method === 'get' || this.method === 'post' || this.method === 'dialog') ? this.method : 'post';
    return html`
      <form method=${m} action=${this.action ?? nothing} @submit=${this.#onSubmit} ?disabled=${this.disabled}>
        ${tree ? this.#renderNode(tree) : html`<slot></slot>`}
        
        ${!this.hideActions ? html`
          <div class="form-actions" style="margin-top: var(--spacing-6, 1.5rem); display: flex; gap: var(--spacing-3, 0.75rem);">
            <button type="submit" class="btn btn-primary">${this.submitLabel}</button>
            ${!this.hideReset ? html`<button type="reset" class="btn">${this.resetLabel}</button>` : nothing}
            <slot name="actions"></slot>
          </div>
        ` : html`<slot name="actions"></slot>`}
      </form>
    `;
  }

  #renderNode(node) {
    switch (node.kind) {
      case 'fieldset': return this.#renderFieldset(node);
      case 'field':    return this.#renderField(node);
      case 'array':    return this.#renderArray(node);
      case 'choice':   return this.#renderChoice(node);
      default: return nothing;
    }
  }

  #renderFieldset(node) {
    const legend = node.title ?? 'Section';
    return html`
      <fieldset data-path=${node.path}>
        <legend>${legend}</legend>
        ${node.children.map(child => this.#renderNode(child))}
      </fieldset>
    `;
  }

  #renderChoice(node) {
    const path = node.path;
    const value = this.#getByPath(this.#data, path + '/__choice');
    const index = Number.isInteger(value) ? value : 0;
    const active = node.options[index] ?? node.options[0];

    const onChange = (e) => {
      const i = Number(e.target.value);
      this.#setByPath(this.#data, path + '/__choice', i);
      this.#deleteByPathPrefix(this.#data, path + '/');
      this.requestUpdate();
      this.#emit('pw:value-change', { name: path, value: i, validity: { valid: true } });
    };

    return html`
      <fieldset data-path=${path}>
        <legend>${node.title ?? 'Choose one'}</legend>
        <label>
          <span data-label>Variant</span>
          <select @change=${onChange} .value=${String(index)}>
            ${node.options.map((opt, i) => html`<option value=${String(i)}>${opt.title}</option>`)}
          </select>
        </label>
        <div>${this.#renderNode(this.#compileNode(active.schema, path))}</div>
      </fieldset>
    `;
  }

  #renderArray(node) {
    const path = node.path;
    const arr = this.#ensureArrayAtPath(path);

    const add = () => { arr.push(this.#defaultFor(node.item.schema)); this.requestUpdate(); this.#emit('pw:array-add', { path }); };
    const remove = (idx) => { arr.splice(idx,1); this.requestUpdate(); this.#emit('pw:array-remove', { path, index: idx }); };
    const move = (from, to) => {
      if (to < 0 || to >= arr.length) return;
      const [v] = arr.splice(from,1);
      arr.splice(to,0,v);
      this.requestUpdate();
      this.#emit('pw:array-reorder', { path, from, to });
    };

    return html`
      <fieldset data-path=${path}>
        <legend>${node.title ?? 'List'}</legend>
        <div class="array-list">
          ${arr.map((_, i) => html`
            <div class="array-item" data-index=${i}>
              ${this.#renderNode(this.#repath(node.item, path + '/' + i))}
              <div class="array-controls">
                <button type="button" @click=${() => move(i, i-1)} title="Move up">↑</button>
                <button type="button" @click=${() => move(i, i+1)} title="Move down">↓</button>
                <button type="button" @click=${() => remove(i)} title="Remove">Remove</button>
              </div>
            </div>
          `)}
        </div>
        <div class="array-controls">
          <button type="button" @click=${add}>Add</button>
        </div>
      </fieldset>
    `;
  }

  #repath(subNode, newPath) {
    const updated = { ...subNode, path: newPath };
    // Recursively update children paths if this is a fieldset
    if (updated.kind === 'fieldset' && updated.children) {
      const oldPath = subNode.path;
      updated.children = updated.children.map(child => {
        // Replace the old path prefix with the new path
        const childNewPath = child.path.replace(oldPath, newPath);
        return this.#repath(child, childNewPath);
      });
    }
    return updated;
  }

  #renderField(node) {
    const path = node.path;
    const id = this.#idFromPath(path);
    const label = node.title ?? this.#titleFromPath(path);
    const value = this.#getByPath(this.#data, path);
    const required = this.#isRequired(path);
    const ui = node.ui || this.#uiFor(path);

    // Override hook before default field render
    {
      const override = this.#emitCancelable('pw:before-render-field', { path, schema: node.schema, ui, mount: null, render: null });
      if (override?.render) return override.render();
    }

    // Default renderer lookup: returns ONLY the control markup
    const renderer = this.#renderers.get(node.widgetKey) || this.#renderers.get('*');
    let controlTpl = renderer ? renderer({
      id, path, label, value, required, ui, schema: node.schema,
      get: (p) => this.#getByPath(this.#data, p ?? path),
      set: (val, p) => this.#assignValue(p ?? path, val),
      attrs: this.#nativeConstraints(path, node.schema),
      host: this,
    }) : nothing;

    // Post-creation tweak
    controlTpl = this.#emitReadonly('pw:render-field', { path, schema: node.schema, node: controlTpl }) ?? controlTpl;

    const help = ui?.['ui:help'];

    // Group widgets use fieldset
    if (this.#isGroupWidget(node.widgetKey)) {
      queueMicrotask(() => this.#emit('pw:after-render-field', { path, schema: node.schema }));
      const role = node.widgetKey === 'radio' ? 'radiogroup' : 
                   node.widgetKey === 'checkbox-group' ? 'group' : undefined;
      return html`
        <fieldset data-path=${path} role=${ifDefined(role)}>
          <legend>${label}</legend>
          ${controlTpl}
          ${help ? html`<div data-help>${help}</div>` : nothing}
        </fieldset>
      `;
    }

    // Standard label wrapper
    queueMicrotask(() => this.#emit('pw:after-render-field', { path, schema: node.schema }));
    
    // Add data-toggle for boolean checkboxes
    const isCheckbox = node.widgetKey === 'checkbox';
    
    return html`
      <label for=${id} ?data-toggle=${isCheckbox}>
        <span data-label>${label}</span>
        ${controlTpl}
        ${help ? html`<div data-help>${help}</div>` : nothing}
      </label>
    `;
  }

  // ===== Default renderers: controls only (no spread arrays) =====
  #installDefaultRenderers() {
    // Fallback text input
    this.#renderers.set('*', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="text"
        .value=${value ?? ''}
        minlength=${ifDefined(attrs.minLength)}
        maxlength=${ifDefined(attrs.maxLength)}
        pattern=${ifDefined(attrs.pattern)}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        autocomplete=${ifDefined(attrs.autocomplete)}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-text', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="text"
        .value=${value ?? ''}
        minlength=${ifDefined(attrs.minLength)}
        maxlength=${ifDefined(attrs.maxLength)}
        pattern=${ifDefined(attrs.pattern)}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        autocomplete=${ifDefined(attrs.autocomplete)}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('textarea', ({ id, value, attrs, set, ui }) => html`
      <textarea
        id=${id}
        .value=${value ?? ''}
        rows=${ui?.['ui:rows'] ?? 4}
        minlength=${ifDefined(attrs.minLength)}
        maxlength=${ifDefined(attrs.maxLength)}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      ></textarea>
    `);

    this.defineRenderer('input-number', ({ id, value, attrs, set, schema }) => {
      const step = attrs.step != null ? attrs.step : (schema.type === 'integer' ? 1 : undefined);
      return html`
        <input
          id=${id}
          type="number"
          .value=${value ?? ''}
          min=${ifDefined(attrs.min)}
          max=${ifDefined(attrs.max)}
          step=${ifDefined(step)}
          ?readonly=${!!attrs.readOnly}
          ?required=${!!attrs.required}
          @input=${(e) => {
            const v = e.target.value;
            set(v === '' ? undefined : (schema.type === 'integer' ? parseInt(v,10) : parseFloat(v)));
          }}
        />
      `;
    });

    this.defineRenderer('input-email', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="email"
        .value=${value ?? ''}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        autocomplete=${ifDefined(attrs.autocomplete)}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-url', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="url"
        .value=${value ?? ''}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-date', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="date"
        .value=${value ?? ''}
        min=${ifDefined(attrs.min)}
        max=${ifDefined(attrs.max)}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-time', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="time"
        .value=${value ?? ''}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-color', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="color"
        .value=${value ?? ''}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('input-datetime', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="datetime-local"
        .value=${value ?? ''}
        ?readonly=${!!attrs.readOnly}
        ?required=${!!attrs.required}
        @input=${(e) => set(e.target.value)}
      />
    `);

    this.defineRenderer('checkbox', ({ id, value, attrs, set }) => html`
      <input
        id=${id}
        type="checkbox"
        .checked=${!!value}
        ?required=${!!attrs.required}
        @change=${(e) => set(!!e.target.checked)}
      />
    `);

    this.defineRenderer('select', ({ id, value, attrs, set, schema }) => html`
      <select
        id=${id}
        .value=${value ?? ''}
        ?required=${!!attrs.required}
        @change=${(e) => set(e.target.value)}
      >
        <option value="" ?selected=${value==null}>—</option>
        ${(schema.enum || []).map(v => html`<option value=${String(v)}>${String(v)}</option>`)}
      </select>
    `);

    // Radio group: returns ONLY the labeled inputs
    // Matches AutoDesigner pattern: input hidden, label styled as button
    this.defineRenderer('radio', ({ id, value, attrs, set, schema }) => html`
      ${(schema.enum || []).map((v, i) => {
        const rid = `${id}-${i}`;
        return html`
          <label for=${rid}>
            <input
              id=${rid}
              type="radio"
              name=${id}
              .value=${String(v)}
              .checked=${String(value)===String(v)}
              ?required=${!!attrs.required}
              @change=${(e) => { if (e.target.checked) set(schema.enum[i]); }}
            />
            ${String(v)}
          </label>
        `;
      })}
    `);

    // Checkbox group: for multi-select from enum (array type with enum items)
    // Shows actual checkboxes (not button-style like radios)
    this.defineRenderer('checkbox-group', ({ id, value, attrs, set, schema }) => {
      const selected = Array.isArray(value) ? value : [];
      const options = schema.items?.enum || schema.enum || [];
      
      return html`
        ${options.map((v, i) => {
          const cid = `${id}-${i}`;
          const isChecked = selected.includes(v);
          
          return html`
            <label for=${cid}>
              <input
                id=${cid}
                type="checkbox"
                .value=${String(v)}
                .checked=${isChecked}
                @change=${(e) => {
                  // Use e.target.checked to get the NEW state after the change
                  const newSelected = e.target.checked 
                    ? [...selected, v]
                    : selected.filter(x => x !== v);
                  set(newSelected);
                }}
              />
              <span>${String(v)}</span>
            </label>
          `;
        })}
      `;
    });

    this.defineRenderer('const', ({ id, value, schema }) => html`
      <input id=${id} type="text" .value=${schema.const ?? value ?? ''} readonly />
    `);
  }

  // ===== Form submit =====
  async #onSubmit(e) {
    if (e) e.preventDefault?.();
    const form = this.renderRoot?.querySelector('form');
    let nativeValid = true;
    if (form) nativeValid = form.checkValidity();

    let schemaValid = { valid: true };
    if (this.#validator) {
      try { schemaValid = await this.#validator(this.#data, this.jsonSchema); }
      catch (err) { schemaValid = { valid: false, errors: [{ message: String(err) }] }; }
    }

    const payload = this.serialize();
    const serialDetail = { ...payload, valid: nativeValid && schemaValid.valid, issues: schemaValid.errors || [] };
    const pre = this.#emitCancelable('pw:serialize', serialDetail);
    const final = pre || serialDetail;

    this.#emit('pw:submit', final);
    return final;
  }

  // ===== Utilities =====
  #uiFor(path) { return (this.uiSchema?.[path]) || (this.uiSchema?.[this.#asRel(path)]); }
  #asRel(path) { return path.startsWith('/') ? path : '/' + path; }

  #idFromPath(path) {
    const norm = path.replace(/[^a-zA-Z0-9_\-]+/g, '-');
    return `${this.#idBase}${norm ? '-' + norm : ''}`;
  }

  #titleFromPath(path) {
    const seg = path.split('/').filter(Boolean).pop() || '';
    return seg.replace(/-/g,' ').replace(/_/g,' ').replace(/\*/g,'').replace(/\b\w/g, c => c.toUpperCase());
  }

  #nativeConstraints(path,schema) {
    const attrs = {};
    if (schema.type === 'string') {
      if (schema.minLength != null) attrs.minLength = schema.minLength;
      if (schema.maxLength != null) attrs.maxLength = schema.maxLength;
      if (schema.pattern) attrs.pattern = schema.pattern;
    }
    if (schema.type === 'number' || schema.type === 'integer') {
      if (schema.minimum != null) attrs.min = schema.minimum;
      if (schema.maximum != null) attrs.max = schema.maximum;
      if (schema.multipleOf != null) attrs.step = schema.multipleOf;
    }
    if (schema.readOnly) attrs.readOnly = true;
    if (schema.writeOnly) attrs.readOnly = true;
    if (schema.format === 'email') attrs.autocomplete = 'email';
    if (this.#isRequired(path, schema)) attrs.required = true;
    return attrs;
  }

  #isRequired(path, schemaNode = null) {
    if (schemaNode && Object.prototype.hasOwnProperty.call(schemaNode, 'required')) return !!schemaNode.required;
    try {
      const parts = path.split('/').filter(Boolean);
      const prop = parts.pop();
      const parentPath = '/' + parts.join('/');
      const parent = this.#schemaAt(parentPath);
      return !!(parent?.required && Array.isArray(parent.required) && parent.required.includes(this.#unescapeJsonPointer(prop)));
    } catch { return false; }
  }

  #schemaAt(path) {
    let cur = this.jsonSchema;
    for (const seg of path.split('/').filter(Boolean)) {
      const key = this.#unescapeJsonPointer(seg);
      if (cur?.type === 'object' && cur.properties && key in cur.properties) {
        cur = cur.properties[key];
      } else if (cur?.type === 'array') {
        cur = cur.items;
      } else {
        return null;
      }
    }
    return cur;
  }

  #defaultFor(schema) {
    if (schema && schema.default !== undefined) return structuredClone(schema.default);
    switch (schema?.type) {
      case 'string': return '';
      case 'number':
      case 'integer': return 0;
      case 'boolean': return false;
      case 'object': return {};
      case 'array': return [];
      default: return null;
    }
  }

  #ensureArrayAtPath(path) {
    let arr = this.#getByPath(this.#data, path);
    if (!Array.isArray(arr)) { arr = []; this.#setByPath(this.#data, path, arr); }
    return arr;
  }

  #assignValue(path, val) {
    this.#setByPath(this.#data, path, val);
    this.requestUpdate();
    const validity = { valid: true };
    this.#emit('pw:value-change', { name: path, value: val, validity });
  }

  #getByPath(obj, path) {
    if (!path || path === '') return obj;
    const parts = path.split('/').filter(Boolean);
    let cur = obj;
    for (const seg of parts) {
      const k = seg === '*' ? seg : this.#unescapeJsonPointer(seg);
      if (k === '*') return cur;
      if (cur == null) return undefined;
      cur = cur[k];
    }
    return cur;
  }

  #setByPath(obj, path, val) {
    if (!path || path === '') throw new Error('Cannot set root directly');
    const parts = path.split('/').filter(Boolean);
    let cur = obj;
    for (let i=0; i<parts.length-1; i++) {
      const seg = this.#unescapeJsonPointer(parts[i]);
      if (!(seg in cur) || typeof cur[seg] !== 'object' || cur[seg] === null) cur[seg] = {};
      cur = cur[seg];
    }
    const last = this.#unescapeJsonPointer(parts[parts.length-1]);
    cur[last] = val;
  }

  #deleteByPathPrefix(obj, prefix) {
    const parts = prefix.split('/').filter(Boolean);
    const stack = [];
    let cur = obj;
    for (const seg of parts) {
      const key = this.#unescapeJsonPointer(seg);
      stack.push([cur, key]);
      cur = cur?.[key];
      if (cur == null) return;
    }
    const [parent, key] = stack.pop();
    if (parent && key in parent) delete parent[key];
  }

  #escapeJsonPointer(s) { return s.replace(/~/g, '~0').replace(/\//g, '~1'); }
  #unescapeJsonPointer(s) { return s.replace(/~1/g, '/').replace(/~0/g, '~'); }

  #isGroupWidget(key) { return key === 'radio' || key === 'checkbox-group'; }

  // ===== Event helpers =====
  #emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    return detail;
  }
  #emitReadonly(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    return detail?.node;
  }
  #emitCancelable(name, detail) {
    const ev = new CustomEvent(name, { detail, bubbles: true, composed: true, cancelable: true });
    this.dispatchEvent(ev);
    return ev.defaultPrevented ? detail : null;
  }
}

customElements.define('schema-form', SchemaForm);
