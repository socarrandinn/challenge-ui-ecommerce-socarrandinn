import React from "react";
import { IProduct } from "@/interfaces/product.interface";
import ProductFavoriteButton from "./product-favorite-button";
import Image from "next/image";
import { Rating } from "../rating/rating";
import ProductPriceCard from "./product-card-price";
import LongText from "../long-text/long-text";
import { Card, CardContent } from "@/components/ui/card";
import ProductCardQuantity from "./product-card-quantity";
import ProductCartIcon from "./product-cart-button";
import Link from "next/link";
import { CATALOG_MENU } from "@/constants/navigation";

type Props = {
  product: IProduct;
};
const ProductCard = ({ product }: Props) => {
  return (
    <Card className="w-auto bg-card rounded-2xl overflow-hidden hover:shadow-card transition-shadow duration-300 p-0">
      {/* Product Image Section */}
      <div className="relative bg-gradient-to-br bg-white h-[240px] flex items-center justify-center">
        {/* Heart Icon */}
        <ProductFavoriteButton /* productId={product.id} */ />

        {/* Product Image Placeholder */}
        <Link href={CATALOG_MENU.path(product?.id)}>
          <Image
            src={product.image.src}
            alt={product.name}
            width={200}
            height={240}
            className="object-contain w-auto h-full aspect-square"
          />
        </Link>
      </div>

      {/* Product Details Section */}
      <CardContent className="bg-[#f4f7fc] py-5 px-4">
        <Link href={CATALOG_MENU.path(product?.id)}>
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
            className={"ring-0 mt-6"}
            variant="preview"
            size="sm"
          />
        </Link>

        {/* Quantity and Add to Cart */}
        <div className="flex flex-row gap-1 justify-between items-center mt-3">
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
