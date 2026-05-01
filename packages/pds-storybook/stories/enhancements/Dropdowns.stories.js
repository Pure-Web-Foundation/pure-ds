import { html } from "#pds/lit";
import { enhancementHeader } from './_enhancement-header.js';

// Story-specific styles for dropdown demos
const dropdownStoryStyles = html`
  <style>
    .story-dropdown-container {
      height: 260px;
    }
    .story-glass-demo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: var(--spacing-8);
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    .story-glass-demo-travel {
      background-image: url('https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80');
    }
    .story-corner-nav {
      position: fixed;
      z-index: var(--z-dropdown, 1050);
    }
    .story-corner-nav.top-left {
      top: 10px;
      left: 10px;
    }
    .story-corner-nav.top-right {
      top: 10px;
      right: 10px;
    }
    .story-corner-nav.bottom-left {
      bottom: 10px;
      left: 10px;
    }
    .story-corner-nav.bottom-right {
      bottom: 10px;
      right: 10px;
    }

    
  </style>
`;

const facetedSearchStoryStyles = html`
  <style>
    [data-faceted-story] {
      position: relative;
      z-index: 40;
      width: min(100%, 68rem);
      padding: var(--spacing-6) var(--spacing-5);
      border: 1px solid var(--color-border);
      background-color: var(--color-surface-subtle);
    }

    [data-faceted-story] [data-facet-heading] {
      margin: 0 0 var(--spacing-2) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    [data-faceted-story] [data-facet-intro] {
      margin: 0 0 var(--spacing-4) 0;
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }

    [data-faceted-story] [data-facet-bar] {
      position: relative;
      z-index: 40;
      overflow: visible;
      padding-top: var(--spacing-xs, 0.4rem);
    }

    [data-faceted-story] [data-facet-row] {
      display: flex;
      align-items: stretch;
      flex-wrap: nowrap;
      gap: var(--spacing-sm, 0.5rem);
      overflow: visible;
      padding-bottom: var(--spacing-2);
      row-gap: var(--spacing-2xs, 0.2rem);
    }

    [data-faceted-story] [data-subfacets] {
      display: flex;
      flex-wrap: nowrap;
      gap: var(--spacing-xs, 0.4rem);
      align-items: stretch;
      opacity: 0;
      transform: translateY(var(--spacing-2xs, 0.2rem));
      pointer-events: none;
      transition: opacity 180ms ease 90ms, transform 180ms ease 90ms;
    }

    [data-faceted-story][data-subfacets-ready] [data-subfacets] {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    [data-faceted-story] [data-facet-group] {
      --facet-accent: var(--color-primary-500);
      position: relative;
      display: inline-flex;
      min-inline-size: 0;
    }

    [data-faceted-story] [data-facet-group][data-group-key="meal-type"] {
      --facet-accent: var(--color-info-500);
    }

    [data-faceted-story] [data-facet-group][data-group-key="diet"] {
      --facet-accent: var(--color-success-500);
    }

    [data-faceted-story] [data-facet-group][data-group-key="allergies"] {
      --facet-accent: var(--color-warning-500);
    }

    [data-faceted-story] [data-facet-group][data-open="true"] {
      z-index: 60;
    }

    [data-faceted-story] [data-facet-toggle] {
      width: auto;
      justify-content: space-between;
      display: inline-flex;
      gap: var(--spacing-2xs, 0.2rem);
      align-items: center;
      text-align: left;
      border-color: color-mix(in oklab, var(--facet-accent) 52%, var(--color-border));
      background: color-mix(in oklab, var(--facet-accent) 8%, var(--color-surface-base));
      color: var(--color-text-primary);
      max-width: 100%;
      min-height: 2.25rem;
      line-height: unset;
    }

    [data-faceted-story] [data-facet-group][data-open="true"] [data-facet-toggle] {
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--facet-accent) 56%, transparent);
    }

    [data-faceted-story] [data-facet-summary] {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-3xs, 0.15rem);
      min-width: 0;
    }

    [data-faceted-story] [data-facet-group-label] {
      font-size: var(--font-size-sm);
      color: color-mix(in oklab, var(--facet-accent) 70%, var(--color-text-secondary));
      font-weight: var(--font-weight-semibold);
      letter-spacing: 0.01em;
      line-height: 1;
    }

    [data-faceted-story] [data-facet-summary-sep] {
      opacity: 0.7;
      line-height: 1;
    }

    [data-faceted-story] [data-facet-summary-value] {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-semibold);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    [data-faceted-story] [data-facet-toggle] pds-icon {
      color: color-mix(in oklab, var(--facet-accent) 75%, var(--color-text-secondary));
      pointer-events: none;
      flex-shrink: 0;
    }

    [data-faceted-story] [data-facet-panel] {
      position: absolute;
      inset-inline-start: 0;
      top: calc(100% + var(--spacing-2xs, 0.2rem));
      z-index: 120;
      min-inline-size: min(28rem, 92vw);
      padding: var(--spacing-xs, 0.4rem);
      border: 1px solid color-mix(in oklab, var(--facet-accent) 34%, var(--color-border));
      border-radius: var(--radius-md, 0.5rem);
      background: color-mix(in oklab, var(--facet-accent) 7%, var(--color-surface-elevated));
      box-shadow: var(--shadow-md);
      margin: 0;
    }

    [data-faceted-story] [data-facet-note] {
      display: block;
      margin-bottom: var(--spacing-xs, 0.4rem);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }

    [data-faceted-story] [data-facet-buttons] {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2xs, 0.2rem);
    }

    [data-faceted-story] [data-facet-buttons] button.btn-secondary[data-active="true"] {
      box-shadow: inset 0 0 0 2px var(--color-primary-500);
      font-weight: var(--font-weight-semibold);
    }

    [data-faceted-story] [data-facet-log] {
      margin: var(--spacing-4) 0 0 0;
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      border: 1px solid color-mix(in oklab, var(--color-primary-500) 24%, var(--color-border));
      background: color-mix(in oklab, var(--color-surface-base) 90%, var(--color-primary-500) 10%);
      color: var(--color-text-secondary);
      font-size: var(--font-size-xs);
      white-space: pre-wrap;
    }

    @media (max-width: 42rem) {
      [data-faceted-story] {
        padding: var(--spacing-4);
      }

      [data-faceted-story] [data-facet-row] {
        flex-wrap: wrap;
        align-items: flex-start;
        row-gap: var(--spacing-xs);
      }

      [data-faceted-story] [data-subfacets] {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }

      [data-faceted-story] [data-facet-group] {
        max-width: 100%;
      }

      [data-faceted-story] [data-facet-panel] {
        min-inline-size: min(100vw - 1rem, 24rem);
      }
    }
  </style>
`;

