
import { handlePagesResponse, } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,
  { params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(slug, 'sSS')
  return handlePagesResponse(slug);
}