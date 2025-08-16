"use client";

import { cn, removeLanguageCodes } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LongText from "../long-text/long-text";
import { IMenuItem } from "@/interfaces/menu.interface";
import { ClassNameProps } from "@/interfaces/common.types";

const ACTIVE_STYLES = {
  link: "text-primary underline [&>p]:!text-primary [&>svg]:!text-primary dark:text-primary dark:[&>p]:!text-primary dark:[&>svg]:!text-primary",
  button:
    "!bg-primary [&>svg]:!text-white [&>p]:!text-white dark:bg-primary dark:[&>svg]:!text-white dark:[&>p]:!text-white",
  ghost:
    "!bg-muted [&>svg]:!text-primary [&>p]:!text-primary dark:!bg-muted/80 dark:[&>svg]:!text-primary dark:[&>p]:!text-primary",
} as const;

const linkVariants = cva(
  "group flex items-center gap-2 rounded-full transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        link: "underline-offset-4 [&>p]:group-hover:underline [&>svg]:text-black/80 [&>p]:text-black/80 [&>svg]:group-hover:text-primary [&>p]:group-hover:text-primary dark:[&>svg]:text-white/80 dark:[&>p]:text-white/80 dark:[&>svg]:group-hover:text-primary dark:[&>p]:group-hover:text-primary",
        button:
          "bg-transparent hover:bg-primary [&>svg]:!text-primary [&>svg]:group-hover:!text-white [&>p]:text-black/80 [&>p]:group-hover:text-white dark:[&>svg]:text-white/80 dark:[&>p]:text-white/80 dark:[&>svg]:group-hover:text-white dark:[&>p]:group-hover:text-white",
        ghost:
          "bg-transparent shadow-xs hover:bg-muted [&>svg]:text-black [&>p]:text-black dark:[&>svg]:text-white dark:[&>p]:text-white dark:hover:bg-muted/50",
      },
      size: {
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-10 rounded-full px-4 py-2 has-[>svg]:px-3",
        lg: "h-12 rounded-full px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "button",
      size: "md",
    },
  }
);

// Tipos mejorados con mejor definición
type MenuItemVariant = "link" | "button" | "ghost";
type MenuItemSize = "sm" | "md" | "lg";

interface MenuItemProps extends IMenuItem, ClassNameProps {
  activePathName?: string;
  variant?: MenuItemVariant;
  size?: MenuItemSize;
}

export const MenuItem = ({
  icon: Icon,
  href,
  name,
  activePathName,
  className,
  variant = "button",
  size = "md",
  target,
}: MenuItemProps) => {
  const { t } = useTranslation();

  const isActive = useMemo(() => {
    if (!activePathName) return false;
    return removeLanguageCodes(activePathName).includes(href);
  }, [href, activePathName]);

  const linkContent = useMemo(
    () => (
      <>
        {Icon && <Icon className="min-w-8" aria-hidden="true" />}
        <LongText text={t(name)} lineClamp={1} className="text-nowrap" />
      </>
    ),
    [Icon, t, name]
  );

  const linkClassName = useMemo(() => {
    const activeStyles = isActive ? ACTIVE_STYLES[variant] : "";
    const fontWeight = isActive ? "font-semibold" : "";

    return linkVariants({
      variant,
      size,
      className: cn(className, fontWeight, activeStyles),
    });
  }, [variant, size, className, isActive]);

  return (
    <Link
      href={href}
      target={target}
      className={linkClassName}
      aria-current={isActive ? "page" : undefined}
    >
      {linkContent}
    </Link>
  );
};
