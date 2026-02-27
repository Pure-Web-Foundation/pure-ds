import { PDS } from '#pds';
import { getCurrentTheme, preloadShiki, renderCodeBlock } from './shiki.js';

preloadShiki();

const adoptLayersCode = `import { PDS } from '#pds';

class MyPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const localSheet = PDS.createStylesheet(\`
      :host { display: block; }
      .frame { padding: var(--spacing-md); border-radius: var(--radius-md); }
    \`);

    await PDS.adoptLayers(
      this.shadowRoot,
      ['tokens', 'primitives', 'utilities'],
      [localSheet]
    );

    this.shadowRoot.innerHTML = '<article class="frame surface-raised">Ready</article>';
  }
}`;

const createStylesheetCode = `import { PDS } from '#pds';

const localSheet = PDS.createStylesheet(\`
  :host { display: block; }
  button { margin-block-start: var(--spacing-sm); }
\`);

await PDS.adoptPrimitives(this.shadowRoot, [localSheet]);`;

const defaultEnhancersCode = `import { PDS } from '@pure-ds/core';

const defaultEnhancers = Array.isArray(PDS.defaultEnhancers)
  ? PDS.defaultEnhancers
  : [];

const addTelemetry = {
  selector: '[data-track-click]',
  enhance(node) {
    node.addEventListener('click', () => {
      console.log('tracked click', node.dataset.trackClick);
    });
  }
};

export const config = {
  mode: 'static',
  enhancers: [...defaultEnhancers, addTelemetry]
};`;

const compiledCode = `await PDS.start({ mode: 'static', preset: 'default' });

console.log(PDS.compiled);
console.log(PDS.compiled.design.colors);`;

const resolveEnhancerMetadata = async () => {
  if (Array.isArray(PDS.enhancerMetadata) && PDS.enhancerMetadata.length > 0) {
    return PDS.enhancerMetadata;
  }

  const candidates = [
    '/assets/pds/core/pds-enhancers-meta.js',
  ];

  for (const moduleURL of candidates) {
    try {
      const mod = await import(moduleURL);
      const metadata = Array.isArray(mod?.defaultPDSEnhancerMetadata)
        ? mod.defaultPDSEnhancerMetadata
        : [];
      if (metadata.length) {
        return metadata;
      }
    } catch (_error) {
      // try next candidate
    }
  }

  return Array.isArray(PDS.enhancerMetadata) ? PDS.enhancerMetadata : [];
};

const resolveDefaultEnhancers = async () => {
  if (Array.isArray(PDS.defaultEnhancers) && PDS.defaultEnhancers.length > 0) {
    return PDS.defaultEnhancers;
  }

  const candidates = [
    PDS?.currentConfig?.enhancersURL,
    '/assets/pds/core/pds-enhancers.js',
  ].filter(Boolean);

  for (const moduleURL of candidates) {
    try {
      const mod = await import(moduleURL);
      const enhancers = Array.isArray(mod?.defaultPDSEnhancers) ? mod.defaultPDSEnhancers : [];
      if (enhancers.length) {
        PDS.defaultEnhancers = enhancers;
        return enhancers;
      }
    } catch (_error) {
      // try next candidate
    }
  }

  return Array.isArray(PDS.defaultEnhancers) ? PDS.defaultEnhancers : [];
};

const resolveEnhancerRows = async () => {
  const [enhancers, metadata] = await Promise.all([
    resolveDefaultEnhancers(),
    resolveEnhancerMetadata(),
  ]);

  const metadataBySelector = new Map(
    (Array.isArray(metadata) ? metadata : [])
      .filter((entry) => entry?.selector)
      .map((entry) => [entry.selector, entry])
  );

  const mergedFromEnhancers = (Array.isArray(enhancers) ? enhancers : []).map((enhancer) => {
    const selector = enhancer?.selector || null;
    const meta = selector ? metadataBySelector.get(selector) : null;
    return {
      ...meta,
      ...enhancer,
      selector: selector || meta?.selector || '—',
      description: enhancer?.description || meta?.description || '—',
      demoHtml: enhancer?.demoHtml || enhancer?.demoHTML || meta?.demoHtml || meta?.demoHTML || '',
    };
  });

  if (mergedFromEnhancers.length > 0) {
    return mergedFromEnhancers;
  }

  return (Array.isArray(metadata) ? metadata : []).map((entry) => ({
    ...entry,
    selector: entry?.selector || '—',
    description: entry?.description || '—',
    demoHtml: entry?.demoHtml || entry?.demoHTML || '',
  }));
};

