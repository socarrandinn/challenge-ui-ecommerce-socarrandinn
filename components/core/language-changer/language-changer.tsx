"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon } from "lucide-react";

type Props = {
  locale: string;
  id?: string;
};

const LanguageChanger = ({ locale, id = "language-selector" }: Props) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentPathname = usePathname();
  const { t } = useTranslation("common");

  const [lng, setLng] = useState<string>(locale);

  useEffect(() => {
    const urlLocale = currentPathname.split("/")[1];
    if (urlLocale !== i18n.language) {
      i18n.changeLanguage(urlLocale).then();
    }
  }, [currentPathname, i18n]);

  const handleChange = useCallback(
    (lang: string) => {
      setLng(lang);
      if (lang !== i18n.language) {
        i18n.changeLanguage(lang).then();

        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `NEXT_LOCALE=${lang};expires=${date.toUTCString()};path=/`;

        const isDefaultLocale =
          locale === i18nConfig.defaultLocale && !i18nConfig?.defaultLocale;
        const newPath = isDefaultLocale
          ? `/${lang}${currentPathname}`
          : currentPathname.replace(`/${locale}`, `/${lang}`);
        router.push(newPath);
        router.refresh();
      }
    },
    [i18n, locale, currentPathname, router]
  );

  return (
    <Select
      value={lng || i18nConfig?.defaultLocale}
      onValueChange={handleChange}
    >
      <SelectTrigger
        id={`language-${id}`}
        className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none px-2 shadow-none [&>svg]:shrink-0"
        aria-label="Select language"
      >
        <GlobeIcon size={16} aria-hidden="true" />
        <SelectValue className="hidden sm:inline-flex" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
        {i18nConfig?.locales?.map((code) => (
          <SelectItem key={code} value={code}>
            <span className="flex items-center gap-2">
              <span className="truncate">{t(`languages.${code}`)}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(LanguageChanger);
