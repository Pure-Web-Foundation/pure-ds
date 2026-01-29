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

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#outsideClickBound = this.#onOutsideClick.bind(this);
  }

  static get observedAttributes() {
    return ['open', 'radius', 'spread', 'start-angle'];
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
   * - Bottom-right: 180° (fly left/up)
   * - Bottom-left: 315° (fly right/up)
   * - Top-right: 225° (fly left/down)
   * - Top-left: 45° (fly right/down)
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
   * Array of satellite button configurations
   * @type {Array<{key: string, icon?: string, label?: string, action?: string}>}
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
    }
  }

  connectedCallback() {
    this.#hasCustomRadius = this.hasAttribute('radius');
    this.#hasCustomSpread = this.hasAttribute('spread');
    this.#hasCustomStartAngle = this.hasAttribute('start-angle');
    this.#render();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.#outsideClickBound, true);
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
    // - Bottom-right (default): 180° (fly left/up)
    // - Bottom-left: 315° or -45° (fly right/up) 
    // - Top-right: 225° (fly left/down)
    // - Top-left: 45° (fly right/down)
    
    if (isBottom && isRight) {
      return 180; // Bottom-right → fly left
    } else if (isBottom && !isRight) {
      return 315; // Bottom-left → fly up-right
    } else if (!isBottom && isRight) {
      return 225; // Top-right → fly left-down
    } else {
      return 45; // Top-left → fly right-down
    }
  }

  #render() {
    const count = this.#satellites.length;
    
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

    // Calculate positions along an arc
    const step = count > 1 ? activeSpread / (count - 1) : 0;
    const baseAngle = hasCustomStartAngle || typeof activeStartAngle === 'number'
      ? activeStartAngle
      : this.#detectOptimalAngle();
    const startAngle = hasCustomStartAngle || typeof activeStartAngle === 'number' || count <= 1
      ? baseAngle
      : baseAngle - (activeSpread / 2);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sat-size: 48px;
          --fab-size: 64px;
          --fab-bg: var(--color-primary-600, #0078d4);
          --fab-fg: white;
          --sat-bg: var(--color-surface-elevated, #2a2a2a);
          --sat-fg: var(--color-text-primary, #fff);
          --radius: ${activeRadius}px;
          --transition-duration: 420ms;
          
          position: fixed;
          inset: auto 20px 20px auto;
          z-index: var(--z-notification, 1000);
          display: inline-block;
        }

        .wrap {
          position: relative;
          width: var(--fab-size);
          height: var(--fab-size);
        }

        /* MAIN FAB */
        .fab {
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
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .fab:hover {
          transform: scale(1.05);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 12px 32px rgba(0, 0, 0, 0.3);
        }
        
        .fab:active {
          transform: scale(0.98);
        }

        :host([open]) .fab {
          box-shadow: 
            0 0 0 2px var(--color-accent-400, #0078d4),
            0 4px 16px rgba(0, 120, 212, 0.4);
        }
        
        /* Rotate plus icon 45deg when open to look like X */
        .fab ::slotted(pds-icon) {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        :host([open]) .fab.has-satellites.has-plus ::slotted(pds-icon) {
          transform: rotate(45deg);
        }

        /* SATELLITES */
        .sat {
          position: absolute;
          top: calc((var(--fab-size) - var(--sat-size)) / 2);
          left: calc((var(--fab-size) - var(--sat-size)) / 2);
          inline-size: var(--sat-size);
          block-size: var(--sat-size);
          border-radius: 50%;
          background: var(--sat-bg);
          color: var(--sat-fg);
          box-shadow: 
            0 2px 6px rgba(0, 0, 0, 0.15),
            0 6px 18px rgba(0, 0, 0, 0.2);
          display: grid;
          place-items: center;
          cursor: pointer;
          border: none;
          appearance: none;
          
          transform: translate(0, 0) scale(0.2);
          opacity: 0;
          pointer-events: none;
          
          transition: 
            transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1.4),
            opacity 420ms ease;
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
          pointer-events: none;
        }

        /* Fallback text for satellites without icons */
        .sat-text {
          font-size: 1.25rem;
          font-weight: 600;
          user-select: none;
        }
      </style>
      
      <div class="wrap" role="group" aria-label="Floating actions">
        ${this.#satellites.map((sat, i) => {
          const angleDeg = startAngle + step * i;
          const rad = (angleDeg * Math.PI) / 180;
          const tx = Math.cos(rad) * activeRadius;
          const ty = Math.sin(rad) * activeRadius;
          const delay = 30 * i;
          
          return `
            <button
              class="sat"
              part="satellite"
              style="--tx: ${tx}px; --ty: ${ty}px; transition-delay: ${delay}ms;"
              data-key="${sat.key}"
              aria-label="${sat.label || sat.key}"
              title="${sat.label || sat.key}"
            >
              <slot name="satellite-${sat.key}">
                ${sat.icon 
                  ? `<pds-icon icon="${sat.icon}"></pds-icon>` 
                  : `<span class="sat-text">${(sat.label || sat.key).charAt(0).toUpperCase()}</span>`
                }
              </slot>
            </button>
          `;
        }).join('')}
        
        <button 
          class="fab${count > 0 ? ' has-satellites' : ''}" 
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
    
    // Handle icon swapping when slot content changes (main FAB slot only)
    const fabSlot = this.shadowRoot.querySelector('.fab slot');
    fabSlot?.addEventListener('slotchange', () => this.#updateIconState());
    this.#updateSatelliteTransitionDelays(this.#open);
    requestAnimationFrame(() => this.#updateIconState());
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
    const count = this.#satellites.length;
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
    const sat = this.#satellites.find(s => s.key === key);
    
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
