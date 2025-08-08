"use client";
import { MenuItem } from "@/components/core/navbar-menu/menu-item";
import { NAVBAR } from "@/constants/navigation";
import { usePathname } from "next/navigation";

const HeaderMobileNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className={"px-4"}>
      <ul className="flex flex-col items-start gap-2">
        {NAVBAR.map((item) => {
          return (
            <MenuItem
              key={item.name}
              {...item}
              activePathName={pathname}
              variant="button"
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderMobileNavbar;
