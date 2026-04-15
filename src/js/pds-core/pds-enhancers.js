import { msg } from "../common/localization.js";

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
  { selector: "label[data-color]" },
  { selector: 'input[autocomplete="one-time-code"]' },
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

  elem.addEventListener(
    "toggle",
    (event) => {
      // Only handle toggle events from direct child details elements
      // to avoid closing parent details when nested accordions are used
      if (event.target.open && event.target.parentElement === elem) {
        elem.querySelectorAll(":scope > details[open]").forEach((details) => {
          if (details !== event.target) {
            details.open = false;
          }
        });
      }
    },
    true,
  );
}

function enhanceDropdown(elem) {
  if (elem.dataset.enhancedDropdown) return;
  elem.dataset.enhancedDropdown = "true";
  const menu = elem.lastElementChild;
  const usesDefaultAction = elem.classList.contains("split-button");

  if (!menu) return;

  const trigger =
    elem.querySelector("[data-dropdown-toggle]") ||
    elem.querySelector("button");

  const supportsPopover =
    typeof HTMLElement !== "undefined" &&
    "showPopover" in HTMLElement.prototype &&
    "hidePopover" in HTMLElement.prototype;

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
    trigger.setAttribute("popovertarget", menu.id);
  }

  const resolveDefaultItem = () => {
    if (!usesDefaultAction || !isMenu) return null;
    return menu.querySelector(":scope > li[data-default]") || menu.querySelector(":scope > li");
  };

  const resolveDefaultAction = (item) => {
    if (!item) return null;
    return item.querySelector(":scope > a, :scope > button") || item.firstElementChild;
  };

  const createOrResolveDefaultButton = () => {
    if (!usesDefaultAction || !trigger) return null;
    let button = elem.querySelector(":scope > [data-dropdown-default]");
    if (button) return button;
    button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("data-dropdown-default", "");
    button.className = trigger.className;
    elem.insertBefore(button, trigger);
    return button;
  };

  const syncDefaultButton = (button, action) => {
    if (!button || !action) return;

    button.replaceChildren(...Array.from(action.childNodes).map((node) => node.cloneNode(true)));

    const label =
      action.getAttribute("aria-label") ||
      action.textContent?.replace(/\s+/g, " ").trim() ||
      msg("Default action");
    button.setAttribute("aria-label", label);
    button.title = label;
  };

  const setupDefaultAction = () => {
    if (!usesDefaultAction) return;
    const defaultButton = createOrResolveDefaultButton();
    const defaultItem = resolveDefaultItem();
    const defaultAction = resolveDefaultAction(defaultItem);
    if (!defaultButton || !defaultAction) return;

    syncDefaultButton(defaultButton, defaultAction);

    const executeDefault = () => {
      if (!defaultAction) return;
      if (typeof defaultAction.click === "function") {
        defaultAction.click();
      }
    };

    defaultButton.addEventListener("click", (event) => {
      event.preventDefault();
      executeDefault();
    });
  };

  if (!supportsPopover) {
    const warnKey = "__PDS_DROPDOWN_POPOVER_WARNED__";
    if (!globalThis[warnKey]) {
      globalThis[warnKey] = true;
      console.warn(
        "[PDS] nav[data-dropdown] requires the Popover API. Add a popover polyfill (recommended: @oddbird/popover-polyfill) for browsers without support.",
      );
    }
    return;
  }

  setupDefaultAction();

  menu.setAttribute("popover", "auto");

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
      1,
    );

    if (previousStyle === null) {
      menu.removeAttribute("style");
    } else {
      menu.setAttribute("style", previousStyle);
    }

    return { width, height };
  };

  const isPopoverOpen = () => {
    try {
      return menu.matches(":popover-open");
    } catch {
      return false;
    }
  };

  const syncClosedState = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
  };

  const syncOpenState = () => {
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
  };

  const resolveDirection = () => {
    const mode = (
      elem.getAttribute("data-direction") ||
      elem.getAttribute("data-dropdown-direction") ||
      elem.getAttribute("data-mode") ||
      "auto"
    ).toLowerCase();
    if (mode === "up" || mode === "down") return mode;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { height: menuHeight } = measureMenuSize();
    const spaceBelow = Math.max(0, window.innerHeight - anchorRect.bottom);
    const spaceAbove = Math.max(0, anchorRect.top);
    const fitsDown = spaceBelow >= menuHeight;
    const fitsUp = spaceAbove >= menuHeight;
    if (fitsDown && !fitsUp) return "down";
    if (fitsUp && !fitsDown) return "up";
    if (fitsDown && fitsUp) return "down";
    return spaceAbove > spaceBelow ? "up" : "down";
  };

  const resolveAlign = () => {
    if (usesDefaultAction) return "right";

    const align = (
      elem.getAttribute("data-align") ||
      elem.getAttribute("data-dropdown-align") ||
      "auto"
    ).toLowerCase();
    if (
      align === "left" ||
      align === "right" ||
      align === "start" ||
      align === "end"
    ) {
      return align === "start" ? "left" : align === "end" ? "right" : align;
    }
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { width: menuWidth } = measureMenuSize();
    const spaceForLeftAligned = Math.max(0, window.innerWidth - anchorRect.left);
    const spaceForRightAligned = Math.max(0, anchorRect.right);
    const fitsLeft = spaceForLeftAligned >= menuWidth;
    const fitsRight = spaceForRightAligned >= menuWidth;

    if (fitsLeft && !fitsRight) return "left";
    if (fitsRight && !fitsLeft) return "right";
    if (fitsLeft && fitsRight) return "left";
    return spaceForRightAligned > spaceForLeftAligned ? "right" : "left";
  };

  const readLengthToken = (tokenName, fallback = 8) => {
    const raw = getComputedStyle(elem).getPropertyValue(tokenName).trim();
    if (!raw) return fallback;
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
    [
      "position",
      "left",
      "top",
      "right",
      "bottom",
      "margin-top",
      "margin-bottom",
      "max-width",
      "max-inline-size",
      "max-height",
      "overflow",
    ].forEach((prop) => menu.style.removeProperty(prop));
  };
  
  const positionPopoverMenu = () => {
    if (!isPopoverOpen()) return;

    const anchorRect = (trigger || elem).getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportWidth =
      viewport?.width || document.documentElement?.clientWidth || window.innerWidth;
    const viewportHeight =
      viewport?.height || document.documentElement?.clientHeight || window.innerHeight;
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
          viewportOffsetLeft + viewportWidth - menuWidth - VIEWPORT_PADDING,
        ),
      );
    }

    let top =
      direction === "up"
        ? anchorRect.top - spacing - menuHeight
        : anchorRect.bottom + spacing;
    top = Math.max(
      viewportOffsetTop + VIEWPORT_PADDING,
      Math.min(
        top,
        viewportOffsetTop + viewportHeight - menuHeight - VIEWPORT_PADDING,
      ),
    );

    Object.assign(menu.style, {
      position: "fixed",
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
      right: "auto",
      bottom: "auto",
      marginTop: "0",
      marginBottom: "0",
    });
  };

  let repositionHandler = null;
  const bindReposition = () => {
    if (repositionHandler) return;
    repositionHandler = () => positionPopoverMenu();
    window.addEventListener("resize", repositionHandler);
    window.addEventListener("scroll", repositionHandler, true);
  };

  const unbindReposition = () => {
    if (!repositionHandler) return;
    window.removeEventListener("resize", repositionHandler);
    window.removeEventListener("scroll", repositionHandler, true);
    repositionHandler = null;
  };

  let configChangedHandler = null;
  let configRepositionFrame = null;

  const bindConfigChanged = () => {
    if (configChangedHandler || typeof document === "undefined") return;
    configChangedHandler = () => {
      if (!isPopoverOpen()) return;
      elem.dataset.dropdownDirection = resolveDirection();
      elem.dataset.dropdownAlign = resolveAlign();

      if (configRepositionFrame !== null) {
        cancelAnimationFrame(configRepositionFrame);
      }
      configRepositionFrame = requestAnimationFrame(() => {
        configRepositionFrame = null;
        if (!isPopoverOpen()) return;
        positionPopoverMenu();
      });
    };
    document.addEventListener("pds:config-changed", configChangedHandler);
  };

  const unbindConfigChanged = () => {
    if (!configChangedHandler || typeof document === "undefined") return;
    document.removeEventListener("pds:config-changed", configChangedHandler);
    configChangedHandler = null;
    if (configRepositionFrame !== null) {
      cancelAnimationFrame(configRepositionFrame);
      configRepositionFrame = null;
    }
  };

  menu.addEventListener("toggle", (event) => {
    const isOpen = event.newState === "open";

    if (isOpen) {
      syncOpenState();
      positionPopoverMenu();
      bindReposition();
      bindConfigChanged();
      return;
    }

    syncClosedState();
    unbindReposition();
    unbindConfigChanged();
    // Don't clear position styles on close - they'll be overwritten on next open
    // and clearing them during close animation causes a visual flash
  });

  const openMenu = () => {
    if (isPopoverOpen()) return;
    elem.dataset.dropdownDirection = resolveDirection();
    elem.dataset.dropdownAlign = resolveAlign();
    menu.showPopover();
    requestAnimationFrame(() => positionPopoverMenu());
  };

  const closeMenu = () => {
    if (!isPopoverOpen()) return;
    menu.hidePopover();
  };

  const toggleMenu = () => {
    if (isPopoverOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  syncClosedState();

  menu.addEventListener("click", (event) => {
    const target =
      event.target instanceof Element ? event.target : event.target?.parentElement;
    if (!target) return;
    if (!target.closest("[data-dropdown-close]")) return;
    closeMenu();
  });

  // Set direction/align before popover opens (for CSS animations)
  menu.addEventListener("beforetoggle", (event) => {
    if (event.newState === "open") {
      elem.dataset.dropdownDirection = resolveDirection();
      elem.dataset.dropdownAlign = resolveAlign();
    }
  });

  elem.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger?.focus();
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
  if (elem.dataset.enhancedColorInput) return;

  const input = elem.querySelector('input[type="color"]');
  if (!input) return;

  elem.dataset.enhancedColorInput = "true";

  let control = elem.querySelector(':scope > .color-control');
  let swatch = elem.querySelector(':scope > .color-control > .color-swatch');
  let output = elem.querySelector(':scope > .color-control > output');

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
      output.textContent = msg("not set");
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

function enhanceOneTimeCodeInput(elem) {
  if (elem.dataset.enhancedOneTimeCode) return;
  elem.dataset.enhancedOneTimeCode = "true";

  const configuredLength = Number.parseInt(
    elem.getAttribute("data-otp-length") || elem.getAttribute("maxlength") || "6",
    10,
  );
  const length = Number.isFinite(configuredLength) && configuredLength > 0 ? configuredLength : 6;
  const autoSubmit = elem.getAttribute("data-otp-autosubmit") !== "false";
  const allowAlphanumeric = elem.getAttribute("data-otp-format") === "alphanumeric";
  const statusId =
    elem.getAttribute("data-otp-status-id") ||
    `${elem.id || `otp-${Math.random().toString(36).slice(2, 9)}`}-status`;

  const normalizeValue = (value) => {
    const compact = String(value || "").replace(/\s+/g, "");
    const filtered = allowAlphanumeric
      ? compact.replace(/[^0-9a-z]/gi, "")
      : compact.replace(/\D+/g, "");
    return filtered.slice(0, length);
  };

  elem.classList.add("input-otp");
  elem.dataset.otpLength = String(length);
  elem.dataset.otpComplete = "false";
  elem.style.setProperty("--otp-digits", String(length));
  elem.style.setProperty("--_otp-digit", "0");

  if (!elem.hasAttribute("type") || elem.getAttribute("type")?.toLowerCase() === "number") {
    elem.setAttribute("type", "text");
  }
  elem.setAttribute("maxlength", String(length));
  if (!elem.hasAttribute("inputmode")) {
    elem.setAttribute("inputmode", allowAlphanumeric ? "text" : "numeric");
  }
  if (!elem.hasAttribute("enterkeyhint")) {
    elem.setAttribute("enterkeyhint", "done");
  }
  if (!elem.hasAttribute("autocapitalize")) {
    elem.setAttribute("autocapitalize", "off");
  }
  if (!elem.hasAttribute("spellcheck")) {
    elem.setAttribute("spellcheck", "false");
  }
  if (!elem.hasAttribute("pattern")) {
    elem.setAttribute(
      "pattern",
      allowAlphanumeric ? `[0-9A-Za-z]{${length}}` : `\\d{${length}}`,
    );
  }
  if (!elem.hasAttribute("aria-label") && !elem.labels?.length) {
    elem.setAttribute("aria-label", msg("One-time code"));
  }

  const form = elem.form || elem.closest("form");
  let autoSubmitPending = false;
  let status = null;

  const syncActiveDigit = () => {
    const selectionStart =
      typeof elem.selectionStart === "number" ? elem.selectionStart : elem.value.length;
    const clamped = Math.max(0, Math.min(selectionStart, Math.max(length - 1, 0)));
    elem.style.setProperty("--_otp-digit", String(clamped));
  };

  const syncScrollPosition = () => {
    if (typeof elem.scrollLeft === "number") {
      elem.scrollLeft = 0;
    }
  };

  if (typeof document !== "undefined") {
    status = document.getElementById(statusId);
    if (!status) {
      status = document.createElement("span");
      status.id = statusId;
      status.className = "otp-status";
      status.setAttribute("aria-live", "polite");
      status.setAttribute("aria-atomic", "true");
      elem.insertAdjacentElement("afterend", status);
    }

    const describedBy = new Set(
      (elem.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean),
    );
    describedBy.add(statusId);
    elem.setAttribute("aria-describedby", Array.from(describedBy).join(" "));
  }

  const updateStatus = () => {
    if (!status) return;
    const count = elem.value.length;
    status.textContent =
      count === 0
        ? msg("Enter the verification code")
        : count >= length
          ? msg("Code complete")
          : `${count}/${length}`;
  };

  const attemptSubmit = () => {
    if (!autoSubmit || autoSubmitPending || !form) return;
    if (typeof form.checkValidity === "function" && !form.checkValidity()) return;
    autoSubmitPending = true;
    requestAnimationFrame(() => {
      autoSubmitPending = false;
      const submitSelector = elem.getAttribute("data-otp-submit-selector");
      const submitter = submitSelector ? form.querySelector(submitSelector) : undefined;
      if (typeof form.requestSubmit === "function") {
        form.requestSubmit(submitter || undefined);
      } else {
        form.submit();
      }
    });
  };

  const syncValue = (nextValue, { dispatchChange = false } = {}) => {
    const normalized = normalizeValue(nextValue);
    if (elem.value !== normalized) {
      elem.value = normalized;
    }

    const isComplete = normalized.length === length;
    elem.dataset.otpComplete = isComplete ? "true" : "false";
    updateStatus();
    syncActiveDigit();
    syncScrollPosition();

    if (dispatchChange) {
      elem.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (isComplete) {
      attemptSubmit();
    }
  };

  elem.addEventListener("beforeinput", (event) => {
    if (event.defaultPrevented) return;
    if (event.inputType?.startsWith("delete")) return;
    if (typeof event.data !== "string" || event.data.length === 0) return;

    const normalized = normalizeValue(event.data);
    if (!normalized && event.data.trim()) {
      event.preventDefault();
    }
  });

  elem.addEventListener("input", () => {
    syncValue(elem.value);
    try {
      const end = elem.value.length;
      elem.setSelectionRange(end, end);
    } catch {
      // Ignore selection API issues on unsupported input modes
    }
    syncActiveDigit();
    syncScrollPosition();
  });

  ["focus", "click", "keyup", "select"].forEach((eventName) => {
    elem.addEventListener(eventName, () => {
      requestAnimationFrame(() => {
        syncActiveDigit();
        syncScrollPosition();
      });
    });
  });

  elem.addEventListener("paste", (event) => {
    const pasted = event.clipboardData?.getData("text") || "";
    if (!pasted) return;

    event.preventDefault();
    elem.value = normalizeValue(pasted);
    elem.dispatchEvent(new Event("input", { bubbles: true }));
    elem.dispatchEvent(new Event("change", { bubbles: true }));
  });

  elem.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && elem.value.length === length) {
      attemptSubmit();
    }
  });

  syncValue(elem.value);
}

