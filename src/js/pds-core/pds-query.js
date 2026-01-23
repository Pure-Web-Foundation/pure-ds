/**
 * PDSQuery - Smart query engine for the Pure Design System
 * 
 * Interprets natural language questions and maps them to PDS runtime data
 * structures (tokens, components, utilities, patterns) using keyword matching,
 * intent detection, and semantic scoring.
 * 
 * @example
 * const query = new PDSQuery(PDS);
 * const results = await query.search("what is the focus border color on inputs?");
 * // Returns array of scored results with text, value, icon, category
 */

export class PDSQuery {
  constructor(pds) {
    this.pds = pds;
    
    // Keyword dictionaries for intent detection
    this.intents = {
      color: ['color', 'colours', 'shade', 'tint', 'hue', 'foreground', 'background', 'text', 'fill', 'bg', 'fg'],
      spacing: ['spacing', 'space', 'gap', 'padding', 'margin', 'distance', 'rhythm'],
      typography: ['font', 'text', 'type', 'typography', 'heading', 'body', 'size', 'weight', 'family'],
      border: ['border', 'outline', 'stroke', 'edge', 'frame'],
      radius: ['radius', 'rounded', 'corner', 'curve', 'round'],
      shadow: ['shadow', 'elevation', 'depth', 'glow', 'drop-shadow'],
      component: ['component', 'element', 'widget'],
      utility: ['utility', 'class', 'helper', 'css'],
      layout: ['layout', 'container', 'grid', 'flex', 'group', 'arrange', 'organize'],
      pattern: ['pattern', 'example', 'template', 'structure'],
      interaction: ['hover', 'focus', 'active', 'disabled', 'pressed', 'selected', 'checked'],
    };

    // Entity/element keywords
    this.entities = {
      button: ['button', 'btn', 'cta'],
      input: ['input', 'field', 'textbox', 'text-field', 'form-control'],
      card: ['card', 'panel'],
      badge: ['badge', 'pill', 'tag', 'chip'],
      surface: ['surface', 'background', 'layer', 'container'],
      icon: ['icon', 'svg', 'glyph', 'symbol'],
      link: ['link', 'anchor', 'hyperlink'],
      nav: ['nav', 'navigation', 'menu'],
      modal: ['modal', 'dialog', 'popup', 'overlay'],
      drawer: ['drawer', 'sidebar', 'panel'],
      tab: ['tab', 'tabstrip'],
      toast: ['toast', 'notification', 'callout', 'message', 'alert'],
    };

    // Question patterns
    this.questionWords = ['what', 'which', 'how', 'where', 'when', 'show', 'find', 'get', 'give', 'tell'];
  }

  /**
   * Main search entry point
   * @param {string} query - Natural language question
   * @returns {Promise<Array>} Array of results with text, value, icon, category, score
   */
  async search(query) {
    if (!query || query.length < 2) return [];

    const normalized = query.toLowerCase().trim();
    const tokens = this.tokenize(normalized);
    
    // Detect intent and entities from query
    const context = this.analyzeQuery(tokens, normalized);
    
    // Generate results from multiple strategies
    const results = [];
    
    // Strategy 1: Direct token/color queries
    if (context.intents.has('color')) {
      results.push(...this.queryColors(context, normalized));
    }

    // Strategy 2: Utility class queries
    if (context.intents.has('utility') || context.intents.has('border') || 
        context.intents.has('layout') || normalized.includes('class')) {
      results.push(...this.queryUtilities(context, normalized));
    }

    // Strategy 3: Component queries
    if (context.intents.has('component') || context.entities.size > 0) {
      results.push(...this.queryComponents(context, normalized));
    }

    // Strategy 4: Pattern/layout queries  
    if (context.intents.has('layout') || context.intents.has('pattern')) {
      results.push(...this.queryPatterns(context, normalized));
    }

    // Strategy 5: Typography queries
    if (context.intents.has('typography')) {
      results.push(...this.queryTypography(context, normalized));
    }

    // Strategy 6: Spacing queries
    if (context.intents.has('spacing')) {
      results.push(...this.querySpacing(context, normalized));
    }

    // Deduplicate by value, keeping highest score
    const seen = new Map();
    for (const result of results) {
      const key = result.value;
      if (!seen.has(key) || seen.get(key).score < result.score) {
        seen.set(key, result);
      }
    }

    // Sort by score descending, limit to top 10
    return Array.from(seen.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  /**
   * Tokenize and normalize query string
   */
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[?!.]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 0);
  }

