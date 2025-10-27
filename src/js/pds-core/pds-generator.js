import { enums } from "./pds-enums";
/**
 * Generator - A JS-config-first design system
 * Generates comprehensive CSS variables and styles from a minimal configuration
 */
export class Generator {
  // Private internal fields
  #layers;
  #stylesheets;
  #blobURLs;

  constructor(options = {}) {
    this.options = {
      // All defaults should come from config, no hardcoded values
      debug: false,
      ...options,
    };

    if (this.options.debug) {
      console.log("Generator options:", this.options);
    }
    this.tokens = this.#generateTokens();
    if (this.options.debug) {
      console.log("Generated tokens:", this.tokens);
    }
    this.css = this.#generateCSS();
    console.log(this.css);

    if (this.options.debug) {
      console.log("Generated CSS length:", this.css.length);
      console.log("CSS preview:", this.css.substring(0, 500));
    }

    // NEW: Generate separate layers for modern architecture
    this.#generateLayers();

    // Only create browser-specific features if in browser environment
    if (typeof CSSStyleSheet !== "undefined") {
      this.#createConstructableStylesheets();
      this.#createBlobURLs();

      if (this.options.debug) {
        console.log("[Generator] Created BLOB URLs:", {
          styles: this.#blobURLs?.styles,
          primitives: this.#blobURLs?.primitives,
        });
      }
    } else {
      if (this.options.debug) {
        console.log(
          "[Generator] Skipping browser features (CSSStyleSheet not available)"
        );
      }
    }
  }

  #generateTokens() {
    const config = this.options;

