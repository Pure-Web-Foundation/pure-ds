import { html } from 'lit';

export default {
  title: 'Components/Pds Richtext',
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

export const ArticleContent = () => html`
  <div style="max-width: 800px;">
    <h3>Article Editor</h3>
    <pds-richtext 
      value="<h2>The Future of Web Development</h2><p>Web development has evolved dramatically over the past decade. Modern frameworks and tools have made it easier than ever to build sophisticated applications.</p><h3>Key Trends</h3><ul><li><strong>Component-Based Architecture</strong> - Reusable, modular components</li><li><strong>Progressive Web Apps</strong> - Native-like experiences on the web</li><li><strong>AI Integration</strong> - Smart features powered by machine learning</li></ul><h3>Best Practices</h3><p>When building modern web applications, consider:</p><ol><li>Performance optimization</li><li>Accessibility standards</li><li>Mobile-first design</li><li>Security considerations</li></ol><blockquote><p>The web is the platform of the future, and it's more powerful than ever before.</p></blockquote><p>For more information, visit <a href='https://example.com'>our documentation</a>.</p>"
      style="min-height: 400px;">
    </pds-richtext>
  </div>
`;

ArticleContent.storyName = 'Article Content';

export const EmailComposer = () => html`
  <article class="card" style="max-width: 700px;">
    <h3>Compose Email</h3>
    
    <div style="margin-top: var(--spacing-4);">
      <label style="display: block; margin-bottom: var(--spacing-2);">
        <strong>To:</strong>
        <div class="input-icon">
          <pds-icon icon="envelope"></pds-icon>
          <input type="email" placeholder="recipient@example.com" style="width: 100%; margin-top: var(--spacing-1); padding: var(--spacing-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
        </div>
      </label>
      
      <label style="display: block; margin-bottom: var(--spacing-4);">
        <strong>Subject:</strong>
        <input type="text" placeholder="Email subject" style="width: 100%; margin-top: var(--spacing-1); padding: var(--spacing-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
      </label>
      
      <label style="display: block; margin-bottom: var(--spacing-4);">
        <strong>Message:</strong>
        <pds-richtext 
          value="<p>Hello,</p><p>I hope this message finds you well.</p><p>Best regards,<br><strong>Your Name</strong></p>"
          style="min-height: 300px; margin-top: var(--spacing-2);">
        </pds-richtext>
      </label>
      
      <div style="display: flex; gap: var(--spacing-2);">
        <button class="btn-primary">
          <pds-icon icon="send"></pds-icon>
          Send Email
        </button>
        <button class="btn-outline">
          <pds-icon icon="paperclip"></pds-icon>
          Attach File
        </button>
        <button class="btn-ghost">Save Draft</button>
      </div>
    </div>
  </article>
`;

EmailComposer.storyName = 'Email Composer';

export const CommentEditor = () => html`
  <div style="max-width: 600px;">
    <article class="card surface-elevated" style="margin-bottom: var(--spacing-4);">
      <div style="display: flex; gap: var(--spacing-3);">
        <div style="width: 48px; height: 48px; background: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
          <pds-icon icon="user"></pds-icon>
        </div>
        <div style="flex: 1;">
          <strong>John Doe</strong>
          <p style="margin: var(--spacing-2) 0; opacity: 0.9;">This is a great article! I really enjoyed reading about the latest trends in web development. The section on component architecture was particularly insightful.</p>
          <div style="display: flex; gap: var(--spacing-2); font-size: 0.85rem; opacity: 0.7;">
            <span>2 hours ago</span>
            <button class="btn-ghost" style="padding: 0; font-size: 0.85rem;">Reply</button>
            <button class="btn-ghost" style="padding: 0; font-size: 0.85rem;">Like</button>
          </div>
        </div>
      </div>
    </article>
    
    <article class="card">
      <h4>Add a Comment</h4>
      <pds-richtext 
        value="<p>Share your thoughts...</p>"
        style="min-height: 150px; margin: var(--spacing-3) 0;">
      </pds-richtext>
      <div style="display: flex; gap: var(--spacing-2);">
        <button class="btn-primary">
          <pds-icon icon="message-circle"></pds-icon>
          Post Comment
        </button>
        <button class="btn-outline">Cancel</button>
      </div>
    </article>
  </div>
`;

CommentEditor.storyName = 'Comment Editor';
