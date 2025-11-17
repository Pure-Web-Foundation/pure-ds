import React, { useEffect, useState, useCallback } from 'react';
import { useGlobals, useChannel } from '@storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { EVENTS } from './constants.js';

export const Tool = () => {
  const [globals, updateGlobals] = useGlobals();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const channel = useChannel({
    [EVENTS.DESIGN_UPDATED]: (data) => {
      console.log('Design updated in addon:', data);
    }
  });

  const toggleConfigurator = useCallback(() => {
    const newState = !isOpen;
    console.log('Toggle configurator - current isOpen:', isOpen, 'newState:', newState);
    const eventToEmit = newState ? EVENTS.OPEN_CONFIGURATOR : EVENTS.CLOSE_CONFIGURATOR;
    console.log('Emitting event:', eventToEmit);
    channel.emit(eventToEmit);
    setIsOpen(newState);
  }, [isOpen, channel]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // Execute PDS query in the preview iframe
    channel.emit(EVENTS.QUERY_EXECUTED, { query });
    
    // Results will come back via channel (implemented in preview)
    // For now, show placeholder
    setSearchResults([
      { id: '1', title: `Searching for: ${query}...`, onClick: () => {} }
    ]);
  }, [channel]);

  const searchLinks = searchResults.map(result => ({
    id: result.id,
    title: result.title,
    onClick: result.onClick
  }));

  return (
    <>
      {/* Configurator Toggle Button */}
      <IconButton
        key="configurator-toggle"
        active={isOpen}
        title="Open PDS Configurator"
        onClick={toggleConfigurator}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </IconButton>

      {/* Quick Search / Omnibox */}
      <WithTooltip
        key="pds-search"
        placement="bottom"
        trigger="click"
        closeOnOutsideClick
        tooltip={
          <div style={{ minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search tokens, components..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none'
              }}
              autoFocus
            />
            {searchResults.length > 0 && (
              <TooltipLinkList links={searchLinks} />
            )}
          </div>
        }
      >
        <IconButton
          key="search-button"
          title="Search PDS (Quick Query)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </IconButton>
      </WithTooltip>
    </>
  );
};
