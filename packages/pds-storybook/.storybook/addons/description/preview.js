import { addons } from '@storybook/preview-api';

export const withDescription = (StoryFn, context) => {
  const channel = addons.getChannel();
  const description = context.parameters?.docs?.description?.component || '';
  const title = context.title || '';

  // Send description to the panel
  channel.emit('pds-description/update', {
    title,
    description
  });

  return StoryFn();
};
