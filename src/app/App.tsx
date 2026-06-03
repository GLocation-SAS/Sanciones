import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, createBrowserRouter, RouterProvider, redirect } from "react-router";
import { Eye, EyeOff, Home, ChevronRight, Check, Upload, X, AlertCircle, CheckCircle, Loader2, FileSpreadsheet, Download, FileText, ChevronsLeft, ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsRight, Brain, Search, Trash2, Filter, XCircle, LogOut, Folder, Paperclip, AlertTriangle, HelpCircle, ArrowUpDown, ChevronDown, ChevronUp, FileQuestion, Image as ImageIcon, CheckCircle2, XOctagon, Clock, Database, FileCheck, FileSearch, Gavel, ClipboardCheck, ShieldCheck, Mail, Building2, User } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Calendar } from "./components/ui/calendar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";
import { cn } from "./components/ui/utils";
import TicLogo from "../imports/Svg";
import HeaderFrame from "../imports/Frame1321316704";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ColumnDef, ProcessingStep, ModuleConfig, bodyXs, bodyBase, headingBold, headingBoldItalic, StatusBadge } from "./shared";
import { modulo1Config } from "./modulos/notificacioPliego";
import { modulo2Config } from "./modulos/descargosPruebas";
import { SancionesModule } from "./components/sanciones/SancionesModule";
import { modulo3Config } from "./modulos/actosPrueba";
import { modulo4Config } from "./modulos/alegatosConclusion";
import { modulo5Config } from "./modulos/hallazgos";

/* ConfirmDialog */
function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  icon,
  iconBgClass,
  iconColorClass,
  confirmLabel,
  confirmClass,
  cancelLabel = "Cancelar",
  variant = "info",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconColorClass: string;
  confirmLabel: string;
  confirmClass: string;
  cancelLabel?: string;
  variant?: "info" | "success" | "destructive";
}) {
  const titleColorClass = variant === "destructive" ? "text-destructive" : variant === "success" ? "text-chart-2" : "text-primary";
  const confirmBtnClass = variant === "destructive" ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : variant === "success" ? "bg-chart-2 hover:bg-chart-2/90 text-background" : "bg-primary hover:bg-primary/90 text-primary-foreground";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[960px] mx-4 p-0 gap-0 bg-background border-2 border-border rounded-xl overflow-hidden outline-none shadow-elevation-sm [&>button]:hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <div className="bg-card shrink-0 w-full border-b-2 border-border min-h-[60px] md:min-h-[80px]">
          <div className="flex items-center px-4 sm:px-6 md:px-10 py-4 md:py-5 h-full">
            <h3 className={cn("text-left", titleColorClass)} style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "clamp(var(--text-lg), 4vw, var(--text-2xl))", fontStyle: "italic", lineHeight: "1.2" }}>{title}</h3>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-10 py-6 md:py-8">
          <div className={cn("w-[100px] h-[100px] md:w-[138px] md:h-[138px] rounded-full flex items-center justify-center shrink-0", iconBgClass)}>
            <div className={cn("scale-[1.8] md:scale-[2.4]", iconColorClass)}>{icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-center sm:text-left" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: "1.6", whiteSpace: "pre-line" }}>{description}</p>
          </div>
        </div>
        <div className="bg-card shrink-0 w-full border-t-2 border-border min-h-[70px] md:min-h-[80px]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 md:gap-6 px-4 sm:px-6 md:px-10 py-4 md:py-5 h-full">
            <button
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto sm:min-w-[150px] bg-muted text-background rounded-lg py-3 px-6 md:px-10 hover:bg-muted/80 active:scale-[0.97] transition-all duration-200 flex items-center justify-center whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: "1.6" }}
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => { onConfirm(); onOpenChange(false); }}
              className={cn("w-full sm:w-auto sm:min-w-[150px] rounded-lg py-3 px-6 md:px-10 active:scale-[0.97] transition-all duration-200 flex items-center justify-center whitespace-nowrap", confirmBtnClass)}
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: "1.6" }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ALL_CONFIGS: ModuleConfig[] = [modulo1Config, modulo2Config, modulo3Config, modulo4Config, modulo5Config];

/* ExcelUpload Component */
function ExcelUpload({ onFileAccepted, onIndividualSearch, moduleConfig }: { onFileAccepted: (file: File) => void; onIndividualSearch?: (searchValue: string) => void; moduleConfig: ModuleConfig }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [justDropped, setJustDropped] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [consultaMode, setConsultaMode] = useState<"masiva" | "individual">("masiva");
  const [pliegoValue, setPliegoValue] = useState("");
  const [anioValue, setAnioValue] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext !== "xlsx" && ext !== "xls") { setError("Solo se permiten archivos Excel (.xlsx, .xls)"); return false; }
    if (f.size > 10 * 1024 * 1024) { setError("El archivo no debe superar los 10 MB"); return false; }
    return true;
  };

  const handleFile = (f: File) => { setError(null); if (validateFile(f)) { setFile(f); setJustDropped(true); setTimeout(() => setJustDropped(false), 600); } };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const d = e.dataTransfer.files[0]; if (d) handleFile(d); };
  const handleRemove = () => { setFile(null); setError(null); if (inputRef.current) inputRef.current.value = ""; };

  const handleIndividualSearchClick = () => {
    if (onIndividualSearch && pliegoValue.length === 5 && anioValue.length === 4) {
      onIndividualSearch(`${pliegoValue}-${anioValue}`);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "Pliego,Año\n00527,2025\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `plantilla_${moduleConfig.title.replace(/\s+/g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Selector de modo de consulta */}
      <div className="flex gap-4">
        <button
          onClick={() => setConsultaMode("masiva")}
          className={cn(
            "flex-1 py-3 px-6 rounded-lg border-2 transition-all duration-200",
            consultaMode === "masiva"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40"
          )}
          style={bodyBase}
        >
          Consulta masiva
        </button>
        <button
          onClick={() => setConsultaMode("individual")}
          className={cn(
            "flex-1 py-3 px-6 rounded-lg border-2 transition-all duration-200",
            consultaMode === "individual"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40"
          )}
          style={bodyBase}
        >
          Consulta individual
        </button>
      </div>

      {consultaMode === "individual" ? (
        /* Modo de consulta individual */
        <div className="flex flex-col gap-6">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Consulta de expediente individual</p>
              <p className="text-muted-foreground mt-1" style={{ ...bodyXs, lineHeight: 1.6 }}>
                Ingrese el número del pliego (5 dígitos) y el año (4 dígitos) para consultar un expediente específico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                Número del pliego
              </label>
              <input
                type="text"
                maxLength={5}
                placeholder="00527"
                value={pliegoValue}
                onChange={(e) => setPliegoValue(e.target.value.replace(/\D/g, ""))}
                className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}
              />
              <p className="text-muted-foreground" style={{ fontSize: "10px" }}>
                Exactamente 5 dígitos
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                Año
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="2025"
                value={anioValue}
                onChange={(e) => setAnioValue(e.target.value.replace(/\D/g, ""))}
                className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}
              />
              <p className="text-muted-foreground" style={{ fontSize: "10px" }}>
                Exactamente 4 dígitos
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleIndividualSearchClick}
              disabled={pliegoValue.length !== 5 || anioValue.length !== 4}
              className={cn(
                "rounded-lg px-10 py-3.5 transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2",
                pliegoValue.length === 5 && anioValue.length === 4
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-elevation-sm active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              )}
              style={bodyBase}
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>
      ) : (
        /* Modo de consulta masiva */
        <div className="flex flex-col gap-8">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Campos requeridos en el archivo Excel</p>
              <p className="text-muted-foreground mt-1" style={{ ...bodyXs, lineHeight: 1.6 }}>
                El archivo debe contener únicamente las columnas <strong style={{ fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>A (Pliego)</strong> y <strong style={{ fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>B (Año)</strong>. La columna de Pliego debe tener exactamente 5 dígitos (ej. 00527) y la de Año debe tener 4 dígitos. Puede incluir uno o múltiples registros.
              </p>
              <button
                onClick={downloadTemplate}
                className="mt-3 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                <Download className="w-4 h-4" />
                Descargar plantilla de ejemplo
              </button>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => !file && inputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-xl py-10 sm:py-16 px-4 sm:px-8 text-center transition-all duration-300 group",
              isDragging
                ? "border-primary bg-primary/5 cursor-copy"
                : file
                  ? "border-primary/30 bg-primary/5 cursor-default"
                  : "border-border bg-background cursor-pointer hover:border-primary/50 hover:bg-primary/5",
              justDropped && "animate-pulse"
            )}
          >
            <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={(e) => { const s = e.target.files?.[0]; if (s) handleFile(s); }} className="hidden" />
            {file ? (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 bg-chart-2/10 text-chart-2 px-4 py-1.5 rounded-full" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Archivo listo para procesar
                </div>
                <div className={cn("w-full max-w-md border border-border rounded-xl bg-background p-5 flex items-center gap-4 transition-all duration-300", justDropped && "shadow-elevation-sm")}>
                  <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-6 h-6 text-chart-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>{file.name}</p>
                    <p className="text-muted-foreground mt-0.5" style={{ ...bodyXs, fontSize: "11px" }}>{(file.size / 1024).toFixed(1)} KB - Excel</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true); }}
                    className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/5 active:scale-90 transition-all duration-200"
                    title="Eliminar archivo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  style={bodyXs}
                >
                  Cambiar archivo
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300", isDragging ? "bg-primary/20 scale-110" : "bg-primary/10 group-hover:bg-primary/15 group-hover:scale-105")}>
                  <Upload className={cn("w-7 h-7 text-primary transition-transform duration-300", isDragging && "-translate-y-1")} />
                </div>
                <div className="space-y-1">
                  <p className={cn("transition-colors duration-200", isDragging ? "text-primary" : "text-foreground")} style={bodyBase}>
                    {isDragging ? "Suelta el archivo aqui" : "Selecciona un archivo o arrastralo aqui"}
                  </p>
                  <p className="text-muted-foreground" style={bodyXs}>Cada archivo debe estar en formato .xlsx o .xls</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className={cn("border border-primary text-primary bg-background rounded-lg px-6 py-2.5 transition-all duration-200", "hover:bg-primary hover:text-primary-foreground hover:shadow-elevation-sm", "active:scale-95", isDragging && "opacity-0 pointer-events-none")}
                  style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                >
                  Seleccionar Archivo
                </button>
              </div>
            )}
          </div>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => { if (file) setShowUploadConfirm(true); }}
              disabled={!file}
              className={cn("border rounded-lg px-10 py-3.5 transition-all duration-200 w-full sm:w-auto", file ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-elevation-sm active:scale-95" : "border-border text-muted-foreground cursor-not-allowed opacity-60")}
              style={bodyBase}
            >
              Cargar
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleRemove}
        title="Eliminar archivo"
        description={`Esta seguro que desea eliminar el archivo "${file?.name}"? Esta accion no se puede deshacer.`}
        icon={<X className="w-7 h-7" />}
        iconBgClass="bg-destructive"
        iconColorClass="text-destructive-foreground"
        confirmLabel="Si, eliminar"
        confirmClass="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        variant="destructive"
      />

      <ConfirmDialog
        open={showUploadConfirm}
        onOpenChange={setShowUploadConfirm}
        onConfirm={() => { if (file) onFileAccepted(file); }}
        title="Iniciar procesamiento"
        description={`Esta seguro que desea cargar el archivo "${file?.name}" para su analisis? El proceso de verificacion comenzara inmediatamente.`}
        icon={<CheckCircle className="w-7 h-7" />}
        iconBgClass="bg-chart-2"
        iconColorClass="text-background"
        confirmLabel="Si, cargar"
        confirmClass="bg-primary hover:bg-primary/90 text-primary-foreground"
        variant="success"
      />
    </div>
  );
}

