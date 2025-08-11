import { TransTypography } from "@/components/core/trans-typography";
import Container from "@/components/layouts/container";
import { CATALOG_MENU } from "@/constants/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const components = {
  CatalogLink: (
    <Link href={CATALOG_MENU.list} className="text-primary hover:underline" />
  ),
};

const HomeMiniBanner1Container = () => {
  return (
    <Container>
      <section className="bg-[#F9E2BF] w-full h-[188px] md:h-[85px] p-3 rounded-2xl md:rounded-none md:px-[30px] md:py-4 flex flex-row justify-between relative overflow-hidden">
        <div className="flex flex-col items-start z-[2] w-10/12 md:w-full">
          <TransTypography
            as="h2"
            className="text-2xl font-bold text-orange-dark"
            message="home:mini-banner-1:title"
          />
          <TransTypography
            as="p"
            className="text-[16px] md:text-sm font-normal text-primary"
            message="home:mini-banner-1:subtitle"
            components={components}
          />
        </div>
        {/* desktop */}
        <Image
          src={"/images/banner/banner-two/banner-two-desktop.webp"}
          alt={"Banner"}
          fill
          className={
            "w-1/2 h-full object-contain object-right z-[1] hidden md:block"
          }
        />

        {/* mobile */}
        <Image
          src={"/images/banner/banner-two/banner-two-mobile.webp"}
          alt={"Banner"}
          fill
          className={
            "w-full h-full object-contain object-right z-[1] block md:hidden"
          }
        />
      </section>
    </Container>
  );
};

export default HomeMiniBanner1Container;
