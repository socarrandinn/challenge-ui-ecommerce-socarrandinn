import { ApiResponse } from "@/interfaces/api.interface";
import { PAGE_ONE_KEY } from "../constants/query";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { IPages } from "@/interfaces/page.interface";



export const findOnePage = async (slug: string, config?: any): Promise<ApiResponse<IPages>> => {
  return await ApiServerSide.get(`/api/pages/${slug}`, {
    next: { ...config, tags: [PAGE_ONE_KEY] },
  });
};