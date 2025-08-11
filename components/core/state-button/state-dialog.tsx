import { setRegion } from "@/app/actions/region";
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
import { STATES } from "@/constants/states";
import { useSearch } from "@/hooks/use-search";
import { useToggle } from "@/hooks/use-toogle";
import { ChildrenProps, ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect } from "react"; // Removemos useMemo
import { TransTypography } from "../trans-typography";
import StateMenu from "../menus/states-menu";
import { ButtonLoading } from "../button-loading";

type Props = ChildrenProps &
  ClassNameProps & {
    region?: string;
  };

const StateDialog = ({ children, className, region }: Props) => {
  const { state: slugState, setState } = useSearch();
  const modal = useToggle(false);
  const loading = useToggle(false);

  // Determinar si hay región seleccionada
  const hasRegion = !!region;

  // Sincronizar región con el estado de búsqueda (usando useEffect)
  useEffect(() => {
    if (hasRegion) {
      setState(region);
    }
  }, [hasRegion, region, setState]);

  // Verificar si la región es válida
  const isValidRegion =
    slugState && STATES.some((state) => state.slug === slugState);

  const handleState = useCallback(async () => {
    if (!isValidRegion) return;

    loading.onOpen();
    const state = STATES.find((st) => st.slug === slugState);

    try {
      if (state) {
        await setRegion(state);
      }
    } finally {
      loading.onClose();
      modal.onClose(); // Cerrar modal después de la operación
    }
  }, [slugState, loading, modal, isValidRegion]);

  return (
    <Dialog
      open={!hasRegion ? true : modal.open}
      onOpenChange={(open) => {
        // Prevenir cierre solo cuando es obligatorio
        if (hasRegion) {
          return open ? modal.onOpen() : modal.onClose();
        }
      }}
    >
      <DialogTrigger className={cn(className)} asChild>
        {children}
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

        <StateMenu />

        <DialogFooter className="border-t pt-4">
          <DialogClose>
            <Button variant="ghost" disabled={!hasRegion}>
              <TransTypography message="common:cancel" as="span" />
            </Button>
          </DialogClose>

          <ButtonLoading
            loading={loading.open}
            variant={"default"}
            onClick={handleState}
            disabled={!isValidRegion}
          >
            <TransTypography message="common:save" as="span" />
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StateDialog;
