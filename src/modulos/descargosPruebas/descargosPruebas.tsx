import React from "react";
import { FileSearch, Search, Download, FileText, Brain, CheckCircle2, XCircle, XOctagon, Clock, HelpCircle, User, Folder, Database, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { ModuleConfig, bodyXs, StatusBadge } from "../../app/shared";

export const descargosPruebas: ModuleConfig = {
  id: "descargos-pruebas",
  title: "Verificación de descargos y solicitud de pruebas",
  shortTitle: "Descargos y Solicitud de Pruebas",
  epicLabel: "Epica 02",
  description: "Consulta, validación y trazabilidad del ejercicio del derecho de defensa: identificación del operador y expediente, cálculo automático del término de descargos a partir de la notificación, calidad de quien presenta, resumen argumentativo estructurado, actividad probatoria (pruebas anexadas, solicitadas, tipo, origen y estado) y documentos soporte.",
  excelFields: ["Pliego", "Año"],
  navIcon: <FileSearch className="w-4 h-4" />,
  processingSteps: [
    { label: "Buscando radicados en Integratic", icon: <Search className="w-4 h-4" /> },
    { label: "Recuperando PDFs de radicados", icon: <Download className="w-4 h-4" /> },
    { label: "Almacenando en Cloud Storage", icon: <FileText className="w-4 h-4" /> },
    { label: "Interpretando descargos con IA", icon: <Brain className="w-4 h-4" /> },
  ],
  columnTabs: [

    {
      id: "notificacion",
      label: "Notificación del pliego",
      columns: ["operador", "bdi", "anio", "pliego", "fechaEfectivaNotificacion", "documentos"]
    },
    {
      id: "descargos-pruebas",
      label: "Descargos y solicitud de pruebas",
      columns: ["operador", "bdi", "fechaLimite", "descargos", "fechaPresentacion", "fechaRadicacion", "estadoTermino", "pruebasAsociadas"]
    },

    {
      id: "cumplimiento",
      label: "Verificación de Cumplimiento",
      icon: <Database className="w-4 h-4" />,
      columns: ["operador", "bdi", "fechaCorte", "pliego", "cumplimiento", "hallazgosSER", "documentos"]
    }
  ],
  resultColumns: [
    {
      key: "operador",
      header: "Razón social",
      headerTooltip: "Nombre o razón social",
      filterable: false,
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "bdi",
      header: "BDI",
      headerTooltip: "Número de BDI completo",
      filterable: false,
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "fechaCorte",
      header: "Fecha de corte",
      headerTooltip: "Fecha en la que el usuario realiza la consulta",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "--"}</span>
    },
    {
      key: "pliego",
      header: "Número de Acto Administrativo",
      headerTooltip: "Identificación del acto administrativo mediante el cual se formula el pliego de cargos.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "cumplimiento",
      header: "Cumplimiento",
      headerTooltip: "Resultado de la verificación",
      filterable: true,
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
        if (!val || !val.trimestres) return <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>Sin hallazgos</span>;
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
      key: "anio",
      header: "Año / Vigencia BDI",
      headerTooltip: "Dato de identificación del proceso correspondiente al año de vigencia.",
      filterable: true,
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val}</span>
    },
    {
      key: "fechaEfectivaNotificacion",
      header: "Fecha efectiva de notificación",
      headerTooltip: "Fecha en la cual jurídicamente se entiende surtida la notificación conforme a las reglas previstas en el CPACA. A partir de esta fecha corre el término legal para presentar descargos.",
      filterable: true
    },
    {
      key: "fechaLimite",
      header: "Fecha límite de presentación de descargos",
      headerTooltip: "Fecha calculada automáticamente a partir de la fecha efectiva de notificación y las reglas de negocio del término de descargos. No se diligencia manualmente; el sistema la obtiene consultando internamente el módulo de notificaciones para garantizar consistencia procesal.",
      filterable: true,
      render: (val: string) => (
        <div className="flex items-center gap-1.5">
          <span className="text-foreground" style={bodyXs}>{val}</span>
        </div>
      )
    },
    {
      key: "descargos",
      header: "¿Presentó descargos?",
      headerTooltip: "Indica si el operador ejerció su derecho de defensa presentando descargos dentro del proceso sancionatorio.",
      filterable: true,
      render: (val: string) => {
        const isSi = val.toLowerCase() === "sí" || val.toLowerCase() === "si";
        return <StatusBadge label={val} variant={isSi ? "success" : "neutral"} icon={isSi ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} />;
      }
    },
    {
      key: "estadoTermino",
      header: "Estado del término",
      headerTooltip: "Validación sobre si los descargos fueron presentados dentro o fuera del término legal correspondiente conforme a las reglas aplicables del procedimiento administrativo.",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" | "info"; icon: React.ReactNode }> = {
          "Dentro del término": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Fuera del término": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "No presentó": { variant: "neutral", icon: <XCircle className="w-3.5 h-3.5" /> },
          "Pendiente de validación": { variant: "info", icon: <Clock className="w-3.5 h-3.5" /> },
          "Requiere revisión": { variant: "warning", icon: <HelpCircle className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente de validación"];
        return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "radicado",
      header: "Radicado de descargos",
      headerTooltip: "Número de radicado asignado al descargo presentado. Se visualiza conjuntamente con la fecha de presentación y fecha de radicación, manteniendo la relación cronológica de la actuación procesal."
    },
    {
      key: "fechaPresentacion",
      header: "Fecha de presentación de descargos",
      headerTooltip: "Fecha en la cual el operador presentó los descargos ante la Entidad. Se compara con la fecha límite calculada para validar el término.",
      filterable: true
    },
    {
      key: "fechaRadicacion",
      header: "Fecha de radicación",
      headerTooltip: "Fecha oficial de radicación del descargo en el sistema INTEGRATIC. Puede diferir de la fecha de presentación física por los tiempos internos del sistema.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const dias = row.fechaRadicacionDias;
        return (
          <div className="flex items-center gap-2">
            <span>{val}</span>
            {dias < 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                {dias} días
              </Badge>
            )}
          </div>
        );
      }
    },
    {
      key: "pruebasAnexadas",
      header: "Pruebas anexadas",
      headerTooltip: "Documentos o elementos probatorios aportados por el operador conjuntamente con sus descargos como parte del ejercicio del derecho de defensa.",
      render: (val: number) => (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-chart-2/10 text-chart-2 rounded-md" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
          <FileText className="w-3.5 h-3.5" />
          {val ?? 0}
        </span>
      )
    },
    {
      key: "pruebasSolicitadas",
      header: "Pruebas solicitadas",
      headerTooltip: "Pruebas que el operador solicita que sean decretadas o practicadas por la Entidad dentro del proceso sancionatorio.",
      render: (val: number) => (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-chart-4/10 text-chart-4 rounded-md" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
          <Search className="w-3.5 h-3.5" />
          {val ?? 0}
        </span>
      )
    },
    {
      key: "pruebasAsociadas",
      header: "Pruebas asociadas",
      headerTooltip: "Vista expandible con el detalle de cada prueba: nombre, tipo, descripción y documento soporte.",
      expandable: true
    },
    {
      key: "documentos",
      header: "Documentos asociados",
      headerTooltip: "Conjunto documental relacionado con los descargos y la actividad probatoria, incluyendo radicados, constancias, anexos y demás soportes asociados.",
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
      pliego: "SPL-2025-03-18",
      anio: "2025",
      fechaEfectivaNotificacion: "18/Mar/2025",
      estadoTermino: "Dentro del término",
      calidadPresenta: "Apoderado",
      representanteLegal: "Carlos Andrés Pérez Gómez",
      categoriasDefensa: ["Fuerza mayor", "Solicitudes probatorias", "Argumentos técnicos"],
      pruebasAnexadas: 3,
      pruebasSolicitadas: 1,
      origenPrueba: "Operador",
      estadoPrueba: "Aportada",
      radicado: "RAD-2025-4501",
      apoderado: "María González",
      fechaPresentacion: "18/Mar/2025",
      fechaLimite: "20/Mar/2025",
      fechaRadicacion: "16/Mar/2025",
      fechaRadicacionDias: -2,
      dentroTerminos: "A tiempo",
      tipoPrueba: "Documental",
      pruebasAsociadas: 4,
      descargos: "Sí",
      resumenDescargo: "Cumplimiento parcial por fuerza mayor documentada",
      resumenCompletoDescargo: "El operador presenta descargos argumentando cumplimiento parcial de obligaciones de contraprestación debido a fuerza mayor documentada. Se adjuntan certificaciones emitidas por autoridad competente, estados financieros auditados del año 2024, y comprobantes de pagos como soporte. Se solicita adicionalmente testimonio del contador público certificado sobre la situación financiera de la empresa durante el periodo en cuestión.",
      pruebas: [
        { id: "p1-1", nombre: "Certificación de fuerza mayor", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Certificación emitida por autoridad competente sobre situación de fuerza mayor", documento: { nombre: "Certificacion_fuerza_mayor.pdf", tamano: "1.8 MB", tipo: "pdf" } },
        { id: "p1-2", nombre: "Estados financieros 2024", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Estados financieros auditados del año 2024", documento: { nombre: "Estados_financieros_2024.pdf", tamano: "2.5 MB", tipo: "pdf" } },
        { id: "p1-3", nombre: "Testimonio contador público", tipo: "solicitada", tipoPrueba: "Testimonial", descripcion: "Se solicita testimonio del contador público certificado sobre la situación financiera", documento: null },
        { id: "p1-4", nombre: "Prueba contable de pagos", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Comprobantes de pagos y movimientos contables", documento: { nombre: "Prueba_1_Contabilidad.pdf", tamano: "1.2 MB", tipo: "pdf" } }
      ],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: {
        archivos: [
          { nombre: "Descargos_RAD-2025-4501.pdf", tamano: "3.1 MB", tipo: "pdf" },
          { nombre: "Certificacion_fuerza_mayor.pdf", tamano: "1.8 MB", tipo: "pdf" },
          { nombre: "Estados_financieros_2024.pdf", tamano: "2.5 MB", tipo: "pdf" },
          { nombre: "Prueba_1_Contabilidad.pdf", tamano: "1.2 MB", tipo: "pdf" },
        ]
      }
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
      pliego: "SPL-2025-03-20",
      anio: "2025",
      fechaEfectivaNotificacion: "10/Mar/2025",
      estadoTermino: "No presentó",
      calidadPresenta: "N/A",
      representanteLegal: "Diana Carolina Castro Mora",
      categoriasDefensa: [],
      pruebasAnexadas: 0,
      pruebasSolicitadas: 0,
      origenPrueba: "N/A",
      estadoPrueba: "N/A",
      radicado: "RAD-2025-4502",
      apoderado: null,
      fechaPresentacion: "22/Mar/2025",
      fechaLimite: "20/Mar/2025",
      fechaRadicacion: "22/Mar/2025",
      fechaRadicacionDias: 0,
      dentroTerminos: "Extemporáneo",
      tipoPrueba: "N/A",
      pruebasAsociadas: 0,
      descargos: "No",
      resumenDescargo: "No se presentaron descargos",
      resumenCompletoDescargo: "No se presentaron descargos dentro del término legal establecido para el presente proceso sancionatorio.",
      pruebas: [],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: { archivos: [{ nombre: "Notificacion_extemporanea.pdf", tamano: "890 KB", tipo: "pdf" }] }
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
      pliego: "SPL-2025-03-25",
      anio: "2025",
      fechaEfectivaNotificacion: "25/Mar/2025",
      estadoTermino: "Dentro del término",
      calidadPresenta: "Apoderado",
      representanteLegal: "Laura Restrepo Villa",
      categoriasDefensa: ["Errores operativos", "Aceptación parcial de hechos", "Solicitudes probatorias"],
      pruebasAnexadas: 2,
      pruebasSolicitadas: 1,
      origenPrueba: "Operador",
      estadoPrueba: "Decretada",
      radicado: "RAD-2025-4503",
      apoderado: "Juan Pérez",
      fechaPresentacion: "28/Mar/2025",
      fechaLimite: "31/Mar/2025",
      fechaRadicacion: "28/Mar/2025",
      fechaRadicacionDias: 0,
      dentroTerminos: "A tiempo",
      tipoPrueba: "Documental",
      pruebasAsociadas: 3,
      descargos: "Sí",
      resumenDescargo: "Incumplimiento causado por terceros contratistas",
      resumenCompletoDescargo: "El operador responde alegando que el incumplimiento de obligaciones fue causado directamente por terceros contratistas bajo su responsabilidad. Se presenta contrato firmado con empresa contratista como prueba de la relación contractual. Solicita archivo del proceso por subsanación completa de obligaciones pendientes, aportando documentación que acredita dicha subsanación.",
      pruebas: [
        { id: "p3-1", nombre: "Contrato con terceros", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Contrato firmado con empresa contratista responsable", documento: { nombre: "Contrato_terceros.pdf", tamano: "1.5 MB", tipo: "pdf" } },
        { id: "p3-2", nombre: "Evidencia de subsanación", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Documentación que acredita la subsanación de obligaciones", documento: { nombre: "Evidencia_subsanacion.pdf", tamano: "980 KB", tipo: "pdf" } },
        { id: "p3-3", nombre: "Oficio a contratista", tipo: "solicitada", tipoPrueba: "Requerimiento", descripcion: "Se solicita oficiar a la empresa contratista para validar responsabilidad", documento: null }
      ],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: {
        archivos: [
          { nombre: "Descargos_RAD-2025-4503.pdf", tamano: "2.2 MB", tipo: "pdf" },
          { nombre: "Contrato_terceros.pdf", tamano: "1.5 MB", tipo: "pdf" },
          { nombre: "Evidencia_subsanacion.pdf", tamano: "980 KB", tipo: "pdf" },
        ]
      }
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
      pliego: "SPL-2025-04-02",
      anio: "2025",
      fechaEfectivaNotificacion: "26/Mar/2025",
      estadoTermino: "Dentro del término",
      calidadPresenta: "Apoderado",
      representanteLegal: "Andrés Felipe Henao Ríos",
      categoriasDefensa: ["Afectaciones económicas", "Plan de pagos", "Argumentos jurídicos", "Solicitudes probatorias"],
      pruebasAnexadas: 4,
      pruebasSolicitadas: 1,
      origenPrueba: "Operador",
      estadoPrueba: "Valorada",
      radicado: "RAD-2025-4504",
      apoderado: "Ana Torres",
      fechaPresentacion: "05/Abr/2025",
      fechaLimite: "08/Abr/2025",
      fechaRadicacion: "05/Abr/2025",
      fechaRadicacionDias: 0,
      dentroTerminos: "A tiempo",
      tipoPrueba: "Documental",
      pruebasAsociadas: 5,
      descargos: "Sí",
      resumenDescargo: "Documentación financiera y propuesta de plan de pagos",
      resumenCompletoDescargo: "Descargo completo con documentación de soporte financiero y contable. Se evidencia intención clara de cumplimiento y se presenta propuesta formal de plan de pagos para regularización de obligaciones pendientes. Se incluye balance general auditado del ejercicio 2024, flujo de caja proyectado, y certificación de revisor fiscal que respalda la viabilidad financiera del operador.",
      pruebas: [
        { id: "p4-1", nombre: "Balance financiero 2024", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Balance general auditado del ejercicio 2024", documento: { nombre: "Balance_financiero_2024.pdf", tamano: "2.1 MB", tipo: "pdf" } },
        { id: "p4-2", nombre: "Plan de pagos propuesto", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Propuesta detallada de plan de pagos para regularización", documento: { nombre: "Plan_de_pagos_propuesto.pdf", tamano: "1.3 MB", tipo: "pdf" } },
        { id: "p4-3", nombre: "Certificación contador", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Certificación del contador público sobre estados financieros", documento: { nombre: "Certificacion_contador.pdf", tamano: "750 KB", tipo: "pdf" } },
        { id: "p4-4", nombre: "Soporte bancario", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Extractos y certificaciones bancarias de respaldo", documento: { nombre: "Anexo_soporte_bancario.pdf", tamano: "1.9 MB", tipo: "pdf" } },
        { id: "p4-5", nombre: "Informe revisor fiscal", tipo: "solicitada", tipoPrueba: "Requerimiento", descripcion: "Se solicita informe oficial del revisor fiscal de la empresa", documento: null }
      ],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: {
        archivos: [
          { nombre: "Descargos_RAD-2025-4504.pdf", tamano: "3.8 MB", tipo: "pdf" },
          { nombre: "Balance_financiero_2024.pdf", tamano: "2.1 MB", tipo: "pdf" },
          { nombre: "Plan_de_pagos_propuesto.pdf", tamano: "1.3 MB", tipo: "pdf" },
          { nombre: "Certificacion_contador.pdf", tamano: "750 KB", tipo: "pdf" },
          { nombre: "Anexo_soporte_bancario.pdf", tamano: "1.9 MB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "5",
      operador: "Conexion Total SAS",
      nit: "900567890-3",
      expediente: "EXP-2025-105",
      codigoServicio: "412.10.25",
      servicio: "Telefonía móvil",
      regimen: "Concesión",
      bdi: "9058-2025",
      pliego: "SPL-2025-04-10",
      anio: "2025",
      fechaEfectivaNotificacion: "01/Abr/2025",
      estadoTermino: "No presentó",
      calidadPresenta: "N/A",
      representanteLegal: "Ricardo Alonso Mejía Salcedo",
      categoriasDefensa: [],
      pruebasAnexadas: 0,
      pruebasSolicitadas: 0,
      origenPrueba: "N/A",
      estadoPrueba: "N/A",
      radicado: "RAD-2025-4505",
      apoderado: null,
      fechaPresentacion: "15/Abr/2025",
      fechaLimite: "11/Abr/2025",
      fechaRadicacion: "15/Abr/2025",
      fechaRadicacionDias: 0,
      dentroTerminos: "Extemporáneo",
      tipoPrueba: "N/A",
      pruebasAsociadas: 0,
      descargos: "No",
      resumenDescargo: "Operador no presentó descargos ni pruebas. Se mantiene silencio administrativo.",
      pruebas: [],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: { archivos: [{ nombre: "Acta_silencio_administrativo.pdf", tamano: "620 KB", tipo: "pdf" }] }
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
      pliego: "SPL-2026-02-15",
      anio: "2026",
      fechaEfectivaNotificacion: "09/Feb/2026",
      estadoTermino: "Dentro del término",
      calidadPresenta: "Apoderado",
      representanteLegal: "Mónica Patricia Vargas León",
      categoriasDefensa: ["Acuerdo verbal", "Prueba testimonial", "Argumentos técnicos"],
      pruebasAnexadas: 2,
      pruebasSolicitadas: 0,
      origenPrueba: "Operador",
      estadoPrueba: "Aportada",
      radicado: "RAD-2026-0201",
      apoderado: "Carlos Ramírez",
      fechaPresentacion: "18/Feb/2026",
      fechaLimite: "19/Feb/2026",
      fechaRadicacion: "17/Feb/2026",
      fechaRadicacionDias: -1,
      dentroTerminos: "A tiempo",
      tipoPrueba: "Testimonial",
      pruebasAsociadas: 2,
      descargos: "Sí",
      resumenDescargo: "Operador alega acuerdo verbal con funcionarios de la entidad para prórroga en cumplimiento de obligaciones. Adjunta acta como prueba testimonial.",
      pruebas: [
        { id: "p6-1", nombre: "Acta de reunión", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Acta de reunión con funcionarios donde se establece prórroga", documento: { nombre: "Acta_reunion.pdf", tamano: "1.4 MB", tipo: "pdf" } },
        { id: "p6-2", nombre: "Declaración de testigos", tipo: "anexada", tipoPrueba: "Testimonial", descripcion: "Declaraciones testimoniales de participantes en la reunión", documento: { nombre: "Declaracion_testigos.pdf", tamano: "1.1 MB", tipo: "pdf" } }
      ],
      fechaCorte: "31/Mar/2025",
      cumplimiento: "Cumplió",
      hallazgosSER: {
        trimestres: [
          { trimestre: "Trimestre 1 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }, { cargo: "Reporte SIUST", estadoPago: "Pagado" }] },
          { trimestre: "Trimestre 2 2024", cargos: [{ cargo: "Pago contraprestaciones", estadoPago: "Pagado" }] }
        ]
      },
      documentos: {
        archivos: [
          { nombre: "Descargos_RAD-2026-0201.pdf", tamano: "2.7 MB", tipo: "pdf" },
          { nombre: "Acta_reunion.pdf", tamano: "1.4 MB", tipo: "pdf" },
          { nombre: "Declaracion_testigos.pdf", tamano: "1.1 MB", tipo: "pdf" },
        ]
      }
    },
  ],
};
