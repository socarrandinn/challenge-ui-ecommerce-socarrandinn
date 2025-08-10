import { TProps } from "@/interfaces/common.types";
import React from "react";
import { allBannerService } from "../services/banner.service";
import { BANNER_POSITION, IBanner } from "@/interfaces/banner.interface";
import HomeHeroContainer from "./home-hero.container";
import { allCategoryService } from "@/modules/common/services/category.service";
import { ICategory } from "@/interfaces/category.interface";
import HomeCategoryContainer from "./home-category-container";
import HomeMiniBanner1Container from "./home-mini-banner-1-container";
import HomeProductContainer from "./home-product-container";
import { getProductByPosition } from "../services/product.service";
import { PRODUCT_COLLECTION } from "@/interfaces/product.interface";

type Props = TProps & {
  params: Promise<{ locale: string }>;
  namespaces: string[];
};
const HomeContainer = async ({}: Props) => {
  const { data: hero } = await allBannerService(BANNER_POSITION.HERO);
  const { data: categories } = await allCategoryService();
  const { data: recommended } = await getProductByPosition(
    PRODUCT_COLLECTION.RECOMMENDED
  );

  return (
    <section className="flex flex-col gap-16 mt-8">
      <HomeHeroContainer hero={hero as IBanner[]} />
      <HomeCategoryContainer
        categories={categories?.slice(0, 8) as ICategory[]}
      />
      <HomeMiniBanner1Container />

      {/* product recommended */}
      <HomeProductContainer products={recommended || []} variant="list" />
    </section>
  );
};

export default HomeContainer;
