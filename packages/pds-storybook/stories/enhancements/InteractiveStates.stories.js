import { html } from 'lit';

export default {
  title: 'Enhancements/Interactive States',
  parameters: {
    docs: {
      description: {
        component: 'Interactive states including focus rings, hover effects, active states, disabled states, and working/loading states. All animations respect user preferences and accessibility settings.'
      }
    }
  }
};

export const FocusStates = () => html`
  <div class="card">
    <h2>Focus States</h2>
    <p>Press <kbd>Tab</kbd> to navigate and see focus rings on interactive elements</p>
    
    <div class="flex flex-wrap gap-sm align-center">
      <button class="btn-primary">Button 1</button>
      <button class="btn-secondary">Button 2</button>
      <button class="btn-outline">Button 3</button>
      <input type="text" placeholder="Focus me" />
      <select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <a href="#" onclick="event.preventDefault();">Link Example</a>
    </div>
  </div>

  <div class="card">
    <h3>Form Controls</h3>
    <div class="max-w-md">
      <label>
        <span>Text Input</span>
        <input type="text" placeholder="Tab to focus" />
      </label>
      
      <label>
        <span>Textarea</span>
        <textarea rows="3" placeholder="Tab to focus"></textarea>
      </label>

      <fieldset role="group">
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

      <fieldset role="radiogroup">
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
  <div class="card">
    <h2>Hover States</h2>
    <p>Hover over elements to see smooth transitions and state changes</p>

    <h3>Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Hover Me</button>
      <button class="btn-secondary">Hover Me</button>
      <button class="btn-outline">Hover Me</button>
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>
  </div>

  <div class="card">
    <h3>Icon Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary icon-only" aria-label="Settings">
        <pds-icon icon="gear"></pds-icon>
      </button>
      <button class="btn-secondary icon-only" aria-label="Search">
        <pds-icon icon="magnifying-glass"></pds-icon>
      </button>
      <button class="btn-outline icon-only" aria-label="Heart">
        <pds-icon icon="heart"></pds-icon>
      </button>
    </div>
  </div>

  <div class="card">
    <h3>Buttons with Icons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">
        <pds-icon icon="plus" size="sm"></pds-icon>
        Add Item
      </button>
      <button class="btn-secondary">
        <pds-icon icon="download" size="sm"></pds-icon>
        Download
      </button>
      <button class="btn-outline">
        <pds-icon icon="share" size="sm"></pds-icon>
        Share
      </button>
    </div>
  </div>

  <div class="card">
    <h3>Links</h3>
    <div class="flex flex-wrap gap-md">
      <a href="#" onclick="event.preventDefault();">Text Link</a>
      <a href="#" onclick="event.preventDefault();">
        <pds-icon icon="arrow-right" size="sm"></pds-icon>
        Link with Icon
      </a>
    </div>
  </div>
`;

HoverStates.storyName = 'Hover States';

export const ActiveStates = () => html`
  <div class="card">
    <h2>Active States</h2>
    <p>Click and hold to see active/pressed states</p>

    <h3>Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Click and Hold</button>
      <button class="btn-secondary">Click and Hold</button>
      <button class="btn-outline">Click and Hold</button>
    </div>
  </div>

  <div class="card">
    <h3>Icon Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary icon-only" aria-label="Like">
        <pds-icon icon="heart"></pds-icon>
      </button>
      <button class="btn-secondary icon-only" aria-label="Bookmark">
        <pds-icon icon="bookmark"></pds-icon>
      </button>
      <button class="btn-outline icon-only" aria-label="Star">
        <pds-icon icon="star"></pds-icon>
      </button>
    </div>
  </div>
`;

ActiveStates.storyName = 'Active States';

