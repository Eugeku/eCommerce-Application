import tseslintConfig from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslintConfig.config([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslintConfig.configs.strict, unicorn.configs.recommended],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      sourceType: 'module',
      globals: {
        es2022: true,
        node: true,
        browser: true,
      },
    },
    plugins: {
      prettier,
      import: eslintPluginImport,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'max-lines-per-function': ['error', { max: 40, skipComments: true, skipBlankLines: true }],
      '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'off' },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'class-methods-use-this': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/no-nested-ternary': 'warn',
      'unicorn/no-null': 'warn',
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            queryArgs: true,
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
    settings: {
      reportUnusedDisableDirectives: true,
      noInlineConfig: true,
    },
    ignores: [
      '**/node_modules/**',
      '**/deploy/**',
      '**/commitlint.config.js',
      '**/eslint.config.js',
      '**/vite.config.ts',
      '**/base-component.ts',
      '**/coverage/**',
    ],
  },
]);
