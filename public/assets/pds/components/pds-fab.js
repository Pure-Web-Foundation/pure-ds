import { PDS } from "#pds";

/**
 * Floating Action Button (FAB) with expandable satellite actions
 * 
 * @element pds-fab
 * @fires satellite-click - Fired when a satellite button is clicked
 * 
 * @slot - Main FAB button content (typically an icon or avatar)
 * @slot satellite-{key} - Override individual satellite button content
 * 
 * @cssprop --fab-size - Size of the main FAB button (default: 64px)
 * @cssprop --fab-bg - Background color of the main FAB (default: var(--color-primary-600))
 * @cssprop --fab-fg - Foreground color of the main FAB (default: white)
 * @cssprop --sat-size - Size of satellite buttons (default: 48px)
 * @cssprop --sat-bg - Background color of satellites (default: var(--color-surface-elevated))
 * @cssprop --sat-fg - Foreground color of satellites (default: var(--color-text-primary))
 * @cssprop --radius - Distance of satellites from main FAB (default: 100px)
 * @cssprop --transition-duration - Animation duration (default: 420ms)
 * @cssprop --z-fab-in-drawer - FAB z-index when used inside pds-drawer (default: var(--z-popover))
 *
 * @attr {"click"|"hover"} behavior - Interaction mode for opening satellites (default: click)
 * @attr {"fixed"|"inline"} mode - Layout mode for FAB positioning (default: fixed)
 * 
 * @csspart fab - The main FAB button
 * @csspart satellite - Individual satellite buttons
 * @csspart label - Satellite button labels
 */
