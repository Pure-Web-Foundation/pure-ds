import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'A fully featured calendar component with month navigation, event display, and expandable day views'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-calendar');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-calendar', error);
    });
}

export default {
  title: 'Components/Pds Calendar',
  tags: ['autodocs', 'calendar', 'date', 'datepicker', 'event', 'schedule'],
  parameters: {
    pds: {
      tags: ['calendar', 'date', 'datepicker', 'event', 'schedule', 'pds-calendar']
    },
    docs: docsParameters
  },
  argTypes: {
    date: {
      control: 'text',
      description: 'The date to display (defaults to current date). Accepts any valid date string'
    }
  }
};

// Sample event data generator
const getEventData = () => ({
  5: [
    { title: 'Team Standup', type: 'primary' },
    { title: 'Code Review Session', type: 'info' }
  ],
  12: [
    { title: 'Sprint Planning', type: 'primary' }
  ],
  15: [
    { title: 'Client Meeting', type: 'warning' },
    { title: 'Design Review', type: 'info' }
  ],
  18: [
    { title: 'Deployment Window', type: 'danger' }
  ],
  20: [
    { title: 'Team Retrospective', type: 'primary' },
    { title: 'Documentation Review', type: 'info' }
  ],
  25: [
    { title: 'Holiday Event', type: 'warning' }
  ],
  28: [
    { title: 'Release Candidate Review', type: 'danger' },
    { title: 'Performance Testing', type: 'info' }
  ]
});

export const Default = {
  render: (args) => {
    setTimeout(() => {
      const calendar = document.querySelector('#default-calendar');
      if (calendar) {
        calendar.addEventListener('month-rendered', (e) => {
          e.detail.fill(getEventData());
        });
      }
    }, 0);
    
    return html`
      <pds-calendar id="default-calendar"></pds-calendar>
    `;
  },
  args: {
    date: ''
  }
};

export const WithSpecificDate = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector('#specific-date-calendar');
      if (calendar) {
        calendar.addEventListener('month-rendered', (e) => {
          e.detail.fill({
            10: [
              { title: 'Important Meeting', type: 'danger' }
            ],
            15: [
              { title: 'Project Kickoff', type: 'primary' }
            ],
            25: [
              { title: 'Holiday', type: 'warning' }
            ]
          });
        });
      }
    }, 0);
    
    return html`
      <pds-calendar id="specific-date-calendar" date="2024-12-01"></pds-calendar>
    `;
  }
};

export const WithManyEvents = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector('#many-events-calendar');
      if (calendar) {
        calendar.addEventListener('month-rendered', (e) => {
          const events = {};
          
          // Generate events for every other day
          for (let i = 1; i <= 30; i += 2) {
            const types = ['primary', 'info', 'warning', 'danger'];
            const eventCount = Math.floor(Math.random() * 3) + 1;
            events[i] = [];
            
            for (let j = 0; j < eventCount; j++) {
              events[i].push({
                title: `Event ${j + 1} on Day ${i}`,
                type: types[Math.floor(Math.random() * types.length)]
              });
            }
          }
          
          e.detail.fill(events);
        });
      }
    }, 0);
    
    return html`
      <pds-calendar id="many-events-calendar"></pds-calendar>
    `;
  }
};

export const EventTypes = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector('#event-types-calendar');
      if (calendar) {
        calendar.addEventListener('month-rendered', (e) => {
          e.detail.fill({
            5: [
              { title: 'Primary Event', type: 'primary' }
            ],
            10: [
              { title: 'Info Event', type: 'info' }
            ],
            15: [
              { title: 'Warning Event', type: 'warning' }
            ],
            20: [
              { title: 'Danger Event', type: 'danger' }
            ],
            25: [
              { title: 'Primary Event', type: 'primary' },
              { title: 'Info Event', type: 'info' },
              { title: 'Warning Event', type: 'warning' },
              { title: 'Danger Event', type: 'danger' }
            ]
          });
        });
      }
    }, 0);
    
    return html`
      <div class="stack-lg">
        <pds-calendar id="event-types-calendar"></pds-calendar>
        
        <div class="card">
          <h3>Event Types</h3>
          <ul>
            <li><strong>Primary:</strong> Blue - Main events and important tasks</li>
            <li><strong>Info:</strong> Light blue - Informational items and notes</li>
            <li><strong>Warning:</strong> Yellow - Attention required items</li>
            <li><strong>Danger:</strong> Red - Critical deadlines and alerts</li>
          </ul>
        </div>
      </div>
    `;
  }
};

export const DynamicEvents = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector('#dynamic-calendar');
      const addButton = document.querySelector('#add-event-btn');
      const dayInput = document.querySelector('#event-day-input');
      const titleInput = document.querySelector('#event-title-input');
      const typeSelect = document.querySelector('#event-type-select');
      
      let currentEvents = {
        10: [{ title: 'Existing Event', type: 'primary' }]
      };
      
      // Setup persistent event listener
      if (calendar) {
        calendar.addEventListener('month-rendered', (e) => {
          e.detail.fill(currentEvents);
        });
      }
      
      if (addButton && calendar) {
        addButton.onclick = () => {
          const day = parseInt(dayInput.value);
          const title = titleInput.value;
          const type = typeSelect.value;
          
          if (day && title) {
            if (!currentEvents[day]) {
              currentEvents[day] = [];
            }
            currentEvents[day].push({ title, type });
            
            // Trigger re-render
            calendar.refresh();
            
            // Clear inputs
            titleInput.value = '';
            dayInput.value = '';
          }
        };
      }
    }, 0);
    
    return html`
      <div class="stack-lg">
        <div class="card">
          <h3>Add Events Dynamically</h3>
          <div class="flex gap-md items-end">
            <div class="form-group">
              <label for="event-day-input">Day</label>
              <input id="event-day-input" type="number" min="1" max="31" placeholder="Day" class="input" />
            </div>
            <div class="form-group flex-1">
              <label for="event-title-input">Title</label>
              <input id="event-title-input" type="text" placeholder="Event title" class="input" />
            </div>
            <div class="form-group">
              <label for="event-type-select">Type</label>
              <select id="event-type-select" class="input">
                <option value="primary">Primary</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            <button id="add-event-btn" class="btn-primary">Add Event</button>
          </div>
        </div>
        
        <pds-calendar id="dynamic-calendar"></pds-calendar>
      </div>
    `;
  }
};
