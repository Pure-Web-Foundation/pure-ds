import { enums } from "./pds-enums.js";

/**
 * Design system presets - pre-configured themes for quick starts.
 * Expose as an object keyed by preset id.
 */
export const presets = {
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Fresh and calming ocean-inspired palette with professional undertones",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 3
    },
    colors: {
      primary: "#0891b2",
      secondary: "#64748b",
      accent: "#06b6d4",
      background: "#f0f9ff",
      darkMode: {
        background: "#0c1821",
        secondary: "#94a3b8"
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5, // More dramatic scale for breathing room
      fontFamilyHeadings: "system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif",
      fontFamilyBody: "system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif"
    },
    spatialRhythm: {
      baseUnit: 20, // More spacious
      scaleRatio: 1.4
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge // Soft, flowing
    }
  },
  "midnight-steel": {
    id: "midnight-steel",
    name: "Midnight Steel",
    description: "Bold industrial aesthetic with sharp contrasts and urban edge",
    colors: {
      primary: "#3b82f6",
      secondary: "#52525b",
      accent: "#f59e0b",
      background: "#fafaf9",
      darkMode: {
        background: "#18181b",
        secondary: "#71717a"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      fontWeightSemibold: 600
    },
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.small, // Crisp corporate edges
      borderWidth: enums.BorderWidths.thin
    }
  },
  "neural-glow": {
    id: "neural-glow",
    name: "Neural Glow",
    description: "AI-inspired with vibrant purple-blue gradients and futuristic vibes",
    colors: {
      primary: "#8b5cf6",
      secondary: "#6366f1",
      accent: "#ec4899",
      background: "#faf5ff",
      darkMode: {
        background: "#0f0a1a",
        secondary: "#818cf8"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.618, // Golden ratio for futuristic feel
      fontFamilyHeadings: "'Space Grotesk', system-ui, sans-serif",
      fontFamilyBody: "'Space Grotesk', system-ui, sans-serif"
    },
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.xlarge, // Smooth, modern
      borderWidth: enums.BorderWidths.medium
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast
    }
  },
  "paper-and-ink": {
    id: "paper-and-ink",
    name: "Paper & Ink",
    description: "Ultra-minimal design with focus on typography and whitespace",
    colors: {
      primary: "#171717",
      secondary: "#737373",
      accent: "#525252",
      background: "#ffffff",
      darkMode: {
        background: "#0a0a0a",
        secondary: "#a3a3a3"
      }
    },
    typography: {
      baseFontSize: 18, // Readable, print-like
      fontScale: 1.333, // Perfect fourth
      fontFamilyHeadings: "'Helvetica Neue', 'Arial', sans-serif",
      fontFamilyBody: "'Georgia', 'Times New Roman', serif",
      fontWeightNormal: 400,
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 12, // Tight, compact
      scaleRatio: 1.2
    },
    shape: {
      radiusSize: enums.RadiusSizes.none, // Sharp editorial
      borderWidth: enums.BorderWidths.thin
    }
  },
  "sunset-paradise": {
    id: "sunset-paradise",
    name: "Sunset Paradise",
    description: "Warm tropical colors evoking golden hour by the beach",
     options: {
      liquidGlassEffects: true,
      backgroundMesh: 2
    },
    colors: {
      primary: "#f97316",
      secondary: "#d4a373",
      accent: "#fb923c",
      background: "#fffbeb",
      darkMode: {
        background: "#1a0f0a",
        secondary: "#c9a482",
        // Ensure sufficient contrast for primary-filled components with white text in dark mode
        primary: "#9a3412"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.5,
      fontFamilyHeadings: "'Quicksand', 'Comfortaa', sans-serif",
      fontFamilyBody: "'Quicksand', 'Comfortaa', sans-serif"
    },
    spatialRhythm: {
      baseUnit: 20, // Relaxed, vacation vibes
      scaleRatio: 1.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge, // Playful, rounded
      borderWidth: enums.BorderWidths.medium
    }
  },
  "retro-wave": {
    id: "retro-wave",
    name: "Retro Wave",
    description: "Nostalgic 80s-inspired palette with neon undertones",
    colors: {
      primary: "#d946ef",
      secondary: "#a78bfa",
      accent: "#22d3ee",
      background: "#fef3ff",
      darkMode: {
        background: "#1a0a1f",
        secondary: "#c4b5fd",
        // Deepen primary for dark mode to meet AA contrast with white text
        primary: "#6d28d9"
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.5,
      fontFamilyHeadings: "'Orbitron', 'Impact', monospace",
      fontFamilyBody: "'Courier New', 'Courier', monospace",
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.none, // Sharp geometric 80s
      borderWidth: enums.BorderWidths.thick // Bold borders
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant // Snappy retro feel
    }
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
        secondary: "#a8a29e"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414, // Square root of 2, organic growth
      fontFamilyHeadings: "'Merriweather Sans', 'Arial', sans-serif",
      fontFamilyBody: "'Merriweather', 'Georgia', serif"
    },
    spatialRhythm: {
      baseUnit: 18,
      scaleRatio: 1.3
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium, // Natural, organic curves
      borderWidth: enums.BorderWidths.thin
    }
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
        secondary: "#d1d5db"
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5,
      fontFamilyHeadings: "'Playfair Display', 'Georgia', serif",
      fontFamilyBody: "'Crimson Text', 'Garamond', serif",
      fontWeightNormal: 400,
      fontWeightSemibold: 600
    },
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.333
    },
    shape: {
      radiusSize: enums.RadiusSizes.small, // Subtle elegance
      borderWidth: enums.BorderWidths.thin
    }
  },
  "desert-dawn": {
    id: "desert-dawn",
    name: "Desert Dawn",
    description: "Sun-baked neutrals with grounded terracotta and cool oasis accents",
    colors: {
      primary: "#b45309", // terracotta
      secondary: "#a8a29e", // warm gray
      accent: "#0ea5a8", // oasis teal
      background: "#fcf6ef",
      darkMode: {
        background: "#12100e",
        secondary: "#d1d5db",
        // Deepen primary in dark to keep white text AA-compliant
        primary: "#7c2d12"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414,
      fontFamilyHeadings: "'Source Sans Pro', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Source Serif Pro', Georgia, serif"
    },
    spatialRhythm: {
      baseUnit: 18,
      scaleRatio: 1.3
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.medium
    }
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
  primary: "#d1d5db" // lighter-gray (tuned to balance outline/link contrast and white-on-fill contrast)
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.2,
      fontFamilyHeadings: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontFamilyBody: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 14, // compact, data-dense
      scaleRatio: 1.2
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      borderWidth: enums.BorderWidths.thick
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      focusRingWidth: 4
    }
  },
  "pastel-play": {
    id: "pastel-play",
    name: "Pastel Play",
    description: "Playful pastels with soft surfaces and friendly rounded shapes",
    colors: {
      primary: "#db2777", // raspberry
      secondary: "#a78bfa", // lavender
      accent: "#34d399", // mint
      background: "#fff7fa",
      darkMode: {
        background: "#1a1016",
        secondary: "#c4b5fd",
        primary: "#9d174d" // deeper for white text contrast
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings: "'Nunito', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Nunito', system-ui, -apple-system, sans-serif",
      lineHeightRelaxed: enums.LineHeights.relaxed
    },
    spatialRhythm: {
      baseUnit: 20, // comfy
      scaleRatio: 1.4
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge,
      borderWidth: enums.BorderWidths.thin
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.slow,
      animationEasing: enums.AnimationEasings["ease-out"]
    }
  },
  "brutalist-tech": {
    id: "brutalist-tech",
    name: "Brutalist Tech",
    description: "Stark grayscale with engineered accents and unapologetically bold structure",
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
        primary: "#06b6d4"
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.25,
      fontFamilyHeadings: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      letterSpacingTight: -0.02
    },
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.none,
      borderWidth: enums.BorderWidths.thick
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant
    }
  },
  "zen-garden": {
    id: "zen-garden",
    name: "Zen Garden",
    description: "Soft botanicals with contemplative spacing and balanced motion",
    colors: {
      primary: "#3f6212", // deep olive
      secondary: "#6b7280", // neutral leaf shadow
      accent: "#7c3aed", // iris bloom
      background: "#f7fbef",
      darkMode: {
        background: "#0d130a",
        secondary: "#a3a3a3",
        primary: "#365314" // deepen for white text
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.414,
      fontFamilyHeadings: "'Merriweather', Georgia, serif",
      fontFamilyBody: "'Noto Sans', system-ui, -apple-system, sans-serif"
    },
    spatialRhythm: {
      baseUnit: 22, // airy
      scaleRatio: 1.35
    },
    shape: {
      radiusSize: enums.RadiusSizes.large,
      borderWidth: enums.BorderWidths.medium
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.normal,
      animationEasing: enums.AnimationEasings.ease
    }
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
  description: "Base Pure DS preset",
   options: {
      liquidGlassEffects: true,
      backgroundMesh: 4
    },
  colors: {
    // Palette - base colors that generate entire color palettes
    primary: "#3097c0", // Primary brand color
    secondary: "#a99b95", // REQUIRED: Secondary/neutral color for gray scale generation
    accent: "#e54271", // Accent color (pink red)
    background: "#e7e6de", // Base background color for light mode

    // Dark mode overrides - specify custom dark theme colors
    darkMode: {
      background: "#16171a", // Custom dark mode background (cool blue-gray)
      secondary: "#8b9199", // Optional: custom dark grays (uses light secondary if omitted)
      // primary: null,      // Optional: override primary color for dark mode
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
    baseUnit: 16, // Base spacing unit in pixels (typically 16 = 1rem)
    
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
        sm: '150px',
        md: '250px',
        lg: '350px',
        xl: '450px',
      },
      enableGapUtilities: true,
    },
    
    containerMaxWidth: '1400px',
    containerPadding: 'var(--spacing-6)',
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

  components_old: {
    toasts: true,
    tabStrip: true,
    customScrollbars: true,
    drawer: true,
    
    // Component patterns
    card: {
      enabled: true,
      variants: ['base', 'elevated', 'interactive', 'outlined'],
    },
    media: {
      enabled: true,
      gallery: true,
    },
  },

  icons: {
    set: "phosphor", // https://phosphoricons.com/
    weight: "regular",
    defaultSize: 24,
    sizes: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
      "2xl": 64,
    },
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
      ],
      communication: [
        "envelope",
        "bell",
        "bell-ringing",
        "chat-circle",
        "phone",
        "paper-plane-tilt",
        "user",
        "users",
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
        "briefcase"
      ],
      status: [
        "info",
        "warning",
        "check-circle",
        "x-circle",
        "question",
        "shield-check",
        "shield-warning",
        "lock",
        "lock-open",
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
      ],
    },
  // Default sprite path for internal/dev use. For consumer apps, icons are exported to
  // [config.static.root]/icons/icons.svg and components should consume from there.
  spritePath: "public/assets/pds/icons/icons.svg",
  },

  gap: 4,

  debug: false,
};
// Note: presets is now a stable object keyed by id
