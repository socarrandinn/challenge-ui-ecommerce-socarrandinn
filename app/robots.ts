import { ENV_CONFIG } from "@/lib/config/env.config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: [],
      },
    ],
    sitemap: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}