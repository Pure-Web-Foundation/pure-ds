import {
	enQueue,
	escapeForRegExp,
	humanizeIdentifier,
	isUrl,
	openCenteredWindow,
	parseHTML,
	throttle,
	withTimeout,
} from "./common/common.js";

const cssClasses = {
	result: "ac-suggestion",
	item: "ac-itm",
};

class AutoComplete extends EventTarget {
	constructor(parent, textInput, settings = {}) {
		super();

		this.settings = {
			emptyResultsText: "",
			progressive: true,
			maxConcurrentCategories: 3,
			categoryTimeoutMs: 0,
			...settings,
		};

		this.container = parent;
		this.input = textInput;
		this.input.setAttribute("autocomplete", "off");
		this.categories = settings.categories || {};
		this.caches = new Map();
		this.rowIndex = -1;
		this.results = [];
		this.requestToken = 0;

		enQueue(this.attach.bind(this));
	}

	static connect(event, options) {
		const input = event.target;
		if (!input._autoComplete) {
			if (!options?.categories) throw Error("Missing autocomplete settings");
			input._autoComplete = new AutoComplete(input.parentNode, input, options);
			if (event.type === "focus") {
				setTimeout(() => {
					input._autoComplete.focusHandler(event);
				}, 100);
			}
		}
		return input._autoComplete;
	}

	on(a, b) {
		this.input.addEventListener(a, b);
		return this;
	}

	attach() {
		this.resultsDiv = document.createElement("div");
		this.resultsDiv.title = "";
		this.resultsDiv.classList.add(cssClasses.result);
		if (this.container.offsetWidth > 100) {
			this.resultsDiv.style.width = `${this.container.offsetWidth}px`;
		}
		this.resultsDiv.addEventListener("mousedown", this.resultClick.bind(this));
		this.container.classList.add("ac-container");
		this.input.classList.add("ac-input");

		const inputStyle = getComputedStyle(this.input);
		this.container.style.setProperty("--ac-bg-default", inputStyle.backgroundColor);
		this.container.style.setProperty("--ac-color-default", inputStyle.color);
		const accentColor = inputStyle.accentColor;
		if (accentColor !== "auto") {
			this.container.style.setProperty("--ac-accent-color", accentColor);
		}

		(this.container?.shadowRoot ?? this.container).appendChild(this.resultsDiv);
		this.controller().clear("attach");

		this.on(
			"input",
			throttle(this.inputHandler.bind(this), this.settings.throttleInputMs ?? 300),
		)
			.on("focus", this.focusHandler.bind(this))
			.on("mousedown", this.mouseDownHandler.bind(this))
			.on("focusout", this.blurHandler.bind(this))
			.on("keyup", this.keyUpHandler.bind(this))
			.on("keydown", this.keyDownHandler.bind(this));
	}

	controller() {
		let controller = this.internalController();
		if (typeof this.settings.controller === "function") {
			controller = this.settings.controller(this) ?? controller;
		}
		return controller;
	}

	internalController() {
		return {
			show: this.show.bind(this),
			hide: this.hide.bind(this),
			clear: this.clear.bind(this),
			empty: () => {},
		};
	}

	moveResult(add) {
		this.controller().show();
		const length = this.acItems?.length ?? 0;
		if (!length) return;

		this.rowIndex = this.rowIndex + add;
		if (this.rowIndex <= 0) {
			this.rowIndex = 0;
		} else if (this.rowIndex > length - 1) {
			this.rowIndex = 0;
		}

		for (const resultItem of this.acItems) {
			resultItem.classList.remove("selected");
		}

		const selected = this.getSelectedDiv();
		if (selected) {
			selected.classList.add("selected");
			selected.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		} else {
			this.focusHandler({ target: this.input });
		}
	}

	getSelectedDiv() {
		return this.resultsDiv?.querySelector(`div:nth-child(${this.rowIndex + 1})`);
	}

