"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./dialog";
import { cn } from "./utils";

export function ConfirmDialog({
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
