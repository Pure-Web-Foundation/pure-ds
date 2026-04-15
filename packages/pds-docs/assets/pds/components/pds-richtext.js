import { PDS } from "#pds";

/**
 * Slack-style rich text field with a semantic output pipeline.
 *
 * @element pds-richtext
 * @formAssociated
 *
 * @attr {string} name - Form field name included with submitted form data
 * @attr {string} placeholder - Placeholder copy displayed when the editor is empty
 * @attr {boolean} disabled - Disables editing, selection, and toolbar interactions
 * @attr {boolean} required - Marks the field as required for native form validation
 * @attr {boolean} submit-on-enter - When present, pressing Enter submits the host form (Shift+Enter inserts a newline)
 * @attr {boolean} spellcheck - Enables native spellcheck inside the editor (default: true)
 * @attr {boolean} toolbar - Toggles the formatting toolbar UI (default: true)
 * @attr {"html"|"markdown"} format - Output format for `value`; Markdown uses Showdown for sanitised HTML
 * @attr {string} value - Initial editor value; kept in sync with the `value` property
 *
 * @property {string} name - Reflective form control name
 * @property {string} placeholder - Placeholder text for the editor surface
 * @property {boolean} disabled - Reflects the disabled state on the host element
 * @property {boolean} required - Mirrors native required semantics
 * @property {boolean} submitOnEnter - Controls form submission when the user presses Enter
 * @property {boolean} spellcheck - Enables or disables native spell checking
 * @property {boolean} toolbar - Shows or hides the inline formatting toolbar
 * @property {"html"|"markdown"} format - Determines whether the element emits HTML or Markdown
 * @property {string} value - Serialised editor contents as HTML (default) or Markdown
 *
 * @fires input - Fired whenever the editor value syncs from user input
 *
 * @example
 * <form onsubmit="event.preventDefault(); console.log(new FormData(this).get('message'))">
 *   <pds-richtext name="message" placeholder="Message Steve" submit-on-enter></pds-richtext>
 *   <button type="submit">Send</button>
 * </form>
 */

// Refactored: remove Lit dependency, implement as plain HTMLElement with Shadow DOM
// - Adopts PDS layers (primitives, components) for styling tokens
// - Replaces hardcoded colors with semantic CSS variables
// - Preserves form-associated behavior and public API
// - Toolbar & editor logic retained; uses minimal template string assembly
4;
export class RichText extends HTMLElement {
  #internals;
  #editorDiv;
  #converter;
  #loadingShowdown = false;
  #loadedShowdown = false;
  #isSyncingFromEditor = false;
  #isReflectingValue = false;
  #displayValue = "";
  #showdownPromise = null;
  #warnedMarkdownFallback = false;

  static formAssociated = true;

