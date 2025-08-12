import initTranslations from "@/app/i18n";
import { ICategory } from "@/interfaces/category.interface";
import { generateOgMetadata } from "@/lib/og-image";
import { allProduct } from "@/modules/common/services/product.service";
import { searchStaticCategoriesService } from "@/modules/common/services/static-data.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
    region: string;
    category: string;
  }>;
};

export async function generateStaticParams() {
  try {
    const { data: categories } = await searchStaticCategoriesService();
    const paths: Array<{ category: string; region: string }> = [];

    const popularCategories = categories?.data?.slice(0, 10) || [];

    popularCategories?.forEach((category: ICategory) => {
      paths.push({
        region: process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
        category: category.id,
      });
    });

    return paths;
  } catch (error) {
    console.warn("Error generating static params:", error);
    return [
      {
        region: process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
        category: "1",
      },
    ];
  }
}
export async function generateMetadata({ params }: Props) {
  try {
    const { category } = await params;

    return await generateOgMetadata({
      title: `Categoría ${category} - Productos`,
      description: `Explora productos en la categoría ${category} | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
      ogImageParams: {
        type: "catalog",
        title: `Categoría ${category}`,
        subtitle: `Productos | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
        image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`,
      },
    });
  } catch (error) {
    console.warn("Error generating metadata:", error);
    return {
      title: "Productos",
      description: `Productos | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
    };
  }
}

const i18nNamespaces = ["common", "errors"];

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
