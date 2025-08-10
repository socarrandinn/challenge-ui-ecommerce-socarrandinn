import React, { ReactNode } from "react";
import HomeSection from "../components/home-section/home-section";
import Container from "@/components/layouts/container";
import { IProduct } from "@/interfaces/product.interface";
import ProductList from "../components/product-list/product-list";

type Props = {
  products: IProduct[];
  combo?: ReactNode;
  variant: "list" | "list_whit_combo" | "slide";
};

const productFactory = {
  list: ProductList,
  list_whit_combo: ProductList,
  slide: ProductList,
};

const HomeProductContainer = ({ products, combo, variant }: Props) => {
  const Component = productFactory[variant];
  return (
    <Container>
      <HomeSection title="home:category.title">
        <Component products={products} combo={combo} />
      </HomeSection>
    </Container>
  );
};

export default HomeProductContainer;
