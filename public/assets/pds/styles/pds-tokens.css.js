// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f0fd;
  --color-primary-100: #d0e0fb;
  --color-primary-200: #b5d0fc;
  --color-primary-300: #84b1f9;
  --color-primary-400: #5392f7;
  --color-primary-500: #3b82f6;
  --color-primary-600: #0b63f3;
  --color-primary-700: #094fc2;
  --color-primary-800: #073b91;
  --color-primary-900: #042761;
  --color-secondary-50: #e8eaec;
  --color-secondary-100: #cad0d8;
  --color-secondary-200: #acb5c3;
  --color-secondary-300: #8e9bae;
  --color-secondary-400: #708198;
  --color-secondary-500: #64748b;
  --color-secondary-600: #4f5b6d;
  --color-secondary-700: #394250;
  --color-secondary-800: #242a32;
  --color-secondary-900: #15191e;
  --color-accent-50: #fbe9f2;
  --color-accent-100: #f9d2e5;
  --color-accent-200: #f8bad8;
  --color-accent-300: #f38bbf;
  --color-accent-400: #ee5da5;
  --color-accent-500: #ec4899;
  --color-accent-600: #e71a7f;
  --color-accent-700: #bb1366;
  --color-accent-800: #8c0f4d;
  --color-accent-900: #5e0a33;
  --color-success-50: #d0fad0;
  --color-success-100: #a0f8a0;
  --color-success-200: #6cf86c;
  --color-success-300: #3bf63b;
  --color-success-400: #0bf30b;
  --color-success-500: #0adb0a;
  --color-success-600: #08aa08;
  --color-success-700: #067906;
  --color-success-800: #034903;
  --color-success-900: #023102;
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
  --color-danger-50: #fde8e8;
  --color-danger-100: #fab8b8;
  --color-danger-200: #f98585;
  --color-danger-300: #f75454;
  --color-danger-400: #f52323;
  --color-danger-500: #f40b0b;
  --color-danger-600: #c30909;
  --color-danger-700: #920707;
  --color-danger-800: #620404;
  --color-danger-900: #310202;
  --color-info-50: #e8f0fd;
  --color-info-100: #d0e0fb;
  --color-info-200: #b5d0fc;
  --color-info-300: #84b1f9;
  --color-info-400: #5392f7;
  --color-info-500: #3b82f6;
  --color-info-600: #0b63f3;
  --color-info-700: #094fc2;
  --color-info-800: #073b91;
  --color-info-900: #042761;
  --color-gray-50: #f9fafa;
  --color-gray-100: #f1f2f4;
  --color-gray-200: #dde0e3;
  --color-gray-300: #c1c6cd;
  --color-gray-400: #8f97a3;
  --color-gray-500: #64748b;
  --color-gray-600: #627084;
  --color-gray-700: #495669;
  --color-gray-800: #29313d;
  --color-gray-900: #14181f;
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
  --color-primary-fill: #0b63f3; /* For button backgrounds with white text */
  --color-primary-text: #0b63f3; /* For links and outline buttons on light surfaces */
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #3b82f6 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #64748b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ec4899 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #3b82f6 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #64748b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #3b82f6 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ec4899 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #64748b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ec4899 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #3b82f6 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #64748b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ec4899 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #3b82f6 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #64748b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ec4899 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #3b82f6 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #3b82f6 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ec4899 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #64748b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ec4899 15%, transparent) 0px, transparent 50%);
    

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
  --border-width-hairline: 0.5px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, sans-serif;
  --font-family-body: system-ui, -apple-system, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 25px;
  --font-size-2xl: 31px;
  --font-size-3xl: 39px;
  --font-size-4xl: 49px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.5;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-max-width: 1200px;
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-breakpoints: {
        sm: 640px,
        md: 768px,
        lg: 1024px,
        xl: 1280px,
      };
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 350ms;


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
    --color-surface-base: #151313;
    --color-surface-subtle: #100e0e;
    --color-surface-elevated: #0d0c0c;
    --color-surface-sunken: #151313;
    --color-surface-overlay: #1a1818;
    --color-surface-inverse: #f3f2f2;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0d0c0c;
    --color-surface-fieldset-subtle: #1a1818;
    --color-surface-fieldset-elevated: #211f1f;
    --color-surface-fieldset-sunken: #0d0c0c;
    --color-surface-fieldset-overlay: #262323;
    --color-primary-50: #0b2146;
    --color-primary-100: #113269;
    --color-primary-200: #16438c;
    --color-primary-300: #1b54b0;
    --color-primary-400: #206ae3;
    --color-primary-500: #3378e5;
    --color-primary-600: #5a91ea;
    --color-primary-700: #80abf0;
    --color-primary-800: #bcd2f8;
    --color-primary-900: #d3e2fa;
    --color-secondary-50: #121417;
    --color-secondary-100: #1e2227;
    --color-secondary-200: #2f353e;
    --color-secondary-300: #424955;
    --color-secondary-400: #576374;
    --color-secondary-500: #616e80;
    --color-secondary-600: #758397;
    --color-secondary-700: #8e99aa;
    --color-secondary-800: #bec5cf;
    --color-secondary-900: #dbdee1;
    --color-accent-50: #440f29;
    --color-accent-100: #66163e;
    --color-accent-200: #881d52;
    --color-accent-300: #a92466;
    --color-accent-400: #d92d82;
    --color-accent-500: #db3e8c;
    --color-accent-600: #e262a2;
    --color-accent-700: #e988b7;
    --color-accent-800: #f5bfd9;
    --color-accent-900: #f6d5e6;
    --color-gray-50: #f9fafa;
    --color-gray-100: #f1f2f4;
    --color-gray-200: #dde0e3;
    --color-gray-300: #c1c6cd;
    --color-gray-400: #8f97a3;
    --color-gray-500: #64748b;
    --color-gray-600: #627084;
    --color-gray-700: #495669;
    --color-gray-800: #29313d;
    --color-gray-900: #14181f;
    --color-success-50: #052305;
    --color-success-100: #083508;
    --color-success-200: #0e580e;
    --color-success-300: #137b13;
    --color-success-400: #16ad16;
    --color-success-500: #18c018;
    --color-success-600: #20e320;
    --color-success-700: #47e747;
    --color-success-800: #90f490;
    --color-success-900: #bdf6bd;
    --color-info-50: #0b2146;
    --color-info-100: #113269;
    --color-info-200: #16438c;
    --color-info-300: #1b54b0;
    --color-info-400: #206ae3;
    --color-info-500: #3378e5;
    --color-info-600: #5a91ea;
    --color-info-700: #80abf0;
    --color-info-800: #bcd2f8;
    --color-info-900: #d3e2fa;
    --color-warning-50: #251c04;
    --color-warning-100: #493908;
    --color-warning-200: #6e560c;
    --color-warning-300: #937210;
    --color-warning-400: #c89a10;
    --color-warning-500: #ddaa12;
    --color-warning-600: #eebd2c;
    --color-warning-700: #f1ca54;
    --color-warning-800: #fae4a1;
    --color-warning-900: #fcf1d1;
    --color-danger-50: #230505;
    --color-danger-100: #470b0b;
    --color-danger-200: #6a1111;
    --color-danger-300: #8d1616;
    --color-danger-400: #c11818;
    --color-danger-500: #d31b1b;
    --color-danger-600: #e53434;
    --color-danger-700: #ea5b5b;
    --color-danger-800: #f6a6a6;
    --color-danger-900: #fad3d3;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #151313;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a1a1a1;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a1a1a1;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #100e0e;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #9f9f9f;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #9f9f9f;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0d0c0c;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9e9e9e;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9e9e9e;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #151313;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1a1818;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a3a3a3;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a3a3a3;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f3f2f2;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #206ae3; /* For button backgrounds with white text */
    --color-primary-text: #5a91ea; /* For links and outline buttons on dark surfaces */
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
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #206ae3 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #d92d82 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #206ae3 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #576374 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #576374 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #d92d82 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #d92d82 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #206ae3 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #d92d82 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #d92d82 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #151313;
  --color-surface-subtle: #100e0e;
  --color-surface-elevated: #0d0c0c;
  --color-surface-sunken: #151313;
  --color-surface-overlay: #1a1818;
  --color-surface-inverse: #f3f2f2;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0d0c0c;
  --color-surface-fieldset-subtle: #1a1818;
  --color-surface-fieldset-elevated: #211f1f;
  --color-surface-fieldset-sunken: #0d0c0c;
  --color-surface-fieldset-overlay: #262323;
  --color-primary-50: #0b2146;
  --color-primary-100: #113269;
  --color-primary-200: #16438c;
  --color-primary-300: #1b54b0;
  --color-primary-400: #206ae3;
  --color-primary-500: #3378e5;
  --color-primary-600: #5a91ea;
  --color-primary-700: #80abf0;
  --color-primary-800: #bcd2f8;
  --color-primary-900: #d3e2fa;
  --color-secondary-50: #121417;
  --color-secondary-100: #1e2227;
  --color-secondary-200: #2f353e;
  --color-secondary-300: #424955;
  --color-secondary-400: #576374;
  --color-secondary-500: #616e80;
  --color-secondary-600: #758397;
  --color-secondary-700: #8e99aa;
  --color-secondary-800: #bec5cf;
  --color-secondary-900: #dbdee1;
  --color-accent-50: #440f29;
  --color-accent-100: #66163e;
  --color-accent-200: #881d52;
  --color-accent-300: #a92466;
  --color-accent-400: #d92d82;
  --color-accent-500: #db3e8c;
  --color-accent-600: #e262a2;
  --color-accent-700: #e988b7;
  --color-accent-800: #f5bfd9;
  --color-accent-900: #f6d5e6;
  --color-gray-50: #f9fafa;
  --color-gray-100: #f1f2f4;
  --color-gray-200: #dde0e3;
  --color-gray-300: #c1c6cd;
  --color-gray-400: #8f97a3;
  --color-gray-500: #64748b;
  --color-gray-600: #627084;
  --color-gray-700: #495669;
  --color-gray-800: #29313d;
  --color-gray-900: #14181f;
  --color-success-50: #052305;
  --color-success-100: #083508;
  --color-success-200: #0e580e;
  --color-success-300: #137b13;
  --color-success-400: #16ad16;
  --color-success-500: #18c018;
  --color-success-600: #20e320;
  --color-success-700: #47e747;
  --color-success-800: #90f490;
  --color-success-900: #bdf6bd;
  --color-info-50: #0b2146;
  --color-info-100: #113269;
  --color-info-200: #16438c;
  --color-info-300: #1b54b0;
  --color-info-400: #206ae3;
  --color-info-500: #3378e5;
  --color-info-600: #5a91ea;
  --color-info-700: #80abf0;
  --color-info-800: #bcd2f8;
  --color-info-900: #d3e2fa;
  --color-warning-50: #251c04;
  --color-warning-100: #493908;
  --color-warning-200: #6e560c;
  --color-warning-300: #937210;
  --color-warning-400: #c89a10;
  --color-warning-500: #ddaa12;
  --color-warning-600: #eebd2c;
  --color-warning-700: #f1ca54;
  --color-warning-800: #fae4a1;
  --color-warning-900: #fcf1d1;
  --color-danger-50: #230505;
  --color-danger-100: #470b0b;
  --color-danger-200: #6a1111;
  --color-danger-300: #8d1616;
  --color-danger-400: #c11818;
  --color-danger-500: #d31b1b;
  --color-danger-600: #e53434;
  --color-danger-700: #ea5b5b;
  --color-danger-800: #f6a6a6;
  --color-danger-900: #fad3d3;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #151313;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a1a1a1;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a1a1a1;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #100e0e;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #9f9f9f;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #9f9f9f;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0d0c0c;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9e9e9e;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9e9e9e;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #151313;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1a1818;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a3a3a3;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a3a3a3;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f3f2f2;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #206ae3 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #d92d82 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #206ae3 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #576374 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #576374 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #d92d82 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #d92d82 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #206ae3 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #d92d82 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #d92d82 10%, transparent) 0px, transparent 50%);
    }
