import { PDS } from "#pds";

const MIN_QUERY_COUNTRIES = 2;
const MIN_QUERY_WIKIPEDIA = 2;
const MIN_QUERY_BOOKS = 3;

let countriesPromise;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toQuery = (value) => String(value || "").trim().toLowerCase();

const loadCountries = async () => {
  if (!countriesPromise) {
    countriesPromise = fetch("https://restcountries.com/v3.1/all?fields=name,cca2,region")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Countries API failed: ${response.status}`);
        }
        return response.json();
      })
      .then((rows) =>
        rows
          .map((row) => ({
            id: row?.cca2 || row?.name?.common || "",
            text: row?.name?.common || "",
            description: row?.region || "Country",
            icon: "globe",
          }))
          .filter((item) => item.id && item.text)
          .sort((a, b) => a.text.localeCompare(b.text)),
      );
  }

  return countriesPromise;
};

const searchWikipedia = async (query, signal) => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=8&namespace=0&format=json&origin=*`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Wikipedia API failed: ${response.status}`);
  }

  const payload = await response.json();
  const titles = Array.isArray(payload?.[1]) ? payload[1] : [];
  const descriptions = Array.isArray(payload?.[2]) ? payload[2] : [];
  const urls = Array.isArray(payload?.[3]) ? payload[3] : [];

  return titles.map((title, index) => ({
    id: urls[index] || `wiki-${index}`,
    text: title,
    description: descriptions[index] || "Wikipedia article",
    url: urls[index] || "",
    icon: "book-open",
  }));
};

const searchOpenLibrary = async (query, signal) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Open Library API failed: ${response.status}`);
  }

  const payload = await response.json();
  const docs = Array.isArray(payload?.docs) ? payload.docs : [];

  return docs.map((item) => ({
    id: item?.key || item?.cover_edition_key || item?.title || "",
    text: item?.title || "Untitled",
    description: item?.author_name?.[0]
      ? `by ${item.author_name[0]}`
      : "Open Library result",
    icon: "book-open",
    url: item?.key ? `https://openlibrary.org${item.key}` : "",
  }));
};

const quickCommands = [
  {
    id: "open-settings",
    text: "Open settings",
    description: "Fast local command",
    icon: "gear",
  },
  {
    id: "new-ticket",
    text: "Create support ticket",
    description: "Fast local command",
    icon: "lifebuoy",
  },
  {
    id: "release-notes",
    text: "Draft release notes",
    description: "Fast local command",
    icon: "note-pencil",
  },
  {
    id: "invite-user",
    text: "Invite a teammate",
    description: "Fast local command",
    icon: "user-plus",
  },
];

const localTeamDirectory = [
  {
    id: "ana-ops",
    text: "Ana Silva",
    description: "Operations",
    icon: "user",
  },
  {
    id: "mike-design",
    text: "Mike Tavares",
    description: "Design",
    icon: "user",
  },
  {
    id: "ravi-platform",
    text: "Ravi Nair",
    description: "Platform",
    icon: "user",
  },
  {
    id: "emma-product",
    text: "Emma Duval",
    description: "Product",
    icon: "user",
  },
];

const filterByQuery = (items, query) => {
  if (!query) return items;
  return items.filter((item) => {
    const haystack = `${item.id} ${item.text} ${item.description || ""}`.toLowerCase();
    return haystack.includes(query);
  });
};

const handleSelection = (item = {}) => {
  const text = item?.text || item?.id || "item";
  const source = item?.category || "category";
  PDS.toast(`Selected: ${text} (${source})`, {
    type: "information",
  });
};

export const realLifeAsyncOmniboxSettingsSource = `const settings = {
  progressive: true,
  maxConcurrentCategories: 3,
  categoryTimeoutMs: 7000,
  categories: {
    Commands: {
      sortIndex: 10,
      trigger: () => true,
      getItems: async (options) => {
        // Fast local list: appears immediately.
      },
    },
    Team: {
      sortIndex: 9,
      trigger: (options) => (options.search || "").trim().length > 0,
      getItems: async (options) => {
        // Fast local filtering.
      },
    },
    CountriesApi: {
      sortIndex: 7,
      trigger: (options) => (options.search || "").trim().length >= 2,
      getItems: async (options) => {
        // Real API: https://restcountries.com
      },
    },
    WikipediaApi: {
      sortIndex: 6,
      trigger: (options) => (options.search || "").trim().length >= 2,
      getItems: async (options) => {
        // Real API: https://www.mediawiki.org/wiki/API:Opensearch
      },
    },
    BooksApiSlow: {
      sortIndex: 5,
      trigger: (options) => (options.search || "").trim().length >= 3,
      getItems: async (options) => {
        // Real API: https://openlibrary.org/developers/api
        // Intentionally delayed to demo progressive updates.
      },
    },
  },
};`;

export const realLifeAsyncOmniboxSettings = {
  progressive: true,
  maxConcurrentCategories: 3,
  categoryTimeoutMs: 7000,
  hideCategory: false,
  iconHandler: (item) =>
    item.icon
      ? `<pds-icon icon="${item.icon}" size="sm"></pds-icon>`
      : null,
  categories: {
    Commands: {
      sortIndex: 10,
      useIconForInput: true,
      trigger: () => true,
      getItems: async (options) => {
        const query = toQuery(options.search);
        return filterByQuery(quickCommands, query).slice(0, 5);
      },
      action: handleSelection,
    },
    Team: {
      sortIndex: 9,
      trigger: (options) => toQuery(options.search).length > 0,
      getItems: async (options) => {
        const query = toQuery(options.search);
        return filterByQuery(localTeamDirectory, query).slice(0, 5);
      },
      action: handleSelection,
    },
    CountriesApi: {
      sortIndex: 7,
      trigger: (options) => toQuery(options.search).length >= MIN_QUERY_COUNTRIES,
      getItems: async (options) => {
        const query = toQuery(options.search);
        const countries = await loadCountries();
        return countries
          .filter((item) => item.text.toLowerCase().includes(query))
          .slice(0, 10);
      },
      action: handleSelection,
    },
    WikipediaApi: {
      sortIndex: 6,
      trigger: (options) => toQuery(options.search).length >= MIN_QUERY_WIKIPEDIA,
      getItems: async (options) => {
        const query = toQuery(options.search);
        const results = await searchWikipedia(query, options?.signal);
        return results.slice(0, 8);
      },
      action: (item = {}) => {
        handleSelection(item);
        if (item.url) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      },
    },
    BooksApiSlow: {
      sortIndex: 5,
      trigger: (options) => toQuery(options.search).length >= MIN_QUERY_BOOKS,
      getItems: async (options) => {
        const query = toQuery(options.search);
        // Intentionally slower to demonstrate partial progressive rendering.
        await sleep(900);
        const results = await searchOpenLibrary(query, options?.signal);
        return results.slice(0, 8);
      },
      action: (item = {}) => {
        handleSelection(item);
        if (item.url) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      },
    },
  },
};
