import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

import {
  configureLocalization,
  getLocalizationState,
  msg,
  setLocale,
} from "./localization.js";
import { configurePDSLogger } from "./pds-log.js";

/**
 * DOM tests for the localization reconciler.
 *
 * jsdom rather than a lighter shim, because what these tests pin IS observer
 * semantics: record type, record.target identity, attributeFilter, and
 * microtask delivery ordering relative to the reconciler's awaits. linkedom
 * cannot express them -- its mutation observer only ever emits
 * type: "childList" records whose target is the observed node, so the
 * reconciler's self-write filter would never execute and the test would pass
 * having verified nothing.
 *
 * NOTE ON `lang`: the test documents deliberately have no `lang` attribute on
 * <html>. __resolveContextLocale resolves a text node's locale via
 * parentElement.closest("[lang]") first, so a `lang` on <html> would pin every
 * node to that locale instead of the configured default.
 */

const DEBOUNCE_MS = 16;

let __installedDom = null;

function installDom(bodyHtml) {
  const dom = new JSDOM(`<!doctype html><html><body>${bodyHtml}</body></html>`);
  const { window } = dom;

  const saved = {};
  const install = (name, value) => {
    saved[name] = globalThis[name];
    globalThis[name] = value;
  };

  install("window", window);
  install("document", window.document);
  install("MutationObserver", window.MutationObserver);
  install("NodeFilter", window.NodeFilter);
  install("Node", window.Node);
  install("Element", window.Element);

  // __collectDetectedLocales always calls document.querySelectorAll("[lang]")
  // exactly once per reconcile pass (the shadow-scoped scan added alongside
  // __collectLocalizationRoots calls querySelectorAll on shadow roots
  // instead, so it does not add to this count), so wrapping it counts passes
  // without any seam in production code.
  const originalQuerySelectorAll = window.document.querySelectorAll.bind(window.document);
  const counter = { passes: 0, starSelects: 0 };
  window.document.querySelectorAll = (selector) => {
    if (selector === "[lang]") counter.passes += 1;
    return originalQuerySelectorAll(selector);
  };

  // __collectLocalizationRoots is the only caller of a bare `"*"` selector,
  // via Element/ShadowRoot.prototype.querySelectorAll, once per root per
  // pass. Counting it here is what pins the snapshot-sharing refactor.
  for (const proto of [window.Element.prototype, window.ShadowRoot.prototype]) {
    const original = proto.querySelectorAll;
    proto.querySelectorAll = function (selector) {
      if (selector === "*") counter.starSelects += 1;
      return original.call(this, selector);
    };
  }

  __installedDom = {
    dom,
    counter,
    restore() {
      for (const [name, value] of Object.entries(saved)) {
        if (value === undefined) {
          delete globalThis[name];
        } else {
          globalThis[name] = value;
        }
      }
      window.close();
    },
  };

  return __installedDom;
}

function teardownDom() {
  if (!__installedDom) return;
  // Detaches the MutationObserver bound to this document. Without it the next
  // test's configureLocalization() would find state.observer already set and
  // skip attaching to its own, fresh document.
  configureLocalization(null);
  configurePDSLogger({});
  __installedDom.restore();
  __installedDom = null;
}

const flush = (ms = DEBOUNCE_MS * 6) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function captureLogs() {
  const entries = [];
  configurePDSLogger({
    getLogger: () => (level, message, ...data) => {
      entries.push([level, String(message), ...data]);
    },
  });
  return entries;
}

/** A provider serving fixed bundles, recording how often translate() ran. */
function bundleProvider(bundlesByLocale) {
  const stats = { translateCalls: 0, loadCalls: [] };
  return {
    stats,
    provider: {
      loadLocale: ({ locale }) => {
        stats.loadCalls.push(locale);
        return bundlesByLocale[locale] || {};
      },
      translate: ({ key, messages }) => {
        stats.translateCalls += 1;
        return messages?.[key];
      },
    },
  };
}

const NL_DE = {
  nl: { Hello: "Hallo", Goodbye: "Tot ziens" },
  de: { Hello: "Guten Tag", Goodbye: "Auf Wiedersehen" },
};

test("text and attributes inside shadow roots are localized", async () => {
  const { dom } = installDom(`<p>Hello</p><div id="host"></div>`);
  const shadow = dom.window.document
    .getElementById("host")
    .attachShadow({ mode: "open" });
  shadow.innerHTML = `<span title="Goodbye">Hello</span>`;

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");
    msg("Goodbye");

    await flush();

    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");
    assert.equal(shadow.querySelector("span").textContent, "Hallo");
    assert.equal(shadow.querySelector("span").getAttribute("title"), "Tot ziens");
  } finally {
    teardownDom();
  }
});

