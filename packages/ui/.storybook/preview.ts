import '../src/styles/globals.css';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Spec D11c: a11y violations must fail the vitest run, not just warn
      // in the addon panel.
      test: 'error',
    },
  },
};

export default preview;
