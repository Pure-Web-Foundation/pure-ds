import { html } from 'lit';

const richtextStoryStyles = html`
  <style>
    .richtext-form {
      max-width: 37.5rem;
      display: grid;
      gap: var(--spacing-4);
    }

    .richtext-form-actions {
      display: flex;
      gap: var(--spacing-3);
    }

    .richtext-article-shell {
      max-width: 50rem;
      display: grid;
      gap: var(--spacing-3);
    }

    .richtext-article-editor {
      min-height: 25rem;
    }

    .richtext-email-card {
      max-width: 43.75rem;
      display: grid;
      gap: var(--spacing-4);
    }

    .richtext-email-form {
      display: grid;
      gap: var(--spacing-3);
    }

    .richtext-email-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .richtext-comment-shell {
      max-width: 37.5rem;
      display: grid;
      gap: var(--spacing-4);
    }

    .richtext-comment-card {
      margin-bottom: var(--spacing-4);
    }

    .richtext-comment-header {
      display: flex;
      gap: var(--spacing-3);
    }

    .richtext-comment-avatar {
      width: 3rem;
      height: 3rem;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary-contrast, #fff);
      flex-shrink: 0;
    }

    .richtext-comment-body {
      flex: 1;
    }

    .richtext-comment-text {
      margin: var(--spacing-2) 0;
      opacity: 0.9;
    }

    .richtext-comment-meta {
      display: flex;
      gap: var(--spacing-2);
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .richtext-comment-meta button {
      padding: 0;
      font-size: 0.85rem;
    }

    .richtext-comment-editor {
      min-height: 9.375rem;
      margin: var(--spacing-3) 0;
    }

    .richtext-comment-actions {
      display: flex;
      gap: var(--spacing-2);
    }

    .richtext-comment-form {
      display: grid;
      gap: var(--spacing-3);
    }
  </style>
`;

const bindToastForms = (selector) => {
  setTimeout(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.querySelectorAll(selector).forEach((form) => {
      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      if (form.dataset.toastBound === 'true') {
        return;
      }

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (typeof window === 'undefined' || !window.toastFormData) {
          return;
        }

        const target = event.currentTarget instanceof HTMLFormElement
          ? event.currentTarget
          : form;

        window.toastFormData(new FormData(target));
      });

      form.dataset.toastBound = 'true';
    });
  }, 0);
};

