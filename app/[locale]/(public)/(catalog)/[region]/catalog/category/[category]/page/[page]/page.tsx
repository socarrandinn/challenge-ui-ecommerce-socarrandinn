import * as React from "react";
import initTranslations from "@/app/i18n";
import {
  allCategoryService,
  findOneCategory,
} from "@/modules/common/services/category.service";
import { ISR_CATEGORIES_PAGE_NUMBERS } from "@/lib/config/isr-page-numbers.config";
import { generateOgMetadata } from "@/lib/og-image";
import TranslationsProvider from "@/providers/translation-provider";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { data: categories } = await allCategoryService();
  const paths: Array<{ category: string; page: string; region: string }> = [];
  categories?.forEach((category) => {
    Array.from(Array(ISR_CATEGORIES_PAGE_NUMBERS).keys()).forEach((page) => {
      paths.push({
        region: process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
        category: category.id,
        page: String(page),
      });
    });
  });
  return paths;
}

type Props = {
  params: Promise<{
    locale: string;
    page: string;
    category: string;
    region: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const searchParams = await params;
  const { data: categoriesTree } = await allCategoryService({
    headers: { "Accept-Language": searchParams?.locale },
  });

  const getCategoryName = () => {
    if (searchParams?.category) {
      return findOneCategory(categoriesTree, searchParams?.category as string);
    } else {
      return null;
    }
  };

  return await generateOgMetadata({
    title: getCategoryName()?.name || "Catálogo de productos",
    description: `${getCategoryName()?.name || "Catálogo de productos"} | ${
      process.env.NEXT_PUBLIC_STORE_NAME
    }`,
    ogImageParams: {
      type: "catalog",
      title: getCategoryName()?.name || "Catálogo de productos",
      subtitle: `${getCategoryName()?.name || "Catálogo de productos"} | ${
        process.env.NEXT_PUBLIC_STORE_NAME
      }`,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`,
    },
  });
}

const i18nNamespaces = ["catalog", "common", "errors", "breadcrumbs", "menu"];

export default async function Page({ params }: Props) {
  const { locale, page, category, region } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      PRODUCT BY CATEGORY
    </TranslationsProvider>
  );
}
