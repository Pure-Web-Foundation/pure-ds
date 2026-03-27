// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #95dbee;
  --color-primary-100: #65ceeb;
  --color-primary-200: #32c3eb;
  --color-primary-300: #15acd6;
  --color-primary-400: #1087a7;
  --color-primary-500: #0e7490;
  --color-primary-600: #0b5e74;
  --color-primary-700: #094b5d;
  --color-primary-800: #073846;
  --color-primary-900: #05252e;
  --color-secondary-50: #f4f2f1;
  --color-secondary-100: #e9e4e2;
  --color-secondary-200: #ddd7d5;
  --color-secondary-300: #c6bdb9;
  --color-secondary-400: #afa29c;
  --color-secondary-500: #a99b95;
  --color-secondary-600: #928079;
  --color-secondary-700: #776761;
  --color-secondary-800: #5b4f4a;
  --color-secondary-900: #3f3733;
  --color-accent-50: #fbeaef;
  --color-accent-100: #f8d3de;
  --color-accent-200: #f4b2c5;
  --color-accent-300: #ee85a4;
  --color-accent-400: #e85882;
  --color-accent-500: #e54271;
  --color-accent-600: #d61e53;
  --color-accent-700: #aa1742;
  --color-accent-800: #7d1130;
  --color-accent-900: #500b1f;
  --color-success-50: #d3f8d3;
  --color-success-100: #a4f3a4;
  --color-success-200: #73f273;
  --color-success-300: #44ed44;
  --color-success-400: #16e816;
  --color-success-500: #14d114;
  --color-success-600: #10a210;
  --color-success-700: #0b740b;
  --color-success-800: #074607;
  --color-success-900: #042f04;
  --color-warning-50: #fae39f;
  --color-warning-100: #fbd76a;
  --color-warning-200: #ffcc33;
  --color-warning-300: #ffbf00;
  --color-warning-400: #cc9900;
  --color-warning-500: #B38600;
  --color-warning-600: #806000;
  --color-warning-700: #664c00;
  --color-warning-800: #4d3900;
  --color-warning-900: #332600;
  --color-danger-50: #fbe9e9;
  --color-danger-100: #f6bbbb;
  --color-danger-200: #f38b8b;
  --color-danger-300: #ef5d5d;
  --color-danger-400: #ea2e2e;
  --color-danger-500: #e81717;
  --color-danger-600: #ba1212;
  --color-danger-700: #8b0e0e;
  --color-danger-800: #5d0909;
  --color-danger-900: #2e0505;
  --color-info-50: #95dbee;
  --color-info-100: #65ceeb;
  --color-info-200: #32c3eb;
  --color-info-300: #15acd6;
  --color-info-400: #1087a7;
  --color-info-500: #0e7490;
  --color-info-600: #0b5e74;
  --color-info-700: #094b5d;
  --color-info-800: #073846;
  --color-info-900: #05252e;
  --color-gray-50: #fafaf9;
  --color-gray-100: #f4f2f1;
  --color-gray-200: #e3dfdd;
  --color-gray-300: #cdc5c1;
  --color-gray-400: #a3958f;
  --color-gray-500: #a99b95;
  --color-gray-600: #846c62;
  --color-gray-700: #695349;
  --color-gray-800: #3d2f29;
  --color-gray-900: #1f1714;
  --color-surface-base: #e7e6de;
  --color-surface-subtle: #e3e2d8;
  --color-surface-elevated: #deddd2;
  --color-surface-sunken: #dad9cc;
  --color-surface-overlay: #ebeae4;
  --color-surface-inverse: #191810;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #e3e2d8;
  --color-surface-fieldset-subtle: #deddd2;
  --color-surface-fieldset-elevated: #dad9cc;
  --color-surface-fieldset-sunken: #d1d0c0;
  --color-surface-fieldset-overlay: #deddd2;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #e7e6de;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #5c5c59;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #5c5c59;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #e3e2d8;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #5b5a56;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #5b5a56;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #deddd2;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #595854;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #595854;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #dad9cc;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #575752;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #575752;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #ebeae4;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #5e5e5b;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #5e5e5b;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #191810;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a3a39f;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a3a39f;
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
  --color-primary-fill: #0b5e74; /* For button backgrounds with white text */
  --color-primary-fill-hover: #0a5568;
  --color-primary-fill-active: #094b5d;
  --color-primary-text: #0b5e74; /* For links and outline buttons on light surfaces */
  --color-primary-text-hover: #0b5e74;
  --color-primary-text-visited: #377989;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #0b5e74;
  --color-selection-bg: #0b5e74;
  --color-selection-text: #ffffff;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors */
  --color-accent-fill: #d61e53;
  --color-accent-fill-hover: #c11b4b;
  --color-accent-fill-active: #ab1842;
  --color-accent-text: #aa1742;
  --color-accent-text-hover: #aa1742;
  /* Surface-Aware Accent Text Tokens */
  --surface-base-accent-text: #aa1742;
  --surface-base-accent-text-hover: #aa1742;
  --surface-subtle-accent-text: #aa1742;
  --surface-subtle-accent-text-hover: #aa1742;
  --surface-elevated-accent-text: #aa1742;
  --surface-elevated-accent-text-hover: #aa1742;
  --surface-sunken-accent-text: #aa1742;
  --surface-sunken-accent-text-hover: #aa1742;
  --surface-overlay-accent-text: #aa1742;
  --surface-overlay-accent-text-hover: #aa1742;
  --surface-inverse-accent-text: #e54271;
  --surface-inverse-accent-text-hover: #e85882;
  /* Danger Role Colors */
  --color-danger-fill: #ba1212;
  --color-danger-fill-hover: #a71010;
  --color-danger-fill-active: #950e0e;
  --color-danger-text: #ba1212;
  --color-danger-text-hover: #8b0e0e;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors */
  --color-success-fill: #0b740b;
  --color-success-fill-hover: #0a680a;
  --color-success-fill-active: #095d09;
  --color-success-text: #0b740b;
  --color-success-text-hover: #074607;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors */
  --color-warning-fill: #806000;
  --color-warning-fill-hover: #735600;
  --color-warning-fill-active: #664d00;
  --color-warning-text: #806000;
  --color-warning-text-hover: #664c00;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors */
  --color-info-fill: #0b5e74;
  --color-info-fill-hover: #0a5568;
  --color-info-fill-active: #094b5d;
  --color-info-text: #0b5e74;
  --color-info-text-hover: #0b5e74;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens */
  --surface-base-success-text: #0b740b;
  --surface-base-success-text-hover: #074607;
  --surface-subtle-success-text: #0b740b;
  --surface-subtle-success-text-hover: #074607;
  --surface-elevated-success-text: #074607;
  --surface-elevated-success-text-hover: #074607;
  --surface-sunken-success-text: #074607;
  --surface-sunken-success-text-hover: #074607;
  --surface-overlay-success-text: #0b740b;
  --surface-overlay-success-text-hover: #074607;
  --surface-inverse-success-text: #10a210;
  --surface-inverse-success-text-hover: #10a210;
  --surface-base-warning-text: #806000;
  --surface-base-warning-text-hover: #664c00;
  --surface-subtle-warning-text: #664c00;
  --surface-subtle-warning-text-hover: #664c00;
  --surface-elevated-warning-text: #664c00;
  --surface-elevated-warning-text-hover: #664c00;
  --surface-sunken-warning-text: #664c00;
  --surface-sunken-warning-text-hover: #664c00;
  --surface-overlay-warning-text: #806000;
  --surface-overlay-warning-text-hover: #664c00;
  --surface-inverse-warning-text: #B38600;
  --surface-inverse-warning-text-hover: #B38600;
  --surface-base-info-text: #0b5e74;
  --surface-base-info-text-hover: #0b5e74;
  --surface-subtle-info-text: #0b5e74;
  --surface-subtle-info-text-hover: #0b5e74;
  --surface-elevated-info-text: #0b5e74;
  --surface-elevated-info-text-hover: #0b5e74;
  --surface-sunken-info-text: #0b5e74;
  --surface-sunken-info-text-hover: #0b5e74;
  --surface-overlay-info-text: #0b5e74;
  --surface-overlay-info-text-hover: #0b5e74;
  --surface-inverse-info-text: #15acd6;
  --surface-inverse-info-text-hover: #15acd6;
  --surface-base-danger-text: #ba1212;
  --surface-base-danger-text-hover: #ba1212;
  --surface-subtle-danger-text: #ba1212;
  --surface-subtle-danger-text-hover: #ba1212;
  --surface-elevated-danger-text: #ba1212;
  --surface-elevated-danger-text-hover: #8b0e0e;
  --surface-sunken-danger-text: #ba1212;
  --surface-sunken-danger-text-hover: #8b0e0e;
  --surface-overlay-danger-text: #ba1212;
  --surface-overlay-danger-text-hover: #ba1212;
  --surface-inverse-danger-text: #ef5d5d;
  --surface-inverse-danger-text-hover: #ef5d5d;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #0e7490 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e54271 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #0e7490 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a99b95 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #0e7490 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a99b95 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e54271 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #0e7490 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e54271 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #0e7490 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #0e7490 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #0e7490 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e54271 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e54271 15%, transparent) 0px, transparent 50%);
    

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
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 1px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 16px;
  --font-size-lg: 19px;
  --font-size-xl: 23px;
  --font-size-2xl: 28px;
  --font-size-3xl: 33px;
  --font-size-4xl: 40px;
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
  --layout-min-height: 100vh;
  --layout-container-padding: var(--spacing-6);
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
  --icon-size-3xl: 96px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #16171a;
    --color-surface-subtle: #111214;
    --color-surface-elevated: #0d0d0f;
    --color-surface-sunken: #131416;
    --color-surface-overlay: #1b1c20;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0d0d0f;
    --color-surface-fieldset-subtle: #1b1c20;
    --color-surface-fieldset-elevated: #1f1f24;
    --color-surface-fieldset-sunken: #0d0d0f;
    --color-surface-fieldset-overlay: #25272c;
    --color-primary-50: #c5f2fa;
    --color-primary-100: #93eaf9;
    --color-primary-200: #5fe4fa;
    --color-primary-300: #2ddbf9;
    --color-primary-400: #07cbed;
    --color-primary-500: #06b6d4;
    --color-primary-600: #058ba2;
    --color-primary-700: #036171;
    --color-primary-800: #02404a;
    --color-primary-900: #012b32;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #cfd1d5;
    --color-secondary-300: #b4b8bd;
    --color-secondary-400: #999ea5;
    --color-secondary-500: #8b9199;
    --color-secondary-600: #717780;
    --color-secondary-700: #595e65;
    --color-secondary-800: #41454a;
    --color-secondary-900: #292c2f;
    --color-accent-50: #fbeaef;
    --color-accent-100: #f8d3de;
    --color-accent-200: #f4b2c5;
    --color-accent-300: #ee85a4;
    --color-accent-400: #e85882;
    --color-accent-500: #e54271;
    --color-accent-600: #d61e53;
    --color-accent-700: #aa1742;
    --color-accent-800: #7d1130;
    --color-accent-900: #500b1f;
    --color-gray-50: #fafafa;
    --color-gray-100: #f1f2f3;
    --color-gray-200: #dee0e2;
    --color-gray-300: #c3c6cb;
    --color-gray-400: #9298a0;
    --color-gray-500: #8b9199;
    --color-gray-600: #667180;
    --color-gray-700: #4c5766;
    --color-gray-800: #2b323b;
    --color-gray-900: #15191e;
    --color-success-50: #d3f8d3;
    --color-success-100: #a4f3a4;
    --color-success-200: #73f273;
    --color-success-300: #44ed44;
    --color-success-400: #16e816;
    --color-success-500: #14d114;
    --color-success-600: #10a210;
    --color-success-700: #0b740b;
    --color-success-800: #074607;
    --color-success-900: #042f04;
    --color-info-50: #95dbee;
    --color-info-100: #65ceeb;
    --color-info-200: #32c3eb;
    --color-info-300: #15acd6;
    --color-info-400: #1087a7;
    --color-info-500: #0e7490;
    --color-info-600: #0b5e74;
    --color-info-700: #094b5d;
    --color-info-800: #073846;
    --color-info-900: #05252e;
    --color-warning-50: #fae39f;
    --color-warning-100: #fbd76a;
    --color-warning-200: #ffcc33;
    --color-warning-300: #ffbf00;
    --color-warning-400: #cc9900;
    --color-warning-500: #B38600;
    --color-warning-600: #806000;
    --color-warning-700: #664c00;
    --color-warning-800: #4d3900;
    --color-warning-900: #332600;
    --color-danger-50: #fbe9e9;
    --color-danger-100: #f6bbbb;
    --color-danger-200: #f38b8b;
    --color-danger-300: #ef5d5d;
    --color-danger-400: #ea2e2e;
    --color-danger-500: #e81717;
    --color-danger-600: #ba1212;
    --color-danger-700: #8b0e0e;
    --color-danger-800: #5d0909;
    --color-danger-900: #2e0505;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #16171a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a2a2a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a2a2a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #111214;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a0a0a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a0a0a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0d0d0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9e9e9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9e9e9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #131416;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a2;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a2;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1b1c20;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a4a4a6;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a4a4a6;
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

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.125);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.125);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.125);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.125);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-500);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #036171;
    --color-primary-fill-hover: #0592ab;
    --color-primary-fill-active: #04788c;
    --color-primary-text: #06b6d4;
    --color-primary-text-hover: #06b6d4;
    --color-primary-text-visited: #0996af;
    --color-primary-contrast: #ffffff;
    --color-focus-ring: #058ba2;
    --color-selection-bg: #06b6d4;
    --color-selection-text: #000000;
    --color-link: var(--color-primary-text);
    --color-link-hover: var(--color-primary-text-hover);
    --color-link-visited: var(--color-primary-text-visited);
    /* Accent Role Colors (dark mode) */
    --color-accent-fill: #d61e53;
    --color-accent-fill-hover: #e3396a;
    --color-accent-fill-active: #e1265c;
    --color-accent-text: #e54271;
    --color-accent-text-hover: #ee85a4;
    /* Surface-Aware Accent Text Tokens (dark mode) */
    --surface-base-accent-text: #e54271;
    --surface-base-accent-text-hover: #e85882;
    --surface-subtle-accent-text: #e54271;
    --surface-subtle-accent-text-hover: #e85882;
    --surface-elevated-accent-text: #e54271;
    --surface-elevated-accent-text-hover: #e85882;
    --surface-sunken-accent-text: #e54271;
    --surface-sunken-accent-text-hover: #e85882;
    --surface-overlay-accent-text: #e85882;
    --surface-overlay-accent-text-hover: #ee85a4;
    --surface-inverse-accent-text: #d61e53;
    --surface-inverse-accent-text-hover: #aa1742;
    /* Danger Role Colors (dark mode) */
    --color-danger-fill: #ba1212;
    --color-danger-fill-hover: #e41616;
    --color-danger-fill-active: #ce1414;
    --color-danger-text: #ef5d5d;
    --color-danger-text-hover: #f38b8b;
    --color-danger-contrast: #ffffff;
    /* Success Role Colors (dark mode) */
    --color-success-fill: #0b740b;
    --color-success-fill-hover: #10a810;
    --color-success-fill-active: #0d8c0d;
    --color-success-text: #10a210;
    --color-success-text-hover: #14d114;
    --color-success-contrast: #ffffff;
    /* Warning Role Colors (dark mode) */
    --color-warning-fill: #806000;
    --color-warning-fill-hover: #b98b00;
    --color-warning-fill-active: #9b7400;
    --color-warning-text: #B38600;
    --color-warning-text-hover: #cc9900;
    --color-warning-contrast: #ffffff;
    /* Info Role Colors (dark mode) */
    --color-info-fill: #0b5e74;
    --color-info-fill-hover: #1089a8;
    --color-info-fill-active: #0d728c;
    --color-info-text: #15acd6;
    --color-info-text-hover: #15acd6;
    --color-info-contrast: #ffffff;
    /* Surface-Aware Status Text Tokens (dark mode) */
    --surface-base-success-text: #10a210;
    --surface-base-success-text-hover: #10a210;
    --surface-subtle-success-text: #10a210;
    --surface-subtle-success-text-hover: #10a210;
    --surface-elevated-success-text: #10a210;
    --surface-elevated-success-text-hover: #10a210;
    --surface-sunken-success-text: #10a210;
    --surface-sunken-success-text-hover: #10a210;
    --surface-overlay-success-text: #10a210;
    --surface-overlay-success-text-hover: #10a210;
    --surface-inverse-success-text: #0b740b;
    --surface-inverse-success-text-hover: #0b740b;
    --surface-base-warning-text: #B38600;
    --surface-base-warning-text-hover: #B38600;
    --surface-subtle-warning-text: #B38600;
    --surface-subtle-warning-text-hover: #B38600;
    --surface-elevated-warning-text: #B38600;
    --surface-elevated-warning-text-hover: #B38600;
    --surface-sunken-warning-text: #B38600;
    --surface-sunken-warning-text-hover: #B38600;
    --surface-overlay-warning-text: #B38600;
    --surface-overlay-warning-text-hover: #B38600;
    --surface-inverse-warning-text: #806000;
    --surface-inverse-warning-text-hover: #806000;
    --surface-base-info-text: #15acd6;
    --surface-base-info-text-hover: #15acd6;
    --surface-subtle-info-text: #1087a7;
    --surface-subtle-info-text-hover: #15acd6;
    --surface-elevated-info-text: #1087a7;
    --surface-elevated-info-text-hover: #15acd6;
    --surface-sunken-info-text: #15acd6;
    --surface-sunken-info-text-hover: #15acd6;
    --surface-overlay-info-text: #15acd6;
    --surface-overlay-info-text-hover: #15acd6;
    --surface-inverse-info-text: #0b5e74;
    --surface-inverse-info-text-hover: #0b5e74;
    --surface-base-danger-text: #ef5d5d;
    --surface-base-danger-text-hover: #ef5d5d;
    --surface-subtle-danger-text: #ef5d5d;
    --surface-subtle-danger-text-hover: #ef5d5d;
    --surface-elevated-danger-text: #ea2e2e;
    --surface-elevated-danger-text-hover: #ef5d5d;
    --surface-sunken-danger-text: #ef5d5d;
    --surface-sunken-danger-text-hover: #ef5d5d;
    --surface-overlay-danger-text: #ef5d5d;
    --surface-overlay-danger-text-hover: #ef5d5d;
    --surface-inverse-danger-text: #ba1212;
    --surface-inverse-danger-text-hover: #ba1212;
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
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #07cbed 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #e85882 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #07cbed 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e85882 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #e85882 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #07cbed 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #e85882 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #e85882 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #16171a;
  --color-surface-subtle: #111214;
  --color-surface-elevated: #0d0d0f;
  --color-surface-sunken: #131416;
  --color-surface-overlay: #1b1c20;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0d0d0f;
  --color-surface-fieldset-subtle: #1b1c20;
  --color-surface-fieldset-elevated: #1f1f24;
  --color-surface-fieldset-sunken: #0d0d0f;
  --color-surface-fieldset-overlay: #25272c;
  --color-primary-50: #c5f2fa;
  --color-primary-100: #93eaf9;
  --color-primary-200: #5fe4fa;
  --color-primary-300: #2ddbf9;
  --color-primary-400: #07cbed;
  --color-primary-500: #06b6d4;
  --color-primary-600: #058ba2;
  --color-primary-700: #036171;
  --color-primary-800: #02404a;
  --color-primary-900: #012b32;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #cfd1d5;
  --color-secondary-300: #b4b8bd;
  --color-secondary-400: #999ea5;
  --color-secondary-500: #8b9199;
  --color-secondary-600: #717780;
  --color-secondary-700: #595e65;
  --color-secondary-800: #41454a;
  --color-secondary-900: #292c2f;
  --color-accent-50: #fbeaef;
  --color-accent-100: #f8d3de;
  --color-accent-200: #f4b2c5;
  --color-accent-300: #ee85a4;
  --color-accent-400: #e85882;
  --color-accent-500: #e54271;
  --color-accent-600: #d61e53;
  --color-accent-700: #aa1742;
  --color-accent-800: #7d1130;
  --color-accent-900: #500b1f;
  --color-gray-50: #fafafa;
  --color-gray-100: #f1f2f3;
  --color-gray-200: #dee0e2;
  --color-gray-300: #c3c6cb;
  --color-gray-400: #9298a0;
  --color-gray-500: #8b9199;
  --color-gray-600: #667180;
  --color-gray-700: #4c5766;
  --color-gray-800: #2b323b;
  --color-gray-900: #15191e;
  --color-success-50: #d3f8d3;
  --color-success-100: #a4f3a4;
  --color-success-200: #73f273;
  --color-success-300: #44ed44;
  --color-success-400: #16e816;
  --color-success-500: #14d114;
  --color-success-600: #10a210;
  --color-success-700: #0b740b;
  --color-success-800: #074607;
  --color-success-900: #042f04;
  --color-info-50: #95dbee;
  --color-info-100: #65ceeb;
  --color-info-200: #32c3eb;
  --color-info-300: #15acd6;
  --color-info-400: #1087a7;
  --color-info-500: #0e7490;
  --color-info-600: #0b5e74;
  --color-info-700: #094b5d;
  --color-info-800: #073846;
  --color-info-900: #05252e;
  --color-warning-50: #fae39f;
  --color-warning-100: #fbd76a;
  --color-warning-200: #ffcc33;
  --color-warning-300: #ffbf00;
  --color-warning-400: #cc9900;
  --color-warning-500: #B38600;
  --color-warning-600: #806000;
  --color-warning-700: #664c00;
  --color-warning-800: #4d3900;
  --color-warning-900: #332600;
  --color-danger-50: #fbe9e9;
  --color-danger-100: #f6bbbb;
  --color-danger-200: #f38b8b;
  --color-danger-300: #ef5d5d;
  --color-danger-400: #ea2e2e;
  --color-danger-500: #e81717;
  --color-danger-600: #ba1212;
  --color-danger-700: #8b0e0e;
  --color-danger-800: #5d0909;
  --color-danger-900: #2e0505;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #16171a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a2a2a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a2a2a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #111214;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a0a0a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a0a0a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0d0d0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9e9e9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9e9e9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #131416;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a2;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a2;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1b1c20;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a4a4a6;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a4a4a6;
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

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.125);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.125);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.125);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.125);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Interactive Colors - optimized for specific use cases (dark mode) */
  --color-primary-fill: #036171;
  --color-primary-fill-hover: #0592ab;
  --color-primary-fill-active: #04788c;
  --color-primary-text: #06b6d4;
  --color-primary-text-hover: #06b6d4;
  --color-primary-text-visited: #0996af;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #058ba2;
  --color-selection-bg: #06b6d4;
  --color-selection-text: #000000;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors (dark mode) */
  --color-accent-fill: #d61e53;
  --color-accent-fill-hover: #e3396a;
  --color-accent-fill-active: #e1265c;
  --color-accent-text: #e54271;
  --color-accent-text-hover: #ee85a4;
  /* Surface-Aware Accent Text Tokens (dark mode) */
  --surface-base-accent-text: #e54271;
  --surface-base-accent-text-hover: #e85882;
  --surface-subtle-accent-text: #e54271;
  --surface-subtle-accent-text-hover: #e85882;
  --surface-elevated-accent-text: #e54271;
  --surface-elevated-accent-text-hover: #e85882;
  --surface-sunken-accent-text: #e54271;
  --surface-sunken-accent-text-hover: #e85882;
  --surface-overlay-accent-text: #e85882;
  --surface-overlay-accent-text-hover: #ee85a4;
  --surface-inverse-accent-text: #d61e53;
  --surface-inverse-accent-text-hover: #aa1742;
  /* Danger Role Colors (dark mode) */
  --color-danger-fill: #ba1212;
  --color-danger-fill-hover: #e41616;
  --color-danger-fill-active: #ce1414;
  --color-danger-text: #ef5d5d;
  --color-danger-text-hover: #f38b8b;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors (dark mode) */
  --color-success-fill: #0b740b;
  --color-success-fill-hover: #10a810;
  --color-success-fill-active: #0d8c0d;
  --color-success-text: #10a210;
  --color-success-text-hover: #14d114;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors (dark mode) */
  --color-warning-fill: #806000;
  --color-warning-fill-hover: #b98b00;
  --color-warning-fill-active: #9b7400;
  --color-warning-text: #B38600;
  --color-warning-text-hover: #cc9900;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors (dark mode) */
  --color-info-fill: #0b5e74;
  --color-info-fill-hover: #1089a8;
  --color-info-fill-active: #0d728c;
  --color-info-text: #15acd6;
  --color-info-text-hover: #15acd6;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens (dark mode) */
  --surface-base-success-text: #10a210;
  --surface-base-success-text-hover: #10a210;
  --surface-subtle-success-text: #10a210;
  --surface-subtle-success-text-hover: #10a210;
  --surface-elevated-success-text: #10a210;
  --surface-elevated-success-text-hover: #10a210;
  --surface-sunken-success-text: #10a210;
  --surface-sunken-success-text-hover: #10a210;
  --surface-overlay-success-text: #10a210;
  --surface-overlay-success-text-hover: #10a210;
  --surface-inverse-success-text: #0b740b;
  --surface-inverse-success-text-hover: #0b740b;
  --surface-base-warning-text: #B38600;
  --surface-base-warning-text-hover: #B38600;
  --surface-subtle-warning-text: #B38600;
  --surface-subtle-warning-text-hover: #B38600;
  --surface-elevated-warning-text: #B38600;
  --surface-elevated-warning-text-hover: #B38600;
  --surface-sunken-warning-text: #B38600;
  --surface-sunken-warning-text-hover: #B38600;
  --surface-overlay-warning-text: #B38600;
  --surface-overlay-warning-text-hover: #B38600;
  --surface-inverse-warning-text: #806000;
  --surface-inverse-warning-text-hover: #806000;
  --surface-base-info-text: #15acd6;
  --surface-base-info-text-hover: #15acd6;
  --surface-subtle-info-text: #1087a7;
  --surface-subtle-info-text-hover: #15acd6;
  --surface-elevated-info-text: #1087a7;
  --surface-elevated-info-text-hover: #15acd6;
  --surface-sunken-info-text: #15acd6;
  --surface-sunken-info-text-hover: #15acd6;
  --surface-overlay-info-text: #15acd6;
  --surface-overlay-info-text-hover: #15acd6;
  --surface-inverse-info-text: #0b5e74;
  --surface-inverse-info-text-hover: #0b5e74;
  --surface-base-danger-text: #ef5d5d;
  --surface-base-danger-text-hover: #ef5d5d;
  --surface-subtle-danger-text: #ef5d5d;
  --surface-subtle-danger-text-hover: #ef5d5d;
  --surface-elevated-danger-text: #ea2e2e;
  --surface-elevated-danger-text-hover: #ef5d5d;
  --surface-sunken-danger-text: #ef5d5d;
  --surface-sunken-danger-text-hover: #ef5d5d;
  --surface-overlay-danger-text: #ef5d5d;
  --surface-overlay-danger-text-hover: #ef5d5d;
  --surface-inverse-danger-text: #ba1212;
  --surface-inverse-danger-text-hover: #ba1212;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #07cbed 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e85882 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #07cbed 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e85882 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e85882 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #07cbed 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e85882 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e85882 10%, transparent) 0px, transparent 50%);
    }
