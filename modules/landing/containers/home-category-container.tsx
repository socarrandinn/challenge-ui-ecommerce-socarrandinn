import React from "react";
import HomeSection from "../components/home-section/home-section";
import CategoryCarrousel from "../components/category-card/category-carrousel";
import { ICategory } from "@/interfaces/category.interface";
import Container from "@/components/layouts/container";

type Props = {
  categories: ICategory[];
};
const HomeCategoryContainer = ({ categories }: Props) => {
  return (
    <Container>
      <HomeSection title="home:category.title">
        <CategoryCarrousel categories={categories} />
      </HomeSection>
    </Container>
  );
};

export default HomeCategoryContainer;
