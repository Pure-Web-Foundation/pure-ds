/**
 * Custom Elements Manifest Configuration
 * Generates metadata for all PDS web components
 */
export default {
  globs: ['public/assets/pds/components/pds-*.js'],
  exclude: [],
  outdir: '.',
  dev: false,
  watch: false,
  dependencies: true,
  packagejson: true,
  litelement: true,
  plugins: [
    {
      name: 'exclude-private-members',
      // Remove private fields and methods from the manifest
      moduleLinkPhase({moduleDoc}) {
        moduleDoc.declarations?.forEach(declaration => {
          if (declaration.members) {
            declaration.members = declaration.members.filter(member => {
              // Exclude members marked as private or starting with #
              return member.privacy !== 'private' && !member.name?.startsWith('#');
            });
          }
        });
      },
    },
  ],
};
