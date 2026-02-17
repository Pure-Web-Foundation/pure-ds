import { presets } from "./pds-config.js";

/**
 * Generator - A JS-config-first design system
 * Generates comprehensive CSS variables and styles from a minimal configuration
 */
export class Generator {
  // Singleton instance
  static #instance;

  static get instance() {
    return this.#instance;
  }

  // Private internal fields
  #layers;
  #stylesheets;
  //#blobURLs;

  constructor(options = {}) {
    this.options = {
      // All defaults should come from config, no hardcoded values
      debug: false,
      ...options,
    };

    // Ensure design is always present for internal access
    if (!this.options.design) {
      this.options.design = {};
    }
    if (this.options.debug) {
      this.options.log?.("debug", "Generator options:", this.options);
    }

    // Set singleton instance
    Generator.#instance = this;

    this.tokens = this.generateTokens();
    if (this.options.debug) {
      this.options.log?.("debug", "Generated tokens:", this.tokens);
    }

    // NEW: Generate separate layers for modern architecture
    this.#generateLayers();

    // Only create browser-specific features if in browser environment
    if (typeof CSSStyleSheet !== "undefined") {
      this.#createConstructableStylesheets();
      //this.#createBlobURLs();

      // if (this.options.debug) {
      //   this.options.log?.("debug", "[Generator] Created BLOB URLs:", {
      //     styles: this.#blobURLs?.styles,
      //     primitives: this.#blobURLs?.primitives,
      //   });
      // }
    } else {
      if (this.options.debug) {
        this.options.log?.(
          "debug",
          "[Generator] Skipping browser features (CSSStyleSheet not available)",
        );
      }
    }
  }

