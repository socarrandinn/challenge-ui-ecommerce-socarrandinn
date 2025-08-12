import initTranslations from "@/app/i18n";
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import { getOneProductMetadata } from "@/lib/metadata/product.metadata";
import {
  allCategory,
  findOneCategory,
} from "@/modules/common/services/category.service";
import { findOneProduct } from "@/modules/common/services/product.service";
import ProductDetail from "@/modules/products/containers/product-details-container";
import TranslationsProvider from "@/providers/translation-provider";
import { Metadata } from "next";


export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const { data: product, error } = await findOneProduct(slug);

  if (!product || error)
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };

  const metadata = getOneProductMetadata({
    product: product as IProduct,
    slug,
    locale,
  });

  return metadata;
}

const i18nNamespaces = ["home", "common", "errors"];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { slug } = await params;
  const { data: product } = await findOneProduct(slug);
  const { data: categories } = await allCategory();

  const category = findOneCategory(categories, product?.id as string);

  return (
    <div className="w-full">
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <ProductDetail
          product={product as IProduct}
          category={category as ICategory}
        />
      </TranslationsProvider>
    </div>
  );
}
