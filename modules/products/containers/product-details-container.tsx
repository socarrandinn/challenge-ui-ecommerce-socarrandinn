import { IProduct } from "@/interfaces/product.interface";
import ProductImagePreview from "../components/product-image-preview/product-image-preview";
import ProductInfo from "../components/product-info/product-info";

import ProductTabs from "../components/product-tabs/product-tabs";
import { ICategory } from "@/interfaces/category.interface";

type Props = {
  product: IProduct;
  category: ICategory;
};
export default function ProductDetail({ product, category }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Galería de imágenes */}

          <ProductImagePreview product={product} />

          {/* Información del producto */}
          <ProductInfo product={product} category={category} />
        </div>

        {/* Tabs de información */}
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
