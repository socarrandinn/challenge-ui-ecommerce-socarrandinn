import { IProduct } from "@/interfaces/product.interface";
import { Metadata } from "next";

type Props = {
  locale: string,
  product: IProduct,
  slug: string
}
export const getOneProductMetadata = ({ locale, product, slug }: Props): Metadata => {
  return {
    title: `${product?.name}`,
    description: `${product?.description} - price: $${product?.price}`,

    // Open Graph optimizado
    openGraph: {
      title: product?.name ?? '',
      description: product?.description ?? '',
      url: `/catalog/${slug}`,
      siteName: "E-COMMERCE",
      images: [
        {
          url: product?.image?.src ?? "/images/no-image.webp",
          width: product?.image?.width || 1200,
          height: product?.image?.height || 630,
          alt: `Imagen de ${product?.name}`,
          type: "image/webp",
        },
      ],
      locale: locale || "es",
      type: "website",

    },

    // Twitter Cards optimizado
    twitter: {
      card: "summary_large_image",
      title: product?.name,
      description: product?.description,
      site: "e-commerce",
      creator: "@soccarandinn",
      images: {
        url: product?.image.src,
        alt: `Imagen de ${product?.name}`,
      },
    },
    alternates: {
      canonical: `/catalog/page/${slug}`,
      languages: {
        "es-ES": `/es/catalog/page/${slug}`,
        "en-US": `/en/catalog/page/${slug}`,
      },
    },

    // Robots específicos para esta página
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}