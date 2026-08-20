import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'storybook-static/**',
      'out/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'eslint.config.mjs',
      'next.config.mjs',
      'postcss.config.mjs',
      'commitlint.config.mjs',
      'vitest.config.ts',
      'playwright.config.ts'
    ]
  },
  ...nextConfig,
  ...storybook.configs['flat/recommended'],
  ...compat.config({
    plugins: ['prettier', 'unicorn', 'check-file'],
    extends: ['plugin:prettier/recommended', 'prettier'],
    rules: {
      'no-use-before-define': 'error',
      strict: ['error', 'safe'],
      'no-debugger': 'error',
      'brace-style': ['error', '1tbs', {allowSingleLine: true}],
      'no-trailing-spaces': 'error',
      'keyword-spacing': 'error',
      'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never'
        }
      ],
      'vars-on-top': 'error',
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'guard-for-in': 'error',
      'no-eval': 'error',
      'no-with': 'error',
      'valid-typeof': 'error',
      eqeqeq: 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-unused-vars': 'error',
      'no-alert': 'error',
      'no-console': 'error',
      'no-continue': 'warn',
      'no-plusplus': 'off',
      'no-useless-escape': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'no-extra-semi': 'error',
      'no-unreachable': 'error',
      'react/prefer-es6-class': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      'no-empty': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'space-in-brackets': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'import/no-unused-modules': 'error'
    }
  }),
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        }
      ]
    }
  }
];

export default eslintConfig;
