"use client";

import ProductFavoriteButton from "@/components/core/product-card/product-favorite-button";
import PercentValue from "@/components/core/values/percent-value";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/product.interface";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// todo
const thumbnails = [
  "/images/no-image.webp",
  "/images/no-image.webp",
  "/images/no-image.webp",
  "/images/no-image.webp",
];

type Props = {
  product: IProduct;
};

const ProductImagePreview = ({ product }: Props) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div
          ref={imageRef}
          className="relative aspect-square bg-white rounded-lg border overflow-hidden cursor-zoom-in group"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={product?.image?.src || "/placeholder.svg?height=400&width=400"}
            alt="Producto principal"
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />

          {/* Overlay de zoom */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Indicador de zoom */}
          <div className="absolute top-4 right-16 bg-white/90 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SearchIcon className="h-4 w-4 text-gray-600" />
          </div>

          {/* discount */}
          {product?.discount && (
            <Badge className="absolute top-4 left-4 bg-red-500">
              <PercentValue value={product?.discount} />
            </Badge>
          )}

          {/* favorite */}
          <ProductFavoriteButton className="w-8 h-8 md:w-[37px] md:h-[37px] [&>svg]:size-4 p-0" />
        </div>

        {/* Vista ampliada para móviles */}
        <div className="md:hidden mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            {isZoomed ? "Zoom Normal" : "Ver Ampliado"}
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto p-2">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
              selectedImage === index
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={thumb || "/placeholder.svg"}
              alt={`Vista ${index + 1}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImagePreview;
