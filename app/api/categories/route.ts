import { handleCategoriesResponse } from "@/lib/api-helpers";

export async function GET() {
  return handleCategoriesResponse();
}
