import { ApiResponse } from '@/interfaces/api.interface';
import { ApiServerSide } from '@/lib/api.services/api-server-side.service';
import { PRODUCT_COLLECTION_KEY, PRODUCT_LIST_KEY, PRODUCT_ONE_KEY } from '@/modules/common/constants/query';
import { IProduct, PRODUCT_COLLECTION } from '@/interfaces/product.interface';
import { ISearchParams } from '@/interfaces/search-params';


export const allProduct = async (searchParams: ISearchParams): Promise<ApiResponse<IProduct[]>> => {
  return await ApiServerSide.post(`/api/products`, searchParams, {


    next: { tags: [PRODUCT_LIST_KEY] },
    headers: {
      'Accept-Language': searchParams?.locale || 'es'
    }
  });
};

export const getProductsByPosition = async (collection: PRODUCT_COLLECTION, config?: any): Promise<ApiResponse<IProduct[]>> => {
  return await ApiServerSide.get(`/api/products/position/${collection}`, {
    next: { ...config, tags: [PRODUCT_COLLECTION_KEY] },
  });
};


export const findOneProduct = async (slug: string, config?: any): Promise<ApiResponse<IProduct>> => {
  return await ApiServerSide.get(`/api/products/slug/${slug}`, {
    next: { ...config, tags: [PRODUCT_ONE_KEY] },
  });
};