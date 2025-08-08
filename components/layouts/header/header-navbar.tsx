"use client";
import { NAVBAR } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClassNameProps } from "@/interfaces/common.types";
import { MenuItem } from "@/components/core/navbar-menu/menu-item";
import Container from "../container";

type Props = ClassNameProps & {};
const HeaderNavbar = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex w-full gap-4 bg-primary h-12 py-2", className)}>
      <Container>
        <ul className="flex items-center justify-start gap-3">
          {NAVBAR.map((item) => {
            return (
              <MenuItem
                name={item?.name}
                href={item?.href}
                key={item.name}
                variant="ghost"
                icon={undefined}
                activePathName={pathname}
                className="text-sm w-auto  [&>p]:text-white [&>p]:group-hover:text-primary"
                size="sm"
              />
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};

export default HeaderNavbar;