const formatJSON = (value, fallback = 'No value available.') => {
  if (value == null) return fallback;
  try {
    const asString = JSON.stringify(value, null, 2);
    if (asString.length > 6000) {
      return `${asString.slice(0, 6000)}\n…truncated`;
    }
    return asString;
  } catch (error) {
    return String(value);
  }
};

const escapeHTML = (value) => {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const renderCardHeader = (title, description) => {
  return `
    <header>
      <h3>${title}</h3>
      <small class="text-muted">${description}</small>
    </header>
  `;
};

const makeCard = ({
  title,
  description,
  code,
  outputLabel = 'Runtime output',
  initialOutput,
  buttonLabel,
  onRun,
  maxWidth = 'max-w-2xl'
}) => {
  const section = document.createElement('section');
  section.className = `card stack-md ${maxWidth}`;
  section.innerHTML = `
    ${renderCardHeader(title, description)}
    <div>
      <strong>Example</strong>
      <div data-code-host>Loading code sample…</div>
    </div>
    <div class="stack-sm">
      <strong>${outputLabel}</strong>
      <pre class="text-sm" data-output>${initialOutput || 'Click to inspect.'}</pre>
    </div>
    ${buttonLabel ? `<button class="btn btn-outline" type="button" data-run>${buttonLabel}</button>` : ''}
  `;

  const theme = getCurrentTheme();
  const codeHost = section.querySelector('[data-code-host]');
  renderCodeBlock(codeHost, code, 'javascript', theme);

  if (buttonLabel && typeof onRun === 'function') {
    const output = section.querySelector('[data-output]');
    const run = section.querySelector('[data-run]');
    run?.addEventListener('click', async () => {
      run.disabled = true;
      try {
        const nextOutput = await onRun();
        if (output) {
          output.textContent = typeof nextOutput === 'string' ? nextOutput : formatJSON(nextOutput);
        }
      } catch (error) {
        if (output) {
          output.textContent = `Error: ${error?.message || String(error)}`;
        }
      } finally {
        run.disabled = false;
      }
    });
  }

  return section;
};

export default {
  title: 'PDS/PDS Object',
  tags: ['runtime', 'api', 'utilities', 'reference', 'pds-object'],
  parameters: {
    pds: {
      tags: ['runtime', 'api', 'reference', 'pds-compiled', 'pds-enums']
    },
    docs: {
      disable: true,
      description: {
        component: 'Reference examples for additional PDS runtime properties and methods.'
      }
    }
  }
};

export const PDSCompiled = {
  name: 'PDS.compiled (merged config)',
  render: () => {
    const section = document.createElement('section');
    section.className = 'card stack-md max-w-4xl';
    section.innerHTML = `
      ${renderCardHeader('PDS.compiled', 'Merged runtime config rendered as an interactive tree (no click required).')}
      <div class="stack-sm">
        <strong>Compiled config tree</strong>
        <small class="text-muted" data-compiled-status>Loading compiled config…</small>
        <pds-treeview data-compiled-tree></pds-treeview>
      </div>
      <div>
        <strong>Example</strong>
        <div data-code-host>Loading code sample…</div>
      </div>
    `;

    const theme = getCurrentTheme();
    const codeHost = section.querySelector('[data-code-host]');
    renderCodeBlock(codeHost, compiledCode, 'javascript', theme);

    const tree = section.querySelector('[data-compiled-tree]');
    const status = section.querySelector('[data-compiled-status]');

    const formatLeafValue = (value) => {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (typeof value === 'string') {
        return value.length > 80 ? `${value.slice(0, 80)}…` : value;
      }
      if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
        return String(value);
      }
      return formatJSON(value);
    };

    const valueToNodes = (value, baseId) => {
      if (Array.isArray(value)) {
        return value.map((item, index) => {
          const nodeId = `${baseId}-${index}`;
          if (item && typeof item === 'object') {
            const nested = valueToNodes(item, nodeId);
            return nested.length
              ? { id: nodeId, text: `[${index}]`, children: nested }
              : { id: `${nodeId}-empty`, text: `[${index}]: {}` };
          }
          return {
            id: `${nodeId}-leaf`,
            text: `[${index}]: ${formatLeafValue(item)}`,
            value: item,
          };
        });
      }

      if (value && typeof value === 'object') {
        return Object.entries(value).map(([key, nextValue]) => {
          const nodeId = `${baseId}-${key}`;
          if (nextValue && typeof nextValue === 'object') {
            const nested = valueToNodes(nextValue, nodeId);
            return nested.length
              ? { id: nodeId, text: key, children: nested }
              : { id: `${nodeId}-empty`, text: `${key}: {}` };
          }

          return {
            id: `${nodeId}-leaf`,
            text: `${key}: ${formatLeafValue(nextValue)}`,
            value: nextValue,
          };
        });
      }

      return [];
    };

    const applyLabelTemplate = (labelTemplate) => {
      const root = tree?.shadowRoot;
      if (!root || typeof labelTemplate !== 'function') return;

      const labels = root.querySelectorAll('.tv-label');
      labels.forEach((label) => {
        if (!(label instanceof HTMLElement)) return;
        if (label.classList.contains('tv-label-link')) return;

        const raw = (label.textContent || '').trim();
        if (!raw || label.dataset.labelRaw === raw) return;

        const separatorIndex = raw.indexOf(': ');
        if (separatorIndex <= 0) return;

        const name = raw.slice(0, separatorIndex).trim();
        const value = raw.slice(separatorIndex + 2).trim();
        if (!name || !value) return;

        const rendered = labelTemplate({ name, value, raw, label, tree });
        if (!rendered) return;

        label.replaceChildren();
        if (Array.isArray(rendered)) {
          label.append(...rendered);
        } else {
          label.append(rendered);
        }
        label.dataset.labelRaw = raw;
      });
    };

    const buildTreeOptions = () => {
      const rootId = 'pds-compiled-root';
      const compiled = PDS.compiled;

      if (!compiled) {
        return {
          source: [{ id: rootId, text: 'PDS.compiled is null (waiting for PDS.start())' }],
          defaultExpanded: [rootId],
          labelTemplate: null,
          ready: false,
        };
      }

      const children = valueToNodes(compiled, rootId);
      const source = [
        {
          id: rootId,
          text: 'PDS.compiled',
          children,
        },
      ];

      const defaultExpanded = [
        rootId,
        ...children.slice(0, 5).map((node) => node.id),
      ];

      const labelTemplate = ({ name, value }) => {
        const nameBadge = document.createElement('span');
        nameBadge.className = 'badge badge-outline';
        nameBadge.textContent = `${name}:`;

        const valueCode = document.createElement('code');
        valueCode.textContent = value;

        return [nameBadge, ' ', valueCode];
      };

      return { source, defaultExpanded, labelTemplate, ready: true };
    };

    const hydrateTree = () => {
      if (!tree) return;
      const options = buildTreeOptions();
      tree.options = options;

      if (status) {
        status.textContent = options.ready
          ? 'Displaying current merged runtime config.'
          : 'PDS.compiled is currently null until startup completes.';
      }

      requestAnimationFrame(() => applyLabelTemplate(options.labelTemplate));
    };

    if (typeof customElements?.whenDefined === 'function') {
      customElements.whenDefined('pds-treeview').then(() => {
        hydrateTree();
      });
    } else {
      hydrateTree();
    }

    tree?.addEventListener('treeview-load', () => {
      requestAnimationFrame(() => applyLabelTemplate(tree.options?.labelTemplate));
    });

    tree?.addEventListener('node-toggle', () => {
      requestAnimationFrame(() => applyLabelTemplate(tree.options?.labelTemplate));
    });

    const onReady = () => {
      hydrateTree();
    };
    PDS.addEventListener('pds:ready', onReady);

    return section;
  }
};

