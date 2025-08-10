import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { ICategory } from "@/interfaces/category.interface";
import React, { useMemo } from "react";
import CategoryCard from "./category-card";
import { ClassNameProps } from "@/interfaces/common.types";

type Props = ClassNameProps & {
  categories: ICategory[];
};

const CategoryCarrousel = ({ categories }: Props) => {
  const content = useMemo(
    () => (
      <>
        {categories?.map((category, index) => (
          <CarouselItem
            key={category?.id}
            className="basis-1/2 sm:basis-1/4 md:basis-1/6 xl:basis-1/8"
          >
            <CategoryCard
              category={category}
              variant={index === 0 ? "first" : "other"}
            />
          </CarouselItem>
        ))}
      </>
    ),
    [categories]
  );

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>{content}</CarouselContent>
      {/*  <CarouselPrevious />
        <CarouselNext /> */}
      <CarouselDots
        className="mt-6"
        dotClassName="size-2 bg-indigo-200 hover:bg-indigo-300"
      />
    </Carousel>
  );
};

export default CategoryCarrousel;