    return {
      colors: this.#generateColorTokens(config.colors || {}),
      spacing: this.generateSpacingTokens(config.spatialRhythm || {}),
      radius: this.#generateRadiusTokens(config.shape || {}),
      typography: this.generateTypographyTokens(config.typography || {}),
      shadows: this.#generateShadowTokens(config.layers || {}),
      layout: this.#generateLayoutTokens(config.layout || {}),
      transitions: this.#generateTransitionTokens(config.behavior || {}),
      zIndex: this.#generateZIndexTokens(config.layers || {}),
      icons: this.#generateIconTokens(config.icons || {}),
    };
  }

  #generateColorTokens(colorConfig) {
    const {
      primary = "#3b82f6",
      secondary = "#64748b",
      accent = "#ec4899",
      background = "#ffffff",
      success = null,
      warning = "#FFBF00",
      danger = null,
      info = null,
    } = colorConfig;

    const colors = {
      // Generate color scales
      primary: this.generateColorScale(primary),
      secondary: this.generateColorScale(secondary),
      accent: this.generateColorScale(accent),

      // Semantic colors - use provided or derive from primary/accent
      success: this.generateColorScale(
        success || this.deriveSuccessColor(primary)
      ),
      warning: this.generateColorScale(warning || accent),
      danger: this.generateColorScale(
        danger || this.deriveDangerColor(primary)
      ),
      info: this.generateColorScale(info || primary),

      // Neutral grays derived from secondary color
      gray: this.generateGrayScale(secondary),

      // Background-based surface colors for tasteful variations
      surface: this.generateBackgroundShades(background),
    };

    // Add adaptive fieldset colors to surface
    colors.surface.fieldset = this.generateFieldsetAdaptiveColors(
      colors.surface
    );

    // Generate dark mode variants (with optional overrides)
    const darkModeOverrides = this.options.colors?.darkMode || {};
    colors.dark = this.#generateDarkModeColors(
      colors,
      background,
      darkModeOverrides
    );

    return colors;
  }

  generateColorScale(baseColor) {
    const hsl = this.#hexToHsl(baseColor);
    return {
      50: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 10, 10),
        Math.min(hsl.l + 45, 95)
      ),
      100: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 5, 15),
        Math.min(hsl.l + 35, 90)
      ),
      200: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 25, 85)),
      300: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 75)),
      400: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 5, 65)),
      500: baseColor, // Base color
      600: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 10, 25)),
      700: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 20)),
      800: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 15)),
      900: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 40, 10)),
    };
  }

  deriveSuccessColor(mainColor) {
    // Generate a green success color by rotating the hue of the main color
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(120, Math.max(hsl.s, 60), 45); // Green-ish success
  }

  deriveDangerColor(mainColor) {
    // Generate a red danger color by rotating the hue of the main color
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(0, Math.max(hsl.s, 70), 50); // Red-ish danger
  }

  generateGrayScale(supportingColor) {
    // Generate gray scale based on supporting color for brand consistency
    const hsl = this.#hexToHsl(supportingColor);
    const baseHue = hsl.h;
    const baseSat = Math.min(hsl.s, 10); // Keep it subtle

    return {
      50: this.#hslToHex(baseHue, baseSat, 98),
      100: this.#hslToHex(baseHue, baseSat, 95),
      200: this.#hslToHex(baseHue, baseSat, 88),
      300: this.#hslToHex(baseHue, baseSat, 78),
      400: this.#hslToHex(baseHue, baseSat, 60),
      500: supportingColor, // Use the actual supporting color
      600: this.#hslToHex(baseHue, Math.min(baseSat + 5, 15), 45),
      700: this.#hslToHex(baseHue, Math.min(baseSat + 8, 18), 35),
      800: this.#hslToHex(baseHue, Math.min(baseSat + 10, 20), 20),
      900: this.#hslToHex(baseHue, Math.min(baseSat + 12, 22), 10),
    };
  }

  generateBackgroundShades(backgroundBase) {
    const hsl = this.#hexToHsl(backgroundBase);

    // Generate subtle variations of the background
    return {
      base: backgroundBase,
      subtle: this.#hslToHex(hsl.h, Math.max(hsl.s, 2), Math.max(hsl.l - 2, 2)), // Very subtle darker
      elevated: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 3),
        Math.max(hsl.l - 4, 5)
      ), // Slightly darker for elevated surfaces
      sunken: this.#hslToHex(hsl.h, Math.max(hsl.s, 4), Math.max(hsl.l - 6, 8)), // For input fields, subtle depth
      overlay: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 2),
        Math.min(hsl.l + 2, 98)
      ), // Slightly lighter for overlays
      inverse: this.#generateSmartDarkBackground(backgroundBase), // Smart dark background
      hover: `color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);`,
    };
  }

  generateFieldsetAdaptiveColors(backgroundShades) {
    // Generate fieldset backgrounds that are subtly different from each surface
    return {
      base: backgroundShades.subtle, // Subtle darker than base
      subtle: backgroundShades.elevated, // Elevated from subtle
      elevated: backgroundShades.sunken, // Sunken from elevated (creates contrast)
      sunken: this.#darkenColor(backgroundShades.sunken, 0.05), // Slightly darker than sunken
      overlay: backgroundShades.elevated, // Elevated from overlay
    };
  }

  #darkenColor(hexColor, factor = 0.05) {
    const hsl = this.#hexToHsl(hexColor);
    const darkerLightness = Math.max(hsl.l - hsl.l * factor, 5);
    return this.#hslToHex(hsl.h, hsl.s, darkerLightness);
  }

  #generateSmartDarkBackground(lightBackground) {
    const hsl = this.#hexToHsl(lightBackground);

    // If it's already a light color, create a smart dark version
    if (hsl.l > 50) {
      // Keep the same hue and saturation characteristics but make it dark
      // Increase saturation slightly for richness in dark mode
      const darkSaturation = Math.min(hsl.s + 5, 25);
      const darkLightness = Math.max(12 - (hsl.l - 50) * 0.1, 8); // Darker for lighter source colors

      return this.#hslToHex(hsl.h, darkSaturation, darkLightness);
    } else {
      // If the source is already dark, create a lighter version
      const lightSaturation = Math.max(hsl.s - 10, 5);
      const lightLightness = Math.min(85 + (50 - hsl.l) * 0.3, 95);

      return this.#hslToHex(hsl.h, lightSaturation, lightLightness);
    }
  }

  #generateDarkModeColors(
    lightColors,
    backgroundBase = "#ffffff",
    overrides = {}
  ) {
    // Use custom dark background if provided, otherwise auto-generate
    const darkBackgroundBase = overrides.background
      ? overrides.background
      : this.#generateSmartDarkBackground(backgroundBase);

    const darkSurface = this.generateBackgroundShades(darkBackgroundBase);

    return {
      surface: {
        ...darkSurface,
        fieldset: this.#generateDarkModeFieldsetColors(darkSurface),
      },
      // For primary colors, use override, or adjust light colors for dark mode (dimmed for accessibility)
      primary: overrides.primary
        ? this.generateColorScale(overrides.primary)
        : this.#adjustColorsForDarkMode(lightColors.primary),
      // Adjust other colors for dark mode, with optional overrides
      secondary: overrides.secondary
        ? this.generateColorScale(overrides.secondary)
        : this.#adjustColorsForDarkMode(lightColors.secondary),
      accent: overrides.accent
        ? this.generateColorScale(overrides.accent)
        : this.#adjustColorsForDarkMode(lightColors.accent),
      // Regenerate grays if secondary override is provided (grays are derived from secondary)
      gray: overrides.secondary
        ? this.generateGrayScale(overrides.secondary)
        : lightColors.gray,
      // IMPORTANT: Also adjust semantic colors for dark mode!
      success: this.#adjustColorsForDarkMode(lightColors.success),
      info: this.#adjustColorsForDarkMode(lightColors.info),
      warning: this.#adjustColorsForDarkMode(lightColors.warning),
      danger: this.#adjustColorsForDarkMode(lightColors.danger),
    };
  }

  #generateDarkModeFieldsetColors(darkSurface) {
    // In dark mode, fieldsets should be slightly lighter for contrast
    return {
      base: darkSurface.elevated, // Elevated from dark base
      subtle: darkSurface.overlay, // Overlay from dark subtle
      elevated: this.#lightenColor(darkSurface.elevated, 0.08), // Slightly lighter than elevated
      sunken: darkSurface.elevated, // Elevated from sunken
      overlay: this.#lightenColor(darkSurface.overlay, 0.05), // Slightly lighter than overlay
    };
  }

  #lightenColor(hexColor, factor = 0.05) {
    const hsl = this.#hexToHsl(hexColor);
    const lighterLightness = Math.min(hsl.l + (100 - hsl.l) * factor, 95);
    return this.#hslToHex(hsl.h, hsl.s, lighterLightness);
  }

  #adjustColorsForDarkMode(colorScale) {
    // Create dimmed and inverted colors for dark mode
    const dimmedScale = {};

    // Invert the scale and apply dimming for better dark mode appearance
    // For accessibility, mid-range colors (used for buttons/interactive elements) are more heavily dimmed
    const mapping = {
      50: { source: "900", dimFactor: 0.8 },
      100: { source: "800", dimFactor: 0.8 },
      200: { source: "700", dimFactor: 0.8 }, // Increased dimming
      300: { source: "600", dimFactor: 0.8 }, // Increased dimming
      400: { source: "500", dimFactor: 0.85 }, // Increased dimming
      500: { source: "400", dimFactor: 0.85 }, // Increased dimming
      600: { source: "300", dimFactor: 0.85 }, // Increased dimming (buttons use this!)
      700: { source: "200", dimFactor: 0.85 }, // Increased dimming (button hover)
      800: { source: "100", dimFactor: 0.95 }, // Less dimming for text
      900: { source: "50", dimFactor: 0.95 }, // Less dimming for text
    };

    Object.entries(mapping).forEach(([key, config]) => {
      const sourceColor = colorScale[config.source];
      dimmedScale[key] = this.#dimColorForDarkMode(
        sourceColor,
        config.dimFactor
      );
    });

    return dimmedScale;
  }

  #dimColorForDarkMode(hexColor, dimFactor = 0.8) {
    const hsl = this.#hexToHsl(hexColor);

    // Reduce saturation and lightness for dark mode, similar to image dimming
    const dimmedSaturation = Math.max(hsl.s * dimFactor, 5);
    const dimmedLightness = Math.max(hsl.l * dimFactor, 5);

    return this.#hslToHex(hsl.h, dimmedSaturation, dimmedLightness);
  }

  /**
   * Generate spacing tokens based on the provided configuration.
   * @param {Object} spatialConfig
   * @returns { String } CSS spacing tokens
   */
  generateSpacingTokens(spatialConfig) {
    const {
      baseUnit = 16,
      scaleRatio = 1.25,
      maxSpacingSteps = 32,
    } = spatialConfig;

    const spacing = { 0: "0" };

    // Generate standard spacing scale
    const standardSteps = [
      0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8,
    ];
    standardSteps.forEach((multiplier, index) => {
      const step = index + 1;
      spacing[step] = `${Math.round(baseUnit * multiplier)}px`;
    });

    // Generate additional steps up to maxSpacingSteps using scale ratio
    for (let i = standardSteps.length + 1; i <= maxSpacingSteps; i++) {
      const multiplier = Math.pow(scaleRatio, i - 8); // Start scaling from step 8
      spacing[i] = `${Math.round(baseUnit * multiplier)}px`;
    }

    return spacing;
  }

  #generateRadiusTokens(shapeConfig) {
    const { radiusSize = "medium", customRadius = null } = shapeConfig;

    // Use custom radius if provided, otherwise use the enum
    const baseRadius =
      customRadius !== null
        ? customRadius
        : enums.RadiusSizes[radiusSize] ?? enums.RadiusSizes.medium;

    return {
      none: "0",
      xs: `${Math.round(baseRadius * 0.25)}px`,
      sm: `${Math.round(baseRadius * 0.5)}px`,
      md: `${baseRadius}px`,
      lg: `${Math.round(baseRadius * 1.5)}px`,
      xl: `${Math.round(baseRadius * 2)}px`,
      full: "9999px",
    };
  }

  generateTypographyTokens(typographyConfig) {
    const {
      fontFamilyHeadings = "system-ui, -apple-system, sans-serif",
      fontFamilyBody = "system-ui, -apple-system, sans-serif",
      fontFamilyMono = 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      baseFontSize = 16,
      fontScale = 1.2,
      fontWeightLight = enums.FontWeights.light,
      fontWeightNormal = enums.FontWeights.normal,
      fontWeightMedium = enums.FontWeights.medium,
      fontWeightSemibold = enums.FontWeights.semibold,
      fontWeightBold = enums.FontWeights.bold,
      lineHeightTight = enums.LineHeights.tight,
      lineHeightNormal = enums.LineHeights.normal,
      lineHeightRelaxed = enums.LineHeights.relaxed,
    } = typographyConfig;

    return {
      fontFamily: {
        headings: fontFamilyHeadings,
        body: fontFamilyBody,
        mono: fontFamilyMono,
      },
      fontSize: {
        xs: `${Math.round(baseFontSize * 0.75)}px`,
        sm: `${Math.round(baseFontSize * 0.875)}px`,
        base: `${baseFontSize}px`,
        lg: `${Math.round(baseFontSize * 1.125)}px`,
        xl: `${Math.round(baseFontSize * fontScale)}px`,
        "2xl": `${Math.round(baseFontSize * Math.pow(fontScale, 2))}px`,
        "3xl": `${Math.round(baseFontSize * Math.pow(fontScale, 3))}px`,
        "4xl": `${Math.round(baseFontSize * Math.pow(fontScale, 4))}px`,
      },
      fontWeight: {
        light: fontWeightLight?.toString() || "300",
        normal: fontWeightNormal?.toString() || "400",
        medium: fontWeightMedium?.toString() || "500",
        semibold: fontWeightSemibold?.toString() || "600",
        bold: fontWeightBold?.toString() || "700",
      },
      lineHeight: {
        tight: lineHeightTight?.toString() || "1.25",
        normal: lineHeightNormal?.toString() || "1.5",
        relaxed: lineHeightRelaxed?.toString() || "1.75",
      },
    };
  }

  #generateShadowTokens(layersConfig) {
    const {
      baseShadowOpacity = 0.1,
      shadowBlurMultiplier = 1,
      shadowOffsetMultiplier = 1,
    } = layersConfig;

    const shadowColor = `rgba(0, 0, 0, ${baseShadowOpacity})`;
    const lightShadowColor = `rgba(0, 0, 0, ${baseShadowOpacity * 0.5})`;

    return {
      sm: `0 ${1 * shadowOffsetMultiplier}px ${
        2 * shadowBlurMultiplier
      }px 0 ${lightShadowColor}`,
      base: `0 ${1 * shadowOffsetMultiplier}px ${
        3 * shadowBlurMultiplier
      }px 0 ${shadowColor}, 0 ${1 * shadowOffsetMultiplier}px ${
        2 * shadowBlurMultiplier
      }px 0 ${lightShadowColor}`,
      md: `0 ${4 * shadowOffsetMultiplier}px ${6 * shadowBlurMultiplier}px ${
        -1 * shadowOffsetMultiplier
      }px ${shadowColor}, 0 ${2 * shadowOffsetMultiplier}px ${
        4 * shadowBlurMultiplier
      }px ${-1 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      lg: `0 ${10 * shadowOffsetMultiplier}px ${15 * shadowBlurMultiplier}px ${
        -3 * shadowOffsetMultiplier
      }px ${shadowColor}, 0 ${4 * shadowOffsetMultiplier}px ${
        6 * shadowBlurMultiplier
      }px ${-2 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      xl: `0 ${20 * shadowOffsetMultiplier}px ${25 * shadowBlurMultiplier}px ${
        -5 * shadowOffsetMultiplier
      }px ${shadowColor}, 0 ${10 * shadowOffsetMultiplier}px ${
        10 * shadowBlurMultiplier
      }px ${-5 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      inner: `inset 0 ${2 * shadowOffsetMultiplier}px ${
        4 * shadowBlurMultiplier
      }px 0 ${lightShadowColor}`,
    };
  }

  #generateLayoutTokens(layoutConfig) {
    const {
      maxWidth = 1200,
      containerPadding = 16,
      breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    } = layoutConfig;

    return {
      maxWidth: `${maxWidth}px`,
      minHeight: "100vh",
      containerPadding: `${containerPadding}px`,
      breakpoints: `{
        sm: ${breakpoints.sm}px,
        md: ${breakpoints.md}px,
        lg: ${breakpoints.lg}px,
        xl: ${breakpoints.xl}px,
      }`,
    };
  }

  #generateTransitionTokens(behaviorConfig) {
    const {
      transitionSpeed = enums.TransitionSpeeds.normal,
      animationEasing = enums.AnimationEasings["ease-out"],
    } = behaviorConfig;

    // Handle both number values and string keys
    let baseSpeed;
    if (typeof transitionSpeed === "number") {
      baseSpeed = transitionSpeed;
    } else if (
      typeof transitionSpeed === "string" &&
      enums.TransitionSpeeds[transitionSpeed]
    ) {
      baseSpeed = enums.TransitionSpeeds[transitionSpeed];
    } else {
      baseSpeed = enums.TransitionSpeeds.normal;
    }

    // Transition variables should only contain duration, not easing
    // This allows specific easing functions to be applied per property
    return {
      fast: `${Math.round(baseSpeed * 0.6)}ms`,
      normal: `${baseSpeed}ms`,
      slow: `${Math.round(baseSpeed * 1.4)}ms`,
    };
  }

  #generateZIndexTokens(layersConfig) {
    const { baseZIndex = 1000, zIndexStep = 10 } = layersConfig;

    return {
      dropdown: baseZIndex.toString(),
      sticky: (baseZIndex + zIndexStep * 2).toString(),
      fixed: (baseZIndex + zIndexStep * 3).toString(),
      modal: (baseZIndex + zIndexStep * 4).toString(),
      drawer: (baseZIndex + zIndexStep * 5).toString(), // Added drawer token
      popover: (baseZIndex + zIndexStep * 6).toString(),
      tooltip: (baseZIndex + zIndexStep * 7).toString(),
      notification: (baseZIndex + zIndexStep * 8).toString(),
    };
  }

  #generateIconTokens(iconConfig) {
    const {
      set = "phosphor",
      weight = "regular",
      defaultSize = 24,
      sizes = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
        "2xl": 64,
      },
      spritePath = "/assets/img/icons.svg",
    } = iconConfig;

    return {
      set,
      weight,
      defaultSize: `${defaultSize}px`,
      sizes: Object.fromEntries(
        Object.entries(sizes).map(([key, value]) => [key, `${value}px`])
      ),
      spritePath,
    };
  }

  #generateCSS() {
    const {
      colors,
      spacing,
      radius,
      typography,
      shadows,
      layout,
      transitions,
      zIndex,
      icons,
    } = this.tokens;

    const { components = {} } = this.options;

    if (this.options.debug) {
      console.log("Components config:", components);
      console.log("toasts enabled:", components.toasts !== false);
    }

    const css = `
:root {

  --focus-ring-width: 3px;
  --focus-ring-color: color-mix(in oklab, var(--color-primary-500) 35%, transparent);
  --focus-ring-danger: color-mix(in oklab, var(--color-danger-500) 35%, transparent);

  ${this.#generateColorVariables(colors)}
  ${this.#generateSpacingVariables(spacing)}
  ${this.#generateRadiusVariables(radius)}
  ${this.#generateTypographyVariables(typography)}
  ${this.#generateShadowVariables(shadows)}
  ${this.#generateLayoutVariables(layout)}
  ${this.#generateTransitionVariables(transitions)}
  ${this.#generateZIndexVariables(zIndex)}
  ${this.#generateIconVariables(icons)}
}

${this.#generateDarkModeCSS(colors)}

${this.#generateBaseStyles()}

${this.#generateSemanticHTMLStyles()}

${this.#generateFormStyles()}

${components.tables !== false ? this.#generateTableStyles() : ""}
${components.alerts !== false ? this.#generateAlertStyles() : ""}
${components.toasts !== false ? this.#generateToastStyles() : ""}
${components.badges !== false ? this.#generateBadgeStyles() : ""}
${components.modals !== false ? this.#generateModalStyles() : ""}
${components.tabStrip !== false ? this.#generateTabStripStyles() : ""}
${components.customScrollbars !== false ? this.#generateScrollbarStyles() : ""}

${this.#generateIconStyles()}

${this.#generateLayoutUtilities()}

${this.#generateMediaUtilities()}

${this.#generateMediaQueries()}
`;

    return css;
  }

  #generateColorVariables(colors) {
    let css = "  /* Colors */\n";

    const generateNestedColors = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          // Handle nested objects like surface.fieldset
          generateNestedColors(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          // Handle color values (hex, rgb, hsl, etc.)
          css += `  --color-${prefix}${key}: ${value};\n`;
        }
      });
    };

    Object.entries(colors).forEach(([category, values]) => {
      if (category === "dark") return; // Handle dark mode separately

      if (typeof values === "object" && values !== null) {
        generateNestedColors(values, `${category}-`);
      }
    });

    // Add semantic text colors for light mode
    css += `  /* Semantic Text Colors */\n`;
    css += `  --color-text-primary: var(--color-gray-900);\n`;
    css += `  --color-text-secondary: var(--color-gray-600);\n`;
    css += `  --color-text-muted: var(--color-gray-500);\n`;
    css += `  --color-border: var(--color-gray-300);\n`;
    css += `  --color-input-bg: var(--color-surface-base);\n`;
    css += `  --color-input-disabled-bg: var(--color-gray-50);\n`;
    css += `  --color-input-disabled-text: var(--color-gray-500);\n`;
    css += `  --color-code-bg: var(--color-gray-100);\n`;

    css += `   /* other color tokens*/
    
    --backdrop-background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );

    --backdrop-filter: blur(10px) saturate(150%) brightness(0.9);
    `;

    return css + "\n";
  }

  #generateSpacingVariables(spacing) {
    let css = "  /* Spacing */\n";
    Object.entries(spacing).forEach(([key, value]) => {
      css += `  --spacing-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateRadiusVariables(radius) {
    let css = "  /* Border Radius */\n";
    Object.entries(radius).forEach(([key, value]) => {
      css += `  --radius-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateTypographyVariables(typography) {
    let css = "  /* Typography */\n";
    Object.entries(typography).forEach(([category, values]) => {
      // Remove "font" prefix from category names (fontFamily -> family, fontSize -> size, etc.)
      const cleanCategory = category
        .replace(/^font/, "")
        .replace(/^(.)/, (m) => m.toLowerCase());
      Object.entries(values).forEach(([key, value]) => {
        css += `  --font-${cleanCategory}-${key}: ${value};\n`;
      });
    });
    return css + "\n";
  }

  #generateShadowVariables(shadows) {
    let css = "  /* Shadows */\n";
    Object.entries(shadows).forEach(([key, value]) => {
      css += `  --shadow-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateLayoutVariables(layout) {
    let css = "  /* Layout */\n";
    Object.entries(layout).forEach(([key, value]) => {
      css += `  --layout-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateTransitionVariables(transitions) {
    let css = "  /* Transitions */\n";
    Object.entries(transitions).forEach(([key, value]) => {
      css += `  --transition-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateZIndexVariables(zIndex) {
    let css = "  /* Z-Index */\n";
    Object.entries(zIndex).forEach(([key, value]) => {
      css += `  --z-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  #generateIconVariables(icons) {
    let css = `1  /* Icon System */;
      --icon-set: ${icons.set};
      --icon-weight: ${icons.weight};
      --icon-size: ${icons.defaultSize};
    `;

    // Icon size scale
    Object.entries(icons.sizes).forEach(([key, value]) => {
      css += `  --icon-size-${key}: ${value};\n`;
    });

    return css + "\n";
  }

  #generateDarkModeCSS(colors) {
    if (!colors.dark) return "";

    let css = "@media (prefers-color-scheme: dark) {\n  :root {\n";

    const generateNestedDarkColors = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          // Handle nested objects like surface.fieldset
          generateNestedDarkColors(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          // Handle color values (hex, rgb, hsl, etc.)
          css += `    --color-${prefix}${key}: ${value};\n`;
        }
      });
    };

    Object.entries(colors.dark).forEach(([category, values]) => {
      if (typeof values === "object" && values !== null) {
        generateNestedDarkColors(values, `${category}-`);
      }
    });

    // Dark mode specific adjustments
    css += /*css*/ `    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
  }

  /* Alert dark mode adjustments */
  .alert-success {
    background-color: var(--color-success-50);
    border-color: var(--color-success-500);
    color: var(--color-success-900);
  }

  .alert-info {
    background-color: var(--color-info-50);
    border-color: var(--color-info-500);
    color: var(--color-info-900);
  }

  .alert-warning {
    background-color: var(--color-warning-50);
    border-color: var(--color-warning-500);
    color: var(--color-warning-900);
  }

  .alert-danger,
  .alert-error {
    background-color: var(--color-danger-50);
    border-color: var(--color-danger-500);
    color: var(--color-danger-900);
  }

  /* Dim images in dark mode */
  img, video {
    opacity: 0.8;
    transition: opacity var(--transition-normal);
  }
  img:hover, video:hover {
    opacity: 1;
  }
}`;

    return css;
  }

  #generateBaseStyles() {
    const { advanced = {}, a11y = {}, layout = {} } = this.options;
    const tabSize = advanced.tabSize || enums.TabSizes.standard;
    const linkStyle = advanced.linkStyle || enums.LinkStyles.inline;
    const minTouchTarget =
      a11y.minTouchTarget || enums.TouchTargetSizes.standard;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    // Link styles based on configuration
    const linkDisplayStyles =
      linkStyle === enums.LinkStyles.button
        ? `display: inline-flex;
  align-items: center;
  min-height: ${minTouchTarget}px;`
        : linkStyle === enums.LinkStyles.block
        ? `display: block;`
        : `display: inline;`;

    return /*css*/ `/* Mobile-First Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-lineHeight-normal);
  color: var(--color-text-primary);
  background-color: var(--color-surface-base);
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  tab-size: ${tabSize};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: var(--layout-minHeight);
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* Mobile-first Typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--spacing-4) 0;
  font-family: var(--font-family-headings);
  font-weight: var(--font-weight-semibold);
  line-height: var(--font-lineHeight-normal);
  word-wrap: break-word;
  hyphens: auto;
  overflow-wrap: break-word;
}

h1 { 
  font-size: var(--font-size-2xl);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-3xl);
  }
}

h2 { 
  font-size: var(--font-size-xl);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-2xl);
  }
}

h3 { 
  font-size: var(--font-size-lg);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-xl);
  }
}

h4 { 
  font-size: var(--font-size-base);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-lg);
  }
}

h5 { 
  font-size: var(--font-size-sm);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-base);
  }
}

h6 { 
  font-size: var(--font-size-xs);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-sm);
  }
}

p {
  margin: 0 0 var(--spacing-4) 0;
  word-wrap: break-word;
}

a {
  color: var(--color-primary-600);
  text-decoration: underline;
  transition: color var(--transition-fast);
  touch-action: manipulation;
  ${linkDisplayStyles}
  
  &:hover {
    color: var(--color-primary-700);
  }
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  &.btn-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: ${minTouchTarget}px;
    text-decoration: none;
  }
}

ul, ol {
  margin: 0 0 var(--spacing-4) 0;
  padding-left: var(--spacing-6);
}

li {
  margin-bottom: var(--spacing-1);
}

code, pre {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-relaxed);
}

code {
  background-color: var(--color-code-bg);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
}

pre {
  background-color: var(--color-code-bg);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
  
  code {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
}

img, video {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  transition: opacity var(--transition-normal);
}

figure {
  margin: 0 0 var(--spacing-6) 0;
  text-align: center;
}

figcaption {
  margin-top: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: left;
  line-height: var(--font-lineHeight-relaxed);
  padding: 0 var(--spacing-2);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-base);
  }
}

dialog {
  background-color: transparent;
  border: none;
  color: currentColor;
}

/* Dialog transition: fade + subtle zoom (best-practice) */
dialog {
  display: none; /* keep native behavior, show via [open] */
  opacity: 0;
  transform: translateY(6px) scale(0.985);
  transition: opacity var(--transition-fast) ease, transform var(--transition-fast) ease;
  will-change: opacity, transform;
}

dialog[open], dialog.is-open {
  display: block;
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Backdrop styling and transition where supported */
dialog::backdrop {
  background: var(--backdrop-background);
  backdrop-filter: var(--backdrop-filter);
  transition: all var(--transition-fast) ease;
}

/* Fallback: if ::backdrop unsupported, use a utility .dialog-backdrop element */
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  opacity: 0;
  transition: opacity var(--transition-fast) ease;
  pointer-events: none;
}
.dialog-backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

/* Respect user's preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  dialog,
  dialog[open],
  dialog.is-open,
  dialog::backdrop,
  .dialog-backdrop {
    transition: none !important;
    transform: none !important;
  }
}

`;
  }

  #generateSemanticHTMLStyles() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* Semantic HTML Elements */

blockquote {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
  
  p:last-child {
    margin-bottom: 0;
  }
  
  cite {
    display: block;
    margin-top: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-style: normal;
    color: var(--color-text-tertiary);
    
    &::before {
      content: "— ";
    }
  }
}

hr {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

dl {
  margin: 0 0 var(--spacing-4) 0;
}

dt {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

dd {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

nav, header, footer {
  display: block;
}

header, footer {
  width: 100%;
}

article, section, aside {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

mark {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

kbd {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

abbr[title] {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

time {
  font-variant-numeric: tabular-nums;
}

address {
  font-style: normal;
  line-height: var(--font-lineHeight-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

details {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] summary {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(summary) {
    padding: var(--spacing-4);
  }
}

summary {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &::after {
    content: "›";
    display: inline-block;
    transform: rotate(90deg);
    transition: transform var(--transition-fast);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-secondary);
  }
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
}

dialog{
  padding: 0;
  border: none;
  background-color: transparent;
}

`;
  }

  #generateFormStyles() {
    const {
      gap,
      inputPadding,
      buttonPadding,
      focusRingWidth,
      focusRingOpacity,
      borderWidthThin,
      sectionSpacing,
      buttonMinHeight,
      inputMinHeight,
    } = this.options;

    const inputPaddingValue = inputPadding || 0.75;
    const buttonPaddingValue = buttonPadding || 1.0;
    const focusWidth = focusRingWidth || 3;
    const focusOpacity = Math.round((focusRingOpacity || 0.3) * 255)
      .toString(16)
      .padStart(2, "0");
    const borderWidth = borderWidthThin || 1;
    const sectionSpacingValue = sectionSpacing || 2.0;
    const minButtonHeight = buttonMinHeight || 44;
    const minInputHeight = inputMinHeight || 40;

    return /*css*/ `/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0 0 var(--spacing-${Math.round((gap * sectionSpacingValue) / 4)}) 0;
  padding: var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  width: 100%;
  background-color: var(--color-surface-subtle);
  
  &[role="radiogroup"] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    padding: var(--spacing-3);
    background-color: transparent;
  }
  
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    &:has(label:nth-child(6)) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-2);
    }
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-2) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      
      &:hover {
        color: var(--color-primary-700);
      }
    }
    
    input[type="checkbox"] {
      position: static;
      opacity: 1;
      width: var(--spacing-5);
      height: var(--spacing-5);
      min-height: var(--spacing-5);
      margin: 0;
      cursor: pointer;
      flex-shrink: 0;
      accent-color: var(--color-primary-600);
      appearance: auto;
      -webkit-appearance: auto;
      -moz-appearance: auto;
      
      &:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
      }
    }
  }
}

legend {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
  border: none;
  line-height: var(--font-lineHeight-tight);
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-base);
}

.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-lineHeight-relaxed);
}

input, textarea, select {
  width: 100%;
  min-height: ${minInputHeight}px;
  padding: calc(var(--spacing-1) * ${inputPaddingValue}) var(--spacing-4);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-lineHeight-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
    background-color: var(--color-surface-base);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
    
    &:focus {
      box-shadow: 0 0 0 ${focusWidth}px var(--color-danger-500)${focusOpacity};
    }
  }
}

input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
}

/* Make range visually match other inputs */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: var(--input-min-height, 40px); /* align control height with inputs */
  width: 100%;
}

/* Track and thumb styling for WebKit */
input[type="range"]::-webkit-slider-runnable-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  cursor: grab;
  border: 1px solid var(--color-border);
}

/* Track and thumb styling for Firefox */
input[type="range"]::-moz-range-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-moz-range-thumb {
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
}

/* Hover and active states */
input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus-visible::-webkit-slider-thumb {
  cursor: grabbing;
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
}

input[type="range"]:active::-webkit-slider-thumb {
  background: var(--color-primary-600);
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus-visible::-moz-range-thumb {
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
  cursor: grabbing;
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-primary-500);  
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-600);
}

input[type="color"] {
  width: var(--spacing-16);
  height: var(--spacing-12);
  padding: var(--spacing-1);
  cursor: pointer;
}

/* Awesome button-style radio and checkbox inputs */
/* Hide the actual input element */
fieldset[role="radiogroup"] input[type="radio"],
fieldset input[type="checkbox"]:not(fieldset[role="group"] input[type="checkbox"]),
.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

/* Style the label as a button (for inputs inside labels or adjacent) */
fieldset[role="radiogroup"] label,
fieldset[role="radiogroup"] label:has(input[type="radio"]),
label:has(input[type="radio"]),
label:has(input[type="checkbox"]):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"] + label,
input[type="checkbox"] + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${minButtonHeight}px;
  padding: calc(var(--spacing-1) * ${buttonPaddingValue}) var(--spacing-4);
  border: ${borderWidth}px solid var(--color-primary-600);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-primary-600);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Radio group labels - reduced padding to distinguish from regular buttons */
fieldset[role="radiogroup"] label,
fieldset[role="radiogroup"] label:has(input[type="radio"]) {
  padding: calc(var(--spacing-1) * ${
    buttonPaddingValue * 0.5
  }) calc(var(--spacing-4) * 0.75);
  min-height: calc(${minButtonHeight}px * 0.85);
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Hover states */
fieldset[role="radiogroup"] label:hover,
label:has(input[type="radio"]:not(:disabled)):hover,
label:has(input[type="checkbox"]:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:not(:disabled) + label:hover,
input[type="checkbox"]:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-700);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
}

/* Disabled states */
label:has(input[type="radio"]:disabled),
label:has(input[type="checkbox"]:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="radio"]:checked:disabled),
label:has(input[type="checkbox"]:checked:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:disabled + label,
input[type="checkbox"]:checked:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
}

/* Keep default checkbox/radio for inputs NOT in special containers */
input[type="checkbox"]:not(fieldset input[type="checkbox"]):not(.checkbox-container input[type="checkbox"]),
input[type="radio"]:not(fieldset[role="radiogroup"] input[type="radio"]) {
  width: var(--spacing-5);
  height: var(--spacing-5);
  min-height: var(--spacing-5);
  margin-right: var(--spacing-2);
  cursor: pointer;
  position: static;
  opacity: 1;
  appearance: auto;
  -webkit-appearance: auto;
}

/* Checkbox groups - different from radio groups */
fieldset[role="group"] {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding: 0;
  background-color: transparent;
}

/* Multi-column layout for checkbox groups with more than 5 items */
fieldset[role="group"]:has(label:nth-child(6)) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-2);
}

/* Checkbox group labels - clean, left-aligned with visible checkboxes */
fieldset[role="group"] label {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) 0;
  cursor: pointer;
  min-height: auto;
  border: none;
  background: none;
  font-weight: var(--font-weight-normal);
}

fieldset[role="group"] label:hover {
  color: var(--color-primary-700);
}

/* Checkbox inputs in groups - visible and styled */
fieldset[role="group"] input[type="checkbox"] {
  position: static;
  opacity: 1;
  width: var(--spacing-5);
  height: var(--spacing-5);
  min-height: var(--spacing-5);
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: var(--color-primary-600);
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

fieldset[role="group"] input[type="checkbox"]:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);
}

label[data-toggle] {
  display: inline-flex;
  justify-content: flex-end;
  flex-flow: row-reverse;
}
/* Hide the original checkbox in toggle switches */
label[data-toggle] input[type="checkbox"] {
  display: none;
}



/* Toggle switch container */
label[data-toggle] .toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background-color: var(--color-gray-300);
  border-radius: 12px;
  transition: background-color 200ms ease;
  cursor: pointer;
  flex-shrink: 0;
}

/* Toggle switch when checked - using :has() selector */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-switch {
  background-color: var(--color-success-600);
}


/* Toggle switch knob */
label[data-toggle] .toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: left 200ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Toggle knob when checked */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-knob {
  left: 22px;
}

/* Focus state for toggle switch */
label[data-toggle]:has(input[type="checkbox"]:focus) .toggle-switch {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Disabled state */
label[data-toggle]:has(input[type="checkbox"]:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

label[data-toggle]:has(input[type="checkbox"]:disabled) .toggle-switch {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="file"] {
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
}

/* Textareas */
textarea {
  min-height: calc(var(--spacing-4) * 5);
  padding: var(--spacing-3) var(--spacing-4);
  resize: vertical;
  line-height: var(--font-lineHeight-relaxed);
}

/* Select dropdowns */
select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--spacing-2) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--spacing-8);
}

/* Button styling */
button, .btn, input[type="submit"], input[type="button"], input[type="reset"] {
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: ${minButtonHeight}px;
  padding: calc(var(--spacing-1) * ${buttonPaddingValue}) var(--spacing-6);
  border: ${borderWidth}px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
  
  &:hover {
    background-color: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }
  
  &:focus {
    box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-600);
  
  &:hover {
    background-color: var(--color-primary-600);
    color: white;
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(${minButtonHeight}px * 0.8);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${minButtonHeight}px * 1.2);
}

/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: 0 var(--spacing-3);
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  align-items: center;
  position: relative;

  input[type="range"] {
    border: none
  }
}

.range-bubble {
  position: absolute;
  top: calc(-1 * (var(--range-thumb-size, 28px) + var(--spacing-2)));
  transform: translateX(-50%);
  min-width: calc(var(--range-thumb-size, 28px) * 0.8);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease, transform 150ms ease;
}

.range-bubble.visible {
  opacity: 1;
}

/* Anchor bubble to the thumb position using left (set by enhancer)
   and center with translateX(-50%). */

/* Array field styling */
.array-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.array-item {
  position: relative;
  padding: var(--spacing-4);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
}

.array-item fieldset {
  background-color: transparent;
  margin-bottom: var(--spacing-3);
}

.array-item fieldset:last-of-type {
  margin-bottom: 0;
}

.array-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
  flex-wrap: wrap;
}

.array-item .array-controls {
  padding-top: var(--spacing-3);
  border-top: ${borderWidth}px solid var(--color-border);
  margin-top: var(--spacing-4);
}

.array-controls button {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: auto;
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.checkbox-container input[type="checkbox"],
.checkbox-container input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
  padding-top: var(--spacing-4);
  border-top: ${borderWidth}px solid var(--color-border);
  margin-top: var(--spacing-6);
}

/* Desktop adjustments */
@media (min-width: 640px) {
  button, .btn, input[type="submit"], input[type="button"] {
    width: auto;
  }
  
  .actions {
    flex-direction: row;
  }
}

/* Mobile: stack buttons vertically */
@media (max-width: 639px) {
  .actions {
    flex-direction: column;
  }
  
  .actions button,
  .actions .btn {
    width: 100%;
  }
  
  /* Icon-only buttons should remain compact even on mobile */
  .actions button.icon-only,
  .actions a.icon-only {
    width: ${minButtonHeight}px;
    align-self: center;
  }
}

/* Accordion Styles for Details/Summary */
.config-accordion {
  display: grid;
  gap: var(--spacing-4);
}

.config-category {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.config-category:hover {
  border-color: var(--color-primary-300);
}

.config-category[open] {
  border-color: var(--color-primary-400);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  padding: var(--spacing-4) var(--spacing-5);
  cursor: pointer;
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-lg);
  transition: background-color var(--transition-fast);
  list-style: none;
  position: relative;
}

.category-header::-webkit-details-marker {
  display: none;
}

.category-header::marker {
  display: none;
}

.category-header:hover {
  background-color: var(--color-surface-elevated);
}

.config-category[open] .category-header {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-primary-50);
}

.category-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--font-lineHeight-tight);
}

.category-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--font-lineHeight-normal);
}

/* Custom arrow indicator */
.category-header::after {
  content: "";
  position: absolute;
  right: var(--spacing-5);
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  width: var(--spacing-3);
  height: var(--spacing-3);
  border-right: 2px solid var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
  border-radius: 0 0 2px 0;
  transition: transform var(--transition-fast);
}

.config-category[open] .category-header::after {
  transform: translateY(-50%) rotate(45deg);
}

.category-content {
  padding: var(--spacing-5);
  display: grid;
  gap: var(--spacing-5);
}

/* Basic and Advanced Sections */
.basic-fields {
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
}

.basic-fields legend {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
  padding: 0;
  background: none;
  border: none;
}

.advanced-fields {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-subtle);
}

.advanced-fields summary {
  padding: var(--spacing-3) var(--spacing-4);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast), color var(--transition-fast);
  list-style: none;
  position: relative;
}

.advanced-fields summary::-webkit-details-marker {
  display: none;
}

.advanced-fields summary::marker {
  display: none;
}

.advanced-fields summary:hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.advanced-fields[open] summary {
  border-bottom: 1px solid var(--color-border);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
}

/* Advanced section arrow */
.advanced-fields summary::after {
  content: "";
  position: absolute;
  right: var(--spacing-4);
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: var(--spacing-2);
  height: var(--spacing-2);
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  border-radius: 0 0 2px 0;
  transition: transform var(--transition-fast);
}

.advanced-fields[open] summary::after {
  transform: translateY(-50%) rotate(45deg);
}

.advanced-fields .fields {
  padding: var(--spacing-4);
  padding-top: var(--spacing-3);
}

.design-config-form {
  /* Mobile: Full screen */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-surface-base);
  z-index: var(--z-modal);
  overflow-y: auto;
  padding: var(--spacing-4);
  box-sizing: border-box;
}

.design-config-form h2 {
  margin: 0 0 var(--spacing-6) 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-4);
}

/* Desktop: Dialog window */
@media (min-width: 768px) {
  .design-config-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    max-width: 800px;
    height: 90vh;
    max-height: 800px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-extreme);
    border: 1px solid var(--color-border);
    padding: var(--spacing-6);
  }
  
  .design-config-form h2 {
    text-align: left;
    font-size: var(--font-size-xl);
  }
}

/* Modal backdrop */
auto-form::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-modal) - 1);
  backdrop-filter: blur(4px);
}