  generateTokens() {
    // Access design configuration from options.design
    const config = this.options.design || {};
    const shadowOpacityConfig = this.#resolveShadowOpacityConfig(config);
    const layersConfig = config.layers || {};
    const shadowConfig = this.#mergeShadowConfig(
      layersConfig,
      shadowOpacityConfig.light,
    );
    const shadows = this.#generateShadowTokens(shadowConfig);
    const darkShadows =
      shadowOpacityConfig.dark != null
        ? this.#generateShadowTokens(
            this.#mergeShadowConfig(layersConfig, shadowOpacityConfig.dark),
          )
        : null;

    return {
      colors: this.#generateColorTokens(
        config.colors || {},
        shadowOpacityConfig,
      ),
      spacing: this.generateSpacingTokens(config.spatialRhythm || {}),
      radius: this.#generateRadiusTokens(config.shape || {}),
      borderWidths: this.#generateBorderWidthTokens(config.shape || {}),
      typography: this.generateTypographyTokens(config.typography || {}),
      shadows,
      darkShadows,
      layout: this.#generateLayoutTokens(config.layout || {}),
      transitions: this.#generateTransitionTokens(config.behavior || {}),
      zIndex: this.#generateZIndexTokens(config.layers || {}),
      icons: this.#generateIconTokens(config.icons || {}),
    };
  }

  #resolveShadowOpacityConfig(config = {}) {
    const layout = config.layout || {};
    const layers = config.layers || {};

    return {
      light: this.#normalizeOpacity(
        layout.baseShadowOpacity ?? layers.baseShadowOpacity,
      ),
      dark: this.#normalizeOpacity(
        layout.darkMode?.baseShadowOpacity ??
          layers.darkMode?.baseShadowOpacity,
      ),
    };
  }

  #normalizeOpacity(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return undefined;
    return Math.min(Math.max(numeric, 0), 1);
  }

  #mergeShadowConfig(layersConfig = {}, baseShadowOpacity) {
    const merged = { ...layersConfig };
    if (baseShadowOpacity != null) {
      merged.baseShadowOpacity = baseShadowOpacity;
    }
    return merged;
  }

  #generateColorTokens(colorConfig, shadowOpacityConfig = {}) {
    const {
      primary = "#3b82f6",
      secondary = "#64748b", // REQUIRED for gray scale generation
      accent = "#ec4899",
      background = "#ffffff",
      success = null,
      warning = "#FFBF00",
      danger = null,
      info = null,
      darkMode = {}, // Extract dark mode overrides
    } = colorConfig;

    const colors = {
      // Generate color scales
      primary: this.#generateColorScale(primary),
      secondary: this.#generateColorScale(secondary),
      accent: this.#generateColorScale(accent),

      // Semantic colors - use provided or derive from primary/accent
      success: this.#generateColorScale(
        success || this.#deriveSuccessColor(primary),
      ),
      warning: this.#generateColorScale(warning || accent),
      danger: this.#generateColorScale(
        danger || this.#deriveDangerColor(primary),
      ),
      info: this.#generateColorScale(info || primary),

      // Neutral grays derived from secondary color
      gray: this.#generateGrayScale(secondary),

      // Background-based surface colors for tasteful variations
      surface: this.#generateBackgroundShades(background),
    };

    // Add adaptive fieldset colors to surface
    colors.surface.fieldset = this.#generateFieldsetAdaptiveColors(
      colors.surface,
    );

    // Generate smart surface tokens with context-aware text, icons, shadows, and borders
    colors.surfaceSmart = this.#generateSmartSurfaceTokens(
      colors.surface,
      shadowOpacityConfig,
    );

    // Generate dark mode variants using darkMode overrides from config
    colors.dark = this.#generateDarkModeColors(
      colors,
      background,
      darkMode, // Pass the darkMode object directly
    );

    // Generate smart tokens for dark mode surfaces too
    if (colors.dark && colors.dark.surface) {
      colors.dark.surfaceSmart = this.#generateSmartSurfaceTokens(
        colors.dark.surface,
        shadowOpacityConfig,
      );
    }

    // NEW: Generate interactive semantic tokens for buttons vs links/outlines
    // Use purpose-specific shade selection for optimal contrast
    colors.interactive = {
      light: {
        fill: this.#pickFillShadeForWhite(colors.primary, 4.5), // For button fills with white text
        text: colors.primary[600], // For links/outlines on light backgrounds
      },
      dark: {
        fill: this.#pickFillShadeForWhite(colors.dark.primary, 4.5), // For button fills with white text
        text: this.#pickReadablePrimaryOnSurface(
          colors.dark.primary,
          colors.dark.surface.base,
          4.5,
        ), // For links/outlines on dark backgrounds
      },
    };

    return colors;
  }

  #generateColorScale(baseColor) {
    const hsl = this.#hexToHsl(baseColor);
    return {
      50: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 10, 10),
        Math.min(hsl.l + 45, 95),
      ),
      100: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 5, 15),
        Math.min(hsl.l + 35, 90),
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

  #deriveSuccessColor(mainColor) {
    // Generate a green success color by rotating the hue of the main color
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(120, Math.max(hsl.s, 60), 45); // Green-ish success
  }

  #deriveDangerColor(mainColor) {
    // Generate a red danger color by rotating the hue of the main color
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(0, Math.max(hsl.s, 70), 50); // Red-ish danger
  }

  #generateGrayScale(supportingColor) {
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

  #generateBackgroundShades(backgroundBase) {
    const hsl = this.#hexToHsl(backgroundBase);

    // Generate subtle variations of the background
    return {
      base: backgroundBase,
      subtle: this.#hslToHex(hsl.h, Math.max(hsl.s, 2), Math.max(hsl.l - 2, 2)), // Very subtle darker
      elevated: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 3),
        Math.max(hsl.l - 4, 5),
      ), // Slightly darker for elevated surfaces
      sunken: this.#hslToHex(hsl.h, Math.max(hsl.s, 4), Math.max(hsl.l - 6, 8)), // For input fields, subtle depth
      overlay: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 2),
        Math.min(hsl.l + 2, 98),
      ), // Slightly lighter for overlays
      inverse: this.#generateSmartDarkBackground(backgroundBase), // Smart dark background
      hover: `color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);`,
    };
  }

  #generateFieldsetAdaptiveColors(backgroundShades) {
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
    overrides = {},
  ) {
    // Use custom dark background if provided, otherwise auto-generate
    const darkBackgroundBase = overrides.background
      ? overrides.background
      : this.#generateSmartDarkBackground(backgroundBase);

    const darkSurface = this.#generateBackgroundShades(darkBackgroundBase);

    // Determine a readable primary text shade for outline/link on dark surfaces
    const derivedPrimaryScale = overrides.primary
      ? this.#generateColorScale(overrides.primary)
      : this.#adjustColorsForDarkMode(lightColors.primary);

    return {
      surface: {
        ...darkSurface,
        fieldset: this.#generateDarkModeFieldsetColors(darkSurface),
      },
      // For primary colors, use override, or adjust light colors for dark mode (dimmed for accessibility)
      primary: derivedPrimaryScale,
      // Adjust other colors for dark mode, with optional overrides
      secondary: overrides.secondary
        ? this.#generateColorScale(overrides.secondary)
        : this.#adjustColorsForDarkMode(lightColors.secondary),
      accent: overrides.accent
        ? this.#generateColorScale(overrides.accent)
        : this.#adjustColorsForDarkMode(lightColors.accent),
      // Regenerate grays if secondary override is provided (grays are derived from secondary)
      gray: overrides.secondary
        ? this.#generateGrayScale(overrides.secondary)
        : lightColors.gray,
      // Adjust semantic colors for dark mode
      success: this.#adjustColorsForDarkMode(lightColors.success),
      info: this.#adjustColorsForDarkMode(lightColors.info),
      warning: this.#adjustColorsForDarkMode(lightColors.warning),
      danger: this.#adjustColorsForDarkMode(lightColors.danger),
    };
  }

  // -------------------------
  // Color contrast helpers
  // -------------------------
  #hexToRgb(hex) {
    const h = String(hex || "").replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  #luminance(hex) {
    const { r, g, b } = this.#hexToRgb(hex);
    const srgb = [r / 255, g / 255, b / 255].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  #contrastRatio(aHex, bHex) {
    const L1 = this.#luminance(aHex);
    const L2 = this.#luminance(bHex);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Choose a readable 'on' color for a background: prefer white or black if they meet contrast target
  #findReadableOnColor(bgHex, target = 4.5) {
    if (!bgHex) return "#000000";
    const white = "#ffffff";
    const black = "#000000";
    const cw = this.#contrastRatio(bgHex, white);
    if (cw >= target) return white;
    const cb = this.#contrastRatio(bgHex, black);
    if (cb >= target) return black;

    // Neither black nor white meets the target — pick the one with higher ratio
    return cb > cw ? black : white;
  }

  // Convert hex color to rgba string
  #rgbaFromHex(hex, alpha = 1.0) {
    const { r, g, b } = this.#hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Mix color toward target by a given factor (0 = original, 1 = target)
  #mixTowards(sourceHex, targetHex, factor = 0.5) {
    const src = this.#hexToRgb(sourceHex);
    const tgt = this.#hexToRgb(targetHex);
    const r = Math.round(src.r + (tgt.r - src.r) * factor);
    const g = Math.round(src.g + (tgt.g - src.g) * factor);
    const b = Math.round(src.b + (tgt.b - src.b) * factor);
    return this.#rgbToHex(r, g, b);
  }

  // Convert RGB to hex
  #rgbToHex(r, g, b) {
    const toHex = (n) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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

  /**
   * Pick a readable primary shade on a given surface background, targeting AA contrast.
   * Returns the first shade that meets target from a preferred order; falls back to the best ratio.
   */
  #pickReadablePrimaryOnSurface(
    primaryScale = {},
    surfaceBg = "#000000",
    target = 4.5,
  ) {
    const order = ["600", "700", "800", "500", "400", "900", "300", "200"]; // preference for UI semantics
    let best = { shade: null, color: null, ratio: 0 };
    for (const key of order) {
      const hex = primaryScale?.[key];
      if (!hex || typeof hex !== "string") continue;
      const r = this.#contrastRatio(hex, surfaceBg);
      if (r > best.ratio) best = { shade: key, color: hex, ratio: r };
      if (r >= target) return hex;
    }
    // If no shade meets target, return the highest contrast candidate
    return best.color || primaryScale?.["600"] || primaryScale?.["500"];
  }

  // Pick a color scale shade that supports white text at AA
  #pickFillShadeForWhite(scale = {}, target = 4.5) {
    const order = ["600", "700", "800", "500", "400", "900"]; // typical UI fills
    let best = { shade: null, color: null, ratio: 0 };
    for (const key of order) {
      const hex = scale?.[key];
      if (!hex || typeof hex !== "string") continue;
      const r = this.#contrastRatio(hex, "#ffffff");
      if (r > best.ratio) best = { shade: key, color: hex, ratio: r };
      if (r >= target) return hex;
    }
    return best.color || scale?.["600"] || scale?.["500"];
  }

  /**
   * Generate smart surface tokens with context-aware colors for text, icons, shadows, and borders.
   * Each surface variant gets its own semantic tokens that automatically adapt to the surface's luminance.
   *
   * @param {Object} surfaceShades - Object with surface color variants (base, subtle, elevated, etc.)
   * @returns {Object} Smart tokens for each surface with text, icon, shadow, and border colors
   */
  #generateSmartSurfaceTokens(surfaceShades, shadowOpacityConfig = {}) {
    const tokens = {};
    const lightShadowOpacity = shadowOpacityConfig.light ?? 0.1;
    const darkShadowOpacity = shadowOpacityConfig.dark ?? 0.25;

    Object.entries(surfaceShades).forEach(([key, bgColor]) => {
      // Skip non-color values (like 'hover' which uses CSS functions)
      if (!bgColor || typeof bgColor !== "string" || !bgColor.startsWith("#")) {
        return;
      }

      const isDark = this.#luminance(bgColor) < 0.5;

      // Text colors with proper contrast ratios
      const textPrimary = this.#findReadableOnColor(bgColor, 4.5); // WCAG AA
      const textSecondary = this.#findReadableOnColor(bgColor, 3.0); // Relaxed for secondary
      const textMuted = this.#mixTowards(textPrimary, bgColor, 0.4); // 40% toward background

      // Icon color matches primary text for consistency
      const icon = textPrimary;
      const iconSubtle = textMuted;

      // Context-aware shadows: light shadows on dark surfaces, dark shadows on light
      // Light shadows need higher opacity to be visible on dark backgrounds
      const shadowBase = isDark ? "#ffffff" : "#000000";
      const shadowOpacity = isDark
        ? darkShadowOpacity
        : lightShadowOpacity;
      const shadowColor = this.#rgbaFromHex(shadowBase, shadowOpacity);

      // Semi-transparent borders that work on any surface
      const borderBase = isDark ? "#ffffff" : "#000000";
      const borderOpacity = isDark ? 0.15 : 0.1;
      const border = this.#rgbaFromHex(borderBase, borderOpacity);

      tokens[key] = {
        bg: bgColor,
        text: textPrimary,
        textSecondary: textSecondary,
        textMuted: textMuted,
        icon: icon,
        iconSubtle: iconSubtle,
        shadow: shadowColor,
        border: border,
        scheme: isDark ? "dark" : "light", // CSS color-scheme value
      };
    });

    return tokens;
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
        config.dimFactor,
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
      baseUnit = 4,
      scaleRatio = 1.25,
      maxSpacingSteps = 12, // Trim to realistic range
    } = spatialConfig;

    // Validate and convert to numbers, with fallbacks
    const validBaseUnit = Number.isFinite(Number(baseUnit))
      ? Number(baseUnit)
      : 4;
    const validMaxSpacingSteps = Math.min(
      Number.isFinite(Number(maxSpacingSteps)) ? Number(maxSpacingSteps) : 12,
      12,
    );

    const spacing = { 0: "0" };

    // Generate simple 4px incremental spacing scale
    // spacing-1: 4px, spacing-2: 8px, spacing-3: 12px, etc.
    for (let i = 1; i <= validMaxSpacingSteps; i++) {
      spacing[i] = `${validBaseUnit * i}px`;
    }

    return spacing;
  }

  #generateRadiusTokens(shapeConfig) {
    const { radiusSize = "medium", customRadius = null } = shapeConfig;

    // Accept either a custom value, an enum key ("small"), or an enum value (e.g., 4)
    let baseRadius;
    if (customRadius !== null && customRadius !== undefined) {
      baseRadius = customRadius;
    } else if (typeof radiusSize === "number") {
      // Direct numeric value (including 0)
      baseRadius = radiusSize;
    } else if (typeof radiusSize === "string") {
      // Enum key (e.g., "none", "small", "medium", "large", "full")
      baseRadius = enums.RadiusSizes[radiusSize] ?? enums.RadiusSizes.medium;
    } else {
      baseRadius = enums.RadiusSizes.medium;
    }

    // Validate and convert baseRadius to a number
    const validBaseRadius = Number.isFinite(Number(baseRadius))
      ? Number(baseRadius)
      : enums.RadiusSizes.medium;

    return {
      none: "0",
      xs: `${
        Number.isFinite(validBaseRadius * 0.25)
          ? Math.round(validBaseRadius * 0.25)
          : 0
      }px`,
      sm: `${
        Number.isFinite(validBaseRadius * 0.5)
          ? Math.round(validBaseRadius * 0.5)
          : 0
      }px`,
      md: `${validBaseRadius}px`,
      lg: `${
        Number.isFinite(validBaseRadius * 1.5)
          ? Math.round(validBaseRadius * 1.5)
          : 0
      }px`,
      xl: `${
        Number.isFinite(validBaseRadius * 2)
          ? Math.round(validBaseRadius * 2)
          : 0
      }px`,
      full: "9999px",
    };
  }

  #generateBorderWidthTokens(shapeConfig) {
    const { borderWidth = "medium" } = shapeConfig;

    // Support string enum keys, numeric values, or default to medium
    let baseBorderWidth;
    if (typeof borderWidth === "number") {
      baseBorderWidth = borderWidth;
    } else if (typeof borderWidth === "string") {
      baseBorderWidth =
        enums.BorderWidths[borderWidth] ?? enums.BorderWidths.medium;
    } else {
      baseBorderWidth = enums.BorderWidths.medium;
    }

    const validBase = Number.isFinite(Number(baseBorderWidth))
      ? Number(baseBorderWidth)
      : enums.BorderWidths.medium;
    const toPx = (value) => `${Math.max(0, Math.round(value * 100) / 100)}px`;

    // Generate a derived border width scale based on configured base width
    return {
      hairline: toPx(validBase * 0.25),
      thin: toPx(validBase * 0.5),
      medium: toPx(validBase),
      thick: toPx(validBase * 1.5),
    };
  }

  generateTypographyTokens(typographyConfig) {
    const {
      fontFamilyHeadings = "system-ui, -apple-system, sans-serif",
      fontFamilyBody = "system-ui, -apple-system, sans-serif",
      fontFamilyMono = 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      baseFontSize = 16,
      fontScale = 1.25, // Use consistent 1.25x minor third ratio
      fontWeightLight = enums.FontWeights.light,
      fontWeightNormal = enums.FontWeights.normal,
      fontWeightMedium = enums.FontWeights.medium,
      fontWeightSemibold = enums.FontWeights.semibold,
      fontWeightBold = enums.FontWeights.bold,
      lineHeightTight = enums.LineHeights.tight,
      lineHeightNormal = enums.LineHeights.normal,
      lineHeightRelaxed = enums.LineHeights.relaxed,
    } = typographyConfig;

    // Validate numeric values to prevent NaN
    const validBaseFontSize = Number.isFinite(Number(baseFontSize))
      ? Number(baseFontSize)
      : 16;
    const validFontScale = Number.isFinite(Number(fontScale))
      ? Number(fontScale)
      : 1.25;

    return {
      fontFamily: {
        headings: fontFamilyHeadings,
        body: fontFamilyBody,
        mono: fontFamilyMono,
      },
      fontSize: {
        // Consistent modular scale using 1.25 ratio (minor third)
        xs: `${Math.round(validBaseFontSize / Math.pow(validFontScale, 2))}px`, // 16 / 1.25² = 10px
        sm: `${Math.round(validBaseFontSize / validFontScale)}px`, // 16 / 1.25 = 13px
        base: `${validBaseFontSize}px`, // 16px
        lg: `${Math.round(validBaseFontSize * validFontScale)}px`, // 16 × 1.25 = 20px
        xl: `${Math.round(validBaseFontSize * Math.pow(validFontScale, 2))}px`, // 16 × 1.25² = 25px
        "2xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 3),
        )}px`, // 16 × 1.25³ = 31px
        "3xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 4),
        )}px`, // 16 × 1.25⁴ = 39px
        "4xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 5),
        )}px`, // 16 × 1.25⁵ = 49px
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

    const resolvedMaxWidths = this.#resolveLayoutMaxWidths(layoutConfig);

    return {
      maxWidth: this.#formatLength(maxWidth, "1200px"),
      maxWidthSm: resolvedMaxWidths.sm,
      maxWidthMd: resolvedMaxWidths.md,
      maxWidthLg: resolvedMaxWidths.lg,
      maxWidthXl: resolvedMaxWidths.xl,
      minHeight: "100vh",
      containerPadding: this.#formatLength(containerPadding, "16px"),
      breakpoints: {
        sm: this.#formatLength(breakpoints.sm, "640px"),
        md: this.#formatLength(breakpoints.md, "768px"),
        lg: this.#formatLength(breakpoints.lg, "1024px"),
        xl: this.#formatLength(breakpoints.xl, "1280px"),
      },
      // Semantic spacing tokens for large layouts
      // Use these instead of numbered spacing beyond --spacing-12
      pageMargin: "120px", // For page-level margins
      sectionGap: "160px", // Between major page sections
      containerGap: "200px", // Between container blocks
      heroSpacing: "240px", // For hero/banner areas
      footerSpacing: "160px", // Before footer sections
    };
  }

  #resolveLayoutMaxWidths(layoutConfig = {}) {
    const defaultBreakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    const {
      maxWidths = {},
      maxWidth = 1200,
      containerPadding = 16,
      breakpoints = defaultBreakpoints,
    } = layoutConfig || {};

    const paddingValue = this.#toNumber(containerPadding, 16);
    const baseMaxWidth = this.#toNumber(maxWidth, defaultBreakpoints.xl);

    const resolvedBreakpoints = {
      sm: this.#toNumber(breakpoints.sm, defaultBreakpoints.sm),
      md: this.#toNumber(breakpoints.md, defaultBreakpoints.md),
      lg: this.#toNumber(breakpoints.lg, defaultBreakpoints.lg),
      xl: this.#toNumber(breakpoints.xl, defaultBreakpoints.xl),
    };

    const deriveWidth = (bp) => {
      if (!bp) {
        return baseMaxWidth;
      }
      return Math.max(320, bp - paddingValue * 2);
    };

    const fallbackWidths = {
      sm: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.sm)),
      md: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.md)),
      lg: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.lg)),
      xl: Math.max(320, baseMaxWidth),
    };

    return {
      sm: this.#formatLength(maxWidths.sm, `${fallbackWidths.sm}px`),
      md: this.#formatLength(maxWidths.md, `${fallbackWidths.md}px`),
      lg: this.#formatLength(maxWidths.lg, `${fallbackWidths.lg}px`),
      xl: this.#formatLength(maxWidths.xl, `${fallbackWidths.xl}px`),
    };
  }

  #formatLength(value, fallback) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return `${value}px`;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }

    return fallback;
  }

  #toNumber(value, fallback) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return fallback;
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
      // Default path for dev/demo; static export places it at [static.root]/icons/pds-icons.svg
      spritePath = "/assets/pds/icons/pds-icons.svg",
      // Path for on-demand external SVG icons
      externalPath = "/assets/img/icons/",
    } = iconConfig;

    return {
      set,
      weight,
      defaultSize: `${defaultSize}px`,
      sizes: Object.fromEntries(
        Object.entries(sizes).map(([key, value]) => [key, `${value}px`]),
      ),
      spritePath,
      externalPath,
    };
  }

  #generateColorVariables(colors) {
    const chunks = [];

    // Header
    chunks.push(`  /* Colors */\n`);

    // Recursively emit color variables
    const generateNestedColors = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNestedColors(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          chunks.push(`  --color-${prefix}${key}: ${value};\n`);
        }
      });
    };

    Object.entries(colors).forEach(([category, values]) => {
      if (category === "dark") return; // handled elsewhere
      if (category === "surfaceSmart") return; // handled below
      if (category === "interactive") return; // handled below with semantic tokens
      if (typeof values === "object" && values !== null) {
        generateNestedColors(values, `${category}-`);
      }
    });

    // Smart surface tokens
    if (colors.surfaceSmart) {
      chunks.push(`  /* Smart Surface Tokens (context-aware) */\n`);
      Object.entries(colors.surfaceSmart).forEach(([surfaceKey, tokens]) => {
        chunks.push(`  --surface-${surfaceKey}-bg: ${tokens.bg};\n`);
        chunks.push(`  --surface-${surfaceKey}-text: ${tokens.text};\n`);
        chunks.push(
          `  --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};\n`,
        );
        chunks.push(
          `  --surface-${surfaceKey}-text-muted: ${tokens.textMuted};\n`,
        );
        chunks.push(`  --surface-${surfaceKey}-icon: ${tokens.icon};\n`);
        chunks.push(
          `  --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};\n`,
        );
        chunks.push(`  --surface-${surfaceKey}-shadow: ${tokens.shadow};\n`);
        chunks.push(`  --surface-${surfaceKey}-border: ${tokens.border};\n`);
      });
      chunks.push(`\n`);
    }

    // Semantic text colors (light mode)
    chunks.push(`  /* Semantic Text Colors */\n`);
    chunks.push(`  --color-text-primary: var(--color-gray-900);\n`);
    chunks.push(`  --color-text-secondary: var(--color-gray-600);\n`);
    chunks.push(`  --color-text-muted: var(--color-gray-600);\n`);
    chunks.push(`  --color-border: var(--color-gray-300);\n`);
    chunks.push(`  --color-input-bg: var(--color-surface-base);\n`);
    chunks.push(`  --color-input-disabled-bg: var(--color-gray-50);\n`);
    chunks.push(`  --color-input-disabled-text: var(--color-gray-500);\n`);
    chunks.push(`  --color-code-bg: var(--color-gray-100);\n`);

    // Interactive color tokens - separate shades for different purposes (light mode)
    if (colors.interactive && colors.interactive.light) {
      chunks.push(
        `  /* Interactive Colors - optimized for specific use cases */\n`,
      );
      chunks.push(
        `  --color-primary-fill: ${colors.interactive.light.fill}; /* For button backgrounds with white text */\n`,
      );
      chunks.push(
        `  --color-primary-text: ${colors.interactive.light.text}; /* For links and outline buttons on light surfaces */\n`,
      );
    }

    // Translucent surface tokens
    chunks.push(`  /* Translucent Surface Tokens */\n`);
    chunks.push(
      `  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);\n`,
    );
    chunks.push(
      `  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);\n`,
    );
    chunks.push(
      `  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);\n`,
    );

    // Backdrop tokens (light mode)
    chunks.push(
      `   /* Backdrop tokens - used for modal dialogs, drawers, overlays */\n\n    --backdrop-bg: linear-gradient(\n        135deg,\n        rgba(255, 255, 255, 0.2),\n        rgba(255, 255, 255, 0.1)\n      );\n    --backdrop-blur: 10px;\n    --backdrop-saturate: 150%;\n    --backdrop-brightness: 0.9;\n    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));\n    --backdrop-opacity: 1;\n    \n    /* Legacy alias for backwards compatibility */\n    --backdrop-background: var(--backdrop-bg);\n    `,
    );

    // Mesh gradients
    chunks.push(this.#generateMeshGradients(colors));

    return `${chunks.join("")}\n`;
  }

  #generateMeshGradients(colors) {
    // Create subtle mesh gradients using color palette
    const primary = colors.primary?.[500] || "#3b82f6";
    const secondary = colors.secondary?.[500] || "#8b5cf6";
    const accent = colors.accent?.[500] || "#f59e0b";

    return /*css*/ `
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%);
    `;
  }

  #generateSpacingVariables(spacing) {
    const lines = ["  /* Spacing */\n"];
    Object.entries(spacing).forEach(([key, value]) => {
      // Validate the key and value before generating CSS
      if (
        key !== null &&
        key !== undefined &&
        key !== "NaN" &&
        value !== undefined &&
        !value.includes("NaN")
      ) {
        lines.push(`  --spacing-${key}: ${value};\n`);
      }
    });
    return `${lines.join("")}\n`;
  }

  #generateRadiusVariables(radius) {
    const lines = ["  /* Border Radius */\n"];
    Object.entries(radius).forEach(([key, value]) => {
      lines.push(`  --radius-${key}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateBorderWidthVariables(borderWidths) {
    const lines = ["  /* Border Widths */\n"];
    Object.entries(borderWidths).forEach(([key, value]) => {
      lines.push(`  --border-width-${key}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateTypographyVariables(typography) {
    const lines = ["  /* Typography */\n"];
    Object.entries(typography).forEach(([category, values]) => {
      // Remove "font" prefix from category names and convert to kebab-case
      // fontFamily -> family, fontSize -> size, fontWeight -> weight, lineHeight -> line-height
      const cleanCategory = category
        .replace(/^font/, "")
        .replace(/^(.)/, (m) => m.toLowerCase())
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase();

      Object.entries(values).forEach(([key, value]) => {
        // Convert camelCase keys to kebab-case
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        lines.push(`  --font-${cleanCategory}-${kebabKey}: ${value};\n`);
      });
    });
    return `${lines.join("")}\n`;
  }

  #generateShadowVariables(shadows) {
    const lines = ["  /* Shadows */\n"];
    Object.entries(shadows).forEach(([key, value]) => {
      lines.push(`  --shadow-${key}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateLayoutVariables(layout) {
    const lines = ["  /* Layout */\n"];
    Object.entries(layout).forEach(([key, value]) => {
      // Convert camelCase keys to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

      // Skip breakpoints object - it's used in JS but doesn't belong in CSS variables
      // Breakpoints are used in @media queries, not as CSS custom properties
      if (key === "breakpoints") {
        return;
      }

      lines.push(`  --layout-${kebabKey}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateTransitionVariables(transitions) {
    const lines = ["  /* Transitions */\n"];
    Object.entries(transitions).forEach(([key, value]) => {
      lines.push(`  --transition-${key}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateZIndexVariables(zIndex) {
    const lines = ["  /* Z-Index */\n"];
    Object.entries(zIndex).forEach(([key, value]) => {
      lines.push(`  --z-${key}: ${value};\n`);
    });
    return `${lines.join("")}\n`;
  }

  #generateIconVariables(icons) {
    const lines = ["  /* Icon System */\n"];
    lines.push(`  --icon-set: ${icons.set};\n`);
    lines.push(`  --icon-weight: ${icons.weight};\n`);
    lines.push(`  --icon-size: ${icons.defaultSize};\n`);

    // Icon size scale
    Object.entries(icons.sizes).forEach(([key, value]) => {
      lines.push(`  --icon-size-${key}: ${value};\n`);
    });

    return `${lines.join("")}\n`;
  }

  #generateDarkVariablesOnly(colors, darkShadows) {
    if (!colors?.dark) return "";

    const varLines = [];
    const generateNested = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNested(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          varLines.push(`  --color-${prefix}${key}: ${value};\n`);
        }
      });
    };

    Object.entries(colors.dark).forEach(([category, values]) => {
      if (category === "surfaceSmart") return;
      if (typeof values === "object" && values !== null) {
        generateNested(values, `${category}-`);
      }
    });

    // Smart surface tokens
    const smartLines = [];
    if (colors.dark.surfaceSmart) {
      smartLines.push(
        `  /* Smart Surface Tokens (dark mode, context-aware) */\n`,
      );
      Object.entries(colors.dark.surfaceSmart).forEach(
        ([surfaceKey, tokens]) => {
          smartLines.push(`  --surface-${surfaceKey}-bg: ${tokens.bg};\n`);
          smartLines.push(`  --surface-${surfaceKey}-text: ${tokens.text};\n`);
          smartLines.push(
            `  --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};\n`,
          );
          smartLines.push(
            `  --surface-${surfaceKey}-text-muted: ${tokens.textMuted};\n`,
          );
          smartLines.push(`  --surface-${surfaceKey}-icon: ${tokens.icon};\n`);
          smartLines.push(
            `  --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};\n`,
          );
          smartLines.push(
            `  --surface-${surfaceKey}-shadow: ${tokens.shadow};\n`,
          );
          smartLines.push(
            `  --surface-${surfaceKey}-border: ${tokens.border};\n`,
          );
        },
      );
      smartLines.push(`\n`);
    }

    const semantic = `  --color-text-primary: var(--color-gray-100);\n  --color-text-secondary: var(--color-gray-300);\n  --color-text-muted: var(--color-gray-400);\n  --color-border: var(--color-gray-700);\n  --color-input-bg: var(--color-gray-800);\n  --color-input-disabled-bg: var(--color-gray-900);\n  --color-input-disabled-text: var(--color-gray-600);\n  --color-code-bg: var(--color-gray-800);\n`;

    const backdrop = `  /* Backdrop tokens - dark mode */\n  --backdrop-bg: linear-gradient(\n      135deg,\n      rgba(0, 0, 0, 0.6),\n      rgba(0, 0, 0, 0.4)\n    );\n  --backdrop-blur: 10px;\n  --backdrop-saturate: 120%;\n  --backdrop-brightness: 0.7;\n  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));\n  --backdrop-opacity: 1;\n  \n  /* Legacy alias for backwards compatibility */\n  --backdrop-background: var(--backdrop-bg);\n`;

    const mesh = this.#generateMeshGradientsDark(colors);
    const shadowLines = darkShadows
      ? [this.#generateShadowVariables(darkShadows)]
      : [];

    // Return ONLY variables, no component rules
    const body = [
      ...varLines,
      ...smartLines,
      ...shadowLines,
      semantic,
      backdrop,
      mesh,
    ].join("");

    // Dark mode selector only - .surface-inverse is handled separately in utilities
    // to avoid inheriting the full dark palette (which would override --color-surface-inverse)
    return `html[data-theme="dark"] {\n${body}}\n`;
  }

  // Generate ONLY dark mode variables for the tokens layer (no wrapper, no component rules)
  #generateDarkVariablesForTokensLayer(colors, darkShadows) {
    if (!colors?.dark) return "";

    const varLines = [];
    const generateNested = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNested(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          varLines.push(`    --color-${prefix}${key}: ${value};\n`);
        }
      });
    };

    Object.entries(colors.dark).forEach(([category, values]) => {
      if (category === "surfaceSmart") return;
      if (typeof values === "object" && values !== null) {
        generateNested(values, `${category}-`);
      }
    });

    // Smart surface tokens
    const smartLines = [];
    if (colors.dark.surfaceSmart) {
      smartLines.push(
        `    /* Smart Surface Tokens (dark mode, context-aware) */\n`,
      );
      Object.entries(colors.dark.surfaceSmart).forEach(
        ([surfaceKey, tokens]) => {
          smartLines.push(`    --surface-${surfaceKey}-bg: ${tokens.bg};\n`);
          smartLines.push(
            `    --surface-${surfaceKey}-text: ${tokens.text};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-text-muted: ${tokens.textMuted};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-icon: ${tokens.icon};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-shadow: ${tokens.shadow};\n`,
          );
          smartLines.push(
            `    --surface-${surfaceKey}-border: ${tokens.border};\n`,
          );
        },
      );
      smartLines.push(`\n`);
    }

    // Interactive dark mode tokens
    const interactiveLines = [];
    if (colors.interactive && colors.interactive.dark) {
      interactiveLines.push(
        `    /* Interactive Colors - optimized for specific use cases (dark mode) */\n`,
      );
      interactiveLines.push(
        `    --color-primary-fill: ${colors.interactive.dark.fill}; /* For button backgrounds with white text */\n`,
      );
      interactiveLines.push(
        `    --color-primary-text: ${colors.interactive.dark.text}; /* For links and outline buttons on dark surfaces */\n`,
      );
    }

    const semantic = [
      `    --color-text-primary: var(--color-gray-100);\n`,
      `    --color-text-secondary: var(--color-gray-300);\n`,
      `    --color-text-muted: var(--color-gray-400);\n`,
      `    --color-border: var(--color-gray-700);\n`,
      `    --color-input-bg: var(--color-gray-800);\n`,
      `    --color-input-disabled-bg: var(--color-gray-900);\n`,
      `    --color-input-disabled-text: var(--color-gray-600);\n`,
      `    --color-code-bg: var(--color-gray-800);\n`,
      ...interactiveLines,
    ].join("");

    const backdrop = `    /* Backdrop tokens - dark mode */\n    --backdrop-bg: linear-gradient(\n        135deg,\n        rgba(0, 0, 0, 0.6),\n        rgba(0, 0, 0, 0.4)\n      );\n    --backdrop-blur: 10px;\n    --backdrop-saturate: 120%;\n    --backdrop-brightness: 0.7;\n    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));\n    --backdrop-opacity: 1;\n    \n    /* Legacy alias for backwards compatibility */\n    --backdrop-background: var(--backdrop-bg);\n`;

    const mesh = this.#generateMeshGradientsDarkVariablesOnly(colors);
    const shadowLines = darkShadows
      ? [this.#generateShadowVariables(darkShadows)]
      : [];

    const content = [
      ...varLines,
      ...smartLines,
      ...shadowLines,
      semantic,
      backdrop,
      mesh,
    ].join("");

    return `\n       html[data-theme="dark"] {\n${content}       }\n`;
  }

  // Generate only mesh gradient variables for dark mode (for tokens layer)
  #generateMeshGradientsDarkVariablesOnly(colors) {
    // Create darker, more subtle mesh gradients for dark mode
    const dark = colors.dark || colors;
    const primary = dark.primary?.[400] || "#60a5fa";
    const secondary = dark.secondary?.[400] || "#a78bfa";
    const accent = dark.accent?.[400] || "#fbbf24";

    return /*css*/ `    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 10%, transparent) 0px, transparent 50%);
      `;
  }

  #generateMeshGradientsDark(colors) {
    // Create darker, more subtle mesh gradients for dark mode
    const dark = colors.dark || colors;
    const primary = dark.primary?.[400] || "#60a5fa";
    const secondary = dark.secondary?.[400] || "#a78bfa";
    const accent = dark.accent?.[400] || "#fbbf24";

    return /*css*/ `
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 10%, transparent) 0px, transparent 50%);
    `;
  }

  // Generate dark mode component adjustments (for components layer)
  #generateDarkModeComponentRules() {
    const rules = /*css*/ `/* Callout dark mode adjustments */
html[data-theme="dark"] {
  .callout-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .callout-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .callout-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .callout-danger, .callout-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
  img, video { opacity: 0.8; transition: opacity var(--transition-normal); }
  img:hover, video:hover { opacity: 1; }
}`;

    return rules;
  }

  // If the config specifies options.backgroundMesh (1-5), apply the mesh to body.
  // Mesh variables are always generated above; this just opts-in the body background.
  #generateBodyBackgroundMeshRule() {
    try {
      const meshOption = this.options?.design?.options?.backgroundMesh;

      if (this.options.debug) {
        this.options.log?.(
          "debug",
          "backgroundMesh check:",

          meshOption,
        );
      }

      const num = Number(meshOption);
      if (!Number.isFinite(num) || num === 0) return "";
      const idx = Math.max(1, Math.min(5, Math.floor(num)));
      return `/* Optional background mesh applied from config */\nbody {\n  background: var(--background-mesh-0${idx});\n  background-attachment: fixed;\n}`;
    } catch (e) {
      if (this.options.debug) {
        this.options.log?.(
          "error",
          "Error in generateBodyBackgroundMeshRule:",
          e,
        );
      }
      return "";
    }
  }

  // Conditionally generate a lightweight ".liquid-glass" utility for frosted glass cards.
  // Inspired by the referenced article, using gradients, borders, shadows, and backdrop-filter.
  #generateLiquidGlassUtility() {
    try {
      if (!this.options?.design?.options?.liquidGlassEffects) return "";
      // Use design tokens where possible so the effect adapts to the theme.
      return /*css*/ `/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
.liquid-glass {
  border-radius: var(--radius-lg);
  /* Subtle translucent fill blended with surface */
  background: color-mix(in oklab, var(--color-surface-subtle) 45%, transparent);

  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.35),
    rgba(255,255,255,0.12)
  );
  /* Frosted glass blur + saturation */
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
  /* Soft inner highlight and outer depth */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -40px 80px rgba(255,255,255,0.12),
    0 10px 30px rgba(0,0,0,0.10);
  /* Glossy border with slight light and dark edges */
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-500) 22%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 18%, transparent);
  outline-offset: -1px;
}

html[data-theme="dark"] .liquid-glass {
  background: color-mix(in oklab, var(--color-surface-inverse) 45%, transparent);
  background-image: linear-gradient(
    135deg,
    color-mix(in oklab, var(--color-primary-300) 40%, transparent),
    color-mix(in oklab, var(--color-surface-overlay) 48%, transparent)
  );
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -40px 80px rgba(0,0,0,0.55),
    0 18px 38px rgba(0,0,0,0.65);
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-300) 26%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 16%, transparent);
}

/* Fallback when backdrop-filter isn't supported */
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .liquid-glass {
    /* Strengthen fill a bit to compensate for lack of blur */
    background: color-mix(in oklab, var(--color-surface-subtle) 70%, rgba(255,255,255,0.4));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.6),
      0 10px 24px rgba(0,0,0,0.08);
  }

  html[data-theme="dark"] .liquid-glass {
    background: color-mix(in oklab, var(--color-surface-inverse) 70%, transparent);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 18px 32px rgba(0,0,0,0.58);
  }
}
`;
    } catch {
      return "";
    }
  }

  // Generate border gradient utilities for WHOOP-style card outlines
  // Creates reusable utilities for standard cards, gradient borders, and glow effects
  #generateBorderGradientUtilities() {
    return /*css*/ `/* ============================================================================
   Border Gradient Utilities
   Card outlines with gradient borders and glow effects
   ============================================================================ */


/* Gradient border utility - premium/promo card style */
.border-gradient {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Gradient border variants - different color combinations */
.border-gradient-primary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-300),
      var(--color-primary-600)
    ) border-box;
}

.border-gradient-accent {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-accent-300),
      var(--color-accent-600)
    ) border-box;
}

.border-gradient-secondary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-secondary-300),
      var(--color-secondary-600)
    ) border-box;
}

/* Gradient border with different strengths/thickness */
.border-gradient-soft {
  border: var(--border-width-thin) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-medium {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-strong {
  border: var(--border-width-thick) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Glow effect utility - for callouts and active states */
.border-glow {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-sm {
  box-shadow: 0 0 6px var(--color-primary-500);
}

.border-glow-lg {
  box-shadow: 0 0 20px var(--color-primary-500);
}

/* Combined gradient + glow for premium effects */
.border-gradient-glow {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(135deg,
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
  box-shadow: 0 0 12px var(--color-primary-500);
}

/* Semantic glow variants */
.border-glow-primary {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-accent {
  box-shadow: 0 0 12px var(--color-accent-500);
}

.border-glow-success {
  box-shadow: 0 0 12px var(--color-success-500);
}

.border-glow-warning {
  box-shadow: 0 0 12px var(--color-warning-500);
}

.border-glow-danger {
  box-shadow: 0 0 12px var(--color-danger-500);
}

`;
  }

  // #generateLightModeCSS(colors) {
  //   // Emit an explicit light theme block scoped to html[data-theme="light"].
  //   // We reuse the same color variable generation used for :root so consumers
  //   // can rely on attribute-scoped tokens for both themes.
  //   try {
  //     const colorBlock = this.#generateColorVariables(colors || {});
  //     return `html[data-theme="light"] {\n${colorBlock}}\n\n`;
  //   } catch (ex) {
  //     return "";
  //   }
  // }

  // Legacy #generateBaseStyles() removed - all content moved to #generatePrimitivesLayer()

  #generateSemanticHTMLStyles() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    // Note: We intentionally use :where() to minimize specificity of semantic element styles
    // so applications can easily override them without resorting to !important.
    return /*css*/ `/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-6) var(--spacing-8);
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid var(--color-primary-500);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-none);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  
  :where(p):last-child {
    margin-bottom: 0;
  }
  
  :where(cite) {
    display: block;
    margin-top: var(--spacing-4);
    font-size: var(--font-size-base);
    font-style: normal;
    color: var(--color-primary-500);
  }
}

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: var(--border-width-thin) solid var(--color-border);
  height: 0;
}

/* Labeled horizontal rule: <hr data-content="OR"> */
:where(hr[data-content]) {
  position: relative;
  border: none;
  text-align: center;
  height: auto;
  overflow: visible;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
  }
  
  &::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    padding: 0 var(--spacing-3);
    background-color: var(--color-surface-base);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-normal);
  }
}

:where(dl) {
  margin: 0 0 var(--spacing-4) 0;
}

:where(dt) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

:where(dd) {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

:where(nav), :where(header), :where(footer) {
  display: block;
}

:where(header), :where(footer) {
  width: 100%;
}

/* Headings within header elements have tight spacing for intro content */
:where(header) > :where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
}

:where(article), :where(section), :where(aside) {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

:where(mark) {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

:where(kbd) {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

:where(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

:where(time) {
  font-variant-numeric: tabular-nums;
}

:where(address) {
  font-style: normal;
  line-height: var(--font-line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

:where(details):not(.accordion *) {
  margin: 0 0 var(--spacing-2) 0;
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: var(--border-width-thin) solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(:where(summary)) {
    padding: var(--spacing-4);
  }
}

:where(summary) {
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

/* Dialog styles moved to #generateDialogStyles() */

`;
  }

  #generateFormStyles() {
    const {
      shape = {},
      gap,
      inputPadding,
      buttonPadding,
      focusRingWidth,
      focusRingOpacity,
      borderWidthThin,
      sectionSpacing,
      buttonMinHeight,
      inputMinHeight,
    } = this.options.design;

    const shapeBorderWidth =
      typeof shape.borderWidth === "number"
        ? shape.borderWidth
        : typeof shape.borderWidth === "string"
          ? (enums.BorderWidths[shape.borderWidth] ?? null)
          : null;

    const inputPaddingValue = inputPadding || 0.75;
    const buttonPaddingValue = buttonPadding || 1.0;
    const focusWidth = focusRingWidth || 3;
    const borderWidth =
      borderWidthThin || shapeBorderWidth || enums.BorderWidths.thin;
    const gapValue = gap || 1.0;
    const sectionSpacingValue = sectionSpacing || 2.0;
    const minButtonHeight = buttonMinHeight || 44;
    const minInputHeight = inputMinHeight || 40;

    return /*css*/ `/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0;  
  width: 100%;
  
  /* Unified styling for radio groups and checkbox groups */
  &[role="radiogroup"],
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-1) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      margin-bottom: 0;
      
      &:hover {
        color: var(--color-primary-700);
      }
    }

    input[type="checkbox"]{
      border-radius: var(--radius-xs);
    }
    
    input[type="radio"],
    input[type="checkbox"] {
      position: static;
      opacity: 1;
      width: var(--spacing-5);
      height: var(--spacing-5);
      min-height: var(--spacing-5);
      padding: var(--spacing-2);
      margin: 0;
      cursor: pointer;
      flex-shrink: 0;
      accent-color: var(--color-primary-600);

      &:focus-visible {
        outline: none;

        box-shadow:
          0 0 0 2px var(--color-primary-500),
          0 0 0 4px color-mix(in srgb,
            var(--color-primary-500) 40%,
            transparent
          );
      }

      &:checked {
        background-color: var(--color-primary-600);
      }
      
    }
  }
  
}



/* Nested legend scaling: reduce font-size for deeper sub-forms */
fieldset > legend { font-size: var(--font-size-lg); }
fieldset fieldset > legend { font-size: var(--font-size-base); }
fieldset fieldset fieldset > legend { font-size: var(--font-size-sm); }

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
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

[data-open]{
  [data-label]{
    margin-bottom: 0;
  }
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-line-height-relaxed);
}

input, textarea, select {
  &:focus {
    outline: none;
  }
}

input, textarea, select {
  width: 100%;
  min-height: ${minInputHeight}px;
  padding: calc(var(--spacing-1) * ${inputPaddingValue}) var(--spacing-4);
  border: var(--border-width-medium) solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-line-height-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    border-color: var(--color-primary-500);
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
      box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-danger-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100,
      )}%, transparent);
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

/* Track and thumb styling - using CSS nesting to reduce repetition */
input[type="range"] {
  /* WebKit track */
  &::-webkit-slider-runnable-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* WebKit thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    cursor: grab;
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
  }

  /* Mozilla track */
  &::-moz-range-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* Mozilla thumb */
  &::-moz-range-thumb {
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
    transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
  }

  /* Hover and focus states for WebKit */
  &:hover::-webkit-slider-thumb,
  &:focus-visible::-webkit-slider-thumb {
    cursor: grabbing;
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
  }

  /* Active state for WebKit */
  &:active::-webkit-slider-thumb {
    background: var(--color-primary-600);
  }

  /* Hover and focus states for Mozilla */
  &:hover::-moz-range-thumb,
  &:focus-visible::-moz-range-thumb {
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
    cursor: grabbing;
  }

  /* Active state for Mozilla */
  &:active::-moz-range-thumb {
    background: var(--color-primary-600);
  }
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
  -webkit-appearance: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem; /* your radius */
  overflow: hidden; /* important */
  cursor: pointer;

  /* The wrapper */
  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: inherit;
  }

  /* The swatch (the actual color box) */
  &::-webkit-color-swatch {
    border: none;
    border-radius: inherit;
  }
}

/* Button-style checkbox inputs outside of fieldsets */
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

label:has(input[type="checkbox"]):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"] + label:not(fieldset label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(${minButtonHeight}px * 0.75);
  padding: calc(var(--spacing-1) * ${
    buttonPaddingValue * 0.6
  }) calc(var(--spacing-4) * 0.85);
  border: var(--border-width-medium) solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-text-primary);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
  
  &:hover {
    background-color: var(--color-surface-subtle);
    border-color: var(--color-primary-500);
  }
}

label:has(input[type="checkbox"]:checked):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked + label:not(fieldset label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
  color: var(--color-primary-700);
  border-color: var(--color-primary-500);
  border-width: var(--border-width-medium);
  font-weight: var(--font-weight-semibold);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
    border-color: var(--color-primary-600);
  }
}

label:has(input[type="checkbox"]:focus):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
    (focusRingOpacity || 0.3) * 100,
  )}%, transparent);
}

label:has(input[type="checkbox"]:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="checkbox"]:checked:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
}

/* Keep default checkbox/radio for inputs NOT in special containers */
input[type="checkbox"]:not(fieldset input[type="checkbox"]):not(.checkbox-container input[type="checkbox"]),
input[type="radio"]:not(fieldset input[type="radio"]) {
  width: var(--spacing-5);
  height: var(--spacing-5);
  min-height: var(--spacing-5);
  margin-right: var(--spacing-2);
  cursor: pointer;
  position: static;
  opacity: 1;
  appearance: auto;
  -webkit-appearance: auto;

  &:disabled {
    cursor: not-allowed;
  }
}

/* Button-style radio and checkbox groups with .buttons class */
fieldset[role="radiogroup"].buttons,
fieldset[role="group"].buttons {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  
  input[type="radio"],
  input[type="checkbox"] {
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
  
  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: calc(${minButtonHeight}px * 0.75);
    padding: calc(var(--spacing-1) * ${
      buttonPaddingValue * 0.6
    }) calc(var(--spacing-4) * 0.85);
    border: var(--border-width-medium) solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1.2;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    touch-action: manipulation;
    user-select: none;
    background-color: transparent;
    color: var(--color-text-primary);
    margin: 0;
    flex: 0 1 auto;
    white-space: nowrap;
    
    &:hover {
      background-color: var(--color-surface-subtle);
      border-color: var(--color-primary-500);
      color: var(--color-text-primary);
    }

    &:has([disabled]){
      pointer-events: none;
    }
  }
  
  label:has(input[type="radio"]:checked),
  label:has(input[type="checkbox"]:checked) {
    background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
    border-color: var(--color-primary-500);
    border-width: var(--border-width-medium);
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
      border-color: var(--color-primary-600);
    }
  }
  
  label:has(input[type="radio"]:focus),
  label:has(input[type="checkbox"]:focus) {
    outline: none;
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
      (focusRingOpacity || 0.3) * 100,
    )}%, transparent);
  }
  
  label:has(input[type="radio"]:disabled),
  label:has(input[type="checkbox"]:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  label:has(input[type="radio"]:checked:disabled),
  label:has(input[type="checkbox"]:checked:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
  }
}

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: inline-flex;
  align-items: normal;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);

  /* Hide the original checkbox in toggle switches */
  input[type="checkbox"] {
    display: none;
  }

  /* Toggle switch container */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    background-color: var(--color-gray-300);
    border-radius: var(--radius-full);
    transition: background-color 200ms ease;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Toggle switch knob */
  .toggle-knob {
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

  /* Icons in toggle knob (opt-in via .with-icons class) */
  &.with-icons .toggle-knob::before {
    content: "✕";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: var(--color-gray-600);
    transition: opacity 200ms ease;
  }

  &.with-icons:has(input[type="checkbox"]:checked) .toggle-knob::before {
    content: "✓";
    color: var(--color-primary-600);
  }

  /* Toggle switch when checked - using :has() selector */
  &:has(input[type="checkbox"]:checked) .toggle-switch {
    background-color: var(--color-primary-fill);
  }
  

  /* Toggle knob when checked - always moves to the right */
  &:has(input[type="checkbox"]:checked) .toggle-knob {
    left: 22px;
  }

  /* Focus state for toggle switch */
  &:has(input[type="checkbox"]:focus) .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Focus visible state when label is focused via keyboard */
  &:focus-visible .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Remove default outline on label itself */
  &:focus {
    outline: none;
  }

  /* Disabled state */
  &:has(input[type="checkbox"]:disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .toggle-switch {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
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
  line-height: var(--font-line-height-relaxed);
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
  border: var(--border-width-medium) solid transparent;
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
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
      (focusRingOpacity || 0.3) * 100,
    )}%, transparent);
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
  background-color: var(--color-primary-fill);
  color: white;
  border-color: var(--color-primary-fill);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
      (focusRingOpacity || 0.3) * 100,
    )}%, transparent);
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
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  
  &:hover {
    background-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    border-color: var(--color-primary-500);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    color: var(--color-primary-contrast, #ffffff);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }
  
  &:disabled {
    background-color: transparent;
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(${minButtonHeight}px * 0.8);
}

.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  min-height: calc(${minButtonHeight}px * 0.6);
}


.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${minButtonHeight}px * 1.2);
}

/* Working/loading state for buttons */
button.btn-working,
a.btn-working {
  cursor: wait;
  pointer-events: none;
  opacity: 0.6;
  
  pds-icon:first-child {
    animation: pds-spin 0.8s linear infinite;
  }
}

@keyframes pds-spin {
  to { transform: rotate(360deg); }
}

/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(
    90deg,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 0%,
    color-mix(in oklab, var(--color-surface-base) 85%, var(--color-text-primary) 15%) 50%,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 100%
  );
  background-size: 200% 100%;
  animation: pds-skeleton 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
  
  &::before {
    content: '\\00a0';
  }
}

@keyframes pds-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty State */
.empty-state {
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--color-text-secondary);
  padding: var(--spacing-6) var(--spacing-4);
  background-color: var(--color-surface-subtle);
  max-width: var(--layout-max-width-md);
  border-radius: var(--radius-md);
  nav {
    margin-top: var(--spacing-4);
    display: flex;
    gap: var(--spacing-3);
  }
  pds-icon {    
    color: var(--color-text-muted);
  }
}

/* clip lines */

[data-clip] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: attr(data-clip number, 3);
  line-clamp: attr(data-clip number, 3);
  position: relative;
  padding-inline-end: var(--spacing-6);
  --clip-more-bg: var(--color-surface-base);
  max-height: var(--clip-max-height-closed, calc(var(--spacing-12) * 3));
  transition: max-height var(--transition-fast), padding-inline-end var(--transition-fast);
  overflow: hidden;

  /* optional visual “more” hint*/
  &:not([data-clip-open="true"])[data-clip-more]::after{
    content: attr(data-clip-more);
  }

  &:not([data-clip-open="true"]):not([data-clip-more])::after{
    content: "more...";
  }

  /* optional visual “less” hint*/
  &[data-clip-open="true"][data-clip-less]::after{
    content: attr(data-clip-less);
  }

  &[data-clip-open="true"]:not([data-clip-less])::after{
    content: "less...";
  }

  &::after{
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 0;
    display: inline-flex;
    align-items: center;
    padding: var
    padding-inline-start: var(--spacing-2);
    cursor: pointer;
    opacity: .7;
    transition: opacity var(--transition-fast), transform var(--transition-fast);
  }

  &[data-clip-open="true"] {
    -webkit-line-clamp: unset;
    line-clamp: unset;
    max-height: var(--clip-max-height-open, calc(var(--spacing-12) * 20));
    padding-inline-end: var(--spacing-6);
  }

  &[data-clip-open="true"]::after{
    opacity: .9;
    transform: translateY(calc(var(--spacing-1) * -1));
  }

}



/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  background: var(--color-input-bg);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  position: relative;

  input[type="range"] {
    border: none;
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

  &.visible {
    opacity: 1;
  }
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
  border: var(--border-width-medium) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: var(--border-width-medium) solid var(--color-border);
    margin-top: var(--spacing-4);
  }
}

.array-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
  flex-wrap: wrap;

  button {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
    min-height: auto;
  }
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

  input[type="checkbox"],
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
}

`;
  }

  #generateTableStyles() {
    const { layout = {} } = this.options.design;
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
  border-bottom: var(--border-width-medium) solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: var(--border-width-thin) solid var(--color-border);
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

