const COMPONENT_TAG = "pds-live-converter";

class PdsLiveConverter extends HTMLElement {
  constructor() {
    super();
    this.result = null;
  }

  connectedCallback() {
    this._render();
  }

  setResult(result) {
    this.result = result || null;
    this._render();
  }

  _render() {
    const confidence = this.result?.confidence;
    const issues = Array.isArray(this.result?.issues) ? this.result.issues : [];
    const confidenceLabel = typeof confidence === "number" ? `${Math.round(confidence * 100)}%` : "-";
    const issueLabel = issues.length ? `${issues.length}` : "0";

    this.className = "card surface-base stack-sm";
    this.innerHTML = `
      <div class="flex items-center justify-between">
        <strong>Conversion Report</strong>
        <span class="badge ${issues.length ? "badge-warning" : "badge-success"}">${issues.length ? "Needs review" : "Ready"}</span>
      </div>
      <div class="grid grid-cols-2 gap-sm">
        <div class="card surface-subtle stack-xs">
          <small class="text-muted">Confidence</small>
          <strong>${confidenceLabel}</strong>
        </div>
        <div class="card surface-subtle stack-xs">
          <small class="text-muted">Issues</small>
          <strong>${issueLabel}</strong>
        </div>
      </div>
      <div class="stack-xs">
        ${issues.length ? `<p class="text-muted">${issues[0]?.message || ""}</p>` : "<p class=\"text-muted\">No issues reported.</p>"}
      </div>
    `;
  }
}

customElements.define(COMPONENT_TAG, PdsLiveConverter);
