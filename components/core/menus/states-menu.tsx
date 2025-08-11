"use client";

import { MapPinIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { STATES } from "@/constants/states";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId } from "react";
import SquareItem from "./square-item";
import { useSearch } from "@/hooks/use-search";

type Props = ClassNameProps;

const StateMenu = ({ className }: Props) => {
  const { t } = useTranslation("common");
  const { state, setState } = useSearch();
  const id = useId();

  return (
    <Select defaultValue={state} onValueChange={setState}>
      <SelectTrigger
        id={id}
        className={cn(
          "ps-2 [&>span]:flex bg-sidebar-primary-foreground w-full   [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0",
          className
        )}
      >
        <SelectValue placeholder={t('state.select')}/>
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
        <SelectGroup>
          <SelectLabel className="ps-2">{t("state.select")}</SelectLabel>
          {STATES?.map((state) => {
            return (
              <SelectItem
                value={state?.code?.toString()}
                key={state?.code}
              >
                <SquareItem className="!bg-blue-100 text-primary">
                  <MapPinIcon className="w-4 h-4" />
                </SquareItem>
                <span className="truncate">{state?.name}</span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StateMenu;
