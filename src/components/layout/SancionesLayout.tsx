"use client";

import React, { useState } from "react";
import { X, ChevronDown, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "../../app/router-compat";
import { headingBold, ModuleConfig } from "../../app/shared";
import HeaderFrame from "@/imports/Frame1321316704";
import { SancionesModule } from "../../modulos/sanciones/SancionesModule";
import { modulo1Config } from "@/modulos/notificacionPliego/notificacionPliego";
import { modulo2Config } from "@/modulos/descargosPruebas/descargosPruebas";
import { modulo3Config } from "@/modulos/actosPrueba/actosPrueba";
import { modulo4Config } from "@/modulos/alegatosConclusion/alegatosConclusion";
import { modulo5Config } from "@/modulos/hallazgos/hallazgos";

const ALL_CONFIGS: ModuleConfig[] = [modulo1Config, modulo2Config, modulo3Config, modulo4Config, modulo5Config];

/* SancionesLayout */
export function SancionesLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentConfig = ALL_CONFIGS.find((c) => location.pathname.includes(c.id)) || modulo1Config;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-card text-foreground flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
      <header className="bg-background sticky top-0 z-50 h-[60px] md:h-[80px] flex items-center shadow-sm">
        <div className="flex-1 h-full flex items-center">
          <div className="hidden sm:block flex-1 h-full"><HeaderFrame /></div>
          <div className="sm:hidden flex-1 px-4">
            <h1 className="text-primary truncate" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>INTEGRATIC</h1>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden mr-4 p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          aria-label="Menú de navegación"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        <button
          onClick={() => { if (window.confirm("Esta seguro que desea cerrar sesion?")) { window.location.href = "/"; } }}
          className="mr-8 p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer shrink-0"
          title="Cerrar sesion"
          aria-label="Cerrar sesion"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 bg-background p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col">
        <div className="mx-auto w-full max-w-[1400px] flex-1 flex flex-col">
          <SancionesModule config={currentConfig} key={currentConfig.id} />
        </div>
      </main>
    </div>
  );
}
