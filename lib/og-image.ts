// Define supported page types
export type PageType = 'homepage' | 'catalog';

export interface OgImageParams {
  type?: PageType;
  title: string;
  subtitle?: string;
  image?: string; // filename relative to public folder
}

/**
 * Generates a URL for dynamic OG image generation
 * @param params - Configuration for the OG image
 * @returns Complete URL for the OG image endpoint
 */
export function getOgImageUrl({
  type = 'homepage',
  title,
  subtitle,
  image
}: OgImageParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const endpoint = `${baseUrl}/api/og`;

  const params = new URLSearchParams({
    type: type.toString(),
    title: title.trim()
  });

  if (subtitle?.trim()) {
    params.append('subtitle', subtitle.trim());
  }

  if (image?.trim()) {
    params.append('image', image.trim());
  }

  return `${endpoint}?${params.toString()}`;
}

/**
 * Utility to truncate text for better OG image display
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate metadata object with OG image for Next.js generateMetadata
 */
export async function generateOgMetadata({
  title,
  description,
  ogImageParams
}: {
  title: string;
  description: string;
  ogImageParams: OgImageParams;
}) {
  return {
    title,
    description,
    type: 'product',
    url: getOgImageUrl(ogImageParams),
    openGraph: {
      title,
      description,
      type: 'website',
      url: getOgImageUrl(ogImageParams),
      images: [
        {
          url: getOgImageUrl(ogImageParams),
          width: 1200,
          height: 640,
          alt: title,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getOgImageUrl(ogImageParams)]
    }
  };
}
