import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export function createVitestConfig(options = {}) {
  const {
    setupFiles = [],
    alias = {},
    coverage = {},
  } = options;

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        '@testing-library/jest-dom',
        ...setupFiles,
      ],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.test.{ts,tsx}',
          '**/*.spec.{ts,tsx}',
          '**/vite.config.ts',
          '**/vitest.config.ts',
        ],
        ...coverage,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
        '@components': path.resolve(process.cwd(), './src/components'),
        '@pages': path.resolve(process.cwd(), './src/pages'),
        '@utils': path.resolve(process.cwd(), './src/utils'),
        '@types': path.resolve(process.cwd(), './src/types'),
        '@test': path.resolve(process.cwd(), './src/test'),
        ...alias,
      },
    },
  });
}

export default createVitestConfig;