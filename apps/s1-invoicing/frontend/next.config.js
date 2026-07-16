const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@algeria-saas/ui', '@algeria-saas/shared'],
};
 
module.exports = withNextIntl(nextConfig);
