"use client";

import { GridIcon, LayoutGrid } from "lucide-react";
import { useId } from "react";

import { useTranslation } from "react-i18next";
import { CATEGORY_ICONS, ICategory } from "@/interfaces/category.interface";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SquareItem from "./square-item";

type Props = ClassNameProps & {
  categories: ICategory[];
  onCategoryChange?: (categoryId: string) => void;
};

const ALL_CATEGORY = "all";

const CategoryMenu = ({ categories, className, onCategoryChange }: Props) => {
  const { t } = useTranslation("common");
  const id = useId();

  const handleValueChange = (value: string) => {
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={ALL_CATEGORY}>
      <SelectTrigger
        id={id}
        className={cn(
          "ps-2 [&>icon]:!text-white [&>span]:flex bg-primary w-[10rem] text-white [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0",
          className
        )}
      >
        <SelectValue className="!text-white" placeholder={t("category.all")} />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
        <SelectGroup>
          <SelectLabel>{t("category.all")}</SelectLabel>

          {/* all categories */}
          <SelectItem value={ALL_CATEGORY}>
            <SquareItem className="!bg-blue-100 text-primary">
              <GridIcon className="h-4 w-4 text-primary" />
            </SquareItem>
            <span className="truncate">{t("category.all")}</span>
          </SelectItem>

          {categories?.map((category) => {
            const Icon = CATEGORY_ICONS?.[category.icon] || LayoutGrid;
            return (
              <SelectItem value={category?.id} key={category?.id}>
                <SquareItem className="!bg-blue-100 text-primary">
                  <Icon className="h-4 w-4 text-primary" />
                </SquareItem>
                <span className="truncate">{category?.name}</span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryMenu;
