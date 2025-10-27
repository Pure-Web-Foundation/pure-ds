/// <reference path="./pds.d.ts" />

/**
 * Public PDS runtime object exported to consumers.
 *
 * This object exposes the core runtime building blocks for the Pure Design System.
 * It intentionally provides a small, stable surface area so consuming apps can:
 * - programmatically generate design system artifacts (via `Generator`),
 * - adopt styles into Shadow DOM (via `adoptLayers` / `adoptPrimitives`),
 * - query runtime mode and obtain constructable stylesheets (via `registry`).
 *
 * Common events in the PDS ecosystem (emitted by other packages/components):
 * - `design-updated` — emitted by the designer component when the in-memory design changes (detail: { config }).
 * - `pds-generated` — emitted by the PDS configurator when generation completes (detail: { modules, meta }).
 * - `pds-error` — emitted by the PDS configurator when generation fails (detail: Error).
 *
 * Error handling notes:
 * - Methods that perform dynamic imports (e.g. `adoptLayers` via the registry) may log and return fallbacks
 *   rather than throwing; consumers should check return values (e.g. null) and listen for `pds-error` in UI flows.
 * - `createStylesheet(css)` will throw synchronously if the provided CSS cannot be parsed by the browser's
 *   `CSSStyleSheet.replaceSync()` — callers should guard invalid input or wrap calls in try/catch.
 *
 * @typedef {Object} PDSAPI
 * @property {typeof import("./pds-core/pds-generator.js").Generator} Generator - Generator class to produce design system assets
 * @property {import("./pds-core/pds-registry.js").PDSRegistry} registry - Singleton runtime registry for live/static mode
 * @property {any} ontology - Ontology helpers and metadata for components
 * @property {(shadowRoot: ShadowRoot, layers?: string[], additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptLayers - Adopt multiple layers into a ShadowRoot. May log errors and fallback to additionalSheets when static imports fail.
 * @property {(shadowRoot: ShadowRoot, additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptPrimitives - Adopt primitives layer into a ShadowRoot. Designed as a convenience for components.
 * @property {(css:string) => CSSStyleSheet} createStylesheet - Create a constructable stylesheet from CSS text. @throws {DOMException} on invalid CSS in some browsers.
 * @property {() => boolean} isLiveMode - Returns true when running in live/designer-backed mode
 * @property {(el: Element) => import("./pds-core/pds-ontology.js").ComponentDef | null} findComponentForElement - Helper to find a component definition for a DOM element
 */

/** @type {PDSAPI} 
 * Workspace for the Pure Design System runtime API
*/
const PDS = {};

import {
  Generator,
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
  isLiveMode,
} from "./pds-core/pds-generator.js";
import { registry } from "./pds-core/pds-registry";
import ontology from "./pds-core/pds-ontology";
import { findComponentForElement } from "./pds-core/pds-ontology.js";
import { defaultConfig } from "./pds-core/pds-config.js";
import { enums } from "./pds-core/pds-enums.js";

/** Generator class — use to programmatically create design system assets from a config */
PDS.Generator = Generator;

/** Singleton runtime registry. Use `registry.setDesigner()` to enable live mode or `registry.setStaticMode()` for static assets */
PDS.registry = registry;

/** Ontology and metadata about components and tokens */
PDS.ontology = ontology;

/** Adopt a set of layered stylesheets into a ShadowRoot */
PDS.adoptLayers = adoptLayers;

/** Convenience to adopt only primitives into a ShadowRoot */
PDS.adoptPrimitives = adoptPrimitives;

/** Create a constructable CSSStyleSheet from a CSS string */
PDS.createStylesheet = createStylesheet;

/** Return true when running inside a live/designer-backed environment */
PDS.isLiveMode = isLiveMode;

PDS.enums = enums;

PDS.defaultConfig = defaultConfig;

/** Find a component definition (ontology) for a given DOM element */
PDS.findComponentForElement = findComponentForElement;

Object.freeze(PDS);

export { PDS };
