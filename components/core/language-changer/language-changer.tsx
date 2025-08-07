'use client';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconLanguage } from '@tabler/icons-react';

type Props = {
  locale: string;
};

const LanguageChanger = ({ locale }: Props) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const { t } = useTranslation('common');

  const [lng, setLng] = useState<string>(locale);

  useEffect(() => {
    const urlLocale = currentPathname.split('/')[1];
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'sm'}
          variant="ghost"
          className="flex h-fit items-center gap-2 py-0.5 "
        >
          <div className="flex items-center gap-2">
            <IconLanguage className="h-5 w-5" />
            {t(`languages.${lng || i18nConfig?.defaultLocale}`)}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18nConfig?.locales?.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChange(code)}
            className={cn(
              'cursor-pointer',
              currentLocale === code ? 'font-bold text-primary' : ''
            )}
          >
            {t(`languages.${code}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(LanguageChanger);
