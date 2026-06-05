import { Suspense } from "react";
import { SancionesLayout } from "../../../components/layout/SancionesLayout";
import { PrototypeBanner } from "../../../components/ui/PrototypeBanner";

export async function generateStaticParams() {
  return [
    { moduleId: "notificacion-pliego" },
    { moduleId: "descargos-pruebas" },
    { moduleId: "actos-prueba" },
    { moduleId: "alegatos-conclusion" },
    { moduleId: "hallazgos" },
  ];
}

export default function SancionesModulePage() {
  return (
    <Suspense>
      <SancionesLayout />
      <PrototypeBanner />
    </Suspense>
  );
}
