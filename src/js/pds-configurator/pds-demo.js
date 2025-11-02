import { LitElement, html, nothing, render, unsafeHTML } from "../lit";
import showdown from "showdown";
import { PDS } from "../pds";

import { AutoComplete } from "pure-web/ac";

const toast = (message, options)=> {
  const toaster = document.getElementById("global-toaster");
  toaster.toast(...arguments);
}

customElements.define(
  "pds-demo",
  class extends LitElement {
    #shiki = null;
    #shikiLoading = false;

    static properties = {
      config: { type: Object },
      designer: { type: Object },
      sections: { type: Array, state: true },
      inspectorActive: { type: Boolean, state: true },
    };

    constructor() {
      super();
      this.config = null;
      this.designer = null;
      this.sections = [];
      this.inspectorActive = false;
      this._docsBase = '/pds';
      this._showdown = new showdown.Converter({
        ghCompatibleHeaderId: true,
        tables: true,
        strikethrough: true,
        tasklists: true,
      });
    }

    

    // Disable shadow DOM to use global styles
    createRenderRoot() {
      return this;
    }

    connectedCallback() {
      super.connectedCallback();

      // Listen for design updates from unified PDS bus
      PDS.addEventListener("pds:design:updated", (e) => {
        this.config = e.detail.config;
        this.designer = e.detail.designer;
        // Update docs base if staticBase changes
        if (this.config && this.config.staticBase) {
          this._docsBase = ('/' + String(this.config.staticBase).replace(/^\/+|\/+$/g, ''));
        }
      });

      // Listen for field changes to scroll to relevant section
      PDS.addEventListener("pds:design:field:changed", (e) => {
        setTimeout(() => {
          this.scrollToRelevantSection(e.detail.field);
        }, 1000);
      });

      // Listen for inspector mode changes
      PDS.addEventListener("pds:inspector:mode:changed", (e) => {
        this.inspectorActive = e.detail.active;
      });

      // Extract sections after initial render
      setTimeout(() => {
        this.extractSections();
        this.handleInitialHash();
      }, 100);

      // Capture-phase handler to prevent interactive actions when inspector is active
      this._inspectorCaptureHandler = (e) => {
        if (!this.inspectorActive) return;
        const target = e.target;

        // Prevent link navigation
        const anchor = target.closest && target.closest("a[href]");
        if (anchor) {
          e.preventDefault();
          return;
        }

        // Prevent button activation
        const button = target.closest && target.closest("button");
        if (button) {
          e.preventDefault();
          return;
        }
      };

      this.addEventListener("click", this._inspectorCaptureHandler, true);
      // Determine docs base from global override or config
      try {
        const globalBase = window.PDS_DOCS_BASE;
        if (typeof globalBase === 'string' && globalBase.trim()) {
          this._docsBase = globalBase.replace(/\/+$/, '');
        }
      } catch {}
      // Defer to config.staticBase if provided
      if (this.config && this.config.staticBase) {
        this._docsBase = ('/' + String(this.config.staticBase).replace(/^\/+|\/+$/g, ''));
      }

      // Listen for external requests to view docs via PDS bus
      PDS.addEventListener('pds:docs:view', async (e) => {
        const file = (e.detail && e.detail.file) || 'README.md';
        await this._renderDocToDialog(file);
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this._inspectorCaptureHandler) {
        this.removeEventListener("click", this._inspectorCaptureHandler, true);
        this._inspectorCaptureHandler = null;
      }
    }

    /** Fetch a markdown file from the docs base and return HTML */
    async fetchDocHTML(file = 'README.md') {
      const base = this._docsBase || '/pds';
      const url = `${base.replace(/\/+$/, '')}/${file}`;
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const md = await res.text();
        return this._showdown.makeHtml(md);
      } catch (err) {
        return `<p>Failed to load ${file} from ${base}: ${String(err.message || err)}</p>`;
      }
    }

    /** Render markdown into a simple dialog overlay */
    async _renderDocToDialog(file) {
      const htmlContent = await this.fetchDocHTML(file);
      let dlg = document.getElementById('pds-docs-dialog');
      if (!dlg) {
        dlg = document.createElement('dialog');
        dlg.id = 'pds-docs-dialog';
        dlg.style.width = 'min(900px, 90vw)';
        dlg.style.maxHeight = '85vh';
        dlg.style.padding = '0';
        dlg.innerHTML = `<div style="padding:16px 20px; overflow:auto; max-height:85vh">
          <div class="markdown-body"></div>
        </div>`;
        document.body.appendChild(dlg);
      }
      const body = dlg.querySelector('.markdown-body');
      if (body) body.innerHTML = htmlContent;
      if (!dlg.open) dlg.showModal();
    }

    deactivateInspector() {
      // Dispatch request on PDS bus to toggle inspector mode off
      PDS.dispatchEvent(
        new CustomEvent("pds:inspector:deactivate", {
          detail: {}
        })
      );
    }

    extractSections() {
      const sectionElements = this.querySelectorAll("[data-section]");
      this.sections = Array.from(sectionElements).map((el) => {
        const id = el.getAttribute("data-section");
        const heading = el.querySelector("h2");
        const title = heading?.textContent?.trim() || id;
        return { id, title };
      });
    }

    handleInitialHash() {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const section = this.querySelector(`[data-section="${hash}"]`);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    }

    /**
     * Smart element detection for code inspector
     * Returns the appropriate element and metadata to display
     */
    detectComponentElement(clickedElement) {
      let element = clickedElement;
      let componentType = "element";
      let displayName = element.tagName.toLowerCase();

      // Skip if clicked on TOC
      if (element.closest(".showcase-toc")) {
        return null;
      }

      // Never select pds-demo itself
      if (element.tagName === "DS-SHOWCASE") {
        return null;
      }

      // Never select showcase-section - find component within it
      if (
        element.classList.contains("showcase-section") ||
        element.closest(".showcase-section") === element
      ) {
        return null;
      }

      // Check for progressive enhancements (nav[data-dropdown], label[data-toggle], etc.)
      const enhancedElement = this.findEnhancedElement(element);
      if (enhancedElement) {
        return {
          element: enhancedElement,
          componentType: "enhanced-component",
          displayName: this.getEnhancedElementName(enhancedElement),
        };
      }

      // Prioritize semantic HTML primitives (figure, table, details, etc.)
      const semanticElements = [
        "FIGURE",
        "TABLE",
        "DETAILS",
        "VIDEO",
        "AUDIO",
        "PICTURE",
        "BLOCKQUOTE",
        "PRE",
        "CODE",
      ];
      if (semanticElements.includes(element.tagName)) {
        return {
          element: element,
          componentType: "html-primitive",
          displayName: element.tagName.toLowerCase(),
        };
      }

      // Check if inside a semantic HTML element
      for (const tag of semanticElements) {
        const semanticParent = element.closest(tag.toLowerCase());
        if (semanticParent) {
          return {
            element: semanticParent,
            componentType: "html-primitive",
            displayName: tag.toLowerCase(),
          };
        }
      }

      // Check for PDS-styled primitives (elements styled by PDS classes)
      const pdsStyledElement = this.findPDSStyledElement(element);
      if (pdsStyledElement) {
        return pdsStyledElement;
      }

      // Fieldset with role="group" or role="radiogroup" is a component
      if (element.tagName === "FIELDSET") {
        const role = element.getAttribute("role");
        if (role === "group" || role === "radiogroup") {
          componentType = "form-group";
          displayName = role === "radiogroup" ? "radio group" : "form group";
          return { element, componentType, displayName };
        }
      }

      // Check if clicked element is inside a fieldset with role
      const fieldsetParent = element.closest(
        'fieldset[role="group"], fieldset[role="radiogroup"]'
      );
      if (fieldsetParent) {
        const role = fieldsetParent.getAttribute("role");
        return {
          element: fieldsetParent,
          componentType: "form-group",
          displayName: role === "radiogroup" ? "radio group" : "form group",
        };
      }

      // Label with ANY input is always a component
      if (element.tagName === "LABEL" || element.closest("label")) {
        const label =
          element.tagName === "LABEL" ? element : element.closest("label");
        const input = label.querySelector("input, select, textarea");
        if (input) {
          componentType = "form-control";
          displayName = `${input.tagName.toLowerCase()} field`;
          return { element: label, componentType, displayName };
        }
      }

      // Form elements - get the label container (if exists)
      if (["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)) {
        const label = element.closest("label");
        if (label) {
          element = label;
          componentType = "form-control";
          displayName = `${clickedElement.tagName.toLowerCase()} field`;
          return { element, componentType, displayName };
        }
        // If no label, return the form element itself
        componentType = "form-control";
        displayName = `${element.tagName.toLowerCase()}`;
        return { element, componentType, displayName };
      }

      // Custom web components (pds-* or other custom elements with hyphen)
      if (element.tagName.includes("-")) {
        componentType = "web-component";
        displayName = element.tagName.toLowerCase();
        return { element, componentType, displayName };
      }

      // Check if inside a custom web component
      const customParent = element.closest("[tagName*='-']");
      if (customParent && customParent.tagName.includes("-")) {
        return {
          element: customParent,
          componentType: "web-component",
          displayName: customParent.tagName.toLowerCase(),
        };
      }

      // Buttons with icons
      if (element.tagName === "BUTTON" || element.closest("button")) {
        element =
          element.tagName === "BUTTON" ? element : element.closest("button");
        componentType = "button";
        const hasIcon = element.querySelector("pds-icon");
        displayName = hasIcon ? "button with icon" : "button";
        return { element, componentType, displayName };
      }

      // SVG icons
      if (element.tagName === "pds-icon" || element.closest("pds-icon")) {
        element =
          element.tagName === "pds-icon"
            ? element
            : element.closest("pds-icon");
        componentType = "icon";
        displayName = `pds-icon (${element.getAttribute("icon") || "unknown"})`;
        return { element, componentType, displayName };
      }

      // Navigation elements
      if (element.tagName === "NAV" || element.closest("nav[data-dropdown]")) {
        element = element.closest("nav[data-dropdown]") || element;
        componentType = "navigation";
        displayName = "dropdown menu";
        return { element, componentType, displayName };
      }

      // Generic container with interesting classes (but not showcase-section)
      const interestingClasses = [
        "color-card",
        "color-scale",
        "demo-grid",
        "flex-wrap",
        "btn-group",
      ];

      for (const cls of interestingClasses) {
        if (element.classList.contains(cls)) {
          componentType = "container";
          displayName = cls.replace(/-/g, " ");
          return { element, componentType, displayName };
        }
        const container = element.closest(`.${cls}`);
        if (container) {
          element = container;
          componentType = "container";
          displayName = cls.replace(/-/g, " ");
          return { element, componentType, displayName };
        }
      }

      // Find nearest meaningful parent (not showcase-section)
      const meaningfulParent = this.findNearestComponent(element);
      if (meaningfulParent && meaningfulParent !== element) {
        return this.detectComponentElement(meaningfulParent);
      }

      return { element, componentType, displayName };
    }

    /**
     * Find PDS-styled elements (primitives styled by PDS classes or semantic HTML)
     */
    findPDSStyledElement(element) {
      // Delegate to ontology-driven lookup
      const res = PDS.findComponentForElement(element, { maxDepth: 5 });
      if (!res) return null;
      if (res.element && res.element.tagName === "DS-SHOWCASE") return null;
      return {
        element: res.element,
        componentType: res.componentType || "pds-primitive",
        displayName:
          res.displayName || (res.element?.tagName || "element").toLowerCase(),
      };
    }

    /**
     * Find enhanced elements (progressive enhancements from config)
     */
    findEnhancedElement(element) {
      // Check common enhancement patterns
      const enhancementSelectors = [
        "nav[data-dropdown]",
        "label[data-toggle]",
        "[data-tabs]",
        "[data-accordion]",
        "[data-modal]",
        "[data-tooltip]",
      ];

      for (const selector of enhancementSelectors) {
        if (element.matches && element.matches(selector)) {
          return element;
        }
        const enhanced = element.closest(selector);
        if (enhanced) {
          return enhanced;
        }
      }

      return null;
    }

    /**
     * Get descriptive name for enhanced element
     */
    getEnhancedElementName(element) {
      if (element.matches("nav[data-dropdown]")) return "dropdown menu";
      if (element.matches("label[data-toggle]")) return "toggle switch";
      if (element.matches("[data-tabs]")) return "tab component";
      if (element.matches("[data-accordion]")) return "accordion";
      if (element.matches("[data-modal]")) return "modal dialog";
      if (element.matches("[data-tooltip]")) return "tooltip";

      // Fallback
      const dataAttrs = Array.from(element.attributes)
        .filter((attr) => attr.name.startsWith("data-"))
        .map((attr) => attr.name.replace("data-", ""));

      return dataAttrs[0]
        ? `${dataAttrs[0]} component`
        : element.tagName.toLowerCase();
    }

    /**
     * Find nearest meaningful component (not showcase-section, pds-demo, or generic divs)
     * Maximum 5 levels up to prevent going too high
     */
    findNearestComponent(element) {
      let current = element.parentElement;
      let level = 0;
      const maxLevels = 5;

      while (current && level < maxLevels) {
        level++;

        // Never traverse beyond pds-demo - it's too high, return null
        if (current.tagName === "DS-SHOWCASE") {
          return null;
        }

        // Skip showcase-section but continue traversing
        if (current.classList.contains("showcase-section")) {
          current = current.parentElement;
          continue;
        }

        // Check if this is a meaningful component
        if (
          current.tagName.includes("-") || // Custom element
          current.tagName === "BUTTON" ||
          current.tagName === "NAV" ||
          current.tagName === "FIELDSET" ||
          current.tagName === "LABEL" ||
          current.tagName === "TABLE" ||
          current.tagName === "FIGURE" ||
          current.tagName === "BLOCKQUOTE" ||
          current.tagName === "ARTICLE" ||
          current.hasAttribute("role") ||
          current.hasAttribute("data-dropdown") ||
          current.hasAttribute("data-toggle") ||
          this.hasPDSClass(current)
        ) {
          return current;
        }

        current = current.parentElement;
      }

      return null;
    }

    /**
     * Check if element has any PDS component/primitive class
     */
    hasPDSClass(element) {
      const pdsClassPrefixes = [
        "card",
        "surface",
        "tag",
        "badge",
        "pill",
        "chip",
        "alert",
        "toast",
        "notification",
        "message",
        "accordion",
        "collapse",
        "expandable",
        "list-group",
        "menu-list",
        "nav-list",
        "breadcrumb",
        "pagination",
        "tabs",
        "tab",
        "progress",
        "spinner",
        "loader",
        "skeleton",
        "divider",
        "separator",
        "avatar",
        "thumbnail",
        "form-group",
        "input-group",
        "checkbox-group",
        "radio-group",
        "btn-",
        "icon-only",
        "dropdown",
        "popover",
        "tooltip",
        "modal",
        "dialog",
        "table-responsive",
        "data-table",
        "card-grid",
        "media-object",
        "status",
        "indicator",
        "dot-indicator",
        "pulse",
      ];

      return Array.from(element.classList).some((cls) =>
        pdsClassPrefixes.some((prefix) => cls.startsWith(prefix))
      );
    }

    /**
     * Extract HTML with smart formatting
     */
    extractHTML(element) {
      const clone = element.cloneNode(true);

      // Remove event listeners and internal state
      const allElements = [clone, ...clone.querySelectorAll("*")];
      allElements.forEach((el) => {
        // Remove Lit internal attributes
        if (el.removeAttribute) {
          el.removeAttribute("_$litPart$");
          el.removeAttribute("_$litElement$");
        }
      });

      // Pretty print HTML using DOM-aware formatter
      let html = this.formatHTMLElement(clone);

      // Extract Lit properties (attributes starting with .)
      const litProps = this.extractLitProperties(element);

      return { html, litProps };
    }

    /**
     * Extract Lit property bindings from element
     */
    extractLitProperties(element) {
      const props = [];

      // Check for common Lit property patterns
      if (element.checked !== undefined && element.type === "checkbox") {
        props.push({ name: ".checked", value: element.checked });
      }

      if (
        element.value !== undefined &&
        ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)
      ) {
        props.push({ name: ".value", value: element.value });
      }

      // Check for custom element properties
      if (element.tagName.includes("-")) {
        const constructor = customElements.get(element.tagName.toLowerCase());
        if (constructor && constructor.properties) {
          Object.keys(constructor.properties).forEach((prop) => {
            if (
              element[prop] !== undefined &&
              typeof element[prop] !== "function"
            ) {
              props.push({ name: `.${prop}`, value: element[prop] });
            }
          });
        }
      }

      return props;
    }

    /**
     * Format HTML with indentation
     */
    formatHTMLElement(node, level = 0) {
      const indent = (n) => "  ".repeat(n);
      let out = "";

      const escapeText = (s) =>
        s
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

      const isVoid = (tag) =>
        [
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ].includes(tag);

      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent.replace(/\s+/g, " ").trim();
        if (t.length === 0) return "";
        return indent(level) + escapeText(t) + "\n";
      }

      if (node.nodeType === Node.COMMENT_NODE) {
        return indent(level) + `<!-- ${escapeText(node.textContent)} -->\n`;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        const attrs = [];
        const booleanDataAttrs = new Set(["data-label", "data-toggle"]);
        for (const a of node.attributes) {
          const name = a.name;
          const val = a.value;

          // Special-case certain data-* attributes as boolean markers
          if (booleanDataAttrs.has(name)) {
            // Render as bare boolean attribute (e.g., data-toggle)
            attrs.push(name);
            continue;
          }

          if (val === "") {
            // Render empty data-* attributes explicitly as data-xxx=""
            if (name.startsWith("data-")) {
              attrs.push(`${name}=""`);
            } else {
              // For other boolean-ish attributes, render bare attribute
              attrs.push(name);
            }
          } else {
            attrs.push(`${name}="${escapeText(val)}"`);
          }
        }
        const attrString = attrs.length ? " " + attrs.join(" ") : "";

        // Start tag
        out += indent(level) + `<${tag}${attrString}>` + "\n";

        // Children
        for (const child of Array.from(node.childNodes)) {
          out += this.formatHTMLElement(child, level + 1);
        }

        // End tag (void elements don't need explicit closing)
        if (!isVoid(tag)) {
          out += indent(level) + `</${tag}>` + "\n";
        }

        return out;
      }

      return "";
    }

    /**
     * Handle click in inspector mode
     */
    handleInspectorClick(e) {
      if (!this.inspectorActive) return;

      e.preventDefault();
      e.stopPropagation();

      const detected = this.detectComponentElement(e.target);
      if (!detected) return;

      const { element, componentType, displayName } = detected;

      // Turn off inspector mode after selecting an element (like a color picker)
      this.deactivateInspector();

      // Check if an enhancer provides a demo HTML to display (clean template)
      let demoHtml = null;
      let enhancer = null;
      try {
        // Prefer the runtime config dispatched from pds-config-form; fall back to
        // any global appConfig or the pure-app element if present.
        const enhancers =
          this.config?.autoDefine?.enhancers ||
          (typeof appConfig !== "undefined"
            ? appConfig?.autoDefine?.enhancers
            : null) ||
          (typeof window !== "undefined"
            ? window?.appConfig?.autoDefine?.enhancers
            : null) ||
          (document.querySelector &&
            document.querySelector("pure-app")?.config?.autoDefine
              ?.enhancers) ||
          [];
        enhancer = enhancers.find((en) => {
          try {
            return (
              (element.matches && element.matches(en.selector)) ||
              (element.closest && element.closest(en.selector))
            );
          } catch (ex) {
            return false;
          }
        });
      } catch (ex) {
        enhancer = null;
      }

      let litProps = [];
      let html = null;
      if (enhancer && enhancer.demoHtml) {
        demoHtml =
          typeof enhancer.demoHtml === "function"
            ? enhancer.demoHtml(element)
            : enhancer.demoHtml;
        // If demoHtml is a string, parse it into a DOM node and pretty-print it
        if (typeof demoHtml === "string") {
          try {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = demoHtml.trim();
            // If there are multiple top-level nodes, format them all
            let combined = "";
            for (const child of Array.from(wrapper.childNodes)) {
              combined += this.formatHTMLElement(child);
            }
            html = combined;
          } catch (ex) {
            // Fallback to raw string if parsing fails
            html = demoHtml;
          }
        } else {
          // If the enhancer returned a DOM node or other structure, try to format it
          if (demoHtml instanceof Node) {
            html = this.formatHTMLElement(demoHtml);
          } else {
            html = String(demoHtml);
          }
        }
        // still extract lit props from real element if useful
        litProps = this.extractLitProperties(element);
      } else {
        const res = this.extractHTML(element);
        html = res.html;
        litProps = res.litProps;
      }

      // Show code in drawer
      this.showCodeDrawer(html, litProps, displayName, componentType);
    }

    /**
     * Show code in pds-drawer
     */
    async showCodeDrawer(htmlCode, litProps, displayName, componentType) {
      const drawer = document.querySelector("#global-drawer");

      // Create header template
      const headerTemplate = html`
        <div class="code-drawer-header">
          <div class="code-drawer-title">
            <pds-icon icon="code" size="sm"></pds-icon>
            <span>${displayName}</span>
            <span class="component-type-badge">${componentType}</span>
          </div>
          <button class="copy-code-btn" id="copyCodeBtn">
            <pds-icon icon="clipboard" size="sm"></pds-icon>
            Copy HTML
          </button>
        </div>
      `;

      // Create content template with loading state
      const litPropsTemplate =
        litProps.length > 0
          ? html`
              <div class="lit-properties">
                <h4>Lit Properties</h4>
                <div class="lit-props-list">
                  ${litProps.map(
                    (prop) => html`
                      <div class="lit-prop">
                        <code class="prop-name">${prop.name}</code>
                        <code class="prop-value"
                          >${JSON.stringify(prop.value)}</code
                        >
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          : nothing;

      const loadingTemplate = html`
        ${litPropsTemplate}
        <div class="code-block-wrapper">
          <pre
            class="code-block"
          ><code class="language-html">Loading syntax highlighting...</code></pre>
        </div>
      `;

      // Show drawer with loading content
      await drawer.show(loadingTemplate, { header: headerTemplate });

      // Highlight code asynchronously
      const highlightedCode = await this.highlightWithShiki(htmlCode);

      // Update with highlighted code
      const finalTemplate = html`
        ${litPropsTemplate}
        <div class="code-block-wrapper">
          <pre class="code-block"><code class="language-html">${unsafeHTML(
            highlightedCode
          )}</code></pre>
        </div>
      `;

      // Re-render with highlighted code
      await document.getElementById("global-drawer").show(finalTemplate, { header: headerTemplate });

      // Add copy functionality
      setTimeout(() => {
        const drawer = document.getElementById("global-drawer");
        const copyBtn = drawer?.querySelector("#copyCodeBtn");
        if (copyBtn) {
          copyBtn.onclick = () => {
            let textToCopy = htmlCode;
            if (litProps.length > 0) {
              textToCopy =
                "<!-- Lit Properties:\n" +
                litProps
                  .map((p) => `  ${p.name}=${JSON.stringify(p.value)}`)
                  .join("\n") +
                "\n-->\n\n" +
                htmlCode;
            }

            navigator.clipboard.writeText(textToCopy).then(() => {
              copyBtn.innerHTML = `
              <pds-icon icon="check" size="sm"></pds-icon>
              Copied!
            `;
              setTimeout(() => {
                copyBtn.innerHTML = `
                <pds-icon icon="clipboard" size="sm"></pds-icon>
                Copy HTML
              `;
              }, 2000);
            });
          };
        }
      }, 100);
    }

    /**
     * Load Shiki syntax highlighter dynamically
     */
    async loadShiki() {
      if (this.#shiki) return this.#shiki;
      if (this.#shikiLoading) {
        // Wait for the loading to complete
        while (this.#shikiLoading) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        return this.#shiki;
      }

      this.#shikiLoading = true;
      try {
        const shiki = await import("https://esm.sh/shiki@1.0.0");
        this.#shiki = await shiki.getHighlighter({
          themes: ["dark-plus"],
          langs: ["html"],
        });
        return this.#shiki;
      } catch (error) {
        console.error("Failed to load Shiki:", error);
        return null;
      } finally {
        this.#shikiLoading = false;
      }
    }

    /**
     * Highlight code with Shiki
     */
    async highlightWithShiki(code) {
      const highlighter = await this.loadShiki();
      if (!highlighter) {
        // Fallback to escaped HTML without highlighting
        return this.escapeHTML(code);
      }

      try {
        const html = highlighter.codeToHtml(code, {
          lang: "html",
          theme: "dark-plus",
        });
        // Extract just the code content from the generated HTML
        const match = html.match(/<code[^>]*>([\s\S]*)<\/code>/);
        return match ? match[1] : this.escapeHTML(code);
      } catch (error) {
        console.error("Shiki highlighting failed:", error);
        return this.escapeHTML(code);
      }
    }
    escapeHTML(html) {
      return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    scrollToRelevantSection(fieldPath) {
      console.log("🎯 Scrolling to section for field:", fieldPath);

      // Remove leading slash if present (pds-jsonform sends "/behavior.transitionSpeed")
      const normalizedPath = fieldPath.startsWith("/")
        ? fieldPath.slice(1)
        : fieldPath;
      console.log("  Normalized path:", normalizedPath);

      // Map field paths to section IDs
      const sectionMap = {
        // Colors
        "colors/primary": "color-system",
        "colors/secondary": "color-system",
        "colors/accent": "color-system",
        "colors/background": "color-system",
        "colors/success": "color-system",
        "colors/warning": "color-system",
        "colors/danger": "color-system",
        "colors/info": "color-system",

        // Typography
        "typography/": "typography",

        // Spacing
        "spatialRhythm/": "spacing",

        // Shadows & Layers
        "layers/": "surfaces-shadows",

        // Shape (radius, borders)
        "shape/": "buttons",

        // Behavior (transitions - goes to interactive states where transition demo lives)
        "behavior/transitionSpeed": "interactive-states",
        "behavior/": "interactive-states",

        // Components
        "components/forms": "forms",
        "components/alerts": "alerts",
        "components/badges": "badges",
        "components/tables": "tables",
        "components/toasts": "toasts",
        "components/modals": "modals",
        "components/tabStrip": "tabs",

        // Icons
        "icons/": "icons",
      };

      // Find matching section
      let sectionId = null;
      for (const [pattern, id] of Object.entries(sectionMap)) {
        if (normalizedPath.startsWith(pattern)) {
          sectionId = id;
          console.log(`  ✓ Matched pattern "${pattern}" → section "${id}"`);
          break;
        }
      }

      if (sectionId) {
        // Find the section element
        const section = this.querySelector(`[data-section="${sectionId}"]`);
        console.log(
          `  Searching for section: [data-section="${sectionId}"]`,
          section ? "✓ Found" : "✗ Not found"
        );

        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });

          // Add a brief highlight effect
          section.style.transition = "background-color 0.3s ease";
          section.style.backgroundColor = "var(--color-primary-50)";
          setTimeout(() => {
            section.style.backgroundColor = "";
          }, 1500);

          console.log("  ✓ Scrolled and highlighted section");
        } else {
          console.warn(
            `  ✗ Section [data-section="${sectionId}"] not found in DOM`
          );
        }
      } else {
        console.warn(`  ✗ No section mapping found for field: ${fieldPath}`);
      }
    }

    renderDisabledSection(title, message) {
      return html`
        <section class="showcase-section disabled">
          <h2>${title}</h2>
          <p class="disabled-message">${message}</p>
        </section>
      `;
    }

    renderTOC() {
      if (!this.sections || this.sections.length === 0) return nothing;

      return html`
        <nav class="showcase-toc" aria-label="Table of Contents">
          <div class="toc-wrapper">
            <div class="input-icon">
              <pds-icon icon="magnifying-glass"></pds-icon>
              <input
                id="pds-search"
                @focus=${(e) =>
                  AutoComplete.connect(e, this.autoCompleteSettings)}
                type="search"
                placeholder="Search design system..."
              />
            </div>
          </div>
        </nav>
      `;
    }

    get autoCompleteSettings() {
      return {
        //debug: true,
        categories: {
          Sections: {
            action: (options) => {
              document
                .querySelector(`[data-section="${options.id}"]`)
                .scrollIntoView({ behavior: "smooth", block: "start" });
            },
            trigger: (options) => options.search.length === 0,
            getItems: (options) => {
              return this.sections.map((section) => {
                return {
                  text: section.title,
                  id: section.id,
                  icon: "folder-simple",
                };
              });
            },
          },
          Search: {
            action: (options) => {
              // When a user selects an item, try to resolve it to a showcase section
              const rawId = options.id || "";
              const query = (options.search || "").toLowerCase();

              // id is encoded as `type|key` (see getItems)
              const [type, key] = rawId.split("|");

              // 1) try to find a section with id exactly matching key
              let section = this.sections.find((s) => s.id === key);

              // 2) try to match against title or id containing the key or query
              if (!section) {
                section = this.sections.find(
                  (s) =>
                    s.title
                      ?.toLowerCase()
                      .includes(key?.toLowerCase?.() || "") ||
                    s.id?.toLowerCase().includes(key?.toLowerCase?.() || "") ||
                    s.title?.toLowerCase().includes(query) ||
                    s.id?.toLowerCase().includes(query)
                );
              }

              // 3) fallback: search inside each section element for the query text
              if (!section && query) {
                for (const s of this.sections) {
                  const el = this.querySelector(`[data-section="${s.id}"]`);
                  if (!el) continue;
                  const text = (el.innerText || "").toLowerCase();
                  if (
                    text.includes(query) ||
                    s.title.toLowerCase().includes(query)
                  ) {
                    section = s;
                    break;
                  }
                }
              }

              if (section) {
                const el = this.querySelector(`[data-section="${section.id}"]`);
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                // no section found - try a global text search and show first match
                const allText = (this.innerText || "").toLowerCase();
                const idx = allText.indexOf(query);
                if (idx !== -1) {
                  // find first section that contains the query
                  for (const s of this.sections) {
                    const el = this.querySelector(`[data-section="${s.id}"]`);
                    if (!el) continue;
                    if ((el.innerText || "").toLowerCase().includes(query)) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      break;
                    }
                  }
                }
              }
            },
            trigger: (options) => options.search.length > 1,
            getItems: (options) => {
              const q = (options.search || "").trim().toLowerCase();
              if (!q) return [];

              const candidates = [];

              // primitives
              for (const p of PDS.ontology.primitives || []) {
                const name = (p.name || p.id || "").toString();
                const id = p.id || name.replace(/\s+/g, "-").toLowerCase();
                const score =
                  (name.toLowerCase().includes(q) ? 30 : 0) +
                  (id.includes(q) ? 20 : 0);
                // selectors
                const selMatch = (p.selectors || []).some((s) =>
                  String(s).toLowerCase().includes(q)
                );
                const total = score + (selMatch ? 10 : 0);
                candidates.push({
                  type: "primitive",
                  key: id,
                  name,
                  score: total,
                });
              }

              // components
              for (const c of PDS.ontology.components || []) {
                const name = (c.name || c.id || "").toString();
                const id = c.id || name.replace(/\s+/g, "-").toLowerCase();
                const score =
                  (name.toLowerCase().includes(q) ? 40 : 0) +
                  (id.includes(q) ? 25 : 0);
                const selMatch = (c.selectors || []).some((s) =>
                  String(s).toLowerCase().includes(q)
                );
                const total = score + (selMatch ? 10 : 0);
                candidates.push({
                  type: "component",
                  key: id,
                  name,
                  score: total,
                });
              }

              // tokens (flatten groups)
              if (PDS.ontology.tokens) {
                for (const [group, items] of Object.entries(
                  PDS.ontology.tokens
                )) {
                  if (Array.isArray(items)) {
                    for (const t of items) {
                      const name = `${group}/${t}`;
                      const id = `${group}-${t}`;
                      const score = name.toLowerCase().includes(q) ? 35 : 0;
                      candidates.push({ type: "token", key: id, name, score });
                    }
                  }
                }
              }

              // enhancements
              for (const enh of PDS.ontology.enhancements || []) {
                const name = String(enh);
                const key = `enh-${name.replace(
                  /[^a-z0-9]+/gi,
                  "-"
                )}`.toLowerCase();
                const score = name.toLowerCase().includes(q) ? 25 : 0;
                candidates.push({ type: "enhancement", key, name, score });
              }

              // utilities
              for (const util of PDS.ontology.utilities || []) {
                const name = String(util);
                const key = `util-${name.replace(
                  /[^a-z0-9]+/gi,
                  "-"
                )}`.toLowerCase();
                const score = name.toLowerCase().includes(q) ? 20 : 0;
                candidates.push({ type: "utility", key, name, score });
              }

              // styles (flat)
              if (PDS.ontology.styles) {
                for (const [k, v] of Object.entries(PDS.ontology.styles)) {
                  const name = k;
                  const key = `style-${k}`;
                  const score = name.toLowerCase().includes(q) ? 10 : 0;
                  candidates.push({ type: "style", key, name, score });
                }
              }

              // Basic fuzzy/substring scoring boost for any candidate containing q in name/key
              for (const c of candidates) {
                const lname = (c.name || "").toLowerCase();
                const lkey = (c.key || "").toLowerCase();
                if (lname.includes(q)) c.score += 50;
                if (lkey.includes(q)) c.score += 20;
              }

              // Filter and sort
              const results = candidates
                .filter((c) => c.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 30)
                .map((c) => ({
                  text: c.name,
                  id: `${c.type}|${c.key}`,
                  icon:
                    c.type === "component"
                      ? "brackets-curly"
                      : c.type === "primitive"
                      ? "tag"
                      : c.type === "token"
                      ? "palette"
                      : "folder-simple",
                }));

              return results;
            },
          },
        },
      };
    }

   

    render() {
      const components = this.config?.components || {};

      return html`
        <div
          class="showcase-container ${this.inspectorActive
            ? "inspector-active"
            : ""}"
          @click=${this.handleInspectorClick}
        >
          <!-- Table of Contents Navigation -->
          ${this.renderTOC()}

          <!-- Hero Section -->
          <section class="showcase-hero">
            <h1>Pure Design System</h1>
            <p>Why build a design system if you can generate it?</p>
            <div class="btn-group">
              <button class="btn-primary btn-lg" @click=${()=>{this.showDoc('getting-started.md')}}>
                <pds-icon icon="download"></pds-icon>
                Get Started
              </button>
              <button class="btn-secondary btn-lg" @click=${()=>{this.showDoc('readme.md')}}>
                <pds-icon icon="book-open"></pds-icon>
                View Docs
              </button>
            </div>
          </section>

          <!-- Colors Section -->
          <section class="showcase-section" data-section="color-system">
            <h2>
              <pds-icon
                icon="palette"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Color System
            </h2>

            <div class="color-grid">
              ${this.renderColorCard("Primary", "primary")}
              ${this.renderColorCard("Secondary", "secondary")}
              ${this.renderColorCard("Accent", "accent")}
              ${this.renderColorCard("Success", "success")}
              ${this.renderColorCard("Warning", "warning")}
              ${this.renderColorCard("Danger", "danger")}
              ${this.renderColorCard("Info", "info")}
            </div>

            <h3>Semantic Color Usage</h3>
            <div class="semantic-usage">
              <div class="semantic-message success">
                <pds-icon
                  icon="check-circle"
                  class="icon-success"
                  size="lg"
                ></pds-icon>
                <div>
                  <strong>Success</strong>
                  <p>Operations completed successfully</p>
                </div>
              </div>

              <div class="semantic-message warning">
                <pds-icon
                  icon="warning"
                  class="icon-warning"
                  size="lg"
                ></pds-icon>
                <div>
                  <strong>Warning</strong>
                  <p>Please review carefully</p>
                </div>
              </div>

              <div class="semantic-message danger">
                <pds-icon
                  icon="x-circle"
                  class="icon-danger"
                  size="lg"
                ></pds-icon>
                <div>
                  <strong>Danger</strong>
                  <p>Critical error occurred</p>
                </div>
              </div>

              <div class="semantic-message info">
                <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
                <div>
                  <strong>Info</strong>
                  <p>Helpful information</p>
                </div>
              </div>
            </div>

            <h3>Gray Scale (from Secondary)</h3>
            <div class="gray-scale-grid">
              ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map(
                (shade) => html`
                  <div class="gray-scale-item">
                    <div
                      class="gray-scale-swatch"
                      style="background-color: var(--color-gray-${shade});"
                      title="gray-${shade}"
                    ></div>
                    <div class="gray-scale-label">${shade}</div>
                  </div>
                `
              )}
            </div>
          </section>

          <!-- Derived Color Scales Section -->
          <section class="showcase-section alt-bg">
            <h2>
              <pds-icon icon="sun" size="lg" class="icon-warning"></pds-icon>
              Derived Color Scales
            </h2>
            <p>
              Complete 9-step color scales (50-800) automatically generated from
              your base colors. Each scale maintains proper contrast and color
              relationships.
            </p>

            <h3>Primary Color Scale</h3>
            ${this.renderColorScale("primary")}

            <h3>Secondary (Neutral) Scale</h3>
            ${this.renderColorScale("secondary")}

            <h3>Accent Color Scale</h3>
            ${this.renderColorScale("accent")}

            <h3>Semantic Color Scales (Auto-Derived)</h3>
            <p class="interactive-demo">
              These colors are automatically derived from your primary color
              with intelligent hue shifting for semantic meaning.
            </p>

            ${this.renderColorScale("success")}
            ${this.renderColorScale("warning")}
            ${this.renderColorScale("danger")} ${this.renderColorScale("info")}
          </section>

          <!-- Typography Section -->
          <section class="showcase-section alt-bg" data-section="typography">
            <h2>
              <pds-icon
                icon="text-aa"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Typography
            </h2>

            <div class="demo-grid cols-1">
              <h1>Heading 1 - The quick brown fox</h1>
              <h2>Heading 2 - The quick brown fox</h2>
              <h3>Heading 3 - The quick brown fox</h3>
              <h4>Heading 4 - The quick brown fox</h4>
              <h5>Heading 5 - The quick brown fox</h5>
              <h6>Heading 6 - The quick brown fox</h6>
              <p>
                Regular paragraph text with <a href="#">a link</a> and
                <code>inline code</code>.
              </p>
            </div>
          </section>

          <!-- Buttons Section -->
          <section class="showcase-section" data-section="buttons">
            <h2>
              <pds-icon
                icon="cursor-click"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Buttons
            </h2>

            <div class="flex-wrap">
              <button class="btn-primary">Primary</button>
              <button class="btn-secondary">Secondary</button>
              <button class="btn-outline">Outline</button>
              <button class="btn-primary" disabled>Disabled</button>
            </div>

            <h3>Sizes</h3>
            <div class="flex-wrap">
              <button class="btn-primary btn-sm">Small</button>
              <button class="btn-primary">Default</button>
              <button class="btn-primary btn-lg">Large</button>
            </div>

            <h3>Icon Buttons</h3>
            <div class="flex-wrap gap-sm">
              <button class="icon-only btn-primary">
                <pds-icon icon="gear" label="Settings"></pds-icon>
              </button>
              <button class="icon-only btn-secondary">
                <pds-icon icon="bell" label="Notifications"></pds-icon>
              </button>
              <button class="icon-only btn-outline">
                <pds-icon icon="heart" label="Favorite"></pds-icon>
              </button>
              <button class="btn-primary">
                <pds-icon icon="download"></pds-icon>
                <span>Download</span>
              </button>
            </div>
          </section>

          <section class="showcase-section alt-bg" data-section="forms">
            <h2>
              <pds-icon
                icon="note-pencil"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Form Controls
            </h2>

            <form
              class="form-demo"
              onsubmit="event.preventDefault(); console.log('Form submitted (prevented)'); return false;"
            >
              <fieldset>
                <legend>Personal Information</legend>

                <label>
                  <span>Full Name</span>
                  <input type="text" placeholder="Enter your name" required />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autocomplete="username"
                    required
                  />
                </label>

                <label>
                  <span>Phone</span>
                  <input type="tel" placeholder="+1 (555) 000-0000" />
                </label>

                <label>
                  <span>Date of Birth</span>
                  <input type="date" />
                </label>

                <label>
                  <span>Time</span>
                  <input type="time" />
                </label>

                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Enter password"
                    autocomplete="current-password"
                  />
                </label>

                <label>
                  <span>Country</span>
                  <select>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  <span>Number</span>
                  <input type="number" min="0" max="100" value="50" />
                </label>

                <label>
                  <span>Range</span>
                  <input type="range" min="0" max="100" value="50" />
                </label>

                <label>
                  <span>Color</span>
                  <input type="color" value="#2d9dc9" />
                </label>

                <label>
                  <span>Search</span>
                  <input type="search" placeholder="Search..." />
                </label>

                <label>
                  <span>URL</span>
                  <input type="url" placeholder="https://example.com" />
                </label>

                <label>
                  <span>File Upload</span>
                  <pds-upload name="file"></pds-upload>
                </label>

                <label>
                  <span>Message</span>
                  <textarea
                    rows="4"
                    placeholder="Your message here..."
                  ></textarea>
                </label>
              </fieldset>

              <fieldset>
                <legend>Preferences</legend>

                <label data-toggle>
                  <input type="checkbox" checked />
                  Subscribe to newsletter
                </label>

                <label data-toggle>
                  <input type="checkbox" />
                  Receive marketing emails
                </label>
              </fieldset>

              <fieldset>
                <legend>Toggle Switches (Progressive Enhancement)</legend>

                <label data-toggle>
                  <input type="checkbox" checked />
                  Enable notifications
                </label>

                <label data-toggle>
                  <input type="checkbox" />
                  Dark mode
                </label>

                <label data-toggle>
                  <input type="checkbox" checked />
                  Auto-save
                </label>
              </fieldset>

              <div class="form-demo-actions">
                <button type="submit" class="btn-primary">Submit Form</button>
                <button type="reset" class="btn-secondary">Reset</button>
                <button type="button" class="btn-outline">Cancel</button>
              </div>
            </form>
          </section>

          <section class="showcase-section" data-section="alerts">
            <h2>
              <pds-icon
                icon="bell-ringing"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Alerts & Feedback
            </h2>

            <div class="demo-grid cols-1">
              <div class="alert alert-success">
                <div class="alert-icon">
                  <pds-icon
                    icon="check-circle"
                    class="icon-success"
                    size="lg"
                  ></pds-icon>
                </div>
                <div>
                  <div class="alert-title">Success!</div>
                  <p>Your operation completed successfully.</p>
                </div>
              </div>

              <div class="alert alert-info">
                <div class="alert-icon">
                  <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
                </div>
                <div>
                  <div class="alert-title">Information</div>
                  <p>This is an informational message.</p>
                </div>
              </div>

              <div class="alert alert-warning">
                <div class="alert-icon">
                  <pds-icon
                    icon="warning"
                    class="icon-warning"
                    size="lg"
                  ></pds-icon>
                </div>
                <div>
                  <div class="alert-title">Warning</div>
                  <p>Please review this warning.</p>
                </div>
              </div>

              <div class="alert alert-danger">
                <div class="alert-icon">
                  <pds-icon
                    icon="x-circle"
                    class="icon-danger"
                    size="lg"
                  ></pds-icon>
                </div>
                <div>
                  <div class="alert-title">Error</div>
                  <p>An error occurred.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Badges Section -->

          <section class="showcase-section alt-bg">
            <h2>
              <pds-icon icon="tag" size="lg" class="icon-primary"></pds-icon>
              Badges & Pills
            </h2>

            <h3>Default Badges</h3>
            <div class="badge-grid">
              <span class="badge">Default</span>
              <span class="badge badge-primary">Primary</span>
              <span class="badge badge-secondary">Secondary</span>
              <span class="badge badge-success">Success</span>
              <span class="badge badge-warning">Warning</span>
              <span class="badge badge-danger">Danger</span>
              <span class="badge badge-info">Info</span>
            </div>

            <h3>Outlined Badges</h3>
            <div class="badge-grid">
              <span class="badge badge-outline badge-primary">Primary</span>
              <span class="badge badge-outline badge-secondary">Secondary</span>
              <span class="badge badge-outline badge-success">Success</span>
              <span class="badge badge-outline badge-info">Info</span>
              <span class="badge badge-outline badge-warning">Warning</span>
              <span class="badge badge-outline badge-danger">Danger</span>
            </div>

            <h3>Badge Sizes</h3>
            <div class="size-demo">
              <span class="badge badge-primary badge-sm">Small</span>
              <span class="badge badge-primary">Default</span>
              <span class="badge badge-primary badge-lg">Large</span>
            </div>

            <h3>Pills</h3>
            <div class="badge-grid">
              <span class="pill badge-primary">React</span>
              <span class="pill badge-secondary">Vue</span>
              <span class="pill badge-success">Node.js</span>
              <span class="pill badge-info">TypeScript</span>
              <span class="pill badge-warning">JavaScript</span>
              <span class="pill badge-danger">Critical</span>
            </div>
          </section>

          <!-- Media Elements Section -->
          <section class="showcase-section">
            <h2>
              <pds-icon icon="image" size="lg" class="icon-primary"></pds-icon>
              Media Elements
            </h2>

            <h3>Responsive Images</h3>
            <div class="media-grid">
              <figure class="media-figure">
                <img
                  class="media-image"
                  src="https://picsum.photos/800/600?random=1"
                  alt="Random landscape"
                />
                <figcaption class="media-caption">
                  <strong>Figure 1:</strong> A beautiful landscape demonstrating
                  image handling in the design system.
                </figcaption>
              </figure>

              <figure class="media-figure">
                <img
                  class="media-image"
                  src="https://picsum.photos/800/600?random=2"
                  alt="Random architecture"
                />
                <figcaption class="media-caption">
                  <strong>Figure 2:</strong> Architectural photography
                  showcasing the responsive image behavior.
                </figcaption>
              </figure>
            </div>

            <h3>Image Gallery</h3>
            <div class="gallery-grid">
              <img
                class="gallery-image"
                src="https://picsum.photos/400/400?random=3"
                alt="Gallery image 1"
              />
              <img
                class="gallery-image"
                src="https://picsum.photos/400/400?random=4"
                alt="Gallery image 2"
              />
              <img
                class="gallery-image"
                src="https://picsum.photos/400/400?random=5"
                alt="Gallery image 3"
              />
              <img
                class="gallery-image"
                src="https://picsum.photos/400/400?random=6"
                alt="Gallery image 4"
              />
            </div>

            <h3>Video Element</h3>
            <figure class="video-container">
              <video
                class="video-element"
                controls
                poster="https://picsum.photos/1200/675?random=7"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <figcaption class="media-caption">
                <strong>Video Demo:</strong> Big Buck Bunny sample video
                demonstrating video element styling.
              </figcaption>
            </figure>
          </section>

          <!-- Enhanced Components Section -->
          <section class="showcase-section alt-bg">
            <h2>
              <pds-icon
                icon="brackets-curly"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Enhanced Components
            </h2>

            <h3>Dropdown Menu (Progressive Enhancement)</h3>
            <p class="dropdown-demo">
              Click the button to toggle the dropdown menu:
            </p>
            <nav data-dropdown>
              <button class="btn-primary">
                <pds-icon icon="list"></pds-icon>
                Click for Menu
              </button>
              <menu class="dropdown-menu">
                <ul>
                  <li>
                    <a href="#">
                      <pds-icon icon="user" size="sm"></pds-icon>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <pds-icon icon="gear" size="sm"></pds-icon>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" class="danger">
                      <pds-icon icon="x" size="sm"></pds-icon>
                      Logout
                    </a>
                  </li>
                </ul>
              </menu>
            </nav>
          </section>

          <!-- Icons Section -->
          <section class="showcase-section" data-section="icons">
            <h2>
              <pds-icon icon="star" size="lg" class="icon-accent"></pds-icon>
              Icon System
            </h2>

            <h3>Sizes</h3>
            <div class="icon-sizes">
              <pds-icon icon="heart" size="xs"></pds-icon>
              <pds-icon icon="heart" size="sm"></pds-icon>
              <pds-icon icon="heart" size="md"></pds-icon>
              <pds-icon icon="heart" size="lg"></pds-icon>
              <pds-icon icon="heart" size="xl"></pds-icon>
              <pds-icon icon="heart" size="2xl"></pds-icon>
            </div>

            <h3>Semantic Colors</h3>
            <div class="icon-colors">
              <pds-icon
                icon="check-circle"
                class="icon-primary"
                size="lg"
              ></pds-icon>
              <pds-icon
                icon="check-circle"
                class="icon-secondary"
                size="lg"
              ></pds-icon>
              <pds-icon
                icon="check-circle"
                class="icon-accent"
                size="lg"
              ></pds-icon>
              <pds-icon
                icon="check-circle"
                class="icon-success"
                size="lg"
              ></pds-icon>
              <pds-icon
                icon="warning"
                class="icon-warning"
                size="lg"
              ></pds-icon>
              <pds-icon
                icon="x-circle"
                class="icon-danger"
                size="lg"
              ></pds-icon>
              <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
            </div>

            <h3>Icon with Text</h3>
            <div class="icon-text-demo">
              <div class="icon-text">
                <pds-icon icon="envelope"></pds-icon>
                <span>Email</span>
              </div>
              <div class="icon-text">
                <pds-icon icon="phone"></pds-icon>
                <span>Phone</span>
              </div>
              <div class="icon-text">
                <pds-icon icon="user"></pds-icon>
                <span>Profile</span>
              </div>
              <div class="icon-text">
                <pds-icon icon="calendar"></pds-icon>
                <span>Schedule</span>
              </div>
            </div>

            <h3>Inputs with Icons</h3>
            <div class="input-icon-demo">
              <div class="input-icon">
                <pds-icon icon="magnifying-glass"></pds-icon>
                <input type="search" placeholder="Search..." />
              </div>
              <div class="input-icon input-icon-end">
                <input type="text" placeholder="Username" />
                <pds-icon icon="user"></pds-icon>
              </div>
            </div>

            <h3>Common Icons</h3>
            <div class="icon-grid">
              <div class="icon-grid-item">
                <pds-icon icon="house" size="lg"></pds-icon>
                <span class="icon-grid-label">house</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="gear" size="lg"></pds-icon>
                <span class="icon-grid-label">gear</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="bell" size="lg"></pds-icon>
                <span class="icon-grid-label">bell</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="heart" size="lg"></pds-icon>
                <span class="icon-grid-label">heart</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="star" size="lg"></pds-icon>
                <span class="icon-grid-label">star</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="trash" size="lg"></pds-icon>
                <span class="icon-grid-label">trash</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="pencil" size="lg"></pds-icon>
                <span class="icon-grid-label">pencil</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="check" size="lg"></pds-icon>
                <span class="icon-grid-label">check</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="x" size="lg"></pds-icon>
                <span class="icon-grid-label">x</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="plus" size="lg"></pds-icon>
                <span class="icon-grid-label">plus</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="minus" size="lg"></pds-icon>
                <span class="icon-grid-label">minus</span>
              </div>
              <div class="icon-grid-item">
                <pds-icon icon="download" size="lg"></pds-icon>
                <span class="icon-grid-label">download</span>
              </div>
            </div>
          </section>

          <!-- Layout & Cards Section -->
          <section class="showcase-section alt-bg">
            <h2>
              <pds-icon
                icon="desktop"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Layout & Cards
            </h2>

            <div class="demo-grid cols-1">
              <div class="card-elevated">
                <h3>Elevated Surface</h3>
                <p>This surface has a subtle shadow and elevated background.</p>
              </div>

              <div class="demo-grid cols-3">
                <div class="card-basic">
                  <h4>Card 1</h4>
                  <p>Cards provide a clean container for content.</p>
                </div>
                <div class="card-basic">
                  <h4>Card 2</h4>
                  <p>They have consistent spacing and shadows.</p>
                </div>
                <div class="card-basic">
                  <h4>Card 3</h4>
                  <p>And they respond beautifully to hover states.</p>
                </div>
              </div>
            </div>

            <h3>Accordion Component</h3>
            <section class="accordion" aria-label="FAQ">
              <details>
                <summary id="q1">How billing works</summary>
                <div role="region" aria-labelledby="q1">
                  <p>We charge monthly on the 1st…</p>
                </div>
              </details>

              <details>
                <summary id="q2">Refund policy</summary>
                <div role="region" aria-labelledby="q2">
                  <p>You can request a refund within 14 days…</p>
                </div>
              </details>

              <details>
                <summary id="q3">Invoices</summary>
                <div role="region" aria-labelledby="q3">
                  <p>Download invoices from Settings → Billing…</p>
                </div>
              </details>
            </section>
          </section>

          <section class="showcase-section">
            <h2>
              <pds-icon icon="list" size="lg" class="icon-primary"></pds-icon>
              Tables
            </h2>

            <h3>Default Table</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice Johnson</td>
                  <td>Senior Developer</td>
                  <td>Engineering</td>
                  <td><span class="badge badge-success">Active</span></td>
                </tr>
                <tr>
                  <td>Bob Smith</td>
                  <td>Product Manager</td>
                  <td>Product</td>
                  <td><span class="badge badge-success">Active</span></td>
                </tr>
                <tr>
                  <td>Carol Williams</td>
                  <td>UX Designer</td>
                  <td>Design</td>
                  <td><span class="badge badge-warning">Away</span></td>
                </tr>
                <tr>
                  <td>David Brown</td>
                  <td>DevOps Engineer</td>
                  <td>Engineering</td>
                  <td><span class="badge badge-danger">Offline</span></td>
                </tr>
              </tbody>
            </table>

            <h3>Striped Table</h3>
            <table class="table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laptop Pro</td>
                  <td>$1,299</td>
                  <td>45</td>
                  <td>Electronics</td>
                </tr>
                <tr>
                  <td>Wireless Mouse</td>
                  <td>$29</td>
                  <td>128</td>
                  <td>Accessories</td>
                </tr>
                <tr>
                  <td>USB-C Hub</td>
                  <td>$59</td>
                  <td>76</td>
                  <td>Accessories</td>
                </tr>
                <tr>
                  <td>Monitor 27"</td>
                  <td>$449</td>
                  <td>23</td>
                  <td>Electronics</td>
                </tr>
              </tbody>
            </table>

            <h3>Bordered Compact Table</h3>
            <table class="table-bordered table-compact">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#101</td>
                  <td>Fix navigation bug</td>
                  <td><span class="badge badge-danger">High</span></td>
                  <td>Oct 15, 2025</td>
                </tr>
                <tr>
                  <td>#102</td>
                  <td>Update documentation</td>
                  <td><span class="badge badge-warning">Medium</span></td>
                  <td>Oct 18, 2025</td>
                </tr>
                <tr>
                  <td>#103</td>
                  <td>Refactor CSS</td>
                  <td><span class="badge badge-info">Low</span></td>
                  <td>Oct 25, 2025</td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- Form Groups Section -->
          <section class="showcase-section alt-bg">
            <h2>
              <pds-icon
                icon="list-bullets"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Form Groups
            </h2>

            <div class="demo-grid cols-2">
              <div class="form-group">
                <h3>Radio Buttons</h3>
                <fieldset role="radiogroup">
                  <legend>Select your plan</legend>
                  <label>
                    <input type="radio" name="plan" value="free" checked />
                    <span>Free - $0/month</span>
                  </label>
                  <label>
                    <input type="radio" name="plan" value="pro" />
                    <span>Pro - $29/month</span>
                  </label>
                  <label>
                    <input type="radio" name="plan" value="enterprise" />
                    <span>Enterprise - $99/month</span>
                  </label>
                </fieldset>
              </div>

              <div class="form-group">
                <h3>Checkboxes</h3>
                <fieldset role="group">
                  <legend>Select features</legend>
                  <label>
                    <input
                      type="checkbox"
                      name="features"
                      value="api"
                      checked
                    />
                    <span>API Access</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="features"
                      value="analytics"
                      checked
                    />
                    <span>Advanced Analytics</span>
                  </label>
                  <label>
                    <input type="checkbox" name="features" value="support" />
                    <span>Priority Support</span>
                  </label>
                  <label>
                    <input type="checkbox" name="features" value="sso" />
                    <span>Single Sign-On</span>
                  </label>
                </fieldset>
              </div>
            </div>
          </section>

          <!-- Smart Surfaces Section -->
          <section class="showcase-section" data-section="smart-surfaces">
            <h2>
              <pds-icon
                icon="palette"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Smart Surface System
            </h2>

            <p>
              The smart surface system automatically adapts text, icon, shadow,
              and border colors based on surface backgrounds. All colors
              maintain WCAG AA contrast ratios automatically.
            </p>

            <h3>Surface Variants</h3>
            <div class="surface-demo-grid">
              <div class="surface-base" style="padding: var(--spacing-6);">
                <strong class="surface-title">
                  <pds-icon icon="square"></pds-icon>
                  Base Surface
                </strong>
                <p class="surface-description">
                  Default background with auto-adjusted text and icons
                </p>
                <button
                  class="btn-primary"
                  style="margin-top: var(--spacing-3);"
                >
                  Button
                </button>
              </div>
              <div class="surface-subtle" style="padding: var(--spacing-6);">
                <strong class="surface-title">
                  <pds-icon icon="square"></pds-icon>
                  Subtle Surface
                </strong>
                <p class="surface-description">
                  Slightly different tone for visual hierarchy
                </p>
                <button
                  class="btn-secondary"
                  style="margin-top: var(--spacing-3);"
                >
                  Button
                </button>
              </div>
              <div class="surface-elevated" style="padding: var(--spacing-6);">
                <strong class="surface-title">
                  <pds-icon icon="arrow-up"></pds-icon>
                  Elevated Surface
                </strong>
                <p class="surface-description">
                  Raised with smart shadows that adapt in dark mode
                </p>
                <button
                  class="btn-primary"
                  style="margin-top: var(--spacing-3);"
                >
                  Button
                </button>
              </div>
              <div class="surface-overlay" style="padding: var(--spacing-6);">
                <strong class="surface-title">
                  <pds-icon icon="desktop"></pds-icon>
                  Overlay Surface
                </strong>
                <p class="surface-description">
                  Modal/dropdown backgrounds with stronger shadows
                </p>
                <button
                  class="btn-outline"
                  style="margin-top: var(--spacing-3);"
                >
                  Button
                </button>
              </div>
            </div>

            <h3>Context-Aware Shadows</h3>
            <p>
              Shadows automatically invert in dark mode: dark shadows on light
              surfaces, light shadows on dark surfaces.
            </p>
            <div class="shadow-demo-grid">
              <div class="shadow-demo-item shadow-sm">
                <pds-icon icon="feather" size="lg"></pds-icon>
                <strong>Small</strong>
                <p>--shadow-sm</p>
              </div>
              <div class="shadow-demo-item shadow-md">
                <pds-icon icon="grid-four" size="lg"></pds-icon>
                <strong>Medium</strong>
                <p>--shadow-md</p>
              </div>
              <div class="shadow-demo-item shadow-lg">
                <pds-icon icon="rocket" size="lg"></pds-icon>
                <strong>Large</strong>
                <p>--shadow-lg</p>
              </div>
            </div>
          </section>

          <!-- Nested Surfaces Section -->
          <section
            class="showcase-section alt-bg"
            data-section="nested-surfaces"
          >
            <h2>
              <pds-icon
                icon="grid-four"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Nested Surfaces
            </h2>

            <p>
              Surfaces can be nested infinitely. Each level maintains proper
              contrast and visual hierarchy automatically.
            </p>

            <div class="surface-base" style="padding: var(--spacing-6);">
              <h4>
                <pds-icon icon="circle"></pds-icon>
                Level 1: Base Surface
              </h4>
              <p>
                Notice how icons and text adapt at each nesting level to
                maintain readability.
              </p>

              <div
                class="surface-elevated"
                style="padding: var(--spacing-6); margin-top: var(--spacing-4);"
              >
                <h5>
                  <pds-icon icon="arrow-right"></pds-icon>
                  Level 2: Elevated Surface
                </h5>
                <p>Shadows and text colors automatically adjust</p>

                <div
                  class="demo-grid cols-2"
                  style="margin-top: var(--spacing-4);"
                >
                  <div class="card">
                    <h6>
                      <pds-icon icon="check"></pds-icon>
                      Level 3: Card
                    </h6>
                    <p>Perfect contrast maintained</p>

                    <div
                      class="surface-sunken"
                      style="padding: var(--spacing-4); margin-top: var(--spacing-3);"
                    >
                      <small>
                        <pds-icon icon="info" size="sm"></pds-icon>
                        Level 4: Sunken surface inside card
                      </small>
                    </div>
                  </div>

                  <div class="card">
                    <h6>
                      <pds-icon icon="star"></pds-icon>
                      Another Card
                    </h6>
                    <p>All elements adapt automatically</p>
                    <button
                      class="btn-primary btn-sm"
                      style="margin-top: var(--spacing-2);"
                    >
                      <pds-icon icon="heart" size="sm"></pds-icon>
                      Action
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h3>Card Grids</h3>
            <p>Cards automatically adapt when nested or grouped</p>
            <div class="demo-grid cols-3">
              <div class="card">
                <h5>
                  <pds-icon icon="palette"></pds-icon>
                  Design
                </h5>
                <p>Smart surfaces handle theming automatically</p>
              </div>
              <div class="card">
                <h5>
                  <pds-icon icon="code"></pds-icon>
                  Development
                </h5>
                <p>Zero manual color overrides needed</p>
              </div>
              <div class="card">
                <h5>
                  <pds-icon icon="rocket"></pds-icon>
                  Performance
                </h5>
                <p>CSS custom properties are fast</p>
              </div>
            </div>
          </section>

          <!-- Surface Inversion Section -->
          <section class="showcase-section" data-section="surface-inversion">
            <h2>
              <pds-icon icon="moon" size="lg" class="icon-primary"></pds-icon>
              Surface Inversion
            </h2>

            <p>
              The smart surface system automatically inverts text and icon
              colors when you use a dark surface in light mode (or vice versa).
              Toggle dark mode to see the magic!
            </p>

            <h3>Dark Surfaces in Light Mode</h3>
            <div class="demo-grid cols-2">
              <div
                class="demo-inversion-box"
                style="background-color: #1a1a1a; padding: var(--spacing-6); border-radius: var(--radius-lg);"
              >
                <h4 style="color: white;">
                  <pds-icon icon="moon" style="color: white;"></pds-icon>
                  Automatic Inversion
                </h4>
                <p style="color: #e5e5e5;">
                  This dark surface automatically uses light text and icons for
                  perfect readability
                </p>
                <button
                  class="btn-primary"
                  style="margin-top: var(--spacing-3);"
                >
                  Primary Button
                </button>
              </div>

              <div
                class="demo-inversion-box"
                style="background-color: #1e4a6f; padding: var(--spacing-6); border-radius: var(--radius-lg);"
              >
                <h4 style="color: white;">
                  <pds-icon icon="palette" style="color: white;"></pds-icon>
                  Primary 800
                </h4>
                <p style="color: #dbeafe;">
                  Text and icons auto-adapt to maintain WCAG AA contrast
                </p>
                <button
                  class="btn-secondary"
                  style="margin-top: var(--spacing-3);"
                >
                  Secondary Button
                </button>
              </div>
            </div>

            <h3>Semantic Surfaces with Auto-Contrast</h3>
            <div class="demo-grid cols-3">
              <div
                class="demo-inversion-box"
                style="background-color: #16a34a; padding: var(--spacing-5); border-radius: var(--radius-md); text-align: center;"
              >
                <pds-icon
                  icon="check-circle"
                  size="xl"
                  style="color: white;"
                ></pds-icon>
                <h5 style="color: white; margin-top: var(--spacing-2);">
                  Success
                </h5>
                <p style="color: #dcfce7;">Icons remain visible</p>
              </div>

              <div
                class="demo-inversion-box"
                style="background-color: #ca8a04; padding: var(--spacing-5); border-radius: var(--radius-md); text-align: center;"
              >
                <pds-icon
                  icon="warning"
                  size="xl"
                  style="color: white;"
                ></pds-icon>
                <h5 style="color: white; margin-top: var(--spacing-2);">
                  Warning
                </h5>
                <p style="color: #fef9c3;">Perfect contrast maintained</p>
              </div>

              <div
                class="demo-inversion-box"
                style="background-color: #be185d; padding: var(--spacing-5); border-radius: var(--radius-md); text-align: center;"
              >
                <pds-icon
                  icon="heart"
                  size="xl"
                  style="color: white;"
                ></pds-icon>
                <h5 style="color: white; margin-top: var(--spacing-2);">
                  Accent
                </h5>
                <p style="color: #fce7f3;">Automatic adjustment</p>
              </div>
            </div>
          </section>

          <!-- Grid Utilities Section -->
          <section class="showcase-section" data-section="grid-utilities">
            <h2>
              <pds-icon
                icon="squares-four"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Grid Utilities
            </h2>
            <p>
              Modern, config-driven grid system with auto-fit responsive
              layouts. All utilities are generated from
              <code>layout.gridSystem</code> configuration.
            </p>

            <h3>Fixed Column Grids</h3>
            <p>
              Use <code>.grid-cols-{n}</code> classes for fixed column layouts:
            </p>

            <div
              class="grid grid-cols-2 gap-md"
              style="margin-bottom: var(--spacing-4);"
            >
              <div class="card">
                <pds-icon
                  icon="square"
                  size="lg"
                  class="icon-primary"
                ></pds-icon>
                <h4>Grid Column 1</h4>
                <p>Two column layout</p>
              </div>
              <div class="card">
                <pds-icon
                  icon="square"
                  size="lg"
                  class="icon-secondary"
                ></pds-icon>
                <h4>Grid Column 2</h4>
                <p>Equal width columns</p>
              </div>
            </div>

            <div
              class="grid grid-cols-3 gap-sm"
              style="margin-bottom: var(--spacing-4);"
            >
              <div class="card">
                <pds-icon
                  icon="circle"
                  size="md"
                  class="icon-success"
                ></pds-icon>
                <p>Column 1</p>
              </div>
              <div class="card">
                <pds-icon
                  icon="circle"
                  size="md"
                  class="icon-warning"
                ></pds-icon>
                <p>Column 2</p>
              </div>
              <div class="card">
                <pds-icon icon="circle" size="md" class="icon-error"></pds-icon>
                <p>Column 3</p>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-xs">
              <div class="card"><p>1</p></div>
              <div class="card"><p>2</p></div>
              <div class="card"><p>3</p></div>
              <div class="card"><p>4</p></div>
            </div>

            <h3>Auto-Fit Responsive Grids</h3>
            <p>
              Use <code>.grid-auto-{size}</code> for responsive layouts that
              automatically adjust columns based on available space:
            </p>

            <h4><code>.grid-auto-sm</code> (min 150px)</h4>
            <div
              class="grid grid-auto-sm gap-md"
              style="margin-bottom: var(--spacing-4);"
            >
              <div class="card">
                <pds-icon icon="desktop" size="lg" class="icon-info"></pds-icon>
                <h5>Responsive</h5>
                <p>Automatically wraps</p>
              </div>
              <div class="card">
                <pds-icon
                  icon="device-mobile"
                  size="lg"
                  class="icon-info"
                ></pds-icon>
                <h5>Adaptive</h5>
                <p>Based on space</p>
              </div>
              <div class="card">
                <pds-icon icon="globe" size="lg" class="icon-info"></pds-icon>
                <h5>Flexible</h5>
                <p>Resize the window</p>
              </div>
              <div class="card">
                <pds-icon icon="feather" size="lg" class="icon-info"></pds-icon>
                <h5>Dynamic</h5>
                <p>No breakpoints needed</p>
              </div>
            </div>

            <h4><code>.grid-auto-md</code> (min 250px)</h4>
            <div
              class="grid grid-auto-md gap-lg"
              style="margin-bottom: var(--spacing-4);"
            >
              <div class="card surface-elevated">
                <pds-icon
                  icon="rocket"
                  size="xl"
                  class="icon-accent"
                ></pds-icon>
                <h5>Card 1</h5>
                <p>Larger minimum width means fewer columns on small screens</p>
              </div>
              <div class="card surface-elevated">
                <pds-icon
                  icon="palette"
                  size="xl"
                  class="icon-accent"
                ></pds-icon>
                <h5>Card 2</h5>
                <p>Smart surface tokens apply automatically</p>
              </div>
              <div class="card surface-elevated">
                <pds-icon icon="heart" size="xl" class="icon-accent"></pds-icon>
                <h5>Card 3</h5>
                <p>Consistent spacing with gap utilities</p>
              </div>
            </div>

            <h3>Gap Utilities</h3>
            <p>
              Control spacing between grid items with
              <code>.gap-{size}</code> classes:
            </p>

            <div
              style="display: grid; gap: var(--spacing-4); grid-template-columns: 1fr 1fr;"
            >
              <div>
                <p><strong>.gap-xs</strong> (spacing-1)</p>
                <div class="grid grid-cols-3 gap-xs">
                  <div class="card"><p>A</p></div>
                  <div class="card"><p>B</p></div>
                  <div class="card"><p>C</p></div>
                </div>
              </div>

              <div>
                <p><strong>.gap-sm</strong> (spacing-2)</p>
                <div class="grid grid-cols-3 gap-sm">
                  <div class="card"><p>A</p></div>
                  <div class="card"><p>B</p></div>
                  <div class="card"><p>C</p></div>
                </div>
              </div>

              <div>
                <p><strong>.gap-md</strong> (spacing-4)</p>
                <div class="grid grid-cols-3 gap-md">
                  <div class="card"><p>A</p></div>
                  <div class="card"><p>B</p></div>
                  <div class="card"><p>C</p></div>
                </div>
              </div>

              <div>
                <p><strong>.gap-lg</strong> (spacing-6)</p>
                <div class="grid grid-cols-3 gap-lg">
                  <div class="card"><p>A</p></div>
                  <div class="card"><p>B</p></div>
                  <div class="card"><p>C</p></div>
                </div>
              </div>
            </div>

            <h3>Code Inspector Support</h3>
            <p class="interactive-demo">
              <pds-icon
                icon="cursor-click"
                size="sm"
                class="icon-primary"
              ></pds-icon>
              Enable the <strong>Code Inspector</strong> and click on any grid
              container above. The ontology now recognizes layout patterns like
              <code>grid</code>, <code>grid-cols</code>, and
              <code>grid-auto</code> for intelligent component detection.
            </p>
          </section>

          <!-- Mesh Gradients Section -->
          <section class="showcase-section" data-section="mesh-gradients">
            <h2>
              <pds-icon
                icon="palette"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Mesh Gradients
            </h2>
            <p>
              Subtle, beautiful mesh gradient backgrounds generated from your
              color palette. Using <code>--background-mesh-01</code> through
              <code>--background-mesh-05</code> custom properties. Automatically
              adapts to light and dark modes.
            </p>

            <div
              class="grid grid-cols-2 gap-lg"
              style="margin-bottom: var(--spacing-6);"
            >
              <div
                style="position: relative; background: var(--background-mesh-01); padding: var(--spacing-6); border-radius: var(--radius-lg); min-height: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border);"
              >
                <button
                  class="btn-primary btn-xs"
                  style="position: absolute; top: var(--spacing-2); right: var(--spacing-2);"
                  @pointerdown=${() => this.previewMesh("01")}
                  @pointerup=${this.clearMeshPreview}
                  @pointerleave=${this.clearMeshPreview}
                  title="Press and hold to preview on page background"
                >
                  <pds-icon icon="eye" size="sm"></pds-icon>
                  Preview
                </button>
                <div
                  style="background: var(--color-surface-base); padding: var(--spacing-4); border-radius: var(--radius-md); box-shadow: var(--shadow-md);"
                >
                  <h4 style="margin: 0;">Mesh 01</h4>
                  <p style="margin: var(--spacing-2) 0 0 0; opacity: 0.7;">
                    Subtle radial blend
                  </p>
                </div>
              </div>
              <div
                style="position: relative; background: var(--background-mesh-02); padding: var(--spacing-6); border-radius: var(--radius-lg); min-height: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border);"
              >
                <button
                  class="btn-primary btn-xs"
                  style="position: absolute; top: var(--spacing-2); right: var(--spacing-2);"
                  @pointerdown=${() => this.previewMesh("02")}
                  @pointerup=${this.clearMeshPreview}
                  @pointerleave=${this.clearMeshPreview}
                  title="Press and hold to preview on page background"
                >
                  <pds-icon icon="eye" size="sm"></pds-icon>
                  Preview
                </button>
                <div
                  style="background: var(--color-surface-base); padding: var(--spacing-4); border-radius: var(--radius-md); box-shadow: var(--shadow-md);"
                >
                  <h4 style="margin: 0;">Mesh 02</h4>
                  <p style="margin: var(--spacing-2) 0 0 0; opacity: 0.7;">
                    Corner accents
                  </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-md">
              <div
                style="position: relative; background: var(--background-mesh-03); padding: var(--spacing-5); border-radius: var(--radius-md); min-height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--color-border);"
              >
                <button
                  class="btn-primary btn-xs"
                  style="position: absolute; top: var(--spacing-2); right: var(--spacing-2);"
                  @pointerdown=${() => this.previewMesh("03")}
                  @pointerup=${this.clearMeshPreview}
                  @pointerleave=${this.clearMeshPreview}
                  title="Press and hold to preview on page background"
                >
                  <pds-icon icon="eye" size="sm"></pds-icon>
                </button>
                <pds-icon
                  icon="sparkle"
                  size="xl"
                  style="opacity: 0.9; margin-bottom: var(--spacing-2);"
                ></pds-icon>
                <code style="font-size: 0.75rem;">mesh-03</code>
              </div>
              <div
                style="position: relative; background: var(--background-mesh-04); padding: var(--spacing-5); border-radius: var(--radius-md); min-height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--color-border);"
              >
                <button
                  class="btn-primary btn-xs"
                  style="position: absolute; top: var(--spacing-2); right: var(--spacing-2);"
                  @pointerdown=${() => this.previewMesh("04")}
                  @pointerup=${this.clearMeshPreview}
                  @pointerleave=${this.clearMeshPreview}
                  title="Press and hold to preview on page background"
                >
                  <pds-icon icon="eye" size="sm"></pds-icon>
                </button>
                <pds-icon
                  icon="sparkle"
                  size="xl"
                  style="opacity: 0.9; margin-bottom: var(--spacing-2);"
                ></pds-icon>
                <code style="font-size: 0.75rem;">mesh-04</code>
              </div>
              <div
                style="position: relative; background: var(--background-mesh-05); padding: var(--spacing-5); border-radius: var(--radius-md); min-height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--color-border);"
              >
                <button
                  class="btn-primary btn-xs"
                  style="position: absolute; top: var(--spacing-2); right: var(--spacing-2);"
                  @pointerdown=${() => this.previewMesh("05")}
                  @pointerup=${this.clearMeshPreview}
                  @pointerleave=${this.clearMeshPreview}
                  title="Press and hold to preview on page background"
                >
                  <pds-icon icon="eye" size="sm"></pds-icon>
                </button>
                <pds-icon
                  icon="sparkle"
                  size="xl"
                  style="opacity: 0.9; margin-bottom: var(--spacing-2);"
                ></pds-icon>
                <code style="font-size: 0.75rem;">mesh-05</code>
              </div>
            </div>

            <h3>Usage</h3>
            <pre
              class="code-block"
              style="margin-top: var(--spacing-4);"
            ><code class="language-css">/* Apply as background */
.hero-section {
  background: var(--background-mesh-01);
}

/* Combine with surface colors */
.card {
  background: var(--background-mesh-03);
  backdrop-filter: blur(10px);
}

/* Layer over solid colors */
.container {
  background-color: var(--color-surface-base);
  background-image: var(--background-mesh-02);
}</code></pre>

            <p class="interactive-demo" style="margin-top: var(--spacing-4);">
              <pds-icon
                icon="moon-stars"
                size="sm"
                class="icon-primary"
              ></pds-icon>
              Toggle between light and dark modes to see how mesh gradients
              automatically adapt with reduced opacity in dark mode for subtle,
              non-interfering backgrounds.
            </p>
          </section>

          <!-- Interactive States Section -->
          <section
            class="showcase-section alt-bg"
            data-section="interactive-states"
          >
            <h2>
              <pds-icon
                icon="cursor-click"
                size="lg"
                class="icon-primary"
              ></pds-icon>
              Interactive States
            </h2>

            <h3>Focus States</h3>
            <p class="interactive-demo">
              Press Tab to navigate and see focus rings on interactive elements:
            </p>
            <div class="flex-wrap">
              <button class="btn-primary">Button 1</button>
              <button class="btn-secondary">Button 2</button>
              <input type="text" placeholder="Focus me" />
              <select>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <a href="#">Link</a>
            </div>

            <h3>Transition Speeds</h3>
            <p class="interactive-demo">
              Current setting:
              <strong
                >${this.config?.behavior?.transitionSpeed || "normal"}</strong
              >
              <br />
              Click the button to see the transition in action:
            </p>

            <div class="transition-speed-demo">
              <button
                class="btn-primary"
                @click="${this.triggerTransitionDemo}"
              >
                <pds-icon icon="play" size="sm"></pds-icon>
                Animate Transition
              </button>

              <div class="transition-demo-stage">
                <div class="transition-demo-ball" id="transition-ball">
                  <pds-icon icon="cursor-click" size="lg"></pds-icon>
                </div>
              </div>
            </div>

            <p class="interactive-demo" style="margin-top: var(--spacing-4);">
              Change the <em>Transition Speed</em> setting in the designer panel
              to see how it affects the animation.
            </p>
          </section>

          <!-- Toast Notifications Section -->
          ${components.toasts
            ? html`
                <section class="showcase-section">
                  <h2>
                    <pds-icon
                      icon="bell-ringing"
                      size="lg"
                      class="icon-primary"
                    ></pds-icon>
                    Toast Notifications
                  </h2>

                  <p class="toast-demo-description">
                    Toast notifications appear in the top-right corner and
                    auto-dismiss after a few seconds. Click the buttons below to
                    see them in action:
                  </p>

                  <div class="flex flex-wrap gap-md">
                    <button
                      class="btn-primary btn-sm"
                      @click="${this.showSuccessToast}"
                    >
                      <pds-icon icon="check-circle" size="sm"></pds-icon>
                      Success
                    </button>
                    <button
                      class="btn-secondary btn-sm"
                      @click="${this.showInfoToast}"
                    >
                      <pds-icon icon="info" size="sm"></pds-icon>
                      Info
                    </button>
                    <button
                      class="btn-warning btn-sm"
                      @click="${this.showWarningToast}"
                    >
                      <pds-icon icon="warning" size="sm"></pds-icon>
                      Warning
                    </button>
                    <button
                      class="btn-danger btn-sm"
                      @click="${this.showErrorToast}"
                    >
                      <pds-icon icon="x-circle" size="sm"></pds-icon>
                      Error
                    </button>
                    <button
                      class="btn-outline btn-sm"
                      @click="${this.showLongToast}"
                    >
                      <pds-icon icon="clock" size="sm"></pds-icon>
                      Long
                    </button>
                    <button
                      class="btn-outline btn-sm"
                      @click="${this.showPersistentToast}"
                    >
                      <pds-icon icon="bell" size="sm"></pds-icon>
                      Persistent
                    </button>
                  </div>
                </section>
              `
            : this.renderDisabledSection(
                "Toast Notifications",
                "Toast notifications are disabled. Enable in the designer panel."
              )}
          ${this.config?.components?.tabStrip
            ? html`
                <!-- Tab Strip Section -->
                <section class="showcase-section alt-bg" data-section="tabs">
                  <h2>
                    <pds-icon icon="tabs"></pds-icon>
                    Tab Strip
                  </h2>
                  <p>
                    Accessible tab navigation with hash-based routing and
                    keyboard support.
                  </p>

                  <div style="margin-top: var(--spacing-6);">
                    <pds-tabstrip label="Example Tabs">
                      <pds-tabpanel id="overview" label="Overview">
                        <h3>Overview</h3>
                        <p>
                          This is the overview tab. Tab strips provide organized
                          navigation between related content.
                        </p>
                      </pds-tabpanel>

                      <pds-tabpanel id="features" label="Features">
                        <h3>Features</h3>
                        <p>
                          Tab strips are built with modern web components and
                          include:
                        </p>
                        <ul>
                          <li>
                            <strong>Deep linking:</strong> Each tab has a unique
                            URL hash
                          </li>
                          <li>
                            <strong>Progressive enhancement:</strong> Works
                            without JavaScript
                          </li>
                          <li>
                            <strong>Responsive:</strong> Adapts to mobile and
                            desktop
                          </li>
                          <li>
                            <strong>Customizable:</strong> Style with CSS
                            variables
                          </li>
                        </ul>
                      </pds-tabpanel>

                      <pds-tabpanel id="usage" label="Usage">
                        <h3>Usage</h3>
                        <p>Simple markup example:</p>
                        <pre><code>&lt;pds-tabstrip label="My Tabs"&gt;
  &lt;pds-tabpanel id="tab1" label="First Tab"&gt;
    Content for first tab
  &lt;/pds-tabpanel&gt;
  &lt;pds-tabpanel id="tab2" label="Second Tab"&gt;
    Content for second tab
  &lt;/pds-tabpanel&gt;
&lt;/pds-tabstrip&gt;</code></pre>
                      </pds-tabpanel>

                      <pds-tabpanel id="accessibility" label="Accessibility">
                        <h3>Accessibility</h3>
                        <p>Built with accessibility in mind:</p>
                        <ul>
                          <li><code>aria-label</code> on navigation</li>
                          <li><code>aria-current</code> on active tab</li>
                          <li>
                            <code>aria-controls</code> linking tabs to panels
                          </li>
                          <li><code>role="region"</code> on tab panels</li>
                          <li>Keyboard navigation with arrow keys</li>
                          <li>Focus management</li>
                        </ul>
                      </pds-tabpanel>
                    </pds-tabstrip>
                  </div>
                </section>
              `
            : ""}
          ${components.drawer
            ? html`
                <!-- Drawer Section -->
                <section class="showcase-section">
                  <h2>
                    <pds-icon
                      icon="squares-four"
                      size="lg"
                      class="icon-primary"
                    ></pds-icon>
                    Drawer Example
                  </h2>
                  <p>Open the global drawer from different sides:</p>
                  <div
                    class="btn-group"
                    style="gap: var(--spacing-3); flex-wrap: wrap;"
                  >
                    <button class="btn-primary" @click=${this.openDrawer}>
                      <pds-icon icon="sidebar" size="sm"></pds-icon>
                      Bottom Drawer
                    </button>
                    <button class="btn-secondary" @click=${this.openDrawerLeft}>
                      <pds-icon icon="sidebar" size="sm"></pds-icon>
                      Left Drawer
                    </button>
                    <button
                      class="btn-secondary"
                      @click=${this.openDrawerRight}
                    >
                      <pds-icon icon="sidebar" size="sm"></pds-icon>
                      Right Drawer
                    </button>
                  </div>
                </section>
              `
            : ""}
        </div>
      `;
    }

    renderDrawerContent() {
      return html`
        <figure class="media-figure">
          <img
            class="media-image"
            src="https://picsum.photos/800/600?random=1"
            alt="Random landscape"
          />
          <figcaption class="media-caption">
            <strong>Figure 1:</strong> A beautiful landscape demonstrating image
            handling in the design system.
          </figcaption>
        </figure>
      `;
    }

    async showDoc(doc) {
      const url = `/pds/${doc}`;
      try {
        const res = await fetch(url, { cache: "no-store" });
        const text = await res.text();

        // If server returned HTML (SPA fallback), show an error message
        const trimmed = text.trim();
        let htmlContent;
        if (trimmed.startsWith("<")) {
          htmlContent = `<div class="docs-error">Failed to load README at ${url}. Ensure readme.md exists under public/</div>`;
        } else {
          try {
            const conv = new showdown.Converter();
            htmlContent = conv.makeHtml(trimmed);
          } catch (err) {
            htmlContent = `<pre>${this._escapeHtml(trimmed)}</pre>`;
          }
        }

        const drawer = document.getElementById("global-drawer");
        drawer.show(html`${unsafeHTML(htmlContent)}`, {
          header: html`<h3>PDS Documentation</h3>`,
        });
      
      } catch (err) {
        console.error("Error fetching README:", err);
        const toaster = document.getElementById("global-toaster");
        toaster.toast("Error loading docs. See console.", { type: "danger" });
      }
    }

    openDrawer() {
      const drawer = document.getElementById("global-drawer");

      drawer.show(
        html`
          <figure class="media-figure">
            <img
              class="media-image"
              src="https://picsum.photos/800/600?random=1"
              alt="Random landscape"
            />
            <figcaption class="media-caption">
              <strong>Figure 1:</strong> A beautiful landscape demonstrating
              image handling in the design system.
            </figcaption>
          </figure>
        `,
        {
          header: html`<h3>Example Drawer</h3>`,
          minHeight: "300px",
          position: "bottom",
        }
      );
    }

    openDrawerLeft() {
      const drawer = document.getElementById("global-drawer");
      if (drawer) {
        drawer.show(this.renderDrawerContent(), {
          header: html`<h3>Example Drawer (Left)</h3>`,
          position: "left",
        });
      }
    }

    openDrawerRight() {
      const drawer = document.getElementById("global-drawer");
      if (drawer) {
        drawer.show(this.renderDrawerContent(), {
          header: html`<h3>Example Drawer (Right)</h3>`,
          position: "right",
        });
      }
    }

    // Mesh gradient preview methods
    previewMesh(meshNumber) {
      const originalBg = document.body.style.backgroundImage;
      this._originalBodyBg = originalBg;
      document.body.style.backgroundImage = `var(--background-mesh-${meshNumber})`;

      // Dim all content to make the mesh background more visible
      const mainContent = document.querySelector("pds-demo");
      if (mainContent && !this._originalOpacity) {
        this._originalOpacity = mainContent.style.opacity;
        mainContent.style.transition = "opacity 200ms ease-out";
        mainContent.style.opacity = "0.1";
      }
    }

    clearMeshPreview() {
      if (this._originalBodyBg !== undefined) {
        document.body.style.backgroundImage = this._originalBodyBg;
        this._originalBodyBg = undefined;
      }

      // Restore content opacity
      const mainContent = document.querySelector("pds-demo");
      if (mainContent && this._originalOpacity !== undefined) {
        mainContent.style.opacity = this._originalOpacity || "1";
        this._originalOpacity = undefined;
        // Remove transition after animation completes
        setTimeout(() => {
          if (mainContent.style.opacity !== "0.1") {
            mainContent.style.transition = "";
          }
        }, 200);
      }
    }

    // Toast handler methods
    showSuccessToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast("Your changes have been saved successfully!", {
          type: "success",
        });
      }
    }

    showInfoToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast("This is an informational message with helpful context.", {
          type: "info",
        });
      }
    }

    showWarningToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast("Warning: This action cannot be undone!", {
          type: "warning",
        });
      }
    }

    showErrorToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast("Error: Something went wrong. Please try again.", {
          type: "error",
        });
      }
    }

    showLongToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast(
          "This is a longer toast notification message that demonstrates how the duration is automatically calculated based on the message length. The toast will stay visible longer to give you enough time to read the entire message.",
          { type: "info" }
        );
      }
    }

    showPersistentToast() {
      const app = document.querySelector("pure-app");
      if (app?.toast) {
        toast(
          "This is a persistent toast that won't auto-dismiss. Click the × to close it.",
          {
            type: "info",
            persistent: true,
          }
        );
      }
    }

    triggerTransitionDemo() {
      const ball = this.querySelector("#transition-ball");
      if (!ball) return;

      // Remove the animated class to reset
      ball.classList.remove("animated");

      // Force a reflow to restart the animation
      void ball.offsetWidth;

      // Add the animated class to trigger the transition
      ball.classList.add("animated");

      // Reset after animation completes (using slow transition as max)
      setTimeout(() => {
        ball.classList.remove("animated");
      }, 1000);
    }

    renderColorCard(name, color) {
      return html`
        <div class="color-card">
          <div
            class="color-card-header"
            style="background-color: var(--color-${color}-600);"
          >
            ${name}
          </div>
          <div class="color-card-body">
            <div class="color-scale-grid">
              ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map(
                (shade) => html`
                  <div
                    class="color-scale-swatch"
                    style="background-color: var(--color-${color}-${shade});"
                    title="${color}-${shade}"
                  ></div>
                `
              )}
            </div>
            <p class="color-card-footer">9-step scale from 50 to 800</p>
          </div>
        </div>
      `;
    }

    renderColorScale(colorName) {
      return html`
        <div class="color-scale-container">
          <div class="color-scale-row">
            <div class="color-scale-label">${colorName}</div>
            <div class="color-scale-swatches">
              ${[50, 100, 200, 300, 400, 500, 600, 700, 800].map((shade) => {
                const textColor =
                  shade >= 400 ? "white" : `var(--color-${colorName}-900)`;
                return html`
                  <div
                    class="color-scale-swatch-interactive"
                    style="
                    background: var(--color-${colorName}-${shade});
                    color: ${textColor};
                  "
                    @mouseover="${(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.zIndex = "10";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}"
                    @mouseout="${(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.zIndex = "1";
                      e.currentTarget.style.boxShadow = "none";
                    }}"
                    title="${colorName}-${shade}"
                  >
                    ${shade}
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      `;
    }
  }
);
