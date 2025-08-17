import Container from "@/components/layouts/container";
import { Skeleton } from "@/components/ui/skeleton";

const HomeHeroSkeleton = () => {
  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-2 lg:gap-3">
        <div
          className={`
            col-start-1
            lg:col-span-4 lg:row-span-2
          `}
        >
          <Skeleton className="bg-muted rounded-md md:block hidden w-full h-[474px]" />
          <Skeleton className="bg-muted rounded-md md:hidden block  w-full h-[240px]" />
        </div>

        <div
          className={`
            col-start-1
            lg:col-span-2 lg:row-span-1 lg:col-start-5 lg:row-start-1
          `}
        >
          <Skeleton className="bg-muted rounded-md md:block hidden w-full h-[227px]" />
          <Skeleton className="bg-muted rounded-md md:hidden block w-full h-[189px]" />
        </div>
        <div
          className={`
            col-start-1
            lg:col-span-2 lg:row-span-1 lg:col-start-5 lg:row-start-2
          `}
        >
          <Skeleton className="bg-muted rounded-md md:block hidden w-full h-[227px]" />
          <Skeleton className="bg-muted rounded-md md:hidden block w-full h-[189px]" />
        </div>
      </section>
    </Container>
  );
};

export default HomeHeroSkeleton;
