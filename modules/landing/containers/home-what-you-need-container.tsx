import TransTypography from "@/components/core/trans-typography/trans-typography";
import Container from "@/components/layouts/container";
import React from "react";
import CardListContent from "../components/card-list/card-list.content";
import { CARD_ITEMS } from "@/constants/card-item";

const HomeWhatYouNeedContainer = () => {
  return (
    <section className="flex flex-row items-center w-full relative bg-primary h-auto xl:h-[330px]">
      <Container>
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
