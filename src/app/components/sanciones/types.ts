import type { ReactNode } from "react";

export interface ColumnDef {
  key: string;
  header: string;
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
}
