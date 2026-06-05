import type { ReactNode } from "react";
import type { ColumnTab } from "../../app/shared";

export interface ColumnDef {
  key: string;
  header: string;
  headerTooltip?: string;
  filterable?: boolean;
  truncate?: boolean;
  expandable?: boolean;
  clickable?: boolean;
  render?: (value: any, row: Record<string, any>) => ReactNode;
}

export interface ProcessingStep {
  label: string;
  icon: ReactNode;
}

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  excelFields: string[];
  processingSteps: ProcessingStep[];
  resultColumns: ColumnDef[];
  mockData: Record<string, any>[];
  columnTabs?: ColumnTab[];
}
