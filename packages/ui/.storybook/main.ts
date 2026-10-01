import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        // Vite does not reliably resolve package self-references, so map the
        // package name straight onto the source tree (mirrors tsconfig paths).
        alias: {
          '@tod-workspace/ui': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};

export default config;
