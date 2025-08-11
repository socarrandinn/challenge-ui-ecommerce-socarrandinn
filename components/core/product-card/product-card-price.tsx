import { cn } from "@/lib/utils";

type Props = {
  price: number;
  discount?: number;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function ProductPriceCard({
  price,
  discount = 0,
  className,
  size = "md",
}: Props) {
  const [dollars, cents] = price.toFixed(2).split(".");
  const hasDiscount = discount > 0;

  const sizeClasses = {
    xs: {
      discount: "text-xs px-1 py-0.5",
      price: "text-base",
      cents: "text-xs",
    },
    sm: {
      discount: "text-sm px-1.5 py-0.5",
      price: "text-lg",
      cents: "text-xs",
    },
    md: {
      discount: "text-sm px-2 py-0.5",
      price: "text-2xl",
      cents: "text-lg",
    },
    lg: {
      discount: "text-base px-2 py-1",
      price: "text-3xl",
      cents: "text-xl",
    },
    xl: {
      discount: "text-lg px-3 py-1",
      price: "text-4xl",
      cents: "text-2xl",
    },
  };

  return (
    <div className={cn("flex flex-col justify-center gap-2", className)}>
      {hasDiscount && (
        <span
          className={cn(
            "rounded-button bg-destructive font-medium text-white",
            sizeClasses[size].discount
          )}
          role="text"
          aria-label={`Discount ${discount}%`}
        >
          -{discount}%
        </span>
      )}
      <p
        className={cn("font-semibold leading-none", sizeClasses[size].price)}
        role="text"
        aria-label={`Price ${dollars} dollars`}
      >
        ${dollars}
        <span
          className={cn(
            "ml-1 align-top font-light leading-none",
            sizeClasses[size].cents
          )}
          role="text"
          aria-label={`${cents} cents`}
        >
          {cents}
        </span>
      </p>
    </div>
  );
}
