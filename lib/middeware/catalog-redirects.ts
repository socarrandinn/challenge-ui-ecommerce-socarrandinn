import { NextRequest, NextResponse } from 'next/server';

type Props = {
  pathname: string,
  searchParams: URLSearchParams,
  i18nRedirect: any,
  redirectUrl: string,
  request: NextRequest,
  hasQueryParams: boolean
}

export const catalogRedirects = (
  { hasQueryParams, i18nRedirect, pathname, searchParams, request }: Props
) => {
  const category = searchParams?.get('category');

  // Redirigir búsquedas con 2 parámetros (incluyendo categoría)
  if (
    pathname?.startsWith(`${i18nRedirect?.url}/catalog/search`) &&
    Array.from(searchParams.keys()).length === 2 &&
    category
  ) {
    return NextResponse.redirect(
      new URL(`${i18nRedirect?.url}/catalog/category/${category}`, request.url)
    );
  }

  // Redirigir búsquedas con solo categoría
  if (
    pathname?.startsWith(`${i18nRedirect?.url}/catalog/search`) &&
    Array.from(searchParams.keys()).length === 1 &&
    category
  ) {
    return NextResponse.redirect(
      new URL(`${i18nRedirect?.url}/catalog/category/${category}`, request.url)
    );
  }

  // Redirigir búsquedas sin parámetros
  if (pathname?.startsWith(`${i18nRedirect?.url}/catalog/search`) && !hasQueryParams) {
    return NextResponse.redirect(new URL(`${i18nRedirect?.url}/catalog`, request.url));
  }

  // Redirigir rutas con parámetros en URLs de paginación
  if (hasQueryParams && pathname.startsWith('/catalog/') && pathname.includes('/page/')) {
    const searchPath = `${i18nRedirect?.url}/catalog/search?${searchParams.toString()}`;
    return NextResponse.redirect(new URL(searchPath, request.url));
  }
};