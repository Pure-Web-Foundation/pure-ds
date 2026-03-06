# PDS Localization

PDS localization is framework-independent and does not rely on `lit-localize`.

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
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "nl"];

const i18nRows = {
  "Why develop a Design System when you can generate one?": {
    nl: "Waarom een Design System ontwikkelen als je er één kunt genereren?",
  },
};

function getLocaleOrDefault(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

function buildMessagesForLocale(locale) {
  const effectiveLocale = getLocaleOrDefault(locale);
  return Object.fromEntries(
    Object.entries(i18nRows).map(([english, translations]) => [
      english,
      translations?.[effectiveLocale] || english,
    ])
  );
}

export const config = {
  mode: "live",
  preset: "default",
  localization: {
    locale: "en",
    provider: {
      loadLocale({ locale }) {
        return buildMessagesForLocale(locale);
      },
    },
  },
};
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
- At least two locales must be inferred from localization string data at startup.

Locale inference rules:
- `localization.locale` is treated as the origin/default language.
- If explicit locale maps/rows are present, locales are read from those keys.
- If locale rows are not explicit, PDS probes locale bundles via runtime loading and compares against origin strings.
- A locale counts as available only when its bundle differs from origin for at least one shared key.

Example:

```javascript
localization: {
  locale: "en",
  provider: {
    loadLocale({ locale }) {
      return buildMessagesForLocale(locale);
    },
  },
}
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
