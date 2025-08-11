"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPinIcon } from "lucide-react";
import { useMemo } from "react";
import { ClassNameProps } from "@/interfaces/common.types";
import { STATES } from "@/constants/states";
import StateDialog from "./state-dialog";

type Props = ClassNameProps & {
  region?: string;
};
const StateButton = ({ className, region }: Props) => {
  const _state = useMemo(() => {
    const slug = region || "hab";
    return STATES.find((st) => st.slug === slug);
  }, [region]);

  return (
    <StateDialog region={region} className={className}>
      <Button
        variant="ghost"
        className="h-8 lg:h-[46px] px-3 text-sm font-normal  bg-sidebar-primary-foreground"
      >
        <MapPinIcon className="w-6 h-6 text-primary" />
        <span className="hidden lg:block">{_state?.name}</span>
        <ChevronDown className="hidden lg:block" />
      </Button>
    </StateDialog>
  );
};

export default StateButton;
