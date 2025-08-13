"use client";
import ProductCardQuantity from "./product-card-quantity";
import { IProduct } from "@/interfaces/product.interface";
import { useState } from "react";
import { ProductCartButton } from "./product-cart-button";
import { cn } from "@/lib/utils";
import { ClassNameProps } from "@/interfaces/common.types";

type Props = ClassNameProps & {
  product: IProduct;
  variant: "icon" | "button";
  title?: string;
};

const ProductCartAction = ({ product, variant, title, className }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div
      className={cn(
        "flex flex-row gap-1 justify-between items-center mt-1",
        className
      )}
    >
      <ProductCardQuantity
        setQuantity={setQuantity}
        quantity={quantity}
        item={{
          product: product?.id,
          quantity,
          price: 0,
          productSnapShot: product,
          totalPrice: 0,
          unitPrice: 0,
        }}
      />
      <ProductCartButton
        variant={variant}
        product={product}
        quantity={quantity}
        title={title}
      />
    </div>
  );
};

export default ProductCartAction;