const FACET_GROUPS = [
  {
    key: "meal-type",
    label: "Meal type",
    multi: false,
    emptyLabel: "Any",
    options: [
      { key: "pasta", label: "Pasta" },
      { key: "rice", label: "Rice" },
      { key: "bread", label: "Bread" },
      { key: "salad", label: "Salad" },
    ],
  },
  {
    key: "diet",
    label: "Diet",
    multi: true,
    emptyLabel: "Any",
    options: [
      { key: "vegan", label: "Vegan" },
      { key: "vegetarian", label: "Vegetarian" },
      { key: "gluten-free", label: "Gluten-free" },
      { key: "dairy-free", label: "Dairy-free" },
    ],
  },
  {
    key: "allergies",
    label: "Allergies",
    multi: true,
    emptyLabel: "None",
    options: [
      { key: "nuts", label: "Nuts" },
      { key: "shellfish", label: "Shellfish" },
      { key: "soy", label: "Soy" },
      { key: "dairy", label: "Dairy" },
    ],
  },
];

const FACET_GROUP_MAP = new Map(FACET_GROUPS.map((group) => [group.key, group]));
let facetedStoryInstance = 0;

function toFacetSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFacetString(facetString) {
  const map = new Map();
  if (!facetString) return map;

  facetString
    .split(";")
    .map((token) => token.trim())
    .filter(Boolean)
    .forEach((token) => {
      const separator = token.indexOf(":");
      if (separator === -1) return;
      const key = toFacetSlug(token.slice(0, separator));
      const values = token
        .slice(separator + 1)
        .split(",")
        .map((value) => toFacetSlug(value))
        .filter(Boolean);
      if (!key || values.length === 0) return;
      map.set(key, values);
    });

  return map;
}

