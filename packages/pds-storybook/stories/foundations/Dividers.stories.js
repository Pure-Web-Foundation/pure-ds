import { html } from "#pds/lit";

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
  <article class="card">
    <header>
      <h3>Default Divider</h3>
      <small class="text-muted">Use <code>&lt;hr&gt;</code> for a clean divider.</small>
    </header>
    <div>
      <p>Section one content</p>
      <hr />
      <p>Section two content</p>
    </div>
  </article>
`;

export const LabeledDivider = () => html`
  <article class="card">
    <header>
      <h3>Labeled Divider</h3>
      <small class="text-muted">Add <code>data-content</code> to label the divider.</small>
    </header>
    <div>
      <p>Continue with email</p>
      <hr data-content="OR" />
      <p>Continue with SSO</p>
    </div>
  </article>
`;

export const DividerInCard = () => html`
  <article class="card">
    <header>
      <h3>Divider in Card Layouts</h3>
      <small class="text-muted">Works inside cards and stacked content.</small>
    </header>
    <div>
      <div>
        <strong>Plan details</strong>
        <small class="text-muted">Monthly · Cancel anytime</small>
      </div>
      <hr data-content="DETAILS" />
      <div>
        <span>Storage: 500GB</span>
        <span>Support: Priority</span>
      </div>
    </div>
  </article>
`;
