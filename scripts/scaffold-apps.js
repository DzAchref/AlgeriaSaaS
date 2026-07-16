const fs = require('fs');
const path = require('path');

const APPS = [
  { id: 's2', name: 'pos', portApi: 4002, portWeb: 5002, title: 'POS & Retail' },
  { id: 's3', name: 'hr-payroll', portApi: 4003, portWeb: 5003, title: 'HR & Payroll' },
  { id: 's4', name: 'inventory', portApi: 4004, portWeb: 5004, title: 'Inventory & SCM' },
  { id: 's5', name: 'accounting', portApi: 4005, portWeb: 5005, title: 'Accounting & ERP' },
  { id: 's6', name: 'crm', portApi: 4006, portWeb: 5006, title: 'CRM' },
  { id: 's7', name: 'booking', portApi: 4007, portWeb: 5007, title: 'Booking' },
  { id: 's8', name: 'delivery', portApi: 4008, portWeb: 5008, title: 'Delivery' },
  { id: 's9', name: 'ecommerce', portApi: 4009, portWeb: 5009, title: 'E-commerce' },
  { id: 's10', name: 'agritech', portApi: 4010, portWeb: 5010, title: 'Agritech' },
  { id: 's11', name: 'btp', portApi: 4011, portWeb: 5011, title: 'BTP Construction' },
  { id: 's12', name: 'bi', portApi: 4012, portWeb: 5012, title: 'BI & Analytics' },
];

const ROOT_DIR = path.join(__dirname, '..', 'apps');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

APPS.forEach(app => {
  const appDir = path.join(ROOT_DIR, `${app.id}-${app.name}`);
  const backendDir = path.join(appDir, 'backend');
  const frontendDir = path.join(appDir, 'frontend');

  ensureDir(path.join(backendDir, 'src'));
  ensureDir(path.join(frontendDir, 'src', 'app'));
  ensureDir(path.join(frontendDir, 'src', 'messages'));

  // ==========================================
  // BACKEND FILES (NestJS)
  // ==========================================

  writeFile(path.join(backendDir, 'package.json'), `{
  "name": "@algeria-saas/${app.id}-${app.name}-api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch"
  },
  "dependencies": {
    "@algeria-saas/shared": "workspace:*",
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@types/node": "^20.3.1",
    "typescript": "^5.1.3"
  }
}`);

  writeFile(path.join(backendDir, 'tsconfig.json'), `{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}`);

  writeFile(path.join(backendDir, 'src', 'main.ts'), `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/${app.name}');
  await app.listen(${app.portApi});
  console.log('${app.id.toUpperCase()} API is running on port ${app.portApi}');
}
bootstrap();`);

  writeFile(path.join(backendDir, 'src', 'app.module.ts'), `import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}`);


  // ==========================================
  // FRONTEND FILES (Next.js)
  // ==========================================

  writeFile(path.join(frontendDir, 'package.json'), `{
  "name": "@algeria-saas/${app.id}-${app.name}-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p ${app.portWeb}",
    "build": "next build",
    "start": "next start -p ${app.portWeb}",
    "lint": "next lint"
  },
  "dependencies": {
    "@algeria-saas/shared": "workspace:*",
    "@algeria-saas/ui": "workspace:*",
    "next": "14.2.3",
    "next-intl": "^3.14.1",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5"
  }
}`);

  writeFile(path.join(frontendDir, 'tsconfig.json'), `{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`);

  writeFile(path.join(frontendDir, 'next.config.js'), `const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@algeria-saas/ui', '@algeria-saas/shared'],
};
module.exports = withNextIntl(nextConfig);`);

  writeFile(path.join(frontendDir, 'tailwind.config.ts'), `import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#10b981', 600: '#059669', 900: '#064e3b' },
      },
    },
  },
  plugins: [],
};
export default config;`);

  writeFile(path.join(frontendDir, 'postcss.config.js'), `module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}`);

  writeFile(path.join(frontendDir, 'src', 'app', 'layout.tsx'), `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import "@algeria-saas/ui/dist/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algeria SaaS - ${app.title}",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}`);

  writeFile(path.join(frontendDir, 'src', 'app', 'globals.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;`);

  writeFile(path.join(frontendDir, 'src', 'app', 'page.tsx'), `import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl">{t('description')}</p>
    </main>
  );
}`);

  writeFile(path.join(frontendDir, 'src', 'i18n.ts'), `import { getRequestConfig } from 'next-intl/server';
export default getRequestConfig(async () => {
  const locale = 'fr';
  return {
    locale,
    messages: (await import("./messages/" + locale + ".json")).default
  };
});`);

  writeFile(path.join(frontendDir, 'src', 'messages', 'fr.json'), `{
  "Index": {
    "title": "Bienvenue sur ${app.title}",
    "description": "Module ${app.id.toUpperCase()} de l'écosystème Algeria SaaS."
  }
}`);

  writeFile(path.join(frontendDir, 'src', 'messages', 'ar.json'), `{
  "Index": {
    "title": "مرحباً بك في ${app.title}",
    "description": "وحدة ${app.id.toUpperCase()} من نظام Algeria SaaS."
  }
}`);

  console.log("✅ Scaffolded " + app.id.toUpperCase() + " (" + app.name + ")");
});

console.log('🎉 Scaffolding complete!');
