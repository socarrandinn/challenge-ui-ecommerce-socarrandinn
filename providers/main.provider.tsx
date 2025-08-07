import { TooltipProvider } from "@/components/ui/tooltip";
import React, { PropsWithChildren } from "react";
import AppProvider from "./app.provider";

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <AppProvider>{children}</AppProvider>
    </TooltipProvider>
  );
};

export default MainProvider;
