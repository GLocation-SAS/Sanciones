import { Suspense } from "react";
import { ValidationPage } from "../../../../components/pages/ValidationPage";
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

export default function ValidacionRoute() {
  return (
    <Suspense>
      <ValidationPage />
      <PrototypeBanner />
    </Suspense>
  );
}
