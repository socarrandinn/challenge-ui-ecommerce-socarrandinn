import initTranslations from "@/app/i18n";
import { allProduct } from "@/modules/common/services/product.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";

type Props = {
  params: Promise<{ locale: string; region: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata() {
  return {
    title: "Catálogo de productos",
    description: `Catálogo de productos `,
    ogImageParams: {
      type: "catalog",
      title: "Catálogo de productos",
      subtitle: `Catálogo de productos `,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`,
    },
  };
}

const i18nNamespaces = ["home", "common", "errors"];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { data } = await allProduct({});

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