function serializeFacetMap(facetMap) {
  const fixedOrder = ["type", ...FACET_GROUPS.map((group) => group.key)];
  const dynamicKeys = Array.from(facetMap.keys()).filter(
    (key) => !fixedOrder.includes(key),
  );
  const orderedKeys = [...fixedOrder, ...dynamicKeys];

  return orderedKeys
    .map((key) => {
      const values = facetMap.get(key) || [];
      if (!values.length) return "";
      return `${key}:${values.join(",")}`;
    })
    .filter(Boolean)
    .join(";");
}

function facetOptionLabel(group, optionKey) {
  return group.options.find((option) => option.key === optionKey)?.label || optionKey;
}

function summarizeFacetGroup(group, values) {
  if (!values.length) return group.emptyLabel || "Any";
  if (!group.multi) return facetOptionLabel(group, values[0]);
  if (values.length === 1) return facetOptionLabel(group, values[0]);
  return `${values.length} selected`;
}

function arraysAreEqual(left, right) {
  if (left.length !== right.length) return false;
  return left.every((item, index) => item === right[index]);
}

function isPopoverOpen(element) {
  if (!element || typeof element.matches !== "function") return false;
  try {
    return element.matches(":popover-open");
  } catch {
    return false;
  }
}

function initFacetedSearchStory(storyId, initialFacet) {
  const root = document.querySelector(`[data-faceted-story="${storyId}"]`);
  if (!root || root.dataset.facetedStoryReady === "true") return;
  root.dataset.facetedStoryReady = "true";

  const facetMap = parseFacetString(initialFacet);
  const draftGroupValues = new Map();
  const output = root.querySelector("[data-facet-log]");
  const mainFacetButton = root.querySelector("[data-main-facet-button]");
  const groupElements = Array.from(root.querySelectorAll("[data-facet-group]"));

  const closeAllGroups = () => {
    groupElements.forEach((groupElement) => {
      const panel = groupElement.querySelector("[data-facet-panel]");
      if (panel && typeof panel.hidePopover === "function") {
        panel.hidePopover();
      }
      groupElement.dataset.open = "false";
    });
  };

  const dispatchFacetChange = () => {
    const facet = serializeFacetMap(facetMap);
    root.dispatchEvent(
      new CustomEvent("facet-change", {
        bubbles: true,
        composed: true,
        detail: { facet },
      }),
    );
    if (output) {
      output.textContent = `facet-change -> ${facet || "(empty)"}`;
    }
  };

  const commitDraft = (groupKey) => {
    const group = FACET_GROUP_MAP.get(groupKey);
    if (!group || !group.multi) return;

    const currentValues = facetMap.get(groupKey) || [];
    const draftValues = draftGroupValues.get(groupKey) || currentValues;
    const normalizedDraft = group.options
      .map((option) => option.key)
      .filter((optionKey) => draftValues.includes(optionKey));

    if (normalizedDraft.length) {
      facetMap.set(groupKey, normalizedDraft);
    } else {
      facetMap.delete(groupKey);
    }

    if (!arraysAreEqual(currentValues, normalizedDraft)) {
      dispatchFacetChange();
    }
  };

  const renderState = () => {
    const hasMainFacet = (facetMap.get("type") || []).includes("recipe");
    if (mainFacetButton) {
      mainFacetButton.hidden = !hasMainFacet;
    }

    groupElements.forEach((groupElement) => {
      const groupKey = groupElement.dataset.groupKey;
      const group = FACET_GROUP_MAP.get(groupKey);
      if (!group) return;

      const panel = groupElement.querySelector("[data-facet-panel]");
      const isOpen = isPopoverOpen(panel);
      groupElement.dataset.open = isOpen ? "true" : "false";

      const selectedValues = isOpen && group.multi
        ? (draftGroupValues.get(groupKey) || facetMap.get(groupKey) || [])
        : (facetMap.get(groupKey) || []);

      const summaryValue = summarizeFacetGroup(group, selectedValues);
      const summaryValueElement = groupElement.querySelector("[data-facet-summary-value]");
      if (summaryValueElement) {
        summaryValueElement.textContent = summaryValue;
      }

      const toggle = groupElement.querySelector("[data-group-toggle]");
      if (toggle) {
        toggle.setAttribute("aria-label", `${group.label}: ${summaryValue}`);
      }

      const caret = groupElement.querySelector("[data-group-caret]");
      if (caret) {
        caret.setAttribute("icon", isOpen ? "caret-up" : "caret-down");
      }

      const selectedSet = new Set(selectedValues);
      groupElement.querySelectorAll("[data-subfacet-option]").forEach((button) => {
        const optionKey = button.dataset.optionKey;
        const isSelected = selectedSet.has(optionKey);
        button.dataset.active = isSelected ? "true" : "false";
        button.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
    });
  };

  root.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-facet-clear]");
    if (clearButton && root.contains(clearButton)) {
      event.preventDefault();
      facetMap.clear();
      draftGroupValues.clear();
      closeAllGroups();
      renderState();
      dispatchFacetChange();
      return;
    }

    const optionButton = event.target.closest("[data-subfacet-option]");
    if (!optionButton || !root.contains(optionButton)) return;

    const groupKey = optionButton.dataset.groupKey;
    const optionKey = optionButton.dataset.optionKey;
    const group = FACET_GROUP_MAP.get(groupKey);
    if (!group || !optionKey) return;

    if (group.multi) {
      const currentDraft = new Set(draftGroupValues.get(groupKey) || facetMap.get(groupKey) || []);
      if (currentDraft.has(optionKey)) {
        currentDraft.delete(optionKey);
      } else {
        currentDraft.add(optionKey);
      }

      const nextDraft = group.options
        .map((option) => option.key)
        .filter((key) => currentDraft.has(key));
      draftGroupValues.set(groupKey, nextDraft);
      renderState();
      return;
    }

    facetMap.set(groupKey, [optionKey]);
    dispatchFacetChange();

    const panel = optionButton.closest("[data-facet-group]")?.querySelector("[data-facet-panel]");
    if (panel && typeof panel.hidePopover === "function") {
      panel.hidePopover();
    } else {
      renderState();
    }
  });

  groupElements.forEach((groupElement) => {
    const groupKey = groupElement.dataset.groupKey;
    const group = FACET_GROUP_MAP.get(groupKey);
    const panel = groupElement.querySelector("[data-facet-panel]");
    if (!group || !panel) return;

    panel.addEventListener("toggle", (event) => {
      if (event.newState === "open") {
        groupElements.forEach((otherGroup) => {
          if (otherGroup === groupElement) return;
          const otherPanel = otherGroup.querySelector("[data-facet-panel]");
          if (otherPanel && typeof otherPanel.hidePopover === "function" && isPopoverOpen(otherPanel)) {
            otherPanel.hidePopover();
          }
          otherGroup.dataset.open = "false";
        });

        if (group.multi) {
          draftGroupValues.set(groupKey, [...(facetMap.get(groupKey) || [])]);
        }
      }

      if (event.newState === "closed") {
        groupElement.dataset.open = "false";
        if (group.multi) {
          commitDraft(groupKey);
        }

        // Defer visual state updates one frame so close transitions do not jump
        // when summary text or layout changes in the same close cycle.
        requestAnimationFrame(() => {
          renderState();
        });
        return;
      }

      renderState();
    });
  });

  root.addEventListener("facet-change", (event) => {
    const detailFacet = event.detail?.facet;
    if (output) {
      output.textContent = `facet-change -> ${detailFacet || "(empty)"}`;
    }
  });

  requestAnimationFrame(() => {
    root.setAttribute("data-subfacets-ready", "");
  });

  renderState();
  dispatchFacetChange();
}

