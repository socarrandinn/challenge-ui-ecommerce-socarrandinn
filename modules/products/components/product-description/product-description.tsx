import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have shadcn utils

type Props = {
  textHtml: string;
  className?: string;
};

const ProductDescription = ({ textHtml, className }: Props) => {
  const createMarkup = (html: string) => {
    const sanitized = html
      .replace(/<script.*?>.*?<\/script>/gim, "")
      .replace(/on\w+=".*?"/gim, "");

    return { __html: sanitized };
  };

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-headings:font-medium prose-p:text-muted-foreground",
        "prose-a:text-primary hover:prose-a:text-primary/80 prose-a:underline",
        "prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground",
        className
      )}
      dangerouslySetInnerHTML={createMarkup(textHtml)}
    />
  );
};

export default ProductDescription;