.table-striped {
  tbody tr:nth-child(even) {
    background-color: var(--color-surface-subtle);
  }
}

.table-bordered {
  border: var(--border-width-thin) solid var(--color-border);
  
  th, td {
    border: var(--border-width-thin) solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

`;
  }

  #generateCalloutStyles() {
    return /*css*/ `/* Callout/Notification Styles */

.callout {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-relaxed);
  background-color: red;
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.callout-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.callout-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.callout-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.callout-danger,
.callout-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

.callout-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.callout-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
}

.callout-dismissible {
  padding-right: var(--spacing-12);
  position: relative;
}

.callout-close {
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

  #generateAccordionStyles() {
    return /*css*/ `/* Accordion (details/summary) */

:where(.accordion details) {
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  margin: 0 0 var(--spacing-3) 0;
  overflow: hidden;

  &[open] {
    & > summary::after {
      transform: rotate(45deg);
    }

    &::details-content {
      block-size: auto;
    }
  }

  /* Modern approach: animate block-size with ::details-content */
  &::details-content {
    block-size: 0;
    overflow: hidden;
    transition: block-size var(--transition-normal) ease, content-visibility var(--transition-normal);
    transition-behavior: allow-discrete;
  }

  /* Content padding (works for both approaches) */
  & > :not(summary) > * {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
  }
}

:where(.accordion summary) {
  cursor: pointer;
  padding: var(--spacing-3) var(--spacing-4);
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: inherit;
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background-color: var(--color-surface-subtle);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
  }

  /* Chevron indicator */
  &::after {
    content: "";
    margin-inline-start: auto;
    inline-size: 0.7em;
    block-size: 0.7em;
    border-inline-end: 2px solid currentColor;
    border-block-end: 2px solid currentColor;
    transform: rotate(-45deg);
    transition: transform var(--transition-normal);
  }
}

/* Fallback: grid trick for browsers without ::details-content support */
@supports not selector(::details-content) {
  :where(.accordion details) {
    & > :not(summary) {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--transition-normal) ease;
      overflow: hidden;

      & > * {
        min-block-size: 0;
      }
    }

    &[open] > :not(summary) {
      grid-template-rows: 1fr;
    }
  }
}
`;
  }

  // Legacy #generateToastStyles() removed - was empty/unused

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
}