	selectResult(div) {
		const selectedItem = div || this.getSelectedDiv();
		if (!selectedItem) return;

		const index = Number.parseInt(selectedItem.getAttribute("data-index"), 10);
		this.resultClicked = true;
		const result = Number.isInteger(index) ? this.results[index] : null;
		if (!result) return;

		const handlingCategory = this.categories[result.category] ?? {};
		const categoryAction =
			typeof handlingCategory.action === "function"
				? handlingCategory.action
				: this.setText.bind(this);

		if (handlingCategory.newTab) {
			this.tabWindow = openCenteredWindow("about:blank", 960, 700);
		}

		const options = {
			...result,
			search: this.input.value,
			selectedItem,
		};

		selectedItem.classList.add("ac-active");
		setTimeout(() => {
			this.controller().hide("result-selected");

			if (typeof options.action === "function") {
				options.action(options);
			} else {
				categoryAction(options);
				if (handlingCategory.newTab && this.tabWindow) {
					if (options.url) {
						this.tabWindow.location.href = options.url;
					} else {
						this.tabWindow.close();
					}
				}
			}

			this.input.dispatchEvent(new Event("change", { bubbles: true }));
			this.controller().clear("result-selected");

			// Preserve legacy payload semantics (Event + ad-hoc detail assignment).
			const event = new Event("result-selected");
			event.detail = options;
			this.input.dispatchEvent(event);
		}, 0);
	}

	setText(options) {
		let didSet = false;
		if (this.input) {
			this.input.value = options.text;
			didSet = true;
		} else if (this.container?.autoCompleteInput) {
			this.container.autoCompleteInput.value = options.text;
			didSet = true;
		} else if ("value" in this.container) {
			this.container.value = options.text;
			didSet = true;
		}

		if (didSet && this.input) {
			this.input.dispatchEvent(new Event("input", { bubbles: true }));
		}
		this.controller().hide("settext");
	}

	resultClick(event) {
		this.selectResult(event.target.closest(`.${cssClasses.item}`));
	}

	blurHandler() {
		setTimeout(() => {
			if (!this.resultClicked) this.controller().clear("blurred");
			this.resultClicked = false;
		}, 100);
	}

	clear(_reason, options = {}) {
		if (this.settings.debug) return;
		if (!this.resultsDiv) return;

		this.resultsDiv.innerHTML = "";
		if (!options.preserveOpen) {
			this.controller().hide("clear");
		}

		if (this.cacheTmr) clearTimeout(this.cacheTmr);
		this.cacheTmr = setTimeout(() => {
			this.caches.clear();
		}, 5 * 60 * 1000);
	}

	dismissSuggestions(reason = "dismiss") {
		if (this.aborter) {
			this.aborter.abort();
		}

		// Invalidate any in-flight result handlers so stale async responses cannot reopen suggestions.
		this.requestToken += 1;
		this.container.classList.remove("search-running");
		this.results = [];
		this.rowIndex = -1;
		this.acItems = [];
		this.controller().clear(reason);
	}

	isSuggestionsOpen() {
		return this.resultsDiv?.classList?.contains("ac-active") === true;
	}

	retriggerSuggestions(event) {
		if (this.isSuggestionsOpen()) return;
		if (this.container.classList.contains("search-running")) return;

		const hasFocus =
			document.activeElement === this.input || this.input?.matches?.(":focus") === true;
		if (!hasFocus) return;

		this.suggest(this.input.value, event);
	}

	mouseDownHandler(event) {
		if (this.isSuggestionsOpen()) return;

		const hasFocus =
			document.activeElement === this.input || this.input?.matches?.(":focus") === true;
		if (hasFocus) {
			this.retriggerSuggestions(event);
			return;
		}

		setTimeout(() => {
			this.retriggerSuggestions({ target: this.input, type: "mousedown" });
		}, 0);
	}