/* Hide backdrop on mobile (full screen) */
@media (max-width: 767px) {
  auto-form::before {
    display: none;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {

  fieldset {
    background-color: var(--color-surface-elevated);
    border: none;
  }

  legend {
    color: white;
    background-color: var(--color-surface-elevated);
    padding: var(--spacing-2) 0;
    border-radius: var(--radius-sm);
    border: none;
    font-weight: var(--font-weight-semibold);
  }

  .config-category {
    background-color: var(--color-surface-elevated);
    border-color: var(--color-border);
  }

  .config-category[open] .category-header {
    background-color: var(--color-primary-900);
  }

  .category-header {
    background-color: var(--color-surface-subtle);
  }

  .advanced-fields {
    background-color: var(--color-surface-base);
  }

  .advanced-fields[open] summary {
    background-color: var(--color-surface-elevated);
  }
}

`;
  }

  #generateTableStyles() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: ${breakpoints.sm - 1}px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
    
    table {
      min-width: 600px;
      margin: 0;
    }
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody {
  tr {
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--color-surface-subtle);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}

.table-striped tbody tr:nth-child(even) {
  background-color: var(--color-surface-subtle);
}

.table-bordered {
  border: 1px solid var(--color-border);
  
  th, td {
    border: 1px solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

`;
  }

  #generateAlertStyles() {
    return /*css*/ `/* Alert/Notification Styles */

.alert {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-relaxed);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

.alert-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}

.alert-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}

.alert-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}

.alert-danger,
.alert-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

.alert-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.alert-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg-icon {
    flex-shrink: 0;
  }
}

.alert-dismissible {
  padding-right: var(--spacing-12);
  position: relative;
}

.alert-close {
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
}

`;
  }

  #generateToastStyles() {
    return /*css*/ `/* Toast Notification Styles - Updated */
`;
  }

  #generateBadgeStyles() {
    return /*css*/ `/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
  border-radius: var(--radius-full);
}

.badge-primary {
  background-color: var(--color-primary-600);
  color: white;
}

.badge-secondary {
  background-color: var(--color-secondary-600);
  color: white;
}

.badge-success {
  background-color: var(--color-success-600);
  color: white;
}

.badge-info {
  background-color: var(--color-info-600);
  color: white;
}

.badge-warning {
  background-color: var(--color-warning-600);
  color: white;
}

.badge-danger {
  background-color: var(--color-danger-600);
  color: white;
}

.badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
}

.badge-outline.badge-primary {
  color: var(--color-primary-600);
}

.badge-outline.badge-secondary {
  color: var(--color-secondary-600);
}

.badge-outline.badge-success {
  color: var(--color-success-600);
}

.badge-outline.badge-info {
  color: var(--color-info-600);
}

.badge-outline.badge-warning {
  color: var(--color-warning-600);
}

.badge-outline.badge-danger {
  color: var(--color-danger-600);
}

.badge-sm {
  padding: 2px var(--spacing-1);
  font-size: 10px;
}

.badge-lg {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.pill {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
}

`;
  }

  #generateModalStyles() {
    const { layout = {}, a11y = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* Modal/Dialog Styles */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-modal);
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  
  &[open], &.is-open {
    display: flex;
  }
  
  @media (max-width: ${breakpoints.sm - 1}px) {
    padding: 0;
  }
}

