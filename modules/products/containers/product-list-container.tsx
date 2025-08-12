import ProductCard from "@/components/core/product-card/product-card";
import TransTypography from "@/components/core/trans-typography/trans-typography";
import Container from "@/components/layouts/container";
import { IProduct } from "@/interfaces/product.interface";

type Props = {
  products: IProduct[];
  error?: any
};
const ProductListContainer = ({ products }: Props) => {
  console.log(products,'sss')
  return (
    <Container>
      <section className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4 mb-4">
        <TransTypography message="common:product-catalog" className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 gap-2 md:gap-4">
          {products?.map((product, index) => (
            <ProductCard product={product} key={`${product?.id}-${index}`} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default ProductListContainer;
