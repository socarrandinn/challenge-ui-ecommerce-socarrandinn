import { staticCategories } from "@/constants/mokup/static-categories";

import { ApiResponse } from "@/interfaces/api.interface";

// todo
export const searchStaticCategoriesService = async (): Promise<
  ApiResponse<any>
> => {
  return Promise.resolve({
    data: { data: staticCategories, total: staticCategories.length },
  });
};