export default {
  title: "Enhancements/nav[data-dropdown]",
  tags: ['dropdown', 'menu', 'navigation', 'popover', 'forms', 'interaction'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['dropdown', 'menu', 'navigation', 'popover', 'overlay', 'forms', 'interaction', 'data-dropdown']
    }
  },
};

export const BasicDropdown = () => html`
  ${enhancementHeader('dropdown')}
  <nav data-dropdown>
    <button class="btn-primary">Open Menu</button>
    <menu>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </menu>
  </nav>
`;


export const RightAligned = () => html`
  ${enhancementHeader('dropdown', {
    selector: '.align-right',
    description: ' Adds `.align-right` to align the dropdown menu to the right edge of the trigger button.'
  })}
  <div class="text-right">
    <nav data-dropdown class="align-right">
      <button class="btn-secondary">User Menu</button>
      <menu>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><hr /></li>
        <li><a href="#logout">Logout</a></li>
      </menu>
    </nav>
  </div>
`;

export const WithIcons = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Use `data-dropdown-close` on action links/buttons that should close the menu after click.'
  })}
  <nav data-dropdown>
    <button class="btn-outline">
      <pds-icon icon="list" size="sm"></pds-icon>
      Actions
    </button>
    <menu>
      <li>
        <a href="#edit" data-dropdown-close>
          <pds-icon icon="pencil" size="sm"></pds-icon>
          Edit
        </a>
      </li>
      <li>
        <a href="#copy" data-dropdown-close>
          <pds-icon icon="copy" size="sm"></pds-icon>
          Copy
        </a>
      </li>
      <li>
        <a href="#delete" data-dropdown-close>
          <pds-icon icon="trash" size="sm"></pds-icon>
          Delete
        </a>
      </li>
    </menu>
  </nav>
