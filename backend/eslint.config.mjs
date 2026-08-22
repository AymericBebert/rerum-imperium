import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ignores: [
      "**/node_modules",
      "**/coverage",
      "**/dist",
      "**/.idea",
    ],
  },
  {
    ...eslint.configs.recommended,
    files: ['**/*.ts'],
  },
  ...tsEslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
    },
    rules: {
      'max-len': ['error', {code: 120}],
      'semi': [2, 'always'],
      '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/no-misused-promises': ['error', {checksVoidReturn: false}],

      '@typescript-eslint/no-restricted-types': ['error', {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },

          Function: {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },

          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          },

          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
          },

          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
          },

          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
          },
        },
      }],
    },
  },
);
