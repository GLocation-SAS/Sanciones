import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";
import type { ProcessingStep } from "./types";

interface ProcessingProps {
  steps: ProcessingStep[];
  onComplete: () => void;
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

export function Processing({ steps, onComplete }: ProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalSteps = steps.length;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / totalSteps) * 100;
        const next = prev + 1.5;
        if (next >= target) {
          if (currentStep < totalSteps - 1) {
            setCurrentStep((s) => s + 1);
          } else if (next >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 600);
            return 100;
          }
        }
        return Math.min(next, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-[520px] space-y-12">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2
            className="text-primary"
            style={{ ...headingBold, fontSize: "var(--text-2xl)" }}
          >
            Procesando información
          </h2>
          <p className="text-muted-foreground" style={bodyBase}>
            Por favor espere mientras se completa el análisis
          </p>
        </div>

        <div className="space-y-3">
          <Progress
            value={progress}
            className="h-3 bg-primary/10 rounded-full"
          />
          <div className="flex justify-between">
            <span className="text-muted-foreground" style={bodyXs}>
              {steps[currentStep]?.label}
            </span>
            <span
              className="text-primary"
              style={{
                ...bodyXs,
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((stepItem, index) => {
            const isComplete = index < currentStep || progress >= 100;
            const isCurrent = index === currentStep && progress < 100;

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
                  isComplete
                    ? "bg-chart-2/5 border-chart-2/20"
                    : isCurrent
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card border-border opacity-50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    isComplete
                      ? "bg-chart-2 text-background"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span
                      style={{
                        ...bodyXs,
                        fontWeight: "var(--font-weight-bold)",
                      }}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    isComplete
                      ? "text-chart-2"
                      : isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground"
                  )}
                  style={{
                    ...bodyBase,
                    fontWeight:
                      isComplete || isCurrent
                        ? "var(--font-weight-medium)"
                        : "var(--font-weight-normal)",
                  }}
                >
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
