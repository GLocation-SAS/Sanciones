import React, { useState, useCallback } from "react";
import { Home, ChevronRight, Check } from "lucide-react";
import { ExcelUpload } from "./ExcelUpload";
import { Processing } from "./Processing";
import { ResultsTable } from "./ResultsTable";
import { cn } from "../../components/ui/utils";
import type { ModuleConfig } from "./types";

type Step = "upload" | "processing" | "results";

export function SancionesModule({ config }: { config: ModuleConfig }) {
  const [step, setStep] = useState<Step>("upload");
  const [searchType, setSearchType] = useState<"individual" | "masiva">("masiva");

  const handleFileAccepted = () => {
    setSearchType("masiva");
    setStep("processing");
  };

  const handleIndividualSearch = (searchValue: string) => {
    // TODO: Implementar búsqueda individual
    console.log("Búsqueda individual:", searchValue);
    setSearchType("individual");
    setStep("processing");
  };

  const handleProcessingComplete = useCallback(() => {
    setStep("results");
  }, []);

  const handleReset = () => {
    setStep("upload");
    setSearchType("masiva");
  };

  const steps = [
    { key: "upload" as Step, label: searchType === "individual" ? "Consulta individual" : "Carga de Excel" },
    { key: "processing" as Step, label: "Procesamiento" },
    { key: "results" as Step, label: "Resultados" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div
      className="bg-card text-foreground flex flex-col h-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <main className="flex-1 bg-background p-8 md:p-10 flex flex-col">
        <div className="mx-auto w-full max-w-[1400px] flex-1 flex flex-col bg-card rounded-[24px] p-8 md:p-10">
          <div
            className="mb-8 flex items-center gap-2 text-foreground"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
            }}
          >
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span style={{ fontWeight: "var(--font-weight-medium)" }}>
              Sanciones
            </span>
            <ChevronRight className="h-4 w-4" />
            <span
              className="text-primary"
              style={{ fontWeight: "var(--font-weight-medium)" }}
            >
              {config.title}
            </span>
          </div>

          <div className="bg-background rounded-[24px] shadow-elevation-sm p-8 md:p-12 min-h-[700px] flex flex-col">
            <div className="mb-6 space-y-3">
              <h1
                className="text-primary"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-4xl)",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                {config.title}
              </h1>
              <p
                className="text-foreground max-w-4xl"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: 1.5,
                }}
              >
                {config.description}
              </p>
            </div>

            <div className="mb-10 mt-10">
              <div className="flex items-start relative">
                <div
                  className="absolute h-[2px] bg-border"
                  style={{
                    top: "12px",
                    left: "16.66%",
                    right: "16.66%",
                  }}
                />
                <div
                  className="absolute h-[2px] bg-primary transition-all duration-500"
                  style={{
                    top: "12px",
                    left: "16.66%",
                    width:
                      currentStepIndex === 0
                        ? "0%"
                        : currentStepIndex === 1
                          ? "33.33%"
                          : "66.66%",
                  }}
                />

                {steps.map((s) => {
                  const isActive = s.key === step;
                  const isComplete =
                    (s.key === "upload" &&
                      (step === "processing" || step === "results")) ||
                    (s.key === "processing" && step === "results");

                  return (
                    <div
                      key={s.key}
                      className="flex-1 flex flex-col items-center gap-2 relative z-10"
                    >
                      {isComplete ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check
                            className="w-3.5 h-3.5 text-primary-foreground"
                            strokeWidth={3}
                          />
                        </div>
                      ) : isActive ? (
                        <div className="w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-border bg-background" />
                      )}

                      <span
                        className={cn(
                          "text-center transition-colors mt-1",
                          isActive
                            ? "text-primary"
                            : isComplete
                              ? "text-primary"
                              : "text-muted-foreground"
                        )}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-xs)",
                          fontWeight:
                            isActive || isComplete
                              ? "var(--font-weight-bold)"
                              : "var(--font-weight-normal)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1">
              {step === "upload" && (
                <ExcelUpload
                  onFileAccepted={handleFileAccepted}
                  onIndividualSearch={handleIndividualSearch}
                  onSearchModeChange={(isIndividual) => setSearchType(isIndividual ? "individual" : "masiva")}
                  moduleTitle={config.title}
                  requiredColumns={config.excelFields || ["Pliego", "Año"]}
                />
              )}
              {step === "processing" && (
                <Processing
                  steps={config.processingSteps}
                  onComplete={handleProcessingComplete}
                />
              )}
              {step === "results" && (
                <ResultsTable
                  columns={config.resultColumns}
                  columnTabs={config.columnTabs}
                  data={config.mockData}
                  moduleTitle={config.title}
                  searchType={searchType}
                  onReset={handleReset}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
