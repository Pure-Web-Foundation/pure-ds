import { html } from 'lit';
import { storyLinkHandler } from '../utils/navigation.js';
import { createComponentDocsPage } from '../reference/reference-docs.js';

const componentDescription = `The \`<pds-icon>\` web component renders SVG icons from a sprite sheet with automatic fallbacks.

👉 See **[Foundations / Icons / Overview](?path=/story/foundations-icons--overview)** for complete documentation.

---

## Quick Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| \`icon\` | string | \`"missing"\` | Icon name from sprite |
| \`size\` | string | \`"md"\` | Size: \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`2xl\` |
| \`color\` | string | \`currentColor\` | Icon color (CSS value or token) |
| \`label\` | string | — | Accessible label (adds \`role="img"\`) |
| \`rotate\` | number | \`0\` | Rotation in degrees |
| \`sprite\` | string | — | Override sprite sheet path |
| \`no-sprite\` | boolean | \`false\` | Force fallback rendering |

---

## Basic Usage

\`\`\`html
<pds-icon icon="heart"></pds-icon>
<pds-icon icon="star" size="lg" color="var(--color-warning-text)"></pds-icon>
<pds-icon icon="check" color="var(--color-success-text)"></pds-icon>
\`\`\`

---

## Shadow Parts

Style internals from outside the shadow root using \`::part()\`:

| Part | Description |
|------|-------------|
| \`stack\` | Wrapper span that layers the two SVGs |
| \`icon-old\` | Outgoing SVG layer (used during transitions) |
| \`icon-new\` | Incoming SVG layer (current icon) |
| \`group-old\` | Inner \`<g>\` of the outgoing layer |
| \`group-new\` | Inner \`<g>\` of the incoming layer |

\`\`\`css
/* Change stroke color — icons use stroke:currentColor */
pds-icon.my-icon::part(icon-new) {
  color: var(--color-accent);
}
/* Drop shadow on the wrapper span to avoid SVG viewBox clipping */
pds-icon.my-icon::part(stack) {
  display: inline-block;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
}
/* Flip an arrow icon */
pds-icon.my-icon::part(stack) {
  display: inline-block;
  transform: rotate(180deg);
}
\`\`\`
> **Tip:** Phosphor icons use \`stroke: currentColor\`, not \`fill\`. Use \`color\` on \`::part(icon-new)\` for stroke color, and \`filter\`/\`transform\` on \`::part(stack)\` for shadow and rotation.
`;

const docsParameters = {
  description: {
    component: componentDescription
  },
  page: createComponentDocsPage('pds-icon')
};

export default {
  title: 'Components/pds-icon',
  tags: ['autodocs', 'icon', 'icons', 'svg', 'sprite', 'phosphor', 'graphic', 'symbol'],
  parameters: {
    pds: {
      tags: ['icon', 'icons', 'svg', 'sprite', 'phosphor', 'graphic', 'symbol', 'pds-icon']
    },
    docs: docsParameters
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from sprite'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Named size'
    },
    color: {
      control: 'color',
      description: 'Icon color'
    },
    label: {
      control: 'text',
      description: 'Accessible label'
    },
    rotate: {
      control: 'number',
      description: 'Rotation angle in degrees'
    }
  }
};

// ─── FontAwesome CDN fallback handler ─────────────────────────────────────

const FA_CDN_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';

function handleFaFallback(e) {
  e.preventDefault();
  if (!document.querySelector('link[data-pds-fa-cdn]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-pds-fa-cdn', '');
    link.href = FA_CDN_HREF;
    document.head.appendChild(link);
  }
  const pdsIcon = e.detail.element;
  [...pdsIcon.children].filter(n => n.slot === 'fallback').forEach(n => n.remove());
  const i = document.createElement('i');
  i.slot = 'fallback';
  i.className = `fa-solid fa-${e.detail.icon}`;
  pdsIcon.appendChild(i);
}

export const Default = {
  name: 'Interactive Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to explore icon attributes.'
      }
    }
  },
  render: (args) => html`
    <div class="stack-lg">
      <div class="callout callout-info">
        <span class="callout-icon">
          <pds-icon icon="info" size="md"></pds-icon>
        </span>
        <div class="stack-xs">
          <strong class="callout-title">
            <a href="/?path=/story/foundations-icons" @click=${storyLinkHandler('foundations-icons--overview')}>
              Icon System
            </a>
          </strong>
          <div>
            <a href="/?path=/story/foundations-icons" @click=${storyLinkHandler('foundations-icons--overview')}>
              Complete icon system documentation: available icons, sizes, colors, configuration, and more.
            </a>
          </div>
        </div>
      </div>
      
      <pds-icon 
        icon="${args.icon}" 
        size="${args.size}"
        color="${args.color}"
        label="${args.label || ''}"
        rotate="${args.rotate || 0}">
      </pds-icon>
    </div>
  `,
  args: {
    icon: 'heart',
    size: 'lg',
    color: 'currentColor',
    label: '',
    rotate: 0
  }
};

/**
 * `pds-icon` exposes five shadow parts for external CSS customization via `::part()`.
 * This story demonstrates coloring each layer independently and adding a drop shadow.
 */
