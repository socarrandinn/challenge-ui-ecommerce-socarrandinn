import { TransTypography } from "@/components/core/trans-typography";
import { ShoppingBasketIcon } from "lucide-react";

const ProductListEntity = () => {
  return (
    <div className="flex flex-row items-center gap-8 p-4 h-[50vh] justify-center">
      <picture
        className={
          "mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-muted"
        }
      >
        <ShoppingBasketIcon className="h-24 w-24 text-muted-foreground" />
      </picture>

      <div className="flex flex-col gap-2 justify-start items-start">
        <caption className="text-2xl md:text-4xl font-bold text-primary">
          Hmmm,
        </caption>
        <TransTypography
          message="common:product-entity:title"
          as="h2"
          className="text-xl md:text-2xl font-semibold leading-normal"
        />
        <TransTypography
          message="common:product-entity:subtitle"
          className="text-lg font-normal leading-normal"
          as="p"
        />
      </div>
    </div>
  );
};

export default ProductListEntity;
