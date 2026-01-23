# Getting Started with Pure Design System

The fastest path is the project starter. It creates a working app, boots PDS, and starts a dev server in minutes.

---

## 1) Create a new PDS app (recommended)

```bash
npm init @pure-ds/app
# or
npx @pure-ds/create-app
```

What this does:
- Installs `@pure-ds/core`
- Runs `pds:bootstrap` (creates starter files)
- Starts a dev server at http://localhost:4173

What you get (key files):
- `pds.config.js` — your design system config
- `src/js/app.js` — bootstraps PDS and mounts the app
- `public/assets/my/my-home.js` — your first web component
- `public/index.html` — app shell

**Next edits:**
- Update `public/assets/my/my-home.js` to change the landing UI
- Edit `pds.config.js` to customize tokens
- Add your app logic in `src/js/app.js`

---

## 2) Add PDS to an existing project

```bash
npm install @pure-ds/core
```

Then initialize:

```javascript
import { PDS } from '@pure-ds/core';
import { config } from './pds.config.js';

await PDS.start(config);
```

If you don’t have a config yet:

```bash
npx pds-init-config
```

---

## 3) Try it online (CodePen)

Explore live examples first:
- **PDS CodePen Collection:** https://codepen.io/collection/rBjkOy

---

## 4) CDN (zero install)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>PDS CDN Demo</title>
    <script type="module" defer>
      import { PDS } from "https://unpkg.com/pure-ds@latest/public/assets/js/pds.js";

      await PDS.start({
        mode: "live",
        preset: "default"
      });
    </script>
  </head>
  <body class="container">
    <article class="card surface-elevated">
      <h2>It just works</h2>
      <p>Write semantic HTML, PDS handles the design system.</p>
      <button class="btn-primary">Get Started</button>
    </article>
  </body>
</html>
```

---

## 5) Customize your design (starter-first)

Start in `pds.config.js`:

```javascript
export const config = {
  mode: "live",
  preset: "default",
  design: {
    colors: {
      primary: "#007acc",
      secondary: "#5c2d91"
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.25
    },
    spatialRhythm: {
      baseUnit: 8,
      scaleRatio: 1.5
    }
  }
};
```

The starter already loads this config in `src/js/app.js`.

---

## 6) Components & Lit import maps

Most PDS features work with plain HTML + classes. For components like `pds-form`, include the Lit import map:

```html
<script type="importmap">
{
  "imports": {
    "#pds/lit": "/assets/js/lit.js"
  }
}
</script>
```

Example:

```html
<pds-icon icon="heart"></pds-icon>
<pds-tabstrip>
  <pds-tabpanel label="Overview">...</pds-tabpanel>
  <pds-tabpanel label="Details">...</pds-tabpanel>
</pds-tabstrip>
```

---

## 7) Progressive enhancements

Enhancements upgrade semantic HTML with zero framework code:

```html
<nav data-dropdown>
  <button>Menu</button>
  <menu>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </menu>
</nav>

<label data-toggle>
  <input type="checkbox" />
  <span data-label>Enable feature</span>
</label>
```

---

## 8) Storybook (optional, but great DX)

Install the reference Storybook in your project:

```bash
npm install @pure-ds/storybook
npx pds-storybook
npm run storybook
```

---

## 9) Console quick wins

```javascript
PDS.theme = 'dark';
await PDS.toast('Saved!', { type: 'success' });
const tokens = PDS.compiled.tokens;
```

---

## Need help?

- **Docs:** https://github.com/Pure-Web-Foundation/pure-ds
- **Storybook:** https://puredesignsystem.z6.web.core.windows.net/storybook/
- **CodePen:** https://codepen.io/collection/rBjkOy
