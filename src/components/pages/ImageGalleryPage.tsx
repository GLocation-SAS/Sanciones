"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight as ChevronRightIcon, Download, Image as ImageIcon } from "lucide-react";
import { useNavigate, useLocation } from "../../app/router-compat";
import { NavigableBreadcrumb } from "../ui/NavigableBreadcrumb";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { bodyXs, bodyBase, headingBold } from "../../app/shared";

/* Página completa de Galería de Imágenes SER */
export function ImageGalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cargo, periodo, hallazgo } = (location.state as { cargo: string; periodo: string; hallazgo: string }) || { cargo: "", periodo: "", hallazgo: "" };
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 3;

  return (
    <div className="min-h-screen bg-card flex flex-col">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -2 as any },
          { label: "Validación", path: -1 as any },
          { label: "Imágenes SER" }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
              Imágenes SER - {periodo}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {cargo}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">Hallazgo:</span>
          <Badge className="bg-destructive/10 text-destructive border-none" style={bodyXs}>{hallazgo}</Badge>
        </div>

        <div className="flex-1 bg-muted/20 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
            <p style={bodyBase}>Imagen de captura SER</p>
            <p className="text-xs mt-1">(Placeholder - integrar con imágenes reales)</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)}
            className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-foreground min-w-[80px] text-center" style={bodyXs}>
            {currentIndex + 1} de {totalImages}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalImages)}
            className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gap-2" style={bodyXs}>
            <Download className="w-4 h-4" />
            Descargar actual
          </Button>
          <Button className="flex-1 gap-2" style={bodyXs}>
            <Download className="w-4 h-4" />
            Descargar todas
          </Button>
        </div>
      </div>
    </div>
  );
}