`;

export const WithSemanticSeparator = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Uses a semantic separator (`<li><hr /></li>`) and `data-dropdown-close` on action items.'
  })}
  <nav data-dropdown>
    <button class="btn-outline">
      <pds-icon icon="list" size="sm"></pds-icon>
      Actions
    </button>
    <menu>
      <li>
        <a href="#toggle-edit" data-dropdown-close>
          <pds-icon icon="pencil" size="sm"></pds-icon>
          Toggle live editing
        </a>
      </li>
      <li>
        <a href="#open-settings" data-dropdown-close>
          <pds-icon icon="gear" size="sm"></pds-icon>
          Open Design Settings
        </a>
      </li>
      <li><hr /></li>
      <li>
        <a href="#reset-config" class="text-danger" data-dropdown-close>
          <pds-icon icon="arrow-counter-clockwise" size="sm"></pds-icon>
          Reset Config
        </a>
      </li>
    </menu>
  </nav>
`;

export const DropUp = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown', {
    selector: '[data-mode="up"]',
    description: ' Adds `data-mode="up"` to make the dropdown menu open upwards instead of downwards.'
  })}
  <div class="flex justify-center items-end card story-dropdown-container">
    <nav data-dropdown data-mode="up">
      <button class="btn-primary">Resources</button>
      <menu>
        <li><a href="#guides">Guides</a></li>
        <li><a href="#checklists">Checklists</a></li>
        <li><a href="#support">Support</a></li>
      </menu>
    </nav>
  </div>
`;

export const SplitButtonDefaultAction = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown', {
    selector: '.split-button',
    description: 'Use `.split-button` on `nav[data-dropdown]` to render a split-button: the first `<li>` (or `<li data-default>`) becomes the primary left action, and the right caret button opens the menu.'
  })}
  <section>
    <nav data-dropdown class="split-button">
      <button
        type="button"
        class="btn-primary"
        data-dropdown-toggle
        aria-label="Open additional create actions"
      >
        <pds-icon icon="caret-down" size="xs" aria-hidden="true"></pds-icon>
      </button>
      <menu>
        <li>
          <a @click=${(e) => {e.preventDefault();}} href="#create-post" data-dropdown-close>
            <pds-icon icon="plus" size="sm" aria-hidden="true"></pds-icon>
            New post
          </a>
        </li>
        <li>
          <a href="#create-page" data-dropdown-close>
            <pds-icon icon="file-plus" size="sm" aria-hidden="true"></pds-icon>
            New page
          </a>
        </li>
        <li>
          <a href="#duplicate" data-dropdown-close>
            <pds-icon icon="copy" size="sm" aria-hidden="true"></pds-icon>
            Duplicate current
          </a>
        </li>
      </menu>
    </nav>
  </section>
`;


export const BackgroundImageLiquidGlass = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown')}
  <section class="story-glass-demo story-glass-demo-travel">
    <div class="stack-md gap-md text-center max-w-sm">
      
      <nav data-dropdown data-mode="down">
        <button class="btn-primary">Featured Cities</button>
        <menu class="liquid-glass">
          <li><a href="#barcelona">Barcelona</a></li>
          <li><a href="#kyoto">Kyoto</a></li>
          <li><a href="#cape-town">Cape Town</a></li>
          <li><a href="#reykjavik">Reykjavik</a></li>
        </menu>
      </nav>
    </div>
  </section>
