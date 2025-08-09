import * as React from 'react';
import { searchCatalog } from '@/modules/products/services/search-catalog';
import FiltersLayout from '@/modules/products/components/filters-layout/filters-layout';
import LargePagination from '@/components/core/pagination/large-pagination-catalog';
import { getTreeCategories } from '@/modules/products/services/get-categories';
import { PAGE_SIZES } from '@/examples/filters-selector/sort-selector-example';
import ProductList from '@/components/catalog/product-list.component';
import { findCategoryBySlug } from '@/utils/find-category-by-slug';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/contexts/translation-provider';
import SetBreadcrumbs from '@/components/core/breadcrumb/set-breadcrumbs';
import { generateOgMetadata } from '@/lib/og-image';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateMetadata() {
  return await generateOgMetadata({
    title: 'Resultados de la búsqueda',
    description: `Resultados de la búsqueda | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
    ogImageParams: {
      type: 'catalog',
      title: 'Resultados de la búsqueda',
      subtitle: `Resultados de la búsqueda | ${process.env.NEXT_PUBLIC_STORE_NAME}`,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-graph.png`
    }
  });
}

const i18nNamespaces = ['catalog', 'common', 'errors', 'breadcrumbs', 'menu'];

type Props = {
  searchParams: any;
  params: Promise<{ locale: string; region: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const query = await searchParams;
  const { locale, region } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const { data, error } = await searchCatalog({ ...query, region, locale });
  const { data: categoriesTree } = await getTreeCategories({
    headers: {
      ['Accept-Language']: locale
    }
  });

  const defaultFilters = query?.category
    ? {
        category: {
          category: t('common:categories').toUpperCase(),
          ...findCategoryBySlug(categoriesTree, query?.category, true)
        }
      }
    : null;

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <SetBreadcrumbs
        reloadOnly={false}
        breadcrumbs={[
          { label: t('breadcrumbs:home'), path: `/${region}` },
          { label: t('breadcrumbs:catalog'), path: '/catalog' },
          {
            label: `${t('breadcrumbs:page')} ${query?.page || 1}`,
            path: `/catalog/page/${query?.page || 1}`
          }
        ]}
      />
      <FiltersLayout
        searchParams={query}
        categoriesTree={categoriesTree}
        totalFound={data?.total}
        defaultFilters={defaultFilters}
      >
        <div className="flex w-full flex-col">
          <div className="box-border flex w-full flex-wrap">
            <ProductList data={data} error={error} t={t} />
          </div>
          <div className={'my-4 flex justify-center'}>
            <LargePagination
              totalPages={Math.ceil(
                data?.total ? data?.total / (+query?.size || PAGE_SIZES[0]) : 0
              )}
              currentPage={query?.page}
              searchParams={query}
            />
          </div>
        </div>
      </FiltersLayout>
    </TranslationsProvider>
  );
}
