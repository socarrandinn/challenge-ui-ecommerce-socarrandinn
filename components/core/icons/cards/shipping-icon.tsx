import { cn } from "@/lib/utils";

const ShippingIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={cn("w-10 text-orange-dark", className)}
    >
      <path
        d="M20.0002 23.333H21.6669C23.5002 23.333 25.0002 21.833 25.0002 19.9997V3.33301H10.0002C7.50024 3.33301 5.31693 4.71632 4.18359 6.74965"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33398 28.333C3.33398 31.0997 5.56732 33.333 8.33398 33.333H10.0007C10.0007 31.4997 11.5007 29.9997 13.334 29.9997C15.1673 29.9997 16.6673 31.4997 16.6673 33.333H23.334C23.334 31.4997 24.834 29.9997 26.6673 29.9997C28.5007 29.9997 30.0007 31.4997 30.0007 33.333H31.6673C34.434 33.333 36.6673 31.0997 36.6673 28.333V23.333H31.6673C30.7507 23.333 30.0007 22.583 30.0007 21.6663V16.6663C30.0007 15.7497 30.7507 14.9997 31.6673 14.9997H33.8173L30.9673 10.0164C30.3673 8.98302 29.2674 8.33301 28.0674 8.33301H25.0007V19.9997C25.0007 21.833 23.5007 23.333 21.6673 23.333H20.0007"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3333 36.6667C15.1743 36.6667 16.6667 35.1743 16.6667 33.3333C16.6667 31.4924 15.1743 30 13.3333 30C11.4924 30 10 31.4924 10 33.3333C10 35.1743 11.4924 36.6667 13.3333 36.6667Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.6673 36.6667C28.5083 36.6667 30.0007 35.1743 30.0007 33.3333C30.0007 31.4924 28.5083 30 26.6673 30C24.8264 30 23.334 31.4924 23.334 33.3333C23.334 35.1743 24.8264 36.6667 26.6673 36.6667Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36.6667 20V23.3333H31.6667C30.75 23.3333 30 22.5833 30 21.6667V16.6667C30 15.75 30.75 15 31.6667 15H33.8166L36.6667 20Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33398 13.333H13.334"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33398 18.333H10.0007"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33398 23.333H6.66732"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { ShippingIcon };
