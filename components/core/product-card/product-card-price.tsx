import { cn } from "@/lib/utils";

type Props = {
  price: number;
  discount?: number;
  className?: string;
  small?: boolean;
  fontSizeClass?: string;
};

export default function ProductPriceCard({
  price,
  discount = 0,
  className,
  small,
  fontSizeClass,
}: Props) {
  const [dollars, cents] = price.toFixed(2).split(".");
  const hasDiscount = discount > 0;

  return (
    <div className={cn("flex flex-col justify-center gap-2", className)}>
      <>
        {hasDiscount && (
          <span
            className="rounded-button bg-destructive px-2 py-0.5 text-sm"
            role="text"
            aria-label={`Discount ${discount}%`}
          >
            -{discount}%
          </span>
        )}
        <p
          className={cn(
            "font-semibold leading-none",
            small ? "text-lg" : "text-2xl",
            fontSizeClass
          )}
          role="text"
          aria-label={`Price ${dollars} dollars`}
        >
          ${dollars}
          <span
            className={cn(
              "ml-1  align-top font-light leading-none",
              small ? "text-xs" : "text-lg"
            )}
            role="text"
            aria-label={`${cents} cents`}
          >
            {cents}
          </span>
        </p>
      </>
    </div>
  );
}
