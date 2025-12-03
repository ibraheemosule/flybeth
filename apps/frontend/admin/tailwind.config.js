import sharedConfig from '@packages/shared-config/tailwind/base.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  // Admin-specific customizations
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // Admin-specific theme extensions
      colors: {
        ...sharedConfig.theme.extend.colors,
        admin: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
}