import { PDS } from "@pure-ds/core";
import { config } from "../../pds.config.js";

await PDS.start(config);

const main = document.querySelector("main");
if (main && !main.querySelector("my-home")) {
  main.innerHTML = "<my-home></my-home>";
}

/**
 * Generates an HTML NodeList by parsing the given HTML string
 * @param {String} html
 * @returns {NodeListOf<ChildNode>} DOM element
 */
const parseHTML = (html) => {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
};

const settingsBtn = parseHTML(
  /*html*/ `<button id="settings-btn" class="icon-only btn-xs btn-outline" aria-label="Settings">
    <pds-icon icon="gear"></pds-icon>
  </button>`,
)[0];

document.body.appendChild(settingsBtn);

const drawer = document.createElement("pds-drawer");
drawer.setAttribute("position", "right");

drawer.innerHTML = /*html*/ `<div slot="drawer-header">Settings</div>
  <div slot="drawer-content"><my-theme></my-theme></div>`;

document.body.appendChild(drawer);

settingsBtn.addEventListener("click", () => {
  drawer.open = true;
});
