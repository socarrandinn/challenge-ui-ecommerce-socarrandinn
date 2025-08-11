

import { BANNER_COLLECTION } from "@/interfaces/banner.interface";
import { handleBannersResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,
  { params }: { params: { collection: BANNER_COLLECTION } }) {
  const { collection } = params;
  return handleBannersResponse(collection);
}