import React from "react";
import { ClipboardCheck, Search, Download, FileText, Brain, CheckCircle2, XOctagon, Clock, Mail, Folder, Database, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { ModuleConfig, bodyXs, StatusBadge } from "../../app/shared";

export const modulo4Config: ModuleConfig = {
  id: "alegatos-conclusion",
  title: "Verificación de alegatos de conclusión",
  shortTitle: "Alegatos de Conclusión",
  epicLabel: "Epica 04",
  description: "Consulta y trazabilidad acumulada del proceso sancionatorio hasta la etapa de alegatos de conclusión. Incluye el historial de notificación del pliego, descargos y solicitud de pruebas, comunicación del acto de pruebas, y los alegatos de conclusión presentados por los operadores.",
  excelFields: ["Acto de prueba", "Año"],
  navIcon: <ClipboardCheck className="w-4 h-4" />,
  processingSteps: [
    { label: "Buscando radicados de alegatos", icon: <Search className="w-4 h-4" /> },
    { label: "Recuperando PDFs y anexos", icon: <Download className="w-4 h-4" /> },
    { label: "Almacenando en Cloud Storage", icon: <FileText className="w-4 h-4" /> },
    { label: "Interpretando alegatos con IA", icon: <Brain className="w-4 h-4" /> },
  ],
  columnTabs: [
    {
      id: "notificacion",
      label: "Notificación Pliego",
      columns: ["operador", "bdi", "pliego", "fechaActoAdministrativo", "medioEntrega", "direccionNotificacion", "fechaEntrega", "fechaNotificacionPliego", "estadoNotificacion"]
    },
    {
      id: "descargos",
      label: "Descargos y solicitud de pruebas",
      columns: ["operador", "bdi", "fechaLimite", "descargos", "estadoTermino", "fechaPresentacion", "fechaRadicacion", "pruebasAsociadas", "acciones"]
    },
    {
      id: "comunicacion-pruebas",
      label: "Comunicación del Acto de Pruebas",
      columns: ["operador", "bdi", "actoPruebas", "fechaActoPruebas", "medioEntregaPruebas", "direccionComunicacionPruebas", "fechaEntregaPruebas", "fechaEfectivaComunicacionPruebas", "estadoComunicacionPruebas", "trazabilidadPruebas", "documentosPruebas"]
    },
    {
      id: "alegatos",
      label: "Alegatos de conclusión",
      columns: ["operador", "bdi", "fechaLimiteAlegatos", "presentoAlegatos", "estadoTerminoAlegatos", "fechaPresentacionAlegatos", "fechaRadicacionAlegatos", "pruebasAlegatos", "documentosAlegatos", "acciones"]
    },
    {
      id: "verificacion-cumplimiento",
      label: "Verificación de Cumplimiento",
      columns: ["operador", "bdi", "fechaCorte", "pliego", "cumplimiento", "hallazgosSER", "documentos", "acciones"]
    },
  ],
  resultColumns: [
    {
      key: "operador",
      header: "Razón Social",
      headerTooltip: "Nombre o razón social del operador objeto de la actuación administrativa.",
      filterable: false,
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "bdi",
      header: "BDI",
      headerTooltip: "Número de BDI completo incluyendo consecutivo y año (ejemplo: 9054-2025).",
      filterable: false
    },
    {
      key: "fechaCorte",
      header: "Fecha de corte",
      headerTooltip: "Fecha en la que el usuario realiza la consulta de verificación de cumplimiento.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "--"}</span>
    },
    {
      key: "pliego",
      header: "Número de acto administrativo",
      headerTooltip: "Identificación del acto administrativo (pliego de cargos) que da inicio al proceso.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val || "—"}</span>
    },
    {
      key: "cumplimiento",
      header: "Cumplimiento",
      headerTooltip: "Resultado de la verificación de cumplimiento del operador para el periodo evaluado.",
      filterable: false,
      render: (val: string) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>--</span>;
        const ok = val === "Cumplió";
        return <StatusBadge label={val} variant={ok ? "success" : "destructive"} icon={ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />} />;
      }
    },
    {
      key: "hallazgosSER",
      header: "Hallazgos",
      headerTooltip: "Resultados del análisis técnico del SER. Haga clic para desplegar los trimestres.",
      expandable: true,
      render: (val: any) => {
        if (!val || !val.trimestres) return <span style={bodyXs}>Sin hallazgos</span>;
        const n = val.trimestres.length;
        return (
          <div className="inline-flex justify-center w-[110px] items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-primary/10 transition-colors border border-primary/10">
            <ChevronRight className="w-3.5 h-3.5" />
            Ver detalle ({n} trimestre{n !== 1 ? "s" : ""})
          </div>
        );
      }
    },
    {
      key: "documentos",
      header: "Documentos",
      headerTooltip: "Documentos asociados al proceso de verificación de cumplimiento.",
      render: (val: any, row: Record<string, any>) => {
        const docs = (val || row.documentos)?.archivos || [];
        const count = docs.length;
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
    {
      key: "anio",
      header: "Año de vigencia",
      headerTooltip: "Dato de identificación del proceso correspondiente al año de vigencia del expediente.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => (
        <span className="inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary rounded-md" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
          {row.anio || val || "—"}
        </span>
      )
    },
    {
      key: "fechaActoAdministrativo",
      header: "Fecha del acto administrativo",
      headerTooltip: "Fecha de expedición del acto administrativo del pliego de cargos.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "medioEntrega",
      header: "Medio de entrega de notificación",
      headerTooltip: "Canal utilizado para materializar la entrega de la actuación (físico o electrónico).",
      filterable: true,
      render: (val: string) => (
        <div className="flex items-center gap-2">
          {val === "Correo electrónico" ? <Mail className="w-3.5 h-3.5 text-primary" /> : <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
          <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
        </div>
      )
    },
    {
      key: "direccionNotificacion",
      header: "Dirección física / correo electrónico",
      headerTooltip: "Destino utilizado para la notificación del pliego de cargos.",
      truncate: true,
      render: (val: string) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground inline-block max-w-[220px] truncate align-middle" title={val} style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "fechaEntrega",
      header: "Fecha de entrega",
      headerTooltip: "Fecha en la cual la Entidad realizó el envío o puso a disposición la actuación.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "fechaNotificacionPliego",
      header: "Fecha efectiva de notificación",
      headerTooltip: "Fecha en la cual se entiende surtida jurídicamente la notificación del pliego de cargos.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const fecha = val || row.fechaComunicacion;
        const diferida = row.fechaEntrega !== fecha && fecha;
        return (
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={bodyXs}>{fecha || "—"}</span>
            {diferida && <Badge className="bg-chart-4/15 text-chart-4 border-none px-2 py-0.5 text-[10px]">+1 día</Badge>}
          </div>
        );
      }
    },
    {
      key: "estadoNotificacion",
      header: "Estado de notificación",
      headerTooltip: "Estado procesal de la notificación del pliego (notificado, devuelto, pendiente, etc.).",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" | "info"; icon: React.ReactNode }> = {
          "Notificado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente"];
        return <StatusBadge label={val || "—"} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    // ── Descargos y solicitud de pruebas ───────────────────────────────────
    {
      key: "fechaEfectivaNotificacion",
      header: "Fecha efectiva de notificación",
      headerTooltip: "Fecha en la cual se entiende surtida jurídicamente la notificación del pliego. A partir de esta fecha corre el término de descargos.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const fecha = val || row.fechaComunicacion;
        return <span className="text-foreground" style={bodyXs}>{fecha || "—"}</span>;
      }
    },
    {
      key: "fechaLimite",
      header: "Fecha límite de presentación de descargos",
      headerTooltip: "Fecha máxima establecida legalmente para que el operador presente sus descargos.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "descargos",
      header: "¿Presentó descargos?",
      headerTooltip: "Indica si el operador ejerció su derecho de defensa presentando descargos.",
      filterable: true,
      render: (val: string) => {
        const si = val === "Sí" || val === "Si" || val?.toLowerCase() === "sí";
        return <StatusBadge label={val || "—"} variant={si ? "success" : "neutral"} icon={si ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />} />;
      }
    },
    {
      key: "estadoTermino",
      header: "Estado del término",
      headerTooltip: "Indica si los descargos fueron presentados dentro del término legal o fuera de él.",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" }> = {
          "Dentro del término": { variant: "success" },
          "A tiempo": { variant: "success" },
          "Fuera del término": { variant: "destructive" },
          "Extemporáneo": { variant: "warning" },
          "Sin descargos": { variant: "neutral" },
          "Vencido": { variant: "destructive" },
        };
        const cfg = config[val] || { variant: "neutral" as const };
        return <StatusBadge label={val || "—"} variant={cfg.variant} />;
      }
    },
    {
      key: "fechaPresentacion",
      header: "Fecha de presentación de descargos",
      headerTooltip: "Fecha en que el operador presentó los descargos ante la entidad.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "fechaRadicacion",
      header: "Fecha de radicación de descargos",
      headerTooltip: "Fecha oficial de radicación del descargo en el sistema INTEGRATIC.",
      render: (val: string) => {
        if (!val || val === "N/A") return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "pruebasAsociadas",
      header: "Pruebas asociadas",
      headerTooltip: "Pruebas presentadas por el operador junto con sus descargos.",
      expandable: true,
      render: (val: any, row: Record<string, any>) => {
        const pruebas = row.pruebas || [];
        if (pruebas.length === 0) return <span className="text-muted-foreground" style={bodyXs}>Sin pruebas</span>;
        return (
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-primary underline underline-offset-2 font-medium" style={bodyXs}>
              {pruebas.length} prueba{pruebas.length !== 1 ? "s" : ""}
            </span>
          </div>
        );
      }
    },
    {
      key: "documentosDescargos",
      header: "Documentos asociados",
      headerTooltip: "Documentos radicados junto con los descargos y solicitud de pruebas.",
      render: (val: any, row: Record<string, any>) => {
        const docs = (val || row.documentos)?.archivos || [];
        const count = docs.length;
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
    // ── Comunicación del Acto de Pruebas ──────────────────────────────────
    {
      key: "actoPruebas",
      header: "Número de acto administrativo (pruebas)",
      headerTooltip: "Identificación del acto administrativo de pruebas dentro del proceso sancionatorio.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val || "—"}</span>
    },
    {
      key: "fechaActoPruebas",
      header: "Fecha del acto de pruebas",
      headerTooltip: "Fecha de expedición del acto administrativo de pruebas.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "medioEntregaPruebas",
      header: "Medio de entrega de la comunicación",
      headerTooltip: "Canal utilizado: Comunicación electrónica, Comunicación física o Publicación.",
      filterable: true,
      render: (val: string) => {
        const isElec = val === "Comunicación electrónica";
        const isPub = val === "Publicación";
        return (
          <div className="flex items-center gap-2">
            {isElec ? <Mail className="w-3.5 h-3.5 text-primary" /> : isPub ? <CheckCircle2 className="w-3.5 h-3.5 text-chart-4" /> : <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
            <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
          </div>
        );
      }
    },
    {
      key: "direccionComunicacionPruebas",
      header: "Dirección física / correo electrónico",
      headerTooltip: "Destino utilizado para la comunicación del acto de pruebas.",
      truncate: true,
      render: (val: string) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground inline-block max-w-[220px] truncate align-middle" title={val} style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "fechaEntregaPruebas",
      header: "Fecha de entrega",
      headerTooltip: "Fecha en la cual la Entidad realizó el envío del acto de pruebas.",
      render: (val: string, row: Record<string, any>) => {
        const fecha = val || row.fechaComunicacionPruebas;
        return <span className="text-foreground" style={bodyXs}>{fecha || "—"}</span>;
      }
    },
    {
      key: "fechaEfectivaComunicacionPruebas",
      header: "Fecha de entrega efectiva",
      headerTooltip: "Fecha en la cual se entiende surtida jurídicamente la comunicación del acto de pruebas.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const entrega = row.fechaEntregaPruebas || row.fechaComunicacionPruebas;
        const diferida = entrega !== val && val;
        return (
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
            {diferida && <Badge className="bg-chart-4/15 text-chart-4 border-none px-2 py-0.5 text-[10px]">+1 día</Badge>}
          </div>
        );
      }
    },
    {
      key: "estadoComunicacionPruebas",
      header: "Estado de la comunicación",
      headerTooltip: "Resultado procesal de la comunicación del acto de pruebas.",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" | "info"; icon: React.ReactNode }> = {
          "Comunicado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
          "Publicado": { variant: "warning", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente"];
        return <StatusBadge label={val || "—"} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "trazabilidadPruebas",
      header: "Trazabilidad (Eventos)",
      headerTooltip: "Histórico cronológico de eventos de la comunicación del acto de pruebas.",
      expandable: true,
      render: (val: any) => {
        const count = Array.isArray(val) ? val.length : 0;
        return (
          <div className="inline-flex justify-center w-[110px] items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-primary/10 transition-colors border border-primary/10">
            <ChevronRight className="w-3.5 h-3.5" />
            {count} {count === 1 ? 'evento' : 'eventos'}
          </div>
        );
      }
    },
    {
      key: "documentosPruebas",
      header: "Documentos asociados",
      headerTooltip: "Documentos relacionados con la comunicación del acto de pruebas.",
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
    // ── Alegatos de conclusión ─────────────────────────────────────────────
    {
      key: "fechaLimiteAlegatos",
      header: "Fecha límite de presentación de alegatos",
      headerTooltip: "Fecha máxima establecida legalmente para que el operador presente sus alegatos de conclusión.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "presentoAlegatos",
      header: "¿Presentó alegatos?",
      headerTooltip: "Indica si el operador ejerció su derecho de presentar alegatos de conclusión dentro del término legal.",
      filterable: true,
      render: (val: string | boolean) => {
        const si = val === "Sí" || val === "Si" || val === true;
        return <StatusBadge label={si ? "Sí" : "No"} variant={si ? "success" : "neutral"} icon={si ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />} />;
      }
    },
    {
      key: "estadoTerminoAlegatos",
      header: "Estado del término",
      headerTooltip: "Indica si los alegatos fueron presentados dentro del término legal (A tiempo), fuera de él (Extemporáneo), o si el operador no presentó (Sin alegatos).",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" }> = {
          "A tiempo": { variant: "success" },
          "Dentro del término": { variant: "success" },
          "Extemporáneo": { variant: "warning" },
          "Sin alegatos": { variant: "neutral" },
          "Vencido": { variant: "destructive" },
        };
        const cfg = config[val] || { variant: "neutral" as const };
        return <StatusBadge label={val || "—"} variant={cfg.variant} />;
      }
    },
    {
      key: "fechaPresentacionAlegatos",
      header: "Fecha de presentación de alegatos",
      headerTooltip: "Fecha en que el operador presentó los alegatos de conclusión ante la entidad.",
      render: (val: string) => {
        if (!val || val === "N/A" || val === "--") return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "fechaRadicacionAlegatos",
      header: "Fecha de radicación de alegatos",
      headerTooltip: "Fecha oficial de radicación del escrito de alegatos de conclusión en el sistema INTEGRATIC.",
      render: (val: string) => {
        if (!val || val === "N/A" || val === "--") return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "pruebasAlegatos",
      header: "Pruebas asociadas",
      headerTooltip: "Pruebas o soportes adicionales presentados por el operador junto con sus alegatos de conclusión.",
      expandable: true,
    },
    {
      key: "documentosAlegatos",
      header: "Documentos asociados",
      headerTooltip: "Archivos y soportes radicados con los alegatos de conclusión. Haga clic para ver o descargar.",
      render: (val: any, row: Record<string, any>) => {
        const docs = (val || row.documentos)?.archivos || [];
        const count = docs.length;
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
    }
  ],
  mockData: [
    {
      id: "1",
      operador: "Operador Andino SAS",
      bdi: "9054-2025",
      anio: "2025",
      pliego: "SPL-2025-03-18",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Calle 72 #10-34, Oficina 501, Bogotá D.C.",
      fechaEntrega: "20/Mar/2025",
      fechaNotificacionPliego: "20/Mar/2025",
      estadoNotificacion: "Notificado",
      fechaEfectivaNotificacion: "20/Mar/2025",
      fechaLimite: "27/Mar/2025",
      descargos: "Sí",
      estadoTermino: "A tiempo",
      fechaPresentacion: "25/Mar/2025",
      fechaRadicacion: "25/Mar/2025",
      pruebas: [
        { id: "pr1-1", nombre: "Planillas de pago PILA", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Planillas PILA Q1 2024", documento: { nombre: "Planilla_Q1_2024.pdf", tamano: "1.2 MB", tipo: "pdf" } }
      ],
      actoPruebas: "ACT-PRU-2025-001",
      fechaActoPruebas: "10/Abr/2025",
      medioEntregaPruebas: "Comunicación electrónica",
      direccionComunicacionPruebas: "notificaciones@operadorandino.com",
      fechaEntregaPruebas: "12/Abr/2025",
      fechaEfectivaComunicacionPruebas: "12/Abr/2025",
      estadoComunicacionPruebas: "Comunicado",
      trazabilidadPruebas: [
        { id: "t1-1", fecha: "12/Abr/2025", tipo: "Envío electrónico", resultado: "Entregado al servidor", documento: { nombre: "Oficio_Comunicacion.pdf", tamano: "1.2 MB", tipo: "pdf" } }
      ],
      documentosPruebas: { archivos: [{ nombre: "Oficio_Comunicacion.pdf", tamano: "1.2 MB", tipo: "pdf" }] },
      fechaCorte: "31/May/2025",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "No reportar información de aportes", estadoPago: "No Pagado (NPA)" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "No reportar información de aportes", estadoPago: "Extemporáneo" }] }
        ]
      },
      fechaLimiteAlegatos: "25/May/2025",
      presentoAlegatos: "Sí",
      estadoTerminoAlegatos: "A tiempo",
      fechaPresentacionAlegatos: "21/May/2025",
      fechaRadicacionAlegatos: "22/May/2025",
      pruebasAlegatos: [
        { id: "al1-1", nombre: "Estados financieros certificados", descripcion: "Soporte contable del período evaluado", tipo: "anexada", tipoPrueba: "Documental", documento: { nombre: "Estados_financieros_certificados.pdf", tamano: "2.8 MB", tipo: "pdf" } }
      ],
      documentosAlegatos: { archivos: [{ nombre: "Alegato_RAD-AL-001.pdf", tamano: "3.2 MB", tipo: "pdf" }, { nombre: "Estados_financieros_certificados.pdf", tamano: "2.8 MB", tipo: "pdf" }] },
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-001.pdf", tamano: "3.2 MB", tipo: "pdf" }, { nombre: "Estados_financieros_certificados.pdf", tamano: "2.8 MB", tipo: "pdf" }] }
    },
    {
      id: "2",
      operador: "Telecom Norte SA",
      bdi: "9055-2025",
      anio: "2025",
      pliego: "SPL-2025-04-22",
      medioEntrega: "Correo electrónico",
      direccionNotificacion: "notificaciones@telecomnorte.com.co",
      fechaEntrega: "25/Abr/2025",
      fechaNotificacionPliego: "26/Abr/2025",
      estadoNotificacion: "Notificado",
      fechaEfectivaNotificacion: "26/Abr/2025",
      fechaLimite: "08/May/2025",
      descargos: "No",
      estadoTermino: "Sin descargos",
      fechaPresentacion: "N/A",
      fechaRadicacion: "N/A",
      pruebas: [],
      actoPruebas: "ACT-PRU-2025-002",
      fechaActoPruebas: "15/May/2025",
      medioEntregaPruebas: "Comunicación física",
      direccionComunicacionPruebas: "Cra 45 #22-10, Medellín",
      fechaEntregaPruebas: "18/May/2025",
      fechaEfectivaComunicacionPruebas: "19/May/2025",
      estadoComunicacionPruebas: "Comunicado",
      trazabilidadPruebas: [
        { id: "t2-1", fecha: "18/May/2025", tipo: "Entrega física", resultado: "Entregado en dirección registrada" },
        { id: "t2-2", fecha: "19/May/2025", tipo: "Comunicación efectiva", resultado: "Firmado acuse de recibo" }
      ],
      documentosPruebas: { archivos: [{ nombre: "Acto_Pruebas_002.pdf", tamano: "2.1 MB", tipo: "pdf" }] },
      fechaCorte: "30/Jun/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Reportar información extemporáneamente", estadoPago: "Extemporáneo" }] }
        ]
      },
      fechaLimiteAlegatos: "02/Jun/2025",
      presentoAlegatos: "No",
      estadoTerminoAlegatos: "Sin alegatos",
      fechaPresentacionAlegatos: "N/A",
      fechaRadicacionAlegatos: "N/A",
      pruebasAlegatos: [],
      documentosAlegatos: { archivos: [{ nombre: "Constancia_no_presentacion.pdf", tamano: "720 KB", tipo: "pdf" }] },
      documentos: { archivos: [{ nombre: "Constancia_no_presentacion.pdf", tamano: "720 KB", tipo: "pdf" }] }
    },
    {
      id: "3",
      operador: "Conectividad Caribe Digital SAS",
      bdi: "9077-2025",
      anio: "2025",
      pliego: "SPL-2025-05-10",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Cra 51B #80-58, Barranquilla",
      fechaEntrega: "12/May/2025",
      fechaNotificacionPliego: "12/May/2025",
      estadoNotificacion: "Devuelto",
      fechaEfectivaNotificacion: "19/May/2025",
      fechaLimite: "02/Jun/2025",
      descargos: "Sí",
      estadoTermino: "A tiempo",
      fechaPresentacion: "30/May/2025",
      fechaRadicacion: "30/May/2025",
      pruebas: [
        { id: "pr3-1", nombre: "Concepto jurídico externo", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Concepto sobre interpretación normativa", documento: { nombre: "Concepto_juridico.pdf", tamano: "1.9 MB", tipo: "pdf" } },
        { id: "pr3-2", nombre: "Marco normativo vigente", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Normativa aplicable", documento: { nombre: "Marco_normativo.pdf", tamano: "2.3 MB", tipo: "pdf" } }
      ],
      actoPruebas: "ACT-PRU-2025-003",
      fechaActoPruebas: "20/Jun/2025",
      medioEntregaPruebas: "Comunicación electrónica",
      direccionComunicacionPruebas: "legal@caribeDigital.com.co",
      fechaEntregaPruebas: "22/Jun/2025",
      fechaEfectivaComunicacionPruebas: "22/Jun/2025",
      estadoComunicacionPruebas: "Comunicado",
      trazabilidadPruebas: [
        { id: "t3-1", fecha: "22/Jun/2025", tipo: "Envío electrónico", resultado: "Acuse de recibo firmado digitalmente" }
      ],
      documentosPruebas: { archivos: [{ nombre: "Acto_Pruebas_003.pdf", tamano: "1.8 MB", tipo: "pdf" }, { nombre: "Oficio_comunicacion.pdf", tamano: "950 KB", tipo: "pdf" }] },
      fechaCorte: "31/Jul/2025",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Reportar información con inconsistencias", estadoPago: "No Pagado (NPA)" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Reportar información con inconsistencias", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 3 2024", cargos: [{ cargo: "Reportar información con inconsistencias", estadoPago: "No Pagado (NPA)" }] }
        ]
      },
      fechaLimiteAlegatos: "07/Jul/2025",
      presentoAlegatos: "Sí",
      estadoTerminoAlegatos: "A tiempo",
      fechaPresentacionAlegatos: "03/Jul/2025",
      fechaRadicacionAlegatos: "04/Jul/2025",
      pruebasAlegatos: [
        { id: "al3-1", nombre: "Concepto jurídico externo", descripcion: "Concepto sobre interpretación normativa", tipo: "anexada", tipoPrueba: "Documental", documento: { nombre: "Concepto_juridico_externo.pdf", tamano: "1.9 MB", tipo: "pdf" } },
        { id: "al3-2", nombre: "Marco normativo vigente", descripcion: "Normativa aplicable al caso", tipo: "anexada", tipoPrueba: "Documental", documento: { nombre: "Marco_normativo_vigente.pdf", tamano: "2.3 MB", tipo: "pdf" } }
      ],
      documentosAlegatos: { archivos: [{ nombre: "Alegato_RAD-AL-003.pdf", tamano: "3.8 MB", tipo: "pdf" }, { nombre: "Concepto_juridico_externo.pdf", tamano: "1.9 MB", tipo: "pdf" }, { nombre: "Marco_normativo_vigente.pdf", tamano: "2.3 MB", tipo: "pdf" }] },
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-003.pdf", tamano: "3.8 MB", tipo: "pdf" }, { nombre: "Concepto_juridico_externo.pdf", tamano: "1.9 MB", tipo: "pdf" }, { nombre: "Marco_normativo_vigente.pdf", tamano: "2.3 MB", tipo: "pdf" }] }
    },
    {
      id: "4",
      operador: "Operadora Metropolitana de Servicios SAS",
      bdi: "9102-2025",
      anio: "2025",
      pliego: "SPL-2025-05-28",
      medioEntrega: "Correo electrónico",
      direccionNotificacion: "juridico@operametro.com",
      fechaEntrega: "28/May/2025",
      fechaNotificacionPliego: "29/May/2025",
      estadoNotificacion: "Notificado",
      fechaEfectivaNotificacion: "29/May/2025",
      fechaLimite: "12/Jun/2025",
      descargos: "Sí",
      estadoTermino: "Extemporáneo",
      fechaPresentacion: "15/Jun/2025",
      fechaRadicacion: "15/Jun/2025",
      pruebas: [
        { id: "pr4-1", nombre: "Recibos de pago", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Comprobantes bancarios", documento: { nombre: "Recibos_pago.pdf", tamano: "2.4 MB", tipo: "pdf" } }
      ],
      actoPruebas: "ACT-PRU-2025-004",
      fechaActoPruebas: "25/Jun/2025",
      medioEntregaPruebas: "Comunicación física",
      direccionComunicacionPruebas: "Av. El Dorado #68C-61, Bogotá D.C.",
      fechaEntregaPruebas: "27/Jun/2025",
      fechaEfectivaComunicacionPruebas: "27/Jun/2025",
      estadoComunicacionPruebas: "Pendiente",
      trazabilidadPruebas: [
        { id: "t4-1", fecha: "27/Jun/2025", tipo: "Entrega física", resultado: "Destinatario ausente" },
        { id: "t4-2", fecha: "28/Jun/2025", tipo: "Devolución", resultado: "Devuelto — ausente" }
      ],
      documentosPruebas: { archivos: [{ nombre: "Acto_Pruebas_004.pdf", tamano: "2.5 MB", tipo: "pdf" }] },
      fechaCorte: "31/Jul/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "No reportar información de aportes", estadoPago: "Pagado" }] }
        ]
      },
      fechaLimiteAlegatos: "14/Jul/2025",
      presentoAlegatos: "Sí",
      estadoTerminoAlegatos: "A tiempo",
      fechaPresentacionAlegatos: "09/Jul/2025",
      fechaRadicacionAlegatos: "10/Jul/2025",
      pruebasAlegatos: [
        { id: "al4-1", nombre: "Recibos de pago completos", descripcion: "Comprobantes bancarios del período", tipo: "anexada", tipoPrueba: "Documental", documento: { nombre: "Recibos_pago_completos.pdf", tamano: "2.4 MB", tipo: "pdf" } }
      ],
      documentosAlegatos: { archivos: [{ nombre: "Alegato_RAD-AL-004.pdf", tamano: "2.9 MB", tipo: "pdf" }, { nombre: "Recibos_pago_completos.pdf", tamano: "2.4 MB", tipo: "pdf" }] },
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-004.pdf", tamano: "2.9 MB", tipo: "pdf" }, { nombre: "Recibos_pago_completos.pdf", tamano: "2.4 MB", tipo: "pdf" }] }
    },
    {
      id: "5",
      operador: "Comunicaciones del Pacífico Ltda",
      bdi: "9119-2025",
      anio: "2025",
      pliego: "SPL-2025-06-05",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Cra 3 #12-25, Cali",
      fechaEntrega: "07/Jun/2025",
      fechaNotificacionPliego: "07/Jun/2025",
      estadoNotificacion: "Notificado",
      fechaEfectivaNotificacion: "07/Jun/2025",
      fechaLimite: "23/Jun/2025",
      descargos: "Sí",
      estadoTermino: "A tiempo",
      fechaPresentacion: "20/Jun/2025",
      fechaRadicacion: "20/Jun/2025",
      pruebas: [],
      actoPruebas: "ACT-PRU-2025-005",
      fechaActoPruebas: "10/Jul/2025",
      medioEntregaPruebas: "Comunicación electrónica",
      direccionComunicacionPruebas: "notificaciones@compacifico.co",
      fechaEntregaPruebas: "11/Jul/2025",
      fechaEfectivaComunicacionPruebas: "11/Jul/2025",
      estadoComunicacionPruebas: "Comunicado",
      trazabilidadPruebas: [
        { id: "t5-1", fecha: "11/Jul/2025", tipo: "Envío electrónico", resultado: "Entregado" }
      ],
      documentosPruebas: { archivos: [{ nombre: "Acto_Pruebas_005.pdf", tamano: "1.7 MB", tipo: "pdf" }] },
      fechaCorte: "31/Ago/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2025", cargos: [{ cargo: "No reportar información de afiliados", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2025", cargos: [{ cargo: "No reportar información de afiliados", estadoPago: "Pagado" }] }
        ]
      },
      fechaLimiteAlegatos: "25/Jul/2025",
      presentoAlegatos: "Sí",
      estadoTerminoAlegatos: "A tiempo",
      fechaPresentacionAlegatos: "22/Jul/2025",
      fechaRadicacionAlegatos: "23/Jul/2025",
      pruebasAlegatos: [],
      documentosAlegatos: { archivos: [{ nombre: "Alegato_RAD-AL-005.pdf", tamano: "2.1 MB", tipo: "pdf" }] },
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-005.pdf", tamano: "2.1 MB", tipo: "pdf" }] }
    },
  ],
};
