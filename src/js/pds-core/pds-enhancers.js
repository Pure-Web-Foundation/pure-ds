export const defaultPDSEnhancers = [
  {
    selector: "nav[data-dropdown]",
    description:
      "Enhances a nav element with data-dropdown to function as a dropdown menu.",
    demoHtml: () => /*html*/ `
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu>
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
        </menu>
      </nav>`,
    run: (elem) => {
      if (elem.dataset.enhancedDropdown) return;
      elem.dataset.enhancedDropdown = "true";
      const menu = elem.querySelector("menu");
      if (!menu) return;

      const trigger =
        elem.querySelector("[data-dropdown-toggle]") ||
        elem.querySelector("button");

      if (trigger && !trigger.hasAttribute("type")) {
        trigger.setAttribute("type", "button");
      }

      if (!menu.id) {
        menu.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`;
      }

      menu.setAttribute("role", menu.getAttribute("role") || "menu");
      if (!menu.hasAttribute("aria-hidden")) {
        menu.setAttribute("aria-hidden", "true");
      }

      if (trigger) {
        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-controls", menu.id);
        trigger.setAttribute("aria-expanded", "false");
      }

      const resolveDirection = () => {
        const mode = (elem.getAttribute("data-mode") || "auto").toLowerCase();
        if (mode === "up" || mode === "down") return mode;
        const rect = elem.getBoundingClientRect();
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
        const spaceAbove = Math.max(0, rect.top);
        return spaceAbove > spaceBelow ? "up" : "down";
      };

      const openMenu = () => {
        elem.dataset.dropdownDirection = resolveDirection();
        menu.setAttribute("aria-hidden", "false");
        trigger?.setAttribute("aria-expanded", "true");
      };

      const closeMenu = () => {
        menu.setAttribute("aria-hidden", "true");
        trigger?.setAttribute("aria-expanded", "false");
      };

      const toggleMenu = () => {
        if (menu.getAttribute("aria-hidden") === "false") {
          closeMenu();
        } else {
          openMenu();
        }
      };

      trigger?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
      });

      document.addEventListener("click", (event) => {
        if (!elem.contains(event.target)) {
          closeMenu();
        }
      });

      elem.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          trigger?.focus();
        }
      });

      elem.addEventListener("focusout", (event) => {
        if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
          closeMenu();
        }
      });
    },
  },
  {
    selector: "label[data-toggle]",
    description: "Creates a toggle switch element from a checkbox.",
    demoHtml: () => `<label data-toggle>
      <input type="checkbox">
      <span data-label>Enable notifications</span>
    </label>`,
    run: (elem) => {
      if (elem.dataset.enhancedToggle) return;
      elem.dataset.enhancedToggle = "true";
      const checkbox = elem.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      // Make the label keyboard accessible
      if (!elem.hasAttribute("tabindex")) {
        elem.setAttribute("tabindex", "0");
      }

      // Set ARIA attributes for proper screen reader support
      elem.setAttribute("role", "switch");
      elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");

      const toggleSwitch = document.createElement("span");
      toggleSwitch.className = "toggle-switch";
      toggleSwitch.setAttribute("role", "presentation");
      toggleSwitch.setAttribute("aria-hidden", "true");
      const knob = document.createElement("span");
      knob.className = "toggle-knob";
      toggleSwitch.appendChild(knob);
      
      // Always insert toggle switch after the checkbox input
      // CSS will handle the visual positioning based on DOM order
      elem.insertBefore(toggleSwitch, checkbox.nextSibling);

      // Toggle function
      const toggle = () => {
        if (checkbox.disabled) return;
        checkbox.checked = !checkbox.checked;
        elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
      };

      elem.addEventListener("click", (e) => {
        e.preventDefault();
        toggle();
      });

      // Keyboard accessibility
      elem.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      });

      // Update aria-checked when checkbox changes programmatically
      checkbox.addEventListener("change", () => {
        elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
      });
    },
  },
  {
    selector: 'input[type="range"]',
    description: "Enhances range inputs with an attached <output>.",
    demoHtml: (elem) => {
      return `
      <label class="range-output">
        <span data-label>Volume</span>
        <input type="range" min="${min}" max="${max}" value="${value}">
      </label>`;
    },
    run: (elem) => {
      if (elem.dataset.enhancedRange) return;

      const label = elem.closest("label");
      const hasRangeOutputClass = label?.classList.contains("range-output");

      // Generate unique IDs for accessibility
      const inputId =
        elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
      const outputId = `${inputId}-output`;
      elem.id = inputId;

      if (hasRangeOutputClass) {
        // Handle label.range-output: inline output display
        const labelSpan = label.querySelector("span");
        if (
          labelSpan &&
          !labelSpan.classList.contains("range-output-wrapper")
        ) {
          // Wrap existing content in flex container
          const wrapper = document.createElement("span");
          wrapper.className = "range-output-wrapper";
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "space-between";
          wrapper.style.alignItems = "center";

          // Move label text into wrapper
          const textSpan = document.createElement("span");
          textSpan.textContent = labelSpan.textContent;
          wrapper.appendChild(textSpan);

          // Create output element
          const output = document.createElement("output");
          output.id = outputId;
          output.setAttribute("for", inputId);
          output.style.color =
            "var(--surface-text-secondary, var(--color-text-secondary))";
          output.style.fontSize = "0.875rem";
          output.textContent = elem.value;
          wrapper.appendChild(output);

          // Replace labelSpan content with wrapper
          labelSpan.textContent = "";
          labelSpan.appendChild(wrapper);

          // Update output on input
          const updateOutput = () => {
            output.textContent = elem.value;
          };
          elem.addEventListener("input", updateOutput);
        }
      } else {
        // Handle standard case: floating bubble
        let container = elem.closest(".range-container");
        if (!container) {
          container = document.createElement("div");
          container.className = "range-container";
          elem.parentNode?.insertBefore(container, elem);
          container.appendChild(elem);
        }
        container.style.position = "relative";

        // Use semantic <output> instead of <div>
        const bubble = document.createElement("output");
        bubble.id = outputId;
        bubble.setAttribute("for", inputId);
        bubble.className = "range-bubble";
        bubble.setAttribute("aria-live", "polite");
        container.appendChild(bubble);

        const updateBubble = () => {
          const min = parseFloat(elem.min) || 0;
          const max = parseFloat(elem.max) || 100;
          const value = parseFloat(elem.value);
          const pct = (value - min) / (max - min);
          bubble.style.left = `calc(${pct * 100}% )`;
          bubble.textContent = String(value);
        };
        const show = () => bubble.classList.add("visible");
        const hide = () => bubble.classList.remove("visible");
        elem.addEventListener("input", updateBubble);
        elem.addEventListener("pointerdown", show);
        elem.addEventListener("pointerup", hide);
        elem.addEventListener("pointerleave", hide);
        elem.addEventListener("focus", show);
        elem.addEventListener("blur", hide);
        updateBubble();
      }

      elem.dataset.enhancedRange = "1";
    },
  },
  {
    selector: "form [required]",
    description:
      "Enhances required form fields using an asterisk in the label.",
    demoHtml: () => /*html*/ `
      <label>
        <span>Field Label</span>
        <input type="text" required>
      </label>
    `,
    run: (elem) => {
      const label = elem.closest("label");
      if (label) {
        if (label.querySelector(".required-asterisk")) return;

        const asterisk = document.createElement("span");
        asterisk.classList.add("required-asterisk");
        asterisk.textContent = "*";
        asterisk.style.marginLeft = "4px";
        label.querySelector("span").appendChild(asterisk);

        const form = elem.closest("form");

        // insert legend for asterisk meaning if not already present
        if (form && !form.querySelector(".required-legend")) {
          const legend = document.createElement("div");
          legend.classList.add("required-legend", "pill", "pill-outline");
          legend.style.fontSize = "0.9em";
          legend.style.marginBottom = "8px";
          legend.textContent = "* Required fields";
          form.insertBefore(
            legend,
            form.querySelector(".form-actions") || form.lastElementChild
          );
        }
      }
    },
  },
  {
    selector: "fieldset[role=group][data-open]",
    description:
      "Enhances a checkbox/radio group to be open (have a way to add and remove items).",
    demoHtml: () => /*html*/ `
      <fieldset role="group" data-open>
        <label>
          <span data-label>Test</span>
          <input value="lala" name="test1" type="radio" />
        </label>
      </fieldset>
    `,
    run: (elem) => {
      if (elem.dataset.enhancedOpenGroup) return;
      elem.dataset.enhancedOpenGroup = "true";

      elem.classList.add("flex", "flex-wrap", "buttons");

      const addInput = document.createElement("input");
      addInput.type = "text";
      addInput.placeholder = "Add item...";
      addInput.classList.add("input-text", "input-sm");
      addInput.style.width = "auto";
      const firstInput = elem.querySelector(
        'input[type="radio"], input[type="checkbox"]'
      );

      elem.appendChild(addInput);
      addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "Tab") {
          const value = addInput.value.trim();
          if (value) {
            e.preventDefault();

            const type = firstInput.type === "radio" ? "radio" : "checkbox";
            const id = `open-group-${Math.random()
              .toString(36)
              .substring(2, 11)}`;
            const label = document.createElement("label");

            // Create span with data-label attribute
            const span = document.createElement("span");
            span.setAttribute("data-label", "");
            span.textContent = value;

            // Create input
            const input = document.createElement("input");
            input.type = type;
            input.name =
              firstInput.name || elem.getAttribute("data-name") || "open-group";
            input.value = value;
            input.id = id;

            // Append in correct order: span first, then input
            label.appendChild(span);
            label.appendChild(input);

            elem.insertBefore(label, addInput);
            addInput.value = "";
          }
        } else if (e.key === "Backspace" && addInput.value === "") {
          // Remove the last added item if input is empty
          e.preventDefault();
          const labels = elem.querySelectorAll("label");
          if (labels.length > 0) {
            const lastLabel = labels[labels.length - 1];
            lastLabel.remove();
          }
        }
      });
    },
  },
  {
    selector: "button, a[class*='btn-']",
    description:
      "Automatically manages spinner icon for buttons with .btn-working class",
    run: (elem) => {
      if (elem.dataset.enhancedBtnWorking) return;
      elem.dataset.enhancedBtnWorking = "true";

      // Store original icon if exists
      let originalIcon = null;
      let addedIcon = false;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const hasWorking = elem.classList.contains("btn-working");
            const icon = elem.querySelector("pds-icon");

            if (hasWorking) {
              if (icon) {
                // Store and replace existing icon
                if (!originalIcon) {
                  originalIcon = icon.getAttribute("icon");
                }
                icon.setAttribute("icon", "circle-notch");
              } else {
                // Add spinner icon if none exists
                const newIcon = document.createElement("pds-icon");
                newIcon.setAttribute("icon", "circle-notch");
                newIcon.setAttribute("size", "sm");
                elem.insertBefore(newIcon, elem.firstChild);
                addedIcon = true;
              }
            } else if (mutation.oldValue?.includes("btn-working")) {
              // Restore or remove icon when btn-working is removed
              if (icon) {
                if (addedIcon) {
                  icon.remove();
                  addedIcon = false;
                } else if (originalIcon) {
                  icon.setAttribute("icon", originalIcon);
                  originalIcon = null;
                }
              }
            }
          }
        });
      });

      observer.observe(elem, {
        attributes: true,
        attributeFilter: ["class"],
        attributeOldValue: true,
      });
    },
  },
];
