import { ApiResponse } from "@/interfaces/api.interface";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { CATEGORY_ALL_KEY } from "../constants/query";

export const allCategoryService = async (): Promise<ApiResponse<void>> => {
  return await ApiServerSide.get(`/api/category`, {
    // next: { tags: [CATEGORY_ALL_KEY] },
  });
};