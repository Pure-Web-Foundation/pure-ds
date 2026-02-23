const COMPONENT_TAG = "pds-live-importer";
const PDS = globalThis.PDS;

const IMPORT_MODES = [
  { id: "convert-only", label: "Convert to PDS HTML only" },
  { id: "adopt-design-and-convert", label: "Adopt design language + convert" },
];

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

function formatBytes(size) {
  const value = Number(size);
  if (!Number.isFinite(value) || value <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const scaled = value / 1024 ** index;
  const precision = scaled >= 10 || index === 0 ? 0 : 1;
  return `${scaled.toFixed(precision)} ${units[index]}`;
}

function formatDateTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inferSourceType(file, sources = []) {
  const availableIds = new Set((sources || []).map((source) => source?.id).filter(Boolean));
  const fallback =
    (availableIds.has("brand-guidelines") && "brand-guidelines") ||
    (availableIds.has("tailwind-html") && "tailwind-html") ||
    (sources?.[0]?.id || "brand-guidelines");

  if (!file) return fallback;

  const name = String(file.name || "").toLowerCase();
  const ext = name.includes(".") ? name.split(".").pop() : "";
  const mime = String(file.type || "").toLowerCase();

  const isHtml = ext === "html" || ext === "htm" || mime.includes("html");
  if (isHtml && availableIds.has("tailwind-html")) return "tailwind-html";

  if (availableIds.has("brand-guidelines")) return "brand-guidelines";
  if (availableIds.has("tailwind-html")) return "tailwind-html";

  return fallback;
}

function normalizeImportMode(value) {
  const next = String(value || "").trim().toLowerCase();
  return IMPORT_MODES.some((mode) => mode.id === next) ? next : "convert-only";
}

function getImportModeLabel(value) {
  const mode = IMPORT_MODES.find((item) => item.id === normalizeImportMode(value));
  return mode?.label || IMPORT_MODES[0].label;
}

class PdsLiveImporter extends HTMLElement {
  constructor() {
    super();
    this._sources = [];
    this._selectedFile = null;
    this._selectedText = "";
    this._selectedSourceType = "";
    this._selectedImportMode = "convert-only";
    this._isImporting = false;
    this._history = [];
    this._isHistoryLoading = false;
    this._historyDialog = null;
    this._activeHistoryDialogEntry = null;
  }

  connectedCallback() {
    this._render();
    this._loadSources();
    this._loadHistory();
  }

  _render() {
    this.className = "card surface-subtle stack-sm";
    this.innerHTML = `
      <label class="stack-xs">
        <span>File</span>
        <pds-upload class="pds-live-import-upload" accept=".html,.htm,.txt,.md,.json,.css,.js,.ts,.tsx,.jsx" max-files="1"></pds-upload>
      </label>
      <label class="stack-xs">
        <span>Import mode</span>
        <select class="pds-live-import-mode">
          ${IMPORT_MODES.map((mode) => `<option value="${mode.id}">${escapeHtml(mode.label)}</option>`).join("")}
        </select>
      </label>
      <div class="flex gap-sm justify-end">
        <button type="button" class="btn-secondary btn-sm pds-live-import-run" disabled>Re-import</button>
      </div>
      <section class="card surface-base stack-xs pds-live-import-history">
        <div class="flex items-center justify-between gap-sm">
          <strong>Import History</strong>
          <div class="flex gap-xs">
            <button type="button" class="btn-outline btn-sm pds-live-history-refresh">Refresh</button>
            <button type="button" class="btn-outline btn-sm pds-live-history-clear">Clear</button>
          </div>
        </div>
        <div class="stack-xs pds-live-history-list"></div>
      </section>
    `;

    this.querySelector(".pds-live-import-upload")?.addEventListener("files-changed", async (event) => {
      const file = event?.detail?.files?.[0] || null;
      await this._setSelectedFile(file);
    });

    this.querySelector(".pds-live-import-run")?.addEventListener("click", () => {
      this._runImport();
    });

    this.querySelector(".pds-live-import-mode")?.addEventListener("change", (event) => {
      this._selectedImportMode = normalizeImportMode(event?.currentTarget?.value);
      this._updateSelectionUI();
    });

    this.querySelector(".pds-live-history-refresh")?.addEventListener("click", () => {
      this._loadHistory();
    });

    this.querySelector(".pds-live-history-clear")?.addEventListener("click", async () => {
      await this._clearHistory();
    });

    this._updateSelectionUI();
    this._renderHistory();
  }

  async _toast(message, type = "information", options = {}) {
    if (!message) return;
    if (typeof PDS?.toast === "function") {
      await PDS.toast(String(message), { type, persistent: true, ...(options || {}) });
      return;
    }
    console.info(message);
  }

  _openLatestHistoryMetadata(options = {}) {
    const requestedFileName = String(options?.fileName || "");
    const requestedSourceType = String(options?.sourceType || "");
    const requestedImportMode = normalizeImportMode(options?.importMode);

    document.dispatchEvent(
      new CustomEvent("pds:live-edit:enable", {
        bubbles: true,
        composed: true,
      })
    );

    let attempts = 0;
    const maxAttempts = 12;
    const tryOpen = () => {
      attempts += 1;
      const liveEditHost = document.querySelector("pds-live-edit");
      if (liveEditHost && typeof liveEditHost.openImportDetailsFromToast === "function") {
        liveEditHost.openImportDetailsFromToast({
          fileName: requestedFileName,
          sourceType: requestedSourceType,
          importMode: requestedImportMode,
        });
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryOpen, 100);
      }
    };

    setTimeout(tryOpen, 0);
  }

  _ensureHistoryDialog() {
    if (this._historyDialog?.isConnected) return this._historyDialog;

    const dialog = document.createElement("dialog");
    dialog.className = "card surface-elevated stack-sm";
    dialog.setAttribute("aria-label", "Import details");

    const title = document.createElement("h4");
    title.textContent = "Import Details";

    const content = document.createElement("div");
    content.className = "stack-sm";
    content.dataset.role = "history-details-content";

    const footer = document.createElement("div");
    footer.className = "flex gap-sm justify-end";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn-outline btn-sm icon-only";
    copyBtn.setAttribute("aria-label", "Copy to clipboard");
    const copyIcon = document.createElement("pds-icon");
    copyIcon.setAttribute("icon", "copy");
    copyIcon.setAttribute("size", "sm");
    copyBtn.appendChild(copyIcon);
    copyBtn.addEventListener("click", async () => {
      await this._copyActiveHistoryToClipboard();
    });

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-outline btn-sm";
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => dialog.close());

    footer.appendChild(copyBtn);
    footer.appendChild(closeBtn);
    dialog.append(title, content, footer);
    this.appendChild(dialog);
    this._historyDialog = dialog;
    return dialog;
  }

  _buildHistoryDetailsHtml(entry) {
    const confidence = Number.isFinite(Number(entry?.confidence))
      ? `${Math.round(Number(entry.confidence) * 100)}%`
      : "-";
    const issueCount = Array.isArray(entry?.issues) ? entry.issues.length : 0;
    const notes = Array.isArray(entry?.notes) ? entry.notes : [];
    const coverage = entry?.coverage || {};
    const unknownTokens = Array.isArray(entry?.unknownTailwindTokens)
      ? entry.unknownTailwindTokens
      : [];
    const notesHtml = notes.length
      ? `<ul class="stack-xs">${notes
          .map((note) => `<li>${escapeHtml(note)}</li>`)
          .join("")}</ul>`
      : "none";
    const issuesHtml = issueCount
      ? `<ul class="stack-xs">${entry.issues
          .map(
            (issue) =>
              `<li><strong>${escapeHtml(issue?.severity || "info")}</strong>: ${escapeHtml(issue?.message || "")}</li>`
          )
          .join("")}</ul>`
      : "none";
    const unknownHtml = unknownTokens.length
      ? `<code>${escapeHtml(unknownTokens.join(", "))}</code>`
      : "none";

    return `
      <table class="table-bordered table-compact">
        <tbody>
          <tr><th scope="row">File</th><td>${escapeHtml(entry?.fileName || "(untitled import)")}</td></tr>
          <tr><th scope="row">Source</th><td>${escapeHtml(entry?.sourceType || "unknown")}</td></tr>
          <tr><th scope="row">Mode</th><td>${escapeHtml(getImportModeLabel(entry?.importMode || entry?.meta?.importMode))}</td></tr>
          <tr><th scope="row">Date</th><td>${escapeHtml(formatDateTime(entry?.createdAt || entry?.createdAtIso))}</td></tr>
          <tr><th scope="row">Confidence</th><td>${confidence}</td></tr>
          <tr><th scope="row">Tailwind</th><td>${Number(coverage.tailwind ?? 0)}</td></tr>
          <tr><th scope="row">Mapped</th><td>${Number(coverage.mapped ?? 0)}</td></tr>
          <tr><th scope="row">Ignored</th><td>${Number(coverage.ignored ?? 0)}</td></tr>
          <tr><th scope="row">Policy Skipped</th><td>${Number(coverage.policySkipped ?? 0)}</td></tr>
          <tr><th scope="row">Unknown</th><td>${Number(coverage.unknown ?? 0)}</td></tr>
          <tr><th scope="row">Imported Styles</th><td>${Number(coverage.importedStyles ?? 0)}</td></tr>
          <tr><th scope="row">Unknown Tokens</th><td>${unknownHtml}</td></tr>
          <tr><th scope="row">Notes</th><td>${notesHtml}</td></tr>
          <tr><th scope="row">Issues</th><td>${issuesHtml}</td></tr>
        </tbody>
      </table>
      <div class="flex gap-sm justify-end">
        ${String(entry?.convertedHtml || "").trim() ? '<button type="button" class="btn-secondary btn-sm pds-live-history-apply" data-history-id="' + Number(entry?.id || 0) + '">Apply stored result</button>' : ""}
        <button type="button" class="btn-outline btn-sm pds-live-history-reimport" data-history-id="${Number(entry?.id || 0)}">Re-import input</button>
      </div>
    `;
  }

  _openHistoryDetailsDialog(historyId) {
    const entry = this._getHistoryEntry(historyId);
    if (!entry) return;
    this._activeHistoryDialogEntry = entry;

    const dialog = this._ensureHistoryDialog();
    const content = dialog.querySelector('[data-role="history-details-content"]');
    if (!content) return;

    content.innerHTML = this._buildHistoryDetailsHtml(entry);

    content.querySelector(".pds-live-history-apply")?.addEventListener("click", (event) => {
      const id = Number(event.currentTarget?.getAttribute("data-history-id"));
      this._applyHistoryResult(id);
      dialog.close();
    });

    content.querySelector(".pds-live-history-reimport")?.addEventListener("click", async (event) => {
      const id = Number(event.currentTarget?.getAttribute("data-history-id"));
      await this._reimportHistoryItem(id);
      dialog.close();
    });

    if (!dialog.open) dialog.showModal();
  }

  async _copyActiveHistoryToClipboard() {
    const entry = this._activeHistoryDialogEntry;
    if (!entry) return;

    const text = String(
      entry?.convertedHtml || entry?.resultSnapshot?.template?.html || ""
    ).trim();
    if (!text) {
      await this._toast("No converted PDS HTML available to copy", "warning");
      return;
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      await this._toast("Copied converted PDS HTML to clipboard", "success");
    } catch (error) {
      await this._toast("Failed to copy converted PDS HTML", "error");
    }
  }

  openHistoryDetailsByMeta(options = {}) {
    const requestedFileName = String(options?.fileName || "");
    const requestedSourceType = String(options?.sourceType || "");
    const requestedImportMode = normalizeImportMode(options?.importMode);

    let entry = null;
    if (requestedFileName) {
      entry = this._history.find((item) => {
        const sameFile = String(item?.fileName || "") === requestedFileName;
        const sameSource = !requestedSourceType || String(item?.sourceType || "") === requestedSourceType;
        const sameMode =
          !requestedImportMode ||
          normalizeImportMode(item?.importMode || item?.meta?.importMode) === requestedImportMode;
        return sameFile && sameSource && sameMode;
      }) || null;
    }

    if (!entry) {
      entry = this._history[0] || null;
    }

    if (entry?.id != null) {
      this._openHistoryDetailsDialog(Number(entry.id));
    }
  }

  _renderHistory() {
    const list = this.querySelector(".pds-live-history-list");
    if (!list) return;

    if (this._isHistoryLoading) {
      list.innerHTML = `<p class="text-muted">Loading import history...</p>`;
      return;
    }

    if (!Array.isArray(this._history) || this._history.length === 0) {
      list.innerHTML = `<p class="text-muted">No imports yet.</p>`;
      return;
    }

    const rows = this._history
      .map((entry) => {
        const confidence = Number.isFinite(Number(entry?.confidence))
          ? `${Math.round(Number(entry.confidence) * 100)}%`
          : "-";
        const issueCount = Array.isArray(entry?.issues) ? entry.issues.length : 0;
        const coverage = entry?.coverage || {};
        const failedCount = Number(coverage.unknown ?? 0);
        const mappedCount = Number(coverage.mapped ?? 0);
        const totalTailwind = Number(coverage.tailwind ?? 0);
        const statusIssueText = `${failedCount} failed / ${issueCount} issues`;
        const fileLabel = `${entry?.fileName || "(untitled import)"} (${entry?.sourceType || "unknown"})`;
        const importMode = getImportModeLabel(entry?.importMode || entry?.meta?.importMode);
        return `
          <tr data-history-id="${Number(entry?.id || 0)}" data-history-file-name="${escapeHtml(entry?.fileName || "")}" data-history-source-type="${escapeHtml(entry?.sourceType || "")}">
            <td>${escapeHtml(formatDateTime(entry?.createdAt || entry?.createdAtIso))}</td>
            <td>${escapeHtml(fileLabel)}</td>
            <td class="flex flex-wrap gap-xs items-center">
              <span class="badge badge-outline badge-info badge-sm">${escapeHtml(importMode)}</span>
              <span class="badge badge-outline badge-success badge-sm">${escapeHtml(confidence)} success</span>
              <span class="badge badge-outline badge-warning badge-sm">${escapeHtml(statusIssueText)}</span>
              <span class="badge badge-outline badge-info badge-sm">${mappedCount} of ${totalTailwind} mapped</span>
            </td>
            <td>
              <button type="button" class="btn-outline btn-sm icon-only pds-live-history-details" data-history-id="${Number(entry?.id || 0)}" aria-label="Details" title="Details">
                <pds-icon icon="info" size="sm"></pds-icon>
              </button>
            </td>
          </tr>
        `;
      })
      .join("");

    list.innerHTML = `
      <table class="table-bordered table-compact">
        <thead>
          <tr>
            <th>Date</th>
            <th>File</th>
            <th>Status</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    list.querySelectorAll(".pds-live-history-details").forEach((button) => {
      button.addEventListener("click", (event) => {
        const historyId = Number(event.currentTarget?.getAttribute("data-history-id"));
        this._openHistoryDetailsDialog(historyId);
      });
    });
  }

  async _loadHistory() {
    this._isHistoryLoading = true;
    this._renderHistory();

    try {
      const manager = await getManagerModule();
      if (typeof manager?.listLiveImportHistory === "function") {
        this._history = await manager.listLiveImportHistory({ limit: 30 });
      } else {
        this._history = [];
      }
    } catch (error) {
      console.warn("Failed to load import history", error);
      this._history = [];
    } finally {
      this._isHistoryLoading = false;
      this._renderHistory();
    }
  }

  async _clearHistory() {
    const manager = await getManagerModule();
    if (typeof manager?.clearLiveImportHistory !== "function") return;

    let proceed = true;
    if (typeof PDS?.ask === "function") {
      const answer = await PDS.ask("Clear import history?", { type: "confirm" });
      proceed = Boolean(answer);
    }

    if (!proceed) return;

    try {
      await manager.clearLiveImportHistory();
      this._history = [];
      this._renderHistory();
    } catch (error) {
      console.warn("Failed to clear import history", error);
    }
  }

  _getHistoryEntry(historyId) {
    return this._history.find((entry) => Number(entry?.id) === Number(historyId)) || null;
  }

  _applyHistoryResult(historyId) {
    const entry = this._getHistoryEntry(historyId);
    if (!entry?.resultSnapshot) return;

    this.dispatchEvent(
      new CustomEvent("pds:live-import:result", {
        bubbles: true,
        composed: true,
        detail: {
          sourceType: entry.sourceType || "unknown",
          importMode: normalizeImportMode(entry.importMode || entry?.meta?.importMode),
          result: entry.resultSnapshot,
          file: {
            name: entry.fileName || "history-import",
            size: Number(entry.fileSize) || 0,
            type: entry.mimeType || "",
          },
        },
      })
    );
  }

  async _reimportHistoryItem(historyId) {
    const entry = this._getHistoryEntry(historyId);
    if (!entry) return;

    this._selectedFile = {
      name: entry.fileName || "history-import",
      size: Number(entry.fileSize) || 0,
      type: entry.mimeType || "",
    };
    this._selectedText = String(entry.fileContents || "");
    this._selectedSourceType = entry.sourceType || "brand-guidelines";
    this._selectedImportMode = normalizeImportMode(entry.importMode || entry?.meta?.importMode);
    this._updateSelectionUI();
    await this._runImport({ autoTriggered: false });
  }

  async _persistImportHistory({ sourceType, importMode, result }) {
    const manager = await getManagerModule();
    if (typeof manager?.saveLiveImportHistory !== "function") return;

    const meta = result?.meta || {};
    await manager.saveLiveImportHistory({
      createdAt: Date.now(),
      sourceType: sourceType || "unknown",
      importMode: normalizeImportMode(importMode || meta?.importMode),
      source: result?.source || sourceType || "unknown",
      type: result?.type || sourceType || "unknown",
      fileName: this._selectedFile?.name || "",
      fileSize: Number(this._selectedFile?.size) || 0,
      mimeType: this._selectedFile?.type || "",
      fileContents: this._selectedText,
      convertedHtml: result?.template?.html || "",
      confidence: Number(result?.confidence) || 0,
      notes: Array.isArray(meta?.notes) ? meta.notes : [],
      issues: Array.isArray(result?.issues) ? result.issues : [],
      coverage: meta?.coverage || {},
      unknownTailwindTokens: Array.isArray(meta?.unknownTailwindTokens)
        ? meta.unknownTailwindTokens
        : [],
      appliedRules: Array.isArray(meta?.appliedRules) ? meta.appliedRules : [],
      importStyleSheetInjected: Boolean(meta?.importStyleSheetInjected),
      templateName: result?.template?.name || "",
      designPatch: result?.designPatch || {},
      meta,
      resultSnapshot: {
        source: result?.source || sourceType || "unknown",
        type: result?.type || sourceType || "unknown",
        importMode: normalizeImportMode(importMode || meta?.importMode),
        confidence: Number(result?.confidence) || 0,
        issues: Array.isArray(result?.issues) ? result.issues : [],
        template: result?.template || null,
        designPatch: result?.designPatch || null,
        meta,
      },
    });
  }

  _buildDiagnosticsMessage(result, sourceType, fileName) {
    const confidence = typeof result?.confidence === "number"
      ? `${Math.round(result.confidence * 100)}%`
      : "-";
    const issues = Array.isArray(result?.issues) ? result.issues : [];
    const coverage = result?.meta?.coverage || {};

    return [
      `Import complete: ${fileName || "(no file)"}`,
      `source=${sourceType || "unknown"}`,
      `mode=${normalizeImportMode(result?.meta?.importMode || this._selectedImportMode)}`,
      `confidence=${confidence}`,
      `issues=${issues.length}`,
      `mapped=${coverage.mapped ?? 0}/${coverage.tailwind ?? 0}`,
      `report=Open Import History > Metadata table`,
    ].join("\n");
  }

  _buildDiagnosticsToastHtml(result, sourceType, fileName, importMode) {
    const confidencePct = typeof result?.confidence === "number"
      ? Math.round(result.confidence * 100)
      : 0;
    const issues = Array.isArray(result?.issues) ? result.issues : [];
    const coverage = result?.meta?.coverage || {};
    const failedCount = Number(coverage.unknown ?? 0);
    const totalTailwind = Number(coverage.tailwind ?? 0);
    const mappedCount = Number(coverage.mapped ?? 0);
    const fileLabel = `${fileName || "(no file)"} (${sourceType || result?.type || "unknown"})`;
    const issueText = `${failedCount} failed / ${issues.length} issues`;
    const modeLabel = getImportModeLabel(importMode || result?.meta?.importMode);

    return `
      <table class="table-bordered table-compact">
        <tbody>
          <tr><th scope="row">File</th><td>${escapeHtml(fileLabel)}</td></tr>
          <tr><th scope="row">Mode</th><td>${escapeHtml(modeLabel)}</td></tr>
          <tr>
            <th scope="row">Status</th>
            <td class="flex gap-xs items-center">
              <span class="badge badge-outline badge-success badge-sm">${confidencePct}% success</span>
              <span class="badge badge-outline badge-warning badge-sm">${escapeHtml(issueText)}</span>
              <span class="badge badge-outline badge-info badge-sm">${mappedCount} of ${totalTailwind} mapped</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  async _loadSources() {
    const manager = await getManagerModule();

    this._sources =
      typeof manager?.getLiveImportSources === "function"
        ? manager.getLiveImportSources()
        : [
            { id: "tailwind-html", name: "Tailwind HTML" },
            { id: "brand-guidelines", name: "Brand Guidelines" },
          ];

    this._sources = (this._sources || []).filter((source) => source.id !== "template");

    if (this._selectedFile) {
      this._selectedSourceType = inferSourceType(this._selectedFile, this._sources);
    }

    this._updateSelectionUI();
  }

  async _setSelectedFile(file) {
    if (!file) {
      this._selectedFile = null;
      this._selectedText = "";
      this._selectedSourceType = "";
      this._updateSelectionUI();
      return;
    }

    try {
      const text = await file.text();
      this._selectedFile = file;
      this._selectedText = text;
      this._selectedSourceType = inferSourceType(file, this._sources);
      this._updateSelectionUI();
      await this._runImport({ autoTriggered: true });
    } catch (error) {
      await this._toast(`Import failed\nreason=Could not read selected file\nerror=${error?.message || "Unknown error"}`, "error");
      this._selectedFile = null;
      this._selectedText = "";
      this._selectedSourceType = "";
      this._updateSelectionUI();
    }
  }

  _updateSelectionUI() {
    const runButton = this.querySelector(".pds-live-import-run");
    const importMode = this.querySelector(".pds-live-import-mode");

    if (importMode) {
      importMode.value = normalizeImportMode(this._selectedImportMode);
      importMode.disabled = this._isImporting;
    }

    if (!this._selectedFile) {
      if (runButton) runButton.disabled = true;
      return;
    }
    if (runButton) runButton.disabled = !this._selectedText.trim() || this._isImporting;
  }

  async _runImport(_options = {}) {
    if (this._isImporting) return;

    const manager = await getManagerModule();
    if (typeof manager?.runLiveImport !== "function") {
      await this._toast("Import failed\nreason=Import service unavailable", "error");
      return;
    }

    if (!this._selectedText.trim()) return;

    const runButton = this.querySelector(".pds-live-import-run");

    this._isImporting = true;
    let result = null;
    let sourceType = this._selectedSourceType || inferSourceType(this._selectedFile, this._sources);
    let importMode = normalizeImportMode(this._selectedImportMode);

    runButton?.classList.add("btn-working");
    if (runButton) runButton.disabled = true;

    try {
      const input = this._selectedText;
      const config = PDS?.currentConfig?.design || PDS?.currentConfig || null;
      result = await manager.runLiveImport({ sourceType, importMode, input, config });

      await this._persistImportHistory({ sourceType, importMode, result });
      await this._loadHistory();

      this.dispatchEvent(
        new CustomEvent("pds:live-import:result", {
          bubbles: true,
          composed: true,
          detail: { sourceType, importMode, result, file: this._selectedFile },
        })
      );
    } catch (error) {
      await this._toast(
        [
          `Import failed: ${this._selectedFile?.name || "selected file"}`,
          `source=${sourceType || "unknown"}`,
          `mode=${importMode}`,
          `error=${error?.message || "Unknown error"}`,
        ].join("\n"),
        "error"
      );
    } finally {
      if (result) {
        const hasIssues = Array.isArray(result?.issues) && result.issues.length > 0;
        const validationBlocked = Boolean(result?.meta?.validationBlocked || result?.meta?.validation?.ok === false);
        const type = validationBlocked ? "error" : hasIssues ? "warning" : "success";
        await this._toast(
          this._buildDiagnosticsToastHtml(result, sourceType, this._selectedFile?.name, importMode),
          type,
          {
            html: true,
            action: {
              label: "Open details",
              icon: "caret-right",
              onClick: () =>
                this._openLatestHistoryMetadata({
                  fileName: this._selectedFile?.name || "",
                  sourceType,
                  importMode,
                }),
              dismissOnClick: false,
            },
          }
        );
      }
      runButton?.classList.remove("btn-working");
      this._isImporting = false;
      this._updateSelectionUI();
    }
  }
}

customElements.define(COMPONENT_TAG, PdsLiveImporter);
