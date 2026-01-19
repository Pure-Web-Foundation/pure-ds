/**
 * Secondary bundle entrypoint for live/configurator tooling.
 * Keeps production pds.js lean; loaded dynamically in live mode only.
 */
export { startLive } from "./pds-core/pds-live.js";
