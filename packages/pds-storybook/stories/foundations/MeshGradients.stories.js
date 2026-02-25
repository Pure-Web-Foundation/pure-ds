import { html } from "#pds/lit";
import { highlight, getCurrentTheme, preloadShiki } from "../utils/shiki.js";

// Pre-load Shiki
preloadShiki();

// Minimal story-specific styles - most layout handled by PDS classes
const meshGradientsStoryStyles = html`
  <style>
    .story-mesh-demo {
      border: 1px solid var(--color-border);

      &.card { min-height: 12.5rem; }
    }
    .story-variable-list {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: var(--spacing-2) 0;
        border-bottom: 1px solid var(--color-border);
        &:last-child { border-bottom: 0; }
      }
    }
  </style>
`;

const featuredMeshCards = [
  {
    key: "mesh-01",
    title: "Mesh 01",
    description: "Subtle radial blend",
  },
  {
    key: "mesh-02",
    title: "Mesh 02",
    description: "Corner accents",
  },
];

const meshTileBackgrounds = ["mesh-03", "mesh-04", "mesh-05"];

const meshVariableList = [
  "mesh-01",
  "mesh-02",
  "mesh-03",
  "mesh-04",
  "mesh-05",
];

export default {
  title: "Foundations/Mesh Gradients",
  tags: ["mesh", "gradient", "background", "effect", "decoration"],
  parameters: {
    pds: {
      tags: [
        "mesh",
        "gradient",
        "background",
        "effect",
        "decoration",
        "colors",
        "theming",
      ],
    },
    docs: {
      description: {
        component:
          "Beautiful mesh gradient backgrounds generated from your color palette. Automatically adapts to light and dark modes with 5 different variations.",
      },
    },
  },
};

export const AllMeshGradients = () => html`
  ${meshGradientsStoryStyles}
  <section class="stack gap-lg">
    <header>
      <h2>Mesh Gradient Backgrounds</h2>
      <small class="text-muted">
        Subtle, beautiful mesh gradient backgrounds using
        <code>--background-mesh-01</code> through
        <code>--background-mesh-05</code>. Toggle dark mode to see automatic
        adaptation.
      </small>
    </header>
    <div class="stack-lg">
      <div class="grid grid-auto-md gap-lg">
        ${featuredMeshCards.map(
          ({ key, title, description }) => html`
            <div
              class="card radius-lg flex items-center justify-center story-mesh-demo"
              style="background: var(--background-${key});"
            >
              <div class="card surface-base shadow-md stack gap-xs text-center">
                <h4>${title}</h4>
                <p class="text-muted">${description}</p>
              </div>
            </div>
          `
        )}
      </div>
      <div class="flex gap-md">
        ${meshTileBackgrounds.map(
          (meshKey) => html`
            <div
              class="card stack-sm text-center"
              style="background: var(--background-${meshKey});"
            >
              <pds-icon icon="sparkle" size="xl"></pds-icon>
              <code>${meshKey}</code>
            </div>
          `
        )}
      </div>
    </div>
  </section>
`;

AllMeshGradients.storyName = "All Mesh Gradients";

export const MeshUsageExamples = () => html`
  ${meshGradientsStoryStyles}
  <section class="stack gap-lg">
    <h2>Usage Examples</h2>

    <h3>Hero Section</h3>
    <div
      class="card radius-lg text-center story-mesh-demo"
      style="background: var(--background-mesh-01);"
    >
      <h1>Welcome to Pure Design System</h1>
      <p>Beautiful backgrounds generated from your color palette</p>
      <nav class="flex justify-center gap-sm">
        <button class="btn-primary btn-lg">Get Started</button>
        <button class="btn-secondary btn-lg">Learn More</button>
      </nav>
    </div>

    <h3>Card with Mesh Background</h3>
    <div
      class="card radius-lg story-mesh-demo"
      style="background: var(--background-mesh-03);"
    >
      <article class="card surface-elevated max-w-md">
        <h4>Layered Design</h4>
        <p>
          Mesh gradients work beautifully as backgrounds with overlaid content
          using surface tokens.
        </p>
        <nav>
          <a href="#" class="btn btn-primary">
            <pds-icon icon="rocket"></pds-icon>
            Take Action
          </a>
        </nav>
      </article>
    </div>

    <h3>Grid Layout with Mesh</h3>
    <div
      class="card radius-lg story-mesh-demo"
      style="background: var(--background-mesh-05);"
    >
      <div class="grid grid-cols-3 gap-md">
        ${Array.from(
          { length: 3 },
          (_, index) => html`
            <div class="card surface-translucent-75 text-center">
              <pds-icon icon="star" size="xl" class="icon-accent"></pds-icon>
              <h5>Feature ${index + 1}</h5>
              <p>
                Mesh backgrounds create visual interest without overwhelming
                content
              </p>
            </div>
          `
        )}
      </div>
    </div>
  </section>
`;

MeshUsageExamples.storyName = "Usage Examples";

export const CodeSamples = () => {
  const container = document.createElement("section");
  container.className = "stack gap-lg";

  const cssCode = `/* Use CSS custom properties */
.hero-section {
  background: var(--background-mesh-01);
}

/* Combine with surface colors */
.card {
  background: var(--background-mesh-03);
  backdrop-filter: blur(10px);
}

/* Layer over solid colors */
.container {
  background-color: var(--color-surface-base);
  background-image: var(--background-mesh-02);
}`;

  const variablesList = meshVariableList
    .map((key) => `<li><code>--background-${key}</code></li>`)
    .join("\n      ");

  container.innerHTML = /*html*/ `
    ${meshGradientsStoryStyles.strings[0]}
    <h2>Code Samples</h2>

    <h3>Apply as Background</h3>
    <div class="code-css"></div>

    <h3>Available Variables</h3>
    <ul class="story-variable-list">
      ${variablesList}
    </ul>
  `;

  const theme = getCurrentTheme();

  highlight(cssCode, "css", theme).then((h) => {
    container.querySelector(".code-css").innerHTML = h;
  });

  return container;
};

CodeSamples.storyName = "Code Samples";
