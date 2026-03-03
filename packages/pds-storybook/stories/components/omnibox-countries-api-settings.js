let countryListPromise;

const loadCountries = async () => {
  if (!countryListPromise) {
    countryListPromise = fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch countries: ${res.status}`);
        }
        return res.json();
      })
      .then((rows) =>
        rows
          .map((row) => ({
            id: row?.cca2 || row?.name?.common || "",
            text: row?.name?.common || "",
            icon: "globe",
          }))
          .filter((row) => row.id && row.text)
          .sort((a, b) => a.text.localeCompare(b.text)),
      );
  }

  return countryListPromise;
};

export const countriesApiSettings = {
  hideCategory: true,
  itemGrid: "0 1fr 0",
  iconHandler: () => "",
  categories: {
    Featured: {
      sortIndex: 2,
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || "").trim().toLowerCase();
        const shortlist = [
          { id: "NL", text: "Netherlands" },
          { id: "US", text: "United States" },
        ];

        return q
          ? shortlist.filter((item) => item.text.toLowerCase().includes(q))
          : shortlist;
      },
      useIconForInput: false,
    },
    Countries: {
      sortIndex: 1,
      trigger: (options) => (options.search || "").trim().length >= 2,
      getItems: async (options) => {
        const q = (options.search || "").trim().toLowerCase();
        if (!q) return [];

        const countries = await loadCountries();
        return countries
          .filter((item) => item.text.toLowerCase().includes(q))
          .slice(0, 30);
      },
      useIconForInput: false,
    },
  },
};
