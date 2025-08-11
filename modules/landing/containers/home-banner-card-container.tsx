import Container from "@/components/layouts/container";
import React from "react";
import MetallicBanner from "../components/metallic-banner/metallic-banner";
import { IBanner } from "@/interfaces/banner.interface";

type Props = {
  banners: IBanner[];
};

const HomeBannerCard = ({ banners }: Props) => {
  if (banners?.length === 0) return null;
  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
        {banners?.map((banner) => (
          <picture key={banner?.id}>
            <MetallicBanner imagen={banner?.imagen} alt={banner?.text} />
          </picture>
        ))}
      </section>
    </Container>
  );
};

export default HomeBannerCard;
