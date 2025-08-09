
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getCookie } from "@/app/actions/cookies";
import i18nConfig from "@/i18nConfig";
import { IProduct } from '../../../../Smartly Digital/rental_ecommerce/definitions/product';
import { BANNER_POSITION } from "@/interfaces/banner.interface";


// Función para simular tiempo de carga del servidor
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para simular carga aleatoria del servidor
export const simulateServerLoad = async (minMs = 200, maxMs = 800) => {
  const loadTime = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  await delay(loadTime);
};

// Función para obtener el locale actual
export const getCurrentLocale = async () => {
  return (await getCookie(process.env.NEXT_PUBLIC_LOCALES!)) ?? i18nConfig.defaultLocale;
};

// Función para construir ruta de archivo JSON
export const buildJsonFilePath = (locale: string, filename: string) => {
  return path.join(process.cwd(), "constants", locale, `${filename}.json`);
};

// Función para verificar si un archivo existe
export const fileExists = (filePath: string) => {
  return fs.existsSync(filePath);
};

// Función para leer y parsear archivo JSON
export const readJsonFile = (filePath: string) => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error: any) {
    throw new Error(`Error al leer archivo JSON: ${error?.message}`);
  }
};

// Función genérica para manejar respuestas de API
export const handleApiResponse = async (dataKey: string, filename: string, customErrorMessage: string) => {
  try {
    // Simular carga del servidor
    await simulateServerLoad();

    // Obtener locale
    const locale = await getCurrentLocale();

    // Construir ruta del archivo
    const filePath = buildJsonFilePath(locale, filename);

    // Verificar si el archivo existe
    if (!fileExists(filePath)) {
      return NextResponse.json(
        { error: "Idioma no soportado" },
        { status: 404 }
      );
    }

    // Leer archivo y obtener datos
    const data = readJsonFile(filePath);

    // Retornar datos específicos o todos los datos
    const responseData = dataKey ? data[dataKey] : data;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(`Error al obtener ${filename}:`, error);
    return NextResponse.json(
      { error: customErrorMessage || `Error al cargar ${filename}` },
      { status: 500 }
    );
  }
};

// Función específica para categorías (mantiene compatibilidad)
export const handleCategoriesResponse = () => {
  return handleApiResponse("categories", "categories", "Error al cargar categorías");
};

// Función específica para productos
export const handleProductsResponse = () => {
  return handleApiResponse("products", "products", "Error al cargar productos");
};

// Función específica para banners
export const handleBannersResponse = (position: BANNER_POSITION) => {
  return handleApiResponse(position,"banners", "Error al cargar banners");
};

// Función para productos con filtros
export const handleFilteredProductsResponse = async (filters: any = {}) => {
  try {
    await simulateServerLoad();

    const locale = await getCurrentLocale();
    const filePath = buildJsonFilePath(locale, "products");

    if (!fileExists(filePath)) {
      return NextResponse.json(
        { error: "Idioma no soportado" },
        { status: 404 }
      );
    }

    const data = readJsonFile(filePath);
    let products = data.products || data;

    // Aplicar filtros
    if (filters.category) {
      products = products.filter((product: IProduct) =>
        product.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }


    if (filters.minPrice) {
      products = products.filter((product: IProduct) => product.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      products = products.filter((product: IProduct) => product.price <= filters.maxPrice);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
    return NextResponse.json(
      { error: "Error al cargar productos" },
      { status: 500 }
    );
  }
};
