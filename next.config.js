/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  // Use SWC minifier for faster builds
  swcMinify: true,
  // Port configuration handled by Replit automatically
  experimental: {
    // Enable server-side minification for better performance
    serverMinification: true
  }
}

module.exports = nextConfig