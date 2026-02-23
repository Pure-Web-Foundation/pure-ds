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
 * @typedef {Object} PDSDesignOptionsConfig
 * @property {boolean} [liquidGlassEffects]
 * @property {number} [backgroundMesh]
 */

/**
 * @typedef {Object} PDSFormOptionsWidgetsConfig
 * @property {"toggle"|"toggle-with-icons"|"checkbox"} [booleans]
 * @property {"input"|"range"} [numbers]
 * @property {"standard"|"dropdown"} [selects]
 */

/**
 * @typedef {Object} PDSFormOptionsLayoutsConfig
 * @property {"default"|"flex"|"grid"|"accordion"|"tabs"|"card"} [fieldsets]
 * @property {"default"|"compact"} [arrays]
 */

/**
 * @typedef {Object} PDSFormOptionsEnhancementsConfig
 * @property {boolean} [icons]
 * @property {boolean} [datalists]
 * @property {boolean} [rangeOutput]
 * @property {boolean} [colorInput]
 */

/**
 * @typedef {Object} PDSFormOptionsValidationConfig
 * @property {boolean} [showErrors]
 * @property {boolean} [validateOnChange]
 */

/**
 * @typedef {Object} PDSFormOptionsConfig
 * @property {PDSFormOptionsWidgetsConfig} [widgets]
 * @property {PDSFormOptionsLayoutsConfig} [layouts]
 * @property {PDSFormOptionsEnhancementsConfig} [enhancements]
 * @property {PDSFormOptionsValidationConfig} [validation]
 */

/**
 * @typedef {Object} PDSFormConfig
 * @property {PDSFormOptionsConfig} [options]
 */

/**
 * @typedef {Object} PDSAdvancedConfig
 * @property {string} [linkStyle]
 * @property {string} [colorDerivation]
 */

/**
 * @typedef {Object} PDSA11yConfig
 * @property {string | number} [minTouchTarget]
 * @property {boolean} [prefersReducedMotion]
 * @property {string} [focusStyle]
 */

/**
 * @typedef {Object} PDSConfigEditorFieldMetadata
 * @property {string} [label]
 * @property {string} [description]
 * @property {string} [widget]
 * @property {string} [icon]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [step]
 * @property {string[]} [enum]
 * @property {string} [placeholder]
 * @property {number} [maxLength]
 * @property {number} [rows]
 * @property {Record<string, any>} [options]
 */

/**
 * @typedef {Object} PDSDesignConfig
 * @property {string} [id]
 * @property {string} [name]
 * @property {string[]} [tags]
 * @property {string[]} [themes]
 * @property {string} [description]
 * @property {PDSDesignOptionsConfig} [options]
 * @property {PDSFormConfig} [form]
 * @property {PDSColorsConfig} [colors] - Affects tokens.colors and --color-* variables.
 * @property {PDSTypographyConfig} [typography] - Affects tokens.typography and --font-* variables.
 * @property {PDSSpatialRhythmConfig} [spatialRhythm] - Affects tokens.spacing and --spacing-* variables.
 * @property {PDSShapeConfig} [shape] - Affects tokens.radius/borderWidths and --radius-* variables.
 * @property {PDSBehaviorConfig} [behavior] - Affects tokens.transitions and motion variables.
 * @property {PDSLayoutConfig} [layout] - Affects tokens.layout and layout utilities.
 * @property {PDSLayersConfig} [layers] - Affects tokens.shadows/zIndex and layer effects.
 * @property {PDSAdvancedConfig} [advanced]
 * @property {PDSA11yConfig} [a11y]
 * @property {PDSIconsConfig} [icons] - Affects tokens.icons and icon component behavior.
 * @property {Record<string, any>} [components]
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
 * @property {boolean} [liveEdit]
 * @property {any} [log]
 */

const __ANY_TYPE__ = "any";

