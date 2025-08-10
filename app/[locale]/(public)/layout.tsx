import { ReactNode } from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/providers/translation-provider";
import { commonMeta } from "@/constants/meta";
import { Header } from "@/components/layouts/header/header";
import Footer from "@/components/core/footer/footer";

export const metadata = commonMeta;

const i18nNamespaces = ["common", "errors"];

type Props = {
  children?: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const dynamicParams = await params;
  const { resources } = await initTranslations(
    dynamicParams?.locale,
    i18nNamespaces
  );

  return (
    <main className="relative">
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={dynamicParams?.locale}
        resources={resources}
      >
        <Header locale={dynamicParams?.locale} />
        <main className={`flex min-h-screen flex-col`}>{children}</main>
        <Footer />
      </TranslationsProvider>

      {/* GoogleAnalytics */}
      {/* add analytic aquí */}
    </main>
  );
}
