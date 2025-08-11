import { Skeleton } from "@/components/ui/skeleton";
import { MapPinIcon } from "lucide-react";
import React from "react";

const StateButtonSkeleton = () => {
  return (
    <div className="h-8 w-40 bg-sidebar-primary-foreground rounded-md">
      <MapPinIcon className="w-6 h-6 text-primary" />
      <Skeleton className="h-8 w-28" />
    </div>
  );
};

export default StateButtonSkeleton;
