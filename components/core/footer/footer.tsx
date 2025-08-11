import React from "react";
import { TransTypography } from "../trans-typography";
import Container from "@/components/layouts/container";
import FooterSubscribeInput from "./footer-subscribe-input";
import Link from "next/link";
import { PhoneIcon } from "../icons/phone-icon";
import { MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary !z-10">
      <Container className="flex flex-col gap-10 md:gap-20 px-4 lg:px-1 py-14">
        <section className="flex flex-col md:flex-row justify-between gap-4 md:gap-1">
          <div className="flex flex-col gap-2 max-w-[420px]">
            <TransTypography
              message="common:footer:subscribeTo:title"
              className="text-[20px] font-bold text-white"
              as="p"
            />
            <TransTypography
              message="common:footer:subscribeTo:subtitle"
              className="text-[13px] font-light text-white"
              as="p"
            />
          </div>

          <div className="flex flex-col gap-2 max-w-[420px]">
            <FooterSubscribeInput />
            <TransTypography
              message="common:footer:subscribeTo:accepted"
              className="text-[13px] font-light text-white"
              as="p"
              components={{
                orange: (
                  <Link className="text-orange-dark font-bold" href={"#"} />
                ),
              }}
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-row gap-4 items-start">
            <PhoneIcon className="size-5 md:size-7 text-orange-dark" />
            <div className="flex flex-col gap-1 justify-start">
              <TransTypography
                className="text-xs font-normal text-white"
                message="common:footer:items:phone.title"
                as="p"
              />
              <TransTypography
                className="text-md md:text-[20px]  font-semibold leading-[30px] text-white"
                message="common:footer:items:phone.subtitle"
                as="p"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start">
            <MailIcon className="size-5 md:size-7 text-orange-dark" />
            <div className="flex flex-col gap-1 justify-start">
              <TransTypography
                className="text-xs font-normal text-white"
                message="common:footer:items:mail.title"
                as="p"
              />
              <TransTypography
                className="text-sm font-semibold leading-[30px] text-white"
                message="common:footer:items:mail.subtitle"
                as="p"
              />
            </div>
          </div>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
