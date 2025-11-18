import React, { useState, useCallback } from 'react';
import { useChannel } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { EVENTS } from './constants.js';

export const SearchTool = () => {
  const [isOpen, setIsOpen] = useState(false);

  const channel = useChannel({
    [EVENTS.QUERY_EXECUTED + '_RESPONSE']: (data) => {
      console.log('Query response received:', data);
    }
  });

  const toggleSearch = useCallback(() => {
    const newState = !isOpen;
    console.log('Toggle search - current isOpen:', isOpen, 'newState:', newState);
    
    if (newState) {
      // Emit event to open search in preview
      const searchQuery = prompt('Enter search query (e.g., "primary color", "spacing", "button"):');
      if (searchQuery) {
        console.log('Executing search query:', searchQuery);
        channel.emit(EVENTS.QUERY_EXECUTED, { query: searchQuery });
      }
    }
    
    setIsOpen(newState);
  }, [isOpen, channel]);

  return (
    <IconButton
      key="search-tool"
      active={isOpen}
      title="Quick Search PDS"
      onClick={toggleSearch}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </IconButton>
  );
};
