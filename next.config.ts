import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [140, 200, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  redirects: async () => [],
};

export default nextConfig;