test("an external text mutation schedules a pass and is localized", async () => {
  const { dom } = installDom(`<p>Hello</p><p id="later">untouched</p>`);

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");
    msg("Goodbye");

    await flush();
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");

    // Someone else's write to the DOM must still be picked up. This is the
    // negative control for the self-write filter: if that filter ever swallows
    // external mutations, this is what catches it.
    dom.window.document.getElementById("later").firstChild.nodeValue = "Goodbye";
    await flush();

    assert.equal(dom.window.document.getElementById("later").textContent, "Tot ziens");
  } finally {
    teardownDom();
  }
});

test("setLocale() re-localizes nodes that have already settled", async () => {
  const { dom } = installDom(`<p>Hello</p>`);

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");

    await flush();
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");

    await setLocale("de");
    await flush();

    assert.equal(getLocalizationState().locale, "de");
    assert.equal(dom.window.document.querySelector("p").textContent, "Guten Tag");
  } finally {
    teardownDom();
  }
});

test("a lang attribute change re-localizes nodes that have already settled", async () => {
  const { dom } = installDom(`<p>Hello</p>`);

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");

    await flush();
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");

    dom.window.document.documentElement.setAttribute("lang", "de");
    await flush();

    assert.equal(dom.window.document.querySelector("p").textContent, "Guten Tag");
  } finally {
    teardownDom();
  }
});

test("reconcile passes are serialized while one is in flight", async () => {
  const { dom, counter } = installDom(`<p>Hello</p>`);

  try {
    let releaseLoad;
    const loadGate = new Promise((resolve) => {
      releaseLoad = resolve;
    });

    configureLocalization({
      locale: "nl",
      provider: {
        loadLocale: async ({ locale }) => {
          if (locale === "nl") await loadGate;
          return NL_DE[locale] || {};
        },
      },
    });
    msg("Hello");

    // Let the debounced timer fire once; the pass then hangs inside
    // __ensureDetectedLocalesLoaded, awaiting loadGate.
    await flush(DEBOUNCE_MS * 2);
    const passesWhileHanging = counter.passes;
    assert.equal(passesWhileHanging, 1);

    // Each mutation is spaced beyond the debounce window, so every one of
    // them genuinely fires its own timer callback. Before serialization each
    // of those un-awaited calls started its own concurrent document walk.
    for (let i = 0; i < 5; i += 1) {
      dom.window.document.body.appendChild(dom.window.document.createElement("span"));
      await flush(DEBOUNCE_MS * 1.5);
    }
    assert.equal(
      counter.passes,
      passesWhileHanging,
      "a pass must not start while one is already in flight"
    );

    releaseLoad();
    await flush(DEBOUNCE_MS * 8);

    // Serialization must not drop the work the coalesced mutations asked for.
    assert.ok(counter.passes <= 3, `expected a small, bounded number of passes, got ${counter.passes}`);
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");
  } finally {
    teardownDom();
  }
});

test("non-settling localization warns and reschedules the remainder", async () => {
  const { dom } = installDom(`<p>Hello</p>`);
  const logs = captureLogs();

  try {
    let translateCalls = 0;
    configureLocalization({
      locale: "nl",
      provider: {
        // Every call appends a fresh, localizable node, so no pass can ever
        // observe a settled DOM -- this is the pathological case the pass
        // cap exists for.
        translate: ({ key, messages }) => {
          translateCalls += 1;
          if (translateCalls <= 40) {
            const churn = dom.window.document.createElement("p");
            churn.textContent = "Hello";
            dom.window.document.body.appendChild(churn);
          }
          return messages?.[key] ?? NL_DE.nl[key];
        },
        loadLocale: ({ locale }) => NL_DE[locale] || {},
      },
    });
    msg("Hello");

    // Sample right as the cap is hit, not after the DOM has fully settled --
    // otherwise the rescheduled window's work has already happened and there
    // is nothing left to observe growing.
    let sawWarning = false;
    for (let i = 0; i < 10 && !sawWarning; i += 1) {
      await flush(DEBOUNCE_MS);
      sawWarning = logs.some(([level, message]) => level === "warn" && /did not settle/.test(message));
    }
    assert.ok(sawWarning, "expected a warning once the pass cap was hit");

    const translateCallsAtWarning = translateCalls;
    await flush(DEBOUNCE_MS * 2);

    // The cap bounds latency per scheduling window, not total work: proof
    // that the remainder was rescheduled rather than silently dropped.
    assert.ok(
      translateCalls > translateCallsAtWarning,
      "expected work to continue in the rescheduled window"
    );
  } finally {
    teardownDom();
  }
});

