/**
 * @module pds-reactive
 * @description A simple reactive state wrapper using JavaScript Proxies.
 * Fires custom events ('change' and 'change:propertyName') when state properties are modified.
 * 
 * @example
 * ```javascript
 * import { html, State } from '#pds';
 * 
 * const state = new State({ count: 0 });
 * 
 * // Listen to all changes
 * state.on('change', (e) => console.log('State changed:', e.detail));
 * 
 * // Listen to specific property changes
 * state.on('change:count', (e) => console.log('Count changed to:', e.detail.value));
 * 
 * // Mutate state naturally
 * state.count++;  // Fires events and updates DOM
 * ```
 */

/**
 * Represents a reactive state container that fires events on property mutations.
 * All modifications trigger custom DOM events that can be used to update the UI.
 * 
 * @class State
 * @template T
 * @param {T} initialValue - The initial state object
 * @param {EventTarget} [eventTarget=document] - Where to dispatch events (defaults to document)
 */
export class State {
  /**
   * Create a reactive state container
   * @param {Object} initialValue - Initial state object
   * @param {EventTarget} [eventTarget] - Optional event target for dispatching events
   */
  constructor(initialValue = {}, eventTarget = null) {
    const source =
      initialValue && typeof initialValue === "object" ? initialValue : {};
    const target =
      eventTarget ||
      (typeof document !== "undefined" ? document : new EventTarget());
    const proxies = new WeakMap();

    const toPath = (parts) => parts.map((part) => String(part)).join(".");
    let rootProxy;

    const dispatchChange = (pathParts, property, value, oldValue) => {
      const path = toPath(pathParts);
      const baseDetail = {
        property,
        path,
        value,
        oldValue,
      };

      target.dispatchEvent(
        new CustomEvent(`change:${path}`, {
          detail: baseDetail,
          bubbles: true,
          composed: true,
        })
      );

      target.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            ...baseDetail,
            state: rootProxy,
          },
          bubbles: true,
          composed: true,
        })
      );
    };

    const on = (event, callback) => {
      if (typeof callback === "function") {
        target.addEventListener(event, callback);
      }
      return rootProxy;
    };

    const off = (event, callback) => {
      if (typeof callback === "function") {
        target.removeEventListener(event, callback);
      }
      return rootProxy;
    };

    const once = (event, callback) => {
      if (typeof callback === "function") {
        const handler = (e) => {
          callback(e);
          target.removeEventListener(event, handler);
        };
        target.addEventListener(event, handler);
      }
      return rootProxy;
    };

    const wrap = (obj, pathParts) => {
      if (!obj || typeof obj !== "object") {
        return obj;
      }

      if (proxies.has(obj)) {
        return proxies.get(obj);
      }

      const proxy = new Proxy(obj, {
        get(currentTarget, prop, receiver) {
          if (prop === "on") return on;
          if (prop === "off") return off;
          if (prop === "once") return once;

          const value = Reflect.get(currentTarget, prop, receiver);
          if (value && typeof value === "object") {
            return wrap(value, [...pathParts, prop]);
          }
          return value;
        },
        set(currentTarget, prop, value, receiver) {
          const oldValue = Reflect.get(currentTarget, prop, receiver);
          if (Object.is(oldValue, value)) {
            return true;
          }

          const didSet = Reflect.set(currentTarget, prop, value, receiver);
          if (!didSet) {
            return false;
          }

          dispatchChange([...pathParts, prop], prop, value, oldValue);
          return true;
        },
        deleteProperty(currentTarget, prop) {
          if (!Reflect.has(currentTarget, prop)) {
            return true;
          }

          const oldValue = currentTarget[prop];
          const didDelete = Reflect.deleteProperty(currentTarget, prop);
          if (!didDelete) {
            return false;
          }

          dispatchChange([...pathParts, prop], prop, undefined, oldValue);
          return true;
        },
      });

      proxies.set(obj, proxy);
      return proxy;
    };

    rootProxy = wrap(source, []);
    return rootProxy;
  }
}

/**
 * Create a stateful component with automatic re-rendering on state changes.
 * Each state mutation will automatically re-render the component.
 * 
 * @param {Object} initialState - Initial state object
 * @param {Function} renderFn - Function that takes state and returns a DOM fragment
 * @param {HTMLElement} container - Container element where the component will be rendered
 * @returns {State} - The reactive state proxy
 * 
 * @example
 * ```javascript
 * import { html, createReactiveComponent } from '#pds';
 * 
 * const state = createReactiveComponent(
 *   { count: 0, saving: false },
 *   (state) => html`
 *     <article class="card">
 *       <h3>Count: ${state.count}</h3>
 *       <button @click=${() => state.count++}>Increment</button>
 *     </article>
 *   `,
 *   document.body
 * );
 * 
 * // Mutations automatically update the DOM
 * state.count++;  // DOM updates instantly
 * ```
 */
export function createReactiveComponent(initialState, renderFn, container) {
  const state = new State(initialState);

  // Initial render
  const render = () => {
    container.replaceChildren();
    const fragment = renderFn(state);
    if (fragment instanceof DocumentFragment) {
      container.appendChild(fragment);
    } else if (fragment instanceof Node) {
      container.appendChild(fragment);
    }
  };

  render();

  // Re-render on any state change
  state.on('change', render);

  return state;
}

/**
 * Bind a state container to an element, auto-updating specific attributes/properties
 * when the state changes. Useful for partial updates without full re-renders.
 * 
 * @param {HTMLElement} element - Element to update
 * @param {State} state - Reactive state container
 * @param {Object} bindings - Map of property names to update handlers
 * @returns {Function} - Cleanup function to remove event listeners
 * 
 * @example
 * ```javascript
 * import { bindState, State } from '#pds';
 * 
 * const state = new State({ count: 0, saving: false });
 * const article = document.querySelector('article');
 * 
 * const unbind = bindState(article, state, {
 *   count: (el, value) => {
 *     el.dataset.saves = value;
 *     el.querySelector('h3').textContent = `Saves: ${value}`;
 *   },
 *   saving: (el, value) => {
 *     const btn = el.querySelector('button');
 *     btn.disabled = value;
 *     btn.textContent = value ? 'Saving...' : 'Save';
 *   }
 * });
 * 
 * // Later cleanup
 * unbind();
 * ```
 */
export function bindState(element, state, bindings) {
  if (!element || !state || typeof bindings !== 'object') {
    return () => {};
  }

  const handlers = {};

  // Set up listeners for each binding
  Object.entries(bindings).forEach(([prop, updateFn]) => {
    handlers[prop] = (e) => {
      if (typeof updateFn === 'function') {
        updateFn(element, e.detail.value, e.detail.oldValue);
      }
    };
    state.on(`change:${prop}`, handlers[prop]);
  });

  // Return cleanup function
  return () => {
    Object.entries(handlers).forEach(([prop, handler]) => {
      state.off(`change:${prop}`, handler);
    });
  };
}
