import Container from "@/components/layouts/container";
import React from "react";
import MetallicBanner from "../components/metallic-banner/metallic-banner";
import { IBanner } from "@/interfaces/banner.interface";

type Props = {
  banners: IBanner[];
};

const HomeBannerMini = ({ banners }: Props) => {
  if (banners?.length === 0) return null;
  return (
    <Container>
      {banners?.map((banner) => (
        <picture key={banner?.id}>
          <MetallicBanner
            className="rounded-none"
            imagen={banner?.imagen}
            alt={banner?.text}
          />
        </picture>
      ))}
    </Container>
  );
};

export default HomeBannerMini;
