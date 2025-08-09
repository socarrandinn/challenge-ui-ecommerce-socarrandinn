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
import StateMenu from "../menus/states-menu";
import { useCallback, useMemo } from "react";
import { ClassNameProps, IState } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import { setMultipleCookies } from "@/app/actions/cookies";
import { useToggle } from "@/hooks/use-toogle";
import { ButtonLoading } from "../button-loading";
import { ENV_CONFIG } from "@/lib/config/env.config";
import { STATES } from "@/constants/states";
import { TransTypography } from "../trans-typography";

type Props = ClassNameProps & {
  state?: Partial<Pick<IState, "code" | "name">>;
};
const StateButton = ({ className, state }: Props) => {
  const { state: codeState } = useSearch();
  const loading = useToggle(false);
  const modal = useToggle(false);

  const _stateName = useMemo(() => {
    if (codeState) {
      const obj = STATES?.find((st) => st.code === Number(codeState));
      return obj?.name;
    }
    if (state) {
      return state?.name;
    }

    return "Select State";
  }, [codeState, state]);

  const handleState = useCallback(async () => {
    loading.onOpen();
    const obj = STATES.find((st) => st.code === Number(codeState));
    await setMultipleCookies([
      { name: ENV_CONFIG.cookies.X_REGION, value: obj?.slug },
      { name: ENV_CONFIG.cookies.X_STATE_CODE, value: obj?.code },
      { name: ENV_CONFIG.cookies.X_STATE_NAME, value: obj?.name },
    ]);
    loading.onClose();
    modal.onClose();
  }, [codeState, loading, modal]);

  return (
    <Dialog open={modal.open} onOpenChange={modal.onToggle}>
      <DialogTrigger className={cn(className)} asChild>
        <Button
          variant="ghost"
          className="h-8 lg:h-[46px] px-3 text-sm font-normal lg:bg-sidebar-primary-foreground"
        >
          <MapPinIcon className="w-6 h-6 text-primary" />
          <span className="hidden lg:block">{_stateName}</span>
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
            loading={loading.open}
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
