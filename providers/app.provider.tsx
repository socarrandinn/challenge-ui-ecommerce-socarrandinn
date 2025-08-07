"use client";
import { Toaster } from "sonner";
import { TOASTER_CONFIG } from "@/lib/config/toaster";
import { SWRProvider } from "./swr-provider";
import { ChildrenProps } from "@/interfaces/common.types";

const AppProvider = ({ children }: ChildrenProps) => {
  return (
    <>
      <SWRProvider>{children}</SWRProvider>
      <Toaster {...TOASTER_CONFIG} />
    </>
  );
};

export default AppProvider;
