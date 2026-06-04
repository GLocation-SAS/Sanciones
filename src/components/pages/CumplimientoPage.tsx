"use client";

import React from "react";
import { ChevronLeft, AlertTriangle, ClipboardCheck } from "lucide-react";
import { useNavigate, useLocation } from "../../app/router-compat";
import { NavigableBreadcrumb } from "../ui/NavigableBreadcrumb";
import { bodyXs, headingBold } from "../../app/shared";

/* Página completa de Cumplimiento */
export function CumplimientoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { acto, operador, estadoRUES } = location.state || { acto: "", operador: "", estadoRUES: "Activa" };

  return (
    <div className="min-h-screen bg-card">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: "Cumplimiento", path: -1 as any },
          { label: "Validación completa" }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="h-5 w-5 text-chart-2" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
              Validación completa de cumplimiento
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {acto} • {operador}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {estadoRUES !== "Activa" && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-sm)" }}>
                Archivo automático por estado RUES
              </p>
              <p className="text-muted-foreground" style={{ ...bodyXs, lineHeight: 1.6 }}>
                La empresa se encuentra en estado <strong>{estadoRUES}</strong> según el sistema RUES.
              </p>
            </div>
          </div>
        )}

        <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
              Vista detallada por cargo y periodo
            </p>
            <p className="text-muted-foreground max-w-md mx-auto" style={{ ...bodyXs, lineHeight: 1.6 }}>
              Esta sección mostrará la información consolidada de todas las etapas anteriores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
