import { html } from 'lit';

export default {
  title: 'Enhancements/Interactive States',
  parameters: {
    docs: {
      description: {
        component: 'Interactive states including focus rings, hover effects, and configurable transition speeds. All animations respect user preferences and accessibility settings.'
      }
    }
  }
};

export const FocusStates = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Focus States</h2>
    <p style="margin-bottom: var(--spacing-4);">
      Press <kbd>Tab</kbd> to navigate and see focus rings on interactive elements
    </p>
    
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-3); align-items: center;">
      <button class="btn-primary">Button 1</button>
      <button class="btn-secondary">Button 2</button>
      <button class="btn-outline">Button 3</button>
      <input type="text" placeholder="Focus me" style="max-width: 200px;" />
      <select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <a href="#" onclick="event.preventDefault();">Link Example</a>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Form Controls</h3>
    <div style="max-width: 400px;">
      <label>
        <span>Text Input</span>
        <input type="text" placeholder="Tab to focus" />
      </label>
      
      <label style="margin-top: var(--spacing-3);">
        <span>Textarea</span>
        <textarea rows="3" placeholder="Tab to focus"></textarea>
      </label>

      <fieldset role="group" style="margin-top: var(--spacing-4);">
        <legend>Options</legend>
        <label>
          <input type="checkbox" />
          <span>Checkbox option 1</span>
        </label>
        <label>
          <input type="checkbox" checked />
          <span>Checkbox option 2</span>
        </label>
      </fieldset>

      <fieldset role="radiogroup" style="margin-top: var(--spacing-4);">
        <legend>Choice</legend>
        <label>
          <input type="radio" name="choice" value="a" checked />
          <span>Radio option A</span>
        </label>
        <label>
          <input type="radio" name="choice" value="b" />
          <span>Radio option B</span>
        </label>
      </fieldset>
    </div>
  </div>
`;

FocusStates.storyName = 'Focus States';

export const HoverStates = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Hover States</h2>
    <p style="margin-bottom: var(--spacing-4);">
      Hover over elements to see smooth transitions and state changes
    </p>

    <h3>Buttons</h3>
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-3); margin-bottom: var(--spacing-6);">
      <button class="btn-primary">Hover Me</button>
      <button class="btn-secondary">Hover Me</button>
      <button class="btn-outline">Hover Me</button>
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>

    <h3>Cards</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
      ${Array.from({ length: 3 }, (_, i) => html`
        <div class="card" style="padding: var(--spacing-5); text-align: center; transition: transform var(--transition-normal), box-shadow var(--transition-normal); cursor: pointer;"
             onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'"
             onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
          <pds-icon icon="star" size="xl" class="icon-accent"></pds-icon>
          <h4 style="margin-top: var(--spacing-2);">Card ${i + 1}</h4>
          <p>Hover to lift</p>
        </div>
      `)}
    </div>

    <h3 style="margin-top: var(--spacing-6);">Interactive List</h3>
    <ul style="list-style: none; padding: 0; max-width: 400px;">
      ${Array.from({ length: 4 }, (_, i) => html`
        <li style="padding: var(--spacing-3); border-bottom: 1px solid var(--color-border); transition: background-color var(--transition-fast), padding-left var(--transition-fast); cursor: pointer;"
            onmouseenter="this.style.backgroundColor='var(--color-surface-subtle)'; this.style.paddingLeft='var(--spacing-4)'"
            onmouseleave="this.style.backgroundColor='transparent'; this.style.paddingLeft='var(--spacing-3)'">
          <pds-icon icon="arrow-right" size="sm"></pds-icon>
          List Item ${i + 1}
        </li>
      `)}
    </ul>
  </div>
`;

HoverStates.storyName = 'Hover States';

