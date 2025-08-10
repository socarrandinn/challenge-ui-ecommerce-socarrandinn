import { useMemo } from "react";
import TransTypography from "../trans-typography/trans-typography";
import PercentValue from "../values/percent-value";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";

type Props = ClassNameProps & {
  value?: number;
  variant: "new" | "discount";
};

const ProductTag = ({ value, variant, className }: Props) => {
  const content = useMemo(() => {
    switch (variant) {
      case "new":
        return <TransTypography message="common:product:new" />;
      case "discount":
        return <PercentValue value={value ?? 0} />;

      default:
        break;
    }
  }, [value, variant]);

  return (
    <div
      className={cn(
        "bg-orange-dark rounded-[15px_0_20px_0] p-[4px_15px_7px_16px] text-white font-bold",
        className
      )}
    >
      {content}
    </div>
  );
};

export default ProductTag;
