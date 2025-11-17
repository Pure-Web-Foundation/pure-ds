import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-richtext',
  parameters: {
    docs: {
      description: {
        component: 'Rich text editor with markdown support and formatting toolbar'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Initial HTML content'
    }
  }
};

export const Default = {
  render: (args) => html`
    <pds-richtext 
      value="${args.value}"
      @input="${(e) => console.log('Content:', e.target.value)}">
    </pds-richtext>
  `,
  args: {
    value: '<p>Start typing here...</p>'
  }
};

export const WithContent = () => html`
  <pds-richtext value="<h2>Rich Text Editor</h2><p>This editor supports <strong>bold</strong>, <em>italic</em>, and <u>underline</u> formatting.</p><p>You can also add <a href='#'>links</a> and create lists:</p><ul><li>Item 1</li><li>Item 2</li></ul>"></pds-richtext>
`;

export const InForm = () => html`
  <form style="max-width: 600px;">
    <label>
      <span>Blog Post Content</span>
      <pds-richtext 
        value="<h3>My Blog Post</h3><p>Write your content here...</p>"
        style="min-height: 300px;">
      </pds-richtext>
    </label>
    <div style="margin-top: var(--spacing-4);">
      <button type="submit" class="btn-primary">Publish</button>
      <button type="button" class="btn-ghost">Save Draft</button>
    </div>
  </form>
`;
