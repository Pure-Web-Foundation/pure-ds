// Pure Design System - components
// Auto-generated - do not edit directly

export const components = new CSSStyleSheet();
components.replaceSync(`@layer components {

/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
  
  :where(p):last-child {
    margin-bottom: 0;
  }
  
  :where(cite) {
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

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

:where(dl) {
  margin: 0 0 var(--spacing-4) 0;
}

:where(dt) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

:where(dd) {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

:where(nav), :where(header), :where(footer) {
  display: block;
}

:where(header), :where(footer) {
  width: 100%;
}

:where(article), :where(section), :where(aside) {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

:where(mark) {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

:where(kbd) {
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

:where(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

:where(time) {
  font-variant-numeric: tabular-nums;
}

:where(address) {
  font-style: normal;
  line-height: var(--font-line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

:where(details) {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(:where(summary)) {
    padding: var(--spacing-4);
  }
}

:where(summary) {
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
  margin: 0 0 var(--spacing-1) 0;
  padding: var(--spacing-5);
  width: 100%;
  background-color: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  
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



/* Nested legend scaling: reduce font-size for deeper sub-forms */
fieldset > legend { font-size: var(--font-size-lg); }
fieldset fieldset > legend { font-size: var(--font-size-base); }
fieldset fieldset fieldset > legend { font-size: var(--font-size-sm); }

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
  line-height: var(--font-line-height-normal);
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
  line-height: var(--font-line-height-relaxed);
}

input, textarea, select {
  width: 100%;
  min-height: 40px;
  padding: calc(var(--spacing-1) * 0.75) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-line-height-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-danger-500) 30%, transparent);
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
  -webkit-appearance: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem; /* your radius */
  overflow: hidden; /* important */
  cursor: pointer;
}

/* The wrapper */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: inherit;
}

/* The swatch (the actual color box) */
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: inherit;
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
  border: 1px solid var(--color-text-primary);
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
  color: var(--color-text-primary);
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
  background-color: color-mix(in oklab, var(--color-text-primary) 10%, transparent);
  border-color: var(--color-text-primary);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-primary-600) 90%, black 10%);
  border-color: color-mix(in oklab, var(--color-primary-600) 90%, black 10%);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  line-height: var(--font-line-height-relaxed);
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
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  background-color: var(--color-primary-fill);
  color: white;
  border-color: var(--color-primary-fill);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  color: var(--color-text-primary);
  border-color: var(--color-text-primary);
  
  &:hover {
    background-color: var(--color-text-primary);
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
  line-height: var(--font-line-height-relaxed);
  
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
  background-color: var(--color-primary-600);
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
  background-color: var(--color-info-600);
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
  color: var(--color-text-primary);
}

.badge-outline.badge-secondary {
  color: var(--color-secondary-600);
}

.badge-outline.badge-success {
  color: var(--color-success-600);
}

.badge-outline.badge-info {
  color: var(--color-info-600);
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
  max-height: calc(100vh - var(--spacing-8));
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



/* Accordion (details/summary) */

.accordion {
  --_acc-radius: var(--radius-md);
  --_acc-border: 1px solid var(--color-border);
  --_acc-bg: var(--color-surface-base);
}

.accordion details {
  border: var(--_acc-border);
  border-radius: var(--_acc-radius);
  background: var(--_acc-bg);
  margin: 0 0 var(--spacing-3) 0;
}

.accordion summary {
  cursor: pointer;
  padding: var(--spacing-3) var(--spacing-4);
  list-style: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}
.accordion summary::-webkit-details-marker { display: none; }

/* Chevron indicator */
.accordion summary::after {
  content: "";
  margin-inline-start: auto;
  inline-size: 0.7em;
  block-size: 0.7em;
  border-inline-end: 2px solid currentColor;
  border-block-end: 2px solid currentColor;
  transform: rotate(-45deg);
  transition: transform var(--transition-normal);
}
.accordion details[open] > summary::after { transform: rotate(45deg); }

/* Modern smooth open/close using ::details-content */
@supports selector(details::details-content) {
  .accordion details::details-content {
    transition: block-size var(--transition-normal) ease, content-visibility var(--transition-normal) ease;
    transition-behavior: allow-discrete;
    block-size: 0;
    overflow: clip;
    content-visibility: hidden;
  }
  .accordion details[open]::details-content { 
    block-size: auto; 
    content-visibility: visible;
  }
  
  /* Starting style for smooth opening */
  @starting-style {
    .accordion details[open]::details-content {
      block-size: 0;
      content-visibility: hidden;
    }
  }

  /* inner spacing for content */
  .accordion details > *:not(summary) {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
  }
}

/* Fallback: works with any wrapper element (div, etc.) */
@supports not (selector(details::details-content)) {
  .accordion details > :not(summary) {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--transition-normal) ease;
    overflow: hidden;
  }
  .accordion details[open] > :not(summary) { grid-template-rows: 1fr; }
  .accordion details > :not(summary) > * { min-block-size: 0; }
  .accordion details > :not(summary) {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
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

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined, .card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card-interactive:hover {
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



/* Alert dark mode adjustments */
html[data-theme="dark"] .alert-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-500);
  color: var(--color-success-900);
}

html[data-theme="dark"] .alert-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-500);
  color: var(--color-info-900);
}

html[data-theme="dark"] .alert-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-500);
  color: var(--color-warning-900);
}

html[data-theme="dark"] .alert-danger,
html[data-theme="dark"] .alert-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-500);
  color: var(--color-danger-900);
}

/* Dim images in dark mode */
html[data-theme="dark"] img, 
html[data-theme="dark"] video {
  opacity: 0.8;
  transition: opacity var(--transition-normal);
}

html[data-theme="dark"] img:hover, 
html[data-theme="dark"] video:hover {
  opacity: 1;
}

}
`);

