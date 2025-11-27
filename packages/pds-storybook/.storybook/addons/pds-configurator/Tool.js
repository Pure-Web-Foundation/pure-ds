import React, { useState, useCallback } from 'react';
import { useChannel } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { EVENTS } from './constants.js';

export const Tool = () => {
  const emit = useChannel({
    [EVENTS.DESIGN_UPDATED]: (data) => {
      console.log('Design updated in addon:', data);
    }
  });

  const openConfigurator = useCallback(() => {
    console.log('Opening PDS Configurator');
    emit(EVENTS.OPEN_CONFIGURATOR);
  }, [emit]);

  return (
    <IconButton
      key="configurator-toggle"
      title="Open PDS Configurator"
      onClick={openConfigurator}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </IconButton>
  );
};
