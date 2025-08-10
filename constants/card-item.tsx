import { PaymentIcon } from "@/components/core/icons/cards/payment-icon";
import { ShippingIcon } from "@/components/core/icons/cards/shipping-icon";
import { MapPinHouseIcon } from "lucide-react";

export interface ICardItem {
  title: string;
  subtitle: string;
  icon: any;
}

export const CARD_ITEMS: ICardItem[] = [
  {
    title: "home:what-you-need.cards.payment.title",
    subtitle: "home:what-you-need.cards.payment.subtitle",
    icon: PaymentIcon,
  },
  {
    title: "home:what-you-need.cards.shipping.title",
    subtitle: "home:what-you-need.cards.shipping.subtitle",
    icon: ShippingIcon,
  },
  {
    title: "home:what-you-need.cards.location.title",
    subtitle: "home:what-you-need.cards.location.subtitle",
    icon: MapPinHouseIcon,
  },
];
