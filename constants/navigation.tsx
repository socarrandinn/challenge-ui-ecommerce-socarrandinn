import { IMenuItem } from "@/interfaces/menu.interface";
import {
  ArchiveIcon,
  CircleDollarSign,
  CircleQuestionMark,
  PackageIcon,
} from "lucide-react";

export const CATALOG_MENU = {
  list: "/catalog",
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
    href: "/pages/about-us",
    icon: ArchiveIcon,
  },
  {
    name: "common:menu.navbar.delivery",
    href: "/pages/delivery",
    icon: PackageIcon,
  },
  {
    name: "common:menu.navbar.payment",
    href: "/pages/payment",
    icon: CircleDollarSign,
  },
  {
    name: "common:menu.navbar.faq",
    href: "/pages/faq",
    icon: CircleQuestionMark,
  },
];
