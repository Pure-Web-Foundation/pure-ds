const docsParameters = {
  description: {
    component:
      'Unified runtime API docs for the `PDS` object, including method signatures and startup/config structures.'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/pds-object-docs.js')
    .then(({ createPDSObjectDocsPage }) => {
      docsParameters.page = createPDSObjectDocsPage();
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for PDS object', error);
    });
}

const BASE_TAGS = [
  'autodocs',
  'runtime',
  'api',
  'reference',
  'utilities',
  'pds-object'
];

const BASE_PDS_TAGS = [
  'runtime',
  'api',
  'reference',
  'pds-object',
  'pds-start',
  'pds-compiled',
  'pds-enums',
  'pds-ask',
  'pds-toast',
  'pds-parse',
  'pds-html'
];

export const pdsObjectDocsParameters = docsParameters;
export const pdsObjectBaseTags = BASE_TAGS;
export const pdsObjectBasePdsTags = BASE_PDS_TAGS;
