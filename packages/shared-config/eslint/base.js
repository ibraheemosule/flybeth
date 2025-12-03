import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];

export const nodeConfig = [
  ...baseConfig,
  {
    env: {
      node: true,
      es6: true,
    },
    rules: {
      'no-console': 'off', // Allow console in Node.js
    },
  },
];

export const reactConfig = [
  ...baseConfig,
  {
    env: {
      browser: true,
      es6: true,
    },
    extends: ['plugin:react-hooks/recommended'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

export const reactNativeConfig = [
  ...baseConfig,
  {
    env: {
      'react-native/react-native': true,
    },
    rules: {
      'no-console': 'off', // Allow console in React Native for debugging
    },
  },
];