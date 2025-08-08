"use client";
import React, { memo, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = ButtonProps & {
  children?: ReactNode;
  loading?: boolean;
  className?: string;
  hideLoadingLabel?: boolean;
  tabIndex?: number;
};

const ButtonLoading = ({
  children,
  loading,
  className,
  hideLoadingLabel,
  tabIndex,
  ...props
}: Props) => {
  const { t } = useTranslation();
  return (
    <Button
      disabled={loading}
      className={cn(className)}
      {...props}
      tabIndex={tabIndex ?? 0}
    >
      <div
        className={cn("flex w-full flex-row items-center gap-2 justify-center")}
      >
        {loading && (
          <Loader2
            className={cn(
              "h-4 w-4 animate-spin",
              props?.size === "icon" ? "" : "mr-2"
            )}
          />
        )}
        {loading && props?.size !== "icon" && !hideLoadingLabel ? (
          <span>{t("common:loading")}</span>
        ) : (
          children
        )}
      </div>
    </Button>
  );
};

export default memo(ButtonLoading);
