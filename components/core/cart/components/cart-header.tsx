import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCart } from "@/providers/stores/use-cart-store";
import React from "react";
import { TransTypography } from "../../trans-typography";
import { TrashIcon, XIcon } from "lucide-react";

const CartHeader = () => {
  const { totalItems, clearCart } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex items-center justify-between  sticky top-0 bg-background z-10">
      <div className="py-1">
        <TransTypography
          className="text-lg font-bold leading-none"
          message="cart:myCart"
          values={{ count: totalItems }}
          as="p"
        />
        <TransTypography
          className="text-xs text-muted-foreground leading-normal"
          message="cart:products"
          values={{ count: totalItems }}
        />
      </div>

      <Button className="nr-0 md:mr-8" size={"sm"} onClick={clearCart}>
        <TrashIcon />
        <TransTypography message="cart:action:clearCart" />
      </Button>
      {isDesktop && (
        <SheetClose asChild className="absolute top-0 right-0">
          <Button size="icon" variant="ghost" className="h-6 w-6">
            <XIcon className="h-5 w-5" />
          </Button>
        </SheetClose>
      )}
    </div>
  );
};

export default CartHeader;
