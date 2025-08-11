import TransTypography from "@/components/core/trans-typography/trans-typography";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { CATALOG_MENU } from "@/constants/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeFindEveryThingInOnePlaceContainer = () => {
  return (
    <Container className="-mb-[47px] md:-mb-[88px] -z-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <picture className="order-2 md:order-1">
          {/* desktop */}
          <Image
            alt="find every thing in one place"
            src="/images/banner/banner-five/desktop/banner-five.webp"
            height={467}
            width={805}
            className="object-contain aspect-auto hidden md:block"
          />

          {/* mobile */}
          <Image
            alt="find every thing in one place"
            src="/images/banner/banner-five/mobile/banner-five.webp"
            height={316}
            width={525}
            className="object-contain aspect-auto block md:hidden"
          />
        </picture>

        <div className="px-5 md:px-10 lg:px-20 pt-8 flex flex-col justify-start gap-3 items-start order-1 md:order-2">
          <TransTypography
            message="home:find-everything:title"
            className="text-4xl md:text-[42px] font-bold leading-[117%] text-primary"
            as="h2"
          />
          <TransTypography
            className="text-sm md:text-[1rem] font-normal leading-normal text-gray-600"
            message="home:find-everything:subtitle"
            as="p"
          />

          <Button className="mt-3 md:mt-6" asChild size={"lg"}>
            <Link href={CATALOG_MENU.list}>
              <TransTypography message="common:explore-product" as="span" />
            </Link>
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default HomeFindEveryThingInOnePlaceContainer;
