import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    head: {
      title: 'Ecommerce App',
      meta: [
        { name: 'description', content: 'Ecommerce App - Tienda online' },
        { name: 'keywords', content: 'ecommerce, tienda online, compras online' },
        { name: 'author', content: 'Ecommerce App' },
        { name: 'robots', content: 'index,follow' },
      ],
    },
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    description: 'Ecommerce App - Tienda online',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
  }
}