export const componentsCSS = `@layer components {

/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-4) var(--spacing-6);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
  
  :where(p):last-child {
    margin-bottom: 0;
  }
  
  :where(cite) {
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

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

:where(dl) {
  margin: 0 0 var(--spacing-4) 0;
}

:where(dt) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

:where(dd) {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

:where(nav), :where(header), :where(footer) {
  display: block;
}

:where(header), :where(footer) {
  width: 100%;
}

:where(article), :where(section), :where(aside) {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

:where(mark) {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

:where(kbd) {
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

:where(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

:where(time) {
  font-variant-numeric: tabular-nums;
}

:where(address) {
  font-style: normal;
  line-height: var(--font-line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

:where(details) {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(:where(summary)) {
    padding: var(--spacing-4);
  }
}

:where(summary) {
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
  margin: 0 0 var(--spacing-1) 0;
  padding: var(--spacing-5);
  width: 100%;
  background-color: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  
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



/* Nested legend scaling: reduce font-size for deeper sub-forms */
fieldset > legend { font-size: var(--font-size-lg); }
fieldset fieldset > legend { font-size: var(--font-size-base); }
fieldset fieldset fieldset > legend { font-size: var(--font-size-sm); }

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
  line-height: var(--font-line-height-normal);
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
  line-height: var(--font-line-height-relaxed);
}

input, textarea, select {
  width: 100%;
  min-height: 40px;
  padding: calc(var(--spacing-1) * 0.75) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-line-height-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-danger-500) 30%, transparent);
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
  -webkit-appearance: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem; /* your radius */
  overflow: hidden; /* important */
  cursor: pointer;
}

/* The wrapper */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: inherit;
}

/* The swatch (the actual color box) */
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: inherit;
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
  border: 1px solid var(--color-text-primary);
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
  color: var(--color-text-primary);
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
  background-color: color-mix(in oklab, var(--color-text-primary) 10%, transparent);
  border-color: var(--color-text-primary);
}

/* Checked state = primary button */
fieldset[role="radiogroup"] label:has(input[type="radio"]:checked),
label:has(input[type="radio"]:checked),
label:has(input[type="checkbox"]:checked):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

fieldset[role="radiogroup"] label:has(input[type="radio"]:checked):hover,
label:has(input[type="radio"]:checked:not(:disabled)):hover,
label:has(input[type="checkbox"]:checked:not(:disabled)):hover:not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:checked:not(:disabled) + label:hover,
input[type="checkbox"]:checked:not(:disabled) + label:hover:not(fieldset[role="group"] label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-primary-600) 90%, black 10%);
  border-color: color-mix(in oklab, var(--color-primary-600) 90%, black 10%);
}

/* Focus states */
fieldset[role="radiogroup"] label:has(input[type="radio"]:focus),
label:has(input[type="radio"]:focus),
label:has(input[type="checkbox"]:focus):not(fieldset[role="group"] label):not(label[data-toggle]),
input[type="radio"]:focus + label,
input[type="checkbox"]:focus + label:not(fieldset[role="group"] label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  line-height: var(--font-line-height-relaxed);
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
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  background-color: var(--color-primary-fill);
  color: white;
  border-color: var(--color-primary-fill);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
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
  color: var(--color-text-primary);
  border-color: var(--color-text-primary);
  
  &:hover {
    background-color: var(--color-text-primary);
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
  line-height: var(--font-line-height-relaxed);
  
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
  background-color: var(--color-primary-600);
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
  background-color: var(--color-info-600);
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
  color: var(--color-text-primary);
}

.badge-outline.badge-secondary {
  color: var(--color-secondary-600);
}

.badge-outline.badge-success {
  color: var(--color-success-600);
}

.badge-outline.badge-info {
  color: var(--color-info-600);
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
  max-height: calc(100vh - var(--spacing-8));
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



/* Accordion (details/summary) */

.accordion {
  --_acc-radius: var(--radius-md);
  --_acc-border: 1px solid var(--color-border);
  --_acc-bg: var(--color-surface-base);
}

.accordion details {
  border: var(--_acc-border);
  border-radius: var(--_acc-radius);
  background: var(--_acc-bg);
  margin: 0 0 var(--spacing-3) 0;
}

.accordion summary {
  cursor: pointer;
  padding: var(--spacing-3) var(--spacing-4);
  list-style: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}
.accordion summary::-webkit-details-marker { display: none; }

/* Chevron indicator */
.accordion summary::after {
  content: "";
  margin-inline-start: auto;
  inline-size: 0.7em;
  block-size: 0.7em;
  border-inline-end: 2px solid currentColor;
  border-block-end: 2px solid currentColor;
  transform: rotate(-45deg);
  transition: transform var(--transition-normal);
}
.accordion details[open] > summary::after { transform: rotate(45deg); }

/* Modern smooth open/close using ::details-content */
@supports selector(details::details-content) {
  .accordion details::details-content {
    transition: block-size var(--transition-normal) ease, content-visibility var(--transition-normal) ease;
    transition-behavior: allow-discrete;
    block-size: 0;
    overflow: clip;
    content-visibility: hidden;
  }
  .accordion details[open]::details-content { 
    block-size: auto; 
    content-visibility: visible;
  }
  
  /* Starting style for smooth opening */
  @starting-style {
    .accordion details[open]::details-content {
      block-size: 0;
      content-visibility: hidden;
    }
  }

  /* inner spacing for content */
  .accordion details > *:not(summary) {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
  }
}

/* Fallback: works with any wrapper element (div, etc.) */
@supports not (selector(details::details-content)) {
  .accordion details > :not(summary) {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--transition-normal) ease;
    overflow: hidden;
  }
  .accordion details[open] > :not(summary) { grid-template-rows: 1fr; }
  .accordion details > :not(summary) > * { min-block-size: 0; }
  .accordion details > :not(summary) {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
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

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined, .card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card-interactive:hover {
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



/* Alert dark mode adjustments */
html[data-theme="dark"] .alert-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-500);
  color: var(--color-success-900);
}

html[data-theme="dark"] .alert-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-500);
  color: var(--color-info-900);
}

html[data-theme="dark"] .alert-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-500);
  color: var(--color-warning-900);
}

html[data-theme="dark"] .alert-danger,
html[data-theme="dark"] .alert-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-500);
  color: var(--color-danger-900);
}

/* Dim images in dark mode */
html[data-theme="dark"] img, 
html[data-theme="dark"] video {
  opacity: 0.8;
  transition: opacity var(--transition-normal);
}

html[data-theme="dark"] img:hover, 
html[data-theme="dark"] video:hover {
  opacity: 1;
}

}
`;
