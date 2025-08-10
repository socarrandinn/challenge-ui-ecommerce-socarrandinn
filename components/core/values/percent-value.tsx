"use client";
import { cn } from "@/lib/utils";

interface PercentValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  showSign?: boolean;
  decimals?: number;
}

const PercentValue = ({
  value,
  showSign = true,
  decimals = 0,
  className,
  ...props
}: PercentValueProps) => {
  const formatPercentage = () => {
    const formattedValue = value.toFixed(decimals);
    const sign = showSign && value > 0 ? "+" : "";
    return `${sign}${formattedValue}%`;
  };

  return (
    <span className={cn(className)} {...props}>
      {formatPercentage()}
    </span>
  );
};

export default PercentValue;
