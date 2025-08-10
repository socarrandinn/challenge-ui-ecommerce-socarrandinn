import { TProps } from "@/interfaces/common.types";
import React from "react";
import { allBannerService } from "../../common/services/banner.service";
import { BANNER_COLLECTION, IBanner } from "@/interfaces/banner.interface";
import HomeHeroContainer from "./home-hero.container";
import { allCategoryService } from "@/modules/common/services/category.service";
import HomeCategoryContainer from "./home-category-container";
import HomeMiniBanner1Container from "./home-mini-banner-1-container";
import HomeProductContainer from "./home-product-container";
import { getProductByPosition } from "../../common/services/product.service";
import { PRODUCT_COLLECTION } from "@/interfaces/product.interface";
import HomeBannerCard from "./home-banner-card-container";
import HomeWhatYouNeedContainer from "./home-what-you-need-container";
import BannerCombo from "../components/banner-combo/banner-combo";
import HomeFindEveryThingInOnePlaceContainer from "./home-find-everything-in-one-place-container";
import HomeSaveOnYourCareContainer from "./home-save-on-your-care-container";

type Props = TProps & {
  params: Promise<{ locale: string }>;
  namespaces: string[];
};
const HomeContainer = async ({}: Props) => {
  const { data: hero } = await allBannerService(BANNER_COLLECTION.HERO);

  const { data: bannerCard } = await allBannerService(
    BANNER_COLLECTION.BANNER_CARD
  );

  const { data: bannerFour } = await allBannerService(
    BANNER_COLLECTION.BANNER_FOUR
  );

  const { data: categories } = await allCategoryService();
  const { data: recommended } = await getProductByPosition(
    PRODUCT_COLLECTION.RECOMMENDED
  );

  const { data: moreSales } = await getProductByPosition(
    PRODUCT_COLLECTION.MORE_SALES
  );

  const { data: moreRecent } = await getProductByPosition(
    PRODUCT_COLLECTION.MORE_RECENT
  );

  return (
    <section className="flex flex-col gap-10 mt-8">
      <HomeHeroContainer hero={hero || []} />
      <HomeCategoryContainer categories={categories?.slice(0, 8) || []} />

      {/* mini banner */}
      <HomeMiniBanner1Container />

      {/* product recommended */}
      <HomeProductContainer
        products={recommended || []}
        variant="list"
        title="home:product.recommended"
      />

      {/* banner card */}
      <HomeBannerCard banners={bannerCard || []} />

      {/* product more sale */}
      <HomeProductContainer
        products={moreSales || []}
        variant="carrousel"
        title="home:product.more-sales"
      />

      {/* lo que necesitas */}
      <HomeWhatYouNeedContainer />

      {/* product more sale */}
      <HomeProductContainer
        products={moreRecent?.slice(0, 9) || []}
        variant="list_whit_combo"
        title="home:product.recent"
        componentCombo={<BannerCombo banner={bannerFour?.[0] as IBanner} />}
      />

      {/* Save on your care section  */}
      <HomeSaveOnYourCareContainer />

      {/* Find everything in one place section */}
      <HomeFindEveryThingInOnePlaceContainer />
    </section>
  );
};

export default HomeContainer;