	show() {
		if (!this.resultsDiv.classList.contains("ac-active")) {
			const viewBounds = this.getViewBounds();
			this.resultsDiv.style.position = "absolute";
			if (viewBounds.rect.width > 100) {
				this.resultsDiv.style.width = `${viewBounds.rect.width}px`;
			}

			this.settings.direction = this.settings.direction ?? viewBounds.suggestedDirection;
			this.resultsDiv.setAttribute("data-direction", this.settings.direction);
			if (this.settings.direction === "up") {
				this.resultsDiv.style.top = "unset";
				this.resultsDiv.style.bottom = `${viewBounds.rect.height + 20}px`;
				this.rowIndex = this.acItems.length;
			} else {
				this.resultsDiv.style.bottom = "unset";
				this.resultsDiv.style.top = `${viewBounds.rect.height}px`;
				this.rowIndex = -1;
			}

			this.resultsDiv.style.maxWidth = "unset";
			this.resultsDiv.classList.toggle("ac-active", true);
		}
	}

	getViewBounds() {
		const rect = this.input.getBoundingClientRect();
		return {
			rect,
			suggestedDirection:
				rect.top + rect.height + 500 > window.innerHeight ? "up" : "down",
		};
	}

	hide() {
		this.resultsDiv.classList.toggle("ac-active", false);
	}

	empty() {
		this.resultsDiv.innerHTML = `<div class="ac-empty">${this.settings.emptyResultsText}</div>`;
		this.controller().show();
	}

	async inputHandler(event) {
		if (this.cacheTmr) clearTimeout(this.cacheTmr);

		const currentSearch = String(this.input?.value ?? event?.target?.value ?? "");
		const options = {
			search: currentSearch,
			categories: this.categories,
		};

		const token = this.requestToken + 1;
		const progressive = this.settings.progressive === true;
		let lastPartialSignature = "";
		let hadPartial = false;

		this.container.classList.add("search-running");

		const onProgress = (partialResults, metadata = {}) => {
			if (!progressive || metadata.token !== this.requestToken) return;

			hadPartial = true;
			lastPartialSignature = this.resultsSignature(partialResults);

			this.resultsHandler(partialResults, options);

			this.input.dispatchEvent(
				new CustomEvent("results:partial", {
					detail: {
						results: partialResults,
						token: metadata.token,
						pending: metadata.pending ?? 0,
						completed: metadata.completed ?? 0,
						settled: metadata.settled ?? false,
					},
				}),
			);
		};

		const results = await this.getItems(options, event, {
			onProgress,
			forceToken: token,
		}).catch(() => []);

		if (token !== this.requestToken) {
			this.container.classList.remove("search-running");
			return;
		}

		const finalSignature = this.resultsSignature(results);
		if (!hadPartial || finalSignature !== lastPartialSignature) {
			this.resultsHandler(results, options);
		}

		this.input.dispatchEvent(
			new CustomEvent("results:complete", {
				detail: {
					results,
					token,
					pending: 0,
					completed: Object.keys(this.categories || {}).length,
					settled: true,
				},
			}),
		);

		this.container.classList.remove("search-running");
	}

	keyDownHandler(event) {
		switch (event.key) {
			case "Enter":
				event.stopPropagation();
				event.preventDefault();
				break;
			case "Escape":
				event.stopPropagation();
				event.preventDefault();
				this.dismissSuggestions("escape");
				break;
			case "ArrowDown":
				if (!this.isSuggestionsOpen()) {
					event.stopPropagation();
					event.preventDefault();
					this.retriggerSuggestions(event);
					break;
				}
				enQueue(() => this.moveResult(1));
				break;
			case "ArrowUp":
				enQueue(() => this.moveResult(-1));
				break;
			default:
				break;
		}
	}

	keyUpHandler(event) {
		switch (event.key) {
			case "Escape":
				this.dismissSuggestions("escape");
				break;
			case "Enter":
				if (this.getSelectedDiv()) {
					this.container.preventEnter = true;
					event.stopPropagation();
					event.preventDefault();
					this.selectResult();
					setTimeout(() => {
						this.container.preventEnter = false;
					}, 10);
				}
				break;
			default:
				break;
		}
	}

