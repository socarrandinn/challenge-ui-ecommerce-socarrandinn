import { BANNER_COLLECTION } from "@/interfaces/banner.interface";
import { handleBannersResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

interface Params {
  collection: BANNER_COLLECTION;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { collection } = await params;
  return handleBannersResponse(collection);
}