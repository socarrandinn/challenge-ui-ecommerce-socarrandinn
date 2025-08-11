import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { CartIcon } from "../icons/cart-icon";
import { useCart } from "@/providers/stores/use-cart-store";
import { IProduct } from "@/interfaces/product.interface";

type Props = {
  product: IProduct;
  quantity: number;
};
const ProductCartIcon = ({ product, quantity }: Props) => {
  const { addItem } = useCart();

  const handleAddCart = useCallback(() => {
    addItem(product, quantity);
  }, [addItem, product, quantity]);

  return (
    <Button
      className="hover:text-white hover:bg-primary group [&>svg]:group-hover:text-white active:scale-105"
      variant={"ghost"}
      onClick={handleAddCart}
      disabled={quantity === 0}
    >
      <CartIcon className="text-primary h-7 w-7" />
    </Button>
  );
};

export default ProductCartIcon;
