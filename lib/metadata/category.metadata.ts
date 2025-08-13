import { Metadata } from "next";
import { ENV_CONFIG } from "../config/env.config";
import { ICategory } from "@/interfaces/category.interface";

type Props = {
  locale: string,
  category: ICategory,
  slug: string,
  search?: string
}

export const getOneCategoryMetadata = ({ locale, category, slug, search }: Props): Metadata => {
  const title = search ? `Resultados de búsqueda: ${search}` : `Categoría: ${category?.name}`;
  const description = search ? `Resultados para la búsqueda: ${search}` : `Descripción de la categoría: ${category?.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/catalog/${slug}`,
      images: [
        {
          url: "opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `Imagen de ${category?.name}`,
          type: "image/webp",
        },
      ],
      locale: locale || "es",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: {
        url: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
        alt: `Imagen de ${category?.name}`,
      },
    },
  };
}
