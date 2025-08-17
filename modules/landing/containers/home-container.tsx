import { TProps } from "@/interfaces/common.types";
import { allBannerService } from "../../common/services/banner.service";
import { BANNER_COLLECTION, IBanner } from "@/interfaces/banner.interface";
import HomeHeroContainer from "./home-hero.container";
import { allCategory } from "@/modules/common/services/category.service";
import HomeCategoryContainer from "./home-category-container";
import HomeProductContainer from "./home-product-container";
import { getProductsByPosition } from "../../common/services/product.service";
import { PRODUCT_COLLECTION } from "@/interfaces/product.interface";
import HomeBannerCard from "./home-banner-card-container";
import HomeWhatYouNeedContainer from "./home-what-you-need-container";
import BannerCombo from "../components/banner-combo/banner-combo";
import HomeFindEveryThingInOnePlaceContainer from "./home-find-everything-in-one-place-container";
import HomeBannerMini from "./home-banner-mini-container";
import { Suspense } from "react";
import HomeHeroSkeleton from "../skeleton/home-hero.skeleton";

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

  const { data: mini1 } = await allBannerService(BANNER_COLLECTION.MINI_1);
  const { data: mini2 } = await allBannerService(BANNER_COLLECTION.MINI_2);

  const { data: categories } = await allCategory();
  const { data: recommended } = await getProductsByPosition(
    PRODUCT_COLLECTION.RECOMMENDED
  );

  const { data: moreSales } = await getProductsByPosition(
    PRODUCT_COLLECTION.MORE_SALES
  );

  const { data: moreRecent } = await getProductsByPosition(
    PRODUCT_COLLECTION.MORE_RECENT
  );

  return (
    <section className="flex flex-col gap-5 md:gap-10 mt-4 md:mt-8 px-1.5 md:px-0">
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHeroContainer hero={hero || []} />
      </Suspense>

      {/* categories sections */}
      <HomeCategoryContainer categories={categories?.slice(0, 8) || []} />

      {/* mini 1 banner */}
      <HomeBannerMini banners={mini1 || []} />

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

      <div className="flex flex-col gap-4">
        {/* product more sale */}
        <HomeProductContainer
          products={moreRecent?.slice(0, 9) || []}
          variant="list_whit_combo"
          title="home:product.recent"
          componentCombo={<BannerCombo banner={bannerFour?.[0] as IBanner} />}
        />

        {/* mini 2 banner */}
        <HomeBannerMini banners={mini2 || []} />
      </div>

      {/* Find everything in one place section */}
      <HomeFindEveryThingInOnePlaceContainer />
    </section>
  );
};

export default HomeContainer;
