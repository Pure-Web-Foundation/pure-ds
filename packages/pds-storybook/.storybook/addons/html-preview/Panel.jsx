import React, { useState, useCallback } from 'react';
import { useChannel } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { EVENTS } from './constants.js';
import { styled } from '@storybook/theming';

const Container = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  background: ${props => props.theme.background.content};
`;

const CodeBlock = styled.pre`
  margin: 0;
  padding: 16px;
  padding-bottom: 60px; /* Space for fixed button */
  font-family: ${props => props.theme.typography.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
  color: ${props => props.theme.color.defaultText};
  background: transparent;
  tab-size: 2;
  
  .html-token-tag {
    color: #e06c75;
  }
  
  .html-token-attr {
    color: #d19a66;
  }
  
  .html-token-value {
    color: #98c379;
  }
  
  .html-token-comment {
    color: #5c6370;
    font-style: italic;
  }
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

export const Panel = () => {
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  useChannel({
    [EVENTS.UPDATE_HTML]: (newHtml) => {
      setHtml(newHtml || '');
    }
  });

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [html]);

  const highlightHTML = useCallback((code) => {
    if (!code) return '';
    
    let result = '';
    let i = 0;
    
    const escapeHtml = (text) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };
    
    while (i < code.length) {
      // Handle HTML comments
      if (code.substr(i, 4) === '<!--') {
        const end = code.indexOf('-->', i);
        if (end !== -1) {
          const comment = code.substring(i, end + 3);
          result += `<span class="html-token-comment">${escapeHtml(comment)}</span>`;
          i = end + 3;
          continue;
        }
      }
      
      // Handle tags
      if (code[i] === '<') {
        const tagEnd = code.indexOf('>', i);
        if (tagEnd !== -1) {
          const tagContent = code.substring(i + 1, tagEnd);
          result += '&lt;';
          
          // Check if it's a closing tag
          if (tagContent[0] === '/') {
            result += '/';
            const tagName = tagContent.substring(1).split(/[\s>]/)[0];
            result += `<span class="html-token-tag">${escapeHtml(tagName)}</span>`;
          } else {
            // Parse tag name and attributes
            const parts = tagContent.match(/^([\w-]+)([\s\S]*?)(\/?)?$/);
            if (parts) {
              const [, tagName, attrsStr, slash] = parts;
              result += `<span class="html-token-tag">${escapeHtml(tagName)}</span>`;
              
              // Parse attributes
              if (attrsStr.trim()) {
                const attrRegex = /([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;
                let match;
                let lastIndex = 0;
                
                while ((match = attrRegex.exec(attrsStr)) !== null) {
                  result += escapeHtml(attrsStr.substring(lastIndex, match.index));
                  
                  const [fullMatch, attrName, doubleQuoted, singleQuoted, unquoted] = match;
                  result += `<span class="html-token-attr">${escapeHtml(attrName)}</span>`;
                  
                  if (doubleQuoted !== undefined) {
                    result += `=<span class="html-token-value">"${escapeHtml(doubleQuoted)}"</span>`;
                  } else if (singleQuoted !== undefined) {
                    result += `=<span class="html-token-value">'${escapeHtml(singleQuoted)}'</span>`;
                  } else if (unquoted !== undefined) {
                    result += `=<span class="html-token-value">${escapeHtml(unquoted)}</span>`;
                  }
                  
                  lastIndex = match.index + fullMatch.length;
                }
                
                result += escapeHtml(attrsStr.substring(lastIndex));
              }
              
              if (slash) result += '/';
            }
          }
          
          result += '&gt;';
          i = tagEnd + 1;
          continue;
        }
      }
      
      // Regular text
      result += escapeHtml(code[i]);
      i++;
    }
    
    return result;
  }, []);

  return (
    <Container>
      {html ? (
        <>
          <CodeBlock>
            <code dangerouslySetInnerHTML={{ __html: highlightHTML(html) }} />
          </CodeBlock>
          <CopyButton
            onClick={copyToClipboard}
            title={copied ? 'Copied!' : 'Copy HTML'}
            className={copied ? 'copied' : ''}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </CopyButton>
        </>
      ) : (
        <EmptyState>
          <p>No HTML to display</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Select a story to view its HTML source</p>
        </EmptyState>
      )}
    </Container>
  );
};
