import type { Metadata } from "next";
import "../css/globals.css";
import { ReactNode } from "react";
import { dir } from "i18next";
import i18nConfig from "@/i18nConfig";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/config/fonts";
import MainProvider from "@/providers/main.provider";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Himenaeos eget suscipit blandit vitae porta odio fermentum habitant ligula quisque montes",
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

type Props = {
  children?: ReactNode;
  params: Promise<{ locale: string }>;
};

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
    >
      <body className={cn(fontVariables, "antialiased")}>
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
