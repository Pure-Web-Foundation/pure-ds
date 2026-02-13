# Logging Customization

PDS now supports customizable logging through the config object's `log()` method. This allows consumers to control how and when logging occurs throughout the design system.

## Default Behavior

By default, the `log()` method:
- Always logs `error` and `warn` messages
- Only logs `log`, `debug`, and `info` messages when `debug: true` in the config
- Uses standard `console` methods

## Customizing Logging

You can override the `log()` method at the root level of your config to customize logging behavior:

### Example 1: Custom Logger Integration

```javascript
import PDS from 'pure-ds';

await PDS.start({
  mode: 'live',
  preset: 'ocean-breeze',
  design: {
    debug: true,
  },
  
  // Override the log method at root level to use your custom logger
  log(level, message, ...data) {
    // Use your logging library (e.g., winston, pino, etc.)
    myLogger[level]({ 
      module: 'pure-ds',
      message,
      data 
    });
  }
});
```

### Example 2: Silent Mode (Disable All Logging)

```javascript
await PDS.start({
  mode: 'live',
  preset: 'paper-and-ink',
  
  // Override to suppress all logging
  log() {
    // Do nothing - silent mode
  }
});
```

### Example 3: Filtered Logging

```javascript
await PDS.start({
  mode: 'live',
  preset: 'midnight-steel',
  
  // Only log errors to console, send everything else to remote service
  log(level, message, ...data) {
    if (level === 'error') {
      console.error(message, ...data);
    }
    
    // Send all logs to remote monitoring service
    sendToMonitoring({
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }
});
```

### Example 4: Development vs Production

```javascript
const isProduction = process.env.NODE_ENV === 'production';

await PDS.start({
  mode: 'live',
  preset: 'neural-glow',
  design: {
    debug: !isProduction,
  },
  
  log(level, message, ...data) {
    if (isProduction) {
      // In production: only log errors, send to error tracking service
      if (level === 'error') {
        errorTracker.captureException(new Error(message), { data });
      }
    } else {
      // In development: use console with custom formatting
      const emoji = {
        error: '❌',
        warn: '⚠️',
        log: '📝',
        debug: '🐛',
        info: 'ℹ️'
      }[level] || '📌';
      
      console[level](`${emoji} [PDS]`, message, ...data);
    }
  }
});
```

## Log Levels

The `log()` method receives these log levels:
- `'error'` - Critical errors (always logged by default)
- `'warn'` - Warnings about potential issues (always logged by default)
- `'log'` - General informational messages (only when debug: true)
- `'debug'` - Debug information (only when debug: true)
- `'info'` - Informational messages (only when debug: true)

## Scope of Logging

The custom `log()` method is used throughout:
- `pds-generator.js` - Design system generation and CSS output
- `pds-registry.js` - Live/static mode management
- `pds.js` - Main PDS runtime and initialization
- Core system components and utilities

**Note:** Some utility functions (like `font-loader.js`, `msg.js`) still use direct `console` calls as they don't have access to the config object and are meant for developer tooling/debugging.

## TypeScript Support

If you're using TypeScript, the log method signature is:

```typescript
log(level: 'log' | 'warn' | 'error' | 'debug' | 'info', message: string, ...data: any[]): void
```
