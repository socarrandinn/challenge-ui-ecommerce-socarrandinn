import { TransTypography } from "@/components/core/trans-typography";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ICardItem } from "@/constants/card-item";
import { ILucideIconProps } from "@/types/icon";
import { Map } from "lucide-react";
import React from "react";

const CardItem = ({ icon, subtitle, title }: ICardItem) => {
  const Icon: ILucideIconProps = icon || Map;
  return (
    <Card className="w-full rounded-[20px]">
      <CardContent>
        {/* icon */}
        <div className="w-[60px] h-[60px] bg-orange-dark flex flex-row items-center justify-center rounded-full">
          <Icon className="h-10 w-auto text-white" />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <TransTypography
            message={title}
            as="h3"
            className="text-lg font-bold text-primary leading-[24px]"
          />
          <TransTypography
            message={subtitle}
            as="p"
            className="text-sm font-normal text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
