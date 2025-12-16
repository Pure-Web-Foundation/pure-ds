import "../../packages/pds-configurator/src/pds-configurator.js";
import { PDS } from "./pds";
import { config } from "../../pds.config.js"

// Initialize PDS once at app startup using the new unified shape
await PDS.start(config);

document.body.innerHTML = /*html*/ `
		<header>
			<pds-toaster id="global-toaster"></pds-toaster>
		</header>
		
		<main>
      <pds-configurator></pds-configurator>
    </main>
    <pds-drawer id="global-drawer" position="bottom"></pds-drawer>
`
