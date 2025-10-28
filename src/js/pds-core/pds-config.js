import { enums } from "./pds-enums.js";
/**
 * Default configuration for the Pure Design System.
 * This file defines the default settings for colors, typography,
 * spatial rhythm, layers, shape, behavior, layout, advanced options,
 * accessibility, components, and icons.
 */
export const defaultConfig = {
  colors: {
    // Palette - base colors that generate entire color palettes
    primary: "#2d9dc9", // Primary brand color
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
      ],
    },
    spritePath: "public/assets/img/icons.svg",
  },

  gap: 4,

  debug: false,
};
