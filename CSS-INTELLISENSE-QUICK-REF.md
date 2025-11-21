# CSS IntelliSense Quick Reference

Quick reference for using PDS IntelliSense in your projects.

## Setup (VS Code)

```json
// .vscode/settings.json
{
  "html.customData": ["node_modules/pure-ds/public/assets/pds/vscode-custom-data.json"],
  "css.customData": ["node_modules/pure-ds/public/assets/pds/pds.css-data.json"]
}
```

Reload: `Ctrl+Shift+P` → **Developer: Reload Window**

## CSS Tokens

### Colors (900+ generated)
```css
--color-primary-{50-900}      /* Primary brand colors */
--color-secondary-{50-900}    /* Secondary/neutral colors */
--color-accent-{50-900}       /* Accent colors */
--color-gray-{50-900}         /* Gray scale */
--color-success-{50-900}      /* Success states */
--color-warning-{50-900}      /* Warning states */
--color-danger-{50-900}       /* Error states */
--color-info-{50-900}         /* Info states */
```

### Spacing
```css
--spacing-0                   /* 0 */
--spacing-1                   /* Base unit (8px default) */
--spacing-2                   /* 1.5x base */
--spacing-3                   /* 2.25x base */
--spacing-4                   /* 3.375x base */
/* ... continues up to spacing-12 */
```

### Typography
```css
--font-family-heading         /* Headings font */
--font-family-body            /* Body text font */
--font-family-mono            /* Monospace font */

--font-size-xs                /* Extra small */
--font-size-sm                /* Small */
--font-size-base              /* Base size */
--font-size-lg                /* Large */
--font-size-xl                /* Extra large */
/* ... continues to 5xl */

--font-weight-thin            /* 100 */
--font-weight-normal          /* 400 */
--font-weight-medium          /* 500 */
--font-weight-semibold        /* 600 */
--font-weight-bold            /* 700 */

--line-height-tight           /* 1.25 */
--line-height-normal          /* 1.5 */
--line-height-relaxed         /* 1.75 */
```

### Borders
```css
--radius-sm                   /* Small radius */
--radius-md                   /* Medium radius */
--radius-lg                   /* Large radius */
--radius-xl                   /* Extra large */
--radius-full                 /* Fully rounded */

--border-width-thin           /* 1px */
--border-width-medium         /* 2px */
--border-width-thick          /* 3px */
```

### Shadows
```css
--shadow-sm                   /* Small shadow */
--shadow-md                   /* Medium shadow */
--shadow-lg                   /* Large shadow */
--shadow-xl                   /* Extra large */
--shadow-2xl                  /* 2x extra large */
```

### Surfaces (Semantic)
```css
--surface-bg                  /* Surface background */
--surface-text                /* Surface text color */
--surface-text-secondary      /* Secondary text */
--surface-border              /* Surface border */
--surface-shadow              /* Surface shadow */
--surface-hover               /* Hover state */
```

### Transitions
```css
--transition-fast             /* 150ms */
--transition-normal           /* 300ms */
--transition-slow             /* 500ms */
```

### Layout
```css
--breakpoint-sm               /* 640px */
--breakpoint-md               /* 768px */
--breakpoint-lg               /* 1024px */
--breakpoint-xl               /* 1280px */

--z-dropdown                  /* 1000 */
--z-sticky                    /* 1020 */
--z-fixed                     /* 1030 */
--z-modal-backdrop            /* 1040 */
--z-modal                     /* 1050 */
--z-notification              /* 9999 */
```

## CSS Classes

### Primitives
```css
.badge, .pill, .tag, .chip   /* Badge variants */
.card                         /* Card container */
.surface                      /* Surface container */
.alert                        /* Alert box */
.dialog                       /* Dialog element */
```

### Layout
```css
.flex                         /* Flexbox container */
.flex-wrap                    /* Wrapped flex */
.grid                         /* Grid container */
.grid-cols-{1-6}             /* Fixed columns */
.grid-auto-{sm|md|lg|xl}     /* Auto-fit grid */
.container                    /* Max-width container */
```

### Spacing Utilities
```css
.gap-{0-12}                  /* Flexbox/Grid gap */
```

### Alignment
```css
.items-start                  /* align-items: flex-start */
.items-end                    /* align-items: flex-end */
.items-center                 /* align-items: center */
.items-baseline               /* align-items: baseline */
.items-stretch                /* align-items: stretch */

.justify-start                /* justify-content: flex-start */
.justify-end                  /* justify-content: flex-end */
.justify-center               /* justify-content: center */
.justify-between              /* justify-content: space-between */
.justify-around               /* justify-content: space-around */
.justify-evenly               /* justify-content: space-evenly */
```

### Effects
```css
.border-gradient              /* Gradient border */
.border-gradient-primary      /* Primary gradient */
.border-gradient-accent       /* Accent gradient */
.border-gradient-secondary    /* Secondary gradient */

.border-glow                  /* Glow effect */
.border-glow-sm               /* Small glow */
.border-glow-lg               /* Large glow */
.border-glow-{color}          /* Colored glow */
```

## Data Attributes

Progressive enhancement attributes (with IntelliSense):

```html
<!-- Type data-dr to see autocomplete with example code -->
<nav data-dropdown>          <!-- Dropdown navigation -->
  <button>Menu</button>
  <menu>
    <li><a href="#">Item</a></li>
  </menu>
</nav>

<!-- Type data-to to see autocomplete with example code -->
<label data-toggle>          <!-- Toggle switch -->
  <span>Enable</span>
  <input type="checkbox">
</label>

<!-- Other enhancements -->
<div data-tabs>              <!-- Tab interface -->
<div data-modal>             <!-- Modal dialog -->
<span data-tooltip>          <!-- Tooltip -->
```

**IntelliSense Features:**
- Shows attribute name while typing
- Displays description of enhancement
- Includes complete example markup from `demoHtml`

## Web Components

```html
<!-- Type <pds- to see all -->
<pds-drawer position="right|left|top|bottom">
<pds-icon icon="star|heart|bell|...">
<pds-upload accept="image/*">
<pds-jsonform>
<pds-tabstrip>
<pds-toaster>
<pds-richtext>
<pds-scrollrow>
<pds-splitpanel>
```

## Usage Tips

1. **Type `--` in CSS** to see all tokens
2. **Type `.` in HTML class** to browse all classes  
3. **Hover over tokens** to see actual values
4. **Type `<pds-`** to see all components
5. **Type `icon="`** to browse all icon names

## Generation

```bash
npm run pds:dx          # Generate all IntelliSense
npm run pds:export      # Full export including IntelliSense
```

## More Info

- [Full IntelliSense Guide](./INTELLISENSE.md)
- [Main README](./readme.md)
- [Storybook Documentation](./packages/pds-storybook/README.md)
