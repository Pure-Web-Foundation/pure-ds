import { enums } from "./pds-enums.js";

/**
 * Design config types (SSoT) - mirror generator input and document output impact.
 * These types are used for validation and live-edit mapping.
 */

/**
 * @typedef {Object} PDSDarkModeColorsConfig
 * @property {string} [background] - Affects dark surface palette and smart surface tokens.
 * @property {string} [primary] - Affects --color-dark-primary-* and interactive dark fills.
 * @property {string} [secondary] - Affects --color-dark-gray-* and dark borders/text.
 * @property {string} [accent] - Affects --color-dark-accent-* and accent interactions.
 */

/**
 * @typedef {Object} PDSColorsConfig
 * @property {string} [primary] - Drives primary scale: --color-primary-50..900 and interactive tokens.
 * @property {string} [secondary] - Drives neutral scale: --color-gray-50..900.
 * @property {string} [accent] - Drives accent scale: --color-accent-50..900.
 * @property {string} [background] - Drives surface shades: --color-surface-* and smart surfaces.
 * @property {string | null} [success] - Drives semantic success scale: --color-success-*.
 * @property {string | null} [warning] - Drives semantic warning scale: --color-warning-*.
 * @property {string | null} [danger] - Drives semantic danger scale: --color-danger-*.
 * @property {string | null} [info] - Drives semantic info scale: --color-info-*.
 * @property {number} [gradientStops] - Affects generated gradient scales.
 * @property {number} [elevationOpacity] - Affects smart surface shadows (opacity).
 * @property {PDSDarkModeColorsConfig} [darkMode] - Overrides dark mode palette generation.
 */

/**
 * @typedef {Object} PDSTypographyConfig
 * @property {string} [fontFamilyHeadings] - Affects --font-family-headings and heading styles.
 * @property {string} [fontFamilyBody] - Affects --font-family-body and body text.
 * @property {string} [fontFamilyMono] - Affects --font-family-mono and code styling.
 * @property {number} [baseFontSize] - Sets base scale for --font-size-*.
 * @property {number} [fontScale] - Controls modular scale for --font-size-*.
 * @property {string | number} [fontWeightLight] - Affects --font-weight-light.
 * @property {string | number} [fontWeightNormal] - Affects --font-weight-normal.
 * @property {string | number} [fontWeightMedium] - Affects --font-weight-medium.
 * @property {string | number} [fontWeightSemibold] - Affects --font-weight-semibold.
 * @property {string | number} [fontWeightBold] - Affects --font-weight-bold.
 * @property {string | number} [lineHeightTight] - Affects --line-height-tight.
 * @property {string | number} [lineHeightNormal] - Affects --line-height-normal.
 * @property {string | number} [lineHeightRelaxed] - Affects --line-height-relaxed.
 * @property {number} [letterSpacingTight] - Affects --letter-spacing-tight.
 * @property {number} [letterSpacingNormal] - Affects --letter-spacing-normal.
 * @property {number} [letterSpacingWide] - Affects --letter-spacing-wide.
 */

/**
 * @typedef {Object} PDSSpatialRhythmConfig
 * @property {number} [baseUnit] - Generates spacing scale --spacing-1..N.
 * @property {number} [scaleRatio] - Reserved for derived spacing systems.
 * @property {number} [maxSpacingSteps] - Caps spacing tokens output.
 * @property {number | string} [containerMaxWidth] - Affects layout container sizing.
 * @property {number} [containerPadding] - Affects container padding tokens.
 * @property {number} [inputPadding] - Affects input padding tokens.
 * @property {number} [buttonPadding] - Affects button padding tokens.
 * @property {number} [sectionSpacing] - Affects section spacing tokens.
 */

/**
 * @typedef {Object} PDSShapeConfig
 * @property {string | number} [radiusSize] - Drives --radius-* scale.
 * @property {string | number | null} [customRadius] - Overrides radius scale base.
 * @property {string | number} [borderWidth] - Drives --border-width-* scale.
 */

/**
 * @typedef {Object} PDSBehaviorConfig
 * @property {string | number} [transitionSpeed] - Drives --transition-* durations.
 * @property {string} [animationEasing] - Drives --ease-* tokens.
 * @property {number | null} [customTransitionSpeed] - Overrides transition durations.
 * @property {string | null} [customEasing] - Overrides easing curve.
 * @property {number} [focusRingWidth] - Affects focus ring thickness.
 * @property {number} [focusRingOpacity] - Affects focus ring opacity.
 * @property {number} [hoverOpacity] - Affects hover overlay opacity.
 */

/**
 * @typedef {Object} PDSLayoutConfig
 * @property {number | string} [maxWidth] - Drives layout max width tokens.
 * @property {{ sm?: number | string, md?: number | string, lg?: number | string, xl?: number | string }} [maxWidths] - Per-breakpoint max widths.
 * @property {number | string} [containerPadding] - Drives layout container padding token.
 * @property {{ sm?: number, md?: number, lg?: number, xl?: number }} [breakpoints] - Drives breakpoint tokens.
 * @property {number} [gridColumns] - Affects grid utilities.
 * @property {number} [gridGutter] - Affects grid gap utilities.
 * @property {number} [densityCompact] - Affects density tokens/utilities.
 * @property {number} [densityNormal] - Affects density tokens/utilities.
 * @property {number} [densityComfortable] - Affects density tokens/utilities.
 * @property {number} [buttonMinHeight] - Affects min-height tokens for buttons.
 * @property {number} [inputMinHeight] - Affects min-height tokens for inputs.
 * @property {number} [baseShadowOpacity] - Affects layout shadow opacity.
 * @property {{ baseShadowOpacity?: number }} [darkMode] - Dark mode shadow opacity overrides.
 * @property {Record<string, any>} [utilities] - Toggles layout utilities generation.
 * @property {Record<string, any>} [gridSystem] - Grid system configuration.
 * @property {number | string} [containerMaxWidth] - Affects container sizing token.
 */

