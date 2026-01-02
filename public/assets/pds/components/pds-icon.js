/**
 * SVG Icon Web Component
 * 
 * @element pds-icon
 * 
 * @attr {string} icon - Icon name from the sprite sheet
 * @attr {string|number} size - Icon size in pixels or named size (xs, sm, md, lg, xl, 2xl)
 * @attr {string} color - Icon color (CSS color value, default: currentColor)
 * @attr {string} label - Accessible label for the icon (adds role="img")
 * @attr {string} sprite - Override sprite sheet path
 * @attr {number} rotate - Rotation angle in degrees
 * @attr {boolean} no-sprite - Force fallback icon rendering
 * 
 * @example
 * <pds-icon icon="house"></pds-icon>
 * <pds-icon icon="gear" size="32"></pds-icon>
 * <pds-icon icon="heart" color="red" label="Favorite"></pds-icon>
 * <pds-icon icon="list" size="lg"></pds-icon>
 */

export class SvgIcon extends HTMLElement {
  static observedAttributes = ['icon', 'size', 'color', 'label', 'rotate'];
  
  // Inline fallback icons for critical UI elements (when sprite fails to load)
  static #fallbackIcons = {
    'x': '<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" fill="currentColor"/>',
    
    'house': '<path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" fill="currentColor"/>',
    
    'list': '<path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" fill="currentColor"/>',
    
    'gear': '<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" fill="currentColor"/>',
    
    'magnifying-glass': '<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" fill="currentColor"/>',
    
    'info': '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" fill="currentColor"/>',
    
    'check-circle': '<path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" fill="currentColor"/>',
    
    'warning': '<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" fill="currentColor"/>',
    
