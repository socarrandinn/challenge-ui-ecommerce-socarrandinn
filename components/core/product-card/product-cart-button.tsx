import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { CartIcon } from "../icons/cart-icon";
import { useCart } from "@/providers/stores/use-cart-store";
import { IProduct } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import TransTypography from "../trans-typography/trans-typography";

type Props = {
  product: IProduct;
  quantity: number;
  title?: string;
  variant: "icon" | "button";
};

const classStyle: Record<
  string,
  { variant: "ghost" | "default"; class: string }
> = {
  icon: {
    variant: "ghost",
    class:
      "hover:text-white hover:bg-primary group [&>svg]:group-hover:text-white active:scale-105",
  },
  button: {
    variant: "default",
    class: "[&>svg]:text-white",
  },
};

export const ProductCartButton = ({
  product,
  quantity,
  title,
  variant,
}: Props) => {
  const { addItem } = useCart();

  const handleAddCart = useCallback(() => {
    addItem(product, quantity);
  }, [addItem, product, quantity]);

  return (
    <Button
      className={cn(classStyle[variant].class)}
      variant={classStyle[variant].variant}
      onClick={handleAddCart}
      disabled={quantity === 0}
    >
      <CartIcon className="text-primary h-7 w-7" />
      {title && variant === "button" && (
        <TransTypography message={title} as="span" />
      )}
    </Button>
  );
};
