import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on.*' },
    docs: {
      toc: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
