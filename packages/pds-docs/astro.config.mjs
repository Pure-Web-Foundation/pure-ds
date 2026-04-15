import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve monorepo vs installed package root
const ROOT_DIR = path.resolve(__dirname, '../..');

export default defineConfig({
  site: 'https://docs.pure-ds.com',
  integrations: [
    starlight({
      title: 'Pure Design System',
      description: 'Documentation for @pure-ds/core — standards-first, configuration-driven design system.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/pure-design-system/pure-ds' },
      ],
      editLink: {
        baseUrl: 'https://github.com/pure-design-system/pure-ds/edit/main/packages/pds-docs/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started' },
            { label: 'Installation', slug: 'installation' },
            { label: 'Configuration', slug: 'configuration' },
            { label: '🛝 Playground', link: '/playground/' },
          ],
        },
        { label: 'Guides', autogenerate: { directory: 'guides' } },
        { label: 'Tokens', autogenerate: { directory: 'tokens' } },
        { label: 'Primitives', autogenerate: { directory: 'primitives' } },
        { label: 'Enhancements', autogenerate: { directory: 'enhancements' } },
        { label: 'Components', autogenerate: { directory: 'components' } },
      ],
      customCss: ['./src/styles/pds-docs.css'],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '#pds-root': ROOT_DIR,
      },
    },
  },
});
