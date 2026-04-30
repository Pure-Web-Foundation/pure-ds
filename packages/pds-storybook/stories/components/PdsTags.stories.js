import { html, lazyProps } from "#pds/lit";

// ─── Facts story helpers ───────────────────────────────────────────────────

const PREDEFINED_FACTS = [
  { name: "I love sushi", icon: "sushi" },
  { name: "I run marathons", icon: "person-running" },
  { name: "I play guitar", icon: "guitar" },
  { name: "I am into photography", icon: "camera" },
  { name: "I enjoy cycling", icon: "bicycle" },
  { name: "I watch Formula 1", icon: "flag-checkered" },
  { name: "I do yoga", icon: "spa" },
  { name: "I love coffee", icon: "mug-hot" },
  { name: "I cook Italian food", icon: "pizza-slice" },
  { name: "I play football", icon: "futbol" },
  { name: "I like gaming", icon: "gamepad" },
  { name: "I read sci-fi books", icon: "book-open" },
];

let _iconsDict = null;

async function loadIconsDict() {
  if (_iconsDict) return _iconsDict;
  try {
    const res = await fetch("/assets/data/icons_en.json");
    _iconsDict = res.ok ? await res.json() : {};
  } catch {
    _iconsDict = {};
  }
  return _iconsDict;
}

function findBestIconForText(text, dict) {
  if (!text || !dict || typeof dict !== "object") return "tag";
  // Keep only words longer than 2 chars to avoid noise from "I", "a", "to"
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);
  if (!words.length) return "tag";

  let best = "tag";
  let bestScore = 0;

  for (const [iconName, keywords] of Object.entries(dict)) {
    let score = 0;
    for (const word of words) {
      if (iconName === word) score += 4;
      else if (iconName.includes(word) || word.includes(iconName)) score += 2;
      for (const kw of keywords) {
        if (kw === word) score += 3;
        else if (kw.includes(word) || word.includes(kw)) score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = iconName;
    }
  }

  console.debug("[FactTags] matched icon", { text, icon: best, score: bestScore });
  return best;
}

// ─── FontAwesome CDN fallback for pds-icon icons not in the sprite sheet ──────

const FA_CDN_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
const FA_SVG_BASE = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs/solid';
let _globalFactTagsIconFallbackBound = false;

function ensureFontAwesome() {
  if (!document.querySelector('link[data-pds-fa-cdn]')) {
    console.debug("[FactTags] loading Font Awesome CSS", { href: FA_CDN_HREF });
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-pds-fa-cdn', '');
    link.href = FA_CDN_HREF;
    link.addEventListener('load', () => {
      console.debug("[FactTags] Font Awesome CSS loaded", { href: FA_CDN_HREF });
    }, { once: true });
    link.addEventListener('error', () => {
      console.error("[FactTags] Font Awesome CSS failed to load", { href: FA_CDN_HREF });
    }, { once: true });
    document.head.appendChild(link);
    return;
  }
  console.debug("[FactTags] Font Awesome CSS already present");
}

function toFaIconName(iconName) {
  const raw = String(iconName || "").trim().toLowerCase();
  if (!raw) return "tag";
  // Keep this tiny and explicit for common non-FA names we emit in stories.
  const alias = {
    "rectangle-beta": "rectangle-list",
    "sushi": "fish",
    "person-running": "person-running",
    "book-open": "book-open",
    "pizza-slice": "pizza-slice",
    "mug-hot": "mug-hot",
  };
  const normalized = alias[raw] || raw;

  // Use a small allowlist of FA free icons we actively rely on in this story.
  // If we don't recognize the name, default to `tag` so the UI still shows an icon.
  const known = new Set([
    "bicycle",
    "book-open",
    "camera",
    "fish",
    "flag-checkered",
    "futbol",
    "gamepad",
    "guitar",
    "mug-hot",
    "person-running",
    "pizza-slice",
    "rectangle-list",
    "spa",
    "tag",
  ]);

  return known.has(normalized) ? normalized : "tag";
}

