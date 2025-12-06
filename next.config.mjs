/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  productionBrowserSourceMaps: false, // disables source maps in prod
  experimental: {
    serverActions: {
      // increase body size limit for file uploads
      bodySizeLimit: '10mb', // adjust as needed
    },
  },
};

export default nextConfig;
