import { cn } from "@/lib/utils";

const HeartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
      className={cn("w-10", className)}
    >
      <path
        d="M11.5683 19.0758C11.2566 19.1858 10.7433 19.1858 10.4316 19.0758C7.77331 18.1683 1.83331 14.3825 1.83331 7.96584C1.83331 5.13334 4.11581 2.84167 6.92998 2.84167C8.59831 2.84167 10.0741 3.64834 11 4.89501C11.9258 3.64834 13.4108 2.84167 15.07 2.84167C17.8841 2.84167 20.1666 5.13334 20.1666 7.96584C20.1666 14.3825 14.2266 18.1683 11.5683 19.0758Z"
        fill="currentColor"
      />
    </svg>
  );
};

export { HeartIcon };
