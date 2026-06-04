"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight as ChevronRightIcon, Download, FileText, Image as ImageIcon, Paperclip } from "lucide-react";
import { useNavigate, useLocation } from "../../router-compat";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { NavigableBreadcrumb } from "../ui/NavigableBreadcrumb";
import { cn } from "../ui/utils";
import { bodyXs, bodyBase, headingBold } from "../../shared";

export function DocumentoViewerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { archivos, pliego, titulo, selectedIndex } = location.state || {
    archivos: [], pliego: "", titulo: "Documentos", selectedIndex: 0
  };
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);
  const currentDoc = archivos[currentIndex] || { nombre: "", tamano: "", tipo: "pdf" };

  const handleNext = () => { if (currentIndex < archivos.length - 1) setCurrentIndex(currentIndex + 1); };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };
  const handleDownload = () => console.log(`Descargando: ${currentDoc.nombre}`);
  const handleDownloadAll = () => console.log(`Descargando todos los archivos de ${pliego}`);

  return (
    <div className="min-h-screen bg-card flex flex-col">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -2 as any },
          { label: titulo, path: -1 as any },
          { label: currentDoc.nombre }
        ]} />
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground truncate" style={{ ...headingBold, fontSize: "var(--text-base)" }}>{currentDoc.nombre}</h1>
            <p className="text-muted-foreground text-xs">{currentDoc.tamano} • Documento {currentIndex + 1} de {archivos.length}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-muted/20 p-4">
        <div className="flex-1 bg-background rounded-lg border-2 border-border shadow-md overflow-hidden flex flex-col">
          <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                {currentDoc.tipo === "pdf" ? <FileText className="w-4 h-4 text-primary" /> : currentDoc.tipo === "img" ? <ImageIcon className="w-4 h-4 text-primary" /> : <Paperclip className="w-4 h-4 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">Visualizando documento</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-none text-xs">{currentDoc.tipo.toUpperCase()}</Badge>
          </div>
          <div className="flex-1 overflow-auto bg-muted/30 p-4 relative">
            {currentDoc.tipo === "pdf" ? (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex flex-col">
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-start gap-3 mb-6">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1" style={{ ...headingBold, fontSize: "var(--text-base)" }}>{currentDoc.nombre}</h3>
                      <p className="text-xs text-muted-foreground">Documento PDF • {currentDoc.tamano}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-foreground/80">
                    <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-2/3"></div>
                    <div className="py-4"><div className="h-32 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-center"><p className="text-xs text-primary/60">Gráfico o imagen</p></div></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-4/5"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border text-center"><p className="text-xs text-muted-foreground italic">Vista previa simulada • En producción se integrará con PDF.js</p></div>
                </div>
                <div className="bg-muted/50 px-4 py-2 border-t border-border text-center"><p className="text-xs text-muted-foreground">Página 1</p></div>
              </div>
            ) : currentDoc.tipo === "img" ? (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex items-center justify-center p-4">
                <div className="text-center text-muted-foreground">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-lg flex items-center justify-center mb-4"><ImageIcon className="w-16 h-16 text-primary/40" /></div>
                  <p className="font-medium mb-2" style={bodyBase}>Vista previa de imagen</p>
                  <p className="text-xs">"{currentDoc.nombre}"</p>
                  <p className="text-xs mt-4 opacity-70 italic">En producción se mostraría la imagen real</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground p-8">
                  <Paperclip className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2" style={bodyBase}>No hay vista previa disponible</p>
                  <p className="text-xs">"{currentDoc.nombre}"</p>
                  <p className="text-xs mt-2 opacity-70">Descarga el archivo para verlo</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-card border-t border-border px-4 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tamaño: {currentDoc.tamano}</span>
              <span className="text-primary font-medium">Documento {currentIndex + 1} de {archivos.length}</span>
            </div>
          </div>
        </div>
      </div>

      {archivos.length > 1 && (
        <div className="bg-background border-t border-border px-4 py-3">
          <div className="flex items-center justify-center gap-4 mb-3">
            <button onClick={handlePrev} disabled={currentIndex === 0} className={cn("p-2 rounded-lg border border-border transition-colors", currentIndex === 0 ? "bg-muted text-muted-foreground opacity-50" : "bg-background hover:bg-card active:bg-primary active:text-primary-foreground")}><ChevronLeft className="w-5 h-5" /></button>
            <span className="text-foreground min-w-[100px] text-center" style={bodyXs}>{currentIndex + 1} de {archivos.length}</span>
            <button onClick={handleNext} disabled={currentIndex === archivos.length - 1} className={cn("p-2 rounded-lg border border-border transition-colors", currentIndex === archivos.length - 1 ? "bg-muted text-muted-foreground opacity-50" : "bg-background hover:bg-card active:bg-primary active:text-primary-foreground")}><ChevronRightIcon className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      <div className="bg-background border-t border-border p-4 space-y-2">
        <Button onClick={handleDownload} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2" style={bodyXs}><Download className="w-4 h-4" />Descargar este documento</Button>
        {archivos.length > 1 && (<Button onClick={handleDownloadAll} variant="outline" className="w-full gap-2" style={bodyXs}><Download className="w-4 h-4" />Descargar todos ({archivos.length} archivos ZIP)</Button>)}
      </div>
    </div>
  );
}
