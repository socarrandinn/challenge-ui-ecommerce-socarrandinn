"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFooterSubscribe } from "@/hooks/use-footer-subscribe";
import { ClassNameProps } from "@/interfaces/common.types";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const FooterSubscribeInput = ({ className }: ClassNameProps) => {
  const { t } = useTranslation("common");
  const { onSubmit, ...form } = useFooterSubscribe();

  return (
    <div className={cn("flex-1 w-full relative", className)}>
      <Form {...form}>
        <div className="relative max-w-[420px] w-full lg:w-auto">
          {/* icon search */}
          <MailIcon className="h-5 w-5 stroke-1 absolute  left-3 top-1/2 -translate-y-1/2 rounded-md text-[#4C3737B2] mt-1" />

          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("fields.email")}
                      className={cn(
                        "pl-10 pr-[120px] py-3",
                        "lg:min-w-[18rem] h-10 md:h-12 xl:min-w-[25rem] !w-full glass-glow bg-sidebar-primary-foreground ",
                        " rounded-full"
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Botón de búsqueda */}
            <Button
              size="sm"
              variant="default"
              className="absolute  h-10 md:h-12 text-[1rem] -right-1 bg-orange-dark hover:bg-orange-dark/80   min-w-[100px] w-auto  top-1/2 -translate-y-1/2  rounded-r-full mt-1"
              type="submit"
            >
              {t("common:send")}
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default FooterSubscribeInput;
