import { html } from 'lit';

const toRgb = (raw) => {
  if (!raw) {
    return null;
  }

  const value = raw.trim();

  if (!value) {
    return null;
  }

  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((ch) => ch + ch)
        .join('');
    }

    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }

    const intVal = parseInt(hex, 16);
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255
    };
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(',')
      .map((part) => part.trim())
      .map((part) => (part.endsWith('%') ? (255 * parseFloat(part)) / 100 : parseFloat(part)));

    if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) {
      return null;
    }

    return {
      r: Math.max(0, Math.min(255, parts[0])),
      g: Math.max(0, Math.min(255, parts[1])),
      b: Math.max(0, Math.min(255, parts[2]))
    };
  }

  return null;
};

const toRelativeLuminance = ({ r, g, b }) => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  const rLin = channel(r);
  const gLin = channel(g);
  const bLin = channel(b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
};

const contrastRatio = (a, b) => {
  const l1 = toRelativeLuminance(a);
  const l2 = toRelativeLuminance(b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Prefers the highest-contrast candidate for each swatch at runtime.
const chooseReadableTextColor = (colorName, shade, fallback) => {
  if (typeof window === 'undefined' || !window.getComputedStyle) {
    return fallback;
  }

  const style = window.getComputedStyle(document.documentElement);
  const backgroundValue = style.getPropertyValue(`--color-${colorName}-${shade}`);
  const background = toRgb(backgroundValue);

  if (!background) {
    return fallback;
  }

  const candidateSources = [
    '--surface-inverse-text',
    '--surface-text',
    `--color-${colorName}-900`,
    `--color-${colorName}-50`,
    '#ffffff',
    '#000000'
  ];

  let best = { value: fallback, ratio: 0 };

  for (const source of candidateSources) {
    let raw = source;

    if (source.startsWith('--')) {
      raw = style.getPropertyValue(source);
    }

    const rgb = toRgb(raw);

    if (!rgb) {
      continue;
    }

    const ratio = contrastRatio(background, rgb);

    if (ratio > best.ratio) {
      best = { value: `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`, ratio };
    }
  }

  return best.value || fallback;
};

export default {
  title: 'Foundations/Colors',
  tags: ['color', 'colors', 'primary', 'secondary', 'accent', 'semantic', 'palette', 'tokens'],
  parameters: {
    pds: {
      tags: ['color', 'colors', 'primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info', 'neutral', 'gray', 'semantic', 'palette', 'tokens', 'theming']
    },
    docs: {
      description: {
        component: 'Design tokens - colors, typography, spacing, icons'
      }
    }
  },
  argTypes: {
  preset: {
    control: 'select',
    options: ['default', 'ocean-breeze', 'midnight-steel', 'sunset-vibes', 'forest-calm', 'lavender-dream'],
    description: 'Choose a design preset'
  },
  primaryColor: {
    control: 'color',
    description: 'Override primary color'
  },
  secondaryColor: {
    control: 'color',
    description: 'Override secondary color'
  }
  }
};

const colorNames = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'danger',
  'info'
];

const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800];

const getFallbackTextColor = (color, shade) =>
  shade >= 400
    ? 'var(--surface-inverse-text, #ffffff)'
    : `var(--color-${color}-900)`;

const colorScaleStoryStyles = html`
  <style>
    .color-scale-story-container {
      padding: var(--spacing-8);
    }
    .color-scale-container {
      margin-bottom: var(--spacing-8);
    }
    .color-scale-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }
    .color-scale-label {
      width: 7.5rem;
      font-weight: 600;
    }
    .color-scale-swatches {
      display: flex;
      flex: 1;
    }
    .color-scale-swatch {
      flex: 1;
      min-height: 3.75rem;
      padding: var(--spacing-4);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
    .color-scale-swatch--hover {
      transform: translateY(-0.25rem);
      z-index: 10;
      box-shadow: var(--shadow-md);
    }
    ${colorNames
      .map((color) =>
        colorShades
          .map((shade) => {
            const textColor = getFallbackTextColor(color, shade);
            return `
              .color-scale-swatch[data-color="${color}"][data-shade="${shade}"] {
                background: var(--color-${color}-${shade});
                color: ${textColor};
              }
            `;
          })
          .join('\n')
      )
      .join('\n')}
  </style>
`;

const handleSwatchHoverEnter = (event) => {
  event.currentTarget.classList.add('color-scale-swatch--hover');
};

const handleSwatchHoverLeave = (event) => {
  event.currentTarget.classList.remove('color-scale-swatch--hover');
};

const renderColorScale = (colorName) => html`
  <div class="color-scale-container">
    <div class="color-scale-row">
      <div class="color-scale-label">${colorName}</div>
      <div class="color-scale-swatches">
        ${colorShades.map(
          (shade) => html`
            <div
              class="color-scale-swatch"
              data-color=${colorName}
              data-shade=${shade}
              style=${`color: ${chooseReadableTextColor(colorName, shade, getFallbackTextColor(colorName, shade))}`}
              @mouseover=${handleSwatchHoverEnter}
              @mouseout=${handleSwatchHoverLeave}
              title="${colorName}-${shade}"
            >
              ${shade}
            </div>
          `
        )}
      </div>
    </div>
  </div>
`;

export const Default = {
  render: (args) => {
    return html`
      ${colorScaleStoryStyles}
      <div class="story-container color-scale-story-container">
        <h2>Color Scales</h2>
        ${renderColorScale('primary')}
        ${renderColorScale('secondary')}
        ${renderColorScale('accent')}
        ${renderColorScale('success')}
        ${renderColorScale('warning')}
        ${renderColorScale('danger')}
        ${renderColorScale('info')}
      </div>
    `;
  },
  args: {
    preset: 'default'
  }
};
