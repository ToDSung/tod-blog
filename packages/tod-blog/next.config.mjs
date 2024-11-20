/**
 * @type {import('next').NextConfig}
 */

import { withPigment } from '@pigment-css/nextjs-plugin';

const nextConfig = {
  // output: 'export',
};

const pigmentConfig = {
  // transformLibraries: ['@mui/material'],
};

export default withPigment(nextConfig, pigmentConfig);
