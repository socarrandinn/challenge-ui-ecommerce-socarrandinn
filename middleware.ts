import { NextResponse, type NextRequest } from 'next/server';
import i18nConfig from './i18nConfig';
import { i18nRouter } from 'next-i18n-router';
import { ENV_CONFIG } from './lib/config/env.config';
import { getCookie } from './app/actions/cookies';
import { catalogRedirects } from './lib/middeware/catalog-redirects';
import { getNoUseRegion } from './lib/middeware/no-use-region-routes';


export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = await getCookie(ENV_CONFIG.cookies.NEXT_LOCALE) || i18nConfig.defaultLocale

  // Get the current region from the cookie or use the default
  const region =
    await getCookie(ENV_CONFIG.cookies.X_REGION) ||
    process.env.NEXT_PUBLIC_DEFAULT_REGION ||
    'hab';

  const i18nRedirect = i18nRouter(request, i18nConfig);



  // Catalog redirects
  const catalogResponse = catalogRedirects(
    {
      pathname,
      i18nRedirect,
      request,
      region,
      redirectUrl: `/catalog/page`,

    }
  );

  if (catalogResponse) {
    return catalogResponse;
  }

  // Check if the route contains region in pages that do not need region
  const noNeedRegionRoute = getNoUseRegion(pathname, locale, region);

  // If the route contains region in pages that do not need region
  if (noNeedRegionRoute && pathname.includes(`/${region}`)) {
    const newPathname = pathname.replace(`/${region}`, '');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.redirect(url);
  }

  // If it's a regionalizad route and the region is not in the URL, add the region
  if (!noNeedRegionRoute && !pathname.includes(`/${region}`)) {
    const newPathname = `/${region}${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.redirect(new URL(url.toString(), request.url));
  }

  // If the conditions are not met, continue with the request normally.
  return i18nRedirect;
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!_next|_vercel|api|sitemap|.*\\..*).*)',
  ],
};