export const ShadowParts = {
  name: 'Shadow Parts (::part())',
  parameters: {
    docs: {
      description: {
        story: `
\`pds-icon\` exposes five shadow parts you can target with \`::part()\` from outside the shadow root.

| Part | Description |
|------|-------------|
| \`stack\` | Wrapper span that layers the two SVGs |
| \`icon-old\` | Outgoing SVG layer |
| \`icon-new\` | Incoming SVG layer (current icon) |
| \`group-old\` | Inner \`<g>\` of the outgoing layer |
| \`group-new\` | Inner \`<g>\` of the incoming layer |

> **Note:** Phosphor icons use \`stroke: currentColor\`. Set \`color\` on \`::part(icon-new)\`
> to change the stroke color. Apply \`filter: drop-shadow()\` to \`::part(stack)\`
> (not \`::part(icon-new)\`) to avoid SVG viewBox clipping of the shadow.

\`\`\`css
/* Change stroke color — icons use stroke:currentColor */
pds-icon::part(icon-new) {
  color: var(--color-accent);
}

/* Drop shadow on the wrapper span to avoid SVG viewBox clipping */
pds-icon::part(stack) {
  display: inline-block;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
}

/* Flip an arrow icon 180° */
pds-icon::part(stack) {
  display: inline-block;
  transform: rotate(180deg);
}
\`\`\`
        `
      }
    }
  },
  render: () => html`
    <style>
      /* Phosphor icons use stroke:currentColor — set 'color' to change the stroke */
      .icon-parts-color::part(icon-new) {
        color: var(--color-accent, hotpink);
      }
      /* Apply drop-shadow to ::part(stack) (the wrapper span) to avoid SVG viewBox clipping */
      .icon-parts-shadow::part(stack) {
        display: inline-block;
        filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.55));
      }
      .icon-parts-rotated::part(stack) {
        display: inline-block;
        transform: rotate(180deg);
      }
    </style>
    <div class="flex gap-xl align-items-center flex-wrap">
      <div class="stack-xs text-center">
        <pds-icon class="icon-parts-color" icon="heart" size="xl"></pds-icon>
        <p class="text-muted">accent color via <code>color</code> property</p>
        <code>::part(icon-new)</code>
      </div>
      <div class="stack-xs text-center">
        <pds-icon class="icon-parts-shadow" icon="star" size="xl"></pds-icon>
        <p class="text-muted">drop shadow via <code>filter</code> on the stack wrapper</p>
        <code>::part(stack)</code>
      </div>
      <div class="stack-xs text-center">
        <pds-icon class="icon-parts-rotated" icon="arrow-right" size="xl"></pds-icon>
        <p class="text-muted">flipped 180° → arrow-left via <code>transform</code></p>
        <code>::part(stack)</code>
      </div>
    </div>
  `
};

/**
 * When `pds-icon` cannot find the requested icon in the sprite sheet it fires
 * an **`icon-not-found`** event (`bubbles: true`, `composed: true`, `cancelable: true`).
 *
 * Calling `event.preventDefault()` suppresses the built-in "missing" circle
 * placeholder. You can then append any element with `slot="fallback"` to the
 * `pds-icon` and it will be rendered in its place.
 *
 * This story loads Font Awesome 6 from a CDN and maps unknown icon names to
 * FA solid icons.
 *
 * ```js
 * // One-time: load FA CSS
 * const link = document.createElement('link');
 * link.rel = 'stylesheet';
 * link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
 * document.head.appendChild(link);
 *
 * // Listen — works across any shadow-DOM boundary because the event is composed
 * container.addEventListener('icon-not-found', (e) => {
 *   e.preventDefault();                        // suppress built-in placeholder
 *   const i = document.createElement('i');
 *   i.slot = 'fallback';                       // targets <slot name="fallback">
 *   i.className = `fa-solid fa-${e.detail.icon}`;
 *   e.detail.element.appendChild(i);           // e.detail.element = the pds-icon
 * });
 * ```
 *
 * > **Note** — Use `e.detail.element` rather than `e.target`: because the event
 * > is `composed`, `e.target` gets retargeted to the nearest shadow host when
 * > observed from outside a shadow boundary.
 */
export const FontAwesomeFallback = {
  name: 'CDN Fallback (Font Awesome)',
  parameters: {
    docs: {
      description: {
        story: `
\`pds-icon\` fires **\`icon-not-found\`** (bubbling, composed, cancelable) when an icon
is absent from the sprite sheet. Call \`event.preventDefault()\` to suppress the
built-in placeholder, then inject any element into \`<slot name="fallback">\` on
\`event.detail.element\`.

\`\`\`js
container.addEventListener('icon-not-found', (e) => {
  e.preventDefault();
  const i = document.createElement('i');
  i.slot = 'fallback';
  i.className = \`fa-solid fa-\${e.detail.icon}\`;
  e.detail.element.appendChild(i);
});
\`\`\`

> **Tip**: Load your CDN stylesheet once in the handler (guard with \`document.querySelector('link[data-...]')\`)
> so repeated events don't create duplicate \`<link>\` tags.
        `
      }
    }
  },
  render: () => html`
    <div class="stack-md" @icon-not-found=${handleFaFallback}>
      <p class="text-muted">
        The icons below are <strong>not</strong> in the PDS sprite sheet.
        The <code>icon-not-found</code> event fires and this demo loads them
        from Font Awesome 6 via CDN.
      </p>
      <div class="flex gap-md align-items-center flex-wrap">
        <pds-icon icon="mug-hot" size="lg" label="Coffee"></pds-icon>
        <pds-icon icon="rocket" size="lg" label="Rocket"></pds-icon>
        <pds-icon icon="dragon" size="lg" label="Dragon"></pds-icon>
        <pds-icon icon="shield-halved" size="lg" label="Shield"></pds-icon>
        <pds-icon icon="person-running" size="lg" label="Running"></pds-icon>
        <pds-icon icon="pizza-slice" size="lg" label="Pizza"></pds-icon>
      </div>
      <p class="text-muted" style="font-size: var(--text-sm)">
        <em>If icons above show as placeholders, Font Awesome may be blocked
        by a network policy or ad blocker.</em>
      </p>
    </div>
  `
};
