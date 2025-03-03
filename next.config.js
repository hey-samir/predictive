/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  // Use SWC minifier for faster builds
  swcMinify: true,
  // Ensure we're using the correct port for Replit
  experimental: {
    serverMinification: true
  }
}

module.exports = nextConfig