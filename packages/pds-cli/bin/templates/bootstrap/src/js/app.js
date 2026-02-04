import { PDS } from "@pure-ds/core";
import { config } from "../../pds.config.js";

await PDS.start(config);

const main = document.querySelector("main");
if (main && !main.querySelector("my-home")) {
  main.innerHTML = "<my-home></my-home>";
}

const settingsBtn = PDS.parse(
  /*html*/ `<button id="settings-btn" class="icon-only btn-xs btn-outline" aria-label="Settings">
    <pds-icon icon="gear"></pds-icon>
  </button>`,
)[0];

document.body.appendChild(settingsBtn);

const drawer = document.createElement("pds-drawer");
drawer.setAttribute("position", "right");

drawer.innerHTML = /*html*/ `<div slot="drawer-header">Settings</div>
  <div slot="drawer-content"><pds-theme></pds-theme></div>`;

document.body.appendChild(drawer);

settingsBtn.addEventListener("click", () => {
  drawer.open = true;
});

const THEME_LABELS = new Map([
  ["system", "System"],
  ["light", "Light"],
  ["dark", "Dark"],
]);

PDS.addEventListener("pds:theme:changed", (event) => {
  const { detail } = event ?? {};
  if (detail?.source !== "api") return;
  const theme = detail?.theme;
  if (!theme || typeof PDS.toast !== "function") return;

  const label =
    THEME_LABELS.get(theme) ?? theme.charAt(0).toUpperCase() + theme.slice(1);
  void PDS.toast(`Theme changed to ${label}`, {
    type: "information",
    duration: 2000,
  });
});
