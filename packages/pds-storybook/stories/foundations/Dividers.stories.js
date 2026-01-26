import { html } from "lit";

export default {
  title: "Foundations/Dividers",
  tags: ["hr", "divider", "content", "foundation"],
  parameters: {
    pds: {
      tags: ["hr", "divider", "foundation", "data-content"],
    },
    docs: {
      description: {
        component: "Horizontal rules with optional labels via data-content.",
      },
    },
  },
};

export const BasicDividers = () => html`
  <article class="card stack-md">
    <header class="stack-xs">
      <h3>Default Divider</h3>
      <p class="text-muted">Use <code>&lt;hr&gt;</code> for a clean divider.</p>
    </header>
    <div class="stack-sm">
      <p>Section one content</p>
      <hr />
      <p>Section two content</p>
    </div>
  </article>
`;

export const LabeledDivider = () => html`
  <article class="card stack-md">
    <header class="stack-xs">
      <h3>Labeled Divider</h3>
      <p class="text-muted">Add <code>data-content</code> to label the divider.</p>
    </header>
    <div class="stack-sm">
      <p>Continue with email</p>
      <hr data-content="OR" />
      <p>Continue with SSO</p>
    </div>
  </article>
`;

export const DividerInCard = () => html`
  <article class="card stack-md">
    <header class="stack-xs">
      <h3>Divider in Card Layouts</h3>
      <p class="text-muted">Works inside cards and stacked content.</p>
    </header>
    <div class="stack-sm">
      <div class="stack-xs">
        <strong>Plan details</strong>
        <small class="text-muted">Monthly · Cancel anytime</small>
      </div>
      <hr data-content="DETAILS" />
      <div class="stack-xs">
        <span>Storage: 500GB</span>
        <span>Support: Priority</span>
      </div>
    </div>
  </article>
`;
