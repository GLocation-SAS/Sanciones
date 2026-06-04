import React, { useState, useEffect, useRef } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { cn } from "../../components/ui/utils";
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
  const [completed, setCompleted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Mantener la referencia actualizada sin re-ejecutar efectos
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Efecto principal de progreso — solo depende de steps.length para no reiniciarse
  useEffect(() => {
    const totalSteps = steps.length;
    let currentStepLocal = 0;
    let progressLocal = 0;
    let done = false;

    const interval = setInterval(() => {
      if (done) return;

      progressLocal += 1.5;
      const target = ((currentStepLocal + 1) / totalSteps) * 100;

      if (progressLocal >= target) {
        if (currentStepLocal < totalSteps - 1) {
          currentStepLocal++;
          setCurrentStep(currentStepLocal);
        } else if (progressLocal >= 100) {
          progressLocal = 100;
          done = true;
          clearInterval(interval);
          setProgress(100);
          setCompleted(true);
          return;
        }
      }

      setProgress(Math.min(progressLocal, 100));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [steps.length]);

  // Efecto separado para disparar onComplete cuando completed = true
  useEffect(() => {
    if (!completed) return;

    const timeout = setTimeout(() => {
      onCompleteRef.current();
    }, 600);

    return () => clearTimeout(timeout);
  }, [completed]);

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
