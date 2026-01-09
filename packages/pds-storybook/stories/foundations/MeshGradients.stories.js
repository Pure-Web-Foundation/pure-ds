import { html } from "lit";
import { highlight, getCurrentTheme, preloadShiki } from "../utils/shiki.js";

// Pre-load Shiki
preloadShiki();

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
      <div
        class="grid gap-lg"
        style="grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));"
      >
        ${featuredMeshCards.map(
          ({ key, title, description }) => html`
            <div
              class="relative p-6 flex items-center justify-center rounded-lg border border-border"
              style="min-height: 12.5rem; background: var(--background-${key});"
            >
              <div
                class="card surface-base p-4 rounded-md shadow-md text-center stack gap-2"
              >
                <h4 class="m-0">${title}</h4>
                <p class="m-0 text-muted">${description}</p>
              </div>
            </div>
          `
        )}
      </div>
      <div
        class="grid gap-md"
        style="grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));"
      >
        ${meshTileBackgrounds.map(
          (meshKey) => html`
            <div
              class="relative p-5 flex flex-col items-center justify-center text-center rounded-md border border-border"
              style="min-height: 9.375rem; background: var(--background-${meshKey});"
            >
              <pds-icon
                icon="sparkle"
                size="xl"
                class="opacity-90 mb-2"
              ></pds-icon>
              <code class="text-xs">${meshKey}</code>
            </div>
          `
        )}
      </div>
    </div>
  </section>
`;

AllMeshGradients.storyName = "All Mesh Gradients";

export const MeshUsageExamples = () => html`
  <section class="stack gap-lg p-4">
    <h2>Usage Examples</h2>

    <h3>Hero Section</h3>
    <div
      class="rounded-lg border border-border p-8 text-center"
      style="background: var(--background-mesh-01);"
    >
      <h1>Welcome to Pure Design System</h1>
      <p class="text-lg mt-3">
        Beautiful backgrounds generated from your color palette
      </p>
      <div class="flex justify-center gap-3 mt-4">
        <button class="btn-primary btn-lg">Get Started</button>
        <button class="btn-secondary btn-lg">Learn More</button>
      </div>
    </div>

    <h3>Card with Mesh Background</h3>
    <div
      class="rounded-lg border border-border p-6"
      style="background: var(--background-mesh-03);"
    >
      <div class="card surface-elevated p-6 max-w-md">
        <h4>Layered Design</h4>
        <p>
          Mesh gradients work beautifully as backgrounds with overlaid content
          using surface tokens.
        </p>
        <button class="btn-primary mt-3">
          <pds-icon icon="rocket"></pds-icon>
          Take Action
        </button>
      </div>
    </div>

    <h3>Grid Layout with Mesh</h3>
    <div
      class="rounded-lg border border-border p-6"
      style="background: var(--background-mesh-05);"
    >
      <div class="grid grid-cols-3 gap-md">
        ${Array.from(
          { length: 3 },
          (_, index) => html`
            <div class="card surface-base p-5 text-center">
              <pds-icon icon="star" size="xl" class="icon-accent"></pds-icon>
              <h5 class="mt-2">Feature ${index + 1}</h5>
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
  container.className = "stack gap-lg p-4";

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
    .map(
      (key) =>
        `<li class="py-2 border-b border-b-border last:border-b-0"><code>--background-${key}</code></li>`
    )
    .join("\n      ");

  container.innerHTML = /*html*/ `
    <h2>Code Samples</h2>

    <h3>Apply as Background</h3>
    <div class="code-css"></div>

    <h3>Available Variables</h3>
    <ul class="list-none m-0 p-0">
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
