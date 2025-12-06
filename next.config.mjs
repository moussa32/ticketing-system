/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   productionBrowserSourceMaps: false, // disables source maps in prod
experimental: {
    serverActions: true,
  },
};

export default nextConfig;