	focusHandler(event) {
		this.controller().clear("focus");
		this.suggest(event.target.value, event);
	}

	suggest(value, event) {
		this.input.focus();
		const options = {
			suggest: true,
			search: value || "",
			categories: this.categories,
		};

		this.getItems(options, event).then((results) => {
			this.input.dispatchEvent(
				new CustomEvent("show-results", {
					detail: { results },
				}),
			);
			this.resultsHandler(results, options);
		});
	}

	sort(results, options) {
		return results.sort((a, b) => {
			const aCat = options.categories[a.category];
			const bCat = options.categories[b.category];
			const aIndex =
				typeof aCat.sortIndex === "function"
					? aCat.sortIndex(options)
					: (aCat.sortIndex ?? 0);
			const bIndex =
				typeof bCat.sortIndex === "function"
					? bCat.sortIndex(options)
					: (bCat.sortIndex ?? 0);
			return bIndex > aIndex ? 1 : -1;
		});
	}

	resultsHandler(results, options) {
		this.results = results;
		this.rowIndex = -1;
		this.resultsDiv.innerHTML = "";

		let index = 0;
		const singleItemTemplate = (catHandler, item) => {
			const categoryLabel = this.formatCategoryLabel(item.category);
			return `
			<div title="${item.tooltip || ""}" data-index="${index}" class="${`${cssClasses.item} cat-${item.category} ${item.class ?? ""}`.trim()}"${item.style ? ` style="${item.style}"` : ""}>
				${this.handleImageOrIcon(item)}
				<span class="text">${this.formatResultItem(item, options, catHandler)}</span>
				${!this.settings.hideCategory ? `<span class="category">${categoryLabel}</span>` : ""}
			</div>`;
		};

		results.forEach((item) => {
			const categoryHandler = options.categories[item.category] || {};
			if (item.element) {
				this.resultsDiv.appendChild(item.element);
			} else {
				const normalized = typeof item === "string" ? { text: item } : item;
				const parsedNodes = parseHTML(singleItemTemplate(categoryHandler, normalized));
				const resultElement = Array.from(parsedNodes).find(
					(node) => node && node.nodeType === Node.ELEMENT_NODE,
				);
				if (resultElement) {
					this.resultsDiv.appendChild(resultElement);
				}
			}
			index += 1;
		});

		if (results.length) {
			this.acItems = this.resultsDiv.querySelectorAll(".ac-itm");
			this.controller().show();
		} else if (options.search.length) {
			this.controller().empty();
		}
	}

	handleImageOrIcon(item) {
		if (item.image) {
			return `<img src="${item.image}"/>`;
		}
		if (typeof this.settings.iconHandler === "function") {
			return this.settings.iconHandler(item);
		}
		return `<svg-icon icon="${item.icon}"></svg-icon>`;
	}

	formatResultItem(item, options, catHandler) {
		const normalized = typeof item === "string" ? { text: item } : item;
		let result = normalized.text;
		if (options.search) {
			result = result.replace("%search%", options.search);
			normalized.description = normalized.description?.replace("%search%", options.search);
		}
		result = this.highlight(result, options.search);
		if (normalized.description) {
			result = `<div>${result}</div><small>${normalized.description}</small>`;
		}
		if (catHandler.format) {
			result = catHandler.format({
				item: normalized,
				result,
				options,
			});
		}
		return result;
	}

	formatCategoryLabel(category) {
		if (this.settings.humanizeCategoryLabels === false) {
			return category || "";
		}
		return humanizeIdentifier(category || "");
	}

	highlight(str, find) {
		if (!find) return str;
		try {
			const reg = new RegExp(`(${escapeForRegExp(find)})`, "gi");
			return str.replace(reg, '<span class="txt-hl">$1</span>');
		} catch {
			return str;
		}
	}

	resultsSignature(list) {
		if (!Array.isArray(list) || list.length === 0) return "";
		return list
			.map((item) => {
				if (!item || typeof item !== "object") return String(item);
				return `${item.category ?? ""}|${item.id ?? ""}|${item.value ?? ""}|${item.text ?? ""}`;
			})
			.join("||");
	}

