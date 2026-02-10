import { PDS } from "./pds";
import { config } from "../../pds.config.js"
import "../../packages/pds-configurator/src/pds-home.js";

// Initialize PDS once at app startup using the new unified shape
await PDS.start(config);

document.body.innerHTML = /*html*/ `
		<header>
			<pds-toaster id="global-toaster"></pds-toaster>
		</header>
		
		<main>
		<pds-home class="container"></pds-home>
    </main>
    <pds-drawer id="global-drawer" position="bottom"></pds-drawer>
`
