"use client";

import { useScrollBar } from "@/hooks/use-scroll-bar";
import { ChildrenProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";

const HeaderWrapper = ({ children }: ChildrenProps) => {
  const { isVisible, lastScrollY } = useScrollBar();
  return (
    <header
      className={cn(
        "left-0 top-0 z-40 w-full bg-sidebar transition-transform duration-300 ease-in-out will-change-transform glass",
        !isVisible ? "-translate-y-full" : "translate-y-0",
        isVisible && lastScrollY > 100 ? "fixed shadow-lg" : "border-b"
      )}
    >
      {children}
    </header>
  );
};

export default HeaderWrapper;
