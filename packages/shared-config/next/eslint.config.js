/** @type {import('eslint').Linter.Config} */
const baseEslintConfig = {
  extends: [
    'next/core-web-vitals',
  ],
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    
    // Next.js specific rules
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'warn',
    
    // General rules
    'prefer-const': 'error',
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

module.exports = baseEslintConfig;