import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Habilitar Turbopack para desarrollo */
  // turbopack: true, // descomenta si quieres usar Turbopack (experimental)

  /* Imágenes remotas (unsplash usadas en LoginPage) */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /* Desactivar strict mode en desarrollo si da doble render */
  reactStrictMode: true,

  /* 
   * Permitir que Next.js transpile los paquetes que lo necesiten.
   * Tailwind CSS v4 funciona con PostCSS — no se necesita @tailwindcss/vite.
   */
};

export default nextConfig;
