import React, { useState } from "react";
import {
  Eye,
  Download,
  FileSpreadsheet,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar,
  ImageIcon,
  Paperclip,
  FileCheck,
  Info,
  XOctagon,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
  Check,
  XCircle,
} from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { StatusBadge } from "../../shared";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { cn } from "../ui/utils";
import type { ColumnDef } from "./types";

interface ColumnTab {
  id: string;
  label: string;
  columns: string[];
}

interface ResultsTableProps {
  columns: ColumnDef[];
  columnTabs?: ColumnTab[];
  data: Record<string, any>[];
  moduleTitle: string;
  searchType?: "individual" | "masiva";
  onReset: () => void;
}

const bodyXs = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-xs)",
  fontWeight: "var(--font-weight-normal)",
};
const bodyBase = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-base)",
  fontWeight: "var(--font-weight-medium)",
};
const headingBold = {
  fontFamily: "var(--font-heading)",
  fontWeight: "var(--font-weight-bold)",
};
const headingBoldItalic = {
  fontFamily: "var(--font-heading)",
  fontWeight: "var(--font-weight-bold)",
  fontStyle: "italic",
};

export function ResultsTable({
  columns,
  columnTabs,
  data,
  moduleTitle,
  searchType = "masiva",
  onReset,
}: ResultsTableProps) {
  const [activeTab, setActiveTab] = useState(columnTabs?.[0]?.id || "all");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(
    null
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [resumenModalOpen, setResumenModalOpen] = useState(false);
  const [selectedDescargo, setSelectedDescargo] = useState<Record<
    string,
    any
  > | null>(null);

  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [selectedDocsRow, setSelectedDocsRow] = useState<Record<string, any> | null>(null);
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);

  // Filtros y Selección Generales
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Compatibilidad Módulo de Descargos (si aún se usan)
  const [filtroPliego, setFiltroPliego] = useState("");
  const [filtroApoderado, setFiltroApoderado] = useState("todos");
  const [filtroTerminos, setFiltroTerminos] = useState("todos");
  const [filtroPruebas, setFiltroPruebas] = useState("todos");
  const [filtroFechaPresentacionDesde, setFiltroFechaPresentacionDesde] = useState("");
  const [filtroFechaPresentacionHasta, setFiltroFechaPresentacionHasta] = useState("");
  const [filtroFechaRadicacionDesde, setFiltroFechaRadicacionDesde] = useState("");
  const [filtroFechaRadicacionHasta, setFiltroFechaRadicacionHasta] = useState("");

  const isDescargosModule = moduleTitle.includes("Descargos");

  // Filtrar columnas según el tab activo
  const visibleColumns = columnTabs
    ? columns.filter((col) => {
        const activeTabConfig = columnTabs.find((tab) => tab.id === activeTab);
        return activeTabConfig?.columns.includes(col.key);
      })
    : columns;

  const handleView = (row: Record<string, any>) => {
    setSelectedRow(row);
    setViewerOpen(true);
  };

  const handleViewDocs = (row: Record<string, any>) => {
    setSelectedDocsRow(row);
    setSelectedDocIndex(0);
    setDocsModalOpen(true);
  };

  const toggleRowExpand = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const handleVerResumen = (row: Record<string, any>) => {
    setSelectedDescargo(row);
    setResumenModalOpen(true);
  };

  const getFileIcon = (tipo: string) => {
    if (tipo === "pdf")
      return <FileText className="w-4 h-4 text-destructive" />;
    if (tipo === "img")
      return <ImageIcon className="w-4 h-4 text-chart-2" />;
    return <Paperclip className="w-4 h-4 text-muted-foreground" />;
  };

  const limpiarFiltros = () => {
    setSearchTerm("");
    setColumnFilters({});
    setFiltroPliego("");
    setFiltroApoderado("todos");
    setFiltroTerminos("todos");
    setFiltroPruebas("todos");
    setFiltroFechaPresentacionDesde("");
    setFiltroFechaPresentacionHasta("");
    setFiltroFechaRadicacionDesde("");
    setFiltroFechaRadicacionHasta("");
  };

  const handleToggleAll = () => {
    if (selectedRows.size === filteredData.length && filteredData.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map(row => row.id)));
    }
  };

  const handleToggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  // Filtrar datos
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      // Global search
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesGlobal = Object.values(row).some((val) => {
          if (typeof val === "string") return val.toLowerCase().includes(lowerSearch);
          if (typeof val === "number") return val.toString().includes(lowerSearch);
          return false;
        });
        if (!matchesGlobal) return false;
      }
      
      // Dynamic column filters
      for (const key in columnFilters) {
        const filterVal = columnFilters[key];
        if (filterVal && filterVal !== "todos") {
          const rowVal = row[key];
          if (!rowVal) return false;
          if (!rowVal.toString().toLowerCase().includes(filterVal.toLowerCase())) {
            return false;
          }
        }
      }

      if (isDescargosModule) {
        if (filtroPliego && !row.pliego?.toLowerCase().includes(filtroPliego.toLowerCase())) return false;
        if (filtroApoderado !== "todos" && row.tieneApoderado !== (filtroApoderado === "si")) return false;
        if (filtroTerminos !== "todos" && row.dentroTerminos !== (filtroTerminos === "atiempo" ? "A tiempo" : "Extemporáneo")) return false;
        if (filtroPruebas === "con" && row.pruebasAsociadas === "Sin pruebas") return false;
        if (filtroPruebas === "sin" && row.pruebasAsociadas !== "Sin pruebas") return false;
      }
      return true;
    });
  }, [data, searchTerm, columnFilters, isDescargosModule, filtroPliego, filtroApoderado, filtroTerminos, filtroPruebas]);

  return (
    <div className="space-y-6">
      {/* Header and Counters */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[#3F51B5]" style={{ ...headingBold, fontSize: "1.75rem", margin: 0 }}>
          Resultados del analisis {searchType === "individual" && "- Consulta individual"}
        </h2>
        <p className="text-muted-foreground m-0" style={{ ...bodyXs, fontSize: "0.875rem" }}>
          {filteredData.length} registro(s) encontrado(s) {selectedRows.size > 0 && `• ${selectedRows.size} seleccionado(s)`}
        </p>
      </div>

      {/* Dense Grid of Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5 mt-4">
        {/* Global Search */}
        <div className="relative mt-2">
          <label className="absolute -top-2 left-2 inline-block bg-background px-1 text-[10px] text-foreground font-medium z-10">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 h-[38px] border-border rounded-md"
              style={bodyXs}
            />
          </div>
        </div>

        {/* Dynamic Column Filters based on visible columns */}
        {visibleColumns.filter(c => c.filterable).map(col => {
          const isDate = col.key.toLowerCase().includes("fecha");
          const isDomain = ["estado", "tipoNotificacionLegal", "medioEntrega", "servicio", "estadoTermino", "dentroTerminos", "descargos", "origenPrueba", "tipoPrueba"].includes(col.key);
          
          if (isDate) {
            return (
              <div key={col.key} className="relative mt-2">
                <label className="absolute -top-2 left-2 inline-block bg-background px-1 text-[10px] text-foreground font-medium z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]" title={col.header}>{col.header}</label>
                <Input
                  type="date"
                  placeholder="Selecciona una fecha"
                  value={columnFilters[col.key] || ""}
                  onChange={(e) => setColumnFilters(prev => ({...prev, [col.key]: e.target.value}))}
                  className="w-full h-[38px] border-border rounded-md"
                  style={bodyXs}
                />
              </div>
            );
          }
          
          if (isDomain) {
            const uniqueValues = Array.from(new Set(data.map(d => d[col.key]).filter(Boolean)));
            const currentVal = columnFilters[col.key] || "";
            return (
              <div key={col.key} className="relative mt-2">
                <label className="absolute -top-2 left-2 inline-block bg-background px-1 text-[10px] text-[#3F51B5] font-medium z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]" title={col.header}>{col.header}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full h-[38px] justify-between font-normal border-[#3F51B5] px-3"
                      style={bodyXs}
                    >
                      <span className="truncate">{currentVal ? currentVal : "Todos"}</span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar..." className="h-9" style={bodyXs} />
                      <CommandList>
                        <CommandEmpty style={bodyXs}>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="Todos"
                            onSelect={() => setColumnFilters(prev => ({...prev, [col.key]: ""}))}
                            style={bodyXs}
                          >
                            Todos
                            <Check className={cn("ml-auto h-4 w-4", currentVal === "" ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                          {uniqueValues.map(val => (
                            <CommandItem
                              key={val}
                              value={val}
                              onSelect={() => setColumnFilters(prev => ({...prev, [col.key]: val}))}
                              style={bodyXs}
                            >
                              {val}
                              <Check className={cn("ml-auto h-4 w-4", currentVal === val ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            );
          }
          
          return (
            <div key={col.key} className="relative mt-2">
              <label className="absolute -top-2 left-2 inline-block bg-background px-1 text-[10px] text-foreground font-medium z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]" title={col.header}>{col.header}</label>
              <Input
                placeholder="Todos"
                value={columnFilters[col.key] || ""}
                onChange={(e) => setColumnFilters(prev => ({...prev, [col.key]: e.target.value}))}
                className="w-full h-[38px] border-border rounded-md"
                style={bodyXs}
              />
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-2 mb-6">
        {(searchTerm || Object.keys(columnFilters).length > 0) && (
          <Button variant="ghost" className="text-primary hover:text-primary/80 h-[38px]" onClick={limpiarFiltros} style={bodyXs}>
            Limpiar filtros
          </Button>
        )}
        <Button
          variant="outline"
          className="h-[38px] border-border hover:border-primary text-foreground hover:text-primary rounded-md gap-2"
          style={bodyXs}
          onClick={onReset}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Nuevo analisis
        </Button>
        <Button
          className="h-[38px] bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white rounded-md gap-2"
          style={bodyXs}
        >
          <Download className="w-4 h-4" />
          Exportar Excel {selectedRows.size > 0 && `(${selectedRows.size})`}
        </Button>
      </div>

      {/* Filtros panel para módulo descargos */}
      {isDescargosModule && showFilters && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3
              className="text-foreground"
              style={{ ...headingBold, fontSize: "var(--text-base)" }}
            >
              Filtros adicionales
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filtro Pliego */}
            <div className="space-y-2">
              <label
                className="text-foreground"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Pliego
              </label>
              <Input
                placeholder="Buscar por pliego..."
                value={filtroPliego}
                onChange={(e) => setFiltroPliego(e.target.value)}
                className="h-[44px] border-border rounded-lg"
                style={bodyXs}
              />
            </div>

            {/* Filtro Tiene Apoderado */}
            <div className="space-y-2">
              <label
                className="text-foreground"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Tiene apoderado
              </label>
              <Select
                value={filtroApoderado}
                onValueChange={setFiltroApoderado}
              >
                <SelectTrigger
                  className="h-[44px] border-border hover:border-foreground rounded-lg"
                  style={bodyXs}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos" style={bodyXs}>
                    Todos
                  </SelectItem>
                  <SelectItem value="si" style={bodyXs}>
                    Sí
                  </SelectItem>
                  <SelectItem value="no" style={bodyXs}>
                    No
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro Dentro de Términos */}
            <div className="space-y-2">
              <label
                className="text-foreground"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Dentro de términos
              </label>
              <Select value={filtroTerminos} onValueChange={setFiltroTerminos}>
                <SelectTrigger
                  className="h-[44px] border-border hover:border-foreground rounded-lg"
                  style={bodyXs}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos" style={bodyXs}>
                    Todos
                  </SelectItem>
                  <SelectItem value="atiempo" style={bodyXs}>
                    A tiempo
                  </SelectItem>
                  <SelectItem value="extemporaneo" style={bodyXs}>
                    Extemporáneo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro Tiene Pruebas */}
            <div className="space-y-2">
              <label
                className="text-foreground"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Tiene pruebas
              </label>
              <Select value={filtroPruebas} onValueChange={setFiltroPruebas}>
                <SelectTrigger
                  className="h-[44px] border-border hover:border-foreground rounded-lg"
                  style={bodyXs}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos" style={bodyXs}>
                    Todos
                  </SelectItem>
                  <SelectItem value="con" style={bodyXs}>
                    Con pruebas
                  </SelectItem>
                  <SelectItem value="sin" style={bodyXs}>
                    Sin pruebas
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro Fecha Presentación */}
            <div className="space-y-2 col-span-1">
              <label
                className="text-foreground flex items-center gap-2"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Fecha de presentación (desde)
              </label>
              <Input
                type="date"
                value={filtroFechaPresentacionDesde}
                onChange={(e) =>
                  setFiltroFechaPresentacionDesde(e.target.value)
                }
                className="h-[44px] border-border rounded-lg"
                style={bodyXs}
              />
            </div>

            <div className="space-y-2 col-span-1">
              <label
                className="text-foreground flex items-center gap-2"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Fecha de presentación (hasta)
              </label>
              <Input
                type="date"
                value={filtroFechaPresentacionHasta}
                onChange={(e) =>
                  setFiltroFechaPresentacionHasta(e.target.value)
                }
                className="h-[44px] border-border rounded-lg"
                style={bodyXs}
              />
            </div>

            {/* Filtro Fecha Radicación */}
            <div className="space-y-2 col-span-1">
              <label
                className="text-foreground flex items-center gap-2"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Fecha de radicación (desde)
              </label>
              <Input
                type="date"
                value={filtroFechaRadicacionDesde}
                onChange={(e) => setFiltroFechaRadicacionDesde(e.target.value)}
                className="h-[44px] border-border rounded-lg"
                style={bodyXs}
              />
            </div>

            <div className="space-y-2 col-span-1">
              <label
                className="text-foreground flex items-center gap-2"
                style={{
                  ...bodyXs,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Fecha de radicación (hasta)
              </label>
              <Input
                type="date"
                value={filtroFechaRadicacionHasta}
                onChange={(e) => setFiltroFechaRadicacionHasta(e.target.value)}
                className="h-[44px] border-border rounded-lg"
                style={bodyXs}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {columnTabs && columnTabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {columnTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Table */}
      <div className="rounded-none overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow className="border-none hover:bg-secondary">
              <TableHead className="w-12 text-center pl-6">
                <Checkbox
                  checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                  onCheckedChange={handleToggleAll}
                  aria-label="Select all"
                />
              </TableHead>

              {visibleColumns.map((col, colIdx) => (
                <TableHead
                  key={`header-${activeTab}-${col.key}-${colIdx}`}
                  className={cn(
                    "h-14 text-secondary-foreground whitespace-nowrap",
                    !isDescargosModule && "first:pl-6 last:pr-6"
                  )}
                  style={{ ...headingBold, fontSize: "var(--text-xs)" }}
                >
                  {col.headerTooltip ? (
                    <div className="flex items-center gap-1.5">
                      {col.header}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[300px] text-wrap text-left p-3">
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>
                              {col.headerTooltip}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              <TableHead
                className="h-14 text-secondary-foreground whitespace-nowrap pr-6 text-left"
                style={{ ...headingBold, fontSize: "var(--text-xs)" }}
              >
                <div className="flex items-center gap-1.5">
                  Acciones
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] text-wrap text-left p-3">
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>
                          Acciones disponibles para el registro (ver detalle o descargar).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={100}
                  className="h-32 text-center text-muted-foreground"
                  style={bodyBase}
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <React.Fragment key={row.id || index}>
                  <TableRow
                    className={cn(
                      "border-b border-border/40",
                      isDescargosModule &&
                        row.pruebas?.length > 0 &&
                        "cursor-pointer hover:bg-primary/5"
                    )}
                  >
                    <TableCell className="py-5 pl-6 w-12 text-center" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={() => handleToggleRow(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </TableCell>

                    {visibleColumns.map((col, colIdx) => (
                      <TableCell
                        key={`cell-${row.id || index}-${col.key}-${colIdx}`}
                        className="py-5 text-foreground whitespace-nowrap"
                        style={bodyXs}
                        onClick={(e) => {
                          if (
                            (col.key === "pruebasAsociadas" || col.key === "pruebas") &&
                            row.pruebas?.length > 0
                          ) {
                            e.stopPropagation();
                            toggleRowExpand(row.id);
                          } else if (col.key === "documentos" && row[col.key]?.archivos?.length > 0) {
                            e.stopPropagation();
                            handleViewDocs(row);
                          } else if (col.key === "eventos" && Array.isArray(row.eventos) && row.eventos.length > 0) {
                            e.stopPropagation();
                            toggleRowExpand(row.id);
                          }
                        }}
                      >
                        {col.key === "pliego" ? (
                          <span
                            style={{
                              ...bodyXs,
                              fontWeight: "var(--font-weight-bold)",
                            }}
                          >
                            {row[col.key]}
                          </span>
                        ) : col.key === "pruebasAsociadas" || col.key === "pruebas" ? (
                          (() => {
                            const count = row.pruebas?.length || 0;
                            const isExpanded = expandedRows.has(row.id);
                            if (count === 0) {
                              return (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-md text-[11px] font-medium border border-border/50">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Sin pruebas
                                </div>
                              );
                            }
                            return (
                              <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3F51B5]/5 text-[#3F51B5] rounded-md text-[11px] font-medium border border-[#3F51B5]/10 hover:bg-[#3F51B5]/10 transition-colors"
                              >
                                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                {count} prueba{count !== 1 ? 's' : ''}
                              </button>
                            );
                          })()
                        ) : col.key === "resumenDescargos" &&
                          isDescargosModule ? (
                          <button
                            className="text-primary hover:text-primary/80 underline max-w-xs truncate block"
                            style={bodyXs}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerResumen(row);
                            }}
                          >
                            {row[col.key]}
                          </button>
                        ) : col.render ? (
                          col.render(row[col.key], row)
                        ) : typeof row[col.key] === "object" && row[col.key] !== null ? (
                          <span className="text-muted-foreground italic text-[11px]">No renderizable</span>
                        ) : (
                          row[col.key]
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-left pr-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          className="text-foreground hover:text-primary hover:bg-transparent gap-2 h-auto p-0"
                          style={bodyXs}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Fila expandible con pruebas */}
                  {expandedRows.has(row.id) &&
                    row.pruebas?.length > 0 && (
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell
                          colSpan={100}
                          className="py-4 px-6"
                        >
                          <div className="pl-10 pr-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FileCheck className="w-4 h-4 text-primary" />
                              <span
                                className="text-primary"
                                style={{
                                  ...bodyXs,
                                  fontWeight: "var(--font-weight-bold)",
                                }}
                              >
                                Pruebas asociadas ({row.pruebas.length})
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {row.pruebas.map((prueba: any, pruebaIdx: number) => (
                                <div
                                  key={`prueba-${row.id}-${prueba.id || pruebaIdx}`}
                                  className="bg-card border border-border rounded-lg p-3 flex flex-col gap-1.5 hover:border-primary/50 transition-colors"
                                >
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-foreground" style={{ ...bodyXs, fontWeight: "var(--font-weight-medium)" }}>{prueba.nombre}</span>
                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center justify-center", prueba.tipo?.toLowerCase() === "anexada" ? "bg-[#10B981]/15 text-[#10B981]" : "bg-[#3F51B5]/15 text-[#3F51B5]")}>
                                      {prueba.tipo === "anexada" || prueba.tipo?.toLowerCase() === "anexada" ? "Anexada" : "Solicitada"}
                                    </span>
                                    <span className="text-muted-foreground ml-auto" style={{ fontSize: "11px" }}>Tipo: {prueba.tipoPrueba || "Documental"}</span>
                                  </div>
                                  <p className="text-muted-foreground" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                                    {prueba.descripcion || prueba.nombre}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                  {/* Fila expandible con eventos (Trazabilidad) */}
                  {expandedRows.has(row.id) &&
                    Array.isArray(row.eventos) &&
                    row.eventos.length > 0 && (
                      <TableRow className="bg-muted/10 hover:bg-muted/10 border-b-0">
                        <TableCell colSpan={100} className="py-6 px-4 border-b">
                          <div className="pl-6 pr-4">
                            <h3 className="text-foreground mb-6" style={{ ...headingBold, fontSize: "1rem" }}>
                              Trazabilidad de la notificación • {row.pliego || row.expediente}
                            </h3>
                            
                            <div className="relative border-l border-border ml-3 space-y-6 pb-4">
                              {row.eventos.map((evento: any, idx: number) => {
                                // Determinar colores basados en tipo o estado
                                let dotColor = "bg-[#3F51B5]";
                                let badgeBg = "bg-[#3F51B5]/10";
                                let badgeText = "text-[#3F51B5]";
                                
                                if (evento.tipo === "Devolución" || evento.resultado?.includes("Rehusado") || evento.resultado?.includes("Devuelto")) {
                                  dotColor = "bg-[#F44336]";
                                  badgeBg = "bg-[#F44336]/10";
                                  badgeText = "text-[#F44336]";
                                } else if (evento.tipo === "Aviso" || evento.tipo === "Relanzamiento") {
                                  dotColor = "bg-[#FFC107]";
                                  badgeBg = "bg-[#FFC107]/10";
                                  badgeText = "text-[#FFC107]";
                                } else if (evento.tipo === "Notificación efectiva") {
                                  dotColor = "bg-[#4CAF50]";
                                  badgeBg = "bg-[#4CAF50]/10";
                                  badgeText = "text-[#4CAF50]";
                                }

                                return (
                                  <div key={idx} className="relative pl-8">
                                    {/* Timeline dot */}
                                    <div className={cn("absolute left-[-5.5px] top-1.5 w-3 h-3 rounded-full border-2 border-background", dotColor)} />
                                    
                                    {/* Card */}
                                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <span className="text-foreground" style={{ ...headingBold, fontSize: "0.875rem" }}>
                                          {evento.fecha}
                                        </span>
                                        <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full", badgeBg, badgeText)} style={{ fontSize: "0.75rem", fontWeight: "var(--font-weight-medium)" }}>
                                          {evento.tipo === "Devolución" ? <XOctagon className="w-3.5 h-3.5" /> : evento.tipo === "Aviso" ? <HelpCircle className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                                          {evento.tipo}
                                        </div>
                                        {evento.medio && (
                                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: "var(--font-weight-medium)" }}>
                                            <FileText className="w-3.5 h-3.5" />
                                            {evento.medio}
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="space-y-2 mt-4">
                                        {evento.direccion && (
                                          <p className="m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                                            <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Dirección/correo: </span>
                                            <span className="text-muted-foreground">{evento.direccion}</span>
                                          </p>
                                        )}
                                        {evento.resultado && (
                                          <p className="m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                                            <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Resultado: </span>
                                            <span className="text-muted-foreground">{evento.resultado}</span>
                                          </p>
                                        )}
                                        {evento.observacion && (
                                          <p className="m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                                            <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Observación: </span>
                                            <span className="text-muted-foreground">{evento.observacion}</span>
                                          </p>
                                        )}
                                        
                                        {/* Technical Identifiers */}
                                        {(row.idCertimail || row.radicadoConstancia) && (evento.tipo === "Envío electrónico" || evento.tipo === "Entrega física") && (
                                          <p className="m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                                            <span className="text-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>Identificador técnico: </span>
                                            <span className="text-muted-foreground font-mono text-xs bg-muted px-2 py-0.5 rounded">{row.idCertimail || row.radicadoConstancia}</span>
                                          </p>
                                        )}
                                        
                                        {/* Validation Alerts */}
                                        {(evento.alerta || (row.alertaValidacion && row.alertaValidacion !== "N/A" && (evento.tipo === "Devolución" || evento.tipo === "Entrega física"))) && (
                                          <div className="mt-2">
                                            <StatusBadge 
                                              label={evento.alerta || row.alertaValidacion} 
                                              variant="warning" 
                                              icon={<AlertTriangle className="w-3.5 h-3.5" />} 
                                            />
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Document Viewer Button */}
                                      {evento.documento && (
                                        <div className="mt-4 inline-flex items-center gap-2 bg-[#3F51B5]/5 text-[#3F51B5] hover:bg-[#3F51B5]/10 px-3 py-2 rounded-lg border border-[#3F51B5]/10 cursor-pointer transition-colors" style={{ fontSize: "0.75rem", fontWeight: "var(--font-weight-medium)" }} onClick={() => setViewerOpen(true)}>
                                          <Download className="w-4 h-4" />
                                          {evento.documento.nombre}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div
        className="border-t border-border pt-8 flex items-center justify-end gap-8 text-muted-foreground"
        style={bodyXs}
      >
        <div className="flex items-center gap-3">
          <span className="text-foreground" style={bodyXs}>
            Elementos por página
          </span>
          <Select defaultValue="10">
            <SelectTrigger
              className="w-[80px] h-[52px] border-border hover:border-foreground focus:ring-1 focus:ring-ring data-[state=open]:border-primary data-[state=open]:ring-primary text-foreground transition-colors rounded-lg"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
              }}
            >
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((val) => (
                <SelectItem
                  key={val}
                  value={val.toString()}
                  className="focus:bg-primary/10 focus:text-primary text-foreground cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-foreground" style={bodyXs}>
          1-{filteredData.length} de {filteredData.length}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted/50 hover:text-foreground"
            disabled
          >
            <ChevronsLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted/50 hover:text-foreground"
            disabled
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted/50 hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted/50 hover:text-foreground"
          >
            <ChevronsRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Modal Resumen de Descargos */}
      {isDescargosModule && (
        <Dialog open={resumenModalOpen} onOpenChange={setResumenModalOpen}>
          <DialogContent className="w-[600px] max-w-[95vw] max-h-[80vh] p-0 gap-0 bg-background border-2 border-border rounded-xl overflow-hidden outline-none shadow-elevation-sm [&>button]:hidden flex flex-col">
            <DialogTitle className="sr-only">
              Resumen de descargos
            </DialogTitle>
            <DialogDescription className="sr-only">
              Información completa del descargo presentado
            </DialogDescription>

            {/* Header */}
            <div className="bg-card shrink-0 border-b-2 border-border p-8">
              <div className="flex items-center justify-between">
                <h3
                  className="text-primary"
                  style={{
                    ...headingBoldItalic,
                    fontSize: "var(--text-xl)",
                  }}
                >
                  Resumen de Descargos
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setResumenModalOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {selectedDescargo && (
                <>
                  {/* Información General */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <h4
                      className="text-primary"
                      style={{
                        ...headingBold,
                        fontSize: "var(--text-base)",
                      }}
                    >
                      Información General
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Pliego
                        </p>
                        <p
                          className="text-foreground mt-1"
                          style={{
                            ...bodyXs,
                            fontWeight: "var(--font-weight-bold)",
                          }}
                        >
                          {selectedDescargo.pliego}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Radicado
                        </p>
                        <p className="text-foreground mt-1" style={bodyXs}>
                          {selectedDescargo.radicado}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Calidad de quien presenta
                        </p>
                        <p className="text-foreground mt-1" style={bodyXs}>
                          {selectedDescargo.calidadPresenta || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Apoderado
                        </p>
                        <p className="text-foreground mt-1" style={bodyXs}>
                          {selectedDescargo.apoderado || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Representante legal
                        </p>
                        <p className="text-foreground mt-1" style={bodyXs}>
                          {selectedDescargo.representanteLegal || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Dentro de términos
                        </p>
                        <div className="mt-2">
                          {selectedDescargo.dentroTerminos === "A tiempo" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-chart-2 bg-chart-2/10 border border-chart-2/20">
                              <span style={bodyXs}>
                                {selectedDescargo.dentroTerminos}
                              </span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-chart-4 bg-chart-4/10 border border-chart-4/20">
                              <span style={bodyXs}>
                                {selectedDescargo.dentroTerminos}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categorías de Defensa */}
                  {selectedDescargo.categoriasDefensa && selectedDescargo.categoriasDefensa.length > 0 && (
                    <div className="space-y-4 pb-6 border-b border-border">
                      <h4
                        className="text-primary"
                        style={{
                          ...headingBold,
                          fontSize: "var(--text-base)",
                        }}
                      >
                        Categorías de Defensa
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDescargo.categoriasDefensa.map((categoria: string, idx: number) => (
                          <span
                            key={`categoria-${selectedDescargo.id}-${idx}`}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20"
                            style={{
                              ...bodyXs,
                              fontWeight: "var(--font-weight-medium)",
                            }}
                          >
                            {categoria}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resumen de Argumentos */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <h4
                      className="text-primary"
                      style={{
                        ...headingBold,
                        fontSize: "var(--text-base)",
                      }}
                    >
                      Resumen de Argumentos
                    </h4>
                    <p
                      className="text-foreground leading-relaxed"
                      style={{
                        ...bodyXs,
                        lineHeight: 1.7,
                      }}
                    >
                      {selectedDescargo.resumenCompletoDescargo || selectedDescargo.resumenDescargo || selectedDescargo.resumenDescargos}
                    </p>
                  </div>

                  {/* Actividad Probatoria */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <h4
                      className="text-primary"
                      style={{
                        ...headingBold,
                        fontSize: "var(--text-base)",
                      }}
                    >
                      Actividad Probatoria
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-card rounded-lg border border-border p-4">
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Pruebas anexadas
                        </p>
                        <p
                          className="text-foreground mt-1"
                          style={{
                            ...bodyXs,
                            fontWeight: "var(--font-weight-bold)",
                            fontSize: "var(--text-lg)",
                          }}
                        >
                          {selectedDescargo.pruebasAnexadas || 0}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg border border-border p-4">
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Pruebas solicitadas
                        </p>
                        <p
                          className="text-foreground mt-1"
                          style={{
                            ...bodyXs,
                            fontWeight: "var(--font-weight-bold)",
                            fontSize: "var(--text-lg)",
                          }}
                        >
                          {selectedDescargo.pruebasSolicitadas || 0}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg border border-border p-4">
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Estado
                        </p>
                        <p
                          className="text-foreground mt-1"
                          style={{
                            ...bodyXs,
                            fontWeight: "var(--font-weight-medium)",
                          }}
                        >
                          {selectedDescargo.estadoPrueba || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detalle de Pruebas */}
                  {selectedDescargo.pruebas && selectedDescargo.pruebas.length > 0 && (
                    <div className="space-y-4">
                      <h4
                        className="text-primary"
                        style={{
                          ...headingBold,
                          fontSize: "var(--text-base)",
                        }}
                      >
                        Detalle de Pruebas
                      </h4>
                      <div className="space-y-3">
                        {selectedDescargo.pruebas.map((prueba: any, pruebaIdx: number) => (
                          <div
                            key={`modal-prueba-${selectedDescargo.id}-${prueba.id || pruebaIdx}`}
                            className="bg-muted/30 rounded-lg border border-border p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <p
                                    className="text-foreground"
                                    style={{
                                      ...bodyXs,
                                      fontWeight: "var(--font-weight-bold)",
                                    }}
                                  >
                                    {prueba.nombre}
                                  </p>
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] ${
                                      prueba.tipo === "anexada"
                                        ? "bg-chart-2/10 text-chart-2 border border-chart-2/20"
                                        : "bg-chart-4/10 text-chart-4 border border-chart-4/20"
                                    }`}
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontWeight: "var(--font-weight-medium)",
                                    }}
                                  >
                                    {prueba.tipo === "anexada" ? "Anexada" : "Solicitada"}
                                  </span>
                                </div>
                                <p
                                  className="text-muted-foreground"
                                  style={{
                                    ...bodyXs,
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {prueba.descripcion}
                                </p>
                                <div className="flex items-center gap-4 pt-1">
                                  <span
                                    className="text-muted-foreground"
                                    style={{
                                      fontSize: "10px",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    Tipo: <span className="text-foreground">{prueba.tipoPrueba}</span>
                                  </span>
                                  {prueba.documento && (
                                    <span
                                      className="text-muted-foreground"
                                      style={{
                                        fontSize: "10px",
                                        fontFamily: "var(--font-body)",
                                      }}
                                    >
                                      Documento: <span className="text-foreground">{prueba.documento.nombre}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="bg-card shrink-0 border-t-2 border-border p-6 flex justify-end gap-3">
              <Button
                variant="outline"
                className="h-[44px] border-border hover:border-primary text-foreground hover:text-primary rounded-lg px-6"
                style={bodyXs}
                onClick={() => setResumenModalOpen(false)}
              >
                Cerrar
              </Button>
              <Button
                className="h-[44px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 gap-2"
                style={bodyXs}
              >
                <Download className="w-4 h-4" />
                Descargar resumen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Viewer Modal */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-[90vw] w-full md:max-w-[70vw] lg:max-w-[60vw] h-[75vh] p-0 gap-0 bg-background rounded-xl overflow-hidden flex flex-col border-none outline-none shadow-elevation-sm [&>button]:hidden">
          <DialogTitle className="sr-only">Visor de documento</DialogTitle>
          <DialogDescription className="sr-only">
            Vista previa del documento seleccionado
          </DialogDescription>

          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card shrink-0">
            <div
              className="flex items-center gap-2"
              style={{
                ...bodyXs,
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-foreground">Documento</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-9 border-border hover:border-primary text-foreground hover:text-primary rounded-lg gap-2"
                style={bodyXs}
              >
                <Download className="w-4 h-4" />
                Descargar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={() => setViewerOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 flex items-center justify-center p-8 bg-card/50">
            <div className="text-center space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto shadow-elevation-sm border border-border">
                <FileText className="h-10 w-10 text-primary/40" />
              </div>
              <div>
                <h3
                  className="text-foreground"
                  style={{
                    ...headingBold,
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Visor de Documentos
                </h3>
                <p
                  className="text-muted-foreground mt-2"
                  style={{ ...bodyXs, lineHeight: 1.5 }}
                >
                  Aquí se visualizará el documento asociado al registro
                  seleccionado.
                  <br />
                  <span className="opacity-70">
                    (Funcionalidad de visor simulada)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Documentos de Notificación */}
      <Dialog open={docsModalOpen} onOpenChange={setDocsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full md:max-w-[80vw] lg:max-w-[1100px] h-[85vh] p-0 gap-0 bg-background rounded-xl overflow-hidden flex flex-col border-none outline-none shadow-elevation-sm [&>button]:hidden">
          <DialogTitle className="sr-only">Documentos de Notificación</DialogTitle>
          <DialogDescription className="sr-only">Visor de documentos asociados al registro</DialogDescription>
          
          {selectedDocsRow && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                <div>
                  <h2 className="text-[#3F51B5] m-0" style={{ ...headingBold, fontSize: "1.25rem" }}>Documentos de Notificación</h2>
                  <p className="text-muted-foreground m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                    {selectedDocsRow.pliego || selectedDocsRow.expediente} • {selectedDocsRow.documentos?.archivos?.length || 0} documentos
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setDocsModalOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - File List */}
                <div className="w-[300px] border-r border-border bg-card/30 flex flex-col overflow-y-auto p-4 gap-3 shrink-0">
                  {selectedDocsRow.documentos?.archivos?.map((file: any, idx: number) => {
                    const isActive = idx === selectedDocIndex;
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                          isActive ? "bg-[#3F51B5] border-[#3F51B5] text-white shadow-md" : "bg-card border-border hover:border-primary/40 text-foreground"
                        )}
                        onClick={() => setSelectedDocIndex(idx)}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-muted-foreground")} />
                          <div className="min-w-0">
                            <p className="truncate m-0" style={{ ...headingBold, fontSize: "0.75rem" }}>{file.nombre}</p>
                            <p className={cn("m-0 mt-0.5", isActive ? "text-white/80" : "text-muted-foreground")} style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem" }}>{file.tamano}</p>
                          </div>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </div>
                    );
                  })}
                </div>

                {/* Right Area - Viewer */}
                <div className="flex-1 flex flex-col bg-muted/10 overflow-hidden relative p-4">
                  {selectedDocsRow.documentos?.archivos?.[selectedDocIndex] && (() => {
                    const activeFile = selectedDocsRow.documentos.archivos[selectedDocIndex];
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-foreground" />
                            <div>
                              <p className="text-foreground m-0" style={{ ...headingBold, fontSize: "1rem" }}>{activeFile.nombre}</p>
                              <p className="text-muted-foreground m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>{activeFile.tamano}</p>
                            </div>
                          </div>
                          <Button className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white gap-2 h-9 px-4">
                            <Download className="w-4 h-4" />
                            Descargar
                          </Button>
                        </div>
                        
                        <div className="flex-1 bg-card rounded-xl border border-border shadow-sm flex items-center justify-center relative overflow-hidden">
                          <div className="text-center">
                            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-muted-foreground m-0" style={{ ...headingBold, fontSize: "1.25rem" }}>Vista previa de PDF</h3>
                            <p className="text-muted-foreground/60 mt-2 m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>"{activeFile.nombre}"</p>
                            <p className="text-muted-foreground/40 mt-6 m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>En producción, aquí se mostraría el PDF usando un visor embebido</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-border bg-card shrink-0">
                <span className="text-muted-foreground" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                  Documento {selectedDocIndex + 1} de {selectedDocsRow.documentos?.archivos?.length || 0}
                </span>
                <Button variant="outline" className="border-border bg-muted/30 text-muted-foreground hover:bg-muted/50 rounded-lg px-6 h-9" onClick={() => setDocsModalOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
