import sharedConfig from '@packages/shared-config/tailwind/base.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  // B2C-specific customizations
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // Keep B2C-specific colors
      colors: {
        ...sharedConfig.theme.extend.colors,
        // B2C brand colors override
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#3b82f6', // B2C specific
          600: '#2563eb', // B2C specific
          700: '#1d4ed8', // B2C specific
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // B2C specific
          600: '#475569', // B2C specific
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
}

