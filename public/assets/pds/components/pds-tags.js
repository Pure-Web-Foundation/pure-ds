import { PDS } from "#pds";
import "./pds-omnibox.js";

const DEFAULT_OMNIBOX_OPTIONS = {
	hideCategory: true,
	itemGrid: "0 1fr 0",
	iconHandler: () => "",
};

/**
 * Form-associated multi-select tags control built on top of `pds-omnibox`.
 *
 * Users select suggestions from the omnibox and each selection is rendered as a removable
 * chip. The component keeps selection state synchronized across:
 * - the `value` attribute (comma-separated ids)
 * - the `value` property (`string[]`)
 * - form value via ElementInternals
 *
 * The `options` object uses the same structure as `pds-omnibox.settings`.
 * See `pds-omnibox` JSDoc for the full options schema.
 * Before applying it, the component deep-merges internal defaults:
 * - `hideCategory: true`
 * - `itemGrid: "0 1fr 0"`
 * - `iconHandler: () => ""`
 *
 * When `required` is set, at least one selected value is required for validity.
 *
 * @element pds-tags
 * @formAssociated
 *
 * @attr {string} name - Form field name; selected values are submitted under this name
 * @attr {string} placeholder - Placeholder shown in omnibox input (default: "Search tags...")
 * @attr {string} value - Comma-separated selected item ids
 * @attr {string} options - JSON object with the same shape as `pds-omnibox.settings`
 * @attr {boolean} disabled - Disables omnibox interaction and chip remove actions
 * @attr {boolean} required - Requires at least one selected value for validity
 *
 * @property {PdsOmniboxSettings|null} options - Omnibox options object (see `pds-omnibox.js` typedef)
 * @property {string[]} value - Selected option ids (array form)
 *
 * @fires {Event} input - Fired whenever selection changes
 * @fires {Event} change - Fired whenever selection changes
 */
class PdsTags extends HTMLElement {
	static formAssociated = true;

	static observedAttributes = [
		"name",
		"placeholder",
		"value",
		"options",
		"disabled",
		"required",
	];

	#internals;
	#root;
	#omnibox;
	#chips;
	#empty;
	#defaultValue = "";
	#selectedIds = new Set();
	#selectedItems = new Map();
	#items = [];
	#sourceSettings = null;
	#stylesAdopted = false;
	#syncingValueAttribute = false;
	#settingsInitialized = false;
	#pendingFocusId = null;

	constructor() {
		super();
		this.#debug("constructor");
		this.#internals = this.attachInternals();
		this.#root = this.attachShadow({ mode: "open", delegatesFocus: true });
		this.#render();
	}

