/**
 * Prefijo del basePath configurado en next.config.ts para GitHub Pages.
 * Úsalo para construir rutas de assets estáticos (imágenes, fuentes, etc.)
 * que viven en la carpeta `public/`.
 *
 * Ejemplo: img("/logo.png") → "/Sanciones/logo.png"
 */
const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/Sanciones" : "");

export function img(src: string): string {
  // Evitar doble prefijo si ya lo tiene
  if (src.startsWith(BASE_PATH)) return src;
  return `${BASE_PATH}${src}`;
}
