import { NextRequest, NextResponse } from 'next/server';
import { getRouteParam } from './utils';

type Props = {
  pathname: string,
  i18nRedirect: any,
  redirectUrl: string,
  request: NextRequest,
  region?: string
}

export const catalogRedirects = ({
  pathname,
  i18nRedirect,
  request,
  region
}: Props) => {


  const baseUrl = region ? `${i18nRedirect?.url}/${region}` : i18nRedirect?.url;

  // Manejo específico para /catalog sin región
  if (pathname === '/catalog') {
    return NextResponse.redirect(new URL(`${baseUrl}/catalog/page`, request.url));
  }

  // Manejo para rutas que terminan exactamente en /catalog (con cualquier prefijo)
  if (pathname.endsWith('/catalog')) {
    return NextResponse.redirect(new URL(`${pathname}/page`, request.url));
  }

  if (pathname?.startsWith(`${i18nRedirect?.url}/catalog/search`)) {
    const search = getRouteParam(request, 'search', '/catalog/search/[search]');
    if (search) {
      return NextResponse.redirect(new URL(`${baseUrl}/catalog/search/${search}`, request.url));
    }
    return NextResponse.redirect(new URL(`${baseUrl}/catalog/page`, request.url));
  }

  if (pathname?.startsWith(`${i18nRedirect?.url}/catalog/category`)) {
    const category = getRouteParam(request, 'category', '/catalog/category/[category]');
    const categoryLarge = getRouteParam(request, 'category', '/catalog/category/[category]/search/[search]');
    const search = getRouteParam(request, 'search', '/catalog/category/[category]/search/[search]');

    if (!category && !search) {
      return NextResponse.redirect(
        new URL(`${baseUrl}/catalog/page`, request.url)
      );
    }
    if (category && !search) {
      return NextResponse.redirect(
        new URL(`${baseUrl}/catalog/category/${category}`, request.url)
      );
    }
    if (categoryLarge && search) {
      return NextResponse.redirect(
        new URL(`${baseUrl}/catalog/category/${categoryLarge}/search/${search}`, request.url)
      );
    }
  }
};