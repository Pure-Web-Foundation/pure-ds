import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-scrollrow',
  parameters: {
    docs: {
      description: {
        component: 'Horizontal scrolling container with navigation buttons'
      }
    }
  }
};

export const Default = () => html`
  <pds-scrollrow>
    ${Array.from({ length: 10 }, (_, i) => html`
      <article class="card" style="min-width: 300px;">
        <h4>Card ${i + 1}</h4>
        <p>This is card content that scrolls horizontally.</p>
        <button class="btn-primary">Action</button>
      </article>
    `)}
  </pds-scrollrow>
`;

export const WithImages = () => html`
  <pds-scrollrow>
    ${Array.from({ length: 8 }, (_, i) => html`
      <div style="min-width: 250px; height: 200px; background: var(--color-primary-${(i + 1) * 100}); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white;">
        <span style="font-size: 2rem; font-weight: bold;">Image ${i + 1}</span>
      </div>
    `)}
  </pds-scrollrow>
`;