function enhanceRange(elem) {
  if (elem.dataset.enhancedRange) return;

  const wireProgrammaticUpdates = (updateFn) => {
    if (elem.dataset.enhancedRangeProgrammatic) return;
    elem.dataset.enhancedRangeProgrammatic = "1";

    const descriptor =
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(elem), "value") ||
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

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
        },
      });
    }

    const attrObserver = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        const attr = mutation.attributeName;
        return attr === "value" || attr === "min" || attr === "max";
      });
      if (shouldUpdate) updateFn();
    });
    attrObserver.observe(elem, {
      attributes: true,
      attributeFilter: ["value", "min", "max"],
    });
  };

  const label = elem.closest("label");
  const hasRangeOutputClass = label?.classList.contains("range-output");

  const inputId =
    elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
  const outputId = `${inputId}-output`;
  elem.id = inputId;

  if (hasRangeOutputClass) {
    const labelSpan = label.querySelector("span");
    if (labelSpan && !labelSpan.classList.contains("range-output-wrapper")) {
      const explicitRangeLabel =
        labelSpan.getAttribute("data-range-label") ||
        label.getAttribute("data-range-label") ||
        "";

      const wrapper = document.createElement("span");
      wrapper.className = "range-output-wrapper";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";

      const textSpan = document.createElement("span");
      textSpan.textContent = explicitRangeLabel || labelSpan.textContent;
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
  if (elem.dataset.enhancedRequired) return;
  elem.dataset.enhancedRequired = "true";

  const enhanceRequiredField = (input) => {
    let label;
    if (input.closest("[role$=group]")) {
      // Handles both radiogroup and group
      label = input.closest("[role$=group]").querySelector("legend");
    } else {
      label = input.closest("label");
    }
    if (!label) return;

    if (label.querySelector(".required-asterisk")) return;

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
      legend.textContent = msg("* Required fields");
      form.insertBefore(
        legend,
        form.querySelector(".form-actions") || form.lastElementChild,
      );
    }
  };

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
  addInput.placeholder = msg("Add item...");
  addInput.classList.add("input-text", "input-sm");
  addInput.style.width = "auto";

  const getFirstInput = () =>
    elem.querySelector('input[type="radio"], input[type="checkbox"]');

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
        input.name =
          firstInput?.name || elem.getAttribute("data-name") || "open-group";
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
  ["label[data-color]", enhanceColorInput],
  ['input[autocomplete="one-time-code"]', enhanceOneTimeCodeInput],
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
