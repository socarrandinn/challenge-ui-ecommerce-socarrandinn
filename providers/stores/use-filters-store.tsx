import { PAGE_SIZES } from "@/constants/page-sizes";
import { ISearchParams } from "@/interfaces/search-params";
import { create } from "zustand";

export type FilterProps = ISearchParams & {
  priceRange?: [string, string] | undefined;
  clearFilter?: boolean;
  scrollPosition?: number;
};

export const PRICE_RANGE_MIN = "0";
export const PRICE_RANGE_MAX = "15000";

// Store state type
interface FilterState extends FilterProps {
  // Actions
  setSearch: (search: string) => void;
  setPage: (page: string) => void;
  setCategory: (category: string | undefined) => void;
  setSize: (size: string) => void;
  setClearFilter: (clearFilter: boolean) => void;
  resetFilters: () => void;
  loadDefaultParams: (params: FilterProps) => void;

  setState: (state: string) => void;
}

// Initial state
const initialState: FilterProps = {
  search: "",
  page: "1",
  category: undefined as string | undefined,
  size: `${PAGE_SIZES[0]}`,
  clearFilter: false,
  scrollPosition: 0,
};

// Zustand store
export const useFiltersStore = create<FilterState>((set, get) => ({
  ...initialState,

  // Actions
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
  setCategory: (category) => set({ category }),
  setSize: (size) => set({ size }),
  setState: (state) => set({ state }),
  setClearFilter: (clearFilter) => set({ clearFilter }),
  resetFilters: () => {
    const currentScrollPosition = get().scrollPosition;
    set({
      ...initialState,
      scrollPosition: currentScrollPosition,
    });
  },

  loadDefaultParams: (params) => set(params),
}));
