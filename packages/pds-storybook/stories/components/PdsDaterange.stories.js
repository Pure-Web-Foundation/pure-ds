import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'Form-associated date range picker with compact dual-calendar dropdown and ISO interval value output.'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-daterange');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-daterange', error);
    });
}

export default {
  title: 'Components/pds-daterange',
  tags: ['autodocs', 'date', 'range', 'travel', 'form'],
  parameters: {
    pds: {
      tags: ['pds-daterange', 'date', 'range', 'calendar', 'form']
    },
    docs: docsParameters
  }
};

export const Default = {
  render: () => {
    setTimeout(() => {
      const form = document.querySelector('#daterange-form');
      const daterange = document.querySelector('#booking-range');
      const output = document.querySelector('#daterange-output');

      if (!form || !daterange || !output) return;

      const writeOutput = (label) => {
        const value = daterange.value || '(empty)';
        output.textContent = `${label}: ${value}`;
      };

      daterange.addEventListener('range-change', () => {
        writeOutput('range-change');
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) {
          writeOutput('invalid');
          return;
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        output.textContent = JSON.stringify(payload, null, 2);
      });

      form.addEventListener('reset', () => {
        setTimeout(() => writeOutput('reset'), 0);
      });

      writeOutput('ready');
    }, 0);

    return html`
      <section class="card stack-md">
        <h3>Booking Dates</h3>
        <p class="text-muted">Select check-in and check-out in the dropdown panel. Value is form-associated and submits as ISO interval YYYY-MM-DD/YYYY-MM-DD.</p>

        <form id="daterange-form" class="stack-md">
          <pds-daterange id="booking-range" name="travelPeriod" required></pds-daterange>

          <div class="flex gap-sm">
            <button type="submit" class="btn-primary">Submit</button>
            <button type="reset" class="btn-secondary">Reset</button>
          </div>
        </form>

        <pre id="daterange-output" class="card surface-subtle">ready: (empty)</pre>
      </section>
    `;
  }
};
