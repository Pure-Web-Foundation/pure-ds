import { html } from "#pds/lit";
import { PDS } from "#pds";
import { presets, PDS_CONFIG_RELATIONS } from "@pds-src/js/pds-core/pds-config.js";

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const SCALE_NAMES = ["primary", "secondary", "gray", "accent", "success", "warning", "danger", "info"];
const ROLE_FAMILIES = ["primary", "success", "warning", "danger", "info"];
const ROLE_SUFFIXES = ["fill", "fill-hover", "fill-active", "text", "text-hover", "contrast"];
const CSS_FUNCTION_SWATCHES = [
  { id: "primary-wash", label: "Primary wash", sourceToken: "--color-primary-500", mixPercent: 18 },
  { id: "accent-tint", label: "Accent tint", sourceToken: "--color-accent-500", mixPercent: 32 },
  { id: "success-backdrop", label: "Success backdrop", sourceToken: "--color-success-500", mixPercent: 26 },
  { id: "warning-wash", label: "Warning wash", sourceToken: "--color-warning-500", mixPercent: 24 },
];
const SURFACE_TOKENS = [
  "--surface-bg",
  "--surface-text",
  "--surface-text-secondary",
  "--surface-text-muted",
  "--surface-border",
  "--surface-inverse-bg",
  "--surface-inverse-text",
];

const RUNTIME_EDITABLE_TOKENS = [
  {
    cssVar: "--story-highlight-accent",
    label: "Highlight Accent",
    fallbackToken: "--color-accent-500",
    fallback: "#e54271",
  },
  {
    cssVar: "--story-highlight-surface",
    label: "Surface Fill",
    fallbackToken: "--surface-raised-bg",
    fallback: "#f1f1f1",
  },
  {
    cssVar: "--story-highlight-border",
    label: "Border Tone",
    fallbackToken: "--surface-border",
    fallback: "#707070",
  },
];

const RELATION_PATHS = [
  "colors.primary",
  "colors.secondary",
  "colors.accent",
  "colors.background",
  "colors.success",
  "colors.warning",
  "colors.danger",
  "colors.info",
  "colors.darkMode.primary",
  "colors.darkMode.background",
];

const getRootStyle = () => {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return null;
  }
  return window.getComputedStyle(document.documentElement);
};

const readTokenValue = (tokenName) => {
  const rootStyle = getRootStyle();
  if (!rootStyle) return "";
  return rootStyle.getPropertyValue(tokenName).trim();
};

const readPath = (obj, path) =>
  path.split(".").reduce((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return acc[key];
  }, obj);

const toRgb = (raw) => {
  if (!raw) return null;
  const value = raw.trim();
  if (!value) return null;

  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }

    const intVal = Number.parseInt(hex, 16);
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255,
    };
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(",")
      .map((part) => part.trim())
      .map((part) => (part.endsWith("%") ? (255 * Number.parseFloat(part)) / 100 : Number.parseFloat(part)));

    if (parts.length < 3 || parts.slice(0, 3).some((part) => Number.isNaN(part))) {
      return null;
    }

    return {
      r: Math.max(0, Math.min(255, parts[0])),
      g: Math.max(0, Math.min(255, parts[1])),
      b: Math.max(0, Math.min(255, parts[2])),
    };
  }

  return null;
};

const rgbToHex = ({ r, g, b }) => {
  const asHex = (value) => Math.round(value).toString(16).padStart(2, "0");
  return `#${asHex(r)}${asHex(g)}${asHex(b)}`;
};

const toRelativeLuminance = ({ r, g, b }) => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrastRatio = (foreground, background) => {
  const l1 = toRelativeLuminance(foreground);
  const l2 = toRelativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

const chooseReadableTextColor = (backgroundColor, fallback = "var(--surface-text)") => {
  const background = toRgb(backgroundColor);
  if (!background) {
    return fallback;
  }

  const candidateTokens = ["--surface-text", "--surface-inverse-text", "#000000", "#ffffff"];
  let bestCandidate = { value: fallback, ratio: 0 };

  candidateTokens.forEach((candidate) => {
    const rawValue = candidate.startsWith("--") ? readTokenValue(candidate) : candidate;
    const candidateRgb = toRgb(rawValue);
    if (!candidateRgb) return;

    const ratio = contrastRatio(candidateRgb, background);
    if (ratio > bestCandidate.ratio) {
      bestCandidate = {
        value: `rgb(${Math.round(candidateRgb.r)}, ${Math.round(candidateRgb.g)}, ${Math.round(candidateRgb.b)})`,
        ratio,
      };
    }
  });

  return bestCandidate.value;
};

const tokenToHex = (tokenName, fallback = "#000000") => {
  const value = readTokenValue(tokenName) || fallback;
  const rgb = toRgb(value);
  return rgb ? rgbToHex(rgb) : fallback;
};

const resolveCssColor = (value) => {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    typeof window.getComputedStyle !== "function" ||
    !document.body
  ) {
    return "";
  }

  const probe = document.createElement("span");
  probe.style.color = value;
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);

  const resolved = window.getComputedStyle(probe).color.trim();
  probe.remove();
  return resolved;
};

const cssValueToHex = (value) => {
  const resolved = resolveCssColor(value) || value;
  const rgb = toRgb(resolved);
  return rgb ? rgbToHex(rgb) : resolved;
};

const clampPercentage = (value, fallback = 0) => {
  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
};

const buildCssMixFormula = (sourceToken, mixPercent) =>
  `color-mix(in srgb, var(${sourceToken}) ${mixPercent}%, var(--surface-bg))`;

