"use client";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFiltersStore } from "@/providers/stores/use-filters-store";

// Hook para construir URLs de navegación
export const useNavigationBuilder = () => {
  const buildSearchUrl = useCallback((search: string, category?: string) => {
    if (category) {
      return `/catalog/category/${category}/search/${search}`;
    }
    return `/catalog/search/${search}`;
  }, []);

  const buildCategoryUrl = useCallback((category: string) => {
    return `/catalog/category/${category}`;
  }, []);

  const buildCatalogUrl = useCallback(() => {
    return `/catalog/page`;
  }, []);

  return {
    buildSearchUrl,
    buildCategoryUrl,
    buildCatalogUrl,
  };
};

// Hook principal convertido a Zustand
export const useSearch = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  // Usar Zustand store en lugar del reducer
  const {
    search,
    category,
    state,
    clearFilter,
    setState,
    setSearch,
    setCategory,
    setClearFilter,
    resetFilters,
  } = useFiltersStore();

  const { buildSearchUrl, buildCategoryUrl, buildCatalogUrl } =
    useNavigationBuilder();

  // Función de búsqueda mejorada
  const onSearch = useCallback(() => {
    const hasSearch = Boolean(search?.trim());
    const hasCategory = Boolean(category) && category !== "all";

    if (hasSearch && hasCategory) {
      push(buildSearchUrl(search!, category));
      return;
    }

    if (hasSearch && !hasCategory) {
      push(buildSearchUrl(search!));
      return;
    }
    if (!hasSearch && hasCategory) {
      push(buildCategoryUrl(category!));
      return;
    }

    push(buildCatalogUrl());
  }, [
    search,
    category,
    push,
    buildSearchUrl,
    buildCategoryUrl,
    buildCatalogUrl,
  ]);

  const onClear = useCallback(() => {
    setSearch("");
    if (category && category !== "all") {
      push(buildCategoryUrl(category));
    } else {
      push(pathname.replace(/\/search\/[^/]+/, "/page"));
    }
  }, [setSearch, push, pathname, category, buildCategoryUrl]);

  const onClearAllFilters = useCallback(() => {
    resetFilters();
    push(pathname.split("?")[0]);
  }, [resetFilters, push, pathname]);

  // Estados derivados
  const hasActiveFilters = useMemo(() => {
    return Boolean(search?.trim() || category);
  }, [search, category]);

  const isSearchPage = useMemo(() => {
    return pathname?.startsWith("/catalog/search");
  }, [pathname]);

  return {
    onSearch,
    onClear,
    onClearAllFilters,
    setCategory,
    setSearch,
    setClearFilter,
    resetFilters,
    setState,

    // Estados individuales (acceso directo)
    search,
    category,
    clearFilter,

    // Estados derivados
    hasActiveFilters,
    isSearchPage,
    state,
  };
};
