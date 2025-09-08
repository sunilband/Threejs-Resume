/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/resume",
      },
    ];
  },
};

module.exports = nextConfig;
