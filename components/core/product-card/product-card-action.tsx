"use client";
import ProductCardQuantity from "./product-card-quantity";
import ProductCartIcon from "./product-cart-button";
import { IProduct } from "@/interfaces/product.interface";
import { useState } from "react";

type Props = {
  product: IProduct;
};

const ProductCartAction = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="flex flex-row gap-1 justify-between items-center mt-1">
      <ProductCardQuantity
        setQuantity={setQuantity}
        quantity={quantity}
        item={{
          product: product?.id,
          quantity,
          price: 0,
          productSnapShot: product,
          totalPrice: 0,
          unitPrice: 0,
        }}
      />
      <ProductCartIcon product={product} quantity={quantity} />
    </div>
  );
};

export default ProductCartAction;