.dialog::backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--backdrop-background);
  backdrop-filter: var(--backdrop-filter);
  z-index: -1;
  animation: fadeIn var(--transition-fast);
}

.modal-content {
  position: relative;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp var(--transition-normal);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  color: var(--color-text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-2);
  transition: opacity var(--transition-fast);
  border-radius: var(--radius-sm);
  
  &:hover {
    opacity: 1;
    background-color: var(--color-surface-subtle);
  }
}

.modal-body {
  padding: var(--spacing-6);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-border);
}

.modal-sm .modal-content {
  max-width: 400px;
}

.modal-lg .modal-content {
  max-width: 800px;
}

.modal-xl .modal-content {
  max-width: 1200px;
}

@media (max-width: ${breakpoints.sm - 1}px) {
  .modal-content {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
  
  .modal-backdrop {
    display: none;
  }
}

@media (min-width: ${breakpoints.md}px) {
  .modal-fullscreen .modal-content {
    max-width: 90vw;
    max-height: 90vh;
  }
}

`;
  }

  #generateTabStripStyles() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);
}

pds-tabstrip > nav {
  display: flex;
  gap: var(--spacing-1);
  border-bottom: 2px solid var(--color-border);
  margin-bottom: var(--spacing-6);
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

pds-tabstrip > nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Tab links */
pds-tabstrip > nav > a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color var(--transition-fast);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px; /* Overlap the nav border */
}

pds-tabstrip > nav > a:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-hover);
}

pds-tabstrip > nav > a:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
  z-index: 1;
}

/* Active tab */
pds-tabstrip > nav > a[aria-current="page"] {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
  border-bottom-color: var(--color-primary-600);
}

pds-tabstrip > nav > a[aria-current="page"]:hover {
  color: var(--color-primary-700);
  border-bottom-color: var(--color-primary-700);
  background-color: var(--color-primary-50);
}

/* Tab panel */
pds-tabstrip > pds-tabpanel {
  display: block;
  margin-top: var(--spacing-4);
}

pds-tabstrip > pds-tabpanel[data-tabpanel] {
  animation: tabFadeIn var(--transition-normal) ease-out;
}

@keyframes tabFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

pds-tabstrip > pds-tabpanel[data-tabpanel][hidden] {
  display: none;
}

/* Tab content styling */
pds-tabstrip > pds-tabpanel[data-tabpanel] {
  padding: var(--spacing-4) 0;
}

/* Mobile responsive */
@media (max-width: ${breakpoints.sm - 1}px) {
  pds-tabstrip > nav {
    gap: var(--spacing-1);
  }

  pds-tabstrip > nav > a {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }

  pds-tabstrip > pds-tabpanel[data-tabpanel] {
    padding: var(--spacing-3) 0;
  }
}

`;
  }

  #generateScrollbarStyles() {
    return /*css*/ `/* Custom Scrollbars */

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  
  &-track {
    background: transparent;
  }
  
  &-thumb {
    background: var(--color-secondary-300);
    border-radius: var(--radius-full);
    border: 3px solid transparent;
    background-clip: padding-box;
    transition: background-color var(--transition-fast);
    
    &:hover {
      background: var(--color-secondary-400);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    &:active {
      background: var(--color-secondary-500);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    @media (prefers-color-scheme: dark) {
      background: var(--color-secondary-600);
      
      &:hover {
        background: var(--color-secondary-500);
      }
      
      &:active {
        background: var(--color-secondary-400);
      }
    }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  
  @media (prefers-color-scheme: dark) {
    scrollbar-color: var(--color-secondary-600) transparent;
  }
}

/* Hover effect for scrollable containers */
*:hover {
  scrollbar-color: var(--color-secondary-400) transparent;
}

@media (prefers-color-scheme: dark) {
  *:hover {
    scrollbar-color: var(--color-secondary-500) transparent;
  }
}

`;
  }

  #generateIconStyles() {
    const { a11y = {} } = this.options;
    const minTouchTarget =
      a11y.minTouchTarget || enums.TouchTargetSizes.standard;

    return /*css*/ `/* Icon System */

svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
}

/* Icon size utilities */
.icon-xs,
svg-icon[size="xs"] {
  width: var(--icon-size-xs);
  height: var(--icon-size-xs);
}

.icon-sm,
svg-icon[size="sm"] {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}

.icon-md,
svg-icon[size="md"] {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
}

.icon-lg,
svg-icon[size="lg"] {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}

.icon-xl,
svg-icon[size="xl"] {
  width: var(--icon-size-xl);
  height: var(--icon-size-xl);
}

.icon-2xl,
svg-icon[size="2xl"] {
  width: var(--icon-size-2xl);
  height: var(--icon-size-2xl);
}

/* Icon color utilities */
.icon-primary,
svg-icon.primary {
  color: var(--color-primary-600);
}

.icon-secondary,
svg-icon.secondary {
  color: var(--color-secondary-600);
}

.icon-accent,
svg-icon.accent {
  color: var(--color-accent-600);
}

.icon-success,
svg-icon.success {
  color: var(--color-success-600);
}

.icon-warning,
svg-icon.warning {
  color: var(--color-warning-600);
}

.icon-danger,
svg-icon.danger {
  color: var(--color-danger-600);
}

.icon-info,
svg-icon.info {
  color: var(--color-info-600);
}

.icon-muted,
svg-icon.muted {
  color: var(--color-text-muted);
}

.icon-subtle,
svg-icon.subtle {
  color: var(--color-text-subtle);
}

/* Icon with text combinations */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
}

.icon-text-start {
  flex-direction: row;
}

.icon-text-end {
  flex-direction: row-reverse;
}

/* Button icon utilities */
button svg-icon,
a svg-icon {
  flex-shrink: 0;
}

button.icon-only,
a.icon-only {
  padding: var(--spacing-2);
  min-width: ${minTouchTarget}px;
  width: ${minTouchTarget}px;
  height: ${minTouchTarget}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Icon in inputs */
.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon svg-icon {
  position: absolute;
  left: var(--spacing-3);
  color: var(--color-text-muted);
  pointer-events: none;
}

.input-icon input {
  padding-left: calc(var(--icon-size) + var(--spacing-5));
}

.input-icon-end svg-icon {
  left: auto;
  right: var(--spacing-3);
}

.input-icon-end input {
  padding-left: var(--spacing-3);
  padding-right: calc(var(--icon-size) + var(--spacing-5));
}

`;
  }

  #generateLayoutUtilities() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* Mobile-First Layout Utilities */
