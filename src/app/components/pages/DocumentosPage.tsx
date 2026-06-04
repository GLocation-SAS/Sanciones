"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Download, FileText, Image as ImageIcon, Paperclip } from "lucide-react";
import { useNavigate, useLocation } from "../../router-compat";
import { NavigableBreadcrumb } from "../ui/NavigableBreadcrumb";
import { bodyXs, headingBold } from "../../shared";

/* Página completa de Documentos */
export function DocumentosPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { archivos, pliego, titulo } = location.state || { archivos: [], pliego: "", titulo: "Documentos" };

  const getFileIcon = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="w-4 h-4" />;
    if (tipo === "img") return <ImageIcon className="w-4 h-4" />;
    return <Paperclip className="w-4 h-4" />;
  };

  const handleViewDocument = (index: number) => {
    navigate('../documento-viewer', {
      state: {
        archivos,
        pliego,
        titulo,
        selectedIndex: index
      }
    });
  };

  const handleDownloadFile = (e: React.MouseEvent, nombre: string) => {
    e.stopPropagation();
    console.log(`Descargando archivo: ${nombre}`);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: titulo }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-primary truncate" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
              {titulo}
            </h1>
            <p className="text-muted-foreground text-xs truncate">
              {pliego} • {archivos.length} documento{archivos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {archivos.map((archivo: any, idx: number) => (
          <div
            key={idx}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all bg-background border border-border group"
          >
            <button
              onClick={() => handleViewDocument(idx)}
              className="flex items-center gap-3 flex-1 min-w-0 text-left"
            >
              <div className="flex-shrink-0 text-primary">
                {getFileIcon(archivo.tipo)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium text-foreground" style={bodyXs}>
                  {archivo.nombre}
                </div>
                <div className="text-xs text-muted-foreground">
                  {archivo.tamano}
                </div>
              </div>
            </button>
            <button
              onClick={(e) => handleDownloadFile(e, archivo.nombre)}
              className="p-2 rounded-lg hover:bg-primary/10 active:bg-primary/20 transition-colors flex-shrink-0"
              title="Descargar documento"
            >
              <Download className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => handleViewDocument(idx)}
              className="p-2 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
