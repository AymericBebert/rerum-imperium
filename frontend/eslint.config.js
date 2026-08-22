const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const angularEslint = require('angular-eslint');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = tsEslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.idea',
    ],
  },
  {
    files: ['**/*.ts'],

    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
      ...tsEslint.configs.stylistic,
      ...angularEslint.configs.tsRecommended,
    ],

    processor: angularEslint.processInlineTemplates,

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    plugins: {
      '@stylistic': stylistic,
    },

    rules: {
      'max-len': ['error', {code: 120}],
      'semi': ['error', 'always'],
      'id-blacklist': 'error',
      '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
      '@typescript-eslint/naming-convention': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      }],
      '@angular-eslint/component-selector': ['error', {
        type: 'element',
        prefix: 'app',
        style: 'kebab-case',
      }],

      '@angular-eslint/directive-selector': ['error', {
        type: 'attribute',
        prefix: 'app',
        style: 'camelCase',
      }],
    },
  },
  {
    files: ['**/*.html'],

    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],

    rules: {
      'max-len': ['error', {code: 120}],
      '@angular-eslint/template/eqeqeq': ['error', {allowNullOrUndefined: true}],
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      // '@angular-eslint/template/mouse-events-have-key-events': 'off',
    },
  },
);