export const PDSDefaultEnhancers = {
  name: 'PDS.defaultEnhancers',
  render: () => {
    
    const section = document.createElement('section');
    section.className = 'card stack-md max-w-3xl';
    section.innerHTML = `
      ${renderCardHeader('PDS.defaultEnhancers', 'Use the shipped enhancer set as a baseline and append your own enhancers in config.')}
      <div>
        <strong>Example</strong>
        <div data-code-host>Loading code sample…</div>
      </div>
      <div>
        <strong>Loaded enhancer selectors</strong>
        <table class="table-bordered">
          <thead>
            <tr>
              <th>Selector</th>
              <th>Description</th>
              <th>demoHTML</th>
            </tr>
          </thead>
          <tbody data-enhancers-body></tbody>
        </table>
      </div>
    `;

    const theme = getCurrentTheme();
    const codeHost = section.querySelector('[data-code-host]');
    renderCodeBlock(codeHost, defaultEnhancersCode, 'javascript', theme);

    const body = section.querySelector('[data-enhancers-body]');
    if (!body) return section;

    body.innerHTML = `
      <tr>
        <td colspan="3"><small class="text-muted">Loading default enhancers…</small></td>
      </tr>
    `;

    const paintEnhancers = async () => {
      const enhancers = await resolveEnhancerRows();

      if (!enhancers.length) {
        body.innerHTML = `
          <tr>
            <td colspan="3"><small class="text-muted">No default enhancers loaded yet.</small></td>
          </tr>
        `;
        return;
      }

      body.innerHTML = enhancers
        .map((enhancer, index) => {
          const selector = enhancer?.selector || '—';
          const description = enhancer?.description || '—';
          return `
            <tr>
              <td><code>${selector}</code></td>
              <td>${escapeHTML(description)}</td>
              <td><div data-demo-code="${index}">Loading demoHTML…</div></td>
            </tr>
          `;
        })
        .join('');

      enhancers.forEach((enhancer, index) => {
        const demoTarget = section.querySelector(`[data-demo-code="${index}"]`);
        if (!demoTarget) return;

        const demoHtml = enhancer?.demoHtml || enhancer?.demoHTML || '';
        if (!demoHtml) {
          demoTarget.innerHTML = '<small class="text-muted">—</small>';
          return;
        }

        renderCodeBlock(demoTarget, String(demoHtml), 'html', theme);
      });
    };

    paintEnhancers();

    const handleReady = () => {
      paintEnhancers();
    };
    PDS.addEventListener('pds:ready', handleReady, { once: true });

    return section;
  }
};