function renderFactIconMarkup(item) {
  if (!item?.icon) return "";
  const faIconName = toFaIconName(item.icon);
  const src = `${FA_SVG_BASE}/${faIconName}.svg`;
  return `<span aria-hidden="true" style="display:inline-block;width:1rem;height:1rem;background-color:var(--ac-icon-fill, var(--color-accent-500));-webkit-mask-image:url('${src}');-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;-webkit-mask-size:contain;mask-image:url('${src}');mask-repeat:no-repeat;mask-position:center;mask-size:contain"></span>`;
}

function createFaMaskFallback(iconName) {
  const mask = document.createElement('span');
  mask.slot = 'fallback';
  mask.setAttribute('aria-hidden', 'true');
  mask.style.display = 'inline-block';
  mask.style.width = '18px';
  mask.style.height = '18px';
  // Match sprite behavior: icon color follows currentColor from pds-icon host.
  mask.style.backgroundColor = 'currentColor';
  mask.style.webkitMaskRepeat = 'no-repeat';
  mask.style.webkitMaskPosition = 'center';
  mask.style.webkitMaskSize = 'contain';
  mask.style.maskRepeat = 'no-repeat';
  mask.style.maskPosition = 'center';
  mask.style.maskSize = 'contain';

  const setMaskIcon = (name) => {
    const src = `${FA_SVG_BASE}/${name}.svg`;
    mask.style.webkitMaskImage = `url("${src}")`;
    mask.style.maskImage = `url("${src}")`;
    return src;
  };

  const initialSrc = setMaskIcon(iconName);
  const probe = new Image();
  probe.addEventListener('load', () => {
    console.debug('[FactTags] FA SVG loaded', { icon: iconName, src: initialSrc });
  }, { once: true });
  probe.addEventListener('error', () => {
    const fallbackSrc = setMaskIcon('tag');
    console.warn('[FactTags] FA SVG missing, falling back to tag.svg', {
      icon: iconName,
      src: initialSrc,
      fallbackSrc,
    });
  }, { once: true });
  probe.src = initialSrc;

  return { element: mask, src: initialSrc };
}

/**
 * Handler for pds-icon's `icon-not-found` event.
 * Calls preventDefault() to suppress the built-in missing placeholder and
 * injects a Font Awesome mask into the icon's <slot name="fallback">.
 */
function handleIconNotFound(e) {
  if (e.defaultPrevented) return;
  console.debug("[FactTags] icon-not-found received", {
    icon: e?.detail?.icon,
    hostTag: e?.detail?.element?.tagName,
  });
  e.preventDefault();
  console.debug("[FactTags] preventDefault called");
  ensureFontAwesome();
  const pdsIcon = e.detail.element;
  // Remove any previous fallback slot content
  [...pdsIcon.children].filter(n => n.slot === 'fallback').forEach(n => n.remove());
  const faIconName = toFaIconName(e.detail.icon);
  const { element: faMask, src } = createFaMaskFallback(faIconName);
  pdsIcon.appendChild(faMask);
  console.debug("[FactTags] fallback icon appended", {
    requested: e.detail.icon,
    fontAwesome: faIconName,
    src,
    mode: 'mask-currentColor',
  });
}

function ensureGlobalFactTagsIconFallback() {
  if (_globalFactTagsIconFallbackBound) return;
  document.addEventListener("icon-not-found", handleIconNotFound, { capture: true });
  _globalFactTagsIconFallbackBound = true;
  console.debug("[FactTags] global icon-not-found listener attached (capture=true)");
}

const factsOptions = {
  itemGrid: "40px 1fr auto",
  hideCategory: false,
  iconHandler: (item) => renderFactIconMarkup(item),
  categories: {
    "Suggested Facts": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        console.log("options.getItems for Suggested Facts, search =", search);
        const q = (search || "").trim().toLowerCase();
        return PREDEFINED_FACTS
          .filter((f) => !q || f.name.toLowerCase().includes(q))
          .map((f) => ({ id: f.name, text: f.name, icon: f.icon, category: "Suggested Facts" }));
      },
    },
    "Create New": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        console.log("options.getItems for Create New, search =", search);
        const q = (search || "").trim();
        // Show the create option only when the user has typed at least two words
        const wordCount = q.split(/\s+/).filter(Boolean).length;
        if (wordCount < 2) return [];
        // Suppress if the text exactly matches a predefined fact
        if (PREDEFINED_FACTS.some((f) => f.name.toLowerCase() === q.toLowerCase())) return [];
        const dict = await loadIconsDict();
        const icon = findBestIconForText(q, dict);
        console.debug("[FactTags] create-new item", { text: q, matchedIcon: icon });
        return [
          {
            id: q,
            text: q,
            icon,
            description: "Create new fact",
            category: "Create New",
          },
        ];
      },
    },
  },
};

