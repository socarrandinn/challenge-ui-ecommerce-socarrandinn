import { ApiResponse } from '@/interfaces/api.interface';
import { BANNER_COLLECTION, IBanner } from '../../../interfaces/banner.interface';
import { ApiServerSide } from '@/lib/api.services/api-server-side.service';
import { BANNER_LIST_KEY } from '@/modules/common/constants/query';
export const allBannerService = async (collection: BANNER_COLLECTION, config?: any): Promise<ApiResponse<IBanner[]>> => {
  return await ApiServerSide.get(`/api/banners/position/${collection}`, {
    next: { tags: [BANNER_LIST_KEY] },
  }, { ...config });
};