import { LitElement, html, nothing, ifDefined, ref, keyed } from "#pds/lit";
import { PDS } from "#pds";

function getStep(value) {
  if (typeof value === "number") {
    const decimalPlaces = (value.toString().split(".")[1] || "").length;
    return decimalPlaces > 0 ? `0.${"1".padStart(decimalPlaces, "0")}` : "1";
  }
  return "1"; // Default step for integers
}

// Default options for pds-form
const DEFAULT_OPTIONS = {
  widgets: {
    booleans: "toggle", // 'toggle' | 'toggle-with-icons' | 'checkbox'
    numbers: "input", // 'input' | 'range'
    selects: "standard", // 'standard' | 'dropdown'
  },
  layouts: {
    fieldsets: "default", // 'default' | 'flex' | 'grid' | 'accordion' | 'tabs' | 'card'
    arrays: "default", // 'default' | 'open' | 'compact'
  },
  enhancements: {
    icons: true, // Enable icon-enhanced inputs
    datalists: true, // Enable datalist autocomplete
    rangeOutput: true, // Use .range-output for ranges
    colorInput: true, // Use label[data-color] enhancement for color widgets
  },
  validation: {
    showErrors: true, // Show validation errors inline
    validateOnChange: false, // Validate on every change vs on submit
  },
};

/**
 * <pds-form>
 *
 * Form Actions:
 * By default, the form includes Submit and Reset buttons inside the <form> element.
 *
 * Usage options:
 * 1. Default buttons:
 *    <pds-form .jsonSchema=${schema}></pds-form>
 *
 * 2. Customize labels:
 *    <pds-form .jsonSchema=${schema} submit-label="Save" reset-label="Clear"></pds-form>
 *
 * 3. Hide reset button:
 *    <pds-form .jsonSchema=${schema} hide-reset></pds-form>
 *
 * 4. Add extra buttons (slot):
 *    <pds-form .jsonSchema=${schema}>
 *      <button type="button" slot="actions" @click=${...}>Cancel</button>
 *    </pds-form>
 *
 * 5. Completely custom actions (hides default buttons):
 *    <pds-form .jsonSchema=${schema} hide-actions>
 *      <div slot="actions" class="flex gap-md">
 *        <button type="submit" class="btn btn-primary">Custom Submit</button>
 *        <button type="button" class="btn">Custom Action</button>
 *      </div>
 *    </pds-form>
 */
export class SchemaForm extends LitElement {
  static properties = {
    jsonSchema: { type: Object, attribute: "json-schema" },
    uiSchema: { type: Object, attribute: "ui-schema" },
    options: { type: Object },
    values: { type: Object }, // Make it reactive again
    action: { type: String },
    method: { type: String }, // 'get' | 'post' | 'dialog'
    disabled: { type: Boolean, reflect: true },
    hideActions: { type: Boolean, attribute: "hide-actions" },
    submitLabel: { type: String, attribute: "submit-label" },
    resetLabel: { type: String, attribute: "reset-label" },
    hideReset: { type: Boolean, attribute: "hide-reset" },
    hideSubmit: { type: Boolean, attribute: "hide-submit" },
    hideLegend: { type: Boolean, attribute: "hide-legend" },
  };

  // Light DOM so page CSS can style generated markup
  createRenderRoot() {
    return this;
  }

  // ===== Private state =====
  #renderers = new Map();
  #validator = null;
  #compiled = null;
  #data = {};
  #idBase = `sf-${Math.random().toString(36).slice(2)}`;
  #mergedOptions = null;
  #slottedActions = [];
  #dependencies = new Map(); // targetPath → Set of sourcePaths that affect it
  #resetKey = 0; // Incremented on reset to force Lit to recreate DOM elements
  #slottedContent = new Map(); // slot name → element for ui:before/ui:after slot references

  constructor() {
    super();
    this.jsonSchema = undefined;
    this.uiSchema = undefined;
    this.options = undefined;
    this.values = undefined;
    this.method = "post";
    this.hideActions = false;
    this.submitLabel = "Submit";
    this.resetLabel = "Reset";
    this.hideReset = false;
    this.hideLegend = false;
    this.#installDefaultRenderers();

    // Handle submit button clicks in slotted actions
    this.addEventListener("click", (e) => {
      const button = e.target.closest('button[type="submit"]');
      if (button && this.contains(button)) {
        const form = this.querySelector("form");
        if (form) {
          e.preventDefault();
          form.requestSubmit();
        }
      }
    });
  }

  // ===== Public API =====
  defineRenderer(widgetKey, fn) {
    this.#renderers.set(widgetKey, fn);
  }
  useValidator(fn) {
    this.#validator = fn;
  }

  // Get values in flat JSON Pointer format
  getValuesFlat() {
    return this.#flattenToPointers(this.#data);
  }

