import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import React, { useEffect, useState } from 'react';
import { Markdown } from '@storybook/blocks';

const ADDON_ID = 'pds-description';
const PANEL_ID = `${ADDON_ID}/panel`;

const DescriptionPanel = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const channel = addons.getChannel();
    
    const updateDescription = (data) => {
      setTitle(data.title || '');
      setDescription(data.description || 'No description available.');
    };

    channel.on('pds-description/update', updateDescription);

    return () => {
      channel.removeListener('pds-description/update', updateDescription);
    };
  }, []);

  return React.createElement('div', {
    style: {
      padding: '1rem',
      height: '100%',
      overflow: 'auto'
    }
  },
    React.createElement('div', {
      style: {
        marginBottom: '0.5rem'
      }
    },
      React.createElement('strong', {
        style: {
          fontSize: '1rem'
        }
      }, title)
    ),
    React.createElement(Markdown, null, description)
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Description',
    render: ({ active }) => {
      return React.createElement(AddonPanel, { active },
        React.createElement(DescriptionPanel)
      );
    }
  });
});
