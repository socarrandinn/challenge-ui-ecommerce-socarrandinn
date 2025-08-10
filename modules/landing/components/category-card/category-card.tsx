import React from "react";
import { Card } from "@/components/ui/card";
import { ClassNameProps } from "@/interfaces/common.types";
import { CATEGORY_ICONS, ICategory } from "@/interfaces/category.interface";
import { cn } from "@/lib/utils";
import LongText from "@/components/core/long-text/long-text";

type Props = ClassNameProps & {
  category: ICategory;
  variant: "first" | "other";
};

const variantStyle = {
  first: {
    card: "bg-white",
    color: "text-orange-dark",
  },
  other: {
    card: "bg-[#DADFF2]",
    color: "text-principal",
  },
};

const CategoryCard = ({ category, className, variant }: Props) => {
  const Icon = CATEGORY_ICONS[category.icon];
  return (
    <Card
      className={cn(
        "h-[170px] w-[145px] relative overflow-hidden flex flex-col items-center justify-center",
        variantStyle[variant].card,
        className
      )}
    >
      {variant === "first" && (
        <Circle className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      )}
      <div className="flex flex-col gap-1 items-center">
        <Icon className={cn("h-[60px] w-auto", variantStyle[variant].color)} />
        <LongText
          className={cn(
            "text-center text-sm font-semibold",
            variantStyle[variant].color
          )}
          text={category?.name}
          lineClamp={2}
        />
      </div>
    </Card>
  );
};

export default CategoryCard;

const Circle = ({ className }: ClassNameProps) => {
  return (
    <div className={cn("relative w-[130px] h-[130px]", className)}>
      {/* Círculo inferior */}
      <div className="absolute inset-0 rounded-full bg-orange-light"></div>

      {/* Círculo superior */}
      <div className="absolute top-1/2 left-1/2 w-[115px] h-[115px] rounded-full bg-orange-dark -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};
