"use client";
import { IProduct } from "@/interfaces/product.interface";
import ProductFavoriteButton from "./product-favorite-button";
import Image from "next/image";
import { Rating } from "../rating/rating";
import ProductPriceCard from "./product-card-price";
import LongText from "../long-text/long-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductCardQuantity from "./product-card-quantity";
import ProductCartIcon from "./product-cart-button";
import Link from "next/link";
import { CATALOG_MENU } from "@/constants/navigation";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import ProductTag from "./product-new";

type Props = ClassNameProps & {
  product: IProduct;
  imageClassName?: string;
};

const ProductCard = ({ product, imageClassName, className }: Props) => {
  return (
    <Card
      className={cn(
        "w-auto bg-card rounded-2xl overflow-hidden hover:shadow-card transition-shadow duration-300 p-0",
        className
      )}
    >
      {/* Product Image Section */}
      <CardHeader className="relative bg-gradient-to-br bg-white h-[160px] md:h-[224px] flex  items-center justify-center p-0">
        {/* Heart Icon */}
        <ProductFavoriteButton /* productId={product.id} */ />

        {/* discount o new */}
        {product?.isNew && (
          <ProductTag variant="new" className="absolute top-0 left-0 z-[9]" />
        )}

        {product?.discount && (
          <ProductTag
            variant="discount"
            value={product?.discount}
            className="absolute top-0 left-0 z-10"
          />
        )}

        {/* Product Image */}
        <Link
          href={CATALOG_MENU.path(product?.id)}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={product.image.src}
            alt={product.name}
            width={200}
            height={200}
            className={cn(
              "object-contain max-w-full max-h-full",
              imageClassName
            )}
            priority={false}
          />
        </Link>
      </CardHeader>

      {/* Product Details Section */}
      <CardContent className="bg-[#f4f7fc] py-2 px-2 md:py-2 md:px-4 h-full flex flex-col justify-between ">
        <Link href={CATALOG_MENU.path(product?.id)} className="mb-1">
          {/* Price */}
          <ProductPriceCard price={product?.price} />

          {/* Product Name */}
          <LongText
            lineClamp={2}
            text={product?.name}
            className="text-xs md:text-sm font-normal"
          />

          {/* Rating */}
          <Rating
            value={product?.rating}
            className={"ring-0 mt-3"}
            variant="preview"
            size="sm"
          />
        </Link>

        {/* Quantity and Add to Cart */}
        <div className="flex flex-row gap-1 justify-between items-center mt-1">
          <ProductCardQuantity
            item={{
              product: product?.id,
              productSnapShot: product,
              price: 0,
              quantity: 0,
              totalPrice: 0,
              unitPrice: 0,
            }}
          />
          <ProductCartIcon />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
