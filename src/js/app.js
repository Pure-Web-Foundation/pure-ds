import "./pds-configurator/pds-configurator";
import { PDS } from "./pds";

// Initialize PDS once at app startup using the new unified shape
await PDS.start({ 
	mode: 'live', 
	preset: "default"	
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
