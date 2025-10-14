export const config = {
  

  // Auto-define configuration for web components
  autoDefine: {
    baseURL: "/assets/late/",
    enhancers: [
      {
        selector: "data-dropdown",
        run: (elem) => {
          console.log("Enhance dropdown", elem);

          const menu = elem.querySelector("menu");

          const toggle = () => {
            const isCurrentlyVisible = menu.style.display !== "none";
            console.log("Toggle dropdown", !isCurrentlyVisible);
            menu.style.display = isCurrentlyVisible ? "none" : "block";
          };

          // Initially hide the menu
          menu.style.display = "none";

          elem.addEventListener("click", toggle);
        },
      },
    ],
  },
};
