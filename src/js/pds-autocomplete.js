import { AutoComplete } from "pure-web/ac";

const originalSelectResult = AutoComplete?.prototype?.selectResult;

if (
	typeof originalSelectResult === "function" &&
	AutoComplete?.prototype?.__pdsSelectedItemPatched !== true
) {
	AutoComplete.prototype.selectResult = function patchedSelectResult(div) {
    const selectedItem = div || this.getSelectedDiv?.();
		if (!selectedItem) {
			return originalSelectResult.call(this, div);
		}

		const indexRaw = selectedItem.getAttribute?.("data-index") ?? "";
		const index = Number.parseInt(indexRaw, 10);
		const result = Number.isInteger(index) ? this.results?.[index] : null;
		const categoryConfig =
			result && this.categories ? this.categories[result.category] : null;
		const restores = [];

		const wrapAction = (target, key) => {
			if (!target || typeof target[key] !== "function") return;
			const originalAction = target[key];
			let restored = false;

			const restore = () => {
				if (restored) return;
				target[key] = originalAction;
				restored = true;
			};

			target[key] = function wrappedAction(options = {}, ...rest) {
				try {
					if (
						options &&
						typeof options === "object" &&
						!("selectedItem" in options)
					) {
						options.selectedItem = selectedItem;
					}
					return originalAction.call(this, options, ...rest);
				} finally {
					restore();
				}
			};

			restores.push(restore);
		};

		wrapAction(result, "action");
		wrapAction(categoryConfig, "action");

		const output = originalSelectResult.call(this, selectedItem);

		// Fallback cleanup for unexpected flows where upstream action does not run.
		setTimeout(() => {
			for (const restore of restores) {
				restore();
			}
		}, 1000);

		return output;
	};

	AutoComplete.prototype.__pdsSelectedItemPatched = true;
}

export { AutoComplete };
