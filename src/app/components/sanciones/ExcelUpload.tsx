import React, { useState, useRef } from "react";
import { Upload, X, AlertCircle, CheckCircle, Download, Search, FileSpreadsheet } from "lucide-react";
import { cn } from "../ui/utils";

interface ExcelUploadProps {
  onFileAccepted: (file: File) => void;
  onIndividualSearch?: (searchValue: string) => void;
  onSearchModeChange?: (isIndividual: boolean) => void;
  moduleTitle: string;
  requiredColumns: string[];
}

export function ExcelUpload({ onFileAccepted, onIndividualSearch, onSearchModeChange, moduleTitle, requiredColumns }: ExcelUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext !== "xlsx" && ext !== "xls") {
      setError("Solo se permiten archivos Excel (.xlsx, .xls)");
      return false;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("El archivo no debe superar los 10 MB");
      return false;
    }
    return true;
  };

  const handleFile = (f: File) => {
    setError(null);
    if (validateFile(f)) {
      setFile(f);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (file) onFileAccepted(file);
  };

  const handleIndividualSearch = () => {
    if (onIndividualSearch) {
      onIndividualSearch(searchValue);
    }
  };

  const downloadTemplate = () => {
    // Crear un archivo Excel de ejemplo con las columnas requeridas
    const csvContent = requiredColumns.join(",") + "\n00527,2025\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `plantilla_${moduleTitle.replace(/\s+/g, "_")}.csv`);
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
          onClick={() => {
            setSearchMode(false);
            onSearchModeChange?.(false);
          }}
          className={cn(
            "flex-1 py-3 px-6 rounded-lg border-2 transition-all duration-200",
            !searchMode
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40"
          )}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Consulta masiva
        </button>
        <button
          onClick={() => {
            setSearchMode(true);
            onSearchModeChange?.(true);
          }}
          className={cn(
            "flex-1 py-3 px-6 rounded-lg border-2 transition-all duration-200",
            searchMode
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40"
          )}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Consulta individual
        </button>
      </div>

      {searchMode ? (
        /* Modo de búsqueda individual */
        <div className="flex flex-col gap-6">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                Consulta de expediente individual
              </p>
              <p
                className="text-muted-foreground mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-normal)",
                  lineHeight: 1.6,
                }}
              >
                Ingrese el número del pliego (5 dígitos) y el año (4 dígitos) para consultar un expediente específico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Número del pliego
              </label>
              <input
                type="text"
                maxLength={5}
                placeholder="00527"
                value={searchValue.split("-")[0] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const year = searchValue.split("-")[1] || "";
                  setSearchValue(year ? `${value}-${year}` : value);
                }}
                className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              />
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-normal)",
                }}
              >
                Exactamente 5 dígitos
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Año
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="2025"
                value={searchValue.split("-")[1] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const pliego = searchValue.split("-")[0] || "";
                  setSearchValue(pliego ? `${pliego}-${value}` : value);
                }}
                className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              />
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-normal)",
                }}
              >
                Exactamente 4 dígitos
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleIndividualSearch}
              disabled={
                !searchValue ||
                searchValue.split("-")[0]?.length !== 5 ||
                searchValue.split("-")[1]?.length !== 4
              }
              className={cn(
                "border rounded-lg px-8 py-2.5 transition-colors flex items-center gap-2",
                searchValue &&
                searchValue.split("-")[0]?.length === 5 &&
                searchValue.split("-")[1]?.length === 4
                  ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-border text-muted-foreground cursor-not-allowed"
              )}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>
      ) : (
        /* Modo de carga masiva */
        <div className="flex flex-col gap-8">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                Campos requeridos en el archivo Excel
              </p>
              <p
                className="text-muted-foreground mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-normal)",
                  lineHeight: 1.6,
                }}
              >
                El archivo debe contener únicamente las columnas{" "}
                <strong
                  style={{
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--foreground)",
                  }}
                >
                  A (Pliego)
                </strong>{" "}
                y{" "}
                <strong
                  style={{
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--foreground)",
                  }}
                >
                  B (Año)
                </strong>
                . La columna de Pliego debe tener exactamente 5 dígitos (ej. 00527) y la de Año debe tener 4 dígitos. Puede incluir uno o múltiples registros.
              </p>
              <button
                onClick={downloadTemplate}
                className="mt-3 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                <Download className="w-4 h-4" />
                Descargar plantilla de ejemplo
              </button>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !file && inputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-lg py-16 px-8 text-center transition-all duration-300",
              isDragging
                ? "border-primary bg-primary/5 cursor-copy"
                : file
                  ? "border-primary/30 bg-primary/5 cursor-default"
                  : "border-border hover:border-primary/40 cursor-pointer bg-background"
            )}
          >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleInputChange}
          className="hidden"
        />

        {file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                {file.name}
              </p>
              <p
                className="text-muted-foreground mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-normal)",
                }}
              >
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="flex items-center gap-1.5 text-destructive hover:text-destructive/80 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              <X className="w-4 h-4" />
              Eliminar archivo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-7 h-7 text-primary" />
            </div>

            <div className="space-y-1">
              <p
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Selecciona un archivo o arrástralo aquí
              </p>
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-normal)",
                }}
              >
                Cada archivo debe estar en formato .xlsx
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="border border-primary text-primary bg-background hover:bg-primary/5 rounded-lg px-6 py-2.5 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Seleccionar Archivo
            </button>
          </div>
        )}
      </div>

          {error && (
            <div
              className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!file}
              className={cn(
                "border rounded-lg px-8 py-2.5 transition-colors",
                file
                  ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-border text-muted-foreground cursor-not-allowed"
              )}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Cargar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
