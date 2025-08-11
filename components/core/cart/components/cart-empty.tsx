import { motion } from "framer-motion";
import { TransTypography } from "../../trans-typography";
import { ShoppingBasketIcon } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CATALOG_MENU } from "@/constants/navigation";
import { DrawerClose } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

const CartEmpty = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className={`
                    mb-4 flex h-32 w-32 items-center justify-center rounded-full
                    bg-muted
                  `}
      >
        <ShoppingBasketIcon className="h-16 w-16 text-muted-foreground" />
      </div>
      <TransTypography
        className="mb-2 text-lg font-medium"
        message="cart:emptyCart:title"
        as="h3"
      />
      <TransTypography
        className="mb-6 text-center text-sm text-muted-foreground"
        message="cart:emptyCart:subtitle"
        as="p"
      />

      {isDesktop ? (
        <SheetClose asChild>
          <Button>
            <Link href={CATALOG_MENU.list}>
              <TransTypography message="common:go-to-catalog" />
            </Link>
          </Button>
        </SheetClose>
      ) : (
        <DrawerClose asChild>
          <Button>
            <Link href={CATALOG_MENU.list}>
              <TransTypography message="common:go-to-catalog" />
            </Link>
          </Button>
        </DrawerClose>
      )}
    </motion.div>
  );
};

export default CartEmpty;