`;

export const CardPanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Use any last-child element as the dropdown panel (card, section, form, etc.). Add `data-dropdown-close` on panel actions that should dismiss the dropdown.'
  })}
  <nav data-dropdown>
    <button class="btn-secondary">Project Actions</button>
    <section class="card surface-overlay">
      <header>
        <strong>Release checklist</strong>
        <small class="text-muted">Keep the essentials visible.</small>
      </header>
      <div class="flex gap-sm">
        <button class="btn-primary btn-sm" data-dropdown-close>Ship now</button>
        <button class="btn-outline btn-sm" data-dropdown-close>Schedule</button>
      </div>
      <hr data-label="Optional" />
      <footer class="flex gap-sm">
        <a href="#" class="badge">View notes</a>
        <a href="#" class="badge">Duplicate</a>
      </footer>
    </section>
  </nav>
`;

export const FormPanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Dropdowns can host richer content like forms and toggles. Here, Save/Reset use `data-dropdown-close` to dismiss the menu.'
  })}
  <nav data-dropdown>
    <button class="btn-outline">Notification Settings</button>
    <div class="card surface-overlay grid grid-auto gap-sm">
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Email alerts</span>
      </label>
      <label data-toggle>
        <input type="checkbox" />
        <span data-label>Slack updates</span>
      </label>
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Weekly summary</span>
      </label>
      <div class="flex gap-sm">
        <button class="btn-primary btn-sm" data-dropdown-close>Save</button>
        <button class="btn-secondary btn-sm" data-dropdown-close>Reset</button>
      </div>
    </div>
  </nav>
`;

export const ProfilePanel = () => html`
  ${enhancementHeader('dropdown', {
    description: 'Panels can be semantic HTML containers while keeping menu styles for real menus. Profile actions can opt into close-on-select with `data-dropdown-close`.'
  })}
  <nav data-dropdown>
    <button class="btn-primary">Account</button>
    <article class="card surface-overlay">
      <div class="flex gap-sm items-center">
        <pds-icon icon="user" size="lg"></pds-icon>
        <div class="stack-xs">
          <strong>Alex Morgan</strong>
          <small class="text-muted">alex@pure.dev</small>
        </div>
      </div>
      <div class="stack-xs">
        <a class="btn btn-outline btn-sm" href="#profile" data-dropdown-close>View profile</a>
        <a class="btn btn-secondary btn-sm" href="#billing" data-dropdown-close>Billing</a>
      </div>
    </article>
  </nav>
