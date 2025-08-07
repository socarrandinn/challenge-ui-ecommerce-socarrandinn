"use client";
import { ChildrenProps } from "@/interfaces/common.types";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: ChildrenProps) => {
  return <SWRConfig>{children}</SWRConfig>;
};
