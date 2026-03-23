import { PDS, html } from "@pure-ds/core";
import { config } from "../../pds.config.js";

await PDS.start(config);

const main = document.querySelector("main");
if (main && !main.querySelector("my-home")) {
  main.innerHTML = "<my-home></my-home>";
}

const openSettingsDrawer = () => {
  const drawer = document.getElementById("settings-drawer");
  if (drawer) drawer.open = true;
};

document.body.appendChild(html`
  <button
    id="settings-btn"
    class="icon-only btn-xs btn-outline"
    aria-label="Settings"
    @click=${openSettingsDrawer}
  >
    <pds-icon icon="gear"></pds-icon>
  </button>

  <pds-drawer id="settings-drawer" position="right" .open=${false}>
    <div slot="drawer-header">Settings</div>
    <div slot="drawer-content"><pds-theme></pds-theme></div>
  </pds-drawer>
`);



PDS.addEventListener("pds:theme:changed", (event) => {
  const { detail } = event ?? {};
  if (detail?.source !== "api") return;
  const theme = detail?.theme;
    
  void PDS.toast(`Theme changed to ${theme}`, {
    type: "information",
    duration: 2000,
  });
});
