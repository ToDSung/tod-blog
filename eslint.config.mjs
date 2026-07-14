import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: ['./packages/*/tsconfig.json'],
        },
        node: true,
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'import/consistent-type-specifier-style': ['error'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'type',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/named': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      ...tseslint.configs.disableTypeChecked.languageOptions,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
  {
    // Test and Jest config files are excluded from package tsconfigs,
    // so type-aware parsing cannot resolve them from the repo root.
    files: ['**/*.spec.ts', '**/*.test.ts', '**/jest.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // Storybook and Vitest config/setup files are excluded from package
    // tsconfigs, so type-aware parsing cannot resolve them from the repo root.
    files: [
      '**/.storybook/**/*.ts',
      '**/.storybook/**/*.tsx',
      '**/vitest.config.ts',
      '**/vitest.setup.ts',
      '**/vitest.shims.d.ts',
    ],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    ignores: [
      '**/.next/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/out/**',
      '**/.docusaurus/**',
      '**/coverage/**',
      '**/storybook-static/**',
    ],
  }
);
