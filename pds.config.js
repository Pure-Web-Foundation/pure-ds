// @ts-check

/** @typedef {import("./src/js/pds-core/pds-config").PDSInitConfig} PDSInitConfig */

/** @type {PDSInitConfig} */
export const config = {
  mode: "live",
  liveEdit: true,
  preset: "default",
  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster", "pds-form"]
  },

  log(level, message, ...data) {
    console[level](message, ...data);
  },
};
