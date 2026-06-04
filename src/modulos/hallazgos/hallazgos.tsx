import React from "react";
import { ShieldCheck, Database, Search, Download, Image as ImageIcon, Brain, CheckCircle2, XOctagon, AlertCircle, AlertTriangle, Folder, XCircle, Archive, Gavel, FileText } from "lucide-react";
import { ModuleConfig, bodyXs, StatusBadge } from "../../app/shared";

export const modulo5Config: ModuleConfig = {
  id: "hallazgos",
  title: "Verificación de Cumplimiento",
  shortTitle: "Cumplimiento",
  epicLabel: "Epica 05",
  description: "Determinacion del cumplimiento de obligaciones de pago de contraprestaciones consultando los sistemas SER e INTEGRATIC para generar el informe final que soporte la toma de decisiones. Consolida toda la informacion de las etapas anteriores por cargo y periodo para recomendar archivo o sancion.",
  excelFields: ["Numeros BDI", "Año"],
  navIcon: <ShieldCheck className="w-4 h-4" />,
  processingSteps: [
    { label: "Consultando API Integratic", icon: <Database className="w-4 h-4" /> },
    { label: "Consultando Sistema SER", icon: <Search className="w-4 h-4" /> },
    { label: "Descargando PDFs e imagenes", icon: <Download className="w-4 h-4" /> },
    { label: "Procesando FUR e imagenes SER", icon: <ImageIcon className="w-4 h-4" /> },
    { label: "Validando cumplimiento con IA", icon: <Brain className="w-4 h-4" /> },
  ],

  resultColumns: [

    {
      key: "operador",
      header: "Razón social",
      headerTooltip: "Razón social del operador postal o de mensajería sujeto de la verificación de cumplimiento. Se corresponde con el operador registrado en los módulos previos del proceso sancionatorio (MÓDULOS 1, 2, 3 y 4).",
      truncate: true
    },
    {
      key: "bdi",
      header: "BDI",
      headerTooltip: "Número(s) de la Base de Datos de Infracciones asociados al proceso."
    },
    {
      key: "fechaCorte",
      header: "Fecha de corte",
      headerTooltip: "Fecha en la que el usuario realiza la consulta en el sistema. Refleja el estado del operador en el SET a la fecha actual de la verificación.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val}</span>
    },
    {
      key: "pliego",
      header: "Número de acto administrativo",
      headerTooltip: "Número del pliego de cargos que dio inicio al proceso sancionatorio (MÓDULO 1). En este módulo se verifica si el operador cumplió con las obligaciones que generaron el pliego, lo que puede conducir al archivo o a la imposición de sanción.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val}</span>
    },

    {
      key: "cumplimiento",
      header: "Cumplimiento",
      headerTooltip: "Resultado de la verificación de si el operador cumplió con las obligaciones que dieron origen al pliego de cargos. Cumplió: procedimiento encaminado al archivo (recomendación ARCHIVO). No cumplió: procedimiento encaminado a la sanción (recomendación SANCIÓN).",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "destructive"; icon: React.ReactNode }> = {
          "Cumplió": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "No cumplió": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["No cumplió"];
        return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "hallazgosSER",
      header: "Hallazgos",
      headerTooltip: "Resultados del análisis técnico del Sistema de Evaluación de Resultados (SER). Despliegue para ver los trimestres."
    },

    {
      key: "documentos",
      header: "Documento",
      headerTooltip: "Informes de cumplimiento, análisis SER, actos de archivo o resolución sancionatoria, y demás documentos de esta etapa descargados de INTEGRATIC. Incluye la decisión final del proceso (acto de archivo o resolución sancionatoria) con su radicado y soportes documentales.",
      render: (val: any) => {
        const count = val?.archivos?.length || 0;
        if (count === 0) return <span className="text-muted-foreground" style={bodyXs}>--</span>;
        return (
          <div className="inline-flex justify-center w-[110px] items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-primary/10 transition-colors border border-primary/10">
            <Folder className="w-3.5 h-3.5" />
            Ver docs
            <span className="bg-background text-primary rounded-full px-1.5 py-0.5 text-[10px] font-bold border border-primary/20 min-w-[18px] text-center flex items-center justify-center">
              {count}
            </span>
          </div>
        );
      }
    },
  ],
  mockData: [
    {
      id: "1",
      pliego: "SPL-2025-03-18",
      operador: "Operador Telecomunicaciones S.A.",
      bdi: "9054-2025",
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-03-18.pdf", tamano: "5.2 MB", tipo: "pdf" }, { nombre: "Informe_cumplimiento.pdf", tamano: "3.8 MB", tipo: "pdf" }] }
    },
    {
      id: "3",
      pliego: "SPL-2025-05-10",
      operador: "Comunicaciones del Norte S.A.S.",
      bdi: "9102-2025",
      fechaCorte: "31/May/2025",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "No Pagado (NPA)" }, { cargo: "Reporte SIUST", estadoPago: "Extemporáneo" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "No Pagado (NPA)" }] },
          { trimestre: "Trimestre 3 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: { archivos: [{ nombre: "Analisis_incumplimiento.pdf", tamano: "4.1 MB", tipo: "pdf" }] }
    }
  ],
};
