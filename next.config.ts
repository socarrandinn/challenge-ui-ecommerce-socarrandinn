import type { NextConfig } from 'next';
// import { CDN_PATH } from '@/config/cdn-path.config';

const nextConfig: NextConfig = {
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features para mejor rendimiento
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },

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