    'missing': '<circle cx="128" cy="128" r="96" stroke="currentColor" fill="none" stroke-width="16"/>',
  };

  static spritePromises = new Map();
  static inlineSprites = new Map();

  // Cache for externally fetched SVG icons (icon name -> { content, viewBox, loaded, error })
  static externalIconCache = new Map();
  // Promises for in-flight external icon fetches
  static externalIconPromises = new Map();

  static instances = new Set();

  static #spriteSupport = false;

  static {
    // Precompute sprite support once during class definition to avoid per-instance work.
    SvgIcon.#spriteSupport = SvgIcon.#detectSpriteSupport();
  }

  static #detectSpriteSupport() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    if (!document.createElementNS || typeof window.SVGSVGElement === 'undefined') {
      return false;
    }

    const docEl = document.documentElement;
    const hasNoSpriteFlag = Boolean(docEl && docEl.dataset && Object.prototype.hasOwnProperty.call(docEl.dataset, 'pdsNoSprite'));
    const globalDisable = Boolean(
      window.__PDS_DISABLE_SVG_SPRITES === true ||
      window.PDS_DISABLE_SVG_SPRITES === true ||
      hasNoSpriteFlag
    );

    if (globalDisable) {
      return false;
    }

    try {
      const svgNS = 'http://www.w3.org/2000/svg';
      const xlinkNS = 'http://www.w3.org/1999/xlink';

      const svg = document.createElementNS(svgNS, 'svg');
      const use = document.createElementNS(svgNS, 'use');
      svg.appendChild(use);

      use.setAttribute('href', '#__pds_sprite_test__');
      use.setAttributeNS(xlinkNS, 'xlink:href', '#__pds_sprite_test__');

      const hasUseInterface = typeof window.SVGUseElement !== 'undefined' && use instanceof SVGUseElement;
      const hrefProperty = Boolean(use.href && typeof use.href.baseVal === 'string');
      const hrefAttribute =
        use.getAttribute('href') === '#__pds_sprite_test__' ||
        use.getAttributeNS(xlinkNS, 'href') === '#__pds_sprite_test__' ||
        use.getAttribute('xlink:href') === '#__pds_sprite_test__';

      return Boolean(hasUseInterface && (hrefProperty || hrefAttribute));
    } catch (error) {
      return false;
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    SvgIcon.instances.add(this);
    this.render();
  }

  disconnectedCallback() {
    SvgIcon.instances.delete(this);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  render() {
    const icon = this.getAttribute('icon') || 'missing';
    const sizeAttr = this.getAttribute('size') || '24';
    const color = this.getAttribute('color') || 'currentColor';
    const label = this.getAttribute('label');
    const spriteOverride = this.getAttribute('sprite');
    const rotate = this.getAttribute('rotate') || '0';
    
    // Parse size - can be number (px) or named size (xs, sm, md, lg, xl, 2xl)
    const namedSizes = {
      'xs': '16',
      'sm': '20',
      'md': '24',
      'lg': '32',
      'xl': '48',
      '2xl': '64',
    };
    const size = namedSizes[sizeAttr] || sizeAttr;
    
    // Compute sprite href: prefer relative to this module (../pds-icons.svg), allow override via `sprite` attr
    let spriteHref;
    try {
      const url = new URL('../icons/pds-icons.svg', import.meta.url);
      spriteHref = url.href;
    } catch (e) {
      // Fallback (should rarely happen)
      const origin = typeof window !== 'undefined' && window.location ? window.location.origin : '';
      spriteHref = `${origin}/icons/pds-icons.svg`;
    }
    if (spriteOverride) spriteHref = spriteOverride;

    // Normalize overrides to absolute URLs when possible
    try {
      if (typeof spriteHref === 'string') {
        const normalized = new URL(spriteHref, typeof window !== 'undefined' ? window.location.href : undefined);
        spriteHref = normalized.href;
      }
    } catch (e) {
      // leave spriteHref as-is if URL construction fails
    }

    // Determine if we should use sprite or fallback
    let useFallback = this.hasAttribute('no-sprite') || !this.spriteAvailable();

    let effectiveHref = spriteHref ? `${spriteHref}#${icon}` : `#${icon}`;
    let inlineSymbolContent = null;
    let inlineSymbolViewBox = null;
    let inlineSymbolPreserveAspectRatio = null;
    let useExternalIcon = false;
    let externalIconData = null;
    let spriteIconNotFound = false;
    let spriteStillLoading = false;

    if (!useFallback && typeof window !== 'undefined' && spriteHref) {
      try {
        const spriteURL = new URL(spriteHref, window.location.href);
        const spriteKey = spriteURL.href;
        const inlineSpriteData = SvgIcon.inlineSprites.get(spriteKey);

        // For both same-origin and cross-origin, we inline the sprite to verify icon existence
        if (inlineSpriteData && inlineSpriteData.loaded) {
          const symbolData = inlineSpriteData.symbols.get(icon);
          if (symbolData) {
            inlineSymbolContent = symbolData.content;
            inlineSymbolViewBox = symbolData.viewBox;
            inlineSymbolPreserveAspectRatio = symbolData.preserveAspectRatio;
          } else {
            spriteIconNotFound = true;
          }
        } else if (inlineSpriteData && inlineSpriteData.error) {
          spriteIconNotFound = true;
        } else {
          SvgIcon.ensureInlineSprite(spriteKey);
          spriteStillLoading = true;
          useFallback = true;
        }
      } catch (e) {
        // Ignore URL errors and fall back to default behaviour
      }
    }

    // If icon not found in sprite (or we're using fallback), try external icon
    // Skip external fetch for known fallback icons
    // IMPORTANT: Don't try external icons while sprite is still loading
    const hasFallback = SvgIcon.#fallbackIcons.hasOwnProperty(icon);
    if (spriteIconNotFound && !hasFallback && !spriteStillLoading) {
      const cached = SvgIcon.externalIconCache.get(icon);
      if (cached) {
        if (cached.loaded && cached.content) {
          useExternalIcon = true;
          externalIconData = cached;
        } else if (cached.error) {
          // External fetch failed, use fallback
          useFallback = true;
        }
      } else {
        // Trigger async fetch - will re-render when complete
        SvgIcon.fetchExternalIcon(icon);
        useFallback = true;
      }
    }

    // If sprite icon not found and external didn't work, use fallback
    if (spriteIconNotFound && !useExternalIcon) {
      useFallback = true;
    }
    
    // Build transform string for rotation
    const transform = rotate !== '0' ? `rotate(${rotate} 128 128)` : '';
    const defaultViewBox = '0 0 256 256';
    
    // Determine viewBox: external icons may have different viewBox (often 24x24)
    let viewBox = defaultViewBox;
    let preserveAspectRatioAttr = '';
    
    if (useExternalIcon && externalIconData) {
      viewBox = externalIconData.viewBox || '0 0 24 24';
      if (externalIconData.preserveAspectRatio) {
        preserveAspectRatioAttr = ` preserveAspectRatio="${externalIconData.preserveAspectRatio}"`;
      }
    } else if (inlineSymbolViewBox) {
      viewBox = inlineSymbolViewBox;
      if (inlineSymbolPreserveAspectRatio) {
        preserveAspectRatioAttr = ` preserveAspectRatio="${inlineSymbolPreserveAspectRatio}"`;
      }
    }

    const hasInlineSymbol = inlineSymbolContent !== null;
    
    // Determine symbol markup based on priority: external > inline sprite > use href > fallback
    let symbolMarkup;
    if (useExternalIcon && externalIconData?.content) {
      symbolMarkup = externalIconData.content;
    } else if (useFallback) {
      symbolMarkup = this.#getFallbackIcon(icon);
    } else if (hasInlineSymbol) {
      symbolMarkup = inlineSymbolContent;
    } else {
      symbolMarkup = `<use href="${effectiveHref}"></use>`;
    }
    
    this.shadowRoot.innerHTML = `
      <svg
        width="${size}"
        height="${size}"
        fill="${color}"
        aria-hidden="${!label}"
        ${label ? `role="img" aria-label="${label}"` : ''}
        style="display: inline-block; vertical-align: middle; flex-shrink: 0;"
        viewBox="${viewBox}"
        ${preserveAspectRatioAttr}
      >
        <g transform="${transform}">
          ${symbolMarkup}
        </g>
      </svg>
    `;
  }
  
  #getFallbackIcon(name) {
    return SvgIcon.#fallbackIcons[name] || SvgIcon.#fallbackIcons['missing'];
  }
  
  /**
   * Check if sprite sheet is available
   * @method spriteAvailable
   * @public
   * @returns {boolean} True if sprite sheet should be used
   */
  spriteAvailable() {
    return SvgIcon.#spriteSupport;
  }

  /**
   * Get the external icons path from PDS config or use default
   * @private
   * @returns {string} The base path for external SVG icons
   */
  static getExternalIconPath() {
    try {
      // Try to get from PDS.compiled.tokens.icons.externalPath (live mode)
      if (typeof window !== 'undefined' && window.PDS?.compiled?.tokens?.icons?.externalPath) {
        return window.PDS.compiled.tokens.icons.externalPath;
      }
      // Fallback: check compiled.config.design.icons.externalPath
      if (typeof window !== 'undefined' && window.PDS?.compiled?.config?.design?.icons?.externalPath) {
        return window.PDS.compiled.config.design.icons.externalPath;
      }
      // Fallback: check currentConfig
      if (typeof window !== 'undefined' && window.PDS?.currentConfig?.design?.icons?.externalPath) {
        return window.PDS.currentConfig.design.icons.externalPath;
      }
    } catch (e) {
      // Ignore errors accessing config
    }
    // Default path
    return '/assets/img/icons/';
  }

  /**
   * Fetch an external SVG icon and cache it
   * @param {string} iconName - The icon name (without .svg extension)
   * @returns {Promise<boolean>} True if successfully fetched
   */
  static async fetchExternalIcon(iconName) {
    if (!iconName || typeof document === 'undefined') {
      return false;
    }

    // Check if already cached
    const cached = SvgIcon.externalIconCache.get(iconName);
    if (cached) {
      return cached.loaded;
    }

    // Check if fetch is already in progress
    if (SvgIcon.externalIconPromises.has(iconName)) {
      return SvgIcon.externalIconPromises.get(iconName);
    }

    const basePath = SvgIcon.getExternalIconPath();
    const iconUrl = `${basePath}${iconName}.svg`;

    const promise = fetch(iconUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${response.status} ${response.statusText}`);
        }
        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = doc.querySelector('svg');

        if (!svg) {
          throw new Error('Invalid SVG: no <svg> element found');
        }

        // Extract viewBox and content
        const viewBox = svg.getAttribute('viewBox') || '0 0 24 24';
        const preserveAspectRatio = svg.getAttribute('preserveAspectRatio');
        
        // Serialize the inner content
        const serializer = new XMLSerializer();
        const content = Array.from(svg.childNodes)
          .map((node) => serializer.serializeToString(node))
          .join('');

        SvgIcon.externalIconCache.set(iconName, {
          loaded: true,
          error: false,
          content,
          viewBox,
          preserveAspectRatio,
        });

        SvgIcon.notifyInstances();
        return true;
      })
      .catch((error) => {
        // Only log if not a 404 (expected for non-existent icons)
        if (!error.message?.includes('404')) {
          console.debug('[pds-icon] External icon not found:', iconName, error.message);
        }
        SvgIcon.externalIconCache.set(iconName, {
          loaded: false,
          error: true,
          content: null,
          viewBox: null,
          preserveAspectRatio: null,
        });
        SvgIcon.notifyInstances();
        return false;
      })
      .finally(() => {
        SvgIcon.externalIconPromises.delete(iconName);
      });

    SvgIcon.externalIconPromises.set(iconName, promise);
    return promise;
  }

  static async ensureInlineSprite(spriteURL) {
    if (!spriteURL || typeof document === 'undefined') {
      return false;
    }

    const existingInline = SvgIcon.inlineSprites.get(spriteURL);
    if (existingInline) {
      if (existingInline.loaded) {
        return true;
      }
      if (existingInline.error) {
        return false;
      }
    }

    if (SvgIcon.spritePromises.has(spriteURL)) {
      return SvgIcon.spritePromises.get(spriteURL);
    }

    const promise = fetch(spriteURL, { mode: 'cors' })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load sprite: ${response.status} ${response.statusText}`);
        }
        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const symbols = doc.querySelectorAll('symbol[id]');

        if (!symbols.length) {
          throw new Error('Sprite does not contain any <symbol> definitions');
        }
        const serializer = new XMLSerializer();
        const symbolMap = new Map();

        symbols.forEach((symbol) => {
          const originalId = symbol.getAttribute('id');
          if (!originalId) {
            return;
          }

          const clone = symbol.cloneNode(true);
          clone.removeAttribute('id');

          const childMarkup = Array.from(clone.childNodes)
            .map((node) => serializer.serializeToString(node))
            .join('');

          const viewBox = symbol.getAttribute('viewBox');
          const preserveAspectRatio = symbol.getAttribute('preserveAspectRatio');

          symbolMap.set(originalId, {
            content: childMarkup,
            viewBox,
            preserveAspectRatio,
          });
        });

        if (!symbolMap.size) {
          throw new Error('Sprite does not contain any <symbol> definitions with valid ids');
        }

        SvgIcon.inlineSprites.set(spriteURL, { loaded: true, error: false, symbols: symbolMap });
        SvgIcon.notifyInstances();
        return true;
      })
      .catch((error) => {
        console.warn('[pds-icon] Unable to inline sprite:', error);
        SvgIcon.inlineSprites.set(spriteURL, { loaded: false, error: true, symbols: new Map() });
        SvgIcon.notifyInstances();
        return false;
      })
      .finally(() => {
        SvgIcon.spritePromises.delete(spriteURL);
      });

    SvgIcon.spritePromises.set(spriteURL, promise);
    return promise;
  }
  static notifyInstances() {
    SvgIcon.instances.forEach((instance) => {
      if (instance && instance.isConnected) {
        instance.render();
      }
    });
  }
}

// Auto-register the component
if (!customElements.get('pds-icon')) {
  customElements.define('pds-icon', SvgIcon);
}
