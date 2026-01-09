import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useChannel } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { EVENTS } from './constants.js';
import { styled, useTheme } from '@storybook/theming';
import { loadShiki, escapeHtml } from '../../shiki.js';

const Container = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  background: ${props => props.theme.background.content};
`;

const CodeBlock = styled.pre`
  margin: 0;
  padding: 16px;
  padding-bottom: ${props => (props.$compact ? '24px' : '60px')}; /* Space for fixed button */
  font-family: 'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 13.6px;
  line-height: 24px;
  color: ${props => props.theme.color.defaultText};
  background: transparent;
  tab-size: 2;

  /* Shiki generates its own pre/code, style the inner content */
  .shiki {
    background: transparent !important;
    margin: 0;
    padding: 0;
  }

  .shiki code {
    background: transparent;
    font-family: inherit !important;
  }
`;

const SectionWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.appBorderColor};

  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionHeading = styled.h3`
  margin: 0;
  padding: 16px 16px 0;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${props => props.theme.color.mediumdark};
`;

const Subheading = styled.h4`
  margin: 0;
  padding: 12px 16px 0;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${props => props.theme.color.mediumdark};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.color.mediumdark};
  text-align: center;
  padding: 20px;
`;

const CopyButton = styled(IconButton)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 10;
  background: ${props => props.theme.background.app};
  border: 1px solid ${props => props.theme.appBorderColor};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: ${props => props.theme.background.hoverable};
  }
  
  &.copied {
    background: ${props => props.theme.color.positive};
    color: white;
    border-color: ${props => props.theme.color.positive};
  }
`;

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="3" y="3" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M5 3V2C5 1.44772 5.44772 1 6 1H12C12.5523 1 13 1.44772 13 2V10C13 10.5523 12.5523 11 12 11H11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Panel = ({ active }) => {
  const [source, setSource] = useState({ markup: '', jsonForms: [] });
  const [copied, setCopied] = useState(false);
  const [highlightedMarkup, setHighlightedMarkup] = useState('');
  const [highlightedJsonForms, setHighlightedJsonForms] = useState([]);
  const shikiRef = useRef(null);
  
  // Get Storybook theme to detect light/dark mode
  const storybookTheme = useTheme();
  const shikiTheme = storybookTheme.base === 'dark' ? 'github-dark' : 'github-light';

  // Load Shiki once on mount
  useEffect(() => {
    loadShiki().then(highlighter => {
      shikiRef.current = highlighter;
    });
  }, []);

  // Highlight markup when source or theme changes
  useEffect(() => {
    if (!source.markup) {
      setHighlightedMarkup('');
      return;
    }

    const highlighter = shikiRef.current;
    if (highlighter) {
      try {
        const html = highlighter.codeToHtml(source.markup, {
          lang: 'html',
          theme: shikiTheme
        });
        setHighlightedMarkup(html);
      } catch (err) {
        setHighlightedMarkup(`<pre><code>${escapeHtml(source.markup)}</code></pre>`);
      }
    } else {
      // Fallback while Shiki loads
      setHighlightedMarkup(`<pre><code>${escapeHtml(source.markup)}</code></pre>`);
      // Retry when Shiki becomes available
      loadShiki().then(hl => {
        if (hl && source.markup) {
          try {
            const html = hl.codeToHtml(source.markup, { lang: 'html', theme: shikiTheme });
            setHighlightedMarkup(html);
          } catch (err) {
            // Keep fallback
          }
        }
      });
    }
  }, [source.markup, shikiTheme]);

  // Highlight jsonForms schemas when source or theme changes
  useEffect(() => {
    if (!source.jsonForms || source.jsonForms.length === 0) {
      setHighlightedJsonForms([]);
      return;
    }

    const highlightJsonCode = async (code) => {
      if (!code) return '';
      const highlighter = shikiRef.current || await loadShiki();
      if (highlighter) {
        try {
          return highlighter.codeToHtml(code, { lang: 'json', theme: shikiTheme });
        } catch (err) {
          return `<pre><code>${escapeHtml(code)}</code></pre>`;
        }
      }
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    };

    const processJsonForms = async () => {
      const highlighted = await Promise.all(
        source.jsonForms.map(async (form, index) => ({
          id: form.id ?? index,
          label: form.label,
          jsonSchema: await highlightJsonCode(form.jsonSchema),
          uiSchema: await highlightJsonCode(form.uiSchema),
          options: await highlightJsonCode(form.options)
        }))
      );
      setHighlightedJsonForms(highlighted);
    };

    processJsonForms();
  }, [source.jsonForms, shikiTheme]);

  useChannel({
    [EVENTS.UPDATE_HTML]: (payload) => {
      if (typeof payload === 'string') {
        setSource({ markup: payload || '', jsonForms: [] });
        return;
      }

      if (payload && typeof payload === 'object') {
        setSource({
          markup: payload.markup || '',
          jsonForms: Array.isArray(payload.jsonForms) ? payload.jsonForms : []
        });
        return;
      }

      setSource({ markup: '', jsonForms: [] });
    }
  });

  // Request HTML update when panel becomes active
  React.useEffect(() => {
    if (active && !source.markup && source.jsonForms.length === 0) {
      // Trigger a re-extraction by emitting a request event
      // The decorator will pick this up on the next render cycle
      const container = document.querySelector('#storybook-root');
      if (container && container.innerHTML) {
        // Panel just became active, HTML might already be there
        // Give it a moment to process
        setTimeout(() => {
          // This will be caught by subsequent decorator runs
        }, 100);
      }
    }
  }, [active, source.markup, source.jsonForms.length]);

  const copyToClipboard = useCallback(async () => {
    try {
      if (!source.markup) return;
      await navigator.clipboard.writeText(source.markup);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [source.markup]);

  const hasMarkup = Boolean(source.markup);
  const hasJsonForms = source.jsonForms.length > 0;

  if (!hasMarkup && !hasJsonForms) {
    return (
      <Container>
        <EmptyState>
          <p>No code to display</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Select a story to inspect its output</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {hasMarkup && (
        <SectionWrapper>
          <SectionHeading>Markup</SectionHeading>
          <CodeBlock dangerouslySetInnerHTML={{ __html: highlightedMarkup }} />
        </SectionWrapper>
      )}

      {hasJsonForms && source.jsonForms.map((sourceForm, index) => {
        const key = sourceForm.id ?? index;
        const highlightedForm = highlightedJsonForms[index];
        const heading = source.jsonForms.length > 1 ? (sourceForm.label || `Form ${index + 1}`) : 'pds-jsonform';

        return (
          <SectionWrapper key={key}>
            <SectionHeading>{heading}</SectionHeading>

            {sourceForm.jsonSchema && (
              <>
                <Subheading>jsonSchema</Subheading>
                <CodeBlock 
                  $compact 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightedForm?.jsonSchema || `<pre><code>${escapeHtml(sourceForm.jsonSchema)}</code></pre>` 
                  }} 
                />
              </>
            )}

            {sourceForm.uiSchema && (
              <>
                <Subheading>uiSchema</Subheading>
                <CodeBlock 
                  $compact 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightedForm?.uiSchema || `<pre><code>${escapeHtml(sourceForm.uiSchema)}</code></pre>` 
                  }} 
                />
              </>
            )}

            {sourceForm.options && (
              <>
                <Subheading>options</Subheading>
                <CodeBlock 
                  $compact 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightedForm?.options || `<pre><code>${escapeHtml(sourceForm.options)}</code></pre>` 
                  }} 
                />
              </>
            )}
          </SectionWrapper>
        );
      })}

      {hasMarkup && (
        <CopyButton
          onClick={copyToClipboard}
          title={copied ? 'Copied!' : 'Copy markup'}
          className={copied ? 'copied' : ''}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </CopyButton>
      )}
    </Container>
  );
};
