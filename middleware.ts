import { type NextRequest } from 'next/server';
import i18nConfig from './i18nConfig';
import { i18nRouter } from 'next-i18n-router';


export default async function middleware(req: NextRequest) {
  // Initialize i18nRouter with request and i18n config
  const i18nRedirect = i18nRouter(req, i18nConfig);

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