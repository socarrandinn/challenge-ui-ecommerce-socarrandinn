import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { SheetClose } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { TransTypography } from "../../trans-typography";
import ProductPriceCard from "../../product-card/product-card-price";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCart } from "@/providers/stores/use-cart-store";

const CartFooter = () => {
  const { t } = useTranslation("cart");
  const { items, totalItems, totalPrice } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">{t("total")}</span>
        <span className="text-base font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <Button className="w-full h-10" disabled={totalItems === 0}>
        <TransTypography message="cart:action.proceedToPayment" />
        <Badge className="ml-2 text-white" variant="outline" color="primary">
          <ProductPriceCard price={totalPrice} size="sm" />
        </Badge>
      </Button>
      <div className="flex items-center justify-between mt-">
        {isDesktop ? (
          <SheetClose asChild>
            <Button
              variant={"ghost"}
              className="w-full bg-orange-dark text-white hover:bg-orange-400 hover:text-white"
            >
              {t("cart:action.continueShopping")}
            </Button>
          </SheetClose>
        ) : (
          <DrawerClose asChild>
            <Button
              variant={"ghost"}
              className="w-full bg-orange-dark text-white hover:bg-orange-400 hover:text-white"
            >
              {t("cart:action.continueShopping")}
            </Button>
          </DrawerClose>
        )}
      </div>
    </div>
  );
};

export default CartFooter;
