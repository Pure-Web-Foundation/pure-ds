
// ============================================================================
// PDS REGISTRY - Global mode manager for live vs static mode
// ============================================================================

class PDSRegistry {
  constructor() {
    this._mode = "static"; // Default to static mode
    this._designer = null;
    this._staticPaths = {
      tokens: "/assets/pds/styles/pds-tokens.css.js",
      primitives: "/assets/pds/styles/pds-primitives.css.js",
      components: "/assets/pds/styles/pds-components.css.js",
      utilities: "/assets/pds/styles/pds-utilities.css.js",
      styles: "/assets/pds/styles/pds-styles.css.js",
    };
  }

  /**
   * Set the designer instance and switch to live mode
   */
  setDesigner(designer, meta = {}) {
    this._designer = designer;
    this._mode = "live";
    const presetName = meta?.presetName;
    if (presetName) {
      designer?.options?.log?.("log", `PDS live with preset "${presetName}"`);
    } else {
      designer?.options?.log?.("log", "PDS live with custom config");
    }
  }

  /**
   * Switch to static mode with custom paths
   * Called by consumers who want to use static CSS files
   */
  setStaticMode(paths = {}) {
    this._mode = "static";
    this._staticPaths = { ...this._staticPaths, ...paths };
    // Note: No access to config in static mode, using console
    console.log("[PDS Registry] Switched to STATIC mode", this._staticPaths);
  }

  /**
   * Get stylesheet for adoption in shadow DOM
   * Returns CSSStyleSheet object (constructable stylesheet)
   */
  async getStylesheet(layer) {
    if (this._mode === "live" && this._designer) {
      // Return constructable stylesheet from live designer
      switch (layer) {
        case "tokens":
          return this._designer.tokensStylesheet;
        case "primitives":
          return this._designer.primitivesStylesheet;
        case "components":
          return this._designer.componentsStylesheet;
        case "utilities":
          return this._designer.utilitiesStylesheet;
        default:
          this._designer?.options?.log?.("warn", `[PDS Registry] Unknown layer: ${layer}`);
          return null;
      }
    } else {
      // Import from static path
      try {
        const module = await import(this._staticPaths[layer]);
        return module[layer]; // Return exported stylesheet
      } catch (error) {
        // No access to config in static mode, fall back to console
        console.error(`[PDS Registry] Failed to load static ${layer}:`, error);
        console.error(`[PDS Registry] Looking for: ${this._staticPaths[layer]}`);
        console.error(`[PDS Registry] Make sure you've run 'npm run pds:export' and configured PDS.start() with the correct static.root path`);
        // Return empty stylesheet as fallback
        const fallback = new CSSStyleSheet();
        fallback.replaceSync("/* Failed to load " + layer + " */");
        return fallback;
      }
    }
  }

  // /**
  //  * Get BLOB URL for a layer (live mode only)
  //  * Used for @import statements in CSS
  //  */
  // getBlobURL(layer) {
  //   if (this._mode === "live" && this._designer) {
  //     switch (layer) {
  //       case "tokens":
  //         return this._designer.tokensBlobURL;
  //       case "primitives":
  //         return this._designer.primitivesBlobURL;
  //       case "components":
  //         return this._designer.componentsBlobURL;
  //       case "utilities":
  //         return this._designer.utilitiesBlobURL;
  //       case "styles":
  //         return this._designer.stylesBlobURL;
  //       default:
  //         return null;
  //     }
  //   }
  //   return null;
  // }

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
    return this._mode === "live" && this._designer !== null;
  }

  /**
   * Check if designer is available
   */
  get hasDesigner() {
    return this._designer !== null;
  }
}

// Export singleton instance
export const registry = new PDSRegistry();
