/**
 * Convert a raw PDS token object into a Figma-friendly token structure.
 *
 * - Input:  your PDS JSON (colors, spacing, radius, typography, shadows, layout, transitions, zIndex, icons, ...)
 * - Output: deeply equivalent tree where every primitive leaf becomes:
 *           { value: ..., type: "color" | "dimension" | "fontSize" | ... }
 *
 * This targets Figma / Dev Mode / Tokens Studio style where:
 *   - leaf tokens have `value` and `type`
 *   - groups remain nested
 */
export function figmafyTokens(rawTokens) {
  function detectType(path, key, value) {
    const root = path[0];

    // 1) Root-level heuristics
    if (root === "colors") {
      // Treat scheme as mode string, not color
      if (key === "scheme") return "string";
      return "color";
    }

    if (root === "spacing" || root === "radius" || root === "borderWidths") {
      return "dimension";
    }

    if (root === "typography") {
      const group = path[1];
      if (group === "fontFamily") return "fontFamily";
      if (group === "fontSize") return "fontSize";
      if (group === "fontWeight") return "fontWeight";
      if (group === "lineHeight") return "lineHeight";
      return "string";
    }

    if (root === "shadows") {
      return "shadow";
    }

    if (root === "layout") {
      // maxWidth, breakpoints, pageMargin, etc. → dimensions
      return "dimension";
    }

    if (root === "transitions") {
      // e.g. "90ms"
      return "duration";
    }

    if (root === "zIndex") {
      // dropdown, modal, etc.
      return "number";
    }

    if (root === "icons") {
      // defaultSize & sizes.* are dimensions, the rest config strings
      if (key === "defaultSize" || path.includes("sizes")) {
        return "dimension";
      }
      return "string";
    }

    // 2) Generic heuristics (fallbacks)
    if (typeof value === "number") {
      return "number";
    }

    if (typeof value === "string") {
      // duration: "150ms"
      if (/^\d+(\.\d+)?ms$/.test(value)) return "duration";

      // dimension: "16px", "1.5rem", "100%", etc.
      if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value)) return "dimension";

      // color: hex, rgb/rgba/hsl/hsla/oklab/etc.
      if (
        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value) ||
        /^(rgb|rgba|hsl|hsla|oklab|lab)\(/.test(value)
      ) {
        return "color";
      }
    }

    // If we don't know, leave it typeless so tools can decide
    return undefined;
  }

  function isPlainObject(x) {
    return x !== null && typeof x === "object" && !Array.isArray(x);
  }

  function walk(node, path = []) {
    if (node == null) return node;

    // Arrays: map recursively (rare in your current structure, but safe)
    if (Array.isArray(node)) {
      return node.map((item, index) => walk(item, path.concat(String(index))));
    }

    // Objects: either a nested group or already a token
    if (isPlainObject(node)) {
      // If it already looks like a token leaf, keep it as-is
      if (
        Object.prototype.hasOwnProperty.call(node, "value") &&
        (Object.prototype.hasOwnProperty.call(node, "type") ||
          Object.keys(node).length === 1)
      ) {
        return node;
      }

      const result = {};
      for (const [key, value] of Object.entries(node)) {
        result[key] = walk(value, path.concat(key));
      }
      return result;
    }

    // Primitive leaf → convert to { value, type? }
    const key = path[path.length - 1] ?? "";
    const type = detectType(path, key, node);

    let value = node;

    // Normalize numbers for zIndex & other numeric tokens
    if (type === "number" && typeof value === "string") {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        value = num;
      }
    }

    // Return leaf token
    if (type) {
      return { value, type };
    }
    return { value };
  }

  return walk(rawTokens, []);
}

/*
Usage example:

import { figmafyTokens } from './figmafyTokens.mjs';
import rawPdsTokens from './design-tokens.pds.json' assert { type: 'json' };

const figmaTokens = figmafyTokens(rawPdsTokens);

// Now:
/// - write figmaTokens to design-tokens.figma.json
/// - or feed it directly to Tokens Studio / Figma Dev Mode tooling.
*/
