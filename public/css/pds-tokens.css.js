// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e1eff5;
  --color-primary-100: #b8dcea;
  --color-primary-200: #8dcae3;
  --color-primary-300: #64b7d8;
  --color-primary-400: #3ba4ce;
  --color-primary-500: #3097c0;
  --color-primary-600: #267797;
  --color-primary-700: #1c576e;
  --color-primary-800: #113746;
  --color-primary-900: #0a2029;
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
  --color-success-50: #d9f2d9;
  --color-success-100: #b0e8b0;
  --color-success-200: #85e085;
  --color-success-300: #5cd65c;
  --color-success-400: #33cc33;
  --color-success-500: #2eb82e;
  --color-success-600: #248f24;
  --color-success-700: #1a661a;
  --color-success-800: #0f3e0f;
  --color-success-900: #0a290a;
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
  --color-danger-50: #faebeb;
  --color-danger-100: #f2c0c0;
  --color-danger-200: #ec9393;
  --color-danger-300: #e46767;
  --color-danger-400: #dd3c3c;
  --color-danger-500: #d92626;
  --color-danger-600: #ae1e1e;
  --color-danger-700: #821717;
  --color-danger-800: #570f0f;
  --color-danger-900: #2b0808;
  --color-info-50: #e1eff5;
  --color-info-100: #b8dcea;
  --color-info-200: #8dcae3;
  --color-info-300: #64b7d8;
  --color-info-400: #3ba4ce;
  --color-info-500: #3097c0;
  --color-info-600: #267797;
  --color-info-700: #1c576e;
  --color-info-800: #113746;
  --color-info-900: #0a2029;
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
  --color-semantic-primary: #3097c0;
  --color-semantic-onPrimary: #000000;
  --color-semantic-surface: #e7e6de;
  --color-semantic-onSurface: #000000;
  --color-semantic-background: #e7e6de;
  --color-semantic-onBackground: #000000;
  --color-semantic-primaryText: #1c576e;
  --color-semantic-primaryFill: #267797;
  --color-semantic-infoFill: #267797;
  --color-semantic-onPrimaryFill: #ffffff;
  --color-semantic-primaryFillHover: #216985;
  --color-semantic-onPrimaryFillHover: #ffffff;
  --color-semantic-primaryFillActive: #1e5d76;
  --color-semantic-onPrimaryFillActive: #ffffff;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #3097c0 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e54271 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #3097c0 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a99b95 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #3097c0 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a99b95 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e54271 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #3097c0 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e54271 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #3097c0 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #3097c0 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #3097c0 23%, transparent) 0px, transparent 50%),
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
  --spacing-7: 32px;
  --spacing-8: 40px;
  --spacing-9: 48px;
  --spacing-10: 64px;
  --spacing-11: 80px;
  --spacing-12: 96px;
  --spacing-13: 128px;
  --spacing-14: 61px;
  --spacing-15: 76px;
  --spacing-16: 95px;
  --spacing-17: 119px;
  --spacing-18: 149px;
  --spacing-19: 186px;
  --spacing-20: 233px;
  --spacing-21: 291px;
  --spacing-22: 364px;
  --spacing-23: 455px;
  --spacing-24: 568px;
  --spacing-25: 711px;
  --spacing-26: 888px;
  --spacing-27: 1110px;
  --spacing-28: 1388px;
  --spacing-29: 1735px;
  --spacing-30: 2168px;
  --spacing-31: 2711px;
  --spacing-32: 3388px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 19px;
  --font-size-2xl: 23px;
  --font-size-3xl: 28px;
  --font-size-4xl: 33px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-lineHeight-tight: 1.25;
  --font-lineHeight-normal: 1.5;
  --font-lineHeight-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-maxWidth: 1200px;
  --layout-minHeight: 100vh;
  --layout-containerPadding: var(--spacing-6)px;
  --layout-breakpoints: {
        sm: 640px,
        md: 768px,
        lg: 1024px,
        xl: 1280px,
      };


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
  --color-primary-50: #0a191e;
  --color-primary-100: #122a34;
  --color-primary-200: #1d4351;
  --color-primary-300: #275b70;
  --color-primary-400: #327c9a;
  --color-primary-500: #3789aa;
  --color-primary-600: #49a1c4;
  --color-primary-700: #6ab2cf;
  --color-primary-800: #a9d3e4;
  --color-primary-900: #d0e5ee;
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
  --color-accent-50: #3a0e1b;
  --color-accent-100: #5b162a;
  --color-accent-200: #7c1e3a;
  --color-accent-300: #9c2749;
  --color-accent-400: #ce2d5b;
  --color-accent-500: #d53b68;
  --color-accent-600: #dc5f84;
  --color-accent-700: #e4839f;
  --color-accent-800: #f4c1d0;
  --color-accent-900: #f6d6e0;
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
  --color-success-50: #0a1e0a;
  --color-success-100: #102e10;
  --color-success-200: #1b4c1b;
  --color-success-300: #256a25;
  --color-success-400: #309430;
  --color-success-500: #35a435;
  --color-success-600: #43c243;
  --color-success-700: #64cc64;
  --color-success-800: #a2e2a2;
  --color-success-900: #c9ebc9;
  --color-info-50: #0a191e;
  --color-info-100: #122a34;
  --color-info-200: #1d4351;
  --color-info-300: #275b70;
  --color-info-400: #327c9a;
  --color-info-500: #3789aa;
  --color-info-600: #49a1c4;
  --color-info-700: #6ab2cf;
  --color-info-800: #a9d3e4;
  --color-info-900: #d0e5ee;
  --color-warning-50: #251c04;
  --color-warning-100: #372b06;
  --color-warning-200: #493908;
  --color-warning-300: #5c480a;
  --color-warning-400: #8d6c0b;
  --color-warning-500: #a07c0d;
  --color-warning-600: #c89a10;
  --color-warning-700: #ecb718;
  --color-warning-800: #f6d05d;
  --color-warning-900: #f6dc8e;
  --color-danger-50: #200909;
  --color-danger-100: #401212;
  --color-danger-200: #5f1b1b;
  --color-danger-300: #802424;
  --color-danger-400: #ad2c2c;
  --color-danger-500: #bf3030;
  --color-danger-600: #d14949;
  --color-danger-700: #da6c6c;
  --color-danger-800: #edb0b0;
  --color-danger-900: #f4d8d8;
  --color-semantic-surface: #16171a;
  --color-semantic-onSurface: #ffffff;
  --color-semantic-primaryText: #49a1c4;
  --color-semantic-primaryFill: #327c9a;
  --color-semantic-infoFill: #327c9a;
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

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Backdrop tokens - used for modal dialogs, drawers, overlays (dark mode) */
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #327c9a 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ce2d5b 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #327c9a 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ce2d5b 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ce2d5b 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #327c9a 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ce2d5b 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ce2d5b 10%, transparent) 0px, transparent 50%);
    
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
  --color-primary-50: #0a191e;
  --color-primary-100: #122a34;
  --color-primary-200: #1d4351;
  --color-primary-300: #275b70;
  --color-primary-400: #327c9a;
  --color-primary-500: #3789aa;
  --color-primary-600: #49a1c4;
  --color-primary-700: #6ab2cf;
  --color-primary-800: #a9d3e4;
  --color-primary-900: #d0e5ee;
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
  --color-accent-50: #3a0e1b;
  --color-accent-100: #5b162a;
  --color-accent-200: #7c1e3a;
  --color-accent-300: #9c2749;
  --color-accent-400: #ce2d5b;
  --color-accent-500: #d53b68;
  --color-accent-600: #dc5f84;
  --color-accent-700: #e4839f;
  --color-accent-800: #f4c1d0;
  --color-accent-900: #f6d6e0;
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
  --color-success-50: #0a1e0a;
  --color-success-100: #102e10;
  --color-success-200: #1b4c1b;
  --color-success-300: #256a25;
  --color-success-400: #309430;
  --color-success-500: #35a435;
  --color-success-600: #43c243;
  --color-success-700: #64cc64;
  --color-success-800: #a2e2a2;
  --color-success-900: #c9ebc9;
  --color-info-50: #0a191e;
  --color-info-100: #122a34;
  --color-info-200: #1d4351;
  --color-info-300: #275b70;
  --color-info-400: #327c9a;
  --color-info-500: #3789aa;
  --color-info-600: #49a1c4;
  --color-info-700: #6ab2cf;
  --color-info-800: #a9d3e4;
  --color-info-900: #d0e5ee;
  --color-warning-50: #251c04;
  --color-warning-100: #372b06;
  --color-warning-200: #493908;
  --color-warning-300: #5c480a;
  --color-warning-400: #8d6c0b;
  --color-warning-500: #a07c0d;
  --color-warning-600: #c89a10;
  --color-warning-700: #ecb718;
  --color-warning-800: #f6d05d;
  --color-warning-900: #f6dc8e;
  --color-danger-50: #200909;
  --color-danger-100: #401212;
  --color-danger-200: #5f1b1b;
  --color-danger-300: #802424;
  --color-danger-400: #ad2c2c;
  --color-danger-500: #bf3030;
  --color-danger-600: #d14949;
  --color-danger-700: #da6c6c;
  --color-danger-800: #edb0b0;
  --color-danger-900: #f4d8d8;
  --color-semantic-surface: #16171a;
  --color-semantic-onSurface: #ffffff;
  --color-semantic-primaryText: #49a1c4;
  --color-semantic-primaryFill: #327c9a;
  --color-semantic-infoFill: #327c9a;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #327c9a 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ce2d5b 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #327c9a 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ce2d5b 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ce2d5b 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #327c9a 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ce2d5b 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ce2d5b 10%, transparent) 0px, transparent 50%);
    }