const factsOptionsSource = `const PREDEFINED_FACTS = [
  { name: "I love sushi", icon: "sushi" },
  { name: "I run marathons", icon: "person-running" },
  { name: "I play guitar", icon: "guitar" },
  // ...
];

// Load icons_en.json once and find the best matching icon for arbitrary text
async function loadIconsDict() { /* fetch /assets/data/icons_en.json */ }
function findBestIconForText(text, dict) { /* score each icon by keyword match */ }

const options = {
  itemGrid: "40px 1fr auto",
  hideCategory: false,
  iconHandler: (item) => item.icon ? \`<pds-icon icon="\${item.icon}"></pds-icon>\` : null,
  categories: {
    "Suggested Facts": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const q = (search || "").trim().toLowerCase();
        return PREDEFINED_FACTS
          .filter((f) => !q || f.name.toLowerCase().includes(q))
          .map((f) => ({ id: f.name, text: f.name, icon: f.icon }));
      },
    },
    "Create New": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const q = (search || "").trim();
        const wordCount = q.split(/\\\\s+/).filter(Boolean).length;
        if (wordCount < 2) return [];
        if (PREDEFINED_FACTS.some((f) => f.name.toLowerCase() === q.toLowerCase())) return [];
        const dict = await loadIconsDict();
        const icon = findBestIconForText(q, dict);
        return [{ id: q, text: q, icon, description: "Create new fact" }];
      },
    },
  },
};

<pds-tags
  name="facts"
  placeholder="Search or create a fact..."
  \${lazyProps({ options })}
></pds-tags>`;

// ─── Language items ────────────────────────────────────────────────────────