const toHexOrFallback = (value, fallback = "#000000") => {
  const maybeHex = cssValueToHex(value);
  return /^#[0-9a-f]{6}$/i.test(maybeHex || "") ? maybeHex : fallback;
};

const deriveMixedHex = (sourceToken, mixPercent, fallback = "#000000") => {
  const sourceRgb = toRgb(readTokenValue(sourceToken));
  const surfaceRgb = toRgb(readTokenValue("--surface-bg") || readTokenValue("--color-surface-base") || "#ffffff");
  if (!sourceRgb || !surfaceRgb) {
    const formula = buildCssMixFormula(sourceToken, mixPercent);
    return toHexOrFallback(formula, fallback);
  }

  const surfaceWeight = (100 - mixPercent) / 100;
  const mixed = mixRgb(sourceRgb, surfaceRgb, surfaceWeight);
  return rgbToHex(mixed);
};

const syncEnhancedColorInput = (inputElement, nextHex) => {
  if (!inputElement) return;
  if (inputElement.value.toLowerCase() === nextHex.toLowerCase()) return;

  inputElement.value = nextHex;
  inputElement.dispatchEvent(new Event("input", { bubbles: true }));
  inputElement.dispatchEvent(new Event("change", { bubbles: true }));
};

const setGeneratedTextValue = (element, nextValue) => {
  if (!element) return;
  element.setAttribute("data-value", nextValue);
};

const buildLiveSnippet = (type, scope) => {
  const read = (name, def) => {
    if (!scope) return def;
    return (scope.style?.getPropertyValue(name) || "").trim() || def;
  };

  if (type === "clamp") {
    const vw = read("--clamp-fluid-vw", "2vw");
    const step = read("--clamp-max-step", "6");
    const rBoost = read("--clamp-radius-boost", "8px");
    return `.adaptive-card {
  padding: clamp(var(--spacing-2), ${vw}, calc(var(--spacing-1) * ${step}));
  border-radius: clamp(var(--radius-sm), calc(${vw} * 0.7), calc(var(--radius-sm) + ${rBoost}));
}`;
  }

  if (type === "minmax") {
    const wCap = read("--minmax-width-cap", "18rem");
    const mh = read("--minmax-min-height", "3.2rem");
    const vhFloor = read("--minmax-vh-floor", "8vh");
    return `.bounded {
  width: min(100%, ${wCap});
  min-height: max(${mh}, ${vhFloor});
}`;
  }

  if (type === "calc") {
    const pMult = read("--calc-pad-mult", "3");
    const bBoost = read("--calc-border-boost", "1px");
    const rBoost = read("--calc-radius-boost", "2px");
    const sBoost = read("--calc-shadow-boost", "2px");
    return `.token-shell {
  padding: calc(var(--spacing-1) * ${pMult});
  border-width: calc(var(--border-width-thin) + ${bBoost});
  border-radius: calc(var(--radius-sm) + ${rBoost});
  box-shadow: 0 calc(var(--border-width-thin) + ${bBoost})
              calc(var(--spacing-2) + ${sBoost})
              color-mix(in srgb, var(--color-info-500) 20%, transparent);
}`;
  }

  return "";
};

const onFunctionDemoRangeInput = (event) => {
  const inputElement = event.currentTarget;
  const scopeElement = inputElement.closest("[data-function-scope]");
  const cssVarName = inputElement.dataset.cssVar;
  if (!scopeElement || !cssVarName) return;

  const unit = inputElement.dataset.unit || "";
  const stepText = String(inputElement.step || "1");
  const decimals = stepText.includes(".") ? stepText.split(".")[1].length : 0;
  const numericValue = Number.parseFloat(inputElement.value);
  if (!Number.isFinite(numericValue)) return;

  const normalizedValue = decimals > 0 ? numericValue.toFixed(decimals) : String(Math.round(numericValue));
  inputElement.value = normalizedValue;
  scopeElement.style.setProperty(cssVarName, `${normalizedValue}${unit}`);

  const liveSnippetEl = scopeElement.querySelector("[data-live-snippet]");
  if (liveSnippetEl) {
    const newText = buildLiveSnippet(liveSnippetEl.dataset.liveSnippet, scopeElement);
    if (newText) setGeneratedTextValue(liveSnippetEl, newText);
  }
};

const renderFunctionRangeControl = ({ label, min, max, step, value, cssVar, unit = "" }) => html`
  <label class="range-output">
    <span data-range-label=${label}></span>
    <input
      type="range"
      min=${min}
      max=${max}
      step=${step}
      .value=${String(value)}
      data-css-var=${cssVar}
      data-unit=${unit}
      @input=${onFunctionDemoRangeInput}
      @change=${onFunctionDemoRangeInput}
    />
  </label>
`;

const mixRgb = (source, target, targetWeight) => {
  const sourceWeight = 1 - targetWeight;
  return {
    r: source.r * sourceWeight + target.r * targetWeight,
    g: source.g * sourceWeight + target.g * targetWeight,
    b: source.b * sourceWeight + target.b * targetWeight,
  };
};

const getCurrentPresetId = () => {
  const currentPreset = PDS?.currentPreset;
  const candidate =
    typeof currentPreset === "string"
      ? currentPreset
      : currentPreset && typeof currentPreset === "object"
        ? currentPreset.id
        : null;

  if (candidate && presets[candidate]) {
    return candidate;
  }
  return "default";
};

const getCurrentPreset = () => presets[getCurrentPresetId()] || presets.default || {};