.badge-primary, .badge-secondary, .badge-success, .badge-info, .badge-warning, .badge-danger { color: white; }
.badge-primary { background-color: var(--color-primary-600); }
.badge-secondary { background-color: var(--color-secondary-600); }
.badge-success { background-color: var(--color-success-600); }
.badge-info { background-color: var(--color-info-600); }
.badge-warning { background-color: var(--color-warning-600); }
.badge-danger { background-color: var(--color-danger-600); }

.badge-outline {
  background-color: transparent;
  border: var(--border-width-thin) solid currentColor;
  &.badge-primary { color: var(--color-text-primary); }
  &.badge-secondary { color: var(--color-secondary-600); }
  &.badge-success { color: var(--color-success-600); }
  &.badge-info { color: var(--color-info-600); }
  &.badge-warning { color: var(--color-warning-600); }
  &.badge-danger { color: var(--color-danger-600); }
}

.badge-sm { padding: 2px var(--spacing-1); font-size: 10px; }
.badge-lg { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
.pill { padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); }

`;
  }

  #generateDialogStyles() {
    const { layout = {}, behavior = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    return /*css*/ `/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  width: min(600px, calc(100vw - var(--spacing-8)));
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100dvh - var(--spacing-8));
  margin: 0;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
  transition: 
    opacity var(--transition-normal) ease,
    transform var(--transition-normal) ease;
  
  
}

