const { createNextConfig } = require("@packages/shared-config/next/base.js");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  // Admin-specific configuration
  transpilePackages: [
    "@packages/shared-auth",
    "@packages/shared-frontend",
    "@packages/shared-utils",
    "@packages/shared-schemas",
  ],
  webpack: (config, { isServer }) => {
    // Add alias for packages directory to resolve CSS imports
    config.resolve.alias = {
      ...config.resolve.alias,
      "@packages": path.resolve("../../../packages"),
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.API_GATEWAY_URL || "http://localhost:5000"
        }/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
