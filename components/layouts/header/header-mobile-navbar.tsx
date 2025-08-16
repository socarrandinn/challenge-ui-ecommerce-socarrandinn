"use client";
import { Logo } from "@/components/core/logo";
import { MenuItem } from "@/components/core/navbar-menu/menu-item";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import { NAVBAR } from "@/constants/navigation";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useId } from "react";

const HeaderMobileNavbar = () => {
  const pathname = usePathname();
  const id = useId();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button size="icon" variant="ghost">
          <Menu className="h-5 w-5 " />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[100vw] flex-col p-0 bg-sidebar">
        <SheetHeader className="flex  flex-row justify-between relative">
          <Logo className="text-4xl" />
        </SheetHeader>
        <SheetClose asChild>
          <nav className={"px-4"}>
            <ul className="flex flex-col items-start gap-2">
              {NAVBAR.map((item) => {
                return (
                  <MenuItem
                    key={`${id}-${item.name}`}
                    {...item}
                    activePathName={pathname}
                    variant="button"
                  />
                );
              })}
            </ul>
          </nav>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobileNavbar;
