/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  experimental: {
    serverActions: true,
  },
  // Output configuration for better hosting compatibility
  output: 'standalone',
  webpack(config) {
    return config;
  }
};

module.exports = nextConfig;