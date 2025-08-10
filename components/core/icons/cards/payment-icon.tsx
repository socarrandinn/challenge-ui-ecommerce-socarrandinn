import { cn } from "@/lib/utils";

const PaymentIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={cn("w-10 text-orange-dark", className)}
    >
      <path
        d="M3.33398 16.667H36.6673"
        stroke="currentColor"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.2497 34.1663H10.7331C4.81643 34.1663 3.31641 32.6996 3.31641 26.8496V13.1496C3.31641 7.84962 4.54979 6.14962 9.19979 5.88295C9.66646 5.86628 10.1831 5.84961 10.7331 5.84961H29.2497C35.1664 5.84961 36.6664 7.31628 36.6664 13.1663V20.5163"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 26.667H16.6667"
        stroke="currentColor"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36.6673 29.9997C36.6673 31.2497 36.3173 32.433 35.7006 33.433C34.5506 35.3663 32.434 36.6663 30.0007 36.6663C27.5673 36.6663 25.4507 35.3663 24.3007 33.433C23.684 32.433 23.334 31.2497 23.334 29.9997C23.334 26.3163 26.3173 23.333 30.0007 23.333C33.684 23.333 36.6673 26.3163 36.6673 29.9997Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.4004 30.0005L29.0504 31.6505L32.6004 28.3672"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { PaymentIcon };
