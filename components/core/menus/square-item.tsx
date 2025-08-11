import { cn } from "@/lib/utils";
import React from "react";

const SquareItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    data-square
    className={cn(
      "bg-muted flex size-6 items-center justify-center rounded text-xs font-medium",
      className
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);

export default SquareItem;
