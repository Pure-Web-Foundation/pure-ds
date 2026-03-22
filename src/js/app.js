import { PDS, msg, str } from "./pds";
import { config } from "../../pds.config.js";
import pkg from "../../package.json";

// Initialize PDS once at app startup using the new unified shape
await PDS.start(config);

document.documentElement.lang = "en";

const rawRepoUrl =
  typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
const repoUrl = rawRepoUrl
  ? rawRepoUrl.replace(/^git\+/, "").replace(/\.git$/, "")
  : "";
const homepageUrl = pkg.homepage || repoUrl;
const issuesUrl = pkg.bugs?.url || "";

// ✅ Lit-like ergonomics: appendChild(DocumentFragment) with bindings
document.body.appendChild(PDS.html`
	<div class="container text-center">
		<img src="/assets/img/pds-logo.svg" alt="PDS Logo" title="${msg("PDS Logo")}" width="64" height="64" />
		<header class="container section">
			<h1 @click=${() => PDS.toast("Hallo")}>
				${pkg.name} ${msg(str`version ${pkg.version}`)}
			</h1>
			<small class="text-muted">${msg(pkg.description)}</small>				
		</header>
	</div>
`);
