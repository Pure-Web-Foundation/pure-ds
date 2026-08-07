const COUNTRY_ITEMS = [
  { id: "AR", text: "Argentina", icon: "globe" },
  { id: "AU", text: "Australia", icon: "globe" },
  { id: "BR", text: "Brazil", icon: "globe" },
  { id: "CA", text: "Canada", icon: "globe" },
  { id: "CN", text: "China", icon: "globe" },
  { id: "DK", text: "Denmark", icon: "globe" },
  { id: "EG", text: "Egypt", icon: "globe" },
  { id: "FI", text: "Finland", icon: "globe" },
  { id: "FR", text: "France", icon: "globe" },
  { id: "DE", text: "Germany", icon: "globe" },
  { id: "IN", text: "India", icon: "globe" },
  { id: "IE", text: "Ireland", icon: "globe" },
  { id: "IT", text: "Italy", icon: "globe" },
  { id: "JP", text: "Japan", icon: "globe" },
  { id: "MX", text: "Mexico", icon: "globe" },
  { id: "NL", text: "Netherlands", icon: "globe" },
  { id: "NZ", text: "New Zealand", icon: "globe" },
  { id: "NO", text: "Norway", icon: "globe" },
  { id: "PL", text: "Poland", icon: "globe" },
  { id: "PT", text: "Portugal", icon: "globe" },
  { id: "ZA", text: "South Africa", icon: "globe" },
  { id: "KR", text: "South Korea", icon: "globe" },
  { id: "ES", text: "Spain", icon: "globe" },
  { id: "SE", text: "Sweden", icon: "globe" },
  { id: "CH", text: "Switzerland", icon: "globe" },
  { id: "TR", text: "Turkey", icon: "globe" },
  { id: "GB", text: "United Kingdom", icon: "globe" },
  { id: "US", text: "United States", icon: "globe" },
  { id: "VN", text: "Vietnam", icon: "globe" },
  { id: "AE", text: "United Arab Emirates", icon: "globe" },
].sort((a, b) => a.text.localeCompare(b.text));

const loadCountries = async () => COUNTRY_ITEMS;

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