/* Open state */
dialog[open] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  animation: pds-dialog-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-enter {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Safari fallback: disable scale animation to avoid dialog clipping bugs */
dialog.dialog-no-scale-animation {
  transform: translate(-50%, -50%);
  transition: opacity var(--transition-normal) ease;
}

dialog.dialog-no-scale-animation[open] {
  transform: translate(-50%, -50%);
  animation: pds-dialog-fade-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-fade-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: opacity var(--transition-normal) ease;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
  animation: pds-dialog-backdrop-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-backdrop-enter {
  from { opacity: 0; }
  to { opacity: var(--backdrop-opacity, 1); }
}

/* Dialog - constrain max height to 90vh, support custom maxHeight via CSS variable */
dialog {
  max-height: var(--dialog-max-height, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent dialog itself from scrolling - let .dialog-body handle it */
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Allow flex child to shrink */
  margin: 0;
}

/* Dialog fields - to open pds-form subforms */
.dialog-field {
    margin-top: var(--spacing-3);
}

/* Dialog header */
dialog {
  header,
  form > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    border-bottom: var(--border-width-thin) solid var(--surface-overlay-border);
    flex-shrink: 0;   

    h2,
    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--surface-overlay-text);
      flex: 1;
    }

    /* Close button in header */
    button[value="cancel"],
    .dialog-close {
      background: none;
      border: none;
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--surface-overlay-icon);
      transition: background-color var(--transition-fast);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: var(--color-surface-subtle);
      }

      &:focus-visible {
        outline: 2px solid var(--color-focus-ring);
        outline-offset: 2px;
      }
    }
  }

  /* Dialog body - scrollable content */
  article,
  form > article,
  .dialog-body {
    flex: 1 1 auto;
    min-height: 0; /* Critical: allow flex child to shrink and scroll */
    padding: var(--spacing-3) var(--spacing-6);
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Dialog footer - actions */
  footer,
  form > footer {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-3);
    justify-content: flex-end;
    align-items: center;
    padding: var(--spacing-6);
    border-top: var(--border-width-thin) solid var(--surface-overlay-border);
    flex-shrink: 0;
  }
}