`);

export const tokensCSS = `@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f0fd;
  --color-primary-100: #d0e0fb;
  --color-primary-200: #b5d0fc;
  --color-primary-300: #84b1f9;
  --color-primary-400: #5392f7;
  --color-primary-500: #3b82f6;
  --color-primary-600: #0b63f3;
  --color-primary-700: #094fc2;
  --color-primary-800: #073b91;
  --color-primary-900: #042761;
  --color-secondary-50: #e8eaec;
  --color-secondary-100: #cad0d8;
  --color-secondary-200: #acb5c3;
  --color-secondary-300: #8e9bae;
  --color-secondary-400: #708198;
  --color-secondary-500: #64748b;
  --color-secondary-600: #4f5b6d;
  --color-secondary-700: #394250;
  --color-secondary-800: #242a32;
  --color-secondary-900: #15191e;
  --color-accent-50: #fbe9f2;
  --color-accent-100: #f9d2e5;
  --color-accent-200: #f8bad8;
  --color-accent-300: #f38bbf;
  --color-accent-400: #ee5da5;
  --color-accent-500: #ec4899;
  --color-accent-600: #e71a7f;
  --color-accent-700: #bb1366;
  --color-accent-800: #8c0f4d;
  --color-accent-900: #5e0a33;
  --color-success-50: #d0fad0;
  --color-success-100: #a0f8a0;
  --color-success-200: #6cf86c;
  --color-success-300: #3bf63b;
  --color-success-400: #0bf30b;
  --color-success-500: #0adb0a;
  --color-success-600: #08aa08;
  --color-success-700: #067906;
  --color-success-800: #034903;
  --color-success-900: #023102;
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
  --color-danger-50: #fde8e8;
  --color-danger-100: #fab8b8;
  --color-danger-200: #f98585;
  --color-danger-300: #f75454;
  --color-danger-400: #f52323;
  --color-danger-500: #f40b0b;
  --color-danger-600: #c30909;
  --color-danger-700: #920707;
  --color-danger-800: #620404;
  --color-danger-900: #310202;
  --color-info-50: #e8f0fd;
  --color-info-100: #d0e0fb;
  --color-info-200: #b5d0fc;
  --color-info-300: #84b1f9;
  --color-info-400: #5392f7;
  --color-info-500: #3b82f6;
  --color-info-600: #0b63f3;
  --color-info-700: #094fc2;
  --color-info-800: #073b91;
  --color-info-900: #042761;
  --color-gray-50: #f9fafa;
  --color-gray-100: #f1f2f4;
  --color-gray-200: #dde0e3;
  --color-gray-300: #c1c6cd;
  --color-gray-400: #8f97a3;
  --color-gray-500: #64748b;
  --color-gray-600: #627084;
  --color-gray-700: #495669;
  --color-gray-800: #29313d;
  --color-gray-900: #14181f;
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
  --color-primary-fill: #0b63f3; /* For button backgrounds with white text */
  --color-primary-text: #0b63f3; /* For links and outline buttons on light surfaces */
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #3b82f6 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #64748b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ec4899 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #3b82f6 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #64748b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #3b82f6 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ec4899 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #64748b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ec4899 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #3b82f6 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #64748b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ec4899 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #3b82f6 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #64748b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ec4899 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #3b82f6 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #3b82f6 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ec4899 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #64748b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ec4899 15%, transparent) 0px, transparent 50%);
    

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
  --border-width-hairline: 0.5px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, sans-serif;
  --font-family-body: system-ui, -apple-system, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 25px;
  --font-size-2xl: 31px;
  --font-size-3xl: 39px;
  --font-size-4xl: 49px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.5;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-max-width: 1200px;
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-breakpoints: {
        sm: 640px,
        md: 768px,
        lg: 1024px,
        xl: 1280px,
      };
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 350ms;


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
    --color-surface-base: #151313;
    --color-surface-subtle: #100e0e;
    --color-surface-elevated: #0d0c0c;
    --color-surface-sunken: #151313;
    --color-surface-overlay: #1a1818;
    --color-surface-inverse: #f3f2f2;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0d0c0c;
    --color-surface-fieldset-subtle: #1a1818;
    --color-surface-fieldset-elevated: #211f1f;
    --color-surface-fieldset-sunken: #0d0c0c;
    --color-surface-fieldset-overlay: #262323;
    --color-primary-50: #0b2146;
    --color-primary-100: #113269;
    --color-primary-200: #16438c;
    --color-primary-300: #1b54b0;
    --color-primary-400: #206ae3;
    --color-primary-500: #3378e5;
    --color-primary-600: #5a91ea;
    --color-primary-700: #80abf0;
    --color-primary-800: #bcd2f8;
    --color-primary-900: #d3e2fa;
    --color-secondary-50: #121417;
    --color-secondary-100: #1e2227;
    --color-secondary-200: #2f353e;
    --color-secondary-300: #424955;
    --color-secondary-400: #576374;
    --color-secondary-500: #616e80;
    --color-secondary-600: #758397;
    --color-secondary-700: #8e99aa;
    --color-secondary-800: #bec5cf;
    --color-secondary-900: #dbdee1;
    --color-accent-50: #440f29;
    --color-accent-100: #66163e;
    --color-accent-200: #881d52;
    --color-accent-300: #a92466;
    --color-accent-400: #d92d82;
    --color-accent-500: #db3e8c;
    --color-accent-600: #e262a2;
    --color-accent-700: #e988b7;
    --color-accent-800: #f5bfd9;
    --color-accent-900: #f6d5e6;
    --color-gray-50: #f9fafa;
    --color-gray-100: #f1f2f4;
    --color-gray-200: #dde0e3;
    --color-gray-300: #c1c6cd;
    --color-gray-400: #8f97a3;
    --color-gray-500: #64748b;
    --color-gray-600: #627084;
    --color-gray-700: #495669;
    --color-gray-800: #29313d;
    --color-gray-900: #14181f;
    --color-success-50: #052305;
    --color-success-100: #083508;
    --color-success-200: #0e580e;
    --color-success-300: #137b13;
    --color-success-400: #16ad16;
    --color-success-500: #18c018;
    --color-success-600: #20e320;
    --color-success-700: #47e747;
    --color-success-800: #90f490;
    --color-success-900: #bdf6bd;
    --color-info-50: #0b2146;
    --color-info-100: #113269;
    --color-info-200: #16438c;
    --color-info-300: #1b54b0;
    --color-info-400: #206ae3;
    --color-info-500: #3378e5;
    --color-info-600: #5a91ea;
    --color-info-700: #80abf0;
    --color-info-800: #bcd2f8;
    --color-info-900: #d3e2fa;
    --color-warning-50: #251c04;
    --color-warning-100: #493908;
    --color-warning-200: #6e560c;
    --color-warning-300: #937210;
    --color-warning-400: #c89a10;
    --color-warning-500: #ddaa12;
    --color-warning-600: #eebd2c;
    --color-warning-700: #f1ca54;
    --color-warning-800: #fae4a1;
    --color-warning-900: #fcf1d1;
    --color-danger-50: #230505;
    --color-danger-100: #470b0b;
    --color-danger-200: #6a1111;
    --color-danger-300: #8d1616;
    --color-danger-400: #c11818;
    --color-danger-500: #d31b1b;
    --color-danger-600: #e53434;
    --color-danger-700: #ea5b5b;
    --color-danger-800: #f6a6a6;
    --color-danger-900: #fad3d3;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #151313;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a1a1a1;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a1a1a1;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #100e0e;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #9f9f9f;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #9f9f9f;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0d0c0c;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9e9e9e;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9e9e9e;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #151313;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1a1818;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a3a3a3;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a3a3a3;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f3f2f2;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #206ae3; /* For button backgrounds with white text */
    --color-primary-text: #5a91ea; /* For links and outline buttons on dark surfaces */
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
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #206ae3 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #d92d82 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #206ae3 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #576374 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #576374 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #d92d82 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #d92d82 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #206ae3 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #d92d82 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #d92d82 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #151313;
  --color-surface-subtle: #100e0e;
  --color-surface-elevated: #0d0c0c;
  --color-surface-sunken: #151313;
  --color-surface-overlay: #1a1818;
  --color-surface-inverse: #f3f2f2;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0d0c0c;
  --color-surface-fieldset-subtle: #1a1818;
  --color-surface-fieldset-elevated: #211f1f;
  --color-surface-fieldset-sunken: #0d0c0c;
  --color-surface-fieldset-overlay: #262323;
  --color-primary-50: #0b2146;
  --color-primary-100: #113269;
  --color-primary-200: #16438c;
  --color-primary-300: #1b54b0;
  --color-primary-400: #206ae3;
  --color-primary-500: #3378e5;
  --color-primary-600: #5a91ea;
  --color-primary-700: #80abf0;
  --color-primary-800: #bcd2f8;
  --color-primary-900: #d3e2fa;
  --color-secondary-50: #121417;
  --color-secondary-100: #1e2227;
  --color-secondary-200: #2f353e;
  --color-secondary-300: #424955;
  --color-secondary-400: #576374;
  --color-secondary-500: #616e80;
  --color-secondary-600: #758397;
  --color-secondary-700: #8e99aa;
  --color-secondary-800: #bec5cf;
  --color-secondary-900: #dbdee1;
  --color-accent-50: #440f29;
  --color-accent-100: #66163e;
  --color-accent-200: #881d52;
  --color-accent-300: #a92466;
  --color-accent-400: #d92d82;
  --color-accent-500: #db3e8c;
  --color-accent-600: #e262a2;
  --color-accent-700: #e988b7;
  --color-accent-800: #f5bfd9;
  --color-accent-900: #f6d5e6;
  --color-gray-50: #f9fafa;
  --color-gray-100: #f1f2f4;
  --color-gray-200: #dde0e3;
  --color-gray-300: #c1c6cd;
  --color-gray-400: #8f97a3;
  --color-gray-500: #64748b;
  --color-gray-600: #627084;
  --color-gray-700: #495669;
  --color-gray-800: #29313d;
  --color-gray-900: #14181f;
  --color-success-50: #052305;
  --color-success-100: #083508;
  --color-success-200: #0e580e;
  --color-success-300: #137b13;
  --color-success-400: #16ad16;
  --color-success-500: #18c018;
  --color-success-600: #20e320;
  --color-success-700: #47e747;
  --color-success-800: #90f490;
  --color-success-900: #bdf6bd;
  --color-info-50: #0b2146;
  --color-info-100: #113269;
  --color-info-200: #16438c;
  --color-info-300: #1b54b0;
  --color-info-400: #206ae3;
  --color-info-500: #3378e5;
  --color-info-600: #5a91ea;
  --color-info-700: #80abf0;
  --color-info-800: #bcd2f8;
  --color-info-900: #d3e2fa;
  --color-warning-50: #251c04;
  --color-warning-100: #493908;
  --color-warning-200: #6e560c;
  --color-warning-300: #937210;
  --color-warning-400: #c89a10;
  --color-warning-500: #ddaa12;
  --color-warning-600: #eebd2c;
  --color-warning-700: #f1ca54;
  --color-warning-800: #fae4a1;
  --color-warning-900: #fcf1d1;
  --color-danger-50: #230505;
  --color-danger-100: #470b0b;
  --color-danger-200: #6a1111;
  --color-danger-300: #8d1616;
  --color-danger-400: #c11818;
  --color-danger-500: #d31b1b;
  --color-danger-600: #e53434;
  --color-danger-700: #ea5b5b;
  --color-danger-800: #f6a6a6;
  --color-danger-900: #fad3d3;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #151313;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a1a1a1;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a1a1a1;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #100e0e;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #9f9f9f;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #9f9f9f;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0d0c0c;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9e9e9e;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9e9e9e;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #151313;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1a1818;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a3a3a3;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a3a3a3;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f3f2f2;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #206ae3 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #d92d82 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #206ae3 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #576374 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #576374 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #d92d82 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #d92d82 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #206ae3 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #576374 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #d92d82 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #206ae3 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #206ae3 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #d92d82 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #576374 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #d92d82 10%, transparent) 0px, transparent 50%);
    }
`;
