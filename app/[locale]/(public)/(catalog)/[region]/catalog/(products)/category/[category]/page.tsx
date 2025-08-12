import initTranslations from "@/app/i18n";
import { generateOgMetadata } from "@/lib/og-image";
import { allProduct } from "@/modules/common/services/product.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateMetadata() {
  return await generateOgMetadata({
    title: "Resultados de la búsqueda",
    description: `Resultados de la búsqueda | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
    ogImageParams: {
      type: "catalog",
      title: "Resultados de la búsqueda",
      subtitle: `Resultados de la búsqueda | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`,
    },
  });
}

const i18nNamespaces = ["common", "errors"];

type Props = {
  params: Promise<{
    locale: string;
    region: string;
    category: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { locale, region, category } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { data, error } = await allProduct({
    category,
    locale,
    region,
  });

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
