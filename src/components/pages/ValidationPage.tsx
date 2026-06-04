"use client";

import React from "react";
import { ChevronLeft, ChevronRight, AlertCircle, Folder, CheckCircle2, XOctagon } from "lucide-react";
import { useNavigate, useLocation } from "../../app/router-compat";
import { Badge } from "../ui/badge";
import { NavigableBreadcrumb } from "../ui/NavigableBreadcrumb";
import { cn } from "../ui/utils";
import { bodyXs, bodyBase, headingBold, StatusBadge } from "../../app/shared";

export function ValidationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { acto, estadoRUES, pliego } = location.state || { acto: "", estadoRUES: "Activa", pliego: "" };

  const mockCargos = [
    { nombre: "Incumplimiento de obligaciones de contraprestación", periodos: [
        { periodo: "Trim 1 2024", hallazgo: "No pagó", resultado: "Sanción" },
        { periodo: "Trim 2 2024", hallazgo: "Pagó", resultado: "Archivo" },
        { periodo: "Trim 3 2024", hallazgo: "No pagó", resultado: "Sanción" },
        { periodo: "Trim 4 2024", hallazgo: "Pagó fuera tiempo", resultado: "Sanción" },
      ], recomendacion: "Continuar a sanción", razon: "3 de 4 periodos con sanción", tipo: "sancion" },
    { nombre: "Deficiencia en calidad del servicio", periodos: [
        { periodo: "Trim 1 2024", hallazgo: "Subsanó", resultado: "Archivo" },
        { periodo: "Trim 2 2024", hallazgo: "Subsanó", resultado: "Archivo" },
      ], recomendacion: "Archivar", razon: "Todos los periodos subsanados", tipo: "archivo" },
  ];

  const tieneAlgunaSancion = mockCargos.some(c => c.tipo === "sancion");
  const isArchivoAutomatico = estadoRUES !== "Activa";

  return (
    <div className="min-h-screen bg-card">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: "Actos de Prueba", path: -1 as any },
          { label: `Validación ${acto}` }
        ]} />
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>Validación de Acto {acto}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Estado RUES:</span>
              <StatusBadge label={estadoRUES} variant={estadoRUES === "Activa" ? "success" : "destructive"} icon={estadoRUES === "Activa" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {isArchivoAutomatico && (
          <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#92400E]" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>Archivo automático por estado RUES</p>
                <p className="text-[#92400E] mt-1" style={bodyXs}>Este proceso se archiva automáticamente porque la empresa tiene estado RUES "{estadoRUES}"</p>
              </div>
            </div>
          </div>
        )}

        {mockCargos.map((cargo, idx) => (
          <div key={idx} className="bg-background rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Folder className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>CARGO {idx + 1}: {cargo.nombre}</h3>
            </div>
            <div className="space-y-2">
              {cargo.periodos.map((periodo, pIdx) => (
                <div key={pIdx} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{periodo.periodo}</span>
                    <button onClick={() => navigate(`imagenes-ser`, { state: { cargo: cargo.nombre, periodo: periodo.periodo, hallazgo: periodo.hallazgo } })} className="text-primary text-xs underline">Ver imágenes</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("border-none", periodo.hallazgo === "No pagó" ? "bg-destructive/10 text-destructive" : periodo.hallazgo === "Pagó" ? "bg-chart-2/10 text-chart-2" : periodo.hallazgo === "Pagó fuera tiempo" ? "bg-[#F97316]/10 text-[#F97316]" : periodo.hallazgo === "Subsanó" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")} style={bodyXs}>{periodo.hallazgo}</Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Badge className={cn("border-none", periodo.resultado === "Sanción" ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2")} style={bodyXs}>{periodo.resultado === "Sanción" ? "🔴" : "🟢"} {periodo.resultado}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className={cn("p-4 rounded-lg border-l-4", cargo.tipo === "sancion" ? "bg-muted/30 border-destructive" : "bg-muted/30 border-chart-2")}>
              <p className="text-foreground mb-1" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>{cargo.tipo === "sancion" ? "🔴" : "🟢"} {cargo.recomendacion}</p>
              <p className="text-muted-foreground" style={bodyXs}>Razón: {cargo.razon}</p>
            </div>
          </div>
        ))}

        <div className={cn("p-6 rounded-lg border-2 text-center space-y-2", tieneAlgunaSancion ? "bg-primary/5 border-primary" : "bg-chart-2/5 border-chart-2")}>
          <div className="text-4xl mb-2">{tieneAlgunaSancion ? "🔴" : "🟢"}</div>
          <h3 className={cn("uppercase", tieneAlgunaSancion ? "text-primary" : "text-chart-2")} style={{ ...headingBold, fontSize: "var(--text-base)" }}>{tieneAlgunaSancion ? "CONTINUAR A DECISIÓN DE SANCIÓN" : "ARCHIVAR PROCESO"}</h3>
          <p className="text-muted-foreground" style={bodyXs}>{tieneAlgunaSancion ? "(Al menos un cargo con sanción)" : "(Todos los cargos archivados)"}</p>
        </div>
      </div>
    </div>
  );
}
