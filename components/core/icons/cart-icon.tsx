import { cn } from "@/lib/utils";

const CartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 29"
      fill="none"
      className={cn("w-10 text-orange-dark", className)}
    >
      <path
        d="M10.6457 2.41699L6.27148 6.80324"
        stroke="currentColor"
        stroke-width="1.8125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3535 2.41699L22.7277 6.80324"
        stroke="currentColor"
        stroke-width="1.8125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.41602 9.48503C2.41602 7.24961 3.61227 7.06836 5.09852 7.06836H23.9002C25.3864 7.06836 26.5827 7.24961 26.5827 9.48503C26.5827 12.0829 25.3864 11.9017 23.9002 11.9017H5.09852C3.61227 11.9017 2.41602 12.0829 2.41602 9.48503Z"
        stroke="currentColor"
        stroke-width="1.8125"
      />
      <path
        d="M4.22852 12.083L5.93227 22.523C6.31893 24.8672 7.24935 26.583 10.7052 26.583H17.9914C21.7493 26.583 22.3052 24.9397 22.7402 22.668L24.7702 12.083"
        stroke="currentColor"
        stroke-width="1.8125"
        stroke-linecap="round"
      />
      <path
        d="M10.875 19.0312H17.5208"
        stroke="currentColor"
        stroke-width="1.8125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.1973 15.708V22.3538"
        stroke="currentColor"
        stroke-width="1.8125"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { CartIcon };