const sortPresetEntries = (entries) => {
  const sorted = [...entries];
  sorted.sort((a, b) => {
    const aPreset = a[1] || {};
    const bPreset = b[1] || {};
    const aTags = Array.isArray(aPreset.tags) ? aPreset.tags : [];
    const bTags = Array.isArray(bPreset.tags) ? bPreset.tags : [];

    const aFeatured = aTags.includes("featured");
    const bFeatured = bTags.includes("featured");
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;

    const aHasTags = aTags.length > 0;
    const bHasTags = bTags.length > 0;
    if (aHasTags && !bHasTags) return -1;
    if (!aHasTags && bHasTags) return 1;

    return (aPreset.name || a[0]).localeCompare(bPreset.name || b[0]);
  });
  return sorted;
};

const getThemeSupportLabel = (preset) => {
  if (Array.isArray(preset?.themes) && preset.themes.length) {
    return preset.themes.join(", ");
  }
  return "light, dark, system";
};

const formatRatio = (ratio) => {
  if (!Number.isFinite(ratio)) return "n/a";
  return `${ratio.toFixed(2)}:1`;
};

const toStatusBadgeClass = (status) => {
  if (status === "good") return "badge-success";
  if (status === "warn") return "badge-warning";
  return "badge-danger";
};

const toPrettyJson = (value, maxLength = 1400) => {
  try {
    const output = JSON.stringify(value, null, 2);
    if (output.length <= maxLength) {
      return output;
    }
    return `${output.slice(0, maxLength)}\n...`;
  } catch {
    return String(value);
  }
};

const renderCodeSnippet = (source, language = "javascript") => html`
  <pre><code class="language-${language}">${source.trim()}</code></pre>
`;

const renderScaleRow = (scaleName) => html`
  <article class="card">
    <header class="flex justify-between items-baseline gap-sm">
      <h4>${scaleName}</h4>
      <small class="text-muted">${`--color-${scaleName}-50..900`}</small>
    </header>
    <div class="flex flex-wrap gap-sm">
      ${COLOR_STEPS.map((step) => {
        const tokenName = `--color-${scaleName}-${step}`;
        const tokenValue = readTokenValue(tokenName);
        const fallback = step >= 500 ? "var(--surface-inverse-text)" : "var(--surface-text)";
        return html`
          <div
            class="story-colors-derived-chip"
            style=${`background: var(${tokenName}); color: ${chooseReadableTextColor(tokenValue, fallback)}`}
            title=${`${tokenName}: ${tokenValue || "not available"}`}
          >
            ${step}
          </div>
        `;
      })}
    </div>
  </article>
`;

const renderRoleTokenRow = (family) => html`
  <article class="card">
    <header class="flex justify-between items-baseline gap-sm">
      <h4>${family} roles</h4>
      <small class="text-muted">${`--color-${family}-{${ROLE_SUFFIXES.join(",")}}`}</small>
    </header>
    <div class="flex flex-wrap gap-sm">
      ${ROLE_SUFFIXES.map((suffix) => {
        const tokenName = `--color-${family}-${suffix}`;
        const tokenValue = readTokenValue(tokenName);
        return html`
          <div
            class="story-colors-derived-chip"
            style=${`background: var(${tokenName}); color: ${chooseReadableTextColor(tokenValue, "var(--surface-text)")}`}
            title=${`${tokenName}: ${tokenValue || "not available"}`}
          >
            ${suffix}
          </div>
        `;
      })}
    </div>
  </article>
`;

const renderCssFunctionSwatch = ({ id, label, sourceToken, mixPercent }) => {
  const initialPercent = clampPercentage(mixPercent, 20);
  const sourceValue = readTokenValue(sourceToken) || "not available";
  const sourceHex = toHexOrFallback(sourceValue, "#000000");
  const mixFormula = buildCssMixFormula(sourceToken, initialPercent);
  const derivedHex = deriveMixedHex(sourceToken, initialPercent, "#000000");

  return html`
    <article
      class=${`card stack-sm story-colors-function-card story-colors-function-card--${id}`}
      data-source-token=${sourceToken}
      style=${`--mix-percent: ${initialPercent}%`}
    >
      <header class="flex justify-between items-baseline gap-sm">
        <h4>${label}</h4>
        <small class="text-muted story-generated-text" data-mix-summary data-value=${`${initialPercent}% with --surface-bg`}></small>
      </header>

      <label class="range-output">
        <span>Mix percentage</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          .value=${String(initialPercent)}
          @input=${onCssFunctionMixInput}
          @change=${onCssFunctionMixInput}
        />
      </label>

      <div class="grid gap-md grid-cols-2">
        <label class="stack-sm" data-color title=${`${sourceToken}: ${sourceValue}`}>
          <span class="text-muted">Source</span>
          <input
            type="color"
            data-swatch-input="source"
            data-readonly="true"
            .value=${sourceHex}
            readonly
            aria-readonly="true"
            tabindex="-1"
          />
        </label>

        <label class="stack-sm" data-color title=${mixFormula}>
          <span class="text-muted">Derived</span>
          <input
            type="color"
            data-swatch-input="derived"
            data-readonly="true"
            .value=${derivedHex}
            readonly
            aria-readonly="true"
            tabindex="-1"
          />
        </label>
      </div>

      <small class="text-muted"><code class="story-generated-text" data-mix-formula data-value=${mixFormula}></code></small>
    </article>
  `;
};

