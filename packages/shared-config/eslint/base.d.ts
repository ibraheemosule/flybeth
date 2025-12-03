import { ESLint } from 'eslint';

export interface ESLintConfigOptions {
  react?: boolean;
  typescript?: boolean;
  node?: boolean;
}

export function createESLintConfig(options?: ESLintConfigOptions): ESLint.ConfigData;

declare const _default: ESLint.ConfigData;
export default _default;