/**
 * @typedef {Object} PDSLayersConfig
 * @property {number} [baseShadowOpacity] - Drives --shadow-* opacity.
 * @property {number} [shadowBlurMultiplier] - Scales shadow blur.
 * @property {number} [shadowOffsetMultiplier] - Scales shadow offsets.
 * @property {string} [shadowDepth] - Base depth style selection.
 * @property {number} [blurLight] - Affects blur tokens.
 * @property {number} [blurMedium] - Affects blur tokens.
 * @property {number} [blurHeavy] - Affects blur tokens.
 * @property {number} [baseZIndex] - Drives z-index token base.
 * @property {number} [zIndexStep] - Drives z-index step scale.
 * @property {number} [zIndexBase]
 * @property {number} [zIndexDropdown]
 * @property {number} [zIndexSticky]
 * @property {number} [zIndexFixed]
 * @property {number} [zIndexModal]
 * @property {number} [zIndexPopover]
 * @property {number} [zIndexTooltip]
 * @property {number} [zIndexNotification]
 * @property {{ baseShadowOpacity?: number }} [darkMode] - Dark mode shadow opacity overrides.
 */

/**
 * @typedef {Object} PDSIconsConfig
 * @property {string} [set] - Icon set name, affects icon resolution.
 * @property {string} [weight] - Default icon weight.
 * @property {number} [defaultSize] - Default icon size token.
 * @property {Record<string, number | string>} [sizes] - Icon size scale tokens.
 * @property {string} [spritePath] - Sprite URL used by icon component.
 * @property {string} [externalPath] - External icon path for on-demand icons.
 * @property {Record<string, string[]>} [include] - Icon allowlist for build.
 */

/**
 * @typedef {Object} PDSEnhancer
 * @property {string} selector
 * @property {string} [description]
 * @property {(element: Element) => void} run
 */

/**
 * @typedef {Object} PDSAutoDefineConfig
 * @property {string[]} [predefine]
 * @property {(tag: string) => (string | undefined | null)} [mapper]
 * @property {PDSEnhancer[]} [enhancers]
 * @property {boolean} [scanExisting]
 * @property {boolean} [observeShadows]
 * @property {boolean} [patchAttachShadow]
 * @property {number} [debounceMs]
 * @property {(error: any) => void} [onError]
 */

/**
 * @typedef {Object} PDSDesignConfig
 * @property {string} [id]
 * @property {string} [name]
 * @property {string[]} [tags]
 * @property {string} [description]
 * @property {Record<string, any>} [options]
 * @property {Record<string, any>} [form]
 * @property {PDSColorsConfig} [colors] - Affects tokens.colors and --color-* variables.
 * @property {PDSTypographyConfig} [typography] - Affects tokens.typography and --font-* variables.
 * @property {PDSSpatialRhythmConfig} [spatialRhythm] - Affects tokens.spacing and --spacing-* variables.
 * @property {PDSShapeConfig} [shape] - Affects tokens.radius/borderWidths and --radius-* variables.
 * @property {PDSBehaviorConfig} [behavior] - Affects tokens.transitions and motion variables.
 * @property {PDSLayoutConfig} [layout] - Affects tokens.layout and layout utilities.
 * @property {PDSLayersConfig} [layers] - Affects tokens.shadows/zIndex and layer effects.
 * @property {Record<string, any>} [advanced]
 * @property {Record<string, any>} [a11y]
 * @property {PDSIconsConfig} [icons] - Affects tokens.icons and icon component behavior.
 * @property {Record<string, any>} [components]
 * @property {number} [gap]
 * @property {boolean} [debug]
 */

/**
 * @typedef {Object} PDSInitConfig
 * @property {string} [mode]
 * @property {string} [preset]
 * @property {PDSDesignConfig} [design]
 * @property {PDSEnhancer[] | Record<string, PDSEnhancer>} [enhancers]
 * @property {boolean} [applyGlobalStyles]
 * @property {boolean} [manageTheme]
 * @property {string} [themeStorageKey]
 * @property {boolean} [preloadStyles]
 * @property {string[]} [criticalLayers]
 * @property {PDSAutoDefineConfig} [autoDefine]
 * @property {string} [managerURL]
 * @property {any} [manager]
 * @property {any} [log]
 */

const __ANY_TYPE__ = "any";