const onCssFunctionMixInput = (event) => {
  const inputElement = event.currentTarget;
  const cardElement = inputElement.closest(".story-colors-function-card");
  if (!cardElement) return;

  const sourceToken = cardElement.dataset.sourceToken;
  if (!sourceToken) return;

  const mixPercent = clampPercentage(inputElement.value, 20);
  inputElement.value = String(mixPercent);

  const mixPercentLabel = `${mixPercent}%`;
  const mixFormula = buildCssMixFormula(sourceToken, mixPercent);
  const sourceValue = readTokenValue(sourceToken) || "not available";
  const sourceHex = toHexOrFallback(sourceValue, "#000000");
  const derivedHex = deriveMixedHex(sourceToken, mixPercent, "#000000");

  cardElement.style.setProperty("--mix-percent", mixPercentLabel);

  const mixSummaryElement = cardElement.querySelector("[data-mix-summary]");
  if (mixSummaryElement) {
    setGeneratedTextValue(mixSummaryElement, `${mixPercent}% with --surface-bg`);
  }

  const formulaElement = cardElement.querySelector("[data-mix-formula]");
  if (formulaElement) {
    setGeneratedTextValue(formulaElement, mixFormula);
  }

  const sourceLabelElement = cardElement.querySelector('[data-swatch-input="source"]')?.closest("label[data-color]");
  if (sourceLabelElement) {
    sourceLabelElement.title = `${sourceToken}: ${sourceValue}`;
  }

  const derivedLabelElement = cardElement.querySelector('[data-swatch-input="derived"]')?.closest("label[data-color]");
  if (derivedLabelElement) {
    derivedLabelElement.title = mixFormula;
  }

  syncEnhancedColorInput(cardElement.querySelector('[data-swatch-input="source"]'), sourceHex);
  syncEnhancedColorInput(cardElement.querySelector('[data-swatch-input="derived"]'), derivedHex);
};

const getPastelRows = () => {
  const baseFamilies = ["primary", "secondary", "accent", "success", "warning", "danger", "info"];
  const white = { r: 255, g: 255, b: 255 };
  const weights = [0.82, 0.7, 0.58];
  const labels = ["mist", "soft", "warm"];

  return baseFamilies
    .map((family) => {
      const baseToken = `--color-${family}-500`;
      const baseValue = readTokenValue(baseToken);
      const baseRgb = toRgb(baseValue);
      if (!baseRgb) return null;

      const variants = weights.map((weight, index) => {
        const mixed = mixRgb(baseRgb, white, weight);
        return {
          name: labels[index],
          hex: rgbToHex(mixed),
        };
      });

      return {
        family,
        baseToken,
        baseHex: rgbToHex(baseRgb),
        variants,
      };
    })
    .filter(Boolean);
};

const onRuntimeTokenInput = (event) => {
  const inputElement = event.currentTarget;
  const cssVarName = inputElement?.dataset?.cssVar;
  if (!cssVarName) return;

  const scope = inputElement.closest(".story-colors-runtime");
  const target = scope?.querySelector("[data-runtime-target]");
  if (!target) return;

  target.style.setProperty(cssVarName, inputElement.value);
};

const onRuntimeTokenReset = (event) => {
  const scope = event.currentTarget.closest(".story-colors-runtime");
  if (!scope) return;

  const target = scope.querySelector("[data-runtime-target]");
  if (!target) return;

  scope.querySelectorAll("input[data-css-var]").forEach((inputElement) => {
    const cssVarName = inputElement.dataset.cssVar;
    const fallbackToken = inputElement.dataset.fallbackToken;
    const fallback = inputElement.dataset.fallback || "#000000";
    if (!cssVarName) return;

    const nextValue = tokenToHex(fallbackToken || cssVarName, fallback);
    inputElement.value = nextValue;
    target.style.setProperty(cssVarName, nextValue);
    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
  });
};

const cssFunctionSwatchRules = CSS_FUNCTION_SWATCHES.map(
  ({ id }) => `
.story-colors-function-card--${id} {
  --mix-percent: 20%;
}
`
).join("\n");

