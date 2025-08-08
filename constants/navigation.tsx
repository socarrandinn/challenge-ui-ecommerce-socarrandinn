import { IMenuItem } from "@/interfaces/menu.interface";
import {
  ArchiveIcon,
  CircleDollarSign,
  CircleQuestionMark,
  PackageIcon,
} from "lucide-react";

export const CATALOG_MENU = {
  list: "/catalog/page/1",
  path: (path: string) => `/catalog/${path}`,
};

export const NAVBAR: IMenuItem[] = [
  {
    name: "common:menu.navbar.catalog",
    href: CATALOG_MENU.list,
    icon: ArchiveIcon,
  },
  {
    name: "common:menu.navbar.about-us",
    href: "/about-us",
    icon: ArchiveIcon,
  },
  {
    name: "common:menu.navbar.delivery",
    href: "/delivery",
    icon: PackageIcon,
  },
  {
    name: "common:menu.navbar.payment",
    href: "/payment",
    icon: CircleDollarSign,
  },
  {
    name: "common:menu.navbar.faq",
    href: "/faq",
    icon: CircleQuestionMark,
  },
];
