import initTranslations from "@/app/i18n";
import { ENV_CONFIG } from "@/lib/config/env.config";
import { allProduct } from "@/modules/common/services/product.service";

import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; region: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region } = await params;
  const { data: products, error } = await allProduct({
    locale,
    region,
  });

  if (products?.length === 0 || error)
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };

  return {
    title: "E-COMMERCE - Catálogo de productos",
    description: "Catálogo de productos",
    openGraph: {
      title: "E-COMMERCE - Catálogo de productos",
      description: "Catálogo de productos",
      url: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/catalog/page`,
      images: products?.slice(0, 10)?.map((p) => ({
        url: `${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}${
          p?.image?.src || p?.image?.thumb
        }`,
        width: 200,
        height: 200,
        alt: `Imagen de ${p?.name}`,
        type: "image/webp",
      })),
      locale: locale || "es",
      type: "website",
    },
  };
}

const i18nNamespaces = ["home", "common", "errors"];

export default async function Home({ params }: Props) {
  const { locale, region } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { data } = await allProduct({ locale, region });

  return (
    <div className="w-full">
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <ProductListContainer products={data || []} />
      </TranslationsProvider>
    </div>
  );
}