  static get observedAttributes() {
    return [
      "name",
      "placeholder",
      "disabled",
      "required",
      "submit-on-enter",
      "spellcheck",
      "toolbar",
      "value",
      "format",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
    this._submitOnEnter = false;
    this._toolbar = true;
    this._spellcheck = true;
    this._value = ""; // form submission value (HTML or Markdown)
    this._placeholder = "";
    this._disabled = false;
    this._required = false;
    this._format = "html";
    this.#displayValue = "";
  }

  // Property accessors (reflective where needed)

  /**
   * Current form field name used when serialising via `FormData`.
   * @returns {string}
   */
  get name() {
    return this.getAttribute("name") || "";
  }
  /**
   * Update the form field name.
   * @param {string|null} v
   */
  set name(v) {
    if (v == null) this.removeAttribute("name");
    else this.setAttribute("name", v);
  }
  /**
   * Placeholder text shown while the editor is empty.
   * @returns {string}
   */
  get placeholder() {
    return this._placeholder;
  }
  /**
   * Set the placeholder text.
   * @param {string|null} v
   */
  set placeholder(v) {
    this._placeholder = v ?? "";
    if (this.#editorDiv)
      this.#editorDiv.setAttribute("data-ph", this._placeholder);
  }
  /**
   * Indicates whether user input is enabled.
   * @returns {boolean}
   */
  get disabled() {
    return this._disabled;
  }
  /**
   * Enable or disable user input.
   * @param {boolean} v
   */
  set disabled(v) {
    const b = !!v;
    this._disabled = b;
    this.toggleAttribute("disabled", b);
    if (this.#editorDiv)
      this.#editorDiv.setAttribute("contenteditable", String(!b));
  }
  /**
   * Whether the control participates in required form validation.
   * @returns {boolean}
   */
  get required() {
    return this._required;
  }
  /**
   * Toggle required validation.
   * @param {boolean} v
   */
  set required(v) {
    const b = !!v;
    this._required = b;
    this.toggleAttribute("required", b);
  }
  /**
   * Submit-on-enter behaviour flag.
   * @returns {boolean}
   */
  get submitOnEnter() {
    return this._submitOnEnter;
  }
  /**
   * Enable or disable submit-on-enter behaviour.
   * @param {boolean} v
   */
  set submitOnEnter(v) {
    const b = !!v;
    this._submitOnEnter = b;
    this.toggleAttribute("submit-on-enter", b);
  }
  /**
   * Indicates if native spell checking is active.
   * @returns {boolean}
   */
  get spellcheck() {
    return this._spellcheck;
  }
  /**
   * Toggle native spell checking support.
   * @param {boolean} v
   */
  set spellcheck(v) {
    const b = !!v;
    this._spellcheck = b;
    this.toggleAttribute("spellcheck", b);
    if (this.#editorDiv) this.#editorDiv.setAttribute("spellcheck", String(b));
  }
  /**
   * Whether the formatting toolbar is rendered.
   * @returns {boolean}
   */
  get toolbar() {
    return this._toolbar;
  }
  /**
   * Show or hide the formatting toolbar.
   * @param {boolean} v
   */
  set toolbar(v) {
    const b = !!v;
    this._toolbar = b;
    this.toggleAttribute("toolbar", b);
    this.#render();
  }
  /**
   * Current output format for the value (HTML or Markdown).
   * @returns {"html"|"markdown"}
   */
  get format() {
    return this._format;
  }
  /**
   * Change the output format for future values.
   * @param {string|null} v
   */
  set format(v) {
    const next =
      (v ?? "").toString().toLowerCase() === "markdown" ? "markdown" : "html";
    if (next === "html") {
      if (this.hasAttribute("format")) this.removeAttribute("format");
    } else if (this.getAttribute("format") !== "markdown") {
      this.setAttribute("format", "markdown");
    }
  }
  /**
   * Serialised editor contents respecting the configured `format`.
   * @returns {string}
   */
  get value() {
    return this._value;
  }
  /**
   * Update the editor value programmatically.
   * @param {string|null} v
   */
  set value(v) {
    const next = v ?? "";
    if (next === this._value) {
      this.#reflectValueAttribute(this._value);
      if (!this.#isSyncingFromEditor) {
        this.#updateEditorFromValue({ reflect: false, updateForm: false });
      }
      return;
    }
    this._value = next;
    if (this.#isSyncingFromEditor) {
      this.#reflectValueAttribute(this._value);
      return;
    }
    this.#updateEditorFromValue();
  }

  /**
   * Reflect attribute mutations into the corresponding property state.
   * @param {string} name
   * @param {string|null} oldV
   * @param {string|null} newV
   */
  attributeChangedCallback(name, oldV, newV) {
    if (oldV === newV) return;
    switch (name) {
      case "placeholder":
        this.placeholder = newV || "";
        break;
      case "disabled":
        this.disabled = this.hasAttribute("disabled");
        break;
      case "required":
        this.required = this.hasAttribute("required");
        break;
      case "submit-on-enter":
        this.submitOnEnter = this.hasAttribute("submit-on-enter");
        break;
      case "spellcheck":
        this.spellcheck = this.hasAttribute("spellcheck");
        break;
      case "toolbar":
        this.toolbar = this.hasAttribute("toolbar");
        break;
      case "value":
        if (this.#isReflectingValue) break;
        this._value = newV || "";
        if (!this.#isSyncingFromEditor) this.#updateEditorFromValue();
        break;
      case "format":
        this.#applyFormat(newV);
        break;
    }
  }

  #applyFormat(value) {
    const next =
      (value ?? "").toString().toLowerCase() === "markdown"
        ? "markdown"
        : "html";
    if (next === this._format) return;
    this._format = next;
    const refresh = () => this.#updateEditorFromValue({
      reflect: true,
      updateForm: true,
      forceDisplayRefresh: true,
    });
    if (next === "markdown") {
      this.#ensureShowdown().then(refresh);
    } else {
      refresh();
    }
  }

  /**
   * Reference to the associated HTMLFormElement, when applicable.
   * @returns {HTMLFormElement|null}
   */
  get form() {
    return this.#internals.form;
  }
  /**
   * Run native form validation against the control.
   * @returns {boolean}
   */
  checkValidity() {
    return this.#internals.checkValidity();
  }
  /**
   * Report validity using the browser's built-in UI.
   * @returns {boolean}
   */
  reportValidity() {
    return this.#internals.reportValidity();
  }

  /**
   * Attach DOM, adopted styles, and hydrate the initial value on connect.
   * @returns {Promise<void>}
   */
  async connectedCallback() {
    this.#render();
    await this.#adoptStyles();
    if (this._format === "markdown") await this.#ensureShowdown();
    else this.#ensureShowdown();
    this.#updateEditorFromValue({ reflect: true, updateForm: true, forceDisplayRefresh: true });
  }

  async #adoptStyles() {
    // Component stylesheet (tokens + semantic vars)
    const componentStyles = PDS.createStylesheet(/*css*/ `@layer richtext {
      :host {
        display: block;
        color: var(--rt-fg, var(--color-text-primary));
        font-family: var(--rt-font-family, var(--font-family-body));
        font-size: var(--rt-font-size, var(--font-size-base));
        line-height: var(--rt-line-height, var(--font-line-height-normal));
      }
      :host([disabled]) { opacity: .6; pointer-events: none; }
      .box { border: 1px solid var(--rt-border, var(--color-border, currentColor)); border-radius: var(--radius-md,8px); background: var(--rt-bg, var(--color-input-bg)); }
      .box:focus-within { 
        border-color: var(--rt-border-focus, var(--color-primary-500, var(--color-primary))); box-shadow: 0 0 0 3px var(--rt-focus-ring, var(--color-focus-ring, color-mix(in oklab, var(--color-primary) 20%, CanvasText 80%))); 
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);

        .ed {
            background-color: var(--color-surface-base);
        }
      }
      
      .toolbar { background-color: var(--surface-subtle-bg); display: flex; gap: var(--spacing-0, 2px); align-items: center; padding: var(--spacing-0, 2px); border-bottom: 1px solid var(--rt-border, var(--color-border-muted)); border-radius: var(--radius-md,8px) var(--radius-md,8px) 0 0; width: 100%; max-width: 100%; flex-wrap: nowrap; box-sizing: border-box; overflow: hidden; }
      .tbtn { transition: none; display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius: var(--radius-sm,6px); cursor:pointer; user-select:none; color: inherit; background: transparent; border:none;

        padding: var(--spacing-0) var(--spacing-6, 8px);

       }
      .tbtn:hover { background: var(--color-surface-hover, color-mix(in oklab, CanvasText 12%, transparent)); }
      .edwrap { position:relative; }
      .ed { display: block; font-weight: normal; min-height:90px; max-height: 400px; overflow:auto; padding: var(--spacing-1, 0) var(--spacing-2, 0); outline:none; word-break:break-word; border-radius: 0 0 var(--radius-md,8px) var(--radius-md,8px); background: var(--rt-editor-bg, var(--color-input-bg)); }
      .ed[contenteditable="true"]:empty::before { content: attr(data-ph); color: var(--rt-muted, var(--color-text-muted)); pointer-events:none; }
      .send { margin-left:auto; display:inline-flex; gap: var(--spacing-2,8px); align-items:center; }
      button.icon { background:transparent; border:0; color:inherit; cursor:pointer; padding:6px; border-radius: var(--radius-sm,6px); }
      button.icon:hover { background: var(--rt-hover-bg, color-mix(in oklab, CanvasText 12%, transparent)); }
    }`);
    try {
      await PDS.adoptLayers(
        this.shadowRoot,
        ["primitives", "components"],
        [componentStyles]
      );
    } catch (e) {
      console.warn("richtext: adoptLayers failed", e);
    }
  }

  async #ensureShowdown() {
    if (this.#loadedShowdown) return true;
    if (this.#showdownPromise) return this.#showdownPromise;

    this.#loadingShowdown = true;
    this.#showdownPromise = (async () => {
      try {
        let showdownExports = await this.#importShowdownFromMap();

        if (!showdownExports) {
          await this.#loadShowdownFromCdn();
          showdownExports = window.showdown;
        }

        const showdownApi = this.#resolveShowdownExports(showdownExports);
        if (!showdownApi) {
          throw new Error("Showdown exports missing Converter");
        }

        this.#applyShowdownConverter(showdownApi);
        this.#loadedShowdown = true;
        this.#warnedMarkdownFallback = false;
      } catch (e) {
        console.warn(
          "Showdown failed to load; cleaning will still happen via local sanitizer.",
          e
        );
        this.#loadedShowdown = false;
      } finally {
        this.#loadingShowdown = false;
        if (!this.#loadedShowdown) this.#showdownPromise = null;
      }
      return this.#loadedShowdown;
    })();

    return this.#showdownPromise;
  }

  async #importShowdownFromMap() {
    try {
      const mod = await import("#showdown");
      return mod;
    } catch (err) {
      return null;
    }
  }

  async #loadShowdownFromCdn() {
    if ("showdown" in window) return;
    try {
      await this.#loadScript(
        "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"
      );
    } catch {
      await this.#loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js"
      );
    }
  }

  #resolveShowdownExports(exports) {
    const candidates = [
      exports,
      exports && exports.default,
      exports && exports.showdown,
      exports && exports.default && exports.default.showdown,
    ];
    for (const candidate of candidates) {
      if (candidate && typeof candidate.Converter === "function") {
        return candidate;
      }
    }
    if (exports && typeof exports.Converter === "function") return exports;
    return null;
  }

  #applyShowdownConverter(api) {
    if (!api || typeof api.Converter !== "function") {
      throw new Error("Invalid Showdown API");
    }
    if (!window.showdown) {
      window.showdown = api;
    }
    // @ts-ignore
    this.#converter = new api.Converter({
      simplifiedAutoLink: true,
      openLinksInNewWindow: true,
      strikethrough: true,
      emoji: false,
      ghMentions: false,
      tables: false,
    });
  }

  // Load a classic script tag; resolves on load, rejects on error
  #loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.head.appendChild(s);
    });
  }

  #render() {
    if (!this.shadowRoot) return;
    const _labels = ["B", "I", "</>", "•", "1."]; // "🔗", "S"
    const toolbarHtml = this._toolbar
      ? `<div class="toolbar">${_labels
          .map(
            (l) =>
              `<button class="tbtn btn-btn-sm" data-tool="${l}">${
                l === "</>" ? "&lt;/&gt;" : l
              }</button>`
          )
          .join("")}</div>`
      : "";
    this.shadowRoot.innerHTML = `
      <div class="box">
        ${toolbarHtml}
        <div class="edwrap">
          <div class="ed" role="textbox" aria-multiline="true" data-ph="${
            this._placeholder
          }" contenteditable="${!this._disabled}" spellcheck="${
      this._spellcheck
    }">${this.#displayValue || ""}</div>
        </div>       
      </div>`;
    this.#editorDiv = this.shadowRoot.querySelector(".ed");
    // Wire editor events
    this.#editorDiv.addEventListener("paste", this.#onPaste);
    this.#editorDiv.addEventListener("keydown", this.#onKeyDown);
    this.#editorDiv.addEventListener("input", this.#onInput);
    // Toolbar buttons
    this.shadowRoot.querySelectorAll(".tbtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.#focus();
        const label = btn.getAttribute("data-tool");
        this.#executeTool(label);
        this.#syncValue();
      });
      btn.addEventListener("mousedown", (e) => e.preventDefault());
    });
    if (this.#editorDiv && this.#editorDiv.innerHTML !== this.#displayValue) {
      this.#editorDiv.innerHTML = this.#displayValue;
    }
  }

  #executeTool(label) {
    switch (label) {
      case "B":
        document.execCommand("bold");
        break;
      case "I":
        document.execCommand("italic");
        break;
      case "S":
        document.execCommand("strikeThrough");
        break;
      case "🔗":
        this.#makeLink();
        break;
      case "</>":
        this.#toggleCode();
        break;
      case "⤴":
        this.#insertBlock("blockquote");
        break;
      case "•":
        this.#insertBlock("ul");
        break;
      case "1.":
        this.#insertBlock("ol");
        break;
    }
  }

  #focus() {
    this.#editorDiv?.focus();
  }

  // Input -> update cleaned value for form submission
  #onInput = () => {
    this.#syncValue();
  };

  // Paste as plain text
  #onPaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData(
      "text/plain"
    );
    document.execCommand("insertText", false, text);
  };

  #onKeyDown = async (e) => {
    if (e.key === "Enter" && !e.isComposing) {
      if (e.shiftKey || !this._submitOnEnter) return; // newline allowed
      e.preventDefault();
      await this.#syncValue();
      this.#requestSubmit();
    }
  };

  // ===== Formatting helpers =====
  #makeLink() {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    document.execCommand("createLink", false, url);
  }

  #toggleCode() {
    // Wrap selection with <code> or unwrap if already in code
    const root = this.shadowRoot;
    const getSel = () =>
      root && typeof root.getSelection === "function"
        ? root.getSelection()
        : window.getSelection();
    let sel = getSel();
    if (!sel || sel.rangeCount === 0) return;
    let range = sel.getRangeAt(0);
    const inEditor = (r) => {
      const node =
        r.commonAncestorContainer.nodeType === 1
          ? r.commonAncestorContainer
          : r.commonAncestorContainer.parentNode;
      return !!(node && this.#editorDiv && this.#editorDiv.contains(node));
    };
    if (!inEditor(range)) {
      this.#focus();
      sel = getSel();
      if (!sel || sel.rangeCount === 0) return;
      range = sel.getRangeAt(0);
      if (!inEditor(range)) return;
    }
    // Simple toggle: if ancestor <code>, unwrap; else wrap
    const codeAncestor = this.#closestAncestor(
      range.commonAncestorContainer,
      "CODE"
    );
    if (codeAncestor) {
      const parent = codeAncestor.parentNode;
      while (codeAncestor.firstChild)
        parent.insertBefore(codeAncestor.firstChild, codeAncestor);
      parent.removeChild(codeAncestor);
    } else {
      const wrapper = document.createElement("code");
      if (range.collapsed) {
        const caret = document.createTextNode("\u200B");
        wrapper.appendChild(caret);
        range.insertNode(wrapper);
        const next = document.createRange();
        next.setStart(caret, 1);
        next.collapse(true);
        sel.removeAllRanges();
        sel.addRange(next);
      } else {
        try {
          range.surroundContents(wrapper);
        } catch {
          const contents = range.extractContents();
          wrapper.appendChild(contents);
          range.insertNode(wrapper);
        }
        const next = document.createRange();
        next.selectNodeContents(wrapper);
        sel.removeAllRanges();
        sel.addRange(next);
      }
    }
  }

  #insertBlock(type) {
    if (type === "blockquote") {
      document.execCommand("formatBlock", false, "blockquote");
      return;
    }
    if (type === "ul") {
      document.execCommand("insertUnorderedList");
      return;
    }
    if (type === "ol") {
      document.execCommand("insertOrderedList");
      return;
    }
  }

  #closestAncestor(node, tag) {
    while (node) {
      if (node.nodeType === 1 && node.tagName === tag) return node;
      node = node.parentNode;
    }
    return null;
  }

  async #syncValue() {
    if (!this.#editorDiv) return;
    if (this._format === "markdown") await this.#ensureShowdown();
    const { html, markdown } = this.#prepareContentFromEditor(
      this.#editorDiv.innerHTML || "",
      this._format === "markdown"
    );
    const nextValue = this._format === "markdown" ? markdown : html;
    this.#isSyncingFromEditor = true;
    this.value = nextValue;
    this.#isSyncingFromEditor = false;
    this.#displayValue = html;
    if (this.#editorDiv.innerHTML !== html) {
      this.#editorDiv.innerHTML = html;
    }
    this.#internals.setFormValue(nextValue);
    this.#updateValidityState(html, nextValue);
    this.dispatchEvent(
      new InputEvent("input", { bubbles: true, composed: true })
    );
  }

  #canonicalize(html) {
    // normalize newlines and div/paragraphs
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    // remove disallowed attributes
    tmp.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((a) => {
        if (!/^href$/i.test(a.name)) el.removeAttribute(a.name);
      });
    });
    return tmp.innerHTML;
  }

  #sanitizeHtml(html) {
    const canonical = this.#canonicalize(html || "");
    if (!canonical) return "";
    const scratch = document.createElement("div");
    scratch.innerHTML = canonical;
    if (!(scratch.textContent || "").trim()) return "";
    this.#stripDisallowedElements(scratch);
    this.#normalizeBlockContainers(scratch);
    this.#removeEmptyParagraphs(scratch);
    this.#normalizeAnchors(scratch);
    return scratch.innerHTML;
  }

  #stripDisallowedElements(root) {
    const allowed = new Set([
      "A",
      "B",
      "BLOCKQUOTE",
      "BR",
      "CODE",
      "DIV",
      "EM",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "I",
      "LI",
      "OL",
      "P",
      "PRE",
      "S",
      "STRONG",
      "U",
      "UL",
    ]);
    root.querySelectorAll("*").forEach((el) => {
      const tag = el.tagName.toUpperCase();
      if (!allowed.has(tag)) {
        const frag = document.createDocumentFragment();
        while (el.firstChild) frag.appendChild(el.firstChild);
        el.replaceWith(frag);
        return;
      }
      if (tag === "A") {
        [...el.attributes].forEach((attr) => {
          if (!/^(href|target|rel)$/i.test(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      } else {
        [...el.attributes].forEach((attr) => {
          el.removeAttribute(attr.name);
        });
      }
    });
  }

  #normalizeBlockContainers(root) {
    const blockChildren = new Set([
      "BLOCKQUOTE",
      "DIV",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "OL",
      "PRE",
      "UL",
    ]);
    root.querySelectorAll("p").forEach((p) => {
      const hasBlockChild = [...p.children].some((child) =>
        blockChildren.has(child.tagName.toUpperCase())
      );
      if (!hasBlockChild) return;
      const parent = p.parentNode;
      if (!parent) return;
      while (p.firstChild) parent.insertBefore(p.firstChild, p);
      parent.removeChild(p);
    });
  }

  #removeEmptyParagraphs(root) {
    root.querySelectorAll("p").forEach((p) => {
      const hasContent = (p.textContent || "").replace(/\u00A0/g, " ").trim().length > 0;
      const hasNonBreakChild = [...p.children].some((child) => child.tagName && child.tagName.toUpperCase() !== "BR");
      if (!hasContent && !hasNonBreakChild) {
        p.remove();
      }
    });
  }

  #normalizeAnchors(root) {
    root.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href || /^javascript:/i.test(href)) {
        a.removeAttribute("href");
        a.removeAttribute("target");
        a.removeAttribute("rel");
        return;
      }
      if (!a.hasAttribute("target")) {
        a.setAttribute("target", "_blank");
      }
      const existingRel = (a.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean);
      if (!existingRel.includes("noopener")) existingRel.push("noopener");
      if (!existingRel.includes("noreferrer")) existingRel.push("noreferrer");
      a.setAttribute("rel", existingRel.join(" "));
    });
  }

  #cleanHtml(html, options = {}) {
    const { roundtrip = true } = options;
    const sanitized = this.#sanitizeHtml(html);
    if (!sanitized) return "";
    if (!roundtrip) return sanitized;
    const md = this.#htmlToMinimalMarkdown(sanitized);
    if (!md.trim()) return "";
    return this.#loadedShowdown && this.#converter
      ? this.#converter.makeHtml(md)
      : this.#markdownToBareHtml(md);
  }

  #prepareContentFromEditor(html, requireConverter = false) {
    const cleanedHtml = this.#cleanHtml(html || "", { roundtrip: false });
    if (!cleanedHtml) return { html: "", markdown: "" };
    if (this.#converter && typeof this.#converter.makeMarkdown === "function") {
      return { html: cleanedHtml, markdown: this.#converter.makeMarkdown(cleanedHtml) };
    }
    if (requireConverter && !this.#warnedMarkdownFallback) {
      console.warn(
        "pds-richtext: Showdown converter unavailable; falling back to internal markdown cleaner."
      );
      this.#warnedMarkdownFallback = true;
    }
    return {
      html: cleanedHtml,
      markdown: this.#htmlToMinimalMarkdown(cleanedHtml),
    };
  }

  #updateValidityState(displayHtml, formValue) {
    if (!this.required) {
      this.#internals.setValidity({}, "", this.#editorDiv);
      return;
    }
    const hasDisplayContent = this.#hasContent(displayHtml);
    const hasValueContent = typeof formValue === "string" && formValue.trim().length > 0;
    if (hasDisplayContent || hasValueContent) {
      this.#internals.setValidity({}, "", this.#editorDiv);
    } else {
      this.#internals.setValidity(
        { customError: true },
        "Please enter a message.",
        this.#editorDiv
      );
    }
  }

  #hasContent(html) {
    if (!html) return false;
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return !!(tmp.textContent || "").trim();
  }

  #updateEditorFromValue(options = {}) {
    if (
      this._format === "markdown" &&
      (!this.#converter || !this.#loadedShowdown)
    ) {
      this.#ensureShowdown().then(() => this.#applyValueToEditor(options));
      return;
    }
    this.#applyValueToEditor(options);
  }

  #applyValueToEditor(options = {}) {
    const { reflect = true, updateForm = true, forceDisplayRefresh = false } = options;
    const format = this._format;
    let cleanedHtml;
    if (format === "html") {
      cleanedHtml = this.#cleanHtml(this._value, { roundtrip: false });
      if (cleanedHtml !== this._value) {
        this._value = cleanedHtml;
      }
    } else {
      const renderedHtml = this.#markdownToDisplayHtml(this._value);
      cleanedHtml = this.#cleanHtml(renderedHtml, { roundtrip: false });
      if (this.#converter && typeof this.#converter.makeMarkdown === "function") {
        const normalizedMarkdown = cleanedHtml
          ? this.#converter.makeMarkdown(cleanedHtml)
          : "";
        if (normalizedMarkdown !== this._value) {
          this._value = normalizedMarkdown;
        }
      } else {
        if (!this.#warnedMarkdownFallback) {
          console.warn(
            "pds-richtext: Showdown converter unavailable while normalizing markdown value; using internal sanitizer instead."
          );
          this.#warnedMarkdownFallback = true;
        }
        this._value = cleanedHtml
          ? this.#htmlToMinimalMarkdown(cleanedHtml)
          : "";
      }
    }

    this.#displayValue = cleanedHtml;

    if (reflect) this.#reflectValueAttribute(this._value);

    if (
      this.#editorDiv &&
      (forceDisplayRefresh || this.#editorDiv.innerHTML !== cleanedHtml)
    ) {
      this.#editorDiv.innerHTML = cleanedHtml;
    }

    if (updateForm) {
      this.#internals.setFormValue(this._value);
      this.#updateValidityState(cleanedHtml, this._value);
    }
  }

  #markdownToDisplayHtml(md) {
    const value = (md ?? "").toString();
    if (!value.trim()) return "";
    if (this.#converter && typeof this.#converter.makeHtml === "function") {
      return this.#converter.makeHtml(value);
    }
    return this.#markdownToBareHtml(value);
  }

  #reflectValueAttribute(value) {
    this.#isReflectingValue = true;
    if (value) {
      if (this.getAttribute("value") !== value) {
        this.setAttribute("value", value);
      }
    } else if (this.hasAttribute("value")) {
      this.removeAttribute("value");
    }
    this.#isReflectingValue = false;
  }

  // Very small HTML -> Markdown covering the toolbar features and basic blocks
  #htmlToMinimalMarkdown(html) {
    const root = document.createElement("div");
    root.innerHTML = html;
    const walk = (n) => {
      if (n.nodeType === 3) return n.nodeValue.replace(/\u00A0/g, " "); // nbsp -> space
      if (n.nodeType !== 1) return "";
      const tag = n.tagName;
      const ch = [...n.childNodes].map(walk).join("");
      switch (tag) {
        case "B":
        case "STRONG":
          return ch ? `**${ch}**` : "";
        case "I":
        case "EM":
          return ch ? `_${ch}_` : "";
        case "S":
        case "STRIKE":
          return ch ? `~~${ch}~~` : "";
        case "CODE":
          return ch ? `\`${ch}\`` : "";
        case "A": {
          const href = n.getAttribute("href") || "";
          const text = ch || href;
          return href ? `[${text}](${href})` : text;
        }
        case "BR":
          return "  \n";
        case "DIV":
        case "P":
          return ch ? `${ch}\n\n` : "";
        case "UL":
          return (
            [...n.children].map((li) => `- ${walk(li)}`).join("\n") + "\n\n"
          );
        case "OL": {
          return (
            [...n.children].map((li, i) => `${i + 1}. ${walk(li)}`).join("\n") +
            "\n\n"
          );
        }
        case "LI":
          return ch.replace(/\n+/g, " ");
        case "BLOCKQUOTE":
          return (
            ch
              .split(/\n/)
              .map((l) => (l ? `> ${l}` : ">"))
              .join("\n") + "\n\n"
          );
        default:
          return ch; // drop other tags
      }
    };
    let md = [...root.childNodes].map(walk).join("");
    // collapse excessive blank lines
    md = md.replace(/\n{3,}/g, "\n\n").trim();
    return md;
  }

  // Fallback Markdown -> bare HTML if Showdown not available
  #markdownToBareHtml(md) {
    // extremely small subset renderer
    let h = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    h = h
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<s>$1</s>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(
        /\[(.*?)\]\((https?:[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>'
      );
    // Lists & blockquotes (simple, single‑level)
    h = h.replace(/(^|\n)> (.*)/g, "$1<blockquote>$2</blockquote>");
    // ordered list
    h = h.replace(
      /(?:^|\n)(\d+)\. (.*)(?=\n|$)/g,
      (m, n, txt) => `\n<ol><li>${txt}</li></ol>`
    );
    // unordered list
    h = h.replace(/(?:^|\n)- (.*)(?=\n|$)/g, "\n<ul><li>$1</li></ul>");
    // paragraphs
    h = h
      .split(/\n{2,}/)
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
    return h;
  }

  // Submit helpers
  #requestSubmit() {
    const ev = new CustomEvent("submit-request", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!this.dispatchEvent(ev)) return;
    const form = this.form || this.closest("form");
    if (form) {
      if (!this.value && this.required) {
        this.reportValidity();
        return;
      }
      if (typeof form.requestSubmit === "function") form.requestSubmit();
      else form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  }
}

customElements.define("pds-richtext", RichText);
