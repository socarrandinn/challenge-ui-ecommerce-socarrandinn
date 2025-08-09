
import { handleFilteredProductsResponse, handleProductsResponse } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Si hay parámetros de filtro, usar la función de filtrado
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (category || minPrice || maxPrice) {
    const filters = {
      ...(category && { category }),
      ...(minPrice && { minPrice: parseFloat(minPrice) }),
      ...(maxPrice && { maxPrice: parseFloat(maxPrice) })
    };

    return handleFilteredProductsResponse(filters);
  }

  // Si no hay filtros, devolver todos los productos
  return handleProductsResponse();
}