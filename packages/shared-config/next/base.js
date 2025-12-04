/** @type {import('next').NextConfig} */
const baseNextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ["localhost"],
  },
  typedRoutes: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};

/**
 * Create a Next.js configuration with base settings and custom overrides
 * @param {import('next').NextConfig} customConfig - Custom configuration to merge
 * @returns {import('next').NextConfig}
 */
function createNextConfig(customConfig = {}) {
  return {
    ...baseNextConfig,
    ...customConfig,
    typescript: {
      ...baseNextConfig.typescript,
      ...customConfig.typescript,
    },
    eslint: {
      ...baseNextConfig.eslint,
      ...customConfig.eslint,
    },
    images: {
      ...baseNextConfig.images,
      ...customConfig.images,
    },
    async rewrites() {
      const baseRewrites = await baseNextConfig.rewrites();
      const customRewrites = customConfig.rewrites
        ? await customConfig.rewrites()
        : [];
      return [...baseRewrites, ...customRewrites];
    },
  };
}

module.exports = { baseNextConfig, createNextConfig };
