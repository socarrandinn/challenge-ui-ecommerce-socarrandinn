"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { HeartIcon } from "@/components/core/icons/heart-icon";

const ProductFavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      onClick={toggleFavorite}
      variant={"outline"}
      className={cn(
        "absolute w-10 h-10 top-4 right-4 p-1 rounded-full bg-white",
        isFavorite
          ? "text-orange-dark"
          : "text-gray-400 hover:text-orange-light"
      )}
    >
      <HeartIcon
        className={cn(
          "transition-colors duration-200",
          "h-[22px] w-[22px]",
          isFavorite ? "text-orange-dark" : "none"
        )}
      />
    </Button>
  );
};

export default ProductFavoriteButton;
