import { defineConfig } from 'vitest/config';
import { createVitestConfig } from '../../../packages/shared-config/vitest/base.js';

export default defineConfig(createVitestConfig({
  name: 'Admin Frontend',
  includePaths: ['src/**/*.{test,spec}.{ts,tsx}']
}));