/* Processing Component */
function Processing({ steps, onComplete }: { steps: ProcessingStep[]; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const totalSteps = steps.length;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / totalSteps) * 100;
        const next = prev + 1.2;
        if (next >= target) {
          if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
          else if (next >= 100) { clearInterval(interval); setTimeout(onComplete, 600); return 100; }
        }
        return Math.min(next, 100);
      });
    }, 36);
    return () => clearInterval(interval);
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-6">
      <div className="w-full max-w-[520px] space-y-8 md:space-y-12">
        <div className="flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center"><Loader2 className="w-8 h-8 md:w-10 md:h-10 text-primary animate-spin" /></div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-primary" style={{ ...headingBold, fontSize: "clamp(var(--text-lg), 4vw, var(--text-2xl))" }}>Procesando informacion</h2>
          <p className="text-muted-foreground" style={bodyBase}>Por favor espere mientras se completa el analisis</p>
        </div>
        <div className="space-y-3">
          <Progress value={progress} className="h-2 md:h-3 bg-primary/10 rounded-full" />
          <div className="flex justify-between">
            <span className="text-muted-foreground truncate mr-2" style={bodyXs}>{steps[currentStep]?.label}</span>
            <span className="text-primary shrink-0" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="space-y-2 md:space-y-3">
          {steps.map((stepItem, index) => {
            const isComplete = index < currentStep || progress >= 100;
            const isCurrent = index === currentStep && progress < 100;
            return (
              <div key={index} className={cn("flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border transition-all duration-300", isComplete ? "bg-chart-2/5 border-chart-2/20" : isCurrent ? "bg-primary/5 border-primary/30" : "bg-card border-border opacity-50")}>
                <div className={cn("w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0", isComplete ? "bg-chart-2 text-background" : isCurrent ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground")}>
                  {isComplete ? <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /> : isCurrent ? <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" /> : <span style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>{index + 1}</span>}
                </div>
                <span className={cn(isComplete ? "text-chart-2" : isCurrent ? "text-foreground" : "text-muted-foreground")} style={{ ...bodyBase, fontWeight: isComplete || isCurrent ? "var(--font-weight-medium)" : "var(--font-weight-normal)", fontSize: "clamp(var(--text-xs), 2.5vw, var(--text-base))" }}>
                  {stepItem.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* DocumentosModal Component */
function DocumentosModal({
  open,
  onOpenChange,
  archivos,
  pliego,
  titulo = "Documentos"
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  archivos: Array<{ nombre: string; tamano: string; tipo: string }>;
  pliego: string;
  titulo?: string;
}) {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);

  const getFileIcon = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="w-4 h-4" />;
    if (tipo === "img") return <ImageIcon className="w-4 h-4" />;
    return <Paperclip className="w-4 h-4" />;
  };

  const handleDownloadFile = (fileName: string) => {
    console.log(`Descargando archivo: ${fileName}`);
  };

  const selectedDoc = archivos[selectedDocIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] w-[95vw] h-[90vh] sm:h-[85vh] p-0 gap-0 bg-background border-2 border-border rounded-xl overflow-hidden flex flex-col [&>button]:hidden">
        <DialogTitle className="sr-only">Documentos de {pliego}</DialogTitle>
        <DialogDescription className="sr-only">Visualización y gestión de documentos</DialogDescription>

        {/* Header con Breadcrumb */}
        <div className="bg-card border-b-2 border-border flex-shrink-0">
          <div className="flex flex-col gap-2 px-4 md:px-6 py-3 md:py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-muted-foreground md:overflow-visible overflow-x-auto scrollbar-hide" style={{ ...bodyXs, fontSize: "11px" }}>
              <Home className="w-3 h-3 flex-shrink-0" />
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Resultados</span>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                {titulo}
              </span>
            </div>

            {/* Título */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-primary truncate" style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "clamp(var(--text-base), 3vw, var(--text-lg))", fontStyle: "italic", lineHeight: "1.2" }}>
                  {titulo}
                </h3>
                <p className="text-muted-foreground mt-0.5 truncate" style={{ fontSize: "11px", lineHeight: "1.3" }}>
                  {pliego} • {archivos.length} documento{archivos.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Two Panels */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
          {/* Left Panel: Document List */}
          <div className="w-full md:w-[320px] border-b md:border-b-0 md:border-r border-border bg-muted/20 overflow-y-auto max-h-[200px] md:max-h-none">
            <div className="p-3 space-y-2">
              {archivos.map((archivo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDocIndex(idx)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group",
                    selectedDocIndex === idx
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary/30"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 transition-colors",
                    selectedDocIndex === idx ? "text-white" : "text-primary group-hover:text-white"
                  )}>
                    {getFileIcon(archivo.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "truncate font-medium",
                      selectedDocIndex === idx ? "text-primary-foreground" : "text-foreground group-hover:text-primary-foreground"
                    )} style={bodyXs}>
                      {archivo.nombre}
                    </div>
                    <div className={cn(
                      "transition-colors",
                      selectedDocIndex === idx ? "text-primary-foreground/80" : "text-muted-foreground group-hover:text-primary-foreground/80"
                    )} style={{ fontSize: "10px" }}>
                      {archivo.tamano}
                    </div>
                  </div>
                  {selectedDocIndex === idx && (
                    <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Document Preview */}
          <div className="flex-1 flex flex-col bg-muted/10">
            {/* Preview Header */}
            <div className="px-3 sm:px-4 py-2 border-b border-border bg-card/50">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getFileIcon(selectedDoc.tipo)}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-foreground font-medium truncate" style={bodyBase}>
                      {selectedDoc.nombre}
                    </h4>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                      {selectedDoc.tamano}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownloadFile(selectedDoc.nombre)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex-shrink-0"
                  style={bodyXs}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Descargar</span>
                </Button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto p-3 sm:p-4">
              <div className="w-full h-full bg-card rounded-lg border border-border flex items-center justify-center">
                {selectedDoc.tipo === "pdf" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="w-16 h-16 mb-4" />
                    <p style={bodyBase}>Vista previa de PDF</p>
                    <p className="text-xs mt-2">"{selectedDoc.nombre}"</p>
                    <p className="text-xs mt-4 text-center max-w-md">
                      En producción, aquí se mostraría el PDF usando un visor embebido
                    </p>
                  </div>
                ) : selectedDoc.tipo === "img" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-16 h-16 mb-4" />
                    <p style={bodyBase}>Vista previa de imagen</p>
                    <p className="text-xs mt-2">"{selectedDoc.nombre}"</p>
                    <p className="text-xs mt-4 text-center max-w-md">
                      En producción, aquí se mostraría la imagen
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Paperclip className="w-16 h-16 mb-4" />
                    <p style={bodyBase}>No hay vista previa disponible</p>
                    <p className="text-xs mt-2">"{selectedDoc.nombre}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card border-t-2 border-border px-4 sm:px-6 h-20 flex flex-col sm:flex-row items-center justify-between gap-2 flex-shrink-0">
          <div className="text-muted-foreground text-center sm:text-left" style={{ fontSize: "11px" }}>
            Documento {selectedDocIndex + 1} de {archivos.length}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onOpenChange(false)}
              className="min-w-[100px] bg-muted text-background rounded-lg py-2 px-4 hover:bg-muted/80 active:scale-[0.97] transition-all duration-200 flex items-center justify-center whitespace-nowrap flex-1 sm:flex-initial"
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ResultsTable Component */
function ResultsTable({ columns, data, moduleTitle, onReset }: { columns: ColumnDef[]; data: Record<string, any>[]; moduleTitle: string; onReset: () => void }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pliegoDateFilter, setPliegoDateFilter] = useState<Date | undefined>(undefined);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [documentosModalOpen, setDocumentosModalOpen] = useState(false);
  const [selectedDocumentos, setSelectedDocumentos] = useState<{ archivos: Array<{ nombre: string; tamano: string; tipo: string }>; pliego: string; titulo?: string } | null>(null);
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [selectedValidation, setSelectedValidation] = useState<{ acto: string; estadoRUES: string; pliego: string } | null>(null);
  const [cumplimientoModalOpen, setCumplimientoModalOpen] = useState(false);
  const [selectedCumplimiento, setSelectedCumplimiento] = useState<{ acto: string; operador: string; estadoRUES: string } | null>(null);
  const [hallazgosSERModalOpen, setHallazgosSERModalOpen] = useState(false);
  const [selectedHallazgosSER, setSelectedHallazgosSER] = useState<any>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [pruebasModalOpen, setPruebasModalOpen] = useState(false);
  const [selectedPruebas, setSelectedPruebas] = useState<{ pruebas: any[]; radicado: string; descargos: string } | null>(null);
  const [resumenModalOpen, setResumenModalOpen] = useState(false);
  const [selectedResumen, setSelectedResumen] = useState<any>(null);
  const [selectedDocIndexResumen, setSelectedDocIndexResumen] = useState(0); // Para el visor de documentos en resumen
  const [expandedCargo, setExpandedCargo] = useState<number | null>(0); // Para controlar acordeón de cargos en modal cumplimiento

  // Estados para módulo 3 - Actos de Prueba
  const [validacionActoModalOpen, setValidacionActoModalOpen] = useState(false);
  const [selectedActoValidacion, setSelectedActoValidacion] = useState<any>(null);
  const [galeriaImagenesModalOpen, setGaleriaImagenesModalOpen] = useState(false);
  const [selectedImagenesGaleria, setSelectedImagenesGaleria] = useState<{ imagenes: any[]; cargo: string; periodo: string; hallazgo: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para abrir documentos (modal en desktop, navegación en móvil)
  const handleOpenDocumentos = (archivos: any[], identifier: string, docTitulo: string) => {
    if (isMobile) {
      navigate('documentos', { state: { archivos, pliego: identifier, titulo: docTitulo } });
    } else {
      setSelectedDocumentos({ archivos, pliego: identifier, titulo: docTitulo });
      setDocumentosModalOpen(true);
    }
  };

  // Función para abrir validación (modal en desktop, navegación en móvil)
  const handleOpenValidation = (acto: string, estadoRUES: string, pliego: string) => {
    if (isMobile) {
      navigate('validacion', { state: { acto, estadoRUES, pliego } });
    } else {
      setSelectedValidation({ acto, estadoRUES, pliego });
      setValidationModalOpen(true);
    }
  };

  // Función para abrir cumplimiento (modal en desktop, navegación en móvil)
  const handleOpenCumplimiento = (acto: string, operador: string, estadoRUES: string) => {
    if (isMobile) {
      navigate('cumplimiento', { state: { acto, operador, estadoRUES } });
    } else {
      setSelectedCumplimiento({ acto, operador, estadoRUES });
      setCumplimientoModalOpen(true);
    }
  };

  // Función para abrir hallazgos SER
  const handleOpenHallazgosSER = (hallazgosSER: any, acto: string, pliego: string, estadoRUES: string) => {
    setSelectedHallazgosSER({ ...hallazgosSER, acto, pliego, estadoRUES });
    setHallazgosSERModalOpen(true);
  };

  // Función para abrir modal de pruebas
  const handleOpenPruebas = (pruebas: any[], radicado: string, descargos: string) => {
    setSelectedPruebas({ pruebas, radicado, descargos });
    setPruebasModalOpen(true);
  };

  // Función para abrir modal de resumen de descargo
  const handleOpenResumenDescargo = (resumenCompleto: string, documentos: any[], radicado: string) => {
    setSelectedResumen({ resumenCompleto, documentos, radicado });
    setSelectedDocIndexResumen(0); // Resetear índice al abrir
    setResumenModalOpen(true);
  };

  // Función para abrir modal de validación de acto (módulo 3)
  const handleOpenValidacionActo = (row: any) => {
    setSelectedActoValidacion(row);
    setValidacionActoModalOpen(true);
  };

  // Función para abrir galería de imágenes SER (módulo 3)
  const handleOpenGaleriaImagenes = (imagenes: any[], cargo: string, periodo: string, hallazgo: string) => {
    setSelectedImagenesGaleria({ imagenes, cargo, periodo, hallazgo });
    setCurrentImageIndex(0);
    setGaleriaImagenesModalOpen(true);
  };

  // Función para descargar archivo
  const handleDownloadFile = (fileName: string) => {
    console.log(`Descargando archivo: ${fileName}`);
  };

  const masterCheckboxRef = useRef<HTMLInputElement | null>(null);
  const showRowCheckboxColumn = true;
  const selectedRowCount = selectedRows.size;
  const getRowKey = (row: Record<string, any>) => String(
    row.id ??
    row.radicado ??
    row.acto ??
    row.pliego ??
    row.codigo ??
    row.numero ??
    JSON.stringify(row)
  );
  const toggleRowSelection = (rowKey: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  };
  useEffect(() => {
    setSelectedRows(new Set());
  }, [moduleTitle]);

  const filterableColumns = React.useMemo(() => columns.filter((col) => col.filterable), [columns]);
  const hasPliegoColumn = React.useMemo(() => columns.some((col) => col.key === "pliego"), [columns]);
  const activeFilterCount = Object.values(columnFilters).filter((v) => v && v !== "__all__").length + (pliegoDateFilter ? 1 : 0);
  const handleSort = (columnKey: string) => {
    setCurrentPage(1);
    setSortColumn((prevColumn) => {
      if (prevColumn === columnKey) {
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
        return prevColumn;
      }
      setSortDirection("asc");
      return columnKey;
    });
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const extractPliegoDateKey = (value: unknown): string | null => {
    if (typeof value !== "string") return null;
    const match = value.match(/(\d{4})-(\d{2})-(\d{2})$/) || value.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return null;
    return `${match[1]}-${match[2]}-${match[3]}`;
  };

  // CRITICAL: This function MUST return false for ANY empty or invalid value
  const isValidFilterValue = (value: any): value is string => {
    // Step 1: Check for null/undefined explicitly
    if (value === null || value === undefined) return false;

    // Step 2: Must be a string
    if (typeof value !== 'string') return false;

    // Step 3: Cannot be literally empty string
    if (value === '') return false;

    // Step 4: Cannot be whitespace only
    const trimmed = value.trim();
    if (trimmed === '') return false;

    // Step 5: Cannot be string versions of invalid values
    if (trimmed === "undefined" || trimmed === "null") return false;

    // Passed all checks - "N/A" and other placeholders ARE valid filter options
    return true;
  };

  const filterOptions = React.useMemo(() => {
    const opts: Record<string, string[]> = {};
    filterableColumns.forEach((col) => {
      const vals = new Set<string>();
      data.forEach((row) => {
        const raw = row[col.key];

        // Skip undefined, null, empty strings immediately
        if (raw === null || raw === undefined || raw === "") {
          return;
        }

        if (typeof raw === "boolean") {
          vals.add(raw ? "Si" : "No");
        } else if (Array.isArray(raw)) {
          // Handle arrays: extract individual items
          if (raw.length > 0) {
            raw.forEach(item => {
              if (item !== null && item !== undefined && item !== "") {
                const itemStr = String(item);
                if (isValidFilterValue(itemStr)) {
                  vals.add(itemStr);
                }
              }
            });
          }
        } else {
          const stringVal = String(raw);
          if (isValidFilterValue(stringVal)) {
            vals.add(stringVal);
          }
        }
      });

      // Filtro final con validación estricta
      opts[col.key] = Array.from(vals)
        .filter(isValidFilterValue)
        .sort();
    });

    return opts;
  }, [data, filterableColumns]);

  const filteredData = data.filter((row) => {
    const matchesSearch = searchTerm === "" || Object.values(row).some((v) => String(v).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilters = Object.entries(columnFilters).every(([key, filterVal]) => {
      // Ignorar valores vacíos o inválidos
      if (!filterVal || filterVal === "" || filterVal === "__all__") return true;
      const raw = row[key];
      if (typeof raw === "boolean") return (raw ? "Si" : "No") === filterVal;
      return String(raw) === filterVal;
    });
    const matchesPliegoDate = !pliegoDateFilter || !hasPliegoColumn || (() => {
      const rowPliegoDate = extractPliegoDateKey(row.pliego);
      if (!rowPliegoDate) return false;
      return rowPliegoDate === formatDateKey(pliegoDateFilter);
    })();
    return matchesSearch && matchesFilters && matchesPliegoDate;
  });

  const filteredRowKeys = React.useMemo(
    () => filteredData.map((row) => getRowKey(row)),
    [filteredData]
  );
  const allFilteredRowsSelected = filteredRowKeys.length > 0 && filteredRowKeys.every((rowKey) => selectedRows.has(rowKey));
  const someFilteredRowsSelected = !allFilteredRowsSelected && filteredRowKeys.some((rowKey) => selectedRows.has(rowKey));
  const toggleSelectAllFilteredRows = (checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRowKeys.forEach((rowKey) => {
        if (checked) next.add(rowKey);
        else next.delete(rowKey);
      });
      return next;
    });
  };
  useEffect(() => {
    if (masterCheckboxRef.current) {
      masterCheckboxRef.current.indeterminate = someFilteredRowsSelected;
    }
  }, [someFilteredRowsSelected, allFilteredRowsSelected]);

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn] ?? "";
      const bValue = b[sortColumn] ?? "";
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const clearAllFilters = () => { setColumnFilters({}); setPliegoDateFilter(undefined); setSearchTerm(""); setCurrentPage(1); };

  const totalPages = Math.ceil(sortedData.length / Number(pageSize));
  const paginatedData = sortedData.slice((currentPage - 1) * Number(pageSize), currentPage * Number(pageSize));

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-primary" style={{ ...headingBold, fontSize: "clamp(var(--text-lg), 4vw, var(--text-2xl))" }}>Resultados del analisis</h2>
        <p className="text-muted-foreground mt-1" style={bodyXs}>{filteredData.length} registro(s) encontrado(s)</p>
      </div>
      <div className="flex flex-wrap items-start gap-x-3 gap-y-5 md:gap-x-4 md:gap-y-6">
        {/* Búsqueda */}
        <div className="relative w-full sm:w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 h-[48px] md:h-[52px] w-full border-2 border-border hover:border-foreground focus:border-primary rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}
          />
          <span className="absolute -top-2.5 left-3 px-1 bg-background text-foreground pointer-events-none" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-normal)", lineHeight: "1" }}>
            Buscar
          </span>
        </div>
        {/* Fecha del pliego */}
        {hasPliegoColumn && (
          <div className="relative w-full sm:w-[190px]">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-[48px] md:h-[52px] w-full border-2 border-border hover:border-foreground focus:border-primary rounded-lg bg-background text-left px-4 md:px-6 transition-colors",
                    pliegoDateFilter && "border-primary pr-14 md:pr-16"
                  )}
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}
                >
                  <span className={cn(pliegoDateFilter ? "text-foreground" : "text-muted-foreground")}>
                    {pliegoDateFilter ? formatDateKey(pliegoDateFilter) : "Selecciona una fecha"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={pliegoDateFilter}
                  onSelect={(date) => { setPliegoDateFilter(date); setCurrentPage(1); }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {pliegoDateFilter && (
              <button
                type="button"
                className="absolute right-8 top-1/2 -translate-y-1/2 text-primary hover:text-primary/70 transition-colors p-1 z-10"
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setPliegoDateFilter(undefined); setCurrentPage(1); }}
                aria-label="Limpiar fecha del pliego"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <span className={cn(
              "absolute -top-2.5 left-3 px-1 bg-background transition-colors pointer-events-none",
              pliegoDateFilter ? "text-primary" : "text-foreground"
            )} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-normal)", lineHeight: "1" }}>
              Fecha del pliego
            </span>
          </div>
        )}
        {/* Filtros por columna */}
        {filterableColumns.map((col) => {
          const isSelected = !!(columnFilters[col.key] && columnFilters[col.key] !== "__all__");
          const isWide = col.header.toLowerCase().includes("medio") || col.header.toLowerCase().includes("notif") || col.header.toLowerCase().includes("entrega");
          return (
            <div key={col.key} className={cn("relative w-full", isWide ? "sm:w-[230px]" : "sm:w-[190px]")}>
              <Select
                value={(() => {
                  const currentValue = columnFilters[col.key];
                  // Ensure value is NEVER empty or invalid
                  if (!currentValue || currentValue === "" || (typeof currentValue === 'string' && currentValue.trim() === "")) {
                    return "__all__";
                  }
                  // Double check the value is valid
                  if (!isValidFilterValue(currentValue) && currentValue !== "__all__") {
                    return "__all__";
                  }
                  return currentValue;
                })()}
                onValueChange={(v) => {
                  // CRITICAL: Prevent ANY empty value from being set
                  if (!v || v === "" || (typeof v === 'string' && v.trim() === "")) {
                    return;
                  }
                  setColumnFilters((prev) => ({ ...prev, [col.key]: v }));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className={cn(
                  "h-[48px] md:h-[52px] border-2 border-border hover:border-foreground data-[state=open]:border-primary text-foreground transition-colors rounded-lg bg-background px-4",
                  isSelected && "border-primary pr-10"
                )} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}>
                  <SelectValue placeholder="Selecciona una opcion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__" className="focus:bg-primary/10 focus:text-primary text-foreground cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>Todos</SelectItem>
                  {(() => {
                    const options = filterOptions[col.key];
                    if (!options || !Array.isArray(options) || options.length === 0) {
                      return null;
                    }

                    // Filter to ensure only valid values (matches isValidFilterValue logic)
                    return options
                      .filter((val) => {
                        if (val === null || val === undefined) return false;
                        if (typeof val !== 'string') return false;
                        if (val === '' || val.trim() === '') return false;
                        if (val.trim() === "undefined" || val.trim() === "null") return false;
                        return true;
                      })
                      .map((val) => (
                        <SelectItem
                          key={val}
                          value={val}
                          className="focus:bg-primary/10 focus:text-primary text-foreground cursor-pointer"
                          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}
                        >
                          {val}
                        </SelectItem>
                      ));
                  })()}
                </SelectContent>
              </Select>
              {isSelected && (
                <span
                  role="button"
                  tabIndex={0}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-primary hover:text-primary/70 transition-colors p-1 cursor-pointer z-10"
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setColumnFilters((prev) => ({ ...prev, [col.key]: "__all__" })); setCurrentPage(1); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setColumnFilters((prev) => ({ ...prev, [col.key]: "__all__" })); setCurrentPage(1); } }}
                  aria-label="Limpiar filtro"
                >
                  <X className="w-4 h-4" />
                </span>
              )}
              <span className={cn(
                "absolute -top-2.5 left-3 px-1 bg-background transition-colors pointer-events-none",
                isSelected ? "text-primary" : "text-foreground"
              )} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-normal)", lineHeight: "1" }}>
                {col.header}
              </span>
            </div>
          );
        })}
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="flex items-center gap-1.5 text-destructive hover:text-destructive/80 transition-colors h-[48px] md:h-[52px] px-2 self-end" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}>
            <XCircle className="w-4 h-4" /><span className="whitespace-nowrap">Limpiar todo</span>
          </button>
        )}
        {/* Botones de acción */}
        <div className="flex gap-2 md:gap-3 sm:ml-auto self-end">
          <Button variant="outline" className="h-[44px] md:h-[48px] border-2 border-border hover:border-primary text-foreground hover:text-primary rounded-lg gap-2 px-4 md:px-5" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }} onClick={() => setShowResetConfirm(true)}>
            <FileSpreadsheet className="w-4 h-4" /><span className="hidden sm:inline">Nuevo analisis</span><span className="sm:hidden">Nuevo</span>
          </Button>
          <Button className="h-[44px] md:h-[48px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2 px-4 md:px-5" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }} onClick={() => setShowExportConfirm(true)}>
            <Download className="w-4 h-4" /><span className="hidden sm:inline">Exportar Excel</span><span className="sm:hidden">Exportar</span>
          </Button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-border">
        {/* Vista de tabla para desktop */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow className="border-none hover:bg-secondary">
                {showRowCheckboxColumn && (
                  <TableHead className="h-12 md:h-14 text-secondary-foreground whitespace-nowrap pl-4 md:pl-6 pr-2 w-10">
                    <input
                      ref={masterCheckboxRef}
                      type="checkbox"
                      checked={allFilteredRowsSelected}
                      onChange={(e) => toggleSelectAllFilteredRows(e.target.checked)}
                      style={{
                        width: 16,
                        height: 16,
                        cursor: "pointer",
                        accentColor: "var(--primary)"
                      }}
                      aria-label="Seleccionar todas las filas filtradas"
                    />
                  </TableHead>
                )}
                {columns.map((col, colIdx) => {
                  const isSortedColumn = sortColumn === col.key;
                  return (
                    <TableHead
                      key={`header-${col.key}-${colIdx}`}
                      className="h-12 md:h-14 text-secondary-foreground whitespace-nowrap first:pl-4 md:first:pl-6 last:pr-4 md:last:pr-6 select-none"
                      style={{ ...headingBold, fontSize: "var(--text-xs)" }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSort(col.key);
                          }}
                          className="inline-flex items-center justify-center w-5 h-5 rounded-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          aria-label={`Ordenar por ${col.header}`}
                          title={`Ordenar por ${col.header}`}
                        >
                          {isSortedColumn ? (
                            sortDirection === "asc"
                              ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
                              : <ChevronDown className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {col.header === "Documento" || col.headerTooltip ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex items-center gap-1.5 cursor-help">
                                  {col.header}
                                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs" style={bodyXs}>
                                <p>{col.header === "Documento" ? "Estos documentos vienen de la carpeta de la notificación de Integratic /radicado + todos los archivos asociados/" : col.headerTooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          col.header
                        )}
                      </span>
                    </TableHead>
                  );
                })}
                <TableHead className="h-12 md:h-14 text-secondary-foreground whitespace-nowrap pr-4 md:pr-6 text-left" style={{ ...headingBold, fontSize: "var(--text-xs)" }}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1.5 cursor-help">
                          Acciones
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs" style={bodyXs}>
                        <p>Opciones operativas habilitadas dentro del sistema respecto del registro correspondiente.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow><TableCell colSpan={columns.length + 1 + (showRowCheckboxColumn ? 1 : 0)} className="h-32 text-center text-muted-foreground" style={bodyBase}>No se encontraron resultados</TableCell></TableRow>
              ) : paginatedData.map((row) => {
                const rowKey = getRowKey(row);
                const hasDocuments = row.documentos && row.documentos.archivos && row.documentos.archivos.length > 0;
                const isRUESInactive = row.estadoRUES && row.estadoRUES !== "Activa";
                const hasDescargos = row.descargos && row.descargos.length > 0;
                const hasPruebas = row.pruebas && row.pruebas.length > 0;
                const hasEventos = Array.isArray(row.eventos) && row.eventos.length > 0;
                const isExpandable = hasDescargos || hasPruebas || hasEventos;
                const isExpanded = expandedRows.has(row.id);

                return (
                  <React.Fragment key={rowKey}>
                    <TableRow
                      className={cn("hover:bg-muted/5 border-b border-border/40", isRUESInactive && "bg-[#FEF3C7]")}
                      title={isRUESInactive ? "Archivo automático por estado RUES" : undefined}
                    >
                      {showRowCheckboxColumn && (
                        <TableCell className="py-4 md:py-5 pl-4 md:pl-6 pr-2 w-10">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(rowKey)}
                            onChange={() => toggleRowSelection(rowKey)}
                            style={{
                              width: 16,
                              height: 16,
                              cursor: "pointer",
                              accentColor: "var(--primary)"
                            }}
                            aria-label={`Seleccionar fila ${row.pliego || row.radicado || row.acto || rowKey}`}
                          />
                        </TableCell>
                      )}
                      {columns.map((col, colIdx) => (
                        <TableCell key={`cell-${rowKey}-${col.key}-${colIdx}`} className={cn("py-4 md:py-5 text-foreground first:pl-4 md:first:pl-6 last:pr-4 md:last:pr-6", (col.truncate && col.key === "resumenDescargo") || (col.truncate && col.key === "resumenAlegato") ? "max-w-[300px]" : "whitespace-nowrap max-w-[200px] md:max-w-[250px] truncate")} style={bodyXs}>
                          {col.key === "documentos" && hasDocuments ? (
                            <button
                              onClick={() => {
                                const identifier = row.pliego || row.radicado || row.acto || "Registro";
                                let docTitulo = "Documentos";
                                if (moduleTitle.includes("Notificacion")) docTitulo = "Documentos de Notificación";
                                else if (moduleTitle.includes("Descargos")) docTitulo = "Documentos de Descargos";
                                else if (moduleTitle.includes("Actos")) docTitulo = "Documentos del Acto de Prueba";
                                else if (moduleTitle.includes("Alegatos")) docTitulo = "Documentos de Alegatos";
                                else if (moduleTitle.includes("Cumplimiento")) docTitulo = "Documentos de Cumplimiento";
                                handleOpenDocumentos(row.documentos.archivos, identifier, docTitulo);
                              }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-lg transition-colors duration-200 w-fit"
                              style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                            >
                              <Folder className="w-3.5 h-3.5" />
                              Ver docs
                              <Badge className="bg-white/90 text-primary border-none px-2 py-0 ml-1" style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)" }}>
                                {row.documentos.archivos.length}
                              </Badge>
                            </button>
                          ) : col.expandable && col.key === "eventos" ? (
                            !hasEventos ? (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/30 text-muted-foreground rounded-md opacity-60 cursor-not-allowed" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                                <XCircle className="w-3.5 h-3.5" />
                                Sin eventos
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  const newExpanded = new Set(expandedRows);
                                  if (newExpanded.has(row.id)) newExpanded.delete(row.id);
                                  else newExpanded.add(row.id);
                                  setExpandedRows(newExpanded);
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200"
                                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                              >
                                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
                                {`${row.eventos.length} evento${row.eventos.length !== 1 ? "s" : ""}`}
                              </button>
                            )
                          ) : col.expandable && col.key === "pruebasAsociadas" ? (
                            typeof row[col.key] === "number" && row[col.key] === 0 ? (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/30 text-muted-foreground rounded-md opacity-60 cursor-not-allowed" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                                <XCircle className="w-3.5 h-3.5" />
                                Sin pruebas
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  const newExpanded = new Set(expandedRows);
                                  if (newExpanded.has(row.id)) {
                                    newExpanded.delete(row.id);
                                  } else {
                                    newExpanded.add(row.id);
                                  }
                                  setExpandedRows(newExpanded);
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200"
                                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                              >
                                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
                                {typeof row[col.key] === "number" ? (
                                  row[col.key] === 0 ? "Sin pruebas" : `${row[col.key]} prueba${row[col.key] !== 1 ? 's' : ''}`
                                ) : typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key]}
                              </button>
                            )
                          ) : col.expandable && col.key === "pruebas" && moduleTitle.includes("Alegatos") ? (
                            // Módulo 4: Alegatos de Conclusión - columna expandible de pruebas
                            (() => {
                              const hasPruebas = row.pruebas && row.pruebas.length > 0;
                              const canExpand = row.alegatosEncontrados && hasPruebas;
                              return (
                                <div className="flex items-center gap-2 max-w-[130px]">
                                  <button
                                    onClick={() => {
                                      if (canExpand) {
                                        const newExpanded = new Set(expandedRows);
                                        if (newExpanded.has(row.id)) {
                                          newExpanded.delete(row.id);
                                        } else {
                                          newExpanded.add(row.id);
                                        }
                                        setExpandedRows(newExpanded);
                                      }
                                    }}
                                    disabled={!canExpand}
                                    className={cn(
                                      "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors duration-200",
                                      hasPruebas ? "bg-primary/10 hover:bg-primary/15 text-primary" : "bg-muted/30 text-muted-foreground cursor-default"
                                    )}
                                    style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                    aria-disabled={!canExpand}
                                  >
                                    {canExpand && (isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />)}
                                    {hasPruebas ? `${row.pruebas.length} prueba${row.pruebas.length > 1 ? 's' : ''}` : "Sin pruebas"}
                                  </button>
                                  <div className="relative group">
                                    <AlertTriangle className="w-3.5 h-3.5 text-chart-4" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                                      <div className="bg-foreground text-background text-xs rounded px-2 py-1 whitespace-nowrap">
                                        ⚠ Los alegatos no son momento probatorio
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()
                          ) : col.truncate && col.key === "resumenDescargo" ? (
                            <div className="flex items-center gap-2">
                              <span className="text-foreground" style={bodyXs}>
                                {row[col.key] && row[col.key] !== "Sin descargos presentados" ? "Sí" : "No"}
                              </span>
                              {row[col.key] && row[col.key] !== "Sin descargos presentados" && (
                                <button
                                  onClick={() => {
                                    const identifier = row.radicado || row.pliego || row.acto || "Registro";
                                    handleOpenResumenDescargo(
                                      row.resumenCompletoDescargo || row[col.key],
                                      row.documentos?.archivos || [],
                                      identifier
                                    );
                                  }}
                                  className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200"
                                  style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Ver documentos
                                </button>
                              )}
                            </div>
                          ) : col.truncate && col.key === "resumenAlegato" && moduleTitle.includes("Alegatos") ? (
                            // Módulo 4: Resumen de alegato con modal - mejorado
                            !row.alegatosEncontrados ? (
                              <span className="text-muted-foreground italic" style={bodyXs}>N/A</span>
                            ) : (
                              <div className="max-w-[300px]">
                                <div className="bg-muted/20 border border-border rounded-lg p-3 space-y-2">
                                  <p
                                    className="text-foreground line-clamp-3"
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "13px",
                                      fontWeight: "var(--font-weight-normal)",
                                      lineHeight: "1.6"
                                    }}
                                  >
                                    {row[col.key]}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setResumenModalOpen(true);
                                      setSelectedResumen(row);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200 w-full justify-center"
                                    style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: "var(--font-weight-medium)" }}
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    Ver alegato completo
                                  </button>
                                </div>
                              </div>
                            )
                          ) : col.truncate && col.key === "resumenDescargos" && moduleTitle.includes("Actos") ? (
                            // Módulo 3: Resumen de descargos con modal
                            row[col.key] === "Sin descargos presentados" || !row[col.key] ? (
                              <span className="text-muted-foreground italic" style={bodyXs}>Sin resumen</span>
                            ) : (
                              <div className="max-w-[250px]">
                                <p
                                  className="text-muted-foreground line-clamp-2"
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "13px",
                                    fontWeight: "var(--font-weight-normal)",
                                    lineHeight: "1.5"
                                  }}
                                >
                                  {row[col.key]}
                                </p>
                                <button
                                  onClick={() => {
                                    setResumenModalOpen(true);
                                    setSelectedResumen({
                                      resumenCompleto: row[col.key],
                                      documentos: row.documentos?.archivos || [],
                                      radicado: row.acto
                                    });
                                  }}
                                  className="text-primary hover:underline text-xs mt-0.5"
                                  style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: "var(--font-weight-normal)" }}
                                >
                                  ...Ver más
                                </button>
                              </div>
                            )
                          ) : col.key === "cargosFormulados" ? (
                            <button
                              onClick={() => handleOpenValidation(row.acto, row.estadoRUES, row.pliego)}
                              className="hover:opacity-80 cursor-pointer text-left transition-opacity"
                              title="Click para ver validación completa"
                            >
                              {col.render ? col.render(row[col.key], row) : (typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key])}
                            </button>
                          ) : col.key === "hallazgosSER" ? (
                            // Para Módulo 3 (objeto con cargos) o Módulo 5 (clickeable)
                            typeof row.hallazgosSER === 'object' && row.hallazgosSER?.cargos ? (
                              <button
                                onClick={() => handleOpenHallazgosSER(row.hallazgosSER, row.acto, row.pliego, row.estadoRUES)}
                                className="hover:opacity-80 cursor-pointer text-left transition-opacity"
                                title="Click para ver hallazgos del SER"
                              >
                                {col.render ? col.render(row[col.key], row) : <span style={bodyXs}>Sin datos</span>}
                              </button>
                            ) : moduleTitle.includes("Cumplimiento") ? (
                              <button
                                onClick={() => handleOpenValidation(row.acto || "", row.estadoRUES, row.pliego)}
                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                title="Click para ver validación completa"
                              >
                                <ClipboardCheck className="w-3.5 h-3.5" />
                                {String(row.hallazgosSER || 'Ver validación completa')}
                              </button>
                            ) : (
                              <span style={bodyXs}>{String(row.hallazgosSER || 'N/A')}</span>
                            )
                          ) : col.key === "validacionCompleta" ? (
                            <button
                              onClick={() => handleOpenCumplimiento(row.acto, row.operador, row.estadoRUES)}
                              className="flex items-center gap-2 text-chart-2 hover:text-chart-2/80 transition-colors font-medium"
                              style={bodyXs}
                              title="Click para ver validación completa por cargo y periodo"
                            >
                              <ClipboardCheck className="w-3.5 h-3.5" />
                              {typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key]}
                            </button>
                          ) : col.render ? col.render(row[col.key], row) : (
                            typeof row[col.key] === 'object' && row[col.key] !== null
                              ? <span style={bodyXs}>-</span>
                              : row[col.key]
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-right pr-4 md:pr-6 py-4 md:py-5 whitespace-nowrap">
                        <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-transparent gap-1 md:gap-2 h-auto p-0 text-xs" style={bodyXs}>
                          <Download className="h-3.5 w-3.5 md:h-4 md:w-4" /><span className="hidden sm:inline">Descargar</span>
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Fila expandida con timeline de eventos de notificación */}
                    {isExpanded && hasEventos && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1 + (showRowCheckboxColumn ? 1 : 0)} className="bg-muted/10 p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <h4 className="text-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                                Trazabilidad de la notificación · {row.pliego}
                              </h4>
                              <span className="text-muted-foreground" style={bodyXs}>
                                {row.eventos.length} evento{row.eventos.length !== 1 ? "s" : ""} registrados
                              </span>
                            </div>
                            <ol className="relative border-l-2 border-border ml-2 space-y-3">
                              {row.eventos.map((ev: any, idx: number) => {
                                const tipoVariants: Record<string, { variant: "info" | "success" | "warning" | "destructive" | "neutral"; icon: React.ReactNode }> = {
                                  "Citación": { variant: "info", icon: <FileCheck className="w-3 h-3" /> },
                                  "Envío electrónico": { variant: "info", icon: <FileText className="w-3 h-3" /> },
                                  "Entrega física": { variant: "info", icon: <FileText className="w-3 h-3" /> },
                                  "Devolución": { variant: "destructive", icon: <XOctagon className="w-3 h-3" /> },
                                  "Relanzamiento": { variant: "warning", icon: <Clock className="w-3 h-3" /> },
                                  "Aviso": { variant: "warning", icon: <AlertTriangle className="w-3 h-3" /> },
                                  "Notificación efectiva": { variant: "success", icon: <CheckCircle2 className="w-3 h-3" /> },
                                };
                                const cfg = tipoVariants[ev.tipo] || { variant: "neutral" as const, icon: <Clock className="w-3 h-3" /> };
                                const dotColor: Record<string, string> = {
                                  info: "bg-primary border-primary",
                                  success: "bg-chart-2 border-chart-2",
                                  warning: "bg-chart-4 border-chart-4",
                                  destructive: "bg-destructive border-destructive",
                                  neutral: "bg-muted-foreground border-muted-foreground",
                                };
                                return (
                                  <li key={ev.id || idx} className="ml-4 relative">
                                    <span className={cn("absolute -left-[1.45rem] top-1.5 w-3 h-3 rounded-full border-2 border-background", dotColor[cfg.variant])} aria-hidden />
                                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                                      <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>{ev.fecha}</span>
                                          <StatusBadge label={ev.tipo} variant={cfg.variant} icon={cfg.icon} />
                                          {ev.medio && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted/40 text-muted-foreground rounded-md" style={{ ...bodyXs, fontSize: "11px" }}>
                                              {ev.medio === "Correo electrónico" ? <FileText className="w-3 h-3 text-primary" /> : <FileText className="w-3 h-3" />}
                                              {ev.medio}
                                            </span>
                                          )}
                                        </div>
                                        {ev.usuario && (
                                          <span className="text-muted-foreground" style={{ ...bodyXs, fontSize: "11px" }}>
                                            <User className="w-3 h-3 inline mr-1" />{ev.usuario}
                                          </span>
                                        )}
                                      </div>
                                      {ev.direccion && (
                                        <div className="text-muted-foreground" style={bodyXs}>
                                          <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Dirección/correo:</span> {ev.direccion}
                                        </div>
                                      )}
                                      {ev.resultado && (
                                        <div className="text-muted-foreground" style={bodyXs}>
                                          <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Resultado:</span> {ev.resultado}
                                        </div>
                                      )}
                                      {ev.observacion && (
                                        <div className="text-muted-foreground" style={bodyXs}>
                                          <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Observación:</span> {ev.observacion}
                                        </div>
                                      )}
                                      {ev.documento && (
                                        <button
                                          onClick={() => handleDownloadFile(ev.documento.nombre)}
                                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors w-fit"
                                          style={{ ...bodyXs, fontSize: "11px" }}
                                        >
                                          <Download className="w-3.5 h-3.5" />
                                          {ev.documento.nombre}
                                        </button>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                    {/* Fila expandida con grilla de pruebas */}
                    {isExpanded && row.pruebas && row.pruebas.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1 + (showRowCheckboxColumn ? 1 : 0)} className="bg-muted/10 p-4">
                          <div className="space-y-3">
                            <h4 className="text-foreground font-medium" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                              Detalle de pruebas
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                              {row.pruebas.map((prueba: any) => (
                                <div key={prueba.id} className="bg-card border border-border rounded-lg p-3 space-y-2">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 space-y-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-foreground font-medium" style={bodyXs}>{prueba.nombre}</span>
                                        <StatusBadge
                                          label={prueba.tipo === "anexada" ? "Anexada" : "Solicitada"}
                                          variant={prueba.tipo === "anexada" ? "success" : "info"}
                                        />
                                        <span className="text-muted-foreground text-xs">
                                          Tipo: {prueba.tipoPrueba}
                                        </span>
                                      </div>
                                      {prueba.descripcion && (
                                        <p className="text-muted-foreground text-xs">{prueba.descripcion}</p>
                                      )}
                                    </div>
                                    {prueba.documento && (
                                      <button
                                        onClick={() => handleDownloadFile(prueba.documento.nombre)}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors"
                                        style={{ ...bodyXs, fontSize: "11px" }}
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">{prueba.documento.nombre}</span>
                                        <span className="sm:hidden">Descargar</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Vista de cards para móvil */}
        <div className="md:hidden">
          {paginatedData.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground" style={bodyBase}>
              No se encontraron resultados
            </div>
          ) : (
            <div className="divide-y divide-border">
              {paginatedData.map((row, index) => {
                const hasDocuments = row.documentos && row.documentos.archivos && row.documentos.archivos.length > 0;
                const isRUESInactive = row.estadoRUES && row.estadoRUES !== "Activa";

                return (
                  <div
                    key={row.id || index}
                    className={cn(
                      "p-4 space-y-3",
                      isRUESInactive && "bg-[#FEF3C7]"
                    )}
                  >
                    {isRUESInactive && (
                      <div className="flex items-center gap-2 text-warning mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                          Archivo automático por estado RUES
                        </span>
                      </div>
                    )}

                    {columns.map((col, colIdx) => {
                      if (col.key === "documentos" && !hasDocuments) return null;

                      return (
                        <div key={`mobile-${col.key}-${colIdx}`} className="space-y-1">
                          <div className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                            {col.header}
                          </div>
                          <div className="text-foreground">
                            {col.key === "documentos" && hasDocuments ? (
                              <button
                                onClick={() => {
                                  const identifier = row.pliego || row.radicado || row.acto || "Registro";
                                  let docTitulo = "Documentos";
                                  if (moduleTitle.includes("Notificacion")) docTitulo = "Documentos de Notificación";
                                  else if (moduleTitle.includes("Descargos")) docTitulo = "Documentos de Descargos";
                                  else if (moduleTitle.includes("Actos")) docTitulo = "Documentos del Acto de Prueba";
                                  else if (moduleTitle.includes("Alegatos")) docTitulo = "Documentos de Alegatos";
                                  else if (moduleTitle.includes("Cumplimiento")) docTitulo = "Documentos de Cumplimiento";
                                  handleOpenDocumentos(row.documentos.archivos, identifier, docTitulo);
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/15 text-primary rounded-lg transition-colors duration-200 w-full justify-center"
                                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                              >
                                <Folder className="w-4 h-4" />
                                Ver documentos
                                <Badge className="bg-white/90 text-primary border-none px-2 py-0.5 ml-1" style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)" }}>
                                  {row.documentos.archivos.length}
                                </Badge>
                              </button>
                            ) : col.expandable && col.key === "pruebasAsociadas" ? (
                              <button
                                onClick={() => {
                                  const newExpanded = new Set(expandedRows);
                                  const isExpanded = newExpanded.has(row.id);
                                  if (isExpanded) {
                                    newExpanded.delete(row.id);
                                  } else {
                                    newExpanded.add(row.id);
                                  }
                                  setExpandedRows(newExpanded);
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200 w-fit"
                                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                              >
                                {expandedRows.has(row.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
                                {typeof row[col.key] === "number" ? (
                                  row[col.key] === 0 ? "Sin pruebas" : `${row[col.key]} prueba${row[col.key] !== 1 ? 's' : ''}`
                                ) : typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key]}
                              </button>
                            ) : col.expandable && col.key === "pruebas" && moduleTitle.includes("Alegatos") ? (
                              // Módulo 4 móvil: Pruebas anexadas
                              (() => {
                                const hasPruebas = row.pruebas && row.pruebas.length > 0;
                                const canExpand = row.alegatosEncontrados && hasPruebas;
                                return (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => {
                                        if (canExpand) {
                                          const newExpanded = new Set(expandedRows);
                                          if (newExpanded.has(row.id)) {
                                            newExpanded.delete(row.id);
                                          } else {
                                            newExpanded.add(row.id);
                                          }
                                          setExpandedRows(newExpanded);
                                        }
                                      }}
                                      disabled={!canExpand}
                                      className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors duration-200 w-fit",
                                        hasPruebas ? "bg-primary/10 hover:bg-primary/15 text-primary" : "bg-muted/30 text-muted-foreground cursor-default"
                                      )}
                                      style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                      aria-disabled={!canExpand}
                                    >
                                      {canExpand && (expandedRows.has(row.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />)}
                                      {hasPruebas ? `${row.pruebas.length} prueba${row.pruebas.length > 1 ? 's' : ''}` : "Sin pruebas"}
                                    </button>
                                    <div className="relative group">
                                      <AlertTriangle className="w-3.5 h-3.5 text-chart-4" />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                                        <div className="bg-foreground text-background text-xs rounded px-2 py-1 whitespace-nowrap">
                                          ⚠ Los alegatos no son momento probatorio
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : col.truncate && col.key === "resumenDescargo" ? (
                              <div>
                                <p className="line-clamp-2 text-foreground" style={bodyXs}>
                                  {row[col.key]}
                                </p>
                                {row[col.key] && String(row[col.key]).length > 100 && (
                                  <button
                                    onClick={() => {
                                      const identifier = row.pliego || row.radicado || row.acto || "Registro";
                                      let docTitulo = "Resumen de descargo";
                                      handleOpenDocumentos(row.documentos?.archivos || [], identifier, docTitulo);
                                    }}
                                    className="text-primary hover:text-primary/80 text-xs mt-1 inline-block"
                                  >
                                    ...Ver más
                                  </button>
                                )}
                              </div>
                            ) : col.truncate && col.key === "resumenAlegato" && moduleTitle.includes("Alegatos") ? (
                              // Módulo 4 móvil: Resumen de alegato con modal - mejorado
                              !row.alegatosEncontrados ? (
                                <span className="text-muted-foreground italic" style={bodyXs}>N/A</span>
                              ) : (
                                <div className="bg-muted/20 border border-border rounded-lg p-3 space-y-2">
                                  <p
                                    className="text-foreground line-clamp-3"
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "13px",
                                      fontWeight: "var(--font-weight-normal)",
                                      lineHeight: "1.6"
                                    }}
                                  >
                                    {row[col.key]}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setResumenModalOpen(true);
                                      setSelectedResumen(row);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200 w-full justify-center"
                                    style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: "var(--font-weight-medium)" }}
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    Ver alegato completo
                                  </button>
                                </div>
                              )
                            ) : col.truncate && col.key === "resumenDescargos" && moduleTitle.includes("Actos") ? (
                              // Módulo 3 móvil: Resumen de descargos con modal
                              row[col.key] === "Sin descargos presentados" || !row[col.key] ? (
                                <span className="text-muted-foreground italic" style={bodyXs}>Sin resumen</span>
                              ) : (
                                <div>
                                  <p
                                    className="text-muted-foreground line-clamp-2"
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "13px",
                                      fontWeight: "var(--font-weight-normal)",
                                      lineHeight: "1.5"
                                    }}
                                  >
                                    {row[col.key]}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setResumenModalOpen(true);
                                      setSelectedResumen({
                                        resumenCompleto: row[col.key],
                                        documentos: row.documentos?.archivos || [],
                                        radicado: row.acto
                                      });
                                    }}
                                    className="text-primary hover:underline text-xs mt-1 inline-block"
                                    style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: "var(--font-weight-normal)" }}
                                  >
                                    ...Ver más
                                  </button>
                                </div>
                              )
                            ) : col.key === "pruebasAsociadas" && col.clickable && row.pruebas?.length > 0 ? (
                              <button
                                onClick={() => handleOpenPruebas(row.pruebas || [], row.radicado || row.acto || "N/A", row.descargos || "Sin descargos")}
                                className="hover:opacity-80 cursor-pointer text-left transition-opacity w-full"
                              >
                                {col.render ? col.render(row[col.key], row) : (typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key])}
                              </button>
                            ) : col.key === "cargosFormulados" ? (
                              <button
                                onClick={() => {
                                  if (moduleTitle.includes("Actos de Prueba") && row.hallazgosSER) {
                                    handleOpenValidacionActo(row);
                                  } else {
                                    handleOpenValidation(row.acto, row.estadoRUES, row.pliego);
                                  }
                                }}
                                className="hover:opacity-80 cursor-pointer text-left transition-opacity w-full"
                              >
                                {col.render ? col.render(row[col.key], row) : (typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key])}
                              </button>
                            ) : col.key === "hallazgosSER" ? (
                              <button
                                onClick={() => {
                                  if (moduleTitle.includes("Actos de Prueba") && row.hallazgosSER) {
                                    handleOpenValidacionActo(row);
                                  } else {
                                    handleOpenHallazgosSER(row.hallazgosSER, row.acto, row.pliego, row.estadoRUES);
                                  }
                                }}
                                className="hover:opacity-80 cursor-pointer text-left transition-opacity"
                              >
                                {col.render ? col.render(row[col.key], row) : (typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key])}
                              </button>
                            ) : col.key === "validacionCompleta" ? (
                              <button
                                onClick={() => handleOpenCumplimiento(row.acto, row.operador, row.estadoRUES)}
                                className="flex items-center gap-2 text-chart-2 hover:text-chart-2/80 transition-colors font-medium"
                                style={bodyXs}
                              >
                                <ClipboardCheck className="w-3.5 h-3.5" />
                                {typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key]}
                              </button>
                            ) : col.expandable && col.key === "eventos" ? (
                              !Array.isArray(row.eventos) || row.eventos.length === 0 ? (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/30 text-muted-foreground rounded-md opacity-60 w-fit" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                                  <XCircle className="w-3.5 h-3.5" />
                                  Sin eventos
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    const newExpanded = new Set(expandedRows);
                                    if (newExpanded.has(row.id)) newExpanded.delete(row.id);
                                    else newExpanded.add(row.id);
                                    setExpandedRows(newExpanded);
                                  }}
                                  className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors duration-200 w-fit"
                                  style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                >
                                  {expandedRows.has(row.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
                                  {`${row.eventos.length} evento${row.eventos.length !== 1 ? "s" : ""}`}
                                </button>
                              )
                            ) : (
                              <div style={bodyXs}>
                                {col.render ? col.render(row[col.key], row) : (typeof row[col.key] === "object" && row[col.key] !== null ? null : row[col.key])}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Grilla de pruebas expandida (móvil) */}
                    {expandedRows.has(row.id) && row.pruebas && row.pruebas.length > 0 && (
                      <div className="pt-3 space-y-3 border-t border-border/40 mt-3">
                        <h4 className="text-foreground font-medium" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                          Detalle de pruebas
                        </h4>
                        <div className="space-y-3">
                          {row.pruebas.map((prueba: any) => (
                            <div key={prueba.id} className="bg-card border border-border rounded-lg p-3 space-y-2">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-foreground font-medium" style={bodyXs}>{prueba.nombre}</span>
                                  <StatusBadge
                                    label={prueba.tipo === "anexada" ? "Anexada" : "Solicitada"}
                                    variant={prueba.tipo === "anexada" ? "success" : "info"}
                                  />
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  Tipo: {prueba.tipoPrueba}
                                </div>
                                {prueba.descripcion && (
                                  <p className="text-muted-foreground text-xs">{prueba.descripcion}</p>
                                )}
                                {prueba.documento && (
                                  <button
                                    onClick={() => console.log(`Descargando: ${prueba.documento.nombre}`)}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-md transition-colors w-full justify-center"
                                    style={{ ...bodyXs, fontSize: "11px" }}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    Descargar {prueba.documento.nombre}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-border/40 mt-3">
                      <Button
                        variant="ghost"
                        className="text-foreground hover:text-primary hover:bg-transparent gap-2 h-auto p-0 w-full justify-center py-2"
                        style={bodyXs}
                      >
                        <Download className="h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 md:gap-4 lg:gap-8 text-muted-foreground" style={bodyXs}>
        <div className="flex items-center gap-3">
          <span className="text-foreground" style={bodyXs}>Elementos por pagina</span>
          <Select value={pageSize || "10"} onValueChange={(v) => { if (v && v !== "") { setPageSize(v); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[80px] h-[44px] border-border hover:border-foreground focus:ring-1 focus:ring-ring data-[state=open]:border-primary data-[state=open]:ring-primary text-foreground transition-colors rounded-lg" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((val) => <SelectItem key={val} value={val.toString()} className="focus:bg-primary/10 focus:text-primary text-foreground cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>{val}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <span className="text-foreground" style={bodyXs}>
          {(currentPage - 1) * Number(pageSize) + 1}-{Math.min(currentPage * Number(pageSize), sortedData.length)} de {sortedData.length}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}><ChevronsLeft className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}><ChevronLeft className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}><ChevronRightIcon className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)}><ChevronsRight className="h-5 w-5" /></Button>
        </div>
      </div>

      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-[90vw] w-full md:max-w-[70vw] lg:max-w-[60vw] h-[80vh] sm:h-[75vh] p-0 gap-0 bg-background rounded-xl overflow-hidden flex flex-col border-none outline-none shadow-elevation-sm">
          <DialogTitle className="sr-only">Visor de documento</DialogTitle>
          <DialogDescription className="sr-only">Vista previa del documento seleccionado</DialogDescription>

          {/* Header con Breadcrumb */}
          <div className="bg-card border-b border-border shrink-0">
            <div className="px-4 sm:px-6 py-3 space-y-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto" style={{ ...bodyXs, fontSize: "11px" }}>
                <Home className="w-3 h-3 flex-shrink-0" />
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">Resultados</span>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap truncate text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                  Visor de documento
                </span>
              </div>

              {/* Título */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground truncate" style={{ ...headingBold, fontSize: "clamp(var(--text-sm), 2.5vw, var(--text-lg))" }}>Visor de Documento</h3>
                  <p className="text-muted-foreground mt-0.5 truncate" style={{ ...bodyXs, fontSize: "11px" }}>
                    {selectedRow ? Object.values(selectedRow).find((v) => typeof v === "string" && v.endsWith(".pdf")) || "Documento" : "Documento"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8 bg-card/50">
            <div className="text-center space-y-5 max-w-md mx-auto">
              <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto border border-primary/10">
                <FileText className="h-12 w-12 text-primary/30" />
              </div>
              <div className="space-y-2">
                <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>Vista previa no disponible</p>
                <p className="text-muted-foreground" style={{ ...bodyXs, lineHeight: 1.6 }}>
                  La vista previa del documento se mostrara aqui una vez conectado al servicio de documentos de Integratic.
                </p>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg gap-2 px-6 transition-all duration-200 active:scale-95" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                <Download className="w-4 h-4" />Descargar documento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showResetConfirm}
        onOpenChange={setShowResetConfirm}
        onConfirm={onReset}
        title="Nuevo analisis"
        description="Esta seguro que desea iniciar un nuevo analisis? Los resultados actuales se descartaran y volvera a la pantalla de carga de archivos."
        icon={<AlertCircle className="w-7 h-7" />}
        iconBgClass="bg-primary"
        iconColorClass="text-primary-foreground"
        confirmLabel="Si, nuevo analisis"
        confirmClass="bg-primary hover:bg-primary/90 text-primary-foreground"
        variant="info"
      />

      <ConfirmDialog
        open={showExportConfirm}
        onOpenChange={setShowExportConfirm}
        onConfirm={() => { }}
        title="Exportar resultados"
        description={moduleTitle.includes("Verificacion de Notificacion del Pliego")
          ? `Se generará un archivo Excel con los ${selectedRowCount} registros del análisis de “Verificación de Notificación del Pliego”. ¿Desea continuar con la descarga?\n\nEl documento descargado incluirá la siguiente información: medio de entrega, tipo de notificación, fecha de notificación, si fue o no notificado, y el año, mes y día del pliego.`
          : `Se generara un archivo Excel con los ${selectedRowCount} registro(s) del analisis de "${moduleTitle}". Desea continuar con la descarga?`
        }
        icon={<Download className="w-7 h-7" />}
        iconBgClass="bg-chart-2"
        iconColorClass="text-background"
        confirmLabel="Si, exportar"
        confirmClass="bg-primary hover:bg-primary/90 text-primary-foreground"
        variant="success"
      />

      {selectedDocumentos && (
        <DocumentosModal
          open={documentosModalOpen}
          onOpenChange={setDocumentosModalOpen}
          archivos={selectedDocumentos.archivos}
          pliego={selectedDocumentos.pliego}
          titulo={selectedDocumentos.titulo}
        />
      )}

      {selectedValidation && (
        <ValidationModal
          open={validationModalOpen}
          onOpenChange={setValidationModalOpen}
          acto={selectedValidation.acto}
          estadoRUES={selectedValidation.estadoRUES}
          pliego={selectedValidation.pliego}
        />
      )}

      {selectedPruebas && (
        <Dialog open={pruebasModalOpen} onOpenChange={setPruebasModalOpen}>
          <DialogContent className="w-[800px] max-w-[95vw] max-h-[85vh] p-0 gap-0 bg-background border-2 border-border rounded-xl overflow-hidden outline-none shadow-elevation-sm [&>button]:hidden flex flex-col">
            <DialogTitle className="sr-only">Detalle de pruebas - {selectedPruebas.radicado}</DialogTitle>
            <DialogDescription className="sr-only">Listado completo de pruebas solicitadas y anexadas</DialogDescription>

            {/* Header */}
            <div className="bg-card shrink-0 border-b-2 border-border p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-primary" style={{ ...headingBoldItalic, fontSize: "var(--text-xl)" }}>
                    Detalle de Pruebas
                  </h3>
                  <p className="text-muted-foreground mt-2" style={bodyXs}>
                    <span style={{ fontWeight: "var(--font-weight-medium)" }}>
                      {selectedPruebas.radicado.startsWith("ACT-") ? "Acto:" : "Radicado:"}
                    </span> {selectedPruebas.radicado}
                  </p>
                </div>
                <button
                  onClick={() => setPruebasModalOpen(false)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

              {selectedPruebas.pruebas.length === 0 ? (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <FileQuestion className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground" style={bodyBase}>
                    No se encontraron pruebas asociadas
                  </p>
                </div>
              ) : (
                <>
                  {/* Resumen de pruebas */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <h4 className="text-primary" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                      Resumen
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>Total pruebas</p>
                            <p className="text-foreground mt-1" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-xl)" }}>
                              {selectedPruebas.pruebas.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-chart-2" />
                          </div>
                          <div>
                            <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>Anexadas</p>
                            <p className="text-foreground mt-1" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-xl)" }}>
                              {selectedPruebas.pruebas.filter((p: any) => p.categoriaOrigen === "Anexada").length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <FileQuestion className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>Solicitadas</p>
                            <p className="text-foreground mt-1" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-xl)" }}>
                              {selectedPruebas.pruebas.filter((p: any) => p.categoriaOrigen === "Solicitada").length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Listado de pruebas */}
                  <div className="space-y-4">
                    <h4 className="text-primary" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                      Detalle de Pruebas
                    </h4>
                    <div className="space-y-3">
                      {selectedPruebas.pruebas.map((prueba, idx) => (
                        <div key={prueba.id} className="bg-muted/30 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start gap-2">
                                <p className="text-foreground flex-1" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                  {prueba.descripcion}
                                </p>
                                <Badge
                                  className={cn(
                                    "border-none flex-shrink-0",
                                    prueba.categoriaOrigen === "Anexada" ? "bg-chart-2/10 text-chart-2" : "bg-amber-500/10 text-amber-600"
                                  )}
                                  style={{ fontSize: "10px", fontWeight: "var(--font-weight-medium)" }}
                                >
                                  {prueba.categoriaOrigen}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>
                                    Tipo de prueba
                                  </p>
                                  <div className="mt-1">
                                    <Badge className="bg-primary/10 text-primary border-none" style={{ fontSize: "10px" }}>
                                      {prueba.tipo}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>
                                    Origen
                                  </p>
                                  <div className="mt-1">
                                    <Badge className={cn(
                                      "border-none",
                                      prueba.origen === "Operador" ? "bg-blue-500/10 text-blue-600" :
                                        prueba.origen === "Entidad" ? "bg-amber-500/10 text-amber-600" :
                                          "bg-purple-500/10 text-purple-600"
                                    )} style={{ fontSize: "10px" }}>
                                      {prueba.origen}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>
                                    Estado
                                  </p>
                                  <div className="mt-1">
                                    <Badge className={cn(
                                      "border-none",
                                      prueba.estado === "Decretada" || prueba.estado === "Aportada" ? "bg-green-500/10 text-green-600" :
                                        prueba.estado === "Rechazada" ? "bg-red-500/10 text-red-600" :
                                          prueba.estado === "Desistida" ? "bg-gray-500/10 text-gray-600" :
                                            "bg-blue-500/10 text-blue-600"
                                    )} style={{ fontSize: "10px" }}>
                                      {prueba.estado}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-muted-foreground" style={{ fontSize: "10px", fontFamily: "var(--font-body)" }}>
                                    Documento
                                  </p>
                                  <p className="text-foreground mt-1" style={bodyXs}>
                                    {prueba.documento || "Sin documento"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {prueba.documento && (
                              <button
                                className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/15 text-primary rounded-lg transition-colors h-fit"
                                style={{ fontSize: "10px", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-body)" }}
                              >
                                <Download className="w-3.5 h-3.5" />
                                Descargar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="bg-card shrink-0 border-t-2 border-border p-6 flex justify-end gap-3">
              <button
                onClick={() => setPruebasModalOpen(false)}
                className="h-[44px] px-6 border border-border hover:border-primary text-foreground hover:text-primary rounded-lg transition-colors"
                style={bodyXs}
              >
                Cerrar
              </button>
              <button
                className="h-[44px] px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2 flex items-center"
                style={bodyXs}
              >
                <Download className="w-4 h-4" />
                Exportar detalle
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedCumplimiento && (
        <Dialog open={cumplimientoModalOpen} onOpenChange={setCumplimientoModalOpen}>
          <DialogContent className="max-w-[95vw] w-full md:max-w-[85vw] lg:max-w-[75vw] max-h-[90vh] p-0 gap-0 bg-background rounded-xl overflow-hidden flex flex-col border-none outline-none shadow-elevation-sm">
            <DialogTitle className="sr-only">Validación completa de cumplimiento</DialogTitle>
            <DialogDescription className="sr-only">Detalle completo por cargo y periodo del proceso sancionatorio</DialogDescription>

            {/* Header con Breadcrumb */}
            <div className="bg-card border-b border-border shrink-0">
              <div className="px-4 sm:px-6 py-3 space-y-3">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto" style={{ ...bodyXs, fontSize: "11px" }}>
                  <Home className="w-3 h-3 flex-shrink-0" />
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">Resultados</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">Cumplimiento</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap truncate text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                    Validación completa
                  </span>
                </div>

                {/* Título y Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="h-5 w-5 text-chart-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-foreground" style={{ ...headingBold, fontSize: "clamp(var(--text-base), 3vw, var(--text-lg))" }}>
                        Validación completa de cumplimiento
                      </h3>
                      <p className="text-muted-foreground mt-0.5 truncate" style={{ ...bodyXs, fontSize: "11px" }}>
                        {selectedCumplimiento.acto} - {selectedCumplimiento.operador}
                      </p>
                    </div>
                  </div>
                  {selectedCumplimiento.estadoRUES !== "Activa" && (
                    <Badge
                      className="bg-warning/10 text-warning border-none flex-shrink-0"
                      style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                    >
                      Estado RUES: {selectedCumplimiento.estadoRUES}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6 max-w-6xl mx-auto">
                {/* Nota informativa si RUES no es Activa */}
                {selectedCumplimiento.estadoRUES !== "Activa" && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-sm)" }}>
                        Archivo automático por estado RUES
                      </p>
                      <p className="text-muted-foreground" style={{ ...bodyXs, lineHeight: 1.6 }}>
                        La empresa se encuentra en estado <strong>{selectedCumplimiento.estadoRUES}</strong> según el sistema RUES.
                        De acuerdo con la normativa vigente, se procede al archivo automático del proceso sancionatorio sin importar
                        el resultado de la validación de cargos individuales.
                      </p>
                    </div>
                  </div>
                )}

                {/* Placeholder de cargos - Se implementaría con datos reales */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                      Validación por cargos y periodos
                    </h4>
                  </div>

                  <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <ClipboardCheck className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                        Vista detallada por cargo y periodo
                      </p>
                      <p className="text-muted-foreground max-w-md mx-auto" style={{ ...bodyXs, lineHeight: 1.6 }}>
                        Esta sección mostrará la información consolidada de todas las etapas anteriores,
                        organizada por cada cargo formulado y sus respectivos periodos de evaluación,
                        incluyendo hallazgos SER, descargos, pruebas, alegatos y la recomendación final.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-card shrink-0">
              <Button
                variant="outline"
                onClick={() => setCumplimientoModalOpen(false)}
                className="border-border hover:border-foreground text-foreground rounded-lg gap-2"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                Cerrar
              </Button>
              <Button
                className="bg-chart-2 hover:bg-chart-2/90 text-white rounded-lg gap-2"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                <Download className="w-4 h-4" />
                Exportar validación
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedHallazgosSER && (
        <Dialog open={hallazgosSERModalOpen} onOpenChange={setHallazgosSERModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-[1000px] mx-4 max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl outline-none shadow-elevation-sm [&>button]:hidden">
            <DialogTitle className="sr-only">Hallazgos del SER - {selectedHallazgosSER.acto}</DialogTitle>
            <DialogDescription className="sr-only">Detalle de hallazgos del SER por cargo y periodo</DialogDescription>

            {/* Header */}
            <div className="bg-card border-b-2 border-border p-4 md:p-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto pb-3 mb-3" style={{ ...bodyXs, fontSize: "11px" }}>
                <Home className="w-3 h-3 flex-shrink-0" />
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">Resultados</span>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">Actos de Prueba</span>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                  Hallazgos SER
                </span>
              </div>

              {/* Título */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Database className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-foreground" style={{ ...headingBoldItalic, fontSize: "clamp(var(--text-lg), 4vw, var(--text-2xl))", color: "var(--color-primary)" }}>
                        Hallazgos del SER
                      </h2>
                      <p className="text-muted-foreground mt-0.5" style={bodyXs}>
                        Validación de cumplimiento por cargo y periodo
                      </p>
                    </div>
                  </div>

                  {/* Info del acto */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mt-3" style={bodyXs}>
                    <span>
                      <span style={{ fontWeight: "var(--font-weight-medium)" }}>Pliego:</span> {selectedHallazgosSER.pliego}
                    </span>
                    <span>
                      <span style={{ fontWeight: "var(--font-weight-medium)" }}>Acto:</span> {selectedHallazgosSER.acto}
                    </span>
                    <span>
                      <span style={{ fontWeight: "var(--font-weight-medium)" }}>Estado RUES:</span>{" "}
                      <Badge
                        className={cn(
                          "border-none",
                          (selectedHallazgosSER.estadoRUES === "Liquidada" || selectedHallazgosSER.estadoRUES === "Cancelada" || selectedHallazgosSER.estadoRUES === "En liquidación")
                            ? "bg-destructive/10 text-destructive"
                            : "bg-chart-2/10 text-chart-2"
                        )}
                        style={{ fontSize: "10px" }}
                      >
                        {selectedHallazgosSER.estadoRUES}
                      </Badge>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setHallazgosSERModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nota crítica RUES */}
              {(selectedHallazgosSER.estadoRUES === "Liquidada" || selectedHallazgosSER.estadoRUES === "Cancelada" || selectedHallazgosSER.estadoRUES === "En liquidación") && (
                <div className="mt-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg p-3 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                      Archivo automático por estado RUES
                    </p>
                    <p className="text-muted-foreground" style={{ ...bodyXs, fontSize: "11px" }}>
                      La empresa está en estado "{selectedHallazgosSER.estadoRUES}". No se continúa con validaciones de cargos.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Nota del sistema */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                    Nota sobre el sistema RUES
                  </p>
                  <p className="text-muted-foreground" style={{ ...bodyXs, fontSize: "11px" }}>
                    La conexión al RUES no es 100% en tiempo real. Puede haber un desfase en la actualización de datos.
                  </p>
                </div>
              </div>

              {/* Cargos */}
              {selectedHallazgosSER.cargos && selectedHallazgosSER.cargos.length > 0 ? (
                <div className="space-y-5">
                  {selectedHallazgosSER.cargos.map((cargo: any, cargoIdx: number) => (
                    <div key={cargoIdx} className="border-2 border-border rounded-xl overflow-hidden">
                      {/* Header del cargo */}
                      <div className="bg-card border-b-2 border-border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-foreground mb-2" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                              {cargo.nombre}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground" style={bodyXs}>
                                Recomendación:
                              </span>
                              <Badge
                                className={cn(
                                  "border-none",
                                  cargo.recomendacion === "Se sanciona" && "bg-destructive/10 text-destructive",
                                  cargo.recomendacion === "Se archiva" && "bg-chart-2/10 text-chart-2",
                                  cargo.recomendacion === "Requiere análisis adicional" && "bg-[#F59E0B]/10 text-[#F59E0B]"
                                )}
                                style={{ ...bodyXs, fontSize: "11px" }}
                              >
                                {cargo.recomendacion}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Periodos */}
                      <div className="p-4">
                        {cargo.periodos && cargo.periodos.length > 0 ? (
                          <div className="space-y-3">
                            {cargo.periodos.map((periodo: any, periodoIdx: number) => (
                              <div key={periodoIdx} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                      <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                        {periodo.periodo}
                                      </span>
                                      <Badge
                                        className={cn(
                                          "border-none",
                                          periodo.estado === "Pagó" && "bg-chart-2/10 text-chart-2",
                                          periodo.estado === "No pagó" && "bg-destructive/10 text-destructive",
                                          periodo.estado === "Pagó con sanción" && "bg-[#F59E0B]/10 text-[#F59E0B]",
                                          periodo.estado === "Pagó fuera de tiempo" && "bg-[#F59E0B]/10 text-[#F59E0B]",
                                          periodo.estado === "Subsanó" && "bg-chart-2/10 text-chart-2",
                                          periodo.estado === "Cesó" && "bg-muted text-muted-foreground"
                                        )}
                                        style={{ fontSize: "10px" }}
                                      >
                                        {periodo.estado}
                                      </Badge>
                                    </div>

                                    {periodo.imagenes && periodo.imagenes.length > 0 && (
                                      <div className="flex items-center gap-2 text-muted-foreground" style={bodyXs}>
                                        <ImageIcon className="w-3.5 h-3.5" />
                                        <span>{periodo.imagenes.length} imagen{periodo.imagenes.length !== 1 ? 'es' : ''} del SER</span>
                                      </div>
                                    )}
                                  </div>

                                  {periodo.imagenes && periodo.imagenes.length > 0 && (
                                    <button
                                      className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/15 text-primary rounded-lg transition-colors duration-200 w-full md:w-auto justify-center"
                                      style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                      onClick={() => {
                                        // Aquí se podría abrir un modal de galería de imágenes
                                        alert(`Descargar imágenes del SER para ${periodo.periodo}`);
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                      Descargar imágenes
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-muted/30 rounded-lg p-6 text-center">
                            <FileQuestion className="w-10 h-10 mx-auto mb-2 text-muted-foreground opacity-50" />
                            <p className="text-muted-foreground" style={bodyXs}>
                              No hay periodos registrados para este cargo
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <Database className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground" style={bodyBase}>
                    No se encontraron hallazgos del SER para este acto
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-card shrink-0">
              <Button
                variant="outline"
                onClick={() => setHallazgosSERModalOpen(false)}
                className="border-border hover:border-foreground text-foreground rounded-lg"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                Cerrar
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                <Download className="w-4 h-4" />
                Exportar hallazgos
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal: Resumen completo de descargo/alegato */}
      {selectedResumen && resumenModalOpen && (() => {
        // Detectar si es alegato o descargo
        const esAlegato = selectedResumen.resumenAlegato !== undefined;
        const hayDocumentos = esAlegato
          ? (selectedResumen.documentos?.archivos && selectedResumen.documentos.archivos.length > 0)
          : (selectedResumen.documentos && selectedResumen.documentos.length > 0);

        const documentos = esAlegato
          ? (selectedResumen.documentos?.archivos || [])
          : (selectedResumen.documentos || []);

        const selectedDoc = hayDocumentos ? documentos[selectedDocIndexResumen] : null;
        const textoResumen = esAlegato ? selectedResumen.resumenAlegato : selectedResumen.resumenCompleto;

        // Helper para obtener ícono según tipo de archivo
        const getFileIcon = (tipo: string) => {
          if (tipo === "pdf") return <FileText className="w-5 h-5 text-primary" />;
          if (tipo === "img") return <ImageIcon className="w-5 h-5 text-primary" />;
          return <Paperclip className="w-5 h-5 text-primary" />;
        };

        return (
          <Dialog open={resumenModalOpen} onOpenChange={setResumenModalOpen}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[900px] mx-4 max-h-[85vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl outline-none shadow-elevation-sm [&>button]:hidden flex flex-col">
              <DialogTitle className="sr-only">Descargos - {selectedResumen.radicado}</DialogTitle>
              <DialogDescription className="sr-only">Información de descargos y documentos adjuntos</DialogDescription>

              {/* Header */}
              <div className="bg-card border-b-2 border-border p-4 md:p-6 shrink-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto pb-3 mb-3" style={{ ...bodyXs, fontSize: "11px" }}>
                  <Home className="w-3 h-3 flex-shrink-0" />
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">Resultados</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{esAlegato ? "Alegatos de Conclusión" : "Actos de Prueba"}</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                    {esAlegato ? `Alegato ${selectedResumen.radicado}` : `Descargos ${selectedResumen.radicado}`}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      esAlegato ? "bg-chart-2/10" : "bg-primary/10"
                    )}>
                      {esAlegato ? (
                        <ClipboardCheck className="h-5 w-5 text-chart-2" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-foreground" style={{ ...headingBoldItalic, fontSize: "clamp(var(--text-lg), 3vw, var(--text-xl))", color: esAlegato ? "var(--color-chart-2)" : "var(--color-primary)" }}>
                        {esAlegato ? "Alegato de conclusión" : "Descargos presentados"}
                      </h2>
                      <p className="text-muted-foreground mt-0.5" style={{ ...bodyXs, fontSize: "11px" }}>
                        {selectedResumen.radicado}
                        {esAlegato && selectedResumen.fechaRadicado && ` • ${selectedResumen.fechaRadicado}`}
                        {esAlegato && selectedResumen.acto && ` • ${selectedResumen.acto}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResumenModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nota para alegatos */}
                {esAlegato && (
                  <div className="mt-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg p-3 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <p className="text-muted-foreground" style={{ ...bodyXs, fontSize: "11px" }}>
                      <strong>NOTA IMPORTANTE:</strong> Los alegatos de conclusión NO constituyen momento probatorio formal.
                      Son argumentos finales de defensa presentados por el operador.
                    </p>
                  </div>
                )}
              </div>

              {/* Content */}
              {!hayDocumentos && !textoResumen ? (
                <div className="flex-1 p-6 md:p-8 flex items-center justify-center">
                  <div className="bg-muted/30 rounded-lg p-8 text-center max-w-md">
                    <FileQuestion className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                      {esAlegato ? "Sin alegatos presentados" : "Sin descargos presentados"}
                    </p>
                    <p className="text-muted-foreground mt-2" style={bodyXs}>
                      No se encontraron documentos asociados a este {esAlegato ? "alegato" : "descargo"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 md:p-6 space-y-6">
                    {/* Resumen del texto */}
                    {textoResumen && textoResumen !== "N/A" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                            {esAlegato ? "Resumen generado por IA" : "Resumen de lo argumentado"}
                          </h3>
                        </div>
                        <div className="bg-muted/20 border border-border rounded-lg p-4">
                          <p className="text-foreground" style={{ ...bodyXs, fontSize: "14px", lineHeight: "1.7" }}>
                            {textoResumen}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Documentos/Pruebas anexadas */}
                    {hayDocumentos && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-5 h-5 text-primary" />
                          <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                            {esAlegato ? "Documentos y pruebas anexadas" : "Documentos adjuntos"}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {documentos.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                  <FileText className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-foreground truncate font-medium" style={{ ...bodyXs, fontSize: "13px" }}>
                                    {doc.nombre}
                                  </p>
                                  <p className="text-muted-foreground" style={{ ...bodyXs, fontSize: "11px" }}>
                                    {doc.tamano}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDownloadFile(doc.nombre)}
                                className="p-2 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0 group"
                                title="Descargar documento"
                              >
                                <Download className="w-4 h-4 text-primary group-hover:text-primary/80" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pruebas adicionales para alegatos */}
                    {esAlegato && selectedResumen.pruebas && selectedResumen.pruebas.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-chart-2" />
                          <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                            Pruebas complementarias ({selectedResumen.pruebas.length})
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {selectedResumen.pruebas.map((prueba: any, idx: number) => (
                            <div key={idx} className="border border-border rounded-lg p-3 bg-card hover:border-chart-2/30 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                                  <FileCheck className="w-4 h-4 text-chart-2" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <p className="text-foreground font-medium" style={{ ...bodyXs, fontSize: "13px" }}>
                                    {prueba.nombre}
                                  </p>
                                  {prueba.descripcion && (
                                    <p className="text-muted-foreground" style={{ ...bodyXs, fontSize: "12px" }}>
                                      {prueba.descripcion}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-primary/10 text-primary border-none" style={{ fontSize: "10px" }}>
                                      {prueba.tipoPrueba}
                                    </Badge>
                                    {prueba.tipo && (
                                      <Badge className={cn(
                                        "border-none",
                                        prueba.tipo === "anexada" ? "bg-chart-2/10 text-chart-2" : "bg-[#F97316]/10 text-[#F97316]"
                                      )} style={{ fontSize: "10px" }}>
                                        {prueba.tipo === "anexada" ? "Anexada" : "Solicitada"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-card border-t-2 border-border px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
                <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
                  <button
                    onClick={() => setResumenModalOpen(false)}
                    className="min-w-[100px] bg-muted text-background rounded-lg py-2 px-4 hover:bg-muted/80 active:scale-[0.97] transition-all duration-200 flex items-center justify-center whitespace-nowrap flex-1 sm:flex-initial"
                    style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}
                  >
                    Cerrar
                  </button>
                  {hayDocumentos && documentos.length > 1 && (
                    <Button
                      onClick={() => console.log("Descargar todos los documentos")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex-1 sm:flex-initial min-w-[100px] py-2 px-4 active:scale-[0.97] transition-all duration-200"
                      style={{ fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)" }}
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Descargar todos</span>
                      <span className="sm:hidden">Descargar</span>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}

      {/* Modal: Validación de Acto de Prueba (Módulo 3) */}
      {selectedActoValidacion && validacionActoModalOpen && (
        <Dialog open={validacionActoModalOpen} onOpenChange={setValidacionActoModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-[900px] mx-4 max-h-[85vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl outline-none shadow-elevation-sm [&>button]:hidden">
            <DialogTitle className="sr-only">Validación del Acto {selectedActoValidacion.acto}</DialogTitle>
            <DialogDescription className="sr-only">Detalle completo de cargos, periodos y hallazgos del SER</DialogDescription>

            {/* Header */}
            <div className="bg-card border-b-2 border-border p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-xl)" }}>
                  Validación de Acto {selectedActoValidacion.acto}
                </h2>
                <button
                  onClick={() => setValidacionActoModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Estado RUES y Pliego */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                    Estado RUES:
                  </span>
                  {selectedActoValidacion.estadoRUES === "Activa" ? (
                    <Badge className="inline-flex items-center gap-1.5 bg-chart-2/10 text-chart-2 border-none px-3 py-1" style={bodyBase}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {selectedActoValidacion.estadoRUES}
                    </Badge>
                  ) : (
                    <Badge className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border-none px-3 py-1" style={bodyBase}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {selectedActoValidacion.estadoRUES}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                    Pliego asociado:
                  </span>
                  <span className="text-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                    {selectedActoValidacion.pliego}
                  </span>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Cargos y Periodos */}
              {selectedActoValidacion.hallazgosSER?.cargos?.map((cargo: any, cargoIndex: number) => (
                <div key={cargoIndex} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                      CARGO {cargoIndex + 1}: {cargo.nombre}
                    </h3>
                  </div>

                  {/* Tabla de periodos */}
                  <div className="overflow-x-auto">
                    <table className="w-full border border-border rounded-lg overflow-hidden">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-3 border-b border-border text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                            Periodo
                          </th>
                          <th className="text-left p-3 border-b border-border text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                            Hallazgo SER
                          </th>
                          <th className="text-center p-3 border-b border-border text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                            Imágenes
                          </th>
                          <th className="text-center p-3 border-b border-border text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                            Resultado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cargo.periodos?.map((periodo: any, periodoIndex: number) => {
                          const hallazgoConfig: Record<string, { color: string; bg: string }> = {
                            "No pagó": { color: "#EF4444", bg: "#FEE2E2" },
                            "Pagó": { color: "#10B981", bg: "#D1FAE5" },
                            "Pagó con sanción": { color: "#F59E0B", bg: "#FEF3C7" },
                            "Pagó fuera de tiempo": { color: "#F97316", bg: "#FED7AA" },
                            "Subsanó": { color: "#3B82F6", bg: "#DBEAFE" },
                            "Cesó": { color: "#6B7280", bg: "#F3F4F6" },
                          };
                          const config = hallazgoConfig[periodo.hallazgo] || { color: "#6B7280", bg: "#F3F4F6" };

                          return (
                            <tr key={periodoIndex} className="border-b border-border last:border-0 hover:bg-muted/10">
                              <td className="p-3 text-foreground" style={bodyXs}>{periodo.periodo}</td>
                              <td className="p-3">
                                <Badge
                                  className="border-none px-3 py-1"
                                  style={{
                                    backgroundColor: config.bg,
                                    color: config.color,
                                    ...bodyXs,
                                    fontWeight: "var(--font-weight-medium)"
                                  }}
                                >
                                  {periodo.hallazgo}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                {periodo.imagenes && periodo.imagenes.length > 0 ? (
                                  <button
                                    onClick={() => handleOpenGaleriaImagenes(periodo.imagenes, cargo.nombre, periodo.periodo, periodo.hallazgo)}
                                    className="text-primary hover:text-primary/80 underline"
                                    style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                                  >
                                    Ver ({periodo.imagenes.length})
                                  </button>
                                ) : (
                                  <span className="text-muted-foreground" style={bodyXs}>-</span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {periodo.resultado === "Sanción" ? (
                                  <span className="inline-flex items-center gap-1.5 text-destructive" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                    🔴 Sanción
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-chart-2" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                    🟢 Archivo
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Recomendación del cargo */}
                  <div className={cn(
                    "rounded-lg border-2 p-4",
                    cargo.recomendacion === "Sanción"
                      ? "border-destructive/40 bg-destructive/5"
                      : "border-chart-2/40 bg-chart-2/5"
                  )}>
                    <div className="flex items-start gap-3">
                      {cargo.recomendacion === "Sanción" ? (
                        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1">
                        <p
                          className={cargo.recomendacion === "Sanción" ? "text-destructive" : "text-chart-2"}
                          style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}
                        >
                          RECOMENDACIÓN CARGO {cargoIndex + 1}: {cargo.recomendacion === "Sanción" ? "🔴 Continuar a sanción" : "🟢 Archivo"}
                        </p>
                        <p className="text-muted-foreground" style={bodyXs}>
                          Razón: {cargo.razon}
                        </p>
                      </div>
                    </div>
                  </div>

                  {cargoIndex < selectedActoValidacion.hallazgosSER.cargos.length - 1 && (
                    <div className="border-t border-border" />
                  )}
                </div>
              ))}

              {/* Recomendación final del acto */}
              <div className="border-t-2 border-border pt-6">
                <div className={cn(
                  "rounded-xl border-2 p-6",
                  selectedActoValidacion.hallazgosSER?.recomendacionFinal === "Sanción"
                    ? "border-destructive bg-destructive/5"
                    : "border-chart-2 bg-chart-2/5"
                )}>
                  <div className="text-center space-y-3">
                    <h3
                      className={selectedActoValidacion.hallazgosSER?.recomendacionFinal === "Sanción" ? "text-destructive" : "text-chart-2"}
                      style={{ ...headingBold, fontSize: "var(--text-lg)" }}
                    >
                      {selectedActoValidacion.hallazgosSER?.recomendacionFinal === "Sanción"
                        ? "🔴 CONTINUAR A DECISIÓN DE SANCIÓN"
                        : "🟢 ARCHIVO DEL PROCESO"}
                    </h3>
                    <p className="text-muted-foreground" style={bodyBase}>
                      ({selectedActoValidacion.hallazgosSER?.razonFinal})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-card">
              <Button
                variant="outline"
                onClick={() => setValidacionActoModalOpen(false)}
                className="border-border hover:border-foreground text-foreground rounded-lg"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                Cerrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Sub-modal: Galería de Imágenes SER (Módulo 3) */}
      {selectedImagenesGaleria && galeriaImagenesModalOpen && (
        <Dialog open={galeriaImagenesModalOpen} onOpenChange={setGaleriaImagenesModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-[800px] mx-4 max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl outline-none shadow-elevation-sm [&>button]:hidden">
            <DialogTitle className="sr-only">Imágenes SER - {selectedImagenesGaleria.periodo}</DialogTitle>
            <DialogDescription className="sr-only">Galería de imágenes del sistema SER</DialogDescription>

            {/* Header */}
            <div className="bg-card border-b-2 border-border p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGaleriaImagenesModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title="Volver"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
                    Imágenes SER - {selectedImagenesGaleria.periodo}
                  </h2>
                </div>
                <button
                  onClick={() => setGaleriaImagenesModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Información del hallazgo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                    Cargo:
                  </span>
                  <span className="text-foreground" style={bodyBase}>
                    {selectedImagenesGaleria.cargo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                    Periodo:
                  </span>
                  <span className="text-foreground" style={bodyBase}>
                    {selectedImagenesGaleria.periodo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                    Hallazgo:
                  </span>
                  {(() => {
                    const hallazgoConfig: Record<string, { color: string; bg: string }> = {
                      "No pagó": { color: "#EF4444", bg: "#FEE2E2" },
                      "Pagó": { color: "#10B981", bg: "#D1FAE5" },
                      "Pagó con sanción": { color: "#F59E0B", bg: "#FEF3C7" },
                      "Pagó fuera de tiempo": { color: "#F97316", bg: "#FED7AA" },
                      "Subsanó": { color: "#3B82F6", bg: "#DBEAFE" },
                      "Cesó": { color: "#6B7280", bg: "#F3F4F6" },
                    };
                    const config = hallazgoConfig[selectedImagenesGaleria.hallazgo] || { color: "#6B7280", bg: "#F3F4F6" };
                    return (
                      <Badge
                        className="border-none px-3 py-1"
                        style={{
                          backgroundColor: config.bg,
                          color: config.color,
                          ...bodyBase,
                          fontWeight: "var(--font-weight-medium)"
                        }}
                      >
                        {selectedImagenesGaleria.hallazgo}
                      </Badge>
                    );
                  })()}
                </div>
              </div>

              {/* Imagen actual */}
              <div className="bg-muted/20 rounded-lg border-2 border-border overflow-hidden aspect-video flex items-center justify-center">
                <img
                  src={selectedImagenesGaleria.imagenes[currentImageIndex]?.url}
                  alt={selectedImagenesGaleria.imagenes[currentImageIndex]?.descripcion || `Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Navegación de imágenes */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                  disabled={currentImageIndex === 0}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-foreground" style={{ ...bodyBase, fontWeight: "var(--font-weight-medium)" }}>
                  {currentImageIndex + 1} de {selectedImagenesGaleria.imagenes.length}
                </span>

                <button
                  onClick={() => setCurrentImageIndex(Math.min(selectedImagenesGaleria.imagenes.length - 1, currentImageIndex + 1))}
                  disabled={currentImageIndex === selectedImagenesGaleria.imagenes.length - 1}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Botones de descarga */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleDownloadFile(selectedImagenesGaleria.imagenes[currentImageIndex]?.descripcion || `Imagen_${currentImageIndex + 1}.png`)}
                  variant="outline"
                  className="flex-1 border-border hover:border-primary text-foreground hover:text-primary rounded-lg gap-2"
                  style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                >
                  <Download className="w-4 h-4" />
                  Descargar actual
                </Button>
                <Button
                  onClick={() => console.log('Descargando todas las imágenes...')}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2"
                  style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
                >
                  <Download className="w-4 h-4" />
                  Descargar todas
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-card">
              <Button
                variant="outline"
                onClick={() => setGaleriaImagenesModalOpen(false)}
                className="border-border hover:border-foreground text-foreground rounded-lg"
                style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}
              >
                Cerrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

/* SancionesModule Component */
type Step = "upload" | "processing" | "results";
const STEPS: { key: Step; label: string }[] = [
  { key: "upload", label: "Carga de Excel" },
  { key: "processing", label: "Procesamiento" },
  { key: "results", label: "Resultados" },
];

/* Modal de Galería de Imágenes SER */
function ImageGalleryModal({
  open,
  onOpenChange,
  cargo,
  periodo,
  hallazgo,
  images = []
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cargo: string;
  periodo: string;
  hallazgo: string;
  images?: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length || 3;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[800px] mx-4 max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl overflow-hidden outline-none shadow-elevation-sm [&>button]:hidden">
        <DialogTitle className="sr-only">Galería de Imágenes SER</DialogTitle>
        <DialogDescription className="sr-only">Visualización de evidencias del Sistema de Emisión y Recaudo</DialogDescription>

        <div className="p-4 md:p-6 space-y-4">
          {/* Breadcrumb y botón volver */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto pb-2 border-b border-border" style={{ ...bodyXs, fontSize: "11px" }}>
              <Home className="w-3 h-3 flex-shrink-0" />
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Resultados</span>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Validación</span>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap truncate text-primary" style={{ fontWeight: "var(--font-weight-medium)" }}>
                Imágenes SER
              </span>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              style={bodyXs}
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a validación
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-foreground" style={{ ...headingBold, fontSize: "clamp(var(--text-lg), 4vw, var(--text-xl))" }}>
              Imágenes SER - {periodo}
            </h2>
            <div className="space-y-1">
              <p className="text-muted-foreground" style={bodyXs}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>Cargo:</span> {cargo}
              </p>
              <p className="text-muted-foreground" style={bodyXs}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>Periodo:</span> {periodo}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>Hallazgo:</span>
                <Badge className="bg-destructive/10 text-destructive border-none" style={bodyXs}>{hallazgo}</Badge>
              </div>
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-6 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px] max-h-[60vh]">
            <div className="text-center text-muted-foreground" style={bodyBase}>
              <ImageIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 opacity-50" />
              <p>Imagen de captura SER</p>
              <p className="text-xs mt-1">(Placeholder - integrar con imágenes reales)</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
              disabled={totalImages <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-foreground min-w-[70px] md:min-w-[80px] text-center" style={bodyXs}>
              {currentIndex + 1} de {totalImages}
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
              disabled={totalImages <= 1}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button className="w-full sm:w-auto px-4 py-2 rounded-lg border border-border bg-background hover:bg-card transition-colors text-foreground" style={bodyXs}>
              <Download className="w-4 h-4 inline mr-2" />
              Descargar actual
            </button>
            <button className="w-full sm:w-auto px-4 py-2 rounded-lg border border-border bg-background hover:bg-card transition-colors text-foreground" style={bodyXs}>
              <Download className="w-4 h-4 inline mr-2" />
              Descargar todas
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* Modal de Validación Completa */
function ValidationModal({
  open,
  onOpenChange,
  acto,
  estadoRUES,
  pliego,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  acto: string;
  estadoRUES: string;
  pliego: string;
}) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<{ cargo: string; periodo: string; hallazgo: string } | null>(null);

  // Mock de etapas previas para el módulo 5
  const mockEtapas = [
    { etapa: "Notificación", estado: "✓ Notificado", fecha: "18/Mar" },
    { etapa: "Descargos", estado: "✓ A tiempo", fecha: "25/Mar" },
    { etapa: "Actos prueba", estado: "✓ Comunicado", fecha: "01/Abr" },
    { etapa: "Alegatos", estado: "✓ Presentado", fecha: "05/Abr" },
  ];

  const mockCargos = [
    {
      nombre: "No pagar aportes seguridad social",
      periodos: [
        { periodo: "Trim 1 2024", hallazgo: "No pagó", descargos: "Presentó", pruebas: 3, resultado: "Sanción" },
        { periodo: "Trim 2 2024", hallazgo: "Pagó", descargos: "Presentó", pruebas: 2, resultado: "Archivo" },
        { periodo: "Trim 3 2024", hallazgo: "No pagó", descargos: "Presentó", pruebas: 1, resultado: "Sanción" },
        { periodo: "Trim 4 2024", hallazgo: "Subsanó", descargos: "Presentó", pruebas: 0, resultado: "Archivo" },
      ],
      recomendacion: "SANCIÓN",
      razon: "2 de 4 periodos requieren sanción",
      conducta: "No pago aportes Trim 1 y 3",
      tipo: "sancion"
    },
    {
      nombre: "Deficiencia en reporte de información",
      periodos: [
        { periodo: "Trim 1 2024", hallazgo: "Subsanó", descargos: "Presentó", pruebas: 2, resultado: "Archivo" },
        { periodo: "Trim 2 2024", hallazgo: "Subsanó", descargos: "Presentó", pruebas: 1, resultado: "Archivo" },
      ],
      recomendacion: "ARCHIVO",
      razon: "Todos los periodos subsanados",
      conducta: null,
      tipo: "archivo"
    },
  ];

  const tieneAlgunaSancion = mockCargos.some(c => c.tipo === "sancion");
  const isArchivoAutomatico = estadoRUES !== "Activa";

  // Determinar tipo de sanción y conducta para la recomendación final
  const tipoSancionFinal = tieneAlgunaSancion ? "Multa" : null;
  const conductaFinal = tieneAlgunaSancion ? mockCargos.find(c => c.tipo === "sancion")?.conducta || "" : "";

  const handleOpenImageModal = (cargo: string, periodo: string, hallazgo: string) => {
    setSelectedPeriod({ cargo, periodo, hallazgo });
    setImageModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-[1000px] mx-4 max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-2 border-border rounded-xl outline-none shadow-elevation-sm [&>button]:hidden">
          <DialogTitle className="sr-only">Validación Final - {pliego}</DialogTitle>
          <DialogDescription className="sr-only">Validación completa de cargos y periodos</DialogDescription>

          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2 flex-1 min-w-0">
                <h2 className="text-foreground" style={{ ...headingBold, fontSize: "clamp(var(--text-lg), 4vw, var(--text-2xl))" }}>
                  Validación Final - {pliego}
                </h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Información General */}
            <div className="space-y-2">
              <h3 className="text-foreground uppercase tracking-wider" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                INFORMACIÓN GENERAL
              </h3>
              <div className="border-t-2 border-border pt-3 space-y-2">
                <div className="flex items-center gap-2 text-foreground" style={bodyXs}>
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span style={{ fontWeight: "var(--font-weight-bold)" }}>Operador:</span>
                  <span>Operador Telecomunicaciones S.A.</span>
                </div>
                <div className="flex items-center gap-2 text-foreground" style={bodyXs}>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span style={{ fontWeight: "var(--font-weight-bold)" }}>Pliego:</span>
                  <span>{pliego}</span>
                </div>
                <div className="flex items-center gap-2" style={bodyXs}>
                  <span style={{ fontWeight: "var(--font-weight-bold)" }}>Estado RUES:</span>
                  <StatusBadge
                    label={estadoRUES}
                    variant={estadoRUES === "Activa" ? "success" : "destructive"}
                    icon={estadoRUES === "Activa" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  />
                </div>
              </div>
            </div>

            {/* Resumen de Etapas */}
            <div className="space-y-2">
              <h3 className="text-foreground uppercase tracking-wider" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                RESUMEN DE ETAPAS
              </h3>
              <div className="border-t-2 border-border pt-3">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="px-4 py-2 text-left text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Etapa</th>
                          <th className="px-4 py-2 text-left text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Estado</th>
                          <th className="px-4 py-2 text-left text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockEtapas.map((etapa, idx) => (
                          <tr key={idx} className="border-t border-border">
                            <td className="px-4 py-2 text-foreground" style={bodyXs}>{etapa.etapa}</td>
                            <td className="px-4 py-2">
                              <Badge className="bg-chart-2/10 text-chart-2 border-none" style={bodyXs}>
                                {etapa.estado}
                              </Badge>
                            </td>
                            <td className="px-4 py-2 text-foreground" style={bodyXs}>{etapa.fecha}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vista móvil */}
                  <div className="md:hidden divide-y divide-border">
                    {mockEtapas.map((etapa, idx) => (
                      <div key={idx} className="p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>{etapa.etapa}</span>
                          <span className="text-muted-foreground" style={bodyXs}>{etapa.fecha}</span>
                        </div>
                        <Badge className="bg-chart-2/10 text-chart-2 border-none" style={bodyXs}>
                          {etapa.estado}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {isArchivoAutomatico && (
              <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#92400E]" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                      ⚠ Este caso se archiva automáticamente por estado RUES
                    </p>
                    <p className="text-[#92400E] mt-1" style={bodyXs}>
                      La empresa tiene estado RUES "{estadoRUES}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Validación por Cargo y Periodo */}
            <div className="space-y-2">
              <h3 className="text-foreground uppercase tracking-wider" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                VALIDACIÓN POR CARGO Y PERIODO
              </h3>
              <div className="border-t-2 border-border pt-3 space-y-8">
                {mockCargos.map((cargo, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Folder className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <h4 className="text-foreground" style={{ ...headingBold, fontSize: "clamp(var(--text-base), 3vw, var(--text-lg))" }}>
                        CARGO {idx + 1}: {cargo.nombre}
                      </h4>
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                      {/* Tabla para desktop */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-foreground whitespace-nowrap" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Periodo</th>
                              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-foreground whitespace-nowrap" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Hallazgo</th>
                              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-foreground whitespace-nowrap" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Descargos</th>
                              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-foreground whitespace-nowrap" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Pruebas</th>
                              <th className="px-3 md:px-4 py-2 md:py-3 text-left text-foreground whitespace-nowrap" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>Resultado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cargo.periodos.map((periodo, pIdx) => (
                              <tr key={pIdx} className="border-t border-border">
                                <td className="px-3 md:px-4 py-2 md:py-3 text-foreground whitespace-nowrap" style={bodyXs}>{periodo.periodo}</td>
                                <td className="px-3 md:px-4 py-2 md:py-3">
                                  <Badge
                                    className={cn(
                                      "border-none",
                                      periodo.hallazgo === "No pagó" ? "bg-destructive/10 text-destructive" :
                                        periodo.hallazgo === "Pagó" ? "bg-chart-2/10 text-chart-2" :
                                          periodo.hallazgo === "Subsanó" ? "bg-primary/10 text-primary" :
                                            "bg-muted text-muted-foreground"
                                    )}
                                    style={bodyXs}
                                  >
                                    {periodo.hallazgo}
                                  </Badge>
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3 text-foreground" style={bodyXs}>{periodo.descargos}</td>
                                <td className="px-3 md:px-4 py-2 md:py-3 text-center">
                                  <Badge className="bg-muted/30 text-foreground border-none" style={bodyXs}>
                                    {periodo.pruebas}
                                  </Badge>
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3">
                                  <Badge
                                    className={cn(
                                      "border-none",
                                      periodo.resultado === "Sanción" ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2"
                                    )}
                                    style={bodyXs}
                                  >
                                    {periodo.resultado === "Sanción" ? "🔴" : "🟢"} {periodo.resultado}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Cards para móvil */}
                      <div className="md:hidden divide-y divide-border">
                        {cargo.periodos.map((periodo, pIdx) => (
                          <div key={pIdx} className="p-4 space-y-3">
                            <div className="space-y-1">
                              <div className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                Periodo
                              </div>
                              <div className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
                                {periodo.periodo}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                Hallazgo
                              </div>
                              <div>
                                <Badge
                                  className={cn(
                                    "border-none",
                                    periodo.hallazgo === "No pagó" ? "bg-destructive/10 text-destructive" :
                                      periodo.hallazgo === "Pagó" ? "bg-chart-2/10 text-chart-2" :
                                        periodo.hallazgo === "Pagó sanción" ? "bg-chart-4/10 text-chart-4" :
                                          periodo.hallazgo === "Pagó fuera tiempo" ? "bg-[#F97316]/10 text-[#F97316]" :
                                            periodo.hallazgo === "Subsanó" ? "bg-primary/10 text-primary" :
                                              "bg-muted text-muted-foreground"
                                  )}
                                  style={bodyXs}
                                >
                                  {periodo.hallazgo}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                Imágenes
                              </div>
                              <div>
                                <button
                                  onClick={() => handleOpenImageModal(cargo.nombre, periodo.periodo, periodo.hallazgo)}
                                  className="text-primary hover:text-primary/80 underline"
                                  style={bodyXs}
                                >
                                  Ver imágenes
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-muted-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)" }}>
                                Resultado
                              </div>
                              <div>
                                <Badge
                                  className={cn(
                                    "border-none",
                                    periodo.resultado === "Sanción" ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2"
                                  )}
                                  style={bodyXs}
                                >
                                  {periodo.resultado === "Sanción" ? "🔴" : "🟢"} {periodo.resultado}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={cn(
                      "p-4 rounded-lg border-l-4",
                      cargo.tipo === "sancion" ? "bg-muted/30 border-destructive" : "bg-muted/30 border-chart-2"
                    )}>
                      <p className="text-foreground mb-1" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                        {cargo.tipo === "sancion" ? "🔴" : "🟢"} {cargo.recomendacion}
                      </p>
                      <p className="text-muted-foreground" style={bodyXs}>
                        Razón: {cargo.razon}
                      </p>
                    </div>

                    {idx < mockCargos.length - 1 && <div className="border-t-2 border-border my-6" />}
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMENDACIÓN FINAL - MUY DESTACADA */}
            <div className="space-y-2">
              <h3 className="text-foreground uppercase tracking-wider" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                RECOMENDACIÓN FINAL
              </h3>
              <div className="border-t-2 border-border pt-3">
                <div className={cn(
                  "p-6 md:p-8 rounded-xl text-center space-y-4",
                  tieneAlgunaSancion ? "bg-[#FEE2E2]" : "bg-[#D1FAE5]"
                )} style={{
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: tieneAlgunaSancion ? "#EF4444" : "#10B981"
                }}>
                  <div className="flex justify-center">
                    <div className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center",
                      tieneAlgunaSancion ? "bg-[#EF4444]/20" : "bg-[#10B981]/20"
                    )}>
                      {tieneAlgunaSancion ? (
                        <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-[#EF4444]" />
                      ) : (
                        <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-[#10B981]" />
                      )}
                    </div>
                  </div>

                  <h3 className={cn(
                    "uppercase font-bold",
                    tieneAlgunaSancion ? "text-[#EF4444]" : "text-[#10B981]"
                  )} style={{ ...headingBold, fontSize: "clamp(18px, 4vw, 20px)" }}>
                    {tieneAlgunaSancion ? "🔴 CONTINUAR A DECISIÓN DE SANCIÓN" : "🟢 ARCHIVAR PROCESO"}
                  </h3>

                  <div className="space-y-2 text-left max-w-2xl mx-auto">
                    {tieneAlgunaSancion && tipoSancionFinal && (
                      <p className="text-foreground" style={{ ...bodyBase, lineHeight: 1.6 }}>
                        <span style={{ fontWeight: "var(--font-weight-bold)" }}>Tipo sanción:</span> {tipoSancionFinal}
                      </p>
                    )}
                    {tieneAlgunaSancion && conductaFinal && (
                      <p className="text-foreground" style={{ ...bodyBase, lineHeight: 1.6 }}>
                        <span style={{ fontWeight: "var(--font-weight-bold)" }}>Conducta:</span> {conductaFinal}
                      </p>
                    )}
                    <p className="text-foreground" style={{ ...bodyBase, lineHeight: 1.6 }}>
                      <span style={{ fontWeight: "var(--font-weight-bold)" }}>Fundamento:</span>{" "}
                      {tieneAlgunaSancion
                        ? `Al menos un cargo con sanción (${mockCargos.filter(c => c.tipo === "sancion").map((c, i) => `Cargo ${mockCargos.indexOf(c) + 1}`).join(", ")})`
                        : "Todos los cargos archivados por cumplimiento o subsanación"
                      }
                    </p>
                    {tieneAlgunaSancion && (
                      <p className="text-foreground" style={{ ...bodyBase, lineHeight: 1.6 }}>
                        <span style={{ fontWeight: "var(--font-weight-bold)" }}>Siguiente etapa:</span> Cálculo valor sanción
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => onOpenChange(false)}
                className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-card transition-colors text-foreground w-full sm:w-auto"
                style={bodyBase}
              >
                Cerrar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedPeriod && (
        <ImageGalleryModal
          open={imageModalOpen}
          onOpenChange={setImageModalOpen}
          cargo={selectedPeriod.cargo}
          periodo={selectedPeriod.periodo}
          hallazgo={selectedPeriod.hallazgo}
        />
      )}
    </>
  );
}

/* SancionesLayout */
function SancionesLayout() {
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

/* LoginPage Component */
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); navigate("/sanciones/notificacion-pliego"); };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-3 sm:p-4" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-[900px] bg-card rounded-lg overflow-hidden flex flex-col md:flex-row shadow-elevation-sm">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-10 md:px-12 bg-background">
          <div className="flex flex-col items-center mb-6"><div className="w-[65px] h-[118px] mb-2"><TicLogo /></div></div>
          <h2 className="mb-1 text-center text-secondary" style={{ ...headingBold, fontSize: "var(--text-2xl)" }}>Bienvenido</h2>
          <p className="text-center mb-8 text-muted-foreground" style={bodyXs}>a nuestro sistema de analisis de procesos sancionatorios</p>
          <div className="w-full max-w-[320px] mb-6">
            <p className="text-center mb-3 text-foreground" style={{ ...headingBold, fontSize: "var(--text-xs)" }}>Si es usuario MinTIC Activo</p>
            <button onClick={() => navigate("/sanciones/notificacion-pliego")} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg bg-background text-foreground transition-colors hover:bg-card" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>
              <svg width="20" height="20" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
              INICIAR SESION CON MICROSOFT
            </button>
          </div>
          <div className="w-full max-w-[320px]">
            <p className="text-center mb-4 text-foreground" style={{ ...headingBold, fontSize: "var(--text-xs)" }}>Si es usuario externo</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>Correo Electronico</label>
                <Input type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} inputSize="sm" />
              </div>
              <div>
                <label className="block mb-1 text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>Contrasena</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Contrasena" value={password} onChange={(e) => setPassword(e.target.value)} inputSize="sm" className="pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" size="sm" className="w-full h-[44px] tracking-wider" style={{ ...bodyXs, fontWeight: "var(--font-weight-bold)", letterSpacing: "0.1em" }}>INICIAR SESION</Button>
            </form>
            <p className="text-center mt-5 text-foreground" style={bodyXs}>
              Haga click aqui para <a href="#" className="underline text-primary" onClick={(e) => e.preventDefault()}>reestablecer la contrasena</a>
            </p>
          </div>
        </div>
        <div className="hidden md:block w-[45%] relative overflow-hidden">
          <ImageWithFallback src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzMzMjU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Cloud technology" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

/* Hook para detectar si es móvil */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/* Componente de Breadcrumb Navegable */
function NavigableBreadcrumb({ items }: { items: Array<{ label: string; path?: string }> }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-muted-foreground overflow-x-auto pb-3 border-b border-border mb-4" style={{ ...bodyXs, fontSize: "11px" }}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx === 0 && <Home className="w-3 h-3 flex-shrink-0" />}
          {idx > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="whitespace-nowrap hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={cn(
              "whitespace-nowrap truncate",
              idx === items.length - 1 && "text-primary font-medium"
            )}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* Página completa de Documentos */
function DocumentosPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { archivos, pliego, titulo } = location.state || { archivos: [], pliego: "", titulo: "Documentos" };

  const getFileIcon = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="w-4 h-4" />;
    if (tipo === "img") return <ImageIcon className="w-4 h-4" />;
    return <Paperclip className="w-4 h-4" />;
  };

  const handleViewDocument = (index: number) => {
    navigate('../documento-viewer', {
      state: {
        archivos,
        pliego,
        titulo,
        selectedIndex: index
      }
    });
  };

  const handleDownloadFile = (e: React.MouseEvent, nombre: string) => {
    e.stopPropagation();
    console.log(`Descargando archivo: ${nombre}`);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: titulo }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-primary truncate" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
              {titulo}
            </h1>
            <p className="text-muted-foreground text-xs truncate">
              {pliego} • {archivos.length} documento{archivos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {archivos.map((archivo: any, idx: number) => (
          <div
            key={idx}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all bg-background border border-border group"
          >
            <button
              onClick={() => handleViewDocument(idx)}
              className="flex items-center gap-3 flex-1 min-w-0 text-left"
            >
              <div className="flex-shrink-0 text-primary">
                {getFileIcon(archivo.tipo)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium text-foreground" style={bodyXs}>
                  {archivo.nombre}
                </div>
                <div className="text-xs text-muted-foreground">
                  {archivo.tamano}
                </div>
              </div>
            </button>
            <button
              onClick={(e) => handleDownloadFile(e, archivo.nombre)}
              className="p-2 rounded-lg hover:bg-primary/10 active:bg-primary/20 transition-colors flex-shrink-0"
              title="Descargar documento"
            >
              <Download className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => handleViewDocument(idx)}
              className="p-2 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

/* Página de visualización de documento individual */
function DocumentoViewerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { archivos, pliego, titulo, selectedIndex } = location.state || {
    archivos: [],
    pliego: "",
    titulo: "Documentos",
    selectedIndex: 0
  };

  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);
  const currentDoc = archivos[currentIndex] || { nombre: "", tamano: "", tipo: "pdf" };

  const getFileIcon = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="w-16 h-16" />;
    if (tipo === "img") return <ImageIcon className="w-16 h-16" />;
    return <Paperclip className="w-16 h-16" />;
  };

  const handleNext = () => {
    if (currentIndex < archivos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDownload = () => {
    console.log(`Descargando: ${currentDoc.nombre}`);
  };

  const handleDownloadAll = () => {
    console.log(`Descargando todos los archivos de ${pliego}`);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -2 as any },
          { label: titulo, path: -1 as any },
          { label: currentDoc.nombre }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground truncate" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
              {currentDoc.nombre}
            </h1>
            <p className="text-muted-foreground text-xs">
              {currentDoc.tamano} • Documento {currentIndex + 1} de {archivos.length}
            </p>
          </div>
        </div>
      </div>

      {/* Área de visualización del documento - Visor completo */}
      <div className="flex-1 flex flex-col bg-muted/20 p-4">
        <div className="flex-1 bg-background rounded-lg border-2 border-border shadow-md overflow-hidden flex flex-col">
          {/* Toolbar del visor */}
          <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                {currentDoc.tipo === "pdf" ? (
                  <FileText className="w-4 h-4 text-primary" />
                ) : currentDoc.tipo === "img" ? (
                  <ImageIcon className="w-4 h-4 text-primary" />
                ) : (
                  <Paperclip className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Visualizando documento</p>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-none text-xs">
              {currentDoc.tipo.toUpperCase()}
            </Badge>
          </div>

          {/* Contenido del visor */}
          <div className="flex-1 overflow-auto bg-muted/30 p-4 relative">
            {currentDoc.tipo === "pdf" ? (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex flex-col">
                {/* Simulación de PDF - Página 1 */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-start gap-3 mb-6">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                        {currentDoc.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Documento PDF • {currentDoc.tamano}
                      </p>
                    </div>
                  </div>

                  {/* Contenido simulado de PDF */}
                  <div className="space-y-3 text-foreground/80">
                    <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-2/3"></div>

                    <div className="py-4">
                      <div className="h-32 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-center">
                        <p className="text-xs text-primary/60">Gráfico o imagen</p>
                      </div>
                    </div>

                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-4/5"></div>
                    <div className="h-3 bg-foreground/10 rounded w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground italic">
                      Vista previa simulada • En producción se integrará con PDF.js
                    </p>
                  </div>
                </div>

                {/* Footer de página PDF */}
                <div className="bg-muted/50 px-4 py-2 border-t border-border text-center">
                  <p className="text-xs text-muted-foreground">Página 1</p>
                </div>
              </div>
            ) : currentDoc.tipo === "img" ? (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex items-center justify-center p-4">
                <div className="text-center text-muted-foreground">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="w-16 h-16 text-primary/40" />
                  </div>
                  <p className="font-medium mb-2" style={bodyBase}>Vista previa de imagen</p>
                  <p className="text-xs">"{currentDoc.nombre}"</p>
                  <p className="text-xs mt-4 opacity-70 italic">
                    En producción se mostraría la imagen real
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[500px] bg-white rounded shadow-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground p-8">
                  <Paperclip className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2" style={bodyBase}>No hay vista previa disponible</p>
                  <p className="text-xs">"{currentDoc.nombre}"</p>
                  <p className="text-xs mt-2 opacity-70">Descarga el archivo para verlo</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer del visor con info */}
          <div className="bg-card border-t border-border px-4 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tamaño: {currentDoc.tamano}</span>
              <span className="text-primary font-medium">Documento {currentIndex + 1} de {archivos.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación entre documentos */}
      {archivos.length > 1 && (
        <div className="bg-background border-t border-border px-4 py-3">
          <div className="flex items-center justify-center gap-4 mb-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={cn(
                "p-2 rounded-lg border border-border transition-colors",
                currentIndex === 0
                  ? "bg-muted text-muted-foreground opacity-50"
                  : "bg-background hover:bg-card active:bg-primary active:text-primary-foreground"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-foreground min-w-[100px] text-center" style={bodyXs}>
              {currentIndex + 1} de {archivos.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === archivos.length - 1}
              className={cn(
                "p-2 rounded-lg border border-border transition-colors",
                currentIndex === archivos.length - 1
                  ? "bg-muted text-muted-foreground opacity-50"
                  : "bg-background hover:bg-card active:bg-primary active:text-primary-foreground"
              )}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer con botones de descarga */}
      <div className="bg-background border-t border-border p-4 space-y-2">
        <Button
          onClick={handleDownload}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          style={bodyXs}
        >
          <Download className="w-4 h-4" />
          Descargar este documento
        </Button>
        {archivos.length > 1 && (
          <Button
            onClick={handleDownloadAll}
            variant="outline"
            className="w-full gap-2"
            style={bodyXs}
          >
            <Download className="w-4 h-4" />
            Descargar todos ({archivos.length} archivos ZIP)
          </Button>
        )}
      </div>
    </div>
  );
}

/* Página completa de Validación */
function ValidationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { acto, estadoRUES, pliego } = location.state || { acto: "", estadoRUES: "Activa", pliego: "" };

  const mockCargos = [
    {
      nombre: "Incumplimiento de obligaciones de contraprestación",
      periodos: [
        { periodo: "Trim 1 2024", hallazgo: "No pagó", resultado: "Sanción" },
        { periodo: "Trim 2 2024", hallazgo: "Pagó", resultado: "Archivo" },
        { periodo: "Trim 3 2024", hallazgo: "No pagó", resultado: "Sanción" },
        { periodo: "Trim 4 2024", hallazgo: "Pagó fuera tiempo", resultado: "Sanción" },
      ],
      recomendacion: "Continuar a sanción",
      razon: "3 de 4 periodos con sanción",
      tipo: "sancion"
    },
    {
      nombre: "Deficiencia en calidad del servicio",
      periodos: [
        { periodo: "Trim 1 2024", hallazgo: "Subsanó", resultado: "Archivo" },
        { periodo: "Trim 2 2024", hallazgo: "Subsanó", resultado: "Archivo" },
      ],
      recomendacion: "Archivar",
      razon: "Todos los periodos subsanados",
      tipo: "archivo"
    },
  ];

  const tieneAlgunaSancion = mockCargos.some(c => c.tipo === "sancion");
  const isArchivoAutomatico = estadoRUES !== "Activa";

  return (
    <div className="min-h-screen bg-card">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: "Actos de Prueba", path: -1 as any },
          { label: `Validación ${acto}` }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
              Validación de Acto {acto}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Estado RUES:</span>
              <StatusBadge
                label={estadoRUES}
                variant={estadoRUES === "Activa" ? "success" : "destructive"}
                icon={estadoRUES === "Activa" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XOctagon className="w-3.5 h-3.5" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {isArchivoAutomatico && (
          <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#92400E]" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                  Archivo automático por estado RUES
                </p>
                <p className="text-[#92400E] mt-1" style={bodyXs}>
                  Este proceso se archiva automáticamente porque la empresa tiene estado RUES "{estadoRUES}"
                </p>
              </div>
            </div>
          </div>
        )}

        {mockCargos.map((cargo, idx) => (
          <div key={idx} className="bg-background rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Folder className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <h3 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
                CARGO {idx + 1}: {cargo.nombre}
              </h3>
            </div>

            <div className="space-y-2">
              {cargo.periodos.map((periodo, pIdx) => (
                <div key={pIdx} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{periodo.periodo}</span>
                    <button
                      onClick={() => navigate(`imagenes-ser`, { state: { cargo: cargo.nombre, periodo: periodo.periodo, hallazgo: periodo.hallazgo } })}
                      className="text-primary text-xs underline"
                    >
                      Ver imágenes
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        "border-none",
                        periodo.hallazgo === "No pagó" ? "bg-destructive/10 text-destructive" :
                          periodo.hallazgo === "Pagó" ? "bg-chart-2/10 text-chart-2" :
                            periodo.hallazgo === "Pagó fuera tiempo" ? "bg-[#F97316]/10 text-[#F97316]" :
                              periodo.hallazgo === "Subsanó" ? "bg-primary/10 text-primary" :
                                "bg-muted text-muted-foreground"
                      )}
                      style={bodyXs}
                    >
                      {periodo.hallazgo}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Badge
                      className={cn(
                        "border-none",
                        periodo.resultado === "Sanción" ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2"
                      )}
                      style={bodyXs}
                    >
                      {periodo.resultado === "Sanción" ? "🔴" : "🟢"} {periodo.resultado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className={cn(
              "p-4 rounded-lg border-l-4",
              cargo.tipo === "sancion" ? "bg-muted/30 border-destructive" : "bg-muted/30 border-chart-2"
            )}>
              <p className="text-foreground mb-1" style={{ ...bodyBase, fontWeight: "var(--font-weight-bold)" }}>
                {cargo.tipo === "sancion" ? "🔴" : "🟢"} {cargo.recomendacion}
              </p>
              <p className="text-muted-foreground" style={bodyXs}>
                Razón: {cargo.razon}
              </p>
            </div>
          </div>
        ))}

        <div className={cn(
          "p-6 rounded-lg border-2 text-center space-y-2",
          tieneAlgunaSancion ? "bg-primary/5 border-primary" : "bg-chart-2/5 border-chart-2"
        )}>
          <div className="text-4xl mb-2">{tieneAlgunaSancion ? "🔴" : "🟢"}</div>
          <h3 className={cn(
            "uppercase",
            tieneAlgunaSancion ? "text-primary" : "text-chart-2"
          )} style={{ ...headingBold, fontSize: "var(--text-base)" }}>
            {tieneAlgunaSancion ? "CONTINUAR A DECISIÓN DE SANCIÓN" : "ARCHIVAR PROCESO"}
          </h3>
          <p className="text-muted-foreground" style={bodyXs}>
            {tieneAlgunaSancion ? "(Al menos un cargo con sanción)" : "(Todos los cargos archivados)"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Página completa de Galería de Imágenes SER */
function ImageGalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cargo, periodo, hallazgo } = location.state || { cargo: "", periodo: "", hallazgo: "" };
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 3;

  return (
    <div className="min-h-screen bg-card flex flex-col">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -2 as any },
          { label: "Validación", path: -1 as any },
          { label: "Imágenes SER" }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-lg)" }}>
              Imágenes SER - {periodo}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {cargo}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">Hallazgo:</span>
          <Badge className="bg-destructive/10 text-destructive border-none" style={bodyXs}>{hallazgo}</Badge>
        </div>

        <div className="flex-1 bg-muted/20 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
            <p style={bodyBase}>Imagen de captura SER</p>
            <p className="text-xs mt-1">(Placeholder - integrar con imágenes reales)</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)}
            className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-foreground min-w-[80px] text-center" style={bodyXs}>
            {currentIndex + 1} de {totalImages}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalImages)}
            className="p-2 rounded-lg border border-border bg-background hover:bg-card transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gap-2" style={bodyXs}>
            <Download className="w-4 h-4" />
            Descargar actual
          </Button>
          <Button className="flex-1 gap-2" style={bodyXs}>
            <Download className="w-4 h-4" />
            Descargar todas
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Página completa de Cumplimiento */
function CumplimientoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { acto, operador, estadoRUES } = location.state || { acto: "", operador: "", estadoRUES: "Activa" };

  return (
    <div className="min-h-screen bg-card">
      <div className="bg-background border-b border-border px-4 py-4 sticky top-0 z-10">
        <NavigableBreadcrumb items={[
          { label: "Resultados", path: -1 as any },
          { label: "Cumplimiento", path: -1 as any },
          { label: "Validación completa" }
        ]} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="h-5 w-5 text-chart-2" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
              Validación completa de cumplimiento
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {acto} • {operador}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {estadoRUES !== "Activa" && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-sm)" }}>
                Archivo automático por estado RUES
              </p>
              <p className="text-muted-foreground" style={{ ...bodyXs, lineHeight: 1.6 }}>
                La empresa se encuentra en estado <strong>{estadoRUES}</strong> según el sistema RUES.
              </p>
            </div>
          </div>
        )}

        <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground" style={{ ...headingBold, fontSize: "var(--text-base)" }}>
              Vista detallada por cargo y periodo
            </p>
            <p className="text-muted-foreground max-w-md mx-auto" style={{ ...bodyXs, lineHeight: 1.6 }}>
              Esta sección mostrará la información consolidada de todas las etapas anteriores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Router */
const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  {
    path: "/sanciones/:moduleId",
    Component: SancionesLayout,
  },
  {
    path: "/sanciones/:moduleId/documentos",
    Component: DocumentosPage
  },
  {
    path: "/sanciones/:moduleId/documento-viewer",
    Component: DocumentoViewerPage
  },
  {
    path: "/sanciones/:moduleId/validacion",
    Component: ValidationPage
  },
  {
    path: "/sanciones/:moduleId/imagenes-ser",
    Component: ImageGalleryPage
  },
  {
    path: "/sanciones/:moduleId/cumplimiento",
    Component: CumplimientoPage
  },
  { path: "*", loader: () => redirect("/") },
]);

/* Prototype banner */
function PrototypeBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem("prototype-banner-closed") !== "1");

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

/* App */
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <PrototypeBanner />
    </>
  );
}