const walkthroughStyles = html`
  <style>
    .story-generated-text::before {
      content: attr(data-value);
      white-space: pre-wrap;
    }

    code.story-generated-text::before {
      display: block;
    }

    .story-colors-preset-swatches {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
      gap: var(--spacing-2);
    }

    .story-colors-preset-swatch {
      min-height: 3.75rem;
      border-radius: var(--radius-lg);
      border: var(--border-width-thin, 1px) solid color-mix(in srgb, var(--surface-border), transparent 35%);
      padding: var(--spacing-2);
      font-size: 0.72rem;
      font-weight: var(--font-weight-semibold);
      line-height: 1.15;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-transform: uppercase;
      background: var(--swatch-color);
      color: var(--swatch-text);
    }

    .story-colors-runtime-control input[type="color"] {
      width: 100%;
      min-height: 2.2rem;
      border: none;
      background: transparent;
    }

    .story-colors-runtime-target {
      --story-highlight-accent: var(--color-accent-500);
      --story-highlight-surface: color-mix(in srgb, var(--story-highlight-accent) 14%, var(--surface-raised-bg));
      --story-highlight-border: color-mix(in srgb, var(--story-highlight-accent) 34%, var(--surface-border));
      border: var(--border-width-thin, 1px) solid var(--story-highlight-border);
      border-radius: var(--radius-lg);
      background: var(--story-highlight-surface);
      padding: var(--spacing-4);
      display: grid;
      gap: var(--spacing-3);
      box-shadow: 0 10px 24px color-mix(in srgb, var(--story-highlight-accent) 18%, transparent);
    }

    .story-colors-runtime-target .story-colors-runtime-kicker {
      color: var(--story-highlight-accent);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .story-colors-runtime-target .btn-outline {
      color: var(--story-highlight-accent);
      border-color: color-mix(in srgb, var(--story-highlight-accent) 70%, var(--surface-border));
    }

    .story-colors-derived-chip {
      min-height: 5.4rem;
      min-width: 5.4rem;
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      border: var(--border-width-thin, 1px) solid color-mix(in srgb, var(--surface-border), transparent 40%);
      background: var(--derived-color);
      color: var(--derived-text, var(--surface-text));
      display: grid;
      align-content: space-between;
      gap: var(--spacing-2);
    }

    .story-colors-derived-chip small {
      font-family: var(--font-family-mono);
      font-size: var(--font-size-xs);
    }

    [data-swatch-input][data-readonly="true"] {
      pointer-events: none;
    }

    .story-colors-clamp-demo {
      padding: clamp(var(--spacing-2), var(--clamp-fluid-vw, 2vw), calc(var(--spacing-1) * var(--clamp-max-step, 6)));
      border-radius: clamp(var(--radius-sm), calc(var(--clamp-fluid-vw, 2vw) * 0.7), calc(var(--radius-sm) + var(--clamp-radius-boost, 8px)));
      background: color-mix(in srgb, var(--color-accent-500) 16%, var(--surface-bg));
      border: var(--border-width-thin, 1px) solid var(--surface-border);
    }

    .story-colors-minmax-demo {
      width: min(100%, var(--minmax-width-cap, 18rem));
      min-height: max(var(--minmax-min-height, 3.2rem), var(--minmax-vh-floor, 8vh));
      display: grid;
      align-items: center;
      justify-items: center;
      border-radius: var(--radius-md);
      background: color-mix(in srgb, var(--color-success-500) 16%, var(--surface-bg));
      border: var(--border-width-thin, 1px) solid var(--surface-border);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
    }

    .story-colors-calc-demo {
      padding: calc(var(--spacing-1) * var(--calc-pad-mult, 3));
      border: calc(var(--border-width-thin, 1px) + var(--calc-border-boost, 1px)) solid color-mix(in srgb, var(--color-info-500) 36%, var(--surface-border));
      border-radius: calc(var(--radius-sm) + var(--calc-radius-boost, 2px));
      background: color-mix(in srgb, var(--color-info-500) 14%, var(--surface-bg));
      box-shadow: 0 calc(var(--border-width-thin, 1px) + var(--calc-border-boost, 1px)) calc(var(--spacing-2) + var(--calc-shadow-boost, 2px))
        color-mix(in srgb, var(--color-info-500) 20%, transparent);
    }

    ${cssFunctionSwatchRules}
  </style>
`;

export default {
  title: "Foundations/Colors",
  tags: ["color", "tokens", "presets", "theming", "runtime", "semantic"],
  parameters: {
    pds: {
      tags: [
        "color",
        "tokens",
        "raw",
        "semantic",
        "preset",
        "design",
        "runtime",
        "compiled",
        "css-variables",
      ],
    },
    docs: {
      description: {
        component:
          "Complete walkthrough of PDS colors: config relationship, token families, dynamic preset catalog, runtime APIs, CSS derivations, and accessibility checks.",
      },
    },
  },
};

