/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper handling of serverless functions
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Allow larger PDF uploads
    },
  },
  // Increase API route timeout if needed (Vercel default is 10s)
  // This is handled by platform settings, not config
};

module.exports = nextConfig;
