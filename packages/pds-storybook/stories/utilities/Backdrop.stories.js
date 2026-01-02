import { html } from 'lit';

export default {
  title: 'Utilities/Backdrop',
  tags: ['layout', 'backdrop', 'modal', 'overlay', 'utilities'],
  parameters: {
    pds: {
      tags: ['backdrop', 'modal', 'overlay', 'utilities']
    },
    docs: {
      description: {
        component: 'Backdrop utilities for modal overlays, drawers, and lightboxes. Provides consistent blur and dimming effects with light/dark variants.'
      }
    }
  }
};

export const BackdropVariants = () => html`
  <header class="card">
    <h2>Backdrop Utilities</h2>
    <p class="text-muted">
      The <code>.backdrop</code> class provides a full-screen overlay for modals and dialogs.
      Add <code>.active</code> to show the backdrop.
    </p>
  </header>

  <div class="grid grid-auto-md gap-lg">
    <article class="card">
      <h3>Default Backdrop</h3>
      <p>Uses theme backdrop variables with subtle blur and gradient.</p>
      <code>.backdrop.active</code>
      <div style="position: relative; height: 200px; margin-top: var(--spacing-4); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/400/200?random=1" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <div class="card surface-overlay" style="text-align: center;">
            <p>Modal content</p>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <h3>Light Backdrop</h3>
      <p>For light-themed overlays or subtle dimming.</p>
      <code>.backdrop.backdrop-light.active</code>
      <div style="position: relative; height: 200px; margin-top: var(--spacing-4); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/400/200?random=2" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop backdrop-light active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <div class="card" style="text-align: center;">
            <p>Light overlay</p>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <h3>Dark Backdrop</h3>
      <p>For dramatic dimming and focus on content.</p>
      <code>.backdrop.backdrop-dark.active</code>
      <div style="position: relative; height: 200px; margin-top: var(--spacing-4); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/400/200?random=3" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop backdrop-dark active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <div class="card surface-overlay" style="text-align: center; color: white;">
            <p>Dark overlay</p>
          </div>
        </div>
      </div>
    </article>
  </div>
`;

BackdropVariants.storyName = 'Backdrop Variants';

export const BlurLevels = () => html`
  <header class="card">
    <h2>Backdrop Blur Levels</h2>
    <p class="text-muted">
      Control the blur intensity with <code>.backdrop-blur-sm</code>, <code>.backdrop-blur-md</code>, 
      and <code>.backdrop-blur-lg</code>.
    </p>
  </header>

  <div class="grid grid-cols-3 gap-md">
    <article class="card">
      <h4>Small Blur</h4>
      <code>.backdrop-blur-sm</code>
      <div style="position: relative; height: 150px; margin-top: var(--spacing-3); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/300/150?random=4" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop backdrop-blur-sm active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <span class="badge badge-primary">5px blur</span>
        </div>
      </div>
    </article>

    <article class="card">
      <h4>Medium Blur</h4>
      <code>.backdrop-blur-md</code>
      <div style="position: relative; height: 150px; margin-top: var(--spacing-3); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/300/150?random=5" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop backdrop-blur-md active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <span class="badge badge-secondary">10px blur</span>
        </div>
      </div>
    </article>

    <article class="card">
      <h4>Large Blur</h4>
      <code>.backdrop-blur-lg</code>
      <div style="position: relative; height: 150px; margin-top: var(--spacing-3); border-radius: var(--radius-md); overflow: hidden;">
        <img src="https://picsum.photos/300/150?random=6" alt="Background" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="backdrop backdrop-blur-lg active" style="position: absolute;"></div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <span class="badge badge-info">20px blur</span>
        </div>
      </div>
    </article>
  </div>
`;

BlurLevels.storyName = 'Blur Levels';

export const BackdropReference = () => html`
  <div class="card">
    <h2>Backdrop Utilities Reference</h2>
  </div>

  <table class="table-bordered">
    <thead>
      <tr>
        <th>Class</th>
        <th>Description</th>
        <th>CSS Variable Override</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.backdrop</code></td>
        <td>Base backdrop with fixed positioning, uses theme variables</td>
        <td>Uses <code>--backdrop-bg</code>, <code>--backdrop-filter</code></td>
      </tr>
      <tr>
        <td><code>.backdrop.active</code></td>
        <td>Shows the backdrop with opacity transition</td>
        <td><code>--backdrop-opacity</code></td>
      </tr>
      <tr>
        <td><code>.backdrop-light</code></td>
        <td>Light gradient overlay (white-based)</td>
        <td>Sets <code>--backdrop-bg</code> to light gradient</td>
      </tr>
      <tr>
        <td><code>.backdrop-dark</code></td>
        <td>Dark gradient overlay (black-based)</td>
        <td>Sets <code>--backdrop-bg</code> to dark gradient</td>
      </tr>
      <tr>
        <td><code>.backdrop-blur-sm</code></td>
        <td>Small blur effect (5px)</td>
        <td>Sets <code>--backdrop-blur: 5px</code></td>
      </tr>
      <tr>
        <td><code>.backdrop-blur-md</code></td>
        <td>Medium blur effect (10px)</td>
        <td>Sets <code>--backdrop-blur: 10px</code></td>
      </tr>
      <tr>
        <td><code>.backdrop-blur-lg</code></td>
        <td>Large blur effect (20px)</td>
        <td>Sets <code>--backdrop-blur: 20px</code></td>
      </tr>
    </tbody>
  </table>

  <div class="card">
    <h3>Usage with PDS Dialogs</h3>
    <p>
      Note: PDS dialogs (<code>&lt;dialog&gt;</code>) and <code>PDS.ask()</code> 
      automatically use the <code>::backdrop</code> pseudo-element with proper styling.
      These utilities are primarily for custom overlay implementations.
    </p>
    <pre><code>&lt;!-- Custom overlay pattern --&gt;
&lt;div class="backdrop backdrop-blur-md" id="customOverlay"&gt;&lt;/div&gt;
&lt;div class="modal-content"&gt;...&lt;/div&gt;

&lt;script&gt;
  // Toggle backdrop
  customOverlay.classList.toggle('active');
&lt;/script&gt;</code></pre>
  </div>
`;

BackdropReference.storyName = 'Reference';
