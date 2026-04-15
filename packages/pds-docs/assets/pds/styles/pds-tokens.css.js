// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f1fc;
  --color-primary-100: #c3dbfa;
  --color-primary-200: #91bef9;
  --color-primary-300: #60a2f6;
  --color-primary-400: #3085f3;
  --color-primary-500: #1877f2;
  --color-primary-600: #0b5fcc;
  --color-primary-700: #09499b;
  --color-primary-800: #06326b;
  --color-primary-900: #031b3b;
  --color-secondary-50: #d7dade;
  --color-secondary-100: #b8becb;
  --color-secondary-200: #a5a7aa;
  --color-secondary-300: #8b8d92;
  --color-secondary-400: #717478;
  --color-secondary-500: #65676b;
  --color-secondary-600: #4c4e51;
  --color-secondary-700: #333437;
  --color-secondary-800: #252627;
  --color-secondary-900: #19191a;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #e0e0e1;
  --color-gray-300: #c5c6c9;
  --color-gray-400: #96989c;
  --color-gray-500: #65676b;
  --color-gray-600: #6a707c;
  --color-gray-700: #505663;
  --color-gray-800: #2c313a;
  --color-gray-900: #16181d;
  --color-surface-base: #ffffff;
  --color-surface-subtle: #fafafa;
  --color-surface-elevated: #f5f4f4;
  --color-surface-sunken: #f0efef;
  --color-surface-overlay: #fafafa;
  --color-surface-inverse: #151313;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #fafafa;
  --color-surface-fieldset-subtle: #f5f4f4;
  --color-surface-fieldset-elevated: #f0efef;
  --color-surface-fieldset-sunken: #e4e3e3;
  --color-surface-fieldset-overlay: #f5f4f4;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #ffffff;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #666666;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #666666;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #fafafa;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #646464;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #646464;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #f5f4f4;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #626262;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #626262;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #f0efef;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #606060;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #606060;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #fafafa;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #646464;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #646464;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #151313;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a1a1a1;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a1a1a1;
  --surface-inverse-shadow: rgba(255, 255, 255, 0.25);
  --surface-inverse-border: rgba(255, 255, 255, 0.15);

  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  /* Interactive Colors - optimized for specific use cases */
  --color-primary-fill: #0b5fcc; /* For button backgrounds with white text */
  --color-primary-fill-hover: #0a55b8;
  --color-primary-fill-active: #094ca3;
  --color-primary-text: #0b5fcc; /* For links and outline buttons on light surfaces */
  --color-primary-text-hover: #0b5fcc;
  --color-primary-text-visited: #3c7fd6;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #0b5fcc;
  --color-selection-bg: #0b5fcc;
  --color-selection-text: #ffffff;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors */
  --color-accent-fill: #c30127;
  --color-accent-fill-hover: #b00123;
  --color-accent-fill-active: #9c011f;
  --color-accent-text: #c30127;
  --color-accent-text-hover: #c30127;
  /* Surface-Aware Accent Text Tokens */
  --surface-base-accent-text: #c30127;
  --surface-base-accent-text-hover: #c30127;
  --surface-subtle-accent-text: #c30127;
  --surface-subtle-accent-text-hover: #c30127;
  --surface-elevated-accent-text: #c30127;
  --surface-elevated-accent-text-hover: #c30127;
  --surface-sunken-accent-text: #c30127;
  --surface-sunken-accent-text-hover: #c30127;
  --surface-overlay-accent-text: #c30127;
  --surface-overlay-accent-text-hover: #c30127;
  --surface-inverse-accent-text: #fe2c55;
  --surface-inverse-accent-text-hover: #fe2c55;
  /* Danger Role Colors */
  --color-danger-fill: #c10b0b;
  --color-danger-fill-hover: #ae0a0a;
  --color-danger-fill-active: #9a0909;
  --color-danger-text: #c10b0b;
  --color-danger-text-hover: #c10b0b;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors */
  --color-success-fill: #077807;
  --color-success-fill-hover: #066c06;
  --color-success-fill-active: #066006;
  --color-success-text: #077807;
  --color-success-text-hover: #077807;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors */
  --color-warning-fill: #664c00;
  --color-warning-fill-hover: #5c4400;
  --color-warning-fill-active: #523d00;
  --color-warning-text: #664c00;
  --color-warning-text-hover: #664c00;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors */
  --color-info-fill: #0b5fcc;
  --color-info-fill-hover: #0a55b8;
  --color-info-fill-active: #094ca3;
  --color-info-text: #0b5fcc;
  --color-info-text-hover: #0b5fcc;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens */
  --surface-base-success-text: #077807;
  --surface-base-success-text-hover: #077807;
  --surface-subtle-success-text: #077807;
  --surface-subtle-success-text-hover: #077807;
  --surface-elevated-success-text: #077807;
  --surface-elevated-success-text-hover: #077807;
  --surface-sunken-success-text: #077807;
  --surface-sunken-success-text-hover: #044804;
  --surface-overlay-success-text: #077807;
  --surface-overlay-success-text-hover: #077807;
  --surface-inverse-success-text: #09a909;
  --surface-inverse-success-text-hover: #09a909;
  --surface-base-warning-text: #664c00;
  --surface-base-warning-text-hover: #664c00;
  --surface-subtle-warning-text: #664c00;
  --surface-subtle-warning-text-hover: #664c00;
  --surface-elevated-warning-text: #664c00;
  --surface-elevated-warning-text-hover: #664c00;
  --surface-sunken-warning-text: #664c00;
  --surface-sunken-warning-text-hover: #664c00;
  --surface-overlay-warning-text: #664c00;
  --surface-overlay-warning-text-hover: #664c00;
  --surface-inverse-warning-text: #cc9900;
  --surface-inverse-warning-text-hover: #cc9900;
  --surface-base-info-text: #0b5fcc;
  --surface-base-info-text-hover: #0b5fcc;
  --surface-subtle-info-text: #0b5fcc;
  --surface-subtle-info-text-hover: #0b5fcc;
  --surface-elevated-info-text: #0b5fcc;
  --surface-elevated-info-text-hover: #0b5fcc;
  --surface-sunken-info-text: #0b5fcc;
  --surface-sunken-info-text-hover: #0b5fcc;
  --surface-overlay-info-text: #0b5fcc;
  --surface-overlay-info-text-hover: #0b5fcc;
  --surface-inverse-info-text: #3085f3;
  --surface-inverse-info-text-hover: #3085f3;
  --surface-base-danger-text: #c10b0b;
  --surface-base-danger-text-hover: #c10b0b;
  --surface-subtle-danger-text: #c10b0b;
  --surface-subtle-danger-text-hover: #c10b0b;
  --surface-elevated-danger-text: #c10b0b;
  --surface-elevated-danger-text-hover: #c10b0b;
  --surface-sunken-danger-text: #c10b0b;
  --surface-sunken-danger-text-hover: #c10b0b;
  --surface-overlay-danger-text: #c10b0b;
  --surface-overlay-danger-text-hover: #c10b0b;
  --surface-inverse-danger-text: #f55656;
  --surface-inverse-danger-text-hover: #f55656;
  /* Semantic Callout Display Tokens */
  --color-success-display-bg: var(--color-success-50);
  --color-success-display-border: var(--color-success-600);
  --color-success-display-text: var(--color-success-900);
  --color-info-display-bg: var(--color-info-50);
  --color-info-display-border: var(--color-info-600);
  --color-info-display-text: var(--color-info-900);
  --color-warning-display-bg: var(--color-warning-50);
  --color-warning-display-border: var(--color-warning-600);
  --color-warning-display-text: var(--color-warning-900);
  --color-danger-display-bg: var(--color-danger-50);
  --color-danger-display-border: var(--color-danger-600);
  --color-danger-display-text: var(--color-danger-900);
  /* Translucent Surface Tokens */
  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #1877f2 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe2c55 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #1877f2 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #65676b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #1877f2 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #65676b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe2c55 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe2c55 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #1877f2 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #1877f2 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe2c55 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe2c55 15%, transparent) 0px, transparent 50%);
    

            /* Spacing */
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 1px;
  --border-width-thin: 1px;
  --border-width-medium: 1px;
  --border-width-thick: 2px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 26px;
  --font-size-3xl: 31px;
  --font-size-4xl: 37px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.75;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 90ms;
  --transition-normal: 150ms;
  --transition-slow: 210ms;


            /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-drawer: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;


            /* Icon System */
  --icon-set: phosphor;
  --icon-weight: regular;
  --icon-size: 24px;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #18191a;
    --color-surface-subtle: #131415;
    --color-surface-elevated: #0e0f0f;
    --color-surface-sunken: #141415;
    --color-surface-overlay: #1d1e1f;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0e0f0f;
    --color-surface-fieldset-subtle: #1d1e1f;
    --color-surface-fieldset-elevated: #212323;
    --color-surface-fieldset-sunken: #0e0f0f;
    --color-surface-fieldset-overlay: #28292b;
    --color-primary-50: #e7f1fe;
    --color-primary-100: #cde2fe;
    --color-primary-200: #add0ff;
    --color-primary-300: #7ab3ff;
    --color-primary-400: #4796ff;
    --color-primary-500: #2d88ff;
    --color-primary-600: #006cf9;
    --color-primary-700: #0056c6;
    --color-primary-800: #004093;
    --color-primary-900: #002a60;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #d7d8db;
    --color-secondary-300: #bcbec3;
    --color-secondary-400: #a1a5ab;
    --color-secondary-500: #b0b3b8;
    --color-secondary-600: #9599a0;
    --color-secondary-700: #7a7f88;
    --color-secondary-800: #62666d;
    --color-secondary-900: #4a4d52;
    --color-accent-50: #fee7eb;
    --color-accent-100: #fdced7;
    --color-accent-200: #ffabbb;
    --color-accent-300: #fe7892;
    --color-accent-400: #fe4569;
    --color-accent-500: #fe2c55;
    --color-accent-600: #f60131;
    --color-accent-700: #c30127;
    --color-accent-800: #90011d;
    --color-accent-900: #5e0013;
    --color-gray-50: #fafafa;
    --color-gray-100: #f2f2f3;
    --color-gray-200: #dfe0e2;
    --color-gray-300: #c4c6ca;
    --color-gray-400: #94989e;
    --color-gray-500: #b0b3b8;
    --color-gray-600: #67707f;
    --color-gray-700: #4d5665;
    --color-gray-800: #2b313b;
    --color-gray-900: #15181e;
    --color-success-50: #d1fad1;
    --color-success-100: #a0f7a0;
    --color-success-200: #6ef76e;
    --color-success-300: #3df43d;
    --color-success-400: #0df10d;
    --color-success-500: #0cd90c;
    --color-success-600: #09a909;
    --color-success-700: #077807;
    --color-success-800: #044804;
    --color-success-900: #033003;
    --color-info-50: #e8f1fc;
    --color-info-100: #c3dbfa;
    --color-info-200: #91bef9;
    --color-info-300: #60a2f6;
    --color-info-400: #3085f3;
    --color-info-500: #1877f2;
    --color-info-600: #0b5fcc;
    --color-info-700: #09499b;
    --color-info-800: #06326b;
    --color-info-900: #031b3b;
    --color-warning-50: #fef8e7;
    --color-warning-100: #fdebb4;
    --color-warning-200: #ffdf80;
    --color-warning-300: #ffd24d;
    --color-warning-400: #ffc51a;
    --color-warning-500: #FFBF00;
    --color-warning-600: #cc9900;
    --color-warning-700: #997300;
    --color-warning-800: #664c00;
    --color-warning-900: #332600;
    --color-danger-50: #fce8e8;
    --color-danger-100: #f9b9b9;
    --color-danger-200: #f88787;
    --color-danger-300: #f55656;
    --color-danger-400: #f22626;
    --color-danger-500: #f10e0e;
    --color-danger-600: #c10b0b;
    --color-danger-700: #910808;
    --color-danger-800: #600606;
    --color-danger-900: #300303;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #18191a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a3a3a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a3a3a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #131415;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a1a1a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a1a1a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0e0f0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9f9f9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9f9f9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #141415;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1d1e1f;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a5a5a5;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a5a5a5;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f2f2f3;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-500);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #006cf9;
    --color-primary-fill-hover: #2181ff;
    --color-primary-fill-active: #0c76ff;
    --color-primary-text: #2d88ff;
    --color-primary-text-hover: #4796ff;
    --color-primary-text-visited: #2972d1;
    --color-primary-contrast: #ffffff;
    --color-focus-ring: #006cf9;
    --color-selection-bg: #2d88ff;
    --color-selection-text: #000000;
    --color-link: var(--color-primary-text);
    --color-link-hover: var(--color-primary-text-hover);
    --color-link-visited: var(--color-primary-text-visited);
    /* Accent Role Colors (dark mode) */
    --color-accent-fill: #c30127;
    --color-accent-fill-hover: #f20130;
    --color-accent-fill-active: #d9012b;
    --color-accent-text: #fe2c55;
    --color-accent-text-hover: #fe7892;
    /* Surface-Aware Accent Text Tokens (dark mode) */
    --surface-base-accent-text: #fe2c55;
    --surface-base-accent-text-hover: #fe4569;
    --surface-subtle-accent-text: #fe2c55;
    --surface-subtle-accent-text-hover: #fe2c55;
    --surface-elevated-accent-text: #f60131;
    --surface-elevated-accent-text-hover: #fe2c55;
    --surface-sunken-accent-text: #fe2c55;
    --surface-sunken-accent-text-hover: #fe2c55;
    --surface-overlay-accent-text: #fe2c55;
    --surface-overlay-accent-text-hover: #fe7892;
    --surface-inverse-accent-text: #c30127;
    --surface-inverse-accent-text-hover: #c30127;
    /* Danger Role Colors (dark mode) */
    --color-danger-fill: #c10b0b;
    --color-danger-fill-hover: #ec0d0d;
    --color-danger-fill-active: #d50c0c;
    --color-danger-text: #f55656;
    --color-danger-text-hover: #f88787;
    --color-danger-contrast: #ffffff;
    /* Success Role Colors (dark mode) */
    --color-success-fill: #077807;
    --color-success-fill-hover: #0aae0a;
    --color-success-fill-active: #089108;
    --color-success-text: #09a909;
    --color-success-text-hover: #09a909;
    --color-success-contrast: #ffffff;
    /* Warning Role Colors (dark mode) */
    --color-warning-fill: #664c00;
    --color-warning-fill-hover: #a37a00;
    --color-warning-fill-active: #836100;
    --color-warning-text: #cc9900;
    --color-warning-text-hover: #cc9900;
    --color-warning-contrast: #ffffff;
    /* Info Role Colors (dark mode) */
    --color-info-fill: #0b5fcc;
    --color-info-fill-hover: #1173f2;
    --color-info-fill-active: #0c68e0;
    --color-info-text: #3085f3;
    --color-info-text-hover: #60a2f6;
    --color-info-contrast: #ffffff;
    /* Surface-Aware Status Text Tokens (dark mode) */
    --surface-base-success-text: #09a909;
    --surface-base-success-text-hover: #09a909;
    --surface-subtle-success-text: #09a909;
    --surface-subtle-success-text-hover: #09a909;
    --surface-elevated-success-text: #09a909;
    --surface-elevated-success-text-hover: #09a909;
    --surface-sunken-success-text: #09a909;
    --surface-sunken-success-text-hover: #09a909;
    --surface-overlay-success-text: #09a909;
    --surface-overlay-success-text-hover: #09a909;
    --surface-inverse-success-text: #077807;
    --surface-inverse-success-text-hover: #077807;
    --surface-base-warning-text: #cc9900;
    --surface-base-warning-text-hover: #cc9900;
    --surface-subtle-warning-text: #cc9900;
    --surface-subtle-warning-text-hover: #cc9900;
    --surface-elevated-warning-text: #cc9900;
    --surface-elevated-warning-text-hover: #cc9900;
    --surface-sunken-warning-text: #cc9900;
    --surface-sunken-warning-text-hover: #cc9900;
    --surface-overlay-warning-text: #cc9900;
    --surface-overlay-warning-text-hover: #cc9900;
    --surface-inverse-warning-text: #664c00;
    --surface-inverse-warning-text-hover: #664c00;
    --surface-base-info-text: #3085f3;
    --surface-base-info-text-hover: #60a2f6;
    --surface-subtle-info-text: #3085f3;
    --surface-subtle-info-text-hover: #3085f3;
    --surface-elevated-info-text: #1877f2;
    --surface-elevated-info-text-hover: #3085f3;
    --surface-sunken-info-text: #3085f3;
    --surface-sunken-info-text-hover: #3085f3;
    --surface-overlay-info-text: #3085f3;
    --surface-overlay-info-text-hover: #60a2f6;
    --surface-inverse-info-text: #0b5fcc;
    --surface-inverse-info-text-hover: #0b5fcc;
    --surface-base-danger-text: #f55656;
    --surface-base-danger-text-hover: #f55656;
    --surface-subtle-danger-text: #f55656;
    --surface-subtle-danger-text-hover: #f55656;
    --surface-elevated-danger-text: #f22626;
    --surface-elevated-danger-text-hover: #f55656;
    --surface-sunken-danger-text: #f55656;
    --surface-sunken-danger-text-hover: #f55656;
    --surface-overlay-danger-text: #f55656;
    --surface-overlay-danger-text-hover: #f55656;
    --surface-inverse-danger-text: #c10b0b;
    --surface-inverse-danger-text-hover: #c10b0b;
    /* Semantic Callout Display Tokens (dark mode) */
    --color-success-display-bg: color-mix(in oklab, var(--color-success-400) 12%, var(--color-surface-base));
    --color-success-display-border: var(--color-success-400);
    --color-success-display-text: var(--color-success-100);
    --color-info-display-bg: color-mix(in oklab, var(--color-info-400) 12%, var(--color-surface-base));
    --color-info-display-border: var(--color-info-400);
    --color-info-display-text: var(--color-info-100);
    --color-warning-display-bg: color-mix(in oklab, var(--color-warning-400) 12%, var(--color-surface-base));
    --color-warning-display-border: var(--color-warning-400);
    --color-warning-display-text: var(--color-warning-100);
    --color-danger-display-bg: color-mix(in oklab, var(--color-danger-400) 12%, var(--color-surface-base));
    --color-danger-display-border: var(--color-danger-400);
    --color-danger-display-text: var(--color-danger-100);
    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #fe4569 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe4569 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #fe4569 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #fe4569 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #fe4569 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #18191a;
  --color-surface-subtle: #131415;
  --color-surface-elevated: #0e0f0f;
  --color-surface-sunken: #141415;
  --color-surface-overlay: #1d1e1f;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0e0f0f;
  --color-surface-fieldset-subtle: #1d1e1f;
  --color-surface-fieldset-elevated: #212323;
  --color-surface-fieldset-sunken: #0e0f0f;
  --color-surface-fieldset-overlay: #28292b;
  --color-primary-50: #e7f1fe;
  --color-primary-100: #cde2fe;
  --color-primary-200: #add0ff;
  --color-primary-300: #7ab3ff;
  --color-primary-400: #4796ff;
  --color-primary-500: #2d88ff;
  --color-primary-600: #006cf9;
  --color-primary-700: #0056c6;
  --color-primary-800: #004093;
  --color-primary-900: #002a60;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #d7d8db;
  --color-secondary-300: #bcbec3;
  --color-secondary-400: #a1a5ab;
  --color-secondary-500: #b0b3b8;
  --color-secondary-600: #9599a0;
  --color-secondary-700: #7a7f88;
  --color-secondary-800: #62666d;
  --color-secondary-900: #4a4d52;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #dfe0e2;
  --color-gray-300: #c4c6ca;
  --color-gray-400: #94989e;
  --color-gray-500: #b0b3b8;
  --color-gray-600: #67707f;
  --color-gray-700: #4d5665;
  --color-gray-800: #2b313b;
  --color-gray-900: #15181e;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #18191a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a3a3a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a3a3a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #131415;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a1a1a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a1a1a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0e0f0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9f9f9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9f9f9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #141415;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1d1e1f;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a5a5a5;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a5a5a5;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f2f2f3;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Interactive Colors - optimized for specific use cases (dark mode) */
  --color-primary-fill: #006cf9;
  --color-primary-fill-hover: #2181ff;
  --color-primary-fill-active: #0c76ff;
  --color-primary-text: #2d88ff;
  --color-primary-text-hover: #4796ff;
  --color-primary-text-visited: #2972d1;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #006cf9;
  --color-selection-bg: #2d88ff;
  --color-selection-text: #000000;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors (dark mode) */
  --color-accent-fill: #c30127;
  --color-accent-fill-hover: #f20130;
  --color-accent-fill-active: #d9012b;
  --color-accent-text: #fe2c55;
  --color-accent-text-hover: #fe7892;
  /* Surface-Aware Accent Text Tokens (dark mode) */
  --surface-base-accent-text: #fe2c55;
  --surface-base-accent-text-hover: #fe4569;
  --surface-subtle-accent-text: #fe2c55;
  --surface-subtle-accent-text-hover: #fe2c55;
  --surface-elevated-accent-text: #f60131;
  --surface-elevated-accent-text-hover: #fe2c55;
  --surface-sunken-accent-text: #fe2c55;
  --surface-sunken-accent-text-hover: #fe2c55;
  --surface-overlay-accent-text: #fe2c55;
  --surface-overlay-accent-text-hover: #fe7892;
  --surface-inverse-accent-text: #c30127;
  --surface-inverse-accent-text-hover: #c30127;
  /* Danger Role Colors (dark mode) */
  --color-danger-fill: #c10b0b;
  --color-danger-fill-hover: #ec0d0d;
  --color-danger-fill-active: #d50c0c;
  --color-danger-text: #f55656;
  --color-danger-text-hover: #f88787;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors (dark mode) */
  --color-success-fill: #077807;
  --color-success-fill-hover: #0aae0a;
  --color-success-fill-active: #089108;
  --color-success-text: #09a909;
  --color-success-text-hover: #09a909;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors (dark mode) */
  --color-warning-fill: #664c00;
  --color-warning-fill-hover: #a37a00;
  --color-warning-fill-active: #836100;
  --color-warning-text: #cc9900;
  --color-warning-text-hover: #cc9900;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors (dark mode) */
  --color-info-fill: #0b5fcc;
  --color-info-fill-hover: #1173f2;
  --color-info-fill-active: #0c68e0;
  --color-info-text: #3085f3;
  --color-info-text-hover: #60a2f6;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens (dark mode) */
  --surface-base-success-text: #09a909;
  --surface-base-success-text-hover: #09a909;
  --surface-subtle-success-text: #09a909;
  --surface-subtle-success-text-hover: #09a909;
  --surface-elevated-success-text: #09a909;
  --surface-elevated-success-text-hover: #09a909;
  --surface-sunken-success-text: #09a909;
  --surface-sunken-success-text-hover: #09a909;
  --surface-overlay-success-text: #09a909;
  --surface-overlay-success-text-hover: #09a909;
  --surface-inverse-success-text: #077807;
  --surface-inverse-success-text-hover: #077807;
  --surface-base-warning-text: #cc9900;
  --surface-base-warning-text-hover: #cc9900;
  --surface-subtle-warning-text: #cc9900;
  --surface-subtle-warning-text-hover: #cc9900;
  --surface-elevated-warning-text: #cc9900;
  --surface-elevated-warning-text-hover: #cc9900;
  --surface-sunken-warning-text: #cc9900;
  --surface-sunken-warning-text-hover: #cc9900;
  --surface-overlay-warning-text: #cc9900;
  --surface-overlay-warning-text-hover: #cc9900;
  --surface-inverse-warning-text: #664c00;
  --surface-inverse-warning-text-hover: #664c00;
  --surface-base-info-text: #3085f3;
  --surface-base-info-text-hover: #60a2f6;
  --surface-subtle-info-text: #3085f3;
  --surface-subtle-info-text-hover: #3085f3;
  --surface-elevated-info-text: #1877f2;
  --surface-elevated-info-text-hover: #3085f3;
  --surface-sunken-info-text: #3085f3;
  --surface-sunken-info-text-hover: #3085f3;
  --surface-overlay-info-text: #3085f3;
  --surface-overlay-info-text-hover: #60a2f6;
  --surface-inverse-info-text: #0b5fcc;
  --surface-inverse-info-text-hover: #0b5fcc;
  --surface-base-danger-text: #f55656;
  --surface-base-danger-text-hover: #f55656;
  --surface-subtle-danger-text: #f55656;
  --surface-subtle-danger-text-hover: #f55656;
  --surface-elevated-danger-text: #f22626;
  --surface-elevated-danger-text-hover: #f55656;
  --surface-sunken-danger-text: #f55656;
  --surface-sunken-danger-text-hover: #f55656;
  --surface-overlay-danger-text: #f55656;
  --surface-overlay-danger-text-hover: #f55656;
  --surface-inverse-danger-text: #c10b0b;
  --surface-inverse-danger-text-hover: #c10b0b;
  /* Semantic Callout Display Tokens (dark mode) */
  --color-success-display-bg: color-mix(in oklab, var(--color-success-400) 12%, var(--color-surface-base));
  --color-success-display-border: var(--color-success-400);
  --color-success-display-text: var(--color-success-100);
  --color-info-display-bg: color-mix(in oklab, var(--color-info-400) 12%, var(--color-surface-base));
  --color-info-display-border: var(--color-info-400);
  --color-info-display-text: var(--color-info-100);
  --color-warning-display-bg: color-mix(in oklab, var(--color-warning-400) 12%, var(--color-surface-base));
  --color-warning-display-border: var(--color-warning-400);
  --color-warning-display-text: var(--color-warning-100);
  --color-danger-display-bg: color-mix(in oklab, var(--color-danger-400) 12%, var(--color-surface-base));
  --color-danger-display-border: var(--color-danger-400);
  --color-danger-display-text: var(--color-danger-100);
  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);

  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe4569 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe4569 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe4569 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe4569 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe4569 10%, transparent) 0px, transparent 50%);
    }
