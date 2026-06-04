"use client";

import React from "react";
import { Home, ChevronRight } from "lucide-react";
import { useNavigate } from "../../app/router-compat";
import { cn } from "./utils";
import { bodyXs } from "../../app/shared";

/* Componente de Breadcrumb Navegable */
export function NavigableBreadcrumb({ items }: { items: Array<{ label: string; path?: string }> }) {
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
