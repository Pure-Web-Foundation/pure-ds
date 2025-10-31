
import { PDS } from "./pds";
  
export const config = {
  // Design system configuration
  design: {
    ...PDS.defaultConfig,
  },

  // Auto-define configuration for web components
  autoDefine: {
    baseURL: "/auto-define/",
    predefine: ["pds-icon"],
    mapper: (tag) => {
      //console.log(tag)

      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    },

    onError: (tag, err) => {
      console.error(`Auto-define error for <${tag}>:`, err);
    },

    // Critical options for observing dynamically added components
    scanExisting: true, // Scan DOM on initialization
    observeShadows: true, // Observe inside shadow DOMs (for Lit components)
    patchAttachShadow: true, // Intercept attachShadow to observe new shadow roots
    debounceMs: 16, // Debounce for performance
    // Enhancers removed; PDS.defaultEnhancers are applied automatically.
  },
};
