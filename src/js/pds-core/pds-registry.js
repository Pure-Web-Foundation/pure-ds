
// ============================================================================
// PDS REGISTRY - Global mode manager for live vs static mode
// ============================================================================

class PDSRegistry {
  constructor() {
    this._mode = "static"; // Default to static mode
    this._staticPaths = {
      tokens: "/assets/pds/styles/pds-tokens.css.js",
      primitives: "/assets/pds/styles/pds-primitives.css.js",
      components: "/assets/pds/styles/pds-components.css.js",
      utilities: "/assets/pds/styles/pds-utilities.css.js",
      styles: "/assets/pds/styles/pds-styles.css.js",
    };
  }

  /**
   * Switch to live mode
   */
  setLiveMode() {
    this._mode = "live";
  }

  /**
   * Switch to static mode with custom paths
   * Called by consumers who want to use static CSS files
   */
  setStaticMode(paths = {}) {
    this._mode = "static";
    this._staticPaths = { ...this._staticPaths, ...paths };
  }

  /**
   * Get stylesheet for adoption in shadow DOM
   * Returns CSSStyleSheet object (constructable stylesheet)
   */
  async getStylesheet(layer) {
    if (this._mode === "live") {
      // In live mode, stylesheets should be retrieved from Generator.instance
      // If we are here, it means adoptLayers fell back or something is wrong
      return null;
    } else {
      // Import from static path
      try {
        const module = await import(/* @vite-ignore */ this._staticPaths[layer]);
        return module[layer]; // Return exported stylesheet
      } catch (error) {
        // No access to config in static mode, fall back to console
        console.error(`[PDS Registry] Failed to load static ${layer}:`, error);
        console.error(`[PDS Registry] Looking for: ${this._staticPaths[layer]}`);
        console.error(`[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path`);
        // Return empty stylesheet as fallback
        const fallback = new CSSStyleSheet();
        fallback.replaceSync("/* Failed to load " + layer + " */");
        return fallback;
      }
    }
  }

  /**
   * Get current mode
   */
  get mode() {
    return this._mode;
  }

  /**
   * Check if in live mode
   */
  get isLive() {
    return this._mode === "live";
  }
}

// Export singleton instance
export const registry = new PDSRegistry();
