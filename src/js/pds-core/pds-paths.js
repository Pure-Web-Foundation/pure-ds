const DEFAULT_SEGMENT = "pds";
const URL_PATTERN = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
const DRIVE_PATTERN = /^[a-z]:/i;

function ensureTrailingSlash(value = "") {
  return value.endsWith("/") ? value : `${value}/`;
}

function appendSegmentIfMissing(input = "", segment = DEFAULT_SEGMENT) {
  const trimmed = input.replace(/\/+$/, "");
  const regex = new RegExp(`(?:^|\/)${segment}$`, "i");
  if (regex.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/${segment}`;
}

function stripLeadingDotSlash(value) {
  return value.replace(/^\.\/+/, "");
}

function stripDriveLetter(value) {
  if (DRIVE_PATTERN.test(value)) {
    return value.replace(DRIVE_PATTERN, "").replace(/^\/+/, "");
  }
  return value;
}

function stripPublicPrefix(value) {
  if (value.startsWith("public/")) {
    return value.substring("public/".length);
  }
  return value;
}

/**
 * Resolve the public asset root URL for PDS static assets based on the consumer config.
 * Falls back to "/assets/pds/" when no root is provided. Automatically appends the
 * "pds" segment when the provided root omits it.
 *
 * @param {object} config - Unified PDS configuration.
 * @param {{ defaultRoot?: string, segment?: string }} [options]
 * @returns {string} Normalized URL (always ends with a trailing slash).
 */
export function resolvePublicAssetURL(config, options = {}) {
  const segment = options.segment || DEFAULT_SEGMENT;
  const defaultRoot = options.defaultRoot || `/assets/${segment}/`;
  const candidate =
    (config?.public && config.public?.root) ||
    (config?.static && config.static?.root) ||
    null;

  if (!candidate || typeof candidate !== "string") {
    return ensureTrailingSlash(defaultRoot);
  }

  let normalized = candidate.trim();
  if (!normalized) {
    return ensureTrailingSlash(defaultRoot);
  }

  normalized = normalized.replace(/\\/g, "/");
  normalized = appendSegmentIfMissing(normalized, segment);
  normalized = ensureTrailingSlash(normalized);

  if (URL_PATTERN.test(normalized)) {
    return normalized;
  }

  normalized = stripLeadingDotSlash(normalized);
  normalized = stripDriveLetter(normalized);

  if (normalized.startsWith("/")) {
    return ensureTrailingSlash(normalized);
  }

  normalized = stripPublicPrefix(normalized);

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/\/+/g, (match, offset) =>
    offset === 0 ? match : "/"
  );

  return ensureTrailingSlash(normalized);
}

/**
 * Extract the raw public root candidate from config for reuse in Node-side helpers.
 * @param {object} config
 * @returns {string|null}
 */
export function getPublicRootCandidate(config) {
  if (config?.public?.root) return config.public.root;
  if (config?.static?.root) return config.static.root;
  return null;
}

export const __internal = {
  ensureTrailingSlash,
  appendSegmentIfMissing,
  stripLeadingDotSlash,
  stripDriveLetter,
  stripPublicPrefix,
  URL_PATTERN,
  DEFAULT_SEGMENT,
};
