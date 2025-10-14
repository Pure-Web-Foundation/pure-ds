/**
 * AutoDesigner - A JS-config-first design system
 * Generates comprehensive CSS variables and styles from a minimal configuration
 */
export class AutoDesigner {
  // Static enums for design system values
  static FontWeights = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  static LineHeights = {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  };

  static BorderWidths = {
    hairline: 0.5,
    thin: 1,
    medium: 2,
    thick: 3,
  };

  static RadiusSizes = {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
    full: 9999,
  };

  static ShadowDepths = {
    none: 'none',
    light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    deep: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    extreme: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  static TransitionSpeeds = {
    fast: 150,
    normal: 250,
    slow: 350,
  };

  static AnimationEasings = {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  };

  static TouchTargetSizes = {
    compact: 36,
    standard: 44,  // iOS/Android accessibility standard
    comfortable: 48,
    spacious: 56,
  };

  static LinkStyles = {
    inline: 'inline',        // Normal inline text links
    block: 'block',          // Block-level links
    button: 'button',        // Button-like links (flex with touch target)
  };

  static FocusStyles = {
    ring: 'ring',            // Box-shadow ring (default)
    outline: 'outline',      // Browser outline
    border: 'border',        // Border change
    glow: 'glow',           // Subtle glow effect
  };

  static TabSizes = {
    compact: 2,
    standard: 4,
    wide: 8,
  };

  static SelectIcons = {
    chevron: 'chevron',      // Standard chevron down
    arrow: 'arrow',          // Simple arrow
    caret: 'caret',          // Triangle caret
    none: 'none',            // No icon
  };

  constructor(options = {}) {
    this.options = {
      // All defaults should come from config, no hardcoded values
      debug: false,
      ...options,
    };

    if (this.options.debug) {
      console.log('AutoDesigner options:', this.options);
    }
    this.tokens = this.generateTokens();
    if (this.options.debug) {
      console.log('Generated tokens:', this.tokens);
    }
    this.css = this.generateCSS();
    if (this.options.debug) {
      console.log('Generated CSS length:', this.css.length);
      console.log('CSS preview:', this.css.substring(0, 500));
    }
  }

  generateTokens() {
    const config = this.options;

    return {
      colors: this.generateColorTokens(config.colors || {}),
      spacing: this.generateSpacingTokens(config.spatialRhythm || {}),
      radius: this.generateRadiusTokens(config.shape || {}),
      typography: this.generateTypographyTokens(config.typography || {}),
      shadows: this.generateShadowTokens(config.layers || {}),
      layout: this.generateLayoutTokens(config.layout || {}),
      transitions: this.generateTransitionTokens(config.behavior || {}),
      zIndex: this.generateZIndexTokens(config.layers || {}),
    };
  }

  generateColorTokens(colorConfig) {
    const {
      primary = "#3b82f6",
      secondary = "#64748b", 
      accent = "#ec4899",
      background = "#ffffff",
      success = null,
      warning = null,
      danger = null,
      info = null,
    } = colorConfig;

    const colors = {
      // Generate color scales
      primary: this.generateColorScale(primary),
      secondary: this.generateColorScale(secondary),
      accent: this.generateColorScale(accent),

      // Semantic colors - use provided or derive from primary/accent
      success: this.generateColorScale(success || this.deriveSuccessColor(primary)),
      warning: this.generateColorScale(warning || accent),
      danger: this.generateColorScale(danger || this.deriveDangerColor(primary)),
      info: this.generateColorScale(info || primary),

      // Neutral grays derived from secondary color
      gray: this.generateGrayScale(secondary),

      // Background-based surface colors for tasteful variations
      surface: this.generateBackgroundShades(background),
    };

    // Add adaptive fieldset colors to surface
    colors.surface.fieldset = this.generateFieldsetAdaptiveColors(colors.surface);

    // Generate dark mode variants (with optional overrides)
    const darkModeOverrides = this.options.colors?.darkMode || {};
    colors.dark = this.generateDarkModeColors(colors, background, darkModeOverrides);

    return colors;
  }

  generateColorScale(baseColor) {
    const hsl = this.hexToHsl(baseColor);
    return {
      50: this.hslToHex(
        hsl.h,
        Math.max(hsl.s - 10, 10),
        Math.min(hsl.l + 45, 95)
      ),
      100: this.hslToHex(
        hsl.h,
        Math.max(hsl.s - 5, 15),
        Math.min(hsl.l + 35, 90)
      ),
      200: this.hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 25, 85)),
      300: this.hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 75)),
      400: this.hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 5, 65)),
      500: baseColor, // Base color
      600: this.hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 10, 25)),
      700: this.hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 20)),
      800: this.hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 15)),
      900: this.hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 40, 10)),
    };
  }

  deriveSuccessColor(mainColor) {
    // Generate a green success color by rotating the hue of the main color
    const hsl = this.hexToHsl(mainColor);
    return this.hslToHex(120, Math.max(hsl.s, 60), 45); // Green-ish success
  }

  deriveDangerColor(mainColor) {
    // Generate a red danger color by rotating the hue of the main color
    const hsl = this.hexToHsl(mainColor);
    return this.hslToHex(0, Math.max(hsl.s, 70), 50); // Red-ish danger
  }

  generateGrayScale(supportingColor) {
    // Generate gray scale based on supporting color for brand consistency
    const hsl = this.hexToHsl(supportingColor);
    const baseHue = hsl.h;
    const baseSat = Math.min(hsl.s, 10); // Keep it subtle
    
    return {
      50: this.hslToHex(baseHue, baseSat, 98),
      100: this.hslToHex(baseHue, baseSat, 95),
      200: this.hslToHex(baseHue, baseSat, 88),
      300: this.hslToHex(baseHue, baseSat, 78),
      400: this.hslToHex(baseHue, baseSat, 60),
      500: supportingColor, // Use the actual supporting color
      600: this.hslToHex(baseHue, Math.min(baseSat + 5, 15), 45),
      700: this.hslToHex(baseHue, Math.min(baseSat + 8, 18), 35),
      800: this.hslToHex(baseHue, Math.min(baseSat + 10, 20), 20),
      900: this.hslToHex(baseHue, Math.min(baseSat + 12, 22), 10),
    };
  }

  generateBackgroundShades(backgroundBase) {
    const hsl = this.hexToHsl(backgroundBase);
    
    // Generate subtle variations of the background
    return {
      base: backgroundBase,
      subtle: this.hslToHex(hsl.h, Math.max(hsl.s, 2), Math.max(hsl.l - 2, 2)), // Very subtle darker
      elevated: this.hslToHex(hsl.h, Math.max(hsl.s, 3), Math.max(hsl.l - 4, 5)), // Slightly darker for elevated surfaces
      sunken: this.hslToHex(hsl.h, Math.max(hsl.s, 4), Math.max(hsl.l - 6, 8)), // For input fields, subtle depth
      overlay: this.hslToHex(hsl.h, Math.max(hsl.s, 2), Math.min(hsl.l + 2, 98)), // Slightly lighter for overlays
      inverse: this.generateSmartDarkBackground(backgroundBase), // Smart dark background
    };
  }

  generateFieldsetAdaptiveColors(backgroundShades) {
    // Generate fieldset backgrounds that are subtly different from each surface
    return {
      onBase: backgroundShades.subtle, // Subtle darker than base
      onSubtle: backgroundShades.elevated, // Elevated from subtle
      onElevated: backgroundShades.sunken, // Sunken from elevated (creates contrast)
      onSunken: this.darkenColor(backgroundShades.sunken, 0.05), // Slightly darker than sunken
      onOverlay: backgroundShades.elevated, // Elevated from overlay
    };
  }

  darkenColor(hexColor, factor = 0.05) {
    const hsl = this.hexToHsl(hexColor);
    const darkerLightness = Math.max(hsl.l - (hsl.l * factor), 5);
    return this.hslToHex(hsl.h, hsl.s, darkerLightness);
  }

  generateSmartDarkBackground(lightBackground) {
    const hsl = this.hexToHsl(lightBackground);
    
    // If it's already a light color, create a smart dark version
    if (hsl.l > 50) {
      // Keep the same hue and saturation characteristics but make it dark
      // Increase saturation slightly for richness in dark mode
      const darkSaturation = Math.min(hsl.s + 5, 25);
      const darkLightness = Math.max(12 - (hsl.l - 50) * 0.1, 8); // Darker for lighter source colors
      
      return this.hslToHex(hsl.h, darkSaturation, darkLightness);
    } else {
      // If the source is already dark, create a lighter version
      const lightSaturation = Math.max(hsl.s - 10, 5);
      const lightLightness = Math.min(85 + (50 - hsl.l) * 0.3, 95);
      
      return this.hslToHex(hsl.h, lightSaturation, lightLightness);
    }
  }

  generateDarkModeColors(lightColors, backgroundBase = "#ffffff", overrides = {}) {
    // Use custom dark background if provided, otherwise auto-generate
    const darkBackgroundBase = overrides.background 
      ? overrides.background 
      : this.generateSmartDarkBackground(backgroundBase);
    
    const darkSurface = this.generateBackgroundShades(darkBackgroundBase);
    
    return {
      surface: {
        ...darkSurface,
        fieldset: this.generateDarkModeFieldsetColors(darkSurface),
      },
      // For primary colors, use override, or adjust light colors for dark mode (dimmed for accessibility)
      primary: overrides.primary 
        ? this.generateColorScale(overrides.primary) 
        : this.adjustColorsForDarkMode(lightColors.primary),
      // Adjust other colors for dark mode, with optional overrides
      secondary: overrides.secondary 
        ? this.generateColorScale(overrides.secondary) 
        : this.adjustColorsForDarkMode(lightColors.secondary),
      accent: overrides.accent 
        ? this.generateColorScale(overrides.accent) 
        : this.adjustColorsForDarkMode(lightColors.accent),
      // Regenerate grays if secondary override is provided (grays are derived from secondary)
      gray: overrides.secondary 
        ? this.generateGrayScale(overrides.secondary) 
        : lightColors.gray,
      // IMPORTANT: Also adjust semantic colors for dark mode!
      success: this.adjustColorsForDarkMode(lightColors.success),
      info: this.adjustColorsForDarkMode(lightColors.info),
      warning: this.adjustColorsForDarkMode(lightColors.warning),
      danger: this.adjustColorsForDarkMode(lightColors.danger),
    };
  }

  generateDarkModeFieldsetColors(darkSurface) {
    // In dark mode, fieldsets should be slightly lighter for contrast
    return {
      onBase: darkSurface.elevated, // Elevated from dark base
      onSubtle: darkSurface.overlay, // Overlay from dark subtle
      onElevated: this.lightenColor(darkSurface.elevated, 0.08), // Slightly lighter than elevated
      onSunken: darkSurface.elevated, // Elevated from sunken
      onOverlay: this.lightenColor(darkSurface.overlay, 0.05), // Slightly lighter than overlay
    };
  }

  lightenColor(hexColor, factor = 0.05) {
    const hsl = this.hexToHsl(hexColor);
    const lighterLightness = Math.min(hsl.l + (100 - hsl.l) * factor, 95);
    return this.hslToHex(hsl.h, hsl.s, lighterLightness);
  }

  adjustColorsForDarkMode(colorScale) {
    // Create dimmed and inverted colors for dark mode
    const dimmedScale = {};
    
    // Invert the scale and apply dimming for better dark mode appearance
    // For accessibility, mid-range colors (used for buttons/interactive elements) are more heavily dimmed
    const mapping = {
      50: { source: '900', dimFactor: 0.8 },
      100: { source: '800', dimFactor: 0.8 },
      200: { source: '700', dimFactor: 0.8 },   // Increased dimming
      300: { source: '600', dimFactor: 0.8 },   // Increased dimming
      400: { source: '500', dimFactor: 0.85 },  // Increased dimming
      500: { source: '400', dimFactor: 0.85 },  // Increased dimming
      600: { source: '300', dimFactor: 0.85 },  // Increased dimming (buttons use this!)
      700: { source: '200', dimFactor: 0.85 },  // Increased dimming (button hover)
      800: { source: '100', dimFactor: 0.95 },  // Less dimming for text
      900: { source: '50', dimFactor: 0.95 },   // Less dimming for text
    };
    
    Object.entries(mapping).forEach(([key, config]) => {
      const sourceColor = colorScale[config.source];
      dimmedScale[key] = this.dimColorForDarkMode(sourceColor, config.dimFactor);
    });
    
    return dimmedScale;
  }

  dimColorForDarkMode(hexColor, dimFactor = 0.8) {
    const hsl = this.hexToHsl(hexColor);
    
    // Reduce saturation and lightness for dark mode, similar to image dimming
    const dimmedSaturation = Math.max(hsl.s * dimFactor, 5);
    const dimmedLightness = Math.max(hsl.l * dimFactor, 5);
    
    return this.hslToHex(hsl.h, dimmedSaturation, dimmedLightness);
  }

  generateSpacingTokens(spatialConfig) {
    const {
      baseUnit = 16,
      scaleRatio = 1.25,
      maxSpacingSteps = 32
    } = spatialConfig;

    const spacing = { 0: "0" };
    
    // Generate standard spacing scale
    const standardSteps = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8];
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

  generateRadiusTokens(shapeConfig) {
    const {
      radiusSize = 'medium',
      customRadius = null,
    } = shapeConfig;

    // Use custom radius if provided, otherwise use the enum
    const baseRadius = customRadius !== null ? customRadius : AutoDesigner.RadiusSizes[radiusSize] || AutoDesigner.RadiusSizes.medium;

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
      fontFamily = 'system-ui, -apple-system, sans-serif',
      monoFontFamily = 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      baseFontSize = 16,
      fontScale = 1.2,
      fontWeightLight = AutoDesigner.FontWeights.light,
      fontWeightNormal = AutoDesigner.FontWeights.normal,
      fontWeightMedium = AutoDesigner.FontWeights.medium,
      fontWeightSemibold = AutoDesigner.FontWeights.semibold,
      fontWeightBold = AutoDesigner.FontWeights.bold,
      lineHeightTight = AutoDesigner.LineHeights.tight,
      lineHeightNormal = AutoDesigner.LineHeights.normal,
      lineHeightRelaxed = AutoDesigner.LineHeights.relaxed
    } = typographyConfig;
    
    return {
      fontFamily: {
        sans: fontFamily,
        mono: monoFontFamily,
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

  generateShadowTokens(layersConfig) {
    const {
      baseShadowOpacity = 0.1,
      shadowBlurMultiplier = 1,
      shadowOffsetMultiplier = 1
    } = layersConfig;

    const shadowColor = `rgba(0, 0, 0, ${baseShadowOpacity})`;
    const lightShadowColor = `rgba(0, 0, 0, ${baseShadowOpacity * 0.5})`;

    return {
      sm: `0 ${1 * shadowOffsetMultiplier}px ${2 * shadowBlurMultiplier}px 0 ${lightShadowColor}`,
      base: `0 ${1 * shadowOffsetMultiplier}px ${3 * shadowBlurMultiplier}px 0 ${shadowColor}, 0 ${1 * shadowOffsetMultiplier}px ${2 * shadowBlurMultiplier}px 0 ${lightShadowColor}`,
      md: `0 ${4 * shadowOffsetMultiplier}px ${6 * shadowBlurMultiplier}px ${-1 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${2 * shadowOffsetMultiplier}px ${4 * shadowBlurMultiplier}px ${-1 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      lg: `0 ${10 * shadowOffsetMultiplier}px ${15 * shadowBlurMultiplier}px ${-3 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${4 * shadowOffsetMultiplier}px ${6 * shadowBlurMultiplier}px ${-2 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      xl: `0 ${20 * shadowOffsetMultiplier}px ${25 * shadowBlurMultiplier}px ${-5 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${10 * shadowOffsetMultiplier}px ${10 * shadowBlurMultiplier}px ${-5 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      inner: `inset 0 ${2 * shadowOffsetMultiplier}px ${4 * shadowBlurMultiplier}px 0 ${lightShadowColor}`,
    };
  }

  generateLayoutTokens(layoutConfig) {
    const {
      maxWidth = 1200,
      containerPadding = 16,
      breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
      }
    } = layoutConfig;

    return {
      maxWidth: `${maxWidth}px`,
      minHeight: "100vh",
      containerPadding: `${containerPadding}px`,
      breakpoints: {
        sm: `${breakpoints.sm}px`,
        md: `${breakpoints.md}px`, 
        lg: `${breakpoints.lg}px`,
        xl: `${breakpoints.xl}px`,
      }
    };
  }

  generateTransitionTokens(behaviorConfig) {
    const { 
      transitionSpeed = AutoDesigner.TransitionSpeeds.NORMAL,
      animationEasing = AutoDesigner.AnimationEasings.EASE_OUT
    } = behaviorConfig;
    
    const baseSpeed = transitionSpeed;
    
    // Transition variables should only contain duration, not easing
    // This allows specific easing functions to be applied per property
    return {
      fast: `${Math.round(baseSpeed * 0.6)}ms`,
      normal: `${baseSpeed}ms`,
      slow: `${Math.round(baseSpeed * 1.4)}ms`,
    };
  }

  generateZIndexTokens(layersConfig) {
    const {
      baseZIndex = 1000,
      zIndexStep = 10
    } = layersConfig;

    return {
      dropdown: (baseZIndex).toString(),
      sticky: (baseZIndex + zIndexStep * 2).toString(),
      fixed: (baseZIndex + zIndexStep * 3).toString(),
      modal: (baseZIndex + zIndexStep * 4).toString(),
      popover: (baseZIndex + zIndexStep * 5).toString(),
      tooltip: (baseZIndex + zIndexStep * 6).toString(),
      notification: (baseZIndex + zIndexStep * 7).toString(),
    };
  }

  generateCSS() {
    const {
      colors,
      spacing,
      radius,
      typography,
      shadows,
      layout,
      transitions,
      zIndex,
    } = this.tokens;

    const { components = {} } = this.options;

    if (this.options.debug) {
      console.log('Components config:', components);
      console.log('toasts enabled:', components.toasts !== false);
    }

    let css = ":root {\n";

    // Color variables
    css += this.generateColorVariables(colors);

    // Spacing variables
    css += this.generateSpacingVariables(spacing);

    // Border radius variables
    css += this.generateRadiusVariables(radius);

    // Typography variables
    css += this.generateTypographyVariables(typography);

    // Shadow variables
    css += this.generateShadowVariables(shadows);

    // Layout variables
    css += this.generateLayoutVariables(layout);

    // Transition variables
    css += this.generateTransitionVariables(transitions);

    // Z-index variables
    css += this.generateZIndexVariables(zIndex);

    css += "}\n\n";

    // Dark mode
    css += this.generateDarkModeCSS(colors);

    // Base styles
    css += this.generateBaseStyles();

    // Semantic HTML elements
    css += this.generateSemanticHTMLStyles();

    // Form styles
    css += this.generateFormStyles();

    // Optional component styles (based on config)
    if (components.tables !== false) {
      css += this.generateTableStyles();
    }

    if (components.alerts !== false) {
      css += this.generateAlertStyles();
    }

    if (components.toasts !== false) {
      const toastCSS = this.generateToastStyles();
      if (this.options.debug) {
        console.log('Toast CSS length:', toastCSS.length);
        console.log('Toast CSS preview:', toastCSS.substring(0, 100));
      }
      css += toastCSS;
    }

    if (components.badges !== false) {
      css += this.generateBadgeStyles();
    }

    if (components.modals !== false) {
      css += this.generateModalStyles();
    }

    // Layout utilities
    css += this.generateLayoutUtilities();

    // Media utilities
    css += this.generateMediaUtilities();

    // Media queries
    css += this.generateMediaQueries();

    return css;
  }

  generateColorVariables(colors) {
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

    return css + "\n";
  }

  generateSpacingVariables(spacing) {
    let css = "  /* Spacing */\n";
    Object.entries(spacing).forEach(([key, value]) => {
      css += `  --spacing-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateRadiusVariables(radius) {
    let css = "  /* Border Radius */\n";
    Object.entries(radius).forEach(([key, value]) => {
      css += `  --radius-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateTypographyVariables(typography) {
    let css = "  /* Typography */\n";
    Object.entries(typography).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        css += `  --font-${category}-${key}: ${value};\n`;
      });
    });
    return css + "\n";
  }

  generateShadowVariables(shadows) {
    let css = "  /* Shadows */\n";
    Object.entries(shadows).forEach(([key, value]) => {
      css += `  --shadow-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateLayoutVariables(layout) {
    let css = "  /* Layout */\n";
    Object.entries(layout).forEach(([key, value]) => {
      css += `  --layout-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateTransitionVariables(transitions) {
    let css = "  /* Transitions */\n";
    Object.entries(transitions).forEach(([key, value]) => {
      css += `  --transition-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateZIndexVariables(zIndex) {
    let css = "  /* Z-Index */\n";
    Object.entries(zIndex).forEach(([key, value]) => {
      css += `  --z-${key}: ${value};\n`;
    });
    return css + "\n";
  }

  generateDarkModeCSS(colors) {
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
    css += `    --color-text-primary: var(--color-gray-100);
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

  generateBaseStyles() {
    const { advanced = {}, a11y = {}, layout = {} } = this.options;
    const tabSize = advanced.tabSize || AutoDesigner.TabSizes.standard;
    const linkStyle = advanced.linkStyle || AutoDesigner.LinkStyles.inline;
    const minTouchTarget = a11y.minTouchTarget || AutoDesigner.TouchTargetSizes.standard;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };

    // Link styles based on configuration
    const linkDisplayStyles = linkStyle === AutoDesigner.LinkStyles.button 
      ? `display: inline-flex;
  align-items: center;
  min-height: ${minTouchTarget}px;`
      : linkStyle === AutoDesigner.LinkStyles.block
      ? `display: block;`
      : `display: inline;`;

    return /*css*/ `/* Mobile-First Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-fontFamily-sans);
  font-size: var(--font-fontSize-base);
  line-height: var(--font-lineHeight-normal);
  color: var(--color-text-primary);
  background-color: var(--color-surface-base);
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  tab-size: ${tabSize};
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: var(--layout-minHeight);
  overflow-x: hidden; /* Prevent horizontal scroll on mobile */
}

/* Mobile-first Typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--spacing-4) 0;
  font-weight: var(--font-fontWeight-semibold);
  line-height: var(--font-lineHeight-tight);
  word-wrap: break-word;
  hyphens: auto;
}

/* Mobile font sizes (smaller) */
h1 { font-size: var(--font-fontSize-2xl); }
h2 { font-size: var(--font-fontSize-xl); }
h3 { font-size: var(--font-fontSize-lg); }
h4 { font-size: var(--font-fontSize-base); }
h5 { font-size: var(--font-fontSize-sm); }
h6 { font-size: var(--font-fontSize-xs); }

/* Scale up typography on larger screens */
@media (min-width: ${breakpoints.sm}px) {
  h1 { font-size: var(--font-fontSize-3xl); }
  h2 { font-size: var(--font-fontSize-2xl); }
  h3 { font-size: var(--font-fontSize-xl); }
  h4 { font-size: var(--font-fontSize-lg); }
  h5 { font-size: var(--font-fontSize-base); }
  h6 { font-size: var(--font-fontSize-sm); }
}

p {
  margin: 0 0 var(--spacing-4) 0;
  word-wrap: break-word;
}

/* Mobile-optimized Links */
a {
  color: var(--color-primary-600);
  text-decoration: underline;
  transition: color var(--transition-fast);
  touch-action: manipulation;
  ${linkDisplayStyles}
}

a:hover {
  color: var(--color-primary-700);
}

a:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Button-style links get special treatment */
a.btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${minTouchTarget}px;
  text-decoration: none;
}

/* Mobile-optimized Lists */
ul, ol {
  margin: 0 0 var(--spacing-4) 0;
  padding-left: var(--spacing-6);
}

li {
  margin-bottom: var(--spacing-1);
}

/* Code */
code, pre {
  font-family: var(--font-fontFamily-mono);
  font-size: var(--font-fontSize-sm);
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
}

/* Media Elements */
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
  font-size: var(--font-fontSize-sm);
  color: var(--color-text-secondary);
  text-align: left;
  line-height: var(--font-lineHeight-relaxed);
  padding: 0 var(--spacing-2);
}

@media (min-width: ${breakpoints.sm}px) {
  figcaption {
    font-size: var(--font-fontSize-base);
  }
}

`;
  }

  generateSemanticHTMLStyles() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };

    return /*css*/`/* Semantic HTML Elements */

/* Blockquote */
blockquote {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
}

blockquote p:last-child {
  margin-bottom: 0;
}

blockquote cite {
  display: block;
  margin-top: var(--spacing-2);
  font-size: var(--font-fontSize-sm);
  font-style: normal;
  color: var(--color-text-tertiary);
}

blockquote cite::before {
  content: "— ";
}

/* Horizontal Rule */
hr {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

/* Definition Lists */
dl {
  margin: 0 0 var(--spacing-4) 0;
}

dt {
  font-weight: var(--font-fontWeight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
}

dt:first-child {
  margin-top: 0;
}

dd {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

/* Semantic Containers */
nav {
  display: block;
}

header, footer {
  display: block;
  width: 100%;
}

article, section, aside {
  display: block;
  margin-bottom: var(--spacing-6);
}

article > *:last-child,
section > *:last-child {
  margin-bottom: 0;
}

/* Text Semantics */
mark {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

kbd {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-fontFamily-mono);
  font-size: var(--font-fontSize-sm);
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

/* Details/Summary (Accordion) */
details {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
}

summary {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  font-weight: var(--font-fontWeight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "›";
  display: inline-block;
  transform: rotate(90deg);
  transition: transform var(--transition-fast);
  font-size: var(--font-fontSize-xl);
  font-weight: var(--font-fontWeight-bold);
  color: var(--color-text-secondary);
}

details[open] summary::after {
  transform: rotate(270deg);
}

summary:hover {
  background-color: var(--color-surface-subtle);
}

details[open] summary {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface-subtle);
}

details > *:not(summary) {
  padding: var(--spacing-4);
}

`;
  }

  generateFormStyles() {
    const { 
      gap, 
      inputPadding, 
      buttonPadding, 
      focusRingWidth, 
      focusRingOpacity,
      borderWidthThin,
      sectionSpacing,
      buttonMinHeight,
      inputMinHeight
    } = this.options;
    
    const inputPaddingValue = inputPadding || 0.75;
    const buttonPaddingValue = buttonPadding || 1.0;
    const focusWidth = focusRingWidth || 3;
    const focusOpacity = Math.round((focusRingOpacity || 0.3) * 255).toString(16).padStart(2, '0');
    const borderWidth = borderWidthThin || 1;
    const sectionSpacingValue = sectionSpacing || 2.0;
    const minButtonHeight = buttonMinHeight || 44;
    const minInputHeight = inputMinHeight || 40;
    
    return /*css*/`/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

/* Form sections and fieldsets */
fieldset {
  margin: 0 0 var(--spacing-${Math.round(gap * sectionSpacingValue / 4)}) 0;
  padding: var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  width: 100%;
  background-color: var(--color-surface-subtle);
}

fieldset[role="radiogroup"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: transparent;
}

legend {
  font-weight: var(--font-fontWeight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
  border: none;
  line-height: var(--font-lineHeight-tight);
  padding: 0 var(--spacing-2);
  font-size: var(--font-fontSize-base);
}

/* Form layout utilities */
.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

/* Labels and form text */
label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-fontWeight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-fontSize-sm);
  line-height: var(--font-lineHeight-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-fontWeight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-fontSize-sm);
  margin-bottom: var(--spacing-2);
}

.field-description {
  font-size: var(--font-fontSize-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-lineHeight-relaxed);
}

/* Base input styling */
input, textarea, select {
  width: 100%;
  min-height: ${minInputHeight}px;
  padding: calc(var(--spacing-1) * ${inputPaddingValue}) var(--spacing-4);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-fontFamily-sans);
  font-size: var(--font-fontSize-base);
  line-height: var(--font-lineHeight-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
}

/* Focus states */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
  background-color: var(--color-surface-base);
}

/* Disabled states */
input:disabled, textarea:disabled, select:disabled {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Invalid states */
input:invalid, textarea:invalid, select:invalid {
  border-color: var(--color-danger-500);
}

input:invalid:focus, textarea:invalid:focus, select:invalid:focus {
  box-shadow: 0 0 0 ${focusWidth}px var(--color-danger-500)${focusOpacity};
}

/* Specific input types */
input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
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
label:has(input[type="checkbox"]):not(fieldset[role="group"] label),
input[type="radio"] + label,
input[type="checkbox"] + label:not(fieldset[role="group"] label) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${minButtonHeight}px;
  padding: calc(var(--spacing-1) * ${buttonPaddingValue}) var(--spacing-4);
  border: ${borderWidth}px solid var(--color-primary-600);
  border-radius: var(--radius-md);
  font-family: var(--font-fontFamily-sans);
  font-size: var(--font-fontSize-base);
  font-weight: var(--font-fontWeight-medium);
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
  padding: calc(var(--spacing-1) * ${buttonPaddingValue * 0.5}) calc(var(--spacing-4) * 0.75);
  min-height: calc(${minButtonHeight}px * 0.85);
}
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Hover states */
fieldset[role="radiogroup"] label:hover,
label:has(input[type="radio"]:not(:disabled)):hover,
label:has(input[type="checkbox"]:not(:disabled)):hover:not(fieldset[role="group"] label),
input[type="radio"]:not(:disabled) + label:hover,
input[type="checkbox"]:not(:disabled) + label:hover:not(fieldset[role="group"] label) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-700);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label) {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label) {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label) {
  outline: none;
  box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
}

/* Disabled states */
label:has(input[type="radio"]:disabled),
label:has(input[type="checkbox"]:disabled):not(fieldset[role="group"] label),
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled + label:not(fieldset[role="group"] label) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="radio"]:checked:disabled),
label:has(input[type="checkbox"]:checked:disabled):not(fieldset[role="group"] label),
input[type="radio"]:checked:disabled + label,
input[type="checkbox"]:checked:disabled + label:not(fieldset[role="group"] label) {
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
  font-weight: var(--font-fontWeight-normal);
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
  align-items: center;
  justify-content: center;
  min-height: ${minButtonHeight}px;
  padding: calc(var(--spacing-1) * ${buttonPaddingValue}) var(--spacing-6);
  border: ${borderWidth}px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-fontFamily-sans);
  font-size: var(--font-fontSize-base);
  font-weight: var(--font-fontWeight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  width: 100%;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

button:hover, .btn:hover, input[type="submit"]:hover, input[type="button"]:hover {
  background-color: var(--color-surface-elevated);
}

button:focus, .btn:focus, input[type="submit"]:focus, input[type="button"]:focus {
  outline: none;
  box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
}

button:disabled, .btn:disabled, input[type="submit"]:disabled, input[type="button"]:disabled {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-input-disabled-bg);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Button variants */
.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
}

.btn-primary:focus {
  box-shadow: 0 0 0 ${focusWidth}px var(--color-primary-500)${focusOpacity};
}

.btn-primary:disabled {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-input-disabled-bg);
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-surface-elevated);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.btn-outline:hover {
  background-color: var(--color-primary-600);
  color: white;
}

/* Button sizes */
.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-fontSize-sm);
  min-height: calc(${minButtonHeight}px * 0.8);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-fontSize-lg);
  min-height: calc(${minButtonHeight}px * 1.2);
}

/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

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
  font-size: var(--font-fontSize-sm);
  min-height: auto;
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-fontWeight-medium);
  font-size: var(--font-fontSize-sm);
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
  
  .actions button {
    width: 100%;
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
  font-size: var(--font-fontSize-lg);
  font-weight: var(--font-fontWeight-semibold);
  color: var(--color-text-primary);
  line-height: var(--font-lineHeight-tight);
}

.category-description {
  font-size: var(--font-fontSize-sm);
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
  font-size: var(--font-fontSize-base);
  font-weight: var(--font-fontWeight-semibold);
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
  font-weight: var(--font-fontWeight-medium);
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

/* Dialog/Modal Styles for Auto-Form */
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
  font-size: var(--font-fontSize-2xl);
  font-weight: var(--font-fontWeight-bold);
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
    font-size: var(--font-fontSize-xl);
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
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-sm);
    border: none;
    font-weight: var(--font-fontWeight-semibold);
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

  generateTableStyles() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };

    return /*css*/`/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-fontSize-sm);
}

/* Mobile: Stack table or horizontal scroll */
@media (max-width: ${breakpoints.sm - 1}px) {
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
  }
  
  .table-responsive table {
    min-width: 600px;
    margin: 0;
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-fontWeight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody tr {
  transition: background-color var(--transition-fast);
}

tbody tr:hover {
  background-color: var(--color-surface-subtle);
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Table variants */
.table-striped tbody tr:nth-child(even) {
  background-color: var(--color-surface-subtle);
}

.table-bordered {
  border: 1px solid var(--color-border);
}

.table-bordered th,
.table-bordered td {
  border: 1px solid var(--color-border);
}

.table-compact th,
.table-compact td {
  padding: var(--spacing-2) var(--spacing-3);
}

@media (min-width: ${breakpoints.sm}px) {
  table {
    font-size: var(--font-fontSize-base);
  }
}

`;
  }

  generateAlertStyles() {
    return /*css*/`/* Alert/Notification Styles */

.alert {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-fontSize-sm);
  line-height: var(--font-lineHeight-relaxed);
}

.alert > *:last-child {
  margin-bottom: 0;
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
  font-weight: var(--font-fontWeight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-fontSize-base);
}

.alert-icon {
  flex-shrink: 0;
  width: var(--spacing-6);
  height: var(--spacing-6);
  margin-top: 2px;
  font-size: var(--font-fontSize-xl);
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: var(--font-fontSize-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
}

.alert-close:hover {
  opacity: 1;
}

`;
  }

  generateToastStyles() {
    return /*css*/`/* Toast Notification Styles - Updated */

/* Toast container positioning */
app-toaster {
  position: fixed;
  top: var(--spacing-4);
  right: var(--spacing-4);
  z-index: var(--z-notification);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  pointer-events: none;
  max-width: 400px;
}

/* Toast animations and transitions */
app-toaster aside.toast {
  transform: translateX(100%);
  opacity: 0;
  margin-bottom: var(--spacing-3);
  position: relative;
  pointer-events: auto;
  max-height: 200px;
  overflow: hidden;
}

/* Apply transition to both states for bidirectional animation */
app-toaster aside.toast,
app-toaster aside.toast.show {
  transition: transform var(--transition-normal) cubic-bezier(0.175, 0.885, 0.32, 1.275),
              opacity var(--transition-normal) ease-out,
              margin-bottom var(--transition-normal) ease-out,
              max-height var(--transition-normal) ease-out;
}

app-toaster aside.toast.show {
  transform: translateX(0);
  opacity: 1;
}

/* Toast progress bar */
app-toaster aside.toast .toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  opacity: 0.7;
  transition: width linear;
}

app-toaster aside.toast.alert-info .toast-progress { 
  background: var(--color-info-600);
}

app-toaster aside.toast.alert-success .toast-progress { 
  background: var(--color-success-600);
}

app-toaster aside.toast.alert-warning .toast-progress { 
  background: var(--color-warning-600);
}

app-toaster aside.toast.alert-danger .toast-progress,
app-toaster aside.toast.alert-error .toast-progress { 
  background: var(--color-danger-600);
}

/* Toast shrink animation */
@keyframes toast-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

/* Mobile responsive toast positioning */
@media (max-width: 640px) {
  app-toaster {
    top: auto;
    bottom: var(--spacing-4);
    left: var(--spacing-4);
    right: var(--spacing-4);
    max-width: none;
  }

  app-toaster aside.toast {
    transform: translateY(100%);
  }

  app-toaster aside.toast.show {
    transform: translateY(0);
  }
}

`;
  }

  generateBadgeStyles() {
    return /*css*/`/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-fontSize-xs);
  font-weight: var(--font-fontWeight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
}

/* Default badge */
.badge {
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
}

/* Badge variants */
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

/* Outlined badges */
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

/* Badge sizes */
.badge-sm {
  padding: 2px var(--spacing-1);
  font-size: 10px;
}

.badge-lg {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-fontSize-sm);
}

/* Pill variant (more padding, fully rounded) */
.pill {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
}

`;
  }

  generateModalStyles() {
    const { layout = {}, a11y = {} } = this.options;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };
    
    return /*css*/`/* Modal/Dialog Styles */

.modal {
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
}

.modal[open],
.modal.is-open {
  display: flex;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: -1;
  animation: fadeIn var(--transition-fast);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: var(--font-fontSize-xl);
  font-weight: var(--font-fontWeight-semibold);
  margin: 0;
  color: var(--color-text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-fontSize-2xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-2);
  transition: opacity var(--transition-fast);
  border-radius: var(--radius-sm);
}

.modal-close:hover {
  opacity: 1;
  background-color: var(--color-surface-subtle);
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

/* Mobile: Full screen modal */
@media (max-width: ${breakpoints.sm - 1}px) {
  .modal {
    padding: 0;
  }
  
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

/* Modal sizes */
.modal-sm .modal-content {
  max-width: 400px;
}

.modal-lg .modal-content {
  max-width: 800px;
}

.modal-xl .modal-content {
  max-width: 1200px;
}

@media (min-width: ${breakpoints.md}px) {
  .modal-fullscreen .modal-content {
    max-width: 90vw;
    max-height: 90vh;
  }
}

`;
  }

  generateLayoutUtilities() {
    const { layout = {} } = this.options;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };

    return /*css*/`/* Mobile-First Layout Utilities */
.container {
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4); /* Mobile padding */
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

.text-sm { font-size: var(--font-fontSize-sm); }
.text-base { font-size: var(--font-fontSize-base); }
.text-lg { font-size: var(--font-fontSize-lg); }

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

  generateMediaUtilities() {
    return /*css*/`/* Media Element Utilities */

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

  generateMediaQueries() {
    const { layout = {}, a11y = {} } = this.options;
    const breakpoints = layout.breakpoints || { sm: 640, md: 768, lg: 1024, xl: 1280 };
    const minTouchTarget = a11y.minTouchTarget || AutoDesigner.TouchTargetSizes.standard;

    return /*css*/`/* Mobile-First Responsive Design */

/* Small devices (${breakpoints.sm}px and up) */
@media (min-width: ${breakpoints.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:text-sm { font-size: var(--font-fontSize-sm); }
  .sm\\:p-6 { padding: var(--spacing-6); }
  .sm\\:gap-6 { gap: var(--spacing-6); }
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
}

/* Medium devices (${breakpoints.md}px and up) */
@media (min-width: ${breakpoints.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\\:text-lg { font-size: var(--font-fontSize-lg); }
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
  .lg\\:text-xl { font-size: var(--font-fontSize-xl); }
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

  // Static utility method for applying styles to document
  // The host application decides when/how to apply styles
  static applyStyles(css, elementId = "auto-designer-styles") {
    // Remove existing design system styles
    const existingLink = document.getElementById(elementId);
    if (existingLink) {
      // Revoke the old blob URL to free memory
      if (existingLink.href && existingLink.href.startsWith('blob:')) {
        URL.revokeObjectURL(existingLink.href);
      }
      existingLink.remove();
    }

    // 1. Create a Blob from the CSS string
    const blob = new Blob([css], { type: 'text/css' });

    // 2. Create an object URL for that Blob
    const url = URL.createObjectURL(blob);

    // 3. Create a <link> element pointing to it
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.id = elementId;

    document.head.appendChild(link);
  }

  // Utility methods for color manipulation
  hexToHsl(hex) {
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

  hslToHex(h, s, l) {
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

  // Method to update design system
  updateDesign(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.tokens = this.generateTokens();
    this.css = this.generateCSS();
  }

  // Method to get current tokens (useful for debugging)
  getTokens() {
    return this.tokens;
  }

  // Method to export CSS (useful for build processes)
  exportCSS() {
    return this.css;
  }
}
