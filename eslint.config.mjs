import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
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
    // packages/ui is written with arrow functions only (spec D13,
    // .agents/docs/ui-conventions.md). These rules must live in the root
    // config: `npx eslint .`, lint-staged and CI all run from the repo root,
    // and flat config only loads the config file at the cwd, so a rule in
    // packages/ui/eslint.config.mjs would never run for them.
    files: ['packages/ui/src/**/*.ts', 'packages/ui/src/**/*.tsx'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: ['key', 'ref'],
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportNamespaceSpecifier[local.name='React']",
          message:
            "Import React APIs one by one (e.g. import type { ComponentProps } from 'react'), not as a namespace.",
        },
        {
          selector: "TSQualifiedName[left.name='React']",
          message:
            'Use the imported type directly (ComponentProps), not React.ComponentProps.',
        },
        {
          selector: "MemberExpression[object.name='React']",
          message:
            'Import the React API by name instead of reaching through the React namespace.',
        },
        {
          selector: 'ExportNamedDeclaration:not([declaration]):not([source])',
          message:
            'Export inline with `export const` (or `export default` for the main component); no trailing export block. Re-exports with `from` are fine.',
        },
      ],
    },
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