.container {
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4); /* Mobile padding */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Responsive container padding and max-width */
@media (min-width: ${breakpoints.sm}px) {
  .container {
    padding: 0 var(--spacing-6);
  }
}

@media (min-width: ${breakpoints.md}px) {
  .container {
    max-width: var(--layout-maxWidth);
    padding: 0 var(--layout-containerPadding);
  }
}

/* Mobile-first Flexbox */
.flex {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on mobile */
}

.flex > * {
  min-width: 0; /* Prevent flex children from overflowing */
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

/* Mobile: stack by default, row on larger screens */
.flex-mobile-col {
  flex-direction: column;
}

@media (min-width: ${breakpoints.sm}px) {
  .flex-mobile-col {
    flex-direction: row;
  }
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.items-stretch {
  align-items: stretch;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-start {
  justify-content: flex-start;
}

/* Mobile-first spacing */
.gap-1 { gap: var(--spacing-1); }
.gap-2 { gap: var(--spacing-2); }
.gap-3 { gap: var(--spacing-3); }
.gap-4 { gap: var(--spacing-4); }
.gap-6 { gap: var(--spacing-6); }
.gap-8 { gap: var(--spacing-8); }

/* Mobile-first Grid */
.grid {
  display: grid;
  width: 100%;
  gap: var(--spacing-4);
}

.grid > * {
  min-width: 0; /* Prevent grid children from overflowing */
}

/* Mobile: single column by default */
.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: 1fr; } /* Single column on mobile */
.grid-cols-3 { grid-template-columns: 1fr; } /* Single column on mobile */
.grid-cols-4 { grid-template-columns: 1fr; } /* Single column on mobile */

/* Responsive grid columns */
@media (min-width: ${breakpoints.sm}px) {
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: ${breakpoints.md}px) {
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: ${breakpoints.lg}px) {
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Surface backgrounds for nesting */
.surface-base {
  background-color: var(--color-surface-base);
}

.surface-base fieldset {
  background-color: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
  box-shadow: var(--shadow-sm);
}

.surface-elevated fieldset {
  background-color: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-md);
}

.surface-overlay fieldset {
  background-color: var(--color-surface-elevated);
}

/* Default behavior when no surface class is present */
body:not([class*="surface-"]) fieldset,
.container fieldset {
  background-color: var(--color-surface-subtle);
}

/* Mobile-first Cards */
.card {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4); /* Smaller padding on mobile */
  box-shadow: var(--shadow-base);
  transition: box-shadow var(--transition-normal);
  width: 100%;
  margin-bottom: var(--spacing-4);
}

@media (min-width: ${breakpoints.sm}px) {
  .card {
    padding: var(--spacing-6); /* Larger padding on desktop */
  }
}

.card:hover {
  box-shadow: var(--shadow-md);
}

/* Mobile-first spacing utilities */
.p-0 { padding: var(--spacing-0); }
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }
.p-8 { padding: var(--spacing-8); }

