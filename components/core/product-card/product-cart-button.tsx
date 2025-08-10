import { Button } from "@/components/ui/button";
import React from "react";
import { CartIcon } from "../icons/cart-icon";

const ProductCartIcon = () => {
  return (
    <Button variant={"ghost"}>
      <CartIcon className="text-primary h-7 w-7" />
    </Button>
  );
};

export default ProductCartIcon;
