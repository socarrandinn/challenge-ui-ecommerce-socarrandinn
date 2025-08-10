import { IBanner } from "@/interfaces/banner.interface";
import React from "react";
import MetallicBanner from "../metallic-banner/metallic-banner";

type Props = {
  banner: IBanner;
};
const BannerCombo = ({ banner }: Props) => {
  if (!banner?.imagen) return null;

  return (
    <picture>
      <MetallicBanner imagen={banner?.imagen} alt={banner?.text} />
    </picture>
  );
};

export default BannerCombo;
