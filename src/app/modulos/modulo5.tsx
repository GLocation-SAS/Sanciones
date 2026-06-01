import React from "react";
import { ShieldCheck, Database, Search, Download, Image as ImageIcon, Brain, CheckCircle2, XOctagon, AlertCircle, AlertTriangle, Folder, XCircle, Archive, Gavel, FileText } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { cn } from "../components/ui/utils";
import { ModuleConfig, bodyXs, StatusBadge } from "../shared";

export const modulo5Config: ModuleConfig = {
  id: "cumplimiento-obligacion",
  title: "Verificacion de Cumplimiento de la Obligacion",
  shortTitle: "Cumplimiento de Obligacion",
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
  columnTabs: [
    {
      id: "identificacion",
      label: "Información de Identificación",
      columns: ["operador", "numerosBDI"]
    },
    {
      id: "cumplimiento",
      label: "Verificación de Cumplimiento",
      columns: ["estadoRUES", "pliego", "fechaCorte", "cumplimiento", "hallazgosSER"]
    },
    {
      id: "recomendacion",
      label: "Recomendación y Sanción",
      columns: ["recomendacion", "tipoSancion", "conducta", "estado"]
    },
    {
      id: "documentos",
      label: "Documentos",
      columns: ["documentos"]
    }
  ],
  resultColumns: [
    {
      key: "estadoRUES",
      header: "Estado RUES",
      headerTooltip: "Estado jurídico actual del operador en el RUES. Activa: puede recibir y cumplir la sanción impuesta. Liquidada/Cancelada/En liquidación: el estado puede afectar la ejecución de la sanción y requiere análisis adicional sobre la procedencia del cobro o archivo.",
      filterable: true,
      render: (val: string) => {
        const isActiva = val === "Activa";
        return (
          <Badge
            className={cn(
              "border-none px-3 py-1.5 min-w-[130px] justify-center",
              isActiva ? "bg-[#10B981]/10 text-[#10B981]" : "bg-[#EF4444]/10 text-[#EF4444]"
            )}
            style={{ ...bodyXs, fontWeight: "var(--font-weight-semibold)" }}
          >
            {isActiva ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> : <AlertCircle className="w-3.5 h-3.5 mr-1.5" />}
            {val}
          </Badge>
        );
      }
    },
    {
      key: "pliego",
      header: "Pliego",
      headerTooltip: "Número del pliego de cargos que dio inicio al proceso sancionatorio (MÓDULO 1). En este módulo se verifica si el operador cumplió con las obligaciones que generaron el pliego, lo que puede conducir al archivo o a la imposición de sanción.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "operador",
      header: "Operador",
      headerTooltip: "Razón social del operador postal o de mensajería sujeto de la verificación de cumplimiento. Se corresponde con el operador registrado en los módulos previos del proceso sancionatorio (MÓDULOS 1, 2, 3 y 4).",
      truncate: true
    },
    {
      key: "fechaCorte",
      header: "Fecha de corte",
      headerTooltip: "Fecha límite hasta la cual se evaluó el cumplimiento de la obligación por parte del operador. Los datos de desempeño y los registros de la BDI se toman con corte a esta fecha para determinar si hubo subsanación o persiste el incumplimiento.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val}</span>
    },
    {
      key: "numerosBDI",
      header: "Numeros BDI",
      headerTooltip: "Número(s) de la Base de Datos de Infracciones asociados al proceso. Formato número-vigencia (p. ej. 9054-2025). Permite relacionar este proceso de cumplimiento con los registros históricos de infracciones del operador y los datos que originaron el pliego de cargos."
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
      header: "Hallazgos del SER",
      headerTooltip: "Resultados del análisis técnico del Sistema de Evaluación de Resultados (SER) sobre el cumplimiento o incumplimiento de las obligaciones. Haga clic para ver el detalle por cargo: indicadores evaluados, períodos de incumplimiento, datos cuantitativos y soporte documental que sustenta la recomendación.",
      clickable: true
    },
    {
      key: "recomendacion",
      header: "Recomendación de sanción",
      headerTooltip: "Recomendación técnico-jurídica generada a partir del análisis de cumplimiento y los hallazgos SER. ARCHIVO: el operador demostró cumplimiento, se recomienda archivar el proceso. SANCIÓN: persiste el incumplimiento, se recomienda imponer sanción. REQUIERE REVISIÓN: caso con elementos contradictorios que necesita análisis adicional.",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
          "ARCHIVO": { bg: "bg-[#10B981]/15", text: "text-[#10B981]", icon: <CheckCircle2 className="w-4 h-4 mr-2" /> },
          "SANCIÓN": { bg: "bg-[#EF4444]/15", text: "text-[#EF4444]", icon: <AlertCircle className="w-4 h-4 mr-2" /> },
          "REQUIERE REVISIÓN": { bg: "bg-[#F59E0B]/15", text: "text-[#F59E0B]", icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
        };
        const cfg = config[val] || config["REQUIERE REVISIÓN"];
        return (
          <Badge
            className={cn(
              "border-none px-4 py-2 min-w-[140px] justify-center uppercase",
              cfg.bg,
              cfg.text
            )}
            style={{ ...bodyXs, fontSize: "16px", fontWeight: "var(--font-weight-bold)" }}
          >
            {cfg.icon}
            {val}
          </Badge>
        );
      }
    },
    {
      key: "tipoSancion",
      header: "Tipo de sanción",
      headerTooltip: "Categoría de la sanción administrativa recomendada cuando la recomendación es SANCIÓN. Multa: sanción económica. Suspensión: cese temporal de actividades. Cancelación: revocación del título habilitante. N/A cuando la recomendación es ARCHIVO. Definida según la Ley 1369 de 2009 y sus reglamentos.",
      filterable: true,
      render: (val: string | null, row: Record<string, any>) => {
        if (!val || row.recomendacion === "ARCHIVO") {
          return <span className="text-muted-foreground italic" style={bodyXs}>N/A</span>;
        }
        const colorMap: Record<string, string> = {
          "Multa": "bg-[#F59E0B]/10 text-[#F59E0B]",
          "Suspensión": "bg-[#EF4444]/10 text-[#EF4444]",
          "Cancelación": "bg-[#7C3AED]/10 text-[#7C3AED]",
          "Otra": "bg-muted/30 text-muted-foreground",
        };
        return (
          <Badge
            className={cn("border-none px-3 py-1", colorMap[val] || colorMap["Otra"])}
            style={bodyXs}
          >
            {val}
          </Badge>
        );
      }
    },
    {
      key: "conducta",
      header: "Conducta",
      headerTooltip: "Descripción específica del comportamiento infractor que da lugar a la sanción recomendada. Identifica la obligación incumplida, el período de incumplimiento y el sustento normativo. N/A cuando la recomendación es ARCHIVO y el proceso se encamina al cierre.",
      truncate: true,
      render: (val: string | null, row: Record<string, any>) => {
        if (!val || val === "N/A" || row.recomendacion === "ARCHIVO") {
          return <span className="text-muted-foreground italic" style={bodyXs}>N/A</span>;
        }
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "estado",
      header: "Estado",
      headerTooltip: "Estado administrativo del proceso de cumplimiento en el sistema de gestión. Activo: proceso en trámite vigente. Archivado: proceso concluido con decisión de archivo. Cancelado: proceso suspendido por decisión administrativa. Permite filtrar y organizar el trabajo pendiente frente al ya finalizado.",
      filterable: true,
      render: (val: any) => {
        const cfg = {
          "Archivado": { variant: "info" as const, icon: <Archive className="w-3.5 h-3.5" /> },
          "Sancionado": { variant: "destructive" as const, icon: <Gavel className="w-3.5 h-3.5" /> }
        }[val as string] || { variant: "default" as const, icon: <FileText className="w-3.5 h-3.5" /> };
        return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
      }
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
    { id: "1", estadoRUES: "Activa", pliego: "SPL-2025-03-18", operador: "Operador Telecomunicaciones S.A.", fechaCorte: "31/Mar/2025", cumplimiento: "Cumplió", hallazgosSER: "Ver validación completa", recomendacion: "ARCHIVO", tipoSancion: null, conducta: null, estado: "Archivado", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-03-18.pdf", tamano: "5.2 MB", tipo: "pdf" }, { nombre: "Informe_cumplimiento_completo.pdf", tamano: "3.8 MB", tipo: "pdf" }, { nombre: "Consulta_SER_consolidada.pdf", tamano: "2.1 MB", tipo: "pdf" }] } },
    { id: "2", estadoRUES: "Liquidada", pliego: "SPL-2025-04-01", operador: "Red Conecta Ltda.", fechaCorte: "30/Abr/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "ARCHIVO", tipoSancion: null, conducta: null, estado: "Archivado", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-04-01.pdf", tamano: "2.9 MB", tipo: "pdf" }, { nombre: "Certificado_liquidacion_RUES.pdf", tamano: "1.5 MB", tipo: "pdf" }] } },
    { id: "3", estadoRUES: "Activa", pliego: "SPL-2025-05-10", operador: "Comunicaciones del Norte S.A.S.", fechaCorte: "31/May/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "SANCIÓN", tipoSancion: "Multa", conducta: "No pago aportes Trim 1 y 3", estado: "Activo", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-05-10.pdf", tamano: "6.3 MB", tipo: "pdf" }, { nombre: "Analisis_incumplimiento.pdf", tamano: "4.1 MB", tipo: "pdf" }, { nombre: "Propuesta_sancion_multa.pdf", tamano: "2.9 MB", tipo: "pdf" }] } },
    { id: "4", estadoRUES: "Activa", pliego: "SPL-2025-06-15", operador: "Telecable Nacional S.A.", fechaCorte: "30/Jun/2025", cumplimiento: "Cumplió", hallazgosSER: "Ver validación completa", recomendacion: "ARCHIVO", tipoSancion: null, conducta: null, estado: "Archivado", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-06-15.pdf", tamano: "4.7 MB", tipo: "pdf" }, { nombre: "Evidencias_cumplimiento_total.pdf", tamano: "2.8 MB", tipo: "pdf" }] } },
    { id: "5", estadoRUES: "Activa", pliego: "SPL-2025-07-20", operador: "Servicios Integrales de Comunicacion S.A.", fechaCorte: "31/Jul/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "SANCIÓN", tipoSancion: "Suspensión", conducta: "Incumplimiento total durante tres trimestres", estado: "Activo", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-07-20.pdf", tamano: "7.1 MB", tipo: "pdf" }, { nombre: "Analisis_incumplimiento_total.pdf", tamano: "5.2 MB", tipo: "pdf" }, { nombre: "Propuesta_sancion_suspension.pdf", tamano: "4.3 MB", tipo: "pdf" }] } },
    { id: "6", estadoRUES: "Cancelada", pliego: "SPL-2025-08-05", operador: "Internet Rural Colombia S.A.S.", fechaCorte: "31/Ago/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "ARCHIVO", tipoSancion: null, conducta: null, estado: "Archivado", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-08-05.pdf", tamano: "3.8 MB", tipo: "pdf" }, { nombre: "Certificado_cancelacion_RUES.pdf", tamano: "1.2 MB", tipo: "pdf" }] } },
    { id: "7", estadoRUES: "Activa", pliego: "SPL-2025-09-12", operador: "Conecta Colombia S.A.S.", fechaCorte: "30/Sep/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "SANCIÓN", tipoSancion: "Cancelación", conducta: "Reincidencia en incumplimiento de obligaciones", estado: "Activo", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-09-12.pdf", tamano: "8.5 MB", tipo: "pdf" }, { nombre: "Historial_incumplimientos.pdf", tamano: "6.2 MB", tipo: "pdf" }, { nombre: "Propuesta_sancion_cancelacion.pdf", tamano: "5.1 MB", tipo: "pdf" }] } },
    { id: "8", estadoRUES: "Activa", pliego: "SPL-2025-10-18", operador: "Redes Digitales S.A.", fechaCorte: "31/Oct/2025", cumplimiento: "No cumplió", hallazgosSER: "Ver validación completa", recomendacion: "REQUIERE REVISIÓN", tipoSancion: "Multa", conducta: "Descargos complejos que requieren evaluación adicional", estado: "Activo", documentos: { archivos: [{ nombre: "Recomendacion_SPL-2025-10-18.pdf", tamano: "4.9 MB", tipo: "pdf" }, { nombre: "Analisis_preliminar.pdf", tamano: "3.2 MB", tipo: "pdf" }] } },
  ],
};
