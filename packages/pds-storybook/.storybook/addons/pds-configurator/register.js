import { addons, types } from '@storybook/manager-api';
import { ADDON_ID, TOOL_ID } from './constants.js';
import { Tool } from './Tool.js';
import { SearchTool } from './SearchTool.js';

const SEARCH_TOOL_ID = `${ADDON_ID}/search`;

addons.register(ADDON_ID, () => {
  // Register PDS Configurator button
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'PDS Configurator',
    match: ({ viewMode, tabId }) => !tabId && (viewMode === 'story' || viewMode === 'docs'),
    render: Tool
  });

  // Register Quick Search button
  addons.add(SEARCH_TOOL_ID, {
    type: types.TOOL,
    title: 'Quick Search',
    match: ({ viewMode, tabId }) => !tabId && (viewMode === 'story' || viewMode === 'docs'),
    render: SearchTool
  });
});
