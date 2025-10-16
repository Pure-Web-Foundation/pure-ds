/**
 * Converts config.design structure to JSON Schema for schema-form
 * Flattened structure with dot-notation keys for compatibility
 * @param {Object} design - The design configuration object
 * @returns {Object} JSON Schema
 */

// Recursively convert a config object to JSON Schema

function humanizeKey(key) {
  // Special case for zIndex*
  if (key.startsWith('zIndex')) {
    // e.g. zIndexModal -> Modal
    const label = key.replace(/^zIndex/, '');
    let labelTitle;
    if (label === '') {
      labelTitle = 'Base Z-Index';
    } else {
      labelTitle = label.replace(/([A-Z])/g, ' $1').replace(/^./, m => m.toUpperCase()).trim();
    }
    return {
      title: labelTitle,
      description: labelTitle !== 'Base Z-Index' ? labelTitle + ' hierarchy priority' : 'Z-index stacking context'
    };
  }
  // General: gridColumns -> Grid Columns
  return {
    title: key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, m => m.toUpperCase()),
    description: undefined
  };
}

function configObjectToSchema(obj, key = '', parent = null) {
  // Heuristics for titles
  const titleMap = {
    colors: '🎨 Colors',
    typography: '📝 Typography',
    spatialRhythm: '📏 Spatial Rhythm',
    shape: '⬜ Shape & Borders',
    behavior: '⚡ Behavior & Motion',
    layout: '📐 Layout',
    layers: '🪟 Layers & Shadows',
    advanced: '⚙️ Advanced',
    a11y: '♿ Accessibility',
    components: '🧩 Components',
    icons: '⭐ Icons',
    output: '💾 Output',
    debug: '🐞 Debug',
    autoDefine: '🧬 Auto-Define',
  };

  // If this is a leaf value, guess type and add humanized title
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    let type = typeof obj;
    if (Array.isArray(obj)) type = 'array';
    const { title, description } = humanizeKey(key);
    const base = { default: obj };
    if (type === 'number') return { type: 'number', title, description, ...base };
    if (type === 'boolean') return { type: 'boolean', title, description, ...base };
    if (type === 'string') return { type: 'string', title, description, ...base };
    if (type === 'array') return { type: 'array', title, description, ...base };
    return { type: 'string', title, description, ...base };
  }

  // Otherwise, it's an object
  const properties = {};
  for (const [k, v] of Object.entries(obj)) {
    // Exclude icons.include
    if (key === 'icons' && k === 'include') continue;
    // Special handling for known fields (add enums, formats, etc.)
    if (k === 'primary' && key === 'colors') {
      properties[k] = {
        type: 'string',
        title: 'Primary Brand Color',
        format: 'color',
        default: v
      };
      continue;
    }
    if (k === 'secondary' && key === 'colors') {
      properties[k] = {
        type: 'string',
        title: 'Secondary/Neutral Color',
        format: 'color',
        default: v
      };
      continue;
    }
    if (k === 'accent' && key === 'colors') {
      properties[k] = {
        type: 'string',
        title: 'Accent Color',
        format: 'color',
        default: v
      };
      continue;
    }
    if (k === 'background' && key === 'colors') {
      properties[k] = {
        type: 'string',
        title: 'Background Color',
        format: 'color',
        default: v
      };
      continue;
    }
    // Add more heuristics for enums, etc. as needed
    properties[k] = configObjectToSchema(v, k, obj);
  }
  return {
    type: 'object',
    title: titleMap[key] || humanizeKey(key).title || key,
    properties
  };
}

export function designToSchema(design) {
  return {
    type: 'object',
    title: 'Design System Configuration',
    properties: {
      ...Object.fromEntries(
        Object.entries(design).map(([k, v]) => [k, configObjectToSchema(v, k, design)])
      )
    }
  };
}
