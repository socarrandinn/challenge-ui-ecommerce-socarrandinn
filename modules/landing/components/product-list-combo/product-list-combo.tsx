import ProductCard from "@/components/core/product-card/product-card";
import { IProductSection } from "@/interfaces/product.interface";
import React from "react";
import ProductCarrousel from "../product-carrousel/product-carrousel";

const ProductListCombo = ({ products, componentCombo }: IProductSection) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:grid-rows-2 gap-2 md:gap-4">
      {/* combo */}
      <div className="md:col-span-2">{componentCombo}</div>

      {/* products desktop */}
      {products.map((product) => (
        <ProductCard
          className="hidden md:flex"
          imageClassName="md:h-[176px]"
          product={product}
          key={product.id}
        />
      ))}

      {/* product mobile */}
      <div className="md:hidden">
        <ProductCarrousel products={products} hidePreviousAndNext />
      </div>
    </div>
  );
};

export default ProductListCombo;
