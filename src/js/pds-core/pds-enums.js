// Static enums for design system values
export const enums = {
  FontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  LineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  BorderWidths: {
    hairline: 0.5,
    thin: 1,
    medium: 2,
    thick: 3,
  },

  RadiusSizes: {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
    xxlarge: 32
  },

  ShadowDepths: {
    none: "none",
    light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    deep: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    extreme: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  TransitionSpeeds: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  AnimationEasings: {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  TouchTargetSizes: {
    compact: 36,
    standard: 44, // iOS/Android accessibility standard
    comfortable: 48,
    spacious: 56,
  },

  LinkStyles: {
    inline: "inline", // Normal inline text links
    block: "block", // Block-level links
    button: "button", // Button-like links (flex with touch target)
  },

  FocusStyles: {
    ring: "ring", // Box-shadow ring (default)
    outline: "outline", // Browser outline
    border: "border", // Border change
    glow: "glow", // Subtle glow effect
  },

  TabSizes: {
    compact: 2,
    standard: 4,
    wide: 8,
  },

  SelectIcons: {
    chevron: "chevron", // Standard chevron down
    arrow: "arrow", // Simple arrow
    caret: "caret", // Triangle caret
    none: "none", // No icon
  },
  IconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
    "2xl": 64,
    "3xl": 96,
  },
};