const __DESIGN_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: false,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    description: { type: "string" },
    options: { type: "object", allowUnknown: true },
    form: { type: "object", allowUnknown: true },
    colors: {
      type: "object",
      allowUnknown: false,
      properties: {
        primary: {
          type: "string",
          relations: {
            tokens: [
              "--color-primary-*",
              "--color-primary-fill",
              "--color-primary-text",
              "--background-mesh-*",
            ],
          },
        },
        secondary: {
          type: "string",
          relations: {
            tokens: ["--color-secondary-*", "--color-gray-*", "--background-mesh-*"]
          },
        },
        accent: {
          type: "string",
          relations: {
            tokens: ["--color-accent-*", "--background-mesh-*"]
          },
        },
        background: {
          type: "string",
          relations: {
            tokens: [
              "--color-surface-*",
              "--color-surface-translucent-*",
              "--surface-*-bg",
              "--surface-*-text",
              "--surface-*-text-secondary",
              "--surface-*-text-muted",
              "--surface-*-icon",
              "--surface-*-icon-subtle",
              "--surface-*-shadow",
              "--surface-*-border",
            ],
          },
        },
        success: {
          type: ["string", "null"],
          relations: { tokens: ["--color-success-*"] },
        },
        warning: {
          type: ["string", "null"],
          relations: { tokens: ["--color-warning-*"] },
        },
        danger: {
          type: ["string", "null"],
          relations: { tokens: ["--color-danger-*"] },
        },
        info: {
          type: ["string", "null"],
          relations: { tokens: ["--color-info-*"] },
        },
        gradientStops: { type: "number" },
        elevationOpacity: {
          type: "number",
          relations: { tokens: ["--surface-*-shadow"] },
        },
        darkMode: {
          type: "object",
          allowUnknown: true,
          properties: {
            background: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: [
                  "--color-surface-*",
                  "--color-surface-translucent-*",
                  "--surface-*-bg",
                  "--surface-*-text",
                  "--surface-*-text-secondary",
                  "--surface-*-text-muted",
                  "--surface-*-icon",
                  "--surface-*-icon-subtle",
                  "--surface-*-shadow",
                  "--surface-*-border",
                ],
              },
            },
            primary: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: ["--color-primary-*", "--color-primary-fill", "--color-primary-text"],
              },
            },
            secondary: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: ["--color-secondary-*", "--color-gray-*"]
              },
            },
            accent: {
              type: "string",
              relations: { theme: "dark", tokens: ["--color-accent-*"] },
            },
          },
        },
      },
    },
    typography: {
      type: "object",
      allowUnknown: false,
      properties: {
        fontFamilyHeadings: {
          type: "string",
          relations: { tokens: ["--font-family-headings"] },
        },
        fontFamilyBody: {
          type: "string",
          relations: { tokens: ["--font-family-body"] },
        },
        fontFamilyMono: {
          type: "string",
          relations: { tokens: ["--font-family-mono"] },
        },
        baseFontSize: {
          type: "number",
          relations: { tokens: ["--font-size-*"] },
        },
        fontScale: {
          type: "number",
          relations: { tokens: ["--font-size-*"] },
        },
        fontWeightLight: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-light"] },
        },
        fontWeightNormal: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-normal"] },
        },
        fontWeightMedium: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-medium"] },
        },
        fontWeightSemibold: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-semibold"] },
        },
        fontWeightBold: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-bold"] },
        },
        lineHeightTight: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-tight"] },
        },
        lineHeightNormal: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-normal"] },
        },
        lineHeightRelaxed: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-relaxed"] },
        },
        letterSpacingTight: { type: "number" },
        letterSpacingNormal: { type: "number" },
        letterSpacingWide: { type: "number" },
      },
    },
    spatialRhythm: {
      type: "object",
      allowUnknown: false,
      properties: {
        baseUnit: {
          type: "number",
          relations: { tokens: ["--spacing-*"] },
        },
        scaleRatio: { type: "number" },
        maxSpacingSteps: {
          type: "number",
          relations: { tokens: ["--spacing-*"] },
        },
        containerMaxWidth: { type: ["number", "string"] },
        containerPadding: { type: "number" },
        inputPadding: {
          type: "number",
          relations: {
            rules: [{ selectors: ["input", "textarea", "select"], properties: ["padding"] }],
          },
        },
        buttonPadding: {
          type: "number",
          relations: {
            rules: [{ selectors: ["button", ".btn"], properties: ["padding"] }],
          },
        },
        sectionSpacing: {
          type: "number",
          relations: {
            rules: [{ selectors: ["section"], properties: ["margin", "padding"] }],
          },
        },
      },
    },
    shape: {
      type: "object",
      allowUnknown: false,
      properties: {
        radiusSize: {
          type: ["string", "number"],
          relations: { tokens: ["--radius-*"] },
        },
        customRadius: { type: ["string", "number", "null"] },
        borderWidth: {
          type: ["string", "number"],
          relations: { tokens: ["--border-width-*"] },
        },
      },
    },
    behavior: {
      type: "object",
      allowUnknown: false,
      properties: {
        transitionSpeed: {
          type: ["string", "number"],
          relations: { tokens: ["--transition-*"] },
        },
        animationEasing: { type: "string" },
        customTransitionSpeed: { type: ["number", "null"] },
        customEasing: { type: ["string", "null"] },
        focusRingWidth: {
          type: "number",
          relations: { rules: [{ selectors: [":focus-visible"], properties: ["outline-width", "box-shadow"] }] },
        },
        focusRingOpacity: {
          type: "number",
          relations: { rules: [{ selectors: [":focus-visible"], properties: ["box-shadow", "outline-color"] }] },
        },
        hoverOpacity: { type: "number" },
      },
    },
    layout: {
      type: "object",
      allowUnknown: false,
      properties: {
        maxWidth: {
          type: ["number", "string"],
          relations: { tokens: ["--layout-max-width", "--layout-max-width-*"] },
        },
        maxWidths: {
          type: "object",
          allowUnknown: false,
          properties: {
            sm: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-sm"] } },
            md: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-md"] } },
            lg: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-lg"] } },
            xl: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-xl"] } },
          },
        },
        containerPadding: {
          type: ["number", "string"],
          relations: { tokens: ["--layout-container-padding"] },
        },
        breakpoints: {
          type: "object",
          allowUnknown: false,
          properties: {
            sm: { type: "number" },
            md: { type: "number" },
            lg: { type: "number" },
            xl: { type: "number" },
          },
        },
        gridColumns: { type: "number" },
        gridGutter: { type: "number" },
        densityCompact: { type: "number" },
        densityNormal: { type: "number" },
        densityComfortable: { type: "number" },
        buttonMinHeight: { type: "number" },
        inputMinHeight: { type: "number" },
        baseShadowOpacity: {
          type: "number",
          relations: { tokens: ["--shadow-*"] },
        },
        darkMode: {
          type: "object",
          allowUnknown: true,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } },
          },
        },
        utilities: { type: "object", allowUnknown: true },
        gridSystem: { type: "object", allowUnknown: true },
        containerMaxWidth: { type: ["number", "string"] },
      },
    },
    layers: {
      type: "object",
      allowUnknown: false,
      properties: {
        baseShadowOpacity: {
          type: "number",
          relations: { tokens: ["--shadow-*"] },
        },
        shadowBlurMultiplier: {
          type: "number",
          relations: { tokens: ["--shadow-*"] },
        },
        shadowOffsetMultiplier: {
          type: "number",
          relations: { tokens: ["--shadow-*"] },
        },
        shadowDepth: { type: "string" },
        blurLight: { type: "number" },
        blurMedium: { type: "number" },
        blurHeavy: { type: "number" },
        baseZIndex: { type: "number", relations: { tokens: ["--z-*"] } },
        zIndexStep: { type: "number", relations: { tokens: ["--z-*"] } },
        zIndexBase: { type: "number" },
        zIndexDropdown: { type: "number" },
        zIndexSticky: { type: "number" },
        zIndexFixed: { type: "number" },
        zIndexModal: { type: "number" },
        zIndexPopover: { type: "number" },
        zIndexTooltip: { type: "number" },
        zIndexNotification: { type: "number" },
        darkMode: {
          type: "object",
          allowUnknown: true,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } },
          },
        },
      },
    },
    advanced: { type: "object", allowUnknown: true },
    a11y: { type: "object", allowUnknown: true },
    icons: {
      type: "object",
      allowUnknown: false,
      properties: {
        set: { type: "string" },
        weight: { type: "string" },
        defaultSize: { type: "number", relations: { tokens: ["--icon-size"] } },
        sizes: { type: "object", allowUnknown: true },
        spritePath: { type: "string" },
        externalPath: { type: "string" },
        include: { type: "object", allowUnknown: true },
      },
    },
    components: { type: "object", allowUnknown: true },
    gap: { type: "number" },
    debug: { type: "boolean" },
  },
};

