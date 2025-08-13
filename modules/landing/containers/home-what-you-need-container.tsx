import TransTypography from "@/components/core/trans-typography/trans-typography";
import Container from "@/components/layouts/container";
import React from "react";
import CardListContent from "../components/card-list/card-list.content";
import { CARD_ITEMS } from "@/constants/card-item";
import Image from "next/image";

const HomeWhatYouNeedContainer = () => {
  return (
    <section className="relative flex flex-row items-center w-full bg-primary h-auto xl:h-[330px] mb-10 mt-8 md:mt-0">
      <Container className="relative">
        {/* pills */}
        <Image
          alt="pill-1"
          src={"/images/pill.webp"}
          height={75}
          width={75}
          className="absolute top-0 -translate-y-1/2 left-0 rotate-260 blur-[4px]"
          placeholder="blur"
          blurDataURL={"/images/pill.webp"}
          loading="lazy"
        />
        <Image
          alt="pill-2"
          src={"/images/pill.webp"}
          height={90}
          width={90}
          className="absolute h-14 w-14 md:w-24 md:h-24 bottom-0 translate-y-1/2 left-30 rotate-260 lg:left-40 blur-[3px]"
          placeholder="blur"
          blurDataURL={"/images/pill.webp"}
          loading="lazy"
        />
        <Image
          alt="pill-2"
          src={"/images/pill.webp"}
          height={60}
          width={60}
          className="absolute -top-2 -translate-y-1/2 right-0 blur-[3px]"
          placeholder="blur"
          blurDataURL={"/images/pill.webp"}
          loading="lazy"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-12 md:py-6">
          <TransTypography
            message="home:what-you-need:title"
            className={`
            text-3xl lg:text-4xl xl:text-[42px]
            text-white font-bold
            w-full xl:max-w-[480px]
            col-span-1 md:col-span-2
            my-auto
            text-center md:text-left
            `}
            as="h2"
          />
          {/* cards */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <CardListContent cards={CARD_ITEMS} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeWhatYouNeedContainer;
