import { cn } from "@/lib/utils";
import { CartClient } from "./cart-client";
import { ClassNameProps } from "@/interfaces/common.types";

export function Cart({ className }: ClassNameProps) {
  return (
    <div className={cn("relative", className)}>
      <CartClient className={cn("", className)} />
    </div>
  );
}
