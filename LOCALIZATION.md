# PDS Localization

PDS localization is a framework-independent localization layer, inspired by, and largely compatible with `lit-localize`.

Use localization from `#pds` root exports:
- `msg()`
- `str`
- `loadLocale()`
- `setLocale()`
- `getLocalizationState()`

## Design Goals

- Contextual translation by DOM language scope (`lang` attributes)
- Support for language islands (`<div lang="nl">` inside English UI)
- Dynamic locale loading (load only detected locales)
- Lean core startup (localization runtime is lazy-loaded when `config.localization` is present)

## Quick Start

## 1) Configure localization in `pds.config.js`

```javascript
import { PDS } from "@pure-ds/core";

const localization = PDS.createJSONLocalization({
  locale: "en",
  locales: ["en", "nl"],
  aliases: {
    en: ["en", "en-US"],
    nl: ["nl", "nl-NL"],
  },
  basePath: "/assets/locales",
});

export const config = {
  mode: "live",
  preset: "default",
  localization,
};
```

`PDS.createJSONLocalization(...)` is lazy: it returns a config object immediately, and only loads localization helper code when locale bundles are actually requested.

Example locale resource format:

`public/assets/locales/nl-NL.json`

```json
{
  "Loading": {
    "content": "Loading"
  }
  "You have {0} points... ({1})": {
    "content": "Je hebt {0} punten... ({1})"
  }
}
```

`localization.locale` is the default locale fallback, not the forced UI language.

## 2) Use `msg()` directly in markup

```javascript
import { PDS, msg } from "#pds";
import { config } from "../pds.config.js";
import pkg from "../package.json";

await PDS.start(config);

document.documentElement.lang = "en";

document.body.innerHTML = `
  <small>${msg(pkg.description)}</small>

  <div lang="nl">
    <small>${msg(pkg.description)}</small>
  </div>
`;
```

Both calls are identical. Translation is decided by nearest `lang` scope.

## How Context Resolution Works

When `msg()` resolves a key, PDS chooses locale in this order:

1. Explicit `options.lang` (if provided)
2. Scoped element context (`options.element`, `options.scope`, `options.host`, `options.contextElement`)
3. Nearest DOM `lang` ancestor
4. Root `html[lang]`
5. `localization.locale` default

This enables island behavior without special framework integration.

## Dynamic Loading and Memory

- PDS observes the document for `lang` attribute and subtree changes.
- When a new locale appears, PDS calls your provider (`loadLocale` / fallback `setLocale`) for that locale.
- Locale bundles are cached per locale.
- If a locale is no longer detected in DOM, its message bundle is removed from memory.

This keeps runtime memory proportional to actively used languages.

## Live Editor Language Selector

In live mode (`liveEdit: true`), quick settings can show a **Language** selector.

Visibility rules:
- Localization must be active.
- At least two locales must be detected.

Locale inference rules:
- If `localization.locales` is provided, that list is used first.
- `localization.locale` is treated as the origin/default language.
- If explicit locale maps/rows are present, locales are read from those keys.
- If locale rows are not explicit, PDS probes locale bundles via runtime loading and compares against origin strings.
- A locale counts as available only when its bundle differs from origin for at least one shared key.

Example:

```javascript
localization: {
  locale: "en",
  locales: ["en", "nl"],
  provider: {
    async loadLocale({ locale }) {
      const response = await fetch(`/assets/locales/${locale}.json`);
      return response.ok ? response.json() : {};
    },
  },
}
```

Or use the optional helper subpath directly:

```javascript
import { createJSONLocalization } from "@pure-ds/core/localization";

localization: createJSONLocalization({
  locale: "en",
  locales: ["en", "nl"],
  aliases: { nl: ["nl", "nl-NL"] },
  basePath: "/assets/locales",
});
```

With rows like `{ "Some key": { nl: "..." } }`, available locales are inferred as `"en"` + `"nl"`, so the selector is shown.

## Provider Contract

### `loadLocale(context)`

Receives:
- `locale`: requested locale
- `defaultLocale`: configured fallback locale
- `reason`: load reason (e.g. `lang-detected`, `msg`, `explicit-load`)
- `loadedLocales`: locales currently cached
- `messages`: current messages for requested locale (if any)
- `load`: boolean hint for explicit/default-loading flows

Returns:
- map of translation keys to localized strings
- optionally `{ key: { content: "..." } }` values

### Optional `translate(context)`

Use this for custom runtime resolution beyond static maps.

## Runtime APIs

From `#pds` root:

- `msg(templateOrKey, options?)`
- `str\`...\``
- `loadLocale(locale)`
- `setLocale(locale, { load? })`
- `getLocalizationState()`

`getLocalizationState()` returns:
- `locale` (default locale)
- `messages` (default-locale bundle)
- `loadedLocales`
- `hasProvider`

## Notes

- `msg()` is synchronous by design.
- On first encounter of a new locale, text may briefly render fallback content, then update once the locale bundle loads.
- For immediate guarantees, preload with `loadLocale("xx")` before rendering that locale scope.

## Missing Translation Warnings

- PDS warns when a key is missing in a non-default target locale and fallback content is used.
- Warnings are deduplicated and emitted once per `locale::key` pair.
- Warnings reset when localization is reconfigured.
- No warning is emitted for normal default-locale usage.
