# Pure Design System

A JS-config-first design system that generates world-class PWA styles from minimal configuration.

## Features

🎨 **AutoDesigner** - Complete design system from 5 base variables
📱 **PWA-Ready** - Mobile-first, responsive, accessible  
🌓 **Smart Dark Mode** - Automatic color inversion with image dimming
♿ **Accessibility First** - WCAG compliant, reduced motion support
🎯 **Form Perfection** - Beautiful controls with all interactive states
📐 **Consistent Spacing** - Mathematical scale from single base unit
🎭 **Surface Nesting** - Proper contrast for layered interfaces
🚀 **PureApp Component** - Main app orchestrator with built-in features
📝 **AutoForm System** - Generate forms from readable YAML-like syntax
💬 **Smart Dialogs** - Sophisticated `ask()` system with form integration
🍞 **Toast Notifications** - Intelligent notifications with reading-time duration

## Quick Start

```javascript
import { AutoDesigner } from './src/js/auto-designer.js';

const designer = new AutoDesigner({
  mainColor: '#2563eb',     // Your brand color
  accentColor: '#f59e0b',   // Accent highlights
  gap: 16,                  // Base spacing (px)
  radius: 8                 // Border roundness (px)
});
```

This generates 500+ CSS variables and comprehensive styles for forms, typography, layout, and components.

## PureApp Component

The `<pure-app>` component is the main orchestrator that provides integrated application features:

```html
<pure-app>
  <h1>My Application</h1>
  <!-- Your app content -->
</pure-app>
```

### Toast Notifications

PureApp automatically provides a toast notification system with intelligent duration calculation:

```javascript
const app = document.querySelector('pure-app');

// Basic notifications
app.toast('Information message');
app.success('Operation completed successfully!');
app.warning('Please review your input');
app.error('Something went wrong');

// With custom duration
app.toast('Custom message', 'information', 5000);
```

Features:
- **Smart Duration**: Automatically calculates reading time based on ~200 WPM
- **Type-Specific Styling**: Different colors and icons for each notification type
- **Mobile Responsive**: Adapts positioning and animations for mobile devices
- **Progress Indicators**: Visual countdown showing remaining time
- **Accessibility**: ARIA labels and keyboard navigation support

### AutoForm System

Generate intelligent forms from readable YAML-like syntax:

```javascript
const result = await app.ask(`
  <form>
    <auto-form>
      # User Registration
      
      name: text = John Doe
      Full name for your account
      
      email: email
      We'll use this for login and notifications
      
      age: range(18, 100) = 25
      Must be 18 or older to register
      
      country: select = US
      Your country of residence
    </auto-form>
  </form>
`, {
  title: 'Sign Up',
  useForm: true,
  buttons: {
    ok: { name: 'Create Account' },
    cancel: { name: 'Cancel', cancel: true }
  }
});

if (result) {
  console.log('Form data:', Object.fromEntries(result));
}
```

### Smart Dialog System

The `ask()` method provides sophisticated dialog management:

```javascript
// Simple confirmation
const confirmed = await app.ask('Delete this item?');

// Rich content with custom buttons
const choice = await app.ask('Choose an option', {
  content: '<p>Select how you want to proceed:</p>',
  buttons: {
    save: { name: 'Save & Continue' },
    draft: { name: 'Save as Draft' },
    cancel: { name: 'Cancel', cancel: true, default: true }
  }
});
```

## Demo

- `design-system-demo.html` - Complete design system showcase with live controls
- `toast-demo.html` - Interactive toast notification examples
- `index.html` - AutoForm and dialog system demonstrations

## Web Components

### `<pure-app>`
Main application component that auto-injects the toaster and provides:
- Toast notification methods (`success()`, `error()`, `warning()`, `information()`)
- `ask()` dialog system with form integration
- `configure()` method for design system settings
- Access to `designer` and `definer` instances

### `<app-toaster>`
Standalone toast notification component (auto-injected by PureApp):
- Intelligent duration calculation based on reading time (200 WPM)
- Type-specific styling (information, success, warning, error)
- Mobile-responsive positioning and animations
- Progress indicators with smooth animations
- Automatic cleanup and memory management

### `<auto-form>`
Intelligent form generator:
- YAML-like syntax for readable form definitions
- Semantic HTML with `fieldset` and `legend` elements
- Automatic field type inference
- Built-in validation and accessibility features

## Documentation

- [Complete Design System Guide](./DESIGN-SYSTEM.md) - Full documentation
- [AutoDesigner API](./src/js/auto-designer.js) - Design system generation
- [PureApp Component](./src/js/pure-app.js) - Main application orchestrator
- [AutoForm System](./src/js/auto-form.js) - Intelligent form generation
- [Toast Notifications](./src/js/app-toaster.js) - Notification component
- [Dialog System](./src/js/ask.js) - Smart dialog management

## Architecture

- **Pure Web Components** - No framework dependencies, uses Lit for advanced components
- **CSS Custom Properties** - Runtime design updates with full theme system
- **Semantic Tokens** - Meaningful color and spacing scales  
- **Mobile-First** - Responsive breakpoints and utilities
- **Zero Config** - Works great with defaults, customizable as needed
- **Modular Components** - Each component is standalone and reusable
- **Auto-Injection** - PureApp automatically provides necessary sub-components
- **Shadow DOM Isolation** - Components don't interfere with each other
- **Progressive Enhancement** - Works without JavaScript, enhanced with it

---

## Qogni Dev Onboarding

### Topics
- https://pureweb.dev/manifesto
- Semantic HTML 
- Pure CSS, variables
- https://web.dev/baseline
- ESM / ECMASCRIPT
- Web Components
- Vanilla JS - Browser = Framework
- Lit
- Bundling / ESBuild
- PWA


