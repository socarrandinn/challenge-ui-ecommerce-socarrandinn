import { ApiResponse } from '@/interfaces/api.interface';
import { BANNER_POSITION, IBanner } from '../../../interfaces/banner.interface';
import { ApiServerSide } from '@/lib/api.services/api-server-side.service';
import { BANNER_LIST_KEY } from '@/modules/common/constants/query';
export const allBannerService = async (position: BANNER_POSITION, config?: any): Promise<ApiResponse<IBanner[]>> => {
  return await ApiServerSide.get(`/api/banners`, {
    next: { tags: [BANNER_LIST_KEY, position] },
  }, { ...config, position });
};