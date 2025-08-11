"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { StartIcon } from "../icons/start-icon";

interface RatingProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  variant?: "editable" | "preview";
  size?: "sm" | "md" | "lg";
}

const ratingSize = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-7 h-7",
};

export function Rating({
  label,
  value = 0,
  onChange,
  className,
  variant = "editable",
  size = "md",
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<number>(value);

  const handleClick = (value: number) => {
    if (variant === "editable") {
      setSelectedValue(value);
      onChange?.(value);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 ", className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-0 transition-transform hover:scale-110"
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => handleClick(star)}
            disabled={variant === "preview"}
          >
            <StartIcon
              className={cn(
                ratingSize[size],
                "fill-[#FCC106] cursor-pointer",
                (
                  hoverValue !== null
                    ? star <= hoverValue
                    : star <= selectedValue
                )
                  ? "fill-[#FCC106]"
                  : "fill-slate-300"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
