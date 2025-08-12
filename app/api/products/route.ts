
import { handleFilteredProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const filters = {
    search: body?.search,
    category: body?.category
  }

  return handleFilteredProductsResponse(filters);
}