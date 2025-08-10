import { ICardItem } from "@/constants/card-item";
import React from "react";
import CardItem from "./card-item";

type Props = {
  cards: ICardItem[];
};
const CardListContent = ({ cards }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
      {cards?.map((card) => (
        <CardItem key={card?.title} {...card} />
      ))}
    </div>
  );
};

export default CardListContent;
