// Pure Design System - utilities
// Auto-generated - do not edit directly

export const utilities = new CSSStyleSheet();
utilities.replaceSync(`@layer utilities {
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

export const utilitiesCSS = `@layer utilities {
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
