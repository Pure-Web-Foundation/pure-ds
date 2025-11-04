// Pure Design System - styles
// Auto-generated - do not edit directly

export const styles = new CSSStyleSheet();
styles.replaceSync(`@layer tokens {
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

@layer primitives {
  /* Base HTML reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :where(html) {
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-lineHeight-normal);
    color: var(--color-text-primary);
    background-color: var(--color-surface-base);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: 4;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  :where(dialog){
    background-color: transparent;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: var(--layout-minHeight, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-600);
    padding: var(--spacing-2) var(--spacing-4);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    min-height: 44px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-700);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  :where(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(button):active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Input primitives */
  :where(input:not([type="radio"]):not([type="checkbox"]):not([type="range"]):not([type="color"])),
  :where(select),
  :where(textarea) {
    font: inherit;
    color: var(--color-text-primary);
    background: var(--color-input-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-2) var(--spacing-3);
    min-height: 40px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  :where(input):focus-visible,
  :where(select):focus-visible,
  :where(textarea):focus-visible {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
  }

  :where(input):disabled,
  :where(select):disabled,
  :where(textarea):disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-input-disabled-bg);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-600);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: opacity var(--transition-fast);
  }

  :where(a):hover {
    opacity: 0.8;
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  /* Form primitives */
  :where(label) {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  :where(fieldset) {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
    margin: 0 0 var(--spacing-4) 0;
    background-color: var(--color-surface-subtle);
  }

  :where(legend) {
    font-weight: var(--font-weight-semibold);
    padding: 0 var(--spacing-2);
    color: var(--color-text-primary);
  }

  /* List primitives */
  :where(ul, ol) {
    padding-left: var(--spacing-6);
    margin: var(--spacing-3) 0;
  }

  :where(li) {
    margin: var(--spacing-1) 0;
  }

  /* Typography primitives */
  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-headings);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-lineHeight-tight);
    margin: var(--spacing-4) 0 var(--spacing-3) 0;
    color: var(--color-text-primary);
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  /* Mobile-first heading sizes */
  :where(h1) { font-size: var(--font-size-2xl); }
  :where(h2) { font-size: var(--font-size-xl); }
  :where(h3) { font-size: var(--font-size-lg); }
  :where(h4) { font-size: var(--font-size-base); }
  :where(h5) { font-size: var(--font-size-sm); }
  :where(h6) { font-size: var(--font-size-xs); }

  /* Scale up on larger screens */
  @media (min-width: 640px) {
    :where(h1) { font-size: var(--font-size-3xl); }
    :where(h2) { font-size: var(--font-size-2xl); }
    :where(h3) { font-size: var(--font-size-xl); }
    :where(h4) { font-size: var(--font-size-lg); }
    :where(h5) { font-size: var(--font-size-base); }
    :where(h6) { font-size: var(--font-size-sm); }
  }

  :where(p) {
    margin: var(--spacing-3) 0;
    line-height: var(--font-lineHeight-relaxed);
    color: var(--color-text-primary);
  }

  /* Code primitives */
  :where(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
    background: var(--color-surface-muted);
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
  }

  :where(pre) {
    font-family: var(--font-family-mono, monospace);
    background: var(--color-surface-muted);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }

  :where(pre code) {
    background: none;
    padding: 0;
  }

  /* Media primitives */
  :where(img, video) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  :where(figure) {
    margin: 0 0 var(--spacing-6) 0;
  }

  :where(figcaption) {
    margin-top: var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--font-lineHeight-relaxed);
  }
}

@layer components {
/* Semantic HTML Elements */

blockquote {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
  
  p:last-child {
    margin-bottom: 0;
  }
  
  cite {
    display: block;
    margin-top: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-style: normal;
    color: var(--color-text-tertiary);
    
    &::before {
      content: "— ";
    }
  }
}

hr {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

dl {
  margin: 0 0 var(--spacing-4) 0;
}

dt {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

dd {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

nav, header, footer {
  display: block;
}

header, footer {
  width: 100%;
}

article, section, aside {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

mark {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

kbd {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
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

details {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] summary {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(summary) {
    padding: var(--spacing-4);
  }
}

summary {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &::after {
    content: "›";
    display: inline-block;
    transform: rotate(90deg);
    transition: transform var(--transition-fast);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-secondary);
  }
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
}

/* Dialog styles moved to #generateDialogStyles() */

/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0 0 var(--spacing-2) 0;
  padding: var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  width: 100%;
  background-color: var(--color-surface-subtle);
  
  &[role="radiogroup"] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    padding: var(--spacing-3);
    background-color: transparent;
  }
  
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    &:has(label:nth-child(6)) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-2);
    }
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-2) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      
      &:hover {
        color: var(--color-primary-700);
      }
    }
    
    input[type="checkbox"] {
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
      
      &:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
      }
    }
  }
}

legend {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
  border: none;
  line-height: var(--font-lineHeight-tight);
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-base);
}

.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-lineHeight-relaxed);
}

input, textarea, select {
  width: 100%;
  min-height: 40px;
  padding: calc(var(--spacing-1) * 0.75) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-lineHeight-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
    background-color: var(--color-surface-base);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
    
    &:focus {
      box-shadow: 0 0 0 3px var(--color-danger-500)4d;
    }
  }
}

input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
}

/* Make range visually match other inputs */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: var(--input-min-height, 40px); /* align control height with inputs */
  width: 100%;
}

/* Track and thumb styling for WebKit */
input[type="range"]::-webkit-slider-runnable-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  cursor: grab;
  border: 1px solid var(--color-border);
}

/* Track and thumb styling for Firefox */
input[type="range"]::-moz-range-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-moz-range-thumb {
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
}

/* Hover and active states */
input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus-visible::-webkit-slider-thumb {
  cursor: grabbing;
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
}

input[type="range"]:active::-webkit-slider-thumb {
  background: var(--color-primary-600);
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus-visible::-moz-range-thumb {
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
  cursor: grabbing;
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-primary-500);  
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-600);
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
label:has(input[type="checkbox"]):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"] + label,
input[type="checkbox"] + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: calc(var(--spacing-1) * 1) var(--spacing-4);
  border: 1px solid var(--color-semantic-primaryText);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-semantic-primaryText);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Radio group labels - reduced padding to distinguish from regular buttons */
fieldset[role="radiogroup"] label,
fieldset[role="radiogroup"] label:has(input[type="radio"]) {
  padding: calc(var(--spacing-1) * 0.5) calc(var(--spacing-4) * 0.75);
  min-height: calc(44px * 0.85);
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Hover states */
fieldset[role="radiogroup"] label:hover,
label:has(input[type="radio"]:not(:disabled)):hover,
label:has(input[type="checkbox"]:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:not(:disabled) + label:hover,
input[type="checkbox"]:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-semantic-primaryText) 10%, transparent);
  border-color: var(--color-semantic-primaryText);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-semantic-primaryFill);
  color: white;
  border-color: var(--color-semantic-primaryFill);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-semantic-primaryFill) 90%, black 10%);
  border-color: color-mix(in oklab, var(--color-semantic-primaryFill) 90%, black 10%);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-500)4d;
}

/* Disabled states */
label:has(input[type="radio"]:disabled),
label:has(input[type="checkbox"]:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="radio"]:checked:disabled),
label:has(input[type="checkbox"]:checked:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:disabled + label,
input[type="checkbox"]:checked:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
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
  font-weight: var(--font-weight-normal);
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

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);
}

label[data-toggle] {
  display: inline-flex;
  justify-content: flex-end;
  flex-flow: row-reverse;
}
/* Hide the original checkbox in toggle switches */
label[data-toggle] input[type="checkbox"] {
  display: none;
}



/* Toggle switch container */
label[data-toggle] .toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background-color: var(--color-gray-300);
  border-radius: var(--radius-full);
  transition: background-color 200ms ease;
  cursor: pointer;
  flex-shrink: 0;
}

/* Toggle switch when checked - using :has() selector */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-switch {
  background-color: var(--color-accent-500);
}


/* Toggle switch knob */
label[data-toggle] .toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: left 200ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Toggle knob when checked */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-knob {
  left: 22px;
}

/* Focus state for toggle switch */
label[data-toggle]:has(input[type="checkbox"]:focus) .toggle-switch {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Disabled state */
label[data-toggle]:has(input[type="checkbox"]:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

label[data-toggle]:has(input[type="checkbox"]:disabled) .toggle-switch {
  opacity: 0.5;
  cursor: not-allowed;
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
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: calc(var(--spacing-1) * 1) var(--spacing-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-primary {
  background-color: var(--color-semantic-primaryFill);
  color: var(--color-semantic-onPrimaryFill);
  border-color: var(--color-semantic-primaryFill);
  
  &:hover {
    background-color: var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill));
    border-color: var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill));
    color: var(--color-semantic-onPrimaryFillHover, var(--color-semantic-onPrimaryFill));
  }

  &:active {
    background-color: var(--color-semantic-primaryFillActive, var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill)));
    border-color: var(--color-semantic-primaryFillActive, var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill)));
    color: var(--color-semantic-onPrimaryFillActive, var(--color-semantic-onPrimaryFillHover, var(--color-semantic-onPrimaryFill)));
  }
  
  &:focus {
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-semantic-primaryText);
  border-color: var(--color-semantic-primaryText);
  
  &:hover {
    background-color: var(--color-semantic-primaryText);
    color: white;
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(44px * 0.8);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(44px * 1.2);
}

/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: 0 var(--spacing-3);
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  align-items: center;
  position: relative;

  input[type="range"] {
    border: none
  }
}

.range-bubble {
  position: absolute;
  top: calc(-1 * (var(--range-thumb-size, 28px) + var(--spacing-2)));
  transform: translateX(-50%);
  min-width: calc(var(--range-thumb-size, 28px) * 0.8);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease, transform 150ms ease;
}

.range-bubble.visible {
  opacity: 1;
}

/* Anchor bubble to the thumb position using left (set by enhancer)
   and center with translateX(-50%). */

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
  border: 1px solid var(--color-border);
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
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-4);
}

.array-controls button {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: auto;
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
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
  border-top: 1px solid var(--color-border);
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
  
  .actions button,
  .actions .btn {
    width: 100%;
  }
  
  /* Icon-only buttons should remain compact even on mobile */
  .actions button.icon-only,
  .actions a.icon-only {
    width: 44px;
    align-self: center;
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
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--font-lineHeight-tight);
}

.category-description {
  font-size: var(--font-size-sm);
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
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
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
  font-weight: var(--font-weight-medium);
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
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
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
    font-size: var(--font-size-xl);
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
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  z-index: calc(var(--z-modal) - 1);
  opacity: var(--backdrop-opacity, 1);
}

/* Hide backdrop on mobile (full screen) */
@media (max-width: 767px) {
  auto-form::before {
    display: none;
  }
}

/* Alert/Notification Styles */

/* Alias: .semantic-message shares alert base styles */
.alert, .semantic-message {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-relaxed);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.alert-success, .semantic-message.success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.alert-info, .semantic-message.info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.alert-warning, .semantic-message.warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.alert-danger,
.alert-error,
.semantic-message.danger {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

/* Semantic-message content defaults */
.semantic-message strong { display: block; }
.semantic-message p { margin: 0; font-size: var(--font-size-sm); }

.alert-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.alert-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
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
  font-size: var(--font-size-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
}

/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
  border-radius: var(--radius-full);
}

.badge-primary {
  background-color: var(--color-semantic-primaryFill);
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
  background-color: var(--color-semantic-infoFill);
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

.badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
}

.badge-outline.badge-primary {
  color: var(--color-semantic-primaryText);
}

.badge-outline.badge-secondary {
  color: var(--color-secondary-600);
}

.badge-outline.badge-success {
  color: var(--color-success-600);
}

.badge-outline.badge-info {
  color: var(--color-semantic-infoFill);
}

.badge-outline.badge-warning {
  color: var(--color-warning-600);
}

.badge-outline.badge-danger {
  color: var(--color-danger-600);
}

.badge-sm {
  padding: 2px var(--spacing-1);
  font-size: 10px;
}

.badge-lg {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.pill {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
}

/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  inset: 0;
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100vh - var(--spacing-8)));
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  scale: 0.95;
  transition: 
    opacity 0.2s ease,
    scale 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
  
  /* Overflow handling */
  overflow: hidden;
}

/* Open state */
dialog[open] {
  opacity: 1;
  scale: 1;
}

/* Starting style for smooth open animation */
@starting-style {
  dialog[open] {
    opacity: 0;
    scale: 0.95;
  }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: 
    opacity 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
}

/* Dialog header */
dialog header,
dialog form > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--surface-overlay-border);
  flex-shrink: 0;
}

dialog header h2,
dialog header h3,
dialog form > header h2,
dialog form > header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--surface-overlay-text);
  flex: 1;
}

/* Close button in header */
dialog header button[value="cancel"],
dialog header .dialog-close {
  background: none;
  border: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--surface-overlay-icon);
  transition: background-color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
}

/* Dialog body - scrollable content */
dialog article,
dialog form > article,
dialog .dialog-body {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Dialog footer - actions */
dialog footer,
dialog form > footer {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-3);
  justify-content: flex-end;
  align-items: center;
  padding: var(--spacing-6);
  border-top: 1px solid var(--surface-overlay-border);
  flex-shrink: 0;
}

/* Dialog size modifiers */
dialog.dialog-sm {
  max-width: min(400px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-lg {
  max-width: min(800px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-xl {
  max-width: min(1200px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-full {
  max-width: calc(100vw - var(--spacing-8));
  max-height: calc(100vh - var(--spacing-8));
}

/* Mobile responsiveness */
@media (max-width: 639px) {
  dialog {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
  
  dialog header,
  dialog form > header,
  dialog article,
  dialog form > article,
  dialog footer,
  dialog form > footer {
    padding: var(--spacing-4);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog,
  dialog::backdrop {
    transition-duration: 0.01s !important;
  }
}

/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  padding: 0;
}

nav[data-dropdown] menu {
  position: absolute;
  list-style: none;
  padding: var(--spacing-2);
  margin: 0;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  /* Default drop direction: down (top anchored). JavaScript enhancer may
     override for data-mode="auto" by switching to bottom:100% when needed. */
  top: 100%;
  bottom: auto;
  left: 0;
  right: 0;
  margin-top: var(--spacing-2);
  display: none;
}

nav[data-dropdown] li {
  padding: var(--spacing-2) 0;
}

nav[data-dropdown] li + li {
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-2);
}

nav[data-dropdown] a {
  display: flex;
  color: var(--color-text-primary);
  text-decoration: none;
  align-items: center;
  gap: var(--spacing-2);
}

nav[data-dropdown] a.danger {
  color: var(--color-danger-600);
}

/* Explicit direction modifiers */
nav[data-dropdown][data-mode="up"] menu {
  top: auto;
  bottom: 100%;
  margin-bottom: var(--spacing-2);
}

nav[data-dropdown][data-mode="down"] menu {
  top: 100%;
  bottom: auto;
  margin-top: var(--spacing-2);
}

/* Auto acts like down by default; the enhancer will calculate at runtime
   and set inline top/bottom when necessary to avoid overflow. */
nav[data-dropdown][data-mode="auto"] menu {
  top: 100%;
  bottom: auto;
}
/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);
}
pds-tabstrip > nav {
  display: flex;
  gap: var(--spacing-1);
  border-bottom: 2px solid var(--color-border);
  margin-bottom: var(--spacing-6);
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

pds-tabstrip > nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Tab links */
pds-tabstrip > nav > a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color var(--transition-fast);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px; /* Overlap the nav border */
}

pds-tabstrip > nav > a:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-hover);
}

pds-tabstrip > nav > a:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
  z-index: 1;
}

/* Active tab */
pds-tabstrip > nav > a[aria-current="page"] {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
  border-bottom-color: var(--color-primary-600);
}

pds-tabstrip > nav > a[aria-current="page"]:hover {
  color: var(--color-primary-700);
  border-bottom-color: var(--color-primary-700);
  background-color: var(--color-primary-50);
}

/* Tab panel */
pds-tabstrip > pds-tabpanel {
  display: block;
  margin-top: var(--spacing-4);
}

pds-tabstrip > pds-tabpanel[data-tabpanel] {
  animation: tabFadeIn var(--transition-normal) ease-out;
}

@keyframes tabFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

pds-tabstrip > pds-tabpanel[data-tabpanel][hidden] {
  display: none;
}

/* Tab content styling */
pds-tabstrip > pds-tabpanel[data-tabpanel] {
  padding: var(--spacing-4) 0;
}

/* Mobile responsive */
@media (max-width: 639px) {
  pds-tabstrip > nav {
    gap: var(--spacing-1);
  }

  pds-tabstrip > nav > a {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }

  pds-tabstrip > pds-tabpanel[data-tabpanel] {
    padding: var(--spacing-3) 0;
  }
}

/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: 640px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: 639px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
    
    table {
      min-width: 600px;
      margin: 0;
    }
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody {
  tr {
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--color-surface-subtle);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}

.table-striped tbody tr:nth-child(even) {
  background-color: var(--color-surface-subtle);
}

.table-bordered {
  border: 1px solid var(--color-border);
  
  th, td {
    border: 1px solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

.card--elevated, .card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card--outlined, .card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
/* Custom Scrollbars */

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  
  &-track {
    background: transparent;
  }
  
  &-thumb {
    background: var(--color-secondary-300);
    border-radius: var(--radius-full);
    border: 3px solid transparent;
    background-clip: padding-box;
    transition: background-color var(--transition-fast);
    
    &:hover {
      background: var(--color-secondary-400);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    &:active {
      background: var(--color-secondary-500);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    @media (prefers-color-scheme: dark) {
      background: var(--color-secondary-600);
      
      &:hover {
        background: var(--color-secondary-500);
      }
      
      &:active {
        background: var(--color-secondary-400);
      }
    }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  
  @media (prefers-color-scheme: dark) {
    scrollbar-color: var(--color-secondary-600) transparent;
  }
}

/* Hover effect for scrollable containers */
*:hover {
  scrollbar-color: var(--color-secondary-400) transparent;
}

@media (prefers-color-scheme: dark) {
  *:hover {
    scrollbar-color: var(--color-secondary-500) transparent;
  }
}

}

@layer utilities {
/* Icon System */

pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  pointer-events: none;
}

/* Icon size utilities */
.icon-xs,
pds-icon[size="xs"] {
  width: var(--icon-size-xs);
  height: var(--icon-size-xs);
}

.icon-sm,
pds-icon[size="sm"] {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}

.icon-md,
pds-icon[size="md"] {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
}

.icon-lg,
pds-icon[size="lg"] {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}

.icon-xl,
pds-icon[size="xl"] {
  width: var(--icon-size-xl);
  height: var(--icon-size-xl);
}

.icon-2xl,
pds-icon[size="2xl"] {
  width: var(--icon-size-2xl);
  height: var(--icon-size-2xl);
}

/* Icon color utilities */
.icon-primary,
pds-icon.primary {
  color: var(--color-primary-600);
}

.icon-secondary,
pds-icon.secondary {
  color: var(--color-secondary-600);
}

.icon-accent,
pds-icon.accent {
  color: var(--color-accent-600);
}

.icon-success,
pds-icon.success {
  color: var(--color-success-600);
}

.icon-warning,
pds-icon.warning {
  color: var(--color-warning-600);
}

.icon-danger,
pds-icon.danger {
  color: var(--color-danger-600);
}

.icon-info,
pds-icon.info {
  color: var(--color-info-600);
}

.icon-muted,
pds-icon.muted {
  color: var(--color-text-muted);
}

.icon-subtle,
pds-icon.subtle {
  color: var(--color-text-subtle);
}

/* Icon with text combinations */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
}

.icon-text-start {
  flex-direction: row;
}

.icon-text-end {
  flex-direction: row-reverse;
}

/* Button icon utilities */
button pds-icon,
a pds-icon {
  flex-shrink: 0;
}

button.icon-only,
a.icon-only {
  padding: var(--spacing-2);
  min-width: 44px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Icon in inputs */
.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon pds-icon {
  position: absolute;
  left: var(--spacing-3);
  color: var(--color-text-muted);
  pointer-events: none;
}

.input-icon input {
  padding-left: calc(var(--icon-size) + var(--spacing-5));
}

.input-icon-end pds-icon {
  left: auto;
  right: var(--spacing-3);
}

.input-icon-end input {
  padding-left: var(--spacing-3);
  padding-right: calc(var(--icon-size) + var(--spacing-5));
}


/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--spacing-4);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }

/* Auto-fit grids (responsive) */
.grid-auto-sm { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.grid-auto-md { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-auto-lg { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); }
.grid-auto-xl { grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); }

/* Gap utilities */
.gap-0 { gap: 0; }
.gap-xs { gap: var(--spacing-1); }
.gap-sm { gap: var(--spacing-2); }
.gap-md { gap: var(--spacing-4); }
.gap-lg { gap: var(--spacing-6); }
.gap-xl { gap: var(--spacing-8); }


/* Flexbox System */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

/* Flex alignment */
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }
.items-baseline { align-items: baseline; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Responsive helpers */
@media (max-width: 767px) {
  .mobile-stack { flex-direction: column; }
  .mobile-stack > * { width: 100%; }
}

/* ============================================================================
   Backdrop Utilities
   Reusable backdrop layer for modal components (dialogs, drawers, overlays)
   ============================================================================ */

/* Base backdrop class for modal overlays */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: var(--z-modal, 1040);
}

.backdrop.active {
  opacity: var(--backdrop-opacity, 1);
  pointer-events: auto;
}

/* Backdrop variants */
.backdrop-light {
  --backdrop-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  --backdrop-brightness: 1.1;
}

.backdrop-dark {
  --backdrop-bg: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  --backdrop-brightness: 0.6;
}

.backdrop-blur-sm {
  --backdrop-blur: 5px;
}

.backdrop-blur-md {
  --backdrop-blur: 10px;
}

.backdrop-blur-lg {
  --backdrop-blur: 20px;
}
/* Surface utilities */

.surface-overlay {
  padding: var(--spacing-4);
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}

/* Media Element Utilities */

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

/* Mobile-First Responsive Design */

/* Small devices (640px and up) */
@media (min-width: 640px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:text-sm { font-size: var(--font-size-sm); }
  .sm\\:p-6 { padding: var(--spacing-6); }
  .sm\\:gap-6 { gap: var(--spacing-6); }
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\\:text-lg { font-size: var(--font-size-lg); }
  .md\\:p-8 { padding: var(--spacing-8); }
  .md\\:gap-8 { gap: var(--spacing-8); }
  .md\\:flex-row { flex-direction: row; }
  .md\\:w-1\\/2 { width: 50%; }
  .md\\:w-1\\/3 { width: 33.333333%; }
  .md\\:hidden { display: none; }
  .md\\:block { display: block; }
}

/* Large devices (1024px and up) */
@media (min-width: 1024px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .lg\\:text-xl { font-size: var(--font-size-xl); }
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
    min-height: 44px;
    min-width: 44px;
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

}
`);

