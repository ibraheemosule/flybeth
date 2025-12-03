import { UserConfig } from 'vitest/config';

export interface VitestConfigOptions {
  environment?: 'node' | 'jsdom' | 'happy-dom';
  setupFiles?: string[];
  globals?: boolean;
  coverage?: any;
}

export function createVitestConfig(options?: VitestConfigOptions): UserConfig;

declare const _default: typeof createVitestConfig;
export default _default;
