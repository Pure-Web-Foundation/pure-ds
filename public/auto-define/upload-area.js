// /d:/Code/pure/pure-ds/public/auto-define/upload-area.js
// A best-practice, accessible web component that replaces <input type="file">
// - Drag & drop support
// - Click to open file picker
// - Small tiles for dropped files with previews and remove controls
// - Attributes: accept, multiple, disabled, max-files
// - Methods: getFiles(), clear()
// - Events: "files-changed" (detail: FileList-like array)
class UploadArea extends HTMLElement {
  static get observedAttributes() {
    return ["accept", "multiple", "disabled", "max-files"];
  }

  // Private fields
  #root;
  #files;
  #objectUrls;
  #container;
  #btnSelect;
  #tiles;
  #input;
  #internals;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });

    this.#files = []; // Array<File>
    this.#objectUrls = new Map(); // File -> objectUrl

    // Attach element internals for form participation
    this.#internals = this.attachInternals();

    this.#root.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-family, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial);
          --border-color: var(--color-border, #d1d5db);
          --accent: var(--color-accent, #2563eb);
          --bg: var(--color-bg, #fff);
          --tile-bg: var(--color-tile-bg, #f9fafb);
          --tile-border: var(--color-tile-border, #e5e7eb);
          --danger: var(--color-danger, #ef4444);
        }

        .container {
          position: relative;
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius, 8px);
          padding: var(--spacing-md, 12px);
          background: var(--color-input-bg);
          display: flex;
          gap: var(--spacing-md, 12px);
          align-items: center;
          cursor: pointer;
          transition: border-color .15s ease, background .15s ease, box-shadow .12s ease;
        }

        .container[aria-disabled="true"] {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .container.dragover {
          border-color: var(--accent);
          box-shadow: 0 2px 8px rgba(37,99,235,.12);
        }

        .instructions {
          flex: 1;
          min-width: 0;
        }

        .headline {
          font-weight: var(--font-weight-bold, 600);
          color: var(--color-text-primary, #111827);
          margin: 0 0 var(--spacing-xs, 6px) 0;
          font-size: var(--font-size-sm, 14px);
        }

        .sub {
          font-size: var(--font-size-xs, 13px);
          color: var(--color-text-secondary, #6b7280);
          margin: 0;
        }

        .btn-select {
          background: var(--color-primary-600);
          color: var(--color-btn-text, white);
          border: none;
          padding: var(--spacing-sm, 8px) var(--spacing-md, 10px);
          border-radius: var(--radius-md, 6px);
          font-size: var(--font-size-xs, 13px);
          cursor: pointer;
        }

        .tiles {
          display: flex;
          gap: var(--spacing-sm, 8px);
          flex-wrap: wrap;
          margin-top: var(--spacing-md, 12px);
        }

        .tile {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm, 8px);
          background: var(--color-surface-subtle);
          border: 1px solid var(--tile-border);
          padding: var(--spacing-xs, 6px);
          border-radius: var(--border-radius, 6px);
          min-width: 120px;
          max-width: 220px;
        }

        .thumb {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          border-radius: var(--border-radius-sm, 4px);
          background: var(--color-bg, #fff);
          border: 1px solid var(--color-gray-300);;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .meta {
          flex: 1;
          min-width: 0;
          font-size: var(--font-size-xs, 12px);
          color: var(--color-text-primary, #111827);
        }

        .meta .name {
          font-weight: var(--font-weight-bold, 600);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta .size {
          color: var(--color-text-secondary, #6b7280);
          font-size: var(--font-size-xxs, 11px);
        }

        .remove {
          background: transparent;
          border: none;
          color: var(--danger);
          cursor: pointer;
          padding: var(--spacing-xxs, 4px);
          font-size: var(--font-size-sm, 14px);
        }

        input[type="file"] { display: none; }

        /* Focus styles */
        .container:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
      </style>

      <div class="container" role="button" tabindex="0" aria-disabled="false">
        <div class="instructions">
          <div class="headline">Drop files here or</div>
          <div class="sub">Click to browse, or drag & drop files to upload.</div>
        </div>
        <button type="button" class="btn-select">Select</button>
      </div>

      <div class="tiles" aria-live="polite" aria-relevant="additions removals"></div>

      <input type="file" multiple />
    `;

    this.#container = this.#root.querySelector(".container");
    this.#btnSelect = this.#root.querySelector(".btn-select");
    this.#tiles = this.#root.querySelector(".tiles");
    this.#input = this.#root.querySelector('input[type="file"]');
  }

  // Form-associated lifecycle callbacks
  formAssociatedCallback() {
    // Called when the element is associated with a form
  }

  formDisabledCallback(disabled) {
    // Called when the form or fieldset is disabled/enabled
    this.#container.setAttribute("aria-disabled", disabled);
  }

  formResetCallback() {
    // Called when the form is reset
    this.clear();
  }

  formStateRestoreCallback(state) {
    // Called when the form restores its state (e.g., after navigation)
    if (state) {
      this.#files = state;
      this.#updateTiles();
    }
  }

  // Custom methods for form participation
  get value() {
    return this.#files.map((file) => file.name).join(", ");
  }

  set value(val) {
    // No-op: value is derived from files
  }

  checkValidity() {
    // Custom validation logic
    return this.#internals.checkValidity();
  }

  reportValidity() {
    // Report validation issues
    return this.#internals.reportValidity();
  }

  clear() {
    this.#files = [];
    this.#updateTiles();
  }

  #updateTiles() {
    // Update the UI to reflect the current files
    this.#tiles.innerHTML = "";
    this.#files.forEach((file) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = file.name;
      this.#tiles.appendChild(tile);
    });
  }

  connectedCallback() {
    this._upgradeProperty("accept");
    this._upgradeProperty("multiple");
    this._upgradeProperty("disabled");
    this._upgradeProperty("max-files");

    this._applyAttributesToInput();

    this.#container.addEventListener("click", this.#onClick);
    this.#container.addEventListener("keydown", this.#onKey);
    this.#btnSelect.addEventListener("click", this.#onSelectClick);
    this.#input.addEventListener("change", this.#onFileInput);

    // Drag & drop
    this.#container.addEventListener("dragover", this.#onDragOver);
    this.#container.addEventListener("dragenter", this.#onDragEnter);
    this.#container.addEventListener("dragleave", this.#onDragLeave);
    this.#container.addEventListener("drop", this.#onDrop);
  }

  disconnectedCallback() {
    this.#container.removeEventListener("click", this.#onClick);
    this.#container.removeEventListener("keydown", this.#onKey);
    this.#btnSelect.removeEventListener("click", this.#onSelectClick);
    this.#input.removeEventListener("change", this.#onFileInput);

    this.#container.removeEventListener("dragover", this.#onDragOver);
    this.#container.removeEventListener("dragenter", this.#onDragEnter);
    this.#container.removeEventListener("dragleave", this.#onDragLeave);
    this.#container.removeEventListener("drop", this.#onDrop);

    this._revokeAllObjectUrls();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    switch (name) {
      case "accept":
      case "multiple":
      case "disabled":
      case "max-files":
        this._applyAttributesToInput();
        break;
    }
  }

  // Public API
  getFiles() {
    // Return a copy array of files
    return Array.from(this.#files);
  }

  clear() {
    this.#files = [];
    this._updateInputFiles();
    this._renderTiles();
    this._emitFilesChanged();
  }

  // Internals
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _applyAttributesToInput() {
    // accept
    if (this.hasAttribute("accept")) {
      this.#input.setAttribute("accept", this.getAttribute("accept"));
    } else {
      this.#input.removeAttribute("accept");
    }

    // multiple
    if (this.hasAttribute("multiple")) {
      this.#input.setAttribute("multiple", "");
      this.#container.setAttribute("aria-multiselectable", "true");
    } else {
      this.#input.removeAttribute("multiple");
      this.#container.removeAttribute("aria-multiselectable");
    }

    // disabled
    const disabled = this.hasAttribute("disabled");
    this.#input.disabled = disabled;
    this.#container.setAttribute("aria-disabled", disabled ? "true" : "false");
    this.#btnSelect.disabled = disabled;
    if (disabled) {
      this.#container.tabIndex = -1;
    } else {
      this.#container.tabIndex = 0;
    }
  }

  #onClick = (e) => {
    if (this.hasAttribute("disabled")) return;
    // Ensure clicks on the whole container open file picker
    if (e.target === this.#btnSelect) return; // handled separately
    this.#input.click();
  };

  #onSelectClick = (e) => {
    e.stopPropagation();
    if (this.hasAttribute("disabled")) return;
    this.#input.click();
  };

  #onKey = (e) => {
    if (this.hasAttribute("disabled")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.#input.click();
    }
  };

  #onFileInput = (e) => {
    if (!this.#input.files) return;
    this._addFiles(this.#input.files);
    // reset input to allow selecting same file again
    this.#input.value = "";
  };

  #onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  #onDragEnter = (e) => {
    e.preventDefault();
    if (this.hasAttribute("disabled")) return;
    this.#container.classList.add("dragover");
  };

  #onDragLeave = (e) => {
    // Only remove when leaving the container entirely
    const rect = this.#container.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      this.#container.classList.remove("dragover");
    }
  };

  #onDrop = (e) => {
    e.preventDefault();
    this.#container.classList.remove("dragover");
    if (this.hasAttribute("disabled")) return;
    const dtFiles =
      e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null;
    if (dtFiles && dtFiles.length) {
      this._addFiles(dtFiles);
    }
  };

  _addFiles(fileListLike) {
    const incoming = Array.from(fileListLike);

    // If accept is present, filter by accept patterns
    const accept = this.getAttribute("accept");
    const acceptList = accept
      ? accept
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : null;
    const acceptedFiles = acceptList
      ? incoming.filter((f) => this._fileMatchesAccept(f, acceptList))
      : incoming;

    // max-files handling
    const maxAttr = this.getAttribute("max-files");
    let max = maxAttr ? parseInt(maxAttr, 10) : null;
    if (Number.isNaN(max)) max = null;

    if (this.hasAttribute("multiple")) {
      // Append while respecting max
      const available =
        max != null ? Math.max(0, max - this.#files.length) : Infinity;
      const toTake = acceptedFiles.slice(0, available);
      this.#files = this.#files.concat(toTake);
    } else {
      // Only first accepted file
      if (acceptedFiles.length > 0) {
        this.#files = [acceptedFiles[0]];
      }
    }

    this._updateInputFiles();
    this._renderTiles();
    this._emitFilesChanged();
  }

  _fileMatchesAccept(file, acceptList) {
    // Accept patterns can be MIME types, wildcards like image/*, or extensions like .png
    const name = (file.name || "").toLowerCase();
    const type = (file.type || "").toLowerCase();

    for (const pattern of acceptList) {
      if (pattern.startsWith(".")) {
        if (name.endsWith(pattern.toLowerCase())) return true;
      } else if (pattern.endsWith("/*")) {
        const base = pattern.slice(0, -2).toLowerCase();
        if (type.startsWith(base + "/")) return true;
      } else {
        if (type === pattern.toLowerCase()) return true;
      }
    }
    return false;
  }

  _updateInputFiles() {
    // Create a DataTransfer and assign files to hidden input for form compatibility
    try {
      const dt = new DataTransfer();
      for (const f of this.#files) dt.items.add(f);
      this.#input.files = dt.files;
    } catch (err) {
      // Some older browsers may not support DataTransfer() constructor.
      // In that case, we can't sync input.files but component still works.
    }
  }

  _renderTiles() {
    // Clear tiles
    this.#tiles.innerHTML = "";
    this._revokeUnusedObjectUrls();

    this.#files.forEach((file, idx) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.index = String(idx);

      const thumb = document.createElement("div");
      thumb.className = "thumb";
      // If image, create preview
      if (file.type && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        this.#objectUrls.set(file, url);
        const img = document.createElement("img");
        img.src = url;
        img.alt = file.name;
        thumb.appendChild(img);
      } else {
        // non-image icon (simple file icon)
        thumb.innerHTML = this._fileIconSvg();
      }

      const meta = document.createElement("div");
      meta.className = "meta";
      const name = document.createElement("div");
      name.className = "name";
      name.textContent = file.name;
      const size = document.createElement("div");
      size.className = "size";
      size.textContent = this._formatBytes(file.size);
      meta.appendChild(name);
      meta.appendChild(size);

      const remove = document.createElement("button");
      remove.className = "remove";
      remove.type = "button";
      remove.title = `Remove ${file.name}`;
      remove.setAttribute("aria-label", `Remove ${file.name}`);
      remove.textContent = "✕";
      remove.addEventListener("click", (e) => {
        e.stopPropagation();
        this._removeFileAtIndex(idx);
      });

      tile.appendChild(thumb);
      tile.appendChild(meta);
      tile.appendChild(remove);

      this.#tiles.appendChild(tile);
    });
  }

  _removeFileAtIndex(i) {
    const file = this.#files[i];
    if (!file) return;
    this.#files.splice(i, 1);
    this._updateInputFiles();
    this._renderTiles();
    this._emitFilesChanged();
    // revoke object url for removed file
    if (this.#objectUrls.has(file)) {
      URL.revokeObjectURL(this.#objectUrls.get(file));
      this.#objectUrls.delete(file);
    }
  }

  _emitFilesChanged() {
    const filesArray = this.getFiles();
    this.dispatchEvent(
      new CustomEvent("files-changed", {
        detail: { files: filesArray },
        bubbles: true,
        composed: true,
      })
    );
  }

  _formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  _fileIconSvg() {
    // Minimal inline SVG for generic file icon
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" stroke="#e5e7eb"/>
      <path d="M7 7h6v2H7zM7 11h10v2H7z" fill="#9ca3af"/>
    </svg>`;
  }

  _revokeAllObjectUrls() {
    for (const url of this.#objectUrls.values()) {
      try {
        URL.revokeObjectURL(url);
      } catch (_) {}
    }
    this.#objectUrls.clear();
  }

  _revokeUnusedObjectUrls() {
    // Remove any object URLs for files no longer present
    const currentFiles = new Set(this.#files);
    for (const [file, url] of Array.from(this.#objectUrls.entries())) {
      if (!currentFiles.has(file)) {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
        this.#objectUrls.delete(file);
      }
    }
  }
}

if (!customElements.get("upload-area")) {
  customElements.define("upload-area", UploadArea);
}

export default UploadArea;
