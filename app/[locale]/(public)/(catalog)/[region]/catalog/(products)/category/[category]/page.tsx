import initTranslations from "@/app/i18n";
import { ICategory } from "@/interfaces/category.interface";
import { getOneCategoryMetadata } from "@/lib/metadata/category.metadata";
import { allProduct } from "@/modules/common/services/product.service";
import { searchStaticCategoriesService } from "@/modules/common/services/static-data.service";
import ProductListContainer from "@/modules/products/containers/product-list-container";
import TranslationsProvider from "@/providers/translation-provider";
import { Metadata } from "next";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
    region: string;
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, locale } = await params;
  const { data: categories, error } = await searchStaticCategoriesService();

  const categoryObj = categories?.data?.find(
    (c: ICategory) => c.id === category
  );

  if (!categoryObj || error)
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };

  const metadata = getOneCategoryMetadata({
    category: categoryObj as ICategory,
    slug: category,
    locale,
  });

  return metadata;
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
