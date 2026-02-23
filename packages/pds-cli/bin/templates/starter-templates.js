export function buildStarterPdsConfig() {
  return `const defaultEnhancers = [];

export const config = {
  mode: "static",
  preset: "social-feed",

  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"],

    // Custom component paths
    mapper: (tag) => {
      if (tag.startsWith("my-")) return \`/assets/my/\${tag}.js\`;

      // Return nothing to use PDS default mapping
    },

    enhancers: [
      ...defaultEnhancers,
      {
        selector: ".hero",
        description: "Make PDS border-gradient rotate slowly",
        run: (element) => {
          let angle = 135;
          const speed = 0.5; // degrees per frame (~30 degrees/second at 60fps)

          function animate() {
            angle = (angle + speed) % 360;
            element.style.setProperty("--gradient-angle", \`\${angle}deg\`);
            requestAnimationFrame(animate);
          }

          animate();
        },
      },
    ],
  },

  // Uncomment to override preset design tokens:
  // design: {
  //   colors: {
  //     primary: '#007acc',
  //     secondary: '#5c2d91',
  //     accent: '#ec4899'
  //   },
  //   typography: {
  //     fontFamilyHeadings: 'Inter, sans-serif',
  //     fontFamilyBody: 'Inter, sans-serif',
  //     baseFontSize: 16,
  //     fontScale: 1.25
  //   },
  //   spatialRhythm: {
  //     baseUnit: 8,
  //     scaleRatio: 1.5
  //   }
  // }
  
};
`;
}
