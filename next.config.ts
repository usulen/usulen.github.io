import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Set basePath to your GitHub repo name when deploying to GitHub Pages.
  // Change 'tmu-usul' to your actual repository name.
  basePath: isProd ? '/usulen' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
