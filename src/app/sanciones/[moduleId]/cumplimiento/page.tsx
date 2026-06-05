import { Suspense } from "react";
import { CumplimientoPage } from "../../../../components/pages/CumplimientoPage";
import { PrototypeBanner } from "../../../../components/ui/PrototypeBanner";

export async function generateStaticParams() {
  return [
    { moduleId: "notificacion-pliego" },
    { moduleId: "descargos-pruebas" },
    { moduleId: "actos-prueba" },
    { moduleId: "alegatos-conclusion" },
    { moduleId: "hallazgos" },
  ];
}

export default function CumplimientoRoute() {
  return (
    <Suspense>
      <CumplimientoPage />
      <PrototypeBanner />
    </Suspense>
  );
}
