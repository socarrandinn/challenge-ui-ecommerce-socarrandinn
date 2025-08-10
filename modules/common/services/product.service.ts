import { ApiResponse } from '@/interfaces/api.interface';
import { ApiServerSide } from '@/lib/api.services/api-server-side.service';
import { PRODUCT_LIST_KEY } from '@/modules/common/constants/query';
import { IProduct, PRODUCT_COLLECTION } from '@/interfaces/product.interface';

export const getProductByPosition = async (collection: PRODUCT_COLLECTION, config?: any): Promise<ApiResponse<IProduct[]>> => {
  return await ApiServerSide.get(`/api/products/position/${collection}`, {
    next: { ...config, tags: [PRODUCT_LIST_KEY] },
  });
};