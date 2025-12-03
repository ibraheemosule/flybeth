import { Config } from 'tailwindcss';

export interface TailwindConfigOptions {
  content?: string[];
  theme?: Record<string, any>;
  plugins?: any[];
}

export function createTailwindConfig(options?: TailwindConfigOptions): Config;

declare const _default: Config;
export default _default;