export const TransitionSpeeds = () => {
  let animating = false;
  
  const triggerAnimation = (speed) => {
    if (animating) return;
    animating = true;
    
    const ball = document.getElementById(`ball-${speed}`);
    if (!ball) return;
    
    ball.style.transition = `transform var(--transition-${speed})`;
    ball.style.transform = 'translateX(250px)';
    
    setTimeout(() => {
      ball.style.transform = 'translateX(0)';
      setTimeout(() => {
        animating = false;
      }, speed === 'fast' ? 150 : speed === 'slow' ? 500 : 250);
    }, speed === 'fast' ? 150 : speed === 'slow' ? 500 : 250);
  };

  return html`
    <div style="padding: var(--spacing-4);">
      <h2>Transition Speeds</h2>
      <p style="margin-bottom: var(--spacing-6);">
        The design system provides three transition speed tokens that can be configured globally.
      </p>

      <div style="display: grid; gap: var(--spacing-6);">
        ${['fast', 'normal', 'slow'].map(speed => html`
          <div>
            <h3>--transition-${speed}</h3>
            <button class="btn-primary btn-sm" @click=${() => triggerAnimation(speed)}>
              <pds-icon icon="play" size="sm"></pds-icon>
              Animate ${speed}
            </button>
            <div style="margin-top: var(--spacing-3); padding: var(--spacing-4); background: var(--color-surface-subtle); border-radius: var(--radius-md); height: 60px; position: relative;">
              <div id="ball-${speed}" style="width: 40px; height: 40px; background: var(--color-primary-500); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md);">
                <pds-icon icon="cursor-click" size="sm" style="color: white;"></pds-icon>
              </div>
            </div>
          </div>
        `)}
      </div>

      <h3 style="margin-top: var(--spacing-8);">Code Example</h3>
      <pre style="background: var(--color-surface-subtle); padding: var(--spacing-4); border-radius: var(--radius-md); overflow-x: auto;"><code>/* Use transition tokens in your CSS */
.button {
  transition: background-color var(--transition-fast);
}

.card {
  transition: 
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.modal {
  transition: opacity var(--transition-slow);
}</code></pre>
    </div>
  `;
};

TransitionSpeeds.storyName = 'Transition Speeds';

export const LoadingStates = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Loading States</h2>
    
    <h3>Button Loading States</h3>
    <div style="display: flex; gap: var(--spacing-3); margin-bottom: var(--spacing-6); flex-wrap: wrap;">
      <button class="btn-primary" disabled>
        <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        Loading...
      </button>
      <button class="btn-secondary" disabled>
        Processing
      </button>
      <button class="btn-outline" disabled>
        Disabled
      </button>
    </div>

    <h3>Skeleton Loading</h3>
    <div style="max-width: 600px;">
      <div class="card" style="padding: var(--spacing-5);">
        ${Array.from({ length: 3 }, () => html`
          <div style="background: var(--color-surface-subtle); height: 16px; border-radius: var(--radius-sm); margin-bottom: var(--spacing-2); animation: pulse 1.5s ease-in-out infinite;"></div>
        `)}
        <div style="background: var(--color-surface-subtle); height: 16px; border-radius: var(--radius-sm); width: 60%; animation: pulse 1.5s ease-in-out infinite;"></div>
      </div>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Spinner</h3>
    <div style="display: flex; gap: var(--spacing-6); align-items: center;">
      <div style="width: 24px; height: 24px; border: 3px solid var(--color-primary-200); border-top-color: var(--color-primary-600); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
      <div style="width: 32px; height: 32px; border: 3px solid var(--color-success-200); border-top-color: var(--color-success-600); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
      <div style="width: 40px; height: 40px; border: 4px solid var(--color-info-200); border-top-color: var(--color-info-600); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
    </div>

    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  </div>
`;

LoadingStates.storyName = 'Loading States';

export const DisabledStates = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Disabled States</h2>
    <p style="margin-bottom: var(--spacing-4);">
      Disabled elements have reduced opacity and no pointer events
    </p>

    <h3>Buttons</h3>
    <div style="display: flex; gap: var(--spacing-3); margin-bottom: var(--spacing-6); flex-wrap: wrap;">
      <button class="btn-primary" disabled>Primary Disabled</button>
      <button class="btn-secondary" disabled>Secondary Disabled</button>
      <button class="btn-outline" disabled>Outline Disabled</button>
    </div>

    <h3>Form Controls</h3>
    <div style="max-width: 400px;">
      <label>
        <span>Disabled Input</span>
        <input type="text" disabled value="Cannot edit" />
      </label>

      <label style="margin-top: var(--spacing-3);">
        <span>Disabled Select</span>
        <select disabled>
          <option>Cannot select</option>
        </select>
      </label>

      <label style="margin-top: var(--spacing-3);">
        <span>Disabled Textarea</span>
        <textarea disabled rows="3">Cannot edit this text</textarea>
      </label>

      <fieldset role="group" style="margin-top: var(--spacing-4);">
        <legend>Disabled Checkboxes</legend>
        <label>
          <input type="checkbox" disabled />
          <span>Disabled unchecked</span>
        </label>
        <label>
          <input type="checkbox" disabled checked />
          <span>Disabled checked</span>
        </label>
      </fieldset>
    </div>
  </div>
`;

DisabledStates.storyName = 'Disabled States';
