const DEFAULT_THEMES = ["light", "dark"];
const VALID_THEMES = new Set(DEFAULT_THEMES);

export function normalizePresetThemes(preset) {
  const themes = Array.isArray(preset?.themes)
    ? preset.themes.map((theme) => String(theme).toLowerCase())
    : DEFAULT_THEMES;
  const normalized = themes.filter((theme) => VALID_THEMES.has(theme));
  return normalized.length ? normalized : DEFAULT_THEMES;
}

export function resolveThemePreference(preference, { preferDocument = true } = {}) {
  const normalized = String(preference || "").toLowerCase();
  if (VALID_THEMES.has(normalized)) return normalized;

  if (preferDocument && typeof document !== "undefined") {
    const applied = document.documentElement?.getAttribute("data-theme");
    if (VALID_THEMES.has(applied)) return applied;
  }

  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  return "light";
}

export function isPresetThemeCompatible(preset, themePreference) {
  const resolvedTheme = resolveThemePreference(themePreference);
  const themes = normalizePresetThemes(preset);
  return themes.includes(resolvedTheme);
}
