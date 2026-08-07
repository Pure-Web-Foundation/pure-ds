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

If you use message codes instead of source strings, provide a source-locale bundle too and opt into loading it:

```javascript
const localization = PDS.createJSONLocalization({
  locale: "en",
  locales: ["en", "nl"],
  loadDefaultLocale: true,
  aliases: {
    en: ["en-US", "en"],
    nl: ["nl-NL", "nl"],
  },
  basePath: "/assets/locales",
});
```

With `loadDefaultLocale: true`, PDS will also fetch the default/source bundle, so `msg("my-long-string-code")` can resolve in English as well as translated locales.

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

## Shared State Across Bundle Copies

Localization state -- the provider, loaded bundles, requested keys, and the
DOM observer -- lives on a single object shared by every copy of the
localization runtime in a page, not per module instance. Several
`@pure-ds/core` bundles (`core/pds-localization.js`, `core/pds-enhancers.js`,
`core/pds-manager.js`) inline the same localization code, and a consumer's own
app bundle may include a further copy; without sharing, only whichever copy
received `configureLocalization()` would actually work, and every `msg()` call
in the others would return its raw key.

Consequences worth knowing:

- A page cannot host two *independently configured* localization scopes --
  the last `configureLocalization()` call wins, and a debug-level log records
  when that happens more than once.
- Exactly one `MutationObserver` runs per page, regardless of how many
  bundle copies are loaded.
- **All copies of `@pure-ds/core` in a page must be the same version, and at
  least the version this was introduced in.** An older copy keeps private
  state and does not participate in the shared runtime -- so a page that
  mixes a stale cached bundle (e.g. from a CDN, a pinned `managerURL`, or an
  un-synced web root) with a current one will see the older bug pattern for
  that copy specifically.
- Iframes and workers each have their own realm and their own `document`, so
  they correctly get their own, independent localization state.

## Reconciliation

Localization writes to the DOM in **reconcile passes**, debounced 16ms after
a `msg()` call registers a new key or the DOM mutates. A pass:

- only re-examines a text node or attribute whose value has changed since it
  was last visited (a locale bundle loading, a `lang` change, or a newly
  registered key invalidates that cache);
- ignores its own writes when deciding whether to schedule another pass, so
  settling never costs an extra, wasted full-document walk;
- runs at most 5 times in a row before yielding; if the DOM still hasn't
  settled after 5 passes (for example, a `translate()` implementation that
  keeps producing different output), PDS logs a warning and continues in the
  next scheduling window rather than blocking indefinitely.

`getLocalizationState()` includes `indexedValueCount`, the size of the
internal value-to-key index used to recognize already-translated text. This
index is capped (currently 1000 entries, FIFO eviction) so long sessions
don't grow it without bound; exact-key matches are unaffected by eviction,
but a very large, long-running page may occasionally miss recognizing an
older *subsegment* match once its value has been evicted.

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
- If you use code keys for the source locale, preload that locale with `await loadLocale("en-US")` or `await loadLocale("en")` before first render when you need immediate source-copy output.
- For immediate guarantees, preload with `loadLocale("xx")` before rendering that locale scope.

## Missing Translation Warnings

- PDS warns when a key is missing in a non-default target locale and fallback content is used.
- Warnings are deduplicated and emitted once per `locale::key` pair.
- Warnings reset when localization is reconfigured.
- No warning is emitted for normal default-locale usage.
