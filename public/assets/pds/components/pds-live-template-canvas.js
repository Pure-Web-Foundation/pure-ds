const COMPONENT_TAG = "pds-live-template-canvas";
const PDS = globalThis.PDS;

let managerPromise = null;

async function getManagerModule() {
  if (managerPromise) return managerPromise;
  managerPromise = (async () => {
    const candidates = [
      PDS?.currentConfig?.managerURL,
      "../core/pds-manager.js",
      "/assets/pds/core/pds-manager.js",
    ].filter(Boolean);

    const attempted = new Set();
    for (const candidate of candidates) {
      try {
        const resolved = new URL(candidate, import.meta.url).href;
        if (attempted.has(resolved)) continue;
        attempted.add(resolved);
        const mod = await import(resolved);
        if (mod && typeof mod === "object") return mod;
      } catch (e) {}
    }

    return null;
  })();

  return managerPromise;
}

class PdsLiveTemplateCanvas extends HTMLElement {
  constructor() {
    super();
    this._templates = [];
    this._selectedTemplateId = "";
  }

  connectedCallback() {
    this._renderShell();
    this._loadTemplates();
  }

  _renderShell() {
    this.className = "stack-sm";
    this.innerHTML = `
      <label class="stack-xs">
        <span>Template</span>
        <div class="pds-live-template-omnibox"></div>
      </label>
      <p class="text-muted pds-live-template-description"></p>
    `;

  }

  async _loadTemplates() {
    const manager = await getManagerModule();
    if (typeof manager?.listLiveTemplates !== "function") return;

    this._templates = (await manager.listLiveTemplates()) || [];
    this._selectedTemplateId = "";

    const host = this.querySelector(".pds-live-template-omnibox");
    if (!host) return;

    host.replaceChildren();
    try {
      const omnibox = document.createElement("pds-omnibox");
      omnibox.setAttribute("item-grid", "45px 1fr 0");
      omnibox.setAttribute("placeholder", "Search canvas templates...");
      omnibox.value = "";

      const templates = this._templates;
      omnibox.settings = {
        hideCategory: true,
        itemGrid: "45px 1fr 0",
        categories: {
          Templates: {
            trigger: () => true,
            getItems: (context = {}) => {
              const query = String(context?.search || "").toLowerCase().trim();
              return templates
                .filter((item) => {
                  if (!query) return true;
                  const haystack = [item.name, item.description, ...(item.tags || [])]
                    .join(" ")
                    .toLowerCase();
                  return haystack.includes(query);
                })
                .map((item) => ({
                  id: item.id,
                  text: item.name,
                  description: item.description,
                  icon: item.icon || "grid-four",
                }));
            },
            action: (selection) => {
              this._selectedTemplateId = selection?.id || "";
              this._updateDescription();
              this._applyTemplate();
              return selection?.id || "";
            },
          },
        },
      };

      omnibox.addEventListener("result-selected", (event) => {
        const selectedId =
          event?.detail?.id ||
          this._templates.find((item) => item.name === event?.detail?.text)?.id ||
          this._selectedTemplateId;
        if (selectedId) {
          this._selectedTemplateId = selectedId;
        }
        const selected = this._templates.find((item) => item.id === this._selectedTemplateId);
        if (selected?.name) {
          omnibox.value = selected.name;
        }
        this._updateDescription();
      });

      host.appendChild(omnibox);
    } catch (error) {
      const fallback = document.createElement("select");
      fallback.className = "pds-live-template-select";
      this._templates.forEach((template) => {
        const option = document.createElement("option");
        option.value = template.id;
        option.textContent = template.name;
        fallback.appendChild(option);
      });
      fallback.addEventListener("change", () => {
        this._selectedTemplateId = fallback.value;
        this._updateDescription();
        this._applyTemplate();
      });
      host.appendChild(fallback);
    }

    this._updateDescription();
  }

  _updateDescription() {
    const description = this.querySelector(".pds-live-template-description");
    if (!description) return;
    const selected = this._templates.find((item) => item.id === this._selectedTemplateId);
    description.textContent = selected?.description || "";
  }

  async _applyTemplate() {
    if (!this._selectedTemplateId) return;

    const manager = await getManagerModule();
    if (typeof manager?.runLiveImport !== "function") return;

    const result = await manager.runLiveImport({
      sourceType: "template",
      templateId: this._selectedTemplateId,
    });

    this.dispatchEvent(
      new CustomEvent("pds:live-template:inject", {
        bubbles: true,
        composed: true,
        detail: { result, templateId: this._selectedTemplateId },
      })
    );
  }
}

customElements.define(COMPONENT_TAG, PdsLiveTemplateCanvas);
