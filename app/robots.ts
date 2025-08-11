import { MetadataRoute } from "next"

export function restrictiveRobots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com'

  return {
    rules: {
      userAgent: '*',
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}