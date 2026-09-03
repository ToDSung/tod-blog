import '../src/styles/globals.css';

import type { Decorator, Preview } from '@storybook/react-vite';

/**
 * Theme (data-theme attribute) and mode (.dark class) are orthogonal (spec
 * D9); both toolbars apply to the documentElement so portaled content
 * (dropdowns, dialogs) is themed too.
 */
const withThemeAndMode: Decorator = (Story, context) => {
  const { theme, mode } = context.globals;
  const root = document.documentElement;

  if (typeof theme === 'string' && theme !== 'professional') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
  root.classList.toggle('dark', mode === 'dark');

  return Story();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme (data-theme attribute)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['professional', 'ocean'],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Light or dark mode (.dark class)',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'professional',
    mode: 'light',
  },
  decorators: [withThemeAndMode],
};

export default preview;
