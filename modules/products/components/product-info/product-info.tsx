"use client";
import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/interfaces/product.interface";
import ProductDescription from "../product-description/product-description";
import { Rating } from "@/components/core/rating/rating";
import ProductPriceCard from "@/components/core/product-card/product-card-price";
import { ICategory } from "@/interfaces/category.interface";
import ProductCartAction from "@/components/core/product-card/product-card-action";

type Props = {
  product: IProduct;
  category: ICategory;
};
const ProductInfo = ({ product, category }: Props) => {
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
        </div>
      </div>

      {/* Precio */}
      <ProductPriceCard
        price={product?.price}
        discount={product?.discount}
        size="lg"
      />

      {/* Quantity and Add to Cart */}
      <ProductCartAction
        product={product}
        variant="button"
        title="common:add-to-cart"
        className="justify-start"
      />

      {/* description */}

      {product?.description && (
        <ProductDescription textHtml={product?.description ?? ""} />
      )}
    </div>
  );
};

export default ProductInfo;
