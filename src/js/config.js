import { AutoDesigner } from "./auto-designer.js";

export const config = {
  // Design system configuration
  design: {
    colors: {
      // Palette - base colors that generate entire color palettes
      primary: "#2d9dc9",      // Primary brand color 
      secondary: "#a99b95",    // Secondary/neutral color
      accent: "#e54271",       // Accent color (pink red)
      background: "#e7e6de",   // Base background color for light mode
      
      // Dark mode overrides (optional - if not set, auto-generated from light mode)
      darkMode: {
        background: "#16171a",  // Custom dark mode background (cool blue-gray)
        secondary: "#8b9199",   // Cool gray for dark mode inputs/borders
      },
      
      // Semantic colors (will use intelligent defaults if not specified)
      success: null,    // Auto-generated from primary if null
      warning: null,    // Uses accent color if null
      danger: null,     // Auto-generated from primary if null
      info: null,       // Uses primary color if null
      
      // Gradients and overlays
      gradientStops: 3,
      elevationOpacity: 0.05,
    },
    
    typography: {
      fontFamilyHeadings: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontFamilyBody: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontFamilyMono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      baseFontSize: 16,
      fontWeightLight: 'light',
      fontWeightNormal: 'normal', 
      fontWeightMedium: 'medium',
      fontWeightSemibold: 'semibold',
      fontWeightBold: 'bold',
      lineHeightTight: 'tight',
      lineHeightNormal: 'normal',
      lineHeightRelaxed: 'relaxed',
      letterSpacingTight: -0.025,
      letterSpacingNormal: 0,
      letterSpacingWide: 0.025,
    },
    
    spatialRhythm: {
      baseUnit: 16,
      scaleRatio: 1.25,
      maxSpacingSteps: 32,
      containerMaxWidth: 1200,
      containerPadding: 1.0,
      inputPadding: 0.75,
      buttonPadding: 1.0,
      sectionSpacing: 2.0,
    },
    
    layers: {
      shadowDepth: 'medium',
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
      radiusSize: AutoDesigner.RadiusSizes.large,
      borderWidth: AutoDesigner.BorderWidths.thin,
      customRadius: null,
    },
    
    behavior: {
      transitionSpeed: AutoDesigner.TransitionSpeeds.normal,
      animationEasing: AutoDesigner.AnimationEasings['ease-out'],
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
        xl: 1280
      },
      densityCompact: 0.8,
      densityNormal: 1.0,
      densityComfortable: 1.2,
      buttonMinHeight: 44,
      inputMinHeight: 40,
    },
    
    advanced: {
      linkStyle: 'inline',
      colorDerivation: 'hsl',
    },
    
    a11y: {
      minTouchTarget: 44,
      prefersReducedMotion: true,
      focusStyle: 'ring',
    },
    
    components: {
      tables: true,
      alerts: true,
      toasts: true,
      badges: true,
      modals: true,
      forms: true,
      tabStrip: true,
      customScrollbars: true,
      drawer: true,
    },
    
    icons: {
      set: 'phosphor',
      weight: 'regular',
      defaultSize: 24,
      sizes: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
        '2xl': 64,
      },
      include: {
        navigation: [
          'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
          'arrow-counter-clockwise',
          'caret-left', 'caret-right', 'caret-down', 'caret-up',
          'x', 'list', 'dots-three-vertical', 'dots-three',
          'house', 'gear', 'magnifying-glass', 'funnel',
        ],
        actions: [
          'plus', 'minus', 'check', 'trash', 'pencil', 'floppy-disk',
          'copy', 'download', 'upload', 'share', 'link',
          'eye', 'eye-slash', 'heart', 'star', 'bookmark',
          'note-pencil', 'cursor-click',
        ],
        communication: [
          'envelope', 'bell', 'bell-ringing', 'chat-circle', 'phone',
          'paper-plane-tilt', 'user', 'users', 'at',
        ],
        content: [
          'image', 'file', 'file-text', 'file-css', 'file-js',
          'folder', 'folder-open', 'book-open',
          'camera', 'video-camera', 'play', 'pause', 'microphone',
          'brackets-curly',
        ],
        status: [
          'info', 'warning', 'check-circle', 'x-circle',
          'question', 'shield-check', 'shield-warning',
          'lock', 'lock-open',
        ],
        time: ['calendar', 'clock', 'timer', 'hourglass'],
        commerce: [
          'shopping-cart', 'credit-card', 'currency-dollar',
          'tag', 'receipt', 'storefront',
        ],
        formatting: [
          'text-align-left', 'text-align-center', 'text-align-right',
          'text-b', 'text-italic', 'text-underline',
          'list-bullets', 'list-numbers', 'text-aa',
        ],
        system: [
          'cloud', 'cloud-arrow-up', 'cloud-arrow-down',
          'desktop', 'device-mobile', 'globe', 'wifi-high',
          'battery-charging', 'sun', 'moon', 'palette',
        ],
      },
      spritePath: 'public/assets/img/icons.svg',
    },
    
    debug: false,
    
    // output: {
    //   file: 'public/assets/css/auto-designer.css',
    //   minify: false,
    //   sourceMap: false,
    // }
  },

  // Auto-define configuration for web components
  autoDefine: {
    baseURL: "/auto-define/",
    mapper: (tag) => {
      console.log(tag)

      switch(tag) {
        case 'pds-tabpanel':
          return 'pds-tabstrip.js';
        default:
          return `${tag}.js`;
      }
    },

    onError: (tag, err) => {
      console.error(`Auto-define error for <${tag}>:`, err);
    },
    
    // Critical options for observing dynamically added components
    scanExisting: true,           // Scan DOM on initialization
    observeShadows: true,          // Observe inside shadow DOMs (for Lit components)
    patchAttachShadow: true,       // Intercept attachShadow to observe new shadow roots
    debounceMs: 16,                // Debounce for performance
    enhancers: [
      {
        selector: "nav[data-dropdown]",
        run: (elem) => {
          //console.log("Enhance dropdown", elem);

          const menu = elem.querySelector("menu");

          const toggle = () => {
            const isCurrentlyVisible = menu.style.display !== "none";
            console.log("Toggle dropdown", !isCurrentlyVisible);
            menu.style.display = isCurrentlyVisible ? "none" : "block";
          };

          // Initially hide the menu
          menu.style.display = "none";

          elem.addEventListener("click", toggle);
        },
      },
      {
        selector: "label[data-toggle]",
        run: (elem) => {
          const checkbox = elem.querySelector('input[type="checkbox"]');
          if (!checkbox) {
            console.warn('Toggle enhancer: no checkbox found inside label[data-toggle]', elem);
            return;
          }

          // Create toggle switch UI with proper semantic structure
          const toggleSwitch = document.createElement('span');
          toggleSwitch.className = 'toggle-switch';
          toggleSwitch.setAttribute('role', 'presentation');
          toggleSwitch.setAttribute('aria-hidden', 'true');

          // Create the toggle knob
          const knob = document.createElement('span');
          knob.className = 'toggle-knob';
          toggleSwitch.appendChild(knob);
          
          // Find the label text span and insert toggle before it
          const labelSpan = elem.querySelector('span[data-label]');
          if (labelSpan) {
            elem.insertBefore(toggleSwitch, labelSpan);
          } else {
            elem.appendChild(toggleSwitch);
          }

          // Handle label clicks to toggle the checkbox
          elem.addEventListener('click', (e) => {
            if (checkbox.disabled) return;
            
            // Prevent default label behavior
            e.preventDefault();
            // Toggle the checkbox programmatically
            checkbox.checked = !checkbox.checked;
            // Dispatch change event so form handlers work
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
          });
        },
      },
    ],
  },
};
