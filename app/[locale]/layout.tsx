import type { Metadata } from "next";
import "../css/globals.css";
import { ReactNode } from "react";
import { dir } from "i18next";
import i18nConfig from "@/i18nConfig";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import MainProvider from "@/providers/main.provider";
import { ENV_CONFIG } from "@/lib/config/env.config";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children?: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(`${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}`),
  title: "Ecommerce app",
  description:
    "Urna amet eleifend molestie elementum vel nulla habitant elit adipiscing consectetur gravida",
  alternates: {
    canonical: new URL(`${ENV_CONFIG.env.NEXT_PUBLIC_APP_URL}/es`),
    languages: {
      "en-US": "/en-US",
      "es-ES": "/es-ES",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const dynamicParams = await params;

  if (!i18nConfig.locales.includes(dynamicParams?.locale)) {
    notFound();
  }

  return (
    <html
      lang={dynamicParams?.locale}
      dir={dir(dynamicParams?.locale)}
      suppressHydrationWarning
      className={montserrat.className}
    >
      <body>
        <NextTopLoader
          color="var(--primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--primary),0 0 5px var(--secondary)"
          template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={999}
          showAtBottom={false}
        />
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
