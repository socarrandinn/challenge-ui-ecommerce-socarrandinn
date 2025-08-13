import initTranslations from "@/app/i18n";
import { allProduct } from "@/modules/common/services/product.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";
import { Metadata } from "next";

export const revalidate = 60;

export const dynamicParams = true;

type Props = {
  params: Promise<{ locale: string; region: string; search: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { search } = await params;

  return {
    title: `Buscar productos: ${search}`,
    description: `Resultados de la búsqueda: ${search}`,
  };
}

const i18nNamespaces = ["common", "errors"];

export default async function Page({ params }: Props) {
  const { locale, region, search } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { data, error } = await allProduct({ search, locale, region });

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ProductListContainer products={data || []} error={error} />
    </TranslationsProvider>
  );
}
