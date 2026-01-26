/**
 * PDS Enhancers - Single Source of Truth
 * 
 * This file defines all progressive enhancements for the Pure Design System.
 * Each enhancer has:
 * - selector: CSS selector to target elements
 * - run: Enhancement function (added at the end)
 */

// ============================================================================
// ENHANCEMENT RUNTIME DEFINITIONS
// ============================================================================

const enhancerDefinitions = [
  { selector: ".accordion" },
  { selector: "nav[data-dropdown]" },
  { selector: "label[data-toggle]" },
  { selector: 'input[type="range"]' },
  { selector: "form[data-required]" },
  { selector: "fieldset[role=group][data-open]" },
  { selector: "[data-clip]" },
  { selector: "button, a[class*='btn-']" },
];

// ============================================================================
// ENHANCEMENT RUNTIME FUNCTIONS
// ============================================================================

function enhanceAccordion(elem) {
  if (elem.dataset.enhancedAccordion) return;
  elem.dataset.enhancedAccordion = "true";

  elem.addEventListener("toggle", (event) => {
    // Only handle toggle events from direct child details elements
    // to avoid closing parent details when nested accordions are used
    if (event.target.open && event.target.parentElement === elem) {
      elem.querySelectorAll(":scope > details[open]").forEach((details) => {
        if (details !== event.target) {
          details.open = false;
        }
      });
    }
  }, true);
}

function enhanceDropdown(elem) {
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
}

function enhanceToggle(elem) {
  if (elem.dataset.enhancedToggle) return;
  elem.dataset.enhancedToggle = "true";
  const checkbox = elem.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }

  elem.setAttribute("role", "switch");
  elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");

  const toggleSwitch = document.createElement("span");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.setAttribute("role", "presentation");
  toggleSwitch.setAttribute("aria-hidden", "true");
  const knob = document.createElement("span");
  knob.className = "toggle-knob";
  toggleSwitch.appendChild(knob);
  elem.insertBefore(toggleSwitch, checkbox.nextSibling);

  const updateAria = () => {
    elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
  };

  const toggle = () => {
    if (checkbox.disabled) return;
    checkbox.checked = !checkbox.checked;
    updateAria();
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  };

  elem.addEventListener("click", (event) => {
    event.preventDefault();
    toggle();
  });

  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  });

  checkbox.addEventListener("change", updateAria);
}

