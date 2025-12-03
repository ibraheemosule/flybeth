import sharedConfig from '@packages/shared-config/tailwind/base.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  // B2B-specific customizations
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // B2B business-focused colors
      colors: {
        ...sharedConfig.theme.extend.colors,
        // B2B brand colors
        business: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
    },
  },
}