import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import "../globals.css";

import Providers from '../../components/Providers';

export const metadata: Metadata = {
  title: "Algeria SaaS - Invoicing",
  description: "DGI Compliant Invoicing for Algeria",
};

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} data-theme="dark">
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
