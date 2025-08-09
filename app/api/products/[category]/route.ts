import { handleFilteredProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const { category } = params;

  return handleFilteredProductsResponse({ category });
}

