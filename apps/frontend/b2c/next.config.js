const { createNextConfig } = require("@packages/shared-config/next/base.js");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  // B2C-specific configuration
  transpilePackages: [
    "@packages/shared-frontend",
    "@packages/shared-utils",
    "@packages/shared-schemas",
  ],
  webpack: (config, { isServer }) => {
    // Add alias for packages directory to resolve imports
    config.resolve.alias = {
      ...config.resolve.alias,
      "@packages": path.resolve(__dirname, "../../../packages"),

      "@packages/shared-frontend": path.resolve(
        __dirname,
        "../../../packages/shared-frontend/src"
      ),
      "@packages/shared-utils": path.resolve(
        __dirname,
        "../../../packages/shared-utils/src"
      ),
      "@packages/shared-schemas": path.resolve(
        __dirname,
        "../../../packages/shared-schemas/src"
      ),
      "@packages/shared-config": path.resolve(
        __dirname,
        "../../../packages/shared-config"
      ),
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
