import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tseslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rules live in the root eslint.config.mjs — flat config only reads the cwd's
// file, and lint always runs from the repo root. This file is parser wiring.
export default [
  ...rootConfig,
  {
    // TypeScript source files (included in tsconfig.json)
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Storybook and Vitest config/setup files are excluded from tsconfig.json,
    // so type-aware parsing cannot resolve them.
    files: [
      '.storybook/**/*.ts',
      '.storybook/**/*.tsx',
      'vitest.config.ts',
      'vitest.setup*.ts',
      'vitest.shims.d.ts',
    ],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['node_modules/**', 'storybook-static/**', 'dist/**'],
  },
];
