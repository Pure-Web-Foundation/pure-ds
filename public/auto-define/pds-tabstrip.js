// Vanilla Web Components version (no Lit)

class TabPanel extends HTMLElement {
  connectedCallback() {
    // ensure id + label
    if (!this.id) this.id = `tab-${Math.random().toString(36).slice(2, 7)}`;
    if (!this.hasAttribute("label")) this.setAttribute("label", this.id);

    // Wrap light DOM into a <section> once (idempotent)
    if (!this._section) {
      const section = document.createElement("section");
      section.setAttribute("role", "region");
      section.id = this.id;
      section.setAttribute("aria-label", this.getAttribute("label") || this.id);
      section.dataset.tabpanel = "";
      // Move children into section
      while (this.firstChild) section.appendChild(this.firstChild);
      this.appendChild(section);
      this._section = section;
    }
  }
  get section() {
    return this.querySelector("[data-tabpanel]");
  }
}
customElements.define("pds-tabpanel", TabPanel);

class TabStrip extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #inkbar;
  #panels = [];
  #mo;

  constructor() {
    super();
    this.#shadow.innerHTML = /*html*/ `
      <style>
        :host{display:block}
        nav{
          position:relative; display:inline-flex; gap:.5rem; align-items:flex-end;
          
          --pad-x:.5rem; --pad-y:.25rem;
        }
        nav a{
          color: currentColor;
          display:inline-block; padding:var(--pad-y) var(--pad-x);
          text-decoration:none; line-height:1.2; border-bottom:2px solid transparent;
          cursor:pointer;
        }
        nav a[aria-current="page"]{ font-weight:600; }
        nav a:focus-visible{ outline:auto; outline-offset:2px; }
        .inkbar{
          position:absolute; inset-inline-start:0; bottom:-1px; height:2px; width:0;
          transform:translateX(0); transition:transform .25s ease, width .25s ease;
          background-color: var(--color-accent-400); pointer-events:none;
        }
      </style>
      <nav part="tabs" aria-label="${
        this.getAttribute("label") || "Tabs"
      }"></nav>
      <slot></slot>
    `;
  }

  connectedCallback() {
    // Build once panels are in the light DOM
    queueMicrotask(() => {
      this.#collectPanels();
      this.#renderTabs();
      this.#syncFromUrl(true);
      this.#positionInkbar();
    });

    // Observe changes to children/attributes that affect tabs
    this.#mo = new MutationObserver(() => {
      this.#collectPanels();
      this.#renderTabs();
      this.#syncFromUrl(false);
      this.#positionInkbar();
    });
    this.#mo.observe(this, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["id", "label"],
    });

    // Respond to URL + layout changes
    addEventListener("hashchange", this.#onUrlChange, { passive: true });
    addEventListener("popstate", this.#onUrlChange, { passive: true });
    addEventListener("resize", this.#positionInkbar, { passive: true });

    // Handle clicks/keys in the shadow nav
    const nav = this.#shadow.querySelector("nav");
    nav.addEventListener("click", this.#onNavClick);
    nav.addEventListener("keydown", this.#onNavKeydown);
  }

  disconnectedCallback() {
    this.#mo?.disconnect();
    removeEventListener("hashchange", this.#onUrlChange);
    removeEventListener("popstate", this.#onUrlChange);
    removeEventListener("resize", this.#positionInkbar);
  }

  // --- helpers ---
  #collectPanels() {
    // Direct children <tab-panel> only (your structure)
    this.#panels = Array.from(this.querySelectorAll(":scope > tab-panel"));
    // Ensure each has an id + section
    this.#panels.forEach((p, i) => {
      if (!p.id) p.id = `tab-${i + 1}`;
      p.connectedCallback?.(); // make sure its section exists
    });
  }

  #renderTabs() {
    const nav = this.#shadow.querySelector("nav");
    nav.innerHTML =
      this.#panels
        .map((p) => {
          const id = p.id;
          const label = p.getAttribute("label") || id;
          return `<a href="#${id}" aria-controls="${id}">${label}</a>`;
        })
        .join("") + `<span class="inkbar" aria-hidden="true"></span>`;
    this.#inkbar = nav.querySelector(".inkbar");
  }

  #syncFromUrl(initial = false) {
    if (!this.#panels.length) return;
    const hashId = (location.hash || "").slice(1);
    const exists = this.#panels.some((p) => p.id === hashId);
    const next = exists
      ? hashId
      : this.getAttribute("selected") || this.#panels[0].id;

    // Update selected attribute (optional external reflection)
    this.setAttribute("selected", next);

    // Show/hide panels
    for (const p of this.#panels) {
      const sec = p.section || p.querySelector("[data-tabpanel]");
      if (!sec) continue;
      const active = p.id === next;
      sec.hidden = !active; // semantic
      sec.setAttribute("aria-hidden", String(!active));
      sec.style.display = active ? "" : "none"; // guaranteed visual hide
      if (active) sec.setAttribute("tabindex", "0");
      else sec.removeAttribute("tabindex");
    }

    // Mark active link
    const links = this.#shadow.querySelectorAll('nav a[href^="#"]');
    links.forEach((a) => {
      const target = a.getAttribute("href").slice(1);
      if (target === next) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    this.#positionInkbar();

    // Stabilize URL on first paint if needed
    if (initial && (!hashId || !exists)) {
      history.replaceState(null, "", `#${next}`);
    }
  }

  #positionInkbar = () => {
    const nav = this.#shadow.querySelector("nav");
    if (!nav) return;
    const active = nav.querySelector('a[aria-current="page"]');
    if (!active) return;
    const nb = nav.getBoundingClientRect();
    const ab = active.getBoundingClientRect();
    const w = Math.max(0, ab.width);
    const x = Math.max(0, ab.left - nb.left);
    this.#inkbar.style.width = `${w}px`;
    this.#inkbar.style.transform = `translateX(${x}px)`;
  };

  #onUrlChange = () => this.#syncFromUrl(false);

  #onNavClick = (e) => {
    const a = e
      .composedPath()
      .find(
        (el) => el?.tagName === "A" && el.getAttribute("href")?.startsWith("#")
      );
    if (!a) return;
    e.preventDefault(); // prevent anchor scroll/jump
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    if (location.hash.slice(1) !== id) history.pushState(null, "", `#${id}`);
    this.#syncFromUrl(false);
  };

  #onNavKeydown = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const links = Array.from(this.#shadow.querySelectorAll('nav a[href^="#"]'));
    const i = links.indexOf(
      this.#shadow.activeElement || document.activeElement
    );
    if (i === -1) return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? links[(i + 1) % links.length]
        : links[(i - 1 + links.length) % links.length];
    next?.focus();
  };
}
customElements.define("pds-tabstrip", TabStrip);