  /**
   * Analyze query to extract intents and entities
   */
  analyzeQuery(tokens, fullText) {
    const context = {
      intents: new Set(),
      entities: new Set(),
      modifiers: new Set(),
      isQuestion: false,
      tokens,
      fullText
    };

    // Check if it's a question
    context.isQuestion = this.questionWords.some(qw => tokens.includes(qw));

    // Match intents
    for (const [intent, keywords] of Object.entries(this.intents)) {
      if (keywords.some(kw => tokens.includes(kw) || fullText.includes(kw))) {
        context.intents.add(intent);
      }
    }

    // Match entities
    for (const [entity, keywords] of Object.entries(this.entities)) {
      if (keywords.some(kw => tokens.includes(kw) || fullText.includes(kw))) {
        context.entities.add(entity);
      }
    }

    // Extract interaction modifiers
    if (tokens.includes('hover') || fullText.includes('hover')) context.modifiers.add('hover');
    if (tokens.includes('focus') || fullText.includes('focus')) context.modifiers.add('focus');
    if (tokens.includes('active') || fullText.includes('active')) context.modifiers.add('active');
    if (tokens.includes('disabled') || fullText.includes('disabled')) context.modifiers.add('disabled');

    return context;
  }

  /**
   * Query color tokens and surfaces
   */
  queryColors(context, query) {
    const results = [];
    const compiled = this.pds.compiled;
    
    if (!compiled?.tokens?.colors) return results;

    const colors = compiled.tokens.colors;
    const entities = Array.from(context.entities);
    const modifiers = Array.from(context.modifiers);

    // Specific color + element queries: "focus border color on inputs"
    if (modifiers.includes('focus') && context.intents.has('border') && entities.includes('input')) {
      results.push({
        text: 'Focus border color: var(--color-primary-500)',
        value: '--color-primary-500',
        icon: 'palette',
        category: 'Color Token',
        score: 100,
        cssVar: 'var(--color-primary-500)',
        description: 'Primary color used for focus states on form inputs'
      });
    }

    // Foreground on surface queries
    if ((query.includes('foreground') || query.includes('text')) && 
        (query.includes('surface') || context.entities.has('surface'))) {
      results.push({
        text: 'Text on surface: var(--surface-text)',
        value: '--surface-text',
        icon: 'palette',
        category: 'Surface Token',
        score: 95,
        cssVar: 'var(--surface-text)',
        description: 'Default text color for current surface'
      });
      results.push({
        text: 'Secondary text: var(--surface-text-secondary)',
        value: '--surface-text-secondary',
        icon: 'palette',
        category: 'Surface Token',
        score: 90,
        cssVar: 'var(--surface-text-secondary)',
        description: 'Secondary/muted text on surface'
      });
    }

    // Generic color scale queries
    if (query.includes('primary') || query.includes('accent') || query.includes('secondary')) {
      const scale = query.includes('primary') ? 'primary' : 
                   query.includes('accent') ? 'accent' : 'secondary';
      
      for (const shade of [500, 600, 700]) {
        const varName = `--color-${scale}-${shade}`;
        results.push({
          text: `${scale.charAt(0).toUpperCase() + scale.slice(1)} ${shade}: var(${varName})`,
          value: varName,
          icon: 'palette',
          category: 'Color Scale',
          score: 80 - (shade - 500) / 100,
          cssVar: `var(${varName})`,
          description: `${scale} color scale shade ${shade}`
        });
      }
    }

    // Button color queries
    if (entities.includes('button') && context.intents.has('color')) {
      const modifier = modifiers[0];
      if (modifier) {
        results.push({
          text: `Button ${modifier} fill: var(--${modifier === 'hover' ? 'primary' : 'primary'}-fill-${modifier})`,
          value: `--primary-fill-${modifier}`,
          icon: 'palette',
          category: 'Interactive Token',
          score: 92,
          description: `Button background color in ${modifier} state`
        });
      } else {
        results.push({
          text: 'Button fill: var(--primary-fill)',
          value: '--primary-fill',
          icon: 'palette',
          category: 'Interactive Token',
          score: 88,
          description: 'Default button background color'
        });
      }
    }

    return results;
  }

