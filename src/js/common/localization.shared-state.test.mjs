import test from "node:test";
import assert from "node:assert/strict";

/**
 * Several @pure-ds/core bundles statically inline common/localization.js, and a
 * consumer may bundle a further copy, so these tests load the module more than
 * once and assert that the copies share one state object.
 *
 * ISOLATION CAVEAT: a copy captures the state object once, at import time
 * (`const __localizationState = __resolveLocalizationState()`). Deleting
 * globalThis[STATE_KEY] afterwards does NOT detach an already-loaded copy. So
 * every test must reset the global BEFORE loading its copies, and no copy may
 * ever be shared between tests -- hence the monotonic counter, which guarantees
 * a distinct specifier and therefore a distinct module instance.
 *
 * No DOM is needed: every DOM touch in the module under test is guarded by a
 * `typeof document === "undefined"` / `typeof window === "undefined"` check.
 */
const STATE_KEY = "__PURE_DS_LOCALIZATION_STATE__";
const MODULE_URL = new URL("./localization.js", import.meta.url).href;

let __copyCounter = 0;

function loadCopy() {
  __copyCounter += 1;
  return import(`${MODULE_URL}?copy=${__copyCounter}`);
}

function resetSharedState() {
  delete globalThis[STATE_KEY];
}

test("two loaded copies of the localization module are genuinely distinct instances", async () => {
  resetSharedState();

  try {
    const copyA = await loadCopy();
    const copyB = await loadCopy();

    // Guards every other test in this file: if the cache-busted import ever
    // stops producing separate module instances, the sharing assertions below
    // would pass trivially without testing anything.
    assert.notStrictEqual(copyA.msg, copyB.msg);
    assert.notStrictEqual(copyA.configureLocalization, copyB.configureLocalization);
  } finally {
    resetSharedState();
  }
});

test("configuring one copy configures every copy", async () => {
  resetSharedState();

  try {
    const copyA = await loadCopy();
    const copyB = await loadCopy();

    copyA.configureLocalization({
      locale: "nl",
      messages: { Hello: "Hallo" },
    });

    // Before the shared-state fix copy B kept its own state: "Hello" / "en".
    assert.equal(copyB.msg("Hello"), "Hallo");
    assert.equal(copyB.getLocalizationState().locale, "nl");
    assert.deepEqual(copyB.getLocalizationState().loadedLocales, ["nl"]);
    assert.equal(copyB.getLocalizationState().hasProvider, false);
  } finally {
    resetSharedState();
  }
});

test("a key requested through one copy is registered for every copy", async () => {
  resetSharedState();

  try {
    const copyA = await loadCopy();
    const copyB = await loadCopy();

    copyB.configureLocalization({
      locale: "nl",
      messages: { "Registered by A": "Door A geregistreerd" },
    });

    copyA.msg("Registered by A");

    // White-box, because requestedKeys has no public getter -- this mirrors the
    // heap-snapshot inspection that surfaced the bug. The registry is what the
    // reconciler walks the DOM for, so a per-copy registry means msg() calls
    // made inside pds-enhancers.js / pds-live.js are never localized.
    const sharedState = globalThis[STATE_KEY];
    assert.ok(sharedState, "expected the shared localization state to exist");
    assert.ok(sharedState.requestedKeys.has("Registered by A"));

    assert.equal(copyB.msg("Registered by A"), "Door A geregistreerd");
  } finally {
    resetSharedState();
  }
});

test("adopting an older-shaped state backfills missing fields without clobbering present ones", async () => {
  resetSharedState();

  try {
    // An empty string is a legitimate value that is also falsy, so it only
    // survives if the backfill tests with `in` rather than `||=` / `??=`.
    globalThis[STATE_KEY] = { defaultLocale: "" };

    const copy = await loadCopy();
    const adoptedState = globalThis[STATE_KEY];

    assert.equal(adoptedState.defaultLocale, "");
    assert.equal(copy.getLocalizationState().locale, "");

    assert.ok(adoptedState.messagesByLocale instanceof Map);
    assert.ok(adoptedState.loadingByLocale instanceof Map);
    assert.ok(adoptedState.requestedKeys instanceof Set);
    assert.ok(adoptedState.missingWarnings instanceof Set);
    assert.ok(adoptedState.valueToKeys instanceof Map);
    assert.ok(adoptedState.textNodeKeyMap instanceof WeakMap);
    assert.ok(adoptedState.attributeKeyMap instanceof WeakMap);
    assert.equal(adoptedState.provider, null);
    assert.equal(adoptedState.observer, null);
    assert.equal(adoptedState.reconcileTimer, null);
    assert.equal(adoptedState.configureCount, 0);
  } finally {
    resetSharedState();
  }
});

test("one observer is attached across copies, and a reset tears it down", async () => {
  resetSharedState();

  // Deliberately a stub, not a DOM shim: the assertions below are "how many
  // observers were constructed" and "was disconnect() called", not anything
  // about MutationObserver semantics. Record/replay behaviour of the observer
  // itself is covered by the jsdom-based reconciler tests.
  const observers = [];
  const saved = {
    window: globalThis.window,
    document: globalThis.document,
    MutationObserver: globalThis.MutationObserver,
  };

  globalThis.window = {};
  globalThis.document = { documentElement: { getAttribute: () => null } };
  globalThis.MutationObserver = class {
    constructor() {
      this.disconnected = false;
      observers.push(this);
    }
    observe() {}
    disconnect() {
      this.disconnected = true;
    }
  };

  try {
    const copyA = await loadCopy();
    const copyB = await loadCopy();

    copyA.configureLocalization({ locale: "nl", messages: { Hello: "Hallo" } });
    assert.equal(observers.length, 1);

    // A second configure through a different copy must not stack a second
    // observer over the same document.
    copyB.configureLocalization({ locale: "de", messages: { Hello: "Hallo" } });
    assert.equal(observers.length, 1);
    assert.equal(observers[0].disconnected, false);

    // A reset has nothing left to reconcile for, so the observer must go --
    // otherwise it keeps scheduling document-wide passes forever.
    copyB.configureLocalization(null);
    assert.equal(observers[0].disconnected, true);
    assert.equal(globalThis[STATE_KEY].observer, null);
  } finally {
    globalThis.window = saved.window;
    globalThis.document = saved.document;
    globalThis.MutationObserver = saved.MutationObserver;
    resetSharedState();
  }
});

test("a global that rejects the write degrades to per-copy state instead of throwing", async () => {
  resetSharedState();

  // Hardened realms and some CSP shims make the global non-writable. Module
  // evaluation must still succeed; falling back to per-copy state is the
  // pre-fix behaviour, which is degraded but not broken.
  Object.defineProperty(globalThis, STATE_KEY, {
    value: 0,
    writable: false,
    configurable: true,
  });

  try {
    const copy = await loadCopy();

    assert.equal(globalThis[STATE_KEY], 0);
    assert.equal(copy.msg("untranslated"), "untranslated");
    assert.equal(copy.getLocalizationState().locale, "en");
  } finally {
    delete globalThis[STATE_KEY];
  }
});
