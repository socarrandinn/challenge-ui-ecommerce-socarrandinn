import { IProduct } from "@/interfaces/product.interface";
import { Metadata } from "next";
import { ENV_CONFIG } from "../config/env.config";

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
      url: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/catalog/${slug}`,
      images: [
        {
          url: product?.image?.src ?? "opengraph-image.png",
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
      images: {
        url: product?.image.src,
        alt: `Imagen de ${product?.name}`,
      },
    },
  };
}