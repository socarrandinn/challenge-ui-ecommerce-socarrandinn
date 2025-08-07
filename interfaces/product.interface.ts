import { ICategory } from "./category.interface";

export interface Product {
  id: string, name: string, imagen: string, price: string, rating: number, categoría: ICategory
}