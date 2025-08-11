import Container from "@/components/layouts/container";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

import HeaderWrapper from "./header-wrapper";
import { ChildrenProps } from "@/interfaces/common.types";
import { Logo } from "@/components/core/logo";
import HeaderSearch from "./header-serach";
import UserMenu from "@/components/core/user-menu/user-menu";
import { Menu } from "lucide-react";
import HeaderMobileNavbar from "./header-mobile-navbar";
import { allCategoryService } from "@/modules/common/services/category.service";
import LanguageChanger from "@/components/core/language-changer/language-changer";
import HeaderNavbar from "./header-navbar";
import StateButton from "@/components/core/state-button/state-button";
import StateButtonSkeleton from "@/components/core/state-button/state-button-skeleton";
import { getCookie } from "@/app/actions/cookies";
import { ENV_CONFIG } from "@/lib/config/env.config";
import { Cart } from "@/components/core/cart";

type HeaderProps = ChildrenProps & {
  locale: string;
};

export const Header = async ({ locale }: HeaderProps) => {
  const { data: categories } = await allCategoryService();
  const regionCookie = await getCookie(ENV_CONFIG.cookies.X_REGION);

  const renderContent = () => (
    <HeaderWrapper>
      <Container className="pt-8 pb-6">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
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
                <HeaderMobileNavbar />
              </SheetContent>
            </Sheet>
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            {/* region */}
            <Suspense fallback={<StateButtonSkeleton />}>
              <StateButton className="hidden lg:flex" region={regionCookie} />
            </Suspense>

            {/* search */}
            <Suspense>
              <HeaderSearch
                categories={categories || []}
                className="hidden lg:block"
              />
            </Suspense>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* region */}
            <Suspense fallback={<StateButtonSkeleton />}>
              <StateButton className="flex lg:hidden" region={regionCookie} />
            </Suspense>

            {/* language */}
            <LanguageChanger locale={locale} />

            {/* product cart */}
            <Cart />

            {/* User menu */}
            <UserMenu />
          </div>
        </div>

        {/* search */}
        <Suspense>
          <HeaderSearch
            className="block lg:hidden"
            categories={categories || []}
          />
        </Suspense>
      </Container>

      {/* menu */}
      <HeaderNavbar className="hidden md:flex" />
    </HeaderWrapper>
  );

  return renderContent();
};
