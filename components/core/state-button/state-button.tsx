"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, MapPinIcon } from "lucide-react";
import { TransTypography } from "../trans-typography copy";
import StateMenu from "../menus/states-menu";
import { useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import { setCookie } from "@/app/actions/cookies";
import { useToggle } from "@/hooks/use-toogle";
import { ButtonLoading } from "../button-loading";

type Props = ClassNameProps & {
  stateName?: string;
};
const StateButton = ({ className, stateName }: Props) => {
  const { state } = useSearch();
  const { open, onOpen, onClose } = useToggle(false);

  const handleState = useCallback(async () => {
    onOpen();
    await setCookie("state", state);
    onClose();
  }, [onClose, onOpen, state]);

  return (
    <Dialog>
      <DialogTrigger className={cn(className)} asChild>
        <Button
          variant="ghost"
          className="h-8 lg:h-[46px] px-3 text-sm font-normal lg:bg-sidebar-primary-foreground"
        >
          <MapPinIcon className="w-6 h-6 text-primary" />
          <span className="hidden lg:block">
            {stateName ? stateName : "Select State"}
          </span>
          <ChevronDown className="hidden lg:block" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <TransTypography message="common:state:title" as="p" />
          </DialogTitle>
          <DialogDescription>
            <TransTypography message="common:state:subtitle" as="span" />
          </DialogDescription>
        </DialogHeader>

        {/* select */}
        <StateMenu />

        <DialogFooter className="border-t pt-4">
          <DialogClose>
            <Button variant="ghost">
              <TransTypography message="common:cancel" as="span" />
            </Button>
          </DialogClose>

          <ButtonLoading
            loading={open}
            variant={"default"}
            onClick={handleState}
          >
            <TransTypography message="common:save" as="span" />
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StateButton;
