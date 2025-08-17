import Container from "@/components/layouts/container";
import React from "react";
import MetallicBanner from "../components/metallic-banner/metallic-banner";
import { IBanner } from "@/interfaces/banner.interface";

type Props = {
  hero: IBanner[];
};

const HomeHeroContainer = ({ hero }: Props) => {

  console.log(hero,'sss')
  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-2 lg:gap-3">
        {/* Main banner - left side, full height */}
        <div
          className={`
            col-start-1
            lg:col-span-4 lg:row-span-2
          `}
        >
          <picture>
            <MetallicBanner imagen={hero[0]?.imagen} alt={hero[0]?.text} />
          </picture>
        </div>

        {/* Top right banner */}
        <div
          className={`
            col-start-1
            lg:col-span-2 lg:row-span-1 lg:col-start-5 lg:row-start-1
          `}
        >
          <picture>
            <MetallicBanner imagen={hero[1]?.imagen} alt={hero[1]?.text} />
          </picture>
        </div>

        {/* Bottom right banner */}
        <div
          className={`
            col-start-1
            lg:col-span-2 lg:row-span-1 lg:col-start-5 lg:row-start-2
          `}
        >
          <picture>
            <MetallicBanner imagen={hero[2]?.imagen} alt={hero[2]?.text} />
          </picture>
        </div>
      </section>
    </Container>
  );
};

export default HomeHeroContainer;