/* Dialog size modifiers */
dialog.dialog-sm { width: min(400px, calc(100vw - var(--spacing-8))); max-width: min(400px, calc(100vw - var(--spacing-8))); }
dialog.dialog-lg { width: min(800px, calc(100vw - var(--spacing-8))); max-width: min(800px, calc(100vw - var(--spacing-8))); }
dialog.dialog-xl { width: min(1200px, calc(100vw - var(--spacing-8))); max-width: min(1200px, calc(100vw - var(--spacing-8))); }
dialog.dialog-full { width: calc(100vw - var(--spacing-8)); max-width: calc(100vw - var(--spacing-8)); max-height: calc(100dvh - var(--spacing-8)); }

/* Mobile responsiveness - maximize on mobile */
@media (max-width: ${breakpoints.sm - 1}px) {
  dialog,
  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    transform: none !important;
  }

  dialog[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog { 
    max-width: 100vw; 
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh; 
    --dialog-max-height: 100dvh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    margin: 0;
    transform: scale(0.98);
  }
  dialog[open] {
    transform: scale(1);
    animation: pds-dialog-enter-mobile var(--transition-normal) ease;
  }

  dialog.dialog-no-scale-animation {
    transition: opacity var(--transition-normal) ease;
  }
  dialog.dialog-no-scale-animation[open] {
    animation: pds-dialog-fade-enter var(--transition-normal) ease;
  }
  @keyframes pds-dialog-enter-mobile {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  dialog header, dialog form > header, dialog article, dialog form > article, dialog footer, dialog form > footer { padding: var(--spacing-4); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog, dialog::backdrop { transition-duration: 0.01s !important; }
}

`;
  }

  #generateTabStripStyles() {
    const { layout = {} } = this.options.design;
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

  & > nav {
    display: flex;
    gap: var(--spacing-1);
    border-bottom: var(--border-width-medium) solid var(--color-border);
    margin-bottom: var(--spacing-6);
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    /* Tab links */
    & > a {
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
      border-bottom: var(--border-width-medium) solid transparent;
      margin-bottom: calc(-1 * var(--border-width-medium)); /* Overlap the nav border */

      &:hover {
        color: var(--color-text-primary);
        background-color: var(--color-surface-hover);
      }

      &:focus-visible {
        outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
        outline-offset: -2px;
        border-radius: var(--radius-sm);
        z-index: 1;
      }

      /* Active tab */
      &[aria-current="page"] {
        color: var(--color-primary-600);
        font-weight: var(--font-weight-semibold);
        border-bottom-color: var(--color-primary-600);

        &:hover {
          color: var(--color-primary-700);
          border-bottom-color: var(--color-primary-700);
          background-color: var(--color-primary-50);
        }
      }
    }
  }

  /* Tab panel */
  & > pds-tabpanel {
    display: block;
    margin-top: var(--spacing-4);

    &[data-tabpanel] {
      animation: tabFadeIn var(--transition-normal) ease-out;
      padding: var(--spacing-4) 0;

      &[hidden] {
        display: none;
      }
    }
  }
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive */
@media (max-width: ${breakpoints.sm - 1}px) {
  pds-tabstrip > nav { gap: var(--spacing-1); }
  pds-tabstrip > nav > a { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
  pds-tabstrip > pds-tabpanel[data-tabpanel] { padding: var(--spacing-3) 0; }
}

`;
  }

  #generateScrollbarStyles() {
    return /*css*/ `/* Custom Scrollbars */
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-secondary-300);
  border-radius: var(--radius-full);
  border: var(--border-width-thick) solid transparent;
  background-clip: padding-box;
  transition: background-color var(--transition-fast);
  &:hover { background: var(--color-secondary-400); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
  &:active { background: var(--color-secondary-500); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
  @media (prefers-color-scheme: dark) {
    background: var(--color-secondary-600);
    &:hover { background: var(--color-secondary-500); }
    &:active { background: var(--color-secondary-400); }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  @media (prefers-color-scheme: dark) { scrollbar-color: var(--color-secondary-600) transparent; }
}
*:hover { scrollbar-color: var(--color-secondary-400) transparent; }
@media (prefers-color-scheme: dark) { *:hover { scrollbar-color: var(--color-secondary-500) transparent; } }

`;
  }

  #generateIconStyles() {
    const { a11y = {} } = this.options.design;
    const minTouchTarget =
      a11y.minTouchTarget || enums.TouchTargetSizes.standard;

    return /*css*/ `/* Icon System */

pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  pointer-events: none;
}

/* Icon size utilities */
.icon-xs, pds-icon[size="xs"] { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon-sm, pds-icon[size="sm"] { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon-md, pds-icon[size="md"] { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon-lg, pds-icon[size="lg"] { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon-xl, pds-icon[size="xl"] { width: var(--icon-size-xl); height: var(--icon-size-xl); }
.icon-2xl, pds-icon[size="2xl"] { width: var(--icon-size-2xl); height: var(--icon-size-2xl); }
.icon-32xl, pds-icon[size="3xl"] { width: var(--icon-size-3xl); height: var(--icon-size-3xl); }


/* Icon color utilities */
.icon-primary, pds-icon.primary { color: var(--color-primary-600); }
.icon-secondary, pds-icon.secondary { color: var(--color-secondary-600); }
.icon-accent, pds-icon.accent { color: var(--color-accent-600); }
.icon-success, pds-icon.success { color: var(--color-success-600); }
.icon-warning, pds-icon.warning { color: var(--color-warning-600); }
.icon-danger, pds-icon.danger { color: var(--color-danger-600); }
.icon-info, pds-icon.info { color: var(--color-info-600); }
.icon-muted, pds-icon.muted { color: var(--color-text-muted); }
.icon-subtle, pds-icon.subtle { color: var(--color-text-subtle); }

/* Icon with text combinations */
.icon-text { display: inline-flex; align-items: center; gap: var(--spacing-2); }
.icon-text-start { flex-direction: row; }
.icon-text-end { flex-direction: row-reverse; }

/* Button icon utilities */
button, a {
  pds-icon {
    flex-shrink: 0;
  }

  &.icon-only {
    padding: var(--spacing-2);
    min-width: ${minTouchTarget}px;
    width: ${minTouchTarget}px;
    height: ${minTouchTarget}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* Icon in inputs */
.input-icon, .input-icon-end {
  position: relative;
  display: flex;
  align-items: center;
  pds-icon { position: absolute; color: var(--color-text-muted); pointer-events: none; width: var(--icon-size-md); height: var(--icon-size-md); }
}
.input-icon {
  pds-icon { left: var(--spacing-3); }
  input { padding-left: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}
.input-icon-end {
  pds-icon { left: unset; right: var(--spacing-3); }
  input { padding-left: var(--spacing-4); padding-right: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}

`;
  }

  #generateDropdownStyles() {
    return /*css*/ `/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  display: inline-block;
  padding: 0;

  & > :last-child {
    position: absolute;
    padding: var(--spacing-2);
    margin: 0;
    background: var(--color-surface-overlay);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    top: 100%;
    bottom: auto;
    left: 0;
    right: auto;
    margin-top: var(--spacing-2);
    --dropdown-transition-duration: var(--transition-fast, 160ms);
    min-width: var(--dropdown-min-width, 12rem);
    width: max-content;
    inline-size: max-content;
    max-width: none;
    max-inline-size: none;
    opacity: 0;
    scale: 0.95;
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear var(--dropdown-transition-duration),
      display 0s linear var(--dropdown-transition-duration);
    transition-behavior: allow-discrete;
  }

  & > :last-child[aria-hidden="false"] {
    display: inline-block;
    opacity: 1;
    scale: 1;
    visibility: visible;
    pointer-events: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear 0s,
      display 0s linear 0s;
  }

  menu {
    list-style: none;
  }

  menu li {
    padding: var(--spacing-1) 0;

    & + li {
      border-top: var(--border-width-thin) solid var(--color-border);
      margin-top: var(--spacing-2);
    }

    &:has(> hr) {
      border-top: none;
      margin-top: 0;
      padding: 0;

      & + li {
        border-top: none;
        margin-top: 0;
      }
    }

    & > hr {
      border: none;
      border-top: var(--border-width-thick) solid var(--color-border);
      margin: var(--spacing-2) 0;
    }
  }

  menu a {
    display: flex;
    color: var(--color-text-primary);
    text-decoration: none;
    align-items: center;
    gap: var(--spacing-2);

    &.danger {
      color: var(--color-danger-600);
    }
  }

  &.align-right,
  &[data-align="right"],
  &[data-align="end"],
  &[data-dropdown-align="right"],
  &[data-dropdown-align="end"] {
    & > :last-child {
      left: auto;
      right: 0;
    }
  }

  &[data-mode="up"],
  &[data-dropdown-direction="up"] {
    & > :last-child {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: var(--spacing-2);
      transform-origin: bottom center;
    }
  }

  &[data-mode="down"],
  &[data-dropdown-direction="down"] {
    & > :last-child {
      top: 100%;
      bottom: auto;
      margin-top: var(--spacing-2);
      margin-bottom: 0;
      transform-origin: top center;
    }
  }

  &[data-mode="auto"] > :last-child {
    top: 100%;
    bottom: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    & > :last-child {
      transition-duration: 0.01s !important;
    }
  }
}

@starting-style {
  nav[data-dropdown] > :last-child[aria-hidden="false"] {
    opacity: 0;
    scale: 0.95;
  }
}
`;
  }

  #generateLayoutUtilities() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    const gridSystem = layout.gridSystem || {};
    const columns = gridSystem.columns || [1, 2, 3, 4, 6];
    const autoFitBreakpoints = gridSystem.autoFitBreakpoints || {
      sm: "150px",
      md: "250px",
      lg: "350px",
      xl: "450px",
    };

    const layoutMaxWidths = this.#resolveLayoutMaxWidths(layout);

    const sections = [
      /*css*/ `
/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: ${layout.containerMaxWidth || "1400px"};
  margin: 0 auto;
  padding: ${layout.containerPadding || "var(--spacing-6)"};
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--spacing-4);
}

`,
    ];

    // Generate fixed column grids
    for (const col of columns) {
      sections.push(
        `.grid-cols-${col} { grid-template-columns: repeat(${col}, 1fr); }\n`,
      );
    }

    sections.push("\n/* Auto-fit grids (responsive) */\n");
    // Generate auto-fit responsive grids
    for (const [name, minWidth] of Object.entries(autoFitBreakpoints)) {
      sections.push(
        `.grid-auto-${name} { grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); }\n`,
      );
    }

    // Generate gap utilities

    sections.push(/*css*/ `
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`);

    sections.push(/*css*/ `
/* Flexbox System */
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.grow { flex: 1 1 0%; }

/* Alignment utilities */
.items-start { align-items: flex-start; } .items-center { align-items: center; } .items-end { align-items: flex-end; } .items-stretch { align-items: stretch; } .items-baseline { align-items: baseline; }
.justify-start { justify-content: flex-start; } .justify-center { justify-content: center; } .justify-end { justify-content: flex-end; } .justify-between { justify-content: space-between; } .justify-around { justify-content: space-around; } .justify-evenly { justify-content: space-evenly; }
.text-left { text-align: left; } .text-center { text-align: center; } .text-right { text-align: right; }

/* Text overflow utility */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Required Legend Utility */
:where(.required-legend) {
  display: block;
  margin: var(--spacing-3) 0;
  color: var(--color-text-muted);
}

/* Max-width utilities */
.max-w-sm { max-width: var(--layout-max-width-sm, ${layoutMaxWidths.sm}); } .max-w-md { max-width: var(--layout-max-width-md, ${layoutMaxWidths.md}); } .max-w-lg { max-width: var(--layout-max-width-lg, ${layoutMaxWidths.lg}); } .max-w-xl { max-width: var(--layout-max-width-xl, ${layoutMaxWidths.xl}); }

/* Stack utilities - vertical rhythm for stacked elements */
[class^="stack-"], [class*=" stack-"] {
  display: flex;
  flex-direction: column;
}
.stack-xs { gap: var(--spacing-1); }
.stack-sm { gap: var(--spacing-2); }
.stack-md { gap: var(--spacing-4); }
.stack-lg { gap: var(--spacing-6); }
.stack-xl { gap: var(--spacing-8); }

/* Section spacing - for major content blocks */
.section { padding-block: var(--spacing-8); }
.section-lg { padding-block: var(--spacing-12); }

/* Responsive helpers */
@media (max-width: ${breakpoints.md - 1}px) {
  .mobile-stack { flex-direction: column; }
  .mobile-stack > * { width: 100%; }
}

/* ============================================================================
   Backdrop Utilities
   Reusable backdrop layer for modal components (dialogs, drawers, overlays)
   ============================================================================ */

/* Base backdrop class for modal overlays */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: var(--z-modal, 1040);

  &.active {
    opacity: var(--backdrop-opacity, 1);
    pointer-events: auto;
  }
}

/* Backdrop variants */
.backdrop-light { --backdrop-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)); --backdrop-brightness: 1.1; }
.backdrop-dark { --backdrop-bg: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); --backdrop-brightness: 0.6; }
.backdrop-blur-sm { --backdrop-blur: 5px; } .backdrop-blur-md { --backdrop-blur: 10px; } .backdrop-blur-lg { --backdrop-blur: 20px; }
`);

    return sections.join("");
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
.img-rounded-sm { border-radius: var(--radius-sm); } .img-rounded-md { border-radius: var(--radius-md); } .img-rounded-lg { border-radius: var(--radius-lg); } .img-rounded-xl { border-radius: var(--radius-xl); } .img-rounded-full { border-radius: var(--radius-full); }

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
    const { layout = {}, a11y = {} } = this.options.design;
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
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${breakpoints.md}px and up) */
@media (min-width: ${breakpoints.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${breakpoints.lg}px and up) */
@media (min-width: ${breakpoints.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button, a, select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${minTouchTarget}px;
    min-width: ${minTouchTarget}px;
  }
  
  /* Radio and checkbox inputs: keep reasonable size but ensure label tap area is large */
  input[type="radio"],
  input[type="checkbox"] {
    /* Keep native size - labels provide the touch target */
    min-height: unset;
    min-width: unset;
  }
  
  /* Ensure labels with radio/checkbox have adequate touch targets */
  /* Exclude button-style fieldsets which already have proper sizing */
  label:has(input[type="radio"]):not(fieldset.buttons label),
  label:has(input[type="checkbox"]):not(fieldset.buttons label),
  fieldset[role="radiogroup"]:not(.buttons) label,
  fieldset[role="group"]:not(.buttons) label {
    min-height: ${minTouchTarget}px;
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) 0;
  }
  
  /* Disable hover effects
   on touch devices */
  .card {
    &:hover {
      box-shadow: var(--shadow-base);
    }
  }
  
  a {
    &:hover {
      color: var(--color-primary-600);
    }
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
    border-width: var(--border-width-medium);
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

  // Method to get current tokens (useful for debugging)
  getTokens() {
    return this.tokens;
  }

  // Method to export CSS (useful for build processes)
  exportCSS() {
    return this.layeredCSS;
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
      this.options.log?.("debug", "[Generator] Layer sizes:", {
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
      borderWidths,
      typography,
      shadows,
      darkShadows,
      layout,
      transitions,
      zIndex,
      icons,
    } = this.tokens;

    const sections = [
      /*css*/ `@layer tokens {
       :root {
          ${this.#generateColorVariables(colors)}
          ${this.#generateSpacingVariables(spacing)}
          ${this.#generateRadiusVariables(radius)}
          ${this.#generateBorderWidthVariables(borderWidths)}
          ${this.#generateTypographyVariables(typography)}
          ${this.#generateShadowVariables(shadows)}
          ${this.#generateLayoutVariables(layout)}
          ${this.#generateTransitionVariables(transitions)}
          ${this.#generateZIndexVariables(zIndex)}
          ${this.#generateIconVariables(icons)}
       }
       ${this.#generateDarkVariablesForTokensLayer(colors, darkShadows)}
    }`,
    ];

    // Important: emit a non-layered dark variables block so that manual
    // html[data-theme="dark"] wins even if the page has older, unlayered
    // PDS CSS loaded. Unlayered declarations outrank layered ones in the
    // cascade; this small non-layered override ensures correct theming.
    sections.push(
      `\n/* Non-layered dark variables fallback (ensures attribute wins) */\n`,
    );
    sections.push(this.#generateDarkVariablesOnly(colors, darkShadows));

    return sections.join("");
  }

  #generatePrimitivesLayer() {
    const { advanced = {}, a11y = {}, layout = {} } = this.options.design;
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
    interpolate-size: allow-keywords;
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-line-height-normal);
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
    min-width: 320px;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    min-height: 100vh;
    min-height: var(--layout-min-height, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  :where(body.drawer-open) {
    /* overflow: hidden; */
    /* scrollbar-gutter: stable; */
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
    border: var(--border-width-thin) solid var(--color-border);
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

  /* Harmonized placeholder styling */
  :where(input)::placeholder,
  :where(textarea)::placeholder,
  :where(pds-richtext)::placeholder {
    color: var(--color-text-muted);
    opacity: 1;
    font-weight: var(--font-weight-normal);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-text, var(--color-primary-600));
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

  /* Checkbox enhancement - visually hide native input but keep accessible
     Excludes button-style checkboxes in fieldsets and special containers */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]) input[type="checkbox"]) {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  /* Style label container for checkbox */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-left: calc(var(--spacing-5) + var(--spacing-3));
  }

  /* Custom checkbox box using PDS tokens - works with or without span wrapper */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--spacing-5);
    height: var(--spacing-5);
    border: var(--border-width-medium) solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
    transition: all var(--transition-fast);
    flex-shrink: 0;
  }

  /* Checkmark */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::after) {
    content: "";
    position: absolute;
    left: var(--spacing-2);
    top: 50%;
    transform: translateY(-60%) rotate(45deg);
    width: var(--spacing-1-5);
    height: var(--spacing-3);
    border: solid var(--color-primary-contrast, white);
    border-width: 0 2px 2px 0;
  }

  /* Checked state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::before) {
    background: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  /* Focus styles for accessibility */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:focus)::before) {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Hover effects */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:not(:disabled)):hover::before) {
    border-color: var(--color-primary-600);
    background: var(--color-surface-subtle);
  }

  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked:not(:disabled)):hover::before) {
    background: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }

  /* Disabled state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(fieldset) {
    border: none;
  }

  :where(legend) {
    display: block;
    font-weight: var(--font-weight-semibold);
    padding: 0;
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-3) 0;
    border: none;
    line-height: var(--font-line-height-tight);
    font-size: var(--font-size-lg);
    background: transparent; /* avoid browser default notch behavior */
    width: auto;
    box-sizing: border-box;
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
    line-height: var(--font-line-height-tight);
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
    line-height: var(--font-line-height-relaxed);
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
    line-height: var(--font-line-height-relaxed);
  }

  
  :where([hidden]) {
    display: none !important;
  }
}