const __DESIGN_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: false,
  properties: {
    id: { type: "string", minLength: 1, maxLength: 64 },
    name: { type: "string", minLength: 1, maxLength: 80 },
    tags: { type: "array", uniqueItems: true, items: { type: "string" } },
    themes: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        oneOf: [
          { const: "light", title: "Light" },
          { const: "dark", title: "Dark" },
          { const: "system", title: "System" },
        ],
      },
    },
    description: { type: "string", maxLength: 500 },
    options: {
      type: "object",
      allowUnknown: true,
      properties: {
        liquidGlassEffects: { type: "boolean" },
        backgroundMesh: { type: "number" },
      },
    },
    form: {
      type: "object",
      allowUnknown: true,
      properties: {
        options: {
          type: "object",
          allowUnknown: true,
          properties: {
            widgets: {
              type: "object",
              allowUnknown: false,
              properties: {
                booleans: { type: "string" },
                numbers: { type: "string" },
                selects: { type: "string" },
              },
            },
            layouts: {
              type: "object",
              allowUnknown: false,
              properties: {
                fieldsets: { type: "string" },
                arrays: { type: "string" },
              },
            },
            enhancements: {
              type: "object",
              allowUnknown: false,
              properties: {
                icons: { type: "boolean" },
                datalists: { type: "boolean" },
                rangeOutput: { type: "boolean" },
                colorInput: { type: "boolean" },
              },
            },
            validation: {
              type: "object",
              allowUnknown: false,
              properties: {
                showErrors: { type: "boolean" },
                validateOnChange: { type: "boolean" },
              },
            },
          },
        },
      },
    },
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
          allowUnknown: false,
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
          allowUnknown: false,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } },
          },
        },
        utilities: {
          type: "object",
          allowUnknown: true,
          properties: {
            grid: { type: "boolean" },
            flex: { type: "boolean" },
            spacing: { type: "boolean" },
            container: { type: "boolean" },
          },
        },
        gridSystem: {
          type: "object",
          allowUnknown: true,
          properties: {
            columns: { type: "array", items: { type: "number" } },
            autoFitBreakpoints: {
              type: "object",
              allowUnknown: false,
              properties: {
                sm: { type: "string" },
                md: { type: "string" },
                lg: { type: "string" },
                xl: { type: "string" },
              },
            },
            enableGapUtilities: { type: "boolean" },
          },
        },
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
          allowUnknown: false,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } },
          },
        },
      },
    },
    advanced: {
      type: "object",
      allowUnknown: true,
      properties: {
        linkStyle: { type: "string" },
        colorDerivation: { type: "string" },
      },
    },
    a11y: {
      type: "object",
      allowUnknown: true,
      properties: {
        minTouchTarget: { type: ["string", "number"] },
        prefersReducedMotion: { type: "boolean" },
        focusStyle: { type: "string" },
      },
    },
    icons: {
      type: "object",
      allowUnknown: false,
      properties: {
        set: { type: "string" },
        weight: { type: "string" },
        defaultSize: { type: "number", relations: { tokens: ["--icon-size"] } },
        sizes: {
          type: "object",
          allowUnknown: true,
          properties: {
            xs: { type: ["number", "string"] },
            sm: { type: ["number", "string"] },
            md: { type: ["number", "string"] },
            lg: { type: ["number", "string"] },
            xl: { type: ["number", "string"] },
            "2xl": { type: ["number", "string"] },
          },
        },
        spritePath: { type: "string" },
        externalPath: { type: "string" },
        include: {
          type: "object",
          allowUnknown: true,
          properties: {
            navigation: { type: "array", items: { type: "string" } },
            actions: { type: "array", items: { type: "string" } },
            communication: { type: "array", items: { type: "string" } },
            content: { type: "array", items: { type: "string" } },
            status: { type: "array", items: { type: "string" } },
            time: { type: "array", items: { type: "string" } },
            commerce: { type: "array", items: { type: "string" } },
            formatting: { type: "array", items: { type: "string" } },
            system: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
    components: { type: "object", allowUnknown: true },
    debug: { type: "boolean" },
  },
};

const __INIT_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: true,
  properties: {
    mode: { type: "string" },
    preset: { type: "string" },
    design: __DESIGN_CONFIG_SPEC__,
    enhancers: { type: ["object", "array"] },
    applyGlobalStyles: { type: "boolean" },
    manageTheme: { type: "boolean" },
    themeStorageKey: { type: "string" },
    preloadStyles: { type: "boolean" },
    criticalLayers: { type: "array", items: { type: "string" } },
    autoDefine: {
      type: "object",
      allowUnknown: false,
      properties: {
        predefine: { type: "array", items: { type: "string" } },
        mapper: { type: __ANY_TYPE__ },
        enhancers: { type: ["object", "array"] },
        scanExisting: { type: "boolean" },
        observeShadows: { type: "boolean" },
        patchAttachShadow: { type: "boolean" },
        debounceMs: { type: "number" },
        onError: { type: __ANY_TYPE__ },
        baseURL: { type: "string" },
      },
    },
    managerURL: { type: "string" },
    manager: { type: __ANY_TYPE__ },
    liveEdit: { type: "boolean" },
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

export const PDS_DESIGN_CONFIG_SPEC = __DESIGN_CONFIG_SPEC__;

const __CONFIG_EDITOR_METADATA_OVERRIDES__ = {
  "colors.primary": { widget: "input-color" },
  "colors.secondary": { widget: "input-color" },
  "colors.accent": { widget: "input-color" },
  "colors.background": { widget: "input-color" },
  "colors.success": { widget: "input-color" },
  "colors.warning": { widget: "input-color" },
  "colors.danger": { widget: "input-color" },
  "colors.info": { widget: "input-color" },
  "colors.gradientStops": { min: 2, max: 8, step: 1, widget: "range" },
  "colors.elevationOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "colors.darkMode.background": { widget: "input-color" },
  "colors.darkMode.primary": { widget: "input-color" },
  "colors.darkMode.secondary": { widget: "input-color" },
  "colors.darkMode.accent": { widget: "input-color" },

  "description": {
    widget: "textarea",
    maxLength: 500,
    rows: 4,
    placeholder: "Summarize the visual and interaction intent",
  },

  "typography.fontFamilyHeadings": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Heading font stack",
  },
  "typography.fontFamilyBody": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Body font stack",
  },
  "typography.fontFamilyMono": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Monospace font stack",
  },
  "typography.baseFontSize": { min: 8, max: 32, step: 1, widget: "input-range" },
  "typography.fontScale": { min: 1, max: 2, step: 0.01, widget: "range" },
  "typography.fontWeightLight": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightNormal": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightMedium": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightSemibold": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightBold": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.lineHeightTight": { min: 0.75, max: 3, step: 0.001, widget: "input-range" },
  "typography.lineHeightNormal": { min: 0.75, max: 3, step: 0.001, widget: "input-range" },
  "typography.lineHeightRelaxed": { min: 0.75, max: 3, step: 0.001, widget: "input-range" },
  "typography.letterSpacingTight": { min: -0.1, max: 0.1, step: 0.001, widget: "range" },
  "typography.letterSpacingNormal": { min: -0.1, max: 0.1, step: 0.001, widget: "range" },
  "typography.letterSpacingWide": { min: -0.1, max: 0.1, step: 0.001, widget: "range" },

  "spatialRhythm.baseUnit": { min: 1, max: 16, step: 1, widget: "range" },
  "spatialRhythm.scaleRatio": { min: 1, max: 2, step: 0.01, widget: "range" },
  "spatialRhythm.maxSpacingSteps": { min: 4, max: 64, step: 1, widget: "range" },
  "spatialRhythm.containerPadding": { min: 0, max: 8, step: 0.05, widget: "range" },
  "spatialRhythm.inputPadding": { min: 0, max: 4, step: 0.05, widget: "range" },
  "spatialRhythm.buttonPadding": { min: 0, max: 4, step: 0.05, widget: "range" },
  "spatialRhythm.sectionSpacing": { min: 0, max: 8, step: 0.05, widget: "range" },

  "shape.radiusSize": {
    oneOf: Object.entries(enums.RadiusSizes).map(([name, value]) => ({
      const: value,
      title: name,
    })),
  },
  "shape.borderWidth": {
    widget: "select",
    oneOf: Object.entries(enums.BorderWidths).map(([name, value]) => ({
      const: value,
      title: name,
    })),
  },
  "shape.customRadius": { min: 0, max: 64, step: 1, widget: "range" },

  "behavior.transitionSpeed": {
    oneOf: Object.entries(enums.TransitionSpeeds).map(([name, value]) => ({
      const: value,
      title: name,
    })),
  },
  "behavior.animationEasing": {
    enum: Object.values(enums.AnimationEasings),
  },
  "behavior.customTransitionSpeed": { min: 0, max: 1000, step: 10, widget: "range" },
  "behavior.focusRingWidth": { min: 0, max: 8, step: 1, widget: "range" },
  "behavior.focusRingOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "behavior.hoverOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },

  "layout.gridColumns": { min: 1, max: 24, step: 1, widget: "range" },
  "layout.gridGutter": { min: 0, max: 8, step: 0.05, widget: "range" },
  "layout.maxWidth": { widget: "input-text", placeholder: "e.g. 1200 or 1200px" },
  "layout.maxWidths.sm": { widget: "input-text", placeholder: "e.g. 640 or 640px" },
  "layout.maxWidths.md": { widget: "input-text", placeholder: "e.g. 768 or 768px" },
  "layout.maxWidths.lg": { widget: "input-text", placeholder: "e.g. 1024 or 1024px" },
  "layout.maxWidths.xl": { widget: "input-text", placeholder: "e.g. 1280 or 1280px" },
  "layout.containerMaxWidth": { widget: "input-text", placeholder: "e.g. 1400px" },
  "layout.containerPadding": { widget: "input-text", placeholder: "e.g. var(--spacing-6)" },
  "layout.breakpoints.sm": { min: 320, max: 2560, step: 1, widget: "input-number" },
  "layout.breakpoints.md": { min: 480, max: 3200, step: 1, widget: "input-number" },
  "layout.breakpoints.lg": { min: 640, max: 3840, step: 1, widget: "input-number" },
  "layout.breakpoints.xl": { min: 768, max: 5120, step: 1, widget: "input-number" },
  "layout.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layout.darkMode.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layout.densityCompact": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.densityNormal": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.densityComfortable": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.buttonMinHeight": { min: 24, max: 96, step: 1, widget: "range" },
  "layout.inputMinHeight": { min: 24, max: 96, step: 1, widget: "range" },

  "layers.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layers.shadowBlurMultiplier": { min: 0, max: 8, step: 0.1, widget: "range" },
  "layers.shadowOffsetMultiplier": { min: 0, max: 8, step: 0.1, widget: "range" },
  "layers.blurLight": { min: 0, max: 48, step: 1, widget: "range" },
  "layers.blurMedium": { min: 0, max: 64, step: 1, widget: "range" },
  "layers.blurHeavy": { min: 0, max: 96, step: 1, widget: "range" },
  "layers.baseZIndex": { min: 0, max: 10000, step: 10, widget: "range" },
  "layers.zIndexStep": { min: 1, max: 100, step: 1, widget: "range" },
  "layers.darkMode.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },

  "advanced.linkStyle": { enum: Object.values(enums.LinkStyles) },
  "a11y.minTouchTarget": {
    oneOf: Object.entries(enums.TouchTargetSizes).map(([name, value]) => ({
      const: value,
      title: name,
    })),
  },
  "a11y.focusStyle": { enum: Object.values(enums.FocusStyles) },

  "icons.defaultSize": { min: 8, max: 128, step: 1, widget: "range", icon: "sparkle" },
};

