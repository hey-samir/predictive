/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // Output configuration for better hosting compatibility
  output: 'standalone',
};

module.exports = nextConfig;