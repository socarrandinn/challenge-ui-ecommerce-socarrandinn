
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { BANNER_COLLECTION } from "@/interfaces/banner.interface";
import { IProduct, PRODUCT_COLLECTION } from "@/interfaces/product.interface";



// Función para simular tiempo de carga del servidor
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para simular carga aleatoria del servidor
export const simulateServerLoad = async (minMs = 200, maxMs = 800) => {
  const loadTime = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  await delay(loadTime);
};


// Función para construir ruta de archivo JSON
export const buildJsonFilePath = (filename: string) => {
  return path.join(process.cwd(), "constants", 'data', `${filename}.json`);
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

    // Construir ruta del archivo
    const filePath = buildJsonFilePath(filename);

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
export const handleProductsResponse = (collection: PRODUCT_COLLECTION | 'all' = 'all') => {
  return handleApiResponse(collection, "products", "Error al cargar productos");
};

// Función específica para banners
export const handleBannersResponse = (position: BANNER_COLLECTION) => {
  return handleApiResponse(position, "banners", "Error al cargar banners");
};

export const handlePagesResponse = (slug: string) => {
  return handleApiResponse(slug, "pages", "Error al cargar la pagina");
};

// Función para productos con filtros
// ... imports y funciones existentes ...

export const handleFilteredProductsResponse = async (filters: any = {}) => {
  try {
    await simulateServerLoad();

    // 1. Obtener productos directamente desde el archivo
    const filePath = buildJsonFilePath("products");
    if (!fileExists(filePath)) {
      return NextResponse.json(
        { error: "Archivo de productos no encontrado" },
        { status: 404 }
      );
    }

    const data = readJsonFile(filePath);
    const allProducts = data.all || [];

    let filteredProducts = [...allProducts];

    // 2. Aplicar filtros con lógica flexible
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    }

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
    return NextResponse.json(
      { error: "Error al cargar productos" },
      { status: 500 }
    );
  }
};


export const handleFindOneProductResponse = async (productId: string) => {
  try {
    await simulateServerLoad();
    const filePath = buildJsonFilePath("products");

    if (!fileExists(filePath)) {
      return NextResponse.json(
        { error: "Idioma no soportado" },
        { status: 404 }
      );
    }

    const data = readJsonFile(filePath);
    const products = data.all || data;
    let product = {}

    // Aplicar filtros
    if (productId) {
      product = products.find((product: IProduct) =>
        product.id === productId
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
    return NextResponse.json(
      { error: "Error al cargar productos" },
      { status: 500 }
    );
  }
};
