const isLocal = ["127.0.0.1", "localhost"].includes(window.location.hostname);

/**
 * Checks whether a given value is not a string and contains the property 'strTag'.
 *
 * This function evaluates the input `val` to determine if it is of a type
 * other than string and also verifies the existence of a property named 'strTag'
 * within the value.
 *
 * @param {*} val - The value to be checked.
 * @returns {boolean} True if the value is not a string and has the 'strTag' property, false otherwise.
 */
const isStrTagged = (val) => typeof val !== "string" && "strTag" in val;

/**
 * Concatenates an array of strings into a single string, inserting placeholders
 * between elements of the array based on their index position.
 *
 * @param {string[]} strings - An array of strings to be collated.
 * @return {string} A single string consisting of the input strings concatenated with index-based placeholders.
 */
function collateStrings(strings) {
  let s = "";
  for (let i = 0; i <= strings.length - 1; i++) {
    s += strings[i];
    if (i < strings.length - 1) s += `{${i}}`;
  }
  return s;
}

/**
 * Replaces placeholders in the input string with values provided by the callback function.
 * Placeholders are in the format `{n}` where `n` is a numeric index.
 *
 * @param {string} str - The input string containing placeholders to replace.
 * @param {function} callback - A function that takes an index as a parameter
 * and returns the replacement value for the placeholder.
 * @return {string} The string with placeholders replaced by the corresponding values.
 */
function replacePlaceholders(str, callback) {
  return str.replace(/\{(\d+)\}/g, (match, index) => callback(index));
}

/**
 * Render the result of a `str` tagged template to a string. Note we don't need
 * to do this for Lit templates, since Lit itself handles rendering.
 */
export const joinStringsAndValues = (strings, values, options) => {
  const matchString = collateStrings(strings);
  const tra = getTrans(matchString, options);
  return replacePlaceholders(tra, (index) => {
    return values[index];
  });
};

/**
 * Retrieves a translated string or provides fallback behavior.
 *
 * @param {string} t - The key of the string to be translated.
 * @param {Object} [options] - Additional options for translation.
 * @param {string} [options.desc] - A description of the string being translated, used for debugging purposes.
 * @return {string} The translated string if found, or the key itself as a fallback. If debugging is enabled, returns a debug string.
 */
function getTrans(t, options = {}) {
  window.__strings = window.__strings ?? {};
  const tra = window.__strings[t]?.content;

  if (!tra && isLocal) {
    // eslint-disable-next-line no-console
    console.log("🌐", t, options.desc ? `(${options.desc})` : ``);
  }
  if (window.env?.DEBUG_TRANSLATIONS) return `__${tra ?? t}`;
  return tra ?? t;
}

/**
 * Processes and transforms a given template into a string based on provided options.
 * Accepts a tagged template or a string identifier and performs appropriate operations
 * to return the resultant string.
 *
 * @param {Template | string | StrResult} template - The input template, which can be a tagged template or a string
 * @param {Object} options
 **/
export const msg = (template, options = {}) => {
  if (!template) return "";

  return isStrTagged(template)
    ? joinStringsAndValues(template.strings, template.values, options)
    : getTrans(template, options);
};