export class PdsFab extends HTMLElement {
  #satellites = [];
  #open = false;
  #radius = 100;
  #spread = 90;
  #startAngle = 180;
  #outsideClickBound = null;
  #hasCustomRadius = false;
  #hasCustomSpread = false;
  #hasCustomStartAngle = false;
  #iconRetryPending = false;
  #behavior = 'click';
  #mode = 'fixed';
  #fabClass = '';
  #hoverMoveTracker = null;
  #componentStyles = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#outsideClickBound = this.#onOutsideClick.bind(this);
  }

  static get observedAttributes() {
    return ['open', 'radius', 'spread', 'start-angle', 'behavior', 'mode', 'fab-class'];
  }

  /**
   * Controls whether the FAB is expanded
   * @type {boolean}
   * @attr open
   */
  get open() {
    return this.#open;
  }
  set open(val) {
    const bool = Boolean(val);
    if (this.#open === bool) return;
    this.#open = bool;
    if (!this.shadowRoot?.innerHTML) {
      this.#render();
    }
    this.#updateSatelliteTransitionDelays(bool);
    this.toggleAttribute('open', bool);
    requestAnimationFrame(() => this.#updateIconState());
    
    if (this.#open) {
      document.addEventListener('click', this.#outsideClickBound, true);
    } else {
      document.removeEventListener('click', this.#outsideClickBound, true);
    }
  }

  /**
   * Distance in pixels from the main FAB to satellites
   * @type {number}
   * @attr radius
   * @default 100
   */
  get radius() {
    return this.#radius;
  }
  set radius(val) {
    this.#hasCustomRadius = true;
    this.#radius = Number(val) || 100;
    const attrValue = String(this.#radius);
    if (this.getAttribute('radius') !== attrValue) {
      this.setAttribute('radius', attrValue);
    }
    this.#render();
  }

  /**
   * Arc angle in degrees for satellite distribution
   * @type {number}
   * @attr spread
   * @default 90
   */
  get spread() {
    return this.#spread;
  }
  set spread(val) {
    this.#hasCustomSpread = true;
    this.#spread = Number(val) || 90;
    const attrValue = String(this.#spread);
    if (this.getAttribute('spread') !== attrValue) {
      this.setAttribute('spread', attrValue);
    }
    this.#render();
  }

  /**
   * Starting angle in degrees (0=right, 90=down, 180=left, 270=up)
   * If not specified, the angle is auto-detected based on the FAB's corner position:
   * - Bottom-right: 180-� (fly left/up)
   * - Bottom-left: 315-� (fly right/up)
   * - Top-right: 225-� (fly left/down)
   * - Top-left: 45-� (fly right/down)
   * @type {number}
   * @attr start-angle
   * @default 180 (or auto-detected)
   */
  get startAngle() {
    return this.#startAngle;
  }
  set startAngle(val) {
    this.#hasCustomStartAngle = true;
    this.#startAngle = Number(val) || 180;
    const attrValue = String(this.#startAngle);
    if (this.getAttribute('start-angle') !== attrValue) {
      this.setAttribute('start-angle', attrValue);
    }
    this.#render();
  }

  /**
   * Interaction mode for satellite menu.
   * - click: toggles satellites when main FAB is clicked
   * - hover: opens on hover/focus and closes when pointer leaves safe area
   * @type {'click'|'hover'}
   * @attr behavior
   * @default click
   */
  get behavior() {
    return this.#behavior;
  }
  set behavior(val) {
    const next = val === 'hover' ? 'hover' : 'click';
    if (this.#behavior === next) return;
    this.#behavior = next;
    if (this.getAttribute('behavior') !== next) {
      this.setAttribute('behavior', next);
      return;
    }
    this.#render();
  }

  /**
   * Layout mode for host positioning.
   * - fixed: FAB is anchored to viewport bottom-right
   * - inline: FAB participates in normal document flow
   * @type {'fixed'|'inline'}
   * @attr mode
   * @default fixed
   */
  get mode() {
    return this.#mode;
  }
  set mode(val) {
    const next = val === 'inline' ? 'inline' : 'fixed';
    if (this.#mode === next) return;
    this.#mode = next;
    if (this.getAttribute('mode') !== next) {
      this.setAttribute('mode', next);
      return;
    }
    this.#render();
  }

  /**
   * Space-separated class list forwarded to the internal button.
   * Use this instead of host classes for btn-* and icon-only.
   * @type {string}
   * @attr fab-class
   * @example "btn-primary icon-only"
   */
  get fabClass() {
    return this.#fabClass;
  }
  set fabClass(val) {
    const next = String(val || '').trim();
    if (this.#fabClass === next) return;
    this.#fabClass = next;
    if (this.getAttribute('fab-class') !== next) {
      if (next) {
        this.setAttribute('fab-class', next);
      } else {
        this.removeAttribute('fab-class');
      }
      return;
    }
    this.#render();
  }

  /**
   * Array of satellite button configurations
  * @type {Array<{key: string, icon?: string, iconColor?: string, bgColor?: string, iconSize?: string, label?: string, action?: string}>}
   */
  get satellites() {
    return this.#satellites;
  }
  set satellites(val) {
    this.#satellites = Array.isArray(val) ? val : [];
    // Limit to 6 satellites
    if (this.#satellites.length > 6) {
      console.warn('pds-fab: Maximum 6 satellites supported. Excess satellites will be ignored.');
      this.#satellites = this.#satellites.slice(0, 6);
    }
    this.#render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    
    switch (name) {
      case 'open':
        this.open = newVal !== null;
        break;
      case 'radius':
        if (newVal === null) {
          this.#hasCustomRadius = false;
          this.#radius = 100;
          this.#render();
          break;
        }
        this.#hasCustomRadius = true;
        this.radius = Number(newVal) || 100;
        break;
      case 'spread':
        if (newVal === null) {
          this.#hasCustomSpread = false;
          this.#spread = 90;
          this.#render();
          break;
        }
        this.#hasCustomSpread = true;
        this.spread = Number(newVal) || 90;
        break;
      case 'start-angle':
        if (newVal === null) {
          this.#hasCustomStartAngle = false;
          this.#startAngle = 180;
          this.#render();
          break;
        }
        this.#hasCustomStartAngle = true;
        this.startAngle = Number(newVal) || 180;
        break;
      case 'behavior':
        this.behavior = newVal === 'hover' ? 'hover' : 'click';
        break;
      case 'mode':
        this.mode = newVal === 'inline' ? 'inline' : 'fixed';
        break;
      case 'fab-class':
        this.fabClass = newVal || '';
        break;
    }
  }

  async connectedCallback() {
    this.#hasCustomRadius = this.hasAttribute('radius');
    this.#hasCustomSpread = this.hasAttribute('spread');
    this.#hasCustomStartAngle = this.hasAttribute('start-angle');
    this.#behavior = this.getAttribute('behavior') === 'hover' ? 'hover' : 'click';
    this.#mode = this.getAttribute('mode') === 'inline' ? 'inline' : 'fixed';
    this.#fabClass = (this.getAttribute('fab-class') || '').trim();
    if (!this.#componentStyles) {
      this.#componentStyles = PDS.createStylesheet(/*css*/`
        @layer pds-fab {
          :host {
            --fab-hit-area: var(--control-min-height, 2.5rem);
            --sat-size: 48px;
            --fab-size: 64px;
            --fab-bg: var(--color-primary-600, #0078d4);
            --fab-fg: white;
            --sat-bg: var(--color-surface-elevated, #2a2a2a);
            --sat-fg: var(--color-text-primary, #fff);
            --radius: 100px;
            --transition-duration: 420ms;

            position: fixed;
            inset: auto 20px 20px auto;
            z-index: var(--fab-host-z-index, var(--z-notification, 1000));
            display: inline-block;
            vertical-align: middle;
          }

          :host([mode="inline"]) {
            position: relative;
            inset: auto;
            --fab-size: auto;
            --sat-size: 40px;
          }

          .wrap {
            position: relative;
            width: var(--fab-size);
            height: var(--fab-size);
          }

          :host([mode="inline"]) .wrap {
            width: auto;
            height: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .fab {
            position: relative;
            z-index: 2;
          }

          .fab ::slotted(pds-icon) {
            display: inline-block;
            transition: transform 0.2s ease;
          }

          /* When FAB is icon-only, the slot must fill and center for proper button geometry */
          .fab.icon-only ::slotted(pds-icon) {
            display: grid;
            place-items: center;
            inline-size: 100%;
            block-size: 100%;
          }

          :host([mode="inline"]) .fab.icon-only {
            /* Match compact icon-only geometry used by normal PDS buttons */
            inline-size: max(33px, calc(var(--font-size-base) + (max(calc(var(--spacing-1) * 1), var(--spacing-2)) * 2) + (var(--border-width-medium) * 2)));
            block-size: max(33px, calc(var(--font-size-base) + (max(calc(var(--spacing-1) * 1), var(--spacing-2)) * 2) + (var(--border-width-medium) * 2)));
            min-inline-size: 0;
            min-block-size: 0;
            padding: 0;
          }

          :host([open]) .fab.has-satellites.has-plus ::slotted(pds-icon) {
            transform: rotate(45deg);
          }

          .sat-text {
            font-size: 1.25rem;
            font-weight: 600;
            user-select: none;
          }
        }

        /* Host may carry forwarded button classes, but must never render as a button */
        :host([class*="btn-"]),
        :host(.icon-only) {
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          color: inherit;
          font: inherit;
          inline-size: auto;
          block-size: auto;
          min-inline-size: 0;
          min-block-size: 0;
          padding: 0;
          text-decoration: none;
          transform: none;
        }

        /* Unlayered to prevent generic button primitives from overriding satellites */
        .sat {
          all: unset;
          position: absolute;
          top: calc((var(--fab-size) - var(--sat-size)) / 2);
          left: calc((var(--fab-size) - var(--sat-size)) / 2);
          inline-size: var(--sat-size);
          block-size: var(--sat-size);
          border-radius: 50%;
          overflow: hidden;
          background: var(--sat-bg);
          color: var(--sat-fg);
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.15),
            0 6px 18px rgba(0, 0, 0, 0.2);
          display: grid;
          place-items: center;
          cursor: pointer;
          transform: translate(0, 0) scale(0.2);
          opacity: 0;
          pointer-events: none;
          transition:
            transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1.4),
            opacity 420ms ease;
        }

        :host([mode="inline"]) .sat {
          inline-size: 40px;
          block-size: 40px;
          border-radius: 50%;
          --sat-icon-offset-x: 0px;
          --sat-icon-offset-y: 3px;
          background: var(--sat-bg-color, var(--sat-bg, var(--color-primary-600, #0078d4)));
          color: var(--sat-icon-color, #fff);
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.18),
            0 8px 16px rgba(0, 0, 0, 0.16);
        }

        :host([mode="inline"]) .sat pds-icon {
          color: var(--sat-icon-color, #fff);
          filter: none;
        }

        :host([open]) .sat {
          transform: translate(var(--tx, 0), var(--ty, 0)) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        .sat:hover,
        .sat:focus-visible {
          transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.1);
          outline: 2px solid var(--color-accent-400, #0078d4);
          outline-offset: 2px;
        }

        .sat pds-icon,
        .sat ::slotted(pds-icon) {
          display: block;
          margin: 0;
          transform: translate(var(--sat-icon-offset-x, 0px), var(--sat-icon-offset-y, 0px));
          pointer-events: none;
        }

        .sat > slot {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          inline-size: 100%;
          block-size: 100%;
        }

        :host([mode="inline"]) .sat[data-key="like"] {
          background: var(--sat-bg-color, var(--color-primary-600, #0078d4));
        }

        :host([mode="inline"]) .sat[data-key="love"] {
          background: var(--sat-bg-color, var(--color-danger-600, #b42318));
        }

        :host([mode="inline"]) .sat[data-key="interesting"] {
          background: var(--sat-bg-color, var(--color-warning-600, #b54708));
        }

        :host(:not([mode="inline"])) .fab {
          appearance: none;
          border: none;
          border-radius: 50%;
          inline-size: var(--fab-size);
          block-size: var(--fab-size);
          background: var(--fab-bg);
          color: var(--fab-fg);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.15),
            0 8px 24px rgba(0, 0, 0, 0.25);
          display: grid;
          place-items: center;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }

        :host(:not([mode="inline"])) .fab:hover {
          transform: scale(1.05);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 12px 32px rgba(0, 0, 0, 0.3);
        }

        :host(:not([mode="inline"])) .fab:active {
          transform: scale(0.98);
        }

        :host(:not([mode="inline"])[open]) .fab {
          box-shadow:
            0 0 0 2px var(--color-accent-400, #0078d4),
            0 4px 16px rgba(0, 120, 212, 0.4);
        }

      `);
    }
    await PDS.adoptLayers(this.shadowRoot, ['primitives', 'components'], [this.#componentStyles]);
    this.#render();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.#outsideClickBound, true);
    if (this.#hoverMoveTracker) {
      document.removeEventListener('pointermove', this.#hoverMoveTracker);
      this.#hoverMoveTracker = null;
    }
  }

  /**
   * Calculate optimal spread angle and radius based on satellite count
   * @param {number} count - Number of satellites
   * @returns {{spread: number, radius: number}}
   */
  #calculateOptimalLayout(count) {
    if (count === 0) return { spread: 90, radius: 100 };
    if (count === 2) return { spread: 60, radius: 80, startAngle: 210 };
    if (count === 3) return { spread: 90, radius: 80, startAngle: 180 };
    if (count === 4) return { spread: 90, radius: 120, startAngle: 180 };
    if (count === 5) return { spread: 90, radius: 140, startAngle: 180 };
    if (count === 6) return { spread: 90, radius: 170, startAngle: 180 };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const satSize = 48;

    // Shrink spread for higher counts to fit in tighter arcs
    const maxSpread = 110;
    const minSpread = 60;
    const spread = clamp(maxSpread - (count - 2) * 12, minSpread, maxSpread);

    // Radius derived from arc length to prevent overlap while keeping compact
    const arcRadians = (spread * Math.PI) / 180;
    const spacing = 1.05; // tight but readable spacing between satellites
    const minRadius = 85;
    const maxRadius = 140;
    const radius = clamp(
      Math.round((satSize * spacing * Math.max(1, count - 1)) / arcRadians),
      minRadius,
      maxRadius
    );

    return { spread, radius };
  }

  /**
   * Detect which corner the FAB is positioned in and return optimal start angle
   * Corners are detected based on getBoundingClientRect position
   * @returns {number} - Suggested start angle in degrees
   */
  #detectOptimalAngle() {
    // If user explicitly set start-angle, respect it
    if (this.#hasCustomStartAngle) {
      return this.#startAngle;
    }

    const rect = this.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Determine position based on distance from edges
    const isRight = rect.right > viewportWidth / 2;
    const isBottom = rect.bottom > viewportHeight / 2;

    // Calculate optimal angle based on corner:
    // - Bottom-right (default): 180-� (fly left/up)
    // - Bottom-left: 315-� or -45-� (fly right/up) 
    // - Top-right: 225-� (fly left/down)
    // - Top-left: 45-� (fly right/down)
    
    if (isBottom && isRight) {
      return 180; // Bottom-right ��� fly left
    } else if (isBottom && !isRight) {
      return 315; // Bottom-left ��� fly up-right
    } else if (!isBottom && isRight) {
      return 225; // Top-right ��� fly left-down
    } else {
      return 45; // Top-left ��� fly right-down
    }
  }

  #render() {
    if (this.#hoverMoveTracker) {
      document.removeEventListener('pointermove', this.#hoverMoveTracker);
      this.#hoverMoveTracker = null;
    }

    const count = this.satellites.length;
    const isInDrawer = Boolean(this.closest('pds-drawer'));
    const isInlineMode = this.#mode === 'inline';
    const isIconOnlyFab = this.#fabClass.split(/\s+/).includes('icon-only');
    const hostPosition = isInlineMode ? 'relative' : 'fixed';
    const hostInset = isInlineMode ? 'auto' : 'auto 20px 20px auto';
    const hostZIndex = isInDrawer
      ? 'var(--z-fab-in-drawer, var(--z-popover, 1060))'
      : 'var(--z-notification, 1000)';

    this.style.setProperty('--fab-host-z-index', hostZIndex);

    const forwardedClasses = this.#fabClass
      .split(/\s+/)
      .filter(Boolean)
      .join(' ');
    
    // Auto-adjust spread and radius if not explicitly set by user
    const hasCustomRadius = this.#hasCustomRadius;
    const hasCustomSpread = this.#hasCustomSpread;
    const hasCustomStartAngle = this.#hasCustomStartAngle;
    
    let activeRadius = this.#radius;
    let activeSpread = this.#spread;
    let activeStartAngle = this.#startAngle;
    
    let optimal = null;
    if (!hasCustomRadius || !hasCustomSpread || !hasCustomStartAngle) {
      const optimal = this.#calculateOptimalLayout(count);
      if (!hasCustomStartAngle && typeof optimal.startAngle === 'number') {
        activeStartAngle = optimal.startAngle;
      }
      if (!hasCustomRadius) activeRadius = optimal.radius;
      if (!hasCustomSpread) activeSpread = optimal.spread;
    }

    // Keep inline icon-only FAB satellites tighter to the trigger button.
    if (isInlineMode && isIconOnlyFab && !hasCustomRadius) {
      activeRadius = Math.min(activeRadius, 56);
    }

    // Calculate positions along an arc
    const step = count > 1 ? activeSpread / (count - 1) : 0;
    const baseAngle = hasCustomStartAngle || typeof activeStartAngle === 'number'
      ? activeStartAngle
      : this.#detectOptimalAngle();
    const startAngle = hasCustomStartAngle || typeof activeStartAngle === 'number' || count <= 1
      ? baseAngle
      : baseAngle - (activeSpread / 2);

    this.style.setProperty('--radius', `${activeRadius}px`);

    this.shadowRoot.innerHTML = `
      
      <div class="wrap" role="group" aria-label="Floating actions">
        ${this.satellites.map((sat, i) => {
          const angleDeg = startAngle + step * i;
          const rad = (angleDeg * Math.PI) / 180;
          const tx = Math.cos(rad) * activeRadius;
          const ty = Math.sin(rad) * activeRadius;
          const delay = 30 * i;
          
          return `
            <button
              class="sat"
              part="satellite"
              style="--tx: ${tx}px; --ty: ${ty}px; transition-delay: ${delay}ms;${sat.bgColor ? ` --sat-bg-color: ${sat.bgColor};` : ''}${sat.iconColor ? ` --sat-icon-color: ${sat.iconColor};` : ''}"
              data-key="${sat.key}"
              aria-label="${sat.label || sat.key}"
              title="${sat.label || sat.key}"
            >
              <slot name="satellite-${sat.key}">
                ${sat.icon 
                  ? `<pds-icon icon="${sat.icon}" size="${sat.iconSize || (isInlineMode ? 'md' : 'md')}"${sat.iconColor && !isInlineMode ? ` color="${sat.iconColor}"` : ''}></pds-icon>` 
                  : `<span class="sat-text">${(sat.label || sat.key).charAt(0).toUpperCase()}</span>`
                }
              </slot>
            </button>
          `;
        }).join('')}
        
        <button 
          class="fab${count > 0 ? ' has-satellites' : ''}${forwardedClasses ? ' ' + forwardedClasses : ''}" 
          part="fab"
          aria-expanded="${this.#open}"
          aria-haspopup="menu"
          aria-label="Toggle action menu"
        >
          <slot></slot>
        </button>
      </div>
    `;
    
    // Attach event listeners
    const fab = this.shadowRoot.querySelector('.fab');
    fab?.addEventListener('click', () => this.#toggle());

    const sats = this.shadowRoot.querySelectorAll('.sat');
    sats.forEach(sat => {
      sat.addEventListener('click', (e) => this.#onSatelliteClick(e));
    });

    const wrap = this.shadowRoot.querySelector('.wrap');
    wrap?.addEventListener('keydown', (e) => this.#onKey(e));

    this.#syncFabClasses();

    if (this.#behavior === 'hover') {
      const stopTracking = () => {
        if (this.#hoverMoveTracker) {
          document.removeEventListener('pointermove', this.#hoverMoveTracker);
          this.#hoverMoveTracker = null;
        }
      };

      const isPointerSafe = (x, y) => {
        const fabEl = this.shadowRoot?.querySelector('.fab');
        const satEls = Array.from(this.shadowRoot?.querySelectorAll('.sat') ?? []);
        const padding = 40;
        for (const el of [fabEl, ...satEls].filter(Boolean)) {
          const r = el.getBoundingClientRect();
          if (x >= r.left - padding && x <= r.right + padding &&
              y >= r.top - padding && y <= r.bottom + padding) {
            return true;
          }
        }
        return false;
      };

      const startTracking = () => {
        stopTracking();
        this.#hoverMoveTracker = (e) => {
          if (!isPointerSafe(e.clientX, e.clientY)) {
            stopTracking();
            this.open = false;
          }
        };
        document.addEventListener('pointermove', this.#hoverMoveTracker, { passive: true });
      };

      wrap?.addEventListener('mouseenter', () => {
        stopTracking();
        if (count > 0) this.open = true;
      });

      wrap?.addEventListener('mouseleave', startTracking);

      wrap?.addEventListener('focusin', () => {
        stopTracking();
        if (count > 0) this.open = true;
      });

      wrap?.addEventListener('focusout', (e) => {
        if (!wrap.contains(e.relatedTarget)) {
          stopTracking();
          this.open = false;
        }
      });
    }
    
    // Handle icon swapping when slot content changes (main FAB slot only)
    const fabSlot = this.shadowRoot.querySelector('.fab slot');
    fabSlot?.addEventListener('slotchange', () => this.#updateIconState());
    this.#updateSatelliteTransitionDelays(this.#open);
    requestAnimationFrame(() => this.#updateIconState());
  }

  #syncFabClasses() {
    const fab = this.shadowRoot?.querySelector('.fab');
    if (!fab) return;
    const baseClasses = Array.from(fab.classList).filter((c) => c === 'fab' || c === 'has-satellites' || c === 'has-plus');
    const forwarded = this.#fabClass.split(/\s+/).filter(Boolean);
    fab.className = [...baseClasses, ...forwarded].join(' ');
  }

  #updateSatelliteTransitionDelays(isOpen) {
    const sats = this.shadowRoot?.querySelectorAll('.sat');
    if (!sats?.length) return;
    const count = sats.length;
    sats.forEach((sat, i) => {
      const delay = 30 * (isOpen ? i : count - 1 - i);
      sat.style.transitionDelay = `${delay}ms`;
    });
  }
  
  #updateIconState() {
    const count = this.satellites.length;
    const slot = this.shadowRoot?.querySelector('.fab slot');
    const fab = this.shadowRoot?.querySelector('.fab');
    
    if (!slot || !fab) return;
    
    if (count > 0) {
      const slottedElements = slot.assignedElements();
      const iconEl = slottedElements.find(el => el.tagName === 'PDS-ICON');
      if (!iconEl) {
        if (!this.#iconRetryPending) {
          this.#iconRetryPending = true;
          requestAnimationFrame(() => {
            this.#iconRetryPending = false;
            this.#updateIconState();
          });
        }
        return;
      }
      
      const originalIcon = iconEl.getAttribute('icon');
      const isPlusIcon = originalIcon === 'plus' || originalIcon === 'add';
      
      // Store original icon if not already stored
      if (!iconEl.dataset.originalIcon) {
        iconEl.dataset.originalIcon = originalIcon;
      }
      
      if (isPlusIcon) {
        // For plus icons, just rotate them
        fab.classList.add('has-plus');
        const targetRotation = this.#open ? 45 : 0;
        const currentRotation = Number(iconEl.dataset.rotateDegrees || 0);
        if (currentRotation !== targetRotation) {
          iconEl.animate(
            [
              { transform: `rotate(${currentRotation}deg)` },
              { transform: `rotate(${targetRotation}deg)` }
            ],
            { duration: 200, easing: 'ease', fill: 'forwards' }
          );
          iconEl.style.transform = `rotate(${targetRotation}deg)`;
          iconEl.dataset.rotateDegrees = String(targetRotation);
        }
      } else {
        // For other icons, swap to close icon when open
        fab.classList.remove('has-plus');
        if (this.#open) {
          iconEl.setAttribute('icon', 'x');
        } else {
          iconEl.setAttribute('icon', iconEl.dataset.originalIcon);
        }
      }
    } else {
      // No satellites - remove has-plus class
      fab.classList.remove('has-plus');
    }
  }

  #toggle() {
    this.open = !this.#open;
  }

  #onSatelliteClick(e) {
    const button = e.currentTarget;
    const key = button.dataset.key;
    const sat = this.satellites.find(s => s.key === key);
    
    if (sat) {
      this.dispatchEvent(new CustomEvent('satellite-click', {
        detail: { ...sat },
        bubbles: true,
        composed: true
      }));
    }
    
    this.open = false;
  }

  #onKey(e) {
    if (e.key === 'Escape' && this.#open) {
      e.stopPropagation();
      e.preventDefault();
      this.open = false;
    }
  }

  #onOutsideClick(e) {
    const target = e.target;
    if (target?.closest?.('[data-fab-ignore-outside]')) {
      return;
    }
    if (!this.contains(target) && !this.shadowRoot.contains(target)) {
      this.open = false;
    }
  }
}

customElements.define('pds-fab', PdsFab);
