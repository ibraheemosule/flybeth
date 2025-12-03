import { UserConfig } from 'vite';

export interface ViteConfigOptions {
  port?: number;
  host?: string;
  alias?: Record<string, string>;
  env?: Record<string, any>;
}

export function createViteConfig(options?: ViteConfigOptions): UserConfig;

declare const _default: typeof createViteConfig;
export default _default;
