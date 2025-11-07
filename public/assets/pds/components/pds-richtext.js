/** <rich-text> — ultra‑light Slack‑style contenteditable editor (Lit + JS only)
 - Real contenteditable div, toolbar like Slack
 - Form‑associated custom element; submits a CLEANED HTML value
 - Cleaning pipeline: contenteditable HTML -> minimal Markdown (local) -> HTML via Showdown Converter
   This ensures only MD‑supported tags remain (<strong>, <em>, <s>, <code>, <a>, <ul/ol/li>, <br>, <p>)
 - Enter submits (configurable), Shift+Enter inserts newline
 - Paste is forced to plain text

 Usage:
 <form onsubmit="event.preventDefault();console.log('posted:', new FormData(this).get('message'))}">
   <rich-text name="message" placeholder="Message Steve" submit-on-enter></rich-text>
   <button type="submit">Send</button>
 </form>
 <script type="module" src="/rich-text.js"></script> 
 
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
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
    this._submitOnEnter = false;
    this._toolbar = true;
    this._spellcheck = true;
    this._value = ""; // cleaned HTML submitted
    this._placeholder = "";
    this._disabled = false;
    this._required = false;
  }

  // Property accessors (reflective where needed)
  get name() {
    return this.getAttribute("name") || "";
  }
  set name(v) {
    if (v == null) this.removeAttribute("name");
    else this.setAttribute("name", v);
  }
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(v) {
    this._placeholder = v ?? "";
    if (this.#editorDiv)
      this.#editorDiv.setAttribute("data-ph", this._placeholder);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(v) {
    const b = !!v;
    this._disabled = b;
    this.toggleAttribute("disabled", b);
    if (this.#editorDiv)
      this.#editorDiv.setAttribute("contenteditable", String(!b));
  }
  get required() {
    return this._required;
  }
  set required(v) {
    const b = !!v;
    this._required = b;
    this.toggleAttribute("required", b);
  }
  get submitOnEnter() {
    return this._submitOnEnter;
  }
  set submitOnEnter(v) {
    const b = !!v;
    this._submitOnEnter = b;
    this.toggleAttribute("submit-on-enter", b);
  }
  get spellcheck() {
    return this._spellcheck;
  }
  set spellcheck(v) {
    const b = !!v;
    this._spellcheck = b;
    this.toggleAttribute("spellcheck", b);
    if (this.#editorDiv) this.#editorDiv.setAttribute("spellcheck", String(b));
  }
  get toolbar() {
    return this._toolbar;
  }
  set toolbar(v) {
    const b = !!v;
    this._toolbar = b;
    this.toggleAttribute("toolbar", b);
    this.#render();
  }
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v ?? "";
    this.setAttribute("value", this._value);
  }

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
        this._value = newV || "";
        break;
    }
  }

  get form() {
    return this.#internals.form;
  }
  checkValidity() {
    return this.#internals.checkValidity();
  }
  reportValidity() {
    return this.#internals.reportValidity();
  }

  async connectedCallback() {
    this.#render();
    await this.#adoptStyles();
    this.#ensureShowdown();
  }

  async #adoptStyles() {
    // Component stylesheet (tokens + semantic vars)
    const componentStyles = PDS.createStylesheet(/*css*/ `@layer richtext {
      :host { display:block; color: var(--rt-fg, var(--color-text-primary)); font: var(--font-body-sm, 14px/1.35 system-ui,-apple-system,Segoe UI,Roboto,sans-serif); }
      :host([disabled]) { opacity: .6; pointer-events: none; }
      .box { border: 1px solid var(--rt-border, var(--color-border, currentColor)); border-radius: var(--radius-md,8px); background: var(--rt-bg, var(--color-surface-overlay)); }
      .toolbar {background-color: var(--surface-subtle-bg);  display:flex; gap: var(--spacing-2,10px); align-items:center; padding: var(--spacing-2,8px) var(--spacing-3,10px); border-bottom: 1px solid var(--rt-border, var(--color-border-muted)); border-radius: var(--radius-md,8px) var(--radius-md,8px) 0 0; }
      .tbtn { display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius: var(--radius-sm,6px); cursor:pointer; user-select:none; color: inherit; background: transparent; border:none; }
      .tbtn:hover { background: var(--color-surface-hover, color-mix(in oklab, CanvasText 12%, transparent)); }
      .edwrap { position:relative; }
      .ed { display: block; min-height:90px; max-height:280px; overflow:auto; padding:12px 14px; outline:none; white-space:pre-wrap; word-break:break-word; }
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
    if (this.#loadedShowdown || this.#loadingShowdown) return;
    this.#loadingShowdown = true;
    try {
      if (!("showdown" in window)) {
        // Load UMD build as a classic script to ensure `this` is the window (avoids `root` undefined)
        try {
          await this.#loadScript(
            "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"
          );
        } catch {
          // Fallback CDN
          await this.#loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js"
          );
        }
      }
      if (!("showdown" in window))
        throw new Error("Showdown failed to attach to window");
      // @ts-ignore
      this.#converter = new window.showdown.Converter({
        simplifiedAutoLink: true,
        openLinksInNewWindow: true,
        strikethrough: true,
        emoji: false,
        ghMentions: false,
        tables: false,
      });
      this.#loadedShowdown = true;
    } catch (e) {
      console.warn(
        "Showdown failed to load; cleaning will still happen via local sanitizer.",
        e
      );
      this.#loadedShowdown = false;
    } finally {
      this.#loadingShowdown = false;
    }
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
    }"></div>
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

  #onKeyDown = (e) => {
    if (e.key === "Enter" && !e.isComposing) {
      if (e.shiftKey || !this._submitOnEnter) return; // newline allowed
      e.preventDefault();
      this.#syncValue();
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
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
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
      range.surroundContents(wrapper);
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

  #syncValue() {
    const html = this.#canonicalize(this.#editorDiv?.innerHTML || "");
    const md = this.#htmlToMinimalMarkdown(html);
    const cleanHtml =
      this.#loadedShowdown && this.#converter
        ? this.#converter.makeHtml(md)
        : this.#markdownToBareHtml(md);
    this.value = cleanHtml;
    this.#internals.setFormValue(cleanHtml);
    // validity for required
    if (this.required)
      this.#internals.setValidity(
        cleanHtml.trim() ? {} : { customError: true },
        cleanHtml.trim() ? "" : "Please enter a message.",
        this.#editorDiv
      );
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
