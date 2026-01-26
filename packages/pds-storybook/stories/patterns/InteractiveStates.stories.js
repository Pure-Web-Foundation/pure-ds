import { html } from "lit";

const interactiveSkeletonStoryStyles = html`
  <style>
    
    .story-product-card {
      article {
        > .skeleton {
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-3);
        }

        [data-media]{
          aspect-ratio: 4 / 3;

        }
        > .stack-sm {
          > .skeleton {
            block-size: var(--spacing-4);
          }

          > .skeleton:first-child {
            block-size: var(--spacing-5);
            max-inline-size: calc(var(--spacing-12) * 4);
          }

          > .skeleton:nth-child(3) {
            max-inline-size: calc(var(--spacing-12) * 5);
          }
        }

        span {
          display: inline-block;
          width: 7rem;
          height: 2.4rem;
        }

        > .flex {
          margin-top: var(--spacing-3);

          > div.skeleton:first-child {
            block-size: var(--spacing-6);
            max-inline-size: calc(var(--spacing-12) * 2.5);
          }

          > div.skeleton:last-child {
            block-size: var(--spacing-8);
            min-inline-size: calc(var(--spacing-12) * 2.5);
            border-radius: var(--radius-full);
          }
        }
      }
    }
  </style>
`;

export default {
  title: "Patterns/Interactive States",
  tags: ["hover", "focus", "active", "disabled", "loading", "interaction"],
  parameters: {
    pds: {
      tags: [
        "hover",
        "focus",
        "active",
        "disabled",
        "loading",
        "working",
        "interaction",
        "accessibility",
        "feedback",
        "state",
      ],
    },
    docs: {
      description: {
        component:
          "Interactive states including focus rings, hover effects, active states, disabled states, and working/loading states. All animations respect user preferences and accessibility settings.",
      },
    },
  },
};

