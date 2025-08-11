export const getNoUseRegion = (pathname: string, locale?: string, region?: string) => {
  const excludedRoutes = [
    'pages'
  ];

  const hasExcludedRoute = pathname.split('/').some((segment) => excludedRoutes.includes(segment));

  if (hasExcludedRoute) return true;

  const regex = new RegExp(
    `^/(${locale ? `${locale}/` : ''})?(${region ? `${region}/` : ''})?(${excludedRoutes.join('|')})`
  );
  return regex.test(pathname);
};
