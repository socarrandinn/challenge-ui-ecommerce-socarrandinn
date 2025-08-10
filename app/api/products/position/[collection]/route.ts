
import { PRODUCT_COLLECTION } from "@/interfaces/product.interface";
import { handleProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,
  { params }: { params: { collection: PRODUCT_COLLECTION } }) {
  const { collection } = params;
  return handleProductsResponse(collection);
}