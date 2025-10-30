
import { PDS } from "./pds";
  
export const config = {
  // Design system configuration
  design: {
    ...PDS.defaultConfig,
  },

  // Auto-define configuration for web components
  autoDefine: {
    baseURL: "/auto-define/",
    predefine: ["pds-icon"],
    mapper: (tag) => {
      //console.log(tag)

      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    },

    onError: (tag, err) => {
      console.error(`Auto-define error for <${tag}>:`, err);
    },

    // Critical options for observing dynamically added components
    scanExisting: true, // Scan DOM on initialization
    observeShadows: true, // Observe inside shadow DOMs (for Lit components)
    patchAttachShadow: true, // Intercept attachShadow to observe new shadow roots
    debounceMs: 16, // Debounce for performance
    enhancers: [
      {
        selector: "nav[data-dropdown]",
        demoHtml: () => /*html*/ `
          <nav data-dropdown>
            <button class="btn-primary">Menu</button>
            <menu style="display:none">
              <li><a href="#">Item 1</a></li>
              <li><a href="#">Item 2</a></li>
            </menu>
        </nav>`,
        run: (elem) => {
          // Prevent duplicate enhancement
          if (elem.dataset.enhancedDropdown) return;
          elem.dataset.enhancedDropdown = "true";

          //console.log("Enhance dropdown", elem);

          elem.style.position = "relative";
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
      {
        selector: "label[data-toggle]",
        demoHtml: () => /*html*/ `<label data-toggle>
          <span data-label>Enable notifications</span>
          <input type="checkbox">
        </label>`,
        run: (elem) => {
          // Prevent duplicate enhancement
          if (elem.dataset.enhancedToggle) return;
          elem.dataset.enhancedToggle = "true";

          const checkbox = elem.querySelector('input[type="checkbox"]');
          if (!checkbox) {
            console.warn(
              "Toggle enhancer: no checkbox found inside label[data-toggle]",
              elem
            );
            return;
          }

          // Create toggle switch UI with proper semantic structure
          const toggleSwitch = document.createElement("span");
          toggleSwitch.className = "toggle-switch";
          toggleSwitch.setAttribute("role", "presentation");
          toggleSwitch.setAttribute("aria-hidden", "true");

          // Create the toggle knob
          const knob = document.createElement("span");
          knob.className = "toggle-knob";
          toggleSwitch.appendChild(knob);

          // Find the label text span and insert toggle before it
          const labelSpan = elem.querySelector("span[data-label]");
          if (labelSpan) {
            elem.insertBefore(toggleSwitch, labelSpan);
          } else {
            elem.appendChild(toggleSwitch);
          }

          // Handle label clicks to toggle the checkbox
          elem.addEventListener("click", (e) => {
            if (checkbox.disabled) return;

            // Prevent default label behavior
            e.preventDefault();
            // Toggle the checkbox programmatically
            checkbox.checked = !checkbox.checked;
            // Dispatch change event so form handlers work
            checkbox.dispatchEvent(new Event("change", { bubbles: true }));
          });
        },
      },
      {
        selector: 'input[type="range"]',
        demoHtml: (elem) => {
          const min = elem.getAttribute("min") || 0;
          const max = elem.getAttribute("max") || 100;
          const value = elem.getAttribute("value") || elem.value || 0;
          return /*html*/ `<input type="range" min="${min}" max="${max}" value="${value}">`;
        },
        run: (elem) => {
          if (elem.dataset.enhancedRange) return;

          // Wrap the input in a range-container if not already
          let container = elem.closest(".range-container");
          if (!container) {
            container = document.createElement("div");
            container.className = "range-container";
            elem.parentNode.insertBefore(container, elem);
            container.appendChild(elem);
          }

          container.style.position = "relative";

          // Create the floating bubble
          const bubble = document.createElement("div");
          bubble.className = "range-bubble";
          bubble.setAttribute("aria-hidden", "true");
          container.appendChild(bubble);

          const updateBubble = () => {
            const min = parseFloat(elem.min) || 0;
            const max = parseFloat(elem.max) || 100;
            const value = parseFloat(elem.value);
            const pct = (value - min) / (max - min);
            // Position bubble horizontally over thumb
            bubble.style.left = `calc(${pct * 100}% )`;
            bubble.textContent = String(value);
          };

          // Show/hide on interaction
          const show = () => bubble.classList.add("visible");
          const hide = () => bubble.classList.remove("visible");

          elem.addEventListener("input", updateBubble);
          elem.addEventListener("pointerdown", show);
          elem.addEventListener("pointerup", hide);
          elem.addEventListener("pointerleave", hide);
          elem.addEventListener("focus", show);
          elem.addEventListener("blur", hide);

          // Initialize
          updateBubble();

          elem.dataset.enhancedRange = "1";
        },
      },
    ],
  },
};
