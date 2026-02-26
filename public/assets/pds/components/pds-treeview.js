import { PDS } from "#pds";

/**
 * Accessible, form-associated treeview with nested UL output.
 *
 * @element pds-treeview
 * @formAssociated
 *
 * @attr {string} name - Form field name.
 * @attr {string} value - Selected node value.
 * @attr {boolean} disabled - Disables interaction.
 * @attr {boolean} required - Requires a selected node for form validity.
 * @attr {boolean} display-only - Renders as browse-only tree without selection.
 * @attr {boolean} expanded-all - Expands all branch nodes on load.
 * @attr {"off"|"checkboxes"|"auto"} multiselect - Selection mode. "off" keeps single-select behavior.
 * @attr {string} src - Optional URL source for tree JSON.
 *
 * @property {object} settings - Data and behavior settings object.
 * @property {object} options - Alias for settings.
 * @property {string[]} values - Selected values when multiselect is enabled.
 * @property {Function} settings.getChildren - Optional async child loader invoked on first expand per node.
 *
 * @fires treeview-load Fired after root data has been loaded and indexed.
 * @fires treeview-error Fired when root source loading fails.
 * @fires node-toggle Fired when a branch node is expanded or collapsed.
 * @fires node-select Fired when a node is selected.
 * @fires node-load Fired when lazy children for an expanded node are loaded.
 * @fires node-load-error Fired when lazy children loading fails for a node.
 */

const LAYERS = ["tokens", "primitives", "components", "utilities"];
const ROOT_SELECTOR = ".tv-tree";

/**
 * @typedef {object} PdsTreeviewNode
 * @property {string} id
 * @property {string} text
 * @property {string} value
 * @property {string|null} [link]
 * @property {string|null} [icon]
 * @property {string|null} [image]
 * @property {object} [data]
 * @property {boolean} hasChildren
 * @property {boolean} childrenLoaded
 * @property {boolean} loadingChildren
 * @property {PdsTreeviewNode[]} children
 */

/**
 * @typedef {object} PdsTreeviewOptions
 * @property {PdsTreeviewNode[]|object|Function|string} [source] Root data source.
 * @property {PdsTreeviewNode[]|object} [items] Alias for `source`.
 * @property {PdsTreeviewNode[]|object} [data] Alias for `source`.
 * @property {(context: { host: PdsTreeview, options: PdsTreeviewOptions, settings: PdsTreeviewOptions }) => Promise<any>|any} [getItems] Async/sync root loader.
 * @property {(context: { host: PdsTreeview, node: PdsTreeviewNode, nodeId: string, options: PdsTreeviewOptions, settings: PdsTreeviewOptions }) => Promise<any>|any} [getChildren] Lazy child loader called on first expand.
 * @property {(source: any, context: { host: PdsTreeview, options: PdsTreeviewOptions, settings: PdsTreeviewOptions }) => Promise<any>|any} [transform] Root response transformer.
 * @property {(source: any, context: { host: PdsTreeview, node: PdsTreeviewNode, nodeId: string, options: PdsTreeviewOptions, settings: PdsTreeviewOptions }) => Promise<any>|any} [transformChildren] Child response transformer.
 * @property {RequestInit} [fetch] Fetch options used for URL-based sources.
 * @property {boolean} [expandedAll] Expands all branches by default.
 * @property {string[]} [defaultExpanded] Node ids expanded on initial render.
 * @property {(node: PdsTreeviewNode, host: PdsTreeview) => void} [onSelect] Selection callback invoked for user-driven selection.
 */

export class PdsTreeview extends HTMLElement {
	static formAssociated = true;

	static get observedAttributes() {
		return ["name", "value", "disabled", "required", "display-only", "expanded-all", "multiselect", "src"];
	}