const __INIT_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: true,
  properties: {
    mode: { type: "string" },
    preset: { type: "string" },
    design: { type: "object" },
    enhancers: { type: ["object", "array"] },
    applyGlobalStyles: { type: "boolean" },
    manageTheme: { type: "boolean" },
    themeStorageKey: { type: "string" },
    preloadStyles: { type: "boolean" },
    criticalLayers: { type: "array", items: { type: "string" } },
    autoDefine: { type: "object" },
    managerURL: { type: "string" },
    manager: { type: __ANY_TYPE__ },
    log: { type: __ANY_TYPE__ },
  },
};

function __getValueType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function __matchesExpectedType(value, expected) {
  if (expected === __ANY_TYPE__) return true;
  const actual = __getValueType(value);
  if (Array.isArray(expected)) {
    return expected.includes(actual);
  }
  return actual === expected;
}

function __validateAgainstSpec(value, spec, path, issues) {
  if (!spec) return;
  const expectedType = spec.type || __ANY_TYPE__;
  if (!__matchesExpectedType(value, expectedType)) {
    issues.push({
      path,
      expected: expectedType,
      actual: __getValueType(value),
      message: `Expected ${expectedType} but got ${__getValueType(value)}`,
    });
    return;
  }

  if (expectedType === "array" && spec.items && Array.isArray(value)) {
    value.forEach((item, index) => {
      __validateAgainstSpec(item, spec.items, `${path}[${index}]`, issues);
    });
  }

  if (expectedType === "object" && value && typeof value === "object") {
    const props = spec.properties || {};
    for (const [key, val] of Object.entries(value)) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        if (!spec.allowUnknown) {
          issues.push({
            path: `${path}.${key}`,
            expected: "known property",
            actual: "unknown",
            message: `Unknown property "${key}"`,
          });
        }
        continue;
      }
      __validateAgainstSpec(val, props[key], `${path}.${key}`, issues);
    }
  }
}

function __collectRelations(spec, basePath = "", out = {}) {
  if (!spec || typeof spec !== "object") return out;
  if (spec.relations && basePath) {
    out[basePath] = spec.relations;
  }

  if (spec.type === "object" && spec.properties) {
    Object.entries(spec.properties).forEach(([key, value]) => {
      const nextPath = basePath ? `${basePath}.${key}` : key;
      __collectRelations(value, nextPath, out);
    });
  }

  if (spec.type === "array" && spec.items) {
    const nextPath = `${basePath}[]`;
    __collectRelations(spec.items, nextPath, out);
  }

  return out;
}

/**
 * Machine-readable config relations for live editing.
 * Keys are design config paths (e.g., "colors.accent").
 */
export const PDS_CONFIG_RELATIONS = __collectRelations(
  __DESIGN_CONFIG_SPEC__,
  ""
);

export function validateDesignConfig(designConfig, { log, context = "PDS config" } = {}) {
  if (!designConfig || typeof designConfig !== "object") return [];
  const issues = [];
  __validateAgainstSpec(designConfig, __DESIGN_CONFIG_SPEC__, "design", issues);
  if (issues.length && typeof log === "function") {
    issues.forEach((issue) => {
      log("warn", `[${context}] ${issue.message} at ${issue.path}`);
    });
  }
  return issues;
}

export function validateInitConfig(initConfig, { log, context = "PDS config" } = {}) {
  if (!initConfig || typeof initConfig !== "object") return [];
  const issues = [];
  __validateAgainstSpec(initConfig, __INIT_CONFIG_SPEC__, "config", issues);
  if (issues.length && typeof log === "function") {
    issues.forEach((issue) => {
      log("warn", `[${context}] ${issue.message} at ${issue.path}`);
    });
  }
  return issues;
}

/**
 * Design system presets - pre-configured themes for quick starts.
 * Expose as an object keyed by preset id.
 */