const languageItems = [
  { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
  { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
  { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
  { id: "ar", text: "Arabisch", description: "SA · Arabic", category: "Languages" },
  { id: "bs", text: "Bosnisch", description: "BA · Bosnia and Herzegovina", category: "Languages" },
  { id: "bg", text: "Bulgaars", description: "BG · Bulgaria", category: "Languages" },
  { id: "fr", text: "Frans", description: "FR · France", category: "Languages" },
  { id: "de", text: "Duits", description: "DE · Germany", category: "Languages" },
  { id: "es", text: "Spaans", description: "ES · Spain", category: "Languages" },
  { id: "en", text: "Engels", description: "US · United Kingdom", category: "Languages" },
];

const groupedItems = [
  { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
  { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
  { id: "react", text: "React", description: "Frontend", category: "Skills" },
  { id: "wc", text: "Web Components", description: "Frontend", category: "Skills" },
  { id: "figma", text: "Figma", description: "Design tooling", category: "Tools" },
  { id: "storybook", text: "Storybook", description: "Component docs", category: "Tools" },
];

const createOmniboxOptionsFromItems = (items) => {
  const byCategory = items.reduce((map, item) => {
    const key = item.category || "Options";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
    return map;
  }, new Map());

  const categories = {};
  for (const [categoryName, entries] of byCategory.entries()) {
    categories[categoryName] = {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = String(search).trim().toLowerCase();
        return entries.filter((item) => {
          if (!query) return true;
          return (
            item.text.toLowerCase().includes(query)
            || item.id.toLowerCase().includes(query)
            || (item.description || "").toLowerCase().includes(query)
          );
        });
      },
    };
  }

  return { categories };
};

const languageOptions = createOmniboxOptionsFromItems(languageItems);
const groupedOptions = createOmniboxOptionsFromItems(groupedItems);

const languageOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
          { id: "fr", text: "Frans", description: "FR · France", category: "Languages" },
          { id: "de", text: "Duits", description: "DE · Germany", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<pds-tags
  name="languages"
  placeholder="Zoek taal..."
  value="et,bd,nl"
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const groupedOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
    Skills: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "react", text: "React", description: "Frontend", category: "Skills" },
          { id: "wc", text: "Web Components", description: "Frontend", category: "Skills" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
    Tools: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "figma", text: "Figma", description: "Design tooling", category: "Tools" },
          { id: "storybook", text: "Storybook", description: "Component docs", category: "Tools" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<pds-tags
  name="selections"
  placeholder="Search languages, skills, or tools..."
  value="nl,wc,figma"
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const formOptionsSource = `const options = {
  categories: {
    Languages: {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim().toLowerCase();
        const items = [
          { id: "et", text: "Amhaars", description: "ET · Ethiopia", category: "Languages" },
          { id: "bd", text: "Bengaals", description: "BD · Bangladesh", category: "Languages" },
          { id: "nl", text: "Nederlands", description: "NL · Netherlands", category: "Languages" },
        ];
        return items.filter((item) => !query || item.text.toLowerCase().includes(query));
      },
    },
  },
};

<form class="stack-md">
  <pds-tags
    name="languages"
    required
    placeholder="Select one or more languages..."
    ${"${lazyProps({ options })}"}
  ></pds-tags>

  <button class="btn-primary" type="submit">Submit</button>
</form>`;

const tvMazeOptions = {
  categories: {
    "TV Shows": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = String(search).trim();
        const fallbackQuery = "star";
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query || fallbackQuery)}`;

        try {
          const response = await fetch(url);
          if (!response.ok) return [];

          const payload = await response.json();
          if (!Array.isArray(payload)) return [];

          return payload
            .map((entry) => entry?.show)
            .filter(Boolean)
            .slice(0, 20)
            .map((show) => {
              const year = show.premiered ? String(show.premiered).slice(0, 4) : "";
              const genres = Array.isArray(show.genres)
                ? show.genres.slice(0, 2).join(", ")
                : "";
              const channel = show.network?.name || show.webChannel?.name || "";
              const description = [year, genres, channel].filter(Boolean).join(" · ");

              return {
                id: String(show.id),
                text: show.name || `Show ${show.id}`,
                description,
                category: "TV Shows",
              };
            });
        } catch {
          return [];
        }
      },
    },
  },
};

const tvMazeOptionsSource = `const options = {
  categories: {
    "TV Shows": {
      trigger: () => true,
      getItems: async ({ search = "" } = {}) => {
        const query = search.trim();
        const fallbackQuery = "star";
        const url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query || fallbackQuery);

        const response = await fetch(url);
        if (!response.ok) return [];

        const payload = await response.json();
        if (!Array.isArray(payload)) return [];

        return payload
          .map((entry) => entry?.show)
          .filter(Boolean)
          .slice(0, 20)
          .map((show) => ({
            id: String(show.id),
            text: show.name,
            description: [
              show.premiered?.slice(0, 4),
              Array.isArray(show.genres) ? show.genres.slice(0, 2).join(", ") : "",
              show.network?.name || show.webChannel?.name || "",
            ].filter(Boolean).join(" · "),
            category: "TV Shows",
          }));
      },
    },
  },
};

<pds-tags
  name="favoriteShows"
  placeholder="Search TV shows (e.g. office, star trek, dark)..."
  ${"${lazyProps({ options })}"}
></pds-tags>`;

const docsParameters = {
  description: {
    component: "Compound multi-select built with pds-omnibox. Select/unselect values from suggestions and manage them as tags.",
  },
};

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-tags");
    })
    .catch((error) => {
      console.warn(
        "storybook: docs page failed to load for pds-tags",
        error,
      );
    });
}

export default {
  title: "Components/pds-tags",
  tags: ["autodocs", "forms", "autocomplete", "multiselect", "pds-tags"],
  parameters: {
    pds: {
      tags: ["forms", "autocomplete", "multiselect", "pds-tags"],
    },
    docs: docsParameters,
  },
  argTypes: {
    name: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

const Template = ({ name, placeholder, value, required, disabled }) => html`
  <div class="stack-md">
    <pds-tags
      name=${name}
      placeholder=${placeholder}
      value=${value}
      ?required=${required}
      ?disabled=${disabled}
      data-options-source=${languageOptionsSource}
      ${lazyProps({ options: languageOptions })}
    ></pds-tags>
  </div>
`;

const FormTemplate = ({ required }) => {
  setTimeout(() => {
    const form = document.querySelector("#tags-form");
    const output = document.querySelector("#tags-output");
    if (!form || !output || form.dataset.bound === "true") return;

    form.dataset.bound = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        output.textContent = "Form invalid";
        return;
      }
      const data = new FormData(form);
      const languages = data.getAll("languages");
      output.textContent = JSON.stringify({ languages }, null, 2);
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        output.textContent = "{}";
      }, 0);
    });
  }, 0);

  return html`
    <section class="card stack-md">
      <h4>Form Integration</h4>
      <form id="tags-form" class="stack-md">
        <pds-tags
          name="languages"
          placeholder="Select one or more languages..."
          ?required=${required}
          data-options-source=${languageOptionsSource}
          ${lazyProps({ options: languageOptions })}
        ></pds-tags>
        <div class="flex gap-sm">
          <button class="btn-primary" type="submit">Submit</button>
          <button class="btn-secondary" type="reset">Reset</button>
        </div>
      </form>
      <pre id="tags-output" class="card surface-subtle">{}</pre>
    </section>
  `;
};

export const Default = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "et,bd,nl",
    required: false,
    disabled: false,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
};

export const Empty = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "",
    required: false,
    disabled: false,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
};

export const Required = {
  args: {
    name: "languages",
    placeholder: "Select at least one language...",
    value: "",
    required: true,
    disabled: false,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
};

export const Disabled = {
  args: {
    name: "languages",
    placeholder: "Zoek taal...",
    value: "et,nl",
    required: false,
    disabled: true,
  },
  render: Template,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: languageOptionsSource,
      },
    },
  },
};

export const GroupedOptions = {
  args: {
    name: "selections",
    placeholder: "Search languages, skills, or tools...",
    value: "nl,wc,figma",
    required: false,
    disabled: false,
  },
  render: ({ name, placeholder, value, required, disabled }) => html`
    <div class="stack-md">
      <pds-tags
        name=${name}
        placeholder=${placeholder}
        value=${value}
        ?required=${required}
        ?disabled=${disabled}
        data-options-source=${groupedOptionsSource}
        ${lazyProps({ options: groupedOptions })}
      ></pds-tags>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: groupedOptionsSource,
      },
    },
  },
};