export const PDSAdoptLayers = {
  name: 'PDS.adoptLayers()',
  render: () => {
    return makeCard({
      title: 'PDS.adoptLayers(shadowRoot, layers, additionalSheets)',
      description: 'Adopt selected shared PDS layers plus local constructable stylesheets in one call.',
      code: adoptLayersCode,
      outputLabel: 'Notes',
      initialOutput: 'Use this pattern in custom elements that need tokens/primitives/utilities inside Shadow DOM.',
      maxWidth: 'max-w-3xl'
    });
  }
};

export const PDSCreateStylesheet = {
  name: 'PDS.createStylesheet()',
  render: () => {
    return makeCard({
      title: 'PDS.createStylesheet(css)',
      description: 'Create a constructable stylesheet from CSS text and pass it into adopt helpers.',
      code: createStylesheetCode,
      outputLabel: 'Runtime check',
      initialOutput: 'Click to create a stylesheet and inspect its constructor name.',
      buttonLabel: 'Create test stylesheet',
      onRun: () => {
        const sheet = PDS.createStylesheet(':host { display: block; }');
        return formatJSON({
          constructor: sheet?.constructor?.name,
          replaceSync: typeof sheet?.replaceSync === 'function'
        });
      }
    });
  }
};

export const PDSEnums = {
  name: 'PDS.enums',
  render: () => {
    const section = document.createElement('section');
    section.className = 'card stack-md max-w-3xl';
    section.innerHTML = `
      ${renderCardHeader('PDS.enums', 'Typed enum maps rendered as an interactive tree.')}
      <div class="stack-sm">
        <strong>Enum tree</strong>
        <pds-treeview data-enum-tree></pds-treeview>
      </div>
      <div>
        <strong>Examples (non-treeview)</strong>
        <div data-code-host>Loading code sample…</div>
      </div>
    `;

    const code = `import { PDS } from '#pds';

const iconSize = PDS.enums.IconSizes.lg;          // 32
const fontWeight = PDS.enums.FontWeights.semibold; // 600
const lineHeight = PDS.enums.LineHeights.relaxed;  // 1.75

const typographyPreset = {
  fontWeight,
  lineHeight,
  iconSize,
};

console.log('Typography preset:', typographyPreset);
console.log('Touch target minimum:', PDS.enums.TouchTargetSizes.standard);`;

    const theme = getCurrentTheme();
    const codeHost = section.querySelector('[data-code-host]');
    renderCodeBlock(codeHost, code, 'javascript', theme);

    const tree = section.querySelector('[data-enum-tree]');

    const applyLabelTemplate = (labelTemplate) => {
      const root = tree?.shadowRoot;
      if (!root) return;
      if (typeof labelTemplate !== 'function') return;

      const labels = root.querySelectorAll('.tv-label');
      labels.forEach((label) => {
        if (!(label instanceof HTMLElement)) return;
        if (label.classList.contains('tv-label-link')) return;

        const raw = (label.textContent || '').trim();
        if (!raw || label.dataset.labelRaw === raw) return;
        const separatorIndex = raw.indexOf(': ');
        if (separatorIndex <= 0) return;

        const name = raw.slice(0, separatorIndex).trim();
        const value = raw.slice(separatorIndex + 2).trim();
        if (!name || !value) return;

        const rendered = labelTemplate({ name, value, raw, label, tree });
        if (!rendered) return;

        label.replaceChildren();

        if (Array.isArray(rendered)) {
          label.append(...rendered);
        } else {
          label.append(rendered);
        }

        label.dataset.labelRaw = raw;
      });
    };

    const buildTreeOptions = () => {
      const enumEntries = Object.entries(PDS.enums || {});
      const rootId = 'pds-enums-root';
      const source = [
        {
          id: rootId,
          text: 'PDS.enums',
          children: enumEntries.map(([group, values]) => {
            const groupId = `enum-group-${group}`;
            return {
              id: groupId,
              text: group,
              children: Object.entries(values || {}).map(([key, value]) => ({
                id: `${groupId}-${key}`,
                text: `${key}: ${value}`,
                value,
              })),
            };
          }),
        },
      ];

      const defaultExpanded = [
        rootId,
        ...source[0].children.slice(0, 4).map((node) => node.id),
      ];

      const labelTemplate = ({ name, value }) => {
        const nameBadge = document.createElement('span');
        nameBadge.className = 'badge badge-outline';
        nameBadge.textContent = `${name}:`;

        const valueCode = document.createElement('code');
        valueCode.textContent = value;

        return [nameBadge, ' ', valueCode];
      };

      return { source, defaultExpanded, labelTemplate };
    };

    const hydrateTree = () => {
      if (!tree) return;
      const options = buildTreeOptions();
      tree.options = options;
      requestAnimationFrame(() => applyLabelTemplate(options.labelTemplate));
    };

    if (typeof customElements?.whenDefined === 'function') {
      customElements.whenDefined('pds-treeview').then(() => {
        hydrateTree();
      });
    } else {
      hydrateTree();
    }

    tree?.addEventListener('treeview-load', () => {
      requestAnimationFrame(() => applyLabelTemplate(tree.options?.labelTemplate));
    });

    tree?.addEventListener('node-toggle', () => {
      requestAnimationFrame(() => applyLabelTemplate(tree.options?.labelTemplate));
    });

    return section;
  }
};