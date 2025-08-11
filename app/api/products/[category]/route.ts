import { handleFilteredProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

interface Params {
  category: string;
}
export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { category } = await params;

  return handleFilteredProductsResponse({ category });
}

