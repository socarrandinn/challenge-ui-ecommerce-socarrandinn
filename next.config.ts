import type { NextConfig } from 'next';
// import { CDN_PATH } from '@/config/cdn-path.config';

const nextConfig: NextConfig = {


  async headers() {
    return [
      { source: '/api/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] }
    ];
  },
  redirects: async () => [
    {
      source: '/catalog',
      destination: '/catalog',
      permanent: true
    },
    {
      source: '/:locale/catalog',
      destination: '/:locale/catalog',
      permanent: true
    }
  ]
};

export default nextConfig;
