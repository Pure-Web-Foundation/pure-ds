export const config = {
  mode: "static",
  preset: "default",

  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  log(level, message, ...data) {
    console[level](message, ...data);
  },
};