`;
  }

  #generateComponentsLayer() {
    return /*css*/`@layer components {\n
${this.#generateSemanticHTMLStyles()}

${this.#generateFormStyles()}

${this.#generateCalloutStyles()}

${this.#generateBadgeStyles()}

${this.#generateDialogStyles()}

${this.#generateAccordionStyles()}

${this.#generateDropdownStyles()}

${this.#generateTabStripStyles()}

${this.#generateTableStyles()}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

:where(.card:has(> header):has(> footer)) {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: var(--spacing-4);
}

:where(.card > footer) {
  display: flex;
  justify-content: space-evenly;
}

:where(.card > header > :last-child:not(:first-child)) {
  color: var(--color-text-muted);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined,
.card-basic {
  background: var(--color-surface-base);
  border: var(--border-width-thin) solid var(--color-border);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

${this.#generateScrollbarStyles()}

${this.#generateDarkModeComponentRules()}

}\n`;
  }

  #generateUtilitiesLayer() {
    return /*css*/ `@layer utilities {\n
${this.#generateIconStyles()}

${this.#generateLayoutUtilities()}

/* Optional utilities/features controlled by config options */
/* - Body background mesh rule (applies one of the generated mesh vars) */
/* - Liquid glass utility class */
${this.#generateBodyBackgroundMeshRule()}
${this.#generateLiquidGlassUtility()}

${this.#generateBorderGradientUtilities()}

/* Surface utilities */

.surface {
  background-color: var(--color-surface-base);
}

.surface-subtle {
  background-color: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
}

.surface-sunken {
  background-color: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
}

/* Translucent semantic variants */
.surface-translucent {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-25 {
  background-color: var(--color-surface-translucent-25);
}

.surface-translucent-50 {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-75 {
  background-color: var(--color-surface-translucent-75);
}

/* Legacy utility retained for backwards compatibility (opinionated overlay) */
.surface-overlay {
  padding: var(--spacing-4);
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}


/* 
 * SURFACE-INVERSE: Local Theme Context Flip
 * 
 * We can't simply add .surface-inverse to the dark mode selector because that would
 * also apply the dark color PALETTE (grays, surfaces, etc.), which would override
 * --color-surface-inverse itself. Instead, we duplicate only the SEMANTIC tokens.
 * 
 * Light theme .surface-inverse → dark semantic tokens
 * Dark theme .surface-inverse  → light semantic tokens (flip back)
 */

/* Surface-inverse visual properties (shared, uses smart surface tokens) */
.surface-inverse {
  background-color: var(--color-surface-inverse);
  color: var(--surface-inverse-text);

  pds-icon {
    color: var(--surface-inverse-icon);
  }
  
  /* btn-primary stays vibrant in any context */
  & .btn-primary {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    
    &:hover {
      background-color: var(--color-primary-400);
      border-color: var(--color-primary-400);
    }
  }
}

/* Light-mode inverse: apply dark semantic tokens */
html:not([data-theme="dark"]) .surface-inverse {
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  --color-surface-muted: rgba(255, 255, 255, 0.08);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(255, 255, 255, 0.12);
    color: var(--surface-inverse-text);
    border-color: rgba(255, 255, 255, 0.25);
    
    &:hover { background-color: rgba(255, 255, 255, 0.2); }
    &:active { background-color: rgba(255, 255, 255, 0.28); }
  }
  
  & select {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-300, #7dd3fc);
  }
}

/* Dark-mode inverse: flip back to light semantic tokens */
html[data-theme="dark"] .surface-inverse {
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  --color-surface-muted: var(--color-gray-100);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(0, 0, 0, 0.06);
    color: var(--surface-inverse-text);
    border-color: rgba(0, 0, 0, 0.15);
    
    &:hover { background-color: rgba(0, 0, 0, 0.1); }
    &:active { background-color: rgba(0, 0, 0, 0.15); }
  }
  
  & select {
    background-color: #ffffff;
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-600, #0284c7);
  }
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-base, .shadow {
  box-shadow: var(--shadow-base);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-xl {
  box-shadow: var(--shadow-xl);
}

.shadow-inner {
  box-shadow: var(--shadow-inner);
}

.shadow-none {
  box-shadow: none;
}

.text-muted {
  color: var(--color-text-muted);
}


${this.#generateMediaUtilities()}

${this.#generateMediaQueries()}

}\n`;
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

  // /**
  //  * Create BLOB URLs for live injection
  //  */
  // #createBlobURLs() {
  //   this.#blobURLs = {};
  //   this.#recreateBlobURLs();
  // }

  // #recreateBlobURLs() {
  //   // Safety check
  //   if (!this.#layers) {
  //     this.options.log?.(
  //       "error",
  //       "[Generator] Cannot create BLOB URLs: layers not generated"
  //     );
  //     return;
  //   }

  //   // Revoke old URLs
  //   if (this.#blobURLs) {
  //     Object.values(this.#blobURLs).forEach((url) => {
  //       if (url) URL.revokeObjectURL(url);
  //     });
  //   }

  //   // Create new BLOB URLs for each layer
  //   this.#blobURLs.tokens = this.#createBlobURL(this.#layers.tokens);
  //   this.#blobURLs.primitives = this.#createBlobURL(this.#layers.primitives);
  //   this.#blobURLs.components = this.#createBlobURL(this.#layers.components);
  //   this.#blobURLs.utilities = this.#createBlobURL(this.#layers.utilities);

  //   // Combined styles (layers already have @layer wrappers, just concatenate)
  //   const combined = `${this.#layers.tokens}\n${this.#layers.primitives}\n${
  //     this.#layers.components
  //   }\n${this.#layers.utilities}`;
  //   this.#blobURLs.styles = this.#createBlobURL(combined);

  //   if (this.options.debug) {
  //     this.options.log?.(
  //       "debug",
  //       "[Generator] Created BLOB URL for combined styles:",
  //       this.#blobURLs.styles
  //     );
  //   }
  // }

  // #createBlobURL(css) {
  //   const blob = new Blob([css], { type: "text/css" });
  //   return URL.createObjectURL(blob);
  // }

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

  /**
   * Get a complete compiled representation of the design system state.
   * This provides structured access to all generated tokens, scales, layers, and metadata.
   * Linked to ontology and enums for introspection and tooling.
   *
   * @returns {Object} Compiled design system state with tokens, layers, metadata, and references
   */
  get compiled() {
    return {
      // Core token groups - the source data used to generate CSS
      tokens: {
        colors: this.tokens.colors,
        spacing: this.tokens.spacing,
        radius: this.tokens.radius,
        borderWidths: this.tokens.borderWidths,
        typography: this.tokens.typography,
        shadows: this.tokens.shadows,
        layout: this.tokens.layout,
        transitions: this.tokens.transitions,
        zIndex: this.tokens.zIndex,
        icons: this.tokens.icons,
      },

      // Layer information - CSS content and metadata
      layers: {
        tokens: {
          css: this.#layers?.tokens || "",
          size: this.#layers?.tokens?.length || 0,
          sizeKB: ((this.#layers?.tokens?.length || 0) / 1024).toFixed(2),
        },
        primitives: {
          css: this.#layers?.primitives || "",
          size: this.#layers?.primitives?.length || 0,
          sizeKB: ((this.#layers?.primitives?.length || 0) / 1024).toFixed(2),
        },
        components: {
          css: this.#layers?.components || "",
          size: this.#layers?.components?.length || 0,
          sizeKB: ((this.#layers?.components?.length || 0) / 1024).toFixed(2),
        },
        utilities: {
          css: this.#layers?.utilities || "",
          size: this.#layers?.utilities?.length || 0,
          sizeKB: ((this.#layers?.utilities?.length || 0) / 1024).toFixed(2),
        },
        combined: {
          css: this.layeredCSS,
          size: this.layeredCSS?.length || 0,
          sizeKB: ((this.layeredCSS?.length || 0) / 1024).toFixed(2),
        },
      },

      // Configuration snapshot - what was used to generate this state
      config: {
        design: this.options.design || {},
        preset: this.options.preset || null,
        debug: this.options.debug || false,
      },

      // Runtime capabilities and environment
      capabilities: {
        constructableStylesheets: typeof CSSStyleSheet !== "undefined",
        blobURLs: typeof Blob !== "undefined" && typeof URL !== "undefined",
        shadowDOM: typeof ShadowRoot !== "undefined",
      },

      // References to design system metadata
      references: {
        // Link to ontology for component/primitive definitions
        ontology: typeof ontology !== "undefined" ? ontology : null,
        // Link to enums for valid values
        enums: typeof enums !== "undefined" ? enums : null,
      },

      // Computed metadata about the generated design system
      meta: {
        generatedAt: new Date().toISOString(),
        totalSize:
          (this.#layers?.tokens?.length || 0) +
          (this.#layers?.primitives?.length || 0) +
          (this.#layers?.components?.length || 0) +
          (this.#layers?.utilities?.length || 0),
        totalSizeKB: (
          ((this.#layers?.tokens?.length || 0) +
            (this.#layers?.primitives?.length || 0) +
            (this.#layers?.components?.length || 0) +
            (this.#layers?.utilities?.length || 0)) /
          1024
        ).toFixed(2),
        layerCount: 4,
        tokenGroups: Object.keys(this.tokens).length,
      },

      // Introspection helpers - methods to query the compiled state
      helpers: {
        /**
         * Get all color scales as a flat array
         */
        getColorScales: () => {
          const scales = [];
          const colors = this.tokens.colors;
          for (const [name, scale] of Object.entries(colors)) {
            if (typeof scale === "object" && scale !== null) {
              scales.push({ name, scale });
            }
          }
          return scales;
        },

        /**
         * Get a specific color scale by name
         */
        getColorScale: (name) => {
          return this.tokens.colors[name] || null;
        },

        /**
         * Get all spacing values as an array
         */
        getSpacingValues: () => {
          return Object.entries(this.tokens.spacing).map(([key, value]) => ({
            key,
            value,
          }));
        },

        /**
         * Get typography configuration
         */
        getTypography: () => {
          return this.tokens.typography;
        },

        /**
         * Get the CSS for a specific layer
         */
        getLayerCSS: (layer) => {
          const validLayers = [
            "tokens",
            "primitives",
            "components",
            "utilities",
          ];
          if (!validLayers.includes(layer)) {
            throw new Error(
              `Invalid layer: ${layer}. Must be one of ${validLayers.join(
                ", ",
              )}`,
            );
          }
          return this.#layers?.[layer] || "";
        },

        /**
         * Check if a specific enum value is used in the current configuration
         */
        usesEnumValue: (enumGroup, value) => {
          const config = this.options.design || {};
          // Simple check - can be expanded for more sophisticated detection
          const configStr = JSON.stringify(config);
          return configStr.includes(value);
        },
      },
    };
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

  // // BLOB URLs (browser only)
  // get tokensBlobURL() {
  //   return this.#blobURLs?.tokens;
  // }
  // get primitivesBlobURL() {
  //   return this.#blobURLs?.primitives;
  // }
  // get componentsBlobURL() {
  //   return this.#blobURLs?.components;
  // }
  // get utilitiesBlobURL() {
  //   return this.#blobURLs?.utilities;
  // }
  // get stylesBlobURL() {
  //   return this.#blobURLs?.styles;
  // }

  /**
   * Generate CSS module files for export
   * Returns object with filename => content
   */
  getCSSModules() {
    return {
      "pds-tokens.css.js": this.#generateCSSModule(
        "tokens",
        this.#layers.tokens,
      ),
      "pds-primitives.css.js": this.#generateCSSModule(
        "primitives",
        this.#layers.primitives,
      ),
      "pds-components.css.js": this.#generateCSSModule(
        "components",
        this.#layers.components,
      ),
      "pds-utilities.css.js": this.#generateCSSModule(
        "utilities",
        this.#layers.utilities,
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
}

/**
 * Validate a design configuration for accessibility sanity checks.
 * Currently validates color contrast for primary buttons and base surface text
 * in both light and dark themes.
 *
 * @param {object} designConfig - A full or partial PDS config object
 * @param {object} [options]
 * @param {number} [options.minContrast=4.5] - Minimum contrast ratio for normal text
 * @returns {{ ok: boolean, issues: Array<{path:string, message:string, ratio:number, min:number, context?:string}> }}
 */
export function validateDesign(designConfig = {}, options = {}) {
  const MIN = Number(options.minContrast || 4.5);

  // Local helpers (keep public; no dependency on private Generator methods)
  const hexToRgb = (hex) => {
    const h = String(hex || "").replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const num = parseInt(full || "0", 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };
  const luminance = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const srgb = [r / 255, g / 255, b / 255].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const contrast = (a, b) => {
    if (!a || !b) return 0;
    const L1 = luminance(a);
    const L2 = luminance(b);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const issues = [];
  try {
    // Build tokens from the candidate config
    const gen = new Generator({ design: structuredClone(designConfig) });
    const c = gen.tokens.colors;

    // Light theme checks - use computed interactive tokens
    const light = {
      surfaceBg: c.surface?.base,
      surfaceText: c.gray?.[900] || "#000000",
      primaryFill: c.interactive?.light?.fill || c.primary?.[600],
      primaryText: c.interactive?.light?.text || c.primary?.[600],
    };

    // Primary button (light): check button fill with white text
    const lightBtnRatio = contrast(light.primaryFill, "#ffffff");
    if (lightBtnRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary button contrast too low in light theme (${lightBtnRatio.toFixed(
          2,
        )} < ${MIN}). Choose a darker primary.`,
        ratio: lightBtnRatio,
        min: MIN,
        context: "light/btn-primary",
      });
    }

    // Surface text (light): text vs surface base
    const lightTextRatio = contrast(light.surfaceBg, light.surfaceText);
    if (lightTextRatio < MIN) {
      issues.push({
        path: "/colors/background",
        message: `Base text contrast on surface (light) is too low (${lightTextRatio.toFixed(
          2,
        )} < ${MIN}). Adjust background or secondary (gray).`,
        ratio: lightTextRatio,
        min: MIN,
        context: "light/surface-text",
      });
    }

    // Primary text for outline/link: check link text on surface
    const lightOutlineRatio = contrast(light.primaryText, light.surfaceBg);
    if (lightOutlineRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary text on surface is too low for outline/link styles (light) (${lightOutlineRatio.toFixed(
          2,
        )} < ${MIN}). Choose a darker primary or lighter surface.`,
        ratio: lightOutlineRatio,
        min: MIN,
        context: "light/outline",
      });
    }

    // Dark theme checks - use computed interactive tokens
    const d = c.dark;
    if (d) {
      const dark = {
        surfaceBg: d.surface?.base || c.surface?.inverse,
        primaryFill: c.interactive?.dark?.fill || d.primary?.[600],
        primaryText: c.interactive?.dark?.text || d.primary?.[600],
      };

      // Primary button (dark): check button fill with white text
      const darkBtnRatio = contrast(dark.primaryFill, "#ffffff");
      if (darkBtnRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary button contrast too low in dark theme (${darkBtnRatio.toFixed(
            2,
          )} < ${MIN}). Override darkMode.primary or pick a brighter hue.`,
          ratio: darkBtnRatio,
          min: MIN,
          context: "dark/btn-primary",
        });
      }

      // Outline/link style in dark: check link text on dark surface
      const darkOutlineRatio = contrast(dark.primaryText, dark.surfaceBg);
      if (darkOutlineRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary text on surface is too low for outline/link styles (dark) (${darkOutlineRatio.toFixed(
            2,
          )} < ${MIN}). Override darkMode.primary/background.`,
          ratio: darkOutlineRatio,
          min: MIN,
          context: "dark/outline",
        });
      }
    }
  } catch (err) {
    issues.push({
      path: "/",
      message: `Validation failed: ${String(err?.message || err)}`,
      ratio: 0,
      min: 0,
    });
  }

  return { ok: issues.length === 0, issues };
}

/**
 * Validate multiple design configurations at once.
 * Useful for build-time enforcement of preset compliance.
 *
 * @param {Array<object>} designs - Array of design configs; items may include an optional `name` property.
 * @param {object} [options] - Options forwarded to validateDesign (e.g., { minContrast })
 * @returns {{ ok: boolean, results: Array<{ name?: string, ok: boolean, issues: Array<{path:string, message:string, ratio:number, min:number, context?:string}> }> }}
 */
export function validateDesigns(designs = [], options = {}) {
  const results = [];

  const list = Array.isArray(designs)
    ? designs
    : designs && typeof designs === "object"
      ? Object.values(designs)
      : [];

  for (const item of list) {
    let name;
    let configToValidate = null;

    // Accept a few shapes:
    // - string => treat as preset id/name
    // - { preset, design?, name? } => resolve preset then merge overrides
    // - full config object (legacy) => validate directly
    if (typeof item === "string") {
      const id = String(item).toLowerCase();
      const found =
        presets?.[id] ||
        Object.values(presets || {}).find(
          (p) =>
            __slugify(p.name) === id ||
            String(p.name || "").toLowerCase() === id,
        );
      if (!found) {
        results.push({
          name: item,
          ok: false,
          issues: [
            {
              path: "/",
              message: `Preset not found: ${item}`,
              ratio: 0,
              min: 0,
            },
          ],
        });
        continue;
      }
      name = found.name || id;
      configToValidate = structuredClone(found);
    } else if (item && typeof item === "object") {
      name = item.name || item.preset || undefined;
      if ("preset" in item || "design" in item) {
        const effectivePreset = String(item.preset || "default").toLowerCase();
        const found =
          presets?.[effectivePreset] ||
          Object.values(presets || {}).find(
            (p) =>
              __slugify(p.name) === effectivePreset ||
              String(p.name || "").toLowerCase() === effectivePreset,
          );
        if (!found) {
          results.push({
            name,
            ok: false,
            issues: [
              {
                path: "/",
                message: `Preset not found: ${item.preset}`,
                ratio: 0,
                min: 0,
              },
            ],
          });
          continue;
        }
        let base = structuredClone(found);
        if (item.design && typeof item.design === "object") {
          base = __deepMerge(base, structuredClone(item.design));
        }
        configToValidate = base;
      } else {
        // Assume a full config object
        configToValidate = item;
      }
    }

    if (!configToValidate) {
      results.push({
        name,
        ok: false,
        issues: [
          { path: "/", message: "Invalid design entry", ratio: 0, min: 0 },
        ],
      });
      continue;
    }

    const { ok, issues } = validateDesign(configToValidate, options);
    results.push({ name, ok, issues });
  }

  return { ok: results.every((r) => r.ok), results };
}

// Internal: deep merge utility (arrays replace; objects merge)
function __deepMerge(target = {}, source = {}) {
  if (!source || typeof source !== "object") return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = __deepMerge(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value,
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}

// Internal: create a slug for matching names like "Paper & Ink" -> "paper-and-ink"
function __slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

import { enums } from "./pds-enums.js";
import { ontology } from "./pds-ontology.js";
