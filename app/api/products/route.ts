
import { handleProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  // Si no hay filtros, devolver todos los productos
  return handleProductsResponse();
}