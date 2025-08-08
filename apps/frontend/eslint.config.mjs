import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default fixupConfigRules([
  ...compat.extends('next/core-web-vitals'),
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      prettier: prettierPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Disable conflicting base rules
      'no-unused-vars': 'off',

      // Unused vars via TS-aware rule
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Remove unused imports
      'unused-imports/no-unused-imports': 'error',

      // (Optional) Remove unused vars but show as warning (or disable completely)
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@next/next/no-duplicate-head': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              '^react',
              '^@?\\w',
              '^(@)(/.*|$)',
              '^\\u0000',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              '^.+\\.s?css$',
            ],
          ],
        },
      ],

      'prettier/prettier': 'warn',
    },
  },
]);