export const Default = {
  name: "Config and Token Flow",
  render: () => {
    const activePresetId = getCurrentPresetId();
    const activePreset = getCurrentPreset();
    const compiled = PDS.compiled || {};
    const activeDesign = compiled?.design || activePreset;

    return html`
      
      <section class="section stack-lg">
        <header>
          <h3>Config to Runtime Token Flow</h3>
          <small class="text-muted">
            <code>preset</code> selects a full design baseline. <code>design</code> overrides selected fields. PDS then regenerates color scales, semantic roles, and surface tokens.
          </small>
        </header>

        <div class="grid gap-md grid-cols-4">
          <article class="card">
            <b>1. pds.config.js</b>
            <span class="text-muted">Choose <code>preset</code> and optional <code>design</code> overrides.</span>
          </article>
          <article class="card">
            <b>2. Generator Input</b>
            <span class="text-muted">Preset config merges with override values.</span>
          </article>
          <article class="card">
            <b>3. Token Synthesis</b>
            <span class="text-muted">Raw scales + semantic role tokens are derived.</span>
          </article>
          <article class="card">
            <b>4. Runtime CSS Vars</b>
            <span class="text-muted">Tokens become <code>--color-*</code> and <code>--surface-*</code> variables.</span>
          </article>
        </div>

        <div class="grid gap-md grid-cols-3">
          <div class="card">
            <small class="text-muted">Active Preset</small>
            <b>${activePresetId}</b>
            <span>${activePreset?.name || "Unknown"}</span>
          </div>
          <div class="card">
            <small class="text-muted">Runtime Theme</small>
            <b>${PDS.theme || "system"}</b>
            <span class="text-muted">Toolbar-driven (<code>light</code>, <code>dark</code>, <code>system</code>)</span>
          </div>
          <div class="card">
            <small class="text-muted">Preset Count</small>
            <b>${Object.keys(presets).length}</b>
            <span class="text-muted">Loaded from <code>pds-config.js</code></span>
          </div>
        </div>

        <article class="card">
          <h4>Deterministic Config Relations (SSoT)</h4>
          <small class="text-muted">
            This mapping comes from <code>PDS_CONFIG_RELATIONS</code>, so docs stay aligned with generator behavior.
          </small>
          
          <table class="table-bordered">
            <thead>
              <tr>
                <th>Config Path</th>
                <th>Current Value</th>
                <th>Token Families Produced</th>
              </tr>
            </thead>
            <tbody>
              ${RELATION_PATHS.map((path) => {
                const value = readPath(activeDesign?.colors || activeDesign, path.replace(/^colors\./, ""));
                const relations = PDS_CONFIG_RELATIONS[path]?.tokens || [];

                return html`
                  <tr>
                    <td><code>${path}</code></td>
                    <td><code>${typeof value === "string" ? value : value == null ? "null / auto" : JSON.stringify(value)}</code></td>
                    <td><code>${relations.join(", ") || "n/a"}</code></td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        
        </article>

        <article class="card">
          ${renderCodeSnippet(
            `import { PDS } from "#pds";

await PDS.start({
  preset: "${activePresetId}",
  design: {
    colors: {
      primary: "${activeDesign?.colors?.primary || activePreset?.colors?.primary || "#0e7490"}",
      accent: "${activeDesign?.colors?.accent || activePreset?.colors?.accent || "#e54271"}",
    },
  },
});`
          )}
        </article>
      </section>
    `;
  },
};

export const TokenFamiliesAndRoles = {
  name: "Token Families and Roles",
  render: () => html`
    ${walkthroughStyles}
    <section class="section stack-lg">
      <header>
        <h3>Token System: Raw Scales and Semantic Roles</h3>
        <small class="text-muted">
          Raw scales (<code>--color-*-50..900</code>) are generated from base colors. Semantic role tokens (<code>--color-*-fill</code>, <code>--color-*-text</code>, etc.) are the UI-facing layer.
        </small>
      </header>

      <div class="accordion">
        <details open>
          <summary>Raw Color Scales</summary>
          <div class="card stack-sm">
            ${SCALE_NAMES.map((scaleName) => renderScaleRow(scaleName))}
          </div>
        </details>

        <details>
          <summary>Semantic Role Tokens</summary>
          <div class="card stack-sm">
            ${ROLE_FAMILIES.map((family) => renderRoleTokenRow(family))}
          </div>
        </details>

        <details>
          <summary>Surface Tokens That Consume Color System Output</summary>
          <div class="card stack-sm">
            ${SURFACE_TOKENS.map((tokenName) => html`
              <div class="card flex justify-between items-center">
                <code>${tokenName}</code>
                <span>${readTokenValue(tokenName) || "not available"}</span>
              </div>
            `)}
          </div>
        </details>
      </div>
    </section>
  `,
};

export const PresetGallery = {
  name: "Preset Gallery",
  render: () => {
    const entries = sortPresetEntries(Object.entries(presets));

    return html`
      ${walkthroughStyles}
      <section class="section stack-lg">
        <header>
          <h3>Current Presets in Source</h3>
          <small class="text-muted">
            This gallery is generated from <code>Object.entries(presets)</code>, so new presets appear automatically and removed presets disappear.
          </small>
        </header>

        <div class="grid gap-md grid-auto-md">
          ${entries.map(([presetId, preset]) => {
            const paletteKeys = ["primary", "secondary", "accent", "background", "success", "warning", "danger", "info"];
            const palette = paletteKeys
              .filter((key) => typeof preset?.colors?.[key] === "string")
              .map((key) => ({ key, value: preset.colors[key] }));

            return html`
              <article class="card stack-sm">
                <header class="flex justify-between items-baseline gap-sm">
                  <h4>${preset?.name || presetId}</h4>
                  <small class="text-muted">${presetId}</small>
                </header>

                <p class="text-muted">${preset?.description || "No description provided."}</p>

                <div class="flex flex-wrap gap-sm">
                  ${(preset?.tags || []).map((tag) => html`<span class="story-colors-preset-swatch">${tag}</span>`)}
                </div>

                <small class="text-muted">Theme support: ${getThemeSupportLabel(preset)}</small>

                <div class="story-colors-preset-swatches">
                  ${palette.map(({ key, value }) => html`
                    <div
                      class="story-colors-preset-swatch"
                      style=${`--swatch-color: ${value}; --swatch-text: ${chooseReadableTextColor(value, "var(--surface-text)")}`}
                      title=${`${key}: ${value}`}
                    >
                      ${key}
                    </div>
                  `)}
                </div>
              </article>
            `;
          })}
        </div>
      </section>
    `;
  },
};

export const ProgrammaticCompiledAccess = {
  name: "Programmatic Access",
  render: () => {
    const compiled = PDS.compiled || null;
    const topLevelKeys = compiled ? Object.keys(compiled) : [];
    const colorConfig = compiled?.design?.colors || {};

    const definedSemanticSeeds = ["success", "warning", "danger", "info"].filter(
      (key) => typeof colorConfig[key] === "string" && colorConfig[key].trim().length > 0
    );

    return html`
      ${walkthroughStyles}
      <section class="section stack-lg">
        <header>
          <h3>Programmatic Access to Runtime Config</h3>
          <small class="text-muted">
            <code>PDS.compiled</code> exposes the resolved runtime configuration currently active in Storybook.
          </small>
        </header>

        <div class="grid gap-md grid-cols-3">
          <div class="card stack-xs">
            <small class="text-muted">Mode</small>
            <b>${compiled?.mode || "unknown"}</b>
            <span class="text-muted"><code>live</code> in Storybook</span>
          </div>
          <div class="card stack-xs">
            <small class="text-muted">Resolved Preset</small>
            <b>${compiled?.preset || "none"}</b>
            <span class="text-muted">From toolbar or start config</span>
          </div>
          <div class="card stack-xs">
            <small class="text-muted">Explicit Semantic Seeds</small>
            <b>${definedSemanticSeeds.length}</b>
            <span class="text-muted">success / warning / danger / info</span>
          </div>
        </div>

        <article class="card">
          <h4>Top-level Keys on <code>PDS.compiled</code></h4>
          <p><code>${topLevelKeys.join(", ") || "No data"}</code></p>
        </article>

        <article class="card">
          ${renderCodeSnippet(
            `import { PDS } from "#pds";

const snapshot = PDS.compiled;
const preset = snapshot?.preset;
const theme = snapshot?.theme;
const colors = snapshot?.design?.colors;

const primary500 = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary-500")
  .trim();

console.log({ preset, theme, primary500, colors });`
          )}
        </article>

        <article class="card">
          ${renderCodeSnippet(toPrettyJson(compiled, 1600), "json")}
        </article>
      </section>
    `;
  },
};


export const BaseVarsWithCSSFunctions = {
  name: "CSS Functions",
  render: () => html`
    ${walkthroughStyles}
    <section class="section stack-lg">
      <header>
        <h3>Extending Base Variables with CSS Functions</h3>
        <small class="text-muted">
          Start from generated base tokens, then derive contextual variants with <code>color-mix(...)</code> for subtle backgrounds, hover fills, and translucent borders.
        </small>
      </header>

      <div class="accordion">
        <details open>
          <summary><code>color-mix()</code> token blending</summary>
          <div class="card stack-md">
            <small class="text-muted">
              Blend base tokens with <code>--surface-bg</code> and tune the percentage live.
            </small>
            <div class="grid gap-md grid-auto-md">
              ${CSS_FUNCTION_SWATCHES.map((entry) => renderCssFunctionSwatch(entry))}
            </div>
            <article class="card">
              ${renderCodeSnippet(
                `.banner {
  --banner-bg: color-mix(in srgb, var(--color-info-500) 20%, var(--surface-bg));
  --banner-border: color-mix(in srgb, var(--color-info-500) 42%, var(--surface-border));

  background: var(--banner-bg);
  border: 1px solid var(--banner-border);
}`,
                "css"
              )}
            </article>
          </div>
        </details>

        <details>
          <summary><code>clamp()</code> fluid spacing and shape</summary>
          <div
            class="card stack-md"
            data-function-scope
            style="--clamp-fluid-vw: 2vw; --clamp-max-step: 6; --clamp-radius-boost: 8px;"
          >
            <div class="grid gap-sm grid-auto-sm">
              ${renderFunctionRangeControl({
                label: "Fluid vw",
                min: 0.5,
                max: 5,
                step: 0.1,
                value: 2,
                cssVar: "--clamp-fluid-vw",
                unit: "vw",
              })}
              ${renderFunctionRangeControl({
                label: "Max spacing step",
                min: 3,
                max: 10,
                step: 1,
                value: 6,
                cssVar: "--clamp-max-step",
                unit: "",
              })}
              ${renderFunctionRangeControl({
                label: "Radius boost",
                min: 0,
                max: 18,
                step: 1,
                value: 8,
                cssVar: "--clamp-radius-boost",
                unit: "px",
              })}
            </div>
            <div class="grid gap-md grid-auto-sm">
              <div class="card stack-sm story-colors-clamp-demo">
                <b>Fluid panel</b>
                <small class="text-muted">Padding and radius adapt with viewport width.</small>
              </div>
            </div>
            <article class="card">
              <pre><code class="language-css story-generated-text" data-live-snippet="clamp" data-value=${buildLiveSnippet("clamp", null)}></code></pre>
            </article>
          </div>
        </details>

        <details>
          <summary><code>min()</code> and <code>max()</code> responsive bounds</summary>
          <div
            class="card stack-md"
            data-function-scope
            style="--minmax-width-cap: 18rem; --minmax-min-height: 3.2rem; --minmax-vh-floor: 8vh;"
          >
            <div class="grid gap-sm grid-auto-sm">
              ${renderFunctionRangeControl({
                label: "Width cap",
                min: 10,
                max: 28,
                step: 1,
                value: 18,
                cssVar: "--minmax-width-cap",
                unit: "rem",
              })}
              ${renderFunctionRangeControl({
                label: "Min height",
                min: 2,
                max: 8,
                step: 0.2,
                value: 3.2,
                cssVar: "--minmax-min-height",
                unit: "rem",
              })}
              ${renderFunctionRangeControl({
                label: "Viewport floor",
                min: 3,
                max: 20,
                step: 1,
                value: 8,
                cssVar: "--minmax-vh-floor",
                unit: "vh",
              })}
            </div>
            <div class="grid gap-md grid-auto-sm">
              <div class="card border-gradient">
                <div class="story-colors-minmax-demo">bounded box</div>
                <small class="text-muted">Never wider than its cap, never shorter than its floor.</small>
              </div>
            </div>
            <article class="card">
              <pre><code class="language-css story-generated-text" data-live-snippet="minmax" data-value=${buildLiveSnippet("minmax", null)}></code></pre>
            </article>
          </div>
        </details>

        <details>
          <summary><code>calc()</code> token math</summary>
          <div
            class="card stack-md"
            data-function-scope
            style="--calc-pad-mult: 3; --calc-border-boost: 1px; --calc-radius-boost: 2px; --calc-shadow-boost: 2px;"
          >
            <div class="grid gap-sm grid-auto-sm">
              ${renderFunctionRangeControl({
                label: "Padding mult",
                min: 1,
                max: 6,
                step: 1,
                value: 3,
                cssVar: "--calc-pad-mult",
                unit: "",
              })}
              ${renderFunctionRangeControl({
                label: "Border boost",
                min: 0,
                max: 6,
                step: 1,
                value: 1,
                cssVar: "--calc-border-boost",
                unit: "px",
              })}
              ${renderFunctionRangeControl({
                label: "Radius boost",
                min: 0,
                max: 12,
                step: 1,
                value: 2,
                cssVar: "--calc-radius-boost",
                unit: "px",
              })}
              ${renderFunctionRangeControl({
                label: "Shadow boost",
                min: 0,
                max: 14,
                step: 1,
                value: 2,
                cssVar: "--calc-shadow-boost",
                unit: "px",
              })}
            </div>
            <div class="grid gap-md grid-auto-sm">
              <div class="card stack-sm story-colors-calc-demo">
                <b>Calculated shell</b>
                <small class="text-muted">Combines spacing, border and glow from design tokens.</small>
              </div>
            </div>
            <article class="card">
              <pre><code class="language-css story-generated-text" data-live-snippet="calc" data-value=${buildLiveSnippet("calc", null)}></code></pre>
            </article>
          </div>
        </details>
      </div>
    </section>
  `,
};

export const CustomPastelDerivation = {
  name: "Deriving Custom Pastels",
  render: () => {
    const pastelRows = getPastelRows();

    return html`
      ${walkthroughStyles}
      <section class="section stack-lg">
        <header>
          <h3>Pastel Variants from Current Palette</h3>
          <small class="text-muted">
            Example of deriving additional color families from your active token set without hardcoding new design seeds.
          </small>
        </header>

        ${pastelRows.length
          ? html`
              <div class="stack-sm">
                ${pastelRows.map((row) => html`
                  <article class="card stack-sm">
                    <header class="flex justify-between items-baseline gap-sm">
                      <h4>${row.family}</h4>
                      <small class="text-muted">${`${row.baseToken}: ${row.baseHex}`}</small>
                    </header>
                    <div class="grid gap-md grid-auto-md">
                      ${row.variants.map((variant) => html`
                        <div
                          class="story-colors-derived-chip"
                          style=${`--derived-color: ${variant.hex}; --derived-text: ${chooseReadableTextColor(variant.hex, "var(--surface-text)")}`}
                          title=${`${row.family} ${variant.name}: ${variant.hex}`}
                        >
                          <b>${variant.name}</b>
                          <small>${variant.hex}</small>
                        </div>
                      `)}
                    </div>
                  </article>
                `)}
              </div>
            `
          : html`<div class="callout callout-warning">Could not derive pastel variants from current runtime tokens.</div>`}

        <article class="card">
          ${renderCodeSnippet(
            `const base = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary-500")
  .trim();

const rgb = parseRgb(base);
const pastel = mix(rgb, { r: 255, g: 255, b: 255 }, 0.72);
const pastelHex = toHex(pastel);`
          )}
        </article>
      </section>
    `;
  },
};

export const ContrastAndSemanticsAudit = {
  name: "Contrast and Semantic Audit",
  render: () => {
    const checks = [
      { label: "Surface text on surface bg", fg: "--surface-text", bg: "--surface-bg", aa: 4.5 },
      { label: "Primary contrast on primary fill", fg: "--color-primary-contrast", bg: "--color-primary-fill", aa: 4.5 },
      { label: "Success contrast on success fill", fg: "--color-success-contrast", bg: "--color-success-fill", aa: 4.5 },
      { label: "Warning contrast on warning fill", fg: "--color-warning-contrast", bg: "--color-warning-fill", aa: 4.5 },
      { label: "Danger contrast on danger fill", fg: "--color-danger-contrast", bg: "--color-danger-fill", aa: 4.5 },
      { label: "Info contrast on info fill", fg: "--color-info-contrast", bg: "--color-info-fill", aa: 4.5 },
    ];

    const rows = checks.map((check) => {
      const fgRaw = readTokenValue(check.fg);
      const bgRaw = readTokenValue(check.bg);
      const fg = toRgb(fgRaw);
      const bg = toRgb(bgRaw);

      if (!fg || !bg) {
        return {
          ...check,
          ratio: Number.NaN,
          status: "fail",
          resultLabel: "missing",
          fgRaw,
          bgRaw,
        };
      }

      const ratio = contrastRatio(fg, bg);
      const status = ratio >= 7 ? "good" : ratio >= check.aa ? "warn" : "fail";
      const resultLabel = ratio >= 7 ? "AAA" : ratio >= check.aa ? "AA" : "Needs review";

      return { ...check, ratio, status, resultLabel, fgRaw, bgRaw };
    });

    return html`
      ${walkthroughStyles}
      <section class="section stack-lg">
        <header>
          <h3>Color Accessibility and Semantic Health Check</h3>
          <small class="text-muted">
            Fast audit of key foreground/background token pairs used throughout buttons, alerts, and surfaces.
          </small>
        </header>

        <table class="table-bordered">
          <thead>
            <tr>
              <th>Pair</th>
              <th>Tokens</th>
              <th>Contrast</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => html`
              <tr>
                <td>${row.label}</td>
                <td><code>${row.fg}</code> on <code>${row.bg}</code></td>
                <td>${formatRatio(row.ratio)}</td>
                <td>
                  <span class=${`badge ${toStatusBadgeClass(row.status)}`}>${row.resultLabel}</span>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </section>
    `;
  },
};
