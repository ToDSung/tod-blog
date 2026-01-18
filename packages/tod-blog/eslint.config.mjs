import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...rootConfig,
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended'
  ),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-html-link-for-pages': [
        'error',
        path.join(__dirname, 'app'),
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['.next/**', 'dist/**', 'out/**', 'node_modules/**'],
  },
];
