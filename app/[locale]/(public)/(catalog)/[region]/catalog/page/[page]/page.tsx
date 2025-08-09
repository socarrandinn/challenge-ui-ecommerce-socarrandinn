import ProductList from '@/components/catalog/product-list.component';
import * as React from 'react';
import { ISR_PRODUCTS_PAGE_NUMBERS } from '@/config/isr-page-numbers.config';
import { ApiResponse } from '@/definitions/core/auth.interfaces';
import { SearchResponse } from '@/definitions/common/search-response.interface';
import { Product } from '@/definitions/product.interface';
import { searchCatalog } from '@/modules/products/services/search-catalog';
import FiltersLayout from '@/modules/products/components/filters-layout/filters-layout';
import LargePagination from '@/components/core/pagination/large-pagination-catalog';
import { getTreeCategories } from '@/modules/products/services/get-categories';
import { PAGE_SIZES } from '@/examples/filters-selector/sort-selector-example';
import TranslationsProvider from '@/contexts/translation-provider';
import initTranslations from '@/app/i18n';
import SetBreadcrumbs from '@/components/core/breadcrumb/set-breadcrumbs';
import { generateOgMetadata } from '@/lib/og-image';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  return Array.from(Array(ISR_PRODUCTS_PAGE_NUMBERS).keys()).map((post) => ({
    page: String(post),
    region: process.env.NEXT_PUBLIC_DEFAULT_REGION || 'hab'
  }));
}

export async function generateMetadata() {
  return await generateOgMetadata({
    title: 'Catálogo de productos',
    description: `Catálogo de productos | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
    ogImageParams: {
      type: 'catalog',
      title: 'Catálogo de productos',
      subtitle: `Catálogo de productos | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`
    }
  });
}

const i18nNamespaces = ['catalog', 'common', 'errors', 'breadcrumbs', 'menu'];

type Props = {
  params: Promise<{ locale: string; page: string; region: string }>;
};

export default async function Page({ params }: Props) {
  const { locale, page, region } = await params;
  const { resources, t } = await initTranslations(locale, i18nNamespaces);

  const { data, error }: ApiResponse<SearchResponse<Product>> = await searchCatalog({
    page,
    region,
    locale
  });
  const { data: categoriesTree } = await getTreeCategories({
    headers: { 'Accept-Language': locale }
  });

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <SetBreadcrumbs
        reloadOnly={false}
        breadcrumbs={[
          { label: t('breadcrumbs:home'), path: `/${region}` },
          { label: t('breadcrumbs:catalog'), path: '/catalog' },
          { label: `${t('breadcrumbs:page')} ${page}`, path: `/catalog/page/${page}` }
        ]}
      />
      <FiltersLayout
        searchParams={{ page, region }}
        categoriesTree={categoriesTree}
        totalFound={data?.total}
        hasDynamicParams
      >
        <div className="flex w-full flex-col">
          <div className="box-border flex w-full flex-wrap">
            <ProductList data={data} error={error} t={t} />
          </div>
          <div className={'my-4 flex justify-center'}>
            <LargePagination
              totalPages={data?.total ? Math.ceil(data?.total / PAGE_SIZES[0]) : 0}
              currentPage={data?.data?.length ? +page : 0}
              byDynamicParams
              searchParams={{ page }}
            />
          </div>
        </div>
      </FiltersLayout>
    </TranslationsProvider>
  );
}
