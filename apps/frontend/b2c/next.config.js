import { createNextConfig } from '@packages/shared-config/next/base.js';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  // B2C-specific configuration
  webpack: (config, { isServer }) => {
    // Add alias for packages directory to resolve CSS imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@packages': path.resolve('../../../packages'),
    };
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_GATEWAY_URL || 'http://localhost:3000'}/:path*`,
      },
    ];
  },
});

export default nextConfig;