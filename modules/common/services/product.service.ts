import { ApiResponse } from '@/interfaces/api.interface';
import { ApiServerSide } from '@/lib/api.services/api-server-side.service';
import { PRODUCT_LIST_KEY, PRODUCT_ONE_KEY } from '@/modules/common/constants/query';
import { IProduct, PRODUCT_COLLECTION } from '@/interfaces/product.interface';


export const allProduct = async (config?: any): Promise<ApiResponse<IProduct[]>> => {
  return await ApiServerSide.get(`/api/products`, {
    next: { ...config, tags: [PRODUCT_LIST_KEY] },
  });
};

export const getProductsByPosition = async (collection: PRODUCT_COLLECTION, config?: any): Promise<ApiResponse<IProduct[]>> => {
  return await ApiServerSide.get(`/api/products/position/${collection}`, {
    next: { ...config, tags: [PRODUCT_LIST_KEY] },
  });
};


export const findOneProduct = async (slug: string, config?: any): Promise<ApiResponse<IProduct>> => {
  return await ApiServerSide.get(`/api/products/slug/${slug}`, {
    next: { ...config,  tags: [PRODUCT_ONE_KEY] },
  });
};