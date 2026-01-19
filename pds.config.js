export const config = {
  mode: "live",
  preset: "default",

  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  log(level, message, ...data) {
    console[level](message, ...data);
  },
};
