"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import CartItems from "./components/cart-items";
import CartFooter from "./components/cart-footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartHeader from "./components/cart-header";
import { useMounted } from "@/hooks/use-mounted";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCart } from "@/providers/stores/use-cart-store";
import { ShoppingBasketIcon } from "lucide-react";

interface CartProps {
  className?: string;
}

export function CartClient({ className }: CartProps) {
  const { mounted } = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { totalItems } = useCart();

  const CartTrigger = (
    <Button
      aria-label="Open cart"
      className="relative h-10 w-10 rounded-full"
      size="icon"
      variant="ghost"
      id="cart-icon"
    >
      <ShoppingBasketIcon className="w-5 h-5 text-primary" />
      {totalItems > 0 && (
        <Badge
          className={`
            absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-[10px]
          `}
          variant="default"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );

  const CartContent = (
    <ScrollArea className="h-full flex-1 overflow-y-auto ">
      <CartItems />
    </ScrollArea>
  );

  if (!mounted) {
    return (
      <div className={cn("relative", className)}>
        <Button
          aria-label="Open cart"
          className="relative  rounded-full "
          size="icon"
          variant="ghost"
        >
          <ShoppingBasketIcon className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge
              className={`
                absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px]
              `}
              variant="default"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative ", className)}>
      {isDesktop ? (
        <Sheet>
          <SheetTrigger asChild>{CartTrigger}</SheetTrigger>
          <SheetContent className="flex w-[400px] flex-col p-0 !glass">
            <SheetHeader className="flex-shrink-0">
              <CartHeader />
            </SheetHeader>
            {/* lista de items */}
            {CartContent}
            <SheetFooter className="flex-shrink-0 ">
              <CartFooter />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>{CartTrigger}</DrawerTrigger>
          <DrawerContent className="flex flex-col max-h-[85vh]   glass">
            <DrawerHeader className="flex-shrink-0">
              <CartHeader />
            </DrawerHeader>
            {/* lista de items */}
            {CartContent}
            <DrawerFooter className="flex-shrink-0 not-last-of-type:">
              <CartFooter />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