	getCacheKey(options) {
		const locale =
			this.settings.locale ||
			document?.documentElement?.lang ||
			navigator?.language ||
			"";
		const query = String(options?.search ?? "").trim().toLowerCase();
		const categories = Object.keys(options?.categories || {}).join(",");
		return `${locale}::${query}::${categories}`;
	}

	async getItems(options, event, hooks = {}) {
		if (this.aborter) {
			this.aborter.abort();
		}

		const token = hooks.forceToken || this.requestToken + 1;
		this.requestToken = token;

		const cacheKey = this.getCacheKey(options);
		if (this.settings.cache !== false && this.caches.has(cacheKey)) {
			const cached = this.caches.get(cacheKey);
			if (typeof hooks.onProgress === "function") {
				hooks.onProgress(cached, {
					token,
					pending: 0,
					completed: Object.keys(options.categories || {}).length,
					settled: true,
				});
			}
			return cached;
		}

		this.aborter = new AbortController();
		this.aborterSignal = this.aborter.signal;

		const source = this.items;
		const prop = this.settings.map;

		const normalizeItem = (item) => {
			if (typeof item === "string") return { text: item };
			return item;
		};

		const map = (list) => {
			if (!prop) {
				return list.map((item) => normalizeItem(item));
			}
			return list.map((item) => ({ text: item[prop] }));
		};

		const max = (list) => {
			if (this.settings.max && this.settings.max > 0) {
				list.length = this.settings.max;
			}
			return list;
		};

		const settle = (data) => {
			const sorted = this.sort(data, options);
			if (this.settings.cache !== false) {
				this.caches.set(cacheKey, sorted);
			}
			return sorted;
		};

		if (isUrl(source)) {
			if (this.settings.minlength > 0) {
				if (!options.search || options.search.length < this.settings.minlength) {
					return settle([]);
				}
			}

			const url = this.formatSearch(source, options);
			const response = await fetch(url, { signal: this.aborterSignal });
			if (response.status !== 200) {
				throw Error(`HTTP error ${response.status} - ${url}`);
			}

			const items = map(await response.json());
			const filtered = items.filter((item) => this.isMatch(options, item));
			return settle(max(filtered));
		}

		if (Array.isArray(source)) {
			let simple = true;
			this.items = source.map((item) => {
				if (typeof item === "string") return { text: item };
				simple = false;
				return item;
			});
			if (simple) {
				this.container.classList.add("simple");
			}
			return settle(max(map(this.items)));
		}

		if (typeof source === "function") {
			options.control = this.container;

			const progressive = this.settings.progressive === true;
			const items = await this.items(options, event, {
				progressive,
				token,
				onProgress: hooks.onProgress,
			});
			return settle(map(items));
		}

		return Promise.resolve(source.apply(this, options)).then((resolved) =>
			settle(resolved),
		);
	}

	async runCategorySearch(options, categoryName, categoryHandler) {
		const timeoutMs = Number(this.settings.categoryTimeoutMs || 0);
		const callOptions = {
			...options,
			signal: this.aborterSignal,
		};

		try {
			const result = await withTimeout(
				Promise.resolve(categoryHandler.getItems(callOptions)),
				timeoutMs,
				`Category "${categoryName}"`,
			);

			const list = Array.isArray(result) ? result : [];
			return list.map((item) => {
				const normalized = typeof item === "string" ? { text: item } : item;
				normalized.category = categoryName;
				return normalized;
			});
		} catch (error) {
			console.warn(`Error loading items for omniBox category '${categoryName}'.`, error);
			return [];
		}
	}

