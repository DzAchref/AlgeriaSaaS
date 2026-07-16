import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['fr', 'ar', 'en'],
  defaultLocale: 'fr'
});
 
export const config = {
  // Match internationalized pathnames but exclude api routes and nextauth
  matcher: ['/', '/(fr|ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
