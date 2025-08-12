// utils/routeParams.ts
import { NextRequest } from 'next/server'

/**
 * Extrae el valor de un parámetro dinámico de la ruta
 * @param request - La request de Next.js
 * @param paramKey - La clave del parámetro (sin los corchetes)
 * @param routePattern - El patrón de la ruta con parámetros dinámicos (ej: "/api/users/[id]/posts/[postId]")
 * @returns El valor del parámetro o null si no se encuentra
 */
export function getRouteParam(
  request: NextRequest,
  paramKey: string,
  routePattern: string
): string | null {
  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean)
  const routeSegments = routePattern.split('/').filter(Boolean)

  // Verificar que ambos arrays tengan la misma longitud
  if (pathSegments.length !== routeSegments.length) {
    return null
  }

  // Buscar el índice del parámetro en el patrón de ruta
  for (let i = 0; i < routeSegments.length; i++) {
    const segment = routeSegments[i]

    // Verificar si es un parámetro dinámico que coincide
    if (segment === `[${paramKey}]`) {
      return pathSegments[i] || null
    }

    // También soportar parámetros catch-all como [...slug]
    if (segment === `[...${paramKey}]`) {
      // Para catch-all, retornar todos los segmentos restantes unidos
      return pathSegments.slice(i).join('/') || null
    }

    // Para parámetros opcionales como [[...slug]]
    if (segment === `[[...${paramKey}]]`) {
      return pathSegments.slice(i).join('/') || ''
    }
  }

  return null
}


export function getParamByIndex(
  request: NextRequest,
  index: number
): string | null {
  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean)
  return pathSegments[index] || null
}