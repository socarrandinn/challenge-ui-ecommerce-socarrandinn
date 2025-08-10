import TransTypography from "@/components/core/trans-typography/trans-typography";
import { ChildrenProps, ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = ClassNameProps &
  ChildrenProps & {
    title: string;
  };
const HomeSection = ({ title, className, children }: Props) => {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <TransTypography className="truncate text-lg lg:text-[20px] font-medium" message={title} as="h2" />
      <div className="w-full">{children}</div>
    </section>
  );
};

export default HomeSection;
