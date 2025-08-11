
import { handlePagesResponse, } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

interface Params {
  slug: string;
}
export async function GET(req: NextRequest,
  { params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return handlePagesResponse(slug);
}