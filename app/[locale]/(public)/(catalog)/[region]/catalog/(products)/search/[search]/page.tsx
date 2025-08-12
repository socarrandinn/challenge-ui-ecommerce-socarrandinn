import initTranslations from "@/app/i18n";
import { generateOgMetadata } from "@/lib/og-image";
import { allProduct } from "@/modules/common/services/product.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateMetadata({ searchParams }: Props) {
  const { search, category } = searchParams;

  const title = category
    ? `Resultados de la búsqueda ${category}`
    : `Resultados de la búsqueda para ${search}`;

  const description = category
    ? `Resultados de la búsqueda ${category} | ${process.env.NEXT_PUBLIC_STORE_NAME}`
    : `Resultados de la búsqueda para ${search} | ${process.env.NEXT_PUBLIC_STORE_NAME}`;

  return await generateOgMetadata({
    title,
    description,
    ogImageParams: {
      type: "catalog",
      title,
      subtitle: description,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`,
    },
  });
}

const i18nNamespaces = ["common", "errors"];

type Props = {
  searchParams: any;
  params: Promise<{ locale: string; region: string; search: string }>;
};

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
