function normalizeLocaleTag(locale) {
  return String(locale || "").trim().toLowerCase();
}

function toBaseLocale(locale) {
  return normalizeLocaleTag(locale).split("-")[0] || "";
}

function toLocaleList(locales, fallbackLocale) {
  const output = [];
  const seen = new Set();

  const add = (locale) => {
    const normalized = normalizeLocaleTag(locale);
    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    output.push(normalized);
  };

  if (Array.isArray(locales)) {
    locales.forEach(add);
  }

  add(fallbackLocale);
  return output;
}

function normalizeAliasMap(aliases = {}) {
  const normalized = {};

  if (!aliases || typeof aliases !== "object") {
    return normalized;
  }

  Object.entries(aliases).forEach(([key, values]) => {
    const normalizedKey = normalizeLocaleTag(key);
    if (!normalizedKey) {
      return;
    }

    const list = [];
    const seen = new Set();

    if (Array.isArray(values)) {
      values.forEach((value) => {
        if (typeof value !== "string") {
          return;
        }

        const trimmed = value.trim();
        if (!trimmed) {
          return;
        }

        const dedupeKey = trimmed.toLowerCase();
        if (seen.has(dedupeKey)) {
          return;
        }

        seen.add(dedupeKey);
        list.push(trimmed);
      });
    }

    normalized[normalizedKey] = list;
  });

  return normalized;
}

function resolveAliasTarget(aliasKey, aliases, localeSet) {
  const values = Array.isArray(aliases?.[aliasKey]) ? aliases[aliasKey] : [];
  for (const value of values) {
    const normalizedValue = normalizeLocaleTag(value);
    if (localeSet.has(normalizedValue)) {
      return normalizedValue;
    }
  }
  return "";
}

function createAliasLookup({ aliases, localeSet }) {
  const lookup = new Map();

  for (const locale of localeSet) {
    lookup.set(locale, locale);
  }

  for (const key of Object.keys(aliases || {})) {
    const target = resolveAliasTarget(key, aliases, localeSet);
    if (!target) {
      throw new Error(
        `[i18n] Locale alias "${key}" does not map to any configured locale.`
      );
    }
    lookup.set(key, target);
  }

  return lookup;
}

function resolveConfiguredLocale(locale, { defaultLocale, aliasLookup }) {
  const normalized = normalizeLocaleTag(locale);
  if (!normalized) {
    return defaultLocale;
  }

  const direct = aliasLookup.get(normalized);
  if (direct) {
    return direct;
  }

  const base = toBaseLocale(normalized);
  const baseMapped = base ? aliasLookup.get(base) : "";
  if (baseMapped) {
    return baseMapped;
  }

  throw new Error(
    `[i18n] Locale alias "${locale}" is not configured. Add an alias entry for "${base || normalized}".`
  );
}

function normalizeBundleShape(bundle) {
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
    return {};
  }

  return bundle;
}

function normalizeBasePath(basePath) {
  const raw = typeof basePath === "string" ? basePath.trim() : "";
  if (!raw) {
    return "/assets/locales";
  }

  if (raw === "/") {
    return "";
  }

  return raw.replace(/\/+$/, "");
}