  /**
   * Query utility classes
   */
  queryUtilities(context, query) {
    const results = [];
    const ontology = this.pds.ontology;

    if (!ontology?.utilities) return results;

    // Flatten utilities object into array of class names
    const utilitiesObj = ontology.utilities;
    const utilities = [];
    for (const category of Object.values(utilitiesObj)) {
      if (typeof category === 'object') {
        for (const value of Object.values(category)) {
          if (Array.isArray(value)) {
            utilities.push(...value);
          }
        }
      }
    }

    // Border utilities
    if (context.intents.has('border')) {
      const borderUtils = utilities.filter(u => 
        u.includes('border') || u.includes('outline')
      );
      
      borderUtils.forEach(util => {
        let score = 80;
        if (query.includes('gradient') && util.includes('gradient')) score = 95;
        if (query.includes('glow') && util.includes('glow')) score = 95;
        
        results.push({
          text: `${util} - Border utility class`,
          value: util,
          icon: 'code',
          category: 'Utility Class',
          score,
          code: `<div class="${util}">...</div>`,
          description: this.describeUtility(util)
        });
      });
    }

    // Layout utilities
    if (context.intents.has('layout')) {
      const layoutUtils = utilities.filter(u =>
        u.includes('flex') || u.includes('grid') || u.includes('items-') || 
        u.includes('justify-') || u.includes('gap-')
      );

      layoutUtils.forEach(util => {
        results.push({
          text: `${util} - Layout utility`,
          value: util,
          icon: 'layout',
          category: 'Utility Class',
          score: 85,
          code: `<div class="${util}">...</div>`,
          description: this.describeUtility(util)
        });
      });
    }

    // Button group utilities
    if (query.includes('group') && context.entities.has('button')) {
      results.push({
        text: '.btn-group - Group buttons together',
        value: '.btn-group',
        icon: 'code',
        category: 'Utility Class',
        score: 90,
        code: `<div class="btn-group">\n  <button class="btn-primary">One</button>\n  <button class="btn-primary">Two</button>\n</div>`,
        description: 'Container for grouped buttons with connected styling'
      });
    }

    return results;
  }

  /**
   * Query components
   */
  queryComponents(context, query) {
    const results = [];
    const ontology = this.pds.ontology;

    if (!ontology?.components && !ontology?.primitives) return results;

    // Search custom components
    if (ontology.components) {
      ontology.components.forEach(comp => {
        const matchScore = this.scoreMatch(query, comp.name + ' ' + comp.id);
        if (matchScore > 50) {
          results.push({
            text: `<${comp.id}> - ${comp.name}`,
            value: comp.id,
            icon: 'brackets-curly',
            category: 'Web Component',
            score: matchScore,
            code: `<${comp.id}></${comp.id}>`,
            description: comp.description || `${comp.name} web component`
          });
        }
      });
    }

    // Search primitives (native HTML elements with PDS styling)
    if (ontology.primitives) {
      ontology.primitives.forEach(prim => {
        const matchScore = this.scoreMatch(query, prim.name + ' ' + prim.id);
        if (matchScore > 50) {
          const selector = prim.selectors?.[0] || prim.id;
          results.push({
            text: `${selector} - ${prim.name}`,
            value: prim.id,
            icon: 'tag',
            category: 'Primitive',
            score: matchScore - 5,
            code: this.generatePrimitiveExample(prim),
            description: prim.description || `${prim.name} primitive element`
          });
        }
      });
    }

    // Icon-specific queries
    if (query.includes('icon') && (query.includes('only') || query.includes('button'))) {
      results.push({
        text: 'Icon-only button: <button class="btn-icon">',
        value: 'btn-icon',
        icon: 'star',
        category: 'Pattern',
        score: 95,
        code: `<button class="btn-icon btn-primary">\n  <pds-icon icon="heart"></pds-icon>\n</button>`,
        description: 'Button with only an icon, no text label'
      });
    }

    return results;
  }

  /**
   * Query layout patterns
   */
  queryPatterns(context, query) {
    const results = [];
    const ontology = this.pds.ontology;

    if (!ontology?.layoutPatterns) return results;

    ontology.layoutPatterns.forEach(pattern => {
      const matchScore = this.scoreMatch(query, pattern.name + ' ' + pattern.id + ' ' + (pattern.description || ''));
      if (matchScore > 50) {
        const selector = pattern.selectors?.[0] || `.${pattern.id}`;
        results.push({
          text: `${pattern.name} - ${pattern.description || 'Layout pattern'}`,
          value: pattern.id,
          icon: 'layout',
          category: 'Layout Pattern',
          score: matchScore,
          code: `<div class="${selector.replace('.', '')}">\n  <!-- content -->\n</div>`,
          description: pattern.description || pattern.name
        });
      }
    });

    // Container queries
    if (query.includes('container') || query.includes('group')) {
      results.push({
        text: 'Card - Container for grouping content',
        value: 'card',
        icon: 'layout',
        category: 'Primitive',
        score: 88,
        code: `<article class="card">\n  <header>\n    <h3>Title</h3>\n  </header>\n  <p>Content...</p>\n</article>`,
        description: 'Card container with optional header, body, and footer'
      });

      results.push({
        text: 'Section - Semantic container for grouping',
        value: 'section',
        icon: 'layout',
        category: 'Pattern',
        score: 85,
        code: `<section>\n  <h2>Section Title</h2>\n  <!-- content -->\n</section>`,
        description: 'Semantic section element for content grouping'
      });
    }

    return results;
  }

