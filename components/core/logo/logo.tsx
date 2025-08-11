import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: ClassNameProps) => {
  return (
    <Link className="md:flex items-center gap-2" href="/">
      <span
        className={cn(
          "bg-gradient-to-r from-primary to-primary/70 bg-clip-text tracking-tight text-transparent text-xl font-bold truncate",
          className
        )}
      >
        E-COMMERCE
      </span>
    </Link>
  );
};

export default Logo;
