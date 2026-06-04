"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

/* Prototype banner */
export function PrototypeBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("prototype-banner-closed") !== "1";
  });

  if (!visible) return null;

  const handleClose = () => {
    localStorage.setItem("prototype-banner-closed", "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-72 rounded-xl border border-border bg-card shadow-lg p-4 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start justify-between gap-2">
        <span className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-sm)" }}>
          ¿Qué estás viendo?
        </span>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0"
          aria-label="Cerrar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-normal)" }}>
        Este sitio es un prototipo visual creado como maqueta de navegación y diseño. No cuenta con datos reales ni funcionalidades integradas. Su propósito es simular la experiencia general del sitio antes de su desarrollo final.
      </p>
    </div>
  );
}
