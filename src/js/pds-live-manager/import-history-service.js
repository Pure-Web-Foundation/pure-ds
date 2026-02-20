const IMPORT_HISTORY_DB_NAME = "pds-live-import-history";
const IMPORT_HISTORY_DB_VERSION = 1;
const IMPORT_HISTORY_STORE = "imports";

let dbPromise = null;

function supportsIndexedDb() {
  return typeof globalThis !== "undefined" && typeof globalThis.indexedDB !== "undefined";
}

function sanitizeText(value) {
  return typeof value === "string" ? value : "";
}

function sanitizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function sanitizeObject(value) {
  return value && typeof value === "object" ? value : {};
}

function openDb() {
  if (!supportsIndexedDb()) return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open(IMPORT_HISTORY_DB_NAME, IMPORT_HISTORY_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMPORT_HISTORY_STORE)) {
        const store = db.createObjectStore(IMPORT_HISTORY_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("sourceType", "sourceType", { unique: false });
        store.createIndex("fileName", "fileName", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Failed to open import history database."));
  });

  return dbPromise;
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB operation failed."));
  });
}

function normalizeHistoryEntry(input = {}) {
  const now = Date.now();
  const createdAt = Number.isFinite(Number(input.createdAt)) ? Number(input.createdAt) : now;
  const createdAtIso = new Date(createdAt).toISOString();

  const issues = sanitizeArray(input.issues).map((issue) => ({
    severity: sanitizeText(issue?.severity || "info"),
    message: sanitizeText(issue?.message || ""),
  }));

  const notes = sanitizeArray(input.notes).filter((note) => typeof note === "string");
  const unknownTailwindTokens = sanitizeArray(input.unknownTailwindTokens).filter(
    (token) => typeof token === "string"
  );
  const appliedRules = sanitizeArray(input.appliedRules).filter((rule) => typeof rule === "string");

  return {
    createdAt,
    createdAtIso,
    sourceType: sanitizeText(input.sourceType || "unknown"),
    source: sanitizeText(input.source || "unknown"),
    type: sanitizeText(input.type || "unknown"),
    fileName: sanitizeText(input.fileName || ""),
    fileSize: Number.isFinite(Number(input.fileSize)) ? Number(input.fileSize) : 0,
    mimeType: sanitizeText(input.mimeType || ""),
    fileContents: sanitizeText(input.fileContents || ""),
    convertedHtml: sanitizeText(input.convertedHtml || ""),
    confidence: Number.isFinite(Number(input.confidence)) ? Number(input.confidence) : 0,
    notes,
    issues,
    coverage: sanitizeObject(input.coverage),
    unknownTailwindTokens,
    appliedRules,
    importStyleSheetInjected: Boolean(input.importStyleSheetInjected),
    templateName: sanitizeText(input.templateName || ""),
    designPatch: sanitizeObject(input.designPatch),
    meta: sanitizeObject(input.meta),
    resultSnapshot: sanitizeObject(input.resultSnapshot),
  };
}

export async function saveLiveImportHistory(input = {}) {
  const db = await openDb();
  if (!db) return null;

  const entry = normalizeHistoryEntry(input);
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readwrite");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const id = await requestToPromise(store.add(entry));

  return { id, ...entry };
}

export async function listLiveImportHistory(options = {}) {
  const db = await openDb();
  if (!db) return [];

  const limit = Number.isFinite(Number(options.limit)) ? Math.max(1, Number(options.limit)) : 30;
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readonly");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const items = (await requestToPromise(store.getAll())) || [];

  return items
    .sort((a, b) => Number(b?.createdAt || 0) - Number(a?.createdAt || 0))
    .slice(0, limit);
}

export async function getLiveImportHistoryEntry(id) {
  const db = await openDb();
  if (!db) return null;

  const parsedId = Number(id);
  if (!Number.isFinite(parsedId)) return null;

  const tx = db.transaction(IMPORT_HISTORY_STORE, "readonly");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const entry = await requestToPromise(store.get(parsedId));
  return entry || null;
}

export async function clearLiveImportHistory() {
  const db = await openDb();
  if (!db) return;

  const tx = db.transaction(IMPORT_HISTORY_STORE, "readwrite");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  await requestToPromise(store.clear());
}