	async connectedCallback() {
		this.#debug("connectedCallback:start", {
			hasOptionsAttr: this.hasAttribute("options"),
			hasValueAttr: this.hasAttribute("value"),
		});
		this.#upgradeProperty("options");
		this.#upgradeProperty("value");
		this.#upgradeProperty("name");
		this.#upgradeProperty("placeholder");
		this.#upgradeProperty("disabled");
		this.#upgradeProperty("required");

		await this.#adoptStyles();
		this.#hydrateFromAttributes();
		this.#defaultValue = this.hasAttribute("value")
			? (this.getAttribute("value") || "")
			: Array.from(this.#selectedIds).join(",");
		this.#debug("connectedCallback:defaultValue", { defaultValue: this.#defaultValue });
		await this.#ensureOmnibox();
		this.#debug("connectedCallback:end", {
			itemsCount: this.#items.length,
			selected: Array.from(this.#selectedIds),
			settingsInitialized: this.#settingsInitialized,
		});
	}

	#upgradeProperty(propertyName) {
		this.#debug("upgradeProperty:check", { propertyName, hasOwn: Object.prototype.hasOwnProperty.call(this, propertyName) });
		if (!Object.prototype.hasOwnProperty.call(this, propertyName)) return;
		const value = this[propertyName];
		this.#debug("upgradeProperty:apply", { propertyName, value });
		delete this[propertyName];
		this[propertyName] = value;
	}

	async #adoptStyles() {
		if (this.#stylesAdopted) return;
		const componentStyles = PDS.createStylesheet(/* css */ `
			:host {
				display: block;
			}
			
			.chips {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: var(--spacing-2);
				min-block-size: var(--spacing-6);

        &:empty {
          display: none;
        }
			}

			.empty {
				color: var(--color-text-muted);
				font-size: var(--font-size-sm);
			}

      .badge button {
        min-height: unset;
      }
		`);

		await PDS.adoptLayers(
			this.#root,
			["tokens", "primitives", "components", "utilities"],
			[componentStyles],
		);

		this.#stylesAdopted = true;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.#debug("attributeChangedCallback", { name, oldValue, newValue });
		if (oldValue === newValue) return;

		if (name === "value") {
			if (this.#syncingValueAttribute) return;
			this.#selectedIds = new Set(this.#parseValueList(newValue));
			this.#reconcileSelection();
			this.#renderChips();
			void this.#hydrateSelectedItemsFromSource();
			this.#syncFormValue();
			return;
		}

		if (name === "options") {
			this.#sourceSettings = this.#parseOptionsAttribute(newValue);
			this.#reconcileSelection();
			this.#renderChips();
			void this.#hydrateSelectedItemsFromSource();
			this.#settingsInitialized = false;
			this.#applyOmniboxSettings();
			this.#syncFormValue();
			return;
		}

		this.#syncAttributes();
		this.#applyOmniboxSettings();
		this.#syncFormValue();
	}

	get name() {
		return this.getAttribute("name") || "";
	}

	set name(value) {
		this.#debug("set name", { value });
		if (value == null || value === "") this.removeAttribute("name");
		else this.setAttribute("name", value);
	}

	get placeholder() {
		return this.getAttribute("placeholder") || "Search tags...";
	}

	set placeholder(value) {
		this.#debug("set placeholder", { value });
		if (value == null || value === "") this.removeAttribute("placeholder");
		else this.setAttribute("placeholder", value);
	}

	get options() {
		return this.#sourceSettings;
	}

	set options(value) {
		this.#debug("set options", {
			receivedType: value == null ? String(value) : Array.isArray(value) ? "array" : typeof value,
			hasCategories: Boolean(value?.categories),
		});
		this.#sourceSettings = value && typeof value === "object" && !Array.isArray(value)
			? value
			: null;
		this.#reconcileSelection();
		this.#renderChips();
		void this.#hydrateSelectedItemsFromSource();
		this.#settingsInitialized = false;
		this.#applyOmniboxSettings();
		this.#syncFormValue();
	}

	get value() {
		return Array.from(this.#selectedIds);
	}

	set value(value) {
		this.#debug("set value", { value });
		const incoming = Array.isArray(value)
			? value.map((item) => String(item))
			: this.#parseValueList(String(value ?? ""));
		this.#selectedIds = new Set(incoming);
		this.#debug("set value:parsed", { selected: Array.from(this.#selectedIds) });
		this.#reconcileSelection();
		this.#renderChips();
		void this.#hydrateSelectedItemsFromSource();
		this.#applyOmniboxSettings();
		this.#syncFormValue();
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	set disabled(value) {
		if (value) this.setAttribute("disabled", "");
		else this.removeAttribute("disabled");
	}

	get required() {
		return this.hasAttribute("required");
	}

	set required(value) {
		if (value) this.setAttribute("required", "");
		else this.removeAttribute("required");
	}

	formResetCallback() {
		this.#debug("formResetCallback", { defaultValue: this.#defaultValue });
		this.value = this.#defaultValue;
	}

	formStateRestoreCallback(state) {
		this.#debug("formStateRestoreCallback", { state });
		this.value = state ?? "";
	}

	formDisabledCallback(disabled) {
		this.#debug("formDisabledCallback", { disabled });
		if (disabled) this.setAttribute("disabled", "");
		else this.removeAttribute("disabled");
		this.#syncAttributes();
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity() {
		return this.#internals.reportValidity();
	}

	async #ensureOmnibox() {
		this.#debug("ensureOmnibox:start", { hasDefinition: Boolean(customElements.get("pds-omnibox")) });
		if (!customElements.get("pds-omnibox")) {
			const moduleUrl = new URL("./pds-omnibox.js", import.meta.url).href;
			this.#debug("ensureOmnibox:import", { moduleUrl });
			await import(moduleUrl);
		}

		await customElements.whenDefined("pds-omnibox");
		this.#debug("ensureOmnibox:defined");

		if (!this.#omnibox) {
			this.#omnibox = this.#root.querySelector("pds-omnibox");
			this.#debug("ensureOmnibox:query", { found: Boolean(this.#omnibox) });
		}

		this.#syncAttributes();
		this.#applyOmniboxSettings();
		await this.#hydrateSelectedItemsFromSource();
		this.#renderChips();
		this.#syncFormValue();
		this.#debug("ensureOmnibox:end", {
			itemsCount: this.#items.length,
			selected: Array.from(this.#selectedIds),
			settingsInitialized: this.#settingsInitialized,
		});
	}

	#render() {
		this.#root.innerHTML = /* html */ `
			<div class="stack-sm" part="wrap">
				<div class="chips" part="chips" aria-live="polite"></div>
				<span class="empty" part="empty">No tags selected.</span>
				<pds-omnibox part="omnibox"></pds-omnibox>
			</div>
		`;

		this.#chips = this.#root.querySelector(".chips");
		this.#empty = this.#root.querySelector(".empty");
		this.#omnibox = this.#root.querySelector("pds-omnibox");
	}

	#hydrateFromAttributes() {
		this.#debug("hydrateFromAttributes:start", {
			hasOptionsAttr: this.hasAttribute("options"),
			hasValueAttr: this.hasAttribute("value"),
		});
		if (this.hasAttribute("options")) {
			this.#sourceSettings = this.#parseOptionsAttribute(this.getAttribute("options"));
			this.#items = [];
			this.#debug("hydrateFromAttributes:options", {
				hasOptions: Boolean(this.#sourceSettings),
				hasCategories: Boolean(this.#sourceSettings?.categories),
			});
		}

		if (this.hasAttribute("value")) {
			this.#selectedIds = new Set(this.#parseValueList(this.getAttribute("value")));
			this.#debug("hydrateFromAttributes:value", { selected: Array.from(this.#selectedIds) });
		}

		this.#reconcileSelection();
		this.#syncAttributes();
		if (!this.#selectedIds.size || !this.#sourceSettings?.categories) {
			this.#renderChips();
		}
		this.#syncFormValue();
		this.#debug("hydrateFromAttributes:end", {
			knownItemsCount: this.#items.length,
			selected: Array.from(this.#selectedIds),
		});
	}

	async #hydrateSelectedItemsFromSource() {
		if (!this.#selectedIds.size) return;
		const sourceCategories = this.#sourceSettings?.categories;
		if (!sourceCategories || typeof sourceCategories !== "object") return;

		const knownIds = new Set(this.#items.map((item) => item.id));
		const unresolved = new Set(
			Array.from(this.#selectedIds).filter((id) => !this.#selectedItems.has(id) && !knownIds.has(id)),
		);
		if (!unresolved.size) return;

		this.#debug("hydrateSelectedItemsFromSource:start", {
			selected: Array.from(this.#selectedIds),
			unresolved: Array.from(unresolved),
			categoryCount: Object.keys(sourceCategories).length,
		});

		for (const [categoryName, categoryConfig] of Object.entries(sourceCategories)) {
			if (!unresolved.size) break;
			const sourceGetItems = categoryConfig?.getItems;
			if (typeof sourceGetItems !== "function") continue;

			try {
				const incoming = await sourceGetItems({ search: "" });
				const normalized = this.#normalizeResultItems(incoming);
				if (!normalized.length) continue;

				this.#rememberKnownItems(normalized);
				for (const item of normalized) {
					if (!unresolved.has(item.id)) continue;
					this.#selectedItems.set(item.id, item);
					unresolved.delete(item.id);
				}

				this.#debug("hydrateSelectedItemsFromSource:category", {
					categoryName,
					resolvedCount: normalized.length,
					remaining: Array.from(unresolved),
				});
			} catch (error) {
				this.#debug("hydrateSelectedItemsFromSource:error", {
					categoryName,
					error: String(error),
				});
			}
		}

		this.#reconcileSelection();
		if (this.#selectedIds.size) this.#renderChips();
		this.#debug("hydrateSelectedItemsFromSource:end", {
			remaining: Array.from(unresolved),
			selectedItemsCount: this.#selectedItems.size,
		});
	}

	#syncAttributes() {
		this.#debug("syncAttributes:start", {
			hasOmnibox: Boolean(this.#omnibox),
			defined: Boolean(customElements.get("pds-omnibox")),
			placeholder: this.placeholder,
			disabled: this.disabled,
		});
		if (!this.#omnibox) return;
		if (!customElements.get("pds-omnibox")) return;
		this.#omnibox.placeholder = this.placeholder;
		this.#omnibox.disabled = this.disabled;
		this.#omnibox.required = false;
		this.#omnibox.value = "";
		this.#debug("syncAttributes:end");
	}

	#applyOmniboxSettings() {
		this.#debug("applyOmniboxSettings:start", {
			hasOmnibox: Boolean(this.#omnibox),
			defined: Boolean(customElements.get("pds-omnibox")),
			settingsInitialized: this.#settingsInitialized,
			itemsCount: this.#items.length,
		});
		if (!this.#omnibox) return;
		if (!customElements.get("pds-omnibox")) return;
		if (this.#settingsInitialized) return;
		const sourceSettings = this.#resolveSourceSettings();
		if (!sourceSettings) return;
		const nextSettings = this.#buildSettings(sourceSettings);
		if (!nextSettings || !nextSettings.categories || Object.keys(nextSettings.categories).length === 0) return;
		this.#omnibox.settings = nextSettings;
		this.#settingsInitialized = true;
		this.#debug("applyOmniboxSettings:applied", {
			categoryCount: Object.keys(nextSettings.categories).length,
			categoryNames: Object.keys(nextSettings.categories),
		});
	}

	#buildSettings(sourceSettings) {
		this.#debug("buildSettings:start", {
			hasCategories: Boolean(sourceSettings?.categories),
			categoryCount: sourceSettings?.categories
				? Object.keys(sourceSettings.categories).length
				: 0,
		});

		if (!sourceSettings || typeof sourceSettings !== "object") return null;
		const sourceCategories = sourceSettings.categories;
		if (!sourceCategories || typeof sourceCategories !== "object") return null;

		const categories = {};
		for (const [categoryName, categoryConfig] of Object.entries(sourceCategories)) {
			if (!categoryConfig || typeof categoryConfig !== "object") continue;

			const sourceGetItems = categoryConfig.getItems;
			const sourceAction = categoryConfig.action;

			categories[categoryName] = {
				...categoryConfig,
				getItems: async (options) => {
					const liveSearch = String(this.#omnibox?.value || "");
					const forwardedOptions = {
						...(options && typeof options === "object" ? options : {}),
						search: liveSearch,
					};

					const incoming = typeof sourceGetItems === "function"
						? await sourceGetItems(forwardedOptions)
						: [];

					const normalized = this.#normalizeResultItems(incoming);
					this.#rememberKnownItems(normalized);
					for (const item of normalized) {
						this.#selectedItems.set(item.id, item);
					}

					const selected = this.#selectedIds;
					const filtered = normalized.filter((item) => !selected.has(item.id));

					this.#debug("settings.getItems", {
						categoryName,
						liveSearch,
						incomingCount: normalized.length,
						selected: Array.from(selected),
						returnedCount: filtered.length,
						returnedIds: filtered.map((item) => item.id),
					});

					return filtered;
				},
				action: (item) => {
					const normalized = this.#normalizeResultItem(item);
					const id = normalized.id;
					this.#debug("settings.action", { categoryName, item: normalized, id });
					if (!id) return;
					this.#toggleSelection(id, normalized);
					if (typeof sourceAction === "function") sourceAction(item);
				},
			};
		}

		this.#debug("buildSettings:end", {
			categoryNames: Object.keys(categories),
			categoryCount: Object.keys(categories).length,
		});

		const { categories: _ignoredCategories, ...sourceSettingsWithoutCategories } = sourceSettings;
		const normalizedSettings = {
			...sourceSettingsWithoutCategories,
			categories,
		};

		return this.#deepMergeOptions(DEFAULT_OMNIBOX_OPTIONS, normalizedSettings);
	}

	#matchesQuery(item, query) {
		if (!query) return true;
		return (
			item.text.toLowerCase().includes(query) ||
			item.id.toLowerCase().includes(query) ||
			(item.description && item.description.toLowerCase().includes(query))
		);
	}

	#toggleSelection(id, item = null) {
		this.#debug("toggleSelection:start", {
			id,
			disabled: this.disabled,
			selectedBefore: Array.from(this.#selectedIds),
		});
		if (this.disabled || !id) return;
		const key = String(id);
		if (this.#selectedIds.has(key)) {
			this.#selectedIds.delete(key);
			this.#selectedItems.delete(key);
			if (this.#pendingFocusId === key) this.#pendingFocusId = null;
		} else {
			this.#selectedIds.add(key);
			if (item && item.id) this.#selectedItems.set(key, item);
			this.#pendingFocusId = key;
		}

		this.#renderChips();
		this.#syncFormValue();
		this.#resetOmniboxSearchState("toggleSelection");
		this.#debug("toggleSelection:end", { selectedAfter: Array.from(this.#selectedIds) });

		this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
		this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
	}

	#renderChips() {
		if (!this.#chips || !this.#empty) return;

		const selectedItems = Array.from(this.#selectedIds).map((id) => {
			const fromCache = this.#selectedItems.get(id);
			if (fromCache) return fromCache;
			const fromItems = this.#items.find((item) => item.id === id);
			if (fromItems) return fromItems;
			return { id, text: id, description: "", icon: "", category: "Options" };
		});
		this.#debug("renderChips", {
			selectedCount: selectedItems.length,
			selectedIds: selectedItems.map((item) => item.id),
		});

		this.#chips.textContent = "";
		for (const item of selectedItems) {
			const chip = document.createElement("button");
			chip.type = "button";
			chip.className = "btn-secondary btn-sm";
			chip.part = "chip";
			chip.dataset.tagId = item.id;
			chip.innerHTML = /* html */ `${item.text} <pds-icon icon="x" size="xs" aria-hidden="true"></pds-icon>`;
			chip.disabled = this.disabled;
			chip.setAttribute("aria-label", `Remove ${item.text}`);
			chip.addEventListener("click", () => {
				this.#toggleSelection(item.id);
			});

			this.#chips.appendChild(chip);
		}

		this.#empty.hidden = selectedItems.length > 0;

		if (this.#pendingFocusId) {
			const focusSelector = `button[data-tag-id="${CSS.escape(this.#pendingFocusId)}"]`;
			const focusTarget = this.#chips.querySelector(focusSelector);
			this.#pendingFocusId = null;
			if (focusTarget && !focusTarget.disabled) {
				queueMicrotask(() => focusTarget.focus());
			}
		}
	}

	#syncFormValue() {
		const selected = Array.from(this.#selectedIds);
		const serialized = selected.join(",");
		this.#debug("syncFormValue:start", {
			selected,
			serialized,
			required: this.required,
			name: this.name,
		});

		this.#syncingValueAttribute = true;
		try {
			if (serialized) {
				if (this.getAttribute("value") !== serialized) {
					this.setAttribute("value", serialized);
				}
			} else if (this.hasAttribute("value")) {
				this.removeAttribute("value");
			}
		} finally {
			this.#syncingValueAttribute = false;
		}

		if (this.name && selected.length > 0) {
			const formData = new FormData();
			for (const value of selected) {
				formData.append(this.name, value);
			}
			this.#internals.setFormValue(formData, serialized);
		} else {
			this.#internals.setFormValue(serialized || "", serialized || "");
		}

		if (this.required && selected.length === 0) {
			this.#debug("syncFormValue:invalid", { reason: "valueMissing" });
			this.#internals.setValidity(
				{ valueMissing: true },
				"Please select at least one option.",
				this.#omnibox || this,
			);
			return;
		}

		this.#internals.setValidity({});
		this.#debug("syncFormValue:valid");
	}

	#parseOptionsAttribute(value) {
		this.#debug("parseOptionsAttribute:start", { hasValue: Boolean(value), rawType: typeof value });
		if (!value) return null;
		try {
			const parsed = JSON.parse(value);
			const valid = parsed && typeof parsed === "object" && !Array.isArray(parsed)
				? parsed
				: null;
			this.#debug("parseOptionsAttribute:parsed", {
				valid: Boolean(valid),
				hasCategories: Boolean(valid?.categories),
			});
			return valid;
		} catch {
			this.#debug("parseOptionsAttribute:error", { value });
			return null;
		}
	}

	#normalizeItems(list) {
		this.#debug("normalizeItems:start", { isArray: Array.isArray(list), length: Array.isArray(list) ? list.length : undefined });
		const normalized = [];

		for (const raw of list) {
			if (typeof raw === "string") {
				normalized.push({
					id: raw,
					text: raw,
					description: "",
					icon: "",
					category: "Options",
				});
				continue;
			}

			if (!raw || typeof raw !== "object") continue;

			const id = String(raw.id ?? raw.value ?? raw.text ?? "").trim();
			if (!id) continue;

			const text = String(raw.text ?? raw.label ?? id);
			normalized.push({
				id,
				text,
				description: raw.description ? String(raw.description) : "",
				icon: raw.icon ? String(raw.icon) : "",
				category: this.#normalizeCategory(raw.category),
			});
		}

		this.#debug("normalizeItems:end", { length: normalized.length, ids: normalized.map((item) => item.id) });
		return normalized;
	}

	#normalizeResultItem(raw) {
		if (typeof raw === "string") {
			const id = String(raw);
			return { id, text: id };
		}

		if (!raw || typeof raw !== "object") return { id: "", text: "" };

		const id = String(raw.id ?? raw.value ?? raw.text ?? "").trim();
		const text = String(raw.text ?? raw.label ?? id);
		return {
			...raw,
			id,
			text,
		};
	}

	#normalizeResultItems(list) {
		if (!Array.isArray(list)) return [];
		return list
			.map((item) => this.#normalizeResultItem(item))
			.filter((item) => item.id);
	}

	#parseValueList(value) {
		const raw = String(value ?? "").trim();
		this.#debug("parseValueList", { value, raw });
		if (!raw) return [];
		return raw
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
	}

	#normalizeCategory(value) {
		const normalized = String(value ?? "").trim();
		this.#debug("normalizeCategory", { value, normalized });
		if (!normalized) return "Options";
		const lower = normalized.toLowerCase();
		if (lower === "null" || lower === "undefined") return "Options";
		return normalized;
	}

	#reconcileSelection() {
		this.#debug("reconcileSelection:start", { selectedBefore: Array.from(this.#selectedIds) });
		if (!this.#selectedIds.size) {
			for (const id of Array.from(this.#selectedItems.keys())) {
				this.#selectedItems.delete(id);
			}
			return;
		}
		for (const id of Array.from(this.#selectedItems.keys())) {
			if (!this.#selectedIds.has(id)) this.#selectedItems.delete(id);
		}
		this.#debug("reconcileSelection:end", { selectedAfter: Array.from(this.#selectedIds) });
	}

	#resolveSourceSettings() {
		if (this.#sourceSettings && typeof this.#sourceSettings === "object") {
			return this.#sourceSettings;
		}
		return null;
	}

	#rememberKnownItems(items = []) {
		if (!Array.isArray(items) || items.length === 0) return;
		const byId = new Map(this.#items.map((item) => [item.id, item]));
		for (const item of items) {
			if (!item?.id) continue;
			byId.set(item.id, item);
		}
		this.#items = Array.from(byId.values());
	}

	#deepMergeOptions(base = {}, override = {}) {
		const output = this.#clonePlainObject(base);
		for (const [key, value] of Object.entries(override || {})) {
			if (
				this.#isPlainObject(value)
				&& this.#isPlainObject(output[key])
			) {
				output[key] = this.#deepMergeOptions(output[key], value);
				continue;
			}
			output[key] = value;
		}
		return output;
	}

	#clonePlainObject(value) {
		if (!this.#isPlainObject(value)) return value;
		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [
				key,
				this.#isPlainObject(entry) ? this.#clonePlainObject(entry) : entry,
			]),
		);
	}

	#isPlainObject(value) {
		return Boolean(value) && typeof value === "object" && !Array.isArray(value);
	}

	#resetOmniboxSearchState(reason = "unknown") {
		if (!this.#omnibox) return;

		this.#omnibox.value = "";

		const input = this.#omnibox.shadowRoot?.querySelector("input");
		if (!input) {
			this.#debug("resetOmniboxSearchState:no-input", { reason });
			return;
		}

		if (input.value !== "") input.value = "";

		const autoComplete = input._autoComplete;
		autoComplete?.controller?.().clear?.(`pds-tags:${reason}`);

		this.#debug("resetOmniboxSearchState", {
			reason,
			inputValue: input.value,
			hasAutoComplete: Boolean(autoComplete),
		});
	}

	#debug(message, details) {
		return;
	}
}

if (!customElements.get("pds-tags")) {
	customElements.define("pds-tags", PdsTags);
}
