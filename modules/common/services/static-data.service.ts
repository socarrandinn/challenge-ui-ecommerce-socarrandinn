import { staticCategories } from "@/constants/mokup/static-categories";
import { staticPages } from "@/constants/mokup/static-pages";
import { ApiResponse } from "@/interfaces/api.interface";


// todo
export const searchStaticCategoriesService = async (): Promise<ApiResponse<any>> => {
  return Promise.resolve({ data: { data: staticCategories, total: staticCategories.length } });
};

export const searchStaticPagesService = async (): Promise<ApiResponse<any>> => {
  return Promise.resolve({ data: { data: staticPages, total: staticPages.length } });
};