.px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
.py-4 { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }

.m-0 { margin: var(--spacing-0); }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-6 { margin: var(--spacing-6); }
.m-8 { margin: var(--spacing-8); }

.mx-auto { margin-left: auto; margin-right: auto; }

.mb-4 { margin-bottom: var(--spacing-4); }
.mt-4 { margin-top: var(--spacing-4); }
.mr-4 { margin-right: var(--spacing-4); }
.ml-4 { margin-left: var(--spacing-4); }

/* Mobile-first text utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }

/* Generic container helpers (form-group, stack) */
.form-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.form-group > * {
  margin: 0;
}

.form-group .form-actions {
  margin-left: auto; /* push actions to the right */
  display: flex;
  gap: var(--spacing-2);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.stack-sm { gap: var(--spacing-1); }
.stack-lg { gap: var(--spacing-6); }
.text-lg { font-size: var(--font-size-lg); }

/* Hide/show utilities */
.hidden { display: none; }
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }

/* Mobile-specific utilities */
.mobile-hidden { display: none; }
.desktop-hidden { display: block; }

@media (min-width: ${breakpoints.sm}px) {
  .mobile-hidden { display: block; }
  .desktop-hidden { display: none; }
}

`;
  }

  #generateMediaUtilities() {
    return /*css*/ `/* Media Element Utilities */

