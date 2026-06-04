import React from "react";
import { FileCheck, Database, Download, FileText, Brain, CheckCircle2, XOctagon, Clock, HelpCircle, Folder, ChevronRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../components/ui/tooltip";
import { ModuleConfig, bodyXs, StatusBadge } from "../shared";

export const modulo1Config: ModuleConfig = {
  id: "notificacion-pliego",
  title: "Verificacion de notificacion del pliego",
  shortTitle: "Notificacion del Pliego",
  epicLabel: "Epica 01",
  description: "Consulta, validación y trazabilidad de la notificación de pliegos de cargos dentro del proceso sancionatorio, permitiendo identificar el operador, expediente, actuación administrativa, mecanismo de notificación, medio de entrega, fechas relevantes, estado y documentos asociados.",
  excelFields: ["Pliego", "Año"],
  navIcon: <FileCheck className="w-4 h-4" />,
  processingSteps: [
    { label: "Consultando API Integratic", icon: <Database className="w-4 h-4" /> },
    { label: "Descargando documentos anexos", icon: <Download className="w-4 h-4" /> },
    { label: "Almacenando en Cloud Storage", icon: <FileText className="w-4 h-4" /> },
    { label: "Analizando notificacion con IA", icon: <Brain className="w-4 h-4" /> },
  ],
  columnTabs: [

    {
      id: "notificacion",
      label: "Notificación del pliego",
      columns: ["operador", "bdi", "pliego", "fechaActo", "tipoNotificacionLegal", "medioEntrega", "direccionCorreo", "fechaEntrega", "fechaNotificacion", "estado", "eventos", "documentos"]
    }
    ,
    {
      id: "cumplimiento",
      label: "Verificación de Cumplimiento",
      icon: <Database className="w-4 h-4" />,
      columns: ["operador", "bdi", "fechaCorte", "pliego", "cumplimiento", "hallazgosSER", "documentos", "acciones"]
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
      header: "N° de acto administrativo",
      headerTooltip: "Identificación del acto administrativo mediante el cual se formula el pliego de cargos.",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "cumplimiento",
      header: "Cumplimiento",
      headerTooltip: "Resultado de la verificación",
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
      headerTooltip: "Cargos y hallazgos identificados en la supervisión regulatoria (SER) para el período de corte.",
      expandable: true,
      render: (val: any) => {
        const trimestres = val?.trimestres;
        const count = Array.isArray(trimestres)
          ? trimestres.reduce((acc: number, t: any) => acc + (Array.isArray(t.cargos) ? t.cargos.length : 0), 0)
          : 0;
        if (count === 0) return <span className="text-muted-foreground" style={bodyXs}>--</span>;
        return (
          <div className="inline-flex justify-center w-[110px] items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-primary/10 transition-colors border border-primary/10">
            <ChevronRight className="w-3.5 h-3.5" />
            {count} {count === 1 ? 'hallazgo' : 'hallazgos'}
          </div>
        );
      }
    },
    {
      key: "fechaActo",
      header: "Fecha del acto",
      headerTooltip: "Fecha de expedición del acto administrativo correspondiente al pliego de cargos.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val || "--"}</span>
    },
    {
      key: "tipoNotificacionLegal",
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
      header: "Medio de entrega notificación",
      headerTooltip: "Canal utilizado para materializar la entrega de la actuación (físico o electrónico).",
      filterable: true,
      render: (val: string) => (
        <div className="flex items-center gap-2">
          {val === "Dirección física" ? <FileText className="w-3.5 h-3.5 text-muted-foreground" /> : <FileText className="w-3.5 h-3.5 text-primary" />}
          <span className="text-foreground" style={bodyXs}>{val}</span>
        </div>
      )
    },
    {
      key: "direccionCorreo",
      header: "Dirección física / correo electrónico",
      headerTooltip: "Información específica del destino utilizado para surtir la entrega de la actuación administrativa.",
      render: (val: string, row: Record<string, any>) => {
        if (!val) return <span className="text-muted-foreground" style={bodyXs}>--</span>;
        const isEmail = row.medioEntrega === "Correo electrónico";
        return (
          <span className="text-foreground inline-block max-w-[220px] truncate align-middle" title={val} style={{ ...bodyXs, fontFamily: isEmail ? "var(--font-body)" : undefined }}>
            {val}
          </span>
        );
      }
    },
    {
      key: "fechaEntrega",
      header: "Fecha de entrega",
      headerTooltip: "Fecha en la cual la Entidad realizó el envío o puso a disposición la actuación administrativa.",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val}</span>
    },
    {
      key: "fechaNotificacion",
      header: "Fecha de entrega efectiva",
      headerTooltip: "Fecha en la cual jurídicamente se entiende surtida la notificación conforme a las reglas previstas en el CPACA.",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const diferida = row.fechaEntrega !== val && val !== "--";
        return (
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={bodyXs}>{val}</span>
            {diferida && <Badge className="bg-chart-4/15 text-chart-4 border-none px-2 py-0.5 text-[10px]">+1 día</Badge>}
          </div>
        );
      }
    },
    {
      key: "estado",
      header: "Estado de notificación",
      headerTooltip: "Resultado o estado procesal asociado a la actuación de notificación (notificado, devuelto, pendiente, entre otros).",
      filterable: true,
      render: (val: string, row: Record<string, any>) => {
        const config: Record<string, { variant: "success" | "warning" | "neutral" | "destructive" | "info"; icon: React.ReactNode }> = {
          "Notificado": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Notificación efectiva": { variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          "Devuelto": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
          "Pendiente": { variant: "neutral", icon: <Clock className="w-3.5 h-3.5" /> },
          "En gestión": { variant: "info", icon: <Clock className="w-3.5 h-3.5" /> },
          "Requiere revisión": { variant: "warning", icon: <HelpCircle className="w-3.5 h-3.5" /> },
          "Fallido": { variant: "destructive", icon: <XOctagon className="w-3.5 h-3.5" /> },
        };
        const cfg = config[val] || config["Pendiente"];
        const isPendingElectronic = val === "Pendiente" && row.medioEntrega === "Correo electrónico";
        const pendingSubstatus = isPendingElectronic ? row.subEstadoPendiente : null;
        const badge = <StatusBadge label={val} variant={cfg.variant} icon={cfg.icon} />;

        if (!pendingSubstatus) return badge;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex cursor-help">{badge}</span>
              </TooltipTrigger>
              <TooltipContent side="top" style={bodyXs}>
                <p>Novedad: {pendingSubstatus}, pendiente de notificar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
    {
      key: "eventos",
      header: "Trazabilidad",
      headerTooltip: "Histórico cronológico de eventos asociados al pliego: citación, envío, entrega, devolución, relanzamiento, aviso y notificación efectiva. Permite reconstruir toda la gestión de notificación, ya que jurídicamente pueden existir varios eventos por una misma actuación administrativa.",
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
      key: "documentos",
      header: "Documentos asociados",
      headerTooltip: "Conjunto documental relacionado con la actuación de notificación, incluyendo radicados, constancias, anexos y demás soportes asociados.",
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
      operador: "Servicios Postales Nacionales 4-72",
      bdi: "9054-2025",
      nit: "899.999.027-2",
      expediente: "EXP-2025-001",
      codigoServicio: "412.10.01",
      servicio: "Mensajería expresa",
      regimen: "Concesión",
      fechaActo: "14/Mar/2025",
      direccionCorreo: "Cra 7 #27-18, Bogotá D.C.",
      motivoDevolucion: "Rehusado por el destinatario",
      pliego: "SPL-2025-03-15",
      idCertimail: null,
      radicadoConstancia: "GR-4-72-2025-0315",
      alertaValidacion: "Requiere validación manual",
      eventos: [
        { id: "e1-1", fecha: "12/Mar/2025", tipo: "Citación", medio: "Dirección física", direccion: "Cra 7 #27-18, Bogotá D.C.", resultado: "Programada para entrega", usuario: "Mensajería 4-72" },
        { id: "e1-2", fecha: "15/Mar/2025", tipo: "Entrega física", medio: "Dirección física", direccion: "Cra 7 #27-18, Bogotá D.C.", resultado: "Rehusado por el destinatario", observacion: "El destinatario se negó a recibir el documento.", alerta: "Requiere validación manual: Soporte con letra ilegible", documento: { nombre: "Constancia_entrega.pdf", tamano: "1.1 MB", tipo: "pdf" } },
        { id: "e1-3", fecha: "15/Mar/2025", tipo: "Devolución", medio: "Dirección física", resultado: "RE — Rehusado", observacion: "Devolución registrada en INTEGRATIC con causal RE." },
        { id: "e1-4", fecha: "17/Mar/2025", tipo: "Aviso", medio: "Dirección física", direccion: "Cartelera entidad — Sede Bogotá", resultado: "Publicado en cartelera por 5 días hábiles", usuario: "Secretaría General" }
      ],
      tipoNotificacionLegal: "Notificación personal",
      medioEntrega: "Dirección física",
      fechaEntrega: "15/Mar/2025",
      fechaNotificacion: "15/Mar/2025",
      codigo: "RE",
      estado: "Devuelto",
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
          { nombre: "Radicado_SPL-2025-03-15.pdf", tamano: "2.3 MB", tipo: "pdf" },
          { nombre: "Constancia_entrega.pdf", tamano: "1.1 MB", tipo: "pdf" },
          { nombre: "Anexo_1.pdf", tamano: "850 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "2",
      operador: "Inter Rapidísimo S.A.",
      bdi: "9061-2025",
      fechaActo: "17/Mar/2025",
      direccionCorreo: "notificaciones@interrapidisimo.com",
      motivoDevolucion: "N/A",
      pliego: "SPL-2025-03-18",
      idCertimail: "CM-2025-03-18-7845621",
      radicadoConstancia: null,
      alertaValidacion: "N/A",
      eventos: [
        { id: "e2-1", fecha: "17/Mar/2025", tipo: "Citación", medio: "Correo electrónico", direccion: "notificaciones@interrapidisimo.com", resultado: "Citación remitida por correo electrónico", usuario: "Sistema INTEGRATIC" },
        { id: "e2-2", fecha: "17/Mar/2025", tipo: "Envío electrónico", medio: "Correo electrónico", direccion: "notificaciones@interrapidisimo.com", resultado: "Mensaje entregado al servidor de correo", documento: { nombre: "Constancia_envio.pdf", tamano: "780 KB", tipo: "pdf" } },
        { id: "e2-3", fecha: "18/Mar/2025", tipo: "Notificación efectiva", medio: "Correo electrónico", resultado: "Acuse de recibo electrónico registrado", observacion: "El operador abrió el correo y firmó acuse digital.", documento: { nombre: "Acuse_recibo.pdf", tamano: "450 KB", tipo: "pdf" } }
      ],
      tipoNotificacionLegal: "Notificación por medios electrónicos",
      medioEntrega: "Correo electrónico",
      fechaEntrega: "18/Mar/2025",
      fechaNotificacion: "18/Mar/2025",
      codigo: "N/A",
      estado: "Notificado",
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
          { nombre: "Radicado_SPL-2025-03-18.pdf", tamano: "3.2 MB", tipo: "pdf" },
          { nombre: "Acuse_recibo.pdf", tamano: "450 KB", tipo: "pdf" },
          { nombre: "Constancia_envio.pdf", tamano: "780 KB", tipo: "pdf" },
          { nombre: "Anexo_1.pdf", tamano: "1.5 MB", tipo: "pdf" },
          { nombre: "Anexo_2.pdf", tamano: "920 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "3",
      operador: "Servientrega S.A.",
      bdi: "9077-2025",
      fechaActo: "21/Mar/2025",
      direccionCorreo: "Av. Cl. 6 #34A-11, Bogotá D.C.",
      motivoDevolucion: "Destinatario no existe en la dirección",
      pliego: "SPL-2025-03-22",
      idCertimail: null,
      radicadoConstancia: "GR-SERVI-2025-0322",
      alertaValidacion: "N/A",
      eventos: [
        { id: "e3-1", fecha: "19/Mar/2025", tipo: "Citación", medio: "Dirección física", direccion: "Av. Cl. 6 #34A-11, Bogotá D.C.", resultado: "Programada para entrega" },
        { id: "e3-2", fecha: "22/Mar/2025", tipo: "Entrega física", medio: "Dirección física", direccion: "Av. Cl. 6 #34A-11, Bogotá D.C.", resultado: "Destinatario no existe en la dirección", documento: { nombre: "Constancia_entrega.pdf", tamano: "920 KB", tipo: "pdf" } },
        { id: "e3-3", fecha: "22/Mar/2025", tipo: "Devolución", medio: "Dirección física", resultado: "NE — No existe" },
        { id: "e3-4", fecha: "23/Mar/2025", tipo: "Aviso", medio: "Dirección física", direccion: "Cartelera entidad", resultado: "Aviso publicado por 5 días hábiles", documento: { nombre: "Aviso_publicacion.pdf", tamano: "680 KB", tipo: "pdf" } },
        { id: "e3-5", fecha: "28/Mar/2025", tipo: "Notificación efectiva", medio: "Dirección física", resultado: "Notificado por aviso al vencimiento del término" }
      ],
      tipoNotificacionLegal: "Notificación por aviso",
      medioEntrega: "Dirección física",
      fechaEntrega: "22/Mar/2025",
      fechaNotificacion: "23/Mar/2025",
      codigo: "NE",
      estado: "Devuelto",
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
          { nombre: "Radicado_SPL-2025-03-22.pdf", tamano: "1.8 MB", tipo: "pdf" },
          { nombre: "Aviso_publicacion.pdf", tamano: "680 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "4",
      operador: "TCC S.A.S.",
      bdi: "9088-2025",
      fechaActo: "24/Mar/2025",
      direccionCorreo: "juridica@tcc.com.co",
      motivoDevolucion: "Buzón del destinatario lleno",
      pliego: "SPL-2025-03-25",
      idCertimail: "CM-2025-03-25-7845834",
      radicadoConstancia: null,
      alertaValidacion: "N/A",
      eventos: [
        { id: "e4-1", fecha: "25/Mar/2025", tipo: "Envío electrónico", medio: "Correo electrónico", direccion: "juridica@tcc.com.co", resultado: "Mensaje rechazado por el servidor", observacion: "Buzón del destinatario al 100% de capacidad." },
        { id: "e4-2", fecha: "25/Mar/2025", tipo: "Aviso", medio: "Correo electrónico", resultado: "BLL — Buzón lleno", observacion: "Pendiente de relanzamiento programado." },
        { id: "e4-3", fecha: "26/Mar/2025", tipo: "Relanzamiento", medio: "Correo electrónico", direccion: "juridica@tcc.com.co", resultado: "Reintento automático programado", usuario: "Sistema INTEGRATIC" }
      ],
      tipoNotificacionLegal: "Notificación por aviso electrónico",
      medioEntrega: "Correo electrónico",
      fechaEntrega: "25/Mar/2025",
      fechaNotificacion: "26/Mar/2025",
      codigo: "BLL",
      subEstadoPendiente: "Buzón lleno",
      estado: "Pendiente",
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
          { nombre: "Radicado_SPL-2025-03-25.pdf", tamano: "2.1 MB", tipo: "pdf" },
          { nombre: "Acuse_recibo.pdf", tamano: "520 KB", tipo: "pdf" },
          { nombre: "Constancia_publicacion.pdf", tamano: "1.3 MB", tipo: "pdf" },
          { nombre: "Anexo_1.pdf", tamano: "740 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "5",
      operador: "Coordinadora Mercantil S.A.",
      bdi: "9102-2025",
      fechaActo: "31/Mar/2025",
      direccionCorreo: "Cra 30 #17-50, Bogotá D.C.",
      motivoDevolucion: "Dirección errada / desconocida",
      pliego: "SPL-2025-04-01",
      idCertimail: null,
      radicadoConstancia: "GR-COORD-2025-0401",
      alertaValidacion: "Requiere validación manual",
      eventos: [
        { id: "e5-1", fecha: "30/Mar/2025", tipo: "Citación", medio: "Dirección física", direccion: "Cra 30 #17-50, Bogotá D.C.", resultado: "Programada para entrega" },
        { id: "e5-2", fecha: "01/Abr/2025", tipo: "Entrega física", medio: "Dirección física", direccion: "Cra 30 #17-50, Bogotá D.C.", resultado: "Dirección errada / desconocida", documento: { nombre: "Fotografia_evidencia.jpg", tamano: "1.2 MB", tipo: "img" } },
        { id: "e5-3", fecha: "01/Abr/2025", tipo: "Devolución", medio: "Dirección física", resultado: "DE — Dirección errada" },
        { id: "e5-4", fecha: "02/Abr/2025", tipo: "Aviso", medio: "Dirección física", direccion: "Cartelera entidad", resultado: "Aviso publicado" }
      ],
      tipoNotificacionLegal: "Citación para notificación personal",
      medioEntrega: "Dirección física",
      fechaEntrega: "01/Abr/2025",
      fechaNotificacion: "01/Abr/2025",
      codigo: "DE",
      estado: "Devuelto",
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
          { nombre: "Radicado_SPL-2025-04-01.pdf", tamano: "2.8 MB", tipo: "pdf" },
          { nombre: "Constancia_entrega.pdf", tamano: "990 KB", tipo: "pdf" },
          { nombre: "Fotografia_evidencia.jpg", tamano: "1.2 MB", tipo: "img" },
          { nombre: "Anexo_1.pdf", tamano: "1.6 MB", tipo: "pdf" },
          { nombre: "Anexo_2.pdf", tamano: "1.1 MB", tipo: "pdf" },
          { nombre: "Anexo_3.pdf", tamano: "850 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "6",
      operador: "Deprisa S.A.",
      bdi: "9119-2025",
      fechaActo: "04/Abr/2025",
      direccionCorreo: "Cra 60 #11-30, Bogotá D.C.",
      motivoDevolucion: "N/A",
      pliego: "SPL-2025-04-05",
      idCertimail: null,
      radicadoConstancia: "GR-DEPRISA-2025-0405",
      alertaValidacion: "N/A",
      eventos: [
        { id: "e6-1", fecha: "03/Abr/2025", tipo: "Citación", medio: "Dirección física", direccion: "Cra 60 #11-30, Bogotá D.C.", resultado: "Programada para entrega" },
        { id: "e6-2", fecha: "05/Abr/2025", tipo: "Entrega física", medio: "Dirección física", direccion: "Cra 60 #11-30, Bogotá D.C.", resultado: "Entregada al representante legal", documento: { nombre: "Constancia_entrega.pdf", tamano: "1.1 MB", tipo: "pdf" } },
        { id: "e6-3", fecha: "05/Abr/2025", tipo: "Notificación efectiva", medio: "Dirección física", resultado: "Notificación personal surtida", documento: { nombre: "Acuse_recibo.pdf", tamano: "620 KB", tipo: "pdf" } }
      ],
      tipoNotificacionLegal: "Notificación personal",
      medioEntrega: "Dirección física",
      fechaEntrega: "05/Abr/2025",
      fechaNotificacion: "05/Abr/2025",
      codigo: "N/A",
      estado: "Notificado",
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
          { nombre: "Radicado_SPL-2025-04-05.pdf", tamano: "2.5 MB", tipo: "pdf" },
          { nombre: "Acuse_recibo.pdf", tamano: "620 KB", tipo: "pdf" },
          { nombre: "Constancia_entrega.pdf", tamano: "1.1 MB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "7",
      operador: "Envía Colvanes S.A.S.",
      bdi: "9201-2026",
      fechaActo: "08/Ene/2026",
      direccionCorreo: "Cl. 17 #68B-94, Bogotá D.C.",
      motivoDevolucion: "No reclamado en término",
      pliego: "SPL-2026-01-10",
      idCertimail: null,
      radicadoConstancia: "GR-COLV-2026-0110",
      alertaValidacion: "N/A",
      eventos: [
        { id: "e7-1", fecha: "07/Ene/2026", tipo: "Citación", medio: "Dirección física", direccion: "Cl. 17 #68B-94, Bogotá D.C.", resultado: "Programada para entrega" },
        { id: "e7-2", fecha: "10/Ene/2026", tipo: "Entrega física", medio: "Dirección física", direccion: "Cl. 17 #68B-94, Bogotá D.C.", resultado: "No reclamado en término" },
        { id: "e7-3", fecha: "10/Ene/2026", tipo: "Devolución", medio: "Dirección física", resultado: "NR — No reclamado", documento: { nombre: "Constancia_devolucion.pdf", tamano: "1.4 MB", tipo: "pdf" } },
        { id: "e7-4", fecha: "11/Ene/2026", tipo: "Aviso", medio: "Dirección física", direccion: "Cartelera entidad", resultado: "Aviso publicado por 5 días hábiles", documento: { nombre: "Aviso_publicacion.pdf", tamano: "890 KB", tipo: "pdf" } }
      ],
      tipoNotificacionLegal: "Notificación por aviso",
      medioEntrega: "Dirección física",
      fechaEntrega: "10/Ene/2026",
      fechaNotificacion: "11/Ene/2026",
      codigo: "NR",
      estado: "Devuelto",
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
          { nombre: "Radicado_SPL-2026-01-10.pdf", tamano: "2.2 MB", tipo: "pdf" },
          { nombre: "Aviso_publicacion.pdf", tamano: "890 KB", tipo: "pdf" },
          { nombre: "Constancia_devolucion.pdf", tamano: "1.4 MB", tipo: "pdf" },
          { nombre: "Anexo_1.pdf", tamano: "950 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "8",
      operador: "Domesa de Colombia S.A.",
      bdi: "9215-2026",
      fechaActo: "13/Ene/2026",
      direccionCorreo: "legal@domesa.com.co",
      motivoDevolucion: "N/A",
      pliego: "SPL-2026-01-15",
      idCertimail: "CM-2026-01-15-8921456",
      radicadoConstancia: null,
      alertaValidacion: "N/A",
      eventos: [
        { id: "e8-1", fecha: "14/Ene/2026", tipo: "Citación", medio: "Correo electrónico", direccion: "legal@domesa.com.co", resultado: "Citación remitida por correo electrónico" },
        { id: "e8-2", fecha: "15/Ene/2026", tipo: "Envío electrónico", medio: "Correo electrónico", direccion: "legal@domesa.com.co", resultado: "Mensaje entregado", documento: { nombre: "Constancia_envio.pdf", tamano: "820 KB", tipo: "pdf" } },
        { id: "e8-3", fecha: "15/Ene/2026", tipo: "Notificación efectiva", medio: "Correo electrónico", resultado: "Acuse de recibo firmado digitalmente", documento: { nombre: "Acuse_recibo.pdf", tamano: "480 KB", tipo: "pdf" } }
      ],
      tipoNotificacionLegal: "Notificación por medios electrónicos",
      medioEntrega: "Correo electrónico",
      fechaEntrega: "15/Ene/2026",
      fechaNotificacion: "15/Ene/2026",
      codigo: "N/A",
      estado: "Notificado",
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
          { nombre: "Radicado_SPL-2026-01-15.pdf", tamano: "3.1 MB", tipo: "pdf" },
          { nombre: "Acuse_recibo.pdf", tamano: "480 KB", tipo: "pdf" },
          { nombre: "Constancia_envio.pdf", tamano: "820 KB", tipo: "pdf" },
          { nombre: "Anexo_1.pdf", tamano: "1.3 MB", tipo: "pdf" },
          { nombre: "Anexo_2.pdf", tamano: "1.7 MB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "9",
      operador: "Saferbo S.A.",
      bdi: "9234-2026",
      fechaActo: "18/Feb/2026",
      direccionCorreo: "Cl. 13 #65-10, Bogotá D.C.",
      motivoDevolucion: "N/A",
      pliego: "SPL-2026-02-20",
      idCertimail: null,
      radicadoConstancia: "GR-SAFERBO-2026-0220",
      alertaValidacion: "N/A",
      eventos: [
        { id: "e9-1", fecha: "18/Feb/2026", tipo: "Citación", medio: "Dirección física", direccion: "Cl. 13 #65-10, Bogotá D.C.", resultado: "Programada para entrega" },
        { id: "e9-2", fecha: "20/Feb/2026", tipo: "Entrega física", medio: "Dirección física", direccion: "Cl. 13 #65-10, Bogotá D.C.", resultado: "Entregada al representante legal", documento: { nombre: "Constancia_entrega.pdf", tamano: "1.2 MB", tipo: "pdf" } },
        { id: "e9-3", fecha: "20/Feb/2026", tipo: "Notificación efectiva", medio: "Dirección física", resultado: "Notificación personal surtida", documento: { nombre: "Fotografia_evidencia_1.jpg", tamano: "980 KB", tipo: "img" } }
      ],
      tipoNotificacionLegal: "Notificación personal",
      medioEntrega: "Dirección física",
      fechaEntrega: "20/Feb/2026",
      fechaNotificacion: "20/Feb/2026",
      codigo: "N/A",
      estado: "Notificado",
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
          { nombre: "Radicado_SPL-2026-02-20.pdf", tamano: "2.9 MB", tipo: "pdf" },
          { nombre: "Acuse_recibo.pdf", tamano: "550 KB", tipo: "pdf" },
          { nombre: "Constancia_entrega.pdf", tamano: "1.2 MB", tipo: "pdf" },
          { nombre: "Fotografia_evidencia_1.jpg", tamano: "980 KB", tipo: "img" },
          { nombre: "Fotografia_evidencia_2.jpg", tamano: "1.1 MB", tipo: "img" },
          { nombre: "Anexo_1.pdf", tamano: "1.5 MB", tipo: "pdf" },
          { nombre: "Anexo_2.pdf", tamano: "920 KB", tipo: "pdf" },
        ]
      }
    },
    {
      id: "10",
      operador: "Pasar S.A.S.",
      bdi: "9248-2026",
      fechaActo: "10/Mar/2026",
      direccionCorreo: "notificaciones@pasar.com.co",
      motivoDevolucion: "Notificación abierta sin acuse de recibo",
      pliego: "SPL-2026-03-12",
      idCertimail: "CM-2026-03-12-9102378",
      radicadoConstancia: null,
      alertaValidacion: "N/A",
      eventos: [
        { id: "e10-1", fecha: "11/Mar/2026", tipo: "Envío electrónico", medio: "Correo electrónico", direccion: "notificaciones@pasar.com.co", resultado: "Mensaje entregado al servidor", documento: { nombre: "Constancia_publicacion.pdf", tamano: "1.3 MB", tipo: "pdf" } },
        { id: "e10-2", fecha: "12/Mar/2026", tipo: "Aviso", medio: "Correo electrónico", resultado: "APN — Apertura sin acuse", observacion: "El operador abrió la notificación pero no firmó acuse." },
        { id: "e10-3", fecha: "13/Mar/2026", tipo: "Relanzamiento", medio: "Correo electrónico", direccion: "notificaciones@pasar.com.co", resultado: "Reintento automático programado", usuario: "Sistema INTEGRATIC" }
      ],
      tipoNotificacionLegal: "Notificación por aviso electrónico",
      medioEntrega: "Correo electrónico",
      fechaEntrega: "12/Mar/2026",
      fechaNotificacion: "13/Mar/2026",
      codigo: "APN",
      subEstadoPendiente: "Apertura de notificación",
      estado: "Pendiente",
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
          { nombre: "Radicado_SPL-2026-03-12.pdf", tamano: "2.4 MB", tipo: "pdf" },
          { nombre: "Aviso_electronico.pdf", tamano: "760 KB", tipo: "pdf" },
          { nombre: "Constancia_publicacion.pdf", tamano: "1.3 MB", tipo: "pdf" },
        ]
      }
    },
  ],
};
