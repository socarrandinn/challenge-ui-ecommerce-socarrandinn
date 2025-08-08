// app/api/categories/route.js
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getCookie } from "@/app/actions/cookies";
import i18nConfig from "@/i18nConfig";

// Función para simular tiempo de carga del servidor
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  try {
    // Simular carga del servidor (entre 200ms y 800ms)
    const loadTime = Math.floor(Math.random() * 600) + 200;
    await delay(loadTime);

    // Obtener parámetros de la URL
    const locale =
      (await getCookie(process.env.NEXT_PUBLIC_LOCALES!)) ??
      i18nConfig.defaultLocale;

    // Construir la ruta al archivo JSON
    const filePath = path.join(
      process.cwd(),
      "constants",
      locale,
      "categories.json"
    );

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Idioma no soportado" },
        { status: 404 }
      );
    }

    // Leer el archivo y devolver las categorías
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data.categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json(
      { error: "Error al cargar categorías" },
      { status: 500 }
    );
  }
}