	async runCategoriesSequentially(options, entries, hooks = {}) {
		let allResults = [];
		let completed = 0;

		for (const [categoryName, originalHandler] of entries) {
			const categoryHandler = originalHandler || {};
			categoryHandler.trigger = categoryHandler.trigger ?? (() => true);
			categoryHandler.getItems = categoryHandler.getItems ?? (() => []);

			options.results = allResults;
			if (!categoryHandler.trigger(options)) {
				completed += 1;
				continue;
			}

			const categoryResults = await this.runCategorySearch(
				options,
				categoryName,
				categoryHandler,
			);

			if (this.aborterSignal?.aborted) {
				return allResults;
			}

			allResults = allResults.concat(categoryResults);
			completed += 1;

			if (typeof hooks.onProgress === "function" && this.requestToken === hooks.token) {
				const partial = this.sort([...allResults], options);
				hooks.onProgress(partial, {
					token: hooks.token,
					pending: Math.max(0, entries.length - completed),
					completed,
					settled: completed === entries.length,
				});
			}
		}

		return allResults;
	}

	async runCategoriesProgressive(options, entries, hooks = {}) {
		const maxConcurrency = Math.max(1, Number(this.settings.maxConcurrentCategories || 3));
		const enabledEntries = [];

		for (const [categoryName, originalHandler] of entries) {
			const categoryHandler = originalHandler || {};
			categoryHandler.trigger = categoryHandler.trigger ?? (() => true);
			categoryHandler.getItems = categoryHandler.getItems ?? (() => []);
			options.results = [];
			if (categoryHandler.trigger(options)) {
				enabledEntries.push([categoryName, categoryHandler]);
			}
		}

		if (!enabledEntries.length) {
			return [];
		}

		let index = 0;
		let completed = 0;
		const allResults = [];

		const worker = async () => {
			while (index < enabledEntries.length) {
				const currentIndex = index;
				index += 1;
				const [categoryName, categoryHandler] = enabledEntries[currentIndex];

				const categoryResults = await this.runCategorySearch(
					options,
					categoryName,
					categoryHandler,
				);

				if (this.aborterSignal?.aborted) return;

				allResults.push(...categoryResults);
				completed += 1;

				if (typeof hooks.onProgress === "function" && this.requestToken === hooks.token) {
					const partial = this.sort([...allResults], options);
					hooks.onProgress(partial, {
						token: hooks.token,
						pending: Math.max(0, enabledEntries.length - completed),
						completed,
						settled: completed === enabledEntries.length,
					});
				}
			}
		};

		const workers = [];
		const workerCount = Math.min(maxConcurrency, enabledEntries.length);
		for (let i = 0; i < workerCount; i += 1) {
			workers.push(worker());
		}
		await Promise.all(workers);

		return allResults;
	}

	async items(options, _event, hooks = {}) {
		options.results = [];
		options.signal = this.aborterSignal;

		const entries = Object.entries(options.categories || {});
		if (!entries.length) return [];

		if (!hooks.progressive) {
			return this.runCategoriesSequentially(options, entries, hooks);
		}

		return this.runCategoriesProgressive(options, entries, hooks);
	}

	formatSearch(url, options) {
		if (url.indexOf("%search%")) {
			return url.replace("%search%", options.search || "");
		}
		return `${url}?${this.createQueryParam(options)}`;
	}

	createQueryParam(options) {
		const suggest = options.suggest ? "&suggest=true" : "";
		return `q=${options.text}${suggest}`;
	}

	isMatch(options, item) {
		if (item.text?.indexOf("%search%") >= 0) return true;
		return options.search
			? item.text?.toLowerCase().indexOf(options.search.toLowerCase()) >= 0
			: options.suggest;
	}

	static textFilter(options, propertyName) {
		return function textFilterPredicate(item) {
			if (!options.search) return true;
			if (item.hidden) return false;

			const prop = propertyName ? item[propertyName] : item;
			const isMatch = prop.match(new RegExp(options.search, "gi"));
			if (isMatch) return isMatch;

			if (item.config?.tags) {
				return item.config.tags.some((tag) => tag.match(new RegExp(options.search, "gi")));
			}
			return false;
		};
	}
}

export { AutoComplete };
