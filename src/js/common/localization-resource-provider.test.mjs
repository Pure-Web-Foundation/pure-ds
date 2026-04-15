import test from "node:test";
import assert from "node:assert/strict";

import { createJSONLocalization } from "./localization-resource-provider.js";

test("createJSONLocalization skips default locale fetch by default", async () => {
  let fetchCalls = 0;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    fetchCalls += 1;
    return {
      ok: true,
      async json() {
        return { greeting: "Hello" };
      },
    };
  };

  try {
    const localization = createJSONLocalization({
      locale: "en",
      locales: ["en", "nl"],
      aliases: {
        en: ["en", "en-US"],
      },
    });

    const bundle = await localization.provider.loadLocale({ locale: "en-US" });

    assert.deepEqual(bundle, {});
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("createJSONLocalization can load the default locale bundle for code keys", async () => {
  const requestedPaths = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (resourcePath) => {
    requestedPaths.push(resourcePath);

    if (resourcePath === "/assets/locales/en-US.json") {
      return {
        ok: true,
        async json() {
          return {
            "my-long-string-code": {
              content: "English source copy",
            },
          };
        },
      };
    }

    return {
      ok: false,
      async json() {
        return {};
      },
    };
  };

  try {
    const localization = createJSONLocalization({
      locale: "en",
      locales: ["en", "nl"],
      loadDefaultLocale: true,
      aliases: {
        en: ["en", "en-US"],
      },
    });

    const bundle = await localization.provider.loadLocale({ locale: "en-US" });

    assert.deepEqual(bundle, {
      "my-long-string-code": {
        content: "English source copy",
      },
    });
    assert.deepEqual(requestedPaths, ["/assets/locales/en-US.json"]);

    const cachedBundle = await localization.provider.loadLocale({ locale: "en" });
    assert.deepEqual(cachedBundle, bundle);
    assert.deepEqual(requestedPaths, ["/assets/locales/en-US.json"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});