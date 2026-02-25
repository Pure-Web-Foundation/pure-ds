import { html, lazyProps, ref } from "#pds/lit";
import { PDS } from "#pds";

const docsParameters = {
  description: {
    component: `Floating Action Button (FAB) with expandable satellite actions. Perfect for quick access to common actions from anywhere in your app.

### Key Features
- 📍 **Fixed Positioning** - Always accessible from bottom-right corner
- 🎯 **Smart Layout** - Automatically calculates optimal satellite positions (2-6 satellites)
- ⚡ **Smooth Animations** - Spring-based animations with cascade timing
- ♿ **Accessible** - Full keyboard navigation and ARIA support
- 🎨 **Customizable** - CSS custom properties for complete theming

### When to Use
- Mobile-first applications requiring quick actions
- Dashboard interfaces with frequent actions
- Content creation tools (compose, upload, share)
- Multi-step workflows with common entry points

### Best Practices
- Limit to 2-6 satellite actions (component enforces max 6)
- Use clear, recognizable icons for satellites
- Keep labels concise and actionable
- Consider user's thumb reach on mobile devices`,
  },
};

const threeSatellitesSource = `const satellites = [
  { key: "camera", icon: "camera", label: "Take Photo" },
  { key: "image", icon: "image", label: "Choose Image" },
  { key: "file", icon: "file", label: "Upload File" },
];

<pds-fab ${"${lazyProps({ satellites })}"}>
  <pds-icon icon="plus" size="lg"></pds-icon>
</pds-fab>`;

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-fab");
    })
    .catch((error) => {
      console.warn("storybook: docs page failed to load for pds-fab", error);
    });
}

export default {
  title: "Components/pds-fab",
  tags: ["autodocs", "fab", "floating", "action", "button", "menu"],
  parameters: {
    pds: {
      tags: [
        "fab",
        "floating-action-button",
        "menu",
        "actions",
        "pds-fab",
        "interaction",
        "mobile",
      ],
    },
    docs: docsParameters,
    layout: "padded",
  },
  argTypes: {
    radius: {
      control: { type: "range", min: 60, max: 180, step: 10 },
      description: "Distance of satellites from main FAB",
    },
    spread: {
      control: { type: "range", min: 30, max: 180, step: 15 },
      description: "Arc angle for satellite distribution",
    },
    startAngle: {
      control: { type: "range", min: 0, max: 360, step: 15 },
      description: "Starting angle (0=right, 90=down, 180=left, 270=up)",
    },
  },
};