`);

export const tokensCSS = `@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e1eff5;
  --color-primary-100: #b8dcea;
  --color-primary-200: #8dcae3;
  --color-primary-300: #64b7d8;
  --color-primary-400: #3ba4ce;
  --color-primary-500: #3097c0;
  --color-primary-600: #267797;
  --color-primary-700: #1c576e;
  --color-primary-800: #113746;
  --color-primary-900: #0a2029;
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
  --color-success-50: #d9f2d9;
  --color-success-100: #b0e8b0;
  --color-success-200: #85e085;
  --color-success-300: #5cd65c;
  --color-success-400: #33cc33;
  --color-success-500: #2eb82e;
  --color-success-600: #248f24;
  --color-success-700: #1a661a;
  --color-success-800: #0f3e0f;
  --color-success-900: #0a290a;
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
  --color-danger-50: #faebeb;
  --color-danger-100: #f2c0c0;
  --color-danger-200: #ec9393;
  --color-danger-300: #e46767;
  --color-danger-400: #dd3c3c;
  --color-danger-500: #d92626;
  --color-danger-600: #ae1e1e;
  --color-danger-700: #821717;
  --color-danger-800: #570f0f;
  --color-danger-900: #2b0808;
  --color-info-50: #e1eff5;
  --color-info-100: #b8dcea;
  --color-info-200: #8dcae3;
  --color-info-300: #64b7d8;
  --color-info-400: #3ba4ce;
  --color-info-500: #3097c0;
  --color-info-600: #267797;
  --color-info-700: #1c576e;
  --color-info-800: #113746;
  --color-info-900: #0a2029;
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
  --color-semantic-primary: #3097c0;
  --color-semantic-onPrimary: #000000;
  --color-semantic-surface: #e7e6de;
  --color-semantic-onSurface: #000000;
  --color-semantic-background: #e7e6de;
  --color-semantic-onBackground: #000000;
  --color-semantic-primaryText: #1c576e;
  --color-semantic-primaryFill: #267797;
  --color-semantic-infoFill: #267797;
  --color-semantic-onPrimaryFill: #ffffff;
  --color-semantic-primaryFillHover: #216985;
  --color-semantic-onPrimaryFillHover: #ffffff;
  --color-semantic-primaryFillActive: #1e5d76;
  --color-semantic-onPrimaryFillActive: #ffffff;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #3097c0 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e54271 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #3097c0 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a99b95 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #3097c0 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a99b95 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e54271 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #3097c0 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a99b95 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e54271 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #3097c0 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a99b95 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e54271 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #3097c0 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #3097c0 23%, transparent) 0px, transparent 50%),
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
  --spacing-7: 32px;
  --spacing-8: 40px;
  --spacing-9: 48px;
  --spacing-10: 64px;
  --spacing-11: 80px;
  --spacing-12: 96px;
  --spacing-13: 128px;
  --spacing-14: 61px;
  --spacing-15: 76px;
  --spacing-16: 95px;
  --spacing-17: 119px;
  --spacing-18: 149px;
  --spacing-19: 186px;
  --spacing-20: 233px;
  --spacing-21: 291px;
  --spacing-22: 364px;
  --spacing-23: 455px;
  --spacing-24: 568px;
  --spacing-25: 711px;
  --spacing-26: 888px;
  --spacing-27: 1110px;
  --spacing-28: 1388px;
  --spacing-29: 1735px;
  --spacing-30: 2168px;
  --spacing-31: 2711px;
  --spacing-32: 3388px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 19px;
  --font-size-2xl: 23px;
  --font-size-3xl: 28px;
  --font-size-4xl: 33px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-lineHeight-tight: 1.25;
  --font-lineHeight-normal: 1.5;
  --font-lineHeight-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-maxWidth: 1200px;
  --layout-minHeight: 100vh;
  --layout-containerPadding: var(--spacing-6)px;
  --layout-breakpoints: {
        sm: 640px,
        md: 768px,
        lg: 1024px,
        xl: 1280px,
      };


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
  --color-primary-50: #0a191e;
  --color-primary-100: #122a34;
  --color-primary-200: #1d4351;
  --color-primary-300: #275b70;
  --color-primary-400: #327c9a;
  --color-primary-500: #3789aa;
  --color-primary-600: #49a1c4;
  --color-primary-700: #6ab2cf;
  --color-primary-800: #a9d3e4;
  --color-primary-900: #d0e5ee;
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
  --color-accent-50: #3a0e1b;
  --color-accent-100: #5b162a;
  --color-accent-200: #7c1e3a;
  --color-accent-300: #9c2749;
  --color-accent-400: #ce2d5b;
  --color-accent-500: #d53b68;
  --color-accent-600: #dc5f84;
  --color-accent-700: #e4839f;
  --color-accent-800: #f4c1d0;
  --color-accent-900: #f6d6e0;
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
  --color-success-50: #0a1e0a;
  --color-success-100: #102e10;
  --color-success-200: #1b4c1b;
  --color-success-300: #256a25;
  --color-success-400: #309430;
  --color-success-500: #35a435;
  --color-success-600: #43c243;
  --color-success-700: #64cc64;
  --color-success-800: #a2e2a2;
  --color-success-900: #c9ebc9;
  --color-info-50: #0a191e;
  --color-info-100: #122a34;
  --color-info-200: #1d4351;
  --color-info-300: #275b70;
  --color-info-400: #327c9a;
  --color-info-500: #3789aa;
  --color-info-600: #49a1c4;
  --color-info-700: #6ab2cf;
  --color-info-800: #a9d3e4;
  --color-info-900: #d0e5ee;
  --color-warning-50: #251c04;
  --color-warning-100: #372b06;
  --color-warning-200: #493908;
  --color-warning-300: #5c480a;
  --color-warning-400: #8d6c0b;
  --color-warning-500: #a07c0d;
  --color-warning-600: #c89a10;
  --color-warning-700: #ecb718;
  --color-warning-800: #f6d05d;
  --color-warning-900: #f6dc8e;
  --color-danger-50: #200909;
  --color-danger-100: #401212;
  --color-danger-200: #5f1b1b;
  --color-danger-300: #802424;
  --color-danger-400: #ad2c2c;
  --color-danger-500: #bf3030;
  --color-danger-600: #d14949;
  --color-danger-700: #da6c6c;
  --color-danger-800: #edb0b0;
  --color-danger-900: #f4d8d8;
  --color-semantic-surface: #16171a;
  --color-semantic-onSurface: #ffffff;
  --color-semantic-primaryText: #49a1c4;
  --color-semantic-primaryFill: #327c9a;
  --color-semantic-infoFill: #327c9a;
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

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Backdrop tokens - used for modal dialogs, drawers, overlays (dark mode) */
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #327c9a 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ce2d5b 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #327c9a 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ce2d5b 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ce2d5b 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #327c9a 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ce2d5b 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ce2d5b 10%, transparent) 0px, transparent 50%);
    
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
  --color-primary-50: #0a191e;
  --color-primary-100: #122a34;
  --color-primary-200: #1d4351;
  --color-primary-300: #275b70;
  --color-primary-400: #327c9a;
  --color-primary-500: #3789aa;
  --color-primary-600: #49a1c4;
  --color-primary-700: #6ab2cf;
  --color-primary-800: #a9d3e4;
  --color-primary-900: #d0e5ee;
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
  --color-accent-50: #3a0e1b;
  --color-accent-100: #5b162a;
  --color-accent-200: #7c1e3a;
  --color-accent-300: #9c2749;
  --color-accent-400: #ce2d5b;
  --color-accent-500: #d53b68;
  --color-accent-600: #dc5f84;
  --color-accent-700: #e4839f;
  --color-accent-800: #f4c1d0;
  --color-accent-900: #f6d6e0;
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
  --color-success-50: #0a1e0a;
  --color-success-100: #102e10;
  --color-success-200: #1b4c1b;
  --color-success-300: #256a25;
  --color-success-400: #309430;
  --color-success-500: #35a435;
  --color-success-600: #43c243;
  --color-success-700: #64cc64;
  --color-success-800: #a2e2a2;
  --color-success-900: #c9ebc9;
  --color-info-50: #0a191e;
  --color-info-100: #122a34;
  --color-info-200: #1d4351;
  --color-info-300: #275b70;
  --color-info-400: #327c9a;
  --color-info-500: #3789aa;
  --color-info-600: #49a1c4;
  --color-info-700: #6ab2cf;
  --color-info-800: #a9d3e4;
  --color-info-900: #d0e5ee;
  --color-warning-50: #251c04;
  --color-warning-100: #372b06;
  --color-warning-200: #493908;
  --color-warning-300: #5c480a;
  --color-warning-400: #8d6c0b;
  --color-warning-500: #a07c0d;
  --color-warning-600: #c89a10;
  --color-warning-700: #ecb718;
  --color-warning-800: #f6d05d;
  --color-warning-900: #f6dc8e;
  --color-danger-50: #200909;
  --color-danger-100: #401212;
  --color-danger-200: #5f1b1b;
  --color-danger-300: #802424;
  --color-danger-400: #ad2c2c;
  --color-danger-500: #bf3030;
  --color-danger-600: #d14949;
  --color-danger-700: #da6c6c;
  --color-danger-800: #edb0b0;
  --color-danger-900: #f4d8d8;
  --color-semantic-surface: #16171a;
  --color-semantic-onSurface: #ffffff;
  --color-semantic-primaryText: #49a1c4;
  --color-semantic-primaryFill: #327c9a;
  --color-semantic-infoFill: #327c9a;
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
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #327c9a 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #ce2d5b 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #327c9a 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #999ea5 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #999ea5 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #ce2d5b 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #ce2d5b 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #327c9a 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #999ea5 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #ce2d5b 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #327c9a 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #327c9a 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #ce2d5b 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #999ea5 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #ce2d5b 10%, transparent) 0px, transparent 50%);
    }
`;
