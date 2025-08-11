import ProductCard from "@/components/core/product-card/product-card";
import { IProductSection } from "@/interfaces/product.interface";
import React from "react";

const ProductList = ({ products }: IProductSection) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 gap-2 md:gap-4">
      {products.map((product, index) => (
        <ProductCard product={product} key={`${product?.id}-${index}`} />
      ))}
    </div>
  );
};

export default ProductList;
