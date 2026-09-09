/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',

  transpilePackages: ['@tod-workspace/ui'],

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
