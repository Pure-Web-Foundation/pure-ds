import { PDS } from "#pds";

/** Viewport edge the drawer is attached to. */
const DRAWER_POSITIONS = ["bottom", "top", "left", "right"];
/** Width preset steps. Absence is meaningful: it resolves in CSS to the
 *  position-derived default (lg for top/bottom, sm for left/right). */
const DRAWER_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"];
/** Placement along the edge the drawer is attached to (the cross axis of position). */
const DRAWER_ALIGNMENTS = ["start", "center", "end", "stretch"];
/** Which corners round off. */
const DRAWER_CORNERS = ["auto", "flush", "rounded", "square"];

/**
 * @element pds-drawer
 * @fires toggle - Fired when the drawer opens or closes
 * 
 * @slot drawer-header - Header content for the drawer
 * @slot drawer-content - Main content of the drawer
 * 
 * @cssprop --drawer-duration - Animation duration (default: var(--transition-normal))
 * @cssprop --drawer-easing - Animation easing function (default: var(--easing-emphasized))
 * @cssprop --drawer-max-height - Maximum height when position is top/bottom (default: 70vh)
 * @cssprop --drawer-min-height - Minimum height when position is top/bottom (default: auto)
 * 
 * @csspart backdrop - The semi-transparent backdrop overlay
 * @csspart panel - The drawer panel container
 * @csspart header - The drawer header section
 * @csspart close-button - The close button
 * @csspart grab-handle - The drag handle indicator
 * @csspart content - The drawer content section
 */
