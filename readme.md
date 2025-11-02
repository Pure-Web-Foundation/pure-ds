# Pure Design System

A JavaScript-config-first design system that generates complete, production-ready CSS from minimal configuration. 


## Philosophy


## Unified event bus

PDS is an EventTarget you can subscribe to for all runtime signals. Listen on `PDS` instead of `window`/`document`.

- pds:ready — when PDS has initialized
	- detail: { mode: 'live' | 'static', generator?, config, theme, autoDefiner? }
- pds:error — initialization or runtime errors surfaced by PDS
	- detail: { error }
- pds:theme:changed — theme resolved or changed
	- detail: { theme, requested?, source: 'system' | 'programmatic' }
- pds:design:updated — configurator emits when a new design config is applied
	- detail: { config, designer? }
- pds:design:field:changed — configurator emits when a specific form field changes
	- detail: { field, config }
- pds:inspector:mode:changed — configurator code inspector toggled
	- detail: { active: boolean }
- pds:inspector:deactivate — request to turn off inspector (e.g., from showcase)
	- detail: {}
- pds:docs:view — request the configurator to render a docs file
	- detail: { file: string }

Example:

```js
import { PDS } from '@pure-ds/core';

PDS.addEventListener('pds:ready', (e) => {
	console.log('PDS ready in', e.detail.mode, 'theme:', e.detail.theme);
});

PDS.dispatchEvent(new CustomEvent('pds:docs:view', { detail: { file: 'GETTING-STARTED.md' } }));
```




---

**Made with ❤️ for the open web**


