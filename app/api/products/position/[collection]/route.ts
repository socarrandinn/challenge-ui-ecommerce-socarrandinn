
import { PRODUCT_COLLECTION } from "@/interfaces/product.interface";
import { handleProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";
type Params = {
  collection: PRODUCT_COLLECTION
}
export async function GET(req: NextRequest,
  { params }: { params: Promise<Params> }) {
  const { collection } = await params;
  return handleProductsResponse(collection);
}