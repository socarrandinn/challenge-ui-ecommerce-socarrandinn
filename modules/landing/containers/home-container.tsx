import { TProps } from "@/interfaces/common.types";
import React from "react";
import { allBannerService } from "../services/banner.service";
import { BANNER_POSITION, IBanner } from "@/interfaces/banner.interface";
import HomeHeroContainer from "./home-hero.container";

type Props = TProps & {
  params: Promise<{ locale: string }>;
  namespaces: string[];
};
const HomeContainer = async ({}: Props) => {
  const { data: hero } = await allBannerService(BANNER_POSITION.HERO);

  return (
    <section className="flex flex-col gap-5 mt-5">
      <HomeHeroContainer hero={hero as IBanner[]} />
    </section>
  );
};

export default HomeContainer;
