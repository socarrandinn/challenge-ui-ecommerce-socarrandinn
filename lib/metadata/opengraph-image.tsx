import { ImageResponse } from "next/og";
import Logo from "@/components/core/logo/logo";

export type Props = {
  title?: string;
};

export default async function OpenGraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: "E-COMMERCE",
    },
    ...props,
  };

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <Logo />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,

      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL(
              "../../public/fonts/Montserrat-Regular.ttf",
              import.meta.url
            )
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