	#root;
	#internals;
	#settings = {};
	#nodes = [];
	#expandedIds = new Set();
	#nodeById = new Map();
	#parentById = new Map();
	#selectedId = null;
	#selectedIds = new Set();
	#focusedId = null;
	#defaultValue = "";
	#loadToken = 0;
	#childrenLoadPromises = new Map();
	#multiselectAutoQuery =
		typeof window !== "undefined" && typeof window.matchMedia === "function"
			? window.matchMedia("(hover: none), (pointer: coarse)")
			: null;
	#onMultiselectAutoQueryChange = () => {
		if (this.multiselect === "auto") {
			this.#renderTree();
		}
	};

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: "open" });
		this.#internals = this.attachInternals();
		if (!this.hasAttribute("tabindex")) {
			this.tabIndex = -1;
		}
		this.#renderShell();
		void this.#adoptStyles();
	}

	connectedCallback() {
		this.#defaultValue = this.getAttribute("value") || "";
		if (this.#multiselectAutoQuery?.addEventListener) {
			this.#multiselectAutoQuery.addEventListener("change", this.#onMultiselectAutoQueryChange);
		}
		this.#syncAttributes();
		void this.refresh();
	}

	disconnectedCallback() {
		if (this.#multiselectAutoQuery?.removeEventListener) {
			this.#multiselectAutoQuery.removeEventListener("change", this.#onMultiselectAutoQueryChange);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (name === "src") {
			void this.refresh();
			return;
		}
		if (name === "multiselect") {
			this.#syncAttributes();
			this.#renderTree();
			return;
		}
		this.#syncAttributes();
		if (name === "value" && this.#nodes.length) {
			this.selectByValue(newValue ?? "");
		}
	}

	formAssociatedCallback() {}

	formDisabledCallback(disabled) {
		this.toggleAttribute("disabled", Boolean(disabled));
		this.#syncAttributes();
	}

	formResetCallback() {
		if (this.#isMultiSelectEnabled()) {
			this.values = [];
			this.value = "";
		} else {
			this.value = this.#defaultValue;
			this.selectByValue(this.#defaultValue);
		}
	}

	formStateRestoreCallback(state) {
		if (this.#isMultiSelectEnabled()) {
			if (Array.isArray(state)) {
				this.values = state;
				return;
			}
			if (state instanceof FormData) {
				this.values = this.name ? state.getAll(this.name) : [];
				return;
			}
		}
		this.value = state ?? "";
		this.selectByValue(this.value);
	}

	/**
	 * Current runtime settings for data loading and behavior.
	 *
	 * @type {PdsTreeviewOptions}
	 */
	get settings() {
		return this.#settings;
	}

	/**
	 * @param {PdsTreeviewOptions|null|undefined} value
	 */
	set settings(value) {
		this.#settings = value && typeof value === "object" ? value : {};
		void this.refresh();
	}

	/**
	 * Alias for `settings`.
	 *
	 * @type {PdsTreeviewOptions}
	 */
	get options() {
		return this.settings;
	}

	/**
	 * @param {PdsTreeviewOptions|null|undefined} value
	 */
	set options(value) {
		this.settings = value;
	}

	/**
	 * Form field name used when participating in form submission.
	 *
	 * @type {string}
	 */
	get name() {
		return this.getAttribute("name") || "";
	}

	/**
	 * @param {string|null|undefined} value
	 */
	set name(value) {
		if (value == null || value === "") this.removeAttribute("name");
		else this.setAttribute("name", value);
	}

	/**
	 * Selected value for single-select mode.
	 *
	 * @type {string}
	 */
	get value() {
		return this.getAttribute("value") || "";
	}

	/**
	 * @param {string|null|undefined} value
	 */
	set value(value) {
		const next = value == null ? "" : String(value);
		if (next === "") this.removeAttribute("value");
		else this.setAttribute("value", next);
	}

	/**
	 * Selected values in multiselect mode.
	 *
	 * @type {string[]}
	 */
	get values() {
		return this.selectedNodes.map((node) => String(node.value));
	}

	/**
	 * @param {Array<string|number>|null|undefined} values
	 */
	set values(values) {
		if (!Array.isArray(values)) {
			this.#selectedIds.clear();
			this.#selectedId = null;
			this.#syncValue();
			this.#renderTree();
			return;
		}
		this.selectByValues(values);
	}

	/**
	 * Disables interactions when true.
	 *
	 * @type {boolean}
	 */
	get disabled() {
		return this.hasAttribute("disabled");
	}

	/**
	 * @param {boolean} value
	 */
	set disabled(value) {
		if (value) this.setAttribute("disabled", "");
		else this.removeAttribute("disabled");
	}

	/**
	 * Requires at least one selected node for form validity.
	 *
	 * @type {boolean}
	 */
	get required() {
		return this.hasAttribute("required");
	}

	/**
	 * @param {boolean} value
	 */
	set required(value) {
		if (value) this.setAttribute("required", "");
		else this.removeAttribute("required");
	}

	/**
	 * Read-only presentation mode; disables selection and form value syncing.
	 *
	 * @type {boolean}
	 */
	get displayOnly() {
		return this.hasAttribute("display-only");
	}

	/**
	 * @param {boolean} value
	 */
	set displayOnly(value) {
		if (value) this.setAttribute("display-only", "");
		else this.removeAttribute("display-only");
	}

	/**
	 * Expands all branch nodes after data load.
	 *
	 * @type {boolean}
	 */
	get expandedAll() {
		return this.hasAttribute("expanded-all");
	}

	/**
	 * @param {boolean} value
	 */
	set expandedAll(value) {
		if (value) this.setAttribute("expanded-all", "");
		else this.removeAttribute("expanded-all");
	}

	/**
	 * Selection mode.
	 *
	 * - `off`: single select
	 * - `checkboxes`: persistent multiselect with checkboxes
	 * - `auto`: touch/coarse pointer gets checkbox mode
	 *
	 * @type {"off"|"checkboxes"|"auto"}
	 */
	get multiselect() {
		return this.#normalizeMultiselect(this.getAttribute("multiselect"));
	}

	/**
	 * @param {"off"|"checkboxes"|"auto"|string|null|undefined} value
	 */
	set multiselect(value) {
		const next = this.#normalizeMultiselect(value);
		if (next === "off") {
			this.removeAttribute("multiselect");
		} else {
			this.setAttribute("multiselect", next);
		}
	}

	/**
	 * First selected node (or active selected node in multiselect).
	 *
	 * @type {PdsTreeviewNode|null}
	 */
	get selectedNode() {
		const selectedId = this.#selectedId && this.#selectedIds.has(this.#selectedId)
			? this.#selectedId
			: this.#selectedIds.values().next().value || null;
		return selectedId ? this.#nodeById.get(selectedId) || null : null;
	}

	/**
	 * All selected nodes.
	 *
	 * @type {PdsTreeviewNode[]}
	 */
	get selectedNodes() {
		return Array.from(this.#selectedIds)
			.map((id) => this.#nodeById.get(id))
			.filter(Boolean);
	}

	/**
	 * Backward-compatible accessor for `selectedNode`.
	 *
	 * @returns {PdsTreeviewNode|null}
	 */
	getSelectedNode() {
		return this.selectedNode;
	}

	/**
	 * Backward-compatible accessor for `selectedNodes`.
	 *
	 * @returns {PdsTreeviewNode[]}
	 */
	getSelectedNodes() {
		return this.selectedNodes;
	}

	/**
	 * Reloads tree data from settings/source and re-renders the component.
	 *
	 * @returns {Promise<void>}
	 */
	async refresh() {
		const loadToken = ++this.#loadToken;
		const host = this.#root.querySelector(".tv-host");
		if (host) host.dataset.state = "loading";

		try {
			const sourceData = await this.#resolveSource();
			if (loadToken !== this.#loadToken) return;
			this.#ingestData(sourceData);
			this.#renderTree();
			this.#restoreSelection();
			this.dispatchEvent(
				new CustomEvent("treeview-load", {
					detail: { nodes: this.#nodes },
					bubbles: true,
					composed: true,
				}),
			);
			if (host) host.dataset.state = "ready";
		} catch (error) {
			if (loadToken !== this.#loadToken) return;
			console.error("pds-treeview: failed to load data", error);
			this.#nodes = [];
			this.#nodeById.clear();
			this.#parentById.clear();
			this.#expandedIds.clear();
			this.#selectedId = null;
			this.#selectedIds.clear();
			this.#focusedId = null;
			this.#renderTree();
			if (host) host.dataset.state = "error";
			this.dispatchEvent(
				new CustomEvent("treeview-error", {
					detail: { error },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	/**
	 * Expands every currently indexed branch node.
	 *
	 * @returns {void}
	 */
	expandAll() {
		for (const [id, node] of this.#nodeById.entries()) {
			if (node.children?.length) this.#expandedIds.add(id);
		}
		this.#renderTree();
	}

	/**
	 * Collapses every expanded branch node.
	 *
	 * @returns {void}
	 */
	collapseAll() {
		this.#expandedIds.clear();
		this.#renderTree();
	}

	/**
	 * Selects a node by node id.
	 *
	 * @param {string} id
	 * @returns {boolean} True when selection succeeds.
	 */
	selectById(id) {
		if (!id || !this.#nodeById.has(id)) return false;
		this.#selectNode(id, { user: false, focus: true, mode: "exclusive" });
		return true;
	}

	/**
	 * Selects the first node whose `value` matches.
	 *
	 * @param {string|number|null|undefined} value
	 * @returns {boolean} True when a matching node is selected or selection is cleared.
	 */
	selectByValue(value) {
		const normalized = value == null ? "" : String(value);
		if (!normalized) {
			this.#selectedId = null;
			this.#selectedIds.clear();
			this.#syncValue();
			this.#renderTree();
			return true;
		}
		for (const [id, node] of this.#nodeById.entries()) {
			if (String(node.value) === normalized) {
				this.#expandAncestors(id);
				this.#selectNode(id, { user: false, focus: false, mode: "exclusive" });
				return true;
			}
		}
		return false;
	}

	/**
	 * Selects multiple nodes by value.
	 *
	 * In single-select mode, only the first resolved value is selected.
	 *
	 * @param {Array<string|number>} values
	 * @returns {boolean} True when at least one matching value is resolved or selection is cleared.
	 */
	selectByValues(values) {
		if (!Array.isArray(values)) return false;
		const normalized = values
			.map((value) => String(value))
			.filter((value) => value.length > 0);
		if (!normalized.length) {
			this.#selectedIds.clear();
			this.#selectedId = null;
			this.#syncValue();
			this.#renderTree();
			return true;
		}

		const selectedIds = [];
		for (const expected of normalized) {
			for (const [id, node] of this.#nodeById.entries()) {
				if (String(node.value) !== expected) continue;
				if (!selectedIds.includes(id)) {
					selectedIds.push(id);
					this.#expandAncestors(id);
				}
				break;
			}
		}

		if (!selectedIds.length) {
			return false;
		}

		if (this.#isMultiSelectEnabled()) {
			this.#selectedIds = new Set(selectedIds);
			this.#selectedId = selectedIds[0] || null;
			this.#renderTree();
			this.#syncValue();
			return true;
		}

		return this.selectById(selectedIds[0]);
	}

	/**
	 * Runs form-associated validity checks.
	 *
	 * @returns {boolean}
	 */
	checkValidity() {
		this.#syncValidity();
		return this.#internals.checkValidity();
	}

	/**
	 * Runs and reports form-associated validity checks.
	 *
	 * @returns {boolean}
	 */
	reportValidity() {
		this.#syncValidity();
		return this.#internals.reportValidity();
	}

	/**
	 * Focuses the active/selected row, or first visible row as fallback.
	 *
	 * @param {FocusOptions} [options]
	 * @returns {void}
	 */
	focus(options) {
		const targetId =
			this.#focusedId || this.#selectedId || this.#selectedIds.values().next().value || this.#firstVisibleId();
		if (targetId) {
			this.#focusRow(targetId);
			return;
		}
		super.focus(options);
	}

	#renderShell() {
		this.#root.innerHTML = `
			<div class="tv-host" data-state="ready">
				<ul class="tv-tree" role="tree" aria-label="Treeview"></ul>
			</div>
		`;

		this.#root.addEventListener("click", (event) => {
			const target = event.target;
			if (!(target instanceof Element) || this.disabled) return;

			const toggle = target.closest(".tv-toggle");
			if (toggle) {
				const id = toggle.getAttribute("data-node-id");
				if (id) void this.#toggleNode(id, true);
				return;
			}

			const row = target.closest(".tv-row");
			if (!row) return;
			const id = row.getAttribute("data-node-id");
			if (!id) return;

			const checkbox = target.closest(".tv-checkbox-input");
			if (checkbox) {
				if (!this.displayOnly) {
					this.#selectNode(id, { user: true, focus: true, mode: "toggle" });
				}
				return;
			}

			if (event instanceof MouseEvent && event.detail === 2) {
				void this.#toggleNode(id, true);
				if (!this.displayOnly) {
					const mode = this.#isMultiSelectEnabled() ? "exclusive" : "exclusive";
					this.#selectNode(id, { user: true, focus: true, mode });
				} else {
					this.#focusRow(id);
				}
				return;
			}

			if (!this.displayOnly) {
				const mouseEvent = event instanceof MouseEvent ? event : null;
				const useToggleMode =
					this.#isCheckboxSelectionMode() ||
					Boolean(mouseEvent?.ctrlKey || mouseEvent?.metaKey);
				const mode = !this.#isMultiSelectEnabled()
					? "exclusive"
					: useToggleMode
						? "toggle"
						: "exclusive";
				this.#selectNode(id, { user: true, focus: true, mode });
			} else {
				this.#focusRow(id);
			}
		});

		this.#root.addEventListener("focusin", (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			const row = target.closest(".tv-row");
			if (!row) return;
			const id = row.getAttribute("data-node-id");
			if (!id) return;
			this.#focusedId = id;
			this.#syncTabStops();
		});

		this.#root.addEventListener("keydown", (event) => {
			if (this.disabled) return;
			const handled = this.#handleKeydown(event);
			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		});

		this.#syncAriaMultiselect();
	}

	async #adoptStyles() {
		const componentStyles = PDS.createStylesheet(/*css*/ `
			@layer treeview {
				:host {
					display: block;
					--tv-indent: var(--spacing-5);
					--tv-toggle-size: 30px;
					--tv-row-height: var(--tv-toggle-size);
				}

				.tv-host {
					color: var(--color-text-primary);
				}

				.tv-tree,
				.tv-group {
					list-style: none;
					margin: var(--spacing-0);
					padding: var(--spacing-0);
				}

				.tv-group {
					margin-inline-start: var(--tv-indent);
				}

				.tv-item {
					margin: var(--spacing-0);
					padding: var(--spacing-0);
				}

				.tv-row {
					min-height: var(--tv-row-height);
					display: grid;
					grid-template-columns: var(--tv-toggle-size) 1fr;
					align-items: center;
					gap: var(--spacing-1);
					border-radius: var(--radius-sm);
					cursor: default;
					outline: none;
				}

				.tv-row.tv-row-has-prefix {
					grid-template-columns: var(--tv-toggle-size) auto 1fr;
				}

				.tv-row.tv-row-has-checkbox {
					grid-template-columns: var(--tv-toggle-size) auto 1fr;
				}

				.tv-row.tv-row-has-prefix.tv-row-has-checkbox {
					grid-template-columns: var(--tv-toggle-size) auto auto 1fr;
				}

				.tv-row[aria-selected="true"] {
					background: var(--color-surface-hover);
					color: var(--color-text-primary);
				}

				.tv-row:focus-visible {
					box-shadow: inset 0 0 0 1px var(--color-primary-500);
					background: var(--color-surface-hover);
				}

				.tv-toggle,
				.tv-toggle-gap {
					width: var(--tv-toggle-size);
					height: var(--tv-toggle-size);
					display: inline-grid;
					place-items: center;
					font-weight: var(--font-weight-semibold);
				}

				.tv-toggle {
					min-width: var(--tv-toggle-size);
					min-height: var(--tv-toggle-size);
					aspect-ratio: 1 / 1;
					border: 1px solid transparent;
					border-radius: var(--radius-sm);
					background: transparent;
					color: var(--color-text-muted);
					padding: var(--spacing-0);
					line-height: 1;
					cursor: pointer;
				}

				.tv-toggle:hover {
					border-color: var(--color-primary-500);
					color: var(--color-text-primary);
				}

				.tv-check {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: var(--tv-toggle-size);
					height: var(--tv-toggle-size);
				}

				.tv-checkbox-input {
					margin: var(--spacing-0);
				}

				:host([disabled]) .tv-row,
				:host([disabled]) .tv-toggle,
				.tv-host[data-state="loading"] .tv-row {
					opacity: 0.65;
					cursor: not-allowed;
					pointer-events: none;
				}

				.tv-prefix {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: var(--spacing-5);
					height: var(--spacing-5);
					color: var(--color-text-muted);
				}

				.tv-prefix img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: var(--radius-sm);
				}

				.tv-label {
					min-width: 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.tv-label-link {
					color: inherit;
					text-decoration: none;
				}

				.tv-label-link:hover,
				.tv-label-link:focus-visible {
					text-decoration: underline;
				}
			}
		`);

		const existingSheets = Array.isArray(this.#root.adoptedStyleSheets)
			? this.#root.adoptedStyleSheets
			: [];
		this.#root.adoptedStyleSheets = [
			...existingSheets.filter((sheet) => sheet !== componentStyles),
			componentStyles,
		];

		await PDS.adoptLayers(this.#root, LAYERS, [componentStyles]);
	}

	#syncAttributes() {
		if (!this.#isMultiSelectEnabled() && this.#selectedIds.size > 1) {
			const keepId =
				(this.#selectedId && this.#selectedIds.has(this.#selectedId) && this.#selectedId) ||
				this.#selectedIds.values().next().value ||
				null;
			this.#selectedIds = keepId ? new Set([keepId]) : new Set();
			this.#selectedId = keepId;
		}
		if (this.#selectedId && !this.#selectedIds.has(this.#selectedId)) {
			this.#selectedIds.add(this.#selectedId);
		}
		if (!this.#selectedId && this.#selectedIds.size > 0) {
			this.#selectedId = this.#selectedIds.values().next().value || null;
		}

		this.#syncAriaMultiselect();
		this.#syncValue();
		this.#syncTabStops();
	}

	async #resolveSource() {
		const options = this.#settings || {};
		const getItems =
			typeof options.getItems === "function" ? options.getItems : null;

		let source =
			options.source ??
			options.items ??
			options.data ??
			this.getAttribute("src") ??
			null;

		if (!source && getItems) {
			source = await getItems({ host: this, options, settings: options });
		}

		source = await this.#resolveDynamicSource(source, { options, settings: options, host: this }, options.fetch);

		if (typeof options.transform === "function") {
			source = await options.transform(source, { host: this, options, settings: options });
		}

		return source;
	}

	async #fetchJson(url, fetchOptions) {
		const response = await fetch(url, fetchOptions || {});
		if (!response.ok) {
			throw new Error(`Failed to load tree data (${response.status})`);
		}
		return response.json();
	}

	async #resolveDynamicSource(source, context, fetchOptions) {
		if (typeof source === "function") {
			source = await source(context);
		} else if (typeof source === "string") {
			source = await this.#fetchJson(source, fetchOptions);
		} else if (source && typeof source === "object" && !Array.isArray(source) && typeof source.url === "string") {
			const response = await this.#fetchJson(source.url, source.fetch || fetchOptions);
			source = typeof source.mapResponse === "function" ? source.mapResponse(response) : response;
		}

		return source;
	}

	#ingestData(source) {
		const settings = this.#settings || {};
		const list = Array.isArray(source) ? source : source ? [source] : [];
		const roots = list.map((node, index) => this.#normalizeNode(node, [], index)).filter(Boolean);

		this.#nodes = roots;
		this.#reindexNodes();

		if (this.expandedAll || settings.expandedAll) {
			this.#expandedIds = new Set(
				Array.from(this.#nodeById.values())
					.filter((node) => node.children.length)
					.map((node) => node.id),
			);
		} else {
			this.#expandedIds.clear();
			const defaultExpanded = settings.defaultExpanded ?? [];
			for (const id of defaultExpanded) {
				if (this.#nodeById.has(id)) this.#expandedIds.add(id);
			}
		}
	}

	#normalizeNode(rawNode, path, index) {
		if (!rawNode || typeof rawNode !== "object") return null;

		const rawId = rawNode.id ?? rawNode.value ?? rawNode.key;
		const fallbackId = [...path, index + 1].join(".");
		const id = String(rawId ?? fallbackId);

		const text = String(rawNode.text ?? rawNode.label ?? rawNode.title ?? id);
		const value = String(rawNode.value ?? rawNode.id ?? id);
		const link = this.#sanitizeLink(rawNode.link ?? rawNode.href ?? null);
		const icon = rawNode.icon ?? rawNode.prefixIcon ?? rawNode.prefix?.icon ?? null;
		const image = rawNode.image ?? rawNode.prefixImage ?? rawNode.prefix?.image ?? null;
		const childrenRaw =
			rawNode.children ?? rawNode.subnodes ?? rawNode.nodes ?? rawNode.items ?? [];
		const childArray = Array.isArray(childrenRaw) ? childrenRaw : [];
		const nextPath = [...path, id];
		const children = childArray
			.map((child, childIndex) => this.#normalizeNode(child, nextPath, childIndex))
			.filter(Boolean);
		const explicitHasChildren = rawNode.hasChildren ?? rawNode.hasChildNodes ?? rawNode.branch;
		const hasChildren =
			typeof explicitHasChildren === "boolean"
				? explicitHasChildren || children.length > 0
				: children.length > 0;
		const explicitLoaded = rawNode.childrenLoaded;
		const childrenLoaded =
			typeof explicitLoaded === "boolean"
				? explicitLoaded
				: childArray.length > 0 || !hasChildren;

		return {
			id,
			text,
			value,
			link,
			icon,
			image,
			data: rawNode,
			hasChildren,
			childrenLoaded,
			loadingChildren: false,
			children,
		};
	}

	#reindexNodes() {
		this.#nodeById.clear();
		this.#parentById.clear();

		const visit = (node, parentId) => {
			this.#nodeById.set(node.id, node);
			if (parentId) this.#parentById.set(node.id, parentId);
			for (const child of node.children) visit(child, node.id);
		};
		for (const node of this.#nodes) visit(node, null);
	}

	#renderTree() {
		const tree = this.#root.querySelector(ROOT_SELECTOR);
		if (!tree) return;
		tree.innerHTML = this.#renderNodes(this.#nodes, 1, this.#canRenderLinks());
		this.#syncAriaMultiselect();

		if (!this.#focusedId) {
			this.#focusedId = this.#selectedId || this.#selectedIds.values().next().value || this.#firstVisibleId() || null;
		}
		this.#syncTabStops();
		this.#syncValue();
	}

	#renderNodes(nodes, level, linksEnabled) {
		if (!nodes.length) return "";
		const useCheckboxes = this.#isCheckboxSelectionMode();

		return nodes
			.map((node) => {
				const expanded = this.#expandedIds.has(node.id);
				const hasChildren = Boolean(node.hasChildren);
				const hasPrefix = Boolean(node.image || node.icon);
				const selected = this.#selectedIds.has(node.id);
				const toggleGlyph = node.loadingChildren ? "…" : expanded ? "−" : "+";
				const toggle = hasChildren
					? `<button type="button" class="tv-toggle icon-only" data-node-id="${this.#escapeAttribute(node.id)}" aria-label="${expanded ? "Collapse" : "Expand"} ${this.#escapeAttribute(node.text)}" ${node.loadingChildren ? "disabled" : ""}>${toggleGlyph}</button>`
					: `<span class="tv-toggle-gap" aria-hidden="true"></span>`;
				const checkbox = useCheckboxes
					? `<span class="tv-check"><input class="tv-checkbox-input" type="checkbox" data-node-id="${this.#escapeAttribute(node.id)}" aria-label="Select ${this.#escapeAttribute(node.text)}" ${selected ? "checked" : ""} ${this.disabled ? "disabled" : ""}></span>`
					: "";
				const prefix = this.#renderPrefix(node);
				const rowClassParts = ["tv-row", hasPrefix ? "tv-row-has-prefix" : "tv-row-no-prefix"];
				if (useCheckboxes) rowClassParts.push("tv-row-has-checkbox");
				const rowClass = rowClassParts.join(" ");
				const label = linksEnabled && node.link
					? `<a class="tv-label tv-label-link" href="${this.#escapeAttribute(node.link)}">${this.#escapeHtml(node.text)}</a>`
					: `<span class="tv-label">${this.#escapeHtml(node.text)}</span>`;
				const childGroup =
					hasChildren && expanded
						? `<ul class="tv-group" role="group">${this.#renderNodes(node.children, level + 1, linksEnabled)}</ul>`
						: "";

				return `
					<li class="tv-item" role="none">
						<div
							class="${rowClass}"
							role="treeitem"
							aria-level="${level}"
							${hasChildren ? `aria-expanded="${expanded ? "true" : "false"}"` : ""}
							${node.loadingChildren ? "aria-busy=\"true\"" : ""}
							aria-selected="${selected ? "true" : "false"}"
							data-node-id="${this.#escapeAttribute(node.id)}"
							tabindex="-1"
						>
							${toggle}
							${checkbox}
							${prefix}
							${label}
						</div>
						${childGroup}
					</li>
				`;
			})
			.join("");
	}

	#canRenderLinks() {
		return !this.closest("form");
	}

	#renderPrefix(node) {
		if (node.image) {
			return `<span class="tv-prefix"><img src="${this.#escapeAttribute(node.image)}" alt="" loading="lazy" /></span>`;
		}
		if (node.icon) {
			return `<span class="tv-prefix"><pds-icon icon="${this.#escapeAttribute(node.icon)}"></pds-icon></span>`;
		}
		return "";
	}

	#handleKeydown(event) {
		const key = event.key;
		const visibleIds = this.#getVisibleIds();
		if (!visibleIds.length) return false;

		const activeId = this.#focusedId && visibleIds.includes(this.#focusedId)
			? this.#focusedId
			: visibleIds[0];
		const currentIndex = visibleIds.indexOf(activeId);
		const currentNode = this.#nodeById.get(activeId);

		if (!currentNode) return false;

		if (key === "ArrowDown") {
			const nextId = visibleIds[Math.min(visibleIds.length - 1, currentIndex + 1)];
			this.#focusRow(nextId);
			return true;
		}

		if (key === "ArrowUp") {
			const prevId = visibleIds[Math.max(0, currentIndex - 1)];
			this.#focusRow(prevId);
			return true;
		}

		if (key === "Home") {
			this.#focusRow(visibleIds[0]);
			return true;
		}

		if (key === "End") {
			this.#focusRow(visibleIds[visibleIds.length - 1]);
			return true;
		}

		if (key === "ArrowRight") {
			if (currentNode.hasChildren && !this.#expandedIds.has(activeId)) {
				void this.#toggleNode(activeId, true);
				return true;
			}
			if (currentNode.hasChildren && this.#expandedIds.has(activeId) && currentNode.children.length) {
				this.#focusRow(currentNode.children[0].id);
				return true;
			}
			return false;
		}

		if (key === "ArrowLeft") {
			if (currentNode.hasChildren && this.#expandedIds.has(activeId)) {
				void this.#toggleNode(activeId, true);
				return true;
			}
			const parentId = this.#parentById.get(activeId);
			if (parentId) {
				this.#focusRow(parentId);
				return true;
			}
			return false;
		}

		if (key === "Enter" || key === " ") {
			if (!this.displayOnly) {
				if (!this.#isMultiSelectEnabled()) {
					this.#selectNode(activeId, { user: true, focus: true, mode: "exclusive" });
				} else if (this.#isCheckboxSelectionMode()) {
					this.#selectNode(activeId, { user: true, focus: true, mode: "toggle" });
				} else if (key === " " && (event.ctrlKey || event.metaKey)) {
					this.#selectNode(activeId, { user: true, focus: true, mode: "toggle" });
				} else {
					this.#selectNode(activeId, { user: true, focus: true, mode: "exclusive" });
				}
			} else if (currentNode.hasChildren) {
				void this.#toggleNode(activeId, true);
			}
			return true;
		}

		return false;
	}

	async #toggleNode(id, user) {
		const node = this.#nodeById.get(id);
		if (!node || !node.hasChildren) return;

		const nextExpanded = !this.#expandedIds.has(id);
		if (nextExpanded) {
			this.#expandedIds.add(id);
			this.#renderTree();
			this.#focusRow(id);
			await this.#ensureNodeChildrenLoaded(id, { user: Boolean(user) });
		} else {
			this.#expandedIds.delete(id);
		}
		this.#renderTree();
		this.#focusRow(id);

		this.dispatchEvent(
			new CustomEvent("node-toggle", {
				detail: { node, expanded: nextExpanded, user: Boolean(user) },
				bubbles: true,
				composed: true,
			}),
		);
	}

	async #ensureNodeChildrenLoaded(id, { user } = {}) {
		const node = this.#nodeById.get(id);
		if (!node || node.childrenLoaded || node.loadingChildren || !node.hasChildren) return;

		if (this.#childrenLoadPromises.has(id)) {
			await this.#childrenLoadPromises.get(id);
			return;
		}

		const task = (async () => {
			node.loadingChildren = true;
			this.#renderTree();
			this.#focusRow(id);

			try {
				const childSource = await this.#resolveNodeChildren(node);
				const childList = Array.isArray(childSource)
					? childSource
					: childSource
						? [childSource]
						: [];
				node.children = childList
					.map((child, childIndex) => this.#normalizeNode(child, [node.id], childIndex))
					.filter(Boolean);
				node.childrenLoaded = true;
				node.hasChildren = node.children.length > 0;
				this.#reindexNodes();

				this.dispatchEvent(
					new CustomEvent("node-load", {
						detail: { node, children: node.children, user: Boolean(user) },
						bubbles: true,
						composed: true,
					}),
				);
			} catch (error) {
				node.childrenLoaded = false;
				console.error("pds-treeview: failed to load child nodes", error);
				this.dispatchEvent(
					new CustomEvent("node-load-error", {
						detail: { node, error, user: Boolean(user) },
						bubbles: true,
						composed: true,
					}),
				);
			} finally {
				node.loadingChildren = false;
			}
		})();

		this.#childrenLoadPromises.set(id, task);
		try {
			await task;
		} finally {
			this.#childrenLoadPromises.delete(id);
		}
	}

	async #resolveNodeChildren(node) {
		const options = this.#settings || {};
		const getChildren = typeof options.getChildren === "function" ? options.getChildren : null;
		let source = null;

		if (getChildren) {
			source = await getChildren({
				host: this,
				node,
				nodeId: node.id,
				options,
				settings: options,
			});
		} else {
			const raw = node.data || {};
			source = raw.childrenSource ?? raw.childrenSrc ?? raw.childrenUrl ?? null;
		}

		source = await this.#resolveDynamicSource(
			source,
			{ host: this, node, nodeId: node.id, options, settings: options },
			options.fetch,
		);

		if (typeof options.transformChildren === "function") {
			source = await options.transformChildren(source, {
				host: this,
				node,
				nodeId: node.id,
				options,
				settings: options,
			});
		}

		return source;
	}

	#selectNode(id, { user, focus, mode = "exclusive" }) {
		const node = this.#nodeById.get(id);
		if (!node) return;

		if (!this.#isMultiSelectEnabled()) {
			this.#selectedId = id;
			this.#selectedIds = new Set([id]);
		} else if (mode === "toggle") {
			if (this.#selectedIds.has(id)) {
				this.#selectedIds.delete(id);
				if (this.#selectedId === id) {
					this.#selectedId = this.#selectedIds.values().next().value || null;
				}
			} else {
				this.#selectedIds.add(id);
				this.#selectedId = id;
			}
		} else {
			this.#selectedId = id;
			this.#selectedIds = new Set([id]);
		}

		this.#expandAncestors(id);
		this.#renderTree();
		if (focus) this.#focusRow(id);
		this.#syncValue();
		const selectedNodes = this.selectedNodes;
		const selectedValues = selectedNodes.map((selectedNode) => String(selectedNode.value));

		this.dispatchEvent(
			new CustomEvent("node-select", {
				detail: {
					node,
					value: node.value,
					values: selectedValues,
					selectedNodes,
					user: Boolean(user),
				},
				bubbles: true,
				composed: true,
			}),
		);
		this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
		this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));

		if (user && typeof this.#settings?.onSelect === "function") {
			this.#settings.onSelect(node, this);
		}
	}

	#restoreSelection() {
		const preferred = this.getAttribute("value") || this.#defaultValue || "";
		if (preferred) {
			if (!this.selectByValue(preferred)) {
				this.#selectedId = null;
				this.#selectedIds.clear();
			}
		} else if (this.#selectedId && this.#nodeById.has(this.#selectedId)) {
			if (!this.#selectedIds.size) this.#selectedIds.add(this.#selectedId);
			this.#expandAncestors(this.#selectedId);
			this.#renderTree();
		} else if (this.#selectedIds.size) {
			this.#selectedIds = new Set(Array.from(this.#selectedIds).filter((id) => this.#nodeById.has(id)));
			this.#selectedId = this.#selectedIds.values().next().value || null;
			this.#renderTree();
		} else {
			this.#selectedId = null;
			this.#selectedIds.clear();
			this.#syncValue();
		}
	}

	#expandAncestors(id) {
		let current = this.#parentById.get(id);
		while (current) {
			this.#expandedIds.add(current);
			current = this.#parentById.get(current);
		}
	}

	#syncValue() {
		if (this.displayOnly) {
			if (this.hasAttribute("value")) this.removeAttribute("value");
			this.#internals.setFormValue("");
			this.#syncValidity();
			return;
		}

		const selectedNodes = this.selectedNodes;
		const selectedValues = selectedNodes.map((node) => String(node.value));
		const nextValue = selectedValues[0] || "";

		if (nextValue) {
			if (this.getAttribute("value") !== nextValue) {
				this.setAttribute("value", nextValue);
			}
		} else {
			if (this.hasAttribute("value")) this.removeAttribute("value");
		}

		if (this.#isMultiSelectEnabled() && selectedValues.length > 0 && this.name) {
			const formValue = new FormData();
			for (const value of selectedValues) {
				formValue.append(this.name, value);
			}
			this.#internals.setFormValue(formValue);
		} else {
			this.#internals.setFormValue(nextValue || "");
		}

		this.#syncValidity();
	}

	#syncValidity() {
		if (this.required && !this.displayOnly && this.#selectedIds.size === 0) {
			const focusTarget =
				this.#root.querySelector('.tv-row[tabindex="0"]') ||
				this.#root.querySelector(".tv-row") ||
				this;
			this.#internals.setValidity(
				{ valueMissing: true },
				"Please select a node.",
				focusTarget,
			);
			return;
		}
		this.#internals.setValidity({});
	}

	#focusRow(id) {
		if (!id) return;
		this.#focusedId = id;
		this.#syncTabStops();
		const row = this.#root.querySelector(`.tv-row[data-node-id="${CSS.escape(id)}"]`);
		row?.focus();
	}

	#syncTabStops() {
		const rows = this.#root.querySelectorAll(".tv-row");
		if (!rows.length) return;

		const fallbackId = this.#selectedId || this.#selectedIds.values().next().value || this.#firstVisibleId();
		if (!this.#focusedId || !this.#root.querySelector(`.tv-row[data-node-id="${CSS.escape(this.#focusedId)}"]`)) {
			this.#focusedId = fallbackId || null;
		}

		for (const row of rows) {
			const id = row.getAttribute("data-node-id");
			row.setAttribute("tabindex", id === this.#focusedId ? "0" : "-1");
		}
	}

	#firstVisibleId() {
		const first = this.#root.querySelector(".tv-row");
		return first?.getAttribute("data-node-id") || null;
	}

	#getVisibleIds() {
		return Array.from(this.#root.querySelectorAll(".tv-row"))
			.map((row) => row.getAttribute("data-node-id"))
			.filter(Boolean);
	}

	#sanitizeLink(link) {
		if (!link) return null;
		const value = String(link).trim();
		if (!value) return null;
		if (/^javascript\s*:/i.test(value)) return null;
		return value;
	}

	#escapeHtml(value) {
		return String(value)
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#39;");
	}

	#escapeAttribute(value) {
		return this.#escapeHtml(value);
	}

	#normalizeMultiselect(value) {
		const normalized = String(value || "off").toLowerCase();
		if (normalized === "checkboxes" || normalized === "auto") return normalized;
		return "off";
	}

	#isMultiSelectEnabled() {
		return this.multiselect !== "off";
	}

	#isCheckboxSelectionMode() {
		if (this.multiselect === "checkboxes") return true;
		if (this.multiselect !== "auto") return false;
		return Boolean(this.#multiselectAutoQuery?.matches);
	}

	#syncAriaMultiselect() {
		const tree = this.#root.querySelector(ROOT_SELECTOR);
		if (!tree) return;
		tree.setAttribute("aria-multiselectable", this.#isMultiSelectEnabled() ? "true" : "false");
	}
}

if (!customElements.get("pds-treeview")) {
	customElements.define("pds-treeview", PdsTreeview);
}
