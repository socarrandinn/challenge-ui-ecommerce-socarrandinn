import React, { ReactNode } from "react";
import HomeSection from "../components/home-section/home-section";
import Container from "@/components/layouts/container";
import { IProduct } from "@/interfaces/product.interface";
import ProductList from "../components/product-list/product-list";
import ProductCarrousel from "../components/product-carrousel/product-carrousel";
import ProductListCombo from "../components/product-list-combo/product-list-combo";

type Props = {
  products: IProduct[];
  componentCombo?: ReactNode;
  variant: "list" | "list_whit_combo" | "carrousel";
  title: string;
};

const productFactory = {
  list: ProductList,
  list_whit_combo: ProductListCombo,
  carrousel: ProductCarrousel,
};

const HomeProductContainer = ({
  products,
  componentCombo,
  variant,
  title,
}: Props) => {
  const Component = productFactory[variant];
  return (
    <Container>
      <HomeSection title={title}>
        <Component products={products} componentCombo={componentCombo} />
      </HomeSection>
    </Container>
  );
};

export default HomeProductContainer;