  #flattenToPointers(obj, prefix = "") {
    const flattened = {};
    for (const [key, value] of Object.entries(obj)) {
      const jsonPointerPath = prefix ? `${prefix}/${key}` : `/${key}`;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(
          flattened,
          this.#flattenToPointers(value, jsonPointerPath)
        );
      } else {
        flattened[jsonPointerPath] = value;
      }
    }
    return flattened;
  }

  serialize() {
    const form = this.renderRoot?.querySelector("form");
    const fd = form ? new FormData(form) : new FormData();
    return { json: structuredClone(this.#data), formData: fd };
  }

  async submit() {
    return this.#onSubmit(new Event("submit", { cancelable: true }));
  }

  reset() {
    const form = this.renderRoot?.querySelector("form");
    if (form) form.reset(); // Triggers native reset which calls #onReset
    else this.#onReset(new Event("reset")); // Manual fallback
  }

  connectedCallback() {
    super.connectedCallback();
    // Capture slotted elements before first render (Light DOM doesn't support native slots)
    this.#slottedActions = Array.from(
      this.querySelectorAll('[slot="actions"]')
    );
    // Capture all named slots for ui:before/ui:after references
    this.#slottedContent = new Map();
    this.querySelectorAll('[slot]').forEach((el) => {
      const slotName = el.getAttribute('slot');
      if (slotName && slotName !== 'actions') {
        this.#slottedContent.set(slotName, el);
      }
    });
  }

  // ===== Lit lifecycle =====
  willUpdate(changed) {
    // Merge options when options or jsonSchema changes
    if (changed.has("options") || changed.has("jsonSchema")) {
      this.#mergeOptions();
    }

    if (changed.has("jsonSchema")) this.#compile();
    if (changed.has("uiSchema")) this.requestUpdate();
    if (changed.has("values")) {
      // When values property changes, update internal data
      const v = this.values;
      if (!v) {
        this.#data = {};
      } else {
        const newData = {};
        for (const [key, value] of Object.entries(v)) {
          if (key.startsWith("/")) {
            this.#setByPath(newData, key, value);
          } else {
            newData[key] = value;
          }
        }
        this.#data = newData;
      }
    }
  }

  #mergeOptions() {
    // Start with default options
    let merged = { ...DEFAULT_OPTIONS };

    // Try to get preset options from PDS if available
    if (PDS?.config?.form?.options) {
      merged = PDS.common.deepMerge(
        merged,
        PDS.config.form.options
      );
    }

    // Merge instance options
    if (this.options) {
      merged = PDS.common.deepMerge(merged, this.options);
    }

    this.#mergedOptions = merged;
  }

  #getOption(path, defaultValue) {
    if (!this.#mergedOptions) this.#mergeOptions();

    // Support path-based options like '/address/zip': { ... }
    if (path.startsWith("/")) {
      const pathOptions = this.#mergedOptions[path];
      if (pathOptions !== undefined) return pathOptions;
    }

    // Support nested option paths like 'widgets.booleans'
    const parts = path.split(".");
    let current = this.#mergedOptions;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        return defaultValue;
      }
    }
    return current !== undefined ? current : defaultValue;
  }

  // ===== Condition Evaluation =====
  /**
   * Evaluate a condition object against current form data.
   * Supports:
   *   - Simple equality: { "/path": "value" }
   *   - Operators: { "/path": { "$eq": "value" } }
   *   - Multiple conditions (implicit AND): { "/a": "x", "/b": "y" }
   *   - Explicit logical: { "$and": [...] }, { "$or": [...] }, { "$not": {...} }
   *
   * Operators: $eq, $ne, $in, $nin, $gt, $gte, $lt, $lte, $exists, $regex
   */
  #evaluateCondition(condition) {
    if (!condition || typeof condition !== "object") return true;

    // Handle logical operators
    if ("$and" in condition) {
      return condition.$and.every((c) => this.#evaluateCondition(c));
    }
    if ("$or" in condition) {
      return condition.$or.some((c) => this.#evaluateCondition(c));
    }
    if ("$not" in condition) {
      return !this.#evaluateCondition(condition.$not);
    }

    // Multiple path conditions = implicit AND
    for (const [key, expected] of Object.entries(condition)) {
      if (key.startsWith("$")) continue; // Skip operators at root
      const actualValue = this.#getByPath(this.#data, key);
      if (!this.#matchValue(actualValue, expected)) return false;
    }
    return true;
  }

  #matchValue(actual, expected) {
    // Simple equality shorthand
    if (expected === null || typeof expected !== "object" || Array.isArray(expected)) {
      return actual === expected;
    }

    // Operator object
    for (const [op, operand] of Object.entries(expected)) {
      switch (op) {
        case "$eq":
          if (actual !== operand) return false;
          break;
        case "$ne":
          if (actual === operand) return false;
          break;
        case "$in":
          if (!Array.isArray(operand) || !operand.includes(actual)) return false;
          break;
        case "$nin":
          if (Array.isArray(operand) && operand.includes(actual)) return false;
          break;
        case "$gt":
          if (!(actual > operand)) return false;
          break;
        case "$gte":
          if (!(actual >= operand)) return false;
          break;
        case "$lt":
          if (!(actual < operand)) return false;
          break;
        case "$lte":
          if (!(actual <= operand)) return false;
          break;
        case "$exists":
          if (operand && actual === undefined) return false;
          if (!operand && actual !== undefined) return false;
          break;
        case "$regex": {
          const regex = operand instanceof RegExp ? operand : new RegExp(operand);
          if (!regex.test(String(actual ?? ""))) return false;
          break;
        }
        default:
          // Unknown operator, ignore
          break;
      }
    }
    return true;
  }

  /**
   * Evaluate a calculate expression to compute a derived value.
   * Supports:
   *   - Path reference: "/path" → returns value at path
   *   - Concatenation: { "$concat": ["/firstName", " ", "/lastName"] }
   *   - Math: { "$sum": ["/a", "/b"] }, { "$multiply": ["/a", 2] }
   *   - Conditional: { "$if": { "cond": {...}, "then": expr, "else": expr } }
   */
  #evaluateCalculation(expr) {
    if (expr === null || expr === undefined) return undefined;

    // String path reference
    if (typeof expr === "string") {
      if (expr.startsWith("/")) {
        return this.#getByPath(this.#data, expr);
      }
      return expr; // Literal string
    }

    // Number or boolean literal
    if (typeof expr !== "object") return expr;

    // Array = literal array
    if (Array.isArray(expr)) {
      return expr.map((e) => this.#evaluateCalculation(e));
    }

    // Operators
    if ("$concat" in expr) {
      return expr.$concat
        .map((e) => this.#evaluateCalculation(e) ?? "")
        .join("");
    }
    if ("$sum" in expr) {
      return expr.$sum.reduce(
        (acc, e) => acc + (Number(this.#evaluateCalculation(e)) || 0),
        0
      );
    }
    if ("$multiply" in expr) {
      return expr.$multiply.reduce(
        (acc, e) => acc * (Number(this.#evaluateCalculation(e)) || 0),
        1
      );
    }
    if ("$subtract" in expr) {
      const [a, b] = expr.$subtract;
      return (Number(this.#evaluateCalculation(a)) || 0) - (Number(this.#evaluateCalculation(b)) || 0);
    }
    if ("$divide" in expr) {
      const [a, b] = expr.$divide;
      const divisor = Number(this.#evaluateCalculation(b)) || 1;
      return (Number(this.#evaluateCalculation(a)) || 0) / divisor;
    }
    if ("$if" in expr) {
      const { cond, then: thenExpr, else: elseExpr } = expr.$if;
      return this.#evaluateCondition(cond)
        ? this.#evaluateCalculation(thenExpr)
        : this.#evaluateCalculation(elseExpr);
    }
    if ("$coalesce" in expr) {
      for (const e of expr.$coalesce) {
        const val = this.#evaluateCalculation(e);
        if (val !== null && val !== undefined && val !== "") return val;
      }
      return null;
    }

    // Unknown object, return as-is
    return expr;
  }

  /**
   * Extract all path dependencies from a condition or calculation expression.
   */
  #extractDependencies(expr, deps = new Set()) {
    if (!expr) return deps;

    if (typeof expr === "string" && expr.startsWith("/")) {
      deps.add(expr);
      return deps;
    }

    if (Array.isArray(expr)) {
      for (const e of expr) this.#extractDependencies(e, deps);
      return deps;
    }

    if (typeof expr === "object") {
      for (const [key, value] of Object.entries(expr)) {
        if (key.startsWith("/")) {
          deps.add(key);
        }
        this.#extractDependencies(value, deps);
      }
    }

    return deps;
  }

  /**
   * Register dependencies for a target path based on its UI conditions.
   */
  #registerDependencies(targetPath, ui) {
    const deps = new Set();

    // Extract from all condition properties
    for (const prop of ["ui:visibleWhen", "ui:disabledWhen", "ui:requiredWhen", "ui:calculate"]) {
      if (ui?.[prop]) {
        this.#extractDependencies(ui[prop], deps);
      }
    }

    // Register reverse mapping: when source changes, target needs update
    for (const sourcePath of deps) {
      if (!this.#dependencies.has(sourcePath)) {
        this.#dependencies.set(sourcePath, new Set());
      }
      this.#dependencies.get(sourcePath).add(targetPath);
    }
  }

  // ===== Schema compilation =====
  #compile() {
    const root = this.jsonSchema;
    if (!root || typeof root !== "object") {
      this.#compiled = null;
      return;
    }
    // Clear dependency graph for fresh build
    this.#dependencies.clear();

    const resolved =
      this.#emitCancelable("pw:schema-resolve", { schema: root })?.schema ||
      root;
    const node = this.#compileNode(resolved, "");
    this.#compiled = node;
    this.#applyDefaults(resolved, this.#data, "");
  }

  #compileNode(schema, path) {
    const title = schema.title ?? this.#titleFromPath(path);
    const ui = this.#uiFor(path);

    // Register dependencies for conditional rendering
    if (ui) {
      this.#registerDependencies(path, ui);
    }

    const custom = this.#emitCancelable("pw:compile-node", {
      path,
      schema,
      ui,
    });
    if (custom?.node) return custom.node;

    // Check if oneOf/anyOf is used for enum-like selections (all have const)
    // If so, treat as a field with enum options, not as a complex choice
    if (schema.oneOf || schema.anyOf) {
      const { values } = this.#extractEnumOptions(schema);
      // If all options have const values, treat as enum field
      if (values.length > 0) {
        const widgetKey = this.#decideWidget(schema, ui, path);
        return { kind: "field", path, title, schema, ui, widgetKey };
      }
      // Otherwise, treat as complex choice (for actual oneOf/anyOf schemas)
      const choices = (schema.oneOf || schema.anyOf).map((s, i) => ({
        kind: "choice-option",
        index: i,
        schema: s,
        title: s.title ?? `Option ${i + 1}`,
      }));
      return { kind: "choice", path, title, schema, options: choices };
    }

    switch (schema.type) {
      case "object": {
        // Check if this should be a dialog
        if (ui?.["ui:dialog"]) {
          return { kind: "dialog", path, title, schema, ui };
        }

        const order = this.#propertyOrder(schema, ui);
        const children = order.map((key) => {
          const childPath = path + "/" + this.#escapeJsonPointer(key);
          return this.#compileNode(schema.properties[key], childPath);
        });
        return { kind: "fieldset", path, title, schema, children };
      }
      case "array": {
        const itemSchema = Array.isArray(schema.items)
          ? { type: "object", properties: {} }
          : schema.items || {};

        // Special case: array with enum/oneOf/anyOf items → checkbox-group
        const { values } = this.#extractEnumOptions(itemSchema);
        if (values.length > 0) {
          return {
            kind: "field",
            path,
            title,
            schema,
            ui,
            widgetKey: "checkbox-group",
          };
        }

        // Standard array with add/remove
        const itemNode = this.#compileNode(itemSchema, path + "/*");
        return { kind: "array", path, title, schema, item: itemNode };
      }
      default: {
        const widgetKey = this.#decideWidget(schema, ui, path);
        return { kind: "field", path, title, schema, ui, widgetKey };
      }
    }
  }

  #propertyOrder(schema, ui) {
    const props = schema.properties ? Object.keys(schema.properties) : [];
    const specified = ui?.["ui:order"] || this.uiSchema?.["ui:order"];
    if (!specified) return props;
    const byPtr = new Map(
      props.map((k) => ["/" + this.#escapeJsonPointer(k), k])
    );
    const ordered = [];
    for (const p of specified) {
      const key = p.startsWith("/") ? byPtr.get(p) : p;
      if (key && props.includes(key)) ordered.push(key);
    }
    for (const k of props) if (!ordered.includes(k)) ordered.push(k);
    return ordered;
  }

  // Helper to extract enum values and labels from enum, oneOf, or anyOf
  #extractEnumOptions(schema) {
    // Support standard enum array
    if (schema.enum && Array.isArray(schema.enum)) {
      return {
        values: schema.enum,
        labels: schema.enum.map(String)
      };
    }

    // Support oneOf pattern: [{ const: value, title: label }, ...]
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
      const values = [];
      const labels = [];
      for (const option of schema.oneOf) {
        if (option.const !== undefined) {
          values.push(option.const);
          labels.push(option.title ?? String(option.const));
        }
      }
      if (values.length > 0) {
        return { values, labels };
      }
    }

    // Support anyOf pattern: [{ const: value, title: label }, ...]
    if (schema.anyOf && Array.isArray(schema.anyOf)) {
      const values = [];
      const labels = [];
      for (const option of schema.anyOf) {
        if (option.const !== undefined) {
          values.push(option.const);
          labels.push(option.title ?? String(option.const));
        }
      }
      if (values.length > 0) {
        return { values, labels };
      }
    }

    return { values: [], labels: [] };
  }

  #decideWidget(schema, ui, path) {
    const picked = this.#emitCancelable("pw:choose-widget", {
      path,
      schema,
      ui,
      widget: null,
    });
    if (picked?.widget) return picked.widget;
    // Honor explicit uiSchema widget hints
    if (ui?.["ui:widget"]) return ui["ui:widget"];
    const { values } = this.#extractEnumOptions(schema);
    if (values.length > 0) return values.length <= 5 ? "radio" : "select";
    if (schema.const !== undefined) return "const";
    if (schema.type === "string") {
      // Check for binary/upload content via JSON Schema contentMediaType
      if (schema.contentMediaType || schema.contentEncoding === "base64") {
        return "upload";
      }
      switch (schema.format) {
        case "omnibox":
          return "omnibox";
        case "data-url":
          return "upload";
        case "upload":
          return "upload";
        case "richtext":
          return "richtext";
        case "email":
          return "input-email";
        case "password":
          return "input-password";
        case "uri":
        case "url":
          return "input-url";
        case "date":
          return "input-date";
        case "time":
          return "input-time";
        case "datetime-local":
          return "input-datetime";
        case "color":
          return "input-color";
        case "date-time":
          return "input-datetime";
        default:
          if ((schema.maxLength ?? 0) > 160 || ui?.["ui:widget"] === "textarea")
            return "textarea";
          return "input-text";
      }
    }
    if (schema.type === "number" || schema.type === "integer") {
      // Check if range widget should be used
      const useRange =
        this.#getOption("widgets.numbers", "input") === "range" ||
        ui?.["ui:widget"] === "range" ||
        ui?.["ui:widget"] === "input-range";
      return useRange ? "input-range" : "input-number";
    }
    if (schema.type === "boolean") {
      // Return the actual boolean widget type
      const booleanWidget = this.#getOption("widgets.booleans", "toggle");
      return booleanWidget === "checkbox" ? "checkbox" : booleanWidget;
    }
    return "input-text";
  }

  #applyDefaults(schema, target, path) {
    if (
      schema.default !== undefined &&
      this.#getByPath(target, path) === undefined
    ) {
      this.#setByPath(target, path, structuredClone(schema.default));
    }
    if (schema.type === "object" && schema.properties) {
      for (const [k, s] of Object.entries(schema.properties)) {
        this.#applyDefaults(s, target, path + "/" + this.#escapeJsonPointer(k));
      }
    }
    if (
      schema.type === "array" &&
      schema.items &&
      Array.isArray(schema.default)
    ) {
      this.#setByPath(target, path, structuredClone(schema.default));
    }
  }

  // ===== Rendering =====
  render() {
    const tree = this.#compiled;
    if (!tree)
      return html`<div class="callout callout-error">
        <p>Failed to generate form schema.</p>
        <pre>${JSON.stringify(this.#data, null, 2)}</pre>
      </div>`;
    const m =
      this.method === "get" ||
      this.method === "post" ||
      this.method === "dialog"
        ? this.method
        : "post";
    return html`
      <form
        ?data-required=${this.hasAttribute("data-required")}
        method=${m}
        action=${this.action ?? nothing}
        @submit=${this.#onSubmit}
        @reset=${this.#onReset}
        ?disabled=${this.disabled}
      >
        ${keyed(this.#resetKey, html`
          ${tree ? this.#renderNode(tree) : html`<slot></slot>`}
        `)}
        ${!this.hideActions
          ? html`
              <div class="form-actions">
                ${!this.hideSubmit
                  ? html` <button type="submit" class="btn btn-primary">
                      ${this.submitLabel}
                    </button>`
                  : nothing}
                ${!this.hideReset
                  ? html`<button type="reset" class="btn">
                      ${this.resetLabel}
                    </button>`
                  : nothing}
                ${this.#slottedActions}
              </div>
            `
          : html`<div class="form-actions">${this.#slottedActions}</div>`}
      </form>
    `;
  }

  #renderNode(node, context = {}) {
    // Check visibility condition
    const ui = node.ui || this.#uiFor(node.path);
    if (ui?.["ui:visibleWhen"] && !this.#evaluateCondition(ui["ui:visibleWhen"])) {
      return nothing;
    }
    // Also check static ui:hidden
    if (ui?.["ui:hidden"]) {
      return nothing;
    }

    switch (node.kind) {
      case "fieldset":
        return this.#renderFieldset(node, context);
      case "field":
        return this.#renderField(node);
      case "array":
        return this.#renderArray(node);
      case "choice":
        return this.#renderChoice(node);
      case "dialog":
        return this.#renderDialog(node);
      default:
        return nothing;
    }
  }

  #renderFieldset(node, context = {}) {
    const legend = node.title ?? "Section";
    const ui = node.ui || this.#uiFor(node.path);

    // Check for path-specific options
    const pathOptions = this.#getOption(node.path, {});

    // Determine layout mode
    const layout =
      ui?.["ui:layout"] ||
      pathOptions.layout ||
      this.#getOption("layouts.fieldsets", "default");

    // Check for tabs layout
    if (layout === "tabs" || ui?.["ui:tabs"]) {
      return this.#renderFieldsetTabs(node, legend, ui);
    }

    // Check for accordion layout
    if (layout === "accordion" || ui?.["ui:accordion"]) {
      return this.#renderFieldsetAccordion(node, legend, ui);
    }

    // Check for surface wrapping
    const surface = ui?.["ui:surface"] || pathOptions.surface;

    // Build layout classes using PDS utilities
    const layoutClasses = [];
    const layoutOptions = ui?.["ui:layoutOptions"] || {};

    if (layout === "flex") {
      layoutClasses.push("flex");
      if (layoutOptions.wrap) layoutClasses.push("flex-wrap");
      if (layoutOptions.direction === "column") layoutClasses.push("flex-col");
      if (layoutOptions.gap) {
        // Use PDS gap utility classes (xs, sm, md, lg, xl, 0)
        layoutClasses.push(`gap-${layoutOptions.gap}`);
      }
    } else if (layout === "grid") {
      layoutClasses.push("grid");
      const cols = layoutOptions.columns || 2;
      if (cols === "auto") {
        const autoSize = layoutOptions.autoSize || "md";
        layoutClasses.push(`grid-auto-${autoSize}`);
      } else {
        layoutClasses.push(`grid-cols-${cols}`);
      }
      if (layoutOptions.gap) {
        // Use PDS gap utility classes (xs, sm, md, lg, xl, 0)
        layoutClasses.push(`gap-${layoutOptions.gap}`);
      }
    }

    const fieldsetClass =
      layoutClasses.length > 0 ? layoutClasses.join(" ") : "stack-sm";

    // Render basic fieldset
    const fieldsetContent = html`
      <fieldset
        data-path=${node.path}
        class=${ifDefined(fieldsetClass)}
      >
        ${!this.hideLegend && !context.hideLegend
          ? html`<legend>${legend}</legend>`
          : nothing}
        ${node.children.map((child) =>
          this.#renderNode(
            child,
            context?.hideLegend ? { ...context, hideLegend: false } : context
          ))}
      </fieldset>
    `;

    // Wrap in surface if specified
    let result = fieldsetContent;
    if (surface) {
      const surfaceClass =
        surface === "card" || surface === "elevated" || surface === "dialog"
          ? `surface ${surface}`
          : "surface";
      result = html`<div class=${surfaceClass}>${fieldsetContent}</div>`;
    }

    // Apply ui:before and ui:after for fieldsets
    const renderContext = { path: node.path, schema: node.schema, ui, node, host: this };
    const before = this.#renderCustomContent(ui?.["ui:before"], renderContext);
    const after = this.#renderCustomContent(ui?.["ui:after"], renderContext);
    
    if (before || after) {
      return html`${before}${result}${after}`;
    }
    return result;
  }

  #renderFieldsetTabs(node, legend, ui) {
    const children = node.children || [];
    if (children.length === 0) return nothing;

    // Create tab panels from child fields
    return html`
      <pds-tabstrip label=${legend} data-path=${node.path}>
        ${children.map((child, idx) => {
          const childTitle = child.title ?? `Tab ${idx + 1}`;
          const childId = `${node.path}-tab-${idx}`.replace(
            /[^a-zA-Z0-9_-]/g,
            "-"
          );
          return html`
            <pds-tabpanel id=${childId} label=${childTitle}>
              ${this.#renderNode(child)}
            </pds-tabpanel>
          `;
        })}
      </pds-tabstrip>
    `;
  }

  #renderFieldsetAccordion(node, legend, ui) {
    const children = node.children || [];
    if (children.length === 0) return nothing;
    const layoutOptions = ui?.["ui:layoutOptions"] || {};
    const openFirst = layoutOptions.openFirst ?? true;

    return html`
      <section class="accordion" data-path=${node.path}>
        ${children.map((child, idx) => {
          const childTitle = child.title ?? `Section ${idx + 1}`;
          const childId = `${node.path}-acc-${idx}`.replace(
            /[^a-zA-Z0-9_-]/g,
            "-"
          );
          const isOpen =
            ui?.["ui:defaultOpen"]?.includes(idx) ?? (openFirst && idx === 0);
          return html`
            <details ?open=${isOpen}>
              <summary id=${childId}>${childTitle}</summary>
              <div role="region" aria-labelledby=${childId}>
                ${this.#renderNode(child, { hideLegend: true })}
              </div>
            </details>
          `;
        })}
      </section>
    `;
  }

  #renderDialog(node) {
    const path = node.path;
    const title = node.title ?? "Edit";
    const ui = node.ui || this.#uiFor(path);
    const dialogOpts = ui?.["ui:dialogOptions"] || {};
    const buttonLabel =
      dialogOpts.buttonLabel || ui?.["ui:dialogButton"] || `Edit ${title}`;
    const dialogTitle = dialogOpts.dialogTitle || title;

    const openDialog = async () => {
      // Read current value from this.#data on each open (not captured at render time)
      const currentValue = this.#getByPath(this.#data, path) || {};

      console.log("Opening dialog for path:", path);
      console.log("Current this.#data:", this.#data);
      console.log("Current value at path:", currentValue);

      this.#emit("pw:dialog-open", {
        path,
        schema: node.schema,
        value: currentValue,
      });

      // Create a nested form schema for the dialog
      const dialogSchema = { ...node.schema, title: dialogTitle };

      try {
        // Use PDS.ask to show dialog with form - it returns FormData when useForm: true
        const formData = await PDS.ask(
          html`<pds-form
            .jsonSchema=${dialogSchema}
            .values=${currentValue}
            .uiSchema=${this.uiSchema}
            .options=${this.options}
            hide-actions
            hide-legend
          ></pds-form>`,
          {
            title: dialogTitle,
            type: "custom",
            useForm: true,
            size: dialogOpts.size || "lg",
            buttons: {
              ok: { name: dialogOpts.submitLabel || "Save", primary: true },
              cancel: {
                name: dialogOpts.cancelLabel || "Cancel",
                cancel: true,
              },
            },
          }
        );

        // formData is a FormData object if user clicked OK, null/false if cancelled
        if (formData && formData instanceof FormData) {
          // Convert FormData to nested object structure
          // Note: The nested form generates paths from its own root (e.g., /name, /email)
          // so we don't need to strip a basePath prefix
          const updatedValue = this.#formDataToObject(
            formData,
            "",
            dialogSchema
          );

          console.log("Updating path:", path, "with value:", updatedValue);
          console.log(
            "Before update - this.#data:",
            structuredClone(this.#data)
          );

          // Update the data at the dialog's path
          this.#setByPath(this.#data, path, updatedValue);

          console.log(
            "After update - this.#data:",
            structuredClone(this.#data)
          );
          console.log("Verify read back:", this.#getByPath(this.#data, path));

          this.requestUpdate();
          this.#emit("pw:dialog-submit", { path, value: updatedValue });
        }
      } catch (err) {
        console.error("Dialog error:", err);
      }
    };

    const buttonIcon = dialogOpts.icon;

    return html`
      <div class="dialog-field" data-path=${path}>
        <button type="button" class="btn" @click=${openDialog}>
          ${buttonIcon
            ? html`<pds-icon icon=${buttonIcon}></pds-icon>`
            : nothing}
          ${buttonLabel}
        </button>
        <input
          type="hidden"
          name=${path}
          .value=${JSON.stringify(this.#getByPath(this.#data, path) || {})}
        />
      </div>
    `;
  }

  // Convert FormData to nested object, handling JSON pointer paths
  #formDataToObject(formData, basePath = "", schema = null) {
    const result = {};
    const arrays = new Map(); // Track array values from checkbox groups

    for (const [key, value] of formData.entries()) {
      // Remove basePath prefix if present to get relative path
      let relativePath = key;
      if (basePath && key.startsWith(basePath)) {
        relativePath = key.substring(basePath.length);
      }

      // Skip empty paths
      if (!relativePath || relativePath === "/") continue;

      // Handle array notation for checkbox groups (path[])
      if (relativePath.endsWith("[]")) {
        const arrayPath = relativePath.slice(0, -2);
        if (!arrays.has(arrayPath)) {
          arrays.set(arrayPath, []);
        }
        arrays.get(arrayPath).push(value);
        continue;
      }

      // Convert value based on schema type if available
      let convertedValue = value;
      const fieldSchema = schema
        ? this.#schemaAtPath(schema, relativePath)
        : this.#schemaAt(relativePath);

      if (fieldSchema) {
        if (fieldSchema.type === "number") {
          convertedValue = parseFloat(value);
        } else if (fieldSchema.type === "integer") {
          convertedValue = parseInt(value, 10);
        } else if (fieldSchema.type === "boolean") {
          // Checkbox inputs: if present in FormData, they're checked (true)
          // If not present, they're unchecked (false) - handled below
          convertedValue = value === "on" || value === "true" || value === true;
        }
      }

      // Set value using JSON pointer path
      this.#setByPath(result, relativePath, convertedValue);
    }

    // Add array values from checkbox groups
    for (const [arrayPath, values] of arrays) {
      this.#setByPath(result, arrayPath, values);
    }

    // Handle unchecked checkboxes - they won't be in FormData
    // We need to set them to false based on schema
    this.#ensureCheckboxDefaults(result, basePath, schema);

    return result;
  }

  // Ensure boolean fields that weren't in FormData are set to false
  #ensureCheckboxDefaults(obj, basePath = "", schemaRoot = null) {
    const schema = schemaRoot
      ? this.#schemaAtPath(schemaRoot, basePath)
      : this.#schemaAt(basePath);
    if (!schema) return;

    if (schema.type === "object" && schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        const propPath = basePath + "/" + this.#escapeJsonPointer(key);
        const relativePath = propPath.startsWith("/")
          ? propPath.substring(1)
          : propPath;

        if (
          propSchema.type === "boolean" &&
          this.#getByPath(obj, propPath) === undefined
        ) {
          this.#setByPath(obj, propPath, false);
        } else if (propSchema.type === "object") {
          this.#ensureCheckboxDefaults(obj, propPath, schemaRoot);
        }
      }
    }
  }

  #renderChoice(node) {
    const path = node.path;
    const value = this.#getByPath(this.#data, path + "/__choice");
    const index = Number.isInteger(value) ? value : 0;
    const active = node.options[index] ?? node.options[0];

    const onChange = (e) => {
      const i = Number(e.target.value);
      this.#setByPath(this.#data, path + "/__choice", i);
      this.#deleteByPathPrefix(this.#data, path + "/");
      this.requestUpdate();
      this.#emit("pw:value-change", {
        path,
        name: path,
        value: i,
        validity: { valid: true },
      });
    };

    return html`
      <fieldset data-path=${path}>
        <legend>${node.title ?? "Choose one"}</legend>
        <label>
          <span data-label>Variant</span>
          <select @change=${onChange} .value=${String(index)}>
            ${node.options.map(
              (opt, i) => html`<option value=${String(i)}>${opt.title}</option>`
            )}
          </select>
        </label>
        <div>${this.#renderNode(this.#compileNode(active.schema, path))}</div>
      </fieldset>
    `;
  }

  #renderArray(node) {
    const path = node.path;
    const arr = this.#ensureArrayAtPath(path);
    const ui = node.ui || this.#uiFor(path);
    const itemSchema = node.item?.schema;

    const primitiveArrayTypes = new Set(["string", "number", "integer", "boolean"]);
    const primitiveItemType = itemSchema?.type;
    const isPrimitiveArray =
      primitiveArrayTypes.has(primitiveItemType) &&
      !itemSchema?.format;

    const parsePrimitiveValue = (rawValue) => {
      if (primitiveItemType === "number") {
        const parsed = Number.parseFloat(rawValue);
        return Number.isFinite(parsed) ? parsed : rawValue;
      }
      if (primitiveItemType === "integer") {
        const parsed = Number.parseInt(rawValue, 10);
        return Number.isFinite(parsed) ? parsed : rawValue;
      }
      if (primitiveItemType === "boolean") {
        return rawValue === "true";
      }
      return rawValue;
    };

    // Check layout preference: use 'open' for simple string arrays by default, or if explicitly set
    let arrayLayout = ui?.["ui:arrayLayout"];
    if (!arrayLayout) {
      // If not explicitly set, use global option with smart default based on array type
      arrayLayout = isPrimitiveArray ? "open" : this.#getOption("layouts.arrays", "default");
    }

    const useOpenGroup = arrayLayout === "open" && isPrimitiveArray;

    // Check if this is a single-selection array (maxItems: 1) for radio group
    const isSingleSelection = node.schema?.maxItems === 1;
    const inputType = isSingleSelection ? "radio" : "checkbox";

    if (useOpenGroup) {
      // Render fieldset with data-open to let the enhancement handle UI
      // We sync state after the enhancement runs via MutationObserver

      const syncFromDOM = (fieldset) => {
        // Read current state from DOM (after enhancement has modified it)
        const inputs = Array.from(
          fieldset.querySelectorAll(
            'input[type="radio"], input[type="checkbox"]'
          )
        );
        const values = inputs
          .map((input) => input.value)
          .filter((v) => v && v.trim());

        if (isSingleSelection) {
          // For radio groups, find the checked one
          const checkedInput = inputs.find((input) => input.checked);
          this.#setByPath(
            this.#data,
            path,
            checkedInput && checkedInput.value
              ? [parsePrimitiveValue(checkedInput.value)]
              : []
          );
        } else {
          // For checkbox groups, all items in DOM are in the array
          this.#setByPath(this.#data, path, values.map((entry) => parsePrimitiveValue(entry)));
        }
        this.#emit("pw:array-change", {
          path,
          values: this.#getByPath(this.#data, path),
        });
      };

      const handleChange = (e) => {
        const fieldset = e.currentTarget;
        if (isSingleSelection) {
          // For radio groups, update to selected value immediately
          const checkedInput = fieldset.querySelector(
            'input[type="radio"]:checked'
          );
          this.#setByPath(
            this.#data,
            path,
            checkedInput && checkedInput.value
              ? [parsePrimitiveValue(checkedInput.value)]
              : []
          );
          this.#emit("pw:array-change", {
            path,
            values: this.#getByPath(this.#data, path),
          });
        }
      };

      const afterRender = (fieldset) => {
        // Observe DOM changes made by the data-open enhancement
        const observer = new MutationObserver(() => {
          syncFromDOM(fieldset);
        });
        observer.observe(fieldset, {
          childList: true,
          subtree: true,
        });

        // Store observer for cleanup
        if (!fieldset._arrayObserver) {
          fieldset._arrayObserver = observer;
        }
      };

      const selectedValue = isSingleSelection && arr.length > 0 ? arr[0] : null;

      return html`
        <fieldset
          role="group"
          data-open
          data-path=${path}
          data-name=${path}
          @change=${handleChange}
          ${ref((el) => {
            if (el) afterRender(el);
          })}
        >
          <legend>${node.title ?? "List"}</legend>
          ${arr.map((value, i) => {
            const id = `${path}-${i}`;
            const isChecked = isSingleSelection
              ? String(value) === String(selectedValue)
              : false;
            return html`
              <label for=${id}>
                <span data-label>${String(value)}</span>
                <input
                  id=${id}
                  type=${inputType}
                  name=${path}
                  value=${String(value)}
                  ?checked=${isChecked}
                />
              </label>
            `;
          })}
        </fieldset>
      `;
    }

    // Standard array with add/remove controls for complex items
    const add = () => {
      arr.push(this.#defaultFor(node.item.schema));
      this.requestUpdate();
      this.#emit("pw:array-add", { path });
    };
    const remove = (idx) => {
      arr.splice(idx, 1);
      this.requestUpdate();
      this.#emit("pw:array-remove", { path, index: idx });
    };
    const move = (from, to) => {
      if (to < 0 || to >= arr.length) return;
      const [v] = arr.splice(from, 1);
      arr.splice(to, 0, v);
      this.requestUpdate();
      this.#emit("pw:array-reorder", { path, from, to });
    };

    return html`
      <fieldset data-path=${path}>
        <legend>${node.title ?? "List"}</legend>
        <div class="array-list">
          ${arr.map(
            (_, i) => html`
              <div class="array-item" data-index=${i}>
                ${this.#renderNode(this.#repath(node.item, path + "/" + i))}
                <div class="array-controls">
                  <button
                    type="button"
                    @click=${() => move(i, i - 1)}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    @click=${() => move(i, i + 1)}
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    @click=${() => remove(i)}
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            `
          )}
        </div>
        <div class="array-controls">
          <button type="button" @click=${add}>Add</button>
        </div>
      </fieldset>
    `;
  }

  #repath(subNode, newPath) {
    const updated = { ...subNode, path: newPath };
    // Clear cached UI so it gets looked up with the new path
    delete updated.ui;
    // Recursively update children paths if this is a fieldset
    if (updated.kind === "fieldset" && updated.children) {
      const oldPath = subNode.path;
      updated.children = updated.children.map((child) => {
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
    let value = this.#getByPath(this.#data, path);
    const ui = node.ui || this.#uiFor(path);

    // Evaluate calculated value if present
    if (ui?.["ui:calculate"]) {
      const calculatedValue = this.#evaluateCalculation(ui["ui:calculate"]);
      // Apply calculated value if field is empty or override not allowed
      if (value === undefined || value === null || !ui["ui:calculateOverride"]) {
        value = calculatedValue;
        // Also update internal data to keep in sync
        if (this.#getByPath(this.#data, path) !== calculatedValue) {
          this.#setByPath(this.#data, path, calculatedValue);
        }
      }
    }

    // Evaluate conditional states
    const isDisabled = ui?.["ui:disabled"] ||
      (ui?.["ui:disabledWhen"] && this.#evaluateCondition(ui["ui:disabledWhen"]));
    const isRequired = this.#isRequired(path) ||
      (ui?.["ui:requiredWhen"] && this.#evaluateCondition(ui["ui:requiredWhen"]));
    const isReadonly = ui?.["ui:readonly"] ||
      (ui?.["ui:calculate"] && !ui["ui:calculateOverride"]);

    // Override hook before default field render
    {
      const override = this.#emitCancelable("pw:before-render-field", {
        path,
        schema: node.schema,
        ui,
        mount: null,
        render: null,
      });
      if (override?.render) return override.render();
    }

    // Build attributes including conditional states
    const attrs = {
      ...this.#nativeConstraints(path, node.schema),
      disabled: isDisabled,
      required: isRequired,
      readOnly: isReadonly,
    };

    // Build base render context (shared by ui:render, renderers, and ui:wrapper)
    const baseContext = {
      id,
      path,
      label,
      value,
      required: isRequired,
      ui,
      schema: node.schema,
      get: (p) => this.#getByPath(this.#data, p ?? path),
      set: (val, p) => this.#assignValue(p ?? path, val),
      unset: (p) => this.#unsetValue(p ?? path),
      attrs,
      host: this,
    };

    // Check for ui:render - completely custom inline renderer (same context as defineRenderer)
    if (ui?.["ui:render"] && typeof ui["ui:render"] === "function") {
      const customTpl = ui["ui:render"](baseContext);
      const before = this.#renderCustomContent(ui?.["ui:before"], baseContext);
      const after = this.#renderCustomContent(ui?.["ui:after"], baseContext);
      queueMicrotask(() =>
        this.#emit("pw:after-render-field", { path, schema: node.schema })
      );
      return html`${before}${customTpl}${after}`;
    }

    // Default renderer lookup: returns ONLY the control markup
    const renderer =
      this.#renderers.get(node.widgetKey) || this.#renderers.get("*");
    let controlTpl = renderer
      ? renderer(baseContext)
      : nothing;

    // Post-creation tweak
    controlTpl =
      this.#emitReadonly("pw:render-field", {
        path,
        schema: node.schema,
        node: controlTpl,
      }) ?? controlTpl;

    // Wrap with icon if ui:icon is specified and enhancements.icons is enabled
    const iconName = ui?.["ui:icon"];
    const iconPos = ui?.["ui:iconPosition"] || "start";
    if (iconName && this.#getOption("enhancements.icons", true)) {
      const iconClasses =
        iconPos === "end" ? "input-icon input-icon-end" : "input-icon";
      controlTpl = html`
        <div class=${iconClasses}>
          ${iconPos === "start"
            ? html`<pds-icon icon=${iconName}></pds-icon>`
            : nothing}
          ${controlTpl}
          ${iconPos === "end"
            ? html`<pds-icon icon=${iconName}></pds-icon>`
            : nothing}
        </div>
      `;
    }

    const help = ui?.["ui:help"];

    // Group widgets use fieldset
    if (this.#isGroupWidget(node.widgetKey)) {
      queueMicrotask(() =>
        this.#emit("pw:after-render-field", { path, schema: node.schema })
      );
      const role =
        node.widgetKey === "radio"
          ? "radiogroup"
          : node.widgetKey === "checkbox-group"
          ? "group"
          : undefined;
      const fieldsetClass = ui?.["ui:class"] ?? "stack-sm";
      return html`
        <fieldset
          data-path=${path}
          role=${ifDefined(role)}
          class=${ifDefined(fieldsetClass)}
        >
          <legend>${label}</legend>
          ${controlTpl} ${help ? html`<div data-help>${help}</div>` : nothing}
        </fieldset>
      `;
    }

    // Standard label wrapper
    queueMicrotask(() =>
      this.#emit("pw:after-render-field", { path, schema: node.schema })
    );

    // Add data-toggle for toggle switches (both toggle and toggle-with-icons)
    const isToggle = node.widgetKey === "toggle" || node.widgetKey === "toggle-with-icons";
    const useIconToggle = node.widgetKey === "toggle-with-icons";

    // Add range-output class for range inputs if enabled
    const isRange = node.widgetKey === "input-range";
    const useRangeOutput =
      isRange && this.#getOption("enhancements.rangeOutput", true);

    // Add data-color for color inputs if enabled
    const isColorInput = node.widgetKey === "input-color";
    const useColorInput =
      isColorInput && this.#getOption("enhancements.colorInput", true);
    
    // Build class list for label
    const labelClasses = [];
    if (useRangeOutput) labelClasses.push("range-output");
    if (useIconToggle) labelClasses.push("with-icons");
    const labelClass = labelClasses.length > 0 ? labelClasses.join(" ") : undefined;

    const renderControlAndLabel = (isToggle) => {
      if (isToggle) return html`${controlTpl} <span data-label>${label}</span>`;

      return html`<span data-label>${label}</span> ${controlTpl}`;
    };

    // Build render context for custom content
    const renderContext = {
      id,
      path,
      label,
      value,
      required: isRequired,
      ui,
      schema: node.schema,
      get: (p) => this.#getByPath(this.#data, p ?? path),
      set: (val, p) => this.#assignValue(p ?? path, val),
      attrs,
      host: this,
      // Additional context for ui:wrapper
      control: controlTpl,
      help: help ? html`<div data-help>${help}</div>` : nothing,
    };

    // Check for ui:wrapper - custom wrapper replaces the entire label structure
    if (ui?.["ui:wrapper"] && typeof ui["ui:wrapper"] === "function") {
      const wrapped = ui["ui:wrapper"](renderContext);
      const before = this.#renderCustomContent(ui?.["ui:before"], renderContext);
      const after = this.#renderCustomContent(ui?.["ui:after"], renderContext);
      return html`${before}${wrapped}${after}`;
    }

    // Standard label wrapper with ui:before/ui:after
    const before = this.#renderCustomContent(ui?.["ui:before"], renderContext);
    const after = this.#renderCustomContent(ui?.["ui:after"], renderContext);

    const labelTpl = html`
      <label for=${id} ?data-toggle=${isToggle} ?data-color=${useColorInput} class=${ifDefined(labelClass)}>
        ${renderControlAndLabel(isToggle)}
        ${help ? html`<div data-help>${help}</div>` : nothing}
      </label>
    `;

    if (before || after) {
      return html`${before}${labelTpl}${after}`;
    }
    return labelTpl;
  }

  // ===== Default renderers: controls only (no spread arrays) =====
  #installDefaultRenderers() {
    // Fallback text input
    this.#renderers.set(
      "*",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="text"
          .value=${value ?? ""}
          minlength=${ifDefined(attrs.minLength)}
          maxlength=${ifDefined(attrs.maxLength)}
          pattern=${ifDefined(attrs.pattern)}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          autocomplete=${ifDefined(attrs.autocomplete)}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "input-text",
      ({ id, path, value, attrs, set, ui }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="text"
          .value=${value ?? ""}
          minlength=${ifDefined(attrs.minLength)}
          maxlength=${ifDefined(attrs.maxLength)}
          pattern=${ifDefined(attrs.pattern)}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          autocomplete=${ifDefined(attrs.autocomplete)}
          list=${ifDefined(ui?.["ui:datalist"] ? `${id}-datalist` : attrs.list)}
          @input=${(e) => set(e.target.value)}
        />
        ${ui?.["ui:datalist"]
          ? html`
              <datalist id="${id}-datalist">
                ${ui["ui:datalist"].map(
                  (opt) => html`<option value="${opt}"></option>`
                )}
              </datalist>
            `
          : nothing}
      `
    );

    this.defineRenderer(
      "textarea",
      ({ id, path, value, attrs, set, ui }) => html`
        <textarea
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          .value=${value ?? ""}
          rows=${ui?.["ui:rows"] ?? 4}
          minlength=${ifDefined(attrs.minLength)}
          maxlength=${ifDefined(attrs.maxLength)}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        ></textarea>
      `
    );

    this.defineRenderer(
      "input-number",
      ({ id, path, value, attrs, set, schema }) => {
        const step = attrs.step || getStep(value);
        return html`
          <input
            id=${id}
            name=${path}
            type="number"
            placeholder=${ifDefined(attrs.placeholder)}
            .value=${value ?? ""}
            min=${ifDefined(attrs.min)}
            max=${ifDefined(attrs.max)}
            step=${ifDefined(step)}
            ?readonly=${!!attrs.readOnly}
            ?disabled=${!!attrs.disabled}
            ?required=${!!attrs.required}
            @input=${(e) => {
              const v = e.target.value;
              const numValue =
                schema.type === "integer" ? parseInt(v, 10) : parseFloat(v);
              const step =
                attrs.step ||
                (numValue % 1 !== 0
                  ? `0.${"1".padStart(
                      numValue.toString().split(".")[1]?.length || 0,
                      "0"
                    )}`
                  : "1");
              e.target.step = step; // Dynamically set step based on value precision
              if (
                (attrs.min != null && numValue < attrs.min) ||
                (attrs.max != null && numValue > attrs.max) ||
                (attrs.step != null && numValue % parseFloat(attrs.step) !== 0)
              ) {
                e.target.setCustomValidity("Invalid value");
              } else {
                e.target.setCustomValidity("");
                set(numValue);
              }
            }}
          />
        `;
      }
    );

    // Range input renderer for ui:widget = 'input-range'
    this.defineRenderer(
      "input-range",
      ({ id, path, value, attrs, set, unset, ui, schema }) => {
        const min = ui?.["ui:min"] ?? attrs.min ?? 0;
        const max = ui?.["ui:max"] ?? attrs.max ?? 100;
        const step =
          ui?.["ui:step"] ??
          ui?.["ui:options"]?.step ??
          attrs.step ??
          (Number(min) >= 0 && Number(max) <= 1 ? 0.01 : 1);
        const fallbackExample =
          Array.isArray(schema?.examples) && schema.examples.length > 0
            ? schema.examples[0]
            : undefined;
        const defaultValue = attrs.placeholder ?? fallbackExample;
        const parsedDefault = Number.parseFloat(defaultValue);
        const hasNumericDefault = Number.isFinite(parsedDefault);
        const visualValue =
          value !== undefined && value !== null
            ? Number(value)
            : hasNumericDefault
              ? Math.min(Number(max), Math.max(Number(min), parsedDefault))
              : Number(min);
        const canUnset = Boolean(ui?.["ui:allowUnset"]) && defaultValue !== undefined;
        return html`
          <div class="range-container">
            <input
              id=${id}
              name=${path}
              type="range"
              min=${min}
              max=${max}
              step=${step}
              .value=${visualValue}
              ?disabled=${!!attrs.disabled}
              @input=${(e) => set(Number(e.target.value))}
            />
            <div class="range-bubble" aria-hidden="true">${visualValue}</div>
          </div>
          ${canUnset
            ? html`
                <div class="flex items-center justify-between gap-sm">
                  <small class="text-muted">Default: ${defaultValue}</small>
                  <a
                    href="#"
                    class="text-muted"
                    @click=${(event) => {
                      event.preventDefault();
                      unset(path);
                    }}
                  >
                    Use default
                  </a>
                </div>
              `
            : nothing}
        `;
      }
    );

    this.defineRenderer(
      "input-email",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="email"
          .value=${value ?? ""}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          autocomplete=${ifDefined(attrs.autocomplete)}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "input-password",
      ({ id, path, value, attrs, set, ui }) => {
        // Determine autocomplete value based on UI hints or use "current-password" as default
        const autocomplete =
          ui?.["ui:autocomplete"] || attrs.autocomplete || "current-password";

        return html`
          <input
            id=${id}
            name=${path}
            placeholder=${ifDefined(attrs.placeholder)}
            type="password"
            .value=${value ?? ""}
            minlength=${ifDefined(attrs.minLength)}
            maxlength=${ifDefined(attrs.maxLength)}
            ?readonly=${!!attrs.readOnly}
            ?disabled=${!!attrs.disabled}
            ?required=${!!attrs.required}
            autocomplete=${autocomplete}
            @input=${(e) => set(e.target.value)}
          />
        `;
      }
    );

    this.defineRenderer(
      "input-url",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="url"
          .value=${value ?? ""}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "input-date",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="date"
          .value=${value ?? ""}
          min=${ifDefined(attrs.min)}
          max=${ifDefined(attrs.max)}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "input-time",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="time"
          .value=${value ?? ""}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "input-color",
      ({ id, path, value, attrs, set, schema }) => {
        const fallbackExample =
          Array.isArray(schema?.examples) && schema.examples.length > 0
            ? schema.examples[0]
            : undefined;
        const hasUserValue =
          value !== undefined && value !== null && String(value).trim() !== "";
        const hasFallbackExample =
          fallbackExample !== undefined &&
          fallbackExample !== null &&
          String(fallbackExample).trim() !== "";
        const isUnset = !hasUserValue && !hasFallbackExample;
        const controlValue = hasUserValue
          ? value
          : hasFallbackExample
            ? fallbackExample
            : "#000000";
        return html`
        <input
          id=${id}
          name=${path}
          data-color-unset=${isUnset ? "1" : "0"}
          placeholder=${ifDefined(attrs.placeholder)}
          type="color"
          .value=${controlValue}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        />
      `;
      }
    );

    this.defineRenderer(
      "input-datetime",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          type="datetime-local"
          .value=${value ?? ""}
          ?readonly=${!!attrs.readOnly}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @input=${(e) => set(e.target.value)}
        />
      `
    );

    this.defineRenderer(
      "checkbox",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          type="checkbox"
          .checked=${!!value}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @change=${(e) => set(!!e.target.checked)}
        />
      `
    );

    // Toggle switch (uses data-toggle attribute on label, rendered in #renderField)
    this.defineRenderer(
      "toggle",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          type="checkbox"
          .checked=${!!value}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @change=${(e) => set(!!e.target.checked)}
        />
      `
    );

    // Toggle switch with icons (same as toggle, styling comes from .with-icons class on label)
    this.defineRenderer(
      "toggle-with-icons",
      ({ id, path, value, attrs, set }) => html`
        <input
          id=${id}
          name=${path}
          type="checkbox"
          .checked=${!!value}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          @change=${(e) => set(!!e.target.checked)}
        />
      `
    );

    this.defineRenderer(
      "select",
      ({ id, path, value, attrs, set, schema, ui, host }) => {
        const useDropdown =
          host.#getOption("widgets.selects", "standard") === "dropdown" ||
          ui?.["ui:dropdown"] === true;
        const { values: enumValues, labels: enumLabels } = host.#extractEnumOptions(schema);
        return html`
          <select
            id=${id}
            name=${path}
            ?disabled=${!!attrs.disabled}
            ?required=${!!attrs.required}
            ?data-dropdown=${useDropdown}
            @change=${(e) => set(e.target.value)}
          >
            <option value="" ?selected=${value == null}>—</option>
            ${enumValues.map(
              (v, i) =>
                html`<option value=${String(v)} ?selected=${String(value) === String(v)}>
                  ${String(enumLabels[i])}
                </option>`
            )}
          </select>
        `;
      }
    );

    // Radio group: returns ONLY the labeled inputs
    // Matches PDS pattern: input hidden, label styled as button
    this.defineRenderer("radio", ({ id, path, value, attrs, set, schema, host }) => {
      const { values: enumValues, labels: enumLabels } = host.#extractEnumOptions(schema);
      return html`
        ${enumValues.map((v, i) => {
          const rid = `${id}-${i}`;
          return html`
            <label for=${rid}>
              <input
                id=${rid}
                type="radio"
                name=${path}
                .value=${String(v)}
                .checked=${String(value) === String(v)}
                ?required=${!!attrs.required}
                @change=${(e) => {
                  if (e.target.checked) set(enumValues[i]);
                }}
              />
              ${String(enumLabels[i])}
            </label>
          `;
        })}
      `;
    });

    // Checkbox group: for multi-select from enum (array type with enum items)
    // Shows actual checkboxes (not button-style like radios)
    this.defineRenderer(
      "checkbox-group",
      ({ id, path, value, attrs, set, schema, host }) => {
        const selected = Array.isArray(value) ? value : [];
        // For array items, check items schema first, then fallback to root schema
        const itemSchema = schema.items || schema;
        const { values: options, labels: optionLabels } = host.#extractEnumOptions(itemSchema);

        return html`
          ${options.map((v, i) => {
            const cid = `${id}-${i}`;
            const isChecked = selected.includes(v);

            return html`
              <label for=${cid}>
                <input
                  id=${cid}
                  name="${path}[]"
                  type="checkbox"
                  .value=${String(v)}
                  .checked=${isChecked}
                  @change=${(e) => {
                    // Use e.target.checked to get the NEW state after the change
                    const newSelected = e.target.checked
                      ? [...selected, v]
                      : selected.filter((x) => x !== v);
                    set(newSelected);
                  }}
                />
                <span>${String(optionLabels[i])}</span>
              </label>
            `;
          })}
        `;
      }
    );

    this.defineRenderer(
      "const",
      ({ id, path, value, schema }) => html`
        <input
          id=${id}
          name=${path}
          type="text"
          .value=${schema.const ?? value ?? ""}
          readonly
        />
      `
    );

    // pds-upload: File upload component
    this.defineRenderer("upload", ({ id, value, attrs, set, ui, path }) => {
      const uploadOpts = ui?.["ui:options"] || {};
      return html`
        <pds-upload
          id=${id}
          accept=${ifDefined(uploadOpts.accept)}
          ?multiple=${uploadOpts.multiple ?? false}
          max-files=${ifDefined(uploadOpts.maxFiles)}
          max-size=${ifDefined(uploadOpts.maxSize)}
          label=${ifDefined(uploadOpts.label)}
          ?required=${!!attrs.required}
          @pw:change=${(e) => set(e.detail.files)}
        ></pds-upload>
      `;
    });

    // pds-omnibox: Omnibox autocomplete input
    this.defineRenderer("omnibox", ({ id, path, value, attrs, set, ui }) => {
      const omniboxOpts = ui?.["ui:options"] || {};
      const settings = omniboxOpts.settings;
      const icon = omniboxOpts.icon;
      const autocomplete = ui?.["ui:autocomplete"] ?? attrs.autocomplete;

      return html`
        <pds-omnibox
          id=${id}
          name=${path}
          placeholder=${ifDefined(attrs.placeholder)}
          .value=${value ?? ""}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          autocomplete=${ifDefined(autocomplete)}
          icon=${ifDefined(icon)}
          .settings=${settings}
          @input=${(e) => set(e.target.value ?? "")}
        ></pds-omnibox>
      `;
    });

    this.defineRenderer("treeview", ({ id, path, value, attrs, set, ui, schema }) => {
      const treeviewOpts = ui?.["ui:options"] || {};
      const isArraySchema = schema?.type === "array";
      const configuredMultiselect =
        ui?.["ui:multiselect"] ??
        treeviewOpts.multiselect ??
        (isArraySchema ? "auto" : "off");
      const normalizedMultiselect =
        configuredMultiselect === "checkboxes" || configuredMultiselect === "auto"
          ? configuredMultiselect
          : "off";
      const selectedValues = isArraySchema
        ? Array.isArray(value)
          ? value.map((item) => String(item))
          : []
        : [];
      const selectedValue = !isArraySchema && value != null ? String(value) : "";
      const settings = {
        source:
          treeviewOpts.source ??
          treeviewOpts.items ??
          treeviewOpts.data,
        items:
          treeviewOpts.items,
        data:
          treeviewOpts.data,
        getItems: treeviewOpts.getItems,
        getChildren: treeviewOpts.getChildren,
        defaultExpanded: treeviewOpts.defaultExpanded,
        expandedAll: treeviewOpts.expandedAll,
        transform: treeviewOpts.transform,
        transformChildren: treeviewOpts.transformChildren,
        fetch: treeviewOpts.fetch,
      };

      return html`
        <pds-treeview
          id=${id}
          name=${path}
          src=${ifDefined(treeviewOpts.src)}
          multiselect=${normalizedMultiselect}
          ?disabled=${!!attrs.disabled}
          ?required=${!!attrs.required}
          .options=${settings}
          .value=${selectedValue}
          .values=${selectedValues}
          @change=${(event) => {
            const treeview = event.currentTarget;
            if (isArraySchema) {
              set(Array.isArray(treeview.values) ? [...treeview.values] : []);
              return;
            }
            set(treeview.value ?? "");
          }}
        ></pds-treeview>
      `;
    });

    // pds-richtext: Rich text editor
    this.defineRenderer("richtext", ({ id, value, attrs, set, ui, path }) => {
      const richtextOpts = ui?.["ui:options"] || {};
      return html`
        <pds-richtext
          id=${id}
          name=${path}
          placeholder=${ifDefined(
            richtextOpts.placeholder || attrs.placeholder
          )}
          .value=${value ?? ""}
          ?toolbar=${richtextOpts.toolbar}
          ?required=${!!attrs.required}
          ?submit-on-enter=${richtextOpts.submitOnEnter ?? false}
          spellcheck=${richtextOpts.spellcheck ?? true ? "true" : "false"}
          @input=${(e) => set(e.target.value)}
        ></pds-richtext>
      `;
    });
  }

  // ===== Form submit =====
  async #onSubmit(e) {
    if (e) e.preventDefault?.();
    const form = this.renderRoot?.querySelector("form");
    let nativeValid = true;
    if (form) nativeValid = form.checkValidity();

    let schemaValid = { valid: true };
    if (this.#validator) {
      try {
        schemaValid = await this.#validator(this.#data, this.jsonSchema);
      } catch (err) {
        schemaValid = { valid: false, errors: [{ message: String(err) }] };
      }
    }

    const payload = this.serialize();
    const serialDetail = {
      ...payload,
      valid: nativeValid && schemaValid.valid,
      issues: schemaValid.errors || [],
    };
    const pre = this.#emitCancelable("pw:serialize", serialDetail);
    const final = pre || serialDetail;

    this.#emit("pw:submit", final);
    return final;
  }

  // ===== Form reset =====
  #onReset(e) {
    // Prevent native reset - we'll handle everything ourselves
    // Native reset clears DOM inputs but doesn't sync with Lit's reactive state
    e.preventDefault();
    
    // Reset internal data to initial values (or empty if no initial values)
    if (this.values) {
      const v = this.values;
      const newData = {};
      for (const [key, value] of Object.entries(v)) {
        if (key.startsWith("/")) {
          this.#setByPath(newData, key, value);
        } else {
          newData[key] = value;
        }
      }
      this.#data = newData;
    } else {
      this.#data = {};
    }
    
    // Recompile form - this rebuilds the tree, re-applies defaults, 
    // and rebuilds dependency graph
    this.#compile();
    
    // Re-apply calculated values after compile
    this.#applyCalculatedValues();
    
    // Emit reset event
    this.#emit("pw:reset", { data: structuredClone(this.#data) });
    
    // Increment reset key to force Lit to recreate all DOM elements
    // This ensures .value bindings properly reflect reset values
    this.#resetKey++;
    this.requestUpdate();
  }

  // ===== Utilities =====
  #uiFor(path) {
    if (!this.uiSchema) return undefined;

    // Root path: return root-level ui: properties directly
    if (!path || path === "" || path === "/") {
      // Check if uiSchema has ui: prefixed keys at root level (not nested under a path)
      const hasRootUiKeys = Object.keys(this.uiSchema).some(k => k.startsWith("ui:"));
      if (hasRootUiKeys) {
        return this.uiSchema;
      }
      // Fall through to check for "/" key
    }

    // Try exact match first (flat structure)
    if (this.uiSchema[path]) return this.uiSchema[path];

    // Try with leading slash
    const withSlash = this.#asRel(path);
    if (this.uiSchema[withSlash]) return this.uiSchema[withSlash];

    // Try without leading slash for convenience
    const withoutSlash = path.startsWith("/") ? path.substring(1) : path;
    if (this.uiSchema[withoutSlash]) return this.uiSchema[withoutSlash];

    // Try nested navigation (e.g., /accountType/companyName)
    // Skip array indices (numeric parts and wildcard *) when navigating UI schema
    const parts = path.replace(/^\//, "").split("/");
    let current = this.uiSchema;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      // Skip numeric array indices and wildcard in UI schema navigation
      if (/^\d+$/.test(part) || part === "*") continue;

      // Try both with and without leading slash for each segment
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else if (current && typeof current === "object" && ("/" + part) in current) {
        current = current["/" + part];
      } else {
        // If this is the first segment, try looking up the full path from root
        if (i === 0) {
          const fullPath = "/" + parts.join("/");
          if (this.uiSchema[fullPath]) {
            return this.uiSchema[fullPath];
          }
        }
        return undefined;
      }
    }
    // Only return if we found a UI config object (not a nested parent)
    return current && typeof current === "object" ? current : undefined;
  }
  #asRel(path) {
    return path.startsWith("/") ? path : "/" + path;
  }

  #idFromPath(path) {
    const norm = path.replace(/[^a-zA-Z0-9_\-]+/g, "-");
    return `${this.#idBase}${norm ? "-" + norm : ""}`;
  }

  #titleFromPath(path) {
    const seg = path.split("/").filter(Boolean).pop() || "";
    return seg
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\*/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  #nativeConstraints(path, schema) {
    // Use placeholder if explicitly set, otherwise use first example as placeholder
    const attrs = {
      placeholder:
        schema.placeholder ||
        (schema.examples && schema.examples.length > 0
          ? schema.examples[0]
          : undefined),
    };

    if (schema.type === "string") {
      if (schema.minLength != null) attrs.minLength = schema.minLength;
      if (schema.maxLength != null) attrs.maxLength = schema.maxLength;
      if (schema.pattern) attrs.pattern = schema.pattern;
    }
    if (schema.type === "number" || schema.type === "integer") {
      if (schema.minimum != null) attrs.min = schema.minimum;
      if (schema.maximum != null) attrs.max = schema.maximum;
      if (schema.multipleOf != null) attrs.step = schema.multipleOf;
    }
    if (schema.readOnly) attrs.readOnly = true;
    if (schema.writeOnly) attrs.readOnly = true;
    if (schema.format === "email") attrs.autocomplete = "email";
    if (this.#isRequired(path, schema)) attrs.required = true;
    return attrs;
  }

  #isRequired(path, schemaNode = null) {
    if (
      schemaNode &&
      Object.prototype.hasOwnProperty.call(schemaNode, "required")
    )
      return !!schemaNode.required;
    try {
      const parts = path.split("/").filter(Boolean);
      const prop = parts.pop();
      const parentPath = "/" + parts.join("/");
      const parent = this.#schemaAt(parentPath);
      return !!(
        parent?.required &&
        Array.isArray(parent.required) &&
        parent.required.includes(this.#unescapeJsonPointer(prop))
      );
    } catch {
      return false;
    }
  }

  #schemaAt(path) {
    return this.#schemaAtPath(this.jsonSchema, path);
  }

  #schemaAtPath(schemaRoot, path) {
    let cur = schemaRoot;
    for (const seg of path.split("/").filter(Boolean)) {
      const key = this.#unescapeJsonPointer(seg);
      if (cur?.type === "object" && cur.properties && key in cur.properties) {
        cur = cur.properties[key];
      } else if (cur?.type === "array") {
        cur = cur.items;
      } else {
        return null;
      }
    }
    return cur;
  }

  #defaultFor(schema) {
    if (schema && schema.default !== undefined)
      return structuredClone(schema.default);
    switch (schema?.type) {
      case "string":
        return "";
      case "number":
      case "integer":
        return 0;
      case "boolean":
        return false;
      case "object":
        return {};
      case "array":
        return [];
      default:
        return null;
    }
  }

  #ensureArrayAtPath(path) {
    let arr = this.#getByPath(this.#data, path);
    if (!Array.isArray(arr)) {
      arr = [];
      this.#setByPath(this.#data, path, arr);
    }
    return arr;
  }

  #assignValue(path, val) {
    this.#setByPath(this.#data, path, val);

    // Apply calculated values for any dependent fields
    // This will call requestUpdate() if there are dependents
    const hadDependents = this.#applyCalculatedValues(path);

    // Only request update here if there were no dependents
    // (to avoid double render)
    if (!hadDependents) {
      this.requestUpdate();
    }

    const validity = { valid: true };
    this.#emit("pw:value-change", { path, name: path, value: val, validity });
  }

  #unsetValue(path) {
    this.#deleteByPathPrefix(this.#data, path);

    const hadDependents = this.#applyCalculatedValues(path);
    if (!hadDependents) {
      this.requestUpdate();
    }

    const validity = { valid: true };
    this.#emit("pw:value-change", {
      path,
      name: path,
      value: undefined,
      validity,
      unset: true,
    });
  }

  #applyCalculatedValues(changedPath) {
    // Find fields that depend on the changed path
    const dependents = this.#dependencies.get(changedPath);
    if (!dependents || dependents.size === 0) return false;

    for (const targetPath of dependents) {
      const ui = this.#uiFor(targetPath);
      if (ui?.["ui:calculate"]) {
        // Check if override is allowed and user has modified the field
        const allowOverride = ui["ui:calculateOverride"] === true;
        const currentValue = this.#getByPath(this.#data, targetPath);
        const calculatedValue = this.#evaluateCalculation(ui["ui:calculate"]);

        // Only update if:
        // 1. Override is not allowed, OR
        // 2. Override is allowed but field hasn't been manually modified (still matches previous calc)
        if (!allowOverride || currentValue === undefined || currentValue === null) {
          this.#setByPath(this.#data, targetPath, calculatedValue);
        }
      }
    }
    
    // Force re-render since there were dependents
    // This ensures ui:visibleWhen, ui:requiredWhen, ui:disabledWhen get re-evaluated
    this.requestUpdate();
    return true; // Indicate that we triggered a re-render
  }

  #getByPath(obj, path) {
    if (!path || path === "") return obj;
    const parts = path.split("/").filter(Boolean);
    let cur = obj;
    for (const seg of parts) {
      const k = seg === "*" ? seg : this.#unescapeJsonPointer(seg);
      if (k === "*") return cur;
      if (cur == null) return undefined;
      cur = cur[k];
    }
    return cur;
  }

  #setByPath(obj, path, val) {
    if (!path || path === "") throw new Error("Cannot set root directly");
    const parts = path.split("/").filter(Boolean);
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const seg = this.#unescapeJsonPointer(parts[i]);
      if (!(seg in cur) || typeof cur[seg] !== "object" || cur[seg] === null)
        cur[seg] = {};
      cur = cur[seg];
    }
    const last = this.#unescapeJsonPointer(parts[parts.length - 1]);
    cur[last] = val;
  }

  #deleteByPathPrefix(obj, prefix) {
    const parts = prefix.split("/").filter(Boolean);
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

  #escapeJsonPointer(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  #unescapeJsonPointer(s) {
    return s.replace(/~1/g, "/").replace(/~0/g, "~");
  }

  #isGroupWidget(key) {
    return key === "radio" || key === "checkbox-group" || key === "treeview";
  }

  /**
   * Render custom content from ui:before, ui:after values.
   * Supports:
   * - Function: (context) => html`...` - called with render context
   * - String starting with "slot:": looks up slotted element by name
   * - null/undefined: returns nothing
   * @param {Function|string|undefined} content - The content definition
   * @param {object} context - Render context with path, schema, value, etc.
   * @returns {TemplateResult|Element|typeof nothing}
   */
  #renderCustomContent(content, context) {
    if (!content) return nothing;
    
    // Function: call with context
    if (typeof content === "function") {
      return content(context);
    }
    
    // String: slot reference (e.g., "slot:myHeader")
    if (typeof content === "string" && content.startsWith("slot:")) {
      const slotName = content.slice(5); // Remove "slot:" prefix
      const slotEl = this.#slottedContent.get(slotName);
      return slotEl ? slotEl : nothing;
    }
    
    return nothing;
  }

  // ===== Event helpers =====
  #emit(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
    return detail;
  }
  #emitReadonly(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
    return detail?.node;
  }
  #emitCancelable(name, detail) {
    const ev = new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(ev);
    return ev.defaultPrevented ? detail : null;
  }
}

customElements.define("pds-form", SchemaForm);
