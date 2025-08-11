import { IProduct } from "./product.interface";


export type CartItemChanges = {
  lastPrice?: number;
};

export interface ICartItem {
  price: number;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  product: string;
  productSnapShot: IProduct;
  reserved?: boolean;
}

export type ICartItems = ICartItem & {
  quantity: number;
};
