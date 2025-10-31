import "./pure-app";
import "./pds-configurator/pds-configurator";
import { PDS } from "./pds";
import { config } from "./config";

// Initialize PDS once at app startup for this project as well
await PDS.live(config.design, {
	autoDefineBaseURL: config.autoDefine?.baseURL,
	autoDefinePreload: config.autoDefine?.predefine || ["pds-icon"],
	autoDefineMapper: config.autoDefine?.mapper,
	enhancers: config.autoDefine?.enhancers,
	applyGlobalStyles: true,
	manageTheme: true,
	themeStorageKey: "pure-ds-theme",
	preloadStyles: false,
});

// Expose PDS on window for easy dev console access (optional)
if (typeof window !== "undefined") {
	// @ts-ignore
	window.PDS = PDS;
}