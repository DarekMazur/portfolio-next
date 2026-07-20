import { fixupPluginRules } from '@eslint/compat'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/.next/*',
      '**/dist/*',
      '**/build/*',
      '*.config.js',
      '*.config.mjs',
      '/posts/*',
      '**/next-env.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      import: fixupPluginRules(importPlugin),
      '@next/next': nextPlugin,
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-shadow': 'off',
      'arrow-body-style': 'off',
      curly: ['error', 'all'],
      'import/extensions': 'off',
      'react/button-has-type': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': 'off',
      'import/prefer-default-export': 'warn',
      semi: 'off',
      'react/function-component-definition': 'off',
      indent: 'off',
      'max-len': 'off',
      'comma-dangle': 'off',
      'no-redeclare': 'off',
      'react/jsx-indent': 'off',
      'no-unused-vars': 'off',
      'operator-linebreak': 'off',
      'object-curly-newline': 'off',
      'function-paren-newline': 'off',
      'implicit-arrow-newline': 'off',
      'react/require-default-props': 'off',
      'nonblock-statement-body-position': 'off',
      'react/jsx-one-expression-per-line': 'off',
    },
  },
]
