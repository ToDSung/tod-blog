import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite does not reliably resolve package self-references, so map the package
// name straight onto the source tree (mirrors tsconfig paths and .storybook).
const alias = { '@tod-workspace/ui': path.resolve(dirname, 'src') };

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.browser.test.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['src/**/*.test.tsx'],
          exclude: ['src/**/*.browser.test.tsx'],
          setupFiles: [path.join(dirname, 'vitest.setup.dom.ts')],
        },
      },
      {
        // Tailwind is only needed here: these tests read computed styles, so
        // the real token CSS has to be compiled and loaded.
        plugins: [tailwindcss()],
        resolve: { alias },
        test: {
          name: 'browser',
          include: ['src/**/*.browser.test.{ts,tsx}'],
          setupFiles: [path.join(dirname, 'vitest.setup.browser.ts')],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