export const NoSatellites = {
  render: () => {
    const handleClick = (event) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const isMainFab = path.some((node) => node?.classList?.contains("fab"));
      if (isMainFab) {
        console.log("Main FAB clicked (no satellites)");
        PDS.toast("Main action triggered!", { type: "info" });
      }
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>No satellites</strong> - Acts as a simple floating action
          button.
        </p>
        <p>
          Click the FAB to trigger the main action. This is useful when you have
          a single primary action.
        </p>
      </div>

      <pds-fab id="fab-no-sats" @click=${handleClick}>
        <pds-icon icon="plus" morph size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};

export const ThreeSatellites = {
  render: () => {
    const satellites = [
      { key: "camera", icon: "camera", label: "Take Photo" },
      { key: "image", icon: "image", label: "Choose Image" },
      { key: "file", icon: "file", label: "Upload File" },
    ];
    const handleSatelliteClick = (event) => {
      console.log("Satellite clicked:", event.detail);
      PDS.toast(`Action: ${event.detail.label}`, { type: "success" });
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>3 satellites</strong> - Optimal for mobile content creation
          workflows.
        </p>
        <p>
          Try clicking the FAB to expand, then click a satellite action or press
          Escape to collapse.
        </p>
      </div>

      <pds-fab
        id="fab-three"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="plus" size="lg"></pds-icon>
      </pds-fab>
    `;
  },
  parameters: {
    docs: {
      source: {
        type: "code",
        code: threeSatellitesSource,
      },
    },
  },
};

export const FiveSatellites = {
  render: () => {
    const satellites = [
      { key: "message", icon: "chat", label: "New Message" },
      { key: "call", icon: "phone", label: "Start Call" },
      { key: "video", icon: "video", label: "Video Chat" },
      { key: "email", icon: "envelope", label: "Send Email" },
      { key: "calendar", icon: "calendar", label: "Schedule Meeting" },
    ];
    const handleSatelliteClick = (event) => {
      console.log("Satellite clicked:", event.detail);
      PDS.toast(`Starting: ${event.detail.label}`, { type: "success" });
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>5 satellites</strong> - Maximum recommended for mobile UX.
        </p>
        <p>
          The component automatically calculates optimal spacing and radius for
          5 actions.
        </p>
      </div>

      <pds-fab
        id="fab-five"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="user" size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};

export const MaxSatellites = {
  render: () => {
    const satellites = [
      { key: "home", icon: "house", label: "Home" },
      { key: "search", icon: "magnifying-glass", label: "Search" },
      { key: "notifications", icon: "bell", label: "Notifications" },
      { key: "messages", icon: "chat", label: "Messages" },
      { key: "settings", icon: "gear", label: "Settings" },
      { key: "profile", icon: "user-circle", label: "Profile" },
    ];
    const handleSatelliteClick = (event) => {
      console.log("Satellite clicked:", event.detail);
      PDS.toast(`Navigate to: ${event.detail.label}`, { type: "info" });
    };

    return html`
      <div class="callout callout-warning" style="margin-bottom: 200px;">
        <p>
          <strong>6 satellites (maximum)</strong> - Consider alternative
          navigation for more actions.
        </p>
        <p>
          The component enforces a maximum of 6 satellites. More than 6 can
          overwhelm users on mobile.
        </p>
      </div>

      <pds-fab
        id="fab-max"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="list" morph size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};

export const CustomStyling = {
  render: () => {
    const satellites = [
      { key: "like", icon: "heart", label: "Like" },
      { key: "share", icon: "share", label: "Share" },
      { key: "bookmark", icon: "bookmark", label: "Bookmark" },
    ];
    const handleSatelliteClick = (event) => {
      PDS.toast(`${event.detail.label} saved!`, { type: "success" });
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>Custom styling</strong> - Use CSS custom properties to theme
          the FAB.
        </p>
        <p>This example shows a purple accent with larger satellites.</p>
      </div>

      <style>
        #fab-custom {
          --fab-bg: var(--color-accent-600);
          --fab-fg: white;
          --fab-size: 72px;
          --sat-size: 56px;
          --sat-bg: var(--color-accent-500);
          --sat-fg: white;
        }
      </style>

      <pds-fab
        id="fab-custom"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="heart" morph size="xl"></pds-icon>
      </pds-fab>
    `;
  },
};

export const WithCustomRadius = {
  render: () => {
    const satellites = [
      { key: "add", icon: "plus", label: "Add Item" },
      { key: "edit", icon: "pencil", label: "Edit" },
      { key: "delete", icon: "trash", label: "Delete" },
      { key: "share", icon: "share", label: "Share" },
    ];
    const handleSatelliteClick = (event) => {
      PDS.toast(event.detail.label, { type: "info" });
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>Custom radius</strong> - Override the auto-calculated radius.
        </p>
        <p>
          This FAB uses a larger radius (150px) to spread satellites further
          apart.
        </p>
      </div>

      <pds-fab
        id="fab-radius"
        radius="150"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="star" size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};

export const WithoutIcons = {
  render: () => {
    const satellites = [
      { key: "create", label: "Create New" },
      { key: "import", label: "Import" },
      { key: "template", label: "From Template" },
    ];
    const handleSatelliteClick = (event) => {
      PDS.toast(`Action: ${event.detail.label}`, { type: "success" });
    };

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>Text fallback</strong> - Satellites without icons show first
          letter.
        </p>
        <p>Hover over satellites to see full labels.</p>
      </div>

      <pds-fab
        id="fab-no-icons"
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="plus" size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};

export const Playground = {
  render: (args, { updateArgs } = {}) => {
    let fabEl = null;
    const setFabRef = (element) => {
      fabEl = element;
    };
    const layoutDefaults = {
      2: { radius: 80, spread: 60, startAngle: 210 },
      3: { radius: 80, spread: 90, startAngle: 180 },
      4: { radius: 120, spread: 90, startAngle: 180 },
      5: { radius: 140, spread: 90, startAngle: 180 },
      6: { radius: 170, spread: 90, startAngle: 180 },
    };

    const getSatellites = (count) => {
      const configs = {
        2: [
          { key: "add", icon: "plus", label: "Add" },
          { key: "edit", icon: "pencil", label: "Edit" },
        ],
        3: [
          { key: "add", icon: "plus", label: "Add" },
          { key: "edit", icon: "pencil", label: "Edit" },
          { key: "delete", icon: "trash", label: "Delete" },
        ],
        4: [
          { key: "add", icon: "plus", label: "Add" },
          { key: "edit", icon: "pencil", label: "Edit" },
          { key: "delete", icon: "trash", label: "Delete" },
          { key: "share", icon: "share", label: "Share" },
        ],
        5: [
          { key: "add", icon: "plus", label: "Add" },
          { key: "edit", icon: "pencil", label: "Edit" },
          { key: "delete", icon: "trash", label: "Delete" },
          { key: "share", icon: "share", label: "Share" },
          { key: "copy", icon: "copy", label: "Copy" },
        ],
        6: [
          { key: "add", icon: "plus", label: "Add" },
          { key: "edit", icon: "pencil", label: "Edit" },
          { key: "delete", icon: "trash", label: "Delete" },
          { key: "share", icon: "share", label: "Share" },
          { key: "copy", icon: "copy", label: "Copy" },
          { key: "download", icon: "download", label: "Download" },
        ],
      };

      return configs[count] || configs[4];
    };

    requestAnimationFrame(() => {
      const fab = fabEl;
      if (!fab) return;

      if (!fab.dataset.playgroundInit) {
        fab.addEventListener("satellite-click", (event) => {
          PDS.toast(`Clicked: ${event.detail.label}`, { type: "info" });
        });

        const group = document.querySelector("#fab-count-group");
        group?.addEventListener("change", (event) => {
          const target = event.target;
          if (target?.name === "fab-count") {
            const count = Number(target.value);
            fab.satellites = getSatellites(count);

            const defaults = layoutDefaults[count];
            if (defaults) {
              updateArgs?.(defaults);
              fab.setAttribute("radius", String(defaults.radius));
              fab.setAttribute("spread", String(defaults.spread));
              fab.setAttribute("start-angle", String(defaults.startAngle));
            }
          }
        });

        fab.dataset.playgroundInit = "true";
      }

      fab.setAttribute("radius", String(args.radius));
      fab.setAttribute("spread", String(args.spread));
      fab.setAttribute("start-angle", String(args.startAngle));
    });

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>Interactive playground</strong> - Use the controls below to
          adjust FAB properties.
        </p>
        <p>Pick a satellite count to tune layout settings.</p>
        <ul>
          <li>
            <strong>Radius:</strong> Distance of satellites from main button
          </li>
          <li>
            <strong>Spread:</strong> Arc angle (degrees) for satellite
            distribution
          </li>
          <li>
            <strong>Start Angle:</strong> Direction where satellites begin
            (0°=right, 90°=down, 180°=left, 270°=up)
          </li>
        </ul>
      </div>

      <fieldset id="fab-count-group" role="radiogroup" class="buttons" style="margin-bottom: 200px;">
        <label>
          <input type="radio" name="fab-count" value="2" />
          <span data-label>2 Satellites</span>
        </label>
        <label>
          <input type="radio" name="fab-count" value="3" />
          <span data-label>3 Satellites</span>
        </label>
        <label>
          <input type="radio" name="fab-count" value="4" checked />
          <span data-label>4 Satellites</span>
        </label>
        <label>
          <input type="radio" name="fab-count" value="5" />
          <span data-label>5 Satellites</span>
        </label>
        <label>
          <input type="radio" name="fab-count" value="6" />
          <span data-label>6 Satellites</span>
        </label>
      </fieldset>

      <pds-fab
        id="fab-playground"
        radius="${args.radius}"
        spread="${args.spread}"
        start-angle="${args.startAngle}"
        ${ref(setFabRef)}
        ${lazyProps({ satellites: getSatellites(4) })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
      >
        <pds-icon icon="gear" morph size="lg"></pds-icon>
      </pds-fab>
    `;
  },
  args: {
    radius: 100,
    spread: 90,
    startAngle: 180,
  },
};

export const ProgrammaticControl = {
  render: () => {
    let fabEl = null;
    const setFabRef = (element) => {
      fabEl = element;
    };
    const satellites = [
      { key: "edit", icon: "pencil", label: "Edit" },
      { key: "share", icon: "share", label: "Share" },
      { key: "delete", icon: "trash", label: "Delete" },
    ];
    const handleSatelliteClick = (event) => {
      PDS.toast(`Action: ${event.detail.label}`, { type: "info" });
    };

    requestAnimationFrame(() => {
      const fab = fabEl;
      if (!fab || fab.dataset.programmaticInit) return;

      const openBtn = document.querySelector("#open-fab-btn");
      const closeBtn = document.querySelector("#close-fab-btn");
      const toggleBtn = document.querySelector("#toggle-fab-btn");
      const add2Btn = document.querySelector("#add-2-sats");
      const add4Btn = document.querySelector("#add-4-sats");
      const add6Btn = document.querySelector("#add-6-sats");

      openBtn?.addEventListener("click", () => {
        fab.open = true;
      });

      closeBtn?.addEventListener("click", () => {
        fab.open = false;
      });

      toggleBtn?.addEventListener("click", () => {
        const shouldOpen = !fab.open;
        setTimeout(() => {
          fab.open = shouldOpen;
        }, 0);
      });

      add2Btn?.addEventListener("click", () => {
        fab.satellites = [
          { key: "save", icon: "floppy-disk", label: "Save" },
          { key: "cancel", icon: "x", label: "Cancel" },
        ];
      });

      add4Btn?.addEventListener("click", () => {
        fab.satellites = [
          { key: "edit", icon: "pencil", label: "Edit" },
          { key: "duplicate", icon: "copy", label: "Duplicate" },
          { key: "share", icon: "share", label: "Share" },
          { key: "delete", icon: "trash", label: "Delete" },
        ];
      });

      add6Btn?.addEventListener("click", () => {
        fab.satellites = [
          { key: "home", icon: "house", label: "Home" },
          { key: "search", icon: "magnifying-glass", label: "Search" },
          { key: "add", icon: "plus", label: "Add" },
          { key: "notifications", icon: "bell", label: "Alerts" },
          { key: "settings", icon: "gear", label: "Settings" },
          { key: "profile", icon: "user", label: "Profile" },
        ];
      });

      fab.dataset.programmaticInit = "true";
    });

    return html`
      <div class="callout callout-info" style="margin-bottom: 200px;">
        <p>
          <strong>Programmatic control</strong> - Control the FAB via JavaScript
          API.
        </p>
        <p>
          Try the buttons below to control the FAB state and satellite count.
        </p>
      </div>

      <div class="stack-md" style="margin-bottom: 200px;">
        <div class="flex gap-sm">
          <button id="open-fab-btn" class="btn-primary">
            <pds-icon icon="arrow-up-right" size="sm"></pds-icon>
            Open FAB
          </button>
          <button id="close-fab-btn" class="btn-secondary">
            <pds-icon icon="arrow-down-right" size="sm"></pds-icon>
            Close FAB
          </button>
          <button id="toggle-fab-btn" class="btn-outline" data-fab-ignore-outside>
            <pds-icon icon="arrows-clockwise" size="sm"></pds-icon>
            Toggle FAB
          </button>
        </div>

        <hr />

        <div class="flex gap-sm">
          <button id="add-2-sats" class="btn-outline">2 Satellites</button>
          <button id="add-4-sats" class="btn-outline">4 Satellites</button>
          <button id="add-6-sats" class="btn-outline">6 Satellites</button>
        </div>

        <pre class="card surface-sunken p-md"><code>// Open programmatically
fab.open = true;

// Set satellites
fab.satellites = [
  { key: 'edit', icon: 'pencil', label: 'Edit' },
  { key: 'share', icon: 'share', label: 'Share' }
];

// Listen for clicks
fab.addEventListener('satellite-click', (e) => {
  console.log('Clicked:', e.detail.key);
});</code></pre>
      </div>

      <pds-fab
        id="fab-programmatic"
        ${ref(setFabRef)}
        ${lazyProps({ satellites })}
        data-satellites-source=${"${lazyProps({ satellites })}"}
        @satellite-click=${handleSatelliteClick}
      >
        <pds-icon icon="sparkle" morph size="lg"></pds-icon>
      </pds-fab>
    `;
  },
};
