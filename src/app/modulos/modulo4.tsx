import React from "react";
import { ClipboardCheck, Search, Download, FileText, Brain, CheckCircle2, XOctagon, Folder } from "lucide-react";
import { ModuleConfig, bodyXs, StatusBadge } from "../shared";

export const modulo4Config: ModuleConfig = {
  id: "alegatos-conclusion",
  title: "Verificacion de Alegatos de Conclusion",
  shortTitle: "Alegatos de Conclusion",
  epicLabel: "Epica 04",
  description: "Automatizacion de la busqueda e interpretacion de los alegatos de conclusion presentados por los operadores en INTEGRATIC para asegurar que su derecho a la defensa sea registrado y analizado. Los alegatos son argumentos finales, aunque en la practica algunos operadores adjuntan pruebas complementarias.",
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
      id: "identificacion",
      label: "Información de Identificación",
      columns: ["operador", "nit"]
    },
    {
      id: "alegatos",
      label: "Alegatos",
      columns: ["acto", "anio", "radicado", "alegatosEncontrados", "resumenAlegato", "fechaRadicado"]
    },
    {
      id: "pruebas",
      label: "Pruebas y Documentos",
      columns: ["pruebas", "documentos"]
    }
  ],
  resultColumns: [
    {
      key: "acto",
      header: "Acto de prueba",
      headerTooltip: "Identificador único del acto administrativo emitido después de evaluar las pruebas del proceso sancionatorio",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>{val}</span>
    },
    {
      key: "anio",
      header: "Año",
      headerTooltip: "Año de emisión del acto de prueba",
      filterable: true
    },
    {
      key: "radicado",
      header: "Radicado",
      headerTooltip: "Número de radicado del alegato de conclusión presentado por el operador en respuesta al acto de prueba",
      render: (val: string) => <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>{val}</span>
    },
    {
      key: "nit",
      header: "NIT",
      headerTooltip: "Numero de identificacion tributaria del operador"
    },
    {
      key: "operador",
      header: "Operador",
      headerTooltip: "Nombre del operador que presenta alegatos de conclusion",
      filterable: false
    },
    {
      key: "alegatosEncontrados",
      header: "Alegatos encontrados",
      headerTooltip: "Indica si el operador presentó alegatos de conclusión en el sistema INTEGRATIC dentro del término legal establecido",
      filterable: true,
      render: (val: boolean) => <StatusBadge label={val ? "Si" : "No"} variant={val ? "success" : "warning"} icon={val ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />} />
    },
    {
      key: "resumenAlegato",
      header: "Resumen de alegato",
      headerTooltip: "Síntesis generada por IA de los argumentos de defensa presentados por el operador. NOTA: Los alegatos NO constituyen momento probatorio formal",
      truncate: true
    },
    {
      key: "fechaRadicado",
      header: "Fecha radicación",
      headerTooltip: "Fecha en que el operador presentó formalmente el alegato de conclusión ante la entidad",
      render: (val: string) => <span className="text-foreground" style={bodyXs}>{val}</span>
    },
    {
      key: "pruebas",
      header: "Pruebas anexadas",
      headerTooltip: "Documentos adicionales que algunos operadores adjuntan con sus alegatos, aunque técnicamente los alegatos no son momento probatorio. Estos anexos se registran para el análisis integral del caso",
      expandable: true,
      render: (val: any) => {
        const count = Array.isArray(val) ? val.length : 0;
        if (count === 0) return <span className="text-muted-foreground" style={bodyXs}>Sin pruebas</span>;
        return (
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-primary underline underline-offset-2 font-medium" style={bodyXs}>
              {count} prueba{count !== 1 ? "s" : ""}
            </span>
          </div>
        );
      }
    },
    {
      key: "documentos",
      header: "Documento",
      headerTooltip: "Archivos PDF del alegato y sus anexos descargados del sistema INTEGRATIC",
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
,
  ],
  mockData: [
    {
      id: "1",
      acto: "ACT-2025-08-01",
      anio: "2025",
      radicado: "RAD-AL-001",
      nit: "901112223-4",
      operador: "Servicios Integrados Andinos SAS",
      alegatosEncontrados: true,
      resumenAlegato: "El operador presenta alegatos de conclusión argumentando cumplimiento parcial de las obligaciones. Se adjunta documentación que evidencia pagos realizados durante el periodo evaluado y se solicita valoración de atenuantes por colaboración con la entidad.",
      pruebas: [
        { id: "pr1-1", nombre: "Estados financieros certificados", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Estados financieros certificados del periodo fiscal 2024-2025", documento: { nombre: "Estados_financieros_certificados.pdf", tamano: "2.8 MB", tipo: "pdf" } },
        { id: "pr1-2", nombre: "Comprobantes bancarios", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Comprobantes de transferencias bancarias por pagos de contraprestaciones", documento: { nombre: "Comprobantes_bancarios.pdf", tamano: "1.5 MB", tipo: "pdf" } },
      ],
      fechaRadicado: "25/Mar/2025",
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-001.pdf", tamano: "3.2 MB", tipo: "pdf" }, { nombre: "Estados_financieros_certificados.pdf", tamano: "2.8 MB", tipo: "pdf" }, { nombre: "Comprobantes_bancarios.pdf", tamano: "1.5 MB", tipo: "pdf" }] }
    },
    {
      id: "2",
      acto: "ACT-2025-08-15",
      anio: "2025",
      radicado: "RAD-AL-002",
      nit: "830445566-7",
      operador: "Redes del Norte Telecom SA",
      alegatosEncontrados: false,
      resumenAlegato: "N/A",
      pruebas: [],
      fechaRadicado: "--",
      documentos: { archivos: [{ nombre: "Constancia_no_presentacion.pdf", tamano: "720 KB", tipo: "pdf" }] }
    },
    {
      id: "3",
      acto: "ACT-2025-09-15",
      anio: "2025",
      radicado: "RAD-AL-003",
      nit: "900778899-1",
      operador: "Conectividad Caribe Digital SAS",
      alegatosEncontrados: true,
      resumenAlegato: "Alegatos finales en los cuales el operador solicita archivo del proceso sancionatorio por interpretación normativa diferente. Se argumenta que la metodología de cálculo aplicada por la entidad no corresponde con la establecida en la regulación vigente.",
      pruebas: [
        { id: "pr3-1", nombre: "Concepto jurídico externo", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Concepto jurídico externo sobre interpretación de normativa aplicable", documento: { nombre: "Concepto_juridico_externo.pdf", tamano: "1.9 MB", tipo: "pdf" } },
        { id: "pr3-2", nombre: "Declaración representante legal", tipo: "anexada", tipoPrueba: "Testimonial", descripcion: "Declaración jurada del representante legal sobre cumplimiento de obligaciones", documento: { nombre: "Declaracion_representante_legal.pdf", tamano: "980 KB", tipo: "pdf" } },
        { id: "pr3-3", nombre: "Marco normativo vigente", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Normativa aplicable y marco regulatorio vigente citado en alegatos", documento: { nombre: "Marco_normativo_vigente.pdf", tamano: "2.3 MB", tipo: "pdf" } },
      ],
      fechaRadicado: "15/Sep/2025",
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-003.pdf", tamano: "3.8 MB", tipo: "pdf" }, { nombre: "Concepto_juridico_externo.pdf", tamano: "1.9 MB", tipo: "pdf" }, { nombre: "Declaracion_representante_legal.pdf", tamano: "980 KB", tipo: "pdf" }, { nombre: "Marco_normativo_vigente.pdf", tamano: "2.3 MB", tipo: "pdf" }] }
    },
    {
      id: "4",
      acto: "ACT-2026-03-05",
      anio: "2026",
      radicado: "RAD-AL-004",
      nit: "901223344-5",
      operador: "Operadora Metropolitana de Servicios SAS",
      alegatosEncontrados: true,
      resumenAlegato: "El operador solicita el archivo del proceso por cumplimiento total de la obligación. Se adjunta evidencia de pagos realizados con posterioridad a la notificación del pliego de cargos, con solicitud expresa de reconocimiento de buena fe procesal.",
      pruebas: [
        { id: "pr4-1", nombre: "Recibos de pago", tipo: "anexada", tipoPrueba: "Documental", descripcion: "Recibos de pago y comprobantes bancarios de contraprestaciones adeudadas", documento: { nombre: "Recibos_pago_completos.pdf", tamano: "2.4 MB", tipo: "pdf" } },
      ],
      fechaRadicado: "05/Mar/2026",
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-004.pdf", tamano: "2.9 MB", tipo: "pdf" }, { nombre: "Recibos_pago_completos.pdf", tamano: "2.4 MB", tipo: "pdf" }, { nombre: "Comprobantes_bancarios_anexos.pdf", tamano: "3.1 MB", tipo: "pdf" }] }
    },
    {
      id: "5",
      acto: "ACT-2026-03-20",
      anio: "2026",
      radicado: "RAD-AL-005",
      nit: "860998877-2",
      operador: "Comunicaciones del Pacifico Ltda",
      alegatosEncontrados: true,
      resumenAlegato: "Alegatos de conclusión presentando argumentos sobre fuerza mayor y caso fortuito. El operador manifiesta que eventos externos impidieron el cumplimiento oportuno de las obligaciones, solicitando consideración de circunstancias extraordinarias.",
      pruebas: [],
      fechaRadicado: "20/Mar/2026",
      documentos: { archivos: [{ nombre: "Alegato_RAD-AL-005.pdf", tamano: "2.1 MB", tipo: "pdf" }] }
    },
  ],
};