export const stylesCSS = `@layer tokens {
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

@layer primitives {
  /* Base HTML reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :where(html) {
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-lineHeight-normal);
    color: var(--color-text-primary);
    background-color: var(--color-surface-base);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: 4;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  :where(dialog){
    background-color: transparent;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: var(--layout-minHeight, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-600);
    padding: var(--spacing-2) var(--spacing-4);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    min-height: 44px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-700);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  :where(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(button):active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Input primitives */
  :where(input:not([type="radio"]):not([type="checkbox"]):not([type="range"]):not([type="color"])),
  :where(select),
  :where(textarea) {
    font: inherit;
    color: var(--color-text-primary);
    background: var(--color-input-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-2) var(--spacing-3);
    min-height: 40px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  :where(input):focus-visible,
  :where(select):focus-visible,
  :where(textarea):focus-visible {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
  }

  :where(input):disabled,
  :where(select):disabled,
  :where(textarea):disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-input-disabled-bg);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-600);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: opacity var(--transition-fast);
  }

  :where(a):hover {
    opacity: 0.8;
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  /* Form primitives */
  :where(label) {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  :where(fieldset) {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
    margin: 0 0 var(--spacing-4) 0;
    background-color: var(--color-surface-subtle);
  }

  :where(legend) {
    font-weight: var(--font-weight-semibold);
    padding: 0 var(--spacing-2);
    color: var(--color-text-primary);
  }

  /* List primitives */
  :where(ul, ol) {
    padding-left: var(--spacing-6);
    margin: var(--spacing-3) 0;
  }

  :where(li) {
    margin: var(--spacing-1) 0;
  }

  /* Typography primitives */
  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-headings);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-lineHeight-tight);
    margin: var(--spacing-4) 0 var(--spacing-3) 0;
    color: var(--color-text-primary);
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  /* Mobile-first heading sizes */
  :where(h1) { font-size: var(--font-size-2xl); }
  :where(h2) { font-size: var(--font-size-xl); }
  :where(h3) { font-size: var(--font-size-lg); }
  :where(h4) { font-size: var(--font-size-base); }
  :where(h5) { font-size: var(--font-size-sm); }
  :where(h6) { font-size: var(--font-size-xs); }

  /* Scale up on larger screens */
  @media (min-width: 640px) {
    :where(h1) { font-size: var(--font-size-3xl); }
    :where(h2) { font-size: var(--font-size-2xl); }
    :where(h3) { font-size: var(--font-size-xl); }
    :where(h4) { font-size: var(--font-size-lg); }
    :where(h5) { font-size: var(--font-size-base); }
    :where(h6) { font-size: var(--font-size-sm); }
  }

  :where(p) {
    margin: var(--spacing-3) 0;
    line-height: var(--font-lineHeight-relaxed);
    color: var(--color-text-primary);
  }

  /* Code primitives */
  :where(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
    background: var(--color-surface-muted);
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
  }

  :where(pre) {
    font-family: var(--font-family-mono, monospace);
    background: var(--color-surface-muted);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }

  :where(pre code) {
    background: none;
    padding: 0;
  }

  /* Media primitives */
  :where(img, video) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  :where(figure) {
    margin: 0 0 var(--spacing-6) 0;
  }

  :where(figcaption) {
    margin-top: var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--font-lineHeight-relaxed);
  }
}

@layer components {
/* Semantic HTML Elements */

blockquote {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
  
  p:last-child {
    margin-bottom: 0;
  }
  
  cite {
    display: block;
    margin-top: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-style: normal;
    color: var(--color-text-tertiary);
    
    &::before {
      content: "— ";
    }
  }
}

hr {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

dl {
  margin: 0 0 var(--spacing-4) 0;
}

dt {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

dd {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

nav, header, footer {
  display: block;
}

header, footer {
  width: 100%;
}

article, section, aside {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

mark {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

kbd {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
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

details {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] summary {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(summary) {
    padding: var(--spacing-4);
  }
}

summary {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &::after {
    content: "›";
    display: inline-block;
    transform: rotate(90deg);
    transition: transform var(--transition-fast);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-secondary);
  }
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
}

/* Dialog styles moved to #generateDialogStyles() */

/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0 0 var(--spacing-2) 0;
  padding: var(--spacing-4);
  border: none;
  border-radius: var(--radius-md);
  width: 100%;
  background-color: var(--color-surface-subtle);
  
  &[role="radiogroup"] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    padding: var(--spacing-3);
    background-color: transparent;
  }
  
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    &:has(label:nth-child(6)) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-2);
    }
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-2) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      
      &:hover {
        color: var(--color-primary-700);
      }
    }
    
    input[type="checkbox"] {
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
      
      &:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
      }
    }
  }
}

legend {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
  border: none;
  line-height: var(--font-lineHeight-tight);
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-base);
}

.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-lineHeight-relaxed);
}

input, textarea, select {
  width: 100%;
  min-height: 40px;
  padding: calc(var(--spacing-1) * 0.75) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-lineHeight-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
    background-color: var(--color-surface-base);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
    
    &:focus {
      box-shadow: 0 0 0 3px var(--color-danger-500)4d;
    }
  }
}

input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
}

/* Make range visually match other inputs */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: var(--input-min-height, 40px); /* align control height with inputs */
  width: 100%;
}

/* Track and thumb styling for WebKit */
input[type="range"]::-webkit-slider-runnable-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  cursor: grab;
  border: 1px solid var(--color-border);
}

/* Track and thumb styling for Firefox */
input[type="range"]::-moz-range-track {
  height: var(--range-track-height, 8px);
  background: var(--color-input-bg);
  border-radius: var(--radius-full);
}

input[type="range"]::-moz-range-thumb {
  width: var(--range-thumb-size, 28px);
  height: var(--range-thumb-size, 28px);
  background: var(--color-surface-base);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
}

/* Hover and active states */
input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus-visible::-webkit-slider-thumb {
  cursor: grabbing;
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
}

input[type="range"]:active::-webkit-slider-thumb {
  background: var(--color-primary-600);
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus-visible::-moz-range-thumb {
  background: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border-color: var(--color-primary-600);
  cursor: grabbing;
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-primary-500);  
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-600);
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
label:has(input[type="checkbox"]):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"] + label,
input[type="checkbox"] + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: calc(var(--spacing-1) * 1) var(--spacing-4);
  border: 1px solid var(--color-semantic-primaryText);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-semantic-primaryText);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Radio group labels - reduced padding to distinguish from regular buttons */
fieldset[role="radiogroup"] label,
fieldset[role="radiogroup"] label:has(input[type="radio"]) {
  padding: calc(var(--spacing-1) * 0.5) calc(var(--spacing-4) * 0.75);
  min-height: calc(44px * 0.85);
  flex: 0 1 auto;
  white-space: nowrap;
}

/* Hover states */
fieldset[role="radiogroup"] label:hover,
label:has(input[type="radio"]:not(:disabled)):hover,
label:has(input[type="checkbox"]:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:not(:disabled) + label:hover,
input[type="checkbox"]:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-semantic-primaryText) 10%, transparent);
  border-color: var(--color-semantic-primaryText);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-semantic-primaryFill);
  color: white;
  border-color: var(--color-semantic-primaryFill);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-semantic-primaryFill) 90%, black 10%);
  border-color: color-mix(in oklab, var(--color-semantic-primaryFill) 90%, black 10%);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-500)4d;
}

/* Disabled states */
label:has(input[type="radio"]:disabled),
label:has(input[type="checkbox"]:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="radio"]:checked:disabled),
label:has(input[type="checkbox"]:checked:disabled):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:disabled + label,
input[type="checkbox"]:checked:disabled + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
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
  font-weight: var(--font-weight-normal);
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

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);
}

label[data-toggle] {
  display: inline-flex;
  justify-content: flex-end;
  flex-flow: row-reverse;
}
/* Hide the original checkbox in toggle switches */
label[data-toggle] input[type="checkbox"] {
  display: none;
}



/* Toggle switch container */
label[data-toggle] .toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background-color: var(--color-gray-300);
  border-radius: var(--radius-full);
  transition: background-color 200ms ease;
  cursor: pointer;
  flex-shrink: 0;
}

/* Toggle switch when checked - using :has() selector */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-switch {
  background-color: var(--color-accent-500);
}


/* Toggle switch knob */
label[data-toggle] .toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: left 200ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Toggle knob when checked */
label[data-toggle]:has(input[type="checkbox"]:checked) .toggle-knob {
  left: 22px;
}

/* Focus state for toggle switch */
label[data-toggle]:has(input[type="checkbox"]:focus) .toggle-switch {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Disabled state */
label[data-toggle]:has(input[type="checkbox"]:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

label[data-toggle]:has(input[type="checkbox"]:disabled) .toggle-switch {
  opacity: 0.5;
  cursor: not-allowed;
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
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: calc(var(--spacing-1) * 1) var(--spacing-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-primary {
  background-color: var(--color-semantic-primaryFill);
  color: var(--color-semantic-onPrimaryFill);
  border-color: var(--color-semantic-primaryFill);
  
  &:hover {
    background-color: var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill));
    border-color: var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill));
    color: var(--color-semantic-onPrimaryFillHover, var(--color-semantic-onPrimaryFill));
  }

  &:active {
    background-color: var(--color-semantic-primaryFillActive, var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill)));
    border-color: var(--color-semantic-primaryFillActive, var(--color-semantic-primaryFillHover, var(--color-semantic-primaryFill)));
    color: var(--color-semantic-onPrimaryFillActive, var(--color-semantic-onPrimaryFillHover, var(--color-semantic-onPrimaryFill)));
  }
  
  &:focus {
    box-shadow: 0 0 0 3px var(--color-primary-500)4d;
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-semantic-primaryText);
  border-color: var(--color-semantic-primaryText);
  
  &:hover {
    background-color: var(--color-semantic-primaryText);
    color: white;
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(44px * 0.8);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(44px * 1.2);
}

/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: 0 var(--spacing-3);
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  align-items: center;
  position: relative;

  input[type="range"] {
    border: none
  }
}

.range-bubble {
  position: absolute;
  top: calc(-1 * (var(--range-thumb-size, 28px) + var(--spacing-2)));
  transform: translateX(-50%);
  min-width: calc(var(--range-thumb-size, 28px) * 0.8);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease, transform 150ms ease;
}

.range-bubble.visible {
  opacity: 1;
}

/* Anchor bubble to the thumb position using left (set by enhancer)
   and center with translateX(-50%). */

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
  border: 1px solid var(--color-border);
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
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-4);
}

.array-controls button {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: auto;
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
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
  border-top: 1px solid var(--color-border);
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
  
  .actions button,
  .actions .btn {
    width: 100%;
  }
  
  /* Icon-only buttons should remain compact even on mobile */
  .actions button.icon-only,
  .actions a.icon-only {
    width: 44px;
    align-self: center;
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
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--font-lineHeight-tight);
}

.category-description {
  font-size: var(--font-size-sm);
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
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
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
  font-weight: var(--font-weight-medium);
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
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
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
    font-size: var(--font-size-xl);
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
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  z-index: calc(var(--z-modal) - 1);
  opacity: var(--backdrop-opacity, 1);
}

/* Hide backdrop on mobile (full screen) */
@media (max-width: 767px) {
  auto-form::before {
    display: none;
  }
}

/* Alert/Notification Styles */

/* Alias: .semantic-message shares alert base styles */
.alert, .semantic-message {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-lineHeight-relaxed);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.alert-success, .semantic-message.success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.alert-info, .semantic-message.info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.alert-warning, .semantic-message.warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.alert-danger,
.alert-error,
.semantic-message.danger {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

/* Semantic-message content defaults */
.semantic-message strong { display: block; }
.semantic-message p { margin: 0; font-size: var(--font-size-sm); }

.alert-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.alert-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
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
  font-size: var(--font-size-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
}

/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
  border-radius: var(--radius-full);
}

.badge-primary {
  background-color: var(--color-semantic-primaryFill);
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
  background-color: var(--color-semantic-infoFill);
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

.badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
}

.badge-outline.badge-primary {
  color: var(--color-semantic-primaryText);
}

.badge-outline.badge-secondary {
  color: var(--color-secondary-600);
}

.badge-outline.badge-success {
  color: var(--color-success-600);
}

.badge-outline.badge-info {
  color: var(--color-semantic-infoFill);
}

.badge-outline.badge-warning {
  color: var(--color-warning-600);
}

.badge-outline.badge-danger {
  color: var(--color-danger-600);
}

.badge-sm {
  padding: 2px var(--spacing-1);
  font-size: 10px;
}

.badge-lg {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.pill {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
}

/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  inset: 0;
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100vh - var(--spacing-8)));
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  scale: 0.95;
  transition: 
    opacity 0.2s ease,
    scale 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
  
  /* Overflow handling */
  overflow: hidden;
}

/* Open state */
dialog[open] {
  opacity: 1;
  scale: 1;
}

/* Starting style for smooth open animation */
@starting-style {
  dialog[open] {
    opacity: 0;
    scale: 0.95;
  }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: 
    opacity 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
}

/* Dialog header */
dialog header,
dialog form > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--surface-overlay-border);
  flex-shrink: 0;
}

dialog header h2,
dialog header h3,
dialog form > header h2,
dialog form > header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--surface-overlay-text);
  flex: 1;
}

/* Close button in header */
dialog header button[value="cancel"],
dialog header .dialog-close {
  background: none;
  border: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--surface-overlay-icon);
  transition: background-color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
}

/* Dialog body - scrollable content */
dialog article,
dialog form > article,
dialog .dialog-body {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Dialog footer - actions */
dialog footer,
dialog form > footer {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-3);
  justify-content: flex-end;
  align-items: center;
  padding: var(--spacing-6);
  border-top: 1px solid var(--surface-overlay-border);
  flex-shrink: 0;
}

/* Dialog size modifiers */
dialog.dialog-sm {
  max-width: min(400px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-lg {
  max-width: min(800px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-xl {
  max-width: min(1200px, calc(100vw - var(--spacing-8)));
}

dialog.dialog-full {
  max-width: calc(100vw - var(--spacing-8));
  max-height: calc(100vh - var(--spacing-8));
}

/* Mobile responsiveness */
@media (max-width: 639px) {
  dialog {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
  
  dialog header,
  dialog form > header,
  dialog article,
  dialog form > article,
  dialog footer,
  dialog form > footer {
    padding: var(--spacing-4);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog,
  dialog::backdrop {
    transition-duration: 0.01s !important;
  }
}

/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  padding: 0;
}

nav[data-dropdown] menu {
  position: absolute;
  list-style: none;
  padding: var(--spacing-2);
  margin: 0;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  /* Default drop direction: down (top anchored). JavaScript enhancer may
     override for data-mode="auto" by switching to bottom:100% when needed. */
  top: 100%;
  bottom: auto;
  left: 0;
  right: 0;
  margin-top: var(--spacing-2);
  display: none;
}

nav[data-dropdown] li {
  padding: var(--spacing-2) 0;
}

nav[data-dropdown] li + li {
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-2);
}

nav[data-dropdown] a {
  display: flex;
  color: var(--color-text-primary);
  text-decoration: none;
  align-items: center;
  gap: var(--spacing-2);
}

nav[data-dropdown] a.danger {
  color: var(--color-danger-600);
}

/* Explicit direction modifiers */
nav[data-dropdown][data-mode="up"] menu {
  top: auto;
  bottom: 100%;
  margin-bottom: var(--spacing-2);
}

nav[data-dropdown][data-mode="down"] menu {
  top: 100%;
  bottom: auto;
  margin-top: var(--spacing-2);
}

/* Auto acts like down by default; the enhancer will calculate at runtime
   and set inline top/bottom when necessary to avoid overflow. */
nav[data-dropdown][data-mode="auto"] menu {
  top: 100%;
  bottom: auto;
}
/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);
}
pds-tabstrip > nav {
  display: flex;
  gap: var(--spacing-1);
  border-bottom: 2px solid var(--color-border);
  margin-bottom: var(--spacing-6);
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

pds-tabstrip > nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Tab links */
pds-tabstrip > nav > a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color var(--transition-fast);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px; /* Overlap the nav border */
}

pds-tabstrip > nav > a:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-hover);
}

pds-tabstrip > nav > a:focus-visible {
  outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
  z-index: 1;
}

/* Active tab */
pds-tabstrip > nav > a[aria-current="page"] {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
  border-bottom-color: var(--color-primary-600);
}

pds-tabstrip > nav > a[aria-current="page"]:hover {
  color: var(--color-primary-700);
  border-bottom-color: var(--color-primary-700);
  background-color: var(--color-primary-50);
}

/* Tab panel */
pds-tabstrip > pds-tabpanel {
  display: block;
  margin-top: var(--spacing-4);
}

pds-tabstrip > pds-tabpanel[data-tabpanel] {
  animation: tabFadeIn var(--transition-normal) ease-out;
}

@keyframes tabFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

pds-tabstrip > pds-tabpanel[data-tabpanel][hidden] {
  display: none;
}

/* Tab content styling */
pds-tabstrip > pds-tabpanel[data-tabpanel] {
  padding: var(--spacing-4) 0;
}

/* Mobile responsive */
@media (max-width: 639px) {
  pds-tabstrip > nav {
    gap: var(--spacing-1);
  }

  pds-tabstrip > nav > a {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }

  pds-tabstrip > pds-tabpanel[data-tabpanel] {
    padding: var(--spacing-3) 0;
  }
}

/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: 640px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: 639px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
    
    table {
      min-width: 600px;
      margin: 0;
    }
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody {
  tr {
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--color-surface-subtle);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}

.table-striped tbody tr:nth-child(even) {
  background-color: var(--color-surface-subtle);
}

.table-bordered {
  border: 1px solid var(--color-border);
  
  th, td {
    border: 1px solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

.card--elevated, .card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card--outlined, .card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
/* Custom Scrollbars */

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  
  &-track {
    background: transparent;
  }
  
  &-thumb {
    background: var(--color-secondary-300);
    border-radius: var(--radius-full);
    border: 3px solid transparent;
    background-clip: padding-box;
    transition: background-color var(--transition-fast);
    
    &:hover {
      background: var(--color-secondary-400);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    &:active {
      background: var(--color-secondary-500);
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    @media (prefers-color-scheme: dark) {
      background: var(--color-secondary-600);
      
      &:hover {
        background: var(--color-secondary-500);
      }
      
      &:active {
        background: var(--color-secondary-400);
      }
    }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  
  @media (prefers-color-scheme: dark) {
    scrollbar-color: var(--color-secondary-600) transparent;
  }
}

/* Hover effect for scrollable containers */
*:hover {
  scrollbar-color: var(--color-secondary-400) transparent;
}

@media (prefers-color-scheme: dark) {
  *:hover {
    scrollbar-color: var(--color-secondary-500) transparent;
  }
}

}

@layer utilities {
/* Icon System */

pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  pointer-events: none;
}

/* Icon size utilities */
.icon-xs,
pds-icon[size="xs"] {
  width: var(--icon-size-xs);
  height: var(--icon-size-xs);
}

.icon-sm,
pds-icon[size="sm"] {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}

.icon-md,
pds-icon[size="md"] {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
}

.icon-lg,
pds-icon[size="lg"] {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}

.icon-xl,
pds-icon[size="xl"] {
  width: var(--icon-size-xl);
  height: var(--icon-size-xl);
}

.icon-2xl,
pds-icon[size="2xl"] {
  width: var(--icon-size-2xl);
  height: var(--icon-size-2xl);
}

/* Icon color utilities */
.icon-primary,
pds-icon.primary {
  color: var(--color-primary-600);
}

.icon-secondary,
pds-icon.secondary {
  color: var(--color-secondary-600);
}

.icon-accent,
pds-icon.accent {
  color: var(--color-accent-600);
}

.icon-success,
pds-icon.success {
  color: var(--color-success-600);
}

.icon-warning,
pds-icon.warning {
  color: var(--color-warning-600);
}

.icon-danger,
pds-icon.danger {
  color: var(--color-danger-600);
}

.icon-info,
pds-icon.info {
  color: var(--color-info-600);
}

.icon-muted,
pds-icon.muted {
  color: var(--color-text-muted);
}

.icon-subtle,
pds-icon.subtle {
  color: var(--color-text-subtle);
}

/* Icon with text combinations */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
}

.icon-text-start {
  flex-direction: row;
}

.icon-text-end {
  flex-direction: row-reverse;
}

/* Button icon utilities */
button pds-icon,
a pds-icon {
  flex-shrink: 0;
}

button.icon-only,
a.icon-only {
  padding: var(--spacing-2);
  min-width: 44px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Icon in inputs */
.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon pds-icon {
  position: absolute;
  left: var(--spacing-3);
  color: var(--color-text-muted);
  pointer-events: none;
}

.input-icon input {
  padding-left: calc(var(--icon-size) + var(--spacing-5));
}

.input-icon-end pds-icon {
  left: auto;
  right: var(--spacing-3);
}

.input-icon-end input {
  padding-left: var(--spacing-3);
  padding-right: calc(var(--icon-size) + var(--spacing-5));
}


/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6);
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--spacing-4);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }

/* Auto-fit grids (responsive) */
.grid-auto-sm { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.grid-auto-md { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-auto-lg { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); }
.grid-auto-xl { grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); }

/* Gap utilities */
.gap-0 { gap: 0; }
.gap-xs { gap: var(--spacing-1); }
.gap-sm { gap: var(--spacing-2); }
.gap-md { gap: var(--spacing-4); }
.gap-lg { gap: var(--spacing-6); }
.gap-xl { gap: var(--spacing-8); }


/* Flexbox System */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

/* Flex alignment */
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }
.items-baseline { align-items: baseline; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Responsive helpers */
@media (max-width: 767px) {
  .mobile-stack { flex-direction: column; }
  .mobile-stack > * { width: 100%; }
}

/* ============================================================================
   Backdrop Utilities
   Reusable backdrop layer for modal components (dialogs, drawers, overlays)
   ============================================================================ */

/* Base backdrop class for modal overlays */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: var(--z-modal, 1040);
}

.backdrop.active {
  opacity: var(--backdrop-opacity, 1);
  pointer-events: auto;
}

/* Backdrop variants */
.backdrop-light {
  --backdrop-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  --backdrop-brightness: 1.1;
}

.backdrop-dark {
  --backdrop-bg: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  --backdrop-brightness: 0.6;
}

.backdrop-blur-sm {
  --backdrop-blur: 5px;
}

.backdrop-blur-md {
  --backdrop-blur: 10px;
}

.backdrop-blur-lg {
  --backdrop-blur: 20px;
}
/* Surface utilities */

.surface-overlay {
  padding: var(--spacing-4);
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}

/* Media Element Utilities */

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

/* Mobile-First Responsive Design */

/* Small devices (640px and up) */
@media (min-width: 640px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:text-sm { font-size: var(--font-size-sm); }
  .sm\\:p-6 { padding: var(--spacing-6); }
  .sm\\:gap-6 { gap: var(--spacing-6); }
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\\:text-lg { font-size: var(--font-size-lg); }
  .md\\:p-8 { padding: var(--spacing-8); }
  .md\\:gap-8 { gap: var(--spacing-8); }
  .md\\:flex-row { flex-direction: row; }
  .md\\:w-1\\/2 { width: 50%; }
  .md\\:w-1\\/3 { width: 33.333333%; }
  .md\\:hidden { display: none; }
  .md\\:block { display: block; }
}

/* Large devices (1024px and up) */
@media (min-width: 1024px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .lg\\:text-xl { font-size: var(--font-size-xl); }
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
    min-height: 44px;
    min-width: 44px;
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

}
`;
