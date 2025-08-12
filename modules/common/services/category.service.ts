import { ApiResponse } from "@/interfaces/api.interface";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { CATEGORY_ALL_KEY } from "../constants/query";
import { ICategory } from "@/interfaces/category.interface";

export const allCategory = async (config?: any): Promise<ApiResponse<ICategory[]>> => {
  return await ApiServerSide.get(`/api/categories`, {
    next: { tags: [CATEGORY_ALL_KEY] },
  }, config);
};


export const findOneCategory = (
  categories: ICategory[] | null | undefined,
  id: string,
): ICategory | null => {
  if (!categories) return null;
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
  }

  return null;
};