export const FocusStates = () => html`
  <div class="card">
    <h2>Focus States</h2>
    <p>
      Press <kbd>Tab</kbd> to navigate and see focus rings on interactive
      elements
    </p>

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
        <span data-label>Text Input</span>
        <input type="text" placeholder="Tab to focus" />
      </label>

      <label>
        <span data-label>Textarea</span>
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

FocusStates.storyName = "Focus States";

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

HoverStates.storyName = "Hover States";

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

ActiveStates.storyName = "Active States";

export const TransitionSpeeds = () => {
  const triggerAnimation = (speed) => {
    const ball = document.getElementById(`ball-${speed}`);
    if (!ball || ball.classList.contains("animating")) return;

    ball.classList.add("animating");
    ball.style.transition = `transform var(--transition-${speed})`;
    ball.style.transform = "translateX(250px)";

    const duration = speed === "fast" ? 150 : speed === "slow" ? 500 : 250;

    setTimeout(() => {
      ball.style.transform = "translateX(0)";
      setTimeout(() => {
        ball.classList.remove("animating");
      }, duration);
    }, duration);
  };

  return html`
    <div class="card">
      <h2>Transition Speeds</h2>
      <p>
        The design system provides three transition speed tokens that can be
        configured globally.
      </p>

      <div class="grid gap-lg">
        ${["fast", "normal", "slow"].map(
          (speed) => html`
            <div>
              <h3>--transition-${speed}</h3>
              <button
                class="btn-primary btn-sm"
                @click=${() => triggerAnimation(speed)}
              >
                <pds-icon icon="play" size="sm"></pds-icon>
                Animate ${speed}
              </button>
              <div class="card surface-subtle">
                <div
                  id="ball-${speed}"
                  class="badge badge-primary radius-full shadow-md"
                >
                  <pds-icon icon="cursor-click" size="sm"></pds-icon>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    </div>

    <div class="card">
      <h3>Code Example</h3>
      <pre
        class="surface-subtle radius-md overflow-auto"
      ><code>/* Use transition tokens in your CSS */
.story-button {
  transition: background-color var(--transition-fast);
}

.card {
  transition: 
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.story-modal {
  transition: opacity var(--transition-slow);
}</code></pre>
    </div>
  `;
};

TransitionSpeeds.storyName = "Transition Speeds";

export const WorkingStates = () => {
  const toggleWorking = (btn) => {
    btn.classList.add("btn-working");
    setTimeout(() => {
      btn.classList.remove("btn-working");
    }, 2000);
  };

  return html`
    <h2>Working/Loading States</h2>
    <p>
      Click buttons to see the <code>.btn-working</code> state with automatic
      spinner animation. The PDS enhancer automatically swaps existing icons to
      spinners or adds a spinner if none exists.
    </p>

    <div class="stack-lg">
      <header>
        <h3>Buttons Without Icons</h3>
        <small class="text-muted">
          Enhancer automatically adds spinner icon
        </small>
      </header>

      <div class="stack-md">

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

      <div class="stack-md">
        <header>
          <h3>Buttons With Existing Icons</h3>
          <small class="text-muted">
            Enhancer swaps icon to spinner, restores original when complete
          </small>
        </header>
        <div class="flex flex-wrap gap-sm">
          <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
            <pds-icon icon="floppy-disk" size="sm"></pds-icon>
            Save
          </button>
          <button
            class="btn-secondary"
            @click=${(e) => toggleWorking(e.target)}
          >
            <pds-icon icon="upload" size="sm"></pds-icon>
            Upload
          </button>
          <button class="btn-outline" @click=${(e) => toggleWorking(e.target)}>
            <pds-icon icon="download" size="sm"></pds-icon>
            Download
          </button>
        </div>
      </div>

      <div class="stack-md">
        <header>
          <h3>Icon-Only Buttons</h3>
          <small class="text-muted">
            Icon-only buttons with automatic spinner swap
          </small>
        </header>
        <div class="flex flex-wrap gap-sm">
          <button
            class="btn-primary icon-only"
            @click=${(e) => toggleWorking(e.target)}
            aria-label="Refresh"
          >
            <pds-icon icon="arrow-counter-clockwise"></pds-icon>
          </button>
          <button
            class="btn-secondary icon-only"
            @click=${(e) => toggleWorking(e.target)}
            aria-label="Sync"
          >
            <pds-icon icon="arrow-counter-clockwise"></pds-icon>
          </button>
          <button
            class="btn-outline icon-only"
            @click=${(e) => toggleWorking(e.target)}
            aria-label="Process"
          >
            <pds-icon icon="gear"></pds-icon>
          </button>
        </div>
      </div>

      <div class="stack-md">
        <header>
          <h3>Different Sizes</h3>
          <small class="text-muted">Spinner size adapts to button size</small>
        </header>
        <div class="flex flex-wrap gap-sm align-center">
          <button
            class="btn-primary btn-sm"
            @click=${(e) => toggleWorking(e.target)}
          >
            <pds-icon icon="paper-plane-tilt" size="sm"></pds-icon>
            Small
          </button>
          <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
            <pds-icon icon="paper-plane-tilt" size="sm"></pds-icon>
            Default
          </button>
          <button
            class="btn-primary btn-lg"
            @click=${(e) => toggleWorking(e.target)}
          >
            <pds-icon icon="paper-plane-tilt"></pds-icon>
            Large
          </button>
        </div>
      </div>

      <div class="stack-md">
        <header>
          <h3>Permanent Working State</h3>
          <small class="text-muted">Buttons in continuous working state</small>
        </header>
        <div class="flex flex-wrap gap-sm">
          <button class="btn-primary btn-working">
            <pds-icon icon="circle-notch" size="sm"></pds-icon>
            Loading...
          </button>
          <button class="btn-secondary btn-working">
            <pds-icon icon="circle-notch" size="sm"></pds-icon>
            Processing...
          </button>
          <button
            class="btn-outline icon-only btn-working"
            aria-label="Loading"
          >
            <pds-icon icon="circle-notch"></pds-icon>
          </button>
        </div>
      </div>

      <div class="card">
        <h3>Usage</h3>
        <pre
          class="bg-surface-subtle radius-md overflow-auto"
        ><code>// Simply toggle the class - PDS handles the rest
button.classList.add('btn-working');

// After async operation completes
button.classList.remove('btn-working');</code></pre>
      </div>
    </div>
  `;
};

WorkingStates.storyName = "Working States";

export const SkeletonLoading = () => html`
  ${interactiveSkeletonStoryStyles}
  <div class="card">
    <h2>Skeleton Loading</h2>
    <p>
      Use the <code>.skeleton</code> class for content placeholders while
      loading
    </p>

    <h3>Card Skeleton</h3>

    <div class="card story-product-card">
      <h3>Product Card Empty State</h3>
      <div class="max-w-md">
        <article class="card stack-sm">
          <div class="skeleton" data-media></div>
          <div class="stack-sm">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
          </div>
          <div class="flex justify-between items-center">
            <span class="skeleton"></span>
            <span class="skeleton"></span>
          </div>
        </article>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>List Skeleton</h3>
    <div class="max-w-md stack-sm">
      ${Array.from(
        { length: 6 },
        () => html`
          <div
            class="skeleton"
          ></div>
        `
      )}
    </div>
  </div>

  <div class="card">
    <h3>Text Skeleton</h3>
    <div class="max-w-md stack-md">
      <div class="skeleton interactive-skeleton-height-48"></div>
      <div class="skeleton interactive-skeleton-height-16"></div>
      <div class="skeleton interactive-skeleton-height-16"></div>
    </div>
  </div>
`;

SkeletonLoading.storyName = "Skeleton Loading";

export const EmptyState = () => html`
  <div class="card">
    <h2>Empty State</h2>
    <section class="empty-state">
      <header>
        <h2>Feature X isn’t set up yet</h2>
        <small class="text-muted">
          To use Feature X, connect your data source and choose your defaults.
        </small>
      </header>

      <pds-icon icon="magic-wand" size="3xl"></pds-icon>

      <nav>
        <a class="btn btn-primary" href="#" onclick="event.preventDefault();">
          Set up Feature X
        </a>
        <a class="btn btn-outline" href="#" onclick="event.preventDefault();">
          Learn more
        </a>
      </nav>
    </section>
  </div>
`;

EmptyState.storyName = "Empty State";

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
        <span data-label>Disabled Input</span>
        <input type="text" disabled value="Cannot edit" />
      </label>

      <label>
        <span data-label>Disabled Select</span>
        <select disabled>
          <option>Cannot select</option>
        </select>
      </label>

      <label>
        <span data-label>Disabled Textarea</span>
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

DisabledStates.storyName = "Disabled States";

export const CombinedStates = () => html`
  <header>
    <h2>Combined State Examples</h2>
    <small
      >Comprehensive examples showing all interactive states together</small
    >
  </header>

  <div class="stack-md">
    <div>
      <h3>Idle State</h3>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-outline">Outline</button>
      </div>
    </div>

    <div>
      <header>
        <h3>Hover State</h3>
        <p class="text-muted"><small>Hover over buttons to see effect</small></p>
      </header>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-outline">Outline</button>
      </div>
    </div>

    <div>
      <header>
        <h3>Active State</h3>
        <p class="text-muted"><small>Click and hold to see effect</small></p>
      </header>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-outline">Outline</button>
      </div>
    </div>

    <div>
      <header>
        <h3>Focus State</h3>
        <p class="text-muted"><small>Tab to focus on buttons</small></p>
      </header>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-outline">Outline</button>
      </div>
    </div>

    <div>
      <h3>Disabled State</h3>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary" disabled>Primary</button>
        <button class="btn-secondary" disabled>Secondary</button>
        <button class="btn-outline" disabled>Outline</button>
      </div>
    </div>

    <div>
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
  </div>
`;

CombinedStates.storyName = "All States";
