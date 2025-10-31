import "./pds-configurator/pds-configurator";
import { PDS } from "./pds";
import { config } from "./config";

// Initialize PDS once at app startup for this project as well
await PDS.live(config.design, {
	autoDefineBaseURL: config.autoDefine?.baseURL,
	autoDefinePreload: config.autoDefine?.predefine || ["pds-icon"],
	autoDefineMapper: config.autoDefine?.mapper,
	applyGlobalStyles: true,
	manageTheme: true,
	themeStorageKey: "pure-ds-theme",
	preloadStyles: false,
});

document.body.innerHTML = /*html*/ `
		<header>
			<pds-toaster id="global-toaster"></pds-toaster>
		</header>
		
		<main>
      <pds-configurator></pds-configurator>
    </main>
    <pds-drawer id="global-drawer" position="bottom"></pds-drawer>
`