test("the reconciler's own write does not trigger a redundant extra pass", async () => {
  const { dom, counter } = installDom(`<p>Hello</p>`);

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");

    await flush(DEBOUNCE_MS * 6);
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");

    // The write that settles the DOM produces exactly one characterData
    // record. Before the self-write filter, that record was indistinguishable
    // from an external mutation and unconditionally scheduled a second,
    // entirely wasted full-document pass -- deterministically 2, not 1.
    assert.equal(counter.passes, 1, `expected exactly one pass once settled, got ${counter.passes}`);

    // And it must stay settled -- no perpetual retriggering off its own writes.
    await flush(DEBOUNCE_MS * 6);
    assert.equal(counter.passes, 1);
  } finally {
    teardownDom();
  }
});

test("a lang attribute inside a shadow root is detected without being pruned every pass", async () => {
  const { dom } = installDom(`<div id="host"></div>`);
  const shadow = dom.window.document.getElementById("host").attachShadow({ mode: "open" });
  shadow.innerHTML = `<p lang="de">Hello</p>`;

  try {
    const loadCalls = [];
    configureLocalization({
      locale: "nl",
      provider: {
        loadLocale: ({ locale }) => {
          loadCalls.push(locale);
          return NL_DE[locale] || {};
        },
      },
    });
    msg("Hello");

    await flush();
    // __localizeTextNode loads "de" on demand for this node regardless of
    // __collectDetectedLocales, via __resolveContextLocale resolving `lang`
    // through the shadow boundary -- so this alone doesn't distinguish the
    // fix. What it exposes is __pruneUndetectedLocales: without scanning
    // roots too, document.querySelectorAll("[lang]") cannot see this
    // shadow-internal attribute, "de" is absent from detectedLocales, and it
    // gets deleted from messagesByLocale at the end of every single pass --
    // forcing a re-fetch on every subsequent pass that touches this node.
    assert.equal(shadow.querySelector("p").textContent, "Guten Tag");

    const deLoadsAfterSettling = loadCalls.filter((l) => l === "de").length;

    // Force a second, genuine pass with nothing about the shadow content
    // changed, so any further "de" load can only be the prune-and-reload bug.
    dom.window.document.body.appendChild(dom.window.document.createElement("hr"));
    await flush();

    assert.equal(
      loadCalls.filter((l) => l === "de").length,
      deLoadsAfterSettling,
      "expected the de bundle to stay loaded, not be pruned and re-fetched"
    );
  } finally {
    teardownDom();
  }
});

test("each reconcile pass takes one element snapshot per root", async () => {
  const { dom, counter } = installDom(`<p>Hello</p><div id="host"></div>`);
  const shadow = dom.window.document
    .getElementById("host")
    .attachShadow({ mode: "open" });
  shadow.innerHTML = `<span title="Goodbye">Hello</span>`;

  try {
    const { provider } = bundleProvider(NL_DE);
    configureLocalization({ locale: "nl", provider });
    msg("Hello");
    msg("Goodbye");

    await flush();
    assert.equal(dom.window.document.querySelector("p").textContent, "Hallo");

    const starSelectsAtSettle = counter.starSelects;
    const passesAtSettle = counter.passes;

    // One unrelated external mutation forces exactly one more pass over the
    // same two roots (body + the shadow root). Before sharing one snapshot
    // between the text-node and attribute walks, this cost 3 querySelectorAll
    // ("*") calls per root (1 in the text-node walk's shadow discovery, 1 in
    // the attribute walk's own shadow discovery, 1 in the attribute walk's
    // element loop) -- 6 for 2 roots. After, it costs 1 per root -- 2.
    dom.window.document.body.appendChild(dom.window.document.createElement("hr"));
    await flush();

    assert.equal(counter.passes, passesAtSettle + 1);
    assert.equal(counter.starSelects - starSelectsAtSettle, 2);
  } finally {
    teardownDom();
  }
});

export { installDom, teardownDom, flush, captureLogs, bundleProvider, NL_DE, DEBOUNCE_MS };
