/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, { canvas: 'canvas' }],
  }),
};

module.exports = nextConfig;