`);

export const tokensCSS = `@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #95dbee;
  --color-primary-100: #65ceeb;
  --color-primary-200: #32c3eb;
  --color-primary-300: #15acd6;
  --color-primary-400: #1087a7;
  --color-primary-500: #0e7490;
  --color-primary-600: #0b5e74;
  --color-primary-700: #094b5d;
  --color-primary-800: #073846;
  --color-primary-900: #05252e;
  --color-secondary-50: #f4f2f1;
  --color-secondary-100: #e9e4e2;
  --color-secondary-200: #ddd7d5;
  --color-secondary-300: #c6bdb9;
  --color-secondary-400: #afa29c;
  --color-secondary-500: #a99b95;
  --color-secondary-600: #928079;
  --color-secondary-700: #776761;
  --color-secondary-800: #5b4f4a;
  --color-secondary-900: #3f3733;
  --color-accent-50: #fbeaef;
  --color-accent-100: #f8d3de;
  --color-accent-200: #f4b2c5;
  --color-accent-300: #ee85a4;
  --color-accent-400: #e85882;
  --color-accent-500: #e54271;
  --color-accent-600: #d61e53;
  --color-accent-700: #aa1742;
  --color-accent-800: #7d1130;
  --color-accent-900: #500b1f;
  --color-success-50: #d3f8d3;
  --color-success-100: #a4f3a4;
  --color-success-200: #73f273;
  --color-success-300: #44ed44;
  --color-success-400: #16e816;
  --color-success-500: #14d114;
  --color-success-600: #10a210;
  --color-success-700: #0b740b;
  --color-success-800: #074607;
  --color-success-900: #042f04;
  --color-warning-50: #fae39f;
  --color-warning-100: #fbd76a;
  --color-warning-200: #ffcc33;
  --color-warning-300: #ffbf00;
  --color-warning-400: #cc9900;
  --color-warning-500: #B38600;
  --color-warning-600: #806000;
  --color-warning-700: #664c00;
  --color-warning-800: #4d3900;
  --color-warning-900: #332600;
  --color-danger-50: #fbe9e9;
  --color-danger-100: #f6bbbb;
  --color-danger-200: #f38b8b;
  --color-danger-300: #ef5d5d;
  --color-danger-400: #ea2e2e;
  --color-danger-500: #e81717;
  --color-danger-600: #ba1212;
  --color-danger-700: #8b0e0e;
  --color-danger-800: #5d0909;
  --color-danger-900: #2e0505;
  --color-info-50: #95dbee;
  --color-info-100: #65ceeb;
  --color-info-200: #32c3eb;
  --color-info-300: #15acd6;
  --color-info-400: #1087a7;
  --color-info-500: #0e7490;
  --color-info-600: #0b5e74;
  --color-info-700: #094b5d;
  --color-info-800: #073846;
  --color-info-900: #05252e;
  --color-gray-50: #fafaf9;
  --color-gray-100: #f4f2f1;
  --color-gray-200: #e3dfdd;
  --color-gray-300: #cdc5c1;
  --color-gray-400: #a3958f;
  --color-gray-500: #a99b95;
  --color-gray-600: #846c62;
  --color-gray-700: #695349;
  --color-gray-800: #3d2f29;
  --color-gray-900: #1f1714;
  --color-surface-base: #e7e6de;
  --color-surface-subtle: #e3e2d8;
  --color-surface-elevated: #deddd2;
  --color-surface-sunken: #dad9cc;
  --color-surface-overlay: #ebeae4;
  --color-surface-inverse: #191810;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #e3e2d8;
  --color-surface-fieldset-subtle: #deddd2;
  --color-surface-fieldset-elevated: #dad9cc;
  --color-surface-fieldset-sunken: #d1d0c0;
  --color-surface-fieldset-overlay: #deddd2;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #e7e6de;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #5c5c59;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #5c5c59;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #e3e2d8;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #5b5a56;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #5b5a56;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #deddd2;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #595854;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #595854;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #dad9cc;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #575752;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #575752;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #ebeae4;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #5e5e5b;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #5e5e5b;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #191810;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a3a39f;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a3a39f;
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
  --color-primary-fill: #0b5e74; /* For button backgrounds with white text */
  --color-primary-fill-hover: #0a5568;
  --color-primary-fill-active: #094b5d;
  --color-primary-text: #0b5e74; /* For links and outline buttons on light surfaces */
  --color-primary-text-hover: #0b5e74;
  --color-primary-text-visited: #377989;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #0b5e74;
  --color-selection-bg: #0b5e74;
  --color-selection-text: #ffffff;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors */
  --color-accent-fill: #d61e53;
  --color-accent-fill-hover: #c11b4b;
  --color-accent-fill-active: #ab1842;
  --color-accent-text: #aa1742;
  --color-accent-text-hover: #aa1742;
  /* Surface-Aware Accent Text Tokens */
  --surface-base-accent-text: #aa1742;
  --surface-base-accent-text-hover: #aa1742;
  --surface-subtle-accent-text: #aa1742;
  --surface-subtle-accent-text-hover: #aa1742;
  --surface-elevated-accent-text: #aa1742;
  --surface-elevated-accent-text-hover: #aa1742;
  --surface-sunken-accent-text: #aa1742;
  --surface-sunken-accent-text-hover: #aa1742;
  --surface-overlay-accent-text: #aa1742;
  --surface-overlay-accent-text-hover: #aa1742;
  --surface-inverse-accent-text: #e54271;
  --surface-inverse-accent-text-hover: #e85882;
  /* Danger Role Colors */
  --color-danger-fill: #ba1212;
  --color-danger-fill-hover: #a71010;
  --color-danger-fill-active: #950e0e;
  --color-danger-text: #ba1212;
  --color-danger-text-hover: #8b0e0e;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors */
  --color-success-fill: #0b740b;
  --color-success-fill-hover: #0a680a;
  --color-success-fill-active: #095d09;
  --color-success-text: #0b740b;
  --color-success-text-hover: #074607;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors */
  --color-warning-fill: #806000;
  --color-warning-fill-hover: #735600;
  --color-warning-fill-active: #664d00;
  --color-warning-text: #806000;
  --color-warning-text-hover: #664c00;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors */
  --color-info-fill: #0b5e74;
  --color-info-fill-hover: #0a5568;
  --color-info-fill-active: #094b5d;
  --color-info-text: #0b5e74;
  --color-info-text-hover: #0b5e74;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens */
  --surface-base-success-text: #0b740b;
  --surface-base-success-text-hover: #074607;
  --surface-subtle-success-text: #0b740b;
  --surface-subtle-success-text-hover: #074607;
  --surface-elevated-success-text: #074607;
  --surface-elevated-success-text-hover: #074607;
  --surface-sunken-success-text: #074607;
  --surface-sunken-success-text-hover: #074607;
  --surface-overlay-success-text: #0b740b;
  --surface-overlay-success-text-hover: #074607;
  --surface-inverse-success-text: #10a210;
  --surface-inverse-success-text-hover: #10a210;
  --surface-base-warning-text: #806000;
  --surface-base-warning-text-hover: #664c00;
  --surface-subtle-warning-text: #664c00;
  --surface-subtle-warning-text-hover: #664c00;
  --surface-elevated-warning-text: #664c00;
  --surface-elevated-warning-text-hover: #664c00;
  --surface-sunken-warning-text: #664c00;
  --surface-sunken-warning-text-hover: #664c00;
  --surface-overlay-warning-text: #806000;
  --surface-overlay-warning-text-hover: #664c00;
  --surface-inverse-warning-text: #B38600;
  --surface-inverse-warning-text-hover: #B38600;
  --surface-base-info-text: #0b5e74;
  --surface-base-info-text-hover: #0b5e74;
  --surface-subtle-info-text: #0b5e74;
  --surface-subtle-info-text-hover: #0b5e74;
  --surface-elevated-info-text: #0b5e74;
  --surface-elevated-info-text-hover: #0b5e74;
  --surface-sunken-info-text: #0b5e74;
  --surface-sunken-info-text-hover: #0b5e74;
  --surface-overlay-info-text: #0b5e74;
  --surface-overlay-info-text-hover: #0b5e74;
  --surface-inverse-info-text: #15acd6;
  --surface-inverse-info-text-hover: #15acd6;
  --surface-base-danger-text: #ba1212;
  --surface-base-danger-text-hover: #ba1212;
  --surface-subtle-danger-text: #ba1212;
  --surface-subtle-danger-text-hover: #ba1212;
  --surface-elevated-danger-text: #ba1212;
  --surface-elevated-danger-text-hover: #8b0e0e;
  --surface-sunken-danger-text: #ba1212;
  --surface-sunken-danger-text-hover: #8b0e0e;
  --surface-overlay-danger-text: #ba1212;
  --surface-overlay-danger-text-hover: #ba1212;
  --surface-inverse-danger-text: #ef5d5d;
  --surface-inverse-danger-text-hover: #ef5d5d;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #0e7490 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e54271 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #0e7490 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a99b95 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #0e7490 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a99b95 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e54271 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #0e7490 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e54271 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #0e7490 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #0e7490 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #0e7490 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e54271 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e54271 15%, transparent) 0px, transparent 50%);
    

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
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 1px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 16px;
  --font-size-lg: 19px;
  --font-size-xl: 23px;
  --font-size-2xl: 28px;
  --font-size-3xl: 33px;
  --font-size-4xl: 40px;
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
  --layout-min-height: 100vh;
  --layout-container-padding: var(--spacing-6);
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
  --icon-size-3xl: 96px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #16171a;
    --color-surface-subtle: #111214;
    --color-surface-elevated: #0d0d0f;
    --color-surface-sunken: #131416;
    --color-surface-overlay: #1b1c20;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0d0d0f;
    --color-surface-fieldset-subtle: #1b1c20;
    --color-surface-fieldset-elevated: #1f1f24;
    --color-surface-fieldset-sunken: #0d0d0f;
    --color-surface-fieldset-overlay: #25272c;
    --color-primary-50: #c5f2fa;
    --color-primary-100: #93eaf9;
    --color-primary-200: #5fe4fa;
    --color-primary-300: #2ddbf9;
    --color-primary-400: #07cbed;
    --color-primary-500: #06b6d4;
    --color-primary-600: #058ba2;
    --color-primary-700: #036171;
    --color-primary-800: #02404a;
    --color-primary-900: #012b32;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #cfd1d5;
    --color-secondary-300: #b4b8bd;
    --color-secondary-400: #999ea5;
    --color-secondary-500: #8b9199;
    --color-secondary-600: #717780;
    --color-secondary-700: #595e65;
    --color-secondary-800: #41454a;
    --color-secondary-900: #292c2f;
    --color-accent-50: #fbeaef;
    --color-accent-100: #f8d3de;
    --color-accent-200: #f4b2c5;
    --color-accent-300: #ee85a4;
    --color-accent-400: #e85882;
    --color-accent-500: #e54271;
    --color-accent-600: #d61e53;
    --color-accent-700: #aa1742;
    --color-accent-800: #7d1130;
    --color-accent-900: #500b1f;
    --color-gray-50: #fafafa;
    --color-gray-100: #f1f2f3;
    --color-gray-200: #dee0e2;
    --color-gray-300: #c3c6cb;
    --color-gray-400: #9298a0;
    --color-gray-500: #8b9199;
    --color-gray-600: #667180;
    --color-gray-700: #4c5766;
    --color-gray-800: #2b323b;
    --color-gray-900: #15191e;
    --color-success-50: #d3f8d3;
    --color-success-100: #a4f3a4;
    --color-success-200: #73f273;
    --color-success-300: #44ed44;
    --color-success-400: #16e816;
    --color-success-500: #14d114;
    --color-success-600: #10a210;
    --color-success-700: #0b740b;
    --color-success-800: #074607;
    --color-success-900: #042f04;
    --color-info-50: #95dbee;
    --color-info-100: #65ceeb;
    --color-info-200: #32c3eb;
    --color-info-300: #15acd6;
    --color-info-400: #1087a7;
    --color-info-500: #0e7490;
    --color-info-600: #0b5e74;
    --color-info-700: #094b5d;
    --color-info-800: #073846;
    --color-info-900: #05252e;
    --color-warning-50: #fae39f;
    --color-warning-100: #fbd76a;
    --color-warning-200: #ffcc33;
    --color-warning-300: #ffbf00;
    --color-warning-400: #cc9900;
    --color-warning-500: #B38600;
    --color-warning-600: #806000;
    --color-warning-700: #664c00;
    --color-warning-800: #4d3900;
    --color-warning-900: #332600;
    --color-danger-50: #fbe9e9;
    --color-danger-100: #f6bbbb;
    --color-danger-200: #f38b8b;
    --color-danger-300: #ef5d5d;
    --color-danger-400: #ea2e2e;
    --color-danger-500: #e81717;
    --color-danger-600: #ba1212;
    --color-danger-700: #8b0e0e;
    --color-danger-800: #5d0909;
    --color-danger-900: #2e0505;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #16171a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a2a2a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a2a2a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #111214;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a0a0a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a0a0a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0d0d0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9e9e9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9e9e9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #131416;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a2;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a2;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1b1c20;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a4a4a6;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a4a4a6;
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

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.125);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.125);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.125);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.125);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-500);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #036171;
    --color-primary-fill-hover: #0592ab;
    --color-primary-fill-active: #04788c;
    --color-primary-text: #06b6d4;
    --color-primary-text-hover: #06b6d4;
    --color-primary-text-visited: #0996af;
    --color-primary-contrast: #ffffff;
    --color-focus-ring: #058ba2;
    --color-selection-bg: #06b6d4;
    --color-selection-text: #000000;
    --color-link: var(--color-primary-text);
    --color-link-hover: var(--color-primary-text-hover);
    --color-link-visited: var(--color-primary-text-visited);
    /* Accent Role Colors (dark mode) */
    --color-accent-fill: #d61e53;
    --color-accent-fill-hover: #e3396a;
    --color-accent-fill-active: #e1265c;
    --color-accent-text: #e54271;
    --color-accent-text-hover: #ee85a4;
    /* Surface-Aware Accent Text Tokens (dark mode) */
    --surface-base-accent-text: #e54271;
    --surface-base-accent-text-hover: #e85882;
    --surface-subtle-accent-text: #e54271;
    --surface-subtle-accent-text-hover: #e85882;
    --surface-elevated-accent-text: #e54271;
    --surface-elevated-accent-text-hover: #e85882;
    --surface-sunken-accent-text: #e54271;
    --surface-sunken-accent-text-hover: #e85882;
    --surface-overlay-accent-text: #e85882;
    --surface-overlay-accent-text-hover: #ee85a4;
    --surface-inverse-accent-text: #d61e53;
    --surface-inverse-accent-text-hover: #aa1742;
    /* Danger Role Colors (dark mode) */
    --color-danger-fill: #ba1212;
    --color-danger-fill-hover: #e41616;
    --color-danger-fill-active: #ce1414;
    --color-danger-text: #ef5d5d;
    --color-danger-text-hover: #f38b8b;
    --color-danger-contrast: #ffffff;
    /* Success Role Colors (dark mode) */
    --color-success-fill: #0b740b;
    --color-success-fill-hover: #10a810;
    --color-success-fill-active: #0d8c0d;
    --color-success-text: #10a210;
    --color-success-text-hover: #14d114;
    --color-success-contrast: #ffffff;
    /* Warning Role Colors (dark mode) */
    --color-warning-fill: #806000;
    --color-warning-fill-hover: #b98b00;
    --color-warning-fill-active: #9b7400;
    --color-warning-text: #B38600;
    --color-warning-text-hover: #cc9900;
    --color-warning-contrast: #ffffff;
    /* Info Role Colors (dark mode) */
    --color-info-fill: #0b5e74;
    --color-info-fill-hover: #1089a8;
    --color-info-fill-active: #0d728c;
    --color-info-text: #15acd6;
    --color-info-text-hover: #15acd6;
    --color-info-contrast: #ffffff;
    /* Surface-Aware Status Text Tokens (dark mode) */
    --surface-base-success-text: #10a210;
    --surface-base-success-text-hover: #10a210;
    --surface-subtle-success-text: #10a210;
    --surface-subtle-success-text-hover: #10a210;
    --surface-elevated-success-text: #10a210;
    --surface-elevated-success-text-hover: #10a210;
    --surface-sunken-success-text: #10a210;
    --surface-sunken-success-text-hover: #10a210;
    --surface-overlay-success-text: #10a210;
    --surface-overlay-success-text-hover: #10a210;
    --surface-inverse-success-text: #0b740b;
    --surface-inverse-success-text-hover: #0b740b;
    --surface-base-warning-text: #B38600;
    --surface-base-warning-text-hover: #B38600;
    --surface-subtle-warning-text: #B38600;
    --surface-subtle-warning-text-hover: #B38600;
    --surface-elevated-warning-text: #B38600;
    --surface-elevated-warning-text-hover: #B38600;
    --surface-sunken-warning-text: #B38600;
    --surface-sunken-warning-text-hover: #B38600;
    --surface-overlay-warning-text: #B38600;
    --surface-overlay-warning-text-hover: #B38600;
    --surface-inverse-warning-text: #806000;
    --surface-inverse-warning-text-hover: #806000;
    --surface-base-info-text: #15acd6;
    --surface-base-info-text-hover: #15acd6;
    --surface-subtle-info-text: #1087a7;
    --surface-subtle-info-text-hover: #15acd6;
    --surface-elevated-info-text: #1087a7;
    --surface-elevated-info-text-hover: #15acd6;
    --surface-sunken-info-text: #15acd6;
    --surface-sunken-info-text-hover: #15acd6;
    --surface-overlay-info-text: #15acd6;
    --surface-overlay-info-text-hover: #15acd6;
    --surface-inverse-info-text: #0b5e74;
    --surface-inverse-info-text-hover: #0b5e74;
    --surface-base-danger-text: #ef5d5d;
    --surface-base-danger-text-hover: #ef5d5d;
    --surface-subtle-danger-text: #ef5d5d;
    --surface-subtle-danger-text-hover: #ef5d5d;
    --surface-elevated-danger-text: #ea2e2e;
    --surface-elevated-danger-text-hover: #ef5d5d;
    --surface-sunken-danger-text: #ef5d5d;
    --surface-sunken-danger-text-hover: #ef5d5d;
    --surface-overlay-danger-text: #ef5d5d;
    --surface-overlay-danger-text-hover: #ef5d5d;
    --surface-inverse-danger-text: #ba1212;
    --surface-inverse-danger-text-hover: #ba1212;
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
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #07cbed 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #e85882 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #07cbed 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e85882 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #e85882 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #07cbed 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #e85882 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #e85882 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #16171a;
  --color-surface-subtle: #111214;
  --color-surface-elevated: #0d0d0f;
  --color-surface-sunken: #131416;
  --color-surface-overlay: #1b1c20;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0d0d0f;
  --color-surface-fieldset-subtle: #1b1c20;
  --color-surface-fieldset-elevated: #1f1f24;
  --color-surface-fieldset-sunken: #0d0d0f;
  --color-surface-fieldset-overlay: #25272c;
  --color-primary-50: #c5f2fa;
  --color-primary-100: #93eaf9;
  --color-primary-200: #5fe4fa;
  --color-primary-300: #2ddbf9;
  --color-primary-400: #07cbed;
  --color-primary-500: #06b6d4;
  --color-primary-600: #058ba2;
  --color-primary-700: #036171;
  --color-primary-800: #02404a;
  --color-primary-900: #012b32;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #cfd1d5;
  --color-secondary-300: #b4b8bd;
  --color-secondary-400: #999ea5;
  --color-secondary-500: #8b9199;
  --color-secondary-600: #717780;
  --color-secondary-700: #595e65;
  --color-secondary-800: #41454a;
  --color-secondary-900: #292c2f;
  --color-accent-50: #fbeaef;
  --color-accent-100: #f8d3de;
  --color-accent-200: #f4b2c5;
  --color-accent-300: #ee85a4;
  --color-accent-400: #e85882;
  --color-accent-500: #e54271;
  --color-accent-600: #d61e53;
  --color-accent-700: #aa1742;
  --color-accent-800: #7d1130;
  --color-accent-900: #500b1f;
  --color-gray-50: #fafafa;
  --color-gray-100: #f1f2f3;
  --color-gray-200: #dee0e2;
  --color-gray-300: #c3c6cb;
  --color-gray-400: #9298a0;
  --color-gray-500: #8b9199;
  --color-gray-600: #667180;
  --color-gray-700: #4c5766;
  --color-gray-800: #2b323b;
  --color-gray-900: #15191e;
  --color-success-50: #d3f8d3;
  --color-success-100: #a4f3a4;
  --color-success-200: #73f273;
  --color-success-300: #44ed44;
  --color-success-400: #16e816;
  --color-success-500: #14d114;
  --color-success-600: #10a210;
  --color-success-700: #0b740b;
  --color-success-800: #074607;
  --color-success-900: #042f04;
  --color-info-50: #95dbee;
  --color-info-100: #65ceeb;
  --color-info-200: #32c3eb;
  --color-info-300: #15acd6;
  --color-info-400: #1087a7;
  --color-info-500: #0e7490;
  --color-info-600: #0b5e74;
  --color-info-700: #094b5d;
  --color-info-800: #073846;
  --color-info-900: #05252e;
  --color-warning-50: #fae39f;
  --color-warning-100: #fbd76a;
  --color-warning-200: #ffcc33;
  --color-warning-300: #ffbf00;
  --color-warning-400: #cc9900;
  --color-warning-500: #B38600;
  --color-warning-600: #806000;
  --color-warning-700: #664c00;
  --color-warning-800: #4d3900;
  --color-warning-900: #332600;
  --color-danger-50: #fbe9e9;
  --color-danger-100: #f6bbbb;
  --color-danger-200: #f38b8b;
  --color-danger-300: #ef5d5d;
  --color-danger-400: #ea2e2e;
  --color-danger-500: #e81717;
  --color-danger-600: #ba1212;
  --color-danger-700: #8b0e0e;
  --color-danger-800: #5d0909;
  --color-danger-900: #2e0505;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #16171a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a2a2a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a2a2a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #111214;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a0a0a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a0a0a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0d0d0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9e9e9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9e9e9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #131416;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a2;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a2;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1b1c20;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a4a4a6;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a4a4a6;
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

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.125);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.125);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.125);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.125);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.125);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Interactive Colors - optimized for specific use cases (dark mode) */
  --color-primary-fill: #036171;
  --color-primary-fill-hover: #0592ab;
  --color-primary-fill-active: #04788c;
  --color-primary-text: #06b6d4;
  --color-primary-text-hover: #06b6d4;
  --color-primary-text-visited: #0996af;
  --color-primary-contrast: #ffffff;
  --color-focus-ring: #058ba2;
  --color-selection-bg: #06b6d4;
  --color-selection-text: #000000;
  --color-link: var(--color-primary-text);
  --color-link-hover: var(--color-primary-text-hover);
  --color-link-visited: var(--color-primary-text-visited);
  /* Accent Role Colors (dark mode) */
  --color-accent-fill: #d61e53;
  --color-accent-fill-hover: #e3396a;
  --color-accent-fill-active: #e1265c;
  --color-accent-text: #e54271;
  --color-accent-text-hover: #ee85a4;
  /* Surface-Aware Accent Text Tokens (dark mode) */
  --surface-base-accent-text: #e54271;
  --surface-base-accent-text-hover: #e85882;
  --surface-subtle-accent-text: #e54271;
  --surface-subtle-accent-text-hover: #e85882;
  --surface-elevated-accent-text: #e54271;
  --surface-elevated-accent-text-hover: #e85882;
  --surface-sunken-accent-text: #e54271;
  --surface-sunken-accent-text-hover: #e85882;
  --surface-overlay-accent-text: #e85882;
  --surface-overlay-accent-text-hover: #ee85a4;
  --surface-inverse-accent-text: #d61e53;
  --surface-inverse-accent-text-hover: #aa1742;
  /* Danger Role Colors (dark mode) */
  --color-danger-fill: #ba1212;
  --color-danger-fill-hover: #e41616;
  --color-danger-fill-active: #ce1414;
  --color-danger-text: #ef5d5d;
  --color-danger-text-hover: #f38b8b;
  --color-danger-contrast: #ffffff;
  /* Success Role Colors (dark mode) */
  --color-success-fill: #0b740b;
  --color-success-fill-hover: #10a810;
  --color-success-fill-active: #0d8c0d;
  --color-success-text: #10a210;
  --color-success-text-hover: #14d114;
  --color-success-contrast: #ffffff;
  /* Warning Role Colors (dark mode) */
  --color-warning-fill: #806000;
  --color-warning-fill-hover: #b98b00;
  --color-warning-fill-active: #9b7400;
  --color-warning-text: #B38600;
  --color-warning-text-hover: #cc9900;
  --color-warning-contrast: #ffffff;
  /* Info Role Colors (dark mode) */
  --color-info-fill: #0b5e74;
  --color-info-fill-hover: #1089a8;
  --color-info-fill-active: #0d728c;
  --color-info-text: #15acd6;
  --color-info-text-hover: #15acd6;
  --color-info-contrast: #ffffff;
  /* Surface-Aware Status Text Tokens (dark mode) */
  --surface-base-success-text: #10a210;
  --surface-base-success-text-hover: #10a210;
  --surface-subtle-success-text: #10a210;
  --surface-subtle-success-text-hover: #10a210;
  --surface-elevated-success-text: #10a210;
  --surface-elevated-success-text-hover: #10a210;
  --surface-sunken-success-text: #10a210;
  --surface-sunken-success-text-hover: #10a210;
  --surface-overlay-success-text: #10a210;
  --surface-overlay-success-text-hover: #10a210;
  --surface-inverse-success-text: #0b740b;
  --surface-inverse-success-text-hover: #0b740b;
  --surface-base-warning-text: #B38600;
  --surface-base-warning-text-hover: #B38600;
  --surface-subtle-warning-text: #B38600;
  --surface-subtle-warning-text-hover: #B38600;
  --surface-elevated-warning-text: #B38600;
  --surface-elevated-warning-text-hover: #B38600;
  --surface-sunken-warning-text: #B38600;
  --surface-sunken-warning-text-hover: #B38600;
  --surface-overlay-warning-text: #B38600;
  --surface-overlay-warning-text-hover: #B38600;
  --surface-inverse-warning-text: #806000;
  --surface-inverse-warning-text-hover: #806000;
  --surface-base-info-text: #15acd6;
  --surface-base-info-text-hover: #15acd6;
  --surface-subtle-info-text: #1087a7;
  --surface-subtle-info-text-hover: #15acd6;
  --surface-elevated-info-text: #1087a7;
  --surface-elevated-info-text-hover: #15acd6;
  --surface-sunken-info-text: #15acd6;
  --surface-sunken-info-text-hover: #15acd6;
  --surface-overlay-info-text: #15acd6;
  --surface-overlay-info-text-hover: #15acd6;
  --surface-inverse-info-text: #0b5e74;
  --surface-inverse-info-text-hover: #0b5e74;
  --surface-base-danger-text: #ef5d5d;
  --surface-base-danger-text-hover: #ef5d5d;
  --surface-subtle-danger-text: #ef5d5d;
  --surface-subtle-danger-text-hover: #ef5d5d;
  --surface-elevated-danger-text: #ea2e2e;
  --surface-elevated-danger-text-hover: #ef5d5d;
  --surface-sunken-danger-text: #ef5d5d;
  --surface-sunken-danger-text-hover: #ef5d5d;
  --surface-overlay-danger-text: #ef5d5d;
  --surface-overlay-danger-text-hover: #ef5d5d;
  --surface-inverse-danger-text: #ba1212;
  --surface-inverse-danger-text-hover: #ba1212;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #07cbed 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e85882 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #07cbed 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e85882 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e85882 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #07cbed 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e85882 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #07cbed 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #07cbed 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e85882 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e85882 10%, transparent) 0px, transparent 50%);
    }
`;
