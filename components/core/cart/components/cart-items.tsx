import React from "react";
import CartEmpty from "./cart-empty";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProductCardQuantity from "../../product-card/product-card-quantity";
import { useCart } from "@/providers/stores/use-cart-store";
import { XIcon } from "lucide-react";
import ProductPriceCard from "../../product-card/product-card-price";

const CartItems = () => {
  const { removeItem, items } = useCart();

  if (items?.length === 0) return <CartEmpty />;

  return (
    <div className="flex-1 overflow-y-auto px-4">
      <AnimatePresence>
        <div className="space-y-4 py-4">
          {items.map((item) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={
                "group relative flex rounded-lg  p-2 transition-colors bg-[#f4f7fc] "
              }
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              key={item.productSnapShot?.id}
              layout
              transition={{ duration: 0.15 }}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded">
                <Image
                  alt={item.productSnapShot?.id}
                  className="object-cover aspect-auto"
                  fill
                  src={item.productSnapShot?.image}
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <Link
                      className={`
                              line-clamp-2 text-sm font-medium
                              group-hover:text-primary
                            `}
                      href={`/products/${item.productSnapShot?.id}`}
                    >
                      {item.productSnapShot?.name}
                    </Link>
                    <button
                      className={`
                              -mt-1 -mr-1 ml-2 rounded-full p-1
                              text-muted-foreground transition-colors
                              hover:bg-muted hover:text-destructive
                            `}
                      onClick={() => removeItem(item.product)}
                      type="button"
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </button>
                  </div>
                  <ProductPriceCard price={item.unitPrice} size="xs" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <ProductCardQuantity item={item} />
                  <div className="text-sm font-medium">
                    ${(item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CartItems;
