"use client";
import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/interfaces/product.interface";
import ProductDescription from "../product-description/product-description";
import { Rating } from "@/components/core/rating/rating";
import { Button } from "@/components/ui/button";
import ProductPriceCard from "@/components/core/product-card/product-card-price";
import { useState } from "react";
import TransTypography from "@/components/core/trans-typography/trans-typography";
import { ICategory } from "@/interfaces/category.interface";
import ProductCardQuantity from "@/components/core/product-card/product-card-quantity";

const colors = [
  {
    name: "azul",
    label: "Azul",
    color: "bg-blue-500",
    image: "/placeholder.svg?height=400&width=400&text=Producto+Azul",
  },
  {
    name: "verde",
    label: "Verde",
    color: "bg-green-500",
    image: "/placeholder.svg?height=400&width=400&text=Producto+Verde",
  },
  {
    name: "rojo",
    label: "Rojo",
    color: "bg-red-500",
    image: "/placeholder.svg?height=400&width=400&text=Producto+Rojo",
  },
  {
    name: "morado",
    label: "Morado",
    color: "bg-purple-500",
    image: "/placeholder.svg?height=400&width=400&text=Producto+Morado",
  },
];

const sizes = ["250ml", "500ml", "750ml", "1L"];

type Props = {
  product: IProduct;
  category: ICategory;
};
const ProductInfo = ({ product, category }: Props) => {
  const [selectedColor, setSelectedColor] = useState("azul");
  const [selectedSize, setSelectedSize] = useState("500ml");

  const currentColorData = colors.find((color) => color.name === selectedColor);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-2">
          {category?.name}
        </Badge>

        {product?.name && (
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product?.name}{" "}
          </h1>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Rating variant="preview" value={product?.rating ?? 0} />
          <span className="text-sm text-gray-600">(127 reseñas)</span>
        </div>
      </div>

      {/* Precio */}
      <ProductPriceCard price={product?.price} discount={product?.discount} size="lg"/>

      {/* Selección de color */}
      <div className="space-y-3">
        <h3 className="font-semibold">Color: {currentColorData?.label}</h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 ${color.color} ${
                selectedColor === color.name
                  ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                  : "border-gray-300"
              }`}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Selección de tamaño */}
      <div className="space-y-3">
        <h3 className="font-semibold">Tamaño:</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-lg ${
                selectedSize === size
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-row items-center gap-4">
        <ProductCardQuantity
          className="border h-10"
          item={{
            product: product?.id,
            productSnapShot: product,
            price: 0,
            quantity: 0,
            totalPrice: 0,
            unitPrice: 0,
          }}
        />
        <Button size="lg">
          <TransTypography message="common:addToCart" as="span" />
        </Button>
      </div>

      {/* description */}

      {product?.description && (
        <ProductDescription textHtml={product?.description ?? ""} />
      )}
    </div>
  );
};

export default ProductInfo;
