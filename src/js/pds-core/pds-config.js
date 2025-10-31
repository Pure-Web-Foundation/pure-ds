import { enums } from "./pds-enums.js";

/**
 * Design system presets - pre-configured themes for quick starts
 */
export const presets = [
  {
    name: "Ocean Breeze",
    description: "Fresh and calming ocean-inspired palette with professional undertones",
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
      radiusSize: enums.RadiusSizes.large // Soft, flowing
    }
  },
  {
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
  {
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
  {
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
  {
    name: "Sunset Paradise",
    description: "Warm tropical colors evoking golden hour by the beach",
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
      radiusSize: enums.RadiusSizes.full, // Playful, rounded
      borderWidth: enums.BorderWidths.medium
    }
  },
  {
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
  {
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
  {
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
  }
];

/**
 * Default configuration for the Pure Design System.
 * This file defines the default settings for colors, typography,
 * spatial rhythm, layers, shape, behavior, layout, advanced options,
 * accessibility, components, and icons.
 */
export const defaultConfig = {
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
    radiusSize: enums.RadiusSizes.none,
    borderWidth: enums.BorderWidths.thin,
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

  components: {
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
        "palette",
        "rocket",
        "feather",
        "square",
        "circle",
        "squares-four",
      ],
    },
    spritePath: "public/assets/img/pds-icons.svg",
  },

  gap: 4,

  debug: false,
};
