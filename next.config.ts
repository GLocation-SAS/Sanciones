import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── GitHub Pages: exportación estática ── */
  output: "export",

  /**
   * basePath debe coincidir con el nombre del repositorio en GitHub.
   * Si el repo se llama "Sanciones", la URL será:
   *   https://GLocation-SAS.github.io/Sanciones
   */
  basePath: "/Sanciones",

  /**
   * trailingSlash evita problemas de rutas en servidores estáticos.
   * /login → /login/index.html  (GitHub Pages lo sirve correctamente)
   */
  trailingSlash: true,

  /* Imágenes: el optimizador de Next.js requiere servidor Node.
   * En modo export se debe usar unoptimized: true.
   * Las imágenes de unsplash seguirán funcionando con <img> nativo o
   * añadiendo loader="custom" si se prefiere. */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /* Modo estricto de React */
  reactStrictMode: true,

  /* 
   * Tailwind CSS v4 funciona con PostCSS — no se necesita @tailwindcss/vite.
   */
};

export default nextConfig;
