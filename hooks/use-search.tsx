"use client";
import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "@/interfaces/search-params";
import { useFiltersStore } from "@/providers/stores/use-filters-store";

// Hook para manejar el router
export const useHandleRouter = (defaultPath: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateRoute = useCallback(
    (params: ISearchParams) => {
      const url = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.set(key, String(value));
        }
      });

      const queryString = url.toString();
      const newUrl = queryString
        ? `${defaultPath}?${queryString}`
        : defaultPath;

      router.push(newUrl);
    },
    [router, defaultPath]
  );

  const removeQueryParam = useCallback(
    (paramName: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramName);

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl);
    },
    [router, pathname, searchParams]
  );

  const addQueryParam = useCallback(
    (paramName: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, value);

      const queryString = params.toString();
      const newUrl = `${pathname}?${queryString}`;

      router.push(newUrl);
    },
    [router, pathname, searchParams]
  );

  return {
    updateRoute,
    removeQueryParam,
    addQueryParam,
    currentPath: pathname,
  };
};

// Hook para encontrar categoría por slug
export const useCategoryBySlug = (categories: any[], slug?: string) => {
  const findCategoryBySlug = useCallback(
    (categoriesList: any[], categorySlug: string) => {
      const findInCategories = (cats: any[]): any => {
        for (const category of cats) {
          if (category.slug === categorySlug) {
            return category;
          }
          if (category.children && category.children.length > 0) {
            const found = findInCategories(category.children);
            if (found) return found;
          }
        }
        return null;
      };

      return findInCategories(categoriesList);
    },
    []
  );

  const category = useMemo(() => {
    if (!slug || !categories?.length) return null;
    return findCategoryBySlug(categories, slug);
  }, [categories, slug, findCategoryBySlug]);

  return category;
};

// Hook para construir URLs de navegación
export const useNavigationBuilder = () => {
  const buildSearchUrl = useCallback((search: string, category?: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    return `/catalog/search?${params.toString()}`;
  }, []);

  const buildCategoryUrl = useCallback((category: string) => {
    return `/catalog/category/${category}`;
  }, []);

  const buildProductsUrl = useCallback(() => {
    return `/catalog/page`;
  }, []);

  return {
    buildSearchUrl,
    buildCategoryUrl,
    buildProductsUrl,
  };
};

// Hook principal convertido a Zustand
export const useSearch = (searchParams?: ISearchParams, path?: string) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const { updateRoute, removeQueryParam } = useHandleRouter(
    path || "/catalog/search"
  );

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
    loadDefaultParams,
  } = useFiltersStore();

  const { buildSearchUrl, buildCategoryUrl, buildProductsUrl } =
    useNavigationBuilder();

  // Inicializar estado con parámetros de búsqueda
  useEffect(() => {
    if (searchParams) {
      loadDefaultParams({
        search: searchParams.search || "",
        category: searchParams.category,
        clearFilter: false,
        scrollPosition: 0,
      });
    }
  }, [
    searchParams?.search,
    searchParams?.category,
    loadDefaultParams,
    searchParams,
  ]);

  // Función de búsqueda mejorada
  const onSearch = useCallback(() => {
    if (!searchParams) return;

    const hasSearch = Boolean(search?.trim());
    const hasCategory = Boolean(category);

    if (hasSearch && hasCategory) {
      if (pathname?.startsWith("/catalog/search")) {
        updateRoute({
          ...searchParams,
          search: search,
          category: category,
        });
      } else {
        push(buildSearchUrl(search!, category));
      }
    } else if (hasCategory && !hasSearch) {
      push(buildCategoryUrl(category!));
    } else if (hasSearch && !hasCategory) {
      if (pathname?.startsWith("/catalog/search")) {
        updateRoute({
          ...searchParams,
          search: search,
          category: undefined,
        });
      } else {
        push(buildSearchUrl(search!));
      }
    } else {
      push(buildProductsUrl());
    }
  }, [
    searchParams,
    search,
    category,
    pathname,
    updateRoute,
    push,
    buildSearchUrl,
    buildCategoryUrl,
    buildProductsUrl,
  ]);

  // Función para limpiar búsqueda
  const onClear = useCallback(() => {
    setSearch("");
    removeQueryParam("search");
  }, [setSearch, removeQueryParam]);

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
