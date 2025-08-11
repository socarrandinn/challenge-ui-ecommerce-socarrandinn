import initTranslations from "@/app/i18n";
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import {
  allCategoryService,
  findOneCategory,
} from "@/modules/common/services/category.service";
import {
  allProduct,
  findOneProduct,
} from "@/modules/common/services/product.service";
import ProductDetail from "@/modules/products/containers/product-details-container";
import TranslationsProvider from "@/providers/translation-provider";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  // fetch data
  const product = await findOneProduct(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.data?.name,
    openGraph: {
      images: [product?.data?.image?.src ?? "", ...previousImages],
    },
  };
}

export async function generateStaticParams(params: any) {
  const { data } = await allProduct();

  if (!data?.length) {
    return [];
  }

  return data?.map((product) => ({
    region: params?.region || process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
    slug: String(product?.id),
    locale: params?.locale || "es",
  }));
}

const i18nNamespaces = ["home", "common", "errors"];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { slug } = await params;
  const { data: product } = await findOneProduct(slug);
  const { data: categories } = await allCategoryService();

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
