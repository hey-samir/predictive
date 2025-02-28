/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // This helps with routing in dev mode
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Configure rewrites for Streamlit integration
  async rewrites() {
    return [
      // Streamlit runs on port 5000
      {
        source: '/streamlit/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ];
  },
  // Add output configuration for better hosting compatibility
  output: 'standalone',
};

module.exports = nextConfig;