/* Gallery images */
.img-gallery {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

/* Responsive images with different radius sizes */
.img-rounded-sm { border-radius: var(--radius-sm); }
.img-rounded-md { border-radius: var(--radius-md); }
.img-rounded-lg { border-radius: var(--radius-lg); }
.img-rounded-xl { border-radius: var(--radius-xl); }
.img-rounded-full { border-radius: var(--radius-full); }

/* Inline images */
.img-inline {
  display: inline;
  vertical-align: middle;
  border-radius: var(--radius-xs);
  margin: 0 var(--spacing-1);
  max-width: 60px;
  height: auto;
}

/* Video specific utilities */
.video-responsive {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: var(--radius-md);
}

/* Figure utilities */
.figure-responsive {
  width: 100%;
  height: auto;
}

`;
  }

  #generateMediaQueries() {
    const { layout = {}, a11y = {} } = this.options;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };
    const minTouchTarget =
      a11y.minTouchTarget || enums.TouchTargetSizes.standard;

    return /*css*/ `/* Mobile-First Responsive Design */

/* Small devices (${breakpoints.sm}px and up) */
@media (min-width: ${breakpoints.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:text-sm { font-size: var(--font-size-sm); }
  .sm\\:p-6 { padding: var(--spacing-6); }
  .sm\\:gap-6 { gap: var(--spacing-6); }
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
}

/* Medium devices (${breakpoints.md}px and up) */
@media (min-width: ${breakpoints.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\\:text-lg { font-size: var(--font-size-lg); }
  .md\\:p-8 { padding: var(--spacing-8); }
  .md\\:gap-8 { gap: var(--spacing-8); }
  .md\\:flex-row { flex-direction: row; }
  .md\\:w-1\\/2 { width: 50%; }
  .md\\:w-1\\/3 { width: 33.333333%; }
  .md\\:hidden { display: none; }
  .md\\:block { display: block; }
}

/* Large devices (${breakpoints.lg}px and up) */
@media (min-width: ${breakpoints.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .lg\\:text-xl { font-size: var(--font-size-xl); }
  .lg\\:p-12 { padding: var(--spacing-12); }
  .lg\\:gap-12 { gap: var(--spacing-12); }
  .lg\\:w-1\\/4 { width: 25%; }
  .lg\\:hidden { display: none; }
  .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets */
  button, a, input, select, textarea {
    min-height: ${minTouchTarget}px;
    min-width: ${minTouchTarget}px;
  }
  
  /* Disable hover effects on touch devices */
  .card:hover {
    box-shadow: var(--shadow-base);
  }
  
  a:hover {
    color: var(--color-primary-600);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --color-primary-600: #0000ff;
    --color-primary-700: #0000cc;
  }
  
  button, input, textarea, select {
    border-width: 2px;
  }
}

/* Print styles */
@media print {
  *, *::before, *::after {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  a, a:visited {
    text-decoration: underline;
  }
  
  button {
    display: none;
  }
  
  .mobile-hidden, .desktop-hidden {
    display: block !important;
  }
}

`;
  }

  // Utility methods for color manipulation
  #hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  #hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // // Method to update design system
  // updateDesign(newOptions) {
  //   this.options = { ...this.options, ...newOptions };
  //   this.tokens = this.#generateTokens();
  //   this.css = this.#generateCSS();

  //   // Regenerate layers
  //   this.#generateLayers();

  //   // Only update browser-specific features if in browser environment
  //   if (typeof CSSStyleSheet !== "undefined") {
  //     this.#updateConstructableStylesheets();
  //     this.#recreateBlobURLs();
  //   }
  // }

  // Method to get current tokens (useful for debugging)
  getTokens() {
    return this.tokens;
  }

  // Method to export CSS (useful for build processes)
  exportCSS() {
    return this.css;
  }

  // ========================================================================
  // LAYER SEPARATION ARCHITECTURE (Best Practices 2025)
  // ========================================================================

  /**
   * Generate separate CSS layers: tokens, primitives, components, utilities
   * Following the cascade layers pattern from the best practices document
   */
  #generateLayers() {
    this.#layers = {
      tokens: this.#generateTokensLayer(),
      primitives: this.#generatePrimitivesLayer(),
      components: this.#generateComponentsLayer(),
      utilities: this.#generateUtilitiesLayer(),
    };

    if (this.options.debug) {
      console.log("[Generator] Layer sizes:", {
        tokens: `${(this.#layers.tokens.length / 1024).toFixed(2)} KB`,
        primitives: `${(this.#layers.primitives.length / 1024).toFixed(2)} KB`,
        components: `${(this.#layers.components.length / 1024).toFixed(2)} KB`,
        utilities: `${(this.#layers.utilities.length / 1024).toFixed(2)} KB`,
      });
    }
  }

  #generateTokensLayer() {
    const {
      colors,
      spacing,
      radius,
      typography,
      shadows,
      layout,
      transitions,
      zIndex,
      icons,
    } = this.tokens;

    let css = /*css*/ `@layer tokens {
       :root {
          ${this.#generateColorVariables(colors)}
          ${this.#generateSpacingVariables(spacing)}
          ${this.#generateRadiusVariables(radius)}
          ${this.#generateTypographyVariables(typography)}
          ${this.#generateShadowVariables(shadows)}
          ${this.#generateLayoutVariables(layout)}
          ${this.#generateTransitionVariables(transitions)}
          ${this.#generateZIndexVariables(zIndex)}
          ${this.#generateIconVariables(icons)}
       };
       ${this.#generateDarkModeCSS(colors)}
    }`;

    return css;
  }

  #generatePrimitivesLayer() {
    const { advanced = {}, a11y = {}, layout = {} } = this.options;
    const tabSize = advanced.tabSize || enums.TabSizes.standard;
    const minTouchTarget =
      a11y.minTouchTarget || enums.TouchTargetSizes.standard;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    // Primitives = baseline UA-reset + token-driven styles for native elements
    // No component classes, only element selectors with :where() for zero specificity
    return /*css*/ `@layer primitives {
  /* Base HTML reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :where(html) {
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-lineHeight-normal);
    color: var(--color-text-primary);
    background-color: var(--color-surface-base);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: ${tabSize};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  :where(dialog){
    background-color: transparent;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: var(--layout-minHeight, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-600);
    padding: var(--spacing-2) var(--spacing-4);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    min-height: ${minTouchTarget}px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-700);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  :where(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(button):active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Input primitives */
  :where(input:not([type="radio"]):not([type="checkbox"]):not([type="range"]):not([type="color"])),
  :where(select),
  :where(textarea) {
    font: inherit;
    color: var(--color-text-primary);
    background: var(--color-input-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-2) var(--spacing-3);
    min-height: 40px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  :where(input):focus-visible,
  :where(select):focus-visible,
  :where(textarea):focus-visible {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
  }

  :where(input):disabled,
  :where(select):disabled,
  :where(textarea):disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-input-disabled-bg);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-600);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: opacity var(--transition-fast);
  }

  :where(a):hover {
    opacity: 0.8;
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  /* Form primitives */
  :where(label) {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  :where(fieldset) {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
    margin: 0 0 var(--spacing-4) 0;
    background-color: var(--color-surface-subtle);
  }

  :where(legend) {
    font-weight: var(--font-weight-semibold);
    padding: 0 var(--spacing-2);
    color: var(--color-text-primary);
  }

  /* List primitives */
  :where(ul, ol) {
    padding-left: var(--spacing-6);
    margin: var(--spacing-3) 0;
  }

  :where(li) {
    margin: var(--spacing-1) 0;
  }

  /* Typography primitives */
  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-headings);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-lineHeight-tight);
    margin: var(--spacing-4) 0 var(--spacing-3) 0;
    color: var(--color-text-primary);
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  /* Mobile-first heading sizes */
  :where(h1) { font-size: var(--font-size-2xl); }
  :where(h2) { font-size: var(--font-size-xl); }
  :where(h3) { font-size: var(--font-size-lg); }
  :where(h4) { font-size: var(--font-size-base); }
  :where(h5) { font-size: var(--font-size-sm); }
  :where(h6) { font-size: var(--font-size-xs); }

  /* Scale up on larger screens */
  @media (min-width: ${breakpoints.sm}px) {
    :where(h1) { font-size: var(--font-size-3xl); }
    :where(h2) { font-size: var(--font-size-2xl); }
    :where(h3) { font-size: var(--font-size-xl); }
    :where(h4) { font-size: var(--font-size-lg); }
    :where(h5) { font-size: var(--font-size-base); }
    :where(h6) { font-size: var(--font-size-sm); }
  }

  :where(p) {
    margin: var(--spacing-3) 0;
    line-height: var(--font-lineHeight-relaxed);
    color: var(--color-text-primary);
  }

  /* Code primitives */
  :where(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
    background: var(--color-surface-muted);
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
  }

  :where(pre) {
    font-family: var(--font-family-mono, monospace);
    background: var(--color-surface-muted);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }

  :where(pre code) {
    background: none;
    padding: 0;
  }

  /* Media primitives */
  :where(img, video) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  :where(figure) {
    margin: 0 0 var(--spacing-6) 0;
  }

  :where(figcaption) {
    margin-top: var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--font-lineHeight-relaxed);
  }
}
`;
  }

  #generateComponentsLayer() {
    const { components = {} } = this.options;
    let css = `@layer components {\n`;

    // Semantic HTML element styles (blockquote, hr, details, etc.)
    css += this.#generateSemanticHTMLStyles();

    // Form component styles (buttons, inputs, checkboxes, radio buttons, toggles, etc.)
    css += this.#generateFormStyles();

    // Alert component styles

    css += this.#generateAlertStyles();

    // Badge component styles

    css += this.#generateBadgeStyles();

    // Modal component styles
    css += this.#generateModalStyles();

    // TabStrip component styles
    if (components.tabStrip !== false) {
      css += this.#generateTabStripStyles();
    }

    // Table component styles
    if (components.tables !== false) {
      css += this.#generateTableStyles();
    }

    // Custom scrollbar styles
    if (components.customScrollbars !== false) {
      css += this.#generateScrollbarStyles();
    }

    css += "}\n";
    return css;
  }

  #generateUtilitiesLayer() {
    let css = `@layer utilities {\n`;

    // Icon utilities
    css += this.#generateIconStyles();

    // Layout utilities
    css += this.#generateLayoutUtilities();

    // Media utilities
    css += this.#generateMediaUtilities();

    // Responsive media queries with utility classes
    css += this.#generateMediaQueries();

    css += "}\n";
    return css;
  }

  /**
   * Create constructable stylesheets for each layer
   */
  #createConstructableStylesheets() {
    this.#stylesheets = {
      tokens: new CSSStyleSheet(),
      primitives: new CSSStyleSheet(),
      components: new CSSStyleSheet(),
      utilities: new CSSStyleSheet(),
    };
    this.#updateConstructableStylesheets();
  }

  #updateConstructableStylesheets() {
    this.#stylesheets.tokens.replaceSync(this.#layers.tokens);
    this.#stylesheets.primitives.replaceSync(this.#layers.primitives);
    this.#stylesheets.components.replaceSync(this.#layers.components);
    this.#stylesheets.utilities.replaceSync(this.#layers.utilities);
  }

  /**
   * Create BLOB URLs for live injection
   */
  #createBlobURLs() {
    this.#blobURLs = {};
    this.#recreateBlobURLs();
  }

  #recreateBlobURLs() {
    // Safety check
    if (!this.#layers) {
      console.error(
        "[Generator] Cannot create BLOB URLs: layers not generated"
      );
      return;
    }

    // Revoke old URLs
    if (this.#blobURLs) {
      Object.values(this.#blobURLs).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    }

    // Create new BLOB URLs for each layer
    this.#blobURLs.tokens = this.#createBlobURL(this.#layers.tokens);
    this.#blobURLs.primitives = this.#createBlobURL(this.#layers.primitives);
    this.#blobURLs.components = this.#createBlobURL(this.#layers.components);
    this.#blobURLs.utilities = this.#createBlobURL(this.#layers.utilities);

    // Combined styles (layers already have @layer wrappers, just concatenate)
    const combined = `${this.#layers.tokens}\n${this.#layers.primitives}\n${
      this.#layers.components
    }\n${this.#layers.utilities}`;
    this.#blobURLs.styles = this.#createBlobURL(combined);

    if (this.options.debug) {
      console.log(
        "[Generator] Created BLOB URL for combined styles:",
        this.#blobURLs.styles
      );
    }
  }

  #createBlobURL(css) {
    const blob = new Blob([css], { type: "text/css" });
    return URL.createObjectURL(blob);
  }

  // ========================================================================
  // PUBLIC GETTERS FOR LAYER ACCESS
  // ========================================================================

  // CSS strings (raw)
  get tokensCSS() {
    return this.#layers?.tokens || "";
  }
  get primitivesCSS() {
    return this.#layers?.primitives || "";
  }
  get componentsCSS() {
    return this.#layers?.components || "";
  }
  get utilitiesCSS() {
    return this.#layers?.utilities || "";
  }
  get layeredCSS() {
    if (!this.#layers) return "";
    // Each layer already has @layer wrapper, just concatenate
    return `${this.#layers.tokens}\n${this.#layers.primitives}\n${
      this.#layers.components
    }\n${this.#layers.utilities}`;
  }

  // Constructable stylesheets (browser only)
  get tokensStylesheet() {
    return this.#stylesheets?.tokens;
  }
  get primitivesStylesheet() {
    return this.#stylesheets?.primitives;
  }
  get componentsStylesheet() {
    return this.#stylesheets?.components;
  }
  get utilitiesStylesheet() {
    return this.#stylesheets?.utilities;
  }

  // BLOB URLs (browser only)
  get tokensBlobURL() {
    return this.#blobURLs?.tokens;
  }
  get primitivesBlobURL() {
    return this.#blobURLs?.primitives;
  }
  get componentsBlobURL() {
    return this.#blobURLs?.components;
  }
  get utilitiesBlobURL() {
    return this.#blobURLs?.utilities;
  }
  get stylesBlobURL() {
    return this.#blobURLs?.styles;
  }

  /**
   * Generate CSS module files for export
   * Returns object with filename => content
   */
  getCSSModules() {
    return {
      "pds-tokens.css.js": this.#generateCSSModule(
        "tokens",
        this.#layers.tokens
      ),
      "pds-primitives.css.js": this.#generateCSSModule(
        "primitives",
        this.#layers.primitives
      ),
      "pds-components.css.js": this.#generateCSSModule(
        "components",
        this.#layers.components
      ),
      "pds-utilities.css.js": this.#generateCSSModule(
        "utilities",
        this.#layers.utilities
      ),
      "pds-styles.css.js": this.#generateCSSModule("styles", this.layeredCSS),
    };
  }

  #generateCSSModule(name, css) {
    // Escape backticks and backslashes in CSS
    const escapedCSS = css
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");

    return `// Pure Design System - ${name}
// Auto-generated - do not edit directly

export const ${name} = new CSSStyleSheet();
${name}.replaceSync(\`${escapedCSS}\`);

export const ${name}CSS = \`${escapedCSS}\`;
`;
  }

  /**
   * Static method to apply styles to document
   * Creates a link element with BLOB URL
   * @param {Generator} designer - The Generator instance with generated styles
   */
  static applyStyles(designer) {
    // Validate parameter
    if (!designer || typeof designer !== "object") {
      console.error("[Generator] applyStyles requires a designer object");
      return;
    }

    // Preferred: use the in-memory css text produced by the designer for atomic updates
    const cssText = designer.css || designer.layeredCSS || "";
    if (!cssText) {
      console.warn("[Generator] No CSS available on designer to apply");
      return;
    }

    // Install/update runtime styles atomically to avoid flicker caused by
    // creating/removing <link> or swapping blob URLs.
    Generator.installRuntimeStyles(cssText);
    if (designer && designer.#blobURLs && this.options?.debug) {
      console.log("[Generator] Applied live styles via in-place stylesheet");
    }
  }

  /**
   * Install runtime styles for PDS using constructable stylesheets when
   * available, otherwise update a single <style id="pds-runtime-stylesheet">.
   * This approach reduces flicker and avoids link/blob swapping.
   */
  static installRuntimeStyles(cssText) {
    try {
      if (typeof document === "undefined") return; // server-side guard

      // Preferred: constructable stylesheet (fast, atomic)
      if (
        typeof CSSStyleSheet !== "undefined" &&
        "adoptedStyleSheets" in Document.prototype
      ) {
        const sheet = new CSSStyleSheet();
        // replaceSync is synchronous and atomic for the stylesheet
        sheet.replaceSync(cssText);

        // Tag it so we can keep existing non-PDS sheets
        sheet._pds = true;

        const others = (document.adoptedStyleSheets || []).filter(
          (s) => s._pds !== true
        );
        document.adoptedStyleSheets = [...others, sheet];

        // Keep a reference
        Generator.__pdsRuntimeSheet = sheet;
        return;
      }

      // Fallback: single <style> element in the document head
      const styleId = "pds-runtime-stylesheet";
      let el = document.getElementById(styleId);
      if (!el) {
        el = document.createElement("style");
        el.id = styleId;
        el.type = "text/css";
        const head = document.head || document.getElementsByTagName("head")[0];
        if (head) head.appendChild(el);
        else document.documentElement.appendChild(el);
      }

      // Update the stylesheet content in place
      el.textContent = cssText;
    } catch (err) {
      console.warn("Generator.installRuntimeStyles failed:", err);
    }
  }
}

