import React from "react";
import { Gavel, Search, Download, FileText, Database, Building2, Brain, CheckCircle2, XOctagon, Clock, Mail, User, Paperclip, Plus, FileCheck, Ban, UserX, Eye, Folder, AlertTriangle, XCircle, ChevronRight } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../components/ui/tooltip";
import { Badge } from "../components/ui/badge";
import { cn } from "../components/ui/utils";
import { ModuleConfig, bodyXs, StatusBadge } from "../shared";

export const modulo3Config: ModuleConfig = {
  id: "actos-prueba",
  title: "Verificacion de Actos de Prueba",
  shortTitle: "Actos de Prueba",
  epicLabel: "Epica 03",
  description: "Analisis de las resoluciones (actos de prueba) que evaluan las pruebas presentadas por los operadores en la etapa anterior. Incluye validacion automatica del estado RUES, verificacion de cumplimiento por cargo y periodo segun datos del SER, y generacion de recomendaciones de sancion o archivo.",
  excelFields: ["Numero de acto de prueba", "Año", "Mes", "Día"],
  navIcon: <Gavel className="w-4 h-4" />,
  processingSteps: [
    { label: "Buscando radicados de actos de prueba", icon: <Search className="w-4 h-4" /> },
    { label: "Recuperando PDFs y anexos", icon: <Download className="w-4 h-4" /> },
    { label: "Almacenando en Cloud Storage", icon: <FileText className="w-4 h-4" /> },
    { label: "Consultando cumplimiento en SER", icon: <Database className="w-4 h-4" /> },
    { label: "Validando estado RUES", icon: <Building2 className="w-4 h-4" /> },
    { label: "Generando recomendaciones", icon: <Brain className="w-4 h-4" /> },
  ],
  columnTabs: [
    {
      id: "notificacion",
      label: "Notificación Pliego",
      columns: ["operador", "bdi", "pliego", "fechaActoAdministrativo", "tipoComunicacion", "medioEntrega", "direccionNotificacion", "fechaEntrega", "fechaComunicacion", "estadoComunicacion"]
    },
    {
      id: "pruebas",
      label: "Descargos y solicitud de pruebas",
      columns: ["operador", "bdi", "anio", "pliego", "fechaEfectivaNotificacion", "fechaLimite", "descargos", "estadoTermino", "fechaPresentacion", "fechaRadicacion", "documentos"]
    },
    {
      id: "comunicacion-pruebas",
      label: "Comunicación del Acto de Pruebas",
      columns: ["operador", "bdi", "actoPruebas", "fechaActoPruebas", "medioEntregaPruebas", "direccionComunicacionPruebas", "fechaEntregaPruebas", "fechaEfectivaComunicacionPruebas", "estadoComunicacionPruebas", "trazabilidadPruebas", "documentosPruebas"]
    },
    {
      id: "verificacion-cumplimiento",
      label: "Verificación de Cumplimiento",
      columns: ["operador", "bdi", "fechaCorte", "pliego", "cumplimiento", "hallazgosSER", "documentos", "acciones"]
    }
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
      key: "bdi",
      header: "BDI",
      headerTooltip: "Número de BDI completo incluyendo consecutivo y año (ejemplo: 9054-2025), permitiendo adicionalmente filtros independientes tanto por número como por vigencia.",
      filterable: false
    },
    {
      key: "fechaCorte",
      header: "Fecha de corte",
      headerTooltip: "Fecha en la que el usuario realiza la consulta de verificación de cumplimiento.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "--"}</span>
    },
    { key: "pliego", header: "Número de acto administrativo", headerTooltip: "Número del acto administrativo (pliego de cargos) que da inicio al proceso sancionatorio y dentro del cual se enmarcan los descargos y la solicitud de pruebas." },
    {
      key: "fechaActoAdministrativo",
      header: "Fecha del acto administrativo",
      headerTooltip: "Fecha de expedición del acto administrativo correspondiente al pliego de cargos.",
      render: (val: string, row: Record<string, any>) => {
        const fecha = `${row.dia}/${row.mes}/${row.anio}`;
        return <span className="text-foreground" style={bodyXs}>{fecha}</span>;
      }
    },
    {
      key: "cumplimiento",
      header: "Cumplimiento",
      headerTooltip: "Resultado de la verificación de cumplimiento del operador para el periodo evaluado.",
      filterable: false,
      render: (val: string) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>--</span>;
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
      headerTooltip: "Resultados del análisis técnico del Sistema de Evaluación de Resultados (SER). Haga clic para desplegar el detalle por trimestre.",
      expandable: true,
      render: (val: any) => {
        if (!val || !val.trimestres) return <span style={bodyXs}>Sin hallazgos</span>;
        const totalTrimestres = val.trimestres.length;
        const totalCargos = val.trimestres.reduce((sum: number, trim: any) => sum + (trim.cargos?.length || 0), 0);
        return (
          <div className="inline-flex justify-center w-[140px] items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-primary/10 transition-colors border border-primary/10">
            <ChevronRight className="w-3.5 h-3.5" />
            {totalTrimestres} trim., {totalCargos} cargo{totalCargos !== 1 ? "s" : ""}
          </div>
        );
      }
    },
    {
      key: "documentos",
      header: "Documentos",
      headerTooltip: "Documentos asociados al proceso de verificación de cumplimiento, incluyendo informes, actos de archivo o resolución sancionatoria descargados de INTEGRATIC.",
      clickable: true,
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

    {
      key: "tipoComunicacion",
      header: "Tipo de notificación",
      headerTooltip: "Mecanismo jurídico utilizado para surtir la notificación, conforme a la normativa aplicable (por ejemplo: notificación por medios electrónicos o citación para notificación personal).",
      filterable: true,
      render: (val: string) => {
        const variants: Record<string, "info" | "success" | "warning"> = {
          "Citación para notificación personal": "info",
          "Notificación por medios electrónicos": "info",
          "Notificación personal": "success",
          "Notificación por aviso": "warning",
          "Notificación por aviso electrónico": "warning",
        };
        return <StatusBadge label={val} variant={variants[val] || "neutral"} />;
      }
    },
    {
      key: "medioEntrega",
      header: "Medio de entrega de notificación",
      headerTooltip: "Canal utilizado para materializar la entrega de la actuación (físico o electrónico).",
      filterable: true,
      render: (val: string) => (
        <div className="flex items-center gap-2">
          {val === "Dirección física" ? <FileText className="w-3.5 h-3.5 text-muted-foreground" /> : <Mail className="w-3.5 h-3.5 text-primary" />}
          <span className="text-foreground" style={bodyXs}>{val}</span>
        </div>
      )
    },
    {
      key: "direccionNotificacion",
      header: "Dirección física / correo electrónico de notificación",
      headerTooltip: "Información específica del destino utilizado para surtir la entrega de la actuación administrativa.",
      truncate: true,
      render: (val: string, row: Record<string, any>) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        const isEmail = row.medioEntrega === "Correo electrónico";
        return (
          <span className="text-foreground inline-block max-w-[220px] truncate align-middle" title={val} style={{ ...bodyXs, fontFamily: isEmail ? "var(--font-body)" : undefined }}>
            {val}
          </span>
        );
      }
    },
    { key: "fechaEntrega", header: "Fecha de entrega", headerTooltip: "Fecha en la cual la Entidad realizó el envío o puso a disposición la actuación administrativa." },
    {
      key: "fechaEfectivaNotificacion",
      header: "Fecha efectiva de notificación",
      headerTooltip: "Fecha en la cual jurídicamente se entiende surtida la notificación del pliego de cargos, conforme a las reglas del CPACA. A partir de esta fecha corre el término legal para presentar descargos.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const fecha = val || row.fechaComunicacion;
        return <span className="text-foreground" style={bodyXs}>{fecha || "—"}</span>;
      }
    },
    {
      key: "estadoComunicacion", header: "Estado de la notificación", headerTooltip: "Resultado o estado procesal asociado a la actuación de notificación (notificado, devuelto, pendiente, entre otros).", filterable: true, render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive"; icon: React.ReactNode }> = {
          "Notificado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente"];
        return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "descargos", header: "Descargos", headerTooltip: "Indica si el operador presentó descargos en MÓDULO 2. Esta información cruza con el acto de prueba para verificar si el acto responde a la solicitud de pruebas del operador o si la entidad las decretó de oficio.", render: (val: string) => {
        return <span className="text-foreground" style={bodyXs}>{val || "Sin descargos"}</span>;
      }
    },

    {
      key: "fechaLimite",
      header: "Fecha límite de presentación de descargos",
      headerTooltip: "Fecha máxima establecida legalmente para que el operador presente sus descargos, contada desde la fecha efectiva de notificación del pliego de cargos."
    },
    {
      key: "presentoDescargos",
      header: "¿Presentó descargos?",
      headerTooltip: "Indica si el operador ejerció su derecho de contradicción presentando descargos dentro del término legal.",
      filterable: true,
      render: (val: string) => {
        const si = val === "Sí" || val === "Si" || val === true || val === "true";
        return (
          <div className="flex items-center gap-1.5">
            {si
              ? <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
              : <XCircle className="w-3.5 h-3.5 text-destructive" />}
            <span className="text-foreground" style={bodyXs}>{si ? "Sí" : "No"}</span>
          </div>
        );
      }
    },
    {
      key: "estadoTermino",
      header: "Estado del término",
      headerTooltip: "Indica si los descargos fueron presentados dentro del término legal (A tiempo), fuera de él (Extemporáneo), o si el operador no presentó descargos (Sin descargos).",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" }> = {
          "A tiempo": { variant: "success" },
          "Extemporáneo": { variant: "warning" },
          "Sin descargos": { variant: "neutral" },
          "Vencido": { variant: "destructive" },
        };
        const cfg = config[val] || { variant: "neutral" as const };
        return <StatusBadge label={val || "—"} variant={cfg.variant} />;
      }
    },
    {
      key: "fechaRadicacion",
      header: "Fecha de presentación / radicación de descargos",
      headerTooltip: "Fecha en que el operador radicó formalmente su escrito de descargos y solicitud de pruebas ante la entidad.",
      render: (val: string) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    { key: "fechaPresentacion", header: "Fecha presentación", headerTooltip: "Fecha en la que el operador presentó los descargos o la solicitud de pruebas." },
    {
      key: "actoPruebas",
      header: "Número de acto administrativo",
      headerTooltip: "Identificación del acto administrativo mediante el cual se decreta o valora el acto de pruebas dentro del proceso sancionatorio.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val || "—"}</span>
    },
    {
      key: "fechaActoPruebas",
      header: "Fecha del acto",
      headerTooltip: "Fecha de expedición del acto administrativo de pruebas.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
    },
    {
      key: "medioEntregaPruebas",
      header: "Medio de entrega de la comunicación",
      headerTooltip: "Canal utilizado para materializar la comunicación del acto de pruebas. Opciones: Comunicación electrónica, Comunicación física. Si no es posible la entrega por ninguna de estas vías, se activa automáticamente la publicación.",
      filterable: true,
      render: (val: string) => {
        const isElec = val === "Comunicación electrónica";
        const isPub = val === "Publicación";
        return (
          <div className="flex items-center gap-2">
            {isElec ? <Mail className="w-3.5 h-3.5 text-primary" /> : isPub ? <FileCheck className="w-3.5 h-3.5 text-chart-4" /> : <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
            <span className="text-foreground" style={bodyXs}>{val || "—"}</span>
          </div>
        );
      }
    },
    {
      key: "direccionComunicacionPruebas",
      header: "Dirección física / correo electrónico",
      headerTooltip: "Información específica del destino utilizado para surtir la entrega del acto de pruebas (dirección física o correo electrónico).",
      truncate: true,
      render: (val: string, row: Record<string, any>) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        const isEmail = row.medioEntregaPruebas === "Comunicación electrónica";
        return (
          <span className="text-foreground inline-block max-w-[220px] truncate align-middle" title={val} style={{ ...bodyXs, fontFamily: isEmail ? "var(--font-body)" : undefined }}>
            {val}
          </span>
        );
      }
    },
    {
      key: "fechaEntregaPruebas",
      header: "Fecha de entrega",
      headerTooltip: "Fecha en la cual la Entidad realizó el envío o puso a disposición el acto de pruebas.",
      render: (val: string, row: Record<string, any>) => {
        const fecha = val || row.fechaComunicacionPruebas;
        return <span className="text-foreground" style={bodyXs}>{fecha || "—"}</span>;
      }
    },
    {
      key: "fechaEfectivaComunicacionPruebas",
      header: "Fecha de entrega efectiva",
      headerTooltip: "Fecha en la cual jurídicamente se entiende surtida la comunicación del acto de pruebas conforme a las reglas del CPACA.",
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
      headerTooltip: "Resultado o estado procesal asociado a la comunicación del acto de pruebas (comunicado, devuelto, pendiente, publicado, entre otros).",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" | "info"; icon: React.ReactNode }> = {
          "Comunicado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Comunicación efectiva": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
          "En gestión": { variant: "info", icon: <Clock className="w-3.5 h-3.5" /> },
          "Publicado": { variant: "warning", icon: <FileCheck className="w-3.5 h-3.5" /> },
          "Fallido": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente"];
        return <StatusBadge label={val || "—"} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "trazabilidadPruebas",
      header: "Trazabilidad (Eventos)",
      headerTooltip: "Histórico cronológico de eventos asociados a la comunicación del acto de pruebas: envío, entrega, devolución, reenvío y publicación. Permite reconstruir toda la gestión de comunicación, ya que jurídicamente pueden existir varios intentos por un mismo acto.",
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
      headerTooltip: "Conjunto documental relacionado con la comunicación del acto de pruebas, incluyendo oficios, constancias de entrega, anexos y demás soportes.",
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
      operador: "Operador Andino SAS",
      nit: "900123456-7",
      expediente: "EXP-2025-101",
      codigoServicio: "412.10.21",
      servicio: "Telefonía móvil",
      regimen: "Concesión",
      bdi: "9054-2025",
      estadoRUES: "Activa",
      pliego: "SPL-2025-03-18",
      acto: "ACT-2025-03-20",
      anio: "2025",
      mes: "Marzo",
      dia: "20",
      cargosFormulados: ["No reportar información de aportes"],
      tipoComunicacion: "Citación para notificación personal",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Calle 72 #10-34, Oficina 501, Bogotá D.C.",
      fechaEntrega: "20/Mar/2025",
      fechaComunicacion: "20/Mar/2025",
      estadoComunicacion: "Notificado",
      descargos: "Presentado",
      presentoDescargos: "Sí",
      fechaLimite: "27/Mar/2025",
      estadoTermino: "A tiempo",
      fechaRadicacion: "25/Mar/2025",
      pruebasAnexadas: 2,
      pruebasSolicitadas: 1,
      tipoPrueba: "Documental",
      origenPrueba: "Operador",
      estadoPrueba: "Decretada",
      pruebas: [
        { id: "pr1-1", descripcion: "Planillas de pago PILA Q1 2024", tipo: "Documental", origen: "Operador", estado: "Decretada", categoriaOrigen: "Anexada", documento: "Planilla_Q1_2024.pdf" },
        { id: "pr1-2", descripcion: "Certificación bancaria de pagos", tipo: "Documental", origen: "Operador", estado: "Decretada", categoriaOrigen: "Anexada", documento: "Cert_Bancaria_Q1.pdf" },
        { id: "pr1-3", descripcion: "Testimonio contador público", tipo: "Testimonial", origen: "Operador", estado: "Decretada", categoriaOrigen: "Solicitada", documento: null }
      ],
      apoderado: "Dr. Carlos Ramírez Soto",
      actoPruebas: "ACT-PRU-2025-001",
      fechaActoPruebas: "10/Abr/2025",
      radicadoPruebas: "RAD-PRU-2025-080",
      fechaComunicacionPruebas: "12/Abr/2025",
      fechaEfectivaComunicacionPruebas: "12/Abr/2025",
      estadoComunicacionPruebas: "Comunicado",
      medioEntregaPruebas: "Comunicación electrónica",
      direccionComunicacionPruebas: "notificaciones@operadorandino.com",
      documentosPruebas: { archivos: [{ nombre: "Oficio_Comunicacion.pdf", tamano: "1.2 MB", tipo: "pdf" }] },
      fechaPresentacion: "25/Mar/2025",
      resumenDescargos: "El operador manifiesta que los aportes del trimestre 1 de 2024 fueron reportados a través del sistema PILA en los plazos establecidos. Adjunta planillas de pago y certificaciones bancarias como soporte de los pagos realizados. Argumenta que existe un error en el cruce de información con el sistema SER.",
      fechaCorte: "31/Mar/2025",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 1 2024",
            cargos: [
              { cargo: "No reportar información de aportes", estadoPago: "No Pagado (NPA)" }
            ]
          },
          {
            trimestre: "Trimestre 2 2024",
            cargos: [
              { cargo: "No reportar información de aportes", estadoPago: "Extemporáneo" }
            ]
          },
          {
            trimestre: "Trimestre 3 2024",
            cargos: [
              { cargo: "No reportar información de aportes", estadoPago: "Pagado" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2025-03-20.pdf", tamano: "4.2 MB", tipo: "pdf" }, { nombre: "Resolucion_notificacion.pdf", tamano: "1.8 MB", tipo: "pdf" }] }
    },
    {
      id: "2",
      operador: "Telecom Norte SA",
      nit: "901234567-8",
      expediente: "EXP-2025-102",
      codigoServicio: "412.10.22",
      servicio: "Telefonía fija",
      regimen: "Licencia",
      bdi: "9055-2025",
      estadoRUES: "Liquidada",
      pliego: "SPL-2025-04-22",
      acto: "ACT-2025-04-25",
      anio: "2025",
      mes: "Abril",
      dia: "25",
      cargosFormulados: ["Reportar información de aportes extemporáneamente"],
      tipoComunicacion: "Notificación por medios electrónicos",
      medioEntrega: "Correo electrónico",
      direccionNotificacion: "notificaciones@telecomnorte.com.co",
      fechaEntrega: "25/Abr/2025",
      fechaComunicacion: "26/Abr/2025",
      estadoComunicacion: "Notificado",
      descargos: "Sin descargos",
      presentoDescargos: "No",
      fechaLimite: "08/May/2025",
      estadoTermino: "Vencido",
      fechaRadicacion: "N/A",
      pruebasAnexadas: 0,
      pruebasSolicitadas: 0,
      tipoPrueba: "N/A",
      origenPrueba: "N/A",
      estadoPrueba: "N/A",
      pruebas: [],
      apoderado: null,
      fechaPresentacion: "N/A",
      resumenDescargos: "Sin descargos presentados",
      fechaCorte: "30/Abr/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 1 2024",
            cargos: [
              { cargo: "Reportar información de aportes extemporáneamente", estadoPago: "Extemporáneo" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2025-04-25.pdf", tamano: "2.9 MB", tipo: "pdf" }, { nombre: "Certificado_liquidacion.pdf", tamano: "1.1 MB", tipo: "pdf" }] }
    },
    {
      id: "3",
      operador: "Servicios Digitales del Caribe SAS",
      nit: "800345678-1",
      expediente: "EXP-2025-103",
      codigoServicio: "412.10.23",
      servicio: "Internet fijo",
      regimen: "Registro",
      bdi: "9056-2025",
      estadoRUES: "Activa",
      pliego: "SPL-2025-06-10",
      acto: "ACT-2025-06-12",
      anio: "2025",
      mes: "Junio",
      dia: "12",
      cargosFormulados: ["Reportar información de aportes con inconsistencias", "No presentar información de afiliados"],
      tipoComunicacion: "Notificación por aviso",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Carrera 15 #93-75, Piso 3, Barranquilla, Atlántico",
      fechaEntrega: "12/Jun/2025",
      fechaComunicacion: "12/Jun/2025",
      estadoComunicacion: "Pendiente",
      descargos: "Presentado",
      presentoDescargos: "Sí",
      fechaLimite: "15/Jun/2025",
      estadoTermino: "Extemporáneo",
      fechaRadicacion: "18/Jun/2025",
      pruebasAnexadas: 3,
      pruebasSolicitadas: 2,
      tipoPrueba: "Documental",
      origenPrueba: "Operador",
      estadoPrueba: "Valorada",
      pruebas: [
        { id: "pr3-1", descripcion: "Extractos bancarios Q1-Q4 2024", tipo: "Documental", origen: "Operador", estado: "Valorada", categoriaOrigen: "Anexada", documento: "Extractos_2024.pdf" },
        { id: "pr3-2", descripcion: "Comunicaciones con PILA", tipo: "Documental", origen: "Operador", estado: "Valorada", categoriaOrigen: "Anexada", documento: "Comunicaciones_PILA.pdf" },
        { id: "pr3-3", descripcion: "Declaraciones de renta 2024", tipo: "Documental", origen: "Operador", estado: "Valorada", categoriaOrigen: "Anexada", documento: "Declaraciones_renta.pdf" },
        { id: "pr3-4", descripcion: "Oficio a PILA para verificación", tipo: "Pericial", origen: "Entidad", estado: "Decretada", categoriaOrigen: "Solicitada", documento: null },
        { id: "pr3-5", descripcion: "Inspección técnica sistemas de reporte", tipo: "Inspección judicial", origen: "De oficio", estado: "Decretada", categoriaOrigen: "Solicitada", documento: null }
      ],
      apoderado: "Dra. María Fernanda López",
      actoPruebas: "ACT-PRU-2025-003",
      fechaActoPruebas: "20/Abr/2025",
      radicadoPruebas: "RAD-PRU-2025-090",
      fechaComunicacionPruebas: "22/Abr/2025",
      fechaEfectivaComunicacionPruebas: "N/A",
      estadoComunicacionPruebas: "Devuelto",
      medioEntregaPruebas: "Comunicación física",
      direccionComunicacionPruebas: "Calle 100 # 15-20, Bogotá",
      documentosPruebas: { archivos: [{ nombre: "Guia_Devolucion.pdf", tamano: "2.1 MB", tipo: "pdf" }] },
      fechaPresentacion: "18/Jun/2025",
      resumenDescargos: "El operador argumenta que las inconsistencias reportadas en los trimestres 1, 2 y 3 de 2024 se debieron a problemas técnicos con el sistema PILA que impidieron la correcta transmisión de los datos. Presenta extractos bancarios demostrando que los pagos se realizaron en las fechas correctas. Para el trimestre 4, indica que cesó actividades con ese operador específico. Solicita revisión detallada de cada periodo.",
      fechaCorte: "30/Jun/2025",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 1 2024",
            cargos: [
              { cargo: "Reportar información de aportes con inconsistencias", estadoPago: "Extemporáneo" },
              { cargo: "No presentar información de afiliados", estadoPago: "No Pagado (NPA)" }
            ]
          },
          {
            trimestre: "Trimestre 2 2024",
            cargos: [
              { cargo: "Reportar información de aportes con inconsistencias", estadoPago: "Pagado" },
              { cargo: "No presentar información de afiliados", estadoPago: "Pagado" }
            ]
          },
          {
            trimestre: "Trimestre 3 2024",
            cargos: [
              { cargo: "Reportar información de aportes con inconsistencias", estadoPago: "No Pagado (NPA)" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2025-06-12.pdf", tamano: "5.1 MB", tipo: "pdf" }, { nombre: "Hallazgo_SER_compuesto.pdf", tamano: "3.5 MB", tipo: "pdf" }] }
    },
    {
      id: "4",
      operador: "Redes Metropolitanas SA",
      nit: "830456789-2",
      expediente: "EXP-2025-104",
      codigoServicio: "412.10.24",
      servicio: "Datos empresariales",
      regimen: "Licencia",
      bdi: "9057-2025",
      estadoRUES: "Cancelada",
      pliego: "SPL-2025-07-20",
      acto: "ACT-2025-07-22",
      anio: "2025",
      mes: "Julio",
      dia: "22",
      cargosFormulados: ["No reportar información de aportes"],
      tipoComunicacion: "Citación para notificación personal",
      medioEntrega: "Dirección física",
      direccionNotificacion: "Avenida El Dorado #68D-35, Edificio B, Bogotá D.C.",
      fechaEntrega: "22/Jul/2025",
      fechaComunicacion: "22/Jul/2025",
      estadoComunicacion: "Notificado",
      descargos: "Presentado",
      presentoDescargos: "Sí",
      fechaLimite: "28/Jul/2025",
      estadoTermino: "A tiempo",
      fechaRadicacion: "25/Jul/2025",
      pruebasAnexadas: 1,
      pruebasSolicitadas: 1,
      tipoPrueba: "Documental",
      origenPrueba: "Operador",
      estadoPrueba: "Rechazada",
      pruebas: [
        { id: "pr4-1", descripcion: "Certificado de cancelación en RUES", tipo: "Documental", origen: "Operador", estado: "Decretada", categoriaOrigen: "Anexada", documento: "Cert_cancelacion_RUES.pdf" },
        { id: "pr4-2", descripcion: "Verificación estado jurídico actual", tipo: "Pericial", origen: "De oficio", estado: "Rechazada", categoriaOrigen: "Solicitada", documento: null }
      ],
      apoderado: "Dr. Luis Alberto Medina",
      actoPruebas: "ACT-PRU-2025-004",
      fechaActoPruebas: "25/Abr/2025",
      radicadoPruebas: "RAD-PRU-2025-095",
      fechaComunicacionPruebas: "26/Abr/2025",
      fechaEfectivaComunicacionPruebas: "26/Abr/2025",
      estadoComunicacionPruebas: "Comunicado",
      medioEntregaPruebas: "Comunicación electrónica",
      direccionComunicacionPruebas: "legal@redesterritoriales.com.co",
      documentosPruebas: { archivos: [{ nombre: "Oficio_Comunicacion.pdf", tamano: "1.1 MB", tipo: "pdf" }] },
      fechaPresentacion: "25/Jul/2025",
      resumenDescargos: "El operador argumenta que se encuentra cancelado en el RUES desde hace 6 meses, por lo que no tenía obligación de reportar información durante el periodo investigado.",
      fechaCorte: "31/Jul/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 1 2024",
            cargos: [
              { cargo: "No reportar información de aportes", estadoPago: "No Pagado (NPA)" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2025-07-22.pdf", tamano: "3.2 MB", tipo: "pdf" }, { nombre: "Certificado_cancelacion_RUES.pdf", tamano: "1.5 MB", tipo: "pdf" }, { nombre: "Constancia_envio_correo.pdf", tamano: "780 KB", tipo: "pdf" }] }
    },
    {
      id: "5",
      operador: "Conexión Total SAS",
      nit: "900567890-3",
      expediente: "EXP-2025-105",
      codigoServicio: "412.10.25",
      servicio: "Telefonía móvil",
      regimen: "Concesión",
      bdi: "9058-2025",
      estadoRUES: "Activa",
      pliego: "SPL-2026-01-08",
      acto: "ACT-2026-01-10",
      anio: "2026",
      mes: "Enero",
      dia: "10",
      cargosFormulados: ["No reportar información de afiliados"],
      tipoComunicacion: "Notificación personal",
      medioEntrega: "Correo electrónico",
      direccionNotificacion: "juridica@conexiontotal.com.co",
      fechaEntrega: "10/Ene/2026",
      fechaComunicacion: "11/Ene/2026",
      estadoComunicacion: "Notificado",
      descargos: "Sin descargos",
      presentoDescargos: "No",
      fechaLimite: "25/Ene/2026",
      estadoTermino: "Vencido",
      fechaRadicacion: "N/A",
      pruebasAnexadas: 0,
      pruebasSolicitadas: 1,
      tipoPrueba: "Pericial",
      origenPrueba: "De oficio",
      estadoPrueba: "Decretada",
      pruebas: [
        { id: "pr5-1", descripcion: "Inspección técnica de sistemas de afiliación", tipo: "Inspección judicial", origen: "De oficio", estado: "Decretada", categoriaOrigen: "Solicitada", documento: null }
      ],
      apoderado: null,
      fechaPresentacion: "N/A",
      resumenDescargos: "Sin descargos presentados",
      fechaCorte: "31/Ene/2026",
      cumplimiento: "No cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 1 2025",
            cargos: [
              { cargo: "No reportar información de afiliados", estadoPago: "No Pagado (NPA)" }
            ]
          },
          {
            trimestre: "Trimestre 2 2025",
            cargos: [
              { cargo: "No reportar información de afiliados", estadoPago: "No Pagado (NPA)" }
            ]
          },
          {
            trimestre: "Trimestre 3 2025",
            cargos: [
              { cargo: "No reportar información de afiliados", estadoPago: "No Pagado (NPA)" }
            ]
          },
          {
            trimestre: "Trimestre 4 2025",
            cargos: [
              { cargo: "No reportar información de afiliados", estadoPago: "Pagado" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2026-01-10.pdf", tamano: "6.8 MB", tipo: "pdf" }, { nombre: "Hallazgos_SER_consolidado.pdf", tamano: "4.1 MB", tipo: "pdf" }, { nombre: "Anexo_fotografico.pdf", tamano: "2.9 MB", tipo: "pdf" }] }
    },
    {
      id: "6",
      operador: "Comunicaciones del Centro SAS",
      nit: "901678901-4",
      expediente: "EXP-2026-106",
      codigoServicio: "412.10.26",
      servicio: "Servicios postales",
      regimen: "Registro",
      bdi: "1012-2026",
      estadoRUES: "En liquidación",
      pliego: "SPL-2026-02-12",
      acto: "ACT-2026-02-15",
      anio: "2026",
      mes: "Febrero",
      dia: "15",
      cargosFormulados: ["Reportar información de afiliados extemporáneamente"],
      tipoComunicacion: "Notificación por aviso electrónico",
      medioEntrega: "Correo electrónico",
      direccionNotificacion: "procesos@comunicacionescentro.com.co",
      fechaEntrega: "15/Feb/2026",
      fechaComunicacion: "15/Feb/2026",
      estadoComunicacion: "Devuelto",
      descargos: "Presentado",
      presentoDescargos: "Sí",
      fechaLimite: "28/Feb/2026",
      estadoTermino: "A tiempo",
      fechaRadicacion: "20/Feb/2026",
      pruebasAnexadas: 2,
      pruebasSolicitadas: 1,
      tipoPrueba: "Documental",
      origenPrueba: "Operador",
      estadoPrueba: "Desistida",
      pruebas: [
        { id: "pr6-1", descripcion: "Planilla de pago tardía Q4 2025", tipo: "Documental", origen: "Operador", estado: "Aportada", categoriaOrigen: "Anexada", documento: "Planilla_Q4_2025.pdf" },
        { id: "pr6-2", descripcion: "Estado de liquidación voluntaria", tipo: "Documental", origen: "Operador", estado: "Aportada", categoriaOrigen: "Anexada", documento: "Estado_liquidacion.pdf" },
        { id: "pr6-3", descripcion: "Testimonio representante legal", tipo: "Testimonial", origen: "Operador", estado: "Desistida", categoriaOrigen: "Solicitada", documento: null }
      ],
      apoderado: "Dra. Patricia Rojas Vargas",
      fechaPresentacion: "20/Feb/2026",
      resumenDescargos: "El operador reconoce el reporte extemporáneo pero alega que se encuentra en proceso de liquidación voluntaria. Solicita archivo del proceso sancionatorio por cesación de actividades.",
      fechaCorte: "28/Feb/2026",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          {
            trimestre: "Trimestre 4 2025",
            cargos: [
              { cargo: "Reportar información de afiliados extemporáneamente", estadoPago: "Extemporáneo" }
            ]
          }
        ]
      },
      documentos: { archivos: [{ nombre: "Acto_ACT-2026-02-15.pdf", tamano: "2.3 MB", tipo: "pdf" }, { nombre: "Notificacion_devolucion.pdf", tamano: "1.1 MB", tipo: "pdf" }, { nombre: "Estado_liquidacion.pdf", tamano: "1.6 MB", tipo: "pdf" }] }
    },
  ],
};

// suppress unused import warning
void cn;
