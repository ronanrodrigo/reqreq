import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'reqreq';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for custom domain with repository path in production
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
};

export default nextConfig;
