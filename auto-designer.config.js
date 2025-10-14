// AutoDesigner Configuration
// This file is used by the Node.js script to generate CSS
// ⚠️  IMPORTANT: Keep this in sync with src/js/config.js (used by browser runtime)
// The two files must have matching color/design settings to generate identical CSS

import { AutoDesigner } from "./src/js/auto-designer.js";

export const autoDesignerConfig = {
  colors: {
    // Palette - base colors that generate entire color palettes
    primary: "#2d9dc9",      // Primary brand color 
    secondary: "#a99b95",    // Secondary/neutral color
    accent: "#e54271",       // Accent color (pink red)
    background: "#e7e6de",   // Base background color for light mode
    
    // Dark mode overrides (optional - if not set, auto-generated from light mode)
    darkMode: {
      background: "#16171a",  // Custom dark mode background (cool blue-gray)
      // If you only specify background, other dark colors are derived from it
      // You can also specify individual overrides:
      // primary: null,       // Uses light mode primary if null
      secondary: "#8b9199",   // Cool gray for dark mode inputs/borders (instead of warm brown)
      // accent: null,        // Auto-adjusted if null
    },
    
    // Semantic colors (will use intelligent defaults if not specified)
    success: null,    // Auto-generated from primary if null
    warning: null,    // Uses accent color if null
    danger: null,     // Auto-generated from primary if null
    info: null,       // Uses primary color if null
    
    // Gradients and overlays
    gradientStops: 3,           // Number of gradient stops to generate
    elevationOpacity: 0.05,     // Opacity for elevation overlays
  },
  
  typography: {
    // Font families
    fontFamilySans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
    
    // Base font size
    baseFontSize: 16,
    
    // Font weights (using enum values)
    fontWeightLight: 'light',
    fontWeightNormal: 'normal', 
    fontWeightMedium: 'medium',
    fontWeightSemibold: 'semibold',
    fontWeightBold: 'bold',
    
    // Line heights (using enum values)
    lineHeightTight: 'tight',
    lineHeightNormal: 'normal',
    lineHeightRelaxed: 'relaxed',
    
    // Letter spacing
    letterSpacingTight: -0.025,
    letterSpacingNormal: 0,
    letterSpacingWide: 0.025,
  },
  
  spatialRhythm: {
    // Base spatial unit (all spacing derives from this)
    baseUnit: 16,
    
    // Padding/margin scales
    scaleRatio: 1.25,        // Ratio for generating spacing scale
    maxSpacingSteps: 32,     // Maximum spacing steps to generate
    
    // Container widths
    containerMaxWidth: 1200,
    containerPadding: 1.0,   // Multiplier of baseUnit for container padding
    
    // Component-specific spacing
    inputPadding: 0.75,      // Multiplier for input padding
    buttonPadding: 1.0,      // Multiplier for button padding
    sectionSpacing: 2.0,     // Multiplier for section spacing (fieldsets, etc.)
  },
  
  layers: {
    // Shadow depths (using enum values)
    shadowDepth: 'medium',   // none, light, medium, deep, extreme
    
    // Blur levels
    blurLight: 4,            // Light blur in px
    blurMedium: 8,           // Medium blur in px  
    blurHeavy: 16,           // Heavy blur in px
    
    // Z-index hierarchy
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
    // Corner radii (using enum values) 
    radiusSize: AutoDesigner.RadiusSizes.large,    // none, small, medium, large, full
    
    // Border styles (using enum values)
    borderWidth: AutoDesigner.BorderWidths.thin,     // hairline, thin, medium, thick
    
    // Custom radius values (in pixels, overrides radiusSize if set)
    customRadius: null,
  },
  
  behavior: {
    // Motion & effects
    transitionSpeed: AutoDesigner.TransitionSpeeds.normal,     // fast, normal, slow, custom
    animationEasing: AutoDesigner.AnimationEasings['ease-out'],   // linear, ease, ease-in, ease-out, ease-in-out, custom

    // Custom timing (in ms, overrides transitionSpeed if set)
    customTransitionSpeed: null,
    
    // Custom easing (overrides animationEasing if set) 
    customEasing: null,
    
    // Focus and interaction
    focusRingWidth: 3,       // Focus ring width in pixels
    focusRingOpacity: 0.3,   // Focus ring opacity
    hoverOpacity: 0.8,       // Hover opacity for images, etc.
  },
  
  layout: {
    // Grid system
    gridColumns: 12,         // Number of grid columns
    gridGutter: 1.0,         // Multiplier for grid gutters
    
    // Breakpoints (in pixels)
    breakpoints: {
      sm: 640,   // Mobile breakpoint
      md: 768,   // Tablet breakpoint
      lg: 1024,  // Desktop breakpoint
      xl: 1280   // Wide desktop breakpoint
    },
    
    // Density scales
    densityCompact: 0.8,     // Multiplier for compact density
    densityNormal: 1.0,      // Normal density
    densityComfortable: 1.2, // Multiplier for comfortable density
    
    // Component minimum sizes
    buttonMinHeight: 44,     // Minimum touch target height
    inputMinHeight: 40,      // Minimum input height
  },
  
  // Advanced options
  advanced: {
    // Link styling behavior
    linkStyle: 'inline',     // inline, block, or button
    
    // Color derivation mode
    colorDerivation: 'hsl',  // hsl or complement
  },
  
  // Accessibility options
  a11y: {
    minTouchTarget: 44,      // Minimum touch target size in pixels (iOS/Android standard)
    prefersReducedMotion: true, // Respect user's motion preferences
    focusStyle: 'ring',      // ring, outline, underline, glow
  },
  
  // Component modules to include
  components: {
    tables: true,
    alerts: true,
    toasts: true,
    badges: true,
    modals: true,
    forms: true,
  },
  
  // Icon System Configuration
  icons: {
    // Icon set to use
    set: 'phosphor',           // 'phosphor', 'lucide', 'heroicons', 'tabler', 'custom'
    
    // Phosphor-specific weight setting
    // Options: 'thin', 'light', 'regular', 'bold', 'fill', 'duotone'
    weight: 'regular',
    
    // Default icon size in pixels
    defaultSize: 24,
    
    // Size scale for icon utilities
    sizes: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
      '2xl': 64,
    },
    
    // Icons to include in sprite (organized by category)
    // Full list: https://phosphoricons.com
    include: {
      // Navigation & UI Core
      navigation: [
        'arrow-left',
        'arrow-right', 
        'arrow-up',
        'arrow-down',
        'caret-left',
        'caret-right',
        'caret-down',
        'caret-up',
        'x',
        'list',
        'dots-three-vertical',
        'dots-three',
        'house',
        'gear',
        'magnifying-glass',
        'funnel',
      ],
      
      // Actions & Controls
      actions: [
        'plus',
        'minus',
        'check',
        'trash',
        'pencil',
        'floppy-disk',
        'copy',
        'download',
        'upload',
        'share',
        'link',
        'eye',
        'eye-slash',
        'heart',
        'star',
        'bookmark',
      ],
      
      // Communication
      communication: [
        'envelope',
        'bell',
        'chat-circle',
        'phone',
        'paper-plane-tilt',
        'user',
        'users',
        'at',
      ],
      
      // Content & Media
      content: [
        'image',
        'file',
        'file-text',
        'folder',
        'folder-open',
        'camera',
        'video-camera',
        'play',
        'pause',
        'microphone',
      ],
      
      // Alerts & Status
      status: [
        'info',
        'warning',
        'check-circle',
        'x-circle',
        'question',
        'shield-check',
        'shield-warning',
        'lock',
        'lock-open',
      ],
      
      // Calendar & Time
      time: [
        'calendar',
        'clock',
        'timer',
        'hourglass',
      ],
      
      // Business & Shopping
      commerce: [
        'shopping-cart',
        'credit-card',
        'currency-dollar',
        'tag',
        'receipt',
        'storefront',
      ],
      
      // Layout & Formatting
      formatting: [
        'text-align-left',
        'text-align-center',
        'text-align-right',
        'text-b',
        'text-italic',
        'text-underline',
        'list-bullets',
        'list-numbers',
      ],
      
      // System & Settings
      system: [
        'cloud',
        'cloud-arrow-up',
        'cloud-arrow-down',
        'desktop',
        'device-mobile',
        'globe',
        'wifi-high',
        'battery-charging',
        'sun',
        'moon',
      ],
    },
    
    // Output path for generated sprite
    spritePath: 'public/assets/img/icons.svg',
  },
  
  // Debug options
  debug: false,              // Enable console logging
  
  // Output options (Node.js only)
  output: {
    file: 'public/assets/css/auto-designer.css',  // Output file path
    minify: false,            // Minify output CSS
    sourceMap: false,         // Generate source map
  }
};
