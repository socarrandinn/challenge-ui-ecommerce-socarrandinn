import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleOffIcon } from "lucide-react";
import { TransTypography } from "@/components/core/trans-typography copy";
import NotFoundNotes from "./not-found-notes";

export default function NotFoundLayout() {
  return (
    <div className="min-h-[100vh] md:min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-shrink-0 rounded-full p-4 bg-primary-btn">
            <CircleOffIcon className="w-40 h-40 md:w-60 md:h-60 text-white" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-3 text-left">
            <TransTypography
              className="text-4xl lg:text-5xl font-bold text-primary"
              as="p"
              message="errors:notFound.title"
            />
            <TransTypography
              className="text-xl lg:text-2xl font-medium"
              as="p"
              message="errors:notFound.subtitle"
            />

            {/* notes */}
            <TransTypography
              className="text-sm font-semibold mt-2"
              as="p"
              message="errors:notFound.note.title"
            />
            <NotFoundNotes />

            {/* Action Button */}
            <Button
              asChild
              size="lg"
              variant={"default"}
              className="mt-4 mr-auto"
            >
              <Link href="/">
                <TransTypography
                  className="text-sm"
                  message="common:goToProduct"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
