export const config = {
  debug: true,
  mode: "live",
  preset: "default",
  // options: {
  //   liquidGlassEffects: true,
  //   backgroundMesh: 1,
  // },
  static: {
    root: "public/assets/pds/",
  },

  log(level, message, ...data) {
    //if (level === 'error') {
    console[level](message, ...data);
    //}
  },
};