function enhanceRange(elem) {
  if (elem.dataset.enhancedRange) return;

  const label = elem.closest("label");
  const hasRangeOutputClass = label?.classList.contains("range-output");

  const inputId =
    elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
  const outputId = `${inputId}-output`;
  elem.id = inputId;

  if (hasRangeOutputClass) {
    const labelSpan = label.querySelector("span");
    if (labelSpan && !labelSpan.classList.contains("range-output-wrapper")) {
      const wrapper = document.createElement("span");
      wrapper.className = "range-output-wrapper";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";

      const textSpan = document.createElement("span");
      textSpan.textContent = labelSpan.textContent;
      wrapper.appendChild(textSpan);

      const output = document.createElement("output");
      output.id = outputId;
      output.setAttribute("for", inputId);
      output.style.color =
        "var(--surface-text-secondary, var(--color-text-secondary))";
      output.style.fontSize = "0.875rem";
      output.textContent = elem.value;
      wrapper.appendChild(output);

      labelSpan.textContent = "";
      labelSpan.appendChild(wrapper);

      const updateOutput = () => {
        output.textContent = elem.value;
      };
      elem.addEventListener("input", updateOutput);
    }
  } else {
    let container = elem.closest(".range-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "range-container";
      elem.parentNode?.insertBefore(container, elem);
      container.appendChild(elem);
    }
    container.style.position = "relative";

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
}

function enhanceRequired(elem) {
  
   if (elem.dataset.enhancedRequired) return;
    elem.dataset.enhancedRequired = "true";
  
  const enhanceRequiredField = (input) => {
   
    const label = input.closest("label");
    if (!label) return;
    if (label.querySelector(".required-asterisk")) return;

    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = "*";
    asterisk.style.marginLeft = "4px";
    label.querySelector("span").appendChild(asterisk);

    const form = input.closest("form");
    if (form && !form.querySelector(".required-legend")) {
      const legend = document.createElement("small");
      legend.classList.add("required-legend");
      legend.textContent = "* Required fields";
      form.insertBefore(
        legend,
        form.querySelector(".form-actions") || form.lastElementChild
      );
    }
  }

  elem.querySelectorAll("[required]").forEach((input) => {
    enhanceRequiredField(input);
  });
  
}

function enhanceOpenGroup(elem) {
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
  addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const value = addInput.value.trim();
      if (value) {
        event.preventDefault();

        const type = firstInput.type === "radio" ? "radio" : "checkbox";
        const id = `open-group-${Math.random()
          .toString(36)
          .substring(2, 11)}`;
        const label = document.createElement("label");

        const span = document.createElement("span");
        span.setAttribute("data-label", "");
        span.textContent = value;

        const input = document.createElement("input");
        input.type = type;
        input.name =
          firstInput.name || elem.getAttribute("data-name") || "open-group";
        input.value = value;
        input.id = id;

        label.appendChild(span);
        label.appendChild(input);

        elem.insertBefore(label, addInput);
        addInput.value = "";
      }
    } else if (event.key === "Backspace" && addInput.value === "") {
      event.preventDefault();
      const labels = elem.querySelectorAll("label");
      if (labels.length > 0) {
        const lastLabel = labels[labels.length - 1];
        lastLabel.remove();
      }
    }
  });
}

function enhanceClip(elem) {
  if (elem.dataset.enhancedClip) return;
  elem.dataset.enhancedClip = "true";

  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }
  if (!elem.hasAttribute("role")) {
    elem.setAttribute("role", "button");
  }

  const syncAria = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  const toggleOpen = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("data-clip-open", isOpen ? "false" : "true");
    syncAria();
  };

  elem.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    toggleOpen();
  });

  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleOpen();
    }
  });

  syncAria();
}

function enhanceButtonWorking(elem) {
  if (elem.dataset.enhancedBtnWorking) return;
  elem.dataset.enhancedBtnWorking = "true";

  let originalIcon = null;
  let addedIcon = false;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const hasWorking = elem.classList.contains("btn-working");
        const icon = elem.querySelector("pds-icon");

        if (hasWorking) {
          if (icon) {
            if (!originalIcon) {
              originalIcon = icon.getAttribute("icon");
            }
            icon.setAttribute("icon", "circle-notch");
          } else {
            const newIcon = document.createElement("pds-icon");
            newIcon.setAttribute("icon", "circle-notch");
            newIcon.setAttribute("size", "sm");
            elem.insertBefore(newIcon, elem.firstChild);
            addedIcon = true;
          }
        } else if (mutation.oldValue?.includes("btn-working")) {
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
}

// ============================================================================
// EXPORTS
// ============================================================================

// Map selectors to their run functions
const enhancerRunners = new Map([
  [".accordion", enhanceAccordion],
  ["nav[data-dropdown]", enhanceDropdown],
  ["label[data-toggle]", enhanceToggle],
  ['input[type="range"]', enhanceRange],
  ["form[data-required]", enhanceRequired],
  ["fieldset[role=group][data-open]", enhanceOpenGroup],
  ["[data-clip]", enhanceClip],
  ["button, a[class*='btn-']", enhanceButtonWorking],
]);

/**
 * Complete enhancers with runtime functions.
 * Used by PDS.enhancer() and AutoDefiner at runtime.
 * 
 * This is the canonical runtime array of enhancer objects.
 */
export const defaultPDSEnhancers = enhancerDefinitions.map((meta) => ({
  ...meta,
  run: enhancerRunners.get(meta.selector) || (() => {}),
}));

// Metadata lives in pds-enhancers-meta.js (live-mode only).
