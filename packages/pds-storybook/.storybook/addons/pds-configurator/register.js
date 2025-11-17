import { addons, types } from '@storybook/manager-api';
import { ADDON_ID, TOOL_ID } from './constants.js';
import { Tool } from './Tool.js';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'PDS Configurator',
    match: ({ viewMode, tabId }) => !tabId && viewMode === 'story',
    render: Tool
  });
});
