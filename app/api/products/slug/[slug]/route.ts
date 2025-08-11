import { handleFindOneProductResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;


  // Pasar el contexto a tu función
  return handleFindOneProductResponse(slug);
}