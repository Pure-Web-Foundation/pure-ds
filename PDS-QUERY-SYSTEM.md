# PDS Query System

The PDS Query System provides intelligent natural language search across the entire design system, including tokens, components, utilities, and patterns.

## Features

- **Smart Intent Detection**: Recognizes what you're asking about (colors, spacing, components, utilities, etc.)
- **Entity Recognition**: Identifies design elements (buttons, inputs, surfaces, etc.)
- **Context-Aware Answers**: Provides specific values, code examples, and CSS variables
- **Integration with AutoComplete**: Works seamlessly with the `#pds-search` input

## Usage

### Programmatic API

```javascript
import { PDS } from './pds.js';

// Ask questions about the design system
const results = await PDS.query("what is the focus border color on inputs?");

// Results array contains:
results.forEach(result => {
  console.log(result.text);        // Human-readable answer
  console.log(result.value);       // CSS variable or class name
  console.log(result.category);    // Type: "Color Token", "Utility Class", etc.
  console.log(result.score);       // Relevance score (0-100)
  console.log(result.code);        // Example code snippet
  console.log(result.cssVar);      // CSS variable usage
  console.log(result.description); // Detailed explanation
});
```

### Example Queries

#### Color Questions
- "what is the focus border color on inputs?"
- "what foreground color should I use on this surface?"
- "button hover color"
- "primary color scale"

#### Utility Questions
- "what are the utility classes for borders?"
- "border gradient effect"
- "flex layout utilities"
- "gap between elements"

#### Component Questions
- "how do I create an icon-only button?"
- "drawer component"
- "tab strip"

#### Layout & Container Questions
- "how can I group stuff in containers?"
- "grid container"
- "card component"

#### Typography & Spacing
- "heading font family"
- "spacing tokens"
- "font weights"

## Integration with AutoComplete

The query system is automatically integrated with the `#pds-search` AutoComplete input in `pds-demo.js`:

```javascript
categories: {
  Query: {
    trigger: (options) => options.search.length >= 2,
    getItems: async (options) => {
      const results = await PDS.query(options.search);
      return results.map(result => ({
        text: result.text,
        id: result.value,
        icon: result.icon,
        category: result.category,
        code: result.code,
        // ... additional metadata
      }));
    }
  }
}
```

## How It Works

### 1. Intent Detection
The system analyzes your query to determine what you're asking about:
- **Color/Surface**: color, foreground, background, text, fill
- **Spacing**: spacing, gap, padding, margin
- **Typography**: font, text, heading, body, weight
- **Border**: border, outline, stroke
- **Utility**: utility, class, helper
- **Component**: component, element, widget
- **Layout**: layout, container, grid, flex

### 2. Entity Recognition
Identifies specific design elements:
- **button**, **input**, **card**, **badge**
- **icon**, **link**, **nav**, **modal**
- **drawer**, **tab**, **toast**, **surface**

### 3. Context Analysis
Detects interaction states and modifiers:
- **hover**, **focus**, **active**, **disabled**

### 4. Result Generation
Queries the PDS runtime object model:
- `PDS.compiled.tokens` - Generated design tokens
- `PDS.ontology.primitives` - Native HTML primitives
- `PDS.ontology.components` - Web components
- `PDS.ontology.utilities` - Utility classes
- `PDS.ontology.layoutPatterns` - Layout patterns

### 5. Scoring & Ranking
Results are scored based on:
- Exact matches: 100 points
- Full query contained: +80 points
- Word overlap: up to +40 points
- Starts with query: +20 points
- Context relevance: variable boost

## Architecture

### Core Files

- **`src/js/pds-core/pds-query.js`**: PDSQuery class with search engine
- **`src/js/pds.js`**: PDS.query() API method
- **`src/js/pds-configurator/pds-demo.js`**: AutoComplete integration

### Query Engine Components

```javascript
class PDSQuery {
  // Keyword dictionaries for intent detection
  intents: {
    color, spacing, typography, border, 
    radius, shadow, component, utility,
    layout, pattern, interaction
  }
  
  // Entity/element keywords
  entities: {
    button, input, card, badge, surface,
    icon, link, nav, modal, drawer, tab, toast
  }
  
  // Core methods
  async search(query)          // Main search entry point
  analyzeQuery(tokens, text)   // Extract intents and entities
  queryColors(context, query)  // Query color tokens
  queryUtilities(context)      // Query utility classes
  queryComponents(context)     // Query components
  queryPatterns(context)       // Query layout patterns
  queryTypography(context)     // Query typography tokens
  querySpacing(context)        // Query spacing tokens
  scoreMatch(query, target)    // Calculate relevance
}
```

## Extending the Query System

### Adding New Intents

```javascript
this.intents.animation = ['animation', 'animate', 'motion', 'transition'];
```

### Adding New Entities

```javascript
this.entities.tooltip = ['tooltip', 'popover', 'hint'];
```

### Adding Custom Query Handlers

```javascript
queryAnimations(context, query) {
  const results = [];
  const compiled = this.pds.compiled;
  
  if (!compiled?.tokens?.transitions) return results;
  
  // Your custom logic here
  
  return results;
}
```

Then call it from the `search()` method:

```javascript
if (context.intents.has('animation')) {
  results.push(...this.queryAnimations(context, normalized));
}
```

## Testing

A test page is available at `/query-test.html` to verify query functionality:

```bash
# Start dev server
npm run dev

# Start HTTP server (in another terminal)
npx http-server public -p 8080

# Open http://localhost:8080/query-test.html
```

## Performance Considerations

- Results are limited to top 10 matches
- Deduplication by value keeps highest score
- Async/await pattern for future extensibility
- Query caching could be added for repeated searches

## Future Enhancements

1. **Fuzzy Matching**: Levenshtein distance for typo tolerance
2. **Query History**: Track common queries for optimization
3. **Semantic Understanding**: ML-based query interpretation
4. **Visual Preview**: Show color swatches, component previews
5. **Multi-language Support**: Translate queries and results
6. **Query Suggestions**: "Did you mean...?" functionality
7. **Related Queries**: "Users also asked..."
8. **Analytics**: Track which queries are most common
