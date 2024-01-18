/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, max-age=0, must-revalidate',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
