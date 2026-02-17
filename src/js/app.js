import { PDS } from "./pds";
import { config } from "../../pds.config.js";
import pkg from "../../package.json";

// Initialize PDS once at app startup using the new unified shape
await PDS.start(config);

const buildDate = new Date();
const formattedDate = buildDate.toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const rawRepoUrl =
  typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
const repoUrl = rawRepoUrl
  ? rawRepoUrl.replace(/^git\+/, "").replace(/\.git$/, "")
  : "";
const homepageUrl = pkg.homepage || repoUrl;
const issuesUrl = pkg.bugs?.url || "";

document.body.innerHTML = /*html*/ `
	<header class="container section">
		<div class="stack-sm">
			<pds-toaster id="global-toaster"></pds-toaster>
			<div class="flex items-center gap-sm">
				<pds-icon icon="gear" size="lg"></pds-icon>
				<div>
					<h1>Pure Design System</h1>
					<p class="text-muted">${pkg.description}</p>
				</div>
			</div>
			<div class="flex items-center gap-sm">
				<span class="badge badge-primary">${pkg.name}</span>
				<span class="text-muted">Version ${pkg.version}</span>
				<span class="text-muted">Updated ${formattedDate}</span>
			</div>
		</div>
	</header>

	<main class="container section stack-lg">
		<section class="grid grid-auto-md gap-lg">
			<article class="card surface-elevated stack-sm">
				<header class="flex items-center gap-sm">
					<pds-icon icon="floppy-disk"></pds-icon>
					<h2>Package details</h2>
				</header>
				<div class="stack-lg">
					<div class="flex justify-between items-center">
						<span class="text-muted">Package</span>
						<strong>${pkg.name}</strong>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-muted">Version</span>
						<strong>${pkg.version}</strong>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-muted">License</span>
						<strong>${pkg.license}</strong>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-muted">Repository</span>
						<a href="${repoUrl}">GitHub</a>
					</div>
				</div>
			</article>

			<article class="card surface-elevated stack-sm">
				<header>
					
					<h2 flex items-center gap-sm> <pds-icon icon="download"></pds-icon> Install</h2>
					<p class="text-muted">Add the core runtime and assets to your project.</p>
				</header>
				
				<div class="stack-sm">
					<pre><code>npm i ${pkg.name}</code></pre>
					<pre><code>pnpm add ${pkg.name}</code></pre>
				</div>
				<div class="callout callout-info">
					Includes tokens, utilities, and web components from the PDS runtime bundle.
				</div>
			</article>
		</section>

		<section class="grid grid-auto-md gap-lg">
			<article class="card surface-elevated stack-sm">
				<header>
					
					<h2 class="flex items-center gap-sm"><pds-icon icon="tabs"></pds-icon>Project starter</h2>
					 <p class="text-muted">Use the built-in bootstrap script to scaffold a fresh PDS setup.</p>
				</header>
				
				<div class="stack-sm">
					<pre><code>npm run pds:bootstrap</code></pre>
				</div>
				<ul class="stack-sm">
					<li>Copies the runtime assets into your project.</li>
					<li>Creates a starter PDS config and output folders.</li>
					<li>Prepares icons, tokens, and design layers.</li>
				</ul>
			</article>

			<article class="card surface-elevated stack-sm">
				<header class="flex items-center gap-sm">
					<pds-icon icon="link"></pds-icon>
					<h2>Quick links</h2>
				</header>
				<div class="stack-sm">
					<a href="${homepageUrl}">Project homepage</a>
					<a href="${issuesUrl}">Report an issue</a>
					<a href="${repoUrl}">Browse the repo</a>
				</div>
			</article>
		</section>

		<section class="card surface-elevated stack-md">
			<header class="stack-xs">
				<h2 class="flex items-center gap-sm"><pds-icon icon="sliders"></pds-icon>Border width token demo</h2>
				<p class="text-muted">These examples react to <strong>shape.borderWidth</strong> and tokenized border styles.</p>
			</header>
			<div class="grid grid-auto-md gap-lg">
				<article class="stack-sm">
					<h3>Semantic elements</h3>
					<blockquote>
						<p>Blockquote, details, and rules use tokenized border widths.</p>
						<cite>Token-driven rendering</cite>
					</blockquote>
					<details open>
						<summary>Details border</summary>
						<p>Toggle me to confirm border consistency.</p>
					</details>
					<hr data-content="Demo divider">
				</article>

				<article class="stack-sm">
					<h3>Form + utility examples</h3>
					<form class="stack-sm" data-required>
						<label>
							<span>Email</span>
							<input type="email" placeholder="name@example.com" />
						</label>
						<fieldset role="group" class="buttons">
							<legend>Preferences</legend>
							<label><input type="checkbox" checked /> Daily summary</label>
							<label><input type="checkbox" /> Weekly digest</label>
						</fieldset>
					</form>
					<div class="border-gradient-medium card stack-xs">
						<strong>Gradient border utility</strong>
						<span class="text-muted">Uses border-width tokens as well.</span>
					</div>
				</article>
			</div>
		</section>
	</main>
`;