export const TransitionSpeeds = () => {
  const triggerAnimation = (speed) => {
    const ball = document.getElementById(`ball-${speed}`);
    if (!ball || ball.classList.contains('animating')) return;
    
    ball.classList.add('animating');
    ball.style.transition = `transform var(--transition-${speed})`;
    ball.style.transform = 'translateX(250px)';
    
    const duration = speed === 'fast' ? 150 : speed === 'slow' ? 500 : 250;
    
    setTimeout(() => {
      ball.style.transform = 'translateX(0)';
      setTimeout(() => {
        ball.classList.remove('animating');
      }, duration);
    }, duration);
  };

  return html`
    <div class="card">
      <h2>Transition Speeds</h2>
      <p>The design system provides three transition speed tokens that can be configured globally.</p>

      <div class="grid gap-lg">
        ${['fast', 'normal', 'slow'].map(speed => html`
          <div>
            <h3>--transition-${speed}</h3>
            <button class="btn-primary btn-sm" @click=${() => triggerAnimation(speed)}>
              <pds-icon icon="play" size="sm"></pds-icon>
              Animate ${speed}
            </button>
            <div class="card surface-subtle">
              <div id="ball-${speed}" class="badge badge-primary radius-full shadow-md">
                <pds-icon icon="cursor-click" size="sm"></pds-icon>
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>

    <div class="card">
      <h3>Code Example</h3>
      <pre class="surface-subtle radius-md overflow-auto"><code>/* Use transition tokens in your CSS */
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

export const WorkingStates = () => {
  const toggleWorking = (btn) => {
    btn.classList.add('btn-working');
    setTimeout(() => {
      btn.classList.remove('btn-working');
    }, 2000);
  };

  return html`
    <div class="card">
      <h2>Working/Loading States</h2>
      <p>
        Click buttons to see the <code>.btn-working</code> state with automatic spinner animation. 
        The PDS enhancer automatically swaps existing icons to spinners or adds a spinner if none exists.
      </p>

      <h3>Buttons Without Icons</h3>
      <p class="text-muted text-sm">Enhancer automatically adds spinner icon</p>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
          Save
        </button>
        <button class="btn-secondary" @click=${(e) => toggleWorking(e.target)}>
          Upload
        </button>
        <button class="btn-outline" @click=${(e) => toggleWorking(e.target)}>
          Download
        </button>
      </div>
    </div>

    <div class="card">
      <h3>Buttons With Existing Icons</h3>
      <p class="text-muted text-sm">Enhancer swaps icon to spinner, restores original when complete</p>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="floppy-disk" size="sm"></pds-icon>
          Save
        </button>
        <button class="btn-secondary" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="upload" size="sm"></pds-icon>
          Upload
        </button>
        <button class="btn-outline" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="download" size="sm"></pds-icon>
          Download
        </button>
      </div>
    </div>

    <div class="card">
      <h3>Icon Buttons</h3>
      <p class="text-muted text-sm">Icon-only buttons with automatic spinner swap</p>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Refresh">
          <pds-icon icon="arrow-counter-clockwise"></pds-icon>
        </button>
        <button class="btn-secondary icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Sync">
          <pds-icon icon="arrow-counter-clockwise"></pds-icon>
        </button>
        <button class="btn-outline icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Process">
          <pds-icon icon="gear"></pds-icon>
        </button>
      </div>
    </div>

    <div class="card">
      <h3>Different Sizes</h3>
      <p class="text-muted text-sm">Spinner size adapts to button size</p>
      <div class="flex flex-wrap gap-sm align-center">
        <button class="btn-primary btn-sm" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="paper-plane-tilt" size="sm"></pds-icon>
          Small
        </button>
        <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="paper-plane-tilt" size="sm"></pds-icon>
          Default
        </button>
        <button class="btn-primary btn-lg" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="paper-plane-tilt"></pds-icon>
          Large
        </button>
      </div>
    </div>

    <div class="card">
      <h3>Permanent Working State</h3>
      <p class="text-muted">Buttons in continuous working state</p>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary btn-working">
          <pds-icon icon="circle-notch" size="sm"></pds-icon>
          Loading...
        </button>
        <button class="btn-secondary btn-working">
          <pds-icon icon="circle-notch" size="sm"></pds-icon>
          Processing...
        </button>
        <button class="btn-outline icon-only btn-working" aria-label="Loading">
          <pds-icon icon="circle-notch"></pds-icon>
        </button>
      </div>
    </div>

    <div class="card">
      <h3>Usage</h3>
      <pre class="bg-surface-subtle radius-md overflow-auto"><code>// Simply toggle the class - PDS handles the rest
button.classList.add('btn-working');

// After async operation completes
button.classList.remove('btn-working');</code></pre>
    </div>
  `;
};

WorkingStates.storyName = 'Working States';

export const SkeletonLoading = () => html`
  <div class="card">
    <h2>Skeleton Loading</h2>
    <p>Use the <code>.skeleton</code> class for content placeholders while loading</p>

    <h3>Card Skeleton</h3>
    <div class="max-w-xl">
      <div class="card">
        <div class="skeleton" style="height: 24px; width: 60%; margin-bottom: var(--spacing-3);"></div>
        <div class="skeleton" style="height: 16px; margin-bottom: var(--spacing-2);"></div>
        <div class="skeleton" style="height: 16px; margin-bottom: var(--spacing-2);"></div>
        <div class="skeleton" style="height: 16px; width: 80%;"></div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>List Skeleton</h3>
    <div class="max-w-md">
      ${Array.from({ length: 4 }, () => html`
        <div class="flex gap-sm align-center border-bottom" style="padding: var(--spacing-3);">
          <div class="skeleton" style="width: 40px; height: 40px; border-radius: 50%;"></div>
          <div style="flex: 1;">
            <div class="skeleton" style="height: 16px; width: 70%; margin-bottom: var(--spacing-2);"></div>
            <div class="skeleton" style="height: 14px; width: 50%;"></div>
          </div>
        </div>
      `)}
    </div>
  </div>

  <div class="card">
    <h3>Text Skeleton</h3>
    <div class="max-w-lg">
      <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: var(--spacing-3);"></div>
      <div class="skeleton" style="height: 16px; margin-bottom: var(--spacing-2);"></div>
      <div class="skeleton" style="height: 16px; margin-bottom: var(--spacing-2);"></div>
      <div class="skeleton" style="height: 16px; margin-bottom: var(--spacing-2);"></div>
      <div class="skeleton" style="height: 16px; width: 85%;"></div>
    </div>
  </div>
`;

SkeletonLoading.storyName = 'Skeleton Loading';

export const DisabledStates = () => html`
  <div class="card">
    <h2>Disabled States</h2>
    <p>Disabled elements have reduced opacity and no pointer events</p>

    <h3>Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary" disabled>Primary Disabled</button>
      <button class="btn-secondary" disabled>Secondary Disabled</button>
      <button class="btn-outline" disabled>Outline Disabled</button>
    </div>
  </div>

  <div class="card">
    <h3>Icon Buttons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary icon-only" disabled aria-label="Settings">
        <pds-icon icon="gear"></pds-icon>
      </button>
      <button class="btn-secondary icon-only" disabled aria-label="Search">
        <pds-icon icon="magnifying-glass"></pds-icon>
      </button>
      <button class="btn-outline icon-only" disabled aria-label="Heart">
        <pds-icon icon="heart"></pds-icon>
      </button>
    </div>
  </div>

  <div class="card">
    <h3>Buttons with Icons</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary" disabled>
        <pds-icon icon="plus" size="sm"></pds-icon>
        Add Item
      </button>
      <button class="btn-secondary" disabled>
        <pds-icon icon="download" size="sm"></pds-icon>
        Download
      </button>
    </div>
  </div>

  <div class="card">
    <h3>Form Controls</h3>
    <div class="max-w-md">
      <label>
        <span>Disabled Input</span>
        <input type="text" disabled value="Cannot edit" />
      </label>

      <label>
        <span>Disabled Select</span>
        <select disabled>
          <option>Cannot select</option>
        </select>
      </label>

      <label>
        <span>Disabled Textarea</span>
        <textarea disabled rows="3">Cannot edit this text</textarea>
      </label>

      <fieldset role="group">
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

export const CombinedStates = () => html`
  <div class="card">
    <h2>Combined State Examples</h2>
    <p>Comprehensive examples showing all interactive states together</p>
  </div>

  <div class="card">
    <h3>Idle State</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
    </div>
  </div>

  <div class="card">
    <h3>Hover State</h3>
    <p class="text-muted text-sm">Hover over buttons to see effect</p>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
    </div>
  </div>

  <div class="card">
    <h3>Active State</h3>
    <p class="text-muted text-sm">Click and hold to see effect</p>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
    </div>
  </div>

  <div class="card">
    <h3>Focus State</h3>
    <p class="text-muted text-sm">Tab to focus on buttons</p>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
    </div>
  </div>

  <div class="card">
    <h3>Disabled State</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary" disabled>Primary</button>
      <button class="btn-secondary" disabled>Secondary</button>
      <button class="btn-outline" disabled>Outline</button>
    </div>
  </div>

  <div class="card">
    <h3>Working State</h3>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary btn-working">
        <pds-icon icon="circle-notch" size="sm"></pds-icon>
        Primary
      </button>
      <button class="btn-secondary btn-working">
        <pds-icon icon="circle-notch" size="sm"></pds-icon>
        Secondary
      </button>
      <button class="btn-outline btn-working">
        <pds-icon icon="circle-notch" size="sm"></pds-icon>
        Outline
      </button>
    </div>
  </div>
`;

CombinedStates.storyName = 'All States';
