import React from "react";
import { Gavel, Search, Download, FileText, Database, Building2, Brain, CheckCircle2, XOctagon, Clock, Mail, User, Paperclip, Plus, FileCheck, Ban, UserX, Eye, Folder } from "lucide-react";
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
      id: "identificacion",
      label: "Información de Identificación",
      columns: ["operador", "bdi"]
    },
    {
      id: "notificacion",
      label: "Notificación",
      columns: ["pliego", "fechaActoAdministrativo", "tipoComunicacion", "medioEntrega", "direccionNotificacion", "fechaEntrega", "fechaComunicacion", "estadoComunicacion"]
    },
    {
      id: "pruebas",
      label: "Pruebas y Descargos",
      columns: ["estadoRUES", "cargosFormulados", "descargos", "pruebasAnexadas", "pruebasSolicitadas", "tipoPrueba", "origenPrueba", "estadoPrueba", "pruebasAsociadas", "apoderado", "fechaPresentacion", "resumenDescargos"]
    },
    {
      id: "hallazgos",
      label: "Hallazgos y Documentos",
      columns: ["hallazgosSER", "documentos"]
    }
  ],
  resultColumns: [
    {
      key: "operador",
      header: "Operador",
      headerTooltip: "Corresponde al nombre o razón social del operador objeto de la actuación administrativa.",
      filterable: false,
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "bdi",
      header: "BDI",
      headerTooltip: "Número de BDI completo incluyendo consecutivo y año (ejemplo: 9054-2025), permitiendo adicionalmente filtros independientes tanto por número como por vigencia.",
      filterable: false
    },
    { key: "estadoRUES", header: "Estado RUES", headerTooltip: "Estado jurídico del operador en el RUES al momento de verificar los actos de prueba. Activa: el operador existe jurídicamente y debe atender el proceso. Liquidada/Cancelada/En liquidación: su estado puede afectar la viabilidad del proceso sancionatorio.", filterable: true, render: (val: string) => {
      const config: Record<string, { variant: "success" | "destructive"; icon: React.ReactNode }> = {
        "Activa": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        "Liquidada": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        "Cancelada": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        "En liquidación": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
      };
      const cfg = config[val] || config["Activa"];
      return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
    }},
    { key: "pliego", header: "Número del acto administrativo / pliego", headerTooltip: "Identificación del acto administrativo mediante el cual se formula el pliego de cargos." },
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
      key: "cargosFormulados",
      header: "Cargos formulados",
      headerTooltip: "Cargos o infracciones que originaron el proceso sancionatorio (provienen del pliego de cargos, MÓDULO 1). Los actos de prueba se concentran en verificar o refutar los elementos fácticos de cada cargo. Haga clic para ver el detalle completo de validación por cargo, periodo y hallazgo del SER.",
      filterable: true,
      clickable: true,
      render: (val: string[] | undefined, row: Record<string, any>) => {
        if (!val || val.length === 0) return <span className="text-muted-foreground" style={bodyXs}>Sin cargos</span>;
        const cargosArray = Array.isArray(val) ? val : [val];
        return (
          <div className="flex flex-wrap gap-1.5 max-w-[280px]">
            {cargosArray.slice(0, 2).map((cargo: string, idx: number) => (
              <Badge
                key={idx}
                className="bg-primary/10 text-primary border-none px-2 py-1 cursor-pointer hover:bg-primary/20 transition-colors"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                {cargo}
              </Badge>
            ))}
            {cargosArray.length > 2 && (
              <Badge
                className="bg-muted/60 text-foreground border-none px-2 py-1 cursor-pointer hover:bg-muted/80 transition-colors"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                +{cargosArray.length - 2}
              </Badge>
            )}
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
      key: "fechaComunicacion",
      header: "Fecha efectiva de notificación",
      headerTooltip: "Fecha en la cual jurídicamente se entiende surtida la notificación conforme a las reglas previstas en el CPACA.",
      render: (val: string, row: Record<string, any>) => {
        const isDiferida = row.fechaEntrega !== val;
        return (
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={bodyXs}>{val}</span>
            {isDiferida && (
              <Badge
                className="border-none px-2 py-0.5"
                style={{
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-medium)"
                }}
              >
                Diferida
              </Badge>
            )}
          </div>
        );
      }
    },
    { key: "estadoComunicacion", header: "Estado de la notificación", headerTooltip: "Resultado o estado procesal asociado a la actuación de notificación (notificado, devuelto, pendiente, entre otros).", filterable: true, render: (val: string) => {
      const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive"; icon: React.ReactNode }> = {
        "Notificado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
      };
      const cfg = config[val] || config["Pendiente"];
      return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
    }},
    { key: "descargos", header: "Descargos", headerTooltip: "Indica si el operador presentó descargos en MÓDULO 2. Esta información cruza con el acto de prueba para verificar si el acto responde a la solicitud de pruebas del operador o si la entidad las decretó de oficio.", render: (val: string) => {
      return <span className="text-foreground" style={bodyXs}>{val || "Sin descargos"}</span>;
    }},
    {
      key: "pruebasAnexadas",
      header: "Pruebas anexadas",
      headerTooltip: "Número de pruebas presentadas directamente por el operador en sus descargos (MÓDULO 2), adjuntas como soporte documental de su defensa.",
      filterable: true,
      render: (val: number) => (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-chart-2/10 text-chart-2 rounded-md" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
          <Paperclip className="w-3.5 h-3.5" />
          {val || 0}
        </span>
      )
    },
    {
      key: "pruebasSolicitadas",
      header: "Pruebas solicitadas",
      headerTooltip: "Número de pruebas solicitadas por el operador en sus descargos (MÓDULO 2) que requieren decreto, práctica o recolección posterior por parte de la entidad (testimoniales, periciales, oficios a terceros).",
      filterable: true,
      render: (val: number) => (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-chart-4/10 text-chart-4 rounded-md" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
          <Plus className="w-3.5 h-3.5" />
          {val || 0}
        </span>
      )
    },
    {
      key: "tipoPrueba",
      header: "Tipo de prueba",
      headerTooltip: "Clasificación de las pruebas según su naturaleza procesal: Documental (contratos, certificaciones, extractos), Testimonial (declaraciones de testigos), Pericial (dictámenes técnicos), Inspección judicial, u otras categorías procesales.",
      filterable: true,
      render: (val: string) => {
        if (!val || val === "N/A") return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <span className="text-foreground" style={bodyXs}>{val}</span>;
      }
    },
    {
      key: "origenPrueba",
      header: "Origen de la prueba",
      headerTooltip: "Identifica quién aportó o solicitó la prueba: Operador (pruebas presentadas en los descargos), Entidad (pruebas decretadas de oficio), o De oficio (pruebas que la autoridad ordena por iniciativa propia para mejor proveer).",
      filterable: true,
      render: (val: string) => {
        const variants: Record<string, "info" | "success" | "warning"> = {
          "Operador": "info",
          "Entidad": "warning",
          "De oficio": "warning",
        };
        return <StatusBadge label={val || "N/A"} variant={variants[val] || "info"} />;
      }
    },
    {
      key: "estadoPrueba",
      header: "Estado de la prueba",
      headerTooltip: "Estado procesal de tramitación de las pruebas: Decretada (admitida y ordenada su práctica), Rechazada (inadmitida por improcedente o impertinente), Desistida (el operador renunció a ella), Valorada (ya fue analizada en la decisión de fondo).",
      filterable: true,
      render: (val: string) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive"; icon: React.ReactNode }> = {
          "Decretada": { variant: "success", icon: <FileCheck className="w-3.5 h-3.5" /> },
          "Rechazada": { variant: "destructive", icon: <Ban className="w-3.5 h-3.5" /> },
          "Desistida": { variant: "neutral", icon: <UserX className="w-3.5 h-3.5" /> },
          "Valorada": { variant: "info", icon: <Eye className="w-3.5 h-3.5" /> },
          "Aportada": { variant: "success", icon: <FileCheck className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Decretada"];
        if (!val || val === "N/A") return <span className="text-muted-foreground" style={bodyXs}>—</span>;
        return <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;
      }
    },
    {
      key: "pruebasAsociadas",
      header: "Pruebas presentadas",
      headerTooltip: "Número y detalle de las pruebas presentadas por el operador en MÓDULO 2 y/o decretadas de oficio por la entidad. Haga clic para ver el listado completo con tipo, descripción, origen, estado y trámite de cada prueba.",
      clickable: true,
      render: (val: any, row: Record<string, any>) => {
        if (!row.pruebas || row.pruebas.length === 0) return <span className="text-muted-foreground" style={bodyXs}>Sin pruebas</span>;
        return (
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Paperclip className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary underline underline-offset-2 font-medium" style={bodyXs}>
              {row.pruebas.length} prueba{row.pruebas.length !== 1 ? "s" : ""}
            </span>
          </div>
        );
      }
    },
    { key: "apoderado", header: "Apoderado", headerTooltip: "Nombre del representante legal o apoderado que actúa en nombre del operador durante la etapa de actos de prueba. Proviene del registro de descargos del MÓDULO 2. Si no aparece, el operador actúa directamente o sin representación.", render: (val: string) => {
      return (
        <div className="flex items-center gap-2 text-foreground" style={bodyXs}>
          {val ? (
            <>
              <User className="w-3.5 h-3.5" />
              {val}
            </>
          ) : (
            <span className="text-muted-foreground">Sin apoderado</span>
          )}
        </div>
      );
    }},
    { key: "fechaPresentacion", header: "Fecha presentación", headerTooltip: "Fecha en la que el operador presentó los descargos o la solicitud de pruebas en MÓDULO 2. Sirve como referencia para verificar que el acto de prueba fue expedido dentro del término legal posterior a la presentación de la defensa." },
    {
      key: "resumenDescargos",
      header: "Resumen de descargos",
      headerTooltip: "Extracto del escrito de descargos presentado por el operador en MÓDULO 2. Permite al verificador entender los argumentos de defensa y valorar la pertinencia de las pruebas decretadas en este módulo.",
      truncate: true,
      render: (val: string, _row: Record<string, any>) => {
        if (!val || val === "Sin descargos presentados") return <span className="text-muted-foreground" style={bodyXs}>Sin resumen</span>;
        const maxLength = 120;
        const needsTruncate = val.length > maxLength;
        return needsTruncate ? val.substring(0, maxLength) + "..." : val;
      }
    },
    {
      key: "hallazgosSER",
      header: "Hallazgos SER",
      headerTooltip: "Análisis técnico del Sistema de Evaluación de Resultados (SER) sobre los cargos formulados al operador. Haga clic para ver el detalle por cargo y período: incidencia de las pruebas sobre los hallazgos, indicadores incumplidos y evidencia documental que soporta el decreto de pruebas.",
      clickable: true,
      render: (val: any) => {
        if (!val || !val.cargos) return <span style={bodyXs}>Sin hallazgos</span>;
        const totalCargos = val.cargos.length;
        const totalPeriodos = val.cargos.reduce((sum: number, cargo: any) => sum + (cargo.periodos?.length || 0), 0);
        return (
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary" style={bodyXs}>
              {totalCargos} cargo{totalCargos !== 1 ? "s" : ""}, {totalPeriodos} periodo{totalPeriodos !== 1 ? "s" : ""}
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
      fechaPresentacion: "25/Mar/2025",
      resumenDescargos: "El operador manifiesta que los aportes del trimestre 1 de 2024 fueron reportados a través del sistema PILA en los plazos establecidos. Adjunta planillas de pago y certificaciones bancarias como soporte de los pagos realizados. Argumenta que existe un error en el cruce de información con el sistema SER.",
      hallazgosSER: {
        cargos: [
          {
            nombre: "No reportar información de aportes",
            periodos: [
              { periodo: "Trimestre 1 2024", hallazgo: "No pagó", imagenes: [{ url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", descripcion: "SER_Q1_2024_001.pdf" }, { url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800", descripcion: "SER_Q1_2024_002.pdf" }], resultado: "Sanción" },
              { periodo: "Trimestre 2 2024", hallazgo: "Pagó con sanción", imagenes: [{ url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", descripcion: "SER_Q2_2024_001.pdf" }], resultado: "Archivo" },
              { periodo: "Trimestre 3 2024", hallazgo: "Pagó", imagenes: [{ url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", descripcion: "SER_Q3_2024_001.pdf" }], resultado: "Archivo" }
            ],
            recomendacion: "Sanción",
            razon: "Periodo 1 de 2024 sin cumplimiento"
          }
        ],
        recomendacionFinal: "Sanción",
        razonFinal: "Existe al menos un periodo sin cumplir"
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
      pruebasAnexadas: 0,
      pruebasSolicitadas: 0,
      tipoPrueba: "N/A",
      origenPrueba: "N/A",
      estadoPrueba: "N/A",
      pruebas: [],
      apoderado: null,
      fechaPresentacion: "N/A",
      resumenDescargos: "Sin descargos presentados",
      hallazgosSER: { cargos: [{ nombre: "Reportar información de aportes extemporáneamente", periodos: [], recomendacion: "Archivo", razon: "Empresa liquidada - archivo automático" }], recomendacionFinal: "Archivo", razonFinal: "Estado RUES: Liquidada" },
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
      fechaPresentacion: "18/Jun/2025",
      resumenDescargos: "El operador argumenta que las inconsistencias reportadas en los trimestres 1, 2 y 3 de 2024 se debieron a problemas técnicos con el sistema PILA que impidieron la correcta transmisión de los datos. Presenta extractos bancarios demostrando que los pagos se realizaron en las fechas correctas. Para el trimestre 4, indica que cesó actividades con ese operador específico. Solicita revisión detallada de cada periodo.",
      hallazgosSER: {
        cargos: [
          {
            nombre: "Reportar información de aportes con inconsistencias",
            periodos: [
              { periodo: "Trimestre 1 2024", hallazgo: "Pagó fuera de tiempo", imagenes: [{ url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", descripcion: "SER_inconsistencia_Q1.pdf" }], resultado: "Sanción" },
              { periodo: "Trimestre 2 2024", hallazgo: "Subsanó", imagenes: [{ url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", descripcion: "SER_subsanacion_Q2.pdf" }], resultado: "Archivo" },
              { periodo: "Trimestre 3 2024", hallazgo: "No pagó", imagenes: [{ url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800", descripcion: "SER_no_pago_Q3_001.pdf" }, { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", descripcion: "SER_no_pago_Q3_002.pdf" }], resultado: "Sanción" },
              { periodo: "Trimestre 4 2024", hallazgo: "Cesó", imagenes: [{ url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", descripcion: "SER_ceso_Q4.pdf" }], resultado: "Archivo" }
            ],
            recomendacion: "Sanción",
            razon: "Periodos 1 y 3 de 2024 con incumplimiento"
          },
          {
            nombre: "No presentar información de afiliados",
            periodos: [
              { periodo: "Trimestre 1 2024", hallazgo: "No pagó", imagenes: [{ url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", descripcion: "SER_afiliados_Q1.pdf" }], resultado: "Sanción" },
              { periodo: "Trimestre 2 2024", hallazgo: "Pagó", imagenes: [{ url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", descripcion: "SER_afiliados_Q2.pdf" }], resultado: "Archivo" },
            ],
            recomendacion: "Sanción",
            razon: "Trimestre 1 de 2024 sin cumplimiento"
          }
        ],
        recomendacionFinal: "Sanción",
        razonFinal: "Al menos un cargo requiere sanción"
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
      fechaPresentacion: "25/Jul/2025",
      resumenDescargos: "El operador argumenta que se encuentra cancelado en el RUES desde hace 6 meses, por lo que no tenía obligación de reportar información durante el periodo investigado.",
      hallazgosSER: { cargos: [{ nombre: "No reportar información de aportes", periodos: [], recomendacion: "Se archiva" }] },
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
      hallazgosSER: {
        cargos: [{
          nombre: "No reportar información de afiliados",
          periodos: [
            { periodo: "Trimestre 1 2025", estado: "No pagó", imagenes: ["SER_afiliados_Q1_001.pdf", "SER_afiliados_Q1_002.pdf", "SER_afiliados_Q1_003.pdf"] },
            { periodo: "Trimestre 2 2025", estado: "No pagó", imagenes: ["SER_afiliados_Q2_001.pdf", "SER_afiliados_Q2_002.pdf"] },
            { periodo: "Trimestre 3 2025", estado: "No pagó", imagenes: ["SER_afiliados_Q3_001.pdf"] },
            { periodo: "Trimestre 4 2025", estado: "Pagó", imagenes: ["SER_afiliados_Q4_001.pdf"] }
          ],
          recomendacion: "Se sanciona"
        }]
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
      hallazgosSER: { cargos: [{ nombre: "Reportar información de afiliados extemporáneamente", periodos: [{ periodo: "Trimestre 4 2025", estado: "Pagó fuera de tiempo", imagenes: ["SER_extemp_Q4.pdf"] }], recomendacion: "Se archiva" }] },
      documentos: { archivos: [{ nombre: "Acto_ACT-2026-02-15.pdf", tamano: "2.3 MB", tipo: "pdf" }, { nombre: "Notificacion_devolucion.pdf", tamano: "1.1 MB", tipo: "pdf" }, { nombre: "Estado_liquidacion.pdf", tamano: "1.6 MB", tipo: "pdf" }] }
    },
  ],
};

// suppress unused import warning
void cn;