export default {
  title: 'Components/Pds Richtext',
  parameters: {
    pds: {
      tags: ['editor', 'richtext', 'forms']
    },
    docs: {
      description: {
        component: 'Rich text editor with markdown support and formatting toolbar. Provide a #showdown import-map entry for best performance; set format="markdown" to keep submitted values as Markdown.'
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
    ${richtextStoryStyles}
    <pds-richtext placeholder="Start typing your rich text here..."
      value="${args.value}"
      @input="${(e) => console.log('Content:', e.target.value)}">
    </pds-richtext>
  `,
  args: {
    
  }
};

// Sample rich text content 
const htmlString = `
<h2>Welcome to the Rich Text Editor</h2>
<p>This is a <strong>rich text editor</strong> component that allows you to create and edit formatted text easily.</p>
<p>Use the toolbar to format your content with headings, lists, links, and more.</p>
`;

const markdownSample = `**Getting Started**

- Write markdown directly in the editor
- Try bold, italics, lists, and links
- Submit the form to inspect the markdown payload

> Markdown mode keeps your formatting exact`;

export const WithContent = () => html`
  ${richtextStoryStyles}
  <pds-richtext value="${htmlString}"></pds-richtext>
`;

export const InForm = () => {
  bindToastForms('.richtext-form');

  return html`
    ${richtextStoryStyles}
    <form class="richtext-form">
      <label>
        <span>Blog Post Content</span>
        <pds-richtext 
          name="blog-content"
          value="<h3>My Blog Post</h3><p>Write your content here...</p>"
        >
        </pds-richtext>
      </label>
      <div class="richtext-form-actions">
        <button type="submit" class="btn-primary">Publish</button>
        <button type="button" class="btn-ghost">Save Draft</button>
      </div>
    </form>
  `;
};

export const ArticleContent = () => html`
  ${richtextStoryStyles}
  <div class="richtext-article-shell">
    <h3>Article Editor</h3>
    <pds-richtext 
      class="richtext-article-editor"
      value="<h2>The Future of Web Development</h2><p>Web development has evolved dramatically over the past decade. Modern frameworks and tools have made it easier than ever to build sophisticated applications.</p><h3>Key Trends</h3><ul><li><strong>Component-Based Architecture</strong> - Reusable, modular components</li><li><strong>Progressive Web Apps</strong> - Native-like experiences on the web</li><li><strong>AI Integration</strong> - Smart features powered by machine learning</li></ul><h3>Best Practices</h3><p>When building modern web applications, consider:</p><ol><li>Performance optimization</li><li>Accessibility standards</li><li>Mobile-first design</li><li>Security considerations</li></ol><blockquote><p>The web is the platform of the future, and it's more powerful than ever before.</p></blockquote><p>For more information, visit <a href='https://example.com'>our documentation</a>.</p>"
    >
    </pds-richtext>
  </div>
`;

ArticleContent.storyName = 'Article Content';

export const EmailComposer = () => {
  bindToastForms('.richtext-email-form');

  return html`
    ${richtextStoryStyles}
    <article class="card richtext-email-card">
      <h3>Compose Email</h3>
      
      <form class="richtext-email-form">
        <label>
          <strong>To:</strong>
          <div class="input-icon">
            <pds-icon icon="envelope"></pds-icon>
            <input
              type="email"
              name="to"
              placeholder="recipient@example.com"
              required>
          </div>
        </label>
        
        <label>
          <strong>Subject:</strong>
          <input type="text" name="subject" placeholder="Email subject" required>
        </label>
        
        <label>
          <strong>Message:</strong>
          <pds-richtext 
            name="email-body"
            value="<p>Hello,</p><p>I hope this message finds you well.</p><p>Best regards,<br><strong>Your Name</strong></p>"
            >
          </pds-richtext>
        </label>
        
        <div class="richtext-email-actions">
          <button type="submit" class="btn-primary">
            <pds-icon icon="arrow-up"></pds-icon>
            Send Email
          </button>
          <button type="button" class="btn-outline">
            <pds-icon icon="upload"></pds-icon>
            Attach File
          </button>
          <button type="button" class="btn-ghost">Save Draft</button>
        </div>
      </form>
    </article>
  `;
};

EmailComposer.storyName = 'Email Composer';
 
export const CommentEditor = () => {
  bindToastForms('.richtext-comment-form');

  return html`
    ${richtextStoryStyles}
    <div class="richtext-comment-shell">
      <article class="card surface-elevated richtext-comment-card">
        <div class="richtext-comment-header">
          <div class="richtext-comment-avatar">
            <pds-icon icon="user"></pds-icon>
          </div>
          <div class="richtext-comment-body">
            <strong>John Doe</strong>
            <p class="richtext-comment-text">This is a great article! I really enjoyed reading about the latest trends in web development. The section on component architecture was particularly insightful.</p>
            <div class="richtext-comment-meta">
              <span>2 hours ago</span>
              <button class="btn-ghost">Reply</button>
              <button class="btn-ghost">Like</button>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <form class="richtext-comment-form">
          <h4>Add a Comment</h4>
          <pds-richtext 
            class="richtext-comment-editor"
            name="comment-body"
            value="<p>Share your thoughts...</p>"
          >
          </pds-richtext>
          <div class="richtext-comment-actions">
            <button type="submit" class="btn-primary">
              <pds-icon icon="chat-circle"></pds-icon>
              Post Comment
            </button>
            <button type="button" class="btn-outline">Cancel</button>
          </div>
        </form>
      </article>
    </div>
  `;
};

CommentEditor.storyName = 'Comment Editor';

export const MarkdownForm = () => {
  bindToastForms('.richtext-markdown-form');

  return html`
    ${richtextStoryStyles}
    <form class="richtext-form richtext-markdown-form">
      <label>
        <span>Release Notes (Markdown)</span>
        <pds-richtext
          name="release-notes"
          format="markdown"
          placeholder="Document your release highlights..."
          value="${markdownSample}"
        ></pds-richtext>
      </label>
      <div class="richtext-form-actions">
        <button type="submit" class="btn-primary">Submit Markdown</button>
        <button type="reset" class="btn-ghost">Reset</button>
      </div>
    </form>
  `;
};

MarkdownForm.storyName = 'Markdown Format';
