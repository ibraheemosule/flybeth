/** @type {import('next').NextConfig} */
export const baseNextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_GATEWAY_URL || 'http://localhost:3000'}/:path*`,
      },
    ];
  },
};

export default baseNextConfig;