function __toConfigPath(pathSegments = []) {
  return pathSegments.join(".");
}

function __toJsonPointer(pathSegments = []) {
  return `/${pathSegments.join("/")}`;
}

function __getValueAtPath(source, pathSegments = []) {
  if (!source || typeof source !== "object") return undefined;
  return pathSegments.reduce((current, segment) => {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    return current[segment];
  }, source);
}

function __resolveExampleValue(value, fallbackSource, pathSegments = []) {
  if (value !== undefined && value !== null) return value;
  const fallback = __getValueAtPath(fallbackSource, pathSegments);
  return fallback !== undefined && fallback !== null ? fallback : undefined;
}

function __toTitleCase(value = "") {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function __resolveExpectedType(spec, value) {
  if (!spec) return "string";
  const expected = spec.type || "string";
  if (Array.isArray(expected)) {
    const actual = __getValueType(value);
    if (actual !== "undefined" && expected.includes(actual)) return actual;
    if (expected.includes("string")) return "string";
    return expected.find((item) => item !== "null") || expected[0] || "string";
  }
  return expected;
}

function __copySchemaConstraints(target, spec, keys = []) {
  if (!target || !spec || !Array.isArray(keys)) return target;
  keys.forEach((key) => {
    if (spec[key] !== undefined) {
      target[key] = spec[key];
    }
  });
  return target;
}

function __buildSchemaChoices(spec, metadata) {
  if (Array.isArray(metadata?.oneOf) && metadata.oneOf.length) {
    return metadata.oneOf;
  }
  if (Array.isArray(metadata?.enum) && metadata.enum.length) {
    return metadata.enum.map((option) => ({
      const: option,
      title: __toTitleCase(option),
    }));
  }
  if (Array.isArray(spec?.oneOf) && spec.oneOf.length) {
    return spec.oneOf;
  }
  if (Array.isArray(spec?.enum) && spec.enum.length) {
    return spec.enum.map((option) => ({
      const: option,
      title: __toTitleCase(option),
    }));
  }
  return null;
}

function __normalizeEditorWidget(widget) {
  if (!widget) return widget;
  if (widget === "range") return "input-range";
  return widget;
}

function __resolveSchemaTypeFromChoices(schemaType, choices) {
  if (!Array.isArray(choices) || !choices.length) return schemaType;
  const choiceTypes = new Set();
  for (const option of choices) {
    if (!option || option.const === undefined) continue;
    choiceTypes.add(__getValueType(option.const));
  }
  if (!choiceTypes.size) return schemaType;
  if (choiceTypes.size === 1) {
    const only = Array.from(choiceTypes)[0];
    if (only === "number") return "number";
    if (only === "string") return "string";
    if (only === "boolean") return "boolean";
  }
  return schemaType;
}

function __inferEditorMetadata(path, spec, value) {
  const type = __resolveExpectedType(spec, value);
  const lowerPath = path.toLowerCase();
  const base = {
    label: __toTitleCase(path.split(".").slice(-1)[0] || path),
  };

  if (type === "boolean") {
    base.widget = "toggle";
  }

  if (type === "number") {
    base.widget = "range";
    if (lowerPath.includes("opacity")) {
      base.min = 0;
      base.max = 1;
      base.step = 0.01;
    } else if (lowerPath.includes("lineheight")) {
      base.min = 0.75;
      base.max = 3;
      base.step = 0.001;
      base.widget = "input-range";
    } else if (lowerPath.includes("fontweight")) {
      base.min = 100;
      base.max = 800;
      base.step = 100;
      base.widget = "input-range";
    } else if (lowerPath.endsWith("basefontsize")) {
      base.min = 8;
      base.max = 32;
      base.step = 1;
      base.widget = "input-range";
    } else if (lowerPath.includes("scale") || lowerPath.includes("ratio")) {
      base.min = 1;
      base.max = 2;
      base.step = 0.01;
    } else {
      base.min = 0;
      base.max = Math.max(10, Number.isFinite(Number(value)) ? Number(value) * 4 : 100);
      base.step = 1;
    }
  }

  if (type === "string" && path.startsWith("colors.")) {
    base.widget = "input-color";
  }

  if (type === "string" && lowerPath === "description") {
    base.widget = "textarea";
    base.maxLength = 500;
    base.rows = 4;
  }

  const override = __CONFIG_EDITOR_METADATA_OVERRIDES__[path] || {};
  const merged = { ...base, ...override };
  if (merged.widget) {
    merged.widget = __normalizeEditorWidget(merged.widget);
  }
  return merged;
}

function __buildConfigSchemaNode(
  spec,
  value,
  pathSegments,
  uiSchema,
  metadataOut,
  fallbackSource
) {
  if (!spec || typeof spec !== "object") return null;
  const resolvedValueForType = __resolveExampleValue(
    value,
    fallbackSource,
    pathSegments
  );
  const expectedType = __resolveExpectedType(spec, resolvedValueForType);

  if (expectedType === "object" && spec.properties) {
    const schemaNode = { type: "object", properties: {} };
    if (pathSegments.length > 0) {
      schemaNode.title = __toTitleCase(pathSegments[pathSegments.length - 1]);
    }
    const valueNode = {};
    for (const [key, childSpec] of Object.entries(spec.properties)) {
      const childValue =
        value && typeof value === "object" && !Array.isArray(value)
          ? value[key]
          : undefined;
      const child = __buildConfigSchemaNode(
        childSpec,
        childValue,
        [...pathSegments, key],
        uiSchema,
        metadataOut,
        fallbackSource
      );
      if (!child) continue;
      schemaNode.properties[key] = child.schema;
      if (child.hasValue) {
        valueNode[key] = child.value;
      }
    }
    if (!Object.keys(schemaNode.properties).length) return null;
    return {
      schema: schemaNode,
      value: valueNode,
      hasValue: Object.keys(valueNode).length > 0,
    };
  }

  if (expectedType === "array") {
    const path = __toConfigPath(pathSegments);
    const metadata = __inferEditorMetadata(path, spec, value);
    metadataOut[path] = metadata;
    const resolvedArrayExample = __resolveExampleValue(
      value,
      fallbackSource,
      pathSegments
    );

    const itemType = spec.items?.type || "string";
    const normalizedItemType = Array.isArray(itemType) ? itemType[0] : itemType;
    const itemSchema = {
      type: normalizedItemType,
    };

    const itemChoices = __buildSchemaChoices(spec?.items, null);
    if (itemChoices) {
      itemSchema.oneOf = itemChoices;
    }

    if (
      normalizedItemType === "string" &&
      Array.isArray(resolvedArrayExample) &&
      resolvedArrayExample.length > 0
    ) {
      const firstString = resolvedArrayExample.find(
        (entry) => typeof entry === "string" && entry.trim().length > 0
      );
      if (firstString) {
        itemSchema.examples = [firstString];
      }
    }

    __copySchemaConstraints(itemSchema, spec?.items, [
      "minimum",
      "maximum",
      "exclusiveMinimum",
      "exclusiveMaximum",
      "multipleOf",
      "minLength",
      "maxLength",
      "pattern",
      "format",
      "minItems",
      "maxItems",
      "uniqueItems",
      "description",
      "default",
    ]);

    const schemaNode = {
      type: "array",
      items: itemSchema,
    };

    __copySchemaConstraints(schemaNode, spec, [
      "minItems",
      "maxItems",
      "uniqueItems",
      "description",
      "default",
    ]);

    const pointer = __toJsonPointer(pathSegments);
    const uiEntry = {};
    const itemHasChoices = Array.isArray(itemSchema.oneOf) && itemSchema.oneOf.length > 0;
    if (normalizedItemType === "string" && itemHasChoices) {
      uiEntry["ui:widget"] = schemaNode.maxItems === 1 ? "radio" : "checkbox-group";
    }
    if (
      normalizedItemType === "string" &&
      Array.isArray(resolvedArrayExample) &&
      resolvedArrayExample.length > 0
    ) {
      const placeholderPreview = resolvedArrayExample
        .filter((entry) => typeof entry === "string" && entry.trim().length > 0)
        .slice(0, 5)
        .join(", ");
      if (placeholderPreview) {
        uiEntry["ui:placeholder"] = placeholderPreview;
      }
    }
    if (Object.keys(uiEntry).length) {
      uiSchema[pointer] = {
        ...(uiSchema[pointer] || {}),
        ...uiEntry,
      };
    }

    return {
      schema: schemaNode,
      value: Array.isArray(value) ? value : [],
      hasValue: Array.isArray(value),
    };
  }

  const path = __toConfigPath(pathSegments);
  const metadata = __inferEditorMetadata(path, spec, resolvedValueForType);
  metadataOut[path] = metadata;

  const choices = __buildSchemaChoices(spec, metadata);
  const schemaType = expectedType === "null" ? "string" : expectedType;
  const normalizedSchemaType = __resolveSchemaTypeFromChoices(schemaType, choices);
  const schemaNode = {
    type: normalizedSchemaType,
    title: metadata.label || __toTitleCase(pathSegments[pathSegments.length - 1] || path),
  };

  if (choices) {
    schemaNode.oneOf = choices;
  }

  __copySchemaConstraints(schemaNode, spec, [
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "multipleOf",
    "minLength",
    "maxLength",
    "pattern",
    "format",
    "description",
    "default",
  ]);

  if (typeof metadata.maxLength === "number" && schemaNode.maxLength === undefined) {
    schemaNode.maxLength = metadata.maxLength;
  }

  if (
    (schemaNode.type === "number" || schemaNode.type === "integer") &&
    typeof metadata.min === "number" &&
    schemaNode.minimum === undefined
  ) {
    schemaNode.minimum = metadata.min;
  }
  if (
    (schemaNode.type === "number" || schemaNode.type === "integer") &&
    typeof metadata.max === "number" &&
    schemaNode.maximum === undefined
  ) {
    schemaNode.maximum = metadata.max;
  }
  if (
    (schemaNode.type === "number" || schemaNode.type === "integer") &&
    typeof metadata.step === "number" &&
    schemaNode.multipleOf === undefined
  ) {
    schemaNode.multipleOf = metadata.step;
  }

  const exampleValue = resolvedValueForType;
  if (exampleValue !== undefined) {
    schemaNode.examples = [exampleValue];
  }

  const pointer = __toJsonPointer(pathSegments);
  const uiEntry = {};
  if (metadata.widget) uiEntry["ui:widget"] = metadata.widget;
  if (metadata.icon) uiEntry["ui:icon"] = metadata.icon;
  if (typeof metadata.min === "number") uiEntry["ui:min"] = metadata.min;
  if (typeof metadata.max === "number") uiEntry["ui:max"] = metadata.max;
  if (typeof metadata.step === "number") uiEntry["ui:step"] = metadata.step;
  if (metadata.placeholder) uiEntry["ui:placeholder"] = metadata.placeholder;
  if (typeof metadata.rows === "number") {
    uiEntry["ui:options"] = {
      ...(uiEntry["ui:options"] || {}),
      rows: metadata.rows,
    };
  }
  if (
    metadata.widget === "input-range" &&
    exampleValue !== undefined
  ) {
    uiEntry["ui:allowUnset"] = true;
  }
  if (
    typeof metadata.min === "number" ||
    typeof metadata.max === "number" ||
    typeof metadata.step === "number"
  ) {
    uiEntry["ui:options"] = {
      ...(uiEntry["ui:options"] || {}),
      ...(typeof metadata.min === "number" ? { min: metadata.min } : {}),
      ...(typeof metadata.max === "number" ? { max: metadata.max } : {}),
      ...(typeof metadata.step === "number" ? { step: metadata.step } : {}),
    };
  }
  if (Object.keys(uiEntry).length) {
    uiSchema[pointer] = uiEntry;
  }

  return {
    schema: schemaNode,
    value,
    hasValue: value !== undefined,
  };
}

export function buildDesignConfigFormSchema(designConfig = {}) {
  const metadata = {};
  const uiSchema = {
    "/colors": {
      "ui:layout": "flex",
      "ui:layoutOptions": { wrap: true, gap: "sm" },
    },
    "/colors/darkMode": {
      "ui:layout": "flex",
      "ui:layoutOptions": { wrap: true, gap: "sm" },
    },
  };

  const fallbackSource = presets?.default && typeof presets.default === "object"
    ? presets.default
    : null;

  const root = __buildConfigSchemaNode(
    __DESIGN_CONFIG_SPEC__,
    designConfig,
    [],
    uiSchema,
    metadata,
    fallbackSource
  );

  return {
    schema: root?.schema || { type: "object", properties: {} },
    uiSchema,
    values: root?.value || {},
    metadata,
  };
}

export function getDesignConfigEditorMetadata(designConfig = {}) {
  return buildDesignConfigFormSchema(designConfig).metadata;
}

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
      fontScale: 1.35, // More dramatic scale for breathing room
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
      fontScale: 1.318, // Golden ratio for futuristic feel
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
    themes: ["light"], // Not optimized for dark mode 
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
      fontScale: 1.3,
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
      fontScale: 1.3,
      fontFamilyHeadings: "'Playfair Display', 'Georgia', serif",
      fontFamilyBody: "'Crimson Text', 'Garamond', serif",
      fontWeightNormal: 400,
      fontWeightSemibold: 600,
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.3,
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
    themes: ["light"], // Not optimized for dark mode due to pastel contrast challenges
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
        background: "#0c0c0c",
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
      fontScale: 1.35,
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
    liquidGlassEffects: false,
    backgroundMesh: 0,
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
        colorInput: true,        // Use label[data-color] for color inputs
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
    containerPadding: 1.0,
    inputPadding: 0.75,
    buttonPadding: 1.0,
    sectionSpacing: 2.0,
  },

  layers: {
    baseShadowOpacity: 0.1,
    darkMode: {
      baseShadowOpacity: 0.25,
    },
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
    buttonMinHeight: 30,
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
    spritePath: "/assets/pds/icons/pds-icons.svg",
  },

  debug: false,
};

export const PDS_DEFAULT_CONFIG_EDITOR_METADATA = getDesignConfigEditorMetadata(
  presets.default
);

export const PDS_DEFAULT_CONFIG_FORM_SCHEMA = buildDesignConfigFormSchema(
  presets.default
);
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
