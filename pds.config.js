export const config = {
  //debug: true,
  mode: "live",
  preset: "default",
  // options: {
  //   liquidGlassEffects: true,
  //   backgroundMesh: 1,
  // },
  public: {
    root: "public/assets/",
  },

  static: {
    root: "public/assets/pds/",
  },

  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  log(level, message, ...data) {
    //if (level === 'error') {
    console[level](message, ...data);
    //}
  },
};