// ============================================================================
// PDS ADOPTER - Helper for web components
// ============================================================================

/**
 * Adopt primitives stylesheet into a shadow root
 * This is the primary method components should use
 *
 * @param {ShadowRoot} shadowRoot - The shadow root to adopt into
 * @param {CSSStyleSheet[]} additionalSheets - Additional component-specific stylesheets
 * @returns {Promise<void>}
 *
 * @example
 * // In your web component:
 * import { adoptPrimitives } from './auto-designer.js';
 *
 * async connectedCallback() {
 *   this.attachShadow({ mode: 'open' });
 *
 *   const componentStyles = new CSSStyleSheet();
 *   componentStyles.replaceSync(`...your styles...`);
 *
 *   await adoptPrimitives(this.shadowRoot, [componentStyles]);
 * }
 */
export async function adoptPrimitives(shadowRoot, additionalSheets = []) {
  try {
    // Get primitives stylesheet (live or static)
    const primitives = await PDS.registry.getStylesheet("primitives");

    // Adopt primitives + additional sheets
    shadowRoot.adoptedStyleSheets = [primitives, ...additionalSheets];

    if (PDS.registry.isLive) {
      const componentName =
        shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    }
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt primitives:`,
      error
    );
    // Continue with just additional sheets as fallback
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}

/**
 * Adopt multiple layers into a shadow root
 * For complex components that need more than just primitives
 *
 * @param {ShadowRoot} shadowRoot - The shadow root to adopt into
 * @param {string[]} layers - Array of layer names to adopt (e.g., ['tokens', 'primitives', 'components'])
 * @param {CSSStyleSheet[]} additionalSheets - Additional component-specific stylesheets
 * @returns {Promise<void>}
 */
export async function adoptLayers(
  shadowRoot,
  layers = ["primitives"],
  additionalSheets = []
) {
  try {
    // Get all requested stylesheets
    const stylesheets = await Promise.all(
      layers.map((layer) => PDS.registry.getStylesheet(layer))
    );

    // Filter out any null results
    const validStylesheets = stylesheets.filter((sheet) => sheet !== null);

    // Adopt all layers + additional sheets
    shadowRoot.adoptedStyleSheets = [...validStylesheets, ...additionalSheets];

    if (PDS.registry.isLive) {
      const componentName =
        shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    }
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt layers:`,
      error
    );
    // Continue with just additional sheets as fallback
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}

/**
 * Create a component-specific stylesheet from CSS string
 * Helper to create constructable stylesheets
 *
 * @param {string} css - CSS string
 * @returns {CSSStyleSheet}
 */
export function createStylesheet(css) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}

/**
 * Check if running in live design system context
 * Useful for conditional behavior
 *
 * @returns {boolean}
 */
export function isLiveMode() {
  return pdsRegistry.isLive;
}