`;

export const AutoPositionCorners = () => html`
  ${dropdownStoryStyles}
  ${enhancementHeader('dropdown', {
    description: 'Four corner triggers use automatic positioning (`data-mode="auto"`) so each menu opens in the only available direction and alignment.'
  })}
  <nav data-dropdown data-mode="auto" class="story-corner-nav top-left">
    <button class="btn-primary icon-only" aria-label="Top Left menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav top-right">
    <button class="btn-primary icon-only" aria-label="Top Right menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav bottom-left">
    <button class="btn-primary icon-only" aria-label="Bottom Left menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>

  <nav data-dropdown data-mode="auto" class="story-corner-nav bottom-right">
    <button class="btn-primary icon-only" aria-label="Bottom Right menu">
      <pds-icon icon="list" size="sm"></pds-icon>
    </button>
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </nav>
`;

export const FacetedSearchSimulation = {
  render: () => {
    const storyId = `faceted-search-story-${++facetedStoryInstance}`;

    setTimeout(() => {
      initFacetedSearchStory(storyId, "type:recipe;meal-type:pasta;diet:vegan,vegetarian");
    }, 0);

    return html`
      ${facetedSearchStoryStyles}
      ${enhancementHeader('dropdown', {
        description: 'Simulates a full faceted-search bar with token-based custom styling on top of nav[data-dropdown], including single-select immediate apply and multi-select apply-on-close behavior.'
      })}
      <section data-faceted-story="${storyId}" class="card">
        <h3 data-facet-heading>Faceted Search Simulation</h3>
        <p data-facet-intro>
          This demo combines a main facet, three custom-styled dropdown facet groups, and a live facet string output.
        </p>

        <nav data-facet-bar aria-label="Active filters">
          <div data-facet-row>
            <button
              type="button"
              class="btn-primary btn-sm"
              data-main-facet-button
              data-facet-clear="type:recipe"
              aria-label="Remove filter: Recipe"
            >
              Recipe
              <pds-icon icon="x" size="xs" aria-hidden="true"></pds-icon>
            </button>

            <div data-subfacets>
              <nav data-dropdown data-facet-group data-group-key="meal-type" data-open="false">
                <button
                  type="button"
                  class="btn-secondary btn-sm"
                  data-facet-toggle
                  data-dropdown-toggle
                  data-group-toggle="meal-type"
                  aria-expanded="false"
                  aria-label="Meal type: Pasta"
                >
                  <span data-facet-summary>
                    <span data-facet-group-label>Meal type</span>
                    <span data-facet-summary-sep>:</span>
                    <span data-facet-summary-value>Pasta</span>
                  </span>
                  <pds-icon data-group-caret icon="caret-down" size="xs" aria-hidden="true"></pds-icon>
                </button>

                <section data-facet-panel>
                  <small data-facet-note>Selecting an option applies immediately.</small>
                  <div data-facet-buttons>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="meal-type" data-option-key="pasta" data-active="true" aria-pressed="true" data-dropdown-close>Pasta</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="meal-type" data-option-key="rice" data-active="false" aria-pressed="false" data-dropdown-close>Rice</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="meal-type" data-option-key="bread" data-active="false" aria-pressed="false" data-dropdown-close>Bread</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="meal-type" data-option-key="salad" data-active="false" aria-pressed="false" data-dropdown-close>Salad</button>
                  </div>
                </section>
              </nav>

              <nav data-dropdown data-facet-group data-group-key="diet" data-open="false">
                <button
                  type="button"
                  class="btn-secondary btn-sm"
                  data-facet-toggle
                  data-dropdown-toggle
                  data-group-toggle="diet"
                  aria-expanded="false"
                  aria-label="Diet: 2 selected"
                >
                  <span data-facet-summary>
                    <span data-facet-group-label>Diet</span>
                    <span data-facet-summary-sep>:</span>
                    <span data-facet-summary-value>2 selected</span>
                  </span>
                  <pds-icon data-group-caret icon="caret-down" size="xs" aria-hidden="true"></pds-icon>
                </button>

                <section data-facet-panel>
                  <small data-facet-note>Selections apply when you close this dropdown.</small>
                  <div data-facet-buttons>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="diet" data-option-key="vegan" data-active="true" aria-pressed="true">Vegan</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="diet" data-option-key="vegetarian" data-active="true" aria-pressed="true">Vegetarian</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="diet" data-option-key="gluten-free" data-active="false" aria-pressed="false">Gluten-free</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="diet" data-option-key="dairy-free" data-active="false" aria-pressed="false">Dairy-free</button>
                  </div>
                </section>
              </nav>

              <nav data-dropdown data-facet-group data-group-key="allergies" data-open="false">
                <button
                  type="button"
                  class="btn-secondary btn-sm"
                  data-facet-toggle
                  data-dropdown-toggle
                  data-group-toggle="allergies"
                  aria-expanded="false"
                  aria-label="Allergies: None"
                >
                  <span data-facet-summary>
                    <span data-facet-group-label>Allergies</span>
                    <span data-facet-summary-sep>:</span>
                    <span data-facet-summary-value>None</span>
                  </span>
                  <pds-icon data-group-caret icon="caret-down" size="xs" aria-hidden="true"></pds-icon>
                </button>

                <section data-facet-panel>
                  <small data-facet-note>Selections apply when you close this dropdown.</small>
                  <div data-facet-buttons>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="allergies" data-option-key="nuts" data-active="false" aria-pressed="false">Nuts</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="allergies" data-option-key="shellfish" data-active="false" aria-pressed="false">Shellfish</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="allergies" data-option-key="soy" data-active="false" aria-pressed="false">Soy</button>
                    <button type="button" class="btn-secondary btn-sm" data-subfacet-option data-group-key="allergies" data-option-key="dairy" data-active="false" aria-pressed="false">Dairy</button>
                  </div>
                </section>
              </nav>
            </div>
          </div>
        </nav>

        <pre class="card" data-facet-log>facet-change -> type:recipe;meal-type:pasta;diet:vegan,vegetarian</pre>
      </section>
    `;
  }
};
