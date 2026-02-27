// src/js/pds-core/pds-enhancers.js
var enhancerDefinitions = [
  { selector: ".accordion" },
  { selector: "nav[data-dropdown]" },
  { selector: "label[data-toggle]" },
  { selector: "label[data-color]" },
  { selector: 'input[type="range"]' },
  { selector: "form[data-required]" },
  { selector: "fieldset[role=group][data-open]" },
  { selector: "[data-clip]" },
  { selector: "button, a[class*='btn-']" }
];
function enhanceAccordion(elem) {
  if (elem.dataset.enhancedAccordion)
    return;
  elem.dataset.enhancedAccordion = "true";
  elem.addEventListener(
    "toggle",
    (event) => {
      if (event.target.open && event.target.parentElement === elem) {
        elem.querySelectorAll(":scope > details[open]").forEach((details) => {
          if (details !== event.target) {
            details.open = false;
          }
        });
      }
    },
    true
  );
}
function enhanceDropdown(elem) {
  if (elem.dataset.enhancedDropdown)
    return;
  elem.dataset.enhancedDropdown = "true";
  const menu = elem.lastElementChild;
  if (!menu)
    return;
  const trigger = elem.querySelector("[data-dropdown-toggle]") || elem.querySelector("button");
  if (trigger && !trigger.hasAttribute("type")) {
    trigger.setAttribute("type", "button");
  }
  if (!menu.id) {
    menu.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`;
  }
  const isMenu = menu.tagName?.toLowerCase() === "menu";
  const VIEWPORT_PADDING = 8;
  if (isMenu && !menu.hasAttribute("role")) {
    menu.setAttribute("role", "menu");
  }
  if (!menu.hasAttribute("aria-hidden")) {
    menu.setAttribute("aria-hidden", "true");
  }
  if (trigger) {
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-controls", menu.id);
    trigger.setAttribute("aria-expanded", "false");
  }
  const measureMenuSize = () => {
    const previousStyle = menu.getAttribute("style");
    menu.style.visibility = "hidden";
    menu.style.display = "inline-block";
    menu.style.pointerEvents = "none";
    const rect = menu.getBoundingClientRect();
    const width = Math.max(menu.offsetWidth || 0, menu.scrollWidth || 0, rect.width || 0, 1);
    const height = Math.max(
      menu.offsetHeight || 0,
      menu.scrollHeight || 0,
      rect.height || 0,
      1
    );
    if (previousStyle === null) {
      menu.removeAttribute("style");
    } else {
      menu.setAttribute("style", previousStyle);
    }
    return { width, height };
  };
  const resolveDirection = () => {
    const mode = (elem.getAttribute("data-direction") || elem.getAttribute("data-dropdown-direction") || elem.getAttribute("data-mode") || "auto").toLowerCase();
    if (mode === "up" || mode === "down")
      return mode;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { height: menuHeight } = measureMenuSize();
    const spaceBelow = Math.max(0, window.innerHeight - anchorRect.bottom);
    const spaceAbove = Math.max(0, anchorRect.top);
    const fitsDown = spaceBelow >= menuHeight;
    const fitsUp = spaceAbove >= menuHeight;
    if (fitsDown && !fitsUp)
      return "down";
    if (fitsUp && !fitsDown)
      return "up";
    if (fitsDown && fitsUp)
      return "down";
    return spaceAbove > spaceBelow ? "up" : "down";
  };
  const resolveAlign = () => {
    const align = (elem.getAttribute("data-align") || elem.getAttribute("data-dropdown-align") || "auto").toLowerCase();
    if (align === "left" || align === "right" || align === "start" || align === "end") {
      return align === "start" ? "left" : align === "end" ? "right" : align;
    }
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { width: menuWidth } = measureMenuSize();
    const spaceForLeftAligned = Math.max(0, window.innerWidth - anchorRect.left);
    const spaceForRightAligned = Math.max(0, anchorRect.right);
    const fitsLeft = spaceForLeftAligned >= menuWidth;
    const fitsRight = spaceForRightAligned >= menuWidth;
    if (fitsLeft && !fitsRight)
      return "left";
    if (fitsRight && !fitsLeft)
      return "right";
    if (fitsLeft && fitsRight)
      return "left";
    return spaceForRightAligned > spaceForLeftAligned ? "right" : "left";
  };
  const readLengthToken = (tokenName, fallback = 8) => {
    const raw = getComputedStyle(elem).getPropertyValue(tokenName).trim();
    if (!raw)
      return fallback;
    const probe = document.createElement("span");
    probe.style.position = "fixed";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.height = raw;
    document.body.appendChild(probe);
    const parsed = Number.parseFloat(getComputedStyle(probe).height);
    probe.remove();
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const clearFloatingMenuPosition = () => {
    menu.style.removeProperty("position");
    menu.style.removeProperty("left");
    menu.style.removeProperty("top");
    menu.style.removeProperty("right");
    menu.style.removeProperty("bottom");
    menu.style.removeProperty("margin-top");
    menu.style.removeProperty("margin-bottom");
    menu.style.removeProperty("max-width");
    menu.style.removeProperty("max-inline-size");
    menu.style.removeProperty("max-height");
    menu.style.removeProperty("overflow");
  };
  const getContainingAncestor = (node) => {
    if (!node)
      return null;
    if (node.parentElement)
      return node.parentElement;
    const root = node.getRootNode?.();
    return root instanceof ShadowRoot ? root.host : null;
  };
  const hasNonViewportFixedContainingBlock = () => {
    let current = getContainingAncestor(menu);
    while (current && current !== document.documentElement) {
      const style = getComputedStyle(current);
      const contain = style.contain || "";
      const willChange = style.willChange || "";
      const createsContainingBlock = style.transform !== "none" || style.perspective !== "none" || style.filter !== "none" || style.backdropFilter !== "none" || contain.includes("paint") || contain.includes("layout") || contain.includes("strict") || contain.includes("content") || willChange.includes("transform") || willChange.includes("perspective") || willChange.includes("filter");
      if (createsContainingBlock) {
        return true;
      }
      current = getContainingAncestor(current);
    }
    return false;
  };
  const reattachFloatingMenu = () => {
    if (menu.getAttribute("aria-hidden") !== "false")
      return;
    clearFloatingMenuPosition();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        positionFloatingMenu();
      });
    });
  };
  const positionFloatingMenu = () => {
    if (menu.getAttribute("aria-hidden") !== "false")
      return;
    if (hasNonViewportFixedContainingBlock()) {
      clearFloatingMenuPosition();
      return;
    }
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportWidth = viewport?.width || document.documentElement?.clientWidth || window.innerWidth;
    const viewportHeight = viewport?.height || document.documentElement?.clientHeight || window.innerHeight;
    const viewportOffsetLeft = viewport?.offsetLeft || 0;
    const viewportOffsetTop = viewport?.offsetTop || 0;
    const maxMenuWidth = Math.max(1, viewportWidth - VIEWPORT_PADDING * 2);
    const maxMenuHeight = Math.max(1, viewportHeight - VIEWPORT_PADDING * 2);
    menu.style.maxWidth = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxInlineSize = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxHeight = `${Math.round(maxMenuHeight)}px`;
    menu.style.overflow = "auto";
    const { width: menuWidth, height: menuHeight } = measureMenuSize();
    const spacing = readLengthToken("--spacing-2", 8);
    const direction = resolveDirection();
    const align = resolveAlign();
    elem.dataset.dropdownDirection = direction;
    elem.dataset.dropdownAlign = align;
    let left = align === "right" ? anchorRect.right - menuWidth : anchorRect.left;
    if (menuWidth >= maxMenuWidth - 1) {
      left = viewportOffsetLeft + VIEWPORT_PADDING;
    } else {
      left = Math.max(
        viewportOffsetLeft + VIEWPORT_PADDING,
        Math.min(
          left,
          viewportOffsetLeft + viewportWidth - menuWidth - VIEWPORT_PADDING
        )
      );
    }
    let top = direction === "up" ? anchorRect.top - spacing - menuHeight : anchorRect.bottom + spacing;
    top = Math.max(
      viewportOffsetTop + VIEWPORT_PADDING,
      Math.min(
        top,
        viewportOffsetTop + viewportHeight - menuHeight - VIEWPORT_PADDING
      )
    );
    menu.style.position = "fixed";
    menu.style.left = `${Math.round(left)}px`;
    menu.style.top = `${Math.round(top)}px`;
    menu.style.right = "auto";
    menu.style.bottom = "auto";
    menu.style.marginTop = "0";
    menu.style.marginBottom = "0";
  };
  let repositionHandler = null;
  const bindReposition = () => {
    if (repositionHandler)
      return;
    repositionHandler = () => positionFloatingMenu();
    window.addEventListener("resize", repositionHandler);
    window.addEventListener("scroll", repositionHandler, true);
  };
  const unbindReposition = () => {
    if (!repositionHandler)
      return;
    window.removeEventListener("resize", repositionHandler);
    window.removeEventListener("scroll", repositionHandler, true);
    repositionHandler = null;
  };
  let configChangedHandler = null;
  let configRepositionFrame = null;
  const bindConfigChanged = () => {
    if (configChangedHandler || typeof document === "undefined")
      return;
    configChangedHandler = () => {
      if (menu.getAttribute("aria-hidden") !== "false")
        return;
      elem.dataset.dropdownDirection = resolveDirection();
      elem.dataset.dropdownAlign = resolveAlign();
      if (configRepositionFrame !== null) {
        cancelAnimationFrame(configRepositionFrame);
      }
      configRepositionFrame = requestAnimationFrame(() => {
        configRepositionFrame = null;
        if (menu.getAttribute("aria-hidden") !== "false")
          return;
        positionFloatingMenu();
      });
    };
    document.addEventListener("pds:config-changed", configChangedHandler);
  };
  const unbindConfigChanged = () => {
    if (!configChangedHandler || typeof document === "undefined")
      return;
    document.removeEventListener("pds:config-changed", configChangedHandler);
    configChangedHandler = null;
    if (configRepositionFrame !== null) {
      cancelAnimationFrame(configRepositionFrame);
      configRepositionFrame = null;
    }
  };
  let clickHandler = null;
  const openMenu = () => {
    elem.dataset.dropdownDirection = resolveDirection();
    elem.dataset.dropdownAlign = resolveAlign();
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
    bindReposition();
    bindConfigChanged();
    reattachFloatingMenu();
    if (!clickHandler) {
      clickHandler = (event) => {
        const path = event.composedPath ? event.composedPath() : [event.target];
        const clickedInside = path.some((node) => node === elem);
        if (!clickedInside) {
          closeMenu();
        }
      };
      setTimeout(() => {
        document.addEventListener("click", clickHandler);
      }, 0);
    }
  };
  const closeMenu = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
    unbindReposition();
    unbindConfigChanged();
    clearFloatingMenuPosition();
    if (clickHandler) {
      document.removeEventListener("click", clickHandler);
      clickHandler = null;
    }
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
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger?.focus();
    }
  });
  elem.addEventListener("focusout", (event) => {
    if (event.relatedTarget) {
      const path = event.composedPath ? event.composedPath() : [event.relatedTarget];
      const focusedInside = path.some((node) => node === elem);
      if (!focusedInside) {
        closeMenu();
      }
    }
  });
}
function enhanceToggle(elem) {
  if (elem.dataset.enhancedToggle)
    return;
  elem.dataset.enhancedToggle = "true";
  const checkbox = elem.querySelector('input[type="checkbox"]');
  if (!checkbox)
    return;
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
    if (checkbox.disabled)
      return;
    checkbox.checked = !checkbox.checked;
    updateAria();
    checkbox.dispatchEvent(new Event("input", { bubbles: true }));
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
function enhanceColorInput(elem) {
  if (elem.dataset.enhancedColorInput)
    return;
  const input = elem.querySelector('input[type="color"]');
  if (!input)
    return;
  elem.dataset.enhancedColorInput = "true";
  let control = elem.querySelector(":scope > .color-control");
  let swatch = elem.querySelector(":scope > .color-control > .color-swatch");
  let output = elem.querySelector(":scope > .color-control > output");
  if (!control) {
    control = document.createElement("span");
    control.className = "color-control";
    input.before(control);
  }
  if (!swatch) {
    swatch = document.createElement("span");
    swatch.className = "color-swatch";
    control.appendChild(swatch);
  }
  if (input.parentElement !== swatch) {
    swatch.appendChild(input);
  }
  if (!output) {
    output = document.createElement("output");
    control.appendChild(output);
  }
  const sync = () => {
    const isUnset = input.dataset.colorUnset === "1";
    if (isUnset) {
      output.value = "";
      output.textContent = "not set";
      control.dataset.value = "";
      control.dataset.unset = "1";
      swatch.dataset.unset = "1";
      return;
    }
    output.value = input.value;
    output.textContent = input.value;
    control.dataset.value = input.value;
    delete control.dataset.unset;
    delete swatch.dataset.unset;
  };
  sync();
  const setResolved = () => {
    if (input.dataset.colorUnset === "1") {
      input.dataset.colorUnset = "0";
    }
    sync();
  };
  input.addEventListener("input", setResolved, { passive: true });
  input.addEventListener("change", setResolved, { passive: true });
}
function enhanceRange(elem) {
  if (elem.dataset.enhancedRange)
    return;
  const wireProgrammaticUpdates = (updateFn) => {
    if (elem.dataset.enhancedRangeProgrammatic)
      return;
    elem.dataset.enhancedRangeProgrammatic = "1";
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(elem), "value") || Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    if (descriptor?.get && descriptor?.set) {
      Object.defineProperty(elem, "value", {
        configurable: true,
        enumerable: descriptor.enumerable,
        get() {
          return descriptor.get.call(this);
        },
        set(nextValue) {
          descriptor.set.call(this, nextValue);
          updateFn();
        }
      });
    }
    const attrObserver = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        const attr = mutation.attributeName;
        return attr === "value" || attr === "min" || attr === "max";
      });
      if (shouldUpdate)
        updateFn();
    });
    attrObserver.observe(elem, {
      attributes: true,
      attributeFilter: ["value", "min", "max"]
    });
  };
  const label = elem.closest("label");
  const hasRangeOutputClass = label?.classList.contains("range-output");
  const inputId = elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
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
      output.style.color = "var(--surface-text-secondary, var(--color-text-secondary))";
      output.style.fontSize = "0.875rem";
      output.textContent = elem.value;
      wrapper.appendChild(output);
      labelSpan.textContent = "";
      labelSpan.appendChild(wrapper);
      const updateOutput = () => {
        output.textContent = elem.value;
      };
      elem.addEventListener("input", updateOutput);
      elem.addEventListener("change", updateOutput);
      wireProgrammaticUpdates(updateOutput);
      updateOutput();
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
    elem.addEventListener("change", updateBubble);
    wireProgrammaticUpdates(updateBubble);
    updateBubble();
  }
  elem.dataset.enhancedRange = "1";
}
function enhanceRequired(elem) {
  if (elem.dataset.enhancedRequired)
    return;
  elem.dataset.enhancedRequired = "true";
  const enhanceRequiredField = (input) => {
    let label;
    if (input.closest("[role$=group]")) {
      label = input.closest("[role$=group]").querySelector("legend");
    } else {
      label = input.closest("label");
    }
    if (!label)
      return;
    if (label.querySelector(".required-asterisk"))
      return;
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = "*";
    asterisk.style.marginLeft = "4px";
    const labelText = label.querySelector("span, [data-label]");
    if (labelText) {
      labelText.appendChild(asterisk);
    } else {
      const field = label.querySelector("input, select, textarea");
      if (field) {
        label.insertBefore(asterisk, field);
      } else {
        label.appendChild(asterisk);
      }
    }
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
  };
  elem.querySelectorAll("[required]").forEach((input) => {
    enhanceRequiredField(input);
  });
}
function enhanceOpenGroup(elem) {
  if (elem.dataset.enhancedOpenGroup)
    return;
  elem.dataset.enhancedOpenGroup = "true";
  elem.classList.add("flex", "flex-wrap", "buttons");
  const addInput = document.createElement("input");
  addInput.type = "text";
  addInput.placeholder = "Add item...";
  addInput.classList.add("input-text", "input-sm");
  addInput.style.width = "auto";
  const getFirstInput = () => elem.querySelector('input[type="radio"], input[type="checkbox"]');
  elem.appendChild(addInput);
  addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const value = addInput.value.trim();
      if (value) {
        event.preventDefault();
        const firstInput = getFirstInput();
        const type = firstInput?.type === "radio" ? "radio" : "checkbox";
        const id = `open-group-${Math.random().toString(36).substring(2, 11)}`;
        const label = document.createElement("label");
        const span = document.createElement("span");
        span.setAttribute("data-label", "");
        span.textContent = value;
        const input = document.createElement("input");
        input.type = type;
        input.name = firstInput?.name || elem.getAttribute("data-name") || "open-group";
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
  if (elem.dataset.enhancedClip)
    return;
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
    if (event.defaultPrevented)
      return;
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
  if (elem.dataset.enhancedBtnWorking)
    return;
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
    attributeOldValue: true
  });
}
var enhancerRunners = /* @__PURE__ */ new Map([
  [".accordion", enhanceAccordion],
  ["nav[data-dropdown]", enhanceDropdown],
  ["label[data-toggle]", enhanceToggle],
  ["label[data-color]", enhanceColorInput],
  ['input[type="range"]', enhanceRange],
  ["form[data-required]", enhanceRequired],
  ["fieldset[role=group][data-open]", enhanceOpenGroup],
  ["[data-clip]", enhanceClip],
  ["button, a[class*='btn-']", enhanceButtonWorking]
]);
var defaultPDSEnhancers = enhancerDefinitions.map((meta) => ({
  ...meta,
  run: enhancerRunners.get(meta.selector) || (() => {
  })
}));
export {
  defaultPDSEnhancers
};
//# sourceMappingURL=pds-enhancers.js.map