export const FormSubmission = {
  args: {
    required: true,
  },
  render: FormTemplate,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: formOptionsSource,
      },
    },
  },
};

export const PublicApiTvShows = {
  args: {
    name: "favoriteShows",
    placeholder: "Search TV shows (e.g. office, star trek, dark)...",
    value: "",
    required: false,
    disabled: false,
  },
  render: ({ name, placeholder, value, required, disabled }) => html`
    <div class="stack-md">
      <p class="text-muted">Results are fetched live from the public TVMaze API (no API key required).</p>
      <pds-tags
        name=${name}
        placeholder=${placeholder}
        value=${value}
        ?required=${required}
        ?disabled=${disabled}
        data-options-source=${tvMazeOptionsSource}
        ${lazyProps({ options: tvMazeOptions })}
      ></pds-tags>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        type: "code",
        code: tvMazeOptionsSource,
      },
    },
  },
};

export const FactTags = {
  render: () => {
    ensureGlobalFactTagsIconFallback();
    return html`
    <div class="stack-md">
      <p class="text-muted">
        Pick facts from suggestions, or type anything to create your own —
        an icon is matched automatically from the icon library.
      </p>
      <pds-tags
        @icon-not-found=${handleIconNotFound}
        name="facts"
        placeholder="Search or create a personal fact..."
        data-options-source=${factsOptionsSource}
        ${lazyProps({ options: factsOptions })}
      ></pds-tags>
    </div>
  `;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select predefined personal facts with matching icons, or type freely to create new ones. " +
          "When typing something that does not match a suggestion, a 'Create New' option appears with an " +
          "automatically matched icon sourced from the PDS icon keyword index (`icons_en.json`).",
      },
      source: {
        type: "code",
        code: factsOptionsSource,
      },
    },
  },
};
