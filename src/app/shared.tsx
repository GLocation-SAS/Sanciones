import React from "react";
import { Badge } from "./components/ui/badge";
import { cn } from "./components/ui/utils";

export interface ColumnDef {
  key: string;
  header: string;
  headerTooltip?: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
  filterable?: boolean;
  clickable?: boolean;
  expandable?: boolean;
  truncate?: boolean;
}

export interface ProcessingStep {
  label: string;
  icon: React.ReactNode;
}

export interface ColumnTab {
  id: string;
  label: string;
  columns: string[];
}

export interface ModuleConfig {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  epicLabel: string;
  excelFields: string[];
  processingSteps: ProcessingStep[];
  resultColumns: ColumnDef[];
  columnTabs?: ColumnTab[];
  mockData: Record<string, any>[];
  navIcon: React.ReactNode;
}

export const bodyXs: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-normal)" };
export const bodyBase: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--font-weight-medium)" };
export const headingBold: React.CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)" };
export const headingBoldItalic: React.CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontStyle: "italic" };

export function StatusBadge({ label, variant, icon }: { label: string; variant: "success" | "warning" | "info" | "neutral" | "destructive"; icon?: React.ReactNode }) {
  const colors: Record<string, string> = {
    success: "bg-chart-2/10 text-chart-2 hover:bg-chart-2/15",
    warning: "bg-chart-4/15 text-chart-4 hover:bg-chart-4/20",
    info: "bg-primary/10 text-primary hover:bg-primary/15",
    neutral: "bg-muted/30 text-muted-foreground hover:bg-muted/40",
    destructive: "bg-destructive/10 text-destructive hover:bg-destructive/15",
  };
  return (
    <Badge className={cn("border-none px-4 py-1 rounded-full", colors[variant])} style={bodyXs}>
      {icon && <span className="mr-1.5 inline-flex">{icon}</span>}
      {label}
    </Badge>
  );
}
