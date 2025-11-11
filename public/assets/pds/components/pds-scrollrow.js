class PdsScrollrow extends HTMLElement {
  #viewport;
  #ro;
  #rendered = false;
  #adopted = false;

  static get observedAttributes() {
    return ["label", "snap"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static #COMPONENT_CSS = /*css*/`
    :host {
      display: block;
      position: relative;
      --row-gap-def: 10px;
      --tile-min-def: 60px;
      --tile-max-def: 120px;
      --edge-fade-def: 16px;
    }
    section { position: relative; }
    header { display:flex; align-items:baseline; gap:.5rem; margin-bottom:.5rem; }
    header h2 { margin:0; }
    .viewport-wrap { position: relative; }
    .viewport {
      padding-top:10px; padding-bottom:10px; position:relative; overflow-x:auto; overflow-y:hidden;
      scroll-behavior:smooth; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; padding-inline:0.5rem;
      --mask-left:transparent; --mask-right:transparent;
      -webkit-mask-image:linear-gradient(to right, var(--mask-left) 0, #000 var(--edge-fade), #000 calc(100% - var(--edge-fade)), var(--mask-right) 100%);
      mask-image:linear-gradient(to right, var(--mask-left) 0, #000 var(--edge-fade), #000 calc(100% - var(--edge-fade)), var(--mask-right) 100%);
      scrollbar-width:none;
    }
    .viewport::-webkit-scrollbar { display:none; }
    :host(.can-scroll-left) .viewport { --mask-left: rgba(0,0,0,0); }
    :host(.can-scroll-right) .viewport { --mask-right: rgba(0,0,0,0); }
    ul.track { display:flex; gap:var(--row-gap, var(--row-gap-def)); list-style:none; padding:0; margin:0; }
    ::slotted(li) {
      scroll-snap-align: var(--snap-align, start);
      flex:0 0 auto;
      min-inline-size: var(--tile-min, var(--tile-min-def));
      max-inline-size: var(--tile-max, var(--tile-max-def));
      inline-size: clamp(var(--tile-min, var(--tile-min-def)), 40vw, var(--tile-max, var(--tile-max-def)));
      --tile-radius:14px; --tile-bg: var(--color-mostly-trans); --tile-shadow: 0 1px 0 rgba(0,0,0,.06), 0 6px 14px rgba(0,0,0,.12);
      border-radius:var(--tile-radius); overflow:clip; background:var(--tile-bg); box-shadow:var(--tile-shadow); isolation:isolate; overflow:hidden;
    }
    ::slotted(li :focus) { outline-offset:2px; }
    .control { position:absolute; top:50%; transform:translateY(-50%); display:none; place-items:center; inline-size:auto; pointer-events:none; z-index:2; }
    @media (hover:hover) and (pointer:fine) {
      .control { display:grid; opacity:0; transition:opacity .18s ease; }
      .control.left { left: var(--spacing-3, 12px); }
      .control.right { right: var(--spacing-3, 12px); }
      :host(.can-scroll-left) .control.left,
      :host(.can-scroll-right) .control.right { opacity:1; pointer-events:auto; }
    }
    .control button { pointer-events:auto; }
    .control button[disabled]{ opacity:.35; cursor:default; }
    @media (prefers-reduced-motion:reduce){ .viewport { scroll-behavior:auto; } }
  `;

  async #adopt() {
    if (this.#adopted || !this.shadowRoot) return;
    try {
      if (window.PDS && typeof PDS.createStylesheet === 'function' && typeof PDS.adoptLayers === 'function') {
        const componentSheet = PDS.createStylesheet(PdsScrollrow.#COMPONENT_CSS);
        await PDS.adoptLayers(this.shadowRoot, ['primitives','components', 'utilities'], [componentSheet]);
        this.#adopted = true;
        return;
      }
    } catch (e) {
      console.warn('[pds-scrollrow] adoptLayers failed, falling back', e);
    }
    // Fallback: inline <style>
    const style = document.createElement('style');
    style.textContent = PdsScrollrow.#COMPONENT_CSS;
    this.shadowRoot.prepend(style);
    this.#adopted = true;
  }

  // Property <-> attribute reflection for ergonomic usage
  get label() {
    // Return null when not set so caller can decide whether to render header
    return this.getAttribute("label");
  }
  set label(val) {
    if (val == null) this.removeAttribute("label");
    else this.setAttribute("label", String(val));
  }
  get snap() {
    return this.getAttribute("snap") ?? "start";
  }
  set snap(val) {
    if (val == null) this.removeAttribute("snap");
    else this.setAttribute("snap", String(val));
  }

  connectedCallback() {
    if (!this.#rendered) {
      this.render();
      this.#postRender();
      this.#rendered = true;
    }
    // In case content/size changed while disconnected
    this.#updateControls();
  }

  disconnectedCallback() {
    this.#ro?.disconnect();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;
    switch (name) {
      case "label": {
        const section = this.shadowRoot.querySelector("section");
        // If label was removed, remove the header and aria-label
        if (newValue == null) {
          if (section) section.removeAttribute("aria-label");
          const header = this.shadowRoot.querySelector("header");
          if (header) header.remove();
        } else {
          // Add/update aria-label and header fallback text
          if (section) section.setAttribute("aria-label", newValue);
          const fallbackHeading = this.shadowRoot.querySelector(
            "header h2 span[data-fallback]"
          );
          if (fallbackHeading) {
            fallbackHeading.textContent = newValue;
          } else {
            // Header missing -> create and insert before viewport-wrap
            const viewportWrap = this.shadowRoot.querySelector('.viewport-wrap');
            if (viewportWrap) {
              const header = document.createElement('header');
              header.innerHTML = `<h2><slot name="heading"><span data-fallback>${newValue}</span></slot></h2>`;
              viewportWrap.parentNode.insertBefore(header, viewportWrap);
            }
          }
        }
        break;
      }
      case "snap": {
        this.#applySnap();
        break;
      }
    }
  }

  render() {
    const label = this.label;
    const headerHtml = label
      ? `<header>
            <h2>
              <slot name="heading">
                <span data-fallback>${label}</span>
              </slot>
            </h2>
          </header>`
      : "";

    const sectionOpen = label ? `<section role="region" aria-label="${label}">` : `<section role="region">`;

    this.shadowRoot.innerHTML = /*html*/`
      ${sectionOpen}
        ${headerHtml}
        <div class="viewport-wrap">
          <div class="viewport" part="viewport" tabindex="0">
            <ul class="track" role="list"><slot></slot></ul>
          </div>
          <div class="control left" aria-hidden="true">
            <button class="btn btn-sm icon-only" part="prev" aria-label="Scroll left">
              <pds-icon icon="arrow-left" size="sm"></pds-icon>
            </button>
          </div>
          <div class="control right" aria-hidden="true">
            <button class="btn btn-sm icon-only" part="next" aria-label="Scroll right">
              <pds-icon icon="arrow-right" size="sm"></pds-icon>
            </button>
          </div>
        </div>
      </section>`;
    // Kick off style adoption after markup so elements exist
    this.#adopt();
  }

  #postRender() {
    const root = this.shadowRoot;
    this.#viewport = root.querySelector(".viewport");

    // Events
    this.#viewport.addEventListener("scroll", () => this.#onScroll());
    this.#viewport.addEventListener("keydown", (e) => this.#onKeyDown(e));
    // Update when images inside slotted content finish loading (capture because load doesn't bubble)
    this.#viewport.addEventListener(
      "load",
      () => this.#updateControls(),
      true
    );

    const [prevBtn, nextBtn] = root.querySelectorAll(".control button");
    if (prevBtn) prevBtn.addEventListener("click", (e) => this.doPage(e));
    if (nextBtn) nextBtn.addEventListener("click", (e) => this.doPage(e));

    // Slot content changes may affect scrollWidth
    const defaultSlot = root.querySelector("slot:not([name])");
    defaultSlot?.addEventListener("slotchange", () => this.#updateControls());

    // Apply initial snap alignment
    this.#applySnap();

    // Observe size changes to refresh controls
    this.#ro = new ResizeObserver(() => this.#updateControls());
    if (this.#viewport) this.#ro.observe(this.#viewport);

    // Initial state (layout can be delayed; schedule a couple of passes)
    this.#updateControls();
    queueMicrotask(() => this.#updateControls());
    requestAnimationFrame(() => this.#updateControls());
  }

  #applySnap() {
    const snapAlign = this.snap === "center" ? "center" : "start";
    if (this.#viewport) {
      this.#viewport.style.setProperty("--snap-align", snapAlign);
    }
  }

  doPage(e) {
    const target = e.currentTarget || e.target;
    const direction = target.getAttribute("part") === "prev" ? -1 : 1;
    this.#page(direction);
  }

  #onScroll() {
    this.#updateControls();
  }

  #updateControls() {
    const el = this.#viewport;
    if (!el) return;
    const atStart = el.scrollLeft <= 2;
    const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 2;
    this.classList.toggle("can-scroll-left", !atStart);
    this.classList.toggle("can-scroll-right", !atEnd);
    const buttons = this.shadowRoot.querySelectorAll(".control button");
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];
    if (prevBtn && nextBtn) {
      prevBtn.disabled = atStart;
      nextBtn.disabled = atEnd;
    }
  }

  #page(direction = 1) {
    const el = this.#viewport;
    if (!el) return;
    const amount = Math.max(1, Math.floor(el.clientWidth * 0.9)) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  #onKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.#page(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.#page(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      this.#viewport?.scrollTo({ left: 0, behavior: "smooth" });
    } else if (e.key === "End") {
      e.preventDefault();
      this.#viewport?.scrollTo({ left: this.#viewport.scrollWidth, behavior: "smooth" });
    }
  }
}

// Auto-register the component
if (!customElements.get("pds-scrollrow")) {
  customElements.define("pds-scrollrow", PdsScrollrow);
}