`);

export const tokensCSS = `@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f1fc;
  --color-primary-100: #c3dbfa;
  --color-primary-200: #91bef9;
  --color-primary-300: #60a2f6;
  --color-primary-400: #3085f3;
  --color-primary-500: #1877f2;
  --color-primary-600: #0b5fcc;
  --color-primary-700: #09499b;
  --color-primary-800: #06326b;
  --color-primary-900: #031b3b;
  --color-secondary-50: #d7dade;
  --color-secondary-100: #b8becb;
  --color-secondary-200: #a5a7aa;
  --color-secondary-300: #8b8d92;
  --color-secondary-400: #717478;
  --color-secondary-500: #65676b;
  --color-secondary-600: #4c4e51;
  --color-secondary-700: #333437;
  --color-secondary-800: #252627;
  --color-secondary-900: #19191a;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #e0e0e1;
  --color-gray-300: #c5c6c9;
  --color-gray-400: #96989c;
  --color-gray-500: #65676b;
  --color-gray-600: #6a707c;
  --color-gray-700: #505663;
  --color-gray-800: #2c313a;
  --color-gray-900: #16181d;
  --color-surface-base: #ffffff;
  --color-surface-subtle: #fafafa;
  --color-surface-elevated: #f5f4f4;
  --color-surface-sunken: #f0efef;
  --color-surface-overlay: #fafafa;
  --color-surface-inverse: #151313;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #fafafa;
  --color-surface-fieldset-subtle: #f5f4f4;
  --color-surface-fieldset-elevated: #f0efef;
  --color-surface-fieldset-sunken: #e4e3e3;
  --color-surface-fieldset-overlay: #f5f4f4;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #ffffff;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #666666;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #666666;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #fafafa;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #646464;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #646464;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #f5f4f4;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #626262;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #626262;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #f0efef;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #606060;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #606060;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #fafafa;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #646464;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #646464;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #151313;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a1a1a1;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a1a1a1;
  --surface-inverse-shadow: rgba(255, 255, 255, 0.25);
  --surface-inverse-border: rgba(255, 255, 255, 0.15);

  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  /* Interactive Colors - optimized for specific use cases */
  --color-primary-fill: #0b5fcc; /* For button backgrounds with white text */
  --color-primary-fill-hover: #0a55b8;
  --color-primary-fill-active: #094ca3;
  --color-primary-text: #0b5fcc; /* For links and outline buttons on light surfaces */
  --color-primary-text-hover: #0b5fcc;
  --color-primary-text-visited: #3c7fd6;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #0b5fcc;
  --color-selection-bg: #0b5fcc;
  --color-selection-text: #ffffff;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors */
  --color-accent-fill: #c30127;
  --color-accent-fill-hover: #b00123;
  --color-accent-fill-active: #9c011f;
  --color-accent-text: #c30127;
  --color-accent-text-hover: #c30127;
  /* Surface-Aware Accent Text Tokens */
  --surface-base-accent-text: #c30127;
  --surface-base-accent-text-hover: #c30127;
  --surface-subtle-accent-text: #c30127;
  --surface-subtle-accent-text-hover: #c30127;
  --surface-elevated-accent-text: #c30127;
  --surface-elevated-accent-text-hover: #c30127;
  --surface-sunken-accent-text: #c30127;
  --surface-sunken-accent-text-hover: #c30127;
  --surface-overlay-accent-text: #c30127;
  --surface-overlay-accent-text-hover: #c30127;
  --surface-inverse-accent-text: #fe2c55;
  --surface-inverse-accent-text-hover: #fe2c55;
  /* Danger Role Colors */
  --color-danger-fill: #c10b0b;
  --color-danger-fill-hover: #ae0a0a;
  --color-danger-fill-active: #9a0909;
  --color-danger-text: #c10b0b;
  --color-danger-text-hover: #c10b0b;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors */
  --color-success-fill: #077807;
  --color-success-fill-hover: #066c06;
  --color-success-fill-active: #066006;
  --color-success-text: #077807;
  --color-success-text-hover: #077807;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors */
  --color-warning-fill: #664c00;
  --color-warning-fill-hover: #5c4400;
  --color-warning-fill-active: #523d00;
  --color-warning-text: #664c00;
  --color-warning-text-hover: #664c00;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors */
  --color-info-fill: #0b5fcc;
  --color-info-fill-hover: #0a55b8;
  --color-info-fill-active: #094ca3;
  --color-info-text: #0b5fcc;
  --color-info-text-hover: #0b5fcc;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens */
  --surface-base-success-text: #077807;
  --surface-base-success-text-hover: #077807;
  --surface-subtle-success-text: #077807;
  --surface-subtle-success-text-hover: #077807;
  --surface-elevated-success-text: #077807;
  --surface-elevated-success-text-hover: #077807;
  --surface-sunken-success-text: #077807;
  --surface-sunken-success-text-hover: #044804;
  --surface-overlay-success-text: #077807;
  --surface-overlay-success-text-hover: #077807;
  --surface-inverse-success-text: #09a909;
  --surface-inverse-success-text-hover: #09a909;
  --surface-base-warning-text: #664c00;
  --surface-base-warning-text-hover: #664c00;
  --surface-subtle-warning-text: #664c00;
  --surface-subtle-warning-text-hover: #664c00;
  --surface-elevated-warning-text: #664c00;
  --surface-elevated-warning-text-hover: #664c00;
  --surface-sunken-warning-text: #664c00;
  --surface-sunken-warning-text-hover: #664c00;
  --surface-overlay-warning-text: #664c00;
  --surface-overlay-warning-text-hover: #664c00;
  --surface-inverse-warning-text: #cc9900;
  --surface-inverse-warning-text-hover: #cc9900;
  --surface-base-info-text: #0b5fcc;
  --surface-base-info-text-hover: #0b5fcc;
  --surface-subtle-info-text: #0b5fcc;
  --surface-subtle-info-text-hover: #0b5fcc;
  --surface-elevated-info-text: #0b5fcc;
  --surface-elevated-info-text-hover: #0b5fcc;
  --surface-sunken-info-text: #0b5fcc;
  --surface-sunken-info-text-hover: #0b5fcc;
  --surface-overlay-info-text: #0b5fcc;
  --surface-overlay-info-text-hover: #0b5fcc;
  --surface-inverse-info-text: #3085f3;
  --surface-inverse-info-text-hover: #3085f3;
  --surface-base-danger-text: #c10b0b;
  --surface-base-danger-text-hover: #c10b0b;
  --surface-subtle-danger-text: #c10b0b;
  --surface-subtle-danger-text-hover: #c10b0b;
  --surface-elevated-danger-text: #c10b0b;
  --surface-elevated-danger-text-hover: #c10b0b;
  --surface-sunken-danger-text: #c10b0b;
  --surface-sunken-danger-text-hover: #c10b0b;
  --surface-overlay-danger-text: #c10b0b;
  --surface-overlay-danger-text-hover: #c10b0b;
  --surface-inverse-danger-text: #f55656;
  --surface-inverse-danger-text-hover: #f55656;
  /* Semantic Callout Display Tokens */
  --color-success-display-bg: var(--color-success-50);
  --color-success-display-border: var(--color-success-600);
  --color-success-display-text: var(--color-success-900);
  --color-info-display-bg: var(--color-info-50);
  --color-info-display-border: var(--color-info-600);
  --color-info-display-text: var(--color-info-900);
  --color-warning-display-bg: var(--color-warning-50);
  --color-warning-display-border: var(--color-warning-600);
  --color-warning-display-text: var(--color-warning-900);
  --color-danger-display-bg: var(--color-danger-50);
  --color-danger-display-border: var(--color-danger-600);
  --color-danger-display-text: var(--color-danger-900);
  /* Translucent Surface Tokens */
  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #1877f2 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe2c55 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #1877f2 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #65676b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #1877f2 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #65676b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe2c55 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe2c55 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #1877f2 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #1877f2 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe2c55 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe2c55 15%, transparent) 0px, transparent 50%);
    

            /* Spacing */
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 1px;
  --border-width-thin: 1px;
  --border-width-medium: 1px;
  --border-width-thick: 2px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 26px;
  --font-size-3xl: 31px;
  --font-size-4xl: 37px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.75;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 90ms;
  --transition-normal: 150ms;
  --transition-slow: 210ms;


            /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-drawer: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;


            /* Icon System */
  --icon-set: phosphor;
  --icon-weight: regular;
  --icon-size: 24px;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #18191a;
    --color-surface-subtle: #131415;
    --color-surface-elevated: #0e0f0f;
    --color-surface-sunken: #141415;
    --color-surface-overlay: #1d1e1f;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0e0f0f;
    --color-surface-fieldset-subtle: #1d1e1f;
    --color-surface-fieldset-elevated: #212323;
    --color-surface-fieldset-sunken: #0e0f0f;
    --color-surface-fieldset-overlay: #28292b;
    --color-primary-50: #e7f1fe;
    --color-primary-100: #cde2fe;
    --color-primary-200: #add0ff;
    --color-primary-300: #7ab3ff;
    --color-primary-400: #4796ff;
    --color-primary-500: #2d88ff;
    --color-primary-600: #006cf9;
    --color-primary-700: #0056c6;
    --color-primary-800: #004093;
    --color-primary-900: #002a60;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #d7d8db;
    --color-secondary-300: #bcbec3;
    --color-secondary-400: #a1a5ab;
    --color-secondary-500: #b0b3b8;
    --color-secondary-600: #9599a0;
    --color-secondary-700: #7a7f88;
    --color-secondary-800: #62666d;
    --color-secondary-900: #4a4d52;
    --color-accent-50: #fee7eb;
    --color-accent-100: #fdced7;
    --color-accent-200: #ffabbb;
    --color-accent-300: #fe7892;
    --color-accent-400: #fe4569;
    --color-accent-500: #fe2c55;
    --color-accent-600: #f60131;
    --color-accent-700: #c30127;
    --color-accent-800: #90011d;
    --color-accent-900: #5e0013;
    --color-gray-50: #fafafa;
    --color-gray-100: #f2f2f3;
    --color-gray-200: #dfe0e2;
    --color-gray-300: #c4c6ca;
    --color-gray-400: #94989e;
    --color-gray-500: #b0b3b8;
    --color-gray-600: #67707f;
    --color-gray-700: #4d5665;
    --color-gray-800: #2b313b;
    --color-gray-900: #15181e;
    --color-success-50: #d1fad1;
    --color-success-100: #a0f7a0;
    --color-success-200: #6ef76e;
    --color-success-300: #3df43d;
    --color-success-400: #0df10d;
    --color-success-500: #0cd90c;
    --color-success-600: #09a909;
    --color-success-700: #077807;
    --color-success-800: #044804;
    --color-success-900: #033003;
    --color-info-50: #e8f1fc;
    --color-info-100: #c3dbfa;
    --color-info-200: #91bef9;
    --color-info-300: #60a2f6;
    --color-info-400: #3085f3;
    --color-info-500: #1877f2;
    --color-info-600: #0b5fcc;
    --color-info-700: #09499b;
    --color-info-800: #06326b;
    --color-info-900: #031b3b;
    --color-warning-50: #fef8e7;
    --color-warning-100: #fdebb4;
    --color-warning-200: #ffdf80;
    --color-warning-300: #ffd24d;
    --color-warning-400: #ffc51a;
    --color-warning-500: #FFBF00;
    --color-warning-600: #cc9900;
    --color-warning-700: #997300;
    --color-warning-800: #664c00;
    --color-warning-900: #332600;
    --color-danger-50: #fce8e8;
    --color-danger-100: #f9b9b9;
    --color-danger-200: #f88787;
    --color-danger-300: #f55656;
    --color-danger-400: #f22626;
    --color-danger-500: #f10e0e;
    --color-danger-600: #c10b0b;
    --color-danger-700: #910808;
    --color-danger-800: #600606;
    --color-danger-900: #300303;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #18191a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a3a3a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a3a3a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #131415;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a1a1a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a1a1a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0e0f0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9f9f9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9f9f9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #141415;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1d1e1f;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a5a5a5;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a5a5a5;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f2f2f3;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-500);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #006cf9;
    --color-primary-fill-hover: #2181ff;
    --color-primary-fill-active: #0c76ff;
    --color-primary-text: #2d88ff;
    --color-primary-text-hover: #4796ff;
    --color-primary-text-visited: #2972d1;
    --color-primary-contrast: #ffffff;
    --color-focus-ring: #006cf9;
    --color-selection-bg: #2d88ff;
    --color-selection-text: #000000;
    --color-link: var(--color-primary-text);
    --color-link-hover: var(--color-primary-text-hover);
    --color-link-visited: var(--color-primary-text-visited);
    /* Accent Role Colors (dark mode) */
    --color-accent-fill: #c30127;
    --color-accent-fill-hover: #f20130;
    --color-accent-fill-active: #d9012b;
    --color-accent-text: #fe2c55;
    --color-accent-text-hover: #fe7892;
    /* Surface-Aware Accent Text Tokens (dark mode) */
    --surface-base-accent-text: #fe2c55;
    --surface-base-accent-text-hover: #fe4569;
    --surface-subtle-accent-text: #fe2c55;
    --surface-subtle-accent-text-hover: #fe2c55;
    --surface-elevated-accent-text: #f60131;
    --surface-elevated-accent-text-hover: #fe2c55;
    --surface-sunken-accent-text: #fe2c55;
    --surface-sunken-accent-text-hover: #fe2c55;
    --surface-overlay-accent-text: #fe2c55;
    --surface-overlay-accent-text-hover: #fe7892;
    --surface-inverse-accent-text: #c30127;
    --surface-inverse-accent-text-hover: #c30127;
    /* Danger Role Colors (dark mode) */
    --color-danger-fill: #c10b0b;
    --color-danger-fill-hover: #ec0d0d;
    --color-danger-fill-active: #d50c0c;
    --color-danger-text: #f55656;
    --color-danger-text-hover: #f88787;
    --color-danger-contrast: #ffffff;
    /* Success Role Colors (dark mode) */
    --color-success-fill: #077807;
    --color-success-fill-hover: #0aae0a;
    --color-success-fill-active: #089108;
    --color-success-text: #09a909;
    --color-success-text-hover: #09a909;
    --color-success-contrast: #ffffff;
    /* Warning Role Colors (dark mode) */
    --color-warning-fill: #664c00;
    --color-warning-fill-hover: #a37a00;
    --color-warning-fill-active: #836100;
    --color-warning-text: #cc9900;
    --color-warning-text-hover: #cc9900;
    --color-warning-contrast: #ffffff;
    /* Info Role Colors (dark mode) */
    --color-info-fill: #0b5fcc;
    --color-info-fill-hover: #1173f2;
    --color-info-fill-active: #0c68e0;
    --color-info-text: #3085f3;
    --color-info-text-hover: #60a2f6;
    --color-info-contrast: #ffffff;
    /* Surface-Aware Status Text Tokens (dark mode) */
    --surface-base-success-text: #09a909;
    --surface-base-success-text-hover: #09a909;
    --surface-subtle-success-text: #09a909;
    --surface-subtle-success-text-hover: #09a909;
    --surface-elevated-success-text: #09a909;
    --surface-elevated-success-text-hover: #09a909;
    --surface-sunken-success-text: #09a909;
    --surface-sunken-success-text-hover: #09a909;
    --surface-overlay-success-text: #09a909;
    --surface-overlay-success-text-hover: #09a909;
    --surface-inverse-success-text: #077807;
    --surface-inverse-success-text-hover: #077807;
    --surface-base-warning-text: #cc9900;
    --surface-base-warning-text-hover: #cc9900;
    --surface-subtle-warning-text: #cc9900;
    --surface-subtle-warning-text-hover: #cc9900;
    --surface-elevated-warning-text: #cc9900;
    --surface-elevated-warning-text-hover: #cc9900;
    --surface-sunken-warning-text: #cc9900;
    --surface-sunken-warning-text-hover: #cc9900;
    --surface-overlay-warning-text: #cc9900;
    --surface-overlay-warning-text-hover: #cc9900;
    --surface-inverse-warning-text: #664c00;
    --surface-inverse-warning-text-hover: #664c00;
    --surface-base-info-text: #3085f3;
    --surface-base-info-text-hover: #60a2f6;
    --surface-subtle-info-text: #3085f3;
    --surface-subtle-info-text-hover: #3085f3;
    --surface-elevated-info-text: #1877f2;
    --surface-elevated-info-text-hover: #3085f3;
    --surface-sunken-info-text: #3085f3;
    --surface-sunken-info-text-hover: #3085f3;
    --surface-overlay-info-text: #3085f3;
    --surface-overlay-info-text-hover: #60a2f6;
    --surface-inverse-info-text: #0b5fcc;
    --surface-inverse-info-text-hover: #0b5fcc;
    --surface-base-danger-text: #f55656;
    --surface-base-danger-text-hover: #f55656;
    --surface-subtle-danger-text: #f55656;
    --surface-subtle-danger-text-hover: #f55656;
    --surface-elevated-danger-text: #f22626;
    --surface-elevated-danger-text-hover: #f55656;
    --surface-sunken-danger-text: #f55656;
    --surface-sunken-danger-text-hover: #f55656;
    --surface-overlay-danger-text: #f55656;
    --surface-overlay-danger-text-hover: #f55656;
    --surface-inverse-danger-text: #c10b0b;
    --surface-inverse-danger-text-hover: #c10b0b;
    /* Semantic Callout Display Tokens (dark mode) */
    --color-success-display-bg: color-mix(in oklab, var(--color-success-400) 12%, var(--color-surface-base));
    --color-success-display-border: var(--color-success-400);
    --color-success-display-text: var(--color-success-100);
    --color-info-display-bg: color-mix(in oklab, var(--color-info-400) 12%, var(--color-surface-base));
    --color-info-display-border: var(--color-info-400);
    --color-info-display-text: var(--color-info-100);
    --color-warning-display-bg: color-mix(in oklab, var(--color-warning-400) 12%, var(--color-surface-base));
    --color-warning-display-border: var(--color-warning-400);
    --color-warning-display-text: var(--color-warning-100);
    --color-danger-display-bg: color-mix(in oklab, var(--color-danger-400) 12%, var(--color-surface-base));
    --color-danger-display-border: var(--color-danger-400);
    --color-danger-display-text: var(--color-danger-100);
    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #fe4569 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe4569 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #fe4569 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #fe4569 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #fe4569 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #18191a;
  --color-surface-subtle: #131415;
  --color-surface-elevated: #0e0f0f;
  --color-surface-sunken: #141415;
  --color-surface-overlay: #1d1e1f;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0e0f0f;
  --color-surface-fieldset-subtle: #1d1e1f;
  --color-surface-fieldset-elevated: #212323;
  --color-surface-fieldset-sunken: #0e0f0f;
  --color-surface-fieldset-overlay: #28292b;
  --color-primary-50: #e7f1fe;
  --color-primary-100: #cde2fe;
  --color-primary-200: #add0ff;
  --color-primary-300: #7ab3ff;
  --color-primary-400: #4796ff;
  --color-primary-500: #2d88ff;
  --color-primary-600: #006cf9;
  --color-primary-700: #0056c6;
  --color-primary-800: #004093;
  --color-primary-900: #002a60;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #d7d8db;
  --color-secondary-300: #bcbec3;
  --color-secondary-400: #a1a5ab;
  --color-secondary-500: #b0b3b8;
  --color-secondary-600: #9599a0;
  --color-secondary-700: #7a7f88;
  --color-secondary-800: #62666d;
  --color-secondary-900: #4a4d52;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #dfe0e2;
  --color-gray-300: #c4c6ca;
  --color-gray-400: #94989e;
  --color-gray-500: #b0b3b8;
  --color-gray-600: #67707f;
  --color-gray-700: #4d5665;
  --color-gray-800: #2b313b;
  --color-gray-900: #15181e;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #18191a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a3a3a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a3a3a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #131415;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a1a1a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a1a1a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0e0f0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9f9f9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9f9f9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #141415;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1d1e1f;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a5a5a5;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a5a5a5;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f2f2f3;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Interactive Colors - optimized for specific use cases (dark mode) */
  --color-primary-fill: #006cf9;
  --color-primary-fill-hover: #2181ff;
  --color-primary-fill-active: #0c76ff;
  --color-primary-text: #2d88ff;
  --color-primary-text-hover: #4796ff;
  --color-primary-text-visited: #2972d1;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #006cf9;
  --color-selection-bg: #2d88ff;
  --color-selection-text: #000000;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors (dark mode) */
  --color-accent-fill: #c30127;
  --color-accent-fill-hover: #f20130;
  --color-accent-fill-active: #d9012b;
  --color-accent-text: #fe2c55;
  --color-accent-text-hover: #fe7892;
  /* Surface-Aware Accent Text Tokens (dark mode) */
  --surface-base-accent-text: #fe2c55;
  --surface-base-accent-text-hover: #fe4569;
  --surface-subtle-accent-text: #fe2c55;
  --surface-subtle-accent-text-hover: #fe2c55;
  --surface-elevated-accent-text: #f60131;
  --surface-elevated-accent-text-hover: #fe2c55;
  --surface-sunken-accent-text: #fe2c55;
  --surface-sunken-accent-text-hover: #fe2c55;
  --surface-overlay-accent-text: #fe2c55;
  --surface-overlay-accent-text-hover: #fe7892;
  --surface-inverse-accent-text: #c30127;
  --surface-inverse-accent-text-hover: #c30127;
  /* Danger Role Colors (dark mode) */
  --color-danger-fill: #c10b0b;
  --color-danger-fill-hover: #ec0d0d;
  --color-danger-fill-active: #d50c0c;
  --color-danger-text: #f55656;
  --color-danger-text-hover: #f88787;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors (dark mode) */
  --color-success-fill: #077807;
  --color-success-fill-hover: #0aae0a;
  --color-success-fill-active: #089108;
  --color-success-text: #09a909;
  --color-success-text-hover: #09a909;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors (dark mode) */
  --color-warning-fill: #664c00;
  --color-warning-fill-hover: #a37a00;
  --color-warning-fill-active: #836100;
  --color-warning-text: #cc9900;
  --color-warning-text-hover: #cc9900;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors (dark mode) */
  --color-info-fill: #0b5fcc;
  --color-info-fill-hover: #1173f2;
  --color-info-fill-active: #0c68e0;
  --color-info-text: #3085f3;
  --color-info-text-hover: #60a2f6;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens (dark mode) */
  --surface-base-success-text: #09a909;
  --surface-base-success-text-hover: #09a909;
  --surface-subtle-success-text: #09a909;
  --surface-subtle-success-text-hover: #09a909;
  --surface-elevated-success-text: #09a909;
  --surface-elevated-success-text-hover: #09a909;
  --surface-sunken-success-text: #09a909;
  --surface-sunken-success-text-hover: #09a909;
  --surface-overlay-success-text: #09a909;
  --surface-overlay-success-text-hover: #09a909;
  --surface-inverse-success-text: #077807;
  --surface-inverse-success-text-hover: #077807;
  --surface-base-warning-text: #cc9900;
  --surface-base-warning-text-hover: #cc9900;
  --surface-subtle-warning-text: #cc9900;
  --surface-subtle-warning-text-hover: #cc9900;
  --surface-elevated-warning-text: #cc9900;
  --surface-elevated-warning-text-hover: #cc9900;
  --surface-sunken-warning-text: #cc9900;
  --surface-sunken-warning-text-hover: #cc9900;
  --surface-overlay-warning-text: #cc9900;
  --surface-overlay-warning-text-hover: #cc9900;
  --surface-inverse-warning-text: #664c00;
  --surface-inverse-warning-text-hover: #664c00;
  --surface-base-info-text: #3085f3;
  --surface-base-info-text-hover: #60a2f6;
  --surface-subtle-info-text: #3085f3;
  --surface-subtle-info-text-hover: #3085f3;
  --surface-elevated-info-text: #1877f2;
  --surface-elevated-info-text-hover: #3085f3;
  --surface-sunken-info-text: #3085f3;
  --surface-sunken-info-text-hover: #3085f3;
  --surface-overlay-info-text: #3085f3;
  --surface-overlay-info-text-hover: #60a2f6;
  --surface-inverse-info-text: #0b5fcc;
  --surface-inverse-info-text-hover: #0b5fcc;
  --surface-base-danger-text: #f55656;
  --surface-base-danger-text-hover: #f55656;
  --surface-subtle-danger-text: #f55656;
  --surface-subtle-danger-text-hover: #f55656;
  --surface-elevated-danger-text: #f22626;
  --surface-elevated-danger-text-hover: #f55656;
  --surface-sunken-danger-text: #f55656;
  --surface-sunken-danger-text-hover: #f55656;
  --surface-overlay-danger-text: #f55656;
  --surface-overlay-danger-text-hover: #f55656;
  --surface-inverse-danger-text: #c10b0b;
  --surface-inverse-danger-text-hover: #c10b0b;
  /* Semantic Callout Display Tokens (dark mode) */
  --color-success-display-bg: color-mix(in oklab, var(--color-success-400) 12%, var(--color-surface-base));
  --color-success-display-border: var(--color-success-400);
  --color-success-display-text: var(--color-success-100);
  --color-info-display-bg: color-mix(in oklab, var(--color-info-400) 12%, var(--color-surface-base));
  --color-info-display-border: var(--color-info-400);
  --color-info-display-text: var(--color-info-100);
  --color-warning-display-bg: color-mix(in oklab, var(--color-warning-400) 12%, var(--color-surface-base));
  --color-warning-display-border: var(--color-warning-400);
  --color-warning-display-text: var(--color-warning-100);
  --color-danger-display-bg: color-mix(in oklab, var(--color-danger-400) 12%, var(--color-surface-base));
  --color-danger-display-border: var(--color-danger-400);
  --color-danger-display-text: var(--color-danger-100);
  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);

  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe4569 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe4569 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe4569 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe4569 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe4569 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe4569 10%, transparent) 0px, transparent 50%);
    }
`;
