import { ReactNode } from "react";
import { IImageMedia } from "./banner.interface";

export interface IProduct {
  id: string,
  name: string,
  description: string,
  image: IImageMedia,
  price: number,
  rating: number,
  category: string

  discount?: number
  isNew?: boolean
}

export interface IProductSection {
  products: IProduct[];
  componentCombo?: ReactNode
};


export enum PRODUCT_COLLECTION {
  RECOMMENDED = 'recommended',
  MORE_SALES = 'more-sales',
  MORE_RECENT = 'most-recent',
}