class PdsDrawer extends HTMLElement {
  static #idCounter = 0;
  #isDragging = false;
  #startX = 0;
  #startY = 0;
  #lastX = 0;
  #lastY = 0;
  #lastTS = 0;
  #velocity = 0; // px/ms along active axis
  #startFraction = 0;
  #aside = null;
  #drawerHeight = 0;
  #drawerWidth = 0;
  #raf = 0;
  #currentFraction = 0; // 0=open, 1=closed
  #resizeObs = null;
  #motionLayer = null;
  #activeAnimations = [];
  #lastFocused = null;
  #focusTrapActive = false;
  #titleId = `pds-drawer-title-${PdsDrawer.#idCounter++}`;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // default state
    this._open = false;
    this._position = "bottom"; // bottom | top | left | right
    this._drag = "header"; // header | none
    this._maxHeight = "";
    this._minHeight = "";
    this._showClose = false;
    // Empty string means "not set", which is NOT the same as a default: absence lets
    // CSS resolve a position-dependent default, so these must not be seeded with a
    // concrete value here.
    this._size = "";
    this._align = "";
    this._corners = "";
    this._inset = false;
  }
  static get observedAttributes() {
    return [
      "open",
      "position",
      "drag",
      "max-height",
      "min-height",
      "show-close",
      "size",
      "align",
      "corners",
      "inset",
    ];
  }

  /**
   * Lowercase and validate an enumerated attribute value, warning once per bad value.
   * Returns the fallback when the value is not recognised. Normalized values are
   * deliberately NOT written back to the DOM: the CSS enumerates every valid value
   * literally, so it is already self-validating, and a write-back risks a reflection
   * loop through attributeChangedCallback.
   * @param {unknown} value
   * @param {string[]} allowed
   * @param {string} attr
   * @param {string} [fallback]
   * @returns {string}
   */
  #normalizeEnum(value, allowed, attr, fallback = "") {
    if (value == null || value === "") return fallback;
    const v = String(value).trim().toLowerCase();
    if (allowed.includes(v)) return v;
    PDS.log(
      "warn",
      `<pds-drawer> ignoring invalid ${attr}="${value}". Expected one of: ${allowed.join(", ")}.`
    );
    return fallback;
  }

  // Attribute/property reflection
  
  /**
   * Controls whether the drawer is open or closed
   * @type {boolean}
   * @attr open
   */
  get open() {
    return this._open;
  }
  set open(val) {
    const bool = Boolean(val);
    if (this._open === bool) return;
    this._open = bool;
    this.toggleAttribute("open", this._open);
    if (this._open) {
      document.body.classList.add("drawer-open");
    }
    else {
      document.body.classList.remove("drawer-open");
    }
    this.dispatchEvent(new Event("toggle"));
    this.#syncAria();
    this.#syncFocusTrap();
  }

  /**
   * Position of the drawer relative to the viewport
   * @type {"bottom" | "top" | "left" | "right"}
   * @attr position
   * @default "bottom"
   */
  get position() {
    return this._position;
  }
  set position(val) {
    const v = this.#normalizeEnum(val, DRAWER_POSITIONS, "position", "bottom");
    if (this._position === v) return;
    this._position = v;
    this.setAttribute("position", v);
    this.#applyFraction(this.#currentFraction, false);
    this.#renderCloseButtonVisibility();
  }

  /**
   * Controls drag interaction behavior
   * @type {"header" | "none"}
   * @attr drag
   * @default "header"
   */
  get drag() {
    return this._drag;
  }
  set drag(val) {
    const v = String(val || "header");
    if (this._drag === v) return;
    this._drag = v;
    this.setAttribute("drag", v);
  }

  /**
   * Maximum height for top/bottom positioned drawers (CSS value)
   * @type {string}
   * @attr max-height
   * @default "70vh"
   */
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(val) {
    this._maxHeight = val || "";
    if (this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-max-height",
        this._maxHeight || "70vh"
      );
      this.#recalc();
    }
    if (this._maxHeight) this.setAttribute("max-height", this._maxHeight);
    else this.removeAttribute("max-height");
  }

  /**
   * Minimum height for top/bottom positioned drawers (CSS value)
   * @type {string}
   * @attr min-height
   * @default "auto"
   */
  get minHeight() {
    return this._minHeight;
  }
  set minHeight(val) {
    this._minHeight = val || "";
    if (this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-min-height",
        this._minHeight || "auto"
      );
      this.#recalc();
    }
    if (this._minHeight) this.setAttribute("min-height", this._minHeight);
    else this.removeAttribute("min-height");
  }

  /**
   * Whether to show the close button in the header
   * @type {boolean}
   * @attr show-close
   * @default false
   */
  get showClose() {
    return this._showClose;
  }
  set showClose(val) {
    const bool = Boolean(val);
    this._showClose = bool;
    this.toggleAttribute("show-close", this._showClose);
    this.#renderCloseButtonVisibility();
  }

  /**
   * Width preset. Sized as min(cap, step) so the panel is specified in rem but
   * self-clamps to the viewport. Unset resolves to the position-derived default:
   * lg (50rem) for top/bottom, sm (28rem) for left/right. The larger steps saturate
   * against the cap rather than overflowing, so on a 1440px display 3xl and 4xl look
   * identical and only diverge on ultrawide.
   * @type {"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full"}
   * @attr size
   */
  get size() {
    return this._size;
  }
  set size(val) {
    const v = this.#normalizeEnum(val, DRAWER_SIZES, "size");
    if (this._size === v) return;
    this._size = v;
    if (v) this.setAttribute("size", v);
    else this.removeAttribute("size");
    this.#recalc();
  }

  /**
   * Placement along the edge the drawer is attached to - the cross axis of position.
   * position="bottom" align="end" is the bottom-right corner; position="left"
   * align="start" is the top-left. Unset resolves to center for top/bottom and
   * stretch for left/right.
   * @type {"start" | "center" | "end" | "stretch"}
   * @attr align
   */
  get align() {
    return this._align;
  }
  set align(val) {
    const v = this.#normalizeEnum(val, DRAWER_ALIGNMENTS, "align");
    if (this._align === v) return;
    this._align = v;
    if (v) this.setAttribute("align", v);
    else this.removeAttribute("align");
    this.#recalc();
  }

  /**
   * Which corners round off. auto flattens the attachment edge only; flush also
   * flattens every cross-axis edge the panel is pressed against; rounded never
   * flattens; square removes all rounding.
   * @type {"auto" | "flush" | "rounded" | "square"}
   * @attr corners
   */
  get corners() {
    return this._corners;
  }
  set corners(val) {
    const v = this.#normalizeEnum(val, DRAWER_CORNERS, "corners");
    if (this._corners === v) return;
    this._corners = v;
    if (v) this.setAttribute("corners", v);
    else this.removeAttribute("corners");
  }

  /**
   * Float the drawer away from the viewport edges by --drawer-inset. Implies rounded
   * corners. Applied as padding on the motion layer, so the drawer's footprint is
   * unchanged and it still slides fully off screen.
   * @type {boolean}
   * @attr inset
   * @default false
   */
  get inset() {
    return this._inset;
  }
  set inset(val) {
    const bool = Boolean(val);
    if (this._inset === bool) return;
    this._inset = bool;
    this.toggleAttribute("inset", this._inset);
    this.#recalc();
  }

  attributeChangedCallback(name, _old, value) {
    switch (name) {
      case "open":
        this._open = this.hasAttribute("open");
        if (this._open) {
          void this.#animateTo(0);
        } else {
          void this.#animateTo(1);
        }
        this.#syncAria();
        this.#syncFocusTrap();
        break;
      case "position": {
        this._position = this.#normalizeEnum(value, DRAWER_POSITIONS, "position", "bottom");
        // position is the one attribute that must be reflected back when it falls back.
        // It has no meaningful "unset" state, every rule is keyed on :host([position=...]),
        // and an unmatched value would leave .layer with no edge anchored at all. The
        // guard is what keeps this from looping: setAttribute fires this callback again
        // even when the value is unchanged.
        if (this.getAttribute("position") !== this._position) {
          this.setAttribute("position", this._position);
        }
        this.#applyFraction(this.#currentFraction, false);
        this.#renderCloseButtonVisibility();
        break;
      }
      case "drag":
        this._drag = value || "header";
        break;
      case "max-height":
        this._maxHeight = value || "";
        if (this.#aside)
          this.#aside.style.setProperty(
            "--drawer-max-height",
            this._maxHeight || "70vh"
          );
        break;
      case "min-height":
        this._minHeight = value || "";
        if (this.#aside)
          this.#aside.style.setProperty(
            "--drawer-min-height",
            this._minHeight || "auto"
          );
        break;
      case "show-close":
        this._showClose = this.hasAttribute("show-close");
        this.#renderCloseButtonVisibility();
        break;
      case "size":
        this._size = this.#normalizeEnum(value, DRAWER_SIZES, "size");
        this.#recalc();
        break;
      case "align":
        this._align = this.#normalizeEnum(value, DRAWER_ALIGNMENTS, "align");
        this.#recalc();
        break;
      case "corners":
        this._corners = this.#normalizeEnum(value, DRAWER_CORNERS, "corners");
        break;
      case "inset":
        this._inset = this.hasAttribute("inset");
        this.#recalc();
        break;
    }
  }

  async connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });

    // Set default position attribute if not explicitly set
    if (!this.hasAttribute('position')) {
      this.setAttribute('position', 'bottom');
    }

    // Compose shadow DOM
    this.shadowRoot.innerHTML = /*html*/`
      <div class="backdrop" part="backdrop"></div>
      <div class="layer" id="layer" part="layer" aria-hidden="true">
        <div class="motion-layer" part="motion">
          <aside part="panel" tabindex="-1">
            <header part="header">
              <button class="close-btn icon-only" part="close-button" aria-label="Close drawer" hidden>
                <pds-icon icon="x" size="sm"></pds-icon>
              </button>
              <slot name="drawer-header"></slot>
              <div class="grab-handle" part="grab-handle" aria-hidden="true"></div>
            </header>
            <div part="content">
              <slot name="drawer-content"></slot>
            </div>
          </aside>
        </div>
      </div>
    `;

    // Adopt PDS layers + component stylesheet
    const componentStyles = PDS.createStylesheet(/*css*/ `
      @layer pds-drawer {
        /* The host generates no principal box (display: contents), so position, inset
           and contain on it were all inert. contain: size in particular is a landmine
           for anyone who later reaches for the host to do geometry. */
        :host { display: contents; }

        /* Timing tokens */
        :host { --_dur: var(--drawer-duration, var(--transition-normal)); }
        :host { --_easing: var(--drawer-easing, var(--easing-emphasized, cubic-bezier(0.25,1,0.5,1))); }

        /* Geometry tokens.
           --_w-cap   max share of the viewport on the inline axis. A PERCENTAGE, not vw:
                      html:has(pds-drawer[open]) forces scrollbar-gutter: stable, so vw
                      overshoots the available width by the reserved gutter, misaligning
                      the panel while open and flashing a scrollbar on close. Percentages
                      resolve against the initial containing block, which excludes it.
           --_w-step  the width step. min() of the two means the panel is sized in rem
                      but self-clamps to the viewport, matching the house idiom.
           --_inset   gap from the viewport edges. Applied as PADDING on .motion-layer,
                      never as a margin on the panel: a block-axis margin collapses out
                      of the motion layer's auto height and would leave a sliver of
                      drawer on screen after closing.
           --_r-*     per-corner radius switches. */
        :host {
          --_w-cap: 100%;
          --_w-step: 50rem;
          --_inset: 0px;
          --_r: var(--drawer-radius, var(--radius-lg));
          --_r-tl: var(--_r); --_r-tr: var(--_r); --_r-br: var(--_r); --_r-bl: var(--_r);
        }

        /* Side drawers: keep a backdrop gutter, narrower default, fill the block axis. */
        :host([position="left"]), :host([position="right"]) {
          --_w-cap: 90%;
          --_w-step: 28rem;
          --_panel-block: 100%;
          --_aside-block: 100%;
          --_aside-max-block: 100dvh;
        }

        /* Width presets. Declared AFTER the per-position defaults: equal specificity
           (0,2,0), so source order lets an explicit size win over the position default.
           The large steps saturate against --_w-cap rather than overflowing, which is
           the whole point of min(): side drawers cap at 90%, so on a 1440px display 3xl
           and 4xl both render 1296px and only diverge on ultrawide. */
        :host([size="xs"])   { --_w-step: 20rem; }   /*  320px */
        :host([size="sm"])   { --_w-step: 28rem; }   /*  448px */
        :host([size="md"])   { --_w-step: 36rem; }   /*  576px */
        :host([size="lg"])   { --_w-step: 50rem; }   /*  800px */
        :host([size="xl"])   { --_w-step: 64rem; }   /* 1024px */
        :host([size="2xl"])  { --_w-step: 80rem; }   /* 1280px */
        :host([size="3xl"])  { --_w-step: 90rem; }   /* 1440px */
        :host([size="4xl"])  { --_w-step: 100rem; }  /* 1600px */
        :host([size="full"]) { --_w-step: 100%; --_w-cap: 100%; }
        /* 5xl (120rem/1920px) is deliberately reserved: min(100%, 120rem) resolves to
           100% on essentially every real display, so it would be indistinguishable from
           full. Adding it later is a one-line, non-breaking change. */

        /* stretch on a top/bottom drawer means fill the cross axis, and outranks size:
           (0,3,0) beats the size rules' (0,2,0). */
        :host(:is([position="top"],[position="bottom"])[align="stretch"]) {
          --_w-step: 100%; --_w-cap: 100%;
        }

        /* An explicitly aligned side drawer stops being full height and hugs its
           content. Setting these to the keyword initial is the guaranteed-invalid-value
           trick: it makes var(--_x, fallback) resolve to the fallback, which avoids a
           second set of selectors downstream. It also un-shadows --drawer-max-height,
           which the full-height default deliberately overrides. */
        :host(:is([position="left"],[position="right"]):is([align="start"],[align="center"],[align="end"])) {
          --_panel-block: initial;
          --_aside-block: initial;
          --_aside-max-block: initial;
        }

        :host([inset]) { --_inset: var(--drawer-inset, var(--spacing-4)); }

        ::slotted(*) {
          padding: var(--spacing-4);
          background-color: var(--color-surface-overlay);
        }

        /* Backdrop */
        .backdrop {
          position: fixed; inset: 0;
          background: var(--backdrop-bg, var(--color-scrim, color-mix(in oklab, CanvasText 20%, Canvas 80%)));
          backdrop-filter: var(--backdrop-filter, none);
          opacity: 0; pointer-events: none; visibility: hidden;
          transition: opacity var(--_dur) var(--_easing), visibility 0s var(--_dur);
          z-index: var(--z-modal);
        }
        :host([open]) .backdrop { opacity: var(--backdrop-opacity, 1); pointer-events: auto; visibility: visible; transition-delay: 0s; }

        /* Layer: a full-viewport frame pinned to the position edge, for ALL four
           positions. It does the ALIGNMENT and nothing else. It NEVER captures pointer
           events, so the backdrop stays clickable beside the panel, and it carries no
           paint containment, which used to clip the panel's box-shadow. */
        .layer {
          position: fixed; left: 0; right: 0;
          contain: layout style;
          z-index: var(--z-drawer);
          display: flex;
          justify-content: center;
          align-items: stretch;
          pointer-events: none; visibility: hidden;
          transition: visibility 0s var(--_dur);
        }
        :host([open]) .layer { visibility: visible; transition-delay: 0s; }
        :host([open]) aside  { pointer-events: auto; }

        :host([position="bottom"]) .layer { bottom: 0; top: auto; height: auto; align-items: flex-end; }
        :host([position="top"])    .layer { top: 0; bottom: auto; height: auto; align-items: flex-start; }
        :host([position="left"]) .layer,
        :host([position="right"]) .layer { top: 0; bottom: 0; }
        :host([position="left"])  .layer { justify-content: flex-start; }
        :host([position="right"]) .layer { justify-content: flex-end; }

        /* Cross-axis alignment: align places the panel along the edge it is attached to,
           so position="bottom" align="end" is the bottom-right corner. For top/bottom the
           inline axis is the flex main axis, hence justify-content; for left/right the
           block axis is the flex cross axis, hence align-items. Every value is enumerated
           literally, so an invalid align matches nothing and falls back to the default -
           the CSS is self-validating. */
        :host(:is([position="top"],[position="bottom"])[align="start"])  .layer { justify-content: flex-start; }
        :host(:is([position="top"],[position="bottom"])[align="center"]) .layer { justify-content: center; }
        :host(:is([position="top"],[position="bottom"])[align="end"])    .layer { justify-content: flex-end; }
        :host(:is([position="left"],[position="right"])[align="start"])  .layer { align-items: flex-start; }
        :host(:is([position="left"],[position="right"])[align="center"]) .layer { align-items: center; }
        :host(:is([position="left"],[position="right"])[align="end"])    .layer { align-items: flex-end; }

        /* Motion layer - the only animated element. #getTransformForFraction applies
           translateX/Y(+/-100%) HERE, and percentage translations resolve against this
           element's own border box, so its footprint must equal the panel's footprint
           (including any inset) and #recalc must measure THIS element. Size and inset
           therefore live here and nowhere else: on .layer they would shrink the frame
           and make flex alignment impossible, and on the panel they would decouple the
           visible panel from the transformed box. */
        .motion-layer {
          flex: 0 0 auto;
          min-inline-size: 0;
          inline-size: var(--drawer-width, min(var(--_w-cap), var(--_w-step)));
          max-inline-size: 100%;
          block-size: var(--_panel-block, auto);
          padding: var(--_inset);
          contain: layout style;
          will-change: transform;
        }

        /* Panel - carries the surface. */
        aside {
          display: flex; flex-direction: column;
          background: var(--drawer-bg, var(--color-surface-overlay, Canvas));
          box-shadow: var(--drawer-shadow, var(--shadow-xl));
          block-size: var(--_aside-block, auto);
          /* The nesting is required: the maxHeight setter writes --drawer-max-height as
             an inline style on the PANEL, not on the host, so the lookup has to sit in
             the fallback slot of a declaration on the panel to keep resolving. */
          max-block-size: var(--_aside-max-block, var(--drawer-max-height, 70vh));
          min-block-size: var(--drawer-min-height, auto);
          inline-size: 100%; max-inline-size: 100%;
          margin: 0;
          border-radius: var(--_r-tl) var(--_r-tr) var(--_r-br) var(--_r-bl);
          /* clip, not hidden: it creates no scroll container, so the browser cannot
             scroll-on-focus and hide the header. Unconditional, because ::slotted(*)
             paints an opaque background flush to the panel's square box and pokes a
             square ear past each rounded corner otherwise. */
          overflow: clip;
          contain: layout style;
          touch-action: none;
          outline: none;
        }
        :host([position="top"]) aside { flex-direction: column-reverse; }

        /* Corner rounding.
           auto (the default): flatten the attachment edge only - byte-identical to the
             previous behaviour for every position/align/size combination.
           flush: additionally flatten every cross-axis edge the panel is pressed against.
           rounded, and inset which implies it: never flatten.
           square: no rounding at all.
           The :where() guard contributes zero specificity, so the auto rules keep the
           (0,2,0) they have always had.
           RTL: justify-content is direction-aware but these corner vars are physical. The
           repo has no RTL support today; when it lands, add a :host(:dir(rtl)) block
           swapping --_r-tl with --_r-tr and --_r-bl with --_r-br. */
        :host([position="bottom"]:where(:not([corners="rounded"], [inset]))) { --_r-bl: 0; --_r-br: 0; }
        :host([position="top"]:where(:not([corners="rounded"], [inset])))    { --_r-tl: 0; --_r-tr: 0; }
        :host([position="left"]:where(:not([corners="rounded"], [inset])))   { --_r-tl: 0; --_r-bl: 0; }
        :host([position="right"]:where(:not([corners="rounded"], [inset])))  { --_r-tr: 0; --_r-br: 0; }

        :host([corners="flush"]:is([position="top"],[position="bottom"]):is([align="start"],[align="stretch"],[size="full"])) { --_r-tl: 0; --_r-bl: 0; }
        :host([corners="flush"]:is([position="top"],[position="bottom"]):is([align="end"],[align="stretch"],[size="full"]))   { --_r-tr: 0; --_r-br: 0; }
        :host([corners="flush"]:is([position="left"],[position="right"]):where(:not([align="center"],[align="end"])))   { --_r-tl: 0; --_r-tr: 0; }
        :host([corners="flush"]:is([position="left"],[position="right"]):where(:not([align="center"],[align="start"]))) { --_r-bl: 0; --_r-br: 0; }

        :host([corners="square"]) { --_r: 0px; }

        header {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-areas:
            "grab grab"
            "title close";
          align-items: center;
          column-gap: var(--spacing-2);
          row-gap: var(--spacing-2);
          padding-inline: var(--spacing-2);
          padding-block: var(--spacing-2);
          min-block-size: var(--drawer-header-min-hit, var(--control-min-height, var(--spacing-10)));
        }
        .grab-handle {
          grid-area: grab;
          justify-self: center;
          inline-size: var(--drawer-handle-width, var(--size-9, var(--spacing-9)));
          block-size: var(--drawer-handle-height, var(--size-1, var(--spacing-1)));
          border-radius: var(--drawer-handle-radius, var(--radius-full));
          background: var(--drawer-handle-bg, var(--color-border));
          opacity: 0.9; pointer-events: none; user-select: none;
        }
        :host([position="left"]) .grab-handle, :host([position="right"]) .grab-handle { display:none; }
        :host([position="top"]) header {
          grid-template-areas:
            "title close"
            "grab grab";
        }
        :host([position="left"]) header,
        :host([position="right"]) header {
          grid-template-areas: "title close";
        }

        .close-btn {
          grid-area: close;
          justify-self: end;
          position: relative;
          display: inline-flex; align-items: center; justify-content: center;
          width: var(--size-8, var(--spacing-8)); height: var(--size-8, var(--spacing-8));
          border-radius: var(--radius-sm);
          border: none; background: transparent; color: inherit; cursor: pointer;
        }
        .close-btn:hover { opacity: 0.85; }
        .close-btn:focus { outline: var(--focus-outline, none); }
        ::slotted([slot="drawer-header"]) {
          grid-area: title;
          min-inline-size: 0;
          inline-size: 100%;
          display: block;
          min-block-size: var(--drawer-header-min-hit, var(--control-min-height, var(--spacing-10)));
        }

        [part="content"] { flex: 1; min-height: 0; overflow: auto; -webkit-overflow-scrolling: touch; contain: layout paint style; }

      }
    `);

    await PDS.adoptLayers(this.shadowRoot, ["primitives", "components"], [componentStyles]);

    // References
    this.#aside = this.shadowRoot.querySelector("aside");
    this.#motionLayer = this.shadowRoot.querySelector(".motion-layer");
    this.#applyFraction(this.open ? 0 : 1, false);
    this.#syncAria();
    this.#renderCloseButtonVisibility();

    // Wire events
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    backdrop?.addEventListener('click', this.#onBackdropClick);

    const aside = this.#aside;
    if (aside) aside.addEventListener('pointerdown', (e) => {
      if (this._drag === 'none') return;
      // Only allow drag from header when configured
      if (this._drag === 'header') {
        const header = this.shadowRoot.querySelector('header');
        const path = e.composedPath();
        if (!path.includes(header)) return;
      }
      this.#onPointerDown(e);
    });

    // Global listeners
    window.addEventListener("pointermove", this.#onPointerMove, { passive: false });
    window.addEventListener("pointerup", this.#onPointerUp, { passive: true });
    document.addEventListener("keydown", this.#onKeyDown, true);

    // Resize observers
    this.#resizeObs = new ResizeObserver(this.#recalc);
    // Observe both: the panel drives the motion layer's auto height, and the motion
    // layer is what #recalc actually measures.
    this.#resizeObs.observe(this.#aside);
    if (this.#motionLayer) this.#resizeObs.observe(this.#motionLayer);
    window.addEventListener("resize", this.#recalc, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener("resize", this.#recalc, { passive: true });

    this.#recalc();
  }

  disconnectedCallback() {
    // Clean up global listeners
    window.removeEventListener("pointermove", this.#onPointerMove);
    window.removeEventListener("pointerup", this.#onPointerUp);
    document.removeEventListener("keydown", this.#onKeyDown, true);
    if (this.#focusTrapActive) {
      document.removeEventListener("focusin", this.#onFocusIn, true);
      this.#focusTrapActive = false;
    }
    if (window.visualViewport)
      window.visualViewport.removeEventListener("resize", this.#recalc);
    window.removeEventListener("resize", this.#recalc);
    this.#resizeObs?.disconnect();
    cancelAnimationFrame(this.#raf);
    this.#cancelAnimations();
  }

  // Public API
  
  /**
   * Opens the drawer
   * @method openDrawer
   * @public
   */
  openDrawer() {
    this.open = true;
  }
  
  /**
   * Closes the drawer
   * @method closeDrawer
   * @public
   */
  closeDrawer() {
    this.open = false;
  }
  
  /**
   * Toggles the drawer open/closed state
   * @method toggleDrawer
   * @public
   */
  toggleDrawer() {
    this.open = !this.open;
  }

  /**
   * Configure and open the drawer in one call
   * @method show
   * @public
   * @param {any|HTMLElement|string} htmlContent - The main content to display
   * @param {Object} [options] - Configuration options
   * @param {any|HTMLElement|string} [options.header] - Header content
   * @param {"bottom"|"top"|"left"|"right"} [options.position] - Drawer position
   * @param {string} [options.maxHeight] - Maximum height (CSS value)
   * @param {string} [options.minHeight] - Minimum height (CSS value)
   * @param {"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"full"} [options.size] - Width preset
   * @param {"start"|"center"|"end"|"stretch"} [options.align] - Placement along the attachment edge
   * @param {"auto"|"flush"|"rounded"|"square"} [options.corners] - Corner rounding
   * @param {boolean} [options.inset] - Float the drawer away from the viewport edges
   * @param {boolean} [options.showClose] - Show close button
   * @param {boolean} [options.waitForMedia=true] - Wait for images/videos to load
   * @param {number} [options.mediaTimeout=500] - Media load timeout in ms
   * @returns {Promise<this>} Resolves to the drawer element
   */
  async show(htmlContent, options = {}) {
    // Apply provided options to this instance
    if (options.position) this.position = options.position;
    if (options.maxHeight) this.maxHeight = options.maxHeight;
    if (options.minHeight) this.minHeight = options.minHeight;
    // Tested with !== undefined rather than truthiness so that null or "" can CLEAR a
    // stale value on a reused drawer instance. The three options above deliberately keep
    // their existing truthiness test to avoid changing their behaviour here; worth
    // reconciling the asymmetry in a follow-up.
    if (options.size !== undefined) this.size = options.size;
    if (options.align !== undefined) this.align = options.align;
    if (options.corners !== undefined) this.corners = options.corners;
    if (options.inset !== undefined) this.inset = options.inset;

    // Close button visibility
    const pos = this.position || "bottom";
    const defaultShowClose = pos === "left" || pos === "right";
    const showClose = options.showClose === undefined ? defaultShowClose : !!options.showClose;
    this.showClose = showClose;

    // Render content (header/body)
    await this.setContent(htmlContent, options.header);

    // Wait for next frame so slots are distributed
    await new Promise((r) => requestAnimationFrame(() => r()));

    // Optionally wait for media to load (default: true)
    const shouldWaitForMedia = options.waitForMedia !== false;
    if (shouldWaitForMedia) {
      const mediaTimeout = options.mediaTimeout || 500;
      await this.#waitForMedia(mediaTimeout);
    }

    this.openDrawer();
    return this;
  }

  /**
   * Set drawer content using slots
  * @param {any|HTMLElement|string} bodyContent - Content for drawer body (HTMLElement or string; Lit templates supported if runtime available)
  * @param {any|HTMLElement|string} headerContent - Optional content for drawer header
   */
  /**
   * Set the content of the drawer
   * @method setContent
   * @public
   * @param {any|HTMLElement|string} bodyContent - Content for the drawer body
   * @param {any|HTMLElement|string} [headerContent] - Optional header content
   * @returns {Promise<void>}
   */
  async setContent(bodyContent, headerContent = null) {
    // Clear existing slotted content
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
    
    // Add new body content
    if (bodyContent) {
      const bodyWrapper = document.createElement('div');
      bodyWrapper.setAttribute('slot', 'drawer-content');
      //bodyWrapper.className = 'surface-overlay';

      // Best-effort support for Lit templates only if lit renderer is available at runtime
      if (bodyContent && bodyContent._$litType$) {
        try {
          const mod = await import("#pds/lit");
          mod.render(bodyContent, bodyWrapper);
        } catch {
          // Fallback: attempt to set as text
          bodyWrapper.textContent = String(bodyContent);
        }
      } else if (typeof bodyContent === 'string') {
        bodyWrapper.innerHTML = bodyContent;
      } else {
        bodyWrapper.appendChild(bodyContent);
      }
      this.appendChild(bodyWrapper);
    }
    
    // Add new header content
    if (headerContent) {
      const headerWrapper = document.createElement('div');
      headerWrapper.setAttribute('slot', 'drawer-header');
      //headerWrapper.className = 'surface-overlay';

      if (headerContent && headerContent._$litType$) {
        try {
          const mod = await import("#pds/lit");
          mod.render(headerContent, headerWrapper);
        } catch {
          headerWrapper.textContent = String(headerContent);
        }
      } else if (typeof headerContent === 'string') {
        headerWrapper.innerHTML = headerContent;
      } else {
        headerWrapper.appendChild(headerContent);
      }
      this.appendChild(headerWrapper);
    }
    
    // Recalculate height after content is rendered
    // Use double RAF to ensure slots are fully processed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.#recalc();
      });
    });
  }

  /**
   * Clear drawer content (removes all slotted content)
   * @method clearContent
   * @public
   */
  clearContent() {
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
  }

  // Events
  #onBackdropClick = () => this.closeDrawer();

  #onKeyDown = (e) => {
    if (!this.open) return;
    if (this.#hasActiveModalDialog()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }
      this.closeDrawer();
      return;
    }
    if (e.key === "Tab") {
      this.#trapTabFocus(e);
    }
  };

  #onFocusIn = (e) => {
    if (!this.open) return;
    if (this.#hasActiveModalDialog()) return;
    const target = e.target;
    const inShadow = this.shadowRoot?.contains(target);
    const inLight = this.contains(target);
    if (inShadow || inLight) return;
    this.#focusInitial();
  };

  #hasActiveModalDialog() {
    try {
      return Boolean(document.querySelector("dialog:modal"));
    } catch {
      // Fallback for engines without :modal support.
      return Boolean(document.querySelector("dialog[open]"));
    }
  }

  #onPointerDown = (e) => {
    if (this._drag === "none") return;
    if (this._drag === "header") {
      const header = this.shadowRoot.querySelector("header");
      const path = e.composedPath();
      if (!path.includes(header)) return;
    }
    const p = this.#getPoint(e);
    this.#isDragging = true;
    this.#startX = p.x;
    this.#startY = p.y;
    this.#lastX = p.x;
    this.#lastY = p.y;
    this.#lastTS = performance.now();
    this.#velocity = 0;
    // Cancel any in-progress WAAPI animation and sync fraction from visual state
    this.#cancelAnimations();
    this.#startFraction = this.#currentFraction;

    // Capture pointer so dragging continues outside the element
    if (e.target?.setPointerCapture && e.pointerId != null) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch { /* */}
    }

    cancelAnimationFrame(this.#raf);
    this.style.userSelect = "none";
    document.documentElement.style.cursor = "grabbing";
  };

  #onPointerMove = (e) => {
    if (!this.#isDragging) return;
    const p = this.#getPoint(e);
    const isVertical = this.position === "bottom" || this.position === "top";
    const dir = this.position === "bottom" || this.position === "right" ? 1 : -1;
    const deltaFromStart = isVertical ? (p.y - this.#startY) : (p.x - this.#startX);
    const extent = isVertical ? Math.max(1, this.#drawerHeight) : Math.max(1, this.#drawerWidth);
    const next = this.#clamp(this.#startFraction + (dir * deltaFromStart) / extent, 0, 1);
    this.#applyFraction(next, false);

    // Velocity (px/ms), positive when moving down in screen coords
    const now = performance.now();
    const dt = Math.max(1, now - this.#lastTS);
    const comp = isVertical ? p.y : p.x;
    const lastComp = isVertical ? this.#lastY : this.#lastX;
    this.#velocity = (comp - lastComp) / dt; // px/ms along active axis
    if (isVertical) this.#lastY = p.y; else this.#lastX = p.x;
    this.#lastTS = now;

    if (e.cancelable) e.preventDefault();
  };

  #onPointerUp = (e) => {
    if (!this.#isDragging) return;
    this.#isDragging = false;
  this.style.userSelect = "";
    document.documentElement.style.cursor = "";

    //const isVertical = this.position === "bottom" || this.position === "top";
    const dir = this.position === "bottom" || this.position === "right" ? 1 : -1;
    //const throwCloseThreshold = (1.0 / 1000) * 1000; // keep var for clarity; we use 1.0 px/ms below

    // Decide based on velocity first (positive in closing direction), else position threshold
    const fastForward = this.#velocity * dir > 1.0; // closing direction
    const fastBackward = this.#velocity * dir < -1.0; // opening direction

    if (fastForward) {
      this.#animateTo(1); // close
    } else if (fastBackward) {
      this.#animateTo(0); // open
    } else {
      const shouldClose = this.#currentFraction >= 0.5;
      this.#animateTo(shouldClose ? 1 : 0);
    }

    // Release pointer capture
    if (e.target?.releasePointerCapture && e.pointerId != null) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {/**/}
    }
  };

  #recalc = () => {
    // Measure the MOTION LAYER, not the panel. #getTransformForFraction applies
    // translateX/Y(±100%) to .motion-layer, and percentage translations resolve
    // against the transformed element's own border box — so the extent that feeds
    // the drag fraction math and the matrix→fraction recovery in #cancelAnimations
    // must be the motion layer's box. The two are equal while the panel fills the
    // motion layer; they stop being equal as soon as sizing or inset decouples them.
    const motionLayer = this.#motionLayer;
    if (!motionLayer) return;
    const rect = motionLayer.getBoundingClientRect();
    this.#drawerHeight = rect.height || 0;
    this.#drawerWidth = rect.width || 0;
    this.#applyFraction(this.#currentFraction, false);
  };

  // Helpers

  /** Compute a CSS transform string for a given fraction (0=open, 1=closed). */
  #getTransformForFraction(fraction) {
    if (this._position === "bottom" || this._position === "top") {
      const yPct = this._position === "bottom" ? fraction * 100 : -fraction * 100;
      return `translateY(${yPct}%)`;
    }
    const xPct = this._position === "right" ? fraction * 100 : -fraction * 100;
    return `translateX(${xPct}%)`;
  }

  /** Resolved animation duration in ms, respecting prefers-reduced-motion. */
  get #motionDuration() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return 1;
    const style = getComputedStyle(this);
    const raw = style.getPropertyValue("--drawer-duration").trim()
      || style.getPropertyValue("--transition-normal").trim();
    if (raw) {
      const ms = raw.endsWith("ms") ? parseFloat(raw)
        : raw.endsWith("s") ? parseFloat(raw) * 1000 : NaN;
      if (!isNaN(ms) && ms > 0) return ms;
    }
    return 240;
  }

  /** Resolved animation easing function. */
  get #motionEasing() {
    const style = getComputedStyle(this);
    return style.getPropertyValue("--drawer-easing").trim()
      || style.getPropertyValue("--easing-emphasized").trim()
      || "cubic-bezier(0.25,1,0.5,1)";
  }

  /**
   * Cancel any active WAAPI animations, preserving the current visual position
   * as an inline style and syncing #currentFraction from it.
   */
  #cancelAnimations() {
    if (this.#activeAnimations.length === 0) return;
    const motionLayer = this.#motionLayer;
    if (motionLayer) {
      // Capture the current animated position before cancelling
      const matrix = new DOMMatrix(getComputedStyle(motionLayer).transform);
      const isVertical = this._position === "bottom" || this._position === "top";
      if (isVertical) {
        const height = this.#drawerHeight || 1;
        this.#currentFraction = this.#clamp(Math.abs(matrix.m42) / height, 0, 1);
      } else {
        const width = this.#drawerWidth || 1;
        this.#currentFraction = this.#clamp(Math.abs(matrix.m41) / width, 0, 1);
      }
    }
    for (const animation of this.#activeAnimations) {
      animation.cancel();
    }
    this.#activeAnimations = [];
    // Commit fraction as inline percentage transform (removes matrix form)
    if (motionLayer) {
      motionLayer.style.transform = this.#getTransformForFraction(this.#currentFraction);
    }
  }

  async #waitForMedia(maxTimeout = 500) {
    // Find media elements within the drawer (including slotted content)
    const media = Array.from(this.querySelectorAll("img, video"));
    if (media.length === 0) return;

    const mediaPromises = media.map((el) => {
      if (el.tagName === "IMG") {
        const img = /** @type {HTMLImageElement} */ (el);
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }
      if (el.tagName === "VIDEO") {
        const vid = /** @type {HTMLVideoElement} */ (el);
        if (vid.readyState > 0) return Promise.resolve();
        return new Promise((resolve) => {
          vid.addEventListener("loadedmetadata", resolve, { once: true });
          vid.addEventListener("error", resolve, { once: true });
        });
      }
      return Promise.resolve();
    });

    const timeout = new Promise((resolve) => setTimeout(resolve, maxTimeout));
    await Promise.race([Promise.all(mediaPromises), timeout]);
  }
  #getPoint(e) {
    if (e.touches && e.touches[0])
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX ?? 0, y: e.clientY ?? 0 };
  }
  #clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  #applyFraction(f, _withTransition) {
    this.#currentFraction = this.#clamp(f, 0, 1);
    const motionLayer = this.#motionLayer;
    if (!motionLayer) return;
    // Always use direct style during drag — no CSS transition
    motionLayer.style.transition = "none";
    motionLayer.style.transform = this.#getTransformForFraction(this.#currentFraction);
  }

  // Whether to show the close icon button
  #shouldShowClose() {
    // Always show for side drawers; hide by default for top/bottom unless showClose flag is set
    if (this._position === "left" || this._position === "right") return true;
    if (this._position === "top" || this._position === "bottom") return !!this._showClose;
    return !!this._showClose;
  }

  #renderCloseButtonVisibility() {
    const btn = this.shadowRoot?.querySelector('.close-btn');
    if (!btn) return;
    btn.hidden = !this.#shouldShowClose();
    if (!btn._pdsBound) {
      btn.addEventListener('click', () => this.closeDrawer());
      btn._pdsBound = true;
    }
  }

  /**
   * Animate the motion layer to targetFraction (0 = open, 1 = closed) using WAAPI.
   * Cancels any in-progress animation first, preserving the current visual position.
   * Updates the open/closed state after the animation completes when driven by drag.
   */
  async #animateTo(targetFraction) {
    const motionLayer = this.#motionLayer;
    if (!motionLayer) return;

    const clamped = this.#clamp(targetFraction, 0, 1);

    // Cancel any in-progress animation, capturing visual position
    this.#cancelAnimations();

    // fromTransform is the inline style set by #cancelAnimations or #applyFraction
    const fromTransform = motionLayer.style.transform
      || this.#getTransformForFraction(this.#currentFraction);
    const toTransform = this.#getTransformForFraction(clamped);

    const animation = motionLayer.animate(
      [{ transform: fromTransform }, { transform: toTransform }],
      { duration: this.#motionDuration, easing: this.#motionEasing, fill: "forwards" }
    );

    this.#activeAnimations = [animation];
    this.#currentFraction = clamped;

    try {
      await animation.finished;
    } catch {
      // Animation was cancelled — leave state as-is
      return;
    }

    // Commit final position as inline style and clear WAAPI fill
    motionLayer.style.transform = toTransform;
    animation.cancel();
    this.#activeAnimations = [];

    // Sync open state (needed when finishing a drag-to-close or drag-to-open)
    const isOpen = clamped === 0;
    if (this._open !== isOpen) {
      this._open = isOpen;
      this.toggleAttribute("open", isOpen);
      if (!isOpen) document.body.classList.remove("drawer-open");
      this.#syncAria();
      this.#syncFocusTrap();
    }
  }

  #syncAria() {
    const layerEl = this.shadowRoot?.getElementById('layer');
    const aside = this.#aside;
    if (layerEl) layerEl.setAttribute('aria-hidden', String(!this._open));
    if (aside) {
      if (this._open) {
        aside.setAttribute('role', 'dialog');
        aside.setAttribute('aria-modal', 'true');
        const headerSlot = this.shadowRoot?.querySelector('slot[name="drawer-header"]');
        const assigned = headerSlot?.assignedElements?.({ flatten: true }) || [];
        if (assigned.length > 0) {
          const labelEl = assigned[0];
          if (!labelEl.id) labelEl.id = this.#titleId;
          aside.setAttribute('aria-labelledby', labelEl.id);
          aside.removeAttribute('aria-label');
        } else if (!aside.hasAttribute('aria-label')) {
          aside.setAttribute('aria-label', 'Drawer');
          aside.removeAttribute('aria-labelledby');
        }
      } else {
        aside.removeAttribute('role');
        aside.removeAttribute('aria-modal');
        aside.removeAttribute('aria-labelledby');
        aside.removeAttribute('aria-label');
      }
    }
  }

  #syncFocusTrap() {
    if (!this.isConnected) return;
    if (this._open) {
      if (!this.#lastFocused) {
        this.#lastFocused = this.#getDocumentActiveElement();
      }
      if (!this.#focusTrapActive) {
        document.addEventListener("focusin", this.#onFocusIn, true);
        this.#focusTrapActive = true;
      }
      queueMicrotask(() => this.#focusInitial());
    } else {
      if (this.#focusTrapActive) {
        document.removeEventListener("focusin", this.#onFocusIn, true);
        this.#focusTrapActive = false;
      }
      const toRestore = this.#lastFocused;
      this.#lastFocused = null;
      if (toRestore && document.contains(toRestore)) {
        queueMicrotask(() => toRestore.focus?.({ preventScroll: true }));
      }
    }
  }

  #getDocumentActiveElement() {
    const active = document.activeElement;
    if (active === this && this.shadowRoot?.activeElement) {
      return this.shadowRoot.activeElement;
    }
    return active;
  }

  #focusInitial() {
    const focusables = this.#getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus({ preventScroll: true });
      return;
    }
    this.#aside?.focus({ preventScroll: true });
  }

  #trapTabFocus(e) {
    const focusables = this.#getFocusableElements();
    if (focusables.length === 0) {
      e.preventDefault();
      this.#aside?.focus({ preventScroll: true });
      return;
    }

    const active = this.#getDocumentActiveElement();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const inDrawer = (active && (this.contains(active) || this.shadowRoot?.contains(active))) || false;

    if (!inDrawer) {
      e.preventDefault();
      first.focus({ preventScroll: true });
      return;
    }

    if (e.shiftKey) {
      if (active === first || !focusables.includes(active)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    }
  }

  #getFocusableElements() {
    const selector = [
      'a[href]',
      'area[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'details > summary:first-of-type',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const shadowEls = this.shadowRoot
      ? Array.from(this.shadowRoot.querySelectorAll(selector))
      : [];
    const lightEls = Array.from(this.querySelectorAll(selector));
    const all = shadowEls.concat(lightEls);

    return all.filter((el) => {
      if (!el) return false;
      if (el.hasAttribute('disabled')) return false;
      if (el.getAttribute('aria-hidden') === 'true') return false;
      if (el.closest('[inert]')) return false;
      const rects = el.getClientRects();
      return rects.length > 0;
    });
  }
}
customElements.define("pds-drawer", PdsDrawer);
