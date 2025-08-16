import initTranslations from "@/app/i18n";
import HomeContainer from "@/modules/landing/containers/home-container";
import TranslationsProvider from "@/providers/translation-provider";

export const revalidate = 60;
export const dynamicParams = true;

const i18nNamespaces = ["home", "common", "errors", "breadcrumbs"];

type Props = {
  params: Promise<{ locale: string; region: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { resources, t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="w-full">
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <HomeContainer params={params} namespaces={i18nNamespaces} t={t} />
      </TranslationsProvider>
    </div>
  );
}
