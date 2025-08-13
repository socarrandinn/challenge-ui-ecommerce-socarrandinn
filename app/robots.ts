import { ENV_CONFIG } from "@/lib/config/env.config";

const baseUrl = ENV_CONFIG.env.NEXT_PUBLIC_APP_URL

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
