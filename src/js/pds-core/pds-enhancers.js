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

      // Ensure toggle button doesn't submit forms by default
      const btn = elem.querySelector("button");

      // Ensure positioning context and predictable absolute placement for the menu
      try {
        const cs = getComputedStyle(elem);
        if (cs && cs.position === "static") {
          // Avoid layout shifts by only setting when not already positioned
          elem.style.position = "relative";
        }
      } catch {}
      if (!menu.style.position) menu.style.position = "absolute";
      // Default to left alignment; may be overridden by placeHorizontal()
      if (!menu.style.left && !menu.style.right) {
        menu.style.left = "0";
        menu.style.right = "auto";
      }
      // Set minimum width to match the button width
      if (btn) {
        try {
          const btnWidth = btn.offsetWidth;
          if (btnWidth > 0) {
            menu.style.minWidth = `${btnWidth}px`;
          }
        } catch {}
      }
      if (btn && !btn.hasAttribute("type")) {
        btn.setAttribute("type", "button");
      }

      // Accessibility attributes
      if (btn) {
        btn.setAttribute("aria-haspopup", "true");
        btn.setAttribute("aria-expanded", "false");
      }
      menu.setAttribute("role", menu.getAttribute("role") || "menu");
      menu.setAttribute("aria-hidden", "true");

      // Ensure initial hidden state
      menu.style.display = "none";

      const placeMenu = (direction) => {
        if (direction === "up") {
          menu.style.top = "auto";
          menu.style.bottom = "100%";
          menu.style.marginTop = "";
          menu.style.marginBottom = "var(--spacing-2)";
        } else {
          menu.style.top = "100%";
          menu.style.bottom = "auto";
          menu.style.marginBottom = "";
          menu.style.marginTop = "var(--spacing-2)";
        }
      };

      // Horizontal alignment helper: support nav[data-dropdown].align-right
      const placeHorizontal = () => {
        const alignRight = elem.classList.contains("align-right");
        if (alignRight) {
          menu.style.right = "0";
          menu.style.left = "auto";
        } else {
          menu.style.left = "0";
          menu.style.right = "auto";
        }
      };

      const computeAutoDirection = () => {
        // Choose the direction with the most vertical space available.
        // This is simpler and more robust for very long menus: prefer the
        // direction that gives the user the most room and allow the menu to
        // scroll when needed.
        const rect = elem.getBoundingClientRect();
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
        const spaceAbove = Math.max(0, rect.top);
        return spaceAbove > spaceBelow ? "up" : "down";
      };

      const showMenu = () => {
        const mode = (elem.getAttribute("data-mode") || "auto").toLowerCase();
        let dir = mode;
        if (mode === "auto") {
          dir = computeAutoDirection();
        }
        placeMenu(dir);
        placeHorizontal();
        // Constrain menu height to available viewport space and allow scrolling
        // when content exceeds that height. Add a tiny safety margin.
        const rect = elem.getBoundingClientRect();
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
        const spaceAbove = Math.max(0, rect.top);
        const available = dir === "up" ? spaceAbove : spaceBelow;
        const maxHeight = Math.max(0, available - 8); // 8px margin
        if (maxHeight > 0) {
          menu.style.maxHeight = `${maxHeight}px`;
          menu.style.overflowY = "auto";
        } else {
          // Fallback: allow the menu to grow but still scroll if needed
          menu.style.maxHeight = "60vh";
          menu.style.overflowY = "auto";
        }

        menu.style.display = "block";
        menu.setAttribute("aria-hidden", "false");
        if (btn) btn.setAttribute("aria-expanded", "true");
      };

      const hideMenu = () => {
        menu.style.display = "none";
        menu.setAttribute("aria-hidden", "true");
        if (btn) btn.setAttribute("aria-expanded", "false");
      };

      const toggle = (e) => {
        // If event originates from a link inside the menu, let it proceed
        if (e && e.target && e.target.closest && e.target.closest("menu"))
          return;
        const isVisible = menu.style.display !== "none";
        if (isVisible) hideMenu();
        else showMenu();
      };

      // Click only on the toggle button should open/close; clicks inside menu
      // should be handled normally. Close when clicking outside.
      if (btn)
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          toggle(ev);
        });
      // Close on outside click
      document.addEventListener("click", (ev) => {
        if (!elem.contains(ev.target)) hideMenu();
      });

      // Also close on Escape
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") hideMenu();
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
