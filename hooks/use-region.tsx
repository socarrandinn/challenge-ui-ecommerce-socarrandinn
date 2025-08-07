"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Region = "us" | "es" | "fr" | "de" | "mx" | "ar";

interface RegionConfig {
  name: string;
  currency: string;
  lang: string;
  flag: string;
}

const regionConfig: Record<Region, RegionConfig> = {
  us: { name: "United States", currency: "USD", lang: "en", flag: "🇺🇸" },
  es: { name: "España", currency: "EUR", lang: "es", flag: "🇪🇸" },
  fr: { name: "France", currency: "EUR", lang: "fr", flag: "🇫🇷" },
  de: { name: "Deutschland", currency: "EUR", lang: "de", flag: "🇩🇪" },
  mx: { name: "México", currency: "MXN", lang: "es", flag: "🇲🇽" },
  ar: { name: "Argentina", currency: "ARS", lang: "es", flag: "🇦🇷" },
};

export function useRegion() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const currentRegion = (params?.region as Region) || "us";
  const config = regionConfig[currentRegion];

  useEffect(() => {
    // Guardar región en cookie
    document.cookie = `region=${currentRegion}; path=/; max-age=31536000`; // 1 año
    setIsLoading(false);
  }, [currentRegion]);

  const changeRegion = (newRegion: Region) => {
    const currentPath = window.location.pathname;
    const pathWithoutRegion = currentPath.replace(`/${currentRegion}`, "");
    const newPath = `/${newRegion}${pathWithoutRegion}`;

    // Actualizar cookie
    document.cookie = `region=${newRegion}; path=/; max-age=31536000`;

    // Navegar a la nueva región
    router.push(newPath);
  };

  const getRegionUrl = (path: string = "") => {
    return `/${currentRegion}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(config.lang, {
      style: "currency",
      currency: config.currency,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(config.lang).format(date);
  };

  return {
    currentRegion,
    config,
    isLoading,
    changeRegion,
    getRegionUrl,
    formatCurrency,
    formatDate,
    availableRegions: Object.keys(regionConfig) as Region[],
    allConfigs: regionConfig,
  };
}
