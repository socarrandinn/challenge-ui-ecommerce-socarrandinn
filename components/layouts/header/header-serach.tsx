"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ICategory } from "@/interfaces/category.interface";
import CategoryMenu from "@/components/core/menus/category-menu";
import { SearchIcon } from "@/components/core/icons/search-icon";
import { useSearch } from "@/hooks/use-search";

type Props = ClassNameProps & {
  categories: ICategory[];
};
const HeaderSearch = ({ className, categories }: Props) => {
  const { t } = useTranslation("common");

  const { search, setSearch, onSearch, onClear } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleClearSearch = () => {
    onClear();
  };

  return (
    <div className={cn("flex-1 w-full  relative", className)}>
      <div className="flex flex-row">
        <CategoryMenu
          categories={categories || []}
          className="-mr-2 z-10 hidden lg:flex h-[46px]"
        />

        <div className="relative w-full lg:w-auto">
          {/* icon search */}
          <SearchIcon className="hidden md:flex h-5 w-5 stroke-3 absolute text-primary left-3 top-1/2 -translate-y-1/2 rounded-md" />

          <Input
            type="text"
            placeholder={t("search")}
            value={search || ""}
            className={cn(
              "pl-2 md:pl-10 pr-16 py-3",
              "lg:min-w-[18rem] h-[46px] xl:min-w-[25rem] !w-full glass-glow bg-sidebar-primary-foreground ",
              "lg:rounded-r-md lg:rounded-l-none rounded-r-md",
              "text-sm md:text-lg"
            )}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          {/* Botón de búsqueda */}
          <Button
            size="sm"
            variant="default"
            className="absolute !h-[46px] w-[50px] right-0 top-1/2 -translate-y-1/2  rounded-md"
            onClick={onSearch}
          >
            <SearchIcon className="h-5 w-5 stroke-3 text-white " />
          </Button>

          {/* Botón para limpiar búsqueda individual (solo si hay texto) */}
          {search && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-14 top-1/2 -translate-y-1/2  hover:bg-transparent p-0 hover:text-primary"
              onClick={handleClearSearch}
            >
              <XIcon className="!h-3 !w-3 stroke-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