export const presets = {
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    tags: ["playful"],
    description:
      "Fresh and calming ocean-inspired palette with professional undertones",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 3,
    },
    colors: {
      primary: "#0891b2",
      secondary: "#64748b",
      accent: "#06b6d4",
      background: "#f0f9ff",
      darkMode: {
        background: "#0c1821",
        secondary: "#94a3b8",
        primary: "#0891b2", // cyan-600 as base - generates darker 600 shade
      },
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5, // More dramatic scale for breathing room
      fontFamilyHeadings:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontFamilyBody:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    },
    spatialRhythm: {
      baseUnit: 6, // More spacious
      scaleRatio: 1.2,
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge, // Soft, flowing
    },
  },
  "midnight-steel": {
    id: "midnight-steel",
    name: "Midnight Steel",
    description:
      "Bold industrial aesthetic with sharp contrasts and urban edge",
    colors: {
      primary: "#3b82f6",
      secondary: "#52525b",
      accent: "#f59e0b",
      background: "#fafaf9",
      darkMode: {
        background: "#18181b",
        secondary: "#71717a",
        primary: "#3b82f6", // blue-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings:
        "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      fontWeightSemibold: 600,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
    },
    shape: {
      radiusSize: enums.RadiusSizes.small, // Crisp corporate edges
      borderWidth: enums.BorderWidths.thin,
    },
  },
  "neural-glow": {
    id: "neural-glow",
    name: "Neural Glow",
    description:
      "AI-inspired with vibrant purple-blue gradients and futuristic vibes",
    colors: {
      primary: "#8b5cf6",
      secondary: "#6366f1",
      accent: "#ec4899",
      background: "#faf5ff",
      darkMode: {
        background: "#0f0a1a",
        secondary: "#818cf8",
        primary: "#8b5cf6", // violet-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.618, // Golden ratio for futuristic feel
      fontFamilyHeadings: "'Space Grotesk', system-ui, sans-serif",
      fontFamilyBody: "'Space Grotesk', system-ui, sans-serif",
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.5,
    },
    shape: {
      radiusSize: enums.RadiusSizes.xlarge, // Smooth, modern
      borderWidth: enums.BorderWidths.medium,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
    },
  },
  "paper-and-ink": {
    id: "paper-and-ink",
    name: "Paper & Ink",
    tags: ["app", "featured"],
    description: "Ultra-minimal design with focus on typography and whitespace",
    colors: {
      primary: "#171717",
      secondary: "#737373",
      accent: "#525252",
      background: "#ffffff",
      darkMode: {
        background: "#0a0a0a",
        secondary: "#a3a3a3",
        primary: "#737373", // gray-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 18, // Readable, print-like
      fontScale: 1.333, // Perfect fourth
      fontFamilyHeadings: "'Helvetica Neue', 'Arial', sans-serif",
      fontFamilyBody: "'Georgia', 'Times New Roman', serif",
      fontWeightNormal: 400,
      fontWeightBold: 700,
    },
    spatialRhythm: {
      baseUnit: 4, // Tight, compact
      scaleRatio: 1.2,
    },
    shape: {
      radiusSize: enums.RadiusSizes.none, // Sharp editorial
      borderWidth: enums.BorderWidths.thin,
    },
  },
  "sunset-paradise": {
    id: "sunset-paradise",
    name: "Sunset Paradise",
    description: "Warm tropical colors evoking golden hour by the beach",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 2,
    },
    colors: {
      primary: "#ea580c", // Darker orange for better light mode contrast
      secondary: "#d4a373",
      accent: "#fb923c",
      background: "#fffbeb",
      darkMode: {
        background: "#1a0f0a",
        secondary: "#c9a482",
        // Ensure sufficient contrast for primary-filled components with white text in dark mode
        primary: "#f97316", // orange-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.5,
      fontFamilyHeadings: "'Quicksand', 'Comfortaa', sans-serif",
      fontFamilyBody: "'Quicksand', 'Comfortaa', sans-serif",
    },
    spatialRhythm: {
      baseUnit: 6, // Relaxed, vacation vibes
      scaleRatio: 1.5,
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge, // Playful, rounded
      borderWidth: enums.BorderWidths.medium,
    },
  },
  "retro-wave": {
    id: "retro-wave",
    name: "Retro Wave",
    description: "Nostalgic 80s-inspired palette with neon undertones",
    colors: {
      primary: "#c026d3", // Darker fuchsia for better light mode contrast
      secondary: "#a78bfa",
      accent: "#22d3ee",
      background: "#fef3ff",
      darkMode: {
        background: "#1a0a1f",
        secondary: "#c4b5fd",
        // Deepen primary for dark mode to meet AA contrast with white text
        primary: "#d946ef", // fuchsia-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.5,
      fontFamilyHeadings: "'Orbitron', 'Impact', monospace",
      fontFamilyBody: "'Courier New', 'Courier', monospace",
      fontWeightBold: 700,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
    },
    shape: {
      radiusSize: enums.RadiusSizes.none, // Sharp geometric 80s
      borderWidth: enums.BorderWidths.thick, // Bold borders
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant, // Snappy retro feel
    },
  },
  "forest-canopy": {
    id: "forest-canopy",
    name: "Forest Canopy",
    description: "Natural earth tones with organic, calming green hues",
    colors: {
      primary: "#059669",
      secondary: "#78716c",
      accent: "#84cc16",
      background: "#f0fdf4",
      darkMode: {
        background: "#0a1410",
        secondary: "#a8a29e",
        primary: "#10b981", // emerald-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414, // Square root of 2, organic growth
      fontFamilyHeadings: "'Merriweather Sans', 'Arial', sans-serif",
      fontFamilyBody: "'Merriweather', 'Georgia', serif",
    },
    spatialRhythm: {
      baseUnit: 6,
      scaleRatio: 1.3,
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium, // Natural, organic curves
      borderWidth: enums.BorderWidths.thin,
    },
  },
  "ruby-elegance": {
    id: "ruby-elegance",
    name: "Ruby Elegance",
    description: "Sophisticated palette with rich ruby reds and warm accents",
    colors: {
      primary: "#dc2626",
      secondary: "#9ca3af",
      accent: "#be123c",
      background: "#fef2f2",
      darkMode: {
        background: "#1b0808",
        secondary: "#d1d5db",
        primary: "#ef4444", // red-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5,
      fontFamilyHeadings: "'Playfair Display', 'Georgia', serif",
      fontFamilyBody: "'Crimson Text', 'Garamond', serif",
      fontWeightNormal: 400,
      fontWeightSemibold: 600,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.333,
    },
    shape: {
      radiusSize: enums.RadiusSizes.small, // Subtle elegance
      borderWidth: enums.BorderWidths.thin,
    },
  },
  "desert-dawn": {
    id: "desert-dawn",
    name: "Desert Dawn",
    description:
      "Sun-baked neutrals with grounded terracotta and cool oasis accents",
    colors: {
      primary: "#b45309", // terracotta
      secondary: "#a8a29e", // warm gray
      accent: "#0ea5a8", // oasis teal
      background: "#fcf6ef",
      darkMode: {
        background: "#12100e",
        secondary: "#d1d5db",
        // Deepen primary in dark to keep white text AA-compliant
        primary: "#f59e0b", // amber-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414,
      fontFamilyHeadings:
        "'Source Sans Pro', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Source Serif Pro', Georgia, serif",
    },
    spatialRhythm: {
      baseUnit: 6,
      scaleRatio: 1.3,
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.medium,
    },
  },
  "contrast-pro": {
    id: "contrast-pro",
    name: "Contrast Pro",
    description: "Accessibility-first, high-contrast UI with assertive clarity",
    colors: {
      primary: "#1f2937", // slate-800
      secondary: "#111827", // gray-900
      accent: "#eab308", // amber-500
      background: "#ffffff",
      darkMode: {
        background: "#0b0f14",
        secondary: "#9ca3af",
        // Use a lighter primary in dark mode to ensure outline/link text
        // has strong contrast against the very-dark surface. The generator
        // will still pick appropriate darker fill shades for buttons so
        // white-on-fill contrast is preserved.
        primary: "#9ca3af", // gray-400 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.2,
      fontFamilyHeadings:
        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontFamilyBody:
        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontWeightBold: 700,
    },
    spatialRhythm: {
      baseUnit: 3, // compact, data-dense
      scaleRatio: 1.2,
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      borderWidth: enums.BorderWidths.thick,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      focusRingWidth: 4,
    },
  },
  "pastel-play": {
    id: "pastel-play",
    name: "Pastel Play",
    description:
      "Playful pastels with soft surfaces and friendly rounded shapes",
    colors: {
      primary: "#db2777", // raspberry
      secondary: "#a78bfa", // lavender
      accent: "#34d399", // mint
      background: "#fff7fa",
      darkMode: {
        background: "#1a1016",
        secondary: "#c4b5fd",
        primary: "#ec4899", // pink-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings: "'Nunito', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Nunito', system-ui, -apple-system, sans-serif",
      lineHeightRelaxed: enums.LineHeights.relaxed,
    },
    spatialRhythm: {
      baseUnit: 6, // comfy
      scaleRatio: 1.4,
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge,
      borderWidth: enums.BorderWidths.thin,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.slow,
      animationEasing: enums.AnimationEasings["ease-out"],
    },
  },
  "brutalist-tech": {
    id: "brutalist-tech",
    name: "Brutalist Tech",
    description:
      "Stark grayscale with engineered accents and unapologetically bold structure",
    colors: {
      primary: "#111111",
      secondary: "#4b5563",
      accent: "#06b6d4", // cyan signal
      background: "#f8fafc",
      darkMode: {
        background: "#0b0b0b",
        secondary: "#9ca3af",
        // Set a chromatic primary in dark mode to ensure both:
        // - outline/link contrast on dark surface, and
        // - sufficient button fill contrast against white text.
        // Cyan signal aligns with preset accent and produces high-contrast dark fills.
        primary: "#06b6d4", // cyan-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.25,
      fontFamilyHeadings:
        "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      letterSpacingTight: -0.02,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
    },
    shape: {
      radiusSize: enums.RadiusSizes.none,
      borderWidth: enums.BorderWidths.thick,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant,
    },
  },
  "zen-garden": {
    id: "zen-garden",
    name: "Zen Garden",
    description:
      "Soft botanicals with contemplative spacing and balanced motion",
    colors: {
      primary: "#3f6212", // deep olive
      secondary: "#6b7280", // neutral leaf shadow
      accent: "#7c3aed", // iris bloom
      background: "#f7fbef",
      darkMode: {
        background: "#0d130a",
        secondary: "#a3a3a3",
        primary: "#84cc16", // lime-500 - optimized mid-tone
      },
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.414,
      fontFamilyHeadings: "'Merriweather', Georgia, serif",
      fontFamilyBody: "'Noto Sans', system-ui, -apple-system, sans-serif",
    },
    spatialRhythm: {
      baseUnit: 6, // airy
      scaleRatio: 1.35,
    },
    shape: {
      radiusSize: enums.RadiusSizes.large,
      borderWidth: enums.BorderWidths.medium,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.normal,
      animationEasing: enums.AnimationEasings.ease,
    },
  },
  "fitness-pro": {
    id: "fitness-pro",
    name: "Fitness Pro",
    tags: ["app", "featured"],
    description:
      "Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 2,
    },
    colors: {
      primary: "#e91e63", // vibrant pink-magenta for data highlights
      secondary: "#78909c", // cool gray for secondary data
      accent: "#ab47bc", // purple accent for premium features
      background: "#fafafa",
      darkMode: {
        background: "#1a1d21", // deep charcoal like WHOOP
        secondary: "#78909c",
        primary: "#0a4ca4",
      },
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.25,
      fontFamilyHeadings:
        "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody:
        "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.tight,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerPadding: 1.25,
      sectionSpacing: 2.5,
    },
    shape: {
      radiusSize: enums.RadiusSizes.large, // smooth cards and buttons
      borderWidth: enums.BorderWidths.thin,
    },
    layers: {
      shadowDepth: "medium",
      blurMedium: 12,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      focusRingWidth: 2,
    },
  },
  "travel-market": {
    id: "travel-market",
    name: "Travel Market",
    description:
      "Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 3,
    },
    colors: {
      primary: "#d93251", // Darker coral red for better contrast (was #ff385c)
      secondary: "#717171", // neutral gray for text
      accent: "#144990", // teal for experiences/verified
      background: "#ffffff",
      darkMode: {
        background: "#222222",
        secondary: "#b0b0b0",
        primary: "#ff5a7a", // Lighter for dark mode
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.2,
      fontFamilyHeadings:
        "'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody:
        "'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightRelaxed: enums.LineHeights.relaxed,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 1440,
      containerPadding: 1.5,
      sectionSpacing: 3.0,
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin,
    },
    layers: {
      shadowDepth: "light",
      blurLight: 8,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.normal,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      hoverOpacity: 0.9,
    },
  },
  "mobility-app": {
    id: "mobility-app",
    name: "Mobility App",
    tags: ["app", "featured"],
    description:
      "On-demand service platform with bold typography, map-ready colors, and action-driven UI",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 0,
    },
    colors: {
      primary: "#000000", // Uber-inspired black for trust and sophistication
      secondary: "#545454", // mid-gray for secondary elements
      accent: "#06c167", // green for success/confirmation
      background: "#f6f6f6",
      darkMode: {
        background: "#0f0f0f",
        secondary: "#8a8a8a",
        primary: "#06c167", // Use bright green for dark mode buttons (was white)
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.3,
      fontFamilyHeadings:
        "'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody:
        "'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      buttonPadding: 1.25,
      inputPadding: 1.0,
    },
    shape: {
      radiusSize: enums.RadiusSizes.small, // subtle, professional
      borderWidth: enums.BorderWidths.medium,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      focusRingWidth: 3,
    },
    a11y: {
      minTouchTarget: enums.TouchTargetSizes.comfortable,
      focusStyle: enums.FocusStyles.ring,
    },
  },
  "fintech-secure": {
    id: "fintech-secure",
    name: "Fintech Secure",
    description:
      "Financial services app UI with trust-building blues, precise spacing, and security-first design",
    options: {
      liquidGlassEffects: false,
      backgroundMesh: 0,
    },
    colors: {
      primary: "#0a2540", // deep navy for trust and security
      secondary: "#425466", // slate for secondary content
      accent: "#00d4ff", // bright cyan for CTAs
      background: "#f7fafc",
      darkMode: {
        background: "#0a1929",
        secondary: "#8796a5",
        primary: "#00d4ff",
      },
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.25,
      fontFamilyHeadings:
        "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody:
        "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyMono:
        "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 1280,
      sectionSpacing: 2.5,
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin,
    },
    layers: {
      shadowDepth: "light",
      blurLight: 6,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      focusRingWidth: 3,
      focusRingOpacity: 0.4,
    },
    a11y: {
      minTouchTarget: enums.TouchTargetSizes.standard,
      focusStyle: enums.FocusStyles.ring,
    },
  },
  "social-feed": {
    id: "social-feed",
    name: "Social Feed",
    tags: ["app", "featured"],
    description:
      "Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 4,
    },
    colors: {
      primary: "#1877f2", // social blue for links and primary actions
      secondary: "#65676b", // neutral gray for secondary text
      accent: "#fe2c55", // vibrant pink-red for likes/hearts
      background: "#ffffff",
      darkMode: {
        background: "#18191a",
        secondary: "#b0b3b8",
        primary: "#2d88ff",
      },
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.2,
      fontFamilyHeadings:
        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontFamilyBody:
        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.relaxed,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 680,
      sectionSpacing: 1.5,
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      hoverOpacity: 0.85,
    },
  },
  "enterprise-dash": {
    id: "enterprise-dash",
    tags: ["app", "featured"],
    name: "Enterprise Dashboard",
    description:
      "Data-dense business intelligence app interface with organized hierarchy and professional polish",
    options: {
      liquidGlassEffects: false,
    },
    colors: {
      primary: "#0066cc", // corporate blue for primary actions
      secondary: "#5f6368", // neutral gray for text and chrome
      accent: "#1a73e8", // bright blue for highlights
      background: "#ffffff",
      success: "#34a853",
      warning: "#fbbc04",
      danger: "#ea4335",
      darkMode: {
        background: "#202124",
        secondary: "#9aa0a6",
        primary: "#8ab4f8",
      },
    },
    typography: {
      baseFontSize: 14,
      fontScale: 1.2,
      fontFamilyHeadings:
        "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody:
        "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyMono: "'Roboto Mono', ui-monospace, Consolas, monospace",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.tight,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.2,
      containerMaxWidth: 1600,
      containerPadding: 1.5,
      sectionSpacing: 2.0,
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      borderWidth: enums.BorderWidths.thin,
    },
    layers: {
      shadowDepth: "light",
      blurLight: 4,
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      focusRingWidth: 2,
    },
    layout: {
      densityCompact: 0.85,
      gridColumns: 12,
    },
  }
  
};

/**
 * Default configuration for the Pure Design System.
 * This file defines the default settings for colors, typography,
 * spatial rhythm, layers, shape, behavior, layout, advanced options,
 * accessibility, components, and icons.
 */
// Default configuration moved into presets as the canonical "default" entry
presets.default = {
  id: "default",
  name: "Default",
  tags: ["app", "featured"],
  description: "Fresh and modern design system with balanced aesthetics and usability",
  options: {
    liquidGlassEffects: true,
    backgroundMesh: 4,
  },
  
  form: {
    options: {
      widgets: {
        booleans: "toggle",      // 'toggle' | 'toggle-with-icons' | 'checkbox'
        numbers: "input",        // 'input' | 'range'
        selects: "standard",     // 'standard' | 'dropdown'
      },
      layouts: {
        fieldsets: "default",    // 'default' | 'flex' | 'grid' | 'accordion' | 'tabs' | 'card'
        arrays: "default",       // 'default' | 'compact'
      },
      enhancements: {
        icons: true,             // Enable icon-enhanced inputs
        datalists: true,         // Enable datalist autocomplete
        rangeOutput: true,       // Use .range-output for ranges
      },
      validation: {
        showErrors: true,        // Show validation errors inline
        validateOnChange: false, // Validate on every change vs on submit
      },
    }
  },
  colors: {
    // Palette - base colors that generate entire color palettes
    primary: "#0e7490", // Darker cyan for better contrast
    secondary: "#a99b95", // REQUIRED: Secondary/neutral color for gray scale generation
    accent: "#e54271", // Accent color (pink red)
    background: "#e7e6de", // Base background color for light mode

    // Dark mode overrides - specify custom dark theme colors
    darkMode: {
      background: "#16171a", // Custom dark mode background (cool blue-gray)
      secondary: "#8b9199", // Optional: custom dark grays (uses light secondary if omitted)
      primary: "#06b6d4", // cyan-500 - optimized mid-tone
      // accent: null,       // Optional: override accent color for dark mode
    },

    // Semantic colors (auto-generated from primary if not specified)
    success: null, // Auto-generated green from primary if null
    warning: "#B38600", // Warning color (defaults to accent if null)
    danger: null, // Auto-generated red from primary if null
    info: null, // Defaults to primary color if null

    // Advanced color options
    gradientStops: 3,
    elevationOpacity: 0.05,
  },

  typography: {
    // Essential typography settings (exposed in simple form)
    baseFontSize: 16,
    fontScale: 1.2, // Multiplier for heading size generation (1.2 = minor third)
    fontFamilyHeadings:
      'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontFamilyBody: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono:
      'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',

    // Advanced typography options (exposed in advanced form)
    fontWeightLight: enums.FontWeights.light,
    fontWeightNormal: enums.FontWeights.normal,
    fontWeightMedium: enums.FontWeights.medium,
    fontWeightSemibold: enums.FontWeights.semibold,
    fontWeightBold: enums.FontWeights.bold,
    lineHeightTight: enums.LineHeights.tight,
    lineHeightNormal: enums.LineHeights.normal,
    lineHeightRelaxed: enums.LineHeights.relaxed,
    letterSpacingTight: -0.025,
    letterSpacingNormal: 0,
    letterSpacingWide: 0.025,
  },

  spatialRhythm: {
    // Essential spacing setting (exposed in simple form)
    baseUnit: 4, // Base spacing unit in pixels (typically 16 = 1rem)

    // Advanced spacing options
    scaleRatio: 1.25,
    maxSpacingSteps: 32,
    containerMaxWidth: 1200,
    containerPadding: 1.0,
    inputPadding: 0.75,
    buttonPadding: 1.0,
    sectionSpacing: 2.0,
  },

  layers: {
    shadowDepth: "medium",
    blurLight: 4,
    blurMedium: 8,
    blurHeavy: 16,
    zIndexBase: 0,
    zIndexDropdown: 1000,
    zIndexSticky: 1020,
    zIndexFixed: 1030,
    zIndexModal: 1040,
    zIndexPopover: 1050,
    zIndexTooltip: 1060,
    zIndexNotification: 1070,
  },

  shape: {
    radiusSize: enums.RadiusSizes.large,
    borderWidth: enums.BorderWidths.medium,
    customRadius: null,
  },

  behavior: {
    transitionSpeed: enums.TransitionSpeeds.normal,
    animationEasing: enums.AnimationEasings["ease-out"],
    customTransitionSpeed: null,
    customEasing: null,
    focusRingWidth: 3,
    focusRingOpacity: 0.3,
    hoverOpacity: 0.8,
  },

  layout: {
    gridColumns: 12,
    gridGutter: 1.0,
    baseShadowOpacity: 0.1,
    darkMode: {
      baseShadowOpacity: 0.25,
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    densityCompact: 0.8,
    densityNormal: 1.0,
    densityComfortable: 1.2,
    buttonMinHeight: enums.TouchTargetSizes.standard,
    inputMinHeight: 40,

    // Layout utility system
    utilities: {
      grid: true,
      flex: true,
      spacing: true,
      container: true,
    },

    gridSystem: {
      columns: [1, 2, 3, 4, 6],
      autoFitBreakpoints: {
        sm: "150px",
        md: "250px",
        lg: "350px",
        xl: "450px",
      },
      enableGapUtilities: true,
    },

    containerMaxWidth: "1400px",
    containerPadding: "var(--spacing-6)",
  },

  advanced: {
    linkStyle: enums.LinkStyles.inline,
    colorDerivation: "hsl",
  },

  a11y: {
    minTouchTarget: enums.TouchTargetSizes.standard,
    prefersReducedMotion: true,
    focusStyle: enums.FocusStyles.ring,
  },

  icons: {
    set: "phosphor", // https://phosphoricons.com/
    weight: "regular",
    defaultSize: 24,
    externalPath: "/assets/img/icons/", // Path for on-demand external SVG icons
    sizes: enums.IconSizes,
    include: {
      navigation: [
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "arrow-counter-clockwise",
        "caret-left",
        "caret-right",
        "caret-down",
        "caret-up",
        "x",
        "list",
        "list-dashes",
        "dots-three-vertical",
        "dots-three",
        "house",
        "gear",
        "magnifying-glass",
        "funnel",
        "tabs",
        "sidebar",
      ],
      actions: [
        "plus",
        "minus",
        "check",
        "trash",
        "pencil",
        "floppy-disk",
        "copy",
        "download",
        "upload",
        "share",
        "link",
        "eye",
        "eye-slash",
        "heart",
        "star",
        "bookmark",
        "note-pencil",
        "cursor-click",
        "clipboard",
        "magic-wand",
        "sparkle",
      ],
      communication: [
        "envelope",
        "bell",
        "bell-ringing",
        "bell-simple",
        "chat-circle",
        "phone",
        "paper-plane-tilt",
        "user",
        "users",
        "user-gear",
        "at",
      ],
      content: [
        "image",
        "file",
        "file-text",
        "file-css",
        "file-js",
        "folder",
        "folder-open",
        "book-open",
        "camera",
        "video-camera",
        "play",
        "pause",
        "microphone",
        "brackets-curly",
        "code",
        "folder-simple",
        "grid-four",
        "briefcase",
        "chart-line",
        "chart-bar",
        "database",
        "map-pin"
      ],
      status: [
        "info",
        "warning",
        "check-circle",
        "x-circle",
        "question",
        "shield",
        "shield-check",
        "shield-warning",
        "lock",
        "lock-open",
        "fingerprint",
        "circle-notch"
      ],
      time: ["calendar", "clock", "timer", "hourglass"],
      commerce: [
        "shopping-cart",
        "credit-card",
        "currency-dollar",
        "tag",
        "receipt",
        "storefront",
      ],
      formatting: [
        "text-align-left",
        "text-align-center",
        "text-align-right",
        "text-b",
        "text-italic",
        "text-underline",
        "list-bullets",
        "list-numbers",
        "text-aa",
      ],
      system: [
        "cloud",
        "cloud-arrow-up",
        "cloud-arrow-down",
        "desktop",
        "device-mobile",
        "globe",
        "wifi-high",
        "battery-charging",
        "sun",
        "moon",
        "moon-stars",
        "palette",
        "rocket",
        "feather",
        "square",
        "circle",
        "squares-four",
        "lightning",
        "wrench",
      ],
    },
    // Default sprite path for internal/dev use. For consumer apps, icons are exported to
    // [config.static.root]/icons/pds-icons.svg and components should consume from there.
    spritePath: "public/assets/pds/icons/pds-icons.svg",
  },

  gap: 4,

  debug: false,
};
// Note: presets is now a stable object keyed by id

/**
 * Default logging method - can be overridden at config root level
 * This is exported separately so it can be added to the root config object
 * @param {string} level - log level: 'log', 'warn', 'error', 'debug', 'info'
 * @param {string} message - primary message to log
 * @param {...any} data - additional data to log
 */
export function defaultLog(level = "log", message, ...data) {
  // Access debug from 'this' context when called as method, or check for common locations
  const debug = this?.debug || this?.design?.debug || false;
  
  if (debug || level === "error" || level === "warn") {
    const method = console[level] || console.log;
    if (data.length > 0) {
      method(message, ...data);
    } else {
      method(message);
    }
  }
}