function buildCandidateLocales({ locale, effectiveLocale, defaultLocale, aliases }) {
  const candidates = [];
  const seen = new Set();

  const add = (candidate) => {
    if (typeof candidate !== "string") {
      return;
    }

    const trimmed = candidate.trim();
    if (!trimmed) {
      return;
    }

    const dedupeKey = trimmed.toLowerCase();
    if (seen.has(dedupeKey)) {
      return;
    }

    seen.add(dedupeKey);
    candidates.push(trimmed);
  };

  const addAliases = (aliasKey) => {
    const values = Array.isArray(aliases?.[aliasKey]) ? aliases[aliasKey] : [];
    if (!values.length) {
      return;
    }

    const prioritized = [...values].sort((a, b) => {
      const aSpecific = String(a || "").includes("-");
      const bSpecific = String(b || "").includes("-");
      if (aSpecific === bSpecific) return 0;
      return aSpecific ? -1 : 1;
    });

    prioritized.forEach(add);
  };

  const normalizedRequested = normalizeLocaleTag(locale);
  const requestedBase = toBaseLocale(normalizedRequested);
  const effectiveBase = toBaseLocale(effectiveLocale);

  addAliases(normalizedRequested);
  addAliases(requestedBase);
  addAliases(effectiveLocale);
  addAliases(effectiveBase);

  add(locale);
  add(normalizedRequested);
  add(requestedBase);
  add(effectiveLocale);
  add(effectiveBase);

  if (effectiveLocale !== defaultLocale) {
    addAliases(defaultLocale);
    add(defaultLocale);
  }

  return candidates;
}

/**
 * Create a localization config that lazy-loads locale JSON resources.
 *
 * JSON files are expected at:
 * - `${basePath}/{locale}.json`
 *
 * Bundle format can be either:
 * - `{ "Key": "Translated" }`
 * - `{ "Key": { "content": "Translated" } }`
 *
 * @param {{
 *   locale?: string,
 *   locales?: string[],
 *   basePath?: string,
 *   aliases?: Record<string, string[]>,
 *   requestInit?: RequestInit,
 *   cache?: Map<string, Record<string, string | { content?: string }>>,
 * }} [options]
 * @returns {{
 *   locale: string,
 *   locales: string[],
 *   provider: {
 *     locales: string[],
 *     resolveLocale: (locale: string) => string,
 *     loadLocale: (context: { locale: string }) => Promise<Record<string, string | { content?: string }>>,
 *   },
 * }}
 */
export function createJSONLocalization(options = {}) {
  const defaultLocale = normalizeLocaleTag(options?.locale || "en") || "en";
  const locales = toLocaleList(options?.locales, defaultLocale);
  const localeSet = new Set(locales);
  const aliases = normalizeAliasMap(options?.aliases || {});
  const aliasLookup = createAliasLookup({ aliases, localeSet });
  const cache = options?.cache instanceof Map ? options.cache : new Map();
  const basePath = normalizeBasePath(options?.basePath);
  const requestInit =
    options?.requestInit && typeof options.requestInit === "object"
      ? options.requestInit
      : {};

  const resolveEffectiveLocale = (locale) => {
    return resolveConfiguredLocale(locale, {
      defaultLocale,
      aliasLookup,
    });
  };

  const loadLocale = async ({ locale }) => {
    const effectiveLocale = resolveEffectiveLocale(locale);
    if (cache.has(effectiveLocale)) {
      return cache.get(effectiveLocale) || {};
    }

    if (effectiveLocale === defaultLocale) {
      const defaultBundle = {};
      cache.set(effectiveLocale, defaultBundle);
      return defaultBundle;
    }

    if (typeof fetch !== "function") {
      const emptyBundle = {};
      cache.set(effectiveLocale, emptyBundle);
      return emptyBundle;
    }

    const candidates = buildCandidateLocales({
      locale,
      effectiveLocale,
      defaultLocale,
      aliases,
    });

    for (const candidate of candidates) {
      try {
        const resourcePath = basePath
          ? `${basePath}/${candidate}.json`
          : `/${candidate}.json`;
        const response = await fetch(resourcePath, {
          headers: {
            Accept: "application/json",
          },
          ...requestInit,
        });

        if (!response.ok) {
          continue;
        }

        const bundle = normalizeBundleShape(await response.json());
        cache.set(effectiveLocale, bundle);
        return bundle;
      } catch (error) {}
    }

    const emptyBundle = {};
    cache.set(effectiveLocale, emptyBundle);
    return emptyBundle;
  };

  return {
    locale: defaultLocale,
    locales: [...locales],
    provider: {
      locales: [...locales],
      resolveLocale: resolveEffectiveLocale,
      loadLocale,
    },
  };
}