  /**
   * Query typography tokens
   */
  queryTypography(context, query) {
    const results = [];
    const compiled = this.pds.compiled;

    if (!compiled?.tokens?.typography) return results;

    const typo = compiled.tokens.typography;

    if (query.includes('heading') || query.includes('title')) {
      results.push({
        text: 'Heading font: var(--font-family-heading)',
        value: '--font-family-heading',
        icon: 'text-aa',
        category: 'Typography Token',
        score: 85,
        cssVar: 'var(--font-family-heading)',
        description: 'Font family for headings'
      });
    }

    if (query.includes('body') || query.includes('text')) {
      results.push({
        text: 'Body font: var(--font-family-body)',
        value: '--font-family-body',
        icon: 'text-aa',
        category: 'Typography Token',
        score: 85,
        cssVar: 'var(--font-family-body)',
        description: 'Font family for body text'
      });
    }

    return results;
  }

  /**
   * Query spacing tokens
   */
  querySpacing(context, query) {
    const results = [];
    const compiled = this.pds.compiled;

    if (!compiled?.tokens?.spacing) return results;

    const spacing = compiled.tokens.spacing;
    
    // Show common spacing values
    for (const [key, value] of Object.entries(spacing)) {
      if (['2', '4', '6', '8'].includes(key)) {
        results.push({
          text: `Spacing ${key}: var(--spacing-${key})`,
          value: `--spacing-${key}`,
          icon: 'ruler',
          category: 'Spacing Token',
          score: 75,
          cssVar: `var(--spacing-${key})`,
          description: `Spacing value: ${value}`
        });
      }
    }

    return results;
  }

  /**
   * Calculate match score between query and target text
   */
  scoreMatch(query, target) {
    const queryLower = query.toLowerCase();
    const targetLower = target.toLowerCase();
    
    let score = 0;

    // Exact match
    if (queryLower === targetLower) return 100;

    // Contains full query
    if (targetLower.includes(queryLower)) score += 80;

    // Word overlap
    const queryWords = this.tokenize(queryLower);
    const targetWords = this.tokenize(targetLower);
    const overlap = queryWords.filter(w => targetWords.includes(w)).length;
    score += (overlap / queryWords.length) * 40;

    // Starts with
    if (targetLower.startsWith(queryLower)) score += 20;

    return Math.min(100, score);
  }

  /**
   * Generate example code for a primitive
   */
  generatePrimitiveExample(primitive) {
    const selector = primitive.selectors?.[0] || primitive.id;
    
    if (selector.includes('button') || primitive.id === 'button') {
      return '<button class="btn-primary">Click me</button>';
    }
    if (selector.includes('card') || primitive.id === 'card') {
      return '<article class="card">\n  <h3>Title</h3>\n  <p>Content</p>\n</article>';
    }
    if (selector.includes('badge') || primitive.id === 'badge') {
      return '<span class="badge">New</span>';
    }
    
    return `<${selector}>Content</${selector}>`;
  }

  /**
   * Describe utility class purpose
   */
  describeUtility(utilClass) {
    if (utilClass.includes('border-gradient')) return 'Apply animated gradient border effect';
    if (utilClass.includes('border-glow')) return 'Apply glowing border effect';
    if (utilClass.includes('flex')) return 'Flexbox container utility';
    if (utilClass.includes('grid')) return 'Grid container utility';
    if (utilClass.includes('gap-')) return 'Set gap between flex/grid children';
    if (utilClass.includes('items-')) return 'Align items in flex container';
    if (utilClass.includes('justify-')) return 'Justify content in flex container';
    if (utilClass === '.btn-group') return 'Group buttons with connected styling';
    
    return 'Utility class for styling';
  }
}
