import { PDS } from "./pds";
import { config } from "../../pds.config.js";
import pkg from "../../package.json";

// Initialize PDS once at app startup using the new unified shape
await PDS.start(config);

const rawRepoUrl =
  typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
const repoUrl = rawRepoUrl
  ? rawRepoUrl.replace(/^git\+/, "").replace(/\.git$/, "")
  : "";
const homepageUrl = pkg.homepage || repoUrl;
const issuesUrl = pkg.bugs?.url || "";

document.body.innerHTML = /*html*/ `
  <pds-toaster id="global-toaster"></pds-toaster>
	
		<div class="container text-center">
				<img src="/assets/img/pds-logo.svg" alt="PDS Logo" width="64" height="64" />
				<header class="container section">
					<h1>${pkg.name} ${pkg.version}</h1>
					<small class="text-muted">${pkg.description}</small>
				</header>
			</div>
`;
