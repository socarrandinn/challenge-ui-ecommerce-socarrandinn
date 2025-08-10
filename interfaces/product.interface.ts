import { ReactNode } from "react";
import { IImageMedia } from "./banner.interface";

export interface IProduct {
  id: string,
  name: string,
  image: IImageMedia,
  price: number,
  rating: number,
  categoría: string
}

export interface IProductSection {
  products: IProduct[];
  combo?: ReactNode
};


export enum PRODUCT_COLLECTION {
  RECOMMENDED = 'recommended'
}
