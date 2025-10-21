// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
  :root {
  /* Colors */
  --color-primary-50: #e5f2f7;
  --color-primary-100: #bbdfed;
  --color-primary-200: #8fcee6;
  --color-primary-300: #66bbdd;
  --color-primary-400: #3ca9d3;
  --color-primary-500: #2d9dc9;
  --color-primary-600: #247c9f;
  --color-primary-700: #1a5c76;
  --color-primary-800: #113b4c;
  --color-primary-900: #09212a;
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
  --color-success-50: #d8f3d8;
  --color-success-100: #afeaaf;
  --color-success-200: #82e382;
  --color-success-300: #59da59;
  --color-success-400: #2fd12f;
  --color-success-500: #2abc2a;
  --color-success-600: #219221;
  --color-success-700: #176917;
  --color-success-800: #0e3f0e;
  --color-success-900: #092a09;
  --color-warning-50: #fbeaef;
  --color-warning-100: #f8d3de;
  --color-warning-200: #f4b2c5;
  --color-warning-300: #ee85a4;
  --color-warning-400: #e85882;
  --color-warning-500: #e54271;
  --color-warning-600: #d61e53;
  --color-warning-700: #aa1742;
  --color-warning-800: #7d1130;
  --color-warning-900: #500b1f;
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
  --color-info-50: #e5f2f7;
  --color-info-100: #bbdfed;
  --color-info-200: #8fcee6;
  --color-info-300: #66bbdd;
  --color-info-400: #3ca9d3;
  --color-info-500: #2d9dc9;
  --color-info-600: #247c9f;
  --color-info-700: #1a5c76;
  --color-info-800: #113b4c;
  --color-info-900: #09212a;
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
  --color-surface-fieldset-base: #e3e2d8;
  --color-surface-fieldset-subtle: #deddd2;
  --color-surface-fieldset-elevated: #dad9cc;
  --color-surface-fieldset-sunken: #d1d0c0;
  --color-surface-fieldset-overlay: #deddd2;
  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);

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
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
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
  --font-weight-light: light;
  --font-weight-normal: normal;
  --font-weight-medium: medium;
  --font-weight-semibold: semibold;
  --font-weight-bold: bold;
  --font-lineHeight-tight: tight;
  --font-lineHeight-normal: normal;
  --font-lineHeight-relaxed: relaxed;

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
  --layout-containerPadding: 16px;
  --layout-breakpoints: [object Object];

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
  --icon-sprite-path: public/assets/img/icons.svg;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;

  }

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-base: #16171a;
    --color-surface-subtle: #111214;
    --color-surface-elevated: #0d0d0f;
    --color-surface-sunken: #131416;
    --color-surface-overlay: #1b1c20;
    --color-surface-inverse: #f2f2f3;
    --color-surface-fieldset-base: #0d0d0f;
    --color-surface-fieldset-subtle: #1b1c20;
    --color-surface-fieldset-elevated: #1f1f24;
    --color-surface-fieldset-sunken: #0d0d0f;
    --color-surface-fieldset-overlay: #25272c;
    --color-primary-50: #0a191f;
    --color-primary-100: #122d38;
    --color-primary-200: #1c4657;
    --color-primary-300: #275f75;
    --color-primary-400: #3081a1;
    --color-primary-500: #358fb1;
    --color-primary-600: #4aa5c9;
    --color-primary-700: #6ab6d3;
    --color-primary-800: #acd6e7;
    --color-primary-900: #d4e9f1;
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
    --color-success-50: #0a1f0a;
    --color-success-100: #0f2e0f;
    --color-success-200: #194d19;
    --color-success-300: #236c23;
    --color-success-400: #2d962d;
    --color-success-500: #32a832;
    --color-success-600: #3fc63f;
    --color-success-700: #60cf60;
    --color-success-800: #a1e4a1;
    --color-success-900: #c7edc7;
    --color-info-50: #0a191f;
    --color-info-100: #122d38;
    --color-info-200: #1c4657;
    --color-info-300: #275f75;
    --color-info-400: #3081a1;
    --color-info-500: #358fb1;
    --color-info-600: #4aa5c9;
    --color-info-700: #6ab6d3;
    --color-info-800: #acd6e7;
    --color-info-900: #d4e9f1;
    --color-warning-50: #3a0e1b;
    --color-warning-100: #5b162a;
    --color-warning-200: #7c1e3a;
    --color-warning-300: #9c2749;
    --color-warning-400: #ce2d5b;
    --color-warning-500: #d53b68;
    --color-warning-600: #dc5f84;
    --color-warning-700: #e4839f;
    --color-warning-800: #f4c1d0;
    --color-warning-900: #f6d6e0;
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
    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
  }

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
}}
`);

export const tokensCSS = `@layer tokens {
  :root {
  /* Colors */
  --color-primary-50: #e5f2f7;
  --color-primary-100: #bbdfed;
  --color-primary-200: #8fcee6;
  --color-primary-300: #66bbdd;
  --color-primary-400: #3ca9d3;
  --color-primary-500: #2d9dc9;
  --color-primary-600: #247c9f;
  --color-primary-700: #1a5c76;
  --color-primary-800: #113b4c;
  --color-primary-900: #09212a;
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
  --color-success-50: #d8f3d8;
  --color-success-100: #afeaaf;
  --color-success-200: #82e382;
  --color-success-300: #59da59;
  --color-success-400: #2fd12f;
  --color-success-500: #2abc2a;
  --color-success-600: #219221;
  --color-success-700: #176917;
  --color-success-800: #0e3f0e;
  --color-success-900: #092a09;
  --color-warning-50: #fbeaef;
  --color-warning-100: #f8d3de;
  --color-warning-200: #f4b2c5;
  --color-warning-300: #ee85a4;
  --color-warning-400: #e85882;
  --color-warning-500: #e54271;
  --color-warning-600: #d61e53;
  --color-warning-700: #aa1742;
  --color-warning-800: #7d1130;
  --color-warning-900: #500b1f;
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
  --color-info-50: #e5f2f7;
  --color-info-100: #bbdfed;
  --color-info-200: #8fcee6;
  --color-info-300: #66bbdd;
  --color-info-400: #3ca9d3;
  --color-info-500: #2d9dc9;
  --color-info-600: #247c9f;
  --color-info-700: #1a5c76;
  --color-info-800: #113b4c;
  --color-info-900: #09212a;
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
  --color-surface-fieldset-base: #e3e2d8;
  --color-surface-fieldset-subtle: #deddd2;
  --color-surface-fieldset-elevated: #dad9cc;
  --color-surface-fieldset-sunken: #d1d0c0;
  --color-surface-fieldset-overlay: #deddd2;
  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);

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
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
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
  --font-weight-light: light;
  --font-weight-normal: normal;
  --font-weight-medium: medium;
  --font-weight-semibold: semibold;
  --font-weight-bold: bold;
  --font-lineHeight-tight: tight;
  --font-lineHeight-normal: normal;
  --font-lineHeight-relaxed: relaxed;

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
  --layout-containerPadding: 16px;
  --layout-breakpoints: [object Object];

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
  --icon-sprite-path: public/assets/img/icons.svg;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;

  }

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-base: #16171a;
    --color-surface-subtle: #111214;
    --color-surface-elevated: #0d0d0f;
    --color-surface-sunken: #131416;
    --color-surface-overlay: #1b1c20;
    --color-surface-inverse: #f2f2f3;
    --color-surface-fieldset-base: #0d0d0f;
    --color-surface-fieldset-subtle: #1b1c20;
    --color-surface-fieldset-elevated: #1f1f24;
    --color-surface-fieldset-sunken: #0d0d0f;
    --color-surface-fieldset-overlay: #25272c;
    --color-primary-50: #0a191f;
    --color-primary-100: #122d38;
    --color-primary-200: #1c4657;
    --color-primary-300: #275f75;
    --color-primary-400: #3081a1;
    --color-primary-500: #358fb1;
    --color-primary-600: #4aa5c9;
    --color-primary-700: #6ab6d3;
    --color-primary-800: #acd6e7;
    --color-primary-900: #d4e9f1;
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
    --color-success-50: #0a1f0a;
    --color-success-100: #0f2e0f;
    --color-success-200: #194d19;
    --color-success-300: #236c23;
    --color-success-400: #2d962d;
    --color-success-500: #32a832;
    --color-success-600: #3fc63f;
    --color-success-700: #60cf60;
    --color-success-800: #a1e4a1;
    --color-success-900: #c7edc7;
    --color-info-50: #0a191f;
    --color-info-100: #122d38;
    --color-info-200: #1c4657;
    --color-info-300: #275f75;
    --color-info-400: #3081a1;
    --color-info-500: #358fb1;
    --color-info-600: #4aa5c9;
    --color-info-700: #6ab6d3;
    --color-info-800: #acd6e7;
    --color-info-900: #d4e9f1;
    --color-warning-50: #3a0e1b;
    --color-warning-100: #5b162a;
    --color-warning-200: #7c1e3a;
    --color-warning-300: #9c2749;
    --color-warning-400: #ce2d5b;
    --color-warning-500: #d53b68;
    --color-warning-600: #dc5f84;
    --color-warning-700: #e4839f;
    --color-warning-800: #f4c1d0;
    --color-warning-900: #f6d6e0;
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
    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
  }

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
}}
`;
