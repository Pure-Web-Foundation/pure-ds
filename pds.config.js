export const config = {
  //debug: true,
  mode: "live",
  preset: "default",
  
  static: {
    root: "public/assets/pds/",
  },

  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  log(level, message, ...data) {
    console[level](message, ...data);
  },
};
