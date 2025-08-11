import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useMemo } from "react";
import ProductCard from "@/components/core/product-card/product-card";
import { IProductSection } from "@/interfaces/product.interface";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";

type Props = Pick<IProductSection, "products"> &
  ClassNameProps & {
    hidePreviousAndNext?: boolean;
    hideDot?: boolean;
  };
const ProductCarrousel = ({
  products,
  className,
  hidePreviousAndNext = false,
  hideDot = false,
}: Props) => {
  const content = useMemo(
    () => (
      <>
        {products?.map((product, index) => (
          <CarouselItem
            key={`${product?.id}-${index}`}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </>
    ),
    [products]
  );

  if (products?.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className={cn("w-full", className)}
    >
      <CarouselContent>{content}</CarouselContent>

      {/* control next and previews */}
      {!hidePreviousAndNext && (
        <>
          <CarouselPrevious className="hidden md:flex bg-primary text-white hover:bg-primary/80 hover:text-white -left-6" />
          <CarouselNext className="hidden md:flex bg-primary text-white hover:bg-primary/80  hover:text-white -right-6" />
        </>
      )}

      {/* control dots */}
      {!hideDot && (
        <CarouselDots
          className="mt-6"
          dotClassName="size-2 bg-indigo-200 hover:bg-indigo-300"
        />
      )}
    </Carousel>
  );
};

export default ProductCarrousel;
