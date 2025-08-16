import Container from "@/components/layouts/container";
import { Suspense } from "react";
import HeaderWrapper from "./header-wrapper";
import { ChildrenProps } from "@/interfaces/common.types";
import { Logo } from "@/components/core/logo";
import HeaderSearch from "./header-serach";
import UserMenu from "@/components/core/user-menu/user-menu";
import HeaderMobileNavbar from "./header-mobile-navbar";
import { allCategory } from "@/modules/common/services/category.service";
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
  const { data: categories } = await allCategory();
  const regionCookie = await getCookie(ENV_CONFIG.cookies.X_REGION);

  const renderContent = () => (
    <HeaderWrapper>
      <Container className="flex md:hidden w-full justify-end bg-muted p-0 mb-1">
        <div>
          <LanguageChanger locale={locale} />
        </div>
      </Container>
      <Container className="pt:3 md:pt-8 pb-6  ">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <HeaderMobileNavbar />
            <Logo />
          </div>

          <div className="flex items-center gap-4">
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

          <div className="flex items-center gap-2 md:gap-4">
            {/* region */}
            <Suspense fallback={<StateButtonSkeleton />}>
              <StateButton className="flex lg:hidden" region={regionCookie} />
            </Suspense>

            {/* language */}
            <div className="hidden md:block">
              <LanguageChanger locale={locale} />
            </div>

            {/* product cart */}
            <Cart />

            {/* User menu */}
            <UserMenu />
          </div>
        </div>

        {/* search */}
        <Suspense>
          <HeaderSearch
            className="block lg:hidden mt-1"
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
