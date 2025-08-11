"use client";
import { Button } from "@/components/ui/button";
import { ICartItem } from "@/interfaces/cart";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/stores/use-cart-store";
import { Minus, PlusIcon } from "lucide-react";
import React from "react";

type Props = ClassNameProps & {
  item: ICartItem;
};
const ProductCardQuantity = ({ item, className }: Props) => {
  const { decrementQuantity, incrementQuantity } = useCart();
  return (
    <div
      className={cn(
        "flex items-center bg-white hover:bg-orange-dark/50 h-9 justify-start rounded-md",
        className
      )}
    >
      <Button
        size={"sm"}
        className={
          "flex w-auto items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground rounded-none"
        }
        disabled={item.quantity <= 1}
        onClick={() => decrementQuantity(item.product)}
        variant={"ghost"}
      >
        <Minus className="h-2 w-2 md:h-3 md:w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span
        className={`
          border-l border-r border-r-muted border-l-muted
          border-t-8 border-t-transparent  border-b-8 border-b-transparent
          flex h-full min-w-6 md:min-w-10 items-center justify-center text-xs font-medium
          `}
      >
        {item.quantity}
      </span>
      <Button
        size={"sm"}
        className={`
                    flex rounded-none items-center justify-center
                    w-auto
                    text-muted-foreground
                    transition-colors
                    hover:bg-muted hover:text-foreground
                  `}
        onClick={() => incrementQuantity(item.product)}
        variant={"ghost"}
      >
        <PlusIcon className="h-2 w-2 md:h-3 md:w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
};

export default ProductCardQuantity;
