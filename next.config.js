const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Allows production builds to complete successfully even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to complete successfully even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias['@life-for-all/types'] = path.resolve(__dirname, 'types.d.ts');
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
